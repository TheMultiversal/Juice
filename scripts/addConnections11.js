// addConnections11.js - Remaining countries enrichment (India, Argentina, Brazil, Mexico, etc.)
const fs = require('fs');
const path = require('path');
const jewishFile = path.join(__dirname, '..', 'data', 'jewish.json');
const peopleFile = path.join(__dirname, '..', 'data', 'people.json');
const data = JSON.parse(fs.readFileSync(jewishFile, 'utf8'));
const people = JSON.parse(fs.readFileSync(peopleFile, 'utf8'));

function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
const entryIndex = {};
for (const country in data.countries) { for (const entry of data.countries[country]) { entryIndex[entry.id] = { entry, country }; } }
function addConn(id, connections) {
  if (!entryIndex[id]) return;
  const e = entryIndex[id].entry;
  if (!e.connections) e.connections = [];
  connections.forEach(c => { if (!e.connections.find(x => x.name === c.name)) e.connections.push(c); });
}
function updDesc(id, d) { if (entryIndex[id]) entryIndex[id].entry.description = d; }
function addInd(id, person) {
  if (!entryIndex[id]) return;
  const e = entryIndex[id].entry;
  if (!e.individuals) e.individuals = [];
  const pid = slugify(person.name);
  if (!e.individuals.find(i => i.id === pid)) {
    person.id = pid; e.individuals.push(person);
    if (!people.people[pid]) people.people[pid] = { name: person.name, bio: person.bio || '', notes: '' };
  }
}

// ============================================================
// INDIA
// ============================================================

addConn('central-jewish-board-of-india', [
  { name: "Bene Israel community", type: "constituent", description: "Represents the Bene Israel, India's largest Jewish group (~5,000 members)." },
  { name: "Cochini Jews", type: "constituent", description: "Represents the remnants of the Cochini Jewish community of Kerala." },
  { name: "Indian government", type: "engagement", description: "Engages with the Indian government on Jewish community matters." }
]);
updDesc('central-jewish-board-of-india', 'The Central Jewish Board of India represents India\'s small but historic Jewish community (approximately 5,000 people). India\'s Jews comprise several distinct communities: the Bene Israel (majority, concentrated in Mumbai and Maharashtra), Cochini Jews (from Kerala), and Baghdadi Jews (from Iraq, based in Mumbai and Kolkata). India is unique in that its Jewish communities faced virtually no antisemitism throughout history.');

addConn('the-jewish-club-mumbai', [
  { name: "Mumbai Jewish community", type: "community center", description: "Social hub of Mumbai's Jewish community." },
  { name: "Bene Israel", type: "primary community", description: "Mainly serves the Bene Israel community of Mumbai." },
  { name: "Indian Jewish heritage", type: "cultural preservation", description: "Preserves and celebrates Indian Jewish cultural traditions." }
]);
updDesc('the-jewish-club-mumbai', 'The Jewish Club in Mumbai serves as the social and cultural hub of Mumbai\'s Jewish community, primarily the Bene Israel. Mumbai (formerly Bombay) has been the centre of Indian Jewish life, with Jewish communities dating back centuries. The club hosts events, celebrations, and community gatherings, preserving the unique cultural traditions of Indian Jewry.');

addConn('chabad-house-mumbai', [
  { name: "Chabad-Lubavitch", type: "parent movement", description: "Part of the global Chabad-Lubavitch network." },
  { name: "2008 Mumbai attacks", type: "tragic history", description: "The original Nariman House was targeted in the 2008 Mumbai terrorist attacks; six Jews including Rabbi Gavriel and Rivka Holtzberg were killed." },
  { name: "Israeli tourists", type: "service", description: "Serves Israeli backpackers and tourists visiting India." },
  { name: "Rebuilt and reopened", type: "resilience", description: "Rebuilt and reopened after the 2008 attacks as a symbol of resilience." }
]);
updDesc('chabad-house-mumbai', 'Chabad House Mumbai (Nariman House) gained global attention during the November 2008 Mumbai terrorist attacks when Pakistani terrorists targeted it, killing six Jews including Rabbi Gavriel and Rivka Holtzberg. Their two-year-old son Moshe was rescued by his Indian nanny Sandra Samuel. The building was rebuilt and reopened as a living memorial and continues to serve Jewish travelers, Israeli tourists, and the local Jewish community.');
addInd('chabad-house-mumbai', { name: "Rabbi Gavriel Holtzberg", bio: "Rabbi Gavriel Holtzberg (Jewish, Israeli, 1979-2008) and his wife Rivka ran Chabad Nariman House in Mumbai. Both were murdered during the 2008 Mumbai terrorist attacks." });

addConn('sassoon-family-legacy', [
  { name: "David Sassoon", type: "patriarch", description: "David Sassoon (Jewish, 1792-1864), born in Baghdad, built a trading empire from Bombay spanning the British Empire." },
  { name: "Baghdadi Jewish community", type: "community", description: "The Sassoons were the leading family of the Baghdadi Jewish community in India." },
  { name: "British Empire trade", type: "commercial empire", description: "Trade network from India to China, including opium, cotton, and banking." },
  { name: "Sassoon Docks & hospitals", type: "legacy", description: "Built Sassoon Docks, hospitals, and libraries in Mumbai that still stand today." },
  { name: "Siegfried Sassoon", type: "descendant", description: "Poet Siegfried Sassoon, famous WWI war poet, was a descendant." }
]);
updDesc('sassoon-family-legacy', 'The Sassoon family (Baghdadi Jews) built one of the greatest trading empires of the 19th century. Patriarch David Sassoon (1792-1864) fled Baghdad to Bombay, establishing a commercial network spanning India, China, and the British Empire. Known as the "Rothschilds of the East," they traded in cotton, opium, and textiles. Built Sassoon Docks, David Sassoon Library, and hospitals in Mumbai. Descendant Siegfried Sassoon became a renowned WWI poet.');

addConn('knesset-eliyahoo-synagogue-mumbai', [
  { name: "Baghdadi Jewish community", type: "congregation", description: "Built by Jacob Elias Sassoon of the Sassoon family for the Baghdadi Jewish community." },
  { name: "Heritage architecture", type: "landmark", description: "Blue-painted synagogue is a heritage landmark in the Kala Ghoda area of Mumbai." },
  { name: "Restored by Indian government", type: "preservation", description: "Restored in 2019 with support from Indian heritage organizations." }
]);
updDesc('knesset-eliyahoo-synagogue-mumbai', 'Knesset Eliyahoo (also called the Sassoon Synagogue) is a Baghdadi Jewish synagogue in Mumbai built in 1884 by Jacob Elias Sassoon of the famous Sassoon trading family. Its striking blue exterior is a landmark in the Kala Ghoda art district of South Mumbai. Restored in 2019 with support from Indian heritage organizations. One of the finest synagogues in Asia and a symbol of the Baghdadi Jewish community\'s prosperity in India.');

addConn('paradesi-synagogue-kochi', [
  { name: "Cochini Jewish community", type: "congregation", description: "Built by the Paradesi (foreign) Jewish community of Cochin, Kerala." },
  { name: "Oldest active synagogue in Commonwealth", type: "distinction", description: "Built in 1568, it is the oldest active synagogue in all Commonwealth nations." },
  { name: "Heritage tourism", type: "current use", description: "Major heritage tourism destination in Kerala's Jew Town, Fort Kochi." },
  { name: "Chinese floor tiles", type: "feature", description: "Famous for its hand-painted Chinese willow pattern floor tiles, each unique." }
]);
updDesc('paradesi-synagogue-kochi', 'The Paradesi Synagogue in Kochi (Cochin), Kerala, built in 1568, is the oldest active synagogue in Commonwealth nations. Located in "Jew Town" in Mattancherry, Fort Kochi. Famous for its hand-painted blue-and-white Chinese willow-pattern floor tiles (each unique), Belgian glass chandeliers, and gold pulpit. The Cochini Jewish community dates back possibly 2,000 years to the era of King Solomon\'s trade with India.');

addConn('bene-israel-heritage-museum-mumbai', [
  { name: "Bene Israel community", type: "subject", description: "Documents the history of the Bene Israel, India's largest Jewish community." },
  { name: "Indian Jewish identity", type: "cultural preservation", description: "Preserves the unique cultural traditions of Indian Jews." },
  { name: "2,000+ year history", type: "heritage", description: "The Bene Israel claim descent from Jews who arrived in India over 2,000 years ago." }
]);
updDesc('bene-israel-heritage-museum-mumbai', 'The Bene Israel Heritage Museum in Mumbai documents the history of the Bene Israel, India\'s largest Jewish community. The Bene Israel claim descent from Jews who arrived on India\'s Konkan coast over 2,000 years ago, possibly fleeing persecution under Antiochus IV. They adopted Indian customs while maintaining Jewish practices. Most Bene Israel have emigrated to Israel, but a community of ~5,000 remains in India, primarily in Mumbai.');

// ============================================================
// ARGENTINA
// ============================================================

addConn('daia-delegaci-n-de-asociaciones-israelitas-argentinas', [
  { name: "Argentine Jewish community", type: "constituency", description: "Political representative body of Argentine Jewry (~180,000), the largest in Latin America." },
  { name: "AMIA bombing (1994)", type: "defining event", description: "The 1994 AMIA bombing that killed 85 people shaped DAIA's mission toward security and justice." },
  { name: "Argentine government", type: "political engagement", description: "Engages with the Argentine government on antisemitism, security, and AMIA bombing accountability." },
  { name: "Iran accountability", type: "advocacy", description: "Has demanded accountability from Iran, accused of orchestrating the AMIA bombing." }
]);
updDesc('daia-delegaci-n-de-asociaciones-israelitas-argentinas', 'DAIA (Delegación de Asociaciones Israelitas Argentinas) is the political representative body of Argentine Jewry, the largest Jewish community in Latin America (~180,000). Its mission was profoundly shaped by the 1994 AMIA bombing that killed 85 people - the deadliest antisemitic attack in the Western Hemisphere. DAIA has persistently demanded accountability from Iran, which is accused of orchestrating the bombing. Also combats antisemitism in Argentine society.');

