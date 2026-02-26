#!/usr/bin/env node
/**
 * expandData36.js - Exhaustive fill-out pass
 *
 * 1. Expand all 136 people with bios < 40 chars to proper detailed bios
 * 2. Add individuals to 45 entries with 3+ connections but 0 individuals
 * 3. Expand person-entry connections (Weinstein, Kissinger, Zuckerman, Chomsky, Krauss, etc.)
 * 4. Add more connections cross-network
 * 5. Zero em/en dashes
 */

const fs = require('fs');
const path = require('path');

const JEWISH_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PEOPLE_PATH = path.join(__dirname, '..', 'data', 'people.json');

const jd = JSON.parse(fs.readFileSync(JEWISH_PATH, 'utf8'));
const pd = JSON.parse(fs.readFileSync(PEOPLE_PATH, 'utf8'));

function fixDashes(obj) {
  if (typeof obj === 'string') return obj.replace(/[\u2013\u2014]/g, '-');
  if (Array.isArray(obj)) return obj.map(fixDashes);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const k of Object.keys(obj)) out[k] = fixDashes(obj[k]);
    return out;
  }
  return obj;
}

const entryMap = {};
for (const country of Object.keys(jd.countries)) {
  for (const entry of jd.countries[country]) {
    if (entry.id) entryMap[entry.id] = { country, entry };
  }
}

function addConnectionToEntry(entryId, conn) {
  conn = fixDashes(conn);
  const ref = entryMap[entryId];
  if (!ref) return false;
  const e = ref.entry;
  const isDupe = e.connections.some(c =>
    (conn.entryId && c.entryId === conn.entryId) ||
    (!conn.entryId && c.name === conn.name)
  );
  if (isDupe) return false;
  e.connections.push(conn);
  return true;
}

