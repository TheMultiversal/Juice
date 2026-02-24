// Massive expansion script 6 - More profiles, people, organizations
// Focus: historically significant figures, more industries, underrepresented countries
// Run: node scripts/expandData6.js

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
// US - NOTABLE FOUNDATIONS & PHILANTHROPIES
// ============================================================

addEntry("United States", { name: "Bloomberg Philanthropies", type: "foundation", category: "Philanthropy & Foundations", founded: 2006, description: "Foundation created by Michael Bloomberg. Focuses on public health, arts, government innovation, education, and the environment. Has given over $17 billion to charitable causes.", website: "https://www.bloomberg.org/", individuals: [{ name: "Michael Bloomberg", role: "Founder", bio: "American billionaire businessman, politician, and philanthropist. Founder of Bloomberg LP and former Mayor of New York City." }], connections: [] });
addEntry("United States", { name: "George Soros / Open Society Foundations", type: "foundation", category: "Philanthropy & Foundations", founded: 1993, description: "International grantmaking network founded by George Soros. Supports civil society groups around the world. Has given over $32 billion to philanthropic causes, making Soros one of the most generous living donors.", website: "https://www.opensocietyfoundations.org/", individuals: [{ name: "George Soros", role: "Founder", bio: "Hungarian-American billionaire investor and philanthropist of Jewish descent. Known as 'The Man Who Broke the Bank of England.'" }], connections: [] });
addEntry("United States", { name: "Charles and Lynn Schusterman Family Philanthropies", type: "foundation", category: "Philanthropy & Foundations", founded: 1987, description: "Major Jewish philanthropic foundation focusing on the Jewish community and Israel, as well as education in the US. Based in Tulsa, Oklahoma.", individuals: [{ name: "Charles Schusterman", role: "Founder (1935-2000)", bio: "American oil and gas entrepreneur and philanthropist." }], connections: [] });
addEntry("United States", { name: "Avi Chai Foundation", type: "foundation", category: "Philanthropy & Foundations", founded: 1984, description: "Private foundation established by Zalman Bernstein. Focused on Jewish identity and literacy in Israel and North America. Notably 'spent down' its entire endowment by 2020 as planned.", individuals: [{ name: "Zalman Bernstein", role: "Founder (1926-1999)", bio: "American financier and philanthropist who founded Sanford C. Bernstein & Co." }], connections: [] });
addEntry("United States", { name: "Jim Joseph Foundation", type: "foundation", category: "Philanthropy & Foundations", founded: 2006, description: "One of the largest private foundations in the US focused on Jewish education. Assets exceed $1 billion. Supports innovative programs in Jewish learning and engagement.", individuals: [], connections: [] });
addEntry("United States", { name: "Marcus Foundation", type: "foundation", category: "Philanthropy & Foundations", founded: 1989, description: "Foundation established by Home Depot co-founder Bernie Marcus. Has given over $2 billion, including $400 million to the Georgia Aquarium and significant support for Israel.", individuals: [], connections: [] });
addEntry("United States", { name: "Bronfman Philanthropies", type: "foundation", category: "Philanthropy & Foundations", founded: 1986, description: "Foundation established by Charles Bronfman, co-chairman of Seagram Company. Created Birthright Israel (Taglit) with Michael Steinhardt. Focus on Jewish identity and Israel-diaspora relations.", individuals: [{ name: "Charles Bronfman", role: "Founder", bio: "Canadian-American billionaire philanthropist and co-chairman of Seagram." }], connections: [] });
addEntry("United States", { name: "Steinhardt Foundation for Jewish Life", type: "foundation", category: "Philanthropy & Foundations", founded: 1994, description: "Foundation focusing on Jewish identity and engagement. Michael Steinhardt co-founded Birthright Israel. Major donor to NYU, founding the Steinhardt School of Culture, Education, and Human Development.", individuals: [{ name: "Michael Steinhardt", role: "Founder", bio: "American investor and philanthropist, pioneering hedge fund manager and co-founder of Birthright Israel." }], connections: [] });
addEntry("United States", { name: "Wexner Foundation", type: "foundation", category: "Philanthropy & Foundations", founded: 1983, description: "Foundation established by Les Wexner (founder of L Brands/Victoria's Secret). Focus on developing Jewish professional and volunteer leaders.", individuals: [{ name: "Les Wexner", role: "Founder", bio: "American billionaire businessman who built L Brands (Victoria's Secret, Bath & Body Works)." }], connections: [] });

