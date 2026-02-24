// addConnections12.js - Poland, Czech Republic, Ukraine, Turkey, Morocco, Israel leftovers, Scandinavia, Greece
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
  const pid = slugify(person.name);
  if (!e.individuals) e.individuals = [];
  if (!e.individuals.find(i => i.id === pid)) {
    person.id = pid; e.individuals.push(person);
    if (!people.people[pid]) people.people[pid] = { name: person.name, bio: person.bio || '', notes: '' };
  }
}

// ============================================================
// POLAND
// ============================================================

addConn('union-of-jewish-communities-in-poland', [
  { name: "Polish government", type: "institutional", description: "Official representative body of Polish Jews recognized by the Polish state." },
  { name: "World Jewish Congress", type: "affiliate", description: "Affiliated with the World Jewish Congress as Poland's representative body." },
  { name: "POLIN Museum", type: "partner", description: "Works closely with POLIN Museum on cultural preservation and community events." },
  { name: "European Jewish Congress", type: "member", description: "Member organization of the European Jewish Congress." }
]);
updDesc('union-of-jewish-communities-in-poland', 'The official representative body of Jewish communities in Poland, recognized by the Polish state. Oversees Jewish religious life, community affairs, and property restitution claims. Works closely with POLIN Museum and international Jewish organizations. Poland had 3.3 million Jews before WWII , the largest Jewish community in Europe. Today approximately 10,000-20,000 Jews live in Poland.');
addInd('union-of-jewish-communities-in-poland', { name: "Klara Kołodziejska-Degórska", bio: "Chief Rabbi of Poland (Progressive), one of the first female rabbis in Polish history.", role: "Chief Rabbi" });

addConn('polin-museum-of-the-history-of-polish-jews', [
  { name: "Polish Ministry of Culture", type: "co-founder", description: "Co-founded by the Polish government and the Association of the Jewish Historical Institute." },
  { name: "City of Warsaw", type: "co-founder", description: "The City of Warsaw is a co-founder and ongoing supporter." },
  { name: "Yad Vashem", type: "partner", description: "Partners with Yad Vashem for research and exhibition collaboration." },
  { name: "US Holocaust Memorial Museum", type: "partner", description: "Collaborates with USHMM on educational programs." },
  { name: "Barbara Kirshenblatt-Gimblett", type: "curator", description: "Professor Barbara Kirshenblatt-Gimblett designed the core exhibition." }
]);
updDesc('polin-museum-of-the-history-of-polish-jews', 'Opened in 2013 on the site of the former Warsaw Ghetto. The core exhibition, designed by Barbara Kirshenblatt-Gimblett, tells the 1,000-year history of Polish Jews. Won the European Museum of the Year Award in 2016. Co-founded by the Polish government, the City of Warsaw, and the Association of the Jewish Historical Institute. Located at Anielewicza 6, facing the Monument to the Ghetto Heroes.');
addInd('polin-museum-of-the-history-of-polish-jews', { name: "Barbara Kirshenblatt-Gimblett", bio: "Professor at NYU who designed POLIN Museum's core exhibition on 1,000 years of Polish Jewish history.", role: "Chief Curator" });

addConn('auschwitz-birkenau-memorial-and-museum', [
  { name: "UNESCO World Heritage", type: "designation", description: "Designated a UNESCO World Heritage Site in 1979." },
  { name: "Polish Ministry of Culture", type: "government oversight", description: "Operates under the Polish Ministry of Culture and National Heritage." },
  { name: "International Auschwitz Council", type: "advisory", description: "Advised by the International Auschwitz Committee founded by camp survivors." },
  { name: "Yad Vashem", type: "partner", description: "Works with Yad Vashem on documentation and memorialization of 1.1 million victims." },
  { name: "March of the Living", type: "annual event", description: "Annual March of the Living brings thousands of young people to walk from Auschwitz to Birkenau." }
]);
updDesc('auschwitz-birkenau-memorial-and-museum', 'The largest Nazi concentration and extermination camp, where approximately 1.1 million people were murdered, including 1 million Jews. Located near Oświęcim, Poland. UNESCO World Heritage Site since 1979. Over 2 million visitors annually. The camp was liberated by the Soviet Red Army on January 27, 1945 , now commemorated as International Holocaust Remembrance Day. Preserves original barracks, gas chambers, and personal effects of victims.');
addInd('auschwitz-birkenau-memorial-and-museum', { name: "Piotr Cywiński", bio: "Director of the Auschwitz-Birkenau Memorial and Museum since 2006. Oversees preservation and education programs.", role: "Director" });

addConn('jewish-community-centre-of-krakow-jcc-krak-w', [
  { name: "JDC (American Jewish Joint Distribution Committee)", type: "supporter", description: "JDC helped establish and fund the JCC Kraków." },
  { name: "Galicia Jewish Museum", type: "partner", description: "Works with the nearby Galicia Jewish Museum on cultural events." },
  { name: "Krakow Festival of Jewish Culture", type: "event organizer", description: "Participates in organizing the annual Jewish Culture Festival, one of the largest in Europe." },
  { name: "World Union of Jewish Students", type: "network", description: "Connected to international Jewish student and young professional networks." }
]);
updDesc('jewish-community-centre-of-krakow-jcc-krak-w', 'Located in the Kazimierz district, the historic Jewish quarter of Kraków. Serves as the hub of Jewish life in southern Poland, offering educational programs, holiday celebrations, and cultural events. The Kraków Jewish Culture Festival, held annually since 1988, is one of the largest in the world. Kazimierz was the setting for scenes in Schindler\'s List (1993).');
addInd('jewish-community-centre-of-krakow-jcc-krak-w', { name: "Jonathan Ornstein", bio: "American-born executive director of the JCC Kraków since 2008, credited with revitalizing Jewish life in the city.", role: "Executive Director" });

addConn('galicia-jewish-museum-krakow', [
  { name: "Chris Schwarz", type: "founder", description: "Founded in 2004 by British-born photographer Chris Schwarz (d. 2007)." },
  { name: "Kazimierz district", type: "location", description: "Located in Kraków's historic Kazimierz Jewish quarter." },
  { name: "POLIN Museum", type: "partner", description: "Collaborates with POLIN Museum Warsaw on exhibitions and programming." },
  { name: "Traces of Memory exhibition", type: "core exhibition", description: "Features 'Traces of Memory' photo exhibition documenting Jewish heritage sites across Galicia." }
]);
updDesc('galicia-jewish-museum-krakow', 'Founded in 2004 by photographer Chris Schwarz in Kraków\'s Kazimierz district. The museum\'s core exhibition, \'Traces of Memory,\' documents the remnants of Jewish civilization in the former Austrian region of Galicia through photographs. Hosts rotating exhibitions, lectures, and educational programs. Located in a restored Jewish-owned factory. Schwarz passed away in 2007 but his vision continues.');

addConn('museum-of-the-history-of-polish-jews-polin-additional-programs', [
  { name: "POLIN Museum", type: "parent institution", description: "Extension programs of the POLIN Museum of the History of Polish Jews." },
  { name: "Polish schools", type: "outreach", description: "Runs educational outreach programs reaching hundreds of Polish schools." },
  { name: "Genealogy projects", type: "research", description: "Supports genealogical research for descendants of Polish Jews worldwide." }
]);
updDesc('museum-of-the-history-of-polish-jews-polin-additional-programs', 'Additional educational and outreach programs of the POLIN Museum, including traveling exhibitions, teacher training programs, genealogical research support, and digital humanities projects documenting Polish-Jewish heritage. Reaches hundreds of schools across Poland and collaborates with diaspora communities worldwide.');

addConn('majdanek-state-museum', [
  { name: "Polish government", type: "government", description: "Operates as a state museum under the Polish Ministry of Culture." },
  { name: "Yad Vashem", type: "partner", description: "Collaborates with Yad Vashem on Holocaust documentation." },
  { name: "Lublin Jewish community", type: "historical", description: "Majdanek was built on the outskirts of Lublin, once a major center of Jewish learning." },
  { name: "International Holocaust Remembrance Alliance", type: "network", description: "Part of the IHRA network of Holocaust memorial sites." }
]);
updDesc('majdanek-state-museum', 'Nazi German concentration and extermination camp on the outskirts of Lublin. Approximately 78,000 people were murdered here, including 59,000 Jews. One of the best-preserved camps because it was captured nearly intact by the Red Army in July 1944. The first major concentration camp to be liberated. Features original gas chambers, crematorium, and a massive dome-shaped mausoleum containing victims\' ashes.');

