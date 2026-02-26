#!/usr/bin/env node
// expandData27.js - Fix connection references, create missing Epstein entries,
// add missing people, remove en/em dashes, expand Epstein network exhaustively
const fs = require('fs');
const path = require('path');

const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');

const jd = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const pd = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

// ═══════════════════════════════════════════════════════
// 1. REMOVE EN DASHES AND EM DASHES FROM ALL TEXT FIELDS
// ═══════════════════════════════════════════════════════
let dashFixes = 0;
function fixDashes(obj) {
  if (typeof obj === 'string') {
    const fixed = obj.replace(/\u2013/g, '-').replace(/\u2014/g, '-');
    if (fixed !== obj) dashFixes++;
    return fixed;
  }
  if (Array.isArray(obj)) return obj.map(fixDashes);
  if (obj && typeof obj === 'object') {
    for (const k in obj) obj[k] = fixDashes(obj[k]);
    return obj;
  }
  return obj;
}
fixDashes(jd);
fixDashes(pd);

// ═══════════════════════════════════════════════════════
// 2. BUILD LOOKUP MAPS
// ═══════════════════════════════════════════════════════
const entryIdMap = {};
const nameToId = {};
const existingIds = new Set();
const existingNames = new Set();

function rebuildMaps() {
  for (const c in jd.countries) {
    for (const e of jd.countries[c]) {
      entryIdMap[e.id] = { name: e.name, country: c, category: e.category, type: e.type };
      nameToId[e.name.toLowerCase()] = e.id;
      existingIds.add(e.id);
      existingNames.add(e.name.toLowerCase());
    }
  }
}
rebuildMaps();

// ═══════════════════════════════════════════════════════
// 3. ALIAS MAP - short names to existing entry IDs
// ═══════════════════════════════════════════════════════
const aliasMap = {
  'aipac': 'aipac',
  'anti-defamation league': 'anti-defamation-league-adl',
  'adl': 'anti-defamation-league-adl',
  'world jewish congress': 'world-jewish-congress',
  'birthright israel': 'birthright-israel',
  'chabad': 'chabad-lubavitch',
  'google': 'google-alphabet-inc',
  'goldman sachs': 'goldman-sachs-historic',
  'jdc': 'american-jewish-joint-distribution-committee-jdc',
  'crif': 'crif',
  'ajc': 'american-jewish-committee-ajc',
  'american jewish committee': 'american-jewish-committee-ajc',
  'jewish federations of north america': 'jewish-federations-of-north-america-jfna',
  'jfna': 'jewish-federations-of-north-america-jfna',
  'hadassah': 'hadassah',
  'b\'nai b\'rith': 'b-nai-b-rith',
  'jewish national fund': 'jewish-national-fund-jnf',
  'jnf': 'jewish-national-fund-jnf',
  'technion': 'technion-israel-institute-of-technology',
  'hebrew university': 'hebrew-university-of-jerusalem',
  'weizmann institute': 'weizmann-institute-of-science',
  'harvard university': 'harvard-university',
  'check point software': 'check-point-software-technologies',
  'teva pharmaceutical': 'teva-pharmaceutical-industries',
  'mobileye': 'mobileye',
  'el al': 'el-al-israel-airlines',
  'israel aerospace industries': 'israel-aerospace-industries',
  'bloomberg': 'bloomberg-lp',
  'cnn': 'cnn',
  'new york times': 'new-york-times',
  'nyt': 'new-york-times',
  'paramount': 'paramount-global',
  'fox news': 'fox-news-news-corp',
  'washington post': 'washington-post',
  'miramax': 'miramax-films',
  'apollo global': 'apollo-global-management',
  'kkr': 'kkr-co',
  'rothschild': 'rothschild-co',
  'd.e. shaw': 'de-shaw-co',
  'lehman brothers': 'lehman-brothers-historic',
  'council on foreign relations': 'council-on-foreign-relations-cfr',
  'cfr': 'council-on-foreign-relations-cfr',
  'sheldon adelson': 'sheldon-adelson-empire',
};

// ═══════════════════════════════════════════════════════
// 4. FIX EXISTING CONNECTION REFERENCES (add entryId where match found)
// ═══════════════════════════════════════════════════════
let connFixed = 0;
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    if (!e.connections) continue;
    for (const conn of e.connections) {
      // Already has valid entryId
      if (conn.entryId && entryIdMap[conn.entryId]) continue;
      // Try direct name match
      const lname = (conn.name || '').toLowerCase();
      let tid = nameToId[lname];
      if (!tid) {
        // Try alias match
        for (const alias in aliasMap) {
          if (lname === alias || lname.includes(alias)) {
            const candidate = aliasMap[alias];
            if (entryIdMap[candidate]) {
              tid = candidate;
              break;
            }
          }
        }
      }
      if (tid && entryIdMap[tid] && tid !== e.id) {
        conn.entryId = tid;
        connFixed++;
      }
    }
  }
}
console.log('Connection references fixed:', connFixed);

// ═══════════════════════════════════════════════════════
// 5. ADD NEW ENTRIES - Epstein missing connections + top referenced
// ═══════════════════════════════════════════════════════
let newEntries = 0;
function addEntry(country, entry) {
  if (existingIds.has(entry.id) || existingNames.has(entry.name.toLowerCase())) return false;
  if (!jd.countries[country]) jd.countries[country] = [];
  jd.countries[country].push(entry);
  existingIds.add(entry.id);
  existingNames.add(entry.name.toLowerCase());
  entryIdMap[entry.id] = { name: entry.name, country, category: entry.category, type: entry.type };
  nameToId[entry.name.toLowerCase()] = entry.id;
  newEntries++;
  return true;
}

// --- EPSTEIN-RELATED ENTRIES ---