// ============================================================
// US - MEDIA (Newspapers, Publishing, News)
// ============================================================

addEntry("United States", { name: "The New York Times Company", type: "media company", category: "Entertainment & Media", founded: 1851, description: "Publisher of The New York Times, often considered America's newspaper of record. Under the Sulzberger family's ownership since 1896 when Adolph Ochs, of a German Jewish family, purchased it. Revenue exceeds $2.3 billion.", website: "https://www.nytimes.com/", individuals: [{ name: "Adolph Ochs", role: "Former Publisher (1858-1935)", bio: "American newspaper publisher of German Jewish descent who purchased The New York Times in 1896." }, { name: "A.G. Sulzberger", role: "Publisher", bio: "Fifth generation of the Ochs-Sulzberger family to lead The New York Times." }], connections: [] });
addEntry("United States", { name: "Advance Publications", type: "media company", category: "Entertainment & Media", founded: 1922, description: "American media company owned by the Newhouse family. Owns Condé Nast (Vogue, The New Yorker, Vanity Fair, GQ, Wired), Reddit, and American City Business Journals.", individuals: [{ name: "Samuel Irving Newhouse Sr.", role: "Founder (1895-1979)", bio: "American media entrepreneur who built a publishing empire. Son of Jewish immigrants from Russia and Austria." }], connections: [] });
addEntry("United States", { name: "The Washington Post", type: "newspaper", category: "Entertainment & Media", founded: 1877, description: "Major American newspaper known for its political coverage. Owned by Jeff Bezos since 2013. Previously owned by the Meyer-Graham family; Eugene Meyer was of Jewish descent.", individuals: [{ name: "Eugene Meyer", role: "Former Owner (1875-1959)", bio: "American financier of Jewish descent who purchased The Washington Post in 1933. His daughter Katharine Graham became an iconic publisher." }], connections: [] });
addEntry("United States", { name: "Simon & Schuster", type: "publishing company", category: "Entertainment & Media", founded: 1924, description: "One of the 'Big Five' English-language publishing companies. Founded by Richard L. Simon and M. Lincoln Schuster, both Jewish. Known for launching the crossword puzzle book industry.", individuals: [{ name: "Richard L. Simon", role: "Co-founder (1899-1960)", bio: "American publisher who co-founded Simon & Schuster. Father of singer Carly Simon." }, { name: "M. Lincoln Schuster", role: "Co-founder (1897-1970)", bio: "American publisher who co-founded Simon & Schuster." }], connections: [] });
addEntry("United States", { name: "Random House", type: "publishing company", category: "Entertainment & Media", founded: 1927, description: "World's largest trade book publisher. Founded by Bennett Cerf and Donald Klopfer. Now part of Penguin Random House. Cerf was a beloved TV personality and wit.", individuals: [{ name: "Bennett Cerf", role: "Co-founder (1898-1971)", bio: "American publisher and co-founder of Random House. Known for his humor and appearances on What's My Line?" }], connections: [] });
addEntry("United States", { name: "Knopf (Alfred A. Knopf)", type: "publishing company", category: "Entertainment & Media", founded: 1915, description: "Prestigious American publishing house founded by Alfred A. Knopf. Published 16 Pulitzer Prize winners. Known for its focus on literary quality and the iconic Borzoi logo.", individuals: [{ name: "Alfred A. Knopf", role: "Founder (1892-1984)", bio: "American publisher who founded Alfred A. Knopf, Inc. Published many of the 20th century's most important literary works." }], connections: [] });

// ============================================================
// US - MORE FINANCE
// ============================================================

