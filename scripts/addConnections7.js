// addConnections7.js - US Foundations, Law, Pharma, Synagogues, Schools, Camps, Notable Figures + Estée Lauder
// Run AFTER addConnections6.js
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
// US - FOUNDATIONS
// ============================================================
addConn('jim-joseph-foundation', [
  { name: "Jim Joseph", type: "founder", description: "Jim Joseph (Jewish) was a San Francisco real estate developer who left $500M+ to Jewish education." },
  { name: "Jewish day schools", type: "grantee", description: "Major funder of Jewish day schools and immersive Jewish education." },
  { name: "Birthright Israel", type: "grantee", description: "Significant funder of Birthright Israel and Israel experience programs." },
  { name: "Hillel International", type: "grantee", description: "Major donor to Hillel campus programs across North America." }
]);
updDesc('jim-joseph-foundation', 'Created by the estate of Jim Joseph (Jewish), a San Francisco real estate developer who died in 2009, leaving over $500 million to Jewish education - one of the largest bequests in Jewish philanthropic history. The foundation funds Jewish day schools, Birthright Israel, Hillel, PJ Library, and other programs. Focuses on engaging young Jews ages 13-25 in Jewish life and learning.');

addConn('maimonides-fund', [
  { name: "Sheldon Adelson", type: "backer", description: "The Maimonides Fund was associated with the Adelsons' philanthropic strategy." },
  { name: "Middle East policy", type: "focus", description: "Funds think tanks and organizations focused on Middle East policy and pro-Israel advocacy." },
  { name: "Tikvah Fund", type: "related", description: "Connected to the network of conservative Jewish policy organizations." }
]);
updDesc('maimonides-fund', 'A private foundation focused on pro-Israel advocacy, Jewish education, and Middle East policy. Named after the medieval Jewish philosopher Maimonides (Rabbi Moses ben Maimon, 1138-1204). Funds think tanks, advocacy organizations, and educational programs across the Jewish spectrum.');

addConn('marcus-foundation', [
  { name: "Bernie Marcus", type: "founder", description: "Bernie Marcus (Jewish), co-founder of Home Depot, established the foundation." },
  { name: "Georgia Aquarium", type: "major gift", description: "Marcus donated $250 million for the Georgia Aquarium, the largest in the Western Hemisphere." },
  { name: "Autism research", type: "focus area", description: "Marcus has donated $400+ million to autism research, founding the Marcus Autism Center." },
  { name: "Grady Memorial Hospital", type: "major gift", description: "Donated $250 million to Grady Hospital in Atlanta." },
  { name: "Veterans causes", type: "focus area", description: "Major supporter of veteran services and military families." }
]);
updDesc('marcus-foundation', 'Founded by Bernie Marcus (Jewish), co-founder of Home Depot. The Marcus Foundation has given away over $2 billion, including $250M for the Georgia Aquarium, $400M+ for autism research (Marcus Autism Center at Emory), $250M for Grady Hospital, and major gifts to Israel. Marcus has signed the Giving Pledge. Focus areas include medical research, autism, veterans, Jewish causes, and free enterprise.');

addConn('charles-bronfman-foundation', [
  { name: "Charles Bronfman", type: "founder", description: "Charles Bronfman (Jewish, Canadian) is a billionaire from the Seagram liquor fortune." },
  { name: "Birthright Israel", type: "co-founder", description: "Bronfman co-founded Birthright Israel with Michael Steinhardt." },
  { name: "Andrea and Charles Bronfman Philanthropies", type: "umbrella", description: "Umbrella organization for Bronfman's philanthropic activities." },
  { name: "Montreal Expos", type: "former owner", description: "Bronfman owned the Montreal Expos baseball team." }
]);
updDesc('charles-bronfman-foundation', 'Charles Bronfman (Jewish, Canadian) is a billionaire philanthropist from the Seagram liquor dynasty. Co-founded Birthright Israel (1999) with Michael Steinhardt. Former owner of the Montreal Expos. Through his philanthropies, he has invested hundreds of millions in Jewish education, Israel engagement, and youth programming. Authored "The Art of Doing Good." Net worth $2+ billion.');

addConn('adelson-family-foundation', [
  { name: "Sheldon Adelson", type: "founder", description: "Sheldon Adelson (Jewish, 1933-2021) and his wife Miriam founded the Adelson Family Foundation." },
  { name: "Birthright Israel", type: "mega-gift", description: "Sheldon Adelson donated $410 million to Birthright - the largest single philanthropic gift." },
  { name: "Yad Vashem", type: "major gift", description: "Major donor to Yad Vashem Holocaust memorial in Jerusalem." },
  { name: "Republican Party", type: "political donations", description: "The Adelsons donated $500+ million to Republican causes." },
  { name: "Adelson Medical Research Foundation", type: "medical research", description: "Funds research on cancer, neuroscience, and substance abuse." }
]);
updDesc('adelson-family-foundation', 'Founded by Sheldon Adelson (Jewish, 1933-2021) and Dr. Miriam Adelson (Israeli-born physician). Combined charitable giving exceeds $1 billion+. $410M to Birthright Israel (largest single gift), major donations to Yad Vashem, Republican Jewish Coalition, and medical research. Miriam continues the foundation after Sheldon\'s death. The Adelsons were the largest Republican donors in US history ($500M+ to GOP).');

addConn('klarman-family-foundation', [
  { name: "Seth Klarman", type: "founder", description: "Seth Klarman (Jewish) is founder of Baupost Group and a legendary value investor." },
  { name: "Baupost Group", type: "source of wealth", description: "Klarman runs $30 billion Baupost Group, one of the most successful hedge funds." },
  { name: "Times of Israel", type: "investment", description: "Klarman was an early investor in The Times of Israel." },
  { name: "Israel/Jewish causes", type: "philanthropy", description: "Major donor to pro-Israel organizations and Jewish community causes." },
  { name: "Harvard", type: "philanthropy", description: "Major donor to Harvard, his alma mater." }
]);
updDesc('klarman-family-foundation', 'Founded by Seth Klarman (Jewish) and his wife Beth. Klarman runs the $30+ billion Baupost Group, one of the most successful hedge funds in history. Author of "Margin of Safety," one of the most expensive investment books ($2,000+ secondhand). Major donor to Jewish causes, Israel, Harvard, and medical research. Early investor in The Times of Israel. Net worth $1.5+ billion.');

addConn('ronald-s-lauder-foundation', [
  { name: "Ronald Lauder", type: "founder", description: "Ronald Lauder (Jewish), heir to the Estée Lauder cosmetics fortune." },
  { name: "World Jewish Congress", type: "president", description: "Lauder has served as president of the World Jewish Congress since 2007." },
  { name: "Neue Galerie NYC", type: "cultural institution", description: "Lauder founded the Neue Galerie, which houses the $135 million Klimt 'Portrait of Adele Bloch-Bauer I.'" },
  { name: "Lauder Foundation Jewish schools", type: "education", description: "The Lauder Foundation has built Jewish schools across Central/Eastern Europe." },
  { name: "US Ambassador to Austria", type: "government service", description: "Lauder served as US Ambassador to Austria (1986-1987)." }
]);
updDesc('ronald-s-lauder-foundation', 'Founded by Ronald Lauder (Jewish), son of Estée Lauder, heir to the cosmetics fortune. President of the World Jewish Congress since 2007. Founded the Neue Galerie in NYC (housing the $135M Klimt painting). Served as US Ambassador to Austria. The Lauder Foundation has established Jewish schools and community centers across Central and Eastern Europe, rebuilding Jewish life after communism. Net worth $4+ billion.');

addConn('tikva-fund', [
  { name: "Conservative Jewish thought", type: "mission", description: "Tikvah promotes conservative/traditionalist Jewish political and intellectual thought." },
  { name: "Tikvah fellowship programs", type: "programs", description: "Runs fellowship programs at Princeton, Yale, and in Israel." },
  { name: "Mosaic Magazine", type: "publication", description: "Publishes Mosaic, an online magazine of Jewish ideas." },
  { name: "Roger Hertog", type: "major donor", description: "Roger Hertog (Jewish) is a major funder of conservative Jewish intellectual programs." }
]);
updDesc('tikva-fund', 'A philanthropic foundation dedicated to promoting Jewish and Western civilizational thought. Runs fellowship programs for young intellectuals at Princeton, Yale, and in Israel. Publishes Mosaic Magazine, a monthly journal on Jewish politics, culture, and religion. Supports conservative/traditionalist Jewish intellectual life. Funded by Roger Hertog (Jewish, former vice chairman of Alliance Bernstein).');

