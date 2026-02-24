// addConnections5.js - US Jewish Organizations, Advocacy, Federations, Religious bodies
// Run AFTER addConnections4.js
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
// AJC
// ============================================================
addConn('american-jewish-committee-ajc', [
  { name: "US State Department", type: "diplomatic partner", description: "AJC works closely with the US State Department on international Jewish advocacy and combating antisemitism." },
  { name: "United Nations", type: "NGO status", description: "AJC holds consultative status at the United Nations and advocates for Israel and Jewish interests." },
  { name: "European Union", type: "advocacy", description: "AJC maintains offices in Berlin, Paris, and Brussels to engage EU policymakers." },
  { name: "American Jewish Joint Distribution Committee", type: "historic partner", description: "AJC helped establish the JDC in 1914 to aid Jews overseas." },
  { name: "Israel government", type: "advocacy partner", description: "AJC advocates for strong US-Israel relations and engages Israeli officials regularly." }
]);
updDesc('american-jewish-committee-ajc', 'Founded in 1906 in response to pogroms in Russia. AJC is one of the oldest Jewish advocacy organizations in the US. It helped create the JDC (1914) and played a key role in the UN adoption of the Universal Declaration of Human Rights. Maintains offices in Washington, New York, Berlin, Paris, Brussels, and Jerusalem. Publishes the annual "State of Antisemitism in America" report. Led by Ted Deutch (former US Congressman) as CEO since 2022.');
addInd('american-jewish-committee-ajc', { name: "Ted Deutch", bio: "Former US Congressman (D-FL), CEO of AJC since 2022. Served on the House Foreign Affairs and Judiciary Committees." });
addInd('american-jewish-committee-ajc', { name: "Jacob Blaustein", bio: "Industrialist and philanthropist who served as AJC president (1949-1954). Negotiated the historic Blaustein-Ben-Gurion Agreement defining US Jewish-Israel relations." });

// ============================================================
// ADL
// ============================================================
addConn('anti-defamation-league-adl', [
  { name: "FBI", type: "law enforcement partner", description: "ADL partners with the FBI on hate crime tracking and law enforcement training." },
  { name: "Silicon Valley tech companies", type: "content policy", description: "ADL advises major tech companies on hate speech and antisemitism content policies." },
  { name: "US Congress", type: "legislative advocacy", description: "ADL lobbies Congress on hate crime legislation and civil rights." },
  { name: "European governments", type: "antisemitism monitoring", description: "ADL tracks antisemitism globally and works with European governments on policy." },
  { name: "Israel government", type: "advocacy", description: "ADL advocates for Israel and combats anti-Israel bias in international forums." }
]);
updDesc('anti-defamation-league-adl', 'Founded in 1913 by B\'nai B\'rith in response to the lynching of Leo Frank. Tracks and combats antisemitism and all forms of hate. Publishes the annual Audit of Antisemitic Incidents. Operates a Law Enforcement and Society program training police across the US. CEO Jonathan Greenblatt (former Obama administration official) has led the ADL since 2015. ADL has a budget exceeding $100 million and works with major tech companies on content moderation.');
addInd('anti-defamation-league-adl', { name: "Jonathan Greenblatt", bio: "CEO of ADL since 2015. Former Special Assistant to President Obama and director of the Office of Social Innovation." });
addInd('anti-defamation-league-adl', { name: "Abraham Foxman", bio: "National Director of the ADL from 1987 to 2015. Holocaust survivor born in Poland, saved by his Catholic nanny during WWII." });

// ============================================================
// AIPAC
// ============================================================
addConn('aipac-american-israel-public-affairs-committee', [
  { name: "US Congress", type: "lobbying", description: "AIPAC is one of the most influential lobbying organizations in Washington, engaging virtually every member of Congress." },
  { name: "Republican Party", type: "bipartisan engagement", description: "AIPAC engages both parties but has strong Republican support on Israel issues." },
  { name: "Democratic Party", type: "bipartisan engagement", description: "AIPAC has historically maintained strong bipartisan support for Israel in Congress." },
  { name: "Israeli government", type: "diplomatic bridge", description: "AIPAC serves as a key bridge between the US Congress and Israeli government." },
  { name: "United Action PAC", type: "political action", description: "AIPAC launched a PAC in 2022, spending $100+ million in elections supporting pro-Israel candidates." }
]);
updDesc('aipac-american-israel-public-affairs-committee', 'Founded in 1951 by Isaiah Kenen. AIPAC is considered one of the most powerful lobbying organizations in the US. Holds an annual policy conference attended by thousands including most members of Congress. In 2022, AIPAC launched United Democracy Project, a super PAC that spent over $100 million supporting pro-Israel candidates. Does not donate directly to candidates but mobilizes grassroots support. Has approximately 100,000 members nationwide.');
addInd('aipac-american-israel-public-affairs-committee', { name: "Howard Kohr", bio: "CEO of AIPAC from 1996-2023. Under his leadership AIPAC became the preeminent pro-Israel lobby in Washington." });

// ============================================================
// ZOA
// ============================================================
addConn('zionist-organization-of-america-zoa', [
  { name: "US Congress", type: "advocacy", description: "ZOA lobbies Congress on pro-Israel legislation and combating BDS." },
  { name: "Republican Party", type: "political alignment", description: "ZOA has strong ties to Republican politicians and conservative pro-Israel circles." },
  { name: "Sheldon Adelson", type: "major donor", description: "Casino magnate Sheldon Adelson was a major supporter of ZOA." },
  { name: "Trump administration", type: "political connection", description: "ZOA had close ties to the Trump administration on Israel policy." }
]);
updDesc('zionist-organization-of-america-zoa', 'Founded in 1897, ZOA is the oldest pro-Israel organization in the US. Led by Morton Klein since 1993, ZOA takes hawkish positions on Israel-Palestinian issues, opposes the two-state solution, and advocates against BDS. The organization has received support from major donors like Sheldon Adelson. ZOA hosts an annual gala dinner attracting top political figures.');
addInd('zionist-organization-of-america-zoa', { name: "Morton Klein", bio: "President of ZOA since 1993. Born in a displaced persons camp in Germany to Holocaust survivor parents. Known for hawkish pro-Israel advocacy." });

