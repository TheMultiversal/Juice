/**
 * Major data expansion - Feb 2026
 * Adds: Epstein network, expanded AIPAC, hundreds of new orgs, people, connections
 */
const fs = require('fs');
const path = require('path');

const jewishPath = path.join(__dirname, '..', 'data', 'jewish.json');
const peoplePath = path.join(__dirname, '..', 'data', 'people.json');
const countriesPath = path.join(__dirname, '..', 'data', 'countries.json');

const jd = JSON.parse(fs.readFileSync(jewishPath, 'utf8'));
const pd = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
const cd = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

// Track existing IDs
const existingIds = new Set();
const existingNames = new Set();
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    existingIds.add(e.id);
    existingNames.add(e.name.toLowerCase());
  }
}

function addEntry(country, entry) {
  if (existingIds.has(entry.id) || existingNames.has(entry.name.toLowerCase())) return false;
  if (!jd.countries[country]) { jd.countries[country] = []; if (!cd.includes(country)) cd.push(country); }
  jd.countries[country].push(entry);
  existingIds.add(entry.id);
  existingNames.add(entry.name.toLowerCase());
  return true;
}

function addPerson(id, data) {
  if (pd.people[id]) {
    // Merge affiliations
    if (data.affiliations) {
      if (!pd.people[id].affiliations) pd.people[id].affiliations = [];
      for (const aff of data.affiliations) {
        const exists = pd.people[id].affiliations.some(a => a.organization === aff.organization && a.role === aff.role);
        if (!exists) pd.people[id].affiliations.push(aff);
      }
    }
    if (data.bio && (!pd.people[id].bio || data.bio.length > pd.people[id].bio.length)) {
      pd.people[id].bio = data.bio;
    }
    return false;
  }
  pd.people[id] = data;
  return true;
}

let addedEntries = 0, addedPeople = 0, updatedPeople = 0;

// ============================================================================
// JEFFREY EPSTEIN - Comprehensive Network
// ============================================================================
if (addEntry('United States', {
  id: 'jeffrey-epstein-network',
  name: 'Jeffrey Epstein Network',
  type: 'criminal enterprise / financial network',
  category: 'Notable Individuals',
  founded: 1982,
  description: 'Jeffrey Edward Epstein (1953-2019) was an American financier and convicted sex offender who built one of the most extensive and shadowy networks in modern history, connecting finance, politics, academia, royalty, and intelligence. Born in Brooklyn to a Jewish family, Epstein taught at the Dalton School before joining Bear Stearns in 1976, where he became a limited partner. He founded his own firm, J. Epstein & Co., in 1982, claiming to manage money exclusively for billionaires. His primary known client was Leslie Wexner, founder of L Brands (Victoria\'s Secret, Bath & Body Works), who granted Epstein sweeping power of attorney and gifted him a $77 million Manhattan townhouse - one of the largest private residences in New York. Epstein cultivated relationships with presidents (Bill Clinton, Donald Trump), princes (Prince Andrew), prime ministers, Nobel laureates, tech moguls, and Hollywood figures. He was first arrested in 2006 in Palm Beach, Florida, for soliciting prostitution from minors. A controversial 2008 plea deal negotiated by Alexander Acosta (later Trump\'s Labor Secretary) allowed Epstein to plead to state charges and serve just 13 months with work release. In July 2019, Epstein was arrested on federal sex trafficking charges. He was found dead in his cell at the Metropolitan Correctional Center on August 10, 2019, with his death ruled a suicide by hanging - a conclusion widely disputed. His associate Ghislaine Maxwell was convicted in 2021 on five of six charges of sex trafficking. Epstein\'s estate was valued at over $634 million. The full scope of his financial operations, intelligence connections, and the source of his wealth remain subjects of intense speculation and investigation.',
  website: '',
  individuals: [
    { id: 'jeffrey-epstein', name: 'Jeffrey Epstein', role: 'Financier & Convicted Sex Offender (1953-2019)', bio: 'American financier and convicted sex offender. Born in Brooklyn to a Jewish family. Taught at Dalton School, worked at Bear Stearns, then founded J. Epstein & Co. Arrested in 2006 and 2019 for sex trafficking of minors. Found dead in his cell at MCC New York on August 10, 2019. Death ruled suicide, widely disputed.' },
    { id: 'ghislaine-maxwell', name: 'Ghislaine Maxwell', role: 'Associate & Convicted Sex Trafficker', bio: 'British socialite and daughter of media baron Robert Maxwell. Convicted in December 2021 on five of six counts of sex trafficking and conspiracy. Sentenced to 20 years in federal prison. Alleged to have been Epstein\'s primary recruiter and groomer of victims.' },
    { id: 'jean-luc-brunel', name: 'Jean-Luc Brunel', role: 'Associate & Modeling Agent (1946-2022)', bio: 'French modeling agent and founder of MC2 Model Management, funded by Epstein. Accused of trafficking and abusing young models. Found dead in his Paris jail cell in February 2022 while awaiting trial, officially ruled suicide.' },
    { id: 'sarah-kellen', name: 'Sarah Kellen', role: 'Personal Assistant / Alleged Recruiter', bio: 'One of Epstein\'s closest personal assistants. Named as a co-conspirator in court documents. Alleged to have scheduled appointments with underage victims.' },
    { id: 'nadia-marcinkova', name: 'Nadia Marcinkova', role: 'Associate / Alleged Participant', bio: 'Named in court documents as having been brought to the US by Epstein as a teenager from the former Yugoslavia. Later became a pilot. Named as alleged co-conspirator.' },
    { id: 'lesley-groff', name: 'Lesley Groff', role: 'Executive Assistant', bio: 'Long-time Epstein executive assistant named as co-conspirator in multiple court filings.' }
  ],
  connections: [
    { name: 'Bear Stearns (historic)', type: 'former employer', description: 'Epstein joined Bear Stearns in 1976 and became a limited partner before leaving in 1981.' },
    { name: 'Wexner Foundation', type: 'primary client', description: 'Leslie Wexner was Epstein\'s primary known client. Wexner granted Epstein power of attorney and transferred his NYC townhouse and other assets.', entryId: 'wexner-foundation' },
    { name: 'JPMorgan Chase', type: 'banking relationship', description: 'JPMorgan maintained Epstein as a client from 1998 to 2013 despite red flags. Paid $290 million settlement in 2023 to Epstein victims.', entryId: 'jpmorgan-chase' },
    { name: 'Deutsche Bank', type: 'banking relationship', description: 'Deutsche Bank maintained Epstein accounts from 2013-2019 after JPMorgan dropped him. Paid $150 million in penalties for compliance failures.', entryId: 'deutsche-bank' },
    { name: 'Barclays', type: 'banking relationship', description: 'Barclays maintained financial relationships with Epstein through its wealth management division.', entryId: 'barclays' },
    { name: 'Harvard University', type: 'donor / science funding', description: 'Epstein donated at least $9.1 million to Harvard. Visited campus over 40 times after his 2008 conviction. Martin Nowak\'s Program for Evolutionary Dynamics received major funding.', entryId: 'harvard-university' },
    { name: 'MIT Media Lab', type: 'donor', description: 'Epstein donated at least $850,000 to MIT, some disguised through intermediaries. Director Joi Ito resigned in 2019 after revelations.' },
    { name: 'Leon Black / Apollo Global Management', type: 'financial client', description: 'Leon Black paid Epstein $158 million for tax and estate planning advice between 2012-2017. Black stepped down as Apollo CEO in 2021.', entryId: 'apollo-global-management' },
    { name: 'Victoria\'s Secret (L Brands)', type: 'business connection', description: 'Epstein allegedly posed as a talent scout for Victoria\'s Secret to recruit young women. Les Wexner was the brand\'s owner.' },
    { name: 'Bill Clinton', type: 'political connection', description: 'Former President Clinton flew on Epstein\'s plane at least 26 times according to flight logs. Clinton acknowledged limited interactions.' },
    { name: 'Donald Trump', type: 'political connection', description: 'Trump and Epstein socialized in the 1990s-2000s in Palm Beach and New York. Trump later said he banned Epstein from Mar-a-Lago.' },
    { name: 'Prince Andrew', type: 'royal connection', description: 'The Duke of York maintained a close friendship with Epstein spanning decades. Virginia Giuffre accused Andrew of sexual abuse, leading to a civil settlement in 2022.' },
    { name: 'Ehud Barak', type: 'political connection', description: 'Former Israeli PM Ehud Barak visited Epstein\'s residences and received investments from Epstein in his tech venture Carbyne.' },
    { name: 'Les Wexner', type: 'primary patron', description: 'Billionaire retail magnate and Epstein\'s primary patron. Only known major client. Claimed Epstein misappropriated over $46 million.' },
    { name: 'Alan Dershowitz', type: 'legal defense', description: 'Harvard law professor who helped negotiate Epstein\'s 2008 plea deal. Accused by Virginia Giuffre.' },
    { name: 'Alexander Acosta', type: 'plea deal', description: 'US Attorney who approved Epstein\'s controversial 2008 plea deal. Later became Trump\'s Labor Secretary, resigned in 2019.' },
    { name: 'Ghislaine Maxwell', type: 'key associate', description: 'Epstein\'s primary accomplice. Daughter of Robert Maxwell. Convicted of sex trafficking in 2021.' },
    { name: 'Robert Maxwell / Maxwell Communications', type: 'family connection', description: 'Ghislaine\'s father Robert Maxwell was a Czech-born British media mogul suspected of ties to Mossad, MI6, and KGB. Died under mysterious circumstances in 1991.' },
    { name: 'Mossad (alleged)', type: 'alleged intelligence ties', description: 'Multiple sources allege Epstein had connections to Israeli intelligence through Robert Maxwell and Ghislaine. Former Israeli intelligence operative Ari Ben-Menashe claimed Epstein was recruited.' },
    { name: 'Palm Beach Police Department', type: 'initial investigation', description: 'Palm Beach PD conducted the initial investigation in 2005-2006 that identified dozens of underage victims.' },
    { name: 'FBI', type: 'federal investigation', description: 'FBI conducted extensive investigation. 2019 indictment on federal sex trafficking charges.' },
    { name: 'Dalton School', type: 'former employer', description: 'Epstein taught at the elite Manhattan prep school from 1974-1976, hired by headmaster Donald Barr (father of AG Bill Barr).' },
    { name: 'Southern District of New York', type: 'prosecution', description: 'SDNY brought the 2019 federal case against Epstein.' },
    { name: 'Council on Foreign Relations (CFR)', type: 'member', description: 'Epstein was a member of the CFR and the Trilateral Commission.' },
    { name: 'Elon Musk', type: 'acquaintance', description: 'Ghislaine Maxwell photographed with Musk in 2014. Musk acknowledged meeting Epstein once.' },
    { name: 'Bill Gates', type: 'meetings', description: 'Gates met with Epstein multiple times 2011-2014. Gates Foundation donated $2M to MIT at Epstein\'s direction. Melinda cited these meetings as factor in 2021 divorce.' },
    { name: 'Woody Allen', type: 'socialite circle', description: 'Allen socialized with Epstein. Photographed walking with Epstein in 2013.' },
    { name: 'George Stephanopoulos', type: 'socialite circle', description: 'ABC anchor attended a 2010 dinner party at Epstein\'s Manhattan mansion.' },
    { name: 'Joi Ito / MIT Media Lab', type: 'funding relationship', description: 'MIT Media Lab director who secretly accepted Epstein donations. Resigned September 2019.' },
    { name: 'Leon Black', type: 'client', description: 'Apollo Global co-founder paid Epstein $158 million for financial advice.', entryId: 'apollo-global-management' },
    { name: 'Reid Hoffman', type: 'meetings', description: 'LinkedIn co-founder attended an Epstein dinner in 2015, later apologized.' },
    { name: 'US Virgin Islands', type: 'private island', description: 'Epstein owned Little St. James and Great St. James islands where much of the abuse allegedly occurred.' },
    { name: 'Metropolitan Correctional Center', type: 'death location', description: 'Federal facility where Epstein was found dead August 10, 2019. Two guards charged with falsifying records.' },
    { name: 'Steve Bannon', type: 'post-arrest contact', description: 'Bannon reportedly met with Epstein in 2018 at his NYC townhouse.' },
    { name: 'Goldman Sachs (historic)', type: 'financial system', description: 'Part of the Wall Street network that facilitated Epstein\'s financial operations.', entryId: 'goldman-sachs-historic' }
  ]
})) addedEntries++;

