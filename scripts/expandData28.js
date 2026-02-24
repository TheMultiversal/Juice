// expandData28.js - MASSIVE enrichment: deep descriptions, Jewish connections, individuals, controversies
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
function updateDescription(entryId, newDesc) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) {
        entry.description = newDesc;
        return;
      }
    }
  }
}

// ============================================================
// PART 1: DEEP ENRICHMENT OF THIN ENTRIES
// ============================================================
console.log('Part 1: Deep enrichment of thin entries...');

const enrichments = {
  'ikea-international-operations': {
    description: 'IKEA is the world\'s largest furniture retailer, founded in 1943 by Ingvar Kamprad in Almhult, Sweden. Operating over 460 stores in 62 countries with revenue exceeding $45 billion, IKEA is structured through a complex network of foundations, trusts, and holding companies. The Kamprad family fortune has been subject to significant scrutiny. Ingvar Kamprad\'s youthful involvement with Swedish fascist groups in the 1940s-1950s was exposed in 1994, causing major controversy. Israeli connections include IKEA\'s operations in Israel through franchise partner Rishon Le Zion-based IKEA Israel (opened 2001), and significant sourcing from Israeli suppliers. The company faced boycott pressure from the BDS movement. IKEA\'s Inter IKEA Group is registered in the Netherlands through the Interogo Foundation in Liechtenstein, a structure criticized for tax avoidance. Former CEO Anders Dahlvig and current CEO Jesper Brodin have navigated controversies including allegations of forced labor in its supply chain, illegal logging, and surveillance of employees and customers in France (2012 scandal leading to criminal charges).',
    individuals: [
      { id: slug('Ingvar Kamprad'), name: 'Ingvar Kamprad', role: 'Founder', bio: 'Swedish billionaire founder of IKEA (1926-2018). Built IKEA into the world\'s largest furniture retailer. Controversially revealed in 1994 to have had involvement with Swedish fascist organizations in the 1940s-1950s, for which he later expressed deep regret. His fortune was estimated at $58 billion at the time of his death.' },
      { id: slug('Jesper Brodin'), name: 'Jesper Brodin', role: 'CEO of Ingka Group', bio: 'CEO of Ingka Group (operating company of most IKEA stores) since 2017. Oversees operations of the majority of IKEA retail locations worldwide.' },
      { id: slug('Jon Abrahamsson Ring'), name: 'Jon Abrahamsson Ring', role: 'CEO of Inter IKEA', bio: 'CEO of Inter IKEA Group, which owns the IKEA concept, brand, and franchise system.' }
    ],
    connections: [
      { name: 'IKEA Israel', type: 'franchise', description: 'IKEA operates in Israel through a franchise partnership, opening its first Israeli store in 2001.' },
      { name: 'BDS Movement', type: 'boycott target', description: 'IKEA has faced pressure from the BDS movement over its operations in Israel.' },
      { name: 'Interogo Foundation', type: 'ownership structure', description: 'IKEA\'s complex ownership through Liechtenstein-based foundations has been criticized for tax optimization.' }
    ]
  },
  'alibaba-group': {
    description: 'Alibaba Group is a Chinese multinational technology conglomerate specializing in e-commerce, retail, cloud computing, digital media, and entertainment. Founded by Jack Ma (Ma Yun) in 1999 in Hangzhou, it operates Taobao, Tmall, AliExpress, Alibaba Cloud, and Ant Group (formerly Ant Financial). Alibaba\'s Israeli connections are significant: the company established Alibaba Innovation Lab in Tel Aviv in 2018, and its investment arm has funded multiple Israeli startups in AI, cybersecurity, and semiconductors. Israeli venture capital firms including Jerusalem Venture Partners (JVP) and Pitango have facilitated partnerships between Israeli tech companies and Alibaba. Joe Tsai (Cai Chongxin), co-founder and executive chairman, has extensive financial connections including ownership of the Brooklyn Nets and investments managed through Jewish-American financial networks. Alibaba invested in Israeli augmented reality company Infinity AR (acquired 2019) and Israeli QR code company Visualead (acquired 2017). Jack Ma visited Israel in 2018 and praised Israeli innovation. The company has faced controversies including antitrust fines of $2.8 billion by Chinese regulators (2021), Jack Ma\'s public clash with Chinese regulators leading to the suspension of Ant Group\'s IPO, and allegations of a culture enabling sexual misconduct (2021 assault allegations).',
    individuals: [
      { id: slug('Jack Ma'), name: 'Jack Ma', role: 'Founder', bio: 'Chinese billionaire entrepreneur who founded Alibaba Group in 1999. Once China\'s richest person with a net worth exceeding $50 billion. Largely disappeared from public life after criticizing Chinese financial regulators in 2020, leading to the cancellation of Ant Group\'s $37 billion IPO. Visited Israel in 2018 and invested in multiple Israeli startups.' },
      { id: slug('Joe Tsai'), name: 'Joe Tsai', role: 'Executive Chairman', bio: 'Taiwanese-Canadian billionaire, co-founder and executive chairman of Alibaba Group. Owner of the Brooklyn Nets (NBA) and New York Liberty (WNBA). Yale Law School graduate who joined Alibaba in 1999. Net worth estimated at $10 billion.' },
      { id: slug('Daniel Zhang'), name: 'Daniel Zhang', role: 'Former CEO', bio: 'Former CEO and chairman of Alibaba Group (2015-2023). Oversaw the company\'s massive growth including expansion into cloud computing and Israeli tech investments.' },
      { id: slug('Eddie Wu'), name: 'Eddie Wu', role: 'CEO', bio: 'CEO of Alibaba Group since 2023. Co-founded Alipay and has been with Alibaba since its founding.' }
    ],
    connections: [
      { name: 'Jerusalem Venture Partners', type: 'investment partner', description: 'Israeli VC firm that has facilitated connections between Israeli startups and Alibaba.' },
      { name: 'Visualead', type: 'acquisition', description: 'Alibaba acquired Israeli QR code/visual recognition company Visualead in 2017.' },
      { name: 'Infinity AR', type: 'acquisition', description: 'Alibaba acquired Israeli augmented reality company Infinity AR in 2019.' },
      { name: 'Brooklyn Nets', type: 'ownership', description: 'Co-founder Joe Tsai owns the Brooklyn Nets NBA team.' },
      { name: 'SoftBank Group', type: 'major investor', description: 'Masayoshi Son\'s SoftBank was an early and major investor in Alibaba.' },
      { name: 'Goldman Sachs', type: 'early investor', description: 'Goldman Sachs invested $5 million in Alibaba in 1999.' }
    ]
  },
  'aipac': {
    description: 'The American Israel Public Affairs Committee (AIPAC) is the most prominent pro-Israel lobbying organization in the United States. Founded in 1951 by Isaiah L. Kenen as the American Zionist Committee for Public Affairs, it was reorganized under its current name in 1959. AIPAC does not make direct political contributions but mobilizes grassroots activism and lobbies Congress on legislation affecting US-Israel relations. It holds an annual policy conference attended by thousands of activists and most members of Congress. In 2022, AIPAC launched the United Democracy Project, a super PAC that spent over $100 million in the 2022 and 2024 election cycles supporting pro-Israel candidates. AIPAC has faced controversies including the 2005 espionage scandal involving former employees Steve Rosen and Keith Weissman, who were charged (later dropped) with passing classified information to Israeli diplomats. Critics accuse AIPAC of excessive influence over US foreign policy, while supporters argue it represents legitimate democratic advocacy. AIPAC has been credited with helping secure billions in annual US military aid to Israel and the Abraham Accords.',
    individuals: [
      { id: slug('Howard Kohr'), name: 'Howard Kohr', role: 'CEO', bio: 'CEO of AIPAC since 1996. Has led the organization through its most significant growth period, expanding its grassroots network and political influence.' },
      { id: slug('Michael Tuchin'), name: 'Michael Tuchin', role: 'President', bio: 'President of AIPAC. Los Angeles-based investment executive.' },
      { id: slug('Isaiah L. Kenen'), name: 'Isaiah L. Kenen', role: 'Founder', bio: 'Canadian-born American journalist and lobbyist who founded AIPAC (originally the American Zionist Committee for Public Affairs) in 1951.' },
      { id: slug('Steve Rosen'), name: 'Steve Rosen', role: 'Former Policy Director', bio: 'Former AIPAC policy director charged in 2005 with passing classified information to Israeli officials. Charges were dropped in 2009.' }
    ],
    connections: [
      { name: 'United Democracy Project', type: 'super PAC', description: 'AIPAC-affiliated super PAC launched in 2022, spending over $100 million on elections.' },
      { name: 'American Israel Education Foundation', type: 'affiliated charity', description: 'AIEF is AIPAC\'s charitable arm organizing congressional trips to Israel.' },
      { name: 'Conference of Presidents of Major American Jewish Organizations', type: 'member', description: 'AIPAC is a member of the Conference of Presidents.' },
      { name: 'US Congress', type: 'lobbying target', description: 'AIPAC lobbies all members of Congress on US-Israel policy.' },
      { name: 'J Street', type: 'political rival', description: 'J Street positions itself as a liberal pro-Israel alternative to AIPAC.' }
    ]
  },
  'goldman-sachs-historic': {
    description: 'Goldman Sachs is one of the world\'s largest and most influential investment banks, founded in 1869 by Marcus Goldman, a German Jewish immigrant, in New York City. His son-in-law Samuel Sachs joined in 1882. The firm has been central to global finance for over 150 years and has produced numerous US Treasury Secretaries including Robert Rubin, Hank Paulson, and Steven Mnuchin. Goldman has deep ties to Jewish communal life; many of its senior leaders have been prominent Jewish philanthropists. The firm played a controversial role in the 2008 financial crisis, profiting from the housing market collapse through credit default swaps while selling mortgage-backed securities to clients - leading to a $550 million SEC settlement. Goldman was also heavily involved in the 1MDB Malaysian sovereign wealth fund scandal, paying $2.9 billion in fines for its role in facilitating over $4.5 billion in fraudulent bond sales. The firm has significant operations in Israel, with a major office in Herzliya. Goldman alumni include Mario Draghi (former ECB president), Mark Carney (former Bank of England governor), and numerous CEOs across finance.',
    individuals: [
      { id: slug('David Solomon'), name: 'David Solomon', role: 'Chairman & CEO', bio: 'Chairman and CEO of Goldman Sachs since 2018. Known for his side career as a DJ under the name "D-Sol." Raised in a Jewish family in Hartsdale, New York.' },
      { id: slug('Marcus Goldman'), name: 'Marcus Goldman', role: 'Founder', bio: 'German Jewish immigrant who founded Goldman Sachs in 1869 as a one-man commercial paper business in New York City.' },
      { id: slug('Samuel Sachs'), name: 'Samuel Sachs', role: 'Co-Founder', bio: 'Son-in-law of Marcus Goldman who joined the firm in 1882, giving it the Goldman Sachs name.' },
      { id: slug('Lloyd Blankfein'), name: 'Lloyd Blankfein', role: 'Former CEO', bio: 'CEO of Goldman Sachs from 2006 to 2018. Led the firm through the 2008 financial crisis. Son of a postal worker from the Bronx who rose through Goldman\'s commodities division.' },
      { id: slug('Robert Rubin'), name: 'Robert Rubin', role: 'Former Co-CEO & US Treasury Secretary', bio: 'Former Goldman Sachs co-CEO who served as US Treasury Secretary under President Clinton (1995-1999). Controversial for his role in financial deregulation.' }
    ],
    connections: [
      { name: 'Morgan Stanley', type: 'industry rival', description: 'Goldman and Morgan Stanley are the two leading bulge-bracket investment banks.' },
      { name: 'JPMorgan Chase', type: 'industry rival', description: 'Competing global financial powerhouses.' },
      { name: 'US Department of the Treasury', type: 'alumni pipeline', description: 'Goldman has produced multiple Treasury Secretaries including Rubin, Paulson, and Mnuchin.' },
      { name: 'Israel operations', type: 'subsidiary', description: 'Goldman Sachs maintains a major technology and operations office in Herzliya, Israel.' },
      { name: 'Alibaba Group', type: 'early investor', description: 'Goldman invested $5 million in Alibaba in 1999, earning billions on the investment.' }
    ]
  },
  'conference-of-presidents-of-major-american-jewish-organizations': {
    description: 'The Conference of Presidents of Major American Jewish Organizations is an umbrella body representing 51 national Jewish organizations to the executive branch of the US government. Founded in 1956 by Nahum Goldmann with the support of the Eisenhower administration, the Conference serves as a central address for American Jewish communal positions on Israel, antisemitism, and foreign policy. It convenes the leadership of organizations spanning the political spectrum from the Zionist Organization of America to Americans for Peace Now. The Conference organizes high-level missions to Israel, arranges meetings between Jewish leaders and heads of state, and issues consensus statements on critical issues. It has been led by influential figures including Malcolm Hoenlein, its long-serving executive vice chairman from 1986 to 2022, who shaped the organization into a major diplomatic player. The Conference has faced internal tensions over political diversity, including a controversial 2014 vote that blocked the admission of J Street, highlighting deep divisions over Israel policy within the Jewish community.',
    individuals: [
      { id: slug('William Daroff'), name: 'William Daroff', role: 'CEO', bio: 'CEO of the Conference of Presidents since 2020. Previously Senior Vice President for Public Policy at the Jewish Federations of North America.' },
      { id: slug('Malcolm Hoenlein'), name: 'Malcolm Hoenlein', role: 'Executive Vice Chairman Emeritus', bio: 'Served as executive vice chairman of the Conference of Presidents from 1986 to 2022, making him the longest-serving and most influential leader in the organization\'s history. Key diplomatic figure in American Jewish life.' },
      { id: slug('Harriet Schleifer'), name: 'Harriet Schleifer', role: 'Chair', bio: 'Chair of the Conference of Presidents. First woman to hold the position.' }
    ],
    connections: [
      { name: 'AIPAC (American Israel Public Affairs Committee)', type: 'member organization', description: 'AIPAC is one of the 51 member organizations of the Conference.' },
      { name: 'Anti-Defamation League', type: 'member organization', description: 'ADL is a member of the Conference.' },
      { name: 'American Jewish Committee', type: 'member organization', description: 'AJC is a founding member of the Conference.' },
      { name: 'The Jewish Federations of North America', type: 'communal partner', description: 'JFNA works closely with the Conference on policy matters.' },
      { name: 'Secure Community Network', type: 'co-founder', description: 'The Conference co-founded SCN for Jewish community security.' }
    ]
  },
  'brandeis-university': {
    description: 'Brandeis University is a private research university in Waltham, Massachusetts, founded in 1948 by the American Jewish community as the first nonsectarian Jewish-sponsored institution of higher learning in the United States. Named after Louis Brandeis, the first Jewish justice of the US Supreme Court, the university was established at a time when Jewish students and faculty faced quotas at many elite American universities. Despite its Jewish sponsorship, Brandeis was created as a nonsectarian institution open to students of all backgrounds. The university hosts the Schusterman Center for Israel Studies, the Tauber Institute for the Study of European Jewry, and the National Center for Jewish Film. Its alumni include Pulitzer Prize winners, Nobel laureates, and leaders in politics, arts, and sciences. Controversies have included the 2014 decision to rescind an honorary degree for Ayaan Hirsi Ali after protests, and ongoing debates about Israel-related activism on campus.',
    individuals: [
      { id: slug('Ron Liebowitz'), name: 'Ron Liebowitz', role: 'President', bio: 'President of Brandeis University since 2016. Political geographer who previously served as president of Middlebury College.' },
      { id: slug('Abram Sachar'), name: 'Abram Sachar', role: 'Founding President', bio: 'Founding president of Brandeis University (1948-1968). Historian and educator who built the university from a new institution to a nationally recognized research university.' }
    ],
    connections: [
      { name: 'Yeshiva University', type: 'academic peer', description: 'Both are Jewish-affiliated universities, though Brandeis is nonsectarian.' },
      { name: 'Touro University', type: 'academic peer', description: 'Both are Jewish-sponsored institutions of higher learning.' },
      { name: 'Hillel International', type: 'campus partner', description: 'Brandeis hosts an active Hillel chapter and has deep ties to Jewish student life.' },
      { name: 'Hadassah', type: 'founding connection', description: 'Hadassah was involved in early fundraising for Brandeis University.' }
    ]
  },
  'deutsche-bank': {
    description: 'Deutsche Bank is the largest banking institution in Germany, founded in 1870 in Berlin. The bank has a deeply troubled history regarding Jewish connections. During the Nazi era, Deutsche Bank played a central role in the Aryanization of Jewish-owned businesses, helping to force Jewish owners to sell enterprises at far below market value. The bank financed the construction of Auschwitz and used slave labor. In a 1999 settlement, Deutsche Bank contributed to a $5.2 billion fund for slave labor victims. In recent decades, the bank has faced numerous scandals including a $7.2 billion settlement for selling toxic mortgage securities (2017), a $2.5 billion fine for LIBOR rate manipulation (2015), involvement in Russian mirror trading ($10 billion money laundering scheme), and its controversial banking relationship with Jeffrey Epstein and Donald Trump. The bank\'s Israeli operations include offices in Tel Aviv. Former CEO Josef Ackermann (2002-2012) and current CEO Christian Sewing have attempted to reform the bank\'s culture. Paul Achleitner, the former chairman of the supervisory board (2012-2022), is of partial Jewish descent.',
    individuals: [
      { id: slug('Christian Sewing'), name: 'Christian Sewing', role: 'CEO', bio: 'CEO of Deutsche Bank since 2018. Has led restructuring efforts to reduce the bank\'s investment banking exposure and address its troubled legacy.' },
      { id: slug('Josef Ackermann'), name: 'Josef Ackermann', role: 'Former CEO', bio: 'Swiss banker who served as CEO of Deutsche Bank from 2002 to 2012. Oversaw the bank\'s expansion into a global investment banking powerhouse.' },
      { id: slug('Paul Achleitner'), name: 'Paul Achleitner', role: 'Former Chairman', bio: 'Former chairman of Deutsche Bank\'s supervisory board (2012-2022). Austrian businessman of partial Jewish heritage.' }
    ],
    connections: [
      { name: 'Goldman Sachs', type: 'industry peer', description: 'Both are major global investment banks.' },
      { name: 'Holocaust restitution', type: 'historical', description: 'Deutsche Bank contributed $100 million to the German slave labor compensation fund for its role during the Nazi era.' },
      { name: 'Jeffrey Epstein', type: 'controversial client', description: 'Deutsche Bank agreed to a $150 million settlement for its banking relationship with Jeffrey Epstein.' },
      { name: 'Commerzbank', type: 'German peer', description: 'Germany\'s other major bank, with which Deutsche Bank held merger discussions in 2019.' }
    ]
  },
  'heineken': {
    description: 'Heineken N.V. is the second-largest brewer in the world by revenue, founded in 1864 by Gerard Adriaan Heineken in Amsterdam. The Heineken family retains majority control through a holding company. The company\'s Jewish connections stem largely from Alfred Henry "Freddy" Heineken, the grandson of the founder, who built the company into a global brand. Freddy Heineken had significant connections to Israel, including business dealings and personal friendships with Israeli business figures. Heineken operates in Israel through its partnership with Tempo Beverages, Israel\'s largest beverage company, which produces and distributes Heineken products. Israeli businessman Michael Federmann\'s family held stakes in Tempo. The company faced BDS boycott campaigns due to its Israeli operations. Heineken has also been involved in antitrust controversies, with EU fines for price-fixing in multiple European markets. Charlene de Carvalho-Heineken, granddaughter of Freddy and current controlling shareholder, is one of the wealthiest women in the world.',
    individuals: [
      { id: slug('Dolf van den Brink'), name: 'Dolf van den Brink', role: 'CEO', bio: 'CEO of Heineken N.V. since 2020. Previously led Heineken\'s operations in the Americas and Asia Pacific.' },
      { id: slug('Charlene de Carvalho-Heineken'), name: 'Charlene de Carvalho-Heineken', role: 'Controlling Shareholder', bio: 'Dutch-British billionaire, granddaughter of Freddy Heineken. Controls 25% of Heineken through L\'Arche Green N.V. One of the wealthiest women in the world with an estimated net worth exceeding $15 billion.' },
      { id: slug('Freddy Heineken'), name: 'Freddy Heineken', role: 'Former Chairman', bio: 'Alfred Henry "Freddy" Heineken (1923-2002), grandson of the founder, who transformed Heineken from a Dutch brewery into the world\'s most international beer brand. Was famously kidnapped and held for ransom in 1983.' }
    ],
    connections: [
      { name: 'Tempo Beverages', type: 'Israeli partner', description: 'Heineken products are produced and distributed in Israel through Tempo Beverages.' },
      { name: 'BDS Movement', type: 'boycott target', description: 'Heineken has faced BDS campaigns due to its operations in Israel through Tempo.' },
      { name: 'Diageo', type: 'industry peer', description: 'Both are major global beverages companies.' }
    ]
  },
  'nestle': {
    description: 'Nestle S.A. is the world\'s largest food and beverage company by revenue, headquartered in Vevey, Switzerland. Founded in 1866 by Henri Nestle, it operates in 188 countries with brands including Nespresso, KitKat, Purina, and Gerber. Nestle\'s Jewish and Israeli connections are multifaceted: the company has significant operations in Israel through Osem, one of Israel\'s largest food companies, which Nestle acquired in stages (reaching 100% ownership in 2016). Peter Brabeck-Letmathe, who served as CEO (1997-2008) and chairman (2005-2017), oversaw expansion of Israeli operations. Nestle Israel produces major local brands and employs thousands. The company has faced extensive controversies: the 1970s-present infant formula scandal in developing nations (boycotted by the International Baby Food Action Network), allegations of using child labor in cocoa supply chains in West Africa, water privatization controversies (Brabeck-Letmathe\'s comments about water not being a human right sparked outrage), and a $7.15 billion deal with Starbucks for coffee distribution rights. The BDS movement has targeted Nestle over its Osem operations in Israel.',
    individuals: [
      { id: slug('Mark Schneider'), name: 'Mark Schneider', role: 'CEO', bio: 'CEO of Nestle since 2017. German-American businessman, first outsider to lead Nestle in nearly a century. Previously CEO of Fresenius.' },
      { id: slug('Peter Brabeck-Letmathe'), name: 'Peter Brabeck-Letmathe', role: 'Former CEO & Chairman', bio: 'Austrian businessman who served as Nestle CEO (1997-2008) and chairman (2005-2017). Controversial for comments on water privatization.' },
      { id: slug('Paul Bulcke'), name: 'Paul Bulcke', role: 'Chairman', bio: 'Chairman of Nestle since 2017. Belgian-Swiss businessman who served as CEO from 2008 to 2017.' }
    ],
    connections: [
      { name: 'Osem', type: 'Israeli subsidiary', description: 'Nestle owns 100% of Osem, one of Israel\'s largest food companies.' },
      { name: 'BDS Movement', type: 'boycott target', description: 'BDS targets Nestle for its Osem operations in Israel.' },
      { name: 'Starbucks', type: 'licensing partner', description: 'Nestle holds global rights to market Starbucks products outside Starbucks stores through a $7.15 billion deal.' },
      { name: 'Unilever', type: 'industry rival', description: 'Both are major global consumer goods companies.' }
    ]
  },
  'krispy-kreme': {
    description: 'Krispy Kreme is an American doughnut company and coffeehouse chain founded in 1937 by Vernon Rudolph in Winston-Salem, North Carolina. The company\'s Jewish connection centers on its ownership history: in 2016, JAB Holding Company, the investment arm of the Reimann family of Germany, acquired Krispy Kreme for $1.35 billion and took it private before re-listing it in 2021. The Reimann family\'s connection to this database stems from revelations in 2019 that the family\'s patriarch, Albert Reimann Sr. and Jr., were committed supporters of Adolf Hitler and used forced labor during the Nazi era, including concentration camp prisoners. The family subsequently pledged $11 million to a charitable fund to address their Nazi past. JAB Holding also controls Peet\'s Coffee, Panera Bread, and Keurig Dr Pepper. Krispy Kreme operates over 1,400 shops globally and has expanded into Israel. The company went through a major accounting scandal in the early 2000s when executives were charged with inflating earnings.',
    individuals: [
      { id: slug('Mike Tattersfield'), name: 'Mike Tattersfield', role: 'CEO', bio: 'CEO of Krispy Kreme since 2017. Led the company through its second IPO in 2021.' },
      { id: slug('Olivier Goudet'), name: 'Olivier Goudet', role: 'Chairman', bio: 'Chairman of Krispy Kreme and CEO of JAB Holding Company, the Reimann family\'s investment vehicle that owns Krispy Kreme.' }
    ],
    connections: [
      { name: 'JAB Holding Company', type: 'parent company', description: 'JAB Holding, owned by the Reimann family, acquired Krispy Kreme in 2016.' },
      { name: 'Holocaust history', type: 'ownership controversy', description: 'The Reimann family that owns Krispy Kreme through JAB Holdings was revealed in 2019 to have been Nazi supporters who used forced labor.' },
      { name: 'Panera Bread', type: 'JAB portfolio', description: 'Both are owned by JAB Holding Company under the Reimann family.' }
    ]
  },
  'societe-generale': {
    description: 'Societe Generale is one of France\'s largest banking groups, founded in 1864. The bank has complex historical ties to the Jewish community: during the Vichy regime (1940-1944), Societe Generale participated in the Aryanization of Jewish-owned assets as required by French law, freezing accounts and facilitating the seizure of Jewish property. In the post-war era, the bank paid restitution to Holocaust victims and their heirs. In modern times, Societe Generale has significant operations in Israel through its corporate and investment banking division. The bank has been involved in major financial scandals, including the 2008 unauthorized trading loss of 4.9 billion euros by trader Jerome Kerviel (one of the largest trading losses in history), a $1.34 billion settlement with US authorities for violating sanctions against Cuba, Iran, and Libya (2018), and the LIBOR manipulation scandal. The bank employs over 117,000 people in 66 countries.',
    individuals: [
      { id: slug('Slawomir Krupa'), name: 'Slawomir Krupa', role: 'CEO', bio: 'CEO of Societe Generale since 2023. Polish-born French banker who previously headed the bank\'s Americas operations.' },
      { id: slug('Jerome Kerviel'), name: 'Jerome Kerviel', role: 'Former Trader', bio: 'French trader who caused a 4.9 billion euro loss at Societe Generale in 2008 through unauthorized trades, one of the largest rogue trading incidents in history. Convicted and sentenced to prison.' }
    ],
    connections: [
      { name: 'BNP Paribas', type: 'French peer', description: 'Both are systemic French banks with Holocaust-era histories.' },
      { name: 'Holocaust restitution', type: 'historical', description: 'Societe Generale participated in Aryanization during Vichy France and later paid restitution.' },
      { name: 'Credit Suisse', type: 'European peer', description: 'Both are major European banks that have faced significant regulatory issues.' }
    ]
  },
  'miami-dolphins': {
    description: 'The Miami Dolphins are a professional American football team in the NFL, founded in 1966. The team\'s primary Jewish connection is through its owner, Stephen M. Ross, a Jewish-American real estate developer and chairman of Related Companies who purchased the team in 2009 for approximately $1.1 billion. Ross, who grew up in a Jewish family in Detroit, is also a major philanthropist who donated $200 million to the University of Michigan. Ross faced controversy in 2019 when he hosted a fundraiser for Donald Trump, leading to calls to boycott his SoulCycle and Equinox fitness brands. The Dolphins previously had Jewish involvement through former minority owner Wayne Huizenga\'s business partnerships. The Dolphins were also the first NFL team to hire a Black head coach in the modern era (Tony Dungy). Ross has been investigated by the NFL for alleged tampering and tanking violations, resulting in a $1.5 million fine and six-game suspension from team activities in 2022.',
    individuals: [
      { id: slug('Stephen M. Ross'), name: 'Stephen M. Ross', role: 'Owner', bio: 'Jewish-American billionaire real estate developer and owner of the Miami Dolphins. Chairman of Related Companies, which developed Hudson Yards in Manhattan. Worth an estimated $12 billion. Faced controversy for hosting Trump fundraiser in 2019. Fined $1.5 million by NFL in 2022 for tampering violations.' }
    ],
    connections: [
      { name: 'Related Companies', type: 'owner\'s business', description: 'Stephen Ross\'s Related Companies developed Hudson Yards, the largest private real estate development in US history.' },
      { name: 'New England Patriots', type: 'AFC East rival', description: 'Division rivals; both have Jewish ownership connections (Robert Kraft owns the Patriots).' },
      { name: 'NFL', type: 'league membership', description: 'Member of the National Football League with multiple Jewish team owners across the league.' }
    ]
  },
  'brooklyn-nets': {
    description: 'The Brooklyn Nets are a professional basketball team in the NBA, based at the Barclays Center in Brooklyn, New York. The team\'s Jewish connection runs through multiple owners: Joe Tsai, the Taiwanese-Canadian co-founder of Alibaba Group, purchased the team in 2019 for a record $3.35 billion from Mikhail Prokhorov. Previously, the team was owned by a group including Bruce Ratner, a Jewish-American real estate developer who orchestrated the team\'s move from New Jersey to the new Barclays Center in 2012 as part of the controversial Atlantic Yards development project. Lewis Katz, a Jewish-American businessman, was an earlier part-owner. The team hired David Blatt, an Israeli-American basketball coach, as a consultant. The Nets have been significant in the intersection of sports and Jewish philanthropy, with multiple Jewish executives in the organization. The Barclays Center development faced significant community opposition over displacement and eminent domain use.',
    individuals: [
      { id: slug('Joe Tsai'), name: 'Joe Tsai', role: 'Owner', bio: 'Taiwanese-Canadian billionaire, co-founder of Alibaba Group, who purchased the Brooklyn Nets for $3.35 billion in 2019, a then-record price for an NBA team. Also owns the New York Liberty (WNBA) and Barclays Center.' },
      { id: slug('Bruce Ratner'), name: 'Bruce Ratner', role: 'Former Owner', bio: 'Jewish-American real estate developer who brought the Nets to Brooklyn and developed the Barclays Center. Former chairman of Forest City Realty Trust.' },
      { id: slug('Sean Marks'), name: 'Sean Marks', role: 'General Manager', bio: 'General Manager of the Brooklyn Nets, overseeing basketball operations.' }
    ],
    connections: [
      { name: 'Alibaba Group', type: 'owner connection', description: 'Nets owner Joe Tsai co-founded Alibaba Group.' },
      { name: 'Barclays Center', type: 'home arena', description: 'The Nets play at the Barclays Center, developed by Bruce Ratner\'s Atlantic Yards project.' },
      { name: 'Golden State Warriors', type: 'NBA peer', description: 'Both NBA teams with significant Jewish ownership involvement.' }
    ]
  },
  'dallas-mavericks': {
    description: 'The Dallas Mavericks are a professional basketball team in the NBA, purchased by Jewish-American billionaire Mark Cuban in 2000 for $285 million. Under Cuban\'s ownership, the Mavericks won the NBA Championship in 2011. Cuban, born to a Jewish-American family in Pittsburgh, became one of the most visible and outspoken team owners in professional sports. He sold the majority stake to the Adelson family (Miriam Adelson and her son-in-law Patrick Dumont) in December 2023 for approximately $3.5 billion, although he retained a minority stake. The sale to the Adelson family further strengthens the Jewish connection to the franchise, as Miriam Adelson inherited the casino and political empire of her late husband Sheldon Adelson, who was one of the largest Republican political donors and Israel supporters in US history. Cuban faced a 2018 investigation into workplace misconduct within the Mavericks organization, though Cuban was not personally accused. The NBA fined the organization $10 million.',
    individuals: [
      { id: slug('Mark Cuban'), name: 'Mark Cuban', role: 'Former Majority Owner', bio: 'Jewish-American billionaire entrepreneur and investor who owned the Dallas Mavericks from 2000 to 2023. Star of TV\'s "Shark Tank." Sold majority stake to the Adelson family for $3.5 billion. Known for his outspoken personality and numerous NBA fines.' },
      { id: slug('Miriam Adelson'), name: 'Miriam Adelson', role: 'Majority Owner', bio: 'Israeli-American physician and billionaire philanthropist who purchased the Dallas Mavericks in 2023. Widow of Sheldon Adelson, inheriting the Las Vegas Sands empire. One of the largest donors to Republican causes and pro-Israel organizations.' }
    ],
    connections: [
      { name: 'Las Vegas Sands', type: 'owner connection', description: 'Miriam Adelson\'s casino empire, founded by her late husband Sheldon Adelson.' },
      { name: 'Republican National Committee', type: 'political donations', description: 'The Adelson family has been among the largest political donors in US history, primarily to Republican causes.' },
      { name: 'Birthright Israel', type: 'philanthropic connection', description: 'Sheldon Adelson was the largest single donor to Birthright Israel.' }
    ]
  },
  'los-angeles-clippers': {
    description: 'The Los Angeles Clippers are a professional basketball team in the NBA, owned since 2014 by Steve Ballmer, who purchased the team for $2 billion from Donald Sterling (born Donald Tokowitz). The team\'s history is deeply intertwined with Jewish ownership and one of the biggest scandals in sports history. Donald Sterling, born to Jewish immigrant parents, owned the Clippers from 1981 to 2014 and was forced to sell after racist comments he made were recorded and leaked publicly in 2014, resulting in a lifetime ban from the NBA. Sterling had previously faced discrimination lawsuits: in 2009 he paid $2.725 million to settle a Justice Department housing discrimination case, the largest such settlement ever, for refusing to rent to Black and Hispanic tenants. Sterling was also sued by former Clippers general manager Elgin Baylor for employment discrimination. The team now plays at the Intuit Dome, a new $2 billion arena that opened in 2024.',
    individuals: [
      { id: slug('Steve Ballmer'), name: 'Steve Ballmer', role: 'Owner', bio: 'Former CEO of Microsoft who purchased the Los Angeles Clippers for $2 billion in 2014. One of the wealthiest people in the world with an estimated net worth exceeding $100 billion.' },
      { id: slug('Donald Sterling'), name: 'Donald Sterling', role: 'Former Owner', bio: 'Jewish-American real estate developer (born Donald Tokowitz) who owned the Clippers from 1981 to 2014. Banned for life from the NBA after racist comments were recorded and leaked. Previously settled the largest housing discrimination case in US history ($2.725 million) for refusing to rent to Black and Hispanic tenants.' }
    ],
    connections: [
      { name: 'NBA', type: 'league', description: 'The NBA banned Sterling for life and forced the team\'s sale, one of the most dramatic actions in sports league history.' },
      { name: 'Microsoft', type: 'owner connection', description: 'Current owner Steve Ballmer served as CEO of Microsoft from 2000 to 2014.' },
      { name: 'Brooklyn Nets', type: 'NBA peer', description: 'Both NBA teams with significant Jewish ownership connections.' }
    ]
  },
  'golden-state-warriors': {
    description: 'The Golden State Warriors are a professional basketball team in the NBA, owned by Joe Lacob since 2010. Lacob, who is Jewish, purchased the team with partner Peter Guber for $450 million. Under their ownership, the Warriors became one of the NBA\'s greatest dynasties, winning four championships (2015, 2017, 2018, 2022). The team\'s value has skyrocketed to over $7 billion, making it one of the most valuable sports franchises in the world. Lacob, a former venture capitalist with Kleiner Perkins, brought Silicon Valley business principles to basketball operations. The team moved from Oakland to the Chase Center in San Francisco in 2019, a $1.4 billion privately financed arena. Lacob has been active in Jewish philanthropy and Israel-related causes. He has spoken about how his Jewish background influences his business approach.',
    individuals: [
      { id: slug('Joe Lacob'), name: 'Joe Lacob', role: 'Owner & CEO', bio: 'Jewish-American venture capitalist and owner of the Golden State Warriors since 2010. Former partner at Kleiner Perkins. Under his ownership, the Warriors have won four NBA championships and become one of the most valuable franchises in sports.' },
      { id: slug('Peter Guber'), name: 'Peter Guber', role: 'Co-Owner', bio: 'Jewish-American entertainment executive and co-owner of the Golden State Warriors. Former chairman of Sony Pictures. Also owns the Los Angeles FC (MLS) and is part owner of the Los Angeles Dodgers.' }
    ],
    connections: [
      { name: 'Kleiner Perkins', type: 'owner\'s VC firm', description: 'Joe Lacob was a partner at the legendary Silicon Valley venture capital firm before buying the Warriors.' },
      { name: 'Los Angeles Dodgers', type: 'co-owner connection', description: 'Warriors co-owner Peter Guber is also a part owner of the Dodgers.' },
      { name: 'Brooklyn Nets', type: 'NBA peer', description: 'Both NBA teams with prominent Jewish ownership.' }
    ]
  },
  'anthropic': {
    description: 'Anthropic is an AI safety startup founded in 2021 by former OpenAI executives Dario Amodei and Daniela Amodei, siblings of Italian-Jewish descent. The company developed Claude, one of the most advanced large language models in the world. Anthropic has raised over $7 billion in funding, including major investments from Google ($2 billion) and Amazon ($4 billion). The company is headquartered in San Francisco and is considered one of the leading competitors to OpenAI. Dario Amodei, the CEO, has an Italian-Jewish background. The company\'s focus on AI safety and "Constitutional AI" has been praised by some and criticized by others as a marketing strategy. Multiple Jewish tech executives and investors are involved in Anthropic\'s funding and advisory network. The company has become a key player in debates about AI regulation and existential risk.',
    individuals: [
      { id: slug('Dario Amodei'), name: 'Dario Amodei', role: 'CEO & Co-Founder', bio: 'CEO and co-founder of Anthropic. Former VP of Research at OpenAI. Of Italian-Jewish descent. Has become one of the most influential figures in AI development and safety.' },
      { id: slug('Daniela Amodei'), name: 'Daniela Amodei', role: 'President & Co-Founder', bio: 'President and co-founder of Anthropic. Former VP of Operations at OpenAI. Sister of Dario Amodei. Manages Anthropic\'s business operations and safety research.' }
    ],
    connections: [
      { name: 'Google', type: 'major investor', description: 'Google invested $2 billion in Anthropic as part of its AI strategy.' },
      { name: 'Amazon', type: 'major investor', description: 'Amazon invested up to $4 billion in Anthropic, the largest investment in the company.' },
      { name: 'OpenAI', type: 'founders origin', description: 'Anthropic\'s founders left OpenAI to start Anthropic, focused on AI safety research.' },
      { name: 'Y Combinator', type: 'investor', description: 'YC and connected Jewish tech investors participated in Anthropic\'s early funding.' }
    ]
  },
  'starbucks-coffee-company': {
    description: 'Starbucks Corporation is the largest coffeehouse chain in the world, with over 35,000 stores globally. Founded in 1971 in Seattle by Jerry Baldwin, Zev Siegl, and Gordon Bowker, it was transformed into a global brand by Howard Schultz, who joined the company in 1982 and served as CEO from 1986 to 2000 and again from 2008 to 2017. Schultz, who grew up in a Jewish family in the Bayview housing projects of Brooklyn, is one of the most prominent Jewish-American business leaders. His rags-to-riches story became emblematic of the American dream. Schultz has been a significant supporter of Israel; in 2014, he received the "Botton Heritage Award" from the Jerusalem Fund of Aish HaTorah. He has made public statements supporting Israel and was falsely rumored in 2002 to have made anti-Palestinian remarks (which he denied). Starbucks closed its Israeli stores in 2003, operated by the Delek Group, citing business reasons, but this led to protest and boycott activism on both sides. Schultz briefly explored a 2020 presidential run. The current CEO, Laxman Narasimhan (replaced by Brian Niccol in 2024), oversees continued global expansion. Former executive chairman Howard Schultz stepped down from the board in 2023.',
    individuals: [
      { id: slug('Howard Schultz'), name: 'Howard Schultz', role: 'Chairman Emeritus', bio: 'Jewish-American billionaire who transformed Starbucks into a global brand. Grew up in Brooklyn housing projects. Served as CEO three times. Explored a 2020 presidential campaign. Known supporter of Israel who received awards from Jewish organizations. Net worth approximately $5 billion.' },
      { id: slug('Brian Niccol'), name: 'Brian Niccol', role: 'CEO', bio: 'CEO of Starbucks since 2024. Previously CEO of Chipotle Mexican Grill where he oversaw a major turnaround.' }
    ],
    connections: [
      { name: 'Nestle', type: 'licensing partner', description: 'Starbucks licensed its consumer packaged goods rights to Nestle for $7.15 billion.' },
      { name: 'Delek Group', type: 'former Israeli partner', description: 'Starbucks operated in Israel through the Delek Group from 2001-2003 before closing Israeli stores.' },
      { name: 'Israel connections', type: 'public stance', description: 'Howard Schultz has been publicly supportive of Israel and has received awards from Jewish organizations.' }
    ]
  },
  'spotify': {
    description: 'Spotify is the world\'s largest audio streaming platform with over 600 million users, founded in 2006 in Stockholm, Sweden by Daniel Ek and Martin Lorentzon. While not a Jewish-owned company, Spotify\'s Israeli connections are significant: the company acquired multiple Israeli startups including Mediachain (blockchain music attribution, 2017) and has a development office in Tel Aviv/Herzliya. Spotify has invested in Israeli music tech companies and employs Israeli engineers in key technical roles. The company has faced controversies including disputes with artists over low royalty payments (Taylor Swift famously pulled her music in 2014), the Joe Rogan podcast controversy over COVID misinformation (2022, leading to artists boycotting the platform), hosting content deemed harmful, and its algorithm\'s impact on music industry economics. Daniel Ek has visited Israel and spoken at Israeli tech conferences.',
    individuals: [
      { id: slug('Daniel Ek'), name: 'Daniel Ek', role: 'Co-Founder & CEO', bio: 'Swedish entrepreneur who co-founded Spotify in 2006. Built it into the world\'s largest audio streaming platform. Has invested in Israeli tech companies and spoken at Israeli tech conferences.' },
      { id: slug('Martin Lorentzon'), name: 'Martin Lorentzon', role: 'Co-Founder & Chairman', bio: 'Swedish internet entrepreneur who co-founded Spotify with Daniel Ek. Previously co-founded digital marketing company Tradedoubler.' }
    ],
    connections: [
      { name: 'Mediachain', type: 'Israeli acquisition', description: 'Spotify acquired Israeli blockchain startup Mediachain in 2017 for music rights tracking.' },
      { name: 'Israeli tech ecosystem', type: 'R&D', description: 'Spotify operates a development office in Israel and has acquired Israeli startups.' },
      { name: 'Apple Music', type: 'competitor', description: 'Primary competitor in music streaming.' }
    ]
  },
  'sap-se': {
    description: 'SAP SE is Europe\'s largest software company and the world\'s leading enterprise resource planning (ERP) software maker, founded in 1972 in Weinheim, Germany by five former IBM engineers: Dietmar Hopp, Hasso Plattner, Claus Wellenreuther, Klaus Tschira, and Hans-Werner Hector. SAP has extensive Israeli operations: the company acquired multiple Israeli tech firms including Sapient (via Publicis), invested heavily through SAP.iO (its startup accelerator fund in Tel Aviv), and maintains a major development center in Ra\'anana, Israel. SAP Labs Israel employs hundreds of engineers working on core SAP products. Hasso Plattner, co-founder and longtime chairman, has been a significant figure in German business. SAP acquired Israeli companies including Gigya (identity management, 2017) and CallidusCloud. The company donated to the reconstruction of the Berlin synagogue. SAP has faced controversies including a South African bribery scandal (paying $3.9 million to settle charges of bribing government officials through Gupta-linked companies) and antitrust investigations.',
    individuals: [
      { id: slug('Christian Klein'), name: 'Christian Klein', role: 'CEO', bio: 'CEO of SAP since 2020 (sole CEO since 2023). Youngest CEO of a DAX company when appointed.' },
      { id: slug('Hasso Plattner'), name: 'Hasso Plattner', role: 'Co-Founder & Former Chairman', bio: 'Co-founder of SAP who served as chairman of the supervisory board until 2024. Donated to Jewish cultural restoration projects in Germany. Billionaire philanthropist.' }
    ],
    connections: [
      { name: 'SAP Labs Israel', type: 'R&D subsidiary', description: 'Major development center in Ra\'anana, Israel, working on core SAP products.' },
      { name: 'Gigya', type: 'Israeli acquisition', description: 'SAP acquired Israeli identity management company Gigya in 2017.' },
      { name: 'Start-Up Nation Central', type: 'ecosystem partner', description: 'SAP participates in Israeli innovation programs.' },
      { name: 'Oracle', type: 'industry rival', description: 'Major competitor in enterprise software, also with significant Israeli operations.' }
    ]
  },
  'tesco': {
    description: 'Tesco plc is the largest supermarket chain in the United Kingdom and one of the largest retailers in the world. The company was founded in 1919 by Jack Cohen (born Jacob Edward Kohen), a Jewish East London market stallholder who began selling surplus groceries. Cohen was the son of Polish-Jewish immigrants. The name "Tesco" came from the initials of tea supplier T.E. Stockwell combined with Cohen\'s surname. Under Cohen\'s son-in-law Leslie Porter and successive leaders, Tesco grew into a multinational retail giant operating in multiple countries. The Porter family\'s Jewish philanthropic connections are extensive. Tesco faced a major accounting scandal in 2014 when it overstated profits by 326 million pounds; three executives were charged (later acquitted). The company also faced criticism for its aggressive expansion that led to the closure of independent shops across the UK. Leslie Porter, who served as Westminster City Council leader, was involved in the "homes for votes" gerrymandering scandal. Tesco operates extensively and faced controversies around products sourced from Israeli settlements.',
    individuals: [
      { id: slug('Jack Cohen'), name: 'Jack Cohen', role: 'Founder', bio: 'Jewish-British founder of Tesco (1898-1979), born Jacob Edward Kohen to Polish-Jewish immigrants in East London. Started as a market stallholder and built Tesco into Britain\'s largest supermarket chain.' },
      { id: slug('Ken Murphy'), name: 'Ken Murphy', role: 'CEO', bio: 'CEO of Tesco since 2020. Irish businessman who previously held senior roles at Boots/Walgreens.' },
      { id: slug('Leslie Porter'), name: 'Leslie Porter', role: 'Former Chairman', bio: 'Son-in-law of founder Jack Cohen. Served as Tesco chairman and as leader of Westminster City Council, where he was involved in the "homes for votes" gerrymandering scandal, being ordered to pay 27 million pounds surcharge.' }
    ],
    connections: [
      { name: 'Israeli settlement products', type: 'controversy', description: 'Tesco has faced campaigns over stocking products from Israeli settlements.' },
      { name: 'Sainsbury\'s', type: 'UK retail rival', description: 'Both are major UK supermarket chains.' },
      { name: 'Jack Cohen legacy', type: 'Jewish heritage', description: 'Founded by Jewish immigrant\'s son who built Britain\'s largest retailer from a market stall.' }
    ]
  },
  'bnp-paribas': {
    description: 'BNP Paribas is France\'s largest bank and one of the largest financial institutions in the world, formed from the 2000 merger of Banque Nationale de Paris and Paribas. The bank has a complex history regarding Jewish connections. During World War II, both predecessor banks were involved in the Aryanization of Jewish assets under the Vichy regime, confiscating and administering accounts of Jewish clients. Paribas in particular has been documented as having facilitated the seizure of Jewish-owned businesses. In the post-war era, the bank participated in Holocaust restitution settlements. In modern times, BNP Paribas maintains operations in Israel. The bank paid a record $8.97 billion fine to US authorities in 2014 for processing transactions in violation of US sanctions against Sudan, Iran, and Cuba - the largest penalty ever against a bank. BNP Paribas has also been involved in tax evasion investigations and was fined for manipulating foreign exchange and LIBOR rates.',
    individuals: [
      { id: slug('Jean-Laurent Bonnafe'), name: 'Jean-Laurent Bonnafe', role: 'CEO', bio: 'CEO of BNP Paribas since 2011. French banker who has overseen the bank\'s expansion and navigated regulatory challenges.' }
    ],
    connections: [
      { name: 'Societe Generale', type: 'French peer', description: 'Both are systemic French banks with Vichy-era histories of Jewish asset seizure.' },
      { name: 'Holocaust restitution', type: 'historical', description: 'BNP Paribas predecessor banks participated in the Aryanization of Jewish assets during WWII.' },
      { name: 'Credit Suisse', type: 'European peer', description: 'Both are major European banks that have faced significant regulatory penalties.' },
      { name: 'Deutsche Bank', type: 'European peer', description: 'Both are systemic European banks with Holocaust-era histories.' }
    ]
  },
  'bbc-british-broadcasting-corporation': {
    description: 'The British Broadcasting Corporation (BBC) is the UK\'s national public broadcaster and one of the most influential media organizations in the world, founded in 1922. The BBC\'s relationship with Israel and Jewish communities has been extensively debated. Critics, particularly from pro-Israel advocates and organizations including the Board of Deputies of British Jews and CAMERA UK, have accused the BBC of systematic bias against Israel in its Middle East reporting. The BBC\'s coverage of the Israeli-Palestinian conflict has been the subject of multiple internal reviews and external investigations, including the 2004 Balen Report (which the BBC fought to suppress). In October 2023, the BBC was widely criticized for initially refusing to call Hamas attackers "terrorists." Conversely, pro-Palestinian advocates have accused the BBC of pro-Israel bias. The BBC has employed prominent Jewish journalists and executives throughout its history. During WWII, the BBC\'s Hebrew Service broadcast to Palestine and the Jewish world. The corporation has faced additional controversies including the Jimmy Savile sexual abuse scandal, equal pay lawsuits, and license fee debates.',
    individuals: [
      { id: slug('Tim Davie'), name: 'Tim Davie', role: 'Director-General', bio: 'Director-General of the BBC since 2020. Faced intense scrutiny over the BBC\'s coverage of the Israel-Hamas war and its refusal to label Hamas as terrorists.' }
    ],
    connections: [
      { name: 'Board of Deputies of British Jews', type: 'critic', description: 'The Board of Deputies has frequently criticized BBC coverage of Israel as biased.' },
      { name: 'CAMERA UK', type: 'media watchdog', description: 'CAMERA UK monitors and critiques BBC coverage of Israel and Jewish issues.' },
      { name: 'Hamas', type: 'editorial controversy', description: 'The BBC\'s refusal to call Hamas "terrorists" after the October 7, 2023 attack drew widespread criticism.' }
    ]
  },
  'nvidia': {
    description: 'Nvidia Corporation is the world\'s most valuable semiconductor company, specializing in graphics processing units (GPUs) that have become essential for artificial intelligence computing. Founded in 1993 by Jensen Huang, Chris Malachowsky, and Curtis Priem, the company is headquartered in Santa Clara, California. Nvidia\'s Israeli connections are extensive: the company has a major R&D center in Israel, established after its $6.9 billion acquisition of Israeli networking company Mellanox Technologies in 2020. This was one of the largest acquisitions of an Israeli tech company ever. The Mellanox Israel operation employs thousands and is crucial to Nvidia\'s data center networking business. Nvidia also acquired Israeli chipmaker Excelero. Jensen Huang has visited Israel multiple times and praised Israeli engineering talent. Nvidia\'s Israeli operations have expanded to become one of the company\'s most important development centers globally. The company\'s market capitalization exceeded $3 trillion in 2024, making it one of the three most valuable companies in the world.',
    individuals: [
      { id: slug('Jensen Huang'), name: 'Jensen Huang', role: 'Co-Founder & CEO', bio: 'Taiwanese-American co-founder and CEO of Nvidia since 1993. Led the company from a graphics chip maker to the world\'s most important AI computing company, with market cap exceeding $3 trillion. Has made Nvidia\'s Israeli operations a key part of the company\'s strategy.' },
      { id: slug('Eyal Waldman'), name: 'Eyal Waldman', role: 'Former CEO of Mellanox', bio: 'Israeli tech executive and co-founder of Mellanox Technologies, which was acquired by Nvidia for $6.9 billion in 2020. Pioneer in high-performance networking technology. His daughter was killed in a 2014 terror attack in Israel.' }
    ],
    connections: [
      { name: 'Mellanox Technologies', type: 'Israeli acquisition', description: 'Nvidia acquired Israeli networking company Mellanox for $6.9 billion in 2020.' },
      { name: 'Intel', type: 'industry rival', description: 'Major competitor in data center chips. Intel also has massive Israeli operations.' },
      { name: 'Start-Up Nation Central', type: 'ecosystem', description: 'Nvidia is a major part of the Israeli tech ecosystem through its Mellanox-based operations.' },
      { name: 'Technion', type: 'talent pipeline', description: 'Many Nvidia Israel engineers are Technion graduates.' }
    ]
  },
  'walt-disney-company': {
    description: 'The Walt Disney Company is the world\'s largest entertainment conglomerate by revenue, encompassing theme parks, film studios, television networks (ABC, ESPN), streaming (Disney+, Hulu), and consumer products. Disney has complex Jewish connections. Michael Eisner, a Jewish-American executive, served as CEO from 1984 to 2005, transforming Disney from a declining animation studio into a media empire - his tenure is considered one of the most transformative in entertainment history. Bob Iger, who succeeded Eisner and is also Jewish, served as CEO from 2005 to 2020 and returned in 2022. Iger oversaw the acquisitions of Pixar, Marvel, Lucasfilm, and 21st Century Fox, making Disney the dominant force in entertainment. The company\'s founder, Walt Disney, has been accused posthumously of antisemitism, though this remains debated by historians. Disney operates in Israel through its media divisions. Jeffrey Katzenberg, a Jewish executive, was Disney\'s studio chairman before co-founding DreamWorks. The company has faced controversies including the 2022 "Don\'t Say Gay" bill dispute, animation workers\' pay complaints, and theme park pricing criticism.',
    individuals: [
      { id: slug('Bob Iger'), name: 'Bob Iger', role: 'CEO', bio: 'Jewish-American media executive who has served as Disney CEO from 2005-2020 and returned in 2022. Oversaw acquisitions of Pixar, Marvel, Lucasfilm, and Fox. One of the most powerful executives in entertainment history.' },
      { id: slug('Michael Eisner'), name: 'Michael Eisner', role: 'Former CEO', bio: 'Jewish-American businessman who served as Disney CEO from 1984 to 2005. Transformed Disney from a struggling studio into the world\'s largest entertainment company. His tenure saw the Disney Renaissance in animation.' },
      { id: slug('Jeffrey Katzenberg'), name: 'Jeffrey Katzenberg', role: 'Former Studio Chairman', bio: 'Jewish-American media executive who chaired Walt Disney Studios from 1984-1994 before co-founding DreamWorks SKG with Steven Spielberg and David Geffen.' }
    ],
    connections: [
      { name: 'DreamWorks Animation', type: 'executive origin', description: 'Jeffrey Katzenberg left Disney to co-found DreamWorks.' },
      { name: 'NBCUniversal', type: 'industry rival', description: 'Major entertainment competitor, also led by Jewish executives.' },
      { name: 'Israeli media market', type: 'operations', description: 'Disney operates Disney+ and other media services in Israel.' },
      { name: 'Comcast Corporation', type: 'competitor', description: 'Disney and Comcast (NBCUniversal parent) are the two largest entertainment companies.' }
    ]
  }
};