// ============================================================
// CUFI
// ============================================================
addConn('christians-united-for-israel-cufi', [
  { name: "John Hagee", type: "founder", description: "Pastor John Hagee founded CUFI in 2006 as the largest pro-Israel Christian organization." },
  { name: "Republican Party", type: "political alignment", description: "CUFI has strong ties to Republican politicians and the evangelical base." },
  { name: "AIPAC", type: "allied advocacy", description: "CUFI works alongside AIPAC and other pro-Israel organizations on Capitol Hill." },
  { name: "Israeli government", type: "support", description: "CUFI provides strong grassroots Christian support for Israel." },
  { name: "US Congress", type: "lobbying", description: "CUFI holds an annual Washington Summit lobbying Congress on pro-Israel legislation." }
]);
updDesc('christians-united-for-israel-cufi', 'Founded in 2006 by Pastor John Hagee with 10+ million members, making it the largest pro-Israel organization in the US. CUFI brings thousands of Christians to Washington annually for its summit. Advocates for strong US-Israel relations, opposes BDS, and supports Israel\'s biblical claim to the land. CUFI\'s Night to Honor Israel events are held in churches across America.');

// ============================================================
// American Jewish Congress
// ============================================================
addConn('american-jewish-congress', [
  { name: "Stephen Wise", type: "founder", description: "Rabbi Stephen Wise (Jewish) founded the American Jewish Congress in 1918." },
  { name: "World Jewish Congress", type: "affiliated", description: "The American Jewish Congress helped establish and is affiliated with the World Jewish Congress." },
  { name: "Civil rights movement", type: "historic role", description: "The AJCongress was a pioneering force in the American civil rights movement." },
  { name: "US Supreme Court", type: "legal advocacy", description: "Filed landmark briefs on church-state separation and civil rights cases." }
]);
updDesc('american-jewish-congress', 'Founded in 1918 by Rabbi Stephen Wise to give American Jews a democratic voice. Played a major role in the American civil rights movement and church-state separation litigation. Filed amicus briefs in landmark Supreme Court cases. Helped establish the World Jewish Congress in 1936. Though diminished from its peak influence, it remains an important voice in Jewish public affairs.');

// ============================================================
// JCPA
// ============================================================
addConn('jewish-council-for-public-affairs-jcpa', [
  { name: "Jewish Federations of North America", type: "umbrella partner", description: "JCPA is the umbrella body coordinating public affairs for Jewish federations." },
  { name: "125+ Jewish Community Relations Councils", type: "network", description: "JCPA coordinates over 125 local JCRCs across the US." },
  { name: "Civil rights organizations", type: "coalition partner", description: "JCPA works with NAACP, civil rights groups on social justice issues." },
  { name: "US government", type: "policy advocacy", description: "Advocates on domestic policy issues including civil rights, religious freedom, and social justice." }
]);
updDesc('jewish-council-for-public-affairs-jcpa', 'Founded in 1944 as the National Jewish Community Relations Advisory Council. JCPA serves as the representative voice of the organized American Jewish community on public affairs and civic engagement. Coordinates a network of 125+ local Jewish Community Relations Councils (JCRCs) and 16 national Jewish agencies. Focuses on civil rights, Israel, combating antisemitism, and social justice.');
addInd('jewish-council-for-public-affairs-jcpa', { name: "Amy Spitalnick", bio: "CEO of JCPA. Previously served as executive director of Integrity First for America, which won a landmark case against white supremacist organizers of the Charlottesville rally." });

// ============================================================
// Republican Jewish Coalition
// ============================================================
addConn('republican-jewish-coalition', [
  { name: "Republican Party", type: "political home", description: "RJC is the principal organization for Jewish Republicans." },
  { name: "Sheldon Adelson", type: "major donor", description: "Casino mogul Sheldon Adelson was the RJC's largest benefactor, donating tens of millions." },
  { name: "Donald Trump", type: "political ally", description: "RJC has been a strong supporter of Trump's pro-Israel policies." },
  { name: "AIPAC", type: "allied cause", description: "RJC works alongside AIPAC on pro-Israel legislation." },
  { name: "Miriam Adelson", type: "major donor", description: "Miriam Adelson continues as a top Republican donor and RJC supporter after Sheldon's death." }
]);
updDesc('republican-jewish-coalition', 'Founded in 1985, the RJC promotes Jewish involvement in the Republican Party. Under the leadership of Matt Brooks (executive director since 1990s) and with major funding from Sheldon Adelson, the RJC has become a significant force in GOP politics. Hosts an annual leadership meeting in Las Vegas attracting Republican presidential candidates. Advocates for pro-Israel policies, tax reform, and school choice.');
addInd('republican-jewish-coalition', { name: "Matt Brooks", bio: "Executive director of the RJC since the 1990s. Has built the organization into a major force within the Republican Party." });

// ============================================================
// Jewish Democratic Council of America
// ============================================================
addConn('jewish-democratic-council-of-america', [
  { name: "Democratic Party", type: "political home", description: "JDCA is the leading organization for Jewish Democrats." },
  { name: "Biden administration", type: "political ally", description: "JDCA supported Biden's 2020 campaign and worked with his administration on Jewish issues." },
  { name: "Pro-Israel Democratic advocacy", type: "mission", description: "JDCA counters the narrative that the Democratic Party is abandoning Israel." }
]);
updDesc('jewish-democratic-council-of-america', 'Founded in 2017, JDCA serves as the voice of Jewish Democrats. Led by CEO Halie Soifer, the organization advocates for Jewish values within the Democratic Party, including support for Israel and combating antisemitism. JDCA has emphasized that the majority of American Jews vote Democratic and that the party maintains strong pro-Israel positions.');
addInd('jewish-democratic-council-of-america', { name: "Halie Soifer", bio: "CEO of JDCA. Former national security advisor to Senator Kamala Harris. Served in the Obama administration's State Department." });

// ============================================================
// Simon Wiesenthal Center
// ============================================================
addConn('simon-wiesenthal-center', [
  { name: "Museum of Tolerance", type: "institution", description: "The SWC operates the Museum of Tolerance in Los Angeles." },
  { name: "US State Department", type: "policy partner", description: "Works with the State Department on global antisemitism monitoring." },
  { name: "Nazi hunting", type: "mission", description: "Named after Simon Wiesenthal, the center continues tracking Nazi war criminals." },
  { name: "United Nations", type: "NGO status", description: "Holds NGO status at the UN and advocates against antisemitism in international forums." },
  { name: "Israeli government", type: "partner", description: "Partners with Israel on Holocaust education and remembrance." }
]);
updDesc('simon-wiesenthal-center', 'Founded in 1977 by Rabbi Marvin Hier, named after famed Nazi hunter Simon Wiesenthal. Operates the Museum of Tolerance in LA (visited by millions). Publishes an annual Digital Terrorism & Hate report tracking online extremism. Maintains a list of most-wanted Nazi war criminals. Has 400,000+ member households worldwide. Dean and Founder Rabbi Hier delivered a prayer at President Trump\'s 2017 inauguration.');
addInd('simon-wiesenthal-center', { name: "Marvin Hier", bio: "Founder and Dean of the Simon Wiesenthal Center since 1977. Rabbi Hier built the organization into a global force for Holocaust remembrance and tolerance education." });

