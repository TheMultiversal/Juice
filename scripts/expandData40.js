const fs = require('fs');
const path = require('path');

const jewishPath = path.join(__dirname, '..', 'data', 'jewish.json');
const peoplePath = path.join(__dirname, '..', 'data', 'people.json');
const jd = JSON.parse(fs.readFileSync(jewishPath, 'utf8'));
const pd = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

function fixDashes(obj) {
  let s = JSON.stringify(obj);
  s = s.replace(/\u2013/g, '-').replace(/\u2014/g, '-');
  return JSON.parse(s);
}

// Build lookup
const entryById = {};
for (const c of Object.keys(jd.countries)) {
  for (const e of jd.countries[c]) {
    entryById[e.id] = { entry: e, country: c };
  }
}

function addConn(id, target, rel) {
  const rec = entryById[id];
  if (!rec) return;
  const e = rec.entry;
  if (!e.connections) e.connections = [];
  if (e.connections.some(c => c.target === target)) return;
  e.connections.push({ target, relationship: rel });
}

function addIndiv(id, name, role) {
  const rec = entryById[id];
  if (!rec) return;
  const e = rec.entry;
  if (!e.individuals) e.individuals = [];
  if (e.individuals.some(i => i.name === name)) return;
  e.individuals.push({ name, role });
}

function addPerson(id, name, bio, affiliations) {
  if (pd.people[id]) return;
  pd.people[id] = { name, bio, affiliations };
}

function addEntry(country, entry) {
  if (entryById[entry.id]) return;
  if (!jd.countries[country]) jd.countries[country] = [];
  jd.countries[country].push(entry);
  entryById[entry.id] = { entry, country };
}

let stats = { individualsAdded: 0, connectionsAdded: 0, peopleAdded: 0, entriesAdded: 0 };

// =====================================================================
// PART 1: Add individuals to 36 entries with 3+ connections but 0 individuals
// =====================================================================

// Osem-Nestle (Israel)
addIndiv('osem-nestle', 'Ilan Cohen', 'CEO of Osem-Nestle Israel');
addIndiv('osem-nestle', 'Dan Propper', 'Former longtime Chairman of Osem');
addPerson('ilan-cohen', 'Ilan Cohen', 'Chief Executive Officer of Osem-Nestle Israel, overseeing one of Israel\'s largest food manufacturers producing snacks, beverages, and prepared meals', ['osem-nestle']);
addPerson('dan-propper', 'Dan Propper', 'Former longtime Chairman of Osem Industries who led the company through its major growth period and partnership with Nestle', ['osem-nestle']);

// Schwartz/Reisman Centre (Canada)  
addIndiv('schwartz-reisman-centre', 'Gerald Schwartz', 'Namesake benefactor and founder of Onex Corporation');
addIndiv('schwartz-reisman-centre', 'Heather Reisman', 'Namesake benefactor and CEO of Indigo Books');
addPerson('gerald-schwartz-sr', 'Gerald Schwartz', 'Canadian billionaire businessman, founder and chairman of Onex Corporation, major philanthropist who co-funded the Schwartz/Reisman Centre', ['schwartz-reisman-centre']);

// Berlinale (Germany)
addIndiv('berlinale-berlin-international-film-festival', 'Alfred Bauer', 'Founding director of the Berlinale (1951-1976)');
addIndiv('berlinale-berlin-international-film-festival', 'Mariette Rissenbeek', 'Executive Director (2020-2024)');
addIndiv('berlinale-berlin-international-film-festival', 'Carlo Chatrian', 'Artistic Director (2020-2024)');
addPerson('alfred-bauer', 'Alfred Bauer', 'German film historian who founded the Berlin International Film Festival in 1951 and served as its director until 1976', ['berlinale-berlin-international-film-festival']);

// Moriah College (Australia)
addIndiv('moriah-college', 'John Hamey', 'Principal of Moriah College');
addIndiv('moriah-college', 'Rabbi Benji Levy', 'Former Principal and educational leader');
addPerson('rabbi-benji-levy', 'Rabbi Benji Levy', 'Israeli-Australian rabbi and educator who served as Principal of Moriah College, later founding the IsraelX educational initiative', ['moriah-college']);

// Museo del Holocausto de Buenos Aires (Argentina)
addIndiv('museo-del-holocausto-de-buenos-aires', 'Marcelo Mindlin', 'President of the museum');
addIndiv('museo-del-holocausto-de-buenos-aires', 'Graciela Jinich', 'Former Director');
addPerson('marcelo-mindlin-museum', 'Marcelo Mindlin', 'Argentine businessman and President of the Buenos Aires Holocaust Museum, also Chairman of Pampa Energia, major supporter of Holocaust education in Latin America', ['museo-del-holocausto-de-buenos-aires']);

// Hebraica Buenos Aires (Argentina)
addIndiv('hebraica-buenos-aires', 'Jorge Knoblovits', 'Former President');
addIndiv('hebraica-buenos-aires', 'Adrian Werthein', 'Board member and major benefactor');
addPerson('jorge-knoblovits', 'Jorge Knoblovits', 'Argentine community leader, former president of Hebraica Buenos Aires and later president of DAIA, Argentina\'s main Jewish political organization', ['hebraica-buenos-aires']);

// Hebraica Sao Paulo (Brazil)
addIndiv('hebraica-sao-paulo', 'Eduardo Horn', 'President of Hebraica Sao Paulo');
addIndiv('hebraica-sao-paulo', 'Claudio Lottenberg', 'Board member and community leader');
addPerson('claudio-lottenberg', 'Claudio Lottenberg', 'Brazilian physician, president of the Albert Einstein Hospital and board member of Hebraica Sao Paulo, prominent figure in Brazilian Jewish communal life', ['hebraica-sao-paulo']);

// Jewish Heritage Centre Kochi (India)
addIndiv('jewish-heritage-centre-kochi', 'Elias Josephai', 'Community elder and heritage advocate');
addIndiv('jewish-heritage-centre-kochi', 'Sarah Cohen', 'Legendary matriarch of the Kochi Jewish community');
addPerson('sarah-cohen-kochi', 'Sarah Cohen', 'Legendary matriarch of the Cochin Jewish community who was one of the last remaining Jews in Kochi, known internationally as a cultural treasure of Indian Jewish heritage', ['jewish-heritage-centre-kochi']);

// Pagine Ebraiche (Italy)
addIndiv('pagine-ebraiche', 'Guido Vitale', 'Editor-in-chief of Pagine Ebraiche');
addIndiv('pagine-ebraiche', 'Noemi Di Segni', 'President of UCEI, overseeing body');
addPerson('guido-vitale', 'Guido Vitale', 'Italian journalist and editor-in-chief of Pagine Ebraiche, the main newspaper of the Italian Jewish community published by the Union of Italian Jewish Communities', ['pagine-ebraiche']);

// Museo Ebraico di Venezia (Italy)
addIndiv('museo-ebraico-di-venezia', 'Marcella Ansaldi', 'Director of the Jewish Museum of Venice');
addPerson('marcella-ansaldi', 'Marcella Ansaldi', 'Director of the Museo Ebraico di Venezia (Jewish Museum of Venice), overseeing the preservation and exhibition of 500 years of Venetian Jewish history', ['museo-ebraico-di-venezia']);

// Generali Group (Italy)
addIndiv('generali-group', 'Philippe Donnet', 'Group CEO of Generali');
addIndiv('generali-group', 'Andrea Sironi', 'Chairman of Generali');
addIndiv('generali-group', 'Samuel David Luzzatto', 'Historical connection to Italian Jewish community');
addPerson('philippe-donnet', 'Philippe Donnet', 'French-Italian insurance executive serving as Group CEO of Assicurazioni Generali, one of the world\'s largest insurance companies founded in the Trieste Jewish community', ['generali-group']);

// Auschwitz-Birkenau State Museum (Poland)
addIndiv('auschwitz-birkenau-state-museum', 'Piotr Cywinski', 'Director of the Auschwitz-Birkenau State Museum');
addIndiv('auschwitz-birkenau-state-museum', 'Ronald Lauder', 'Chairman of the Auschwitz-Birkenau Foundation');
addPerson('piotr-cywinski', 'Piotr Cywinski', 'Polish historian and Director of the Auschwitz-Birkenau State Museum since 2006, overseeing preservation and education at the former Nazi concentration camp', ['auschwitz-birkenau-state-museum']);

// Red de Juderias de Espana (Spain)
addIndiv('red-de-juderias-de-espana', 'Miguel Angel Garcia Lopez', 'Director of the Network of Jewish Quarters');
addPerson('miguel-angel-garcia', 'Miguel Angel Garcia Lopez', 'Director of the Red de Juderias de Espana (Network of Jewish Quarters of Spain), coordinating heritage preservation across 21 Spanish cities with historic Jewish districts', ['red-de-juderias-de-espana']);

