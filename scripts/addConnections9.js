// addConnections9.js - UK, France, Canada enrichment
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
// UNITED KINGDOM
// ============================================================

addConn('jewish-leadership-council', [
  { name: "Board of Deputies of British Jews", type: "partner", description: "Works alongside the Board of Deputies as the main communal leadership body." },
  { name: "UK Government", type: "political engagement", description: "Engages directly with the UK Government on policy issues affecting the Jewish community." },
  { name: "Community Security Trust (CST)", type: "affiliate", description: "Coordinates with CST on community security matters." },
  { name: "Chief Rabbi", type: "religious leadership", description: "Works with the Office of the Chief Rabbi on communal matters." }
]);
updDesc('jewish-leadership-council', 'The Jewish Leadership Council (JLC) brings together the heads of major UK Jewish organizations to coordinate communal policy, philanthropy, and advocacy. Founded in 2003, it acts as a unified voice for the UK Jewish community in government engagement. Members include leaders from charities, schools, synagogues, and cultural organizations.');
addInd('jewish-leadership-council', { name: "Sir Mick Davis", bio: "Sir Mick Davis, South African-born British businessman (Jewish), former CEO of Xstrata mining, served as chairman of the Jewish Leadership Council and CEO of the UK Conservative Party." });

addConn('united-synagogue', [
  { name: "Chief Rabbi", type: "religious authority", description: "The United Synagogue operates under the religious authority of the Chief Rabbi of the United Hebrew Congregations." },
  { name: "Jews' Free School (JFS)", type: "affiliated school", description: "Historically connected to JFS, the largest Jewish school in Europe." },
  { name: "Board of Deputies", type: "communal partner", description: "Member organization of the Board of Deputies of British Jews." },
  { name: "London Beth Din", type: "religious court", description: "The London Beth Din operates under the United Synagogue framework." }
]);
updDesc('united-synagogue', 'The United Synagogue is the largest synagogue body in Europe, founded by Act of Parliament in 1870. It encompasses over 60 Orthodox synagogues across the UK serving approximately 40,000 member families. Operates under the religious authority of the Chief Rabbi. Maintains the London Beth Din (rabbinic court) and runs burial, kashrut, and educational services.');
addInd('united-synagogue', { name: "Sir Hermann Gollancz", bio: "Sir Hermann Gollancz (Jewish), rabbi and scholar, was a prominent leader in the United Synagogue movement in the early 20th century." });
addInd('united-synagogue', { name: "Michael Goldstein", bio: "Michael Goldstein served as president of the United Synagogue, overseeing modernization efforts." });

addConn('office-of-the-chief-rabbi', [
  { name: "United Synagogue", type: "institutional authority", description: "The Chief Rabbi serves as the religious authority of the United Synagogue." },
  { name: "House of Lords", type: "political role", description: "The Chief Rabbi has a special relationship with Parliament and is often consulted on moral and ethical issues." },
  { name: "Archbishop of Canterbury", type: "interfaith dialogue", description: "Maintains a historic interfaith relationship with the Archbishop of Canterbury." },
  { name: "Board of Deputies", type: "communal partner", description: "Works closely with the Board of Deputies on communal representation." }
]);
updDesc('office-of-the-chief-rabbi', 'The Chief Rabbi of the United Hebrew Congregations of the Commonwealth is the senior rabbi of mainstream Orthodox Judaism in the UK and Commonwealth. Chief Rabbi Ephraim Mirvis (since 2013) succeeded Lord Jonathan Sacks. The position dates back to 1704. The Chief Rabbi has a unique public role in British life, speaking on moral issues and engaging with Parliament and the Crown.');

addConn('limmud', [
  { name: "Jewish community worldwide", type: "global movement", description: "Limmud has expanded to over 90 communities in 40+ countries worldwide." },
  { name: "Cross-denominational Judaism", type: "philosophy", description: "Unique in bringing together Jews of all denominations and backgrounds for learning." },
  { name: "UK Jewish community", type: "origin", description: "Founded in the UK in 1980 as a conference for Jewish learning." },
  { name: "Jewish education", type: "mission", description: "Dedicated to Jewish learning in an inclusive, volunteer-led environment." }
]);
updDesc('limmud', 'Founded in the UK in 1980, Limmud is a volunteer-led Jewish learning festival that has grown into a global movement spanning 40+ countries and 90+ communities. Its annual conference in the UK attracts thousands of participants across all Jewish denominations. Limmud is known for its egalitarian, cross-denominational approach to Jewish education and culture.');
addInd('limmud', { name: "Clive Lawton", bio: "Clive Lawton OBE (Jewish), educator and communal leader, was a co-founder of Limmud in 1980 and helped establish it as an international Jewish learning movement." });

addConn('jewish-care', [
  { name: "UK Jewish community", type: "service area", description: "The largest health and social care charity for the Jewish community in the UK." },
  { name: "Holocaust survivors", type: "beneficiaries", description: "Provides specialized care for Holocaust survivors in the UK." },
  { name: "Fundraising events", type: "operations", description: "Raises over £50 million annually through events and donations." }
]);
updDesc('jewish-care', 'Jewish Care is the largest health and social care organization serving the Jewish community in the UK, supporting over 10,000 people each week. Founded in 1990 through the merger of the Jewish Welfare Board and Jewish Blind Society. Operates care homes, community centers, and runs mental health and dementia services. Provides specialized support for Holocaust survivors.');
addInd('jewish-care', { name: "Lord Levy", bio: "Lord Michael Levy (Jewish), Labour Party fundraiser and life peer, has served as president of Jewish Care and is one of its principal supporters." });
addInd('jewish-care', { name: "Steven Lewis", bio: "Steven Lewis CBE (Jewish), businessman, served as chairman of Jewish Care, overseeing major expansion of services." });

addConn('world-jewish-relief', [
  { name: "JDC (American Jewish Joint Distribution Committee)", type: "international partner", description: "Works with JDC on global Jewish humanitarian relief." },
  { name: "UK Government (DFID/FCDO)", type: "government funding", description: "Receives funding from the UK Government's foreign aid budget for humanitarian work." },
  { name: "Holocaust remembrance", type: "origin", description: "Originally founded in 1933 as the Central British Fund to rescue Jews from Nazi persecution." },
  { name: "Eastern European Jewish communities", type: "focus area", description: "Provides welfare support to Jewish communities in the former Soviet Union." }
]);
updDesc('world-jewish-relief', 'Founded in 1933 as the Central British Fund for German Jewry, World Jewish Relief has been the UK Jewish community\'s international humanitarian agency for over 90 years. Originally created to rescue Jews from Nazi persecution, it aided the Kindertransport. Today it provides disaster relief, livelihood support, and welfare programs globally, with particular focus on elderly Jews in the former Soviet Union.');
addInd('world-jewish-relief', { name: "Sir Moses Montefiore", bio: "Sir Moses Montefiore (Jewish, 1784-1885), British financier, philanthropist, and Sheriff of London, was a pioneering figure in Jewish humanitarian relief efforts from Britain." });

addConn('jewish-chronicle', [
  { name: "UK Jewish community", type: "readership", description: "Serving as the voice of Anglo-Jewry for nearly 200 years." },
  { name: "Board of Deputies", type: "coverage", description: "Extensively covers Board of Deputies activities and UK Jewish communal affairs." },
  { name: "Israel", type: "editorial focus", description: "Substantial coverage of Israel and Middle East affairs." },
  { name: "John Ware", type: "journalist", description: "BBC Panorama journalist who became closely associated with the JC for investigative work." }
]);
updDesc('jewish-chronicle', 'The Jewish Chronicle (JC) is the world\'s oldest continuously published Jewish newspaper, founded in London in 1841. It serves as the primary news organ of British Jewry, covering communal affairs, Israel, antisemitism, and culture. Has been edited by notable figures including Leopold Greenberg and William Frankel. Purchased from insolvency in 2020 by a consortium led by Sir Robbie Gibb.');
addInd('jewish-chronicle', { name: "Leopold Greenberg", bio: "Leopold Greenberg (Jewish, 1861-1931), editor of the Jewish Chronicle for 26 years, was a key Zionist leader and confidant of Theodor Herzl." });

addConn('jewish-news', [
  { name: "Jewish Chronicle", type: "competitor/peer", description: "Rivals the Jewish Chronicle as a leading Anglo-Jewish publication." },
  { name: "UK Jewish community", type: "readership", description: "Serves the UK Jewish community with weekly news coverage." },
  { name: "IPSO", type: "press regulation", description: "Regulated by the Independent Press Standards Organisation." }
]);
updDesc('jewish-news', 'The Jewish News is a weekly newspaper serving the British Jewish community, founded in 1997. It competes with the Jewish Chronicle as a major Anglo-Jewish publication and covers communal news, Israel, culture, and social issues. Known for a more centrist editorial approach. Distributed free in Jewish areas of North London and available nationally.');
addInd('jewish-news', { name: "Justin Cohen", bio: "Justin Cohen (Jewish), journalist and editor, has served as a senior editorial figure at the Jewish News, shaping its coverage of Anglo-Jewish affairs." });

