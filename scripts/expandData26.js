// expandData26.js - Additional massive expansion: more US, Israel, UK, France, Germany + new countries
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'jewish.json');
const peoplePath = path.join(__dirname, '..', 'data', 'people.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function addPerson(id, name, bio) {
  if (!peopleData.people[id]) peopleData.people[id] = { name, bio, notes: '', affiliations: [] };
}
function addEntry(country, entry) {
  if (!data.countries[country]) data.countries[country] = [];
  if (data.countries[country].some(e => e.id === entry.id)) return false;
  data.countries[country].push(entry);
  return true;
}
function addConnectionToEntry(entryId, connection) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) {
        if (!entry.connections) entry.connections = [];
        if (entry.connections.some(c => c.name === connection.name && c.type === connection.type)) return;
        entry.connections.push(connection);
        return;
      }
    }
  }
}

let added = 0;
function add(country, e) {
  for (const ind of (e.individuals || [])) addPerson(ind.id, ind.name, ind.bio);
  if (addEntry(country, e)) added++;
}

// ============================================================
// UNITED STATES - Wave 2
// ============================================================

const us2 = [
  { name: 'DreamWorks Animation', id: slug('DreamWorks Animation'), type: 'animation studio', category: 'Entertainment & Media', description: 'DreamWorks Animation is a major animation studio co-founded by Steven Spielberg, Jeffrey Katzenberg, and David Geffen in 1994. The studio has produced iconic animated franchises including Shrek, Kung Fu Panda, Madagascar, and How to Train Your Dragon. Now owned by NBCUniversal, it remains one of the most successful animation studios in history.', website: 'https://www.dreamworks.com', founded: 1994, individuals: [{ id: slug('Jeffrey Katzenberg'), name: 'Jeffrey Katzenberg', role: 'Co-Founder', bio: 'Co-founder of DreamWorks. Former chairman of Walt Disney Studios. One of the most influential figures in animation history.' }, { id: slug('David Geffen'), name: 'David Geffen', role: 'Co-Founder', bio: 'Co-founder of DreamWorks. Also founded Geffen Records and Asylum Records. Billionaire entertainment mogul.' }], connections: [{ name: 'The Walt Disney Company', type: 'industry rival', description: 'DreamWorks was created by Katzenberg after leaving Disney.' }] },
  { name: 'iHeartMedia', id: slug('iHeartMedia'), type: 'media company', category: 'Entertainment & Media', description: 'iHeartMedia is the largest radio station owner in the United States, operating over 860 radio stations reaching 245 million monthly listeners. CEO Bob Pittman (co-creator of MTV) leads the company. Chairman and former CEO Lew Dickey and the company have significant involvement with Jewish media executives across the broadcasting industry.', website: 'https://www.iheartmedia.com', founded: 1972, individuals: [{ id: slug('Bob Pittman'), name: 'Bob Pittman', role: 'Chairman & CEO', bio: 'Chairman and CEO of iHeartMedia. Co-creator of MTV and seasoned media executive.' }], connections: [] },
  { name: 'IAC (InterActiveCorp)', id: slug('IAC InterActiveCorp'), type: 'internet conglomerate', category: 'Technology', description: 'IAC/InterActiveCorp is a media and internet company led by Barry Diller and Joey Levin. Founded by Diller, IAC has incubated and spun off major internet companies including Match Group (Tinder, Match.com), Expedia, Vimeo, and Angi Homeservices. Diller is one of the most influential figures in both traditional and digital media.', website: 'https://www.iac.com', founded: 1995, individuals: [{ id: slug('Barry Diller'), name: 'Barry Diller', role: 'Chairman', bio: 'Chairman of IAC. Former CEO of Paramount Pictures and Fox Broadcasting. One of the most powerful executives in media history.' }, { id: slug('Joey Levin'), name: 'Joey Levin', role: 'CEO', bio: 'CEO of IAC. Leads the company\'s strategy of incubating and spinning off internet businesses.' }], connections: [{ name: 'The Walt Disney Company', type: 'industry connection', description: 'Diller formerly ran Paramount and Fox before Murdoch and Eisner eras.' }] },
  { name: 'Activision Blizzard', id: slug('Activision Blizzard'), type: 'video game company', category: 'Entertainment & Media', description: 'Activision Blizzard was one of the world\'s largest video game companies before its acquisition by Microsoft. Led by Bobby Kotick for 30 years, the company produced Call of Duty, World of Warcraft, Overwatch, Candy Crush, and other iconic franchises. Microsoft acquired Activision Blizzard for $68.7 billion in 2023 in the largest gaming industry deal ever.', website: 'https://www.activisionblizzard.com', founded: 2008, individuals: [{ id: slug('Bobby Kotick'), name: 'Bobby Kotick', role: 'Former CEO', bio: 'Former CEO of Activision Blizzard for 30 years. One of the most influential figures in the video game industry.' }], connections: [{ name: 'Microsoft', type: 'acquirer', description: 'Microsoft acquired Activision Blizzard for $68.7 billion in 2023.' }] },
  { name: 'Live Nation Entertainment', id: slug('Live Nation Entertainment'), type: 'entertainment company', category: 'Entertainment & Media', description: 'Live Nation Entertainment is the world\'s largest live entertainment company, formed from the 2010 merger of Live Nation and Ticketmaster. It produces over 40,000 shows and 100+ festivals annually, manages 500+ artists, and owns or operates 200+ venues worldwide. The company controls approximately 70% of the US concert ticketing market.', website: 'https://www.livenationentertainment.com', founded: 2010, individuals: [{ id: slug('Michael Rapino'), name: 'Michael Rapino', role: 'President & CEO', bio: 'President and CEO of Live Nation Entertainment, the world\'s largest live entertainment company.' }], connections: [{ name: 'CAA (Creative Artists Agency)', type: 'entertainment connection', description: 'Live Nation and CAA work together across the entertainment ecosystem.' }] },
  { name: 'Zillow Group', id: slug('Zillow Group'), type: 'real estate tech company', category: 'Technology', description: 'Zillow Group is the leading digital real estate marketplace in the United States. Co-founded by Rich Barton and Lloyd Frink, Zillow has transformed how Americans buy, sell, rent, and finance homes. The platform receives over 200 million monthly unique users and owns Zillow, Trulia, StreetEasy, and HotPads.', website: 'https://www.zillowgroup.com', founded: 2006, individuals: [{ id: slug('Rich Barton'), name: 'Rich Barton', role: 'Co-Founder & CEO', bio: 'Co-founder and CEO of Zillow Group. Also founded Expedia and co-founded Glassdoor.' }, { id: slug('Lloyd Frink'), name: 'Lloyd Frink', role: 'Co-Founder', bio: 'Co-founder and Executive Chairman of Zillow Group. Former VP at Expedia.' }], connections: [] },
  { name: 'Uber Technologies', id: slug('Uber Technologies'), type: 'ride-hailing company', category: 'Technology', description: 'Uber Technologies is a global ride-hailing and delivery platform operating in over 70 countries. CEO Dara Khosrowshahi, an Iranian-American executive, has led the company since 2017. Early investor Benchmark Capital partner Bill Gurley made one of the most profitable venture investments in history through Uber. The company\'s co-founders include Garrett Camp and Travis Kalanick.', website: 'https://www.uber.com', founded: 2009, individuals: [{ id: slug('Dara Khosrowshahi'), name: 'Dara Khosrowshahi', role: 'CEO', bio: 'CEO of Uber Technologies since 2017. Iranian-American businessman, formerly CEO of Expedia Group.' }], connections: [] },
  { name: 'Warby Parker', id: slug('Warby Parker'), type: 'eyewear company', category: 'Retail & Consumer Goods', description: 'Warby Parker is a direct-to-consumer eyewear company co-founded by Neil Blumenthal and Dave Gilboa while students at Wharton. The company disrupted the eyewear industry by offering stylish prescription glasses starting at $95, bypassing the Luxottica monopoly. Warby Parker went public in 2021 and operates over 200 retail stores.', website: 'https://www.warbyparker.com', founded: 2010, individuals: [{ id: slug('Neil Blumenthal'), name: 'Neil Blumenthal', role: 'Co-Founder & Co-CEO', bio: 'Co-founder and Co-CEO of Warby Parker. Disrupted the eyewear industry with direct-to-consumer model.' }, { id: slug('Dave Gilboa'), name: 'Dave Gilboa', role: 'Co-Founder & Co-CEO', bio: 'Co-founder and Co-CEO of Warby Parker.' }], connections: [] },
  { name: 'WeWork', id: slug('WeWork'), type: 'coworking company', category: 'Real Estate & Property', description: 'WeWork is a provider of coworking spaces, operating hundreds of locations worldwide. Co-founded by Adam Neumann and Miguel McKelvey in 2010, WeWork was once valued at $47 billion before a dramatic collapse. Neumann, an Israeli-American entrepreneur, became one of the most notorious figures in startup culture. WeWork eventually went public via SPAC and filed for bankruptcy in 2023.', website: 'https://www.wework.com', founded: 2010, individuals: [{ id: slug('Adam Neumann'), name: 'Adam Neumann', role: 'Co-Founder', bio: 'Co-founder and former CEO of WeWork. Israeli-American entrepreneur whose leadership style and WeWork\'s failed IPO became a defining business story of the 2010s.' }], connections: [{ name: 'SoftBank Group', type: 'major investor', description: 'SoftBank invested over $18 billion in WeWork.' }] },
  { name: 'The Washington Post', id: slug('The Washington Post'), type: 'newspaper', category: 'Entertainment & Media', description: 'The Washington Post is one of the most important newspapers in the United States. The Meyer-Graham family, who were Jewish, owned and operated the paper from 1933 to 2013. Eugene Meyer purchased the paper at a bankruptcy auction in 1933, and his daughter Katharine Graham became one of the most powerful women in American media, overseeing the Pentagon Papers and Watergate coverage. Jeff Bezos acquired the paper in 2013.', website: 'https://www.washingtonpost.com', founded: 1877, individuals: [{ id: slug('Eugene Meyer WaPo'), name: 'Eugene Meyer', role: 'Former Owner & Publisher', bio: 'Former owner of The Washington Post (1933-1946). Jewish financier and former Chairman of the Federal Reserve.' }, { id: slug('Katharine Graham'), name: 'Katharine Graham', role: 'Former Publisher', bio: 'Former publisher of The Washington Post (1963-1979). Oversaw Pentagon Papers and Watergate coverage. One of the most powerful women in American media history.' }], connections: [{ name: 'The New York Times Company', type: 'media peer', description: 'The two most important newspapers in the United States.' }] },
  { name: 'Bloomberg LP', id: slug('Bloomberg LP'), type: 'financial data & media', category: 'Entertainment & Media', description: 'Bloomberg LP is a global financial, software, data, and media company. Founded by Michael Bloomberg, a billionaire who also served as Mayor of New York City for three terms (2002-2013). The Bloomberg Terminal is used by over 325,000 financial professionals worldwide, generating the majority of the company\'s estimated $12 billion in annual revenue.', website: 'https://www.bloomberg.com', founded: 1981, individuals: [{ id: slug('Michael Bloomberg'), name: 'Michael Bloomberg', role: 'Founder & CEO', bio: 'Founder and majority owner of Bloomberg LP. Former three-term Mayor of New York City. One of the world\'s wealthiest people and among the largest philanthropists in history.' }], connections: [{ name: 'Reuters (Thompson Reuters)', type: 'industry rival', description: 'Both are major financial data and news providers.' }, { name: 'The New York Times Company', type: 'media peer', description: 'Both are major New York-based media companies.' }] },
  { name: 'Soros Fund Management', id: slug('Soros Fund Management'), type: 'fund management', category: 'Investment & Private Equity', description: 'Soros Fund Management is the principal asset management firm of George Soros, a Hungarian-born Jewish American billionaire investor and philanthropist. Soros is known for "breaking the Bank of England" in 1992 (earning $1 billion in a single day) and for his extensive philanthropic work through the Open Society Foundations, which have distributed over $32 billion worldwide.', website: '', founded: 1969, individuals: [{ id: slug('George Soros'), name: 'George Soros', role: 'Founder & Chairman', bio: 'Founder of Soros Fund Management and Open Society Foundations. Hungarian-born Holocaust survivor and one of the most successful investors in history. Has donated over $32 billion to philanthropic causes.' }], connections: [{ name: 'Renaissance Technologies', type: 'hedge fund peer', description: 'Both are legendary hedge funds with extraordinary long-term track records.' }, { name: 'Open Society Foundations', type: 'philanthropy', description: 'Soros founded the Open Society Foundations with over $32 billion in donations.' }] },
  { name: 'Oppenheimer Holdings', id: slug('Oppenheimer Holdings'), type: 'financial services', category: 'Banking & Financial Services', description: 'Oppenheimer Holdings Inc. is a leading middle-market investment bank and full-service broker-dealer headquartered in New York City. The Oppenheimer name in finance traces to investment banks established by Jewish financiers. The current firm provides investment banking, asset management, wealth management, and securities brokerage services to corporations, institutions, and high net-worth individuals.', website: 'https://www.oppenheimer.com', founded: 1881, individuals: [], connections: [{ name: 'Goldman Sachs', type: 'industry peer', description: 'Both are New York-based investment banks.' }] },
  { name: 'Saban Capital Group', id: slug('Saban Capital Group'), type: 'investment firm', category: 'Investment & Private Equity', description: 'Saban Capital Group is the private investment firm of Haim Saban, an Israeli-American media mogul. Saban co-founded Fox Family Worldwide (sold to Disney for $5.2 billion), created the Mighty Morphin Power Rangers franchise, and was a major stakeholder in Univision. He is one of the largest political donors in the US and a major supporter of Israel-related causes.', website: '', founded: 2001, individuals: [{ id: slug('Haim Saban'), name: 'Haim Saban', role: 'Founder & Chairman', bio: 'Founder and Chairman of Saban Capital Group. Israeli-Egyptian-American media mogul. Created Power Rangers. One of the largest political donors in the US.' }], connections: [{ name: 'The Walt Disney Company', type: 'business partner', description: 'Saban sold Fox Family Worldwide to Disney for $5.2 billion in 2001.' }] },
  { name: 'Simon Property Group', id: slug('Simon Property Group'), type: 'real estate investment trust', category: 'Real Estate & Property', description: 'Simon Property Group is the largest real estate investment trust (REIT) in the United States and the largest shopping mall operator in the world. Founded by Melvin Simon and Herbert Simon in 1960, the company owns or has interests in over 200 properties across the Americas, Europe, and Asia. The Simon family built an enormous retail real estate empire from Indianapolis.', website: 'https://www.simon.com', founded: 1960, individuals: [{ id: slug('David Simon SPG'), name: 'David Simon', role: 'Chairman & CEO', bio: 'Chairman, CEO, and President of Simon Property Group. Son of co-founder Melvin Simon.' }, { id: slug('Herbert Simon'), name: 'Herbert Simon', role: 'Co-Founder', bio: 'Co-founder of Simon Property Group. Jewish American businessman and philanthropist based in Indianapolis.' }], connections: [{ name: 'Westfield Corporation', type: 'retail real estate peer', description: 'Both are among the world\'s largest shopping center companies.' }, { name: 'Related Companies', type: 'real estate peer', description: 'Both are major US real estate companies.' }] },
  { name: 'National Council of Jewish Women', id: slug('National Council of Jewish Women'), type: 'advocacy organization', category: 'Advocacy & Public Affairs', description: 'The National Council of Jewish Women (NCJW) is a grassroots organization of volunteers and advocates inspired by Jewish values who work to improve the quality of life for women, children, and families. Founded in 1893 by Hannah Greenbaum Solomon, NCJW was a pioneering Jewish women\'s organization and has over 90 chapters nationwide focusing on reproductive rights, child welfare, and social justice.', website: 'https://www.ncjw.org', founded: 1893, individuals: [{ id: slug('Hannah Greenbaum Solomon'), name: 'Hannah Greenbaum Solomon', role: 'Founder', bio: 'Founder of the National Council of Jewish Women in 1893. Pioneer in Jewish women\'s activism and social reform.' }], connections: [{ name: 'Hadassah (Women\'s Zionist Organization)', type: 'Jewish women\'s org peer', description: 'Both are major Jewish women\'s organizations in the United States.' }] },
  { name: 'Union for Reform Judaism', id: slug('Union for Reform Judaism'), type: 'religious denomination', category: 'Religion & Synagogues', description: 'The Union for Reform Judaism (URJ) is the congregational arm of Reform Judaism in North America, encompassing nearly 850 congregations with approximately 1.5 million affiliated members. Reform Judaism is the largest Jewish denomination in the United States. The URJ provides leadership and resources to congregations, runs summer camps, and operates the Religious Action Center for political advocacy.', website: 'https://urj.org', founded: 1873, individuals: [{ id: slug('Rabbi Rick Jacobs'), name: 'Rabbi Rick Jacobs', role: 'President', bio: 'President of the Union for Reform Judaism. Leader of the largest Jewish denomination in North America.' }], connections: [{ name: 'Hebrew Union College (HUC)', type: 'seminary', description: 'HUC-JIR is the rabbinical seminary of the Reform movement.' }] },
  { name: 'United Synagogue of Conservative Judaism', id: slug('United Synagogue of Conservative Judaism'), type: 'religious denomination', category: 'Religion & Synagogues', description: 'The United Synagogue of Conservative Judaism (USCJ) is the primary organization of Conservative Jewish congregations in North America. It represents approximately 600 congregations and serves as the congregational arm of the Conservative movement, which historically occupied the center of American Jewish religious life. The movement emphasizes halacha (Jewish law) while adapting to modernity.', website: 'https://www.uscj.org', founded: 1913, individuals: [], connections: [{ name: 'Union for Reform Judaism', type: 'denominational peer', description: 'The two largest non-Orthodox Jewish denominations in North America.' }, { name: 'Jewish Theological Seminary', type: 'seminary', description: 'JTS is the primary rabbinical seminary of the Conservative movement.' }] },
  { name: 'Orthodox Union', id: slug('Orthodox Union'), type: 'religious denomination', category: 'Religion & Synagogues', description: 'The Orthodox Union (OU) is the largest Orthodox Jewish organization in the United States, serving nearly 1,000 congregations. It is best known for its kosher certification program (the OU symbol appears on over 1 million products worldwide), making it the world\'s largest kosher certification agency. The OU also operates NCSY youth programs and advocates for Israel and religious liberty.', website: 'https://www.ou.org', founded: 1898, individuals: [], connections: [{ name: 'United Synagogue of Conservative Judaism', type: 'denominational peer', description: 'Major American Jewish denominational organizations.' }, { name: 'Agudath Israel of America', type: 'Orthodox peer', description: 'Both are major Orthodox Jewish organizations in the US.' }] },
  { name: 'Yeshiva University', id: slug('Yeshiva University'), type: 'university', category: 'Education & Academia', description: 'Yeshiva University is a private Jewish research university in New York City. It is the oldest and most comprehensive educational institution under Jewish auspices in America, with undergraduate campuses in Washington Heights and Midtown Manhattan. YU is known for its dual curriculum integrating Torah study with secular academics, its Albert Einstein College of Medicine, and the Benjamin N. Cardozo School of Law.', website: 'https://www.yu.edu', founded: 1886, individuals: [{ id: slug('Ari Berman'), name: 'Ari Berman', role: 'President', bio: 'President of Yeshiva University. Rabbi and academic leader.' }], connections: [{ name: 'Orthodox Union', type: 'religious connection', description: 'Both are major institutions of Modern Orthodox Judaism.' }] },
  { name: 'Brandeis University', id: slug('Brandeis University'), type: 'university', category: 'Education & Academia', description: 'Brandeis University is a private research university in Waltham, Massachusetts, founded in 1948 and named after Louis Brandeis, the first Jewish Supreme Court Justice. It is the only non-sectarian Jewish-sponsored college or university in the country. Despite its young age, Brandeis is ranked among the top 40 national universities and is known for its strong programs in social policy, neuroscience, and the liberal arts.', website: 'https://www.brandeis.edu', founded: 1948, individuals: [], connections: [{ name: 'Yeshiva University', type: 'Jewish university peer', description: 'Both are prominent American universities with Jewish founding and heritage.' }] },
  { name: 'Hillel International', id: slug('Hillel International'), type: 'campus organization', category: 'Education & Academia', description: 'Hillel International is the largest Jewish campus organization in the world, operating at more than 550 colleges and universities across North America and internationally. Founded by Rabbi Benjamin Frankel at the University of Illinois in 1923, Hillel engages college students in Jewish life through cultural, social, educational, and Israel-related programming. Hillel reaches approximately 140,000 students annually.', website: 'https://www.hillel.org', founded: 1923, individuals: [{ id: slug('Adam Lehman'), name: 'Adam Lehman', role: 'President & CEO', bio: 'President and CEO of Hillel International, the world\'s largest Jewish campus organization.' }], connections: [{ name: 'Brandeis University', type: 'academic connection', description: 'Hillel operates on hundreds of campuses including Brandeis.' }, { name: 'Birthright Israel', type: 'program partner', description: 'Many Hillel students participate in Birthright Israel trips.' }] },
  { name: 'Museum of Jewish Heritage', id: slug('Museum of Jewish Heritage'), type: 'museum', category: 'Heritage & Memorials', description: 'The Museum of Jewish Heritage - A Living Memorial to the Holocaust is located in Battery Park City, Manhattan. It documents 20th and 21st century Jewish history and the Holocaust through personal objects, photographs, and documentary films. The museum\'s hexagonal shape recalls the six million Jews killed in the Holocaust and the Star of David. It serves as New York City\'s primary Holocaust memorial institution.', website: 'https://www.mjhnyc.org', founded: 1997, individuals: [], connections: [{ name: 'United States Holocaust Memorial Museum', type: 'museum peer', description: 'Both are major US Holocaust memorial museums.' }, { name: 'Yad Vashem', type: 'memorial peer', description: 'Both are major Holocaust memorial institutions.' }] },
  { name: 'American Jewish Committee (AJC)', id: slug('American Jewish Committee AJC'), type: 'advocacy organization', category: 'Advocacy & Public Affairs', description: 'The American Jewish Committee (AJC) is a global Jewish advocacy organization founded in 1906 in response to pogroms in Russia. AJC works to combat antisemitism, support Israel, and promote democratic values. It operates offices in over 20 countries and maintains a network of regional offices across the US. AJC publishes the annual Survey of American Jewish Opinion and operates the Transatlantic Institute in Brussels.', website: 'https://www.ajc.org', founded: 1906, individuals: [{ id: slug('Ted Deutch'), name: 'Ted Deutch', role: 'CEO', bio: 'CEO of American Jewish Committee. Former US Congressman from Florida.' }], connections: [{ name: 'Anti-Defamation League (ADL)', type: 'advocacy peer', description: 'Both are major American Jewish advocacy organizations combating antisemitism.' }] },
  { name: 'Simon Wiesenthal Center', id: slug('Simon Wiesenthal Center'), type: 'human rights organization', category: 'Advocacy & Public Affairs', description: 'The Simon Wiesenthal Center (SWC) is a global Jewish human rights organization founded in 1977. Named after the famous Nazi hunter Simon Wiesenthal, the Center combats antisemitism, promotes tolerance, and operates the Museum of Tolerance in Los Angeles. The SWC has over 400,000 member families and has been involved in bringing Nazi war criminals to justice.', website: 'https://www.wiesenthal.com', founded: 1977, individuals: [{ id: slug('Marvin Hier'), name: 'Marvin Hier', role: 'Founder & Dean', bio: 'Founder and Dean of the Simon Wiesenthal Center. Received an Academy Award for his documentary work.' }], connections: [{ name: 'American Jewish Committee (AJC)', type: 'advocacy peer', description: 'Both are major Jewish human rights and advocacy organizations.' }, { name: 'Yad Vashem', type: 'Holocaust remembrance peer', description: 'Both are involved in Holocaust remembrance and documentation.' }] },
  { name: 'Jewish Federations of North America', id: slug('Jewish Federations of North America'), type: 'umbrella organization', category: 'Representative & Umbrella Bodies', description: 'Jewish Federations of North America (JFNA) is the umbrella organization of 146 local Jewish Federations and over 300 independent Jewish communities across North America. JFNA is one of the top 10 charities in North America, raising and distributing over $2 billion annually. It coordinates communal planning, fundraising, and social services for millions of Jews across the continent.', website: 'https://www.jewishfederations.org', founded: 1999, individuals: [], connections: [{ name: 'American Jewish Committee (AJC)', type: 'communal partner', description: 'Both are major American Jewish communal organizations.' }, { name: 'Jewish Agency for Israel', type: 'funding partner', description: 'JFNA is a major funder of the Jewish Agency for Israel.' }] },
  { name: 'Hadassah (Women\'s Zionist Organization)', id: slug('Hadassah Womens Zionist Organization'), type: 'women\'s organization', category: 'Advocacy & Public Affairs', description: 'Hadassah, the Women\'s Zionist Organization of America, is the largest Jewish women\'s organization in the United States with over 300,000 members. Founded by Henrietta Szold in 1912, Hadassah operates Hadassah Medical Center in Jerusalem, supports youth programs in Israel, and advocates for healthcare, women\'s rights, and Israel in the US. It is one of the largest volunteer organizations in the US.', website: 'https://www.hadassah.org', founded: 1912, individuals: [{ id: slug('Henrietta Szold'), name: 'Henrietta Szold', role: 'Founder', bio: 'Founder of Hadassah, the Women\'s Zionist Organization of America. Pioneer of Zionist activism and healthcare in pre-state Israel.' }], connections: [{ name: 'National Council of Jewish Women', type: 'Jewish women\'s org peer', description: 'Both are major Jewish women\'s organizations.' }, { name: 'Hadassah Medical Center', type: 'operating connection', description: 'Hadassah WZO operates Hadassah Medical Center in Jerusalem.' }] },
  { name: 'B\'nai B\'rith International', id: slug('Bnai Brith International'), type: 'service organization', category: 'Community & Social Organizations', description: 'B\'nai B\'rith International is the oldest continuously operating Jewish service organization in the world, founded in 1843 in New York City. Originally a fraternal organization, it evolved into a major Jewish advocacy and human rights group. B\'nai B\'rith operates worldwide, focusing on senior housing, community service, and advocacy at the United Nations and other international bodies.', website: 'https://www.bnaibrith.org', founded: 1843, individuals: [], connections: [{ name: 'Anti-Defamation League (ADL)', type: 'founding connection', description: 'The ADL was originally founded as an arm of B\'nai B\'rith in 1913.' }, { name: 'Jewish Federations of North America', type: 'communal peer', description: 'Both are major American Jewish communal organizations.' }] },
  { name: 'Conference of Presidents of Major American Jewish Organizations', id: slug('Conference of Presidents'), type: 'umbrella body', category: 'Representative & Umbrella Bodies', description: 'The Conference of Presidents of Major American Jewish Organizations (CoP) is the recognized address of the organized American Jewish community in dealing with the Executive Branch of the US government and international bodies. It represents 50 national Jewish organizations, from the Orthodox Union to the Reform movement, and articulates the consensus views of the American Jewish community on matters of concern.', website: 'https://www.conferenceofpresidents.org', founded: 1956, individuals: [], connections: [{ name: 'American Jewish Committee (AJC)', type: 'member organization', description: 'AJC is a member of the Conference of Presidents.' }, { name: 'Jewish Federations of North America', type: 'communal partner', description: 'Both coordinate American Jewish communal life.' }] },
  // UNIVERSITIES WITH SIGNIFICANT JEWISH STUDIES
  { name: 'Harvard Hillel', id: slug('Harvard Hillel'), type: 'campus organization', category: 'Education & Academia', description: 'Harvard Hillel is one of the largest and most active Hillel chapters in the world, serving the approximately 3,000-4,000 Jewish students at Harvard University (one of the highest Jewish student populations in the Ivy League). Harvard Hillel operates Rosovsky Hall, hosts cultural and religious programming, and has been a focal point of campus discussions about Israel and antisemitism.', website: 'https://www.harvardHillel.org', founded: 1944, individuals: [], connections: [{ name: 'Hillel International', type: 'chapter of', description: 'Harvard Hillel is a major chapter of Hillel International.' }] },
  // CONSULTING
  { name: 'McKinsey & Company', id: slug('McKinsey and Company'), type: 'consulting firm', category: 'Consulting', description: 'McKinsey & Company is the world\'s most prestigious management consulting firm, advising the world\'s leading businesses, governments, and institutions. While not a Jewish-founded company, McKinsey has had significant Jewish leadership including former managing directors and numerous Jewish partners. The firm shapes strategy for the world\'s largest organizations.', website: 'https://www.mckinsey.com', founded: 1926, individuals: [], connections: [] },
];