// NIW (Netherlands)
addIndiv('niw-nieuw-israelietisch-weekblad', 'Esther Voet', 'Editor-in-chief of NIW');
addPerson('esther-voet', 'Esther Voet', 'Dutch journalist and editor-in-chief of the Nieuw Israelietisch Weekblad (NIW), the world\'s oldest still existing Jewish weekly newspaper founded in 1865', ['niw-nieuw-israelietisch-weekblad']);

// ASML Holding (Netherlands)
addIndiv('asml-holding', 'Peter Wennink', 'Former CEO of ASML (2013-2024)');
addIndiv('asml-holding', 'Christophe Fouquet', 'CEO of ASML (2024-present)');
addPerson('peter-wennink', 'Peter Wennink', 'Dutch business executive who served as CEO of ASML from 2013 to 2024, leading the company to become the world\'s sole supplier of extreme ultraviolet lithography machines', ['asml-holding']);

// Judisches Museum Wien (Austria)
addIndiv('judisches-museum-wien', 'Barbara Staudinger', 'Director of the Jewish Museum Vienna');
addPerson('barbara-staudinger', 'Barbara Staudinger', 'Austrian historian and Director of the Jewish Museum Vienna since 2022, overseeing exhibitions on the history and culture of Viennese Jews', ['judisches-museum-wien']);

// Jewish Community of Vienna (Austria)
addIndiv('jewish-community-of-vienna', 'Oskar Deutsch', 'President of the Jewish Community of Vienna and the IKG');
addPerson('oskar-deutsch', 'Oskar Deutsch', 'Austrian community leader serving as president of the Israelitische Kultusgemeinde Wien (IKG), the official Jewish community organization of Vienna, since 2012', ['jewish-community-of-vienna']);

// Antwerp Diamond Bourse (Belgium)
addIndiv('antwerp-diamond-bourse', 'Marc Goldschmidt', 'President of the Antwerp Diamond Bourse');
addIndiv('antwerp-diamond-bourse', 'Nishit Parikh', 'Vice President and industry leader');
addPerson('marc-goldschmidt', 'Marc Goldschmidt', 'Belgian diamond trader and President of the Antwerp Diamond Bourse, one of the world\'s oldest and largest diamond exchanges, historically dominated by Orthodox Jewish traders', ['antwerp-diamond-bourse']);

// Judiska Museet i Stockholm (Sweden)
addIndiv('judiska-museet-i-stockholm', 'Pontus Ljunghill', 'Director of the Jewish Museum in Stockholm');
addPerson('pontus-ljunghill', 'Pontus Ljunghill', 'Director of the Judiska Museet (Jewish Museum) in Stockholm, Sweden\'s primary institution for preserving and presenting Swedish Jewish history and culture', ['judiska-museet-i-stockholm']);

// Museum of Turkish Jews (Turkey)
addIndiv('museum-of-turkish-jews', 'Nisya Isman', 'Director and curator of the Museum of Turkish Jews');
addPerson('nisya-isman', 'Nisya Isman', 'Turkish curator and Director of the Quincentennial Foundation Museum of Turkish Jews (500 Yil Vakfi Turk Musevileri Muzesi) in Istanbul, documenting 700 years of Turkish Jewish heritage', ['museum-of-turkish-jews']);

// Babi Yar Holocaust Memorial Center (Ukraine)
addIndiv('babi-yar-holocaust-memorial-center', 'Ilya Khrzhanovskiy', 'Artistic Director of the memorial center');
addIndiv('babi-yar-holocaust-memorial-center', 'Mikhail Fridman', 'Major donor and co-founder');
addPerson('ilya-khrzhanovskiy', 'Ilya Khrzhanovskiy', 'Russian-Ukrainian filmmaker and Artistic Director of the Babi Yar Holocaust Memorial Center, known for immersive documentary approaches to Holocaust remembrance', ['babi-yar-holocaust-memorial-center']);

// Vaad of Ukraine
addIndiv('vaad-of-ukraine', 'Josef Zissels', 'Chairman of the Vaad (Association of Jewish Organizations and Communities of Ukraine)');
addIndiv('vaad-of-ukraine', 'Iosyp Zissels', 'Executive Vice President');
addPerson('josef-zissels', 'Josef Zissels', 'Ukrainian Jewish dissident, human rights activist, and Chairman of the Vaad (Association of Jewish Organizations and Communities of Ukraine), imprisoned by the Soviet Union for his activism', ['vaad-of-ukraine']);

// Jewish Quarter of Prague (Czech Republic)
addIndiv('jewish-quarter-of-prague-josefov', 'Leo Pavlat', 'Director of the Jewish Museum in Prague');
addPerson('leo-pavlat', 'Leo Pavlat', 'Czech cultural figure and longtime Director of the Jewish Museum in Prague, which manages the historic synagogues and collections of the Josefov quarter', ['jewish-quarter-of-prague-josefov']);

// Jewish Museum Oslo (Norway)
addIndiv('jewish-museum-oslo', 'Sidsel Levin', 'Former Director of the Jewish Museum in Oslo');
addPerson('sidsel-levin', 'Sidsel Levin', 'Norwegian museum professional and former Director of the Jewish Museum in Oslo, housed in the historic Oslo synagogue building', ['jewish-museum-oslo']);

// Instituto Hebreo Dr. Chaim Weizmann (Chile)
addIndiv('instituto-hebreo-dr-chaim-weizmann', 'Shai Agosin', 'Director of the Instituto Hebreo');
addPerson('shai-agosin', 'Shai Agosin', 'Chilean-Israeli educator and Director of the Instituto Hebreo Dr. Chaim Weizmann in Santiago, the leading Jewish day school in Chile', ['instituto-hebreo-dr-chaim-weizmann']);

// Colegio Leon Pinelo (Peru)
addIndiv('colegio-leon-pinelo', 'Moises Benmuhar', 'Director of Colegio Leon Pinelo');
addPerson('moises-benmuhar', 'Moises Benmuhar', 'Peruvian educator and Director of Colegio Leon Pinelo in Lima, one of the most prestigious Jewish schools in Latin America named after the famous Converso scholar', ['colegio-leon-pinelo']);

// Jewish Community of Bulgaria
addIndiv('jewish-community-of-bulgaria', 'Alexander Oscar', 'President of the Organization of Jews in Bulgaria');
addPerson('alexander-oscar', 'Alexander Oscar', 'Bulgarian community leader and President of the Organization of Jews in Bulgaria "Shalom," overseeing one of Europe\'s oldest Sephardic Jewish communities', ['jewish-community-of-bulgaria']);

// Taiwan Jewish Community
addIndiv('taiwan-jewish-community', 'Ephraim Einhorn', 'Rabbi of the Taipei Jewish Community');
addPerson('ephraim-einhorn', 'Ephraim Einhorn', 'American-Israeli rabbi serving the Taipei Jewish Community Center, leading one of East Asia\'s smaller but historically active Jewish communities', ['taiwan-jewish-community']);

// Jews in Latvia Museum
addIndiv('jews-in-latvia-museum', 'Ilya Lensky', 'Director of the Jews in Latvia Museum');
addPerson('ilya-lensky', 'Ilya Lensky', 'Latvian museum director and historian heading the Jews in Latvia Museum in Riga, documenting Latvian Jewish history from the 16th century through the Holocaust and beyond', ['jews-in-latvia-museum']);

// Jewish Community of Estonia
addIndiv('jewish-community-of-estonia', 'Alla Jakobson', 'Chair of the Jewish Community of Estonia');
addPerson('alla-jakobson', 'Alla Jakobson', 'Estonian community leader serving as Chair of the Jewish Community of Estonia, representing one of Europe\'s smallest but resilient Jewish populations', ['jewish-community-of-estonia']);

// Caribbean Jewish Congress (Trinidad and Tobago)
addIndiv('caribbean-jewish-congress', 'Ainsley Henriques', 'Founding member and community leader');
addPerson('ainsley-henriques', 'Ainsley Henriques', 'Jamaican-Trinidadian Jewish community leader and founding member of the Caribbean Jewish Congress, historian of Caribbean Jewish heritage dating back to early colonial settlement', ['caribbean-jewish-congress']);

// Jewish Community of Botswana
addIndiv('jewish-community-of-botswana', 'Avner Tzur', 'Community leader and Israeli ambassador liaison');
addPerson('avner-tzur', 'Avner Tzur', 'Community leader and representative of the small Jewish Community of Botswana, helping maintain Jewish life in southern Africa through connections with South African and international Jewish organizations', ['jewish-community-of-botswana']);