addConn('campaign-against-antisemitism', [
  { name: "Crown Prosecution Service", type: "legal partner", description: "Works with the CPS to ensure antisemitic crimes are prosecuted." },
  { name: "UK Government", type: "policy advocacy", description: "Successfully lobbied for adoption of the IHRA definition of antisemitism." },
  { name: "Social media companies", type: "monitoring", description: "Monitors and reports antisemitic content on social media platforms." },
  { name: "Labour antisemitism crisis", type: "major campaign", description: "Played a central role in exposing antisemitism in the Labour Party under Jeremy Corbyn." }
]);
updDesc('campaign-against-antisemitism', 'Campaign Against Antisemitism (CAA) is a UK charity founded in 2014 in response to rising antisemitism during the Gaza conflict. It monitors, reports, and prosecutes antisemitic incidents. Played a major role in the Labour Party antisemitism crisis, filing complaints against party members and commissioning the Equality and Human Rights Commission investigation. Publishes annual antisemitism barometer surveys.');
addInd('campaign-against-antisemitism', { name: "Gideon Falter", bio: "Gideon Falter (Jewish), founder and chairman of Campaign Against Antisemitism, established the charity in 2014 and led its campaigns against antisemitism in British public life." });

addConn('institute-for-jewish-policy-research-jpr', [
  { name: "European Jewish communities", type: "research scope", description: "Conducts demographic and social research on Jewish communities across Europe." },
  { name: "UK Government", type: "policy advisory", description: "Research informs government policy on antisemitism and community relations." },
  { name: "Board of Deputies", type: "data provider", description: "Provides critical demographic data and research to the Board of Deputies." },
  { name: "Pears Foundation", type: "funder", description: "Pears Foundation is a major funder of JPR research programs." }
]);
updDesc('institute-for-jewish-policy-research-jpr', 'The Institute for Jewish Policy Research (JPR) is a London-based research institute focusing on Jewish life in Europe. Founded in 1941 as the Institute of Jewish Affairs by the World Jewish Congress, it produces authoritative studies on Jewish demographics, identity, antisemitism, and education. Its National Jewish Community Survey is the most comprehensive study of British Jewish life.');
addInd('institute-for-jewish-policy-research-jpr', { name: "Jonathan Boyd", bio: "Jonathan Boyd (Jewish), executive director of JPR, leads the institute\'s research programs on European Jewish demographics, identity, and antisemitism." });

addConn('leo-baeck-college', [
  { name: "Reform and Liberal Judaism", type: "denominations served", description: "Trains rabbis for both the Reform and Liberal Jewish movements." },
  { name: "Leo Baeck", type: "namesake", description: "Named after Rabbi Leo Baeck (1873-1956), leader of German Jewry during the Nazi era." },
  { name: "University of London", type: "academic affiliation", description: "Degrees validated by the University of London." },
  { name: "European rabbinical training", type: "role", description: "The primary centre for non-Orthodox rabbinical training in Europe." }
]);
updDesc('leo-baeck-college', 'Leo Baeck College is the premier centre for Progressive rabbinical training in Europe, founded in London in 1956. Named after Rabbi Leo Baeck, the last leader of German Jewry under the Nazis. Trains rabbis and educators for Reform, Liberal, and Masorti movements. Affiliated with the University of London for degree validation. Has ordained hundreds of rabbis serving communities worldwide.');
addInd('leo-baeck-college', { name: "Rabbi Leo Baeck", bio: "Rabbi Leo Baeck (Jewish, 1873-1956), German rabbi, theologian, and leader of Progressive Judaism, led the Reich Association of German Jews under Nazi rule and survived Theresienstadt concentration camp." });

addConn('the-rothschild-foundation', [
  { name: "Waddesdon Manor", type: "heritage property", description: "Manages Waddesdon Manor, a National Trust property built by the Rothschild family." },
  { name: "Rothschild banking family", type: "origin", description: "Philanthropy arm of the Rothschild family, one of the wealthiest banking dynasties in history." },
  { name: "Jewish communal organizations", type: "grants", description: "Major funder of Jewish educational, cultural, and welfare organizations in the UK." },
  { name: "Arts and heritage", type: "focus area", description: "Supports arts, heritage preservation, and environmental conservation." }
]);
updDesc('the-rothschild-foundation', 'The Rothschild Foundation (Hanadiv) is the philanthropic arm of the Rothschild family in the UK. Major grants support Jewish education, culture, heritage preservation, and Israel (funded the construction of the Knesset and Supreme Court buildings in Jerusalem). Manages Waddesdon Manor, a Rothschild estate and National Trust property in Buckinghamshire housing one of the world\'s finest collections of French decorative arts.');

addConn('jews-free-school-jfs', [
  { name: "United Synagogue", type: "religious authority", description: "Operates under the religious authority of the United Synagogue and the Chief Rabbi." },
  { name: "UK education system", type: "state school", description: "State-funded comprehensive school in the UK academy system." },
  { name: "Largest Jewish school in Europe", type: "distinction", description: "With over 2,000 students, JFS is the largest Jewish school in Europe." }
]);
updDesc('jews-free-school-jfs', 'JFS (formerly Jews\' Free School) is the largest Jewish secondary school in Europe, with over 2,000 students. Founded in 1732 in London\'s East End, it is one of the oldest schools in the UK. Now located in Kenton, Harrow, it operates as a state-funded academy under Orthodox Jewish auspices. Historic alumni include many prominent figures in British Jewish life.');
addInd('jews-free-school-jfs', { name: "Moses Angel", bio: "Moses Angel (Jewish, 1819-1898), headmaster of Jews\' Free School for 50 years (1842-1897), transformed it into one of the largest schools in England with over 4,000 pupils." });

addConn('tesco-jack-cohen-legacy', [
  { name: "Jack Cohen", type: "founder", description: "Jack Cohen (Jewish, 1898-1979) founded Tesco from a market stall in London's East End in 1919." },
  { name: "UK retail industry", type: "market dominance", description: "Tesco is the UK's largest retailer and one of the world's largest, with over £60 billion in revenue." },
  { name: "Dame Shirley Porter", type: "family legacy", description: "Jack Cohen's daughter Dame Shirley Porter (Jewish) was Leader of Westminster City Council." },
  { name: "British high street", type: "cultural impact", description: "Tesco fundamentally changed British shopping habits with the supermarket revolution." }
]);
updDesc('tesco-jack-cohen-legacy', 'Tesco was founded by Jack Cohen (Jewish, 1898-1979), who began selling surplus groceries from a market stall in London\'s East End in 1919. The name came from combining tea supplier T.E. Stockwell\'s initials with Cohen. Cohen built it into the UK\'s largest retailer with over 4,500 stores and £60+ billion annual revenue. His daughter Dame Shirley Porter (Jewish) became a controversial Leader of Westminster City Council.');

addConn('n-m-rothschild-sons', [
  { name: "Nathan Mayer Rothschild", type: "founder", description: "Founded in 1811 by Nathan Mayer Rothschild (Jewish), who became the wealthiest person in the world." },
  { name: "Bank of England", type: "historic relationship", description: "Historically helped finance the British government including during the Napoleonic Wars." },
  { name: "Suez Canal", type: "historic deal", description: "Financed the British government's purchase of shares in the Suez Canal Company in 1875." },
  { name: "Global Rothschild banking network", type: "family enterprise", description: "Part of the Rothschild family's banking network spanning London, Paris, Vienna, Naples, and Frankfurt." },
  { name: "London gold fixing", type: "market role", description: "Chaired the London Gold Fixing from 1919 to 2004." }
]);
updDesc('n-m-rothschild-sons', 'N M Rothschild & Sons is a British multinational investment bank founded in 1811 by Nathan Mayer Rothschild (Jewish, 1777-1836), who became the wealthiest person in the world. Financed the British war effort against Napoleon and the 1875 Suez Canal purchase. Chaired the London Gold Fixing from 1919 to 2004. Part of the legendary Rothschild banking dynasty spanning five European countries. Now operates as Rothschild & Co with €2+ billion revenue.');

addConn('uk-jewish-film-festival', [
  { name: "UK Jewish cultural scene", type: "cultural platform", description: "Largest Jewish film festival in the UK, showcasing Jewish cinema and stories." },
  { name: "BFI (British Film Institute)", type: "venue partner", description: "Screenings held at prestigious venues including BFI Southbank." },
  { name: "International film festivals", type: "network", description: "Part of a network of Jewish film festivals worldwide." }
]);
updDesc('uk-jewish-film-festival', 'The UK Jewish Film Festival (UKJFF) is the largest Jewish film festival in the UK, presenting films exploring Jewish life, identity, history, and culture. Screenings take place at major venues including BFI Southbank. The festival showcases both established and emerging filmmakers and serves as a cultural bridge between Jewish and wider British audiences.');

addConn('wiener-holocaust-library', [
  { name: "Holocaust education", type: "mission", description: "One of the world's leading archives on the Holocaust and genocide." },
  { name: "Alfred Wiener", type: "founder", description: "Founded by Dr. Alfred Wiener (Jewish), who began collecting anti-Nazi material in the 1930s." },
  { name: "Nuremberg Trials", type: "historic contribution", description: "Materials from the library were used as evidence in the Nuremberg Trials." },
  { name: "University of London", type: "academic partner", description: "Located at the Senate House of the University of London." }
]);
updDesc('wiener-holocaust-library', 'The Wiener Holocaust Library is one of the world\'s oldest and most extensive archives on the Holocaust, founded in 1933 by Dr. Alfred Wiener (Jewish). Wiener began collecting antisemitic material in the 1930s as evidence against the Nazi regime. Materials were used in the Nuremberg Trials. Now located at the University of London\'s Senate House, it holds over one million items including documents, photographs, and testimonies.');
addInd('wiener-holocaust-library', { name: "Alfred Wiener", bio: "Dr. Alfred Wiener (Jewish, 1885-1964), German-born librarian and activist, founded the Wiener Library in Amsterdam in 1933 to document Nazi antisemitism. The collection was moved to London in 1939 and used as evidence at Nuremberg." });

