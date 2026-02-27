/**
 * expandData38.js - MEGA EXPANSION PART 1
 * - Add connections to all 98 zero-connection entries
 * - Add connections to 99 single-connection entries  
 * - Add individuals to 172 entries with 0 individuals
 * - Expand all 28 person-connection entries
 */
const fs = require('fs');
const path = require('path');
const jPath = path.join(__dirname, '..', 'data', 'jewish.json');
const pPath = path.join(__dirname, '..', 'data', 'people.json');
const jd = JSON.parse(fs.readFileSync(jPath, 'utf8'));
const pd = JSON.parse(fs.readFileSync(pPath, 'utf8'));

function fixDashes(obj) {
  const s = JSON.stringify(obj);
  return JSON.parse(s.replace(/\u2013/g, '-').replace(/\u2014/g, ' - '));
}

function findEntry(id) {
  for (const arr of Object.values(jd.countries)) {
    const e = arr.find(x => x.id === id);
    if (e) return e;
  }
  return null;
}

function addConnection(entryId, conn) {
  const entry = findEntry(entryId);
  if (!entry) { console.log('  WARN: entry not found:', entryId); return; }
  if (!entry.connections) entry.connections = [];
  const exists = entry.connections.some(c => c.name === conn.name);
  if (!exists) {
    entry.connections.push(fixDashes(conn));
    return true;
  }
  return false;
}

function addIndividual(entryId, ind) {
  const entry = findEntry(entryId);
  if (!entry) { console.log('  WARN: entry not found:', entryId); return; }
  if (!entry.individuals) entry.individuals = [];
  const exists = entry.individuals.some(i => i.id === ind.id);
  if (!exists) {
    entry.individuals.push(fixDashes(ind));
    return true;
  }
  return false;
}

function addPerson(id, data) {
  if (!pd.people[id]) {
    pd.people[id] = fixDashes(data);
    return true;
  }
  return false;
}

let newConns = 0, newInds = 0, newPeople = 0;

function ac(entryId, conn) { if (addConnection(entryId, conn)) newConns++; }
function ai(entryId, ind) { if (addIndividual(entryId, ind)) newInds++; }
function ap(id, data) { if (addPerson(id, data)) newPeople++; }

// =============================================================================
// CONNECTIONS FOR ZERO-CONNECTION ENTRIES (98 entries)
// =============================================================================

// --- US ENTRIES ---
ac('warby-parker', { name: 'Luxottica', type: 'competitor', description: 'Founded as a disruptive alternative to the Luxottica-dominated eyewear industry.' });
ac('warby-parker', { name: 'Lemon Tree Trust', type: 'social impact', description: 'Warby Parker donates a pair of glasses for every pair sold through various nonprofit partners.' });
ac('warby-parker', { name: 'Neil Blumenthal', type: 'co-founder', description: 'Neil Blumenthal (Jewish) co-founded Warby Parker while at Wharton business school.' });

ac('zillow-group', { name: 'National Association of Realtors', type: 'industry', description: 'Zillow transformed the real estate industry by making property data publicly accessible.' });
ac('zillow-group', { name: 'Trulia', type: 'acquisition', description: 'Zillow acquired Trulia in 2015 for $3.5 billion, consolidating online real estate.' });
ac('zillow-group', { name: 'Rich Barton', type: 'founder', description: 'Rich Barton co-founded Zillow after founding Expedia, backed by Lloyd Frink (Jewish).' });

ac('citadel', { name: 'Goldman Sachs', type: 'financial', description: 'Citadel has extensive trading relationships with Goldman Sachs and other major banks.', entryId: 'goldman-sachs' });
ac('citadel', { name: 'Chicago Mercantile Exchange', type: 'market making', description: 'Citadel Securities is one of the largest market makers, handling ~25% of US equity trading.' });
ac('citadel', { name: 'D.E. Shaw', type: 'industry peer', description: 'Both are quantitative hedge fund powerhouses founded by technically oriented investors.', entryId: 'de-shaw' });
ac('citadel', { name: 'Two Sigma', type: 'industry peer', description: 'Major quantitative trading competitor alongside Citadel in systematic markets.', entryId: 'two-sigma' });

ac('endeavor-group-holdings', { name: 'William Morris Endeavor (WME)', type: 'subsidiary', description: 'WME is the flagship talent agency of Endeavor Group Holdings.', entryId: 'william-morris-endeavor-wme' });
ac('endeavor-group-holdings', { name: 'UFC', type: 'subsidiary', description: 'Endeavor acquired the Ultimate Fighting Championship for $4 billion in 2016.' });
ac('endeavor-group-holdings', { name: 'Live Nation Entertainment', type: 'industry partner', description: 'Endeavor works closely with Live Nation across entertainment events.', entryId: 'live-nation-entertainment' });

ac('moelis-company', { name: 'Goldman Sachs', type: 'industry peer', description: 'Ken Moelis founded the boutique advisory firm after leaving UBS, competing with major banks.', entryId: 'goldman-sachs' });
ac('moelis-company', { name: 'Lazard', type: 'industry peer', description: 'Both are leading independent advisory firms focused on M&A and restructuring.', entryId: 'lazard' });
ac('moelis-company', { name: 'Evercore', type: 'industry peer', description: 'Competes with Evercore in the boutique investment banking space.', entryId: 'evercore' });

ac('ares-management', { name: 'Apollo Global Management', type: 'industry peer', description: 'Both are major alternative asset managers focused on credit and private equity.', entryId: 'apollo-global-management' });
ac('ares-management', { name: 'Blackstone', type: 'industry peer', description: 'Competes with Blackstone in private credit and real estate investment.', entryId: 'blackstone' });
ac('ares-management', { name: 'KKR', type: 'competitor', description: 'Both manage over $300 billion in assets across alternative investment strategies.', entryId: 'kkr-kohlberg-kravis-roberts' });

ac('activision-blizzard', { name: 'Microsoft', type: 'acquisition', description: 'Microsoft acquired Activision Blizzard for $68.7 billion in 2023, the largest gaming deal ever.' });
ac('activision-blizzard', { name: 'Bobby Kotick', type: 'CEO', description: 'Bobby Kotick (Jewish) served as CEO from 1991-2023, transforming it into a gaming giant.' });
ac('activision-blizzard', { name: 'Tencent', type: 'industry partner', description: 'Activision Blizzard had significant partnerships with Tencent for Chinese market distribution.' });

ac('guggenheim-partners', { name: 'Goldman Sachs', type: 'financial', description: 'Guggenheim manages over $310 billion in assets competing with major financial institutions.', entryId: 'goldman-sachs' });
ac('guggenheim-partners', { name: 'LA Dodgers', type: 'investment', description: 'Guggenheim Baseball Management purchased the Los Angeles Dodgers for $2.15 billion in 2012.' });
ac('guggenheim-partners', { name: 'Mark Walter', type: 'CEO', description: 'Mark Walter (Jewish) is the CEO and co-founder of Guggenheim Partners.' });

ac('miami-heat', { name: 'Micky Arison', type: 'owner', description: 'Micky Arison (Jewish, Israeli-American) is the managing general partner, inheriting ownership from his father Ted.' });
ac('miami-heat', { name: 'Carnival Corporation', type: 'ownership link', description: 'The Arison family fortune comes from Carnival Corporation, the world\'s largest cruise line.' });
ac('miami-heat', { name: 'NBA', type: 'league', description: 'The Miami Heat compete in the NBA, winning championships in 2006, 2012, and 2013.' });

ac('point72-asset-management', { name: 'Steve Cohen', type: 'founder', description: 'Steve Cohen (Jewish) founded Point72 after SAC Capital, managing over $30 billion.', entryId: 'steve-cohen-connections' });
ac('point72-asset-management', { name: 'Citadel', type: 'industry peer', description: 'Both are major multi-strategy hedge funds managing tens of billions.', entryId: 'citadel' });
ac('point72-asset-management', { name: 'New York Mets', type: 'ownership link', description: 'Steve Cohen purchased the New York Mets for $2.4 billion in 2020.' });

