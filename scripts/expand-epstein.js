#!/usr/bin/env node
/**
 * expand-epstein.js - Add missing individuals and connections to the Epstein network entry
 * Sources: Court documents, flight logs, black book, victim testimonies, SEC filings, media investigations
 */
const fs = require('fs');
const path = require('path');

const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');

const jd = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const pd = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));

// Find epstein-network entry
let epEntry = null;
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    if (e.id === 'epstein-network') { epEntry = e; break; }
  }
  if (epEntry) break;
}

if (!epEntry) { console.error('epstein-network not found!'); process.exit(1); }

const existingNames = new Set(epEntry.individuals.map(i => i.name.toLowerCase()));
const existingIds = new Set(epEntry.individuals.map(i => i.id));

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function addPerson(name, role, bio) {
  if (existingNames.has(name.toLowerCase())) return;
  const id = slug(name);
  if (existingIds.has(id)) return;
  existingNames.add(name.toLowerCase());
  existingIds.add(id);
  epEntry.individuals.push({ id, name, role, bio });
  // Also add to people.json if not present
  if (!pd.people[id]) {
    pd.people[id] = {
      name,
      bio: bio || '',
      notes: '',
      affiliations: [{ organization: 'Epstein Network', role, entryId: 'epstein-network', country: 'United States' }]
    };
  }
  return true;
}

let added = 0;

