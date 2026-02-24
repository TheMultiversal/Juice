// addConnections10.js - Australia, Germany, Russia, South Africa enrichment
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
// AUSTRALIA
// ============================================================

addConn('executive-council-of-australian-jewry-ecaj', [
  { name: "Australian Government", type: "political engagement", description: "Peak representative body engaging with the Australian federal government on behalf of the Jewish community." },
  { name: "State Jewish boards", type: "constituent bodies", description: "Umbrella for state-level Jewish representative councils across Australia." },
  { name: "Antisemitism reporting", type: "core function", description: "Publishes annual report on antisemitism in Australia." }
]);
updDesc('executive-council-of-australian-jewry-ecaj', 'The Executive Council of Australian Jewry (ECAJ) is the peak representative body of the Australian Jewish community (~120,000), founded in 1944. Engages with the federal government on policy, combats antisemitism, and coordinates with state-level Jewish boards. Publishes an annual report on antisemitism in Australia. Represents Australian Jewry internationally.');
addInd('executive-council-of-australian-jewry-ecaj', { name: "Alex Ryvchin", bio: "Alex Ryvchin (Jewish), co-CEO of the ECAJ, is a prominent advocate for the Australian Jewish community and author of books on antisemitism and Zionism." });

addConn('zionist-federation-of-australia', [
  { name: "World Zionist Organization", type: "parent body", description: "Australian affiliate of the World Zionist Organization." },
  { name: "Israel advocacy", type: "core mission", description: "Promotes Zionism and Israel advocacy across Australia." },
  { name: "Australian Jewish community", type: "constituency", description: "Coordinates Zionist education and activism for Australian Jewry." }
]);
updDesc('zionist-federation-of-australia', 'The Zionist Federation of Australia (ZFA) is the umbrella body for Zionist organizations in Australia and the Australian affiliate of the World Zionist Organization. Promotes Israel advocacy, Zionist education, and aliyah (immigration to Israel) within the Australian Jewish community. Coordinates campaigns and events supporting Israel across all Australian states.');

addConn('australia-israel-jewish-affairs-council-aijac', [
  { name: "Australia-Israel relations", type: "core focus", description: "Premier research and advocacy organization for Australia-Israel relations." },
  { name: "Australian Parliament", type: "political engagement", description: "Briefings and advocacy with Australian parliamentarians." },
  { name: "Media engagement", type: "activity", description: "Active media engagement correcting coverage of Israel and the Middle East." },
  { name: "Rambam Fellowship", type: "program", description: "Runs the Rambam Fellowship sending Australian political leaders to Israel." }
]);
updDesc('australia-israel-jewish-affairs-council-aijac', 'AIJAC (Australia/Israel & Jewish Affairs Council) is Australia\'s premier research, analysis, and advocacy organization focused on Israel and Jewish affairs. Publishes the Australia/Israel Review journal. Runs the Rambam Fellowship program sending Australian politicians and opinion leaders to Israel. Regular media engagement and submissions to government inquiries on Middle East policy.');
addInd('australia-israel-jewish-affairs-council-aijac', { name: "Colin Rubenstein", bio: "Dr. Colin Rubenstein AM (Jewish), executive director of AIJAC, has led the organization for decades and is one of Australia's most prominent advocates for Israel and the Jewish community." });

addConn('jewish-community-council-of-victoria-jccv', [
  { name: "Melbourne Jewish community", type: "constituency", description: "Represents Melbourne's Jewish community, the largest in Australia (~60,000)." },
  { name: "Victorian state government", type: "political engagement", description: "Engages with the Victorian state government on community issues." },
  { name: "ECAJ", type: "national umbrella", description: "Victorian constituent of the Executive Council of Australian Jewry." }
]);
updDesc('jewish-community-council-of-victoria-jccv', 'The JCCV is the peak representative body of Melbourne\'s Jewish community, the largest in Australia with approximately 60,000 members. Melbourne has one of the highest per-capita Jewish populations of any city outside Israel, with a vibrant network of schools, synagogues, and cultural organizations. The JCCV represents over 55 affiliate organizations.');

addConn('nsw-jewish-board-of-deputies', [
  { name: "Sydney Jewish community", type: "constituency", description: "Represents Sydney's Jewish community (~45,000)." },
  { name: "NSW state government", type: "political engagement", description: "Engages with the NSW state government on Jewish community matters." },
  { name: "ECAJ", type: "national umbrella", description: "NSW constituent of the Executive Council of Australian Jewry." }
]);
updDesc('nsw-jewish-board-of-deputies', 'The NSW Jewish Board of Deputies is the peak representative body of Sydney\'s Jewish community (~45,000). Advocates on behalf of the Jewish community to the NSW state government, monitors antisemitism, and coordinates communal activities. Sydney\'s Jewish community is concentrated in the Eastern Suburbs and North Shore, with a vibrant cultural and religious life.');

addConn('the-australian-jewish-news', [
  { name: "Australian Jewish community", type: "readership", description: "Australia's primary Jewish newspaper, serving communities in Melbourne and Sydney." },
  { name: "Jewish communal affairs", type: "coverage", description: "Covers Australian Jewish communal news, Israel, and international Jewish affairs." },
  { name: "Community journalism", type: "role", description: "One of the longest-running Jewish community newspapers in the English-speaking world." }
]);
updDesc('the-australian-jewish-news', 'The Australian Jewish News (AJN) is Australia\'s primary Jewish newspaper, founded in 1895 in Melbourne, making it one of the oldest continuously published Jewish newspapers in the English-speaking world. Published weekly with editions in Melbourne and Sydney. Covers Australian Jewish communal news, Israel, international Jewish affairs, arts, and culture.');

addConn('westfield-corporation-scentre-unibail', [
  { name: "Frank Lowy", type: "co-founder", description: "Frank Lowy AC (Jewish, Hungarian-born Israeli-Australian, b. 1930) co-founded Westfield in 1960." },
  { name: "John Saunders", type: "co-founder", description: "Co-founded with John Saunders in Western Sydney." },
  { name: "Unibail-Rodamco-Westfield", type: "merger", description: "International Westfield assets merged with Unibail-Rodamco in 2018 for $32 billion." },
  { name: "Scentre Group", type: "Australian operations", description: "Australian and NZ Westfield centres now operate under Scentre Group." },
  { name: "Lowy Institute", type: "philanthropy", description: "Lowy founded the Lowy Institute for International Policy with a $30 million endowment." }
]);
updDesc('westfield-corporation-scentre-unibail', 'Westfield was co-founded by Frank Lowy AC (Jewish, Hungarian-born Holocaust survivor, later Israeli-Australian) and John Saunders in 1960 in Western Sydney. Lowy built it into the world\'s largest shopping centre company with 100+ centres globally. International assets merged with Unibail-Rodamco in 2018 for $32 billion. Australian centres now operate as Scentre Group. Lowy, who fought in Israel\'s War of Independence, founded the Lowy Institute with $30 million.');

