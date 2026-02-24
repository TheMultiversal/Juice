// addConnections8.js - Israel entries: government, defense, intelligence, universities, tech companies (Part 1)
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
// ISRAEL - GOVERNMENT
// ============================================================
addConn('knesset-israeli-parliament', [
  { name: "120 members", type: "structure", description: "The Knesset has 120 members (MKs), elected by proportional representation." },
  { name: "Israeli government coalition", type: "political", description: "The Knesset forms coalition governments from multiple parties." },
  { name: "Supreme Court of Israel", type: "judicial branch", description: "The Knesset has ongoing tension with the Supreme Court over judicial review." },
  { name: "AIPAC/US Congress relationship", type: "international", description: "Strong institutional ties between the Knesset and US Congress through AIPAC and other channels." }
]);
updDesc('knesset-israeli-parliament', 'The Knesset is Israel\'s unicameral parliament, with 120 members elected by proportional representation. Located in Jerusalem, it serves as the legislative branch. Named after the Knesset HaGedolah (Great Assembly) of ancient Israel. The building, designed by Joseph Klarwein, features Chagall tapestries. Israel\'s multi-party system typically requires coalition governments. The Knesset has been the arena for Israel\'s most consequential political battles.');
addInd('knesset-israeli-parliament', { name: "Yuli Edelstein", bio: "Former Speaker of the Knesset (2013-2020). Born in Ukraine, was a Prisoner of Zion in the Soviet Union before making aliyah. Represented Likud." });

addConn('prime-minister-s-office', [
  { name: "Benjamin Netanyahu", type: "longest-serving PM", description: "Netanyahu (Likud) is Israel's longest-serving PM, leading multiple governments." },
  { name: "David Ben-Gurion", type: "founding PM", description: "David Ben-Gurion proclaimed Israel's independence in 1948 and served as first PM." },
  { name: "US-Israel relations", type: "diplomatic", description: "The PM's Office manages Israel's most important bilateral relationship with the US." },
  { name: "National Security Council", type: "body", description: "The PM oversees Israel's National Security Council and intelligence agencies." },
  { name: "Mossad", type: "oversight", description: "The PM directly oversees the Mossad intelligence agency." }
]);
updDesc('prime-minister-s-office', 'The Prime Minister\'s Office (Misrad Rosh HaMemshala) is the executive center of Israeli government. Israel has had 13 prime ministers since 1948, beginning with David Ben-Gurion. Benjamin Netanyahu is the longest-serving PM. The PM directly oversees the Mossad, Shin Bet, Israel Atomic Energy Commission, and National Security Council. Located in Jerusalem\'s Kiryat HaMemshala (Government Quarter).');

addConn('ministry-of-defense', [
  { name: "IDF", type: "military oversight", description: "The Ministry of Defense oversees the Israel Defense Forces." },
  { name: "Defense industry", type: "industrial oversight", description: "Oversees Israel's massive defense industry including Rafael, IAI, and Elbit." },
  { name: "US military aid", type: "relationship", description: "Manages the $3.8 billion annual US military aid package to Israel." },
  { name: "Yoav Gallant", type: "minister", description: "The Minister of Defense is one of the most powerful positions in Israel." },
  { name: "Nuclear program", type: "strategic", description: "The ministry oversees Israel's undeclared nuclear program at Dimona." }
]);
updDesc('ministry-of-defense', 'Israel\'s Ministry of Defense (Misrad HaBitachon), located in Tel Aviv\'s HaKirya compound, oversees the IDF, defense industry, and military procurement. Manages the $3.8 billion annual US military aid (MOU signed 2016). Israel\'s defense budget exceeds $23 billion — one of the highest per-capita in the world. Key defense ministers have included Moshe Dayan, Yitzhak Rabin, and Ariel Sharon.');

addConn('ministry-of-foreign-affairs', [
  { name: "Abraham Accords", type: "diplomatic achievement", description: "The MFA helped negotiate the Abraham Accords normalizing ties with UAE, Bahrain, Morocco, Sudan." },
  { name: "UN representation", type: "international", description: "Israel's MFA manages contentious relationships at the United Nations." },
  { name: "Diaspora relations", type: "outreach", description: "The MFA manages relations with Jewish communities worldwide." },
  { name: "Embassy network", type: "operations", description: "Israel maintains embassies and consulates in countries worldwide." }
]);
updDesc('ministry-of-foreign-affairs', 'Israel\'s Ministry of Foreign Affairs manages diplomacy across 100+ embassies and consulates. Key achievements include the Abraham Accords (2020) normalizing ties with UAE, Bahrain, Morocco, and Sudan. Israel has diplomatic relations with over 160 countries. The MFA navigates Israel\'s complex position at the United Nations, where Israel faces more resolutions than any other country.');

// ============================================================
// ISRAEL - INTELLIGENCE & DEFENSE
// ============================================================
addConn('mossad-institute-for-intelligence-and-special-operations', [
  { name: "PM oversight", type: "command", description: "Mossad reports directly to the Prime Minister of Israel." },
  { name: "Eichmann capture", type: "historic operation", description: "Mossad captured Adolf Eichmann in Argentina in 1960, bringing him to trial in Jerusalem." },
  { name: "Entebbe rescue", type: "historic operation", description: "Mossad intelligence enabled the 1976 Entebbe hostage rescue in Uganda." },
  { name: "CIA/MI6/Five Eyes", type: "intelligence partnerships", description: "Mossad cooperates with Western intelligence agencies on counterterrorism." },
  { name: "Stuxnet", type: "cyber operation", description: "Mossad (with NSA) reportedly developed Stuxnet to sabotage Iran's nuclear centrifuges." }
]);
updDesc('mossad-institute-for-intelligence-and-special-operations', 'Israel\'s legendary foreign intelligence agency, responsible for intelligence collection, covert operations, and counterterrorism worldwide. Famous operations include the capture of Adolf Eichmann (1960), intelligence for the Entebbe rescue (1976), assassination of Black September operatives (Operation Wrath of God), and reportedly the Stuxnet cyberattack on Iran. Led by a director who reports directly to the PM. Motto: "Where there is no counsel, the people fall; but in the multitude of counsellors there is safety" (Proverbs 11:14).');
addInd('mossad-institute-for-intelligence-and-special-operations', { name: "Meir Dagan", bio: "Director of the Mossad (2002-2011). Widely credited with reinvigorating Mossad's operational capabilities. Oversaw operations including efforts to sabotage Iran's nuclear program." });

addConn('shin-bet-israel-security-agency', [
  { name: "Internal security", type: "mission", description: "Shin Bet handles Israel's internal security, counterintelligence, and counterterrorism." },
  { name: "PM oversight", type: "command", description: "Shin Bet reports to the Prime Minister." },
  { name: "Palestinian operations", type: "focus area", description: "Shin Bet manages intelligence operations in the West Bank and Gaza." },
  { name: "VIP protection", type: "duty", description: "Shin Bet protects Israeli leaders; failed to prevent the Rabin assassination in 1995." },
  { name: "The Gatekeepers documentary", type: "cultural", description: "Six former Shin Bet heads spoke in the Oscar-nominated documentary 'The Gatekeepers' (2012)." }
]);
updDesc('shin-bet-israel-security-agency', 'Israel\'s internal security service (Sherut HaBitachon HaKlali), responsible for counterterrorism, counterintelligence, VIP protection, and intelligence in the Palestinian territories. Six former directors spoke in the Oscar-nominated documentary "The Gatekeepers" (2012). Shin Bet failed to prevent the assassination of PM Yitzhak Rabin in 1995. Employs sophisticated surveillance and human intelligence networks.');

addConn('israel-defense-forces-idf', [
  { name: "Conscription", type: "structure", description: "Israel has mandatory military service — 32 months for men, 24 for women." },
  { name: "Unit 8200", type: "elite unit", description: "Unit 8200 is the IDF's signals intelligence unit and a pipeline for Israel's tech industry." },
  { name: "Sayeret Matkal", type: "elite unit", description: "The IDF's top special forces unit, modeled on the British SAS." },
  { name: "Iron Dome", type: "defense system", description: "Israel's Iron Dome missile defense system has intercepted thousands of rockets." },
  { name: "US military aid", type: "support", description: "The IDF receives $3.8 billion annually from the US." },
  { name: "Six-Day War (1967)", type: "major conflict", description: "The IDF's decisive 1967 victory captured the West Bank, Gaza, Sinai, and Golan Heights." }
]);
updDesc('israel-defense-forces-idf', 'Israel\'s military (Tzva HaHagana LeYisrael), formed in 1948 from pre-state militias including the Haganah. One of the most technologically advanced militaries in the world. Mandatory conscription (32 months men, 24 women). Elite units include Sayeret Matkal, Shayetet 13, and Unit 8200. The Iron Dome system has intercepted thousands of rockets. The IDF has fought major wars in 1948, 1956, 1967, 1973, 1982, 2006, and 2014. Receives $3.8B annual US military aid.');
addInd('israel-defense-forces-idf', { name: "Herzi Halevi", bio: "Chief of the General Staff of the IDF since January 2023. Former commander of Military Intelligence Directorate (Aman) and Southern Command. Served in Sayeret Matkal." });

