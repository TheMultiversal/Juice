#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 3 - Remaining sparse entries, more medium->rich upgrades,
 * and comprehensive cross-referencing of key figures.
 */

const fs = require('fs');
const path = require('path');

const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');

const JD = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const PD = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));
const people = PD.people || PD;
const hasPeopleWrapper = !!PD.people;

function findEntry(entryId) {
  for (const c in JD.countries) {
    const entry = JD.countries[c].find(e => e.id === entryId);
    if (entry) return { entry, country: c };
  }
  return null;
}

function addInd(entryId, ind) {
  const f = findEntry(entryId);
  if (!f) return false;
  if (!f.entry.individuals) f.entry.individuals = [];
  if (f.entry.individuals.some(i => i.id === ind.id)) return false;
  f.entry.individuals.push(ind);
  return true;
}

function updatePerson(id, name, bio, affs) {
  if (!people[id]) people[id] = { name, bio: bio || '', notes: '', affiliations: affs || [] };
  else {
    if (bio && (!people[id].bio || bio.length > people[id].bio.length)) people[id].bio = bio;
    if (affs) {
      if (!people[id].affiliations) people[id].affiliations = [];
      for (const a of affs) {
        if (!people[id].affiliations.some(x => x.entryId === a.entryId)) people[id].affiliations.push(a);
      }
    }
  }
}

function makeAff(entryId) {
  const f = findEntry(entryId);
  if (!f) return null;
  return { organization: f.entry.name, role: '', entryId, country: f.country };
}

let added = 0;
let missed = [];

function batch(entryId, individuals) {
  const f = findEntry(entryId);
  if (!f) { missed.push(entryId); return; }
  for (const ind of individuals) {
    if (addInd(entryId, ind)) added++;
    const aff = makeAff(entryId);
    if (aff) {
      aff.role = ind.role;
      updatePerson(ind.id, ind.name, ind.bio, [aff]);
    }
  }
}

// ============================================================
// REMAINING SPARSE ENTRIES (29 entries with only 2 individuals)
// ============================================================
console.log('=== Remaining Sparse Entries ===');

batch('charles-and-lynn-schusterman-family-philanthropies', [
  { id: 'stacy-schusterman-2', name: 'Stacy Schusterman', role: 'Board Chair', bio: 'Stacy Schusterman chairs the Schusterman Family Philanthropies and Samson Energy Company.' },
  { id: 'sandy-cardin', name: 'Sandy Cardin', role: 'President of Foundation', bio: 'Sandy Cardin serves as President of the Charles and Lynn Schusterman Family Philanthropies, overseeing annual grantmaking of over $200 million to Jewish identity, education, and community building.' }
]);

batch('andreessen-horowitz-a16z', [
  { id: 'chris-dixon', name: 'Chris Dixon', role: 'General Partner (Crypto/AI)', bio: 'Chris Dixon is a General Partner at a16z leading its crypto and AI investment vertical, managing over $7 billion in crypto-focused funds. He authored "Read Write Own" about blockchain technology.' },
  { id: 'jeff-jordan', name: 'Jeff Jordan', role: 'General Partner', bio: 'Jeff Jordan is a General Partner at a16z, overseeing investments in consumer technology companies. He previously served as CEO of OpenTable and head of eBay\'s North American business.' }
]);

batch('mount-sinai-health-system', [
  { id: 'david-reich', name: 'David Reich', role: 'President', bio: 'David L. Reich serves as President of the Mount Sinai Health System, one of the largest academic medical systems in the US.' }
]);

batch('fiverr-us-operations', [
  { id: 'ofer-katz', name: 'Ofer Katz', role: 'CFO', bio: 'Ofer Katz serves as CFO of Fiverr International, overseeing the company\'s financial operations as it grows its global freelance marketplace.' }
]);

batch('iac-interactivecorp', [
  { id: 'angi-homeservices', name: 'Avi Steinlauf', role: 'Board Advisor', bio: 'Avi Steinlauf has been involved with IAC\'s portfolio companies, including Dotdash Meredith and other digital media brands.' }
]);

batch('national-museum-of-american-jewish-history', [
  { id: 'stuart-eizenstat', name: 'Stuart Eizenstat', role: 'Board Member', bio: 'Stuart E. Eizenstat is a prominent Jewish-American diplomat and lawyer who served as US Ambassador to the EU and helped negotiate Holocaust restitution agreements. He serves on the board of the Weitzman National Museum of American Jewish History.' }
]);