// ============================================================
// US - CHARITIES / NONPROFITS
// ============================================================
addConn('friends-of-the-idf-fidf-additional-chapters', [
  { name: "FIDF", type: "parent organization", description: "Additional chapters of FIDF across the US supporting IDF soldiers." },
  { name: "IDF soldiers", type: "beneficiaries", description: "Supports IDF soldiers and their families through scholarships, wellbeing programs." },
  { name: "Local Jewish communities", type: "donor base", description: "FIDF chapters operate in major Jewish communities across America." }
]);
updDesc('friends-of-the-idf-fidf-additional-chapters', 'FIDF operates regional chapters across the US - from New York to LA, Miami to Chicago - each hosting galas and events to support IDF soldiers. Individual chapters raise millions annually. Programs include IMPACT! scholarships, Lone Soldier support, PTSD treatment, and recreational facilities for soldiers. FIDF\'s network reflects the depth of American Jewish pro-Israel engagement.');

addConn('nefesh-b-nefesh', [
  { name: "Tony Gelbart", type: "co-founder", description: "Tony Gelbart (Jewish) co-founded NBN to facilitate North American aliyah to Israel." },
  { name: "Rabbi Yehoshua Fass", type: "co-founder", description: "Rabbi Yehoshua Fass co-founded NBN and serves as executive director." },
  { name: "Jewish Agency for Israel", type: "partner", description: "NBN works in cooperation with the Jewish Agency on aliyah processing." },
  { name: "Israeli government", type: "partner", description: "The Israeli government partners with NBN on immigration services." },
  { name: "65,000+ olim", type: "impact", description: "NBN has helped over 65,000 North Americans make aliyah since 2002." }
]);
updDesc('nefesh-b-nefesh', 'Founded in 2002 by Tony Gelbart and Rabbi Yehoshua Fass. NBN has facilitated the aliyah (immigration to Israel) of over 65,000 North Americans and British Jews. Works in partnership with the Jewish Agency for Israel and the Israeli government. Known for its charter aliyah flights and comprehensive pre- and post-immigration support services. The organization\'s name means "Soul by Soul."');

addConn('one-israel-fund', [
  { name: "Israeli settlements", type: "beneficiary", description: "One Israel Fund provides security equipment and community support to Israeli settlements in the West Bank." },
  { name: "Israel Defense Forces", type: "relationship", description: "Provides equipment to IDF units operating in Judea and Samaria." },
  { name: "Right-wing pro-Israel advocacy", type: "political position", description: "Supports Israeli sovereignty over the West Bank territories." }
]);
updDesc('one-israel-fund', 'An American nonprofit that provides security, emergency, and community development support to Israeli communities in Judea and Samaria (the West Bank). Funds ambulances, security equipment, protected playgrounds, and community resilience programs. Operates from a right-wing Zionist perspective supporting Israeli settlement presence.');

addConn('jewish-funders-network', [
  { name: "Major Jewish philanthropists", type: "membership", description: "JFN connects Jewish funders and foundations to share best practices and collaborate." },
  { name: "Jewish Communal Fund", type: "connected entity", description: "Works with major Jewish donor-advised fund organizations." },
  { name: "Jewish philanthropic ecosystem", type: "role", description: "JFN serves as the networking hub for Jewish philanthropic leaders." }
]);
updDesc('jewish-funders-network', 'A membership network of approximately 200+ Jewish funders and foundations representing $10+ billion in charitable assets. JFN facilitates collaboration, knowledge-sharing, and innovation in Jewish philanthropy. Hosts an annual conference bringing together the leading Jewish philanthropists in North America and Israel. Members include family foundations, federation endowments, and institutional funders.');

addConn('magen-david-adom-usa', [
  { name: "Magen David Adom", type: "parent organization", description: "The American fundraising arm of Israel's national emergency medical service." },
  { name: "Red Cross/Red Crescent", type: "international recognition", description: "MDA was admitted to the International Red Cross and Red Crescent Movement in 2006." },
  { name: "Israel emergency services", type: "operations", description: "MDA operates Israel's ambulance service, blood bank, and disaster response." }
]);
updDesc('magen-david-adom-usa', 'The American fundraising arm of Magen David Adom (MDA), Israel\'s national emergency medical, disaster, ambulance, and blood banking service. MDA was recognized by the International Red Cross Movement in 2006. Operates 1,500+ ambulances and has 30,000+ volunteers in Israel. AFMDA raises over $50 million annually for ambulances, blood-testing equipment, and medical supplies.');

addConn('pj-library', [
  { name: "Harold Grinspoon Foundation", type: "creator", description: "PJ Library was created by the Harold Grinspoon Foundation." },
  { name: "Harold Grinspoon", type: "founder", description: "Harold Grinspoon (Jewish) founded PJ Library to send free Jewish books to children monthly." },
  { name: "680,000+ children", type: "reach", description: "PJ Library sends free Jewish children's books to 680,000+ kids monthly in 35 countries." },
  { name: "Jewish federations", type: "local partners", description: "Local Jewish federations partner to distribute PJ Library books in their communities." }
]);
updDesc('pj-library', 'Created by Harold Grinspoon (Jewish) through the Harold Grinspoon Foundation. PJ Library sends free, high-quality Jewish children\'s books and music to families monthly. Now reaching 680,000+ children in 35 countries. "PJ" stands for "pajamas" - the idea of parents and children reading together at bedtime. The program has distributed over 20 million books and is widely considered one of the most successful Jewish engagement initiatives.');

// ============================================================
// US - PHARMACEUTICALS & HEALTHCARE
// ============================================================
addConn('pfizer', [
  { name: "Albert Bourla", type: "CEO", description: "Albert Bourla (Jewish, born in Thessaloniki, Greece to Holocaust survivor parents) led Pfizer through the COVID-19 vaccine." },
  { name: "COVID-19 vaccine", type: "achievement", description: "Pfizer-BioNTech developed the first approved COVID-19 vaccine." },
  { name: "BioNTech partnership", type: "partner", description: "Partnered with BioNTech (co-founded by Uğur Şahin, married to Özlem Türeci) on mRNA vaccine." },
  { name: "Israel vaccine rollout", type: "connection", description: "Israel was the first country to mass-vaccinate with Pfizer, sharing data in exchange for early supply." },
  { name: "Genesis Prize", type: "recognition", description: "Bourla won the Genesis Prize (the 'Jewish Nobel') in 2022." }
]);
updDesc('pfizer', 'CEO Albert Bourla (Jewish, born in Thessaloniki, Greece to Holocaust survivor parents - his parents survived the Nazis when 96% of Thessaloniki\'s Jews were killed) led the development of the Pfizer-BioNTech COVID-19 vaccine in record time. Israel was the first country to mass-vaccinate with Pfizer, sharing real-world data in exchange for early supply. Bourla won the Genesis Prize (\"Jewish Nobel\") in 2022. Pfizer is a $200+ billion pharmaceutical giant.');
addInd('pfizer', { name: "Albert Bourla", bio: "CEO of Pfizer since 2019. Born in Thessaloniki, Greece to Sephardic Jewish Holocaust survivor parents. Led development of the first COVID-19 vaccine. Won the Genesis Prize in 2022." });

addConn('valeant-bausch-health', [
  { name: "Michael Pearson", type: "former CEO", description: "Under Pearson, Valeant pursued an aggressive acquisition strategy that later collapsed." },
  { name: "Bill Ackman", type: "major investor", description: "Bill Ackman (Jewish, Pershing Square) was a major Valeant investor, losing $4 billion." },
  { name: "Bausch + Lomb", type: "subsidiary", description: "Valeant rebranded as Bausch Health and later spun off Bausch + Lomb." },
  { name: "Pharmaceutical pricing controversy", type: "scandal", description: "Valeant was embroiled in drug pricing scandals that wiped out 90% of its value." }
]);
updDesc('valeant-bausch-health', 'Valeant Pharmaceuticals, now Bausch Health, gained notoriety for aggressive drug price increases and an acquisition-driven strategy. Bill Ackman (Jewish, Pershing Square Capital) invested $4 billion before the stock collapsed. The company was valued at $90 billion at its peak before losing over 90% of its value. Rebranded as Bausch Health and spun off Bausch + Lomb.');

addConn('est-e-lauder-companies', [
  { name: "Estée Lauder", type: "founder", description: "Estée Lauder (Jewish, born Josephine Esther Mentzer) founded the cosmetics empire in 1946." },
  { name: "Leonard Lauder", type: "chairman emeritus", description: "Leonard Lauder (Jewish) led the company as CEO for decades and is a billionaire art collector." },
  { name: "Ronald Lauder", type: "World Jewish Congress president", description: "Ronald Lauder (Jewish) is president of the World Jewish Congress and founded the Neue Galerie." },
  { name: "Clinique/MAC/Bobbi Brown", type: "brands", description: "ELC owns Clinique, MAC, Bobbi Brown, La Mer, Aveda, and Tom Ford Beauty." },
  { name: "William Lauder", type: "executive chairman", description: "William Lauder (Jewish, third generation) serves as executive chairman." }
]);
updDesc('est-e-lauder-companies', 'Founded in 1946 by Estée Lauder (Jewish, born Josephine Esther Mentzer in Queens, NY). Built into a $70+ billion cosmetics empire owning Clinique, MAC, Bobbi Brown, La Mer, Aveda, and Tom Ford Beauty. The Lauder family remains in control: Leonard Lauder (chairman emeritus, $30B+ fortune, major art donor to the Met) and Ronald Lauder (World Jewish Congress president). Three generations of Lauder leadership.');