addConn('london-school-of-jewish-studies-lsjs', [
  { name: "Chief Rabbi", type: "religious authority", description: "Founded by the Chief Rabbi as a centre of Jewish adult education." },
  { name: "United Synagogue", type: "institutional connection", description: "Closely associated with the United Synagogue and Orthodox Judaism." },
  { name: "University accreditation", type: "academic status", description: "Offers accredited degree-level programs in Jewish studies." }
]);
updDesc('london-school-of-jewish-studies-lsjs', 'The London School of Jewish Studies (formerly Jews\' College, founded 1855) is the UK\'s oldest institution of Jewish higher education. Founded at the initiative of Chief Rabbi Nathan Marcus Adler, it trains teachers, community professionals, and lay leaders. Offers degree-level programs in Jewish education and thought, accredited by UK higher education bodies.');

addConn('jews-college-heythrop-association', [
  { name: "London School of Jewish Studies", type: "successor", description: "Jews' College rebranded as the London School of Jewish Studies in 1999." },
  { name: "Chief Rabbi Nathan Adler", type: "founder", description: "Founded in 1855 by Chief Rabbi Nathan Marcus Adler." },
  { name: "British Orthodox rabbinate", type: "training centre", description: "Trained generations of Orthodox rabbis for the British Empire." }
]);
updDesc('jews-college-heythrop-association', 'Jews\' College (1855-1999), founded by Chief Rabbi Nathan Marcus Adler, was the premier institution for training Orthodox rabbis and Jewish scholars in Britain. For nearly 150 years it produced communal leaders throughout the British Empire and Commonwealth. Rebranded as the London School of Jewish Studies (LSJS) in 1999 to reflect its broader educational mission.');

addConn('union-of-jewish-students-ujs', [
  { name: "National Union of Students (NUS)", type: "student politics", description: "Represents Jewish students within the NUS and on university campuses." },
  { name: "UK universities", type: "campus presence", description: "Active on over 60 university campuses across the UK." },
  { name: "Campaign Against Antisemitism", type: "collaboration", description: "Works with CAA and CST on campus antisemitism issues." },
  { name: "Israel advocacy", type: "activity", description: "Engages in Israel education and advocacy on campuses." }
]);
updDesc('union-of-jewish-students-ujs', 'The Union of Jewish Students (UJS) represents Jewish students at over 60 universities across the UK and Ireland. Founded in 1919, it is one of the oldest Jewish student organizations in the world. Runs Jewish societies (JSocs) on campuses, combats antisemitism in student politics, and provides leadership development for young Jewish people.');

addConn('chelsea-football-club-abramovich-era', [
  { name: "Roman Abramovich", type: "former owner", description: "Roman Abramovich (Jewish, Russian-Israeli oligarch) owned Chelsea FC from 2003 to 2022, investing over £1.5 billion." },
  { name: "Premier League", type: "competition", description: "Chelsea won 5 Premier League titles and 2 Champions League titles under Abramovich." },
  { name: "Todd Boehly", type: "new owner", description: "Sold to a consortium led by Todd Boehly (Jewish, American businessman) in 2022 for £4.25 billion." },
  { name: "Antisemitism in football", type: "social issue", description: "Chelsea launched the 'Say No to Antisemitism' campaign." }
]);
updDesc('chelsea-football-club-abramovich-era', 'Chelsea FC was transformed by owner Roman Abramovich (Jewish, Russian-Israeli billionaire) from 2003 to 2022. He invested over £1.5 billion, winning 5 Premier League titles and 2 Champions Leagues. Sold for a record £4.25 billion in 2022 to a consortium led by Todd Boehly (Jewish, American businessman) after UK sanctions on Abramovich. Chelsea launched a high-profile antisemitism awareness campaign.');

addConn('tottenham-hotspur-f-c', [
  { name: "Jewish community of North London", type: "fan base", description: "Historically associated with the Jewish community of North London due to the areas surrounding White Hart Lane." },
  { name: "ENIC Group / Joe Lewis", type: "ownership", description: "Owned by ENIC Group controlled by Joe Lewis (British billionaire) and Daniel Levy (Jewish) as chairman." },
  { name: "Daniel Levy", type: "chairman", description: "Daniel Levy (Jewish) has been chairman since 2001, overseeing the new stadium build." },
  { name: "'Yid' identity", type: "cultural phenomenon", description: "Spurs fans call themselves 'Yid Army' , a reclamation of an antisemitic slur that remains controversial." }
]);
updDesc('tottenham-hotspur-f-c', 'Tottenham Hotspur has deep connections to North London\'s Jewish community, with the area around White Hart Lane historically home to many Jewish families. Chairman Daniel Levy (Jewish) has led the club since 2001 and oversaw the £1 billion new stadium. Fans controversially call themselves the "Yid Army." The club has actively campaigned against antisemitism while acknowledging its Jewish cultural connections.');

addConn('pears-foundation', [
  { name: "JPR (Institute for Jewish Policy Research)", type: "major grantee", description: "One of the largest funders of JPR's research programs." },
  { name: "UK Jewish community", type: "philanthropy", description: "Major funder of Jewish education, welfare, and cultural projects in the UK." },
  { name: "Pears family", type: "founder", description: "Established by the Pears family, major UK property developers." },
  { name: "Global development", type: "focus area", description: "Also funds international development and conflict resolution programs." }
]);
updDesc('pears-foundation', 'The Pears Foundation is one of the UK\'s most significant Jewish philanthropies, established by the Pears family (Jewish), who built a major UK property development business. Funds Jewish education, welfare, and identity programs; international development; and social justice initiatives. A principal funder of the Institute for Jewish Policy Research (JPR) and the Pears Institute for the Study of Antisemitism at Birkbeck, University of London.');
addInd('pears-foundation', { name: "Sir Trevor Pears", bio: "Sir Trevor Pears CMG (Jewish), executive chair of the Pears Foundation and director of the William Pears Group property business, is one of the UK's leading Jewish philanthropists." });

addConn('dangoor-family-exilarch-s-foundation', [
  { name: "Iraqi Jewish heritage", type: "heritage preservation", description: "The Dangoor family are Iraqi Jews who fled Baghdad and became major UK business figures." },
  { name: "Babylonian Jewry Heritage Center", type: "cultural connection", description: "Connected to preserving the heritage of Babylonian (Iraqi) Jewry." },
  { name: "UK philanthropy", type: "giving", description: "Major philanthropic support for education, interfaith dialogue, and Jewish causes." }
]);
updDesc('dangoor-family-exilarch-s-foundation', 'The Exilarch\'s Foundation was established by Sir Naim Dangoor (Jewish, 1914-2015), an Iraqi-born British businessman who fled Baghdad in 1964. Dangoor claimed descent from King David through the Exilarchs (leaders of Babylonian Jewry). The foundation supports education, interfaith dialogue, and Jewish heritage preservation. The family magazine "The Scribe" documented Babylonian Jewish history.');

addConn('freuds-communications', [
  { name: "Matthew Freud", type: "founder", description: "Founded by Matthew Freud (Jewish), great-grandson of Sigmund Freud." },
  { name: "Sigmund Freud", type: "family legacy", description: "Matthew is the great-grandson of Sigmund Freud, founder of psychoanalysis." },
  { name: "UK media and PR industry", type: "market position", description: "One of the UK's most prominent PR and communications firms." },
  { name: "Rupert Murdoch connection", type: "family tie", description: "Matthew Freud was married to Elisabeth Murdoch, daughter of Rupert Murdoch." }
]);
updDesc('freuds-communications', 'Freuds is a leading UK communications and PR firm founded by Matthew Freud (Jewish), great-grandson of Sigmund Freud. The firm represents major global brands and has been central to UK media and politics. Matthew Freud was previously married to Elisabeth Murdoch (daughter of Rupert Murdoch). The Freud family represents one of the most influential intellectual dynasties of the modern era.');

addConn('marks-spencer-m-s', [
  { name: "Michael Marks", type: "co-founder", description: "Michael Marks (Jewish, Polish immigrant) co-founded Marks & Spencer as a penny bazaar in Leeds in 1884." },
  { name: "Tom Spencer", type: "co-founder", description: "Tom Spencer joined Marks to form the partnership in 1894." },
  { name: "Simon Marks", type: "key leader", description: "Simon Marks (Jewish), son of Michael, transformed M&S into a national retail chain." },
  { name: "Israel Sieff", type: "key leader", description: "Israel Sieff (Jewish, later Lord Sieff) was Simon Marks's lifelong partner in business and Zionism." },
  { name: "British retail icon", type: "cultural impact", description: "M&S became a symbol of British middle-class life, known for quality clothing and food." }
]);
updDesc('marks-spencer-m-s', 'Marks & Spencer was co-founded by Michael Marks (Jewish, Polish immigrant) with his penny bazaar in Leeds in 1884. His son Simon Marks (Jewish, later Lord Marks) and brother-in-law Israel Sieff (Jewish, later Lord Sieff) transformed it into one of Britain\'s most iconic retailers. Both Marks and Sieff were prominent Zionists who supported Chaim Weizmann. M&S has over 1,000 stores and is synonymous with British retail.');

