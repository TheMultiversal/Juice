// addConnections13.js - Remaining worldwide entries + international organizations
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
// US REMAINING
// ============================================================

addConn('baupost-group', [
  { name: "Seth Klarman", type: "founder/CEO", description: "Founded and led by Seth Klarman (Jewish), one of the most successful value investors in history." },
  { name: "Harvard Business School", type: "education", description: "Klarman is a Harvard Business School graduate and major Harvard donor." },
  { name: "The Times of Israel", type: "media", description: "Klarman is a founding investor and board member of The Times of Israel." },
  { name: "Israel Policy Forum", type: "advocacy", description: "Klarman supports centrist Israel advocacy through organizations like the Israel Policy Forum." }
]);
updDesc('baupost-group', 'Boston-based hedge fund founded and led by Seth Klarman (Jewish), managing approximately $27 billion. Klarman is the author of "Margin of Safety," one of the most sought-after investing books. A major philanthropist, Klarman is a founding investor of The Times of Israel, major Harvard donor, and supporter of centrist Israel advocacy. Forbes estimated his net worth at over $1.5 billion.');

addConn('the-blackstone-group', [
  { name: "Stephen Schwarzman", type: "co-founder/CEO", description: "Co-founded by Stephen Schwarzman (Jewish) in 1985, now one of the world's largest alternative asset managers." },
  { name: "Pete Peterson", type: "co-founder", description: "Co-founded with Pete Peterson, former Nixon Commerce Secretary." },
  { name: "Jonathan Gray", type: "president", description: "Jonathan Gray (Jewish) is President and COO, instrumental in Blackstone's real estate dominance." },
  { name: "Hilton Hotels", type: "landmark deal", description: "Blackstone's $26 billion acquisition of Hilton Hotels in 2007 became the most profitable private equity deal ever." },
  { name: "Trump administration relationship", type: "political", description: "Schwarzman served as chairman of President Trump's Strategic and Policy Forum." }
]);
updDesc('the-blackstone-group', 'World\'s largest alternative asset manager with over $1 trillion in assets under management. Co-founded in 1985 by Stephen Schwarzman (Jewish) and Pete Peterson. President Jonathan Gray (Jewish) built the world\'s largest real estate investment platform. The $26 billion Hilton Hotels acquisition in 2007 generated $14 billion in profit , the most profitable PE deal in history. Schwarzman is a major philanthropist supporting education, including a $350 million gift to MIT.');

// ============================================================
// JAPAN
// ============================================================

addConn('jewish-community-of-japan', [
  { name: "Tokyo JCC", type: "community center", description: "The Tokyo Jewish Community Center serves as the hub of Jewish life in Japan." },
  { name: "Chabad Japan", type: "religious services", description: "Chabad-Lubavitch operates community centers in Tokyo and other Japanese cities." },
  { name: "Israeli embassy", type: "diplomatic", description: "Works closely with the Israeli embassy in Tokyo on community affairs." },
  { name: "Fugu Plan", type: "historical", description: "During WWII, some Japanese officials proposed the 'Fugu Plan' to settle Jewish refugees in Manchuria." }
]);
updDesc('jewish-community-of-japan', 'Small but active Jewish community in Japan numbering approximately 1,000-2,000 people, centered in Tokyo with smaller groups in Osaka and Kobe. The Tokyo Jewish Community Center serves as the hub. During WWII, Japan had a complex relationship with Jews , the "Fugu Plan" proposed settling Jewish refugees in Manchuria, and diplomats like Chiune Sugihara saved thousands. Today the community includes Israeli expats, American residents, and businesspeople.');

addConn('sugihara-museum-yaotsu', [
  { name: "Chiune Sugihara", type: "honoree", description: "Commemorates Japanese diplomat Chiune Sugihara who saved 6,000+ Jews by issuing transit visas in Lithuania in 1940." },
  { name: "Yad Vashem", type: "recognition", description: "Sugihara was recognized as Righteous Among the Nations by Yad Vashem in 1985." },
  { name: "Lithuanian consul", type: "historical role", description: "As Japanese vice-consul in Kaunas, Lithuania, Sugihara issued visas against government orders." },
  { name: "Mir Yeshiva", type: "saved community", description: "Among those saved was the entire Mir Yeshiva, the only European yeshiva to survive the Holocaust intact." }
]);
updDesc('sugihara-museum-yaotsu', 'Museum in Yaotsu, Gifu Prefecture, honoring Chiune Sugihara , the Japanese diplomat who saved over 6,000 Jews by issuing transit visas in Kaunas, Lithuania in 1940, defying government orders. Among those saved was the entire Mir Yeshiva , the only European yeshiva that survived the Holocaust intact. Recognized as Righteous Among the Nations by Yad Vashem in 1985. Called the "Japanese Schindler," Sugihara was largely forgotten in Japan until decades after WWII.');

addConn('kobe-jewish-community', [
  { name: "WWII transit point", type: "historical", description: "Kobe was a key transit point for Jewish refugees fleeing Europe via Japan in 1940-1941." },
  { name: "Sugihara refugees", type: "connection", description: "Many Jews saved by Sugihara passed through Kobe before continuing to Shanghai or the Americas." },
  { name: "Ohel Shelomo Synagogue", type: "historic site", description: "The former Ohel Shelomo Synagogue served the community until 1970." }
]);
updDesc('kobe-jewish-community', 'Historic Jewish community in Kobe, Japan, significant as a transit point for Jewish refugees during WWII. In 1940-1941, approximately 4,500 Jewish refugees , many carrying Sugihara visas , passed through Kobe before continuing to Shanghai or the Americas. The local community and the Jewcom (Jewish Committee) of Kobe provided crucial assistance. The Ohel Shelomo Synagogue served the community from 1912 to 1970.');

// ============================================================
// CHINA
// ============================================================

addConn('shanghai-jewish-refugees-museum', [
  { name: "Shanghai Ghetto", type: "historical", description: "Documents the story of approximately 20,000 Jewish refugees who found haven in Shanghai during WWII." },
  { name: "Ohel Moishe Synagogue", type: "location", description: "Located in the former Ohel Moishe Synagogue in the Hongkou district." },
  { name: "Japanese occupation", type: "historical context", description: "Under Japanese occupation, Jews were confined to the Restricted Sector for Stateless Refugees." },
  { name: "Chinese-Israeli relations", type: "diplomatic", description: "The museum has become a symbol of Chinese-Jewish friendship and Chinese-Israeli diplomacy." }
]);
updDesc('shanghai-jewish-refugees-museum', 'Located in the former Ohel Moishe Synagogue in Shanghai\'s Hongkou district. Documents the story of approximately 20,000 Jewish refugees who found haven in Shanghai during WWII , one of the few places in the world accepting Jews without visas. Despite Japanese restrictions confining Jews to the "Restricted Sector" from 1943, the Shanghai Jewish community survived the war. The museum is a powerful symbol of Chinese-Jewish friendship and has been expanded and renovated by the Chinese government.');

addConn('kaifeng-jewish-community', [
  { name: "Ancient Silk Road", type: "origin", description: "Jews arrived in Kaifeng via the Silk Road as early as the 7th century CE." },
  { name: "Matteo Ricci", type: "historical documentation", description: "Jesuit priest Matteo Ricci documented the community in 1605 after meeting a Kaifeng Jew in Beijing." },
  { name: "Kaifeng stone inscriptions", type: "evidence", description: "Stone inscriptions from 1489, 1512, and 1663 document the community's history." },
  { name: "Modern reconnection", type: "revival", description: "In recent decades, some Kaifeng descendants have reconnected with Judaism and made aliyah to Israel." }
]);
updDesc('kaifeng-jewish-community', 'One of the most remarkable diaspora communities in Jewish history. Jews arrived in Kaifeng, China via the Silk Road as early as the 7th century CE. Stone inscriptions from 1489-1663 and Jesuit documentation from 1605 confirm a thriving community with a synagogue, Torah scrolls, and rabbis. The community gradually assimilated over centuries after the last rabbi died in the early 1800s. In recent decades, some descendants have reconnected with Judaism, and a few have made aliyah to Israel. DNA studies confirm Middle Eastern ancestry.');

addConn('sassoon-house-shanghai', [
  { name: "Sir Victor Sassoon", type: "builder", description: "Built by Sir Victor Sassoon (Jewish, Baghdadi), one of the wealthiest men in Asia in the 1920s-30s." },
  { name: "Sassoon family", type: "dynasty", description: "The Sassoons, known as 'the Rothschilds of the East,' built a business empire from Baghdad to Bombay to Shanghai." },
  { name: "The Bund", type: "location", description: "Located on Shanghai's famous Bund waterfront; now the Fairmont Peace Hotel." },
  { name: "Cathay Hotel", type: "historical name", description: "Originally known as the Cathay Hotel, it was the most luxurious hotel in Asia." }
]);
updDesc('sassoon-house-shanghai', 'Art Deco landmark on Shanghai\'s famous Bund waterfront, built in 1929 by Sir Victor Sassoon (Jewish, of Baghdadi origin). Originally the Cathay Hotel , the most luxurious hotel in Asia , it is now the Fairmont Peace Hotel. The Sassoon family, known as "the Rothschilds of the East," built a vast business empire spanning from Baghdad to Bombay to Shanghai. Victor Sassoon also helped refugee Jews during WWII, providing housing in properties he owned.');

addConn('ohel-rachel-synagogue-shanghai', [
  { name: "Jacob Elias Sassoon", type: "builder", description: "Built in 1920 by Jacob Elias Sassoon (Jewish, Baghdadi) and named after his wife Rachel." },
  { name: "Sephardic community", type: "congregation", description: "Served Shanghai's Sephardic/Baghdadi Jewish community." },
  { name: "Chinese government", type: "current status", description: "Currently used by the Shanghai Municipal Education Commission; occasionally opens for Jewish services." },
  { name: "Largest synagogue in East Asia", type: "distinction", description: "The largest synagogue in East Asia, capable of seating 700 people." }
]);
updDesc('ohel-rachel-synagogue-shanghai', 'The largest synagogue in East Asia, built in 1920 by Sir Jacob Elias Sassoon (Jewish, Baghdadi origin) and named after his wife Rachel. Located in Shanghai\'s former French Concession, it served the Sephardic/Baghdadi Jewish community. The Greek Revival-style building seats 700 people. Currently used by the Shanghai Municipal Education Commission but occasionally opens for Jewish services. A key landmark of Shanghai\'s Jewish heritage.');

// ============================================================
// MIDDLE EAST & NORTH AFRICA (HISTORIC)
// ============================================================

addConn('iranian-jewish-community', []);
addConn('tehran-jewish-committee', [
  { name: "Iranian parliament seat", type: "political", description: "Iranian Jews have one guaranteed seat in the Majlis (parliament) under Iran's constitution." },
  { name: "Ancient community", type: "historical", description: "Jews have lived in Iran for over 2,700 years, making it one of the oldest Jewish communities in the world." },
  { name: "Esther and Mordechai tomb", type: "heritage site", description: "The Tomb of Esther and Mordechai in Hamadan is one of Iran's most important Jewish heritage sites." },
  { name: "Post-revolution decline", type: "demographics", description: "From 80,000 Jews before the 1979 revolution, the community has declined to approximately 8,000-10,000." }
]);
updDesc('tehran-jewish-committee', 'Represents Iran\'s Jewish community , one of the oldest in the world, dating back over 2,700 years to the Babylonian exile. Iran\'s constitution guarantees Jews one seat in the Majlis (parliament). The community maintains synagogues, schools, and a hospital in Tehran. From approximately 80,000 before the 1979 Islamic Revolution, the community has declined to 8,000-10,000 , still the largest Jewish population in the Middle East outside Israel. The Tomb of Esther and Mordechai in Hamadan is a major heritage site.');

