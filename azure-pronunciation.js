/* Fluency loader: Azure Pronunciation core + Shadowing AI enhancer */
(function(){
  'use strict';
  if (window.__fluencyAzureLoaderLoaded) return;
  window.__fluencyAzureLoaderLoaded = true;
  var core = 'azure-pronunciation-core.js?v=5';
  var shadow = 'shadowing-ai.js?v=1';
  if (document.readyState === 'loading') {
    document.write('<script src="' + core + '"><\/script><script src="' + shadow + '"><\/script>');
  } else {
    var s1 = document.createElement('script');
    s1.src = core;
    s1.onload = function(){
      var s2 = document.createElement('script');
      s2.src = shadow;
      document.head.appendChild(s2);
    };
    document.head.appendChild(s1);
  }
})();