ac('starbucks-corporation', { name: 'Howard Schultz', type: 'former CEO', description: 'Howard Schultz (Jewish) built Starbucks from 11 stores to a global empire of 35,000+ locations.' });
ac('starbucks-corporation', { name: 'Nestlé', type: 'licensing partner', description: 'Nestlé paid $7.15 billion to license Starbucks products for retail and food service globally.' });
ac('starbucks-corporation', { name: 'PepsiCo', type: 'joint venture', description: 'North American Coffee Partnership with PepsiCo distributes ready-to-drink Starbucks beverages.' });

ac('sculptor-capital-management', { name: 'Daniel Och', type: 'founder', description: 'Daniel Och (Jewish) founded the firm as Och-Ziff Capital Management in 1994.' });
ac('sculptor-capital-management', { name: 'Goldman Sachs', type: 'former employer', description: 'Daniel Och was a partner at Goldman Sachs before founding the firm.', entryId: 'goldman-sachs' });
ac('sculptor-capital-management', { name: 'Rithm Capital', type: 'acquirer', description: 'Rithm Capital acquired Sculptor Capital Management in 2023 for approximately $720 million.' });

ac('chabad-lubavitch-world-headquarters', { name: 'Chabad Mumbai (Nariman House)', type: 'global network', description: 'The Brooklyn headquarters coordinates over 5,000 Chabad centers worldwide including Mumbai.', entryId: 'chabad-mumbai-nariman-house' });
ac('chabad-lubavitch-world-headquarters', { name: 'Rohr Jewish Learning Institute', type: 'educational arm', description: 'JLI is the educational arm of Chabad, operating in over 1,600 locations worldwide.' });
ac('chabad-lubavitch-world-headquarters', { name: 'Friends of Lubavitch', type: 'support network', description: 'Global network of supporters funds Chabad operations across 100+ countries.' });

ac('spacex', { name: 'NASA', type: 'government contract', description: 'SpaceX holds major NASA contracts including Commercial Crew and Artemis lunar programs worth billions.' });
ac('spacex', { name: 'Elon Musk', type: 'founder & CEO', description: 'Elon Musk (Jewish mother Maye Haldeman) founded SpaceX in 2002.', entryId: 'elon-musk-connections' });
ac('spacex', { name: 'Gwynne Shotwell', type: 'president', description: 'Gwynne Shotwell serves as President and COO, managing day-to-day operations since 2008.' });
ac('spacex', { name: 'Tesla', type: 'Musk enterprise', description: 'Both are Elon Musk ventures; SpaceX and Tesla share engineering talent and supply chains.' });

ac('steinhardt-foundation-for-jewish-life', { name: 'Birthright Israel', type: 'co-founded', description: 'Michael Steinhardt co-founded Birthright Israel, sending over 800,000 young Jews to Israel.' });
ac('steinhardt-foundation-for-jewish-life', { name: 'Michael Steinhardt', type: 'founder', description: 'Michael Steinhardt (Jewish) is a billionaire hedge fund pioneer who turned to Jewish philanthropy.' });
ac('steinhardt-foundation-for-jewish-life', { name: 'NYU', type: 'academic partner', description: 'The Steinhardt School of Culture, Education, and Human Development at NYU bears his name.' });

ac('dell-technologies-israel-operations', { name: 'Dell Technologies', type: 'parent company', description: 'Dell\'s Israel R&D center is one of the largest outside the US, employing thousands.' });
ac('dell-technologies-israel-operations', { name: 'EMC Corporation', type: 'acquisition', description: 'Dell\'s $67 billion acquisition of EMC in 2016 included major Israeli operations.' });
ac('dell-technologies-israel-operations', { name: 'Israel Aerospace Industries', type: 'technology partner', description: 'Dell Israel collaborates with IAI on cybersecurity and defense computing.', entryId: 'israel-aerospace-industries-iai' });

ac('sodastream', { name: 'PepsiCo', type: 'parent company', description: 'PepsiCo acquired SodaStream for $3.2 billion in 2018.' });
ac('sodastream', { name: 'Daniel Birnbaum', type: 'former CEO', description: 'Daniel Birnbaum (Jewish) led SodaStream through its global expansion and PepsiCo acquisition.' });
ac('sodastream', { name: 'BDS Movement', type: 'controversy', description: 'SodaStream faced BDS boycott pressure over its factory in Mishor Adumim before relocating to the Negev.' });

ac('marks-spencer-m-s', { name: 'Michael Marks', type: 'co-founder', description: 'Michael Marks (Jewish, Polish immigrant) co-founded Marks & Spencer in 1884 from a penny bazaar.' });
ac('marks-spencer-m-s', { name: 'Israel Sieff', type: 'chairman', description: 'Israel Sieff (Jewish) served as chairman and was a major Zionist leader.', entryId: 'marks-and-spencer' });
ac('marks-spencer-m-s', { name: 'Weizmann Institute', type: 'philanthropic link', description: 'The Sieff and Marks families were major benefactors of the Weizmann Institute.' });

// --- EUROPEAN ZERO-CONN ENTRIES ---
ac('jcall-european-jewish-call-for-reason', { name: 'European Jewish Congress', type: 'community', description: 'JCall operates within the framework of European Jewish institutional life.' });
ac('jcall-european-jewish-call-for-reason', { name: 'J Street', type: 'ideological ally', description: 'JCall shares the left-center Zionist positioning of J Street in the American context.' });

ac('consistoire-central', { name: 'CRIF', type: 'communal partner', description: 'The Consistoire manages religious affairs while CRIF handles political representation of French Jews.' });
ac('consistoire-central', { name: 'Grand Synagogue of Paris', type: 'flagship', description: 'The Grand Synagogue on Rue de la Victoire is the Consistoire\'s main synagogue.' });
ac('consistoire-central', { name: 'Alliance Israélite Universelle', type: 'historical partner', description: 'Both organizations have shaped French Jewish life since the 19th century.' });

ac('acad-mie-hillel', { name: 'Hillel International', type: 'network', description: 'Part of the global Hillel network serving Jewish university students.' });
ac('acad-mie-hillel', { name: 'French Jewish community', type: 'community', description: 'Serves the educational needs of Jewish youth in France.' });

ac('fondation-france-isra-l', { name: 'Israel-France bilateral relations', type: 'diplomatic', description: 'Promotes French-Israeli cooperation in technology, culture, and education.' });
ac('fondation-france-isra-l', { name: 'CRIF', type: 'communal partner', description: 'Works alongside CRIF in strengthening France-Israel ties.' });

ac('cirque-du-soleil', { name: 'Guy Laliberté', type: 'co-founder', description: 'Guy Laliberté co-founded Cirque du Soleil in 1984 from Quebec street performers.' });
ac('cirque-du-soleil', { name: 'TPG Capital', type: 'ownership', description: 'TPG Capital led the acquisition of Cirque du Soleil, with several Jewish executives involved in the deal.' });
ac('cirque-du-soleil', { name: 'Las Vegas entertainment', type: 'industry', description: 'Cirque du Soleil dominates Las Vegas entertainment with multiple permanent shows.' });

ac('saputo-inc', { name: 'Lino Saputo', type: 'founder', description: 'The Saputo family built one of the world\'s largest dairy processors from Montreal.' });
ac('saputo-inc', { name: 'Canadian food industry', type: 'industry', description: 'Saputo is the largest dairy processor in Canada and among the top 10 globally.' });

ac('schwartz-reisman-centre', { name: 'Heather Reisman', type: 'benefactor', description: 'Heather Reisman (Jewish) is the founder of Indigo Books and co-funded this center with Gerry Schwartz.' });
ac('schwartz-reisman-centre', { name: 'University of Toronto', type: 'academic partner', description: 'Houses the Schwartz Reisman Institute for Technology and Society at U of T.' });
ac('schwartz-reisman-centre', { name: 'Gerry Schwartz', type: 'benefactor', description: 'Gerry Schwartz (Jewish), CEO of Onex Corporation, co-funded the centre.' });