addConn('egyptian-jewish-community-historic', [
  { name: "Ancient Alexandria", type: "historical", description: "Jewish community in Egypt dates to the 3rd century BCE; Alexandria was a center of Hellenistic Jewish culture." },
  { name: "Philo of Alexandria", type: "historical figure", description: "Philo of Alexandria (20 BCE-50 CE), a Jewish philosopher who influenced early Christian thought." },
  { name: "1956 Suez Crisis expulsion", type: "historical event", description: "Most Egyptian Jews were expelled or fled after the 1956 Suez Crisis and subsequent nationalizations." },
  { name: "Maimonides in Cairo", type: "heritage", description: "Moses Maimonides (1138-1204), the greatest medieval Jewish philosopher, spent most of his life in Cairo." }
]);
updDesc('egyptian-jewish-community-historic', 'One of the oldest Jewish communities in the world, dating to the 3rd century BCE. Alexandria was a center of Hellenistic Jewish culture , home to philosopher Philo of Alexandria and the famous Septuagint translation. Moses Maimonides (1138-1204), the greatest medieval Jewish philosopher, lived and worked in Cairo. At its peak in the 1940s, approximately 80,000 Jews lived in Egypt. Most were expelled or fled after 1948 and especially after the 1956 Suez Crisis. Fewer than 10 Jews remain today.');

addConn('ben-ezra-synagogue-cairo', [
  { name: "Cairo Geniza", type: "landmark discovery", description: "The Cairo Geniza , a treasure trove of 400,000 manuscript fragments spanning 1,000 years , was discovered here in 1896." },
  { name: "Solomon Schechter", type: "discoverer", description: "Rabbinical scholar Solomon Schechter removed and studied the Geniza fragments, now held at Cambridge University." },
  { name: "Egyptian government restoration", type: "restoration", description: "Restored by the Egyptian government and reopened in 2023 after a major $6.4 million renovation." },
  { name: "Maimonides connection", type: "heritage", description: "Tradition holds that Maimonides prayed at the synagogue." }
]);
updDesc('ben-ezra-synagogue-cairo', 'Ancient synagogue in Old Cairo, famous as the site of the Cairo Geniza , a repository of approximately 400,000 manuscript fragments spanning 1,000 years, discovered in 1896 by Solomon Schechter. The fragments, now mostly at Cambridge University, revolutionized understanding of medieval Jewish, Islamic, and Mediterranean history. Tradition holds that Maimonides prayed here. Restored and reopened by the Egyptian government in 2023 after a major $6.4 million renovation.');

addConn('syrian-jewish-heritage-aleppo-damascus', [
  { name: "Aleppo Codex", type: "heritage artifact", description: "The Aleppo Codex (c. 930 CE), the oldest near-complete manuscript of the Hebrew Bible, was kept in Aleppo for 600 years." },
  { name: "Great Synagogue of Aleppo", type: "heritage site", description: "The Great Synagogue of Aleppo (Joab's Synagogue), dating to the 5th century, was damaged in the 1947 Aleppo pogrom." },
  { name: "1947 Aleppo pogrom", type: "historical event", description: "In 1947, anti-Jewish riots destroyed much of Aleppo's Jewish quarter." },
  { name: "Brooklyn Syrian Jewish community", type: "diaspora", description: "Most Syrian Jews now live in Brooklyn, NY (60,000+), Mexico City, and Buenos Aires." }
]);
updDesc('syrian-jewish-heritage-aleppo-damascus', 'Syria\'s Jewish community was one of the oldest in the world, with roots in biblical times. Aleppo was custodian of the Aleppo Codex (c. 930 CE), the oldest near-complete Hebrew Bible manuscript. The Great Synagogue of Aleppo (Joab\'s Synagogue, 5th century) was damaged in the 1947 pogrom. Damascus had an equally ancient community. From approximately 30,000 Jews in the 1940s, nearly all emigrated , most to Brooklyn, NY (now 60,000+ community), Mexico City, and Buenos Aires. Fewer than 10 Jews remain in Syria.');

addConn('iraqi-jewish-community-historic', [
  { name: "Babylonian Talmud", type: "religious heritage", description: "Iraq's Jewish community produced the Babylonian Talmud , the most authoritative text in Rabbinic Judaism." },
  { name: "Farhud (1941)", type: "historical event", description: "The Farhud pogrom of June 1941 killed approximately 180 Jews and injured 1,000 in Baghdad." },
  { name: "Operation Ezra and Nehemiah", type: "migration", description: "In 1950-1951, approximately 120,000 Iraqi Jews emigrated to Israel in mass airlifts." },
  { name: "Sassoon Eskell", type: "historical figure", description: "Sir Sassoon Eskell (Jewish) was Iraq's first minister of finance and helped draft Iraq's constitution." }
]);
updDesc('iraqi-jewish-community-historic', 'One of the most ancient and distinguished Jewish communities, tracing to the Babylonian exile of 586 BCE. Iraqi Jews produced the Babylonian Talmud, the most authoritative text in Rabbinic Judaism. Baghdad was a center of Jewish learning for over 2,500 years. Sir Sassoon Eskell (Jewish) was Iraq\'s first finance minister. The Farhud pogrom of 1941 was a turning point. In 1950-1951, Operation Ezra and Nehemiah airlifted approximately 120,000 Jews to Israel, effectively ending 2,600 years of continuous Jewish presence. Fewer than 5 Jews remain in Iraq today.');

addConn('babylonian-jewry-heritage-center-israel', [
  { name: "Iraqi Jewish diaspora in Israel", type: "community", description: "Serves the large community of Iraqi-origin Jews in Israel, numbering approximately 600,000." },
  { name: "Babylonian Talmud heritage", type: "cultural mission", description: "Preserves the legacy of Babylonian Jewish scholarship and the Talmud." },
  { name: "Iraqi Jewish archives", type: "controversy", description: "Advocates for the return of Iraqi Jewish archives seized by the Iraqi government and later recovered by the US." },
  { name: "Or Yehuda", type: "location", description: "Located in Or Yehuda, a city near Tel Aviv with a large Iraqi-Jewish population." }
]);
updDesc('babylonian-jewry-heritage-center-israel', 'Heritage center in Or Yehuda, Israel, preserving the 2,600-year legacy of Babylonian/Iraqi Jewry. Houses artifacts, photographs, and documents from Iraq\'s Jewish community. Approximately 600,000 Israelis trace their roots to Iraq. The center has been involved in efforts to secure the return of Iraqi Jewish archives , tens of thousands of documents seized by Saddam Hussein\'s regime, later found by US forces, and controversially returned to Iraq despite Jewish community objections.');

addConn('yemeni-jewish-community-historic', [
  { name: "Operation Magic Carpet", type: "migration", description: "In 1949-1950, Operation Magic Carpet airlifted approximately 49,000 Yemeni Jews to Israel." },
  { name: "Ancient heritage", type: "historical", description: "Yemeni Jews claim their community dates to the time of King Solomon and the Queen of Sheba." },
  { name: "Yemenite Jewish culture", type: "cultural", description: "Preserved unique liturgy, music, silverwork traditions, and the Baladi prayer rite." },
  { name: "Missing Yemenite children affair", type: "controversy", description: "Controversy over hundreds of Yemenite Jewish children who disappeared after arriving in Israel in the 1950s." }
]);
updDesc('yemeni-jewish-community-historic', 'One of the most ancient Jewish communities, claiming roots from the era of King Solomon and the Queen of Sheba. Yemeni Jews preserved unique traditions including the Baladi prayer rite, distinctive silverwork, and ancient Hebrew pronunciation. In 1949-1950, Operation Magic Carpet (On Wings of Eagles) airlifted approximately 49,000 Yemeni Jews to Israel. The "Missing Yemenite Children" affair , hundreds of children who disappeared from Israeli transit camps in the 1950s , remains a painful controversy. Fewer than 50 Jews remain in Yemen today.');

addConn('libyan-jewish-community-historic', [
  { name: "Ancient presence", type: "historical", description: "Jews lived in Libya since at least the 3rd century BCE under Greek and Roman rule." },
  { name: "1945 Tripoli pogrom", type: "historical event", description: "In November 1945, over 130 Jews were killed in pogroms across Tripoli." },
  { name: "1967 exodus", type: "migration", description: "Nearly all remaining Jews fled Libya during the 1967 Six-Day War." },
  { name: "Italian Libya period", type: "historical", description: "Under Italian colonial rule, the Jewish community numbered approximately 38,000." }
]);
updDesc('libyan-jewish-community-historic', 'Jews lived in Libya since at least the 3rd century BCE. Under Italian colonial rule, approximately 38,000 Jews lived there. The community suffered devastating pogroms in 1945 (over 130 killed in Tripoli) and 1948. Most emigrated to Israel in the early 1950s, and the remaining Jews fled during the 1967 Six-Day War. Under Gaddafi, the last Jews were expelled and properties confiscated. No Jews remain in Libya today. The largest Libyan-Jewish community now lives in Israel and Rome.');

addConn('lebanese-jewish-community-historic', [
  { name: "Beirut Jewish golden age", type: "historical", description: "In the 1950s-60s, Beirut's Jewish community thrived with synagogues, schools, and businesses." },
  { name: "Magen Abraham Synagogue", type: "heritage site", description: "The Magen Abraham Synagogue in Beirut, built in 1926, was heavily damaged during the civil war." },
  { name: "Lebanese civil war", type: "decline", description: "The 1975-1990 Lebanese Civil War drove virtually all remaining Jews out of Lebanon." },
  { name: "Isaac Sasson", type: "historical figure", description: "The Jewish community once played a significant role in Beirut's banking and commerce." }
]);
updDesc('lebanese-jewish-community-historic', 'Beirut was once home to a thriving Jewish community of approximately 22,000. Jews played important roles in Lebanese banking, commerce, and politics. The Magen Abraham Synagogue, built in 1926 in the Wadi Abu Jamil neighborhood, was the community\'s center. The community declined after 1948, and the 1975-1990 civil war drove virtually all remaining Jews out. The Magen Abraham Synagogue was damaged in the civil war and partially restored in 2010. Fewer than 30 Jews are believed to remain in Lebanon.');

// ============================================================
// ETHIOPIA
// ============================================================

addConn('beta-israel-community-organizations', [
  { name: "Operation Solomon", type: "historical event", description: "In May 1991, Operation Solomon airlifted 14,325 Ethiopian Jews to Israel in 36 hours." },
  { name: "Operation Moses", type: "historical event", description: "In 1984, Operation Moses covertly airlifted approximately 8,000 Ethiopian Jews through Sudan." },
  { name: "Israeli government", type: "support", description: "The Israeli government recognizes Beta Israel as Jews and supports their integration." },
  { name: "Absorption challenges", type: "social", description: "Ethiopian-Israelis have faced significant challenges in integration, education, and combating discrimination." }
]);
updDesc('beta-israel-community-organizations', 'Beta Israel (House of Israel) , the Ethiopian Jewish community , maintained Jewish practice for centuries in isolation. Their traditions include unique holidays like Sigd. Two dramatic Israeli airlifts rescued them: Operation Moses (1984, ~8,000 Jews through Sudan) and Operation Solomon (1991, 14,325 in 36 hours , a world record). Approximately 170,000 Ethiopian-origin Jews now live in Israel. Remaining communities in Ethiopia include Falash Mura (descendants who converted to Christianity).');

