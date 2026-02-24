// Generate comprehensive jewish.json and people.json with extensive data
// Covers: organizations, businesses, media, government agencies, educational institutions,
// lobbying groups, charities, synagogues, cultural institutions, and individuals
// Usage: node scripts/generateFullData.js

const fs = require('fs');
const path = require('path');

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const data = { countries: {} };
const people = { people: {} };

function addEntry(country, entry) {
  if (!data.countries[country]) data.countries[country] = [];
  entry.id = slugify(entry.name);
  if (!entry.individuals) entry.individuals = [];
  // register people
  entry.individuals.forEach(ind => {
    const pid = slugify(ind.name);
    ind.id = pid;
    if (!people.people[pid]) {
      people.people[pid] = { name: ind.name, bio: ind.bio || '', notes: '' };
    } else if (ind.bio) {
      people.people[pid].bio = ind.bio;
    }
  });
  data.countries[country].push(entry);
}

// ============================================================
// UNITED STATES
// ============================================================
const us = "United States";

// --- Advocacy & Lobbying ---
addEntry(us, { name: "American Jewish Committee (AJC)", type: "advocacy organization", description: "Founded 1906. One of the oldest Jewish advocacy organizations focused on global diplomacy and combating antisemitism.", website: "https://www.ajc.org/", individuals: [{ name: "Ted Deutch", role: "CEO", bio: "Former US Congressman, CEO of AJC since 2022." }, { name: "David Harris", role: "Former CEO", bio: "Led AJC for 28 years as CEO." }] });
addEntry(us, { name: "Anti-Defamation League (ADL)", type: "advocacy organization", description: "Founded 1913 to fight antisemitism and all forms of bigotry. Monitors hate groups and provides education.", website: "https://www.adl.org/", individuals: [{ name: "Jonathan Greenblatt", role: "CEO & National Director", bio: "CEO of ADL since 2015, former Obama administration official." }, { name: "Sigmund Livingston", role: "Founder", bio: "Founded the ADL in 1913 under B'nai B'rith." }] });
addEntry(us, { name: "AIPAC (American Israel Public Affairs Committee)", type: "lobbying group", description: "The most prominent pro-Israel lobbying organization in the US, influencing US policy toward Israel.", website: "https://www.aipac.org/", individuals: [{ name: "Howard Kohr", role: "Executive Director", bio: "Long-serving executive director of AIPAC." }, { name: "Betsy Berns Korn", role: "President", bio: "President of AIPAC." }] });
addEntry(us, { name: "Zionist Organization of America (ZOA)", type: "advocacy organization", description: "Founded 1897. The oldest pro-Israel organization in the United States.", website: "https://zoa.org/", individuals: [{ name: "Morton Klein", role: "President", bio: "President of ZOA since 1993." }] });
addEntry(us, { name: "J Street", type: "lobbying group", description: "Pro-Israel, pro-peace advocacy organization founded in 2007. Supports diplomatic solutions.", website: "https://jstreet.org/", individuals: [{ name: "Jeremy Ben-Ami", role: "President & Founder", bio: "Founded J Street in 2007." }] });
addEntry(us, { name: "Christians United for Israel (CUFI)", type: "advocacy organization", description: "Largest pro-Israel organization in the US with millions of members.", website: "https://www.cufi.org/", individuals: [{ name: "John Hagee", role: "Founder & Chairman", bio: "Pastor and founder of CUFI." }] });
addEntry(us, { name: "Conference of Presidents of Major American Jewish Organizations", type: "umbrella organization", description: "Umbrella body representing 50+ national Jewish organizations on issues of national security and Israel.", website: "https://www.conferenceofpresidents.org/", individuals: [{ name: "William Daroff", role: "CEO", bio: "CEO of the Conference of Presidents." }] });
addEntry(us, { name: "American Jewish Congress", type: "advocacy organization", description: "Founded 1918 to defend Jewish interests at home and abroad through public policy advocacy and litigation.", website: "https://www.ajcongress.org/", individuals: [{ name: "Jack Rosen", role: "President", bio: "President of the American Jewish Congress." }] });
addEntry(us, { name: "Jewish Council for Public Affairs (JCPA)", type: "advocacy organization", description: "Coordinates public affairs efforts of Jewish community relations agencies across North America.", website: "https://www.jewishpublicaffairs.org/", individuals: [] });
addEntry(us, { name: "Republican Jewish Coalition", type: "political organization", description: "Promotes Jewish involvement in the Republican Party.", website: "https://www.rjchq.org/", individuals: [{ name: "Matt Brooks", role: "Executive Director", bio: "Long-time head of the RJC." }] });
addEntry(us, { name: "Jewish Democratic Council of America", type: "political organization", description: "Advocacy organization representing Jewish Democrats.", website: "https://jewishdems.org/", individuals: [{ name: "Halie Soifer", role: "CEO", bio: "CEO of JDCA." }] });
addEntry(us, { name: "StandWithUs", type: "advocacy organization", description: "International Israel education organization combating antisemitism and delegitimization of Israel.", website: "https://www.standwithus.com/", individuals: [{ name: "Roz Rothstein", role: "Co-Founder & CEO", bio: "Co-founded StandWithUs in 2001." }] });
addEntry(us, { name: "Simon Wiesenthal Center", type: "advocacy organization", description: "Global Jewish human rights organization confronting antisemitism, hate and terrorism.", website: "https://www.wiesenthal.com/", individuals: [{ name: "Rabbi Marvin Hier", role: "Founder & Dean", bio: "Founded the Simon Wiesenthal Center in 1977." }, { name: "Rabbi Abraham Cooper", role: "Associate Dean & Director of Global Social Action", bio: "Leading figure in combating online hate." }] });

// --- Federations & Community Organizations ---
addEntry(us, { name: "Jewish Federations of North America (JFNA)", type: "federation", description: "Umbrella organization representing 146 Jewish federations and 300+ network communities. Largest Jewish philanthropy in the world.", website: "https://www.jewishfederations.org/", individuals: [{ name: "Eric Fingerhut", role: "President & CEO", bio: "President & CEO of JFNA." }] });
addEntry(us, { name: "UJA-Federation of New York", type: "federation", description: "One of the largest local philanthropies in the world, serving the Jewish community in New York.", website: "https://www.ujafedny.org/", individuals: [{ name: "Eric Goldstein", role: "CEO", bio: "CEO of UJA-Federation of New York." }] });
addEntry(us, { name: "Jewish Federation of Greater Los Angeles", type: "federation", description: "Serves the Jewish community of Greater Los Angeles through philanthropy, social services, and Israel engagement.", website: "https://www.jewishla.org/", individuals: [] });
addEntry(us, { name: "Jewish United Fund of Metropolitan Chicago", type: "federation", description: "Serves the Chicago Jewish community through fundraising, social services, and advocacy.", website: "https://www.juf.org/", individuals: [] });
addEntry(us, { name: "Combined Jewish Philanthropies (Boston)", type: "federation", description: "Federation serving the Greater Boston Jewish community.", website: "https://www.cjp.org/", individuals: [] });
addEntry(us, { name: "B'nai B'rith International", type: "fraternal organization", description: "Founded 1843. Oldest Jewish service organization in the world, focused on community service, seniors, and advocacy.", website: "https://www.bnaibrith.org/", individuals: [{ name: "Seth Riklin", role: "President", bio: "President of B'nai B'rith International." }] });

