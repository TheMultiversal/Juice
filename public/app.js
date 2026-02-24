// Common utilities for all pages

// ===== DARK MODE =====
function initDarkMode() {
  const saved = localStorage.getItem('juice_dark_mode');
  if (saved === 'true') document.body.classList.add('dark-mode');

  // Inject dark mode styles
  const style = document.createElement('style');
  style.textContent = `
    body.dark-mode { background: #121212 !important; color: #e0e0e0 !important; }
    body.dark-mode .panel, body.dark-mode .stat-box, body.dark-mode .comp-card,
    body.dark-mode .search-section, body.dark-mode .endpoint, body.dark-mode .bm-card,
    body.dark-mode table, body.dark-mode .shared-section, body.dark-mode .legend {
      background: rgba(30,30,40,0.92) !important; border-color: rgba(100,100,255,0.2) !important; color: #e0e0e0 !important;
    }
    body.dark-mode nav a { background: rgba(20,20,50,0.4) !important; backdrop-filter: blur(8px) !important; -webkit-backdrop-filter: blur(8px) !important; color: #7ab3ff !important; border: 1px solid rgba(100,100,255,0.2) !important; }
    body.dark-mode a { color: #7ab3ff !important; }
    body.dark-mode h1, body.dark-mode h2, body.dark-mode h3 { color: #c0d0ff !important; }
    body.dark-mode .tag { background: rgba(60,100,200,0.25) !important; color: #7ab3ff !important; }
    body.dark-mode input, body.dark-mode select, body.dark-mode textarea {
      background: #1e1e2e !important; color: #e0e0e0 !important; border-color: rgba(100,100,255,0.25) !important;
    }
    body.dark-mode th { background: rgba(60,60,100,0.3) !important; color: #c0d0ff !important; }
    body.dark-mode td { border-color: rgba(100,100,255,0.1) !important; }
    body.dark-mode .person-card, body.dark-mode .affiliation-card, body.dark-mode .connection-item,
    body.dark-mode .suggestion, body.dark-mode .search-result { background: rgba(40,40,60,0.7) !important; }
    body.dark-mode .entry-type, body.dark-mode .subtitle, body.dark-mode .comp-label { color: #aaa !important; }
    body.dark-mode .btn { background: rgba(60,100,200,0.2) !important; color: #7ab3ff !important; }
    body.dark-mode .example { background: rgba(40,40,60,0.5) !important; color: #ccc !important; }
    body.dark-mode .cat-card, body.dark-mode .featured-card, body.dark-mode .similar-card,
    body.dark-mode .country-card, body.dark-mode .entry-card, body.dark-mode .discover-card {
      background: rgba(30,30,50,0.85) !important; border-color: rgba(100,100,255,0.2) !important; color: #e0e0e0 !important;
    }
    body.dark-mode .cat-card .cat-count, body.dark-mode .hero-stat .num { color: #7ab3ff !important; }
    body.dark-mode .country-item { background: rgba(30,30,60,0.4) !important; backdrop-filter: blur(8px) !important; -webkit-backdrop-filter: blur(8px) !important; border: 1px solid rgba(100,100,255,0.15) !important; }
    body.dark-mode .country-item .ccount, body.dark-mode .country-card .ccount { background: rgba(60,100,200,0.3) !important; color: #7ab3ff !important; }
    body.dark-mode .hero .subtitle { color: #aaa !important; }
    body.dark-mode .quick-search input { background: #1e1e2e !important; color: #e0e0e0 !important; border-color: rgba(100,100,255,0.3) !important; }
    body.dark-mode .quick-search button { background: #1a5fb4 !important; }
    body.dark-mode .discover-btn { opacity: 0.9; }
    body.dark-mode .timeline-bar { background: rgba(100,150,255,0.5) !important; }
    body.dark-mode .site-footer { background: rgba(20,20,30,0.95) !important; color: #888 !important; border-color: rgba(100,100,255,0.15) !important; }
    .dark-toggle { position: fixed; bottom: 15px; right: 15px; z-index: 1000; padding: 8px 14px; border-radius: 20px;
      border: 1px solid rgba(0,0,255,0.3); cursor: pointer; font-size: 1.1em; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
    body:not(.dark-mode) .dark-toggle { background: rgba(255,255,255,0.9); color: #333; }
    body.dark-mode .dark-toggle { background: rgba(30,30,50,0.9); color: #e0e0e0; border-color: rgba(100,100,255,0.3); }
  `;
  document.head.appendChild(style);

  // Add toggle button
  const toggle = document.createElement('button');
  toggle.className = 'dark-toggle';
  toggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  toggle.title = 'Toggle dark mode';
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('juice_dark_mode', isDark);
    toggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  });
  document.body.appendChild(toggle);
}