// ============================================================
// JFNA
// ============================================================
addConn('jewish-federations-of-north-america-jfna', [
  { name: "146 Jewish federations", type: "network", description: "JFNA represents 146 Jewish federations and 300+ independent communities across North America." },
  { name: "Jewish Agency for Israel", type: "partner", description: "JFNA is a major funder of the Jewish Agency for Israel." },
  { name: "JDC", type: "partner", description: "JFNA raises hundreds of millions annually, distributing to JDC, JAFI, and local agencies." },
  { name: "Israel government", type: "diaspora bridge", description: "JFNA serves as a key bridge between North American Jewish communities and Israel." },
  { name: "US government", type: "advocacy", description: "JFNA advocates on Capitol Hill for issues affecting Jewish communities." }
]);
updDesc('jewish-federations-of-north-america-jfna', 'Umbrella organization for 146 Jewish federations and 300+ communities, representing the backbone of organized Jewish life in North America. Raises over $2 billion annually for Jewish causes. Funds the Jewish Agency, JDC, and hundreds of local agencies. JFNA\'s General Assembly is the largest annual gathering of Jewish leaders. The federation system has distributed over $100 billion since its founding.');
addInd('jewish-federations-of-north-america-jfna', { name: "Eric Fingerhut", bio: "CEO of JFNA. Former US Congressman (D-OH) and president of Hillel International. Leads the largest Jewish philanthropic system in the world." });

// ============================================================
// UJA-Federation of New York
// ============================================================
addConn('uja-federation-of-new-york', [
  { name: "JFNA", type: "member federation", description: "UJA-Federation is the largest local federation in the JFNA network." },
  { name: "New York City government", type: "social services partner", description: "UJA-Federation partners with NYC government on social services reaching over 4.5 million New Yorkers." },
  { name: "100+ nonprofit agencies", type: "funding network", description: "Funds over 100 nonprofit agencies serving the Jewish and broader New York community." },
  { name: "Wall Street donors", type: "fundraising base", description: "UJA-Federation's Wall Street division raises hundreds of millions from financial industry leaders." }
]);
updDesc('uja-federation-of-new-york', 'The largest local Jewish philanthropy in the world, raising over $300 million annually. Funds 100+ nonprofit agencies serving 4.5 million New Yorkers of all backgrounds. The Wall Street division is one of the most successful fundraising operations in the nonprofit sector. Major donors include leaders from Goldman Sachs, JPMorgan, and other financial institutions.');

// ============================================================
// Jewish Federation of Greater Los Angeles
// ============================================================
addConn('jewish-federation-of-greater-los-angeles', [
  { name: "JFNA", type: "member federation", description: "Part of the JFNA network, serving the second-largest Jewish community in the US." },
  { name: "Hollywood entertainment industry", type: "community base", description: "LA\'s Jewish federation has deep ties to the entertainment industry leadership." },
  { name: "Israel", type: "partnership", description: "Maintains strong Israel connections through cultural and financial programs." },
  { name: "Local Jewish agencies", type: "funding", description: "Funds Jewish day schools, social services, and community programs across Greater LA." }
]);
updDesc('jewish-federation-of-greater-los-angeles', 'Serves the approximately 600,000 Jews in Greater Los Angeles, the second-largest Jewish community in North America. Raises over $100 million annually. Deep connections to the entertainment industry through prominent donors. Funds Jewish day schools, camps, social services, and Israel programs throughout the region.');
addInd('jewish-federation-of-greater-los-angeles', { name: "Rabbi Noah Farkas", bio: "President and CEO of the Jewish Federation of Greater Los Angeles since 2021. Previously served as senior rabbi of Valley Beth Shalom." });

// ============================================================
// Jewish United Fund of Metropolitan Chicago
// ============================================================
addConn('jewish-united-fund-of-metropolitan-chicago', [
  { name: "JFNA", type: "member federation", description: "One of the largest federations in the JFNA system." },
  { name: "Pritzker family", type: "major donors", description: "The Pritzker family (Hyatt Hotels) are among Chicago's most prominent Jewish philanthropists." },
  { name: "Crown family", type: "major donors", description: "The Crown family (General Dynamics) are major JUF supporters." },
  { name: "Illinois state government", type: "advocacy", description: "JUF advocates on state policy issues in Springfield." }
]);
updDesc('jewish-united-fund-of-metropolitan-chicago', 'Serves the 300,000+ Jewish community of metropolitan Chicago. Raises approximately $80 million annually. Major donors include the Pritzker family (Hyatt Hotels, $29B fortune), Crown family (General Dynamics, $10B+), and other prominent Chicago Jewish families. JUF operates the Jewish Community Relations Council and funds dozens of local agencies.');
addInd('jewish-united-fund-of-metropolitan-chicago', { name: "Lonnie Nasatir", bio: "President of the Jewish United Fund and Jewish Federation of Metropolitan Chicago. Previously led Jewish community organizations in Detroit." });

// ============================================================
// Combined Jewish Philanthropies (Boston)
// ============================================================
addConn('combined-jewish-philanthropies-boston', [
  { name: "JFNA", type: "member federation", description: "Boston's Jewish federation, one of the top 10 in the JFNA system." },
  { name: "Kraft family", type: "major donors", description: "Robert Kraft (New England Patriots) is a prominent Boston Jewish philanthropist and CJP supporter." },
  { name: "Seth Klarman", type: "major donor", description: "Baupost Group founder Seth Klarman is a major CJP donor and Boston Jewish philanthropy leader." },
  { name: "Harvard/MIT", type: "academic community", description: "CJP serves the large Jewish academic community at Boston-area universities." }
]);
updDesc('combined-jewish-philanthropies-boston', 'Boston\'s central Jewish community organization, serving approximately 250,000 Jews in Greater Boston. Raises over $70 million annually. Major donors include Robert Kraft (Patriots owner), Seth Klarman (Baupost Group), and other prominent Boston Jewish leaders. Partners with over 40 agencies and runs youth, social service, and Israel programs.');

// ============================================================
// B'nai B'rith International
// ============================================================
addConn('b-nai-b-rith-international', [
  { name: "United Nations", type: "NGO status", description: "B'nai B'rith holds consultative status at the UN and advocates for Jewish interests." },
  { name: "Anti-Defamation League", type: "spinoff", description: "B'nai B'rith created the ADL in 1913, which later became independent." },
  { name: "Hillel International", type: "spinoff", description: "B'nai B'rith created Hillel for Jewish college students in 1923." },
  { name: "Senior housing", type: "social services", description: "B'nai B'rith operates one of the largest networks of affordable senior housing in the US." },
  { name: "International diplomacy", type: "advocacy", description: "Engages with governments worldwide on antisemitism and human rights." }
]);
updDesc('b-nai-b-rith-international', 'Founded in 1843 in New York, B\'nai B\'rith is the oldest Jewish service organization in the world. Created the Anti-Defamation League (1913) and Hillel (1923). Operates extensive senior housing programs. Holds NGO status at the UN, EU, and OAS. At its peak had over 500,000 members. Currently active in over 50 countries with programs in advocacy, community service, and Jewish identity.');
addInd('b-nai-b-rith-international', { name: "Daniel S. Mariaschin", bio: "CEO of B'nai B'rith International. Has led the organization's international advocacy, including engagement at the UN and with world leaders." });