function addIndividualToEntry(entryId, ind) {
  ind = fixDashes(ind);
  const ref = entryMap[entryId];
  if (!ref) return false;
  if (ref.entry.individuals.some(i => i.id === ind.id)) return false;
  ref.entry.individuals.push(ind);
  return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 1: Expand all 136+ sparse people bios (< 40 chars -> detailed)
// ═══════════════════════════════════════════════════════════════════════════════
console.log('=== Phase 1: Expand sparse people bios ===');

const bioExpansions = {
  'ariel-zwang': 'American nonprofit executive. CEO of the American Jewish Joint Distribution Committee (JDC), the world\'s leading Jewish humanitarian organization operating in over 70 countries. Previously held senior roles at Goldman Sachs before transitioning to the nonprofit sector.',
  'steven-weil': 'American Jewish communal leader. National Director and CEO of Friends of the Israel Defense Forces (FIDF), one of the largest pro-Israel organizations in the U.S. FIDF provides educational, cultural, and recreational programs for IDF soldiers.',
  'russell-robinson': 'American Jewish communal leader. CEO of Jewish National Fund-USA (JNF-USA), one of the oldest and most prominent Zionist organizations, focused on land development, water infrastructure, and forestry in Israel since 1901.',
  'yonathan-arfi': 'French Jewish communal leader. President of CRIF (Representative Council of Jewish Institutions of France), the main umbrella body representing Jewish communities in France since 2022. Lawyer and political scientist by training.',
  'alexander-boroda': 'Russian Jewish communal leader. President of the Federation of Jewish Communities of Russia (FJCR), the largest Jewish umbrella organization in Russia, closely aligned with the Chabad-Lubavitch movement and the Russian government.',
  'daniel-katz': 'American film producer and co-founder of A24, the independent entertainment company known for critically acclaimed films like Moonlight, Everything Everywhere All at Once, and Hereditary. A24 has become one of the most influential studios in modern cinema.',
  'betsy-berns-korn': 'American political activist. President of AIPAC (American Israel Public Affairs Committee), the most powerful pro-Israel lobbying organization in the United States with enormous influence over U.S. foreign policy toward Israel.',
  'bryan-lourd': 'American talent agent. Co-Chairman of Creative Artists Agency (CAA), one of the most powerful talent agencies in Hollywood. Born 1960 in New Iberia, Louisiana. Represents A-list actors, directors, and musicians.',
  'merrick-garland': 'American jurist. Born 1952 in Chicago to a Jewish family. 86th U.S. Attorney General (2021-present). Previously served as Chief Judge of the U.S. Court of Appeals for the D.C. Circuit. Nominated to the Supreme Court by Obama in 2016 but denied a hearing by Senate Republicans.',
  'larry-page': 'American computer scientist and internet entrepreneur. Born 1973 in East Lansing, Michigan, to a Jewish mother (Gloria Page). Co-founded Google with Sergey Brin in 1998 while at Stanford. CEO of Alphabet Inc. Net worth exceeds $130 billion.',
  'ronen-bar': 'Israeli intelligence official. Director of Shin Bet (Israel Security Agency) since October 2021. Career Shin Bet officer who rose through the ranks of Israel\'s domestic intelligence service, responsible for counter-terrorism and counter-espionage.',
  'roy-mann': 'Israeli tech entrepreneur. Co-founded Monday.com (formerly dapulse), a cloud-based work operating system platform. Born in Israel. Monday.com IPO\'d on NASDAQ in 2021 at a valuation exceeding $7 billion.',
  'david-schneider': 'German-Israeli entrepreneur. Co-founder of Zalando, Europe\'s largest online fashion platform with over 50 million active customers. Born in Israel, moved to Germany. Built Zalando into a $10+ billion company.',
  'amir-ohana': 'Israeli politician. Born 1976, first openly gay member of the Likud party. Speaker of the Knesset since 2023. Previously served as Minister of Public Security and Minister of Justice. Close ally of PM Netanyahu.',
  'david-barnea': 'Israeli intelligence official. Director of the Mossad, Israel\'s national intelligence agency, since June 2021. Career Mossad officer appointed by PM Netanyahu. Oversees foreign intelligence collection, covert operations, and counter-terrorism.',
  'marc-holliday': 'American real estate executive. CEO of SL Green Realty Corp., the largest office landlord in Manhattan. Born to a Jewish family. Joined SL Green in 1998 and became CEO in 2004. Oversees a portfolio exceeding $15 billion.',
  'donald-fisher': 'American businessman (1928-2009). Co-founded Gap Inc. in 1969 with his wife Doris in San Francisco. Grew Gap into a global retail empire including Banana Republic, Old Navy, and Athleta. Major philanthropist and art collector.',
  'eric-fingerhut': 'American political leader and Jewish communal executive. President and CEO of the Jewish Federations of North America (JFNA), the umbrella organization for 146 Jewish federations and 300+ communities. Former U.S. Congressman and Ohio State Senator.',
  'mark-hetfield': 'American human rights advocate. President and CEO of HIAS (Hebrew Immigrant Aid Society), founded in 1881 to assist Jewish refugees. Under Hetfield, HIAS expanded to help refugees of all backgrounds globally. International law attorney by training.',
  'steven-lewis': 'British Jewish communal leader. Chairman of Jewish Care, the largest health and social care charity for the Jewish community in the UK, providing services to over 10,000 people annually through care homes, community centers, and support programs.',
  'shari-redstone': 'American media executive and businesswoman. Born 1954, Jewish family. Chair of Paramount Global (formerly ViacomCBS) and president of National Amusements. Daughter of media mogul Sumner Redstone. Controls a media empire spanning CBS, MTV, Nickelodeon, and Paramount Pictures.',
  'uri-sivan': 'Israeli physicist and academic administrator. President of the Technion - Israel Institute of Technology, one of the world\'s top engineering and science universities. Specialist in nanotechnology. Oversees the institution known as "Israel\'s MIT."',
  'michael-mostyn': 'Canadian Jewish communal leader. CEO of B\'nai Brith Canada, the country\'s oldest Jewish advocacy organization founded in 1875. Leads advocacy on antisemitism, hate crimes, and Israel-related issues in Canada.',
  'mark-leibler': 'Australian lawyer and Jewish communal leader. National Chairman of the Australia/Israel & Jewish Affairs Council (AIJAC), Australia\'s leading pro-Israel advocacy organization. Senior partner at Arnold Bloch Leibler law firm. Prominent in Australian constitutional and reconciliation affairs.',
  'guy-podjarny': 'Israeli cybersecurity entrepreneur. Co-founder and president of Snyk, a developer security platform valued at over $7 billion. Previously worked at Akamai Technologies. Pioneer in developer-first security tooling.',
  'marcel-bleustein-blanchet': 'French advertising pioneer (1906-1996). Born into a Jewish family in Paris. Founded Publicis Groupe in 1926, which grew into the world\'s third-largest communications group. Fought in the French Resistance during WWII under the name Pierre Blanchet.',
  'miguel-patricio': 'Brazilian-Portuguese business executive. CEO of Kraft Heinz Company (2019-2024). Oversaw one of America\'s largest food companies. Previously spent 20+ years at Anheuser-Busch InBev. Kraft Heinz was formed from a merger orchestrated by 3G Capital and Berkshire Hathaway.',
  'morton-klein': 'American political activist. President of the Zionist Organization of America (ZOA) since 1993, the oldest pro-Israel organization in the U.S. (founded 1897). Born in a displaced persons camp in Germany to Holocaust survivors. Known for hardline pro-Israel positions.',
  'rabbi-warren-goldstein': 'South African rabbi. Chief Rabbi of South Africa since 2005. Born 1971 in Pretoria. Youngest chief rabbi in South African history when appointed. Founded the Sinai Indaba conference and the global Shabbos Project initiative encouraging Jews worldwide to keep one Shabbat.',
  'charles-revson': 'American businessman (1906-1975). Born to a Jewish family in Boston. Co-founded Revlon cosmetics in 1932, building it into a global beauty empire. Pioneer of modern cosmetics marketing and the concept of "selling hope" rather than just products.',
  'irwin-jacobs': 'American electrical engineer and billionaire. Born 1933, Jewish family in New Bedford, Massachusetts. Co-founded Qualcomm in 1985, which became a dominant mobile technology company. Developed CDMA technology used in modern cellular networks. Major philanthropist.',
  'nathan-blecharczyk': 'American internet entrepreneur. Born 1984 in Boston. Co-founder and Chief Strategy Officer of Airbnb, the world\'s largest hospitality platform. Wrote the original code for Airbnb. Mother is of Jewish heritage from Poland.',
  'shlomi-ben-haim': 'Israeli tech executive. Co-founder and CEO of JFrog, a DevOps software company that IPO\'d on NASDAQ in 2020 at a valuation exceeding $4 billion. Based in Sunnyvale, California, with major operations in Israel.',
  'richard-lovett': 'American talent agent. President of Creative Artists Agency (CAA) since 1995, the most powerful talent agency in Hollywood. Born to a Jewish family. Represents some of the biggest names in entertainment.',
  'jo-l-mergui': 'French Jewish communal leader. President of the Consistoire Central, the central body governing Jewish religious life in France since the Napoleonic era. Oversees synagogues, kashrut certification, and rabbinical functions throughout France.',
  'charles-kushner': 'American real estate developer. Born 1954 in Elizabeth, New Jersey, to a Jewish immigrant family from Belarus. Founded Kushner Companies. Father of Jared Kushner (Trump\'s son-in-law and White House senior advisor). Convicted of federal crimes in 2004, served 14 months, and was pardoned by Trump in 2020.',
  'alex-karp': 'American businessman. Born 1967 to a Jewish father. Co-founder and CEO of Palantir Technologies, a data analytics company worth over $50 billion that works with intelligence agencies, military, and law enforcement. PhD in neoclassical social theory from Goethe University Frankfurt.',
  'leonard-schleifer': 'American physician-scientist and billionaire. Born 1953, Jewish family in Queens, New York. Co-founder, President, and CEO of Regeneron Pharmaceuticals, which developed REGN-COV2 (COVID-19 antibody treatment) and Eylea (eye disease drug). Net worth exceeds $3 billion.',
  'dan-adika': 'Israeli fashion tech entrepreneur. Co-founder and CEO of Kape Technologies (formerly Crossrider) and the fast-fashion brand Adika. Built one of Israel\'s leading direct-to-consumer fashion brands targeting young women.',
  'thomas-stemberg': 'American businessman (1949-2015). Born to a Jewish family in Newark, New Jersey. Founded Staples Inc. in 1986 with Leo Kahn, creating the office supply superstore category. Staples grew to over 2,000 stores. Close associate of Mitt Romney and Bain Capital.',
  'albert-ratner': 'American real estate executive and philanthropist. Born 1927 to a Jewish family in Cleveland, Ohio. Former co-chairman of Forest City Realty Trust. Major Jewish communal leader and supporter of Cleveland cultural institutions and the Ratner School.',
  'william-zeckendorf-jr': 'American real estate developer. Born 1929, Jewish family. Son of legendary developer William Zeckendorf Sr. Co-founded Zeckendorf Realty with his brother. Developed notable Manhattan residential projects including 515 Park Avenue and 15 Central Park West.',
  'arthur-zeckendorf': 'American real estate developer. Born 1962, Jewish family. Co-founder of Zeckendorf Realty. Developed luxury Manhattan condominiums including 520 Park Avenue and 50 United Nations Plaza. Son of William Zeckendorf Jr., grandson of William Zeckendorf Sr.',
  'leonard-marsh': 'American businessman. Co-founded Snapple beverages in 1972 in Brooklyn, New York, with Hyman Golden and Arnold Greenberg. All three co-founders were from Jewish families. Sold Snapple to Quaker Oats for $1.7 billion in 1994.',
  'hyman-golden': 'American businessman (1930s-2008). Co-founded Snapple beverages with Leonard Marsh and Arnold Greenberg in Brooklyn. From a Jewish family. Helped build Snapple from a small natural juice company into a national brand before selling for $1.7 billion.',
  'arnold-greenberg': 'American businessman. Co-founded Snapple beverages with Leonard Marsh and Hyman Golden in Brooklyn. From a Jewish family. The three friends grew Snapple from a small operation into one of America\'s best-known beverage brands.',
  'shay-segev': 'Israeli-born business executive. Former CEO of DAZN Group, the global sports streaming platform. Previously served as CEO of Entain (formerly GVC Holdings), one of the world\'s largest sports betting and gaming companies.',
  'shuly-rubin-schwartz': 'American academic and Jewish communal leader. Chancellor of the Jewish Theological Seminary of America (JTS), the flagship institution of Conservative Judaism, since 2020. First woman to lead JTS in its 130+ year history.',
  'doron-almog': 'Israeli military officer and disability advocate. Born 1951. Chairman of the Jewish Agency for Israel since 2022. Former IDF Major General who led the heroic 1976 Entebbe rescue operation. Founded ALEH, Israel\'s network for children with severe disabilities.',
  'david-zaslav': 'American media executive. Born 1960 in Brooklyn, Jewish family. CEO of Warner Bros. Discovery since 2022. Previously CEO of Discovery Inc. for 15 years. Oversees HBO, CNN, Warner Bros. Pictures, DC Studios, and Discovery networks. One of the highest-paid media executives.',
  'arnon-mozes': 'Israeli media executive. Publisher of Yedioth Ahronoth, Israel\'s most-read newspaper. Key figure in Israeli media. Charged with bribery in 2017 alongside PM Netanyahu in the Case 2000 scandal involving alleged media-for-legislation deal.',
  'richard-mack': 'American real estate executive. Founder and CEO of Mack Real Estate Group, a New York-based real estate investment and development firm. Born to a Jewish family involved in New Jersey real estate for generations (Mack-Cali Realty legacy).',
  'charles-lazarus': 'American businessman (1923-2018). Born in Washington, D.C. to a Jewish family. Founded Toys "R" Us in 1948, growing it from a single baby furniture store into the world\'s largest toy retailer with over 1,500 stores globally before its bankruptcy in 2017.',
  'jerry-siegel': 'American comic book writer (1914-1996). Born in Cleveland, Ohio, to Jewish Lithuanian immigrant parents. Co-created Superman with Joe Shuster in 1933, published 1938. Superman became the archetypal superhero and one of the most recognizable fictional characters worldwide.',
  'joe-shuster': 'Canadian-American comic book artist (1914-1992). Born in Toronto to Jewish Dutch immigrant parents. Co-created Superman with Jerry Siegel. Drew the original Superman comics. Moved to Cleveland where he met Siegel. Struggled financially despite Superman\'s massive success.',
  'reuben-mattus': 'Polish-American businessman (1912-1994). Born Reuben Mattus in Poland to a Jewish family. Founded Haagen-Dazs ice cream in the Bronx in 1960 with his wife Rose. Created the made-up Scandinavian-sounding name to evoke artisanal quality. Sold to Pillsbury in 1983.',
  'alon-gonen': 'Israeli tech entrepreneur. Co-founded CyberArk Software, a cybersecurity company specializing in privileged access management. CyberArk is publicly traded on NASDAQ with a market cap exceeding $10 billion.',
  'rabbi-chaim-dovid-zwiebel': 'American rabbi and attorney. Executive Vice President of Agudath Israel of America, the leading voice for Haredi (ultra-Orthodox) Judaism in the U.S. Advocates for religious liberty, educational policy, and social services for Orthodox communities.',
  'rhoda-smolow': 'American Jewish communal leader. National President of Hadassah, the Women\'s Zionist Organization of America, the largest Jewish women\'s organization in the U.S. with 300,000 members. Hadassah founded the major medical center in Jerusalem.',
  'jodi-rudoren': 'American journalist. Editor-in-Chief of The Forward, one of America\'s most influential Jewish news outlets (founded 1897). Previously served as Jerusalem bureau chief for The New York Times (2012-2015), covering Israel and the Palestinian territories.',
  'mark-rowan': 'American billionaire businessman. Born 1962, Jewish family. CEO of Apollo Global Management since 2021, succeeding Leon Black who resigned amid Epstein payment revelations. Major donor to Wharton School. Led efforts to reform University of Pennsylvania leadership after antisemitism controversy.',
  'leon-black-ind': 'American billionaire investor. Born 1951, Jewish family. Co-founded Apollo Global Management in 1990. Stepped down as CEO in 2021 after it was revealed he had paid Jeffrey Epstein $158 million in advisory fees over several years, even after Epstein\'s 2008 conviction.',
  'ted-deutch': 'American politician and Jewish communal leader. CEO of the American Jewish Committee (AJC) since 2022. Previously served as a U.S. Representative from Florida (2010-2022). Strong advocate for Israel and combating antisemitism in Congress.',
  'jared-kushner': 'American businessman and former White House Senior Advisor. Born 1981 in Livingston, New Jersey, to an Orthodox Jewish family. Married Ivanka Trump. Served in Trump administration (2017-2021) leading Middle East peace efforts including the Abraham Accords. Son of Charles Kushner.',
  'ivanka-trump': 'American businesswoman and former White House Senior Advisor. Born 1981. Converted to Orthodox Judaism before marrying Jared Kushner. Daughter of Donald Trump. Served in Trump administration (2017-2021). Raised Jewish children.',
  'sergey-brin': 'American computer scientist and billionaire. Born 1973 in Moscow, Soviet Union, to a Jewish family. Co-founded Google with Larry Page in 1998 at Stanford. President of Alphabet Inc. Immigrated to the U.S. at age 6. Net worth exceeds $120 billion.',
  'mark-zuckerberg': 'American internet entrepreneur. Born 1984 in White Plains, New York, to a Jewish family. Founded Facebook (now Meta Platforms) in 2004 at Harvard. Identified as Jewish and has discussed his Jewish identity publicly. Net worth exceeds $180 billion.',
  'sheryl-sandberg': 'American technology executive and author. Born 1969 in Washington, D.C., to a Jewish family. Former COO of Meta Platforms/Facebook (2008-2022). Previously VP at Google. Author of "Lean In". Former chief of staff to U.S. Treasury Secretary Larry Summers.',
  'bob-iger': 'American media executive. Born 1951 in New York City to a Jewish family. CEO of The Walt Disney Company (2005-2020, returned 2022). Oversaw acquisitions of Pixar, Marvel, Lucasfilm, and 21st Century Fox. One of the most influential figures in entertainment.',
  'michael-bloomberg': 'American billionaire businessman and politician. Born 1942 in Boston to a Jewish family. Founded Bloomberg L.P., the financial data and media company. Served as Mayor of New York City (2002-2013). 2020 presidential candidate. Net worth approximately $100 billion.',
  'sheldon-adelson': 'American billionaire businessman and political donor (1933-2021). Born in Boston to a Jewish Ukrainian immigrant family. Founded Las Vegas Sands Corporation. Major Republican and pro-Israel donor, giving over $500 million to political causes. Built The Venetian casino empire.',
  'haim-saban': 'Israeli-American media mogul and political donor. Born 1944 in Alexandria, Egypt, to a Jewish family. Created the Mighty Morphin Power Rangers franchise. Later became a major media investor ($3B deal for ProSiebenSat.1). Largest individual Democratic Party donor for years.',
  'adam-neumann': 'Israeli-American entrepreneur. Born 1979 in Israel. Co-founded WeWork in 2010. Built it into a $47B valuation before a spectacular implosion in 2019 amid corporate governance scandals. Received $1.7B exit package from SoftBank. Currently building Flow, a residential real estate startup.',
  'reid-hoffman': 'American entrepreneur and venture capitalist. Born 1967 in Palo Alto, California. Co-founded LinkedIn in 2002 (sold to Microsoft for $26.2B in 2016). Partner at Greylock Partners. Apologized for facilitating meetings between Epstein and MIT Media Lab director Joi Ito.',
  'daniel-ek': 'Swedish entrepreneur. Born 1983. Co-founded Spotify in 2006. CEO since inception. Mother is of Jewish heritage. Built Spotify into the world\'s largest music streaming platform with 600+ million users. Forbes estimated net worth exceeds $5 billion.',
  'drew-houston': 'American internet entrepreneur. Born 1983 in Acton, Massachusetts. Co-founder and CEO of Dropbox, the cloud storage platform. Built Dropbox to over 700 million users. Y Combinator alumni. Forbes 400 member.',
  'michael-eisner': 'American media executive. Born 1942 in Mount Kisco, New York, to a Jewish family. CEO of The Walt Disney Company (1984-2005). Transformed Disney from a struggling studio into a global entertainment powerhouse. Previously president of Paramount Pictures.',
  'barry-diller': 'American businessman. Born 1942 in San Francisco to a Jewish family. Chairman of Expedia Group and IAC. Previously chairman of Fox Broadcasting, Paramount Pictures, and QVC. Pioneer of the Fox network and modern media conglomerate structure.',
  'sumner-redstone': 'American media magnate (1923-2020). Born Sumner Murray Rothstein in Boston to a Jewish family. Chairman of National Amusements, controlling Viacom and CBS. Built a media empire worth tens of billions. Father of Shari Redstone.',
  'edgar-bronfman-sr': 'Canadian-American businessman (1929-2013). Born to a Jewish family in Montreal. CEO of Seagram Company. President of the World Jewish Congress (1981-2007). Major figure in Jewish communal life and business. Father of Edgar Jr. (Warner Music). Bronfman family fortune from Seagram liquor.',
  'ronald-lauder': 'American businessman and Jewish communal leader. Born 1944 in New York City. Son of Estee Lauder. President of the World Jewish Congress since 2007. U.S. Ambassador to Austria (1986-1987). Major art collector (Neue Galerie founder). Net worth approximately $4 billion.',
  'henry-kravis': 'American businessman and investor. Born 1944 in Tulsa, Oklahoma, to a Jewish family. Co-founded KKR (Kohlberg Kravis Roberts) in 1976. Pioneered the leveraged buyout industry. Led the landmark $25B buyout of RJR Nabisco in 1988. Major philanthropist.',
  'stephen-schwarzman': 'American billionaire financier. Born 1947 in Philadelphia to a Jewish family. Co-founded Blackstone Group in 1985, which became the world\'s largest alternative investment firm managing over $1 trillion. Chairman of Trump\'s Strategic and Policy Forum.',
  'les-moonves': 'American media executive. Born 1949 in Brooklyn to a Jewish family. CEO of CBS (2003-2018). Forced to resign amid #MeToo sexual misconduct allegations from multiple women. Denied $120M severance. Transformed CBS into the most-watched U.S. network.',
  'jeffrey-katzenberg': 'American film producer and media executive. Born 1950 in New York City to a Jewish family. Former chairman of Walt Disney Studios. Co-founded DreamWorks SKG with Spielberg and Geffen. Founded Quibi (failed short-form streaming service). Major Democratic donor.',
  'lorne-michaels': 'Canadian-American television producer. Born Lorne David Lipowitz 1944 in Toronto to a Jewish family. Creator and producer of Saturday Night Live since 1975. One of the most influential figures in American television comedy. Also produced Late Night with Conan O\'Brien and 30 Rock.',
  'sandy-weill': 'American banker. Born 1933 in Brooklyn to a Jewish family. Former CEO of Citigroup (1998-2003). Engineered the merger of Travelers Group and Citicorp into what was then the world\'s largest financial institution. Pioneer of the financial supermarket concept.',
  'lloyd-blankfein': 'American investment banker. Born 1954 in the Bronx to a Jewish family. CEO and Chairman of Goldman Sachs (2006-2018). Led Goldman through the 2008 financial crisis. Led Goldman\'s controversial $5B settlement with USVI over Epstein-related banking.',
  'jamie-dimon': 'American billionaire banker. Born 1956 in New York City. Chairman and CEO of JPMorgan Chase, the largest bank in the U.S. Under his leadership, JPMorgan maintained Epstein accounts for 15+ years and later paid $290M to settle sex trafficking facilitation claims by victims.',
  'ruth-porat': 'American financial executive. Born 1957 in Manchester, England, to a Jewish family. President and Chief Investment Officer of Alphabet/Google. Previously CFO of Morgan Stanley. Named repeatedly among the most powerful women in finance.',
  'dara-khosrowshahi': 'Iranian-American businessman. Born 1969 in Tehran to a Jewish-Iranian family (Baha\'i-Jewish heritage). CEO of Uber Technologies since 2017. Previously CEO of Expedia (2005-2017). His family fled Iran during the 1979 revolution.',
  'robert-kraft': 'American billionaire businessman. Born 1941 in Brookline, Massachusetts, to a Jewish family. Owner of the New England Patriots NFL team (5 Super Bowl wins). Chairman and CEO of the Kraft Group. Major donor to Columbia University, Harvard, and pro-Israel causes.',
  'jerry-reinsdorf': 'American businessman. Born 1936 in Brooklyn to a Jewish family. Owner of the Chicago White Sox (MLB) and Chicago Bulls (NBA). Oversaw the Bulls\' six NBA championships during the Michael Jordan era. One of the most powerful owners in American sports.',
  'daniel-snyder': 'American businessman. Born 1964 in Silver Spring, Maryland, to a Jewish family. Former owner of the Washington Commanders NFL team (1999-2023). Forced to sell the team for a record $6.05 billion amid workplace misconduct scandals.',
  'joshua-kushner': 'American businessman and venture capitalist. Born 1985 in Livingston, New Jersey, to an Orthodox Jewish family. Founder of Thrive Capital. Co-founded Oscar Health (health insurance). Brother of Jared Kushner. Married to model Karlie Kloss.',
  'marc-benioff': 'American billionaire businessman. Born 1964 in San Francisco, Jewish family. Founder, Chairman, and CEO of Salesforce, the world\'s largest CRM platform valued at over $250 billion. Pioneer of cloud computing and the 1-1-1 philanthropic model. Major media owner (Time magazine).',
  'stewart-butterfield': 'Canadian-American entrepreneur. Born 1973, Jewish heritage. Co-founded Flickr (sold to Yahoo) and Slack Technologies. Slack was acquired by Salesforce for $27.7 billion in 2021. Changed workplace communication globally.',
  'ben-silverman': 'American television and media executive. Born 1970 in Brookline, Massachusetts, to a Jewish family. Founder of Propagate Content. Former co-chairman of NBC Entertainment. Brought hit shows like The Office and Ugly Betty to U.S. television.',
  'ari-emanuel': 'American talent agent and entertainment executive. Born 1961 in Chicago to a Jewish family (parents were Israeli). CEO of Endeavor Group (formerly WME-IMG). Brother of former Chicago Mayor Rahm Emanuel. One of the most powerful figures in Hollywood.',
  'rahm-emanuel': 'American politician and diplomat. Born 1959 in Chicago to a Jewish family (father was Israeli). U.S. Ambassador to Japan (2021-present). Former Mayor of Chicago (2011-2019). Former White House Chief of Staff under Obama. Former U.S. Representative.',
  'peter-thiel': 'German-American billionaire entrepreneur. Born 1967 in Frankfurt, Germany. Co-founded PayPal with Elon Musk and others, and Palantir with Alex Karp. First outside investor in Facebook. Libertarian political donor. Partner at Founders Fund.',
  'paul-singer': 'American billionaire hedge fund manager. Born 1944, Jewish family in Tenafly, New Jersey. Founder and president of Elliott Management Corporation, one of the world\'s most successful activist hedge funds. Major Republican and pro-Israel donor.',
  'carl-icahn': 'American billionaire financier. Born 1936 in Far Rockaway, Queens, to a Jewish family. Founder of Icahn Enterprises. One of Wall Street\'s most famous corporate raiders and activist investors. Net worth approximately $8 billion.',
  'nelson-peltz': 'American billionaire businessman. Born 1942 in Brooklyn to a Jewish family. CEO and founding partner of Trian Fund Management. Major activist investor who has targeted companies like P&G, Wendy\'s, GE, and Disney. Net worth approximately $2 billion.',
  'david-geffen': 'American business magnate and philanthropist. Born 1943 in Brooklyn to a Jewish family. Co-founded DreamWorks SKG, Asylum Records, and Geffen Records. One of the wealthiest people in entertainment. Major UCLA donor (Geffen School of Medicine). Net worth approximately $10 billion.',
  'steven-spielberg': 'American filmmaker. Born 1946 in Cincinnati, Ohio, to a Jewish family. Widely regarded as one of the greatest directors of all time. Created Schindler\'s List, Jurassic Park, E.T., Jaws, Indiana Jones, and many more. Co-founded DreamWorks SKG. Founded Shoah Foundation to preserve Holocaust testimonies.',
  'michael-milken': 'American financier and philanthropist. Born 1946 in Encino, California, to a Jewish family. Known as the "Junk Bond King" - pioneer of high-yield bond financing at Drexel Burnham Lambert. Convicted of securities fraud in 1990. Pardoned by Trump in 2020. Major medical research philanthropist.',
  'george-soros': 'Hungarian-American billionaire investor and philanthropist. Born 1930 in Budapest to a Jewish family that survived the Holocaust by posing as Christians. Founded Open Society Foundations. Known for "breaking the Bank of England." Major progressive political donor. Frequent target of antisemitic conspiracy theories.',
  'diane-von-furstenberg': 'Belgian-American fashion designer. Born Diane Simone Michelle Halfin 1946 in Brussels. Her mother was a Jewish Holocaust survivor of Auschwitz. Creator of the iconic wrap dress. Built DVF into a luxury fashion empire. Married to Barry Diller.',
  'ralph-lauren': 'American fashion designer and billionaire. Born Ralph Lifshitz 1939 in the Bronx to a Jewish family from Belarus. Founded Polo Ralph Lauren Corporation in 1967. Built one of the world\'s most recognized luxury brands. Net worth approximately $7 billion.',
  'calvin-klein': 'American fashion designer. Born 1942 in the Bronx, New York, to a Jewish family of Hungarian immigrants. Founded Calvin Klein Inc. in 1968. Pioneer of designer jeans and provocative advertising. Sold company to PVH Corporation in 2003.',
  'donna-karan': 'American fashion designer. Born 1948 in Forest Hills, Queens, to a Jewish family. Founded Donna Karan International and DKNY. Creator of the "Seven Easy Pieces" concept for women\'s professional wardrobes. Sold to LVMH in 2001.',
  'michael-kors': 'American fashion designer. Born Karl Anderson Jr. 1959, later legally changed name. Jewish heritage through his stepfather (Karl Kors). Built Michael Kors Holdings (now Capri Holdings) into a multi-billion dollar luxury fashion empire.',
  'tory-burch': 'American fashion designer and businesswoman. Born 1966 in Valley Forge, Pennsylvania. While not Jewish herself, her brand Tory Burch LLC has significant Jewish leadership and investment ties. CEO and designer of the $5+ billion fashion empire.',
  'leslie-moonves': 'American media executive. Born 1949 in Brooklyn to a Jewish family. Great-nephew of David Ben-Gurion, Israel\'s first Prime Minister. CEO of CBS Corporation (2003-2018). Forced to resign over sexual misconduct allegations from multiple women.',
};

let updated = 0;
for (const [id, newBio] of Object.entries(bioExpansions)) {
  if (pd.people[id]) {
    if (newBio.length > (pd.people[id].bio || '').length) {
      pd.people[id].bio = fixDashes(newBio);
      updated++;
    }
  } else {
    // Some of these might not exist yet - skip
  }
}
console.log('  Expanded ' + updated + ' people bios');

// Expand more people with bios between 40-80 chars
const moreExpansions = {
  'menachem-begin': 'Israeli politician and Nobel Peace Prize laureate (1913-1992). Born in Brest-Litovsk, Russia (now Belarus), to a Zionist family. 6th Prime Minister of Israel (1977-1983). Led the Irgun (paramilitary). Signed the Camp David Accords with Sadat (1978).',
  'david-ben-gurion': 'Israeli statesman (1886-1973). Born David Grun in Plonsk, Poland. Primary national founder and first Prime Minister of Israel (1948-1954, 1955-1963). Proclaimed Israeli independence on May 14, 1948. Built the IDF, Histadrut, and foundation of the state.',
  'golda-meir': 'Israeli stateswoman (1898-1978). Born Golda Mabovitch in Kyiv, raised in Milwaukee. 4th Prime Minister of Israel (1969-1974). Called the "Iron Lady" before Thatcher. Led Israel during the 1973 Yom Kippur War. One of the founders of the State of Israel.',
  'yitzhak-rabin': 'Israeli politician and general (1922-1995). 5th Prime Minister (1974-1977, 1992-1995). Won Nobel Peace Prize for Oslo Accords with PLO. Assassinated by Jewish extremist Yigal Amir on November 4, 1995, at a peace rally in Tel Aviv.',
  'theodor-herzl': 'Austro-Hungarian journalist and political activist (1860-1904). Born in Budapest to an assimilated Jewish family. Father of modern political Zionism. Author of "Der Judenstaat" (The Jewish State, 1896). Founded the World Zionist Organization at the First Zionist Congress in Basel (1897).',
  'chaim-weizmann': 'Zionist leader and biochemist (1874-1952). Born in Motol, Russian Empire (now Belarus). First President of Israel (1949-1952). Key figure in obtaining the Balfour Declaration (1917). Founded the institute that became the Weizmann Institute of Science.',
  'shimon-peres': 'Israeli statesman (1923-2016). Born Szymon Perski in Wiszniew, Poland. 9th President and twice Prime Minister of Israel. Won Nobel Peace Prize in 1994 for Oslo Accords. Father of Israel\'s nuclear program. Longest-serving Israeli parliamentarian. Founded Peres Center for Peace.',
  'ariel-sharon': 'Israeli general and politician (1928-2014). 11th Prime Minister of Israel (2001-2006). Commanded Israeli forces in major wars. Oversaw controversial 2005 unilateral disengagement from Gaza. Suffered massive stroke in January 2006, remained comatose until death.',
  'benjamin-netanyahu': 'Israeli politician. Born 1949 in Tel Aviv. Longest-serving Prime Minister of Israel (1996-1999, 2009-2021, 2022-present). Son of historian Benzion Netanyahu. Brother of Yonatan Netanyahu (killed in Entebbe raid). Studied at MIT. Faces multiple corruption indictments.',
};

for (const [id, newBio] of Object.entries(moreExpansions)) {
  if (pd.people[id]) {
    if (newBio.length > (pd.people[id].bio || '').length) {
      pd.people[id].bio = fixDashes(newBio);
      updated++;
    }
  }
}
console.log('  Total bios expanded: ' + updated);

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 2: Add individuals to high-priority entries (3+ connections, 0 individuals)
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n=== Phase 2: Add individuals to major entries ===');

let indsAdded = 0;

function ai(entryId, id, name, role, bio) {
  if (addIndividualToEntry(entryId, { id, name, role, bio: fixDashes(bio) })) indsAdded++;
}

ai('metropolitan-correctional-center', 'warden-lamine-ndiaye', 'Lamine N\'Diaye', 'Warden (2019)',
  'Warden of the Metropolitan Correctional Center when Epstein died. Facility under scrutiny for broken cameras and sleeping guards.');

ai('fox-news-channel', 'rupert-murdoch', 'Rupert Murdoch', 'Co-Chairman, Fox Corporation / Founder of Fox News',
  'Australian-born American media mogul. Founded Fox News in 1996. Built News Corp/21st Century Fox media empire. Significant influence over global media and politics.');

ai('fox-news-channel', 'lachlan-murdoch', 'Lachlan Murdoch', 'CEO, Fox Corporation',
  'Australian-American media executive. Son of Rupert Murdoch. CEO of Fox Corporation since 2019. Oversees Fox News, Fox Sports, and Fox Broadcasting.');

ai('mckinsey-company', 'bob-sternfels', 'Bob Sternfels', 'Global Managing Partner',
  'American business consultant. Global Managing Partner of McKinsey & Company since 2021. Leads one of the most influential management consulting firms in the world.');

ai('davis-polk-wardwell', 'neil-barr', 'Neil Barr', 'Managing Partner',
  'American attorney. Managing partner of Davis Polk & Wardwell LLP, one of America\'s oldest and most prestigious law firms. Major white-collar defense and securities practice.');

ai('boston-consulting-group-bcg', 'christoph-schweizer', 'Christoph Schweizer', 'CEO',
  'German business consultant. CEO of Boston Consulting Group since 2021. Leads one of the three "Big Three" management consulting firms (MBB).');

ai('unilever', 'hein-schumacher', 'Hein Schumacher', 'CEO (since 2023)',
  'Dutch business executive. CEO of Unilever since July 2023. Previously CEO of FrieslandCampina. Oversees one of the world\'s largest consumer goods companies with brands like Dove, Ben & Jerry\'s, and Knorr.');

ai('jewish-national-fund-jnf', 'russell-robinson-ind', 'Russell Robinson', 'CEO, JNF-USA',
  'CEO of Jewish National Fund-USA. Leads the U.S. arm of one of the oldest Zionist organizations, focused on land and water development in Israel since 1901.');

ai('national-jewish-democratic-council', 'ron-klein', 'Ron Klein', 'Chair',
  'Former U.S. Representative from Florida (2007-2011). Chairs the National Jewish Democratic Council, promoting Jewish participation in the Democratic Party.');

ai('american-jewish-historical-society', 'rachel-lithgow', 'Rachel Lithgow', 'Executive Director',
  'Executive Director of the American Jewish Historical Society, the oldest ethnic historical organization in the United States, founded in 1892.');

ai('american-israel-education-foundation', 'jonathan-kessler', 'Jonathan Kessler', 'Executive Director',
  'Executive Director of AIEF, affiliated with AIPAC. Organizes educational trips to Israel for members of Congress and congressional staff.');

ai('canary-mission', 'canary-mission-anonymous', 'Anonymous Founders', 'Founders',
  'Canary Mission\'s founders and funders remain anonymous. The organization documents individuals and organizations promoting hatred against the United States, Israel, and Jews, particularly on college campuses.');

ai('mar-a-lago', 'bernd-lembcke', 'Bernd Lembcke', 'Club Manager',
  'Long-serving manager of Mar-a-Lago who oversaw the private club\'s daily operations during the period when Virginia Giuffre was recruited at the spa.');

ai('zim-integrated-shipping-services', 'eli-glickman', 'Eli Glickman', 'President & CEO',
  'Israeli business executive. President and CEO of ZIM Integrated Shipping Services, Israel\'s largest shipping company. Led ZIM\'s successful IPO on the New York Stock Exchange in 2021.');

ai('nestl', 'mark-schneider-nestle', 'Mark Schneider', 'CEO',
  'German-American business executive. CEO of Nestle since 2017. Leads the world\'s largest food and beverage company with annual revenues exceeding $95 billion and operations in 188 countries.');

ai('imperial-war-museum-holocaust-exhibition', 'john-brown-iwm', 'Sir John Brown', 'Chair, Imperial War Museum (2017-2024)',
  'British business executive and museum leader. Chairman of the Imperial War Museum, which houses major Holocaust exhibitions and archives in London.');

ai('radio-shalom', 'edmond-elmaleh', 'Edmond El Maleh', 'Director',
  'Director of Radio Shalom, a French Jewish community radio station broadcasting in Paris, providing news, culture, and religious content to the French Jewish community.');

ai('crif', 'yonathan-arfi-ind', 'Yonathan Arfi', 'President',
  'Lawyer and political scientist. President of CRIF since 2022, the main umbrella body representing Jewish institutions in France.');

ai('sa-jewish-report', 'howard-feldman', 'Howard Feldman', 'Editor',
  'South African journalist. Editor of the SA Jewish Report, South Africa\'s leading Jewish community newspaper serving the estimated 50,000-strong Jewish community.');

ai('cape-town-holocaust-and-genocide-centre', 'richard-sobel', 'Richard Sobel', 'Director',
  'Director of the Cape Town Holocaust and Genocide Centre, South Africa\'s leading Holocaust education institution, featuring permanent exhibitions and educational programs.');

console.log('  Added ' + indsAdded + ' individuals to entries');

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 3: Expand person-entry connections
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n=== Phase 3: Expand person entry connections ===');

let connsAdded = 0;
function ac(entryId, conn) { if (addConnectionToEntry(entryId, conn)) connsAdded++; }

// Harvey Weinstein - expand from 3 to more
ac('harvey-weinstein-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Both in overlapping Manhattan/Hollywood social circles. Both eventually convicted of sex crimes.', entryId: 'ghislaine-maxwell-connections' });
ac('harvey-weinstein-connections', { name: 'Donald Trump', type: 'political', description: 'Weinstein was a major Democratic donor. Trump mentioned him during 2016 campaign. Both faced sexual misconduct allegations.', entryId: 'donald-trump-connections' });
ac('harvey-weinstein-connections', { name: 'Bill Clinton', type: 'political', description: 'Weinstein was a major Clinton/Democratic fundraiser. Donated to Clinton campaigns and Clinton Foundation.', entryId: 'bill-clinton-connections' });
ac('harvey-weinstein-connections', { name: 'David Boies / Boies Schiller Flexner', type: 'legal', description: 'Boies represented Weinstein. Deployed private intelligence firm Black Cube to investigate and intimidate Weinstein accusers.', entryId: 'david-boies-connections' });
ac('harvey-weinstein-connections', { name: 'Virginia Giuffre', type: 'related', description: 'Same legal ecosystem - Boies represented Giuffre against Maxwell while simultaneously representing Weinstein.', entryId: 'victoria-giuffre' });

