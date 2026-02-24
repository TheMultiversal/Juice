// addConnections17.js - Add individuals to remaining entries (India, Mexico, Hungary, Austria, Netherlands, Belgium, Switzerland, Italy, Spain, Poland, Czech, Ukraine, Turkey, Morocco, Scandinavia, Greece, Portugal, smaller countries, International)
const fs = require('fs');
const path = require('path');
const jewishFile = path.join(__dirname, '..', 'data', 'jewish.json');
const peopleFile = path.join(__dirname, '..', 'data', 'people.json');
const data = JSON.parse(fs.readFileSync(jewishFile, 'utf8'));
const people = JSON.parse(fs.readFileSync(peopleFile, 'utf8'));
function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
const entryIndex = {};
for (const country in data.countries) { for (const entry of data.countries[country]) { entryIndex[entry.id] = { entry, country }; } }
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

// === INDIA (5) ===
addInd('central-jewish-board-of-india', { name: "Solomon Sopher", bio: "Leader of the Bene Israel community (Jewish) and figure in the Central Jewish Board of India.", role: "Community Leader" });
addInd('the-jewish-club-mumbai', { name: "Isaac Elia Jhirad", bio: "Prominent Bene Israel leader (Jewish) who served as surgeon-general in the Indian Army and advocated for the community.", role: "Historical Figure" });
addInd('knesset-eliyahoo-synagogue-mumbai', { name: "Jacob Sassoon", bio: "Built Knesset Eliyahoo Synagogue (1884) in Mumbai. Part of the Baghdadi Jewish Sassoon family who built an empire in India.", role: "Builder" });
addInd('paradesi-synagogue-kochi', { name: "Sarah Cohen", bio: "One of the last surviving Paradesi Jews (White Jews) of Cochin, whose community dates to ancient times in Kerala.", role: "Community Elder" });
addInd('bene-israel-heritage-museum-mumbai', { name: "Elijah Judah", bio: "Community figure associated with preserving the heritage of the Bene Israel, India's largest Jewish group with a 2,000+ year history.", role: "Heritage Preserver" });

// === MEXICO (5) ===
addInd('comit-central-de-la-comunidad-jud-a-de-m-xico', { name: "Marcos Shabot", bio: "President of the Comité Central de la Comunidad Judía de México (Jewish), representing Mexico's 50,000 Jews.", role: "President" });
addInd('tribuna-israelita', { name: "Laura Goldsmith", bio: "Director of Tribuna Israelita (Jewish), combating antisemitism and promoting dialogue in Mexico.", role: "Director" });
addInd('grupo-televisa-jewish-connections', { name: "Emilio Azcárraga Jean", bio: "Former chairman of Grupo Televisa, the largest media company in the Spanish-speaking world. Has business connections with Jewish entrepreneurs.", role: "Former Chairman" });
addInd('colegio-hebreo-maguen-david', { name: "Moisés Saad", bio: "Director of Colegio Hebreo Maguen David (Jewish), one of Mexico City's largest Jewish schools, serving the Syrian community.", role: "Director" });
addInd('museo-memoria-y-tolerancia', { name: "Sharon Zaga", bio: "President and founder of the Museo Memoria y Tolerancia (Jewish), Mexico City's Holocaust and tolerance museum.", role: "Founder & President" });

// === HUNGARY (6) ===
addInd('federation-of-hungarian-jewish-communities-mazsihisz', { name: "András Heisler", bio: "President of Mazsihisz (Jewish), representing Hungary's approximately 100,000 Jews, the largest community in Central Europe.", role: "President" });
addInd('doh-ny-street-synagogue-budapest', { name: "Lajos Kossuth", bio: "Designed by architect Ludwig Förster in 1854-59, with support from the Kossuth-era Hungarian liberal movement. Largest synagogue in Europe.", role: "Historical Context" });
addInd('hungarian-jewish-museum', { name: "Zsuzsanna Toronyi", bio: "Director of the Hungarian Jewish Museum and Archives (Jewish), located within the Dohány Street Synagogue complex.", role: "Director" });
addInd('shoes-on-the-danube-bank', { name: "Can Togay", bio: "Film director who conceived the Shoes on the Danube Bank memorial (2005) with sculptor Gyula Pauer, honoring 3,500 Jews shot into the Danube.", role: "Creator" });
addInd('hungarian-jewish-heritage-foundation', { name: "András Kovács", bio: "Sociologist and scholar (Jewish) leading efforts to preserve Hungary's vast Jewish architectural and cultural heritage.", role: "Leader" });
addInd('ort-hungary', { name: "Anna Szeszler", bio: "Director of ORT Hungary, providing education and training in the tradition of the global ORT network.", role: "Director" });

// === AUSTRIA (3) ===
addInd('jewish-museum-vienna', { name: "Barbara Staudinger", bio: "Director of the Jewish Museum Vienna (2022-), showcasing 1,000 years of Jewish life in Austria.", role: "Director" });
addInd('mauthausen-memorial', { name: "Barbara Glück", bio: "Director of the Mauthausen Memorial, where approximately 90,000 people were murdered, including many Jews.", role: "Director" });
addInd('stadttempel-vienna-city-temple', { name: "Joseph Kornhäusel", bio: "Architect who designed the Stadttempel (1826), Vienna's only synagogue to survive Kristallnacht because it was hidden within a residential block.", role: "Architect" });

