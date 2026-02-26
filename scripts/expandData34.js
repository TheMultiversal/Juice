#!/usr/bin/env node
/**
 * expandData34.js - Massive Epstein network expansion + Bill Gates exhaustive expansion
 *
 * 1. Fix duplicate connections in Epstein entry
 * 2. Create ~25 new entries (Ghislaine Maxwell, Jean-Luc Brunel, Glenn Dubin,
 *    Gates Foundation, Microsoft, Cascade Investment, Clinton Foundation, etc.)
 * 3. Massively expand Bill Gates with connections, individuals, description
 * 4. Add cross-connections to existing entries
 * 5. Add ~20 new people to people.json
 * 6. Remove any stray en/em dashes
 */

const fs = require('fs');
const path = require('path');

const JEWISH_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PEOPLE_PATH = path.join(__dirname, '..', 'data', 'people.json');

const jd = JSON.parse(fs.readFileSync(JEWISH_PATH, 'utf8'));
const pd = JSON.parse(fs.readFileSync(PEOPLE_PATH, 'utf8'));

// ── Utility ──────────────────────────────────────────────────────────────────

function fixDashes(obj) {
  if (typeof obj === 'string') return obj.replace(/[\u2013\u2014]/g, '-');
  if (Array.isArray(obj)) return obj.map(fixDashes);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const k of Object.keys(obj)) out[k] = fixDashes(obj[k]);
    return out;
  }
  return obj;
}

// Build entry ID -> reference map
const entryMap = {};
for (const country of Object.keys(jd.countries)) {
  for (const entry of jd.countries[country]) {
    if (entry.id) entryMap[entry.id] = { country, entry };
  }
}

function entryExists(id) { return !!entryMap[id]; }

function addEntry(country, entry) {
  entry = fixDashes(entry);
  if (entryExists(entry.id)) {
    console.log('  SKIP (exists):', entry.id);
    return false;
  }
  if (!jd.countries[country]) jd.countries[country] = [];
  jd.countries[country].push(entry);
  entryMap[entry.id] = { country, entry };
  console.log('  + entry:', entry.id, '(' + country + ')');
  return true;
}

function addPerson(id, person) {
  person = fixDashes(person);
  if (pd.people[id]) {
    console.log('  SKIP person (exists):', id);
    return false;
  }
  pd.people[id] = person;
  console.log('  + person:', id);
  return true;
}

function addConnectionToEntry(entryId, conn) {
  conn = fixDashes(conn);
  const ref = entryMap[entryId];
  if (!ref) { console.log('  WARN: entry not found:', entryId); return false; }
  const e = ref.entry;
  // Check for duplicate by entryId or name
  const isDupe = e.connections.some(c =>
    (conn.entryId && c.entryId === conn.entryId) ||
    (!conn.entryId && c.name === conn.name)
  );
  if (isDupe) return false;
  e.connections.push(conn);
  return true;
}

function addIndividualToEntry(entryId, ind) {
  ind = fixDashes(ind);
  const ref = entryMap[entryId];
  if (!ref) return false;
  const e = ref.entry;
  if (e.individuals.some(i => i.id === ind.id)) return false;
  e.individuals.push(ind);
  return true;
}

// ── Phase 1: Fix Epstein duplicate connections ──────────────────────────────

console.log('\n=== Phase 1: Fix Epstein duplicate connections ===');
{
  const ep = entryMap['jeffrey-epstein-network'];
  if (ep) {
    const conns = ep.entry.connections;
    const seen = new Set();
    const deduped = [];
    for (const c of conns) {
      const key = c.entryId || c.name;
      if (seen.has(key)) {
        console.log('  - removed dupe:', c.name);
        continue;
      }
      seen.add(key);
      deduped.push(c);
    }
    ep.entry.connections = deduped;
    console.log('  Epstein connections: ' + conns.length + ' -> ' + deduped.length);
  }
}

// ── Phase 2: Create new entries ─────────────────────────────────────────────

console.log('\n=== Phase 2: Create new entries ===');

// --- Ghislaine Maxwell ---
addEntry('United Kingdom', {
  id: 'ghislaine-maxwell-connections',
  name: 'Ghislaine Maxwell',
  type: 'convicted sex trafficker / socialite',
  category: 'Notable Individuals',
  founded: 1961,
  description: 'Ghislaine Noelle Marion Maxwell is a British socialite and convicted sex trafficker, born in Maisons-Laffitte, France, the youngest of nine children of media proprietor Robert Maxwell (born Jan Ludvik Hyman Binyamin Hoch, Jewish, Czechoslovakia) and French-born Elisabeth "Betty" Maxwell (nee Meynard). Robert Maxwell was a Labour MP, media baron (Mirror Group Newspapers, Macmillan Publishers), and alleged Mossad asset who died under mysterious circumstances in 1991 when he fell from his yacht Lady Ghislaine off the Canary Islands. After his death, it was revealed he had stolen over 400 million pounds from Mirror Group pension funds. Ghislaine moved to New York City in 1991 and quickly became a prominent figure in Manhattan high society. She began a romantic relationship with Jeffrey Epstein in the early 1990s, and even after their intimate relationship ended, she remained his closest associate. She was central to Epstein\'s operation: recruiting, grooming, and trafficking underage girls. In December 2021, she was convicted on five of six counts of aiding Epstein\'s sex trafficking, including sex trafficking of a minor. She was sentenced to 20 years in federal prison in June 2022. Victims described her as the "lady of the house" who normalized abuse and directly participated in it. She maintains her innocence and has appealed. The Maxwell family\'s connections to intelligence services (Robert Maxwell\'s alleged links to MI6, the KGB, and Mossad) have fueled extensive speculation about the intelligence dimensions of the Epstein operation.',
  website: '',
  individuals: [
    { id: 'ghislaine-maxwell', name: 'Ghislaine Maxwell', role: 'Convicted Sex Trafficker', bio: 'British socialite convicted on five counts of sex trafficking in 2021. Sentenced to 20 years.' },
    { id: 'robert-maxwell', name: 'Robert Maxwell', role: 'Father - Media Baron (1923-1991)', bio: 'Czech-born British media proprietor, Labour MP, and alleged Mossad asset. Died mysteriously at sea in 1991.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'criminal', description: 'Epstein\'s closest associate and co-conspirator. Recruited, groomed, and trafficked victims for over a decade.', entryId: 'jeffrey-epstein-network' },
    { name: 'Maxwell Communications Corporation', type: 'family', description: 'Father Robert Maxwell\'s media empire. Collapsed after his death revealing massive pension fraud.', entryId: 'maxwell-communications' },
    { name: 'Prince Andrew', type: 'social', description: 'Long-standing friendship. Introduced Epstein to Prince Andrew. Virginia Giuffre photographed with Andrew at Maxwell\'s London townhouse.', entryId: 'prince-andrew' },
    { name: 'Bill Clinton', type: 'social', description: 'Maxwell attended Clinton Global Initiative events and was photographed at Chelsea Clinton\'s wedding in 2010.', entryId: 'bill-clinton-connections' },
    { name: 'Donald Trump', type: 'social', description: 'Attended social events together in 1990s-2000s New York society.', entryId: 'donald-trump-connections' },
    { name: 'Jean-Luc Brunel / MC2 Model Management', type: 'criminal', description: 'Brunel ran MC2 modeling agency partially funded by Epstein. Accused of trafficking models. Maxwell introduced Brunel to victims.', entryId: 'jean-luc-brunel-mc2' },
    { name: 'Mossad (Israeli Intelligence)', type: 'alleged intelligence', description: 'Father Robert Maxwell was widely reported as a Mossad asset by multiple former intelligence officials. Speculation persists that the Epstein operation had intelligence connections.', entryId: 'mossad-israeli-intelligence' },
    { name: 'Terra Mar Project', type: 'founded', description: 'Maxwell\'s ocean conservation nonprofit (2012-2019). Dissolved days after Epstein\'s 2019 arrest. Critics alleged it was a front for networking.', entryId: 'terra-mar-project' },
    { name: 'Les Wexner', type: 'social', description: 'Maxwell was present at social events with Wexner, who was Epstein\'s primary financial patron.', entryId: 'les-wexner-connections' },
    { name: 'Harvard University', type: 'social', description: 'Maxwell attended events at Harvard alongside Epstein, who donated millions to the university.', entryId: 'harvard-university' },
    { name: 'FBI', type: 'legal', description: 'FBI arrested Maxwell at her New Hampshire estate in July 2020. She was indicted on six counts of sex trafficking.', entryId: 'fbi' },
    { name: 'Metropolitan Correctional Center', type: 'legal', description: 'Held at MDC Brooklyn during trial. Complained of harsh conditions including sleep deprivation and surveillance.', entryId: 'metropolitan-correctional-center' }
  ]
});

// --- Terra Mar Project ---
addEntry('United States', {
  id: 'terra-mar-project',
  name: 'Terra Mar Project',
  type: 'nonprofit / ocean conservation',
  category: 'Philanthropy',
  founded: 2012,
  description: 'The Terra Mar Project was a nonprofit organization founded by Ghislaine Maxwell in 2012, ostensibly dedicated to ocean conservation and protecting marine ecosystems. The organization hosted events at the United Nations and other prestigious venues. It received relatively little funding and had minimal charitable output despite its high-profile platform. The project was abruptly dissolved on July 12, 2019 - just six days after Jeffrey Epstein\'s arrest on federal sex trafficking charges. Critics and investigators have suggested the organization served primarily as a vehicle for Maxwell to maintain a veneer of philanthropic respectability and to facilitate networking with wealthy and powerful individuals. Its closure immediately following Epstein\'s arrest intensified suspicions about its true purpose.',
  website: '',
  individuals: [
    { id: 'ghislaine-maxwell', name: 'Ghislaine Maxwell', role: 'Founder & President', bio: 'British socialite convicted of sex trafficking in 2021.' }
  ],
  connections: [
    { name: 'Ghislaine Maxwell', type: 'founder', description: 'Founded and run by Maxwell as her primary philanthropic vehicle.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Jeffrey Epstein Network', type: 'related', description: 'Dissolved days after Epstein\'s 2019 arrest. Widely believed to have been connected to the Epstein operation.', entryId: 'jeffrey-epstein-network' },
    { name: 'Clinton Foundation', type: 'related', description: 'Maxwell attended Clinton Global Initiative events through Terra Mar.', entryId: 'clinton-foundation' }
  ]
});

