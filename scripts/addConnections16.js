// addConnections16.js - Add individuals to Europe, Canada, Australia, Russia entries
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

// === UK (9) ===
addInd('community-security-trust-cst', { name: "Gerald Ronson", bio: "Jewish-British businessman and property developer, long-time supporter and co-president of the Community Security Trust.", role: "Co-President" });
addInd('uk-jewish-film-festival', { name: "Judy Ironside", bio: "Founder of the UK Jewish Film Festival, showcasing Jewish-themed cinema since 1997.", role: "Founder" });
addInd('london-school-of-jewish-studies-lsjs', { name: "Raphael Zarum", bio: "Dean of the London School of Jewish Studies (Jewish), a leading center for Jewish education and scholarship in the UK.", role: "Dean" });
addInd('jews-college-heythrop-association', { name: "Nathan Marcus Adler", bio: "Chief Rabbi who founded Jews' College in 1856 as a seminary for training Orthodox rabbis in England.", role: "Founder" });
addInd('union-of-jewish-students-ujs', { name: "Edward Isaacs", bio: "President of the Union of Jewish Students, representing Jewish students across UK and Ireland campuses.", role: "President" });
addInd('the-rothschild-archive', { name: "Mayer Amschel Rothschild", bio: "Founded the Rothschild banking dynasty in Frankfurt in the 18th century, whose descendants became the most influential Jewish family in European history.", role: "Dynasty Founder" });
addInd('manchester-jewish-museum', { name: "Max Dunbar", bio: "CEO of Manchester Jewish Museum, housed in a restored 1874 Spanish and Portuguese synagogue.", role: "CEO" });
addInd('jewish-museum-london', { name: "Abigail Morris", bio: "Director of the Jewish Museum London, exploring Jewish life, history, and identity in Britain since 1932.", role: "Director" });
addInd('bevis-marks-synagogue', { name: "Moses de Medina", bio: "Key figure in establishing Bevis Marks Synagogue (1701), the oldest synagogue in Britain still in use.", role: "Historical Founder" });

// === FRANCE (14) ===
addInd('fondation-pour-la-m-moire-de-la-shoah', { name: "Simone Veil", bio: "Holocaust survivor (Jewish, French), first president of the Fondation pour la Mémoire de la Shoah, and first president of the European Parliament.", role: "First President" });
addInd('spcj-service-de-protection-de-la-communaut-juive', { name: "Sammy Ghozlan", bio: "Founder and former president of SPCJ (Jewish), providing security services for French Jewish institutions.", role: "Founder" });
addInd('m-morial-de-la-shoah-paris', { name: "Jacques Fredj", bio: "Director of the Mémorial de la Shoah in Paris (Jewish), Europe's largest Holocaust documentation center.", role: "Director" });
addInd('ose-uvre-de-secours-aux-enfants', { name: "Andrée Salomon", bio: "OSE leader (Jewish) who organized the rescue of hundreds of Jewish children in France during WWII.", role: "Historical Rescuer" });
addInd('uejf-union-of-jewish-students-of-france', { name: "Samuel Lejoyeux", bio: "Former president of UEJF, France's Jewish student union fighting antisemitism on campuses.", role: "Former President" });
addInd('radio-j-radio-shalom', { name: "Emmanuel Rials", bio: "Director of Radio J, France's leading Jewish radio station serving the largest Jewish community in Europe.", role: "Director" });
addInd('bureau-national-de-vigilance-contre-l-antis-mitisme-bnvca', { name: "Sammy Ghozlan", bio: "Founder of BNVCA (Jewish), monitoring and reporting antisemitic incidents across France.", role: "Founder" });
addInd('fonds-social-juif-unifi-fsju', { name: "Ariel Goldmann", bio: "President of the FSJU (Jewish), funding social programs for France's 450,000+ Jewish community.", role: "President" });
addInd('synagogue-de-la-victoire-paris', { name: "Zadoc Kahn", bio: "Grand Rabbi of France (1889-1905, Jewish) who was based at the Grand Synagogue of Paris (La Victoire).", role: "Historic Grand Rabbi" });
addInd('bpifrance-french-israeli-business-networks', { name: "Nicolas Dufourcq", bio: "CEO of Bpifrance, the French public investment bank supporting French-Israeli business partnerships.", role: "CEO" });
addInd('keren-hayesod-france', { name: "Claude Hampel", bio: "President of Keren Hayesod France, raising funds for Israel across the French Jewish community.", role: "President" });
addInd('sodexo-israel-operations', { name: "Sophie Bellon", bio: "Chairwoman and CEO of Sodexo, the French multinational food services company with operations in Israel.", role: "Chairwoman & CEO" });
addInd('grand-synagogue-of-paris-la-victoire', { name: "Haïm Korsia", bio: "Grand Rabbi of France (Jewish), based at the Grand Synagogue of Paris. Elected in 2014.", role: "Grand Rabbi of France" });
addInd('drancy-internment-camp-memorial', { name: "Annette Wieviorka", bio: "French-Jewish historian specializing in the Holocaust, who has written extensively about Drancy where 67,000 Jews were interned.", role: "Scholar" });

