/* Applied before paint; storage is an optional preference. */
(() => {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    document.documentElement.dataset.theme = saved === 'light' || saved === 'dark' ? saved :
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch { document.documentElement.dataset.theme = 'light'; }
})();