addEntry("United States", { name: "Elliott Management Corporation", type: "hedge fund", category: "Investment & Private Equity", founded: 1977, description: "One of the largest activist hedge funds in the world, managing over $55 billion. Founded by Paul Singer. Known for aggressive activist investing and distressed debt.", individuals: [{ name: "Paul Singer", role: "Founder", bio: "American billionaire hedge fund manager, founder of Elliott Management. Major Republican donor and supporter of pro-Israel causes." }], connections: [] });
addEntry("United States", { name: "D.E. Shaw & Co.", type: "hedge fund", category: "Investment & Private Equity", founded: 1988, description: "Multinational investment management firm managing over $60 billion. Founded by David E. Shaw. Early employer of Jeff Bezos before he founded Amazon.", individuals: [{ name: "David E. Shaw", role: "Founder", bio: "American billionaire scientist, entrepreneur, and founder of D.E. Shaw. Pioneer in computational finance." }], connections: [] });
addEntry("United States", { name: "Apollo Global Management", type: "private equity firm", category: "Investment & Private Equity", founded: 1990, description: "Alternative asset management firm with over $600 billion in AUM. One of the largest private equity firms in the world. Also active in credit and real estate.", website: "https://www.apollo.com/", individuals: [{ name: "Leon Black", role: "Co-founder", bio: "American billionaire financier and co-founder of Apollo Global Management." }, { name: "Marc Rowan", role: "CEO", bio: "American billionaire businessman and CEO of Apollo Global Management." }], connections: [] });
addEntry("United States", { name: "Bain Capital", type: "private equity firm", category: "Investment & Private Equity", founded: 1984, description: "Global private investment firm managing over $175 billion. Founded by several partners including Mitt Romney. Known for both successful turnarounds and controversial restructurings.", individuals: [], connections: [] });

// ============================================================
// US - LAW FIRMS (more)
// ============================================================

addEntry("United States", { name: "Wachtell, Lipton, Rosen & Katz", type: "law firm", category: "Law Firms", founded: 1965, description: "Considered by many to be the most prestigious and highest-grossing law firm per lawyer in the US. Invented the shareholder rights plan ('poison pill'). Founded by Herbert Wachtell and Martin Lipton, both Jewish.", individuals: [{ name: "Martin Lipton", role: "Co-founder", bio: "American lawyer who co-founded Wachtell Lipton and invented the poison pill defense in M&A." }], connections: [] });
addEntry("United States", { name: "Skadden, Arps, Slate, Meagher & Flom", type: "law firm", category: "Law Firms", founded: 1948, description: "One of the highest-grossing law firms in the world. Revenue exceeds $3 billion. Known for M&A, litigation, and regulatory work. Joseph Flom, son of Jewish immigrants, built the firm into a powerhouse.", individuals: [{ name: "Joseph Flom", role: "Named Partner (1923-2011)", bio: "American lawyer, son of Jewish immigrants from Eastern Europe. Transformed Skadden into one of the world's leading law firms." }], connections: [] });
addEntry("United States", { name: "Paul, Weiss, Rifkind, Wharton & Garrison", type: "law firm", category: "Law Firms", founded: 1875, description: "Prominent New York law firm known for litigation and corporate law. Revenue exceeds $2.5 billion. Named partners include Simon Rifkind, a Jewish immigrant from Latvia.", individuals: [], connections: [] });

// ============================================================
// US - MORE FASHION & LUXURY
// ============================================================

addEntry("United States", { name: "Estée Lauder Companies", type: "cosmetics conglomerate", category: "Fashion & Luxury", founded: 1946, description: "Major manufacturer and marketer of prestige skincare, makeup, fragrance, and hair care. Brands include Estée Lauder, Clinique, MAC, La Mer, Jo Malone. Revenue exceeds $14 billion.", website: "https://www.elcompanies.com/", individuals: [{ name: "Estée Lauder", role: "Founder (1908-2004)", bio: "American businesswoman who founded one of the world's largest cosmetics companies. Born to Hungarian Jewish immigrants. Included on TIME's 20 most influential businesspeople of the 20th century." }], connections: [] });
addEntry("United States", { name: "Calvin Klein", type: "fashion brand", category: "Fashion & Luxury", founded: 1968, description: "American fashion house founded by Calvin Klein. Globally recognized for its clean, modern aesthetic in clothing, accessories, fragrances, and home furnishings. Now owned by PVH Corp.", individuals: [{ name: "Calvin Klein", role: "Founder", bio: "American fashion designer of Jewish descent who built one of the most iconic American fashion brands." }], connections: [] });
addEntry("United States", { name: "Levi Strauss & Co.", type: "clothing company", category: "Fashion & Luxury", founded: 1853, description: "American clothing company founded by Levi Strauss, a Bavarian Jewish immigrant. Inventor of blue jeans. One of the most recognizable clothing brands worldwide. Revenue exceeds $6 billion.", website: "https://www.levistrauss.com/", individuals: [{ name: "Levi Strauss", role: "Founder (1829-1902)", bio: "Bavarian-born Jewish immigrant who founded Levi Strauss & Co. and helped create blue jeans during the Gold Rush." }], connections: [] });
addEntry("United States", { name: "Marc Jacobs", type: "fashion brand", category: "Fashion & Luxury", founded: 1984, description: "American fashion brand known for luxury and contemporary fashion. Marc Jacobs previously served as creative director of Louis Vuitton (1997-2013).", individuals: [{ name: "Marc Jacobs", role: "Founder & Designer", bio: "American fashion designer of Jewish descent. Former creative director of Louis Vuitton." }], connections: [] });

