// Massive expansion script 4 - Even more entries, focusing on gaps and adding connections
// Run: node scripts/expandData4.js

const fs = require('fs');
const path = require('path');

const jewishFile = path.join(__dirname, '..', 'data', 'jewish.json');
const peopleFile = path.join(__dirname, '..', 'data', 'people.json');

const data = JSON.parse(fs.readFileSync(jewishFile, 'utf8'));
const people = JSON.parse(fs.readFileSync(peopleFile, 'utf8'));

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const existingIds = new Set();
for (const country of Object.values(data.countries)) {
  for (const entry of country) existingIds.add(entry.id);
}
let added = 0;

function addEntry(country, entry) {
  if (!data.countries[country]) data.countries[country] = [];
  entry.id = slugify(entry.name);
  if (existingIds.has(entry.id)) return;
  existingIds.add(entry.id);
  if (!entry.individuals) entry.individuals = [];
  if (!entry.connections) entry.connections = [];
  entry.individuals.forEach(ind => {
    const pid = slugify(ind.name);
    ind.id = pid;
    if (!people.people[pid]) {
      people.people[pid] = { name: ind.name, bio: ind.bio || '', notes: '' };
    }
  });
  data.countries[country].push(entry);
  added++;
}

// ============================================================
// MORE UNITED STATES
// ============================================================

// Media & Entertainment
addEntry("United States", { name: "Warner Bros. Discovery", type: "entertainment conglomerate", category: "Entertainment & Media", founded: 1923, description: "Major entertainment conglomerate formed from the 2022 merger of WarnerMedia and Discovery. Includes Warner Bros. Pictures, HBO, CNN, Discovery Channel, and DC Comics. Revenue exceeds $41 billion.", website: "https://wbd.com/", individuals: [{ name: "David Zaslav", role: "CEO", bio: "American media executive and CEO of Warner Bros. Discovery." }], connections: [] });
addEntry("United States", { name: "Paramount Global", type: "entertainment conglomerate", category: "Entertainment & Media", founded: 1912, description: "American media and entertainment conglomerate. Owns Paramount Pictures, CBS, Nickelodeon, MTV, and Paramount+. Originally founded by Adolph Zukor, a Hungarian Jewish immigrant.", individuals: [{ name: "Adolph Zukor", role: "Founder (1873-1976)", bio: "Hungarian-born Jewish immigrant who founded Paramount Pictures and lived to age 103." }, { name: "Shari Redstone", role: "Chair", bio: "American media executive and controlling shareholder of Paramount Global." }], connections: [] });
addEntry("United States", { name: "NBCUniversal", type: "entertainment conglomerate", category: "Entertainment & Media", founded: 1926, description: "American media and entertainment conglomerate owned by Comcast. Includes NBC, Universal Pictures, DreamWorks Animation, and Universal Parks. Revenue exceeds $35 billion.", individuals: [], connections: [] });
addEntry("United States", { name: "Walt Disney Company", type: "entertainment conglomerate", category: "Entertainment & Media", founded: 1923, description: "Multinational entertainment and media conglomerate. Includes Disney Parks, Marvel, Lucasfilm, Pixar, ESPN, and Hulu. The highest-grossing media conglomerate by revenue.", website: "https://www.thewaltdisneycompany.com/", individuals: [{ name: "Bob Iger", role: "CEO", bio: "American businessman and CEO of The Walt Disney Company, of Jewish and Irish descent." }], connections: [] });
addEntry("United States", { name: "Comcast Corporation", type: "telecommunications conglomerate", category: "Telecommunications", founded: 1963, description: "Largest broadcasting and cable television company in the world by revenue. Owns NBCUniversal, Sky, Xfinity. Revenue exceeds $120 billion. Founded by Ralph Roberts.", individuals: [{ name: "Brian Roberts", role: "Chairman & CEO", bio: "American billionaire businessman, chairman and CEO of Comcast, son of founder Ralph Roberts." }], connections: [] });
addEntry("United States", { name: "ViacomCBS (now Paramount)", type: "media conglomerate", category: "Entertainment & Media", founded: 1971, description: "Media company founded by Sumner Redstone. Built a media empire including Viacom, CBS, and Paramount. The Redstone family maintained controlling interest.", individuals: [{ name: "Sumner Redstone", role: "Founder (1923-2020)", bio: "American media magnate who built one of the largest media empires in the world." }], connections: [] });
addEntry("United States", { name: "CAA (Creative Artists Agency)", type: "talent agency", category: "Entertainment & Media", founded: 1975, description: "Leading entertainment and sports agency representing top talent worldwide. Co-founded by Michael Ovitz. Has expanded into sports, finance, and technology ventures.", individuals: [{ name: "Michael Ovitz", role: "Co-founder", bio: "American talent agent and co-founder of CAA, once called the most powerful person in Hollywood." }], connections: [] });
addEntry("United States", { name: "WME (William Morris Endeavor)", type: "talent agency", category: "Entertainment & Media", founded: 1898, description: "Major talent agency representing actors, directors, musicians, writers, and athletes. Parent company is Endeavor Group Holdings. The William Morris Agency was founded by William Morris, a German Jewish immigrant.", individuals: [{ name: "Ari Emanuel", role: "CEO (Endeavor)", bio: "Israeli-American talent agent and CEO of Endeavor, brother of former Chicago mayor Rahm Emanuel." }], connections: [] });

