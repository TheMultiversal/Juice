// addConnections3.js - Israel + International entries enrichment
// Run AFTER addConnections2.js
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
// ISRAEL - GOVERNMENT & SECURITY
// ============================================================

addConn('the-knesset', [
  { name: "Israeli parliamentary system", type: "system", description: "The Knesset is Israel's unicameral parliament with 120 members." },
  { name: "Prime Minister's Office", type: "executive connection", description: "The PM is drawn from the Knesset's coalition." },
  { name: "Basic Laws", type: "constitutional function", description: "The Knesset passes Basic Laws that serve as Israel's de facto constitution." },
  { name: "US Congress", type: "counterpart", description: "Strong relationship with the US Congress through AIPAC and other channels." },
  { name: "Yad Vashem", type: "partner", description: "The Knesset works closely with Yad Vashem on Holocaust remembrance." }
]);
updDesc('the-knesset', 'The Knesset is Israel\'s unicameral 120-seat parliament, located in Jerusalem. It is the supreme authority in Israel, passing laws, electing the president, and approving the government. Named after the Knesset HaGedolah (Great Assembly) of ancient Israel. All Israeli citizens over 18 can vote in Knesset elections through proportional representation.');

addConn('prime-ministers-office', [
  { name: "Mossad", type: "direct report", description: "The Mossad reports directly to the Prime Minister." },
  { name: "National Security Council", type: "advisory", description: "Israel's National Security Council advises the PM." },
  { name: "IDF", type: "commander-in-chief", description: "The PM is the de facto commander-in-chief of the IDF through the Defense Minister." },
  { name: "US White House", type: "counterpart", description: "The Israeli PM has a direct channel to the US President." },
  { name: "The Knesset", type: "accountability", description: "The PM is accountable to the Knesset." }
]);

addConn('ministry-of-defense-israel', [
  { name: "IDF", type: "oversees", description: "The Ministry of Defense oversees the Israel Defense Forces." },
  { name: "Rafael Advanced Defense Systems", type: "subsidiary", description: "Rafael (Iron Dome developer) operates under the Ministry of Defense." },
  { name: "Israel Aerospace Industries", type: "subsidiary", description: "IAI is a state-owned defense company under the ministry." },
  { name: "US Department of Defense", type: "counterpart/partner", description: "Close cooperation with the Pentagon on defense aid ($3.8B/year) and joint programs." },
  { name: "Iron Dome", type: "program", description: "The Ministry of Defense oversees Iron Dome missile defense." },
  { name: "Elbit Systems", type: "contractor", description: "Elbit is a major defense contractor for the ministry." }
]);

addConn('ministry-of-foreign-affairs-israel', [
  { name: "Abraham Accords", type: "diplomatic achievement", description: "Normalized relations with UAE, Bahrain, Morocco, and Sudan." },
  { name: "US State Department", type: "counterpart", description: "Close relationship with the US State Department." },
  { name: "UN engagement", type: "international", description: "Israel's diplomatic representation at the United Nations." },
  { name: "Embassies worldwide", type: "network", description: "Israel maintains embassies in 90+ countries." }
]);

addConn('idf-israel-defense-forces', [
  { name: "Unit 8200", type: "intelligence unit", description: "IDF's elite signals intelligence unit; alumni founded many Israeli tech companies." },
  { name: "Talpiot program", type: "elite program", description: "Talpiot is the IDF's most elite technology and science training program." },
  { name: "Ministry of Defense", type: "oversight", description: "The IDF operates under the Ministry of Defense." },
  { name: "Iron Dome", type: "defense system", description: "Rafael's Iron Dome protects Israel from rocket attacks." },
  { name: "US military aid", type: "partnership", description: "Israel receives $3.8 billion annually in US military aid." },
  { name: "Compulsory service", type: "system", description: "Most Israeli Jews serve 2-3 years of compulsory military service." },
  { name: "Israeli tech ecosystem", type: "pipeline", description: "IDF veterans, especially from Unit 8200, drive Israel's tech startup ecosystem." }
]);
updDesc('idf-israel-defense-forces', 'The Israel Defense Forces (IDF) comprises the army, navy, and air force. Most Jewish Israelis serve compulsory military service (3 years for men, 2 for women). Unit 8200 (signals intelligence) alumni have founded many of Israel\'s most successful tech companies (Check Point, Waze, NSO Group). The Talpiot program trains elite science/tech soldiers. Israel receives $3.8B annually in US military aid.');

addConn('shin-bet-shabak', [
  { name: "Mossad", type: "sister agency", description: "While Mossad handles external intelligence, Shin Bet handles internal security." },
  { name: "Prime Minister", type: "reports to", description: "Shin Bet reports directly to the Prime Minister." },
  { name: "Counterterrorism", type: "primary mission", description: "Shin Bet is responsible for counter-terrorism within Israel and the Palestinian territories." },
  { name: "NSO Group", type: "alumni/connection", description: "Some Shin Bet alumni work in the Israeli cyber-intelligence industry." },
  { name: "FBI/MI5", type: "counterparts", description: "Shin Bet cooperates with Western domestic intelligence agencies." }
]);

addConn('bank-of-israel', [
  { name: "Stanley Fischer", type: "former governor", description: "Stanley Fischer (Jewish, Zambian-born) was Governor 2005-2013; later vice chair of US Federal Reserve." },
  { name: "US Federal Reserve", type: "counterpart/influence", description: "Fischer went from Bank of Israel Governor to Fed Vice Chair." },
  { name: "Israeli shekel", type: "function", description: "The Bank of Israel manages monetary policy and the shekel." },
  { name: "Amir Yaron", type: "governor", description: "Amir Yaron (Jewish) served as Governor." }
]);
updDesc('bank-of-israel', 'Israel\'s central bank, responsible for monetary policy, banking regulation, and currency management. Stanley Fischer (Jewish, Zambian-born) served as Governor 2005-2013 and then became Vice Chairman of the US Federal Reserve, exemplifying the close ties between Israeli and American financial institutions.');

// ============================================================
// ISRAEL - UNIVERSITIES
// ============================================================

addConn('hebrew-university-of-jerusalem', [
  { name: "Albert Einstein", type: "founding supporter", description: "Einstein was a founder and donated his personal papers and royalties to Hebrew University." },
  { name: "Chaim Weizmann", type: "founding supporter", description: "Israel's first president helped establish the university." },
  { name: "Yissum", type: "tech transfer", description: "Yissum, Hebrew U's tech transfer company, has created 130+ spinoff companies." },
  { name: "Mobileye", type: "spinoff", description: "Mobileye (acquired by Intel for $15.3B) was founded by Hebrew U professor Amnon Shashua." },
  { name: "Nobel laureates", type: "academic achievement", description: "Multiple Hebrew University alumni and faculty have won Nobel Prizes." }
]);
updDesc('hebrew-university-of-jerusalem', 'Founded in 1918 on Mount Scopus, opened 1925. Albert Einstein was a founder and donated his personal papers. Israel\'s second-oldest university. Its tech transfer company Yissum has created 130+ spinoff companies including Mobileye ($15.3B acquisition by Intel). Consistently ranked among the world\'s top 100 universities.');