// ============================================================
// US - HEALTHCARE
// ============================================================
addConn('albert-einstein-college-of-medicine', [
  { name: "Yeshiva University", type: "founding institution", description: "Founded in 1955 as part of Yeshiva University." },
  { name: "Albert Einstein", type: "namesake", description: "Named after Albert Einstein (Jewish), who gave permission to use his name." },
  { name: "Montefiore Medical Center", type: "teaching hospital", description: "Montefiore serves as Einstein's primary teaching hospital in the Bronx." },
  { name: "Bronx, New York", type: "location", description: "Located in the Bronx, serving one of the most diverse communities in the US." }
]);
updDesc('albert-einstein-college-of-medicine', 'Founded in 1955 at Yeshiva University, named after Albert Einstein (Jewish) who consented to the use of his name. One of the leading medical schools in the US, located in the Bronx. Houses 2,000+ scientists and 200+ research labs. Montefiore Health System serves as its teaching hospital. Einstein researchers have made breakthroughs in cancer, genetics, HIV/AIDS, and neuroscience. Now independent from Yeshiva University since 2015.');

addConn('maimonides-medical-center', [
  { name: "Maimonides (Rambam)", type: "namesake", description: "Named after Rabbi Moses ben Maimon (Maimonides), the great 12th-century Jewish philosopher and physician." },
  { name: "Borough Park, Brooklyn", type: "location", description: "Located in Borough Park, serving Brooklyn's large Orthodox Jewish community." },
  { name: "718 beds", type: "size", description: "A 718-bed teaching hospital serving 250,000+ patients annually." },
  { name: "Orthodox Jewish community", type: "patient base", description: "Major provider for Brooklyn's Hasidic and Orthodox communities." }
]);
updDesc('maimonides-medical-center', 'Named after Maimonides (Rabbi Moses ben Maimon, 1138-1204), the medieval Jewish philosopher, scholar, and physician. Located in Borough Park, Brooklyn - the heart of one of the largest Orthodox Jewish communities in America. A 718-bed teaching hospital serving 250,000+ patients annually. Known for cardiac care and serving multicultural Brooklyn communities including Hasidic, Chinese, and Russian populations.');

addConn('montefiore-medical-center', [
  { name: "Sir Moses Montefiore", type: "namesake", description: "Named after Sir Moses Montefiore (1784-1885), the great Jewish philanthropist." },
  { name: "Albert Einstein College of Medicine", type: "academic partner", description: "Montefiore is the teaching hospital for Albert Einstein College of Medicine." },
  { name: "Bronx, New York", type: "location", description: "The largest employer in the Bronx with 10,000+ employees." },
  { name: "Children's Hospital at Montefiore (CHAM)", type: "specialty", description: "CHAM is a leading children's hospital in the US." }
]);
updDesc('montefiore-medical-center', 'Named after Sir Moses Montefiore (1784-1885), one of the most famous Jewish philanthropists in history who lived to 100 and championed Jewish causes worldwide. The medical center is the largest employer in the Bronx with 10,000+ employees. Serves as the teaching hospital for Albert Einstein College of Medicine. Includes the Children\'s Hospital at Montefiore (CHAM) ranked among top US children\'s hospitals.');

addConn('northwell-health-formerly-north-shore-lij', [
  { name: "Michael Dowling", type: "CEO", description: "Michael Dowling leads Northwell, the largest health system in New York State." },
  { name: "Long Island Jewish Medical Center", type: "founding hospital", description: "LIJ Medical Center was founded by the Jewish community of Long Island." },
  { name: "23 hospitals", type: "system size", description: "Northwell operates 23 hospitals with 80,000+ employees, making it NY's largest private employer." },
  { name: "Feinstein Institutes", type: "research", description: "Northwell's Feinstein Institutes for Medical Research is named after Michael Feinstein (Jewish)." }
]);
updDesc('northwell-health-formerly-north-shore-lij', 'New York State\'s largest health system, formed from the merger of North Shore Health System and Long Island Jewish Medical Center. LIJ was founded by the Jewish community of Long Island in 1954. Now operates 23 hospitals with 80,000+ employees - the largest private employer in New York. The Feinstein Institutes for Medical Research is one of the largest research programs in the US.');

addConn('moderna-israeli-connections', [
  { name: "Tal Zaks", type: "former chief medical officer", description: "Tal Zaks (Jewish, Israeli) served as Moderna's CMO, leading COVID-19 vaccine clinical trials." },
  { name: "Israel vaccine partnership", type: "deployment", description: "Israel was among the first countries to use Moderna's COVID-19 vaccine." },
  { name: "mRNA technology", type: "innovation", description: "Moderna pioneered mRNA vaccine technology, which has roots in research with Israeli connections." },
  { name: "Pfizer-BioNTech competition", type: "market", description: "Moderna's vaccine competed with Pfizer-BioNTech's during the pandemic." }
]);
updDesc('moderna-israeli-connections', 'Moderna\'s COVID-19 vaccine was developed under the medical leadership of Tal Zaks (Jewish, Israeli), who served as Chief Medical Officer. Zaks led the clinical trials that brought the mRNA vaccine to market in record time. Israel was among the first countries to deploy Moderna\'s vaccine alongside Pfizer-BioNTech. Moderna\'s mRNA platform has since expanded to vaccines for RSV, flu, and cancer.');

addConn('teva-pharmaceutical-us-operations', [
  { name: "Teva Pharmaceutical Israel", type: "parent company", description: "US arm of Israel's largest company and the world's largest generic drug maker." },
  { name: "Generic drugs", type: "business", description: "Teva is the world's largest manufacturer of generic medications." },
  { name: "Copaxone", type: "key product", description: "Teva's Copaxone (for multiple sclerosis) was its flagship branded drug." },
  { name: "US FDA", type: "regulatory relationship", description: "Teva is one of the largest filers of abbreviated new drug applications with the FDA." }
]);
updDesc('teva-pharmaceutical-us-operations', 'The US operations of Teva Pharmaceutical Industries, Israel\'s largest company and the world\'s largest generic drug manufacturer. Teva supplies approximately 1 in 9 prescriptions filled in the US. Headquartered in Parsippany, NJ. Copaxone (for multiple sclerosis) was its blockbuster branded drug. Teva has faced legal challenges related to opioids but remains a giant in the US pharmaceutical market.');

// ============================================================
// US - LAW FIRMS
// ============================================================
addConn('paul-weiss-rifkind-wharton-garrison', [
  { name: "Brad Karp", type: "chairman", description: "Brad Karp (Jewish) chairs Paul Weiss, one of Wall Street's leading law firms." },
  { name: "Wall Street M&A", type: "practice", description: "Paul Weiss is a top adviser on the largest mergers and acquisitions." },
  { name: "Donald Trump representation", type: "client", description: "Paul Weiss has represented high-profile clients across political spectrum." },
  { name: "Lloyd Blankfein defense", type: "notable matter", description: "Paul Weiss has represented Goldman Sachs and major financial institutions." }
]);
updDesc('paul-weiss-rifkind-wharton-garrison', 'Founded in 1875, Paul Weiss is one of the most prestigious law firms in the world. Named after several Jewish founding partners. Chairman Brad Karp (Jewish) leads the firm. Paul Weiss has been involved in the largest M&A deals in history and represents top corporations, financial institutions, and individuals. Known for a strong pro bono tradition and commitment to diversity.');

addConn('kasowitz-benson-torres', [
  { name: "Marc Kasowitz", type: "founding partner", description: "Marc Kasowitz (Jewish) founded the firm and has served as personal attorney to Donald Trump." },
  { name: "Donald Trump", type: "major client", description: "Kasowitz has been Trump's longtime personal attorney and a key legal adviser." },
  { name: "Litigation practice", type: "specialty", description: "Known as one of the top litigation firms in New York." }
]);
updDesc('kasowitz-benson-torres', 'Founded by Marc Kasowitz (Jewish) in 1993. Kasowitz is best known as a longtime personal attorney to Donald Trump, representing him in major lawsuits and legal matters. The firm is one of New York\'s leading litigation boutiques, handling high-profile commercial disputes, bankruptcy matters, and real estate litigation.');

addConn('schulte-roth-zabel', [
  { name: "Hedge fund clients", type: "practice specialty", description: "Schulte Roth & Zabel is the leading law firm for the hedge fund industry." },
  { name: "Private equity/alternative investments", type: "practice", description: "Advises on formation and regulation of alternative investment funds." },
  { name: "William Zabel", type: "founding partner", description: "William Zabel (Jewish) is a founding partner, leading the firm's estates practice." }
]);
updDesc('schulte-roth-zabel', 'One of the leading law firms for hedge funds and alternative investments, co-founded by William Zabel (Jewish). Schulte Roth is the go-to firm for major hedge fund formations, compliance, and regulatory matters. Represents many of the largest hedge funds in the world. The firm\'s investment management practice is widely regarded as the top in the industry.');