// Finance & Investment
addEntry("United States", { name: "Goldman Sachs", type: "investment bank", category: "Banking & Financial Services", founded: 1869, description: "Leading global investment bank, securities, and investment management firm. Founded by Marcus Goldman, a Bavarian Jewish immigrant. One of the most prestigious financial institutions in the world. Revenue exceeds $45 billion.", website: "https://www.goldmansachs.com/", individuals: [{ name: "Marcus Goldman", role: "Founder (1821-1904)", bio: "Bavarian-born Jewish immigrant who founded Goldman Sachs from a one-room office in Manhattan." }, { name: "David Solomon", role: "CEO", bio: "CEO of Goldman Sachs since 2018, also a part-time DJ known as D-Sol." }], connections: [] });
addEntry("United States", { name: "JPMorgan Chase", type: "bank", category: "Banking & Financial Services", founded: 1799, description: "Largest bank in the United States and one of the world's most important financial institutions. Total assets exceed $3.7 trillion. Employs over 290,000 people worldwide.", website: "https://www.jpmorganchase.com/", individuals: [{ name: "Jamie Dimon", role: "Chairman & CEO", bio: "American billionaire businessman of Greek descent. Chairman and CEO of JPMorgan Chase." }], connections: [] });
addEntry("United States", { name: "Morgan Stanley", type: "investment bank", category: "Banking & Financial Services", founded: 1935, description: "Leading global financial services firm providing investment banking, securities, wealth management, and investment management. Revenue exceeds $50 billion.", website: "https://www.morganstanley.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Lazard", type: "financial advisory firm", category: "Banking & Financial Services", founded: 1848, description: "Financial advisory and asset management firm. Founded by the Lazard brothers, French-Jewish immigrants. One of the world's most prestigious M&A advisory firms.", individuals: [], connections: [] });
addEntry("United States", { name: "Two Sigma Investments", type: "hedge fund", category: "Investment & Private Equity", founded: 2001, description: "Quantitative hedge fund based in New York managing over $60 billion. Uses machine learning, distributed computing, and big data for trading strategies.", individuals: [{ name: "David Siegel", role: "Co-founder", bio: "American billionaire computer scientist who co-founded Two Sigma." }], connections: [] });
addEntry("United States", { name: "Bridgewater Associates", type: "hedge fund", category: "Investment & Private Equity", founded: 1975, description: "World's largest hedge fund, managing approximately $150 billion. Founded by Ray Dalio from his apartment. Known for its distinctive culture of 'radical transparency.'", individuals: [{ name: "Ray Dalio", role: "Founder", bio: "American billionaire investor and founder of Bridgewater Associates, author of 'Principles.'" }], connections: [] });
addEntry("United States", { name: "Warburg Pincus", type: "private equity firm", category: "Investment & Private Equity", founded: 1966, description: "Global private equity firm managing over $83 billion across 275+ companies. Named after the Warburg banking family.", individuals: [], connections: [] });
addEntry("United States", { name: "Cerberus Capital Management", type: "private equity firm", category: "Investment & Private Equity", founded: 1992, description: "Private investment firm managing over $55 billion in assets. Known for acquiring Chrysler, Albertsons, and other major companies. Founded by Stephen Feinberg.", individuals: [{ name: "Stephen Feinberg", role: "Co-founder & CEO", bio: "American billionaire private equity investor." }], connections: [] });

