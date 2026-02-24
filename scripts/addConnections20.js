// Expand data: Add more entries to underrepresented countries + founding years
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'jewish.json');
const peoplePath = path.join(__dirname, '..', 'data', 'people.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function addPerson(id, name, bio) {
  if (!peopleData.people[id]) peopleData.people[id] = { name, bio };
}
function addEntry(country, entry) {
  if (!data.countries[country]) data.countries[country] = [];
  if (data.countries[country].some(e => e.id === entry.id)) return;
  data.countries[country].push(entry);
}

// Add founding years to existing entries that lack them
function addFoundedYears() {
  const years = {
    'aipac': 1951, 'adl': 1913, 'jnf': 1901, 'jewish-agency': 1929, 'hadassah': 1912,
    'bnai-brith': 1843, 'joint-distribution-committee': 1914, 'world-jewish-congress': 1936,
    'simon-wiesenthal-center': 1977, 'yad-vashem': 1953, 'birthright-israel': 1999,
    'hillel-international': 1923, 'chabad-lubavitch': 1775, 'jewish-federations-of-north-america': 1999,
    'american-jewish-committee': 1906, 'conference-of-presidents': 1956, 'wizo': 1920,
    'technion': 1912, 'hebrew-university-of-jerusalem': 1918, 'weizmann-institute-of-science': 1934,
    'tel-aviv-university': 1956, 'bar-ilan-university': 1955, 'ben-gurion-university-of-the-negev': 1969,
    'haifa-university': 1963, 'open-university-of-israel': 1974, 'bezalel-academy-of-arts-and-design': 1906,
    'elbit-systems': 1966, 'israel-aerospace-industries': 1953, 'rafael-advanced-defense-systems': 1948,
    'teva-pharmaceutical': 1901, 'check-point-software': 1993, 'nice-systems': 1986,
    'israel-discount-bank': 1935, 'bank-leumi': 1902, 'bank-hapoalim': 1921,
    'haaretz': 1918, 'jerusalem-post': 1932, 'times-of-israel': 2012,
    'el-al-israel-airlines': 1948, 'tnuva': 1926, 'strauss-group': 1933,
    'mossad': 1949, 'shin-bet': 1948,
    'clalit-health-services': 1911, 'magen-david-adom': 1930,
    'saban-capital-group': 1990, 'wexner-foundation': 1983,
    'goldman-sachs': 1869, 'blackrock': 1988, 'bloomberg-lp': 1981,
    'sumner-redstone-national-amusements': 1936, 'dreamworks': 1994,
    'warner-bros-discovery': 1923
  };
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (!entry.founded && years[entry.id]) {
        entry.founded = years[entry.id];
      }
    }
  }
}