// Add Epstein to people.json
if (addPerson('jeffrey-epstein', {
  name: 'Jeffrey Epstein',
  bio: 'American financier and convicted sex offender (1953-2019). Born in Brooklyn to a Jewish family. Worked at Bear Stearns, then founded J. Epstein & Co. His only known major client was Leslie Wexner. Arrested in 2006, re-arrested in 2019 on federal sex trafficking charges. Found dead in MCC New York on August 10, 2019. Estate valued at $634M+.',
  affiliations: [
    { organization: 'Jeffrey Epstein Network', role: 'Financier', country: 'United States', religion: 'jewish', entryId: 'jeffrey-epstein-network' }
  ]
})) addedPeople++;

if (addPerson('ghislaine-maxwell', {
  name: 'Ghislaine Maxwell',
  bio: 'British socialite, daughter of media baron Robert Maxwell. Convicted in 2021 on five counts of sex trafficking. Sentenced to 20 years.',
  affiliations: [
    { organization: 'Jeffrey Epstein Network', role: 'Associate & Convicted Sex Trafficker', country: 'United States', religion: 'jewish', entryId: 'jeffrey-epstein-network' }
  ]
})) addedPeople++;

if (addPerson('jean-luc-brunel', {
  name: 'Jean-Luc Brunel',
  bio: 'French modeling agent (1946-2022). Founded MC2 Model Management with Epstein funding. Found dead in Paris prison cell in Feb 2022.',
  affiliations: [
    { organization: 'Jeffrey Epstein Network', role: 'Associate & Modeling Agent', country: 'United States', religion: 'jewish', entryId: 'jeffrey-epstein-network' }
  ]
})) addedPeople++;

if (addPerson('alan-dershowitz', {
  name: 'Alan Dershowitz',
  bio: 'American lawyer and Harvard Law School professor emeritus. Helped negotiate Epstein\'s 2008 plea deal. Has represented O.J. Simpson, Harvey Weinstein, Trump (first impeachment).',
  affiliations: [
    { organization: 'Jeffrey Epstein Network', role: 'Legal Defense Attorney', country: 'United States', religion: 'jewish', entryId: 'jeffrey-epstein-network' },
    { organization: 'Harvard University', role: 'Professor Emeritus of Law', country: 'United States', religion: 'jewish', entryId: 'harvard-university' }
  ]
})) addedPeople++;

// ============================================================================
// EXPANDED AIPAC
// ============================================================================
for (const c in jd.countries) {
  for (let i = 0; i < jd.countries[c].length; i++) {
    if (jd.countries[c][i].id === 'aipac') {
      const aipac = jd.countries[c][i];
      
      const newIndividuals = [
        { id: 'mort-fridman', name: 'Mort Fridman', role: 'Former President', bio: 'Former AIPAC president who expanded the organization\'s grassroots network.' },
        { id: 'robert-asher', name: 'Robert Asher', role: 'Former President', bio: 'Prominent AIPAC leader and major pro-Israel donor from Chicago.' },
        { id: 'david-steiner', name: 'David Steiner', role: 'Former President (resigned 1992)', bio: 'Resigned after a recorded phone call revealed boasts about influence over US foreign policy appointments.' },
        { id: 'tom-dine', name: 'Tom Dine', role: 'Former Executive Director (1980-1993)', bio: 'Transformed AIPAC from a small lobbying shop into a political powerhouse.' },
        { id: 'keith-weissman', name: 'Keith Weissman', role: 'Former Iran Analyst (Espionage Case)', bio: 'Charged under the Espionage Act in 2005 alongside Steve Rosen. Charges dropped in 2009.' },
        { id: 'morris-amitay', name: 'Morris J. Amitay', role: 'Executive Director (1974-1980)', bio: 'Headed AIPAC during Camp David Accords era. Later founded Washington PAC.' },
        { id: 'lillian-pinkus', name: 'Lillian Pinkus', role: 'Former President (2016-2018)', bio: 'First female president of AIPAC.' },
        { id: 'rob-bassin', name: 'Rob Bassin', role: 'National Political Director', bio: 'Oversees AIPAC\'s political engagement and candidate evaluation.' }
      ];

      const existIndivIds = new Set(aipac.individuals.map(ind => ind.id));
      for (const ind of newIndividuals) {
        if (!existIndivIds.has(ind.id)) {
          aipac.individuals.push(ind);
          if (addPerson(ind.id, {
            name: ind.name,
            bio: ind.bio,
            affiliations: [{ organization: 'AIPAC (American Israel Public Affairs Committee)', role: ind.role, country: 'United States', religion: 'jewish', entryId: 'aipac' }]
          })) addedPeople++;
        }
      }

      const newConnections = [
        { name: 'US Senate', type: 'lobbying target', description: 'AIPAC lobbies virtually every US Senator on Israel-related legislation, military aid, and sanctions.' },
        { name: 'US House of Representatives', type: 'lobbying target', description: 'AIPAC maintains relationships with nearly every House member regardless of party.' },
        { name: 'US Department of State', type: 'policy influence', description: 'AIPAC advocates for pro-Israel positions in US foreign policy.' },
        { name: 'US Department of Defense', type: 'defense aid', description: 'AIPAC lobbied for the $38 billion 10-year military aid package signed in 2016.' },
        { name: 'Israeli Embassy (Washington)', type: 'diplomatic coordination', description: 'AIPAC coordinates closely with the Israeli Embassy on legislative priorities.' },
        { name: 'Christians United for Israel (CUFI)', type: 'pro-Israel ally', description: 'Largest pro-Israel organization in the US with 10M+ members.' },
        { name: 'Birthright Israel Foundation', type: 'pro-Israel ecosystem', description: 'Overlapping donors and shared mission to strengthen US-Israel ties.' },
        { name: 'StandWithUs', type: 'pro-Israel peer', description: 'Israel education and advocacy organization aligned with AIPAC.' },
        { name: 'American Jewish Committee (AJC)', type: 'Jewish communal partner', description: 'AJC and AIPAC coordinate on US-Israel policy.' },
        { name: 'Jewish Federations of North America', type: 'communal partner', description: 'JFNA works alongside AIPAC on community issues and Israel advocacy.' },
        { name: 'Brookings Institution', type: 'think tank engagement', description: 'Saban Center at Brookings conducts Middle East policy research.' },
        { name: 'Heritage Foundation', type: 'conservative ally', description: 'Heritage and AIPAC often align on defense of Israel and opposition to Iran.' },
        { name: 'Foundation for Defense of Democracies (FDD)', type: 'hawkish ally', description: 'FDD and AIPAC share hardline positions on Iran sanctions.' },
        { name: 'Iran (Islamic Republic)', type: 'opposition target', description: 'AIPAC\'s top priority has been opposition to Iran\'s nuclear program and maximum sanctions.' },
        { name: 'Barack Obama', type: 'political tension', description: 'Significant tension during the JCPOA when AIPAC spent millions opposing the deal.' },
        { name: 'Bernie Sanders', type: 'political opposition', description: 'Sanders has criticized AIPAC and declined to attend its conferences.' },
        { name: 'Ilhan Omar', type: 'political controversy', description: 'Rep. Omar\'s 2019 comments about AIPAC sparked a national debate about antisemitism and lobbying.' },
        { name: 'Rashida Tlaib', type: 'political opposition', description: 'First Palestinian-American congresswoman, vocal AIPAC critic.' },
        { name: 'NORPAC', type: 'pro-Israel PAC ally', description: 'Major pro-Israel PAC aligned with AIPAC priorities.' },
        { name: 'B\'nai B\'rith International', type: 'Jewish communal peer', description: 'Oldest Jewish service organization, coordinates with AIPAC.' },
        { name: 'Sheldon Adelson', type: 'major donor', description: 'One of the most influential figures in pro-Israel politics.' },
        { name: 'Haim Saban', type: 'major donor', description: 'Israeli-American media mogul. Said his three priorities are "Israel, Israel, and Israel."' },
        { name: 'Paul Singer', type: 'donor', description: 'Billionaire hedge fund manager and major Republican donor supporting AIPAC-aligned policy.' },
        { name: 'Netanyahu Government', type: 'diplomatic relationship', description: 'Close ties with Netanyahu, complicated by partisan dynamics.' },
        { name: 'Abraham Accords', type: 'advocacy success', description: 'AIPAC supported normalization agreements with UAE, Bahrain, Sudan, Morocco.' },
        { name: 'Iron Dome', type: 'appropriations advocacy', description: 'AIPAC lobbied for billions in US funding for Iron Dome.' },
        { name: 'BDS Movement', type: 'primary opposition', description: 'AIPAC leads lobbying for anti-BDS legislation at state and federal levels.' },
        { name: 'Jewish Voice for Peace', type: 'intra-communal opposition', description: 'JVP opposes AIPAC from the Jewish left, supporting BDS.' },
        { name: 'IfNotNow', type: 'intra-communal opposition', description: 'Progressive Jewish group that has staged protests at AIPAC conferences.' },
        { name: 'JINSA', type: 'defense policy ally', description: 'Jewish Institute for National Security of America, aligned on military aid.' },
        { name: 'Charles Schumer', type: 'key congressional ally', description: 'Senate Majority Leader, calls himself Israel\'s "shomer" (guardian).' },
        { name: 'Nancy Pelosi', type: 'congressional ally', description: 'Former Speaker has attended AIPAC conferences and championed US-Israel relations.' },
        { name: 'Mitch McConnell', type: 'bipartisan congressional ally', description: 'Worked with AIPAC on military aid and anti-BDS legislation.' },
        { name: 'Ted Cruz', type: 'congressional ally', description: 'Strong AIPAC conference presence and hawkish Israel advocate.' },
        { name: 'Marco Rubio', type: 'congressional ally', description: 'One of AIPAC\'s closest Senate allies on Israel, Iran, and anti-BDS.' },
        { name: 'Human Rights Watch', type: 'adversary', description: 'AIPAC has criticized HRW reports on Israel.' },
        { name: 'Amnesty International', type: 'adversary', description: 'AIPAC has pushed back against Amnesty\'s characterizations of Israeli policies.' }
      ];

      const existConnNames = new Set(aipac.connections.map(cn => cn.name.toLowerCase()));
      for (const conn of newConnections) {
        if (!existConnNames.has(conn.name.toLowerCase())) {
          aipac.connections.push(conn);
        }
      }

      aipac.description = 'The American Israel Public Affairs Committee (AIPAC) is the most powerful pro-Israel lobbying organization in the United States and arguably the world. Founded in 1951 by Isaiah L. "Si" Kenen (who had previously been registered as a foreign agent for Israel), AIPAC mobilizes over 100,000 members to lobby Congress on US-Israel relations. Its annual policy conference draws 15,000-20,000 attendees including a majority of Congress. In 2022, AIPAC launched the United Democracy Project super PAC, spending over $100 million in the 2022 and 2024 cycles. The AIPAC PAC directly endorses candidates. AIPAC helped secure the $38B 10-year military aid MOU (2016), annual Iron Dome funding, and anti-BDS legislation in 35+ states. In 2005, employees Steve Rosen and Keith Weissman were charged under the Espionage Act (charges dropped 2009). In 1992, president David Steiner resigned after a recorded phone call. Critics Mearsheimer and Walt\'s "The Israel Lobby" (2007) focused heavily on AIPAC. The organization has become polarizing, with progressive Democrats openly critical while it maintains strong bipartisan establishment support.';

      break;
    }
  }
}