for (const e of us2) add('United States', e);

// ============================================================
// ISRAEL - Wave 2
// ============================================================

const il2 = [
  { name: 'Wix.com', id: slug('Wix.com'), type: 'website builder platform', category: 'Technology', description: 'Wix.com is an Israeli cloud-based web development platform that allows users to create HTML5 websites and mobile sites through drag-and-drop tools. Founded by Avishai Abrahami, Nadav Abrahami, and Giora Kaplan in 2006, Wix has over 250 million registered users in 190 countries. The company trades on NASDAQ with a market cap of several billion dollars.', website: 'https://www.wix.com', founded: 2006, individuals: [{ id: slug('Avishai Abrahami'), name: 'Avishai Abrahami', role: 'Co-Founder & CEO', bio: 'Co-founder and CEO of Wix.com. Israeli technology entrepreneur.' }], connections: [{ name: 'Monday.com', type: 'Israeli tech peer', description: 'Both are major Israeli SaaS companies.' }] },
  { name: 'IronSource (Unity Technologies)', id: slug('IronSource'), type: 'technology company', category: 'Technology', description: 'IronSource was an Israeli technology company specializing in mobile app monetization and distribution. Founded in Tel Aviv in 2010, it merged with Unity Technologies in a $4.4 billion deal in 2022. IronSource was one of Israel\'s largest tech companies by valuation and a major player in the mobile advertising ecosystem.', website: '', founded: 2010, individuals: [{ id: slug('Tomer Bar-Zeev'), name: 'Tomer Bar-Zeev', role: 'Co-Founder & CEO', bio: 'Co-founder and former CEO of IronSource. Israeli tech entrepreneur.' }], connections: [{ name: 'Monday.com', type: 'Israeli tech peer', description: 'Both are major Israeli technology companies.' }] },
  { name: 'Playtika', id: slug('Playtika'), type: 'gaming company', category: 'Entertainment & Media', description: 'Playtika is an Israeli mobile gaming company and one of the world\'s largest social casino gaming companies. Founded in 2010, it was acquired by a Chinese consortium for $4.4 billion in 2016 and went public on NASDAQ in 2021. Playtika games are played by over 35 million monthly active users worldwide.', website: 'https://www.playtika.com', founded: 2010, individuals: [{ id: slug('Robert Antokol'), name: 'Robert Antokol', role: 'Co-Founder & CEO', bio: 'Co-founder and CEO of Playtika, one of the world\'s largest social gaming companies.' }], connections: [] },
  { name: 'SolarEdge Technologies', id: slug('SolarEdge Technologies'), type: 'solar energy company', category: 'Utilities & Energy', description: 'SolarEdge Technologies is an Israeli smart energy company providing inverter solutions and monitoring for solar PV systems. Founded in 2006, SolarEdge\'s technology is installed in over 3 million systems in 133 countries. The company trades on NASDAQ and has been a leader in the global solar energy revolution.', website: 'https://www.solaredge.com', founded: 2006, individuals: [{ id: slug('Guy Sella'), name: 'Guy Sella', role: 'Founder & Former CEO', bio: 'Founder and former CEO of SolarEdge. Israeli renewable energy pioneer. Passed away in 2019.' }], connections: [] },
  { name: 'Technion-Israel Institute of Technology', id: slug('Technion-Israel Institute of Technology'), type: 'university', category: 'Education & Academia', description: 'The Technion-Israel Institute of Technology is Israel\'s oldest university and premier science and technology research institution. Founded in 1912 in Haifa, the Technion has produced six Nobel Prize laureates and is considered the primary engine of Israel\'s high-tech economy. Technion alumni have founded companies that created over $40 billion in market value.', website: 'https://www.technion.ac.il', founded: 1912, individuals: [], connections: [{ name: 'Hebrew University of Jerusalem', type: 'academic peer', description: 'Israel\'s two most prestigious and oldest universities.' }, { name: 'Weizmann Institute of Science', type: 'research peer', description: 'Both are elite Israeli research institutions.' }] },
  { name: 'Weizmann Institute of Science', id: slug('Weizmann Institute of Science'), type: 'research institute', category: 'Education & Academia', description: 'The Weizmann Institute of Science is an internationally renowned multidisciplinary research institution in Rehovot, Israel. Named after Chaim Weizmann, Israel\'s first president, it focuses on graduate-level research in natural and exact sciences. The institute is ranked among the top academic institutions worldwide and has produced notable breakthroughs in cancer research, physics, and computer science.', website: 'https://www.weizmann.ac.il', founded: 1934, individuals: [], connections: [{ name: 'Technion-Israel Institute of Technology', type: 'academic peer', description: 'Both are Israel\'s leading research institutions.' }, { name: 'Hebrew University of Jerusalem', type: 'academic peer', description: 'Israel\'s top research universities.' }] },
  { name: 'Birthright Israel', id: slug('Birthright Israel'), type: 'educational program', category: 'Education & Academia', description: 'Birthright Israel (Taglit) is a program that provides free 10-day heritage trips to Israel for young Jewish adults aged 18-32. Founded by Charles Bronfman and Michael Steinhardt in 1999, the program has brought over 800,000 young Jews from 68 countries to Israel. It is largely funded by the State of Israel, private philanthropy, and Jewish organizations worldwide.', website: 'https://www.birthrightisrael.com', founded: 1999, individuals: [{ id: slug('Charles Bronfman'), name: 'Charles Bronfman', role: 'Co-Founder', bio: 'Co-founder of Birthright Israel. Canadian Jewish billionaire and philanthropist. Son of Samuel Bronfman, Seagram\'s founder.' }, { id: slug('Michael Steinhardt'), name: 'Michael Steinhardt', role: 'Co-Founder', bio: 'Co-founder of Birthright Israel. American hedge fund manager and major Jewish philanthropist.' }], connections: [{ name: 'Jewish Agency for Israel', type: 'program partner', description: 'The Jewish Agency is a major partner in operating Birthright Israel.' }, { name: 'Hillel International', type: 'outreach partner', description: 'Hillel promotes Birthright trips on college campuses.' }] },
  { name: 'Jewish Agency for Israel', id: slug('Jewish Agency for Israel'), type: 'quasi-governmental organization', category: 'Advocacy & Public Affairs', description: 'The Jewish Agency for Israel (JAFI) is the largest Jewish nonprofit organization in the world. Founded in 1929, it was instrumental in establishing the State of Israel and has facilitated the immigration (aliyah) of over 3 million Jews to Israel. Today, JAFI runs programs connecting Jews worldwide to Israel, supports new immigrants, and combats antisemitism.', website: 'https://www.jewishagency.org', founded: 1929, individuals: [], connections: [{ name: 'Birthright Israel', type: 'program partner', description: 'JAFI operates and funds Birthright Israel.' }, { name: 'World Zionist Organization', type: 'historical partner', description: 'The Jewish Agency and WZO share historical roots in the Zionist movement.' }] },
  { name: 'Keren Hayesod', id: slug('Keren Hayesod'), type: 'fundraising organization', category: 'Charity & Philanthropy', description: 'Keren Hayesod (United Israel Appeal) is the largest fundraising organization for Israel, operating in over 45 countries. Founded at the World Zionist Congress in 1920, it has raised billions of dollars for immigration absorption, social welfare, education, and rural development in Israel. It is one of the four national institutions mandated by Israeli law.', website: 'https://www.kh-uia.org.il', founded: 1920, individuals: [], connections: [{ name: 'Jewish Agency for Israel', type: 'funding partner', description: 'Keren Hayesod funds many Jewish Agency programs.' }] },
];

