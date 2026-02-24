/**
 * addFoundingYears2.js - Mass enrichment with correct IDs
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'jewish.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const foundingYears = {
  // EDUCATION
  'charles-e-smith-jewish-day-school-dc': 1965,
  'heschel-school-nyc': 1983,
  'jewish-theological-seminary-jts': 1887,
  'milken-community-school-la': 1990,
  'ort-america': 1922,
  'pj-library': 2005,
  'ramaz-school-nyc': 1937,
  'sar-academy-high-school': 1969,
  'solomon-schechter-day-schools': 1957,
  'urj-camp-newman-camp-george': 1947,

  // MEDIA & ENTERTAINMENT
  '20th-century-fox-historic-founding': 1935,
  'a-m-records-historic': 1962,
  'alfred-a-knopf': 1915,
  'atlantic-records': 1947,
  'bloomberg-l-p': 1981,
  'breitbart-news': 2007,
  'caa-creative-artists-agency': 1975,
  'columbia-pictures-historic-founding': 1918,
  'commentary-magazine': 1945,
  'cond-nast': 1909,
  'dc-comics-legacy': 1934,
  'elektra-records': 1950,
  'geffen-records': 1980,
  'haim-saban-saban-capital-group': 2001,
  'iac-interactivecorp': 1995,
  'iheartmedia': 1972,
  'interscope-records': 1990,
  'jewish-telegraphic-agency-jta': 1917,
  'lionsgate-entertainment': 1997,
  'lionsgate-films': 1997,
  'marvel-entertainment-legacy': 1939,
  'mgm-studios-historic': 1924,
  'moment-magazine': 1975,
  'nbcuniversal-comcast': 1926,
  'netflix': 1997,
  'paramount-pictures-historic-founding': 1912,
  'random-house-penguin-random-house': 1927,
  'scholastic-corporation': 1920,
  'simon-schuster': 1924,
  'sony-music-legacy': 1929,
  'the-forward-newspaper': 1897,
  'the-jewish-daily-forward-yiddish-forverts': 1897,
  'the-new-york-times-company': 1851,
  'the-times-of-israel-us-bureau': 2012,
  'the-walt-disney-company': 1923,
  'the-washington-post': 1877,
  'universal-music-group-us-operations': 1934,
  'universal-pictures-historic-founding': 1912,
  'viacomcbs-paramount-global': 1952,
  'warner-bros-pictures-historic-founding': 1923,
  'warner-music-group': 2004,
  'wme-william-morris-endeavor': 1898,
  'notable-jewish-entertainers-us': null,
  'notable-jewish-media-executives-us': null,
  'notable-jewish-philanthropists-us': null,
  'notable-jewish-political-figures-us': null,
  'notable-jewish-scientists-intellectuals-us': null,

  // FASHION & CONSUMER
  'donna-karan-dkny': 1984,
  'est-e-lauder-companies': 1946,
  'marc-jacobs-international': 1986,
  'revlon': 1932,

  // FOOD & BEVERAGE
  'h-agen-dazs': 1960,
  'kind-snacks': 2004,
  'manischewitz': 1888,
  'nathan-s-famous': 1916,
  'sabra-hummus': 1986,
  'snapple': 1972,
  'starbucks': 1971,

  // HEALTHCARE
  'cedars-sinai-medical-center': 1902,
  'maimonides-medical-center': 1911,
  'moderna': 2010,
  'moderna-israeli-connections': 2010,
  'montefiore-medical-center': 1884,
  'mount-sinai-health-system': 1852,
  'northwell-health-formerly-north-shore-lij': 1997,
  'pfizer': 1849,
  'taro-pharmaceutical-industries-us': 1959,
  'teva-pharmaceutical-us-operations': 1901,
  'valeant-bausch-health': 1959,

  // FINANCE
  'andreessen-horowitz-a16z': 2009,
  'bear-stearns-historic': 1923,
  'bridgewater-associates': 1975,
  'd-e-shaw-co': 1988,
  'goldman-sachs-historic': 1869,
  'kuhn-loeb-co-historic': 1867,
  'lehman-brothers-historic': 1850,
  'och-ziff-capital-management-sculptor-capital': 1994,
  'pershing-square-capital-management': 2003,
  'sac-capital-advisors-point72': 1992,
  'salomon-brothers-historic': 1910,
  'sequoia-capital': 1972,
  'the-blackstone-group': 1985,
  'third-point-llc': 1995,
  'tiger-global-management': 2001,

  // LAW
  'fried-frank-harris-shriver-jacobson': 1971,
  'kasowitz-benson-torres': 1993,
  'proskauer-rose': 1875,
  'schulte-roth-zabel': 1969,

  // REAL ESTATE
  'brookfield-properties-ric-clark': 1899,
  'extell-development-company': 1989,
  'forest-city-realty-brookfield': 1920,
  'kushner-companies': 1985,
  'mack-cali-realty-veris-residential': 1949,
  'rudin-management': 1925,
  'rxr-realty': 2007,
  'simon-property-group': 1993,
  'sl-green-realty-corp': 1980,
  'wework': 2010,
  'zeckendorf-development': 2005,

  // RELIGIOUS ORGS
  'agudath-israel-of-america': 1922,
  'central-conference-of-american-rabbis-ccar': 1889,
  'congregation-beth-elohim-brooklyn': 1861,
  'congregation-shearith-israel-nyc': 1654,
  'kehilath-jeshurun-nyc': 1872,
  'orthodox-union-ou': 1898,
  'rabbinical-assembly': 1901,
  'rabbinical-council-of-america-rca': 1935,
  'temple-emanu-el-new-york': 1845,
  'touro-synagogue-newport-ri': 1763,
  'union-for-reform-judaism-urj': 1873,
  'united-synagogue-of-conservative-judaism': 1913,
  'wilshire-boulevard-temple-los-angeles': 1862,
  'young-israel-movement': 1912,

  // PHILANTHROPY
  'combined-jewish-philanthropies-boston': 1895,
  'hias-hebrew-immigrant-aid-society': 1881,
  'jewish-federations-of-north-america-jfna': 1999,
  'jewish-united-fund-of-metropolitan-chicago': 1900,

  // THINK TANKS
  'american-enterprise-institute-aei': 1938,
  'brookings-institution': 1916,
  'council-on-foreign-relations': 1921,
  'foundation-for-defense-of-democracies-fdd': 2001,
  'hudson-institute': 1961,
  'jewish-institute-for-national-security-of-america-jinsa': 1976,
  'middle-east-forum': 1990,
  'middle-east-media-research-institute-memri': 1998,
  'washington-institute-for-near-east-policy-winep': 1985,
  'yivo-institute-for-jewish-research': 1925,

  // RETAIL
  'bed-bath-beyond-historic': 1971,
  'bloomingdale-s': 1861,
  'costco-wholesale': 1983,
  'gap-inc': 1969,
  'home-depot': 1978,
  'las-vegas-sands-corp': 1988,
  'macy-s-federated-department-stores': 1858,
  'neiman-marcus': 1907,
  'sears-roebuck-historic': 1892,
  'staples': 1985,
  'toys-r-us-historic': 1948,

  // SPORTS (ownership dates approximate)
  'anaheim-ducks-henry-samueli': 2005,
  'atlanta-hawks-tony-ressler': 2015,
  'boston-celtics-wyc-grousbeck': 2002,
  'brooklyn-nets-formerly-ratner': 2004,
  'carolina-hurricanes-tom-dundon': 2018,
  'cleveland-cavaliers-dan-gilbert': 2005,
  'cleveland-guardians-larry-dolan': 2000,
  'dallas-mavericks-mark-cuban': 2000,
  'golden-state-warriors-joe-lacob': 2010,
  'las-vegas-raiders-mark-davis': 2011,
  'los-angeles-clippers-steve-ballmer': 2014,
  'miami-dolphins-stephen-ross': 2009,
  'milwaukee-bucks-wes-edens-marc-lasry': 2014,
  'minnesota-timberwolves-glen-taylor-marc-lore-alex-rodriguez': 2021,
  'new-england-patriots-kraft-group': 1994,
  'new-york-giants-tisch-mara': 1991,
  'new-york-mets-steve-cohen': 2020,
  'philadelphia-76ers-harris-blitzer': 2011,
  'phoenix-suns-mat-ishbia': 2023,
  'tampa-bay-lightning-jeff-vinik': 2010,
  'washington-commanders-josh-harris': 2023,

  // TECH
  'airbnb': 2008,
  'akamai-technologies': 1998,
  'amazon-israel-r-d': 1994,
  'apple-israel-r-d': 1976,
  'broadcom-inc': 1991,
  'crowdstrike': 2011,
  'dell-technologies': 1984,
  'dell-technologies-israel-operations': 1984,
  'fiverr-us-operations': 2010,
  'google-alphabet-inc': 1998,
  'intel-corporation': 1968,
  'meta-platforms-facebook': 2004,
  'microsoft-israel-r-d': 1975,
  'nvidia-corporation': 1993,
  'openai': 2015,
  'oracle-israel-operations': 1977,
  'oracle-corporation': 1977,
  'palantir-technologies': 2003,
  'palo-alto-networks': 2005,
  'qualcomm': 1985,
  'salesforce': 1999,
  'uber-technologies': 2009,
  'wix-com-us-operations': 2006,
  'zoom-video-communications': 2011,

  // ISRAEL
  'bank-of-israel': 1954,
  'lemonade-inc': 2015,
  'payoneer': 2005,
  'keren-kayemeth-leisrael-jewish-national-fund': 1901,
  'idb-holdings': 1969,
  'habima-national-theatre': 1917,
  'israel-philharmonic-orchestra': 1936,
  'tel-aviv-museum-of-art': 1932,
  'candiru-saito-tech': 2014,
  'cellebrite': 1999,
  'israel-aerospace-industries-iai': 1953,
  'israel-military-industries-imi-systems': 1933,
  'mossad-institute-for-intelligence-and-special-operations': 1949,
  'nso-group': 2010,
  'shin-bet-israel-security-agency': 1949,
  'talpiot-program': 1979,
  'unit-8200': 1952,
  'verint-systems': 2002,
  'university-of-haifa': 1963,
  'channel-12-keshet': 1993,
  'channel-13-reshet': 2017,
  'galei-zahal-idf-radio': 1950,
  'israel-hayom': 2007,
  'playtika': 2010,
  'walla-news': 1998,
  'yedioth-ahronoth': 1939,
  'ahava-dead-sea-laboratories': 1988,
  'sodastream': 1903,
  'sodastream-israel': 1903,
  'israeli-wine-industry': 1882,
  'netafim': 1965,
  'osem-nestl': 1942,
  'israel-airports-authority': 1977,
  'israel-lands-authority': 1960,
  'israel-tax-authority': 1948,
  'knesset-israeli-parliament': 1949,
  'ministry-of-defense': 1948,
  'ministry-of-foreign-affairs': 1948,
  'nefesh-b-nefesh-israel': 2002,
  'prime-minister-s-office': 1948,
  'biontech-pfizer-israel-partnership': 2008,
  'given-imaging-medtronic': 1998,
  'hadassah-medical-center': 1934,
  'taro-pharmaceutical-israel': 1959,
  'masada-national-park': 1966,
  'icl-group': 1968,
  'israel-chemicals-ltd-icl': 1968,
  'azrieli-group': 1999,
  'gazit-globe': 1998,
  'jewish-national-fund-keren-kayemeth-leisrael-kkl-jnf': 1901,
  'cave-of-the-patriarchs-hebron': null,
  'church-of-the-holy-sepulchre-jerusalem': 335,
  'temple-mount-haram-al-sharif': null,
  'western-wall-heritage-foundation': 1988,
  'world-jewish-congress-israel-office': 1936,
  'start-up-nation-ecosystem': 2013,
  'appsflyer': 2011,
  'fiverr-international': 2010,
  'habana-labs-intel': 2016,
  'ide-technologies': 1965,
  'innoviz-technologies': 2016,
  'ironsource-merged-with-unity': 2010,
  'ironsource-unity': 2010,
  'jfrog': 2008,
  'mellanox-technologies-nvidia': 1999,
  'mobileye-global': 1999,
  'nice-ltd': 1986,
  'orbotech-kla': 1981,
  'orcam-technologies': 2010,
  'outbrain': 2006,
  'sentinelone': 2013,
  'snyk': 2015,
  'storedot': 2012,
  'taboola': 2007,
  'varonis-systems': 2004,
  'walkme': 2011,
  'watergen': 2009,
  'bezeq-israel-telecom': 1984,
  'gett': 2010,
  'mobileye-intel': 1999,
  'ree-automotive': 2011,
  'via-transportation': 2012,
  'iec-israel-electric-corporation': 1923,
  'mekorot': 1937,
  'solaredge-technologies': 2006,

  // UK
  'freuds-communications': 1986,
  'saatchi-saatchi': 1970,
  'wpp-plc': 1985,
  'campaign-against-antisemitism': 2014,
  'plus500': 2008,
  'dangoor-family-exilarch-s-foundation': 1978,
  'kindertransport-association-uk': 1999,
  'pears-foundation': 1992,
  'the-rothschild-foundation': 1971,
  'world-jewish-relief': 1933,
  'manchester-jewish-museum': 1984,
  'uk-jewish-film-festival': 1997,
  'jews-college-heythrop-association': 1855,
  'jews-free-school-jfs': 1732,
  'leo-baeck-college': 1956,
  'london-school-of-jewish-studies-lsjs': 1956,
  'union-of-jewish-students-ujs': 1919,
  '888-holdings': 1997,
  'entain-formerly-gvc-holdings': 2004,
  'jewish-chronicle': 1841,
  'jewish-news': 1997,
  'the-rothschild-archive': 1978,
  'wiener-holocaust-library': 1933,
  'n-m-rothschild-sons': 1811,
  'bevis-marks-synagogue': 1701,
  'office-of-the-chief-rabbi': 1704,
  'united-synagogue': 1870,
  'institute-for-jewish-policy-research-jpr': 1941,
  'arcadia-group-topshop-philip-green': 2002,
  'marks-spencer': 1884,
  'marks-spencer-m-s': 1884,
  'tesco-jack-cohen-legacy': 1919,
  'chelsea-football-club-abramovich-era': 2003,
  'tottenham-hotspur-f-c': 1882,

  // FRANCE
  'bureau-national-de-vigilance-contre-l-antis-mitisme-bnvca': 2002,
  'fondation-pour-la-m-moire-de-la-shoah': 2000,
  'keren-hayesod-france': 1920,
  'ose-uvre-de-secours-aux-enfants': 1912,
  'fonds-social-juif-unifi-fsju': 1950,
  'bpifrance-french-israeli-business-networks': 2012,
  'm-morial-de-la-shoah-paris': 2005,
  'dassault-group': 1929,
  'spcj-service-de-protection-de-la-communaut-juive': 1980,
  'alliance-isra-lite-universelle': 1860,
  'institut-europ-en-emmanuel-levinas': 2000,
  'uejf-union-of-jewish-students-of-france': 1944,
  'radio-j-radio-shalom': 1981,
  'sodexo-israel-operations': 1966,
  'drancy-internment-camp-memorial': 2012,
  'rothschild-co-france': 1838,
  'essilor-dassault-connection': 1849,
  'consistoire-central-isra-lite-de-france': 1808,
  'grand-synagogue-of-paris-la-victoire': 1874,
  'synagogue-de-la-victoire-paris': 1874,
  'crif-conseil-repr-sentatif-des-institutions-juives-de-france': 1944,

  // CANADA
  'b-nai-brith-canada': 1875,
  'centre-for-israel-and-jewish-affairs-cija': 2004,
  'friends-of-simon-wiesenthal-center-canada': 2003,
  'canaccord-genuity': 1950,
  'canadian-jewish-congress-historical': 1919,
  'bronfman-family-seagram-company': 1857,
  'canadian-museum-for-human-rights': 2014,
  'montreal-holocaust-museum': 1979,
  'vancouver-holocaust-education-centre': 1994,
  'munk-school-of-global-affairs-u-of-toronto': 2010,
  'canadian-jewish-news': 1960,
  'mount-sinai-hospital-toronto': 1923,
  'toronto-hebrew-memorial-park': 1951,
  'onex-corporation': 1984,
  'barrick-gold-peter-munk': 1983,
  'reichmann-family-olympia-york': 1955,
  'federation-cja-montreal': 1917,
  'jewish-federations-of-canada-uia': 1998,
  'uja-federation-of-greater-toronto': 1917,
  'indigo-books-music': 1996,

  // AUSTRALIA
  'zionist-federation-of-australia': 1927,
  'pratt-foundation': 1978,
  'jewish-community-council-of-victoria-jccv': 1938,
  'jewish-museum-of-australia': 1982,
  'sydney-jewish-museum': 1992,
  'moriah-college-sydney': 1943,
  'mount-scopus-memorial-college': 1949,
  'the-australian-jewish-news': 1895,
  'visy-industries-anthony-pratt': 1948,
  'meriton-harry-triguboff': 1963,
  'westfield-corporation-scentre-unibail': 1959,
  'nsw-jewish-board-of-deputies': 1945,
  'australia-israel-jewish-affairs-council-aijac': 1997,
  'lowy-institute': 2003,

  // GERMANY
  'zentralwohlfahrtsstelle-der-juden-in-deutschland': 1917,
  'j-dische-gemeinde-zu-berlin-jewish-community-of-berlin': 1671,
  'abraham-geiger-college': 1999,
  'axel-springer-se': 1946,
  'j-dische-allgemeine': 1946,
  'memorial-to-the-murdered-jews-of-europe': 2005,
  'sachsenhausen-memorial': 1961,
  'stolpersteine-stumbling-stones': 1992,
  'allgemeine-rabbinerkonferenz-general-rabbinical-conference': 2004,
  'neue-synagoge-berlin': 1866,
  'zentralrat-der-juden-in-deutschland-central-council-of-jews-in-germany': 1950,
  'leo-baeck-institute-germany': 1955,
  'moses-mendelssohn-center-for-european-jewish-studies': 1992,
  'zalando': 2008,
  'european-maccabi-games': 2011,

  // RUSSIA
  'russian-jewish-congress': 1996,
  'alfa-bank-alfa-group': 1990,
  'renova-group-viktor-vekselberg': 1990,
  'gorbi-jewish-heritage-research-group': 2000,
  'letterone-mikhail-fridman': 2013,
  'nornickel-vladimir-potanin': 1935,
  'rusal-oleg-deripaska': 2000,
  'russian-aluminum-rusal': 2000,
  'chief-rabbinate-of-russia': 1990,
  'grand-choral-synagogue-st-petersburg': 1893,
  'moscow-choral-synagogue': 1891,
  'synagogue-on-bolshaya-bronnaya-moscow': 1883,
  'federation-of-jewish-communities-of-russia-fjcr': 1999,
  'yandex-israeli-r-d': 2011,
  'jewish-museum-and-tolerance-center-moscow': 2012,

  // ARGENTINA
  'amia-asociaci-n-mutual-israelita-argentina': 1894,
  'sociedad-hebraica-argentina': 1926,
  'grupo-werthein': 1945,
  'buenos-aires-jewish-museum': 1967,
  'museo-del-holocausto-buenos-aires': 2000,
  'ort-argentina': 1937,
  'seminario-rab-nico-latinoamericano': 1962,
  'buenos-aires-herald-jewish-community-media': 1876,
  'beit-el-congregation-buenos-aires': 1932,
  'templo-libertad-buenos-aires': 1897,
  'daia-delegaci-n-de-asociaciones-israelitas-argentinas': 1935,

  // BRAZIL
  'banco-safra': 1955,
  'safra-group': 1955,
  'club-hebraica-s-o-paulo': 1953,
  'museu-judaico-de-s-o-paulo': 2021,
  'museu-judaico-do-rio-de-janeiro': 1977,
  'albert-einstein-hospital-hospital-israelita-albert-einstein': 1955,
  'congrega-o-israelita-paulista': 1936,
  'congrega-o-israelita-paulista-cip': 1936,
  'confedera-o-israelita-do-brasil-conib': 1951,
  'federa-o-israelita-do-estado-de-s-o-paulo-fisesp': 1946,

  // SOUTH AFRICA
  'south-african-friends-of-israel': 1972,
  'south-african-zionist-federation': 1898,
  'discovery-limited': 1992,
  'investec': 1974,
  'liberty-group-donald-gordon': 1957,
  'johannesburg-holocaust-genocide-centre': 2008,
  'herzlia-school-cape-town': 1940,
  'king-david-schools': 1948,
  'ort-south-africa': 1936,
  'naspers': 1915,
  'south-african-jewish-report': 1998,
  'anglo-american-oppenheimer-legacy': 1917,
  'de-beers-oppenheimer-family-legacy': 1888,
  'chief-rabbi-of-south-africa': 1933,
  'south-african-jewish-board-of-deputies-sajbd': 1903,

  // INDIA
  'the-jewish-club-mumbai': 1886,
  'sassoon-family-legacy': 1832,
  'bene-israel-heritage-museum-mumbai': 2003,
  'chabad-house-mumbai': 2003,
  'knesset-eliyahoo-synagogue-mumbai': 1884,
  'paradesi-synagogue-kochi': 1568,
  'central-jewish-board-of-india': 1972,

  // MEXICO
  'tribuna-israelita': 1937,
  'museo-memoria-y-tolerancia': 2010,
  'colegio-hebreo-maguen-david': 1942,
  'grupo-televisa-jewish-connections': 1973,
  'kidzania': 1999,
  'comit-central-de-la-comunidad-jud-a-de-m-xico': 1938,

  // HUNGARY
  'hungarian-jewish-museum': 1916,
  'ort-hungary': 1945,
  'hungarian-jewish-heritage-foundation': 1992,
  'raoul-wallenberg-memorial': 1987,
  'shoes-on-the-danube-bank': 2005,
  'doh-ny-street-synagogue-budapest': 1859,
  'federation-of-hungarian-jewish-communities-mazsihisz': 1950,

  // AUSTRIA
  'israelitische-kultusgemeinde-wien-jewish-community-of-vienna': 1852,
  'jewish-museum-vienna': 1895,
  'sigmund-freud-museum-vienna': 1971,
  'mauthausen-memorial': 1949,
  'stadttempel-vienna-city-temple': 1826,

  // NETHERLANDS
  'anne-frank-house': 1957,
  'jewish-historical-museum-amsterdam': 1932,
  'national-holocaust-museum-amsterdam': 2024,
  'westerbork-transit-camp-memorial': 1983,
  'nik-nederlands-isra-litisch-kerkgenootschap': 1814,
  'portuguese-synagogue-of-amsterdam': 1675,

  // BELGIUM
  'antwerp-jewish-community': 1830,
  'jewish-museum-of-belgium-brussels': 1990,
  'kazerne-dossin-memorial-mechelen': 2012,
  'antwerp-diamond-district': 1447,
  'coordinating-committee-of-jewish-organisations-in-belgium-ccojb': 1971,

  // SWITZERLAND
  'b-nai-b-rith-international-geneva-office': 1843,
  'bergier-commission-legacy': 1996,
  'international-committee-of-the-red-cross-jewish-relationship': 1863,
  'swiss-federation-of-jewish-communities-sig-fsci': 1904,
  'world-health-organization-israeli-connections': 1948,
  'world-jewish-congress-headquarters': 1936,

  // ITALY
  'community-of-sant-egidio-jewish-dialogue': 1968,
  'jewish-museum-of-bologna': 1999,
  'jewish-museum-of-rome': 1960,
  'venice-ghetto': 1516,
  'great-synagogue-of-rome': 1904,
  'synagogue-of-florence-tempio-maggiore': 1882,
  'union-of-italian-jewish-communities-ucei': 1930,

  // SPAIN
  'federation-of-jewish-communities-of-spain-additional': 1968,
  'casa-sefarad-israel-madrid': 2006,
  'museum-of-sephardic-heritage-toledo': 1971,
  'c-rdoba-synagogue': 1315,
  'federation-of-jewish-communities-of-spain': 1968,

  // POLAND
  'jewish-community-centre-of-krakow-jcc-krak-w': 2008,
  'galicia-jewish-museum-krakow': 2004,
  'museum-of-the-history-of-polish-jews-polin-additional-programs': 2013,
  'auschwitz-birkenau-memorial-and-museum': 1947,
  'majdanek-state-museum': 1944,
  'treblinka-memorial': 1964,
  'warsaw-ghetto-memorial': 1948,
  'tykocin-synagogue': 1642,
  'union-of-jewish-communities-in-poland': 2003,

  // CZECH
  'jewish-museum-in-prague': 1906,
  'old-jewish-cemetery-prague': 1439,
  'pinkas-synagogue-prague-holocaust-memorial': 1535,
  'terez-n-memorial': 1947,
  'federation-of-jewish-communities-in-the-czech-republic': 1991,

  // UKRAINE
  'menorah-center-dnipro': 2012,
  'united-jewish-community-of-ukraine': 1999,
  'babyn-yar-holocaust-memorial-center': 2016,
  'golden-rose-synagogue-lviv-ruins': 1582,
  'uman-breslov-pilgrimage': 1811,
  'jewish-confederation-of-ukraine': 1999,

  // TURKEY
  'turkish-jewish-community': 1492,
  'quincentennial-foundation-museum-istanbul': 2001,
  'ahrida-synagogue-istanbul': 1430,
  'chief-rabbinate-of-turkey': 1835,
  'neve-shalom-synagogue-istanbul': 1951,

  // MOROCCO
  'bayt-dakira-house-of-memory-essaouira': 2020,
  'museum-of-moroccan-judaism-casablanca': 1997,
  'casablanca-jewish-heritage-trail': 2016,
  'rabbi-haim-pinto-synagogue-essaouira': 1800,
  'council-of-jewish-communities-of-morocco': 1947,

  // IRAN
  'tehran-jewish-committee': 1945,

  // ETHIOPIA
  'beta-israel-community-organizations': 1955,
  'operation-solomon-memorial': 1991,
  'north-shewa-synagogue': 1850,

  // JAPAN
  'jewish-community-of-japan': 1861,
  'kobe-jewish-community': 1935,
  'sugihara-museum-yaotsu': 2000,

  // CHINA
  'shanghai-jewish-refugees-museum': 2007,
  'kaifeng-jewish-community': 960,
  'sassoon-house-shanghai': 1929,
  'ohel-rachel-synagogue-shanghai': 1920,

  // SINGAPORE
  'united-hebrew-congregation-of-singapore': 1878,

  // PANAMA
  'kol-shearith-israel': 1876,

  // URUGUAY
  'comit-central-israelita-del-uruguay': 1940,

  // CHILE
  'comunidad-jud-a-de-chile': 1909,

  // COLOMBIA
  'confederaci-n-de-comunidades-jud-as-de-colombia': 1930,

  // NEW ZEALAND
  'new-zealand-jewish-council': 1939,

  // SWEDEN
  'jewish-museum-stockholm': 1987,
  'great-synagogue-of-stockholm': 1870,
  'official-council-of-swedish-jewish-communities': 1952,
  'raoul-wallenberg-institute': 1984,

  // DENMARK
  'jewish-community-of-denmark': 1684,
  'danish-jewish-museum-copenhagen': 2004,
  'rescue-of-danish-jews-1943': 1943,
  'great-synagogue-of-copenhagen': 1833,

  // NORWAY
  'jewish-community-of-oslo': 1892,
  'center-for-studies-of-the-holocaust-and-religious-minorities-hl-senteret': 2001,
  'jewish-museum-trondheim': 1997,

  // FINLAND
  'central-council-of-jewish-communities-in-finland': 1918,

  // GREECE
  'romaniote-jewish-community': null, // ancient community
  'jewish-museum-of-greece': 1977,
  'jewish-museum-of-thessaloniki': 2001,
  'holocaust-memorial-of-thessaloniki': 1997,
  'central-board-of-jewish-communities-in-greece': 1945,

  // ROMANIA
  'federation-of-jewish-communities-in-romania': 1948,

  // HONG KONG
  'jewish-historical-society-of-hong-kong': 1984,
  'ohel-leah-synagogue': 1901,

  // CUBA
  'patronato-de-la-casa-de-la-comunidad-hebrea-de-cuba': 1906,

  // KENYA
  'nairobi-hebrew-congregation': 1913,

  // UAE
  'abrahamic-family-house-abu-dhabi': 2023,
  'association-of-gulf-jewish-communities-agjc': 2021,
  'jewish-community-of-the-uae': 2020,
  'kosher-restaurants-and-community-in-dubai': 2020,

  // BAHRAIN
  'jewish-community-of-bahrain': 1880,
  'ambassador-houda-nonoo-legacy': 2008,

  // PORTUGAL
  'jewish-community-of-lisbon': 1813,
  'museu-judaico-de-belmonte': 2005,
  'sinagoga-kadoorie-mekor-haim-porto': 1938,

  // IRELAND
  'irish-jewish-museum-dublin': 1985,
  'jewish-representative-council-of-ireland': 1948,

  // CROATIA
  'jewish-community-of-zagreb': 1806,

  // SERBIA
  'federation-of-jewish-communities-in-serbia': 1919,

  // BULGARIA
  'organization-of-the-jews-in-bulgaria': 1920,

  // TUNISIA
  'el-ghriba-synagogue-djerba': null, // ancient

  // AZERBAIJAN
  'mountain-jewish-community-of-azerbaijan': null, // ancient

  // GEORGIA
  'georgian-jewish-community': null, // ancient

  // UZBEKISTAN
  'bukharan-jewish-community': null, // ancient

  // PERU
  'asociaci-n-jud-a-del-per': 1870,

  // VENEZUELA
  'confederaci-n-de-asociaciones-israelitas-de-venezuela-caiv': 1967,

  // COSTA RICA
  'centro-israelita-sionista-de-costa-rica': 1930,

  // GUATEMALA
  'comunidad-jud-a-de-guatemala': 1920,

  // ECUADOR
  'comunidad-jud-a-del-ecuador': 1938,

  // BOLIVIA
  'comunidad-israelita-de-bolivia-circulo-israelita': 1935,

  // DOMINICAN REPUBLIC
  'jewish-community-of-sos-a': 1940,
  'museo-jud-o-de-sos-a': 2003,

  // JAMAICA
  'united-congregation-of-israelites': 1921,

  // THAILAND
  'jewish-association-of-thailand': 1964,

  // PHILIPPINES
  'jewish-association-of-the-philippines': 1933,

  // VIETNAM
  'chabad-vietnam': 2006,

  // NIGERIA
  'igbo-jewish-community': 1996,

  // ZIMBABWE
  'zimbabwe-jewish-community': 1894,

  // DRC
  'lubumbashi-jewish-community': 1911,

  // NAMIBIA
  'windhoek-jewish-community': 1924,

  // GHANA
  'house-of-israel-ghana': 1976,

  // EGYPT
  'egyptian-jewish-community-historic': 1840,
  'ben-ezra-synagogue-cairo': 1115,

  // SYRIA
  'syrian-jewish-heritage-aleppo-damascus': null, // ancient

  // IRAQ
  'babylonian-jewry-heritage-center-israel': 1988,
  'iraqi-jewish-community-historic': null, // ancient

  // YEMEN
  'yemeni-jewish-community-historic': null, // ancient

  // LIBYA
  'libyan-jewish-community-historic': null, // ancient

  // LEBANON
  'lebanese-jewish-community-historic': null, // ancient

  // MYANMAR
  'musmeah-yeshua-synagogue-yangon': 1893,

  // CURACAO
  'mikv-israel-emanuel-synagogue': 1732,

  // SURINAME
  'jodensavanne-archaeological-site': 1639,
  'neve-shalom-synagogue-paramaribo': 1835,

  // GIBRALTAR
  'jewish-community-of-gibraltar': 1749,

  // TAIWAN
  'jewish-community-of-taiwan': 1950,

  // GLOBAL
  'jdc-american-jewish-joint-distribution-committee-global': 1914,
  'keren-hayesod-united-israel-appeal': 1920,
  'aleph-institute': 1981,
  'aish-hatorah': 1974,
  'limmud-international': 1980,
  'march-of-the-living': 1988,
  'international-holocaust-remembrance-alliance-ihra': 1998,
  'claims-conference-conference-on-jewish-material-claims-against-germany': 1951,
  'international-march-of-the-living': 1988,
  'world-mizrachi': 1902,
  'maccabi-world-union': 1921,
};

let updated = 0;
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    const year = foundingYears[entry.id];
    if (!entry.founded && year !== undefined && year !== null) {
      entry.founded = year;
      updated++;
    }
  }
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

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