// --- Religious Bodies & Movements ---
addEntry(us, { name: "Chabad-Lubavitch", type: "religious movement", description: "Global Hasidic movement with 5,000+ emissary families in 100+ countries, known for Jewish outreach.", website: "https://www.chabad.org/", individuals: [{ name: "Rabbi Menachem Mendel Schneerson", role: "Rebbe (1902-1994)", bio: "The seventh Lubavitcher Rebbe who transformed Chabad into a global movement." }, { name: "Rabbi Yehuda Krinsky", role: "Chairman", bio: "Chairman of Chabad-Lubavitch educational and social service arms." }] });
addEntry(us, { name: "Orthodox Union (OU)", type: "religious organization", description: "Largest Orthodox Jewish umbrella organization in the US, also the world's largest kosher certification agency.", website: "https://www.ou.org/", individuals: [{ name: "Rabbi Moshe Hauer", role: "Executive Vice President", bio: "Executive VP of the Orthodox Union." }] });
addEntry(us, { name: "United Synagogue of Conservative Judaism", type: "religious organization", description: "Association of 600 Conservative congregations across North America.", website: "https://www.uscj.org/", individuals: [] });
addEntry(us, { name: "Union for Reform Judaism (URJ)", type: "religious organization", description: "Represents nearly 900 Reform congregations across North America.", website: "https://urj.org/", individuals: [{ name: "Rabbi Rick Jacobs", role: "President", bio: "President of the Union for Reform Judaism." }] });
addEntry(us, { name: "Reconstructing Judaism", type: "religious organization", description: "Central organization of the Reconstructionist movement.", website: "https://www.reconstructingjudaism.org/", individuals: [{ name: "Rabbi Deborah Waxman", role: "President", bio: "First woman rabbi and first lesbian to lead a Jewish congregational union." }] });
addEntry(us, { name: "Agudath Israel of America", type: "religious organization", description: "Haredi Orthodox Jewish advocacy organization founded in 1922.", website: "https://agudah.org/", individuals: [{ name: "Rabbi Chaim Dovid Zwiebel", role: "Executive Vice President", bio: "Executive VP of Agudath Israel." }] });
addEntry(us, { name: "Rabbinical Council of America (RCA)", type: "rabbinical association", description: "The largest organization of Orthodox rabbis in the United States with over 1,000 members.", website: "https://www.rabbis.org/", individuals: [] });
addEntry(us, { name: "Central Conference of American Rabbis (CCAR)", type: "rabbinical association", description: "The oldest and largest organization of rabbis in North America, associated with the Reform movement.", website: "https://www.ccarnet.org/", individuals: [] });
addEntry(us, { name: "Rabbinical Assembly", type: "rabbinical association", description: "International association of Conservative/Masorti rabbis.", website: "https://www.rabbinicalassembly.org/", individuals: [] });

// --- Education ---
addEntry(us, { name: "Yeshiva University", type: "university", description: "Private Orthodox Jewish university in New York City, founded 1886.", website: "https://www.yu.edu/", individuals: [{ name: "Ari Berman", role: "President", bio: "President of Yeshiva University since 2017." }] });
addEntry(us, { name: "Brandeis University", type: "university", description: "Private research university in Waltham, Massachusetts, founded in 1948, named after Justice Louis Brandeis.", website: "https://www.brandeis.edu/", individuals: [{ name: "Ronald Liebowitz", role: "President", bio: "President of Brandeis University." }] });
addEntry(us, { name: "Hebrew Union College – Jewish Institute of Religion", type: "seminary", description: "The academic, spiritual, and professional leadership development center of Reform Judaism.", website: "https://huc.edu/", individuals: [] });
addEntry(us, { name: "Jewish Theological Seminary (JTS)", type: "seminary", description: "Academic and religious center for Conservative Judaism, founded 1887 in New York.", website: "https://www.jtsa.edu/", individuals: [{ name: "Shuly Rubin Schwartz", role: "Chancellor", bio: "First woman chancellor of JTS." }] });
addEntry(us, { name: "Hillel International", type: "student organization", description: "Foundation for Jewish campus life, engaging college students at 850+ campuses worldwide.", website: "https://www.hillel.org/", individuals: [{ name: "Adam Lehman", role: "President & CEO", bio: "President & CEO of Hillel International." }] });
addEntry(us, { name: "Birthright Israel Foundation", type: "educational program", description: "Provides free 10-day heritage trips to Israel for young Jewish adults.", website: "https://www.birthrightisrael.com/", individuals: [{ name: "Gidi Mark", role: "CEO", bio: "CEO of Taglit-Birthright Israel." }] });

// --- Charities & Humanitarian ---
addEntry(us, { name: "Hadassah, The Women's Zionist Organization of America", type: "women's organization", description: "Largest Jewish women's organization in the US, supports medical care and research in Israel.", website: "https://www.hadassah.org/", individuals: [{ name: "Rhoda Smolow", role: "National President", bio: "National President of Hadassah." }] });
addEntry(us, { name: "Jewish National Fund – USA (JNF-USA)", type: "non-profit", description: "Raises funds for land development and infrastructure projects in Israel.", website: "https://www.jnf.org/", individuals: [{ name: "Russell Robinson", role: "CEO", bio: "CEO of JNF-USA." }] });
addEntry(us, { name: "American Jewish Joint Distribution Committee (JDC)", type: "humanitarian organization", description: "Founded 1914. Leading global Jewish humanitarian organization providing aid in 70+ countries.", website: "https://www.jdc.org/", individuals: [{ name: "Ariel Zwang", role: "CEO", bio: "CEO of JDC." }] });
addEntry(us, { name: "HIAS (Hebrew Immigrant Aid Society)", type: "refugee assistance", description: "Founded 1881. Jewish humanitarian organization providing protection and assistance to refugees.", website: "https://www.hias.org/", individuals: [{ name: "Mark Hetfield", role: "President & CEO", bio: "President & CEO of HIAS." }] });
addEntry(us, { name: "Jewish Agency for Israel (US Office)", type: "non-profit", description: "Promotes aliyah (immigration to Israel) and strengthens Jewish identity globally.", website: "https://www.jewishagency.org/", individuals: [{ name: "Doron Almog", role: "Chairman", bio: "Chairman of the Jewish Agency." }] });
addEntry(us, { name: "ORT America", type: "educational charity", description: "US affiliate of World ORT, supporting technology-driven education.", website: "https://www.ortamerica.org/", individuals: [] });
addEntry(us, { name: "American Friends of the Israel Defense Forces (FIDF)", type: "charity", description: "Supports educational, cultural, and recreational programs for IDF soldiers.", website: "https://www.fidf.org/", individuals: [{ name: "Steven Weil", role: "National Director & CEO", bio: "CEO of FIDF." }] });

// --- Media ---
addEntry(us, { name: "The Forward (newspaper)", type: "media", description: "Independent Jewish media organization, founded 1897 as a Yiddish-language daily newspaper.", website: "https://forward.com/", individuals: [{ name: "Jodi Rudoren", role: "Editor-in-Chief", bio: "Editor-in-Chief of The Forward." }] });
addEntry(us, { name: "The Jewish Daily Forward (Yiddish: Forverts)", type: "media", description: "Historic Yiddish newspaper and cultural institution, now digital.", website: "https://forward.com/yiddish/", individuals: [] });
addEntry(us, { name: "Jewish Telegraphic Agency (JTA)", type: "news agency", description: "Global Jewish news service founded in 1917, providing reporting on Jewish affairs worldwide.", website: "https://www.jta.org/", individuals: [] });
addEntry(us, { name: "The Times of Israel (US Bureau)", type: "media", description: "Online newspaper covering Israel, the region, and the Jewish world.", website: "https://www.timesofisrael.com/", individuals: [{ name: "David Horovitz", role: "Founding Editor", bio: "Founding editor of The Times of Israel." }] });
addEntry(us, { name: "Tablet Magazine", type: "media", description: "Online magazine of Jewish news, ideas, and culture.", website: "https://www.tabletmag.com/", individuals: [{ name: "Alana Newhouse", role: "Editor-in-Chief", bio: "Founder and editor-in-chief of Tablet Magazine." }] });
addEntry(us, { name: "Commentary Magazine", type: "media", description: "Monthly magazine on politics, society, and culture from a Jewish perspective, published since 1945.", website: "https://www.commentary.org/", individuals: [{ name: "John Podhoretz", role: "Editor", bio: "Editor of Commentary Magazine." }] });
addEntry(us, { name: "Moment Magazine", type: "media", description: "Independent Jewish magazine founded in 1975 by Elie Wiesel and Leonard Fein.", website: "https://momentmag.com/", individuals: [] });

// --- Museums & Cultural Institutions ---
addEntry(us, { name: "Museum of Jewish Heritage – A Living Memorial to the Holocaust", type: "museum", description: "Located in New York City, one of the major institutions dedicated to educating about the Holocaust and Jewish heritage.", website: "https://mjhnyc.org/", individuals: [{ name: "Jack Kliger", role: "President & CEO", bio: "President of the Museum of Jewish Heritage." }] });
addEntry(us, { name: "United States Holocaust Memorial Museum", type: "museum", description: "America's national institution for documenting and studying the Holocaust, located in Washington DC.", website: "https://www.ushmm.org/", individuals: [{ name: "Stuart Eizenstat", role: "Chairman", bio: "Chairman of the US Holocaust Memorial Council." }] });
addEntry(us, { name: "Skirball Cultural Center", type: "cultural center", description: "Cultural center in Los Angeles exploring Jewish life and culture in the context of American democratic ideals.", website: "https://www.skirball.org/", individuals: [] });
addEntry(us, { name: "National Museum of American Jewish History", type: "museum", description: "Smithsonian-affiliated museum in Philadelphia telling the American Jewish story.", website: "https://www.nmajh.org/", individuals: [] });
addEntry(us, { name: "The Jewish Museum (New York)", type: "museum", description: "Art and cultural museum in Manhattan exploring 4,000 years of art and Jewish culture.", website: "https://thejewishmuseum.org/", individuals: [] });
addEntry(us, { name: "YIVO Institute for Jewish Research", type: "research institute", description: "Center for Yiddish scholarship and Eastern European Jewish history and culture, founded 1925.", website: "https://yivo.org/", individuals: [] });
addEntry(us, { name: "Center for Jewish History", type: "cultural institution", description: "Partnership of five major institutions for Jewish scholarship and culture in New York City.", website: "https://www.cjh.org/", individuals: [] });

