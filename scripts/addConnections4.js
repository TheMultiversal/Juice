// addConnections4.js - Remaining world entries + US leftovers
// Run AFTER addConnections3.js
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
  if (!e.individuals.find(i => i.id === pid)) {
    person.id = pid; e.individuals.push(person);
    if (!people.people[pid]) people.people[pid] = { name: person.name, bio: person.bio || '', notes: '' };
  }
}

// ============================================================
// US - MUSEUMS
// ============================================================

addConn('museum-of-jewish-heritage-nyc', [
  { name: "Yad Vashem", type: "partner institution", description: "Partners with Israel's Yad Vashem for exhibitions and educational programs." },
  { name: "Battery Park City", type: "location", description: "Located in Battery Park City, Lower Manhattan, overlooking the Statue of Liberty." },
  { name: "Jerry Speyer", type: "chairman", description: "Jerry Speyer (Jewish, Tishman Speyer) is chairman of the museum." },
  { name: "Holocaust education", type: "mission", description: "Dedicated to educating about Jewish life before, during, and after the Holocaust." }
]);

addConn('united-states-holocaust-memorial-museum', [
  { name: "US Congress", type: "established by", description: "Established by an Act of Congress in 1980; located on the National Mall." },
  { name: "Elie Wiesel", type: "founding chairman", description: "Elie Wiesel (Jewish, Holocaust survivor, Nobel laureate) was founding chairman of the council." },
  { name: "Washington D.C.", type: "location", description: "Located on the National Mall near the Washington Monument." },
  { name: "Yad Vashem", type: "partner", description: "Works with Yad Vashem on research and testimony." },
  { name: "Steven Spielberg", type: "supporter", description: "Spielberg has been a major supporter of Holocaust museums." }
]);
updDesc('united-states-holocaust-memorial-museum', 'Established by Act of Congress in 1980, located on the National Mall in Washington D.C. Elie Wiesel (Jewish, Holocaust survivor, Nobel Prize laureate) was founding chairman. The museum has welcomed 45+ million visitors. Houses extensive archives and conducts research on genocide prevention. Works closely with Israel\'s Yad Vashem.');

addConn('the-jewish-museum-new-york', [
  { name: "Jewish Theological Seminary", type: "origin", description: "The museum grew from the collection of the Jewish Theological Seminary." },
  { name: "Fifth Avenue", type: "location", description: "Located on Fifth Avenue's Museum Mile in Manhattan." },
  { name: "Jewish art and culture", type: "mission", description: "Dedicated to Jewish art, artifacts, and cultural expression across 4,000 years." }
]);

addConn('skirball-cultural-center', [
  { name: "Jack Skirball", type: "founder", description: "Named after Rabbi Jack Skirball (Jewish), a rabbi and Hollywood producer." },
  { name: "Los Angeles", type: "location", description: "Located in the Santa Monica Mountains in Los Angeles." },
  { name: "Jewish cultural center", type: "mission", description: "Explores connections between Jewish heritage and American democratic ideals." }
]);

// ============================================================
// US - PUBLISHING
// ============================================================

addConn('simon-schuster', [
  { name: "Richard Simon", type: "co-founder", description: "Richard Simon (Jewish) co-founded Simon & Schuster in 1924." },
  { name: "Max Schuster", type: "co-founder", description: "Max Schuster (Jewish) co-founded the publisher." },
  { name: "KKR", type: "acquirer", description: "KKR (co-founded by Henry Kravis, Jewish) acquired Simon & Schuster for $1.62 billion in 2023." },
  { name: "Paramount Global", type: "former parent", description: "Previously owned by Paramount Global (Shari Redstone, Jewish)." },
  { name: "Crossword puzzles", type: "historic innovation", description: "Simon & Schuster published the first crossword puzzle book in 1924." }
]);
updDesc('simon-schuster', 'Co-founded by Richard Simon (Jewish) and Max Schuster (Jewish) in 1924. One of the "Big Five" publishers. Published the first crossword puzzle book. Owned by Paramount Global (Shari Redstone, Jewish) until acquired by KKR (co-founded by Henry Kravis, Jewish) for $1.62B in 2023. Both founder and buyer are Jewish-connected.');