addConn('amia-asociaci-n-mutual-israelita-argentina', [
  { name: "1994 AMIA bombing", type: "defining event", description: "On July 18, 1994, a car bomb destroyed the AMIA building, killing 85 people - the worst terrorist attack in Argentine history." },
  { name: "Iran and Hezbollah", type: "accused perpetrators", description: "Iran and Hezbollah are accused of planning and executing the bombing." },
  { name: "Argentine judicial system", type: "justice pursuit", description: "The investigation has been plagued by cover-ups and obstruction, including the suspicious death of prosecutor Alberto Nisman." },
  { name: "Alberto Nisman", type: "murdered prosecutor", description: "Prosecutor Alberto Nisman was found dead in 2015, hours before presenting evidence of a government cover-up." }
]);
updDesc('amia-asociaci-n-mutual-israelita-argentina', 'AMIA (Asociación Mutual Israelita Argentina) is the main Jewish community centre of Buenos Aires. On July 18, 1994, a car bomb destroyed the AMIA building, killing 85 people - the deadliest attack in Argentine history and the worst antisemitic attack in the Western Hemisphere since WWII. Iran and Hezbollah are accused of orchestrating it. Prosecutor Alberto Nisman, who investigated the bombing, was found dead in 2015 hours before presenting evidence of a government cover-up.');
addInd('amia-asociaci-n-mutual-israelita-argentina', { name: "Alberto Nisman", bio: "Alberto Nisman (Jewish, 1963-2015), Argentine prosecutor, investigated the AMIA bombing for 10 years. Found dead with a gunshot wound in 2015, hours before he was to present evidence that President Cristina Kirchner covered up Iranian involvement." });

addConn('sociedad-hebraica-argentina', [
  { name: "Buenos Aires Jewish community", type: "community center", description: "Major Jewish community and sports centre in Buenos Aires." },
  { name: "Cultural programming", type: "activities", description: "Offers cultural, educational, athletic, and social programs." },
  { name: "Argentine Jewish culture", type: "role", description: "One of the most important Jewish cultural institutions in Latin America." }
]);
updDesc('sociedad-hebraica-argentina', 'Sociedad Hebraica Argentina is one of the largest and most important Jewish community centres in Latin America, located in Buenos Aires. Offers extensive cultural, educational, athletic, and social programs. Hosts a major Jewish film festival, theater productions, concerts, and art exhibitions. Plays a central role in Buenos Aires\' vibrant Jewish cultural life.');

addConn('buenos-aires-herald-jewish-community-media', [
  { name: "Argentine Jewish media", type: "media landscape", description: "Argentine Jewish community maintains several media outlets in Spanish and Yiddish." },
  { name: "Nueva Sion", type: "publication", description: "Nueva Sion is a leading Argentine Jewish publication." },
  { name: "Argentine Jewish journalism", type: "tradition", description: "Argentina has a rich tradition of Jewish journalism dating to the immigration waves of the late 19th century." }
]);
updDesc('buenos-aires-herald-jewish-community-media', 'Argentine Jewish community media includes publications like Nueva Sion and the Yiddish-language press that has served Buenos Aires since the late 19th century immigration waves. Argentina\'s Jewish press tradition reflects the community\'s vibrant cultural life. Buenos Aires was once one of the world\'s great centres of Yiddish literature and journalism.');

addConn('buenos-aires-jewish-museum', [
  { name: "Argentine Jewish heritage", type: "mission", description: "Preserves and displays the history of Jewish life in Argentina." },
  { name: "Immigration history", type: "key theme", description: "Documents Jewish immigration from Eastern Europe to Argentina in the late 19th and early 20th centuries." },
  { name: "Jewish gauchos", type: "cultural theme", description: "Tells the unique story of Jewish agricultural colonists in the pampas - the 'Jewish gauchos'." }
]);
updDesc('buenos-aires-jewish-museum', 'The Buenos Aires Jewish Museum documents the rich history of Jewish life in Argentina from the late 19th century immigration waves to the present. Tells the unique story of the Jewish gauchos - Eastern European Jewish immigrants who settled as agricultural colonists in the Argentine pampas through the Jewish Colonization Association (JCA) founded by Baron Maurice de Hirsch. Argentina has the largest Jewish community in Latin America.');

addConn('seminario-rab-nico-latinoamericano', [
  { name: "Conservative/Masorti movement", type: "denomination", description: "The primary Conservative/Masorti rabbinical seminary in Latin America." },
  { name: "Jewish Theological Seminary (JTS)", type: "institutional connection", description: "Affiliated with JTS in New York." },
  { name: "Latin American rabbinate", type: "training", description: "Has trained rabbis serving communities across Latin America for decades." }
]);
updDesc('seminario-rab-nico-latinoamericano', 'The Seminario Rabínico Latinoamericano Marshall T. Meyer is the premier Conservative/Masorti rabbinical seminary in Latin America, founded in 1962 in Buenos Aires. Named after Rabbi Marshall T. Meyer (American Jewish leader), who played a heroic role defending human rights during Argentina\'s military dictatorship. Affiliated with JTS in New York. Has trained generations of rabbis serving communities across Latin America.');
addInd('seminario-rab-nico-latinoamericano', { name: "Rabbi Marshall T. Meyer", bio: "Rabbi Marshall T. Meyer (Jewish, American, 1930-1993), founder of the Seminario Rabínico Latinoamericano, heroically defended human rights during Argentina's military dictatorship (1976-1983), visiting political prisoners and documenting abuses." });

addConn('grupo-werthein', [
  { name: "Werthein family", type: "ownership", description: "Led by the Werthein family (Jewish), one of Argentina's most prominent business families." },
  { name: "Telecom Argentina", type: "investment", description: "Major shareholders in Telecom Argentina, the country's largest telecom company." },
  { name: "Argentine economy", type: "market position", description: "Diversified conglomerate with interests in telecom, agriculture, and real estate." }
]);
updDesc('grupo-werthein', 'Grupo Werthein is one of Argentina\'s most prominent business groups, led by the Werthein family (Jewish). Major investments include a significant stake in Telecom Argentina (the country\'s largest telecom company), agriculture, real estate, and media. The Werthein family is also active in Jewish communal life and philanthropy in Argentina.');

addConn('museo-del-holocausto-buenos-aires', [
  { name: "Argentine Jewish community", type: "community institution", description: "First Holocaust museum in Latin America." },
  { name: "Holocaust survivors in Argentina", type: "community", description: "Argentina received significant numbers of Holocaust survivors after WWII." },
  { name: "Nazi fugitives", type: "dark history", description: "Argentina paradoxically sheltered both Holocaust survivors and Nazi fugitives like Eichmann." }
]);
updDesc('museo-del-holocausto-buenos-aires', 'The Museo del Holocausto de Buenos Aires, founded in 1993, was the first Holocaust museum in Latin America. Argentina\'s relationship to the Holocaust is complex - it received thousands of Jewish refugees and survivors, while also becoming a haven for Nazi fugitives including Adolf Eichmann (captured by Mossad in Buenos Aires in 1960). The museum educates about the Holocaust in this unique Latin American context.');

addConn('ort-argentina', [
  { name: "World ORT", type: "parent organization", description: "Argentine branch of World ORT educational network." },
  { name: "Technical education", type: "mission", description: "Provides technological and vocational education." },
  { name: "ORT schools", type: "institutions", description: "Operates major schools in Buenos Aires serving thousands of students." }
]);
updDesc('ort-argentina', 'ORT Argentina is one of the largest branches of World ORT, operating major schools in Buenos Aires that serve thousands of students. Provides technological, scientific, and vocational education combining Jewish values with cutting-edge technology training. ORT schools in Argentina are among the most prestigious technical schools in the country, serving both Jewish and non-Jewish students.');

addConn('beit-el-congregation-buenos-aires', [
  { name: "Conservative/Masorti Judaism", type: "denomination", description: "Major Conservative/Masorti congregation in Buenos Aires." },
  { name: "Rabbi Marshall T. Meyer", type: "historic leader", description: "Led by Rabbi Marshall T. Meyer, who transformed it into a centre of progressive Judaism and human rights." },
  { name: "Human rights activism", type: "legacy", description: "Under Meyer, became a beacon of resistance during Argentina's military dictatorship." }
]);
updDesc('beit-el-congregation-buenos-aires', 'Congregación Bet El is a major Conservative/Masorti synagogue in Buenos Aires, transformed by Rabbi Marshall T. Meyer (American, Jewish) into a centre of progressive Judaism and human rights activism. During Argentina\'s military dictatorship (1976-1983), Meyer used Bet El as a base for his courageous defence of political prisoners and documentation of human rights abuses. One of the most important synagogues in Latin America.');

addConn('templo-libertad-buenos-aires', [
  { name: "Argentine Jewish heritage", type: "landmark", description: "One of the most important Jewish heritage buildings in Argentina." },
  { name: "Ashkenazi community", type: "congregation", description: "Built by the Ashkenazi Jewish community of Buenos Aires." },
  { name: "Historic architecture", type: "architectural significance", description: "Impressive Byzantine-Romanesque architecture from the early 20th century." }
]);
updDesc('templo-libertad-buenos-aires', 'Templo Libertad is one of Buenos Aires\' most impressive synagogues, built in 1897 by the Ashkenazi Jewish community. Its Byzantine-Romanesque architecture reflects the prosperity and ambition of Argentina\'s growing Jewish community in the late 19th century. Located on Calle Libertad in the heart of Buenos Aires, it remains an active synagogue and a symbol of Argentine Jewish heritage. Houses a museum of Jewish Argentine history.');