addConn('jewish-museum-of-australia', [
  { name: "Melbourne Jewish community", type: "community base", description: "Located in St Kilda, the heart of Melbourne's Jewish community." },
  { name: "Australian Jewish heritage", type: "mission", description: "Preserves and shares the history and culture of Australian Jewry." },
  { name: "Holocaust education", type: "program", description: "Houses a Holocaust centre with survivor testimonies." }
]);
updDesc('jewish-museum-of-australia', 'The Jewish Museum of Australia, located in St Kilda, Melbourne (the heart of the Jewish community), preserves and celebrates Australian Jewish heritage. Houses permanent collections on Jewish life, ritual objects, and a Holocaust centre with survivor testimonies. Melbourne\'s Jewish community, one of the most vibrant in the diaspora, has deep roots dating to the Gold Rush era of the 1850s.');

addConn('sydney-jewish-museum', [
  { name: "Sydney Jewish community", type: "community base", description: "Located in Darlinghurst, Sydney, in the heart of the Jewish community." },
  { name: "Holocaust education", type: "core mission", description: "Primary Holocaust education centre for NSW, with survivor guides." },
  { name: "Australian War Memorial connection", type: "partnership", description: "Partners with Australian institutions on Holocaust remembrance." }
]);
updDesc('sydney-jewish-museum', 'The Sydney Jewish Museum, located in Darlinghurst, is a Holocaust museum and education centre founded in 1992 by survivors who settled in Sydney. Unique in that Holocaust survivors serve as volunteer guides sharing their personal testimonies with visitors. Educates over 30,000 students annually. Also explores the broader Jewish experience in Australia from the First Fleet to the present.');

addConn('mount-scopus-memorial-college', [
  { name: "Melbourne Jewish community", type: "community school", description: "One of Melbourne's largest Jewish day schools." },
  { name: "Jewish education", type: "mission", description: "Provides Jewish and secular education from early learning to Year 12." },
  { name: "Zionism", type: "identity", description: "Named after Mount Scopus in Jerusalem, reflecting its Zionist orientation." }
]);
updDesc('mount-scopus-memorial-college', 'Mount Scopus Memorial College is one of Melbourne\'s largest Jewish day schools, established in 1949 as a memorial to the six million Jews killed in the Holocaust. Named after Mount Scopus in Jerusalem. Provides Jewish and secular education from early learning through Year 12 to over 1,600 students. One of the largest Jewish schools in the Southern Hemisphere.');

addConn('moriah-college-sydney', [
  { name: "Sydney Jewish community", type: "community school", description: "Largest Jewish school in Sydney and one of the largest in the Southern Hemisphere." },
  { name: "Jewish education", type: "mission", description: "Provides Jewish and secular education under Modern Orthodox auspices." },
  { name: "Emanuel Synagogue", type: "community connection", description: "Connected to the broader Sydney Jewish educational network." }
]);
updDesc('moriah-college-sydney', 'Moriah College is the largest Jewish school in Sydney, providing education from Preschool to Year 12 to approximately 1,600 students. Founded in 1943, it offers a comprehensive program combining Jewish studies with the NSW curriculum under Modern Orthodox auspices. Located in Queens Park in Sydney\'s Eastern Suburbs, the centre of Sydney\'s Jewish community.');

addConn('lowy-institute', [
  { name: "Frank Lowy", type: "founder", description: "Founded and endowed with $30 million by Frank Lowy AC (Jewish), founder of Westfield." },
  { name: "Australian foreign policy", type: "research focus", description: "Australia's leading independent international policy think tank." },
  { name: "Asia-Pacific relations", type: "specialty", description: "Specializes in Australia's relations with the Asia-Pacific region." },
  { name: "Global Power Index", type: "publication", description: "Publishes the influential Asia Power Index ranking nations' power in the region." }
]);
updDesc('lowy-institute', 'The Lowy Institute for International Policy is Australia\'s leading independent foreign policy think tank, founded in 2003 with a $30 million endowment from Frank Lowy AC (Jewish, founder of Westfield). Based in Sydney, it produces influential research on Australia\'s place in the world, Asia-Pacific relations, and global governance. Publishes the Asia Power Index and the Lowy Institute Poll on Australian attitudes to the world.');

addConn('pratt-foundation', [
  { name: "Pratt family", type: "founder", description: "Established by the Pratt family (Jewish), owners of Visy Industries, Australia's largest private company." },
  { name: "Richard Pratt", type: "patriarch", description: "Founded by Richard Pratt AC (Jewish, 1934-2009), Polish-born industrialist." },
  { name: "Australian philanthropy", type: "role", description: "One of Australia's largest charitable foundations." },
  { name: "Jewish community support", type: "focus area", description: "Major funder of Jewish education and welfare in Australia." }
]);
updDesc('pratt-foundation', 'The Pratt Foundation is one of Australia\'s largest philanthropic foundations, established by Richard Pratt AC (Jewish, 1934-2009), the Polish-born industrialist who built Visy Industries into Australia\'s largest private company. The foundation supports education, the arts, the environment, social welfare, and the Jewish community. Son Anthony Pratt (Jewish), now Australia\'s richest person, continues the family\'s philanthropy.');

addConn('visy-industries-anthony-pratt', [
  { name: "Anthony Pratt", type: "chairman", description: "Anthony Pratt (Jewish), Australia's richest person, chairs Visy Industries and Pratt Industries." },
  { name: "Richard Pratt", type: "founder", description: "Founded by Richard Pratt AC (Jewish), Polish-born packaging magnate." },
  { name: "Recycling and packaging", type: "industry", description: "Australia's largest privately-owned packaging and recycling company." },
  { name: "Pratt Industries USA", type: "US operations", description: "Also operates Pratt Industries in the US, the world's largest privately-held 100% recycled paper and packaging company." }
]);
updDesc('visy-industries-anthony-pratt', 'Visy Industries is Australia\'s largest privately-owned company, founded by Richard Pratt AC (Jewish, 1934-2009) and now chaired by his son Anthony Pratt (Jewish), Australia\'s richest person (net worth ~$30 billion). A packaging and recycling empire. Also operates Pratt Industries in the USA, the world\'s largest privately held 100% recycled paper and packaging company. The Pratt family are major Jewish community philanthropists.');

addConn('meriton-harry-triguboff', [
  { name: "Harry Triguboff", type: "founder", description: "Harry Triguboff AO (Jewish, born 1933 in Dalian, China) founded Meriton, Australia's largest apartment developer." },
  { name: "Australian real estate", type: "industry impact", description: "Built over 75,000 apartments, more than any other Australian developer." },
  { name: "Forbes billionaire", type: "wealth", description: "Consistently ranked as one of Australia's richest people." },
  { name: "Jewish community", type: "philanthropy", description: "Supporter of Jewish community organizations in Sydney." }
]);
updDesc('meriton-harry-triguboff', 'Meriton is Australia\'s largest apartment developer, founded by Harry Triguboff AO (Jewish, born 1933 in Dalian, China to Russian Jewish parents). Triguboff has built over 75,000 apartments and is consistently ranked among Australia\'s richest people. Known as "High-Rise Harry," he transformed urban living in Sydney and other Australian cities. A supporter of Jewish communal organizations in Sydney.');

// ============================================================
// GERMANY
// ============================================================

