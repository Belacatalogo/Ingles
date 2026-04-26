/* Fluency loader: Azure Pronunciation core + Shadowing AI enhancer + Grammar Pro + Audio Guard */
(function(){
  'use strict';
  if (window.__fluencyAzureLoaderLoaded) return;
  window.__fluencyAzureLoaderLoaded = true;
  var guard = 'audio-volume-guard.js?v=2';
  var core = 'azure-pronunciation-core.js?v=5';
  var shadow = 'shadowing-ai.js?v=3';
  var grammar = 'grammar-pro.js?v=1';
  if (document.readyState === 'loading') {
    document.write('<script src="' + guard + '"><\/script><script src="' + core + '"><\/script><script src="' + shadow + '"><\/script><script src="' + grammar + '"><\/script>');
  } else {
    var s0 = document.createElement('script');
    s0.src = guard;
    s0.onload = function(){
      var s1 = document.createElement('script');
      s1.src = core;
      s1.onload = function(){
        var s2 = document.createElement('script');
        s2.src = shadow;
        s2.onload = function(){
          var s3 = document.createElement('script');
          s3.src = grammar;
          document.head.appendChild(s3);
        };
        document.head.appendChild(s2);
      };
      document.head.appendChild(s1);
    };
    document.head.appendChild(s0);
  }
})();