// ============================================================
// BRAZIL
// ============================================================

addConn('confedera-o-israelita-do-brasil-conib', [
  { name: "Brazilian Jewish community", type: "constituency", description: "Umbrella organization of Brazilian Jewry (~120,000), the second-largest in Latin America." },
  { name: "Brazilian government", type: "political engagement", description: "Engages with the federal government on Jewish community interests." },
  { name: "Antisemitism monitoring", type: "core function", description: "Monitors and combats antisemitism in Brazil." }
]);
updDesc('confedera-o-israelita-do-brasil-conib', 'CONIB (Confederação Israelita do Brasil) is the umbrella representative body of Brazilian Jewry (~120,000), the second-largest Jewish community in Latin America after Argentina. Engages with the Brazilian federal government, combats antisemitism, and coordinates communal activities. Brazil\'s Jewish community is concentrated in São Paulo and Rio de Janeiro, with origins in both Sephardi (crypto-Jewish) and Ashkenazi immigration.');

addConn('federa-o-israelita-do-estado-de-s-o-paulo-fisesp', [
  { name: "São Paulo Jewish community", type: "constituency", description: "Represents São Paulo's Jewish community, the largest in Brazil (~60,000)." },
  { name: "CONIB", type: "national umbrella", description: "Member of CONIB, the national Jewish umbrella organization." },
  { name: "Jewish institutions", type: "coordination", description: "Coordinates hundreds of Jewish organizations, schools, and synagogues in São Paulo." }
]);
updDesc('federa-o-israelita-do-estado-de-s-o-paulo-fisesp', 'FISESP (Federação Israelita do Estado de São Paulo) represents São Paulo\'s Jewish community, the largest in Brazil with approximately 60,000 members. Coordinates hundreds of Jewish organizations, schools, synagogues, and social service agencies. São Paulo\'s Higienópolis and Jardins neighborhoods are centres of Jewish life. Part of CONIB, the national umbrella organization.');

addConn('albert-einstein-hospital-hospital-israelita-albert-einstein', [
  { name: "São Paulo Jewish community", type: "founding community", description: "Founded by São Paulo's Jewish community in 1955." },
  { name: "Best hospital in Latin America", type: "distinction", description: "Consistently ranked as the best hospital in Latin America." },
  { name: "Global medical excellence", type: "reputation", description: "Partners with major global medical institutions including Johns Hopkins and Harvard Medical School." },
  { name: "Albert Einstein", type: "namesake", description: "Named after Albert Einstein (Jewish, 1879-1955), the physicist and Nobel laureate." }
]);
updDesc('albert-einstein-hospital-hospital-israelita-albert-einstein', 'Hospital Israelita Albert Einstein, founded by São Paulo\'s Jewish community in 1955, is consistently ranked as the best hospital in Latin America. Named after Albert Einstein (Jewish, 1879-1955). Partners with Johns Hopkins, Harvard Medical School, and other global institutions. Treats Brazilian presidents and world leaders. Also runs social programs providing free healthcare to underserved communities through its partnership with the Brazilian public health system.');

addConn('club-hebraica-s-o-paulo', [
  { name: "São Paulo Jewish community", type: "community center", description: "Major Jewish sports, cultural, and social club in São Paulo." },
  { name: "Cultural programming", type: "activities", description: "Hosts cultural events, theater, concerts, and educational programs." },
  { name: "Maccabi sports", type: "athletics", description: "Active in Maccabi sports competitions." }
]);
updDesc('club-hebraica-s-o-paulo', 'Club Hebraica São Paulo is one of the largest Jewish community centres in Latin America, offering sports, cultural, educational, and social programs. Located in São Paulo, it serves as a major gathering place for the Jewish community with facilities including pools, gyms, theaters, and event spaces. Hosts cultural festivals, educational seminars, and Maccabi sports activities.');

addConn('safra-group', [
  { name: "Joseph Safra", type: "patriarch", description: "Led by Joseph Safra (Jewish, Lebanese-Brazilian, 1938-2020), once the world's richest banker." },
  { name: "Banco Safra", type: "core business", description: "Banco Safra is one of Brazil's largest private banks." },
  { name: "Safra National Bank (NYC)", type: "international banking", description: "The Safra family also operates Safra National Bank in New York." },
  { name: "J. Safra Sarasin", type: "Swiss banking", description: "Swiss private bank J. Safra Sarasin, based in Basel." },
  { name: "Sephardi heritage", type: "origin", description: "The Safra family are Sephardi Jews originally from Aleppo, Syria via Beirut." }
]);
updDesc('safra-group', 'The Safra Group was led by Joseph Safra (Jewish, Lebanese-Brazilian, 1938-2020), who became the world\'s richest banker with a fortune exceeding $25 billion. The Safra family are Sephardi Jews originally from Aleppo, Syria, who moved to Beirut then Brazil. The empire includes Banco Safra (one of Brazil\'s largest private banks), Safra National Bank (New York), and J. Safra Sarasin (Swiss private bank). Joseph\'s brother Edmond Safra (1932-1999) founded Republic National Bank of New York.');

addConn('museu-judaico-de-s-o-paulo', [
  { name: "São Paulo Jewish heritage", type: "mission", description: "Documents the history of Jews in São Paulo and Brazil." },
  { name: "Brazilian Jewish identity", type: "cultural theme", description: "Explores the unique Brazilian Jewish identity and experience." },
  { name: "Immigration history", type: "core narrative", description: "Tells the story of Jewish immigration to Brazil from multiple waves." }
]);
updDesc('museu-judaico-de-s-o-paulo', 'The Museu Judaico de São Paulo (Jewish Museum of São Paulo) documents Jewish life in Brazil, from the Crypto-Jews who arrived during the Portuguese colonial era to modern immigration waves from Eastern Europe, the Middle East, and North Africa. Explores the unique Brazilian Jewish identity - a blend of Sephardi, Ashkenazi, and Mizrahi traditions adapted to tropical, multicultural Brazil.');

addConn('congrega-o-israelita-paulista-cip', [
  { name: "São Paulo Jewish community", type: "congregation", description: "One of the largest and most influential synagogues in Latin America." },
  { name: "Reform/Liberal Judaism", type: "denomination", description: "Brazil's leading Reform congregation." },
  { name: "German Jewish refugees", type: "founding community", description: "Founded by German Jewish refugees who fled Nazism in the 1930s." }
]);
updDesc('congrega-o-israelita-paulista-cip', 'Congregação Israelita Paulista (CIP) is one of the largest and most influential synagogues in Latin America, founded in 1936 by German Jewish refugees fleeing Nazism. Located in São Paulo\'s Higienópolis neighborhood. Associated with Reform/Liberal Judaism. Has played a central role in São Paulo\'s Jewish cultural and intellectual life for nearly 90 years.');

addConn('banco-safra', [
  { name: "Safra family", type: "ownership", description: "Owned by the Safra family (Jewish, Sephardi, of Syrian-Lebanese origin)." },
  { name: "Brazilian banking sector", type: "market position", description: "One of Brazil's largest private banks." },
  { name: "Safra Group", type: "parent", description: "Part of the broader Safra Group banking empire." }
]);
updDesc('banco-safra', 'Banco Safra is one of Brazil\'s largest private banks, owned by the Safra family (Jewish, Sephardi, of Syrian-Lebanese origin). Part of the broader Safra Group empire built by Joseph Safra (1938-2020). Offers commercial banking, wealth management, and investment services. The Safra family banking tradition dates back generations in Aleppo, Syria.');

addConn('museu-judaico-do-rio-de-janeiro', [
  { name: "Rio de Janeiro Jewish community", type: "community base", description: "Documents Jewish life in Rio de Janeiro." },
  { name: "Brazilian Jewish heritage", type: "mission", description: "Preserves and presents the history of Jews in Rio de Janeiro and Brazil." },
  { name: "Crypto-Jewish history", type: "theme", description: "Rio's Jewish history includes crypto-Jews during the Portuguese Inquisition era." }
]);
updDesc('museu-judaico-do-rio-de-janeiro', 'The Museu Judaico do Rio de Janeiro documents Jewish life in Rio de Janeiro from the colonial era to the present. Rio\'s Jewish history includes crypto-Jews during the Portuguese Inquisition era and subsequent immigration waves. The museum preserves artifacts, documents, and oral histories of a community that has contributed significantly to Rio\'s cultural, intellectual, and economic life.');

// ============================================================
// MEXICO
// ============================================================

addConn('comit-central-de-la-comunidad-jud-a-de-m-xico', [
  { name: "Mexican Jewish community", type: "constituency", description: "Umbrella body of Mexican Jewry (~50,000), the third-largest in Latin America." },
  { name: "Mexican government", type: "political engagement", description: "Represents Jewish interests to the Mexican government." },
  { name: "Diverse origins", type: "community composition", description: "Mexican Jews include Ashkenazi, Sephardi, Aleppo Syrian, Damascus Syrian, and other communities." }
]);
updDesc('comit-central-de-la-comunidad-jud-a-de-m-xico', 'The Comité Central de la Comunidad Judía de México is the umbrella organization of Mexican Jewry (~50,000), the third-largest Jewish community in Latin America. Unique in comprising distinct sub-communities: Ashkenazi, Sephardi, Aleppo-origin Syrian, Damascus-origin Syrian, and others, each with their own institutions. Concentrated in Mexico City\'s Polanco, Tecamachalco, and Interlomas neighborhoods.');