addConn('zentralrat-der-juden-in-deutschland-central-council-of-jews-in-germany', [
  { name: "German Federal Government", type: "treaty relationship", description: "Has a state treaty (Staatsvertrag) with the German federal government." },
  { name: "German Jewish revival", type: "context", description: "Represents the remarkable revival of Jewish life in Germany, now ~225,000 strong." },
  { name: "Memorial culture", type: "advocacy", description: "Advocates for Holocaust remembrance and education in German public life." },
  { name: "Russian-speaking Jews", type: "demographics", description: "Community largely reshaped by immigration of ~200,000 Jews from the former Soviet Union since 1990." }
]);
updDesc('zentralrat-der-juden-in-deutschland-central-council-of-jews-in-germany', 'The Zentralrat der Juden in Deutschland (Central Council of Jews in Germany) is the umbrella organization of German Jewry (~225,000), founded in 1950. Has a state treaty (Staatsvertrag) with the German federal government providing institutional funding. The community was largely rebuilt through immigration of ~200,000 Jews from the former Soviet Union after 1990. Advocates for Holocaust remembrance and combating antisemitism.');
addInd('zentralrat-der-juden-in-deutschland-central-council-of-jews-in-germany', { name: "Josef Schuster", bio: "Dr. Josef Schuster (Jewish), president of the Central Council of Jews in Germany since 2014, represents German Jewry in government relations and public life." });

addConn('j-dische-gemeinde-zu-berlin-jewish-community-of-berlin', [
  { name: "Berlin Jewish life", type: "community", description: "Largest Jewish community in Germany with ~30,000 members." },
  { name: "Berlin state government", type: "treaty", description: "Has a state treaty with the Berlin state government." },
  { name: "Post-reunification growth", type: "context", description: "Grew dramatically after German reunification and Soviet Jewish immigration." },
  { name: "Historic Berlin Jewry", type: "heritage", description: "Inheritor of Berlin's pre-war Jewish community, once one of the most prominent in Europe." }
]);
updDesc('j-dische-gemeinde-zu-berlin-jewish-community-of-berlin', 'The Jüdische Gemeinde zu Berlin is the largest Jewish community in Germany with approximately 30,000 registered members. Berlin was home to one of Europe\'s most prominent Jewish communities before the Holocaust. Rebuilt slowly after 1945, it grew dramatically after 1990 through immigration from the former Soviet Union. Has a state treaty with the Berlin government. Operates synagogues, schools, social services, and cultural programs.');

addConn('jewish-museum-berlin', [
  { name: "Daniel Libeskind", type: "architect", description: "Iconic building designed by Daniel Libeskind (Jewish, Polish-American architect) in a deconstructivist style." },
  { name: "German-Jewish history", type: "mission", description: "Documents 2,000 years of German-Jewish history." },
  { name: "German federal museum", type: "institutional status", description: "Major institution funded by the German federal government." },
  { name: "Cultural tourism", type: "impact", description: "One of Berlin's most visited museums, attracting millions of visitors." }
]);
updDesc('jewish-museum-berlin', 'The Jewish Museum Berlin, housed in Daniel Libeskind\'s (Jewish, Polish-American architect) iconic zinc-clad building, is one of Europe\'s largest Jewish museums. Documents 2,000 years of German-Jewish history from the medieval period to the present. The building itself, with its zigzag form, voids, and slashed windows, is a powerful architectural statement about absence and diaspora. Attracts over 700,000 visitors annually.');
addInd('jewish-museum-berlin', { name: "Daniel Libeskind", bio: "Daniel Libeskind (Jewish, born 1946 in Poland), architect, designed the Jewish Museum Berlin and the master plan for the rebuilt World Trade Center. His architecture confronts memory, loss, and absence." });

addConn('abraham-geiger-college', [
  { name: "University of Potsdam", type: "academic affiliation", description: "Affiliated with the University of Potsdam." },
  { name: "Abraham Geiger", type: "namesake", description: "Named after Abraham Geiger (1810-1874), a founder of Reform Judaism." },
  { name: "Progressive rabbinical training", type: "mission", description: "First liberal rabbinical seminary in continental Europe since the Holocaust." },
  { name: "Post-Holocaust Jewish revival", type: "significance", description: "Its founding symbolizes the revival of liberal Jewish religious leadership in Germany." }
]);
updDesc('abraham-geiger-college', 'Abraham Geiger College at the University of Potsdam is the first liberal rabbinical seminary in continental Europe since the Holocaust, founded in 1999. Named after Abraham Geiger (Jewish, 1810-1874), one of the founders of Reform Judaism. Trains rabbis and cantors for Progressive Jewish communities across Europe. Its existence symbolizes the remarkable post-Holocaust revival of Jewish religious life in Germany.');

addConn('allgemeine-rabbinerkonferenz-general-rabbinical-conference', [
  { name: "German rabbinate", type: "institutional role", description: "Organization of rabbis serving Jewish communities across Germany." },
  { name: "Central Council of Jews", type: "communal partner", description: "Works with the Central Council on religious matters for German Jewry." },
  { name: "Orthodox and liberal rabbis", type: "membership", description: "Unique in bringing together rabbis of different denominations." }
]);
updDesc('allgemeine-rabbinerkonferenz-general-rabbinical-conference', 'The Allgemeine Rabbinerkonferenz (General Rabbinical Conference) of Germany brings together rabbis serving Jewish communities across Germany. Addresses religious, ethical, and communal questions. Represents the rabbinic voice within German Jewish institutional life, working alongside the Central Council of Jews in Germany (Zentralrat) on matters of Jewish law and community development.');

addConn('j-dische-allgemeine', [
  { name: "Central Council of Jews in Germany", type: "publisher", description: "Published by the Central Council of Jews in Germany." },
  { name: "German Jewish journalism", type: "role", description: "The primary Jewish newspaper of Germany, covering German-Jewish life." },
  { name: "German public discourse", type: "voice", description: "Seen as the official voice of German Jewry in the media landscape." }
]);
updDesc('j-dische-allgemeine', 'The Jüdische Allgemeine is the primary Jewish weekly newspaper of Germany, published by the Central Council of Jews in Germany (Zentralrat). Covers German-Jewish communal life, Israel, antisemitism, culture, and politics. Founded in 1946, it serves as the official voice of German Jewry and plays a crucial role in the post-Holocaust German-Jewish public discourse.');

addConn('memorial-to-the-murdered-jews-of-europe', [
  { name: "German federal government", type: "sponsor", description: "Established by a resolution of the German Bundestag in 1999." },
  { name: "Peter Eisenman", type: "architect", description: "Designed by American architect Peter Eisenman (Jewish)." },
  { name: "Berlin landmark", type: "location", description: "Located in central Berlin near the Brandenburg Gate, occupying 19,000 square meters." },
  { name: "2,711 concrete stelae", type: "design", description: "Features 2,711 concrete stelae of varying heights in a grid pattern." }
]);
updDesc('memorial-to-the-murdered-jews-of-europe', 'The Memorial to the Murdered Jews of Europe (Holocaust Memorial) in central Berlin was designed by Peter Eisenman (Jewish, American architect) and inaugurated in 2005. Features 2,711 concrete stelae of varying heights arranged in a grid on 19,000 square meters near the Brandenburg Gate. Below ground, the Information Centre documents the persecution and murder of six million Jews. Established by resolution of the German Bundestag.');
addInd('memorial-to-the-murdered-jews-of-europe', { name: "Peter Eisenman", bio: "Peter Eisenman (Jewish, born 1932), American architect and theorist, designed Berlin's Memorial to the Murdered Jews of Europe. Known for his deconstructivist approach and intellectually challenging architectural designs." });