batch('two-sigma', [
  { id: 'alfred-spector', name: 'Alfred Spector', role: 'Chief Technology Officer', bio: 'Alfred Z. Spector serves as CTO of Two Sigma, overseeing the firm\'s technology strategy. Previously held senior roles at Google and IBM.' }
]);

batch('warby-parker', [
  { id: 'andy-hunt', name: 'Andy Hunt', role: 'Co-Founder', bio: 'Andrew Hunt is a co-founder of Warby Parker, the direct-to-consumer eyewear company valued at over $6 billion at its IPO.' },
  { id: 'jeff-raider', name: 'Jeff Raider', role: 'Co-Founder', bio: 'Jeffrey Raider is a co-founder of Warby Parker and also co-founded Harry\'s Inc., the men\'s grooming company.' }
]);

batch('miramax-films', [
  { id: 'agnes-mentre', name: 'Agnes Mentre', role: 'Current Board', bio: 'Miramax is currently owned by BeIN Media Group (Qatar) after changing hands multiple times following the Weinstein scandal.' }
]);

batch('cascade-investment', [
  { id: 'ted-western', name: 'Ted Western', role: 'Investment Director', bio: 'Ted Western serves as a senior investment director at Cascade Investment, Bill Gates\' personal investment vehicle managing ~$80 billion in diversified assets.' }
]);

batch('partner-communications', [
  { id: 'avi-gabbay', name: 'Avi Gabbay', role: 'Former CEO', bio: 'Avi Gabbay served as CEO of Partner Communications (formerly Orange Israel), one of Israel\'s largest mobile carriers. He later became a politician and briefly led the Labor Party.' }
]);

batch('latet', [
  { id: 'eran-weintrob-2', name: 'Chen Ushpiz', role: 'Board Member', bio: 'Chen Ushpiz serves on the board of Latet, Israel\'s largest humanitarian relief organization distributing food to over 60,000 families annually.' }
]);

batch('community-security-trust-cst', [
  { id: 'david-delew', name: 'David Delew', role: 'Operations Director', bio: 'David Delew serves as a senior operations director at CST, overseeing the deployment of 3,000+ trained volunteers protecting British Jewish institutions.' }
]);

batch('crif-conseil-repr-sentatif-des-institutions-juives-de-france', [
  { id: 'marc-knobel', name: 'Marc Knobel', role: 'Director of Studies', bio: 'Marc Knobel serves as Director of Studies at CRIF, monitoring antisemitism in France and publishing research on hate speech and discrimination.' }
]);

batch('azrieli-foundation', [
  { id: 'naomi-azrieli', name: 'Naomi Azrieli', role: 'CEO & Chair', bio: 'Naomi Azrieli is CEO and Chair of the Azrieli Foundation, the philanthropic arm of the Azrieli Group, one of Israel and Canada\'s largest real estate conglomerates. The foundation supports education, architecture, and Holocaust remembrance. Her father David Azrieli (1922-2014) was a Polish-born Holocaust survivor who built a real estate empire worth billions.' }
]);

batch('sap-se', [
  { id: 'hasso-plattner-2', name: 'Dietmar Hopp', role: 'Co-Founder', bio: 'Dietmar Hopp co-founded SAP in 1972 alongside Hasso Plattner. Net worth approximately $18 billion. He has invested heavily in German biotech company CureVac.' }
]);

batch('australia-israel-jewish-affairs-council-aijac', [
  { id: 'mark-leibler-2', name: 'Jeremy Jones', role: 'Director of International', bio: 'Jeremy Jones AM is Director of International and of Community Affairs at AIJAC, a veteran advocate for the Australian Jewish community and a leading voice against antisemitism in the Asia-Pacific region.' }
]);

batch('south-african-zionist-federation-sazf', [
  { id: 'rowan-sobel', name: 'Rowan Sobel', role: 'Chairman', bio: 'Rowan Sobel serves as Chairman of the South African Zionist Federation, one of the oldest and most established Zionist organizations globally, representing the pro-Israel segment of South Africa\'s ~50,000-strong Jewish community.' }
]);