// === NETHERLANDS (5) ===
addInd('nik-nederlands-isra-litisch-kerkgenootschap', { name: "Binyomin Jacobs", bio: "Chief Rabbi of the Netherlands (Jewish), spiritual leader of the Dutch Ashkenazi Jewish community.", role: "Chief Rabbi" });
addInd('portuguese-synagogue-of-amsterdam', { name: "Elias Bouman", bio: "Architect who designed the Portuguese Synagogue of Amsterdam (1675), built by Sephardic Jews who fled the Inquisition.", role: "Architect" });
addInd('jewish-historical-museum-amsterdam', { name: "Emile Schrijver", bio: "General Director of the Jewish Cultural Quarter Amsterdam (Jewish), including the Jewish Historical Museum.", role: "General Director" });
addInd('national-holocaust-museum-amsterdam', { name: "Emile Schrijver", bio: "Oversaw the development of the Dutch National Holocaust Museum, opened in Amsterdam in 2024.", role: "Director" });
addInd('westerbork-transit-camp-memorial', { name: "Etty Hillesum", bio: "Dutch Jewish writer whose letters and diaries from Westerbork, before her murder at Auschwitz, became celebrated Holocaust literature.", role: "Historical Figure" });

// === BELGIUM (5) ===
addInd('coordinating-committee-of-jewish-organisations-in-belgium-ccojb', { name: "Yohan Benizri", bio: "President of the CCOJB (Jewish), coordinating Belgium's Jewish organizations.", role: "President" });
addInd('antwerp-diamond-district', { name: "Nicky Oppenheimer", bio: "Former chairman of De Beers (Jewish, South African), connected to Antwerp's role as the world's diamond capital where 85% of rough diamonds are traded.", role: "Industry Figure" });
addInd('jewish-museum-of-belgium-brussels', { name: "Pascale Falek", bio: "Director of the Jewish Museum of Belgium, which was targeted in a deadly terror attack in 2014.", role: "Director" });
addInd('kazerne-dossin-memorial-mechelen', { name: "Christoph Busch", bio: "Director of Kazerne Dossin, the memorial at the former transit camp from which 25,000 Jews were deported to Auschwitz.", role: "Director" });
addInd('antwerp-jewish-community', { name: "Pinchas Kornfeld", bio: "Chief Rabbi and leader of one of Europe's most Orthodox Jewish communities, centered in Antwerp's diamond district.", role: "Chief Rabbi" });

// === SWITZERLAND (5) ===
addInd('swiss-federation-of-jewish-communities-sig-fsci', { name: "Ralph Lewin", bio: "President of the Swiss Federation of Jewish Communities (Jewish), representing 18,000 Jews in Switzerland.", role: "President" });
addInd('world-health-organization-israeli-connections', { name: "Tedros Adhanom Ghebreyesus", bio: "Director-General of WHO. Israel has advanced medical collaborations with WHO through its health tech innovations.", role: "Director-General" });
addInd('b-nai-b-rith-international-geneva-office', { name: "Daniel Mariaschin", bio: "CEO of B'nai B'rith International (Jewish), the oldest Jewish service organization (1843), with its UN office in Geneva.", role: "CEO" });
addInd('bergier-commission-legacy', { name: "Jean-François Bergier", bio: "Swiss historian who chaired the Independent Commission of Experts (1996-2002) investigating Switzerland's WWII-era dealings with Nazi Germany and dormant Jewish accounts.", role: "Commission Chair" });
addInd('international-committee-of-the-red-cross-jewish-relationship', { name: "Peter Maurer", bio: "Former president of the ICRC. The ICRC's controversial WWII role - failing to intervene for Jews - led to formal apologies and study.", role: "Former President" });

// === ITALY (7) ===
addInd('union-of-italian-jewish-communities-ucei', { name: "Noemi Di Segni", bio: "President of the Union of Italian Jewish Communities (UCEI) (Jewish), representing approximately 25,000 Italian Jews.", role: "President" });
addInd('jewish-museum-of-rome', { name: "Alessandra Di Castro", bio: "Director of the Jewish Museum of Rome, documenting Europe's oldest continuous Jewish community (since 161 BCE).", role: "Director" });
addInd('great-synagogue-of-rome', { name: "Riccardo Di Segni", bio: "Chief Rabbi of Rome (Jewish), spiritual leader at the Great Synagogue (Tempio Maggiore), built in 1904.", role: "Chief Rabbi" });
addInd('venice-ghetto', { name: "Shaul Bassi", bio: "Scholar and director of the Venice Center for Humanities and Social Change (Jewish), who has studied the Venice Ghetto - the world's first Jewish ghetto (1516).", role: "Scholar" });
addInd('synagogue-of-florence-tempio-maggiore', { name: "Joseph Levi", bio: "Rabbi of the Jewish community of Florence (Jewish), overseeing the Moorish Revival-style Tempio Maggiore (1882).", role: "Rabbi" });
addInd('jewish-museum-of-bologna', { name: "Vincenza Maugeri", bio: "Director of the Jewish Museum of Bologna, documenting Jewish life in the Emilia-Romagna region since medieval times.", role: "Director" });
addInd('community-of-sant-egidio-jewish-dialogue', { name: "Marco Impagliazzo", bio: "President of the Community of Sant'Egidio, which has led Catholic-Jewish interfaith dialogue since 1986.", role: "President" });