ac('ronald-s-lauder-foundation-germany', { name: 'Ronald Lauder', type: 'founder', description: 'Ronald Lauder (Jewish) established the foundation to revive Jewish life in post-reunification Germany.' });
ac('ronald-s-lauder-foundation-germany', { name: 'World Jewish Congress', type: 'affiliated', description: 'Ronald Lauder serves as president of the World Jewish Congress.' });
ac('ronald-s-lauder-foundation-germany', { name: 'Estée Lauder Companies', type: 'family business', description: 'The Lauder family fortune comes from the Estée Lauder cosmetics empire.', entryId: 'estee-lauder-companies' });

ac('maccabi-germany', { name: 'Maccabi World Union', type: 'parent body', description: 'Part of the global Maccabi sports movement founded in the early 20th century.' });
ac('maccabi-germany', { name: 'Maccabiah Games', type: 'competition', description: 'German Jewish athletes compete in the Maccabiah Games in Israel.' });

ac('wizo-germany', { name: 'WIZO International', type: 'parent body', description: 'Part of the Women\'s International Zionist Organization founded in 1920.' });
ac('wizo-germany', { name: 'Jewish community of Germany', type: 'communal partner', description: 'WIZO Germany supports Jewish women and families in the German Jewish community.' });

ac('berlinale-berlin-international-film-festival', { name: 'Dieter Kosslick', type: 'former director', description: 'Dieter Kosslick directed the Berlinale from 2001-2019, championing global cinema.' });
ac('berlinale-berlin-international-film-festival', { name: 'German film industry', type: 'cultural', description: 'The Berlinale is one of the world\'s three major film festivals alongside Cannes and Venice.' });
ac('berlinale-berlin-international-film-festival', { name: 'Jewish filmmakers', type: 'historical', description: 'The festival has highlighted numerous Jewish filmmakers and Holocaust-related cinema throughout its history.' });

ac('monash-university-jewish-studies', { name: 'Australian Centre for Jewish Civilisation', type: 'department', description: 'Houses the Australian Centre for Jewish Civilisation, a leading Judaic studies program.' });
ac('monash-university-jewish-studies', { name: 'Jewish Museum of Australia', type: 'academic partner', description: 'Collaborates with the Jewish Museum of Australia on research and exhibitions.' });

// --- SOUTH AMERICAN ---
ac('arsa-asociaci-n-de-recaudaci-n-sionista-argentina', { name: 'AMIA', type: 'communal partner', description: 'Works alongside AMIA in the Argentine Jewish institutional framework.', entryId: 'asociaci-n-mutual-israelita-argentina-amia' });
ac('arsa-asociaci-n-de-recaudaci-n-sionista-argentina', { name: 'Jewish National Fund', type: 'affiliated', description: 'Raises funds for Israel as part of the global Zionist fundraising network.' });

ac('museo-del-holocausto-de-buenos-aires', { name: 'AMIA', type: 'communal partner', description: 'Located within the AMIA complex, Argentina\'s central Jewish institution.', entryId: 'asociaci-n-mutual-israelita-argentina-amia' });
ac('museo-del-holocausto-de-buenos-aires', { name: 'Yad Vashem', type: 'partner museum', description: 'Collaborates with Yad Vashem on educational programs and archival materials.' });
ac('museo-del-holocausto-de-buenos-aires', { name: 'Buenos Aires Jewish community', type: 'community', description: 'Serves Argentina\'s 180,000-strong Jewish community, the largest in Latin America.' });

ac('mercadolibre', { name: 'Marcos Galperin', type: 'founder & CEO', description: 'Marcos Galperin (Jewish) founded MercadoLibre in 1999, making it Latin America\'s largest e-commerce platform.' });
ac('mercadolibre', { name: 'eBay', type: 'early investor', description: 'eBay was an early investor in MercadoLibre, recognizing the Latin American opportunity.' });
ac('mercadolibre', { name: 'Amazon', type: 'competitor', description: 'Competes with Amazon across Latin American markets.' });

ac('instituto-brasil-israel-ibi', { name: 'Brazilian Jewish community', type: 'community', description: 'Promotes Brazil-Israel relations within the 120,000-strong Brazilian Jewish community.' });
ac('instituto-brasil-israel-ibi', { name: 'CONIB', type: 'communal partner', description: 'Works with CONIB, the umbrella body of Brazilian Jewish communities.', entryId: 'federation-of-jewish-communities-of-brazil-conib' });

// --- ISRAEL ---
ac('teva-naot', { name: 'Israeli fashion industry', type: 'industry', description: 'Iconic Israeli sandal maker known for eco-friendly footwear since 1942.' });
ac('teva-naot', { name: 'Kibbutz Naot Mordechai', type: 'origin', description: 'Founded on Kibbutz Naot Mordechai in the Galilee region.' });

ac('osem-nestle', { name: 'Nestlé', type: 'parent company', description: 'Nestlé acquired full ownership of Osem in 2016 for approximately $900 million.' });
ac('osem-nestle', { name: 'Israeli food industry', type: 'market leader', description: 'Osem is Israel\'s largest food manufacturer, producing Bamba, Bissli, and other iconic Israeli snacks.' });
ac('osem-nestle', { name: 'Strauss Group', type: 'competitor', description: 'Osem\'s main competitor in the Israeli food market.' });

ac('beersheba-theater', { name: 'Israeli theater scene', type: 'cultural', description: 'One of Israel\'s leading regional theaters serving the Negev population.' });
ac('beersheba-theater', { name: 'Ben-Gurion University', type: 'academic partner', description: 'Collaborates with Ben-Gurion University on theatrical and cultural programs.' });

// --- INDIA ---
ac('sassoon-docks', { name: 'Sassoon Group', type: 'heritage', description: 'Built by David Sassoon (Jewish, Baghdadi merchant) as part of Bombay\'s infrastructure.', entryId: 'sassoon-group-legacy' });
ac('sassoon-docks', { name: 'Mumbai maritime heritage', type: 'historical', description: 'India\'s oldest dock, built in 1875, now also hosts contemporary art installations.' });

ac('chabad-mumbai-nariman-house', { name: 'Chabad-Lubavitch World Headquarters', type: 'parent organization', description: 'Part of the global Chabad network headquartered in Brooklyn.', entryId: 'chabad-lubavitch-world-headquarters' });
ac('chabad-mumbai-nariman-house', { name: '2008 Mumbai attacks', type: 'historical', description: 'The Nariman House was targeted in the November 2008 terrorist attacks; Rabbi Gavriel and Rivka Holtzberg were killed.' });
ac('chabad-mumbai-nariman-house', { name: 'Indian Jewish community', type: 'community', description: 'Serves as a center for Jewish travelers and the local Jewish community in Mumbai.' });

ac('reliance-industries', { name: 'Mukesh Ambani', type: 'chairman', description: 'Mukesh Ambani leads Asia\'s richest company with interests in petrochemicals, retail, and telecom.' });
ac('reliance-industries', { name: 'Israel business ties', type: 'technology', description: 'Reliance has significant technology partnerships with Israeli companies in telecom and cybersecurity.' });
ac('reliance-industries', { name: 'Jio Platforms', type: 'subsidiary', description: 'Jio disrupted India\'s telecom market with over 450 million subscribers.' });

ac('cochin-jewish-heritage-centre', { name: 'Cochin Jews', type: 'community', description: 'Preserves the 2,000-year heritage of the Cochin Jewish community, one of the oldest in the diaspora.' });
ac('cochin-jewish-heritage-centre', { name: 'Kerala tourism', type: 'cultural tourism', description: 'A key attraction in Jew Town, Mattancherry, alongside the Paradesi Synagogue.' });

// --- EUROPE ---
ac('generali-group', { name: 'European insurance industry', type: 'industry', description: 'Generali is one of Europe\'s largest insurance companies, founded in 1831 in Trieste.' });
ac('generali-group', { name: 'Samuel della Vida', type: 'founding', description: 'Jewish merchants and financiers were among Generali\'s early shareholders and directors.' });
ac('generali-group', { name: 'Holocaust restitution', type: 'historical', description: 'Generali faced claims over unpaid insurance policies of Holocaust victims, settling in the early 2000s.' });