// ============================================================
// Chabad-Lubavitch
// ============================================================
addConn('chabad-lubavitch', [
  { name: "3,500+ emissary families worldwide", type: "global network", description: "Chabad has over 3,500 emissary couples running centers in more than 100 countries." },
  { name: "Menachem Mendel Schneerson", type: "leader", description: "The 7th Rebbe, Rabbi Schneerson (1902-1994), transformed Chabad into a global movement." },
  { name: "770 Eastern Parkway", type: "headquarters", description: "Chabad's world headquarters at 770 Eastern Parkway, Brooklyn, is an iconic Jewish landmark." },
  { name: "US Presidents", type: "political engagement", description: "Multiple US Presidents have proclaimed Education and Sharing Day in honor of the Rebbe." },
  { name: "Rohr family", type: "major donor", description: "George Rohr and the Rohr family are among Chabad's largest benefactors, funding hundreds of campus centers." }
]);
updDesc('chabad-lubavitch', 'Founded in 1775 in Russia by Rabbi Schneur Zalman of Liadi. Under the 7th Rebbe, Rabbi Menachem Mendel Schneerson (1902-1994), Chabad became the largest Jewish outreach organization in the world with 3,500+ emissary families in 100+ countries. Operates Chabad houses on hundreds of college campuses. Congress has proclaimed "Education and Sharing Day" in the Rebbe\'s honor since 1978. Annual budget estimated at $1 billion+. Headquarters at 770 Eastern Parkway, Brooklyn.');

// ============================================================
// Orthodox Union
// ============================================================
addConn('orthodox-union-ou', [
  { name: "OU Kosher certification", type: "food industry", description: "OU Kosher is the world's largest kosher certification agency, certifying over 1 million products." },
  { name: "NCSY", type: "youth program", description: "OU's NCSY is the premier Orthodox youth movement with chapters across North America." },
  { name: "Yachad", type: "disability inclusion", description: "OU's Yachad program provides inclusion for Jews with disabilities." },
  { name: "Israel Free Spirit Birthright", type: "program partner", description: "OU partners with Birthright Israel for Orthodox youth trips." },
  { name: "US government", type: "advocacy", description: "OU's Advocacy Center lobbies on religious freedom, school choice, and Israel." }
]);
updDesc('orthodox-union-ou', 'Founded in 1898, the OU is the largest Orthodox Jewish organization in the US. OU Kosher (the ⓤ symbol) is the world\'s largest kosher certification agency, certifying over 1 million products in 104 countries. NCSY (National Conference of Synagogue Youth) serves thousands of Jewish teens. The OU represents nearly 400 congregations and advocates for Orthodox interests in Washington.');

// ============================================================
// United Synagogue of Conservative Judaism
// ============================================================
addConn('united-synagogue-of-conservative-judaism', [
  { name: "Jewish Theological Seminary", type: "academic partner", description: "USCJ is closely linked to JTS, the intellectual center of Conservative Judaism." },
  { name: "Camp Ramah", type: "camping network", description: "USCJ operates the Ramah camping network across North America." },
  { name: "KOACH/Hillel", type: "campus outreach", description: "Partners with Hillel for Conservative Jewish campus programming." },
  { name: "United Synagogue Youth (USY)", type: "youth movement", description: "USY is the Conservative movement's youth group serving thousands of teens." },
  { name: "Rabbinical Assembly", type: "rabbinic arm", description: "The RA is the international association of Conservative rabbis, working closely with USCJ." }
]);
updDesc('united-synagogue-of-conservative-judaism', 'Founded in 1913 by Rabbi Solomon Schechter, USCJ is the umbrella organization for Conservative Judaism\'s approximately 600 congregations in North America. Operates Camp Ramah (network of summer camps), United Synagogue Youth (USY), and the Fuchsberg Jerusalem Center. While Conservative Judaism has declined from its mid-20th century peak, it remains a major Jewish denomination.');
addInd('united-synagogue-of-conservative-judaism', { name: "Solomon Schechter", bio: "Romanian-born rabbi and scholar who founded the United Synagogue in 1913 and led JTS. Discovered the Cairo Genizah, one of the greatest manuscript finds in history." });

// ============================================================
// Union for Reform Judaism
// ============================================================
addConn('union-for-reform-judaism-urj', [
  { name: "Hebrew Union College", type: "seminary", description: "HUC-JIR is the seminary of the Reform movement, ordaining Reform rabbis since 1875." },
  { name: "Central Conference of American Rabbis", type: "rabbinic arm", description: "CCAR is the Reform rabbinical organization, publishing the Reform prayer book." },
  { name: "Religious Action Center", type: "social justice", description: "RAC in Washington is the Reform movement's social justice and legislative advocacy arm." },
  { name: "Camp movement", type: "youth programs", description: "URJ operates 15 residential summer camps serving thousands of Jewish youth." },
  { name: "NFTY", type: "youth movement", description: "North American Federation of Temple Youth is the Reform youth movement." }
]);
updDesc('union-for-reform-judaism-urj', 'The congregational arm of the Reform Jewish movement, serving nearly 850 congregations and 1.5 million Jews across North America — the largest Jewish denomination in the US. Founded in 1873 by Rabbi Isaac Mayer Wise. Operates 15 summer camps, NFTY youth movement, and the Religious Action Center for social justice advocacy in Washington. Led by Rabbi Rick Jacobs as president.');
addInd('union-for-reform-judaism-urj', { name: "Rick Jacobs", bio: "President of the URJ since 2012. Previously senior rabbi of Westchester Reform Temple. Leads the largest Jewish denominational organization in North America." });