// === SPAIN (5) ===
addInd('federation-of-jewish-communities-of-spain', { name: "Isaac Querub", bio: "President of the Federation of Jewish Communities of Spain (Jewish), representing approximately 40,000-50,000 Jews.", role: "President" });
addInd('museum-of-sephardic-heritage-toledo', { name: "Samuel ha-Levi Abulafia", bio: "14th-century treasurer to King Peter I of Castile (Jewish) who built the Synagogue of El Tránsito (1357), now the Sephardic Museum.", role: "Historical Builder" });
addInd('c-rdoba-synagogue', { name: "Moses Maimonides", bio: "Born in Córdoba in 1138, Maimonides was the greatest medieval Jewish philosopher. A statue stands near the synagogue in the old Jewish quarter.", role: "Historical Figure" });
addInd('casa-sefarad-israel-madrid', { name: "Esther Bendahan", bio: "Director general of Casa Sefarad-Israel (Jewish), promoting Sephardic culture and Spain-Israel relations.", role: "Director General" });
addInd('federation-of-jewish-communities-of-spain-additional', { name: "Isaac Querub", bio: "President of FCJE (Jewish), advocating for Spain's Sephardic heritage and the 2015 citizenship law for Sephardic descendants.", role: "President" });

// === POLAND (6) ===
addInd('galicia-jewish-museum-krakow', { name: "Jakub Nowakowski", bio: "Director of the Galicia Jewish Museum in Kraków (Jewish), showcasing the rich Jewish heritage of Galicia.", role: "Director" });
addInd('museum-of-the-history-of-polish-jews-polin-additional-programs', { name: "Zygmunt Stępiński", bio: "Director of POLIN Museum, the award-winning museum documenting 1,000 years of Polish Jewish history.", role: "Director" });
addInd('majdanek-state-museum', { name: "Tomasz Kranz", bio: "Director of the Majdanek State Museum, where approximately 78,000 people were murdered including 59,000 Jews.", role: "Director" });
addInd('treblinka-memorial', { name: "Edward Kopówka", bio: "Director of the Museum of Struggle and Martyrdom in Treblinka, where approximately 800,000 Jews were murdered.", role: "Director" });
addInd('warsaw-ghetto-memorial', { name: "Mordechai Anielewicz", bio: "Commander of the Warsaw Ghetto Uprising (April 1943, Jewish), the largest Jewish revolt against the Nazis. Killed at age 24.", role: "Historical Hero" });
addInd('tykocin-synagogue', { name: "Izaak Malmed", bio: "Rabbi associated with the historic Tykocin Synagogue (1642), one of the best-preserved Baroque synagogues in Poland.", role: "Historical Figure" });

// === CZECH REPUBLIC (4) ===
addInd('jewish-museum-in-prague', { name: "Leo Pavlát", bio: "Former director of the Jewish Museum in Prague (Jewish), one of the oldest and most visited Jewish museums in the world.", role: "Former Director" });
addInd('old-jewish-cemetery-prague', { name: "Rabbi Judah Loew ben Bezalel", bio: "The Maharal of Prague (c. 1520-1609, Jewish), legendary rabbi buried in the Old Jewish Cemetery, associated with the Golem legend.", role: "Historical Figure" });
addInd('pinkas-synagogue-prague-holocaust-memorial', { name: "Jiří Fiedler", bio: "Czech researcher and documenter of Jewish heritage sites, whose work helped catalog the 77,297 names inscribed on the synagogue walls.", role: "Researcher" });
addInd('terez-n-memorial', { name: "Jan Munk", bio: "Director of the Terezín Memorial, commemorating the ghetto/transit camp where 33,000 Jews died and 88,000 were deported to death camps.", role: "Director" });

// === UKRAINE (4) ===
addInd('jewish-confederation-of-ukraine', { name: "Boris Lozhkin", bio: "President of the Jewish Confederation of Ukraine (Jewish), businessman and former head of the Presidential Administration of Ukraine.", role: "President" });
addInd('babyn-yar-holocaust-memorial-center', { name: "Natan Sharansky", bio: "Former Soviet dissident, Israeli politician (Jewish), and chairman of the Babyn Yar Holocaust Memorial Center supervisory board.", role: "Board Chairman" });
addInd('united-jewish-community-of-ukraine', { name: "Meylakh Sheykhet", bio: "Representative of the Union of Jewish Religious Organizations of Ukraine, active in heritage preservation.", role: "Representative" });
addInd('golden-rose-synagogue-lviv-ruins', { name: "Isaac ben Nachman", bio: "Builder of the original Golden Rose Synagogue (1582) in Lviv, one of the earliest stone synagogues in Eastern Europe. Destroyed by Nazis in 1943.", role: "Historical Builder" });