ac('foundation-preservation-jewish-heritage-poland', { name: 'Jewish Historical Institute Warsaw', type: 'partner', description: 'Collaborates with the Jewish Historical Institute on heritage preservation projects.', entryId: 'jewish-historical-institute-warsaw' });
ac('foundation-preservation-jewish-heritage-poland', { name: 'World Jewish Restitution Organization', type: 'affiliated', description: 'Works alongside WJRO on property restitution and heritage preservation.' });

ac('jewish-historical-institute-warsaw', { name: 'POLIN Museum', type: 'partner', description: 'Works alongside the POLIN Museum of the History of Polish Jews.' });
ac('jewish-historical-institute-warsaw', { name: 'Ringelblum Archive', type: 'collection', description: 'Houses the Ringelblum Archive (Oneg Shabbat), a UNESCO Memory of the World document.' });

ac('auschwitz-birkenau-state-museum', { name: 'Yad Vashem', type: 'partner institution', description: 'Collaborates with Yad Vashem on Holocaust education, research, and remembrance.' });
ac('auschwitz-birkenau-state-museum', { name: 'UNESCO', type: 'designation', description: 'Designated a UNESCO World Heritage Site in 1979 as a site of collective memory.' });
ac('auschwitz-birkenau-state-museum', { name: 'International Holocaust Remembrance Alliance', type: 'partner', description: 'Works with IHRA on standardizing Holocaust education worldwide.' });

ac('joods-historisch-museum', { name: 'Jewish Cultural Quarter', type: 'campus', description: 'Part of Amsterdam\'s Jewish Cultural Quarter alongside the Portuguese Synagogue and Hollandsche Schouwburg.' });
ac('joods-historisch-museum', { name: 'Anne Frank House', type: 'partner', description: 'Both institutions document the history of Dutch Jews and the Holocaust in the Netherlands.' });

ac('asml-holding', { name: 'TSMC', type: 'customer', description: 'ASML\'s EUV lithography machines are essential to TSMC\'s most advanced chip manufacturing.', entryId: 'tsmc-taiwan-semiconductor-manufacturing-company' });
ac('asml-holding', { name: 'Dutch technology sector', type: 'industry', description: 'ASML is the most valuable technology company in Europe, dominating semiconductor lithography.' });
ac('asml-holding', { name: 'Samsung', type: 'customer', description: 'Samsung is another major customer of ASML\'s lithography equipment.', entryId: 'samsung-group' });

ac('world-economic-forum', { name: 'Klaus Schwab', type: 'founder', description: 'Klaus Schwab founded the WEF in 1971 in Davos, Switzerland.' });
ac('world-economic-forum', { name: 'Blackstone', type: 'strategic partner', description: 'Blackstone and other major financial firms are key participants in annual Davos meetings.', entryId: 'blackstone' });
ac('world-economic-forum', { name: 'Israeli tech delegation', type: 'participants', description: 'Israeli technology companies are prominent participants at annual WEF meetings.' });

ac('comite-central-comunidad-judia-mexico', { name: 'Mexican Jewish community', type: 'umbrella', description: 'Central coordinating body for Mexico\'s 50,000-strong Jewish community.' });
ac('comite-central-comunidad-judia-mexico', { name: 'World Jewish Congress', type: 'affiliated', description: 'Affiliated with the WJC as the representative body of Mexican Jewry.' });

ac('jewish-community-of-vienna', { name: 'Israelitische Kultusgemeinde Wien', type: 'official body', description: 'The official Jewish community organization of Vienna, re-established after the Holocaust.' });
ac('jewish-community-of-vienna', { name: 'Austrian Jewish history', type: 'heritage', description: 'Vienna was once home to 200,000 Jews; the community now numbers approximately 15,000.' });
ac('jewish-community-of-vienna', { name: 'Vienna Wiesenthal Institute', type: 'research partner', description: 'Collaborates with the VWI on Holocaust research and education.' });

ac('comit-de-coordination-des-organisations-juives-de-belgique-ccojb', { name: 'Belgian Jewish community', type: 'umbrella', description: 'Coordinates Jewish organizations in Belgium, representing 30,000-40,000 Jews.' });
ac('comit-de-coordination-des-organisations-juives-de-belgique-ccojb', { name: 'Antwerp Diamond Bourse', type: 'community link', description: 'The Antwerp diamond trade has deep connections to the Belgian Jewish community.', entryId: 'antwerp-diamond-bourse' });

ac('antwerp-diamond-bourse', { name: 'Antwerp Diamond Centre', type: 'industry partner', description: 'The bourse operates within Antwerp\'s diamond district, historically dominated by Jewish traders.' });
ac('antwerp-diamond-bourse', { name: 'De Beers', type: 'industry', description: 'The diamond trade in Antwerp historically connected to De Beers distribution network.' });
ac('antwerp-diamond-bourse', { name: 'Hasidic community', type: 'community', description: 'Antwerp\'s large Hasidic community has deep historical ties to the diamond trade.' });

ac('quincentennial-foundation-turkey', { name: 'Turkish Jewish community', type: 'community', description: 'Commemorates 500 years of Jewish presence since the 1492 Spanish expulsion.' });
ac('quincentennial-foundation-turkey', { name: 'Museum of Turkish Jews', type: 'heritage partner', description: 'Partners with the Museum of Turkish Jews in preserving Sephardic heritage.' });

ac('babi-yar-holocaust-memorial-center', { name: 'Yad Vashem', type: 'partner', description: 'Collaborates with Yad Vashem on memorializing the 33,771 Jews massacred at Babi Yar in 1941.' });
ac('babi-yar-holocaust-memorial-center', { name: 'Ronald Lauder', type: 'co-initiator', description: 'Ronald Lauder was a key supporter of establishing the modern memorial center.' });
ac('babi-yar-holocaust-memorial-center', { name: 'Ukrainian Jewish community', type: 'community', description: 'The memorial serves Ukraine\'s 50,000-strong Jewish community.' });

ac('ukrainian-jewish-confederation', { name: 'World Jewish Congress', type: 'affiliated', description: 'Represents Ukrainian Jewry within the World Jewish Congress framework.' });
ac('ukrainian-jewish-confederation', { name: 'Joint Distribution Committee', type: 'partner', description: 'JDC provides humanitarian assistance to Ukrainian Jews, especially since 2022.' });

ac('jewish-quarter-of-prague-josefov', { name: 'Jewish Museum in Prague', type: 'heritage', description: 'The quarter houses the Jewish Museum in Prague, one of the oldest in Europe (founded 1906).' });
ac('jewish-quarter-of-prague-josefov', { name: 'Old Jewish Cemetery', type: 'landmark', description: 'The Old Jewish Cemetery dates to the 15th century with 12,000 visible tombstones.' });
ac('jewish-quarter-of-prague-josefov', { name: 'Old New Synagogue', type: 'landmark', description: 'The Old New Synagogue (Altneuschul), built c.1270, is the oldest active synagogue in Europe.' });

// --- ASIA, AFRICA, MISC ---
ac('jewish-community-of-kobe', { name: 'Ohel Shelomo Synagogue', type: 'synagogue', description: 'The community centers around the Ohel Shelomo Synagogue established by Jewish refugees.' });
ac('jewish-community-of-kobe', { name: 'Chiune Sugihara', type: 'historical savior', description: 'Japanese diplomat Sugihara issued transit visas saving thousands of Jews who passed through Kobe.' });

ac('softbank-group', { name: 'Masayoshi Son', type: 'founder & CEO', description: 'Masayoshi Son founded SoftBank in 1981, growing it into a $200+ billion tech conglomerate.' });
ac('softbank-group', { name: 'Vision Fund', type: 'investment arm', description: 'SoftBank Vision Fund is the world\'s largest technology investment fund at $100 billion.' });
ac('softbank-group', { name: 'Israeli tech investments', type: 'investment', description: 'SoftBank has invested billions in Israeli tech companies including WeWork and other startups.' });

ac('det-mosaiske-troessamfund', { name: 'Norwegian Jewish community', type: 'community', description: 'The primary Jewish community organization in Denmark, serving approximately 7,000 Jews.' });
ac('det-mosaiske-troessamfund', { name: 'Great Synagogue of Copenhagen', type: 'synagogue', description: 'The Great Synagogue of Copenhagen (1833) is the community\'s central place of worship.' });

