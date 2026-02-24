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
  main.style.gap = '6px 8px';
  main.style.justifyContent = 'center';
  main.style.alignItems = 'center';

  function addLink(href, text, icon, extraClass) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.innerHTML = (icon ? '<i class="' + icon + '"></i> ' : '') + text;
    if (extraClass) a.className = extraClass;
    li.appendChild(a);
    main.appendChild(li);
    return li;
  }

  function addSep() {
    const li = document.createElement('li');
    li.innerHTML = '<span style="color:rgba(0,56,184,0.3);font-size:1.2em;user-select:none;">|</span>';
    main.appendChild(li);
  }

  // Home
  addLink('index.html', 'Home', 'fa-solid fa-house');

  addSep();

  // Browse section
  addLink('search.html', 'Search', 'fa-solid fa-magnifying-glass');
  addLink('categories.html', 'Categories', 'fa-solid fa-layer-group');
  addLink('people.html', 'People', 'fa-solid fa-users');

  addSep();

  // Analyze section
  addLink('stats.html', 'Stats', 'fa-solid fa-chart-bar');
  addLink('graph.html', 'Graph', 'fa-solid fa-diagram-project');
  addLink('timeline.html', 'Timeline', 'fa-solid fa-clock-rotate-left');
  addLink('map.html', 'Map', 'fa-solid fa-earth-americas');

  addSep();

  // Tools section
  addLink('compare.html', 'Compare', 'fa-solid fa-scale-balanced');
  addLink('export.html', 'Export', 'fa-solid fa-file-export');
  addLink('discover.html', 'Discover', 'fa-solid fa-dice');
  addLink('pathfinder.html', 'Pathfinder', 'fa-solid fa-route');
  addLink('bookmarks.html', 'Bookmarks', 'fa-solid fa-bookmark');
  addLink('audit.html', 'Audit', 'fa-solid fa-clipboard-check');

  addSep();

  addLink('about.html', 'About', 'fa-solid fa-circle-info');

  addSep();

  // Countries section - all together with flag icons
  const mainCountries = [
    { name: 'United States', flag: 'us' },
    { name: 'Israel', flag: 'il' },
    { name: 'United Kingdom', flag: 'gb' },
    { name: 'France', flag: 'fr' },
    { name: 'Germany', flag: 'de' },
    { name: 'Canada', flag: 'ca' },
    { name: 'Australia', flag: 'au' },
    { name: 'Russia', flag: 'ru' },
    { name: 'South Africa', flag: 'za' },
    { name: 'Argentina', flag: 'ar' }
  ];
  mainCountries.forEach(c => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `country.html?religion=${encodeURIComponent(religion)}&country=${encodeURIComponent(c.name)}`;
    a.innerHTML = '<img src="https://flagcdn.com/w20/' + c.flag + '.png" style="height:12px;vertical-align:middle;margin-right:4px;border-radius:1px;"> ' + c.name;
    li.appendChild(a);
    main.appendChild(li);
  });
  addLink('allcountries.html', 'All Countries', 'fa-solid fa-globe');

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
  footer.style.cssText = 'padding:0;margin-top:40px;border-top:2px solid rgba(0,56,184,0.15);background:rgba(250,250,255,0.97);font-size:0.88em;color:#666;';
  footer.innerHTML = `
    <div style="max-width:1200px;margin:0 auto;padding:35px 30px 20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:30px;">
      <div>
        <h4 style="margin:0 0 12px;color:#0038b8;font-size:1.1em;"><i class="fa-solid fa-database"></i> The Juice Box</h4>
        <p style="margin:0 0 8px;line-height:1.6;font-size:0.92em;">Comprehensive Religious Organizations Intelligence Database. Tracking structure, people, and connections since 2016.</p>
        <p style="margin:0;font-size:0.85em;color:#999;">v4.3 | Est. 2016</p>
      </div>
      <div>
        <h4 style="margin:0 0 12px;color:#0038b8;font-size:1em;"><i class="fa-solid fa-compass"></i> Browse</h4>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <a href="search.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;"><i class="fa-solid fa-magnifying-glass" style="width:16px;"></i> Search</a>
          <a href="categories.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;"><i class="fa-solid fa-layer-group" style="width:16px;"></i> Categories</a>
          <a href="people.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;"><i class="fa-solid fa-users" style="width:16px;"></i> People</a>
          <a href="allcountries.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;"><i class="fa-solid fa-globe" style="width:16px;"></i> All Countries</a>
          <a href="discover.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;"><i class="fa-solid fa-dice" style="width:16px;"></i> Discover</a>
        </div>
      </div>
      <div>
        <h4 style="margin:0 0 12px;color:#0038b8;font-size:1em;"><i class="fa-solid fa-chart-line"></i> Analyze</h4>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <a href="stats.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;"><i class="fa-solid fa-chart-bar" style="width:16px;"></i> Statistics</a>
          <a href="graph.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;"><i class="fa-solid fa-diagram-project" style="width:16px;"></i> Network Graph</a>
          <a href="timeline.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;"><i class="fa-solid fa-clock-rotate-left" style="width:16px;"></i> Timeline</a>
          <a href="map.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;"><i class="fa-solid fa-earth-americas" style="width:16px;"></i> World Map</a>
          <a href="pathfinder.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;"><i class="fa-solid fa-route" style="width:16px;"></i> Pathfinder</a>
          <a href="compare.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;"><i class="fa-solid fa-scale-balanced" style="width:16px;"></i> Compare</a>
        </div>
      </div>
      <div>
        <h4 style="margin:0 0 12px;color:#0038b8;font-size:1em;"><i class="fa-solid fa-envelope"></i> Stay Updated</h4>
        <p style="margin:0 0 10px;font-size:0.9em;line-height:1.5;">Subscribe for database updates, new entries, and research insights.</p>
        <form id="mailing-list-form" onsubmit="return handleMailingList(event)" style="display:flex;gap:0;">
          <input type="email" id="mailing-email" placeholder="your@email.com" required style="flex:1;padding:8px 12px;border:1px solid rgba(0,56,184,0.25);border-radius:6px 0 0 6px;font-size:0.9em;outline:none;min-width:0;" />
          <button type="submit" style="padding:8px 14px;background:#0038b8;color:#fff;border:1px solid #0038b8;border-radius:0 6px 6px 0;cursor:pointer;font-size:0.85em;font-weight:bold;white-space:nowrap;"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
        <div id="mailing-msg" style="font-size:0.82em;margin-top:6px;min-height:18px;"></div>
      </div>
    </div>
    <div style="max-width:1200px;margin:0 auto;padding:15px 30px;border-top:1px solid rgba(0,56,184,0.1);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;">
      <span>&copy; 2016-${new Date().getFullYear()} The Juice Box Project. All rights reserved.</span>
      <div style="display:flex;gap:15px;align-items:center;">
        <a href="about.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;">About</a>
        <a href="audit.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;">Audit</a>
        <a href="export.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;">Export</a>
        <a href="bookmarks.html" style="color:#0056b3;text-decoration:none;font-size:0.92em;">Bookmarks</a>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

// Handle mailing list form
function handleMailingList(e) {
  e.preventDefault();
  const email = document.getElementById('mailing-email').value.trim();
  const msg = document.getElementById('mailing-msg');
  if (!email) return false;
  // Store locally (no backend email service)
  const subs = JSON.parse(localStorage.getItem('juice_mailing_list') || '[]');
  if (subs.includes(email)) {
    msg.innerHTML = '<span style="color:#e67700;"><i class="fa-solid fa-circle-check"></i> You\'re already subscribed!</span>';
  } else {
    subs.push(email);
    localStorage.setItem('juice_mailing_list', JSON.stringify(subs));
    msg.innerHTML = '<span style="color:#0a8f3c;"><i class="fa-solid fa-circle-check"></i> Subscribed! Thank you.</span>';
  }
  document.getElementById('mailing-email').value = '';
  return false;
}