// ============================================================
// Reconstructing Judaism
// ============================================================
addConn('reconstructing-judaism', [
  { name: "Mordecai Kaplan", type: "founder", description: "Rabbi Mordecai Kaplan founded Reconstructionism, viewing Judaism as an evolving civilization." },
  { name: "Reconstructionist Rabbinical College", type: "seminary", description: "RRC in Wyncote, PA is the movement's rabbinical seminary, founded 1968." },
  { name: "Camp Havaya", type: "youth program", description: "The Reconstructionist summer camp embracing diversity and pluralism." },
  { name: "Jewish Reconstructionist Congregation", type: "congregations", description: "About 100 affiliated Reconstructionist congregations across North America." }
]);
updDesc('reconstructing-judaism', 'The smallest of the four major Jewish denominations in the US, with approximately 100 congregations. Founded on the philosophy of Rabbi Mordecai Kaplan (1881-1983), who viewed Judaism as an evolving religious civilization rather than just a religion. The movement pioneered egalitarianism — the first bat mitzvah in America was Kaplan\'s daughter Judith in 1922. Reconstructionist Rabbinical College (founded 1968) trains the movement\'s rabbis.');

// ============================================================
// Agudath Israel
// ============================================================
addConn('agudath-israel-of-america', [
  { name: "Moetzes Gedolei HaTorah", type: "rabbinic council", description: "The Council of Torah Sages is the supreme rabbinic authority guiding Agudath Israel." },
  { name: "Daf Yomi", type: "program", description: "Agudath Israel popularized the Daf Yomi (daily page of Talmud) program worldwide." },
  { name: "US Congress", type: "advocacy", description: "Agudath Israel advocates for religious liberty, school choice, and government funding for religious schools." },
  { name: "Haredi community", type: "constituency", description: "Represents the interests of the ultra-Orthodox/Haredi community in America." },
  { name: "Siyum HaShas", type: "event", description: "Organizes the massive Siyum HaShas celebration at MetLife Stadium when the Talmud cycle completes." }
]);
updDesc('agudath-israel-of-america', 'Founded in 1922, Agudath Israel is the primary advocacy organization for the Haredi (ultra-Orthodox) Jewish community in America. Guided by the Moetzes Gedolei HaTorah (Council of Torah Sages). Advocates for government funding for religious schools, religious liberty, and community interests. Popularized the Daf Yomi program (daily Talmud study). The 2020 Siyum HaShas at MetLife Stadium drew 90,000+ attendees.');

// ============================================================
// Rabbinical Council of America
// ============================================================
addConn('rabbinical-council-of-america-rca', [
  { name: "Orthodox Union", type: "affiliated", description: "The RCA is the main Modern Orthodox rabbinical organization, aligned with the OU." },
  { name: "Yeshiva University", type: "training ground", description: "Most RCA rabbis are ordained at YU's Rabbi Isaac Elchanan Theological Seminary." },
  { name: "Beth Din of America", type: "religious court", description: "The RCA operates the Beth Din of America, handling conversions, divorces, and disputes." },
  { name: "Chief Rabbinate of Israel", type: "conversion recognition", description: "RCA conversions are recognized by the Israeli Chief Rabbinate." }
]);
updDesc('rabbinical-council-of-america-rca', 'The largest Modern Orthodox rabbinical organization in the US, with over 1,000 member rabbis. Most members are ordained at Yeshiva University. Operates the Beth Din of America, which handles conversions recognized by Israel\'s Chief Rabbinate. RCA takes positions on halachic (Jewish legal) issues and engages in interfaith dialogue.');
addInd('rabbinical-council-of-america-rca', { name: "Joseph Soloveitchik", bio: "Known as 'The Rav,' Rabbi Soloveitchik (1903-1993) was the towering intellectual figure of Modern Orthodoxy and trained thousands of RCA rabbis at Yeshiva University." });

// ============================================================
// CCAR
// ============================================================
addConn('central-conference-of-american-rabbis-ccar', [
  { name: "URJ", type: "movement partner", description: "CCAR is the rabbinical arm of the Reform movement, working with URJ congregations." },
  { name: "Hebrew Union College", type: "seminary", description: "CCAR rabbis are ordained at HUC-JIR." },
  { name: "Mishkan T'filah", type: "liturgy", description: "CCAR publishes the Reform movement's official prayer books." },
  { name: "Women's ordination pioneer", type: "historic", description: "CCAR ordained Sally Priesand in 1972, the first woman rabbi in America." }
]);
updDesc('central-conference-of-american-rabbis-ccar', 'Founded in 1889 by Rabbi Isaac Mayer Wise, CCAR is the oldest and largest rabbinical organization in North America with over 2,000 members. Publishes the Reform movement\'s official liturgy including Mishkan T\'filah. In 1972, CCAR member Sally Priesand became the first woman ordained as a rabbi in America. CCAR has issued responsa (Jewish legal opinions) on contemporary issues including LGBTQ+ inclusion.');
addInd('central-conference-of-american-rabbis-ccar', { name: "Sally Priesand", bio: "First woman ordained as a rabbi in America (1972, HUC-JIR). Pioneer who opened the rabbinate to women across all Jewish denominations." });

// ============================================================
// Rabbinical Assembly
// ============================================================
addConn('rabbinical-assembly', [
  { name: "Jewish Theological Seminary", type: "seminary", description: "RA rabbis are ordained at JTS, the intellectual center of Conservative Judaism." },
  { name: "USCJ", type: "movement partner", description: "The RA works with the United Synagogue of Conservative Judaism." },
  { name: "Committee on Jewish Law and Standards", type: "halachic body", description: "The CJLS issues responsa on Jewish law for the Conservative movement." },
  { name: "Etz Hayim", type: "publication", description: "The RA published the Etz Hayim Torah commentary used in Conservative synagogues." }
]);
updDesc('rabbinical-assembly', 'The international association of Conservative/Masorti rabbis, with over 1,600 members. Founded in 1901. Its Committee on Jewish Law and Standards issues authoritative responsa on Jewish law, including landmark decisions on women\'s ordination (1983), LGBTQ+ ordination (2006), and driving on Shabbat. Published the widely-used Etz Hayim Torah commentary.');

// ============================================================
// HUC-JIR
// ============================================================
addConn('hebrew-union-college-jewish-institute-of-religion', [
  { name: "Reform movement", type: "seminary", description: "HUC-JIR is the seminary of the Reform movement, on four campuses in Cincinnati, NYC, LA, and Jerusalem." },
  { name: "Isaac Mayer Wise", type: "founder", description: "Rabbi Isaac Mayer Wise founded HUC in Cincinnati in 1875." },
  { name: "Skirball Museum", type: "cultural institution", description: "The HUC Skirball Museum holds one of the largest collections of Jewish ceremonial art." },
  { name: "American Jewish Archives", type: "research", description: "HUC houses the Jacob Rader Marcus Center of the American Jewish Archives." }
]);
updDesc('hebrew-union-college-jewish-institute-of-religion', 'Founded in 1875 by Rabbi Isaac Mayer Wise in Cincinnati, HUC-JIR is the oldest Jewish seminary in the Americas. Operates on four campuses: Cincinnati, New York, Los Angeles, and Jerusalem. Ordained the first woman rabbi (Sally Priesand, 1972) and first openly gay rabbi. Houses the American Jewish Archives and significant archaeological collections from Israel.');