// ============================================================
// US - FOOD & BEVERAGE (more)
// ============================================================

addEntry("United States", { name: "Starbucks Coffee Company", type: "coffee company", category: "Food & Beverage", founded: 1971, description: "World's largest coffeehouse chain with over 35,000 stores worldwide. Howard Schultz, of a Jewish family from Brooklyn, transformed it from a local coffee bean seller into a global brand.", website: "https://www.starbucks.com/", individuals: [{ name: "Howard Schultz", role: "Former CEO & Chairman", bio: "American businessman who grew up in Brooklyn housing projects and built Starbucks into a global brand." }], connections: [] });
addEntry("United States", { name: "Haagen-Dazs", type: "ice cream brand", category: "Food & Beverage", founded: 1961, description: "Premium ice cream brand founded in the Bronx by Reuben and Rose Mattus, Polish Jewish immigrants. The foreign-sounding name was invented to sound Danish. Now owned by General Mills.", individuals: [{ name: "Reuben Mattus", role: "Founder (1912-1994)", bio: "Polish-Jewish immigrant who founded Häagen-Dazs ice cream in the Bronx." }], connections: [] });
addEntry("United States", { name: "Krispy Kreme", type: "donut company", category: "Food & Beverage", founded: 1937, description: "American doughnut company with over 1,400 locations worldwide. Acquired by JAB Holding Company in 2016.", individuals: [], connections: [] });

// ============================================================
// US - SPORTS (more)
// ============================================================

addEntry("United States", { name: "Dallas Mavericks", type: "sports team", category: "Sports", founded: 1980, description: "NBA franchise owned by Miriam Adelson (acquired by the Adelson family in 2023 for $3.5 billion) and Mark Cuban.", individuals: [{ name: "Miriam Adelson", role: "Owner", bio: "Israeli-American physician and businesswoman. One of the world's wealthiest women through her late husband Sheldon Adelson's casino empire." }], connections: [] });
addEntry("United States", { name: "Miami Dolphins", type: "sports team", category: "Sports", founded: 1966, description: "NFL franchise owned by Stephen Ross since 2008. Notable for their perfect 1972 season. Based in Miami Gardens, Florida.", individuals: [], connections: [] });
addEntry("United States", { name: "Philadelphia 76ers", type: "sports team", category: "Sports", founded: 1946, description: "NBA franchise with notable Jewish owners including Josh Harris and David Blitzer (Harris Blitzer Sports & Entertainment). Rich basketball history.", individuals: [{ name: "Josh Harris", role: "Managing Partner", bio: "American billionaire co-founder of Apollo Global Management and co-owner of the 76ers." }], connections: [] });

// ============================================================
// MORE INTERNATIONAL ENTRIES
// ============================================================

// SWITZERLAND (more)
addEntry("Switzerland", { name: "Nestlé", type: "food and beverage conglomerate", category: "Food & Beverage", founded: 1866, description: "World's largest food and beverage company by revenue (exceeding $100 billion). Headquartered in Vevey. Brands include Nescafé, KitKat, Maggi, Purina.", website: "https://www.nestle.com/", individuals: [], connections: [] });
addEntry("Switzerland", { name: "Glencore", type: "mining and trading", category: "Manufacturing & Industry", founded: 1974, description: "Anglo-Swiss multinational commodity trading and mining company. Founded by Marc Rich, who was of Belgian Jewish descent. Revenue exceeds $250 billion, one of the world's largest companies.", individuals: [{ name: "Marc Rich", role: "Founder (1934-2013)", bio: "Belgian-born Jewish commodities trader who founded Glencore. One of the most controversial figures in modern finance." }], connections: [] });
addEntry("Switzerland", { name: "UBS Group AG", type: "bank", category: "Banking & Financial Services", founded: 1862, description: "Largest Swiss banking institution and the world's largest wealth manager. Total assets exceed $1.1 trillion. Managing over $5 trillion in invested assets.", website: "https://www.ubs.com/", individuals: [], connections: [] });
addEntry("Switzerland", { name: "Credit Suisse (now UBS)", type: "bank", category: "Banking & Financial Services", founded: 1856, description: "Major Swiss bank that was acquired by UBS in 2023 after a banking crisis. Had been one of the world's most important financial institutions for 167 years.", individuals: [], connections: [] });