addConn('israel-aerospace-industries-iai', [
  { name: "Israeli government", type: "owner", description: "IAI is state-owned — Israel's largest defense company." },
  { name: "Arrow missile defense", type: "product", description: "IAI develops the Arrow anti-ballistic missile system with Boeing." },
  { name: "Drone technology", type: "product", description: "IAI is a world leader in military drone/UAV technology." },
  { name: "Boeing partnership", type: "partner", description: "Long-standing partnership with Boeing on missile defense and aviation." },
  { name: "Satellite launches", type: "capability", description: "IAI builds satellites and the Shavit space launcher." }
]);
updDesc('israel-aerospace-industries-iai', 'Israel\'s largest defense company, state-owned, with $5+ billion in annual revenue. IAI develops the Arrow missile defense system (with Boeing), military drones/UAVs, satellites, and the Shavit space launcher. Also produces radar systems, cyber defense, and commercial aviation components. Employs 15,000+ people. IAI has made Israel one of the world\'s top defense exporters.');

addConn('israel-military-industries-imi-systems', [
  { name: "Elbit Systems", type: "acquirer", description: "Elbit Systems acquired IMI Systems in 2018 for $495 million." },
  { name: "Small arms", type: "products", description: "IMI developed the iconic Uzi submachine gun and Galil assault rifle." },
  { name: "Ammunition", type: "products", description: "Major producer of military ammunition and rocket motors." },
  { name: "Uzi Gal", type: "designer", description: "Major Uzi Gal designed the legendary Uzi submachine gun adopted by militaries worldwide." }
]);
updDesc('israel-military-industries-imi-systems', 'Originally state-owned, IMI Systems was acquired by Elbit Systems in 2018 for $495 million. Famous for developing the Uzi submachine gun (designed by Major Uzi Gal), one of the most iconic firearms in history, adopted by 90+ countries. Also produced the Galil assault rifle, ammunition, and rocket propulsion systems. IMI\'s products have been used by militaries worldwide since the 1950s.');

// ============================================================
// ISRAEL - TECH COMPANIES
// ============================================================
addConn('check-point-software-technologies', [
  { name: "Gil Shwed", type: "founder/CEO", description: "Gil Shwed (Jewish, Israeli) founded Check Point at age 25 and invented the firewall." },
  { name: "Firewall invention", type: "innovation", description: "Check Point invented the commercial firewall, creating the cybersecurity industry." },
  { name: "IDF Unit 8200", type: "origin", description: "Shwed served in the IDF's Unit 8200 before founding Check Point." },
  { name: "NASDAQ listed", type: "financial", description: "One of the first Israeli companies listed on NASDAQ." },
  { name: "$18B market cap", type: "valuation", description: "Check Point has a market capitalization of $18+ billion." }
]);
updDesc('check-point-software-technologies', 'Founded in 1993 by Gil Shwed (Jewish, Israeli), Shlomo Kramer, and Marius Nacht — all IDF Unit 8200 veterans. Check Point invented the commercial firewall (FireWall-1), effectively creating the cybersecurity industry. One of the first Israeli tech companies on NASDAQ. Market cap $18+ billion. Shwed has been CEO for 30+ years, a rarity in tech. Check Point protects networks of Fortune 100 companies and governments worldwide.');
addInd('check-point-software-technologies', { name: "Gil Shwed", bio: "Founder and CEO of Check Point Software since 1993. Invented the firewall. Served in IDF Unit 8200. One of Israel's wealthiest people. Billionaire." });

addConn('nice-ltd', [
  { name: "Barak Eilam", type: "CEO", description: "Barak Eilam (Jewish, Israeli) leads NICE, a $12+ billion enterprise software company." },
  { name: "Contact center software", type: "product", description: "NICE is the global leader in cloud contact center software (CXone)." },
  { name: "Financial compliance", type: "product", description: "NICE provides compliance recording and surveillance for banks and financial institutions." },
  { name: "NASDAQ listed", type: "financial", description: "Listed on NASDAQ and Tel Aviv Stock Exchange." }
]);
updDesc('nice-ltd', 'An Israeli enterprise software company with a $12+ billion market cap. Led by CEO Barak Eilam. NICE is the global leader in cloud contact center software (CXone platform) and financial crime/compliance solutions. Serves 85% of Fortune 100 companies. Founded in 1986, originally focused on military recording systems before pivoting to enterprise software. Dual-listed on NASDAQ and TASE.');

addConn('mobileye-intel', [
  { name: "Amnon Shashua", type: "co-founder", description: "Prof. Amnon Shashua (Jewish, Israeli) co-founded Mobileye and continues to lead it." },
  { name: "Intel", type: "acquirer", description: "Intel acquired Mobileye for $15.3 billion in 2017 — the largest Israeli tech acquisition at the time." },
  { name: "Autonomous driving", type: "technology", description: "Mobileye is a world leader in autonomous driving and ADAS technology." },
  { name: "Hebrew University", type: "origin", description: "Mobileye was born from Shashua's research at Hebrew University." },
  { name: "80% market share ADAS", type: "dominance", description: "Mobileye's chips are in approximately 80% of cars with advanced driver assistance." }
]);
updDesc('mobileye-intel', 'Co-founded by Prof. Amnon Shashua (Jewish, Israeli) and Ziv Aviram. Intel acquired Mobileye for $15.3 billion in 2017. Mobileye\'s computer vision and AI chips power advanced driver assistance systems (ADAS) in approximately 80% of equipped vehicles worldwide, across 50+ automakers. Born from Hebrew University research. Mobileye went public again in 2022 at a $17B valuation. The technology is making autonomous driving a reality.');

addConn('sodastream', [
  { name: "Daniel Birnbaum", type: "former CEO", description: "Daniel Birnbaum (Jewish, Israeli) led SodaStream through its transformation and sale to PepsiCo." },
  { name: "PepsiCo", type: "acquirer", description: "PepsiCo acquired SodaStream for $3.2 billion in 2018." },
  { name: "BDS controversy", type: "political", description: "SodaStream was targeted by BDS due to its factory in the West Bank; later moved to the Negev." },
  { name: "Scarlett Johansson", type: "ambassador", description: "Scarlett Johansson was SodaStream's brand ambassador, resigning from Oxfam over the controversy." }
]);
updDesc('sodastream', 'An Israeli home carbonation company acquired by PepsiCo for $3.2 billion in 2018. Under CEO Daniel Birnbaum, SodaStream became a BDS target for its factory in Mishor Adumim (West Bank). Actress Scarlett Johansson chose SodaStream over Oxfam when the charity objected to her endorsement deal. The factory later moved to the Negev desert, employing both Jewish and Bedouin workers.');

addConn('tower-semiconductor', [
  { name: "Intel attempted acquisition", type: "deal", description: "Intel attempted to acquire Tower for $5.4 billion but the deal was blocked by Chinese regulators in 2024." },
  { name: "Specialty chip foundry", type: "business", description: "Tower is a leading specialty semiconductor foundry." },
  { name: "Migdal HaEmek", type: "location", description: "Headquartered in Migdal HaEmek in northern Israel." },
  { name: "Analog/RF chips", type: "products", description: "Specializes in analog, RF, power management, and image sensor chips." }
]);
updDesc('tower-semiconductor', 'An Israeli semiconductor foundry headquartered in Migdal HaEmek. Specializes in analog, RF, power management, and image sensor chips used in automotive, medical, and industrial applications. Intel attempted to acquire Tower for $5.4 billion in 2022, but the deal collapsed in 2024 after failing to receive Chinese regulatory approval. Tower operates fabs in Israel, USA, and Japan.');