// Tech companies
addEntry("United States", { name: "Nvidia", type: "technology company", category: "Technology", founded: 1993, description: "American technology company and the most valuable company in the world by market cap (exceeding $3 trillion). Dominates the GPU and AI chip market. Founded by Jensen Huang.", website: "https://www.nvidia.com/", individuals: [{ name: "Jensen Huang", role: "Co-founder & CEO", bio: "Taiwanese-American billionaire and co-founder of Nvidia." }], connections: [] });
addEntry("United States", { name: "Stripe", type: "fintech company", category: "Technology", founded: 2010, description: "Financial technology company that builds economic infrastructure for the internet. Valued at $65 billion. Founded by Irish brothers Patrick and John Collison.", website: "https://stripe.com/", individuals: [{ name: "Patrick Collison", role: "Co-founder & CEO", bio: "Irish billionaire who co-founded Stripe at age 21." }], connections: [] });
addEntry("United States", { name: "Zoom Video Communications", type: "technology company", category: "Technology", founded: 2011, description: "Video communications platform that became essential during the COVID-19 pandemic. Revenue exceeds $4.5 billion.", website: "https://zoom.us/", individuals: [{ name: "Eric Yuan", role: "Founder & CEO", bio: "Chinese-American billionaire who founded Zoom after moving to the US." }], connections: [] });
addEntry("United States", { name: "Slack Technologies", type: "technology company", category: "Technology", founded: 2009, description: "Business communication platform acquired by Salesforce for $27.7 billion in 2021. Created by Stewart Butterfield.", individuals: [{ name: "Stewart Butterfield", role: "Co-founder", bio: "Canadian-American tech entrepreneur who co-founded both Flickr and Slack." }], connections: [] });
addEntry("United States", { name: "Databricks", type: "technology company", category: "Technology", founded: 2013, description: "Unified analytics platform for data engineering, data science, and AI. Valued at over $43 billion. Founded by the creators of Apache Spark.", individuals: [], connections: [] });
addEntry("United States", { name: "SpaceX", type: "aerospace company", category: "Transportation", founded: 2002, description: "American spacecraft manufacturer and space launch provider. Founded by Elon Musk. First private company to send astronauts to the ISS. Developing Starship for Mars missions. Valued at over $180 billion.", individuals: [{ name: "Elon Musk", role: "Founder & CEO", bio: "South African-born American billionaire, founder of SpaceX, CEO of Tesla, and one of the wealthiest people in history." }], connections: [] });
addEntry("United States", { name: "Tesla", type: "electric vehicle company", category: "Manufacturing & Industry", founded: 2003, description: "Electric vehicle and clean energy company. Under Elon Musk's leadership became the world's most valuable automaker. Market cap exceeds $800 billion.", website: "https://www.tesla.com/", individuals: [], connections: [] });

// Real Estate & Construction
addEntry("United States", { name: "Mack Real Estate Group", type: "real estate", category: "Real Estate & Property", founded: 1960, description: "Leading New York real estate company headed by the Mack family. Major developer and investor in commercial properties.", individuals: [{ name: "William Mack", role: "Founder & Chairman", bio: "American real estate developer and philanthropist." }], connections: [] });
addEntry("United States", { name: "Brookfield Properties", type: "real estate", category: "Real Estate & Property", founded: 1923, description: "One of the largest real estate services companies in the world. Manages over $260 billion in real estate assets including Brookfield Place in Manhattan.", individuals: [], connections: [] });

// Healthcare
addEntry("United States", { name: "Mount Sinai Health System", type: "hospital system", category: "Healthcare & Pharmaceuticals", founded: 1852, description: "Major academic health system in New York City encompassing eight hospitals. Founded by Jews initially excluded from other hospitals. Icahn School of Medicine at Mount Sinai is a top research institution.", website: "https://www.mountsinai.org/", individuals: [], connections: [] });
addEntry("United States", { name: "Cedars-Sinai Medical Center", type: "hospital", category: "Healthcare & Pharmaceuticals", founded: 1902, description: "Nonprofit academic healthcare organization and hospital in Los Angeles. One of the largest hospitals in the western United States. Formed from the merger of two Jewish hospitals.", website: "https://www.cedars-sinai.org/", individuals: [], connections: [] });
addEntry("United States", { name: "Regeneron Pharmaceuticals", type: "biotechnology company", category: "Healthcare & Pharmaceuticals", founded: 1988, description: "Biotechnology company specializing in drug discovery and development. Co-founded by Leonard Schleifer and George Yancopoulos. Known for Dupixent and COVID antibody treatments. Revenue exceeds $13 billion.", website: "https://www.regeneron.com/", individuals: [{ name: "Leonard Schleifer", role: "Co-founder & CEO", bio: "American billionaire physician-scientist and co-founder of Regeneron." }], connections: [] });