addConn('zentralwohlfahrtsstelle-der-juden-in-deutschland', [
  { name: "Jewish social welfare in Germany", type: "core role", description: "Central welfare organization of Jewish communities in Germany." },
  { name: "Central Council of Jews", type: "affiliation", description: "Social welfare arm working under the Central Council umbrella." },
  { name: "Integration of immigrants", type: "major program", description: "Helped integrate ~200,000 Jewish immigrants from the former Soviet Union." }
]);
updDesc('zentralwohlfahrtsstelle-der-juden-in-deutschland', 'The Zentralwohlfahrtsstelle der Juden in Deutschland (Central Welfare Office of Jews in Germany) is the social welfare organization of the German Jewish community. Played a crucial role in integrating approximately 200,000 Jewish immigrants from the former Soviet Union after 1990. Provides social services, counseling, migration support, and educational programs for Jewish communities across Germany.');

addConn('european-maccabi-games', [
  { name: "Maccabi World Union", type: "parent organization", description: "European regional competition of the Maccabi sports movement." },
  { name: "European Jewish athletes", type: "participants", description: "Brings together Jewish athletes from across Europe." },
  { name: "Berlin 2015 significance", type: "historic moment", description: "The 2015 European Maccabi Games in Berlin were enormously symbolic — Jewish athletes competing 80 years after the 1936 Berlin Olympics." }
]);
updDesc('european-maccabi-games', 'The European Maccabi Games (EMG) is the regional edition of the Maccabi Games for European Jewish athletes. The 2015 EMG held in Berlin were profoundly symbolic — Jewish athletes competing in Germany\'s capital 80 years after the 1936 Nazi Olympics from which Jews were excluded. Part of the Maccabi World Union, the world\'s largest Jewish sports organization founding in 1921.');

addConn('moses-mendelssohn-center-for-european-jewish-studies', [
  { name: "Moses Mendelssohn", type: "namesake", description: "Named after Moses Mendelssohn (Jewish, 1729-1786), the father of the Jewish Enlightenment (Haskalah)." },
  { name: "University of Potsdam", type: "academic home", description: "Based at the University of Potsdam." },
  { name: "European Jewish research", type: "mission", description: "Interdisciplinary research centre for European Jewish history and culture." }
]);
updDesc('moses-mendelssohn-center-for-european-jewish-studies', 'The Moses Mendelssohn Center for European-Jewish Studies at the University of Potsdam is named after Moses Mendelssohn (Jewish, 1729-1786), the philosopher considered the father of the Jewish Enlightenment (Haskalah). Conducts interdisciplinary research on European Jewish history, culture, relations with non-Jewish society, and contemporary Jewish life. A key academic institution for Jewish studies in post-reunification Germany.');

addConn('leo-baeck-institute-germany', [
  { name: "Leo Baeck", type: "namesake", description: "Named after Rabbi Leo Baeck, last leader of German Jewry under the Nazis." },
  { name: "German-Jewish intellectual heritage", type: "mission", description: "Preserves the intellectual heritage of German-speaking Jewry." },
  { name: "Leo Baeck Institutes worldwide", type: "network", description: "Part of a network including LBI New York, LBI Jerusalem, and LBI London." }
]);
updDesc('leo-baeck-institute-germany', 'The Leo Baeck Institute in Germany is part of an international network (with branches in New York, Jerusalem, and London) dedicated to preserving the history and culture of German-speaking Jewry. Named after Rabbi Leo Baeck (1873-1956), the last leader of German Jewry under the Nazis who survived Theresienstadt. The institute\'s archives, library, and art collection document the extraordinary contributions of German-Jewish civilization.');

addConn('zalando', [
  { name: "David Schneider", type: "co-founder", description: "David Schneider (Jewish) co-founded Zalando, Europe's largest online fashion platform." },
  { name: "Robert Gentz", type: "co-founder", description: "Co-founded with Robert Gentz in Berlin in 2008." },
  { name: "European e-commerce", type: "market position", description: "One of Europe's largest e-commerce companies with €10+ billion revenue." },
  { name: "Berlin tech scene", type: "ecosystem", description: "One of the anchor companies of Berlin's booming tech scene." }
]);
updDesc('zalando', 'Zalando, co-founded by David Schneider (Jewish) and Robert Gentz in Berlin in 2008, has grown into Europe\'s largest online fashion and lifestyle platform with over €10 billion in annual revenue. Operates in 25 European markets, connecting customers with around 7,000 brands. One of the most successful companies to emerge from Berlin\'s tech ecosystem. Listed on the Frankfurt Stock Exchange.');

addConn('stolpersteine-stumbling-stones', [
  { name: "Gunter Demnig", type: "creator", description: "Created by German artist Gunter Demnig, beginning in 1992." },
  { name: "Holocaust commemoration", type: "purpose", description: "Small brass plaques embedded in sidewalks marking the last known addresses of Holocaust victims." },
  { name: "Largest decentralized memorial", type: "distinction", description: "Over 100,000 Stolpersteine in 30+ countries — the world's largest decentralized memorial." },
  { name: "Community engagement", type: "process", description: "Each stone is individually researched and funded by local communities." }
]);
updDesc('stolpersteine-stumbling-stones', 'Stolpersteine (Stumbling Stones) are small brass cobblestone-sized memorials created by German artist Gunter Demnig, embedded in sidewalks marking the last known freely-chosen addresses of Holocaust victims. Beginning in 1992, over 100,000 Stolpersteine have been laid in 30+ countries, making it the world\'s largest decentralized memorial. Each stone is individually researched and funded by local communities, naming the victim and their fate.');

addConn('sachsenhausen-memorial', [
  { name: "Nazi concentration camp system", type: "historic role", description: "Sachsenhausen was a major Nazi concentration camp near Berlin, operational from 1936." },
  { name: "German memorial culture", type: "institutional role", description: "Maintained by the Brandenburg state government as a memorial and museum." },
  { name: "Holocaust education", type: "educational function", description: "Major site for Holocaust education and remembrance." },
  { name: "Political prisoners and Jews", type: "victims", description: "Held political prisoners, Jews, Roma, homosexuals, and Soviet POWs. Over 30,000 died." }
]);
updDesc('sachsenhausen-memorial', 'Sachsenhausen concentration camp, located near Berlin (Oranienburg), was established in 1936 as a model concentration camp. Over 200,000 prisoners were held here, including Jews, political opponents, Roma, homosexuals, and Soviet POWs. More than 30,000 perished. After the war it was used as a Soviet special camp. Now maintained as a memorial and museum by the Brandenburg state, visited by hundreds of thousands annually.');

addConn('neue-synagoge-berlin', [
  { name: "Berlin Jewish community", type: "community", description: "Symbol of Berlin's Jewish community, originally built in 1866." },
  { name: "Kristallnacht", type: "historic event", description: "Partially saved from Kristallnacht (1938) by police officer Wilhelm Krützfeld." },
  { name: "Moorish Revival architecture", type: "architectural style", description: "Iconic Moorish Revival gold dome, one of Berlin's most recognizable landmarks." },
  { name: "Centrum Judaicum", type: "current use", description: "Houses the Centrum Judaicum foundation and exhibition on Berlin Jewish history." }
]);
updDesc('neue-synagoge-berlin', 'The Neue Synagoge (New Synagogue) Berlin, built in 1866, features an iconic Moorish Revival gold dome and was one of the largest synagogues in Germany. During Kristallnacht (1938), police officer Wilhelm Krützfeld bravely prevented its complete destruction. Heavily damaged in WWII bombing, its façade and dome were restored and reopened in 1995. Houses the Centrum Judaicum foundation and an exhibition on Berlin Jewish history.');

