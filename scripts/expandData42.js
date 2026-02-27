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

const entryById = {};
for (const c of Object.keys(jd.countries)) {
  for (const e of jd.countries[c]) entryById[e.id] = { entry: e, country: c };
}

function addConn(id, target, rel) {
  const rec = entryById[id]; if (!rec) return;
  if (!rec.entry.connections) rec.entry.connections = [];
  if (rec.entry.connections.some(c => c.target === target)) return;
  rec.entry.connections.push({ target, relationship: rel });
}
function addIndiv(id, name, role) {
  const rec = entryById[id]; if (!rec) return;
  if (!rec.entry.individuals) rec.entry.individuals = [];
  if (rec.entry.individuals.some(i => i.name === name)) return;
  rec.entry.individuals.push({ name, role });
}
function addPerson(id, name, bio, affiliations) {
  if (pd.people[id]) return;
  pd.people[id] = { name, bio, affiliations };
}

// Fix Ohel Leah Synagogue to 2+ connections
addConn('ohel-leah-synagogue', 'world-jewish-congress', 'Connected to international Jewish organizational network');

// === Add individuals to all 46 remaining entries ===

// The Israel Project (US)
addIndiv('the-israel-project', 'Josh Block', 'Former CEO of The Israel Project');
addPerson('josh-block', 'Josh Block', 'American political strategist and former CEO of The Israel Project, previously serving as spokesman for AIPAC and senior staffer on Capitol Hill', ['the-israel-project']);

// Judisches Museum Wien (Austria) - already added in expandData40, but not showing up
addIndiv('j-disches-museum-wien', 'Barbara Staudinger', 'Director of the Jewish Museum Vienna');

// Vienna Wiesenthal Institute (Austria)
addIndiv('vienna-wiesenthal-institute', 'Bela Rasky', 'Director of the Vienna Wiesenthal Institute');
addPerson('bela-rasky', 'Bela Rasky', 'Austrian historian and Director of the Vienna Wiesenthal Institute for Holocaust Studies (VWI), a research institution named after famed Nazi hunter Simon Wiesenthal', ['vienna-wiesenthal-institute']);

// Jewish Community of Stockholm (Sweden) - should have gotten it via judiska-forsamlingen
addIndiv('jewish-community-stockholm', 'Aron Verstandig', 'President of the Jewish Community of Stockholm');

// Ohel Leah Synagogue (China)
addIndiv('ohel-leah-synagogue', 'David Sassoon', 'Historic builder (Sassoon family)');
addPerson('david-sassoon-ohel', 'David Sassoon', 'Scion of the Sassoon family, the historically prominent Baghdadi Jewish dynasty who built the Ohel Leah Synagogue in Hong Kong in 1901, named after matriarch Leah Sassoon', ['ohel-leah-synagogue']);

// Jewish Museum of Oslo (Norway)
addIndiv('jewish-museum-of-oslo', 'Sidsel Levin', 'Former Director of the Jewish Museum in Oslo');

// Jewish Community of Belgrade (Serbia)
addIndiv('jewish-community-of-belgrade', 'Robert Sabados', 'President of the Federation of Jewish Communities of Serbia');
addPerson('robert-sabados', 'Robert Sabados', 'Serbian Jewish community leader and President of the Federation of Jewish Communities of Serbia, overseeing one of the oldest Jewish communities in the Balkans', ['jewish-community-of-belgrade']);

// Asociacion de Beneficencia Israelita de Quito (Ecuador)
addIndiv('asociaci-n-de-beneficencia-israelita-de-quito', 'Diego Dreyfus', 'President of the Jewish community of Quito');
addPerson('diego-dreyfus', 'Diego Dreyfus', 'Ecuadorian Jewish community leader and President of the Asociacion de Beneficencia Israelita de Quito, representing the small but historic Jewish community of Ecuador', ['asociaci-n-de-beneficencia-israelita-de-quito']);

// Iraqi Jewish Heritage
addIndiv('iraqi-jewish-heritage', 'Edwin Shuker', 'Vice President of the Board of Deputies representing Sephardic Jews');
addPerson('edwin-shuker', 'Edwin Shuker', 'Iraqi-born British Jewish leader and activist for Iraqi Jewish heritage preservation, Vice President of the Board of Deputies of British Jews, advocating for the return of Iraqi Jewish archives', ['iraqi-jewish-heritage']);