addConn('fiverr-international', [
  { name: "Micha Kaufman", type: "co-founder/CEO", description: "Micha Kaufman (Jewish, Israeli) co-founded Fiverr in 2010." },
  { name: "Shai Wininger", type: "co-founder", description: "Shai Wininger (Jewish, Israeli) co-founded Fiverr; later co-founded Lemonade insurance." },
  { name: "NYSE listed", type: "financial", description: "Fiverr went public on NYSE in 2019." },
  { name: "Gig economy platform", type: "business", description: "Fiverr is a leading online marketplace for freelance services." }
]);
updDesc('fiverr-international', 'Founded in 2010 by Micha Kaufman (Jewish, Israeli) and Shai Wininger (Jewish, Israeli). Fiverr is a global online marketplace for freelance services. IPO on NYSE in 2019. The platform democratized access to freelance talent, with services starting at $5. Wininger later co-founded Lemonade (insurance). Fiverr employs 800+ people and serves millions of buyers and sellers worldwide.');

addConn('ironsource-unity', [
  { name: "Tomer Bar-Zeev", type: "co-founder", description: "Tomer Bar-Zeev (Jewish, Israeli) co-founded ironSource." },
  { name: "Unity Technologies", type: "merger partner", description: "ironSource merged with Unity Technologies in 2022 in a $4.4 billion deal." },
  { name: "Mobile app monetization", type: "business", description: "ironSource was a leading mobile app monetization and distribution platform." },
  { name: "Gaming industry", type: "market", description: "ironSource's tools were used by major mobile game developers worldwide." }
]);
updDesc('ironsource-unity', 'Founded in Israel by Tomer Bar-Zeev (Jewish, Israeli) and co-founders. ironSource became a leading mobile app monetization, mediation, and distribution platform. Merged with Unity Technologies in 2022 in a $4.4 billion deal, combining game development tools with monetization. ironSource\'s technology powered billions of ad impressions for mobile games worldwide.');

addConn('icl-group', [
  { name: "Dead Sea resources", type: "source", description: "ICL extracts minerals from the Dead Sea — one of the world's richest mineral deposits." },
  { name: "Potash production", type: "product", description: "ICL is one of the world's largest producers of potash fertilizers." },
  { name: "Israeli government", type: "historical owner", description: "ICL was privatized in the 1990s-2000s from state ownership under the Israel Chemicals umbrella." },
  { name: "Food additives", type: "product", description: "ICL is a major global supplier of food-grade phosphates and specialty ingredients." }
]);
updDesc('icl-group', 'An Israeli specialty minerals company that extracts potash, bromine, and other minerals from the Dead Sea — one of the richest mineral deposits on Earth. ICL is one of the world\'s largest potash producers and a major supplier of food-grade phosphates. Revenue exceeds $7 billion. Formerly state-owned (Israel Chemicals Ltd), privatized in stages. The Dead Sea operations date back to the 1930s under the British Mandate.');

addConn('gett', [
  { name: "Dave Waiser", type: "founder/CEO", description: "Dave Waiser (Jewish, Israeli) founded Gett (originally GetTaxi) in 2010." },
  { name: "Ride-hailing", type: "business", description: "Gett is an Israeli ride-hailing platform operating in Israel and corporate mobility worldwide." },
  { name: "Volkswagen investment", type: "backer", description: "Volkswagen invested $300 million in Gett in 2016." },
  { name: "Corporate mobility", type: "pivot", description: "Gett pivoted to focus on corporate ground transportation." }
]);
updDesc('gett', 'Founded in 2010 by Dave Waiser (Jewish, Israeli) as GetTaxi. Gett raised $800+ million including a $300M investment from Volkswagen. Originally competed with Uber in ride-hailing; pivoted to corporate ground transportation. Dominates the Israeli taxi market. The company\'s corporate mobility platform serves Fortune 500 companies managing business travel and ground transportation.');

addConn('via-transportation', [
  { name: "Daniel Ramot", type: "co-founder", description: "Daniel Ramot (Jewish, Israeli) co-founded Via." },
  { name: "Oren Shoval", type: "co-founder", description: "Oren Shoval (Jewish, Israeli) co-founded Via." },
  { name: "Public transit technology", type: "business", description: "Via provides transit-as-a-service technology for cities worldwide." },
  { name: "100+ cities", type: "scale", description: "Via's technology powers public transit in 100+ cities across 35 countries." }
]);
updDesc('via-transportation', 'Co-founded by Daniel Ramot and Oren Shoval (both Jewish, Israeli). Via provides transit-as-a-service technology used by 100+ cities in 35 countries. The platform optimizes shared rides and on-demand transit. Via has raised $800+ million and is valued at $3.3 billion. Partners include cities, transit agencies, and corporations worldwide. Headquartered in New York with R&D in Israel.');

addConn('lemonade-inc', [
  { name: "Daniel Schreiber", type: "co-founder/CEO", description: "Daniel Schreiber (Jewish, Israeli) co-founded Lemonade insurance." },
  { name: "Shai Wininger", type: "co-founder", description: "Shai Wininger (Jewish, Israeli, also Fiverr co-founder) co-founded Lemonade." },
  { name: "AI-powered insurance", type: "innovation", description: "Lemonade uses AI chatbots to sell and process insurance claims." },
  { name: "NYSE listed", type: "financial", description: "Lemonade went public on NYSE in 2020." },
  { name: "B-Corp certified", type: "social impact", description: "Lemonade is a certified B-Corp with a giveback program donating unclaimed premiums." }
]);
updDesc('lemonade-inc', 'An Israeli-American insurtech company co-founded by Daniel Schreiber and Shai Wininger (both Jewish, Israeli). Wininger also co-founded Fiverr. Lemonade uses AI chatbots (Maya, Jim) to sell insurance and process claims in seconds. IPO on NYSE in 2020. Certified B-Corp — unclaimed premiums go to charities chosen by policyholders ("Giveback"). Offers renters, homeowners, car, pet, and life insurance.');

addConn('varonis-systems', [
  { name: "Yaki Faitelson", type: "co-founder/CEO", description: "Yaki Faitelson (Jewish, Israeli) co-founded and leads Varonis." },
  { name: "Data security", type: "product", description: "Varonis protects enterprise data by detecting threats and ensuring compliance." },
  { name: "NASDAQ listed", type: "financial", description: "Listed on NASDAQ with a $5+ billion market cap." },
  { name: "IDF intelligence background", type: "origin", description: "Founders have IDF intelligence backgrounds typical of Israeli cybersecurity founders." }
]);
updDesc('varonis-systems', 'Co-founded by Yaki Faitelson (Jewish, Israeli) and Ohad Korkus. Varonis is a leading data security platform that protects enterprise data from insider threats, cyberattacks, and ransomware. Market cap $5+ billion. The platform monitors file access, email, and cloud data. Listed on NASDAQ. Another example of the IDF intelligence-to-cybersecurity pipeline that has made Israel the world\'s cybersecurity powerhouse.');

addConn('walkme', [
  { name: "Dan Adika", type: "co-founder/CEO", description: "Dan Adika (Jewish, Israeli) co-founded WalkMe." },
  { name: "Rafael Sweary", type: "co-founder", description: "Rafael Sweary (Jewish, Israeli) co-founded WalkMe and serves as president." },
  { name: "Digital adoption platform", type: "product", description: "WalkMe pioneered the digital adoption platform (DAP) category." },
  { name: "SAP acquisition", type: "deal", description: "SAP acquired WalkMe for $1.5 billion in 2024." }
]);
updDesc('walkme', 'Co-founded by Dan Adika and Rafael Sweary (both Jewish, Israeli). WalkMe pioneered the Digital Adoption Platform (DAP) category — overlay technology that guides users through software applications. SAP acquired WalkMe for $1.5 billion in 2024. The platform is used by 2,000+ enterprises to improve employee productivity with enterprise software. Originally listed on NASDAQ before the SAP acquisition.');

addConn('appsflyer', [
  { name: "Oren Kaniel", type: "co-founder/CEO", description: "Oren Kaniel (Jewish, Israeli) co-founded AppsFlyer." },
  { name: "Reshef Mann", type: "co-founder/CTO", description: "Reshef Mann (Jewish, Israeli) co-founded AppsFlyer as CTO." },
  { name: "Mobile attribution", type: "product", description: "AppsFlyer is the world's leading mobile attribution and marketing analytics platform." },
  { name: "98% of marketers", type: "market share", description: "AppsFlyer's SDK is installed in 98% of top mobile apps." }
]);
updDesc('appsflyer', 'Co-founded by Oren Kaniel and Reshef Mann (both Jewish, Israeli). AppsFlyer is the world\'s leading mobile attribution and marketing analytics platform. Its SDK is installed in 98% of the world\'s top smartphones. Used by 12,000+ brands and partners including Google, Meta, Twitter. Valued at $2 billion. Another Israeli-founded company that became the global standard in its category.');