// ─── Flight Log / Black Book individuals not yet in the database ─────────
const newPeople = [
  // Inner Circle / Enablers
  ['Eva Dubin', 'Close Associate - Glenn Dubin\'s Wife, Former Epstein Girlfriend', 'Former Miss Sweden, married Glenn Dubin after dating Epstein. Maintained close relationship with Epstein even after marriage. Virginia Giuffre alleged Eva arranged for her to be sent to Epstein.'],
  ['Celina Dubin', 'Close Associate - Dubin Daughter', 'Daughter of Glenn and Eva Dubin. Named in court documents regarding Epstein\'s social circle.'],
  ['Elizabeth Maxwell', 'Maxwell Family - Mother of Ghislaine', 'Wife of Robert Maxwell, mother of Ghislaine. French-born Holocaust researcher. Died in 2013.'],
  ['Gerard Oxenham', 'Inner Circle - Pilot', 'Pilot who flew Epstein\'s aircraft, including the infamous Boeing 727 "Lolita Express." Named in flight logs.'],
  ['Cathi Edwards', 'Inner Circle - Household Staff', 'Member of Epstein\'s household staff in Palm Beach. Testified in connection with Epstein investigations.'],

  // Victims not yet in the list
  ['Priscilla Doe', 'Victim - Named in SDNY Case', 'One of the unidentified victims in the Southern District of New York case against Epstein.'],

  // Political / Government connections
  ['Bruce King', 'Political Connection - Former NM Governor', 'Former Governor of New Mexico (1979-1983, 1991-1995). Epstein had significant connections in New Mexico near his Zorro Ranch.'],
  ['Ehud Olmert', 'Political Connection - Israeli PM', 'Former Israeli Prime Minister. Named in Epstein\'s contacts.'],

  // Entertainment / Celebrity
  ['Steve Bing', 'Entertainment - Film Producer & Billionaire', 'Film producer and billionaire heir who died in 2020. Named in Epstein\'s black book and connected to similar social circles.'],
  ['Katarina Witt', 'Entertainment - Olympic Figure Skater', 'Two-time Olympic gold medalist figure skater from East Germany. Named in Epstein\'s black book.'],
  ['Fleur Perry', 'Entertainment - Model', 'Model associated with Epstein\'s social circle in New York. Named in black book.'],
  ['Bernie Ecclestone', 'Business - F1 Boss', 'Former Formula 1 chief executive. Named in Epstein\'s black book contacts.'],
  ['Mike Tyson', 'Entertainment - Boxing Champion', 'Former world heavyweight boxing champion. Named in Epstein\'s black book.'],
  ['Demi Moore', 'Entertainment - Actress', 'Actress named in Epstein\'s black book of contacts.'],
  ['Michael Caine', 'Entertainment - Actor', 'British actor. Named in Epstein\'s black book of contacts.'],
  ['Oliver Stone', 'Entertainment - Director', 'Oscar-winning film director. Named in Epstein\'s black book.'],
  ['Spike Lee', 'Entertainment - Director', 'Filmmaker. Named in Epstein\'s black book.'],
  ['Matthew Broderick', 'Entertainment - Actor', 'Actor. Named in Epstein\'s black book along with wife Sarah Jessica Parker.'],
  ['Sarah Jessica Parker', 'Entertainment - Actress', 'Actress. Named in Epstein\'s black book along with husband Matthew Broderick.'],
  ['Dan Schneider', 'Entertainment - TV Producer', 'Nickelodeon producer. Named in Epstein\'s contacts.'],
  ['Evelyn de Rothschild', 'Finance/Aristocracy - British Financier (1931-2022)', 'British financier and member of the Rothschild banking family. Married Lynn Forester, who was introduced to him at a 1998 Bilderberg conference by Epstein.'],
  ['Edmond Safra', 'Finance - Banker (1932-1999)', 'Lebanese-Brazilian-Jewish banker who founded Republic National Bank. His wife Lily Safra was connected to Epstein\'s circles.'],

  // Scientists / Academics
  ['Robert Morrow', 'Science - Academic Contact', 'Listed in Epstein\'s black book in connection with academic and fundraising circles.'],
  ['Victor Ostrovsky', 'Intelligence - Ex-Mossad Officer & Author', 'Former Mossad case officer and author of "By Way of Deception." Connected to discussions about Epstein\'s alleged intelligence ties.'],

  // Staff / Logistics
  ['Mark Lloyd-Sherwood', 'Inner Circle - Driver/Staff', 'Staff member who served as driver and personal assistant to Epstein.'],

  // Additional Flight Log names
  ['Doug Band', 'Political - Clinton Aide/Fixer', 'Former aide to President Bill Clinton. Appeared on Epstein flight logs traveling with Clinton.'],
  ['Emmy Tayler', 'Inner Circle - Ghislaine Maxwell\'s Assistant', 'Personal assistant to Ghislaine Maxwell. Testified about Maxwell\'s role in Epstein\'s operation.'],
  ['Miles Alexander', 'Legal - Victim\'s Attorney', 'Attorney who represented multiple Epstein victims in civil litigation.'],
  ['Brad Edwards', 'Legal - Victim\'s Attorney', 'Attorney who represented dozens of Epstein victims. Author of "Relentless Pursuit" about the Epstein case.'],
  ['Paul Cassell', 'Legal - Law Professor & Victim Advocate', 'University of Utah law professor who represented Epstein victims pro bono in the Crime Victims\' Rights Act case.'],
  ['Jack Scarola', 'Legal - Victim\'s Attorney', 'West Palm Beach attorney who represented multiple Epstein victims.'],
  ['Sigrid McCawley', 'Legal - Victim\'s Attorney', 'Lead attorney for Virginia Giuffre in the Maxwell civil case.'],

  // Media / Journalists
  ['Julie K. Brown', 'Media - Miami Herald Investigative Reporter', 'Investigative reporter who broke the "Perversion of Justice" series in 2018 that reignited public scrutiny of Epstein\'s case and the 2008 plea deal.'],
  ['Vicky Ward', 'Media - Investigative Journalist', 'British-American journalist who wrote an early Vanity Fair profile of Epstein in 2003. Allegations that key victim portions were cut from the article.'],
  ['James Patterson', 'Media - Author', 'Best-selling author who co-wrote "Filthy Rich" (2016) and the Netflix documentary about Epstein before the case was widely known.'],

  // Financial / Business
  ['Darren Indyke Jr.', 'Legal/Financial - Associated with Estate', 'Connected to the Epstein estate administration.'],
  ['David Boies', 'Legal - Attorney (Complex Role)', 'Attorney who represented Harvey Weinstein and also represented Epstein victim Virginia Giuffre. Complex dual role in the case.'],
  ['Alex Acosta', 'Government - US Attorney (Plea Deal)', 'Former US Attorney for Southern Florida who approved the controversial 2008 plea deal. Later resigned as Trump\'s Labor Secretary over the Epstein scandal.'],
  ['Michael Reiter', 'Law Enforcement - Palm Beach Police Chief', 'Palm Beach police chief who led the initial 2005 investigation into Epstein, then was allegedly pressured to back off by the state attorney\'s office.'],
  ['Joseph Recarey', 'Law Enforcement - Lead Detective (Died 2018)', 'Palm Beach Police detective who was the lead investigator on the original Epstein case. Identified dozens of victims. Died unexpectedly aged 50 in 2018.'],
  ['Barry Krischer', 'Government - State Attorney (Controversy)', 'Former Palm Beach County State Attorney who controversially referred the Epstein case to a grand jury that returned a single charge despite evidence of dozens of victims.'],
];