addConn('arcadia-group-topshop-philip-green', [
  { name: "Sir Philip Green", type: "owner", description: "Sir Philip Green (Jewish) built Arcadia into a retail empire including Topshop, Dorothy Perkins, Burton, and Miss Selfridge." },
  { name: "BHS scandal", type: "controversy", description: "Green sold BHS for £1 to Dominic Chappell; it collapsed with a £571m pension deficit." },
  { name: "UK retail collapse", type: "fate", description: "Arcadia Group collapsed into administration in 2020 during the pandemic." },
  { name: "Tina Green", type: "family business", description: "Assets were held in the name of wife Tina Green (Jewish), based in Monaco." }
]);
updDesc('arcadia-group-topshop-philip-green', 'Arcadia Group was owned by Sir Philip Green (Jewish, b. 1952), who built a retail empire including Topshop, Burton, Dorothy Perkins, and Miss Selfridge. Green was once worth £5 billion and was known as the "King of the High Street." Controversially sold BHS for £1 to Dominic Chappell, leading to its collapse with a £571 million pension deficit. Arcadia itself fell into administration in 2020.');

addConn('entain-formerly-gvc-holdings', [
  { name: "Online gambling industry", type: "market position", description: "One of the world's largest sports betting and gaming companies." },
  { name: "Ladbrokes Coral", type: "acquisition", description: "Acquired Ladbrokes Coral to become a major UK high street and online betting brand." },
  { name: "Israeli tech origins", type: "development", description: "Significant technology and development operations in Israel." }
]);
updDesc('entain-formerly-gvc-holdings', 'Entain plc (formerly GVC Holdings) is one of the world\'s largest sports betting and gaming companies, operating brands including Ladbrokes, Coral, bwin, and Sportingbet. Significant technology operations in Israel. Listed on the FTSE 100 with revenues exceeding £3.5 billion. The company has expanded into the US through its BetMGM joint venture with MGM Resorts.');

addConn('888-holdings', [
  { name: "Israeli founders", type: "origin", description: "Founded in 1997 by Israeli entrepreneurs and headquartered in Gibraltar with R&D in Israel." },
  { name: "Online gambling industry", type: "market position", description: "Major online gambling company operating casino, sports betting, and poker platforms." },
  { name: "William Hill", type: "acquisition", description: "Acquired William Hill's non-US business in 2022." },
  { name: "London Stock Exchange", type: "listing", description: "Listed on the London Stock Exchange." }
]);
updDesc('888-holdings', 'Founded in 1997 by Israeli entrepreneurs (the Shaked and Ben-Yitzhak families), 888 Holdings is a major online gambling company headquartered in Gibraltar with significant R&D operations in Israel. Operates 888casino, 888sport, and 888poker. Acquired William Hill\'s non-US operations in 2022 for £2.2 billion. Listed on the London Stock Exchange with revenues exceeding £1.5 billion.');
addInd('888-holdings', { name: "Avi Shaked", bio: "Avi Shaked (Jewish, Israeli), co-founder of 888 Holdings, helped build one of the world's largest online gambling platforms from its origins in Israel." });

addConn('plus500', [
  { name: "Israeli founders", type: "origin", description: "Founded in 2008 in Haifa, Israel by six Technion graduates." },
  { name: "London Stock Exchange", type: "listing", description: "Listed on the London Stock Exchange's Main Market." },
  { name: "CFD trading", type: "core business", description: "One of the world's largest providers of Contracts for Difference (CFD) trading." },
  { name: "Atletico Madrid", type: "sponsorship", description: "Sponsor of Atletico Madrid football club." }
]);
updDesc('plus500', 'Plus500 is a leading online trading platform founded in 2008 by six alumni of the Technion (Israel Institute of Technology) in Haifa. Provides Contracts for Difference (CFD) and financial trading services to retail investors worldwide. Listed on the London Stock Exchange. Acquired futures trading platform cunningly to diversify beyond CFDs. Sponsor of Atletico Madrid.');

addConn('the-rothschild-archive', [
  { name: "Rothschild banking family", type: "subject", description: "Houses the archives of the Rothschild banking dynasty, one of the most influential families in modern history." },
  { name: "N M Rothschild & Sons", type: "institutional connection", description: "Archives of the London branch of the Rothschild banking house." },
  { name: "Waddesdon Manor", type: "Rothschild property", description: "Connected to the Rothschild network including Waddesdon Manor heritage site." },
  { name: "Financial history", type: "academic resource", description: "Major resource for scholars studying the history of international finance and Jewish history." }
]);
updDesc('the-rothschild-archive', 'The Rothschild Archive preserves the business and family records of the Rothschild banking dynasty, one of the most influential families in modern history. Located in London, it holds papers dating from the late 18th century documenting the family\'s role in European finance, diplomacy, philanthropy, and Jewish emancipation. The collection is a primary source for the history of international finance.');

addConn('manchester-jewish-museum', [
  { name: "Manchester Jewish community", type: "focus", description: "Documents the history of one of the UK's largest Jewish communities outside London." },
  { name: "Spanish & Portuguese Synagogue", type: "building", description: "Housed in a former Spanish and Portuguese synagogue built in 1874." },
  { name: "Immigration history", type: "theme", description: "Tells the story of Jewish immigration from Eastern Europe to Manchester." }
]);
updDesc('manchester-jewish-museum', 'Manchester Jewish Museum is housed in a former Spanish and Portuguese synagogue (1874) in Cheetham Hill. It tells the story of Manchester\'s Jewish community, one of the largest in the UK, from 19th-century immigration through to the present day. Underwent a major £6 million renovation. Manchester\'s Jewish community has produced notable figures including Michael Marks (founder of Marks & Spencer) and Chaim Weizmann (who worked at Manchester University before becoming Israel\'s first president).');

addConn('jewish-museum-london', [
  { name: "UK Jewish heritage", type: "mission", description: "The UK's principal museum of Jewish history and culture." },
  { name: "Camden Town", type: "location", description: "Located in Camden Town, London." },
  { name: "Holocaust Gallery", type: "exhibition", description: "Features a Holocaust gallery with survivor testimonies." },
  { name: "350+ years of Anglo-Jewish history", type: "scope", description: "Covers Jewish life in Britain from the readmission under Cromwell in 1656 to the present." }
]);
updDesc('jewish-museum-london', 'The Jewish Museum London, located in Camden Town, is the UK\'s principal museum of Jewish life, history, and culture. Covers over 360 years of Anglo-Jewish history from the readmission of Jews under Oliver Cromwell in 1656 to the present day. Features collections of ceremonial art, Holocaust galleries with survivor testimonies, and rotating exhibitions on contemporary Jewish identity.');

addConn('bevis-marks-synagogue', [
  { name: "Oldest synagogue in Britain", type: "historic status", description: "The oldest synagogue in Britain, in continuous use since 1701." },
  { name: "Sephardi community", type: "congregation", description: "Serves the Spanish and Portuguese Jewish (Sephardi) community of London." },
  { name: "City of London", type: "location", description: "Located in the City of London, the financial district." },
  { name: "Amsterdam Portuguese Synagogue", type: "architectural model", description: "Designed in the style of the Esnoga (Portuguese Synagogue of Amsterdam)." }
]);
updDesc('bevis-marks-synagogue', 'Bevis Marks Synagogue is the oldest synagogue in Britain, in continuous use since its opening in 1701. Built for London\'s Sephardi (Spanish and Portuguese Jewish) community, it was modeled on the Portuguese Synagogue of Amsterdam. Located in the City of London, it was built by Quaker builder Joseph Avis. Queen Anne donated an oak beam for the building. The synagogue uses candles rather than electric light for Shabbat services.');

addConn('kindertransport-association-uk', [
  { name: "Kindertransport", type: "historic event", description: "The Kindertransport rescued nearly 10,000 Jewish children from Nazi-occupied Europe to the UK in 1938-1940." },
  { name: "UK Parliament", type: "legislative origin", description: "Made possible by the UK Parliament's decision to allow unaccompanied refugee children to enter Britain." },
  { name: "Nicholas Winton", type: "key rescuer", description: "Sir Nicholas Winton organized the rescue of 669 children from Czechoslovakia." },
  { name: "Holocaust remembrance", type: "legacy", description: "The Kindertransport is one of the most celebrated rescue efforts of the Holocaust." }
]);
updDesc('kindertransport-association-uk', 'The Kindertransport brought nearly 10,000 Jewish children from Nazi-occupied Europe to safety in the UK between December 1938 and September 1940. Organized by Jewish, Quaker, and Christian groups following Kristallnacht. Sir Nicholas Winton organized the rescue of 669 children from Czechoslovakia. Many "Kinder" never saw their parents again. The Kindertransport Association preserves this legacy through commemoration and education.');
addInd('kindertransport-association-uk', { name: "Sir Nicholas Winton", bio: "Sir Nicholas Winton (1909-2015), British humanitarian, organized the rescue of 669 mostly Jewish children from Nazi-occupied Czechoslovakia via the Kindertransport. His efforts were unknown until 1988." });

// ============================================================
// FRANCE
// ============================================================