addConn('north-shewa-synagogue', [
  { name: "Beta Israel community", type: "community", description: "Served the Beta Israel community in the North Shewa zone of Ethiopia." },
  { name: "Ancient Jewish practice", type: "heritage", description: "Beta Israel practiced an ancient form of Judaism based on the Torah, without Talmudic traditions." },
  { name: "Aliyah", type: "migration", description: "Most of the congregation emigrated to Israel during Operations Moses and Solomon." }
]);
updDesc('north-shewa-synagogue', 'Synagogue serving the Beta Israel community in North Shewa, Ethiopia. Beta Israel practiced an ancient form of Judaism centered on the Torah and the Book of Jubilees, without knowledge of the Talmud or post-biblical rabbinic traditions. Their prayer houses (mesgids) were led by religious leaders called kessim. Most of the North Shewa Jewish community emigrated to Israel during the Operations Moses (1984) and Solomon (1991) airlifts.');

addConn('operation-solomon-memorial', [
  { name: "Israeli Air Force", type: "historical", description: "Israeli Air Force planes carried out the airlift, with a world record 1,122 passengers on a single Boeing 747." },
  { name: "Mengistu regime collapse", type: "context", description: "The airlift was carried out as the Mengistu regime collapsed and rebel forces advanced on Addis Ababa." },
  { name: "14,325 rescued in 36 hours", type: "achievement", description: "14,325 Ethiopian Jews were airlifted to Israel in just 36 hours on May 24-25, 1991." }
]);
updDesc('operation-solomon-memorial', 'Commemorates Operation Solomon (May 24-25, 1991), when Israeli Air Force and El Al flights airlifted 14,325 Ethiopian Jews to Israel in just 36 hours as the Mengistu regime collapsed. A world record was set when a single Boeing 747 carried 1,122 passengers (two babies were born during the flight). The operation was followed by smaller subsequent airlifts. Combined with Operation Moses (1984), these airlifts brought most of Ethiopia\'s Jewish community to Israel.');

// ============================================================
// UAE, BAHRAIN & GULF
// ============================================================

addConn('jewish-community-of-the-uae', [
  { name: "Abraham Accords", type: "diplomatic foundation", description: "The community grew significantly following the 2020 Abraham Accords normalizing Israel-UAE relations." },
  { name: "Ross Kriel", type: "community leader", description: "Ross Kriel (South African-born) has led efforts to build organized Jewish life in the UAE." },
  { name: "Chabad UAE", type: "religious services", description: "Chabad operates in Dubai and Abu Dhabi providing religious services." },
  { name: "Kosher dining", type: "community life", description: "Dubai now has multiple kosher restaurants and a growing Jewish infrastructure." }
]);
updDesc('jewish-community-of-the-uae', 'A rapidly growing Jewish community established in the United Arab Emirates, accelerated by the 2020 Abraham Accords normalizing Israel-UAE relations. Led by Ross Kriel and others, the community now numbers approximately 1,000+ people. Dubai has multiple kosher restaurants, a Jewish community center, and Chabad operations. The UAE has publicly embraced religious tolerance, making it one of the most welcoming Gulf states for Jewish life. Israeli tourists and businesspeople have flooded in since normalization.');
addInd('jewish-community-of-the-uae', { name: "Ross Kriel", bio: "South African-born businessman who has led the development of organized Jewish community life in the UAE.", role: "Community Leader" });

addConn('association-of-gulf-jewish-communities-agjc', [
  { name: "Abraham Accords", type: "context", description: "Created in the wake of the Abraham Accords to serve Jewish communities across the Gulf." },
  { name: "UAE community", type: "member", description: "Represents the Jewish community of the UAE." },
  { name: "Bahrain community", type: "member", description: "Represents the Jewish community of Bahrain." },
  { name: "Interfaith initiatives", type: "mission", description: "Promotes interfaith dialogue and regional Jewish-Muslim cooperation." }
]);
updDesc('association-of-gulf-jewish-communities-agjc', 'Regional organization representing emerging Jewish communities across the Gulf states, established following the 2020 Abraham Accords. Coordinates between Jewish communities in the UAE, Bahrain, and other Gulf states. Promotes interfaith dialogue, cultural exchange, and builds institutional infrastructure for Jewish life in a region where open Jewish communities are a new phenomenon. Works closely with government tolerance initiatives.');

addConn('abrahamic-family-house-abu-dhabi', [
  { name: "Pope Francis", type: "inspiration", description: "Inspired by the 2019 Document on Human Fraternity signed by Pope Francis and Grand Imam Ahmed el-Tayeb." },
  { name: "David Adjaye", type: "architect", description: "Designed by Ghanaian-British architect Sir David Adjaye." },
  { name: "Three houses of worship", type: "structure", description: "Contains a mosque, church, and synagogue on one shared campus , a first of its kind." },
  { name: "UAE government", type: "sponsor", description: "Built and sponsored by the UAE government as a symbol of tolerance." }
]);
updDesc('abrahamic-family-house-abu-dhabi', 'Interfaith complex on Saadiyat Island in Abu Dhabi, opened in 2023, containing a mosque, church, and synagogue on one shared campus , a first of its kind. Designed by Sir David Adjaye. The synagogue, named after Moses Ben Maimon (Maimonides), is the first purpose-built synagogue in the Gulf. Inspired by the 2019 Document on Human Fraternity signed by Pope Francis and Grand Imam Ahmed el-Tayeb during a papal visit to Abu Dhabi. Built by the UAE government as a symbol of Abrahamic unity.');

addConn('kosher-restaurants-and-community-in-dubai', [
  { name: "Abraham Accords", type: "catalyst", description: "Kosher dining and Jewish community infrastructure in Dubai expanded rapidly after the 2020 Abraham Accords." },
  { name: "Israeli tourism", type: "driver", description: "Hundreds of thousands of Israeli tourists visit Dubai annually, driving demand for kosher food." },
  { name: "Elli's Kosher Kitchen", type: "pioneer", description: "Elli's Kosher Kitchen was one of the first kosher restaurants to open in Dubai." }
]);
updDesc('kosher-restaurants-and-community-in-dubai', 'Dubai\'s kosher dining scene expanded rapidly following the 2020 Abraham Accords, serving the growing Jewish community and hundreds of thousands of annual Israeli tourists. Multiple kosher restaurants now operate in the city. Elli\'s Kosher Kitchen was a pioneer in the market. The availability of kosher food, along with a Jewish community center and synagogue, has made Dubai one of the most vibrant new Jewish communities in the Middle East.');

addConn('jewish-community-of-bahrain', [
  { name: "Abraham Accords", type: "diplomatic context", description: "Bahrain normalized relations with Israel in 2020 as part of the Abraham Accords." },
  { name: "Ancient presence", type: "historical", description: "Jews have lived in Bahrain since at least the 1880s, initially Baghdadi merchants." },
  { name: "Ambassador Houda Nonoo", type: "notable figure", description: "Houda Nonoo (Jewish) served as Bahrain's ambassador to the United States, 2008-2013." },
  { name: "King Hamad bin Isa Al Khalifa", type: "government", description: "King Hamad has promoted religious tolerance and Jewish community rights." }
]);
updDesc('jewish-community-of-bahrain', 'Small Jewish community in Bahrain numbering approximately 36 people , one of the few remaining indigenous Jewish communities in the Gulf. Jews have been in Bahrain since at least the 1880s. Houda Nonoo (Jewish) made history as Bahrain\'s ambassador to the US (2008-2013). Bahrain normalized relations with Israel in 2020 through the Abraham Accords. King Hamad bin Isa Al Khalifa has promoted religious tolerance and preservation of the Jewish community.');

addConn('ambassador-houda-nonoo-legacy', [
  { name: "Houda Nonoo", type: "subject", description: "First Jewish ambassador from any Arab country, serving as Bahrain's ambassador to the US (2008-2013)." },
  { name: "King Hamad", type: "appointed by", description: "Appointed by King Hamad bin Isa Al Khalifa, demonstrating Bahrain's commitment to pluralism." },
  { name: "Abraham Accords", type: "legacy", description: "Her appointment foreshadowed the broader normalization of Arab-Israeli relations." },
  { name: "Bahraini parliament", type: "prior role", description: "Previously served in Bahrain's Shura Council (upper house of parliament)." }
]);
updDesc('ambassador-houda-nonoo-legacy', 'Houda Nonoo (Jewish) made history as the first Jewish ambassador from any Arab country, serving as Bahrain\'s ambassador to the United States from 2008 to 2013. Appointed by King Hamad bin Isa Al Khalifa, she had previously served in Bahrain\'s Shura Council. Her appointment was a groundbreaking demonstration of Arab-Jewish coexistence and foreshadowed the broader Abraham Accords normalization. She has advocated for tolerance and interfaith dialogue internationally.');

// ============================================================
// LATIN AMERICA REMAINING
// ============================================================

addConn('congrega-o-israelita-paulista', [
  { name: "São Paulo Jewish community", type: "community", description: "One of the largest and oldest Jewish congregations in São Paulo and Latin America." },
  { name: "Liberal/Reform Judaism", type: "denomination", description: "A leading Liberal/Reform congregation in Latin America." },
  { name: "World Union for Progressive Judaism", type: "affiliate", description: "Affiliated with the World Union for Progressive Judaism." }
]);
updDesc('congrega-o-israelita-paulista', 'One of the oldest and largest Jewish congregations in São Paulo and Latin America. Founded by German-Jewish immigrants in 1936. A leading Liberal/Reform congregation affiliated with the World Union for Progressive Judaism. The São Paulo Jewish community numbers approximately 60,000 , the largest in Latin America. CIP operates a synagogue, school, cultural center, and social programs.');

addConn('comit-central-israelita-del-uruguay', [
  { name: "Uruguayan government", type: "official recognition", description: "Officially recognized representative body of Uruguayan Jews." },
  { name: "World Jewish Congress", type: "affiliate", description: "Affiliated with the World Jewish Congress." },
  { name: "Kehilá community", type: "community", description: "Oversees Montevideo's Jewish community of approximately 12,000 people." }
]);
updDesc('comit-central-israelita-del-uruguay', 'Central representative body of Uruguay\'s Jewish community, based in Montevideo. Uruguay has approximately 12,000-17,000 Jews, one of the largest Jewish communities per capita in Latin America. The community includes descendants of Eastern European immigrants who arrived in the early 20th century. Uruguay was one of the first countries to vote in favor of the UN Partition Plan for Palestine in 1947. Maintains synagogues, schools, and cultural institutions.');

addConn('comunidad-jud-a-de-chile', [
  { name: "Chilean government", type: "official recognition", description: "Representative body of Chile's approximately 18,000-strong Jewish community." },
  { name: "Estadio Israelita Maccabi", type: "community center", description: "Operates the Estadio Israelita Maccabi, a major Jewish sports and social club in Santiago." },
  { name: "Palestinian community relations", type: "context", description: "Chile has the largest Palestinian diaspora in the world, creating unique interfaith dynamics." }
]);
updDesc('comunidad-jud-a-de-chile', 'Represents Chile\'s Jewish community of approximately 18,000, centered in Santiago. The community arrived primarily from Eastern Europe in the early 20th century. Chile uniquely has both the world\'s largest Palestinian diaspora and a significant Jewish community, creating complex interfaith dynamics. The Estadio Israelita Maccabi is a major community center. Chilean Jews have contributed to business, politics, and culture.');

addConn('confederaci-n-de-comunidades-jud-as-de-colombia', [
  { name: "Colombian government", type: "official", description: "Official representative body of Colombian Jews." },
  { name: "Bogotá Jewish community", type: "center", description: "Most of Colombia's 4,000-5,000 Jews live in Bogotá." },
  { name: "Sephardic heritage", type: "historical", description: "Some Colombian Jews trace ancestry to Sephardic conversos who came during the colonial period." }
]);
updDesc('confederaci-n-de-comunidades-jud-as-de-colombia', 'Umbrella organization representing approximately 4,000-5,000 Jews in Colombia, centered in Bogotá with smaller communities in Medellín, Cali, and Barranquilla. Some trace ancestry to Sephardic conversos (crypto-Jews) who arrived during the Spanish colonial period. The modern community grew with 20th-century immigration from Eastern Europe, Syria, and Lebanon. Operates synagogues, schools (Colegio Colombo Hebreo), and social institutions.');