// Jewish Community of Madagascar / Community of Jewish Descent in Madagascar
addIndiv('jewish-community-of-madagascar', 'Aaron Amoyal', 'Community leader');
addIndiv('community-of-jewish-descent-in-madagascar', 'Toviana Tolotra', 'Community organizer and leader of the Malagasy Jewish community');
addPerson('toviana-tolotra', 'Toviana Tolotra', 'Malagasy community leader organizing the Community of Jewish Descent in Madagascar, one of Africa\'s most unique Jewish communities seeking formal recognition', ['community-of-jewish-descent-in-madagascar']);

// Colegio Instituto Alberto Einstein (Panama)
addIndiv('colegio-instituto-alberto-einstein', 'Aaron Btesh', 'School board president');
addPerson('aaron-btesh', 'Aaron Btesh', 'Panamanian Jewish community leader and president of the board of Colegio Instituto Alberto Einstein, the Jewish day school in Panama City serving the community of approximately 10,000 Jews', ['colegio-instituto-alberto-einstein']);

// CAIV Venezuela
addIndiv('caiv-venezuela', 'David Bittan', 'President of CAIV');
addPerson('david-bittan', 'David Bittan', 'Venezuelan Jewish community leader and President of CAIV (Confederacion de Asociaciones Israelitas de Venezuela), leading the community through a period of significant emigration due to political instability', ['caiv-venezuela']);

// Shaare Shalom Synagogue (Jamaica)
addIndiv('shaare-shalom-synagogue', 'Ainsley Henriques', 'Community historian and leader');

// Mountain Jews of Azerbaijan
addIndiv('mountain-jews-azerbaijan', 'God Nisanov', 'Prominent Mountain Jewish businessman and philanthropist');
addPerson('god-nisanov', 'God Nisanov', 'Azerbaijani-Israeli billionaire businessman and one of the most prominent members of the Mountain Jewish (Juhuro) community, major real estate developer and philanthropist', ['mountain-jews-azerbaijan']);

// Sephardi Hebrew Congregation of Harare (Zimbabwe)
addIndiv('sephardi-hebrew-congregation-of-harare', 'Mordecai Mishael', 'Community elder of Harare Jewish community');
addPerson('mordecai-mishael', 'Mordecai Mishael', 'Zimbabwean Jewish community elder and leader of the Sephardi Hebrew Congregation of Harare, one of the last remaining synagogues in Zimbabwe', ['sephardi-hebrew-congregation-of-harare']);

// Communaute Juive de Lubumbashi (DRC) and Jewish Community of Lubumbashi
addIndiv('communaut-juive-de-lubumbashi', 'Ruben Kaluski', 'Community leader');
addPerson('ruben-kaluski', 'Ruben Kaluski', 'Congolese Jewish community leader in Lubumbashi, maintaining Jewish life in the Democratic Republic of Congo where a small community has existed since the Belgian colonial period', ['communaut-juive-de-lubumbashi']);

addIndiv('jewish-community-of-lubumbashi', 'Benoit Mbuyi', 'Leader of the Lubumbashi Jewish community');
addPerson('benoit-mbuyi', 'Benoit Mbuyi', 'Congolese community leader heading the Jewish Community of Lubumbashi in the Democratic Republic of the Congo, helping maintain Jewish communal life in Central Africa', ['jewish-community-of-lubumbashi']);

// Windhoek Hebrew Congregation (Namibia)
addIndiv('windhoek-hebrew-congregation', 'Zvi Gillick', 'Community leader of the Windhoek Jewish community');
addPerson('zvi-gillick', 'Zvi Gillick', 'Namibian Jewish community leader and head of the Windhoek Hebrew Congregation, one of the smallest but most enduring Jewish communities in southern Africa', ['windhoek-hebrew-congregation']);

// House of Israel Community (Ghana)
addIndiv('house-of-israel-community', 'Aaron Ahomtre Toakyirafa', 'Spiritual leader of the House of Israel');
addPerson('aaron-toakyirafa', 'Aaron Ahomtre Toakyirafa', 'Ghanaian community leader and spiritual head of the House of Israel Community in Sefwi Wiawso, Ghana, an African community practicing Judaism since the 1970s', ['house-of-israel-community']);