// --- Jean-Luc Brunel / MC2 ---
addEntry('United States', {
  id: 'jean-luc-brunel-mc2',
  name: 'Jean-Luc Brunel / MC2 Model Management',
  type: 'modeling agency / trafficking operation',
  category: 'Notable Individuals',
  founded: 2005,
  description: 'Jean-Luc Brunel (1946-2022) was a French modeling agent and founder of MC2 Model Management, a Miami-based modeling agency funded by Jeffrey Epstein. Brunel had a long history of sexual abuse allegations in the modeling industry dating back to the 1980s, detailed in a 1988 CBS 60 Minutes investigation. Despite this, he continued to operate with impunity across multiple countries. MC2 was created in 2005 with financial backing from Epstein, who provided the agency\'s startup capital and office space. Through MC2, Brunel supplied Epstein with a pipeline of young models, many from Eastern Europe, South America, and developing countries, who were promised modeling careers. Virginia Giuffre alleged she was forced to have sex with Brunel on multiple occasions and that Brunel also trafficked three 12-year-old girls from France as a "birthday gift" for Epstein. Flight records show Brunel took over 70 flights on Epstein\'s aircraft. He was arrested in Paris in December 2020 on charges of rape of minors and sexual harassment. On February 19, 2022, Brunel was found hanged in his cell at La Sante prison in Paris while awaiting trial - his death mirroring the circumstances of Epstein\'s own death in custody. The French investigation continued posthumously.',
  individuals: [
    { id: 'jean-luc-brunel', name: 'Jean-Luc Brunel', role: 'Founder - MC2 Model Management (1946-2022)', bio: 'French modeling agent who operated MC2 with Epstein funding. Found dead in Paris prison in 2022.' },
    { id: 'sarah-kellen', name: 'Sarah Kellen', role: 'MC2 Associate / Epstein Assistant', bio: 'Served as both Epstein\'s personal assistant and MC2 booking agent. Named in Epstein victim lawsuits.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'criminal', description: 'MC2 was funded by Epstein and served as a pipeline for trafficking victims disguised as model recruitment.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ghislaine Maxwell', type: 'criminal', description: 'Maxwell introduced Brunel to victims and helped coordinate trafficking across borders.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Victoria\'s Secret (L Brands)', type: 'industry', description: 'Brunel\'s modeling connections overlapped with Epstein\'s access to models through Les Wexner\'s Victoria\'s Secret.', entryId: 'l-brands-victorias-secret' },
    { name: 'Les Wexner', type: 'industry', description: 'Wexner\'s Victoria\'s Secret was leveraged as a recruitment tool; Epstein falsely claimed to be a VS talent scout.', entryId: 'les-wexner-connections' }
  ]
});

// --- J. Epstein & Co ---
addEntry('United States', {
  id: 'j-epstein-company',
  name: 'J. Epstein & Co.',
  type: 'financial management firm',
  category: 'Banking & Financial Services',
  founded: 1982,
  description: 'J. Epstein & Co. was the private financial management firm founded by Jeffrey Epstein after he left Bear Stearns in 1981. The firm purportedly managed money exclusively for billionaire clients, with Epstein famously claiming he only worked with clients worth $1 billion or more. In practice, Epstein\'s only known major client was Leslie Wexner, the founder of L Brands (Victoria\'s Secret). The true nature and extent of the firm\'s business operations remain one of the central mysteries of the Epstein case. Despite claiming to manage billions, no former clients (besides Wexner) have been publicly identified or come forward. Epstein held power of attorney over Wexner\'s finances and was trustee of Wexner\'s personal trust. Through this relationship, Epstein gained control of Wexner\'s $77 million Manhattan townhouse (the largest private residence in New York) and flew on the Wexner corporate jet. After Epstein\'s 2019 death, his estate was valued at over $634 million, but the sources of his wealth remain unexplained by legitimate financial advisory work alone. Investigators have speculated about intelligence connections, blackmail operations, or other illicit income streams.',
  individuals: [
    { id: 'jeffrey-epstein', name: 'Jeffrey Epstein', role: 'Founder & Principal', bio: 'American financier and convicted sex offender (1953-2019).' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'founded by', description: 'Epstein\'s personal financial management vehicle.', entryId: 'jeffrey-epstein-network' },
    { name: 'Les Wexner', type: 'client', description: 'Only known major client. Epstein had power of attorney over Wexner\'s finances.', entryId: 'les-wexner-connections' },
    { name: 'Bear Stearns', type: 'predecessor', description: 'Epstein left Bear Stearns in 1981 after being fired for a Par violation, then founded J. Epstein & Co.', entryId: 'bear-stearns-historic' },
    { name: 'JPMorgan Chase', type: 'banking', description: 'J. Epstein & Co. maintained accounts at JPMorgan Chase for over 15 years despite compliance concerns.', entryId: 'jpmorgan-chase' },
    { name: 'Deutsche Bank', type: 'banking', description: 'After JPMorgan dropped Epstein in 2013, Deutsche Bank took on his accounts until 2019.', entryId: 'deutsche-bank' }
  ]
});