addConn('random-house-penguin', [
  { name: "Bennett Cerf", type: "co-founder", description: "Bennett Cerf (Jewish) co-founded Random House in 1927." },
  { name: "Donald Klopfer", type: "co-founder", description: "Donald Klopfer (Jewish) co-founded Random House." },
  { name: "Bertelsmann", type: "parent company", description: "Random House is now part of Penguin Random House (Bertelsmann)." },
  { name: "Knopf", type: "imprint", description: "Alfred A. Knopf (imprint) was founded by Alfred A. Knopf Sr. and his wife Blanche Knopf (Jewish)." },
  { name: "Modern Library", type: "origin", description: "Random House grew out of the Modern Library series." }
]);
updDesc('random-house-penguin', 'Co-founded by Bennett Cerf (Jewish) and Donald Klopfer (Jewish) in 1927. Random House merged with Penguin to form the world\'s largest trade book publisher. Imprints include Knopf (Blanche Knopf, Jewish, was co-founder), Crown, Doubleday, and many more. Bennett Cerf was also a famous TV personality on What\'s My Line?');

addConn('alfred-a-knopf', [
  { name: "Alfred A. Knopf Sr.", type: "founder", description: "Alfred A. Knopf Sr. founded the publisher in 1915." },
  { name: "Blanche Knopf", type: "co-founder", description: "Blanche Wolf Knopf (Jewish) was co-founder and a pioneering female publisher." },
  { name: "Random House", type: "parent", description: "Knopf is now an imprint of Penguin Random House." },
  { name: "Nobel Prize authors", type: "achievement", description: "Knopf has published more Nobel Prize-winning authors than any other American publisher." }
]);

// ============================================================
// US - RECORD LABELS
// ============================================================

addConn('atlantic-records', [
  { name: "Ahmet Ertegun", type: "co-founder", description: "Ahmet Ertegun (Turkish-American) co-founded Atlantic." },
  { name: "Jerry Wexler", type: "co-producer/executive", description: "Jerry Wexler (Jewish) was a legendary Atlantic Records executive who coined the term 'rhythm and blues.'" },
  { name: "Warner Music Group", type: "parent", description: "Atlantic is part of Warner Music Group." },
  { name: "Craig Kallman", type: "chairman", description: "Craig Kallman (Jewish) is chairman and CEO of Atlantic Records." },
  { name: "Led Zeppelin, Aretha Franklin", type: "legacy artists", description: "Atlantic's roster included some of the greatest artists in history." }
]);

addConn('interscope-records', [
  { name: "Jimmy Iovine", type: "co-founder", description: "Jimmy Iovine co-founded Interscope." },
  { name: "John Janick", type: "CEO", description: "John Janick is CEO of Interscope." },
  { name: "Universal Music Group", type: "parent", description: "Interscope is part of UMG." },
  { name: "Beats by Dre", type: "related venture", description: "Iovine and Dr. Dre co-founded Beats, sold to Apple for $3 billion." },
  { name: "Doug Morris", type: "former parent CEO", description: "Doug Morris (Jewish) was CEO of UMG." }
]);

// ============================================================
// US - LAW FIRMS
// ============================================================

addConn('skadden-arps-slate-meagher-flom', [
  { name: "Joseph Flom", type: "name partner", description: "Joseph Flom (Jewish) built Skadden into the largest law firm from a humble start." },
  { name: "M&A law", type: "specialty", description: "Skadden essentially created the modern M&A legal practice." },
  { name: "Corporate takeovers", type: "specialty", description: "Flom pioneered hostile takeover defense for corporate clients." },
  { name: "Revenue", type: "scale", description: "Skadden generates $3B+ in annual revenue." }
]);
updDesc('skadden-arps-slate-meagher-flom', 'Joseph Flom (Jewish) joined tiny Skadden Arps and built it into the world\'s most profitable law firm. Flom essentially invented the modern M&A legal practice and pioneered hostile takeover defense. Revenue exceeds $3 billion annually. The firm represents the pinnacle of Jewish achievement in American law - Flom rose from the immigrant Lower East Side to dominating Wall Street law.');

addConn('fried-frank-harris-shriver-jacobson', [
  { name: "Jewish founding partners", type: "founding", description: "Several founding partners were Jewish; the firm was one of the first major law firms to be openly Jewish-led." },
  { name: "Corporate law", type: "practice", description: "Major corporate and real estate law firm." },
  { name: "Real estate", type: "specialty", description: "Fried Frank is one of the top real estate law firms in NYC." }
]);

addConn('greenberg-traurig', [
  { name: "Jewish founders", type: "founding", description: "Founded in 1967 by Mel Greenberg, Larry Hoffman, and Robert Traurig (all Jewish) in Miami." },
  { name: "Jack Abramoff scandal", type: "controversy", description: "Former lobbyist Jack Abramoff worked at the firm before his corruption scandal." },
  { name: "Global reach", type: "scale", description: "Greenberg Traurig has 45+ offices worldwide and 2,700+ attorneys." },
  { name: "Israel practice", type: "specialty", description: "GT has a significant Israel practice group." }
]);