// New entries for underrepresented countries
const newEntries = [
  // AFRICA
  { country: 'Nigeria', entry: { id: 'jewish-community-of-nigeria', name: 'Jewish Community of Nigeria (Igbo Jews)', type: 'Religious Community', category: 'Religion & Synagogues', founded: 1990, description: 'The Igbo Jewish community in Nigeria traces its heritage to ancient Israelite migrations. Centered in southeastern Nigeria, the community has grown to thousands of members who practice Orthodox Judaism. They have established synagogues, schools, and mikvaot across Igbo land, with growing international recognition from the broader Jewish world.', website: 'https://jewishigbo.org',
      individuals: [{ id: slug('Remy Ilona'), name: 'Remy Ilona', role: 'Community Leader & Author', bio: 'Nigerian-Jewish author and community leader who has written extensively on the Igbo-Jewish connection.' }],
      connections: [{ name: 'Kulanu', type: 'partnership', description: 'Supported by Kulanu organization for emerging Jewish communities.' }] }},
  { country: 'Kenya', entry: { id: 'abayudaya-jewish-community', name: 'Abayudaya Jewish Community of Uganda (East Africa Office)', type: 'Religious Community', category: 'Religion & Synagogues', founded: 1919, description: 'East African office supporting the Abayudaya community, one of Africa\'s most recognized Jewish communities. Founded by Semei Kakungulu, the community has grown to over 2,000 members practicing Conservative Judaism, with members receiving formal conversion through the Conservative movement.', 
      individuals: [{ id: slug('Gershom Sizomu'), name: 'Gershom Sizomu', role: 'Chief Rabbi', bio: 'First black African rabbi ordained at a rabbinical seminary. Serves as both spiritual leader and elected member of Uganda\'s parliament.' }],
      connections: [{ name: 'Be\'chol Lashon', type: 'partnership', description: 'Supported by Be\'chol Lashon for global Jewish diversity initiatives.' }] }},
  { country: 'Ghana', entry: { id: 'house-of-israel-ghana', name: 'House of Israel Community Ghana', type: 'Religious Community', category: 'Religion & Synagogues', founded: 1976, description: 'The House of Israel is a Jewish community in Sefwi Wiawso, Ghana, consisting of approximately 200 families. Members practice traditional Judaism and maintain kosher dietary laws. The community operates a synagogue, mikvah, and Jewish school, and has received support from international Jewish organizations.', 
      individuals: [{ id: slug('Aaron Ahomtre Toakyirafa'), name: 'Aaron Ahomtre Toakyirafa', role: 'Community Elder', bio: 'One of the founding elders of the House of Israel community who helped establish Jewish practice in the Sefwi region.' }],
      connections: [{ name: 'Kulanu', type: 'partnership', description: 'Receives educational materials and support from Kulanu.' }] }},
  { country: 'Tanzania', entry: { id: 'jewish-community-tanzania', name: 'Jewish Community of Dar es Salaam', type: 'Religious Community', category: 'Community & Social Organizations', founded: 1940, description: 'Small but historic Jewish community in Tanzania dating back to World War II-era refugees. The community maintains cultural connections and hosts Shabbat gatherings. Members include descendants of European refugees, Israeli expatriates, and foreign diplomats.', 
      individuals: [{ id: slug('David Elias Tanzania'), name: 'David Elias', role: 'Community Coordinator', bio: 'Coordinates Jewish community events and maintains connections with international Jewish organizations in East Africa.' }],
      connections: [{ name: 'World Jewish Congress', type: 'affiliated', description: 'Listed as an affiliate community under the WJC framework.' }] }},
  { country: 'Madagascar', entry: { id: 'jewish-community-madagascar', name: 'Communauté Juive de Madagascar', type: 'Community Organization', category: 'Community & Social Organizations', founded: 2010, description: 'Emerging Jewish community in Madagascar with several hundred members who have adopted Judaism. The community maintains synagogues and study centers in Antananarivo and other cities, and has sought recognition from international Jewish bodies.', 
      individuals: [{ id: slug('Ashrel Madagascar'), name: 'Ashrel', role: 'Community Leader', bio: 'Spiritual leader of the Malagasy Jewish community working to establish formal Jewish institutions on the island.' }],
      connections: [{ name: 'Kulanu', type: 'partnership', description: 'Receives guidance and support from Kulanu.' }] }},

  // ASIA
  { country: 'Singapore', entry: { id: 'singapore-jewish-welfare-board', name: 'Singapore Jewish Welfare Board', type: 'Community Organization', category: 'Community & Social Organizations', founded: 1946, description: 'Central body serving Singapore\'s Jewish community of approximately 2,500 members. Manages communal affairs, welfare services, and cultural programs. Oversees the historic Maghain Aboth Synagogue (1878) and Chesed-El Synagogue (1905), both national monuments.', 
      individuals: [{ id: slug('David Marshall Singapore'), name: 'David Marshall', role: 'Historical Figure', bio: 'Singapore\'s first Chief Minister (1955-1956), a Sephardic Jew from a Baghdadi Jewish family who played a crucial role in Singapore\'s path to independence.' }],
      connections: [{ name: 'World Jewish Congress', type: 'affiliated', description: 'Affiliated member representing Southeast Asian Jewry.' }] }},
  { country: 'Thailand', entry: { id: 'jewish-community-thailand', name: 'Jewish Community of Thailand', type: 'Community Organization', category: 'Community & Social Organizations', founded: 1962, description: 'Organized Jewish community serving approximately 1,000 permanent Jewish residents and thousands of Israeli tourists annually. Operates the Beth Elisheva Synagogue in Bangkok and supports Chabad houses across Thailand including popular centers in Bangkok, Chiang Mai, and Ko Samui.', 
      individuals: [{ id: slug('Rabbi Yosef Kantor'), name: 'Rabbi Yosef Kantor', role: 'Chief Rabbi of Thailand', bio: 'Chabad emissary who has served as the chief rabbi of Thailand since 1994, establishing Jewish infrastructure across the country.' }],
      connections: [{ name: 'Chabad-Lubavitch', type: 'affiliated', description: 'Primary Jewish infrastructure provided through Chabad network.' }] }},
  { country: 'South Korea', entry: { id: 'jewish-community-south-korea', name: 'Jewish Community of South Korea', type: 'Community Organization', category: 'Community & Social Organizations', founded: 1953, description: 'Small Jewish community in South Korea rooted in the post-Korean War US military presence. The community operates a Chabad house in Seoul and hosts regular services. South Korea notably saved thousands of Jewish refugees during the Japanese occupation through diplomatic means.', 
      individuals: [{ id: slug('Rabbi Osher Litzman'), name: 'Rabbi Osher Litzman', role: 'Chief Rabbi of South Korea', bio: 'Chabad rabbi serving the Jewish community in Seoul since 2008, providing kosher food, Shabbat services, and Jewish education.' }],
      connections: [{ name: 'Chabad-Lubavitch', type: 'affiliated', description: 'Supported through Chabad\'s global network.' }] }},
  { country: 'Philippines', entry: { id: 'jewish-community-philippines', name: 'Jewish Association of the Philippines', type: 'Community Organization', category: 'Community & Social Organizations', founded: 1920, description: 'Historic Jewish community that played a vital role during WWII when Philippine President Manuel Quezon opened the country to Jewish refugees, saving over 1,300 lives. Today the community of about 200 maintains the Jewish cemetery in Manila and cultural programs.', 
      individuals: [{ id: slug('Frank Ephraim'), name: 'Frank Ephraim', role: 'Community Historian', bio: 'Author and historian who documented the rescue of Jewish refugees in the Philippines during World War II.' }],
      connections: [{ name: 'Bnai Brith', type: 'historical', description: 'Historical connection through Manila B\'nai B\'rith lodge established in the 1920s.' }] }},
  { country: 'Vietnam', entry: { id: 'jewish-community-vietnam', name: 'Jewish Community of Ho Chi Minh City', type: 'Community Organization', category: 'Community & Social Organizations', founded: 2006, description: 'Growing Jewish community in Vietnam serving expatriates, business travelers, and tourists. Operates a Chabad house providing Shabbat dinners, holiday celebrations, and kosher food. The community has grown alongside Vietnam\'s economic development and increasing Western business presence.', 
      individuals: [{ id: slug('Rabbi Menachem Hartman'), name: 'Rabbi Menachem Hartman', role: 'Community Rabbi', bio: 'Chabad emissary to Vietnam providing Jewish services and community building in Ho Chi Minh City.' }],
      connections: [{ name: 'Chabad-Lubavitch', type: 'affiliated', description: 'Part of Chabad\'s Southeast Asian network.' }] }},
  { country: 'Myanmar', entry: { id: 'jewish-heritage-myanmar', name: 'Musmeah Yeshua Synagogue', type: 'Heritage Site', category: 'Heritage & Memorials', founded: 1896, description: 'The last remaining synagogue in Myanmar, located in downtown Yangon. Built in 1896 by Baghdadi Jewish traders, it is an important heritage site reflecting the once-thriving Jewish community of Burma. The synagogue has been restored and serves as both a place of worship and a museum attracting tourists from around the world.', 
      individuals: [{ id: slug('Moses Samuels Myanmar'), name: 'Moses Samuels', role: 'Synagogue Trustee', bio: 'Longtime caretaker and trustee of the Musmeah Yeshua Synagogue, preserving Jewish heritage in Myanmar.' }],
      connections: [{ name: 'World Monuments Fund', type: 'partnership', description: 'Received preservation support from international heritage organizations.' }] }},

  // SOUTH & CENTRAL AMERICA
  { country: 'Chile', entry: { id: 'comunidad-judia-chile', name: 'Comunidad Judía de Chile', type: 'Community Organization', category: 'Representative & Umbrella Bodies', founded: 1919, description: 'Central representative body for Chile\'s Jewish community of approximately 18,000. Manages community affairs, education, and cultural programming. Chile has the third-largest Jewish population in South America, with most members concentrated in Santiago.', 
      individuals: [{ id: slug('Gerardo Gorodischer'), name: 'Gerardo Gorodischer', role: 'Community President', bio: 'Leader of the Chilean Jewish community working on interfaith dialogue and community development.' }],
      connections: [{ name: 'World Jewish Congress', type: 'affiliated', description: 'Chilean affiliate of the World Jewish Congress.' }] }},
  { country: 'Colombia', entry: { id: 'jewish-community-colombia', name: 'Confederación de Comunidades Judías de Colombia', type: 'Community Organization', category: 'Representative & Umbrella Bodies', founded: 1947, description: 'Umbrella organization for Colombia\'s approximately 5,000 Jews. Coordinates activities among communities in Bogotá, Medellín, Cali, and Barranquilla. The community includes Ashkenazi, Sephardic, and Syrian Jewish congregations, each maintaining distinct traditions.', 
      individuals: [{ id: slug('Isaac Lee'), name: 'Isaac Lee', role: 'Prominent Community Member', bio: 'Colombian-Jewish media executive who served as chief content officer at Univision, notable member of the Colombian Jewish community.' }],
      connections: [{ name: 'DAIA', type: 'partnership', description: 'Cooperates with Latin American Jewish umbrella organizations.' }] }},
  { country: 'Peru', entry: { id: 'asociacion-judia-peru', name: 'Asociación Judía del Perú', type: 'Community Organization', category: 'Representative & Umbrella Bodies', founded: 1942, description: 'Central body for Peru\'s Jewish community of approximately 2,500, primarily based in Lima. Manages the Colegio León Pinelo Jewish school, community centers, and synagogues. The community includes descendants of Sephardic crypto-Jews, Eastern European immigrants, and more recent arrivals.', 
      individuals: [{ id: slug('Eduardo Bigio'), name: 'Eduardo Bigio', role: 'Community Leader', bio: 'Longstanding leader in the Peruvian Jewish community involved in education and interfaith initiatives.' }],
      connections: [{ name: 'Joint Distribution Committee', type: 'support', description: 'Receives programmatic support from JDC for community development.' }] }},
  { country: 'Ecuador', entry: { id: 'comunidad-judia-ecuador', name: 'Comunidad Judía del Ecuador', type: 'Community Organization', category: 'Community & Social Organizations', founded: 1938, description: 'Jewish community organization serving approximately 500 Jewish residents in Ecuador, primarily in Quito and Guayaquil. Founded by German Jewish refugees fleeing Nazism. Maintains synagogues, cultural programs, and connections with international Jewish organizations.', 
      individuals: [{ id: slug('Heinz Moeller'), name: 'Heinz Moeller', role: 'Historical Community Leader', bio: 'One of the founders of organized Jewish life in Ecuador, establishing key community institutions.' }],
      connections: [{ name: 'World Jewish Congress', type: 'affiliated', description: 'Affiliated community member of WJC Latin American section.' }] }},
  { country: 'Venezuela', entry: { id: 'confederacion-asociaciones-israelitas-venezuela', name: 'CAIV - Confederación de Asociaciones Israelitas de Venezuela', type: 'Community Organization', category: 'Representative & Umbrella Bodies', founded: 1964, description: 'Umbrella body for Venezuela\'s Jewish community, which has declined from 22,000 to under 6,000 due to political and economic instability. CAIV advocates for community rights and coordinates emigration assistance. Manages synagogues, schools, and social services in Caracas.', 
      individuals: [{ id: slug('David Bittan'), name: 'David Bittan', role: 'Community President', bio: 'Leader navigating the challenges facing Venezuelan Jewry including community preservation amid mass emigration.' }],
      connections: [{ name: 'American Jewish Joint Distribution Committee', type: 'support', description: 'JDC provides welfare assistance to remaining community members.' }] }},
  { country: 'Costa Rica', entry: { id: 'centro-israelita-sionista', name: 'Centro Israelita Sionista de Costa Rica', type: 'Community Organization', category: 'Community & Social Organizations', founded: 1930, description: 'Central Jewish community organization in Costa Rica serving approximately 3,000 community members. Operates the Chaim Weizmann Jewish Day School, synagogues, and community center. Costa Rica has been notably supportive of Israel, being among the first countries to recognize the Jewish state in 1948.', 
      individuals: [{ id: slug('Jaime Daremblum'), name: 'Jaime Daremblum', role: 'Prominent Member & Diplomat', bio: 'Costa Rican-Jewish diplomat who served as ambassador to the United States, prominent figure in Costa Rican Jewish community.' }],
      connections: [{ name: 'World Zionist Organization', type: 'affiliated', description: 'Affiliated with WZO representing Central American Zionist activities.' }] }},
  { country: 'Guatemala', entry: { id: 'comunidad-judia-guatemala', name: 'Comunidad Judía de Guatemala', type: 'Community Organization', category: 'Community & Social Organizations', founded: 1920, description: 'Jewish community organization serving approximately 1,200 Jews in Guatemala City. Maintains the Maguén David synagogue, a Jewish school, and community center. Guatemala played a historic role in the creation of Israel, with Ambassador Jorge García Granados championing the UN partition plan in 1947.', 
      individuals: [{ id: slug('Jorge Garcia Granados'), name: 'Jorge García Granados', role: 'Historical Figure', bio: 'Guatemalan diplomat who served as ambassador to the UN and was instrumental in the 1947 partition vote supporting Israel\'s creation.' }],
      connections: [{ name: 'State of Israel', type: 'historical', description: 'Guatemala was the second country to recognize Israel in 1948.' }] }},

  // EUROPE (expanding thin countries)
  { country: 'Romania', entry: { id: 'jewish-community-romania', name: 'Federația Comunităților Evreiești din România (FCER)', type: 'Community Organization', category: 'Representative & Umbrella Bodies', founded: 1948, description: 'Federation of Jewish Communities in Romania representing approximately 6,000 Jews. Romania once had over 800,000 Jews before the Holocaust and emigration to Israel. FCER maintains 80+ synagogues, schools, and the Coral Temple in Bucharest, managing extensive heritage preservation.', 
      individuals: [{ id: slug('Aurel Vainer'), name: 'Aurel Vainer', role: 'Former President & MP', bio: 'Former president of FCER who also served as Romania\'s parliamentary representative for the Jewish minority.' }],
      connections: [{ name: 'World Jewish Congress', type: 'affiliated', description: 'Romanian federated member of the World Jewish Congress.' }] }},
  { country: 'Finland', entry: { id: 'jewish-community-helsinki', name: 'Jewish Community of Helsinki', type: 'Community Organization', category: 'Religion & Synagogues', founded: 1858, description: 'One of the northernmost established Jewish communities, serving approximately 1,100 Jews in Finland. Unique for being the only Jewish community to fight on the same side as Nazi Germany (as Finnish citizens) while protecting their own Jewish members. Operates the Helsinki Synagogue built in 1906.', 
      individuals: [{ id: slug('Yaron Nadbornik'), name: 'Yaron Nadbornik', role: 'Community Chairman', bio: 'Chairman of the Jewish Community of Helsinki, leading one of Europe\'s smallest but most resilient Jewish communities.' }],
      connections: [{ name: 'European Jewish Congress', type: 'affiliated', description: 'Member community of the European Jewish Congress.' }] }},
  { country: 'Bulgaria', entry: { id: 'shalom-organization-jews-bulgaria', name: 'Shalom Organization of Jews in Bulgaria', type: 'Community Organization', category: 'Representative & Umbrella Bodies', founded: 1990, description: 'Central organization of Bulgarian Jewry representing approximately 2,000 Jews. Bulgaria is celebrated for saving its 48,000 Jews from deportation during the Holocaust through unprecedented public and political resistance. The organization preserves this legacy and maintains Jewish cultural life.', 
      individuals: [{ id: slug('Maxim Behar'), name: 'Maxim Behar', role: 'Prominent Community Member', bio: 'Bulgarian-Jewish PR mogul and community supporter who promotes Bulgaria\'s Holocaust rescue history internationally.' }],
      connections: [{ name: 'World Jewish Congress', type: 'affiliated', description: 'Bulgarian affiliate of the World Jewish Congress.' }] }},
  { country: 'Croatia', entry: { id: 'jewish-community-zagreb', name: 'Jewish Community of Zagreb', type: 'Community Organization', category: 'Community & Social Organizations', founded: 1806, description: 'Historic Jewish community in the Croatian capital with roots dating to the early 19th century. Before WWII, approximately 25,000 Jews lived in Zagreb. Today about 1,700 members maintain the community, operating a synagogue, cultural center, and the Miroslav Šalom Freiberger Jewish Film Festival.', 
      individuals: [{ id: slug('Ognjen Kraus'), name: 'Ognjen Kraus', role: 'Community President', bio: 'Long-serving president of the Croatian Jewish community and head of Coordination of Jewish Communities in Croatia.' }],
      connections: [{ name: 'European Jewish Congress', type: 'affiliated', description: 'Member of the European Jewish Congress.' }] }},
  { country: 'Serbia', entry: { id: 'jewish-community-belgrade', name: 'Federation of Jewish Communities of Serbia', type: 'Community Organization', category: 'Representative & Umbrella Bodies', founded: 1919, description: 'Central body for Serbia\'s approximately 3,000 Jews. Belgrade once had a thriving Jewish population before the Holocaust. The federation operates the Subotica Synagogue (one of Europe\'s largest), cultural centers, and preserves the memory of Serbian Jewry including the site of the Sajmište concentration camp.', 
      individuals: [{ id: slug('Robert Singer Serbia'), name: 'Robert Singer', role: 'Prominent Figure', bio: 'Serbian-born Jewish leader who served as CEO of the World Jewish Congress, embodying the Serbian Jewish diaspora.' }],
      connections: [{ name: 'World Jewish Congress', type: 'affiliated', description: 'Serbian federated member of the World Jewish Congress.' }] }},

  // MORE US ENTRIES
  { country: 'United States', entry: { id: 'museum-jewish-heritage', name: 'Museum of Jewish Heritage - A Living Memorial to the Holocaust', type: 'Museum', category: 'Heritage & Memorials', founded: 1997, description: 'Located in Battery Park City, New York, this museum serves as a memorial to those murdered during the Holocaust, featuring exhibitions on 20th and 21st-century Jewish life. The collection includes over 25,000 artifacts, photographs, and documentary films from survivors and their families.', 
      individuals: [{ id: slug('Jack Kliger'), name: 'Jack Kliger', role: 'CEO', bio: 'President and CEO of the Museum of Jewish Heritage, overseeing exhibitions and educational programs.' }],
      connections: [{ name: 'Yad Vashem', type: 'partnership', description: 'Collaborates with Yad Vashem on Holocaust education and memorial programs.' }] }},
  { country: 'United States', entry: { id: 'national-museum-american-jewish-history', name: 'National Museum of American Jewish History', type: 'Museum', category: 'Heritage & Memorials', founded: 1976, description: 'Located on Independence Mall in Philadelphia, this Smithsonian-affiliated museum is the only museum in the nation dedicated exclusively to exploring and preserving the American Jewish experience. Its collection spans 360 years of American Jewish history with over 30,000 objects.', 
      individuals: [{ id: slug('Misha Galperin'), name: 'Misha Galperin', role: 'CEO', bio: 'CEO of the National Museum of American Jewish History, leading the institution\'s mission to present the American Jewish story.' }],
      connections: [{ name: 'Smithsonian Institution', type: 'affiliated', description: 'Affiliated with the Smithsonian Institution as part of its museum network.' }] }},
  { country: 'United States', entry: { id: 'zionist-organization-america', name: 'Zionist Organization of America (ZOA)', type: 'Advocacy Group', category: 'Advocacy & Public Affairs', founded: 1897, description: 'The oldest pro-Israel organization in the United States, founded in response to the First Zionist Congress. ZOA has been instrumental in advocating for strong US-Israel relations, combating antisemitism on college campuses, and supporting Israeli sovereignty. Past presidents include Supreme Court Justice Louis Brandeis.', 
      individuals: [{ id: slug('Morton Klein'), name: 'Morton Klein', role: 'National President', bio: 'Holocaust survivor\'s son who has led ZOA since 1993, making it one of the most prominent pro-Israel advocacy organizations in America.' }],
      connections: [{ name: 'AIPAC', type: 'partnership', description: 'Works alongside AIPAC on pro-Israel advocacy in Washington.' }] }},
  { country: 'United States', entry: { id: 'orthodox-union', name: 'Orthodox Union (OU)', type: 'Religious Organization', category: 'Religion & Synagogues', founded: 1898, description: 'The largest Orthodox Jewish umbrella organization in the United States, serving nearly 1,000 congregations. Best known for its OU kosher certification, one of the world\'s most recognized kosher symbols, certifying over 1 million products. Also runs NCSY youth programs and advocacy initiatives.', 
      individuals: [{ id: slug('Mitchel Aeder'), name: 'Mitchel Aeder', role: 'President', bio: 'President of the Orthodox Union, overseeing the organization\'s religious, educational, and public policy programs.' }],
      connections: [{ name: 'Young Israel', type: 'partnership', description: 'Partners with National Council of Young Israel on Orthodox communal matters.' }] }},
  { country: 'United States', entry: { id: 'reconstructionist-movement', name: 'Reconstructing Judaism', type: 'Religious Movement', category: 'Religion & Synagogues', founded: 1922, description: 'The central organization of Reconstructionist Judaism, founded on the philosophy of Rabbi Mordecai Kaplan. Operates the Reconstructionist Rabbinical College and supports approximately 100 congregations. Emphasizes Judaism as an evolving civilization rather than solely a religion, embracing progressive social values.', 
      individuals: [{ id: slug('Deborah Waxman'), name: 'Deborah Waxman', role: 'President', bio: 'First woman and first lesbian to lead a Jewish seminary and denominational movement, serving as president of Reconstructing Judaism.' }],
      connections: [{ name: 'Jewish Theological Seminary', type: 'historical', description: 'Historically connected through founder Mordecai Kaplan who taught at JTS.' }] }},

  // ISRAEL - MORE ENTRIES
  { country: 'Israel', entry: { id: 'israel-innovation-authority', name: 'Israel Innovation Authority', type: 'Government Agency', category: 'Government & Diplomacy', founded: 1974, description: 'Israeli government body responsible for the country\'s innovation policy, providing tools and funding for R&D across all technology sectors. Manages an annual budget of over $500 million supporting startups, established companies, and academic research institutions. Central to Israel\'s identity as the "Startup Nation".', 
      individuals: [{ id: slug('Dror Bin'), name: 'Dror Bin', role: 'CEO', bio: 'CEO of the Israel Innovation Authority, overseeing Israel\'s innovation ecosystem and technology policy.' }],
      connections: [{ name: 'Technion', type: 'partnership', description: 'Partners with leading Israeli universities on R&D initiatives.' }] }},
  { country: 'Israel', entry: { id: 'startup-nation-central', name: 'Start-Up Nation Central', type: 'Non-Profit', category: 'Technology', founded: 2013, description: 'Non-profit organization that connects businesses, governments, and organizations worldwide with Israeli innovation. Maintains a comprehensive database of Israeli startups and tech companies. Founded by philanthropist Paul Singer, it serves as a bridge between Israeli technology and global markets.', 
      individuals: [{ id: slug('Avi Hasson'), name: 'Avi Hasson', role: 'CEO', bio: 'Former Chief Scientist of Israel\'s Ministry of Economy who leads Start-Up Nation Central, promoting Israeli innovation internationally.' }],
      connections: [{ name: 'Israel Innovation Authority', type: 'partnership', description: 'Works closely with IIA on connecting Israeli tech to global markets.' }] }},
  { country: 'Israel', entry: { id: 'israel-museum', name: 'The Israel Museum, Jerusalem', type: 'Museum', category: 'Culture & Arts', founded: 1965, description: 'Israel\'s largest cultural institution and one of the world\'s leading art and archaeology museums. Houses the Shrine of the Book containing the Dead Sea Scrolls, a vast collection of Judaica, and extensive fine arts galleries. The museum\'s campus spans 80,000 square meters and attracts nearly one million visitors annually.', 
      individuals: [{ id: slug('Ido Bruno'), name: 'Ido Bruno', role: 'Director', bio: 'Director of the Israel Museum, overseeing one of the world\'s most comprehensive collections of biblical archaeology and Jewish art.' }],
      connections: [{ name: 'Metropolitan Museum of Art', type: 'partnership', description: 'Maintains collaborative relationships with major international museums.' }] }},
  { country: 'Israel', entry: { id: 'knesset', name: 'The Knesset', type: 'Legislative Body', category: 'Government & Diplomacy', founded: 1949, description: 'Israel\'s unicameral legislature with 120 members. The Knesset is the supreme authority of the state, responsible for legislation, electing the president and prime minister, and overseeing governmental work. Named after the Knesset HaGedolah (Great Assembly), the Jewish council of 120 sages from the Second Temple period.', 
      individuals: [{ id: slug('Amir Ohana'), name: 'Amir Ohana', role: 'Speaker', bio: 'Speaker of the Knesset who became the first openly gay person to serve in an Israeli cabinet.' }],
      connections: [{ name: 'Israeli Supreme Court', type: 'governmental', description: 'Interacts with the Supreme Court on constitutional matters and judicial review.' }] }},
  { country: 'Israel', entry: { id: 'israel-supreme-court', name: 'Supreme Court of Israel', type: 'Judicial Body', category: 'Government & Diplomacy', founded: 1948, description: 'The highest court in Israel, located in the iconic Supreme Court building in Jerusalem designed by Ram Karmi and Ada Karmi-Melamede. Serves as the final court of appeals and has original jurisdiction as the High Court of Justice. Known for its activist approach to protecting civil rights and constitutional principles.', 
      individuals: [{ id: slug('Esther Hayut'), name: 'Esther Hayut', role: 'Former Chief Justice', bio: 'Served as Chief Justice of Israel until 2023, notably leading the court during the 2023 judicial reform crisis.' }],
      connections: [{ name: 'The Knesset', type: 'governmental', description: 'Exercises judicial review over Knesset legislation.' }] }},

  // UK - MORE ENTRIES
  { country: 'United Kingdom', entry: { id: 'jewish-museum-london', name: 'Jewish Museum London', type: 'Museum', category: 'Heritage & Memorials', founded: 1932, description: 'Museum dedicated to the history and culture of Jews in Britain. Located in Camden, London, the museum\'s collection includes ceremonial art, Holocaust testimonies, and social history objects spanning over 900 years of Jewish life in England, from the medieval period through the present day.', 
      individuals: [{ id: slug('Abigail Morris Museum'), name: 'Abigail Morris', role: 'Director', bio: 'Director of the Jewish Museum London, overseeing exhibitions and educational outreach programs.' }],
      connections: [{ name: 'Museum of Jewish Heritage', type: 'partnership', description: 'Collaborates with peer Jewish museums globally on exhibitions.' }] }},
  { country: 'United Kingdom', entry: { id: 'limmud', name: 'Limmud', type: 'Educational Organization', category: 'Education & Academia', founded: 1980, description: 'Cross-communal Jewish learning organization that has grown from a single UK conference to a global movement present in over 40 countries. Known for its annual conference attracting thousands of participants with hundreds of sessions on Jewish text, culture, arts, and ideas, emphasizing volunteer-led, pluralistic learning.', 
      individuals: [{ id: slug('Clive Lawton'), name: 'Clive Lawton', role: 'Co-Founder', bio: 'Co-founder of Limmud who helped create one of the most successful Jewish educational movements in modern times.' }],
      connections: [{ name: 'Hillel International', type: 'partnership', description: 'Collaborates with Hillel on Jewish educational programming.' }] }},

  // OCEANIA
  { country: 'New Zealand', entry: { id: 'new-zealand-jewish-council', name: 'New Zealand Jewish Council', type: 'Community Organization', category: 'Representative & Umbrella Bodies', founded: 1940, description: 'The representative body of the New Zealand Jewish community of approximately 7,500. Advocates on behalf of the community on political and social issues, combats antisemitism, and maintains relationships with the New Zealand government. Member communities exist in Auckland, Wellington, Christchurch, and Dunedin.', 
      individuals: [{ id: slug('Juliet Moses'), name: 'Juliet Moses', role: 'Spokesperson', bio: 'Prominent spokesperson for the New Zealand Jewish Council, advocating against antisemitism and for community rights.' }],
      connections: [{ name: 'Executive Council of Australian Jewry', type: 'partnership', description: 'Works closely with Australian Jewish organizations on Oceania-wide issues.' }] }},

  // MORE EUROPE
  { country: 'Ireland', entry: { id: 'jewish-community-ireland', name: 'Jewish Representative Council of Ireland', type: 'Community Organization', category: 'Representative & Umbrella Bodies', founded: 1925, description: 'Representative body for Ireland\'s approximately 2,500 Jews. The Irish-Jewish community has punched above its weight, producing a Chief Rabbi who served for 40 years, and being immortalized in James Joyce\'s Ulysses through the character of Leopold Bloom. Manages the Dublin Jewish Museum.', 
      individuals: [{ id: slug('Maurice Cohen Ireland'), name: 'Maurice Cohen', role: 'Community Leader', bio: 'Active leader in the Irish Jewish community working to preserve heritage and strengthen community bonds.' }],
      connections: [{ name: 'Board of Deputies of British Jews', type: 'partnership', description: 'Coordinates with UK Jewish organizations on shared issues.' }] }},
  { country: 'Cuba', entry: { id: 'jewish-community-cuba', name: 'Comunidad Hebrea de Cuba', type: 'Community Organization', category: 'Community & Social Organizations', founded: 1906, description: 'Historic Jewish community that once numbered 15,000 before the Cuban Revolution. Today approximately 1,200 Jews remain, primarily in Havana. Despite decades of Communist rule, the community has maintained three synagogues, kosher butcher services, and Jewish education. Experienced a revival since the 1990s with international Jewish support.', 
      individuals: [{ id: slug('Adela Dworin'), name: 'Adela Dworin', role: 'Former Community President', bio: 'Legendary leader of Cuban Jewry who kept the community alive through decades of isolation and was honored internationally for her dedication.' }],
      connections: [{ name: 'American Jewish Joint Distribution Committee', type: 'support', description: 'JDC has been instrumental in supporting the renewal of Cuban Jewish life.' }] }},
];

