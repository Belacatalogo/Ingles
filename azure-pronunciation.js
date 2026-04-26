/* ============================================================================
 * Fluency – Avaliação de pronúncia REAL com Azure Speech Service
 * ----------------------------------------------------------------------------
 * Este arquivo é STANDALONE. Inclua-o no index.html ANTES de bundle.js:
 *   <script src="azure-pronunciation.js?v=1"></script>
 *
 * Expõe três funções no window:
 *   - window.avaliarPronunciaPRO(fraseEsperada)
 *       → captura áudio do microfone via Azure SDK e devolve
 *         { score, accuracyScore, fluencyScore, completenessScore,
 *           words: [{word, status, tip, phonemes}], overall, mainTip }
 *
 *   - window.avaliarPronunciaPROFromAudio(fraseEsperada, audioBase64, audioMime)
 *       → reaproveita áudio já capturado (webm/mp4/ogg). Decodifica em PCM 16k
 *         no navegador, envia ao Azure via PushStream, retorna o mesmo formato.
 *         É essa função que o patch do bundle chama (não exige re-gravação).
 *
 *   - window.gerarFeedbackIA(palavrasComErro, fraseOriginal)
 *       → consulta Gemini com a chave em localStorage 'fluency_geminiKey'
 *         e retorna { overall, mainTip, tips: { palavra: dica } }.
 *
 * Também expõe window.__pronToast(msg) para o patch do bundle.
 *
 * Configuração: troque __AZURE_TOKEN_URL pela URL pública do seu backend.
 * ========================================================================== */