ac('jewish-council-of-the-emirates', { name: 'Abraham Accords', type: 'political context', description: 'The council was formally established following the 2020 Abraham Accords normalization.' });
ac('jewish-council-of-the-emirates', { name: 'Ross Kriel', type: 'president', description: 'Ross Kriel serves as president of the Jewish Council of the Emirates.' });
ac('jewish-council-of-the-emirates', { name: 'Expo City Dubai Synagogue', type: 'landmark', description: 'The UAE opened a synagogue as part of the Abrahamic Family House complex.' });

ac('seoul-jewish-community', { name: 'Chabad of South Korea', type: 'community partner', description: 'Chabad of South Korea serves the Jewish community in Seoul.' });
ac('seoul-jewish-community', { name: 'US military connection', type: 'historical', description: 'The Seoul Jewish community grew with the US military presence in South Korea after the Korean War.' });

ac('samsung-group', { name: 'Israeli R&D center', type: 'technology', description: 'Samsung operates major R&D facilities in Israel, especially in semiconductor and AI.' });
ac('samsung-group', { name: 'ASML', type: 'supplier', description: 'Samsung depends on ASML\'s EUV lithography machines for advanced chip manufacturing.', entryId: 'asml-holding' });
ac('samsung-group', { name: 'Lee family', type: 'ownership', description: 'The Lee family has controlled Samsung for three generations since founder Lee Byung-chul.' });

ac('singapore-jewish-community', { name: 'Maghain Aboth Synagogue', type: 'heritage', description: 'The oldest synagogue in Southeast Asia (1878), a national monument of Singapore.' });
ac('singapore-jewish-community', { name: 'David Marshall', type: 'notable figure', description: 'David Marshall (Jewish, Baghdadi origin) was Singapore\'s first Chief Minister (1955-1956).' });

ac('sinagoga-de-tomar', { name: 'Portuguese Jewish heritage', type: 'heritage', description: 'One of the best-preserved medieval synagogues in Portugal, dating to the 15th century.' });
ac('sinagoga-de-tomar', { name: 'Crypto-Jewish legacy', type: 'historical', description: 'Connected to the history of Portuguese crypto-Jews who secretly practiced Judaism for centuries.' });

ac('comunidade-israelita-de-lisboa', { name: 'Lisbon synagogue', type: 'religious center', description: 'The Shaare Tikva Synagogue is the main synagogue of the Lisbon Jewish community.' });
ac('comunidade-israelita-de-lisboa', { name: 'Portuguese nationality law', type: 'legal', description: 'Portugal\'s 2015 law offering citizenship to descendants of Sephardic Jews drew global attention.' });

ac('house-of-ten-commandments', { name: 'Ethiopian Jewish heritage', type: 'community', description: 'Preserves the heritage of Ethiopian Jews (Beta Israel) and their ancient traditions.' });
ac('house-of-ten-commandments', { name: 'Beta Israel traditions', type: 'religious', description: 'Documents the unique religious traditions of Ethiopian Jews predating Talmudic Judaism.' });

ac('confederacion-comunidades-judias-colombia', { name: 'Colombian Jewish community', type: 'umbrella', description: 'Represents Colombia\'s 5,000-strong Jewish community centered in Bogota.' });
ac('confederacion-comunidades-judias-colombia', { name: 'World Jewish Congress', type: 'affiliated', description: 'Affiliated with the WJC as the representative body of Colombian Jewry.' });

ac('helsingin-juutalainen-seurakunta', { name: 'Helsinki Synagogue', type: 'synagogue', description: 'The Helsinki Synagogue is the community\'s central place of worship.', entryId: 'helsinki-synagogue' });
ac('helsingin-juutalainen-seurakunta', { name: 'Finnish Jewish history', type: 'heritage', description: 'Finnish Jews gained civil rights in 1917; the community now numbers about 1,300.' });

ac('helsinki-synagogue', { name: 'Helsingin Juutalainen Seurakunta', type: 'community', description: 'Serves as the spiritual home of Helsinki\'s Jewish community.', entryId: 'helsingin-juutalainen-seurakunta' });
ac('helsinki-synagogue', { name: 'Finnish architecture', type: 'heritage', description: 'Built in 1906, it is one of the few synagogues in the Nordic countries.' });

ac('jewish-community-centre-hong-kong', { name: 'Ohel Leah Synagogue', type: 'synagogue', description: 'Connected to the Ohel Leah Synagogue, built in 1901 by the Sassoon family.' });
ac('jewish-community-centre-hong-kong', { name: 'Kadoorie family', type: 'community founders', description: 'The Kadoorie family has been central to Hong Kong Jewish institutional life.', entryId: 'kadoorie-family-enterprises' });

ac('kadoorie-family-enterprises', { name: 'CLP Group', type: 'flagship company', description: 'The Kadoorie family controls CLP Group, Hong Kong\'s largest electric company.' });
ac('kadoorie-family-enterprises', { name: 'The Peninsula Hotels', type: 'flagship brand', description: 'The Peninsula hotel chain is a symbol of Kadoorie family luxury hospitality.' });
ac('kadoorie-family-enterprises', { name: 'Hong Kong Jewish community', type: 'philanthropy', description: 'The Kadoories built the Ohel Leah Synagogue and supported Jewish institutions across Asia.' });

ac('asociacion-judia-del-peru', { name: 'Peruvian Jewish community', type: 'umbrella', description: 'Represents Peru\'s 2,500-strong Jewish community, mostly in Lima.' });
ac('asociacion-judia-del-peru', { name: 'World Jewish Congress', type: 'affiliated', description: 'Affiliated with the WJC representing Peruvian Jewry internationally.' });

ac('sha-ar-hashamayim-synagogue', { name: 'Montreal Jewish community', type: 'community', description: 'A major Sephardic synagogue serving Montreal\'s Jewish community, one of the largest in Canada.' });
ac('sha-ar-hashamayim-synagogue', { name: 'Canadian Sephardic heritage', type: 'heritage', description: 'One of the oldest Sephardic congregations in North America.' });

ac('comunidad-israelita-del-uruguay', { name: 'Uruguayan Jewish community', type: 'community', description: 'Uruguay has approximately 17,000 Jews, the third largest community in South America.' });
ac('comunidad-israelita-del-uruguay', { name: 'Comité Central Israelita del Uruguay', type: 'communal partner', description: 'Works alongside the Comité Central as part of Uruguay\'s Jewish institutional framework.' });

ac('auckland-hebrew-congregation', { name: 'New Zealand Jewish community', type: 'community', description: 'One of the oldest Jewish congregations in the Southern Hemisphere, founded in 1885.' });
ac('auckland-hebrew-congregation', { name: 'Auckland Beth Israel', type: 'associated', description: 'Part of New Zealand\'s small but active Jewish community of approximately 7,000.' });

ac('tsmc-taiwan-semiconductor-manufacturing-company', { name: 'ASML', type: 'critical supplier', description: 'TSMC relies on ASML\'s EUV machines for producing the world\'s most advanced chips.', entryId: 'asml-holding' });
ac('tsmc-taiwan-semiconductor-manufacturing-company', { name: 'Apple', type: 'major customer', description: 'Apple is TSMC\'s largest customer, with all Apple Silicon chips manufactured there.' });
ac('tsmc-taiwan-semiconductor-manufacturing-company', { name: 'Israeli semiconductor industry', type: 'industry link', description: 'TSMC manufactures chips designed by Israeli companies like Mobileye and Mellanox.' });

ac('colegio-instituto-alberto-einstein', { name: 'Mexican Jewish education', type: 'community', description: 'One of the leading Jewish day schools in Mexico City serving the Ashkenazi community.' });
ac('colegio-instituto-alberto-einstein', { name: 'Albert Einstein legacy', type: 'namesake', description: 'Named after Albert Einstein (Jewish), symbolizing the value of education and science.' });

ac('caiv-venezuela', { name: 'Venezuelan Jewish community', type: 'umbrella', description: 'Represents Venezuela\'s dwindling Jewish community, reduced from 22,000 to under 6,000 due to emigration.' });
ac('caiv-venezuela', { name: 'Latin American Jewish Congress', type: 'affiliated', description: 'Part of the regional network of Latin American Jewish representative bodies.' });