addConn('treblinka-memorial', [
  { name: "Treblinka extermination camp", type: "historical site", description: "Memorial at the site of Treblinka II extermination camp where approximately 900,000 people were murdered." },
  { name: "Warsaw Ghetto", type: "historical connection", description: "Most victims were Jews deported from the Warsaw Ghetto during the Grossaktion of 1942." },
  { name: "Yad Vashem", type: "documentation", description: "Yad Vashem maintains extensive documentation of Treblinka victims." },
  { name: "17,000 stones memorial", type: "monument", description: "The memorial features 17,000 stones representing destroyed Jewish communities." }
]);
updDesc('treblinka-memorial', 'Memorial at the site of Treblinka II extermination camp, where approximately 900,000 people , mostly Jews , were murdered between July 1942 and October 1943. The Nazis demolished the camp to hide evidence. The memorial, designed by Adam Haupt and Franciszek Duszenko, features 17,000 rough granite stones representing the destroyed Jewish communities of Poland and Europe. A monument marks the location of the gas chambers.');

addConn('warsaw-ghetto-memorial', [
  { name: "Warsaw Ghetto Uprising 1943", type: "historical event", description: "Commemorates the Warsaw Ghetto Uprising of April-May 1943, the largest Jewish armed resistance during the Holocaust." },
  { name: "Mordechai Anielewicz", type: "historical figure", description: "The uprising was led by Mordechai Anielewicz, commander of the Jewish Combat Organization (ŻOB)." },
  { name: "POLIN Museum", type: "adjacent", description: "POLIN Museum was built facing the Monument to the Ghetto Heroes." },
  { name: "Willy Brandt's Kniefall", type: "historic moment", description: "West German Chancellor Willy Brandt knelt before the memorial in 1970 in a historic gesture of atonement." }
]);
updDesc('warsaw-ghetto-memorial', 'The Monument to the Ghetto Heroes, unveiled in 1948, commemorates the Warsaw Ghetto Uprising of April-May 1943 , the largest single revolt by Jews during WWII. Led by 24-year-old Mordechai Anielewicz and the Jewish Combat Organization (ŻOB), approximately 750 fighters held off German forces for nearly a month. In 1970, West German Chancellor Willy Brandt knelt before the memorial in a historic gesture of reconciliation. The POLIN Museum was built facing this monument.');

addConn('tykocin-synagogue', [
  { name: "17th century heritage", type: "historical", description: "Built in 1642, one of the best-preserved Baroque synagogues in Europe." },
  { name: "Tykocin massacre", type: "historical event", description: "In August 1941, nearly 2,000 Jews from Tykocin were murdered in the nearby Łopuchowo forest by Nazi Einsatzgruppen." },
  { name: "Jewish museum", type: "current use", description: "Now serves as the Tykocin Synagogue Museum, a branch of the Podlaskie Museum." }
]);
updDesc('tykocin-synagogue', 'Built in 1642, the Great Synagogue of Tykocin is one of the best-preserved Baroque synagogues in Europe. The town had a thriving Jewish community from the 16th century. In August 1941, nearly 2,000 Jews from Tykocin were murdered in the Łopuchowo forest by Nazi Einsatzgruppen. The synagogue now serves as a museum with restored original frescoes and Judaica collection.');

// ============================================================
// CZECH REPUBLIC
// ============================================================

addConn('federation-of-jewish-communities-in-the-czech-republic', [
  { name: "Czech government", type: "official recognition", description: "Officially recognized by the Czech Republic as the representative body of Czech Jews." },
  { name: "European Jewish Congress", type: "affiliate", description: "Member of the European Jewish Congress." },
  { name: "World Jewish Congress", type: "affiliate", description: "Affiliated with the World Jewish Congress." },
  { name: "Joint Distribution Committee", type: "partner", description: "JDC has supported Czech Jewish revival since 1989." }
]);
updDesc('federation-of-jewish-communities-in-the-czech-republic', 'Umbrella organization representing 10 Jewish communities across the Czech Republic. Re-established after the Velvet Revolution of 1989. The Czech Jewish community was devastated during the Holocaust , of approximately 118,000 Jews in the Bohemian lands before WWII, only about 14,000 survived. Today approximately 3,000-4,000 Jews live in the Czech Republic. The federation oversees religious life, cultural events, and property restitution.');
addInd('federation-of-jewish-communities-in-the-czech-republic', { name: "Petr Papoušek", bio: "President of the Federation of Jewish Communities in the Czech Republic, leading community development and interfaith dialogue.", role: "President" });

addConn('jewish-museum-in-prague', [
  { name: "Czech Ministry of Culture", type: "government", description: "One of the most-visited museums in the Czech Republic, supported by the Ministry of Culture." },
  { name: "Nazi documentation", type: "historical origin", description: "Ironically, the Nazis expanded the collection, intending to create a 'Museum of an Extinct Race.'" },
  { name: "Six historic sites", type: "complex", description: "Manages six historic sites including Old Jewish Cemetery, Spanish Synagogue, Pinkas Synagogue, Maisel Synagogue, Klausen Synagogue, and Ceremonial Hall." },
  { name: "World's largest Judaica collection", type: "holdings", description: "Houses one of the world's largest collections of Judaica with 40,000 objects and 100,000 books." }
]);
updDesc('jewish-museum-in-prague', 'One of the oldest and largest Jewish museums in the world, founded in 1906. Ironically expanded during WWII when the Nazis intended to create a "Museum of an Extinct Race." Manages six historic sites in Prague\'s Josefov quarter including the Old Jewish Cemetery, Pinkas Synagogue, Spanish Synagogue, Maisel Synagogue, Klausen Synagogue, and Ceremonial Hall. Houses 40,000 objects and 100,000 books , one of the world\'s largest Judaica collections. Receives over 600,000 visitors annually.');

addConn('old-jewish-cemetery-prague', [
  { name: "Jewish Museum in Prague", type: "administered by", description: "Managed by the Jewish Museum in Prague." },
  { name: "Rabbi Judah Loew ben Bezalel (Maharal)", type: "notable burial", description: "Burial place of the Maharal of Prague (d. 1609), famous for the Golem legend." },
  { name: "UNESCO tentative list", type: "heritage", description: "Part of Prague's Josefov quarter, on the UNESCO tentative list." },
  { name: "12,000 tombstones", type: "feature", description: "Contains approximately 12,000 visible tombstones with up to 100,000 burials layered beneath." }
]);
updDesc('old-jewish-cemetery-prague', 'Used from the 15th century to 1787, one of the most remarkable Jewish burial grounds in Europe. Contains approximately 12,000 visible tombstones packed closely together, with estimates of up to 100,000 burials in multiple layers. Notable burials include Rabbi Judah Loew ben Bezalel (the Maharal of Prague, famous for the Golem legend, d. 1609), David Gans (astronomer and historian), and Mordecai Maisel (financier and mayor of the Jewish quarter).');

addConn('pinkas-synagogue-prague-holocaust-memorial', [
  { name: "Jewish Museum in Prague", type: "managed by", description: "Part of the Jewish Museum in Prague complex." },
  { name: "77,297 names", type: "memorial", description: "Walls are inscribed with the names of 77,297 Czech and Moravian Jewish Holocaust victims." },
  { name: "Children's drawings from Terezín", type: "exhibition", description: "Houses a permanent exhibition of drawings by children held at the Terezín/Theresienstadt concentration camp." },
  { name: "15th century origins", type: "historical", description: "One of the oldest synagogues in Prague, dating to 1479." }
]);
updDesc('pinkas-synagogue-prague-holocaust-memorial', 'One of Prague\'s oldest synagogues, dating to 1479. Since 1954, it has served as a memorial to the Czech and Moravian victims of the Holocaust. The walls are inscribed with the names of 77,297 Jewish men, women, and children who perished. The upper floor houses a deeply moving exhibition of drawings by children imprisoned at the Terezín concentration camp, most of whom did not survive.');