addConn('tribuna-israelita', [
  { name: "Antisemitism monitoring", type: "core function", description: "Monitors antisemitism and promotes tolerance in Mexico." },
  { name: "Mexican media", type: "engagement", description: "Engages with Mexican media to counter antisemitic narratives." },
  { name: "Comité Central", type: "affiliation", description: "Works alongside the Comité Central for communal advocacy." }
]);
updDesc('tribuna-israelita', 'Tribuna Israelita is the public affairs and advocacy arm of the Mexican Jewish community, combating antisemitism and promoting tolerance in Mexican society. Monitors media coverage, engages with journalists and opinion leaders, and produces educational materials. Works alongside the Comité Central to represent Jewish community interests in Mexico\'s public discourse.');

addConn('grupo-televisa-jewish-connections', [
  { name: "Emilio Azcárraga Jean", type: "company leader", description: "Televisa is Mexico's largest media company; leadership has connections to the Jewish business community." },
  { name: "Mexican media landscape", type: "market position", description: "Televisa is the largest producer of Spanish-language content in the world." },
  { name: "Jewish business connections", type: "network", description: "Jewish business figures in Mexico interact with the broader media and business elite." }
]);
updDesc('grupo-televisa-jewish-connections', 'Grupo Televisa is Mexico\'s largest media company and the world\'s largest producer of Spanish-language content. While not Jewish-owned, it operates within Mexico\'s business ecosystem where the Jewish community (~50,000) has significant commercial presence. Jewish entrepreneurs in Mexico include major figures in retail, manufacturing, and media who interact with the Televisa ecosystem.');

addConn('kidzania', [
  { name: "Xavier López Ancona", type: "founder", description: "Founded by Xavier López Ancona (Jewish, Mexican) in 1999." },
  { name: "Global expansion", type: "business model", description: "Expanded from Mexico to 25+ cities worldwide as a children's entertainment concept." },
  { name: "Mexican entrepreneurship", type: "innovation", description: "One of Mexico's most successful global consumer brands." }
]);
updDesc('kidzania', 'KidZania was founded by Xavier López Ancona (Jewish, Mexican) in 1999 in Mexico City. The interactive children\'s theme park concept, where kids role-play adult professions in a miniature city, has expanded to 25+ cities worldwide. One of Mexico\'s most successful global consumer brands and a standout example of Mexican Jewish entrepreneurship on the world stage.');
addInd('kidzania', { name: "Xavier López Ancona", bio: "Xavier López Ancona (Jewish, Mexican), founder and chairman of KidZania, created one of the most innovative children's entertainment concepts, expanding from Mexico City to 25+ locations worldwide." });

addConn('colegio-hebreo-maguen-david', [
  { name: "Mexican Jewish education", type: "school system", description: "Major Jewish day school in Mexico City." },
  { name: "Aleppo Syrian Jewish community", type: "community", description: "Historically connected to Mexico's Aleppo-origin Syrian Jewish community." },
  { name: "Jewish identity education", type: "mission", description: "Combines Mexican curriculum with Jewish studies and Hebrew." }
]);
updDesc('colegio-hebreo-maguen-david', 'Colegio Hebreo Maguen David is one of Mexico City\'s major Jewish day schools, historically associated with the Aleppo-origin Syrian Jewish community. Provides education from preschool through high school, combining the Mexican curriculum with Jewish studies and Hebrew. Mexico\'s Jewish school system is one of the most developed in Latin America, with separate schools for each sub-community.');

addConn('museo-memoria-y-tolerancia', [
  { name: "Holocaust education", type: "core exhibition", description: "Major Holocaust and genocide museum in Mexico City." },
  { name: "Human rights", type: "broader mission", description: "Also addresses other genocides and promotes tolerance and human rights." },
  { name: "Mexican Jewish community support", type: "community role", description: "Supported by the Mexican Jewish community and broader civil society." }
]);
updDesc('museo-memoria-y-tolerancia', 'The Museo Memoria y Tolerancia (Museum of Memory and Tolerance) in Mexico City is a major museum dedicated to Holocaust education and genocide prevention. Opened in 2010 in Mexico City\'s historic centre. Features exhibitions on the Holocaust, Armenian Genocide, Rwandan Genocide, and other mass atrocities. Supported by the Mexican Jewish community and promotes tolerance, diversity, and human rights education.');

// ============================================================
// HUNGARY
// ============================================================

addConn('federation-of-hungarian-jewish-communities-mazsihisz', [
  { name: "Hungarian Jewish community", type: "constituency", description: "Represents Hungarian Jewry (~75,000), the largest in Central Europe." },
  { name: "Hungarian government", type: "political engagement", description: "Engages with the Orbán government in a complex political relationship." },
  { name: "Dohány Street Synagogue", type: "key institution", description: "Manages the Dohány Street Synagogue, the largest in Europe." },
  { name: "Holocaust remembrance", type: "mission", description: "Advocates for Holocaust remembrance as over 500,000 Hungarian Jews were murdered." }
]);
updDesc('federation-of-hungarian-jewish-communities-mazsihisz', 'MAZSIHISZ (Federation of Hungarian Jewish Communities) represents Hungarian Jewry (~75,000-100,000), the largest Jewish community in Central Europe. Hungary lost over 500,000 Jews in the Holocaust in 1944-1945. MAZSIHISZ manages the Dohány Street Synagogue (largest in Europe), Jewish hospitals, schools, and social services. Navigates a complex relationship with Viktor Orbán\'s government.');

addConn('doh-ny-street-synagogue-budapest', [
  { name: "Largest synagogue in Europe", type: "distinction", description: "The largest synagogue in Europe and second-largest in the world (after Temple Emanu-El, NYC, seating 3,000)." },
  { name: "Moorish Revival architecture", type: "architectural style", description: "Built in 1859 in Moorish Revival style with Byzantine and Romantic elements." },
  { name: "Holocaust memorial", type: "site", description: "The Raoul Wallenberg Memorial Garden and Emanuel Tree (weeping willow sculpture) memorial are in its courtyard." },
  { name: "Budapest tourism", type: "cultural tourism", description: "One of Budapest's most visited tourist attractions." }
]);
updDesc('doh-ny-street-synagogue-budapest', 'The Dohány Street Synagogue (Great Synagogue of Budapest), built in 1859, is the largest synagogue in Europe and second-largest in the world, seating 3,000. Built in Moorish Revival style by Viennese architect Ludwig Förster. Connected to the Jewish Museum, Heroes\' Temple, and the Raoul Wallenberg Memorial Garden featuring the Emanuel Tree (weeping willow sculpture with names of Holocaust victims on its leaves). One of Budapest\'s most visited landmarks.');

addConn('hungarian-jewish-museum', [
  { name: "Dohány Street Synagogue", type: "location", description: "Located in the complex of the Dohány Street Synagogue." },
  { name: "Hungarian Jewish heritage", type: "collection", description: "Houses artifacts from Hungary's once-thriving Jewish community of 800,000+." },
  { name: "Holocaust documentation", type: "exhibition", description: "Documents the fate of Hungarian Jews, over 500,000 of whom perished." }
]);
updDesc('hungarian-jewish-museum', 'The Hungarian Jewish Museum, located in the Dohány Street Synagogue complex in Budapest, houses a rich collection of artifacts documenting Hungarian Jewish life and culture. Hungary\'s pre-war Jewish community of over 800,000 was one of the largest in Europe. The museum documents both the cultural achievements and the devastating destruction of Hungarian Jewry during the Holocaust, when over 500,000 were murdered in 1944-1945.');

addConn('raoul-wallenberg-memorial', [
  { name: "Raoul Wallenberg", type: "subject", description: "Swedish diplomat who saved tens of thousands of Hungarian Jews in 1944-1945 through protective passports and safe houses." },
  { name: "Holocaust rescue", type: "historic significance", description: "One of the most celebrated rescue efforts of the Holocaust." },
  { name: "Soviet disappearance", type: "tragic fate", description: "Wallenberg was arrested by Soviet forces in 1945 and disappeared into the Soviet gulag system." }
]);
updDesc('raoul-wallenberg-memorial', 'Memorials to Raoul Wallenberg honor the Swedish diplomat who saved tens of thousands of Hungarian Jews from the Holocaust in 1944-1945. Using Swedish protective passports (Schutzpässe) and establishing safe houses, Wallenberg rescued an estimated 100,000 Jews from deportation to Auschwitz. Arrested by Soviet forces in January 1945, he disappeared into the Soviet gulag system. His fate remains one of the great mysteries of the 20th century.');
addInd('raoul-wallenberg-memorial', { name: "Raoul Wallenberg", bio: "Raoul Wallenberg (1912-disappeared 1945/47?), Swedish diplomat and humanitarian, saved tens of thousands of Hungarian Jews through protective passports and safe houses during the Holocaust. Arrested by the Soviets, his fate remains unknown." });

addConn('shoes-on-the-danube-bank', [
  { name: "Arrow Cross atrocities", type: "historic event", description: "Memorializes Jews who were shot along the Danube by the fascist Arrow Cross militia in 1944-1945." },
  { name: "Holocaust memorial art", type: "art installation", description: "60 pairs of 1940s-era iron shoes line the Danube embankment, created by sculptor Gyula Pauer and film director Can Togay." },
  { name: "Budapest tourism", type: "iconic memorial", description: "One of the most moving and photographed Holocaust memorials in the world." }
]);
updDesc('shoes-on-the-danube-bank', 'Shoes on the Danube Bank is one of the world\'s most powerful Holocaust memorials, installed in Budapest in 2005. Sixty pairs of 1940s-era iron shoes line the Danube embankment, memorializing the thousands of Jews who were shot and cast into the river by the fascist Arrow Cross militia in 1944-1945. Victims were ordered to remove their shoes before being murdered. Created by sculptor Gyula Pauer and film director Can Togay.');