addEntry('United States', {
  id: 'mit-media-lab',
  name: 'MIT Media Lab',
  type: 'academic research lab',
  category: 'Education',
  founded: 1985,
  description: 'The MIT Media Lab is an interdisciplinary research laboratory at the Massachusetts Institute of Technology devoted to projects at the convergence of technology, multimedia, sciences, art, and design. Director Joi Ito resigned in September 2019 after revelations that he had accepted donations from Jeffrey Epstein and concealed the extent of the relationship. Internal emails showed MIT had classified Epstein as a "disqualified" donor yet continued accepting his money through intermediaries. The scandal exposed how prestigious academic institutions enabled Epstein to maintain legitimacy and access to influential circles even after his 2008 conviction. Nicholas Negroponte, co-founder of the lab, publicly defended accepting Epstein funds. The fallout led to major reforms in MIT donation acceptance policies.',
  website: 'https://www.media.mit.edu/',
  individuals: [
    { id: slug('Joi Ito'), name: 'Joi Ito', role: 'Former Director (resigned 2019)', bio: 'Japanese-American activist and entrepreneur who resigned as MIT Media Lab director after revelations he had accepted and concealed donations from Jeffrey Epstein.' },
    { id: slug('Nicholas Negroponte'), name: 'Nicholas Negroponte', role: 'Co-founder', bio: 'Greek-American architect and computer scientist. Co-founded the MIT Media Lab and the One Laptop per Child initiative. Publicly defended accepting Epstein donations.' },
    { id: slug('Seth Lloyd'), name: 'Seth Lloyd', role: 'Professor', bio: 'American mechanical engineer and professor at MIT who accepted funding from Jeffrey Epstein for his quantum computing research.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'funding', description: 'Epstein donated millions to MIT Media Lab, classified as "disqualified donor" but money accepted through intermediaries', entryId: 'jeffrey-epstein-network' },
    { name: 'Harvard University', type: 'educational', description: 'Academic collaboration and shared Epstein donor network', entryId: 'harvard-university' },
    { name: 'Apollo Global Management', type: 'funding', description: 'Leon Black donated to MIT; connected through Epstein network', entryId: 'apollo-global-management' }
  ]
});

addEntry('United States', {
  id: 'l-brands-victorias-secret',
  name: "Victoria's Secret (L Brands)",
  type: 'retail corporation',
  category: 'Corporate',
  founded: 1977,
  description: "Victoria's Secret is an American lingerie, clothing, and beauty retailer founded in San Francisco. Les Wexner, through his company L Brands (now Bath & Body Works Inc.), acquired Victoria's Secret in 1982 for $1 million and built it into a multibillion-dollar brand. The connection to Jeffrey Epstein is central to understanding both the brand and the Epstein network: Wexner gave Epstein sweeping power of attorney over his finances, and Epstein reportedly used his association with the lingerie brand to recruit young women by posing as a talent scout. Wexner was Epstein's primary financial patron, transferring his Manhattan townhouse (valued at $77 million) to Epstein. In 2019, Wexner claimed Epstein had misappropriated vast sums of his money. The company went through major restructuring following the Epstein scandal and #MeToo movement, eventually dropping the Angels fashion show format.",
  website: 'https://www.victoriassecret.com/',
  individuals: [
    { id: 'leslie-wexner', name: 'Les Wexner', role: 'Founder of L Brands', bio: 'American billionaire businessman who founded L Brands and was Jeffrey Epstein primary financial patron. Gave Epstein power of attorney over his finances.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'financial', description: 'Epstein used Wexner connection and VS brand as tool for recruitment; Wexner was primary financial backer', entryId: 'jeffrey-epstein-network' },
    { name: 'Wexner Foundation', type: 'subsidiary', description: 'Both controlled by Les Wexner', entryId: 'wexner-foundation' },
    { name: 'JPMorgan Chase', type: 'financial', description: 'Banking relationship connected through Wexner/Epstein finances', entryId: 'jpmorgan-chase' }
  ]
});

addEntry('United States', {
  id: 'fbi',
  name: 'Federal Bureau of Investigation (FBI)',
  type: 'federal law enforcement agency',
  category: 'Government',
  founded: 1908,
  description: 'The Federal Bureau of Investigation is the domestic intelligence and security service of the United States and its principal federal law enforcement agency. The FBI has intersected with numerous cases cataloged in this database, including the investigation of Jeffrey Epstein. The FBI received complaints about Epstein as early as 1996 but did not open a formal investigation until years later. The bureau ultimately participated in the 2019 arrest of Epstein on federal sex trafficking charges. Critics have questioned why the FBI failed to act on earlier intelligence and whether Epstein was protected by intelligence connections. Former FBI Director Robert Mueller and former Director James Comey both served during periods when Epstein complaints were known. The FBI also investigated the death of Epstein in his cell at the Metropolitan Correctional Center, which was officially ruled suicide.',
  website: 'https://www.fbi.gov/',
  individuals: [
    { id: slug('Robert Mueller'), name: 'Robert Mueller', role: 'Former Director (2001-2013)', bio: 'American attorney who served as FBI Director during parts of the Epstein investigation period. Later served as Special Counsel investigating Russian interference in the 2016 election.' },
    { id: slug('James Comey'), name: 'James Comey', role: 'Former Director (2013-2017)', bio: 'American lawyer who served as FBI Director. His tenure overlapped with the period when renewed interest in Epstein emerged.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'intelligence', description: 'FBI investigated Epstein; received early complaints but delayed action; investigated his death', entryId: 'jeffrey-epstein-network' },
    { name: 'Southern District of New York', type: 'legal', description: 'SDNY and FBI collaborated on Epstein prosecution', entryId: 'sdny' },
    { name: 'US Department of Justice', type: 'parent', description: 'FBI is primary investigative arm of DOJ' }
  ]
});

addEntry('United States', {
  id: 'sdny',
  name: 'Southern District of New York (SDNY)',
  type: 'federal judicial district',
  category: 'Legal',
  founded: 1789,
  description: 'The United States District Court for the Southern District of New York, often called the "Sovereign District" or "Mother Court," is a federal district court covering Manhattan, the Bronx, and surrounding counties. SDNY prosecutors brought the 2019 federal indictment against Jeffrey Epstein on sex trafficking charges, following the controversial 2008 plea deal negotiated by Alexander Acosta in Florida. The SDNY prosecution represented a second attempt at federal accountability for Epstein. After Epstein died in custody, SDNY continued prosecuting Ghislaine Maxwell, who was convicted in December 2021 on five of six counts of sex trafficking and conspiracy. The Maxwell trial revealed extensive details about the Epstein network, including testimony from victims and documentary evidence of the trafficking operation.',
  website: 'https://www.nysd.uscourts.gov/',
  individuals: [
    { id: slug('Geoffrey Berman'), name: 'Geoffrey Berman', role: 'Former US Attorney (2018-2020)', bio: 'American attorney who oversaw the Epstein prosecution as US Attorney for SDNY. Was controversially fired by AG Barr in 2020.' },
    { id: slug('Audrey Strauss'), name: 'Audrey Strauss', role: 'Acting US Attorney', bio: 'Succeeded Berman and oversaw the Maxwell prosecution through indictment and trial.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'legal', description: 'Brought 2019 federal charges; continued Maxwell prosecution after Epstein death', entryId: 'jeffrey-epstein-network' },
    { name: 'Federal Bureau of Investigation (FBI)', type: 'legal', description: 'Collaborated on Epstein/Maxwell investigation', entryId: 'fbi' },
    { name: 'Metropolitan Correctional Center', type: 'legal', description: 'Epstein held and died at MCC during SDNY prosecution', entryId: 'metropolitan-correctional-center' }
  ]
});

addEntry('United States', {
  id: 'metropolitan-correctional-center',
  name: 'Metropolitan Correctional Center (MCC New York)',
  type: 'federal detention facility (closed)',
  category: 'Government',
  founded: 1975,
  description: 'The Metropolitan Correctional Center, New York was a United States federal administrative detention facility in the Civic Center neighborhood of Manhattan. It is where Jeffrey Epstein was found dead in his cell on August 10, 2019, while awaiting trial on sex trafficking charges. His death was officially ruled a suicide by hanging, but the circumstances have generated widespread skepticism: both guards assigned to his unit had fallen asleep and falsified records, surveillance cameras near his cell malfunctioned, and he had been removed from suicide watch just days prior despite a previous attempt. The facility was closed in 2021 due to deplorable conditions documented by inspectors. The MCC also housed other high-profile inmates including El Chapo and Bernie Madoff.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'related', description: 'Site of Epstein death in custody while awaiting trial, August 10, 2019', entryId: 'jeffrey-epstein-network' },
    { name: 'Southern District of New York (SDNY)', type: 'legal', description: 'MCC held SDNY pre-trial detainees', entryId: 'sdny' },
    { name: 'Federal Bureau of Investigation (FBI)', type: 'intelligence', description: 'FBI investigated circumstances of Epstein death at MCC', entryId: 'fbi' }
  ]
});

addEntry('United States', {
  id: 'dalton-school',
  name: 'Dalton School',
  type: 'private preparatory school',
  category: 'Education',
  founded: 1919,
  description: 'The Dalton School is an elite private K-12 preparatory school on the Upper East Side of Manhattan. Jeffrey Epstein taught mathematics and physics at Dalton from 1974 to 1976, despite not having a college degree. He was hired by headmaster Donald Barr, the father of future Attorney General William Barr. This connection has drawn scrutiny given William Barr was Attorney General when Epstein died in federal custody. At Dalton, Epstein made connections with wealthy parents of students, which reportedly helped launch his career in finance - he was subsequently hired at Bear Stearns by Alan Greenberg. The school serves many prominent New York families and has a tuition exceeding $50,000 per year.',
  individuals: [
    { id: slug('Donald Barr'), name: 'Donald Barr', role: 'Former Headmaster', bio: 'American educator who served as headmaster of Dalton School and hired Jeffrey Epstein to teach there without a degree. Father of future Attorney General William Barr.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'educational', description: 'Epstein taught at Dalton 1974-1976; hired by Donald Barr; connected to Bear Stearns through parent contacts', entryId: 'jeffrey-epstein-network' },
    { name: 'Bear Stearns (historic)', type: 'related', description: 'Epstein transitioned from Dalton to Bear Stearns through connections made with wealthy parents', entryId: 'bear-stearns-historic' }
  ]
});

addEntry('United States', {
  id: 'palm-beach-police',
  name: 'Palm Beach Police Department',
  type: 'municipal law enforcement',
  category: 'Government',
  description: 'The Palm Beach Police Department initiated the first significant investigation into Jeffrey Epstein in 2005 after a parent reported that her 14-year-old daughter had been taken to Epstein Palm Beach mansion and paid for sexual acts. Chief Michael Reiter led the investigation, which uncovered dozens of victims and amassed substantial evidence. However, the Palm Beach County State Attorney Barry Krischer refused to file felony charges, leading Reiter to refer the case to the FBI. The investigation was subsequently taken over by federal prosecutors, resulting in the controversial 2008 plea deal negotiated by Alexander Acosta. Police detective Joseph Recarey compiled extensive evidence including victim testimony and physical evidence from Epstein home. The PBPD case file became the foundation for all subsequent prosecutions.',
  individuals: [
    { id: slug('Michael Reiter'), name: 'Michael Reiter', role: 'Former Chief', bio: 'Former Palm Beach Police Chief who led the initial Epstein investigation and pushed for federal involvement when local prosecution stalled.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'legal', description: 'Initiated first investigation of Epstein in 2005; compiled evidence of dozens of victims', entryId: 'jeffrey-epstein-network' },
    { name: 'Federal Bureau of Investigation (FBI)', type: 'legal', description: 'Referred Epstein case to FBI after local DA refused felony charges', entryId: 'fbi' }
  ]
});

addEntry('United Kingdom', {
  id: 'maxwell-communications',
  name: 'Maxwell Communications Corporation',
  type: 'media conglomerate (defunct)',
  category: 'Media',
  founded: 1964,
  description: 'Maxwell Communications Corporation was a British media conglomerate built by Robert Maxwell, the Czech-born British media proprietor and father of Ghislaine Maxwell. At its height, the company owned Macmillan Publishers, the Daily Mirror, and the New York Daily News, among other properties. Robert Maxwell died in November 1991 after falling from his yacht near the Canary Islands under mysterious circumstances. After his death, it was revealed he had fraudulently looted hundreds of millions of pounds from his companies pension funds, leaving thousands of pensioners destitute. Maxwell was alleged to have connections to Israeli intelligence (Mossad), and his funeral on the Mount of Olives in Jerusalem was attended by Israeli President Chaim Herzog, Prime Minister Yitzhak Shamir, and six serving and former heads of Israeli intelligence. His daughter Ghislaine moved to New York after his death and became Jeffrey Epstein primary associate and was later convicted of sex trafficking.',
  individuals: [
    { id: slug('Robert Maxwell'), name: 'Robert Maxwell', role: 'Founder and Chairman (1923-1991)', bio: 'Czech-born British media baron, politician, and alleged intelligence asset. Built a media empire then died under mysterious circumstances after looting pension funds. Father of Ghislaine Maxwell.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'related', description: 'Robert Maxwell was father of Ghislaine Maxwell, Epstein closest associate. Alleged intelligence connections overlay with Epstein network', entryId: 'jeffrey-epstein-network' },
    { name: 'Mossad (Israeli Intelligence)', type: 'intelligence', description: 'Robert Maxwell alleged to have been Mossad asset; funeral attended by six intelligence chiefs', entryId: 'mossad-israeli-intelligence' }
  ]
});

addEntry('Israel', {
  id: 'mossad-israeli-intelligence',
  name: 'Mossad (Israeli Intelligence)',
  type: 'intelligence agency',
  category: 'Intelligence',
  founded: 1949,
  description: 'The Mossad (HaMossad leModiyin uleTafkidim Meyuhadim - Institute for Intelligence and Special Operations) is the national intelligence agency of Israel, responsible for intelligence collection, covert operations, and counterterrorism. Persistent allegations link both Robert Maxwell and Jeffrey Epstein to Israeli intelligence. Former Israeli intelligence operative Ari Ben-Menashe claimed Robert Maxwell was recruited as a Mossad asset and that Epstein was also part of an intelligence operation involving sexual blackmail of powerful figures. These claims remain unverified but are supported by circumstantial evidence: the CIA involvement in the PROMIS software scandal with Maxwell, Epstein unexplained wealth and connections, his relationship with former Israeli Prime Minister Ehud Barak, and the extensive intelligence community attendance at Robert Maxwell funeral. Former Mossad officer Victor Ostrovsky wrote about Maxwell alleged intelligence connections in his books.',
  individuals: [
    { id: slug('Ari Ben Menashe'), name: 'Ari Ben-Menashe', role: 'Former Intelligence Operative', bio: 'Iranian-born Israeli intelligence operative who claimed Robert Maxwell and Jeffrey Epstein were connected to Israeli intelligence operations.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'intelligence', description: 'Alleged intelligence operation connection; sexual blackmail operation claims by former operatives', entryId: 'jeffrey-epstein-network' },
    { name: 'Maxwell Communications Corporation', type: 'intelligence', description: 'Robert Maxwell alleged long-term Mossad asset', entryId: 'maxwell-communications' },
    { name: 'Israel Aerospace Industries', type: 'intelligence', description: 'Defense-intelligence complex interconnections', entryId: 'israel-aerospace-industries' }
  ]
});

addEntry('United States', {
  id: 'us-virgin-islands-gov',
  name: 'US Virgin Islands (Government)',
  type: 'territorial government',
  category: 'Government',
  description: 'The Government of the US Virgin Islands played a significant role in the Epstein case. Epstein owned Little Saint James and Great Saint James, two private islands in the USVI, where much of his trafficking operation was believed to have occurred. Little Saint James was nicknamed "Pedophile Island" or "Epstein Island." In 2023, the USVI Attorney General filed a civil enforcement action against JPMorgan Chase for facilitating Epstein sex trafficking, alleging the bank knowingly benefited from its relationship with Epstein. The case resulted in a $75 million settlement. AG Denise George was fired after filing the JPMorgan suit without gubernatorial approval. The USVI also reached a $105 million settlement with the Epstein estate over unpaid taxes and trafficking activity.',
  individuals: [
    { id: slug('Denise George'), name: 'Denise George', role: 'Former Attorney General', bio: 'USVI Attorney General who filed landmark suit against JPMorgan Chase over Epstein relationship. Fired after filing the suit.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'legal', description: 'Epstein owned two private islands in USVI; trafficking operation hub; $105M estate settlement', entryId: 'jeffrey-epstein-network' },
    { name: 'JPMorgan Chase', type: 'legal', description: 'USVI AG sued JPMorgan for facilitating Epstein trafficking; $75M settlement', entryId: 'jpmorgan-chase' },
    { name: 'Deutsche Bank', type: 'financial', description: 'Deutsche Bank also settled with USVI over Epstein accounts', entryId: 'deutsche-bank' }
  ]
});

// --- KEY POLITICAL/PUBLIC FIGURES AS ENTRIES ---

addEntry('United States', {
  id: 'bill-clinton-connections',
  name: 'Bill Clinton (42nd President)',
  type: 'political figure',
  category: 'Political',
  founded: 1993,
  description: 'William Jefferson Clinton served as the 42nd President of the United States from 1993 to 2001. Flight logs from Epstein private jet (the "Lolita Express") show Clinton flew on the aircraft at least 26 times. Clinton has acknowledged knowing Epstein but denied knowledge of criminal activity. Virginia Giuffre, a key Epstein accuser, stated she saw Clinton on Little Saint James island, though Clinton denied visiting. The Clinton Foundation received a $25,000 donation from Epstein in 1995. After Epstein arrest in 2019, Clinton issued a statement saying he knew "nothing about the terrible crimes" Epstein was charged with. The association has been a persistent subject of public scrutiny and media investigation.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'political', description: 'Flew on Epstein jet 26+ times per flight logs; Epstein donated to Clinton Foundation', entryId: 'jeffrey-epstein-network' },
    { name: 'Clinton Foundation', type: 'related', description: 'Received $25K Epstein donation' }
  ]
});

addEntry('United States', {
  id: 'donald-trump-connections',
  name: 'Donald Trump (45th/47th President)',
  type: 'political figure',
  category: 'Political',
  founded: 1987,
  description: 'Donald John Trump served as the 45th President (2017-2021) and 47th President (2025-present). Trump had a social relationship with Epstein throughout the 1990s and early 2000s. In a 2002 New York Magazine interview, Trump described Epstein as "a terrific guy" who "likes beautiful women as much as I do, and many of them are on the younger side." Trump later claimed he had a falling out with Epstein and banned him from Mar-a-Lago, reportedly over a real estate dispute. Trump appointed Alexander Acosta as Labor Secretary; Acosta was the US Attorney who negotiated the controversial 2008 Epstein plea deal that critics called a "sweetheart deal." Acosta resigned in 2019 when the plea deal drew renewed scrutiny after Epstein re-arrest. Virginia Giuffre was recruited from Mar-a-Lago.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'political', description: 'Social relationship 1990s-2000s; praised Epstein in 2002; Virginia Giuffre recruited from Mar-a-Lago', entryId: 'jeffrey-epstein-network' },
    { name: 'Alexander Acosta', type: 'political', description: 'Appointed Acosta (who gave Epstein plea deal) as Labor Secretary' }
  ]
});

addEntry('United Kingdom', {
  id: 'prince-andrew',
  name: 'Prince Andrew (Duke of York)',
  type: 'royal/political figure',
  category: 'Political',
  description: 'Prince Andrew, Duke of York, is the third child of Queen Elizabeth II. He was one of the most prominent figures connected to the Epstein scandal. Virginia Giuffre alleged she was trafficked by Epstein and Maxwell to have sex with Prince Andrew on three occasions when she was 17, including at Maxwell London home and on Little Saint James. A photograph of Andrew with his arm around Giuffre waist (with Maxwell in the background) became one of the most iconic images of the scandal. Andrew denied the allegations, including in a disastrous 2019 BBC Newsnight interview that led to his resignation from royal duties. In 2022, he settled a civil lawsuit brought by Giuffre for an undisclosed sum reported to be around 12 million pounds, without admitting liability.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'related', description: 'Key figure in Epstein scandal; Virginia Giuffre alleged trafficking; settled civil suit ~12M pounds', entryId: 'jeffrey-epstein-network' },
    { name: 'Maxwell Communications Corporation', type: 'related', description: 'Connected through Ghislaine Maxwell; photographed with Giuffre at Maxwell London home', entryId: 'maxwell-communications' }
  ]
});

addEntry('Israel', {
  id: 'ehud-barak-connections',
  name: 'Ehud Barak (Former Israeli PM)',
  type: 'political figure',
  category: 'Political',
  founded: 1999,
  description: 'Ehud Barak served as Prime Minister of Israel from 1999 to 2001 and held other senior posts including Defense Minister and Chief of the General Staff of the IDF. His relationship with Epstein drew significant scrutiny. Barak visited Epstein Manhattan residence and was photographed entering the townhouse in January 2016. Through Epstein, Barak invested in a startup called Carbyne (now Reporty Homeland Security), which develops emergency call technology. Barak acknowledged visiting Epstein homes, including the island, but denied knowledge of any criminal activity. He stated his relationship with Epstein was connected to investments and business. Barak reportedly received $2.5 million from Epstein for consulting work.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'political', description: 'Visited Epstein residences including island; received ~$2.5M for consulting; invested through Epstein in Carbyne/Reporty', entryId: 'jeffrey-epstein-network' },
    { name: 'Mossad (Israeli Intelligence)', type: 'intelligence', description: 'Former IDF Chief of Staff; intelligence community connections', entryId: 'mossad-israeli-intelligence' }
  ]
});

addEntry('United States', {
  id: 'alan-dershowitz-connections',
  name: 'Alan Dershowitz',
  type: 'legal/public figure',
  category: 'Legal',
  founded: 1967,
  description: 'Alan Morton Dershowitz is an American attorney and legal scholar, emeritus professor at Harvard Law School, known for defending high-profile clients. Dershowitz represented Epstein during the negotiation of the 2008 plea deal and has been accused by Virginia Giuffre of being a participant in Epstein trafficking scheme. Dershowitz vehemently denied these allegations and filed defamation suits. Giuffre later settled with Dershowitz and issued a statement saying she "may have made a mistake" in identifying him. Dershowitz has been one of the most vocal public defenders of his innocence in the Epstein matter. His role in the 2008 plea deal, which gave Epstein a lenient sentence and immunity to unnamed co-conspirators, remains highly controversial. He later defended Trump in his first impeachment trial.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'legal', description: 'Represented Epstein in 2008 plea deal; accused by Virginia Giuffre; later settled', entryId: 'jeffrey-epstein-network' },
    { name: 'Harvard University', type: 'educational', description: 'Emeritus professor at Harvard Law School; Epstein donated to Harvard', entryId: 'harvard-university' }
  ]
});

addEntry('United States', {
  id: 'alexander-acosta-connections',
  name: 'Alexander Acosta',
  type: 'political/legal figure',
  category: 'Legal',
  founded: 2005,
  description: 'R. Alexander Acosta is an American attorney who served as US Attorney for the Southern District of Florida from 2005 to 2009, during which time he negotiated the controversial 2008 plea deal with Jeffrey Epstein. The deal allowed Epstein to plead guilty to state prostitution charges, serve just 13 months (with work release 6 days a week), and receive immunity from federal sex trafficking charges for himself and unnamed co-conspirators. A federal judge later ruled the plea deal violated the Crime Victims Rights Act by failing to notify victims. Despite this controversy, Acosta was appointed US Secretary of Labor by President Trump in 2017. He resigned in July 2019 when the plea deal received renewed scrutiny following Epstein re-arrest by SDNY prosecutors.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'legal', description: 'Negotiated 2008 plea deal as US Attorney; deal gave Epstein lenient sentence and co-conspirator immunity', entryId: 'jeffrey-epstein-network' },
    { name: 'Donald Trump (45th/47th President)', type: 'political', description: 'Appointed by Trump as Labor Secretary; resigned over Epstein plea deal controversy', entryId: 'donald-trump-connections' }
  ]
});

addEntry('United States', {
  id: 'bill-gates-connections',
  name: 'Bill Gates',
  type: 'business/philanthropic figure',
  category: 'Philanthropy',
  founded: 1975,
  description: 'William Henry Gates III is co-founder of Microsoft and one of the wealthiest people in history. His relationship with Epstein became public knowledge in 2019 and contributed to his 2021 divorce from Melinda French Gates. Gates met with Epstein multiple times starting in 2011, three years after Epstein first conviction. The New York Times reported Gates flew on Epstein private jet in 2013 and visited Epstein Manhattan townhouse on numerous occasions between 2011 and 2014. Gates initially claimed a minimal relationship but later acknowledged the meetings were a mistake. The Bill and Melinda Gates Foundation also facilitated Epstein meeting with JPMorgan executives. Melinda French Gates reportedly warned her then-husband about Epstein and cited the relationship as a factor in their divorce.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'financial', description: 'Multiple meetings 2011-2014; flew on Epstein jet; visits to townhouse; contributed to Gates divorce', entryId: 'jeffrey-epstein-network' },
    { name: 'JPMorgan Chase', type: 'financial', description: 'Gates Foundation facilitated Epstein-JPMorgan executive meetings', entryId: 'jpmorgan-chase' }
  ]
});

addEntry('United States', {
  id: 'elon-musk-connections',
  name: 'Elon Musk',
  type: 'business/technology figure',
  category: 'Technology',
  founded: 1999,
  description: 'Elon Reeve Musk is a businessman and technology entrepreneur who leads Tesla, SpaceX, and other companies. Musk name appeared in documents related to the Epstein case. Ghislaine Maxwell was photographed at a 2014 Vanity Fair Oscar party reportedly organized with Musk help, and she was seen at other events associated with Musk. Musk has stated he visited Epstein Manhattan residence once and did not have a personal relationship with him. In the Maxwell trial documents released in 2024, Musk name appeared in connection with a planned meeting, though the nature of any interaction remains disputed. Musk has pushed back against implications of deeper involvement.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'related', description: 'Name in Epstein documents; Maxwell photographed at Musk-associated events; visited townhouse', entryId: 'jeffrey-epstein-network' }
  ]
});