// --- Businesses & Finance ---
addEntry(us, { name: "BlackRock", type: "financial corporation", description: "World's largest asset management firm, founded by Larry Fink.", website: "https://www.blackrock.com/", individuals: [{ name: "Larry Fink", role: "Chairman & CEO", bio: "Co-founder and CEO of BlackRock, the world's largest asset manager." }] });
addEntry(us, { name: "Goldman Sachs", type: "investment bank", description: "Major global investment bank and financial services company.", website: "https://www.goldmansachs.com/", individuals: [{ name: "David Solomon", role: "CEO", bio: "CEO of Goldman Sachs since 2018." }, { name: "Lloyd Blankfein", role: "Former CEO", bio: "CEO of Goldman Sachs 2006-2018." }] });
addEntry(us, { name: "Bloomberg L.P.", type: "media & financial data", description: "Global financial data, media, and technology company.", website: "https://www.bloomberg.com/", individuals: [{ name: "Michael Bloomberg", role: "Founder", bio: "Founder of Bloomberg LP, former Mayor of New York City." }] });
addEntry(us, { name: "Oracle Corporation", type: "technology", description: "Major multinational computer technology company.", website: "https://www.oracle.com/", individuals: [{ name: "Larry Ellison", role: "Co-founder & Chairman", bio: "Co-founder of Oracle, one of the world's wealthiest people." }] });
addEntry(us, { name: "Meta Platforms (Facebook)", type: "technology", description: "Parent company of Facebook, Instagram, and WhatsApp.", website: "https://about.meta.com/", individuals: [{ name: "Mark Zuckerberg", role: "Co-founder & CEO", bio: "Co-founder of Facebook, one of the world's most influential tech leaders." }, { name: "Sheryl Sandberg", role: "Former COO", bio: "Former COO of Meta, author of Lean In." }] });
addEntry(us, { name: "Google (Alphabet Inc.)", type: "technology", description: "World's leading search engine and technology company.", website: "https://www.google.com/", individuals: [{ name: "Sergey Brin", role: "Co-founder", bio: "Co-founder of Google, born in Moscow to a Jewish family." }, { name: "Larry Page", role: "Co-founder", bio: "Co-founder of Google." }] });
addEntry(us, { name: "Dell Technologies", type: "technology", description: "Major computer technology company founded in 1984.", website: "https://www.dell.com/", individuals: [{ name: "Michael Dell", role: "Founder & CEO", bio: "Founder and CEO of Dell Technologies." }] });
addEntry(us, { name: "Estée Lauder Companies", type: "cosmetics", description: "Global manufacturer and marketer of prestige skincare, makeup, and fragrance products.", website: "https://www.elcompanies.com/", individuals: [{ name: "William Lauder", role: "Executive Chairman", bio: "Executive Chairman of Estée Lauder Companies." }, { name: "Estée Lauder", role: "Founder (1906-2004)", bio: "Founded the company in 1946." }] });
addEntry(us, { name: "Haim Saban / Saban Capital Group", type: "media & entertainment", description: "Media and entertainment conglomerate.", website: "", individuals: [{ name: "Haim Saban", role: "Founder & Chairman", bio: "Israeli-American media mogul, creator of Mighty Morphin Power Rangers." }] });
addEntry(us, { name: "IAC (InterActiveCorp)", type: "technology/media", description: "Holding company owning brands like Dotdash Meredith, Care.com, and Angi.", website: "https://www.iac.com/", individuals: [{ name: "Barry Diller", role: "Chairman", bio: "Media mogul and chairman of IAC." }] });
addEntry(us, { name: "Dreamworks", type: "entertainment", description: "Major film production studio.", website: "https://www.dreamworks.com/", individuals: [{ name: "Steven Spielberg", role: "Co-founder", bio: "Legendary filmmaker and co-founder of DreamWorks." }, { name: "Jeffrey Katzenberg", role: "Co-founder", bio: "Co-founder of DreamWorks Animation." }, { name: "David Geffen", role: "Co-founder", bio: "Co-founder of DreamWorks, record executive and philanthropist." }] });
addEntry(us, { name: "Warner Bros. Discovery", type: "entertainment", description: "Global media and entertainment company.", website: "https://wbd.com/", individuals: [{ name: "David Zaslav", role: "CEO", bio: "CEO of Warner Bros. Discovery." }] });
addEntry(us, { name: "Paramount Global", type: "entertainment", description: "Mass media and entertainment conglomerate.", website: "https://www.paramount.com/", individuals: [{ name: "Shari Redstone", role: "Chair", bio: "Chair of Paramount Global." }] });
addEntry(us, { name: "The Walt Disney Company", type: "entertainment", description: "Major global entertainment company.", website: "https://thewaltdisneycompany.com/", individuals: [{ name: "Bob Iger", role: "CEO", bio: "CEO of The Walt Disney Company." }] });
addEntry(us, { name: "Starbucks", type: "food & beverage", description: "Global coffeehouse chain.", website: "https://www.starbucks.com/", individuals: [{ name: "Howard Schultz", role: "Former CEO & Chairman", bio: "Built Starbucks into a global brand." }] });
addEntry(us, { name: "Las Vegas Sands Corp", type: "hospitality/gaming", description: "Global developer of integrated resorts and convention centers.", website: "https://www.sands.com/", individuals: [{ name: "Sheldon Adelson", role: "Founder (1933-2021)", bio: "Billionaire businessman and major Republican/pro-Israel donor." }, { name: "Miriam Adelson", role: "Owner", bio: "Israeli-American physician and major political donor." }] });
addEntry(us, { name: "Berkshire Hathaway (via subsidiaries)", type: "conglomerate", description: "Multinational conglomerate holding company.", website: "https://www.berkshirehathaway.com/", individuals: [] });
addEntry(us, { name: "Renaissance Technologies", type: "hedge fund", description: "Quantitative hedge fund known for its Medallion Fund.", website: "", individuals: [{ name: "James Simons", role: "Founder (1938-2024)", bio: "Mathematician and hedge fund manager, founded Renaissance Technologies." }] });
addEntry(us, { name: "Citadel LLC", type: "hedge fund", description: "Multinational hedge fund and financial services company.", website: "https://www.citadel.com/", individuals: [{ name: "Ken Griffin", role: "Founder & CEO", bio: "Billionaire founder and CEO of Citadel." }] });
addEntry(us, { name: "Kraft Group", type: "conglomerate", description: "Diversified holding company owning the New England Patriots.", website: "https://www.thekraftgroup.com/", individuals: [{ name: "Robert Kraft", role: "Chairman & CEO", bio: "Owner of the New England Patriots and CEO of the Kraft Group." }] });

// --- Healthcare / Hospitals ---
addEntry(us, { name: "Mount Sinai Health System", type: "healthcare", description: "Major academic medical center in New York City.", website: "https://www.mountsinai.org/", individuals: [] });
addEntry(us, { name: "Cedars-Sinai Medical Center", type: "healthcare", description: "Non-profit academic healthcare organization in Los Angeles, one of the largest in the Western US.", website: "https://www.cedars-sinai.org/", individuals: [] });
addEntry(us, { name: "Albert Einstein College of Medicine", type: "medical school", description: "Research-intensive medical school in the Bronx, New York.", website: "https://www.einsteinmed.edu/", individuals: [] });

// ============================================================
// ISRAEL
// ============================================================
const il = "Israel";

