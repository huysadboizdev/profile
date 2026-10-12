(() => {
  const dictionary = typeof module !== 'undefined' && module.exports ? require('./i18n-vi.js') : window.PortfolioVietnamese || {};
  const resolveLanguage = saved => saved === 'vi' ? 'vi' : 'en';
  const translate = (source, language = 'en', params = {}) => {
    const value = language === 'vi' && Object.hasOwn(dictionary, source) ? dictionary[source] : source;
    return value.replace(/\{(\w+)\}/g, (match, key) => Object.hasOwn(params, key) ? String(params[key]) : match);
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = { translate, resolveLanguage };
  if (typeof document === 'undefined') return;
  const storageKey = 'portfolio-language';
  let language = 'en';
  try { language = resolveLanguage(localStorage.getItem(storageKey)); } catch { /* Optional preference. */ }
  const textNodes = [];
  const attributes = [];
  // Capture static source copy once. Never retranslate user-entered feedback.
  const dynamic = '[data-i18n-dynamic], script, style, noscript, .language-switch';
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement?.closest(dynamic + ', textarea')) continue;
    const source = node.textContent.trim();
    if (Object.hasOwn(dictionary, source)) textNodes.push({ node, source, leading: node.textContent.match(/^\s*/)[0], trailing: node.textContent.match(/\s*$/)[0] });
  }
  // Text-only options need stable values before their labels are translated.
  document.querySelectorAll('select option:not([value])').forEach(option => option.setAttribute('value', option.textContent));
  document.querySelectorAll('[aria-label], [alt], [placeholder], meta[name="description"], meta[property="og:title"], meta[property="og:description"]').forEach(node => {
    if (node.closest(dynamic)) return;
    for (const attribute of ['aria-label', 'alt', 'placeholder', 'content']) {
      const source = node.getAttribute(attribute);
      if (source && Object.hasOwn(dictionary, source)) attributes.push({ node, attribute, source });
    }
  });
  const controls = [...document.querySelectorAll('[data-language]')];
  const apply = requested => {
    language = resolveLanguage(requested);
    document.documentElement.lang = language;
    for (const entry of textNodes) entry.node.textContent = entry.leading + translate(entry.source, language) + entry.trailing;
    for (const entry of attributes) entry.node.setAttribute(entry.attribute, translate(entry.source, language));
    for (const control of controls) control.setAttribute('aria-pressed', String(control.dataset.language === language));
    document.querySelectorAll('.language-switch').forEach(node => node.setAttribute('aria-label', translate('Language', language)));
    document.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
  };
  window.PortfolioI18n = { t: (source, params) => translate(source, language, params), getLanguage: () => language };
  controls.forEach(control => {
    control.addEventListener('click', () => {
      try { localStorage.setItem(storageKey, control.dataset.language); } catch { /* Language still works on this page. */ }
      apply(control.dataset.language);
    });
    control.closest('.language-switch').hidden = false;
  });
  apply(language);
})();