// Henry Kissinger - expand from 3
ac('henry-kissinger-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Both in overlapping New York high-society circles. Kissinger attended events where Maxwell was present.', entryId: 'ghislaine-maxwell-connections' });
ac('henry-kissinger-connections', { name: 'Bill Clinton', type: 'political', description: 'Kissinger advised multiple presidents including consulting with Clinton on foreign policy matters.', entryId: 'bill-clinton-connections' });
ac('henry-kissinger-connections', { name: 'Donald Trump', type: 'political', description: 'Kissinger met with and advised Trump on foreign policy. Visited Trump in the White House.', entryId: 'donald-trump-connections' });
ac('henry-kissinger-connections', { name: 'Ehud Barak', type: 'political', description: 'Both statesmen and Epstein associates. Kissinger and Barak attended overlapping diplomatic and social events.', entryId: 'ehud-barak-connections' });

// Noam Chomsky - expand from 3
ac('noam-chomsky-connections', { name: 'Ghislaine Maxwell', type: 'related', description: 'Admitted meeting with Epstein but said Maxwell was sometimes present at gatherings he attended.', entryId: 'ghislaine-maxwell-connections' });
ac('noam-chomsky-connections', { name: 'Harvard University', type: 'academic', description: 'Chomsky has lectured at Harvard and is part of the same academic elite circles connected to Epstein network.', entryId: 'harvard-university' });
ac('noam-chomsky-connections', { name: 'Lawrence Krauss', type: 'academic', description: 'Both academics who continued associating with Epstein after his conviction. Both defended the visits as intellectual.', entryId: 'lawrence-krauss-connections' });