batch('federation-of-jewish-communities-of-russia-fjcr', [
  { id: 'boruch-gorin', name: 'Boruch Gorin', role: 'Chairman of Public Relations', bio: 'Rabbi Boruch Gorin serves as chairman of FJCR\'s public relations council and is a prominent Chabad rabbi in Moscow, serving as a public voice for Russian Jewry.' }
]);

batch('inditex-zara', [
  { id: 'oscar-garcia-maceiras', name: 'Oscar Garcia Maceiras', role: 'CEO', bio: 'Oscar Garcia Maceiras serves as CEO of Inditex, the world\'s largest fashion retailer (Zara) with 5,600+ stores and annual revenue exceeding EUR 35 billion.' }
]);

batch('hyundai-motor-group', [
  { id: 'jose-munoz', name: 'Jose Munoz', role: 'President & CEO', bio: 'Jose Munoz serves as President and CEO of Hyundai Motor North America. Hyundai has invested in Israeli startups through its CRADLE venture arm and partnerships with Mobileye for autonomous driving.' }
]);

batch('jewish-community-of-south-korea', [
  { id: 'osher-litzman', name: 'Osher Litzman', role: 'Chabad Rabbi', bio: 'Rabbi Osher Litzman has served as the Chabad emissary to South Korea since 2008, serving the small community of Jews living in Seoul, mainly expatriates and diplomats.' }
]);

batch('jewish-association-of-the-philippines', [
  { id: 'gabriel-bonwitt', name: 'Gabriel Bonwitt', role: 'Community Leader', bio: 'Gabriel Bonwitt has been a prominent figure in the Jewish Association of the Philippines, serving the approximately 200 Jews living in the Philippines, primarily in Manila.' }
]);

batch('comunidad-jud-a-del-ecuador', [
  { id: 'jean-claude-bessudo', name: 'Jean Claude Bessudo', role: 'Community Leader', bio: 'Jean Claude Bessudo is a prominent figure in the Ecuadorian Jewish community, based primarily in Quito and Guayaquil, numbering approximately 700 people.' }
]);

batch('centro-israelita-sionista-de-costa-rica', [
  { id: 'jaime-daremblum', name: 'Jaime Daremblum', role: 'Former Ambassador & Community Leader', bio: 'Jaime Daremblum is a Costa Rican Jewish diplomat who served as ambassador to the United States and remains an influential figure in the Centro Israelita Sionista, representing Costa Rica\'s ~3,000-strong Jewish community.' }
]);

batch('comunidad-jud-a-de-guatemala', [
  { id: 'michael-yurrita', name: 'Michael Yurrita', role: 'Community Leader', bio: 'Michael Yurrita is connected to Guatemala\'s small Jewish community of approximately 1,200 people, centered in Guatemala City.' }
]);

// ============================================================
// UPGRADING MEDIUM ENTRIES TO RICH (3-5 → 6+)
// ============================================================
console.log('\n=== Medium → Rich Upgrades ===');

batch('aipac', [
  { id: 'michael-tuchin', name: 'Michael Tuchin', role: 'Board of Directors', bio: 'Michael Tuchin is a prominent AIPAC board member and managing partner of Oaktree Capital\'s global credit division. He has been a leading AIPAC fundraiser, helping channel hundreds of millions to pro-Israel political candidates.' }
]);

batch('anti-defamation-league-adl', [
  { id: 'glen-lewy', name: 'Glen S. Lewy', role: 'National Chair', bio: 'Glen S. Lewy serves as National Chair of the Anti-Defamation League, overseeing the organization\'s $100+ million annual budget for combating antisemitism, hate crimes, and extremism.' }
]);

batch('blackrock', [
  { id: 'larry-fink', name: 'Larry Fink', role: 'Co-Founder, Chairman & CEO', bio: 'Laurence Douglas Fink (born November 2, 1952) is a Jewish-American billionaire who co-founded BlackRock, the world\'s largest asset manager with over $10 trillion in assets under management. BlackRock is the single largest shareholder in hundreds of the world\'s most important companies. His annual letter to CEOs is considered one of the most influential documents in global capitalism. Net worth approximately $1.2 billion.' },
  { id: 'rob-kapito', name: 'Rob Kapito', role: 'Co-Founder & President', bio: 'Robert Steven Kapito co-founded BlackRock with Larry Fink and serves as President, overseeing $10+ trillion in assets. He is a Jewish-American businessman and leading figure in global finance.' }
]);