// ============================================================
// JTS
// ============================================================
addConn('jewish-theological-seminary-jts', [
  { name: "Conservative movement", type: "intellectual center", description: "JTS is the academic and spiritual center of Conservative Judaism worldwide." },
  { name: "Jewish Museum NYC", type: "cultural institution", description: "JTS founded the Jewish Museum in New York, now on Museum Mile." },
  { name: "Schocken Library", type: "rare manuscripts", description: "JTS holds one of the world's greatest collections of Jewish manuscripts and books." },
  { name: "Columbia University", type: "academic partnership", description: "JTS has a joint degree program with Columbia University." },
  { name: "List College", type: "undergraduate", description: "JTS's List College offers a dual-degree program with Columbia or Barnard." }
]);
updDesc('jewish-theological-seminary-jts', 'Founded in 1887 in New York, JTS is the intellectual center of Conservative Judaism. Led by giants like Solomon Schechter and Abraham Joshua Heschel. Houses one of the world\'s greatest collections of Jewish manuscripts (300,000+ items). Founded the Jewish Museum in NYC. Offers dual-degree programs with Columbia University. JTS ordained its first woman rabbi, Amy Eilberg, in 1985.');

// ============================================================
// Birthright Israel Foundation
// ============================================================
addConn('birthright-israel-foundation', [
  { name: "Sheldon Adelson", type: "mega-donor", description: "Sheldon Adelson donated $410 million to Birthright, the single largest philanthropic gift." },
  { name: "Charles Bronfman", type: "co-founder", description: "Charles Bronfman co-founded Birthright Israel with Michael Steinhardt." },
  { name: "Michael Steinhardt", type: "co-founder", description: "Hedge fund pioneer Michael Steinhardt co-founded Birthright to connect Jewish youth with Israel." },
  { name: "Israeli government", type: "partner/funder", description: "The Israeli government provides significant funding for Birthright trips." },
  { name: "800,000+ alumni", type: "impact", description: "Over 800,000 young Jews from 68 countries have participated in free Birthright trips." }
]);
updDesc('birthright-israel-foundation', 'Co-founded in 1999 by Charles Bronfman and Michael Steinhardt to provide free 10-day trips to Israel for young Jews aged 18-26. Over 800,000 participants from 68 countries. Sheldon Adelson donated $410 million — the largest single philanthropic gift. The Israeli government, Jewish federations, and private donors jointly fund the program. Studies show Birthright alumni are more likely to marry Jewish and feel connected to Israel.');

// ============================================================
// Hadassah
// ============================================================
addConn('hadassah-the-women-s-zionist-organization-of-america', [
  { name: "Hadassah Medical Center", type: "hospital", description: "Hadassah operates the world-renowned Hadassah Medical Center in Jerusalem, treating Jews and Arabs alike." },
  { name: "Henrietta Szold", type: "founder", description: "Henrietta Szold founded Hadassah in 1912 and later directed Youth Aliyah, rescuing children from Nazi Europe." },
  { name: "Young Judaea", type: "youth program", description: "Hadassah sponsors Young Judaea, the oldest Zionist youth movement in the US." },
  { name: "US Congress", type: "advocacy", description: "Hadassah advocates for medical research funding, Israel, and women's health." },
  { name: "300,000 members", type: "membership", description: "With 300,000 members, Hadassah is the largest women's Zionist organization in the US." }
]);
updDesc('hadassah-the-women-s-zionist-organization-of-america', 'Founded in 1912 by Henrietta Szold, Hadassah is the largest Jewish women\'s organization in the US with 300,000 members. Operates the Hadassah Medical Center in Jerusalem — two hospitals treating over 1 million patients annually, including Jews, Arabs, and patients from across the Middle East. Known for the Chagall Windows in its Ein Kerem campus synagogue. Sponsors Young Judaea youth movement and advocates for medical research.');
addInd('hadassah-the-women-s-zionist-organization-of-america', { name: "Henrietta Szold", bio: "Founded Hadassah in 1912 and directed Youth Aliyah, rescuing thousands of Jewish children from Nazi Europe. Considered one of the most important women in Jewish and Zionist history." });

// ============================================================
// JNF-USA
// ============================================================
addConn('jewish-national-fund-usa-jnf-usa', [
  { name: "KKL-JNF Israel", type: "partner", description: "JNF-USA supports Keren Kayemeth LeIsrael, which manages Israel's land and forests." },
  { name: "Blue Box (pushke)", type: "iconic symbol", description: "The JNF blue collection box is one of the most recognized symbols of Zionist fundraising." },
  { name: "250 million trees planted", type: "achievement", description: "JNF has planted over 250 million trees in Israel." },
  { name: "Water technology", type: "innovation support", description: "JNF has invested heavily in water recycling and desalination projects in Israel." },
  { name: "Negev development", type: "project", description: "JNF is a major funder of developing Israel's Negev desert region." }
]);
updDesc('jewish-national-fund-usa-jnf-usa', 'The American arm of the Jewish National Fund, founded in 1901 at the Fifth Zionist Congress. Has planted over 250 million trees in Israel. The iconic Blue Box (pushke) is a cornerstone of Jewish households worldwide. JNF-USA has raised billions for land development, water infrastructure, and forestry in Israel. Currently focuses on developing the Negev and Galilee, building reservoirs, and supporting communities affected by conflict.');

// ============================================================
// JDC
// ============================================================
addConn('american-jewish-joint-distribution-committee-jdc', [
  { name: "Over 70 countries", type: "global operations", description: "JDC operates humanitarian programs in over 70 countries." },
  { name: "Israeli government", type: "partner", description: "JDC works with the Israeli government on social welfare programs." },
  { name: "Former Soviet Union", type: "operations", description: "JDC rebuilt Jewish community life across the FSU after the fall of communism." },
  { name: "US State Department", type: "partner", description: "JDC has partnered with the US government on refugee assistance since WWI." },
  { name: "Entwine", type: "youth program", description: "JDC Entwine engages young Jewish professionals in global service." }
]);
updDesc('american-jewish-joint-distribution-committee-jdc', 'Founded in 1914 to aid Jews in Palestine and war-torn Europe. JDC has since provided humanitarian assistance to Jews in over 70 countries, spending over $4 billion. Helped rescue and resettle Holocaust survivors. Rebuilt Jewish life in the Former Soviet Union. Currently provides welfare services to 80,000 elderly Jews in the FSU. Also runs non-sectarian disaster relief worldwide. JDC Entwine engages young Jewish professionals in global Jewish service.');