// --- Government ---
addEntry(il, { name: "Knesset (Israeli Parliament)", type: "government", description: "The unicameral national legislature of Israel, consisting of 120 members.", website: "https://www.knesset.gov.il/", individuals: [{ name: "Amir Ohana", role: "Speaker", bio: "Speaker of the Knesset." }] });
addEntry(il, { name: "Prime Minister's Office", type: "government", description: "Office of the Prime Minister of Israel.", website: "https://www.gov.il/en/departments/prime_ministers_office", individuals: [{ name: "Benjamin Netanyahu", role: "Prime Minister", bio: "Longest-serving Prime Minister of Israel." }] });
addEntry(il, { name: "Ministry of Defense", type: "government", description: "Responsible for the defense policy and the Israel Defense Forces.", website: "https://www.mod.gov.il/", individuals: [{ name: "Yoav Gallant", role: "Minister of Defense", bio: "Israeli politician and former IDF general." }] });
addEntry(il, { name: "Ministry of Foreign Affairs", type: "government", description: "Responsible for Israel's foreign policy and diplomatic missions worldwide.", website: "https://www.gov.il/en/departments/ministry_of_foreign_affairs", individuals: [] });
addEntry(il, { name: "Mossad (Institute for Intelligence and Special Operations)", type: "intelligence agency", description: "Israel's national intelligence agency, responsible for intelligence collection and covert operations.", website: "", individuals: [{ name: "David Barnea", role: "Director", bio: "Director of the Mossad." }] });
addEntry(il, { name: "Shin Bet (Israel Security Agency)", type: "intelligence agency", description: "Israel's internal security service, responsible for counterintelligence and counterterrorism.", website: "", individuals: [{ name: "Ronen Bar", role: "Director", bio: "Director of Shin Bet." }] });
addEntry(il, { name: "Israel Defense Forces (IDF)", type: "military", description: "Combined military forces of Israel comprising ground, air, and naval forces.", website: "https://www.idf.il/", individuals: [{ name: "Herzi Halevi", role: "Chief of General Staff", bio: "20th Chief of General Staff of the IDF." }] });
addEntry(il, { name: "Bank of Israel", type: "central bank", description: "The central bank of the State of Israel.", website: "https://www.boi.org.il/", individuals: [{ name: "Amir Yaron", role: "Governor", bio: "Governor of the Bank of Israel." }] });
addEntry(il, { name: "Israel Tax Authority", type: "government agency", description: "Government agency responsible for tax collection in Israel.", website: "", individuals: [] });
addEntry(il, { name: "Israel Lands Authority", type: "government agency", description: "Manages 93% of land in Israel on behalf of the state.", website: "", individuals: [] });
addEntry(il, { name: "Israel Airports Authority", type: "government agency", description: "Manages and operates airports in Israel, including Ben Gurion International Airport.", website: "", individuals: [] });

// --- Education ---
addEntry(il, { name: "Hebrew University of Jerusalem", type: "university", description: "Israel's second-oldest university, founded in 1918. A leading research institution.", website: "https://www.huji.ac.il/", individuals: [{ name: "Asher Cohen", role: "President", bio: "President of the Hebrew University." }] });
addEntry(il, { name: "Technion – Israel Institute of Technology", type: "university", description: "Israel's oldest university, founded 1912. Premier science and engineering institution.", website: "https://www.technion.ac.il/", individuals: [{ name: "Uri Sivan", role: "President", bio: "President of the Technion." }] });
addEntry(il, { name: "Tel Aviv University", type: "university", description: "Israel's largest university, a major center of teaching and research.", website: "https://english.tau.ac.il/", individuals: [{ name: "Ariel Porat", role: "President", bio: "President of Tel Aviv University." }] });
addEntry(il, { name: "Weizmann Institute of Science", type: "research institute", description: "Multidisciplinary research institution in Rehovot, one of the world's leading scientific institutes.", website: "https://www.weizmann.ac.il/", individuals: [{ name: "Alon Chen", role: "President", bio: "President of the Weizmann Institute of Science." }] });
addEntry(il, { name: "Ben-Gurion University of the Negev", type: "university", description: "Research university in Beersheba, central to development of the Negev region.", website: "https://in.bgu.ac.il/", individuals: [] });
addEntry(il, { name: "Bar-Ilan University", type: "university", description: "Public research university in Ramat Gan.", website: "https://www.biu.ac.il/", individuals: [{ name: "Arie Zaban", role: "President", bio: "President of Bar-Ilan University." }] });
addEntry(il, { name: "University of Haifa", type: "university", description: "Research university in Haifa, Israel.", website: "https://www.haifa.ac.il/", individuals: [] });
addEntry(il, { name: "Reichman University (IDC Herzliya)", type: "university", description: "Private university in Herzliya, Israel.", website: "https://www.runi.ac.il/", individuals: [] });
addEntry(il, { name: "Bezalel Academy of Arts and Design", type: "art academy", description: "Israel's national school of art, founded 1906 in Jerusalem.", website: "https://www.bezalel.ac.il/", individuals: [] });
addEntry(il, { name: "Hadassah Medical Center", type: "hospital/research", description: "Leading medical center in Jerusalem, founded by Hadassah.", website: "https://www.hadassah.org.il/", individuals: [] });

// --- Israeli Businesses & Technology ---
addEntry(il, { name: "Teva Pharmaceutical Industries", type: "pharmaceutical", description: "Israel-based multinational pharmaceutical company, largest generic drug manufacturer globally.", website: "https://www.tevapharm.com/", individuals: [] });
addEntry(il, { name: "Check Point Software Technologies", type: "cybersecurity", description: "Multinational cybersecurity company providing hardware and software products.", website: "https://www.checkpoint.com/", individuals: [{ name: "Gil Shwed", role: "Founder & CEO", bio: "Co-founder and CEO of Check Point Software." }] });
addEntry(il, { name: "Nice Ltd", type: "technology", description: "Enterprise software company specializing in customer engagement and financial crime prevention.", website: "https://www.nice.com/", individuals: [] });
addEntry(il, { name: "Wix.com", type: "technology", description: "Cloud-based web development platform allowing users to create websites.", website: "https://www.wix.com/", individuals: [{ name: "Avishai Abrahami", role: "Co-founder & CEO", bio: "Co-founder and CEO of Wix.com." }] });
addEntry(il, { name: "CyberArk", type: "cybersecurity", description: "Information security company offering privileged access management.", website: "https://www.cyberark.com/", individuals: [{ name: "Udi Mokady", role: "Founder & Executive Chairman", bio: "Founder and executive chairman of CyberArk." }] });
addEntry(il, { name: "Mobileye (Intel)", type: "automotive technology", description: "Developer of vision-based advanced driver-assistance systems, acquired by Intel.", website: "https://www.mobileye.com/", individuals: [{ name: "Amnon Shashua", role: "Co-founder & CEO", bio: "Co-founder of Mobileye, professor at Hebrew University." }] });
addEntry(il, { name: "SodaStream", type: "consumer goods", description: "Home carbonation product company acquired by PepsiCo.", website: "https://sodastream.com/", individuals: [{ name: "Daniel Birnbaum", role: "Former CEO", bio: "Former CEO of SodaStream." }] });
addEntry(il, { name: "Elbit Systems", type: "defense", description: "International defense electronics company.", website: "https://elbitsystems.com/", individuals: [] });
addEntry(il, { name: "Israel Aerospace Industries (IAI)", type: "defense/aerospace", description: "Israel's major aerospace and defense company, state-owned.", website: "https://www.iai.co.il/", individuals: [] });
addEntry(il, { name: "Rafael Advanced Defense Systems", type: "defense", description: "Israeli defense technology company, developer of Iron Dome.", website: "https://www.rafael.co.il/", individuals: [] });
addEntry(il, { name: "Israel Military Industries (IMI Systems)", type: "defense", description: "Major Israeli weapons manufacturer, now part of Elbit Systems.", website: "", individuals: [] });
addEntry(il, { name: "Tower Semiconductor", type: "semiconductor", description: "Specialty semiconductor foundry.", website: "https://towersemi.com/", individuals: [] });
addEntry(il, { name: "Fiverr International", type: "technology", description: "Online marketplace for freelance services.", website: "https://www.fiverr.com/", individuals: [{ name: "Micha Kaufman", role: "Co-founder & CEO", bio: "Co-founder and CEO of Fiverr." }] });
addEntry(il, { name: "Monday.com", type: "technology", description: "Cloud-based work management platform.", website: "https://monday.com/", individuals: [{ name: "Roy Mann", role: "Co-founder & CEO", bio: "Co-founded Monday.com." }] });
addEntry(il, { name: "IronSource (Unity)", type: "technology", description: "Technology company specializing in app monetization, merged with Unity.", website: "", individuals: [] });
addEntry(il, { name: "Playtika", type: "gaming", description: "Mobile gaming entertainment company.", website: "https://www.playtika.com/", individuals: [] });
addEntry(il, { name: "ICL Group", type: "chemicals/mining", description: "Global specialty minerals company.", website: "https://www.icl-group.com/", individuals: [] });
addEntry(il, { name: "Bank Hapoalim", type: "banking", description: "Israel's largest bank.", website: "https://www.bankhapoalim.com/", individuals: [] });
addEntry(il, { name: "Bank Leumi", type: "banking", description: "One of Israel's largest banks, founded 1902.", website: "https://www.leumi.co.il/", individuals: [] });
addEntry(il, { name: "Israel Discount Bank", type: "banking", description: "Third largest banking group in Israel.", website: "https://www.discountbank.co.il/", individuals: [] });
addEntry(il, { name: "El Al Israel Airlines", type: "airline", description: "Flag carrier airline of Israel.", website: "https://www.elal.com/", individuals: [] });
addEntry(il, { name: "Strauss Group", type: "food & beverage", description: "One of Israel's largest food & beverage companies.", website: "https://www.strauss-group.com/", individuals: [] });
addEntry(il, { name: "Tnuva", type: "food", description: "Israel's largest food manufacturer, historically a cooperative.", website: "https://www.tnuva.co.il/", individuals: [] });
addEntry(il, { name: "Osem-Nestlé", type: "food", description: "Major Israeli food manufacturer.", website: "https://www.osem.co.il/", individuals: [] });