addConn('crif-conseil-repr-sentatif-des-institutions-juives-de-france', [
  { name: "French Government", type: "political engagement", description: "CRIF's annual dinner is attended by the French President and is a key event in French political life." },
  { name: "French Jewish community (500,000+)", type: "constituency", description: "Represents the largest Jewish community in Europe and third-largest in the world." },
  { name: "Fight against antisemitism", type: "core mission", description: "Primary advocacy body against antisemitism in France." },
  { name: "Israel-France relations", type: "diplomatic role", description: "Plays a significant role in France-Israel bilateral relations." }
]);
updDesc('crif-conseil-repr-sentatif-des-institutions-juives-de-france', 'CRIF (Conseil Représentatif des Institutions Juives de France) is the umbrella representative body of French Jewry, founded in 1944 during the Resistance. Represents the largest Jewish community in Europe (~500,000). Its annual dinner with the French President is one of the most high-profile political events in France. CRIF advocates against antisemitism and for France-Israel relations.');
addInd('crif-conseil-repr-sentatif-des-institutions-juives-de-france', { name: "Francis Kalifat", bio: "Francis Kalifat (Jewish, French), served as president of CRIF, leading its advocacy against antisemitism and efforts to strengthen France-Israel relations." });

addConn('consistoire-central-isra-lite-de-france', [
  { name: "Napoleon Bonaparte", type: "historic origin", description: "Established by Napoleon Bonaparte in 1808 to organize Jewish religious life in France." },
  { name: "Grand Rabbinat de France", type: "religious authority", description: "Oversees the Grand Rabbinate of France and chief rabbinical appointments." },
  { name: "Kashrut certification", type: "services", description: "Manages kashrut (kosher) certification for France." },
  { name: "French Republic", type: "institutional status", description: "Has a unique institutional status in the French secular republic, dating to Napoleon." }
]);
updDesc('consistoire-central-isra-lite-de-france', 'The Consistoire Central Israélite de France is the official religious body of French Jewry, established by Napoleon Bonaparte in 1808 to organize and administer Jewish religious life. Oversees the Grand Rabbinate of France, synagogues, kashrut certification, and rabbinic courts. Unique in that it was created by state decree and maintains a special institutional status within France\'s secular republic (laïcité).');
addInd('consistoire-central-isra-lite-de-france', { name: "Grand Rabbi Haïm Korsia", bio: "Grand Rabbi Haïm Korsia (Jewish, born 1963), Chief Rabbi of France since 2014, represents French Jewry in interfaith and public affairs. Previously served as chaplain general of the French armed forces." });

addConn('alliance-isra-lite-universelle', [
  { name: "Global Jewish education", type: "mission", description: "Founded in 1860 to provide education to Jewish communities worldwide, one of the oldest Jewish organizations." },
  { name: "French language and culture", type: "educational approach", description: "Promoted French language education in Jewish communities across the Middle East and North Africa." },
  { name: "Human rights", type: "advocacy", description: "One of the first international organizations dedicated to defending Jewish rights worldwide." },
  { name: "Sephardi communities", type: "impact", description: "Had enormous impact on Sephardi and Mizrahi Jewish communities through its school networks." }
]);
updDesc('alliance-isra-lite-universelle', 'The Alliance Israélite Universelle, founded in Paris in 1860, is one of the oldest and most important Jewish international organizations. Created to defend Jewish human rights worldwide and promote education, it established a vast network of schools across the Middle East, North Africa, and the Balkans that educated generations of Sephardi and Mizrahi Jews. Its school system at its peak spanned from Morocco to Iran. Headquarters in Paris houses a major Jewish library and archives.');
addInd('alliance-isra-lite-universelle', { name: "Adolphe Crémieux", bio: "Adolphe Crémieux (Jewish, 1796-1880), French lawyer and statesman, co-founded the Alliance Israélite Universelle in 1860 and authored the Crémieux Decree granting French citizenship to Algerian Jews." });

addConn('fondation-pour-la-m-moire-de-la-shoah', [
  { name: "French government restitution", type: "origin", description: "Established in 2000 with funds from the French state's restitution of assets seized from Jews during Vichy." },
  { name: "Mémorial de la Shoah", type: "major grantee", description: "Principal funder of the Mémorial de la Shoah in Paris." },
  { name: "Holocaust research", type: "mission", description: "Funds Holocaust research, education, remembrance, and solidarity programs." },
  { name: "Vichy regime legacy", type: "historic context", description: "Created after France acknowledged its responsibility in the deportation of Jews under Vichy." }
]);
updDesc('fondation-pour-la-m-moire-de-la-shoah', 'The Fondation pour la Mémoire de la Shoah (Foundation for the Memory of the Holocaust) was established in 2000 using funds from the French state\'s restitution of assets spoliated from Jews under the Vichy regime. Endowed with €393 million, it funds Holocaust research, education, and remembrance, as well as Jewish culture and solidarity programs. Principal funder of the Mémorial de la Shoah in Paris.');

addConn('spcj-service-de-protection-de-la-communaut-juive', [
  { name: "CRIF", type: "parent organization", description: "Operates under the auspices of CRIF." },
  { name: "French police/gendarmerie", type: "security coordination", description: "Coordinates with French security services for protection of Jewish sites." },
  { name: "Community Security Trust (UK)", type: "counterpart", description: "French equivalent of the UK's Community Security Trust." },
  { name: "Antisemitic attacks monitoring", type: "core function", description: "Monitors and reports antisemitic incidents across France." }
]);
updDesc('spcj-service-de-protection-de-la-communaut-juive', 'The SPCJ (Service de Protection de la Communauté Juive) is the security organization of the French Jewish community, providing protection for synagogues, schools, and communal institutions. Coordinates with French police and intelligence services. Publishes annual reports on antisemitic incidents in France. The French equivalent of the UK\'s Community Security Trust (CST).');

addConn('m-morial-de-la-shoah-paris', [
  { name: "Fondation pour la Mémoire de la Shoah", type: "principal funder", description: "Primarily funded by the Fondation pour la Mémoire de la Shoah." },
  { name: "Yad Vashem", type: "partner institution", description: "Partners with Yad Vashem on research and commemoration." },
  { name: "Wall of Names", type: "key feature", description: "Features the Wall of Names listing 76,000 Jews deported from France." },
  { name: "Marais district", type: "location", description: "Located in the historic Jewish quarter of the Marais, Paris." }
]);
updDesc('m-morial-de-la-shoah-paris', 'The Mémorial de la Shoah is France\'s national Holocaust memorial and museum, located in the historic Marais (Jewish quarter) of Paris. Inaugurated in 2005 on the site of the earlier Memorial to the Unknown Jewish Martyr (1956). Features the Wall of Names inscribed with the names of 76,000 Jews deported from France. Houses extensive archives and a documentation center on the Holocaust in France.');

addConn('ose-uvre-de-secours-aux-enfants', [
  { name: "Child rescue during Holocaust", type: "historic role", description: "Saved thousands of Jewish children in France during the Holocaust by hiding them with non-Jewish families." },
  { name: "French Jewish social services", type: "current role", description: "Today provides health, social, and educational services to vulnerable populations in France." },
  { name: "Vichy France resistance", type: "wartime activity", description: "Members of OSE risked their lives operating an underground network to rescue Jewish children." }
]);
updDesc('ose-uvre-de-secours-aux-enfants', 'OSE (Œuvre de Secours aux Enfants , Children\'s Rescue Organization) was founded in Russia in 1912 and established in France in 1933. During the Holocaust, OSE ran a clandestine network that saved thousands of Jewish children by hiding them with non-Jewish families and smuggling them to Switzerland. Today OSE provides health, social, and educational services to vulnerable populations in France, continuing its mission of protecting children.');

addConn('uejf-union-of-jewish-students-of-france', [
  { name: "French universities", type: "campus presence", description: "Active on university campuses across France." },
  { name: "SOS Racisme", type: "alliance", description: "Historically allied with SOS Racisme and anti-racism movements in France." },
  { name: "CRIF", type: "communal affiliation", description: "Affiliated with CRIF, the main representative body of French Jewry." },
  { name: "Fight against antisemitism", type: "core activity", description: "Combats antisemitism on French university campuses." }
]);
updDesc('uejf-union-of-jewish-students-of-france', 'UEJF (Union des Étudiants Juifs de France) is the French Jewish student organization, active on university campuses across France since 1944. Combats antisemitism and racism, historically allied with SOS Racisme. Engages in legal action against antisemitic speech and Holocaust denial. Known for its annual campaigns and its role in major court cases against hate speech in France.');

addConn('radio-j-radio-shalom', [
  { name: "French Jewish community", type: "audience", description: "Jewish community radio stations serving the French Jewish population." },
  { name: "French media landscape", type: "position", description: "Part of the French FM radio landscape under CSA regulation." },
  { name: "Jewish news and culture", type: "programming", description: "Broadcasts Jewish news, culture, music, and community information." }
]);
updDesc('radio-j-radio-shalom', 'Radio J and Radio Shalom are French Jewish community radio stations broadcasting in the Paris region and beyond. Founded in the 1980s following the liberalization of French radio. Provide Jewish news, cultural programming, music, and community information to the French Jewish population. Radio J is particularly known for its news coverage and political programming related to Jewish affairs and Israel.');