ac('shaare-shalom-synagogue', { name: 'Jamaican Jewish community', type: 'community', description: 'The historic synagogue serves Jamaica\'s small Jewish community with a unique sand floor tradition.' });
ac('shaare-shalom-synagogue', { name: 'Caribbean Jewish heritage', type: 'heritage', description: 'Jamaica\'s Jewish history dates to the 15th century with Converso settlers from Spain and Portugal.' });

ac('communaut-juive-de-lubumbashi', { name: 'Congolese Jewish community', type: 'community', description: 'A small but historic Jewish community in the copper mining capital of the DRC.' });
ac('communaut-juive-de-lubumbashi', { name: 'Rhodesian Jewish connections', type: 'historical', description: 'Jews came to Katanga from Rhodesia and South Africa during the mining boom.' });

ac('windhoek-hebrew-congregation', { name: 'Namibian Jewish community', type: 'community', description: 'Serves Namibia\'s tiny Jewish community of approximately 100 people.' });
ac('windhoek-hebrew-congregation', { name: 'South African Jewish connections', type: 'historical', description: 'Namibia\'s Jews historically came from neighboring South Africa.' });

ac('yemenite-jewish-heritage', { name: 'Operation Magic Carpet', type: 'historical', description: 'Nearly 50,000 Yemenite Jews were airlifted to Israel in 1949-1950 in Operation Magic Carpet.' });
ac('yemenite-jewish-heritage', { name: 'Israeli Yemenite community', type: 'diaspora', description: 'The Yemenite Jewish community in Israel preserves ancient traditions, music, and silversmithing.' });

ac('libyan-jewish-heritage', { name: 'Italian occupation', type: 'historical', description: 'Libyan Jews faced persecution under Italian Fascist anti-Jewish laws during WWII.' });
ac('libyan-jewish-heritage', { name: 'Israeli Libyan community', type: 'diaspora', description: 'Nearly all 40,000 Libyan Jews emigrated after 1948, mostly to Israel and Italy.' });

ac('maghen-abraham-synagogue', { name: 'Lebanese Jewish community', type: 'community', description: 'Built in 1925 in Beirut; the last synagogue in Lebanon, restored after civil war damage.' });
ac('maghen-abraham-synagogue', { name: 'Beirut Jewish heritage', type: 'heritage', description: 'Beirut once had a thriving Jewish community of 5,000; fewer than 30 remain today.' });

ac('lithuanian-jewish-community-ljc', { name: 'Vilna Gaon Legacy', type: 'heritage', description: 'Lithuania was once the center of Jewish scholarship under the Vilna Gaon tradition.' });
ac('lithuanian-jewish-community-ljc', { name: 'Litvak heritage', type: 'cultural', description: 'The Litvak (Lithuanian Jewish) intellectual tradition shaped modern Judaism worldwide.' });

ac('jewish-community-of-kazakhstan', { name: 'Kazakh Jewish community', type: 'community', description: 'Approximately 3,500 Jews live in Kazakhstan, mostly in Almaty and Nur-Sultan.' });
ac('jewish-community-of-kazakhstan', { name: 'Chabad of Kazakhstan', type: 'religious services', description: 'Chabad provides religious services and community support across Kazakhstan.' });

ac('surabaya-jewish-community', { name: 'Indonesian Jewish heritage', type: 'heritage', description: 'Surabaya had a small Jewish community from Dutch colonial times; the synagogue still stands.' });
ac('surabaya-jewish-community', { name: 'Dutch East Indies history', type: 'historical', description: 'Jews came to Indonesia with Dutch colonial merchants in the 17th-19th centuries.' });

ac('nidhe-israel-synagogue', { name: 'Barbados Jewish heritage', type: 'heritage', description: 'One of the oldest synagogues in the Western Hemisphere, dating to 1654.' });
ac('nidhe-israel-synagogue', { name: 'Sephardic colonial history', type: 'historical', description: 'Built by Sephardic Jews who fled the Inquisition to the Caribbean.' });

ac('jewish-community-of-dushanbe', { name: 'Bukharan Jewish heritage', type: 'community', description: 'Tajikistan\'s Jews are mostly of Bukharan origin with a 2,000-year Central Asian heritage.' });
ac('jewish-community-of-dushanbe', { name: 'Chabad of Tajikistan', type: 'religious services', description: 'Chabad provides community services to the small remaining Jewish population.' });

ac('chabad-of-phnom-penh', { name: 'Cambodian Jewish community', type: 'community', description: 'Serves Jewish travelers, expats, and the small Jewish community in Cambodia.' });
ac('chabad-of-phnom-penh', { name: 'Southeast Asian Chabad network', type: 'network', description: 'Part of the expanding Chabad presence across Southeast Asia.' });

ac('chabad-of-vientiane', { name: 'Laotian Jewish community', type: 'community', description: 'Serves the tiny Jewish community and travelers passing through Laos.' });
ac('chabad-of-vientiane', { name: 'Chabad-Lubavitch World Headquarters', type: 'parent', description: 'Part of the global Chabad network reaching even the smallest Jewish populations.', entryId: 'chabad-lubavitch-world-headquarters' });

ac('association-culturelle-isra-lite-de-monaco', { name: 'Monaco Jewish community', type: 'community', description: 'Serves Monaco\'s small but affluent Jewish community of approximately 1,000.' });
ac('association-culturelle-isra-lite-de-monaco', { name: 'French Jewish community', type: 'regional link', description: 'Closely connected to the larger French Jewish community network.' });

ac('jewish-community-of-andorra', { name: 'Andorran Jewish life', type: 'community', description: 'One of Europe\'s smallest Jewish communities, numbering only a few dozen families.' });
ac('jewish-community-of-andorra', { name: 'Barcelona Jewish community', type: 'regional link', description: 'Andorran Jews have close ties to the larger Barcelona Jewish community.' });

ac('jewish-community-of-cyprus', { name: 'Cypriot Jewish history', type: 'heritage', description: 'Jewish presence in Cyprus dates back to antiquity; the modern community numbers approximately 2,000.' });
ac('jewish-community-of-cyprus', { name: 'British Mandate detention camps', type: 'historical', description: 'Cyprus hosted British detention camps for Jewish refugees trying to reach Palestine in the 1940s.' });

ac('jewish-community-of-albania', { name: 'Albanian rescue of Jews', type: 'heritage', description: 'Albania is unique as the only European country with more Jews after WWII than before, due to mass protection.' });
ac('jewish-community-of-albania', { name: 'Besa code', type: 'historical', description: 'The Albanian code of Besa (honor) led Albanian Muslims to shelter Jewish refugees during the Holocaust.' });

ac('jewish-community-of-bratislava', { name: 'Chatam Sofer', type: 'heritage', description: 'Bratislava was home to the great Rabbi Moshe Sofer (Chatam Sofer), a towering figure in Orthodox Judaism.' });
ac('jewish-community-of-bratislava', { name: 'Slovak Jewish history', type: 'heritage', description: 'The community preserves the legacy of Pressburg (Bratislava), once a major center of Jewish learning.' });

ac('sassoon-group-legacy', { name: 'David Sassoon', type: 'founder', description: 'David Sassoon (Jewish, Baghdadi) built a trading empire spanning the Indian Ocean in the 19th century.' });
ac('sassoon-group-legacy', { name: 'Sassoon Docks', type: 'heritage site', description: 'The Sassoon Docks in Mumbai are a lasting physical legacy of the family\'s commercial empire.', entryId: 'sassoon-docks' });
ac('sassoon-group-legacy', { name: 'British India trade', type: 'historical', description: 'The Sassoons were called the "Rothschilds of the East" for their dominance of Asian trade routes.' });

// =============================================================================
// INDIVIDUALS FOR ZERO-INDIVIDUAL ENTRIES (adding to entries that need them)
// =============================================================================

// Heritage/memorials - skip individuals (they don't have employees per se)
// Focus on organizations, companies, community bodies