addConn('hungarian-jewish-heritage-foundation', [
  { name: "Hungarian Jewish heritage preservation", type: "mission", description: "Preserves Jewish heritage sites, synagogues, and cemeteries across Hungary." },
  { name: "Hungarian government", type: "partnership", description: "Works with the government on heritage preservation projects." },
  { name: "European Jewish heritage network", type: "international", description: "Part of European Jewish heritage preservation efforts." }
]);
updDesc('hungarian-jewish-heritage-foundation', 'The Hungarian Jewish Heritage Foundation works to preserve and restore Jewish heritage sites across Hungary, including synagogues, cemeteries, and community buildings. Before the Holocaust, Hungary had over 800 synagogues; many were destroyed or repurposed. The foundation documents and advocates for the preservation of the remarkable architectural legacy of Hungarian Jewry.');

addConn('ort-hungary', [
  { name: "World ORT", type: "parent organization", description: "Hungarian branch of the World ORT educational network." },
  { name: "Jewish education in Hungary", type: "role", description: "Provides educational programs for the Hungarian Jewish community." },
  { name: "Post-Communist revival", type: "context", description: "Part of the revival of Jewish institutional life in Hungary after 1989." }
]);
updDesc('ort-hungary', 'ORT Hungary is the Hungarian branch of World ORT, the international Jewish educational and vocational training network. Provides educational programs serving the Hungarian Jewish community and broader society. Part of the remarkable revival of Jewish institutional life in Hungary since the fall of Communism in 1989.');

// ============================================================
// AUSTRIA
// ============================================================

addConn('israelitische-kultusgemeinde-wien-jewish-community-of-vienna', [
  { name: "Austrian Jewish community", type: "constituency", description: "Represents Vienna's Jewish community (~15,000), the vast majority of Austrian Jewry." },
  { name: "Pre-war glory", type: "heritage", description: "Vienna's pre-war Jewish community of 200,000 was one of the most culturally significant in the world." },
  { name: "Austrian government", type: "institutional relationship", description: "Has a formal institutional relationship with the Austrian federal government." },
  { name: "Sigmund Freud, Gustav Mahler, Stefan Zweig", type: "famous Viennese Jews", description: "Vienna produced many of the most influential Jewish intellectuals, scientists, and artists in history." }
]);
updDesc('israelitische-kultusgemeinde-wien-jewish-community-of-vienna', 'The IKG Wien (Israelitische Kultusgemeinde Wien) is the official Jewish community of Vienna (~15,000 members). Vienna\'s pre-war Jewish community of 200,000 produced an extraordinary concentration of genius: Sigmund Freud, Gustav Mahler, Arnold Schoenberg, Ludwig Wittgenstein, Stefan Zweig, Billy Wilder, and many Nobel laureates. Nearly all were killed or fled during the Holocaust. The post-war community was rebuilt partly by Soviet Jewish immigrants.');
addInd('israelitische-kultusgemeinde-wien-jewish-community-of-vienna', { name: "Oskar Deutsch", bio: "Oskar Deutsch (Jewish), president of the IKG Wien, leads the Vienna Jewish community and advocates for Jewish interests in Austrian public life." });

addConn('jewish-museum-vienna', [
  { name: "Viennese Jewish heritage", type: "mission", description: "Documents the extraordinary history of Jews in Vienna." },
  { name: "Judenplatz Memorial", type: "second location", description: "Operates a second location at the Judenplatz Holocaust memorial." },
  { name: "World-class collection", type: "holdings", description: "Houses collections spanning centuries of Viennese Jewish cultural life." }
]);
updDesc('jewish-museum-vienna', 'The Jewish Museum Vienna documents the extraordinary history of Jews in Vienna, one of the most culturally significant Jewish communities in history. Operates two locations: the main museum in Palais Eskeles on Dorotheergasse and the Museum Judenplatz with a medieval synagogue excavation and the Judenplatz Holocaust Memorial (designed by Rachel Whiteread). Vienna\'s Jewish legacy includes Freud, Mahler, Herzl, Wittgenstein, and countless other luminaries.');

addConn('mauthausen-memorial', [
  { name: "Nazi concentration camp", type: "historic site", description: "Major Nazi concentration camp in upper Austria, operational 1938-1945." },
  { name: "Over 90,000 victims", type: "death toll", description: "Over 90,000 people were killed at Mauthausen and its sub-camps." },
  { name: "Slave labor", type: "camp purpose", description: "Classified as a 'Grade III' camp - the most brutal, designed to work inmates to death in granite quarries." },
  { name: "Austrian Republic memorial", type: "institutional status", description: "Maintained by the Austrian Republic as a memorial site." }
]);
updDesc('mauthausen-memorial', 'Mauthausen concentration camp in Upper Austria was one of the most brutal Nazi camps, classified as Grade III (the harshest). Operational from 1938 to 1945, over 90,000 people were murdered there including Jews, political prisoners, Soviet POWs, and Roma. The infamous "Stairs of Death" led to the granite quarry where inmates were worked to death. Liberated by US forces in May 1945. Maintained as a memorial site by the Austrian Republic.');

addConn('sigmund-freud-museum-vienna', [
  { name: "Sigmund Freud", type: "subject", description: "Located at Berggasse 19, Freud's home and office for 47 years (1891-1938)." },
  { name: "Psychoanalysis", type: "legacy", description: "Freud (Jewish, 1856-1939) founded psychoanalysis, revolutionizing understanding of the human mind." },
  { name: "Nazi persecution", type: "historic context", description: "Freud fled Vienna after the Nazi Anschluss in 1938 to London, where he died in 1939." }
]);
updDesc('sigmund-freud-museum-vienna', 'The Sigmund Freud Museum is located at Berggasse 19 in Vienna, where Freud (Jewish, 1856-1939) lived and worked for 47 years. Freud founded psychoanalysis, revolutionizing the understanding of the human mind. He fled Vienna after the Nazi Anschluss in March 1938 for London, where he died in 1939. Four of his sisters perished in Nazi concentration camps. The museum preserves his waiting room, study, and personal effects.');

addConn('stadttempel-vienna-city-temple', [
  { name: "Only surviving synagogue from pre-war Vienna", type: "historic significance", description: "The only synagogue in Vienna that survived Kristallnacht intact, as it was hidden within a building complex." },
  { name: "Biedermeier architecture", type: "architectural style", description: "Built in 1826 in elegant neoclassical style by Joseph Kornhäusel." },
  { name: "IKG Wien", type: "institutional connection", description: "The main synagogue of the Vienna Jewish community." }
]);
updDesc('stadttempel-vienna-city-temple', 'The Stadttempel (Vienna City Temple), built in 1826, is the main synagogue of Vienna and the only one to survive Kristallnacht in 1938 - its concealment within a residential building saved it from destruction. Designed by architect Joseph Kornhäusel in elegant neoclassical/Biedermeier style. Vienna\'s approximately 94 other synagogues were destroyed during Kristallnacht. Now under permanent police guard due to security concerns.');

// ============================================================
// NETHERLANDS
// ============================================================

addConn('nik-nederlands-isra-litisch-kerkgenootschap', [
  { name: "Dutch Jewish community", type: "constituency", description: "Orthodox Jewish umbrella organization for the Netherlands (~30,000)." },
  { name: "Chief Rabbinate", type: "religious authority", description: "Oversees the Chief Rabbinate of the Netherlands." },
  { name: "Post-Holocaust recovery", type: "context", description: "Pre-war Dutch Jewry numbered 140,000; 75% were murdered in the Holocaust, the highest percentage in Western Europe." }
]);
updDesc('nik-nederlands-isra-litisch-kerkgenootschap', 'The NIK (Nederlands-Israëlitisch Kerkgenootschap) is the Orthodox Jewish community organization of the Netherlands. Dutch Jewry today numbers about 30,000, a fraction of the pre-war 140,000. Approximately 75% of Dutch Jews were murdered in the Holocaust - the highest percentage in Western Europe - largely due to the efficient civil registration system and flat geography that made hiding difficult.');

addConn('anne-frank-house', [
  { name: "Anne Frank", type: "subject", description: "The hiding place where Anne Frank (Jewish, 1929-1945) wrote her famous diary during the Nazi occupation." },
  { name: "The Diary of Anne Frank", type: "legacy", description: "Anne's diary has been translated into 70+ languages and sold 30+ million copies." },
  { name: "Amsterdam tourism", type: "impact", description: "One of the most visited museums in the Netherlands, with 1.3 million annual visitors." },
  { name: "Holocaust education", type: "global mission", description: "The Anne Frank Foundation uses Anne's story to promote human rights education worldwide." }
]);
updDesc('anne-frank-house', 'The Anne Frank House at Prinsengracht 263 in Amsterdam is the hiding place where Anne Frank (Jewish, 1929-1945, born in Frankfurt) wrote her famous diary while hiding from the Nazis for two years (1942-1944). Betrayed and deported, Anne died in Bergen-Belsen. Her diary, published by her father Otto Frank in 1947, has been translated into 70+ languages and sold over 30 million copies. The museum attracts 1.3+ million visitors annually.');
addInd('anne-frank-house', { name: "Anne Frank", bio: "Anne Frank (Jewish, 1929-1945), born in Frankfurt, fled with her family to Amsterdam. Hid for two years and wrote her famous diary before being discovered. Died in Bergen-Belsen. Her diary became one of the most-read books in history." });