addConn('bureau-national-de-vigilance-contre-l-antis-mitisme-bnvca', [
  { name: "French legal system", type: "legal action", description: "Files legal complaints against antisemitic acts and speech in French courts." },
  { name: "CRIF", type: "communal partner", description: "Works alongside CRIF in combating antisemitism." },
  { name: "French media monitoring", type: "activity", description: "Monitors French media for antisemitic content and responds publicly." }
]);
updDesc('bureau-national-de-vigilance-contre-l-antis-mitisme-bnvca', 'The BNVCA (Bureau National de Vigilance Contre l\'Antisémitisme) monitors, documents, and takes legal action against antisemitism in France. Files criminal complaints under France\'s hate speech laws and monitors media coverage of Jewish and Israel-related issues. Works closely with CRIF and other communal organizations to combat rising antisemitism in France.');

addConn('fonds-social-juif-unifi-fsju', [
  { name: "French Jewish community services", type: "core role", description: "Central social services organization of the French Jewish community." },
  { name: "Jewish education in France", type: "funding", description: "Major funder of Jewish day schools and educational programs in France." },
  { name: "United Jewish Appeal (Appel Unifié Juif de France)", type: "fundraising", description: "Raises funds through the annual Appel Unifié Juif de France campaign." },
  { name: "Cultural programming", type: "activities", description: "Supports Jewish cultural events, community centers, and social programs." }
]);
updDesc('fonds-social-juif-unifi-fsju', 'The FSJU (Fonds Social Juif Unifié , United Jewish Social Fund) is the central philanthropic and social services organization of French Jewry. Founded in 1950, it funds Jewish education (day schools, summer camps), social welfare, cultural programs, and community centers across France. Raises funds through the annual Appel Unifié Juif de France campaign. Supports over 200 Jewish organizations in France.');

addConn('synagogue-de-la-victoire-paris', [
  { name: "Consistoire de Paris", type: "administration", description: "Administered by the Consistoire de Paris, the official Jewish religious body." },
  { name: "Grand Synagogue status", type: "prestige", description: "The Grand Synagogue of Paris, the most prestigious synagogue in France." },
  { name: "Charles de Gaulle", type: "historic event", description: "Site of a famous liberation service attended by General de Gaulle in 1944." }
]);
updDesc('synagogue-de-la-victoire-paris', 'The Synagogue de la Victoire, known as La Grande Synagogue de Paris, is the most prestigious synagogue in France. Built in 1874 in the 9th arrondissement, its Romanesque-Byzantine architecture is an iconic landmark. Site of the famous liberation service attended by General de Gaulle in 1944. The Grand Rabbi of France officiates at major ceremonies held here. Seats 1,800 worshippers.');

addConn('institut-europ-en-emmanuel-levinas', [
  { name: "Emmanuel Levinas", type: "namesake", description: "Named after Emmanuel Levinas (Jewish, 1906-1995), one of the most important French philosophers of the 20th century." },
  { name: "Jewish philosophy", type: "academic focus", description: "Centre of Jewish philosophical and Talmudic study in Europe." },
  { name: "Alliance Israélite Universelle", type: "institutional connection", description: "Connected to the Alliance Israélite Universelle educational tradition." }
]);
updDesc('institut-europ-en-emmanuel-levinas', 'The Institut Européen Emmanuel Levinas is named after Emmanuel Levinas (Jewish, 1906-1995), the Lithuanian-born French philosopher whose work on ethics, phenomenology, and the Talmud profoundly influenced modern philosophy. The institute promotes Jewish intellectual study and Talmudic learning in the French philosophical tradition. Levinas served as director of the École Normale Israélite Orientale of the Alliance Israélite Universelle.');
addInd('institut-europ-en-emmanuel-levinas', { name: "Emmanuel Levinas", bio: "Emmanuel Levinas (Jewish, 1906-1995), Lithuanian-born French philosopher, was one of the most influential thinkers of the 20th century. His work on ethics, alterity, and the Talmud transformed Continental philosophy." });

addConn('bpifrance-french-israeli-business-networks', [
  { name: "French-Israeli tech partnerships", type: "business relations", description: "Facilitates technology partnerships and investments between French and Israeli companies." },
  { name: "Start-Up Nation ecosystem", type: "Israeli connection", description: "Connects French businesses with Israel's innovation ecosystem." },
  { name: "French tech industry", type: "domestic role", description: "BPIfrance is France's public investment bank supporting innovation and entrepreneurship." }
]);
updDesc('bpifrance-french-israeli-business-networks', 'BPIfrance (Banque Publique d\'Investissement) is France\'s public investment bank, which has developed significant business ties with Israel\'s tech ecosystem. Facilitates technology partnerships, venture capital co-investments, and business exchanges between French and Israeli companies. French-Israeli business networks leverage Israel\'s startup culture and France\'s large market and engineering talent.');

addConn('keren-hayesod-france', [
  { name: "Keren Hayesod worldwide", type: "parent organization", description: "French branch of Keren Hayesod, the international fundraising organization for Israel." },
  { name: "State of Israel", type: "beneficiary", description: "Raises funds for immigration, absorption, and social programs in Israel." },
  { name: "French Jewish community", type: "donor base", description: "Mobilizes French Jewish donors to support Israel." }
]);
updDesc('keren-hayesod-france', 'Keren Hayesod France is the French branch of Keren Hayesod , United Israel Appeal, the official fundraising organization for the State of Israel established in 1920 at the London Zionist Conference. Raises funds from the French Jewish community for immigration and absorption of new immigrants, social services, and development projects in Israel. One of the major Zionist fundraising organizations active in France.');

addConn('dassault-group', [
  { name: "Marcel Dassault (Marcel Bloch)", type: "founder", description: "Founded by Marcel Bloch (Jewish), who changed his name to Marcel Dassault. Holocaust survivor of Buchenwald." },
  { name: "Dassault Aviation", type: "core company", description: "Makes the Rafale fighter jet, Mirage series, and Falcon business jets." },
  { name: "Serge Dassault", type: "successor", description: "Serge Dassault (Jewish) inherited the empire and became a senator and billionaire." },
  { name: "Le Figaro", type: "media ownership", description: "The Dassault family owns Le Figaro, one of France's leading newspapers." },
  { name: "French military-industrial complex", type: "strategic role", description: "Dassault is central to France's defense industry and military independence." }
]);
updDesc('dassault-group', 'The Dassault Group was founded by Marcel Bloch/Dassault (Jewish, 1892-1986), who survived Buchenwald and built France\'s preeminent aerospace empire. Makes the Rafale fighter jet, Mirage combat aircraft, and Falcon business jets. Serge Dassault (Jewish, 1925-2018) inherited the empire, becoming one of France\'s richest people and a senator. The family owns Le Figaro newspaper and Dassault Systèmes (3D design software). Combined empire worth €30+ billion.');

addConn('essilor-dassault-connection', [
  { name: "EssilorLuxottica", type: "major company", description: "Essilor merged with Luxottica to form the world's largest eyewear company." },
  { name: "Dassault Systèmes", type: "Dassault connection", description: "Dassault Systèmes is a major French tech company related to the Dassault family empire." },
  { name: "French CAC 40", type: "market position", description: "Both companies are among France's largest listed corporations." }
]);

addConn('sodexo-israel-operations', [
  { name: "Sodexo", type: "parent company", description: "Sodexo is a French multinational food services and facilities management company." },
  { name: "Israel operations", type: "business presence", description: "Sodexo maintains operations in Israel, managing food services and facilities." },
  { name: "BDS controversy", type: "political context", description: "Has faced both BDS pressure and pro-Israel advocacy regarding its Israel operations." }
]);
updDesc('sodexo-israel-operations', 'Sodexo is a major French multinational food services and facilities management company with operations in Israel. One of the world\'s largest private employers with 400,000+ employees globally. Its Israel operations have been a focus of both BDS campaigns and pro-Israel advocacy, highlighting the company\'s role in broader geopolitical debates about business engagement with Israel.');

addConn('grand-synagogue-of-paris-la-victoire', [
  { name: "Synagogue de la Victoire", type: "same institution", description: "Also known as the Grand Synagogue of Paris on rue de la Victoire." },
  { name: "Consistoire de Paris", type: "administration", description: "Under the administration of the Paris Consistoire." },
  { name: "Grand Rabbi of France", type: "religious leadership", description: "Traditional seat of the Grand Rabbi of France for major ceremonies." }
]);

addConn('drancy-internment-camp-memorial', [
  { name: "Vichy France", type: "historic context", description: "Drancy was the main transit camp in France from which 67,000 Jews were deported to Auschwitz." },
  { name: "Mémorial de la Shoah", type: "memorial network", description: "Part of the Mémorial de la Shoah's network of memorial sites." },
  { name: "French Holocaust history", type: "significance", description: "Central to understanding France's role in the Holocaust under the Vichy regime." },
  { name: "Auschwitz", type: "deportation destination", description: "Most inmates were deported from Drancy to Auschwitz-Birkenau." }
]);
updDesc('drancy-internment-camp-memorial', 'The Drancy Internment Camp Memorial marks the site of the main transit camp in France during the Holocaust. Between 1941 and 1944, approximately 67,000 Jews (including 6,000 children) were detained at Drancy before deportation to Auschwitz-Birkenau. Located in a housing complex northeast of Paris originally designed by architect Marcel Lods. The memorial, opened in 2012, is administered by the Mémorial de la Shoah.');

// ============================================================
// CANADA
// ============================================================

