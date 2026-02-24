/**
 * addFoundingYears.js - Mass enrichment of founding years for entries
 * Adds historically accurate founding years for ~300+ organizations
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'jewish.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Comprehensive founding year lookup by entry ID
const foundingYears = {
  // === ADVOCACY & PUBLIC AFFAIRS ===
  'aipac-american-israel-public-affairs-committee': 1963,
  'american-jewish-committee-ajc': 1906,
  'american-jewish-congress': 1918,
  'anti-defamation-league-adl': 1913,
  'christians-united-for-israel-cufi': 2006,
  'j-street': 2008,
  'jewish-council-for-public-affairs-jcpa': 1944,
  'jewish-democratic-council-of-america': 2017,
  'republican-jewish-coalition': 1985,
  'standwithus': 2001,
  'zionist-organization-of-america-zoa': 1897,
  'simon-wiesenthal-center': 1977,
  'conference-of-presidents-of-major-american-jewish-organizations': 1956,
  'orthodox-union': 1898,
  'reconstructing-judaism': 1968,

  // === FINANCIAL SERVICES ===
  'cantor-fitzgerald': 1945,
  'paypal': 1998,
  'stripe': 2010,
  'berkshire-hathaway-via-subsidiaries': 1839,
  'icahn-enterprises': 1987,
  'goldman-sachs': 1869,
  'blackrock': 1988,
  'blackstone-group': 1985,
  'citadel-llc': 1990,
  'soros-fund-management': 1969,
  'renaissance-technologies': 1982,
  'two-sigma-investments': 2001,
  'elliott-management-corporation': 1977,
  'baupost-group': 1982,
  'apollo-global-management': 1990,
  'kkr-co': 1976,
  'cerberus-capital-management': 1992,
  'och-ziff-capital-management-now-sculptor-capital': 1994,
  'canyon-partners': 1990,
  'ares-management': 1997,
  'bain-capital': 1984,
  'warburg-pincus': 1966,
  'lazard': 1848,
  'rothschild-co': 1811,
  'oppenheimerfunds-now-invesco': 1959,
  'leumi-group': 1902,

  // === PHILANTHROPY & CHARITIES ===
  'adelson-family-foundation': 2007,
  'american-friends-of-the-israel-defense-forces-fidf': 1981,
  'american-jewish-joint-distribution-committee-jdc': 1914,
  'charles-and-lynn-schusterman-family-philanthropies': 1987,
  'charles-bronfman-foundation': 1986,
  'friends-of-the-idf-fidf-additional-chapters': 1981,
  'hadassah-the-women-s-zionist-organization-of-america': 1912,
  'jewish-agency-for-israel-us-office': 1929,
  'jewish-funders-network': 1990,
  'jewish-national-fund-usa-jnf-usa': 1901,
  'jim-joseph-foundation': 2006,
  'klarman-family-foundation': 2011,
  'magen-david-adom-usa': 1940,
  'maimonides-fund': 2005,
  'marcus-foundation': 1989,
  'nefesh-b-nefesh': 2002,
  'one-israel-fund': 1994,
  'pritzker-foundation': 1996,
  'ronald-s-lauder-foundation': 1987,
  'tikva-fund': 2008,
  'yad-sarah': 1976,
  'birthright-israel-foundation': 1999,
  'united-jewish-appeal-uja': 1939,
  'united-jewish-communities-now-jewish-federations-of-north-america': 1999,
  'jewish-federation-of-greater-los-angeles': 1911,
  'uja-federation-of-new-york': 1917,
  'jewish-united-fund-metropolitan-chicago': 1900,
  'keren-hayesod': 1920,
  'american-jewish-world-service-ajws': 1985,
  'jnf-keren-kayemeth-leisrael': 1901,
  'joint-distribution-committee-israel': 1914,

  // === COMMUNITY & UMBRELLA ===
  'b-nai-b-rith-international': 1843,
  'kraft-group': 1998,
  'loews-corporation': 1946,
  'jewish-community-centers-association-of-north-america': 1917,
  'hillel-international': 1923,
  'chabad-lubavitch': 1775,
  'world-jewish-congress': 1936,
  'world-zionist-organization': 1897,
  'board-of-deputies-of-british-jews': 1760,
  'jewish-care': 1990,
  'community-security-trust-cst': 1994,
  'jewish-leadership-council': 2003,
  'jewish-board-of-deputies-south-africa': 1903,
  'consistoire-central-israelite-de-france': 1808,
  'crif-representative-council-of-french-jewish-institutions': 1944,
  'central-council-of-jews-in-germany': 1950,
  'federacion-de-comunidades-judias-de-espana': 1968,
  'daia-delegacion-de-asociaciones-israelitas-argentinas': 1935,
  'federacao-israelita-do-estado-de-sao-paulo-fisesp': 1946,
  'executive-council-of-australian-jewry-ecaj': 1944,
  'canadian-jewish-congress': 1919,

  // === HERITAGE & MUSEUMS ===
  'center-for-jewish-history': 1999,
  'museum-of-jewish-heritage-a-living-memorial-to-the-holocaust': 1997,
  'national-museum-of-american-jewish-history': 1976,
  'skirball-cultural-center': 1996,
  'the-jewish-museum-new-york': 1904,
  'united-states-holocaust-memorial-museum': 1993,
  'yad-vashem': 1953,
  'israel-museum': 1965,
  'jewish-museum-london': 1932,
  'jewish-museum-berlin': 2001,
  'beit-hatfutsot-museum-of-the-jewish-people': 1978,
  'auschwitz-jewish-center': 2000,
  'polin-museum-of-the-history-of-polish-jews': 2013,
  'cape-town-holocaust-genocide-centre': 1999,

  // === EDUCATION & ACADEMIA ===
  'albert-einstein-college-of-medicine': 1955,
  'brandeis-university': 1948,
  'camp-ramah': 1947,
  'camp-young-judaea': 1939,
  'the-hebrew-university-of-jerusalem': 1918,
  'technion-israel-institute-of-technology': 1912,
  'weizmann-institute-of-science': 1934,
  'ben-gurion-university-of-the-negev': 1969,
  'tel-aviv-university': 1956,
  'bar-ilan-university': 1955,
  'haifa-university': 1963,
  'reichman-university-idc-herzliya': 1994,
  'yeshiva-university': 1886,
  'touro-college': 1970,
  'pardes-institute-of-jewish-studies': 1972,
  'ohr-somayach': 1970,
  'machon-meir': 1974,
  'shalom-hartman-institute': 1976,
  'jewish-theological-seminary-of-america': 1887,
  'hebrew-union-college-jewish-institute-of-religion': 1875,
  'mass-challenge-israel': 2016,
  'limmud': 1980,

  // === TECHNOLOGY ===
  'check-point-software-technologies': 1993,
  'wix-com': 2006,
  'mobileye': 1999,
  'nice-systems': 1986,
  'cyberark': 1999,
  'fiverr': 2010,
  'monday-com': 2012,
  'ironsource-now-unity': 2010,
  'waze': 2006,
  'mellanox-technologies-now-nvidia': 1999,
  'amdocs': 1982,
  'sapiens-international': 1982,
  'tower-semiconductor': 1993,
  'elbit-systems': 1966,
  'iai-israel-aerospace-industries': 1953,
  'rafael-advanced-defense-systems': 1948,
  'israel-innovation-authority': 1974,
  'start-up-nation-central': 2013,

  // === MEDIA & ENTERTAINMENT ===
  'the-times-of-israel': 2012,
  'haaretz': 1918,
  'the-jerusalem-post': 1932,
  'the-jewish-chronicle': 1841,
  'the-forward': 1897,
  'the-algemeiner': 1972,
  'jta-jewish-telegraphic-agency': 1917,
  'tablet-magazine': 2009,
  'warner-bros-discovery': 1923,
  'paramount-global': 1912,
  'universal-music-group': 1934,
  'dreamworks-animation': 1994,
  'lionsgate-entertainment-co-founded': 1997,
  'comcast-nbcuniversal': 1963,
  'the-walt-disney-company-leadership': 1923,
  'viacomcbs-now-paramount': 1952,
  'mgm-holdings': 1924,
  'spyglass-media-group': 1998,
  'a24-films': 2012,
  'the-weinstein-company-dissolved': 2005,
  'channel-12-israel': 1993,
  'channel-13-israel': 2017,
  'kan-israeli-public-broadcasting-corporation': 2017,
  'ynetnews-yedioth-ahronoth-group': 1939,
  'i24news': 2013,
  'the-jewish-news-uk': 1997,

  // === REAL ESTATE ===
  'brookfield-asset-management': 1899,
  'related-companies': 1972,
  'vornado-realty-trust': 1982,
  'sl-green-realty': 1980,
  'mack-real-estate-group': 1960,
  'silverstein-properties': 1957,
  'boston-properties': 1970,
  'tishman-speyer': 1978,
  'lefrak-organization': 1901,
  'rudin-management-company': 1925,
  'durst-organization': 1915,
  'africa-israel-investments': 1934,

  // === RETAIL & CONSUMER ===
  'estee-lauder-companies': 1946,
  'ralph-lauren-corporation': 1967,
  'levi-strauss-co': 1853,
  'calvin-klein-pvh-corp': 1968,
  'michael-kors-capri-holdings': 1981,
  'marc-jacobs': 1986,
  'tory-burch': 2004,
  'bed-bath-beyond-closed': 1971,
  'starbucks-howard-schultz-era': 1971,
  'costco-wholesale-co-founded': 1983,
  'home-depot-co-founded': 1978,
  'staples-inc-co-founded': 1985,

  // === HEALTHCARE ===
  'teva-pharmaceutical-industries': 1901,
  'mylan-now-viatris-co-founded': 1961,
  'regeneron-pharmaceuticals': 1988,
  'moderna-co-founded': 2010,
  'illumina-co-founded': 1998,

  // === FOOD & BEVERAGE ===
  'strauss-group': 1933,
  'osem-nestle': 1942,
  'tnuva': 1926,
  'elite-strauss-formerly': 1933,

  // === LAW FIRMS ===
  'skadden-arps-slate-meagher-flom': 1948,
  'wachtell-lipton-rosen-katz': 1965,
  'paul-weiss-rifkind-wharton-garrison': 1875,
  'sullivan-cromwell': 1879,
  'greenberg-traurig': 1967,

  // === SPORTS ===
  'maccabi-tel-aviv-fc': 1906,
  'maccabi-haifa-fc': 1913,
  'hapoel-tel-aviv-fc': 1927,
  'beitar-jerusalem-fc': 1936,
  'maccabi-tel-aviv-basketball': 1932,
  'maccabiah-games': 1932,

  // === DEFENSE & SECURITY ===
  'israel-defense-forces-idf': 1948,

  // === GOVERNMENT ===
  'knesset': 1949,
  'supreme-court-of-israel': 1948,
  'jewish-agency-for-israel': 1929,
  'world-ort': 1880,

  // === RESEARCH & THINK TANKS ===
  'institute-for-national-security-studies-inss': 2006,
  'jewish-people-policy-institute-jppi': 2002,
  'jerusalem-center-for-public-affairs': 1976,
  'shalem-center': 1994,
  'brookings-institution-center-for-middle-east-policy': 2002,
  'washington-institute-for-near-east-policy': 1985,
  'pew-research-center-religion-public-life': 2001,

  // === CONGLOMERATES ===
  'idb-holding-corporation': 1969,
  'discount-investment-corporation': 1961,
  'israel-corp': 1968,
  'delek-group': 1951,

  // === INTERNATIONAL / EUROPEAN ===
  'jewish-museum-and-tolerance-center-moscow': 2012,
  'masorti-olami': 1957,
  'ohr-torah-stone': 1983,
  'european-jewish-congress': 1986,
  'lauder-business-school-vienna': 2003,
  'jdc-fsu': 1914,

  // === AFRICA ===
  'igbo-jewish-community-association': 1996,
  'kenya-jewish-community': 1903,
  'jewish-community-of-ghana': 2001,
  'jewish-community-of-tanzania': 2000,
  'jewish-community-of-madagascar': 2010,

  // === ASIA & PACIFIC ===
  'jewish-community-of-singapore': 1878,
  'jewish-community-of-thailand': 1890,
  'jewish-community-of-south-korea': 1950,
  'jewish-community-of-the-philippines': 1870,
  'jewish-community-of-vietnam': 2006,
  'jewish-community-of-myanmar': 1850,
  'jewish-community-of-new-zealand': 1843,

  // === LATIN AMERICA ===
  'jewish-community-of-chile': 1909,
  'jewish-community-of-colombia': 1930,
  'jewish-community-of-peru': 1870,
  'jewish-community-of-ecuador': 1938,
  'jewish-community-of-venezuela': 1907,
  'jewish-community-of-costa-rica': 1930,
  'jewish-community-of-guatemala': 1920,
  'jewish-community-of-cuba': 1906,

  // === EASTERN EUROPE ===
  'jewish-community-of-romania': 1860,
  'jewish-community-of-finland': 1858,
  'jewish-community-of-bulgaria': 1878,
  'jewish-community-of-croatia': 1806,
  'jewish-community-of-serbia': 1801,
  'jewish-community-of-ireland': 1822,

  // === ADDITIONAL NOTABLE ORGS ===
  'friends-of-israel-defense-forces-fidf-gala': 1981,
  'birthright-israel-taglit': 1999,
  'masa-israel-journey': 2004,
  'onward-israel': 2012,
  'israel-bonds': 1951,
  'jewish-community-federation-san-francisco': 1910,
  'jewish-federation-of-cleveland': 1903,
  'jewish-federation-of-south-florida': 1936,

  // === ADVERTISING & PR ===
  'publicis-groupe': 1926,
  'interpublic-group': 1930,
  'wpp-group-leadership': 1985,

  // === TRANSPORTATION ===
  'el-al-israel-airlines': 1948,
  'zim-integrated-shipping-services': 1945,

  // === TELECOMS ===
  'partner-communications-orange-israel': 1998,
  'bezeq': 1984,
  'cellcom-israel': 1994,

  // === ENERGY ===
  'delek-energy-systems': 1951,
  'israel-electric-corporation': 1923,
};

let updated = 0;
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    if (!entry.founded && foundingYears[entry.id]) {
      entry.founded = foundingYears[entry.id];
      updated++;
    }
  }
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// Count totals
let withFounded = 0, withoutFounded = 0;
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    if (entry.founded) withFounded++;
    else withoutFounded++;
  }
}

console.log(`Updated ${updated} entries with founding years.`);
console.log(`Entries with founded year: ${withFounded}, without: ${withoutFounded}`);
console.log(`Total entries: ${withFounded + withoutFounded}`);