// --- Media (Israel) ---
addEntry(il, { name: "Haaretz", type: "media", description: "Israel's oldest daily newspaper, founded 1918.", website: "https://www.haaretz.com/", individuals: [{ name: "Amos Schocken", role: "Publisher", bio: "Publisher and owner of Haaretz." }] });
addEntry(il, { name: "The Jerusalem Post", type: "media", description: "English-language Israeli newspaper founded 1932.", website: "https://www.jpost.com/", individuals: [] });
addEntry(il, { name: "Yedioth Ahronoth", type: "media", description: "One of Israel's most-read newspapers.", website: "https://www.ynet.co.il/", individuals: [{ name: "Arnon Mozes", role: "Publisher", bio: "Publisher of Yedioth Ahronoth." }] });
addEntry(il, { name: "Israel Hayom", type: "media", description: "Free daily newspaper, Israel's most widely read newspaper.", website: "https://www.israelhayom.com/", individuals: [] });
addEntry(il, { name: "The Times of Israel", type: "media", description: "Online newspaper covering Israel, the region, and the Jewish world.", website: "https://www.timesofisrael.com/", individuals: [{ name: "David Horovitz", role: "Founding Editor", bio: "Founding editor of The Times of Israel." }] });
addEntry(il, { name: "i24NEWS", type: "media", description: "International 24-hour news and current affairs channel based in Israel.", website: "https://www.i24news.tv/", individuals: [] });

// --- Cultural ---
addEntry(il, { name: "Yad Vashem", type: "memorial/museum", description: "Israel's official memorial to victims of the Holocaust, located on Mount Herzl in Jerusalem.", website: "https://www.yadvashem.org/", individuals: [{ name: "Dani Dayan", role: "Chairman", bio: "Chairman of Yad Vashem." }] });
addEntry(il, { name: "Israel Museum", type: "museum", description: "Israel's national museum, located in Jerusalem, housing the Dead Sea Scrolls.", website: "https://www.imj.org.il/", individuals: [] });
addEntry(il, { name: "Tel Aviv Museum of Art", type: "museum", description: "Major art museum in Tel Aviv.", website: "https://www.tamuseum.org.il/", individuals: [] });
addEntry(il, { name: "Israel Philharmonic Orchestra", type: "cultural institution", description: "Premier orchestra of Israel, founded 1936.", website: "https://www.ipo.co.il/", individuals: [] });
addEntry(il, { name: "Habima National Theatre", type: "theater", description: "Israel's national theater, founded in Moscow in 1917.", website: "https://www.habima.co.il/", individuals: [] });

// --- NGOs ---
addEntry(il, { name: "Jewish Agency for Israel", type: "quasi-governmental", description: "Organization responsible for immigration and absorption of Jews into Israel.", website: "https://www.jewishagency.org/", individuals: [{ name: "Doron Almog", role: "Chairman", bio: "Chairman of the Jewish Agency." }] });
addEntry(il, { name: "World Zionist Organization", type: "international organization", description: "Founded 1897 by Theodor Herzl, promotes Zionism and connection to Israel.", website: "https://www.wzo.org.il/", individuals: [{ name: "Yaakov Hagoel", role: "Chairman", bio: "Chairman of the World Zionist Organization." }] });
addEntry(il, { name: "Keren Kayemeth LeIsrael (Jewish National Fund)", type: "non-profit", description: "Organization for land development and forestry in Israel, founded 1901.", website: "https://www.kkl-jnf.org/", individuals: [] });
addEntry(il, { name: "World Jewish Congress (Israel office)", type: "international organization", description: "International federation of Jewish communities and organizations.", website: "https://www.worldjewishcongress.org/", individuals: [{ name: "Ronald Lauder", role: "President", bio: "President of the World Jewish Congress, businessman and philanthropist." }] });

// ============================================================
// UNITED KINGDOM
// ============================================================
const uk = "United Kingdom";

addEntry(uk, { name: "Board of Deputies of British Jews", type: "representative body", description: "The main representative organization of British Jews, founded 1760.", website: "https://www.bod.org.uk/", individuals: [{ name: "Marie van der Zyl", role: "President", bio: "President of the Board of Deputies of British Jews." }] });
addEntry(uk, { name: "Jewish Leadership Council", type: "umbrella organization", description: "Brings together leaders of UK Jewish organizations to agree strategy.", website: "https://www.thejlc.org/", individuals: [] });
addEntry(uk, { name: "United Synagogue", type: "religious body", description: "Largest synagogue body in the UK, representing Modern Orthodox communities.", website: "https://www.theus.org.uk/", individuals: [] });
addEntry(uk, { name: "Office of the Chief Rabbi", type: "religious authority", description: "The Chief Rabbi is the chief religious authority for Orthodox Jews in the UK and Commonwealth.", website: "https://chiefrabbi.org/", individuals: [{ name: "Rabbi Ephraim Mirvis", role: "Chief Rabbi", bio: "Chief Rabbi of the United Hebrew Congregations of the Commonwealth since 2013." }] });
addEntry(uk, { name: "Limmud", type: "educational organization", description: "Jewish educational charity running conferences and events, founded 1980.", website: "https://limmud.org/", individuals: [] });
addEntry(uk, { name: "Community Security Trust (CST)", type: "security/charity", description: "Charity providing security for the Jewish community and monitoring antisemitism in the UK.", website: "https://cst.org.uk/", individuals: [] });
addEntry(uk, { name: "Jewish Care", type: "charity", description: "Largest health and social care charity serving the Jewish community in London and Southeast England.", website: "https://www.jewishcare.org/", individuals: [{ name: "Steven Lewis", role: "Chairman", bio: "Chairman of Jewish Care." }] });
addEntry(uk, { name: "World Jewish Relief", type: "humanitarian charity", description: "UK Jewish community's humanitarian agency, providing disaster relief and development globally.", website: "https://www.worldjewishrelief.org/", individuals: [] });
addEntry(uk, { name: "Jewish Chronicle", type: "media", description: "Oldest Jewish newspaper in the world, published weekly since 1841.", website: "https://www.thejc.com/", individuals: [] });
addEntry(uk, { name: "Jewish News", type: "media", description: "Weekly newspaper covering Jewish community news in the UK.", website: "https://www.jewishnews.co.uk/", individuals: [] });
addEntry(uk, { name: "Campaign Against Antisemitism", type: "advocacy", description: "Charity monitoring and combating antisemitism in the UK.", website: "https://antisemitism.org/", individuals: [{ name: "Gideon Falter", role: "CEO", bio: "CEO of Campaign Against Antisemitism." }] });
addEntry(uk, { name: "Institute for Jewish Policy Research (JPR)", type: "research", description: "London-based institute studying Jewish life in Europe.", website: "https://www.jpr.org.uk/", individuals: [] });
addEntry(uk, { name: "Leo Baeck College", type: "seminary", description: "Rabbinical seminary in London for the training of Reform and Liberal rabbis.", website: "https://lbc.ac.uk/", individuals: [] });
addEntry(uk, { name: "The Rothschild Foundation", type: "foundation", description: "Family foundation supporting Jewish education, culture, and heritage.", website: "", individuals: [{ name: "Lord Jacob Rothschild", role: "Chairman (1936-2024)", bio: "British investment banker and philanthropist." }] });
addEntry(uk, { name: "Jews' Free School (JFS)", type: "education", description: "Largest Jewish school in Europe, founded 1732.", website: "https://www.jfs.brent.sch.uk/", individuals: [] });