addConn('bridgewater-associates', [
  { name: "Ray Dalio", type: "founder", description: "While Dalio is Italian-American, Bridgewater has many Jewish senior staff and investors." },
  { name: "Largest hedge fund", type: "status", description: "Bridgewater manages $150+ billion, making it the world's largest hedge fund." },
  { name: "Principles", type: "management philosophy", description: "Dalio's book 'Principles' promotes radical transparency and meritocracy." },
  { name: "Jewish philanthropic investors", type: "connection", description: "Major Jewish foundations and endowments are among Bridgewater's investors." }
]);
updDesc('bridgewater-associates', 'The world\'s largest hedge fund, managing $150+ billion in assets. Founded by Ray Dalio in 1975. While Dalio is not Jewish, Bridgewater has significant Jewish connections through senior staff, investors, and clients. Major Jewish endowments, federations, and foundations are among its institutional investors. Bridgewater\'s Pure Alpha fund has been one of the most successful hedge funds in history.');

// ============================================================
// US - SYNAGOGUES
// ============================================================
addConn('temple-emanu-el-new-york', [
  { name: "Fifth Avenue, NYC", type: "location", description: "Located on Fifth Avenue and 65th Street, the largest Reform synagogue in the world." },
  { name: "Founded 1845", type: "history", description: "One of the first Reform congregations in New York City." },
  { name: "Bernard-Henri Lévy", type: "member/speaker", description: "Temple Emanu-El hosts major speakers and cultural events." },
  { name: "2,500 seat sanctuary", type: "size", description: "The main sanctuary seats 2,500, larger than St. Patrick's Cathedral." },
  { name: "Our Crowd families", type: "membership", description: "Historic membership includes the Lehman, Goldman, Schiff, Warburg, and other prominent Jewish families." }
]);
updDesc('temple-emanu-el-new-york', 'Founded in 1845, Temple Emanu-El is the largest Reform synagogue in the world. Its Romanesque-Moorish sanctuary at Fifth Avenue and 65th Street seats 2,500 - larger than St. Patrick\'s Cathedral. Historic membership includes the great German-Jewish families of New York: Lehman, Goldman, Schiff, Warburg, Straus. The synagogue is a New York City landmark and repository of American Jewish history.');

addConn('congregation-shearith-israel-nyc', [
  { name: "Founded 1654", type: "history", description: "The first Jewish congregation in North America, founded by 23 Sephardic Jews from Brazil." },
  { name: "Sephardic tradition", type: "religious practice", description: "Maintains the Spanish and Portuguese Sephardic liturgical tradition." },
  { name: "Revolutionary War", type: "patriotic history", description: "Members fought in the American Revolution; the congregation prayed for George Washington." },
  { name: "Central Park West", type: "location", description: "Current building on Central Park West since 1897." }
]);
updDesc('congregation-shearith-israel-nyc', 'The first Jewish congregation in North America, founded in 1654 by 23 Sephardic Jews who arrived from Brazil. Known as the Spanish and Portuguese Synagogue. Members fought in the American Revolution and prayed for George Washington. Located on Central Park West. The congregation maintains the Sephardic liturgical tradition and has been in continuous operation for over 370 years. A cornerstone of American Jewish history.');

addConn('congregation-beth-elohim-brooklyn', [
  { name: "Founded 1861", type: "history", description: "One of the oldest Reform congregations in Brooklyn." },
  { name: "Park Slope, Brooklyn", type: "location", description: "Located in the historic Park Slope neighborhood." },
  { name: "LGBTQ+ inclusion", type: "progressive values", description: "Known as one of the most progressive congregations in Brooklyn." },
  { name: "Brooklyn Jewish community", type: "community role", description: "A cornerstone of progressive Jewish life in Brooklyn." }
]);
updDesc('congregation-beth-elohim-brooklyn', 'A historic Reform congregation in Park Slope, Brooklyn, founded in 1861. Known for its progressive values, strong social justice commitment, and vibrant community programming. One of the most active and inclusive Reform congregations in New York City. The congregation plays a central role in the diverse Jewish community of Brooklyn.');

addConn('wilshire-boulevard-temple-los-angeles', [
  { name: "Founded 1862", type: "history", description: "The oldest Jewish congregation in Los Angeles, founded during the Civil War." },
  { name: "Hollywood connection", type: "membership", description: "Historic membership includes Hollywood moguls and entertainment industry leaders." },
  { name: "Warner Bros. murals", type: "art", description: "The temple features murals commissioned by the Warner brothers depicting Jewish history." },
  { name: "Koreatown/Westlake", type: "location", description: "Located on Wilshire Boulevard; expanded with an Irwin Jacobs campus." }
]);
updDesc('wilshire-boulevard-temple-los-angeles', 'The oldest Jewish congregation in Los Angeles, founded in 1862 during the Civil War. The "Temple to the Stars" - historic membership included the Warner brothers, Louis B. Mayer, and other Hollywood pioneers. Features stunning murals of Jewish history commissioned by the Warner family. The original 1929 Byzantine-style building is a Los Angeles landmark. Expanded with a new campus in 2022 designed by architect Eero Saarinen\'s firm.');

addConn('touro-synagogue-newport-ri', [
  { name: "Founded 1763", type: "history", description: "The oldest surviving synagogue building in the United States." },
  { name: "George Washington letter", type: "historic document", description: "George Washington wrote his famous 1790 letter to the Touro Synagogue affirming religious freedom." },
  { name: "National Historic Site", type: "designation", description: "Designated a National Historic Site in 1946." },
  { name: "Sephardic tradition", type: "religious practice", description: "Built by Sephardic Jews; designed by architect Peter Harrison." }
]);
updDesc('touro-synagogue-newport-ri', 'Built in 1763, it is the oldest surviving synagogue building in the United States and a National Historic Site. George Washington wrote his famous 1790 letter to the congregation promising that the US government "gives to bigotry no sanction, to persecution no assistance." Built by Sephardic Jews who came from the Caribbean. Named after benefactor Judah Touro. A symbol of American religious freedom.');

addConn('kehilath-jeshurun-nyc', [
  { name: "Upper East Side", type: "location", description: "A major Modern Orthodox synagogue on the Upper East Side of Manhattan." },
  { name: "Ramaz School", type: "affiliated school", description: "KJ operates the prestigious Ramaz School, one of NYC's top Jewish day schools." },
  { name: "Rabbi Haskel Lookstein", type: "longtime rabbi", description: "Rabbi Lookstein led KJ for decades and was a major Modern Orthodox leader." },
  { name: "Modern Orthodoxy", type: "movement", description: "One of the leading Modern Orthodox congregations in America." }
]);
updDesc('kehilath-jeshurun-nyc', 'A leading Modern Orthodox synagogue on Manhattan\'s Upper East Side, founded in 1872. Led for decades by Rabbi Haskel Lookstein, one of the most influential Modern Orthodox rabbis in America. Operates the prestigious Ramaz School (K-12). The congregation is known for its sophisticated, educated membership and its role as a standard-bearer for Modern Orthodox life in New York City.');
addInd('kehilath-jeshurun-nyc', { name: "Haskel Lookstein", bio: "Senior rabbi of Kehilath Jeshurun for decades. Led the Modern Orthodox movement in NYC. Converted Ivanka Trump to Judaism. Principal of the Ramaz School." });

addConn('young-israel-movement', [
  { name: "National Council of Young Israel", type: "umbrella", description: "NCYI represents approximately 135 Young Israel synagogues across North America." },
  { name: "Modern Orthodox", type: "denomination", description: "Young Israel synagogues are pillars of Modern Orthodox communities." },
  { name: "Founded 1912", type: "history", description: "Founded on the Lower East Side in 1912 to attract young Jews to Orthodox observance." },
  { name: "Israel advocacy", type: "position", description: "NCYI is known for strong pro-Israel positions within the Orthodox community." }
]);
updDesc('young-israel-movement', 'Founded in 1912 on the Lower East Side to attract young Jews to Orthodox worship through English sermons and modernized services. The National Council of Young Israel now oversees approximately 135 congregations across North America. Young Israel synagogues are pillars of Modern Orthodox Jewish communities. Known for affordable services, community spirit, and strong right-wing pro-Israel advocacy.');

// ============================================================
// US - SCHOOLS
// ============================================================
addConn('sar-academy-high-school', [
  { name: "Modern Orthodox", type: "denomination", description: "SAR is a leading Modern Orthodox day school in Riverdale, Bronx." },
  { name: "Riverdale, Bronx", type: "location", description: "Located in the affluent Riverdale neighborhood of the Bronx." },
  { name: "Rabbi Tully Harcsztark", type: "principal", description: "Rabbi Harcsztark founded SAR High School with an innovative open Orthodox educational approach." },
  { name: "Yeshiva University pipeline", type: "academic", description: "Many SAR graduates attend Yeshiva University and its gap-year programs." }
]);
updDesc('sar-academy-high-school', 'A leading Modern Orthodox day school in Riverdale, Bronx. SAR High School, founded by Rabbi Tully Harcsztark, is known for its innovative "open Orthodox" approach to Jewish education. SAR Academy serves K-8 students. The school emphasizes critical thinking, intellectual openness, and commitment to halacha (Jewish law). Recognized as one of the best Jewish day schools in America.');