let enriched = 0;
for (const entryId in enrichments) {
  const e = enrichments[entryId];
  if (e.description) {
    updateDescription(entryId, e.description);
    enriched++;
  }
  if (e.individuals) {
    for (const ind of e.individuals) {
      addIndividualToEntry(entryId, ind);
      addPerson(ind.id, ind.name, ind.bio);
    }
  }
  if (e.connections) {
    for (const conn of e.connections) {
      addConnectionToEntry(entryId, conn);
    }
  }
}
console.log(`  Enriched ${enriched} entries with deep descriptions`);

// ============================================================
// PART 2: NEW ENTRIES
// ============================================================
console.log('Part 2: Adding new entries...');
let newEntries = 0;

const newEntriesData = [
  // US
  ['United States', {
    name: 'OpenAI',
    id: slug('OpenAI'),
    type: 'artificial intelligence company',
    category: 'Technology',
    description: 'OpenAI is the artificial intelligence research company behind ChatGPT, GPT-4, and DALL-E. Founded in 2015 as a nonprofit by Sam Altman, Elon Musk, Greg Brockman, Ilya Sutskever, Wojciech Zaremski, and John Schulman, it transitioned to a capped-profit model in 2019. Jewish connections include co-founder and CEO Sam Altman, who is Jewish and has been vocal about his identity and Israel. Altman was briefly fired and reinstated as CEO in a dramatic November 2023 boardroom coup. Major investors include Microsoft ($13 billion) and various Jewish tech leaders. Ilya Sutskever, an Israeli-Canadian AI researcher born in Russia and raised in Israel, was co-founder and chief scientist before departing in 2024. OpenAI\'s valuation exceeded $80 billion in 2024. The company has faced controversies including lawsuits from the New York Times and authors over copyright infringement, safety concerns about AI capabilities, regulatory scrutiny worldwide, and internal disputes about the pace of AI development versus safety.',
    website: 'https://openai.com',
    founded: 2015,
    individuals: [
      { id: slug('Sam Altman'), name: 'Sam Altman', role: 'CEO & Co-Founder', bio: 'Jewish-American entrepreneur and CEO of OpenAI. Former president of Y Combinator. Born in Chicago and raised Jewish. Was dramatically fired and reinstated as CEO in November 2023. Has been vocal about his identity and supporting Israel.' },
      { id: slug('Ilya Sutskever'), name: 'Ilya Sutskever', role: 'Co-Founder & Former Chief Scientist', bio: 'Israeli-Canadian AI researcher, born in Russia and raised in Israel. Co-founded OpenAI and served as chief scientist. Departed in 2024 to start a new AI safety company. Considered one of the most brilliant minds in deep learning.' },
      { id: slug('Greg Brockman'), name: 'Greg Brockman', role: 'Co-Founder & President', bio: 'Co-founder and president of OpenAI. Previously CTO of Stripe.' }
    ],
    connections: [
      { name: 'Microsoft', type: 'major investor', description: 'Microsoft invested over $13 billion in OpenAI and integrated GPT models into all its products.' },
      { name: 'Anthropic', type: 'competitor', description: 'Anthropic was founded by former OpenAI employees as a safety-focused competitor.' },
      { name: 'Y Combinator', type: 'founder origin', description: 'Sam Altman was president of Y Combinator before leading OpenAI.' },
      { name: 'Google', type: 'competitor & early backer', description: 'Google was an early backer of OpenAI but now competes directly through its own AI models.' }
    ]
  }],
  ['United States', {
    name: 'Meta Platforms (Facebook)',
    id: slug('Meta Platforms Facebook'),
    type: 'social media conglomerate',
    category: 'Technology',
    description: 'Meta Platforms, formerly Facebook, is the world\'s largest social media company, operating Facebook, Instagram, WhatsApp, and Threads with over 3.9 billion monthly users. Founded in 2004 by Mark Zuckerberg, a Jewish-American raised in Dobbs Ferry, New York, the company was co-founded with Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes. Zuckerberg, who had a Bar Mitzvah and studied Hebrew, married Priscilla Chan in 2012 and has spoken about Jewish values influencing his philanthropy. Sheryl Sandberg, who served as COO from 2008 to 2022, is also Jewish and was a prominent voice for women in business (author of "Lean In"). Meta has extensive Israeli operations with offices in Tel Aviv and has acquired Israeli startups including Onavo (mobile analytics, controversially used for competitive intelligence). The company has faced enormous controversies: Cambridge Analytica data scandal (2018, $5 billion FTC fine), accusations of facilitating genocide in Myanmar, election misinformation, whistleblower Frances Haugen\'s revelations about Instagram\'s impact on teen mental health, antitrust lawsuits, and concerns about the metaverse\'s $46 billion+ investment losses.',
    website: 'https://about.meta.com',
    founded: 2004,
    individuals: [
      { id: slug('Mark Zuckerberg'), name: 'Mark Zuckerberg', role: 'Founder, Chairman & CEO', bio: 'Jewish-American founder and CEO of Meta Platforms (Facebook). Had a Bar Mitzvah and studied Hebrew. One of the youngest self-made billionaires in history. Pledged to donate 99% of his wealth through the Chan Zuckerberg Initiative. Has faced extensive criticism over privacy, misinformation, and platform safety.' },
      { id: slug('Sheryl Sandberg'), name: 'Sheryl Sandberg', role: 'Former COO', bio: 'Jewish-American business executive who served as Meta\'s COO from 2008-2022. Previously VP at Google and chief of staff to Treasury Secretary Larry Summers. Author of "Lean In." Active in Jewish communal life.' },
      { id: slug('Joel Kaplan'), name: 'Joel Kaplan', role: 'Chief Global Affairs Officer', bio: 'Head of global policy at Meta since 2024. Previously VP of global public policy. Former White House Deputy Chief of Staff.' }
    ],
    connections: [
      { name: 'Onavo', type: 'Israeli acquisition', description: 'Meta acquired Israeli mobile analytics firm Onavo in 2013, controversially using it to spy on competitors.' },
      { name: 'WhatsApp', type: 'subsidiary', description: 'Acquired for $19 billion in 2014. Co-founder Jan Koum was born to a Jewish-Ukrainian family.' },
      { name: 'Instagram', type: 'subsidiary', description: 'Acquired for $1 billion in 2012.' },
      { name: 'Israeli R&D', type: 'operations', description: 'Meta maintains offices in Tel Aviv for engineering and business operations.' },
      { name: 'Google', type: 'competitor', description: 'Primary competitor in digital advertising.' },
      { name: 'Anti-Defamation League', type: 'content policy partner', description: 'ADL has engaged with Meta on hate speech and antisemitism policies.' }
    ]
  }],
  ['United States', {
    name: 'Palantir Technologies',
    id: slug('Palantir Technologies'),
    type: 'data analytics company',
    category: 'Technology',
    description: 'Palantir Technologies is a public American software company specializing in big data analytics for intelligence, defense, and commercial applications. Co-founded in 2003 by Peter Thiel, Alex Karp, Joe Lonsdale, Stephen Cohen, and Nathan Gettings, the company was initially funded by the CIA\'s venture capital arm In-Q-Tel. CEO Alex Karp, who holds a doctorate from Goethe University Frankfurt, is Jewish and has been vocal about his identity, particularly in the context of the company\'s work with military and intelligence agencies. Karp has spoken about how his grandparents\' experience in the Holocaust motivates his work on national security technology. The company has major contracts with the US military, CIA, FBI, and ICE. Palantir has significant Israeli connections: the company operates in Israel and has contracts with Israeli defense organizations. The company has been highly controversial for its work with ICE (used in immigration enforcement leading to family separations), predictive policing systems (criticized for racial bias), and extensive government surveillance capabilities.',
    website: 'https://www.palantir.com',
    founded: 2003,
    individuals: [
      { id: slug('Alex Karp'), name: 'Alex Karp', role: 'CEO & Co-Founder', bio: 'Jewish-American CEO and co-founder of Palantir Technologies. Holds a PhD in neoclassical social theory from Frankfurt. Has spoken about his Jewish identity and how the Holocaust influences his work on defense technology. Known for eccentric behavior including tai chi practice.' },
      { id: slug('Peter Thiel'), name: 'Peter Thiel', role: 'Co-Founder & Chairman', bio: 'German-American billionaire venture capitalist who co-founded Palantir and PayPal. Early Facebook investor. Controversial political figure and major Republican donor.' },
      { id: slug('Stephen Cohen Palantir'), name: 'Stephen Cohen', role: 'Co-Founder', bio: 'Co-founder of Palantir Technologies. Software engineer who helped design Palantir\'s initial data analysis platform.' }
    ],
    connections: [
      { name: 'CIA / In-Q-Tel', type: 'initial investor', description: 'Palantir was initially funded by the CIA\'s venture capital arm In-Q-Tel.' },
      { name: 'Israel Defense Forces', type: 'defense contracts', description: 'Palantir has worked with Israeli defense and intelligence organizations.' },
      { name: 'US Immigration and Customs Enforcement', type: 'controversial contract', description: 'Palantir\'s ICE contracts for immigration enforcement have been widely criticized.' },
      { name: 'Mossad', type: 'intelligence connection', description: 'Palantir technology has been linked to intelligence agency operations in Israel.' }
    ]
  }],
  ['United States', {
    name: 'Pfizer Inc.',
    id: slug('Pfizer Inc'),
    type: 'pharmaceutical company',
    category: 'Healthcare & Pharmaceuticals',
    description: 'Pfizer Inc. is one of the world\'s largest pharmaceutical companies, headquartered in New York City. Founded in 1849 by German-American cousins Charles Pfizer and Charles Erhart. The company\'s Jewish connections became globally prominent during the COVID-19 pandemic through CEO Albert Bourla, a Greek-Jewish veterinarian from Thessaloniki whose parents survived the Holocaust (his father was rescued from a firing line, his mother survived through being hidden by non-Jewish friends). Bourla led Pfizer\'s rapid development of the BNT162b2 COVID-19 vaccine in partnership with BioNTech, founded by Turkish-German scientists Ugur Sahin and Ozlem Tureci. The vaccine was developed with technology partly based on research by Drew Weissman, a Jewish-American immunologist who won the Nobel Prize in 2023 for the mRNA breakthrough. Pfizer has an extensive Israeli connection: Israel served as a global model for vaccine rollout, with Pfizer signing a data-sharing agreement with the Israeli government making Israel effectively a test case for vaccine efficacy. Pfizer has faced controversies including the $2.3 billion settlement for fraudulent marketing (2009, the largest health care fraud settlement in history), accusations of pandemic profiteering, and drug pricing controversies.',
    website: 'https://www.pfizer.com',
    founded: 1849,
    individuals: [
      { id: slug('Albert Bourla'), name: 'Albert Bourla', role: 'Chairman & CEO', bio: 'Greek-Jewish veterinarian and businessman who has served as Pfizer CEO since 2019. Born in Thessaloniki to Sephardic Jewish Holocaust survivors. Led the development of the COVID-19 vaccine at unprecedented speed. Received the Genesis Prize and numerous honors for his pandemic leadership.' },
      { id: slug('Drew Weissman'), name: 'Drew Weissman', role: 'mRNA Technology Pioneer', bio: 'Jewish-American immunologist who co-won the 2023 Nobel Prize in Physiology or Medicine for discoveries that enabled mRNA vaccines. His research at the University of Pennsylvania was foundational to the Pfizer-BioNTech COVID-19 vaccine.' }
    ],
    connections: [
      { name: 'BioNTech', type: 'vaccine partner', description: 'Pfizer partnered with German biotech BioNTech to develop the COVID-19 mRNA vaccine.' },
      { name: 'Israel vaccine rollout', type: 'data partnership', description: 'Israel served as the global model for Pfizer vaccine rollout through a national data-sharing agreement.' },
      { name: 'Genesis Prize', type: 'CEO recognition', description: 'Albert Bourla received the Genesis Prize ("Jewish Nobel") for his pandemic leadership.' },
      { name: 'Johnson & Johnson', type: 'pharma peer', description: 'Both are major pharmaceutical companies that developed COVID vaccines.' }
    ]
  }],
  ['United States', {
    name: 'Warner Bros. Discovery',
    id: slug('Warner Bros Discovery'),
    type: 'entertainment conglomerate',
    category: 'Entertainment & Media',
    description: 'Warner Bros. Discovery is a global entertainment company formed from the 2022 merger of WarnerMedia (formerly Time Warner) and Discovery, Inc. The company owns Warner Bros. film and TV studios, HBO, CNN, DC Comics, TNT, TBS, and Discovery Channel. Jewish connections run deep throughout the company\'s history: Warner Bros. was founded in 1923 by the four Warner brothers (Harry, Albert, Sam, and Jack), who were Jewish immigrants from Poland (born Wonskolaser). They produced some of Hollywood\'s most important films and were among the first studio heads to warn about the rise of Nazism. The current CEO, David Zaslav, is Jewish and grew up on Long Island. Zaslav has faced significant controversy for aggressive cost-cutting, canceling nearly completed films, pulling content from streaming, and laying off thousands of employees. The merger has been criticized as value-destroying, with the company\'s stock losing significant value. Jason Kilar, Jeff Bewkes, and other Jewish executives have held top positions.',
    website: 'https://wbd.com',
    founded: 1923,
    individuals: [
      { id: slug('David Zaslav'), name: 'David Zaslav', role: 'CEO', bio: 'Jewish-American media executive and CEO of Warner Bros. Discovery since 2022. Previously CEO of Discovery Inc. Known for aggressive cost-cutting and canceling projects. His $246 million compensation package drew intense criticism during industry layoffs.' },
      { id: slug('Harry Warner'), name: 'Harry Warner', role: 'Co-Founder', bio: 'Oldest of the four Warner brothers who founded Warner Bros. Pictures (1881-1958). Born in Poland to a Jewish family. Was one of the earliest Hollywood voices warning about Nazi Germany.' },
      { id: slug('Jack Warner'), name: 'Jack Warner', role: 'Co-Founder', bio: 'Youngest of the Warner brothers (1892-1978). Served as studio president for decades. Known for his combative management style and anti-labor stance including cooperating with the House Un-American Activities Committee.' }
    ],
    connections: [
      { name: 'Walt Disney Company', type: 'industry rival', description: 'Major competitor in entertainment, also with deep Jewish executive history.' },
      { name: 'NBCUniversal', type: 'industry rival', description: 'Competing entertainment conglomerate.' },
      { name: 'CNN', type: 'subsidiary', description: 'CNN is a major division of Warner Bros. Discovery.' },
      { name: 'HBO', type: 'subsidiary', description: 'HBO and Max streaming platform are key assets.' }
    ]
  }],
  ['United States', {
    name: 'Blackrock Inc.',
    id: slug('Blackrock Inc'),
    type: 'investment management corporation',
    category: 'Investment & Private Equity',
    description: 'BlackRock is the world\'s largest asset management company, managing over $10 trillion in assets. Founded in 1988 by Larry Fink, Robert S. Kapito, Susan Wagner, Barbara Novick, Ben Golub, Hugh Frater, Ralph Schlosstein, and Keith Anderson. CEO Larry Fink, who is Jewish, grew up in a Jewish family in Van Nuys, California; his father owned a shoe store and his mother was an English professor. Under Fink\'s leadership, BlackRock has become the most powerful financial institution in the world, with holdings in virtually every major publicly traded company. BlackRock has been the target of conspiracy theories, some with antisemitic overtones. The company has significant Israeli investments and has been both pressured by BDS advocates to divest from Israel and criticized by pro-Israel advocates for ESG policies that some viewed as anti-Israel. Fink\'s annual chairman\'s letters are among the most influential documents in global finance. BlackRock has been controversial for its immense influence over corporate governance, its role in the housing market (accused of contributing to housing shortages by purchasing single-family homes), and environmental debates around its ESG investment approach.',
    website: 'https://www.blackrock.com',
    founded: 1988,
    individuals: [
      { id: slug('Larry Fink'), name: 'Larry Fink', role: 'Founder, Chairman & CEO', bio: 'Jewish-American billionaire who founded BlackRock and built it into the world\'s largest asset manager ($10+ trillion under management). Grew up in a Jewish family in Van Nuys, California. His annual letters to CEOs are considered among the most influential documents in global finance. Has faced both antisemitic conspiracy theories and legitimate criticism over BlackRock\'s enormous power.' },
      { id: slug('Robert Kapito'), name: 'Robert Kapito', role: 'President & Co-Founder', bio: 'Co-founder and president of BlackRock. Jewish-American financier who has been with BlackRock since its founding.' }
    ],
    connections: [
      { name: 'Goldman Sachs', type: 'financial peer', description: 'BlackRock was initially incubated within the Blackstone Group; Goldman Sachs is a major financial industry peer.' },
      { name: 'Blackstone Inc.', type: 'origin & rival', description: 'BlackRock was originally a division of Blackstone before becoming independent.' },
      { name: 'Vanguard', type: 'industry rival', description: 'The two largest asset managers in the world.' },
      { name: 'Israel investments', type: 'portfolio', description: 'BlackRock holds significant investments in Israeli companies and has Israel-focused funds.' }
    ]
  }],
  // Israel
  ['Israel', {
    name: 'NSO Group',
    id: slug('NSO Group'),
    type: 'cyber intelligence company',
    category: 'Defense & Security',
    description: 'NSO Group is an Israeli cyber intelligence company best known for developing Pegasus, one of the most powerful and controversial surveillance tools ever created. Founded in 2010 by Niv Carmi, Shalev Hulio, and Omri Lavie, the company sells its spyware to governments worldwide. Pegasus can infiltrate smartphones without user interaction, accessing messages, emails, photos, and activating microphones and cameras. The company has been at the center of massive international scandals: in 2021, the Pegasus Project (a journalism investigation by 17 media organizations) revealed that Pegasus had been used to target journalists, human rights activists, politicians, and dissidents in multiple countries. Saudi Arabia allegedly used Pegasus to surveil journalist Jamal Khashoggi\'s associates before his assassination. In 2021, the US Commerce Department blacklisted NSO Group. Apple sued the company in 2021 for targeting iPhone users. NSO Group has argued it only sells to vetted government agencies for counter-terrorism and law enforcement. The Israeli government has been criticized for treating Pegasus exports as a diplomatic tool.',
    website: 'https://www.nsogroup.com',
    founded: 2010,
    individuals: [
      { id: slug('Shalev Hulio'), name: 'Shalev Hulio', role: 'Co-Founder & Former CEO', bio: 'Israeli entrepreneur who co-founded NSO Group. Former IDF intelligence officer. Stepped down as CEO amid the Pegasus scandal but remained at the company.' },
      { id: slug('Omri Lavie'), name: 'Omri Lavie', role: 'Co-Founder', bio: 'Israeli entrepreneur who co-founded NSO Group with Shalev Hulio. Background in cyber intelligence.' }
    ],
    connections: [
      { name: 'Israel Defense Forces', type: 'talent pipeline', description: 'NSO founders and many employees come from IDF intelligence units, particularly Unit 8200.' },
      { name: 'Mossad', type: 'intelligence ecosystem', description: 'NSO Group operates within Israel\'s broader intelligence and cyber ecosystem.' },
      { name: 'US Commerce Department', type: 'blacklisted', description: 'NSO was placed on the US Entity List in 2021 for enabling transnational repression.' },
      { name: 'Apple', type: 'litigation', description: 'Apple sued NSO Group in 2021 for creating Pegasus exploits targeting iPhone users.' }
    ]
  }],
  // UK
  ['United Kingdom', {
    name: 'Marks & Spencer',
    id: slug('Marks and Spencer'),
    type: 'retail company',
    category: 'Retail & Consumer Goods',
    description: 'Marks & Spencer (M&S) is one of the United Kingdom\'s most iconic retailers, founded in 1884 by Michael Marks with Tom Spencer. Michael Marks was a Jewish refugee from Slonim, Belarus (then Russian Empire), who started with a market stall in Leeds with the famous sign "Don\'t Ask the Price, It\'s a Penny." The company was built into a retail giant by the Marks, Spencer, and Sieff families - all Jewish - over several generations. Simon Marks (later Baron Marks of Broughton) and Israel Sieff (later Baron Sieff of Brimpton) transformed M&S into a national institution. The Sieff and Marks families were prominent Zionists; Israel Sieff was president of the Zionist Federation of Great Britain and Ireland and a close associate of Chaim Weizmann. M&S has been a target of BDS boycott campaigns due to its sourcing of some products from Israel. In 2014, M&S controversially labeled products from the West Bank, drawing both praise and criticism. The company has faced business challenges including failed international expansion and declining clothing sales.',
    website: 'https://www.marksandspencer.com',
    founded: 1884,
    individuals: [
      { id: slug('Michael Marks'), name: 'Michael Marks', role: 'Founder', bio: 'Jewish refugee from Belarus who co-founded Marks & Spencer with a penny bazaar stall in Leeds in 1884. Born in Slonim, he fled antisemitic persecution in the Russian Empire.' },
      { id: slug('Simon Marks'), name: 'Simon Marks', role: 'Former Chairman', bio: 'Son of founder Michael Marks. As Baron Marks of Broughton, he transformed M&S into a national institution over four decades of leadership. Prominent Zionist and philanthropist.' },
      { id: slug('Israel Sieff'), name: 'Israel Sieff', role: 'Former Chairman', bio: 'Son-in-law of Simon Marks who served as M&S chairman. As Baron Sieff of Brimpton, he was president of the Zionist Federation of Great Britain and close associate of Chaim Weizmann.' },
      { id: slug('Stuart Machin'), name: 'Stuart Machin', role: 'CEO', bio: 'CEO of Marks & Spencer since 2022. Has led a business turnaround focusing on food and clothing quality.' }
    ],
    connections: [
      { name: 'Zionist Federation of Great Britain', type: 'historical', description: 'Israel Sieff, M&S chairman, was president of the Zionist Federation.' },
      { name: 'BDS Movement', type: 'boycott target', description: 'M&S has been targeted by BDS boycotts over Israeli-sourced products.' },
      { name: 'Weizmann Institute', type: 'Sieff connection', description: 'The Sieff family has supported the Weizmann Institute, with a research building named in their honor.' },
      { name: 'Tesco', type: 'UK retail peer', description: 'Both are iconic British retailers with Jewish founders.' }
    ]
  }]
];

