// addConnections15.js - Add individuals to Israel entries (62)
const fs = require('fs');
const path = require('path');
const jewishFile = path.join(__dirname, '..', 'data', 'jewish.json');
const peopleFile = path.join(__dirname, '..', 'data', 'people.json');
const data = JSON.parse(fs.readFileSync(jewishFile, 'utf8'));
const people = JSON.parse(fs.readFileSync(peopleFile, 'utf8'));
function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
const entryIndex = {};
for (const country in data.countries) { for (const entry of data.countries[country]) { entryIndex[entry.id] = { entry, country }; } }
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

// === ISRAEL (62 entries) ===

addInd('ministry-of-foreign-affairs', { name: "Eli Cohen", bio: "Israeli politician who served as Minister of Foreign Affairs. The ministry manages Israel's diplomatic relations with over 150 countries.", role: "Minister" });
addInd('israel-tax-authority', { name: "Eran Yaakov", bio: "Commissioner of the Israel Tax Authority, overseeing tax collection for the State of Israel.", role: "Commissioner" });
addInd('israel-lands-authority', { name: "Yaakov Kvint", bio: "Director General of the Israel Lands Authority, managing 93% of land in Israel.", role: "Director General" });
addInd('israel-airports-authority', { name: "Hagai Topolansky", bio: "Director General of the Israel Airports Authority, overseeing Ben Gurion Airport and other Israeli airports.", role: "Director General" });
addInd('ben-gurion-university-of-the-negev', { name: "Daniel Chamovitz", bio: "President of Ben-Gurion University of the Negev, named after Israel's founding prime minister David Ben-Gurion.", role: "President" });
addInd('university-of-haifa', { name: "Ron Robin", bio: "President of the University of Haifa, Israel's most diverse university with significant Arab student enrollment.", role: "President" });
addInd('reichman-university-idc-herzliya', { name: "Uriel Reichman", bio: "Founder and president of Reichman University (formerly IDC Herzliya), Israel's first private university.", role: "Founder & President" });
addInd('bezalel-academy-of-arts-and-design', { name: "Boris Schatz", bio: "Founded Bezalel Academy in 1906 in Jerusalem, making it Israel's oldest art institution. Named after the biblical artisan Bezalel.", role: "Founder" });
addInd('hadassah-medical-center', { name: "Henrietta Szold", bio: "Founded Hadassah in 1912, the Women's Zionist Organization of America, which built and operates Hadassah Medical Center in Jerusalem.", role: "Founder" });
addInd('teva-pharmaceutical-industries', { name: "Kåre Schultz", bio: "Former President and CEO of Teva Pharmaceutical Industries, the world's largest generic drug manufacturer, headquartered in Tel Aviv.", role: "Former CEO" });
addInd('nice-ltd', { name: "Barak Eilam", bio: "CEO of NICE Ltd (Jewish, Israeli), a global leader in cloud and on-premises enterprise software and AI.", role: "CEO" });
addInd('elbit-systems', { name: "Bezhalel Machlis", bio: "President and CEO of Elbit Systems (Jewish), Israel's largest publicly traded defense company.", role: "President & CEO" });
addInd('israel-aerospace-industries-iai', { name: "Boaz Levy", bio: "President and CEO of Israel Aerospace Industries, Israel's largest defense and aerospace manufacturer.", role: "President & CEO" });
addInd('rafael-advanced-defense-systems', { name: "Yoav Har-Even", bio: "President and CEO of Rafael Advanced Defense Systems, developer of Iron Dome, David's Sling, and Trophy defense systems.", role: "President & CEO" });
addInd('israel-military-industries-imi-systems', { name: "Avi Felder", bio: "Former CEO of IMI Systems (now merged with Elbit), Israel's munitions and military technology developer.", role: "Former CEO" });
addInd('tower-semiconductor', { name: "Russell Ellwanger", bio: "CEO of Tower Semiconductor (Jewish), a leading foundry specializing in analog semiconductor manufacturing.", role: "CEO" });
addInd('ironsource-unity', { name: "Omer Kaplan", bio: "Co-founder of ironSource (Jewish, Israeli), the app monetization platform that merged with Unity Technologies in 2022.", role: "Co-Founder" });
addInd('playtika', { name: "Robert Antokol", bio: "Co-founder and CEO of Playtika (Jewish, Israeli), a leading mobile gaming company acquired by a Chinese consortium for $4.4B.", role: "Co-Founder & CEO" });
addInd('icl-group', { name: "Raviv Zoller", bio: "President and CEO of ICL Group (Jewish), a global specialty minerals company based on Dead Sea resources.", role: "President & CEO" });
addInd('bank-hapoalim', { name: "Dov Kotler", bio: "CEO of Bank Hapoalim (Jewish), Israel's largest bank by assets.", role: "CEO" });
addInd('bank-leumi', { name: "Hanan Friedman", bio: "President and CEO of Bank Leumi (Jewish), Israel's oldest bank, founded in 1902 as the Anglo-Palestine Company.", role: "CEO" });
addInd('israel-discount-bank', { name: "Uri Levin", bio: "President and CEO of Israel Discount Bank, the third-largest banking group in Israel.", role: "CEO" });
addInd('el-al-israel-airlines', { name: "Dina Ben Tal Ganancia", bio: "CEO of El Al Israel Airlines, Israel's national carrier, known for strict security and not flying on Shabbat.", role: "CEO" });
addInd('strauss-group', { name: "Ofra Strauss", bio: "Chairwoman of Strauss Group (Jewish), one of Israel's largest food and beverage companies. Granddaughter of founders Richard and Hilda Strauss.", role: "Chairwoman" });
addInd('tnuva', { name: "Eyal Malis", bio: "CEO of Tnuva, Israel's largest food manufacturer, controlling approximately 70% of the Israeli dairy market. Acquired by Bright Food (China) in 2014.", role: "CEO" });
addInd('osem-nestl', { name: "Avi Ben Assayag", bio: "CEO of Osem-Nestlé Israel, one of Israel's largest food manufacturers and a subsidiary of Nestlé since 2016.", role: "CEO" });
addInd('the-jerusalem-post', { name: "Yaakov Katz", bio: "Editor-in-chief of The Jerusalem Post (Jewish), Israel's leading English-language daily newspaper.", role: "Editor-in-Chief" });
addInd('israel-hayom', { name: "Sheldon Adelson", bio: "Late casino magnate (Jewish) who founded Israel Hayom in 2007, making it Israel's most-read newspaper. Distributed free as a pro-Netanyahu publication.", role: "Founder" });
addInd('i24news', { name: "Frank Melloul", bio: "CEO and chairman of i24NEWS (Jewish), Israel's international 24/7 news channel broadcasting in English, French, and Arabic.", role: "CEO" });
addInd('israel-museum', { name: "Ido Bruno", bio: "Director of the Israel Museum in Jerusalem, which houses the Dead Sea Scrolls in the Shrine of the Book.", role: "Director" });
addInd('tel-aviv-museum-of-art', { name: "Tania Coen-Uzzielli", bio: "Director of the Tel Aviv Museum of Art, one of Israel's leading art museums with extensive Israeli and international collections.", role: "Director" });
addInd('israel-philharmonic-orchestra', { name: "Zubin Mehta", bio: "Indian-born conductor who served as Music Director of the Israel Philharmonic Orchestra for nearly 50 years (1969-2019), a deeply beloved figure.", role: "Former Music Director" });
addInd('habima-national-theatre', { name: "Nahum Zemach", bio: "Founded Habima Theatre in Moscow in 1917 as the first Hebrew-language theater. It moved to British Mandate Palestine in 1928.", role: "Founder" });
addInd('keren-kayemeth-leisrael-jewish-national-fund', { name: "Theodor Herzl", bio: "The JNF was proposed at the Fifth Zionist Congress (1901) by Theodor Herzl to buy and develop land in Palestine for Jewish settlement.", role: "Visionary" });
addInd('mobileye-global', { name: "Amnon Shashua", bio: "Co-founder and CEO of Mobileye (Jewish, Israeli), pioneer of autonomous driving technology. Intel acquired Mobileye for $15.3B in 2017.", role: "Co-Founder & CEO" });
addInd('ironsource-merged-with-unity', { name: "Tomer Bar-Zeev", bio: "Co-founder and CEO of ironSource (Jewish, Israeli), which merged with Unity Technologies in a $4.4B deal in 2022.", role: "Co-Founder & CEO" });
addInd('ironsource-now-unity', { name: "Tomer Bar-Zeev", bio: "Co-founder and CEO of ironSource (Jewish, Israeli), which merged with Unity Technologies in 2022.", role: "Co-Founder & CEO" });
addInd('varonis-systems', { name: "Yaki Faitelson", bio: "Co-founder and CEO of Varonis Systems (Jewish, Israeli), a cybersecurity company specializing in data security and analytics.", role: "Co-Founder & CEO" });
addInd('appsflyer', { name: "Oren Kaniel", bio: "Co-founder and CEO of AppsFlyer (Jewish, Israeli), a mobile attribution and marketing analytics platform.", role: "Co-Founder & CEO" });
addInd('cellebrite', { name: "Yossi Carmil", bio: "CEO of Cellebrite (Jewish), an Israeli digital forensics company whose tools are used by law enforcement worldwide.", role: "CEO" });
addInd('candiru-saito-tech', { name: "Eitan Achlow", bio: "Co-founder of Candiru (Saito Tech), an Israeli cyber-intelligence firm selling surveillance tools to governments.", role: "Co-Founder" });
addInd('verint-systems', { name: "Dan Bodner", bio: "CEO of Verint Systems (Jewish, Israeli-born), a cybersecurity and intelligence company spun off from Comverse Technology.", role: "CEO" });
addInd('nice-systems', { name: "Barak Eilam", bio: "CEO of NICE Systems (Jewish, Israeli), provider of cloud and AI-based enterprise software solutions.", role: "CEO" });
addInd('amdocs', { name: "Shuky Sheffer", bio: "President and CEO of Amdocs (Jewish, Israeli-founded), a leading IT services and software company serving communications industry.", role: "President & CEO" });
addInd('sapiens-international', { name: "Roni Al-Dor", bio: "President and CEO of Sapiens International (Jewish), a software company serving the insurance industry globally.", role: "President & CEO" });
addInd('ide-technologies', { name: "Avraham Ophir", bio: "Executive at IDE Technologies (Jewish), a world leader in desalination and industrial water treatment, co-owned by ICL and Delek.", role: "Executive" });
addInd('mekorot', { name: "Eli Cohen", bio: "CEO of Mekorot, Israel's national water company, managing the country's water infrastructure including the National Water Carrier.", role: "CEO" });
addInd('jewish-national-fund-keren-kayemeth-leisrael-kkl-jnf', { name: "Avraham Duvdevani", bio: "World Chairman of KKL-JNF, which has planted over 250 million trees in Israel and manages 170,000 acres of land.", role: "World Chairman" });
addInd('birthright-israel-taglit', { name: "Charles Bronfman", bio: "Co-founder of Birthright Israel (Jewish, Canadian), along with Michael Steinhardt, providing free 10-day trips to Israel for young Jews.", role: "Co-Founder" });
addInd('birthright-israel-taglit', { name: "Michael Steinhardt", bio: "Co-founder of Birthright Israel (Jewish), legendary hedge fund investor and Jewish philanthropist.", role: "Co-Founder" });
addInd('nefesh-b-nefesh-israel', { name: "Rabbi Yehoshua Fass", bio: "Co-founder of Nefesh B'Nefesh (Jewish), which has helped over 65,000 North American and British Jews make aliyah since 2002.", role: "Co-Founder" });
addInd('israel-innovation-authority', { name: "Dror Bin", bio: "CEO of the Israel Innovation Authority, overseeing Israel's innovation policy and support for R&D.", role: "CEO" });
addInd('start-up-nation-central', { name: "Eugene Kandel", bio: "CEO of Start-Up Nation Central (Jewish), an organization mapping and promoting Israel's tech ecosystem.", role: "CEO" });
addInd('unit-8200', { name: "Nadav Zafrir", bio: "Former commander of Unit 8200 (Jewish) and co-founder of Team8, a cybersecurity think tank. Unit 8200 alumni have founded many top tech companies.", role: "Former Commander" });
addInd('talpiot-program', { name: "Felix Dothan", bio: "One of the original architects of the Talpiot program (Jewish), the IDF's elite academic-military program for top recruits.", role: "Program Architect" });
addInd('galei-zahal-idf-radio', { name: "Ilana Dayan", bio: "Israeli journalist (Jewish) who presented on Galei Zahal before becoming one of Israel's most prominent investigative journalists.", role: "Alumna" });
addInd('walla-news', { name: "Ilan Yeshua", bio: "Former CEO of Walla! News, an Israeli news and content portal. Testified in the Netanyahu corruption trial (Case 4000).", role: "Former CEO" });
addInd('start-up-nation-ecosystem', { name: "Saul Singer", bio: "Co-author of 'Start-Up Nation' (Jewish), the bestselling book that popularized Israel's reputation as a global tech powerhouse.", role: "Author" });
addInd('western-wall-heritage-foundation', { name: "Shmuel Rabinovitch", bio: "Rabbi of the Western Wall (Jewish), overseeing the holiest site where Jews can pray, visited by millions annually.", role: "Rabbi of the Western Wall" });
addInd('temple-mount-haram-al-sharif', { name: "Sheikh Muhammad Ahmad Hussein", bio: "Grand Mufti of Jerusalem, overseeing the Islamic Waqf's administration of the Temple Mount/Haram al-Sharif compound.", role: "Grand Mufti" });
addInd('masada-national-park', { name: "Yigael Yadin", bio: "Israeli archaeologist and politician (Jewish) who led the famous excavations of Masada (1963-1965), uncovering the Zealot fortress.", role: "Lead Archaeologist" });
addInd('church-of-the-holy-sepulchre-jerusalem', { name: "Theophilos III", bio: "Greek Orthodox Patriarch of Jerusalem, co-custodian of the Church of the Holy Sepulchre alongside Catholic and Armenian churches.", role: "Patriarch" });
addInd('cave-of-the-patriarchs-hebron', { name: "Herod the Great", bio: "King Herod (Jewish, Idumean) built the monumental structure over the Cave of the Patriarchs in Hebron approximately 2,000 years ago.", role: "Historical Builder" });

// === SAVE ===
fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let noInd=0; for(const c in data.countries) for(const e of data.countries[c]) if(!e.individuals||e.individuals.length===0) noInd++;
console.log(`Done! People: ${Object.keys(people.people).length}. Entries without individuals: ${noInd}`);
