/* === FLUENCY V20.2 - READING TAKEOVER LIMPO + IA + GEMINI AUDIO === */
;(function(){
  try{
    if(window.__fluencyReadingTakeoverV202) return;
    window.__fluencyReadingTakeoverV202 = true;

    var VERSION = 'V20.4-READING-ACTIVE-LESSON-ONLY';
    var mountedKey = '';
    var running = false;

    function txt(v){ return String(v == null ? '' : v).trim(); }
    function esc(v){
      return txt(v).replace(/[&<>"]/g,function(c){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
      });
    }
    function norm(v){
      try{
        return txt(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
          .replace(/[“”"']/g,'')
          .replace(/[.!?;:,\-–—()[\]{}]/g,' ')
          .replace(/\s+/g,' ')
          .trim();
      }catch(_){
        return txt(v).toLowerCase().replace(/[.!?;:,\-–—()[\]{}]/g,' ').replace(/\s+/g,' ').trim();
      }
    }
    function arr(v){ return Array.isArray(v) ? v : []; }
    function pick(o, keys){
      if(!o || typeof o !== 'object') return '';
      for(var i=0;i<keys.length;i++){
        var v = o[keys[i]];
        if(v != null && txt(v)) return v;
      }
      return '';
    }
    function parse(v){
      try{
        if(v == null) return null;
        var x = typeof v === 'string' ? JSON.parse(v) : v;
        if(typeof x === 'string') { try{x = JSON.parse(x)}catch(_){} }
        return x;
      }catch(_){ return null; }
    }
    function cleanKey(v){
      v = String(v || '').trim();
      try{
        if((v[0]==='[' || v[0]==='{' || (v[0]==='"' && v[v.length-1]==='"'))){
          var p=JSON.parse(v);
          if(Array.isArray(p)) return p.join('\n');
          if(typeof p === 'string') return p;
          if(p && Array.isArray(p.keys)) return p.keys.join('\n');
          if(p && typeof p.key === 'string') return p.key;
          if(p && typeof p.apiKey === 'string') return p.apiKey;
        }
      }catch(_){}
      return v;
    }
    function validKey(k){ return /^AIza[0-9A-Za-z_\-]{20,}$/.test(String(k||'').replace(/\s+/g,'').trim()); }
    function uniq(a){
      var out=[], seen={};
      (a||[]).forEach(function(k){
        k=String(k||'').replace(/\s+/g,'').trim();
        if(validKey(k) && !seen[k]){ seen[k]=1; out.push(k); }
      });
      return out;
    }
    function storageGet(k){
      try{return localStorage.getItem(k)||sessionStorage.getItem(k)||'';}catch(_){return '';}
    }
    function parseKeys(v){ return cleanKey(v).split(/[\n,;| ]+/).filter(Boolean); }
    function getGeminiKeys(){
      var keys=[];
      [
        'fluency_geminiKeys','geminiKeys','fluency_geminiKey','geminiKey',
        'fluency_lessonGeminiApiKeys_v197','fluency_lessonGeminiApiKey','lessonGeminiApiKey',
        'fluency_lessonGeminiKey','lessonGeminiKey','fluency_geminiLessonKey','fluency_aulasGeminiKey'
      ].forEach(function(k){ keys = keys.concat(parseKeys(storageGet(k))); });
      return uniq(keys).slice(0,8);
    }

    function normalizeLesson(L){
      L = parse(L);
      if(!L || typeof L !== 'object') return null;
      if(L.lessonData && typeof L.lessonData === 'object') L = L.lessonData;
      if(L.lesson && typeof L.lesson === 'object') L = L.lesson;
      if(L.aula && typeof L.aula === 'object') L = L.aula;
      if(L.data && L.data.lesson && typeof L.data.lesson === 'object') L = L.data.lesson;

      L.title = pick(L,['title','titulo','título','name']) || 'Aula de Reading';
      L.subtitle = pick(L,['subtitle','subtitulo','subtítulo']) || '';
      L.intro = pick(L,['intro','introduction','introducao','introdução','overview']) || '';
      L.sections = arr(L.sections || L.secoes || L.seções || L.parts || L.modules).map(function(s){
        s=s||{};
        return {
          heading: pick(s,['heading','title','titulo','título','name']) || 'Texto para leitura',
          content: pick(s,['content','text','body','explanation','explicacao','explicação']) || '',
          examples: arr(s.examples || s.exemplos || s.sentences || s.frases)
        };
      });
      L.vocabulary = arr(L.vocabulary || L.vocabulario || L.vocabulário || L.words).map(function(v){
        if(typeof v === 'string') return {word:v, translation:''};
        v=v||{};
        return {
          word: pick(v,['word','term','palavra']),
          pos: pick(v,['pos','type','classe']),
          translation: pick(v,['translation','meaning','traducao','tradução','significado']),
          example: pick(v,['example','sentence','frase','exemplo'])
        };
      });
      L.exercises = arr(L.exercises || L.exercicios || L.exercícios || L.questions).map(function(e){
        if(typeof e === 'string') return {question:e, answer:''};
        e=e||{};
        return {
          type: pick(e,['type','tipo']),
          question: pick(e,['question','pergunta','prompt','instruction','instrucao','instrução']),
          options: arr(e.options || e.opcoes || e.opções || e.choices),
          answer: pick(e,['answer','resposta','correctAnswer','correct','expected']),
          explanation: pick(e,['explanation','explicacao','explicação','why'])
        };
      });
      L.tips = arr(L.tips || L.dicas);
      L.commonMistakes = arr(L.commonMistakes || L.common_mistakes || L.errosComuns || L.erros);
      L.finalTip = pick(L,['finalTip','final_tip','conclusion','conclusao','conclusão','closing','resumoFinal']);
      return L;
    }
    function isLessonKey(k){
      k=String(k||'');
      return /^fluency_lesson/i.test(k) || /^fluency_lesson_v/i.test(k) || /lesson_v\d+_/i.test(k) || /reading/i.test(k);
    }
    function lessonScore(L){
      if(!L) return 0;
      var s=0;
      if(L.title) s+=5;
      if(L.intro) s+=5;
      s+=arr(L.sections).length*12;
      s+=arr(L.exercises).length*6;
      s+=arr(L.vocabulary).length*3;
      return s;
    }
    function lessonBlob(L){
      var parts=[L&&L.__key,L&&L.skill,L&&L.focusKey,L&&L.type,L&&L.category,L&&L.title,L&&L.subtitle,L&&L.intro,L&&L.finalTip];
      arr(L&&L.sections).forEach(function(s){ parts.push(s.heading,s.content); });
      arr(L&&L.exercises).slice(0,4).forEach(function(e){ parts.push(e.type,e.question); });
      return norm(parts.join('\n'));
    }
    function isReadingLesson(L){
      var blob = lessonBlob(L);
      if(/(^|[_\-\/ ])reading($|[_\-\/ ])/.test(blob)) return true;
      if(/reading lesson|reading practice|reading comprehension|aula de leitura|compreensao de leitura|compreensão de leitura/.test(blob)) return true;
      if(/read the text|reading passage|texto para leitura|texto de leitura|rotina matinal|daily routine|skimming|scanning/.test(blob)) return true;
      return false;
    }
    function bestStoredLesson(){
      var best=null, score=0, key='';
      try{
        for(var i=0;i<localStorage.length;i++){
          var k=localStorage.key(i);
          if(!isLessonKey(k)) continue;
          var L=normalizeLesson(localStorage.getItem(k));
          if(!L) continue;
          L.__key=k;
          var sc=lessonScore(L);
          if(sc>score && (arr(L.sections).length || arr(L.exercises).length || arr(L.vocabulary).length)){
            best=L; score=sc; key=k;
          }
        }
      }catch(_){}
      if(best) best.__key=key;
      return best;
    }

    function b64ToArrayBuffer(b64){
      var binary=atob(b64), len=binary.length, bytes=new Uint8Array(len);
      for(var i=0;i<len;i++) bytes[i]=binary.charCodeAt(i);
      return bytes.buffer;
    }
    function pcmToWavBlob(buffer, sampleRate){
      sampleRate = sampleRate || 24000;
      var pcm = new Int16Array(buffer);
      var wav = new ArrayBuffer(44 + pcm.length * 2);
      var view = new DataView(wav);
      function writeStr(offset, str){ for(var i=0;i<str.length;i++) view.setUint8(offset+i, str.charCodeAt(i)); }
      writeStr(0,'RIFF');
      view.setUint32(4,36+pcm.length*2,true);
      writeStr(8,'WAVE');
      writeStr(12,'fmt ');
      view.setUint32(16,16,true);
      view.setUint16(20,1,true);
      view.setUint16(22,1,true);
      view.setUint32(24,sampleRate,true);
      view.setUint32(28,sampleRate*2,true);
      view.setUint16(32,2,true);
      view.setUint16(34,16,true);
      writeStr(36,'data');
      view.setUint32(40,pcm.length*2,true);
      var off=44;
      for(var j=0;j<pcm.length;j++,off+=2) view.setInt16(off,pcm[j],true);
      return new Blob([wav], {type:'audio/wav'});
    }
    async function playBlob(blob){
      if(window.__stopHTMLAudio) { try{window.__stopHTMLAudio();}catch(_){} }
      var au = window.__fluencyReadingAudioEl || window.__sharedHTMLAudio || document.createElement('audio');
      window.__fluencyReadingAudioEl = au;
      au.setAttribute('playsinline','');
      au.setAttribute('webkit-playsinline','');
      au.preload='auto';
      au.volume=1;
      au.muted=false;
      if(!au.parentNode){ au.style.display='none'; document.body.appendChild(au); }
      var url = URL.createObjectURL(blob);
      return new Promise(function(resolve,reject){
        var done=false;
        function clean(){ if(done)return; done=true; try{URL.revokeObjectURL(url)}catch(_){} au.onended=null; au.onerror=null; }
        au.onended=function(){ clean(); resolve(); };
        au.onerror=function(){ clean(); reject(new Error('erro ao tocar áudio')); };
        try{ au.pause(); au.currentTime=0; }catch(_){}
        au.src=url;
        var p=au.play();
        if(p && p.catch) p.catch(function(e){ clean(); reject(e); });
      });
    }
    async function geminiAudioSpeak(text, btn){
      var keys = getGeminiKeys();
      if(!keys.length) throw new Error('Nenhuma chave Gemini encontrada para gerar áudio.');
      var models = ['gemini-2.5-flash-preview-tts','gemini-3.1-flash-tts-preview'];
      var isPt = /[áàâãéêíóôõúç]/i.test(text) || /\b(você|voce|portugu[eê]s|ingles|ingl[eê]s|tradu[cç][aã]o|significa)\b/i.test(text);
      var voice = 'Aoede';
      var last='';
      if(btn){ btn.dataset.oldText=btn.textContent; btn.textContent='Gerando áudio...'; btn.disabled=true; }
      try{
        if(window.__ttsState && window.__ttsState.set) window.__ttsState.set(true,null);
        for(var ki=0;ki<keys.length;ki++){
          for(var mi=0;mi<models.length;mi++){
            var model=models[mi];
            try{
              var prompt = isPt ? ('Leia em português brasileiro natural, sem ler esta instrução: '+text) : text;
              var res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(model)+':generateContent?key='+encodeURIComponent(keys[ki]), {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                  contents:[{parts:[{text:prompt}]}],
                  generationConfig:{
                    responseModalities:['AUDIO'],
                    speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:voice}}}
                  }
                })
              });
              if(!res.ok){ last='HTTP '+res.status+' em '+model; continue; }
              var json = await res.json();
              var parts = json && json.candidates && json.candidates[0] && json.candidates[0].content && json.candidates[0].content.parts;
              var inline = arr(parts).map(function(p){return p && p.inlineData;}).find(function(x){return x && x.data;});
              if(!inline){ last='modelo sem inlineData'; continue; }
              var buf = b64ToArrayBuffer(inline.data);
              var mt = String(inline.mimeType||'audio/pcm').toLowerCase();
              var rate = 24000;
              var m = mt.match(/rate=(\d+)/); if(m) rate=parseInt(m[1],10)||24000;
              var blob = (mt.indexOf('pcm')>=0 || mt.indexOf('l16')>=0 || mt.indexOf('audio/l')>=0) ? pcmToWavBlob(buf, rate) : new Blob([buf],{type:mt||'audio/mpeg'});
              await playBlob(blob);
              return true;
            }catch(e){ last = e && e.message || String(e); }
          }
        }
        throw new Error(last || 'Gemini Audio falhou.');
      }finally{
        if(window.__ttsState && window.__ttsState.set) window.__ttsState.set(false,null);
        if(btn){ btn.textContent=btn.dataset.oldText || 'Ouvir'; btn.disabled=false; }
      }
    }

    function directEvaluate(user, expected){
      var a = norm(user), b = norm(expected);
      if(!a) return {status:'empty', title:'Digite sua resposta primeiro.', detail:'Escreva sua resposta e toque em verificar novamente.'};
      if(!b) return null;
      if(a === b) return {status:'correct', title:'Correto.', detail:'Sua resposta bate com a resposta esperada. Pontuação, maiúsculas e espaços não derrubam sua resposta.'};

      var rawUser = txt(user).replace(/\s+/g,'');
      var rawExpected = txt(expected).replace(/\s+/g,'');
      var noPUser = rawUser.replace(/[.!?;:,]/g,'').toLowerCase();
      var noPExpected = rawExpected.replace(/[.!?;:,]/g,'').toLowerCase();
      if(noPUser && noPUser === noPExpected){
        return {status:'correct', title:'Correto.', detail:'Apenas havia diferença de pontuação. Não vou marcar isso como erro.'};
      }
      return null;
    }
    function extractJson(t){
      t=String(t||'').trim().replace(/^```(?:json)?\s*/i,'').replace(/```$/,'').trim();
      var a=t.indexOf('{'), b=t.lastIndexOf('}');
      if(a>=0 && b>a) t=t.slice(a,b+1);
      return JSON.parse(t);
    }
    async function aiEvaluate(user, expected, question){
      var keys=getGeminiKeys();
      if(!keys.length) throw new Error('Nenhuma chave Gemini encontrada para avaliar com IA.');
      var prompt=[
        'Você é um corretor de respostas de Reading em inglês para estudante brasileiro.',
        'Avalie a resposta do aluno semanticamente. Não reprove por faltar ponto final, letra maiúscula, acento, espaço extra ou pequenas variações naturais.',
        'Responda somente JSON válido com: status ("correct", "partial" ou "wrong"), title, detail, corrected.',
        'Questão: '+question,
        'Resposta esperada: '+expected,
        'Resposta do aluno: '+user
      ].join('\n');
      var last='';
      for(var i=0;i<keys.length;i++){
        for(var m=0;m<['gemini-2.5-flash','gemini-2.0-flash','gemini-1.5-flash'].length;m++){
          var model=['gemini-2.5-flash','gemini-2.0-flash','gemini-1.5-flash'][m];
          try{
            var res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent?key='+encodeURIComponent(keys[i]),{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                contents:[{role:'user',parts:[{text:prompt}]}],
                generationConfig:{temperature:0.15,responseMimeType:'application/json'}
              })
            });
            if(!res.ok){ last='HTTP '+res.status; continue; }
            var j=await res.json();
            var parts=j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts;
            var text=arr(parts).map(function(p){return p.text||'';}).join('\n');
            return extractJson(text);
          }catch(e){ last=e && e.message || String(e); }
        }
      }
      throw new Error(last || 'IA não respondeu.');
    }

    function exampleCard(ex, i){
      if(typeof ex === 'string') ex={en:ex};
      ex=ex||{};
      var en=pick(ex,['en','english','sentence','phrase','example','text'])||txt(ex);
      var pt=pick(ex,['pt','portuguese','translation','traducao','tradução','meaning']);
      return '<div class="fr-card fr-example-card"><div class="fr-example-top"><span class="fr-mini-label">Example</span><span class="fr-example-num">'+(i+1)+'</span></div><div class="fr-en">'+esc(en)+'</div>'+
        (pt?'<details class="fr-details"><summary>Mostrar tradução</summary><div class="fr-pt">'+esc(pt)+'</div></details>':'')+'</div>';
    }
    function renderHero(L){
      return '<section class="fr-reading-hero"><div class="fr-orb fr-orb-a"></div><div class="fr-orb fr-orb-b"></div><div class="fr-hero-content">'+
        '<div class="fr-eyebrow">Aula · ≈ '+esc(L.estimatedMinutes||40)+' min <span>✦ Gerada por IA</span></div>'+
        '<h1>'+esc(L.title||'Reading Practice')+'</h1>'+
        (L.subtitle?'<h3>'+esc(L.subtitle)+'</h3>':'')+
        (L.intro?'<p>'+esc(L.intro)+'</p>':'')+
        '<div class="fr-stats"><span>Reading</span><span>'+arr(L.sections).length+' blocos</span><span>'+arr(L.vocabulary).length+' vocabulários</span><span>'+arr(L.exercises).length+' exercícios</span></div>'+
      '</div></section>';
    }
    function renderNav(L){
      var items=[];
      arr(L.sections).forEach(function(s,i){items.push(['fr-sec-'+i, i===0?'Texto':'Parte '+(i+1)]);});
      if(arr(L.vocabulary).length) items.push(['fr-vocab','Vocabulário']);
      if(arr(L.exercises).length) items.push(['fr-exercises','Exercícios']);
      if(arr(L.commonMistakes).length) items.push(['fr-mistakes','Erros']);
      if(arr(L.tips).length) items.push(['fr-tips','Dicas']);
      return '<nav class="fr-reading-nav">'+items.map(function(x){return '<a href="#'+x[0]+'">'+esc(x[1])+'</a>';}).join('')+'</nav>';
    }
    function renderSections(L){
      return arr(L.sections).map(function(sec,i){
        var content=sec.content||'';
        var examples=arr(sec.examples);
        return '<article id="fr-sec-'+i+'" class="fr-panel '+(i===0?'fr-main-reading':'fr-reading-section')+'">'+
          '<div class="fr-section-kicker">'+(i===0?'Texto para leitura':'Estratégia de leitura')+'</div>'+
          '<div class="fr-title-row"><h2>'+esc(sec.heading||'Texto para leitura')+'</h2>'+(content?'<button class="fr-audio-btn" data-fr-audio="'+esc(content)+'">▶ Ouvir</button>':'')+'</div>'+
          (content?'<div class="fr-reading-text">'+esc(content)+'</div>':'')+
          (examples.length?'<div class="fr-examples-grid">'+examples.map(exampleCard).join('')+'</div>':'')+
        '</article>';
      }).join('');
    }
    function renderVocabulary(L){
      var vocab=arr(L.vocabulary); if(!vocab.length) return '';
      return '<section id="fr-vocab" class="fr-panel"><div class="fr-section-kicker">Palavras úteis</div><h2>Vocabulário da leitura</h2><div class="fr-vocab-grid">'+
        vocab.map(function(v){return '<div class="fr-card fr-vocab-card"><div class="fr-word-row"><strong>'+esc(v.word)+'</strong>'+(v.pos?'<span>'+esc(v.pos)+'</span>':'')+'</div>'+
          (v.translation?'<div class="fr-translation">'+esc(v.translation)+'</div>':'')+
          (v.example?'<div class="fr-vocab-example">“'+esc(v.example)+'”</div><button class="fr-audio-btn small" data-fr-audio="'+esc(v.example)+'">▶ Ouvir exemplo</button>':'')+'</div>';}).join('')+
        '</div></section>';
    }
    function renderExercises(L){
      var ex=arr(L.exercises); if(!ex.length) return '';
      return '<section id="fr-exercises" class="fr-panel"><div class="fr-section-kicker">Compreensão com IA</div><h2>Exercícios corrigidos de forma inteligente</h2><p class="fr-soft">A correção ignora pontuação, maiúsculas e pequenas variações. Em respostas abertas, a IA explica onde você errou.</p><div class="fr-exercise-grid">'+
        ex.map(function(e,i){
          return '<div class="fr-card fr-exercise-card" data-fr-answer="'+esc(e.answer||'')+'" data-fr-question="'+esc(e.question||'')+'">'+
            '<div class="fr-question"><span>'+(i+1)+'</span>'+esc(e.question||'')+'</div>'+
            (arr(e.options).length?'<div class="fr-options">'+arr(e.options).map(function(o){return '<button type="button" class="fr-option-btn">'+esc(o)+'</button>';}).join('')+'</div>':'')+
            '<textarea class="fr-answer-input" rows="3" placeholder="Escreva sua resposta aqui..."></textarea>'+
            '<button type="button" class="fr-check-btn">Verificar com IA</button>'+
            '<div class="fr-feedback" aria-live="polite"></div>'+
            '<details class="fr-details fr-answer-details"><summary>Ver resposta esperada</summary>'+
              (e.answer?'<div class="fr-answer"><b>Resposta:</b> '+esc(e.answer)+'</div>':'')+
              (e.explanation?'<div class="fr-explanation">'+esc(e.explanation)+'</div>':'')+
            '</details>'+
          '</div>';
        }).join('')+'</div></section>';
    }
    function renderMistakes(L){
      var m=arr(L.commonMistakes); if(!m.length) return '';
      return '<section id="fr-mistakes" class="fr-panel"><div class="fr-section-kicker">Atenção</div><h2>Erros comuns</h2><div class="fr-mistakes-grid">'+m.map(function(x){
        x=x||{}; return '<div class="fr-card fr-mistake-card">'+(x.mistake?'<strong>'+esc(x.mistake)+'</strong>':'')+(x.why?'<p>'+esc(x.why)+'</p>':'')+(x.avoid?'<div class="fr-avoid">Como evitar: '+esc(x.avoid)+'</div>':'')+'</div>';
      }).join('')+'</div></section>';
    }
    function renderTips(L){
      var tips=arr(L.tips); if(!tips.length) return '';
      return '<section id="fr-tips" class="fr-panel"><div class="fr-section-kicker">Fechamento</div><h2>Dicas para fixar</h2><ul>'+tips.map(function(t){return '<li>'+esc(t)+'</li>';}).join('')+'</ul></section>';
    }
    function render(L){
      return '<section class="fluency-reading-v202" data-renderer="'+VERSION+'">'+
        renderHero(L)+renderNav(L)+renderSections(L)+renderVocabulary(L)+renderExercises(L)+renderMistakes(L)+renderTips(L)+
        (L.finalTip?'<section class="fr-final-card">“'+esc(L.finalTip)+'”</section>':'')+
      '</section>';
    }

    function isLessonTabActive(){
      var body = document.body ? document.body.innerText || '' : '';
      return /Hoje\s+Aula\s+Flashcards|Aula\s+Flashcards\s+Speaking|Gerada por IA|Texto para leitura|Aula completa gerada pela IA/i.test(body);
    }
    function findLessonContainer(L){
      var title = txt(L && L.title);
      var candidates = Array.prototype.slice.call(document.querySelectorAll('.max-w-3xl.mx-auto, .max-w-4xl.mx-auto, main, [class*="max-w-3xl"], [class*="max-w-4xl"]'));
      candidates = candidates.filter(function(el){
        var t = el.innerText || '';
        return t.length > 120 && (!title || t.indexOf(title.slice(0,24)) >= 0 || /Gerada por IA|Texto para leitura|Exercícios|Vocabulário/i.test(t));
      });
      candidates.sort(function(a,b){
        var ar=a.getBoundingClientRect(), br=b.getBoundingClientRect();
        return (br.width*br.height)-(ar.width*ar.height);
      });
      return candidates[0] || null;
    }
    function bind(root){
      root.addEventListener('click', async function(ev){
        var audioBtn = ev.target.closest && ev.target.closest('.fr-audio-btn');
        if(audioBtn){
          ev.preventDefault();
          var text=audioBtn.getAttribute('data-fr-audio')||'';
          try{ await geminiAudioSpeak(text, audioBtn); }
          catch(e){ alert('Áudio Gemini falhou: '+((e&&e.message)||e)); }
          return;
        }
        var opt = ev.target.closest && ev.target.closest('.fr-option-btn');
        if(opt){
          var card=opt.closest('.fr-exercise-card');
          if(card){
            card.querySelectorAll('.fr-option-btn').forEach(function(b){b.classList.remove('selected')});
            opt.classList.add('selected');
            var inp=card.querySelector('.fr-answer-input');
            if(inp) inp.value=opt.textContent.trim();
          }
          return;
        }
        var check = ev.target.closest && ev.target.closest('.fr-check-btn');
        if(check){
          var card=check.closest('.fr-exercise-card');
          if(!card) return;
          var input=card.querySelector('.fr-answer-input');
          var feedback=card.querySelector('.fr-feedback');
          var user=input?input.value:'';
          var expected=card.getAttribute('data-fr-answer')||'';
          var question=card.getAttribute('data-fr-question')||'';
          var local = directEvaluate(user, expected);
          function show(res){
            var cls = res.status === 'correct' ? 'ok' : (res.status === 'partial' ? 'partial' : 'bad');
            feedback.className='fr-feedback '+cls;
            feedback.innerHTML='<strong>'+esc(res.title||'Resultado')+'</strong><p>'+esc(res.detail||'')+'</p>'+(res.corrected?'<div class="fr-corrected">Correção: '+esc(res.corrected)+'</div>':'');
          }
          if(local){ show(local); return; }
          check.disabled=true; check.textContent='Analisando com IA...';
          try{
            var ai = await aiEvaluate(user, expected, question);
            show(ai || {status:'partial',title:'Analisado.',detail:'A IA avaliou sua resposta, mas retornou pouco detalhe.'});
          }catch(e){
            show({status:'partial',title:'Não consegui chamar a IA agora.',detail:'Usei a resposta esperada abaixo para comparação. Erro: '+((e&&e.message)||e)});
          }finally{
            check.disabled=false; check.textContent='Verificar com IA';
          }
        }
      });
    }

    function visibleText(){
      try{ return String(document.body && (document.body.innerText || document.body.textContent) || ''); }
      catch(_){ return ''; }
    }

    function visibleLessonSignature(){
      var t = visibleText();
      var title = '';
      try{
        var hs = Array.prototype.slice.call(document.querySelectorAll('h1,h2'));
        for(var i=0;i<hs.length;i++){
          var s = String(hs[i].innerText || hs[i].textContent || '').trim();
          if(s && s.length > 8){ title = s; break; }
        }
      }catch(_){}
      return norm([title, t.slice(0, 2600)].join('\n'));
    }

    function currentVisibleLessonIsReading(){
      var sig = visibleLessonSignature();

      // Nunca assumir Reading só porque existe "Texto para leitura".
      // Aulas de gramática também podem ter leitura curta.
      if(/gramatica|gramática|pronome|pronomes|verbo to be|saudacoes|saudações|ingles essencial|inglês essencial/.test(sig)){
        return false;
      }

      // Precisa haver sinal explícito de habilidade Reading na aula visível.
      if(/(^|\s)(reading|leitura)(\s|$)/.test(sig) && /reading practice|reading lesson|compreensao de leitura|compreensão de leitura|estrategias de leitura|estratégias de leitura|skimming|scanning/.test(sig)){
        return true;
      }

      if(/rotina matinal|daily routines and reading strategies|compreendendo textos|reading strategies/.test(sig)){
        return true;
      }

      return false;
    }

    function findVisibleMatchingStoredLesson(){
      var sig = visibleLessonSignature();
      var titleCandidates = [];
      try{
        var hs = Array.prototype.slice.call(document.querySelectorAll('h1,h2'));
        hs.forEach(function(h){
          var s = String(h.innerText || h.textContent || '').trim();
          if(s && s.length > 8) titleCandidates.push(norm(s).slice(0,60));
        });
      }catch(_){}

      var best = null, bestScore = 0;
      try{
        for(var i=0;i<localStorage.length;i++){
          var k=localStorage.key(i);
          if(!isLessonKey(k)) continue;
          var L=normalizeLesson(localStorage.getItem(k));
          if(!L) continue;
          L.__key=k;

          var lt = norm(L.title || '');
          var li = norm(L.intro || '');
          var sc = 0;

          if(lt && sig.indexOf(lt.slice(0, Math.min(45, lt.length))) >= 0) sc += 80;
          titleCandidates.forEach(function(tc){
            if(tc && lt && (tc.indexOf(lt.slice(0, Math.min(40, lt.length))) >= 0 || lt.indexOf(tc.slice(0, Math.min(40, tc.length))) >= 0)) sc += 60;
          });
          if(li && sig.indexOf(li.slice(0, Math.min(80, li.length))) >= 0) sc += 30;

          arr(L.sections).slice(0,2).forEach(function(s){
            var c = norm(s && s.content || '');
            if(c && sig.indexOf(c.slice(0, Math.min(80, c.length))) >= 0) sc += 35;
          });

          if(sc > bestScore){
            best = L;
            bestScore = sc;
          }
        }
      }catch(_){}

      return bestScore >= 60 ? best : null;
    }

    function takeover(){
      if(running) return;
      running = true;
      try{
        if(!isLessonTabActive()) return;

        // V20.4: não pegar mais "melhor aula salva" automaticamente.
        // Só assume a tela quando a aula VISÍVEL for Reading de verdade.
        if(!currentVisibleLessonIsReading()) return;

        var L = findVisibleMatchingStoredLesson();
        if(!L || !isReadingLesson(L)) return;
        var key = L.__key + '|' + (L.title||'');
        var existing = document.querySelector('.fluency-reading-v202[data-key="'+CSS.escape(key)+'"]');
        if(existing) return;
        var container = findLessonContainer(L);
        if(!container) return;

        // Remove visual antigo dessa tela: não sobrepõe, não deixa por baixo.
        Array.prototype.slice.call(container.children).forEach(function(ch){
          if(ch.classList && ch.classList.contains('fluency-reading-v202')) return;
          ch.setAttribute('data-fr-old-reading-hidden','1');
          ch.style.display='none';
        });

        var wrap = document.createElement('div');
        wrap.innerHTML = render(L);
        var node = wrap.firstChild;
        node.setAttribute('data-key', key);
        container.appendChild(node);
        bind(node);
        mountedKey = key;
        try{ console.warn('[Fluency '+VERSION+'] Reading takeover aplicado em '+(L.title||'aula')); }catch(_){}
      }catch(e){
        try{ console.warn('[Fluency '+VERSION+'] falhou', e); }catch(_){}
      }finally{
        running = false;
      }
    }

    window.__fluencyReadingV202Refresh = function(){
      mountedKey='';
      var old=document.querySelectorAll('[data-fr-old-reading-hidden="1"]');
      Array.prototype.forEach.call(old,function(el){ el.style.display=''; el.removeAttribute('data-fr-old-reading-hidden'); });
      var ui=document.querySelectorAll('.fluency-reading-v202');
      Array.prototype.forEach.call(ui,function(el){ if(el.parentNode) el.parentNode.removeChild(el); });
      takeover();
    };
    window.__fluencyReadingV202Status = function(){
      var L=bestStoredLesson();
      return {version:VERSION, visibleReading:currentVisibleLessonIsReading(), lesson:!!L, reading:!!(L&&isReadingLesson(L)), title:L&&L.title, key:L&&L.__key, mounted:!!document.querySelector('.fluency-reading-v202'), keys:getGeminiKeys().length};
    };

    setTimeout(takeover, 600);
    setTimeout(takeover, 1400);
    setTimeout(takeover, 2600);
    setInterval(takeover, 1600);
    ['click','touchend','hashchange','popstate','focus'].forEach(function(ev){
      window.addEventListener(ev,function(){ setTimeout(takeover,180); },true);
    });
    try{
      new MutationObserver(function(){ setTimeout(takeover,120); }).observe(document.documentElement||document.body,{childList:true,subtree:true});
    }catch(_){}
  }catch(e){
    try{ console.warn('Fluency Reading Takeover V20.2 falhou', e); }catch(_){}
  }
})();