for (const e of il2) add('Israel', e);

// ============================================================
// UNITED KINGDOM - Wave 2
// ============================================================

const uk2 = [
  { name: 'WPP plc', id: slug('WPP plc'), type: 'advertising conglomerate', category: 'Advertising & PR', description: 'WPP plc is the world\'s largest advertising services group by revenue. Founded by Sir Martin Sorrell (born to a Jewish family in London) who transformed a small wire basket manufacturer into a global advertising empire through aggressive acquisitions of agencies including J. Walter Thompson, Ogilvy, and Group M. WPP operates in 112 countries with revenues exceeding $17 billion.', website: 'https://www.wpp.com', founded: 1985, individuals: [{ id: slug('Martin Sorrell'), name: 'Sir Martin Sorrell', role: 'Founder', bio: 'Founder and former CEO of WPP. Built the world\'s largest advertising company. British Jewish businessman. Now runs S4 Capital.' }], connections: [{ name: 'Publicis Groupe', type: 'industry rival', description: 'WPP and Publicis are the two largest advertising holding companies in the world.' }] },
  { name: 'N M Rothschild & Sons', id: slug('N M Rothschild and Sons'), type: 'investment bank', category: 'Banking & Financial Services', description: 'N M Rothschild & Sons is the London-based global financial advisory firm of the Rothschild family. Founded in 1811 by Nathan Mayer Rothschild, it is the oldest continuously operating investment bank in the world. The firm advises on mergers, acquisitions, and financial restructuring globally. The Rothschild family remains one of the most prominent Jewish dynasties in finance.', website: 'https://www.rothschild.com', founded: 1811, individuals: [{ id: slug('Nathan Mayer Rothschild'), name: 'Nathan Mayer Rothschild', role: 'Founder', bio: 'Founder of N M Rothschild & Sons. Third generation of the Rothschild banking dynasty. Established the London branch of the family banking empire.' }], connections: [{ name: 'Goldman Sachs', type: 'investment banking peer', description: 'Both are elite global investment banking firms.' }, { name: 'Rothschild & Co', type: 'family connection', description: 'The French and British Rothschild banking houses share family origins.' }] },
  { name: 'Board of Deputies of British Jews', id: slug('Board of Deputies of British Jews'), type: 'representative body', category: 'Representative & Umbrella Bodies', description: 'The Board of Deputies of British Jews is the main representative body for the Jewish community in the United Kingdom and is one of the oldest Jewish communal organizations in the world. Founded in 1760, it represents over 300 synagogues and communal organizations. The Board engages with government, media, and civil society on issues affecting British Jews.', website: 'https://www.bod.org.uk', founded: 1760, individuals: [], connections: [{ name: 'Jewish Leadership Council', type: 'communal partner', description: 'Both represent the British Jewish community to government and media.' }] },
];