// ============================================================================
// ADL (ANTI-DEFAMATION LEAGUE)
// ============================================================================
if (addEntry('United States', {
  id: 'anti-defamation-league-adl',
  name: 'Anti-Defamation League (ADL)',
  type: 'advocacy / civil rights organization',
  category: 'Advocacy & Political Organizations',
  founded: 1913,
  description: 'The Anti-Defamation League is one of the oldest and most influential Jewish advocacy organizations. Founded in 1913 by Sigmund Livingston under B\'nai B\'rith in response to the lynching of Leo Frank. Under Abraham Foxman (1987-2015) and current CEO Jonathan Greenblatt, the ADL has expanded from anti-antisemitism to hate crime tracking, cyberbullying prevention, and combating extremism. The ADL\'s annual audit of antisemitic incidents is the most widely cited source. In 1993, the ADL was found running a secret spy network collecting files on 12,000+ individuals and 600 organizations, sharing intelligence with Israeli and South African services. Annual budget over $100 million.',
  website: 'https://www.adl.org/',
  individuals: [
    { id: 'jonathan-greenblatt', name: 'Jonathan Greenblatt', role: 'CEO & National Director (2015-present)', bio: 'Former Obama White House advisor. Has expanded ADL into tech policy and social media content moderation.' },
    { id: 'abraham-foxman', name: 'Abraham Foxman', role: 'National Director (1987-2015)', bio: 'Holocaust survivor who led ADL for 28 years. Born in Poland, saved by his Catholic nanny during the Holocaust.' },
    { id: 'sigmund-livingston', name: 'Sigmund Livingston', role: 'Founder (1913)', bio: 'Chicago attorney who founded the ADL as a committee of B\'nai B\'rith.' }
  ],
  connections: [
    { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'advocacy peer', description: 'Both are leading Jewish advocacy organizations.', entryId: 'aipac' },
    { name: 'B\'nai B\'rith International', type: 'parent organization (historic)', description: 'ADL was founded as a committee of B\'nai B\'rith in 1913. Became independent in 2018.', entryId: 'bnai-brith-international' },
    { name: 'FBI', type: 'law enforcement partnership', description: 'ADL trains FBI agents on hate crimes and extremism.' },
    { name: 'Facebook / Meta', type: 'content moderation', description: 'ADL works with Meta on hate speech content moderation.' },
    { name: 'Twitter / X', type: 'content policy', description: 'ADL clashed with Elon Musk over hate speech on X.' },
    { name: 'Google', type: 'tech partnership', description: 'ADL partners with Google on counter-extremism.' },
    { name: 'Conference of Presidents of Major American Jewish Organizations', type: 'member', description: 'ADL is a member of the umbrella organization.' },
    { name: 'Israeli Government', type: 'advocacy relationship', description: 'ADL coordinates with Israeli officials on antisemitism.' },
    { name: 'Southern Poverty Law Center', type: 'civil rights peer', description: 'Both track hate groups.' },
    { name: 'Simon Wiesenthal Center', type: 'advocacy peer', description: 'Both track antisemitism and hate crimes.' }
  ]
})) addedEntries++;

// ============================================================================
// B'NAI B'RITH
// ============================================================================
if (addEntry('United States', {
  id: 'bnai-brith-international',
  name: 'B\'nai B\'rith International',
  type: 'fraternal / service organization',
  category: 'Community & Social Organizations',
  founded: 1843,
  description: 'B\'nai B\'rith ("Sons of the Covenant") is the oldest Jewish service organization in the world. Founded October 13, 1843, by 12 German-Jewish immigrants in Manhattan. At its peak in the 1930s it had 500,000+ members. Founded the ADL (1913) and Hillel (1923). Maintains UN consultative status and operates 40+ affordable senior housing buildings in the US.',
  website: 'https://www.bnaibrith.org/',
  individuals: [
    { id: 'daniel-s-mariaschin', name: 'Daniel S. Mariaschin', role: 'Executive VP & CEO', bio: 'Has led B\'nai B\'rith since the 1990s.' }
  ],
  connections: [
    { name: 'Anti-Defamation League (ADL)', type: 'founded (1913)', description: 'B\'nai B\'rith founded the ADL. ADL became independent in 2018.', entryId: 'anti-defamation-league-adl' },
    { name: 'Hillel International', type: 'founded (1923)', description: 'B\'nai B\'rith founded Hillel. Hillel independent since 1994.' },
    { name: 'United Nations', type: 'consultative status', description: 'B\'nai B\'rith has held UN consultative status since 1947.' },
    { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'pro-Israel ally', description: 'Both advocate for US-Israel relations.', entryId: 'aipac' },
    { name: 'World Jewish Congress', type: 'peer', description: 'Both represent Jewish communities globally.', entryId: 'world-jewish-congress' }
  ]
})) addedEntries++;

// ============================================================================
// AJC
// ============================================================================
if (addEntry('United States', {
  id: 'american-jewish-committee-ajc',
  name: 'American Jewish Committee (AJC)',
  type: 'advocacy / diplomatic organization',
  category: 'Advocacy & Political Organizations',
  founded: 1906,
  description: 'One of the oldest Jewish advocacy organizations. Founded in 1906 by Jacob Schiff, Cyrus Adler, and Louis Marshall in response to Russian pogroms. Pioneered interreligious dialogue including Catholic-Jewish ties after Vatican II. Founded Commentary magazine (1945). CEO Ted Deutch (former US Congressman) since 2022. Maintains 25+ global offices.',
  website: 'https://www.ajc.org/',
  individuals: [
    { id: 'ted-deutch', name: 'Ted Deutch', role: 'CEO (2022-present)', bio: 'Former US Congressman from Florida.' },
    { id: 'david-harris-ajc', name: 'David Harris', role: 'CEO (1990-2022)', bio: 'Led AJC for 30+ years, called "dean of American Jewish leaders."' }
  ],
  connections: [
    { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'advocacy peer', description: 'Both are leading Jewish organizations.', entryId: 'aipac' },
    { name: 'Anti-Defamation League (ADL)', type: 'advocacy peer', description: 'AJC and ADL are the two most prominent American Jewish advocacy groups.', entryId: 'anti-defamation-league-adl' },
    { name: 'Vatican', type: 'interfaith pioneer', description: 'Key role in Catholic-Jewish reconciliation and Nostra Aetate (1965).' },
    { name: 'Commentary Magazine', type: 'founded', description: 'AJC founded Commentary in 1945.' },
    { name: 'United Nations', type: 'consultative status', description: 'AJC holds UN consultative status.' }
  ]
})) addedEntries++;

// ============================================================================
// JFNA
// ============================================================================
if (addEntry('United States', {
  id: 'jewish-federations-of-north-america',
  name: 'Jewish Federations of North America (JFNA)',
  type: 'umbrella / philanthropic organization',
  category: 'Charity & Philanthropy',
  founded: 1999,
  description: 'Umbrella for 146 Jewish Federations and 300+ independent communities, constituting the largest Jewish charitable network in the world. Raises and distributes over $3 billion annually. Emerged from the 1999 merger of UJA, CJF, and United Israel Appeal. Funds Jewish education, social services, Israel agencies, and community security.',
  website: 'https://www.jewishfederations.org/',
  individuals: [
    { id: 'eric-fingerhut', name: 'Eric Fingerhut', role: 'President & CEO', bio: 'Former US Congressman from Ohio.' }
  ],
  connections: [
    { name: 'Jewish Agency for Israel', type: 'funding partner', description: 'JFNA provides hundreds of millions annually.', entryId: 'jewish-agency-for-israel' },
    { name: 'American Jewish Joint Distribution Committee (JDC)', type: 'funding partner', description: 'JFNA is the primary funder of JDC.', entryId: 'american-jewish-joint-distribution-committee' },
    { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'communal partner', description: 'Coordinates on Israel-related advocacy.', entryId: 'aipac' },
    { name: 'Hillel International', type: 'funding partner', description: 'Federations fund campus Hillel chapters.' },
    { name: 'Birthright Israel (Taglit)', type: 'funder', description: 'Jewish Federations are major Birthright funders.', entryId: 'birthright-israel-taglit' }
  ]
})) addedEntries++;