// ============================================================
// FRANCE
// ============================================================
const fr = "France";

addEntry(fr, { name: "CRIF (Conseil Représentatif des Institutions Juives de France)", type: "representative body", description: "Umbrella organization representing Jewish institutions in France.", website: "https://www.crif.org/", individuals: [{ name: "Yonathan Arfi", role: "President", bio: "President of CRIF." }] });
addEntry(fr, { name: "Consistoire Central Israélite de France", type: "religious body", description: "Official organization of French Judaism, managing religious services since 1808.", website: "https://www.consistoire.org/", individuals: [{ name: "Joël Mergui", role: "President", bio: "President of the Consistoire." }] });
addEntry(fr, { name: "Alliance Israélite Universelle", type: "educational organization", description: "Founded 1860. Oldest Jewish education and advocacy network, promoting Jewish education worldwide.", website: "https://www.aiu.org/", individuals: [] });
addEntry(fr, { name: "Fondation pour la Mémoire de la Shoah", type: "foundation", description: "Foundation supporting Holocaust memory, education, and Jewish culture in France.", website: "https://www.fondationshoah.org/", individuals: [] });
addEntry(fr, { name: "SPCJ (Service de Protection de la Communauté Juive)", type: "security organization", description: "Security service for the French Jewish community.", website: "", individuals: [] });
addEntry(fr, { name: "Mémorial de la Shoah (Paris)", type: "museum", description: "Major Holocaust memorial and museum in Paris.", website: "https://www.memorialdelashoah.org/", individuals: [] });
addEntry(fr, { name: "OSE (Œuvre de Secours aux Enfants)", type: "charity", description: "Jewish children's rescue and aid organization, active since 1912.", website: "https://www.ose-france.org/", individuals: [] });
addEntry(fr, { name: "UEJF (Union of Jewish Students of France)", type: "student organization", description: "Jewish student representative body in France.", website: "", individuals: [] });
addEntry(fr, { name: "Radio J / Radio Shalom", type: "media", description: "French Jewish radio stations.", website: "", individuals: [] });

// ============================================================
// CANADA
// ============================================================
const ca = "Canada";

addEntry(ca, { name: "Centre for Israel and Jewish Affairs (CIJA)", type: "advocacy organization", description: "Advocacy agent of Jewish Federations of Canada on public policy.", website: "https://www.cija.ca/", individuals: [] });
addEntry(ca, { name: "B'nai Brith Canada", type: "advocacy organization", description: "Canadian arm of B'nai B'rith, focused on human rights and combating antisemitism.", website: "https://www.bnaibrith.ca/", individuals: [{ name: "Michael Mostyn", role: "CEO", bio: "CEO of B'nai Brith Canada." }] });
addEntry(ca, { name: "Jewish Federations of Canada – UIA", type: "federation", description: "National umbrella for Jewish federations across Canada.", website: "https://www.jewishcanada.org/", individuals: [] });
addEntry(ca, { name: "Friends of Simon Wiesenthal Center (Canada)", type: "advocacy", description: "Canadian affiliate of the Simon Wiesenthal Center.", website: "https://www.fswc.ca/", individuals: [] });
addEntry(ca, { name: "Canadian Jewish News", type: "media", description: "National Jewish newspaper in Canada.", website: "https://thecjn.ca/", individuals: [] });
addEntry(ca, { name: "UJA Federation of Greater Toronto", type: "federation", description: "Toronto's Jewish community federation.", website: "https://www.ujafed.org/", individuals: [] });
addEntry(ca, { name: "Federation CJA (Montreal)", type: "federation", description: "Montreal's Jewish community federation.", website: "https://www.federationcja.org/", individuals: [] });

// ============================================================
// AUSTRALIA
// ============================================================
const au = "Australia";

addEntry(au, { name: "Executive Council of Australian Jewry (ECAJ)", type: "representative body", description: "Peak representative body of the Australian Jewish community.", website: "https://www.ecaj.org.au/", individuals: [] });
addEntry(au, { name: "Zionist Federation of Australia", type: "advocacy", description: "Peak Zionist body in Australia.", website: "https://www.zfa.com.au/", individuals: [] });
addEntry(au, { name: "Australia/Israel & Jewish Affairs Council (AIJAC)", type: "research/advocacy", description: "Research and public affairs organization on Jewish and Israel issues.", website: "https://aijac.org.au/", individuals: [{ name: "Mark Leibler", role: "National Chairman", bio: "National Chairman of AIJAC." }] });
addEntry(au, { name: "Jewish Community Council of Victoria (JCCV)", type: "community organization", description: "Roof body of the Victorian Jewish community.", website: "https://www.jccv.org.au/", individuals: [] });
addEntry(au, { name: "NSW Jewish Board of Deputies", type: "representative body", description: "Representative body for the New South Wales Jewish community.", website: "https://jbd.nswjbd.org/", individuals: [] });
addEntry(au, { name: "The Australian Jewish News", type: "media", description: "Australia's leading Jewish newspaper.", website: "https://www.australianjewishnews.com/", individuals: [] });

// ============================================================
// GERMANY
// ============================================================
const de = "Germany";

addEntry(de, { name: "Zentralrat der Juden in Deutschland (Central Council of Jews in Germany)", type: "representative body", description: "Umbrella organization representing Jewish communities in Germany.", website: "https://www.zentralratderjuden.de/", individuals: [{ name: "Josef Schuster", role: "President", bio: "President of the Central Council of Jews in Germany." }] });
addEntry(de, { name: "Jüdische Gemeinde zu Berlin (Jewish Community of Berlin)", type: "community", description: "Largest Jewish community in Germany with around 10,000 members.", website: "https://www.jg-berlin.org/", individuals: [] });
addEntry(de, { name: "Jewish Museum Berlin", type: "museum", description: "Largest Jewish museum in Europe, documenting German-Jewish history.", website: "https://www.jmberlin.de/", individuals: [] });
addEntry(de, { name: "Abraham Geiger College", type: "seminary", description: "First rabbinical seminary founded in Germany since the Holocaust.", website: "https://www.abraham-geiger-kolleg.de/", individuals: [] });
addEntry(de, { name: "Allgemeine Rabbinerkonferenz (General Rabbinical Conference)", type: "rabbinical association", description: "Association of rabbis in Germany.", website: "", individuals: [] });
addEntry(de, { name: "Jüdische Allgemeine", type: "media", description: "Leading Jewish newspaper in Germany.", website: "https://www.juedische-allgemeine.de/", individuals: [] });
addEntry(de, { name: "Memorial to the Murdered Jews of Europe", type: "memorial", description: "Holocaust memorial in Berlin, opened 2005.", website: "https://www.stiftung-denkmal.de/", individuals: [] });

// ============================================================
// RUSSIA
// ============================================================
const ru = "Russia";

addEntry(ru, { name: "Federation of Jewish Communities of Russia (FJCR)", type: "umbrella organization", description: "Main Jewish communal organization in Russia affiliated with Chabad.", website: "", individuals: [{ name: "Alexander Boroda", role: "President", bio: "President of FJCR." }] });
addEntry(ru, { name: "Russian Jewish Congress", type: "advocacy organization", description: "Jewish advocacy organization in Russia.", website: "", individuals: [] });
addEntry(ru, { name: "Jewish Museum and Tolerance Center (Moscow)", type: "museum", description: "Largest Jewish museum in Russia, opened in 2012.", website: "https://www.jewish-museum.ru/", individuals: [] });
addEntry(ru, { name: "Moscow Choral Synagogue", type: "synagogue", description: "Main synagogue of Moscow, built in 1891.", website: "", individuals: [] });
addEntry(ru, { name: "Chief Rabbinate of Russia", type: "religious authority", description: "Chief Rabbi oversees religious life for Jews in Russia.", website: "", individuals: [{ name: "Rabbi Berel Lazar", role: "Chief Rabbi of Russia", bio: "Chabad rabbi serving as Chief Rabbi of Russia since 2000." }] });

// ============================================================
// ARGENTINA
// ============================================================
const ar = "Argentina";

