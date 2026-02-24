// Massive data expansion: affiliations, individuals, connections, new entries
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'jewish.json');
const peoplePath = path.join(__dirname, '..', 'data', 'people.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function addPerson(id, name, bio) {
  if (!peopleData.people[id]) peopleData.people[id] = { name, bio, notes: '' };
}
function addEntry(country, entry) {
  if (!data.countries[country]) data.countries[country] = [];
  if (data.countries[country].some(e => e.id === entry.id)) return;
  data.countries[country].push(entry);
}
function addIndividualToEntry(entryId, individual) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) {
        if (!entry.individuals) entry.individuals = [];
        if (entry.individuals.some(i => i.id === individual.id)) return;
        entry.individuals.push(individual);
        return;
      }
    }
  }
}
function addConnectionToEntry(entryId, connection) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) {
        if (!entry.connections) entry.connections = [];
        if (entry.connections.some(c => c.name === connection.name && c.type === connection.type)) return;
        entry.connections.push(connection);
        return;
      }
    }
  }
}
function findEntry(name) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.name === name || entry.id === slug(name)) return entry;
    }
  }
  return null;
}

// ============================================================
// PART 1: Build affiliations for ALL people in people.json
// ============================================================
console.log('Part 1: Building affiliations for people.json...');
const affMap = {};
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    for (const ind of (entry.individuals || [])) {
      if (!affMap[ind.id]) affMap[ind.id] = [];
      affMap[ind.id].push({
        organization: entry.name,
        role: ind.role || 'Associated',
        entryId: entry.id,
        country: country
      });
    }
  }
}

let affCount = 0;
for (const pid in peopleData.people) {
  if (!peopleData.people[pid].affiliations) peopleData.people[pid].affiliations = [];
  if (affMap[pid]) {
    for (const aff of affMap[pid]) {
      if (!peopleData.people[pid].affiliations.some(a => a.entryId === aff.entryId)) {
        peopleData.people[pid].affiliations.push(aff);
        affCount++;
      }
    }
  }
}
console.log(`  Added ${affCount} affiliations to people.json`);

// ============================================================
// PART 2: Add individuals to entries that are missing them
// ============================================================
console.log('Part 2: Adding individuals to entries missing them...');

const individualsToAdd = {
  // US entries missing individuals
  'hebrew-union-college-huc': [
    { id: slug('Andrew Rehfeld'), name: 'Andrew Rehfeld', role: 'President', bio: 'President of Hebrew Union College-Jewish Institute of Religion since 2018.' },
    { id: slug('Isaac Mayer Wise'), name: 'Isaac Mayer Wise', role: 'Founder', bio: 'Pioneer of Reform Judaism in America who founded HUC in 1875.' }
  ],
  'the-forward': [
    { id: slug('Jodi Rudoren'), name: 'Jodi Rudoren', role: 'Editor-in-Chief', bio: 'Editor-in-Chief of the Forward since 2019, former NYT Jerusalem bureau chief.' },
    { id: slug('Abraham Cahan'), name: 'Abraham Cahan', role: 'Founder', bio: 'Founding editor of the Jewish Daily Forward in 1897.' }
  ],
  'museum-of-the-jewish-people-at-beit-hatfutsot': [
    { id: slug('Irina Nevzlin'), name: 'Irina Nevzlin', role: 'Chairwoman', bio: 'Chairwoman of the Board of Directors of the Museum of the Jewish People.' },
    { id: slug('Dan Tadmor'), name: 'Dan Tadmor', role: 'CEO', bio: 'CEO of the Museum of the Jewish People at Beit Hatfutsot.' }
  ],
  'maccabi-usa': [
    { id: slug('Harvey Glasser'), name: 'Harvey Glasser', role: 'President', bio: 'Longtime president of Maccabi USA.' }
  ],
  '92nd-street-y': [
    { id: slug('Seth Pinsky'), name: 'Seth Pinsky', role: 'CEO', bio: 'CEO of the 92nd Street Y/92NY since 2020, former NYC Economic Development Corporation president.' },
    { id: slug('Sol Adler'), name: 'Sol Adler', role: 'Founder', bio: 'Founding member of the Young Men\'s Hebrew Association which became the 92nd Street Y.' }
  ],
  'americans-for-peace-now': [
    { id: slug('Hadar Susskind'), name: 'Hadar Susskind', role: 'President & CEO', bio: 'President and CEO of Americans for Peace Now.' }
  ],
  'nbcuniversal': [
    { id: slug('Jeff Shell'), name: 'Jeff Shell', role: 'Former CEO', bio: 'Former CEO of NBCUniversal (2020-2023).' },
    { id: slug('Mark Lazarus'), name: 'Mark Lazarus', role: 'Chairman of NBCUniversal Media Group', bio: 'Chairman of NBCUniversal Media Group overseeing entertainment and streaming.' }
  ],
  'morgan-stanley': [
    { id: slug('James Gorman'), name: 'James Gorman', role: 'Executive Chairman', bio: 'Executive Chairman of Morgan Stanley, served as CEO from 2010-2024.' },
    { id: slug('Ted Pick'), name: 'Ted Pick', role: 'CEO', bio: 'CEO of Morgan Stanley since January 2024.' }
  ],
  'tesla': [
    { id: slug('Elon Musk'), name: 'Elon Musk', role: 'CEO', bio: 'CEO of Tesla and SpaceX, owner of X (formerly Twitter). South African-born entrepreneur and world\'s wealthiest person.' }
  ],
  'rand-corporation': [
    { id: slug('Jason Matheny'), name: 'Jason Matheny', role: 'President & CEO', bio: 'President and CEO of RAND Corporation since 2022. Former founding director of CSET at Georgetown.' }
  ],
  'council-on-foreign-relations-cfr': [
    { id: slug('Michael Froman'), name: 'Michael Froman', role: 'President', bio: 'President of the Council on Foreign Relations since 2023. Former US Trade Representative.' },
    { id: slug('Richard Haass'), name: 'Richard Haass', role: 'President Emeritus', bio: 'President of CFR from 2003-2023. Leading foreign policy voice and author.' }
  ],
  'sullivan-cromwell': [
    { id: slug('Joseph Shenker'), name: 'Joseph Shenker', role: 'Chairman', bio: 'Chairman of Sullivan & Cromwell LLP.' }
  ],
  'kirkland-ellis': [
    { id: slug('Jon Ballis'), name: 'Jon Ballis', role: 'Chairman', bio: 'Chairman of Kirkland & Ellis, one of the world\'s largest law firms by revenue.' }
  ],
  'kraft-heinz-company': [
    { id: slug('Miguel Patricio'), name: 'Miguel Patricio', role: 'CEO', bio: 'CEO of Kraft Heinz Company.' },
    { id: slug('Alexandre Behring'), name: 'Alexandre Behring', role: 'Chairman', bio: 'Chairman of the Board at Kraft Heinz. Managing Partner at 3G Capital.' }
  ],
  'brookfield-properties': [
    { id: slug('Bruce Flatt'), name: 'Bruce Flatt', role: 'CEO of Brookfield', bio: 'CEO of Brookfield Asset Management, parent of Brookfield Properties. Canadian billionaire investor.' }
  ],
  'databricks': [
    { id: slug('Ali Ghodsi'), name: 'Ali Ghodsi', role: 'CEO & Co-Founder', bio: 'Co-founder and CEO of Databricks, the data and AI company valued at over $40 billion.' }
  ]
};

let indAdded = 0;
for (const entryId in individualsToAdd) {
  for (const ind of individualsToAdd[entryId]) {
    addIndividualToEntry(entryId, ind);
    addPerson(ind.id, ind.name, ind.bio);
    indAdded++;
  }
}
console.log(`  Added ${indAdded} individuals to existing entries`);

// ============================================================
// PART 3: Add connections to entries that are missing them
// ============================================================
console.log('Part 3: Adding connections to entries missing them...');

const connectionsToAdd = {
  'hebrew-union-college-huc': [
    { name: 'Reform Judaism', type: 'movement', description: 'HUC is the seminary of the Reform movement in Judaism.' },
    { name: 'Union for Reform Judaism', type: 'denominational body', description: 'HUC trains rabbis and cantors for URJ congregations.' },
    { name: 'Central Conference of American Rabbis', type: 'alumni', description: 'CCAR members are primarily HUC graduates.' }
  ],
  'the-forward': [
    { name: 'American Jewish community', type: 'media', description: 'The Forward has been a leading Jewish American media outlet since 1897.' },
    { name: 'New York City', type: 'headquarters', description: 'Based in New York City, historically on the Lower East Side.' },
    { name: 'Jewish Telegraphic Agency', type: 'media peer', description: 'Both serve as major Jewish news sources in the United States.' }
  ],
  '92nd-street-y': [
    { name: 'New York City', type: 'cultural institution', description: 'A flagship Jewish cultural center in Manhattan since 1874.' },
    { name: 'American Jewish community', type: 'cultural hub', description: 'Major center for Jewish cultural and intellectual life.' },
    { name: 'UJA-Federation of New York', type: 'funding partner', description: 'Supported by UJA-Federation for programming and operations.' }
  ],
  'morgan-stanley': [
    { name: 'Goldman Sachs', type: 'industry peer', description: 'Both are leading Wall Street investment banks.' },
    { name: 'JPMorgan Chase', type: 'industry peer', description: 'Competing global financial institutions.' },
    { name: 'US Securities and Exchange Commission', type: 'regulatory', description: 'Regulated by the SEC as a major financial institution.' }
  ],
  'nbcuniversal': [
    { name: 'Comcast Corporation', type: 'parent company', description: 'NBCUniversal is wholly owned by Comcast Corporation, led by Brian Roberts.' },
    { name: 'DreamWorks', type: 'acquisition', description: 'NBCUniversal acquired DreamWorks Animation in 2016.' },
    { name: 'ViacomCBS', type: 'industry peer', description: 'Competing media conglomerate in entertainment industry.' }
  ],
  'tesla': [
    { name: 'SpaceX', type: 'related company', description: 'Both companies led by Elon Musk.' },
    { name: 'US Department of Energy', type: 'government contracts', description: 'Tesla has received federal subsidies and contracts for clean energy.' }
  ],
  'rand-corporation': [
    { name: 'US Department of Defense', type: 'research partner', description: 'RAND was originally created as a project of the US Air Force and continues defense research.' },
    { name: 'Brookings Institution', type: 'think tank peer', description: 'Both are leading American policy research organizations.' },
    { name: 'Council on Foreign Relations (CFR)', type: 'policy network', description: 'Both organizations influence US foreign and domestic policy.' }
  ],
  'council-on-foreign-relations-cfr': [
    { name: 'Brookings Institution', type: 'think tank peer', description: 'Both are preeminent US policy think tanks.' },
    { name: 'US State Department', type: 'policy influence', description: 'CFR members frequently serve in senior State Department positions.' },
    { name: 'Trilateral Commission', type: 'partner organization', description: 'Both organizations focus on international affairs and bring together policy leaders.' },
    { name: 'Carnegie Endowment for International Peace', type: 'think tank peer', description: 'Fellow leading foreign policy research institution.' }
  ],
  'kirkland-ellis': [
    { name: 'Sullivan & Cromwell', type: 'industry peer', description: 'Both are top-tier global law firms.' },
    { name: 'Private equity industry', type: 'legal services', description: 'Kirkland & Ellis is the dominant law firm for private equity transactions.' }
  ],
  'kraft-heinz-company': [
    { name: '3G Capital', type: 'major shareholder', description: '3G Capital co-owns Kraft Heinz alongside Berkshire Hathaway.' },
    { name: 'Berkshire Hathaway', type: 'major shareholder', description: 'Warren Buffett\'s Berkshire Hathaway is a major shareholder in Kraft Heinz.' }
  ],
  'brookfield-properties': [
    { name: 'Brookfield Asset Management', type: 'parent company', description: 'Brookfield Properties is a subsidiary of Brookfield Asset Management.' },
    { name: 'World Trade Center', type: 'property', description: 'Brookfield Properties owns Brookfield Place adjacent to the World Trade Center.' }
  ],
  'databricks': [
    { name: 'Microsoft', type: 'technology partner', description: 'Databricks integrates deeply with Microsoft Azure cloud services.' },
    { name: 'Amazon Web Services', type: 'technology partner', description: 'Databricks runs on AWS as a primary cloud platform.' }
  ],
  'americans-for-peace-now': [
    { name: 'Shalom Achshav (Peace Now)', type: 'sister organization', description: 'Americans for Peace Now is the American partner of the Israeli Peace Now movement.' },
    { name: 'J Street', type: 'allied organization', description: 'Both organizations advocate for a two-state solution to the Israeli-Palestinian conflict.' },
    { name: 'American Jewish community', type: 'advocacy', description: 'Part of the progressive wing of American Jewish advocacy.' }
  ]
};

