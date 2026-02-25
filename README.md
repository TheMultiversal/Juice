# Juice Project

> Comprehensive database of 800+ Jewish organizations across 86 countries, with people, connections, analytics, and interactive visualizations.

**Version 4.2** · Est. 2016 · Node.js / Express

---

## Features

### Core Pages
- **Dashboard** - Hero stats, category cards, founding timeline mini-chart, featured entries
- **Country Pages** - Browse organizations by country with filtering and sorting
- **Entry Pages** - Detailed view with description, website, people, connections, and related entries
- **All Countries** - Full country listing with entry counts and links

### Discovery & Search
- **Full-text Search** - Multi-word highlighting, tabs for organizations/people/connections, context snippets
- **Discover** - Random entry explorer with card animations
- **Pathfinder** - Find the degrees of separation between any two organizations (BFS through shared connections & people)

### People
- **People Directory** - 820+ individuals with avatar initials, role-categorized tags (Leader/Founder/Board/Academic), sort by name/affiliations/roles, compact/full view toggle
- **Person Pages** - Individual profiles with bio, affiliations, and roles

### Visualizations
- **Network Graph** - D3.js force-directed graph with 29 category colors, 15 connection type edge colors, zoom/pan, click navigation
- **Interactive Timeline** - D3 stacked bar chart by decade + vertical timeline with decade grouping, century navigation
- **World Map** - Leaflet.js map with country markers showing entry counts
- **Statistics Dashboard** - 10 Chart.js charts including: Top 15 Countries, Categories doughnut, Org Types, Connection Types, Country Distribution, Founded by Decade histogram, Cumulative Growth, Connections Distribution, Top 15 Most Connected

### Utilities
- **Compare** - Side-by-side entry comparison
- **Export** - Download data in JSON/CSV formats
- **Bookmarks** - Client-side bookmark management
- **Audit** - Data quality dashboard (missing websites, founding years, few connections)
- **Admin** - CRUD interface for entries and data management
- **API Documentation** - Interactive REST API reference

### UX
- **Keyboard Shortcuts** - Press `?` for help overlay; `/` search, `H` home, `G` graph, `M` map, `T` timeline, `P` people, `S` stats, `D` discover, `F` pathfinder, `B` bookmarks
- **Dark Mode** - Toggle with persistent preference
- **Matrix Rain** - Animated background canvas
- **SEO & Open Graph** - Dynamic meta tags on all pages
- **Print-friendly** - Optimized print styles
- **Responsive** - Mobile-friendly layouts

---

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Open in browser
open http://localhost:3000
```

---

## Data

| Data File | Contents |
|-----------|----------|
| `data/jewish.json` | 806 organization entries across 86 countries |
| `data/people.json` | 820 individuals with bios and affiliations |
| `data/countries.json` | Full country list (193 countries) |

Each entry includes: `id`, `name`, `type`, `category`, `description`, `founded`, `website`, `connections[]`, `individuals[]`

---

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/countries` | List all countries with entry counts |
| `GET /api/stats` | Aggregate statistics |
| `GET /api/stats/detailed` | Decade histogram, connection distribution, growth |
| `GET /api/graph` | Network graph data (nodes + links) |
| `GET /api/timeline` | Timeline entries sorted by founding year |
| `GET /api/search?q=` | Full-text search across all data |
| `GET /api/people/all` | Paginated people directory |
| `GET /api/person/:id` | Individual person details |
| `GET /api/random` | Random entry |
| `GET /api/audit` | Data quality report |
| `GET /api/path?from=&to=` | Find shortest path between two entries |
| `GET /api/export?format=json\|csv` | Export all data |
| `GET /api/compare?ids=` | Compare multiple entries |
| `GET /:country?format=json` | Entries for a specific country |

---

## Scripts

43 data enrichment and utility scripts in `scripts/`:

| Script | Purpose |
|--------|---------|
| `addEntry.js` | Add new entries via CLI |
| `addPerson.js` | Add/update person records |
| `addWebsites.js` / `addWebsites2.js` | Bulk website URL enrichment |
| `enrichFounded.js` / `enrichFounded2.js` | Founding year enrichment |
| `enrichConnections*.js` | Connection enrichment (6 scripts) |
| `addPeople*.js` | People enrichment (multiple scripts) |
| `addCategories.js` | Category assignment |
| `scrapeExample.js` | Web scraping template |
| *...and more* | Country/region-specific enrichment scripts |

---

## Architecture

```
Juice/
├── server.js           # Express server (~600 lines)
├── data/
│   ├── jewish.json     # Main dataset
│   ├── people.json     # People database
│   └── countries.json  # Country reference
├── public/
│   ├── app.js          # Shared: nav, dark mode, matrix rain, bookmarks, keyboard shortcuts, SEO, footer
│   ├── index.html      # Dashboard homepage
│   ├── search.html     # Full-text search
│   ├── people.html     # People directory
│   ├── person.html     # Person profile
│   ├── entry.html      # Entry detail
│   ├── graph.html      # D3 network graph
│   ├── timeline.html   # D3 + vertical timeline
│   ├── stats.html      # Chart.js analytics
│   ├── map.html        # Leaflet world map
│   ├── pathfinder.html # Degrees of separation
│   ├── discover.html   # Random explorer
│   ├── compare.html    # Side-by-side compare
│   ├── export.html     # Data export
│   ├── bookmarks.html  # Saved entries
│   ├── audit.html      # Data quality
│   ├── allcountries.html
│   ├── categories.html
│   ├── category.html
│   └── country.html
└── scripts/            # 43 data enrichment scripts
```

---

## Tech Stack

- **Backend:** Node.js, Express 4.18
- **Frontend:** Vanilla JS, CSS (no build step)
- **Visualizations:** D3.js v7, Chart.js 4.4, Leaflet.js 1.9
- **Performance:** In-memory cache (30s TTL), paginated APIs

---

## License

© 2016-2026 Juice Project. All rights reserved.