// ============================================================================
// HADASSAH
// ============================================================================
if (addEntry('United States', {
  id: 'hadassah-womens-zionist-org',
  name: 'Hadassah (Women\'s Zionist Organization of America)',
  type: 'women\'s / healthcare / Zionist organization',
  category: 'Advocacy & Political Organizations',
  founded: 1912,
  description: 'Largest Jewish women\'s organization in the US with ~300,000 members. Founded by Henrietta Szold in 1912. Operates Hadassah Medical Organization - two hospitals in Jerusalem treating 1M+ patients annually regardless of background. Israel\'s largest hospital and the largest American healthcare provider in Israel.',
  website: 'https://www.hadassah.org/',
  individuals: [
    { id: 'henrietta-szold', name: 'Henrietta Szold', role: 'Founder (1860-1945)', bio: 'Founded Hadassah, led Youth Aliyah rescuing thousands of children from Nazi Europe.' }
  ],
  connections: [
    { name: 'Hadassah Medical Center (Jerusalem)', type: 'founded / operates', description: 'Operates Israel\'s largest hospital complex.' },
    { name: 'World Zionist Organization', type: 'member', description: 'Hadassah is a constituent of the WZO.' },
    { name: 'Hebrew University of Jerusalem', type: 'campus partner', description: 'Hadassah hospitals affiliated with Hebrew U.', entryId: 'hebrew-university-of-jerusalem' },
    { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'pro-Israel ally', description: 'Both advocate for US-Israel relations.', entryId: 'aipac' }
  ]
})) addedEntries++;

// ============================================================================
// CHABAD-LUBAVITCH
// ============================================================================
if (addEntry('United States', {
  id: 'chabad-lubavitch',
  name: 'Chabad-Lubavitch',
  type: 'Hasidic movement / religious organization',
  category: 'Religion & Synagogues',
  founded: 1775,
  description: 'One of the world\'s largest Hasidic Jewish movements, known for outreach (kiruv) to secular Jews. Founded in 1775 by Rabbi Schneur Zalman of Liadi. Under the 7th Rebbe, Menachem Mendel Schneerson (1902-1994), Chabad transformed into a global operation with 5,000+ emissary families in 100+ countries. Annual budget across all centers estimated at $2+ billion. Target of 2008 Mumbai terrorist attack.',
  website: 'https://www.chabad.org/',
  individuals: [
    { id: 'menachem-mendel-schneerson', name: 'Rabbi Menachem Mendel Schneerson', role: 'The Rebbe (1902-1994)', bio: 'Transformed Chabad into a global outreach movement. Congressional Gold Medal recipient. Some followers believe he is the Messiah.' },
    { id: 'yehuda-krinsky', name: 'Rabbi Yehuda Krinsky', role: 'Chairman, Merkos & Machne Israel', bio: 'De facto administrative leader since 1994.' }
  ],
  connections: [
    { name: 'Israel', type: 'spiritual homeland', description: 'Massive presence in Israel with hundreds of centers.' },
    { name: 'US Congress', type: 'Education and Sharing Day', description: 'Congress established "Education and Sharing Day, U.S.A." in honor of the Rebbe, proclaimed annually since 1978.' },
    { name: 'Birthright Israel (Taglit)', type: 'trip provider', description: 'Chabad runs several Birthright trip tracks.', entryId: 'birthright-israel-taglit' },
    { name: 'Rohr Family', type: 'major benefactors', description: 'George Rohr family are the single largest Chabad funders worldwide.' }
  ]
})) addedEntries++;

// ============================================================================
// BIRTHRIGHT ISRAEL
// ============================================================================
if (addEntry('United States', {
  id: 'birthright-israel-taglit',
  name: 'Birthright Israel (Taglit)',
  type: 'educational / cultural organization',
  category: 'Education & Academia',
  founded: 1999,
  description: 'Free 10-day heritage trips to Israel for Jewish adults 18-32. Co-founded by Charles Bronfman and Michael Steinhardt. Over 800,000 participants from 68 countries since 1999. Annual budget $200M+. Sheldon Adelson was the largest donor ($410M+). Participants more likely to marry Jewish partners and engage in Jewish community life.',
  website: 'https://www.birthrightisrael.com/',
  individuals: [
    { id: 'charles-bronfman', name: 'Charles Bronfman', role: 'Co-founder', bio: 'Canadian-American billionaire, son of Samuel Bronfman (Seagram). Major Jewish philanthropist.' },
    { id: 'michael-steinhardt-birth', name: 'Michael Steinhardt', role: 'Co-founder', bio: 'Hedge fund pioneer. Stepped down from multiple boards in 2019 after harassment allegations.' }
  ],
  connections: [
    { name: 'Israeli Government', type: 'co-funder', description: 'Provides roughly a third of Birthright funding.' },
    { name: 'Jewish Federations of North America (JFNA)', type: 'co-funder', description: 'Federations collectively fund Birthright trips.', entryId: 'jewish-federations-of-north-america' },
    { name: 'Sheldon Adelson', type: 'largest individual donor ($410M+)', description: 'Adelson donated more than any other individual to Birthright.' },
    { name: 'Hillel International', type: 'campus partner', description: 'Hillel chapters recruit Birthright participants.' },
    { name: 'Chabad-Lubavitch', type: 'trip provider', description: 'Chabad runs several Birthright tracks.', entryId: 'chabad-lubavitch' },
    { name: 'Jewish Agency for Israel', type: 'partner', description: 'Coordinates on Israel programming.' },
    { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'pro-Israel ecosystem', description: 'Both strengthen US-Israel ties.', entryId: 'aipac' }
  ]
})) addedEntries++;

// ============================================================================
// JDC
// ============================================================================
if (addEntry('United States', {
  id: 'american-jewish-joint-distribution-committee',
  name: 'American Jewish Joint Distribution Committee (JDC)',
  type: 'humanitarian / relief organization',
  category: 'Charity & Philanthropy',
  founded: 1914,
  description: 'The largest Jewish humanitarian organization in the world. Founded in 1914 by Felix Warburg and Jacob Schiff to aid Jews in WWI. During the Holocaust, provided funds for rescue operations. During the Cold War, secretly maintained contact behind the Iron Curtain. Today operates in the FSU, Israel, and worldwide. Annual budget $350M+.',
  website: 'https://www.jdc.org/',
  individuals: [
    { id: 'ariel-zwang', name: 'Ariel Zwang', role: 'CEO', bio: 'CEO of the JDC.' }
  ],
  connections: [
    { name: 'Jewish Federations of North America (JFNA)', type: 'primary funder', description: 'Provides a large share of JDC budget.', entryId: 'jewish-federations-of-north-america' },
    { name: 'Jewish Agency for Israel', type: 'historic partner', description: 'Have worked together since the pre-state era.' },
    { name: 'Israeli Government', type: 'program partner', description: 'JDC runs social service programs in Israel.' }
  ]
})) addedEntries++;

// ============================================================================
// WORLD JEWISH CONGRESS
// ============================================================================
if (addEntry('International', {
  id: 'world-jewish-congress',
  name: 'World Jewish Congress (WJC)',
  type: 'international Jewish representative body',
  category: 'Representative & Umbrella Bodies',
  founded: 1936,
  description: 'International federation representing Jewish communities in 100+ countries. Founded in 1936 in Geneva against the Nazi threat. Under Edgar Bronfman Sr. (1981-2007), led campaign forcing Swiss banks to settle $1.25 billion for dormant Holocaust accounts. Current president Ronald Lauder (Estée Lauder heir) since 2007.',
  website: 'https://www.worldjewishcongress.org/',
  individuals: [
    { id: 'ronald-lauder', name: 'Ronald Lauder', role: 'President (2007-present)', bio: 'American billionaire, son of Estée Lauder. Former US Ambassador to Austria.' },
    { id: 'edgar-bronfman-sr', name: 'Edgar Bronfman Sr.', role: 'President (1981-2007)', bio: 'Canadian-American billionaire (Seagram) who led the Swiss banks campaign.' },
    { id: 'nahum-goldmann', name: 'Nahum Goldmann', role: 'Co-founder & President (1936-1977)', bio: 'Negotiated German reparations for Holocaust survivors.' }
  ],
  connections: [
    { name: 'United Nations', type: 'consultative status', description: 'WJC holds UN consultative status.' },
    { name: 'Anti-Defamation League (ADL)', type: 'advocacy peer', description: 'Both combat antisemitism globally.', entryId: 'anti-defamation-league-adl' },
    { name: 'European Jewish Congress', type: 'affiliate', description: 'Regional affiliate of WJC.' },
    { name: 'Claims Conference', type: 'Holocaust restitution partner', description: 'Both work on Holocaust restitution.' },
    { name: 'Israeli Government', type: 'diplomatic partner', description: 'Coordinates on diaspora security and antisemitism.' }
  ]
})) addedEntries++;