// === TURKEY (4) ===
addInd('quincentennial-foundation-museum-istanbul', { name: "Naim Güleryüz", bio: "Historian and author (Jewish, Turkish) who documented the 500-year history of Turkish Jewry since the 1492 Spanish expulsion.", role: "Historian" });
addInd('neve-shalom-synagogue-istanbul', { name: "İshak Haleva", bio: "Hakham Bashi (Chief Rabbi) of Turkey (Jewish), spiritual leader of the Turkish Jewish community.", role: "Chief Rabbi" });
addInd('ahrida-synagogue-istanbul', { name: "Bayezid II", bio: "Ottoman Sultan who welcomed Sephardic Jews expelled from Spain in 1492, famously saying Ferdinand of Spain made his own country poor.", role: "Historical Protector" });
addInd('turkish-jewish-community', { name: "İshak Haleva", bio: "Hakham Bashi (Chief Rabbi) of Turkey (Jewish), leading approximately 15,000 Jews, mostly in Istanbul.", role: "Chief Rabbi" });

// === MOROCCO (4) ===
addInd('museum-of-moroccan-judaism-casablanca', { name: "Zhor Rehihil", bio: "Curator of the Museum of Moroccan Judaism (Muslim), the only Jewish museum in the Arab world, demonstrating Moroccan interfaith respect.", role: "Curator" });
addInd('bayt-dakira-house-of-memory-essaouira', { name: "André Azoulay", bio: "Senior advisor to King Mohammed VI (Jewish, Moroccan), champion of interfaith dialogue and the Bayt Dakira heritage project.", role: "Royal Advisor" });
addInd('casablanca-jewish-heritage-trail', { name: "Serge Berdugo", bio: "Secretary-General of the Council of Jewish Communities of Morocco (Jewish), ambassador-at-large.", role: "Secretary-General" });
addInd('rabbi-haim-pinto-synagogue-essaouira', { name: "Rabbi Haim Pinto", bio: "18th-century Moroccan rabbi (Jewish) revered as a miracle worker; his yahrzeit draws thousands of pilgrims to Essaouira.", role: "Historical Rabbi" });

// === SCANDINAVIA ===
addInd('official-council-of-swedish-jewish-communities', { name: "Aron Verständig", bio: "Chairman of the Official Council of Swedish Jewish Communities (Jewish), representing approximately 15,000 Swedish Jews.", role: "Chairman" });
addInd('jewish-museum-stockholm', { name: "Petra Kahn Nord", bio: "Director of the Jewish Museum in Stockholm, documenting Jewish life in Sweden since the 18th century.", role: "Director" });
addInd('great-synagogue-of-stockholm', { name: "Ute Steyer", bio: "Rabbi of the Great Synagogue of Stockholm (Jewish), serving Sweden's largest Jewish community.", role: "Rabbi" });
addInd('jewish-community-of-denmark', { name: "Dan Rosenberg Asmussen", bio: "Chairman of the Jewish Community of Denmark (Jewish), representing approximately 6,000 Danish Jews.", role: "Chairman" });
addInd('great-synagogue-of-copenhagen', { name: "Yair Melchior", bio: "Chief Rabbi of Denmark (Jewish), spiritual leader of the Danish Jewish community.", role: "Chief Rabbi" });
addInd('rescue-of-danish-jews-1943', { name: "Georg Ferdinand Duckwitz", bio: "German diplomat who warned Danish Jews of the planned Nazi roundup in October 1943, enabling the rescue of 7,200 Jews by boat to Sweden.", role: "Historical Rescuer" });
addInd('jewish-community-of-oslo', { name: "Ervin Kohn", bio: "President of the Jewish Community of Oslo (Jewish), representing Norway's approximately 1,500 Jews.", role: "President" });
addInd('jewish-museum-trondheim', { name: "Guri Hjeltnes", bio: "Director associated with documenting Norway's Jewish history, including the deportation of Norwegian Jews during WWII.", role: "Scholar" });
addInd('center-for-studies-of-the-holocaust-and-religious-minorities-hl-senteret', { name: "Guri Hjeltnes", bio: "Former director of HL-senteret, Norway's center for Holocaust and minority studies, located in the former residence of Vidkun Quisling.", role: "Former Director" });
addInd('central-council-of-jewish-communities-in-finland', { name: "Yaron Nadbornik", bio: "Chairman of the Central Council of Jewish Communities in Finland (Jewish), representing approximately 1,300 Finnish Jews.", role: "Chairman" });

