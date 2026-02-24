// expandData22.js - Major data expansion: new entries, people, connections across many countries
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
function addIndividualToEntry(entryId, individual) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) {
        if (!entry.individuals) entry.individuals = [];
        if (entry.individuals.some(i => i.id === individual.id)) return;
        entry.individuals.push(individual);
        return;
      }
    }
  }
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

// ============================================================
// PART 1: NEW ENTRIES
// ============================================================
console.log('Part 1: Adding new entries...');
let newEntries = 0;

// --- UNITED STATES ---
const usEntries = [
  {
    name: 'Touro University',
    id: slug('Touro University'),
    type: 'university system',
    category: 'Education & Academia',
    description: 'Touro University is a Jewish-sponsored independent institution of higher learning with campuses across the United States and abroad. Founded in 1970 by Rabbi Bernard Lander, it operates multiple colleges and schools including law, medicine, pharmacy, and education. Named after Judah Touro, the 19th-century philanthropist, it is one of the largest Jewish-sponsored educational systems in the world with over 19,000 students.',
    website: 'https://www.touro.edu',
    founded: 1970,
    individuals: [
      { id: slug('Bernard Lander'), name: 'Bernard Lander', role: 'Founder', bio: 'Rabbi and educator who founded Touro College in 1970 to serve underserved communities.' },
      { id: slug('Alan Kadish'), name: 'Alan Kadish', role: 'President', bio: 'President of Touro University, cardiologist and academic leader.' }
    ],
    connections: [
      { name: 'Yeshiva University', type: 'academic peer', description: 'Both are major Jewish-affiliated universities in New York.' },
      { name: 'Hebrew Union College (HUC)', type: 'academic peer', description: 'Jewish-affiliated institutions of higher learning.' }
    ]
  },
  {
    name: 'Repair the World',
    id: slug('Repair the World'),
    type: 'service organization',
    category: 'Community & Social Organizations',
    description: 'Repair the World is a Jewish service organization that mobilizes young adults to volunteer and address community needs. Founded in 2009 with support from major Jewish philanthropies, it operates in multiple cities and engages thousands of volunteers annually in projects addressing food insecurity, education gaps, and housing instability.',
    website: 'https://werepair.org',
    founded: 2009,
    individuals: [
      { id: slug('Cindy Greenberg'), name: 'Cindy Greenberg', role: 'CEO', bio: 'CEO of Repair the World, leading Jewish service initiatives.' }
    ],
    connections: [
      { name: 'BBYO', type: 'youth engagement', description: 'Both engage Jewish youth in community involvement.' },
      { name: 'American Jewish World Service', type: 'service partner', description: 'Both focus on Jewish values-driven social impact.' }
    ]
  },
  {
    name: 'The Jewish Federations of North America',
    id: slug('The Jewish Federations of North America'),
    type: 'umbrella organization',
    category: 'Representative & Umbrella Bodies',
    description: 'The Jewish Federations of North America (JFNA) represents 146 Jewish Federations and 300 independent communities across North America. It is the largest Jewish philanthropic system in the world, collectively raising and distributing over $3 billion annually for social welfare, education, and Israel-related causes. JFNA coordinates disaster relief, advocates on public policy, and supports Jewish community planning.',
    website: 'https://www.jewishfederations.org',
    founded: 1999,
    individuals: [
      { id: slug('Eric Fingerhut'), name: 'Eric Fingerhut', role: 'President & CEO', bio: 'President and CEO of the Jewish Federations of North America. Former US Congressman from Ohio and president of Hillel International.' },
      { id: slug('Julie Platt'), name: 'Julie Platt', role: 'Chair of the Board', bio: 'Chair of the Board of Trustees of JFNA. Prominent communal leader and philanthropist.' }
    ],
    connections: [
      { name: 'UJA-Federation of New York', type: 'member federation', description: 'UJA-Federation is the largest member federation of JFNA.' },
      { name: 'Jewish Agency for Israel', type: 'funding partner', description: 'JFNA is a major funder of the Jewish Agency.' },
      { name: 'American Jewish Joint Distribution Committee', type: 'funding partner', description: 'JFNA channels major funding to JDC for overseas operations.' },
      { name: 'Hillel International', type: 'communal partner', description: 'Eric Fingerhut previously led Hillel International before heading JFNA.' }
    ]
  },
  {
    name: 'National Museum of American Jewish History',
    id: slug('National Museum of American Jewish History'),
    type: 'museum',
    category: 'Heritage & Memorials',
    description: 'The National Museum of American Jewish History is the only museum in the nation dedicated exclusively to exploring and interpreting the American Jewish experience. Located on Independence Mall in Philadelphia, the museum opened its current building in 2010 and houses a collection spanning over 360 years of American Jewish life through artifacts, documents, and interactive exhibits.',
    website: 'https://www.nmajh.org',
    founded: 1976,
    individuals: [
      { id: slug('Misha Galperin'), name: 'Misha Galperin', role: 'CEO', bio: 'CEO of the National Museum of American Jewish History.' }
    ],
    connections: [
      { name: 'Museum of the Jewish People at Beit Hatfutsot', type: 'museum peer', description: 'Both are major Jewish history museums with complementary missions.' },
      { name: 'Smithsonian Institution', type: 'affiliate', description: 'NMAJH is a Smithsonian-affiliated museum.' }
    ]
  },
  {
    name: 'Maimonides Fund',
    id: slug('Maimonides Fund'),
    type: 'philanthropic fund',
    category: 'Philanthropy & Foundations',
    description: 'The Maimonides Fund is a private philanthropy that supports initiatives strengthening Jewish life, Israel, and democratic society. It funds programs in Jewish education, Israel-Diaspora relations, and combating antisemitism. The fund supports organizations across the political spectrum and focuses on long-term strategic investments in Jewish communal infrastructure.',
    website: 'https://www.maimonidesfund.org',
    founded: 2014,
    individuals: [
      { id: slug('Mark Charendoff'), name: 'Mark Charendoff', role: 'President', bio: 'President of the Maimonides Fund and former president of the Jewish Funders Network.' }
    ],
    connections: [
      { name: 'Birthright Israel', type: 'funder', description: 'Maimonides Fund supports Israel trip programming.' },
      { name: 'The Jewish Federations of North America', type: 'communal partner', description: 'Works alongside federation system on community building.' }
    ]
  },
  {
    name: 'PJ Library',
    id: slug('PJ Library'),
    type: 'educational program',
    category: 'Education & Academia',
    description: 'PJ Library is a program of the Harold Grinspoon Foundation that sends free Jewish-content books and music to families with young children on a monthly basis. Launched in 2005, PJ Library now reaches over 680,000 children in 35 countries, making it one of the largest Jewish family engagement programs globally. The program distributes over 12 million books annually.',
    website: 'https://pjlibrary.org',
    founded: 2005,
    individuals: [
      { id: slug('Harold Grinspoon'), name: 'Harold Grinspoon', role: 'Founder', bio: 'Businessman and philanthropist who founded PJ Library through his Harold Grinspoon Foundation.' },
      { id: slug('Winnie Sandler Grinspoon'), name: 'Winnie Sandler Grinspoon', role: 'President', bio: 'President of the Harold Grinspoon Foundation overseeing PJ Library operations.' }
    ],
    connections: [
      { name: 'The Jewish Federations of North America', type: 'distribution partner', description: 'Jewish Federations serve as local distribution partners for PJ Library.' },
      { name: 'Sifriyat Pijama', type: 'Israeli counterpart', description: 'PJ Library operates as Sifriyat Pijama in Israel, reaching Israeli children.' }
    ]
  },
  {
    name: 'Secure Community Network',
    id: slug('Secure Community Network'),
    type: 'security organization',
    category: 'Defense & Security',
    description: 'The Secure Community Network (SCN) is the official safety and security organization of the Jewish community in North America. Established in 2004 under the auspices of the Jewish Federations of North America and the Conference of Presidents of Major American Jewish Organizations, SCN works with federal, state, and local law enforcement and coordinates security training, threat assessment, and incident management for Jewish institutions.',
    website: 'https://securecommunitynetwork.org',
    founded: 2004,
    individuals: [
      { id: slug('Michael Masters'), name: 'Michael Masters', role: 'CEO', bio: 'National Director and CEO of the Secure Community Network. Former DHS official.' }
    ],
    connections: [
      { name: 'The Jewish Federations of North America', type: 'parent organization', description: 'SCN operates under JFNA auspices.' },
      { name: 'Conference of Presidents of Major American Jewish Organizations', type: 'parent organization', description: 'SCN was co-founded by the Conference of Presidents.' },
      { name: 'Anti-Defamation League', type: 'security partner', description: 'ADL and SCN coordinate on antisemitism threat monitoring and response.' }
    ]
  },
  {
    name: 'HIAS (Hebrew Immigrant Aid Society)',
    id: slug('HIAS Hebrew Immigrant Aid Society'),
    type: 'refugee assistance',
    category: 'Community & Social Organizations',
    description: 'HIAS is a Jewish American nonprofit organization that provides humanitarian aid and assistance to refugees worldwide. Originally founded in 1881 to assist Jews fleeing pogroms in Russia and Eastern Europe, HIAS has expanded its mission to help all refugees regardless of religion or nationality. It operates in over 20 countries and resettles thousands of refugees annually in the United States.',
    website: 'https://www.hias.org',
    founded: 1881,
    individuals: [
      { id: slug('Mark Hetfield'), name: 'Mark Hetfield', role: 'President & CEO', bio: 'President and CEO of HIAS since 2013. Human rights and immigration lawyer.' }
    ],
    connections: [
      { name: 'American Jewish Joint Distribution Committee', type: 'humanitarian partner', description: 'Both organizations assist displaced populations globally.' },
      { name: 'UJA-Federation of New York', type: 'funder', description: 'UJA-Federation has been a major supporter of HIAS operations.' },
      { name: 'United Nations High Commissioner for Refugees', type: 'partner', description: 'HIAS works with UNHCR on refugee resettlement programs.' }
    ]
  },
  {
    name: 'Shalom Hartman Institute of North America',
    id: slug('Shalom Hartman Institute of North America'),
    type: 'research institute',
    category: 'Research & Think Tanks',
    description: 'The Shalom Hartman Institute of North America is the North American branch of the Jerusalem-based Shalom Hartman Institute. It provides Jewish thought leadership through educational programs for rabbis, educators, lay leaders, and the broader public. The institute runs the iEngage project on Israel education and hosts intensive leadership programs shaping contemporary Jewish discourse.',
    website: 'https://hartman.org.il/north-america',
    founded: 2010,
    individuals: [
      { id: slug('Yehuda Kurtzer'), name: 'Yehuda Kurtzer', role: 'President', bio: 'President of the Shalom Hartman Institute of North America. Scholar of American Jewish life.' }
    ],
    connections: [
      { name: 'Shalom Hartman Institute', type: 'parent organization', description: 'North American branch of the Jerusalem-based institute.' },
      { name: 'Rabbinical Assembly', type: 'educational partner', description: 'Partners on rabbinic education and leadership programs.' }
    ]
  },
  {
    name: 'Foundation for Jewish Camp',
    id: slug('Foundation for Jewish Camp'),
    type: 'foundation',
    category: 'Philanthropy & Foundations',
    description: 'The Foundation for Jewish Camp (FJC) provides leadership and financial resources to Jewish camps across North America. It supports over 300 Jewish overnight and day camps, which collectively serve more than 180,000 campers. FJC runs the One Happy Camper incentive grant program that provides first-time campers with subsidies to attend Jewish camp.',
    website: 'https://jewishcamp.org',
    founded: 1998,
    individuals: [
      { id: slug('Jeremy Fingerman'), name: 'Jeremy Fingerman', role: 'CEO', bio: 'CEO of the Foundation for Jewish Camp. Former executive at major consumer brands.' }
    ],
    connections: [
      { name: 'The Jewish Federations of North America', type: 'communal partner', description: 'Works with federations on camp access and affordability.' },
      { name: 'Birthright Israel', type: 'youth engagement peer', description: 'Both focus on immersive Jewish experiences for young people.' }
    ]
  },
  {
    name: 'Cantor Fitzgerald',
    id: slug('Cantor Fitzgerald'),
    type: 'financial services firm',
    category: 'Banking & Financial Services',
    description: 'Cantor Fitzgerald is a global financial services firm founded in 1945. The firm operates across institutional equity and fixed income sales, trading, and research. Cantor Fitzgerald became nationally prominent after the September 11, 2001 attacks, in which the firm lost 658 employees at its World Trade Center headquarters. Under CEO Howard Lutnick, the firm rebuilt and expanded into new business areas including commercial real estate finance.',
    website: 'https://www.cantor.com',
    founded: 1945,
    individuals: [
      { id: slug('Howard Lutnick'), name: 'Howard Lutnick', role: 'Chairman & CEO', bio: 'Chairman and CEO of Cantor Fitzgerald since 1991. Guided the firm through its rebuilding after September 11, 2001, when it lost 658 employees.' }
    ],
    connections: [
      { name: 'Goldman Sachs', type: 'industry peer', description: 'Both are major financial services firms in New York.' },
      { name: 'BGC Partners', type: 'subsidiary', description: 'Cantor Fitzgerald spun off BGC Partners as a separate brokerage firm.' }
    ]
  },
  {
    name: 'American Israel Education Foundation',
    id: slug('American Israel Education Foundation'),
    type: 'educational foundation',
    category: 'Advocacy & Public Affairs',
    description: 'The American Israel Education Foundation (AIEF) is a charitable organization affiliated with AIPAC that provides educational trips to Israel for US members of Congress and other political leaders. Nearly every member of Congress has participated in an AIEF-sponsored trip to Israel at some point in their career, making it one of the most significant programs shaping US political understanding of Israel.',
    website: 'https://www.aief.org',
    founded: 1990,
    individuals: [],
    connections: [
      { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'affiliated organization', description: 'AIEF is the charitable arm of AIPAC dedicated to education.' },
      { name: 'US Congress', type: 'engagement', description: 'AIEF organizes congressional delegations to Israel.' },
      { name: 'Birthright Israel', type: 'educational peer', description: 'Both provide foundational Israel experiences.' }
    ]
  },
  {
    name: 'Saban Capital Group',
    id: slug('Saban Capital Group'),
    type: 'investment firm',
    category: 'Investment & Private Equity',
    description: 'Saban Capital Group is a private investment firm founded by Haim Saban, the Israeli-American media mogul. The firm invests across entertainment, media, communications, and real estate. Saban is known for bringing the Power Rangers franchise to the US and for his significant political donations. He is one of the largest individual donors in American politics and a major supporter of Israel-related causes.',
    website: 'https://www.sabancapitalgroup.com',
    founded: 2001,
    individuals: [
      { id: slug('Haim Saban'), name: 'Haim Saban', role: 'Chairman', bio: 'Israeli-American media proprietor and investor. Creator of the Power Rangers franchise and one of the largest political donors in the United States.' }
    ],
    connections: [
      { name: 'Brookings Institution', type: 'funder', description: 'Saban funded the Saban Center for Middle East Policy at Brookings.' },
      { name: 'Univision', type: 'former investment', description: 'Saban Capital Group was part of the consortium that acquired Univision in 2007.' },
      { name: 'Democratic National Committee', type: 'political donor', description: 'Haim Saban is among the largest donors to the Democratic Party.' }
    ]
  },
  {
    name: 'Museum of Jewish Heritage',
    id: slug('Museum of Jewish Heritage'),
    type: 'museum',
    category: 'Heritage & Memorials',
    description: 'The Museum of Jewish Heritage - A Living Memorial to the Holocaust is located in Battery Park City, Manhattan. Opened in 1997, it is the third-largest Holocaust museum in the world. The museum houses a collection of over 25,000 artifacts, photographs, and films, and presents the story of Jewish life before, during, and after the Holocaust through personal testimony and historic objects.',
    website: 'https://mjhnyc.org',
    founded: 1997,
    individuals: [
      { id: slug('Jack Kliger'), name: 'Jack Kliger', role: 'President & CEO', bio: 'President and CEO of the Museum of Jewish Heritage. Former president of Hachette Filipacchi Media.' }
    ],
    connections: [
      { name: 'United States Holocaust Memorial Museum', type: 'museum peer', description: 'Both are major Holocaust museums in the United States.' },
      { name: 'Yad Vashem', type: 'partner', description: 'Collaborates with Yad Vashem on exhibitions and educational materials.' },
      { name: 'National Museum of American Jewish History', type: 'museum peer', description: 'Both document aspects of Jewish experience in America.' }
    ]
  },
  {
    name: 'Keshet',
    id: slug('Keshet'),
    type: 'advocacy organization',
    category: 'Advocacy & Political Organizations',
    description: 'Keshet is a national Jewish LGBTQ+ advocacy organization working for the full equality and inclusion of LGBTQ+ individuals in Jewish life. Founded in 1996, Keshet provides training and resources to Jewish institutions, runs youth programming, and advocates for inclusive policies within synagogues, schools, camps, and other Jewish organizations.',
    website: 'https://www.keshetonline.org',
    founded: 1996,
    individuals: [
      { id: slug('Idit Klein'), name: 'Idit Klein', role: 'President & CEO', bio: 'Co-founder, president and CEO of Keshet. Leading voice for LGBTQ+ inclusion in Jewish life.' }
    ],
    connections: [
      { name: 'Union for Reform Judaism', type: 'partner', description: 'Partners on LGBTQ+ inclusion initiatives in Reform congregations.' },
      { name: 'Foundation for Jewish Camp', type: 'partner', description: 'Keshet works with FJC to make Jewish camps more inclusive.' }
    ]
  }
];