addConn('proskauer-rose', [
  { name: "Jewish founding", type: "founding", description: "Founded in 1875 as a Jewish-led firm when major WASP firms wouldn't hire Jewish lawyers." },
  { name: "Labor law", type: "specialty", description: "Proskauer is known for its labor and employment law practice." },
  { name: "Sports law", type: "specialty", description: "Proskauer is one of the top sports law firms, representing the NBA, NFL, and NHL." },
  { name: "MLB, NBA, NFL, NHL", type: "clients", description: "Proskauer represents all four major US sports leagues." }
]);

// ============================================================
// US - RETAIL
// ============================================================

addConn('macy-s', [
  { name: "Isidor Straus", type: "historic owner", description: "Isidor Straus (Jewish, German-born) co-owned Macy's and died on the Titanic in 1912." },
  { name: "Nathan Straus", type: "co-owner/philanthropist", description: "Nathan Straus (Jewish) co-owned Macy's and was a major philanthropist who pasteurized milk stations saving thousands of children." },
  { name: "Titanic", type: "historic connection", description: "Isidor and Ida Straus refused to be separated and went down with the Titanic together." },
  { name: "Herald Square", type: "flagship", description: "Macy's Herald Square is the world's largest department store." },
  { name: "Thanksgiving Day Parade", type: "cultural event", description: "The Macy's Thanksgiving Day Parade is one of America's most iconic cultural events." }
]);
updDesc('macy-s', 'Historic Jewish ownership: Isidor Straus (Jewish, German-born) and his brother Nathan Straus (Jewish) co-owned Macy\'s. Isidor and his wife Ida tragically died together on the Titanic in 1912, refusing to be separated - their story inspired the elderly couple scene in the movie Titanic. Nathan Straus was a great philanthropist who established pasteurized milk stations saving thousands of children. Macy\'s Herald Square is the world\'s largest store; the Thanksgiving Day Parade is an American icon.');

addConn('sears-roebuck-historic', [
  { name: "Julius Rosenwald", type: "historic president", description: "Julius Rosenwald (Jewish) transformed Sears into America's largest retailer." },
  { name: "Rosenwald Fund", type: "philanthropy", description: "Rosenwald gave away $70M (today ~$1B) helping build 5,000+ schools for Black children in the Jim Crow South." },
  { name: "Sears Tower", type: "landmark", description: "The Sears Tower (now Willis Tower) was the world's tallest building for 25 years." },
  { name: "Booker T. Washington", type: "partnership", description: "Rosenwald partnered with Booker T. Washington to build schools for African Americans." }
]);
updDesc('sears-roebuck-historic', 'Julius Rosenwald (Jewish) transformed Sears from a small mail-order business into America\'s largest retailer. Rosenwald was one of America\'s greatest philanthropists - he gave away $70 million (over $1 billion today), including funding 5,000+ "Rosenwald Schools" for Black children in the Jim Crow South, partnering with Booker T. Washington. The Sears Tower was the world\'s tallest building for 25 years.');

addConn('neiman-marcus', [
  { name: "Herbert Marcus", type: "co-founder", description: "Herbert Marcus (Jewish) co-founded Neiman Marcus in Dallas in 1907." },
  { name: "Carrie Marcus Neiman", type: "co-founder", description: "Carrie Marcus Neiman (Jewish) co-founded the store." },
  { name: "A.L. Neiman", type: "co-founder", description: "A.L. Neiman (Jewish) co-founded the store." },
  { name: "Stanley Marcus", type: "legendary merchant", description: "Stanley Marcus (Jewish) built Neiman Marcus into America's premier luxury retailer." },
  { name: "Dallas", type: "origin", description: "Founded in Dallas, Texas." }
]);

addConn('bloomingdales', [
  { name: "Joseph and Lyman Bloomingdale", type: "founders", description: "Founded by Joseph (Jewish) and Lyman Bloomingdale (Jewish) in 1861." },
  { name: "Macy's Inc.", type: "parent company", description: "Bloomingdale's is owned by Macy's Inc." },
  { name: "Luxury retail", type: "market position", description: "Bloomingdale's is one of America's premier upscale department stores." }
]);

// ============================================================
// US - CHARITIES
// ============================================================

addConn('friends-of-the-idf-fidf', [
  { name: "IDF", type: "beneficiary", description: "FIDF provides support to IDF soldiers and lone soldiers." },
  { name: "Lone soldiers", type: "program", description: "FIDF supports lone soldiers - those serving without family in Israel." },
  { name: "US Jewish community", type: "donor base", description: "FIDF raises hundreds of millions from US Jewish donors." },
  { name: "Annual gala", type: "fundraising", description: "FIDF galas are among the largest Jewish fundraising events in America." }
]);

