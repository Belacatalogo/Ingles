(function(){
  'use strict';
  if (window.__fluency_lesson_enhancer_v382) return;
  window.__fluency_lesson_enhancer_v382 = true;
  var VERSION = 'V38.2-BLOCOS-MULTIKEY-DIAG';
  var STORE = 'fluency_lesson_keys_multi_v382';
  var pending = [];
  var keyPrefix = 'AI' + 'za';
  function log(type,msg){
    var line='[Aulas IA '+VERSION+'] '+msg;
    try{console.log(line);}catch(e){}
    try{if(typeof window.__diag_log==='function'){while(pending.length){var p=pending.shift();window.__diag_log(p.t,p.m);}window.__diag_log(type||'info',line);}else{pending.push({t:type||'info',m:line});if(pending.length>50)pending.shift();}}catch(e){}
  }
  function txt(v){try{return typeof v==='string'?v:JSON.stringify(v||{});}catch(e){return String(v||'');}}
  function parseKeys(s){return String(s||'').split(/[\s,;]+/).map(function(x){return x.trim();}).filter(function(x){return x.indexOf(keyPrefix)===0&&x.length>25;});}
  function unique(a){var m={},o=[];(a||[]).forEach(function(k){if(k&&!m[k]){m[k]=1;o.push(k);}});return o;}
  function mask(k){return k?k.slice(0,8)+'...'+k.slice(-4):'';}
  function allKeys(urlKey){
    var list=urlKey?[urlKey]:[];
    try{list=list.concat(parseKeys(localStorage.getItem(STORE)||''));}catch(e){}
    var aliases=['fluency_lessonGeminiApiKey','fluency_lessonGeminiKey','lessonGeminiApiKey','lessonGeminiKey','fluency_geminiLessonKey','fluency_proLessonGeminiApiKey','fluency_aulasGeminiKey','fluency_lesson_key','fluency_lesson_api_key'];
    try{aliases.forEach(function(a){list=list.concat(parseKeys(localStorage.getItem(a)||''));});}catch(e){}
    return unique(list);
  }
  function reqUrl(i){try{return i instanceof Request?i.url:String(i);}catch(e){return String(i);}}
  function isGemini(u){try{var x=new URL(u,location.href);return x.hostname.indexOf('generativelanguage.googleapis.com')>=0&&x.pathname.indexOf('generateContent')>=0;}catch(e){return false;}}
  function withKey(u,k){var x=new URL(String(u),location.href);if(k)x.searchParams.set('key',k);return x.href;}
  function reqInit(input,init,body){var o={};try{if(input instanceof Request){o.method=input.method;o.headers=new Headers(input.headers);o.credentials=input.credentials;o.mode=input.mode;o.cache=input.cache;o.redirect=input.redirect;}}catch(e){}if(init){Object.keys(init).forEach(function(k){o[k]=init[k];});if(init.headers)o.headers=new Headers(init.headers);}if(!o.method)o.method='POST';if(body!=null)o.body=body;return o;}
  function prompt(body){var out=[];try{(body.contents||[]).forEach(function(c){(c.parts||[]).forEach(function(p){if(typeof p.text==='string')out.push(p.text);});});}catch(e){}return out.join('\n');}
  function isLesson(body){var all=txt(body),p=prompt(body)||all;if(/responseModalities|speechConfig|audioData|inlineData/i.test(all))return false;return /(aula|lesson|sections|exercises|vocabulary|estimatedMinutes|readingText|listeningText|finalTip)/i.test(p)&&/(json|retorne|return)/i.test(p)&&p.indexOf('__FLUENCY_BLOCK_')<0;}
  function addInstruction(body,ins){var b=JSON.parse(JSON.stringify(body));var ok=false;try{for(var i=b.contents.length-1;i>=0&&!ok;i--){var parts=b.contents[i].parts||[];for(var j=parts.length-1;j>=0;j--){if(typeof parts[j].text==='string'){parts[j].text+='\n\n'+ins;ok=true;break;}}}}catch(e){}if(!ok)b.contents=[{role:'user',parts:[{text:ins}]}];return b;}
  function textFrom(j){try{return j.candidates[0].content.parts[0].text||'';}catch(e){return '';}}
  function parseJSON(s){s=String(s||'').trim();var f=String.fromCharCode(96,96,96);s=s.replace(new RegExp('^'+f+'(json)?','i'),'').replace(new RegExp(f+'$'),'').trim();try{return JSON.parse(s);}catch(e){}var a=s.indexOf('{'),b=s.lastIndexOf('}');if(a>=0&&b>a){try{return JSON.parse(s.slice(a,b+1));}catch(e2){}}return null;}
  function arr(v){return Array.isArray(v)?v:[];}
  function merge(parts){var r={};parts.forEach(function(p){if(!p||typeof p!=='object')return;Object.keys(p).forEach(function(k){if(Array.isArray(p[k]))r[k]=arr(r[k]).concat(p[k]);else if(p[k]&&typeof p[k]==='object')r[k]=Object.assign({},r[k]||{},p[k]);else if(p[k]!==undefined&&p[k]!==null&&p[k]!==''&&(r[k]==null||k==='finalTip'))r[k]=p[k];});});r.sections=arr(r.sections);r.exercises=arr(r.exercises);r.vocabulary=arr(r.vocabulary);r.tips=arr(r.tips);r.estimatedMinutes=Number(r.estimatedMinutes||25);if(!r.title)r.title='Aula de inglês gerada por IA';if(!r.subtitle)r.subtitle='Conteúdo estruturado em blocos';if(!r.intro)r.intro='Hoje vamos estudar com explicações, exemplos e prática guiada.';if(!r.finalTip)r.finalTip='Revise a aula em voz alta e refaça os exercícios para fixar.';return r;}
  function addVersionRow(){
    try{
      var panel=document.getElementById('__audio_diag__'); if(!panel)return;
      var old=document.getElementById('__diag_site_version__'); if(old){old.textContent=VERSION;return;}
      var body=panel.querySelector('.__diag_body__'); if(!body)return;
      var row=document.createElement('div'); row.className='__diag_row__';
      row.innerHTML='<span>🌐 Versão site</span><b id="__diag_site_version__">'+VERSION+'</b>';
      body.insertBefore(row, body.firstChild);
    }catch(e){}
  }
  function addMultiBox(){
    if(document.getElementById('__lesson_multikey_box__'))return;
    var nodes=[].slice.call(document.querySelectorAll('input,textarea,label,p,span,div'));
    var anchor=null;
    for(var i=0;i<nodes.length;i++){var t=(nodes[i].placeholder||nodes[i].textContent||nodes[i].value||'').toLowerCase();if((t.indexOf('key')>=0||t.indexOf('chave')>=0)&&(t.indexOf('aula')>=0||t.indexOf('gemini')>=0)){anchor=nodes[i];break;}}
    if(!anchor)return;
    var box=document.createElement('div');box.id='__lesson_multikey_box__';box.style.cssText='margin:10px 0;padding:10px;border:1px solid rgba(91,156,246,.35);border-radius:12px;background:rgba(91,156,246,.08);color:#E8EFF8;font-family:-apple-system,sans-serif;';
    box.innerHTML='<div style="font-weight:700;font-size:12px;margin-bottom:6px;">Chaves extras para aulas IA</div><textarea id="__lesson_multikey_text__" placeholder="Cole chaves Gemini, uma por linha" style="width:100%;min-height:88px;border-radius:10px;padding:10px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.16);color:#E8EFF8;font-size:12px;resize:vertical;"></textarea><div style="font-size:10px;opacity:.75;margin-top:6px;line-height:1.4;">A aula usa rotação de chaves e geração em 3 blocos.</div>';
    (anchor.closest('section,form,div')||anchor.parentElement||document.body).appendChild(box);
    var ta=document.getElementById('__lesson_multikey_text__');try{ta.value=localStorage.getItem(STORE)||'';}catch(e){}
    ta.addEventListener('input',function(){try{localStorage.setItem(STORE,ta.value);}catch(e){}log('info','chaves extras salvas: '+parseKeys(ta.value).length);});
    log('ok','campo de múltiplas chaves adicionado');
  }
  var nativeFetch=window.fetch&&window.fetch.bind(window);
  if(nativeFetch){window.fetch=async function(input,init){var url=reqUrl(input);if(!isGemini(url))return nativeFetch(input,init);var bodyText=init&&init.body;try{if(!bodyText&&input instanceof Request)bodyText=await input.clone().text();}catch(e){}var body=null;try{body=typeof bodyText==='string'?JSON.parse(bodyText):bodyText;}catch(e){}var urlKey='';try{urlKey=new URL(url,location.href).searchParams.get('key')||'';}catch(e){}var keys=allKeys(urlKey);async function call(callUrl,callBody,label){var tries=keys.length?keys:[urlKey];var last;for(var i=0;i<tries.length;i++){try{log('info',label+' usando chave '+(i+1)+'/'+tries.length+' '+mask(tries[i]));var res=await nativeFetch(withKey(callUrl,tries[i]),reqInit(input,init,callBody));if(res.ok){log('ok',label+' OK');return res;}last=new Error('HTTP '+res.status);log(res.status===429?'warn':'err',label+' falhou HTTP '+res.status);}catch(e){last=e;log('err',label+' erro '+(e&&e.message?e.message:e));}}throw last||new Error('Falha Gemini');}
      if(!body||!isLesson(body)){if(keys.length>1)return call(url,bodyText,'Gemini');return nativeFetch(input,init);}log('info','geração em 3 blocos ativada; '+Math.max(keys.length,1)+' chave(s)');var ins=['__FLUENCY_BLOCK_1_3__ Retorne APENAS JSON válido. Bloco 1/3: title, subtitle, estimatedMinutes, intro e no mínimo 3 sections com content detalhado e exatamente 3 examples {en,pt} por section.','__FLUENCY_BLOCK_2_3__ Retorne APENAS JSON válido. Bloco 2/3: vocabulary com no mínimo 8 itens {word,pos,translation,example} e exercises com no mínimo 6 itens {type,question,options,answer,explanation}.','__FLUENCY_BLOCK_3_3__ Retorne APENAS JSON válido. Bloco 3/3: tips com no mínimo 5 itens, finalTip e readingText ou listeningText quando fizer sentido. Complete campos faltantes.'];var got=[];for(var b=0;b<ins.length;b++){var res=await call(url,JSON.stringify(addInstruction(body,ins[b])),'Bloco '+(b+1)+'/3');var js=await res.clone().json();var tx=textFrom(js);var obj=parseJSON(tx);if(!obj){log('err','Bloco '+(b+1)+' sem JSON válido');throw new Error('Bloco '+(b+1)+' sem JSON válido');}got.push(obj);log('ok','Bloco '+(b+1)+' validado: '+tx.length+' caracteres');}var lesson=merge(got);log('ok','aula montada: '+lesson.sections.length+' seções, '+lesson.vocabulary.length+' vocabulários, '+lesson.exercises.length+' exercícios');return new Response(JSON.stringify({candidates:[{content:{role:'model',parts:[{text:JSON.stringify(lesson)}]},finishReason:'STOP'}]}),{status:200,headers:{'Content-Type':'application/json; charset=utf-8'}});};}
  document.addEventListener('click',function(ev){var n=ev.target;while(n&&n!==document.body){if(/gerar aula|nova aula|aula ia/i.test(n.textContent||'')){log('info','clique em gerar aula detectado');break;}n=n.parentElement;}setTimeout(addMultiBox,250);},true);
  try{new MutationObserver(function(){addVersionRow();addMultiBox();}).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
  setInterval(function(){addVersionRow();addMultiBox();if(typeof window.__diag_log==='function'&&pending.length)log('info','diagnóstico conectado');},1500);
  log('ok','carregado: versão visível + blocos + multikey');
})();