addConn('jewish-community-of-sos-a', [
  { name: "Sosúa refugee settlement", type: "historical", description: "In 1940, the Dominican Republic accepted 800 Jewish refugees from Nazi Europe , the only country to do so at the Évian Conference." },
  { name: "General Rafael Trujillo", type: "historical figure", description: "Dominican dictator Trujillo offered resettlement to whiten the population and improve international image." },
  { name: "DORSA", type: "organization", description: "The Dominican Republic Settlement Association (DORSA) managed the Sosúa Jewish settlement." },
  { name: "JDC", type: "supporter", description: "The American Jewish Joint Distribution Committee helped organize and fund the Sosúa settlement." }
]);
updDesc('jewish-community-of-sos-a', 'Unique community founded when the Dominican Republic was the only country at the 1938 Évian Conference to offer refuge to Jewish refugees from Nazi Europe. Dictator Rafael Trujillo accepted approximately 800 Jewish settlers to Sosúa on the north coast, partly to whiten the population. The Dominican Republic Settlement Association (DORSA) and JDC funded the settlement. Refugees established a dairy cooperative. Most eventually moved to the US, but a small community and museum remain.');

addConn('museo-jud-o-de-sos-a', [
  { name: "Sosúa Jewish settlement", type: "subject", description: "Documents the history of the Jewish refugee settlement in Sosúa." },
  { name: "Holocaust education", type: "mission", description: "Serves as a center for Holocaust education in the Caribbean." },
  { name: "Évian Conference", type: "historical context", description: "Tells the story of the 1938 Évian Conference where the Dominican Republic alone offered refuge." }
]);
updDesc('museo-jud-o-de-sos-a', 'Museum in Sosúa, Dominican Republic, documenting the remarkable story of Jewish refugees who found haven there during the Holocaust , the only concrete result of the 1938 Évian Conference. Displays photographs, documents, and artifacts from the settlement era. Tells stories of refugees who established a dairy cooperative and new lives. A unique piece of Holocaust and Latin American history. The museum serves as both a memorial and a center for tolerance education in the Caribbean.');

addConn('kol-shearith-israel', [
  { name: "Panama Canal Zone", type: "historical context", description: "Jewish community grew alongside the construction of the Panama Canal." },
  { name: "Sephardic community", type: "demographics", description: "One of Latin America's most Sephardic-leaning communities, with members tracing roots to Syria, Turkey, and the Caribbean." },
  { name: "Panamanian Jewish community", type: "community", description: "Serves Panama's Jewish community of approximately 10,000-15,000." }
]);
updDesc('kol-shearith-israel', 'The main synagogue serving Panama\'s Jewish community of approximately 10,000-15,000 people. The community grew alongside the construction of the Panama Canal. Panama has one of the most Sephardic-leaning Jewish communities in Latin America, with members tracing roots to Syria, Turkey, and Caribbean islands like Curaçao. Panamanian Jews have been prominent in business, politics, and professional life.');

addConn('asociaci-n-jud-a-del-per', [
  { name: "Lima Jewish community", type: "center", description: "Most of Peru's approximately 2,500 Jews live in Lima." },
  { name: "Inquisition history", type: "historical", description: "Peru's Inquisition targeted crypto-Jews (conversos) during the colonial period." },
  { name: "León Pinelo Synagogue", type: "main synagogue", description: "The community maintains the León Pinelo Synagogue and school in Lima." }
]);
updDesc('asociaci-n-jud-a-del-per', 'Representative body of Peru\'s Jewish community of approximately 2,500, mostly in Lima. Peru has a complex Jewish history , the Lima Inquisition (1570-1820) specifically targeted crypto-Jews (conversos). The modern community grew with 20th-century immigration from Eastern Europe and the Middle East. The community maintains the Colegio León Pinelo school and synagogue. Some Peruvians with converso ancestry have recently reconnected with Judaism.');

addConn('confederaci-n-de-asociaciones-israelitas-de-venezuela-caiv', [
  { name: "Venezuelan Jewish community", type: "community", description: "Represents Venezuela's declining Jewish community, once approximately 22,000." },
  { name: "Hugo Chávez era", type: "political context", description: "Under Chávez and Maduro, anti-Israel rhetoric and attacks on Jewish institutions drove emigration." },
  { name: "Hebraica community", type: "institution", description: "The Hebraica (Centro Social Cultural y Deportivo Hebraica) has been the community hub." }
]);
updDesc('confederaci-n-de-asociaciones-israelitas-de-venezuela-caiv', 'Umbrella body for Venezuelan Jewish communities. Venezuela\'s Jewish population has declined dramatically from approximately 22,000 to under 6,000 due to political instability and antisemitic rhetoric under Hugo Chávez and Nicolás Maduro. In 2009, a mob attacked the main synagogue in Caracas. Many Venezuelan Jews have emigrated to the US, Israel, and Panama. The Hebraica community center in Caracas remains a hub for those who stayed.');

// ============================================================
// SMALL COMMUNITIES WORLDWIDE
// ============================================================

addConn('centro-israelita-sionista-de-costa-rica', [
  { name: "Costa Rican government", type: "recognition", description: "Recognized representative body of Costa Rica's approximately 2,500 Jews." },
  { name: "San José community", type: "center", description: "Most Costa Rican Jews live in San José and maintain synagogues and schools." }
]);
updDesc('centro-israelita-sionista-de-costa-rica', 'Representative body of Costa Rica\'s Jewish community of approximately 2,500, centered in San José. The community includes descendants of Eastern European and Sephardic immigrants. Costa Rica has maintained warm relations with Israel. The community operates synagogues, a school (Instituto Dr. Jaim Weizmann), and social institutions.');

addConn('comunidad-jud-a-de-guatemala', [
  { name: "Guatemala-Israel relations", type: "diplomatic", description: "Guatemala was one of the first countries to recognize Israel and moved its embassy to Jerusalem in 2018." },
  { name: "Guatemala City community", type: "center", description: "Most of Guatemala's approximately 900 Jews live in Guatemala City." }
]);
updDesc('comunidad-jud-a-de-guatemala', 'Small but active Jewish community of approximately 900 people in Guatemala, centered in Guatemala City. Guatemala has a unique relationship with Israel , it was one of the first countries to vote for Israeli statehood in 1947, and in 2018 moved its embassy to Jerusalem. The community maintains several synagogues, including Maguén David, and a Jewish school.');

addConn('comunidad-jud-a-del-ecuador', [
  { name: "Quito community", type: "center", description: "Most of Ecuador's approximately 800 Jews live in Quito and Guayaquil." },
  { name: "WWII refugees", type: "historical", description: "Many Ecuadorian Jews are descendants of WWII refugees from Germany and Austria." }
]);
updDesc('comunidad-jud-a-del-ecuador', 'Represents approximately 800 Jews in Ecuador, split between Quito and Guayaquil. Many are descendants of German and Austrian Jewish refugees who arrived during WWII. The community maintains the Asociación Israelita de Quito and Centro Israelita de Guayaquil with synagogues and cultural programs.');

addConn('comunidad-israelita-de-bolivia-circulo-israelita', [
  { name: "La Paz community", type: "center", description: "Bolivia's tiny Jewish community is centered in La Paz." },
  { name: "Morales government tensions", type: "political", description: "Under President Evo Morales, Bolivia severed diplomatic ties with Israel in 2009." }
]);
updDesc('comunidad-israelita-de-bolivia-circulo-israelita', 'One of South America\'s smallest Jewish communities with approximately 500 members, centered in La Paz with a smaller group in Santa Cruz. The community traces to immigration from Eastern Europe and Germany in the 1930s-40s. Relations with the government became strained under President Evo Morales, who severed diplomatic ties with Israel in 2009. The Círculo Israelita operates a synagogue, community center, and school in La Paz.');

addConn('united-congregation-of-israelites', [
  { name: "Shaare Shalom Synagogue", type: "historic site", description: "The Shaare Shalom Synagogue (1912) in Kingston is Jamaica's only remaining synagogue." },
  { name: "Caribbean Jewish history", type: "heritage", description: "Jamaica's Jewish community dates to the 1530s, making it one of the oldest in the Western Hemisphere." },
  { name: "Sephardic origins", type: "historical", description: "Founded by Sephardic Jews fleeing the Spanish and Portuguese Inquisitions." }
]);
updDesc('united-congregation-of-israelites', 'Jamaica\'s sole remaining Jewish congregation, operating the historic Shaare Shalom Synagogue (1912) in Kingston , one of only two sand-floor synagogues in the world. Jamaica\'s Jewish history dates to the 1530s when Sephardic crypto-Jews arrived fleeing the Inquisition. The community played significant roles in island commerce, including the sugar industry. Today approximately 200 Jews remain. The sand floor tradition is said to commemorate the Jewish desert wanderings or to muffle the sound of prayer from Inquisition ears.');

addConn('new-zealand-jewish-council', [
  { name: "New Zealand government", type: "official", description: "Official representative body of New Zealand's approximately 7,500 Jews." },
  { name: "Christchurch mosque shooting solidarity", type: "interfaith", description: "Jewish community showed strong solidarity after the 2019 Christchurch mosque shooting." },
  { name: "Auckland Hebrew Congregation", type: "member", description: "The Auckland Hebrew Congregation (founded 1840) is the oldest Jewish community in New Zealand." }
]);
updDesc('new-zealand-jewish-council', 'Official representative body of approximately 7,500 Jews in New Zealand, with communities in Auckland, Wellington, Christchurch, and Dunedin. The Auckland Hebrew Congregation, founded in 1840, is one of the oldest in Australasia. New Zealand Jewish community showed remarkable solidarity following the 2019 Christchurch mosque shooting. Notable New Zealand Jews include former Prime Minister John Key and nuclear physicist Ernest Rutherford\'s collaborators.');

addConn('federation-of-jewish-communities-of-spain-additional', [
  { name: "Spanish citizenship law", type: "policy", description: "Spain passed a 2015 law offering citizenship to Sephardic Jews whose ancestors were expelled in 1492." },
  { name: "Sephardic heritage", type: "historical", description: "Spain's rich Sephardic heritage includes the Golden Age when Jews, Muslims, and Christians coexisted." },
  { name: "Red de Juderías", type: "cultural network", description: "The Network of Spanish Jewish Quarters promotes heritage tourism across historic Jewish sites." }
]);
updDesc('federation-of-jewish-communities-of-spain-additional', 'Spain\'s Jewish community numbers approximately 40,000-50,000 and has experienced a revival. In 2015, Spain passed a landmark law offering citizenship to descendants of Sephardic Jews expelled in 1492 , over 130,000 applied. The Red de Juderías (Network of Jewish Quarters) promotes heritage tourism across historic sites in Toledo, Córdoba, Girona, and Segovia. Spain\'s Golden Age (10th-12th centuries) saw Jewish scholars like Maimonides and Judah Halevi flourish alongside Muslim and Christian thinkers.');

addConn('federation-of-jewish-communities-in-romania', [
  { name: "Romanian government", type: "official", description: "Official representative body of Romania's approximately 3,000 Jews." },
  { name: "Elie Wiesel Commission", type: "historical significance", description: "Romania officially acknowledged the Holocaust through the Elie Wiesel International Commission (2004)." },
  { name: "Coral Temple Bucharest", type: "main synagogue", description: "The Coral Temple (1866) in Bucharest is the main functioning synagogue." },
  { name: "Choral Synagogue tradition", type: "heritage", description: "Romania once had over 850,000 Jews and was a center of Jewish culture and Zionism." }
]);
updDesc('federation-of-jewish-communities-in-romania', 'Represents approximately 3,000 Jews in Romania. Romania once had over 850,000 Jews and was a cradle of Zionism and Yiddish theater. The Holocaust devastated the community , over 280,000 Romanian Jews perished. In 2004, the Elie Wiesel International Commission formally acknowledged Romania\'s role. Many survivors emigrated to Israel. The Coral Temple (1866) in Bucharest remains active. Notable Romanian-origin Jews include Elie Wiesel, Paul Celan, Tristan Tzara, and filmmaker Radu Mihăileanu.');