// ============================================================
// RUSSIA
// ============================================================

addConn('federation-of-jewish-communities-of-russia-fjcr', [
  { name: "Chabad-Lubavitch", type: "organizational affiliation", description: "Closely associated with the Chabad-Lubavitch movement." },
  { name: "Chief Rabbi Berel Lazar", type: "religious leadership", description: "Chief Rabbi Berel Lazar (Chabad) leads the FJCR, closely aligned with the Kremlin." },
  { name: "Vladimir Putin", type: "political relationship", description: "Maintains a working relationship with the Russian government and President Putin." },
  { name: "Russian Jewish revival", type: "mission", description: "Led the revival of Jewish religious life across Russia after the Soviet era." }
]);
updDesc('federation-of-jewish-communities-of-russia-fjcr', 'The FJCR (Federation of Jewish Communities of Russia) is the largest Jewish organization in Russia, closely associated with Chabad-Lubavitch. Led by Chief Rabbi Berel Lazar (Chabad), it operates over 180 Jewish community centres across Russia. Rebuilt Jewish religious infrastructure after decades of Soviet suppression. Maintains a working relationship with the Kremlin. Russia has approximately 150,000-200,000 Jews.');

addConn('russian-jewish-congress', [
  { name: "Russian oligarchs", type: "leadership", description: "Founded and led by prominent Russian-Jewish businessmen." },
  { name: "Russian Jewish cultural life", type: "focus", description: "Promotes Jewish cultural, educational, and social programs in Russia." },
  { name: "World Jewish Congress", type: "international affiliation", description: "Russian affiliate of the World Jewish Congress." },
  { name: "Antisemitism in Russia", type: "advocacy", description: "Monitors and combats antisemitism in Russian society." }
]);
updDesc('russian-jewish-congress', 'The Russian Jewish Congress (RJC) is a major Jewish communal organization in Russia, founded by prominent Russian-Jewish businessmen. Focuses on cultural, educational, and social programs for Russia\'s Jewish population. Affiliated with the World Jewish Congress. Combats antisemitism and promotes Jewish heritage. Has been led by prominent business figures including Yuri Kanner and was originally founded with support from Vladimir Gusinsky.');
addInd('russian-jewish-congress', { name: "Yuri Kanner", bio: "Yuri Kanner (Jewish, Russian), president of the Russian Jewish Congress, leads efforts to promote Jewish cultural life, fight antisemitism, and strengthen Jewish identity in Russia." });

addConn('jewish-museum-and-tolerance-center-moscow', [
  { name: "Russian Jewish community", type: "community", description: "Russia's principal Jewish museum, the largest in Europe." },
  { name: "Oligarch funding", type: "financing", description: "Built with funding from Russian-Jewish oligarchs including Roman Abramovich." },
  { name: "Russian government", type: "support", description: "Vladimir Putin personally donated a month's salary to the museum's construction." },
  { name: "Interactive technology", type: "design", description: "One of the world's most technologically advanced museums." }
]);
updDesc('jewish-museum-and-tolerance-center-moscow', 'The Jewish Museum and Tolerance Center in Moscow, opened in 2012, is the largest Jewish museum in Europe. Built with funding from Russian-Jewish oligarchs (Roman Abramovich donated significantly) and President Putin personally donated a month\'s salary. Features cutting-edge interactive technology to tell the story of Russian Jewish history from ancient times through the Holocaust to the present. Located in a former Soviet-era bus depot.');

addConn('moscow-choral-synagogue', [
  { name: "Russian Jewish revival", type: "symbol", description: "Central synagogue of Moscow and symbol of Russian Jewish revival." },
  { name: "Historic Jewish life", type: "heritage", description: "Has served Moscow's Jewish community since 1906." },
  { name: "Chief Rabbinate", type: "religious centre", description: "Seat of one of Russia's competing chief rabbinates." }
]);
updDesc('moscow-choral-synagogue', 'The Moscow Choral Synagogue is the main synagogue of Moscow, serving the Jewish community since its completion in 1906. Survived the Soviet era when most synagogues were shuttered. Now a centre of Jewish religious life in the Russian capital, it hosts services, community events, and serves as the seat of one of Russia\'s competing chief rabbinates. Located on Bolshoy Spasoglinishchevsky Lane in Kitay-gorod.');

addConn('chief-rabbinate-of-russia', [
  { name: "Dual chief rabbinate", type: "structure", description: "Russia uniquely has two competing chief rabbis: Berel Lazar (Chabad) and Adolf Shayevich." },
  { name: "FJCR", type: "Lazar affiliation", description: "Chief Rabbi Berel Lazar is affiliated with the FJCR (Chabad-aligned)." },
  { name: "Moscow Choral Synagogue", type: "Shayevich affiliation", description: "Chief Rabbi Adolf Shayevich is based at the Moscow Choral Synagogue." },
  { name: "Kremlin relations", type: "political dimension", description: "The dual rabbinate reflects different political and communal alignments." }
]);
updDesc('chief-rabbinate-of-russia', 'Russia uniquely has two competing chief rabbis: Berel Lazar (Chabad-Lubavitch, born in Italy, aligned with the FJCR and the Kremlin) and Adolf Shayevich (based at the Moscow Choral Synagogue, aligned with the Russian Jewish Congress). This dual structure reflects different communal, political, and denominational alignments within Russian Jewish life. The rivalry mirrors broader tensions in post-Soviet Jewish community organization.');

addConn('nornickel-vladimir-potanin', [
  { name: "Vladimir Potanin", type: "owner", description: "Controlled by Vladimir Potanin, one of Russia's richest oligarchs." },
  { name: "Mining and metals", type: "industry", description: "World's largest producer of palladium and refined nickel." },
  { name: "Israeli connections", type: "business ties", description: "Russian oligarch business networks have significant Israeli connections." }
]);
updDesc('nornickel-vladimir-potanin', 'Norilsk Nickel (NORNICKEL) is the world\'s largest producer of palladium and high-grade nickel, controlled by Vladimir Potanin, one of Russia\'s richest oligarchs. While Potanin himself is not Jewish, the company is included in the context of Russian oligarch business networks that have significant connections to Israel and the Jewish business world.');

addConn('alfa-bank-alfa-group', [
  { name: "Mikhail Fridman", type: "co-founder", description: "Co-founded by Mikhail Fridman (Jewish, Ukrainian-born), one of Russia's wealthiest businessmen." },
  { name: "German Khan", type: "co-founder", description: "German Khan (Jewish) is a co-founder and key executive of Alfa Group." },
  { name: "LetterOne", type: "investment vehicle", description: "Alfa Group's investment arm, LetterOne, has significant international investments." },
  { name: "Russia's largest private bank", type: "market position", description: "Alfa-Bank is Russia's largest private bank." }
]);
updDesc('alfa-bank-alfa-group', 'Alfa Group, co-founded by Mikhail Fridman (Jewish, born 1964 in Lviv, Ukraine) and German Khan (Jewish), is one of Russia\'s largest private conglomerate. Alfa-Bank is Russia\'s largest private bank. Fridman was one of the original Russian oligarchs who acquired assets during 1990s privatization. His investment vehicle LetterOne has major international holdings in telecom, oil, and technology.');

