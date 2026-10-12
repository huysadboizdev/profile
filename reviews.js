(() => {
  const relationships = ['Teammate', 'Team lead / Manager', 'Client', 'Research supervisor', 'Other collaborator'];
  const validateReview = input => {
    const text = field => typeof input[field] === 'string' ? input[field].trim() : '';
    const rating = Number(input.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return { field: 'rating', error: 'Choose a rating from 1 to 5 stars.' };
    const name = text('name');
    if (!name || name.length > 80) return { field: 'name', error: 'Enter your name, up to 80 characters.' };
    const relationship = text('relationship');
    if (!relationships.includes(relationship)) return { field: 'relationship', error: 'Select how we worked together.' };
    const project = text('project');
    if (project.length > 100) return { field: 'project', error: 'Keep the project or company name under 100 characters.' };
    const comment = text('comment');
    if (comment.length < 20 || comment.length > 800) return { field: 'comment', error: 'Write a recommendation between 20 and 800 characters.' };
    if (input.consent !== true) return { field: 'consent', error: 'Please agree to sharing your feedback before submitting.' };
    return { value: { name, relationship, project, rating, comment, consent: true } };
  };
  const summarize = records => {
    const approved = records.filter(record => record.status === 'approved' && Number.isInteger(record.rating) && record.rating >= 1 && record.rating <= 5);
    return { count: approved.length, average: approved.length ? approved.reduce((sum, record) => sum + record.rating, 0) / approved.length : null };
  };
  const parseStored = raw => {
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      const ids = new Set();
      return parsed.slice(0, 40).flatMap(record => {
        if (!record || typeof record !== 'object') return [];
        const result = validateReview(record);
        if (!result.value || !['pending', 'approved'].includes(record.status) || typeof record.id !== 'string' || record.id.length > 80 || !record.id || ids.has(record.id) || typeof record.createdAt !== 'string' || !Number.isFinite(Date.parse(record.createdAt))) return [];
        ids.add(record.id);
        return [{ ...result.value, id: record.id, status: record.status, createdAt: record.createdAt }];
      });
    } catch { return []; }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = { validateReview, summarize, parseStored };
  if (typeof document === 'undefined') return;

  const section = document.getElementById('recommendations');
  if (!section) return;
  const t = (source, params) => window.PortfolioI18n?.t(source, params) ?? source.replace(/\{(\w+)\}/g, (match, key) => params && Object.hasOwn(params, key) ? String(params[key]) : match);
  const formatRating = rating => new Intl.NumberFormat(window.PortfolioI18n?.getLanguage() === 'vi' ? 'vi-VN' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(rating);
  const form = document.getElementById('recommendation-form');
  const formFields = document.getElementById('review-fields');
  const status = document.getElementById('review-status');
  let statusSource = '';
  let previewStatusSource = '';
  const setStatus = source => { statusSource = source; status.textContent = t(source); };
  const setPreviewStatus = source => { previewStatusSource = source; previewStatus.textContent = t(source); };
  const note = document.getElementById('review-mode-note');
  const moderation = document.getElementById('review-preview-controls');
  const pendingList = document.getElementById('pending-reviews');
  const publishedList = document.getElementById('published-reviews');
  const preview = ['localhost', '127.0.0.1', '[::1]', '::1'].includes(location.hostname);
  const storageKey = 'portfolio-review-preview-v1';
  let records = [];
  let persistent = true;
  if (preview) {
    try {
      records = parseStored(localStorage.getItem(storageKey));
      localStorage.setItem(storageKey, JSON.stringify(records));
    } catch { persistent = false; }
  }
  const updateNote = () => {
    note.textContent = preview
      ? t(persistent ? 'Local preview · Feedback stays in this browser and is not sent to Huy.' : 'Local preview · Browser storage is unavailable. Feedback lasts only until this page is closed or refreshed.')
      : t('Online submissions are not available yet. Please send your recommendation by email.');
  };
  const persist = () => {
    try { localStorage.setItem(storageKey, JSON.stringify(records)); } catch { persistent = false; }
    updateNote();
  };
  const element = (tag, className, content) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  };
  const makeCard = record => {
    const card = element('article', 'recommendation-card');
    const header = element('div', 'recommendation-card-top');
    const author = element('div', 'recommendation-author');
    author.append(element('span', 'review-avatar', record.name.slice(0, 1).toUpperCase()));
    const identity = element('div');
    identity.append(element('h4', '', record.name), element('p', '', t(record.relationship)));
    author.append(identity);
    const stars = element('span', 'review-card-stars', '★'.repeat(record.rating) + '☆'.repeat(5 - record.rating));
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', t('{rating} out of 5 stars', { rating: record.rating }));
    header.append(author, stars);
    card.append(header, element('p', 'recommendation-quote', record.comment));
    const footer = element('div', 'recommendation-card-footer');
    if (record.project) footer.append(element('span', '', record.project));
    footer.append(element('span', 'review-preview-label', t(record.status === 'approved' ? 'Approved · local preview' : 'Pending · local preview')));
    card.append(footer);
    return card;
  };
  const render = () => {
    if (!preview) document.getElementById('review-rating-hint').textContent = t('Choose a rating');
    const summary = summarize(records);
    document.getElementById('review-average').textContent = summary.average === null ? '—' : formatRating(summary.average);
    document.getElementById('review-average').setAttribute('aria-label', t('Average rating'));
    document.getElementById('published-reviews').setAttribute('aria-label', t('Approved recommendations'));
    document.getElementById('review-count').textContent = summary.count ? t(summary.count === 1 ? '{count} approved recommendation' : '{count} approved recommendations', { count: summary.count }) + (preview ? t(' · preview') : '') : t('No published recommendations yet');
    const ratingDisplay = document.getElementById('review-summary-stars');
    ratingDisplay.textContent = summary.average === null ? '☆☆☆☆☆' : '★'.repeat(Math.round(summary.average)) + '☆'.repeat(5 - Math.round(summary.average));
    ratingDisplay.setAttribute('aria-label', summary.average === null ? t('Not yet rated') : t('{rating} out of 5 stars', { rating: formatRating(summary.average) }));
    document.getElementById('review-empty').hidden = summary.count > 0;
    publishedList.replaceChildren(...records.filter(record => record.status === 'approved').map(makeCard));
    const pending = records.filter(record => record.status === 'pending');
    document.getElementById('review-pending-count').textContent = t('{count} pending', { count: pending.length });
    pendingList.replaceChildren();
    for (const record of records) {
      const card = makeCard(record);
      const actions = element('div', 'review-moderation-actions');
      if (record.status === 'pending') {
        const approve = element('button', 'button button-small', t('Approve preview'));
        approve.type = 'button';
        approve.setAttribute('aria-label', t('Approve preview from {name}', { name: record.name }));
        approve.addEventListener('click', () => {
          record.status = 'approved'; persist(); render();
          setPreviewStatus('Approved in this local preview. The preview rating has been updated.');
        });
        actions.append(approve);
      }
      const remove = element('button', 'button button-outline button-small', t('Remove'));
      remove.type = 'button';
      remove.setAttribute('aria-label', t('Remove preview from {name}', { name: record.name }));
      remove.addEventListener('click', () => {
        records = records.filter(item => item.id !== record.id); persist(); render();
        setPreviewStatus('Preview feedback removed.');
      });
      actions.append(remove); card.append(actions); pendingList.append(card);
    }
    document.getElementById('review-preview-empty').hidden = records.length > 0;
  };
  const previewStatus = document.getElementById('review-preview-status');
  updateNote();
  moderation.hidden = !preview;
  formFields.disabled = !preview;
  render();
  document.addEventListener('portfolio:languagechange', () => {
    updateNote(); render();
    status.textContent = t(statusSource);
    previewStatus.textContent = t(previewStatusSource);
    if (preview) {
      updateRating();
      for (const field of form.querySelectorAll('[data-validation-source]')) field.setCustomValidity(t(field.dataset.validationSource));
    }
  });
  if (!preview) return;

  const ratingInputs = [...form.querySelectorAll('input[name="rating"]')];
  const ratingHint = document.getElementById('review-rating-hint');
  const updateRating = () => {
    const selected = Number(form.querySelector('input[name="rating"]:checked')?.value || 0);
    ratingInputs.forEach(input => input.closest('label').classList.toggle('is-selected', Number(input.value) <= selected));
    const descriptions = ['Choose a rating', '1 star · Needs improvement', '2 stars · Fair', '3 stars · Good', '4 stars · Very good', '5 stars · Excellent'];
    ratingHint.textContent = t(descriptions[selected]);
  };
  updateRating();
  ratingInputs.forEach(input => input.addEventListener('change', updateRating));
  const counter = document.getElementById('review-comment-count');
  form.elements.comment.addEventListener('input', () => { counter.textContent = `${form.elements.comment.value.length} / 800`; });
  form.addEventListener('input', event => {
    event.target.setCustomValidity?.('');
    delete event.target.dataset.validationSource;
    if (event.target.name === 'rating') ratingInputs.forEach(input => { input.setCustomValidity(''); delete input.dataset.validationSource; });
    setStatus('');
  });
  // Custom messages follow the selected site language rather than browser locale.
  form.noValidate = true;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const result = validateReview({ name: data.get('name'), relationship: data.get('relationship'), project: data.get('project'), rating: data.get('rating'), comment: data.get('comment'), consent: form.elements.consent.checked });
    if (result.error) {
      setStatus(result.error);
      const field = result.field === 'rating' ? ratingInputs[0] : form.elements[result.field];
      field.dataset.validationSource = result.error;
      field.setCustomValidity(t(result.error)); field.reportValidity(); field.focus();
      return;
    }
    if (records.length >= 40) { setStatus('This preview holds up to 40 recommendations. Remove a preview entry to try another.'); return; }
    const record = { ...result.value, id: `review-${Date.now()}-${Math.random().toString(36).slice(2)}`, createdAt: new Date().toISOString(), status: 'pending' };
    records.unshift(record); persist(); render(); form.reset(); updateRating();
    counter.textContent = '0 / 800';
    setStatus('Saved as pending in this preview. You can approve it in “Preview moderation” below. Nothing has been sent or published online.');
    status.focus();
  });
})();