addEntry(ar, { name: "DAIA (Delegación de Asociaciones Israelitas Argentinas)", type: "representative body", description: "Political umbrella organization of the Argentine Jewish community.", website: "https://www.daia.org.ar/", individuals: [] });
addEntry(ar, { name: "AMIA (Asociación Mutual Israelita Argentina)", type: "community center", description: "Buenos Aires Jewish community center, site of the 1994 bombing that killed 85 people.", website: "https://www.amia.org.ar/", individuals: [] });
addEntry(ar, { name: "Sociedad Hebraica Argentina", type: "cultural/social", description: "Major Jewish cultural and sports club in Buenos Aires.", website: "https://www.hebraica.org.ar/", individuals: [] });
addEntry(ar, { name: "Buenos Aires Herald / Jewish community media", type: "media", description: "Media serving Argentina's large Jewish community.", website: "", individuals: [] });

// ============================================================
// BRAZIL
// ============================================================
const br = "Brazil";

addEntry(br, { name: "Confederação Israelita do Brasil (CONIB)", type: "representative body", description: "Brazilian Jewish community umbrella organization.", website: "https://www.conib.org.br/", individuals: [] });
addEntry(br, { name: "Federação Israelita do Estado de São Paulo (FISESP)", type: "federation", description: "Jewish federation for the state of São Paulo.", website: "", individuals: [] });
addEntry(br, { name: "Albert Einstein Hospital (Hospital Israelita Albert Einstein)", type: "hospital", description: "Premier hospital in São Paulo, founded by the Jewish community.", website: "https://www.einstein.br/", individuals: [] });
addEntry(br, { name: "Club Hebraica São Paulo", type: "social club", description: "Major Jewish sports and social club in São Paulo.", website: "https://www.hebraica.org.br/", individuals: [] });

// ============================================================
// SOUTH AFRICA
// ============================================================
const za = "South Africa";

addEntry(za, { name: "South African Jewish Board of Deputies (SAJBD)", type: "representative body", description: "Representative council of South African Jewry, founded 1903.", website: "https://www.sajbd.org/", individuals: [] });
addEntry(za, { name: "South African Zionist Federation", type: "advocacy", description: "Pro-Israel advocacy in South Africa.", website: "https://www.sazf.org/", individuals: [] });
addEntry(za, { name: "South African Jewish Report", type: "media", description: "Newspaper serving the South African Jewish community.", website: "https://www.sajr.co.za/", individuals: [] });
addEntry(za, { name: "Chief Rabbi of South Africa", type: "religious authority", description: "Spiritual leader of South African Jewry.", website: "", individuals: [{ name: "Rabbi Warren Goldstein", role: "Chief Rabbi", bio: "Chief Rabbi of South Africa." }] });
addEntry(za, { name: "Cape Town Holocaust & Genocide Centre", type: "museum", description: "Museum dedicated to Holocaust education in South Africa.", website: "https://www.ctholocaust.co.za/", individuals: [] });
addEntry(za, { name: "ORT South Africa", type: "educational charity", description: "Branch of World ORT in South Africa.", website: "", individuals: [] });

// ============================================================
// INDIA
// ============================================================
const india = "India";

addEntry(india, { name: "Central Jewish Board of India", type: "representative body", description: "Umbrella organization of India's Jewish community organizations.", website: "", individuals: [] });
addEntry(india, { name: "The Jewish Club (Mumbai)", type: "community center", description: "Community center for the Bene Israel Jewish community in Mumbai.", website: "", individuals: [] });
addEntry(india, { name: "Chabad House Mumbai", type: "religious center", description: "Chabad center in Mumbai, rebuilt after the 2008 terror attacks.", website: "", individuals: [] });

// ============================================================
// ADDITIONAL COUNTRIES
// ============================================================

// MEXICO
addEntry("Mexico", { name: "Comité Central de la Comunidad Judía de México", type: "representative body", description: "Central committee of the Jewish community of Mexico.", website: "", individuals: [] });
addEntry("Mexico", { name: "Tribuna Israelita", type: "media/advocacy", description: "Jewish advocacy and media body in Mexico.", website: "", individuals: [] });

// HUNGARY
addEntry("Hungary", { name: "Federation of Hungarian Jewish Communities (Mazsihisz)", type: "umbrella organization", description: "Main Jewish communal organization in Hungary.", website: "", individuals: [] });
addEntry("Hungary", { name: "Dohány Street Synagogue (Budapest)", type: "synagogue", description: "Largest synagogue in Europe and second largest in the world.", website: "", individuals: [] });
addEntry("Hungary", { name: "Hungarian Jewish Museum", type: "museum", description: "Museum documenting Hungarian Jewish history.", website: "", individuals: [] });

// AUSTRIA
addEntry("Austria", { name: "Israelitische Kultusgemeinde Wien (Jewish Community of Vienna)", type: "community", description: "Official Jewish community of Vienna.", website: "https://www.ikg-wien.at/", individuals: [] });
addEntry("Austria", { name: "Jewish Museum Vienna", type: "museum", description: "Museum of Jewish history in Vienna.", website: "https://www.jmw.at/", individuals: [] });

// NETHERLANDS
addEntry("Netherlands", { name: "NIK (Nederlands-Israëlitisch Kerkgenootschap)", type: "religious body", description: "Ashkenazi Jewish community organization in the Netherlands.", website: "", individuals: [] });
addEntry("Netherlands", { name: "Anne Frank House", type: "museum", description: "Museum dedicated to the Jewish wartime diarist Anne Frank.", website: "https://www.annefrank.org/", individuals: [] });
addEntry("Netherlands", { name: "Portuguese Synagogue of Amsterdam", type: "synagogue", description: "Historic 17th-century Sephardic synagogue in Amsterdam.", website: "https://portuguese-synagogue.com/", individuals: [] });
addEntry("Netherlands", { name: "Jewish Historical Museum (Amsterdam)", type: "museum", description: "Museum of Jewish history and culture in Amsterdam.", website: "https://jck.nl/", individuals: [] });

// BELGIUM
addEntry("Belgium", { name: "Coordinating Committee of Jewish Organisations in Belgium (CCOJB)", type: "representative body", description: "Umbrella body of Belgian Jewish organizations.", website: "", individuals: [] });
addEntry("Belgium", { name: "Antwerp Diamond District", type: "business district", description: "Global center of diamond trade, historically dominated by Orthodox Jewish traders.", website: "", individuals: [] });

// SWITZERLAND
addEntry("Switzerland", { name: "Swiss Federation of Jewish Communities (SIG/FSCI)", type: "representative body", description: "Umbrella organization of Swiss Jewish communities.", website: "https://www.swissjews.ch/", individuals: [] });
addEntry("Switzerland", { name: "World Jewish Congress (headquarters)", type: "international organization", description: "International federation of Jewish communities, headquartered in New York. Major office in Geneva.", website: "https://www.worldjewishcongress.org/", individuals: [{ name: "Ronald Lauder", role: "President", bio: "President of the World Jewish Congress." }] });

// ITALY
addEntry("Italy", { name: "Union of Italian Jewish Communities (UCEI)", type: "representative body", description: "Representative body of Jewish communities in Italy.", website: "https://www.ucei.it/", individuals: [] });
addEntry("Italy", { name: "Jewish Museum of Rome", type: "museum", description: "Museum in the historic Jewish Ghetto of Rome.", website: "", individuals: [] });
addEntry("Italy", { name: "Great Synagogue of Rome", type: "synagogue", description: "Major synagogue in Rome, built 1904.", website: "", individuals: [] });

// SPAIN
addEntry("Spain", { name: "Federation of Jewish Communities of Spain", type: "representative body", description: "Representative organization of Jewish communities in Spain.", website: "", individuals: [] });
addEntry("Spain", { name: "Museum of Sephardic Heritage (Toledo)", type: "museum", description: "Museum dedicated to Spain's Sephardic Jewish heritage.", website: "", individuals: [] });

// POLAND
addEntry("Poland", { name: "Union of Jewish Communities in Poland", type: "representative body", description: "Religious union of Jewish communities in Poland.", website: "", individuals: [{ name: "Michael Schudrich", role: "Chief Rabbi of Poland", bio: "Chief Rabbi of Poland since 2004." }] });
addEntry("Poland", { name: "POLIN Museum of the History of Polish Jews", type: "museum", description: "Museum in Warsaw dedicated to the history of Polish Jews.", website: "https://www.polin.pl/", individuals: [] });
addEntry("Poland", { name: "Auschwitz-Birkenau Memorial and Museum", type: "memorial/museum", description: "Memorial and museum at the site of the largest Nazi concentration and extermination camp.", website: "https://www.auschwitz.org/", individuals: [] });
addEntry("Poland", { name: "Jewish Community Centre of Krakow (JCC Kraków)", type: "community center", description: "Jewish community center in the historic Jewish quarter of Krakow.", website: "https://www.jcckrakow.org/", individuals: [] });