addConn('candiru-saito-tech', [
  { name: "Israeli cyber-offense industry", type: "sector", description: "Candiru is part of Israel's controversial cyber-espionage industry alongside NSO Group." },
  { name: "Government clients", type: "customers", description: "Sells spyware to government clients for surveillance of targets." },
  { name: "Microsoft/Citizen Lab investigation", type: "exposure", description: "Microsoft and Citizen Lab exposed Candiru's DevilsTongue spyware in 2021." },
  { name: "US sanctions", type: "penalty", description: "The US blacklisted Candiru in 2021 alongside NSO Group." }
]);
updDesc('candiru-saito-tech', 'An Israeli cyber-espionage company (also known as Saito Tech) that develops spyware for government clients. Exposed by Microsoft and the University of Toronto\'s Citizen Lab in 2021 for deploying \"DevilsTongue\" spyware targeting journalists and dissidents. Blacklisted by the US Commerce Department in 2021 alongside NSO Group. Part of Israel\'s controversial but lucrative cyber-offense industry.');

addConn('verint-systems', [
  { name: "Dan Bodner", type: "CEO", description: "Dan Bodner (Jewish, Israeli) led Verint for many years." },
  { name: "Intelligence/surveillance", type: "product", description: "Verint provides mass surveillance and intelligence solutions to governments." },
  { name: "Customer engagement", type: "product", description: "Verint also provides customer engagement and workforce optimization software." },
  { name: "Comverse Technology spinoff", type: "origin", description: "Verint was spun off from Comverse Technology (founded by Israeli Kobi Alexander)." }
]);
updDesc('verint-systems', 'An Israeli-American company providing intelligence solutions, surveillance technology, and customer engagement software. Spun off from Comverse Technology (founded by Kobi Alexander, Jewish, Israeli). Verint\'s intelligence division provides mass surveillance equipment to governments worldwide. The customer engagement division provides workforce optimization and analytics. Listed on NASDAQ with $1.3+ billion revenue.');

addConn('sapiens-international', [
  { name: "Roni Al-Dor", type: "CEO", description: "Roni Al-Dor (Jewish, Israeli) leads Sapiens International." },
  { name: "Insurance software", type: "product", description: "Sapiens provides software solutions for the global insurance industry." },
  { name: "NASDAQ listed", type: "financial", description: "Listed on NASDAQ." },
  { name: "30+ countries", type: "operations", description: "Sapiens serves insurance companies in 30+ countries." }
]);
updDesc('sapiens-international', 'An Israeli software company providing technology solutions to the global insurance industry. Led by CEO Roni Al-Dor. Sapiens\' platforms handle policy administration, claims, billing, and underwriting for insurers in 30+ countries. Listed on NASDAQ. The company has grown through acquisitions and now serves over 600 insurance companies worldwide.');

// ============================================================
// ISRAEL - TELECOM & UTILITIES
// ============================================================
addConn('bezeq-israel-telecom', [
  { name: "Israel's largest telecom", type: "status", description: "Bezeq is Israel's largest telecommunications provider." },
  { name: "yes satellite TV", type: "subsidiary", description: "Bezeq operates yes, Israel's satellite TV service." },
  { name: "Bezeq International", type: "subsidiary", description: "Provides international communications services." },
  { name: "Eurocom Group", type: "controlling shareholder", description: "Bezeq has been controlled by various Israeli business groups." }
]);
updDesc('bezeq-israel-telecom', 'Israel\'s largest and oldest telecommunications company, founded in 1984 when it was separated from the Ministry of Communications. Provides landline, internet, satellite TV (yes), and international communications. Privatized in stages, Bezeq has been at the center of Israeli business and political controversies. Employs thousands and serves millions of Israeli households.');

addConn('partner-communications-orange-israel', [
  { name: "Israel mobile market", type: "market", description: "Partner (formerly Orange Israel) is one of Israel's three major mobile operators." },
  { name: "Ilan Ben-Dov", type: "controlling shareholder", description: "Ilan Ben-Dov is a major Israeli businessman who acquired control of Partner." },
  { name: "4G/5G network", type: "infrastructure", description: "Partner operates a major 4G/5G network across Israel." }
]);
updDesc('partner-communications-orange-israel', 'One of Israel\'s three major mobile operators, formerly branded as Orange Israel. Founded in 1998 as the second mobile operator. Provides mobile, internet, and TV services. Following the 2015 controversy when Orange\'s CEO suggested leaving Israel due to BDS pressure, the company rebranded to Partner Communications. Listed on NASDAQ and TASE.');

addConn('cellcom-israel', [
  { name: "Israel mobile market", type: "market", description: "Cellcom is one of Israel's three major mobile operators." },
  { name: "Discount Investment Corp", type: "controlling interest", description: "Formerly controlled by Nochi Dankner's IDB group." },
  { name: "Golan Telecom acquisition", type: "deal", description: "Cellcom acquired budget carrier Golan Telecom." }
]);
updDesc('cellcom-israel', 'One of Israel\'s three major cellular operators, providing mobile, landline, internet, and TV services. Founded in 1994 as Israel\'s third mobile license holder. Formerly the largest mobile operator in Israel by subscribers. Listed on NYSE and TASE. The Israeli mobile market is one of the most competitive and cheapest in the developed world.');

addConn('iec-israel-electric-corporation', [
  { name: "State-owned", type: "ownership", description: "IEC is state-owned, generating virtually all of Israel's electricity." },
  { name: "Power generation", type: "operations", description: "IEC operates power plants generating 70+ billion kWh annually." },
  { name: "Energy transition", type: "development", description: "Israel is transitioning from coal to natural gas and renewable energy." },
  { name: "Largest employer in Israel's south", type: "economic role", description: "IEC is a major employer, particularly in southern Israel." }
]);
updDesc('iec-israel-electric-corporation', 'Israel\'s state-owned electric utility, generating and distributing virtually all of the country\'s electricity. Operates power plants across Israel with total capacity of 17+ GW. One of the largest employers in Israel. IEC is transitioning from coal and oil to natural gas (from the Tamar and Leviathan offshore fields) and solar energy. Israel\'s energy independence has geopolitical implications given its location.');

// ============================================================
// ISRAEL - BUSINESS GROUPS & MEDIA
// ============================================================
addConn('gazit-globe', [
  { name: "Chaim Katzman", type: "founder", description: "Chaim Katzman (Jewish, Israeli) founded Gazit-Globe, a global real estate empire." },
  { name: "Global shopping centers", type: "portfolio", description: "Gazit-Globe owns and operates shopping centers across 4 continents." },
  { name: "Norstar (Canada)", type: "subsidiary", description: "Major real estate holdings in Canada, US, Israel, and Northern Europe." },
  { name: "TASE listed", type: "financial", description: "Listed on the Tel Aviv Stock Exchange." }
]);
updDesc('gazit-globe', 'Founded by Chaim Katzman (Jewish, Israeli), Gazit-Globe is a global real estate investment company owning and operating shopping centers and retail properties across Israel, Canada, US, Northern Europe, and Brazil. Total portfolio value of $3+ billion across 4 continents. Listed on TASE. One of Israel\'s most successful global real estate enterprises.');

addConn('idb-holdings', [
  { name: "Nochi Dankner", type: "former controlling shareholder", description: "Nochi Dankner (Jewish, Israeli) controlled IDB through a pyramid structure before his empire collapsed." },
  { name: "Discount Investment Corp", type: "subsidiary", description: "IDB controlled Discount Investment Corporation, one of Israel's largest conglomerates." },
  { name: "Israeli tycoon crisis", type: "context", description: "IDB's collapse was emblematic of Israeli business concentration and the 2011 social protests." },
  { name: "Eduardo Elsztain", type: "acquirer", description: "Argentine-Jewish businessman Eduardo Elsztain acquired IDB interests." }
]);
updDesc('idb-holdings', 'An Israeli holding company that was once one of the country\'s most powerful business empires, controlled by Nochi Dankner (Jewish, Israeli) through a complex pyramid structure. IDB controlled Discount Investment Corp, Cellcom, Shufersal (supermarkets), Clal Insurance, and more. Dankner\'s empire collapsed under debt; he was later convicted of securities fraud. The collapse symbolized the concentration of Israeli business in a few tycoon families.');

addConn('discount-investment-corporation', [
  { name: "IDB Holdings", type: "parent", description: "Formerly controlled by IDB Holdings and the Dankner family." },
  { name: "Shufersal", type: "holding", description: "Controlled Shufersal, Israel's largest supermarket chain." },
  { name: "Cellcom", type: "holding", description: "Held controlling interest in Cellcom, a major mobile operator." },
  { name: "Clal Insurance", type: "holding", description: "Controlled Clal Insurance, one of Israel's largest insurers." }
]);
updDesc('discount-investment-corporation', 'One of Israel\'s largest holding companies, formerly part of the IDB Holdings empire. Controlled major Israeli companies including Shufersal (largest supermarket chain), Cellcom (mobile operator), and Clal Insurance. The company was central to the Israeli tycoon economy where a small number of families controlled vast swaths of the economy through pyramid structures.');