for (const e of uk2) add('United Kingdom', e);

// ============================================================
// FRANCE - Wave 2
// ============================================================

const fr2 = [
  { name: 'CRIF (Representative Council of French Jewish Institutions)', id: slug('CRIF'), type: 'representative body', category: 'Representative & Umbrella Bodies', description: 'CRIF (Conseil Representatif des Institutions Juives de France) is the political representative body of the French Jewish community, the third-largest in the world with approximately 450,000 members. Founded in 1944 during the French Resistance, CRIF represents over 60 Jewish organizations and its annual dinner is attended by the President and Prime Minister of France.', website: 'https://www.crif.org', founded: 1944, individuals: [], connections: [{ name: 'Consistoire Central', type: 'communal partner', description: 'CRIF handles political representation while the Consistoire handles religious affairs.' }, { name: 'Board of Deputies of British Jews', type: 'European peer', description: 'Both are the primary representative bodies of their countries\' Jewish communities.' }] },
  { name: 'Rothschild & Co (France)', id: slug('Rothschild and Co France'), type: 'investment bank', category: 'Banking & Financial Services', description: 'Rothschild & Co is a multinational financial services company headquartered in Paris. Founded by the French branch of the Rothschild banking dynasty, it traces its origins to 1838 when James de Rothschild established the bank in Paris. The firm combined with the London Rothschild bank in 2012. President Emmanuel Macron formerly worked as an investment banker at Rothschild & Co.', website: 'https://www.rothschildandco.com', founded: 1838, individuals: [{ id: slug('David de Rothschild FR'), name: 'David de Rothschild', role: 'Chairman of Supervisory Board', bio: 'Chairman of the Supervisory Board of Rothschild & Co. Head of the French branch of the Rothschild banking family.' }], connections: [{ name: 'N M Rothschild & Sons', type: 'family connection', description: 'The French and British Rothschild banks were formally reunited in 2012.' }] },
];