// ============================================================
// HIAS
// ============================================================
addConn('hias-hebrew-immigrant-aid-society', [
  { name: "US State Department", type: "resettlement partner", description: "HIAS is one of nine official US refugee resettlement agencies." },
  { name: "United Nations", type: "partner", description: "HIAS works with UNHCR on global refugee protection." },
  { name: "Statue of Liberty", type: "historic symbol", description: "HIAS helped settle millions of Jewish immigrants who arrived at Ellis Island." },
  { name: "Latin American refugee advocacy", type: "current operations", description: "HIAS now assists refugees of all backgrounds, with major programs in Latin America." },
  { name: "16 countries", type: "operations", description: "HIAS provides legal aid, resettlement, and protection in 16 countries." }
]);
updDesc('hias-hebrew-immigrant-aid-society', 'Founded in 1881 to assist Jewish immigrants arriving in America. Helped resettle millions of Jews, including Holocaust survivors and Soviet Jews. Now serves refugees of all backgrounds — its motto changed from "Welcome the Stranger" to reflect universal mission. One of nine official US refugee resettlement agencies. Operates in 16 countries. In 2018, HIAS\'s office near the Tree of Life synagogue in Pittsburgh was cited by the gunman, leading to renewed attention.');
addInd('hias-hebrew-immigrant-aid-society', { name: "Mark Hetfield", bio: "President and CEO of HIAS since 2013. Transformed the organization from primarily serving Jewish refugees to helping refugees of all backgrounds worldwide." });

// ============================================================
// Jewish Agency for Israel (US Office)
// ============================================================
addConn('jewish-agency-for-israel-us-office', [
  { name: "Jewish Agency for Israel", type: "parent organization", description: "The US office supports JAFI's global mission of aliyah, absorption, and Jewish identity." },
  { name: "JFNA", type: "funding partner", description: "JFNA is a major funder of the Jewish Agency's programs." },
  { name: "Nefesh B'Nefesh", type: "aliyah partner", description: "Partners with Nefesh B'Nefesh on North American aliyah." },
  { name: "Israeli government", type: "quasi-governmental", description: "JAFI has a unique status as quasi-governmental, connecting diaspora Jews to Israel." }
]);
updDesc('jewish-agency-for-israel-us-office', 'The American arm of the Jewish Agency for Israel (JAFI), founded in 1929. JAFI has facilitated the immigration (aliyah) of over 3 million Jews to Israel. The US office raises funds, promotes aliyah, and runs programs connecting American Jews to Israel. Works closely with JFNA and Nefesh B\'Nefesh. JAFI also runs Shlichim (Israeli emissary) programs in American Jewish communities.');

// ============================================================
// ORT America
// ============================================================
addConn('ort-america', [
  { name: "World ORT", type: "parent organization", description: "ORT America is the US branch of World ORT, the largest Jewish education network." },
  { name: "Bramson ORT College", type: "institution", description: "ORT operates educational institutions focusing on technology and vocational training." },
  { name: "Israel", type: "major operations", description: "ORT runs extensive educational networks in Israel serving hundreds of thousands of students." },
  { name: "Former Soviet Union", type: "historic operations", description: "ORT provided vocational training to Jews in Russia and Eastern Europe since 1880." }
]);
updDesc('ort-america', 'The US affiliate of World ORT, the largest Jewish education and training organization in the world. Founded in Russia in 1880 to provide vocational training to Jews. Today, ORT educates 300,000+ students annually across 35 countries, with major networks in Israel (ORT Israel runs 200+ schools), the former Soviet Union, and Latin America. ORT America raises funds and awareness for these global programs.');

// ============================================================
// FIDF
// ============================================================
addConn('american-friends-of-the-israel-defense-forces-fidf', [
  { name: "Israel Defense Forces", type: "beneficiary", description: "FIDF provides direct support to IDF soldiers and veterans." },
  { name: "IMPACT! scholarship program", type: "program", description: "Provides college scholarships to IDF veterans pursuing higher education." },
  { name: "Lone Soldiers program", type: "support", description: "Supports lone soldiers — IDF soldiers without family in Israel." },
  { name: "Major US Jewish donors", type: "fundraising", description: "FIDF galas raise tens of millions, attracting Wall Street and entertainment industry leaders." },
  { name: "Haim Saban", type: "major supporter", description: "Media mogul Haim Saban has been a major FIDF supporter and fundraiser." }
]);
updDesc('american-friends-of-the-israel-defense-forces-fidf', 'Founded in 1981, FIDF provides direct support to the 170,000+ soldiers of the IDF. Raises over $200 million annually through galas and events. Programs include IMPACT! scholarships for IDF veterans, lone soldier support, and wellbeing programs. FIDF\'s annual gala in New York is one of the largest Jewish fundraising events in the US, with single-night totals exceeding $60 million.');

// ============================================================
// The Forward
// ============================================================
addConn('the-forward-newspaper', [
  { name: "Yiddish Forverts", type: "origin", description: "The Forward began as the Yiddish-language Forverts in 1897, the most important Yiddish newspaper in America." },
  { name: "Abraham Cahan", type: "founding editor", description: "Abraham Cahan edited the Forward for nearly 50 years, making it the voice of Jewish immigrants." },
  { name: "Isaac Bashevis Singer", type: "notable contributor", description: "Nobel laureate Isaac Bashevis Singer published in the Yiddish Forverts." },
  { name: "Digital transformation", type: "modern era", description: "The Forward transitioned from print to digital-only in 2019." }
]);
updDesc('the-forward-newspaper', 'Founded in 1897 as the Yiddish-language Forverts by Abraham Cahan. At its peak, had a circulation of 275,000 — the largest Yiddish newspaper in the world. Published Nobel laureate Isaac Bashevis Singer. The Forward Building on the Lower East Side was a Jewish landmark. Transitioned to English in the 1990s and went digital-only in 2019. Still publishes the annual Forward 50 list of influential American Jews.');
addInd('the-forward-newspaper', { name: "Abraham Cahan", bio: "Editor of the Jewish Daily Forward for nearly 50 years (1903-1951). Lithuanian-born immigrant who made the Forward the most important Yiddish newspaper in America, shaping immigrant Jewish culture." });

// ============================================================
// Jewish Daily Forward (Yiddish)
// ============================================================
addConn('the-jewish-daily-forward-yiddish-forverts', [
  { name: "The Forward (English)", type: "sister publication", description: "The Yiddish Forverts continues alongside the English-language Forward." },
  { name: "Lower East Side", type: "historic home", description: "The Forward Building on East Broadway was a Lower East Side landmark." },
  { name: "Isaac Bashevis Singer", type: "notable writer", description: "Nobel Prize winner Isaac Bashevis Singer serialized his fiction in the Forverts." },
  { name: "YIVO", type: "cultural partner", description: "The Forverts is part of the broader Yiddish cultural ecosystem preserved by YIVO." }
]);
updDesc('the-jewish-daily-forward-yiddish-forverts', 'The Yiddish-language edition of the Forward, first published in 1897. At its peak circulation of 275,000, it was the largest non-English daily in America. The Forward Building on East Broadway had a neon sign in Yiddish visible from the Manhattan Bridge. Published fiction by Nobel laureate Isaac Bashevis Singer. The Yiddish edition continues online, preserving the Yiddish journalistic tradition.');