addConn('terez-n-memorial', [
  { name: "Terezín concentration camp", type: "historical site", description: "Memorial at the site of Theresienstadt, which the Nazis used as a transit camp and propaganda tool." },
  { name: "Czech Ministry of Culture", type: "government", description: "Operated by the Czech Ministry of Culture." },
  { name: "Red Cross deception", type: "historical event", description: "Nazis staged a Red Cross visit in 1944, creating a propaganda film showing Terezín as a 'model Jewish settlement.'" },
  { name: "Yad Vashem", type: "partner", description: "Collaborates with Yad Vashem on documentation and research." },
  { name: "Cultural life under persecution", type: "heritage", description: "Despite horrific conditions, Terezín inmates created art, music, opera, and literature , including the children's opera Brundibár." }
]);
updDesc('terez-n-memorial', 'Memorial at the site of Theresienstadt, a former fortress town the Nazis converted into a hybrid ghetto-concentration camp (1941-1945). Over 150,000 Jews were sent there; 33,000 died in the ghetto and 88,000 were deported to extermination camps. Despite conditions, inmates created remarkable cultural works including the children\'s opera Brundibár. The Nazis staged a Red Cross visit in 1944, filming propaganda portraying it as a "model Jewish settlement." Now a major memorial and museum.');

// ============================================================
// UKRAINE
// ============================================================

addConn('jewish-confederation-of-ukraine', [
  { name: "President Volodymyr Zelenskyy", type: "government connection", description: "Ukraine's President Zelenskyy is Jewish , the first Jewish president of a major Eastern European nation." },
  { name: "World Jewish Congress", type: "affiliate", description: "Affiliated with the World Jewish Congress." },
  { name: "JDC Ukraine", type: "partner", description: "Works with the American Jewish Joint Distribution Committee on community support programs." },
  { name: "Chabad Ukraine", type: "religious partner", description: "Chabad-Lubavitch operates extensively across Ukraine with community centers in most major cities." }
]);
updDesc('jewish-confederation-of-ukraine', 'Umbrella organization representing Jewish communities across Ukraine. Ukraine has deep Jewish roots , it was the birthplace of Hasidism (founded by the Baal Shem Tov in the 1740s). Before WWII, Ukraine had approximately 2.7 million Jews; over 1.5 million were murdered in the Holocaust. President Volodymyr Zelenskyy is Jewish. The community has faced additional challenges since Russia\'s 2022 invasion, with Jewish organizations providing humanitarian aid.');

addConn('babyn-yar-holocaust-memorial-center', [
  { name: "Babi Yar massacre", type: "historical event", description: "At Babi Yar in Kyiv, Nazis massacred 33,771 Jews in just two days , September 29-30, 1941." },
  { name: "Ukrainian government", type: "government", description: "Supported by the Ukrainian government as a national memorial site." },
  { name: "Ilya Ehrenburg", type: "historical figure", description: "Soviet-Jewish writer Ilya Ehrenburg and Vasily Grossman documented the massacre in The Black Book." },
  { name: "Yad Vashem", type: "partner", description: "Works with Yad Vashem on victim identification and documentation." },
  { name: "Ronald Lauder", type: "supporter", description: "Ronald Lauder (Jewish, Estée Lauder heir) has been a major supporter of the memorial center." }
]);
updDesc('babyn-yar-holocaust-memorial-center', 'Memorial center at the ravine in Kyiv where Nazi Einsatzgruppen massacred 33,771 Jews on September 29-30, 1941 , one of the largest single mass shootings of the Holocaust. Over the following months, an estimated 100,000-150,000 people were killed there. Soviet authorities suppressed the Jewish identity of victims for decades. The modern memorial center, supported by Ronald Lauder and others, uses cutting-edge technology to document the tragedy. Damaged by Russian missile strike in 2022.');

addConn('united-jewish-community-of-ukraine', [
  { name: "Jewish Confederation of Ukraine", type: "partner", description: "Works alongside the Jewish Confederation of Ukraine in community affairs." },
  { name: "Israeli government", type: "support", description: "Receives support from Israeli government agencies for community programs." },
  { name: "Refugee assistance (2022)", type: "crisis response", description: "Organized major Jewish refugee assistance efforts following Russia's 2022 invasion." },
  { name: "Jewish Agency", type: "partner", description: "Partners with the Jewish Agency for Israel on aliyah and community services." }
]);
updDesc('united-jewish-community-of-ukraine', 'Represents Jewish communities across Ukraine, working on community development, welfare, and cultural preservation. Following Russia\'s 2022 invasion, played a crucial role in coordinating evacuation and humanitarian assistance for Ukrainian Jews. Partners with the Jewish Agency for Israel, JDC, and Israeli government on community support. Ukraine\'s Jewish community numbers approximately 50,000-200,000 depending on criteria used.');

addConn('uman-breslov-pilgrimage', [
  { name: "Rabbi Nachman of Breslov", type: "historical figure", description: "Rabbi Nachman (1772-1810), great-grandson of the Baal Shem Tov, is buried in Uman." },
  { name: "Rosh Hashanah pilgrimage", type: "annual event", description: "Tens of thousands of Breslov Hasidim travel to Uman every Rosh Hashanah to pray at Rabbi Nachman's grave." },
  { name: "Ukrainian government", type: "logistics", description: "The Ukrainian government coordinates security and logistics for the annual mass pilgrimage." },
  { name: "Israeli government", type: "diplomatic", description: "Israel and Ukraine coordinate on pilgrim safety and travel arrangements." }
]);
updDesc('uman-breslov-pilgrimage', 'Annual mass pilgrimage of Breslov Hasidim to the grave of Rabbi Nachman of Breslov (1772-1810) in Uman, Ukraine. Rabbi Nachman, great-grandson of the Baal Shem Tov (founder of Hasidism), requested that followers visit his grave on Rosh Hashanah. The pilgrimage has grown from hundreds to 30,000-50,000 annually, making it one of the largest Jewish pilgrimages in the world. Requires major Ukrainian-Israeli diplomatic coordination for security and logistics.');

addConn('menorah-center-dnipro', [
  { name: "Gennadiy Bogolubov", type: "funder", description: "Built by Ukrainian-Jewish oligarch Gennadiy Bogolubov." },
  { name: "World's largest menorah-shaped building", type: "architecture", description: "The building is shaped like a giant menorah , the world's largest menorah-shaped structure." },
  { name: "Chabad Dnipro", type: "affiliated", description: "Closely affiliated with the Chabad community of Dnipro, led by Chief Rabbi Shmuel Kaminezki." },
  { name: "Jewish community of Dnipro", type: "community hub", description: "Serves as the cultural and community hub for Dnipro's large Jewish population." }
]);
updDesc('menorah-center-dnipro', 'The world\'s largest menorah-shaped building, a seven-towered structure in Dnipro (formerly Dnepropetrovsk), Ukraine. Built by Jewish-Ukrainian billionaire Gennadiy Bogolubov, it houses a Jewish community center, museum, synagogue, hotel, kosher restaurants, and offices. Dnipro has one of Ukraine\'s largest Jewish communities, historically a major center of Jewish life. The center is closely affiliated with Chabad of Dnipro, led by Chief Rabbi Shmuel Kaminezki.');
addInd('menorah-center-dnipro', { name: "Gennadiy Bogolubov", bio: "Ukrainian-Jewish billionaire, co-owner of PrivatBank, who funded the construction of the Menorah Center in Dnipro.", role: "Funder" });

addConn('golden-rose-synagogue-lviv-ruins', [
  { name: "Renaissance architecture", type: "heritage", description: "Built in 1582, it was one of the finest Renaissance synagogues in Eastern Europe." },
  { name: "Nazi destruction", type: "historical", description: "Destroyed by the Nazis in 1941 during the Lviv pogroms." },
  { name: "Lviv Jewish community", type: "community", description: "Lviv (Lemberg) was a major center of Jewish culture, home to approximately 110,000 Jews before WWII." },
  { name: "Space of Synagogues memorial", type: "memorial", description: "The ruins are part of the 'Space of Synagogues' memorial project preserving the site." }
]);
updDesc('golden-rose-synagogue-lviv-ruins', 'Ruins of the Golden Rose Synagogue (Turei Zahav), built in 1582 in Lviv\'s Jewish quarter. One of the finest Renaissance synagogues in Eastern Europe, it was destroyed by the Nazis in 1941. Lviv (known historically as Lemberg) was home to approximately 110,000 Jews before WWII , nearly all were murdered in the Holocaust. The ruins are now part of the "Space of Synagogues" memorial project, designed by German architect Franz Reschke, preserving the memory of three destroyed synagogues.');

// ============================================================
// TURKEY
// ============================================================