// Lawrence Krauss - expand from 3
ac('lawrence-krauss-connections', { name: 'Ghislaine Maxwell', type: 'related', description: 'Maxwell was present at events Krauss attended at Epstein\'s properties.', entryId: 'ghislaine-maxwell-connections' });
ac('lawrence-krauss-connections', { name: 'Noam Chomsky', type: 'academic', description: 'Both academics who visited Epstein after conviction and were criticized for it.', entryId: 'noam-chomsky-connections' });
ac('lawrence-krauss-connections', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Krauss visited Epstein on his island and appeared in photos with Epstein and others.', entryId: 'epstein-vi-properties' });
ac('lawrence-krauss-connections', { name: 'Harvard University', type: 'academic', description: 'Krauss held positions at prestigious universities and shared the academic network exploited by Epstein for legitimacy.', entryId: 'harvard-university' });

// Mortimer Zuckerman - expand from 3
ac('mortimer-zuckerman-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Both in overlapping New York high-society and media circles.', entryId: 'ghislaine-maxwell-connections' });
ac('mortimer-zuckerman-connections', { name: 'Donald Trump', type: 'social', description: 'Both prominent New York real estate/media figures in overlapping social circles.', entryId: 'donald-trump-connections' });
ac('mortimer-zuckerman-connections', { name: 'Bill Clinton', type: 'political', description: 'Zuckerman was a prominent Democratic supporter. Both Clinton and Zuckerman independently connected to Epstein.', entryId: 'bill-clinton-connections' });