// === GREECE (5) ===
addInd('central-board-of-jewish-communities-in-greece', { name: "David Saltiel", bio: "President of the Central Board of Jewish Communities in Greece (Jewish), representing approximately 5,000 Greek Jews.", role: "President" });
addInd('jewish-museum-of-greece', { name: "Zanet Battinou", bio: "Director of the Jewish Museum of Greece in Athens, documenting 2,300 years of Greek Jewish (Romaniote) history.", role: "Director" });
addInd('jewish-museum-of-thessaloniki', { name: "Erika Perahia-Zemour", bio: "Director of the Jewish Museum of Thessaloniki (Jewish), documenting the city once known as 'Mother of Israel' for its vast Jewish population.", role: "Director" });
addInd('holocaust-memorial-of-thessaloniki', { name: "Yitzchak Kerem", bio: "Scholar of Greek Jewish history. The memorial honors 50,000 Thessaloniki Jews deported to Auschwitz in 1943 - 96% of the community.", role: "Scholar" });
addInd('romaniote-jewish-community', { name: "Marcia Haddad Ikonomopoulos", bio: "Founder of Kehila Kedosha Janina (Jewish), the only Romaniote synagogue in the Western Hemisphere, in New York.", role: "Community Preservationist" });

// === PORTUGAL (3) ===
addInd('jewish-community-of-lisbon', { name: "José Oulman Carp", bio: "President of the Jewish Community of Lisbon (Jewish), representing Portugal's approximately 3,000 Jews.", role: "President" });
addInd('sinagoga-kadoorie-mekor-haim-porto', { name: "Captain Barros Basto", bio: "Portuguese army officer (Jewish) who led the 'Rescue' movement to reconnect crypto-Jews (Bnei Anusim) with Judaism in the 1920s-30s.", role: "Historical Leader" });
addInd('museu-judaico-de-belmonte', { name: "Samuel Schwarz", bio: "Jewish-Polish mining engineer who in 1917 discovered the crypto-Jewish community of Belmonte, which had secretly practiced Judaism for 500 years.", role: "Discoverer" });

// === REMAINING SMALL COUNTRIES ===

// Iran
addInd('tehran-jewish-committee', { name: "Homayoun Sameyah Najafabadi", bio: "Jewish member of the Iranian Majlis (parliament), holding the constitutionally guaranteed seat for the Jewish community.", role: "Parliamentarian" });

// Ethiopia
addInd('beta-israel-community-organizations', { name: "Avraham Neguise", bio: "Ethiopian-born Israeli politician (Jewish), first Ethiopian-born member of the Knesset, advocate for Ethiopian Jewish rights.", role: "Community Champion" });
addInd('north-shewa-synagogue', { name: "Qes Hadane", bio: "One of the last kessim (Bete Israel religious leaders) who served the North Shewa community before emigration.", role: "Kess (Religious Leader)" });
addInd('operation-solomon-memorial', { name: "Uri Lubrani", bio: "Israeli diplomat (Jewish) who coordinated Operation Solomon, the dramatic 36-hour airlift of 14,325 Ethiopian Jews in 1991.", role: "Operation Coordinator" });

// Japan
addInd('jewish-community-of-japan', { name: "Binyamin Edery", bio: "Chabad rabbi serving the Jewish community of Japan, based in Tokyo.", role: "Rabbi" });
addInd('kobe-jewish-community', { name: "Anatole Ponevejsky", bio: "Leader of the Kobe Jewish community (Jewcom) during WWII who helped coordinate aid for Jewish refugees transiting through Japan.", role: "Historical Leader" });

// China
addInd('shanghai-jewish-refugees-museum', { name: "Chen Jian", bio: "Former curator of the Shanghai Jewish Refugees Museum, documenting the stories of 20,000 Jewish refugees.", role: "Former Curator" });
addInd('kaifeng-jewish-community', { name: "Shi Lei", bio: "One of the Kaifeng Jewish descendants who reconnected with Judaism and made aliyah to Israel.", role: "Community Representative" });
addInd('sassoon-house-shanghai', { name: "Sir Victor Sassoon", bio: "Jewish businessman of Baghdadi origin, built the Cathay Hotel (now Fairmont Peace Hotel) and was one of the wealthiest men in Asia.", role: "Builder" });
addInd('ohel-rachel-synagogue-shanghai', { name: "Sir Jacob Elias Sassoon", bio: "Jewish businessman of Baghdadi origin who built the Ohel Rachel Synagogue (1920), the largest synagogue in East Asia.", role: "Builder" });

// Panama, Uruguay, Chile, Colombia
addInd('kol-shearith-israel', { name: "Gustavo Kraselnik", bio: "Former president of the Panama Jewish community, editor of Shalom Panama magazine.", role: "Community Leader" });
addInd('comit-central-israelita-del-uruguay', { name: "Ricardo Lackner", bio: "Former president of the Comité Central Israelita del Uruguay (Jewish).", role: "Former President" });
addInd('comunidad-jud-a-de-chile', { name: "Gerardo Gorodischer", bio: "President of the Comunidad Judía de Chile (Jewish), representing 18,000 Chilean Jews.", role: "President" });
addInd('confederaci-n-de-comunidades-jud-as-de-colombia', { name: "Marco Peckel", bio: "Former president of the Confederación de Comunidades Judías de Colombia (Jewish).", role: "Former President" });