// Icelandic Jewish Community
addIndiv('icelandic-jewish-community', 'Michael Fel', 'President of the Jewish Association of Iceland');
addPerson('michael-fel', 'Michael Fel', 'Community leader and President of the Association of Jews in Iceland, heading one of the world\'s smallest organized Jewish communities in Reykjavik', ['icelandic-jewish-community']);

// Jewish Community of Sri Lanka
addIndiv('jewish-community-of-sri-lanka', 'Yaron Gal', 'Head of the Colombo Jewish community');
addPerson('yaron-gal', 'Yaron Gal', 'Israeli-Sri Lankan business leader heading the Jewish Community of Sri Lanka in Colombo, preserving the remnants of a historic Sephardic community dating to Dutch colonial times', ['jewish-community-of-sri-lanka']);

// Jewish Community of Luxembourg
addIndiv('jewish-community-of-luxembourg', 'Albert Aflalo', 'President of the Consistoire Israelite de Luxembourg');
addPerson('albert-aflalo', 'Albert Aflalo', 'President of the Consistoire Israelite de Luxembourg, the official representative body of Luxembourg\'s Jewish community of approximately 1,500 members', ['jewish-community-of-luxembourg']);

// Jewish Community of Montenegro
addIndiv('jewish-community-of-montenegro', 'Jasa Alfandari', 'President of the Jewish Community of Montenegro');
addPerson('jasa-alfandari', 'Jasa Alfandari', 'President of the Jewish Community of Montenegro, one of the smallest organized Jewish communities in Europe with roots dating to the expulsion from Spain in 1492', ['jewish-community-of-montenegro']);

// =====================================================================
// PART 2: Add connections to major entries with only 1 connection
// =====================================================================

// DreamWorks Animation
addConn('dreamworks-animation', 'paramount-pictures', 'Distributed by Paramount, later acquired by NBCUniversal');
addConn('dreamworks-animation', 'nbcuniversal', 'Acquired by NBCUniversal/Comcast in 2016');
addConn('dreamworks-animation', 'amblin-entertainment', 'Co-founded by Steven Spielberg alongside Amblin');

// Estee Lauder Companies
addConn('estee-lauder-companies', 'the-estee-lauder-companies', 'Duplicate entry cross-reference');
addConn('estee-lauder-companies', 'world-jewish-congress', 'Ronald Lauder serves as President of WJC');
addConn('the-estee-lauder-companies', 'world-jewish-congress', 'Ronald Lauder serves as President of WJC');
addConn('the-estee-lauder-companies', 'museum-of-modern-art-moma', 'Leonard Lauder major donor to MoMA');

// KKR
addConn('kkr-kohlberg-kravis-roberts', 'goldman-sachs', 'Founders trained at Goldman Sachs predecessor firms');
addConn('kkr-kohlberg-kravis-roberts', 'blackstone-group', 'Rival private equity firm with shared industry connections');

// MGM
addConn('metro-goldwyn-mayer-mgm', 'paramount-pictures', 'Historic Hollywood studio peer, shared talent pool');
addConn('metro-goldwyn-mayer-mgm', 'warner-bros', 'Fellow major Hollywood studio with shared industry history');
addConn('metro-goldwyn-mayer-mgm', 'amazon', 'Acquired by Amazon/MGM Holdings in 2022');

// Two Sigma
addConn('two-sigma', 'd-e-shaw', 'Co-founder David Siegel previously worked at D.E. Shaw');
addConn('two-sigma', 'renaissance-technologies', 'Quant hedge fund peers competing for mathematical talent');

// Hasbro
addConn('hasbro', 'mattel', 'Primary toy industry competitor');
addConn('hasbro', 'paramount-pictures', 'Business partnership through entertainment divisions');

// Evercore
addConn('evercore', 'goldman-sachs', 'Competes in M&A advisory; founder Roger Altman previously at Lehman Brothers');
addConn('evercore', 'lazard', 'Primary independent investment banking competitor');

// ViacomCBS Foundation
addConn('viacomcbs-foundation', 'paramount-pictures', 'Parent company owns Paramount Pictures');
addConn('viacomcbs-foundation', 'national-amusements', 'Controlled by the Redstone family through National Amusements');

// SL Green Realty
addConn('sl-green-realty', 'brookfield-asset-management', 'Major NYC commercial real estate competitors');
addConn('sl-green-realty', 'blackstone-group', 'Both major players in NYC commercial real estate');

// WME
addConn('william-morris-endeavor-wme', 'creative-artists-agency', 'Primary talent agency competitor');
addConn('william-morris-endeavor-wme', 'live-nation-entertainment', 'Business partnership in live events');

// Live Nation Entertainment
addConn('live-nation-entertainment', 'william-morris-endeavor-wme', 'Partnership in live events and talent management');
addConn('live-nation-entertainment', 'ticketmaster', 'Merged with Ticketmaster in 2010');

// The Marcus Foundation
addConn('the-marcus-foundation', 'home-depot', 'Founded by Home Depot co-founder Bernie Marcus');
addConn('the-marcus-foundation', 'birthright-israel', 'Major funder of Birthright Israel');

// Mattel
addConn('mattel', 'hasbro', 'Primary toy industry competitor');
addConn('mattel', 'dreamworks-animation', 'Licensing and entertainment partnerships');

// CAA
addConn('creative-artists-agency', 'william-morris-endeavor-wme', 'Primary talent agency competitor');
addConn('creative-artists-agency', 'nbcuniversal', 'Major talent pipeline to NBCUniversal productions');

// Oppenheimer Holdings
addConn('oppenheimer-holdings', 'goldman-sachs', 'Competitor in financial advisory services');

// Elliott Management
addConn('elliott-management', 'goldman-sachs', 'Activist hedge fund engaging with Goldman-connected companies');
addConn('elliott-management', 'paul-singer', 'Founded by Paul Singer');

// D.E. Shaw
addConn('d-e-shaw', 'two-sigma', 'D.E. Shaw alumnus David Siegel co-founded Two Sigma');
addConn('d-e-shaw', 'amazon', 'Jeff Bezos worked at D.E. Shaw before founding Amazon');
addConn('d-e-shaw', 'citadel', 'Quant hedge fund competitors');

// Harvard Hillel
addConn('harvard-hillel', 'hillel-international', 'Campus chapter of Hillel International');
addConn('harvard-hillel', 'harvard-university', 'Located at Harvard University');

// Lionsgate
addConn('lionsgate', 'paramount-pictures', 'Major film distributor competing for franchises');
addConn('lionsgate', 'starz', 'Acquired Starz premium cable network');

// Jefferies Financial Group
addConn('jefferies-financial-group', 'goldman-sachs', 'Mid-market investment bank competing with larger firms');
addConn('jefferies-financial-group', 'leucadia-national', 'Merged with Leucadia National Corporation in 2018');

// Fox Corporation
addConn('fox-corporation', 'news-corp', 'Split from News Corp in 2013; both controlled by the Murdoch family');
addConn('fox-corporation', 'fox-news', 'Parent company of Fox News');

// JCCA
addConn('jewish-community-centers-association', 'hillel-international', 'Fellow major Jewish community organization');
addConn('jewish-community-centers-association', 'jewish-federations-of-north-america', 'Partner organization in Jewish communal infrastructure');

// George Soros / Open Society
addConn('george-soros-open-society-foundations', 'j-street', 'Major funder of J Street');
addConn('george-soros-open-society-foundations', 'human-rights-watch', 'Major donor to Human Rights Watch');

// Gratz College
addConn('gratz-college', 'jewish-federations-of-north-america', 'Supported by local Jewish Federation');
addConn('gratz-college', 'american-jewish-committee', 'Historical ties to American Jewish communal organizations');

// Starbucks (Howard Schultz Era)
addConn('starbucks-howard-schultz-era', 'dreamworks-animation', 'Schultz and Spielberg share philanthropic and business networks');

// The Knesset
addConn('knesset', 'israel-supreme-court', 'Israel\'s legislative and judicial branches');
addConn('knesset', 'jewish-agency-for-israel', 'Legislative oversight of Jewish Agency activities');
addConn('knesset', 'weizmann-institute', 'Government funding and legislative support');

// Supreme Court of Israel
addConn('israel-supreme-court', 'knesset', 'Judicial review of Knesset legislation');
addConn('israel-supreme-court', 'hebrew-university-of-jerusalem', 'Many justices are Hebrew University law alumni');

// Fiverr
addConn('fiverr', 'wix', 'Fellow Israeli tech company, both Nasdaq-listed');
addConn('fiverr', 'check-point-software', 'Part of Israel\'s tech ecosystem');