addConn('technion-israel-institute-of-technology', [
  { name: "Einstein Archives", type: "historical", description: "Einstein was an early supporter of the Technion." },
  { name: "Irwin Jacobs (Qualcomm)", type: "major donor", description: "Irwin Jacobs (Jewish) is a major Technion donor." },
  { name: "Nobel laureates", type: "achievements", description: "Technion has 4 Nobel Prize laureates." },
  { name: "Israeli tech industry", type: "pipeline", description: "Technion graduates are the backbone of Israel's tech and defense industries." },
  { name: "Haifa", type: "location", description: "Located in Haifa, Israel's tech capital." },
  { name: "MIT/Caltech", type: "counterpart", description: "Often called 'Israel's MIT.'" }
]);

addConn('tel-aviv-university', [
  { name: "TAU Ventures", type: "tech transfer", description: "TAU has a major technology transfer and startup program." },
  { name: "Tel Aviv", type: "location", description: "Located in Tel Aviv, Israel's tech and business hub." },
  { name: "IDF connections", type: "pipeline", description: "Many TAU students serve in IDF intelligence before or during studies." },
  { name: "Coller School of Management", type: "business school", description: "Named after British-Israeli billionaire Jeremy Coller (Jewish)." }
]);

addConn('weizmann-institute-of-science', [
  { name: "Chaim Weizmann", type: "founder", description: "Founded by Chaim Weizmann (Jewish), Israel's first president, in 1934." },
  { name: "WEIZAC", type: "historic achievement", description: "Built one of the world's first computers (WEIZAC) in 1955." },
  { name: "Yeda Research", type: "tech transfer", description: "Yeda is one of the most profitable tech transfer companies globally." },
  { name: "Copaxone", type: "achievement", description: "Weizmann researchers developed Copaxone, the MS drug generating billions in revenue for Teva." },
  { name: "Nobel laureates", type: "academic achievement", description: "Multiple Weizmann Institute scientists have won Nobel Prizes." }
]);
updDesc('weizmann-institute-of-science', 'Founded by Chaim Weizmann (Israel\'s first president) in Rehovot in 1934. One of the world\'s leading multidisciplinary research institutions. Built one of the first computers (WEIZAC, 1955). Researchers developed Copaxone (MS drug generating billions for Teva). Yeda Research, its tech transfer arm, is one of the most profitable globally. Multiple Weizmann scientists have won Nobel Prizes.');

addConn('ben-gurion-university-of-the-negev', [
  { name: "David Ben-Gurion", type: "namesake", description: "Named after Israel's founding prime minister David Ben-Gurion." },
  { name: "Beer Sheva", type: "location", description: "Located in Beer Sheva, the capital of the Negev." },
  { name: "Cybersecurity", type: "expertise", description: "BGU is a global leader in cybersecurity research; the national cyber park is nearby." },
  { name: "IDF Cyber Command", type: "connection", description: "IDF is moving cyber units to Beer Sheva near BGU." }
]);

addConn('bar-ilan-university', [
  { name: "Mizrachi movement", type: "founding body", description: "Founded by US religious Zionist movement in 1955." },
  { name: "Ramat Gan", type: "location", description: "Located in Ramat Gan, near Tel Aviv." },
  { name: "Brain research", type: "expertise", description: "Bar-Ilan has a leading brain research center (the Gonda center)." }
]);

// ============================================================
// ISRAEL - TECH
// ============================================================

addConn('monday-com', [
  { name: "Roy Mann", type: "co-founder & CEO", description: "Roy Mann (Israeli Jewish) co-founded Monday.com." },
  { name: "Eran Zinman", type: "co-founder", description: "Eran Zinman (Israeli Jewish) co-founded Monday.com." },
  { name: "Tel Aviv Stock Exchange", type: "listing", description: "Monday.com is listed on Nasdaq and followed by TASE." },
  { name: "Work management industry", type: "market", description: "Competes with Asana, Notion, and other work management platforms." },
  { name: "IPO", type: "milestone", description: "Monday.com went public in 2021 at a $7.5B valuation." }
]);

addConn('ironsource', [
  { name: "Unity Technologies", type: "merger", description: "ironSource merged with Unity Technologies in 2022 for $4.4B." },
  { name: "Tomer Bar-Zeev", type: "co-founder", description: "Tomer Bar-Zeev (Israeli Jewish) co-founded ironSource." },
  { name: "Mobile gaming", type: "industry", description: "ironSource was a major platform for mobile app monetization and marketing." },
  { name: "Tel Aviv", type: "headquarters", description: "Founded and headquartered in Tel Aviv." }
]);

addConn('playtika', [
  { name: "Robert Antokol", type: "co-founder & CEO", description: "Robert Antokol (Israeli Jewish) co-founded Playtika." },
  { name: "Giant Interactive", type: "former owner", description: "Chinese company Giant Interactive acquired Playtika for $4.4B." },
  { name: "Mobile gaming", type: "industry", description: "Playtika operates social and casual mobile games with $2B+ annual revenue." },
  { name: "Caesars Interactive", type: "acquisition", description: "Playtika acquired Caesars Interactive Entertainment." }
]);

addConn('waze', [
  { name: "Google", type: "acquirer", description: "Google acquired Waze for $1.15 billion in 2013." },
  { name: "Ehud Shabtai", type: "co-founder", description: "Ehud Shabtai (Israeli Jewish) co-founded Waze." },
  { name: "Uri Levine", type: "co-founder", description: "Uri Levine (Israeli Jewish) co-founded Waze." },
  { name: "Amir Shinar", type: "co-founder", description: "Amir Shinar (Israeli Jewish) co-founded Waze." },
  { name: "Navigation disruption", type: "innovation", description: "Waze disrupted the navigation industry with crowd-sourced traffic data." },
  { name: "Tel Aviv", type: "origin", description: "Founded in Israel; remains HQ'd in Tel Aviv under Google." }
]);
updDesc('waze', 'Founded by Ehud Shabtai, Uri Levine, and Amir Shinar (all Israeli Jewish) in 2006. Waze pioneered crowd-sourced real-time traffic navigation. Acquired by Google for $1.15 billion in 2013 — one of the largest Israeli tech exits at the time. Waze continues to operate from Tel Aviv under Google\'s umbrella.');