addEntry('United States', {
  id: 'reid-hoffman-connections',
  name: 'Reid Hoffman',
  type: 'business/technology figure',
  category: 'Technology',
  founded: 2002,
  description: 'Reid Garrett Hoffman is an American internet entrepreneur, venture capitalist, and co-founder of LinkedIn. Hoffman met with Epstein on multiple occasions for fundraising and networking purposes. He stated he was told the meetings were "a way to meet billionaires interested in funding science." In 2019, Hoffman publicly apologized for any association with Epstein, saying he helped MIT Media Lab director Joi Ito connect with Epstein to raise funds for certain projects. Hoffman stated he deeply regretted any connection and that he was not aware of Epstein criminal conduct. He committed $15 million to MIT to support research on ethical AI as a form of restitution.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'related', description: 'Multiple meetings with Epstein; facilitated Epstein-MIT connections; publicly apologized', entryId: 'jeffrey-epstein-network' },
    { name: 'MIT Media Lab', type: 'funding', description: 'Connected Joi Ito with Epstein for fundraising; later donated $15M to MIT for ethical AI', entryId: 'mit-media-lab' }
  ]
});

addEntry('United States', {
  id: 'steve-bannon-connections',
  name: 'Steve Bannon',
  type: 'political/media figure',
  category: 'Political',
  description: 'Stephen Kevin Bannon is an American media executive, political strategist, and former White House Chief Strategist. In 2018, Bannon met with Epstein at his Manhattan townhouse to discuss political strategy. The meetings were reported by investigative journalists and confirmed through various records. The nature of their relationship was primarily political networking. Bannon was also connected to Guo Wengui (Miles Guo), a fugitive Chinese billionaire, and was arrested on Guo yacht on fraud charges in 2020 (later pardoned by Trump). The intersection of Bannon network with Epstein circle illustrates the overlapping nature of political, media, and financial power networks.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'political', description: 'Met with Epstein at Manhattan townhouse in 2018 for political strategy discussions', entryId: 'jeffrey-epstein-network' },
    { name: 'Donald Trump (45th/47th President)', type: 'political', description: 'Former White House Chief Strategist; pardoned by Trump', entryId: 'donald-trump-connections' }
  ]
});