addConn('nefesh-bnefesh', [
  { name: "Aliyah", type: "mission", description: "Nefesh B'Nefesh facilitates and encourages North American and British aliyah to Israel." },
  { name: "Jewish Agency", type: "partner", description: "Works in partnership with the Jewish Agency for Israel." },
  { name: "Israeli government", type: "partner", description: "Partners with the Israeli Ministry of Aliyah and Integration." },
  { name: "Tony Gelbart", type: "co-founder", description: "Tony Gelbart (Jewish) co-founded Nefesh B'Nefesh." },
  { name: "Rabbi Yehoshua Fass", type: "co-founder", description: "Rabbi Yehoshua Fass (Jewish) co-founded Nefesh B'Nefesh." }
]);

addConn('magen-david-adom', [
  { name: "Red Cross", type: "recognition", description: "MDA is Israel's national emergency medical service, recognized by the Red Cross." },
  { name: "Red Star of David", type: "symbol", description: "MDA uses the Red Star of David (Magen David Adom) as its emblem." },
  { name: "Blood services", type: "function", description: "MDA manages Israel's entire blood supply." },
  { name: "AFMDA", type: "US fundraising", description: "American Friends of MDA raises funds in the US for Israeli emergency services." }
]);

// ============================================================
// US - REMAINING ENTRIES
// ============================================================

addConn('loews-corporation', [
  { name: "Tisch family", type: "owners", description: "The Tisch family (Jewish) has controlled Loews for decades." },
  { name: "Larry Tisch", type: "former CEO", description: "Larry Tisch (Jewish) was CEO of Loews and also ran CBS." },
  { name: "CBS", type: "former ownership", description: "Larry Tisch owned CBS from 1986-1995." },
  { name: "NYU", type: "philanthropy", description: "The Tisch family donated extensively to NYU; the Tisch School of the Arts bears their name." },
  { name: "New York Giants", type: "family connection", description: "Steve Tisch (Jewish) co-owns the NY Giants." }
]);

addConn('new-york-giants-tisch-mara', [
  { name: "Steve Tisch", type: "co-owner", description: "Steve Tisch (Jewish) is co-owner and chairman of the NY Giants." },
  { name: "Tisch family", type: "family", description: "The Tisch family (Jewish) made their fortune through Loews Corporation." },
  { name: "John Mara", type: "co-owner", description: "John Mara is co-owner (Mara family)." },
  { name: "Larry Tisch", type: "family", description: "Steve's father Larry Tisch (Jewish) ran Loews Corp and CBS." },
  { name: "NYU Tisch School", type: "family philanthropy", description: "The Tisch family donated to NYU's Tisch School of the Arts." }
]);

addConn('berkshire-hathaway-israeli-investments', [
  { name: "Warren Buffett", type: "chairman", description: "Warren Buffett (not Jewish) runs Berkshire Hathaway." },
  { name: "ISCAR", type: "Israeli acquisition", description: "Buffett's first-ever acquisition outside the US was ISCAR Metalworking (Israeli) for $4 billion." },
  { name: "Eitan Wertheimer", type: "ISCAR chairman", description: "Eitan Wertheimer (Israeli Jewish) sold ISCAR to Buffett and has called Israel 'a great business environment.'" },
  { name: "Stef Wertheimer", type: "founder", description: "Stef Wertheimer (Israeli Jewish) founded ISCAR; pioneer of Israel's industrial parks." },
  { name: "Ajit Jain", type: "vice chairman", description: "Ajit Jain is vice chairman of insurance operations." }
]);
updDesc('berkshire-hathaway-israeli-investments', 'Warren Buffett\'s first acquisition outside the US was ISCAR Metalworking (Israeli), purchased for $4 billion from the Wertheimer family (Jewish). Stef Wertheimer (Israeli Jewish) founded ISCAR and pioneered Israel\'s industrial parks movement. Buffett has called Israel a remarkable country with enormous entrepreneurial energy. Berkshire owns 100% of ISCAR.');

// ============================================================
// US - PHARMA ADDITIONAL
// ============================================================

addConn('taro-pharmaceutical-industries-us', [
  { name: "Sun Pharmaceuticals", type: "parent", description: "Taro is a subsidiary of Sun Pharmaceuticals (Indian)." },
  { name: "Israeli origins", type: "history", description: "Taro was founded in Israel in 1959 at Kibbutz Beit Shemesh." },
  { name: "Generic dermatology", type: "specialty", description: "Taro is a leading manufacturer of generic dermatology products." }
]);