addConn('portuguese-synagogue-of-amsterdam', [
  { name: "Sephardi Jewish heritage", type: "historic community", description: "Built by Portuguese and Spanish Jews who fled the Inquisition to tolerant Amsterdam." },
  { name: "Esnoga", type: "iconic building", description: "The Esnoga, inaugurated in 1675, is one of the most magnificent synagogues ever built." },
  { name: "Baruch Spinoza", type: "famous connection", description: "Philosopher Baruch Spinoza was excommunicated by this community in 1656." },
  { name: "Candlelight services", type: "tradition", description: "Still lit by hundreds of candles rather than electric light for Shabbat." }
]);
updDesc('portuguese-synagogue-of-amsterdam', 'The Portuguese Synagogue of Amsterdam (Esnoga), inaugurated in 1675, is one of the world\'s most magnificent synagogues. Built by Sephardi Jews who fled the Portuguese and Spanish Inquisitions to tolerant Amsterdam. Philosopher Baruch Spinoza was famously excommunicated by this community in 1656. The synagogue remains largely in its original 17th-century state and is still illuminated by hundreds of candles on Shabbat rather than electric light.');

addConn('jewish-historical-museum-amsterdam', [
  { name: "Dutch Jewish history", type: "mission", description: "Comprehensive museum of Jewish life and culture in the Netherlands." },
  { name: "Four historic Ashkenazi synagogues", type: "building", description: "Located in four connected historic Ashkenazi synagogues in Amsterdam's old Jewish quarter." },
  { name: "Portuguese Synagogue", type: "museum campus", description: "Part of the Jewish Cultural Quarter along with the Portuguese Synagogue and other institutions." }
]);
updDesc('jewish-historical-museum-amsterdam', 'The Jewish Historical Museum (Joods Historisch Museum) is located in four interconnected historic Ashkenazi synagogues in Amsterdam\'s former Jewish Quarter. Part of the Jewish Cultural Quarter that also includes the Portuguese Synagogue, the National Holocaust Museum, and the Children\'s Memorial. Documents the rich history of Jewish life in the Netherlands from the arrival of Sephardi Jews in the 16th century through the devastation of the Holocaust to the present.');

addConn('national-holocaust-museum-amsterdam', [
  { name: "Dutch Holocaust history", type: "mission", description: "Documents the persecution of Jews in the Netherlands during WWII." },
  { name: "75% death rate", type: "significance", description: "Tells the story of how 75% of Dutch Jews - 102,000 people - were murdered." },
  { name: "Westerbork transit camp", type: "connection", description: "Connected to the story of Westerbork transit camp, from which Dutch Jews were deported." }
]);
updDesc('national-holocaust-museum-amsterdam', 'The National Holocaust Museum in Amsterdam documents the persecution and murder of Jews in the Netherlands during WWII. Of 140,000 Dutch Jews, approximately 102,000 (75%) were murdered - the highest death rate in Western Europe. The museum, located in the former Hollandsche Schouwburg (Dutch Theatre) which was used as a Jewish assembly point, tells the stories of victims, survivors, and rescuers.');

addConn('westerbork-transit-camp-memorial', [
  { name: "Transit camp to death camps", type: "historic role", description: "Over 100,000 Jews, Roma, and others were deported from Westerbork to Auschwitz, Sobibor, Bergen-Belsen, and Theresienstadt." },
  { name: "Anne Frank connection", type: "notable deportee", description: "Anne Frank and her family were deported from Westerbork to Auschwitz in September 1944." },
  { name: "Radio telescope", type: "current use", description: "The site now also houses the Westerbork Synthesis Radio Telescope, an astronomical observatory." }
]);
updDesc('westerbork-transit-camp-memorial', 'Camp Westerbork in Drenthe province was the main transit camp in the Netherlands from which over 100,000 Jews, Roma, and others were deported to Auschwitz, Sobibor, Bergen-Belsen, and Theresienstadt between 1942 and 1944. Anne Frank and her family were among those deported from Westerbork. Originally built in 1939 as a refugee camp for German Jewish asylum seekers. The site now serves as a memorial and museum.');

// ============================================================
// BELGIUM
// ============================================================

addConn('coordinating-committee-of-jewish-organisations-in-belgium-ccojb', [
  { name: "Belgian Jewish community", type: "constituency", description: "Umbrella organization of Belgian Jewry (~30,000)." },
  { name: "Belgian government", type: "political engagement", description: "Represents Jewish interests to the Belgian federal and regional governments." },
  { name: "Antwerp and Brussels communities", type: "dual centres", description: "Coordinates between the Orthodox-dominated Antwerp and more secular Brussels communities." }
]);
updDesc('coordinating-committee-of-jewish-organisations-in-belgium-ccojb', 'The CCOJB (Comité de Coordination des Organisations Juives de Belgique) is the umbrella organization representing Belgian Jewry (~30,000). Coordinates between Belgium\'s two main Jewish centres: Antwerp (predominantly Orthodox, Hasidic, and traditionally observant) and Brussels (more diverse and secular). Engages with the Belgian government on antisemitism, Holocaust remembrance, and communal affairs.');

addConn('antwerp-diamond-district', [
  { name: "Orthodox Jewish community", type: "community presence", description: "Antwerp's diamond trade has been dominated by the Orthodox and Hasidic Jewish community for centuries." },
  { name: "Global diamond trade", type: "market position", description: "Antwerp processes approximately 80% of the world's rough diamonds." },
  { name: "Hasidic community", type: "dominant group", description: "The diamond district is centred in the Hasidic Jewish quarter near the Central Station." },
  { name: "Indian competition", type: "market shift", description: "Facing increasing competition from India's diamond cutting industry." }
]);
updDesc('antwerp-diamond-district', 'Antwerp\'s Diamond District processes approximately 80% of the world\'s rough diamonds. The trade has been dominated by the Orthodox and Hasidic Jewish community for centuries. Located around the Hoveniersstraat near Antwerp Central Station, the district is the heart of one of Europe\'s largest Orthodox Jewish communities. Jewish diamond traders have operated here since the 15th century, making it one of the most enduring Jewish economic niches in the world.');

addConn('jewish-museum-of-belgium-brussels', [
  { name: "Belgian Jewish heritage", type: "mission", description: "Documenting Jewish life and culture in Belgium." },
  { name: "2014 terrorist attack", type: "tragic event", description: "On May 24, 2014, a gunman killed four people inside the museum in a terrorist attack." },
  { name: "Belgian Jewish history", type: "collection", description: "Houses collections on Jewish life in Belgium from the Middle Ages to the present." }
]);
updDesc('jewish-museum-of-belgium-brussels', 'The Jewish Museum of Belgium in Brussels documents Jewish life in Belgium. Tragically, on May 24, 2014, a French-Algerian ISIS-affiliated gunman killed four people inside the museum in a terrorist attack - the first deadly attack on a European Jewish institution since the 1980s. The museum houses collections spanning Belgian Jewish history from the medieval period to the present and continues to serve as a centre for education and remembrance.');

addConn('kazerne-dossin-memorial-mechelen', [
  { name: "Belgian Holocaust deportation", type: "historic role", description: "Dossin Barracks in Mechelen served as the transit camp from which 25,000+ Belgian Jews and Roma were deported to Auschwitz." },
  { name: "Belgian government memorial", type: "institutional status", description: "Maintained by the Flemish government as a memorial, museum, and documentation centre." },
  { name: "Belgian complicity", type: "historical context", description: "Documents the role of Belgian authorities in the deportation of Jews." }
]);
updDesc('kazerne-dossin-memorial-mechelen', 'Kazerne Dossin in Mechelen (Malines) is Belgium\'s national memorial to the 25,000+ Jews and Roma deported from Belgium to Auschwitz between 1942 and 1944. The Dossin Barracks served as the transit camp. The modern museum and documentation centre, opened in 2012, examines not only the deportations but also the broader themes of collaboration, resistance, and mass violence. Addresses Belgian governmental complicity in the persecution.');

addConn('antwerp-jewish-community', [
  { name: "Hasidic community", type: "character", description: "One of Europe's largest and most visible Hasidic and Orthodox Jewish communities." },
  { name: "Diamond trade", type: "economic base", description: "Historically centred around the diamond industry." },
  { name: "Jewish schools and institutions", type: "infrastructure", description: "Supports an extensive network of Jewish schools, synagogues, and welfare organizations." },
  { name: "Satmar, Belz, Lubavitch", type: "Hasidic groups", description: "Home to multiple Hasidic groups including Satmar, Belz, and Lubavitch." }
]);
updDesc('antwerp-jewish-community', 'Antwerp is home to one of Europe\'s largest and most visibly Orthodox and Hasidic Jewish communities (~15,000-20,000). The community is centred around the diamond district near the Central Station. Home to multiple Hasidic groups including Satmar, Belz, and Lubavitch, as well as non-Hasidic Orthodox Jews. Supports an extensive network of Jewish schools (cheders, yeshivot), synagogues, mikvaot, and welfare organizations.');

// ============================================================
// SWITZERLAND
// ============================================================