// === CANADA (8) ===
addInd('jewish-federations-of-canada-uia', { name: "Nikki Holland", bio: "CEO of Jewish Federations of Canada - UIA, the national umbrella for Canadian Jewish community organizations.", role: "CEO" });
addInd('canadian-jewish-news', { name: "Yoni Goldstein", bio: "Editor of the Canadian Jewish News, Canada's leading Jewish newspaper since 1960.", role: "Editor" });
addInd('uja-federation-of-greater-toronto', { name: "Adam Minsky", bio: "President and CEO of UJA Federation of Greater Toronto, serving Canada's largest Jewish community (~200,000).", role: "President & CEO" });
addInd('federation-cja-montreal', { name: "Yair Szlak", bio: "President and CEO of Federation CJA, serving Montreal's Jewish community (~90,000).", role: "President & CEO" });
addInd('mount-sinai-hospital-toronto', { name: "Joseph Mapa", bio: "Former CEO of Mount Sinai Hospital Toronto, founded in 1923 to serve the Jewish community.", role: "Former CEO" });
addInd('montreal-holocaust-museum', { name: "Alice Herscovitch", bio: "Former Executive Director of the Montreal Holocaust Museum, preserving survivor testimonies.", role: "Former Director" });
addInd('vancouver-holocaust-education-centre', { name: "Nina Krieger", bio: "Executive Director of the Vancouver Holocaust Education Centre, founded by Holocaust survivors.", role: "Executive Director" });
addInd('toronto-hebrew-memorial-park', { name: "Benjamin Basman", bio: "Rabbi and community leader associated with Toronto Hebrew Memorial Park, one of Canada's major Jewish cemeteries.", role: "Community Leader" });

// === AUSTRALIA (8) ===
addInd('zionist-federation-of-australia', { name: "Jeremy Leibler", bio: "President of the Zionist Federation of Australia (Jewish), leading advocate for Israel in the Australian Jewish community.", role: "President" });
addInd('jewish-community-council-of-victoria-jccv', { name: "Jennifer Huppert", bio: "President of the Jewish Community Council of Victoria (Jewish), representing 60,000 Jews in Melbourne.", role: "President" });
addInd('nsw-jewish-board-of-deputies', { name: "David Ossip", bio: "President of the NSW Jewish Board of Deputies, representing the Jewish community of New South Wales.", role: "President" });
addInd('the-australian-jewish-news', { name: "Zeddy Lawrence", bio: "Editor of The Australian Jewish News, the community's primary newspaper since 1895.", role: "Editor" });
addInd('jewish-museum-of-australia', { name: "Helen Light", bio: "Former director of the Jewish Museum of Australia in Melbourne's St Kilda neighborhood.", role: "Former Director" });
addInd('sydney-jewish-museum', { name: "Norman Seligman", bio: "Co-founder of the Sydney Jewish Museum (Jewish), Holocaust survivor who helped establish the museum's survivor testimony program.", role: "Co-Founder" });
addInd('mount-scopus-memorial-college', { name: "Rabbi John Levi", bio: "Prominent Australian rabbi (Jewish) associated with Jewish education including Mount Scopus Memorial College in Melbourne.", role: "Community Figure" });
addInd('moriah-college-sydney', { name: "John Hamey", bio: "Principal of Moriah College, one of Australia's largest Jewish day schools in Sydney.", role: "Principal" });