let connAdded = 0;
for (const entryId in connectionsToAdd) {
  for (const conn of connectionsToAdd[entryId]) {
    addConnectionToEntry(entryId, conn);
    connAdded++;
  }
}
console.log(`  Added ${connAdded} connections to existing entries`);

// ============================================================
// PART 4: Add major new entries (organizations, agencies, companies)
// ============================================================
console.log('Part 4: Adding new entries...');

const newEntries = [
  // ---- US Government & Intelligence ----
  { country: 'United States', entry: {
    id: 'us-department-of-state-special-envoy-antisemitism',
    name: 'US Special Envoy to Monitor and Combat Antisemitism',
    type: 'Government Office',
    category: 'Government & Diplomacy',
    founded: 2004,
    description: 'Established by the Global Anti-Semitism Review Act of 2004, the Office of the Special Envoy monitors antisemitism worldwide and develops US policies to combat it. Ambassadors have included Deborah Lipstadt (2022-present), Elan Carr (2019-2021), and Ira Forman (2013-2017). Reports directly to the Secretary of State.',
    website: 'https://www.state.gov/bureaus-offices/special-envoy-to-monitor-and-combat-antisemitism/',
    individuals: [
      { id: slug('Deborah Lipstadt'), name: 'Deborah Lipstadt', role: 'Special Envoy (2022-present)', bio: 'Holocaust historian and Emory University professor serving as US Special Envoy to Monitor and Combat Antisemitism. Famous for her courtroom battle against Holocaust denier David Irving.' },
      { id: slug('Elan Carr'), name: 'Elan Carr', role: 'Special Envoy (2019-2021)', bio: 'Former Special Envoy to Monitor and Combat Antisemitism under the Trump administration.' }
    ],
    connections: [
      { name: 'US State Department', type: 'parent agency', description: 'Office within the US Department of State.' },
      { name: 'Anti-Defamation League', type: 'coordination', description: 'Works with ADL on monitoring antisemitic incidents worldwide.' },
      { name: 'International Holocaust Remembrance Alliance', type: 'partnership', description: 'Coordinating on IHRA definition of antisemitism.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'us-holocaust-memorial-museum',
    name: 'United States Holocaust Memorial Museum',
    type: 'Museum & Memorial',
    category: 'Heritage & Memorials',
    founded: 1993,
    description: 'America\'s official memorial to the Holocaust, located on the National Mall in Washington, DC. Established by unanimous Act of Congress in 1980, opened in 1993. Houses one of the world\'s most comprehensive Holocaust collections with over 12,750 artifacts, 49 million pages of documents, and 80,000 historical photographs. Attracts nearly 2 million visitors annually.',
    website: 'https://www.ushmm.org/',
    individuals: [
      { id: slug('Sara Bloomfield'), name: 'Sara Bloomfield', role: 'Director (1999-2023)', bio: 'Director of the United States Holocaust Memorial Museum for over two decades.' },
      { id: slug('Stuart Eizenstat'), name: 'Stuart Eizenstat', role: 'Chair', bio: 'Chairman of the US Holocaust Memorial Council. Former Under Secretary of State and key negotiator for Holocaust restitution.' },
      { id: slug('Elie Wiesel'), name: 'Elie Wiesel', role: 'Founding Chairman', bio: 'Nobel Peace Prize laureate and Holocaust survivor who chaired the Presidential Commission that led to the museum\'s creation.' }
    ],
    connections: [
      { name: 'Yad Vashem', type: 'partner institution', description: 'Close partnership with Israel\'s Holocaust memorial for research and education.' },
      { name: 'US Congress', type: 'chartered by', description: 'Created by unanimous Act of Congress in 1980.' },
      { name: 'Smithsonian Institution', type: 'neighbor institution', description: 'Located on the National Mall near Smithsonian museums.' },
      { name: 'Claims Conference', type: 'restitution partner', description: 'Works alongside Claims Conference on Holocaust documentation and restitution.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'jewish-telegraphic-agency',
    name: 'Jewish Telegraphic Agency (JTA)',
    type: 'News Agency',
    category: 'Entertainment & Media',
    founded: 1917,
    description: 'Founded in 1917, JTA is the international wire service for Jewish news, providing reporting and analysis to Jewish and mainstream media outlets worldwide. Now operates as part of 70 Faces Media alongside My Jewish Learning and other properties. Has bureaus in New York, Washington, Jerusalem, and other world capitals.',
    website: 'https://www.jta.org/',
    individuals: [
      { id: slug('Andrew Silow-Carroll'), name: 'Andrew Silow-Carroll', role: 'Editor-in-Chief', bio: 'Editor-in-Chief of JTA and editorial lead of 70 Faces Media.' }
    ],
    connections: [
      { name: 'The Forward', type: 'media peer', description: 'Both are leading Jewish American news outlets.' },
      { name: 'My Jewish Learning', type: 'sister site', description: 'Part of the 70 Faces Media network.' },
      { name: 'Times of Israel', type: 'media partner', description: 'Shares content and reporting with Times of Israel.' },
      { name: 'American Jewish community', type: 'media service', description: 'Primary wire service for Jewish communal news in North America.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'brookings-institution',
    name: 'Brookings Institution',
    type: 'Think Tank',
    category: 'Research & Think Tanks',
    founded: 1916,
    description: 'The Brookings Institution is one of the oldest and most influential think tanks in the world, conducting research in governance, economics, foreign policy, and society. Its Center for Middle East Policy is a key voice on Israel and the Middle East. Based in Washington, DC.',
    website: 'https://www.brookings.edu/',
    individuals: [
      { id: slug('Suzanne Maloney'), name: 'Suzanne Maloney', role: 'Vice President & Director of Foreign Policy', bio: 'VP and Director of Foreign Policy at Brookings Institution.' },
      { id: slug('Martin Indyk'), name: 'Martin Indyk', role: 'Former Distinguished Fellow', bio: 'Former US Ambassador to Israel and Special Envoy for Israeli-Palestinian Negotiations. Longtime Brookings scholar.' },
      { id: slug('Natan Sachs'), name: 'Natan Sachs', role: 'Director, Center for Middle East Policy', bio: 'Director of the Center for Middle East Policy at Brookings, specializing in Israeli politics.' }
    ],
    connections: [
      { name: 'Council on Foreign Relations (CFR)', type: 'think tank peer', description: 'Both are leading US foreign policy research institutions.' },
      { name: 'RAND Corporation', type: 'think tank peer', description: 'Fellow prominent policy research organizations.' },
      { name: 'US State Department', type: 'policy pipeline', description: 'Brookings scholars frequently serve in government positions.' },
      { name: 'Carnegie Endowment for International Peace', type: 'think tank peer', description: 'Leading DC-based policy research institutions.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'carnegie-endowment-for-international-peace',
    name: 'Carnegie Endowment for International Peace',
    type: 'Think Tank',
    category: 'Research & Think Tanks',
    founded: 1910,
    description: 'One of the world\'s oldest and most respected international affairs think tanks, founded by Andrew Carnegie. Conducts research on global issues including Middle East peace, democracy, and conflict resolution. Has centers in Washington, Beijing, Beirut, Brussels, Moscow, and New Delhi.',
    website: 'https://carnegieendowment.org/',
    individuals: [
      { id: slug('Mariano-Florentino Cuellar'), name: 'Mariano-Florentino Cuellar', role: 'President', bio: 'President of the Carnegie Endowment since 2021. Former California Supreme Court Justice.' },
      { id: slug('Aaron David Miller'), name: 'Aaron David Miller', role: 'Senior Fellow', bio: 'Senior Fellow at Carnegie, former US State Department Middle East adviser and negotiator for six Secretaries of State.' }
    ],
    connections: [
      { name: 'Brookings Institution', type: 'think tank peer', description: 'Both leading DC-based policy research organizations.' },
      { name: 'US State Department', type: 'policy advisory', description: 'Carnegie scholars frequently advise the State Department.' },
      { name: 'Council on Foreign Relations (CFR)', type: 'think tank peer', description: 'Fellow leading foreign policy institution.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'washington-institute-for-near-east-policy',
    name: 'Washington Institute for Near East Policy (WINEP)',
    type: 'Think Tank',
    category: 'Research & Think Tanks',
    founded: 1985,
    description: 'Founded by Martin Indyk in 1985 as a spin-off of AIPAC\'s research department, WINEP is a highly influential think tank focused on US policy toward the Middle East. Known for its pro-Israel orientation and policy prescriptions. Alumni have served in senior positions across multiple presidential administrations.',
    website: 'https://www.washingtoninstitute.org/',
    individuals: [
      { id: slug('Robert Satloff'), name: 'Robert Satloff', role: 'Executive Director', bio: 'Executive Director of the Washington Institute since 1993. Leading analyst on Arab-Israel affairs.' },
      { id: slug('Dennis Ross'), name: 'Dennis Ross', role: 'Counselor & Fellow', bio: 'Former US Special Envoy for Middle East Peace and longtime diplomat. Counselor at the Washington Institute.' }
    ],
    connections: [
      { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'origin', description: 'WINEP was originally created from AIPAC\'s research department.' },
      { name: 'US State Department', type: 'revolving door', description: 'Many WINEP fellows have served in senior State Department roles.' },
      { name: 'Brookings Institution', type: 'think tank peer', description: 'Both focus on Middle East policy research in Washington.' },
      { name: 'Israeli government', type: 'policy bridge', description: 'WINEP serves as a key intellectual bridge between US and Israeli policy establishments.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'jewish-council-for-public-affairs',
    name: 'Jewish Council for Public Affairs (JCPA)',
    type: 'Umbrella Organization',
    category: 'Representative & Umbrella Bodies',
    founded: 1944,
    description: 'The Jewish Council for Public Affairs is the representative voice of the organized American Jewish community on public affairs. Coordinates a network of 16 national agencies and 125 local Jewish community relations councils. Focuses on social justice, Israel advocacy, and interfaith relations.',
    website: 'https://www.jcpa.org/',
    individuals: [
      { id: slug('Amy Spitalnick'), name: 'Amy Spitalnick', role: 'CEO', bio: 'CEO of the Jewish Council for Public Affairs. Former executive director of Integrity First for America.' }
    ],
    connections: [
      { name: 'Conference of Presidents of Major American Jewish Organizations', type: 'partner umbrella', description: 'Both serve as coordinating bodies for American Jewish organizations.' },
      { name: 'Jewish Federations of North America', type: 'community partner', description: 'Works with JFNA on communal policy issues.' },
      { name: 'Anti-Defamation League', type: 'member agency', description: 'ADL is a member agency of the JCPA network.' },
      { name: 'American Jewish Committee (AJC)', type: 'member agency', description: 'AJC participates in the JCPA network.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'claims-conference',
    name: 'Conference on Jewish Material Claims Against Germany (Claims Conference)',
    type: 'Restitution Organization',
    category: 'Advocacy & Public Affairs',
    founded: 1951,
    description: 'The Claims Conference negotiates for compensation and restitution for victims of Nazi persecution and their heirs. Has secured over $90 billion in compensation payments from Germany since 1952. Administers direct payments to Holocaust survivors and funds Holocaust education, documentation, and research worldwide.',
    website: 'https://www.claimscon.org/',
    individuals: [
      { id: slug('Gideon Taylor'), name: 'Gideon Taylor', role: 'President', bio: 'President of the Claims Conference, leading Holocaust restitution negotiations.' },
      { id: slug('Nahum Goldmann'), name: 'Nahum Goldmann', role: 'Founding President', bio: 'Lithuanian-born Jewish leader who co-founded the World Jewish Congress and led initial reparations negotiations with Germany.' }
    ],
    connections: [
      { name: 'German Federal Government', type: 'negotiation partner', description: 'Primary negotiation partner for Holocaust compensation programs.' },
      { name: 'World Jewish Congress', type: 'founding partner', description: 'WJC was instrumental in the creation of the Claims Conference.' },
      { name: 'United States Holocaust Memorial Museum', type: 'funding partner', description: 'Provides funding for Holocaust documentation and education.' },
      { name: 'Yad Vashem', type: 'documentation partner', description: 'Collaborates on Holocaust documentation and survivor identification.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'museum-of-jewish-heritage',
    name: 'Museum of Jewish Heritage - A Living Memorial to the Holocaust',
    type: 'Museum',
    category: 'Heritage & Memorials',
    founded: 1997,
    description: 'Located in Battery Park City, Manhattan, the Museum of Jewish Heritage is New York City\'s principal institution dedicated to educating about Jewish life before, during, and after the Holocaust. Houses over 30,000 artifacts and hosts major exhibitions and educational programs.',
    website: 'https://mjhnyc.org/',
    individuals: [
      { id: slug('Jack Kliger'), name: 'Jack Kliger', role: 'President & CEO', bio: 'President and CEO of the Museum of Jewish Heritage in New York.' }
    ],
    connections: [
      { name: 'United States Holocaust Memorial Museum', type: 'peer institution', description: 'Sister Holocaust memorial institution in the United States.' },
      { name: 'Yad Vashem', type: 'partner', description: 'Partners with Yad Vashem on exhibitions and educational programs.' },
      { name: 'UJA-Federation of New York', type: 'community partner', description: 'Supported by UJA-Federation of New York.' }
    ]
  }},
  // ---- Major Jewish Philanthropic & Advocacy ----
  { country: 'United States', entry: {
    id: 'jewish-national-fund-usa',
    name: 'Jewish National Fund-USA (JNF-USA)',
    type: 'Philanthropic Organization',
    category: 'Philanthropy & Foundations',
    founded: 1901,
    description: 'The American arm of Keren Kayemeth LeIsrael, JNF-USA raises hundreds of millions of dollars annually for land development, water infrastructure, forestry, and community building in Israel. Has planted over 260 million trees and built over 1,000 reservoirs and dams. Annual budget exceeds $300 million.',
    website: 'https://www.jnf.org/',
    individuals: [
      { id: slug('Russell Robinson'), name: 'Russell Robinson', role: 'CEO', bio: 'CEO of JNF-USA, leading the organization\'s fundraising and Israel development initiatives.' }
    ],
    connections: [
      { name: 'Keren Kayemeth LeIsrael', type: 'parent organization', description: 'JNF-USA is the American fundraising arm of the Israeli KKL-JNF.' },
      { name: 'Israeli government', type: 'land development partner', description: 'Works closely with Israeli government on land and water development in the Negev and Galilee.' },
      { name: 'Jewish Federations of North America', type: 'community partner', description: 'Coordinates with JFNA for Israel-related philanthropy.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'zionist-organization-of-america',
    name: 'Zionist Organization of America (ZOA)',
    type: 'Advocacy Organization',
    category: 'Advocacy & Political Organizations',
    founded: 1897,
    description: 'The oldest pro-Israel organization in the United States, founded in 1897. Under Morton Klein\'s leadership since 1993, ZOA has taken strong hawkish positions on Israeli-Palestinian issues. Hosts an annual gala attracting major political figures. Has been influential in opposing the Iran nuclear deal and promoting Israeli settlement rights.',
    website: 'https://www.zoa.org/',
    individuals: [
      { id: slug('Morton Klein'), name: 'Morton Klein', role: 'National President', bio: 'National President of ZOA since 1993, one of the longest-serving Jewish organizational leaders in America. Born in a displaced persons camp in Germany.' }
    ],
    connections: [
      { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'allied advocacy', description: 'Both organizations advocate for pro-Israel US policy, though ZOA takes more hawkish positions.' },
      { name: 'Republican Party', type: 'political alignment', description: 'ZOA has been closely aligned with Republican positions on Israel, particularly under President Trump.' },
      { name: 'Israeli settler movement', type: 'advocacy support', description: 'ZOA has been a strong American advocate for Israeli settlement rights in the West Bank.' },
      { name: 'Conference of Presidents of Major American Jewish Organizations', type: 'member', description: 'ZOA is a member of the Conference of Presidents.' }
    ]
  }},
  // ---- Major US Companies with significant connections ----
  { country: 'United States', entry: {
    id: 'palantir-technologies',
    name: 'Palantir Technologies',
    type: 'Technology Company',
    category: 'Technology',
    founded: 2003,
    description: 'Big data analytics company co-founded by Peter Thiel. Palantir provides data analytics platforms to governments, intelligence agencies, and major corporations. Named after the seeing stones in Lord of the Rings. Works extensively with the CIA, FBI, NSA, and numerous military and intelligence agencies. Has significant contracts with the Israeli Defense Forces.',
    website: 'https://www.palantir.com/',
    individuals: [
      { id: slug('Alex Karp'), name: 'Alex Karp', role: 'CEO & Co-Founder', bio: 'CEO and co-founder of Palantir Technologies. Has a doctorate in philosophy from Goethe University Frankfurt. Known for his unconventional style among tech CEOs.' },
      { id: slug('Peter Thiel'), name: 'Peter Thiel', role: 'Co-Founder & Chairman', bio: 'Billionaire entrepreneur and venture capitalist. Co-founded PayPal, Palantir, and Founders Fund. Early Facebook investor. Libertarian and contrarian thinker.' }
    ],
    connections: [
      { name: 'CIA', type: 'government client', description: 'CIA\'s venture capital arm In-Q-Tel was an early investor in Palantir.' },
      { name: 'Israel Defense Forces', type: 'defense client', description: 'Palantir has contracts with the IDF for intelligence analytics.' },
      { name: 'US Department of Defense', type: 'defense contractor', description: 'Major contracts with the Pentagon for data analytics platforms.' },
      { name: 'PayPal', type: 'founder connection', description: 'Peter Thiel co-founded both PayPal and Palantir - part of the "PayPal Mafia."' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'meta-platforms',
    name: 'Meta Platforms (Facebook)',
    type: 'Technology Company',
    category: 'Technology',
    founded: 2004,
    description: 'Social media and technology conglomerate founded by Mark Zuckerberg. Owns Facebook, Instagram, WhatsApp, and Threads - platforms used by over 3.5 billion people. Also investing heavily in virtual/augmented reality through Quest headsets and the metaverse vision. Headquartered in Menlo Park, California.',
    website: 'https://about.meta.com/',
    individuals: [
      { id: slug('Mark Zuckerberg'), name: 'Mark Zuckerberg', role: 'CEO & Founder', bio: 'Co-founder and CEO of Meta Platforms. One of the world\'s wealthiest individuals. Has pledged to donate 99% of his wealth through the Chan Zuckerberg Initiative.' },
      { id: slug('Sheryl Sandberg'), name: 'Sheryl Sandberg', role: 'Former COO', bio: 'Former COO of Meta/Facebook (2008-2022). Author of "Lean In." Major philanthropist supporting Jewish and women\'s causes.' }
    ],
    connections: [
      { name: 'Chan Zuckerberg Initiative', type: 'philanthropic arm', description: 'Mark Zuckerberg and Priscilla Chan\'s philanthropic organization.' },
      { name: 'Peter Thiel', type: 'early investor', description: 'Peter Thiel was Facebook\'s first outside investor with a $500,000 investment in 2004.' },
      { name: 'Anti-Defamation League', type: 'content policy', description: 'Works with ADL on combating hate speech and antisemitism on its platforms.' },
      { name: 'Israeli tech ecosystem', type: 'R&D presence', description: 'Meta has major R&D operations in Israel.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'alphabet-google',
    name: 'Alphabet (Google)',
    type: 'Technology Company',
    category: 'Technology',
    founded: 1998,
    description: 'Parent company of Google, the world\'s dominant search engine and digital advertising platform. Co-founded by Sergey Brin and Larry Page. Also owns YouTube, Waymo, DeepMind, and other subsidiaries. Google has major R&D operations in Israel and has acquired multiple Israeli startups including Waze for $1.1 billion.',
    website: 'https://abc.xyz/',
    individuals: [
      { id: slug('Sergey Brin'), name: 'Sergey Brin', role: 'Co-Founder & President', bio: 'Co-founder of Google, born in Moscow, Russia. His family emigrated to the US as Jewish refugees from Soviet persecution. One of the world\'s wealthiest people.' },
      { id: slug('Larry Page'), name: 'Larry Page', role: 'Co-Founder', bio: 'Co-founder of Google alongside Sergey Brin. Former CEO of Alphabet.' },
      { id: slug('Ruth Porat'), name: 'Ruth Porat', role: 'President & CIO', bio: 'President and Chief Investment Officer of Alphabet. Born in the UK, raised in the US. Former CFO of Morgan Stanley.' }
    ],
    connections: [
      { name: 'Waze', type: 'acquisition', description: 'Google acquired Israeli-founded navigation app Waze for $1.1 billion in 2013.' },
      { name: 'Israeli tech ecosystem', type: 'R&D & acquisitions', description: 'Google has acquired numerous Israeli companies and runs a major R&D center in Tel Aviv.' },
      { name: 'YouTube', type: 'subsidiary', description: 'YouTube, owned by Alphabet, is the world\'s largest video platform.' },
      { name: 'Stanford University', type: 'founding connection', description: 'Google was founded as a Stanford University research project.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'oracle-corporation',
    name: 'Oracle Corporation',
    type: 'Technology Company',
    category: 'Technology',
    founded: 1977,
    description: 'Enterprise software giant co-founded by Larry Ellison, now one of the world\'s largest technology companies. Provides cloud infrastructure, database software, and enterprise applications. Ellison became the world\'s second-wealthiest person. Oracle has major operations in Israel and has acquired Israeli companies.',
    website: 'https://www.oracle.com/',
    individuals: [
      { id: slug('Larry Ellison'), name: 'Larry Ellison', role: 'Co-Founder & Chairman', bio: 'Co-founder and Chairman of Oracle. Born to a Jewish mother in New York City. One of the world\'s wealthiest people with a net worth exceeding $150 billion. Major donor to Israeli and Jewish causes.' },
      { id: slug('Safra Catz'), name: 'Safra Catz', role: 'CEO', bio: 'CEO of Oracle since 2014. Born in Holon, Israel. One of the highest-paid female executives in the world.' }
    ],
    connections: [
      { name: 'Israeli tech ecosystem', type: 'operations', description: 'Oracle has major R&D centers in Israel and has acquired Israeli companies.' },
      { name: 'Friends of the Israel Defense Forces', type: 'philanthropic', description: 'Larry Ellison is a major donor to FIDF.' },
      { name: 'Microsoft', type: 'industry rival', description: 'Oracle competes with Microsoft in cloud and enterprise software.' },
      { name: 'US Department of Defense', type: 'government contracts', description: 'Oracle holds major contracts with the Pentagon.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'dell-technologies',
    name: 'Dell Technologies',
    type: 'Technology Company',
    category: 'Technology',
    founded: 1984,
    description: 'Major technology company founded by Michael Dell, providing personal computers, servers, data storage, and IT services. One of the world\'s largest technology infrastructure companies. Dell has major operations in Israel through its R&D centers and acquisitions.',
    website: 'https://www.dell.com/',
    individuals: [
      { id: slug('Michael Dell'), name: 'Michael Dell', role: 'Founder & CEO', bio: 'Founder and CEO of Dell Technologies. Jewish American billionaire and major philanthropist through the Michael & Susan Dell Foundation. Significant investor in Israeli technology.' }
    ],
    connections: [
      { name: 'Israeli tech ecosystem', type: 'R&D operations', description: 'Dell has significant R&D operations in Israel.' },
      { name: 'Michael & Susan Dell Foundation', type: 'philanthropic arm', description: 'Foundation focuses on education, health, and community development in the US, India, and Israel.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'blackstone-group',
    name: 'Blackstone Inc.',
    type: 'Private Equity & Asset Management',
    category: 'Investment & Private Equity',
    founded: 1985,
    description: 'The world\'s largest alternative investment firm with over $1 trillion in assets under management. Co-founded by Stephen Schwarzman and Pete Peterson. Invests across private equity, real estate, hedge fund solutions, and credit. One of Wall Street\'s most powerful firms.',
    website: 'https://www.blackstone.com/',
    individuals: [
      { id: slug('Stephen Schwarzman'), name: 'Stephen Schwarzman', role: 'CEO & Co-Founder', bio: 'Co-founder, Chairman, and CEO of Blackstone. One of the wealthiest and most influential figures in global finance. Major donor to education and Jewish causes.' },
      { id: slug('Jonathan Gray'), name: 'Jonathan Gray', role: 'President & COO', bio: 'President and COO of Blackstone, widely seen as Schwarzman\'s successor. Oversees the firm\'s $300+ billion real estate portfolio.' }
    ],
    connections: [
      { name: 'Goldman Sachs', type: 'financial peer', description: 'Both are leading Wall Street institutions.' },
      { name: 'KKR', type: 'industry peer', description: 'Competing private equity firm.' },
      { name: 'Birthright Israel', type: 'philanthropic', description: 'Stephen Schwarzman is a major supporter of Birthright Israel.' },
      { name: 'Trump Administration', type: 'political connection', description: 'Schwarzman served as chair of Trump\'s Strategic and Policy Forum.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'kkr-co',
    name: 'KKR & Co. Inc.',
    type: 'Private Equity & Investment',
    category: 'Investment & Private Equity',
    founded: 1976,
    description: 'One of the world\'s leading investment firms, co-founded by Henry Kravis and George Roberts. Pioneered the leveraged buyout and manages over $500 billion in assets. Known for the historic $25 billion buyout of RJR Nabisco in 1989, immortalized in "Barbarians at the Gate."',
    website: 'https://www.kkr.com/',
    individuals: [
      { id: slug('Henry Kravis'), name: 'Henry Kravis', role: 'Co-Founder & Co-Executive Chairman', bio: 'Co-founder of KKR and pioneer of the leveraged buyout industry. Major philanthropist and art collector.' },
      { id: slug('George Roberts'), name: 'George Roberts', role: 'Co-Founder & Co-Executive Chairman', bio: 'Co-founder of KKR alongside his cousin Henry Kravis.' },
      { id: slug('Scott Nuttall'), name: 'Scott Nuttall', role: 'Co-CEO', bio: 'Co-CEO of KKR, leading the firm\'s expansion into new asset classes.' }
    ],
    connections: [
      { name: 'Blackstone Inc.', type: 'industry peer', description: 'Competing private equity giants.' },
      { name: 'Goldman Sachs', type: 'financial partner', description: 'KKR alumni and financing partner.' },
      { name: 'Mount Sinai Hospital', type: 'philanthropic', description: 'Henry Kravis is a major donor to Mount Sinai Health System.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'citadel-llc',
    name: 'Citadel LLC',
    type: 'Hedge Fund',
    category: 'Investment & Private Equity',
    founded: 1990,
    description: 'One of the world\'s largest and most successful hedge funds, founded by Ken Griffin. Manages over $60 billion in assets. Also operates Citadel Securities, one of the largest market makers in U.S. equities.',
    website: 'https://www.citadel.com/',
    individuals: [
      { id: slug('Ken Griffin'), name: 'Ken Griffin', role: 'Founder & CEO', bio: 'Founder and CEO of Citadel. One of the wealthiest Americans. Major political donor and philanthropist.' }
    ],
    connections: [
      { name: 'Goldman Sachs', type: 'financial peer', description: 'Both are major players in global financial markets.' },
      { name: 'Blackstone Inc.', type: 'industry peer', description: 'Fellow major alternative investment firm.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'renaissance-technologies',
    name: 'Renaissance Technologies',
    type: 'Hedge Fund',
    category: 'Investment & Private Equity',
    founded: 1982,
    description: 'Groundbreaking quantitative hedge fund founded by mathematician Jim Simons. Its Medallion Fund is widely considered the most successful hedge fund in history, averaging over 60% annual returns before fees. Pioneered the use of mathematical models and algorithms in trading.',
    website: 'https://www.rentec.com/',
    individuals: [
      { id: slug('Jim Simons'), name: 'Jim Simons', role: 'Founder (Deceased)', bio: 'Mathematician and founder of Renaissance Technologies. His Medallion Fund generated the best track record in investing history. Major philanthropist supporting math and science education. Passed away in May 2024.' },
      { id: slug('Peter Brown'), name: 'Peter Brown', role: 'CEO', bio: 'CEO of Renaissance Technologies since 2010.' }
    ],
    connections: [
      { name: 'Stony Brook University', type: 'academic connection', description: 'Jim Simons was chair of the math department at Stony Brook before founding Renaissance.' },
      { name: 'Math for America', type: 'philanthropic creation', description: 'Jim Simons founded Math for America to support mathematics educators.' }
    ]
  }},
  // ---- Israeli Intelligence & Defense ----
  { country: 'Israel', entry: {
    id: 'unit-8200',
    name: 'Unit 8200 (IDF Intelligence Corps)',
    type: 'Military Intelligence Unit',
    category: 'Defense & Security',
    founded: 1952,
    description: 'The IDF\'s elite signals intelligence unit, equivalent to the US NSA or UK GCHQ. Responsible for signals intelligence (SIGINT) and code decryption. Alumni have founded hundreds of cybersecurity and tech startups - Unit 8200 is widely considered the engine of Israel\'s "Startup Nation" tech ecosystem. Notable alumni include founders of Check Point, Waze, NSO Group, and many others.',
    website: '',
    individuals: [
      { id: slug('Yossi Sariel'), name: 'Yossi Sariel', role: 'Former Commander', bio: 'Former commander of Unit 8200 who has spoken publicly about the unit\'s role in Israel\'s tech ecosystem.' },
      { id: slug('Gil Shwed'), name: 'Gil Shwed', role: 'Notable Alumnus', bio: 'Founder and CEO of Check Point Software Technologies, a Unit 8200 alumnus who built the world\'s first commercial firewall.' }
    ],
    connections: [
      { name: 'Check Point Software Technologies', type: 'alumni startup', description: 'Check Point was founded by Unit 8200 alumni.' },
      { name: 'NSA (United States)', type: 'intelligence partner', description: 'Unit 8200 cooperates closely with the US NSA under intelligence-sharing agreements.' },
      { name: 'Israel Defense Forces', type: 'military branch', description: 'Unit 8200 is part of the IDF Intelligence Corps (Aman).' },
      { name: 'Mossad', type: 'intelligence cooperation', description: 'Works alongside Mossad on signals intelligence operations.' },
      { name: 'Israeli tech ecosystem', type: 'talent pipeline', description: 'Unit 8200 alumni have founded hundreds of tech and cybersecurity companies.' }
    ]
  }},
  { country: 'Israel', entry: {
    id: 'nso-group',
    name: 'NSO Group',
    type: 'Cybersecurity & Surveillance',
    category: 'Technology',
    founded: 2010,
    description: 'Israeli technology company that developed the Pegasus spyware, capable of remotely surveilling smartphones. Founded by Unit 8200 alumni. Pegasus has been sold to governments worldwide and has been at the center of international controversies over surveillance of journalists, activists, and government officials.',
    website: 'https://www.nsogroup.com/',
    individuals: [
      { id: slug('Shalev Hulio'), name: 'Shalev Hulio', role: 'Co-Founder & CEO', bio: 'Co-founder and CEO of NSO Group. Unit 8200 veteran who built Pegasus spyware.' },
      { id: slug('Omri Lavie'), name: 'Omri Lavie', role: 'Co-Founder', bio: 'Co-founder of NSO Group alongside Shalev Hulio.' }
    ],
    connections: [
      { name: 'Unit 8200 (IDF Intelligence Corps)', type: 'alumni founders', description: 'NSO Group was founded by Unit 8200 alumni.' },
      { name: 'Israeli Ministry of Defense', type: 'export licenses', description: 'NSO Group\'s Pegasus spyware sales require Israeli Ministry of Defense approval.' },
      { name: 'Saudi Arabia', type: 'controversial client', description: 'Saudi Arabia\'s use of Pegasus - including allegedly against Jamal Khashoggi - generated major controversy.' },
      { name: 'US Commerce Department', type: 'sanctions', description: 'NSO Group was placed on the US Entity List in 2021 for surveillance activities.' }
    ]
  }},
  { country: 'Israel', entry: {
    id: 'israel-innovation-authority',
    name: 'Israel Innovation Authority',
    type: 'Government Agency',
    category: 'Government & Diplomacy',
    founded: 2016,
    description: 'Israeli government agency responsible for the country\'s innovation policy. Successor to the Office of the Chief Scientist. Provides grants, incentives, and programs to support Israeli startups and R&D. Manages over $500 million in annual funding for technological innovation. Key driver of Israel\'s "Startup Nation" brand.',
    website: 'https://innovationisrael.org.il/',
    individuals: [
      { id: slug('Dror Bin'), name: 'Dror Bin', role: 'CEO', bio: 'CEO of the Israel Innovation Authority, overseeing Israel\'s innovation policy and startup support programs.' }
    ],
    connections: [
      { name: 'Israeli tech ecosystem', type: 'government support', description: 'Primary government body supporting Israeli innovation and startups.' },
      { name: 'Israeli Ministry of Economy', type: 'parent ministry', description: 'Operates under the Ministry of Economy and Industry.' },
      { name: 'Unit 8200 (IDF Intelligence Corps)', type: 'talent connection', description: 'Many startups supported by the authority are founded by Unit 8200 alumni.' }
    ]
  }},
  { country: 'Israel', entry: {
    id: 'israel-national-cyber-directorate',
    name: 'Israel National Cyber Directorate (INCD)',
    type: 'Government Agency',
    category: 'Defense & Security',
    founded: 2018,
    description: 'Israel\'s national cybersecurity authority, responsible for defending the country\'s civilian cyberspace and advancing Israel\'s status as a global cyber power. Operates under the Prime Minister\'s Office. Coordinates national cyber defense and sets cybersecurity policy.',
    website: 'https://www.gov.il/en/departments/israel_national_cyber_directorate',
    individuals: [
      { id: slug('Gaby Portnoy'), name: 'Gaby Portnoy', role: 'Director General', bio: 'Director General of the Israel National Cyber Directorate.' }
    ],
    connections: [
      { name: 'Prime Minister\'s Office (Israel)', type: 'parent body', description: 'INCD operates directly under the Prime Minister\'s Office.' },
      { name: 'Unit 8200 (IDF Intelligence Corps)', type: 'personnel pipeline', description: 'Many INCD personnel are Unit 8200 alumni.' },
      { name: 'US Cybersecurity and Infrastructure Security Agency', type: 'international partner', description: 'Cooperates with CISA on cybersecurity matters.' },
      { name: 'Check Point Software Technologies', type: 'industry partner', description: 'Works with Israeli cybersecurity companies on national defense.' }
    ]
  }},
  { country: 'Israel', entry: {
    id: 'knesset',
    name: 'The Knesset (Israeli Parliament)',
    type: 'Legislative Body',
    category: 'Government & Diplomacy',
    founded: 1949,
    description: 'The unicameral national legislature of Israel, consisting of 120 members elected by proportional representation. Located in Jerusalem. The Knesset enacts laws, elects the President and Prime Minister, approves the cabinet, and supervises government operations.',
    website: 'https://www.knesset.gov.il/',
    individuals: [
      { id: slug('Amir Ohana'), name: 'Amir Ohana', role: 'Speaker', bio: 'Speaker of the Knesset. Former Minister of Public Security and Justice.' },
      { id: slug('Benjamin Netanyahu'), name: 'Benjamin Netanyahu', role: 'Prime Minister (Knesset Member)', bio: 'Israel\'s longest-serving Prime Minister. Leader of the Likud party. Has served as PM from 1996-1999, 2009-2021, and 2022-present.' }
    ],
    connections: [
      { name: 'Israeli government', type: 'legislative body', description: 'The Knesset is Israel\'s legislature and approves the government.' },
      { name: 'Israeli Supreme Court', type: 'constitutional', description: 'The Knesset\'s laws are subject to judicial review by the Supreme Court.' },
      { name: 'US Congress', type: 'legislative peer', description: 'The Knesset maintains close ties with the US Congress.' },
      { name: 'World Zionist Organization', type: 'historical foundation', description: 'The Knesset\'s structure was influenced by the WZO\'s democratic governance model.' }
    ]
  }},
  { country: 'Israel', entry: {
    id: 'bank-of-israel',
    name: 'Bank of Israel',
    type: 'Central Bank',
    category: 'Banking & Financial Services',
    founded: 1954,
    description: 'Israel\'s central bank, responsible for monetary policy, banking regulation, and maintaining financial stability. Manages Israel\'s foreign currency reserves and issues the shekel. Has been credited with strong economic management during global crises.',
    website: 'https://www.boi.org.il/',
    individuals: [
      { id: slug('Amir Yaron'), name: 'Amir Yaron', role: 'Governor', bio: 'Governor of the Bank of Israel since 2018. Former professor at the Wharton School.' },
      { id: slug('Stanley Fischer'), name: 'Stanley Fischer', role: 'Former Governor', bio: 'Governor of the Bank of Israel (2005-2013). Later served as Vice Chair of the US Federal Reserve. Born in Zambia, raised in Zimbabwe.' }
    ],
    connections: [
      { name: 'US Federal Reserve', type: 'counterpart', description: 'Close cooperation with the Federal Reserve on monetary policy and financial stability.' },
      { name: 'Israeli government', type: 'monetary authority', description: 'Israel\'s independent monetary authority under law.' },
      { name: 'Bank Leumi', type: 'regulated bank', description: 'Regulates Bank Leumi and other Israeli commercial banks.' },
      { name: 'Bank Hapoalim', type: 'regulated bank', description: 'Regulates Bank Hapoalim, Israel\'s largest bank by assets.' }
    ]
  }},
  // ---- UK ----
  { country: 'United Kingdom', entry: {
    id: 'board-of-deputies-of-british-jews',
    name: 'Board of Deputies of British Jews',
    type: 'Representative Body',
    category: 'Representative & Umbrella Bodies',
    founded: 1760,
    description: 'The oldest and most established Jewish representative body in the UK, tracing its origins to 1760. Represents the Jewish community to government, media, and other faith communities. Comprises over 300 elected deputies representing synagogues, communal organizations, and regions across the UK.',
    website: 'https://www.bod.org.uk/',
    individuals: [
      { id: slug('Phil Rosenberg'), name: 'Phil Rosenberg', role: 'President', bio: 'President of the Board of Deputies of British Jews since 2022.' },
      { id: slug('Michael Wegier'), name: 'Michael Wegier', role: 'Chief Executive', bio: 'Chief Executive of the Board of Deputies of British Jews.' }
    ],
    connections: [
      { name: 'UK Parliament', type: 'government engagement', description: 'Primary interlocutor between the British Jewish community and Parliament.' },
      { name: 'Chief Rabbinate (UK)', type: 'communal partnership', description: 'Works alongside the Chief Rabbi on communal matters.' },
      { name: 'Community Security Trust', type: 'security partner', description: 'Partners with CST on Jewish community security.' },
      { name: 'World Jewish Congress', type: 'international affiliation', description: 'British affiliate of the World Jewish Congress.' }
    ]
  }},
  { country: 'United Kingdom', entry: {
    id: 'community-security-trust',
    name: 'Community Security Trust (CST)',
    type: 'Security Organization',
    category: 'Defense & Security',
    founded: 1994,
    description: 'The principal organization providing security and protecting the British Jewish community from antisemitism and terrorism. Trains and deploys over 3,000 volunteer security guards to protect synagogues, schools, and events. Publishes annual antisemitic incidents reports. Works closely with UK police and intelligence services.',
    website: 'https://cst.org.uk/',
    individuals: [
      { id: slug('Gerald Ronson'), name: 'Gerald Ronson', role: 'Chief Executive Emeritus', bio: 'British billionaire property developer and founding supporter of CST. CEO of Heron International.' },
      { id: slug('Mark Gardner'), name: 'Mark Gardner', role: 'CEO', bio: 'CEO of the Community Security Trust, leading Jewish community security in the UK.' }
    ],
    connections: [
      { name: 'Board of Deputies of British Jews', type: 'communal partner', description: 'Works with the Board of Deputies on community protection.' },
      { name: 'UK Metropolitan Police', type: 'law enforcement partner', description: 'Coordinates closely with UK police on Jewish community security.' },
      { name: 'Anti-Defamation League', type: 'international peer', description: 'Shares antisemitism monitoring data with the ADL.' },
      { name: 'Shin Bet', type: 'security consultation', description: 'Has consulted with Israeli security services on community protection methods.' }
    ]
  }},
  // ---- France ----
  { country: 'France', entry: {
    id: 'crif',
    name: 'CRIF (Representative Council of Jewish Institutions of France)',
    type: 'Representative Body',
    category: 'Representative & Umbrella Bodies',
    founded: 1944,
    description: 'The principal representative body of the French Jewish community, founded during the Resistance in 1944. Represents over 70 Jewish organizations to the French government and public. Hosts an annual dinner attended by French presidents and senior officials, considered one of the most important events on the French political calendar.',
    website: 'https://www.crif.org/',
    individuals: [
      { id: slug('Yonathan Arfi'), name: 'Yonathan Arfi', role: 'President', bio: 'President of CRIF since 2022, representing the French Jewish community.' }
    ],
    connections: [
      { name: 'French government', type: 'official representation', description: 'CRIF is the primary representative body of French Jews to the government.' },
      { name: 'Board of Deputies of British Jews', type: 'European peer', description: 'Fellow national Jewish representative body in Europe.' },
      { name: 'World Jewish Congress', type: 'international affiliation', description: 'French affiliate of the World Jewish Congress.' },
      { name: 'Alliance Israelite Universelle', type: 'communal partner', description: 'Both are major French Jewish institutions.' }
    ]
  }},
  // ---- Germany ----
  { country: 'Germany', entry: {
    id: 'central-council-of-jews-in-germany',
    name: 'Central Council of Jews in Germany (Zentralrat der Juden)',
    type: 'Representative Body',
    category: 'Representative & Umbrella Bodies',
    founded: 1950,
    description: 'The umbrella organization of Jewish communities in Germany, representing approximately 100,000 Jewish community members. Re-established in 1950 after the Holocaust. Has a formal state treaty with the German federal government. Plays a key role in German-Israeli relations and Holocaust remembrance.',
    website: 'https://www.zentralratderjuden.de/',
    individuals: [
      { id: slug('Josef Schuster'), name: 'Josef Schuster', role: 'President', bio: 'President of the Central Council of Jews in Germany since 2014. Physician from Wurzburg.' }
    ],
    connections: [
      { name: 'German Federal Government', type: 'state treaty', description: 'Has a formal state treaty with the German government providing funding and recognition.' },
      { name: 'Claims Conference', type: 'restitution partner', description: 'Works with the Claims Conference on Holocaust compensation issues in Germany.' },
      { name: 'Board of Deputies of British Jews', type: 'European peer', description: 'Fellow national Jewish representative body in Europe.' },
      { name: 'CRIF (France)', type: 'European peer', description: 'Fellow national Jewish representative body in Europe.' }
    ]
  }},
  // ---- Australia ----
  { country: 'Australia', entry: {
    id: 'executive-council-of-australian-jewry',
    name: 'Executive Council of Australian Jewry (ECAJ)',
    type: 'Representative Body',
    category: 'Representative & Umbrella Bodies',
    founded: 1944,
    description: 'The peak representative body of the Australian Jewish community, representing approximately 120,000 Jews. Coordinates communal policy on antisemitism, Israel advocacy, and community relations. Publishes an annual report on antisemitism in Australia.',
    website: 'https://www.ecaj.org.au/',
    individuals: [
      { id: slug('Jillian Segal'), name: 'Jillian Segal', role: 'President', bio: 'President of the Executive Council of Australian Jewry.' }
    ],
    connections: [
      { name: 'Australian government', type: 'community representation', description: 'Primary representative of Australian Jews to the federal government.' },
      { name: 'Board of Deputies of British Jews', type: 'international peer', description: 'Fellow Commonwealth Jewish representative body.' },
      { name: 'World Jewish Congress', type: 'international affiliation', description: 'Australian affiliate of the World Jewish Congress.' }
    ]
  }},
  // ---- Major Philanthropic Foundations ----
  { country: 'United States', entry: {
    id: 'chan-zuckerberg-initiative',
    name: 'Chan Zuckerberg Initiative (CZI)',
    type: 'Philanthropic Organization',
    category: 'Philanthropy & Foundations',
    founded: 2015,
    description: 'Founded by Mark Zuckerberg and Priscilla Chan with a commitment to donate 99% of their Meta shares (worth over $45 billion at time of pledge). Focuses on science, education, and community development. CZI\'s science arm funds cutting-edge biomedical research, including the Human Cell Atlas project.',
    website: 'https://chanzuckerberg.com/',
    individuals: [
      { id: slug('Priscilla Chan'), name: 'Priscilla Chan', role: 'Co-Founder & Co-CEO', bio: 'Co-founder of CZI. Pediatrician and philanthropist. Wife of Mark Zuckerberg.' }
    ],
    connections: [
      { name: 'Meta Platforms (Facebook)', type: 'funding source', description: 'Funded primarily by Zuckerberg\'s Meta shares.' },
      { name: 'Bill & Melinda Gates Foundation', type: 'philanthropic peer', description: 'Both are among the world\'s largest philanthropic organizations.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'paul-singer-elliott-management',
    name: 'Elliott Management Corporation',
    type: 'Hedge Fund & Investment',
    category: 'Investment & Private Equity',
    founded: 1977,
    description: 'One of the world\'s largest and most influential activist hedge funds, founded by Paul Singer. Known for aggressive investment strategies including buying distressed sovereign debt. Manages approximately $60 billion in assets. Paul Singer is one of the largest donors to Republican causes and pro-Israel organizations.',
    website: 'https://www.elliottmgmt.com/',
    individuals: [
      { id: slug('Paul Singer'), name: 'Paul Singer', role: 'Founder & Co-CEO', bio: 'Founder of Elliott Management. One of the most powerful figures in Republican politics and pro-Israel philanthropy. Major donor to Commentary Magazine, Republican Jewish Coalition, and the Manhattan Institute.' }
    ],
    connections: [
      { name: 'Republican Jewish Coalition', type: 'political donor', description: 'Paul Singer is a major donor to the Republican Jewish Coalition.' },
      { name: 'Commentary Magazine', type: 'media support', description: 'Singer is a major funder of Commentary, a leading neoconservative magazine.' },
      { name: 'Birthright Israel', type: 'philanthropic', description: 'Paul Singer is a significant donor to Birthright Israel.' },
      { name: 'Republican Party', type: 'political alignment', description: 'Singer is one of the largest Republican donors in the United States.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'republican-jewish-coalition',
    name: 'Republican Jewish Coalition (RJC)',
    type: 'Political Organization',
    category: 'Advocacy & Political Organizations',
    founded: 1985,
    description: 'The principal Jewish Republican organization in the United States. Promotes Jewish participation in the Republican Party and supports pro-Israel Republican candidates. Hosts major political events attended by presidential candidates and senior Republican officials. Significant fundraising operation for Republican causes.',
    website: 'https://www.rjchq.org/',
    individuals: [
      { id: slug('Matt Brooks'), name: 'Matt Brooks', role: 'Executive Director', bio: 'Executive Director of the Republican Jewish Coalition since 1990, making him the longest-serving Jewish organizational leader in Washington.' },
      { id: slug('Norm Coleman'), name: 'Norm Coleman', role: 'National Chairman', bio: 'National Chairman of RJC. Former US Senator from Minnesota.' }
    ],
    connections: [
      { name: 'Republican Party', type: 'political alignment', description: 'Primary Jewish organization within the Republican Party.' },
      { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'pro-Israel ally', description: 'Both organizations support pro-Israel US policy.' },
      { name: 'Sheldon Adelson', type: 'major donor (historical)', description: 'The late Sheldon Adelson was the RJC\'s most prominent donor and supporter.' },
      { name: 'Zionist Organization of America (ZOA)', type: 'aligned advocacy', description: 'Both take strong pro-Israel positions within conservative politics.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'democratic-majority-for-israel',
    name: 'Democratic Majority for Israel (DMFI)',
    type: 'Political Organization',
    category: 'Advocacy & Political Organizations',
    founded: 2019,
    description: 'Pro-Israel political organization within the Democratic Party, founded by Mark Mellman. Created to counter growing progressive criticism of Israel within the party. Operates a super PAC that spent over $30 million in 2022 elections supporting pro-Israel Democratic candidates.',
    website: 'https://www.demmajority.com/',
    individuals: [
      { id: slug('Mark Mellman'), name: 'Mark Mellman', role: 'Founder & CEO', bio: 'Founder and CEO of Democratic Majority for Israel. Veteran Democratic pollster and political strategist.' }
    ],
    connections: [
      { name: 'Democratic Party', type: 'political alignment', description: 'Works within the Democratic Party to support pro-Israel candidates and policies.' },
      { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'aligned goal', description: 'Both work to maintain bipartisan support for Israel in Congress.' },
      { name: 'Republican Jewish Coalition', type: 'counterpart', description: 'DMFI is the Democratic counterpart to the Republican Jewish Coalition.' },
      { name: 'J Street', type: 'intra-party rival', description: 'DMFI was partly created as a counterweight to J Street\'s progressive positions.' }
    ]
  }},
  // ---- Media ----
  { country: 'United States', entry: {
    id: 'new-york-times-company',
    name: 'The New York Times Company',
    type: 'Media Company',
    category: 'Entertainment & Media',
    founded: 1851,
    description: 'The New York Times is America\'s most influential newspaper and one of the most important media institutions in the world. The Sulzberger-Ochs family has owned and controlled the paper since Adolph Ochs purchased it in 1896. Now the world\'s largest digital news subscription service with over 10 million subscribers.',
    website: 'https://www.nytimes.com/',
    individuals: [
      { id: slug('A.G. Sulzberger'), name: 'A.G. Sulzberger', role: 'Publisher & Chairman', bio: 'Publisher of The New York Times and Chairman of The New York Times Company. Represents the fifth generation of the Ochs-Sulzberger family to lead the paper.' },
      { id: slug('Meredith Kopit Levien'), name: 'Meredith Kopit Levien', role: 'CEO', bio: 'President and CEO of The New York Times Company since 2020.' }
    ],
    connections: [
      { name: 'The Forward', type: 'media peer', description: 'Both are prominent American media outlets with Jewish heritage.' },
      { name: 'Washington Post', type: 'media rival', description: 'Primary US newspaper rival.' },
      { name: 'Wirecutter', type: 'subsidiary', description: 'NYT acquired product review site Wirecutter.' }
    ]
  }},
  // ---- Technology (Israel) ----
  { country: 'Israel', entry: {
    id: 'waze',
    name: 'Waze',
    type: 'Technology Company',
    category: 'Technology',
    founded: 2006,
    description: 'Israeli-founded GPS navigation app that was acquired by Google for $1.1 billion in 2013. Pioneered crowd-sourced traffic data and community-based navigation. One of the most successful exits in Israeli tech history. Continues to operate its R&D center in Israel.',
    website: 'https://www.waze.com/',
    individuals: [
      { id: slug('Uri Levine'), name: 'Uri Levine', role: 'Co-Founder', bio: 'Israeli entrepreneur and co-founder of Waze. Author of "Fall in Love with the Problem, Not the Solution." Serial entrepreneur and startup mentor.' },
      { id: slug('Noam Bardin'), name: 'Noam Bardin', role: 'Former CEO', bio: 'Former CEO of Waze who led the company through its acquisition by Google and subsequent growth.' }
    ],
    connections: [
      { name: 'Alphabet (Google)', type: 'parent company', description: 'Acquired by Google for $1.1 billion in 2013.' },
      { name: 'Israeli tech ecosystem', type: 'iconic exit', description: 'Waze\'s acquisition is one of the landmark deals of the Israeli tech industry.' },
      { name: 'Unit 8200 (IDF Intelligence Corps)', type: 'alumni founders', description: 'Some Waze team members are Unit 8200 alumni.' }
    ]
  }},
  { country: 'Israel', entry: {
    id: 'mobileye',
    name: 'Mobileye',
    type: 'Autonomous Driving Technology',
    category: 'Technology',
    founded: 1999,
    description: 'Israeli company that develops computer vision and machine learning-based advanced driver-assistance systems. Acquired by Intel for $15.3 billion in 2017 - one of the largest Israeli tech acquisitions ever. IPO\'d again in 2022. Its technology is used by over 50 automakers worldwide.',
    website: 'https://www.mobileye.com/',
    individuals: [
      { id: slug('Amnon Shashua'), name: 'Amnon Shashua', role: 'Co-Founder & CEO', bio: 'Co-founder and CEO of Mobileye. Professor of computer science at Hebrew University of Jerusalem. Pioneer in computer vision for autonomous driving.' },
      { id: slug('Ziv Aviram'), name: 'Ziv Aviram', role: 'Co-Founder', bio: 'Co-founder of Mobileye who served as President until 2018.' }
    ],
    connections: [
      { name: 'Intel Corporation', type: 'parent company', description: 'Intel acquired Mobileye for $15.3 billion in 2017.' },
      { name: 'Hebrew University of Jerusalem', type: 'academic origin', description: 'Mobileye\'s technology originated from Amnon Shashua\'s research at Hebrew University.' },
      { name: 'Israeli tech ecosystem', type: 'landmark company', description: 'One of the most valuable companies in Israeli tech history.' }
    ]
  }},
  { country: 'Israel', entry: {
    id: 'ironSource',
    name: 'ironSource (now Unity)',
    type: 'Technology Company',
    category: 'Technology',
    founded: 2010,
    description: 'Israeli ad-tech and app monetization company that merged with Unity Technologies in 2022 for $4.4 billion. Built a leading platform for app developers to monetize and grow their apps. Represented one of Israel\'s largest tech M&A deals.',
    website: 'https://www.is.com/',
    individuals: [
      { id: slug('Tomer Bar-Zeev'), name: 'Tomer Bar-Zeev', role: 'Co-Founder & CEO', bio: 'Co-founder and CEO of ironSource who led the company\'s growth and merger with Unity.' }
    ],
    connections: [
      { name: 'Unity Technologies', type: 'merged with', description: 'ironSource merged with Unity Technologies in 2022.' },
      { name: 'Israeli tech ecosystem', type: 'major exit', description: 'One of Israel\'s largest tech M&A transactions.' }
    ]
  }},
  // ---- Additional Countries ----
  { country: 'Brazil', entry: {
    id: 'confederacao-israelita-do-brasil',
    name: 'Confederacao Israelita do Brasil (CONIB)',
    type: 'Representative Body',
    category: 'Representative & Umbrella Bodies',
    founded: 1951,
    description: 'The umbrella organization of the Brazilian Jewish community, representing approximately 120,000 Jews - the second-largest Jewish community in Latin America. Coordinates communal affairs, combats antisemitism, and advocates for Brazil-Israel relations.',
    website: 'https://www.conib.org.br/',
    individuals: [
      { id: slug('Claudio Lottenberg'), name: 'Claudio Lottenberg', role: 'President', bio: 'President of CONIB and prominent ophthalmologist. Leading voice for the Brazilian Jewish community.' }
    ],
    connections: [
      { name: 'World Jewish Congress', type: 'international affiliation', description: 'Brazilian affiliate of the World Jewish Congress.' },
      { name: 'DAIA (Argentina)', type: 'Latin American peer', description: 'Fellow Latin American Jewish representative body.' },
      { name: 'Brazilian government', type: 'community representation', description: 'Represents Brazilian Jews to the federal government.' }
    ]
  }},
  { country: 'India', entry: {
    id: 'central-jewish-board-of-india',
    name: 'Central Jewish Board of India',
    type: 'Representative Body',
    category: 'Representative & Umbrella Bodies',
    founded: 1968,
    description: 'The representative body of India\'s Jewish community, which numbers approximately 5,000 members across three historic communities: the Bene Israel, Cochini Jews, and Baghdadi Jews. India\'s Jewish communities are notable for their long history without antisemitism.',
    website: '',
    individuals: [
      { id: slug('Solomon Sopher'), name: 'Solomon Sopher', role: 'Former President', bio: 'Former president of the Central Jewish Board of India and leader of the Bombay Jewish community.' }
    ],
    connections: [
      { name: 'Indian government', type: 'community representation', description: 'Represents India\'s Jewish communities to the government.' },
      { name: 'Israeli Embassy in India', type: 'diplomatic connection', description: 'Close ties with the Israeli diplomatic mission in India.' },
      { name: 'Jewish Agency for Israel', type: 'emigration support', description: 'Coordinates with the Jewish Agency on aliyah from India.' }
    ]
  }},
  { country: 'Japan', entry: {
    id: 'jewish-community-of-japan',
    name: 'Jewish Community of Japan (JCJ)',
    type: 'Community Organization',
    category: 'Community & Social Organizations',
    founded: 1953,
    description: 'The Jewish Community of Japan serves approximately 2,000 Jews living in Japan, primarily in Tokyo. Maintains a synagogue, community center, and kosher facilities. The community includes diplomats, businesspeople, and academics. Japan has had a unique historical relationship with Jewish communities, including sheltering Jewish refugees in Kobe during WWII.',
    website: 'https://www.jccjapan.or.jp/',
    individuals: [
      { id: slug('Philip Rosenfeld'), name: 'Philip Rosenfeld', role: 'Community Leader', bio: 'Prominent leader of the Jewish Community of Japan.' }
    ],
    connections: [
      { name: 'Chiune Sugihara Legacy', type: 'historical', description: 'Japan\'s connection to Jewish communities is memorialized through Chiune Sugihara, who saved 6,000 Jewish refugees with transit visas.' },
      { name: 'Israeli Embassy in Japan', type: 'diplomatic support', description: 'Close coordination with the Israeli Embassy in Tokyo.' }
    ]
  }},
  // ---- More US Organizations ----
  { country: 'United States', entry: {
    id: 'friends-of-the-israel-defense-forces',
    name: 'Friends of the Israel Defense Forces (FIDF)',
    type: 'Support Organization',
    category: 'Defense & Security',
    founded: 1981,
    description: 'American non-profit that provides for the wellbeing of soldiers in the Israel Defense Forces. Raises over $200 million annually for IDF welfare programs, scholarships, and support facilities. Hosts an annual gala that is one of the largest fundraising events in the American Jewish community, regularly raising $50-60 million in a single evening.',
    website: 'https://www.fidf.org/',
    individuals: [
      { id: slug('Steven Weil'), name: 'Steven Weil', role: 'National Director & CEO', bio: 'National Director and CEO of FIDF.' }
    ],
    connections: [
      { name: 'Israel Defense Forces', type: 'supported organization', description: 'FIDF\'s sole mission is supporting IDF soldiers and veterans.' },
      { name: 'Miriam Adelson', type: 'major donor', description: 'The Adelson family has been among FIDF\'s largest donors.' },
      { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'pro-Israel ecosystem', description: 'Part of the broader American pro-Israel organizational ecosystem.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'jewish-federations-of-north-america',
    name: 'Jewish Federations of North America (JFNA)',
    type: 'Umbrella Organization',
    category: 'Representative & Umbrella Bodies',
    founded: 1999,
    description: 'The umbrella organization for 146 Jewish federations and over 300 networked communities across North America. Collectively one of the largest charitable systems in the world, raising and distributing over $3 billion annually. Coordinates continental Jewish communal policy, Israel engagement, and emergency campaigns.',
    website: 'https://www.jewishfederations.org/',
    individuals: [
      { id: slug('Eric Fingerhut'), name: 'Eric Fingerhut', role: 'President & CEO', bio: 'President and CEO of the Jewish Federations of North America. Former US Congressman and President of Hillel International.' },
      { id: slug('Mark Wilf'), name: 'Mark Wilf', role: 'Chair of the Board', bio: 'Chair of JFNA\'s Board of Trustees. Owner of the Minnesota Vikings NFL team.' }
    ],
    connections: [
      { name: 'Conference of Presidents of Major American Jewish Organizations', type: 'partner umbrella', description: 'Both serve as coordinating bodies for American Jewish communal life.' },
      { name: 'Jewish Agency for Israel', type: 'major funder', description: 'JFNA is the largest single funder of the Jewish Agency for Israel.' },
      { name: 'American Jewish Joint Distribution Committee', type: 'funding partner', description: 'JFNA provides significant funding to JDC for overseas operations.' },
      { name: 'Birthright Israel', type: 'partner', description: 'JFNA is a major partner in the Birthright Israel program.' },
      { name: 'UJA-Federation of New York', type: 'largest federation', description: 'UJA-Federation of New York is the largest local federation in the network.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'uja-federation-of-new-york',
    name: 'UJA-Federation of New York',
    type: 'Jewish Federation',
    category: 'Philanthropy & Foundations',
    founded: 1917,
    description: 'The largest local philanthropy in the world, raising and distributing over $300 million annually. Supports a network of over 100 nonprofits serving the Jewish community and the broader New York area. Funds everything from social services and education to Israel programs and security.',
    website: 'https://www.ujafedny.org/',
    individuals: [
      { id: slug('Eric Goldstein'), name: 'Eric Goldstein', role: 'CEO', bio: 'CEO of UJA-Federation of New York, leading the world\'s largest local Jewish philanthropy.' }
    ],
    connections: [
      { name: 'Jewish Federations of North America (JFNA)', type: 'member federation', description: 'UJA-Federation is the largest member of the JFNA network.' },
      { name: '92nd Street Y', type: 'funded organization', description: 'Provides funding and support to 92NY.' },
      { name: 'Museum of Jewish Heritage', type: 'funded organization', description: 'Supports the Museum of Jewish Heritage in Manhattan.' },
      { name: 'Jewish Community Relations Council of NY', type: 'subsidiary', description: 'JCRC-NY operates as part of UJA-Federation.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'canary-mission',
    name: 'Canary Mission',
    type: 'Watchdog Organization',
    category: 'Advocacy & Political Organizations',
    founded: 2014,
    description: 'Controversial online database that documents individuals and organizations that it claims promote hatred of the United States, Israel, and Jews. Profiles primarily focus on college students and professors involved in BDS and pro-Palestinian activism. Has been criticized for chilling free speech but praised for monitoring antisemitism on campuses.',
    website: 'https://canarymission.org/',
    individuals: [],
    connections: [
      { name: 'Anti-Defamation League', type: 'anti-hate ecosystem', description: 'Part of the broader ecosystem monitoring antisemitism, though ADL has distanced itself from some of Canary Mission\'s tactics.' },
      { name: 'Students for Justice in Palestine', type: 'monitored group', description: 'SJP chapters are frequently profiled by Canary Mission.' },
      { name: 'BDS Movement', type: 'opposition', description: 'Canary Mission specifically targets BDS activists and supporters.' }
    ]
  }},
  { country: 'United States', entry: {
    id: 'anti-defamation-league-foundation',
    name: 'ADL (Anti-Defamation League)',
    type: 'Anti-Hate Organization',
    category: 'Advocacy & Public Affairs',
    founded: 1913,
    description: 'Founded in 1913 by B\'nai B\'rith, the ADL is the leading anti-hate organization in the United States. Originally focused on combating antisemitism, it has expanded to fight all forms of hate and bigotry. Operates the largest database tracking extremism and hate crimes in the US. Annual budget exceeds $100 million.',
    website: 'https://www.adl.org/',
    individuals: [
      { id: slug('Jonathan Greenblatt'), name: 'Jonathan Greenblatt', role: 'CEO & National Director', bio: 'CEO of ADL since 2015. Former Obama administration official who served as Special Assistant to the President.' },
      { id: slug('Abraham Foxman'), name: 'Abraham Foxman', role: 'Former National Director', bio: 'Led the ADL for 28 years (1987-2015). Holocaust survivor and one of the most prominent American Jewish leaders of his generation.' }
    ],
    connections: [
      { name: 'B\'nai B\'rith', type: 'founding organization', description: 'ADL was founded by B\'nai B\'rith in 1913 to combat antisemitism.' },
      { name: 'FBI', type: 'law enforcement partner', description: 'ADL works with the FBI on hate crime tracking and training.' },
      { name: 'Meta Platforms (Facebook)', type: 'content advisory', description: 'ADL advises social media platforms on hate speech policies.' },
      { name: 'Community Security Trust', type: 'international partner', description: 'Works with CST in the UK on monitoring antisemitism.' },
      { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'pro-Israel alignment', description: 'ADL has advocated for pro-Israel positions alongside AIPAC.' }
    ]
  }}
];

let entriesAdded = 0;
for (const item of newEntries) {
  addEntry(item.country, item.entry);
  // Add all individuals to people.json
  for (const ind of (item.entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
  entriesAdded++;
}
console.log(`  Added ${entriesAdded} new entries`);

// ============================================================
// PART 5: Cross-link more people across organizations
// ============================================================
console.log('Part 5: Cross-linking people across organizations...');

// Add known multi-org individuals to more entries
const crossLinks = [
  // Miriam Adelson - major donor to many orgs
  { entryId: 'friends-of-the-israel-defense-forces', individual: { id: slug('Miriam Adelson'), name: 'Miriam Adelson', role: 'Major Donor', bio: 'Israeli-American physician, billionaire, and one of the most prolific donors to Republican and pro-Israel causes.' }},
  { entryId: 'republican-jewish-coalition', individual: { id: slug('Miriam Adelson'), name: 'Miriam Adelson', role: 'Major Donor', bio: 'Israeli-American physician, billionaire, and one of the most prolific donors to Republican and pro-Israel causes.' }},
  { entryId: 'zionist-organization-of-america', individual: { id: slug('Miriam Adelson'), name: 'Miriam Adelson', role: 'Major Donor', bio: 'Israeli-American physician, billionaire, and one of the most prolific donors to Republican and pro-Israel causes.' }},
  
  // Ronald Lauder - president of WJC, connected to many
  { entryId: 'us-holocaust-memorial-museum', individual: { id: slug('Ronald Lauder'), name: 'Ronald Lauder', role: 'Supporter', bio: 'President of the World Jewish Congress and heir to the Estee Lauder fortune.' }},
  
  // Michael Bloomberg
  { entryId: 'brookings-institution', individual: { id: slug('Michael Bloomberg'), name: 'Michael Bloomberg', role: 'Major Donor', bio: 'Former Mayor of New York City, founder of Bloomberg LP. Major philanthropist.' }},
  
  // Dennis Ross - multiple think tanks
  { entryId: 'brookings-institution', individual: { id: slug('Dennis Ross'), name: 'Dennis Ross', role: 'Former Fellow', bio: 'Former US Special Envoy for Middle East Peace and longtime diplomat.' }},
  
  // Mark Zuckerberg to FIDF/ADL connections
  { entryId: 'chan-zuckerberg-initiative', individual: { id: slug('Mark Zuckerberg'), name: 'Mark Zuckerberg', role: 'Co-Founder', bio: 'Co-founder and CEO of Meta Platforms. One of the world\'s wealthiest individuals.' }},
  
  // Peter Thiel already in palantir, add to more
  { entryId: 'meta-platforms', individual: { id: slug('Peter Thiel'), name: 'Peter Thiel', role: 'Early Investor & Board Member (former)', bio: 'Billionaire entrepreneur. Co-founded PayPal and Palantir. First outside investor in Facebook.' }},
  
  // Martin Indyk 
  { entryId: 'brookings-institution', individual: { id: slug('Martin Indyk'), name: 'Martin Indyk', role: 'Former Distinguished Fellow', bio: 'Former US Ambassador to Israel and founder of WINEP. Served as Special Envoy for Israeli-Palestinian Negotiations.' }},
  
  // Elie Wiesel
  { entryId: 'claims-conference', individual: { id: slug('Elie Wiesel'), name: 'Elie Wiesel', role: 'Honorary Figure', bio: 'Nobel Peace Prize laureate and Holocaust survivor, advocate for Holocaust remembrance worldwide.' }},
  
  // Stanley Fischer
  { entryId: 'brookings-institution', individual: { id: slug('Stanley Fischer'), name: 'Stanley Fischer', role: 'Fellow', bio: 'Former Governor of the Bank of Israel and Vice Chair of the US Federal Reserve.' }},
  
  // Sheryl Sandberg to other orgs
  { entryId: 'anti-defamation-league-foundation', individual: { id: slug('Sheryl Sandberg'), name: 'Sheryl Sandberg', role: 'Board Member', bio: 'Former COO of Meta/Facebook. Author of "Lean In." Major philanthropist.' }},
  
  // Stephen Schwarzman
  { entryId: 'council-on-foreign-relations-cfr', individual: { id: slug('Stephen Schwarzman'), name: 'Stephen Schwarzman', role: 'Board Member', bio: 'CEO of Blackstone. One of the most influential figures in global finance.' }},
  
  // Robert Kraft
  { entryId: 'friends-of-the-israel-defense-forces', individual: { id: slug('Robert Kraft'), name: 'Robert Kraft', role: 'Major Donor', bio: 'Owner of the New England Patriots NFL team and major philanthropist.' }},
  
  // Larry Ellison
  { entryId: 'friends-of-the-israel-defense-forces', individual: { id: slug('Larry Ellison'), name: 'Larry Ellison', role: 'Major Donor', bio: 'Co-founder and Chairman of Oracle Corporation.' }},
  
  // Benjamin Netanyahu - to more entries
  { entryId: 'unit-8200', individual: { id: slug('Benjamin Netanyahu'), name: 'Benjamin Netanyahu', role: 'Commander-in-Chief (as PM)', bio: 'Israel\'s longest-serving Prime Minister.' }},
  
  // Sergey Brin
  { entryId: 'chan-zuckerberg-initiative', individual: { id: slug('Sergey Brin'), name: 'Sergey Brin', role: 'Philanthropic Peer', bio: 'Co-founder of Google. Major philanthropist supporting science and Jewish causes.' }},
  
  // Jonathan Greenblatt
  { entryId: 'anti-defamation-league-foundation', individual: { id: slug('Jonathan Greenblatt'), name: 'Jonathan Greenblatt', role: 'CEO & National Director', bio: 'CEO of ADL since 2015, former Obama administration official.' }},
  
  // Morton Klein
  { entryId: 'conference-of-presidents-of-major-american-jewish-organizations', individual: { id: slug('Morton Klein'), name: 'Morton Klein', role: 'Member Organization Leader', bio: 'National President of ZOA, one of the longest-serving Jewish organizational leaders.' }},
  
  // Amnon Shashua - to Hebrew University
  { entryId: 'hebrew-university-of-jerusalem', individual: { id: slug('Amnon Shashua'), name: 'Amnon Shashua', role: 'Professor', bio: 'Professor of Computer Science at Hebrew University and CEO of Mobileye.' }}
];

let crossLinked = 0;
for (const cl of crossLinks) {
  addIndividualToEntry(cl.entryId, cl.individual);
  addPerson(cl.individual.id, cl.individual.name, cl.individual.bio);
  crossLinked++;
}
console.log(`  Cross-linked ${crossLinked} people to additional organizations`);

// ============================================================
// PART 6: Add more connections between existing entries
// ============================================================
console.log('Part 6: Adding cross-connections between entries...');

const crossConnections = [
  // AIPAC to more organizations
  { entryId: 'aipac-american-israel-public-affairs-committee', connections: [
    { name: 'Washington Institute for Near East Policy (WINEP)', type: 'offspring', description: 'WINEP was founded from AIPAC\'s research department in 1985.' },
    { name: 'Republican Jewish Coalition', type: 'pro-Israel peer', description: 'Both organizations work to maintain pro-Israel policy in Washington.' },
    { name: 'Democratic Majority for Israel', type: 'pro-Israel peer', description: 'DMFI extends pro-Israel advocacy within the Democratic Party.' },
    { name: 'Friends of the Israel Defense Forces (FIDF)', type: 'pro-Israel ecosystem', description: 'Part of the broader American pro-Israel organizational network.' }
  ]},
  // ADL to more
  { entryId: 'anti-defamation-league', connections: [
    { name: 'United States Holocaust Memorial Museum', type: 'educational partner', description: 'ADL and USHMM collaborate on Holocaust education programs.' },
    { name: 'Jewish Council for Public Affairs (JCPA)', type: 'member agency', description: 'ADL participates in the JCPA network.' },
    { name: 'Community Security Trust', type: 'international partner', description: 'Shares antisemitism data with UK\'s CST.' }
  ]},
  // Brookings to WINEP
  { entryId: 'brookings-institution', connections: [
    { name: 'Washington Institute for Near East Policy (WINEP)', type: 'think tank peer', description: 'Both focus on Middle East policy, with different orientations.' }
  ]},
  // Goldman Sachs connections
  { entryId: 'goldman-sachs', connections: [
    { name: 'BlackRock', type: 'alumni connection', description: 'Larry Fink founded BlackRock after leaving First Boston; many BlackRock executives are Goldman alumni.' },
    { name: 'Blackstone Inc.', type: 'financial peer', description: 'Both are premier Wall Street institutions.' },
    { name: 'Morgan Stanley', type: 'industry peer', description: 'Fellow bulge-bracket investment bank.' },
    { name: 'Citadel LLC', type: 'financial peer', description: 'Both are major players in global financial markets.' }
  ]},
  // BlackRock connections
  { entryId: 'blackrock', connections: [
    { name: 'Goldman Sachs', type: 'alumni connection', description: 'Many BlackRock executives have Goldman Sachs backgrounds.' },
    { name: 'Blackstone Inc.', type: 'name peer/different entity', description: 'Despite similar names, BlackRock and Blackstone are separate firms. BlackRock was originally a Blackstone subsidiary.' },
    { name: 'Federal Reserve', type: 'advisory role', description: 'BlackRock has advised the Federal Reserve on asset purchases during financial crises.' }
  ]},
  // Birthright to more
  { entryId: 'birthright-israel', connections: [
    { name: 'Jewish Federations of North America (JFNA)', type: 'major partner', description: 'JFNA is a founding partner and major funder of Birthright Israel.' },
    { name: 'Miriam Adelson', type: 'major donor', description: 'The Adelson family has donated over $400 million to Birthright Israel.' },
    { name: 'Stephen Schwarzman', type: 'major donor', description: 'Blackstone CEO is a significant Birthright donor.' },
    { name: 'Michael Steinhardt', type: 'co-founder', description: 'Hedge fund pioneer who co-founded Birthright Israel alongside Charles Bronfman.' }
  ]},
  // Technion connections
  { entryId: 'technion', connections: [
    { name: 'Unit 8200 (IDF Intelligence Corps)', type: 'talent pipeline', description: 'Many Unit 8200 veterans study at or return to the Technion.' },
    { name: 'Mobileye', type: 'alumni company', description: 'Technion alumni have been central to Mobileye\'s development.' },
    { name: 'Israel Innovation Authority', type: 'research funding', description: 'Receives innovation grants and collaborates on R&D programs.' }
  ]},
  // Mossad connections
  { entryId: 'mossad', connections: [
    { name: 'Unit 8200 (IDF Intelligence Corps)', type: 'intelligence cooperation', description: 'Mossad and Unit 8200 work together on intelligence operations.' },
    { name: 'CIA', type: 'intelligence partner', description: 'Close intelligence sharing relationship between Mossad and CIA.' },
    { name: 'Shin Bet', type: 'domestic counterpart', description: 'Mossad handles foreign intelligence while Shin Bet handles domestic security.' },
    { name: 'NSO Group', type: 'technology connection', description: 'NSO Group\'s Pegasus technology has reportedly been used in conjunction with Israeli intelligence operations.' }
  ]},
  // Shin Bet connections
  { entryId: 'shin-bet', connections: [
    { name: 'Mossad', type: 'intelligence partner', description: 'Shin Bet handles internal security while Mossad handles foreign intelligence.' },
    { name: 'Israel National Cyber Directorate (INCD)', type: 'cyber cooperation', description: 'Cooperates on domestic cybersecurity threats.' },
    { name: 'Unit 8200 (IDF Intelligence Corps)', type: 'intelligence cooperation', description: 'Shares intelligence with military intelligence.' }
  ]},
  // Check Point connections
  { entryId: 'check-point-software', connections: [
    { name: 'Unit 8200 (IDF Intelligence Corps)', type: 'alumni founders', description: 'Check Point was founded by Unit 8200 alumni Gil Shwed.' },
    { name: 'Israel National Cyber Directorate (INCD)', type: 'cybersecurity partner', description: 'Works with INCD on national cyber defense.' },
    { name: 'NSO Group', type: 'cybersecurity ecosystem', description: 'Both are prominent Israeli cybersecurity companies.' }
  ]},
  // Elbit Systems connections
  { entryId: 'elbit-systems', connections: [
    { name: 'Israel Defense Forces', type: 'defense contractor', description: 'Major supplier of defense systems to the IDF.' },
    { name: 'Israel Aerospace Industries', type: 'defense peer', description: 'Fellow major Israeli defense company.' },
    { name: 'Rafael Advanced Defense Systems', type: 'defense peer', description: 'Both are pillars of Israel\'s defense industrial base.' },
    { name: 'US Department of Defense', type: 'international client', description: 'Elbit has significant contracts with the US military.' }
  ]}
];

let crossConnAdded = 0;
for (const cc of crossConnections) {
  for (const conn of cc.connections) {
    addConnectionToEntry(cc.entryId, conn);
    crossConnAdded++;
  }
}
console.log(`  Added ${crossConnAdded} cross-connections between entries`);

// ============================================================
// PART 7: Rebuild ALL affiliations in people.json
// ============================================================
console.log('Part 7: Rebuilding all affiliations in people.json...');

// Clear and rebuild all affiliations from current entry data
const finalAffMap = {};
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    for (const ind of (entry.individuals || [])) {
      if (!finalAffMap[ind.id]) finalAffMap[ind.id] = [];
      finalAffMap[ind.id].push({
        organization: entry.name,
        role: ind.role || 'Associated',
        entryId: entry.id,
        country: country
      });
    }
  }
}

let finalAffCount = 0;
for (const pid in peopleData.people) {
  peopleData.people[pid].affiliations = finalAffMap[pid] || [];
  finalAffCount += peopleData.people[pid].affiliations.length;
}
console.log(`  Total affiliations in people.json: ${finalAffCount}`);

// ============================================================
// SAVE
// ============================================================
console.log('\nSaving files...');
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2), 'utf8');

// Final stats
let totalEntries = 0, totalConns = 0, totalIndivs = 0;
const uniqueInds = new Set();
const cats = new Set();
for (const c in data.countries) {
  for (const e of data.countries[c]) {
    totalEntries++;
    cats.add(e.category);
    totalConns += (e.connections || []).length;
    for (const ind of (e.individuals || [])) {
      totalIndivs++;
      uniqueInds.add(ind.id);
    }
  }
}
console.log(`\n===== FINAL STATS =====`);
console.log(`Countries: ${Object.keys(data.countries).length}`);
console.log(`Entries: ${totalEntries}`);
console.log(`Categories: ${cats.size}`);
console.log(`Total connections: ${totalConns}`);
console.log(`Total individual references: ${totalIndivs}`);
console.log(`Unique individuals in entries: ${uniqueInds.size}`);
console.log(`People in people.json: ${Object.keys(peopleData.people).length}`);
console.log(`People with 1+ affiliations: ${Object.values(peopleData.people).filter(p => p.affiliations && p.affiliations.length > 0).length}`);
console.log(`People with 2+ affiliations: ${Object.values(peopleData.people).filter(p => p.affiliations && p.affiliations.length >= 2).length}`);
console.log('Done!');