// --- Glenn Dubin ---
addEntry('United States', {
  id: 'glenn-dubin-connections',
  name: 'Glenn Dubin',
  type: 'hedge fund manager',
  category: 'Investment & Private Equity',
  founded: 1992,
  description: 'Glenn Russell Dubin is an American billionaire hedge fund manager who co-founded Highbridge Capital Management, one of the largest hedge funds in the United States. Born in 1957 to a Jewish family in Washington Heights, Manhattan, Dubin attended Stony Brook University before launching his career on Wall Street. Dubin and his wife Eva Andersson-Dubin (a former Miss Sweden and physician) maintained a long and close friendship with Jeffrey Epstein spanning decades. Eva Andersson dated Epstein in the 1980s before marrying Dubin. Despite this relationship, the Dubins continued socializing with Epstein - including after his 2008 conviction. Virginia Giuffre named both Glenn and Eva Dubin in sworn depositions, alleging she was directed by Epstein to have sexual encounters with Glenn and that Eva helped arrange these encounters. The Dubins have denied all allegations. Correspondence revealed by court-unsealed documents showed Epstein\'s scheduler regularly coordinated meetings and dinners between Epstein and the Dubins. Ghislaine Maxwell even stayed at the Dubins\' home after Epstein\'s death. A former housekeeper for the Dubins, Rinaldo Rizzo, testified that a 15-year-old Swedish girl sent by Epstein appeared at the Dubin residence visibly distressed.',
  individuals: [
    { id: 'glenn-dubin', name: 'Glenn Dubin', role: 'Co-Founder, Highbridge Capital Management', bio: 'Billionaire hedge fund manager. Close Epstein associate named in trafficking allegations.' },
    { id: 'eva-andersson-dubin', name: 'Eva Andersson-Dubin', role: 'Wife - Former Miss Sweden, Physician', bio: 'Former Miss Sweden (1980), physician, and Epstein\'s ex-girlfriend. Named in Giuffre depositions.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'social/alleged', description: 'Decades-long friendship. Named in victim depositions. Continued relationship after 2008 conviction.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ghislaine Maxwell', type: 'social', description: 'Maxwell stayed at the Dubins\' home after Epstein\'s death. Close social relationship.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'JPMorgan Chase', type: 'financial', description: 'JPMorgan acquired Highbridge Capital Management in 2004.', entryId: 'jpmorgan-chase' },
    { name: 'Les Wexner', type: 'social', description: 'Overlapping social circles in Epstein\'s network of wealthy associates.', entryId: 'les-wexner-connections' }
  ]
});

// --- Jes Staley ---
addEntry('United States', {
  id: 'jes-staley-connections',
  name: 'Jes Staley',
  type: 'banking executive',
  category: 'Banking & Financial Services',
  founded: 1979,
  description: 'James Edward "Jes" Staley is an American banker who served as Group Chief Executive of Barclays from December 2015 to November 2021. Born in 1956 in Boston, Staley had a 34-year career at JPMorgan Chase before joining Barclays. Staley maintained a close personal and professional relationship with Jeffrey Epstein that stretched over a decade. While heading JPMorgan\'s private banking division, Staley was responsible for overseeing the Epstein account and personally visited Epstein\'s private Caribbean island at least once. Over 1,200 emails were exchanged between Staley and Epstein between 2008 and 2012 (after Epstein\'s first conviction), with content described as "friendly and personal." In February 2020, the Financial Conduct Authority (FCA) and Prudential Regulation Authority (PRA) began investigating Staley\'s characterization of his relationship with Epstein to the Barclays board. Staley resigned from Barclays in November 2021 after the FCA concluded he had been misleading about the nature and extent of his Epstein ties. JPMorgan\'s own internal communications revealed that Staley referred to Epstein as a "rock star" and discussed bringing him back as a client even after the 2008 conviction. In May 2024, the FCA formally banned Staley from the UK financial services industry.',
  individuals: [
    { id: 'jes-staley', name: 'Jes Staley', role: 'Former CEO, Barclays (2015-2021)', bio: 'American banker banned from UK financial services over Epstein ties. Exchanged 1,200+ emails with Epstein.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'financial/social', description: 'Decade-long personal relationship. 1,200+ emails post-conviction. Visited Epstein\'s island.', entryId: 'jeffrey-epstein-network' },
    { name: 'Barclays', type: 'employer', description: 'CEO 2015-2021. Resigned after FCA investigation into his Epstein ties. Later banned from UK finance.', entryId: 'barclays' },
    { name: 'JPMorgan Chase', type: 'employer', description: '34-year career. Oversaw Epstein\'s accounts while heading private banking. Called Epstein a "rock star."', entryId: 'jpmorgan-chase' },
    { name: 'Ghislaine Maxwell', type: 'social', description: 'Staley was connected to both Epstein and Maxwell through social and business circles.', entryId: 'ghislaine-maxwell-connections' }
  ]
});

// --- Clinton Foundation ---
addEntry('United States', {
  id: 'clinton-foundation',
  name: 'Clinton Foundation',
  type: 'nonprofit / political foundation',
  category: 'Philanthropy',
  founded: 1997,
  description: 'The Clinton Foundation (formerly the William J. Clinton Foundation) is a nonprofit organization established by former President Bill Clinton in 1997. The foundation operates the Clinton Global Initiative (CGI), Clinton Health Access Initiative (CHAI), and other programs focused on global health, economic development, and climate change. Jeffrey Epstein made a $25,000 donation to the Clinton Foundation. More significantly, Epstein\'s connections to Clinton extended well beyond charitable giving: flight logs showed Clinton took at least 26 trips on Epstein\'s private Boeing 727 (nicknamed the "Lolita Express"), and Clinton visited Epstein\'s private island in the US Virgin Islands at least once. Ghislaine Maxwell was photographed at Chelsea Clinton\'s wedding in 2010 and attended Clinton Global Initiative events. The foundation has raised over $2 billion from individuals, corporations, and foreign governments, attracting scrutiny for potential conflicts of interest during Hillary Clinton\'s tenure as Secretary of State.',
  individuals: [
    { id: 'bill-clinton-individual', name: 'Bill Clinton', role: 'Founder & Chair', bio: '42nd President of the United States. Founded the Clinton Foundation in 1997.' }
  ],
  connections: [
    { name: 'Bill Clinton', type: 'founder', description: 'Founded by President Clinton in 1997 after leaving office.', entryId: 'bill-clinton-connections' },
    { name: 'Jeffrey Epstein Network', type: 'financial', description: 'Received $25,000 donation from Epstein. Maxwell attended CGI events.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ghislaine Maxwell', type: 'related', description: 'Maxwell attended Clinton Global Initiative events and Chelsea Clinton\'s 2010 wedding.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Bill & Melinda Gates Foundation', type: 'partnership', description: 'Partnered on global health initiatives, particularly in Africa.', entryId: 'bill-melinda-gates-foundation' }
  ]
});

// --- Harvey Weinstein ---
addEntry('United States', {
  id: 'harvey-weinstein-connections',
  name: 'Harvey Weinstein',
  type: 'film producer / convicted sex offender',
  category: 'Entertainment',
  founded: 1979,
  description: 'Harvey Weinstein is an American former film producer and convicted sex offender, born in 1952 in Queens, New York, to a Jewish family. He co-founded the production company Miramax Films with his brother Bob Weinstein in 1979, and later co-founded The Weinstein Company in 2005. For decades, Weinstein was one of the most powerful figures in Hollywood, producing films that collectively earned over 300 Academy Award nominations. In October 2017, The New York Times and The New Yorker published investigations revealing decades of sexual harassment, assault, and rape allegations against Weinstein by over 80 women, including prominent actresses. His downfall catalyzed the global #MeToo movement. He was convicted in 2020 in New York and sentenced to 23 years (later overturned on appeal in 2024), then convicted again in Los Angeles in 2022 and sentenced to 16 years. Weinstein was connected to Jeffrey Epstein through New York social circles. Both were clients of high-powered attorneys and moved in overlapping elite networks. The Weinstein and Epstein scandals together exposed systemic patterns of predation enabled by wealth, power, and institutional complicity.',
  individuals: [
    { id: 'harvey-weinstein', name: 'Harvey Weinstein', role: 'Co-Founder, Miramax / The Weinstein Company', bio: 'American film producer convicted of rape and sexual assault. Catalyzed the #MeToo movement.' },
    { id: 'bob-weinstein', name: 'Bob Weinstein', role: 'Co-Founder, Miramax', bio: 'Co-founded Miramax and The Weinstein Company with brother Harvey.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'social', description: 'Moved in overlapping New York elite social circles. Both exposed as serial predators protected by power.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ghislaine Maxwell', type: 'social', description: 'Both operated in overlapping Manhattan social networks in the 1990s-2000s.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Alan Dershowitz', type: 'legal', description: 'Dershowitz represented both Epstein and consulted with Weinstein\'s legal team.', entryId: 'alan-dershowitz-connections' }
  ]
});

// --- Henry Kissinger ---
addEntry('United States', {
  id: 'henry-kissinger-connections',
  name: 'Henry Kissinger',
  type: 'political figure / diplomat',
  category: 'Political',
  founded: 1969,
  description: 'Henry Alfred Kissinger (1923-2023) was a German-born American diplomat, political scientist, and geopolitical consultant who served as United States Secretary of State and National Security Advisor under Presidents Richard Nixon and Gerald Ford. Born Heinz Alfred Kissinger in Furth, Bavaria, to a Jewish family, he fled Nazi Germany in 1938. Kissinger was one of the most influential and controversial foreign policy figures of the 20th century, central to U.S. policy in Vietnam, China opening (1972), detente with the Soviet Union, and covert operations in Chile, Bangladesh, and elsewhere. He was awarded the Nobel Peace Prize in 1973 (controversially). Kissinger was connected to Jeffrey Epstein through New York elite social circles. Epstein\'s contact book contained Kissinger\'s information, and they shared overlapping social networks including the Council on Foreign Relations and various Manhattan gatherings. Kissinger was also connected to multiple intelligence and defense establishments worldwide. He founded Kissinger Associates in 1982, an influential geopolitical consulting firm whose client list has remained confidential. He died on November 29, 2023, at age 100.',
  individuals: [
    { id: 'henry-kissinger', name: 'Henry Kissinger', role: 'Former Secretary of State (1923-2023)', bio: 'German-born American diplomat. Secretary of State 1973-1977. Nobel Peace Prize 1973. Died 2023.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'social', description: 'Connected through NYC elite social circles. Listed in Epstein\'s contact book.', entryId: 'jeffrey-epstein-network' },
    { name: 'Council on Foreign Relations (CFR)', type: 'member', description: 'Long-time CFR member and speaker. Both Kissinger and Epstein connected to the CFR.', entryId: 'council-on-foreign-relations-cfr' },
    { name: 'Ehud Barak', type: 'political', description: 'Both connected to Israeli political and defense establishments.', entryId: 'ehud-barak-connections' }
  ]
});

// --- Mortimer Zuckerman ---
addEntry('United States', {
  id: 'mortimer-zuckerman-connections',
  name: 'Mortimer Zuckerman',
  type: 'media mogul / real estate developer',
  category: 'Media',
  founded: 1980,
  description: 'Mortimer Benjamin Zuckerman is a Canadian-American billionaire media proprietor and real estate developer, born in 1937 in Montreal to a Jewish family. He is the former owner of the New York Daily News (1993-2017) and the current owner of U.S. News & World Report (since 1984). He is also co-founder and chairman of Boston Properties, one of the largest publicly traded office REITs in the United States. Zuckerman was a prominent figure in Jeffrey Epstein\'s social circle in New York. Epstein\'s contact book contained detailed information for Zuckerman, and they attended overlapping social events on the Manhattan elite circuit. Zuckerman\'s Hamptons property was a gathering place for influential figures in media, finance, and politics. He served as chairman of the Conference of Presidents of Major American Jewish Organizations from 2006 to 2012, one of the most powerful positions in organized American Jewish life. His media holdings gave him outsized influence on public discourse, and he has been a regular commentator on economic and foreign policy issues.',
  individuals: [
    { id: 'mortimer-zuckerman', name: 'Mortimer Zuckerman', role: 'Owner, U.S. News & World Report', bio: 'Canadian-American billionaire media mogul and real estate developer.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'social', description: 'Part of Epstein\'s Manhattan social circle. Listed in Epstein contact book.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ghislaine Maxwell', type: 'social', description: 'Maxwell moved in the same NYC media/society circles.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Council on Foreign Relations (CFR)', type: 'member', description: 'Member of CFR, overlapping with Epstein\'s CFR connections.', entryId: 'council-on-foreign-relations-cfr' }
  ]
});

// --- Noam Chomsky ---
addEntry('United States', {
  id: 'noam-chomsky-connections',
  name: 'Noam Chomsky',
  type: 'academic / public intellectual',
  category: 'Education',
  founded: 1955,
  description: 'Avram Noam Chomsky is an American linguist, philosopher, cognitive scientist, historian, social critic, and political activist, born in 1928 in Philadelphia to a Jewish family of Eastern European descent. Often called "the father of modern linguistics," Chomsky is Institute Professor Emeritus at MIT and Laureate Professor at the University of Arizona. He has authored over 100 books and is one of the most cited scholars in history. In 2023, The Wall Street Journal revealed that Chomsky had met with Jeffrey Epstein several times, including dinners and meetings arranged in 2015 and 2016 - years after Epstein\'s 2008 conviction. Chomsky confirmed the meetings to the Journal but stated they discussed "political topics" and that Epstein had arranged a meeting for Chomsky with then-Israeli Prime Minister Ehud Barak. Chomsky described Epstein\'s interest as related to academics and political discussions. The revelation was particularly notable given Chomsky\'s public persona as a critic of elite power structures and institutional corruption.',
  individuals: [
    { id: 'noam-chomsky', name: 'Noam Chomsky', role: 'Professor Emeritus, MIT', bio: 'American linguist and political activist. Met with Epstein multiple times post-conviction.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'social', description: 'Multiple meetings 2015-2016 (post-conviction). Discussed politics. Epstein arranged Barak meeting.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ehud Barak', type: 'political', description: 'Chomsky met Barak through meeting arranged by Epstein.', entryId: 'ehud-barak-connections' },
    { name: 'MIT Media Lab', type: 'institutional', description: 'Both connected to MIT. Chomsky as long-time professor, Epstein as controversial donor.', entryId: 'mit-media-lab' }
  ]
});

// --- Lawrence Krauss ---
addEntry('United States', {
  id: 'lawrence-krauss-connections',
  name: 'Lawrence Krauss',
  type: 'theoretical physicist',
  category: 'Education',
  founded: 1993,
  description: 'Lawrence Maxwell Krauss is a Canadian-American theoretical physicist and cosmologist, born in 1954 in New York City to a Jewish family. He served as Foundation Professor at Arizona State University\'s Department of Physics and School of Earth and Space Exploration, and director of the Origins Project. A prominent popularizer of science and outspoken atheist, Krauss authored "The Physics of Star Trek" and "A Universe from Nothing." Krauss was one of Jeffrey Epstein\'s most vocal defenders and closest scientist friends. He attended multiple dinners and events at Epstein\'s Manhattan townhouse, visited Epstein\'s private island, and publicly defended Epstein after the 2008 conviction, telling The Daily Beast in 2011: "I don\'t feel tarnished in any way by my relationship with Jeffrey; I feel raised by it." In 2019, Krauss acknowledged this defense was wrong. Separately, in 2018, Krauss was accused of sexual misconduct by multiple women, including groping at events. He retired from ASU after an investigation substantiated some claims. His case highlighted the overlap between the Epstein operation and the broader culture of harassment in elite scientific circles.',
  individuals: [
    { id: 'lawrence-krauss', name: 'Lawrence Krauss', role: 'Physicist / Epstein Defender', bio: 'Theoretical physicist who publicly defended Epstein post-conviction and visited his island.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'social/intellectual', description: 'Close relationship. Visited island. Publicly defended Epstein: "I feel raised by it."', entryId: 'jeffrey-epstein-network' },
    { name: 'John Brockman / Edge Foundation', type: 'intellectual', description: 'Both connected through Brockman\'s Edge Foundation dinners where Epstein hosted scientists.', entryId: 'john-brockman-edge' },
    { name: 'Harvard University', type: 'academic', description: 'Krauss worked with Harvard-connected scientists who also received Epstein funding.', entryId: 'harvard-university' }
  ]
});

// --- John Brockman / Edge Foundation ---
addEntry('United States', {
  id: 'john-brockman-edge',
  name: 'John Brockman / Edge Foundation',
  type: 'literary agent / intellectual salon',
  category: 'Media',
  founded: 1996,
  description: 'John Brockman (born 1941, Jewish) is an American literary agent and founder of the Edge Foundation, an intellectual salon and website that brings together leading scientists, technologists, and thinkers. Through Edge.org, Brockman published the annual "Edge Question" and organized exclusive dinners connecting the world\'s top minds. Brockman served as a critical node connecting Jeffrey Epstein to the scientific establishment. He organized and hosted "billionaires\' dinners" where Epstein met and cultivated relationships with prominent scientists including Steven Pinker, Daniel Kahneman, and others. After Epstein\'s 2019 arrest, internal Brockman emails obtained by media revealed him referring to Epstein as "my friend" and describing Epstein\'s Manhattan townhouse as a salon for the "most interesting people in the world." In a 2013 email, Brockman wrote admiringly of Epstein\'s ability to convene top scientists and billionaires. The revelations forced Brockman to step back from Edge Foundation operations. Multiple scientists who received Epstein funding had been introduced through Brockman\'s network.',
  individuals: [
    { id: 'john-brockman', name: 'John Brockman', role: 'Founder, Edge Foundation / Literary Agent', bio: 'Literary agent who connected Epstein to dozens of top scientists through exclusive dinners.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'social/intellectual', description: 'Key intermediary who introduced Epstein to dozens of elite scientists through Edge dinners.', entryId: 'jeffrey-epstein-network' },
    { name: 'MIT Media Lab', type: 'intellectual', description: 'Joi Ito and other MIT Media Lab figures connected to Epstein through Brockman network.', entryId: 'mit-media-lab' },
    { name: 'Harvard University', type: 'intellectual', description: 'Multiple Harvard scientists connected to Epstein through Brockman\'s Edge events.', entryId: 'harvard-university' },
    { name: 'Lawrence Krauss', type: 'intellectual', description: 'Krauss was part of Brockman\'s scientific circle that overlapped with Epstein.', entryId: 'lawrence-krauss-connections' }
  ]
});

// --- Epstein Virgin Islands Properties ---
addEntry('United States', {
  id: 'epstein-vi-properties',
  name: 'Epstein Virgin Islands Properties',
  type: 'private estate / crime scene',
  category: 'Notable Individuals',
  founded: 1998,
  description: 'Jeffrey Epstein\'s properties in the U.S. Virgin Islands comprised Little St. James (approximately 70 acres, purchased in 1998 for $7.95 million) and Great St. James (approximately 165 acres, purchased in 2016). Little St. James, infamously known as "Pedophile Island" or "Orgy Island," contained Epstein\'s main residential compound, guest houses, a mysterious blue-and-white striped temple structure, and extensive security infrastructure. Flight logs of Epstein\'s Boeing 727 (tail number N908JE, nicknamed the "Lolita Express") and his Gulfstream revealed hundreds of trips carrying prominent guests to the island. Workers on the island described seeing young girls being brought by boat and plane. In 2020, the USVI Attorney General Denise George filed a civil lawsuit against Epstein\'s estate alleging sex trafficking on the islands spanning two decades. The lawsuit revealed that Epstein brought girls as young as 11 to the island. In 2023, JPMorgan Chase settled with the USVI for $75 million over its role in facilitating Epstein\'s operations. The islands were sold in 2023 for approximately $60 million to billionaire Stephen Deckoff.',
  individuals: [
    { id: 'jeffrey-epstein', name: 'Jeffrey Epstein', role: 'Owner (1998-2019)', bio: 'American financier and convicted sex offender (1953-2019).' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'property', description: 'Epstein\'s primary base of operations for trafficking and entertaining powerful guests.', entryId: 'jeffrey-epstein-network' },
    { name: 'U.S. Virgin Islands Government', type: 'legal', description: 'USVI AG filed major civil suit against Epstein estate. Settled with JPMorgan for $75M.', entryId: 'us-virgin-islands-gov' },
    { name: 'Bill Clinton', type: 'visitor', description: 'Flight logs show Clinton visited the island. Clinton has denied visiting but crew testimony contradicts this.', entryId: 'bill-clinton-connections' },
    { name: 'Prince Andrew', type: 'visitor', description: 'Virginia Giuffre alleged she was trafficked to the island for Prince Andrew.', entryId: 'prince-andrew' },
    { name: 'Bill Gates', type: 'visitor', description: 'Gates flew on Epstein\'s plane. Relationship included visits and meetings.', entryId: 'bill-gates-connections' },
    { name: 'JPMorgan Chase', type: 'financial', description: 'JPMorgan settled for $75M with USVI over facilitating Epstein\'s island operations.', entryId: 'jpmorgan-chase' },
    { name: 'Alan Dershowitz', type: 'visitor', description: 'Dershowitz admitted visiting the island but denied any improper conduct.', entryId: 'alan-dershowitz-connections' },
    { name: 'Ghislaine Maxwell', type: 'related', description: 'Maxwell managed operations at the island properties alongside Epstein.', entryId: 'ghislaine-maxwell-connections' }
  ]
});

// --- Cy Vance Jr ---
addEntry('United States', {
  id: 'cy-vance-connections',
  name: 'Cyrus Vance Jr.',
  type: 'prosecutor / district attorney',
  category: 'Legal',
  founded: 2009,
  description: 'Cyrus Roberts Vance Jr. (born 1954) served as Manhattan District Attorney from 2010 to 2021. He is the son of Cyrus Vance, who served as Secretary of State under President Carter. In 2011, following Epstein\'s 2008 conviction in Florida, the Manhattan DA\'s office was preparing to seek a court order requiring Epstein to register as a Level 3 sex offender (the highest risk category) in New York. However, Epstein\'s lawyers - including former Manhattan DA John Sweeney and former deputy DA Linda Fairstein - lobbied the DA\'s office. Ultimately, Vance\'s office asked the judge to downgrade Epstein to Level 1, the lowest risk designation. A Vance spokesman later said the office "did not initiate" the downgrade request but could not adequately explain why it argued for leniency. The revelation became a significant scandal for Vance\'s office. Separately, Vance chose not to pursue sexual assault charges against Harvey Weinstein in 2015 despite an NYPD sting operation that recorded Weinstein admitting to groping model Ambra Battilana Gutierrez. Vance received a $10,000 campaign donation from Weinstein\'s lawyer shortly after declining to prosecute.',
  individuals: [
    { id: 'cy-vance-jr', name: 'Cyrus Vance Jr.', role: 'Former Manhattan District Attorney (2010-2021)', bio: 'DA who sought to downgrade Epstein\'s sex offender status and declined to prosecute Weinstein in 2015.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'legal', description: 'Office argued to downgrade Epstein to Level 1 sex offender despite overwhelming evidence.', entryId: 'jeffrey-epstein-network' },
    { name: 'Harvey Weinstein', type: 'legal', description: 'Declined to prosecute Weinstein in 2015 despite recorded confession. Received donation from Weinstein lawyer.', entryId: 'harvey-weinstein-connections' },
    { name: 'Alan Dershowitz', type: 'legal', description: 'Epstein legal team lobbied Vance\'s office for favorable treatment.', entryId: 'alan-dershowitz-connections' },
    { name: 'SDNY', type: 'legal', description: 'Both Vance\'s office and SDNY handled aspects of the Epstein prosecution at different times.', entryId: 'sdny' }
  ]
});

// --- Bill & Melinda Gates Foundation ---
addEntry('United States', {
  id: 'bill-melinda-gates-foundation',
  name: 'Bill & Melinda Gates Foundation',
  type: 'philanthropic foundation',
  category: 'Philanthropy',
  founded: 2000,
  website: 'https://www.gatesfoundation.org/',
  description: 'The Bill & Melinda Gates Foundation is the largest private charitable foundation in the world, with an endowment of approximately $75 billion as of 2024. Founded in 2000 by Bill Gates and Melinda French Gates, the foundation focuses on global health (malaria, HIV/AIDS, tuberculosis, polio eradication), global development (agriculture, financial services for the poor), and U.S. education. The foundation has donated over $65 billion since inception. It is the largest private funder of the World Health Organization, giving it enormous influence over global health policy - a fact that has drawn both praise and criticism. The foundation was embroiled in the Epstein scandal when it was revealed that Gates had met with Epstein multiple times beginning in 2011 (three years after Epstein\'s first sex offense conviction). Emails showed that Epstein proposed a multibillion-dollar charitable fund with JPMorgan and the Gates Foundation, though this did not materialize. Boris Nikolic, a former science advisor to Gates, was named as a backup executor of Epstein\'s will - a fact that surprised Nikolic according to his spokesperson. Melinda French Gates stated that Bill\'s relationship with Epstein was one factor in their 2021 divorce. The foundation has granted money to organizations worldwide and has been criticized for its influence over public health and education policy, agricultural practices in developing nations, and media (having donated over $300 million to media organizations).',
  individuals: [
    { id: 'bill-gates', name: 'Bill Gates', role: 'Co-Chair', bio: 'Co-founder of Microsoft and co-chair of the Gates Foundation. Met Epstein multiple times post-conviction.' },
    { id: 'melinda-french-gates', name: 'Melinda French Gates', role: 'Former Co-Chair (until 2024)', bio: 'Philanthropist and former co-chair. Cited Bill\'s Epstein meetings as factor in 2021 divorce.' },
    { id: 'boris-nikolic', name: 'Boris Nikolic', role: 'Former Science Advisor to Bill Gates', bio: 'Croatian-American physician named as backup executor of Epstein\'s will.' }
  ],
  connections: [
    { name: 'Bill Gates', type: 'founder', description: 'Co-founded by Bill Gates with endowment of ~$75 billion.', entryId: 'bill-gates-connections' },
    { name: 'Jeffrey Epstein Network', type: 'related', description: 'Epstein proposed a multibillion-dollar fund with Gates Foundation and JPMorgan. Meetings between Gates and Epstein involved foundation staff.', entryId: 'jeffrey-epstein-network' },
    { name: 'JPMorgan Chase', type: 'financial', description: 'Epstein proposed joint charitable fund. Gates Foundation has banking relationship.', entryId: 'jpmorgan-chase' },
    { name: 'Clinton Foundation', type: 'partnership', description: 'Partnered on global health, particularly in sub-Saharan Africa.', entryId: 'clinton-foundation' },
    { name: 'Microsoft Corporation', type: 'corporate', description: 'Gates\' Microsoft wealth funds the foundation.', entryId: 'microsoft-corporation' },
    { name: 'Harvard University', type: 'grants', description: 'Major grant recipient from the Gates Foundation for global health research.', entryId: 'harvard-university' }
  ]
});

// --- Microsoft Corporation ---
addEntry('United States', {
  id: 'microsoft-corporation',
  name: 'Microsoft Corporation',
  type: 'technology corporation',
  category: 'Technology',
  founded: 1975,
  website: 'https://www.microsoft.com/',
  description: 'Microsoft Corporation is an American multinational technology corporation founded by Bill Gates and Paul Allen on April 4, 1975 in Albuquerque, New Mexico. It is one of the largest and most valuable companies in the world, with a market capitalization exceeding $3 trillion. Microsoft produces Windows (90%+ desktop OS market share), Office 365, Azure cloud computing (second-largest cloud platform globally), LinkedIn, Xbox, and GitHub. CEO Satya Nadella (since 2014) led the company\'s transformation into a cloud-first enterprise. Steve Ballmer served as CEO from 2000 to 2014. Bill Gates served as CEO until 2000 and remained chairman until 2014. Microsoft\'s relevance to the Epstein network is through its founder: Bill Gates met with Jeffrey Epstein multiple times from 2011 to 2014, years after Epstein\'s 2008 sex offense conviction. Gates reportedly sought Epstein\'s advice on philanthropy and met at Epstein\'s Manhattan townhouse. Microsoft employees were aware of the meetings. The company\'s immense wealth enabled Gates\' philanthropic activities through the Bill & Melinda Gates Foundation.',
  individuals: [
    { id: 'bill-gates', name: 'Bill Gates', role: 'Co-Founder (1975-present)', bio: 'Co-founded Microsoft at age 19. Met Epstein multiple times post-conviction.' },
    { id: 'paul-allen', name: 'Paul Allen', role: 'Co-Founder (1975-2018, deceased)', bio: 'Co-founded Microsoft with Gates. Jewish mother. Philanthropist. Died 2018.' },
    { id: 'steve-ballmer', name: 'Steve Ballmer', role: 'Former CEO (2000-2014)', bio: 'Succeeded Gates as CEO. Now owner of the LA Clippers.' },
    { id: 'satya-nadella', name: 'Satya Nadella', role: 'CEO (2014-present)', bio: 'Transformed Microsoft into a cloud-first company. Market cap grew from $300B to $3T+.' }
  ],
  connections: [
    { name: 'Bill Gates', type: 'founder', description: 'Co-founded by Gates in 1975. His wealth from Microsoft stock funds the Gates Foundation.', entryId: 'bill-gates-connections' },
    { name: 'Bill & Melinda Gates Foundation', type: 'philanthropy', description: 'Gates\' Microsoft fortune is the primary endowment source for the $75B foundation.', entryId: 'bill-melinda-gates-foundation' },
    { name: 'LinkedIn', type: 'subsidiary', description: 'Microsoft acquired LinkedIn in 2016 for $26.2 billion. Reid Hoffman (LinkedIn co-founder) connected to Epstein.', entryId: 'reid-hoffman-connections' },
    { name: 'Goldman Sachs', type: 'financial', description: 'Long-standing investment banking relationship.', entryId: 'goldman-sachs-historic' }
  ]
});

// --- Cascade Investment ---
addEntry('United States', {
  id: 'cascade-investment',
  name: 'Cascade Investment LLC',
  type: 'private investment firm',
  category: 'Investment & Private Equity',
  founded: 1995,
  description: 'Cascade Investment LLC is the private investment vehicle and family office of Bill Gates, managing approximately $80 billion in assets. Founded in 1995 and based in Kirkland, Washington, Cascade is managed by Michael Larson, who has served as chief investment officer since its inception. The firm holds major positions in real estate (largest private farmland owner in the U.S. with approximately 270,000 acres across 19 states), hospitality (Four Seasons Hotels - 47.5% stake alongside Saudi Prince Alwaleed bin Talal), and publicly traded companies including Republic Services, Canadian National Railway, Deere & Company, and Ecolab. Cascade\'s operations are highly secretive - Larson has rarely spoken publicly. In 2022, The New York Times reported on a culture of harassment and inappropriate behavior at Cascade, with Larson accused of making sexually inappropriate comments, viewing pornographic material in the office, and pursuing women at the firm. These revelations emerged after the Gates divorce and Epstein scandal. Cascade\'s investment decisions have been influenced by Gates\' growing interest in climate and agriculture, areas where Epstein also sought to build influence.',
  individuals: [
    { id: 'bill-gates', name: 'Bill Gates', role: 'Sole Owner', bio: 'Co-founder of Microsoft. Cascade manages his ~$80 billion personal fortune.' },
    { id: 'michael-larson', name: 'Michael Larson', role: 'Chief Investment Officer (since 1995)', bio: 'Manages Gates\' fortune. Accused of workplace harassment at Cascade in 2022 NYT expose.' }
  ],
  connections: [
    { name: 'Bill Gates', type: 'owner', description: 'Gates\' personal investment vehicle managing ~$80 billion.', entryId: 'bill-gates-connections' },
    { name: 'Bill & Melinda Gates Foundation', type: 'financial', description: 'Cascade manages investments that generate income for the Gates Foundation.', entryId: 'bill-melinda-gates-foundation' },
    { name: 'Microsoft Corporation', type: 'origin', description: 'Gates\' Microsoft wealth is managed through Cascade.', entryId: 'microsoft-corporation' }
  ]
});

// --- Breakthrough Energy ---
addEntry('United States', {
  id: 'breakthrough-energy',
  name: 'Breakthrough Energy',
  type: 'climate investment fund',
  category: 'Philanthropy',
  founded: 2015,
  website: 'https://www.breakthroughenergy.org/',
  description: 'Breakthrough Energy is a network of investment vehicles and organizations founded by Bill Gates in 2015 to accelerate innovation in sustainable energy and reduce greenhouse gas emissions to net zero. The umbrella includes Breakthrough Energy Ventures (a $2 billion fund), Breakthrough Energy Fellows, and Breakthrough Energy Catalyst. Investors in Breakthrough Energy Ventures include Jeff Bezos, Michael Bloomberg, Richard Branson, Jack Ma, Masayoshi Son, and Reid Hoffman. Notably, Reid Hoffman (LinkedIn co-founder) who is also an investor had his own connections to Jeffrey Epstein - he apologized in 2019 for facilitating meetings between Epstein and MIT Media Lab. The fund focuses on clean energy technologies including next-generation nuclear, green hydrogen, direct air capture, and sustainable aviation fuel. Gates has stated that addressing climate change requires both public policy and private innovation, and has used Breakthrough Energy to position himself as a leading voice on climate technology.',
  individuals: [
    { id: 'bill-gates', name: 'Bill Gates', role: 'Founder & Chair', bio: 'Founded Breakthrough Energy in 2015 to fund clean energy innovation.' }
  ],
  connections: [
    { name: 'Bill Gates', type: 'founder', description: 'Founded by Gates to deploy billions into clean energy technology.', entryId: 'bill-gates-connections' },
    { name: 'Reid Hoffman', type: 'investor', description: 'LinkedIn co-founder and Breakthrough Energy Ventures investor. Also connected to Epstein.', entryId: 'reid-hoffman-connections' },
    { name: 'Bill & Melinda Gates Foundation', type: 'related', description: 'Aligned with Gates Foundation climate goals. Shared personnel and mission.', entryId: 'bill-melinda-gates-foundation' },
    { name: 'Microsoft Corporation', type: 'corporate', description: 'Microsoft committed to carbon negative by 2030, aligned with Breakthrough Energy mission.', entryId: 'microsoft-corporation' }
  ]
});

// --- Naomi Campbell ---
addEntry('United Kingdom', {
  id: 'naomi-campbell-connections',
  name: 'Naomi Campbell',
  type: 'supermodel / public figure',
  category: 'Entertainment',
  founded: 1986,
  description: 'Naomi Elaine Campbell (born 1970, London) is a British supermodel, actress, and businesswoman. One of the original "Big Six" supermodels of the 1990s, Campbell has appeared on over 500 magazine covers. She was among the guests who appeared on Jeffrey Epstein\'s flight logs. Campbell was photographed with Ghislaine Maxwell at various social events. Campbell\'s name appeared in Epstein\'s contact book, and flight records show she took trips on Epstein\'s private aircraft. While Campbell has not been accused of any wrongdoing, her presence in Epstein\'s orbit illustrates the breadth of his social circle across the entertainment, fashion, and high-society worlds. Campbell also has connections to other controversial figures, having accepted a "blood diamond" gift from former Liberian President Charles Taylor in 1997 (she testified about this at Taylor\'s war crimes trial in 2010). She founded Fashion for Relief in 2005 for charitable purposes, though the UK Charity Commission later found serious misconduct in the charity\'s operations.',
  individuals: [
    { id: 'naomi-campbell', name: 'Naomi Campbell', role: 'Supermodel', bio: 'British supermodel who appeared in Epstein flight logs and contact book.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'social', description: 'Appeared in Epstein flight logs and contact book. Photographed with Maxwell.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ghislaine Maxwell', type: 'social', description: 'Photographed together at social events. Both moved in same elite circles.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Jean-Luc Brunel / MC2', type: 'industry', description: 'Both in the modeling world during the same era when Brunel operated with Epstein funding.', entryId: 'jean-luc-brunel-mc2' }
  ]
});

// --- Kevin Spacey ---
addEntry('United States', {
  id: 'kevin-spacey-connections',
  name: 'Kevin Spacey',
  type: 'actor / accused sexual predator',
  category: 'Entertainment',
  founded: 1986,
  description: 'Kevin Spacey Fowler (born 1959) is an American actor who won two Academy Awards and starred in "American Beauty" and the Netflix series "House of Cards." In 2017, multiple men accused Spacey of sexual misconduct and assault. Kevin Spacey was connected to Jeffrey Epstein through documented interactions: he flew on Epstein\'s private jet (the "Lolita Express") on a trip to Africa with Bill Clinton in 2002. Photos obtained by media showed Spacey sitting in the cockpit of Epstein\'s 727 and lounging on the plane with Maxwell. A former Epstein associate stated Spacey visited Epstein\'s private island in the U.S. Virgin Islands. Spacey was also seen at Epstein\'s Manhattan townhouse. Like Epstein and Harvey Weinstein, Spacey represents a pattern of powerful men in elite circles accused of predatory behavior that was protected by their status and connections for decades.',
  individuals: [
    { id: 'kevin-spacey', name: 'Kevin Spacey', role: 'Actor', bio: 'Oscar-winning actor who flew on Epstein jet, visited island, and was later accused of sexual assault.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'social', description: 'Flew on Epstein\'s plane. Photographed on "Lolita Express" with Maxwell. Reportedly visited island.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ghislaine Maxwell', type: 'social', description: 'Photographed together on Epstein\'s private jet.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Bill Clinton', type: 'social', description: 'Flew together on Epstein\'s jet to Africa in 2002 with Chris Tucker.', entryId: 'bill-clinton-connections' }
  ]
});

// ── Phase 3: Massively expand Bill Gates ─────────────────────────────────────

console.log('\n=== Phase 3: Expand Bill Gates entry ===');
{
  const ref = entryMap['bill-gates-connections'];
  if (ref) {
    const e = ref.entry;

    // Rewrite description to be exhaustive
    e.description = 'William Henry Gates III (born October 28, 1955) is an American business magnate, investor, philanthropist, and the co-founder of Microsoft Corporation. Born in Seattle, Washington, Gates grew up in an upper-middle-class family; his father William H. Gates Sr. was a prominent attorney, and his mother Mary Maxwell Gates served on the board of First Interstate BancSystem and the United Way. Gates dropped out of Harvard University in 1975 to co-found Microsoft with childhood friend Paul Allen. Under his leadership, Microsoft became the world\'s most valuable company, and Gates became the world\'s wealthiest person (a position he held for many years). Gates stepped down as Microsoft CEO in 2000, as chairman in 2014, and from the board in 2020. His personal fortune, managed through Cascade Investment LLC, is estimated at $130 billion. In the Epstein context, Gates\' relationship with Jeffrey Epstein has been extensively documented. Gates met Epstein multiple times starting in 2011 - three years after Epstein\'s first sex offense conviction. The New York Times reported that Gates flew on Epstein\'s Lolita Express in 2013, visited Epstein\'s Manhattan townhouse numerous times between 2011 and 2014, and stayed late into the night on multiple occasions. Email correspondence showed that Epstein proposed a multibillion-dollar global health charitable fund involving the Gates Foundation and JPMorgan Chase. Gates Foundation employees including Boris Nikolic attended meetings with Epstein. Nikolic was later named as a backup executor of Epstein\'s will, which came as a reported surprise to him. Melinda French Gates told CBS in 2022 that she was "furious" about Bill\'s relationship with Epstein and that it was one of several factors in their May 2021 divorce. Gates initially downplayed the relationship, telling The Wall Street Journal in 2019 that he "didn\'t have any business relationship or friendship with" Epstein - a characterization he later revised, acknowledging the meetings were a mistake. Separately, Microsoft founder Paul Allen\'s estate and investment firm Vulcan also had contact with Epstein circles. Reid Hoffman, co-founder of LinkedIn (acquired by Microsoft for $26.2 billion in 2016), apologized in 2019 for helping arrange meetings between Epstein and MIT Media Lab\'s Joi Ito.';

    // Add individuals
    e.individuals = [
      { id: 'bill-gates', name: 'Bill Gates', role: 'Co-Founder, Microsoft / Co-Chair, Gates Foundation', bio: 'American billionaire who met Epstein multiple times post-conviction. Co-founder of Microsoft.' },
      { id: 'melinda-french-gates', name: 'Melinda French Gates', role: 'Former Wife / Former Co-Chair, Gates Foundation', bio: 'Cited Bill\'s Epstein meetings as factor in their 2021 divorce.' },
      { id: 'boris-nikolic', name: 'Boris Nikolic', role: 'Former Science Advisor to Bill Gates', bio: 'Croatian-American physician named as backup executor of Epstein\'s will without his knowledge.' }
    ];

    // Rebuild connections comprehensively
    e.connections = [
      { name: 'Jeffrey Epstein Network', type: 'social/financial', description: 'Multiple meetings 2011-2014 post-conviction. Flew on Lolita Express 2013. Visited Manhattan townhouse. Epstein proposed joint charitable fund.', entryId: 'jeffrey-epstein-network' },
      { name: 'JPMorgan Chase', type: 'financial', description: 'Epstein proposed multibillion-dollar charitable fund with Gates Foundation and JPMorgan. Gates has banking relationships with JPMorgan.', entryId: 'jpmorgan-chase' },
      { name: 'Microsoft Corporation', type: 'founder', description: 'Co-founded Microsoft in 1975 with Paul Allen. Built it into the world\'s most valuable company.', entryId: 'microsoft-corporation' },
      { name: 'Bill & Melinda Gates Foundation', type: 'founder', description: 'Co-founded the world\'s largest private charitable foundation (~$75B endowment). Epstein met with foundation staff.', entryId: 'bill-melinda-gates-foundation' },
      { name: 'Cascade Investment LLC', type: 'owner', description: 'Gates\' private investment firm managing ~$80B. Largest private farmland owner in the U.S.', entryId: 'cascade-investment' },
      { name: 'Breakthrough Energy', type: 'founder', description: 'Founded in 2015 to fund clean energy innovation. Investors include other Epstein-connected figures.', entryId: 'breakthrough-energy' },
      { name: 'Harvard University', type: 'academic', description: 'Gates attended Harvard (dropped out 1975). Foundation is major Harvard grant funder. Epstein also donated to Harvard.', entryId: 'harvard-university' },
      { name: 'MIT Media Lab', type: 'related', description: 'Gates Foundation worked with MIT researchers. Epstein was a major secret donor to MIT Media Lab.', entryId: 'mit-media-lab' },
      { name: 'Reid Hoffman / LinkedIn', type: 'business/social', description: 'Microsoft acquired Hoffman\'s LinkedIn for $26.2B. Hoffman connected to Epstein via MIT Media Lab meetings.', entryId: 'reid-hoffman-connections' },
      { name: 'Ghislaine Maxwell', type: 'social', description: 'Gates met with Epstein who was closely associated with Maxwell. No direct Gates-Maxwell link documented.', entryId: 'ghislaine-maxwell-connections' },
      { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Gates flew on Epstein\'s plane. The full extent of island visits is unknown.', entryId: 'epstein-vi-properties' },
      { name: 'Les Wexner', type: 'related', description: 'Both connected to Epstein network. Wexner was Epstein\'s primary financial patron.', entryId: 'les-wexner-connections' },
      { name: 'Clinton Foundation', type: 'philanthropy', description: 'Gates Foundation partnered with Clinton Foundation on global health. Both organizations connected to Epstein.', entryId: 'clinton-foundation' },
      { name: 'Bill Clinton', type: 'social/philanthropy', description: 'Both connected to Epstein independently. Gates and Clinton collaborated through foundations.', entryId: 'bill-clinton-connections' },
      { name: 'Ehud Barak', type: 'related', description: 'Both Gates and Barak connected to Epstein. Barak visited Epstein properties.', entryId: 'ehud-barak-connections' },
      { name: 'Goldman Sachs', type: 'financial', description: 'Long-standing financial relationship. Goldman Sachs provides banking services to Gates entities.', entryId: 'goldman-sachs-historic' }
    ];

    console.log('  Bill Gates: updated description, ' + e.individuals.length + ' individuals, ' + e.connections.length + ' connections');
  }
}

// ── Phase 4: Expand Epstein entry with new connections ──────────────────────

console.log('\n=== Phase 4: Add new Epstein connections ===');
{
  const newEpsteinConns = [
    { name: 'Ghislaine Maxwell', type: 'co-conspirator', description: 'Primary co-conspirator. Recruited, groomed, and trafficked victims. Convicted on 5 counts of sex trafficking in 2021.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Jean-Luc Brunel / MC2 Model Management', type: 'criminal', description: 'MC2 modeling agency funded by Epstein. Brunel supplied young models as victims. Found dead in prison 2022.', entryId: 'jean-luc-brunel-mc2' },
    { name: 'J. Epstein & Co.', type: 'business', description: 'Epstein\'s private financial management firm. Only known client was Les Wexner. Source of mysterious wealth.', entryId: 'j-epstein-company' },
    { name: 'Glenn Dubin', type: 'social/alleged', description: 'Decades-long friendship. Named in victim depositions. Wife Eva is Epstein\'s ex-girlfriend.', entryId: 'glenn-dubin-connections' },
    { name: 'Jes Staley', type: 'financial/social', description: 'JPMorgan banker. 1,200+ emails with Epstein post-conviction. Visited island. Banned from UK finance.', entryId: 'jes-staley-connections' },
    { name: 'Harvey Weinstein', type: 'social', description: 'Overlapping NYC elite circles. Both exposed as serial predators protected by wealth and power.', entryId: 'harvey-weinstein-connections' },
    { name: 'Henry Kissinger', type: 'social', description: 'Connected through NYC elite social circles and Council on Foreign Relations.', entryId: 'henry-kissinger-connections' },
    { name: 'Mortimer Zuckerman', type: 'social', description: 'Media mogul in Epstein\'s Manhattan social circle. Listed in Epstein\'s contact book.', entryId: 'mortimer-zuckerman-connections' },
    { name: 'Noam Chomsky', type: 'intellectual', description: 'Multiple meetings 2015-2016 (post-conviction). Epstein arranged meeting with PM Barak for Chomsky.', entryId: 'noam-chomsky-connections' },
    { name: 'Lawrence Krauss', type: 'intellectual', description: 'Physicist defender of Epstein: "I feel raised by it." Visited island. Attended townhouse dinners.', entryId: 'lawrence-krauss-connections' },
    { name: 'John Brockman / Edge Foundation', type: 'intellectual', description: 'Key node connecting Epstein to scientific establishment through exclusive Edge dinners.', entryId: 'john-brockman-edge' },
    { name: 'Clinton Foundation', type: 'financial', description: 'Epstein donated $25,000. Maxwell attended Clinton Global Initiative events.', entryId: 'clinton-foundation' },
    { name: 'Naomi Campbell', type: 'social', description: 'Appeared in Epstein flight logs. Photographed with Maxwell at social events.', entryId: 'naomi-campbell-connections' },
    { name: 'Kevin Spacey', type: 'social', description: 'Flew on Lolita Express to Africa with Clinton in 2002. Photographed on Epstein\'s plane.', entryId: 'kevin-spacey-connections' },
    { name: 'Epstein Virgin Islands Properties', type: 'property', description: 'Little St. James and Great St. James islands. Primary operational base for trafficking.', entryId: 'epstein-vi-properties' },
    { name: 'Terra Mar Project', type: 'related', description: 'Maxwell\'s NGO dissolved days after Epstein\'s 2019 arrest.', entryId: 'terra-mar-project' },
    { name: 'Cyrus Vance Jr.', type: 'legal', description: 'Manhattan DA whose office argued to downgrade Epstein\'s sex offender status.', entryId: 'cy-vance-connections' },
    { name: 'Bill & Melinda Gates Foundation', type: 'related', description: 'Epstein proposed joint charitable fund involving Gates Foundation. Met with foundation staff.', entryId: 'bill-melinda-gates-foundation' },
    { name: 'Barclays', type: 'financial', description: 'CEO Jes Staley forced out over Epstein ties. 1,200+ emails between Staley and Epstein.', entryId: 'barclays' },
    { name: 'Microsoft Corporation', type: 'related', description: 'Gates (Microsoft co-founder) met Epstein multiple times. Reid Hoffman (LinkedIn/Microsoft) also connected.', entryId: 'microsoft-corporation' }
  ];

  let added = 0;
  for (const conn of newEpsteinConns) {
    if (addConnectionToEntry('jeffrey-epstein-network', conn)) added++;
  }
  console.log('  Added ' + added + ' new connections to Epstein');

  // Also add new individuals to Epstein entry
  addIndividualToEntry('jeffrey-epstein-network', {
    id: 'glenn-dubin', name: 'Glenn Dubin', role: 'Associate - Hedge Fund Manager',
    bio: 'Co-founder of Highbridge Capital. Close friend named in victim depositions.'
  });
  addIndividualToEntry('jeffrey-epstein-network', {
    id: 'jes-staley', name: 'Jes Staley', role: 'Associate - JPMorgan/Barclays Executive',
    bio: 'Former Barclays CEO banned from UK finance over Epstein ties.'
  });
  addIndividualToEntry('jeffrey-epstein-network', {
    id: 'eva-andersson-dubin', name: 'Eva Andersson-Dubin', role: 'Associate - Epstein Ex-Girlfriend',
    bio: 'Former Miss Sweden and physician. Dated Epstein in 1980s. Named in Giuffre depositions.'
  });
}

// ── Phase 5: Add cross-connections to existing entries ───────────────────────

console.log('\n=== Phase 5: Cross-connections ===');

// Expand Clinton entry
addConnectionToEntry('bill-clinton-connections', { name: 'Clinton Foundation', type: 'founder', description: 'Founded in 1997. Epstein donated $25,000. Maxwell attended CGI events.', entryId: 'clinton-foundation' });
addConnectionToEntry('bill-clinton-connections', { name: 'Kevin Spacey', type: 'social', description: 'Flew together on Epstein\'s jet to Africa in 2002.', entryId: 'kevin-spacey-connections' });
addConnectionToEntry('bill-clinton-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Maxwell attended Chelsea Clinton\'s wedding and Clinton Global Initiative events.', entryId: 'ghislaine-maxwell-connections' });
addConnectionToEntry('bill-clinton-connections', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Flight logs show Clinton visited Little St. James. Clinton has disputed this.', entryId: 'epstein-vi-properties' });
addConnectionToEntry('bill-clinton-connections', { name: 'Bill Gates', type: 'philanthropy', description: 'Clinton and Gates foundations partnered on global health. Both connected to Epstein.', entryId: 'bill-gates-connections' });

// Expand Trump entry
addConnectionToEntry('donald-trump-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Attended same NYC social events. "I wish her well" comment in 2020 about Maxwell\'s arrest.', entryId: 'ghislaine-maxwell-connections' });
addConnectionToEntry('donald-trump-connections', { name: 'Alexander Acosta', type: 'political', description: 'Appointed Acosta (who gave Epstein the lenient 2008 plea deal) as Labor Secretary in 2017. Acosta resigned in 2019.', entryId: 'alexander-acosta-connections' });
addConnectionToEntry('donald-trump-connections', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Virginia Giuffre was recruited from Trump\'s Mar-a-Lago resort by Ghislaine Maxwell.', entryId: 'epstein-vi-properties' });
addConnectionToEntry('donald-trump-connections', { name: 'Alan Dershowitz', type: 'legal', description: 'Dershowitz represented both Epstein and later served on Trump\'s impeachment defense team.', entryId: 'alan-dershowitz-connections' });

// Expand Prince Andrew
addConnectionToEntry('prince-andrew', { name: 'Ghislaine Maxwell', type: 'social', description: 'Long-standing friendship. Introduced to Epstein through Maxwell. Virginia Giuffre photographed with Andrew at Maxwell\'s home.', entryId: 'ghislaine-maxwell-connections' });
addConnectionToEntry('prince-andrew', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Virginia Giuffre alleged she was trafficked to Epstein\'s island for Prince Andrew.', entryId: 'epstein-vi-properties' });
addConnectionToEntry('prince-andrew', { name: 'Alan Dershowitz', type: 'legal', description: 'Both named in Virginia Giuffre allegations. Dershowitz represented Epstein.', entryId: 'alan-dershowitz-connections' });

// Expand Les Wexner
addConnectionToEntry('les-wexner-connections', { name: 'J. Epstein & Co.', type: 'financial', description: 'Wexner was Epstein\'s only known major client. Gave Epstein power of attorney and $77M townhouse.', entryId: 'j-epstein-company' });
addConnectionToEntry('les-wexner-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Maxwell was present in Epstein\'s social orbit facilitated by Wexner\'s patronage.', entryId: 'ghislaine-maxwell-connections' });
addConnectionToEntry('les-wexner-connections', { name: 'Jean-Luc Brunel / MC2', type: 'industry', description: 'Epstein used Victoria\'s Secret brand as a recruiting tool; Brunel operated in the same modeling space.', entryId: 'jean-luc-brunel-mc2' });

// Expand Ehud Barak
addConnectionToEntry('ehud-barak-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Barak was photographed entering an Epstein property. Maxwell connected to Barak through Epstein.', entryId: 'ghislaine-maxwell-connections' });
addConnectionToEntry('ehud-barak-connections', { name: 'Noam Chomsky', type: 'social', description: 'Epstein arranged a meeting between Chomsky and Barak in 2015-2016.', entryId: 'noam-chomsky-connections' });
addConnectionToEntry('ehud-barak-connections', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Barak reportedly visited Epstein\'s island and Manhattan townhouse.', entryId: 'epstein-vi-properties' });