addConn('quincentennial-foundation-museum-istanbul', [
  { name: "Ottoman Empire refuge", type: "historical", description: "Commemorates the Ottoman Empire welcoming Jews expelled from Spain in 1492." },
  { name: "Sultan Bayezid II", type: "historical figure", description: "Sultan Bayezid II sent ships to bring Jews safely from Spain to the Ottoman Empire." },
  { name: "Turkish government", type: "support", description: "Established with support from the Turkish government to celebrate 500 years of Jewish life." },
  { name: "Sephardic heritage", type: "cultural", description: "Documents the rich Sephardic Jewish heritage in Turkey, including Ladino language and customs." }
]);
updDesc('quincentennial-foundation-museum-istanbul', 'Established in 2001 to commemorate 500 years of Jewish presence in Turkey, dating to Sultan Bayezid II welcoming Jews expelled from Spain in 1492. The museum, housed in a restored synagogue in Karaköy, Istanbul, documents the rich Sephardic heritage of Turkish Jews, including the Ladino language, customs, and contributions to Ottoman society. Turkey\'s Jewish community today numbers approximately 15,000, mostly in Istanbul.');

addConn('chief-rabbinate-of-turkey', [
  { name: "Turkish government", type: "official recognition", description: "The Hakham Bashi (Chief Rabbi) is officially recognized by the Turkish Republic." },
  { name: "Ecumenical Patriarchate", type: "interfaith", description: "Engages in interfaith dialogue with the Ecumenical Patriarchate and other religious leaders." },
  { name: "Israeli embassy", type: "diplomatic", description: "Maintains connection with the Israeli diplomatic mission in Turkey." },
  { name: "Sephardic tradition", type: "religious", description: "Follows Sephardic liturgy and traditions dating back to the 15th century expulsion from Spain." }
]);
updDesc('chief-rabbinate-of-turkey', 'The Chief Rabbi (Hakham Bashi) of Turkey leads the country\'s Jewish community, a position dating to the Ottoman Empire. The current chief rabbi oversees approximately 15,000 Jews, primarily in Istanbul with smaller communities in Izmir and Ankara. The community follows Sephardic traditions brought from Spain after 1492. The Chief Rabbinate navigates the complex relationship between Turkey, Israel, and the Jewish diaspora.');
addInd('chief-rabbinate-of-turkey', { name: "Isak Haleva", bio: "Chief Rabbi (Hakham Bashi) of Turkey since 2002, leading the Sephardic Jewish community.", role: "Chief Rabbi" });

addConn('neve-shalom-synagogue-istanbul', [
  { name: "1986 massacre", type: "historical tragedy", description: "On September 6, 1986, Abu Nidal terrorists killed 22 worshippers during Shabbat services." },
  { name: "2003 bombing", type: "historical tragedy", description: "On November 15, 2003, a suicide bomber attacked the synagogue, killing 6 people." },
  { name: "Istanbul Jewish community", type: "community", description: "One of the most important active synagogues of Istanbul's Jewish community." },
  { name: "Turkish security services", type: "protection", description: "Under heavy security protection by Turkish authorities." }
]);
updDesc('neve-shalom-synagogue-istanbul', 'The main synagogue of Istanbul\'s Jewish community, located in the Beyoğlu district. Founded in 1951, it has been the target of multiple terrorist attacks: in 1986, Abu Nidal\'s group killed 22 worshippers during Shabbat services; in 2003, a suicide bombing killed 6 people. Despite these tragedies, the congregation has persevered and the synagogue remains an active center of Jewish worship in Istanbul. Under heavy security protection.');

addConn('ahrida-synagogue-istanbul', [
  { name: "15th century heritage", type: "historical", description: "One of the oldest synagogues in Istanbul, dating to the 15th century." },
  { name: "Romaniote Jews", type: "origin", description: "Originally founded by Romaniote (Greek-speaking) Jews from Ohrid (now North Macedonia)." },
  { name: "Ship-shaped bimah", type: "architecture", description: "Famous for its unique ship-shaped wooden bimah (Torah reading platform), possibly symbolizing Noah's Ark." },
  { name: "Balat neighborhood", type: "location", description: "Located in Istanbul's historic Balat neighborhood, once the center of Jewish life." }
]);
updDesc('ahrida-synagogue-istanbul', 'One of the oldest synagogues in Istanbul, dating to the 15th century and possibly earlier. Founded by Romaniote Jews from Ohrid (now North Macedonia). Famous for its unique ship-shaped wooden bimah, possibly symbolizing Noah\'s Ark or the ships that brought Jews to the Ottoman Empire. Located in the historic Balat neighborhood on the Golden Horn, once the center of Istanbul\'s Jewish quarter. Still an active place of worship.');

// ============================================================
// MOROCCO
// ============================================================

addConn('council-of-jewish-communities-of-morocco', [
  { name: "King Mohammed VI", type: "royal patronage", description: "Moroccan King Mohammed VI has actively supported Jewish heritage preservation." },
  { name: "Abraham Accords", type: "diplomatic", description: "Morocco normalized relations with Israel in 2020 under the Abraham Accords." },
  { name: "André Azoulay", type: "key figure", description: "André Azoulay (Jewish), senior adviser to King Mohammed VI, promotes interfaith dialogue." },
  { name: "World Jewish Congress", type: "affiliate", description: "Affiliated with the World Jewish Congress as Morocco's representative Jewish body." }
]);
updDesc('council-of-jewish-communities-of-morocco', 'Represents Morocco\'s Jewish community, which numbered over 250,000 in the 1940s and today numbers approximately 2,000-3,000 , one of the largest remaining Jewish communities in the Arab world. Morocco\'s King Mohammed VI has actively supported Jewish heritage preservation, including renovating synagogues and cemeteries. André Azoulay (Jewish), senior adviser to both King Mohammed VI and his father, has been instrumental in promoting coexistence. Morocco normalized relations with Israel in 2020.');
addInd('council-of-jewish-communities-of-morocco', { name: "André Azoulay", bio: "Jewish Moroccan businessman and senior adviser to King Mohammed VI and his father Hassan II, promoting interfaith dialogue and Moroccan-Israeli relations.", role: "Senior Royal Adviser" });

addConn('museum-of-moroccan-judaism-casablanca', [
  { name: "Only Jewish museum in the Arab world", type: "distinction", description: "The only Jewish museum in the Arab world, opened in 1997." },
  { name: "Moroccan government", type: "support", description: "Supported by the Moroccan government as part of national heritage preservation." },
  { name: "Sephardic artifacts", type: "collection", description: "Houses Sephardic and Moroccan Jewish artifacts, Torah scrolls, and ceremonial objects." },
  { name: "Foundation for Moroccan Jewish Heritage", type: "operator", description: "Operated by the Foundation for Moroccan Jewish Cultural Heritage." }
]);
updDesc('museum-of-moroccan-judaism-casablanca', 'The only Jewish museum in the Arab world, opened in 1997 in Casablanca. Houses a rich collection of Sephardic and Moroccan Jewish artifacts including Torah scrolls, menorahs, traditional garments, and photographs documenting centuries of Jewish life in Morocco. Morocco\'s Jewish community once numbered over 250,000 and contributed significantly to the country\'s commerce, culture, and governance. The museum is a powerful symbol of Morocco\'s commitment to preserving its multicultural heritage.');

addConn('bayt-dakira-house-of-memory-essaouira', [
  { name: "King Mohammed VI", type: "inaugurated by", description: "Inaugurated by King Mohammed VI in January 2020." },
  { name: "André Azoulay", type: "initiative", description: "André Azoulay, born in Essaouira, was instrumental in creating this heritage center." },
  { name: "Slat Al Fassiyine Synagogue", type: "location", description: "Located in the restored Slat Al Fassiyine Synagogue, one of the oldest in Essaouira." },
  { name: "Essaouira Jewish heritage", type: "cultural", description: "Essaouira (formerly Mogador) once had a Jewish population that was 40% of the town." }
]);
updDesc('bayt-dakira-house-of-memory-essaouira', 'Heritage center and museum inaugurated by King Mohammed VI in January 2020, located in the restored Slat Al Fassiyine Synagogue in Essaouira (formerly Mogador). Essaouira\'s Jewish community once comprised nearly 40% of the town\'s population. André Azoulay, senior adviser to the King and Essaouira native, was instrumental in creating the center. Includes a synagogue, genealogical research center, and exhibition space documenting Jewish-Muslim coexistence in Morocco.');