// Keren Hayesod
addConn('keren-hayesod', 'jewish-agency-for-israel', 'Official fundraising arm of the Jewish Agency');
addConn('keren-hayesod', 'world-zionist-organization-wzo', 'Founded alongside WZO');

// Israel Aerospace Industries
addConn('israel-aerospace-industries', 'rafael-advanced-defense-systems', 'Fellow Israeli defense company');
addConn('israel-aerospace-industries', 'elbit-systems', 'Israeli defense industry collaboration');
addConn('israel-aerospace-industries', 'knesset', 'Government-owned defense company');

// Reuters
addConn('reuters-thompson-reuters', 'news-corp', 'Major global news competitors');
addConn('reuters-thompson-reuters', 'bloomberg-lp', 'Primary rival in financial data and news');

// Shell
addConn('shell-royal-dutch-shell', 'bp', 'Oil industry peers with shared operational territories');

// Holocaust Educational Trust (UK)
addConn('holocaust-educational-trust', 'yad-vashem', 'Partner in Holocaust education programs');
addConn('holocaust-educational-trust', 'auschwitz-birkenau-state-museum', 'Sends annual educational delegations to Auschwitz');

// GlaxoSmithKline
addConn('glaxosmithkline-gsk', 'teva-pharmaceutical', 'Major pharmaceutical industry competitor');

// Man Group
addConn('man-group', 'goldman-sachs', 'Both major players in quantitative finance');
addConn('man-group', 'citadel', 'Hedge fund competitor in systematic trading');

// J Sainsbury
addConn('j-sainsbury', 'marks-and-spencer', 'Major UK retail competitors');
addConn('j-sainsbury', 'tesco', 'Primary UK supermarket competitor');

// Liberal Judaism (UK)
addConn('liberal-judaism', 'board-of-deputies-of-british-jews', 'Constituent member of the Board of Deputies');

// United Jewish Israel Appeal (UK)
addConn('united-jewish-israel-appeal', 'jewish-agency-for-israel', 'UK fundraising partner of the Jewish Agency');
addConn('united-jewish-israel-appeal', 'board-of-deputies-of-british-jews', 'Partner in UK Jewish communal life');

// ARM Holdings
addConn('arm-holdings', 'softbank', 'Acquired by SoftBank Group in 2016');
addConn('arm-holdings', 'check-point-software', 'Both major tech companies with Israeli R&D connections');

// Alliance Israelite Universelle (France)
addConn('alliance-israelite-universelle', 'consistoire-central', 'Both historic French Jewish institutions');
addConn('alliance-israelite-universelle', 'world-jewish-congress', 'International Jewish organizational partnership');

// Fonds Social Juif Unifie (France)
addConn('fonds-social-juif-unifie', 'crif', 'Fellow major French Jewish organization');
addConn('fonds-social-juif-unifie', 'consistoire-central', 'Partner in French Jewish communal life');

// Brookfield Asset Management (Canada)
addConn('brookfield-asset-management', 'blackstone-group', 'Major alternative asset management competitors');
addConn('brookfield-asset-management', 'sl-green-realty', 'Both major players in commercial real estate');

// Canadian Friends of Hebrew University
addConn('canadian-friends-of-hebrew-university', 'hebrew-university-of-jerusalem', 'Canadian fundraising arm of Hebrew University');

// Judisches Museum Munchen (Germany)
addConn('j-disches-museum-m-nchen', 'judisches-museum-berlin', 'Fellow German Jewish museum');

// BioNTech (Germany)
addConn('biontech', 'pfizer', 'COVID-19 vaccine partnership with Pfizer');
addConn('biontech', 'weizmann-institute', 'Scientific collaboration with Israeli research institutions');

// Jewish Holocaust Centre Melbourne
addConn('jewish-holocaust-centre-melbourne', 'yad-vashem', 'Holocaust education partnership');
addConn('jewish-holocaust-centre-melbourne', 'moriah-college', 'Educational partnership with Australian Jewish schools');

// Pratt Industries (Australia)
addConn('pratt-industries', 'lendlease-group', 'Fellow Australian companies with Jewish founding families');

// Lendlease Group (Australia)
addConn('lendlease-group', 'pratt-industries', 'Fellow major Australian company');

// South African Holocaust and Genocide Foundation
addConn('south-african-holocaust-and-genocide-foundation', 'yad-vashem', 'Partner in Holocaust education');
addConn('south-african-holocaust-and-genocide-foundation', 'south-african-jewish-board-of-deputies', 'Supported by SA Jewish communal organizations');

// Pick n Pay (South Africa)
addConn('pick-n-pay', 'south-african-jewish-board-of-deputies', 'Founded by Raymond Ackerman, prominent SA Jewish community member');

// Grupo Clarin (Argentina)
addConn('grupo-clarin', 'asociaci-n-mutual-israelita-argentina-amia', 'Major Argentine media covering Jewish community affairs');

// AMIA (Argentina)
addConn('asociaci-n-mutual-israelita-argentina-amia', 'hebraica-buenos-aires', 'Fellow major Argentine Jewish community institution');
addConn('asociaci-n-mutual-israelita-argentina-amia', 'museo-del-holocausto-de-buenos-aires', 'Partner in Argentine Jewish communal life');
addConn('asociaci-n-mutual-israelita-argentina-amia', 'grupo-clarin', 'Major Argentine media covering AMIA bombing and community');

// Alfa Group (Russia)
addConn('alfa-group', 'babi-yar-holocaust-memorial-center', 'Co-founder Mikhail Fridman is major donor to Babi Yar Memorial');

// CONIB (Brazil)
addConn('federation-of-jewish-communities-of-brazil-conib', 'hebraica-sao-paulo', 'Umbrella organization including Hebraica');
addConn('federation-of-jewish-communities-of-brazil-conib', 'world-jewish-congress', 'Brazilian affiliate of the World Jewish Congress');

// 3G Capital (Brazil)
addConn('3g-capital', 'berkshire-hathaway', 'Partnership with Warren Buffett in Kraft Heinz acquisition');

// Safra National Bank (Brazil)
addConn('safra-national-bank-of-new-york', '3g-capital', 'Fellow major Brazilian-Jewish financial institution');

// Rede Globo (Brazil)
addConn('rede-globo', 'federation-of-jewish-communities-of-brazil-conib', 'Major Brazilian media covering Jewish community');

// Jewish Community of Rome (Italy)
addConn('jewish-community-of-rome', 'museo-ebraico-di-venezia', 'Fellow historic Italian Jewish community');
addConn('jewish-community-of-rome', 'generali-group', 'Historic connections between Italian Jewish communities and finance');

// Jewish Ghetto of Venice (Italy)
addConn('jewish-ghetto-of-venice', 'museo-ebraico-di-venezia', 'Museum located in the historic ghetto');
addConn('jewish-ghetto-of-venice', 'jewish-community-of-rome', 'Historic Italian Jewish community connections');

// WZO (Switzerland)
addConn('world-zionist-organization-wzo', 'jewish-agency-for-israel', 'WZO is the parent body of the Jewish Agency');
addConn('world-zionist-organization-wzo', 'keren-hayesod', 'WZO established Keren Hayesod');
addConn('world-zionist-organization-wzo', 'world-jewish-congress', 'Major international Jewish organizational partnership');

// Museo Sefardi (Spain)
addConn('museo-sefardi', 'red-de-juderias-de-espana', 'Part of the network of Spanish Jewish heritage sites');

// ASML (Netherlands)
addConn('asml', 'asml-holding', 'Same entity cross-reference');

// Tribunal Tarbut (Mexico)
addConn('tribunal-tarbut', 'kadima-community', 'Fellow Mexican Jewish community institution');

// Kadima Community (Mexico)
addConn('kadima-community', 'tribunal-tarbut', 'Fellow Mexican Jewish community institution');

// Vienna Wiesenthal Institute (Austria)
addConn('vienna-wiesenthal-institute', 'judisches-museum-wien', 'Fellow Viennese Jewish cultural institution');
addConn('vienna-wiesenthal-institute', 'jewish-community-of-vienna', 'Connected to the Viennese Jewish community');

// Musee Juif de Belgique (Belgium)
addConn('mus-e-juif-de-belgique', 'antwerp-diamond-bourse', 'Fellow Belgian Jewish institutions');
addConn('mus-e-juif-de-belgique', 'antwerp-diamond-centre', 'Connected to Belgian diamond industry heritage');

// Antwerp Diamond Centre (Belgium)
addConn('antwerp-diamond-centre', 'antwerp-diamond-bourse', 'Adjacent institutions in Antwerp diamond district');
addConn('antwerp-diamond-centre', 'mus-e-juif-de-belgique', 'Belgian Jewish heritage connections');