addConn('nso-group', [
  { name: "Shalev Hulio", type: "co-founder", description: "Shalev Hulio (Israeli Jewish) co-founded NSO Group." },
  { name: "Pegasus spyware", type: "product", description: "NSO's Pegasus spyware can infiltrate any smartphone; sold to governments worldwide." },
  { name: "Unit 8200", type: "alumni origin", description: "NSO founders are alumni of IDF's Unit 8200 signals intelligence." },
  { name: "International controversy", type: "controversy", description: "Pegasus was used to surveil journalists, activists, and political opponents worldwide." },
  { name: "Israeli Ministry of Defense", type: "export oversight", description: "NSO's sales require Israeli Defense Ministry export approval." },
  { name: "US blacklist", type: "sanction", description: "The US Commerce Department blacklisted NSO in 2021." }
]);
updDesc('nso-group', 'Founded by Shalev Hulio and Omri Lavie (Israeli Jewish, Unit 8200 alumni). NSO Group developed Pegasus, the most powerful spyware ever created, capable of infiltrating any smartphone. Sold to governments worldwide for counter-terrorism but controversially used to surveil journalists, dissidents, and political opponents. Blacklisted by the US Commerce Department in 2021. Represents the controversial side of Israel\'s cyber-intelligence industry.');

addConn('cellebrite', [
  { name: "Digital forensics", type: "industry", description: "Cellebrite is the world leader in digital forensics and mobile device extraction." },
  { name: "Law enforcement", type: "clients", description: "Used by FBI, police forces, and intelligence agencies in 150+ countries." },
  { name: "Israeli intelligence ecosystem", type: "industry", description: "Part of Israel's broader cyber/intelligence tech industry." },
  { name: "SPAC listing", type: "milestone", description: "Cellebrite went public via SPAC in 2021." }
]);

addConn('sentinelone', [
  { name: "Tomer Weingarten", type: "co-founder & CEO", description: "Tomer Weingarten (Israeli Jewish) co-founded SentinelOne." },
  { name: "IDF intelligence", type: "alumni origin", description: "Weingarten served in Israeli intelligence." },
  { name: "Cybersecurity", type: "industry", description: "SentinelOne is a leading AI-powered endpoint cybersecurity company." },
  { name: "IPO", type: "milestone", description: "SentinelOne IPO'd in 2021, the largest cybersecurity IPO at the time ($8.9B valuation)." }
]);

addConn('jfrog', [
  { name: "Shlomi Ben Haim", type: "co-founder & CEO", description: "Shlomi Ben Haim (Israeli Jewish) co-founded JFrog." },
  { name: "DevOps", type: "industry", description: "JFrog provides DevOps tools for software delivery." },
  { name: "IPO (2020)", type: "milestone", description: "JFrog IPO'd on Nasdaq in 2020." },
  { name: "Netanya", type: "headquarters", description: "JFrog is headquartered in Netanya, Israel." }
]);

addConn('snyk', [
  { name: "Guy Podjarny", type: "co-founder", description: "Guy Podjarny (Israeli Jewish) co-founded Snyk." },
  { name: "Developer security", type: "industry", description: "Snyk provides developer-first security tools for finding and fixing vulnerabilities." },
  { name: "Israeli cyber ecosystem", type: "industry", description: "Part of Israel's booming cybersecurity startup scene." },
  { name: "Unicorn status", type: "milestone", description: "Snyk was valued at $8.5B in 2021." }
]);

addConn('payoneer', [
  { name: "Yuval Tal", type: "founder", description: "Yuval Tal (Israeli Jewish) founded Payoneer in 2005." },
  { name: "Cross-border payments", type: "industry", description: "Payoneer facilitates cross-border payments for freelancers, marketplaces, and SMBs." },
  { name: "SPAC listing", type: "milestone", description: "Payoneer went public via SPAC in 2021." },
  { name: "Amazon", type: "partnership", description: "Payoneer is a key payment partner for Amazon marketplace sellers." }
]);

addConn('taboola', [
  { name: "Adam Singolda", type: "founder & CEO", description: "Adam Singolda (Israeli Jewish) founded Taboola." },
  { name: "Content recommendation", type: "industry", description: "Taboola is the world's largest content recommendation platform." },
  { name: "Outbrain", type: "competitor", description: "Taboola's main competitor; the two almost merged." },
  { name: "Publishers", type: "clients", description: "Taboola serves content recommendations on major news websites worldwide." }
]);

addConn('outbrain', [
  { name: "Yaron Galai", type: "co-founder", description: "Yaron Galai (Israeli Jewish) co-founded Outbrain." },
  { name: "Ori Lahav", type: "co-founder", description: "Ori Lahav (Israeli Jewish) co-founded Outbrain." },
  { name: "Content recommendation", type: "industry", description: "Outbrain is a leading content recommendation platform." },
  { name: "Taboola", type: "competitor", description: "Taboola is Outbrain's main competitor; the two almost merged." },
  { name: "IPO (2021)", type: "milestone", description: "Outbrain went public on Nasdaq in 2021." }
]);

addConn('amdocs', [
  { name: "Telecom industry", type: "market", description: "Amdocs is the largest provider of software and services to telecom companies worldwide." },
  { name: "AT&T", type: "client", description: "AT&T is one of Amdocs' largest clients." },
  { name: "Israel/US dual headquarters", type: "operations", description: "Amdocs was founded in Israel and is headquartered in both Chesterfield, MO and Ra'anana, Israel." },
  { name: "Revenue", type: "scale", description: "Amdocs generates $4.5B+ annual revenue." }
]);

addConn('solaredge-technologies', [
  { name: "Guy Sella", type: "founder", description: "Guy Sella (Israeli Jewish, deceased 2019) founded SolarEdge." },
  { name: "Solar energy", type: "industry", description: "SolarEdge is a global leader in solar energy technology and power optimizers." },
  { name: "Nasdaq listing", type: "milestone", description: "SolarEdge is listed on Nasdaq." },
  { name: "Herzliya", type: "headquarters", description: "Headquartered in Herzliya, Israel." },
  { name: "Clean energy", type: "impact", description: "SolarEdge has installed power optimizers in solar installations worldwide." }
]);

addConn('netafim', [
  { name: "Kibbutz Hatzerim", type: "origin", description: "Netafim was invented at Kibbutz Hatzerim in the Negev Desert." },
  { name: "Drip irrigation", type: "innovation", description: "Netafim pioneered modern drip irrigation technology." },
  { name: "Simcha Blass", type: "inventor", description: "Simcha Blass (Israeli Jewish) invented the modern drip irrigation system." },
  { name: "Global agriculture", type: "impact", description: "Netafim's drip irrigation is used in 110+ countries, revolutionizing water-efficient farming." },
  { name: "Mexichem (Orbia)", type: "owner", description: "Mexican company Orbia acquired a majority stake in Netafim." }
]);
updDesc('netafim', 'Pioneered modern drip irrigation at Kibbutz Hatzerim in the Negev Desert. Simcha Blass (Israeli Jewish) invented the technology. Netafim\'s drip irrigation systems are used in 110+ countries, revolutionizing water-efficient agriculture globally. Israel\'s leadership in water technology stems largely from Netafim\'s innovations. Majority owned by Orbia (Mexico).');

// ============================================================
// ISRAEL - DEFENSE
// ============================================================