// Expand Alan Dershowitz
addConnectionToEntry('alan-dershowitz-connections', { name: 'Ghislaine Maxwell', type: 'legal', description: 'Represented Epstein. Named in Giuffre allegations involving Maxwell.', entryId: 'ghislaine-maxwell-connections' });
addConnectionToEntry('alan-dershowitz-connections', { name: 'Harvey Weinstein', type: 'legal', description: 'Consulted with Weinstein\'s legal team in addition to representing Epstein.', entryId: 'harvey-weinstein-connections' });
addConnectionToEntry('alan-dershowitz-connections', { name: 'Cyrus Vance Jr.', type: 'legal', description: 'Epstein\'s lawyers lobbied Vance\'s office to downgrade Epstein\'s sex offender classification.', entryId: 'cy-vance-connections' });
addConnectionToEntry('alan-dershowitz-connections', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Admitted visiting Epstein\'s island but denied any wrongdoing.', entryId: 'epstein-vi-properties' });

// Expand Reid Hoffman
addConnectionToEntry('reid-hoffman-connections', { name: 'Microsoft Corporation', type: 'acquisition', description: 'LinkedIn (co-founded by Hoffman) was acquired by Microsoft for $26.2B in 2016.', entryId: 'microsoft-corporation' });
addConnectionToEntry('reid-hoffman-connections', { name: 'Bill Gates', type: 'business', description: 'Connected through Microsoft/LinkedIn acquisition and Breakthrough Energy investment.', entryId: 'bill-gates-connections' });
addConnectionToEntry('reid-hoffman-connections', { name: 'Breakthrough Energy', type: 'investor', description: 'Investor in Gates\' Breakthrough Energy Ventures climate fund.', entryId: 'breakthrough-energy' });