// ============================================================
// ASIA & PACIFIC
// ============================================================

addConn('united-hebrew-congregation-of-singapore', [
  { name: "Baghdadi Jewish origins", type: "historical", description: "Founded by Baghdadi Jewish merchants including the Sassoon family in the 19th century." },
  { name: "Maghain Aboth Synagogue", type: "heritage", description: "The Maghain Aboth Synagogue (1878) is the oldest synagogue in Southeast Asia." },
  { name: "David Marshall", type: "notable member", description: "David Marshall (Jewish, Baghdadi-born) was Singapore's first Chief Minister (1955-1956)." }
]);
updDesc('united-hebrew-congregation-of-singapore', 'Represents Singapore\'s Jewish community of approximately 2,500 people. The community has roots in 19th-century Baghdadi Jewish merchants, including the Sassoon family. The Maghain Aboth Synagogue (1878) is the oldest synagogue in Southeast Asia. David Marshall (Jewish, Baghdadi origin) served as Singapore\'s first Chief Minister (1955-1956). Today the community is diverse, including expats from Israel, the US, Australia, and elsewhere.');
addInd('united-hebrew-congregation-of-singapore', { name: "David Marshall", bio: "Singapore's first Chief Minister (1955-1956), Jewish politician of Baghdadi-Iraqi origin. Champion of Singapore's independence movement.", role: "Historical Figure" });

addConn('jewish-association-of-thailand', [
  { name: "Bangkok Jewish community", type: "center", description: "Centers on Bangkok, serving approximately 1,000 Jews including expats and Israeli tourists." },
  { name: "Chabad Thailand", type: "religious services", description: "Chabad operates 11 centers across Thailand, among its largest networks in Southeast Asia." },
  { name: "Israeli backpacker culture", type: "demographic", description: "Thailand is a top post-military service destination for Israeli travelers." }
]);
updDesc('jewish-association-of-thailand', 'Oversees Jewish community life in Thailand, centered in Bangkok but extending to Chiang Mai, Phuket, and Ko Samui. Chabad operates 11 centers across Thailand , one of its largest Southeast Asian networks , serving residents, expats, and the massive influx of Israeli backpackers who visit post-military service. The Beth Elisheva Synagogue in Bangkok serves the residential community. Thai-Israeli relations have been warm, with significant bilateral trade.');

addConn('jewish-association-of-the-philippines', [
  { name: "Manila Jewish community", type: "center", description: "Small community centered in Manila with approximately 100-200 members." },
  { name: "WWII rescue", type: "historical", description: "President Manuel Quezon sheltered 1,300 Jewish refugees in Mindanao during WWII through the 'Open Door' policy." },
  { name: "Temple Emil congregation", type: "worship", description: "The Beth Yaacov Synagogue in Makati serves the community." }
]);
updDesc('jewish-association-of-the-philippines', 'Small Jewish community of approximately 100-200 people in the Philippines, centered in Manila. The Philippines has a remarkable Holocaust rescue story: President Manuel Quezon\'s "Open Door" policy sheltered approximately 1,300 Jewish refugees in Mindanao during WWII. The Beth Yaacov Synagogue in Makati, Manila, serves the community. Filipino soldiers were also among the liberators of concentration camps. The country has maintained strong ties with Israel.');

addConn('jewish-community-of-south-korea', [
  { name: "US military presence", type: "historical origin", description: "The community grew from American Jewish servicemembers stationed in South Korea." },
  { name: "Chabad Seoul", type: "religious services", description: "Chabad of Korea operates in Seoul, serving residents and visitors." },
  { name: "Korean-Israeli tech ties", type: "modern", description: "Growing Korean-Israeli business and tech relationships have expanded the community." }
]);
updDesc('jewish-community-of-south-korea', 'Small community of approximately 1,000 Jews in South Korea, originating from American Jewish servicemembers stationed in Korea. Today includes diplomats, businesspeople, English teachers, and tech workers. Chabad operates in Seoul. Korean-Israeli tech and business ties have grown significantly, with Korean electronics giants partnering with Israeli startups. South Korea and Israel maintain warm diplomatic relations.');

addConn('chabad-vietnam', [
  { name: "Chabad-Lubavitch", type: "parent organization", description: "Part of the global Chabad-Lubavitch network, operating in Ho Chi Minh City and Hanoi." },
  { name: "Israeli travelers", type: "constituency", description: "Serves Israeli backpackers and business travelers , Vietnam is a popular post-army destination." },
  { name: "Jewish community of Vietnam", type: "community served", description: "Serves the small Jewish community and visitors in Vietnam." }
]);
updDesc('chabad-vietnam', 'Chabad-Lubavitch community center serving Jews in Vietnam, operating in Ho Chi Minh City (Saigon) and Hanoi. Vietnam is a popular destination for Israeli backpackers completing military service. Chabad Vietnam provides Shabbat dinners, holiday celebrations, and kosher food to travelers and the small resident Jewish community. The Jewish presence in Vietnam dates to French colonial-era Sephardic merchants.');

addConn('jewish-community-of-taiwan', [
  { name: "Taipei Jewish community", type: "center", description: "Small community centered in Taipei with approximately 200-300 members." },
  { name: "Taiwan-Israel relations", type: "diplomatic", description: "Taiwan and Israel share informal but warm technological and trade relations." },
  { name: "Chabad Taiwan", type: "religious services", description: "Chabad operates in Taiwan, serving the community and visitors." }
]);
updDesc('jewish-community-of-taiwan', 'Small Jewish community of approximately 200-300 people in Taiwan, centered in Taipei. Includes American and Israeli expats, businesspeople, and academics. Chabad operates in Taipei. Taiwan and Israel share informal but significant technological and trade relationships, particularly in semiconductors and cybersecurity. The Taipei Jewish Community maintains regular services and holiday celebrations.');

addConn('jewish-historical-society-of-hong-kong', [
  { name: "Sassoon and Kadoorie families", type: "historical", description: "Hong Kong's Jewish history is intertwined with the Sassoon and Kadoorie business dynasties." },
  { name: "Ohel Leah Synagogue", type: "partner", description: "Works to preserve the heritage of the Ohel Leah Synagogue and other Jewish sites." },
  { name: "China trade", type: "historical context", description: "Jewish merchants were instrumental in Hong Kong's development as a trading port from the 1840s." }
]);
updDesc('jewish-historical-society-of-hong-kong', 'Preserves and documents the rich Jewish heritage of Hong Kong, dating to the founding of the colony in the 1840s. Jewish merchants , particularly the Sassoon and Kadoorie families , played instrumental roles in Hong Kong\'s development as a global trading center. The society documents the community\'s history including the Baghdadi Jewish traders, European refugees during WWII, and the modern community of approximately 5,000-6,000 people.');

addConn('ohel-leah-synagogue', [
  { name: "Sassoon family", type: "builder", description: "Built in 1901 by Sir Jacob Sassoon and named after his mother Leah." },
  { name: "Hong Kong heritage", type: "status", description: "Declared a Hong Kong monument , one of the oldest surviving synagogues in East Asia." },
  { name: "Kadoorie family", type: "support", description: "The Kadoorie family (Jewish, Baghdadi) has been central to the synagogue's preservation." },
  { name: "Robinson Road", type: "location", description: "Located on Robinson Road in the Mid-Levels, overlooking Hong Kong harbor." }
]);
updDesc('ohel-leah-synagogue', 'Historic Sephardic synagogue in Hong Kong, built in 1901 by Sir Jacob Sassoon and named after his mother Leah. One of the oldest surviving synagogues in East Asia, declared a Hong Kong monument. Located on Robinson Road in the Mid-Levels. The Kadoorie family (Jewish, Baghdadi origin) has been central to its preservation. Still an active place of worship serving Hong Kong\'s Jewish community. The building combines Moorish and Classical architectural styles.');

// ============================================================
// AFRICA
// ============================================================

addConn('nairobi-hebrew-congregation', [
  { name: "Nairobi Synagogue", type: "facility", description: "Operates the Nairobi Synagogue, the main Jewish place of worship in East Africa." },
  { name: "Karen Blixen connection", type: "historical", description: "Some of Kenya's early Jewish settlers arrived during the British colonial period." },
  { name: "Uganda Scheme", type: "historical context", description: "British Uganda Scheme (1903) proposed Jewish settlement in nearby Uganda, which Herzl initially supported." }
]);
updDesc('nairobi-hebrew-congregation', 'The main Jewish congregation in East Africa, serving Kenya\'s small Jewish community of approximately 400 people. The Nairobi Synagogue has served the community since 1913. Kenya\'s Jewish history connects to the British Uganda Scheme (1903), when the British proposed Jewish settlement in nearby Uganda. Jewish families have been part of Kenya\'s history since the colonial era, contributing to agriculture, commerce, and conservation. The community maintains an active synagogue and cemetery.');

addConn('igbo-jewish-community', [
  { name: "Igbo people", type: "ethnic group", description: "The Igbo Jews, numbering an estimated 30,000, claim descent from ancient Israelites." },
  { name: "Abayudaya community connection", type: "related community", description: "Similar to the Abayudaya in Uganda, the Igbo Jews practice Judaism and seek formal recognition." },
  { name: "Gihon Heritage Center", type: "community center", description: "The Gihon Heritage Center in Abuja promotes Igbo-Jewish identity." },
  { name: "Synagogues in southeast Nigeria", type: "infrastructure", description: "Multiple synagogues operate in southeastern Nigeria's Igbo heartland." }
]);
updDesc('igbo-jewish-community', 'Community of approximately 30,000 practicing Jews among the Igbo people of southeastern Nigeria, centered in states like Anambra and Abia. Many Igbo Jews claim descent from ancient Israelites based on oral traditions, cultural practices, and naming conventions. Multiple synagogues operate in the region. The community practices Orthodox Judaism and has sought recognition from Israeli religious authorities. Some members have made aliyah to Israel. Scholars debate whether the Jewish connection is ancient heritage or modern adoption.');

addConn('zimbabwe-jewish-community', [
  { name: "Bulawayo and Harare", type: "centers", description: "Small community split between Bulawayo and Harare, declining from 7,000 in the 1960s to under 200." },
  { name: "Rhodesian era", type: "historical", description: "The community thrived during the Rhodesian period, with prominent Jewish businesspeople and politicians." },
  { name: "Mugabe era emigration", type: "decline", description: "Most Jews emigrated during the Mugabe era, particularly after the land reform program." }
]);
updDesc('zimbabwe-jewish-community', 'Once one of southern Africa\'s significant Jewish communities, numbering approximately 7,000 in the 1960s during the Rhodesian era. Jews were prominent in business, agriculture, and politics. The community declined sharply from the 1980s onward, particularly after Robert Mugabe\'s land reform program. Today fewer than 200 Jews remain, split between Harare and Bulawayo. Both cities maintain synagogues, though services are infrequent. Many Zimbabwean Jews emigrated to South Africa, Israel, and Australia.');

