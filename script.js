(() => {
  const root = document.documentElement;
  const t = source => window.PortfolioI18n?.t(source) ?? source;
  const menu = document.querySelector('.main-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const themeButton = document.querySelector('.theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const closeMenu = () => {
    if (!menu || !menuButton) return;
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', t('Open navigation'));
  };
  if (menu && menuButton) {
    menuButton.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', t(open ? 'Close navigation' : 'Open navigation'));
    });
    menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) { closeMenu(); menuButton.focus(); }
    });
    document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
    window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
  }
  const updateThemeButton = () => {
    const dark = root.dataset.theme === 'dark';
    themeButton?.setAttribute('aria-pressed', String(dark));
    themeButton?.setAttribute('aria-label', t(dark ? 'Switch to light theme' : 'Switch to dark theme'));
    if (themeMeta) themeMeta.content = dark ? '#191d24' : '#fafaf8';
  };
  updateThemeButton();
  document.addEventListener('portfolio:languagechange', () => {
    updateThemeButton();
    menuButton?.setAttribute('aria-label', t(menu?.classList.contains('is-open') ? 'Close navigation' : 'Open navigation'));
  });
  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch { /* Optional preference. */ }
    updateThemeButton();
  });
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
  if ('IntersectionObserver' in window && menu) {
    const links = [...menu.querySelectorAll('a[href^="#"]')];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const link = links.find(item => item.getAttribute('href') === `#${entry.target.id}`);
        if (!link) continue;
        if (entry.isIntersecting) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    links.forEach(link => {
      const section = document.getElementById(link.getAttribute('href').slice(1));
      if (section) observer.observe(section);
    });
  }
  /* Hide mobile navigation only after its event handlers are attached. */
  root.classList.add('js');
})();