// ITALY (more)
addEntry("Italy", { name: "Jewish Ghetto of Venice", type: "heritage site", category: "Heritage & Memorials", founded: 1516, description: "The world's first 'ghetto' — the word itself comes from the Venetian word for foundry (getto). Jews were confined to this area from 1516 to 1797. Today a living neighborhood with synagogues, a museum, and a kosher restaurant.", individuals: [], connections: [] });
addEntry("Italy", { name: "Benetton Group", type: "fashion company", category: "Fashion & Luxury", founded: 1965, description: "Italian fashion brand with a presence in 120 countries. Known for its controversial advertising campaigns and United Colors of Benetton slogan.", website: "https://www.benetton.com/", individuals: [], connections: [] });
addEntry("Italy", { name: "Luxottica (EssilorLuxottica)", type: "eyewear company", category: "Fashion & Luxury", founded: 1961, description: "World's largest eyewear company. Brands include Ray-Ban, Oakley, Persol, Oliver Peoples. Controls LensCrafters and Sunglass Hut. Merged with Essilor in 2018.", individuals: [{ name: "Leonardo Del Vecchio", role: "Founder (1935-2022)", bio: "Italian billionaire businessman who founded Luxottica and became one of Italy's wealthiest people." }], connections: [] });

// SPAIN (more)
addEntry("Spain", { name: "Sephardic House of Barcelona", type: "cultural center", category: "Culture & Arts", founded: 2007, description: "Cultural center dedicated to preserving and promoting Sephardic heritage in Barcelona. Spain's 1492 expulsion of Jews was one of the largest forced migrations in history.", individuals: [], connections: [] });
addEntry("Spain", { name: "Inditex (Zara)", type: "fashion conglomerate", category: "Fashion & Luxury", founded: 1985, description: "World's largest fashion retailer. Parents company of Zara, Massimo Dutti, Bershka, Pull&Bear. Founded by Amancio Ortega. Revenue exceeds $35 billion.", website: "https://www.inditex.com/", individuals: [], connections: [] });

// NETHERLANDS (more)
addEntry("Netherlands", { name: "Heineken", type: "brewery", category: "Food & Beverage", founded: 1864, description: "World's second-largest brewer. Headquartered in Amsterdam. Operates breweries on every continent. Revenue exceeds $30 billion.", website: "https://www.theheinekencompany.com/", individuals: [], connections: [] });
addEntry("Netherlands", { name: "ASML Holding", type: "technology company", category: "Technology", founded: 1984, description: "Dutch company that is the world's sole manufacturer of extreme ultraviolet (EUV) lithography machines used to make advanced semiconductor chips. Market cap exceeds $300 billion. The most critical company in the global chip supply chain.", website: "https://www.asml.com/", individuals: [], connections: [] });

// JAPAN (more)
addEntry("Japan", { name: "Makuya", type: "religious movement", category: "Religion & Synagogues", founded: 1948, description: "Japanese pro-Israel and philo-Semitic movement. Members learn Hebrew, celebrate Jewish holidays, and have strong connections to Israel. Founded by Abraham Ikuro Teshima.", individuals: [{ name: "Abraham Ikuro Teshima", role: "Founder (1910-1973)", bio: "Japanese Christian leader who founded the Makuya movement and fostered deep ties with Israel." }], connections: [] });
addEntry("Japan", { name: "SoftBank Group", type: "technology conglomerate", category: "Technology", founded: 1981, description: "Japanese multinational conglomerate. Major technology investor through the Vision Fund ($100 billion+). Owns ARM Holdings and has invested in hundreds of tech startups globally.", website: "https://group.softbank.com/", individuals: [{ name: "Masayoshi Son", role: "Founder & CEO", bio: "Korean-Japanese billionaire, founder and CEO of SoftBank. One of the world's most prolific technology investors." }], connections: [] });

// SOUTH KOREA (more)
addEntry("South Korea", { name: "Seoul Jewish Community", type: "community organization", category: "Community & Social Organizations", founded: 1950, description: "Small Jewish community in Seoul established during the Korean War. Today approximately 1,000 Jews live in South Korea, mostly expats and military personnel.", individuals: [], connections: [] });