// New Zealand, Romania, Hong Kong, Cuba, Kenya
addInd('new-zealand-jewish-council', { name: "Juliet Moses", bio: "Spokesperson for the New Zealand Jewish Council (Jewish), prominent advocate against antisemitism.", role: "Spokesperson" });
addInd('federation-of-jewish-communities-in-romania', { name: "Silviu Vexler", bio: "Jewish member of the Romanian Parliament, holding the dedicated minority seat, active in Holocaust remembrance.", role: "Parliamentarian" });
addInd('jewish-historical-society-of-hong-kong', { name: "Dennis Leventhal", bio: "Founder and president of the Jewish Historical Society of Hong Kong, documenting 175 years of Jewish life.", role: "Founder & President" });
addInd('ohel-leah-synagogue', { name: "Michael Kadoorie", bio: "Sir Michael Kadoorie (Jewish, Baghdadi origin), billionaire businessman and patron of the Ohel Leah Synagogue in Hong Kong.", role: "Patron" });
addInd('patronato-de-la-casa-de-la-comunidad-hebrea-de-cuba', { name: "Adela Dworin", bio: "Longtime president of Havana's Jewish community (Jewish), keeping the community alive through decades of the Castro era.", role: "President" });
addInd('nairobi-hebrew-congregation', { name: "Alexander Wandersman", bio: "Community leader of the Nairobi Hebrew Congregation, serving East Africa's small Jewish community.", role: "Community Leader" });

// UAE, Bahrain
addInd('abrahamic-family-house-abu-dhabi', { name: "Ahmed el-Tayeb", bio: "Grand Imam of Al-Azhar who co-signed the Document on Human Fraternity, inspiring the Abrahamic Family House.", role: "Co-Inspirer" });
addInd('kosher-restaurants-and-community-in-dubai', { name: "Elli Kriel", bio: "South African-born chef (Jewish) who pioneered Dubai's kosher dining scene, creating 'Elli's Kosher Kitchen.'", role: "Pioneer Chef" });
addInd('jewish-community-of-bahrain', { name: "Houda Nonoo", bio: "First Jewish ambassador from any Arab country, serving as Bahrain's ambassador to the US (2008-2013).", role: "Ambassador" });

// Ireland, Croatia, Serbia, Bulgaria, Tunisia
addInd('jewish-representative-council-of-ireland', { name: "Maurice Cohen", bio: "Former president of the Jewish Representative Council of Ireland, representing approximately 2,500 Irish Jews.", role: "Former President" });
addInd('irish-jewish-museum-dublin', { name: "Chaim Herzog", bio: "6th President of Israel (1983-1993, Jewish), born in Belfast and raised in Dublin; his father was Chief Rabbi of Ireland.", role: "Historical Connection" });
addInd('jewish-community-of-zagreb', { name: "Ognjen Kraus", bio: "President of the Jewish community of Zagreb and the Coordination of Jewish Communities in Croatia (Jewish).", role: "President" });
addInd('federation-of-jewish-communities-in-serbia', { name: "Robert Sabadoš", bio: "President of the Federation of Jewish Communities in Serbia (Jewish).", role: "President" });
addInd('organization-of-the-jews-in-bulgaria', { name: "Oscar Asenov", bio: "President of the Organization of the Jews in Bulgaria 'Shalom' (Jewish).", role: "President" });
addInd('el-ghriba-synagogue-djerba', { name: "Perez Trabelsi", bio: "Leader of the Jewish community of Djerba (Jewish), overseeing the annual El Ghriba pilgrimage.", role: "Community Leader" });

// Azerbaijan, Georgia, Uzbekistan, Peru, Venezuela
addInd('mountain-jewish-community-of-azerbaijan', { name: "Milikh Yevdayev", bio: "Leader of the Mountain Jewish community in Azerbaijan, based at the Red Settlement (Qırmızı Qəsəbə).", role: "Community Leader" });
addInd('georgian-jewish-community', { name: "Ariel Levin", bio: "Chief Rabbi of Georgia (Jewish), serving the remaining Georgian Jewish community.", role: "Chief Rabbi" });
addInd('bukharan-jewish-community', { name: "Roshel Rubinov", bio: "Last chief rabbi of the Bukharan Jewish community in Uzbekistan before mass emigration.", role: "Former Chief Rabbi" });
addInd('asociaci-n-jud-a-del-per', { name: "Jaime Braun", bio: "Former president of Asociación Judía del Perú (Jewish), leading Lima's approximately 2,500 Jews.", role: "Former President" });
addInd('confederaci-n-de-asociaciones-israelitas-de-venezuela-caiv', { name: "David Bittan", bio: "Former president of CAIV (Jewish), leading the Venezuelan Jewish community during challenging political times.", role: "Former President" });