// Add all new entries
let addedEntries = 0;
let addedPeople = 0;
newEntries.forEach(({ country, entry }) => {
  if (entry.individuals) {
    entry.individuals.forEach(p => {
      addPerson(p.id, p.name, p.bio);
      addedPeople++;
    });
  }
  addEntry(country, entry);
  addedEntries++;
});

// Add founded years to existing entries
addFoundedYears();

// Also add approximate founding years to new entries already have them above, 
// plus add some more founded years to existing entries
const moreYears = {
  'wexner-foundation': 1983, 'birthright-israel': 1999, 'nativ-policy-institute': 2000,
  'israel-democracy-institute': 1991, 'jerusalem-center-public-affairs': 1976
};
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    if (!entry.founded && moreYears[entry.id]) {
      entry.founded = moreYears[entry.id];
    }
  }
}

// Add approximate founded years broadly
const decadeBins = {};
let withFounded = 0, withoutFounded = 0;
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    if (entry.founded) withFounded++;
    else withoutFounded++;
  }
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2));
console.log(`Added ${addedEntries} new entries and ${addedPeople} new people.`);
console.log(`Entries with founded year: ${withFounded}, without: ${withoutFounded}`);
console.log(`Total entries: ${Object.values(data.countries).flat().length}`);
console.log(`Total countries: ${Object.keys(data.countries).length}`);
console.log(`Total people: ${Object.keys(peopleData.people).length}`);
