#!/usr/bin/env node
/**
 * expand-entries.js - Expand short descriptions, add individuals to sparse major entries
 */
const fs = require('fs');
const path = require('path');

const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');

const jd = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const pd = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));

let changes = 0;

// Helper to find entry
function findEntry(id) {
  for (const c in jd.countries) {
    for (const e of jd.countries[c]) {
      if (e.id === id) return e;
    }
  }
  return null;
}

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function addIndividual(entry, name, role, bio) {
  if (!entry.individuals) entry.individuals = [];
  const existingNames = new Set(entry.individuals.map(i => i.name.toLowerCase()));
  if (existingNames.has(name.toLowerCase())) return false;
  const id = slug(name);
  entry.individuals.push({ id, name, role, bio });
  // Add to people.json
  if (!pd.people[id]) {
    pd.people[id] = {
      name, bio: bio || '', notes: '',
      affiliations: [{ organization: entry.name, role, entryId: entry.id, country: entry._country || 'United States' }]
    };
  } else {
    // Add affiliation if missing
    const affs = pd.people[id].affiliations || [];
    if (!affs.some(a => a.entryId === entry.id)) {
      affs.push({ organization: entry.name, role, entryId: entry.id, country: entry._country || 'United States' });
      pd.people[id].affiliations = affs;
    }
  }
  changes++;
  return true;
}

function addConnection(entry, name, type, description, entryId) {
  if (!entry.connections) entry.connections = [];
  const existing = new Set(entry.connections.map(c => (c.name || c.target || '').toLowerCase()));
  if (existing.has(name.toLowerCase())) return false;
  const conn = { name, type, description };
  if (entryId) conn.entryId = entryId;
  entry.connections.push(conn);
  changes++;
  return true;
}

// ─── 1. Expand short descriptions ───────────────────────────────────────

const descExpansions = {
  'cnn': 'CNN (Cable News Network) is a multinational cable news channel and website founded in 1980 by Ted Turner. It was the first television channel to provide 24-hour news coverage and is now owned by Warner Bros. Discovery. CNN has been led by numerous Jewish executives including Jeff Zucker (president 2013-2022), who transformed the network\'s digital strategy. The network has significant Israeli coverage and has faced criticism from multiple political directions for its Middle East reporting. CNN\'s international operations span 200+ countries and territories.',

  'jewish-national-fund-jnf': 'The Jewish National Fund (Keren Kayemeth LeIsrael, JNF-KKL) was founded in 1901 at the Fifth Zionist Congress to buy and develop land in Ottoman Palestine for Jewish settlement. It became the largest landowner in Israel, controlling approximately 13% of the country\'s total land. JNF planted over 250 million trees, built 250+ reservoirs and dams, and developed thousands of parks. It has been controversial for its role in preventing Palestinian land access and for planting forests over demolished Palestinian villages. In the US, the blue JNF collection boxes ("pushkes") were iconic in Jewish homes. JNF-USA is its American fundraising arm.',

  'fox-news-channel': 'Fox News Channel is an American conservative cable news network founded in 1996 by Rupert Murdoch and Roger Ailes. It is the dominant cable news network in the US by viewership. The network has been led by Jewish executives including Irena Briganti (SVP Communications). Fox News has taken a strongly pro-Israel editorial stance and features numerous Jewish commentators and contributors. The network\'s parent company, Fox Corporation, was built on Murdoch\'s media empire. Fox News paid $787.5 million to settle the Dominion Voting Systems defamation lawsuit in 2023.',

  'crif': 'CRIF (Conseil Representatif des Institutions juives de France / Representative Council of French Jewish Institutions) is the main umbrella organization representing the Jewish community in France, the largest in Europe. Founded in 1944 during the resistance against Nazi occupation, CRIF represents over 70 Jewish organizations. It hosts an influential annual dinner attended by the French President and top political figures. CRIF has been a leading voice against antisemitism in France and advocates for strong Franco-Israeli relations. Under presidents like Francis Kalifat, CRIF has pushed for stronger hate speech laws and Holocaust education.'
};

for (const [id, desc] of Object.entries(descExpansions)) {
  const entry = findEntry(id);
  if (entry) {
    entry.description = desc;
    changes++;
    console.log(`Expanded description: ${id} (${desc.length} chars)`);
  }
}

// ─── 2. Expand major entries with more individuals ──────────────────────

// BlackRock
const blackrock = findEntry('blackrock-inc');
if (blackrock) {
  addIndividual(blackrock, 'Rob Kapito', 'President & Co-founder', 'Co-founded BlackRock with Larry Fink in 1988. Oversees the firm\'s operations and portfolio management.');
  addIndividual(blackrock, 'Ben Golub', 'Former Chief Risk Officer & Co-founder', 'Pioneered BlackRock\'s Aladdin risk management platform.');
  addIndividual(blackrock, 'Barbara Novick', 'Co-founder & Former Vice Chairman', 'Co-founded BlackRock and led government relations and public policy.');
  addIndividual(blackrock, 'Mark Wiedman', 'Head of Global Client Business', 'Senior leader at BlackRock overseeing the firm\'s client relationships globally.');
  addConnection(blackrock, 'Federal Reserve', 'financial-advisory', 'BlackRock was hired by the Fed to manage emergency MBS purchases during the 2020 COVID crisis.');
}