// Costa Rica, Guatemala, Ecuador, Bolivia
addInd('centro-israelita-sionista-de-costa-rica', { name: "Jaime Gutman", bio: "Leader of the Centro Israelita Sionista de Costa Rica (Jewish), representing 2,500 Costa Rican Jews.", role: "Leader" });
addInd('comunidad-jud-a-de-guatemala', { name: "Yaffa Grazioso", bio: "Community leader of the Comunidad Judía de Guatemala (Jewish).", role: "Community Leader" });
addInd('comunidad-jud-a-del-ecuador', { name: "Samuel Benchoam", bio: "Community leader of the Comunidad Judía del Ecuador (Jewish), based in Quito.", role: "Community Leader" });
addInd('comunidad-israelita-de-bolivia-circulo-israelita', { name: "Ricardo Udler", bio: "President of the Círculo Israelita de Bolivia (Jewish), leading La Paz's small Jewish community.", role: "President" });

// Dominican Republic, Jamaica
addInd('jewish-community-of-sos-a', { name: "Luis Hess", bio: "One of the original Jewish refugees who settled in Sosúa in the 1940s and built the dairy cooperative.", role: "Original Settler" });
addInd('museo-jud-o-de-sos-a', { name: "Luis Hess", bio: "Descendant of original Sosúa settlers involved in preserving the museum's story.", role: "Heritage Preservationist" });
addInd('united-congregation-of-israelites', { name: "Ainsley Henriques", bio: "Historian and leader of Jamaica's Jewish community (Jewish), expert on Caribbean Sephardic history.", role: "Community Leader" });

// Thailand, Philippines, South Korea, Vietnam, Taiwan
addInd('jewish-association-of-thailand', { name: "Yosef Kantor", bio: "Chabad rabbi serving Thailand (Jewish), operating one of the world's largest Chabad networks outside Israel.", role: "Rabbi" });
addInd('jewish-association-of-the-philippines', { name: "Ilan Fluss", bio: "Community leader of the Jewish Association of the Philippines, serving Manila's small Jewish community.", role: "Community Leader" });
addInd('jewish-community-of-south-korea', { name: "Osher Litzman", bio: "Chabad rabbi serving South Korea (Jewish), based in Seoul.", role: "Rabbi" });
addInd('chabad-vietnam', { name: "Menachem Hartman", bio: "Chabad rabbi serving Vietnam (Jewish), providing Jewish services in Ho Chi Minh City.", role: "Rabbi" });
addInd('jewish-community-of-taiwan', { name: "Shlomi Tabib", bio: "Chabad rabbi serving Taiwan (Jewish), leading the small community in Taipei.", role: "Rabbi" });

// Africa
addInd('igbo-jewish-community', { name: "Howard Gorin", bio: "Rabbi who has visited and supported the Igbo Jewish community in Nigeria, helping with education and formal conversion.", role: "Supporting Rabbi" });
addInd('zimbabwe-jewish-community', { name: "Moira Chipkin", bio: "Community leader in the Zimbabwe Jewish community, managing affairs as the community has dwindled.", role: "Community Leader" });
addInd('lubumbashi-jewish-community', { name: "Simone Awerbach", bio: "One of the last remaining members of the Lubumbashi Jewish community in the DRC.", role: "Community Member" });
addInd('windhoek-jewish-community', { name: "Zvi Gorelick", bio: "Community leader of the small Jewish community of Windhoek, Namibia.", role: "Community Leader" });
addInd('house-of-israel-ghana', { name: "Aaron Ahomtre Toakyirafa", bio: "Spiritual leader of the House of Israel (Jewish), the practicing Jewish community in Ghana's Sefwi Wiawso area.", role: "Spiritual Leader" });

// Egypt, Syria, Iraq, Yemen, Libya, Lebanon, Myanmar
addInd('egyptian-jewish-community-historic', { name: "Magda Haroun", bio: "President of the Egyptian Jewish Community (Jewish), managing affairs for the fewer than 10 remaining Jews in Egypt.", role: "Community President" });
addInd('ben-ezra-synagogue-cairo', { name: "Solomon Schechter", bio: "Rabbinical scholar (Jewish, Romanian-born) who discovered and removed the Cairo Geniza - 400,000 manuscript fragments - from Ben Ezra Synagogue in 1896.", role: "Geniza Discoverer" });
addInd('syrian-jewish-heritage-aleppo-damascus', { name: "Jack Saul", bio: "Representative of the Syrian Jewish community in Brooklyn (Jewish), which has grown to over 60,000 and preserves Syrian traditions.", role: "Diaspora Leader" });
addInd('iraqi-jewish-community-historic', { name: "Naim Dangoor", bio: "Sir Naim Dangoor (1914-2015, Jewish), Iraqi-born British businessman and philanthropist who preserved Iraqi Jewish heritage.", role: "Heritage Preservationist" });
addInd('babylonian-jewry-heritage-center-israel', { name: "Mordechai Ben-Porat", bio: "Israeli politician (Jewish, Iraqi-born) who was involved in organizing the mass immigration of Iraqi Jews to Israel.", role: "Historical Figure" });
addInd('yemeni-jewish-community-historic', { name: "Rabbi Yihya Yitzhak Halevi", bio: "Former chief rabbi of Yemen (Jewish), one of the last religious leaders of the ancient Yemeni Jewish community.", role: "Former Chief Rabbi" });
addInd('libyan-jewish-community-historic', { name: "Raffaello Fellah", bio: "Chairman of the World Organization of Libyan Jews (Jewish), preserving the memory and heritage of Libyan Jewry.", role: "Chairman" });
addInd('lebanese-jewish-community-historic', { name: "Isaac Arazi", bio: "One of the last known remaining Jews in Lebanon, whose family once thrived in Beirut's vibrant Jewish quarter.", role: "Community Remnant" });
addInd('musmeah-yeshua-synagogue-yangon', { name: "Moses Samuels", bio: "Self-appointed caretaker of the Musmeah Yeshua Synagogue (Jewish), one of the last Jews in Myanmar, dedicated decades to preserving the synagogue.", role: "Caretaker" });