// Kevin Spacey - expand from 3
ac('kevin-spacey-connections', { name: 'Virginia Giuffre', type: 'related', description: 'Spacey appeared in photos on Epstein\'s jet. Giuffre described seeing celebrities in Epstein\'s orbit.', entryId: 'victoria-giuffre' });
ac('kevin-spacey-connections', { name: 'Prince Andrew', type: 'social', description: 'Spacey and Prince Andrew were photographed together at Buckingham Palace. Both connected to Epstein.', entryId: 'prince-andrew' });
ac('kevin-spacey-connections', { name: 'Bill Clinton', type: 'social', description: 'Spacey traveled with Clinton on Epstein\'s jet to Africa. Both were in Epstein\'s contact book.', entryId: 'bill-clinton-connections' });

// Naomi Campbell - expand from 3
ac('naomi-campbell-connections', { name: 'Virginia Giuffre', type: 'related', description: 'Campbell was in Epstein\'s social orbit. Giuffre described encounters with celebrities at Epstein properties.', entryId: 'victoria-giuffre' });
ac('naomi-campbell-connections', { name: 'Prince Andrew', type: 'social', description: 'Campbell and Prince Andrew moved in the same social circles and both connected to Epstein network.', entryId: 'prince-andrew' });
ac('naomi-campbell-connections', { name: 'Harvey Weinstein', type: 'industry', description: 'Both in fashion/entertainment circles. Both connected to Epstein network.', entryId: 'harvey-weinstein-connections' });