addConn('imi-systems-israel-military-industries', [
  { name: "Ministry of Defense", type: "oversight", description: "IMI was a state-owned defense company." },
  { name: "Elbit Systems", type: "acquirer", description: "Elbit Systems acquired IMI Systems in 2018." },
  { name: "Iron Dome", type: "contribution", description: "IMI contributed components to Israel's missile defense systems." },
  { name: "Small arms", type: "products", description: "IMI produced the Uzi submachine gun, one of the most iconic firearms in history." },
  { name: "Uzi Gal", type: "inventor", description: "Uzi Gal (Israeli Jewish) invented the Uzi submachine gun." }
]);

// ============================================================
// ISRAEL - BANKING
// ============================================================

addConn('bank-hapoalim', [
  { name: "Histadrut", type: "historic owner", description: "Originally founded by the Histadrut (Israeli labor federation) in 1921." },
  { name: "Bank of Israel", type: "regulator", description: "Regulated by the Bank of Israel." },
  { name: "Largest Israeli bank", type: "market position", description: "Bank Hapoalim is Israel's largest bank." },
  { name: "US DOJ settlement", type: "legal", description: "Paid $874M to settle US tax evasion charges in 2020." }
]);

addConn('bank-leumi', [
  { name: "Theodor Herzl", type: "founding inspiration", description: "Leumi traces its origins to the Anglo-Palestine Company founded in 1902 by the Zionist movement." },
  { name: "Bank of Israel", type: "regulator", description: "Regulated by the Bank of Israel." },
  { name: "Second largest bank", type: "market position", description: "Bank Leumi is Israel's second-largest bank." },
  { name: "Leumi Tech", type: "tech banking", description: "Leumi Tech is Israel's leading tech banking division." }
]);
updDesc('bank-leumi', 'Israel\'s second-largest bank. Traces its origins to the Anglo-Palestine Company, founded in 1902 by the World Zionist Organization — making it effectively the bank of the Zionist movement. Renamed Bank Leumi ("National Bank") after Israeli independence. Leumi Tech is Israel\'s leading technology banking and lending division.');

addConn('israel-discount-bank', [
  { name: "Leon Recanati", type: "founding family", description: "Founded by the Recanati family (Sephardic Jewish, Greek origin) in 1935." },
  { name: "IDB Group", type: "related", description: "Connected to the IDB Group conglomerate." },
  { name: "Third largest bank", type: "market position", description: "Israel Discount Bank is Israel's third-largest bank." }
]);

// ============================================================
// ISRAEL - FOOD
// ============================================================

addConn('strauss-group', [
  { name: "Strauss family", type: "founding family", description: "Founded by Richard and Hilda Strauss (Jewish, German immigrants) in Nahariya in 1936." },
  { name: "Sabra Hummus", type: "joint venture", description: "Strauss co-owns Sabra Hummus with PepsiCo." },
  { name: "Elite Coffee", type: "brand", description: "Strauss owns Elite, Israel's most iconic coffee brand." },
  { name: "PepsiCo", type: "partner", description: "PepsiCo partners with Strauss on Sabra and other brands." },
  { name: "BDS target", type: "controversy", description: "Strauss has been targeted by BDS campaigns." }
]);

addConn('tnuva', [
  { name: "Kibbutz movement", type: "origin", description: "Tnuva was founded by the kibbutz movement in 1926." },
  { name: "Bright Food (China)", type: "owner", description: "Chinese company Bright Food acquired Tnuva in 2014." },
  { name: "Dairy market", type: "market position", description: "Tnuva controls ~70% of Israel's dairy market." },
  { name: "Israeli icon", type: "cultural significance", description: "Tnuva is one of Israel's most iconic brands." }
]);

addConn('osem-nestl-israel', [
  { name: "Nestlé", type: "parent company", description: "Nestlé acquired full ownership of Osem." },
  { name: "Bamba", type: "iconic product", description: "Osem produces Bamba, Israel's most iconic snack — a peanut-flavored puffed corn snack." },
  { name: "Israeli food culture", type: "cultural significance", description: "Osem is central to Israeli food culture; most Israeli pantries contain Osem products." }
]);

// ============================================================
// ISRAEL - MEDIA
// ============================================================

addConn('haaretz', [
  { name: "Schocken family", type: "owners", description: "The Schocken family (Jewish, German-origin) has owned Haaretz since 1935." },
  { name: "Amos Schocken", type: "publisher", description: "Amos Schocken (Jewish) is publisher of Haaretz." },
  { name: "Left-leaning editorial", type: "editorial stance", description: "Haaretz is Israel's most left-leaning major newspaper." },
  { name: "English edition", type: "reach", description: "Haaretz publishes an English edition widely read internationally." },
  { name: "New York Times", type: "counterpart", description: "Often compared to the NYT for its investigative journalism." }
]);
updDesc('haaretz', 'Israel\'s oldest daily newspaper, founded in 1918. Owned by the Schocken family (Jewish, German-origin) since 1935. Known for independent, left-leaning editorial positions and investigative journalism. Publishes both Hebrew and English editions. Its English edition is widely read by international policy makers and journalists covering Israel.');

addConn('the-jerusalem-post', [
  { name: "Eli Azur", type: "owner", description: "Owned by Eli Azur (Israeli Jewish)." },
  { name: "English-language Israeli media", type: "niche", description: "The Jerusalem Post is Israel's leading English-language newspaper." },
  { name: "International readership", type: "reach", description: "Widely read by Jewish diaspora communities and international audiences." },
  { name: "Founded 1932", type: "history", description: "Founded as The Palestine Post in 1932, before Israeli independence." }
]);

addConn('yedioth-ahronoth', [
  { name: "Yedioth Ahronoth Group", type: "media conglomerate", description: "One of Israel's largest media groups." },
  { name: "Ynet", type: "digital platform", description: "Ynet is Israel's most-visited news website." },
  { name: "Moses family", type: "founding family", description: "Founded by the Moses family (Jewish)." },
  { name: "Arnon Mozes", type: "publisher", description: "Arnon Mozes (Jewish) is the longtime publisher." }
]);

addConn('israel-hayom', [
  { name: "Sheldon Adelson", type: "founder", description: "Founded by Sheldon Adelson (Jewish, American billionaire) in 2007 as a free daily." },
  { name: "Miriam Adelson", type: "owner", description: "Now owned by Miriam Adelson (Jewish, Israeli-American) after Sheldon's death." },
  { name: "Pro-Netanyahu", type: "editorial stance", description: "Widely seen as supportive of Benjamin Netanyahu; nicknamed 'Bibiton.'" },
  { name: "Las Vegas Sands", type: "funding source", description: "Adelson funded Israel Hayom from his casino fortune." },
  { name: "Largest circulation", type: "market position", description: "Israel Hayom became Israel's most-read newspaper as a free daily." }
]);
updDesc('israel-hayom', 'Free daily newspaper founded by Sheldon Adelson (Jewish, American casino billionaire) in 2007. Now owned by his widow Miriam Adelson (Jewish, Israeli-American). Became Israel\'s most-read newspaper due to free distribution. Widely viewed as supportive of Benjamin Netanyahu, earning the nickname "Bibiton" (Bibi\'s paper). Funded from Adelson\'s casino fortune.');