addConn('ramaz-school-nyc', [
  { name: "Kehilath Jeshurun", type: "affiliated synagogue", description: "Ramaz is operated by Congregation Kehilath Jeshurun." },
  { name: "Upper East Side", type: "location", description: "A K-12 Modern Orthodox school on Manhattan's Upper East Side." },
  { name: "Rabbi Joseph Lookstein", type: "founder", description: "Founded by Rabbi Joseph Lookstein in 1937." },
  { name: "Ivy League pipeline", type: "academics", description: "Ramaz sends a high percentage of graduates to Ivy League and top universities." }
]);
updDesc('ramaz-school-nyc', 'Founded in 1937 by Rabbi Joseph Lookstein, Ramaz is a prestigious K-12 Modern Orthodox day school on Manhattan\'s Upper East Side, affiliated with Congregation Kehilath Jeshurun. Known for academic excellence, with graduates regularly attending Ivy League universities. Named after Rabbi Moses Zevulun Margolies (\"Ramaz\"). One of the most socially prominent Jewish day schools in America.');

addConn('heschel-school-nyc', [
  { name: "Abraham Joshua Heschel", type: "namesake", description: "Named after Rabbi Abraham Joshua Heschel, the great Jewish theologian who marched with MLK." },
  { name: "Manhattan", type: "location", description: "A progressive Jewish day school in Manhattan." },
  { name: "Transdenominational approach", type: "education philosophy", description: "Heschel is non-denominational, welcoming families across the Jewish spectrum." },
  { name: "Social justice education", type: "values", description: "Strong emphasis on social justice, reflecting Heschel's legacy of civil rights activism." }
]);
updDesc('heschel-school-nyc', 'Named after Rabbi Abraham Joshua Heschel (1907-1972), the legendary Jewish theologian who marched with Martin Luther King Jr. at Selma. The Abraham Joshua Heschel School is a progressive, transdenominational Jewish day school in Manhattan serving Pre-K through 12th grade. Known for social justice education, arts, and environmental stewardship. One of NYC\'s most sought-after progressive Jewish schools.');

addConn('charles-e-smith-jewish-day-school-dc', [
  { name: "Washington, D.C.", type: "location", description: "The largest Jewish day school in the Washington, D.C. area." },
  { name: "Charles E. Smith", type: "namesake", description: "Named after Charles E. Smith (Jewish), a major real estate developer and philanthropist in the DC area." },
  { name: "Government/policy families", type: "student body", description: "Student body includes children of government officials, diplomats, and policy professionals." },
  { name: "Community Day School to High School", type: "scope", description: "Serves students from lower school through high school." }
]);
updDesc('charles-e-smith-jewish-day-school-dc', 'The largest Jewish day school in the Washington, D.C. area, named after Charles E. Smith (Jewish), a prominent DC real estate developer. Located in Rockville, MD, it serves students from lower school through 12th grade. The student body reflects DC\'s unique community - children of government officials, diplomats, journalists, and policy professionals. Known for strong academics and Jewish studies.');

addConn('milken-community-school-la', [
  { name: "Milken family", type: "founding family", description: "Founded by the Milken family - Lowell Milken (Jewish) is a major education philanthropist." },
  { name: "Bel Air, Los Angeles", type: "location", description: "A K-12 Jewish day school in Bel Air, one of LA's most affluent neighborhoods." },
  { name: "Michael Milken", type: "connection", description: "Michael Milken (Jewish, former 'junk bond king') is a major philanthropist; his brother Lowell founded the school." },
  { name: "Entertainment industry families", type: "student body", description: "Many students come from Hollywood and entertainment industry families." }
]);
updDesc('milken-community-school-la', 'A K-12 Jewish day school in Bel Air, Los Angeles, founded by Lowell Milken (Jewish). The Milken family, including Michael Milken (Jewish, former financier and now major philanthropist), has invested heavily in education. Student body includes children of Hollywood executives, entertainment figures, and LA\'s Jewish elite. Known for strong academics and modern facilities on a beautiful campus.');

addConn('solomon-schechter-day-schools', [
  { name: "Solomon Schechter", type: "namesake", description: "Named after Solomon Schechter (1847-1915), the founder of Conservative Judaism's institutional structure." },
  { name: "USCJ", type: "affiliated movement", description: "Schechter schools are the day school network of the Conservative movement." },
  { name: "60+ schools", type: "network", description: "Approximately 60+ Schechter schools operate across North America." },
  { name: "Conservative Jewish education", type: "mission", description: "Provide rigorous secular and Jewish education within a Conservative framework." }
]);
updDesc('solomon-schechter-day-schools', 'A network of approximately 60+ Jewish day schools across North America affiliated with the Conservative movement. Named after Solomon Schechter (1847-1915), who led JTS and discovered the Cairo Genizah. Schools provide dual curriculum of rigorous secular and Jewish studies. Schechter schools have produced generations of engaged Conservative Jewish leaders. The network is managed by the Schechter Day School Network.');

// ============================================================
// US - CAMPS
// ============================================================
addConn('camp-ramah', [
  { name: "USCJ", type: "parent movement", description: "Camp Ramah is the camping network of the Conservative movement." },
  { name: "9 overnight camps", type: "network", description: "Ramah operates 9 overnight camps across North America plus day camps and Israel programs." },
  { name: "Rabbi pipeline", type: "impact", description: "An estimated 80% of Conservative rabbis are Ramah alumni." },
  { name: "Hebrew immersion", type: "educational approach", description: "Ramah camps emphasize Hebrew language use and intensive Jewish learning." }
]);
updDesc('camp-ramah', 'The camping network of the Conservative movement, operating 9 overnight camps, 4 day camps, and Israel programs. Founded in 1947. An estimated 80% of Conservative rabbis and a majority of Conservative Jewish communal leaders are Ramah alumni. Known for Hebrew immersion, intensive Jewish education, and creating lifelong Jewish connections. Over 10,000 campers attend Ramah each summer.');

addConn('urj-camp-newman-camp-george', [
  { name: "URJ", type: "parent movement", description: "URJ camps are the camping arm of the Reform movement." },
  { name: "15 camps", type: "network", description: "URJ operates 15 residential summer camps across North America." },
  { name: "Reform Jewish identity", type: "mission", description: "URJ camps shape Reform Jewish identity and values for future generations." },
  { name: "Social justice programming", type: "emphasis", description: "Strong emphasis on tikkun olam (repairing the world) and social justice." }
]);
updDesc('urj-camp-newman-camp-george', 'Part of the network of 15 URJ (Reform movement) summer camps across North America. URJ camps serve over 10,000 campers annually and are considered the Reform movement\'s most effective tool for building Jewish identity. Alumni of URJ camps disproportionately become Reform rabbis, cantors, and communal leaders. Camps emphasize music, prayer, social justice, and joyful Jewish living.');

addConn('camp-young-judaea', [
  { name: "Hadassah", type: "sponsor", description: "Camp Young Judaea is sponsored by Hadassah, the Women's Zionist Organization." },
  { name: "Israel connection", type: "focus", description: "Strong emphasis on Israel education and Zionist values." },
  { name: "Young Judaea movement", type: "youth movement", description: "The oldest Zionist youth movement in the US, founded in 1909." },
  { name: "Year Course in Israel", type: "program", description: "Young Judaea's Year Course is a gap-year program in Israel." }
]);
updDesc('camp-young-judaea', 'Sponsored by Hadassah, Camp Young Judaea is part of the Young Judaea movement - the oldest Zionist youth movement in the US, founded in 1909. The camp emphasizes Israel education, Hebrew, and Zionist values. Young Judaea\'s Year Course in Israel is a prestigious gap-year program. The movement has spawned generations of Israel-connected American Jewish leaders.');

// ============================================================
// US - NOTABLE FIGURES ENTRIES
// ============================================================
addConn('notable-jewish-political-figures-us', [
  { name: "US Senate", type: "political body", description: "Multiple Jewish senators serve in the US Senate at any given time - historically 8-10 at peak." },
  { name: "US Supreme Court", type: "judicial body", description: "Jewish justices have included Brandeis, Cardozo, Frankfurter, Goldberg, Fortas, Ginsburg, Breyer, Kagan." },
  { name: "Presidential advisors", type: "executive branch", description: "Jewish Americans have served as top presidential advisors across administrations." },
  { name: "State governors", type: "state politics", description: "Multiple Jewish Americans have served as state governors." },
  { name: "Chuck Schumer", type: "Senate leader", description: "Chuck Schumer (Jewish) is the first Jewish Senate Majority Leader in US history." }
]);
updDesc('notable-jewish-political-figures-us', 'Jewish Americans have been disproportionately represented in US politics. Chuck Schumer (Jewish) became the first Jewish Senate Majority Leader. 8 Jewish justices have served on the Supreme Court (Brandeis, Cardozo, Frankfurter, Goldberg, Fortas, Ginsburg, Breyer, Kagan). Henry Kissinger and countless others have served in cabinet positions. Jews constitute ~2% of the US population but have held ~10% of Senate seats.');