addConn('channel-12-keshet', [
  { name: "Keshet Media Group", type: "operator", description: "Channel 12 is operated by Keshet Media Group, Israel's largest commercial broadcaster." },
  { name: "Most-watched channel", type: "status", description: "Channel 12 is typically the most-watched TV channel in Israel." },
  { name: "Format exports", type: "business", description: "Keshet has exported TV formats internationally, including 'Rising Star' (adopted as 'The Four' in the US)." },
  { name: "Avi Nir", type: "CEO", description: "Avi Nir (Jewish, Israeli) led Keshet Media Group's expansion." }
]);
updDesc('channel-12-keshet', 'Israel\'s most-watched TV channel, operated by Keshet Media Group. Known for hit shows like Fauda, Shtisel (later Netflix), and format exports including "Rising Star" (adapted in 20+ countries). Keshet International distributes Israeli content worldwide, contributing to the global phenomenon of Israeli TV. The channel also covers news and current affairs and is influential in Israeli public discourse.');

addConn('channel-13-reshet', [
  { name: "Reshet Media", type: "operator", description: "Channel 13 is operated by Reshet Media." },
  { name: "News coverage", type: "programming", description: "Channel 13's news division competes with Channels 12 and Kan for Israeli viewers." },
  { name: "Len Blavatnik", type: "investor", description: "Len Blavatnik (Jewish, Ukrainian-born billionaire) invested in Israeli media." },
  { name: "Israeli media landscape", type: "context", description: "Israel has one of the world's most competitive TV news markets." }
]);
updDesc('channel-13-reshet', 'Israel\'s commercial Channel 13, operated by Reshet Media. Competes with Channel 12 (Keshet) and Kan (public broadcaster) in Israel\'s highly competitive TV market. Channel 13 is known for its news coverage and investigative journalism. Israeli television has gained global recognition with exports like Fauda, Shtisel, and Tehran, with multiple channels contributing to the creative ecosystem.');

addConn('galei-zahal-idf-radio', [
  { name: "Israel Defense Forces", type: "operator", description: "Galei Zahal is the IDF's radio station." },
  { name: "Cultural institution", type: "role", description: "IDF Radio is a major cultural institution that launched many Israeli music and media careers." },
  { name: "Music programming", type: "content", description: "IDF Radio is a primary platform for new Israeli music." },
  { name: "News coverage", type: "content", description: "Galei Zahal provides 24/7 news coverage with military correspondents." }
]);
updDesc('galei-zahal-idf-radio', 'The Israel Defense Forces\' radio station, broadcasting since 1950. Despite being a military station, Galei Zahal is one of Israel\'s most popular radio stations, known for music programming and news. Many famous Israeli musicians and broadcasters launched their careers on IDF Radio. Soldiers serve as producers, DJs, and journalists. A unique cultural institution where military service and media culture intersect.');

addConn('walla-news', [
  { name: "Bezeq", type: "former owner", description: "Walla was formerly owned by Bezeq Israel Telecom." },
  { name: "Israeli digital media", type: "sector", description: "Walla is one of Israel's most-visited news and content portals." },
  { name: "Netanyahu trial", type: "legal significance", description: "Walla coverage was central to the Case 4000 corruption trial of PM Netanyahu." }
]);
updDesc('walla-news', 'One of Israel\'s most popular news and content websites. Walla became central to Israeli politics when PM Netanyahu\'s Case 4000 corruption trial alleged that he sought favorable coverage on Walla in exchange for regulatory benefits for Bezeq (then Walla\'s parent company). The case highlighted the intersection of media, telecoms, and politics in Israel.');

addConn('the-times-of-israel', [
  { name: "David Horovitz", type: "founding editor", description: "David Horovitz (Jewish, British-Israeli) founded The Times of Israel in 2012." },
  { name: "Seth Klarman", type: "investor", description: "Seth Klarman (Jewish, US) was an early investor through his foundation." },
  { name: "English-language Israeli media", type: "niche", description: "The Times of Israel is a leading English-language Israeli news site." },
  { name: "Blogs platform", type: "feature", description: "The TOI blogs platform hosts thousands of community bloggers." }
]);
updDesc('the-times-of-israel', 'Founded in 2012 by David Horovitz (Jewish, British-Israeli journalist), The Times of Israel is a leading English-language Israeli news website. Backed by investor Seth Klarman (Jewish, US). Features professional journalism alongside a massive community blogs platform with thousands of contributors. Covers Israeli news, Jewish world, Middle East, and has Arabic and French editions.');

// ============================================================
// ISRAEL - HERITAGE & NATIONAL INSTITUTIONS
// ============================================================
addConn('tel-aviv-museum-of-art', [
  { name: "Israeli art scene", type: "cultural role", description: "The Tel Aviv Museum of Art is Israel's leading contemporary art museum." },
  { name: "Independence declaration", type: "historic event", description: "Israel's Declaration of Independence was signed in the museum's original building on May 14, 1948." },
  { name: "Herta and Paul Amir Building", type: "architecture", description: "The Herta and Paul Amir Building (2011) is an architectural landmark." }
]);
updDesc('tel-aviv-museum-of-art', 'Founded in 1932, the Tel Aviv Museum of Art is Israel\'s leading museum of modern and contemporary art. Israel\'s Declaration of Independence was signed in the museum\'s original building (Meir Dizengoff\'s home on Rothschild Boulevard) on May 14, 1948. The museum\'s collection includes works by Picasso, Monet, Chagall, Kandinsky, and Israeli masters. The striking Herta and Paul Amir Building opened in 2011.');

addConn('keren-kayemeth-leisrael-jewish-national-fund', [
  { name: "Founded 1901", type: "history", description: "KKL-JNF was founded at the Fifth Zionist Congress to purchase land in Palestine." },
  { name: "Land reclamation", type: "mission", description: "KKL-JNF has planted 250 million trees and developed water infrastructure across Israel." },
  { name: "Blue Box", type: "symbol", description: "The iconic Blue Box (pushke) collected donations in Jewish homes worldwide for decades." },
  { name: "13% of Israel's land", type: "holdings", description: "KKL-JNF owns approximately 13% of Israel's total land." }
]);
updDesc('keren-kayemeth-leisrael-jewish-national-fund', 'Founded in 1901 at the Fifth Zionist Congress in Basel to purchase and develop land in Palestine for Jewish settlement. KKL-JNF has planted 250 million trees, built 250+ reservoirs, and developed parks across Israel. Owns approximately 13% of Israel\'s total land area. The iconic Blue Box (pushke) collected donations in Jewish homes worldwide for over a century. One of the foundational institutions of Zionism.');

addConn('world-jewish-congress-israel-office', [
  { name: "World Jewish Congress", type: "parent organization", description: "The Israel office of the WJC, which represents Jewish communities in 100+ countries." },
  { name: "Ronald Lauder", type: "WJC president", description: "Ronald Lauder (Jewish, Estée Lauder heir) has served as WJC president since 2007." },
  { name: "Holocaust restitution", type: "advocacy", description: "WJC has been central to Holocaust restitution and compensation claims." },
  { name: "Interfaith dialogue", type: "activity", description: "WJC engages in interfaith dialogue with Vatican, Muslim leaders, and other faiths." }
]);
updDesc('world-jewish-congress-israel-office', 'The Israel branch of the World Jewish Congress, an international organization representing Jewish communities in 100+ countries. Led by president Ronald Lauder (Jewish, Estée Lauder heir) since 2007. The WJC advocates for Jewish interests worldwide, has been central to Holocaust restitution claims, and engages in interfaith dialogue. The Israel office coordinates with the Israeli government on diaspora relations.');

addConn('western-wall-heritage-foundation', [
  { name: "Western Wall (Kotel)", type: "site", description: "The Western Wall is the holiest site where Jews are permitted to pray — a remnant of the Second Temple complex." },
  { name: "Rabbi of the Western Wall", type: "leadership", description: "The Rabbi of the Western Wall oversees religious services and customs at the site." },
  { name: "Pluralistic prayer controversy", type: "issue", description: "Ongoing controversy over egalitarian prayer at the Wall — the Robinson's Arch compromise." },
  { name: "Bar/Bat Mitzvah ceremonies", type: "ritual", description: "Thousands of Bar/Bat Mitzvah ceremonies are held at the Wall annually." }
]);
updDesc('western-wall-heritage-foundation', 'The Western Wall (Kotel) Heritage Foundation manages the holiest site where Jews are permitted to pray — a remnant of the retaining wall of Herod\'s Second Temple complex, destroyed by Rome in 70 CE. Millions visit annually. The site is a flashpoint for tensions between Orthodox authorities (who control the site) and liberal Jewish movements seeking egalitarian prayer. Notes placed in the Wall\'s cracks are a beloved tradition.');