addConn('centre-for-israel-and-jewish-affairs-cija', [
  { name: "Canadian government", type: "political advocacy", description: "Primary advocacy body representing Jewish community interests to the Canadian federal government." },
  { name: "Jewish Federations of Canada-UIA", type: "parent organization", description: "Advocacy arm of the Jewish Federations of Canada." },
  { name: "Canada-Israel relations", type: "core focus", description: "Promotes strong Canada-Israel bilateral relations." },
  { name: "Antisemitism advocacy", type: "mission", description: "Combats antisemitism through legal advocacy and public education." }
]);
updDesc('centre-for-israel-and-jewish-affairs-cija', 'CIJA (Centre for Israel and Jewish Affairs) is the advocacy agent of the Jewish Federations of Canada , UIA. It represents the Canadian Jewish community (approximately 400,000 people) in dealings with the federal government and advocates for strong Canada-Israel relations, combating antisemitism, and protecting civil rights. Engages with Parliament, the judiciary, and media on issues affecting Canadian Jewry.');
addInd('centre-for-israel-and-jewish-affairs-cija', { name: "Shimon Koffler Fogel", bio: "Shimon Koffler Fogel (Jewish), CEO of CIJA, has led the organization's advocacy efforts on behalf of the Canadian Jewish community, engaging with government and media." });

addConn('b-nai-brith-canada', [
  { name: "B'nai B'rith International", type: "parent organization", description: "Canadian chapter of B'nai B'rith, the oldest Jewish service organization in the world (founded 1843)." },
  { name: "Annual Audit of Antisemitic Incidents", type: "key publication", description: "Publishes Canada's most comprehensive annual audit of antisemitic incidents." },
  { name: "Canadian Human Rights Commission", type: "legal partner", description: "Files complaints and advocates before human rights commissions." },
  { name: "League for Human Rights", type: "division", description: "Its League for Human Rights monitors and combats antisemitism across Canada." }
]);
updDesc('b-nai-brith-canada', 'B\'nai Brith Canada is the Canadian chapter of B\'nai B\'rith International, the world\'s oldest Jewish service organization (founded 1843). Its League for Human Rights publishes Canada\'s most comprehensive annual audit of antisemitic incidents. Advocates before Parliament, human rights commissions, and courts. Provides community services, housing for seniors, and youth programming across Canada.');

addConn('jewish-federations-of-canada-uia', [
  { name: "Jewish Federations of North America (JFNA)", type: "counterpart", description: "Canadian counterpart to JFNA, coordinating fundraising and communal services." },
  { name: "CIJA", type: "advocacy arm", description: "CIJA serves as its advocacy arm for government relations." },
  { name: "United Israel Appeal", type: "Israel connection", description: "Raises funds for Israel through the United Israel Appeal." },
  { name: "Canadian Jewish communities", type: "constituent federations", description: "Umbrella for Jewish federations in Toronto, Montreal, Vancouver, Ottawa, and other cities." }
]);
updDesc('jewish-federations-of-canada-uia', 'Jewish Federations of Canada , UIA is the national umbrella organization for Jewish federations across Canada, representing approximately 400,000 Canadian Jews. Coordinates communal fundraising, allocations to Jewish agencies in Canada and Israel, and national policy. Its constituent federations in Toronto, Montreal, Vancouver, Ottawa, and other cities fund hundreds of Jewish organizations. CIJA serves as its government advocacy arm.');

addConn('friends-of-simon-wiesenthal-center-canada', [
  { name: "Simon Wiesenthal Center", type: "affiliate", description: "Canadian affiliate of the Simon Wiesenthal Center based in Los Angeles." },
  { name: "Holocaust education", type: "mission", description: "Provides Holocaust education programs to Canadian schools and communities." },
  { name: "Tour for Humanity", type: "program", description: "Operates the Tour for Humanity mobile classroom visiting schools across Canada." },
  { name: "Canadian antisemitism", type: "advocacy", description: "Monitors and responds to antisemitism and hate in Canada." }
]);
updDesc('friends-of-simon-wiesenthal-center-canada', 'Friends of Simon Wiesenthal Center for Holocaust Studies is the Canadian affiliate of the Los Angeles-based Simon Wiesenthal Center. Operates the Tour for Humanity mobile classroom that visits hundreds of schools across Canada annually. Provides Holocaust education, anti-hate programming, and monitors antisemitic incidents. Named after Simon Wiesenthal (Jewish, 1908-2005), the famed Nazi hunter.');
addInd('friends-of-simon-wiesenthal-center-canada', { name: "Avi Benlolo", bio: "Avi Benlolo (Jewish), founding president and CEO of Friends of Simon Wiesenthal Center for Holocaust Studies in Canada, led its growth into a major Holocaust education organization." });

addConn('canadian-jewish-news', [
  { name: "Canadian Jewish community", type: "readership", description: "Primary English-language Jewish newspaper serving Canadian Jewry." },
  { name: "Jewish Federations of Canada", type: "communal coverage", description: "Covers activities of Jewish federations and organizations across Canada." },
  { name: "Israel coverage", type: "editorial focus", description: "Substantial coverage of Israel and Canadian-Israeli relations." }
]);
updDesc('canadian-jewish-news', 'The Canadian Jewish News (CJN) is Canada\'s primary English-language Jewish publication, covering communal affairs, Israel, antisemitism, arts, and culture. Published for over 60 years, it serves the approximately 400,000-strong Canadian Jewish community. Transitioned to a digital format. Provides coverage of Jewish life across Canada from Toronto, Montreal, Vancouver, and beyond.');

addConn('uja-federation-of-greater-toronto', [
  { name: "Jewish community of Toronto", type: "constituency", description: "Serves Toronto's Jewish community, the largest in Canada (~200,000)." },
  { name: "Jewish Federations of Canada", type: "national umbrella", description: "Member of the Jewish Federations of Canada , UIA." },
  { name: "Annual campaign", type: "fundraising", description: "Raises tens of millions annually for Jewish agencies and Israel programs." },
  { name: "Mount Sinai Hospital", type: "beneficiary", description: "Historically connected to Mount Sinai Hospital and other Jewish institutions in Toronto." }
]);
updDesc('uja-federation-of-greater-toronto', 'UJA Federation of Greater Toronto is the central philanthropic and planning organization of Toronto\'s Jewish community, the largest in Canada (~200,000). Raises tens of millions annually to fund Jewish education, social services, community building, and Israel programs. Supports over 100 beneficiary agencies. Part of the Jewish Federations of Canada , UIA network.');

addConn('federation-cja-montreal', [
  { name: "Montreal Jewish community", type: "constituency", description: "Serves Montreal's Jewish community (~90,000), the second-largest in Canada." },
  { name: "Jewish Federations of Canada", type: "national umbrella", description: "Member of the Jewish Federations of Canada , UIA." },
  { name: "Sephardi community", type: "community segment", description: "Montreal has a large Sephardi Jewish population, especially from North Africa." },
  { name: "Jewish General Hospital", type: "beneficiary", description: "Connected to the Jewish General Hospital, a major Montreal healthcare institution." }
]);
updDesc('federation-cja-montreal', 'Federation CJA is the central Jewish communal organization of Montreal, serving the second-largest Jewish community in Canada (~90,000). Montreal\'s community is unique in its large Sephardi population, particularly Jews from Morocco and other North African countries. Funds Jewish education, social services, cultural programs, and Israel connections. The Jewish General Hospital is among its key affiliated institutions.');

addConn('mount-sinai-hospital-toronto', [
  { name: "Jewish community of Toronto", type: "founding community", description: "Founded by Toronto's Jewish community in 1923." },
  { name: "Sinai Health System", type: "current system", description: "Now part of Sinai Health System, one of Canada's leading academic health science centres." },
  { name: "University of Toronto", type: "academic affiliation", description: "Affiliated with the University of Toronto's Faculty of Medicine." },
  { name: "Samuel Lunenfeld Research Institute", type: "research arm", description: "Home to the Lunenfeld-Tanenbaum Research Institute, a world-leading biomedical research facility." }
]);
updDesc('mount-sinai-hospital-toronto', 'Mount Sinai Hospital, founded by Toronto\'s Jewish community in 1923, is now part of Sinai Health System and one of Canada\'s leading academic health science centres. Affiliated with the University of Toronto Faculty of Medicine. Home to the Lunenfeld-Tanenbaum Research Institute, one of the world\'s top biomedical research facilities. Originally established because Jewish doctors faced discrimination at other hospitals.');

addConn('canadian-museum-for-human-rights', [
  { name: "Asper family", type: "founding vision", description: "The museum was the vision of Israel (Izzy) Asper (Jewish), media mogul who founded CanWest Global Communications." },
  { name: "Gail Asper", type: "champion", description: "Gail Asper (Jewish) carried forward her father's vision after his death and led the fundraising campaign." },
  { name: "Winnipeg", type: "location", description: "Located in Winnipeg, Manitoba, The Forks." },
  { name: "Holocaust gallery", type: "exhibition", description: "Features a prominent Holocaust gallery among its human rights exhibits." }
]);
updDesc('canadian-museum-for-human-rights', 'The Canadian Museum for Human Rights in Winnipeg is the vision of Israel "Izzy" Asper (Jewish, 1932-2003), founder of CanWest Global Communications, who conceived a national museum dedicated to human rights. After his death, daughter Gail Asper (Jewish) led the $350 million fundraising campaign. Opened in 2014, it is the first museum solely dedicated to human rights and includes a prominent Holocaust gallery.');