addConn('notable-jewish-entertainers-us', [
  { name: "Hollywood", type: "industry", description: "Jewish Americans founded every major Hollywood studio and continue to lead the entertainment industry." },
  { name: "Broadway", type: "theater", description: "Jewish composers, writers, and producers shaped American musical theater." },
  { name: "Comedy", type: "art form", description: "Jewish comedians - from the Borscht Belt to modern TV - defined American comedy." },
  { name: "Music industry", type: "business", description: "Jewish executives and artists have been central to the American music industry." },
  { name: "Television", type: "medium", description: "Jewish creators have produced many of the most successful TV shows in history." }
]);
updDesc('notable-jewish-entertainers-us', 'Jewish Americans have shaped American entertainment from its earliest days. Every major Hollywood studio was founded by Jewish immigrants (Warner, Paramount\'s Zukor, Universal\'s Laemmle, Fox\'s William Fox, MGM\'s Mayer). Broadway was defined by Jewish composers (Gershwin, Rodgers, Hammerstein, Sondheim, Berlin). American comedy was built by Jewish comedians (Marx Brothers, Mel Brooks, Jerry Seinfeld, Larry David). Television\'s golden age was created by Jewish writers and producers.');

addConn('notable-jewish-scientists-intellectuals-us', [
  { name: "Nobel Prize winners", type: "achievement", description: "Jewish Americans have won approximately 35% of US Nobel Prizes despite being 2% of the population." },
  { name: "Albert Einstein", type: "iconic figure", description: "Albert Einstein (Jewish), the most famous scientist in history, became a US citizen in 1940." },
  { name: "Manhattan Project", type: "historic contribution", description: "Jewish scientists (Oppenheimer, Teller, Szilard, Feynman) played central roles in the Manhattan Project." },
  { name: "Silicon Valley", type: "tech innovation", description: "Jewish Americans have co-founded many major tech companies." },
  { name: "Medical research", type: "field", description: "Jewish Americans have made outsized contributions to medical breakthroughs." }
]);
updDesc('notable-jewish-scientists-intellectuals-us', 'Jewish Americans, ~2% of the US population, have won ~35% of US Nobel Prizes. Albert Einstein became a US citizen in 1940. J. Robert Oppenheimer (Jewish) led the Manhattan Project. Richard Feynman, Murray Gell-Mann, Steven Weinberg contributed to physics. Jonas Salk and Albert Sabin (both Jewish) developed polio vaccines. Jewish intellectuals include Noam Chomsky, Hannah Arendt, and countless others across all academic fields.');

// ============================================================
// US - REMAINING MUSIC, PUBLISHING, RETAIL
// ============================================================
addConn('geffen-records', [
  { name: "David Geffen", type: "founder", description: "David Geffen (Jewish) founded Geffen Records in 1980; also co-founded DreamWorks." },
  { name: "Nirvana", type: "artist", description: "Geffen Records signed Nirvana, releasing 'Nevermind' which transformed rock music." },
  { name: "Guns N' Roses", type: "artist", description: "Released Guns N' Roses' debut 'Appetite for Destruction.'" },
  { name: "Universal Music Group", type: "parent", description: "Geffen Records is now part of Universal Music Group." }
]);
updDesc('geffen-records', 'Founded in 1980 by David Geffen (Jewish), one of the most powerful figures in entertainment history. Geffen Records signed Nirvana (releasing Nevermind), Guns N\' Roses, Cher, and many iconic artists. Geffen also co-founded Asylum Records, DreamWorks SKG, and built a $10+ billion fortune. He is one of the most prominent gay Jewish billionaires in America. Geffen Records is now part of Universal Music Group.');

addConn('elektra-records', [
  { name: "Jac Holzman", type: "founder", description: "Jac Holzman (Jewish) founded Elektra Records in 1950 in his college dorm." },
  { name: "The Doors", type: "artist", description: "Elektra signed The Doors, one of the most influential rock bands ever." },
  { name: "Warner Music Group", type: "parent", description: "Elektra is now part of Warner Music Group." },
  { name: "Jim Morrison", type: "discovery", description: "Holzman personally discovered and signed Jim Morrison and The Doors." }
]);
updDesc('elektra-records', 'Founded in 1950 by Jac Holzman (Jewish) in his college dormitory at St. John\'s College. Holzman discovered and signed The Doors, transforming both the label and rock music. Elektra also launched careers of Judy Collins, Queen, and metalcore pioneers. Now part of Warner Music Group. Holzman was inducted into the Rock and Roll Hall of Fame as a non-performer.');

addConn('a-m-records-historic', [
  { name: "Jerry Moss", type: "co-founder", description: "Jerry Moss (Jewish) co-founded A&M Records with Herb Alpert in 1962." },
  { name: "Herb Alpert", type: "co-founder", description: "Herb Alpert (Jewish) co-founded A&M; became a bestselling trumpet player." },
  { name: "The Police", type: "artist", description: "A&M signed The Police, Sting, Peter Frampton, and Janet Jackson." },
  { name: "Sold to PolyGram", type: "sale", description: "A&M was sold to PolyGram for $500 million in 1989." }
]);
updDesc('a-m-records-historic', 'Co-founded in 1962 by Herb Alpert (Jewish) and Jerry Moss (Jewish) in Alpert\'s garage. A&M became one of the most successful independent labels in history, signing The Police, Janet Jackson, Peter Frampton, Cat Stevens, and The Carpenters. Sold to PolyGram for $500 million in 1989. Alpert became the best-selling instrumentalist of the 20th century. Both founders donated $30M+ to UCLA\'s Herb Alpert School of Music.');

addConn('universal-music-group-us-operations', [
  { name: "Lucian Grainge", type: "CEO", description: "Sir Lucian Grainge (Jewish, British) has served as CEO of Universal Music Group since 2011." },
  { name: "Vivendi", type: "parent company", description: "UMG is majority owned by Vivendi; went public in 2021." },
  { name: "Largest music company", type: "status", description: "UMG is the world's largest music company, controlling ~30% of the global market." },
  { name: "Labels include", type: "subsidiaries", description: "UMG owns Interscope, Def Jam, Republic, Capitol, Island, and many more." }
]);
updDesc('universal-music-group-us-operations', 'The US arm of Universal Music Group, the world\'s largest music company (~30% global market share). CEO Sir Lucian Grainge (Jewish, British) has led UMG since 2011. UMG owns Interscope, Def Jam, Republic, Capitol, Island, Motown, Geffen, and dozens of other labels. Artists include Taylor Swift, Drake, Billie Eilish, and The Weeknd. UMG went public in 2021 at a $40+ billion valuation.');

addConn('sony-music-legacy', [
  { name: "Clive Davis", type: "legendary executive", description: "Clive Davis (Jewish) ran Columbia Records and Arista Records, discovering Whitney Houston, Alicia Keys." },
  { name: "Tommy Mottola", type: "former CEO", description: "Tommy Mottola led Sony Music, married to Mariah Carey." },
  { name: "Doug Morris", type: "former CEO", description: "Doug Morris (Jewish) served as CEO of Sony Music Entertainment." },
  { name: "Columbia Records", type: "legacy label", description: "Columbia Records is one of the oldest and most storied labels in music." }
]);
updDesc('sony-music-legacy', 'Sony Music\'s Jewish legacy includes Clive Davis (Jewish), who discovered Whitney Houston, Alicia Keys, and Barry Manilow while running Columbia Records and Arista Records. Doug Morris (Jewish) served as Sony Music CEO. The company owns Columbia, RCA, and Epic Records. Jewish executives have been central to the music industry since its inception, from the early days of Tin Pan Alley.');

addConn('random-house-penguin-random-house', [
  { name: "Bennett Cerf", type: "co-founder", description: "Bennett Cerf (Jewish) co-founded Random House in 1927." },
  { name: "Donald Klopfer", type: "co-founder", description: "Donald Klopfer (Jewish) co-founded Random House with Cerf." },
  { name: "Alfred A. Knopf", type: "acquired imprint", description: "Knopf (imprint) was founded by Alfred A. Knopf Sr.; his wife Blanche Knopf (Jewish) was co-founder and editor." },
  { name: "Penguin Random House", type: "current entity", description: "Now part of Penguin Random House (Bertelsmann), the world's largest book publisher." }
]);
updDesc('random-house-penguin-random-house', 'Co-founded in 1927 by Bennett Cerf (Jewish) and Donald Klopfer (Jewish). Cerf was a beloved cultural figure who appeared on TV\'s "What\'s My Line?" Random House grew to acquire Alfred A. Knopf (co-founded by Blanche Knopf, Jewish), and many other imprints. Now part of Penguin Random House (Bertelsmann), the world\'s largest trade book publisher. Jewish founders shaped American literary culture.');