// CZECH REPUBLIC
addEntry("Czech Republic", { name: "Federation of Jewish Communities in the Czech Republic", type: "representative body", description: "Umbrella organization for Czech Jewish communities.", website: "", individuals: [] });
addEntry("Czech Republic", { name: "Jewish Museum in Prague", type: "museum", description: "One of the oldest Jewish museums in the world, founded 1906.", website: "https://www.jewishmuseum.cz/", individuals: [] });

// UKRAINE
addEntry("Ukraine", { name: "Jewish Confederation of Ukraine", type: "umbrella organization", description: "Association of Jewish organizations in Ukraine.", website: "", individuals: [] });
addEntry("Ukraine", { name: "Babyn Yar Holocaust Memorial Center", type: "memorial", description: "Memorial at the site of one of the largest mass shootings of the Holocaust.", website: "https://babynyar.org/", individuals: [] });
addEntry("Ukraine", { name: "United Jewish Community of Ukraine", type: "community organization", description: "Major Jewish communal body in Ukraine.", website: "", individuals: [] });

// TURKEY
addEntry("Turkey", { name: "Quincentennial Foundation Museum (Istanbul)", type: "museum", description: "Museum celebrating 500 years of Jewish life in Turkey.", website: "", individuals: [] });
addEntry("Turkey", { name: "Chief Rabbinate of Turkey", type: "religious authority", description: "Office of the Chief Rabbi of Turkey.", website: "", individuals: [] });

// MOROCCO
addEntry("Morocco", { name: "Council of Jewish Communities of Morocco", type: "representative body", description: "Organization representing Jewish communities in Morocco.", website: "", individuals: [] });
addEntry("Morocco", { name: "Museum of Moroccan Judaism (Casablanca)", type: "museum", description: "The only Jewish museum in the Arab world.", website: "", individuals: [] });

// IRAN
addEntry("Iran", { name: "Tehran Jewish Committee", type: "community organization", description: "Organization of the Jewish community in Tehran, Iran's largest Jewish community.", website: "", individuals: [] });

// ETHIOPIA
addEntry("Ethiopia", { name: "Beta Israel Community Organizations", type: "community", description: "Organizations serving the Beta Israel (Ethiopian Jewish) community.", website: "", individuals: [] });

// JAPAN
addEntry("Japan", { name: "Jewish Community of Japan", type: "community", description: "Small but organized Jewish community in Tokyo and other cities.", website: "https://www.jccjapan.or.jp/", individuals: [] });

// CHINA
addEntry("China", { name: "Shanghai Jewish Refugees Museum", type: "museum", description: "Museum commemorating the Jewish refugees who found haven in Shanghai during WWII.", website: "", individuals: [] });
addEntry("China", { name: "Kaifeng Jewish Community", type: "historic community", description: "Descendants of one of China's oldest Jewish communities.", website: "", individuals: [] });

// SINGAPORE
addEntry("Singapore", { name: "United Hebrew Congregation of Singapore", type: "synagogue", description: "Main Jewish congregation in Singapore.", website: "", individuals: [] });

// PANAMA
addEntry("Panama", { name: "Kol Shearith Israel", type: "synagogue/community", description: "Oldest synagogue and Jewish community in Panama.", website: "", individuals: [] });

// URUGUAY
addEntry("Uruguay", { name: "Comité Central Israelita del Uruguay", type: "representative body", description: "Central representative body of the Jewish community of Uruguay.", website: "", individuals: [] });

// CHILE
addEntry("Chile", { name: "Comunidad Judía de Chile", type: "community organization", description: "Jewish community organization of Chile.", website: "", individuals: [] });

// COLOMBIA
addEntry("Colombia", { name: "Confederación de Comunidades Judías de Colombia", type: "umbrella organization", description: "Federation of Jewish communities in Colombia.", website: "", individuals: [] });

// NEW ZEALAND
addEntry("New Zealand", { name: "New Zealand Jewish Council", type: "representative body", description: "Representative body of the New Zealand Jewish community.", website: "", individuals: [] });

// SWEDEN
addEntry("Sweden", { name: "Official Council of Swedish Jewish Communities", type: "representative body", description: "Representative body of Sweden's Jewish communities.", website: "", individuals: [] });
addEntry("Sweden", { name: "Jewish Museum Stockholm", type: "museum", description: "Museum of Jewish history and culture in Stockholm.", website: "", individuals: [] });

// DENMARK
addEntry("Denmark", { name: "Jewish Community of Denmark", type: "community", description: "One of the oldest Jewish communities in Scandinavia.", website: "", individuals: [] });
addEntry("Denmark", { name: "Great Synagogue of Copenhagen", type: "synagogue", description: "Historic synagogue in Copenhagen, built 1833.", website: "", individuals: [] });

// NORWAY
addEntry("Norway", { name: "Jewish Community of Oslo", type: "community", description: "Norway's largest Jewish community.", website: "", individuals: [] });
addEntry("Norway", { name: "Jewish Museum Trondheim", type: "museum", description: "Museum housed in a historic synagogue.", website: "", individuals: [] });

// FINLAND
addEntry("Finland", { name: "Central Council of Jewish Communities in Finland", type: "representative body", description: "Central body of Finnish Jewish communities.", website: "", individuals: [] });

// GREECE
addEntry("Greece", { name: "Central Board of Jewish Communities in Greece", type: "representative body", description: "Umbrella body of Greek Jewish communities.", website: "", individuals: [] });
addEntry("Greece", { name: "Jewish Museum of Greece", type: "museum", description: "Museum dedicated to Greek Jewry in Athens.", website: "", individuals: [] });
addEntry("Greece", { name: "Jewish Museum of Thessaloniki", type: "museum", description: "Museum documenting the Sephardic Jewish heritage of Thessaloniki.", website: "", individuals: [] });

// ROMANIA
addEntry("Romania", { name: "Federation of Jewish Communities in Romania", type: "representative body", description: "Organization of Romania's Jewish communities.", website: "", individuals: [] });

// HONG KONG
addEntry("Hong Kong", { name: "Jewish Historical Society of Hong Kong", type: "historical society", description: "Preserves and promotes Jewish heritage in Hong Kong.", website: "", individuals: [] });
addEntry("Hong Kong", { name: "Ohel Leah Synagogue", type: "synagogue", description: "Historic synagogue in Hong Kong built in 1901.", website: "", individuals: [] });

// CUBA
addEntry("Cuba", { name: "Patronato de la Casa de la Comunidad Hebrea de Cuba", type: "community center", description: "Main Jewish community center in Havana.", website: "", individuals: [] });

// KENYA
addEntry("Kenya", { name: "Nairobi Hebrew Congregation", type: "synagogue/community", description: "Jewish congregation serving Nairobi, Kenya.", website: "", individuals: [] });

// UAE
addEntry("United Arab Emirates", { name: "Jewish Community of the UAE", type: "community", description: "Growing Jewish community following the Abraham Accords.", website: "", individuals: [] });
addEntry("United Arab Emirates", { name: "Association of Gulf Jewish Communities (AGJC)", type: "community organization", description: "Organization coordinating Jewish life in the Gulf states.", website: "", individuals: [{ name: "Rabbi Yehuda Sarna", role: "Chief Rabbi of the UAE", bio: "Chief Rabbi of the Association of Gulf Jewish Communities." }] });

// BAHRAIN
addEntry("Bahrain", { name: "Jewish Community of Bahrain", type: "community", description: "Historic Jewish community of Bahrain, one of the few remaining in the Gulf.", website: "", individuals: [] });

// ============================================================
// Write files
// ============================================================

const jewishFile = path.join(__dirname, '..', 'data', 'jewish.json');
const peopleFile = path.join(__dirname, '..', 'data', 'people.json');

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));

// Summary
const countryCount = Object.keys(data.countries).length;
const entryCount = Object.values(data.countries).reduce((s, entries) => s + entries.length, 0);
const personCount = Object.keys(people.people).length;
console.log(`Done! Wrote ${entryCount} entries across ${countryCount} countries, and ${personCount} people.`);
console.log('Countries:', Object.keys(data.countries).join(', '));