// Education & Think Tanks
addEntry("United States", { name: "Brookings Institution", type: "think tank", category: "Research & Think Tanks", founded: 1916, description: "American research group conducting research in economics, governance, foreign policy, and global economy. One of the oldest and most influential think tanks in the world.", website: "https://www.brookings.edu/", individuals: [], connections: [] });
addEntry("United States", { name: "RAND Corporation", type: "think tank", category: "Research & Think Tanks", founded: 1948, description: "American global policy think tank. Originally formed by Douglas Aircraft Company to offer research and analysis to the US Armed Forces. Non-partisan research organization.", website: "https://www.rand.org/", individuals: [], connections: [] });
addEntry("United States", { name: "Council on Foreign Relations (CFR)", type: "think tank", category: "Research & Think Tanks", founded: 1921, description: "Independent, nonpartisan think tank specializing in US foreign policy and international affairs. Publishes Foreign Affairs magazine. Membership of approximately 5,000.", website: "https://www.cfr.org/", individuals: [], connections: [] });
addEntry("United States", { name: "Brandeis University", type: "university", category: "Education & Academia", founded: 1948, description: "Private research university in Waltham, Massachusetts. Named after Supreme Court Justice Louis Brandeis, the first Jewish justice. Founded by the American Jewish community as a non-sectarian alternative to Ivy League schools.", website: "https://www.brandeis.edu/", individuals: [{ name: "Louis Brandeis", role: "Namesake (1856-1941)", bio: "First Jewish Justice of the US Supreme Court, served 1916-1939. Pioneer of the right to privacy." }], connections: [] });
addEntry("United States", { name: "Hillel International", type: "student organization", category: "Education & Academia", founded: 1923, description: "Largest Jewish student organization in the world, operating on over 850 college campuses with a reach of 200,000+ students. Named after Rabbi Hillel.", website: "https://www.hillel.org/", individuals: [], connections: [] });

// Law Firms
addEntry("United States", { name: "Sullivan & Cromwell", type: "law firm", category: "Law Firms", founded: 1879, description: "Elite Wall Street law firm known for corporate M&A, securities, and financial services law. One of the most prestigious law firms in the world.", website: "https://www.sullcrom.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Kirkland & Ellis", type: "law firm", category: "Law Firms", founded: 1909, description: "Largest law firm in the world by revenue (exceeding $7 billion). Known for private equity, restructuring, and intellectual property law. Headquartered in Chicago.", website: "https://www.kirkland.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Davis Polk & Wardwell", type: "law firm", category: "Law Firms", founded: 1849, description: "Prominent New York law firm specializing in corporate law, banking, and litigation. One of the oldest continuously operating law firms on Wall Street.", website: "https://www.davispolk.com/", individuals: [], connections: [] });

// Sports
addEntry("United States", { name: "New England Patriots", type: "sports team", category: "Sports", founded: 1960, description: "NFL franchise owned by Robert Kraft since 1994. Six-time Super Bowl champions under Kraft's ownership. Based in Foxborough, Massachusetts.", individuals: [{ name: "Robert Kraft", role: "Owner", bio: "American billionaire businessman who has owned the New England Patriots since 1994." }], connections: [] });
addEntry("United States", { name: "Los Angeles Clippers", type: "sports team", category: "Sports", founded: 1970, description: "NBA franchise owned by Steve Ballmer since 2014 (purchased for $2 billion). Previously owned by Donald Sterling.", individuals: [{ name: "Steve Ballmer", role: "Owner", bio: "Former Microsoft CEO who purchased the LA Clippers for $2 billion." }], connections: [] });
addEntry("United States", { name: "Golden State Warriors", type: "sports team", category: "Sports", founded: 1946, description: "NBA franchise owned by Joe Lacob since 2010. Won four NBA championships under Lacob's ownership. Based in San Francisco.", individuals: [{ name: "Joe Lacob", role: "Co-owner & Governor", bio: "American billionaire venture capitalist who co-owns the Golden State Warriors." }], connections: [] });
addEntry("United States", { name: "Brooklyn Nets", type: "sports team", category: "Sports", founded: 1967, description: "NBA franchise based in Brooklyn, New York. Plays at Barclays Center. Owned by Joe Tsai, co-founder of Alibaba.", individuals: [{ name: "Joe Tsai", role: "Owner", bio: "Taiwanese-Canadian billionaire, co-founder of Alibaba, owner of the Brooklyn Nets." }], connections: [] });