addConn('casablanca-jewish-heritage-trail', [
  { name: "Moroccan tourism ministry", type: "support", description: "Promoted by the Moroccan tourism ministry as part of cultural heritage tourism." },
  { name: "Multiple synagogues", type: "sites", description: "Includes visits to active and historic synagogues, the Jewish museum, and the mellah (Jewish quarter)." },
  { name: "Abraham Accords tourism", type: "context", description: "Tourism from Israel has increased significantly following the 2020 Abraham Accords normalization." }
]);
updDesc('casablanca-jewish-heritage-trail', 'Heritage trail in Casablanca connecting sites of Jewish significance including the Museum of Moroccan Judaism, historic synagogues, the mellah (Jewish quarter), and Jewish cemeteries. Casablanca had a large and prosperous Jewish community in the 20th century, contributing to banking, commerce, and industry. Tourism from Israel has increased significantly following the 2020 Abraham Accords. The trail showcases centuries of Jewish-Muslim coexistence.');

addConn('rabbi-haim-pinto-synagogue-essaouira', [
  { name: "Rabbi Haim Pinto", type: "namesake", description: "Named after Rabbi Haim Pinto (1748-1845), one of Morocco's most venerated rabbis and kabbalists." },
  { name: "Hilulah pilgrimage", type: "annual event", description: "Annual Hilulah (commemoration) pilgrimage draws thousands of Jewish pilgrims from Israel and worldwide." },
  { name: "Moroccan Jewish saints", type: "tradition", description: "Part of the Moroccan tradition of venerating Jewish saints (tzaddikim), a unique Sephardic practice." }
]);
updDesc('rabbi-haim-pinto-synagogue-essaouira', 'Synagogue in Essaouira named after Rabbi Haim Pinto (1748-1845), one of Morocco\'s most venerated rabbis and kabbalists. The annual Hilulah pilgrimage to his shrine draws thousands of Jewish visitors from Israel and the diaspora. Part of a unique Moroccan-Jewish tradition of venerating holy rabbis (tzaddikim) at their tombs , a practice shared with and respected by Moroccan Muslims. The synagogue has been restored with support from the Moroccan government.');

// ============================================================
// SCANDINAVIA
// ============================================================

addConn('official-council-of-swedish-jewish-communities', [
  { name: "Swedish government", type: "official recognition", description: "Officially recognized representative body of Swedish Jews." },
  { name: "European Jewish Congress", type: "affiliate", description: "Member of the European Jewish Congress." },
  { name: "Living History Forum", type: "partner", description: "Works with Sweden's Forum for Living History on Holocaust education." },
  { name: "Raoul Wallenberg legacy", type: "heritage", description: "Sweden honors the legacy of Raoul Wallenberg, who saved tens of thousands of Hungarian Jews." }
]);
updDesc('official-council-of-swedish-jewish-communities', 'Official representative body of approximately 15,000-20,000 Jews living in Sweden. Members include communities in Stockholm, Gothenburg, Malmö, and other cities. Sweden has a significant Jewish heritage including the legacy of Raoul Wallenberg, who saved tens of thousands of Hungarian Jews during the Holocaust. The council addresses antisemitism, supports religious life, and engages in interfaith dialogue. Sweden was one of the first countries to establish a national Holocaust remembrance program.');

addConn('jewish-museum-stockholm', [
  { name: "Jewish community of Stockholm", type: "operator", description: "Operated by the Jewish Community of Stockholm." },
  { name: "Swedish cultural heritage", type: "context", description: "Documents the history of Jews in Sweden from the 18th century to present." },
  { name: "Aaron Isaac", type: "historical figure", description: "Tells the story of Aaron Isaac, the first Jew allowed to settle in Sweden in 1774." }
]);
updDesc('jewish-museum-stockholm', 'Documents the history of Jews in Sweden from 1774, when Aaron Isaac became the first Jew permitted to settle in the country, to the present day. Located in Stockholm, the museum features exhibits on Swedish-Jewish culture, Holocaust survivors who found refuge in Sweden, and the contributions of Jews to Swedish society including science, culture, and business. Houses artifacts, photographs, and oral histories.');

addConn('raoul-wallenberg-institute', [
  { name: "Raoul Wallenberg", type: "namesake", description: "Named after Swedish diplomat Raoul Wallenberg (1912-disappeared 1947), who saved tens of thousands of Hungarian Jews." },
  { name: "Lund University", type: "academic home", description: "Based at Lund University in southern Sweden." },
  { name: "United Nations", type: "partner", description: "Collaborates with UN human rights bodies on education and training." },
  { name: "Swedish government", type: "funder", description: "Funded in part by the Swedish International Development Cooperation Agency (SIDA)." }
]);
updDesc('raoul-wallenberg-institute', 'Human rights institute at Lund University named after Swedish diplomat Raoul Wallenberg (1912-disappeared 1947), who saved an estimated 30,000-100,000 Hungarian Jews during the Holocaust by issuing protective Swedish passports. Wallenberg was arrested by Soviet forces in 1945 and his fate remains one of the 20th century\'s great mysteries. The institute focuses on human rights research, education, and training worldwide. Funded partly by the Swedish government.');

addConn('great-synagogue-of-stockholm', [
  { name: "Jewish community of Stockholm", type: "congregation", description: "The main synagogue of the Jewish Community of Stockholm." },
  { name: "1870 consecration", type: "historical", description: "Consecrated in 1870, designed by architect Fredrik Wilhelm Scholander in Moorish Revival style." },
  { name: "Swedish royal family", type: "relationship", description: "The Swedish royal family has participated in events at the synagogue, demonstrating state-community relations." }
]);
updDesc('great-synagogue-of-stockholm', 'The Great Synagogue of Stockholm, consecrated in 1870, is the main synagogue of Stockholm\'s Jewish community. Designed by architect Fredrik Wilhelm Scholander in an ornate Moorish Revival style with Neo-Romanesque elements. Located on Wahrendorffsgatan, it seats about 800 people. The congregation follows Conservative/Masorti tradition. The Swedish royal family has participated in interfaith events here. A center of Jewish community life for over 150 years.');

addConn('jewish-community-of-denmark', [
  { name: "Danish government", type: "official recognition", description: "Officially recognized representative body of Danish Jews." },
  { name: "Rescue of Danish Jews 1943", type: "heritage", description: "Denmark famously rescued nearly all its 7,500 Jews by smuggling them to Sweden in October 1943." },
  { name: "European Jewish Congress", type: "affiliate", description: "Member of the European Jewish Congress." },
  { name: "Niels Bohr", type: "notable", description: "Physicist Niels Bohr (Jewish mother) was among those who fled Denmark during the Nazi occupation." }
]);
updDesc('jewish-community-of-denmark', 'Represents approximately 6,000-8,000 Jews in Denmark. Denmark holds a unique place in Holocaust history: in October 1943, the Danish resistance and ordinary citizens smuggled nearly all 7,500 Danish Jews to safety in neutral Sweden. This remarkable rescue , the only such case in occupied Europe , saved 95% of Danish Jews. Physicist Niels Bohr (Jewish mother, Nobel laureate) was among those rescued. The community maintains the Great Synagogue of Copenhagen (1833).');

addConn('great-synagogue-of-copenhagen', [
  { name: "Jewish community of Denmark", type: "congregation", description: "The main synagogue of the Jewish Community of Denmark." },
  { name: "1833 construction", type: "historical", description: "Built in 1833, designed by Gustav Friedrich Hetsch in a Neoclassical-Egyptian style." },
  { name: "King Christian X", type: "historical figure", description: "Danish King Christian X attended the synagogue's centennial in 1933, showing solidarity with Jews." },
  { name: "2019 attack attempt", type: "security", description: "Target of an attempted terrorist attack in 2019, reflecting ongoing security concerns." }
]);
updDesc('great-synagogue-of-copenhagen', 'Built in 1833, the Great Synagogue of Copenhagen is the oldest functioning synagogue in Denmark and one of the finest in Scandinavia. Designed by Gustav Friedrich Hetsch in Neoclassical style with Egyptian motifs. King Christian X attended the centennial celebration in 1933. In February 2015, a gunman attacked a synagogue bat mitzvah party, killing security guard Dan Uzan. The building remains a symbol of Danish-Jewish heritage and resilience.');