// Expand Harvard - Epstein connections
addConnectionToEntry('harvard-university', { name: 'Bill Gates', type: 'related', description: 'Gates attended Harvard (dropped out 1975). Foundation is major Harvard grant funder.', entryId: 'bill-gates-connections' });
addConnectionToEntry('harvard-university', { name: 'Bill & Melinda Gates Foundation', type: 'funding', description: 'Major grant recipient from the Gates Foundation for global health research.', entryId: 'bill-melinda-gates-foundation' });
addConnectionToEntry('harvard-university', { name: 'John Brockman / Edge Foundation', type: 'related', description: 'Multiple Harvard scientists participated in Brockman\'s Edge events where Epstein networked.', entryId: 'john-brockman-edge' });
addConnectionToEntry('harvard-university', { name: 'Alan Dershowitz', type: 'faculty', description: 'Dershowitz was Harvard Law School professor emeritus. Represented Epstein.', entryId: 'alan-dershowitz-connections' });

// Expand Apollo Global Management
addConnectionToEntry('apollo-global-management', { name: 'Jeffrey Epstein Network', type: 'scandal', description: 'Leon Black paid Epstein $158M in advisory fees and charitable donations. Resigned as CEO in 2021.', entryId: 'jeffrey-epstein-network' });
addConnectionToEntry('apollo-global-management', { name: 'Ghislaine Maxwell', type: 'related', description: 'Leon Black\'s Epstein payments included period when Maxwell was Epstein\'s active associate.', entryId: 'ghislaine-maxwell-connections' });