// CHINA (more)
addEntry("China", { name: "Shanghai Jewish Refugees Museum", type: "museum", category: "Heritage & Memorials", founded: 2007, description: "Museum in Shanghai's former Hongkou Ghetto documenting the approximately 23,000 Jewish refugees who fled to Shanghai during WWII. Shanghai was one of the only places in the world accepting Jewish refugees without visas.", individuals: [], connections: [] });

// RUSSIA (more)
addEntry("Russia", { name: "Jewish Museum and Tolerance Center Moscow", type: "museum", category: "Heritage & Memorials", founded: 2012, description: "One of the world's largest Jewish museums, located in a former bus depot in Moscow. Funded by Russian Jewish oligarchs. Interactive exhibits cover 2,000 years of Russian Jewish history.", individuals: [], connections: [] });

// POLAND (more)
addEntry("Poland", { name: "Auschwitz-Birkenau Memorial and Museum", type: "memorial", category: "Heritage & Memorials", founded: 1947, description: "Memorial and museum at the site of the largest Nazi concentration and extermination camp. Over 1.1 million people were murdered here, about 1 million of them Jews. UNESCO World Heritage Site visited by over 2 million people annually.", website: "https://www.auschwitz.org/", individuals: [], connections: [] });
addEntry("Poland", { name: "Jewish Historical Institute Warsaw", type: "research institute", category: "Research & Think Tanks", founded: 1947, description: "Institute and museum documenting the history and culture of Polish Jews. Houses the Ringelblum Archive — a collection of documents from the Warsaw Ghetto hidden during WWII. UNESCO Memory of the World.", individuals: [{ name: "Emanuel Ringelblum", role: "Founder of the Archive (1900-1944)", bio: "Polish-Jewish historian who organized the secret Oyneg Shabes archive in the Warsaw Ghetto." }], connections: [] });

// CZECH REPUBLIC (more)
addEntry("Czech Republic", { name: "Jewish Quarter of Prague (Josefov)", type: "heritage site", category: "Heritage & Memorials", founded: 1200, description: "Historic Jewish quarter of Prague containing the Old Jewish Cemetery, the Old-New Synagogue (oldest active synagogue in Europe, 1270), and several other synagogues now serving as museums.", individuals: [], connections: [] });

// AUSTRIA (more)
addEntry("Austria", { name: "Jewish Museum Vienna", type: "museum", category: "Heritage & Memorials", founded: 1990, description: "Museum dedicated to Jewish history and culture in Vienna. Before the Anschluss, Vienna had one of the most vibrant Jewish communities in Europe with approximately 185,000 Jews.", individuals: [], connections: [] });

// ============================================================
// NEW COUNTRIES & REGIONS
// ============================================================

addEntry("Ethiopia", { name: "North Shewa Zone Heritage Center", type: "heritage site", category: "Heritage & Memorials", founded: 2000, description: "Center documenting Beta Israel (Ethiopian Jewish) history and culture. Most Ethiopian Jews (approximately 95,000) were airlifted to Israel in Operations Moses (1984) and Solomon (1991). Approximately 8,000 Falash Mura remain.", individuals: [], connections: [] });

addEntry("Uganda", { name: "Abayudaya Jewish Community", type: "community organization", category: "Community & Social Organizations", founded: 1919, description: "Community of approximately 2,000 Ugandan Jews near Mbale. Founded by Semei Kakungulu, who converted to Judaism after reading the Bible. Recognized by Conservative Judaism in 2002.", individuals: [{ name: "Semei Kakungulu", role: "Founder (1869-1928)", bio: "Ugandan military leader who founded the Abayudaya community after independent study of the Bible." }], connections: [] });

addEntry("Ghana", { name: "House of Israel Community", type: "community organization", category: "Community & Social Organizations", founded: 1976, description: "Community of approximately 1,500 people in Sefwi Wiawso who practice Judaism. Believe they descend from Jews who migrated through the Sahara. Formally recognized by various Jewish organizations.", individuals: [], connections: [] });

addEntry("Madagascar", { name: "Community of Jewish Descent in Madagascar", type: "community organization", category: "Community & Social Organizations", founded: 1900, description: "Small community in Madagascar where some people claim Jewish ancestry. The 'Madagascar Plan' was an abandoned Nazi proposal to relocate European Jews to the island.", individuals: [], connections: [] });