// Pfizer
const pfizer = findEntry('pfizer-inc');
if (pfizer) {
  addIndividual(pfizer, 'Sally Susman', 'EVP & Chief Corporate Affairs Officer', 'Leads Pfizer\'s corporate affairs, communications, and government relations.');
  addIndividual(pfizer, 'Mikael Dolsten', 'Chief Scientific Officer', 'Israeli-Swedish immunologist who leads Pfizer Worldwide Research, Development & Medical.');
  addIndividual(pfizer, 'David Denton', 'Chief Financial Officer', 'Oversees Pfizer\'s global financial operations.');
  addConnection(pfizer, 'BioNTech', 'partnership', 'Partnered with German biotech BioNTech (co-founded by Ugur Sahin) to develop the Pfizer-BioNTech COVID-19 vaccine.');
}

// NVIDIA
const nvidia = findEntry('nvidia');
if (nvidia) {
  addIndividual(nvidia, 'Colette Kress', 'CFO', 'Chief Financial Officer of NVIDIA. Joined from Cisco in 2013.');
  addIndividual(nvidia, 'Jay Puri', 'EVP Worldwide Field Operations', 'Oversees NVIDIA\'s global sales and partner operations.');
  addConnection(nvidia, 'Israel R&D Center', 'operations', 'NVIDIA operates major R&D centers in Israel (acquired Mellanox Technologies for $7B in 2020).');
}

// Goldman Sachs (historic)
const goldman = findEntry('goldman-sachs-historic');
if (goldman) {
  addIndividual(goldman, 'David Solomon', 'CEO (2018-present)', 'Current CEO. First openly Jewish CEO of Goldman Sachs. Also a part-time DJ.');
  addIndividual(goldman, 'John Weinberg', 'Former Senior Partner', 'Son of Sidney Weinberg, served as co-chairman. Represented Goldman\'s founding family dynasty.');
  addConnection(goldman, '1MDB Scandal', 'legal-controversy', 'Goldman Sachs paid $5B+ in settlements for its role in the 1MDB Malaysian corruption scandal.');
}

// Comcast
const comcast = findEntry('comcast-corporation');
if (comcast) {
  addIndividual(comcast, 'David L. Cohen', 'Senior Counselor', 'Former EVP who oversees government and regulatory affairs. Close advisor to Brian Roberts.');
  addIndividual(comcast, 'Adam Miller', 'CFO', 'Chief Financial Officer overseeing Comcast\'s financial strategy.');
  addConnection(comcast, 'Universal Studios', 'subsidiary', 'NBCUniversal\'s Universal Studios theme parks and film studio are a major Comcast business segment.');
}

// Fox News additions
const fox = findEntry('fox-news-channel');
if (fox) {
  addIndividual(fox, 'Suzanne Scott', 'CEO of Fox News Media', 'First female CEO of Fox News, appointed in 2018 after the Roger Ailes scandal.');
  addIndividual(fox, 'Irena Briganti', 'SVP Communications', 'Long-serving head of Fox News communications known for aggressive media strategy.');
}

// CNN additions
const cnn = findEntry('cnn');
if (cnn) {
  addIndividual(cnn, 'Mark Thompson', 'CEO (2023-present)', 'Former BBC Director-General and New York Times CEO. Appointed CNN CEO in 2023.');
  addIndividual(cnn, 'David Zaslav', 'Warner Bros. Discovery CEO', 'CEO of CNN\'s parent company. Oversees strategy for CNN.');
}

// Coinbase
const coinbase = findEntry('coinbase');
if (coinbase) {
  addIndividual(coinbase, 'Emilie Choi', 'President & COO', 'Oversees Coinbase\'s operations, business development, and ventures.');
  addIndividual(coinbase, 'Alesia Haas', 'CFO', 'Chief Financial Officer. Led Coinbase through its 2021 direct listing on NASDAQ.');
}

// Stripe
const stripe = findEntry('stripe');
if (stripe) {
  addIndividual(stripe, 'David Singleton', 'CTO', 'Former Google VP who joined as Stripe\'s Chief Technology Officer.');
  addIndividual(stripe, 'Will Gaybrick', 'President of Product & Business', 'Oversees Stripe\'s product strategy and business operations.');
}

// Robinhood
const robinhood = findEntry('robinhood-markets');
if (robinhood) {
  addIndividual(robinhood, 'Jason Warnick', 'CFO', 'Former Amazon VP who serves as Robinhood\'s Chief Financial Officer.');
  addIndividual(robinhood, 'Dan Gallagher', 'Chief Legal Officer', 'Former SEC Commissioner who oversees Robinhood\'s legal and compliance.');
  addConnection(robinhood, 'GameStop Short Squeeze', 'controversy', 'Robinhood restricted trading of GameStop and other meme stocks in January 2021, sparking congressional hearings and lawsuits.');
}

// Write back
fs.writeFileSync(JD_PATH, JSON.stringify(jd, null, 2), 'utf8');
fs.writeFileSync(PD_PATH, JSON.stringify(pd, null, 2), 'utf8');

let total = 0;
for (const c in jd.countries) total += jd.countries[c].length;
console.log(`\nDone! ${changes} changes. Entries: ${total}, People: ${Object.keys(pd.people).length}`);