addEntry('United States', {
  id: 'woody-allen-connections',
  name: 'Woody Allen',
  type: 'entertainment figure',
  category: 'Entertainment',
  description: 'Heywood Allen is an American filmmaker, writer, and actor. Allen was photographed with Epstein and Maxwell at social events and was included in Epstein contacts list. Allen stated he met Epstein through friends and that they had dinner "once or twice." He denied any close relationship or knowledge of criminal activity. The association gained attention given Allen own controversies involving his adopted stepdaughter. Allen name appeared in documents released during the Maxwell trial. The connection illustrates how Epstein cultivated relationships with prominent cultural figures to maintain social legitimacy and access.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'related', description: 'In Epstein contacts; photographed at social events; acknowledged dining together', entryId: 'jeffrey-epstein-network' },
    { name: 'Miramax Films', type: 'related', description: 'Overlapping entertainment industry circles', entryId: 'miramax-films' }
  ]
});

addEntry('United States', {
  id: 'george-stephanopoulos-connections',
  name: 'George Stephanopoulos',
  type: 'media/political figure',
  category: 'Media',
  description: 'George Robert Stephanopoulos is an American television journalist and former political advisor. He served as a senior advisor to President Clinton and later became anchor of ABC Good Morning America and This Week. Stephanopoulos attended a dinner party at Epstein Manhattan townhouse in 2010, after Epstein first conviction, alongside other guests including Katie Couric, Chelsea Handler, and Woody Allen. The dinner was hosted by Epstein in what appeared to be a campaign to rehabilitate his public image after his 2008 conviction. Stephanopoulos acknowledged attending but said he should not have gone.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'related', description: 'Attended 2010 dinner at Epstein townhouse post-conviction; part of image rehabilitation effort', entryId: 'jeffrey-epstein-network' },
    { name: 'Bill Clinton (42nd President)', type: 'political', description: 'Former senior advisor to Clinton; both connected to Epstein', entryId: 'bill-clinton-connections' }
  ]
});