(function () {
  'use strict';

  // ▼▼▼ COLE AQUI A URL PÚBLICA DO BACKEND DEPLOYADO NO RENDER ▼▼▼
  window.__AZURE_TOKEN_URL = window.__AZURE_TOKEN_URL ||
    'https://fluency-azure-token.onrender.com/token';
  // ▲▲▲ Ex.: 'https://fluency-azure-token.onrender.com/token' ▲▲▲

  // Evita carregamento duplicado (PWA pode reexecutar scripts).
  if (window.__azurePronLoaded) return;
  window.__azurePronLoaded = true;

  // ==========================================================================
  // 1. Carregar SDK do Azure (lazy, sob demanda) ============================
  // ==========================================================================
  const SDK_URL = 'https://aka.ms/csspeech/jsbrowserpackageraw';
  let _sdkPromise = null;

  function loadAzureSDK() {
    if (window.SpeechSDK) return Promise.resolve(window.SpeechSDK);
    if (_sdkPromise) return _sdkPromise;
    _sdkPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SDK_URL;
      s.async = true;
      s.onload = () => {
        if (window.SpeechSDK) resolve(window.SpeechSDK);
        else reject(new Error('SpeechSDK não foi exposto no window após o load.'));
      };
      s.onerror = () => reject(new Error('Falha ao carregar Azure SDK de ' + SDK_URL));
      document.head.appendChild(s);
    });
    return _sdkPromise;
  }

  // ==========================================================================
  // 2. Token cache (9 min) ===================================================
  // ==========================================================================
  let _tokenCache = null;          // { token, region, expiresAt }
  const TOKEN_TTL_MS = 9 * 60 * 1000;

  async function getAzureToken() {
    const now = Date.now();
    if (_tokenCache && _tokenCache.expiresAt > now) {
      return _tokenCache;
    }
    const url = window.__AZURE_TOKEN_URL;
    if (!url || url.includes('COLE-AQUI')) {
      throw new Error('__AZURE_TOKEN_URL não configurada em azure-pronunciation.js');
    }
    const resp = await fetch(url, { method: 'GET' });
    if (!resp.ok) throw new Error('Token HTTP ' + resp.status);
    const data = await resp.json();
    if (!data || !data.token || !data.region) {
      throw new Error('Resposta de token inválida: ' + JSON.stringify(data).slice(0, 100));
    }
    _tokenCache = {
      token: data.token,
      region: data.region,
      expiresAt: now + TOKEN_TTL_MS,
    };
    return _tokenCache;
  }

  // ==========================================================================
  // 3. Lock para evitar instâncias simultâneas ==============================
  // ==========================================================================
  let _busy = false;
  function acquireLock() {
    if (_busy) throw new Error('Já existe uma avaliação em andamento');
    _busy = true;
    return () => { _busy = false; };
  }

  // ==========================================================================
  // 4. Toast leve (DOM mínimo) ===============================================
  // ==========================================================================
  window.__pronToast = function (msg) {
    try {
      if (!document || !document.body) return;
      let el = document.getElementById('__pron_toast__');
      if (!el) {
        el = document.createElement('div');
        el.id = '__pron_toast__';
        el.style.cssText = [
          'position:fixed', 'bottom:90px', 'left:50%',
          'transform:translateX(-50%)',
          'background:rgba(20,28,48,0.96)', 'color:#E8EFF8',
          'padding:10px 16px', 'border-radius:12px',
          'font-size:13px',
          'font-family:-apple-system,BlinkMacSystemFont,sans-serif',
          'z-index:99999', 'max-width:320px', 'text-align:center',
          'border:1px solid rgba(91,156,246,0.3)',
          'box-shadow:0 8px 24px rgba(0,0,0,0.4)',
          'opacity:0', 'transition:opacity 0.3s', 'pointer-events:none',
          'line-height:1.4',
        ].join(';');
        document.body.appendChild(el);
      }
      el.textContent = msg;
      el.style.opacity = '1';
      clearTimeout(el.__t);
      el.__t = setTimeout(() => { el.style.opacity = '0'; }, 3500);
    } catch (e) { /* silent */ }
  };

  // ==========================================================================
  // 5. Decodificação de áudio (base64 → PCM 16kHz mono Int16) ==============
  // ==========================================================================
  function base64ToArrayBuffer(b64) {
    const bin = atob(b64);
    const len = bin.length;
    const buf = new ArrayBuffer(len);
    const u8 = new Uint8Array(buf);
    for (let i = 0; i < len; i++) u8[i] = bin.charCodeAt(i);
    return buf;
  }

  async function decodeToPCM16k(audioBase64, audioMime) {
    const ab = base64ToArrayBuffer(audioBase64);

    // 1) Decodifica usando AudioContext do dispositivo. Suporta:
    //    webm/opus (Chrome, Firefox), mp4/aac (iOS Safari), ogg/opus.
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) throw new Error('AudioContext indisponível neste navegador');

    // Em iOS, decodeAudioData pode falhar se o contexto nunca foi destravado.
    // O index.html já destrava no primeiro toque; usamos ctx temporário.
    const tmpCtx = new Ctx();
    let audioBuffer;
    try {
      // Safari antigo só aceita callback; tentamos Promise primeiro.
      audioBuffer = await new Promise((res, rej) => {
        const p = tmpCtx.decodeAudioData(ab.slice(0), res, rej);
        if (p && typeof p.then === 'function') p.then(res, rej);
      });
    } finally {
      try { tmpCtx.close && tmpCtx.close(); } catch (_) {}
    }

    if (!audioBuffer || audioBuffer.duration < 0.2) {
      throw new Error('Áudio muito curto ou vazio');
    }

    // 2) Resample para 16 kHz mono via OfflineAudioContext.
    const TARGET_RATE = 16000;
    const targetLen = Math.max(1, Math.ceil(audioBuffer.duration * TARGET_RATE));
    const offline = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(
      1, targetLen, TARGET_RATE
    );

    let sourceBuffer;
    if (audioBuffer.numberOfChannels > 1) {
      // Mixdown para mono (média dos canais).
      sourceBuffer = offline.createBuffer(1, audioBuffer.length, audioBuffer.sampleRate);
      const mono = sourceBuffer.getChannelData(0);
      const ch0 = audioBuffer.getChannelData(0);
      const ch1 = audioBuffer.getChannelData(1);
      for (let i = 0; i < ch0.length; i++) mono[i] = (ch0[i] + ch1[i]) * 0.5;
    } else {
      sourceBuffer = audioBuffer;
    }

    const src = offline.createBufferSource();
    src.buffer = sourceBuffer;
    src.connect(offline.destination);
    src.start(0);
    const rendered = await offline.startRendering();

    // 3) Float32 → Int16
    const f32 = rendered.getChannelData(0);
    const i16 = new Int16Array(f32.length);
    for (let i = 0; i < f32.length; i++) {
      let s = f32[i];
      if (s > 1) s = 1; else if (s < -1) s = -1;
      i16[i] = s < 0 ? Math.round(s * 0x8000) : Math.round(s * 0x7FFF);
    }
    return i16;
  }

  // ==========================================================================
  // 6. Mapeamento Azure → status canônico ===================================
  // ==========================================================================
  function mapAzureWord(w) {
    const wpa = (w && w.PronunciationAssessment) || {};
    const acc = typeof wpa.AccuracyScore === 'number' ? wpa.AccuracyScore : null;
    const errType = wpa.ErrorType || 'None';

    let status;
    switch (errType) {
      case 'None':
        if (acc == null) status = 'correct';
        else if (acc >= 80) status = 'correct';
        else if (acc >= 60) status = 'medium';
        else status = 'wrong';
        break;
      case 'Mispronunciation':
        status = (acc != null && acc >= 60) ? 'medium' : 'wrong';
        break;
      case 'Omission':
        status = 'missing';
        break;
      case 'Insertion':
        status = 'wrong';
        break;
      case 'UnexpectedBreak':
      case 'MissingBreak':
      case 'Monotone':
        status = 'medium';
        break;
      default:
        if (acc == null) status = 'medium';
        else if (acc >= 80) status = 'correct';
        else if (acc >= 60) status = 'medium';
        else status = 'wrong';
    }

    const phonemes = ((w && w.Phonemes) || []).map(p => ({
      phoneme: p.Phoneme,
      score: p.PronunciationAssessment && p.PronunciationAssessment.AccuracyScore,
    }));

    return {
      word: (w && w.Word) || '',
      status,
      tip: null,           // preenchido depois pelo gerarFeedbackIA
      phonemes,
      _accuracy: acc,
      _errorType: errType,
    };
  }

  function buildResultFromAzureJSON(jsonResult, expectedText) {
    if (!jsonResult || !jsonResult.NBest || !jsonResult.NBest[0]) {
      throw new Error('Azure não retornou NBest');
    }
    const nb = jsonResult.NBest[0];
    const pa = nb.PronunciationAssessment || {};

    const score = round(pa.PronScore);
    const accuracy = round(pa.AccuracyScore);
    const fluency = round(pa.FluencyScore);
    const completeness = round(pa.CompletenessScore);

    const words = (nb.Words || []).map(mapAzureWord);

    // overall e mainTip básicos (Gemini enriquece depois)
    const errored = words.filter(w =>
      w.status === 'wrong' || w.status === 'medium' || w.status === 'missing'
    );

    let overall = `Pronúncia ${score}/100 — precisão ${accuracy}, fluência ${fluency}, completude ${completeness}.`;
    let mainTip = null;
    if (errored.length) {
      const list = errored.slice(0, 3).map(w => w.word).join(', ');
      mainTip = `Pratique: ${list}.`;
    } else if (score < 80) {
      mainTip = 'Tente falar com mais naturalidade e ritmo.';
    }

    return {
      score, accuracyScore: accuracy, fluencyScore: fluency, completenessScore: completeness,
      words: words.map(w => ({                  // limpa campos internos antes de devolver
        word: w.word, status: w.status, tip: w.tip, phonemes: w.phonemes,
      })),
      _erroredRaw: errored,                     // usado internamente para gerarFeedbackIA
      overall, mainTip,
    };
  }

  function round(n) {
    if (n == null || isNaN(n)) return 0;
    return Math.round(n);
  }

  // ==========================================================================
  // 7. Núcleo: avaliar com SDK ==============================================
  // ==========================================================================
  async function runAzureAssessment(SDK, audioConfig, expectedText) {
    const { token, region } = await getAzureToken();
    const speechConfig = SDK.SpeechConfig.fromAuthorizationToken(token, region);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const paConfig = new SDK.PronunciationAssessmentConfig(
      expectedText,
      SDK.PronunciationAssessmentGradingSystem.HundredMark,
      SDK.PronunciationAssessmentGranularity.Phoneme,
      true   // enableMiscue
    );

    const recognizer = new SDK.SpeechRecognizer(speechConfig, audioConfig);
    paConfig.applyTo(recognizer);

    try {
      const result = await new Promise((resolve, reject) => {
        recognizer.recognizeOnceAsync(
          r => resolve(r),
          e => reject(new Error(typeof e === 'string' ? e : (e && e.message) || 'recognizeOnce error'))
        );
      });

      if (result.reason === SDK.ResultReason.Canceled) {
        const cd = SDK.CancellationDetails.fromResult(result);
        throw new Error('Azure cancelou: ' + cd.reason + ' / ' + (cd.errorDetails || ''));
      }
      if (result.reason !== SDK.ResultReason.RecognizedSpeech) {
        throw new Error('Azure não reconheceu fala (reason=' + result.reason + ')');
      }

      const raw = result.properties.getProperty(
        SDK.PropertyId.SpeechServiceResponse_JsonResult
      );
      const parsed = JSON.parse(raw);
      return buildResultFromAzureJSON(parsed, expectedText);
    } finally {
      try { recognizer.close(); } catch (_) {}
    }
  }

  // ==========================================================================
  // 8. PUBLIC: avaliarPronunciaPRO (mic ao vivo) ============================
  // ==========================================================================
  window.avaliarPronunciaPRO = async function (fraseEsperada) {
    if (!fraseEsperada || typeof fraseEsperada !== 'string') {
      throw new Error('fraseEsperada inválida');
    }
    const release = acquireLock();
    let stream = null;
    try {
      const SDK = await loadAzureSDK();

      // Pede mic explicitamente para tratar erro de permissão antes do SDK.
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (e) {
        throw new Error('Microfone bloqueado: ' + (e && e.message || e));
      }

      // SDK consome do mic padrão; podemos liberar nosso stream temporário.
      try { stream.getTracks().forEach(t => t.stop()); } catch (_) {}
      stream = null;

      const audioConfig = SDK.AudioConfig.fromDefaultMicrophoneInput();
      const result = await runAzureAssessment(SDK, audioConfig, fraseEsperada);

      // Enriquecer com Gemini (se chave disponível)
      try {
        const enriched = await window.gerarFeedbackIA(result._erroredRaw, fraseEsperada);
        applyEnrichment(result, enriched);
      } catch (e) {
        console.warn('[Azure] Gemini enrich falhou:', e && e.message);
      }
      delete result._erroredRaw;
      return result;
    } finally {
      if (stream) { try { stream.getTracks().forEach(t => t.stop()); } catch (_) {} }
      release();
    }
  };

  // ==========================================================================
  // 9. PUBLIC: avaliarPronunciaPROFromAudio (áudio já capturado) ============
  // ==========================================================================
  window.avaliarPronunciaPROFromAudio = async function (fraseEsperada, audioBase64, audioMime) {
    if (!fraseEsperada || typeof fraseEsperada !== 'string') {
      throw new Error('fraseEsperada inválida');
    }
    if (!audioBase64) throw new Error('Áudio ausente');

    const release = acquireLock();
    try {
      const SDK = await loadAzureSDK();

      // 1) decode + resample
      const pcm16 = await decodeToPCM16k(audioBase64, audioMime || 'audio/webm');

      // 2) push stream PCM 16k 16bit mono
      const fmt = SDK.AudioStreamFormat.getWaveFormatPCM(16000, 16, 1);
      const pushStream = SDK.AudioInputStream.createPushStream(fmt);

      // pushStream.write aceita ArrayBuffer
      pushStream.write(pcm16.buffer);
      pushStream.close();

      const audioConfig = SDK.AudioConfig.fromStreamInput(pushStream);

      // 3) recognize + assess
      const result = await runAzureAssessment(SDK, audioConfig, fraseEsperada);

      // 4) enriquecer com Gemini
      try {
        const enriched = await window.gerarFeedbackIA(result._erroredRaw, fraseEsperada);
        applyEnrichment(result, enriched);
      } catch (e) {
        console.warn('[Azure] Gemini enrich falhou:', e && e.message);
      }

      // diagnóstico (se painel estiver presente)
      try {
        if (window.__diagPron) {
          window.__diagPron.setMode('azure');
          window.__diagPron.setAI('azure-speech');
          window.__diagPron.setScore(result.score, 'azure');
          window.__diagPron.setReason(null);
        }
      } catch (_) {}

      delete result._erroredRaw;
      return result;
    } finally {
      release();
    }
  };

  function applyEnrichment(result, enriched) {
    if (!enriched) return;
    if (typeof enriched.overall === 'string' && enriched.overall.trim()) {
      result.overall = enriched.overall.trim();
    }
    if (typeof enriched.mainTip === 'string' && enriched.mainTip.trim()) {
      result.mainTip = enriched.mainTip.trim();
    }
    if (enriched.tips && typeof enriched.tips === 'object') {
      const map = {};
      Object.keys(enriched.tips).forEach(k => { map[k.toLowerCase()] = enriched.tips[k]; });
      for (const w of result.words) {
        const t = map[(w.word || '').toLowerCase()];
        if (t && (w.status === 'wrong' || w.status === 'medium' || w.status === 'missing')) {
          w.tip = t;
        }
      }
    }
  }

  // ==========================================================================
  // 10. PUBLIC: gerarFeedbackIA (Gemini textual) ============================
  // ==========================================================================
  window.gerarFeedbackIA = async function (palavrasComErro, fraseOriginal) {
    let key = '';
    try { key = localStorage.getItem('fluency_geminiKey') || ''; } catch (_) {}
    if (!key) return null;
    if (!Array.isArray(palavrasComErro) || palavrasComErro.length === 0) return null;

    const lista = palavrasComErro.slice(0, 8).map(w => {
      const acc = (w._accuracy != null) ? ` (precisão Azure ${Math.round(w._accuracy)}/100)` : '';
      const err = w._errorType ? ` [tipo:${w._errorType}]` : '';
      return `- "${w.word}" status=${w.status}${acc}${err}`;
    }).join('\n');

    const prompt =
`Você é professor de pronúncia inglesa para alunos brasileiros, EXIGENTE e claro.
Análise FONÉTICA REAL (Azure Speech Service) detectou estes desvios na frase
"${fraseOriginal}":

${lista}

Responda SOMENTE com JSON válido, sem markdown:
{
  "overall": "1-2 frases amigáveis em PT-BR sobre o desempenho geral, citando ponto forte se houver",
  "mainTip": "principal coisa a melhorar, em PT-BR, com dica fonética concreta para brasileiros (ex: 'th' como em think requer língua entre os dentes)",
  "tips": {
    "palavra1": "dica curta em PT-BR para pronunciar essa palavra (1 frase)"
  }
}

Foque em desvios típicos de brasileiros:
- 'th' (think/that) virando 't'/'d' → língua entre os dentes
- 'r' inicial caipira ou 'r' final pronunciado → 'r' inicial é leve, quase 'w'; 'r' final quase mudo
- Vogais curtas vs longas (ship/sheep, full/fool)
- '-ed' final virando '-edi' (walked = 'wókt', não 'wókedi')
- Schwa (vogal reduzida) vs vogal cheia em sílaba átona
- Sílaba tônica errada (word stress)
- 'h' aspirado virando mudo
- Vogal extra entre consoantes ('milk' → 'milki')
- Confusão entre 'i' curto e 'i' longo (live/leave, bit/beat)

Inclua tip para CADA palavra listada. Tips devem ser frases CURTAS e ACIONÁVEIS.`;

    const models = ['gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-flash-latest'];
    for (const m of models) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(key)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                maxOutputTokens: 700,
                temperature: 0.4,
                responseMimeType: 'application/json',
              },
            }),
          }
        );
        if (!res.ok) continue;
        const j = await res.json();
        const text = (((j && j.candidates && j.candidates[0] && j.candidates[0].content
          && j.candidates[0].content.parts) || [])
          .map(p => p && p.text || '').join('')) || '';
        const cleaned = text.replace(/```json\s*/gi, '').replace(/```/g, '').trim();
        const si = cleaned.indexOf('{'), ei = cleaned.lastIndexOf('}');
        if (si !== -1 && ei !== -1) {
          try { return JSON.parse(cleaned.slice(si, ei + 1)); }
          catch (_) { continue; }
        }
      } catch (_) { continue; }
    }
    return null;
  };

  // ==========================================================================
  // 11. Pré-aquece SDK em idle (otimização) =================================
  // ==========================================================================
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => { loadAzureSDK().catch(() => {}); }, { timeout: 5000 });
  } else {
    setTimeout(() => { loadAzureSDK().catch(() => {}); }, 3000);
  }

  window.__azurePronReady = true;
  console.log('[Azure-Pron] módulo carregado. URL token =', window.__AZURE_TOKEN_URL);
})();
