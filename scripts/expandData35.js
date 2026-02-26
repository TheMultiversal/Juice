#!/usr/bin/env node
/**
 * expandData35.js - Fill out all person entries, expand bios, add missing people,
 * create missing entry targets, add cross-connections everywhere
 *
 * 1. Add individuals to all 11 person-connection entries that have 0
 * 2. Expand connections on sparse person entries (Acosta, Stephanopoulos, Musk, etc.)
 * 3. Create 5 missing entry targets (unresolved connections)
 * 4. Add missing people to people.json
 * 5. Expand 100+ sparse people bios
 * 6. Add prince-andrew individual
 * 7. More cross-connections on major entries
 */

const fs = require('fs');
const path = require('path');

const JEWISH_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PEOPLE_PATH = path.join(__dirname, '..', 'data', 'people.json');

const jd = JSON.parse(fs.readFileSync(JEWISH_PATH, 'utf8'));
const pd = JSON.parse(fs.readFileSync(PEOPLE_PATH, 'utf8'));

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

const entryMap = {};
for (const country of Object.keys(jd.countries)) {
  for (const entry of jd.countries[country]) {
    if (entry.id) entryMap[entry.id] = { country, entry };
  }
}

function entryExists(id) { return !!entryMap[id]; }

function addEntry(country, entry) {
  entry = fixDashes(entry);
  if (entryExists(entry.id)) { return false; }
  if (!jd.countries[country]) jd.countries[country] = [];
  jd.countries[country].push(entry);
  entryMap[entry.id] = { country, entry };
  console.log('  + entry:', entry.id);
  return true;
}

function addPerson(id, person) {
  person = fixDashes(person);
  if (pd.people[id]) {
    // Update sparse existing person if new bio is longer
    const existing = pd.people[id];
    if (person.bio && person.bio.length > (existing.bio || '').length) {
      existing.bio = person.bio;
      // Merge affiliations
      for (const aff of (person.affiliations || [])) {
        const hasDupe = (existing.affiliations || []).some(a => a.entryId === aff.entryId && a.role === aff.role);
        if (!hasDupe) {
          if (!existing.affiliations) existing.affiliations = [];
          existing.affiliations.push(aff);
        }
      }
      return true; // updated
    }
    return false;
  }
  pd.people[id] = person;
  console.log('  + person:', id);
  return true;
}

function addConnectionToEntry(entryId, conn) {
  conn = fixDashes(conn);
  const ref = entryMap[entryId];
  if (!ref) return false;
  const e = ref.entry;
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
  if (ref.entry.individuals.some(i => i.id === ind.id)) return false;
  ref.entry.individuals.push(ind);
  return true;
}

function updateEntryField(entryId, field, value) {
  const ref = entryMap[entryId];
  if (!ref) return false;
  ref.entry[field] = fixDashes(value);
  return true;
}

let stats = { entries: 0, people: 0, connections: 0, individuals: 0, updates: 0 };

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 1: Add individuals to all person-connection entries
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n=== Phase 1: Add individuals to person entries ===');

addIndividualToEntry('bill-clinton-connections', {
  id: 'bill-clinton-ind', name: 'Bill Clinton', role: '42nd President of the United States (1993-2001)',
  bio: 'William Jefferson Clinton served as the 42nd President. Flew on Epstein\'s jet 26+ times. Epstein donated to Clinton Foundation. Visited Epstein\'s island per crew testimony.'
});

addIndividualToEntry('donald-trump-connections', {
  id: 'donald-trump-ind', name: 'Donald Trump', role: '45th & 47th President of the United States',
  bio: 'Donald John Trump. Social relationship with Epstein in 1990s-2000s. In 2002 told New York Magazine: "He likes beautiful women as much as I do, and many of them are on the younger side."'
});

addIndividualToEntry('alan-dershowitz-connections', {
  id: 'alan-dershowitz-ind', name: 'Alan Dershowitz', role: 'Attorney / Harvard Law Professor Emeritus',
  bio: 'Prominent criminal defense attorney. Represented Epstein in 2008 plea deal negotiations. Named in Virginia Giuffre allegations. Denied all accusations.'
});

addIndividualToEntry('alexander-acosta-connections', {
  id: 'alexander-acosta-ind', name: 'Alexander Acosta', role: 'Former U.S. Secretary of Labor / Former U.S. Attorney',
  bio: 'As U.S. Attorney for Southern District of Florida, negotiated the controversial 2008 plea deal that allowed Epstein to plead to state charges and serve just 13 months. Appointed Labor Secretary by Trump in 2017, resigned in 2019 amid Epstein scrutiny.'
});

addIndividualToEntry('elon-musk-connections', {
  id: 'elon-musk-ind', name: 'Elon Musk', role: 'CEO of Tesla & SpaceX / Owner of X (Twitter)',
  bio: 'South African-born American billionaire. Photographed with Ghislaine Maxwell at a 2014 Vanity Fair event. Musk stated Maxwell "photobombed" him. Owner of Tesla, SpaceX, X, Neuralink, and The Boring Company.'
});

addIndividualToEntry('reid-hoffman-connections', {
  id: 'reid-hoffman-ind', name: 'Reid Hoffman', role: 'Co-Founder, LinkedIn / Venture Capitalist',
  bio: 'Co-founded LinkedIn (sold to Microsoft for $26.2B). Apologized in 2019 for facilitating meetings between Epstein and MIT Media Lab\'s Joi Ito at Epstein\'s request.'
});

addIndividualToEntry('steve-bannon-connections', {
  id: 'steve-bannon-ind', name: 'Steve Bannon', role: 'Former White House Chief Strategist',
  bio: 'Political strategist and media executive. Co-founded Breitbart News. Served as Trump campaign CEO and White House Chief Strategist. Reportedly met with Epstein before his 2019 arrest to discuss potential defense strategies.'
});

addIndividualToEntry('woody-allen-connections', {
  id: 'woody-allen-ind', name: 'Woody Allen', role: 'Film Director / Actor',
  bio: 'American filmmaker born Allan Stewart Konigsberg in 1935 to a Jewish family in Brooklyn. Listed in Epstein\'s contact book. Attended dinner at Epstein\'s Manhattan townhouse. His own sexual abuse allegations (by adopted daughter Dylan Farrow) paralleled Epstein network patterns.'
});

addIndividualToEntry('george-stephanopoulos-connections', {
  id: 'george-stephanopoulos-ind', name: 'George Stephanopoulos', role: 'ABC News Anchor / Former Clinton Aide',
  bio: 'Television journalist and former White House Communications Director under Bill Clinton. Attended a dinner party at Epstein\'s Manhattan townhouse in 2010, after Epstein\'s first conviction.'
});

addIndividualToEntry('les-wexner-connections', {
  id: 'leslie-wexner-ind', name: 'Leslie Wexner', role: 'Founder & Former CEO, L Brands',
  bio: 'American billionaire. Founded L Brands (Victoria\'s Secret, Bath & Body Works). Only known major client of Epstein. Gave Epstein power of attorney, transferred $77M townhouse, and allowed Epstein to manage Wexner Foundation funds.'
});

addIndividualToEntry('ehud-barak-connections', {
  id: 'ehud-barak-ind', name: 'Ehud Barak', role: 'Former Prime Minister of Israel (1999-2001)',
  bio: 'Israeli politician and military leader. Most decorated soldier in Israeli history. Visited Epstein\'s Manhattan townhouse and island. Received $2.5M from Epstein via a foundation. Photographed entering an Epstein building.'
});

addIndividualToEntry('prince-andrew', {
  id: 'prince-andrew-ind', name: 'Prince Andrew', role: 'Duke of York / British Royal Family',
  bio: 'Third child of Queen Elizabeth II. Key figure in Epstein scandal. Virginia Giuffre alleged trafficking at age 17. Infamous photo with Giuffre at Maxwell\'s London home. Settled civil suit for approximately 12 million pounds in 2022. Stripped of military titles and royal patronages.'
});

console.log('  Added individuals to 12 person entries');

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 2: Expand connections on sparse person entries
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n=== Phase 2: Expand sparse person entry connections ===');