// ============================================================
// JTA
// ============================================================
addConn('jewish-telegraphic-agency-jta', [
  { name: "70 Faces Media", type: "parent company", description: "JTA is now part of 70 Faces Media, which also publishes the Forward and My Jewish Learning." },
  { name: "Global Jewish media", type: "wire service", description: "JTA serves as the wire service for Jewish publications worldwide." },
  { name: "1,000+ media outlets", type: "distribution", description: "JTA content is republished in over 1,000 Jewish and general media outlets." }
]);
updDesc('jewish-telegraphic-agency-jta', 'Founded in 1917, JTA is the global Jewish news wire service, often called the "AP of Jewish news." Provides breaking news, features, and analysis to over 1,000 Jewish and mainstream media outlets worldwide. Now part of 70 Faces Media alongside the Forward, My Jewish Learning, and Kveller. JTA\'s archives serve as the paper of record for 100+ years of global Jewish news.');
addInd('jewish-telegraphic-agency-jta', { name: "Jacob Landau", bio: "Founded JTA in 1917, creating the first global Jewish news service. Modeled it on the Associated Press to provide reliable Jewish news worldwide." });

// ============================================================
// Times of Israel (US Bureau)
// ============================================================
addConn('the-times-of-israel-us-bureau', [
  { name: "Times of Israel (Israel)", type: "parent publication", description: "The US bureau supports the Israel-based Times of Israel, founded by David Horovitz in 2012." },
  { name: "Seth Klarman", type: "investor", description: "Baupost Group founder Seth Klarman was an early investor in The Times of Israel." },
  { name: "US Jewish community", type: "readership", description: "TOI has a large American readership interested in Israel news and Jewish affairs." }
]);
updDesc('the-times-of-israel-us-bureau', 'The US bureau of The Times of Israel, an online newspaper founded in 2012 by veteran journalist David Horovitz. TOI has become one of the most-read English-language Israeli news sources, attracting millions of monthly readers. Early investment from Seth Klarman (Baupost Group). Publishes in English, Arabic, French, and Persian. Known for its blogs platform featuring thousands of contributors.');

// ============================================================
// Tablet Magazine
// ============================================================
addConn('tablet-magazine', [
  { name: "Nextbook", type: "parent organization", description: "Tablet was launched in 2009 by Nextbook, a Jewish literary and cultural organization." },
  { name: "Jewish intellectual life", type: "coverage", description: "Tablet covers Jewish news, culture, politics, and ideas." },
  { name: "Unorthodox podcast", type: "media", description: "Tablet's Unorthodox podcast is one of the most popular Jewish podcasts." }
]);
updDesc('tablet-magazine', 'Founded in 2009 by Nextbook Inc., Tablet is an online magazine of Jewish news, ideas, and culture. Known for provocative, high-quality journalism and cultural criticism. Its Unorthodox podcast is one of the most popular Jewish podcasts. Tablet has become an influential voice in Jewish media, covering politics, religion, arts, and the intersection of Jewish life with broader culture. Editor-in-chief Alana Newhouse has shaped its distinctive editorial voice.');
addInd('tablet-magazine', { name: "Alana Newhouse", bio: "Editor-in-chief and co-founder of Tablet Magazine. Previously arts and culture editor at the Forward. Named one of the Forward 50 and has shaped Tablet into a leading Jewish cultural publication." });

// ============================================================
// Commentary Magazine
// ============================================================
addConn('commentary-magazine', [
  { name: "American Jewish Committee", type: "founding publisher", description: "Commentary was founded in 1945 by the AJC and became the premier Jewish intellectual journal." },
  { name: "Neoconservative movement", type: "ideological influence", description: "Commentary was a crucible of the neoconservative intellectual movement." },
  { name: "Norman Podhoretz", type: "legendary editor", description: "Norman Podhoretz edited Commentary for 35 years (1960-1995), shaping American intellectual life." },
  { name: "Irving Kristol", type: "contributor", description: "Irving Kristol, the 'godfather of neoconservatism,' was a key Commentary contributor." }
]);
updDesc('commentary-magazine', 'Founded in 1945 by the American Jewish Committee, Commentary became the most influential Jewish intellectual journal in America. Under Norman Podhoretz (editor 1960-1995), it evolved from liberal to neoconservative, profoundly influencing American political thought. Contributors included Hannah Arendt, Irving Kristol, Norman Mailer, and Saul Bellow. Currently edited by John Podhoretz (Norman\'s son).');
addInd('commentary-magazine', { name: "Norman Podhoretz", bio: "Editor of Commentary from 1960-1995. His ideological journey from liberalism to neoconservatism mirrored and influenced a generation of Jewish intellectuals. Author of 'Making It' and 'Breaking Ranks.'" });

// ============================================================
// Moment Magazine
// ============================================================
addConn('moment-magazine', [
  { name: "Elie Wiesel", type: "co-founder", description: "Nobel laureate and Holocaust survivor Elie Wiesel co-founded Moment in 1975." },
  { name: "Leonard Fein", type: "co-founder", description: "Jewish public intellectual Leonard Fein co-founded Moment with Wiesel." },
  { name: "Jewish pluralism", type: "editorial mission", description: "Moment covers all streams of Judaism and the full spectrum of Jewish opinion." }
]);
updDesc('moment-magazine', 'Co-founded in 1975 by Nobel laureate Elie Wiesel and Jewish intellectual Leonard Fein. Moment is an independent, non-affiliated Jewish magazine covering the full spectrum of Jewish life — from Orthodox to secular, left to right. Known for its "Big Questions" feature asking thinkers from different Jewish perspectives to weigh in on contemporary issues. Now published by Nadine Epstein.');
addInd('moment-magazine', { name: "Elie Wiesel", bio: "Holocaust survivor, Nobel Peace Prize laureate (1986), author of 'Night,' and co-founder of Moment Magazine. Called the 'messenger to mankind' by the Nobel Committee." });

// ============================================================
// SAVE
// ============================================================
fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0,pc=0;for(const c in data.countries)for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;pc+=(e.connections||[]).length;}
console.log(`addConnections5.js done! ${tc} entries, ${wc} with connections, ${pc} total connections, ${Object.keys(people.people).length} people.`);
