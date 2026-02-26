#!/usr/bin/env node
/**
 * expandData37.js - Final pass: expand all 69 remaining sparse bios
 */

const fs = require('fs');
const path = require('path');

const PEOPLE_PATH = path.join(__dirname, '..', 'data', 'people.json');
const pd = JSON.parse(fs.readFileSync(PEOPLE_PATH, 'utf8'));

function fixDashes(s) { return typeof s === 'string' ? s.replace(/[\u2013\u2014]/g, '-') : s; }

const bios = {
  'amir-yaron': 'Israeli economist. Born 1971. Governor of the Bank of Israel since 2018. Previously professor of finance at the Wharton School at the University of Pennsylvania. PhD from the University of Chicago. Research focuses on asset pricing and macro-finance.',
  'scott-rechler': 'American real estate executive. Chairman and CEO of RXR Realty, a major New York real estate firm with over $20 billion in assets. Jewish. Former board member of the Federal Reserve Bank of New York. Former vice chairman of the Port Authority of New York and New Jersey.',
  'chase-coleman': 'American billionaire hedge fund manager. Born 1975? (exact date not public). Founder and CEO of Tiger Global Management, one of the most successful technology-focused hedge funds. Early investor in Facebook, LinkedIn, and dozens of successful tech companies. Net worth exceeds $8 billion.',
  'yuval-tal': 'Israeli fintech entrepreneur. Co-founded Payoneer, a financial services company providing cross-border payments for freelancers and businesses in over 200 countries. Also co-founded Borderfree (acquired by Pitney Bowes). Serial entrepreneur in Israeli tech sector.',
  'yaron-galai': 'Israeli tech entrepreneur. Co-founded Outbrain, a leading content recommendation platform used by major publishers worldwide. Previously co-founded Quigo (acquired by AOL). Born in Israel. Pioneer in content discovery and native advertising technology.',
  'gidi-mark': 'Israeli-American nonprofit executive. CEO of Taglit-Birthright Israel, the program that has sent over 800,000 young Jewish adults from 68 countries on free 10-day trips to Israel since 1999. The program is one of the most significant Jewish identity-building initiatives in modern history.',
  'david-solomon': 'American banker. Born 1962 in Hartsdale, New York, to a Jewish family. CEO of Goldman Sachs since 2018. Also known as DJ D-Sol, performing electronic dance music. Oversees one of the world\'s most powerful investment banks. Under his leadership, Goldman settled Epstein-related claims.',
  'howard-lutnick': 'American businessman. Born 1961 in Jericho, New York, to a Jewish family. Chairman and CEO of Cantor Fitzgerald. Lost 658 employees (including his brother) in the 9/11 attacks. Rebuilt the firm and committed to paying families of victims. U.S. Secretary of Commerce (2025-present).',
  'dave-waiser': 'Russian-Israeli entrepreneur. Founder and CEO of Gett, a technology platform for corporate ground transportation and taxi services operating in Israel, the UK, and Russia. Built Gett into one of the largest ride-hailing companies outside the U.S.',
  'shalev-hulio': 'Israeli entrepreneur. Co-founder and former CEO of NSO Group, the controversial Israeli cybersecurity company that developed Pegasus, the world\'s most notorious spyware. Pegasus has been used by governments worldwide to surveil journalists, activists, and political opponents.',
  'james-tisch': 'American billionaire businessman. Born 1953 to the prominent Tisch Jewish family. CEO of Loews Corporation. Son of Laurence Tisch. The Tisch family are major philanthropists and leaders in New York Jewish communal life, supporting NYU and other institutions.',
  'chaim-katzman': 'Israeli billionaire real estate mogul. Born 1950. Founder and chairman of Gazit-Globe, one of Israel\'s largest real estate companies with global operations. Pioneered Israeli investment in international commercial real estate markets across Europe, Brazil, and North America.',
  'guy-sella': 'Israeli electrical engineer and co-founder of SolarEdge Technologies, a global leader in smart energy solutions. SolarEdge\'s DC optimized inverters revolutionized the solar power industry. The company is traded on NASDAQ with billions in market cap.',
  'dan-daviau': 'Canadian financial executive. CEO of Canaccord Genuity Group, one of the largest independent investment banks in Canada. Jewish. Oversees wealth management and capital markets operations across North America, the UK, and Australia.',
  'francis-nappez': 'French tech entrepreneur. Co-founder and CTO of BlaBlaCar, Europe\'s largest long-distance carpooling platform with over 100 million members in 22 countries. Built the technology platform that made trusted ridesharing possible at scale.',
  'kevin-sumption': 'Australian museum executive. CEO and Director of the Sydney Jewish Museum, which combines Holocaust education with documenting the history of the Australian Jewish community. Museum features survivor testimonies and interactive exhibitions.',
  'nicolas-brusson': 'French tech entrepreneur. Co-founder and CEO of BlaBlaCar, the world\'s leading long-distance carpooling platform. Grew BlaBlaCar from a French startup to a global company operating in 22 countries with over 100 million members.',
  'lillian-pinkus': 'American Jewish communal leader. First female president of AIPAC (American Israel Public Affairs Committee), serving from 2016. Lawyer by profession. Her presidency marked a milestone for the most influential pro-Israel lobbying organization in the United States.',
  'ronald-liebowitz': 'American academic administrator. President of Brandeis University, the only nonsectarian Jewish-sponsored university in the country, since 2016. Previously president of Middlebury College (2004-2015). Political geographer specializing in the former Soviet Union.',
  'ariel-porat': 'Israeli legal scholar. President of Tel Aviv University, Israel\'s largest university with 30,000 students. Professor of law specializing in tort law, contract law, and law and economics. Leading TAU through its expansion and global partnerships.',
  'arie-zaban': 'Israeli scientist. President of Bar-Ilan University. Physicist specializing in surface science and nanotechnology. Leads Israel\'s second-largest academic institution with a distinctive combination of research excellence and Jewish values.',
  'michael-schudrich': 'American-born rabbi. Chief Rabbi of Poland since 2004. Born 1955 in New York. Spent decades helping to revive Jewish life in Poland after the devastation of the Holocaust. Has overseen the reemergence of vibrant Jewish communities in Warsaw, Krakow, and other Polish cities.',
  'larry-dolan': 'American billionaire businessman. Owner of the Cleveland Guardians (MLB) since 2000. Born to a Jewish family in Cleveland. Attorney and businessman. Brother of Cablevision founder Charles Dolan. Paid $323M for the team, now worth over $1 billion.',
  'jack-warner': 'Canadian-American film executive (1892-1978). Born Jack Leonard Warner in London, Ontario, to Jewish parents from Krasnosielc, Poland. Co-founded Warner Bros. Pictures with his brothers. Led the studio for four decades. Pioneer of "talkies" (The Jazz Singer, 1927).',
  'harry-warner': 'Polish-American film executive (1881-1958). Born Hirsz Wonsal in Krasnosielc, Poland, to a Jewish family. Eldest of the Warner brothers. Co-founded Warner Bros. Business-minded brother who managed the studio\'s finances while Jack ran production.',
  'eran-zinman': 'Israeli tech entrepreneur. Co-founder and CTO of Monday.com, the work operating system platform. Built the technical architecture powering a platform used by 186,000+ organizations. Monday.com IPO\'d on NASDAQ in 2021 at over $7.5B valuation.',
  'travis-kalanick': 'American tech entrepreneur. Born 1976 in Los Angeles. Co-founder and former CEO of Uber Technologies. Grew Uber into a $70B+ company before being forced out in 2017 amid workplace culture scandals. College dropout who previously founded Red Swoosh (acquired by Akamai).',
  'daniel-ramot': 'Israeli-American entrepreneur. Co-founder and CEO of Via, a transportation technology company that partners with public transit agencies to power on-demand mobility networks. Via\'s technology is used in over 600 communities across 35 countries.',
  'tomer-weingarten': 'Israeli cybersecurity entrepreneur. Co-founder and CEO of SentinelOne, an AI-powered cybersecurity platform that IPO\'d on the NYSE in 2021 at a valuation of nearly $9 billion. Previously served in Israeli intelligence (Unit 8200). Pioneer of autonomous endpoint protection.',
  'jac-holzman': 'American record executive. Born 1931 in New York City to a Jewish family. Founder of Elektra Records in 1950, signing acts like The Doors, Love, and Judy Collins. Pioneer of the folk and rock music scenes. Also founded Nonesuch Records. Rock and Roll Hall of Fame inductee.',
  'david-dahan': 'Israeli AI chip engineer. Co-founded Habana Labs, an Israeli AI processor company acquired by Intel for $2 billion in 2019. Developed the Gaudi AI training processor and Goya AI inference processor. Major figure in Israel\'s deep tech semiconductor industry.',
  'avi-nir': 'Israeli media executive. CEO of Keshet Media Group, the parent company of Keshet Broadcasting (Channel 12), Israel\'s most-watched commercial TV network. Keshet International exports Israeli TV formats globally, including the hit show "Rising Star."',
  'harvey-glasser': 'American sports executive. Longtime president of Maccabi USA, the organization that sends U.S. athletes to compete in the Maccabiah Games in Israel - the third-largest international sporting event in the world. Advocate for Jewish sports participation.',
  'rabbi-moshe-hauer': 'American rabbi. Executive Vice President of the Orthodox Union (OU), the largest Orthodox Jewish umbrella organization in North America. Formerly rabbi of Bnai Jacob Shaarei Zion in Baltimore. Leads the OU\'s public policy, community, and religious affairs.',
  'rabbi-yehoshua-fass': 'American-Israeli rabbi and social entrepreneur. Co-founded Nefesh B\'Nefesh in 2002 with Tony Gelbart to facilitate and encourage North American and British aliyah (immigration to Israel). Nefesh B\'Nefesh has helped bring over 75,000 olim to Israel.',
  'alexandre-lazard': 'French-American banker (19th century). Jewish co-founder of Lazard Freres in 1848 in New Orleans with his brothers Simon and Elie. Lazard grew into one of the world\'s most prestigious financial advisory firms. The Lazard family were Sephardic Jews from France.',
  'adam-singolda': 'Israeli tech entrepreneur. Founder and CEO of Taboola, the world\'s largest content discovery platform, powering recommendations for major publishers including NBC, Bloomberg, and Der Spiegel. Built Taboola from an Israeli startup to a publicly traded company on NASDAQ.',
  'herbert-marcus': 'American businessman (1878-1950). Jewish co-founder of Neiman Marcus in 1907 in Dallas, Texas, with his sister Carrie Marcus Neiman and her husband A.L. Neiman. Built Neiman Marcus into one of America\'s most prestigious luxury department stores.',
  'aharon-shaked': 'Israeli entrepreneur. Co-founder of 888 Holdings, one of the world\'s leading online gambling companies headquartered in Gibraltar. 888 operates casino, poker, sport betting, and bingo platforms serving millions of customers worldwide.',
  'rob-speyer': 'American real estate executive. Born 1969. President and CEO of Tishman Speyer, one of the world\'s leading real estate developers and operators, managing over $80 billion in properties including Rockefeller Center and Hudson Yards. Jewish. Major New York real estate figure.',
  'richard-lefrak': 'American billionaire real estate developer. Born 1945 to a Jewish family in New York. Chairman of the LeFrak Organization, one of the largest private real estate developers in the U.S. The LeFrak family has been building in New York for over 100 years.',
  'max-levchin': 'Ukrainian-born American entrepreneur. Born 1975 in Kyiv to a Jewish family. Co-founded PayPal with Peter Thiel. Later founded Yelp, Affirm (BNPL fintech, IPO\'d 2021), and Slide. One of the original "PayPal Mafia" members who went on to reshape Silicon Valley.',
  'joseph-bloomingdale': 'American retailer (1842-1904). Born to a Jewish family in New York. Co-founded Bloomingdale\'s department store with his brother Lyman in 1861 on the Lower East Side of Manhattan. Bloomingdale\'s grew into one of America\'s premier upscale department stores.',
  'doron-myersdorf': 'Israeli tech entrepreneur. Founder and CEO of StoreDot, an Israeli company developing extreme fast-charging (XFC) battery technology for electric vehicles. StoreDot\'s technology aims to fully charge EV batteries in under 10 minutes.',
  'joseph-shenker': 'American attorney. Chairman of Sullivan & Cromwell LLP, one of America\'s oldest and most prestigious law firms (founded 1879). Jewish. Sullivan & Cromwell has been at the center of major M&A deals, SEC investigations, and corporate governance matters for over a century.',
  'micha-kaufman': 'Israeli tech entrepreneur. Co-founder and CEO of Fiverr International, the online marketplace for freelance services. Built Fiverr from an Israeli startup to a publicly traded company on NYSE. The platform connects millions of freelancers with businesses worldwide.',
  'alan-greenberg': 'American investment banker (1927-2014). Born to a Jewish family in Wichita, Kansas. CEO and chairman of Bear Stearns for over 30 years (1978-1993 CEO, then chairman). Known for aggressive trading culture. His protege was Jeffrey Epstein, whom he hired at Bear Stearns in 1976.',
  'claudia-mendoza': 'British Jewish communal leader. CEO of the Jewish Leadership Council (JLC), the representative body bringing together leaders of major British Jewish organizations. Previously held senior roles in Jewish communal organizations and advocacy.',
  'avishai-abrahami': 'Israeli tech entrepreneur. Co-founder and CEO of Wix.com, a leading cloud-based web development platform with over 250 million users worldwide. Born in Israel. Built Wix from a small Tel Aviv startup to a NASDAQ-listed company valued at over $6 billion.',
  'jeffrey-brotman': 'American businessman (1942-2017). Born to a Jewish family in Tacoma, Washington. Co-founded Costco Wholesale with Jim Sinegal in 1983 in Seattle. Served as chairman of the board. Costco grew to become the world\'s third-largest retailer.',
  'arthur-salomon': 'American banker (1880-1962). Jewish co-founder of Salomon Brothers investment bank in 1910 with his brothers Herbert and Percy. Salomon Brothers became a Wall Street powerhouse and pioneer in bond trading before its acquisition by Travelers Group (later Citigroup).',
  'herb-abramson': 'American record executive (1916-1999). Born to a Jewish family in Brooklyn, New York. Co-founded Atlantic Records with Ahmet Ertegun in 1947. Atlantic became one of the most important labels in music history, launching artists across jazz, R&B, rock, and soul.',
  'richard-simon': 'American publisher (1899-1960). Born to a Jewish family in New York. Co-founded Simon & Schuster publishing house with Max Schuster in 1924. Their first publication was a crossword puzzle book. Grew S&S into one of the "Big Five" publishing houses.',
  'max-schuster': 'American publisher (1897-1970). Born to a Jewish family of Austrian immigrants in Kalusz, Austria-Hungary. Co-founded Simon & Schuster with Richard Simon in 1924. Known for innovative marketing and building S&S into a major force in American publishing.',
  'jon-feltheimer': 'American media executive. Born to a Jewish family. CEO of Lionsgate Entertainment since 2000. Oversaw Lionsgate\'s growth from a small company to a major entertainment studio producing The Hunger Games, John Wick, and hundreds of films and TV shows.',
  'maxim-pasik': 'Israeli-Russian businessman. President and chairman of Watergen, an Israeli company that developed atmospheric water generation technology - extracting drinking water from air. The technology has humanitarian applications in water-scarce regions worldwide.',
  'dave-gilboa': 'American entrepreneur. Co-founder and Co-CEO of Warby Parker, the eyewear company that disrupted the optical industry with affordable direct-to-consumer glasses. Born to a Jewish family. Warby Parker went public in 2021. Previously worked at Bain and Allen & Company.',
  'david-horovitz': 'British-born Israeli journalist. Born 1962 in London. Founding editor of The Times of Israel since 2012. Previously editor of The Jerusalem Post. One of the most influential English-language journalists covering Israel and the Middle East.',
  'herzi-halevi': 'Israeli military officer. Born 1967. 23rd and current Chief of General Staff of the Israel Defense Forces since January 2023. Previously head of IDF Military Intelligence and commander of the Southern Command. Leading the IDF during the 2023-2024 Israel-Hamas war.',
  'doris-fisher': 'American billionaire businesswoman and philanthropist. Born 1931. Co-founded Gap Inc. in 1969 with her husband Donald Fisher. Their first Gap store opened in San Francisco selling Levi\'s jeans. Gap grew into a global retail empire. Major art collector and philanthropist.',
  'jonathan-gray': 'American billionaire businessman. Born 1969 to a Jewish family. President and COO of Blackstone Group, the world\'s largest alternative asset manager with over $1 trillion in assets under management. Previously global head of Blackstone\'s real estate business.',
  'warren-eisenberg': 'American businessman. Born 1929 to a Jewish family. Co-founded Bed Bath & Beyond with Leonard Feinstein in 1971. Grew it to over 1,000 stores. The company filed for bankruptcy in 2023 after decades as a dominant home goods retailer.',
  'leonard-feinstein': 'American businessman. Born 1937 to a Jewish family. Co-founded Bed Bath & Beyond with Warren Eisenberg in 1971 in Springfield, New Jersey. Built the chain into the largest home furnishing specialty retailer in North America. Retired in 2014.',
  'william-rudin': 'American real estate executive. CEO of Rudin Management Company, one of New York City\'s oldest and largest privately held real estate families. Jewish. The Rudin family has been developing and managing New York buildings since 1925.',
  'eric-rudin': 'American real estate executive. Co-chairman of Rudin Management Company alongside his cousin William. Jewish. The Rudin family owns and manages over 30 properties in New York City comprising over 10 million square feet of office and residential space.',
  'philip-green': 'British billionaire businessman. Born 1952 in Croydon to a Jewish family. Chairman of Arcadia Group (Topshop, Dorothy Perkins, Miss Selfridge). Controversial figure - criticized for BHS pension scandal and #MeToo allegations. Lost billionaire status after Arcadia collapse.',
  'serge-dassault': 'French billionaire industrialist and politician (1925-2018). Born Serge Bloch to a Jewish family (father Marcel changed name to Dassault, meaning "on the attack"). Ran the Dassault Group (Rafale fighter jets, Falcon business jets, Le Figaro). Served as a French senator.',
  'rabbi-nachman-of-breslov': 'Ukrainian Hasidic master (1772-1810). Born in Medzhybizh, Ukraine, great-grandson of the Baal Shem Tov (founder of Hasidism). Founded the Breslov Hasidic movement. Buried in Uman, Ukraine, where tens of thousands of followers pilgrimage annually on Rosh Hashanah.',
  'jeff-shell': 'American media executive. Born to a Jewish family. CEO of NBCUniversal (2020-2023). Resigned over inappropriate conduct. Previously chairman of NBCUniversal International and former president of Comcast Programming Group. Oversaw Peacock streaming launch.',
};

let updated = 0;
for (const [id, newBio] of Object.entries(bios)) {
  if (pd.people[id]) {
    const current = (pd.people[id].bio || '').length;
    const proposed = newBio.length;
    if (proposed > current) {
      pd.people[id].bio = fixDashes(newBio);
      updated++;
    }
  }
}

// Final check: verify 0 dashes
const str = JSON.stringify(pd);
const en = (str.match(/\u2013/g)||[]).length;
const em = (str.match(/\u2014/g)||[]).length;
console.log('Updated ' + updated + ' bios');
console.log('Dashes remaining: en=' + en + ' em=' + em);

fs.writeFileSync(PEOPLE_PATH, JSON.stringify(pd, null, 2), 'utf8');

// Check remaining sparse
let remaining = 0;
for (const [id, p] of Object.entries(pd.people)) {
  if ((p.bio||'').length < 40) remaining++;
}
console.log('People with bio < 40 chars remaining: ' + remaining);
if (remaining > 0) {
  for (const [id, p] of Object.entries(pd.people)) {
    if ((p.bio||'').length < 40) console.log('  ' + id + ' (' + (p.bio||'').length + '): ' + (p.bio||''));
  }
}
console.log('Done!');