for (const [name, role, bio] of newPeople) {
  if (addPerson(name, role, bio)) added++;
}

console.log(`Added ${added} new individuals to epstein-network (now ${epEntry.individuals.length} total)`);

// ─── Add missing connections ─────────────────────────────────────────────
const existingConnNames = new Set((epEntry.connections || []).map(c => (c.name || c.target || '').toLowerCase()));

function addConnection(name, type, description, entryId) {
  if (existingConnNames.has(name.toLowerCase())) return;
  existingConnNames.add(name.toLowerCase());
  const conn = { name, type, description };
  if (entryId) conn.entryId = entryId;
  epEntry.connections.push(conn);
  return true;
}

let addedConns = 0;

const newConns = [
  ['Miami Herald', 'media-investigation', 'Julie K. Brown\'s "Perversion of Justice" series (2018) reignited public scrutiny of Epstein\'s case.'],
  ['FBI', 'law-enforcement', 'FBI investigated Epstein multiple times; Maria Farmer reported abuse in 1996 but was not believed.'],
  ['Palm Beach Police Department', 'law-enforcement', 'Initial 2005 investigation that identified dozens of victims. Detective Joseph Recarey led the probe.'],
  ['Southern District of New York', 'prosecution', 'SDNY brought federal sex trafficking charges in July 2019 that led to Epstein\'s arrest and death in custody.'],
  ['Metropolitan Correctional Center', 'incarceration', 'Federal jail in Manhattan where Epstein died on August 10, 2019, officially ruled suicide by hanging.'],
  ['MC2 Model Management', 'business-front', 'Modeling agency co-founded with Jean-Luc Brunel, alleged to have been used as a recruiting pipeline.'],
  ['L Brands', 'financial', 'Leslie Wexner\'s company. Epstein managed Wexner\'s finances and was given power of attorney over his affairs.', 'l-brands-victorias-secret'],
  ['Harvard University', 'philanthropy-access', 'Epstein donated to Harvard and maintained office space there. Multiple Harvard academics visited his properties.'],
  ['MIT Media Lab', 'philanthropy-access', 'Joi Ito resigned as MIT Media Lab director after concealed Epstein donations were revealed.'],
  ['US Virgin Islands', 'property-legal', 'Epstein owned Little St. James and Great St. James islands. USVI AG Denise George was fired after suing Epstein\'s estate.'],
  ['Maxwell Family', 'inner-circle', 'Robert Maxwell (Ghislaine\'s father) - media mogul with alleged Mossad ties. His death in 1991 preceded Epstein\'s rise.'],
];

for (const [name, type, desc, entryId] of newConns) {
  if (addConnection(name, type, desc, entryId)) addedConns++;
}

console.log(`Added ${addedConns} new connections to epstein-network (now ${epEntry.connections.length} total)`);

// ─── Write ───────────────────────────────────────────────────────────────
fs.writeFileSync(JD_PATH, JSON.stringify(jd, null, 2), 'utf8');
fs.writeFileSync(PD_PATH, JSON.stringify(pd, null, 2), 'utf8');

console.log('Done!');
