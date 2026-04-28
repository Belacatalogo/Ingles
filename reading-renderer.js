/* === FLUENCY V20.1 - READING RENDERER LIMPO === */
;(function(){
  try{
    if(window.__fluencyReadingRendererV201) return;
    window.__fluencyReadingRendererV201 = true;

    var VERSION = 'V20.1-READING-RENDERER-LIMPO';

    function txt(v){ return String(v == null ? '' : v).trim(); }
    function esc(v){
      return txt(v).replace(/[&<>"]/g,function(c){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
      });
    }
    function norm(v){
      try{
        return txt(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      }catch(_){
        return txt(v).toLowerCase();
      }
    }
    function arr(v){ return Array.isArray(v) ? v : []; }
    function id(s){
      return norm(s).replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,48) || ('bloco-'+Math.random().toString(36).slice(2,7));
    }
    function pick(o, keys){
      if(!o || typeof o !== 'object') return '';
      for(var i=0;i<keys.length;i++){
        var v = o[keys[i]];
        if(v != null && txt(v)) return v;
      }
      return '';
    }
    function lessonBlob(L){
      var parts = [
        L && L.__key,
        L && L.skill,
        L && L.focusKey,
        L && L.type,
        L && L.category,
        L && L.title,
        L && L.subtitle,
        L && L.intro,
        L && L.finalTip
      ];
      arr(L && L.sections).forEach(function(s){
        parts.push(s && (s.heading || s.title || s.content || ''));
      });
      arr(L && L.exercises).slice(0,3).forEach(function(e){
        parts.push(e && (e.type || e.question || ''));
      });
      return norm(parts.join('\n'));
    }

    window.__fluencyIsReadingLessonV201 = function(L){
      try{
        var blob = lessonBlob(L);

        // Principal: a chave do cache normalmente carrega a habilidade do dia.
        if(/(^|[_\-\/ ])reading($|[_\-\/ ])/.test(blob)) return true;

        // Fallback: só considera leitura se aparecer como tema real da aula.
        if(/aula de leitura|reading lesson|reading practice|reading comprehension|compreensao de leitura|compreensão de leitura/.test(blob)) return true;
        if(/read the text|reading passage|texto de leitura|passagem de leitura|skimming|scanning/.test(blob)) return true;

        return false;
      }catch(_){
        return false;
      }
    };

    function exampleCard(ex, i){
      if(typeof ex === 'string') ex = {en:ex};
      ex = ex || {};
      var en = pick(ex, ['en','english','sentence','phrase','example','text']) || txt(ex);
      var pt = pick(ex, ['pt','portuguese','translation','traducao','tradução','meaning']);
      var n = 'fr-ex-' + i + '-' + Math.random().toString(36).slice(2,6);

      return ''+
        '<div class="fr-card fr-example-card">'+
          '<div class="fr-example-top">'+
            '<span class="fr-mini-label">Example</span>'+
            '<span class="fr-example-num">'+(i+1)+'</span>'+
          '</div>'+
          '<div class="fr-en">'+esc(en)+'</div>'+
          (pt ? '<details class="fr-details"><summary>Mostrar tradução</summary><div class="fr-pt">'+esc(pt)+'</div></details>' : '')+
        '</div>';
    }

    function renderHero(L){
      var title = esc(L.title || 'Reading Practice');
      var subtitle = esc(L.subtitle || 'Leia com calma, entenda o contexto e responda sem ver a solução primeiro.');
      var minutes = esc(L.estimatedMinutes || L.minutes || L.duration || 25);
      var sections = arr(L.sections).length;
      var vocab = arr(L.vocabulary).length;
      var exercises = arr(L.exercises).length;

      return ''+
        '<section class="fr-reading-hero">'+
          '<div class="fr-orb fr-orb-a"></div>'+
          '<div class="fr-orb fr-orb-b"></div>'+
          '<div class="fr-hero-content">'+
            '<div class="fr-eyebrow">Reading lesson · '+VERSION+'</div>'+
            '<h1>'+title+'</h1>'+
            (subtitle ? '<p>'+subtitle+'</p>' : '')+
            '<div class="fr-stats">'+
              '<span>'+minutes+' min</span>'+
              '<span>'+sections+' seções</span>'+
              '<span>'+vocab+' vocabulários</span>'+
              '<span>'+exercises+' exercícios</span>'+
            '</div>'+
          '</div>'+
        '</section>';
    }

    function renderNav(L){
      var items = [];
      if(L.intro) items.push(['fr-intro','Introdução']);
      arr(L.sections).forEach(function(s,i){ items.push(['fr-sec-'+i, (i === 0 ? 'Texto principal' : (s.heading || ('Parte '+(i+1))))]); });
      if(arr(L.vocabulary).length) items.push(['fr-vocab','Vocabulário']);
      if(arr(L.exercises).length) items.push(['fr-exercises','Exercícios']);
      if(arr(L.commonMistakes).length) items.push(['fr-mistakes','Erros comuns']);
      if(arr(L.tips).length) items.push(['fr-tips','Dicas']);
      if(!items.length) return '';

      return '<nav class="fr-reading-nav">'+items.map(function(it){
        return '<a href="#'+esc(it[0])+'">'+esc(it[1])+'</a>';
      }).join('')+'</nav>';
    }

    function renderIntro(L){
      if(!L.intro) return '';
      return ''+
        '<section id="fr-intro" class="fr-panel fr-intro-panel">'+
          '<div class="fr-section-kicker">Antes de ler</div>'+
          '<h2>Objetivo da leitura</h2>'+
          '<p>'+esc(L.intro)+'</p>'+
        '</section>';
    }

    function renderSections(L){
      return arr(L.sections).map(function(sec,i){
        sec = sec || {};
        var heading = esc(sec.heading || sec.title || (i === 0 ? 'Texto principal' : 'Parte '+(i+1)));
        var content = esc(sec.content || sec.text || '');
        var examples = arr(sec.examples || sec.exemplos || sec.sentences || sec.frases);

        return ''+
          '<article id="fr-sec-'+i+'" class="fr-panel '+(i===0?'fr-main-reading':'fr-reading-section')+'">'+
            '<div class="fr-section-kicker">'+(i===0?'Reading passage':'Reading notes')+'</div>'+
            '<h2>'+heading+'</h2>'+
            (content ? '<div class="fr-reading-text">'+content+'</div>' : '')+
            (examples.length ? '<div class="fr-examples-grid">'+examples.map(exampleCard).join('')+'</div>' : '')+
          '</article>';
      }).join('');
    }

    function renderVocabulary(L){
      var vocab = arr(L.vocabulary);
      if(!vocab.length) return '';
      return ''+
        '<section id="fr-vocab" class="fr-panel fr-vocab-panel">'+
          '<div class="fr-section-kicker">Palavras úteis</div>'+
          '<h2>Vocabulário da leitura</h2>'+
          '<div class="fr-vocab-grid">'+vocab.map(function(v){
            v = v || {};
            return ''+
              '<div class="fr-card fr-vocab-card">'+
                '<div class="fr-word-row">'+
                  '<strong>'+esc(v.word || v.term || '')+'</strong>'+
                  (v.pos ? '<span>'+esc(v.pos)+'</span>' : '')+
                '</div>'+
                (v.translation ? '<div class="fr-translation">'+esc(v.translation)+'</div>' : '')+
                (v.example ? '<div class="fr-vocab-example">“'+esc(v.example)+'”</div>' : '')+
              '</div>';
          }).join('')+'</div>'+
        '</section>';
    }

    function renderExercises(L){
      var exercises = arr(L.exercises);
      if(!exercises.length) return '';
      return ''+
        '<section id="fr-exercises" class="fr-panel fr-exercise-panel">'+
          '<div class="fr-section-kicker">Compreensão</div>'+
          '<h2>Exercícios sem resposta à mostra</h2>'+
          '<div class="fr-exercise-grid">'+exercises.map(function(e,i){
            e = e || {};
            var options = arr(e.options);
            return ''+
              '<div class="fr-card fr-exercise-card">'+
                '<div class="fr-question"><span>'+(i+1)+'</span>'+esc(e.question || '')+'</div>'+
                (options.length ? '<div class="fr-options">'+options.map(function(o){ return '<div>'+esc(o)+'</div>'; }).join('')+'</div>' : '')+
                '<details class="fr-details fr-answer-details">'+
                  '<summary>Ver resposta</summary>'+
                  (e.answer ? '<div class="fr-answer"><b>Resposta:</b> '+esc(e.answer)+'</div>' : '')+
                  (e.explanation ? '<div class="fr-explanation">'+esc(e.explanation)+'</div>' : '')+
                '</details>'+
              '</div>';
          }).join('')+'</div>'+
        '</section>';
    }

    function renderMistakes(L){
      var mistakes = arr(L.commonMistakes || L.common_mistakes);
      if(!mistakes.length) return '';
      return ''+
        '<section id="fr-mistakes" class="fr-panel fr-mistakes-panel">'+
          '<div class="fr-section-kicker">Atenção</div>'+
          '<h2>Erros comuns</h2>'+
          '<div class="fr-mistakes-grid">'+mistakes.map(function(m){
            m = m || {};
            return ''+
              '<div class="fr-card fr-mistake-card">'+
                (m.mistake ? '<strong>'+esc(m.mistake)+'</strong>' : '')+
                (m.why ? '<p>'+esc(m.why)+'</p>' : '')+
                (m.avoid ? '<div class="fr-avoid">Como evitar: '+esc(m.avoid)+'</div>' : '')+
              '</div>';
          }).join('')+'</div>'+
        '</section>';
    }

    function renderTips(L){
      var tips = arr(L.tips);
      if(!tips.length) return '';
      return ''+
        '<section id="fr-tips" class="fr-panel fr-tips-panel">'+
          '<div class="fr-section-kicker">Fechamento</div>'+
          '<h2>Dicas para fixar</h2>'+
          '<ul>'+tips.map(function(t){ return '<li>'+esc(t)+'</li>'; }).join('')+'</ul>'+
        '</section>';
    }

    function renderFinal(L){
      if(!L.finalTip) return '';
      return '<section class="fr-final-card">“'+esc(L.finalTip)+'”</section>';
    }

    window.__fluencyRenderReadingLessonV201 = function(L){
      L = L || {};
      return ''+
        '<section class="fluency-v18-full-lesson-render fluency-reading-render-v201" data-renderer="'+VERSION+'">'+
          renderHero(L)+
          renderNav(L)+
          renderIntro(L)+
          renderSections(L)+
          renderVocabulary(L)+
          renderExercises(L)+
          renderMistakes(L)+
          renderTips(L)+
          renderFinal(L)+
        '</section>';
    };

  }catch(e){
    try{ console.warn('Fluency Reading Renderer V20.1 falhou', e); }catch(_){}
  }
})();