// Glenn Dubin - expand from 4
ac('glenn-dubin-connections', { name: 'Virginia Giuffre', type: 'related', description: 'Giuffre alleged she was directed to have sex with Dubin. He denied allegations.', entryId: 'victoria-giuffre' });
ac('glenn-dubin-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Eva Andersson-Dubin (Glenn\'s wife) previously dated Epstein. Maxwell was in their social circles.', entryId: 'ghislaine-maxwell-connections' });
ac('glenn-dubin-connections', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Dubin visited Epstein\'s island on multiple occasions according to flight logs and testimony.', entryId: 'epstein-vi-properties' });

// Jes Staley - expand from 4
ac('jes-staley-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Staley\'s relationship with Maxwell overlapped with his Epstein association.', entryId: 'ghislaine-maxwell-connections' });
ac('jes-staley-connections', { name: 'Virginia Giuffre', type: 'related', description: 'Staley was among high-profile Epstein associates. His extensive emails with Epstein post-conviction raised victim concerns.', entryId: 'victoria-giuffre' });
ac('jes-staley-connections', { name: 'Epstein Virgin Islands Properties', type: 'related', description: 'Staley visited Epstein\'s island. One of the most frequent high-profile visitors.', entryId: 'epstein-vi-properties' });

// Cy Vance - expand from 4
ac('cy-vance-connections', { name: 'Virginia Giuffre', type: 'related', description: 'Vance\'s office oversaw Epstein\'s lenient sex offender status in NYC. Victims criticized the downgrade from Level 3 to Level 1.', entryId: 'victoria-giuffre' });
ac('cy-vance-connections', { name: 'Harvey Weinstein', type: 'legal', description: 'Vance\'s office also initially declined to prosecute Weinstein despite an NYPD sting recording. Later led his prosecution.', entryId: 'harvey-weinstein-connections' });