for (const entry of usEntries) {
  if (addEntry('United States', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- ISRAEL ---
const israelEntries = [
  {
    name: 'Latet',
    id: slug('Latet'),
    type: 'humanitarian organization',
    category: 'Charity & Philanthropy',
    description: 'Latet (meaning "to give" in Hebrew) is Israel\'s leading humanitarian aid organization fighting food insecurity and poverty. Founded in 2003, it operates Israel\'s largest food bank and distributes aid to over 250,000 people annually. Latet also publishes the annual Alternative Poverty Report, which has become a key resource for understanding poverty in Israel.',
    website: 'https://www.latet.org.il',
    founded: 2003,
    individuals: [
      { id: slug('Gilles Darmon'), name: 'Gilles Darmon', role: 'Founder & Chairman', bio: 'French-born Israeli founder of Latet, Israel\'s largest humanitarian aid organization.' },
      { id: slug('Eran Weintrob'), name: 'Eran Weintrob', role: 'CEO', bio: 'CEO of Latet overseeing humanitarian operations across Israel.' }
    ],
    connections: [
      { name: 'Feeding America', type: 'international partner', description: 'Both operate large-scale food distribution networks.' },
      { name: 'National Insurance Institute of Israel', type: 'data partner', description: 'Latet\'s Alternative Poverty Report supplements National Insurance poverty data.' }
    ]
  },
  {
    name: 'Magen David Adom',
    id: slug('Magen David Adom'),
    type: 'emergency medical service',
    category: 'Healthcare & Pharmaceuticals',
    description: 'Magen David Adom (MDA) is Israel\'s national emergency medical, disaster, ambulance, and blood bank service. Established in 1930, it serves as Israel\'s equivalent of the Red Cross and became a member of the International Red Cross and Red Crescent Movement in 2006. MDA operates over 1,500 ambulances, responds to over 700,000 calls annually, and manages Israel\'s blood supply.',
    website: 'https://www.mdais.org',
    founded: 1930,
    individuals: [
      { id: slug('Eli Bin'), name: 'Eli Bin', role: 'Director General', bio: 'Director General of Magen David Adom, Israel\'s national emergency medical service.' }
    ],
    connections: [
      { name: 'International Red Cross and Red Crescent Movement', type: 'member', description: 'MDA became a member of the ICRC movement in 2006.' },
      { name: 'American Friends of Magen David Adom', type: 'fundraising arm', description: 'AFMDA raises funds in the US for MDA operations in Israel.' }
    ]
  },
  {
    name: 'Birthright Israel Foundation',
    id: slug('Birthright Israel Foundation'),
    type: 'educational foundation',
    category: 'Education & Academia',
    description: 'Birthright Israel Foundation is the US fundraising arm of Taglit-Birthright Israel, the program that provides free 10-day heritage trips to Israel for young Jewish adults aged 18-32. Since its founding, Birthright has sent over 800,000 young people from 68 countries to Israel, making it the largest Jewish educational initiative in the world. The program is funded by a partnership of private philanthropists, the Israeli government, and Jewish communities.',
    website: 'https://www.birthrightisrael.com',
    founded: 1999,
    individuals: [
      { id: slug('Gidi Mark'), name: 'Gidi Mark', role: 'CEO', bio: 'CEO of Taglit-Birthright Israel overseeing global operations of the heritage trip program.' }
    ],
    connections: [
      { name: 'Birthright Israel', type: 'parent program', description: 'The Foundation supports the Taglit-Birthright Israel program.' },
      { name: 'The Jewish Federations of North America', type: 'funding partner', description: 'JFNA federations help fund Birthright participation.' },
      { name: 'Sheldon Adelson Foundation', type: 'major donor', description: 'The Adelson family has been the largest private donor to Birthright Israel.' }
    ]
  },
  {
    name: 'Start-Up Nation Central',
    id: slug('Start-Up Nation Central'),
    type: 'innovation hub',
    category: 'Technology',
    description: 'Start-Up Nation Central is an independent nonprofit organization that connects business, government, and NGO leaders from around the world to Israeli innovation. Founded in 2013 by Paul Singer, it serves as a gateway to the Israeli tech ecosystem, providing data, insights, and connections. The organization maintains the Start-Up Nation Finder platform that maps Israel\'s innovation landscape.',
    website: 'https://startupnationcentral.org',
    founded: 2013,
    individuals: [
      { id: slug('Avi Hasson'), name: 'Avi Hasson', role: 'CEO', bio: 'CEO of Start-Up Nation Central. Former Chief Scientist of Israel\'s Ministry of Economy.' },
      { id: slug('Paul Singer'), name: 'Paul Singer', role: 'Founder', bio: 'Founder of Start-Up Nation Central and founder of Elliott Management Corporation, one of the largest activist hedge funds.' }
    ],
    connections: [
      { name: 'Israel Innovation Authority', type: 'government partner', description: 'Works with IIA to promote Israeli innovation ecosystem.' },
      { name: 'Elliott Management', type: 'founder connection', description: 'Paul Singer founded both Start-Up Nation Central and Elliott Management.' }
    ]
  },
  {
    name: 'Yesh Din',
    id: slug('Yesh Din'),
    type: 'human rights organization',
    category: 'Advocacy & Political Organizations',
    description: 'Yesh Din (Volunteers for Human Rights) is an Israeli human rights organization that monitors and documents human rights abuses in the occupied West Bank. Founded in 2005, it provides legal assistance to Palestinian victims of violence and property offenses, monitors law enforcement, and advocates for accountability. Yesh Din publishes detailed reports and data on the Israeli military justice system.',
    website: 'https://www.yesh-din.org',
    founded: 2005,
    individuals: [
      { id: slug('Michael Sfard'), name: 'Michael Sfard', role: 'Legal Adviser', bio: 'Leading Israeli human rights attorney and legal adviser to Yesh Din. Author and legal scholar.' }
    ],
    connections: [
      { name: 'B\'Tselem', type: 'human rights peer', description: 'Both monitor and document human rights conditions in the occupied territories.' },
      { name: 'Association for Civil Rights in Israel', type: 'civil rights partner', description: 'Both advocate for civil and human rights within Israel and the territories.' }
    ]
  },
  {
    name: 'Bezeq',
    id: slug('Bezeq'),
    type: 'telecommunications company',
    category: 'Telecommunications',
    description: 'Bezeq is Israel\'s largest telecommunications provider, offering fixed-line, mobile, internet, and satellite TV services. Originally a state-owned monopoly founded in 1984, it was privatized in stages, with control eventually acquired by Eurocom Group. Bezeq and its subsidiaries (Pelephone, YES, Bezeq International) serve millions of Israeli consumers and businesses.',
    website: 'https://www.bezeq.co.il',
    founded: 1984,
    individuals: [
      { id: slug('Ran Guron'), name: 'Ran Guron', role: 'CEO', bio: 'CEO of Bezeq, Israel\'s largest telecommunications company.' }
    ],
    connections: [
      { name: 'Partner Communications', type: 'industry peer', description: 'Competitor in Israel\'s telecommunications market.' },
      { name: 'Eurocom Group', type: 'parent company', description: 'Eurocom Group controlled Bezeq through its holding structure.' }
    ]
  },
  {
    name: 'El Al Israel Airlines',
    id: slug('El Al Israel Airlines'),
    type: 'airline',
    category: 'Transportation',
    description: 'El Al Israel Airlines is Israel\'s national carrier and largest airline. Founded in 1948, shortly after the establishment of the State of Israel, it operates flights to destinations across Europe, North America, Africa, and Asia. El Al is known for its extensive security protocols and its observance of Shabbat and Jewish holidays. The airline has played a key role in Jewish immigration to Israel, including Operations Magic Carpet and Solomon.',
    website: 'https://www.elal.com',
    founded: 1948,
    individuals: [
      { id: slug('Dina Ben Tal Ganancia'), name: 'Dina Ben Tal Ganancia', role: 'CEO', bio: 'CEO of El Al Israel Airlines, the first woman to lead the national carrier.' }
    ],
    connections: [
      { name: 'Israel Airports Authority', type: 'government partner', description: 'El Al operates primarily from Ben Gurion International Airport.' },
      { name: 'Jewish Agency for Israel', type: 'historical partner', description: 'El Al facilitated major aliyah operations in partnership with the Jewish Agency.' }
    ]
  }
];

for (const entry of israelEntries) {
  if (addEntry('Israel', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- UNITED KINGDOM ---
const ukEntries = [
  {
    name: 'Jewish Leadership Council',
    id: slug('Jewish Leadership Council'),
    type: 'umbrella organization',
    category: 'Representative & Umbrella Bodies',
    description: 'The Jewish Leadership Council (JLC) brings together the chairs and chief executives of 35 major British Jewish organizations. Founded in 2003, it serves as a forum for coordination and collective action on matters affecting the Jewish community in the United Kingdom. The JLC engages with government, media, and civil society on behalf of British Jewry.',
    website: 'https://www.thejlc.org',
    founded: 2003,
    individuals: [
      { id: slug('Claudia Mendoza'), name: 'Claudia Mendoza', role: 'CEO', bio: 'CEO of the Jewish Leadership Council.' },
      { id: slug('Jonathan Goldstein'), name: 'Jonathan Goldstein', role: 'Chair', bio: 'Chair of the Jewish Leadership Council. Property executive and communal leader.' }
    ],
    connections: [
      { name: 'Board of Deputies of British Jews', type: 'member organization', description: 'The Board of Deputies is a key member of the JLC.' },
      { name: 'Office of the Chief Rabbi', type: 'member organization', description: 'The Chief Rabbi participates in JLC deliberations.' },
      { name: 'Conference of Presidents of Major American Jewish Organizations', type: 'American counterpart', description: 'Both serve as umbrella bodies for national Jewish communal organizations.' }
    ]
  },
  {
    name: 'UK Jewish Film Festival',
    id: slug('UK Jewish Film Festival'),
    type: 'cultural organization',
    category: 'Culture & Arts',
    description: 'The UK Jewish Film Festival (UKJFF) is the largest Jewish film festival in Europe and one of the biggest in the world. Running annually since 1997, it screens films across multiple venues in London and throughout the UK. The festival presents feature films, documentaries, and shorts exploring Jewish themes, history, and culture from around the world.',
    website: 'https://ukjewishfilm.org',
    founded: 1997,
    individuals: [
      { id: slug('Michael Etherton'), name: 'Michael Etherton', role: 'Director', bio: 'Director of the UK Jewish Film Festival.' }
    ],
    connections: [
      { name: 'Jewish Book Week', type: 'cultural peer', description: 'Both are major Jewish cultural events in London.' },
      { name: 'JW3', type: 'venue partner', description: 'JW3 serves as a venue for UKJFF screenings.' }
    ]
  },
  {
    name: 'JW3',
    id: slug('JW3'),
    type: 'community center',
    category: 'Community & Social Organizations',
    description: 'JW3 is a Jewish community center in Finchley Road, London, that opened in 2013 as a hub for arts, culture, and community life. It hosts cinemas, restaurants, event spaces, and educational programs. JW3 represents a modern approach to Jewish community centers, open to all and programming across Jewish denominations and for the wider community.',
    website: 'https://www.jw3.org.uk',
    founded: 2013,
    individuals: [
      { id: slug('Raymond Sherr'), name: 'Raymond Sherr', role: 'CEO', bio: 'CEO of JW3, London\'s Jewish community center.' }
    ],
    connections: [
      { name: '92nd Street Y', type: 'model institution', description: 'JW3 was partly inspired by New York\'s 92nd Street Y model.' },
      { name: 'UK Jewish Film Festival', type: 'programming partner', description: 'Hosts UKJFF screenings and events.' },
      { name: 'Jewish Leadership Council', type: 'communal partner', description: 'Participates in Jewish community coordination.' }
    ]
  },
  {
    name: 'Wiener Holocaust Library',
    id: slug('Wiener Holocaust Library'),
    type: 'library and archive',
    category: 'Heritage & Memorials',
    description: 'The Wiener Holocaust Library is one of the world\'s oldest and most extensive archives on the Holocaust and the Nazi era. Founded in 1933 by Alfred Wiener, it predates the Holocaust itself, as Wiener began collecting evidence of Nazi persecution from the earliest days of the regime. Located in London, it holds over one million documents, books, photographs, and testimonies.',
    website: 'https://www.wienerholocaustlibrary.org',
    founded: 1933,
    individuals: [
      { id: slug('Toby Simpson'), name: 'Toby Simpson', role: 'Director', bio: 'Director of the Wiener Holocaust Library, managing one of the world\'s oldest Holocaust archives.' }
    ],
    connections: [
      { name: 'Yad Vashem', type: 'research partner', description: 'Both are premier Holocaust research and documentation centers.' },
      { name: 'United States Holocaust Memorial Museum', type: 'archive partner', description: 'Shares materials and collaborates on research.' },
      { name: 'University of London', type: 'academic affiliate', description: 'The library is affiliated with the University of London\'s Institute of Advanced Studies.' }
    ]
  }
];

for (const entry of ukEntries) {
  if (addEntry('United Kingdom', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- FRANCE ---
const franceEntries = [
  {
    name: 'Fondation pour la Memoire de la Shoah',
    id: slug('Fondation pour la Memoire de la Shoah'),
    type: 'foundation',
    category: 'Heritage & Memorials',
    description: 'The Fondation pour la Memoire de la Shoah (Foundation for the Memory of the Shoah) is a French foundation established in 2000 with funds from the restitution of assets stolen from Jews during the Holocaust. It supports research, education, and remembrance projects related to the Shoah, as well as Jewish culture and solidarity programs for Holocaust survivors. It is one of the largest Holocaust-related foundations in Europe.',
    website: 'https://www.fondationshoah.org',
    founded: 2000,
    individuals: [
      { id: slug('Philippe Allouche'), name: 'Philippe Allouche', role: 'Director General', bio: 'Director General of the Fondation pour la Memoire de la Shoah.' }
    ],
    connections: [
      { name: 'Memorial de la Shoah', type: 'grantee', description: 'The Foundation provides major funding to the Memorial de la Shoah museum in Paris.' },
      { name: 'Yad Vashem', type: 'partner', description: 'Collaborates on Holocaust research and remembrance projects.' },
      { name: 'Claims Conference', type: 'restitution partner', description: 'Both emerged from Holocaust restitution and survivor support efforts.' }
    ]
  },
  {
    name: 'OSE (Oeuvre de Secours aux Enfants)',
    id: slug('OSE Oeuvre de Secours aux Enfants'),
    type: 'welfare organization',
    category: 'Community & Social Organizations',
    description: 'OSE (Oeuvre de Secours aux Enfants, meaning Children\'s Aid Society) is a French Jewish organization that has been protecting children and families since 1912. Originally founded in St. Petersburg, Russia, it became famous for rescuing thousands of Jewish children from the Holocaust. Today OSE operates over 60 facilities in France providing health care, social services, education, and child protection to vulnerable populations.',
    website: 'https://www.ose-france.org',
    founded: 1912,
    individuals: [
      { id: slug('Patricia Sitruk'), name: 'Patricia Sitruk', role: 'Director General', bio: 'Director General of OSE-France, overseeing health and social service operations.' }
    ],
    connections: [
      { name: 'CRIF', type: 'communal partner', description: 'CRIF is the representative council encompassing French Jewish organizations including OSE.' },
      { name: 'American Jewish Joint Distribution Committee', type: 'historical partner', description: 'JDC supported OSE\'s rescue operations during the Holocaust.' }
    ]
  }
];

for (const entry of franceEntries) {
  if (addEntry('France', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- GERMANY ---
const germanyEntries = [
  {
    name: 'Central Council of Jews in Germany',
    id: slug('Central Council of Jews in Germany'),
    type: 'representative body',
    category: 'Representative & Umbrella Bodies',
    description: 'The Central Council of Jews in Germany (Zentralrat der Juden in Deutschland) is the umbrella organization representing Jewish communities across Germany. Founded in 1950, it represents approximately 100,000 members in 105 communities. The Central Council advocates for Jewish interests in German public life, combats antisemitism, and works to preserve Jewish culture and religious life in Germany.',
    website: 'https://www.zentralratderjuden.de',
    founded: 1950,
    individuals: [
      { id: slug('Josef Schuster'), name: 'Josef Schuster', role: 'President', bio: 'President of the Central Council of Jews in Germany since 2014. Physician and communal leader.' }
    ],
    connections: [
      { name: 'Conference of European Rabbis', type: 'religious partner', description: 'Works with CER on religious life and policy in Europe.' },
      { name: 'World Jewish Congress', type: 'affiliate', description: 'The Central Council is affiliated with the World Jewish Congress as Germany\'s representative body.' },
      { name: 'Board of Deputies of British Jews', type: 'European peer', description: 'Both are national representative bodies for their respective Jewish communities.' }
    ]
  },
  {
    name: 'Jewish Museum Berlin',
    id: slug('Jewish Museum Berlin'),
    type: 'museum',
    category: 'Heritage & Memorials',
    description: 'The Jewish Museum Berlin is the largest Jewish museum in Europe, housed in a landmark building designed by architect Daniel Libeskind. Opened in 2001, it chronicles German Jewish history from the Roman era to the present through interactive exhibits, art installations, and educational programs. The museum receives over 700,000 visitors annually and is one of the most-visited museums in Berlin.',
    website: 'https://www.jmberlin.de',
    founded: 2001,
    individuals: [
      { id: slug('Hetty Berg'), name: 'Hetty Berg', role: 'Director', bio: 'Director of the Jewish Museum Berlin since 2020. Dutch museum professional.' }
    ],
    connections: [
      { name: 'National Museum of American Jewish History', type: 'museum peer', description: 'Both are national-scale Jewish history museums.' },
      { name: 'Yad Vashem', type: 'partner', description: 'Collaborates on exhibitions related to the Holocaust.' },
      { name: 'Memorial to the Murdered Jews of Europe', type: 'memorial peer', description: 'Both are major Holocaust remembrance sites in Berlin.' }
    ]
  }
];

for (const entry of germanyEntries) {
  if (addEntry('Germany', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- CANADA ---
const canadaEntries = [
  {
    name: 'Centre for Israel and Jewish Affairs',
    id: slug('Centre for Israel and Jewish Affairs'),
    type: 'advocacy organization',
    category: 'Advocacy & Public Affairs',
    description: 'The Centre for Israel and Jewish Affairs (CIJA) is the advocacy agent of the Jewish Federations of Canada-UIA. It represents the organized Jewish community on public policy issues including Canada-Israel relations, antisemitism, human rights, and refugee resettlement. CIJA engages with all levels of government, media, and civil society across Canada.',
    website: 'https://www.cija.ca',
    founded: 2004,
    individuals: [
      { id: slug('Shimon Koffler Fogel'), name: 'Shimon Koffler Fogel', role: 'President & CEO', bio: 'President and CEO of CIJA. Leading voice on Jewish community advocacy in Canada.' }
    ],
    connections: [
      { name: 'Jewish Federations of Canada-UIA', type: 'parent organization', description: 'CIJA is the advocacy arm of the Jewish Federations of Canada.' },
      { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'American counterpart', description: 'Both advocate for strong relations with Israel in their respective countries.' },
      { name: 'B\'nai Brith Canada', type: 'advocacy partner', description: 'Both combat antisemitism and advocate for Jewish community interests in Canada.' }
    ]
  },
  {
    name: 'Azrieli Foundation',
    id: slug('Azrieli Foundation'),
    type: 'foundation',
    category: 'Philanthropy & Foundations',
    description: 'The Azrieli Foundation is a Canadian philanthropic foundation established by David Azrieli, an Israeli-Canadian real estate developer and Holocaust survivor. The foundation supports education, architecture, scientific and medical research, and Holocaust education. It funds the Azrieli Fellows Program (graduate scholarships), Holocaust Survivor Memoirs Program, and various institutions in Israel and Canada.',
    website: 'https://www.azrielifoundation.org',
    founded: 1989,
    individuals: [
      { id: slug('Naomi Azrieli'), name: 'Naomi Azrieli', role: 'Chair & CEO', bio: 'Chair and CEO of the Azrieli Foundation. Daughter of founder David Azrieli.' },
      { id: slug('David Azrieli'), name: 'David Azrieli', role: 'Founder', bio: 'Israeli-Canadian billionaire real estate developer and Holocaust survivor who founded the Azrieli Group and the Azrieli Foundation. Died in 2014.' }
    ],
    connections: [
      { name: 'Azrieli Group', type: 'corporate connection', description: 'The Foundation was endowed from David Azrieli\'s real estate empire.' },
      { name: 'Yad Vashem', type: 'partner', description: 'Supports Holocaust education and has partnerships with Yad Vashem.' },
      { name: 'Weizmann Institute of Science', type: 'grantee', description: 'The Foundation makes significant grants to scientific institutions in Israel.' }
    ]
  }
];

for (const entry of canadaEntries) {
  if (addEntry('Canada', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- AUSTRALIA ---
const australiaEntries = [
  {
    name: 'Zionist Federation of Australia',
    id: slug('Zionist Federation of Australia'),
    type: 'Zionist organization',
    category: 'Advocacy & Political Organizations',
    description: 'The Zionist Federation of Australia (ZFA) is the peak Zionist body in Australia, representing constituent Zionist organizations and promoting Israel within Australian society. Founded in 1927, it coordinates Zionist activities, organizes events, supports Israel advocacy on campuses and in media, and facilitates aliyah (immigration to Israel) from Australia.',
    website: 'https://www.zfa.com.au',
    founded: 1927,
    individuals: [
      { id: slug('Jeremy Leibler'), name: 'Jeremy Leibler', role: 'President', bio: 'President of the Zionist Federation of Australia. Melbourne-based corporate lawyer.' }
    ],
    connections: [
      { name: 'World Zionist Organization', type: 'affiliate', description: 'ZFA is affiliated with the World Zionist Organization.' },
      { name: 'Executive Council of Australian Jewry', type: 'communal partner', description: 'Both represent aspects of Australian Jewish community interests.' },
      { name: 'Jewish Agency for Israel', type: 'aliyah partner', description: 'Works with the Jewish Agency on aliyah from Australia.' }
    ]
  },
  {
    name: 'Sydney Jewish Museum',
    id: slug('Sydney Jewish Museum'),
    type: 'museum',
    category: 'Heritage & Memorials',
    description: 'The Sydney Jewish Museum documents and presents the history of the Holocaust alongside the Australian Jewish experience. Opened in 1992 in the historic Maccabean Hall in Darlinghurst, the museum features survivor testimonies, historic artifacts, and interactive exhibits. It operates extensive education programs reaching tens of thousands of school students annually.',
    website: 'https://sydneyjewishmuseum.com.au',
    founded: 1992,
    individuals: [
      { id: slug('Kevin Sumption'), name: 'Kevin Sumption', role: 'CEO', bio: 'CEO of the Sydney Jewish Museum.' }
    ],
    connections: [
      { name: 'United States Holocaust Memorial Museum', type: 'museum peer', description: 'Both are major Holocaust museums serving as educational institutions.' },
      { name: 'Yad Vashem', type: 'partner', description: 'Collaborates with Yad Vashem on educational resources and exhibition content.' },
      { name: 'Jewish Museum Berlin', type: 'museum peer', description: 'Both are leading Jewish museums documenting national Jewish experiences.' }
    ]
  }
];

for (const entry of australiaEntries) {
  if (addEntry('Australia', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- SOUTH AFRICA ---
const saEntries = [
  {
    name: 'South African Jewish Board of Deputies',
    id: slug('South African Jewish Board of Deputies'),
    type: 'representative body',
    category: 'Representative & Umbrella Bodies',
    description: 'The South African Jewish Board of Deputies (SAJBD) is the representative body of the South African Jewish community, founded in 1903. It represents the community to government and civil society, combats antisemitism, and coordinates communal affairs. The SAJBD operates through regional councils in major South African cities and monitors hate speech, discrimination, and threats to the Jewish community.',
    website: 'https://www.sajbd.org',
    founded: 1903,
    individuals: [
      { id: slug('Wendy Gillian Memory Sobel Kahn'), name: 'Wendy Kahn', role: 'National Director', bio: 'National Director of the South African Jewish Board of Deputies.' }
    ],
    connections: [
      { name: 'Board of Deputies of British Jews', type: 'model organization', description: 'SAJBD was modeled on the British Board of Deputies.' },
      { name: 'World Jewish Congress', type: 'affiliate', description: 'SAJBD is affiliated with the WJC as South Africa\'s representative Jewish body.' },
      { name: 'South African Zionist Federation', type: 'communal partner', description: 'Works alongside SAZF on community matters and Israel relations.' }
    ]
  }
];

for (const entry of saEntries) {
  if (addEntry('South Africa', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- BRAZIL ---
const brazilEntries = [
  {
    name: 'Congregacao Israelita Paulista',
    id: slug('Congregacao Israelita Paulista'),
    type: 'synagogue',
    category: 'Religion & Synagogues',
    description: 'Congregacao Israelita Paulista (CIP) is the largest Jewish congregation in Latin America, based in Sao Paulo, Brazil. Founded in 1936 by German Jewish refugees, it has over 3,000 member families and operates extensive educational, cultural, and social welfare programs. CIP is affiliated with the World Union for Progressive Judaism and represents the liberal Jewish tradition in Brazil.',
    website: 'https://www.cfrj.com.br',
    founded: 1936,
    individuals: [
      { id: slug('Rabbi Ruben Sternschein'), name: 'Rabbi Ruben Sternschein', role: 'Senior Rabbi', bio: 'Senior Rabbi of Congregacao Israelita Paulista, one of the leading liberal rabbis in Latin America.' }
    ],
    connections: [
      { name: 'World Union for Progressive Judaism', type: 'affiliate', description: 'CIP is affiliated with WUPJ as a Reform/Progressive congregation.' },
      { name: 'Confederacao Israelita do Brasil', type: 'umbrella body', description: 'CIP is a constituent member of CONIB, the umbrella organization of Brazilian Jews.' }
    ]
  },
  {
    name: 'Albert Einstein Israelite Hospital',
    id: slug('Albert Einstein Israelite Hospital'),
    type: 'hospital',
    category: 'Healthcare & Pharmaceuticals',
    description: 'Hospital Israelita Albert Einstein is one of the top-ranked hospitals in Latin America, located in Sao Paulo, Brazil. Founded in 1955 by the Jewish community of Sao Paulo, it is a nonprofit institution that combines world-class medical care with social responsibility programs providing free healthcare to underserved communities. It is consistently ranked as the best hospital in Latin America.',
    website: 'https://www.einstein.br',
    founded: 1955,
    individuals: [
      { id: slug('Sidney Klajner'), name: 'Sidney Klajner', role: 'President', bio: 'President of Hospital Israelita Albert Einstein, a leading physician and hospital administrator.' }
    ],
    connections: [
      { name: 'Johns Hopkins Medicine', type: 'academic partner', description: 'Maintains partnerships with leading American medical institutions.' },
      { name: 'Sociedade Beneficente Israelita Brasileira', type: 'founding body', description: 'Founded by the Jewish Beneficent Society of Sao Paulo.' }
    ]
  }
];

for (const entry of brazilEntries) {
  if (addEntry('Brazil', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- ARGENTINA ---
const argEntries = [
  {
    name: 'Fundacion Memoria del Holocausto',
    id: slug('Fundacion Memoria del Holocausto'),
    type: 'museum and archive',
    category: 'Heritage & Memorials',
    description: 'Fundacion Memoria del Holocausto (Holocaust Remembrance Foundation) is Argentina\'s primary Holocaust museum and educational center, located in Buenos Aires. It houses archives, testimonies, and exhibitions documenting the Holocaust and its impact on Argentina, which received both Jewish refugees and fleeing Nazi war criminals. The Foundation conducts educational programs reaching thousands of Argentine students annually.',
    website: 'https://www.fmh.org.ar',
    founded: 1993,
    individuals: [
      { id: slug('Marcelo Mindlin'), name: 'Marcelo Mindlin', role: 'Board President', bio: 'Argentine businessman and president of the board of Fundacion Memoria del Holocausto. Head of Pampa Energia, Argentina\'s largest energy company.' }
    ],
    connections: [
      { name: 'Yad Vashem', type: 'partner', description: 'Collaborates on educational content and survivor testimony preservation.' },
      { name: 'United States Holocaust Memorial Museum', type: 'museum peer', description: 'Both document and educate about the Holocaust.' },
      { name: 'AMIA (Asociacion Mutual Israelita Argentina)', type: 'communal partner', description: 'Works with AMIA on Jewish community programming and Holocaust education.' }
    ]
  }
];

for (const entry of argEntries) {
  if (addEntry('Argentina', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- INDIA ---
const indiaEntries = [
  {
    name: 'Federation of Jewish Communities of India',
    id: slug('Federation of Jewish Communities of India'),
    type: 'communal organization',
    category: 'Representative & Umbrella Bodies',
    description: 'The Federation of Jewish Communities of India represents the diverse Jewish communities across India, including the Bene Israel, Cochin Jews, Baghdadi Jews, and Bnei Menashe. India\'s Jewish population, estimated at around 5,000, is spread across Mumbai, Pune, Kolkata, Kochi, and smaller towns. The Federation works to preserve Jewish heritage sites, support community institutions, and maintain connections with the global Jewish world.',
    website: '',
    founded: 1980,
    individuals: [],
    connections: [
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Connected to the WJC for international Jewish representation.' },
      { name: 'Jewish Agency for Israel', type: 'aliyah partner', description: 'Facilitates connections for Indian Jews interested in Israel.' }
    ]
  }
];

for (const entry of indiaEntries) {
  if (addEntry('India', entry)) newEntries++;
}

// --- MEXICO ---
const mexicoEntries = [
  {
    name: 'Tribuna Israelita',
    id: slug('Tribuna Israelita'),
    type: 'advocacy organization',
    category: 'Advocacy & Public Affairs',
    description: 'Tribuna Israelita is the Mexican Jewish community\'s interfaith and public affairs organization. Founded in 1944, it promotes dialogue between Jewish and non-Jewish communities in Mexico, combats antisemitism, and serves as the public voice of Mexican Jewry. Mexico has one of the largest Jewish communities in Latin America with approximately 50,000 members.',
    website: 'https://www.tribunaisraelita.org.mx',
    founded: 1944,
    individuals: [],
    connections: [
      { name: 'Anti-Defamation League', type: 'international partner', description: 'Partners with ADL on combating antisemitism in Latin America.' },
      { name: 'Comite Central de la Comunidad Judia de Mexico', type: 'communal partner', description: 'Works alongside the Central Committee of the Mexican Jewish Community.' }
    ]
  }
];

for (const entry of mexicoEntries) {
  if (addEntry('Mexico', entry)) newEntries++;
}

// --- MOROCCO ---
const moroccoEntries = [
  {
    name: 'Conseil des Communautes Israelites du Maroc',
    id: slug('Conseil des Communautes Israelites du Maroc'),
    type: 'communal council',
    category: 'Representative & Umbrella Bodies',
    description: 'The Conseil des Communautes Israelites du Maroc (Council of Israelite Communities of Morocco) is the representative body of Moroccan Jewry. Morocco has the largest remaining Jewish community in the Arab world, estimated at approximately 2,500 people, concentrated in Casablanca. The council oversees communal affairs, synagogues, cemeteries, and heritage preservation in a country known for its relative tolerance toward its Jewish minority.',
    website: '',
    founded: 1947,
    individuals: [
      { id: slug('Serge Berdugo'), name: 'Serge Berdugo', role: 'Secretary General', bio: 'Secretary General of the Council of Israelite Communities of Morocco. Former Moroccan Minister of Tourism and prominent diplomat.' }
    ],
    connections: [
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Morocco\'s Jewish community is represented through the WJC.' },
      { name: 'Museum of Moroccan Judaism', type: 'cultural institution', description: 'The council supports the Museum of Moroccan Judaism in Casablanca, the only Jewish museum in the Arab world.' }
    ]
  }
];

for (const entry of moroccoEntries) {
  if (addEntry('Morocco', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- HUNGARY ---
const hungaryEntries = [
  {
    name: 'Dohany Street Synagogue',
    id: slug('Dohany Street Synagogue'),
    type: 'synagogue and museum',
    category: 'Religion & Synagogues',
    description: 'The Dohany Street Synagogue (also known as the Great Synagogue of Budapest) is the largest synagogue in Europe and the second-largest in the world. Built between 1854 and 1859 in Moorish Revival style, it seats 3,000 worshippers. The synagogue complex includes the Jewish Museum, the Heroes\' Temple commemorating Hungarian Jewish soldiers, the Raoul Wallenberg Holocaust Memorial Park, and the Tree of Life memorial to Holocaust victims.',
    website: 'https://www.dohanyutcaizsinagoga.hu',
    founded: 1859,
    individuals: [],
    connections: [
      { name: 'Federation of Hungarian Jewish Communities', type: 'affiliated body', description: 'The synagogue is under the aegis of Mazsihisz (EMIH in some contexts).' },
      { name: 'World Jewish Congress', type: 'heritage site', description: 'Recognized as one of the most important Jewish heritage sites in Europe.' }
    ]
  }
];

for (const entry of hungaryEntries) {
  if (addEntry('Hungary', entry)) newEntries++;
}

// --- NETHERLANDS ---
const nlEntries = [
  {
    name: 'Jewish Historical Museum Amsterdam',
    id: slug('Jewish Historical Museum Amsterdam'),
    type: 'museum',
    category: 'Heritage & Memorials',
    description: 'The Jewish Historical Museum (Joods Historisch Museum) in Amsterdam is housed in a complex of four historic Ashkenazi synagogues dating from the 17th and 18th centuries. The museum documents Dutch Jewish history, culture, and religion from the Middle Ages to the present. It is part of the Jewish Cultural Quarter, which also includes the Portuguese Synagogue, the National Holocaust Memorial, and the Children\'s Museum.',
    website: 'https://www.jhm.nl',
    founded: 1932,
    individuals: [
      { id: slug('Emile Schrijver'), name: 'Emile Schrijver', role: 'General Director', bio: 'General Director of the Jewish Cultural Quarter and the Jewish Historical Museum in Amsterdam.' }
    ],
    connections: [
      { name: 'Anne Frank House', type: 'museum peer', description: 'Both are Amsterdam institutions documenting Dutch Jewish history and the Holocaust.' },
      { name: 'Jewish Museum Berlin', type: 'museum peer', description: 'Both are national-scale Jewish museums in major European capitals.' }
    ]
  }
];

for (const entry of nlEntries) {
  if (addEntry('Netherlands', entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}

// --- SWEDEN ---
const swedenEntries = [
  {
    name: 'Official Council of Swedish Jewish Communities',
    id: slug('Official Council of Swedish Jewish Communities'),
    type: 'communal council',
    category: 'Representative & Umbrella Bodies',
    description: 'The Official Council of Swedish Jewish Communities (Judiska Centralradet) is the umbrella organization representing Sweden\'s approximately 15,000 Jews. Founded in 1920, it represents congregations in Stockholm, Gothenburg, Malmo, and other cities. The Council addresses issues of antisemitism, security, and communal life in Sweden and works with the Swedish government on matters affecting the Jewish minority.',
    website: 'https://www.judiskacentralradet.se',
    founded: 1920,
    individuals: [],
    connections: [
      { name: 'European Jewish Congress', type: 'affiliate', description: 'Member of the European Jewish Congress representing Swedish Jewry.' },
      { name: 'Central Council of Jews in Germany', type: 'European peer', description: 'Both serve as national representative bodies for their Jewish communities.' }
    ]
  }
];

for (const entry of swedenEntries) {
  if (addEntry('Sweden', entry)) newEntries++;
}

// --- JAPAN ---
const japanEntries = [
  {
    name: 'Jewish Community of Japan',
    id: slug('Jewish Community of Japan'),
    type: 'community center',
    category: 'Community & Social Organizations',
    description: 'The Jewish Community of Japan, centered at the Tokyo Jewish Community Center in Hiroo, serves the approximately 2,000 Jews living in Japan. The community includes diplomats, businesspeople, educators, and long-term residents from many countries. It operates a synagogue, educational programs, kosher kitchen, and cultural events. The community also maintains connections with the smaller Jewish presence in Kobe, which historically served as a refuge for Jewish refugees fleeing Europe during World War II.',
    website: 'https://www.jccjapan.or.jp',
    founded: 1952,
    individuals: [],
    connections: [
      { name: 'Chabad', type: 'religious support', description: 'Chabad operates centers in Tokyo serving the Jewish community and visitors.' },
      { name: 'World Jewish Congress', type: 'affiliation', description: 'Connected to international Jewish organizational networks.' }
    ]
  }
];

for (const entry of japanEntries) {
  if (addEntry('Japan', entry)) newEntries++;
}

// --- URUGUAY ---
const uruguayEntries = [
  {
    name: 'Comite Central Israelita del Uruguay',
    id: slug('Comite Central Israelita del Uruguay'),
    type: 'representative body',
    category: 'Representative & Umbrella Bodies',
    description: 'The Comite Central Israelita del Uruguay is the central representative organization of Uruguayan Jewry. Uruguay has one of the most established Jewish communities in Latin America, numbering approximately 15,000-20,000 people, concentrated in Montevideo. The committee coordinates communal affairs, combats antisemitism, and represents the community to the Uruguayan government and international bodies.',
    website: 'https://www.cciu.org.uy',
    founded: 1940,
    individuals: [],
    connections: [
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Represents Uruguayan Jewry in the WJC.' },
      { name: 'AMIA (Asociacion Mutual Israelita Argentina)', type: 'regional partner', description: 'Coordinates with nearby Argentine Jewish community institutions.' }
    ]
  }
];

for (const entry of uruguayEntries) {
  if (addEntry('Uruguay', entry)) newEntries++;
}

// --- CHILE ---
const chileEntries = [
  {
    name: 'Comunidad Judia de Chile',
    id: slug('Comunidad Judia de Chile'),
    type: 'communal organization',
    category: 'Representative & Umbrella Bodies',
    description: 'The Comunidad Judia de Chile (Jewish Community of Chile) represents the approximately 18,000 Jews in Chile, the fourth-largest Jewish community in Latin America. Based primarily in Santiago, Chilean Jews maintain a network of schools, synagogues, community centers, and cultural institutions. The community includes both Ashkenazi and Sephardic traditions.',
    website: '',
    founded: 1940,
    individuals: [],
    connections: [
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Chilean Jewry is represented in the World Jewish Congress.' },
      { name: 'Confederacao Israelita do Brasil', type: 'Latin American peer', description: 'Part of the network of Latin American Jewish communal organizations.' }
    ]
  }
];

for (const entry of chileEntries) {
  if (addEntry('Chile', entry)) newEntries++;
}

// --- ETHIOPIA ---
const ethiopiaEntries = [
  {
    name: 'North American Conference on Ethiopian Jewry',
    id: slug('North American Conference on Ethiopian Jewry'),
    type: 'advocacy organization',
    category: 'Advocacy & Public Affairs',
    description: 'The North American Conference on Ethiopian Jewry (NACOEJ) advocates for and supports Ethiopian Jews (Beta Israel) both in Ethiopia and in Israel. Founded in 1982, it operates feeding centers, schools, and community programs in Gondar and Addis Ababa for Ethiopians awaiting aliyah, and supports integration programs in Israel. NACOEJ has been instrumental in advocacy for the immigration of Ethiopian Jews to Israel through Operations Moses, Joshua, and Solomon.',
    website: 'https://www.nacoej.org',
    founded: 1982,
    individuals: [],
    connections: [
      { name: 'Jewish Agency for Israel', type: 'aliyah partner', description: 'Works with the Jewish Agency on Ethiopian aliyah operations.' },
      { name: 'American Jewish Joint Distribution Committee', type: 'humanitarian partner', description: 'Both provide support to Ethiopian Jewish communities.' }
    ]
  }
];

for (const entry of ethiopiaEntries) {
  if (addEntry('Ethiopia', entry)) newEntries++;
}

console.log(`  Added ${newEntries} new entries`);

// ============================================================
// PART 2: Add individuals to existing entries missing them
// ============================================================
console.log('Part 2: Adding individuals to existing entries...');

const individualsToAdd = {
  'american-jewish-world-service': [
    { id: slug('Robert Bank'), name: 'Robert Bank', role: 'President & CEO', bio: 'President and CEO of American Jewish World Service, the premier Jewish global human rights organization.' }
  ],
  'birthright-israel': [
    { id: slug('Charles Bronfman'), name: 'Charles Bronfman', role: 'Co-Founder', bio: 'Canadian-American businessman and philanthropist who co-founded Birthright Israel with Michael Steinhardt. Heir to the Seagram fortune.' },
    { id: slug('Michael Steinhardt'), name: 'Michael Steinhardt', role: 'Co-Founder', bio: 'American hedge fund manager and philanthropist who co-founded Birthright Israel with Charles Bronfman.' }
  ],
  'world-ort': [
    { id: slug('Jonathan Davis'), name: 'Jonathan Davis', role: 'Director General', bio: 'Director General and CEO of World ORT, operating education programs in 35 countries.' }
  ],
  'european-jewish-congress': [
    { id: slug('Moshe Kantor'), name: 'Moshe Kantor', role: 'Former President', bio: 'Russian-Israeli industrialist and former president of the European Jewish Congress. Sanctioned by the EU in 2022.' },
    { id: slug('Ariel Muzicant'), name: 'Ariel Muzicant', role: 'Vice President', bio: 'Vice President of the European Jewish Congress and former president of the Jewish Community of Vienna.' }
  ],
  'weizmann-institute-of-science': [
    { id: slug('Alon Chen'), name: 'Alon Chen', role: 'President', bio: 'President of the Weizmann Institute of Science. Leading neuroscientist specializing in stress and brain research.' }
  ],
  'technion-israel-institute-of-technology': [
    { id: slug('Uri Sivan'), name: 'Uri Sivan', role: 'President', bio: 'President of the Technion-Israel Institute of Technology. Nanotechnology researcher.' }
  ],
  'israel-museum': [
    { id: slug('Ido Bruno'), name: 'Ido Bruno', role: 'Former Director', bio: 'Former Anne and Jerome Fisher Director of the Israel Museum in Jerusalem.' }
  ],
  'keren-hayesod': [
    { id: slug('Sam Grundwerg'), name: 'Sam Grundwerg', role: 'World Chairman', bio: 'World Chairman of Keren Hayesod. Former Israeli Consul General in Los Angeles.' }
  ],
  'mossad': [
    { id: slug('David Barnea'), name: 'David Barnea', role: 'Director', bio: 'Director of the Mossad, Israel\'s national intelligence agency, since 2021.' }
  ],
  'shin-bet': [
    { id: slug('Ronen Bar'), name: 'Ronen Bar', role: 'Director', bio: 'Director of the Shin Bet (Israel Security Agency) since 2021.' }
  ],
  'wix': [
    { id: slug('Avishai Abrahami'), name: 'Avishai Abrahami', role: 'Co-Founder & CEO', bio: 'Co-founder and CEO of Wix.com, the Israeli cloud-based web development platform with over 200 million users.' }
  ],
  'check-point-software-technologies': [
    { id: slug('Gil Shwed'), name: 'Gil Shwed', role: 'Founder & CEO', bio: 'Founder, Chairman, and CEO of Check Point Software Technologies. Pioneer of modern firewall and internet security.' }
  ]
};

let indAdded = 0;
for (const entryId in individualsToAdd) {
  for (const ind of individualsToAdd[entryId]) {
    addIndividualToEntry(entryId, ind);
    addPerson(ind.id, ind.name, ind.bio);
    indAdded++;
  }
}
console.log(`  Added ${indAdded} individuals to existing entries`);

// ============================================================
// PART 3: Add cross-connections between entries
// ============================================================
console.log('Part 3: Adding cross-connections...');

const connectionsToAdd = {
  'the-jewish-federations-of-north-america': [
    { name: 'Hillel International', type: 'grantee', description: 'JFNA federations collectively fund Hillel campus programming.' },
    { name: 'Jewish Community Centers Association', type: 'communal partner', description: 'JCCs are closely aligned with the federation system.' },
    { name: 'Secure Community Network', type: 'security arm', description: 'SCN operates under JFNA auspices for community security.' }
  ],
  'touro-university': [
    { name: 'Brandeis University', type: 'academic peer', description: 'Both are Jewish-affiliated universities in the United States.' },
    { name: 'Bar-Ilan University', type: 'academic partner', description: 'Both maintain connections as Jewish-affiliated academic institutions.' }
  ],
  'museum-of-jewish-heritage': [
    { name: 'Anti-Defamation League', type: 'partner', description: 'ADL and the Museum collaborate on Holocaust education programs.' },
    { name: 'Claims Conference', type: 'partner', description: 'Both work on Holocaust remembrance and survivor support.' }
  ],
  'magen-david-adom': [
    { name: 'Israel Defense Forces', type: 'coordination', description: 'MDA coordinates with IDF medical corps during emergencies and military operations.' },
    { name: 'United Hatzalah', type: 'emergency peer', description: 'Both provide emergency medical services in Israel.' }
  ],
  'el-al-israel-airlines': [
    { name: 'Israel Ministry of Tourism', type: 'government partner', description: 'El Al is a key partner in Israeli tourism promotion.' },
    { name: 'Birthright Israel', type: 'travel partner', description: 'El Al carries many Birthright Israel participants.' }
  ],
  'jewish-leadership-council': [
    { name: 'United Jewish Israel Appeal', type: 'member', description: 'UJIA is a key member organization of the JLC.' },
    { name: 'Community Security Trust', type: 'security partner', description: 'CST provides security for British Jewish institutions coordinated through JLC.' }
  ],
  'wiener-holocaust-library': [
    { name: 'Holocaust Educational Trust', type: 'education partner', description: 'Both provide Holocaust education resources in the UK.' },
    { name: 'Fondation pour la Memoire de la Shoah', type: 'European partner', description: 'Both work on Holocaust memory and education in Europe.' }
  ],
  'central-council-of-jews-in-germany': [
    { name: 'Abraham Geiger College', type: 'educational institution', description: 'The first liberal rabbinical seminary in continental Europe since the Holocaust, supported by the Central Council.' },
    { name: 'Jewish Museum Berlin', type: 'cultural partner', description: 'Both represent key aspects of German Jewish institutional life.' }
  ],
  'albert-einstein-israelite-hospital': [
    { name: 'Hadassah Medical Center', type: 'medical peer', description: 'Both are Jewish-founded hospitals with world-class medical research programs.' }
  ],
  'start-up-nation-central': [
    { name: 'Technion-Israel Institute of Technology', type: 'ecosystem partner', description: 'Technion is a key pillar of the Israeli innovation ecosystem that SNC promotes.' },
    { name: 'Weizmann Institute of Science', type: 'ecosystem partner', description: 'Weizmann is a key institution in the Israeli innovation landscape.' }
  ],
  'hias-hebrew-immigrant-aid-society': [
    { name: 'International Rescue Committee', type: 'refugee peer', description: 'Both are major US-based refugee resettlement agencies.' },
    { name: 'The Jewish Federations of North America', type: 'communal funder', description: 'JFNA federations support HIAS resettlement work.' }
  ],
  'cantor-fitzgerald': [
    { name: 'Morgan Stanley', type: 'industry peer', description: 'Both are major financial services firms in New York.' },
    { name: 'Newmark Group', type: 'affiliate', description: 'Newmark Group was created by Howard Lutnick following Cantor Fitzgerald\'s commercial real estate expansion.' }
  ],
  'saban-capital-group': [
    { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'political alignment', description: 'Haim Saban is a major supporter of AIPAC and pro-Israel advocacy.' },
    { name: 'Clinton Foundation', type: 'donor', description: 'Saban has been a major donor to the Clinton Foundation and Democratic causes.' }
  ],
  'pj-library': [
    { name: 'Repair the World', type: 'Jewish engagement peer', description: 'Both are newer Jewish engagement initiatives targeting families and young adults.' }
  ],
  'azrieli-foundation': [
    { name: 'Canadian Jewish News', type: 'community connection', description: 'Both serve the Canadian Jewish community in cultural and educational capacities.' },
    { name: 'Centre for Israel and Jewish Affairs', type: 'Canadian communal partner', description: 'Both are major institutions in Canadian Jewish life.' }
  ],
  'secure-community-network': [
    { name: 'Community Security Trust', type: 'British counterpart', description: 'CST in the UK and SCN in the US serve parallel roles protecting Jewish communities.' },
    { name: 'Federal Bureau of Investigation', type: 'law enforcement partner', description: 'SCN coordinates with the FBI on threats to the Jewish community.' }
  ],
  'foundation-for-jewish-camp': [
    { name: 'URJ Camp system', type: 'camp network', description: 'Reform movement camps are part of the broader Jewish camp network FJC supports.' },
    { name: 'Ramah Camps', type: 'camp network', description: 'Conservative movement Ramah camps participate in the broader Jewish camp ecosystem.' }
  ]
};

let connAdded = 0;
for (const entryId in connectionsToAdd) {
  for (const conn of connectionsToAdd[entryId]) {
    addConnectionToEntry(entryId, conn);
    connAdded++;
  }
}
console.log(`  Added ${connAdded} cross-connections`);

// ============================================================
// PART 4: Rebuild affiliations for all people
// ============================================================
console.log('Part 4: Rebuilding affiliations...');
const affMap = {};
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    for (const ind of (entry.individuals || [])) {
      if (!affMap[ind.id]) affMap[ind.id] = [];
      affMap[ind.id].push({
        organization: entry.name,
        role: ind.role || 'Associated',
        entryId: entry.id,
        country: country
      });
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
console.log(`  Updated ${affCount} affiliations`);

// ============================================================
// SAVE
// ============================================================
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2));

// Final stats
let totalEntries = 0, totalConns = 0, totalPeople = Object.keys(peopleData.people).length;
let countrySet = new Set();
let catSet = new Set();
for (const country in data.countries) {
  countrySet.add(country);
  for (const entry of data.countries[country]) {
    totalEntries++;
    if (entry.category) catSet.add(entry.category);
    if (entry.connections) totalConns += entry.connections.length;
  }
}

console.log('\n=== FINAL STATS ===');
console.log(`Entries: ${totalEntries}`);
console.log(`Countries: ${countrySet.size}`);
console.log(`People: ${totalPeople}`);
console.log(`Connections: ${totalConns}`);
console.log(`Categories: ${catSet.size}`);
console.log('Done!');