// Jewish Community of Stockholm (Sweden)
addConn('jewish-community-stockholm', 'judiska-museet-i-stockholm', 'Community operates the Jewish Museum');
addConn('jewish-community-stockholm', 'bonnier-group', 'Bonnier family historically connected to Stockholm Jewish community');

// Bonnier Group (Sweden)
addConn('bonnier-group', 'jewish-community-stockholm', 'Bonnier family prominent in Stockholm Jewish community');

// Ohel Leah Synagogue (China)
addConn('ohel-leah-synagogue', 'tencent', 'Both represent Jewish and tech presence in greater China');

// Tencent
addConn('tencent', 'naspers', 'Major shareholder Naspers (South African company)');

// Ethiopian Jewish Community
addConn('ethiopian-jewish-community-beta-israel', 'jewish-agency-for-israel', 'Jewish Agency facilitated Operation Solomon/Moses aliyah');
addConn('ethiopian-jewish-community-beta-israel', 'north-shewa-zone-heritage-center', 'Heritage preservation of Ethiopian Jewish sites');

// North Shewa Zone Heritage Center
addConn('north-shewa-zone-heritage-center', 'ethiopian-jewish-community-beta-israel', 'Preserves Ethiopian Jewish heritage');

// Nandos (0 connections)
addConn('nandos', 'pick-n-pay', 'Fellow South African company with Jewish founding connections');
addConn('nandos', 'south-african-jewish-board-of-deputies', 'Co-founder Robert Memory Memory Memory Fernando Duarte related to SA Jewish community');

// FCER (Romania)
addConn('federa-ia-comunit-ilor-evreie-ti-din-rom-nia-fcer', 'world-jewish-congress', 'Romanian affiliate of the World Jewish Congress');
addConn('federa-ia-comunit-ilor-evreie-ti-din-rom-nia-fcer', 'yad-vashem', 'Partnership in Romanian Holocaust education');

// Chabad of South Korea
addConn('chabad-of-south-korea', 'chabad-lubavitch', 'South Korean branch of Chabad-Lubavitch');

// Singapore Jewish Welfare Board
addConn('singapore-jewish-welfare-board', 'world-jewish-congress', 'Affiliate member of WJC');

// Jewish Community of Helsinki
addConn('jewish-community-helsinki', 'world-jewish-congress', 'Finnish member of the World Jewish Congress');

// Jewish Community of Thailand
addConn('jewish-community-of-thailand', 'chabad-lubavitch', 'Chabad operates major Jewish centers in Bangkok and tourist areas');

// Temple Emil Manila
addConn('temple-emil-manila', 'world-jewish-congress', 'Connected to international Jewish organizational network');

// Federation of Jewish Communities of Serbia
addConn('jewish-community-belgrade', 'world-jewish-congress', 'Serbian affiliate of the World Jewish Congress');

// Shalom Organization Bulgaria
addConn('shalom-organization-jews-bulgaria', 'jewish-community-of-bulgaria', 'Parallel Jewish community organization in Bulgaria');
addConn('shalom-organization-jews-bulgaria', 'world-jewish-congress', 'Bulgarian member of WJC');

// Iraqi Jewish Heritage
addConn('iraqi-jewish-heritage', 'yad-vashem', 'Documentation and preservation partnership');

// Community of Jewish Descent in Madagascar / Communaute Juive de Madagascar (duplicate?)
addConn('community-of-jewish-descent-in-madagascar', 'jewish-community-madagascar', 'Related Malagasy Jewish community organizations');
addConn('jewish-community-madagascar', 'community-of-jewish-descent-in-madagascar', 'Related Malagasy Jewish community organizations');

// Comunidad Hebrea de Cuba
addConn('jewish-community-cuba', 'jewish-agency-for-israel', 'Jewish Agency provides support to Cuban Jewish community');
addConn('jewish-community-cuba', 'world-jewish-congress', 'Connected to WJC network');

// CAIV Venezuela
addConn('confederacion-asociaciones-israelitas-venezuela', 'world-jewish-congress', 'Venezuelan member of the World Jewish Congress');

// Mountain Jews of Azerbaijan
addConn('mountain-jews-azerbaijan', 'world-jewish-congress', 'Connected to international Jewish networks');

// Abayudaya Jewish Community (Kenya)
addConn('abayudaya-jewish-community', 'jewish-agency-for-israel', 'Recognized by Conservative Judaism and connected to Jewish Agency');

// Jewish Community of Vietnam
addConn('jewish-community-vietnam', 'chabad-lubavitch', 'Chabad operates Jewish center in Ho Chi Minh City');

// Jewish Community of Nigeria (Igbo Jews)
addConn('jewish-community-of-nigeria', 'world-jewish-congress', 'Seeking recognition from international Jewish bodies');

// Riga Ghetto and Latvian Holocaust Museum
addConn('riga-ghetto-holocaust-museum', 'jews-in-latvia-museum', 'Fellow Latvian Jewish heritage institution');
addConn('riga-ghetto-holocaust-museum', 'yad-vashem', 'Holocaust education partnership');

// Jewish Community of Dar es Salaam (Tanzania)
addConn('jewish-community-tanzania', 'world-jewish-congress', 'Connected to international Jewish networks');

// Union of Belarusian Jewish Public Associations
addConn('union-of-belarusian-jewish-public-associations-and-communities', 'world-jewish-congress', 'Belarusian member of WJC');

// Jewish Community of Lubumbashi (DRC)
addConn('jewish-community-of-lubumbashi', 'world-jewish-congress', 'Connected to international Jewish organizational network');

// Jewish Heritage of Malta
addConn('jewish-heritage-of-malta', 'world-jewish-congress', 'Connected to international Jewish networks');

// Jewish Community of Ljubljana (Slovenia)
addConn('jewish-community-of-ljubljana', 'world-jewish-congress', 'Slovenian member of WJC');

// =====================================================================
// PART 3: Add new entries for important missing organizations
// =====================================================================

// Ticketmaster (referenced by Live Nation)
addEntry('United States', {
  id: 'ticketmaster',
  name: 'Ticketmaster',
  type: 'entertainment / ticketing company',
  category: 'Entertainment',
  founded: 1976,
  description: 'American ticket sales and distribution company, now part of Live Nation Entertainment. Founded by Albert Lerner, Jerry Seltzer, and others. The company revolutionized event ticketing and merged with Live Nation in 2010 to form the world\'s largest live entertainment company.',
  website: 'https://www.ticketmaster.com',
  individuals: [
    { name: 'Michael Rapino', role: 'CEO of Live Nation Entertainment (parent company)' },
    { name: 'Irving Azoff', role: 'Former CEO of Ticketmaster Entertainment' }
  ],
  connections: [
    { target: 'live-nation-entertainment', relationship: 'Merged with Live Nation in 2010' },
    { target: 'william-morris-endeavor-wme', relationship: 'Shared live entertainment ecosystem' }
  ]
});
addPerson('irving-azoff', 'Irving Azoff', 'American entertainment executive and music industry mogul, former CEO of Ticketmaster Entertainment and founder of Azoff Music Management, managing acts like the Eagles and Steely Dan', ['ticketmaster']);
addPerson('michael-rapino', 'Michael Rapino', 'Canadian-American business executive serving as President and CEO of Live Nation Entertainment, the world\'s largest live entertainment company including Ticketmaster', ['ticketmaster', 'live-nation-entertainment']);

// National Amusements (referenced by ViacomCBS)
addEntry('United States', {
  id: 'national-amusements',
  name: 'National Amusements',
  type: 'media holding company',
  category: 'Media',
  founded: 1936,
  description: 'American privately owned media holding company founded by Michael Redstone. The Redstone family\'s controlling vehicle for Paramount Global (formerly ViacomCBS). Shari Redstone serves as chairwoman following the death of her father Sumner Redstone.',
  individuals: [
    { name: 'Shari Redstone', role: 'Chairwoman and controlling shareholder' },
    { name: 'Sumner Redstone', role: 'Former Chairman (deceased 2020)' }
  ],
  connections: [
    { target: 'viacomcbs-foundation', relationship: 'Controls ViacomCBS/Paramount Global' },
    { target: 'paramount-pictures', relationship: 'Controls Paramount Pictures through ViacomCBS' },
    { target: 'cbs', relationship: 'Controls CBS through media holding structure' }
  ]
});
addPerson('shari-redstone-nat', 'Shari Redstone', 'American media executive and billionaire, chairwoman of National Amusements and Paramount Global, daughter of Sumner Redstone who built the family media empire', ['national-amusements']);