for (const e of fr2) add('France', e);

// ============================================================
// GERMANY - Wave 2
// ============================================================

const de2 = [
  { name: 'Jewish Museum Berlin', id: slug('Jewish Museum Berlin'), type: 'museum', category: 'Heritage & Memorials', description: 'The Jewish Museum Berlin is the largest Jewish museum in Europe, housed in a striking zinc-clad building designed by architect Daniel Libeskind. Opened in 2001, the museum documents two millennia of German-Jewish history. Its permanent exhibition covers the medieval Rhineland communities through emancipation, the Weimar Republic, the Holocaust, and Jewish life in Germany today. It receives over 700,000 visitors annually.', website: 'https://www.jmberlin.de', founded: 2001, individuals: [], connections: [{ name: 'POLIN Museum', type: 'museum peer', description: 'Both are major European Jewish museums documenting Jewish life and the Holocaust.' }, { name: 'Jewish Museum in Prague', type: 'museum peer', description: 'Both are major European Jewish museums.' }] },
  { name: 'Central Council of Jews in Germany', id: slug('Central Council of Jews in Germany'), type: 'representative body', category: 'Representative & Umbrella Bodies', description: 'The Central Council of Jews in Germany (Zentralrat der Juden in Deutschland) is the representative body of Germany\'s Jewish community, which numbers approximately 120,000 members, making it the third-largest in Western Europe. Reestablished after the Holocaust, the community was revitalized by the immigration of approximately 200,000 Jews from the former Soviet Union since 1990.', website: 'https://www.zentralratderjuden.de', founded: 1950, individuals: [{ id: slug('Josef Schuster'), name: 'Josef Schuster', role: 'President', bio: 'President of the Central Council of Jews in Germany. Physician and communal leader from Wurzburg.' }], connections: [{ name: 'Board of Deputies of British Jews', type: 'European peer', description: 'Both are the primary representative bodies of their countries\' Jewish communities.' }, { name: 'CRIF', type: 'European peer', description: 'Both represent major European Jewish communities.' }] },
];

