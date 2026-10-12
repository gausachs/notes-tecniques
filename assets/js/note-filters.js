(() => {
  const browser = document.querySelector('[data-note-browser]');
  if (!browser) return;

  const normalize = tag => tag.trim().toLocaleLowerCase('ca');
  const cards = Array.from(browser.querySelectorAll('[data-note-tags]'), element => ({
    element,
    tags: (JSON.parse(element.dataset.noteTags) || []).map(normalize)
  }));
  const tags = [...new Set(cards.flatMap(card => card.tags))].filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'ca'));
  const filters = browser.querySelector('[data-tag-filters]');
  const count = browser.querySelector('[data-note-count]');
  const empty = browser.querySelector('[data-empty-message]');

  function select(tag) {
    const url = new URL(window.location.href);
    if (tag) url.searchParams.set('tag', tag);
    else url.searchParams.delete('tag');
    if (url.href !== window.location.href) window.history.pushState(null, '', url);
    render();
  }

  const buttons = ['', ...tags].map(tag => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tag-filter';
    const total = tag ? cards.filter(card => card.tags.includes(tag)).length : cards.length;
    button.textContent = `${tag || 'Totes'} (${total})`;
    button.addEventListener('click', () => select(tag));
    filters.append(button);
    return { button, tag };
  });

  function render() {
    const selected = normalize(new URL(window.location.href).searchParams.get('tag') || '');
    let visible = 0;
    cards.forEach(card => {
      card.element.hidden = Boolean(selected) && !card.tags.includes(selected);
      if (!card.element.hidden) visible++;
    });
    buttons.forEach(({ button, tag }) => button.setAttribute('aria-pressed', String(tag === selected)));
    count.textContent = `${visible} ${visible === 1 ? 'nota' : 'notes'}${selected ? ` · ${selected}` : ''}`;
    empty.hidden = visible !== 0;
  }

  browser.querySelectorAll('[data-tag-link]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const tag = normalize(new URL(link.href).searchParams.get('tag') || '');
      select(tag);
      const target = buttons.find(item => item.tag === tag);
      if (target) target.button.focus();
    });
  });
  filters.hidden = false;
  window.addEventListener('popstate', render);
  render();
})();