addConn('temple-mount-haram-al-sharif', [
  { name: "Dome of the Rock", type: "structure", description: "The golden Dome of the Rock is one of the oldest and most iconic Islamic structures." },
  { name: "Al-Aqsa Mosque", type: "structure", description: "Al-Aqsa Mosque is the third holiest site in Islam." },
  { name: "First and Second Temples", type: "Jewish history", description: "The Temple Mount is where both Jewish Temples stood — the holiest site in Judaism." },
  { name: "Waqf administration", type: "governance", description: "The site is administered by the Jordanian Waqf under the status quo agreement." },
  { name: "Israeli-Palestinian conflict", type: "flashpoint", description: "The Temple Mount/Haram al-Sharif is the most contested religious site in the world." }
]);
updDesc('temple-mount-haram-al-sharif', 'The most contested religious site in the world. For Jews, it is the Temple Mount (Har HaBayit) — where both the First Temple (Solomon\'s, 957 BCE) and Second Temple (516 BCE-70 CE) stood. For Muslims, it is the Noble Sanctuary (Haram al-Sharif) housing the Dome of the Rock and Al-Aqsa Mosque. Administered by the Jordanian Waqf. Israeli police control access. Jewish prayer is officially prohibited under the status quo, though this is increasingly contested.');

addConn('masada-national-park', [
  { name: "Herod's fortress", type: "history", description: "Masada was King Herod's mountain fortress overlooking the Dead Sea." },
  { name: "Jewish revolt against Rome", type: "history", description: "In 73 CE, 960 Jewish zealots chose death over Roman slavery in a famous last stand." },
  { name: "UNESCO World Heritage Site", type: "designation", description: "Masada was designated a UNESCO World Heritage Site in 2001." },
  { name: "IDF oath ceremonies", type: "modern use", description: "IDF units take their oath of allegiance at Masada: 'Masada shall not fall again.'" },
  { name: "Yigael Yadin", type: "archaeologist", description: "Prof. Yigael Yadin (Jewish, Israeli) led the famous 1963-1965 Masada excavation." }
]);
updDesc('masada-national-park', 'An ancient fortress atop a plateau overlooking the Dead Sea, built by King Herod (73-31 BCE). In 73 CE, 960 Jewish zealots held out against the Roman X Legion, ultimately choosing mass suicide over slavery — one of history\'s most dramatic last stands. UNESCO World Heritage Site since 2001. IDF soldiers take their oath here: "Masada shall not fall again." Excavated by Prof. Yigael Yadin (1963-1965). Israel\'s most iconic archaeological site.');

addConn('church-of-the-holy-sepulchre-jerusalem', [
  { name: "Crucifixion and resurrection site", type: "Christian significance", description: "Believed to be the site of Jesus' crucifixion (Golgotha) and resurrection." },
  { name: "Six Christian denominations", type: "governance", description: "Shared by Greek Orthodox, Catholic, Armenian, Coptic, Ethiopian, and Syriac churches." },
  { name: "Status Quo agreement", type: "governance", description: "The 1757 Status Quo (confirmed in 1853) governs which denominations control which areas." },
  { name: "Muslim key-holders", type: "unique tradition", description: "The Nusseibeh and Joudeh Muslim families have held the keys since the 12th century." }
]);
updDesc('church-of-the-holy-sepulchre-jerusalem', 'Christianity\'s holiest site, believed to contain both Golgotha (where Jesus was crucified) and the Tomb of Christ (where he was buried and resurrected). Located in the Christian Quarter of Jerusalem\'s Old City. Shared by six Christian denominations under the 1757 Status Quo agreement. Uniquely, two Muslim families (Nusseibeh and Joudeh) have held the keys to the church since the 12th century, ensuring neutrality among competing Christian claims.');

addConn('cave-of-the-patriarchs-hebron', [
  { name: "Abraham, Isaac, Jacob", type: "biblical significance", description: "Traditional burial site of the Biblical patriarchs and matriarchs." },
  { name: "Second holiest site in Judaism", type: "religious status", description: "After the Temple Mount, the Cave of the Patriarchs is Judaism's holiest site." },
  { name: "Ibrahimi Mosque", type: "Islamic site", description: "Muslims know the site as the Ibrahimi Mosque — Abraham (Ibrahim) is revered in Islam." },
  { name: "1994 massacre", type: "tragedy", description: "In 1994, Baruch Goldstein killed 29 Muslim worshippers in a terrorist attack." },
  { name: "Israeli-Palestinian conflict", type: "flashpoint", description: "The site is divided between Jewish and Muslim sections and is heavily guarded." }
]);
updDesc('cave-of-the-patriarchs-hebron', 'The traditional burial site of the Biblical patriarchs and matriarchs — Abraham and Sarah, Isaac and Rebecca, Jacob and Leah. The second holiest site in Judaism and also sacred to Islam (as the Ibrahimi Mosque). The massive Herodian-era structure in Hebron is divided between Jewish and Muslim sections. The site was the scene of the 1994 massacre when Baruch Goldstein killed 29 Muslim worshippers. One of the most heavily guarded religious sites in the world.');

// ============================================================
// ISRAEL - REMAINING TECH & BUSINESS
// ============================================================
addConn('osem-nestl', [
  { name: "Nestlé", type: "owner", description: "Swiss food giant Nestlé acquired Osem in stages, reaching full ownership." },
  { name: "Bamba", type: "iconic product", description: "Osem makes Bamba, Israel's national snack — peanut-flavored puffs loved by every Israeli." },
  { name: "Israeli food culture", type: "cultural role", description: "Osem products are staples in every Israeli kitchen." },
  { name: "Founded 1942", type: "history", description: "Osem was founded in 1942 during the British Mandate period." }
]);
updDesc('osem-nestl', 'Israel\'s largest food manufacturer, now wholly owned by Swiss giant Nestlé. Founded in 1942 during the British Mandate. Osem makes Bamba (Israel\'s beloved peanut-flavored puffs — credited with reducing peanut allergies in Israeli children), Bissli, soup powders, pasta, and hundreds of other products. Bamba is so iconic that Israeli parents abroad have it shipped to them. Osem is a pillar of Israeli food culture.');

addConn('birthright-israel-taglit', [
  { name: "Sheldon Adelson", type: "mega-donor", description: "Sheldon Adelson donated $410M to Birthright — the largest single philanthropic gift." },
  { name: "Michael Steinhardt", type: "co-founder", description: "Michael Steinhardt (Jewish hedge fund pioneer) co-founded Birthright with Charles Bronfman." },
  { name: "Charles Bronfman", type: "co-founder", description: "Charles Bronfman (Jewish, Canadian, Seagram heir) co-founded Birthright." },
  { name: "800,000+ participants", type: "impact", description: "Over 800,000 young Jews from 68 countries have taken the free 10-day trip." },
  { name: "Israeli government", type: "funder", description: "The Israeli government is a major co-funder of Birthright." }
]);
updDesc('birthright-israel-taglit', 'Founded in 1999 by Michael Steinhardt and Charles Bronfman to provide free 10-day trips to Israel for young Jews aged 18-26. Over 800,000 participants from 68 countries. Sheldon Adelson donated $410 million — the largest single philanthropic gift in Jewish history. Israel\'s government co-funds the program. Studies show Birthright alumni are significantly more likely to marry Jewish, raise Jewish children, and support Israel.');

addConn('nefesh-b-nefesh-israel', [
  { name: "North American aliyah", type: "mission", description: "The Israel-based operations of Nefesh B'Nefesh supporting new immigrants." },
  { name: "Jewish Agency", type: "partner", description: "Works with the Jewish Agency on immigration processing and absorption." },
  { name: "Israeli government", type: "partner", description: "Partners with the Ministry of Aliyah and Integration." },
  { name: "65,000+ olim", type: "impact", description: "Has facilitated aliyah of 65,000+ North Americans and British Jews." }
]);
updDesc('nefesh-b-nefesh-israel', 'The Israel-based operations of Nefesh B\'Nefesh, supporting new immigrants (olim) after their arrival. Works with the Jewish Agency and Israeli Ministry of Aliyah and Integration. Provides employment assistance, housing guidance, bureaucratic navigation, and community integration. Has helped 65,000+ North Americans and British Jews make aliyah since 2002.');