// Curaçao, Suriname, Gibraltar
addInd('mikv-israel-emanuel-synagogue', { name: "Rabbi Haim Mendes Chumaceiro", bio: "19th-century rabbi of Mikvé Israel-Emanuel (Jewish), leading the oldest continuous congregation in the Western Hemisphere.", role: "Historical Rabbi" });
addInd('jodensavanne-archaeological-site', { name: "Samuel Nassy", bio: "Sephardic Jewish plantation owner who was among the founders of the Jodensavanne settlement in 17th-century Suriname.", role: "Historical Founder" });
addInd('neve-shalom-synagogue-paramaribo', { name: "René Fernandes", bio: "Community leader of the small Jewish community of Paramaribo, Suriname.", role: "Community Leader" });
addInd('jewish-community-of-gibraltar', { name: "Rabbi Ronnie Hassid", bio: "Chief Rabbi of Gibraltar (Jewish), leading one of the world's highest per-capita Jewish communities.", role: "Chief Rabbi" });

// === INTERNATIONAL (13) ===
addInd('world-ort', { name: "Robert Singer", bio: "Former CEO of World ORT (Jewish), overseeing the global Jewish education network serving 300,000+ students.", role: "Former CEO" });
addInd('maccabi-world-union', { name: "Amir Peled", bio: "Chairman of Maccabi World Union (Jewish), overseeing the Maccabiah Games and global Maccabi sports network.", role: "Chairman" });
addInd('claims-conference-conference-on-jewish-material-claims-against-germany', { name: "Gideon Taylor", bio: "President of the Claims Conference (Jewish), overseeing distribution of over $80 billion in German reparations.", role: "President" });
addInd('international-holocaust-remembrance-alliance-ihra', { name: "Kerry Whigham", bio: "Scholar involved with IHRA, the 35-member intergovernmental body promoting Holocaust education. IHRA's antisemitism definition has been widely adopted.", role: "Scholar" });
addInd('march-of-the-living', { name: "Phyllis Heideman", bio: "President of the International March of the Living (Jewish), leading the annual march from Auschwitz to Birkenau.", role: "President" });
addInd('limmud-international', { name: "Clive Lawton", bio: "Co-founder of Limmud (Jewish), the volunteer-run Jewish learning movement now operating in 40+ countries.", role: "Co-Founder" });
addInd('keren-hayesod-united-israel-appeal', { name: "Sam Grundwerg", bio: "World Chairman of Keren Hayesod (Jewish), the principal fundraising organization for Israel.", role: "World Chairman" });
addInd('world-mizrachi', { name: "Rabbi Doron Perez", bio: "Executive Chairman of World Mizrachi (Jewish), leading the Religious Zionist movement globally.", role: "Executive Chairman" });
addInd('international-march-of-the-living', { name: "Shmuel Rosenman", bio: "Founder and Chairman of the International March of the Living (Jewish), organizing the annual event since 1988.", role: "Founder & Chairman" });
addInd('aleph-institute', { name: "Rabbi Sholom Lipskar", bio: "Founder and president of the Aleph Institute (Jewish), established at the Lubavitcher Rebbe's direction to serve Jewish prisoners.", role: "Founder" });
addInd('aish-hatorah', { name: "Rabbi Noach Weinberg", bio: "Founder of Aish HaTorah (1930-2009, Jewish), one of the most influential Jewish outreach (kiruv) leaders in modern history.", role: "Founder" });
addInd('ohr-somayach', { name: "Rabbi Nota Schiller", bio: "Co-founder and Dean of Ohr Somayach (Jewish), pioneering the baal teshuva yeshiva concept.", role: "Co-Founder & Dean" });
addInd('jdc-american-jewish-joint-distribution-committee-global', { name: "Ariel Zwang", bio: "CEO of JDC (Jewish), the world's leading Jewish humanitarian organization, serving in 70+ countries.", role: "CEO" });

// === SAVE ===
fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let noInd=0; for(const c in data.countries) for(const e of data.countries[c]) if(!e.individuals||e.individuals.length===0) noInd++;
console.log(`Done! People: ${Object.keys(people.people).length}. Entries without individuals: ${noInd}`);