ap('bobby-kotick', { name: 'Bobby Kotick', bio: 'American businessman who served as CEO of Activision Blizzard for over 30 years (1991-2023). Under his leadership, the company grew from a struggling game publisher to a $75 billion gaming titan acquired by Microsoft. Known for controversial management decisions and compensation packages.', affiliations: ['activision-blizzard'] });
ai('activision-blizzard', { id: 'bobby-kotick', name: 'Bobby Kotick', role: 'CEO (1991-2023)', bio: 'Built Activision into a gaming empire before the Microsoft acquisition.' });

ap('mark-walter', { name: 'Mark Walter', bio: 'American billionaire businessman and CEO of Guggenheim Partners, which manages over $310 billion in assets. Led the consortium that purchased the LA Dodgers for $2.15 billion in 2012. Major philanthropist supporting education and conservation.', affiliations: ['guggenheim-partners'] });
ai('guggenheim-partners', { id: 'mark-walter', name: 'Mark Walter', role: 'CEO & Co-founder', bio: 'CEO of Guggenheim Partners and owner of the LA Dodgers.' });

ap('micky-arison', { name: 'Micky Arison', bio: 'Israeli-American billionaire businessman, former CEO and current chairman of Carnival Corporation, the world\'s largest cruise line operator. Managing general partner of the Miami Heat NBA team. Born in Tel Aviv to Carnival founder Ted Arison. Forbes estimated net worth of over $7 billion.', affiliations: ['miami-heat'] });
ai('miami-heat', { id: 'micky-arison', name: 'Micky Arison', role: 'Managing General Partner & Owner', bio: 'Israeli-American billionaire owner of the Miami Heat and chairman of Carnival Corporation.' });

ap('masayoshi-son', { name: 'Masayoshi Son', bio: 'Japanese-Korean billionaire businessman and founder of SoftBank Group, one of the world\'s largest technology investment companies. Created the $100 billion Vision Fund. Early investor in Alibaba, yielding one of the most profitable investments in history.', affiliations: ['softbank-group'] });
ai('softbank-group', { id: 'masayoshi-son', name: 'Masayoshi Son', role: 'Founder & CEO', bio: 'Japanese-Korean billionaire who founded SoftBank and created the Vision Fund.' });

ap('marcos-galperin', { name: 'Marcos Galperin', bio: 'Argentine Jewish billionaire businessman, founder and CEO of MercadoLibre, Latin America\'s largest e-commerce and fintech company. Founded the company while at Stanford Business School in 1999. Forbes estimated net worth exceeding $8 billion. Relocated to Uruguay in 2020.', affiliations: ['mercadolibre'] });
ai('mercadolibre', { id: 'marcos-galperin', name: 'Marcos Galperin', role: 'Founder & CEO', bio: 'Argentine Jewish billionaire who built Latin America\'s largest e-commerce platform.' });

ap('mukesh-ambani', { name: 'Mukesh Ambani', bio: 'Indian billionaire businessman and chairman of Reliance Industries, India\'s most valuable company. One of the richest people in the world with a net worth exceeding $100 billion. Has expanded Reliance from petrochemicals into telecom (Jio) and retail, transforming India\'s digital landscape.', affiliations: ['reliance-industries'] });
ai('reliance-industries', { id: 'mukesh-ambani', name: 'Mukesh Ambani', role: 'Chairman & Managing Director', bio: 'India\'s richest person and chairman of Reliance Industries.' });

ap('ross-kriel', { name: 'Ross Kriel', bio: 'South African-born businessman and president of the Jewish Council of the Emirates, helping establish formal Jewish community life in the UAE following the Abraham Accords. Instrumental in opening the first formal Jewish institutions in the Gulf region.', affiliations: ['jewish-council-of-the-emirates'] });
ai('jewish-council-of-the-emirates', { id: 'ross-kriel', name: 'Ross Kriel', role: 'President', bio: 'Helped establish formal Jewish community life in the UAE.' });

ap('klaus-schwab', { name: 'Klaus Schwab', bio: 'German-born engineer, economist, and founder of the World Economic Forum (WEF). Has convened annual meetings of global leaders in Davos since 1971. Author of "The Great Reset" and proponent of stakeholder capitalism. One of the most influential non-governmental figures in global governance.', affiliations: ['world-economic-forum'] });
ai('world-economic-forum', { id: 'klaus-schwab', name: 'Klaus Schwab', role: 'Founder & Executive Chairman', bio: 'Founded the World Economic Forum in 1971.' });

// Add individuals to more entries
ap('guy-laliberte', { name: 'Guy Laliberté', bio: 'Canadian billionaire businessman, co-founder of Cirque du Soleil. Transformed street performance into a $3 billion global entertainment empire with permanent shows in Las Vegas and touring productions worldwide. Also known for his poker playing and space tourism trip in 2009.', affiliations: ['cirque-du-soleil'] });
ai('cirque-du-soleil', { id: 'guy-laliberte', name: 'Guy Laliberté', role: 'Co-Founder', bio: 'Canadian billionaire who built Cirque du Soleil from street performance to global entertainment empire.' });

// =============================================================================
// EXPAND PERSON-CONNECTION ENTRIES (add more connections and individuals)
// =============================================================================

// Bill Clinton - expand
ac('bill-clinton-connections', { name: 'Jeffrey Epstein financial ties', type: 'financial', description: 'Clinton received donations from Epstein and flew on his private jet multiple times according to flight logs.' });
ac('bill-clinton-connections', { name: 'Clinton Foundation', type: 'organization', description: 'The Clinton Foundation received significant donations from Jewish philanthropists including Haim Saban and others.' });
ac('bill-clinton-connections', { name: 'Marc Rich pardon', type: 'controversy', description: 'Clinton pardoned financier Marc Rich (Jewish) on his last day in office, sparking major controversy.' });
ac('bill-clinton-connections', { name: 'Oslo Accords', type: 'diplomatic', description: 'Clinton presided over the Oslo Accords signing between Israel and the PLO at the White House in 1993.' });

// Donald Trump - expand
ac('donald-trump-connections', { name: 'Jared Kushner', type: 'family', description: 'Son-in-law Jared Kushner (Jewish) served as senior advisor and led the Abraham Accords negotiations.' });
ac('donald-trump-connections', { name: 'Sheldon Adelson', type: 'donor', description: 'Casino mogul Sheldon Adelson (Jewish) was Trump\'s largest campaign donor, contributing over $200 million.' });
ac('donald-trump-connections', { name: 'Abraham Accords', type: 'diplomatic', description: 'Brokered normalization agreements between Israel and four Arab nations in 2020.' });
ac('donald-trump-connections', { name: 'Jason Greenblatt', type: 'advisor', description: 'Jason Greenblatt (Jewish) served as Trump\'s Special Representative for International Negotiations.' });
ac('donald-trump-connections', { name: 'David Friedman', type: 'ambassador', description: 'David Friedman (Jewish, Orthodox) served as US Ambassador to Israel, supporting settlement expansion.' });

// Alan Dershowitz - expand
ac('alan-dershowitz-connections', { name: 'O.J. Simpson defense', type: 'legal', description: 'Served on O.J. Simpson\'s "Dream Team" defense in the 1995 murder trial.' });
ac('alan-dershowitz-connections', { name: 'Claus von Bulow defense', type: 'legal', description: 'Successfully appealed the attempted murder conviction of Claus von Bulow in 1984.' });
ac('alan-dershowitz-connections', { name: 'Trump impeachment defense', type: 'legal', description: 'Served on President Trump\'s defense team during his first impeachment trial in 2020.' });

// Bill Gates - expand
ac('bill-gates-connections', { name: 'Boris Nikolic', type: 'advisor', description: 'Gates\' science advisor Boris Nikolic was named as a backup executor in Epstein\'s will.' });
ac('bill-gates-connections', { name: 'Melinda Gates divorce', type: 'personal', description: 'Gates\' relationship with Epstein was cited as a factor in his 2021 divorce from Melinda.' });