// Expand Barclays
addConnectionToEntry('barclays', { name: 'Jes Staley', type: 'executive', description: 'CEO resigned in 2021 over Epstein relationship. Later banned from UK finance by FCA.', entryId: 'jes-staley-connections' });
addConnectionToEntry('barclays', { name: 'Ghislaine Maxwell', type: 'related', description: 'Staley\'s Epstein connections involved Maxwell\'s network.', entryId: 'ghislaine-maxwell-connections' });

// Expand JPMorgan
addConnectionToEntry('jpmorgan-chase', { name: 'Jes Staley', type: 'former executive', description: 'Staley spent 34 years at JPMorgan. Oversaw Epstein accounts. Called Epstein a "rock star."', entryId: 'jes-staley-connections' });
addConnectionToEntry('jpmorgan-chase', { name: 'Bill & Melinda Gates Foundation', type: 'financial', description: 'Epstein proposed joint fund with Gates Foundation through JPMorgan. Settled with USVI for $75M.', entryId: 'bill-melinda-gates-foundation' });
addConnectionToEntry('jpmorgan-chase', { name: 'Glenn Dubin / Highbridge Capital', type: 'subsidiary', description: 'JPMorgan acquired Dubin\'s Highbridge Capital Management in 2004.', entryId: 'glenn-dubin-connections' });
addConnectionToEntry('jpmorgan-chase', { name: 'Epstein Virgin Islands Properties', type: 'legal', description: 'Settled with USVI for $75M over facilitating Epstein\'s operations through banking services.', entryId: 'epstein-vi-properties' });
addConnectionToEntry('jpmorgan-chase', { name: 'Ghislaine Maxwell', type: 'related', description: 'JPMorgan maintained Epstein accounts while Maxwell was his active associate and co-conspirator.', entryId: 'ghislaine-maxwell-connections' });