for (const e of de2) add('Germany', e);

// ============================================================
// BELGIUM
// ============================================================

const be = [
  { name: 'Antwerp Diamond Centre', id: slug('Antwerp Diamond Centre'), type: 'trade center', category: 'Manufacturing & Industry', description: 'Antwerp is the diamond capital of the world, and the Antwerp Diamond Centre oversees an industry that handles 84% of the world\'s rough diamonds and 50% of polished diamonds. The Orthodox Jewish community, particularly Hasidic Jews, has played a central role in Antwerp\'s diamond trade for centuries. The Diamond Quarter (Diamantwijk) near Central Station is the historic heart of this trade.', website: 'https://www.awdc.be', founded: 1973, individuals: [], connections: [{ name: 'De Beers Group', type: 'diamond industry connection', description: 'Antwerp is the primary trading hub for De Beers diamonds.' }] },
  { name: 'European Jewish Congress', id: slug('European Jewish Congress'), type: 'representative body', category: 'Representative & Umbrella Bodies', description: 'The European Jewish Congress (EJC), headquartered in Brussels, is the representative organization of Jewish communities across Europe. It represents 42 national Jewish communities and serves as the primary voice of European Jewry to the European Union institutions, Council of Europe, and OSCE. The EJC focuses on combating antisemitism, promoting tolerance, and protecting Jewish life in Europe.', website: 'https://eurojewcong.org', founded: 1986, individuals: [], connections: [{ name: 'World Jewish Congress', type: 'affiliate', description: 'The EJC is the European regional affiliate of the World Jewish Congress.' }, { name: 'CRIF', type: 'member', description: 'CRIF is a member organization of the European Jewish Congress.' }] },
];

