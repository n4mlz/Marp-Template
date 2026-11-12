(() => {
  function fitAll() {
    for (const frame of document.querySelectorAll('.fit')) {
      const content = frame.firstElementChild;
      if (!content) continue;
      content.style.fontSize = '';
      const initialSize = parseFloat(getComputedStyle(content).fontSize);
      if (!initialSize || (content.scrollHeight <= frame.clientHeight && content.scrollWidth <= frame.clientWidth)) continue;
      let low = 1;
      let high = initialSize;
      for (let i = 0; i < 12; i++) {
        const mid = (low + high) / 2;
        content.style.fontSize = `${mid}px`;
        if (content.scrollHeight <= frame.clientHeight && content.scrollWidth <= frame.clientWidth) low = mid;
        else high = mid;
      }
      content.style.fontSize = `${low}px`;
    }
  }
  function run() {
    fitAll();
    if (document.fonts) document.fonts.ready.then(fitAll);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
  window.addEventListener('resize', fitAll);
})();