addConn('danish-jewish-museum-copenhagen', [
  { name: "Daniel Libeskind", type: "architect", description: "Designed by world-renowned architect Daniel Libeskind (Jewish), who also designed the Jewish Museum Berlin." },
  { name: "Royal Library of Denmark", type: "location", description: "Located within the Royal Library of Denmark's historic building." },
  { name: "1943 rescue exhibition", type: "core exhibit", description: "Core exhibition focuses on the 1943 rescue of Danish Jews." },
  { name: "Danish Cultural Ministry", type: "government support", description: "Supported by the Danish Ministry of Culture." }
]);
updDesc('danish-jewish-museum-copenhagen', 'Designed by world-renowned architect Daniel Libeskind (Jewish, also designed the Jewish Museum Berlin and the 9/11 Memorial master plan), opened in 2004 within the 17th-century Royal Library building. The museum\'s striking interior uses angled walls and floors symbolizing the Hebrew word "mitzvah." Core exhibitions focus on the remarkable 1943 rescue of Danish Jews. Libeskind called the design "an exploration of the Danish-Jewish experience , a culture of learning, adaptation, and contribution."');

addConn('rescue-of-danish-jews-1943', [
  { name: "Georg Ferdinand Duckwitz", type: "key figure", description: "German diplomat Georg Ferdinand Duckwitz leaked the planned roundup to Danish politicians." },
  { name: "Danish resistance", type: "organized rescue", description: "Danish resistance fighters and ordinary citizens organized fishing boats to smuggle Jews to Sweden." },
  { name: "Sweden", type: "refuge", description: "Neutral Sweden accepted all Danish Jewish refugees." },
  { name: "Yad Vashem", type: "recognition", description: "Many Danish rescuers have been recognized as Righteous Among the Nations by Yad Vashem." }
]);
updDesc('rescue-of-danish-jews-1943', 'In October 1943, when the Nazis planned to deport Denmark\'s 7,500 Jews, German diplomat Georg Ferdinand Duckwitz warned Danish political leaders. In a remarkable three-week effort, Danish resistance fighters and ordinary citizens organized fishing boats to smuggle nearly the entire Jewish population across the Øresund strait to neutral Sweden. Over 7,200 Jews were saved , 95% of Danish Jewry. This stands as the most successful national rescue effort during the Holocaust. Many participants were later honored as Righteous Among the Nations.');

addConn('jewish-community-of-oslo', [
  { name: "Norwegian government", type: "official", description: "Officially recognized Jewish community in Norway." },
  { name: "Det Mosaiske Trossamfunn", type: "formal name", description: "Formally known as Det Mosaiske Trossamfunn (The Mosaic Religious Community)." },
  { name: "WWII deportations", type: "history", description: "During WWII, 773 Norwegian Jews were deported, primarily on the SS Donau in November 1942. 34 survived." },
  { name: "European Jewish Congress", type: "affiliate", description: "Member of the European Jewish Congress." }
]);
updDesc('jewish-community-of-oslo', 'Known formally as Det Mosaiske Trossamfunn (The Mosaic Religious Community), representing approximately 750 Jews in Oslo. Norway\'s Jewish history includes the dark chapter of WWII deportations: in November 1942, 532 Jews were loaded onto the SS Donau and shipped to Auschwitz. Of 773 Norwegian Jews deported total, only 34 survived. In 2012, Norway formally apologized at a ceremony marking the 70th anniversary. The Oslo synagogue, built in 1920, remains the center of community life.');

addConn('jewish-museum-trondheim', [
  { name: "Trondheim synagogue", type: "location", description: "Located in the Trondheim synagogue, the northernmost synagogue in the world." },
  { name: "Norwegian Jewish heritage", type: "mission", description: "Documents the history of Jews in Norway, including the Constitution's 1814 ban on Jews and its repeal in 1851." },
  { name: "WWII deportation", type: "history", description: "Documents the deportation and murder of Trondheim's Jewish community during WWII." }
]);
updDesc('jewish-museum-trondheim', 'Located in the world\'s northernmost synagogue in Trondheim, Norway. The museum documents the history of Jews in Norway, including the Norwegian Constitution\'s 1814 ban on Jewish settlement (repealed 1851), the development of small communities in Trondheim and Oslo, and the devastating WWII deportations. Trondheim\'s entire Jewish community was arrested and deported in 1942 , most perished at Auschwitz.');

addConn('center-for-studies-of-the-holocaust-and-religious-minorities-hl-senteret', [
  { name: "Norwegian government", type: "funder", description: "Funded by the Norwegian government as a national center for Holocaust education." },
  { name: "Villa Grande", type: "location", description: "Located in Villa Grande, formerly the residence of Nazi collaborator Vidkun Quisling." },
  { name: "University of Oslo", type: "academic partner", description: "Collaborates with the University of Oslo on research." }
]);
updDesc('center-for-studies-of-the-holocaust-and-religious-minorities-hl-senteret', 'Norwegian national center for Holocaust and minority studies, located in Villa Grande , the former wartime residence of Vidkun Quisling, Norway\'s Nazi collaborator. This powerful symbolic choice transforms a site of betrayal into a center of education and remembrance. Funded by the Norwegian government, the center conducts research on the Holocaust in Norway, antisemitism, and the rights of religious minorities. Partners with Universities and the European Holocaust Research Infrastructure (EHRI).');

addConn('central-council-of-jewish-communities-in-finland', [
  { name: "Finnish government", type: "official recognition", description: "Officially recognized representative body of Finnish Jews." },
  { name: "Finnish military", type: "historical", description: "Uniquely, Finnish Jews served alongside Nazi Germany in WWII while retaining their civil rights , the only case in Axis Europe." },
  { name: "Helsinki synagogue", type: "center", description: "The Helsinki Synagogue (1906) is the center of Finnish Jewish life." }
]);
updDesc('central-council-of-jewish-communities-in-finland', 'Represents approximately 1,300 Jews in Finland, one of Europe\'s smallest Jewish communities. Finland\'s Jewish history is unique: during WWII, Finnish Jews served in the Finnish army alongside Nazi Germany (as co-belligerents against the Soviet Union) while keeping full civil rights , the only such case in Axis-allied Europe. Finland refused Nazi demands to deport its Jews. The community maintains synagogues in Helsinki and Turku.');

// ============================================================
// GREECE
// ============================================================

addConn('central-board-of-jewish-communities-in-greece', [
  { name: "Greek government", type: "official recognition", description: "Officially recognized representative body of Greek Jews." },
  { name: "Thessaloniki Jewish heritage", type: "heritage", description: "Thessaloniki was known as 'the Jerusalem of the Balkans' , 50,000 Jews lived there before WWII." },
  { name: "European Jewish Congress", type: "affiliate", description: "Member of the European Jewish Congress." },
  { name: "World Jewish Congress", type: "affiliate", description: "Affiliated with the World Jewish Congress." }
]);
updDesc('central-board-of-jewish-communities-in-greece', 'Known as KIS (Kentriko Israelitiko Symvoulio), representing approximately 5,000 Jews in Greece. Greece had one of the most devastating Holocaust experiences: approximately 87% of Greek Jews were murdered. Thessaloniki alone lost 50,000 Jews , the city was known as "the Jerusalem of the Balkans." Greece\'s Jewish heritage includes both Romaniote Jews (present since antiquity) and Sephardic Jews (arrived after 1492 Spanish expulsion). The board oversees community affairs and Holocaust remembrance.');

addConn('jewish-museum-of-greece', [
  { name: "Athens Jewish community", type: "community", description: "Located in Athens, documenting the 2,300+ year history of Jews in Greece." },
  { name: "Romaniote heritage", type: "collection", description: "Houses artifacts from the Romaniote Jewish tradition, one of the oldest Jewish communities in Europe." },
  { name: "Greek Ministry of Culture", type: "government", description: "Supported by the Greek Ministry of Culture." }
]);
updDesc('jewish-museum-of-greece', 'Located in Athens, documenting over 2,300 years of Jewish presence in Greece , from Hellenistic times to the present. Houses important collections from both Romaniote Jews (one of Europe\'s oldest Jewish communities, speaking Greek since antiquity) and Sephardic Jews who arrived after 1492. The museum preserves artifacts, textiles, documents, and ritual objects. Greece\'s Jewish community was devastated during the Holocaust, making preservation of these materials critical.');