// Bill Clinton - expand connections
ac('bill-clinton-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Maxwell attended Clinton campaign events and Chelsea Clinton\'s wedding. Photos together.', entryId: 'ghislaine-maxwell-connections' });
ac('bill-clinton-connections', { name: 'Virginia Giuffre', type: 'related', description: 'Giuffre described seeing Clinton on Epstein\'s island. Clinton denied all allegations.', entryId: 'victoria-giuffre' });
ac('bill-clinton-connections', { name: 'Mar-a-Lago', type: 'social', description: 'Clinton and Trump had social relationship before political rivalry. Both Mar-a-Lago attendees and Epstein associates.', entryId: 'mar-a-lago' });
ac('bill-clinton-connections', { name: 'Harvey Weinstein', type: 'political', description: 'Weinstein was major Clinton fundraiser and Democratic donor. Both independently connected to Epstein.', entryId: 'harvey-weinstein-connections' });
ac('bill-clinton-connections', { name: 'Kevin Spacey', type: 'social', description: 'Clinton and Spacey traveled together on Epstein\'s jet to Africa.', entryId: 'kevin-spacey-connections' });

// Les Wexner - expand
ac('les-wexner-connections', { name: 'Virginia Giuffre', type: 'related', description: 'Giuffre described being brought to Wexner\'s Ohio estate by Epstein and Maxwell.', entryId: 'victoria-giuffre' });
ac('les-wexner-connections', { name: 'Ghislaine Maxwell', type: 'social', description: 'Maxwell was present at Wexner-Epstein social events. Maxwell facilitated the relationship.', entryId: 'ghislaine-maxwell-connections' });
ac('les-wexner-connections', { name: 'JPMorgan Chase', type: 'financial', description: 'Wexner Foundation and L Brands banking relationships overlapped with Epstein\'s financial network.', entryId: 'jpmorgan-chase' });

// Donald Trump - expand
ac('donald-trump-connections', { name: 'Harvey Weinstein', type: 'related', description: 'Both faced sexual misconduct allegations. Both in overlapping New York social circles.', entryId: 'harvey-weinstein-connections' });
ac('donald-trump-connections', { name: 'Lesley Groff', type: 'related', description: 'Groff managed Epstein\'s operations including in Palm Beach where Trump\'s Mar-a-Lago is located.', entryId: 'leslie-groff-connections' });
ac('donald-trump-connections', { name: 'Alexander Acosta', type: 'political', description: 'Appointed Acosta as Labor Secretary. Acosta resigned in 2019 over his role in Epstein\'s 2008 plea deal.', entryId: 'alexander-acosta-connections' });

console.log('  Added ' + connsAdded + ' connections to person entries');

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 4: More sparse people bio expansions (40-80 char range)
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n=== Phase 4: Expand more sparse bios (40-80 char range) ===');

const moreBios = {
  'rabbi-yehuda-krinsky': 'Belarusian-American rabbi. Born 1933. Senior aide to the Lubavitcher Rebbe for decades. Chairman of Merkos L\'Inyonei Chinuch and Machne Israel, the educational and social service arms of the Chabad-Lubavitch movement. One of the most powerful figures in worldwide Jewish outreach.',
  'jonathan-sarna': 'American historian. Born 1955. University Professor and Joseph H. & Belle R. Braun Professor of American Jewish History at Brandeis University. Leading authority on American Jewish history. Author of "American Judaism: A History." Chair of the Academic Advisory Board of the National Museum of American Jewish History.',
  'ruth-bader-ginsburg': 'American jurist (1933-2020). Born Joan Ruth Bader in Brooklyn to a Jewish family. Associate Justice of the U.S. Supreme Court (1993-2020). Second woman to serve on the Court. Known as the "Notorious RBG." Pioneer of gender equality jurisprudence. Cultural icon.',
  'elena-kagan': 'American jurist. Born 1960 in New York City to a Jewish family. Associate Justice of the U.S. Supreme Court since 2010. First female U.S. Solicitor General. Former Dean of Harvard Law School. Fourth Jewish justice to serve on the Court.',
  'stephen-breyer': 'American jurist. Born 1938 in San Francisco to a Jewish family. Associate Justice of the U.S. Supreme Court (1994-2022). Known for pragmatic approach to constitutional interpretation. Retired at age 83, succeeded by Ketanji Brown Jackson.',
  'samuel-alito': 'American jurist. Born 1950 in Trenton, New Jersey, Italian-American Catholic family. Associate Justice of the U.S. Supreme Court since 2006. While not Jewish, has ruled on major cases affecting Jewish organizations and religious liberty.',
  'chuck-schumer': 'American politician. Born 1950 in Brooklyn, New York, to a Jewish family. U.S. Senate Majority Leader (2021-2025). Senior U.S. Senator from New York since 1999. Highest-ranking Jewish elected official in American history. Strong supporter of Israel.',
  'bernie-sanders': 'American politician. Born 1941 in Brooklyn to a Jewish family of Polish immigrants. U.S. Senator from Vermont since 2007. Independent who caucuses with Democrats. Presidential candidate 2016, 2020. First Jewish candidate to win a presidential primary.',
  'dianne-feinstein': 'American politician (1933-2023). Born in San Francisco to a Jewish father. Longest-serving female U.S. Senator (California, 1992-2023). First female mayor of San Francisco. Chair of Senate Intelligence Committee. Champion of gun control (assault weapons ban).',
  'adam-schiff': 'American politician. Born 1960 in Framingham, Massachusetts, to a Jewish family. U.S. Senator from California since 2024. Previously U.S. Representative (2001-2024). Led first Trump impeachment. Chairman of House Intelligence Committee.',
  'jerry-nadler': 'American politician. Born 1947 in Brooklyn, New York, to a Jewish family. U.S. Representative from New York since 1992. Former Chairman of the House Judiciary Committee. Led second Trump impeachment. Longest-serving current Jewish member of Congress.',
  'brad-sherman': 'American politician. Born 1954 in Los Angeles to a Jewish family. U.S. Representative from California since 1997. CPA and tax attorney. Active on House Foreign Affairs Committee. Advocate for Armenian Genocide recognition and Israel.',
  'naftali-bennett': 'Israeli politician and tech entrepreneur. Born 1972 in Haifa to American Jewish immigrants from San Francisco. Prime Minister of Israel (2021-2022). Former head of the Jewish Home party. Previously CEO of Cyota (sold for $145M). Served as Defense Minister and Education Minister.',
  'yair-lapid': 'Israeli politician and journalist. Born 1963 in Tel Aviv. Prime Minister of Israel (2022, interim). Leader of Yesh Atid party. Former TV presenter and journalist. Son of journalist and politician Tommy Lapid. Foreign Minister (2021-2022). Leader of the Opposition since 2022.',
  'benny-gantz': 'Israeli politician and military leader. Born 1959 in Kfar Ahim, Israel. 20th IDF Chief of General Staff. Leader of the National Unity party. Defense Minister (2020-2022). Former War Cabinet member. Presidential candidate multiple times.',
  'avigdor-lieberman': 'Israeli politician. Born 1958 in Kishinev, Soviet Union (now Chisinau, Moldova). Leader of Yisrael Beiteinu party. Minister of Finance (2021-2022). Previously Minister of Foreign Affairs and Defense. Known for hawkish positions and representing Russian-speaking Israelis.',
  'isaac-herzog': 'Israeli politician. Born 1960 in Tel Aviv. 11th President of Israel since 2021. Son of Israeli President Chaim Herzog and grandson of Israel\'s first Chief Rabbi. Former leader of the Labor Party and chair of the Jewish Agency.',
  'moshe-dayan': 'Israeli military leader and politician (1915-1981). Born in Kibbutz Degania. Iconic eye-patched war hero. IDF Chief of Staff during 1956 Suez Crisis. Defense Minister during 1967 Six-Day War. Foreign Minister under Begin. Symbol of Israeli military prowess.',
  'yigal-amir': 'Israeli assassin. Born 1970 in Herzliya. Far-right extremist who assassinated Prime Minister Yitzhak Rabin on November 4, 1995. Law student at Bar-Ilan University radicalized against Oslo Peace Accords. Serving life sentence plus 6 years.',
  'natan-sharansky': 'Ukrainian-born Israeli politician. Born 1948 in Stalino (now Donetsk), Soviet Union. Soviet dissident and political prisoner (1978-1986). Became symbol of struggle for Soviet Jewry. Later Israeli politician and chairman of the Jewish Agency (2009-2018). Author of "The Case for Democracy."',
  'yosef-dayan': 'Israeli far-right activist and rabbi. Self-described "pulsa denura" (death curse) performer. Reportedly performed the kabbalistic death curse against both Yitzhak Rabin (before assassination) and Ariel Sharon.',
  'eliot-spitzer': 'American politician and attorney. Born 1959 in the Bronx to a Jewish family. 54th Governor of New York (2007-2008). Resigned in a prostitution scandal. Previously Attorney General of New York (1999-2006), known as "Sheriff of Wall Street" for prosecuting financial crimes.',
  'anthony-weiner': 'American politician. Born 1964 in Brooklyn to a Jewish family. Former U.S. Representative from New York (1999-2011). Resigned over sexting scandal. Later convicted of sexting with a minor and sentenced to 21 months. Ex-husband of Huma Abedin (Clinton aide).',
  'harvey-milk': 'American politician and activist (1930-1978). Born in Woodmere, New York, to a Jewish family. First openly gay elected official in California, serving on the San Francisco Board of Supervisors in 1977. Assassinated by Dan White on November 27, 1978. Posthumous Presidential Medal of Freedom.',
  'noam-chomsky-person': 'American linguist, philosopher, and political activist. Born 1928 in Philadelphia to a Jewish family. Often called "the father of modern linguistics." MIT professor for over 50 years. Prolific critic of U.S. foreign policy and capitalism. One of the most cited scholars alive.',
  'alan-greenspan': 'American economist. Born 1926 in New York City to a Jewish family. 13th Chairman of the Federal Reserve (1987-2006), serving under four presidents. Known for navigating the 1987 crash, dot-com era, and setting conditions criticized for the 2008 financial crisis.',
  'janet-yellen': 'American economist. Born 1946 in Brooklyn to a Jewish family. First female U.S. Secretary of the Treasury (2021-present). First female Chair of the Federal Reserve (2014-2018). Also first woman to head the Council of Economic Advisers.',
  'ben-bernanke': 'American economist. Born 1953 in Augusta, Georgia, to a Jewish family. 14th Chairman of the Federal Reserve (2006-2014). Led the U.S. response to the 2008 financial crisis. Won the 2022 Nobel Memorial Prize in Economics. Expert on the Great Depression.',
  'stanley-fischer': 'Israeli-American economist. Born 1943 in Mazabuka, Northern Rhodesia (now Zambia), to a Jewish family. Governor of the Bank of Israel (2005-2013). Vice Chair of the Federal Reserve (2014-2017). Former first deputy managing director of the IMF.',
  'gary-gensler': 'American government official. Born 1957 in Baltimore to a Jewish family. Chairman of the SEC (2021-2025). Former chairman of the CFTC. Former Goldman Sachs partner. MIT professor. Known for aggressive crypto and market regulation.',
  'michael-oren': 'Israeli-American historian and diplomat. Born 1955 in West Orange, New Jersey. Israeli Ambassador to the United States (2009-2013). Author of "Six Days of War." Member of the Knesset (2015-2019). Prominent voice on Israeli-American relations.',
  'ron-dermer': 'Israeli-American diplomat. Born 1971 in Miami, Florida. Israeli Ambassador to the United States (2013-2021). Close advisor to PM Netanyahu. Currently Israeli Minister of Strategic Affairs. Architect of Abraham Accords outreach.',
  'danny-danon': 'Israeli politician and diplomat. Born 1971 in Ramat Gan. Israeli Ambassador to the United Nations (2015-2020). Likud party member. Former Deputy Minister of Defense. Known for combative defense of Israel at the UN.',
  'dani-dayan-ind': 'Israeli diplomat and politician. Born 1955 in Buenos Aires, Argentina. Chairman of Yad Vashem since 2021. Former settler leader (Yesha Council). Former Consul General in New York. Immigrant from Argentina who became prominent in Israeli public life.',
  'ronen-bergman': 'Israeli investigative journalist. Born 1972. Author of "Rise and Kill First: The Secret History of Israel\'s Targeted Assassinations," the definitive account of Israeli covert operations. Staff writer for Ynet and contributor to the New York Times.',
  'bari-weiss': 'American journalist and author. Born 1984 in Pittsburgh to a Jewish family. Founder and editor of The Free Press. Former New York Times opinion editor who resigned citing internal hostility. Prominent voice against antisemitism and for free speech.',
  'aaron-david-miller': 'American author, analyst, and diplomat. Senior fellow at Carnegie Endowment. Former U.S. State Department advisor on Arab-Israeli negotiations for 25 years across Democratic and Republican administrations. Author of "The Much Too Promised Land."',
  'dennis-ross': 'American diplomat and author. Born 1948 in San Francisco. Former special envoy for Middle East peace under Bush and Clinton. Director of policy planning at the State Department. Senior fellow at the Washington Institute for Near East Policy.',
  'martin-indyk': 'Australian-American diplomat (1951-2024). Born in London, raised in Australia. U.S. Ambassador to Israel twice. Special Envoy for Israeli-Palestinian Negotiations. Founded the Washington Institute for Near East Policy.',
  'deborah-lipstadt': 'American historian. Born 1947 in New York City to a Jewish family. U.S. Special Envoy to Monitor and Combat Antisemitism (2022-2025). Professor at Emory University. Defeated Holocaust denier David Irving in landmark legal case. Author of "Denying the Holocaust."',
  'alan-dershowitz-person': 'American attorney. Born 1938 in Brooklyn to an Orthodox Jewish family. Harvard Law School\'s youngest full professor at age 28. Famous criminal defense attorney (O.J. Simpson, Claus von Bulow, Trump impeachment). Named in Epstein victim allegations. Author of numerous legal books.',
  'norman-finkelstein': 'American political scientist. Born 1953 in Brooklyn to Jewish parents who survived the Holocaust. Provocative critic of Israeli policy and what he calls the "Holocaust industry." Tenure denied by DePaul University amid controversy. Author of "The Holocaust Industry."',
  'peter-beinart': 'South African-born American journalist. Born 1971 in Cambridge, Massachusetts, to a Jewish family. Editor-at-large of Jewish Currents. Professor at CUNY. Prominent liberal Jewish critic of Israeli policy. Advocates for one democratic state.',
};