// Food & Beverage
addEntry("United States", { name: "Kraft Heinz Company", type: "food company", category: "Food & Beverage", founded: 2015, description: "Fifth-largest food and beverage company in the world. Formed from the merger of Kraft Foods and H.J. Heinz Company, backed by Berkshire Hathaway and 3G Capital. Brands include Kraft, Heinz, Oscar Mayer, and Philadelphia.", website: "https://www.kraftheinzcompany.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Stonyfield Farm", type: "organic food company", category: "Food & Beverage", founded: 1983, description: "Leading organic yogurt brand in the United States. Founded by Gary Hirshberg and Samuel Kaymen. Pioneer of organic and sustainable business practices.", individuals: [{ name: "Gary Hirshberg", role: "Co-founder", bio: "American businessman dubbed the 'CE-Yo' who grew Stonyfield into a major organic brand." }], connections: [] });

// Energy
addEntry("United States", { name: "NextEra Energy", type: "energy company", category: "Utilities & Energy", founded: 1925, description: "World's largest generator of renewable energy from wind and sun. Headquartered in Juno Beach, Florida. Market cap exceeds $150 billion.", website: "https://www.nexteraenergy.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Cheniere Energy", type: "energy company", category: "Utilities & Energy", founded: 1996, description: "Leading producer and exporter of liquefied natural gas (LNG) in the United States. Operates the Sabine Pass and Corpus Christi LNG terminals.", website: "https://www.cheniere.com/", individuals: [], connections: [] });

// ============================================================
// MORE ISRAEL
// ============================================================