addConn('i24news', [
  { name: "Patrick Drahi", type: "owner", description: "Patrick Drahi (Jewish, French-Israeli-Portuguese) owns i24NEWS through Altice." },
  { name: "Altice", type: "parent company", description: "i24NEWS is part of Drahi's Altice media empire." },
  { name: "International coverage", type: "mission", description: "i24NEWS broadcasts in English, French, and Arabic from Tel Aviv." },
  { name: "Tel Aviv", type: "headquarters", description: "Headquartered in Tel Aviv's Jaffa Port." }
]);

// ============================================================
// ISRAEL - CULTURE & HERITAGE
// ============================================================

addConn('yad-vashem', [
  { name: "Holocaust remembrance", type: "mission", description: "Israel's official Holocaust memorial and the world's largest Holocaust archive." },
  { name: "The Knesset", type: "established by", description: "Yad Vashem was established by Knesset law in 1953." },
  { name: "Righteous Among the Nations", type: "program", description: "Yad Vashem leads the program to honor non-Jews who saved Jews during the Holocaust." },
  { name: "International diplomacy", type: "role", description: "Every foreign head of state visiting Israel visits Yad Vashem." },
  { name: "Steven Spielberg", type: "related project", description: "Spielberg's Shoah Foundation works alongside Yad Vashem in testimony preservation." }
]);
updDesc('yad-vashem', 'Israel\'s official Holocaust memorial, museum, and archive, established by Knesset law in 1953 on the Mount of Remembrance in Jerusalem. Houses the world\'s largest collection of Holocaust documentation. The "Righteous Among the Nations" program honors non-Jews who risked their lives to save Jews. Virtually every foreign head of state visiting Israel pays respects at Yad Vashem.');

addConn('israel-museum', [
  { name: "Shrine of the Book", type: "exhibit", description: "Houses the Dead Sea Scrolls in the iconic Shrine of the Book." },
  { name: "Dead Sea Scrolls", type: "artifact", description: "The museum houses the Dead Sea Scrolls, among the most important archaeological finds in history." },
  { name: "Jerusalem", type: "location", description: "Located in Jerusalem, near the Knesset." },
  { name: "Israeli art", type: "collection", description: "The largest cultural institution in Israel with 500,000+ objects." }
]);

addConn('habima-national-theatre', [
  { name: "Hebrew theater", type: "mission", description: "Habima is the national theater of Israel and the first Hebrew-language theater in the world." },
  { name: "Moscow origins", type: "history", description: "Originally founded in Moscow in 1917; relocated to Palestine in 1931." },
  { name: "Tel Aviv", type: "location", description: "Located on Habima Square in central Tel Aviv." },
  { name: "UNESCO", type: "recognition", description: "Recognized by UNESCO as one of the world's most important theaters." }
]);

addConn('israel-philharmonic-orchestra', [
  { name: "Bronislaw Huberman", type: "founder", description: "Bronislaw Huberman (Jewish, Polish violinist) founded the IPO in 1936 to give employment to Jewish musicians fleeing Nazi Europe." },
  { name: "Arturo Toscanini", type: "historic connection", description: "Legendary conductor Toscanini conducted the IPO's inaugural concert." },
  { name: "Zubin Mehta", type: "music director", description: "Zubin Mehta served as music director for nearly 50 years." },
  { name: "Holocaust rescue", type: "founding story", description: "The IPO was founded to rescue Jewish musicians from Nazi persecution." }
]);
updDesc('israel-philharmonic-orchestra', 'Founded in 1936 by Bronislaw Huberman (Jewish, Polish violinist) to provide employment to Jewish musicians fleeing Nazi persecution in Europe. Arturo Toscanini conducted its inaugural concert. Zubin Mehta served as music director for nearly 50 years. One of the world\'s premier orchestras. The founding of the IPO is itself a Holocaust rescue story.');

// ============================================================
// ISRAEL - INFRASTRUCTURE & ENERGY
// ============================================================

addConn('world-zionist-organization', [
  { name: "Theodor Herzl", type: "founder", description: "Founded by Theodor Herzl at the First Zionist Congress in Basel, 1897." },
  { name: "Zionist movement", type: "mission", description: "The WZO is the umbrella organization for the global Zionist movement." },
  { name: "Jewish Agency", type: "partner", description: "Works closely with the Jewish Agency for Israel." },
  { name: "State of Israel", type: "predecessor", description: "The WZO was instrumental in establishing the State of Israel." },
  { name: "Balfour Declaration", type: "historic achievement", description: "Chaim Weizmann's lobbying of the WZO contributed to the 1917 Balfour Declaration." }
]);
updDesc('world-zionist-organization', 'Founded by Theodor Herzl at the First Zionist Congress in Basel, Switzerland in 1897. The WZO is the founding organization of the modern Zionist movement that led to the creation of the State of Israel. The WZO played a key role in the Balfour Declaration (1917) and the establishment of Israel (1948). Still active in promoting Zionism and Israel-diaspora relations.');

addConn('keren-kayemet-leyisrael-jewish-national-fund', [
  { name: "Afforestation", type: "mission", description: "JNF has planted 250+ million trees in Israel since 1901." },
  { name: "Land development", type: "role", description: "JNF owns 13% of Israel's land and manages development." },
  { name: "World Zionist Organization", type: "origin", description: "KKL-JNF was founded by the Fifth Zionist Congress in 1901." },
  { name: "Water projects", type: "infrastructure", description: "JNF has built hundreds of reservoirs and water projects in the Negev." },
  { name: "Blue Box", type: "iconic symbol", description: "The JNF Blue Box (pushke) is one of the most iconic fundraising tools in Jewish history." }
]);

addConn('el-al-israel-airlines', [
  { name: "State of Israel", type: "ownership", description: "El Al was Israel's state-owned airline before privatization." },
  { name: "Operation Solomon", type: "historic flight", description: "In 1991, El Al flew 14,325 Ethiopian Jews to Israel in 36 hours — a world record for most passengers on a plane." },
  { name: "Security", type: "reputation", description: "El Al is considered the most secure airline in the world." },
  { name: "Shabbat observance", type: "cultural", description: "El Al historically did not fly on Shabbat (though this has been debated)." },
  { name: "Entebbe rescue", type: "historic role", description: "El Al planes were involved in the aftermath of the Entebbe hijacking." }
]);
updDesc('el-al-israel-airlines', 'Israel\'s national airline. In 1991, El Al set a world record by airlifting 14,325 Ethiopian Jews in 36 hours during Operation Solomon. Considered the most secure airline in the world with armed sky marshals. Historically did not fly on Shabbat. El Al planes have been part of historic moments including post-Entebbe and mass aliyah operations.');

addConn('bezeq-israeli-telecommunications', [
  { name: "Eurocom Group", type: "former owner", description: "Controlled by the Eurocom Group (Shaul Elovitch, Jewish) for years." },
  { name: "Netanyahu Case 4000", type: "political scandal", description: "Bezeq was central to 'Case 4000' — allegations that Netanyahu promoted regulations favoring Bezeq in exchange for favorable media coverage on its Walla! news site." },
  { name: "Israel telecom market", type: "market position", description: "Bezeq is Israel's largest telecommunications company." },
  { name: "yes TV", type: "subsidiary", description: "Bezeq owns yes, Israel's satellite TV platform." }
]);