addConn('israel-innovation-authority', [
  { name: "Israeli government", type: "parent body", description: "The IIA is a government authority under the Ministry of Innovation, Science, and Technology." },
  { name: "Startup funding", type: "mission", description: "IIA provides grants and support for Israeli startups and R&D projects." },
  { name: "Start-Up Nation ecosystem", type: "role", description: "IIA is a key pillar of Israel's startup ecosystem." },
  { name: "Multinational R&D centers", type: "attraction", description: "IIA helps attract multinational R&D centers to Israel." }
]);
updDesc('israel-innovation-authority', 'The Israeli government authority responsible for fostering innovation. Provides grants, incentives, and infrastructure for startups and R&D. Successor to the Office of the Chief Scientist. The IIA is a key architect of Israel\'s \"Start-Up Nation\" ecosystem, supporting thousands of companies annually. Also operates international cooperation programs and helps attract multinational R&D centers to Israel.');

addConn('start-up-nation-central', [
  { name: "Paul Singer", type: "funder", description: "Paul Singer (Jewish, Elliott Management) funded the creation of Start-Up Nation Central." },
  { name: "Israeli tech ecosystem mapping", type: "mission", description: "SNC maps and connects the Israeli innovation ecosystem." },
  { name: "Start-Up Nation book", type: "inspiration", description: "Inspired by the bestseller 'Start-Up Nation' by Dan Senor and Saul Singer." },
  { name: "Foreign corporations", type: "clients", description: "SNC connects global corporations with Israeli innovation." }
]);
updDesc('start-up-nation-central', 'A nonprofit connecting global businesses with Israeli innovation, funded by Paul Singer (Jewish, Elliott Management). Inspired by the bestselling book "Start-Up Nation" (2009) by Dan Senor and Saul Singer. SNC maps Israel\'s tech ecosystem, connects Fortune 500 companies with Israeli startups, and promotes Israel as a global innovation hub. Israel has the most startups per capita of any country in the world.');

addConn('talpiot-program', [
  { name: "IDF", type: "operator", description: "Talpiot is an elite IDF training program for exceptionally talented recruits." },
  { name: "Hebrew University", type: "academic partner", description: "Talpiot cadets study physics, math, and computer science at Hebrew University." },
  { name: "Tech industry pipeline", type: "impact", description: "Talpiot alumni have founded and led dozens of major tech companies." },
  { name: "Israel's technological edge", type: "strategic value", description: "Talpiot is considered a key factor in Israel's military and technological superiority." }
]);
updDesc('talpiot-program', 'The IDF\'s most elite training program, selecting ~50 recruits per year from thousands of applicants. Cadets undergo 40 months of intensive study in physics, mathematics, and computer science at Hebrew University while also completing military training. Talpiot alumni (\"Talpions\") have founded dozens of tech companies and serve in senior defense and intelligence positions. The program is considered a key driver of Israel\'s technological superiority.');

addConn('start-up-nation-ecosystem', [
  { name: "6,000+ startups", type: "scale", description: "Israel has over 6,000 active tech startups — the highest density per capita in the world." },
  { name: "IDF technology units", type: "talent pipeline", description: "Unit 8200, Talpiot, and other IDF units create a unique tech talent pipeline." },
  { name: "Venture capital", type: "funding", description: "Israel attracts more venture capital per capita than any other country." },
  { name: "NASDAQ listings", type: "financial", description: "Israel has over 90 companies on NASDAQ — more than any country outside the US and China." }
]);
updDesc('start-up-nation-ecosystem', 'Israel has 6,000+ active tech startups — the highest per-capita density in the world. The ecosystem is fueled by IDF technology units (Unit 8200, Talpiot), world-class universities, massive venture capital investment ($10+ billion annually), and a culture of risk-taking. Israel has 90+ companies on NASDAQ — more than any country except the US and China. Major exits include Waze ($1.1B to Google), Mobileye ($15.3B to Intel), and hundreds more.');

// ============================================================
// ISRAEL - REMAINING ACQUISITIONS & COMPANIES
// ============================================================
addConn('orbotech-kla', [
  { name: "KLA Corporation", type: "acquirer", description: "KLA acquired Orbotech for $3.4 billion in 2019." },
  { name: "Semiconductor inspection", type: "technology", description: "Orbotech developed inspection systems for PCBs and flat panel displays." },
  { name: "Israeli semiconductor industry", type: "sector", description: "Orbotech was part of Israel's strong semiconductor equipment industry." }
]);
updDesc('orbotech-kla', 'Israeli semiconductor inspection company acquired by KLA Corporation for $3.4 billion in 2019. Orbotech developed automated optical inspection systems for PCBs, flat panel displays, and semiconductor manufacturing. Founded in 1981 in Yavne, Israel. The acquisition strengthened KLA\'s position as a leading semiconductor process control company and maintained Israel as a key R&D center.');

addConn('mellanox-technologies-nvidia', [
  { name: "NVIDIA", type: "acquirer", description: "NVIDIA acquired Mellanox for $6.9 billion in 2020 — one of the largest Israeli tech exits." },
  { name: "Eyal Waldman", type: "co-founder/CEO", description: "Eyal Waldman (Jewish, Israeli) co-founded Mellanox and led it for 20 years." },
  { name: "InfiniBand technology", type: "product", description: "Mellanox's InfiniBand interconnect technology powers the world's fastest supercomputers." },
  { name: "AI computing", type: "relevance", description: "Mellanox networking is critical infrastructure for NVIDIA's AI training clusters." }
]);
updDesc('mellanox-technologies-nvidia', 'Co-founded by Eyal Waldman (Jewish, Israeli), Mellanox was acquired by NVIDIA for $6.9 billion in 2020. Mellanox\'s InfiniBand and Ethernet networking technology connects the world\'s fastest supercomputers and is now critical infrastructure for NVIDIA\'s AI training clusters. The acquisition made NVIDIA a networking giant alongside its GPU dominance. R&D remains in Israel, where NVIDIA now employs 3,000+ engineers.');

addConn('habana-labs-intel', [
  { name: "Intel", type: "acquirer", description: "Intel acquired Habana Labs for $2 billion in 2019." },
  { name: "AI chip design", type: "product", description: "Habana Labs develops AI training and inference processors." },
  { name: "David Dahan", type: "co-founder", description: "David Dahan (Jewish, Israeli) co-founded Habana Labs." },
  { name: "Gaudi AI processor", type: "product", description: "Habana Labs' Gaudi processor competes with NVIDIA GPUs for AI training." }
]);
updDesc('habana-labs-intel', 'Israeli AI chip startup acquired by Intel for $2 billion in 2019. Co-founded by David Dahan (Jewish, Israeli). Habana Labs develops the Gaudi AI training processor, which competes with NVIDIA\'s GPUs. The Gaudi chip offers competitive performance for large language model training at lower cost. Intel Is using Habana\'s technology in its bid to compete in the exploding AI chip market.');

addConn('storedot', [
  { name: "Doron Myersdorf", type: "co-founder/CEO", description: "Dr. Doron Myersdorf (Jewish, Israeli) co-founded StoreDot." },
  { name: "Ultra-fast charging batteries", type: "technology", description: "StoreDot develops extreme fast-charging (XFC) batteries for EVs." },
  { name: "Samsung/BP investments", type: "investors", description: "Strategic investors include Samsung, BP, Daimler, and VinFast." },
  { name: "5-minute charge", type: "breakthrough", description: "StoreDot aims to deliver EV batteries that charge in 5 minutes." }
]);
updDesc('storedot', 'Israeli battery technology company co-founded by Dr. Doron Myersdorf. StoreDot develops extreme fast-charging (XFC) lithium-ion batteries that could charge EVs in 5 minutes. Strategic investors include Samsung, BP, Daimler/Mercedes, and VinFast. The company\'s silicon-dominant battery technology has been validated by multiple automotive OEMs. If successful, StoreDot could revolutionize electric vehicle adoption.');

addConn('innoviz-technologies', [
  { name: "Omer Keilaf", type: "co-founder/CEO", description: "Omer Keilaf (Jewish, Israeli) co-founded Innoviz." },
  { name: "LiDAR technology", type: "product", description: "Innoviz develops solid-state LiDAR sensors for autonomous vehicles." },
  { name: "BMW partnership", type: "customer", description: "BMW selected Innoviz's LiDAR for its autonomous driving platform." },
  { name: "NASDAQ listed", type: "financial", description: "Innoviz went public on NASDAQ via SPAC." }
]);
updDesc('innoviz-technologies', 'Israeli LiDAR company co-founded by Omer Keilaf (Jewish, Israeli, IDF technology veteran). Innoviz develops solid-state LiDAR sensors critical for autonomous driving. BMW selected Innoviz as its LiDAR supplier. Listed on NASDAQ. LiDAR (Light Detection and Ranging) creates 3D maps of surroundings, enabling self-driving vehicles to \"see.\" Innoviz represents Israel\'s growing role in autonomous vehicle technology.');