addEntry('United States', {
  id: 'les-wexner-connections',
  name: 'Les Wexner',
  type: 'business figure',
  category: 'Corporate',
  founded: 1963,
  description: 'Leslie Herbert Wexner is an American billionaire businessman, the founder and former CEO of L Brands (now Bath and Body Works). He is the most significant financial figure in the Epstein network. Wexner was Epstein primary patron, granting him sweeping power of attorney over his personal finances, real estate holdings, and business affairs. Wexner transferred his 71st Street Manhattan townhouse (later valued at $77 million) to Epstein under unclear circumstances. Epstein managed the Wexner Foundation and had close ties to Wexner family. In 2019, Wexner claimed Epstein had misappropriated vast sums of his wealth, though the full extent remains unclear. The relationship between Wexner and Epstein began in the mid-1980s and was the foundation upon which Epstein built his financial credibility and social network.',
  individuals: [],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'financial', description: 'Primary financial patron; power of attorney; transferred $77M townhouse; Epstein managed Wexner Foundation', entryId: 'jeffrey-epstein-network' },
    { name: "Victoria's Secret (L Brands)", type: 'subsidiary', description: 'Wexner founded L Brands/Victoria Secret', entryId: 'l-brands-victorias-secret' },
    { name: 'Wexner Foundation', type: 'subsidiary', description: 'Wexner founded; Epstein had management role', entryId: 'wexner-foundation' },
    { name: 'JPMorgan Chase', type: 'financial', description: 'Banking relationship; JPMorgan facilitated Wexner/Epstein financial arrangements', entryId: 'jpmorgan-chase' }
  ]
});