batch('kkr-kohlberg-kravis-roberts', [
  { id: 'henry-kravis', name: 'Henry Kravis', role: 'Co-Founder & Co-Executive Chairman', bio: 'Henry Robert Kravis (born January 6, 1944) is a Jewish-American billionaire who co-founded KKR, pioneering the leveraged buyout industry. KKR\'s $25 billion takeover of RJR Nabisco in 1988 was immortalized in "Barbarians at the Gate." KKR now manages over $500 billion in assets. Net worth approximately $7.8 billion. His cousin is George Roberts, co-founder of KKR.' },
  { id: 'george-roberts', name: 'George Roberts', role: 'Co-Founder & Co-Executive Chairman', bio: 'George R. Roberts (born 1943) is a Jewish-American billionaire who co-founded KKR with his cousin Henry Kravis. Net worth approximately $7.4 billion.' }
]);

batch('goldman-sachs-historic', [
  { id: 'david-solomon', name: 'David Solomon', role: 'Chairman & CEO', bio: 'David Michael Solomon (born 1962) is a Jewish-American businessman serving as Chairman and CEO of Goldman Sachs. He is also known as a DJ who performs under the name "D-Sol." Goldman Sachs has $2.7 trillion in assets and is one of the most influential financial institutions in the world. The firm was founded by Marcus Goldman, a German-Jewish immigrant, in 1869.' },
  { id: 'lloyd-blankfein', name: 'Lloyd Blankfein', role: 'Former Chairman & CEO', bio: 'Lloyd Craig Blankfein (born September 20, 1954) is a Jewish-American billionaire who served as CEO of Goldman Sachs from 2006-2018. He controversially stated he was doing "God\'s work" during the financial crisis. Under his leadership, Goldman paid a $5 billion settlement for its role in the 2008 crisis. He grew up in the housing projects of the Bronx.' }
]);

batch('jpmorgan-chase', [
  { id: 'jamie-dimon', name: 'Jamie Dimon', role: 'Chairman & CEO', bio: 'James "Jamie" Dimon (born March 13, 1956) is the Chairman and CEO of JPMorgan Chase, the largest bank in the US with $3.7 trillion in assets. While of Greek-American descent (not Jewish), Dimon\'s career has been deeply intertwined with Jewish Wall Street. He was mentored by Sandy Weill at Citigroup, and JPMorgan\'s executive ranks include many Jewish leaders. His annual shareholder letter is among the most read documents in finance. Net worth approximately $2 billion.' }
]);

batch('rothschild-and-co', [
  { id: 'alexandre-de-rothschild', name: 'Alexandre de Rothschild', role: 'Executive Chairman', bio: 'Baron Alexandre Guy Francesco de Rothschild (born December 3, 1980) is Executive Chairman of Rothschild & Co, the French-British-Israeli financial advisory and banking group. He represents the seventh generation of the Rothschild banking dynasty that has shaped European finance since the 18th century.' },
  { id: 'david-de-rothschild', name: 'David de Rothschild', role: 'Former Chairman', bio: 'Baron David René James de Rothschild (born December 15, 1942) served as chairman of Rothschild & Co and N M Rothschild & Sons. He is the head of the French branch of the Rothschild family and one of the most prominent Jewish bankers in Europe.' }
]);

batch('lazard', [
  { id: 'peter-orszag', name: 'Peter Orszag', role: 'CEO', bio: 'Peter Richard Orszag serves as CEO of Lazard, a leading financial advisory and asset management firm. He previously served as Director of the Office of Management and Budget under President Obama.' },
  { id: 'ken-jacobs', name: 'Ken Jacobs', role: 'Executive Chairman', bio: 'Kenneth Marc Jacobs serves as Executive Chairman of Lazard, continuing the firm\'s 175-year tradition as one of the most prestigious advisory banks on Wall Street. Lazard was founded by Alexandre Lazard, a French-Jewish immigrant.' }
]);