// Expand Deutsche Bank
addConnectionToEntry('deutsche-bank', { name: 'Ghislaine Maxwell', type: 'related', description: 'Maintained Epstein accounts 2013-2019 while Maxwell was his active associate. Fined $150M.', entryId: 'ghislaine-maxwell-connections' });
addConnectionToEntry('deutsche-bank', { name: 'Epstein Virgin Islands Properties', type: 'financial', description: 'Processed payments related to Epstein\'s island operations. Fined by NY regulators.', entryId: 'epstein-vi-properties' });

// Expand Elon Musk
addConnectionToEntry('elon-musk-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Photographed with Maxwell at an event in 2014. Musk stated they "photobombed" him.', entryId: 'ghislaine-maxwell-connections' });
addConnectionToEntry('elon-musk-connections', { name: 'Bill Gates', type: 'rivalry', description: 'Public feud with Gates over climate approach, short positions in Tesla, and other issues.', entryId: 'bill-gates-connections' });

// Expand Steve Bannon
addConnectionToEntry('steve-bannon-connections', { name: 'Ghislaine Maxwell', type: 'legal', description: 'Arrested on same charges as Maxwell\'s lawyer\'s yacht. Peripherally connected through social circles.', entryId: 'ghislaine-maxwell-connections' });

// Expand Woody Allen
addConnectionToEntry('woody-allen-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Allen was in Epstein\'s social circle and Maxwell facilitated many of these social connections.', entryId: 'ghislaine-maxwell-connections' });

console.log('  Cross-connections added');

// ── Phase 6: New people ─────────────────────────────────────────────────────

console.log('\n=== Phase 6: Add new people ===');