addConn('lubumbashi-jewish-community', [
  { name: "Belgian colonial era", type: "historical", description: "Established during the Belgian colonial period in the mineral-rich Katanga province." },
  { name: "Mining industry", type: "economic role", description: "Jewish families were involved in Katanga's mining industry, particularly diamonds and copper." },
  { name: "Sephardic roots", type: "heritage", description: "Many members were Sephardic Jews from Rhodes and other Mediterranean communities." }
]);
updDesc('lubumbashi-jewish-community', 'Small Jewish community in Lubumbashi (formerly Elisabethville), capital of the mineral-rich Katanga province in the Democratic Republic of Congo. Established during the Belgian colonial era, many members were Sephardic Jews from Rhodes and other Mediterranean communities involved in the mining industry. Numbered several hundred at its peak. Most emigrated during post-independence upheavals. A synagogue still stands but the community is nearly extinct.');

addConn('windhoek-jewish-community', [
  { name: "German colonial era", type: "historical", description: "Jews first arrived in Namibia (then German South-West Africa) in the late 19th century." },
  { name: "South African connections", type: "community", description: "Close ties with South Africa's larger Jewish community." },
  { name: "Windhoek synagogue", type: "facility", description: "The Windhoek Jewish community maintains a small synagogue." }
]);
updDesc('windhoek-jewish-community', 'Tiny Jewish community in Windhoek, Namibia, numbering approximately 50-100 people. Jews first arrived during the German colonial era (late 19th century), with more arriving from South Africa. The community maintains a small synagogue in Windhoek. Close ties with South Africa\'s larger Jewish community. Notable for being one of the most remote Jewish communities in the world.');

addConn('house-of-israel-ghana', [
  { name: "Sefwi Wiawso community", type: "center", description: "Based in the Sefwi Wiawso area of western Ghana." },
  { name: "Oral traditions", type: "heritage", description: "Claim Jewish heritage through oral traditions and cultural practices." },
  { name: "Kulanu organization", type: "support", description: "The organization Kulanu has supported Jewish education and practice in the community." }
]);
updDesc('house-of-israel-ghana', 'Community of approximately 200-300 people in the Sefwi Wiawso area of western Ghana who practice Judaism. Some claim ancestral connections to the ancient Israelite tribe of Judah through oral traditions. The community has built synagogues and received support from the organization Kulanu and visiting rabbis. Members observe Shabbat, keep kosher, and celebrate Jewish holidays. Represents part of a broader phenomenon of African communities connecting with Judaism.');

addConn('el-ghriba-synagogue-djerba', [
  { name: "One of the oldest synagogues in the world", type: "heritage", description: "Tradition dates the synagogue to 586 BCE, when Jews fleeing the destruction of Solomon's Temple arrived in Djerba." },
  { name: "Annual Lag BaOmer pilgrimage", type: "event", description: "Thousands of Jewish pilgrims visit for the annual Lag BaOmer festival." },
  { name: "2002 terrorist attack", type: "historical", description: "An al-Qaeda truck bomb attack in April 2002 killed 21 people, including 14 German tourists." },
  { name: "Tunisian government protection", type: "government", description: "The Tunisian government provides security and has supported the synagogue's preservation." }
]);
updDesc('el-ghriba-synagogue-djerba', 'One of the oldest synagogues in the world, located on the island of Djerba, Tunisia. Tradition holds it was founded in 586 BCE by Jews fleeing the destruction of Solomon\'s Temple, who brought a door and stone from the Temple. The annual Lag BaOmer pilgrimage draws thousands of Jewish visitors from around the world. In 2002, an al-Qaeda truck bomb attack killed 21 people. The Tunisian government provides security and preservation support. Djerba\'s small Jewish community of approximately 1,000 is one of the oldest continuous Jewish communities in the world.');

// ============================================================
// EASTERN EUROPE & BALKANS
// ============================================================

addConn('jewish-representative-council-of-ireland', [
  { name: "James Joyce's Ulysses", type: "cultural", description: "Leopold Bloom, the protagonist of James Joyce's Ulysses, is Dublin's most famous fictional Jew." },
  { name: "Dublin Jewish community", type: "center", description: "Centers on Dublin's 'Little Jerusalem' neighborhood along the South Circular Road." },
  { name: "Robert Briscoe", type: "historical figure", description: "Robert Briscoe (Jewish) served as Lord Mayor of Dublin in 1956-57 and was a Fianna Fáil TD." },
  { name: "Irish-Israeli relations", type: "diplomatic", description: "Ireland has been critical of Israeli policies toward Palestinians, creating complex dynamics." }
]);
updDesc('jewish-representative-council-of-ireland', 'Representative body of Ireland\'s small Jewish community of approximately 2,500 people, centered in Dublin. Dublin\'s "Little Jerusalem" along the South Circular Road was historically the center of Jewish life. Robert Briscoe (Jewish) served as Lord Mayor of Dublin in 1956-57. Leopold Bloom in James Joyce\'s Ulysses is Ireland\'s most famous literary Jew. Ireland\'s critical stance on Israeli policies toward Palestinians creates unique dynamics for the community.');

addConn('irish-jewish-museum-dublin', [
  { name: "Walworth Road Synagogue", type: "location", description: "Located in the former Walworth Road Synagogue in Dublin's Portobello neighborhood." },
  { name: "Chaim Herzog", type: "notable connection", description: "Chaim Herzog, the 6th President of Israel (1983-1993), was born in Belfast and raised in Dublin." },
  { name: "Irish Jewish heritage", type: "mission", description: "Documents the history of Jews in Ireland from the medieval period to present." }
]);
updDesc('irish-jewish-museum-dublin', 'Located in the former Walworth Road Synagogue in Dublin\'s Portobello neighborhood. Documents the history of Jews in Ireland from the medieval period to present. Notable exhibits include material on Chaim Herzog, the 6th President of Israel (1983-1993), who was born in Belfast and raised in Dublin , his father was Chief Rabbi of Ireland. The museum preserves the synagogue interior and kitchen, giving visitors an intimate view of Dublin Jewish domestic and religious life.');

addConn('jewish-community-of-zagreb', [
  { name: "Croatian government", type: "official", description: "Official representative body of Croatia's approximately 1,500 Jews." },
  { name: "Jasenovac memorial", type: "heritage", description: "Connected to the memory of Jasenovac, where tens of thousands of Serbs, Jews, and Roma were murdered during WWII." },
  { name: "Zagreb synagogue", type: "loss", description: "The magnificent Zagreb synagogue was demolished by the Ustasha regime in 1941-42." }
]);
updDesc('jewish-community-of-zagreb', 'Represents approximately 1,500 Jews in Croatia, centered in Zagreb. Croatia\'s Jewish history includes the devastating Ustasha period during WWII, when the Zagreb synagogue (an ornate Moorish Revival structure) was demolished and tens of thousands were murdered at the Jasenovac concentration camp. The community has revived since independence in 1991, operating a community center, cultural programs, and maintaining Holocaust remembrance. Zagreb\'s "Bet Israel" community center serves as the hub.');

addConn('federation-of-jewish-communities-in-serbia', [
  { name: "Serbian government", type: "official", description: "Recognized representative body of Serbia's approximately 1,500-2,000 Jews." },
  { name: "Belgrade Sephardic heritage", type: "heritage", description: "Belgrade had a centuries-old Sephardic community, largely destroyed in the Holocaust." },
  { name: "Subotica synagogue", type: "heritage site", description: "The Art Nouveau Subotica Synagogue (1902) is one of the most beautiful synagogues in Europe." }
]);
updDesc('federation-of-jewish-communities-in-serbia', 'Represents approximately 1,500-2,000 Jews in Serbia, centered in Belgrade. Belgrade had a centuries-old Sephardic community alongside Ashkenazi Jews. The Holocaust devastated Serbian Jewry , approximately 90% perished. The Art Nouveau Subotica Synagogue (1902), restored with significant Hungarian and EU funding, is one of the most architecturally stunning synagogues in Europe. The community maintains cultural programs and Holocaust remembrance.');

addConn('organization-of-the-jews-in-bulgaria', [
  { name: "Bulgarian rescue of Jews", type: "heritage", description: "Bulgaria famously saved nearly all of its 48,000 Jews from deportation during WWII." },
  { name: "Bulgarian parliament", type: "historical", description: "In 1943, Bulgarian MPs and church leaders prevented the deportation of Bulgarian Jews to death camps." },
  { name: "Sofia Synagogue", type: "main synagogue", description: "The Sofia Synagogue (1909) is the largest Sephardic synagogue in Europe." }
]);
updDesc('organization-of-the-jews-in-bulgaria', 'Known as Shalom, representing approximately 2,000 Jews in Bulgaria. Bulgaria holds a unique place in Holocaust history: in 1943, Bulgarian parliamentarians, church leaders, and civic pressure prevented the deportation of nearly all 48,000 Bulgarian Jews to Nazi death camps , one of the Holocaust\'s most remarkable rescue stories. However, Bulgaria did allow the deportation of 11,343 Jews from occupied Thrace and Macedonia. The Sofia Synagogue (1909) is the largest Sephardic synagogue in Europe.');

addConn('mountain-jewish-community-of-azerbaijan', [
  { name: "Mountain Jews (Juhuro)", type: "ethnic group", description: "The Mountain Jews (Juhuro) have lived in the Caucasus for over 2,500 years." },
  { name: "Red Settlement (Qırmızı Qəsəbə)", type: "center", description: "The Red Settlement in Quba is the only majority-Jewish town outside Israel and the US." },
  { name: "Azerbaijani government", type: "support", description: "Azerbaijan promotes its Jewish community as a model of tolerance." }
]);
updDesc('mountain-jewish-community-of-azerbaijan', 'The Mountain Jews (Juhuro) of Azerbaijan have lived in the Caucasus for over 2,500 years, making them one of the most ancient Jewish communities in the world. They speak Juhuri (Judeo-Tat), a unique Persian-based language. The Red Settlement (Qırmızı Qəsəbə) in Quba is the only all-Jewish town outside Israel and the US. Azerbaijan actively promotes its Jewish community as a model of tolerance, and President Aliyev has maintained warm Israel-Azerbaijan relations.');

addConn('georgian-jewish-community', [
  { name: "Ancient presence", type: "historical", description: "Georgian Jews claim a 2,600-year history, dating to the Babylonian exile." },
  { name: "Georgian government", type: "support", description: "Georgia promotes its tradition of religious tolerance and protection of Jewish heritage." },
  { name: "Tbilisi Great Synagogue", type: "center", description: "The Tbilisi Great Synagogue remains the center of Jewish life in Georgia." },
  { name: "Mass aliyah", type: "migration", description: "Most Georgian Jews emigrated to Israel in the 1970s-90s; approximately 100,000 Israeli citizens are of Georgian origin." }
]);
updDesc('georgian-jewish-community', 'One of the world\'s oldest Jewish communities, claiming 2,600 years of history in the Caucasus. Georgian Jews preserved unique traditions and maintained generally positive relations with their neighbors , Georgia is proud of never having had a pogrom. Most Georgian Jews emigrated to Israel in the 1970s-1990s; approximately 100,000 Israelis today are of Georgian origin. Approximately 3,000 Jews remain in Georgia, centered around the Tbilisi Great Synagogue.');

addConn('bukharan-jewish-community', [
  { name: "Central Asian heritage", type: "historical", description: "Bukharan Jews have lived in Central Asia for over 2,000 years along the ancient Silk Road." },
  { name: "Bukhori language", type: "cultural", description: "Speak Bukhori (Judeo-Tajik), a distinctive Judeo-Persian language." },
  { name: "Queens, New York community", type: "diaspora", description: "The largest Bukharan Jewish diaspora is in Forest Hills and Rego Park, Queens, New York (approximately 60,000)." },
  { name: "Uzbekistan government", type: "relationship", description: "Uzbekistan promotes its Jewish heritage as part of Silk Road cultural tourism." }
]);
updDesc('bukharan-jewish-community', 'Ancient Jewish community of Central Asia, present along the Silk Road for over 2,000 years. Bukharan Jews speak Bukhori (Judeo-Tajik), a Persian-based language. Historically centered in Bukhara and Samarkand, the community numbered 50,000+ before most emigrated in the 1990s. Today the largest Bukharan communities are in Queens, NY (approximately 60,000), Israel (approximately 150,000), and Vienna. Uzbekistan promotes its remaining Jewish heritage sites as part of Silk Road tourism.');