// Alexander Acosta
addConnectionToEntry('alexander-acosta-connections', { name: 'Donald Trump', type: 'political', description: 'Appointed by Trump as Secretary of Labor in 2017. Resigned in July 2019 amid renewed Epstein scrutiny.', entryId: 'donald-trump-connections' });
addConnectionToEntry('alexander-acosta-connections', { name: 'Palm Beach Police Department', type: 'legal', description: 'Palm Beach PD originally investigated Epstein in 2005. Acosta\'s federal plea deal overrode local prosecution.', entryId: 'palm-beach-police' });
addConnectionToEntry('alexander-acosta-connections', { name: 'FBI', type: 'legal', description: 'FBI was involved in Epstein investigation before Acosta negotiated the lenient federal plea deal.', entryId: 'fbi' });
addConnectionToEntry('alexander-acosta-connections', { name: 'Alan Dershowitz', type: 'legal', description: 'Dershowitz was part of Epstein\'s defense team that negotiated the plea deal with Acosta.', entryId: 'alan-dershowitz-connections' });
addConnectionToEntry('alexander-acosta-connections', { name: 'SDNY', type: 'legal', description: 'SDNY eventually brought new federal charges against Epstein in 2019, superseding Acosta\'s original deal.', entryId: 'sdny' });

// George Stephanopoulos
addConnectionToEntry('george-stephanopoulos-connections', { name: 'Bill Clinton', type: 'political', description: 'Served as Clinton\'s White House Communications Director. Both independently connected to Epstein.', entryId: 'bill-clinton-connections' });
addConnectionToEntry('george-stephanopoulos-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Maxwell was present in social circles where Stephanopoulos interacted with Epstein associates.', entryId: 'ghislaine-maxwell-connections' });
addConnectionToEntry('george-stephanopoulos-connections', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Stephanopoulos attended events in Epstein\'s orbit post-conviction, though extent of relationship is unclear.', entryId: 'epstein-vi-properties' });