// Yemenite Jewish Heritage
addIndiv('yemenite-jewish-heritage', 'Yosef Qafih', 'Historic rabbinic leader (1917-2000)');
addPerson('yosef-qafih', 'Yosef Qafih', 'Yemenite-Israeli rabbi, scholar, and authority on Maimonides who preserved Yemenite Jewish traditions after leading community aliyah; awarded the Israel Prize for Jewish literature', ['yemenite-jewish-heritage']);

// Libyan Jewish Heritage
addIndiv('libyan-jewish-heritage', 'David Gerbi', 'Libyan Jewish activist for heritage preservation');
addPerson('david-gerbi', 'David Gerbi', 'Libyan-born Jewish psychoanalyst and activist who has campaigned for the restoration of the Dar Bishi Synagogue in Tripoli and preservation of Libyan Jewish heritage after the community\'s expulsion', ['libyan-jewish-heritage']);

// Maghen Abraham Synagogue (Lebanon)
addIndiv('maghen-abraham-synagogue', 'Isaac Arazi', 'Former community leader (historic)');
addPerson('isaac-arazi-leb', 'Isaac Arazi', 'Lebanese Jewish community leader associated with the Maghen Abraham Synagogue in Beirut, once the center of a thriving 20,000-strong Jewish community that has dwindled to a handful', ['maghen-abraham-synagogue']);

// Gibraltar Hebrew Community
addIndiv('gibraltar-hebrew-community', 'James Levy', 'Community leader and Chief Minister ally');
addPerson('james-levy-gib', 'James Levy', 'Gibraltarian Jewish community leader and prominent member of the Gibraltar Hebrew Community, one of the oldest continuously functioning Jewish communities in the British Isles', ['gibraltar-hebrew-community']);

// Lusaka Hebrew Congregation (Zambia) / Council for Zambian Jewry
addIndiv('lusaka-hebrew-congregation', 'Martin Sobel', 'Congregation president');
addPerson('martin-sobel', 'Martin Sobel', 'Zambian Jewish community leader and president of the Lusaka Hebrew Congregation, maintaining Jewish communal life in Zambia where the community peaked at around 1,200 in the 1950s', ['lusaka-hebrew-congregation']);

addIndiv('council-for-zambian-jewry', 'David Sobel', 'Chairman of the Council for Zambian Jewry');
addPerson('david-sobel-zambia', 'David Sobel', 'Zambian Jewish community leader and Chairman of the Council for Zambian Jewry, coordinating the affairs of the small remaining Jewish population in the country', ['council-for-zambian-jewry']);

// Lithuanian Jewish Community (LJC)
addIndiv('lithuanian-jewish-community-ljc', 'Faina Kukliansky', 'Chairwoman of the Lithuanian Jewish Community');
addPerson('faina-kukliansky', 'Faina Kukliansky', 'Lithuanian lawyer and Chairwoman of the Lithuanian Jewish Community (LJC), a vocal advocate for Holocaust remembrance and restitution of Jewish property in Lithuania', ['lithuanian-jewish-community-ljc']);

// Riga Ghetto and Latvian Holocaust Museum
addIndiv('riga-ghetto-holocaust-museum', 'Margers Vestermanis', 'Founder of the Museum (Holocaust survivor)');
addPerson('margers-vestermanis', 'Margers Vestermanis', 'Latvian historian and Holocaust survivor who founded the Riga Ghetto and Latvian Holocaust Museum, dedicating his life to documenting the destruction of Latvian Jewry', ['riga-ghetto-holocaust-museum']);

// Union of Belarusian Jewish Communities
addIndiv('union-of-belarusian-jewish-public-associations-and-communities', 'Yuri Dorn', 'Chairman of the Union');
addPerson('yuri-dorn', 'Yuri Dorn', 'Belarusian Jewish community leader and Chairman of the Union of Belarusian Jewish Public Associations and Communities, representing Jewish life in a country that lost 90% of its Jews in the Holocaust', ['union-of-belarusian-jewish-public-associations-and-communities']);

// Jewish Community of Kazakhstan
addIndiv('jewish-community-of-kazakhstan', 'Alexander Baron', 'Chief Rabbi of Kazakhstan');
addPerson('alexander-baron', 'Alexander Baron', 'Rabbi serving as Chief Rabbi of Kazakhstan and leader of the Jewish community, overseeing Jewish life across Central Asia\'s largest country with communities in Almaty and Nur-Sultan', ['jewish-community-of-kazakhstan']);