addConn('patronato-de-la-casa-de-la-comunidad-hebrea-de-cuba', [
  { name: "Pre-revolution community", type: "historical", description: "Cuba once had approximately 15,000 Jews; most fled after the 1959 Cuban Revolution." },
  { name: "SS St. Louis", type: "historical event", description: "In 1939, Cuba turned away the SS St. Louis carrying 937 Jewish refugees from Nazi Germany." },
  { name: "Fidel Castro era", type: "political", description: "The Jewish community declined from 15,000 to approximately 1,500 after the revolution; Castro allowed religious practice." },
  { name: "Canadian Jewish Congress", type: "support", description: "Canadian Jewish organizations have supported the Cuban community since the US embargo." }
]);
updDesc('patronato-de-la-casa-de-la-comunidad-hebrea-de-cuba', 'The main Jewish community center in Havana, serving Cuba\'s approximately 1,500 Jews , down from 15,000 before the 1959 revolution. Cuba\'s Jewish history includes the tragic 1939 SS St. Louis affair, when 937 Jewish refugees were turned away and many later perished in the Holocaust. After the revolution, most Jews emigrated. Those remaining maintained practice with support from Canadian Jewish organizations and JDC. The Patronato operates a synagogue, pharmacy, and Sunday school.');

addConn('mikv-israel-emanuel-synagogue', [
  { name: "Oldest continuous synagogue in Americas", type: "distinction", description: "Founded in 1651, it is the oldest continuously functioning synagogue in the Western Hemisphere." },
  { name: "Amsterdam Portuguese Synagogue", type: "historical connection", description: "Congregation descended from Portuguese Jews who came via Amsterdam." },
  { name: "Sand floor tradition", type: "architecture", description: "Features a sand floor, one of only two remaining sand-floor synagogues in the world." },
  { name: "Curaçao Jewish history", type: "heritage", description: "Curaçao Jews were instrumental in the island's trade economy from the 17th century." }
]);
updDesc('mikv-israel-emanuel-synagogue', 'The oldest continuously functioning synagogue in the Western Hemisphere, founded in 1651 by Portuguese Jews who arrived via Amsterdam. Located in Willemstad, Curaçao. Features a distinctive sand floor , one of only two sand-floor synagogues in the world (the other being in Jamaica). The congregation follows Sephardic rites. The adjacent Jewish Cultural Historical Museum documents over 350 years of Curaçao Jewish history. Jews played a crucial role in the island\'s trade economy, particularly as maritime merchants.');

addConn('jodensavanne-archaeological-site', [
  { name: "First Jewish settlement in the Americas", type: "historical", description: "Jodensavanne (Jewish Savannah) was one of the earliest autonomous Jewish settlements in the New World, founded c. 1665." },
  { name: "Beraha VeSalom Synagogue", type: "historical site", description: "Ruins of the Beraha VeSalom synagogue, the oldest synagogue in the Americas." },
  { name: "Sephardic plantation owners", type: "historical", description: "Sephardic Jews ran sugar plantations in Suriname under Dutch colonial rule." },
  { name: "UNESCO tentative list", type: "heritage", description: "On the UNESCO World Heritage tentative list for its unique historical significance." }
]);
updDesc('jodensavanne-archaeological-site', 'Archaeological site of Jodensavanne (Jewish Savannah), one of the earliest autonomous Jewish settlements in the New World, founded c. 1665 along the Suriname River. Sephardic Jews ran sugar plantations under Dutch colonial rule. The ruins of the Beraha VeSalom synagogue (c. 1685) are among the oldest synagogue remains in the Americas. On the UNESCO World Heritage tentative list. The site demonstrates the unique autonomy granted to Jews in the Dutch colonies, including their own courts and civil authority.');

addConn('neve-shalom-synagogue-paramaribo', [
  { name: "Paramaribo Jewish community", type: "community", description: "Serves Suriname's remaining Jewish community in the capital Paramaribo." },
  { name: "UNESCO World Heritage", type: "heritage", description: "Part of the UNESCO World Heritage-listed historic inner city of Paramaribo." },
  { name: "Dutch colonial heritage", type: "historical", description: "Built during the Dutch colonial period, reflecting the prosperity of Suriname's Jewish community." }
]);
updDesc('neve-shalom-synagogue-paramaribo', 'Synagogue in Paramaribo, Suriname, part of the UNESCO World Heritage-listed historic inner city. Suriname\'s Jewish community, though small today (approximately 200), has a history dating to the 17th century when Sephardic Jews established sugar plantations. The wooden synagogue reflects the unique architectural traditions of colonial Suriname. Uniquely, the synagogue stands next to a mosque , a symbol of the interfaith tolerance for which Suriname is known.');

addConn('jewish-community-of-gibraltar', [
  { name: "British overseas territory", type: "political context", description: "As a British territory, Gibraltar's Jews have strong connections to UK Jewish institutions." },
  { name: "Great Synagogue of Gibraltar", type: "main synagogue", description: "The Great Synagogue (Nefutsot Yehudah, 1724) is one of the oldest on the Iberian Peninsula." },
  { name: "Morocco connection", type: "geographical", description: "Given Gibraltar's location, the community has historical ties to Moroccan Jewry across the strait." }
]);
updDesc('jewish-community-of-gibraltar', 'Jewish community of approximately 600 in the British overseas territory of Gibraltar , one of the highest per-capita Jewish populations in the world. The Great Synagogue (Nefutsot Yehudah), established in 1724, is one of the oldest on the Iberian Peninsula. The community traces to refugees from the Spanish Inquisition and North African Jews. Given Gibraltar\'s strategic location, the community has historical ties to both British and Moroccan Jewry.');

addConn('musmeah-yeshua-synagogue-yangon', [
  { name: "Baghdadi Jewish community", type: "historical", description: "Built by Baghdadi Jewish merchants who arrived in Burma during British colonial rule." },
  { name: "1896 construction", type: "historical", description: "Built in 1896, it remains the only functioning synagogue in Myanmar." },
  { name: "Moses Samuels", type: "caretaker", description: "For decades, the synagogue was maintained by Moses Samuels, one of the last Jews in Myanmar." }
]);
updDesc('musmeah-yeshua-synagogue-yangon', 'The only functioning synagogue in Myanmar, built in 1896 in downtown Yangon by Baghdadi Jewish merchants during British colonial rule. Myanmar (Burma) once had a Jewish community of approximately 2,500. For decades, the synagogue was maintained by Moses Samuels, one of the last remaining Jews, who became its self-appointed caretaker and guide. Fewer than 20 Jews remain in Myanmar today. The synagogue is a Yangon heritage site, visited by tourists as a symbol of the country\'s multicultural past.');

// ============================================================
// INTERNATIONAL ORGANIZATIONS
// ============================================================

addConn('european-jewish-congress', [
  { name: "Moshe Kantor", type: "former president", description: "Moshe Kantor (Jewish, Russian-born) served as president for over a decade, advancing Jewish security in Europe." },
  { name: "European Union", type: "advocacy target", description: "Primary Jewish advocacy body at the European Union institutions." },
  { name: "World Jewish Congress", type: "affiliate", description: "Regional affiliate of the World Jewish Congress." },
  { name: "OSCE", type: "partner", description: "Works with the OSCE on combating antisemitism across Europe." }
]);
updDesc('european-jewish-congress', 'The representative body of Jewish communities across Europe, advocating for Jewish interests at the European Union, OSCE, and Council of Europe. Under long-serving president Moshe Kantor (Jewish, Russian-born), the EJC focused on combating antisemitism, promoting security, and defending religious freedoms. Represents communities from over 40 European countries. Works on issues including Holocaust remembrance, Israel-Europe relations, and addressing rising antisemitism.');

addConn('world-ort', [
  { name: "ORT Network", type: "global network", description: "Operates schools and training programs in over 35 countries for 300,000+ students." },
  { name: "1880 founding in Russia", type: "historical", description: "Founded in St. Petersburg in 1880 to provide vocational training for Russian Jews." },
  { name: "Technology education", type: "mission", description: "Focuses on STEM education, technology training, and workforce development." },
  { name: "Israel ORT Braude", type: "flagship", description: "ORT Braude College of Engineering in Israel is one of its flagship institutions." }
]);
updDesc('world-ort', 'Global Jewish education network founded in St. Petersburg, Russia in 1880 to provide vocational training for impoverished Jews. ORT (from Russian: Obshchestvo Remeslenogo i Zemledelcheskogo Truda , Society for Trades and Agricultural Labor) now operates schools and programs in over 35 countries serving 300,000+ students annually. Focus areas include STEM education, technology training, and workforce development. Major operations in Israel, Latin America, Africa, and the former Soviet Union.');

addConn('maccabi-world-union', [
  { name: "Maccabiah Games", type: "flagship event", description: "Organizes the Maccabiah Games (the 'Jewish Olympics'), held in Israel every four years since 1932." },
  { name: "International Olympic Committee", type: "recognition", description: "The Maccabiah Games are recognized by the IOC as a regional multi-sport event." },
  { name: "Sports clubs worldwide", type: "network", description: "Umbrella for Maccabi sports clubs in over 60 countries." },
  { name: "Zionist movement", type: "origin", description: "Founded in 1921, connected to the Zionist emphasis on physical fitness and 'muscular Judaism.'" }
]);
updDesc('maccabi-world-union', 'International Jewish sports organization founded in 1921, organizing the Maccabiah Games , the "Jewish Olympics" , held in Israel every four years since 1932. Recognized by the International Olympic Committee. Named after Judah Maccabee, the ancient Jewish military leader. Over 10,000 athletes from 80+ countries compete. Also runs youth programs and Maccabi sports clubs in 60+ countries promoting Jewish identity through athletics. The 2022 Maccabiah was the largest ever.');

addConn('claims-conference-conference-on-jewish-material-claims-against-germany', [
  { name: "German government", type: "negotiation partner", description: "Has negotiated over $80 billion in compensation from Germany for Holocaust survivors." },
  { name: "Nahum Goldmann", type: "founder", description: "Founded in 1951 by Nahum Goldmann (Jewish, president of the World Jewish Congress)." },
  { name: "Luxembourg Agreement", type: "landmark", description: "The 1952 Luxembourg Agreement established the framework for German reparations." },
  { name: "Holocaust survivor aid", type: "mission", description: "Distributes funds to approximately 260,000 Holocaust survivors in 83 countries." }
]);
updDesc('claims-conference-conference-on-jewish-material-claims-against-germany', 'Founded in 1951, the Claims Conference has negotiated over $80 billion in compensation from Germany for Holocaust survivors , the largest restitution program in history. The 1952 Luxembourg Agreement, negotiated by Nahum Goldmann, established the framework. Distributes direct payments and funds social services for approximately 260,000 survivors in 83 countries. Also recovers stolen Jewish property, including artwork. Has been both praised for its work and criticized for bureaucratic issues.');

addConn('international-holocaust-remembrance-alliance-ihra', [
  { name: "35 member countries", type: "membership", description: "Intergovernmental body with 35 member countries committed to Holocaust education and remembrance." },
  { name: "IHRA definition of antisemitism", type: "policy impact", description: "The IHRA working definition of antisemitism has been adopted by hundreds of institutions worldwide." },
  { name: "Stockholm Declaration", type: "founding document", description: "Grew out of the 2000 Stockholm International Forum on the Holocaust." },
  { name: "UNESCO", type: "partner", description: "Partners with UNESCO on Holocaust education programs globally." }
]);
updDesc('international-holocaust-remembrance-alliance-ihra', 'Intergovernmental body with 35 member countries committed to Holocaust education, remembrance, and research. Grew from the 2000 Stockholm International Forum on the Holocaust. Most influential for its Working Definition of Antisemitism, adopted by hundreds of governments, universities, and institutions worldwide , though also debated for its examples relating to criticism of Israel. Partners with UNESCO and maintains networks of scholars, educators, and museums.');