addEntry("Israel", { name: "Technion – Israel Institute of Technology", type: "university", category: "Education & Academia", founded: 1912, description: "Israel's oldest university and a world-renowned research institution in Haifa. Known as 'Israel's MIT.' Has produced three Nobel laureates. Graduates have built much of Israel's infrastructure and tech industry.", website: "https://www.technion.ac.il/", individuals: [], connections: [] });
addEntry("Israel", { name: "Hebrew University of Jerusalem", type: "university", category: "Education & Academia", founded: 1918, description: "Israel's second-oldest university, founded by Albert Einstein, Sigmund Freud, and Martin Buber among others. One of the most important research universities in the world.", website: "https://www.huji.ac.il/", individuals: [{ name: "Albert Einstein", role: "Founding Board (1879-1955)", bio: "German-born physicist who developed the theory of relativity. Founding member of Hebrew University's board." }], connections: [] });
addEntry("Israel", { name: "Tel Aviv University", type: "university", category: "Education & Academia", founded: 1956, description: "Israel's largest university with over 30,000 students. Major research university with nine faculties. Located in the Ramat Aviv neighborhood of Tel Aviv.", website: "https://www.tau.ac.il/", individuals: [], connections: [] });
addEntry("Israel", { name: "Ben-Gurion University of the Negev", type: "university", category: "Education & Academia", founded: 1969, description: "Research university in Be'er Sheva, Israel's Negev desert. Named after David Ben-Gurion. Known for pioneering desert agriculture, water desalination, and solar energy research.", website: "https://in.bgu.ac.il/", individuals: [], connections: [] });
addEntry("Israel", { name: "Israel Philharmonic Orchestra", type: "orchestra", category: "Culture & Arts", founded: 1936, description: "Founded by Polish-Jewish violinist Bronisław Huberman, who recruited top musicians from European orchestras. Known for its world-class performances. Leonard Bernstein was a frequent conductor.", individuals: [{ name: "Bronisław Huberman", role: "Founder (1882-1947)", bio: "Polish-Jewish violinist who saved dozens of Jewish musicians by recruiting them for the Palestine Philharmonic." }], connections: [] });
addEntry("Israel", { name: "Habima Theatre", type: "theater", category: "Culture & Arts", founded: 1917, description: "Israel's national theater, originally founded in Moscow. The world's first Hebrew-language theater. Located in Tel Aviv's Habima Square.", individuals: [], connections: [] });
addEntry("Israel", { name: "Israel Electric Corporation", type: "utility company", category: "Utilities & Energy", founded: 1923, description: "Israel's largest electricity supplier, generating virtually all of the country's electrical power. Government-owned company.", individuals: [], connections: [] });
addEntry("Israel", { name: "Bezeq", type: "telecommunications company", category: "Telecommunications", founded: 1984, description: "Israel's largest telecommunications company. Provides landline, mobile (Pelephone), internet (Bezeq International), and satellite TV (yes) services.", website: "https://www.bezeq.co.il/", individuals: [], connections: [] });
addEntry("Israel", { name: "El Al Israel Airlines", type: "airline", category: "Transportation", founded: 1948, description: "Flag carrier airline of Israel, founded just months after the state. Known for strict security protocols. Operates flights to destinations across Europe, Asia, Africa, and the Americas.", website: "https://www.elal.com/", individuals: [], connections: [] });
addEntry("Israel", { name: "ZIM Integrated Shipping Services", type: "shipping company", category: "Transportation", founded: 1945, description: "Israeli international cargo shipping company, one of the top 20 container carriers worldwide. Founded three years before Israeli independence.", website: "https://www.zim.com/", individuals: [], connections: [] });
addEntry("Israel", { name: "Israel Chemicals (ICL)", type: "chemical company", category: "Manufacturing & Industry", founded: 1968, description: "Global specialty minerals and chemicals company. Major producer of potash, bromine, and phosphates. Extracts minerals from the Dead Sea.", website: "https://www.icl-group.com/", individuals: [], connections: [] });
addEntry("Israel", { name: "Delek Group", type: "energy conglomerate", category: "Utilities & Energy", founded: 1951, description: "Israeli conglomerate with key interests in oil and gas exploration and production. Instrumental in developing Israel's major offshore gas fields (Leviathan, Tamar).", individuals: [{ name: "Yitzhak Tshuva", role: "Owner", bio: "Israeli billionaire businessman and owner of the Delek Group." }], connections: [] });
addEntry("Israel", { name: "Partner Communications", type: "telecommunications company", category: "Telecommunications", founded: 1998, description: "Israeli telecommunications provider (Orange Israel). Major mobile operator and ISP serving millions of subscribers.", individuals: [], connections: [] });
addEntry("Israel", { name: "Sheba Medical Center", type: "hospital", category: "Healthcare & Pharmaceuticals", founded: 1948, description: "Largest and most comprehensive medical center in the Middle East, located in Tel HaShomer. Ranked among the top 10 hospitals in the world by Newsweek.", individuals: [], connections: [] });
addEntry("Israel", { name: "Hadassah Medical Center", type: "hospital", category: "Healthcare & Pharmaceuticals", founded: 1938, description: "Leading research hospital in Jerusalem with two campuses. Includes the famous Chagall Windows donated by Marc Chagall. Treats patients regardless of nationality.", individuals: [], connections: [] });
addEntry("Israel", { name: "CyberArk", type: "cybersecurity company", category: "Technology", founded: 1999, description: "Israeli cybersecurity company specializing in identity security and privileged access management. Listed on NASDAQ with market cap exceeding $12 billion.", website: "https://www.cyberark.com/", individuals: [{ name: "Udi Mokady", role: "Co-founder & Executive Chairman", bio: "Israeli entrepreneur who co-founded CyberArk." }], connections: [] });
addEntry("Israel", { name: "Nice Ltd", type: "technology company", category: "Technology", founded: 1986, description: "Israeli technology company specializing in cloud and AI-based analytics for contact centers. Revenue exceeds $2 billion.", website: "https://www.nice.com/", individuals: [], connections: [] });
addEntry("Israel", { name: "Playtika", type: "gaming company", category: "Entertainment & Media", founded: 2010, description: "Israeli digital entertainment company developing mobile games. Acquired by a Chinese consortium for $4.4 billion, later went public on NASDAQ.", individuals: [], connections: [] });

// ============================================================
// MORE UNITED KINGDOM
// ============================================================