addConn('delek-group', [
  { name: "Yitzhak Tshuva", type: "controlling shareholder", description: "Yitzhak Tshuva (Israeli Jewish) controls Delek Group." },
  { name: "Leviathan gas field", type: "key asset", description: "Delek had a major stake in the Leviathan natural gas field, one of the largest offshore gas finds." },
  { name: "Israeli energy independence", type: "impact", description: "Delek's gas discoveries helped move Israel toward energy independence." },
  { name: "Real estate", type: "diversification", description: "Tshuva also has major real estate holdings including the Plaza Hotel in NYC." }
]);

addConn('israel-electric-corporation', [
  { name: "State of Israel", type: "owner", description: "IEC is a state-owned company providing virtually all of Israel's electricity." },
  { name: "Monopoly", type: "market position", description: "IEC has a near-monopoly on electricity generation and distribution in Israel." },
  { name: "Infrastructure", type: "role", description: "IEC operates Israel's national power grid." }
]);

// ============================================================
// ISRAEL - REAL ESTATE
// ============================================================

addConn('azrieli-group', [
  { name: "David Azrieli", type: "founder", description: "David Azrieli (Jewish, Polish-born, Canadian-Israeli) founded the Azrieli Group." },
  { name: "Azrieli Center Tel Aviv", type: "landmark", description: "The Azrieli Center towers are among Tel Aviv's most iconic buildings." },
  { name: "Azrieli Foundation", type: "philanthropy", description: "The Azrieli Foundation supports architecture, education, and Israeli institutions." },
  { name: "Danna Azrieli", type: "current chair", description: "Danna Azrieli (Jewish) is chairperson of the Azrieli Group." },
  { name: "Canada connection", type: "origin", description: "Azrieli built his fortune in Canadian real estate before expanding to Israel." }
]);

addConn('africa-israel-investments', [
  { name: "Lev Leviev", type: "chairman", description: "Lev Leviev (Jewish, Uzbek-born Israeli) is chairman of Africa Israel." },
  { name: "Diamond industry", type: "business", description: "Leviev is known as the 'King of Diamonds' and challenged De Beers' monopoly." },
  { name: "Settlement construction", type: "controversy", description: "Africa Israel was involved in construction in Israeli settlements, generating controversy." },
  { name: "West Bank settlements", type: "political", description: "AFI's settlement construction led to BDS boycott campaigns." },
  { name: "Uzbekistan", type: "origin", description: "Leviev was born in Uzbekistan and immigrated to Israel as a teenager." }
]);

// ============================================================
// ISRAEL - PHARMA
// ============================================================

addConn('teva-pharmaceutical-industries', [
  { name: "Generic drugs", type: "market position", description: "Teva is the world's largest generic drug manufacturer." },
  { name: "Copaxone", type: "flagship product", description: "Copaxone (for multiple sclerosis) was Teva's flagship drug, developed at the Weizmann Institute." },
  { name: "Weizmann Institute", type: "research partner", description: "Copaxone was developed at the Weizmann Institute." },
  { name: "Opioid crisis", type: "legal", description: "Teva paid $4.25 billion to settle US opioid lawsuits." },
  { name: "Israeli pharma leadership", type: "industry", description: "Teva is the largest Israeli company by revenue." }
]);
updDesc('teva-pharmaceutical-industries', 'The world\'s largest generic drug manufacturer, headquartered in Tel Aviv. Founded in 1901. Teva\'s flagship drug Copaxone (for multiple sclerosis) was developed at the Weizmann Institute of Science. Teva paid $4.25 billion to settle US opioid lawsuits. Revenue exceeds $15B annually. Teva is the largest Israeli company by revenue and a symbol of Israel\'s pharmaceutical industry.');

// ============================================================
// ISRAEL - HEALTHCARE
// ============================================================

addConn('hadassah-medical-center', [
  { name: "Hadassah Women's Zionist Organization", type: "founder", description: "Founded by Henrietta Szold's Hadassah organization in 1934." },
  { name: "Henrietta Szold", type: "founding inspiration", description: "Henrietta Szold (Jewish, American) founded Hadassah, the Women's Zionist Organization." },
  { name: "Chagall Windows", type: "cultural feature", description: "Marc Chagall's famous stained glass windows are installed in Hadassah's synagogue." },
  { name: "Ein Kerem campus", type: "main campus", description: "Hadassah's main hospital is on the Ein Kerem campus in Jerusalem." },
  { name: "Mount Scopus campus", type: "second campus", description: "Hadassah also operates on Mount Scopus." },
  { name: "Hebrew University", type: "academic partner", description: "Hadassah is the teaching hospital of Hebrew University's medical school." }
]);
updDesc('hadassah-medical-center', 'Founded by the Hadassah Women\'s Zionist Organization (established by Henrietta Szold, Jewish American) in Jerusalem. One of Israel\'s leading hospitals and a UNESCO World Heritage-adjacent site due to Marc Chagall\'s famous stained glass windows. Hadassah is the teaching hospital of Hebrew University\'s medical school. Treats patients regardless of religion or nationality.');

// ============================================================
// UK ENTRIES
// ============================================================

addConn('board-of-deputies-of-british-jews', [
  { name: "British Jewish community", type: "represents", description: "The Board of Deputies is the main representative body of British Jews since 1760." },
  { name: "UK Parliament", type: "engagement", description: "The Board engages with Parliament on issues affecting British Jews." },
  { name: "Community Security Trust", type: "partner", description: "Works with CST on antisemitism monitoring and community security." },
  { name: "Chief Rabbi", type: "community partner", description: "Works alongside the Chief Rabbi's office." }
]);

addConn('community-security-trust-cst', [
  { name: "Board of Deputies", type: "partner", description: "CST works closely with the Board of Deputies of British Jews." },
  { name: "Metropolitan Police", type: "law enforcement partner", description: "CST coordinates with UK police on Jewish community security." },
  { name: "Antisemitism monitoring", type: "mission", description: "CST monitors and records antisemitic incidents in the UK." },
  { name: "Gerald Ronson", type: "major supporter", description: "Gerald Ronson (Jewish) is a major supporter and funder of CST." }
]);

addConn('the-jewish-chronicle', [
  { name: "Founded 1841", type: "history", description: "The Jewish Chronicle is the world's oldest continuously published Jewish newspaper." },
  { name: "British Jewish community", type: "readership", description: "The JC is the primary newspaper of British Jewry." },
  { name: "Zionism", type: "editorial stance", description: "The JC has historically been supportive of Zionism and Israel." }
]);