addConn('scholastic-corporation', [
  { name: "M. Richard Robinson", type: "former CEO", description: "M. Richard Robinson Jr. (Jewish) led Scholastic for decades as CEO and chairman." },
  { name: "Harry Potter (US)", type: "publishing phenomenon", description: "Scholastic published the US editions of Harry Potter, selling 180+ million copies." },
  { name: "School book fairs", type: "cultural institution", description: "Scholastic Book Fairs are a American childhood institution, reaching millions of students." },
  { name: "The Hunger Games", type: "bestseller", description: "Published The Hunger Games series by Suzanne Collins." }
]);
updDesc('scholastic-corporation', 'Led for decades by M. Richard Robinson Jr. (Jewish). Scholastic is the world\'s largest publisher and distributor of children\'s books. Published the US editions of Harry Potter (180+ million copies sold in the US). Scholastic Book Fairs reach 35 million students annually - an American childhood institution. Also published The Hunger Games, Captain Underpants, and Clifford the Big Red Dog. Robinson personally brought Harry Potter to America.');

addConn('bed-bath-beyond-historic', [
  { name: "Warren Eisenberg", type: "co-founder", description: "Warren Eisenberg (Jewish) co-founded Bed Bath & Beyond in 1971." },
  { name: "Leonard Feinstein", type: "co-founder", description: "Leonard Feinstein (Jewish) co-founded the retailer with Eisenberg." },
  { name: "Ryan Cohen", type: "meme stock connection", description: "Ryan Cohen's (Jewish) investment made BB&B a meme stock sensation in 2022." },
  { name: "Bankruptcy 2023", type: "closure", description: "Bed Bath & Beyond filed for bankruptcy in 2023 after the meme stock frenzy." }
]);
updDesc('bed-bath-beyond-historic', 'Co-founded in 1971 by Warren Eisenberg (Jewish) and Leonard Feinstein (Jewish) as Bed \'n Bath. Grew to 1,500+ stores and became a cultural icon - its \"Big Blue\" 20%-off coupons were ubiquitous. Became a meme stock in 2022 when Ryan Cohen (Jewish, GameStop chairman) invested. Filed for bankruptcy in 2023. At its peak, the company was valued at $17 billion.');

addConn('staples', [
  { name: "Thomas Stemberg", type: "co-founder", description: "Thomas Stemberg (Jewish) co-founded Staples in 1986, inventing the office superstore concept." },
  { name: "Bain Capital", type: "early investor", description: "Mitt Romney's Bain Capital was an early investor in Staples." },
  { name: "Office superstore concept", type: "innovation", description: "Stemberg invented the office products superstore concept." }
]);
updDesc('staples', 'Co-founded in 1986 by Thomas Stemberg (Jewish) who invented the office products superstore concept. Bain Capital (Mitt Romney) was an early investor. Staples grew to 2,000+ stores worldwide and became the largest office products company. Stemberg was a Harvard MBA who saw a gap in the market when he couldn\'t find a ribbon for his printer on a weekend. Now owned by Sycamore Partners.');

addConn('toys-r-us-historic', [
  { name: "Charles Lazarus", type: "founder", description: "Charles Lazarus (Jewish) founded Toys 'R' Us in 1957, revolutionizing toy retail." },
  { name: "Geoffrey the Giraffe", type: "mascot", description: "Geoffrey the Giraffe became one of the most beloved retail mascots in history." },
  { name: "Bankruptcy 2017", type: "closure", description: "Toys 'R' Us filed for bankruptcy in 2017, closing most stores." },
  { name: "Leveraged buyout", type: "financial event", description: "A $6.6 billion LBO by KKR, Bain Capital, and Vornado in 2005 loaded the company with debt." }
]);
updDesc('toys-r-us-historic', 'Founded in 1957 by Charles Lazarus (Jewish), who created the toy superstore concept. At its peak, Toys \'R\' Us operated 1,600+ stores worldwide and was every American child\'s wonderland. A $6.6 billion leveraged buyout in 2005 by KKR (Henry Kravis, Jewish), Bain Capital, and Vornado loaded it with fatal debt. Filed for bankruptcy in 2017. Lazarus died in 2018, the same week the stores began closing.');

addConn('macy-s-federated-department-stores', [
  { name: "Isidor Straus", type: "historic owner", description: "Isidor Straus (Jewish) acquired Macy's with his brother Nathan; died on the Titanic in 1912." },
  { name: "Nathan Straus", type: "historic owner/philanthropist", description: "Nathan Straus (Jewish) co-owned Macy's and was one of America's greatest philanthropists." },
  { name: "Macy's Thanksgiving Parade", type: "cultural institution", description: "The Macy's Thanksgiving Day Parade has been an American tradition since 1924." },
  { name: "Herald Square flagship", type: "landmark", description: "The Herald Square store is one of the largest department stores in the world." }
]);
updDesc('macy-s-federated-department-stores', 'The Straus family (Jewish) acquired Macy\'s in the late 1800s. Isidor Straus and his wife Ida famously died together on the Titanic in 1912, refusing to separate. His brother Nathan Straus donated his fortune to public health, saving thousands of children through pasteurized milk programs. The Macy\'s Thanksgiving Day Parade (since 1924) is an American institution. Herald Square flagship is one of the world\'s largest stores.');

addConn('bloomingdale-s', [
  { name: "Joseph and Lyman Bloomingdale", type: "founders", description: "The Bloomingdale brothers (Jewish) founded the store in 1861." },
  { name: "Macy's Inc.", type: "parent company", description: "Bloomingdale's is owned by Macy's, Inc." },
  { name: "59th Street flagship", type: "landmark", description: "The 59th Street and Lexington Avenue store is a NYC landmark." },
  { name: "Fashion destination", type: "identity", description: "Known as a high-end fashion destination - 'like no other store in the world.'" }
]);
updDesc('bloomingdale-s', 'Founded in 1861 by Joseph and Lyman Bloomingdale (Jewish). The 59th Street and Lexington Avenue flagship store is a NYC landmark. Known as a fashion-forward department store - its slogan \"Like no other store in the world\" defined aspirational retail. Now owned by Macy\'s, Inc. The Bloomingdale family were prominent Jewish philanthropists in New York.');

addConn('lionsgate-films', [
  { name: "Jon Feltheimer", type: "CEO", description: "Jon Feltheimer (Jewish) has served as CEO of Lionsgate since 2000." },
  { name: "Hunger Games franchise", type: "property", description: "Lionsgate produced the $3 billion Hunger Games film franchise." },
  { name: "John Wick franchise", type: "property", description: "The John Wick franchise has grossed over $1 billion for Lionsgate." },
  { name: "Twilight franchise", type: "property", description: "Lionsgate/Summit acquired the Twilight saga." },
  { name: "Avi Arad", type: "board connection", description: "Various Jewish executives have been involved in Lionsgate's leadership." }
]);
updDesc('lionsgate-films', 'CEO Jon Feltheimer (Jewish) has led Lionsgate since 2000, building it into a major Hollywood studio. Produced the Hunger Games franchise ($3B+ worldwide), John Wick ($1B+), Twilight, and the Saw franchise. Lionsgate is one of the most commercially successful independent studios in Hollywood. Also operates the Starz premium cable network.');

// ============================================================
// US - TECH continued
// ============================================================
addConn('microsoft-israel-r-d', [
  { name: "Microsoft Corporation", type: "parent company", description: "Microsoft Israel is one of the company's largest R&D centers outside the US." },
  { name: "Bill Gates/Satya Nadella", type: "leadership", description: "Microsoft's investment in Israel was championed by multiple CEOs." },
  { name: "Israeli acquisitions", type: "deals", description: "Microsoft has acquired numerous Israeli companies for billions of dollars." },
  { name: "Azure cloud", type: "product development", description: "Key Azure cloud technologies were developed in Israel." }
]);
updDesc('microsoft-israel-r-d', 'Microsoft\'s Israel R&D center, established in 1991, was the company\'s first outside the US. Now employs 2,000+ engineers. Microsoft has acquired numerous Israeli startups including Aorato, Adallom, Secure Islands, and CyberX. Key Azure cloud security and AI technologies were developed in Israel. The campus in Herzliya is one of Microsoft\'s most innovative R&D hubs globally.');