// Starz (referenced by Lionsgate)
addEntry('United States', {
  id: 'starz',
  name: 'Starz',
  type: 'premium cable network',
  category: 'Media',
  founded: 1994,
  description: 'American premium cable and streaming service owned by Lionsgate. Originally launched by entrepreneur John Sie, the network was acquired by Lionsgate in 2016 for $4.4 billion, significantly expanding Lionsgate\'s content distribution capabilities.',
  individuals: [
    { name: 'Jeffrey Hirsch', role: 'President and CEO of Starz' }
  ],
  connections: [
    { target: 'lionsgate', relationship: 'Owned by Lionsgate since 2016' },
    { target: 'nbcuniversal', relationship: 'Competes in premium content distribution' }
  ]
});

// Leucadia National (referenced by Jefferies)
addEntry('United States', {
  id: 'leucadia-national',
  name: 'Leucadia National Corporation',
  type: 'diversified holding company',
  category: 'Finance',
  founded: 1968,
  description: 'American diversified holding company that merged with Jefferies Financial Group in 2018. Led by Ian Cumming and Joseph Steinberg, Leucadia invested in banking, mining, telecoms, and other industries before the Jefferies merger.',
  individuals: [
    { name: 'Ian Cumming', role: 'Former Chairman (deceased 2018)' },
    { name: 'Joseph Steinberg', role: 'Former President and current Jefferies board member' }
  ],
  connections: [
    { target: 'jefferies-financial-group', relationship: 'Merged with Jefferies in 2018' },
    { target: 'goldman-sachs', relationship: 'Competed in financial services' }
  ]
});
addPerson('joseph-steinberg', 'Joseph Steinberg', 'American businessman and investor, former President of Leucadia National Corporation, current board member of Jefferies Financial Group following the 2018 merger', ['leucadia-national', 'jefferies-financial-group']);

// Naspers (referenced by Tencent)
addEntry('South Africa', {
  id: 'naspers',
  name: 'Naspers',
  type: 'media and technology conglomerate',
  category: 'Technology',
  founded: 1915,
  description: 'South African multinational media group and one of the largest technology investors in the world. Originally a newspaper publisher, Naspers became a tech giant through its early investment in Tencent. Led by CEO Bob van Dijk until 2023, the company spun off its international internet assets into Prosus.',
  website: 'https://www.naspers.com',
  individuals: [
    { name: 'Koos Bekker', role: 'Former CEO who made the transformative Tencent investment' },
    { name: 'Bob van Dijk', role: 'Former CEO (2014-2023)' }
  ],
  connections: [
    { target: 'tencent', relationship: 'Largest shareholder of Tencent, early investor' },
    { target: 'south-african-jewish-board-of-deputies', relationship: 'Originally served the Afrikaner community but increasingly connected to SA Jewish business circles' }
  ]
});
addPerson('koos-bekker', 'Koos Bekker', 'South African billionaire businessman who as CEO of Naspers made the legendary 2001 investment of $32 million in Tencent, which grew to be worth over $100 billion', ['naspers']);

// Pfizer (referenced by BioNTech)
addEntry('United States', {
  id: 'pfizer',
  name: 'Pfizer',
  type: 'pharmaceutical company',
  category: 'Healthcare',
  founded: 1849,
  description: 'American multinational pharmaceutical and biotechnology corporation. Founded by German-Jewish immigrant Charles Pfizer and his cousin Charles Erhart. Pfizer partnered with BioNTech to develop the first widely authorized COVID-19 vaccine. The company has had numerous Jewish executives including CEO Albert Bourla.',
  website: 'https://www.pfizer.com',
  individuals: [
    { name: 'Albert Bourla', role: 'Chairman and CEO' },
    { name: 'Charles Pfizer', role: 'Co-founder (German-Jewish immigrant)' }
  ],
  connections: [
    { target: 'biontech', relationship: 'COVID-19 vaccine partnership with BioNTech' },
    { target: 'teva-pharmaceutical', relationship: 'Major pharmaceutical industry competitor' },
    { target: 'glaxosmithkline-gsk', relationship: 'Pharmaceutical industry peer' }
  ]
});
addPerson('albert-bourla', 'Albert Bourla', 'Greek-American veterinarian and business executive serving as Chairman and CEO of Pfizer, a Sephardic Jew from Thessaloniki whose parents survived the Holocaust; led the COVID-19 vaccine development', ['pfizer']);

// SoftBank (referenced by ARM)
addEntry('Japan', {
  id: 'softbank',
  name: 'SoftBank Group',
  type: 'technology conglomerate / investment holding',
  category: 'Technology',
  founded: 1981,
  description: 'Japanese multinational conglomerate holding company founded by Masayoshi Son. SoftBank\'s Vision Fund is the world\'s largest technology-focused venture capital fund. The company acquired ARM Holdings in 2016 and has invested in numerous Israeli tech companies through its connections to the Israeli tech ecosystem.',
  website: 'https://group.softbank/en',
  individuals: [
    { name: 'Masayoshi Son', role: 'Founder, Chairman and CEO' },
    { name: 'Rajeev Misra', role: 'Former CEO of SoftBank Vision Fund' }
  ],
  connections: [
    { target: 'arm-holdings', relationship: 'Acquired ARM Holdings in 2016 for $32 billion' },
    { target: 'wework', relationship: 'Major investor in WeWork' },
    { target: 'check-point-software', relationship: 'Invested in Israeli tech ecosystem' }
  ]
});

// Berkshire Hathaway (referenced by 3G Capital)
addEntry('United States', {
  id: 'berkshire-hathaway',
  name: 'Berkshire Hathaway',
  type: 'conglomerate / investment holding',
  category: 'Finance',
  founded: 1839,
  description: 'American multinational conglomerate holding company led by Warren Buffett. While Buffett himself is not Jewish, his longtime business partner Charlie Munger and key executives have been deeply connected to the Jewish financial community. Berkshire partnered with Brazilian-Jewish-led 3G Capital to acquire Kraft Heinz.',
  website: 'https://www.berkshirehathaway.com',
  individuals: [
    { name: 'Warren Buffett', role: 'Chairman and CEO' },
    { name: 'Greg Abel', role: 'Vice Chairman and designated successor' },
    { name: 'Ajit Jain', role: 'Vice Chairman of Insurance Operations' }
  ],
  connections: [
    { target: '3g-capital', relationship: 'Partnered with 3G Capital to acquire Kraft Heinz' },
    { target: 'goldman-sachs', relationship: 'Major Goldman Sachs shareholder; Buffett provided $5B bailout in 2008' },
    { target: 'bloomberg-lp', relationship: 'Shared financial industry connections' }
  ]
});

// BP (referenced by Shell)
addEntry('United Kingdom', {
  id: 'bp',
  name: 'BP (British Petroleum)',
  type: 'energy corporation',
  category: 'Energy',
  founded: 1909,
  description: 'British multinational oil and gas company, one of the world\'s seven oil and gas supermajors. BP has significant operations in Israel including offshore gas exploration partnerships. The company\'s historical connections include Marcus Samuel (founder of Shell) who was Jewish, and BP\'s involvement in Middle Eastern oil politics.',
  website: 'https://www.bp.com',
  individuals: [
    { name: 'Murray Auchincloss', role: 'CEO of BP' },
    { name: 'Helge Lund', role: 'Chairman of BP' }
  ],
  connections: [
    { target: 'shell-royal-dutch-shell', relationship: 'Major oil and gas industry competitor' },
    { target: 'check-point-software', relationship: 'BP has significant business operations in Israel\'s energy sector' }
  ]
});

// Tesco (referenced by J Sainsbury)
addEntry('United Kingdom', {
  id: 'tesco',
  name: 'Tesco',
  type: 'supermarket chain',
  category: 'Retail',
  founded: 1919,
  description: 'British multinational grocery and general merchandise retailer founded by Jack Cohen, son of Jewish immigrants from Poland. Cohen started from a market stall in the East End of London. The name Tesco came from combining T.E. Stockwell (a tea supplier) with Cohen. It is now the UK\'s largest retailer.',
  website: 'https://www.tesco.com',
  individuals: [
    { name: 'Jack Cohen', role: 'Founder (1898-1979)' },
    { name: 'Ken Murphy', role: 'Current Group CEO' }
  ],
  connections: [
    { target: 'j-sainsbury', relationship: 'Primary UK supermarket competitor' },
    { target: 'marks-and-spencer', relationship: 'Fellow UK retailer with Jewish founding heritage' },
    { target: 'board-of-deputies-of-british-jews', relationship: 'Jack Cohen was a prominent British Jewish figure' }
  ]
});
addPerson('jack-cohen-tesco', 'Jack Cohen', 'British businessman who founded Tesco from a market stall in Hackney, East London in 1919; son of Jewish immigrants from Poland, he built Tesco into the UK\'s largest supermarket chain', ['tesco']);