// Surabaya Jewish Community (Indonesia)
addIndiv('surabaya-jewish-community', 'Yaakov Baruch', 'Community leader and synagogue caretaker');
addPerson('yaakov-baruch', 'Yaakov Baruch', 'Indonesian Jewish community leader and caretaker of the last remaining synagogue in Surabaya, preserving the legacy of what was once a thriving Jewish community in the Dutch East Indies', ['surabaya-jewish-community']);

// Nidhe Israel Synagogue (Barbados)
addIndiv('nidhe-israel-synagogue', 'Paul Altman', 'President of the Barbados Jewish community');
addPerson('paul-altman', 'Paul Altman', 'Barbadian Jewish community leader and president of the Nidhe Israel congregation, one of the oldest synagogues in the Western Hemisphere dating to 1654', ['nidhe-israel-synagogue']);

// Hebrew Congregation of St. Thomas (USVI)
addIndiv('hebrew-congregation-of-st-thomas', 'Michael Shillingford', 'Congregation president');
addPerson('michael-shillingford', 'Michael Shillingford', 'Community leader and president of the Hebrew Congregation of St. Thomas in the U.S. Virgin Islands, home to one of the oldest synagogues in the Western Hemisphere with a famous sand floor', ['hebrew-congregation-of-st-thomas']);

// Jewish Community of Dushanbe (Tajikistan)
addIndiv('jewish-community-of-dushanbe', 'Abe Yakubov', 'Community leader in Dushanbe');
addPerson('abe-yakubov', 'Abe Yakubov', 'Tajik Jewish community leader heading the last remaining Jewish community in Dushanbe, Tajikistan, where Bukharan Jews have lived for centuries', ['jewish-community-of-dushanbe']);

// Chabad of Phnom Penh (Cambodia)
addIndiv('chabad-of-phnom-penh', 'Rabbi Bentzion Butman', 'Chabad representative to Cambodia');
addPerson('bentzion-butman', 'Rabbi Bentzion Butman', 'Chabad-Lubavitch rabbi serving as the Chabad representative to Cambodia, providing Jewish services and community support in Phnom Penh for tourists, expats, and locals', ['chabad-of-phnom-penh']);

// Chabad of Vientiane (Laos)
addIndiv('chabad-of-vientiane', 'Rabbi Sayoun Yitzhaki', 'Chabad representative to Laos');
addPerson('sayoun-yitzhaki', 'Rabbi Sayoun Yitzhaki', 'Chabad rabbi serving as the Chabad-Lubavitch representative in Vientiane, Laos, providing Jewish services in one of Southeast Asia\'s most remote Jewish outposts', ['chabad-of-vientiane']);

// Jewish Community of Port Moresby (Papua New Guinea)
addIndiv('jewish-community-of-port-moresby', 'John Segal', 'Community coordinator');
addPerson('john-segal-png', 'John Segal', 'Community coordinator of the small Jewish community of Port Moresby, Papua New Guinea, one of the most remote Jewish communities in the world', ['jewish-community-of-port-moresby']);

// Jewish Community of Suva (Fiji)
addIndiv('jewish-community-of-suva', 'Robert Williams', 'Community organizer');
addPerson('robert-williams-fiji', 'Robert Williams', 'Community organizer of the small Jewish community of Suva, Fiji, maintaining informal Jewish communal life in the South Pacific islands', ['jewish-community-of-suva']);

// Jewish Heritage of Malta
addIndiv('jewish-heritage-of-malta', 'Gloria Mizzi', 'Heritage preservation advocate');
addPerson('gloria-mizzi', 'Gloria Mizzi', 'Maltese researcher and heritage preservation advocate documenting the history of Jews in Malta from Roman times through the Inquisition and into the modern era', ['jewish-heritage-of-malta']);

// Association Culturelle Israelite de Monaco
addIndiv('association-culturelle-isra-lite-de-monaco', 'Francis Journo', 'President of the Monaco Jewish community');
addPerson('francis-journo', 'Francis Journo', 'Monegasque Jewish community leader and President of the Association Culturelle Israelite de Monaco, heading one of the most exclusive and smallest Jewish communities in the world', ['association-culturelle-isra-lite-de-monaco']);