for (const e of be) add('Belgium', e);

// ============================================================
// ROMANIA
// ============================================================

const ro = [
  { name: 'Federation of Jewish Communities in Romania', id: slug('Federation Jewish Communities Romania'), type: 'communal organization', category: 'Representative & Umbrella Bodies', description: 'The Federation of Jewish Communities in Romania represents the Romanian Jewish community, which numbered approximately 800,000 before the Holocaust (the third-largest in Europe). Today approximately 5,000-10,000 Jews remain, with communities in Bucharest, Cluj-Napoca, Timisoara, and other cities. The federation maintains synagogues, cemeteries, and educational programs and works on Holocaust remembrance.', website: '', founded: 1948, individuals: [], connections: [{ name: 'European Jewish Congress', type: 'affiliate', description: 'Member of the European Jewish Congress.' }] },
];

for (const e of ro) add('Romania', e);

// ============================================================
// UKRAINE
// ============================================================

const ua = [
  { name: 'Ukrainian Jewish Confederation', id: slug('Ukrainian Jewish Confederation'), type: 'communal organization', category: 'Representative & Umbrella Bodies', description: 'Ukraine was historically home to one of the largest Jewish communities in the world. Before WWII, there were approximately 2.7 million Jews in Ukraine. The modern Ukrainian Jewish community numbers approximately 50,000-200,000. Multiple organizations represent Ukrainian Jewry, including the Ukrainian Jewish Confederation, which coordinates communal affairs across the country.', website: '', founded: 2008, individuals: [], connections: [] },
  { name: 'Babi Yar Holocaust Memorial Center', id: slug('Babi Yar Holocaust Memorial Center'), type: 'memorial', category: 'Heritage & Memorials', description: 'The Babi Yar Holocaust Memorial Center commemorates the site where Nazi forces murdered 33,771 Jews over two days (September 29-30, 1941) in a ravine near Kyiv. It was one of the largest single massacres in the Holocaust. The memorial center, damaged during Russian attacks on Kyiv in 2022, aims to create a comprehensive museum and memorial complex at the site.', website: 'https://babiyn.org', founded: 2016, individuals: [], connections: [{ name: 'Yad Vashem', type: 'memorial peer', description: 'Both are major Holocaust memorial institutions.' }, { name: 'Auschwitz-Birkenau State Museum', type: 'memorial peer', description: 'Both memorialize major sites of the Holocaust.' }] },
];

for (const e of ua) add('Ukraine', e);

// ============================================================
// PANAMA
// ============================================================

const pa = [
  { name: 'Kol Shearith Israel', id: slug('Kol Shearith Israel Panama'), type: 'synagogue', category: 'Religion & Synagogues', description: 'Kol Shearith Israel is the oldest established Jewish congregation in Panama, founded by Sephardic Jews from the Caribbean and South America. Panama\'s Jewish community, numbering approximately 15,000, is one of the most prominent and prosperous in Central America. The community has contributed significantly to Panama\'s business, professional, and civic life since the 19th century.', website: '', founded: 1876, individuals: [], connections: [] },
];

for (const e of pa) add('Panama', e);

// ============================================================
// COLOMBIA
// ============================================================

const co = [
  { name: 'Confederacion de Comunidades Judias de Colombia', id: slug('Confederacion Comunidades Judias Colombia'), type: 'communal organization', category: 'Representative & Umbrella Bodies', description: 'The Confederacion de Comunidades Judias de Colombia is the umbrella organization of the Colombian Jewish community, which numbers approximately 5,000-7,000 members concentrated primarily in Bogota, with smaller communities in Cali, Medellin, and Barranquilla. The community includes Ashkenazi, Sephardic, and Syrian Jewish sub-communities.', website: '', founded: 1968, individuals: [], connections: [] },
];

for (const e of co) add('Colombia', e);

// ============================================================
// PERU
// ============================================================

const pe = [
  { name: 'Asociacion Judia del Peru', id: slug('Asociacion Judia del Peru'), type: 'communal organization', category: 'Representative & Umbrella Bodies', description: 'The Asociacion Judia del Peru (Jewish Association of Peru) represents the Peruvian Jewish community of approximately 2,500 members, concentrated almost entirely in Lima. The community maintains several synagogues (Ashkenazi, Sephardic, and Conservative), a Jewish day school (Colegio Leon Pinelo), and community organizations. Jewish settlement in Peru dates back to the colonial era.', website: '', founded: 1942, individuals: [], connections: [] },
];

for (const e of pe) add('Peru', e);

// ============================================================
// VENEZUELA
// ============================================================

const ve = [
  { name: 'Confederacion de Asociaciones Israelitas de Venezuela', id: slug('CAIV Venezuela'), type: 'communal organization', category: 'Representative & Umbrella Bodies', description: 'CAIV is the umbrella organization of the Venezuelan Jewish community. Once home to approximately 25,000 Jews (mainly in Caracas), the community has dramatically declined due to political instability and antisemitic incidents under the Chavez and Maduro governments. As of the 2020s, fewer than 6,000 Jews remain in Venezuela, with many having emigrated to Israel, the US, and Panama.', website: '', founded: 1960, individuals: [], connections: [] },
];

for (const e of ve) add('Venezuela', e);

// ============================================================
// SINGAPORE
// ============================================================

const sg = [
  { name: 'Singapore Jewish Community', id: slug('Singapore Jewish Community'), type: 'communal organization', category: 'Community & Social Organizations', description: 'The Jewish community of Singapore is small but historically significant, numbering approximately 1,000-2,500 members. Jewish settlement in Singapore dates to the early 19th century, primarily Baghdadi Jews involved in trade. The community operates two synagogues: Maghain Aboth (1878) and Chesed-El (1905). Singapore Jewish leaders have held prominent civic roles including David Marshall, Singapore\'s first Chief Minister.', website: '', founded: 1878, individuals: [{ id: slug('David Marshall SG'), name: 'David Marshall', role: 'Historic Leader', bio: 'Singapore\'s first Chief Minister (1955-56). Born to a Baghdadi Jewish family. Major figure in Singapore\'s road to independence.' }], connections: [] },
];

for (const e of sg) add('Singapore', e);

// ============================================================
// PHILIPPINES
// ============================================================

const ph = [
  { name: 'Jewish Association of the Philippines', id: slug('Jewish Association Philippines'), type: 'communal organization', category: 'Community & Social Organizations', description: 'The Jewish Association of the Philippines represents the small Jewish community of approximately 100-200 members. The Philippines is notable for being the only Asian country to accept Jewish refugees during the Holocaust, when President Manuel Quezon\'s "open door" policy allowed approximately 1,300 Jews to settle in the Philippines between 1937-1941.', website: '', founded: 1940, individuals: [], connections: [] },
];

for (const e of ph) add('Philippines', e);

// ============================================================
// THAILAND
// ============================================================

const th = [
  { name: 'Jewish Association of Thailand', id: slug('Jewish Association Thailand'), type: 'communal organization', category: 'Community & Social Organizations', description: 'The Jewish Association of Thailand serves the approximately 1,000 Jews living in Thailand, primarily in Bangkok. The community grew from a small group of Baghdadi and Bukharan Jewish traders in the 19th century. Today it includes Israeli expatriates, American Jews, and other diaspora Jews. The community operates a synagogue in Bangkok and Chabad houses in Bangkok, Chiang Mai, and other tourist areas.', website: '', founded: 1964, individuals: [], connections: [{ name: 'Chabad', type: 'religious services', description: 'Chabad operates multiple outreach centers across Thailand serving Jewish visitors and residents.' }] },
];