// ============================================================
// BRAZIL
// ============================================================

addConn('grupo-safra', [
  { name: "Safra family", type: "founding family", description: "The Safra family (Sephardic Jewish, Lebanese-Brazilian) founded the banking dynasty." },
  { name: "Joseph Safra", type: "patriarch", description: "Joseph Safra (Jewish) was the richest banker in the world until his death in 2020." },
  { name: "Banco Safra", type: "subsidiary", description: "Banco Safra is one of Brazil's largest private banks." },
  { name: "Edmond Safra", type: "family member", description: "Edmond Safra (Jewish) founded Republic National Bank of New York." },
  { name: "Chiquita Brands", type: "investment", description: "The Safra family owned Chiquita Brands." }
]);
updDesc('grupo-safra', 'The Safra family (Sephardic Jewish, Lebanese origin, Brazilian) is one of the wealthiest banking dynasties in the world. Joseph Safra was the world\'s richest banker until his death in 2020. Banco Safra is one of Brazil\'s largest private banks. Edmond Safra founded Republic National Bank of New York. The family\'s wealth exceeds $25 billion.');

// ============================================================
// INDIA
// ============================================================

addConn('bene-israel-community-organizations', [
  { name: "Bene Israel", type: "community", description: "The Bene Israel are an ancient Jewish community in India, primarily in Maharashtra." },
  { name: "2,000+ year history", type: "history", description: "The Bene Israel claim to have arrived in India 2,100+ years ago after a shipwreck." },
  { name: "Indian military", type: "community contribution", description: "Bene Israel have a proud tradition of serving in the Indian military." },
  { name: "Israel", type: "emigration", description: "Many Bene Israel emigrated to Israel beginning in the 1950s." }
]);

// ============================================================
// HUNGARY
// ============================================================

addConn('hungarian-jewish-community-organizations', [
  { name: "Dohány Street Synagogue", type: "landmark", description: "The Dohány Street Synagogue in Budapest is the largest synagogue in Europe." },
  { name: "Hungarian Holocaust", type: "history", description: "Over 500,000 Hungarian Jews were murdered in the Holocaust, mostly in 1944." },
  { name: "Raoul Wallenberg", type: "historic rescue", description: "Swedish diplomat Raoul Wallenberg saved tens of thousands of Hungarian Jews." },
  { name: "George Soros", type: "notable Hungarian Jew", description: "George Soros (Jewish) is a Holocaust survivor from Budapest." },
  { name: "Budapest", type: "center", description: "Budapest has one of the largest Jewish communities in Europe today." }
]);

// ============================================================
// NETHERLANDS
// ============================================================

addConn('dutch-jewish-community-organizations', [
  { name: "Anne Frank House", type: "landmark", description: "The Anne Frank House in Amsterdam is one of the most visited museums in the world." },
  { name: "Anne Frank", type: "historic figure", description: "Anne Frank (Jewish, German-born) hid in Amsterdam and wrote her famous diary." },
  { name: "Portuguese Synagogue", type: "landmark", description: "The Portuguese Synagogue of Amsterdam (1675) is one of the most important Jewish heritage sites." },
  { name: "Sephardic heritage", type: "history", description: "Amsterdam's Jewish community was historically Sephardic, descended from Spanish and Portuguese Jews." },
  { name: "Dutch Holocaust", type: "history", description: "75% of Dutch Jews were murdered in the Holocaust - the highest percentage in Western Europe." }
]);

// ============================================================
// MOROCCO
// ============================================================

addConn('moroccan-jewish-community-and-heritage', [
  { name: "King Mohammed VI", type: "royal protector", description: "Morocco's King Mohammed VI has been a protector of Moroccan Jewish heritage." },
  { name: "Abraham Accords", type: "normalization", description: "Morocco normalized relations with Israel under the Abraham Accords (2020)." },
  { name: "Casablanca Jewish community", type: "active community", description: "Casablanca has Morocco's last active Jewish community." },
  { name: "Jewish mellah", type: "heritage", description: "Historic Jewish quarters (mellahs) exist in Fez, Marrakech, and other cities." },
  { name: "Israeli Moroccans", type: "diaspora", description: "Over 1 million Israelis are of Moroccan Jewish descent - the largest Mizrachi community." }
]);
updDesc('moroccan-jewish-community-and-heritage', 'Morocco once had the largest Jewish community in the Arab world (250,000+). King Mohammed VI has protected Moroccan Jewish heritage, restoring synagogues and cemeteries. Morocco normalized relations with Israel under the Abraham Accords (2020). Over 1 million Israelis are of Moroccan descent - the largest Mizrachi community in Israel.');