addConn('tottenham-hotspur', [
  { name: "Daniel Levy", type: "chairman", description: "Daniel Levy (Jewish) has been chairman of Tottenham Hotspur since 2001." },
  { name: "Joe Lewis", type: "former owner", description: "Joe Lewis (Jewish) was the majority owner through ENIC Group." },
  { name: "Jewish fan base", type: "cultural", description: "Spurs has a historically large Jewish fan base in North London." },
  { name: "Yid Army", type: "cultural", description: "Spurs fans sometimes call themselves the 'Yid Army' — a controversial but identity-reclaiming tradition." },
  { name: "Tottenham Hotspur Stadium", type: "facility", description: "Levy oversaw the construction of the £1 billion new stadium." }
]);
updDesc('tottenham-hotspur', 'Chairman Daniel Levy (Jewish) has led the club since 2001. Former majority owner Joe Lewis (Jewish) held shares through ENIC Group. Spurs has a historically large Jewish fan base in North London, and fans sometimes call themselves the "Yid Army." Levy oversaw the construction of the £1 billion new Tottenham Hotspur Stadium.');

addConn('nm-rothschild-sons', [
  { name: "Rothschild family", type: "founding family", description: "Founded by Nathan Mayer Rothschild (Jewish) in London in 1811." },
  { name: "Rothschild & Co", type: "current entity", description: "Now part of Rothschild & Co, listed on Euronext Paris." },
  { name: "Bank of England", type: "historic relationship", description: "The Rothschilds historically had a close relationship with the Bank of England." },
  { name: "Gold fixing", type: "historic role", description: "N.M. Rothschild chaired the London Gold Fixing for nearly 100 years (1919-2004)." },
  { name: "Balfour Declaration", type: "historic connection", description: "The Balfour Declaration was addressed to Lord Walter Rothschild." },
  { name: "French Rothschild branch", type: "family", description: "The French branch (de Rothschild Frères) operated parallel banking operations." }
]);
updDesc('nm-rothschild-sons', 'Founded by Nathan Mayer Rothschild (Jewish) in London in 1811. The Rothschild family is arguably the most famous banking dynasty in history. N.M. Rothschild chaired the London Gold Fixing for nearly 100 years. The Balfour Declaration (1917), promising a Jewish homeland in Palestine, was addressed to Lord Walter Rothschild. Now part of Rothschild & Co, a leading global financial advisory firm.');

addConn('saatchi-saatchi', [
  { name: "Charles Saatchi", type: "co-founder", description: "Charles Saatchi (Jewish, Iraqi-born British) co-founded Saatchi & Saatchi." },
  { name: "Maurice Saatchi", type: "co-founder", description: "Maurice Saatchi (Jewish, Iraqi-born British) co-founded Saatchi & Saatchi." },
  { name: "Margaret Thatcher", type: "political client", description: "Saatchi & Saatchi created the iconic 'Labour Isn't Working' campaign for Thatcher's Conservative Party." },
  { name: "Publicis Groupe", type: "parent company", description: "Saatchi & Saatchi is now part of Publicis Groupe." },
  { name: "Saatchi Gallery", type: "cultural contribution", description: "Charles Saatchi founded the influential Saatchi Gallery in London." }
]);
updDesc('saatchi-saatchi', 'Co-founded by Charles and Maurice Saatchi (Jewish, Iraqi-born British) in 1970. Created the iconic "Labour Isn\'t Working" ad campaign that helped Margaret Thatcher win in 1979. Became the world\'s largest advertising agency. Now part of Publicis Groupe. Charles Saatchi also founded the influential Saatchi Gallery, which helped launch the careers of Damien Hirst and other Young British Artists.');

addConn('wpp-plc', [
  { name: "Martin Sorrell", type: "founder", description: "Sir Martin Sorrell (Jewish) built WPP into the world's largest advertising company." },
  { name: "Wire and Plastic Products", type: "origin", description: "Sorrell bought a shell company called Wire and Plastic Products and transformed it." },
  { name: "J. Walter Thompson", type: "acquisition", description: "WPP acquired J. Walter Thompson, one of the oldest ad agencies." },
  { name: "Ogilvy", type: "subsidiary", description: "WPP owns Ogilvy & Mather." },
  { name: "S4 Capital", type: "new venture", description: "After leaving WPP, Sorrell founded S4 Capital." }
]);
updDesc('wpp-plc', 'Built by Sir Martin Sorrell (Jewish) from a shell company (Wire and Plastic Products) into the world\'s largest advertising and communications conglomerate. WPP owns Ogilvy, J. Walter Thompson, Grey, GroupM, and many other agencies. Revenue exceeds £14B annually. Sorrell left in 2018 and founded S4 Capital.');

addConn('entain-plc', [
  { name: "Online gambling", type: "industry", description: "Entain is one of the world's largest sports betting and gaming companies." },
  { name: "Ladbrokes", type: "brand", description: "Entain owns Ladbrokes, one of the UK's oldest betting brands." },
  { name: "Coral", type: "brand", description: "Entain owns Coral betting shops." },
  { name: "BetMGM", type: "joint venture", description: "Entain operates BetMGM joint venture in the US with MGM Resorts." },
  { name: "Israeli tech talent", type: "operations", description: "Entain has significant tech operations in Israel." }
]);

// ============================================================
// FRANCE
// ============================================================

addConn('rothschild-co-france', [
  { name: "Rothschild family", type: "founding family", description: "The French branch of the Rothschild banking dynasty." },
  { name: "Emmanuel Macron", type: "alumnus", description: "French President Emmanuel Macron worked at Rothschild & Co before entering politics." },
  { name: "David de Rothschild", type: "chairman", description: "Baron David de Rothschild (Jewish) is chairman." },
  { name: "N.M. Rothschild (UK)", type: "family branch", description: "The French and UK branches are now unified under Rothschild & Co." },
  { name: "Euronext Paris", type: "listing", description: "Rothschild & Co is listed on Euronext Paris." },
  { name: "Five Arrows", type: "family symbol", description: "The five arrows represent the five Rothschild brothers sent to five European capitals." }
]);
updDesc('rothschild-co-france', 'The French branch of the Rothschild banking dynasty, founded by James Mayer de Rothschild (Jewish) in Paris in 1812. Emmanuel Macron worked at Rothschild & Co before becoming President. Baron David de Rothschild (Jewish) is chairman. The Rothschild family\'s "Five Arrows" represent the five brothers sent to London, Paris, Frankfurt, Vienna, and Naples. Now unified with the UK branch.');

addConn('publicis-groupe', [
  { name: "Marcel Bleustein-Blanchet", type: "founder", description: "Marcel Bleustein-Blanchet (Jewish) founded Publicis in 1926." },
  { name: "Élisabeth Badinter", type: "largest shareholder", description: "Élisabeth Badinter (Jewish, philosopher) is the daughter of the founder and largest shareholder." },
  { name: "Maurice Lévy", type: "former CEO", description: "Maurice Lévy (Jewish) was CEO of Publicis for 30 years." },
  { name: "Arthur Sadoun", type: "CEO", description: "Arthur Sadoun (Jewish) is current CEO of Publicis." },
  { name: "Saatchi & Saatchi", type: "subsidiary", description: "Publicis owns Saatchi & Saatchi (also Jewish-founded)." },
  { name: "Leo Burnett", type: "subsidiary", description: "Publicis owns Leo Burnett." }
]);