for (const e of th) add('Thailand', e);

// ============================================================
// KENYA
// ============================================================

const ke = [
  { name: 'Nairobi Hebrew Congregation', id: slug('Nairobi Hebrew Congregation'), type: 'synagogue', category: 'Religion & Synagogues', description: 'The Nairobi Hebrew Congregation is the primary Jewish institution in Kenya, serving the small Jewish community of approximately 300-500 members. The community dates back to the early 20th century when Jewish settlers came from Europe and South Africa. Kenya was famously offered as a potential Jewish homeland in the 1903 "Uganda Scheme" (the proposed territory was actually in present-day Kenya).', website: '', founded: 1913, individuals: [], connections: [] },
];

for (const e of ke) add('Kenya', e);

// ============================================================
// NIGERIA
// ============================================================

const ng = [
  { name: 'Igbo Jewish Community', id: slug('Igbo Jewish Community'), type: 'synagogue community', category: 'Religion & Synagogues', description: 'The Igbo Jewish community in Nigeria is a notable emerging Jewish community, with thousands of Igbo people in southeastern Nigeria practicing Judaism. They claim ancestral connections to ancient Israel, and some scholars have noted cultural parallels with Jewish practices. Several synagogues operate in Igbo regions, and some community members have made aliyah to Israel.', website: '', founded: 1900, individuals: [], connections: [] },
];

for (const e of ng) add('Nigeria', e);

// ============================================================
// GHANA
// ============================================================

const gh = [
  { name: 'House of Israel Ghana', id: slug('House of Israel Ghana'), type: 'synagogue community', category: 'Religion & Synagogues', description: 'The House of Israel in Sefwi Wiawso, Ghana, is a community of approximately 200-300 practitioners who identify as Jewish. Founded by Aaron Ahomtre Toakyirafa in the 1970s, the community practices Orthodox Judaism, observes Shabbat, keeps kosher, and follows the Jewish calendar. Some members have been recognized by Israeli authorities and have made aliyah.', website: '', founded: 1976, individuals: [], connections: [] },
];

for (const e of gh) add('Ghana', e);

// ============================================================
// CUBA
// ============================================================

const cu = [
  { name: 'Patronato de la Casa de la Comunidad Hebrea de Cuba', id: slug('Patronato Cuba'), type: 'synagogue', category: 'Religion & Synagogues', description: 'The Patronato de la Casa de la Comunidad Hebrea de Cuba (Beth Shalom) in Havana is the primary institution of the Cuban Jewish community. Cuba\'s Jewish community peaked at approximately 15,000 in the 1950s but most left after the Cuban Revolution. Today approximately 1,000-1,500 Jews remain, maintaining community life despite economic hardship and Cuba\'s lack of formal diplomatic relations with Israel.', website: '', founded: 1953, individuals: [], connections: [] },
];

for (const e of cu) add('Cuba', e);

// ============================================================
// JAMAICA
// ============================================================

const jm = [
  { name: 'United Congregation of Israelites', id: slug('United Congregation Israelites Jamaica'), type: 'synagogue', category: 'Religion & Synagogues', description: 'The United Congregation of Israelites in Kingston, Jamaica, is one of the oldest Jewish communities in the Americas. Jewish settlement in Jamaica began with Spanish and Portuguese Jews fleeing the Inquisition in the 1500s. Jamaica\'s Jewish community numbered several thousand in the 18th century and played a significant role in the island\'s trade and commerce. Today approximately 200 Jews live in Jamaica.', website: '', founded: 1655, individuals: [], connections: [] },
];

for (const e of jm) add('Jamaica', e);

// ============================================================
// FINLAND
// ============================================================

const fi = [
  { name: 'Jewish Community of Helsinki', id: slug('Jewish Community Helsinki'), type: 'communal organization', category: 'Community & Social Organizations', description: 'The Jewish Community of Helsinki is the primary Jewish institution in Finland, representing approximately 1,200-1,500 Jews. Finland is notable for being the only Axis-aligned country that did not surrender its Jewish population to the Nazis during WWII. Finnish Jews fought in the Finnish army alongside Germany against the Soviet Union, creating a unique chapter in WWII history.', website: '', founded: 1918, individuals: [], connections: [] },
];

for (const e of fi) add('Finland', e);

// ============================================================
// PORTUGAL
// ============================================================

const pt = [
  { name: 'Jewish Community of Lisbon', id: slug('Jewish Community Lisbon'), type: 'communal organization', category: 'Community & Social Organizations', description: 'The Jewish Community of Lisbon (Comunidade Israelita de Lisboa) represents the approximately 3,000 Jews in Portugal. Portugal played a complex historical role, hosting a major Jewish community before the forced conversion of 1497, then serving as an escape route during the Holocaust when consul Aristides de Sousa Mendes defied orders and issued visas to thousands of Jewish refugees. In 2015, Portugal passed a law offering citizenship to descendants of Sephardic Jews expelled during the Inquisition.', website: 'https://www.cilisboa.org', founded: 1912, individuals: [], connections: [{ name: 'Federation of Jewish Communities of Spain', type: 'Iberian peer', description: 'Both represent Jewish communities on the Iberian Peninsula with shared Sephardic heritage.' }] },
];

for (const e of pt) add('Portugal', e);

// ============================================================
// REBUILD AFFILIATIONS & SORT
// ============================================================
console.log(`Added ${added} new entries`);
console.log('Rebuilding affiliations...');
const affMap = {};
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    for (const ind of (entry.individuals || [])) {
      if (!affMap[ind.id]) affMap[ind.id] = [];
      affMap[ind.id].push({ organization: entry.name, role: ind.role || 'Associated', entryId: entry.id, country });
    }
  }
}
let affCount = 0;
for (const pid in peopleData.people) {
  if (!peopleData.people[pid].affiliations) peopleData.people[pid].affiliations = [];
  if (affMap[pid]) {
    for (const aff of affMap[pid]) {
      if (!peopleData.people[pid].affiliations.some(a => a.entryId === aff.entryId)) {
        peopleData.people[pid].affiliations.push(aff);
        affCount++;
      }
    }
  }
}
console.log(`Updated ${affCount} affiliations`);

// Sort entries by prominence within each country
console.log('Sorting all entries by prominence...');
for (const country in data.countries) {
  data.countries[country].sort((a, b) => {
    const scoreA = (a.connections ? a.connections.length : 0) * 3 + (a.individuals ? a.individuals.length : 0) * 2 + (a.description ? a.description.length : 0) / 100;
    const scoreB = (b.connections ? b.connections.length : 0) * 3 + (b.individuals ? b.individuals.length : 0) * 2 + (b.description ? b.description.length : 0) / 100;
    return scoreB - scoreA;
  });
}

// Sort countries by entry count
const sorted = {};
const countryKeys = Object.keys(data.countries).sort((a, b) => data.countries[b].length - data.countries[a].length);
for (const k of countryKeys) sorted[k] = data.countries[k];
data.countries = sorted;

// SAVE
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2));

let totalEntries = 0, totalConns = 0;
const catSet = new Set();
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    totalEntries++;
    if (entry.category) catSet.add(entry.category);
    if (entry.connections) totalConns += entry.connections.length;
  }
}

console.log('\n=== FINAL STATS ===');
console.log(`Entries: ${totalEntries}`);
console.log(`Countries: ${Object.keys(data.countries).length}`);
console.log(`People: ${Object.keys(peopleData.people).length}`);
console.log(`Connections: ${totalConns}`);
console.log(`Categories: ${catSet.size}`);
console.log('Done!');