addEntry("Uzbekistan", { name: "Bukharan Jewish Community", type: "community organization", category: "Community & Social Organizations", founded: -500, description: "Ancient Jewish community in Uzbekistan with roots dating back over 2,500 years. The Bukharan Jews have a distinct culture, language (Bukharian), and traditions. Most emigrated to Israel and the US. Approximately 500 remain.", individuals: [], connections: [] });

addEntry("Tajikistan", { name: "Jewish Community of Dushanbe", type: "community organization", category: "Community & Social Organizations", founded: 1900, description: "Small remnant Jewish community in Tajikistan. Once home to a significant Bukharan Jewish population. Most emigrated in the 1990s. Fewer than 100 Jews remain.", individuals: [], connections: [] });

addEntry("Azerbaijan", { name: "Mountain Jews of Azerbaijan", type: "community organization", category: "Community & Social Organizations", founded: -500, description: "Community of Mountain Jews (Juhuro) centered in Quba's 'Red Village' (Krasnaya Sloboda), the only all-Jewish town outside Israel and the US. Speak Judeo-Tat language. Approximately 9,000 remain in Azerbaijan.", individuals: [], connections: [] });

addEntry("Nepal", { name: "Chabad of Kathmandu", type: "religious center", category: "Religion & Synagogues", founded: 2000, description: "Chabad center in Kathmandu serving Israeli backpackers and tourists. Hosts massive Passover seders (over 1,500 attendees) — one of the largest in the world. Nepal has no indigenous Jewish community.", individuals: [], connections: [] });

addEntry("Cambodia", { name: "Chabad of Phnom Penh", type: "religious center", category: "Religion & Synagogues", founded: 2009, description: "Jewish center in Phnom Penh serving tourists and expats. Cambodia has a tiny but growing Jewish community.", individuals: [], connections: [] });

addEntry("Laos", { name: "Chabad of Vientiane", type: "religious center", category: "Religion & Synagogues", founded: 2014, description: "Chabad center in the capital of Laos, one of the newest Chabad houses in the world. Serves Israeli backpackers traveling Southeast Asia.", individuals: [], connections: [] });

addEntry("Sri Lanka", { name: "Jewish Community of Sri Lanka", type: "community organization", category: "Community & Social Organizations", founded: 1800, description: "Small Jewish community with roots in Dutch colonial period. The former synagogue in Galle Fort still exists as a commercial building.", individuals: [], connections: [] });

addEntry("Papua New Guinea", { name: "Jewish Community of Port Moresby", type: "community organization", category: "Community & Social Organizations", founded: 1970, description: "Tiny Jewish community in Papua New Guinea, one of the most remote in the world. Fewer than 20 Jews live in the country.", individuals: [], connections: [] });

addEntry("Fiji", { name: "Jewish Community of Suva", type: "community organization", category: "Community & Social Organizations", founded: 1940, description: "Small Jewish community in Fiji with roots going back to WWII when Jewish servicemen were stationed in the Pacific.", individuals: [], connections: [] });

addEntry("Malta", { name: "Jewish Heritage of Malta", type: "heritage site", category: "Heritage & Memorials", founded: 1400, description: "Malta has Jewish roots dating to Roman times. A medieval Jewish cemetery was found in Rabat. The Jewish community was expelled in 1492. Today a small community of approximately 120 exists.", individuals: [], connections: [] });

addEntry("Gibraltar", { name: "Gibraltar Hebrew Community", type: "community organization", category: "Community & Social Organizations", founded: 1749, description: "One of the oldest Jewish communities in the British Overseas Territories. Approximately 600 Jews live in Gibraltar. Four synagogues serve the community.", individuals: [], connections: [] });

addEntry("Luxembourg", { name: "Jewish Community of Luxembourg", type: "community organization", category: "Community & Social Organizations", founded: 1808, description: "Small community of approximately 1,200 Jews. The Luxembourg synagogue, destroyed by the Nazis, was rebuilt in 1953.", individuals: [], connections: [] });

addEntry("Monaco", { name: "Association Culturelle Israélite de Monaco", type: "community organization", category: "Community & Social Organizations", founded: 1948, description: "Jewish community organization in Monaco. The principality has a small Jewish population and one synagogue.", individuals: [], connections: [] });