addEntry("United Kingdom", { name: "Community Security Trust (CST)", type: "security organization", category: "Defense & Security", founded: 1994, description: "Charity providing security, training, and advice to the Jewish community in the UK. Monitors antisemitic incidents and provides physical security for Jewish schools and institutions.", website: "https://cst.org.uk/", individuals: [], connections: [] });
addEntry("United Kingdom", { name: "World ORT", type: "educational organization", category: "Education & Academia", founded: 1880, description: "International educational organization headquartered in London. Founded to provide vocational training for Jews in the Russian Empire. Now operates in over 30 countries educating over 200,000 students. ORT stands for Obshchestvo Remeslenogo Truda.", website: "https://www.ort.org/", individuals: [], connections: [] });
addEntry("United Kingdom", { name: "JW3", type: "community center", category: "Culture & Arts", founded: 2013, description: "Jewish community center in Finchley Road, London. Houses a cinema, theater, gallery, restaurant, and extensive program of arts, culture, and learning events.", website: "https://www.jw3.org.uk/", individuals: [], connections: [] });
addEntry("United Kingdom", { name: "ARM Holdings", type: "technology company", category: "Technology", founded: 1990, description: "British semiconductor and software design company. ARM chip designs are used in over 95% of the world's smartphones. Owned by SoftBank Group (Japan). IPO in 2023 valued the company at over $65 billion.", website: "https://www.arm.com/", individuals: [], connections: [] });
addEntry("United Kingdom", { name: "HSBC Holdings", type: "bank", category: "Banking & Financial Services", founded: 1865, description: "One of the world's largest banking and financial services organizations. Headquartered in London. Total assets exceed $2.9 trillion. Operates in 63 countries.", website: "https://www.hsbc.com/", individuals: [], connections: [] });
addEntry("United Kingdom", { name: "Barclays", type: "bank", category: "Banking & Financial Services", founded: 1690, description: "British multinational universal bank. One of the oldest banks in the world. Major investment bank and provider of retail and corporate banking services.", website: "https://www.barclays.co.uk/", individuals: [], connections: [] });
addEntry("United Kingdom", { name: "Tottenham Hotspur F.C.", type: "sports club", category: "Sports", founded: 1882, description: "Professional football club in North London with deep historical ties to the Jewish community. Based in the traditionally Jewish area of Tottenham. Owned by ENIC Group (Joe Lewis/Daniel Levy).", individuals: [{ name: "Daniel Levy", role: "Chairman", bio: "British businessman and chairman of Tottenham Hotspur since 2001." }], connections: [] });

// ============================================================
// EASTERN EUROPE & CENTRAL ASIA
// ============================================================

addEntry("Lithuania", { name: "Lithuanian Jewish Community (LJC)", type: "community organization", category: "Representative & Umbrella Bodies", founded: 1989, description: "Community organization representing Jews in Lithuania. Before WWII, Lithuania was a major center of Jewish learning (the 'Jerusalem of the North'). Vilna (Vilnius) had one of the greatest Jewish populations in Europe. Approximately 95% of Lithuanian Jews perished in the Holocaust.", individuals: [], connections: [] });
addEntry("Lithuania", { name: "Vilna Gaon Jewish State Museum", type: "museum", category: "Heritage & Memorials", founded: 1989, description: "Museum in Vilnius dedicated to the history and culture of Lithuanian Jews. Named after the Vilna Gaon, the great 18th-century rabbinic scholar.", individuals: [{ name: "Vilna Gaon", role: "Historical figure (1720-1797)", bio: "Rabbi Elijah ben Solomon Zalman, one of the most influential Jewish scholars of modern times." }], connections: [] });

addEntry("Latvia", { name: "Jews in Latvia Museum", type: "museum", category: "Heritage & Memorials", founded: 1989, description: "Museum in Riga documenting the history of the Jewish community in Latvia. Before WWII, Jews constituted about 5% of Latvia's population. Most perished in the Holocaust.", individuals: [], connections: [] });

addEntry("Estonia", { name: "Jewish Community of Estonia", type: "community organization", category: "Community & Social Organizations", founded: 1988, description: "Small Jewish community of approximately 2,500 in Tallinn. One of the few European countries where Jews received cultural autonomy in the interwar period (1926).", individuals: [], connections: [] });