addConn('bronfman-family-seagram-company', [
  { name: "Samuel Bronfman", type: "patriarch", description: "Samuel Bronfman (Jewish, 1889-1971) built Seagram into the world's largest distiller." },
  { name: "Edgar Bronfman Sr.", type: "successor/WJC president", description: "Edgar Bronfman Sr. (Jewish) led Seagram and served as president of the World Jewish Congress for 26 years." },
  { name: "Edgar Bronfman Jr.", type: "media mogul", description: "Edgar Jr. (Jewish) sold Seagram to Vivendi and later became CEO of Warner Music Group." },
  { name: "Charles Bronfman", type: "philanthropist", description: "Charles Bronfman (Jewish) co-founded Birthright Israel, one of the most impactful Jewish programs." },
  { name: "DuPont", type: "investment", description: "Seagram held a major stake in DuPont, one of the largest chemical companies." },
  { name: "Jewish communal leadership", type: "philanthropy", description: "The Bronfman family has been among the most influential Jewish philanthropic families globally." }
]);
updDesc('bronfman-family-seagram-company', 'The Bronfman family (Jewish, Canadian) built Seagram into the world\'s largest distiller under patriarch Samuel Bronfman (1889-1971). Son Edgar Sr. led both Seagram and the World Jewish Congress (26 years as president). Son Charles co-founded Birthright Israel. Edgar Jr. sold Seagram to Vivendi and became CEO of Warner Music Group. The family\'s philanthropy through the Andrea and Charles Bronfman Philanthropies and Samuel Bronfman Foundation shaped Jewish life worldwide.');

addConn('reichmann-family-olympia-york', [
  { name: "World Financial Center (Brookfield Place)", type: "development", description: "Built the World Financial Center in Lower Manhattan (now Brookfield Place)." },
  { name: "Canary Wharf", type: "development", description: "Developed Canary Wharf in London, transforming London's Docklands into a major financial centre." },
  { name: "Orthodox Jewish community", type: "identity", description: "The Reichmann family are deeply Orthodox Jews who maintained strict religious observance while building a global empire." },
  { name: "Hungarian Holocaust survivors", type: "origin", description: "Hungarian-born Holocaust survivors who immigrated to Canada." }
]);
updDesc('reichmann-family-olympia-york', 'The Reichmann family (Jewish, Hungarian-born, Holocaust survivors) built Olympia & York into one of the world\'s largest real estate empires. Developed the World Financial Center in Manhattan (now Brookfield Place) and Canary Wharf in London, which transformed the Docklands into a major financial centre. Deeply Orthodox Jews who maintained strict religious observance. The company went bankrupt in 1992 due to the Canary Wharf development costs but the family continued in real estate.');

addConn('munk-school-of-global-affairs-u-of-toronto', [
  { name: "Peter Munk", type: "benefactor", description: "Named after Peter Munk (Jewish, Hungarian-born Canadian), founder of Barrick Gold." },
  { name: "University of Toronto", type: "institution", description: "Part of the University of Toronto, one of the world's top universities." },
  { name: "Global policy research", type: "mission", description: "Leading centre for research on global affairs, public policy, and innovation." }
]);
updDesc('munk-school-of-global-affairs-u-of-toronto', 'The Munk School of Global Affairs and Public Policy at the University of Toronto is named after Peter Munk (Jewish, 1927-2018), the Hungarian-born Canadian founder of Barrick Gold who donated $50 million to establish the school. One of Canada\'s leading centres for global affairs research, public policy, and international relations education. Munk fled Hungary after the Nazi occupation and built one of the world\'s largest gold mining companies.');

addConn('barrick-gold-peter-munk', [
  { name: "Peter Munk", type: "founder", description: "Founded by Peter Munk (Jewish, 1927-2018), Hungarian-born Canadian businessman." },
  { name: "World's largest gold miner", type: "market position", description: "Barrick Gold is one of the world's largest gold mining companies." },
  { name: "Munk School", type: "philanthropy", description: "Munk donated $50 million to establish the Munk School at University of Toronto." },
  { name: "Toronto Stock Exchange", type: "listing", description: "Listed on TSX and NYSE." }
]);
updDesc('barrick-gold-peter-munk', 'Barrick Gold Corporation was founded by Peter Munk (Jewish, 1927-2018), a Hungarian-born Holocaust survivor who immigrated to Canada. Built Barrick into one of the world\'s largest gold mining companies with operations across 13 countries. Munk was also a major philanthropist, donating $50 million to the University of Toronto\'s Munk School and $100 million to the Peter Munk Cardiac Centre. His life exemplified the immigrant success story.');

addConn('canaccord-genuity', [
  { name: "Canadian capital markets", type: "market position", description: "One of the largest independent investment dealers in Canada." },
  { name: "Israel-related investments", type: "business focus", description: "Active in Israeli technology and life sciences investments." },
  { name: "Global expansion", type: "operations", description: "Operates in North America, UK, Europe, Australia, and Asia." }
]);
updDesc('canaccord-genuity', 'Canaccord Genuity Group is one of the largest independent full-service investment dealers in Canada, with operations in North America, UK & Europe, Australia, and Asia. Particularly active in growth company capital markets including Israeli technology and life sciences firms. Headquartered in Vancouver with major offices in Toronto, London, and other financial centres.');

addConn('montreal-holocaust-museum', [
  { name: "Montreal Jewish community", type: "community", description: "Serves Montreal's large Jewish community, many of whom are Holocaust survivors or descendents." },
  { name: "Quebec education system", type: "educational partner", description: "Major educational resource for Quebec schools on Holocaust history." },
  { name: "Survivor testimonies", type: "core collection", description: "Houses extensive collection of survivor testimonies from Montreal's large survivor community." }
]);
updDesc('montreal-holocaust-museum', 'The Montreal Holocaust Museum documents and commemorates the Holocaust through the stories of Montreal\'s large survivor community. Montreal became home to one of the largest concentrations of Holocaust survivors in North America. The museum provides educational programs to thousands of Quebec students annually. Houses extensive archives, testimonies, and artifacts donated by local survivors and their families.');

addConn('vancouver-holocaust-education-centre', [
  { name: "Vancouver Jewish community", type: "community base", description: "Serves British Columbia's Jewish community with Holocaust education." },
  { name: "BC school system", type: "educational partner", description: "Provides Holocaust education programs to British Columbia schools." },
  { name: "Survivor testimonies", type: "collection", description: "Preserves testimonies of Holocaust survivors who settled in Western Canada." }
]);
updDesc('vancouver-holocaust-education-centre', 'The Vancouver Holocaust Education Centre is Western Canada\'s primary Holocaust museum and educational facility, serving British Columbia\'s schools and communities. Founded by Holocaust survivors who settled in Vancouver. Provides educational programs, exhibitions, and teacher training. Preserves the testimonies and artifacts of survivors who built new lives in Western Canada.');

addConn('toronto-hebrew-memorial-park', [
  { name: "Toronto Jewish community", type: "community", description: "The primary Jewish cemetery serving Toronto's Jewish community." },
  { name: "Jewish burial traditions", type: "religious practice", description: "Maintains Jewish burial traditions and provides burial services according to halacha." },
  { name: "Chevra Kadisha", type: "burial society", description: "Operated in conjunction with the Chevra Kadisha (Jewish burial society)." }
]);
updDesc('toronto-hebrew-memorial-park', 'Toronto Hebrew Memorial Park is one of the primary Jewish cemeteries in the Greater Toronto Area, providing burial services according to Jewish law (halacha) to the largest Jewish community in Canada. Operated with the Chevra Kadisha (Jewish burial society). Serves as a final resting place for many prominent members of Canadian Jewry.');

addConn('canadian-jewish-congress-historical', [
  { name: "Canadian Jewish political history", type: "historic role", description: "Central organization of Canadian Jewry for over 90 years (1919-2011)." },
  { name: "Nuremberg Trials", type: "historic contribution", description: "Helped prosecute Nazi war criminals who had fled to Canada." },
  { name: "CIJA", type: "successor", description: "Its advocacy functions were absorbed by CIJA (Centre for Israel and Jewish Affairs)." },
  { name: "Saul Hayes", type: "historic leader", description: "Led by influential figures who shaped Canadian Jewish advocacy." }
]);
updDesc('canadian-jewish-congress-historical', 'The Canadian Jewish Congress (1919-2011) was the central representative organization of Canadian Jewry for over 90 years. Founded by Lyon Cohen and Sam Jacobs, it advocated for Jewish rights, aided war refugees, helped bring Nazi war criminals to justice, and fought antisemitism in Canada. Played a crucial role in Canada\'s multiculturalism policy. Its functions were absorbed by CIJA in 2011.');
addInd('canadian-jewish-congress-historical', { name: "Samuel Bronfman", bio: "Samuel Bronfman (Jewish, 1889-1971), founder of Seagram, served as president of the Canadian Jewish Congress for decades, using his wealth and influence to advance Jewish communal interests in Canada." });

// ============================================================
// SAVE
// ============================================================

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0; for(const c in data.countries) for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;}
console.log(`Done! ${tc} entries, ${wc} with connections, ${Object.keys(people.people).length} people.`);
let connTotal=0; for(const c in data.countries) for(const e of data.countries[c]) connTotal+=(e.connections||[]).length;
console.log(`Total connections: ${connTotal}`);
