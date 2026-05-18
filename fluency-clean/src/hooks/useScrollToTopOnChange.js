import { useEffect } from 'react';

function scrollDocumentToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

  const scrollRoot = document.scrollingElement || document.documentElement || document.body;
  if (scrollRoot) {
    scrollRoot.scrollTop = 0;
    scrollRoot.scrollLeft = 0;
  }

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function useScrollToTopOnChange(value) {
  useEffect(() => {
    const frame = window.requestAnimationFrame(scrollDocumentToTop);
    return () => window.cancelAnimationFrame(frame);
  }, [value]);
}