// ===== PRINT-FRIENDLY STYLES =====
function initPrintStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      #matrix, .dark-toggle, nav, .controls, .legend, .node-count, .tooltip,
      .discover-btn, .quick-search, .filter-row, .view-toggle, .alpha-bar,
      button, .site-footer { display: none !important; }
      body { background: #fff !important; color: #000 !important; margin: 0; padding: 10px; font-size: 11pt; }
      .panel, .cat-card, .featured-card, .entry-card, .country-card, .similar-card,
      .person-card, .connection-item, .discover-card {
        background: #fff !important; border: 1px solid #ccc !important;
        box-shadow: none !important; break-inside: avoid; color: #000 !important;
        text-shadow: none !important;
      }
      a { color: #000 !important; text-decoration: underline; }
      .hero-stat .num { color: #000 !important; }
      .tag { border: 1px solid #999; background: #f5f5f5 !important; color: #333 !important; }
      h1, h2, h3 { color: #000 !important; }
      .hero h1::after { content: " - Printed from Juice Database"; font-size: 0.4em; font-weight: normal; color: #666; }
      @page { margin: 1cm; }
    }
  `;
  document.head.appendChild(style);
}

// ===== BOOKMARK MANAGER =====
window.BookmarkManager = {
  getEntries() { return JSON.parse(localStorage.getItem('juice_bookmarks_entries') || '[]'); },
  getPeople() { return JSON.parse(localStorage.getItem('juice_bookmarks_people') || '[]'); },
  addEntry(entry) {
    const list = this.getEntries();
    if (!list.find(e => e.id === entry.id)) { entry.bookmarkedAt = Date.now(); list.push(entry); localStorage.setItem('juice_bookmarks_entries', JSON.stringify(list)); }
  },
  removeEntry(id) { localStorage.setItem('juice_bookmarks_entries', JSON.stringify(this.getEntries().filter(e => e.id !== id))); },
  isEntryBookmarked(id) { return this.getEntries().some(e => e.id === id); },
  addPerson(person) {
    const list = this.getPeople();
    if (!list.find(p => p.id === person.id)) { person.bookmarkedAt = Date.now(); list.push(person); localStorage.setItem('juice_bookmarks_people', JSON.stringify(list)); }
  },
  removePerson(id) { localStorage.setItem('juice_bookmarks_people', JSON.stringify(this.getPeople().filter(p => p.id !== id))); },
  isPersonBookmarked(id) { return this.getPeople().some(p => p.id === id); },
  clearAll() { localStorage.removeItem('juice_bookmarks_entries'); localStorage.removeItem('juice_bookmarks_people'); }
};

// matrix rain background using Hebrew characters
function initMatrix() {
  const canvas = document.getElementById('matrix');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hebrew = 'אבגדהוזחטיכלמנסעפצקרשת';
  let fontSize = 16;
  let columns;
  let drops;
  const isDark = document.body.classList.contains('dark-mode');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize) + 1;
    drops = Array(columns).fill(1);
  }
  window.addEventListener('resize', resize);
  resize();

  function draw() {
    const isDark = document.body.classList.contains('dark-mode');
    ctx.fillStyle = isDark ? 'rgba(18, 18, 18, 0.05)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = isDark ? '#1a5fb4' : '#007bff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = hebrew.charAt(Math.floor(Math.random() * hebrew.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 33);
}

// fetch JSON for a religion
function fetchReligionData(religion) {
  return fetch(`/api/${religion}`).then(res => {
    if (!res.ok) throw new Error('Data not found');
    return res.json();
  });
}

// build navigation bar given data and current religion
function buildMenu(data, religion) {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  navbar.innerHTML = ''; // clear
  const main = document.createElement('ul');
  main.style.listStyle = 'none';
  main.style.margin = '0';
  main.style.padding = '8px 0';
  main.style.display = 'flex';
  main.style.flexWrap = 'wrap';
  main.style.gap = '8px 10px';
  main.style.justifyContent = 'center';
  main.style.alignItems = 'center';

  // 'All countries' link
  const allLi = document.createElement('li');
  const allA = document.createElement('a');
  allA.href = 'allcountries.html';
  allA.textContent = 'All countries';
  allLi.appendChild(allA);
  main.appendChild(allLi);

  // 'Categories' link
  const catLi = document.createElement('li');
  const catA = document.createElement('a');
  catA.href = 'categories.html';
  catA.textContent = 'Categories';
  catLi.appendChild(catA);
  main.appendChild(catLi);

  // 'Search' link
  const searchLi = document.createElement('li');
  const searchA = document.createElement('a');
  searchA.href = 'search.html';
  searchA.textContent = 'Search';
  searchLi.appendChild(searchA);
  main.appendChild(searchLi);

  // 'People' link
  const peopleLi = document.createElement('li');
  const peopleA = document.createElement('a');
  peopleA.href = 'people.html';
  peopleA.textContent = 'People';
  peopleLi.appendChild(peopleA);
  main.appendChild(peopleLi);

  // 'Stats' link
  const statsLi = document.createElement('li');
  const statsA = document.createElement('a');
  statsA.href = 'stats.html';
  statsA.textContent = 'Stats';
  statsLi.appendChild(statsA);
  main.appendChild(statsLi);

  // 'Graph' link
  const graphLi = document.createElement('li');
  const graphA = document.createElement('a');
  graphA.href = 'graph.html';
  graphA.textContent = 'Graph';
  graphLi.appendChild(graphA);
  main.appendChild(graphLi);

  // New page links
  const newPages = [
    { href: 'timeline.html', text: 'Timeline' },
    { href: 'map.html', text: 'Map' },
    { href: 'compare.html', text: 'Compare' },
    { href: 'export.html', text: 'Export' },
    { href: 'discover.html', text: 'Discover' },
    { href: 'pathfinder.html', text: 'Pathfinder' },
    { href: 'bookmarks.html', text: 'Bookmarks' },
    { href: 'audit.html', text: 'Audit' }
  ];
  newPages.forEach(p => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = p.href;
    a.textContent = p.text;
    li.appendChild(a);
    main.appendChild(li);
  });

  // some main countries
  const mainCountries = ['United States', 'Israel', 'United Kingdom', 'Canada', 'Australia'];
  mainCountries.forEach(c => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `country.html?religion=${encodeURIComponent(religion)}&country=${encodeURIComponent(c)}`;
    a.textContent = c;
    li.appendChild(a);
    main.appendChild(li);
  });

  // dropdown of all countries from countries.json
  fetch('/api/countries')
    .then(res => res.json())
    .then(list => {
      const selectLi = document.createElement('li');
      const select = document.createElement('select');
      select.addEventListener('change', () => {
        const c = select.value;
        if (c) {
          window.location.href = `country.html?religion=${encodeURIComponent(religion)}&country=${encodeURIComponent(c)}`;
        }
      });
      const opt = document.createElement('option');
      opt.textContent = 'Jump to...';
      opt.value = '';
      select.appendChild(opt);
      list.countries.sort().forEach(cn => {
        const o = document.createElement('option');
        o.textContent = cn;
        o.value = cn;
        select.appendChild(o);
      });
      selectLi.appendChild(select);
      main.appendChild(selectLi);
    });

  navbar.appendChild(main);
}

// call on pages to setup matrix and optionally menu
function initPage(religion, callback) {
  // init dark mode
  initDarkMode();
  // init print styles
  initPrintStyles();
  // init keyboard shortcuts
  initKeyboardShortcuts();

  // add canvas for matrix
  const mat = document.createElement('canvas');
  mat.id = 'matrix';
  mat.style.position = 'fixed';
  mat.style.top = '0';
  mat.style.left = '0';
  mat.style.zIndex = '-1';
  document.body.appendChild(mat);
  initMatrix();

  // add site footer
  addFooter();

  if (religion) {
    fetchReligionData(religion)
      .then(data => {
        buildMenu(data, religion);
        if (callback) callback(data);
      })
      .catch(err => console.error(err));
  } else if (callback) {
    callback();
  }
}

// ===== SEO & OPEN GRAPH =====
function setSEO(opts = {}) {
  const defaults = {
    title: 'Juice Project - Religious Organizations Database',
    description: 'Comprehensive database cataloging 800+ religious organizations across 86 countries, with people, connections, and analytics.',
    type: 'website',
    url: window.location.href
  };
  const o = { ...defaults, ...opts };

  // Set page title
  document.title = o.title;

  // Helpers
  function setMeta(prop, content, isOG) {
    const attr = isOG ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${prop}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, prop); document.head.appendChild(el); }
    el.setAttribute('content', content);
  }

  // Standard meta
  setMeta('description', o.description, false);

  // Open Graph
  setMeta('og:title', o.title, true);
  setMeta('og:description', o.description, true);
  setMeta('og:type', o.type, true);
  setMeta('og:url', o.url, true);
  setMeta('og:site_name', 'Juice Project', true);

  // Twitter Card
  setMeta('twitter:card', 'summary', false);
  setMeta('twitter:title', o.title, false);
  setMeta('twitter:description', o.description, false);
}

// ===== KEYBOARD SHORTCUTS =====
function initKeyboardShortcuts() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'shortcuts-overlay';
  overlay.style.cssText = 'display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9999;justify-content:center;align-items:center;';
  const modal = document.createElement('div');
  modal.style.cssText = 'background:#fff;border-radius:14px;padding:28px 34px;max-width:440px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;';
  modal.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h2 style="margin:0;color:#0056b3;font-size:1.3em;"><i class="fa-regular fa-keyboard"></i> Keyboard Shortcuts</h2>
      <button id="close-shortcuts" style="border:none;background:none;font-size:1.5em;cursor:pointer;color:#999;padding:0 4px;"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div style="display:grid;grid-template-columns:70px 1fr;gap:6px 14px;font-size:0.95em;">
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">?</kbd><span>Show this help</span>
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">/</kbd><span>Go to Search</span>
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">H</kbd><span>Home / Dashboard</span>
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">G</kbd><span>Graph</span>
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">M</kbd><span>Map</span>
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">T</kbd><span>Timeline</span>
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">P</kbd><span>People</span>
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">S</kbd><span>Statistics</span>
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">D</kbd><span>Discover / Random</span>
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">F</kbd><span>Pathfinder</span>
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">B</kbd><span>Bookmarks</span>
      <kbd style="background:#f0f0f0;padding:3px 10px;border-radius:5px;border:1px solid #ddd;text-align:center;font-family:monospace;font-weight:bold;">Esc</kbd><span>Close overlay</span>
    </div>
    <p style="color:#aaa;font-size:0.82em;margin:14px 0 0;text-align:center;">Shortcuts are disabled when typing in input fields</p>
  `;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  function showHelp() { overlay.style.display = 'flex'; }
  function hideHelp() { overlay.style.display = 'none'; }

  overlay.addEventListener('click', (e) => { if (e.target === overlay) hideHelp(); });
  document.getElementById('close-shortcuts').addEventListener('click', hideHelp);

  const shortcuts = {
    '/': 'search.html',
    'h': 'index.html',
    'g': 'graph.html',
    'm': 'map.html',
    't': 'timeline.html',
    'p': 'people.html',
    's': 'stats.html',
    'd': 'discover.html',
    'f': 'pathfinder.html',
    'b': 'bookmarks.html'
  };

  document.addEventListener('keydown', (e) => {
    // Ignore if typing in input/textarea/select
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || document.activeElement?.isContentEditable) return;

    if (e.key === 'Escape') { hideHelp(); return; }
    if (e.key === '?') { e.preventDefault(); showHelp(); return; }

    const key = e.key.toLowerCase();
    if (shortcuts[key] && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      window.location.href = shortcuts[key];
    }
  });

  // Add small hint in footer area
  const hint = document.createElement('div');
  hint.style.cssText = 'position:fixed;bottom:8px;right:12px;z-index:50;background:rgba(255,255,255,0.9);border:1px solid rgba(0,0,255,0.15);border-radius:6px;padding:3px 10px;font-size:0.78em;color:#888;cursor:pointer;';
  hint.textContent = 'Press ? for shortcuts';
  hint.addEventListener('click', showHelp);
  document.body.appendChild(hint);
}

// ===== SITE FOOTER =====
function addFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.style.cssText = 'text-align:center;padding:20px;margin-top:40px;border-top:1px solid rgba(0,0,255,0.15);font-size:0.85em;color:#888;background:rgba(250,250,255,0.95);';
  footer.innerHTML = '© 2016-' + new Date().getFullYear() + ' Juice Project. All rights reserved. | v4.2 | <a href="audit.html" style="color:#0056b3;text-decoration:none;">Audit</a>';
  document.body.appendChild(footer);
}