addConn('apple-israel-r-d', [
  { name: "Apple Inc.", type: "parent company", description: "Apple's Israel operations are a critical R&D hub." },
  { name: "Anobit acquisition", type: "deal", description: "Apple acquired Israeli flash storage company Anobit for $400M in 2012 - its first Israeli acquisition." },
  { name: "PrimeSense acquisition", type: "deal", description: "Acquired Israeli 3D sensing company PrimeSense (used in Kinect) for $360M in 2013." },
  { name: "Herzliya/Haifa operations", type: "locations", description: "Apple has R&D centers in Herzliya and Haifa with 1,000+ employees." }
]);
updDesc('apple-israel-r-d', 'Apple\'s Israeli operations are among its most critical R&D centers. Apple acquired Anobit ($400M, 2012) for flash storage technology used in iPhones, and PrimeSense ($360M, 2013) whose 3D sensing technology powers Face ID. Also acquired LinX ($20M, camera), RealFace (facial recognition), and others. Apple Israel employs 1,000+ engineers in Herzliya and Haifa working on chip design and camera technology.');

addConn('amazon-israel-r-d', [
  { name: "Amazon Inc.", type: "parent company", description: "Amazon's Israel operations focus on cloud, AI, and security." },
  { name: "AWS Israel", type: "cloud services", description: "AWS has a significant engineering presence in Israel." },
  { name: "Annapurna Labs acquisition", type: "deal", description: "Amazon acquired Israeli chip company Annapurna Labs for $370M in 2015." },
  { name: "3,000+ employees", type: "workforce", description: "Amazon employs over 3,000 people in Israel." }
]);
updDesc('amazon-israel-r-d', 'Amazon employs 3,000+ people in Israel across R&D, cloud (AWS), and AI. Acquired Israeli chip company Annapurna Labs for $370M in 2015 - which now designs custom processors powering AWS. Also acquired Wickr (secure communications, Israeli-founded). Amazon\'s Israeli centers work on Alexa AI, AWS infrastructure, and security. Israel is one of Amazon\'s most important R&D locations globally.');

addConn('oracle-israel-operations', [
  { name: "Oracle Corporation", type: "parent company", description: "Oracle Israel is a major R&D center employing thousands." },
  { name: "Safra Catz", type: "CEO connection", description: "Oracle CEO Safra Catz (Jewish, Israeli-born) maintains strong Israel ties." },
  { name: "Ravello Systems", type: "acquisition", description: "Oracle acquired Israeli cloud company Ravello for $500M in 2016." },
  { name: "NetSuite Israel", type: "operations", description: "Oracle's NetSuite division has significant Israel engineering." }
]);
updDesc('oracle-israel-operations', 'Oracle\'s Israeli operations employ thousands of engineers across multiple sites. Oracle CEO Safra Catz (Jewish, Israeli-born) has strengthened the company\'s Israel presence. Oracle acquired Israeli companies including Ravello Systems ($500M), Dyn, and others. Israel is a key Oracle innovation hub for cloud, security, and database technologies. Larry Ellison (Jewish), Oracle co-founder, has personal ties to Israel.');

addConn('wix-com-us-operations', [
  { name: "Wix.com Israel", type: "parent company", description: "Wix is an Israeli website-building platform founded in 2006." },
  { name: "Avishai Abrahami", type: "co-founder", description: "Avishai Abrahami (Jewish, Israeli) co-founded Wix." },
  { name: "200+ million users", type: "scale", description: "Wix serves 200+ million users worldwide." },
  { name: "NASDAQ listed", type: "financial", description: "Wix is listed on NASDAQ with a $7+ billion market cap." }
]);
updDesc('wix-com-us-operations', 'Wix.com, founded in Israel in 2006 by Avishai Abrahami (Jewish, Israeli) and co-founders, is a leading website-building platform serving 200+ million users worldwide. The US operations in Miami handle North American business. Listed on NASDAQ with a $7+ billion market cap. Wix democratized website creation, allowing anyone to build professional sites without coding. One of Israel\'s most successful tech companies.');

addConn('palo-alto-networks', [
  { name: "Nir Zuk", type: "founder", description: "Nir Zuk (Jewish, Israeli) founded Palo Alto Networks in 2005." },
  { name: "Israel cybersecurity ecosystem", type: "origin", description: "Zuk was previously at Check Point and NetScreen; part of Israel's cybersecurity revolution." },
  { name: "Next-generation firewall", type: "innovation", description: "Palo Alto pioneered the next-generation firewall concept." },
  { name: "$80B+ market cap", type: "valuation", description: "Palo Alto Networks has grown to an $80+ billion cybersecurity company." }
]);
updDesc('palo-alto-networks', 'Founded in 2005 by Nir Zuk (Jewish, Israeli), who previously co-developed Check Point\'s stateful inspection firewall and was CTO of NetScreen. Palo Alto Networks pioneered the next-generation firewall and has grown into an $80+ billion cybersecurity giant. The company has made numerous Israeli acquisitions (Demisto, Bridgecrew, Cider Security). Zuk is one of the most influential figures in cybersecurity.');

addConn('crowdstrike', [
  { name: "George Kurtz", type: "co-founder/CEO", description: "George Kurtz co-founded CrowdStrike in 2011." },
  { name: "Dmitri Alperovitch", type: "co-founder", description: "Dmitri Alperovitch (Jewish, born in Russia) co-founded CrowdStrike and uncovered Russian hacking." },
  { name: "Russian hacking investigations", type: "notable work", description: "CrowdStrike investigated the Russian hack of the DNC in 2016." },
  { name: "Microsoft outage 2024", type: "event", description: "A CrowdStrike update caused a massive global IT outage in July 2024." }
]);
updDesc('crowdstrike', 'Co-founded in 2011 by Dmitri Alperovitch (Jewish, born in Moscow) and George Kurtz. CrowdStrike gained fame for investigating the Russian hack of the Democratic National Committee in 2016. Alperovitch, a leading cybersecurity expert, was born in Russia and immigrated to the US. CrowdStrike has grown to a $70+ billion cybersecurity company. In July 2024, a CrowdStrike update caused one of the largest IT outages in history.');

addConn('akamai-technologies', [
  { name: "Tom Leighton", type: "co-founder/CEO", description: "Tom Leighton co-founded Akamai at MIT." },
  { name: "Daniel Lewin", type: "co-founder", description: "Daniel Lewin (Jewish, Israeli-American, MIT) co-founded Akamai; he was killed on 9/11 aboard Flight 11, likely the first victim." },
  { name: "Content delivery network", type: "business", description: "Akamai pioneered the CDN industry, delivering 30% of all web traffic." },
  { name: "9/11 connection", type: "historic", description: "Co-founder Daniel Lewin was aboard American Airlines Flight 11, the first plane to hit the WTC." }
]);
updDesc('akamai-technologies', 'Co-founded by Daniel Lewin (Jewish, Israeli-American) and Tom Leighton at MIT. Lewin, a former IDF Sayeret Matkal member, was aboard American Airlines Flight 11 on September 11, 2001 - likely the first victim of the attacks. Akamai pioneered the content delivery network (CDN) industry and delivers approximately 30% of all global web traffic. A $15+ billion company serving the world\'s largest websites.');

addConn('dell-technologies-israel-operations', [
  { name: "Dell Technologies", type: "parent company", description: "Dell Israel is one of the company's major R&D centers." },
  { name: "Michael Dell", type: "founder/CEO", description: "Michael Dell (Jewish) founded Dell in his dorm room in 1984." },
  { name: "EMC Israel", type: "operations", description: "Dell's acquisition of EMC ($67B) brought significant Israeli R&D operations." },
  { name: "Israeli acquisitions", type: "deals", description: "Dell/EMC acquired multiple Israeli companies." }
]);
updDesc('dell-technologies-israel-operations', 'Dell Technologies\' Israel operations employ thousands of engineers. Dell\'s founder Michael Dell (Jewish) started the company in his University of Texas dorm room in 1984. Dell\'s $67 billion acquisition of EMC brought significant Israeli R&D. Dell Israel focuses on storage, cloud, and cybersecurity. Michael Dell is worth $70+ billion and is a major philanthropist through the Michael & Susan Dell Foundation.');

addConn('fiverr-us-operations', [
  { name: "Fiverr International", type: "parent company", description: "The US operations of Israeli freelance marketplace Fiverr." },
  { name: "Micha Kaufman", type: "co-founder/CEO", description: "Micha Kaufman (Jewish, Israeli) co-founded Fiverr in 2010." },
  { name: "Gig economy", type: "market", description: "Fiverr revolutionized the freelance gig economy with $5 starting prices." }
]);
updDesc('fiverr-us-operations', 'US arm of Fiverr International, the Israeli online freelance marketplace co-founded by Micha Kaufman (Jewish, Israeli) in 2010. The platform connects freelancers with businesses, starting at $5 per gig. Listed on NYSE in 2019. Fiverr has served millions of buyers and sellers, becoming one of the leading platforms in the gig economy. US operations are based in New York.');

// ============================================================
// SAVE
// ============================================================
fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0,pc=0;for(const c in data.countries)for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;pc+=(e.connections||[]).length;}
console.log(`addConnections7.js done! ${tc} entries, ${wc} with connections, ${pc} total connections, ${Object.keys(people.people).length} people.`);