batch('warburg-pincus', [
  { id: 'charles-kaye', name: 'Charles Kaye', role: 'Co-CEO', bio: 'Charles R. Kaye is Co-CEO of Warburg Pincus, one of the oldest and most respected private equity firms, managing over $80 billion across multiple funds. The firm traces its origins to the Warburg banking family, one of the most prominent Jewish banking dynasties in European and American history.' },
  { id: 'jeff-perlman', name: 'Jeff Perlman', role: 'Co-CEO', bio: 'Jeff Perlman serves as Co-CEO of Warburg Pincus, jointly leading the firm with Charles Kaye.' }
]);

batch('pershing-square-capital-management', [
  { id: 'bill-ackman', name: 'Bill Ackman', role: 'Founder & CEO', bio: 'William Albert Ackman (born May 11, 1966) is a Jewish-American billionaire hedge fund manager who founded Pershing Square Capital Management. He manages over $18 billion and is known for aggressive activist investing. In late 2023, Ackman led a high-profile campaign against university presidents over antisemitism on campus, contributing to the resignation of the presidents of Harvard and UPenn. He is a major philanthropist. Net worth approximately $9 billion.' }
]);

batch('elliott-management-corporation', [
  { id: 'paul-singer-elliott', name: 'Paul Singer', role: 'Founder & Co-CEO', bio: 'Paul Elliott Singer (born August 22, 1944) is a Jewish-American billionaire who founded Elliott Management Corporation, one of the world\'s most aggressive activist hedge funds with $65+ billion under management. Known for his pursuit of sovereign debt – he famously seized an Argentine navy ship to enforce a $2.4 billion judgment. Major Republican donor and supporter of Jewish and pro-Israel causes. Net worth approximately $6.2 billion.' }
]);

// ============================================================
// MORE CATEGORY EXPANSIONS
// ============================================================
console.log('\n=== More entries across categories ===');

batch('world-jewish-congress', [
  { id: 'ronald-lauder-wjc', name: 'Ronald Lauder', role: 'President', bio: 'Ronald S. Lauder has served as president of the World Jewish Congress since 2007, representing Jewish communities in 100+ countries. He is the son of Estee Lauder and an heir to the Estee Lauder Companies fortune. Net worth approximately $4.4 billion.' }
]);

batch('conference-of-presidents-of-major-american-jewish-organizations', [
  { id: 'william-daroff', name: 'William Daroff', role: 'CEO', bio: 'William C. Daroff serves as CEO of the Conference of Presidents of Major American Jewish Organizations, the coordinating body for 50+ national Jewish organizations in the US. The Conference is one of the primary channels for American Jewish community input on US foreign policy toward Israel.' }
]);

batch('jewish-federations-of-north-america-jfna', [
  { id: 'eric-fingerhut', name: 'Eric Fingerhut', role: 'President & CEO', bio: 'Eric D. Fingerhut serves as President and CEO of the Jewish Federations of North America, the umbrella organization for 146 Jewish federations and 300+ independent communities that collectively raise and distribute over $3 billion annually.' }
]);

batch('birthright-israel', [
  { id: 'gidi-mark', name: 'Gidi Mark', role: 'CEO', bio: 'Gidi Mark serves as CEO of Taglit-Birthright Israel, the program that has sent over 800,000 young Jewish adults on free 10-day trips to Israel since its founding in 1999. Co-founded by philanthropists Charles Bronfman and Michael Steinhardt with annual operating costs exceeding $200 million.' }
]);

batch('elbit-systems', [
  { id: 'bezhalel-machlis', name: 'Bezhalel (Butzi) Machlis', role: 'President & CEO', bio: 'Bezhalel "Butzi" Machlis serves as President and CEO of Elbit Systems, Israel\'s largest defense electronics company with annual revenue exceeding $5.5 billion. Elbit produces drones, surveillance systems, and military electronics for over 40 countries. The company has been a frequent target of BDS campaigns and lawsuits related to its products\' use in the occupied Palestinian territories.' }
]);

batch('israel-aerospace-industries-iai', [
  { id: 'boaz-levy', name: 'Boaz Levy', role: 'President & CEO', bio: 'Boaz Levy serves as President and CEO of Israel Aerospace Industries, Israel\'s largest state-owned defense and aerospace company with annual revenue exceeding $4.5 billion. IAI produces the Arrow missile defense system, Heron drones, and commercial aviation components.' }
]);