addConn('swiss-federation-of-jewish-communities-sig-fsci', [
  { name: "Swiss Jewish community", type: "constituency", description: "Umbrella of Swiss Jewry (~18,000), concentrated in Zurich, Geneva, and Basel." },
  { name: "Swiss government", type: "political engagement", description: "Engages with the Swiss federal government on Jewish community matters." },
  { name: "Swiss bank Holocaust assets controversy", type: "historic issue", description: "Played a role in the controversy over dormant Swiss bank accounts of Holocaust victims." },
  { name: "Neutrality and complicity", type: "complex history", description: "Swiss Jewish history involves the complex legacy of Switzerland's wartime neutrality and its treatment of Jewish refugees." }
]);
updDesc('swiss-federation-of-jewish-communities-sig-fsci', 'The SIG/FSCI (Schweizerischer Israelitischer Gemeindebund / Fédération Suisse des Communautés Israélites) represents Swiss Jewry (~18,000), concentrated in Zurich, Geneva, and Basel. Played a significant role in the Swiss bank Holocaust assets controversy of the 1990s, which led to a $1.25 billion settlement. Swiss Jewish history includes the complex legacy of wartime neutrality, where Switzerland turned away Jewish refugees while sheltering others.');

addConn('world-jewish-congress-headquarters', [
  { name: "Global Jewish representation", type: "mission", description: "International federation representing Jewish communities in 100+ countries." },
  { name: "Ronald Lauder", type: "president", description: "Led since 2007 by Ronald Lauder (Jewish), billionaire heir to Estée Lauder." },
  { name: "Geneva and New York", type: "offices", description: "Maintains offices in Geneva and New York." },
  { name: "Holocaust restitution", type: "major achievement", description: "Under Edgar Bronfman's leadership, achieved major Holocaust restitution agreements." }
]);
updDesc('world-jewish-congress-headquarters', 'The World Jewish Congress (WJC), headquartered in New York with offices in Geneva, is the international federation of Jewish communities representing Jews in 100+ countries. Founded in 1936, it played a crucial role in Holocaust restitution under President Edgar Bronfman Sr. Since 2007, led by Ronald Lauder (Jewish, billionaire heir to Estée Lauder Companies). The WJC has permanent observer status at the United Nations.');

addConn('world-health-organization-israeli-connections', [
  { name: "Israeli medical innovation", type: "connection", description: "Israel contributes significantly to global health innovation." },
  { name: "WHO Geneva", type: "institutional base", description: "WHO is headquartered in Geneva, a city with significant Jewish community presence." },
  { name: "Global health", type: "field", description: "Israeli researchers and institutions contribute to WHO's global health initiatives." }
]);

addConn('b-nai-b-rith-international-geneva-office', [
  { name: "B'nai B'rith International", type: "parent organization", description: "Geneva office of B'nai B'rith, the world's oldest Jewish service organization (founded 1843)." },
  { name: "United Nations", type: "diplomatic engagement", description: "B'nai B'rith has observer status at the UN and engages with UN agencies in Geneva." },
  { name: "Human rights advocacy", type: "mission", description: "Advocates for Jewish rights and against antisemitism in international forums." }
]);
updDesc('b-nai-b-rith-international-geneva-office', 'B\'nai B\'rith International\'s Geneva office represents the world\'s oldest Jewish service organization (founded 1843 in New York) at the United Nations and other international organizations headquartered in Geneva. Advocates for Jewish rights, combats antisemitism, and engages in humanitarian and human rights work. B\'nai B\'rith has special consultative status at the United Nations.');

addConn('bergier-commission-legacy', [
  { name: "Swiss bank Holocaust assets", type: "core subject", description: "The Bergier Commission (1996-2002) investigated Switzerland's wartime role and treatment of Holocaust victims' assets." },
  { name: "Swiss government", type: "appointment", description: "Appointed by the Swiss government under international pressure." },
  { name: "$1.25 billion settlement", type: "outcome", description: "Led to a $1.25 billion settlement between Swiss banks and Holocaust survivors." }
]);
updDesc('bergier-commission-legacy', 'The Bergier Commission (Independent Commission of Experts: Switzerland - Second World War, 1996-2002) investigated Switzerland\'s wartime conduct, including trade with Nazi Germany, acceptance/rejection of Jewish refugees, and dormant bank accounts of Holocaust victims. Found that Switzerland turned away approximately 25,000 refugees. Led to the landmark $1.25 billion settlement between Swiss banks (UBS, Credit Suisse) and Holocaust survivors.');

addConn('international-committee-of-the-red-cross-jewish-relationship', [
  { name: "ICRC", type: "institution", description: "The ICRC, headquartered in Geneva, had a complex and often criticized relationship with Jewish victims during WWII." },
  { name: "Wartime failure", type: "criticism", description: "The ICRC was criticized for failing to publicly denounce the Holocaust or effectively intervene." },
  { name: "Theresienstadt visit", type: "controversial episode", description: "The Red Cross's 1944 visit to Theresienstadt, where the Nazis staged a 'model camp,' is particularly controversial." }
]);
updDesc('international-committee-of-the-red-cross-jewish-relationship', 'The ICRC\'s relationship with Jewish victims during WWII remains deeply controversial. The Red Cross was criticized for failing to publicly denounce the Holocaust or effectively protect Jews. Its 1944 visit to Theresienstadt, where the Nazis staged a Potemkin-village "model camp," resulted in a positive report that unwittingly aided Nazi propaganda. The ICRC later acknowledged its failures and opened its WWII archives for research.');

// ============================================================
// ITALY
// ============================================================

addConn('union-of-italian-jewish-communities-ucei', [
  { name: "Italian Jewish community", type: "constituency", description: "Represents Italian Jewry (~25,000), one of the oldest Jewish communities in the world." },
  { name: "Italian government", type: "concordat", description: "Has a concordat (Intesa) with the Italian state governing Jewish community affairs." },
  { name: "2,000+ year history", type: "heritage", description: "Jews have lived in Italy continuously for over 2,000 years, since the Roman Empire." }
]);
updDesc('union-of-italian-jewish-communities-ucei', 'UCEI (Unione delle Comunità Ebraiche Italiane) represents Italian Jewry (~25,000), one of the oldest Jewish communities in the world - Jews have lived in Italy continuously for over 2,000 years, since the Roman Republic era. Has a concordat (Intesa) with the Italian state. Italian Jews suffered under Mussolini\'s 1938 racial laws and subsequent Nazi deportations. The community spans from Rome (the oldest in Europe) to Milan, Turin, Florence, and Venice.');

addConn('jewish-museum-of-rome', [
  { name: "Rome Jewish community", type: "community", description: "Documents the history of Europe's oldest Jewish community, dating to 161 BCE." },
  { name: "Great Synagogue of Rome", type: "location", description: "Located in the Great Synagogue complex in Rome's former Jewish Ghetto." },
  { name: "Roman Jewish heritage", type: "collection", description: "Houses artifacts spanning over 2,000 years of Jewish life in Rome." }
]);
updDesc('jewish-museum-of-rome', 'The Jewish Museum of Rome documents the oldest Jewish community in Europe, dating to 161 BCE when Judean ambassadors first arrived in Rome. Located in the Great Synagogue complex in Rome\'s former Ghetto - the neighbourhood where Jews were confined from 1555 to 1870. Houses artifacts spanning over 2,000 years including ritual objects, textiles, and historical documents.');

addConn('great-synagogue-of-rome', [
  { name: "Rome Jewish community", type: "congregation", description: "The main synagogue of Europe's oldest Jewish community." },
  { name: "Tempio Maggiore", type: "formal name", description: "Known as the Tempio Maggiore, built in 1904 in an eclectic Assyrian-Babylonian style." },
  { name: "Pope John Paul II visit", type: "historic event", description: "Pope John Paul II made a historic visit in 1986 - the first pope to enter a synagogue since antiquity." },
  { name: "1982 terrorist attack", type: "tragic event", description: "In 1982, Palestinian terrorists attacked the synagogue, killing a 2-year-old boy." }
]);
updDesc('great-synagogue-of-rome', 'The Great Synagogue of Rome (Tempio Maggiore), built in 1904 in eclectic Assyrian-Babylonian style, serves Europe\'s oldest Jewish community. Pope John Paul II made a historic visit in 1986 - the first pope to enter a synagogue since antiquity. In 1982, Palestinian terrorists attacked the synagogue, killing 2-year-old Stefano Gaj Taché and injuring 37. The synagogue\'s distinctive square dome dominates the Tiber riverbank skyline.');

addConn('venice-ghetto', [
  { name: "Origin of the word 'ghetto'", type: "linguistic origin", description: "The Venice Ghetto, established in 1516, is where the word 'ghetto' originates (from the Venetian word for 'foundry')." },
  { name: "First Jewish ghetto in history", type: "historic significance", description: "The first systematically designated Jewish quarter in European history." },
  { name: "Five synagogues", type: "religious infrastructure", description: "Contains five historic synagogues (scuole) serving different Jewish communities." },
  { name: "UNESCO heritage interest", type: "preservation", description: "Major heritage preservation site of global significance." }
]);
updDesc('venice-ghetto', 'The Venice Ghetto, established in 1516 by the Venetian Republic, is the world\'s first Jewish ghetto - the very word "ghetto" originates here, from the Venetian word for "foundry" (getto) as the area had been an iron foundry. Jews were confined here until Napoleon\'s liberation in 1797. Contains five historic synagogues (Schola Grande Tedesca, Canton, Italiana, Levantina, Spagnola) serving Ashkenazi, Italian, and Sephardi communities. High-rise buildings due to space constraints.');