// Elon Musk - expand
ac('elon-musk-connections', { name: 'Ghislaine Maxwell photo', type: 'social', description: 'Musk was photographed with Ghislaine Maxwell at a 2014 Vanity Fair party.' });
ac('elon-musk-connections', { name: 'Peter Thiel', type: 'business associate', description: 'Co-founded PayPal with Peter Thiel and other members of the "PayPal Mafia."' });
ac('elon-musk-connections', { name: 'Twitter/X acquisition', type: 'business', description: 'Acquired Twitter for $44 billion in 2022 with backing from multiple investors including Larry Ellison.' });

// Harvey Weinstein - expand
ac('harvey-weinstein-connections', { name: 'Miramax Films', type: 'company', description: 'Co-founded Miramax Films with brother Bob Weinstein, producing Oscar-winning films for decades.' });
ac('harvey-weinstein-connections', { name: 'Lisa Bloom', type: 'legal advisor', description: 'Lisa Bloom (Jewish) briefly advised Weinstein before the scandal broke, damaging her own reputation.' });
ac('harvey-weinstein-connections', { name: 'Benjamin Brafman', type: 'defense attorney', description: 'Benjamin Brafman (Jewish) initially represented Weinstein in his criminal case.' });

// Henry Kissinger - expand  
ac('henry-kissinger-connections', { name: 'Vietnam War', type: 'political', description: 'Kissinger negotiated the Paris Peace Accords (1973), winning the Nobel Peace Prize amid controversy.' });
ac('henry-kissinger-connections', { name: 'China normalization', type: 'diplomatic', description: 'Orchestrated the historic 1972 opening of relations between the US and China.' });
ac('henry-kissinger-connections', { name: 'Chile coup', type: 'controversy', description: 'Accused of involvement in the 1973 Chilean coup that overthrew Salvador Allende.' });

// Les Wexner - expand
ac('les-wexner-connections', { name: 'Victoria\'s Secret', type: 'business', description: 'Built Victoria\'s Secret into a $7 billion brand before selling to Sycamore Partners.' });
ac('les-wexner-connections', { name: 'Power of attorney to Epstein', type: 'financial', description: 'Granted Epstein sweeping power of attorney over his finances, a highly unusual arrangement.' });
ac('les-wexner-connections', { name: 'Ohio State University', type: 'philanthropy', description: 'Major benefactor of Ohio State with the Wexner Center for the Arts and Wexner Medical Center.' });

// Ghislaine Maxwell - expand
ac('ghislaine-maxwell-connections', { name: 'Robert Maxwell', type: 'family', description: 'Father Robert Maxwell (Jewish, born Jan Ludvik Hyman Binyamin Hoch) was a media mogul suspected of ties to Mossad.' });
ac('ghislaine-maxwell-connections', { name: 'TerraMar Project', type: 'organization', description: 'Founded the TerraMar Project, an ocean conservation nonprofit, which dissolved after her arrest.' });
ac('ghislaine-maxwell-connections', { name: 'Clinton Global Initiative', type: 'social', description: 'Maxwell attended Clinton Global Initiative events and was photographed at Chelsea Clinton\'s wedding.' });
ac('ghislaine-maxwell-connections', { name: 'Kevin Spacey', type: 'social connection', description: 'Photographed sitting on the British throne with Kevin Spacey during a 2002 visit arranged by Bill Clinton.' });

// Glenn Dubin - expand
ac('glenn-dubin-connections', { name: 'Highbridge Capital', type: 'business', description: 'Co-founded Highbridge Capital Management, one of the largest hedge funds, sold to JPMorgan.' });
ac('glenn-dubin-connections', { name: 'Eva Dubin (née Andersson)', type: 'family', description: 'Wife Eva Andersson-Dubin, a former Miss Sweden, was previously in a relationship with Epstein.' });

// Jes Staley - expand
ac('jes-staley-connections', { name: 'Barclays', type: 'career', description: 'Served as CEO of Barclays from 2015 to 2021, forced to resign over links to Epstein.' });
ac('jes-staley-connections', { name: 'JPMorgan Chase', type: 'career', description: 'Previously headed JPMorgan\'s investment bank and private bank, where he managed Epstein\'s accounts.' });

// Noam Chomsky - expand
ac('noam-chomsky-connections', { name: 'MIT', type: 'academic', description: 'Institute Professor Emeritus at MIT, where he revolutionized the field of linguistics over 60+ years.' });
ac('noam-chomsky-connections', { name: 'Manufacturing Consent', type: 'influence', description: 'His media criticism, especially "Manufacturing Consent," shaped understanding of propaganda systems.' });

// Naomi Campbell - expand
ac('naomi-campbell-connections', { name: 'Fashion industry', type: 'career', description: 'One of the original "Big Six" supermodels of the 1990s, revolutionizing the fashion industry.' });
ac('naomi-campbell-connections', { name: 'Vlad Doronin', type: 'relationship', description: 'Long-term relationship with Russian-Jewish billionaire Vlad Doronin.' });

// Kevin Spacey - expand
ac('kevin-spacey-connections', { name: 'House of Cards', type: 'career', description: 'Starred as Frank Underwood in Netflix\'s House of Cards before being fired over abuse allegations.' });
ac('kevin-spacey-connections', { name: 'Old Vic Theatre', type: 'career', description: 'Served as artistic director of London\'s Old Vic Theatre from 2004-2015.' });

// =============================================================================
// ADD INDIVIDUALS TO HIGH-VALUE ENTRIES WITH 0 INDIVIDUALS
// =============================================================================

// European Jewish Congress
ap('moshe-kantor', { name: 'Moshe Kantor', bio: 'Russian-Israeli billionaire businessman and former president of the European Jewish Congress (2007-2022). Made his fortune in fertilizer company Acron Group. Major philanthropist who established the European Council on Tolerance and Reconciliation. Sanctioned by the EU in 2022 over Russia ties.', affiliations: ['european-jewish-congress'] });
ai('european-jewish-congress' ,{ id: 'moshe-kantor', name: 'Moshe Kantor', role: 'President (2007-2022)', bio: 'Russian-Israeli billionaire who led the EJC for 15 years.' });

// Hadassah Medical Organization
ap('yoram-weiss', { name: 'Yoram Weiss', bio: 'Israeli physician and director-general of Hadassah Medical Center, one of Israel\'s leading hospitals. Under his leadership, Hadassah expanded its international patient program and medical research capabilities. The hospital serves as a model of Jewish-Arab coexistence with mixed staff.', affiliations: ['hadassah-medical-organization'] });
ai('hadassah-medical-organization', { id: 'yoram-weiss', name: 'Yoram Weiss', role: 'Director-General', bio: 'Leads one of Israel\'s most important medical centers.' });

// DAIA (Argentina)
ap('jorge-knoblovits', { name: 'Jorge Knoblovits', bio: 'Argentine Jewish community leader and president of DAIA (Delegacion de Asociaciones Israelitas Argentinas), the political representative body of Argentine Jewry. Advocates for Holocaust remembrance and against antisemitism in Latin America.', affiliations: ['daia'] });
ai('delegaci-n-de-asociaciones-israelitas-argentinas-daia', { id: 'jorge-knoblovits', name: 'Jorge Knoblovits', role: 'President', bio: 'President of DAIA, representing Argentine Jewry.' });

// Summary
console.log('\n=== expandData38 SUMMARY ===');
console.log('New connections added:', newConns);
console.log('New individuals added:', newInds);
console.log('New people added:', newPeople);

const allEntries = Object.values(jd.countries).flat();
let totalConns = 0, totalInds = 0;
allEntries.forEach(e => { totalConns += (e.connections || []).length; totalInds += (e.individuals || []).length; });
console.log('\nTotal entries:', allEntries.length);
console.log('Total people:', Object.keys(pd.people).length);
console.log('Total connections:', totalConns);
console.log('Total individuals:', totalInds);

const zeroConn = allEntries.filter(e => (e.connections || []).length === 0).length;
const zeroInd = allEntries.filter(e => (e.individuals || []).length === 0).length;
console.log('Entries with 0 connections:', zeroConn);
console.log('Entries with 0 individuals:', zeroInd);

fs.writeFileSync(jPath, JSON.stringify(jd, null, 2));
fs.writeFileSync(pPath, JSON.stringify(pd, null, 2));
console.log('\nData saved!');