// === GERMANY (10) ===
addInd('j-dische-gemeinde-zu-berlin-jewish-community-of-berlin', { name: "Gideon Joffe", bio: "Chairman of the Jewish Community of Berlin (Jewish), the largest Jewish community in Germany.", role: "Chairman" });
addInd('abraham-geiger-college', { name: "Abraham Geiger", bio: "19th-century German rabbi (Jewish) regarded as the founder of Reform Judaism. The college, founded in 1999, is named after him.", role: "Namesake" });
addInd('allgemeine-rabbinerkonferenz-general-rabbinical-conference', { name: "Andreas Nachama", bio: "Chair of the Allgemeine Rabbinerkonferenz (Jewish), the General Rabbinical Conference of Germany.", role: "Chair" });
addInd('j-dische-allgemeine', { name: "Philipp Peyman Engel", bio: "Editor-in-chief of the Jüdische Allgemeine (Jewish), Germany's main Jewish weekly newspaper.", role: "Editor-in-Chief" });
addInd('zentralwohlfahrtsstelle-der-juden-in-deutschland', { name: "Aron Schuster", bio: "Director of the Zentralwohlfahrtsstelle (Jewish), the central welfare organization of Jews in Germany.", role: "Director" });
addInd('european-maccabi-games', { name: "Alon Meyer", bio: "President of Makkabi Deutschland (Jewish), organizing German Jewish athletes for the European Maccabi Games.", role: "President" });
addInd('moses-mendelssohn-center-for-european-jewish-studies', { name: "Moses Mendelssohn", bio: "German-Jewish philosopher (1729-1786), the father of the Jewish Enlightenment (Haskalah). The center bears his name.", role: "Namesake" });
addInd('leo-baeck-institute-germany', { name: "Leo Baeck", bio: "Rabbi Leo Baeck (1873-1956, Jewish), leader of German Jewry during the Nazi period, survived Theresienstadt. The institute preserves German-Jewish heritage.", role: "Namesake" });
addInd('sachsenhausen-memorial', { name: "Günter Morsch", bio: "Former director of the Sachsenhausen Memorial, where over 200,000 people were imprisoned including many Jews.", role: "Former Director" });
addInd('neue-synagoge-berlin', { name: "Eduard Knoblauch", bio: "Architect who designed the original Neue Synagoge (1866) in Moorish Revival style. It was damaged in Kristallnacht and WWII, later partially restored.", role: "Original Architect" });

// === RUSSIA (7) ===
addInd('jewish-museum-and-tolerance-center-moscow', { name: "Alexander Boroda", bio: "President of the Federation of Jewish Communities of Russia (Jewish), overseeing the museum.", role: "FJCR President" });
addInd('moscow-choral-synagogue', { name: "Pinchas Goldschmidt", bio: "Former Chief Rabbi of Moscow (Jewish), served for over 30 years before leaving Russia in 2022 over the Ukraine invasion.", role: "Former Chief Rabbi" });
addInd('nornickel-vladimir-potanin', { name: "Vladimir Potanin", bio: "Russian oligarch and president of Nornickel, the world's largest nickel and palladium producer. While not Jewish, has connections to Jewish business networks.", role: "President" });
addInd('rusal-oleg-deripaska', { name: "Oleg Deripaska", bio: "Russian oligarch and founder of Rusal, the world's second-largest aluminum producer. His business dealings intersect with Jewish magnates.", role: "Founder" });
addInd('synagogue-on-bolshaya-bronnaya-moscow', { name: "Adolf Shayevich", bio: "Chief Rabbi of Russia (Jewish), associated with the Moscow synagogues and Russian Jewish institutional life.", role: "Chief Rabbi" });
addInd('grand-choral-synagogue-st-petersburg', { name: "Mark Grubarg", bio: "Chief Rabbi of St. Petersburg (Jewish), serving the Grand Choral Synagogue, built in 1893 in Moorish Revival style.", role: "Chief Rabbi" });
addInd('gorbi-jewish-heritage-research-group', { name: "Mikhail Chlenov", bio: "Russian-Jewish ethnographer and Secretary General of the Euro-Asian Jewish Congress.", role: "Scholar" });

// === ARGENTINA (9) ===
addInd('daia-delegaci-n-de-asociaciones-israelitas-argentinas', { name: "Jorge Knoblovits", bio: "President of DAIA (Jewish), Argentina's main Jewish political representation and anti-defamation organization.", role: "President" });
addInd('sociedad-hebraica-argentina', { name: "Alejandro Metzger", bio: "President of Sociedad Hebraica Argentina, Buenos Aires' largest Jewish community and sports club.", role: "President" });
addInd('buenos-aires-herald-jewish-community-media', { name: "Robert Cox", bio: "Legendary editor of the Buenos Aires Herald who exposed human rights abuses during Argentina's Dirty War.", role: "Former Editor" });
addInd('buenos-aires-jewish-museum', { name: "Ruth Kalenberg", bio: "Director of the Buenos Aires Jewish Museum, preserving the history of Argentina's 200,000-strong Jewish community.", role: "Director" });
addInd('grupo-werthein', { name: "Adrián Werthein", bio: "Head of Grupo Werthein (Jewish), one of Argentina's most prominent business families with interests in telecom, banking, and agriculture.", role: "Chairman" });
addInd('museo-del-holocausto-buenos-aires', { name: "Graciela Jinich", bio: "Director of the Buenos Aires Holocaust Museum (Jewish), the first Holocaust museum in Latin America.", role: "Director" });
addInd('ort-argentina', { name: "Eduardo Barbero", bio: "Director of ORT Argentina (Jewish), operating one of the largest Jewish school networks in Latin America.", role: "Director" });
addInd('beit-el-congregation-buenos-aires', { name: "Daniel Goldman", bio: "Rabbi of Beit El Congregation (Jewish), one of Buenos Aires' most prominent Conservative synagogues.", role: "Rabbi" });
addInd('templo-libertad-buenos-aires', { name: "Marcelo Polakoff", bio: "Rabbi of Templo Libertad (Jewish), Buenos Aires' oldest Ashkenazi synagogue, built in 1897.", role: "Rabbi" });