addConn('march-of-the-living', [
  { name: "Auschwitz-Birkenau", type: "route", description: "Annual march from Auschwitz to Birkenau on Yom HaShoah (Holocaust Remembrance Day)." },
  { name: "Israel visit", type: "program", description: "Participants then travel to Israel to celebrate Yom Ha'atzmaut (Independence Day)." },
  { name: "Youth education", type: "mission", description: "Brings thousands of young Jews from around the world to experience the march." },
  { name: "Abraham Hirschfeld", type: "founder", description: "Founded in 1988; over 300,000 people have participated." }
]);
updDesc('march-of-the-living', 'Annual educational program where thousands of young people from around the world march the 3-kilometer route from Auschwitz to Birkenau on Yom HaShoah (Holocaust Remembrance Day), then travel to Israel for Yom Ha\'atzmaut (Independence Day). Founded in 1988, over 300,000 people have participated. The symbolic journey from the site of destruction to the Jewish homeland aims to teach about the Holocaust and Jewish continuity. Participants include survivors, educators, and dignitaries from 40+ countries.');

addConn('international-march-of-the-living', [
  { name: "March of the Living", type: "related to", description: "Extended program of the March of the Living with additional educational components." },
  { name: "Holocaust survivors", type: "participants", description: "Includes Holocaust survivors who share firsthand testimony with young participants." },
  { name: "Global delegations", type: "participation", description: "Brings delegations from 40+ countries annually." }
]);
updDesc('international-march-of-the-living', 'The international dimension of the March of the Living program, coordinating delegations from 40+ countries to participate in the annual march from Auschwitz to Birkenau. Includes extended educational programming, survivor testimonies, and visits to other Holocaust sites in Poland. As the number of living survivors diminishes, the program increasingly emphasizes passing the torch of memory to new generations through recorded testimonies and interactive education.');

addConn('limmud-international', [
  { name: "UK origins", type: "origin", description: "Started in the UK in 1980 as an annual Jewish learning conference." },
  { name: "40+ countries", type: "global reach", description: "Now operates Limmud events in over 40 countries worldwide." },
  { name: "Volunteer-run", type: "model", description: "Uniquely, all Limmud events are organized entirely by volunteers , no paid presenters." },
  { name: "Cross-denominational", type: "approach", description: "Brings together Jews of all denominations and backgrounds for shared learning." }
]);
updDesc('limmud-international', 'International Jewish learning movement that started in the UK in 1980. Uniquely volunteer-driven , no one is paid to present or attend. Limmud events now occur in over 40 countries, bringing together Jews of all denominations for intensive weekends of learning, debating, and cultural exchange. Sessions cover everything from Talmud to technology, politics to poetry. The model has been called "the most significant development in Jewish education in recent decades."');

addConn('keren-hayesod-united-israel-appeal', [
  { name: "World Zionist Organization", type: "origin", description: "Founded in 1920 at the London Zionist Conference as the fundraising arm of the Zionist movement." },
  { name: "Israeli government", type: "partnership", description: "Works as a statutory fundraiser for the State of Israel in over 45 countries." },
  { name: "Jewish Agency", type: "partner", description: "Major funder of the Jewish Agency for Israel's immigration and absorption programs." },
  { name: "Albert Einstein", type: "historical", description: "Albert Einstein was among its early supporters, attending fundraising events." }
]);
updDesc('keren-hayesod-united-israel-appeal', 'Founded in 1920 at the London Zionist Conference, Keren Hayesod is the principal fundraising organization for Israel, operating in over 45 countries. One of Israel\'s national institutions alongside the Jewish Agency and JNF. Albert Einstein was among its early supporters. Raises hundreds of millions of dollars for immigration (aliyah), absorption of new immigrants, and social programs in Israel. Has facilitated the immigration of over 3 million Jews to Israel since its founding.');

addConn('world-mizrachi', [
  { name: "Religious Zionism", type: "ideology", description: "The central organization of the Religious Zionist movement worldwide." },
  { name: "Rabbi Isaac Herzog", type: "historical leader", description: "Named after the ideology of 'Mizrachi' , abbreviation for 'Merkaz Ruchani' (Spiritual Center)." },
  { name: "Founded 1902", type: "historical", description: "Founded in 1902 in Vilna by Rabbi Yitzchak Yaakov Reines to combine Torah observance with Zionism." },
  { name: "Bnei Akiva", type: "youth movement", description: "Bnei Akiva, the world's largest Religious Zionist youth movement, is affiliated with Mizrachi." }
]);
updDesc('world-mizrachi', 'The central organization of the Religious Zionist movement, founded in 1902 in Vilna by Rabbi Yitzchak Yaakov Reines. Mizrachi (abbreviation of "Merkaz Ruchani" , Spiritual Center) advocates combining Torah observance with Zionism. Affiliated with Bnei Akiva, the world\'s largest Religious Zionist youth movement (125,000 members in 40+ countries). Runs programs promoting Torah education, Israel engagement, and religious settlement. Represents the ideological bridge between Orthodoxy and Jewish nationhood.');

addConn('aleph-institute', [
  { name: "Chabad-Lubavitch", type: "affiliated", description: "Founded by Chabad-Lubavitch to serve Jewish prisoners and military personnel." },
  { name: "US military chaplaincy", type: "service", description: "Provides Jewish chaplaincy and religious services to US military personnel worldwide." },
  { name: "Criminal justice advocacy", type: "mission", description: "Advocates for criminal justice reform and provides reentry services for released prisoners." },
  { name: "Rebbe Menachem Mendel Schneerson", type: "inspiration", description: "Founded at the direction of the Lubavitcher Rebbe to care for 'forgotten Jews.'" }
]);
updDesc('aleph-institute', 'Founded in 1981 at the direction of the Lubavitcher Rebbe, Rabbi Menachem Mendel Schneerson, to serve "the Jews that everyone forgets" , prisoners, military personnel, and their families. Provides Jewish chaplaincy to US military worldwide, religious services to Jewish prisoners, and advocates for criminal justice reform. Also offers reentry programs for released prisoners. Affiliated with Chabad-Lubavitch. One of the few Jewish organizations focused on incarcerated individuals.');

addConn('shalom-hartman-institute', [
  { name: "David Hartman", type: "founder", description: "Founded in 1976 by Rabbi David Hartman (Jewish, Canadian-born Orthodox rabbi and philosopher)." },
  { name: "Jerusalem", type: "location", description: "Based in Jerusalem with a North American office." },
  { name: "Pluralistic approach", type: "method", description: "Known for bringing together Orthodox, Conservative, Reform, and secular Jews for study and dialogue." },
  { name: "Donniel Hartman", type: "current president", description: "Led by Donniel Hartman, David's son, who continues the pluralistic mission." }
]);
updDesc('shalom-hartman-institute', 'Founded in 1976 in Jerusalem by Rabbi David Hartman (Canadian-born Orthodox rabbi and philosopher). Known for its pluralistic approach , bringing Orthodox, Conservative, Reform, and secular Jews together for rigorous intellectual study and dialogue. Led by Donniel Hartman, David\'s son, who is a leading Jewish public intellectual. Runs influential programs for rabbis, educators, and lay leaders from across denominations. The Institute\'s scholarship on Jewish identity, Israel, and modernity shaped a generation of Jewish thought.');

addConn('aish-hatorah', [
  { name: "Rabbi Noach Weinberg", type: "founder", description: "Founded in 1974 by Rabbi Noach Weinberg (1930-2009) in Jerusalem." },
  { name: "Western Wall", type: "location", description: "The Jerusalem branch overlooks the Western Wall , one of Judaism's holiest sites." },
  { name: "Kiruv (outreach)", type: "mission", description: "One of the most prominent Jewish outreach (kiruv) organizations, targeting secular and unaffiliated Jews." },
  { name: "Hasbara Fellowships", type: "program", description: "Runs Hasbara Fellowships, training college students in pro-Israel advocacy." }
]);
updDesc('aish-hatorah', 'Orthodox Jewish outreach organization founded in 1974 by Rabbi Noach Weinberg in Jerusalem. Its building overlooks the Western Wall. One of the most prominent "kiruv" (outreach) organizations, targeting secular and unaffiliated Jews through programs like Discovery Seminars, Fellowships, and the Aish.com website (one of the most-visited Jewish sites). Also runs Hasbara Fellowships for Israel advocacy on college campuses. Branches in over 35 countries worldwide.');

addConn('ohr-somayach', [
  { name: "Rabbi Nota Schiller", type: "founder", description: "Founded in 1970 by Rabbi Nota Schiller and Rabbi Mendel Weinbach in Jerusalem." },
  { name: "Baalei teshuva yeshiva", type: "mission", description: "One of the first yeshivot designed for Jews with little or no religious background ('baalei teshuva')." },
  { name: "Jerusalem and Monsey", type: "locations", description: "Main campuses in Jerusalem and Monsey, New York." },
  { name: "Ohr Lagolah", type: "program", description: "The Ohr Lagolah program trains rabbis for small and emerging Jewish communities worldwide." }
]);
updDesc('ohr-somayach', 'Orthodox yeshiva founded in 1970 in Jerusalem by Rabbis Nota Schiller and Mendel Weinbach, pioneering the concept of a yeshiva for "baalei teshuva" , Jews with little or no religious background seeking to learn about their heritage. Main campuses in Jerusalem and Monsey, New York. The Ohr Lagolah Leadership Training program trains rabbis for underserved Jewish communities worldwide. Has educated tens of thousands since its founding. Known for intellectual rigor combined with welcoming atmosphere.');

addConn('jdc-american-jewish-joint-distribution-committee-global', [
  { name: "Founded 1914", type: "historical", description: "Founded in 1914 to aid Jews in Palestine and war-torn Europe during WWI." },
  { name: "70+ countries", type: "global reach", description: "Operates in over 70 countries providing humanitarian assistance and community development." },
  { name: "Holocaust rescue and relief", type: "heritage", description: "During WWII, JDC funded rescue operations and sustained Jewish communities in occupied Europe." },
  { name: "Former Soviet Union revival", type: "achievement", description: "After 1989, JDC led the revival of Jewish life in the former Soviet Union." },
  { name: "Israel social programs", type: "current", description: "In Israel, runs programs for elderly, disabled, and disadvantaged populations." }
]);
updDesc('jdc-american-jewish-joint-distribution-committee-global', 'Founded in 1914, the JDC (known as "the Joint") is the world\'s leading Jewish humanitarian organization, operating in over 70 countries. During WWII, funded rescue operations including the Kindertransport. After the war, helped resettle survivors. After 1989, led the revival of Jewish life across the former Soviet Union, rebuilding communities from the Baltic to Central Asia. In Israel, runs social welfare programs serving 150,000 elderly and disadvantaged. Has aided millions of people over its 110+ year history.');

// ============================================================
// SAVE
// ============================================================

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0; for(const c in data.countries) for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;}
console.log(`Done! ${tc} entries, ${wc} with connections, ${Object.keys(people.people).length} people.`);
let totalConn=0; for(const c in data.countries) for(const e of data.countries[c]) totalConn+=(e.connections||[]).length;
console.log(`Total connections: ${totalConn}`);
let fewConn=0; for(const c in data.countries) for(const e of data.countries[c]) if((e.connections||[]).length<=2) fewConn++;
console.log(`Entries with <=2 connections: ${fewConn}`);