// ============================================================
// TURKEY
// ============================================================

addConn('turkish-jewish-community', [
  { name: "Ottoman Empire refuge", type: "history", description: "The Ottoman Empire welcomed Jews expelled from Spain in 1492." },
  { name: "Sephardic heritage", type: "community", description: "Turkish Jews are primarily descended from Spanish Sephardic Jews." },
  { name: "Istanbul synagogues", type: "heritage", description: "Istanbul has historic synagogues including Neve Shalom." },
  { name: "Israel-Turkey relations", type: "diplomacy", description: "Turkey was the first Muslim-majority country to recognize Israel (1949)." }
]);

// ============================================================
// IRAN
// ============================================================

addConn('iranian-jewish-community', [
  { name: "2,700-year history", type: "history", description: "Iranian Jews have lived in Persia for 2,700+ years since the Babylonian exile." },
  { name: "Tomb of Esther and Mordechai", type: "heritage site", description: "The Tomb of Esther and Mordechai in Hamadan is a major Jewish pilgrimage site." },
  { name: "Constitutional seat", type: "political", description: "Iran's Jewish community has a guaranteed seat in the Iranian parliament (Majles)." },
  { name: "Cyrus the Great", type: "historic connection", description: "Cyrus the Great freed the Jews from the Babylonian captivity - Jews call him 'Messiah' in Isaiah 45:1." },
  { name: "Israeli-Iranian tensions", type: "geopolitics", description: "Despite Iran-Israel hostility, Iranian Jews maintain a community within Iran." }
]);
updDesc('iranian-jewish-community', 'One of the world\'s oldest Jewish communities - 2,700+ years since the Babylonian exile. Cyrus the Great freed Jews from Babylonian captivity; Jews call him "Messiah" in Isaiah 45:1. Iran\'s Jewish community has a guaranteed seat in parliament. The Tomb of Esther and Mordechai in Hamadan is a pilgrimage site. About 8,000-10,000 Jews remain in Iran despite the Islamic Republic.');

// ============================================================
// ETHIOPIA
// ============================================================

addConn('ethiopian-jewish-beta-israel-heritage', [
  { name: "Beta Israel", type: "community", description: "The Beta Israel are an ancient Jewish community in Ethiopia." },
  { name: "Operation Solomon", type: "rescue", description: "In 1991, Israel airlifted 14,325 Ethiopian Jews in 36 hours - a world record." },
  { name: "Operation Moses", type: "rescue", description: "In 1984, Israel secretly brought 8,000 Ethiopian Jews through Sudan." },
  { name: "Israeli Ethiopian community", type: "diaspora", description: "About 160,000 Ethiopians of Jewish descent live in Israel today." },
  { name: "El Al", type: "airlift partner", description: "El Al flew the Operation Solomon airlift." },
  { name: "Jewish Agency", type: "partner", description: "The Jewish Agency organized the Ethiopian aliyah operations." }
]);
updDesc('ethiopian-jewish-beta-israel-heritage', 'The Beta Israel claim descent from the Tribe of Dan and have practiced Judaism for millennia. Israel conducted two dramatic rescue operations: Operation Moses (1984, 8,000 Jews through Sudan) and Operation Solomon (1991, 14,325 in 36 hours - world record). About 160,000 Ethiopians of Jewish descent now live in Israel. Their integration has been both a source of pride and ongoing challenges.');

// ============================================================
// SWITZERLAND
// ============================================================

addConn('swiss-jewish-community-organizations', [
  { name: "First Zionist Congress", type: "historic significance", description: "The First Zionist Congress was held in Basel, Switzerland in 1897." },
  { name: "Theodor Herzl", type: "historic connection", description: "Herzl convened the First Zionist Congress in Basel." },
  { name: "Holocaust-era bank accounts", type: "controversy", description: "Swiss banks held dormant accounts of Holocaust victims; a $1.25B settlement was reached in 1998." },
  { name: "World Zionist Organization", type: "founded here", description: "The WZO was founded at the Basel congress." },
  { name: "Glencore", type: "business connection", description: "Glencore, founded by Marc Rich (Jewish), is headquartered in Switzerland." }
]);

// ============================================================
// ITALY
// ============================================================

addConn('italian-jewish-community-organizations', [
  { name: "Rome Ghetto", type: "heritage", description: "The Rome Ghetto (1555-1870) is one of the oldest Jewish ghettos in the world." },
  { name: "Vatican relations", type: "interfaith", description: "Italian Jews have a complex historic relationship with the Vatican." },
  { name: "Primo Levi", type: "notable figure", description: "Primo Levi (Jewish) was a Holocaust survivor and acclaimed author of 'If This Is a Man.'" },
  { name: "Venetian Ghetto", type: "heritage", description: "Venice's 'Ghetto' (1516) was the first Jewish ghetto - the word 'ghetto' originates here." }
]);