addEntry("Belarus", { name: "Union of Belarusian Jewish Public Associations and Communities", type: "community organization", category: "Representative & Umbrella Bodies", founded: 1991, description: "Representative body of Belarusian Jews. Belarus was a major center of Jewish life before WWII, home to cities like Minsk, Brest, and Pinsk with large Jewish populations. Approximately 10,000-20,000 Jews remain.", individuals: [], connections: [] });

addEntry("Georgia", { name: "Georgian Jewish Community", type: "community organization", category: "Community & Social Organizations", founded: -500, description: "One of the oldest Jewish communities in the world, dating back over 2,600 years. Georgian Jews have a unique tradition and were fully integrated into Georgian society. Most emigrated to Israel in the 1970s-90s; approximately 3,000 remain.", individuals: [], connections: [] });

addEntry("Kazakhstan", { name: "Jewish Community of Kazakhstan", type: "community organization", category: "Community & Social Organizations", founded: 1990, description: "Jewish community in Kazakhstan, centered in Almaty and Nur-Sultan. Approximately 3,500 Jews live in Kazakhstan, many descended from Soviet-era relocations.", individuals: [], connections: [] });

// ============================================================
// MORE ASIA
// ============================================================

addEntry("Myanmar", { name: "Musmeah Yeshua Synagogue", type: "synagogue", category: "Religion & Synagogues", founded: 1893, description: "Historic synagogue in Yangon, Myanmar, the last functioning synagogue in the country. Built by Baghdadi Jewish traders. Only a handful of Jews remain in Myanmar.", individuals: [], connections: [] });

addEntry("Hong Kong", { name: "Ohel Leah Synagogue", type: "synagogue", category: "Religion & Synagogues", founded: 1902, description: "Historic synagogue in Hong Kong's Mid-Levels, built by the Sassoon family. Declared a monument by the Hong Kong government. The Jewish community in Hong Kong numbers approximately 5,000.", individuals: [], connections: [] });
addEntry("Hong Kong", { name: "Jewish Community Centre Hong Kong", type: "community center", category: "Community & Social Organizations", founded: 1982, description: "Community center serving the diverse Jewish community in Hong Kong, which includes professionals from around the world.", individuals: [], connections: [] });

addEntry("Indonesia", { name: "Surabaya Jewish Community", type: "historical community", category: "Heritage & Memorials", founded: 1850, description: "Historic Jewish community in Surabaya, East Java. Once had an active synagogue and community. Indonesia is the world's largest Muslim-majority country with a very small Jewish presence.", individuals: [], connections: [] });

// ============================================================
// MORE LATIN AMERICA
// ============================================================

addEntry("Dominican Republic", { name: "Jewish Community of Sosúa", type: "community organization", category: "Community & Social Organizations", founded: 1940, description: "Community descended from approximately 800 Jewish refugees who were accepted by the Dominican Republic during WWII — one of the few countries to open its doors at the Evian Conference. The town of Sosúa was settled by these refugees.", individuals: [], connections: [] });

addEntry("Curaçao", { name: "Mikvé Israel-Emanuel Synagogue", type: "synagogue", category: "Religion & Synagogues", founded: 1732, description: "Oldest continuously used synagogue in the Americas, located in Willemstad, Curaçao. Founded by Spanish and Portuguese Jews. Features a sand-covered floor, a tradition brought from the Iberian Peninsula.", individuals: [], connections: [] });

addEntry("Suriname", { name: "Neve Shalom Synagogue Paramaribo", type: "synagogue", category: "Religion & Synagogues", founded: 1719, description: "Historic synagogue in Paramaribo, Suriname. The Jewish community in Suriname dates to the 17th century when Sephardic Jews established sugar plantations in the colony.", individuals: [], connections: [] });

// ============================================================
// SAVE
// ============================================================

const countriesFile = path.join(__dirname, '..', 'data', 'countries.json');
const allCountries = Object.keys(data.countries).sort();
fs.writeFileSync(countriesFile, JSON.stringify(allCountries, null, 2));

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));

let total = 0;
for (const country in data.countries) total += data.countries[country].length;
console.log(`\n=== EXPANSION 4 COMPLETE ===`);
console.log(`Added ${added} new entries`);
console.log(`Total entries: ${total}`);
console.log(`Countries: ${Object.keys(data.countries).length}`);
console.log(`People: ${Object.keys(people.people).length}`);