addConn('ree-automotive', [
  { name: "Daniel Barel", type: "co-founder/CEO", description: "Daniel Barel (Jewish, Israeli) co-founded REE Automotive." },
  { name: "EV platform technology", type: "product", description: "REE develops a revolutionary flat EV platform with all components in the wheel." },
  { name: "NASDAQ listed", type: "financial", description: "REE went public on NASDAQ." },
  { name: "Hino Motors partnership", type: "customer", description: "Toyota's Hino Motors invested in REE's commercial EV platform." }
]);
updDesc('ree-automotive', 'Israeli EV technology company co-founded by Daniel Barel. REE developed a revolutionary approach: integrating all drivetrain components (motor, steering, suspension, braking) into the wheel, creating a completely flat EV platform. This enables infinite body configurations. Listed on NASDAQ. Partnerships include Hino Motors (Toyota). REE represents Israel\'s contribution to the electric vehicle revolution.');

addConn('orcam-technologies', [
  { name: "Amnon Shashua", type: "co-founder", description: "Prof. Amnon Shashua (Jewish, Israeli, Mobileye founder) also co-founded OrCam." },
  { name: "Assistive AI device", type: "product", description: "OrCam MyEye is a wearable AI device that reads text aloud for visually impaired users." },
  { name: "Mobileye connection", type: "technology link", description: "OrCam uses computer vision technology related to Mobileye's automotive AI." },
  { name: "Social impact", type: "mission", description: "OrCam's technology has transformed lives of visually impaired and learning-disabled people." }
]);
updDesc('orcam-technologies', 'Co-founded by Prof. Amnon Shashua and Ziv Aviram (Jewish, Israeli — the same team behind Mobileye). OrCam develops wearable AI devices for visually impaired people. The OrCam MyEye clips onto glasses and reads text, recognizes faces, identifies products, and more using computer vision. The technology has transformed the lives of hundreds of thousands of blind and visually impaired people worldwide.');

addConn('watergen', [
  { name: "Maxim Pasik", type: "founder", description: "Maxim Pasik (Jewish, Israeli) founded Watergen." },
  { name: "Water from air", type: "technology", description: "Watergen's atmospheric water generators extract drinking water from air humidity." },
  { name: "Military/humanitarian applications", type: "use cases", description: "Used by IDF, disaster relief organizations, and developing countries." },
  { name: "Global water crisis", type: "social impact", description: "Watergen technology addresses the global water scarcity crisis." }
]);
updDesc('watergen', 'Israeli company founded by Maxim Pasik that develops atmospheric water generators — machines that extract clean drinking water from air humidity. The technology has military, humanitarian, and commercial applications. Used by the IDF, deployed in disaster zones, and installed in communities facing water scarcity. Watergen represents Israel\'s leadership in water technology, a field where the desert nation has become a global pioneer.');

addConn('given-imaging-medtronic', [
  { name: "Medtronic", type: "acquirer", description: "Medtronic acquired Given Imaging for $860 million in 2014." },
  { name: "PillCam", type: "invention", description: "Given Imaging invented the PillCam — a swallowable capsule endoscope." },
  { name: "Gavriel Iddan", type: "inventor", description: "Dr. Gavriel Iddan (Jewish, Israeli, former Rafael engineer) invented the PillCam." },
  { name: "Medical breakthrough", type: "impact", description: "The PillCam revolutionized gastrointestinal diagnostics by eliminating traditional endoscopy for many patients." }
]);
updDesc('given-imaging-medtronic', 'Israeli medical device company acquired by Medtronic for $860 million in 2014. Given Imaging invented the PillCam — a revolutionary swallowable capsule with a tiny camera that photographs the entire gastrointestinal tract. Invented by Dr. Gavriel Iddan (Jewish, Israeli), a former Rafael Advanced Defense Systems engineer who applied missile camera technology to medicine. Over 40 million PillCam procedures have been performed.');

addConn('israeli-wine-industry', [
  { name: "Golan Heights Winery", type: "leading winery", description: "Golan Heights Winery put Israeli wine on the global map in the 1980s." },
  { name: "Baron Edmond de Rothschild", type: "historic patron", description: "Rothschild founded Carmel Winery in 1882, launching the modern Israeli wine industry." },
  { name: "200+ wineries", type: "scale", description: "Israel now has 200+ wineries, many in the Judean Hills, Galilee, and Golan Heights." },
  { name: "Yarden/Castel", type: "premium brands", description: "Yarden (Golan Heights) and Domaine du Castel are Israel's most acclaimed wines." }
]);
updDesc('israeli-wine-industry', 'Israel\'s wine industry was revived by Baron Edmond de Rothschild, who founded Carmel Winery in 1882. Today, 200+ wineries operate across Israel, with the best wines from the Golan Heights, Galilee, and Judean Hills. Golan Heights Winery\'s Yarden brand and Domaine du Castel consistently win international awards. Israel has emerged as a \"New World\" wine region, with ancient winemaking traditions dating back 5,000 years.');

addConn('ahava-dead-sea-laboratories', [
  { name: "Dead Sea minerals", type: "source", description: "AHAVA uses Dead Sea minerals for skincare and cosmetics products." },
  { name: "BDS target", type: "political", description: "AHAVA was targeted by BDS because its factory was in the occupied West Bank." },
  { name: "Chinese acquisition", type: "deal", description: "AHAVA was acquired by Chinese conglomerate FIMI Opportunity Funds and Fosun." },
  { name: "Global distribution", type: "market", description: "AHAVA products are sold in 50+ countries through department stores and specialty retailers." }
]);
updDesc('ahava-dead-sea-laboratories', 'An Israeli cosmetics company harnessing Dead Sea minerals for skincare products. The Dead Sea, Earth\'s lowest point, has unique mineral-rich waters with therapeutic properties. AHAVA was a BDS target due to its factory in Mitzpe Shalem (West Bank settlement); now relocated. Acquired by Chinese interests. AHAVA products are sold in 50+ countries. The brand represents Israel\'s commercialization of the Dead Sea\'s natural resources.');

addConn('ide-technologies', [
  { name: "Desalination", type: "technology", description: "IDE is a world leader in water desalination technology." },
  { name: "Israel's water miracle", type: "impact", description: "IDE's desalination plants provide 70%+ of Israel's household water." },
  { name: "Sorek plant", type: "flagship", description: "The Sorek desalination plant is the world's largest and most advanced reverse-osmosis facility." },
  { name: "Global projects", type: "operations", description: "IDE has built desalination plants in 40+ countries worldwide." }
]);
updDesc('ide-technologies', 'Israeli water technology company that is a world leader in desalination. IDE\'s reverse-osmosis plants provide over 70% of Israel\'s household drinking water, turning the desert nation into a water superpower. The Sorek plant near Tel Aviv is the world\'s largest and most advanced seawater desalination facility. IDE has built plants in 40+ countries including the US, China, India, and Australia.');

addConn('mekorot', [
  { name: "Israel's national water company", type: "role", description: "Mekorot is Israel's national water company, managing 70% of Israel's water supply." },
  { name: "National Water Carrier", type: "infrastructure", description: "Mekorot operates the National Water Carrier, bringing water from the Sea of Galilee to the Negev." },
  { name: "Water recycling innovation", type: "technology", description: "Israel recycles 87% of its wastewater — more than any other country — through Mekorot's systems." },
  { name: "Water security", type: "strategic", description: "Mekorot ensures Israel's water security despite being located in an arid region." }
]);
updDesc('mekorot', 'Israel\'s national water company, managing approximately 70% of the country\'s water supply. Operates the National Water Carrier (a massive pipeline from the Sea of Galilee to the Negev) and dozens of desalination and treatment plants. Israel recycles 87% of its wastewater for agriculture — the highest rate in the world — largely through Mekorot\'s systems. This has transformed Israel from a water-poor nation to a water superpower.');

// ============================================================
// SAVE
// ============================================================
fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0,pc=0;for(const c in data.countries)for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;pc+=(e.connections||[]).length;}
console.log(`addConnections8.js done! ${tc} entries, ${wc} with connections, ${pc} total connections, ${Object.keys(people.people).length} people.`);