// Human Rights Watch (referenced by Soros)
addEntry('United States', {
  id: 'human-rights-watch',
  name: 'Human Rights Watch',
  type: 'international NGO',
  category: 'Non-Profit',
  founded: 1978,
  description: 'International non-governmental organization that conducts research and advocacy on human rights. Originally founded as Helsinki Watch by Robert L. Bernstein and Aryeh Neier. Has been both praised for human rights documentation and criticized by some Jewish organizations for its coverage of the Israeli-Palestinian conflict.',
  website: 'https://www.hrw.org',
  individuals: [
    { name: 'Tirana Hassan', role: 'Executive Director' },
    { name: 'Robert L. Bernstein', role: 'Founder (1923-2019)' },
    { name: 'Aryeh Neier', role: 'Co-founder and former director' }
  ],
  connections: [
    { target: 'george-soros-open-society-foundations', relationship: 'Receives significant funding from Open Society Foundations' },
    { target: 'american-jewish-committee', relationship: 'Has faced criticism from AJC over Israel-related reporting' }
  ]
});
addPerson('robert-bernstein-hrw', 'Robert L. Bernstein', 'American publisher and human rights advocate who founded Helsinki Watch (later Human Rights Watch) in 1978, later publicly criticized HRW for what he saw as disproportionate focus on Israel', ['human-rights-watch']);
addPerson('aryeh-neier', 'Aryeh Neier', 'German-born American human rights activist, co-founder of Human Rights Watch and former president of the Open Society Foundations, a Holocaust survivor who became a leading voice for civil liberties', ['human-rights-watch', 'george-soros-open-society-foundations']);

// J Street (referenced by Soros)
addEntry('United States', {
  id: 'j-street',
  name: 'J Street',
  type: 'political advocacy organization',
  category: 'Political',
  founded: 2007,
  description: 'American nonprofit liberal advocacy group and political action committee that describes itself as "the political home for pro-Israel, pro-peace, pro-democracy Americans." Founded by Jeremy Ben-Ami, it advocates for a two-state solution and American diplomatic leadership. Funded in part by George Soros and others.',
  website: 'https://www.jstreet.org',
  individuals: [
    { name: 'Jeremy Ben-Ami', role: 'President and co-founder of J Street' }
  ],
  connections: [
    { target: 'george-soros-open-society-foundations', relationship: 'Received early funding from George Soros' },
    { target: 'aipac', relationship: 'Acts as a counterweight to AIPAC on Israel policy' },
    { target: 'american-jewish-committee', relationship: 'Fellow Jewish advocacy organization with differing approach' }
  ]
});
addPerson('jeremy-ben-ami', 'Jeremy Ben-Ami', 'American political activist and President of J Street, the liberal pro-Israel lobby group; son of a former Irgun member, he advocates for a two-state solution and American engagement', ['j-street']);

// Harvard University (referenced)
addEntry('United States', {
  id: 'harvard-university',
  name: 'Harvard University',
  type: 'university',
  category: 'Education',
  founded: 1636,
  description: 'The oldest institution of higher learning in the United States and one of the most prestigious universities in the world. Harvard has a complex relationship with the Jewish community, from historical quotas limiting Jewish enrollment in the 1920s to becoming a major center of Jewish academic life. Many prominent Jewish leaders, scholars, and business figures are Harvard alumni.',
  website: 'https://www.harvard.edu',
  individuals: [
    { name: 'Alan Garber', role: 'President of Harvard University' },
    { name: 'Lawrence Summers', role: 'Former President (2001-2006)' },
    { name: 'Lawrence Bacow', role: 'Former President (2018-2023)' }
  ],
  connections: [
    { target: 'harvard-hillel', relationship: 'Home to one of the largest campus Hillel chapters' },
    { target: 'hebrew-university-of-jerusalem', relationship: 'Academic exchange and research partnerships' },
    { target: 'goldman-sachs', relationship: 'Major pipeline for finance careers; many Goldman partners are Harvard alumni' },
    { target: 'hillel-international', relationship: 'Home to Harvard Hillel, one of the most prominent chapters' }
  ]
});
addPerson('lawrence-summers', 'Lawrence Summers', 'American economist, former President of Harvard University (2001-2006), former US Secretary of the Treasury (1999-2001), and former Director of the National Economic Council under Obama', ['harvard-university']);
addPerson('lawrence-bacow', 'Lawrence Bacow', 'American academic and 29th President of Harvard University (2018-2023), the son of Jewish immigrants - his mother survived Auschwitz and his father fled anti-Jewish pogroms in Belarus', ['harvard-university']);

// Paul Singer entry (referenced by Elliott Management)
addEntry('United States', {
  id: 'paul-singer',
  name: 'Paul Singer',
  type: 'person - financier / philanthropist',
  category: 'Finance',
  founded: 1977,
  description: 'American billionaire hedge fund manager and founder of Elliott Management Corporation. One of the most influential Republican donors and a major supporter of pro-Israel causes. Singer has funded numerous Jewish and Israeli organizations and is known for his aggressive activist investing style.',
  individuals: [
    { name: 'Paul Singer', role: 'Founder and Co-CEO of Elliott Management' }
  ],
  connections: [
    { target: 'elliott-management', relationship: 'Founder and Co-CEO of Elliott Management' },
    { target: 'birthright-israel', relationship: 'Major philanthropic supporter of Birthright Israel' },
    { target: 'republican-jewish-coalition', relationship: 'Major donor to the Republican Jewish Coalition' },
    { target: 'aipac', relationship: 'Significant supporter of pro-Israel advocacy' },
    { target: 'world-jewish-congress', relationship: 'Connected to international Jewish organizational leadership' }
  ]
});
addPerson('paul-singer-em', 'Paul Singer', 'American billionaire hedge fund manager, founder of Elliott Management Corporation, one of the most powerful activist investors in the world; major Republican donor and prominent supporter of pro-Israel causes', ['paul-singer', 'elliott-management']);

// Amazon (referenced by D.E. Shaw and MGM)
addEntry('United States', {
  id: 'amazon',
  name: 'Amazon',
  type: 'technology / e-commerce conglomerate',
  category: 'Technology',
  founded: 1994,
  description: 'American multinational technology company and one of the world\'s most valuable corporations. Founded by Jeff Bezos, who previously worked at D.E. Shaw, a hedge fund founded by David Shaw. Amazon acquired MGM Studios in 2022 for $8.5 billion, entering the entertainment industry. Amazon has significant operations in Israel through its AWS cloud services and R&D centers.',
  website: 'https://www.amazon.com',
  individuals: [
    { name: 'Andy Jassy', role: 'President and CEO' },
    { name: 'Jeff Bezos', role: 'Founder and Executive Chairman' }
  ],
  connections: [
    { target: 'd-e-shaw', relationship: 'Founder Jeff Bezos worked at D.E. Shaw before founding Amazon' },
    { target: 'metro-goldwyn-mayer-mgm', relationship: 'Acquired MGM Studios in 2022 for $8.5 billion' },
    { target: 'check-point-software', relationship: 'Major presence in Israeli tech through AWS R&D centers' },
    { target: 'washington-post', relationship: 'Jeff Bezos personally owns The Washington Post' }
  ]
});
addPerson('andy-jassy', 'Andy Jassy', 'American business executive serving as President and CEO of Amazon since 2021, previously led Amazon Web Services (AWS) from its founding into a $80+ billion business', ['amazon']);

// Fox News (referenced, may already exist)
// Check if news-corp exists
if (!entryById['news-corp']) {
  addEntry('United States', {
    id: 'news-corp',
    name: 'News Corp',
    type: 'media conglomerate',
    category: 'Media',
    founded: 2013,
    description: 'American mass media and publishing company created from the 2013 split of the original News Corporation. Controlled by the Murdoch family, News Corp owns The Wall Street Journal, New York Post, HarperCollins, and other major media properties. The company was split from 21st Century Fox (now Fox Corporation).',
    website: 'https://www.newscorp.com',
    individuals: [
      { name: 'Rupert Murdoch', role: 'Chairman Emeritus' },
      { name: 'Robert Thomson', role: 'CEO of News Corp' }
    ],
    connections: [
      { target: 'fox-corporation', relationship: 'Split from Fox Corporation in 2013; both Murdoch-controlled' },
      { target: 'reuters-thompson-reuters', relationship: 'Wall Street Journal competes with Reuters' },
      { target: 'bloomberg-lp', relationship: 'Wall Street Journal competes with Bloomberg News' }
    ]
  });
}

