/* ============================================================================
 * Fluency – Grammar Pro
 * Módulo visual e adaptativo para domínio gramatical, banco de erros,
 * revisão inteligente, grammar coach, treino por tipo e diagnóstico.
 * ========================================================================== */
(function(){
  'use strict';
  if (window.__fluencyGrammarProLoaded) return;
  window.__fluencyGrammarProLoaded = true;

  var STORE = 'fluency_grammar_pro_v1';
  var GEMINI_KEY = 'fluency_geminiKey';

  var TOPICS = [
    { id:'to_be', level:'A1', name:'Verbo to be', desc:'ser/estar, negativa e perguntas', prereq:[], examples:['I am tired.','She is my friend.','Are you Brazilian?'] },
    { id:'articles', level:'A1', name:'Artigos a/an/the', desc:'quando usar, omitir e diferenciar', prereq:['to_be'], examples:['She is a doctor.','I have an apple.','The sun is hot.'] },
    { id:'plural_nouns', level:'A1', name:'Plural dos substantivos', desc:'-s, -es e plurais irregulares', prereq:['articles'], examples:['two books','three boxes','many children'] },
    { id:'present_simple', level:'A1', name:'Present Simple', desc:'rotina, hábitos, do/does e -s', prereq:['to_be'], examples:['I work every day.','She works at night.','Do you study?'] },
    { id:'present_continuous', level:'A1', name:'Present Continuous', desc:'ações acontecendo agora', prereq:['to_be'], examples:['I am studying.','They are working.','Is he sleeping?'] },
    { id:'prepositions_basic', level:'A1', name:'Preposições básicas', desc:'in, on, at, to, from, with', prereq:['to_be'], examples:['at night','in Brazil','on Monday'] },
    { id:'there_is_are', level:'A1', name:'There is / There are', desc:'existência no singular e plural', prereq:['articles','plural_nouns'], examples:['There is a book.','There are two chairs.'] },
    { id:'past_simple', level:'A2', name:'Past Simple', desc:'passado com verbos regulares e irregulares', prereq:['present_simple'], examples:['I watched a movie.','She went home.'] },
    { id:'comparatives', level:'A2', name:'Comparativos', desc:'bigger, more interesting, better', prereq:['articles'], examples:['This is better.','English is easier now.'] },
    { id:'modal_verbs', level:'A2', name:'Modais básicos', desc:'can, should, must, could', prereq:['present_simple'], examples:['I can speak.','You should practice.'] },
    { id:'present_perfect', level:'B1', name:'Present Perfect', desc:'have/has + particípio', prereq:['past_simple'], examples:['I have studied.','She has never been there.'] },
    { id:'conditionals', level:'B1', name:'Conditionals', desc:'if clauses reais e hipotéticas', prereq:['past_simple','modal_verbs'], examples:['If I study, I improve.','If I had time, I would go.'] }
  ];

  var TRAPS = [
    { id:'age_have', topic:'to_be', label:'Idade com to be', wrong:/\bI\s+have\s+(\d{1,3})\s+years?\b/i, fix:function(m){return 'I am ' + m[1] + ' years old';}, tip:'Em inglês, idade usa o verbo to be: I am 20 years old.' },
    { id:'agree_be', topic:'present_simple', label:'I agree sem am', wrong:/\bI\s+am\s+agree\b/i, fix:function(){return 'I agree';}, tip:'Agree já é verbo. Não use am antes: I agree.' },
    { id:'depend_of', topic:'prepositions_basic', label:'Depend on', wrong:/\bdepends?\s+of\b/i, fix:function(){return 'depends on';}, tip:'O correto é depend on, não depend of.' },
    { id:'go_to_home', topic:'prepositions_basic', label:'Go home', wrong:/\bgo(?:es|ing)?\s+to\s+home\b/i, fix:function(){return 'go home';}, tip:'Home como destino normalmente não usa to: go home.' },
    { id:'people_is', topic:'to_be', label:'People are', wrong:/\bpeople\s+is\b/i, fix:function(){return 'people are';}, tip:'People é plural em inglês: people are.' },
    { id:'she_have', topic:'present_simple', label:'He/She/It has', wrong:/\b(he|she|it)\s+have\b/i, fix:function(m){return m[1] + ' has';}, tip:'Com he/she/it, use has: she has.' },
    { id:'third_person_s', topic:'present_simple', label:'-s na 3ª pessoa', wrong:/\b(he|she|it)\s+(go|work|study|play|like|want|need|live)\b/i, fix:function(m){var v=m[2]; var f=v==='go'?'goes':v==='study'?'studies':v+'s'; return m[1]+' '+f;}, tip:'No Present Simple, he/she/it recebe -s ou -es: she works, he goes.' },
    { id:'make_do', topic:'present_simple', label:'Do vs make', wrong:/\bmake\s+(homework|exercise|the dishes)\b/i, fix:function(m){return 'do ' + m[1];}, tip:'Use do para tarefas e atividades: do homework, do exercise, do the dishes.' }
  ];

  var EXERCISES = [
    { type:'complete', topic:'to_be', q:'Complete: She ___ very happy today.', options:['am','is','are'], answer:'is', exp:'She usa is.' },
    { type:'correct', topic:'to_be', q:'Corrija: People is very friendly.', answer:'People are very friendly.', exp:'People é plural: are.' },
    { type:'complete', topic:'articles', q:'Complete: I have ___ apple.', options:['a','an','the'], answer:'an', exp:'Apple começa com som de vogal, então an.' },
    { type:'complete', topic:'present_simple', q:'Complete: He ___ English every day.', options:['study','studies','studying'], answer:'studies', exp:'He/she/it: verbo com -s/-es/-ies.' },
    { type:'transform', topic:'present_simple', q:'Transforme em pergunta: You like coffee.', answer:'Do you like coffee?', exp:'No Present Simple, pergunta com do/does.' },
    { type:'correct', topic:'present_simple', q:'Corrija: She have a notebook.', answer:'She has a notebook.', exp:'She usa has.' },
    { type:'complete', topic:'prepositions_basic', q:'Complete: I live ___ Brazil.', options:['on','in','at'], answer:'in', exp:'Países/cidades normalmente usam in.' },
    { type:'correct', topic:'prepositions_basic', q:'Corrija: It depends of the situation.', answer:'It depends on the situation.', exp:'A combinação correta é depend on.' },
    { type:'translate', topic:'there_is_are', q:'Traduza: Há dois livros na mesa.', answer:'There are two books on the table.', exp:'Plural: there are.' },
    { type:'complete', topic:'past_simple', q:'Complete: Yesterday, she ___ to school.', options:['go','went','goes'], answer:'went', exp:'Past Simple de go é went.' },
    { type:'complete', topic:'comparatives', q:'Complete: This lesson is ___ than the last one.', options:['easy','easier','more easy'], answer:'easier', exp:'Adjetivo curto: easier than.' },
    { type:'complete', topic:'present_perfect', q:'Complete: I ___ never ___ to Canada.', options:['have / been','has / been','have / went'], answer:'have / been', exp:'Present Perfect: have/has + particípio.' }
  ];

  function load(){
    try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch(e){ return {}; }
  }
  function save(s){
    try { localStorage.setItem(STORE, JSON.stringify(s)); } catch(e){}
  }
  function state(){
    var s = load();
    s.mastery = s.mastery || {};
    s.errors = s.errors || [];
    s.sessions = s.sessions || [];
    s.diagnostic = s.diagnostic || null;
    TOPICS.forEach(function(t){ if (typeof s.mastery[t.id] !== 'number') s.mastery[t.id] = 0; });
    save(s); return s;
  }
  function topic(id){ return TOPICS.find(function(t){ return t.id === id; }) || TOPICS[0]; }
  function clamp(n){ return Math.max(0, Math.min(100, Math.round(n))); }
  function addError(data){
    var s = state();
    s.errors.unshift(Object.assign({ date:new Date().toISOString() }, data));
    s.errors = s.errors.slice(0,120);
    var id = data.topic || 'present_simple';
    s.mastery[id] = clamp((s.mastery[id] || 0) - 8);
    save(s);
  }
  function addSuccess(topicId, amount){
    var s = state();
    s.mastery[topicId] = clamp((s.mastery[topicId] || 0) + (amount || 6));
    save(s);
  }
  function weakTopics(){
    var s = state();
    return TOPICS.slice().sort(function(a,b){ return (s.mastery[a.id]||0) - (s.mastery[b.id]||0); }).slice(0,5);
  }

  function injectCSS(){
    if (document.getElementById('__grammar_pro_css__')) return;
    var css = document.createElement('style');
    css.id = '__grammar_pro_css__';
    css.textContent = `
      #__gp_fab__{position:fixed;left:16px;bottom:18px;z-index:99998;border:0;border-radius:999px;padding:13px 16px;background:linear-gradient(135deg,#5B9CF6,#A78BFA);color:white;font:800 13px -apple-system,BlinkMacSystemFont,sans-serif;box-shadow:0 14px 34px rgba(91,156,246,.32);display:flex;align-items:center;gap:8px;letter-spacing:-.01em}
      #__gp_fab__:active{transform:scale(.97)}
      #__gp_shell__{position:fixed;inset:0;z-index:999999;background:rgba(2,6,18,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);display:none;align-items:flex-end;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#E8EFF8}
      #__gp_shell__.on{display:flex}
      .__gp_panel{width:min(960px,100%);max-height:92vh;background:linear-gradient(180deg,rgba(15,30,64,.98),rgba(6,13,31,.99));border:1px solid rgba(148,163,184,.18);box-shadow:0 -20px 80px rgba(0,0,0,.55);border-radius:28px 28px 0 0;overflow:hidden}
      .__gp_head{padding:18px 18px 14px;background:radial-gradient(circle at top left,rgba(91,156,246,.24),transparent 38%),radial-gradient(circle at top right,rgba(167,139,250,.22),transparent 36%);border-bottom:1px solid rgba(255,255,255,.08)}
      .__gp_top{display:flex;align-items:center;justify-content:space-between;gap:12px}. __gp_top{}
      .__gp_title{font-weight:900;font-size:21px;letter-spacing:-.04em}. __gp_title{}
      .__gp_sub{font-size:12px;color:rgba(232,239,248,.62);margin-top:4px;line-height:1.4}
      .__gp_close{width:36px;height:36px;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.07);color:white;font-weight:900;font-size:18px}
      .__gp_tabs{display:flex;gap:8px;overflow:auto;padding:12px 0 0}. __gp_tabs::-webkit-scrollbar{display:none}
      .__gp_tab{white-space:nowrap;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:rgba(232,239,248,.76);border-radius:999px;padding:9px 12px;font-size:12px;font-weight:800}
      .__gp_tab.active{background:linear-gradient(135deg,rgba(91,156,246,.95),rgba(167,139,250,.95));color:white;border-color:transparent;box-shadow:0 8px 20px rgba(91,156,246,.2)}
      .__gp_body{padding:16px;overflow:auto;max-height:calc(92vh - 128px)}
      .__gp_grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}@media(max-width:720px){.__gp_grid{grid-template-columns:1fr}#__gp_fab__{left:12px;bottom:14px;padding:12px 14px}.__gp_panel{border-radius:24px 24px 0 0}}
      .__gp_card{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:14px;box-shadow:inset 0 1px rgba(255,255,255,.04)}
      .__gp_card h3{font-size:15px;font-weight:900;letter-spacing:-.02em;margin-bottom:6px}. __gp_card p{font-size:13px;color:rgba(232,239,248,.68);line-height:1.5}
      .__gp_bar{height:9px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin:10px 0 7px}.__gp_fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#5B9CF6,#A78BFA)}
      .__gp_badge{display:inline-flex;border-radius:999px;background:rgba(91,156,246,.14);border:1px solid rgba(91,156,246,.22);color:#BFDBFE;padding:4px 8px;font-size:11px;font-weight:800;margin-right:6px;margin-top:6px}
      .__gp_btn{border:0;border-radius:14px;background:linear-gradient(135deg,#5B9CF6,#A78BFA);color:white;font-weight:900;padding:12px 14px;font-size:13px;box-shadow:0 10px 24px rgba(91,156,246,.22)}
      .__gp_btn.secondary{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);box-shadow:none;color:#E8EFF8}. __gp_btn:active{transform:scale(.98)}
      .__gp_textarea{width:100%;min-height:115px;border-radius:18px;border:1px solid rgba(255,255,255,.12);background:rgba(2,6,18,.42);color:#E8EFF8;padding:14px;font:14px -apple-system,BlinkMacSystemFont,sans-serif;line-height:1.5;resize:vertical;outline:none}. __gp_textarea::placeholder{color:rgba(232,239,248,.38)}
      .__gp_result{margin-top:12px;padding:14px;border-radius:18px;background:rgba(6,13,31,.48);border:1px solid rgba(255,255,255,.09);font-size:13px;line-height:1.55;color:rgba(232,239,248,.82);white-space:pre-wrap}
      .__gp_option{display:block;width:100%;text-align:left;margin-top:8px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:#E8EFF8;padding:11px 12px;font-weight:800}. __gp_option.good{border-color:rgba(52,211,153,.6);background:rgba(52,211,153,.12)}.__gp_option.bad{border-color:rgba(248,113,113,.62);background:rgba(248,113,113,.12)}
      .__gp_small{font-size:12px;color:rgba(232,239,248,.6);line-height:1.45}. __gp_row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}. __gp_hr{height:1px;background:rgba(255,255,255,.08);margin:12px 0}
      .__gp_err{border-left:3px solid #F59E0B}. __gp_ok{border-left:3px solid #34D399}. __gp_warn{color:#FBBF24;font-weight:800}
    `;
    document.head.appendChild(css);
  }

  function el(tag, cls, html){ var x=document.createElement(tag); if(cls)x.className=cls; if(html!=null)x.innerHTML=html; return x; }
  function escape(s){ return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }

  var currentTab = 'map';
  function mount(){
    injectCSS(); state();
    if (!document.getElementById('__gp_fab__')) {
      var fab = el('button', '', '✨ Gramática Pro'); fab.id='__gp_fab__'; fab.onclick=open; document.body.appendChild(fab);
    }
    if (!document.getElementById('__gp_shell__')) {
      var shell = el('div'); shell.id='__gp_shell__';
      shell.innerHTML = '<div class="__gp_panel"><div class="__gp_head"><div class="__gp_top"><div><div class="__gp_title">Gramática Pro</div><div class="__gp_sub">Mapa de domínio, banco de erros, revisão inteligente, coach, treino e diagnóstico.</div></div><button class="__gp_close" id="__gp_close__">×</button></div><div class="__gp_tabs" id="__gp_tabs__"></div></div><div class="__gp_body" id="__gp_body__"></div></div>';
      document.body.appendChild(shell);
      document.getElementById('__gp_close__').onclick=close;
      shell.addEventListener('click',function(e){ if(e.target===shell) close(); });
    }
    render();
  }
  function open(){ document.getElementById('__gp_shell__').classList.add('on'); render(); }
  function close(){ document.getElementById('__gp_shell__').classList.remove('on'); }
  function setTab(t){ currentTab=t; render(); }

  function renderTabs(){
    var tabs=[['map','Mapa'],['coach','Coach'],['train','Treino'],['errors','Erros'],['review','Revisão'],['diagnostic','Diagnóstico']];
    var wrap=document.getElementById('__gp_tabs__'); if(!wrap) return; wrap.innerHTML='';
    tabs.forEach(function(t){ var b=el('button','__gp_tab'+(currentTab===t[0]?' active':''),t[1]); b.onclick=function(){setTab(t[0]);}; wrap.appendChild(b); });
  }
  function render(){
    renderTabs(); var body=document.getElementById('__gp_body__'); if(!body) return;
    if(currentTab==='map') return renderMap(body);
    if(currentTab==='coach') return renderCoach(body);
    if(currentTab==='train') return renderTrain(body);
    if(currentTab==='errors') return renderErrors(body);
    if(currentTab==='review') return renderReview(body);
    if(currentTab==='diagnostic') return renderDiagnostic(body);
  }

  function renderMap(body){
    var s=state(); var avg=Math.round(TOPICS.reduce(function(a,t){return a+(s.mastery[t.id]||0);},0)/TOPICS.length);
    body.innerHTML='<div class="__gp_card"><h3>Domínio geral: '+avg+'%</h3><p>O mapa mostra quais pontos gramaticais estão fortes e quais precisam voltar na revisão.</p><div class="__gp_bar"><div class="__gp_fill" style="width:'+avg+'%"></div></div></div><div class="__gp_grid" style="margin-top:12px"></div>';
    var grid=body.querySelector('.__gp_grid');
    TOPICS.forEach(function(t){
      var m=s.mastery[t.id]||0; var locked=t.prereq.some(function(p){return (s.mastery[p]||0)<45;});
      var c=el('div','__gp_card');
      c.innerHTML='<h3>'+escape(t.name)+' <span class="__gp_badge">'+t.level+'</span></h3><p>'+escape(t.desc)+'</p><div class="__gp_bar"><div class="__gp_fill" style="width:'+m+'%"></div></div><div class="__gp_small">Domínio: <b>'+m+'%</b> '+(locked?' · 🔒 reforce pré-requisitos':' · liberado')+'</div>'+
      '<div>'+t.examples.map(function(x){return '<span class="__gp_badge">'+escape(x)+'</span>';}).join('')+'</div>';
      grid.appendChild(c);
    });
  }

  function findTraps(text){
    var out=[]; TRAPS.forEach(function(t){ var m=String(text||'').match(t.wrong); if(m) out.push({trap:t, match:m, fix:typeof t.fix==='function'?t.fix(m):t.fix}); }); return out;
  }
  function ruleCoach(text){
    var hits=findTraps(text); var lines=[];
    if(!String(text||'').trim()) return 'Escreva uma frase ou parágrafo em inglês para eu corrigir.';
    if(hits.length){
      lines.push('Encontrei estes pontos para corrigir:\n');
      hits.forEach(function(h,i){ lines.push((i+1)+'. '+h.trap.label+'\nCorreção sugerida: '+h.fix+'\nRegra: '+h.trap.tip+'\n'); addError({topic:h.trap.topic,type:h.trap.id,wrong:text,correct:h.fix,explanation:h.trap.tip}); });
      lines.push('Mini treino: crie mais 2 frases usando a forma correta.');
      return lines.join('\n');
    }
    lines.push('Não encontrei nenhum dos erros gramaticais típicos cadastrados.');
    lines.push('Boa prática: confira sujeito + verbo, artigo, preposição e tempo verbal.');
    addSuccess('present_simple',2);
    return lines.join('\n');
  }
  async function aiCoach(text){
    var key=''; try{key=localStorage.getItem(GEMINI_KEY)||'';}catch(e){}
    if(!key) return ruleCoach(text)+'\n\nDica: com sua Gemini key salva, o Coach também faz correção por IA.';
    var prompt='Você é um Grammar Coach para brasileiro aprendendo inglês. Corrija o texto, explique os erros gramaticais em PT-BR, classifique cada erro por tópico CEFR, dê uma versão natural e 3 mini exercícios. Responda curto, bonito e prático. Texto: '+text;
    var models=['gemini-2.0-flash','gemini-2.5-flash','gemini-1.5-flash-latest'];
    for(var i=0;i<models.length;i++){
      try{
        var res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+models[i]+':generateContent?key='+encodeURIComponent(key),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:.35,maxOutputTokens:900}})});
        if(!res.ok) continue; var j=await res.json(); var txt=((((j.candidates||[])[0]||{}).content||{}).parts||[]).map(function(p){return p.text||'';}).join('').trim();
        if(txt){ findTraps(text).forEach(function(h){addError({topic:h.trap.topic,type:h.trap.id,wrong:text,correct:h.fix,explanation:h.trap.tip});}); return txt; }
      }catch(e){}
    }
    return ruleCoach(text);
  }
  function renderCoach(body){
    body.innerHTML='<div class="__gp_card"><h3>Grammar Coach</h3><p>Escreva uma frase ou pequeno parágrafo. Eu corrijo, explico a regra e salvo padrões de erro para revisão.</p><textarea id="__gp_coach_text__" class="__gp_textarea" placeholder="Ex: She have 20 years and she go to home every day."></textarea><div class="__gp_row" style="margin-top:10px"><button id="__gp_analyze__" class="__gp_btn">Corrigir gramática</button><button id="__gp_clear__" class="__gp_btn secondary">Limpar</button></div><div id="__gp_coach_out__" class="__gp_result">Seu feedback aparecerá aqui.</div></div>';
    document.getElementById('__gp_clear__').onclick=function(){document.getElementById('__gp_coach_text__').value='';document.getElementById('__gp_coach_out__').textContent='Seu feedback aparecerá aqui.';};
    document.getElementById('__gp_analyze__').onclick=async function(){ var out=document.getElementById('__gp_coach_out__'); var txt=document.getElementById('__gp_coach_text__').value; out.textContent='Analisando com cuidado…'; out.textContent=await aiCoach(txt); };
  }

  var trainCurrent=null;
  function pickExercise(){ var weak=weakTopics().map(function(t){return t.id;}); var pool=EXERCISES.filter(function(e){return weak.indexOf(e.topic)!==-1;}); if(!pool.length) pool=EXERCISES; return pool[Math.floor(Math.random()*pool.length)]; }
  function renderTrain(body){
    if(!trainCurrent) trainCurrent=pickExercise(); var ex=trainCurrent; var t=topic(ex.topic);
    body.innerHTML='<div class="__gp_card"><h3>Treino por tipo <span class="__gp_badge">'+escape(ex.type)+'</span></h3><p><b>'+escape(t.name)+'</b> · '+escape(t.desc)+'</p><div class="__gp_hr"></div><h3>'+escape(ex.q)+'</h3><div id="__gp_answer_area__"></div><div id="__gp_train_out__" class="__gp_result">Responda para receber feedback.</div><div class="__gp_row" style="margin-top:10px"><button id="__gp_next_ex__" class="__gp_btn secondary">Próximo exercício</button></div></div>';
    var area=document.getElementById('__gp_answer_area__');
    if(ex.options){ ex.options.forEach(function(o){ var b=el('button','__gp_option',escape(o)); b.onclick=function(){checkExercise(o);}; area.appendChild(b); }); }
    else { area.innerHTML='<textarea id="__gp_free_answer__" class="__gp_textarea" style="min-height:80px" placeholder="Digite sua resposta"></textarea><button id="__gp_check_free__" class="__gp_btn" style="margin-top:10px">Verificar</button>'; document.getElementById('__gp_check_free__').onclick=function(){checkExercise(document.getElementById('__gp_free_answer__').value);}; }
    document.getElementById('__gp_next_ex__').onclick=function(){trainCurrent=pickExercise();render();};
  }
  function norm(s){return String(s||'').toLowerCase().replace(/[?.!,]/g,'').replace(/\s+/g,' ').trim();}
  function checkExercise(ans){
    var ex=trainCurrent; var ok=norm(ans)===norm(ex.answer); var out=document.getElementById('__gp_train_out__');
    if(ok){ addSuccess(ex.topic,8); out.textContent='✅ Correto! '+ex.exp; }
    else { addError({topic:ex.topic,type:ex.type,wrong:ans,correct:ex.answer,explanation:ex.exp}); out.textContent='⚠️ Ainda não.\nResposta correta: '+ex.answer+'\nRegra: '+ex.exp; }
    Array.prototype.forEach.call(document.querySelectorAll('.__gp_option'),function(b){ if(norm(b.textContent)===norm(ex.answer)) b.classList.add('good'); else if(norm(b.textContent)===norm(ans)) b.classList.add('bad'); });
  }

  function renderErrors(body){
    var s=state(); body.innerHTML='<div class="__gp_card"><h3>Banco de erros</h3><p>Cada erro vira dado para revisão inteligente. Quanto mais você usa, mais personalizado fica.</p></div>';
    if(!s.errors.length){ body.innerHTML+='<div class="__gp_card" style="margin-top:12px"><p>Nenhum erro salvo ainda. Use o Coach ou o Treino para começar.</p></div>'; return; }
    s.errors.slice(0,25).forEach(function(e){ var c=el('div','__gp_card __gp_err'); c.style.marginTop='10px'; c.innerHTML='<h3>'+escape(topic(e.topic).name)+' <span class="__gp_badge">'+escape(e.type||'erro')+'</span></h3><p><b>Erro:</b> '+escape(e.wrong||'—')+'</p><p><b>Correto:</b> '+escape(e.correct||'—')+'</p><p class="__gp_small">'+escape(e.explanation||'')+'</p>'; body.appendChild(c); });
  }
  function renderReview(body){
    var weak=weakTopics(); body.innerHTML='<div class="__gp_card"><h3>Revisão inteligente</h3><p>Plano gerado pelos seus pontos mais fracos e pelos erros salvos.</p></div><div class="__gp_grid" style="margin-top:12px"></div>';
    var grid=body.querySelector('.__gp_grid');
    weak.forEach(function(t,i){ var pct=(5-i)*20; var c=el('div','__gp_card'); c.innerHTML='<h3>'+escape(t.name)+' <span class="__gp_badge">'+pct+'% da revisão</span></h3><p>'+escape(t.desc)+'</p><div class="__gp_small">Faça 3 exercícios, depois escreva 2 frases próprias usando esta regra.</div><button class="__gp_btn" style="margin-top:10px">Treinar agora</button>'; c.querySelector('button').onclick=function(){ trainCurrent=EXERCISES.find(function(e){return e.topic===t.id;})||pickExercise(); currentTab='train'; render(); }; grid.appendChild(c); });
  }

  var diagIndex=0, diagScore=0;
  var DIAG=EXERCISES.slice(0,10);
  function renderDiagnostic(body){
    var s=state();
    if(s.diagnostic && diagIndex===0){ body.innerHTML='<div class="__gp_card"><h3>Diagnóstico gramatical</h3><p>Último resultado: <b>'+s.diagnostic.score+'/'+s.diagnostic.total+'</b>. Pontos fracos: '+s.diagnostic.weak.map(function(id){return topic(id).name;}).join(', ')+'</p><button id="__gp_restart_diag__" class="__gp_btn">Refazer diagnóstico</button></div>'; document.getElementById('__gp_restart_diag__').onclick=function(){diagIndex=0;diagScore=0; var st=state(); st.diagnostic=null; save(st); render();}; return; }
    if(diagIndex>=DIAG.length){ var st=state(); var weak=weakTopics().slice(0,3).map(function(t){return t.id;}); st.diagnostic={score:diagScore,total:DIAG.length,weak:weak,date:new Date().toISOString()}; save(st); diagIndex=0; diagScore=0; render(); return; }
    var ex=DIAG[diagIndex]; body.innerHTML='<div class="__gp_card"><h3>Diagnóstico '+(diagIndex+1)+'/'+DIAG.length+'</h3><p>'+escape(ex.q)+'</p><div id="__gp_diag_area__"></div><div id="__gp_diag_out__" class="__gp_result">Escolha ou digite sua resposta.</div></div>';
    var area=document.getElementById('__gp_diag_area__');
    if(ex.options){ ex.options.forEach(function(o){ var b=el('button','__gp_option',escape(o)); b.onclick=function(){ answerDiag(o);}; area.appendChild(b); }); }
    else { area.innerHTML='<textarea id="__gp_diag_text__" class="__gp_textarea" style="min-height:78px"></textarea><button id="__gp_diag_btn__" class="__gp_btn" style="margin-top:10px">Responder</button>'; document.getElementById('__gp_diag_btn__').onclick=function(){answerDiag(document.getElementById('__gp_diag_text__').value);}; }
  }
  function answerDiag(ans){ var ex=DIAG[diagIndex]; if(norm(ans)===norm(ex.answer)){diagScore++; addSuccess(ex.topic,5);} else addError({topic:ex.topic,type:'diagnostic',wrong:ans,correct:ex.answer,explanation:ex.exp}); diagIndex++; render(); }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