// --- NOW UPDATE EPSTEIN ENTRY CONNECTIONS TO USE ENTRY IDS ---
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    if (e.id !== 'jeffrey-epstein-network') continue;
    // Update existing connections with entryIds where we now have entries
    const idMap = {
      'MIT Media Lab': 'mit-media-lab',
      "Victoria's Secret (L Brands)": 'l-brands-victorias-secret',
      'Bill Clinton': 'bill-clinton-connections',
      'Donald Trump': 'donald-trump-connections',
      'Prince Andrew': 'prince-andrew',
      'Ehud Barak': 'ehud-barak-connections',
      'Les Wexner': 'les-wexner-connections',
      'Alan Dershowitz': 'alan-dershowitz-connections',
      'Alexander Acosta': 'alexander-acosta-connections',
      'Ghislaine Maxwell': null, // person, not entry
      'Robert Maxwell / Maxwell Communications': 'maxwell-communications',
      'Mossad (alleged)': 'mossad-israeli-intelligence',
      'Palm Beach Police Department': 'palm-beach-police',
      'FBI': 'fbi',
      'Dalton School': 'dalton-school',
      'Southern District of New York': 'sdny',
      'Elon Musk': 'elon-musk-connections',
      'Bill Gates': 'bill-gates-connections',
      'Woody Allen': 'woody-allen-connections',
      'George Stephanopoulos': 'george-stephanopoulos-connections',
      'Joi Ito / MIT Media Lab': 'mit-media-lab',
      'Reid Hoffman': 'reid-hoffman-connections',
      'US Virgin Islands': 'us-virgin-islands-gov',
      'Metropolitan Correctional Center': 'metropolitan-correctional-center',
      'Steve Bannon': 'steve-bannon-connections',
    };
    for (const conn of e.connections) {
      if (idMap[conn.name] && !conn.entryId) {
        conn.entryId = idMap[conn.name];
      }
    }

    // Add more Epstein connections that were not in original data
    const existingConnNames = new Set(e.connections.map(c => c.name));
    const moreConns = [
      { name: 'Southern District of New York (SDNY)', type: 'legal', description: 'SDNY brought 2019 federal indictment; continued Maxwell prosecution', entryId: 'sdny' },
      { name: 'US Virgin Islands (Government)', type: 'legal', description: 'Epstein owned Little Saint James and Great Saint James islands; USVI AG sued JPMorgan', entryId: 'us-virgin-islands-gov' },
      { name: 'Les Wexner', type: 'financial', description: 'Primary financial patron; power of attorney; $77M townhouse transfer', entryId: 'les-wexner-connections' },
      { name: 'Dalton School', type: 'educational', description: 'Epstein taught math 1974-76 without degree; hired by Donald Barr; entry to elite circles', entryId: 'dalton-school' },
      { name: 'Maxwell Communications', type: 'related', description: 'Robert Maxwell media empire; Ghislaine father; alleged intelligence connections', entryId: 'maxwell-communications' },
      { name: 'Mossad (Israeli Intelligence)', type: 'intelligence', description: 'Alleged intelligence operation connection per former operatives', entryId: 'mossad-israeli-intelligence' },
      { name: 'Palm Beach Police Department', type: 'legal', description: 'First investigation 2005; uncovered dozens of victims', entryId: 'palm-beach-police' },
      { name: 'Metropolitan Correctional Center', type: 'related', description: 'Found dead in cell August 10, 2019; cameras malfunctioned; guards asleep', entryId: 'metropolitan-correctional-center' },
      { name: 'Federal Bureau of Investigation (FBI)', type: 'intelligence', description: 'Received early complaints; investigated death; participated in 2019 arrest', entryId: 'fbi' },
      { name: "Victoria's Secret (L Brands)", type: 'financial', description: 'Used VS brand association to recruit; Wexner/L Brands was primary patron vehicle', entryId: 'l-brands-victorias-secret' },
      { name: 'Alan Dershowitz', type: 'legal', description: 'Defense attorney; negotiated 2008 plea deal; accused by Virginia Giuffre', entryId: 'alan-dershowitz-connections' },
      { name: 'Bill Clinton (42nd President)', type: 'political', description: 'Flew on Lolita Express 26+ times; Clinton Foundation received Epstein donation', entryId: 'bill-clinton-connections' },
      { name: 'Donald Trump (45th/47th President)', type: 'political', description: 'Social relationship 1990s-2000s; Virginia Giuffre recruited from Mar-a-Lago', entryId: 'donald-trump-connections' },
      { name: 'Prince Andrew (Duke of York)', type: 'related', description: 'Virginia Giuffre alleged trafficking; settled civil suit ~12M pounds', entryId: 'prince-andrew' },
      { name: 'Ehud Barak (Former Israeli PM)', type: 'political', description: 'Visited Epstein properties; received $2.5M; invested through Epstein in Carbyne', entryId: 'ehud-barak-connections' },
      { name: 'Alexander Acosta', type: 'legal', description: 'Negotiated 2008 "sweetheart" plea deal as US Attorney; resigned as Labor Secretary', entryId: 'alexander-acosta-connections' },
      { name: 'Bill Gates', type: 'financial', description: 'Multiple meetings 2011-2014; flew on Epstein jet; contributed to Gates divorce', entryId: 'bill-gates-connections' },
      { name: 'Elon Musk', type: 'related', description: 'Name in documents; Maxwell at Musk-associated events; visited townhouse', entryId: 'elon-musk-connections' },
      { name: 'Reid Hoffman', type: 'related', description: 'Multiple meetings; facilitated Epstein-MIT connection; donated $15M to MIT after', entryId: 'reid-hoffman-connections' },
      { name: 'Steve Bannon', type: 'political', description: 'Met 2018 at Manhattan townhouse for political strategy', entryId: 'steve-bannon-connections' },
      { name: 'Woody Allen', type: 'related', description: 'In contacts; photographed at events; acknowledged dining together', entryId: 'woody-allen-connections' },
      { name: 'George Stephanopoulos', type: 'related', description: 'Attended 2010 post-conviction dinner at Epstein townhouse', entryId: 'george-stephanopoulos-connections' },
      { name: 'MIT Media Lab', type: 'funding', description: 'Donated millions; "disqualified donor" but money accepted through intermediaries', entryId: 'mit-media-lab' },
    ];

    for (const mc of moreConns) {
      if (!existingConnNames.has(mc.name)) {
        e.connections.push(mc);
        existingConnNames.add(mc.name);
      }
    }
    console.log('Epstein connections after expansion:', e.connections.length);
  }
}