addEntry("Andorra", { name: "Jewish Community of Andorra", type: "community organization", category: "Community & Social Organizations", founded: 2000, description: "Tiny Jewish community in the Pyrenean principality. Approximately 100 Jews live in Andorra. No synagogue; community members travel to Barcelona or Toulouse.", individuals: [], connections: [] });

addEntry("Cyprus", { name: "Jewish Community of Cyprus", type: "community organization", category: "Community & Social Organizations", founded: -200, description: "Ancient Jewish presence dating to Hellenistic times. After WWII, British detention camps in Cyprus held approximately 52,000 Jewish Holocaust survivors trying to reach Palestine. Today a community of several hundred.", individuals: [], connections: [] });

addEntry("Croatia", { name: "Jewish Community of Zagreb", type: "community organization", category: "Community & Social Organizations", founded: 1806, description: "Jewish community in the Croatian capital. Before WWII, approximately 25,000 Jews lived in Croatia. Most perished in the Jasenovac concentration camp. Today approximately 1,700 Jews remain.", individuals: [], connections: [] });

addEntry("Serbia", { name: "Jewish Community of Belgrade", type: "community organization", category: "Community & Social Organizations", founded: 1521, description: "One of the oldest Jewish communities in the Balkans. Sephardic Jews arrived after the 1492 Spanish expulsion. Before WWII, approximately 12,000 Jews lived in Serbia. Approximately 1,200 remain today.", individuals: [], connections: [] });

addEntry("Bosnia and Herzegovina", { name: "Jewish Community of Sarajevo", type: "community organization", category: "Community & Social Organizations", founded: 1565, description: "Historic Sephardic community. Home of the famous Sarajevo Haggadah, a 14th-century illuminated manuscript. The Jewish community survived the 1992-95 siege of Sarajevo. Approximately 700 Jews remain.", individuals: [], connections: [] });

addEntry("North Macedonia", { name: "Jewish Community of Skopje", type: "community organization", category: "Community & Social Organizations", founded: 1492, description: "Sephardic community established after the Spanish expulsion. On March 11, 1943, nearly all 7,148 Jews of Macedonia were deported to Treblinka. Today approximately 200 Jews remain.", individuals: [], connections: [] });

addEntry("Albania", { name: "Jewish Community of Albania", type: "community organization", category: "Community & Social Organizations", founded: 1000, description: "Albania is the only European country that had a larger Jewish population after WWII than before. Albanians of all faiths protected Jews based on the code of besa (honor). Approximately 200 Jews live in Albania today.", individuals: [], connections: [] });

addEntry("Bulgaria", { name: "Jewish Community of Bulgaria", type: "community organization", category: "Community & Social Organizations", founded: 1400, description: "Bulgaria is notable for saving nearly all of its 48,000 Jews during WWII through mass public protest and the intervention of Boris III. Approximately 2,000 Jews remain; most emigrated to Israel.", individuals: [], connections: [] });

addEntry("Slovenia", { name: "Jewish Community of Ljubljana", type: "community organization", category: "Community & Social Organizations", founded: 1200, description: "Small Jewish community in Slovenia. Jews were expelled from Ljubljana in 1515. The community was reconstituted after WWII. Approximately 300 Jews live in Slovenia.", individuals: [], connections: [] });

addEntry("Slovakia", { name: "Jewish Community of Bratislava", type: "community organization", category: "Community & Social Organizations", founded: 1300, description: "Bratislava (Pressburg) was one of the most important centers of Jewish learning in Europe. Rabbi Moses Sofer (the Chatam Sofer) established his famous yeshiva there. Before WWII 15,000 Jews lived there. Approximately 2,000 remain in Slovakia.", individuals: [{ name: "Moses Sofer", role: "Historical Rabbi (1762-1839)", bio: "Leading Orthodox rabbi known as the Chatam Sofer, head of the Pressburg Yeshiva, one of the most influential rabbis of the modern era." }], connections: [] });

addEntry("Montenegro", { name: "Jewish Community of Montenegro", type: "community organization", category: "Community & Social Organizations", founded: 1500, description: "Tiny Jewish community in Montenegro. Most Jews lived in coastal towns under Venetian rule. Approximately 200 Jews live in Montenegro today.", individuals: [], connections: [] });

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
console.log(`\n=== EXPANSION 6 COMPLETE ===`);
console.log(`Added ${added} new entries`);
console.log(`Total entries: ${total}`);
console.log(`Countries: ${Object.keys(data.countries).length}`);
console.log(`People: ${Object.keys(people.people).length}`);