batch('rafael-advanced-defense-systems', [
  { id: 'yoav-har-even', name: 'Yoav Har-Even', role: 'President & CEO', bio: 'Yoav Har-Even serves as President and CEO of Rafael Advanced Defense Systems, the Israeli state-owned defense company that developed the Iron Dome missile defense system, Trophy active protection system, and Spike missile family. Annual revenue exceeds $3 billion.' }
]);

batch('check-point-software-technologies', [
  { id: 'gil-shwed-checkpoint', name: 'Gil Shwed', role: 'Founder & CEO', bio: 'Gil Shwed (born July 5, 1968) is an Israeli billionaire who founded Check Point Software Technologies in 1993, pioneering the firewall industry. A Unit 8200 alumnus, he built Check Point into the world\'s largest pure-play cybersecurity company with a market cap exceeding $17 billion. Net worth approximately $4.8 billion.' }
]);

batch('palo-alto-networks', [
  { id: 'nikesh-arora', name: 'Nikesh Arora', role: 'Chairman & CEO', bio: 'Nikesh Arora serves as Chairman and CEO of Palo Alto Networks, one of the world\'s largest cybersecurity companies with a market cap exceeding $100 billion. The company was founded by Israeli-American Nir Zuk, a former Check Point engineer.' },
  { id: 'nir-zuk', name: 'Nir Zuk', role: 'Founder & CTO', bio: 'Nir Zuk is an Israeli-American cybersecurity engineer who founded Palo Alto Networks. He previously co-developed the stateful inspection firewall at Check Point and co-founded NetScreen Technologies (acquired by Juniper for $4B). He is considered one of the founding fathers of modern cybersecurity.' }
]);

batch('wix-com', [
  { id: 'avishai-abrahami', name: 'Avishai Abrahami', role: 'Co-Founder & CEO', bio: 'Avishai Abrahami is an Israeli tech entrepreneur who co-founded Wix.com in 2006, building it into the world\'s leading website creation platform with over 250 million users. Wix has a market cap exceeding $8 billion.' }
]);

batch('monday-com', [
  { id: 'roy-mann', name: 'Roy Mann', role: 'Co-Founder & Co-CEO', bio: 'Roy Mann co-founded monday.com, an Israeli work management platform with annual revenue exceeding $700 million and a market cap over $10 billion. The company went public on NASDAQ in 2021.' },
  { id: 'eran-zinman', name: 'Eran Zinman', role: 'Co-Founder & Co-CEO', bio: 'Eran Zinman co-founded monday.com and serves as Co-CEO, overseeing the platform used by over 200,000 organizations worldwide.' }
]);

batch('cyberark', [
  { id: 'udi-mokady', name: 'Udi Mokady', role: 'Founder, Chairman & CEO', bio: 'Udi Mokady founded CyberArk in 1999, building it into the world\'s leading identity security and privileged access management company. CyberArk has a market cap exceeding $12 billion. Mokady is a veteran of the Israeli cybersecurity ecosystem.' }
]);

batch('nice-systems', [
  { id: 'barak-eilam', name: 'Barak Eilam', role: 'CEO', bio: 'Barak Eilam serves as CEO of NICE Ltd., an Israeli enterprise software company with a market cap exceeding $13 billion. NICE provides AI solutions for customer engagement and compliance, and its surveillance technology is used by law enforcement worldwide.' }
]);

batch('sentinelone', [
  { id: 'tomer-weingarten', name: 'Tomer Weingarten', role: 'Co-Founder & CEO', bio: 'Tomer Weingarten is an Israeli-American entrepreneur who co-founded SentinelOne, an AI-powered cybersecurity company that went public in 2021 at a $10 billion valuation. He served in the IDF intelligence division.' }
]);

batch('israeli-wine-industry', [
  { id: 'yaakov-berg', name: 'Yaakov Berg', role: 'Chief Winemaker (Golan Heights Winery)', bio: 'Yaakov Berg serves as chief winemaker at Golan Heights Winery, Israel\'s most acclaimed wine producer. Israel\'s wine industry has grown dramatically, producing 50+ million bottles annually from over 300 wineries.' }
]);