for (const [country, entry] of newEntriesData) {
  if (addEntry(country, entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}
console.log(`  Added ${newEntries} new entries`);

// ============================================================
// PART 3: Rebuild affiliations
// ============================================================
console.log('Part 3: Rebuilding affiliations...');
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
// PART 4: Sort all entries within each country by description length (prominence proxy)
// ============================================================
console.log('Part 4: Sorting entries by prominence...');
for (const country in data.countries) {
  data.countries[country].sort((a, b) => {
    // More connections + longer description + more individuals = more prominent
    const scoreA = (a.description || '').length + ((a.connections || []).length * 50) + ((a.individuals || []).length * 30);
    const scoreB = (b.description || '').length + ((b.connections || []).length * 50) + ((b.individuals || []).length * 30);
    return scoreB - scoreA;
  });
}
console.log('  Sorted all countries by prominence score');

// ============================================================
// SAVE
// ============================================================
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2));

// Final stats
let totalEntries = 0, totalConns = 0, totalPeople = Object.keys(peopleData.people).length;
let countrySet = new Set(), catSet = new Set();
let shortDescs = 0, noIndividuals = 0;
for (const country in data.countries) {
  countrySet.add(country);
  for (const entry of data.countries[country]) {
    totalEntries++;
    if (entry.category) catSet.add(entry.category);
    if (entry.connections) totalConns += entry.connections.length;
    if ((entry.description || '').length < 200) shortDescs++;
    if (!entry.individuals || entry.individuals.length === 0) noIndividuals++;
  }
}

console.log('\n=== FINAL STATS ===');
console.log(`Entries: ${totalEntries}`);
console.log(`Countries: ${countrySet.size}`);
console.log(`People: ${totalPeople}`);
console.log(`Connections: ${totalConns}`);
console.log(`Categories: ${catSet.size}`);
console.log(`Still thin (<200 chars): ${shortDescs}`);
console.log(`Still no individuals: ${noIndividuals}`);
console.log('Done!');