addConn('rusal-oleg-deripaska', [
  { name: "Oleg Deripaska", type: "founder", description: "Founded by Oleg Deripaska, Russian aluminum magnate. While not Jewish himself, deeply connected to Jewish oligarch networks." },
  { name: "Aluminum industry", type: "market position", description: "RUSAL is one of the world's largest aluminum producers." },
  { name: "Russian oligarch ecosystem", type: "business network", description: "Part of the interconnected Russian oligarch business ecosystem." }
]);
updDesc('rusal-oleg-deripaska', 'RUSAL (United Company RUSAL) is one of the world\'s largest aluminum producers, founded by Oleg Deripaska. While Deripaska is not Jewish, RUSAL operates within the interconnected Russian oligarch ecosystem that includes many Jewish figures. The company has faced international sanctions. RUSAL produces about 6% of the world\'s aluminum output.');

addConn('renova-group-viktor-vekselberg', [
  { name: "Viktor Vekselberg", type: "founder", description: "Founded by Viktor Vekselberg (Jewish, born in Ukraine), one of Russia's richest people." },
  { name: "Skolkovo Foundation", type: "initiative", description: "Vekselberg served as president of the Skolkovo Foundation, Russia's Silicon Valley project." },
  { name: "Fabergé eggs", type: "cultural collection", description: "Vekselberg purchased the Forbes Collection of Fabergé eggs for over $100 million." },
  { name: "US sanctions", type: "legal status", description: "Vekselberg was sanctioned by the US in 2018." }
]);
updDesc('renova-group-viktor-vekselberg', 'Renova Group was founded by Viktor Vekselberg (Jewish, born 1957 in Drohobych, Ukraine), one of Russia\'s richest oligarchs. Investments span energy, metals, mining, telecoms, and technology. Vekselberg purchased the Forbes Collection of nine Fabergé eggs for over $100 million. Served as president of Russia\'s Skolkovo Foundation, an innovation centre modeled on Silicon Valley. Sanctioned by the US government in 2018.');

addConn('letterone-mikhail-fridman', [
  { name: "Mikhail Fridman", type: "founder", description: "Founded by Mikhail Fridman (Jewish), co-founder of Alfa Group." },
  { name: "International investments", type: "portfolio", description: "Luxembourg-based investment vehicle with holdings in telecom, oil, technology, and healthcare." },
  { name: "DEA Deutsche Erdoel", type: "energy subsidiary", description: "Acquired DEA, a major German oil and gas company." },
  { name: "Alfa Group connection", type: "corporate link", description: "International investment arm of the Alfa Group empire." }
]);

addConn('russian-aluminum-rusal', [
  { name: "Len Blavatnik", type: "investor connection", description: "Len Blavatnik (Jewish, born in Ukraine), billionaire who was involved in Russian aluminum wars." },
  { name: "Russian metals industry", type: "sector", description: "Part of the Russian metals and mining sector with oligarch ownership." },
  { name: "Access Industries / Warner Music", type: "Blavatnik empire", description: "Blavatnik's Access Industries later acquired Warner Music Group." }
]);
updDesc('russian-aluminum-rusal', 'Russian aluminum has deep connections to Jewish oligarch networks. Len Blavatnik (Jewish, born 1957 in Ukraine, now US/UK citizen) was involved in the Russian aluminum industry through his company Access Industries. Blavatnik became one of the world\'s richest people, later acquiring Warner Music Group. Access Industries holds investments in technology, media, and energy globally. Blavatnik has been a major philanthropist, donating to Oxford University, Tel Aviv University, and cultural institutions.');

addConn('yandex-israeli-r-d', [
  { name: "Arkady Volozh", type: "founder", description: "Founded by Arkady Volozh (Jewish, born in Kazakhstan), a computer scientist." },
  { name: "Yandex Israel", type: "R&D centre", description: "Yandex maintains significant R&D operations in Israel." },
  { name: "Russian internet", type: "market dominance", description: "Yandex is Russia's largest technology company and internet search engine." },
  { name: "Restructuring post-Ukraine", type: "current status", description: "Yandex restructured in 2024 with Volozh's international operations separating from Russia." }
]);
updDesc('yandex-israeli-r-d', 'Yandex, Russia\'s largest technology company, was founded by Arkady Volozh (Jewish, born 1964 in Atyrau, Kazakhstan). Often called "Russia\'s Google," Yandex dominates Russian internet search with over 60% market share. Maintains significant R&D operations in Israel. Volozh, who holds Israeli citizenship, moved the international operations out of Russia after the Ukraine invasion. The company was valued at over $30 billion.');

addConn('synagogue-on-bolshaya-bronnaya-moscow', [
  { name: "Moscow Jewish life", type: "community", description: "One of Moscow's historic synagogues." },
  { name: "Chabad community", type: "denomination", description: "Associated with the Chabad-Lubavitch community in Moscow." },
  { name: "Soviet-era survival", type: "heritage", description: "Survived the Soviet period when many synagogues were closed." }
]);
updDesc('synagogue-on-bolshaya-bronnaya-moscow', 'The Synagogue on Bolshaya Bronnaya Street is one of Moscow\'s historic synagogues. It survived the Soviet era when most Jewish institutions were suppressed or destroyed. Now serves as an active centre of Jewish religious life in central Moscow, associated with the Chabad-Lubavitch community. Represents the continuity of Jewish worship in Russia through decades of persecution.');

addConn('grand-choral-synagogue-st-petersburg', [
  { name: "St. Petersburg Jewish community", type: "community", description: "Main synagogue of St. Petersburg (formerly Leningrad), Russia's second city." },
  { name: "Historic architecture", type: "landmark", description: "Built in 1893 in Moorish Revival style, one of Europe's largest synagogues." },
  { name: "Russian Jewish heritage", type: "cultural significance", description: "Symbolizes the rich Jewish heritage of imperial and Soviet-era St. Petersburg." }
]);
updDesc('grand-choral-synagogue-st-petersburg', 'The Grand Choral Synagogue of St. Petersburg, completed in 1893, is one of the largest synagogues in Europe, built in ornate Moorish Revival style. It has served St. Petersburg\'s Jewish community through the tsarist, Soviet, and modern eras. Leningrad (St. Petersburg) was home to a vibrant Jewish intellectual community. The synagogue is an active centre of Jewish life in Russia\'s cultural capital.');

addConn('gorbi-jewish-heritage-research-group', [
  { name: "Russian Jewish heritage", type: "research focus", description: "Researches and preserves the heritage of Russian Jewish communities." },
  { name: "Academic research", type: "activity", description: "Conducts academic research on Jewish history in Russia and the former Soviet Union." },
  { name: "Documentation", type: "preservation", description: "Documents Jewish communities, cemeteries, and historic sites across Russia." }
]);
updDesc('gorbi-jewish-heritage-research-group', 'GORBI (Jewish Heritage Research Group) researches and documents the Jewish heritage of Russia and the former Soviet Union. Conducts field research on Jewish communities, synagogues, cemeteries, and historic sites across Russia. Preserves the record of Jewish life in communities that were devastated by the Holocaust and Soviet suppression. An important resource for genealogical and historical research on Russian Jewry.');