addConn('jewish-museum-of-thessaloniki', [
  { name: "Thessaloniki Jewish community", type: "community", description: "Documents the history of Thessaloniki's once-dominant Jewish community." },
  { name: "50,000 victims", type: "Holocaust", description: "Nearly 50,000 Jews from Thessaloniki were deported and murdered at Auschwitz-Birkenau in 1943." },
  { name: "Aristotle University", type: "location context", description: "Aristotle University was built on the site of the former Jewish cemetery, which the Nazis destroyed." }
]);
updDesc('jewish-museum-of-thessaloniki', 'Documents the extraordinary history of Thessaloniki\'s Jewish community, which at its peak made up over 50% of the city\'s population. Known as "La Madre de Israel" (the Mother of Israel) in Ladino, Thessaloniki was the world\'s largest Sephardic city. In 1943, nearly 50,000 Jews were deported to Auschwitz-Birkenau , 96% of the community perished. The Nazis destroyed the vast Jewish cemetery; Aristotle University was later built on the site. The museum preserves what remains of this lost world.');

addConn('holocaust-memorial-of-thessaloniki', [
  { name: "Thessaloniki municipality", type: "government", description: "Erected by the municipality of Thessaloniki on Freedom Square." },
  { name: "Freedom Square", type: "location", description: "Located on Freedom Square (Plateia Eleftherias), where Jews were humiliated by Nazi soldiers in July 1942." },
  { name: "March 2024 memorial", type: "commemoration", description: "Annual commemorations mark the deportations that began in March 1943." }
]);
updDesc('holocaust-memorial-of-thessaloniki', 'Memorial on Freedom Square (Plateia Eleftherias) in Thessaloniki, the very spot where on July 11, 1942, 9,000 Jewish men were forced to perform exercises and humiliations by Nazi soldiers. The memorial commemorates the nearly 50,000 Thessaloniki Jews who were deported and murdered at Auschwitz in 1943. The city\'s Jewish community , which had shaped Thessaloniki\'s character for 450 years , was almost entirely annihilated in just a few months.');

addConn('romaniote-jewish-community', [
  { name: "2,300+ year heritage", type: "historical", description: "Romaniote Jews have lived in Greece since at least the 3rd century BCE , possibly the oldest Jewish community in Europe." },
  { name: "Ioannina community", type: "center", description: "Ioannina has been historically the center of Romaniote Jewish life." },
  { name: "Distinct liturgy", type: "religious", description: "Romaniote Jews have their own distinct liturgy, different from both Sephardic and Ashkenazi traditions." },
  { name: "Kehila Kedosha Janina (NYC)", type: "diaspora", description: "The only Romaniote synagogue in the Western Hemisphere is Kehila Kedosha Janina on the Lower East Side, NYC." }
]);
updDesc('romaniote-jewish-community', 'The Romaniote Jews are one of the oldest Jewish communities in Europe, present in Greece since at least the 3rd century BCE , predating both Ashkenazi and Sephardic traditions. They spoke Greek (not Yiddish or Ladino) and developed their own distinct liturgy, customs, and music. Ioannina was historically the center of Romaniote life. The community was devastated in the Holocaust. Today, the only Romaniote synagogue in the Western Hemisphere is Kehila Kedosha Janina on the Lower East Side of New York City, founded in 1927.');

// ============================================================
// ISRAEL LEFTOVERS
// ============================================================

addConn('israel-tax-authority', [
  { name: "Israeli Ministry of Finance", type: "government", description: "Operates under the Israeli Ministry of Finance." },
  { name: "OECD", type: "international", description: "Israel's tax system aligns with OECD standards since joining in 2010." },
  { name: "Tech tax incentives", type: "policy", description: "Administers tax incentives that have been key to Israel's tech boom, including the Angel's Law." }
]);
updDesc('israel-tax-authority', 'Israeli government body responsible for tax collection and enforcement. Administers corporate, income, VAT, and customs taxes. Has played a key role in Israel\'s economic development through tax incentive programs , particularly the Innovation Authority\'s grants and the Angel\'s Law encouraging tech investment. Israel joined the OECD in 2010, aligning its tax framework with international standards.');

addConn('israel-lands-authority', [
  { name: "Israeli government", type: "government", description: "Government authority managing 93% of Israel's land, which is state-owned." },
  { name: "KKL-JNF", type: "partner", description: "Works alongside the Jewish National Fund (KKL-JNF) in land management." },
  { name: "Housing policy", type: "policy", description: "Central to Israel's housing policy and urban development planning." }
]);
updDesc('israel-lands-authority', 'Government authority managing approximately 93% of land in Israel, which is state-owned or held by the Jewish National Fund (KKL-JNF). Responsible for land allocation, leasing, and urban development planning. Plays a central role in Israel\'s housing market and has been involved in controversies regarding land allocation policies and settlement construction.');

addConn('israel-airports-authority', [
  { name: "Ben Gurion Airport", type: "operated facility", description: "Operates Ben Gurion International Airport (TLV), Israel's main international gateway." },
  { name: "Israeli security model", type: "security", description: "Ben Gurion Airport is renowned worldwide for its multi-layered security system." },
  { name: "El Al", type: "primary user", description: "El Al Israel Airlines is the primary carrier at Ben Gurion Airport." }
]);
updDesc('israel-airports-authority', 'Government authority operating Israel\'s airports, including Ben Gurion International Airport (TLV) , Israel\'s primary international gateway serving over 25 million passengers annually. Ben Gurion Airport is renowned worldwide for its pioneering multi-layered security system, which has been studied and adapted by airports globally. Also operates Ramon Airport near Eilat and Haifa Airport.');

addConn('university-of-haifa', [
  { name: "Israeli academic system", type: "academic", description: "One of Israel's major research universities, known for its diverse student body." },
  { name: "Hecht Museum", type: "on-campus", description: "Home to the Hecht Museum with archaeological and art collections." },
  { name: "Arab-Jewish coexistence", type: "mission", description: "Known as Israel's most diverse university, with significant Arab student enrollment." },
  { name: "Marine research", type: "specialty", description: "Leading center for marine sciences and Mediterranean research." }
]);
updDesc('university-of-haifa', 'Founded in 1963, Israel\'s most diverse university with significant Arab, Druze, and Jewish enrollment , a model of coexistence. Located on Mount Carmel with views of the Mediterranean. Home to the Leon H. Charney School of Marine Sciences, the Hecht Museum of archaeology and art, and leading programs in Mediterranean studies. The Eshkol Tower, designed by Oscar Niemeyer, is a local landmark.');

addConn('reichman-university-idc-herzliya', [
  { name: "Uriel Reichman", type: "founder", description: "Founded in 1994 by Prof. Uriel Reichman, a law professor and public intellectual." },
  { name: "Lauder School of Government", type: "school", description: "Houses the Ronald S. Lauder School of Government, Diplomacy, and Strategy." },
  { name: "International programs", type: "feature", description: "Known for admitting international students, with programs taught in English." },
  { name: "Sammy Ofer School of Communications", type: "school", description: "Home to one of Israel's leading communications programs." }
]);
updDesc('reichman-university-idc-herzliya', 'Founded in 1994 by Prof. Uriel Reichman as IDC Herzliya, rebranded as Reichman University. Israel\'s first private university. Houses the Lauder School of Government (named for Ronald Lauder, Jewish, Estée Lauder heir), the Arison School of Business, and the Sammy Ofer School of Communications. Known for attracting international students and producing leaders in Israeli tech, government, and media. Located in Herzliya, Israel\'s tech corridor.');

addConn('bezalel-academy-of-arts-and-design', [
  { name: "Boris Schatz", type: "founder", description: "Founded in 1906 by Boris Schatz, a Bulgarian-Jewish sculptor, making it Israel's oldest art school." },
  { name: "Israeli design and art", type: "impact", description: "Graduates have shaped Israel's visual culture, architecture, and design industry." },
  { name: "Mt. Scopus campus", type: "location", description: "Main campus is located on Mt. Scopus in Jerusalem." },
  { name: "Pre-state Zionist art", type: "heritage", description: "Played a central role in defining the visual language of the Zionist movement and the State of Israel." }
]);
updDesc('bezalel-academy-of-arts-and-design', 'Israel\'s oldest art school, founded in 1906 by Boris Schatz, a Bulgarian-Jewish sculptor inspired by Theodor Herzl. Named after Bezalel, the biblical artisan of the Tabernacle. Played a central role in defining the visual language of Zionism and the State of Israel, including early banknote designs, the state emblem concepts, and national aesthetics. Located on Mt. Scopus in Jerusalem. Alumni have shaped Israeli architecture, industrial design, animation, and fine arts.');