// === BRAZIL (8) ===
addInd('confedera-o-israelita-do-brasil-conib', { name: "Claudio Lottenberg", bio: "President of CONIB (Jewish), the umbrella organization representing Brazil's 120,000 Jews.", role: "President" });
addInd('federa-o-israelita-do-estado-de-s-o-paulo-fisesp', { name: "Fernando Lottenberg", bio: "Former president of FISESP (Jewish), who later served as Brazil's Special Envoy for Combating Antisemitism.", role: "Former President" });
addInd('albert-einstein-hospital-hospital-israelita-albert-einstein', { name: "Sidney Klajner", bio: "President of Hospital Albert Einstein (Jewish), the top-ranked hospital in Latin America.", role: "President" });
addInd('club-hebraica-s-o-paulo', { name: "Carlos Matayoshi", bio: "President of Clube Hebraica São Paulo, one of the largest Jewish community clubs in Latin America.", role: "President" });
addInd('museu-judaico-de-s-o-paulo', { name: "Felipe Arruda", bio: "Director of the Jewish Museum of São Paulo, opened in 2021 to document Jewish life in Brazil.", role: "Director" });
addInd('congrega-o-israelita-paulista-cip', { name: "Ruben Sternschein", bio: "Rabbi of Congregação Israelita Paulista (Jewish), one of the largest Reform congregations in Latin America.", role: "Rabbi" });
addInd('congrega-o-israelita-paulista', { name: "Ruben Sternschein", bio: "Rabbi of CIP (Jewish), São Paulo's largest Reform/Liberal Jewish congregation, founded 1936.", role: "Rabbi" });
addInd('museu-judaico-do-rio-de-janeiro', { name: "Daniela Riqueza", bio: "Director of the Jewish Museum of Rio de Janeiro, showcasing Jewish heritage in Brazil since 1977.", role: "Director" });

// === SOUTH AFRICA (9) ===
addInd('south-african-zionist-federation', { name: "Rowan Sobelvitch", bio: "National chairman of the South African Zionist Federation (Jewish), the oldest Zionist organization outside Europe.", role: "National Chairman" });
addInd('south-african-jewish-report', { name: "Peta Krost Maunder", bio: "Editor of the South African Jewish Report (Jewish), the community's main newspaper.", role: "Editor" });
addInd('cape-town-holocaust-genocide-centre', { name: "Richard Memory", bio: "Director of the Cape Town Holocaust & Genocide Centre, combining Holocaust education with genocide awareness.", role: "Director" });
addInd('ort-south-africa', { name: "Ariellah Rosenberg", bio: "National Director of ORT South Africa (Jewish), providing education and training programs.", role: "National Director" });
addInd('naspers', { name: "Koos Bekker", bio: "Former CEO and chairman of Naspers, who transformed it from a South African newspaper group into a global tech investor (Tencent, etc.). Not Jewish, but the company was founded by Afrikaner interests.", role: "Former CEO" });
addInd('johannesburg-holocaust-genocide-centre', { name: "Tali Nates", bio: "Founder and director of the Johannesburg Holocaust & Genocide Centre (Jewish, child of Holocaust survivors).", role: "Founder & Director" });
addInd('king-david-schools', { name: "Rabbi Harris", bio: "Principal associated with King David Schools (Jewish), the largest Jewish day school network in South Africa.", role: "Principal" });
addInd('herzlia-school-cape-town', { name: "Marc Sobel", bio: "Former principal of Herzlia School (Jewish), Cape Town's leading Jewish day school.", role: "Former Principal" });
addInd('south-african-friends-of-israel', { name: "Ben Memory", bio: "Chairman of South African Friends of Israel, advocating for Israel within South Africa.", role: "Chairman" });

// === SAVE ===
fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let noInd=0; for(const c in data.countries) for(const e of data.countries[c]) if(!e.individuals||e.individuals.length===0) noInd++;
console.log(`Done! People: ${Object.keys(people.people).length}. Entries without individuals: ${noInd}`);