addPerson('bill-gates', {
  name: 'Bill Gates',
  bio: 'American business magnate and co-founder of Microsoft Corporation. Born 1955 in Seattle. World\'s wealthiest person for many years. Co-chair of the Bill & Melinda Gates Foundation (~$75B endowment). Met Jeffrey Epstein multiple times from 2011-2014 (post-conviction). Flew on Epstein\'s jet in 2013. Melinda cited Epstein meetings as factor in 2021 divorce.',
  notes: '',
  affiliations: [
    { organization: 'Bill Gates', role: 'Subject', entryId: 'bill-gates-connections', country: 'United States' },
    { organization: 'Microsoft Corporation', role: 'Co-Founder', entryId: 'microsoft-corporation', country: 'United States' },
    { organization: 'Bill & Melinda Gates Foundation', role: 'Co-Chair', entryId: 'bill-melinda-gates-foundation', country: 'United States' },
    { organization: 'Cascade Investment LLC', role: 'Owner', entryId: 'cascade-investment', country: 'United States' },
    { organization: 'Breakthrough Energy', role: 'Founder', entryId: 'breakthrough-energy', country: 'United States' }
  ]
});

addPerson('melinda-french-gates', {
  name: 'Melinda French Gates',
  bio: 'American philanthropist and former wife of Bill Gates. Born 1964 in Dallas. Former Microsoft general manager. Co-founded Gates Foundation. Cited Bill\'s Epstein meetings as factor in their 2021 divorce. Left the Gates Foundation in 2024.',
  notes: '',
  affiliations: [
    { organization: 'Bill & Melinda Gates Foundation', role: 'Former Co-Chair', entryId: 'bill-melinda-gates-foundation', country: 'United States' }
  ]
});

addPerson('boris-nikolic', {
  name: 'Boris Nikolic',
  bio: 'Croatian-American physician and venture capitalist. Former science advisor to Bill Gates. Named as backup executor of Jeffrey Epstein\'s will - reportedly without his knowledge. His spokesperson said Nikolic was "shocked" by the designation and would decline to serve.',
  notes: '',
  affiliations: [
    { organization: 'Bill & Melinda Gates Foundation', role: 'Former Science Advisor', entryId: 'bill-melinda-gates-foundation', country: 'United States' }
  ]
});

addPerson('glenn-dubin', {
  name: 'Glenn Dubin',
  bio: 'American billionaire hedge fund manager. Co-founder of Highbridge Capital Management. Close friend of Jeffrey Epstein spanning decades. Named in Virginia Giuffre\'s sworn depositions alleging trafficking. Wife Eva Andersson-Dubin is Epstein\'s ex-girlfriend.',
  notes: '',
  affiliations: [
    { organization: 'Glenn Dubin', role: 'Subject', entryId: 'glenn-dubin-connections', country: 'United States' },
    { organization: 'Jeffrey Epstein Network', role: 'Associate', entryId: 'jeffrey-epstein-network', country: 'United States' }
  ]
});

addPerson('eva-andersson-dubin', {
  name: 'Eva Andersson-Dubin',
  bio: 'Swedish-American physician and former Miss Sweden (1980). Dated Jeffrey Epstein in the 1980s before marrying Glenn Dubin. Named in Virginia Giuffre\'s depositions.',
  notes: '',
  affiliations: [
    { organization: 'Glenn Dubin', role: 'Wife - Named in Giuffre depositions', entryId: 'glenn-dubin-connections', country: 'United States' }
  ]
});

addPerson('harvey-weinstein', {
  name: 'Harvey Weinstein',
  bio: 'American former film producer and convicted sex offender. Born 1952 in Queens, NY, to a Jewish family. Co-founded Miramax Films and The Weinstein Company. Convicted of rape and sexual assault. 80+ accusers. His exposure catalyzed the global #MeToo movement.',
  notes: '',
  affiliations: [
    { organization: 'Harvey Weinstein', role: 'Subject', entryId: 'harvey-weinstein-connections', country: 'United States' }
  ]
});

addPerson('henry-kissinger', {
  name: 'Henry Kissinger',
  bio: 'German-born American diplomat (1923-2023). Born Heinz Alfred Kissinger in Bavaria to a Jewish family. Fled Nazi Germany in 1938. U.S. Secretary of State 1973-1977. Nobel Peace Prize 1973. Connected to Epstein through NYC elite circles and CFR.',
  notes: '',
  affiliations: [
    { organization: 'Henry Kissinger', role: 'Subject', entryId: 'henry-kissinger-connections', country: 'United States' }
  ]
});

addPerson('mortimer-zuckerman', {
  name: 'Mortimer Zuckerman',
  bio: 'Canadian-American billionaire media proprietor and real estate developer. Born 1937 in Montreal to a Jewish family. Owner of U.S. News & World Report. Former chair of Conference of Presidents of Major American Jewish Organizations. In Epstein\'s social circle.',
  notes: '',
  affiliations: [
    { organization: 'Mortimer Zuckerman', role: 'Subject', entryId: 'mortimer-zuckerman-connections', country: 'United States' }
  ]
});

addPerson('noam-chomsky', {
  name: 'Noam Chomsky',
  bio: 'American linguist, philosopher, and political activist. Born 1928 in Philadelphia to a Jewish family. Institute Professor Emeritus at MIT. Often called "the father of modern linguistics." Met with Epstein multiple times in 2015-2016 (post-conviction).',
  notes: '',
  affiliations: [
    { organization: 'Noam Chomsky', role: 'Subject', entryId: 'noam-chomsky-connections', country: 'United States' },
    { organization: 'MIT Media Lab', role: 'MIT Professor', entryId: 'mit-media-lab', country: 'United States' }
  ]
});

addPerson('lawrence-krauss', {
  name: 'Lawrence Krauss',
  bio: 'Canadian-American theoretical physicist and cosmologist. Born 1954 in New York City to a Jewish family. Visited Epstein\'s island and publicly defended him post-conviction: "I feel raised by it." Retired from ASU after sexual misconduct allegations.',
  notes: '',
  affiliations: [
    { organization: 'Lawrence Krauss', role: 'Subject', entryId: 'lawrence-krauss-connections', country: 'United States' }
  ]
});

addPerson('john-brockman', {
  name: 'John Brockman',
  bio: 'American literary agent and founder of the Edge Foundation. Born 1941, Jewish. Key intermediary who connected Epstein to dozens of top scientists through exclusive billionaire dinners. Referred to Epstein as "my friend" in leaked emails.',
  notes: '',
  affiliations: [
    { organization: 'John Brockman / Edge Foundation', role: 'Founder', entryId: 'john-brockman-edge', country: 'United States' }
  ]
});

addPerson('naomi-campbell', {
  name: 'Naomi Campbell',
  bio: 'British supermodel, born 1970 in London. One of the original "Big Six" supermodels. Appeared in Jeffrey Epstein\'s flight logs and contact book. Photographed with Ghislaine Maxwell.',
  notes: '',
  affiliations: [
    { organization: 'Naomi Campbell', role: 'Subject', entryId: 'naomi-campbell-connections', country: 'United Kingdom' }
  ]
});

addPerson('kevin-spacey', {
  name: 'Kevin Spacey',
  bio: 'American actor. Born 1959. Two-time Academy Award winner. Flew on Epstein\'s "Lolita Express" to Africa with Bill Clinton in 2002. Photographed on Epstein\'s plane with Maxwell. Later accused of sexual assault by multiple men.',
  notes: '',
  affiliations: [
    { organization: 'Kevin Spacey', role: 'Subject', entryId: 'kevin-spacey-connections', country: 'United States' }
  ]
});

addPerson('cy-vance-jr', {
  name: 'Cyrus Vance Jr.',
  bio: 'American prosecutor. Manhattan District Attorney 2010-2021. Son of Secretary of State Cyrus Vance. His office argued to downgrade Epstein\'s sex offender status. Also declined to prosecute Harvey Weinstein in 2015.',
  notes: '',
  affiliations: [
    { organization: 'Cyrus Vance Jr.', role: 'Subject', entryId: 'cy-vance-connections', country: 'United States' }
  ]
});

addPerson('michael-larson', {
  name: 'Michael Larson',
  bio: 'American investment manager. Chief investment officer of Cascade Investment (Bill Gates\' family office) since 1995. Manages approximately $80 billion. Accused of workplace harassment in a 2022 New York Times expose.',
  notes: '',
  affiliations: [
    { organization: 'Cascade Investment LLC', role: 'Chief Investment Officer', entryId: 'cascade-investment', country: 'United States' }
  ]
});

addPerson('paul-allen', {
  name: 'Paul Allen',
  bio: 'American business magnate and philanthropist (1953-2018). Co-founded Microsoft with Bill Gates in 1975. Jewish mother. Owner of Seattle Seahawks and Portland Trail Blazers. Founded Vulcan Inc. Died of lymphoma in 2018.',
  notes: '',
  affiliations: [
    { organization: 'Microsoft Corporation', role: 'Co-Founder', entryId: 'microsoft-corporation', country: 'United States' }
  ]
});

addPerson('steve-ballmer', {
  name: 'Steve Ballmer',
  bio: 'American businessman. CEO of Microsoft from 2000 to 2014. Born 1956 in Detroit to a Jewish father (Swiss immigrant). Owner of the Los Angeles Clippers. Net worth approximately $120 billion.',
  notes: '',
  affiliations: [
    { organization: 'Microsoft Corporation', role: 'Former CEO (2000-2014)', entryId: 'microsoft-corporation', country: 'United States' }
  ]
});

addPerson('satya-nadella', {
  name: 'Satya Nadella',
  bio: 'Indian-American business executive. CEO of Microsoft since 2014. Born 1967 in Hyderabad, India. Transformed Microsoft into a cloud-first company, growing market cap from $300B to over $3 trillion.',
  notes: '',
  affiliations: [
    { organization: 'Microsoft Corporation', role: 'CEO (2014-present)', entryId: 'microsoft-corporation', country: 'United States' }
  ]
});

// ── Phase 7: Fix any remaining dashes ───────────────────────────────────────

console.log('\n=== Phase 7: Final dash cleanup ===');
const jdFixed = fixDashes(jd);
const pdFixed = fixDashes(pd);

// ── Write ────────────────────────────────────────────────────────────────────

fs.writeFileSync(JEWISH_PATH, JSON.stringify(jdFixed, null, 2), 'utf8');
fs.writeFileSync(PEOPLE_PATH, JSON.stringify(pdFixed, null, 2), 'utf8');

// ── Stats ────────────────────────────────────────────────────────────────────

console.log('\n=== Final Stats ===');

let totalEntries = 0, totalConns = 0, totalInds = 0;
const countryCount = Object.keys(jdFixed.countries).length;
const cats = new Set();

for (const country of Object.keys(jdFixed.countries)) {
  for (const entry of jdFixed.countries[country]) {
    totalEntries++;
    totalConns += (entry.connections || []).length;
    totalInds += (entry.individuals || []).length;
    if (entry.category) cats.add(entry.category);
  }
}

const totalPeople = Object.keys(pdFixed.people).length;

console.log('Entries:     ', totalEntries);
console.log('Countries:   ', countryCount);
console.log('People:      ', totalPeople);
console.log('Individuals: ', totalInds);
console.log('Connections: ', totalConns);
console.log('Categories:  ', cats.size);
console.log('\nDone!');