addConn('synagogue-of-florence-tempio-maggiore', [
  { name: "Florence Jewish community", type: "congregation", description: "The main synagogue of Florence, one of the finest in Europe." },
  { name: "Moorish Revival architecture", type: "architectural style", description: "Built in 1882 in striking Moorish Revival style with a distinctive green copper dome." },
  { name: "Florentine heritage", type: "cultural context", description: "Part of Florence's extraordinary cultural heritage." }
]);
updDesc('synagogue-of-florence-tempio-maggiore', 'The Synagogue of Florence (Tempio Maggiore), built in 1882, is one of the most beautiful synagogues in Europe. Its striking Moorish Revival architecture with a distinctive green copper dome dominates the neighborhood of San Marco. Built after the Emancipation brought Jews equal rights in unified Italy. Houses a Jewish museum and remains an active prayer house for Florence\'s small but historic Jewish community.');

addConn('jewish-museum-of-bologna', [
  { name: "Emilia-Romagna Jewish heritage", type: "region", description: "Documents Jewish life in Bologna and the Emilia-Romagna region." },
  { name: "Italian Jewish heritage network", type: "museum network", description: "Part of a network of Jewish museums across Italy." },
  { name: "University of Bologna", type: "academic context", description: "Jewish scholars contributed to the University of Bologna, one of the world's oldest universities." }
]);
updDesc('jewish-museum-of-bologna', 'The Jewish Museum of Bologna (Museo Ebraico di Bologna) documents the history of Jewish life in Bologna and the Emilia-Romagna region of Italy. Jewish scholars contributed to the University of Bologna, one of the world\'s oldest universities (founded 1088). The museum explores the complex history of tolerance and persecution, including Bologna\'s own ghetto and the impact of WWII.');

addConn('community-of-sant-egidio-jewish-dialogue', [
  { name: "Catholic-Jewish dialogue", type: "interfaith", description: "The Community of Sant'Egidio has been a key partner in Catholic-Jewish interfaith dialogue." },
  { name: "Vatican relations", type: "institutional role", description: "Facilitates the improved Catholic-Jewish relationship since Vatican II." },
  { name: "Peace initiatives", type: "broader mission", description: "Known for peace and reconciliation work worldwide." }
]);
updDesc('community-of-sant-egidio-jewish-dialogue', 'The Community of Sant\'Egidio, a Catholic lay community founded in Rome in 1968, has been a key facilitator of Catholic-Jewish dialogue. Building on the legacy of Vatican II\'s Nostra Aetate declaration (1965), Sant\'Egidio has organized major interfaith encounters and peace initiatives. Its work represents the dramatic transformation of Catholic-Jewish relations from centuries of hostility to contemporary partnership.');

// ============================================================
// SPAIN & PORTUGAL  
// ============================================================

addConn('federation-of-jewish-communities-of-spain', [
  { name: "Spanish Jewish community", type: "constituency", description: "Represents Spain's small but growing Jewish community (~40,000-50,000)." },
  { name: "Sephardi heritage", type: "historic connection", description: "Spain was the heartland of Sephardi Jewish civilization until the 1492 Expulsion." },
  { name: "Spanish citizenship law", type: "legal milestone", description: "Spain passed a law in 2015 offering citizenship to descendants of expelled Sephardi Jews." }
]);
updDesc('federation-of-jewish-communities-of-spain', 'The Federation of Jewish Communities of Spain represents Spain\'s Jewish community (~40,000-50,000). Spain was the heartland of Sephardi Jewish civilization - the Golden Age of Spanish Jewry produced Maimonides, Judah Halevi, and Ibn Ezra. The 1492 Alhambra Decree expelled all Jews, ending 1,500 years of presence. In 2015, Spain passed a law offering citizenship to descendants of expelled Sephardi Jews, an act of historical recognition.');

addConn('museum-of-sephardic-heritage-toledo', [
  { name: "Sephardi Jewish civilization", type: "subject", description: "Documents the extraordinary Golden Age of Jews in medieval Spain." },
  { name: "El Tránsito Synagogue", type: "building", description: "Housed in the 14th-century El Tránsito Synagogue, a masterpiece of Mudéjar architecture." },
  { name: "1492 Expulsion", type: "historic context", description: "Tells the story leading to the 1492 expulsion of Jews from Spain." }
]);
updDesc('museum-of-sephardic-heritage-toledo', 'The Sephardic Museum in Toledo is housed in the El Tránsito Synagogue, a masterpiece of 14th-century Mudéjar architecture built by Samuel ha-Levi Abulafia, treasurer to King Peter I of Castile. Documents the extraordinary Golden Age of Sephardi Jewish civilization in medieval Spain, when Jews excelled in philosophy, medicine, poetry, and science. Tells the story of the 1492 Alhambra Decree that expelled all Jews from Spain, scattering the Sephardi diaspora worldwide.');

addConn('c-rdoba-synagogue', [
  { name: "Maimonides connection", type: "heritage", description: "Córdoba was the birthplace of Maimonides (1138), the greatest Jewish philosopher and legal authority." },
  { name: "Medieval Sephardi heritage", type: "historic period", description: "One of only three medieval synagogues surviving in Spain." },
  { name: "Mudéjar architecture", type: "architectural style", description: "Built in 1315 in Mudéjar style, reflecting the blending of Islamic and Jewish cultures." }
]);
updDesc('c-rdoba-synagogue', 'The Córdoba Synagogue, built in 1315, is one of only three medieval synagogues surviving in Spain. Located in the old Jewish quarter (Judería) of Córdoba, the birthplace of Maimonides (Moses ben Maimon, 1138-1204), the greatest Jewish philosopher, physician, and legal authority of the Middle Ages. The synagogue\'s Mudéjar (Islamic-influenced) architecture reflects the cultural blending that characterized the Convivencia period.');

addConn('casa-sefarad-israel-madrid', [
  { name: "Spain-Israel relations", type: "diplomatic bridge", description: "Cultural centre promoting Spanish-Israeli relations and Sephardi heritage." },
  { name: "Sephardi diaspora", type: "cultural connection", description: "Connects today's Sephardi communities worldwide with their Iberian roots." },
  { name: "Cultural programming", type: "activities", description: "Hosts exhibitions, lectures, and cultural events on Sephardi heritage." }
]);
updDesc('casa-sefarad-israel-madrid', 'Casa Sefarad-Israel in Madrid is a cultural centre promoting the relationship between Spain, the Sephardi diaspora, and Israel. Hosts exhibitions, lectures, and cultural events exploring Sephardi heritage and the historic Jewish presence in Spain. Serves as a bridge between Spain and the global Sephardi communities who trace their roots to the Iberian Peninsula, from Istanbul to Thessaloniki to Latin America.');

addConn('jewish-community-of-lisbon', [
  { name: "Portuguese Inquisition legacy", type: "historic context", description: "Portuguese Jewish history is dominated by the forced conversion and Inquisition beginning in 1497." },
  { name: "Crypto-Jews (Marranos)", type: "historic community", description: "Many Portuguese Jews became crypto-Jews (Marranos) who secretly maintained Jewish practices." },
  { name: "Portuguese citizenship law", type: "legal milestone", description: "Portugal passed a law in 2015 offering citizenship to Sephardi Jewish descendants." }
]);
updDesc('jewish-community-of-lisbon', 'The Jewish Community of Lisbon represents Portugal\'s small Jewish population. Portuguese Jewish history is marked by the 1497 forced conversion decree and the brutal Portuguese Inquisition that lasted until 1821. Many Jews became crypto-Jews (Marranos/B\'nei Anusim), secretly maintaining Jewish practices for centuries. In 2015, Portugal passed a law offering citizenship to descendants of Sephardi Jews expelled during the Inquisition.');

addConn('sinagoga-kadoorie-mekor-haim-porto', [
  { name: "Kadoorie family", type: "benefactor", description: "Built with support from the Kadoorie family (Sephardi Jews from Baghdad, based in Hong Kong)." },
  { name: "Revival of Portuguese Jewish life", type: "significance", description: "Symbolizes the revival of Jewish life in Portugal after centuries of Inquisition and suppression." },
  { name: "Largest synagogue in Iberia", type: "distinction", description: "The largest synagogue on the Iberian Peninsula." }
]);
updDesc('sinagoga-kadoorie-mekor-haim-porto', 'The Sinagoga Kadoorie Mekor Haim in Porto is the largest synagogue on the Iberian Peninsula, completed in 1938 with support from the Kadoorie family (Sephardi Jews of Baghdadi origin, based in Hong Kong). It symbolizes the revival of Jewish life in Portugal after centuries of Inquisition and suppression. Porto has experienced a remarkable Jewish revival, particularly after the 2015 citizenship law for Sephardi descendants.');

addConn('museu-judaico-de-belmonte', [
  { name: "Crypto-Jewish community", type: "community", description: "Documents the extraordinary story of the Belmonte crypto-Jews who secretly maintained Judaism for 500 years." },
  { name: "Samuel Schwarz", type: "discoverer", description: "Mining engineer Samuel Schwarz (Jewish, Polish) rediscovered the crypto-Jewish community in 1917." },
  { name: "Return to Judaism", type: "modern revival", description: "The Belmonte community officially returned to Judaism in the 1990s." }
]);
updDesc('museu-judaico-de-belmonte', 'The Museu Judaico de Belmonte tells the extraordinary story of the Belmonte crypto-Jews, who secretly maintained Jewish practices for over 500 years after the Portuguese Inquisition. Polish-Jewish mining engineer Samuel Schwarz rediscovered the community in 1917, finding women who still lit Shabbat candles in hiding. The community officially returned to Judaism in the 1990s. One of the most remarkable stories of Jewish survival in history.');

// ============================================================
// SAVE
// ============================================================

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0; for(const c in data.countries) for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;}
console.log(`Done! ${tc} entries, ${wc} with connections, ${Object.keys(people.people).length} people.`);
let connTotal=0; for(const c in data.countries) for(const e of data.countries[c]) connTotal+=(e.connections||[]).length;
console.log(`Total connections: ${connTotal}`);