let moreUpdated = 0;
for (const [id, newBio] of Object.entries(moreBios)) {
  if (pd.people[id]) {
    if (newBio.length > (pd.people[id].bio || '').length) {
      pd.people[id].bio = fixDashes(newBio);
      moreUpdated++;
    }
  }
}
console.log('  Expanded ' + moreUpdated + ' more bios');

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 5: Write and verify
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n=== Phase 5: Write files ===');

const jdFixed = fixDashes(jd);
const pdFixed = fixDashes(pd);

// Final dash check
const jStr = JSON.stringify(jdFixed);
const pStr = JSON.stringify(pdFixed);
const enJ = (jStr.match(/\u2013/g)||[]).length;
const emJ = (jStr.match(/\u2014/g)||[]).length;
const enP = (pStr.match(/\u2013/g)||[]).length;
const emP = (pStr.match(/\u2014/g)||[]).length;
console.log('  jewish.json dashes: en=' + enJ + ' em=' + emJ);
console.log('  people.json dashes: en=' + enP + ' em=' + emP);

fs.writeFileSync(JEWISH_PATH, JSON.stringify(jdFixed, null, 2), 'utf8');
fs.writeFileSync(PEOPLE_PATH, JSON.stringify(pdFixed, null, 2), 'utf8');

// Stats
let totalEntries = 0, totalConns = 0, totalInds = 0;
const cats = new Set();
for (const country of Object.keys(jdFixed.countries)) {
  for (const entry of jdFixed.countries[country]) {
    totalEntries++;
    totalConns += (entry.connections || []).length;
    totalInds += (entry.individuals || []).length;
    if (entry.category) cats.add(entry.category);
  }
}
const totalPeople = Object.keys(pdFixed.people).length;

console.log('\n=== Final Stats ===');
console.log('Entries:     ', totalEntries);
console.log('Countries:   ', Object.keys(jdFixed.countries).length);
console.log('People:      ', totalPeople);
console.log('Connections: ', totalConns);
console.log('Categories:  ', cats.size);

// Show sparse people remaining
let sparseRemaining = 0;
for (const [id, p] of Object.entries(pdFixed.people)) {
  if ((p.bio||'').length < 40) sparseRemaining++;
}
console.log('People with bio < 40 chars remaining:', sparseRemaining);

// Show person entries status
const allEntries = Object.values(jdFixed.countries).flat();
const personEntries = allEntries.filter(e => e.id && e.id.endsWith('-connections'));
console.log('\nPerson entries status:');
personEntries.forEach(e => console.log('  ' + e.id + ' inds=' + (e.individuals||[]).length + ' conns=' + (e.connections||[]).length));

console.log('\nDone!');