// ============================================================================
// MEDIA & TECH
// ============================================================================
if (addEntry('United States', {
  id: 'new-york-times',
  name: 'The New York Times',
  type: 'newspaper / media company',
  category: 'Entertainment & Media',
  founded: 1851,
  description: 'One of the most influential newspapers in the world. Controlled by the Ochs-Sulzberger family since 1896 when Adolph Ochs purchased it. Won 130+ Pulitzer Prizes. Current publisher A.G. Sulzberger is 5th generation. 10+ million digital subscribers.',
  website: 'https://www.nytimes.com/',
  individuals: [
    { id: 'ag-sulzberger', name: 'A.G. Sulzberger', role: 'Publisher & Chairman', bio: 'Fifth generation Ochs-Sulzberger to run the Times.' },
    { id: 'adolph-ochs', name: 'Adolph Ochs', role: 'Publisher (1896-1935)', bio: 'German-Jewish publisher who purchased the Times in 1896.' }
  ],
  connections: [
    { name: 'Washington Post', type: 'industry rival', description: 'America\'s two most prestigious newspapers.' },
    { name: 'CNN (Cable News Network)', type: 'media peer', description: 'Both are major American news organizations.', entryId: 'cnn' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'cnn',
  name: 'CNN (Cable News Network)',
  type: 'television network / media company',
  category: 'Entertainment & Media',
  founded: 1980,
  description: 'First 24-hour cable news network. Led by numerous Jewish executives including Jeff Zucker (president 2013-2022). Wolf Blitzer, son of Holocaust survivors, began career at Jerusalem Post.',
  website: 'https://www.cnn.com/',
  individuals: [
    { id: 'jeff-zucker', name: 'Jeff Zucker', role: 'Former President (2013-2022)', bio: 'Resigned 2022. Previously CEO of NBCUniversal.' },
    { id: 'wolf-blitzer', name: 'Wolf Blitzer', role: 'Lead Anchor', bio: 'Son of Holocaust survivors. Career started at Jerusalem Post.' }
  ],
  connections: [
    { name: 'Warner Bros. Discovery', type: 'parent company', description: 'CNN is owned by WBD (led by David Zaslav).' },
    { name: 'Fox News Channel', type: 'industry rival', description: 'Primary cable news rivals.', entryId: 'fox-news-channel' },
    { name: 'The New York Times', type: 'media peer', description: 'Both are major news organizations.', entryId: 'new-york-times' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'bloomberg-lp',
  name: 'Bloomberg L.P.',
  type: 'financial data / media company',
  category: 'Entertainment & Media',
  founded: 1981,
  description: 'Global financial data, software, and media company. Bloomberg Terminal dominates financial services (325,000+ subscribers at ~$24K/year). Also owns Bloomberg News, TV, Radio, Businessweek. Michael Bloomberg (Jewish) served as NYC mayor (2002-2013). Net worth $90+ billion.',
  website: 'https://www.bloomberg.com/',
  individuals: [
    { id: 'michael-bloomberg', name: 'Michael Bloomberg', role: 'Founder & Owner', bio: 'Billionaire businessman, philanthropist. Three-term NYC mayor. Has donated $17+ billion to philanthropy.' }
  ],
  connections: [
    { name: 'Bloomberg Philanthropies', type: 'philanthropy', description: 'Bloomberg has donated $17+ billion.' },
    { name: 'Johns Hopkins University', type: 'major donation ($3.3B)', description: 'Largest donation to any educational institution.' },
    { name: 'The New York Times', type: 'media peer', description: 'Both major news organizations.', entryId: 'new-york-times' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'paramount-global',
  name: 'Paramount Global',
  type: 'media / entertainment conglomerate',
  category: 'Entertainment & Media',
  founded: 1912,
  description: 'One of the largest media companies. Owns Paramount Pictures, CBS, Showtime, MTV, Nickelodeon, BET. Founded 1912 by Adolph Zukor (Hungarian-Jewish immigrant). Sumner Redstone (born Rothstein) built National Amusements controlling Viacom/CBS. Acquired by Skydance Media (David Ellison) in 2024.',
  website: 'https://www.paramount.com/',
  individuals: [
    { id: 'adolph-zukor', name: 'Adolph Zukor', role: 'Founder of Paramount Pictures (1873-1976)', bio: 'Hungarian-Jewish immigrant. Pioneer of feature-length films. Lived to 103.' },
    { id: 'sumner-redstone-paramount', name: 'Sumner Redstone', role: 'Controlling Shareholder (1923-2020)', bio: 'Born Sumner Murray Rothstein. Built National Amusements into a media empire.' },
    { id: 'shari-redstone', name: 'Shari Redstone', role: 'Chair & Controlling Shareholder', bio: 'Daughter of Sumner. Engineered the Skydance merger.' }
  ],
  connections: [
    { name: 'Walt Disney Company', type: 'industry rival', description: 'Both are major studio conglomerates.' },
    { name: 'Warner Bros. Discovery', type: 'industry rival', description: 'Competing conglomerates.' },
    { name: 'Skydance Media', type: 'acquirer (2024)', description: 'David Ellison\'s Skydance acquired Paramount.' }
  ]
})) addedEntries++;

// ============================================================================
// FINANCIAL INSTITUTIONS
// ============================================================================
if (addEntry('United States', {
  id: 'lehman-brothers-historic',
  name: 'Lehman Brothers (historic)',
  type: 'investment bank (collapsed)',
  category: 'Investment & Private Equity',
  founded: 1850,
  description: 'Global financial services firm whose collapse on September 15, 2008, was the defining moment of the financial crisis and the largest bankruptcy in US history ($691B). Founded 1850 by Henry Lehman, a Bavarian-Jewish immigrant. Under CEO Dick Fuld, became overleveraged in subprime mortgages. Government controversially chose not to rescue Lehman.',
  website: '',
  individuals: [
    { id: 'henry-lehman', name: 'Henry Lehman', role: 'Founder (1822-1855)', bio: 'Bavarian-Jewish immigrant who founded Lehman Brothers in Montgomery, Alabama.' },
    { id: 'dick-fuld', name: 'Dick Fuld', role: 'CEO (1994-2008)', bio: 'Known as "Gorilla of Wall Street." Presided over the collapse. Never criminally charged.' }
  ],
  connections: [
    { name: 'Goldman Sachs (historic)', type: 'industry rival', description: 'Both Jewish-founded Wall Street powerhouses.', entryId: 'goldman-sachs-historic' },
    { name: 'Bear Stearns (historic)', type: 'similar fate', description: 'Both collapsed in 2008, though Bear Stearns was rescued.' },
    { name: 'JPMorgan Chase', type: 'industry peer', description: 'Among firms that declined to rescue Lehman.', entryId: 'jpmorgan-chase' },
    { name: 'Barclays', type: 'acquirer', description: 'Purchased Lehman\'s North American operations.', entryId: 'barclays' },
    { name: 'Federal Reserve', type: 'refused bailout', description: 'Declined to bail out Lehman, triggering the global crisis.' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'apollo-global-management',
  name: 'Apollo Global Management',
  type: 'private equity / alternative investment',
  category: 'Investment & Private Equity',
  founded: 1990,
  description: 'One of the world\'s largest alternative asset managers ($650B+ AUM). Founded by Leon Black, Josh Harris, and Marc Rowan - all Jewish - after leaving Drexel Burnham Lambert. Leon Black stepped down as CEO in 2021 after revelations he paid Jeffrey Epstein $158 million.',
  website: 'https://www.apollo.com/',
  individuals: [
    { id: 'leon-black', name: 'Leon Black', role: 'Co-founder & Former CEO', bio: 'Stepped down in 2021 after Epstein payment revelations. Son of Eli Black.' },
    { id: 'marc-rowan', name: 'Marc Rowan', role: 'CEO (2021-present)', bio: 'Co-founder who became CEO. Wharton School chairman. Net worth $10B+.' },
    { id: 'josh-harris-apollo', name: 'Josh Harris', role: 'Co-founder', bio: 'Co-owner of Washington Commanders, 76ers, Devils. Left Apollo 2023.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'Leon Black payments ($158M)', description: 'Leon Black paid Epstein $158 million for financial advisory services.', entryId: 'jeffrey-epstein-network' },
    { name: 'Drexel Burnham Lambert', type: 'founders\' origin', description: 'All three founders came from Drexel under Michael Milken.' },
    { name: 'Blackstone Group', type: 'industry rival', description: 'Both are leading PE firms.' },
    { name: 'KKR & Co.', type: 'industry rival', description: 'Top alternative asset managers.', entryId: 'kkr-and-co' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'kkr-and-co',
  name: 'KKR & Co. (Kohlberg Kravis Roberts)',
  type: 'private equity / investment firm',
  category: 'Investment & Private Equity',
  founded: 1976,
  description: 'Leading investment firm ($550B+ AUM), pioneer of the leveraged buyout. Founded 1976 by Jerome Kohlberg Jr., Henry Kravis, and George Roberts - all Jewish - after leaving Bear Stearns. The $25B RJR Nabisco buyout (1988) was subject of "Barbarians at the Gate."',
  website: 'https://www.kkr.com/',
  individuals: [
    { id: 'henry-kravis', name: 'Henry Kravis', role: 'Co-founder & Co-Chairman', bio: 'Billionaire, born to a Jewish family in Tulsa. Known for RJR Nabisco buyout.' },
    { id: 'george-roberts', name: 'George Roberts', role: 'Co-founder & Co-Chairman', bio: 'Cousin of Kravis. Pioneer of the LBO.' }
  ],
  connections: [
    { name: 'Bear Stearns (historic)', type: 'founders\' origin', description: 'All three KKR founders came from Bear Stearns.' },
    { name: 'Apollo Global Management', type: 'industry rival', description: 'Leading PE firms.', entryId: 'apollo-global-management' },
    { name: 'Blackstone Group', type: 'industry rival', description: 'Most iconic PE firms.' },
    { name: 'Goldman Sachs (historic)', type: 'deal partner', description: 'Frequently partner on deals.', entryId: 'goldman-sachs-historic' }
  ]
})) addedEntries++;

if (addEntry('United Kingdom', {
  id: 'rothschild-and-co',
  name: 'Rothschild & Co.',
  type: 'investment bank / financial advisory',
  category: 'Banking & Financial Services',
  founded: 1811,
  description: 'Multinational financial advisory controlled by the Rothschild family, the most prominent Jewish banking dynasty in history. Founded by Mayer Amschel Rothschild (1744-1812) in Frankfurt, expanded by five sons to London, Paris, Vienna, Naples, Frankfurt. Financed the British government during Napoleonic Wars and the Suez Canal purchase. The 1917 Balfour Declaration was addressed to Lord Walter Rothschild. Over EUR500B in AUM and custody.',
  website: 'https://www.rothschildandco.com/',
  individuals: [
    { id: 'mayer-amschel-rothschild', name: 'Mayer Amschel Rothschild', role: 'Dynasty Founder (1744-1812)', bio: 'Born in Frankfurt Judengasse. Called "founding father of international finance."' },
    { id: 'nathan-mayer-rothschild', name: 'Nathan Mayer Rothschild', role: 'London Branch Founder (1777-1836)', bio: 'Founded N M Rothschild & Sons. Became wealthiest man in the world.' },
    { id: 'jacob-rothschild-4th-baron', name: 'Lord Jacob Rothschild', role: 'Financier & Philanthropist (1936-2024)', bio: '4th Baron Rothschild. Donated the Knesset and Supreme Court buildings to Israel.' }
  ],
  connections: [
    { name: 'Goldman Sachs (historic)', type: 'industry peer', description: 'Both are iconic Jewish-founded financial institutions.', entryId: 'goldman-sachs-historic' },
    { name: 'Bank of England', type: 'historic relationship', description: 'Closely tied, helped fix gold price 1919-2004.' },
    { name: 'Israeli Government', type: 'historic patron', description: 'Funded Zionist settlement and donated major Israeli institutions.' },
    { name: 'Suez Canal', type: 'historic financing', description: 'Financed British purchase of Suez Canal (1875).' },
    { name: 'Balfour Declaration', type: 'addressed to Rothschild', description: 'The 1917 declaration was addressed to Lord Walter Rothschild.' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'de-shaw-and-co',
  name: 'D.E. Shaw & Co.',
  type: 'hedge fund / investment firm',
  category: 'Investment & Private Equity',
  founded: 1988,
  description: 'One of the largest and most successful hedge funds ($60B+ AUM). Founded by David E. Shaw (Jewish), former Columbia CS professor who pioneered computational investing. Alumni include Jeff Bezos, who left to found Amazon.',
  website: 'https://www.deshaw.com/',
  individuals: [
    { id: 'david-e-shaw', name: 'David E. Shaw', role: 'Founder', bio: 'Billionaire scientist-investor. Former Columbia CS professor. Net worth $7B+.' }
  ],
  connections: [
    { name: 'Amazon', type: 'alumni', description: 'Jeff Bezos worked here before founding Amazon.' },
    { name: 'Two Sigma Investments', type: 'quant rival', description: 'Both leading quantitative hedge funds.' },
    { name: 'Renaissance Technologies', type: 'quant rival', description: 'Both legendary quant funds.' },
    { name: 'Citadel LLC', type: 'quant rival', description: 'Fellow "Quant Four" member.' }
  ]
})) addedEntries++;

// ============================================================================
// ISRAELI ORGANIZATIONS
// ============================================================================
if (addEntry('Israel', {
  id: 'check-point-software',
  name: 'Check Point Software Technologies',
  type: 'cybersecurity company',
  category: 'Technology',
  founded: 1993,
  description: 'Pioneering Israeli cybersecurity company. Founded by Gil Shwed, who invented stateful inspection firewall technology while serving in Unit 8200. First Israeli company on NASDAQ. Protects 100,000+ organizations worldwide.',
  website: 'https://www.checkpoint.com/',
  individuals: [
    { id: 'gil-shwed', name: 'Gil Shwed', role: 'Founder & CEO', bio: 'Unit 8200 alumnus. Founded Check Point at age 25. Net worth $5B+.' }
  ],
  connections: [
    { name: 'Unit 8200', type: 'intelligence origins', description: 'Gil Shwed developed firewall tech during his service.' },
    { name: 'Palo Alto Networks', type: 'competitor', description: 'Major competitor in enterprise cybersecurity.' },
    { name: 'NASDAQ', type: 'first Israeli listing', description: 'First Israeli company on NASDAQ.' }
  ]
})) addedEntries++;

if (addEntry('Israel', {
  id: 'teva-pharmaceutical-industries',
  name: 'Teva Pharmaceutical Industries',
  type: 'pharmaceutical company',
  category: 'Healthcare & Pharmaceuticals',
  founded: 1901,
  description: 'World\'s largest generic drug manufacturer. Founded 1901 in Jerusalem. Agreed to $4.25 billion opioid crisis settlement. 37,000+ employees in 60 countries. ~$15B annual revenue.',
  website: 'https://www.tevapharm.com/',
  individuals: [
    { id: 'eli-hurvitz', name: 'Eli Hurvitz', role: 'CEO (1976-2002)', bio: 'Transformed Teva into the world\'s largest generic drug maker.' }
  ],
  connections: [
    { name: 'Israeli Government', type: 'national champion', description: 'One of Israel\'s largest companies.' },
    { name: 'Opioid Crisis', type: 'settlement ($4.25B)', description: 'Agreed to $4.25B for role in opioid crisis.' }
  ]
})) addedEntries++;

if (addEntry('Israel', {
  id: 'mobileye',
  name: 'Mobileye (Intel)',
  type: 'autonomous driving technology',
  category: 'Technology',
  founded: 1999,
  description: 'Israeli developer of autonomous driving technology and ADAS. Founded by Amnon Shashua at Hebrew University. Intel acquired for $15.3 billion in 2017. EyeQ chips power ADAS in 150M+ vehicles from 50+ automakers.',
  website: 'https://www.mobileye.com/',
  individuals: [
    { id: 'amnon-shashua', name: 'Amnon Shashua', role: 'Founder & CEO', bio: 'Hebrew University professor. Also founded AI21 Labs.' }
  ],
  connections: [
    { name: 'Intel Corporation', type: 'parent company ($15.3B acquisition)', description: 'Intel acquired Mobileye in 2017.' },
    { name: 'Hebrew University of Jerusalem', type: 'academic origins', description: 'Founded based on Hebrew U research.', entryId: 'hebrew-university-of-jerusalem' },
    { name: 'Tesla', type: 'former partner / competitor', description: 'Tesla used Mobileye before developing own systems in 2016.' }
  ]
})) addedEntries++;

if (addEntry('Israel', {
  id: 'el-al-israel-airlines',
  name: 'El Al Israel Airlines',
  type: 'national airline',
  category: 'Transportation',
  founded: 1948,
  description: 'Flag carrier airline of Israel. Founded same year as independence. Used for Operation Magic Carpet (Yemenite Jews, 1949-50), Operation Solomon (14,325 Ethiopian Jews in 36 hours, 1991). Known for stringent security including armed sky marshals.',
  website: 'https://www.elal.com/',
  individuals: [],
  connections: [
    { name: 'Israeli Government', type: 'national carrier', description: 'Israel\'s flag carrier.' },
    { name: 'Jewish Agency for Israel', type: 'aliyah operations', description: 'Partners on immigration flights.' }
  ]
})) addedEntries++;

if (addEntry('Israel', {
  id: 'israel-aerospace-industries',
  name: 'Israel Aerospace Industries (IAI)',
  type: 'defense / aerospace manufacturer',
  category: 'Defense & Security',
  founded: 1953,
  description: 'Israel\'s largest defense contractor. State-owned. Founded by Al Schwimmer, who smuggled planes to Israel during 1948 war. Develops UAVs, satellites, air defense, and the Arrow ABM system. 15,000+ employees, ~$5B revenue.',
  website: 'https://www.iai.co.il/',
  individuals: [
    { id: 'al-schwimmer', name: 'Al Schwimmer', role: 'Founder (1917-2011)', bio: 'Smuggled aircraft to Israel in 1948. Convicted in US, later pardoned by Clinton.' }
  ],
  connections: [
    { name: 'Rafael Advanced Defense Systems', type: 'defense peer', description: 'Rafael developed Iron Dome, IAI developed Arrow.' },
    { name: 'Elbit Systems', type: 'defense peer', description: 'Israel\'s three largest defense companies.' },
    { name: 'Israeli Ministry of Defense', type: 'primary customer', description: 'IAI\'s largest customer.' },
    { name: 'Boeing', type: 'industry partner', description: 'Partners on defense programs.' }
  ]
})) addedEntries++;

if (addEntry('Israel', {
  id: 'hebrew-university-of-jerusalem',
  name: 'Hebrew University of Jerusalem',
  type: 'university',
  category: 'Education & Academia',
  founded: 1918,
  description: 'Israel\'s second-oldest university. Cornerstone ceremony attended by Weizmann, Einstein, Freud. Einstein bequeathed his archives and IP to the university. 8 Nobel laureates. Top 100 globally.',
  website: 'https://new.huji.ac.il/',
  individuals: [],
  connections: [
    { name: 'Hadassah (Women\'s Zionist Organization of America)', type: 'campus partner', description: 'Hadassah Hospital is the teaching hospital.', entryId: 'hadassah-womens-zionist-org' },
    { name: 'Mobileye', type: 'spinoff', description: 'Founded based on Hebrew U research.', entryId: 'mobileye' },
    { name: 'Technion - Israel Institute of Technology', type: 'academic peer', description: 'Israel\'s two leading research universities.', entryId: 'technion-israel-institute-of-tech' },
    { name: 'Weizmann Institute of Science', type: 'academic peer', description: 'Top Israeli research institutions.', entryId: 'weizmann-institute-of-science' }
  ]
})) addedEntries++;

if (addEntry('Israel', {
  id: 'technion-israel-institute-of-tech',
  name: 'Technion - Israel Institute of Technology',
  type: 'university',
  category: 'Education & Academia',
  founded: 1912,
  description: 'Israel\'s oldest university and premier science/tech institution, "Israel\'s MIT." Educated most of Israel\'s tech entrepreneurs. Produces more NASDAQ-listed CEOs than any non-US university. 4 Nobel laureates.',
  website: 'https://www.technion.ac.il/',
  individuals: [],
  connections: [
    { name: 'Hebrew University of Jerusalem', type: 'academic peer', description: 'Israel\'s two leading universities.', entryId: 'hebrew-university-of-jerusalem' },
    { name: 'MIT', type: 'partner', description: 'Close partnership and frequent comparison.' },
    { name: 'Cornell University', type: 'joint campus', description: 'Jacobs Technion-Cornell Institute on Roosevelt Island, NYC.' }
  ]
})) addedEntries++;

if (addEntry('Israel', {
  id: 'weizmann-institute-of-science',
  name: 'Weizmann Institute of Science',
  type: 'research institute',
  category: 'Education & Academia',
  founded: 1934,
  description: 'One of the world\'s leading multidisciplinary research institutions. Founded in 1934 by Chaim Weizmann (Israel\'s first president). Graduate-level research only. Multiple Nobel laureates.',
  website: 'https://www.weizmann.ac.il/',
  individuals: [],
  connections: [
    { name: 'Hebrew University of Jerusalem', type: 'academic peer', description: 'Leading Israeli research institutions.', entryId: 'hebrew-university-of-jerusalem' },
    { name: 'Technion - Israel Institute of Technology', type: 'academic peer', description: 'Top Israeli institutions.', entryId: 'technion-israel-institute-of-tech' }
  ]
})) addedEntries++;

// ============================================================================
// MORE: Harvard, JNF, Adelson, Washington Post, Fox News, Miramax
// ============================================================================
if (addEntry('United States', {
  id: 'harvard-university',
  name: 'Harvard University',
  type: 'university',
  category: 'Education & Academia',
  founded: 1636,
  description: 'Most prestigious US university. Jewish enrollment was restricted by quotas in the 1920s. Led by Jewish presidents including Lawrence Summers (2001-2006). Jeffrey Epstein donated $9.1M+ and visited 40+ times post-conviction. World\'s largest endowment ($50B+).',
  website: 'https://www.harvard.edu/',
  individuals: [
    { id: 'lawrence-summers-harvard', name: 'Lawrence Summers', role: 'President (2001-2006)', bio: 'Jewish economist. Previously US Treasury Secretary under Clinton.' }
  ],
  connections: [
    { name: 'Jeffrey Epstein Network', type: 'donor scandal ($9.1M+)', description: 'Epstein donated $9.1M+ and visited 40+ times post-conviction.', entryId: 'jeffrey-epstein-network' },
    { name: 'Hillel International', type: 'campus chapter', description: 'One of the largest Hillel chapters.' },
    { name: 'Goldman Sachs (historic)', type: 'recruitment pipeline', description: 'Primary recruiting target.', entryId: 'goldman-sachs-historic' },
    { name: 'Chabad-Lubavitch', type: 'campus presence', description: 'Chabad center at Harvard.', entryId: 'chabad-lubavitch' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'jewish-national-fund-jnf',
  name: 'Jewish National Fund (JNF-KKL)',
  type: 'Zionist land organization / nonprofit',
  category: 'Charity & Philanthropy',
  founded: 1901,
  description: 'Founded in 1901 at the Fifth Zionist Congress to buy and develop land in Palestine. Has planted 250M+ trees, built 250+ reservoirs. Holds ~13% of Israel\'s land.',
  website: 'https://www.jnf.org/',
  individuals: [],
  connections: [
    { name: 'World Zionist Organization', type: 'founding member', description: 'Established by the Zionist Congress.' },
    { name: 'Jewish Agency for Israel', type: 'Zionist partner', description: 'Key Zionist movement institutions.' },
    { name: 'Israeli Government', type: 'land partnership', description: 'JNF holds ~13% of Israel\'s land.' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'sheldon-adelson-empire',
  name: 'Sheldon Adelson / Las Vegas Sands (historic)',
  type: 'casino / hospitality empire',
  category: 'Conglomerates & Holding Companies',
  founded: 1988,
  description: 'Sheldon Adelson (1933-2021) built Las Vegas Sands into the world\'s largest casino company. Gave $500M+ to Republicans - largest individual political donor in US history. Gave $410M+ to Birthright Israel. Purchased Israel Hayom. Widow Miriam continues spending, $100M+ to Trump 2024.',
  website: '',
  individuals: [
    { id: 'sheldon-adelson', name: 'Sheldon Adelson', role: 'Founder (1933-2021)', bio: 'Casino magnate, largest individual US political donor ($500M+ GOP). Donated $410M+ to Birthright.' },
    { id: 'miriam-adelson', name: 'Miriam Adelson', role: 'Widow & Principal Owner', bio: 'Israeli-born physician. Presidential Medal of Freedom (2018). Continues massive Republican donations.' }
  ],
  connections: [
    { name: 'Birthright Israel (Taglit)', type: 'largest individual donor', description: 'Donated $410M+ to Birthright.', entryId: 'birthright-israel-taglit' },
    { name: 'Republican Party', type: 'megadonor ($500M+)', description: 'Largest individual donor in US history.' },
    { name: 'Donald Trump', type: 'major supporter', description: 'Adelson & Miriam gave $200M+ combined to Trump campaigns.' },
    { name: 'Benjamin Netanyahu', type: 'political ally', description: 'Israel Hayom seen as supporting Netanyahu.' },
    { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'pro-Israel ally', description: 'One of the most influential pro-Israel figures.', entryId: 'aipac' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'washington-post',
  name: 'The Washington Post',
  type: 'newspaper / media company',
  category: 'Entertainment & Media',
  founded: 1877,
  description: 'One of the most influential newspapers. Owned by Meyer-Graham family for 80+ years. Eugene Meyer (Jewish banker, Fed governor) purchased it in 1933. His daughter Katharine Graham led it through Pentagon Papers and Watergate. Sold to Jeff Bezos for $250M in 2013.',
  website: 'https://www.washingtonpost.com/',
  individuals: [
    { id: 'eugene-meyer-wapo', name: 'Eugene Meyer', role: 'Owner (1933-1959)', bio: 'Jewish banker, first World Bank president. Purchased the Post in 1933.' },
    { id: 'katharine-graham', name: 'Katharine Graham', role: 'Publisher (1963-1979)', bio: 'Led through Pentagon Papers and Watergate. First female Fortune 500 CEO.' }
  ],
  connections: [
    { name: 'The New York Times', type: 'industry rival', description: 'Two most prestigious American newspapers.', entryId: 'new-york-times' },
    { name: 'Amazon', type: 'Jeff Bezos ownership', description: 'Bezos purchased the Post in 2013.' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'miramax-films',
  name: 'Miramax Films',
  type: 'film studio',
  category: 'Entertainment & Media',
  founded: 1979,
  description: 'Independent film studio founded by Bob and Harvey Weinstein (Jewish), named after parents Miriam and Max. Produced "Pulp Fiction," "Shakespeare in Love," etc. Harvey Weinstein exposed as serial predator in 2017, convicted 2020, launching #MeToo movement.',
  website: '',
  individuals: [
    { id: 'harvey-weinstein', name: 'Harvey Weinstein', role: 'Co-founder (convicted predator)', bio: 'Convicted of rape and sexual assault. 80+ women accused him. His exposure launched #MeToo.' },
    { id: 'bob-weinstein', name: 'Bob Weinstein', role: 'Co-founder', bio: 'Co-founded Miramax and Dimension Films.' }
  ],
  connections: [
    { name: 'Walt Disney Company', type: 'former parent', description: 'Disney owned Miramax 1993-2010.' },
    { name: '#MeToo Movement', type: 'catalyst', description: 'Harvey Weinstein\'s exposure launched #MeToo.' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'fox-news-channel',
  name: 'Fox News Channel',
  type: 'cable news network',
  category: 'Entertainment & Media',
  founded: 1996,
  description: 'Dominant American cable news network. Founded by Rupert Murdoch (News Corp). Highest-rated cable news for 20+ years.',
  website: 'https://www.foxnews.com/',
  individuals: [],
  connections: [
    { name: 'Fox Corporation', type: 'parent company', description: 'Owned by Fox Corp.' },
    { name: 'CNN (Cable News Network)', type: 'industry rival', description: 'Primary cable news rival.', entryId: 'cnn' },
    { name: 'New York Post', type: 'sibling', description: 'Both Murdoch media properties.' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'jewish-theological-seminary',
  name: 'Jewish Theological Seminary (JTS)',
  type: 'rabbinical seminary / university',
  category: 'Education & Academia',
  founded: 1887,
  description: 'Academic and spiritual center of Conservative Judaism. Founded 1887, reorganized by Solomon Schechter 1902. Trains rabbis, cantors, educators. Library holds the most extensive Judaic text collection in the Western Hemisphere.',
  website: 'https://www.jtsa.edu/',
  individuals: [
    { id: 'solomon-schechter-jts', name: 'Solomon Schechter', role: 'President (1902-1915)', bio: 'Romanian-born scholar, shaped Conservative Judaism. Famous for Cairo Genizah discovery.' }
  ],
  connections: [
    { name: 'Hebrew Union College - JIR', type: 'denominational peer', description: 'HUC is the Reform seminary.', entryId: 'hebrew-union-college-jir' },
    { name: 'United Synagogue of Conservative Judaism', type: 'movement partner', description: 'Institutional pillars of Conservative Judaism.' }
  ]
})) addedEntries++;

if (addEntry('United States', {
  id: 'hebrew-union-college-jir',
  name: 'Hebrew Union College - Jewish Institute of Religion (HUC-JIR)',
  type: 'rabbinical seminary / university',
  category: 'Education & Academia',
  founded: 1875,
  description: 'Oldest rabbinical seminary in the Americas. Academic center of Reform Judaism. Founded 1875 by Rabbi Isaac Mayer Wise. Ordained first female rabbi Sally Priesand (1972). Campuses in Cincinnati, New York, LA, Jerusalem.',
  website: 'https://huc.edu/',
  individuals: [
    { id: 'isaac-mayer-wise', name: 'Rabbi Isaac Mayer Wise', role: 'Founder (1819-1900)', bio: 'Founded HUC, UAHC, and CCAR - the three pillars of Reform Judaism in America.' },
    { id: 'sally-priesand', name: 'Sally Priesand', role: 'First Female Rabbi (ordained 1972)', bio: 'First woman ordained as a rabbi in America.' }
  ],
  connections: [
    { name: 'Union for Reform Judaism', type: 'movement partner', description: 'HUC and URJ are pillars of Reform Judaism.' },
    { name: 'Jewish Theological Seminary (JTS)', type: 'denominational peer', description: 'JTS is the Conservative seminary.', entryId: 'jewish-theological-seminary' }
  ]
})) addedEntries++;

if (addEntry('France', {
  id: 'crif',
  name: 'CRIF (Representative Council of French Jewish Institutions)',
  type: 'representative body',
  category: 'Representative & Umbrella Bodies',
  founded: 1944,
  description: 'Umbrella organization of French Jewry, the largest in Europe (~500,000). Founded 1944 during French Resistance. Annual dinner attended by the French president.',
  website: 'https://www.crif.org/',
  individuals: [],
  connections: [
    { name: 'French Government', type: 'diplomatic relationship', description: 'Annual dinner attended by the French president.' },
    { name: 'World Jewish Congress', type: 'affiliate', description: 'Affiliated with WJC.', entryId: 'world-jewish-congress' },
    { name: 'European Jewish Congress', type: 'member', description: 'Key EJC member.' }
  ]
})) addedEntries++;

// ============================================================================
// MORE PEOPLE
// ============================================================================
const peopleBatch = {
  'leon-black': { name: 'Leon Black', bio: 'Billionaire co-founder of Apollo Global Management. Stepped down as CEO in 2021 after Epstein payment revelations.', affiliations: [{ organization: 'Apollo Global Management', role: 'Co-founder & Former CEO', country: 'United States', religion: 'jewish', entryId: 'apollo-global-management' }] },
  'marc-rowan': { name: 'Marc Rowan', bio: 'Billionaire co-founder and CEO of Apollo. Wharton School chairman.', affiliations: [{ organization: 'Apollo Global Management', role: 'CEO', country: 'United States', religion: 'jewish', entryId: 'apollo-global-management' }] },
  'henry-kravis': { name: 'Henry Kravis', bio: 'Billionaire co-founder of KKR. Pioneer of the leveraged buyout.', affiliations: [{ organization: 'KKR & Co.', role: 'Co-founder', country: 'United States', religion: 'jewish', entryId: 'kkr-and-co' }] },
  'george-roberts': { name: 'George Roberts', bio: 'Billionaire co-founder of KKR, cousin of Kravis.', affiliations: [{ organization: 'KKR & Co.', role: 'Co-founder', country: 'United States', religion: 'jewish', entryId: 'kkr-and-co' }] },
  'dick-fuld': { name: 'Dick Fuld', bio: 'CEO of Lehman Brothers (1994-2008). Largest bankruptcy in history.', affiliations: [{ organization: 'Lehman Brothers', role: 'CEO', country: 'United States', religion: 'jewish', entryId: 'lehman-brothers-historic' }] },
  'michael-bloomberg': { name: 'Michael Bloomberg', bio: 'Billionaire founder of Bloomberg LP. NYC mayor 3 terms. Donated $17B+ to philanthropy.', affiliations: [{ organization: 'Bloomberg L.P.', role: 'Founder & Owner', country: 'United States', religion: 'jewish', entryId: 'bloomberg-lp' }] },
  'sheldon-adelson': { name: 'Sheldon Adelson', bio: 'Casino magnate (1933-2021). Largest US political donor in history ($500M+ GOP). Donated $410M+ to Birthright.', affiliations: [{ organization: 'Las Vegas Sands', role: 'Chairman & CEO', country: 'United States', religion: 'jewish', entryId: 'sheldon-adelson-empire' }] },
  'miriam-adelson': { name: 'Miriam Adelson', bio: 'Israeli-born physician and billionaire. Widow of Sheldon. Presidential Medal of Freedom (2018).', affiliations: [{ organization: 'Las Vegas Sands', role: 'Principal Owner', country: 'United States', religion: 'jewish', entryId: 'sheldon-adelson-empire' }] },
  'ronald-lauder': { name: 'Ronald Lauder', bio: 'Billionaire. Son of Estée Lauder. Former US Ambassador to Austria. WJC president since 2007.', affiliations: [{ organization: 'World Jewish Congress', role: 'President', country: 'International', religion: 'jewish', entryId: 'world-jewish-congress' }] },
  'edgar-bronfman-sr': { name: 'Edgar Bronfman Sr.', bio: 'Billionaire (Seagram, 1929-2013). Led WJC 26 years. Swiss banks campaign.', affiliations: [{ organization: 'World Jewish Congress', role: 'President (1981-2007)', country: 'International', religion: 'jewish', entryId: 'world-jewish-congress' }] },
  'charles-bronfman': { name: 'Charles Bronfman', bio: 'Billionaire. Co-founded Birthright Israel. Son of Samuel Bronfman.', affiliations: [{ organization: 'Birthright Israel', role: 'Co-founder', country: 'United States', religion: 'jewish', entryId: 'birthright-israel-taglit' }] },
  'harvey-weinstein': { name: 'Harvey Weinstein', bio: 'Former film producer. Co-founded Miramax. Convicted of rape. 80+ accusers. Launched #MeToo.', affiliations: [{ organization: 'Miramax Films', role: 'Co-founder', country: 'United States', religion: 'jewish', entryId: 'miramax-films' }] },
  'gil-shwed': { name: 'Gil Shwed', bio: 'Israeli billionaire. Founded Check Point. Invented stateful firewall. Unit 8200 alumnus.', affiliations: [{ organization: 'Check Point Software', role: 'Founder & CEO', country: 'Israel', religion: 'jewish', entryId: 'check-point-software' }] },
  'menachem-mendel-schneerson': { name: 'Rabbi Menachem Mendel Schneerson', bio: 'The Rebbe of Chabad-Lubavitch (1902-1994). Congressional Gold Medal. Transformed Chabad globally.', affiliations: [{ organization: 'Chabad-Lubavitch', role: 'The Rebbe', country: 'United States', religion: 'jewish', entryId: 'chabad-lubavitch' }] },
  'henrietta-szold': { name: 'Henrietta Szold', bio: 'American Jewish leader (1860-1945). Founded Hadassah. Led Youth Aliyah.', affiliations: [{ organization: 'Hadassah', role: 'Founder', country: 'United States', religion: 'jewish', entryId: 'hadassah-womens-zionist-org' }] },
  'wolf-blitzer': { name: 'Wolf Blitzer', bio: 'CNN anchor. Son of Holocaust survivors. Began career at Jerusalem Post.', affiliations: [{ organization: 'CNN', role: 'Lead Anchor', country: 'United States', religion: 'jewish', entryId: 'cnn' }] },
  'jeff-zucker': { name: 'Jeff Zucker', bio: 'Former CNN president (2013-2022). Previously CEO of NBCUniversal.', affiliations: [{ organization: 'CNN', role: 'Former President', country: 'United States', religion: 'jewish', entryId: 'cnn' }] },
  'katharine-graham': { name: 'Katharine Graham', bio: 'Washington Post publisher. Led through Watergate. First female Fortune 500 CEO.', affiliations: [{ organization: 'The Washington Post', role: 'Publisher', country: 'United States', religion: 'jewish', entryId: 'washington-post' }] },
  'adolph-zukor': { name: 'Adolph Zukor', bio: 'Hungarian-Jewish immigrant (1873-1976). Founded Paramount Pictures. Lived to 103.', affiliations: [{ organization: 'Paramount Global', role: 'Founder', country: 'United States', religion: 'jewish', entryId: 'paramount-global' }] },
  'david-e-shaw': { name: 'David E. Shaw', bio: 'Billionaire scientist-investor. Founded D.E. Shaw. Former Columbia CS professor.', affiliations: [{ organization: 'D.E. Shaw & Co.', role: 'Founder', country: 'United States', religion: 'jewish', entryId: 'de-shaw-and-co' }] },
  'amnon-shashua': { name: 'Amnon Shashua', bio: 'Israeli CS professor. Founded Mobileye (Intel bought for $15.3B).', affiliations: [{ organization: 'Mobileye', role: 'Founder & CEO', country: 'Israel', religion: 'jewish', entryId: 'mobileye' }] },
  'mayer-amschel-rothschild': { name: 'Mayer Amschel Rothschild', bio: 'Founder of the Rothschild banking dynasty (1744-1812). Born in Frankfurt Judengasse.', affiliations: [{ organization: 'Rothschild & Co.', role: 'Dynasty Founder', country: 'United Kingdom', religion: 'jewish', entryId: 'rothschild-and-co' }] },
  'ag-sulzberger': { name: 'A.G. Sulzberger', bio: '5th generation Ochs-Sulzberger to run the New York Times. Publisher since 2018.', affiliations: [{ organization: 'The New York Times', role: 'Publisher', country: 'United States', religion: 'jewish', entryId: 'new-york-times' }] },
  'sarah-kellen': { name: 'Sarah Kellen', bio: 'Epstein personal assistant. Named co-conspirator in court documents.', affiliations: [{ organization: 'Jeffrey Epstein Network', role: 'Personal Assistant', country: 'United States', religion: 'jewish', entryId: 'jeffrey-epstein-network' }] },
  'al-schwimmer': { name: 'Al Schwimmer', bio: 'American-Israeli (1917-2011). Founded IAI. Smuggled aircraft to Israel in 1948. Pardoned by Clinton.', affiliations: [{ organization: 'Israel Aerospace Industries', role: 'Founder', country: 'Israel', religion: 'jewish', entryId: 'israel-aerospace-industries' }] },
  'jonathan-greenblatt': { name: 'Jonathan Greenblatt', bio: 'CEO of the ADL since 2015. Former Obama White House advisor.', affiliations: [{ organization: 'Anti-Defamation League', role: 'CEO', country: 'United States', religion: 'jewish', entryId: 'anti-defamation-league-adl' }] },
  'abraham-foxman': { name: 'Abraham Foxman', bio: 'Holocaust survivor. Led ADL for 28 years (1987-2015).', affiliations: [{ organization: 'Anti-Defamation League', role: 'National Director (1987-2015)', country: 'United States', religion: 'jewish', entryId: 'anti-defamation-league-adl' }] },
  'ted-deutch': { name: 'Ted Deutch', bio: 'Former US Congressman. AJC CEO since 2022.', affiliations: [{ organization: 'American Jewish Committee', role: 'CEO', country: 'United States', religion: 'jewish', entryId: 'american-jewish-committee-ajc' }] },
  'sally-priesand': { name: 'Sally Priesand', bio: 'First American female rabbi. Ordained at HUC-JIR in 1972.', affiliations: [{ organization: 'Hebrew Union College', role: 'First Female Rabbi', country: 'United States', religion: 'jewish', entryId: 'hebrew-union-college-jir' }] }
};

for (const [id, data] of Object.entries(peopleBatch)) {
  if (addPerson(id, data)) addedPeople++;
  else updatedPeople++;
}

// ============================================================================
// Write everything back
// ============================================================================
cd.sort();
fs.writeFileSync(jewishPath, JSON.stringify(jd, null, 2), 'utf8');
fs.writeFileSync(peoplePath, JSON.stringify(pd, null, 2), 'utf8');
fs.writeFileSync(countriesPath, JSON.stringify(cd, null, 2), 'utf8');

// Final stats
let totalEntries = 0, totalConns = 0, totalCats = new Set();
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    totalEntries++;
    totalConns += (e.connections || []).length;
    if (e.category) totalCats.add(e.category);
  }
}
console.log(`\n=== DATA EXPANSION COMPLETE ===`);
console.log(`New entries added: ${addedEntries}`);
console.log(`New people added: ${addedPeople}`);
console.log(`People updated (merged): ${updatedPeople}`);
console.log(`\nTotal entries: ${totalEntries}`);
console.log(`Total countries: ${Object.keys(jd.countries).length}`);
console.log(`Total people: ${Object.keys(pd.people).length}`);
console.log(`Total connections: ${totalConns}`);
console.log(`Total categories: ${totalCats.size}`);