// ═══════════════════════════════════════════════════════
// 6. ADD MISSING PEOPLE TO PEOPLE.JSON
// ═══════════════════════════════════════════════════════
let newPeople = 0;
function addPerson(id, data) {
  if (pd.people[id]) return false;
  pd.people[id] = data;
  newPeople++;
  return true;
}

addPerson('nadia-marcinkova', {
  name: 'Nadia Marcinkova',
  bio: 'Slovakian-born woman who was allegedly brought to the US by Jeffrey Epstein from the former Yugoslavia when she was a teenager. She was named as an alleged participant and later co-conspirator in Epstein abuse. She later changed her name to Nadia Marcinko and became a licensed pilot. She received a non-prosecution agreement as part of the 2008 plea deal.',
  affiliations: [
    { organization: 'Jeffrey Epstein Network', role: 'Associate / Alleged Participant', country: 'United States', entryId: 'jeffrey-epstein-network' }
  ]
});

addPerson('lesley-groff', {
  name: 'Lesley Groff',
  bio: 'American woman who served as Jeffrey Epstein executive assistant for over two decades. She was named as a co-conspirator in the original federal investigation but received a non-prosecution agreement in the 2008 plea deal. Victims alleged she helped schedule appointments with underage girls and managed logistics of the trafficking operation.',
  affiliations: [
    { organization: 'Jeffrey Epstein Network', role: 'Executive Assistant', country: 'United States', entryId: 'jeffrey-epstein-network' }
  ]
});

addPerson('adolph-ochs', {
  name: 'Adolph Ochs',
  bio: 'American newspaper publisher (1858-1935) who purchased The New York Times in 1896 and transformed it into a respected newspaper of record. Born to a Jewish immigrant family from Bavaria, he established the Ochs-Sulzberger family dynasty that controlled the Times for over a century.',
  affiliations: [
    { organization: 'New York Times', role: 'Publisher (1896-1935)', country: 'United States', entryId: 'new-york-times' }
  ]
});