// ============================================================
// CANADA
// ============================================================

addConn('onex-corporation', [
  { name: "Gerry Schwartz", type: "founder & CEO", description: "Gerry Schwartz (Jewish) founded Onex in 1984." },
  { name: "Heather Reisman", type: "spouse", description: "Schwartz is married to Heather Reisman (Jewish), founder of Indigo Books." },
  { name: "HESEG Foundation", type: "philanthropy", description: "Schwartz and Reisman founded HESEG for lone soldiers in the IDF." },
  { name: "Bear Stearns / TBG", type: "career origin", description: "Schwartz trained at Bear Stearns before founding Onex." },
  { name: "Canadian Jewish philanthropy", type: "philanthropy", description: "Schwartz and Reisman are among Canada's largest Jewish philanthropists." }
]);

addConn('indigo-books-music', [
  { name: "Heather Reisman", type: "founder & CEO", description: "Heather Reisman (Jewish) founded Indigo in 1996." },
  { name: "Gerry Schwartz", type: "spouse", description: "Reisman is married to Gerry Schwartz (Jewish), founder of Onex." },
  { name: "HESEG Foundation", type: "philanthropy", description: "Reisman co-founded HESEG Foundation for lone soldiers serving in the IDF." },
  { name: "Chapters", type: "acquisition", description: "Indigo acquired rival Chapters to become Canada's largest bookstore chain." },
  { name: "BDS controversy", type: "political", description: "Indigo has faced BDS-related protests due to Reisman's support for Israel." }
]);

// ============================================================
// RUSSIA
// ============================================================

addConn('alfa-group-consortium', [
  { name: "Mikhail Fridman", type: "co-founder", description: "Mikhail Fridman (Jewish, Ukrainian-born) co-founded Alfa Group." },
  { name: "German Khan", type: "co-founder", description: "German Khan (Jewish) co-founded Alfa Group." },
  { name: "Alfa-Bank", type: "subsidiary", description: "Russia's largest private bank." },
  { name: "TNK-BP", type: "former venture", description: "Alfa Group was a partner in TNK-BP oil venture; sold to Rosneft for $28 billion." },
  { name: "EU sanctions", type: "legal/political", description: "Fridman and Khan were sanctioned by the EU after Russia's invasion of Ukraine." },
  { name: "LetterOne", type: "investment", description: "Fridman's LetterOne investment vehicle operates in the West." }
]);
updDesc('alfa-group-consortium', 'Co-founded by Mikhail Fridman (Jewish, Ukrainian-born) and German Khan (Jewish). Alfa Group includes Alfa-Bank (Russia\'s largest private bank) and extensive oil, telecom, and retail interests. Fridman was once Russia\'s richest man. The TNK-BP oil venture was sold to Rosneft for $28 billion. Fridman and Khan were sanctioned by the EU after Russia\'s 2022 invasion of Ukraine.');

// ============================================================
// SOUTH AFRICA
// ============================================================

addConn('naspers-prosus', [
  { name: "Tencent investment", type: "key asset", description: "Naspers' $32M investment in Tencent (2001) became worth $200B+ — the greatest venture investment in history." },
  { name: "Koos Bekker", type: "former CEO", description: "Koos Bekker made the Tencent investment decision." },
  { name: "South African Jewish community", type: "historical connection", description: "Naspers has historical ties to South Africa's Jewish business community." },
  { name: "Prosus", type: "subsidiary", description: "Naspers created Prosus to hold its international internet investments." },
  { name: "Bob van Dijk", type: "former CEO", description: "Former Prosus CEO." }
]);

// ============================================================
// AUSTRALIA
// ============================================================

addConn('westfield-corporation', [
  { name: "Frank Lowy", type: "co-founder", description: "Frank Lowy (Jewish, Czech-born, Israeli-Australian) co-founded Westfield." },
  { name: "John Saunders", type: "co-founder", description: "Founded with John Saunders in 1959 in Sydney." },
  { name: "Unibail-Rodamco", type: "acquirer", description: "Unibail-Rodamco acquired Westfield for $32 billion in 2018." },
  { name: "Israel", type: "personal connection", description: "Lowy fought in Israel's War of Independence before immigrating to Australia." },
  { name: "Lowy Institute", type: "think tank", description: "Frank Lowy founded the Lowy Institute for International Policy." },
  { name: "Holocaust survivor heritage", type: "personal", description: "Lowy survived the Holocaust as a child in Hungary before going to Israel and then Australia." }
]);
updDesc('westfield-corporation', 'Co-founded by Frank Lowy (Jewish, Czech-born Holocaust survivor who fought in Israel\'s War of Independence) in Sydney in 1959. Grew into the world\'s largest shopping center company with 100+ centers globally. Unibail-Rodamco acquired Westfield for $32 billion in 2018. Lowy founded the Lowy Institute for International Policy, a leading Australian think tank.');

// ============================================================
// ARGENTINA
// ============================================================

addConn('grupo-clarin', [
  { name: "Héctor Magnetto", type: "CEO", description: "Héctor Magnetto has led Grupo Clarín for decades." },
  { name: "Argentine media", type: "market position", description: "Grupo Clarín is Argentina's largest media conglomerate." },
  { name: "Argentine Jewish community", type: "connection", description: "Connected to Argentina's large Jewish community." }
]);

// ============================================================
// GERMANY
// ============================================================

addConn('axel-springer-se', [
  { name: "Axel Springer", type: "founder", description: "Founded by Axel Springer in 1946; the company has strong pro-Israel editorial policies." },
  { name: "Mathias Döpfner", type: "CEO", description: "Mathias Döpfner is CEO." },
  { name: "Bild", type: "publication", description: "Bild is Germany's largest-circulation newspaper." },
  { name: "Politico", type: "acquisition", description: "Axel Springer acquired Politico for over $1 billion." },
  { name: "Business Insider", type: "acquisition", description: "Axel Springer owns Business Insider (Insider)." },
  { name: "Israel policy", type: "editorial stance", description: "Support for Israel is enshrined in Axel Springer's corporate principles." },
  { name: "KKR", type: "owner", description: "KKR (co-founded by Henry Kravis, Jewish) took Axel Springer private." }
]);
updDesc('axel-springer-se', 'Founded in 1946. Support for Israel and the Jewish people is enshrined in the company\'s corporate principles — unique among major media companies. Axel Springer owns Bild (Germany\'s largest newspaper), Politico, and Business Insider. KKR (co-founded by Henry Kravis, Jewish) took the company private. CEO Mathias Döpfner has maintained the strong pro-Israel editorial stance.');

// ============================================================
// SAVE
// ============================================================

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0; for(const c in data.countries) for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;}
console.log(`Done! ${tc} entries, ${wc} with connections, ${Object.keys(people.people).length} people.`);