// ============================================================
// SPAIN
// ============================================================

addConn('spanish-jewish-sephardic-heritage', [
  { name: "Golden Age of Spain", type: "history", description: "Jews flourished during the Golden Age of Spain (10th-12th centuries) in Muslim-ruled Iberia." },
  { name: "1492 Expulsion", type: "history", description: "The Alhambra Decree of 1492 expelled all Jews from Spain." },
  { name: "Spanish citizenship law", type: "modern", description: "Spain passed a law in 2015 offering citizenship to descendants of Sephardic Jews." },
  { name: "Maimonides", type: "historic figure", description: "Maimonides (Rambam, 1135-1204) was born in Córdoba - one of the greatest Jewish scholars of all time." },
  { name: "Ladino language", type: "cultural heritage", description: "Sephardic Jews preserved Ladino (Judeo-Spanish) for 500+ years after the expulsion." }
]);
updDesc('spanish-jewish-sephardic-heritage', 'Jews flourished during the Golden Age of Spain (10th-12th centuries). Maimonides (1135-1204), born in Córdoba, was one of the greatest Jewish scholars in history. The Alhambra Decree of 1492 expelled all Jews from Spain, creating the Sephardic diaspora. Spain passed a law in 2015 offering citizenship to Sephardic descendants. Ladino (Judeo-Spanish) is still spoken by some Sephardic communities 500+ years later.');

// ============================================================
// POLAND
// ============================================================

addConn('museum-of-the-history-of-polish-jews-polin', [
  { name: "Polin", type: "meaning", description: "'Polin' means 'rest here' in Hebrew - the legendary name Polish Jews gave to the land." },
  { name: "Warsaw", type: "location", description: "Located on the site of the former Warsaw Ghetto." },
  { name: "Polish Jewish history", type: "mission", description: "Documents 1,000 years of Jewish life in Poland." },
  { name: "Holocaust", type: "history", description: "Poland was home to the largest pre-war Jewish population in Europe (3.3 million); 90% were murdered." },
  { name: "Warsaw Ghetto Uprising", type: "historic event", description: "Located near the site of the 1943 Warsaw Ghetto Uprising memorial." }
]);
updDesc('museum-of-the-history-of-polish-jews-polin', 'Located on the site of the former Warsaw Ghetto in Warsaw. "Polin" means "rest here" in Hebrew. Documents 1,000 years of Jewish civilization in Poland - once home to the largest Jewish community in Europe (3.3 million before WWII). 90% of Polish Jews were murdered in the Holocaust. The museum opened in 2013 and won the European Museum of the Year Award in 2016.');

// ============================================================
// CZECH REPUBLIC
// ============================================================

addConn('czech-jewish-community', [
  { name: "Prague Jewish Quarter", type: "heritage", description: "Prague's Josefov (Jewish Quarter) is one of the best-preserved Jewish heritage sites in Europe." },
  { name: "Old Jewish Cemetery", type: "landmark", description: "The Old Jewish Cemetery in Prague dates to the 15th century." },
  { name: "Altneuschul", type: "landmark", description: "The Old-New Synagogue (Altneuschul) in Prague is the oldest active synagogue in Europe (1270)." },
  { name: "Kafka", type: "notable figure", description: "Franz Kafka (Jewish) was born in Prague's Jewish Quarter." },
  { name: "Golem legend", type: "folklore", description: "The legend of the Golem of Prague is one of the most famous Jewish folklore stories." }
]);
updDesc('czech-jewish-community', 'Prague\'s Jewish Quarter (Josefov) is one of Europe\'s best-preserved Jewish heritage sites. The Old-New Synagogue (Altneuschul, 1270) is the oldest active synagogue in Europe. Franz Kafka (Jewish) was born in the Jewish Quarter. The legend of the Golem of Prague (Rabbi Loew creating a clay creature to protect Jews) is one of the most famous Jewish folklore stories.');

// ============================================================
// UKRAINE
// ============================================================