// ============================================================
// SOUTH AFRICA
// ============================================================

addConn('south-african-jewish-board-of-deputies-sajbd', [
  { name: "South African Jewish community", type: "constituency", description: "Representative body of South African Jewry (~52,000)." },
  { name: "South African government", type: "political engagement", description: "Engages with the South African government on Jewish community interests." },
  { name: "ANC relationship", type: "political history", description: "Has navigated complex relations with the ANC government, which is critical of Israel." },
  { name: "Antisemitism monitoring", type: "core function", description: "Monitors and combats antisemitism in South Africa." }
]);
updDesc('south-african-jewish-board-of-deputies-sajbd', 'The South African Jewish Board of Deputies (SAJBD) has represented South African Jewry since 1912. The SA Jewish community (~52,000, mostly in Johannesburg and Cape Town) has deep Lithuanian roots and is one of the most Zionist communities in the diaspora. The SAJBD navigates complex relations with the ANC government, which has been critical of Israel. Monitors antisemitism and advocates for community interests.');
addInd('south-african-jewish-board-of-deputies-sajbd', { name: "Wendy Kahn", bio: "Wendy Kahn (Jewish), national director of the SAJBD, leads the organization's advocacy, community relations, and anti-antisemitism efforts in South Africa." });

addConn('south-african-zionist-federation', [
  { name: "World Zionist Organization", type: "parent body", description: "South African affiliate of the World Zionist Organization." },
  { name: "Israel-South Africa relations", type: "focus", description: "Promotes Zionism and Israel advocacy in the South African context." },
  { name: "Aliyah from South Africa", type: "program", description: "Facilitates emigration of South African Jews to Israel." },
  { name: "Lithuanian heritage", type: "community character", description: "SA Jewry is predominantly of Lithuanian origin, known as 'Litvaks'." }
]);
updDesc('south-african-zionist-federation', 'The South African Zionist Federation (SAZF) is the local affiliate of the World Zionist Organization. South African Jews are one of the most Zionist communities in the diaspora, with their predominantly Lithuanian (Litvak) heritage creating strong ties to Israel. The SAZF promotes Israel advocacy, education, and aliyah (immigration to Israel). Many prominent Israelis have South African roots, including former MKs and business leaders.');

addConn('south-african-jewish-report', [
  { name: "South African Jewish community", type: "readership", description: "Primary Jewish newspaper serving South African Jewry." },
  { name: "South African media landscape", type: "position", description: "Independent Jewish community publication." },
  { name: "Israel coverage", type: "editorial focus", description: "Extensive coverage of Israel-South Africa relations and Middle East affairs." }
]);
updDesc('south-african-jewish-report', 'The South African Jewish Report is the primary newspaper of the South African Jewish community, providing weekly coverage of communal affairs, Israel, antisemitism, and cultural life. Covers the complex relationship between the Jewish community and South African politics, particularly regarding Israel. One of the most important Jewish community newspapers in the Southern Hemisphere.');

addConn('chief-rabbi-of-south-africa', [
  { name: "South African Jewish community", type: "religious authority", description: "Religious leader of South African Jewry." },
  { name: "Chief Rabbi Warren Goldstein", type: "current incumbent", description: "Chief Rabbi Warren Goldstein (since 2005), known for the Shabbat Project which went global." },
  { name: "Shabbat Project", type: "global initiative", description: "The Shabbat Project, initiated by Chief Rabbi Goldstein in 2013, has spread to over 1,500 cities worldwide." },
  { name: "Orthodox Judaism", type: "denomination", description: "SA's Jewish community is predominantly Orthodox, unusual in the English-speaking diaspora." }
]);
updDesc('chief-rabbi-of-south-africa', 'The Chief Rabbi of South Africa serves as the religious leader of South African Jewry, which is predominantly Orthodox. Chief Rabbi Dr. Warren Goldstein (since 2005) initiated The Shabbat Project in 2013, which has become a global phenomenon observed in over 1,500 cities and 100 countries. South Africa\'s Jewish community is notable for its high level of Orthodox observance compared to other English-speaking communities.');

addConn('cape-town-holocaust-genocide-centre', [
  { name: "Cape Town Jewish community", type: "community base", description: "Serves Cape Town's Jewish community (~15,000) and the broader public." },
  { name: "South African education system", type: "educational partner", description: "Provides Holocaust and genocide education to South African schools." },
  { name: "Apartheid connections", type: "broader context", description: "Contextualizes the Holocaust alongside apartheid and other genocides." }
]);
updDesc('cape-town-holocaust-genocide-centre', 'The Cape Town Holocaust & Genocide Centre educates about the Holocaust while also addressing other genocides including the Rwandan Genocide and the Namibian Genocide. Located in Cape Town, it serves the Jewish community and broader public, providing educational programs to thousands of school students annually. Contextualizes these events within South Africa\'s own history of apartheid and racial discrimination.');

addConn('ort-south-africa', [
  { name: "World ORT", type: "parent organization", description: "South African branch of World ORT, the Jewish educational and vocational training network." },
  { name: "Education and training", type: "mission", description: "Provides educational and technological training programs." },
  { name: "South African Jewish community", type: "community connection", description: "Serves the Jewish community and broader South African society." }
]);
updDesc('ort-south-africa', 'ORT South Africa is the local branch of World ORT, the international Jewish educational network founded in 1880 in St. Petersburg, Russia. ORT (originally a Russian acronym for Society for Trades and Agricultural Labour) provides educational, technological, and vocational training. In South Africa, it serves both the Jewish community and broader society with skills development programs.');

addConn('de-beers-oppenheimer-family-legacy', [
  { name: "Ernest Oppenheimer", type: "key figure", description: "Sir Ernest Oppenheimer (Jewish, German-born, 1880-1957) took control of De Beers and built it into a diamond monopoly." },
  { name: "Harry Oppenheimer", type: "successor", description: "Harry Oppenheimer (Jewish, 1908-2000) continued the family's control of De Beers and Anglo American." },
  { name: "Nicky Oppenheimer", type: "current generation", description: "Nicky Oppenheimer (Jewish) is the current patriarch of the family." },
  { name: "Diamond monopoly", type: "business model", description: "De Beers controlled up to 85% of worldwide rough diamond distribution." },
  { name: "Anglo American", type: "related company", description: "The Oppenheimer family simultaneously controlled Anglo American Corporation." }
]);
updDesc('de-beers-oppenheimer-family-legacy', 'De Beers, the diamond giant, was led for generations by the Oppenheimer family (Jewish, German-South African). Sir Ernest Oppenheimer (1880-1957) took control in 1927 and built it into a global diamond monopoly controlling up to 85% of rough diamond distribution. Son Harry Oppenheimer (1908-2000) continued the empire, also controlling Anglo American corporation. Grandson Nicky Oppenheimer sold the family stake in 2012 for $5.1 billion. The family shaped the modern diamond industry and the phrase "A diamond is forever."');