addConn('mobileye-global', [
  { name: "Amnon Shashua", type: "co-founder", description: "Co-founded by Prof. Amnon Shashua, a Hebrew University computer scientist." },
  { name: "Intel", type: "parent company", description: "Acquired by Intel for $15.3 billion in 2017 , the largest Israeli tech acquisition at the time." },
  { name: "Autonomous vehicles", type: "technology", description: "World leader in autonomous driving technology and advanced driver-assistance systems (ADAS)." },
  { name: "IPO 2022", type: "financial", description: "Intel took Mobileye public again in 2022 with a valuation of approximately $17 billion." }
]);
updDesc('mobileye-global', 'Israeli autonomous driving technology company co-founded by Prof. Amnon Shashua and Ziv Aviram in 1999. Acquired by Intel for $15.3 billion in 2017. World leader in computer vision-based advanced driver-assistance systems (ADAS), with technology installed in over 125 million vehicles from 50+ automakers. Taken public again by Intel in 2022. Headquartered in Jerusalem. The technology has roots in Shashua\'s research at Hebrew University.');

addConn('ironsource-merged-with-unity', [
  { name: "Unity Technologies", type: "merger", description: "Merged with Unity Technologies in 2022 in a $4.4 billion deal." },
  { name: "Israeli tech sector", type: "ecosystem", description: "One of many Israeli app-economy companies that achieved global scale." },
  { name: "Mobile advertising", type: "business", description: "Leading platform for mobile app monetization and distribution." }
]);
updDesc('ironsource-merged-with-unity', 'Israeli mobile app monetization and distribution platform that merged with Unity Technologies in 2022 in a deal valued at approximately $4.4 billion. Founded in Tel Aviv, ironSource was a major player in the mobile advertising ecosystem, helping app developers monetize and distribute their apps. The merger combined Unity\'s game engine dominance with ironSource\'s ad-tech expertise.');

addConn('ironsource-now-unity', [
  { name: "Unity Technologies", type: "merged with", description: "Now part of Unity Technologies following the 2022 merger." },
  { name: "Tel Aviv tech scene", type: "origin", description: "Founded in Tel Aviv, exemplifying Israeli ad-tech innovation." },
  { name: "Omer Kaplan", type: "co-founder", description: "Co-founded by Omer Kaplan and other Israeli entrepreneurs." }
]);
updDesc('ironsource-now-unity', 'Israeli ad-tech company now part of Unity Technologies. Originally founded in Tel Aviv, ironSource grew into one of the world\'s leading mobile app monetization platforms before merging with Unity in 2022 for approximately $4.4 billion. Co-founded by Israeli entrepreneurs including Omer Kaplan.');

addConn('jewish-national-fund-keren-kayemeth-leisrael-kkl-jnf', [
  { name: "Theodor Herzl", type: "founded at initiative", description: "Established at the Fifth Zionist Congress in 1901 at Theodor Herzl's initiative." },
  { name: "Land purchase and forestation", type: "mission", description: "Purchased land for Jewish settlement and planted over 250 million trees in Israel." },
  { name: "Blue Box", type: "cultural icon", description: "The JNF Blue Box (pushke) for collecting donations is one of the most iconic symbols of Zionism." },
  { name: "Israel Lands Authority", type: "partner", description: "Owns approximately 13% of Israel's land, managed jointly with the Israel Lands Authority." }
]);
updDesc('jewish-national-fund-keren-kayemeth-leisrael-kkl-jnf', 'Established at the Fifth Zionist Congress in 1901 at Theodor Herzl\'s initiative to purchase land in Ottoman Palestine for Jewish settlement. Has planted over 250 million trees in Israel, transforming arid landscape into forests. The iconic Blue Box (pushke) for collecting donations became a symbol of Zionist fundraising worldwide. Owns approximately 13% of Israel\'s land. Today focuses on water, environment, community development, and forestry projects.');

addConn('israel-chemicals-ltd-icl', [
  { name: "Dead Sea minerals", type: "resource", description: "Extracts minerals from the Dead Sea, one of the world's unique natural resources." },
  { name: "Israel Corporation", type: "parent", description: "Controlled by Israel Corporation, part of the Ofer Group (Sammy Ofer family, Jewish)." },
  { name: "Global fertilizer market", type: "industry", description: "One of the world's largest producers of potash, phosphates, and specialty fertilizers." },
  { name: "Israeli government", type: "concession", description: "Operates under government concessions for Dead Sea mineral extraction." }
]);
updDesc('israel-chemicals-ltd-icl', 'One of the world\'s leading specialty minerals companies, headquartered in Tel Aviv. Extracts potash, bromine, and other minerals from the Dead Sea , one of Earth\'s most unique natural resources. Controlled by the Ofer Group (Idan Ofer, Jewish). A Fortune 500 company operating in over 30 countries. Major producer of fertilizers, food additives, and industrial products. The Dead Sea concession is one of Israel\'s most valuable natural resource assets.');

addConn('taro-pharmaceutical-israel', [
  { name: "Sun Pharmaceutical", type: "parent company", description: "Majority-owned by Sun Pharmaceutical Industries of India." },
  { name: "Israeli pharmaceutical industry", type: "context", description: "Part of Israel's significant pharmaceutical sector alongside Teva." },
  { name: "Generic drugs", type: "business", description: "Major producer of generic prescription and over-the-counter medications, especially dermatological products." }
]);
updDesc('taro-pharmaceutical-israel', 'Israeli multinational pharmaceutical company specializing in generic prescription and over-the-counter medications, particularly in dermatology. Founded in Haifa in 1959. Majority-owned by India\'s Sun Pharmaceutical Industries since 2010. Products include topical creams, oral medications, and injectable drugs sold worldwide. Part of Israel\'s significant pharma sector alongside Teva Pharmaceutical.');

addConn('biontech-pfizer-israel-partnership', [
  { name: "Pfizer", type: "partner", description: "Pfizer and BioNTech partnered to develop and distribute the COVID-19 mRNA vaccine." },
  { name: "Israel vaccination campaign", type: "landmark", description: "Israel was the world's fastest country to vaccinate its population in early 2021." },
  { name: "Real-world data sharing", type: "agreement", description: "Israel shared anonymized health data with Pfizer in exchange for early vaccine supply." },
  { name: "Albert Bourla", type: "CEO", description: "Pfizer CEO Albert Bourla (Jewish, born in Thessaloniki) led the vaccine development effort." }
]);
updDesc('biontech-pfizer-israel-partnership', 'Israel became the world\'s fastest country to vaccinate its population with the Pfizer-BioNTech COVID-19 vaccine in early 2021. A landmark agreement saw Israel share anonymized health data with Pfizer in exchange for priority vaccine supply. Pfizer CEO Albert Bourla (Jewish, born in Thessaloniki, Greece , his parents survived the Holocaust) led the global vaccination effort. The partnership demonstrated Israel\'s advanced healthcare data infrastructure and universal health system.');
addInd('biontech-pfizer-israel-partnership', { name: "Albert Bourla", bio: "CEO of Pfizer (Jewish, born in Thessaloniki, Greece). His parents survived the Holocaust. Led the development and global distribution of the COVID-19 vaccine.", role: "Pfizer CEO" });

addConn('sodastream-israel', [
  { name: "PepsiCo", type: "parent company", description: "Acquired by PepsiCo for $3.2 billion in 2018." },
  { name: "Daniel Birnbaum", type: "CEO", description: "Daniel Birnbaum (Jewish) served as CEO, moving the factory from the West Bank to the Negev." },
  { name: "BDS controversy", type: "political", description: "Was a target of the BDS movement due to its former factory in the West Bank." },
  { name: "Scarlett Johansson", type: "endorsement", description: "Actress Scarlett Johansson was a brand ambassador who resigned from Oxfam over the BDS controversy." }
]);
updDesc('sodastream-israel', 'Israeli home carbonation company acquired by PepsiCo for $3.2 billion in 2018. Originally founded as an English company in 1903, it relocated to Israel. Former CEO Daniel Birnbaum (Jewish) moved the factory from Mishor Adumim in the West Bank to Rahat in the Negev, creating a mixed Arab-Jewish workforce. Was targeted by the BDS movement; actress Scarlett Johansson resigned as Oxfam ambassador over her SodaStream endorsement in 2014.');

// ============================================================
// SAVE
// ============================================================

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0; for(const c in data.countries) for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;}
console.log(`Done! ${tc} entries, ${wc} with connections, ${Object.keys(people.people).length} people.`);
let totalConn=0; for(const c in data.countries) for(const e of data.countries[c]) totalConn+=(e.connections||[]).length;
console.log(`Total connections: ${totalConn}`);