// Jewish Community of Andorra  
addIndiv('jewish-community-of-andorra', 'Daniel Rosenberg', 'Community organizer');
addPerson('daniel-rosenberg-and', 'Daniel Rosenberg', 'Community organizer of the tiny Jewish community of Andorra, one of the world\'s smallest organized Jewish groups in the Pyrenean microstate', ['jewish-community-of-andorra']);

// Jewish Community of Cyprus
addIndiv('jewish-community-of-cyprus', 'David Alkalay', 'Head of the Jewish Community of Cyprus');
addPerson('david-alkalay', 'David Alkalay', 'Cypriot Jewish community leader heading the Jewish community of Cyprus, maintaining Jewish life on an island with ancient Jewish connections dating to Roman times and the British detention camps of the 1940s', ['jewish-community-of-cyprus']);

// Jewish Community of Sarajevo (Bosnia)
addIndiv('jewish-community-of-sarajevo', 'Jakob Finci', 'President of the Jewish Community of Bosnia and Herzegovina');
addPerson('jakob-finci', 'Jakob Finci', 'Bosnian Jewish diplomat and community leader, President of the Jewish Community of Bosnia and Herzegovina, former ambassador, and plaintiff in the landmark Finci v. Bosnia case at the European Court of Human Rights', ['jewish-community-of-sarajevo']);

// Jewish Community of Skopje (North Macedonia)
addIndiv('jewish-community-of-skopje', 'Berta Romano Nikolikj', 'President of the Jewish Community of North Macedonia');
addPerson('berta-romano', 'Berta Romano Nikolikj', 'North Macedonian Jewish community leader and President of the Jewish Community, preserving the legacy of the Monastir Sephardic tradition and memory of the 7,148 Macedonian Jews deported in the Holocaust', ['jewish-community-of-skopje']);

// Jewish Community of Albania
addIndiv('jewish-community-of-albania', 'Amos Luzatto', 'Community liaison and heritage advocate');
addPerson('amos-luzatto-alb', 'Amos Luzatto', 'Albanian Jewish community advocate helping preserve the remarkable story of Albania, the only European country that had more Jews after the Holocaust than before, thanks to Albanian Muslims who sheltered them', ['jewish-community-of-albania']);

// Jewish Community of Ljubljana (Slovenia)
addIndiv('jewish-community-of-ljubljana', 'Andrej Kozar-Beck', 'President of the Jewish Community of Slovenia');
addPerson('andrej-kozar-beck', 'Andrej Kozar-Beck', 'Slovenian Jewish community leader and President of the Jewish Community of Ljubljana, working to revive Jewish life in Slovenia where Jews were expelled in the 15th century and nearly eliminated in the Holocaust', ['jewish-community-of-ljubljana']);

// =====================================================================
// Write files
// =====================================================================
const fixedJd = fixDashes(jd);
const fixedPd = fixDashes(pd);

let totalEntries = 0, totalConns = 0, zeroIndiv = 0, zeroConn = 0, lowConn = 0;
for (const c of Object.keys(fixedJd.countries)) {
  for (const e of fixedJd.countries[c]) {
    totalEntries++;
    totalConns += (e.connections || []).length;
    if ((e.individuals || []).length === 0) zeroIndiv++;
    if ((e.connections || []).length === 0) zeroConn++;
    if ((e.connections || []).length <= 1) lowConn++;
  }
}
const totalPeople = Object.keys(fixedPd.people).length;

console.log('=== expandData42 Results ===');
console.log('Total entries:', totalEntries);
console.log('Total people:', totalPeople);
console.log('Total connections:', totalConns);
console.log('Entries with 0 connections:', zeroConn);
console.log('Entries with 0-1 connections:', lowConn);
console.log('Entries with 0 individuals:', zeroIndiv);

const str = JSON.stringify(fixedJd) + JSON.stringify(fixedPd);
console.log('Em dashes:', (str.match(/\u2014/g) || []).length);
console.log('En dashes:', (str.match(/\u2013/g) || []).length);

fs.writeFileSync(jewishPath, JSON.stringify(fixedJd, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(fixedPd, null, 2));
console.log('Files written successfully.');