addConn('investec', [
  { name: "South African Jewish entrepreneurs", type: "founders", description: "Founded in 1974 in Johannesburg by Jewish businessmen." },
  { name: "Dual-listed bank", type: "structure", description: "Dual-listed on the Johannesburg Stock Exchange and London Stock Exchange." },
  { name: "Specialist banking", type: "market position", description: "Specialist banking and asset management group." },
  { name: "UK and South Africa", type: "operations", description: "Major operations in both South Africa and the United Kingdom." }
]);
updDesc('investec', 'Investec is a specialist banking and asset management group founded in 1974 in Johannesburg by Jewish South African businessmen. Dual-listed on the JSE and LSE, it operates major businesses in South Africa, the UK, and other markets. Known for wealth management, corporate banking, and its distinctive zebra branding. Part of the significant contribution of South African Jewry to the country\'s financial services industry.');
addInd('investec', { name: "Bernard Gillian Memory Gilligan", bio: "Jewish South African entrepreneurs founded Investec in 1974, which grew into a major international banking group." });

addConn('discovery-limited', [
  { name: "Adrian Gore", type: "founder/CEO", description: "Founded by Adrian Gore (Jewish) in 1992." },
  { name: "Vitality program", type: "innovation", description: "Created the Vitality wellness program, a behavioral economics-based health incentive model exported globally." },
  { name: "Insurance industry", type: "market position", description: "South Africa's largest health insurance and financial services company." },
  { name: "Global licensing", type: "expansion", description: "Licensed the Vitality model to insurers in 40+ markets worldwide." }
]);
updDesc('discovery-limited', 'Discovery Limited was founded by Adrian Gore (Jewish) in 1992 and has become South Africa\'s largest health insurance company. Gore\'s groundbreaking innovation, the Vitality wellness program, uses behavioral economics to incentivize healthy living. The Vitality model has been licensed to insurance companies in over 40 markets globally, making Discovery one of South Africa\'s most innovative companies. Listed on the JSE with over 20 million lives covered.');

addConn('anglo-american-oppenheimer-legacy', [
  { name: "Ernest Oppenheimer", type: "founder", description: "Founded by Sir Ernest Oppenheimer (Jewish) in 1917." },
  { name: "Harry Oppenheimer", type: "successor", description: "Harry Oppenheimer (Jewish) led Anglo American for decades, making it one of the world's largest mining companies." },
  { name: "De Beers", type: "subsidiary", description: "Anglo American held a controlling stake in De Beers diamonds." },
  { name: "South African mining economy", type: "economic impact", description: "Dominated South Africa's mining industry — gold, diamonds, platinum, coal." }
]);
updDesc('anglo-american-oppenheimer-legacy', 'Anglo American Corporation was founded by Sir Ernest Oppenheimer (Jewish, 1880-1957) in 1917. Under him and his son Harry Oppenheimer (Jewish, 1908-2000), it became one of the world\'s largest mining companies, dominating South African gold, diamond, platinum, and coal production. Simultaneously controlled De Beers. The Oppenheimer family held enormous economic power in South Africa for nearly a century. Anglo American is now listed on the London Stock Exchange as a FTSE 100 company.');

addConn('liberty-group-donald-gordon', [
  { name: "Donald Gordon", type: "founder", description: "Founded by Sir Donald Gordon (Jewish, 1930-2019), one of South Africa's most successful businessmen." },
  { name: "Liberty Holdings", type: "company", description: "Built Liberty into South Africa's largest life insurance company." },
  { name: "Capital & Counties Properties", type: "UK expansion", description: "Gordon also founded Capital & Counties (Capco) in London, developer of Covent Garden." },
  { name: "Gordon Institute of Business Science", type: "education", description: "Endowed the Gordon Institute of Business Science at the University of Pretoria." }
]);
updDesc('liberty-group-donald-gordon', 'Liberty Group was founded by Sir Donald Gordon (Jewish, 1930-2019), who built it into South Africa\'s largest life insurance company. Gordon also created Liberty International (later Capital & Counties Properties), which developed London\'s Covent Garden into a major retail and entertainment destination. The Gordon Institute of Business Science at the University of Pretoria bears his name. One of the most successful Jewish business figures in South African history.');

addConn('johannesburg-holocaust-genocide-centre', [
  { name: "Johannesburg Jewish community", type: "community base", description: "Serves Johannesburg's large Jewish community." },
  { name: "Education", type: "mission", description: "Holocaust education and genocide prevention programs for South African schools." },
  { name: "Cape Town centre", type: "partner", description: "Works alongside the Cape Town Holocaust & Genocide Centre." }
]);
updDesc('johannesburg-holocaust-genocide-centre', 'The Johannesburg Holocaust & Genocide Centre provides Holocaust and genocide education to the Jewish community and broader South African public. Serves thousands of school students annually with educational programs connecting the Holocaust to apartheid, the Rwandan genocide, and other mass atrocities. Part of a network with the Cape Town Holocaust & Genocide Centre.');

addConn('king-david-schools', [
  { name: "South African Board of Jewish Education", type: "governing body", description: "Run by the South African Board of Jewish Education (SABJE)." },
  { name: "Johannesburg Jewish community", type: "community school", description: "The main Jewish day school system in Johannesburg." },
  { name: "Jewish education", type: "mission", description: "Provides Jewish and secular education from primary through high school." },
  { name: "Alumni network", type: "influence", description: "Produced many prominent South African Jewish leaders and professionals." }
]);
updDesc('king-david-schools', 'King David Schools are the primary Jewish day schools of Johannesburg, run by the South African Board of Jewish Education. Established in 1948, they provide Jewish and secular education from primary through high school. The schools have produced many prominent South African leaders, professionals, and business figures. With over 3,000 students across multiple campuses, they are among the largest Jewish schools in the Southern Hemisphere.');

addConn('herzlia-school-cape-town', [
  { name: "Cape Town Jewish community", type: "community school", description: "The principal Jewish school in Cape Town." },
  { name: "United Herzlia Schools", type: "system", description: "Operates multiple campuses from preschool through high school." },
  { name: "Theodor Herzl", type: "namesake", description: "Named after Theodor Herzl, founder of modern political Zionism." }
]);
updDesc('herzlia-school-cape-town', 'Herzlia School (United Herzlia Schools) is the principal Jewish day school system in Cape Town, named after Theodor Herzl, founder of modern political Zionism. Operates multiple campuses serving students from preschool through high school. Cape Town\'s Jewish community (~15,000) is known for its close-knit character and strong Zionist identity, largely of Lithuanian origin.');

addConn('south-african-friends-of-israel', [
  { name: "Israel-South Africa relations", type: "focus", description: "Promotes Israel advocacy in a politically challenging environment." },
  { name: "SAZF", type: "partner organization", description: "Works alongside the South African Zionist Federation." },
  { name: "BDS opposition", type: "advocacy", description: "Opposes BDS (Boycott, Divestment, Sanctions) campaigns in South Africa." }
]);
updDesc('south-african-friends-of-israel', 'South African Friends of Israel promotes Israel advocacy in one of the most challenging environments for pro-Israel activism. The South African government has been highly critical of Israel, and BDS (Boycott, Divestment, Sanctions) campaigns are prominent. Works alongside the SAZF and other organizations to maintain support for Israel within the Jewish community and broader South African society.');

// ============================================================
// SAVE
// ============================================================

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0; for(const c in data.countries) for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;}
console.log(`Done! ${tc} entries, ${wc} with connections, ${Object.keys(people.people).length} people.`);
let connTotal=0; for(const c in data.countries) for(const e of data.countries[c]) connTotal+=(e.connections||[]).length;
console.log(`Total connections: ${connTotal}`);