addPerson('lawrence-summers-harvard', {
  name: 'Lawrence Summers',
  bio: 'American economist who served as President of Harvard University (2001-2006) and US Secretary of the Treasury (1999-2001). During his tenure at Harvard, the university accepted donations from Jeffrey Epstein, and Summers met with Epstein on multiple occasions. He later stated the meetings were a mistake.',
  affiliations: [
    { organization: 'Harvard University', role: 'Former President', country: 'United States', entryId: 'harvard-university' },
    { organization: 'US Department of the Treasury', role: 'Former Secretary', country: 'United States' }
  ]
});

addPerson('bob-weinstein', {
  name: 'Bob Weinstein',
  bio: 'American film producer who co-founded Miramax Films with his brother Harvey Weinstein in 1979. He later co-founded The Weinstein Company. After Harvey conviction for sexual assault, Bob distanced himself but faced his own allegations of workplace harassment.',
  affiliations: [
    { organization: 'Miramax Films', role: 'Co-founder', country: 'United States', entryId: 'miramax-films' }
  ]
});

// Add more Epstein-connected people
addPerson('joi-ito', {
  name: 'Joi Ito',
  bio: 'Japanese-American activist and entrepreneur who served as director of the MIT Media Lab from 2011 to 2019. He resigned after revelations that he had solicited and accepted donations from Jeffrey Epstein, and concealed the nature and extent of the relationship from MIT officials. Internal emails showed Epstein was a "disqualified donor."',
  affiliations: [
    { organization: 'MIT Media Lab', role: 'Former Director (resigned 2019)', country: 'United States', entryId: 'mit-media-lab' }
  ]
});

addPerson('nicholas-negroponte', {
  name: 'Nicholas Negroponte',
  bio: 'Greek-American architect, computer scientist, and co-founder of the MIT Media Lab. Also founded the One Laptop per Child initiative. He publicly defended accepting donations from Jeffrey Epstein after the scandal broke.',
  affiliations: [
    { organization: 'MIT Media Lab', role: 'Co-founder', country: 'United States', entryId: 'mit-media-lab' }
  ]
});

addPerson('donald-barr', {
  name: 'Donald Barr',
  bio: 'American educator (1921-2004) who served as headmaster of the elite Dalton School in Manhattan. He hired Jeffrey Epstein to teach there in 1974 despite Epstein lacking a college degree. He was the father of William Barr, who later served as US Attorney General during Epstein death in federal custody.',
  affiliations: [
    { organization: 'Dalton School', role: 'Former Headmaster', country: 'United States', entryId: 'dalton-school' }
  ]
});

addPerson('robert-maxwell', {
  name: 'Robert Maxwell',
  bio: 'Czech-born British media baron (1923-1991) who built Maxwell Communications Corporation into one of the largest media conglomerates in the world. He died after falling from his yacht under mysterious circumstances. Post-mortem, it was revealed he had looted hundreds of millions from company pension funds. He has been widely alleged to have been an agent or asset of Israeli intelligence (Mossad). Father of Ghislaine Maxwell.',
  affiliations: [
    { organization: 'Maxwell Communications Corporation', role: 'Founder and Chairman', country: 'United Kingdom', entryId: 'maxwell-communications' }
  ]
});

addPerson('geoffrey-berman', {
  name: 'Geoffrey Berman',
  bio: 'American attorney who served as US Attorney for the SDNY from 2018 to 2020. He oversaw the Epstein prosecution and arrest. He was controversially fired by Attorney General William Barr in June 2020 and later wrote a memoir alleging political interference in cases.',
  affiliations: [
    { organization: 'Southern District of New York (SDNY)', role: 'Former US Attorney', country: 'United States', entryId: 'sdny' }
  ]
});

addPerson('michael-reiter', {
  name: 'Michael Reiter',
  bio: 'Former Palm Beach Police Chief who initiated and led the first comprehensive investigation into Jeffrey Epstein beginning in 2005. He pushed for federal involvement when the local state attorney refused to file felony charges.',
  affiliations: [
    { organization: 'Palm Beach Police Department', role: 'Former Chief', country: 'United States', entryId: 'palm-beach-police' }
  ]
});

addPerson('denise-george', {
  name: 'Denise George',
  bio: 'Former Attorney General of the US Virgin Islands who filed a landmark civil enforcement action against JPMorgan Chase for facilitating Epstein sex trafficking operation. She was fired shortly after filing the suit.',
  affiliations: [
    { organization: 'US Virgin Islands (Government)', role: 'Former Attorney General', country: 'United States', entryId: 'us-virgin-islands-gov' }
  ]
});

addPerson('ari-ben-menashe', {
  name: 'Ari Ben-Menashe',
  bio: 'Iranian-born Israeli intelligence operative who later became a political consultant. He publicly claimed that both Robert Maxwell and Jeffrey Epstein were connected to Israeli intelligence operations and that Epstein ran a sexual blackmail operation for intelligence purposes.',
  affiliations: [
    { organization: 'Mossad (Israeli Intelligence)', role: 'Former Operative', country: 'Israel', entryId: 'mossad-israeli-intelligence' }
  ]
});

addPerson('robert-mueller', {
  name: 'Robert Mueller',
  bio: 'American attorney who served as FBI Director from 2001 to 2013, overlapping with periods when Epstein complaints were known to the bureau. Later served as Special Counsel investigating Russian interference in the 2016 election.',
  affiliations: [
    { organization: 'Federal Bureau of Investigation (FBI)', role: 'Former Director (2001-2013)', country: 'United States', entryId: 'fbi' }
  ]
});

addPerson('seth-lloyd', {
  name: 'Seth Lloyd',
  bio: 'American mechanical engineer and professor at MIT who accepted research funding from Jeffrey Epstein for quantum computing work. He was placed on paid leave by MIT in 2020 after the Epstein funding revelations.',
  affiliations: [
    { organization: 'MIT Media Lab', role: 'Professor', country: 'United States', entryId: 'mit-media-lab' }
  ]
});

// ═══════════════════════════════════════════════════════
// 7. SAVE
// ═══════════════════════════════════════════════════════
fs.writeFileSync(JD_PATH, JSON.stringify(jd, null, 2));
fs.writeFileSync(PD_PATH, JSON.stringify(pd, null, 2));

// Rebuild maps and count totals
rebuildMaps();
let totalEntries = 0, totalConns = 0, totalPeople = Object.keys(pd.people).length;
const cats = new Set();
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    totalEntries++;
    if (e.category) cats.add(e.category);
    if (e.connections) totalConns += e.connections.length;
  }
}

console.log('\n=== RESULTS ===');
console.log('Dashes fixed:', dashFixes);
console.log('Connection references fixed:', connFixed);
console.log('New entries added:', newEntries);
console.log('New people added:', newPeople);
console.log('Total entries:', totalEntries);
console.log('Total countries:', Object.keys(jd.countries).length);
console.log('Total people:', totalPeople);
console.log('Total connections:', totalConns);
console.log('Total categories:', cats.size);