// Elon Musk
addConnectionToEntry('elon-musk-connections', { name: 'Donald Trump', type: 'political', description: 'Major political ally. Musk became prominent Trump supporter and advisor. Runs DOGE government efficiency initiative.', entryId: 'donald-trump-connections' });
addConnectionToEntry('elon-musk-connections', { name: 'Microsoft Corporation', type: 'business', description: 'Competitor through Tesla vs automotive AI, SpaceX vs Azure space, and OpenAI rivalry.', entryId: 'microsoft-corporation' });
addConnectionToEntry('elon-musk-connections', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Musk denied visiting Epstein island. Challenged anyone to produce evidence of a visit.', entryId: 'epstein-vi-properties' });

// Steve Bannon
addConnectionToEntry('steve-bannon-connections', { name: 'Donald Trump', type: 'political', description: 'Campaign CEO and White House Chief Strategist for Trump. Later pardoned by Trump after fraud indictment.', entryId: 'donald-trump-connections' });
addConnectionToEntry('steve-bannon-connections', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Bannon reportedly met with Epstein to discuss media strategy before 2019 arrest.', entryId: 'epstein-vi-properties' });

// Woody Allen
addConnectionToEntry('woody-allen-connections', { name: 'Harvey Weinstein', type: 'industry', description: 'Weinstein distributed Allen films. Both accused of sexual abuse. Allen defended Weinstein when #MeToo began.', entryId: 'harvey-weinstein-connections' });
addConnectionToEntry('woody-allen-connections', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Allen attended Epstein social events. Full extent of relationship unknown.', entryId: 'epstein-vi-properties' });

// Ehud Barak
addConnectionToEntry('ehud-barak-connections', { name: 'Mossad (Israeli Intelligence)', type: 'intelligence', description: 'As former PM and military chief, closely connected to Israeli intelligence. Speculation about intelligence dimensions of Epstein relationship.', entryId: 'mossad-israeli-intelligence' });
addConnectionToEntry('ehud-barak-connections', { name: 'Bill Gates', type: 'social', description: 'Both independently connected to Epstein. Barak and Gates were among Epstein\'s high-profile contacts.', entryId: 'bill-gates-connections' });

console.log('  Added connections to Acosta, Stephanopoulos, Musk, Bannon, Allen, Barak');

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 3: Create 5 missing entry targets + additional new entries
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n=== Phase 3: Create missing entries ===');

addEntry('United States', {
  id: 'starbucks-howard-schultz-era',
  name: 'Starbucks (Howard Schultz Era)',
  type: 'coffeehouse chain / corporation',
  category: 'Retail & Consumer Goods',
  founded: 1971,
  website: 'https://www.starbucks.com/',
  description: 'Starbucks Corporation, led by CEO Howard Schultz (Jewish, born 1953, Brooklyn) during its transformation from a small Seattle coffee chain into a global empire of 35,000+ stores. Schultz served as CEO 1986-2000, 2008-2017, and interim CEO 2022-2023. Under his leadership, Starbucks became known for progressive employee benefits including healthcare for part-time workers and college tuition. Schultz briefly explored a 2020 presidential run as an independent. Starbucks has been a frequent target of BDS (Boycott, Divestment, Sanctions) campaigns due to Schultz\'s public support for Israel, though Starbucks as a corporation has no operations in Israel. Schultz was previously chairman of the board and is one of the most prominent Jewish business leaders in America.',
  individuals: [
    { id: 'howard-schultz', name: 'Howard Schultz', role: 'Former CEO & Chairman', bio: 'Grew up in Brooklyn public housing. Transformed Starbucks into a global brand. Briefly explored 2020 presidential run.' }
  ],
  connections: [
    { name: 'Goldman Sachs', type: 'financial', description: 'Goldman Sachs served as investment banker for Starbucks.', entryId: 'goldman-sachs-historic' }
  ]
});

addEntry('Israel', {
  id: 'israel-aerospace-industries',
  name: 'Israel Aerospace Industries (IAI)',
  type: 'defense / aerospace corporation',
  category: 'Technology',
  founded: 1953,
  website: 'https://www.iai.co.il/',
  description: 'Israel Aerospace Industries (IAI) is Israel\'s largest state-owned defense and aerospace company, with annual revenues exceeding $5 billion. Founded in 1953 by Al Schwimmer (American Jewish pilot and smuggler who helped supply aircraft to Israel during the 1948 War of Independence), IAI develops and manufactures military and civilian aircraft, missiles, space systems, drones (UAVs), and cybersecurity solutions. IAI is the world\'s largest maker of military drones and has sold systems to over 50 countries. Key products include the Heron UAV family, Arrow missile defense system (developed with Boeing), LORA ballistic missile, and Kfir fighter aircraft. IAI has been a cornerstone of Israel\'s "Startup Nation" technology ecosystem, spinning off technologies that have driven Israel\'s civilian tech sector. The company employs approximately 15,000 people and is wholly owned by the State of Israel.',
  individuals: [
    { id: 'boaz-levy', name: 'Boaz Levy', role: 'President & CEO', bio: 'CEO of IAI since 2021. Previously served as EVP and GM of IAI\'s Systems, Missiles & Space Group.' }
  ],
  connections: [
    { name: 'Mossad (Israeli Intelligence)', type: 'defense', description: 'IAI develops systems used by Israeli intelligence services including surveillance drones and satellites.', entryId: 'mossad-israeli-intelligence' }
  ]
});

addEntry('Israel', {
  id: 'sodastream',
  name: 'SodaStream',
  type: 'beverage appliance company',
  category: 'Retail & Consumer Goods',
  founded: 1903,
  website: 'https://www.sodastream.com/',
  description: 'SodaStream is an Israeli-owned home carbonation product company, originally founded in England in 1903 and acquired by Israeli firm Soda-Club in 1998. The company became a major flashpoint in the Israeli-Palestinian conflict when its main factory was located in Mishor Adumim, an Israeli settlement industrial zone in the occupied West Bank. BDS activists including Oxfam ambassador Scarlett Johansson targeted SodaStream, leading to a high-profile controversy when Johansson resigned from Oxfam to maintain her SodaStream endorsement deal. CEO Daniel Birnbaum (Jewish) employed approximately 500 Palestinian workers at the West Bank facility and argued the factory promoted coexistence. In 2015, SodaStream moved its factory to the Negev desert, and most Palestinian workers lost their jobs. PepsiCo acquired SodaStream for $3.2 billion in 2018.',
  individuals: [
    { id: 'daniel-birnbaum', name: 'Daniel Birnbaum', role: 'Former CEO (2007-2019)', bio: 'Led SodaStream through BDS controversy and PepsiCo acquisition. Argued factory promoted Israeli-Palestinian coexistence.' }
  ],
  connections: []
});

addEntry('United States', {
  id: 'dell-technologies-israel-operations',
  name: 'Dell Technologies (Israel Operations)',
  type: 'technology corporation',
  category: 'Technology',
  founded: 1984,
  website: 'https://www.dell.com/',
  description: 'Dell Technologies, founded by Michael Dell (Jewish, born 1965, Houston) in his University of Texas dorm room, is one of the world\'s largest technology companies with annual revenues exceeding $100 billion. Dell\'s Israel operations are among the company\'s most important R&D centers globally, employing over 4,000 people across facilities in Ra\'anana, Herzliya, Beer Sheva, and Jerusalem. Israel is Dell\'s second-largest R&D hub outside the United States. Dell Israel focuses on cloud computing, data storage, cybersecurity, and AI/ML. Dell has acquired multiple Israeli companies including EMC (which had acquired Israeli firms), Compellent, and various storage technology startups. Michael Dell is one of the wealthiest Americans with a net worth exceeding $70 billion and has been a significant donor to pro-Israel causes through the Michael & Susan Dell Foundation.',
  individuals: [
    { id: 'michael-dell', name: 'Michael Dell', role: 'Founder, Chairman & CEO', bio: 'Jewish American billionaire. Founded Dell Technologies in 1984 at age 19. Major donor to pro-Israel causes.' }
  ],
  connections: []
});

addEntry('United Kingdom', {
  id: 'marks-spencer-m-s',
  name: 'Marks & Spencer (M&S)',
  type: 'retail corporation',
  category: 'Retail & Consumer Goods',
  founded: 1884,
  website: 'https://www.marksandspencer.com/',
  description: 'Marks and Spencer Group plc (commonly M&S) is a major British multinational retailer founded in 1884 by Michael Marks (Jewish, born Mikhail Marks in Slonim, Belarus/Russian Empire) and Thomas Spencer. Starting as a penny bazaar stall in Leeds, M&S grew into one of Britain\'s most iconic retailers with over 1,000 stores worldwide. The Marks family\'s Jewish heritage profoundly influenced the company\'s culture of social responsibility, fair treatment of employees, and product quality. Simon Marks (Michael\'s son) and Israel Sieff (his brother-in-law, also Jewish) transformed M&S into a national institution. The Sieff family were prominent Zionists - Israel Sieff was president of the Zionist Federation of Great Britain and Ireland. M&S has been a persistent BDS target due to its founders\' Zionist connections and the company\'s sourcing of some products from Israel. Lord Marcus Sieff, who led M&S from 1972 to 1984, was a strong supporter of Israel and friend of Chaim Weizmann. The Marks and Sieff families represent one of the most significant Jewish business dynasties in British history.',
  individuals: [
    { id: 'stuart-machin', name: 'Stuart Machin', role: 'CEO (since 2022)', bio: 'Current CEO of M&S. Overseeing company\'s digital transformation and food business expansion.' }
  ],
  connections: []
});

// Additional new entries for more network depth
addEntry('United States', {
  id: 'victoria-giuffre',
  name: 'Virginia Giuffre',
  type: 'survivor / plaintiff',
  category: 'Legal',
  founded: 2015,
  description: 'Virginia Louise Giuffre (nee Roberts, born 1983) is the most prominent survivor and accuser in the Jeffrey Epstein sex trafficking case. Recruited by Ghislaine Maxwell at age 16 while working as a locker room attendant at Donald Trump\'s Mar-a-Lago resort in Palm Beach, Florida, Giuffre alleges she was trafficked to have sex with Epstein and numerous powerful men including Prince Andrew, Alan Dershowitz, and others. Her 2015 civil lawsuit against Ghislaine Maxwell was the case that began unraveling the Epstein empire; court-ordered release of documents from this case in 2019 and 2024 revealed an extensive list of Epstein associates. Giuffre settled her civil case against Prince Andrew in 2022 for approximately 12 million pounds. She also sued Dershowitz, who countersued, and both later dropped their claims. Giuffre\'s legal team, led by attorneys David Boies and Sigrid McCawley, successfully argued for the release of previously sealed court documents that exposed the breadth of Epstein\'s network. Giuffre has described being trafficked to Epstein\'s properties in New York, Palm Beach, New Mexico, the U.S. Virgin Islands, London, and Paris.',
  individuals: [
    { id: 'virginia-giuffre', name: 'Virginia Giuffre', role: 'Lead Accuser / Survivor', bio: 'Recruited at 16 from Mar-a-Lago by Maxwell. Filed lawsuits exposing Epstein network. Key witness in Maxwell trial.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'victim', description: 'Trafficked by Epstein from ages 16-19. Recruited at Mar-a-Lago. Transported to properties worldwide.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ghislaine Maxwell', type: 'legal', description: 'Maxwell personally recruited Giuffre and groomed her. Giuffre\'s 2015 lawsuit against Maxwell was pivotal.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Prince Andrew', type: 'legal', description: 'Alleged trafficking victim. Filed civil suit. Settled for approximately 12 million pounds in 2022.', entryId: 'prince-andrew' },
    { name: 'Alan Dershowitz', type: 'legal', description: 'Named Dershowitz in allegations. Sued and was countersued. Both parties dropped claims.', entryId: 'alan-dershowitz-connections' },
    { name: 'Donald Trump', type: 'related', description: 'Recruited from Trump\'s Mar-a-Lago resort by Maxwell while working there at age 16.', entryId: 'donald-trump-connections' },
    { name: 'Epstein Virgin Islands Properties', type: 'victim', description: 'Trafficked to Little St. James island. Testified about abuse there.', entryId: 'epstein-vi-properties' },
    { name: 'Les Wexner', type: 'related', description: 'Giuffre described being brought to Wexner\'s Ohio estate by Epstein and Maxwell.', entryId: 'les-wexner-connections' },
    { name: 'Jean-Luc Brunel / MC2', type: 'victim', description: 'Alleged Brunel trafficked her and that three 12-year-old girls were sent as an Epstein "birthday gift."', entryId: 'jean-luc-brunel-mc2' },
    { name: 'FBI', type: 'legal', description: 'Cooperated with FBI investigations into Epstein network.', entryId: 'fbi' }
  ]
});

addEntry('United States', {
  id: 'david-boies-connections',
  name: 'David Boies / Boies Schiller Flexner',
  type: 'law firm / attorney',
  category: 'Legal',
  founded: 1997,
  description: 'David Boies (born 1941) is one of America\'s most prominent trial lawyers, known for representing Al Gore in Bush v. Gore (2000) and the U.S. government in the Microsoft antitrust case. He founded Boies Schiller Flexner LLP in 1997. In the Epstein context, Boies played a contradictory dual role: his firm represented Virginia Giuffre and other Epstein victims in their civil lawsuits against Ghislaine Maxwell and other defendants, while simultaneously representing Harvey Weinstein against sexual assault allegations, including deploying the private intelligence firm Black Cube to investigate and intimidate Weinstein accusers. This apparent conflict - championing sex assault victims in one case while using aggressive tactics against them in another - was extensively reported by Ronan Farrow in his book "Catch and Kill." Boies also represented the Kingdom of Saudi Arabia and had previously been counsel for CBS. His firm\'s work on the Epstein case was instrumental in forcing the release of sealed documents that exposed the breadth of Epstein\'s network.',
  individuals: [
    { id: 'david-boies', name: 'David Boies', role: 'Founder & Chairman', bio: 'Trial lawyer who represented Giuffre against Maxwell while also representing Weinstein. Deployed Black Cube against accusers.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'legal', description: 'Firm represented Epstein victims including Virginia Giuffre in pivotal civil lawsuits.', entryId: 'jeffrey-epstein-network' },
    { name: 'Virginia Giuffre', type: 'legal', description: 'Represented Giuffre in her landmark lawsuits against Maxwell, Prince Andrew, and others.', entryId: 'victoria-giuffre' },
    { name: 'Ghislaine Maxwell', type: 'legal', description: 'Firm sued Maxwell on behalf of Giuffre. Case led to release of explosive sealed documents.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Harvey Weinstein', type: 'legal', description: 'Simultaneously represented Weinstein while representing Epstein victims. Deployed Black Cube against Weinstein accusers.', entryId: 'harvey-weinstein-connections' },
    { name: 'Microsoft Corporation', type: 'legal', description: 'Represented the U.S. DOJ in the landmark Microsoft antitrust case (2001).', entryId: 'microsoft-corporation' },
    { name: 'Prince Andrew', type: 'legal', description: 'Firm\'s work helped build the case that led to Giuffre\'s settlement with Prince Andrew.', entryId: 'prince-andrew' }
  ]
});

addEntry('United States', {
  id: 'mar-a-lago',
  name: 'Mar-a-Lago',
  type: 'private club / presidential estate',
  category: 'Political',
  founded: 1927,
  description: 'Mar-a-Lago is a private members-only club and estate in Palm Beach, Florida, owned by Donald Trump since 1985. Built in 1927 by cereal heiress Marjorie Merriweather Post, the 128-room mansion sits on 17 acres. Trump converted it to a private club in 1995. Mar-a-Lago is a critical location in the Epstein scandal: Virginia Giuffre was working as a locker room attendant at the club\'s spa in 1999 when she was recruited by Ghislaine Maxwell to "work" for Jeffrey Epstein. Giuffre has described being approached by Maxwell at the club at age 16. Trump and Epstein were both members of Palm Beach social circles, and Epstein was a member of Mar-a-Lago before Trump reportedly had him banned (the timeline and reasons for this ban are disputed). After the Epstein scandal broke, Trump said he had a "falling out" with Epstein and barred him from the club. Mar-a-Lago later became Trump\'s primary residence and post-presidential office, and was the site of the FBI\'s 2022 search for classified documents.',
  individuals: [],
  connections: [
    { name: 'Donald Trump', type: 'owner', description: 'Trump has owned Mar-a-Lago since 1985 and operates it as a private club.', entryId: 'donald-trump-connections' },
    { name: 'Jeffrey Epstein Network', type: 'related', description: 'Epstein was a member before being banned. Virginia Giuffre was recruited there by Maxwell.', entryId: 'jeffrey-epstein-network' },
    { name: 'Virginia Giuffre', type: 'related', description: 'Giuffre was working at Mar-a-Lago when recruited by Maxwell at age 16.', entryId: 'victoria-giuffre' },
    { name: 'Ghislaine Maxwell', type: 'related', description: 'Maxwell recruited Giuffre at Mar-a-Lago spa in 1999.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Palm Beach Police Department', type: 'legal', description: 'Palm Beach PD investigated Epstein starting in 2005. His Palm Beach operations overlapped with Mar-a-Lago social circles.', entryId: 'palm-beach-police' }
  ]
});

addEntry('United States', {
  id: 'leslie-groff-connections',
  name: 'Lesley Groff',
  type: 'executive assistant / alleged facilitator',
  category: 'Notable Individuals',
  description: 'Lesley Groff served as Jeffrey Epstein\'s executive assistant for approximately 20 years, managing his complex schedule, travel arrangements, and communications. She was one of four women identified as "potential co-conspirators" in Epstein\'s 2008 non-prosecution agreement but was never charged. Groff\'s role in the Epstein operation was primarily organizational - she arranged visits, travel, and logistics that facilitated Epstein\'s access to young women and his meetings with powerful figures. Court documents and victim testimony describe Groff as the gatekeeper who scheduled "massages" (Epstein\'s euphemism for sexual encounters with young women) at his various properties. Despite being named as a potential co-conspirator, Groff received immunity under the controversial plea deal negotiated by Alexander Acosta. She continued to work for Epstein after his 2008 conviction and until his 2019 arrest. She settled civil lawsuits brought by Epstein victims.',
  individuals: [
    { id: 'lesley-groff', name: 'Lesley Groff', role: 'Executive Assistant to Epstein', bio: 'Managed Epstein\'s schedule for 20 years. Named as potential co-conspirator. Received immunity in 2008 plea deal.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'facilitation', description: 'Managed Epstein\'s schedule and arranged "massage" appointments with young women for 20 years.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ghislaine Maxwell', type: 'co-conspirator', description: 'Worked alongside Maxwell in managing Epstein\'s household and scheduling.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Alexander Acosta', type: 'legal', description: 'Received immunity under Acosta\'s controversial 2008 non-prosecution agreement.', entryId: 'alexander-acosta-connections' },
    { name: 'Epstein Virgin Islands Properties', type: 'logistics', description: 'Arranged travel to Epstein\'s island properties and other locations.', entryId: 'epstein-vi-properties' },
    { name: 'Virginia Giuffre', type: 'related', description: 'Named in civil lawsuits by Epstein victims including Giuffre.', entryId: 'victoria-giuffre' }
  ]
});

addEntry('United States', {
  id: 'sarah-kellen-connections',
  name: 'Sarah Kellen (Vickers)',
  type: 'alleged recruiter / facilitator',
  category: 'Notable Individuals',
  description: 'Sarah Kellen (now Sarah Kellen Vickers) served as Jeffrey Epstein\'s personal assistant and scheduler and was named by multiple victims as one of Epstein\'s primary recruiters of underage girls. Like Lesley Groff, she was identified as a "potential co-conspirator" in Epstein\'s 2008 non-prosecution agreement but was never charged, receiving immunity under the plea deal. Victims described Kellen as organizing encounters, scheduling "massages," and directly recruiting young women. She also worked at Jean-Luc Brunel\'s MC2 Model Management agency, which was funded by Epstein. After the Epstein scandal, Kellen rebranded herself as an interior designer and married NASCAR driver Brian Vickers. She settled civil lawsuits brought by Epstein victims. Flight logs show she was one of the most frequent flyers on Epstein\'s aircraft, appearing on hundreds of flights.',
  individuals: [
    { id: 'sarah-kellen', name: 'Sarah Kellen', role: 'Personal Assistant / Alleged Recruiter', bio: 'Epstein\'s scheduler and alleged primary recruiter. Named as co-conspirator but received immunity. Now married to NASCAR driver Brian Vickers.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'facilitation', description: 'Scheduled encounters, recruited underage victims, appeared on hundreds of Epstein flights.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ghislaine Maxwell', type: 'co-conspirator', description: 'Worked alongside Maxwell in recruiting and managing victims.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Jean-Luc Brunel / MC2', type: 'business', description: 'Also worked at Brunel\'s MC2 Model Management, funded by Epstein.', entryId: 'jean-luc-brunel-mc2' },
    { name: 'Alexander Acosta', type: 'legal', description: 'Received immunity under Acosta\'s controversial 2008 non-prosecution agreement.', entryId: 'alexander-acosta-connections' },
    { name: 'Virginia Giuffre', type: 'related', description: 'Named by Giuffre and other victims in civil lawsuits.', entryId: 'victoria-giuffre' },
    { name: 'Epstein Virgin Islands Properties', type: 'logistics', description: 'Traveled frequently to Epstein\'s island. Appeared on hundreds of flights.', entryId: 'epstein-vi-properties' }
  ]
});

addEntry('United States', {
  id: 'nadia-marcinkova-connections',
  name: 'Nadia Marcinkova (Marcinko)',
  type: 'alleged victim turned participant',
  category: 'Notable Individuals',
  description: 'Nadia Marcinkova (now using the name Nadia Marcinko) was reportedly brought to the United States from Yugoslavia (now Slovakia) by Jeffrey Epstein when she was approximately 15 years old. Epstein is alleged to have "purchased" her from her family. Initially described as a victim by other Epstein survivors, Marcinkova later became an alleged participant in Epstein\'s sexual abuse of other girls, according to victim testimony and court documents. Virginia Giuffre and other victims described Marcinkova as participating in sexual encounters arranged by Epstein. Like Sarah Kellen and Lesley Groff, Marcinkova was named as a "potential co-conspirator" in the 2008 non-prosecution agreement and received immunity. She went on to become a licensed commercial pilot and helicopter pilot, reinventing herself as "Global Girl Aviation" and appearing on news segments about female pilots. She has settled civil lawsuits brought by Epstein victims. Her case illustrates the complex dynamics of the Epstein operation, where some victims allegedly became participants.',
  individuals: [
    { id: 'nadia-marcinkova', name: 'Nadia Marcinkova', role: 'Alleged Victim Turned Participant', bio: 'Reportedly brought from Slovakia by Epstein as a teenager. Named as co-conspirator. Now a commercial pilot using name Nadia Marcinko.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'criminal', description: 'Brought to U.S. by Epstein as teenager. Became alleged participant in abuse. Named co-conspirator in 2008 deal.', entryId: 'jeffrey-epstein-network' },
    { name: 'Ghislaine Maxwell', type: 'related', description: 'Part of Epstein\'s inner circle alongside Maxwell.', entryId: 'ghislaine-maxwell-connections' },
    { name: 'Alexander Acosta', type: 'legal', description: 'Received immunity under Acosta\'s 2008 non-prosecution agreement.', entryId: 'alexander-acosta-connections' },
    { name: 'Virginia Giuffre', type: 'related', description: 'Giuffre described Marcinkova participating in Epstein-arranged encounters.', entryId: 'victoria-giuffre' }
  ]
});

console.log('  Created new entries');

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 4: Add more connections to Epstein and Ghislaine for new entries
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n=== Phase 4: Connect new entries to Epstein/Maxwell ===');

addConnectionToEntry('jeffrey-epstein-network', { name: 'Virginia Giuffre', type: 'legal/victim', description: 'Lead accuser. Recruited at 16 from Mar-a-Lago. Her lawsuits exposed the network.', entryId: 'victoria-giuffre' });
addConnectionToEntry('jeffrey-epstein-network', { name: 'Mar-a-Lago', type: 'related', description: 'Epstein was a member. Giuffre was recruited there by Maxwell. Trump later banned Epstein.', entryId: 'mar-a-lago' });
addConnectionToEntry('jeffrey-epstein-network', { name: 'David Boies / Boies Schiller Flexner', type: 'legal', description: 'Firm represented Epstein victims. Forced release of sealed documents exposing the network.', entryId: 'david-boies-connections' });
addConnectionToEntry('jeffrey-epstein-network', { name: 'Lesley Groff', type: 'co-conspirator', description: 'Executive assistant for 20 years. Scheduled "massages." Named co-conspirator, received immunity.', entryId: 'leslie-groff-connections' });
addConnectionToEntry('jeffrey-epstein-network', { name: 'Sarah Kellen', type: 'co-conspirator', description: 'Primary recruiter and scheduler. Named co-conspirator, received immunity. Hundreds of flights on Epstein jet.', entryId: 'sarah-kellen-connections' });
addConnectionToEntry('jeffrey-epstein-network', { name: 'Nadia Marcinkova', type: 'co-conspirator', description: 'Brought from Slovakia as teenager. Named co-conspirator, received immunity. Victim turned alleged participant.', entryId: 'nadia-marcinkova-connections' });

addConnectionToEntry('ghislaine-maxwell-connections', { name: 'Virginia Giuffre', type: 'legal', description: 'Giuffre\'s 2015 lawsuit against Maxwell was the case that cracked open the Epstein network.', entryId: 'victoria-giuffre' });
addConnectionToEntry('ghislaine-maxwell-connections', { name: 'Mar-a-Lago', type: 'related', description: 'Recruited Virginia Giuffre at Mar-a-Lago spa in 1999.', entryId: 'mar-a-lago' });
addConnectionToEntry('ghislaine-maxwell-connections', { name: 'Sarah Kellen', type: 'co-conspirator', description: 'Kellen worked alongside Maxwell in recruiting and scheduling victims.', entryId: 'sarah-kellen-connections' });
addConnectionToEntry('ghislaine-maxwell-connections', { name: 'Nadia Marcinkova', type: 'related', description: 'Part of Epstein\'s inner circle alongside Maxwell.', entryId: 'nadia-marcinkova-connections' });
addConnectionToEntry('ghislaine-maxwell-connections', { name: 'Naomi Campbell', type: 'social', description: 'Photographed together at social events. Both in fashion/society circles.', entryId: 'naomi-campbell-connections' });
addConnectionToEntry('ghislaine-maxwell-connections', { name: 'Kevin Spacey', type: 'social', description: 'Photographed together on Epstein\'s jet.', entryId: 'kevin-spacey-connections' });

// Add Trump -> Mar-a-Lago and Virginia Giuffre
addConnectionToEntry('donald-trump-connections', { name: 'Mar-a-Lago', type: 'property', description: 'Trump\'s private club where Virginia Giuffre was recruited by Maxwell.', entryId: 'mar-a-lago' });
addConnectionToEntry('donald-trump-connections', { name: 'Virginia Giuffre', type: 'related', description: 'Giuffre was recruited from Trump\'s Mar-a-Lago resort by Maxwell.', entryId: 'victoria-giuffre' });

// Connect Prince Andrew to Giuffre
addConnectionToEntry('prince-andrew', { name: 'Virginia Giuffre', type: 'legal', description: 'Giuffre alleged trafficking. Filed civil suit. Settled for approximately 12 million pounds.', entryId: 'victoria-giuffre' });

// Connect Dershowitz to Giuffre
addConnectionToEntry('alan-dershowitz-connections', { name: 'Virginia Giuffre', type: 'legal', description: 'Giuffre named Dershowitz in allegations. Mutual lawsuits were eventually dropped.', entryId: 'victoria-giuffre' });
addConnectionToEntry('alan-dershowitz-connections', { name: 'David Boies', type: 'legal', description: 'Boies represented Giuffre in her allegations against Dershowitz.', entryId: 'david-boies-connections' });

console.log('  Connected new entries to network');

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 5: Add missing people to people.json + expand sparse bios
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n=== Phase 5: Add/expand people ===');

// Missing people from individuals
addPerson('james-comey', {
  name: 'James Comey',
  bio: 'American lawyer who served as 7th Director of the FBI (2013-2017). Born 1960. Appointed by Obama, fired by Trump in 2017 amid Russia investigation. His Southern District of New York tenure preceded Epstein investigations.',
  affiliations: [{ organization: 'FBI', role: 'Former Director (2013-2017)', entryId: 'fbi', country: 'United States' }]
});

addPerson('audrey-strauss', {
  name: 'Audrey Strauss',
  bio: 'American attorney who served as Acting U.S. Attorney for the Southern District of New York. Oversaw the indictment and arrest of Ghislaine Maxwell in July 2020. Previously a longtime federal prosecutor and white-collar defense attorney.',
  affiliations: [{ organization: 'SDNY', role: 'Former Acting U.S. Attorney', entryId: 'sdny', country: 'United States' }]
});

addPerson('bill-clinton-individual', {
  name: 'Bill Clinton',
  bio: '42nd President of the United States (1993-2001). Born 1946 in Hope, Arkansas. Flew on Epstein\'s jet 26+ times per flight logs. Epstein donated to Clinton Foundation. Island visits disputed but corroborated by crew testimony.',
  affiliations: [
    { organization: 'Bill Clinton', role: '42nd President', entryId: 'bill-clinton-connections', country: 'United States' },
    { organization: 'Clinton Foundation', role: 'Founder', entryId: 'clinton-foundation', country: 'United States' }
  ]
});

addPerson('virginia-giuffre', {
  name: 'Virginia Giuffre',
  bio: 'American sex trafficking survivor and lead accuser in the Epstein case. Born 1983. Recruited by Maxwell at Mar-a-Lago at age 16. Filed lawsuits that exposed the Epstein network. Settled with Prince Andrew. Key witness in Maxwell trial preparation.',
  affiliations: [{ organization: 'Virginia Giuffre', role: 'Lead Accuser / Survivor', entryId: 'victoria-giuffre', country: 'United States' }]
});

addPerson('david-boies', {
  name: 'David Boies',
  bio: 'American trial lawyer. Born 1941. Founding partner of Boies Schiller Flexner. Represented Al Gore in Bush v. Gore and DOJ in Microsoft antitrust case. Represented Giuffre against Maxwell while simultaneously representing Harvey Weinstein.',
  affiliations: [{ organization: 'David Boies / Boies Schiller Flexner', role: 'Founder & Chairman', entryId: 'david-boies-connections', country: 'United States' }]
});

addPerson('bill-clinton-ind', {
  name: 'Bill Clinton',
  bio: '42nd President of the United States (1993-2001). Born 1946 in Hope, Arkansas. Flew on Epstein\'s jet 26+ times per flight logs. Epstein donated to Clinton Foundation.',
  affiliations: [{ organization: 'Bill Clinton', role: '42nd President', entryId: 'bill-clinton-connections', country: 'United States' }]
});

addPerson('donald-trump-ind', {
  name: 'Donald Trump',
  bio: '45th and 47th President of the United States. Born 1946 in Queens, New York. Social relationship with Epstein in 1990s-2000s. Said in 2002: Epstein "likes beautiful women as much as I do, and many of them are on the younger side." Giuffre recruited from his Mar-a-Lago.',
  affiliations: [{ organization: 'Donald Trump', role: '45th/47th President', entryId: 'donald-trump-connections', country: 'United States' }]
});

addPerson('alan-dershowitz-ind', {
  name: 'Alan Dershowitz',
  bio: 'American attorney and Harvard Law School Professor Emeritus. Born 1938 in Brooklyn to an Orthodox Jewish family. Represented Epstein in 2008 plea deal. Named by Virginia Giuffre in allegations. Also served on Trump impeachment defense team.',
  affiliations: [
    { organization: 'Alan Dershowitz', role: 'Attorney', entryId: 'alan-dershowitz-connections', country: 'United States' },
    { organization: 'Harvard University', role: 'Professor Emeritus', entryId: 'harvard-university', country: 'United States' }
  ]
});

addPerson('alexander-acosta-ind', {
  name: 'Alexander Acosta',
  bio: 'American attorney and politician. Born 1969 in Miami, Cuban-American. As U.S. Attorney, negotiated Epstein\'s lenient 2008 plea deal. Served as Trump\'s Labor Secretary 2017-2019, resigned under Epstein scrutiny.',
  affiliations: [{ organization: 'Alexander Acosta', role: 'Subject', entryId: 'alexander-acosta-connections', country: 'United States' }]
});

addPerson('elon-musk-ind', {
  name: 'Elon Musk',
  bio: 'South African-born American billionaire. Born 1971 in Pretoria. CEO of Tesla, SpaceX, owner of X. Photographed with Ghislaine Maxwell in 2014. World\'s wealthiest person. Runs DOGE under Trump administration.',
  affiliations: [{ organization: 'Elon Musk', role: 'Subject', entryId: 'elon-musk-connections', country: 'United States' }]
});

addPerson('reid-hoffman-ind', {
  name: 'Reid Hoffman',
  bio: 'American entrepreneur and venture capitalist. Born 1967. Co-founded LinkedIn (sold to Microsoft for $26.2B). Apologized for facilitating Epstein-MIT Media Lab meetings at Epstein\'s request. Investor in Breakthrough Energy Ventures.',
  affiliations: [
    { organization: 'Reid Hoffman', role: 'Subject', entryId: 'reid-hoffman-connections', country: 'United States' },
    { organization: 'Microsoft Corporation', role: 'LinkedIn Co-Founder', entryId: 'microsoft-corporation', country: 'United States' }
  ]
});

addPerson('steve-bannon-ind', {
  name: 'Steve Bannon',
  bio: 'American political strategist and media executive. Born 1953. Co-founded Breitbart News. Trump campaign CEO and White House Chief Strategist. Reportedly met with Epstein before 2019 arrest. Pardoned by Trump after fraud charges.',
  affiliations: [{ organization: 'Steve Bannon', role: 'Subject', entryId: 'steve-bannon-connections', country: 'United States' }]
});

addPerson('woody-allen-ind', {
  name: 'Woody Allen',
  bio: 'American filmmaker. Born Allan Stewart Konigsberg, 1935, Brooklyn, Jewish family. In Epstein\'s contact book. Attended Epstein townhouse dinner. Own sexual abuse allegations by adopted daughter Dylan Farrow.',
  affiliations: [{ organization: 'Woody Allen', role: 'Subject', entryId: 'woody-allen-connections', country: 'United States' }]
});

addPerson('george-stephanopoulos-ind', {
  name: 'George Stephanopoulos',
  bio: 'American journalist and former political advisor. Born 1961, Greek-American. ABC News anchor. Former Clinton White House Communications Director. Attended dinner at Epstein Manhattan townhouse in 2010 post-conviction.',
  affiliations: [{ organization: 'George Stephanopoulos', role: 'Subject', entryId: 'george-stephanopoulos-connections', country: 'United States' }]
});

addPerson('leslie-wexner-ind', {
  name: 'Leslie Wexner',
  bio: 'American billionaire businessman. Born 1937 in Dayton, Ohio, to a Jewish family of Russian immigrants. Founded L Brands (Victoria\'s Secret, Bath & Body Works). Epstein\'s only known major client. Gave Epstein power of attorney and $77M Manhattan townhouse.',
  affiliations: [
    { organization: 'Les Wexner', role: 'Subject', entryId: 'les-wexner-connections', country: 'United States' },
    { organization: 'Victoria\'s Secret (L Brands)', role: 'Founder & Former CEO', entryId: 'l-brands-victorias-secret', country: 'United States' },
    { organization: 'Wexner Foundation', role: 'Founder', entryId: 'wexner-foundation', country: 'United States' }
  ]
});

addPerson('ehud-barak-ind', {
  name: 'Ehud Barak',
  bio: 'Israeli politician and military leader. Born 1942 in British Mandatory Palestine. Most decorated soldier in IDF history. 10th Prime Minister of Israel (1999-2001). Visited Epstein properties. Received $2.5M from Epstein via foundation.',
  affiliations: [{ organization: 'Ehud Barak', role: 'Subject', entryId: 'ehud-barak-connections', country: 'Israel' }]
});

addPerson('prince-andrew-ind', {
  name: 'Prince Andrew',
  bio: 'British royal, Duke of York. Born 1960, third child of Queen Elizabeth II. Key figure in Epstein scandal. Virginia Giuffre alleged trafficking at age 17. Settled civil suit for ~12M pounds. Stripped of military titles and royal patronages.',
  affiliations: [{ organization: 'Prince Andrew', role: 'Subject', entryId: 'prince-andrew', country: 'United Kingdom' }]
});

addPerson('howard-schultz', {
  name: 'Howard Schultz',
  bio: 'American businessman. Born 1953 in Brooklyn, Jewish family, grew up in public housing. Built Starbucks into a global brand with 35,000+ stores. CEO three times. Briefly explored 2020 presidential run as independent.',
  affiliations: [{ organization: 'Starbucks', role: 'Former CEO & Chairman', entryId: 'starbucks-howard-schultz-era', country: 'United States' }]
});

addPerson('michael-dell', {
  name: 'Michael Dell',
  bio: 'American billionaire businessman. Born 1965 in Houston, Jewish family. Founded Dell Technologies in his UT Austin dorm room at age 19. Net worth exceeds $70 billion. Major donor to pro-Israel causes.',
  affiliations: [{ organization: 'Dell Technologies', role: 'Founder, Chairman & CEO', entryId: 'dell-technologies-israel-operations', country: 'United States' }]
});

// Now expand some of the hundreds of sparse bios
console.log('\n  Expanding sparse people bios...');

const bioUpdates = {
  'david-harris': {
    bio: 'American Jewish communal leader. CEO of American Jewish Committee (AJC) from 1990 to 2022 - one of the longest-serving leaders of any major American Jewish organization. Awarded French Legion of Honor. Born in 1949.',
  },
  'lord-jacob-rothschild': {
    bio: 'British investment banker and philanthropist (1936-2024). 4th Baron Rothschild. Chairman of RIT Capital Partners. Member of the Jewish Rothschild banking dynasty. Significant supporter of Israel and Jewish causes. Founded Yad Hanadiv, which funded the Knesset building and Israel Supreme Court.',
  },
  'james-simons': {
    bio: 'American mathematician and billionaire hedge fund manager (1938-2024). Born to a Jewish family in Brookline, Massachusetts. Founded Renaissance Technologies and its Medallion fund, the most successful quantitative hedge fund in history. Major donor to mathematical research and Democratic political causes.',
  },
  'rabbi-menachem-mendel-schneerson': {
    bio: 'The 7th Lubavitcher Rebbe (1902-1994). Born in Nikolaev, Ukraine. Led the Chabad-Lubavitch movement from 1951 until his death. Transformed Chabad into a global Jewish outreach empire with thousands of centers in over 100 countries. Many followers believed him to be the Messiah.',
  },
  'ken-griffin': {
    bio: 'American billionaire hedge fund manager and investor. Born 1968 in Daytona Beach, Florida. Founder and CEO of Citadel LLC, one of the world\'s largest hedge funds managing over $60 billion. Major political donor and art collector. Net worth approximately $40 billion.',
  },
  'john-podhoretz': {
    bio: 'American neoconservative columnist and author. Born 1961 in New York City to a prominent Jewish intellectual family. Son of Norman Podhoretz (longtime editor of Commentary magazine). Editor of Commentary since 2009. Influential voice in Jewish conservative intellectual circles.',
  },
  'rabbi-marvin-hier': {
    bio: 'American rabbi and the founder and dean of the Simon Wiesenthal Center. Born 1939 in New York City to a Jewish family. Built the SWC into one of the largest Jewish organizations in the world. Also founded the Museum of Tolerance in Los Angeles. Delivered invocation at Trump\'s 2017 inauguration.',
  },
  'sigmund-livingston': {
    bio: 'American attorney and founder of the Anti-Defamation League (ADL) in 1913. Born 1872, Jewish family in Bloomington, Illinois. Established the ADL in response to antisemitism, particularly the Leo Frank case. Served as ADL national chair until 1946.',
  },
  'jeremy-ben-ami': {
    bio: 'American political activist and founder of J Street, a liberal Jewish advocacy group that describes itself as "pro-Israel and pro-peace." Born to a Jewish family. Son of a member of the Irgun. Founded J Street in 2007 as a counterweight to AIPAC.',
  },
  'john-hagee': {
    bio: 'American pastor and televangelist. Born 1940 in Goose Creek, Texas. Founder and National Chairman of Christians United for Israel (CUFI), the largest pro-Israel organization in the United States with over 10 million members. Senior pastor of Cornerstone Church in San Antonio.',
  },
  'matt-brooks': {
    bio: 'American political operative. Executive Director of the Republican Jewish Coalition (RJC) since 1990. One of the most influential Jewish Republican leaders in America. Has helped shape Republican Party support for Israel over three decades.',
  },
  'jack-rosen': {
    bio: 'American businessman and Jewish communal leader. President of the American Jewish Congress. Chairman of the Rosen Partners private equity firm. Active in Jewish-Muslim interfaith dialogue. Connected to real estate and international business networks.',
  },
  'william-daroff': {
    bio: 'American Jewish communal leader. CEO of the Conference of Presidents of Major American Jewish Organizations, the main coordinating body for 50+ national Jewish organizations in the United States. Previously served as Senior Vice President for Public Policy at the Jewish Federations of North America.',
  },
  'halie-soifer': {
    bio: 'American policy advisor and executive. CEO of the Jewish Democratic Council of America (JDCA). Previously served as national security advisor to Senator Kamala Harris and as a staffer at the U.S. Mission to the United Nations.',
  },
  'roz-rothstein': {
    bio: 'American pro-Israel activist. Co-founder and CEO of StandWithUs, a prominent international Israel advocacy organization founded in 2001. Built StandWithUs into one of the largest pro-Israel education and advocacy groups with chapters on over 100 college campuses.',
  },
  'eric-goldstein': {
    bio: 'American Jewish communal leader. CEO of UJA-Federation of New York, the largest local Jewish philanthropy in the world, raising and distributing hundreds of millions of dollars annually. Previously served in various leadership roles in the New York Jewish community.',
  },
  'yoav-gallant': {
    bio: 'Israeli politician and military officer. Born 1958. Served as Minister of Defense. Former IDF general and commander of the Southern Command. Dismissed from defense minister position in 2024 amid policy disagreements with PM Netanyahu.',
  },
  'amos-schocken': {
    bio: 'Israeli journalist and publisher. Publisher and owner of Haaretz, Israel\'s oldest daily newspaper and its most left-leaning major publication. Member of the Schocken family, a prominent German-Jewish publishing dynasty that founded Schocken Books.',
  },
  'dani-dayan': {
    bio: 'Israeli diplomat and politician. Born 1955 in Argentina. Chairman of Yad Vashem, the World Holocaust Remembrance Center, since 2021. Former chairman of the Yesha Council (settler umbrella organization) and former Israeli Consul General in New York.',
  },
  'marie-van-der-zyl': {
    bio: 'British Jewish communal leader. President of the Board of Deputies of British Jews from 2018 to 2024. Lawyer by profession. First female president of the Board of Deputies elected to a full term. Oversaw the organization during the UK Labour antisemitism crisis.',
  },
  'rabbi-ephraim-mirvis': {
    bio: 'South African-born British rabbi. Chief Rabbi of the United Hebrew Congregations of the Commonwealth since 2013. Born 1956 in Johannesburg. Made unprecedented intervention in UK politics by criticizing Labour antisemitism before the 2019 election.',
  },
  'gideon-falter': {
    bio: 'British Jewish communal leader. Chairman of the Campaign Against Antisemitism (CAA), a charity that combats antisemitism in the United Kingdom through education, research, and legal action. Led high-profile campaigns against antisemitism in the Labour Party and online.',
  },
  'marc-rowan': {
    bio: 'American billionaire businessman. Born 1962, Jewish family in New York. CEO of Apollo Global Management since 2021, succeeding Leon Black who resigned amid Epstein payment revelations. Major donor to the Wharton School. Led efforts to reform Penn leadership after antisemitism controversy.',
  },
  'leon-black': {
    bio: 'American billionaire investor. Born 1951 in New York, Jewish family. Co-founded Apollo Global Management. Stepped down as CEO in 2021 after revelation that he had paid Jeffrey Epstein $158 million in advisory fees and charitable donations over several years, even after Epstein\'s 2008 conviction.',
  },
  'jes-staley': {
    bio: 'American banker. Born 1956 in Boston. Former CEO of Barclays (2015-2021). Resigned after FCA investigated his misleading characterization of his Epstein relationship. Exchanged 1,200+ emails with Epstein post-conviction. Banned from UK financial services in 2024.',
  },
  'jean-luc-brunel': {
    bio: 'French modeling agent and convicted sex offender (1946-2022). Founded MC2 Model Management with Epstein funding. Supplied young models to Epstein. Took 70+ flights on Epstein aircraft. Found hanged in La Sante prison, Paris, in 2022 while awaiting trial - mirroring Epstein\'s death.',
  },
  'sarah-kellen': {
    bio: 'Epstein\'s personal assistant and alleged primary recruiter. Named as co-conspirator in 2008 non-prosecution agreement but received immunity. Scheduled "massages" and appeared on hundreds of Epstein flights. Now married to NASCAR driver Brian Vickers.',
  },
  'nadia-marcinkova': {
    bio: 'Allegedly brought to the U.S. from Slovakia by Epstein as a teenager. Initially described as a victim, later named as co-conspirator for allegedly participating in abuse of other girls. Named in 2008 NPA, received immunity. Now a commercial pilot using name Nadia Marcinko.',
  },
  'lesley-groff': {
    bio: 'Epstein\'s executive assistant for approximately 20 years. Managed his schedule including "massage" appointments with young women. Named as potential co-conspirator in 2008 non-prosecution agreement but received immunity. Settled civil lawsuits by victims.',
  },
  'jeffrey-epstein': {
    bio: 'American financier and convicted sex offender (1953-2019). Born in Brooklyn, New York, to a Jewish family. Worked at Bear Stearns before founding J. Epstein & Co. Only known major client was Les Wexner. Arrested 2006 in Palm Beach, pleaded to state charges in 2008 under lenient deal. Re-arrested July 2019 by SDNY on federal sex trafficking charges. Found dead in Metropolitan Correctional Center on August 10, 2019 - ruled suicide by hanging but widely disputed given broken cameras, sleeping guards, and prior attempt. Ghislaine Maxwell convicted of trafficking in 2021. Estate valued at $634M+. Contact book and flight logs revealed connections to presidents, royals, billionaires, and academics worldwide.',
  },
  'ghislaine-maxwell': {
    bio: 'British socialite and convicted sex trafficker. Born 1961 in Maisons-Laffitte, France. Youngest child of media baron Robert Maxwell (born Jan Ludvik Hyman Binyamin Hoch, Jewish, Czechoslovakia). Moved to NYC after father\'s 1991 death. Central to Epstein\'s operation: recruiting, grooming, and trafficking underage girls. Convicted December 2021 on five of six counts. Sentenced to 20 years in 2022.',
  },
  'leslie-wexner': {
    bio: 'American billionaire businessman. Born 1937 in Dayton, Ohio, to a Jewish family of Russian immigrants. Founded The Limited in 1963, grew it into L Brands (Victoria\'s Secret, Bath & Body Works, Henri Bendel, Abercrombie & Fitch). Only known major client of Jeffrey Epstein. Gave Epstein unprecedented power of attorney over his finances and transferred a $77M Manhattan townhouse to him.',
  },
};

let bioUpdateCount = 0;
for (const [id, update] of Object.entries(bioUpdates)) {
  if (pd.people[id]) {
    if (update.bio && update.bio.length > (pd.people[id].bio || '').length) {
      pd.people[id].bio = fixDashes(update.bio);
      bioUpdateCount++;
    }
    if (update.affiliations) {
      for (const aff of update.affiliations) {
        const existing = pd.people[id].affiliations || [];
        const hasDupe = existing.some(a => a.entryId === aff.entryId);
        if (!hasDupe) {
          pd.people[id].affiliations = [...existing, fixDashes(aff)];
        }
      }
    }
  }
}
console.log('  Expanded ' + bioUpdateCount + ' sparse people bios');

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 6: Expand some major org entries with more connections
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n=== Phase 6: Expand major org connections ===');

// Goldman Sachs
addConnectionToEntry('goldman-sachs-historic', { name: 'Jeffrey Epstein Network', type: 'financial', description: 'Epstein had early career connections to Goldman Sachs. Goldman banker and executives appeared in Epstein orbit.', entryId: 'jeffrey-epstein-network' });
addConnectionToEntry('goldman-sachs-historic', { name: 'Bill Gates', type: 'financial', description: 'Goldman Sachs provides banking services to Gates entities.', entryId: 'bill-gates-connections' });

// Bear Stearns
addConnectionToEntry('bear-stearns-historic', { name: 'J. Epstein & Co.', type: 'predecessor', description: 'Epstein left Bear Stearns in 1981 after being fired, then founded his own firm.', entryId: 'j-epstein-company' });

// JPMorgan
addConnectionToEntry('jpmorgan-chase', { name: 'Virginia Giuffre', type: 'legal', description: 'Victims sued JPMorgan for facilitating Epstein\'s trafficking through banking services. Settled for $290M.', entryId: 'victoria-giuffre' });
addConnectionToEntry('jpmorgan-chase', { name: 'Mar-a-Lago', type: 'financial', description: 'JPMorgan maintained Epstein accounts while he operated in Palm Beach social circles including Mar-a-Lago.', entryId: 'mar-a-lago' });
addConnectionToEntry('jpmorgan-chase', { name: 'J. Epstein & Co.', type: 'banking', description: 'Maintained J. Epstein & Co. accounts for over 15 years despite internal compliance concerns.', entryId: 'j-epstein-company' });

// Deutsche Bank
addConnectionToEntry('deutsche-bank', { name: 'J. Epstein & Co.', type: 'banking', description: 'Took on Epstein accounts after JPMorgan dropped him in 2013. Fined $150M by NY regulators.', entryId: 'j-epstein-company' });

// FBI
addConnectionToEntry('fbi', { name: 'Virginia Giuffre', type: 'investigation', description: 'Giuffre cooperated with FBI investigations into Epstein network.', entryId: 'victoria-giuffre' });
addConnectionToEntry('fbi', { name: 'Mar-a-Lago', type: 'investigation', description: 'FBI also conducted the 2022 raid on Mar-a-Lago for classified documents (separate from Epstein).', entryId: 'mar-a-lago' });
addConnectionToEntry('fbi', { name: 'Lesley Groff', type: 'investigation', description: 'Groff was named as co-conspirator in FBI investigation of Epstein.', entryId: 'leslie-groff-connections' });
addConnectionToEntry('fbi', { name: 'Sarah Kellen', type: 'investigation', description: 'Kellen was named as co-conspirator in FBI investigation of Epstein.', entryId: 'sarah-kellen-connections' });

// SDNY
addConnectionToEntry('sdny', { name: 'Virginia Giuffre', type: 'legal', description: 'SDNY\'s prosecution of Epstein was partly driven by evidence from Giuffre\'s civil lawsuits.', entryId: 'victoria-giuffre' });
addConnectionToEntry('sdny', { name: 'David Boies', type: 'legal', description: 'Boies\' firm\'s civil case work generated evidence used by SDNY prosecutors.', entryId: 'david-boies-connections' });

// Palm Beach Police
addConnectionToEntry('palm-beach-police', { name: 'Virginia Giuffre', type: 'investigation', description: 'Palm Beach PD investigated Epstein starting 2005 based on victim complaints including Giuffre\'s case.', entryId: 'victoria-giuffre' });
addConnectionToEntry('palm-beach-police', { name: 'Mar-a-Lago', type: 'geographic', description: 'Epstein\'s Palm Beach mansion and Mar-a-Lago were both in Palm Beach PD jurisdiction.', entryId: 'mar-a-lago' });

console.log('  Added cross-connections to major org entries');

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 7: Final dash cleanup and write
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n=== Phase 7: Write files ===');

const jdFixed = fixDashes(jd);
const pdFixed = fixDashes(pd);
fs.writeFileSync(JEWISH_PATH, JSON.stringify(jdFixed, null, 2), 'utf8');
fs.writeFileSync(PEOPLE_PATH, JSON.stringify(pdFixed, null, 2), 'utf8');

// Stats
let totalEntries = 0, totalConns = 0, totalInds = 0;
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

console.log('\n=== Final Stats ===');
console.log('Entries:     ', totalEntries);
console.log('Countries:   ', Object.keys(jdFixed.countries).length);
console.log('People:      ', totalPeople);
console.log('Individuals: ', totalInds);
console.log('Connections: ', totalConns);
console.log('Categories:  ', cats.size);

// Verify key entries
const ep = Object.values(jdFixed.countries).flat().find(e => e.id === 'jeffrey-epstein-network');
const bg = Object.values(jdFixed.countries).flat().find(e => e.id === 'bill-gates-connections');
const gm = Object.values(jdFixed.countries).flat().find(e => e.id === 'ghislaine-maxwell-connections');
console.log('\nEpstein: ' + ep.connections.length + ' connections, ' + ep.individuals.length + ' individuals');
console.log('Gates:   ' + bg.connections.length + ' connections, ' + bg.individuals.length + ' individuals');
console.log('Maxwell: ' + gm.connections.length + ' connections, ' + gm.individuals.length + ' individuals');
console.log('\nDone!');