addConn('ukrainian-jewish-community-and-heritage', [
  { name: "Volodymyr Zelenskyy", type: "president", description: "President Zelenskyy (Jewish) is the first Jewish president of Ukraine." },
  { name: "Babi Yar", type: "historic site", description: "Babi Yar in Kyiv is where Nazis massacred 33,771 Jews in two days in 1941." },
  { name: "Hasidic origins", type: "religious history", description: "The Hasidic movement was founded in Ukraine by the Baal Shem Tov (Rabbi Israel ben Eliezer) in the 1740s." },
  { name: "Uman pilgrimage", type: "religious tourism", description: "Tens of thousands of Breslov Hasidim travel to Uman annually to visit Rabbi Nachman's grave." },
  { name: "Odessa Jewish history", type: "heritage", description: "Odessa was a major center of Jewish culture, Zionism, and Hebrew literature." }
]);
updDesc('ukrainian-jewish-community-and-heritage', 'Ukraine has deep Jewish history. The Hasidic movement was founded there by the Baal Shem Tov in the 1740s. Babi Yar in Kyiv saw the massacre of 33,771 Jews in two days (1941). President Volodymyr Zelenskyy is Jewish. Tens of thousands of Breslov Hasidim travel annually to Uman for Rabbi Nachman\'s grave. Odessa was a major center of Jewish culture and early Zionism.');

// ============================================================
// JAPAN & CHINA
// ============================================================

addConn('chabad-japan', [
  { name: "Chabad-Lubavitch", type: "parent movement", description: "Chabad Japan is part of the global Chabad-Lubavitch movement." },
  { name: "Tokyo synagogue", type: "facility", description: "Chabad runs the main synagogue services in Tokyo." },
  { name: "Japanese-Jewish relations", type: "community", description: "Chabad serves the small Jewish community in Japan, including businesspeople and diplomats." },
  { name: "Sugihara", type: "historic connection", description: "Japanese diplomat Chiune Sugihara saved 6,000+ Jews during the Holocaust by issuing transit visas." }
]);

addConn('kaifeng-jewish-history', [
  { name: "Jewish presence since 7th century", type: "history", description: "Jews lived in Kaifeng, China since at least the 7th century CE." },
  { name: "Matteo Ricci", type: "discovery", description: "Jesuit priest Matteo Ricci documented the Kaifeng Jewish community in 1605." },
  { name: "Assimilation", type: "fate", description: "The Kaifeng Jews gradually assimilated over centuries." },
  { name: "DNA studies", type: "modern", description: "Modern DNA studies have confirmed Middle Eastern ancestry among some Kaifeng Chinese." }
]);
updDesc('kaifeng-jewish-history', 'Jews settled in Kaifeng, China as early as the 7th century CE, making it one of the oldest Jewish diaspora communities in Asia. Jesuit priest Matteo Ricci documented the community in 1605. The community gradually assimilated over centuries. Modern DNA studies have confirmed Middle Eastern ancestry among some Kaifeng Chinese. A historic synagogue existed in Kaifeng until the 19th century.');

// ============================================================
// MEXICO
// ============================================================

addConn('mexican-jewish-community-organizations', [
  { name: "Carlos Slim (neighbor relationship)", type: "business context", description: "Mexico's Jewish community interacts with the broader Mexican business elite." },
  { name: "Crypto-Jews (Anusim)", type: "history", description: "Some Mexican Jews descend from crypto-Jews who came to New Spain during the colonial period." },
  { name: "Centro Deportivo Israelita", type: "community institution", description: "The CDI is one of the largest Jewish community centers in Latin America." },
  { name: "100,000+ community", type: "demographics", description: "Mexico has the largest Jewish community in Latin America outside Argentina and Brazil." }
]);

// ============================================================
// REMAINING - AUTO-CONNECT EVERYTHING WITHOUT CONNECTIONS
// ============================================================

// For any entries still without connections, add at least a general connection
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    if (!entry.connections || entry.connections.length === 0) {
      entry.connections = [];
      // Add at least a community/country connection
      if (country === 'Israel') {
        entry.connections.push({ name: "State of Israel", type: "national", description: `Part of Israel's institutional, business, or cultural landscape.` });
      } else if (country === 'United States') {
        entry.connections.push({ name: "American Jewish community", type: "community", description: `Connected to the American Jewish community infrastructure.` });
      } else {
        entry.connections.push({ name: `${country} Jewish community`, type: "community", description: `Part of the Jewish community and institutional presence in ${country}.` });
      }
      // If they have individuals, cross-reference them
      if (entry.individuals && entry.individuals.length > 0) {
        const topPerson = entry.individuals[0];
        if (topPerson.name) {
          entry.connections.push({ name: topPerson.name, type: "key individual", description: `${topPerson.name} is a key figure associated with ${entry.name}.` });
        }
      }
    }
  }
}

// ============================================================
// SAVE
// ============================================================

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0; for(const c in data.countries) for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;}
console.log(`Done! ${tc} entries, ${wc} with connections, ${Object.keys(people.people).length} people.`);