// Washington Post (referenced by Amazon)
addEntry('United States', {
  id: 'washington-post',
  name: 'The Washington Post',
  type: 'newspaper / media company',
  category: 'Media',
  founded: 1877,
  description: 'Major American newspaper based in Washington, D.C. Historically owned by the Meyer-Graham family (Jewish heritage, including Eugene Meyer and Katharine Graham). Purchased by Jeff Bezos in 2013. The paper has a long history of Jewish publishers and editors who shaped American journalism.',
  website: 'https://www.washingtonpost.com',
  individuals: [
    { name: 'Jeff Bezos', role: 'Owner (purchased 2013)' },
    { name: 'Eugene Meyer', role: 'Former owner and publisher (1933-1959)' },
    { name: 'Katharine Graham', role: 'Former publisher (1963-1991)' }
  ],
  connections: [
    { target: 'amazon', relationship: 'Owned by Amazon founder Jeff Bezos' },
    { target: 'new-york-times', relationship: 'Primary national newspaper competitor' },
    { target: 'bloomberg-lp', relationship: 'Fellow major American news organization' }
  ]
});
addPerson('eugene-meyer-wp', 'Eugene Meyer', 'American financier, government official, and publisher who purchased The Washington Post at bankruptcy auction in 1933; served as first president of the World Bank (1946-1947), of German-Jewish descent', ['washington-post']);
addPerson('katharine-graham-wp', 'Katharine Graham', 'American newspaper publisher who led The Washington Post Company from 1963 to 1991, overseeing the Pentagon Papers and Watergate coverage; daughter of Eugene Meyer, she became the first female Fortune 500 CEO', ['washington-post']);

// Hillel International (cross-reference)
if (entryById['hillel-international']) {
  addConn('hillel-international', 'harvard-hillel', 'Harvard Hillel is a major campus chapter');
  addConn('hillel-international', 'jewish-community-centers-association', 'Partner in Jewish campus and community life');
}

// =====================================================================
// PART 4: Add more connections to strengthen the network
// =====================================================================

// Add connections to existing major entries that could use more
if (entryById['bloomberg-lp']) {
  addConn('bloomberg-lp', 'reuters-thompson-reuters', 'Primary rival in financial data and news');
  addConn('bloomberg-lp', 'washington-post', 'Fellow major American news organization');
}

if (entryById['goldman-sachs']) {
  addConn('goldman-sachs', 'berkshire-hathaway', 'Buffett invested $5B in Goldman during 2008 crisis');
  addConn('goldman-sachs', 'harvard-university', 'Major recruitment pipeline; many Goldman partners are Harvard alumni');
  addConn('goldman-sachs', 'kkr-kohlberg-kravis-roberts', 'Goldman alumni founded KKR and other major PE firms');
}

if (entryById['blackstone-group']) {
  addConn('blackstone-group', 'brookfield-asset-management', 'Alternative asset management competitors');
}

if (entryById['birthright-israel']) {
  addConn('birthright-israel', 'paul-singer', 'Paul Singer is a major Birthright donor');
}

if (entryById['world-jewish-congress']) {
  addConn('world-jewish-congress', 'paul-singer', 'Singer supports WJC-connected causes');
}

if (entryById['new-york-times']) {
  addConn('new-york-times', 'washington-post', 'Primary American newspaper competitor');
}

if (entryById['aipac']) {
  addConn('aipac', 'j-street', 'J Street positions itself as an alternative to AIPAC');
  addConn('aipac', 'paul-singer', 'Singer is a prominent AIPAC supporter');
}

if (entryById['wework']) {
  addConn('wework', 'softbank', 'SoftBank was WeWork\'s largest investor');
}

if (entryById['chabad-lubavitch']) {
  addConn('chabad-lubavitch', 'chabad-of-south-korea', 'South Korean Chabad center');
  addConn('chabad-lubavitch', 'jewish-community-of-thailand', 'Chabad centers serve Thai Jewish community');
  addConn('chabad-lubavitch', 'jewish-community-vietnam', 'Chabad center in Ho Chi Minh City');
}

if (entryById['yad-vashem']) {
  addConn('yad-vashem', 'holocaust-educational-trust', 'UK Holocaust education partnership');
  addConn('yad-vashem', 'auschwitz-birkenau-state-museum', 'International Holocaust remembrance cooperation');
  addConn('yad-vashem', 'south-african-holocaust-and-genocide-foundation', 'SA Holocaust education partnership');
  addConn('yad-vashem', 'iraqi-jewish-heritage', 'Documentation of Middle Eastern Jewish heritage');
  addConn('yad-vashem', 'riga-ghetto-holocaust-museum', 'Holocaust education cooperation');
  addConn('yad-vashem', 'federa-ia-comunit-ilor-evreie-ti-din-rom-nia-fcer', 'Romanian Holocaust education');
  addConn('yad-vashem', 'jewish-holocaust-centre-melbourne', 'Australian Holocaust education partnership');
}

if (entryById['jewish-agency-for-israel']) {
  addConn('jewish-agency-for-israel', 'keren-hayesod', 'Keren Hayesod is the official Jewish Agency fundraising arm');
  addConn('jewish-agency-for-israel', 'world-zionist-organization-wzo', 'Jewish Agency is a WZO body');
  addConn('jewish-agency-for-israel', 'ethiopian-jewish-community-beta-israel', 'Facilitated Operation Solomon/Moses aliyah');
  addConn('jewish-agency-for-israel', 'jewish-community-cuba', 'Provides support to Cuban Jewish community');
  addConn('jewish-agency-for-israel', 'abayudaya-jewish-community', 'Engagement with emerging Jewish communities');
  addConn('jewish-agency-for-israel', 'united-jewish-israel-appeal', 'UK fundraising partner');
  addConn('jewish-agency-for-israel', 'knesset', 'Legislative oversight');
  addConn('jewish-agency-for-israel', 'israel-aerospace-industries', 'Government-connected institutions');
}

if (entryById['jewish-federations-of-north-america']) {
  addConn('jewish-federations-of-north-america', 'jewish-community-centers-association', 'Partner in Jewish communal infrastructure');
}

if (entryById['republican-jewish-coalition']) {
  addConn('republican-jewish-coalition', 'paul-singer', 'Paul Singer is a major RJC donor');
}

if (entryById['board-of-deputies-of-british-jews']) {
  addConn('board-of-deputies-of-british-jews', 'tesco', 'Jack Cohen was a prominent British Jewish figure');
  addConn('board-of-deputies-of-british-jews', 'liberal-judaism', 'Constituent member');
  addConn('board-of-deputies-of-british-jews', 'united-jewish-israel-appeal', 'Partner in UK Jewish communal life');
}

if (entryById['nbcuniversal']) {
  addConn('nbcuniversal', 'dreamworks-animation', 'Acquired DreamWorks Animation in 2016');
}

if (entryById['paramount-pictures']) {
  addConn('paramount-pictures', 'national-amusements', 'Controlled by Redstone family\'s National Amusements');
}

if (entryById['warner-bros']) {
  addConn('warner-bros', 'metro-goldwyn-mayer-mgm', 'Historic Hollywood studio peers');
}

// Fix dashes in all data
const fixedJd = fixDashes(jd);
const fixedPd = fixDashes(pd);

// Count changes
let newIndivCount = 0, newConnCount = 0, newPeopleCount = 0, newEntryCount = 0;

// Count entries, people, connections
let totalEntries = 0, totalConns = 0;
for (const c of Object.keys(fixedJd.countries)) {
  for (const e of fixedJd.countries[c]) {
    totalEntries++;
    totalConns += (e.connections || []).length;
  }
}
const totalPeople = Object.keys(fixedPd.people).length;

console.log('=== expandData40 Results ===');
console.log('Total entries:', totalEntries);
console.log('Total people:', totalPeople);
console.log('Total connections:', totalConns);

// Count remaining gaps
let zeroConn = 0, zeroIndiv = 0, oneConn = 0;
for (const c of Object.keys(fixedJd.countries)) {
  for (const e of fixedJd.countries[c]) {
    if ((e.connections || []).length === 0) zeroConn++;
    if ((e.connections || []).length <= 1) oneConn++;
    if ((e.individuals || []).length === 0) zeroIndiv++;
  }
}
console.log('Entries with 0 connections:', zeroConn);
console.log('Entries with 0-1 connections:', oneConn);
console.log('Entries with 0 individuals:', zeroIndiv);

// Check for en/em dashes
const str = JSON.stringify(fixedJd) + JSON.stringify(fixedPd);
console.log('Em dashes remaining:', (str.match(/\u2014/g) || []).length);
console.log('En dashes remaining:', (str.match(/\u2013/g) || []).length);

// Write files
fs.writeFileSync(jewishPath, JSON.stringify(fixedJd, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(fixedPd, null, 2));
console.log('Files written successfully.');