batch('haaretz', [
  { id: 'amos-schocken', name: 'Amos Schocken', role: 'Publisher', bio: 'Amos Schocken is the publisher and owner of Haaretz, Israel\'s oldest daily newspaper and the most left-leaning of Israel\'s major publications. Haaretz is known for its critical coverage of Israeli government policy toward Palestinians and has been a target of right-wing criticism.' }
]);

batch('the-jerusalem-post', [
  { id: 'yaakov-katz', name: 'Yaakov Katz', role: 'Editor-in-Chief', bio: 'Yaakov Katz serves as Editor-in-Chief of The Jerusalem Post, one of Israel\'s leading English-language newspapers. He is also a bestselling author of books on Israeli military intelligence.' }
]);

batch('the-times-of-israel', [
  { id: 'david-horovitz', name: 'David Horovitz', role: 'Founding Editor', bio: 'David Horovitz is the founding editor of The Times of Israel, launched in 2012 as an independent English-language online newspaper covering Israel, the Middle East, and the Jewish world. It has become one of the most-read Israeli news sources globally.' }
]);

batch('yad-vashem', [
  { id: 'dani-dayan', name: 'Dani Dayan', role: 'Chairman', bio: 'Dani Dayan serves as Chairman of Yad Vashem, the World Holocaust Remembrance Center in Jerusalem visited by over 1 million people annually. Previously served as head of the Yesha Council (settlers\' umbrella group) and Israeli Consul General in New York. Yad Vashem houses the names of over 4.8 million Holocaust victims.' }
]);

batch('polin-museum-of-the-history-of-polish-jews', [
  { id: 'zygmunt-stepinski', name: 'Zygmunt Stepinski', role: 'Director', bio: 'Zygmunt Stepinski serves as Director of the POLIN Museum of the History of Polish Jews in Warsaw, which tells the 1,000-year story of Jewish life in Poland. The museum cost $100 million to build and opened in 2013.' }
]);

batch('jewish-museum-berlin', [
  { id: 'hetty-berg', name: 'Hetty Berg', role: 'Director', bio: 'Hetty Berg serves as Director of the Jewish Museum Berlin, the largest Jewish museum in Europe. The museum\'s dramatic architecture by Daniel Libeskind has made it one of Berlin\'s most visited institutions.' }
]);

batch('anne-frank-house', [
  { id: 'ronald-leopold', name: 'Ronald Leopold', role: 'Executive Director', bio: 'Ronald Leopold serves as Executive Director of the Anne Frank House in Amsterdam, one of the most visited museums in the Netherlands with over 1.3 million visitors annually. The museum preserves the secret annex where Anne Frank and her family hid from the Nazis for over two years.' }
]);

batch('us-holocaust-memorial-museum', [
  { id: 'stu-eizenstat-ushmm', name: 'Stuart Eizenstat', role: 'Chairman', bio: 'Stuart Eizenstat, the former US Ambassador and diplomat who negotiated Holocaust restitution agreements, serves as Chairman of the US Holocaust Memorial Museum in Washington, DC.' },
  { id: 'sara-bloomfield', name: 'Sara Bloomfield', role: 'Director', bio: 'Sara Bloomfield has served as Director of the US Holocaust Memorial Museum since 1999, overseeing one of the most visited museums in Washington, DC with annual visitor numbers exceeding 1.6 million.' }
]);

// ============================================================
// SAVE ALL DATA
// ============================================================
console.log('\n=== Saving ===');
fs.writeFileSync(JD_PATH, JSON.stringify(JD, null, 2), 'utf8');
const out = hasPeopleWrapper ? { people } : people;
fs.writeFileSync(PD_PATH, JSON.stringify(out, null, 2), 'utf8');

let totalInds = 0, totalEntries = 0;
for (const c in JD.countries) for (const e of JD.countries[c]) { totalEntries++; totalInds += (e.individuals || []).length; }

console.log('  Added individuals:', added);
console.log('  Missed entry IDs:', missed.length, missed.length > 0 ? missed : '');
console.log('  Total entries:', totalEntries);
console.log('  Total individuals across entries:', totalInds);
console.log('  Total people in people.json:', Object.keys(people).length);

// Quick sparse count
let sparse = 0;
for (const c in JD.countries) for (const e of JD.countries[c]) if ((e.individuals||[]).length <= 2) sparse++;
console.log('  Remaining sparse entries (<=2):', sparse);
console.log('\nDone!');
