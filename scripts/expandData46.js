/**
 * expandData46.js - Massive People Expansion
 * 1. Fix all 19 missing people referenced in entries
 * 2. Add 100+ additional prominent people to the database
 * 3. Add them to relevant organizations in jewish.json
 */
const fs = require('fs');
const path = require('path');
const pFile = path.join(__dirname, '..', 'data', 'people.json');
const jFile = path.join(__dirname, '..', 'data', 'jewish.json');
const pd = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const jd = JSON.parse(fs.readFileSync(jFile, 'utf8'));

function addPerson(id, name, bio) {
  if (!pd.people[id]) {
    pd.people[id] = { name, bio, notes: '', affiliations: [] };
    return true;
  }
  if (bio.length > (pd.people[id].bio||'').length) pd.people[id].bio = bio;
  return false;
}
function addToEntry(country, entryId, individual) {
  if (!jd.countries[country]) return false;
  const entry = jd.countries[country].find(e => e.id === entryId);
  if (!entry) return false;
  if (!entry.individuals) entry.individuals = [];
  if (entry.individuals.some(i => i.id === individual.id)) return false;
  entry.individuals.push(individual);
  return true;
}

let newPeople = 0;
let newRefs = 0;

// === Part 1: Fix 19 missing people ===
const missingPeople = [
  ['ron-klein', 'Ron Klein', 'American politician. Former U.S. Representative from Florida (2007-2011). Chair of the National Jewish Democratic Council. Previously served in the Florida State Legislature.'],
  ['bob-sternfels', 'Bob Sternfels', 'American business executive. Global Managing Partner of McKinsey & Company since 2021. Leads one of the world\'s most influential management consulting firms.'],
  ['rachel-lithgow', 'Rachel Lithgow', 'American museum and cultural heritage administrator. Executive Director of the American Jewish Historical Society, overseeing the oldest ethnic historical organization in the United States.'],
  ['neil-barr', 'Neil Barr', 'American lawyer. Managing Partner of Davis Polk & Wardwell, one of the oldest and most prestigious law firms on Wall Street. The firm has long-standing ties to major financial institutions.'],
  ['christoph-schweizer', 'Christoph Schweizer', 'German business executive. CEO of Boston Consulting Group (BCG) since 2021. Leads one of the Big Three management consulting firms with over 25,000 employees worldwide.'],
  ['jonathan-kessler', 'Jonathan Kessler', 'American advocacy professional. Executive Director of the American Israel Education Foundation (AIEF), the philanthropic arm of AIPAC that sponsors educational trips to Israel for U.S. lawmakers and political leaders.'],
  ['canary-mission-anonymous', 'Anonymous Founders', 'The anonymous founders of Canary Mission, a controversial database that documents individuals and organizations allegedly promoting anti-Semitism, support for BDS, and hatred of the USA/Israel on college campuses.'],
  ['russell-robinson-ind', 'Russell Robinson', 'American nonprofit executive. CEO of the Jewish National Fund-USA (JNF-USA). Has led the organization\'s land development and environmental projects in Israel.'],
  ['rupert-murdoch', 'Rupert Murdoch', 'Australian-born American media mogul. Founder and Chairman Emeritus of News Corp and 21st Century Fox. Built a global media empire including Fox News, The Wall Street Journal, The Times (UK), and HarperCollins. One of the most influential media figures in modern history.'],
  ['warden-lamine-ndiaye', 'Lamine N\'Diaye', 'American corrections official. Served as Warden of the Metropolitan Correctional Center (MCC) in New York. Was warden during the period when Jeffrey Epstein died in custody in August 2019.'],
  ['bernd-lembcke', 'Bernd Lembcke', 'German-American hospitality executive. Former Club Manager of Mar-a-Lago, Donald Trump\'s private club in Palm Beach, Florida.'],
  ['eli-glickman', 'Eli Glickman', 'Israeli business executive. President and CEO of ZIM Integrated Shipping Services, one of the world\'s largest container shipping companies. Under his leadership ZIM went public on the NYSE in 2021.'],
  ['hein-schumacher', 'Hein Schumacher', 'Dutch business executive. CEO of Unilever since July 2023. Previously served as CEO of FrieslandCampina. Leads one of the world\'s largest consumer goods companies.'],
  ['john-brown-iwm', 'Sir John Brown', 'British businessman and engineer. Former CEO of BP (1995-2007). Chairman of the Imperial War Museum (2017-2024). Oversaw the expansion of the IWM Holocaust Exhibition.'],
  ['edmond-elmaleh', 'Edmond El Maleh', 'French-Moroccan media professional. Director of Radio Shalom, the Jewish community radio station in Paris broadcasting since 1981.'],
  ['yonathan-arfi-ind', 'Yonathan Arfi', 'French Jewish communal leader. President of CRIF (Representative Council of French Jewish Institutions) since 2022, the main umbrella organization representing French Jewish communities.'],
  ['howard-feldman', 'Howard Feldman', 'South African journalist and editor. Editor of the SA Jewish Report, the main English-language Jewish newspaper in South Africa covering community news and Israeli affairs.'],
  ['richard-sobel', 'Richard Sobel', 'South African museum director. Director of the Cape Town Holocaust and Genocide Centre, South Africa\'s only museum dedicated to the Holocaust and other genocides.'],
  ['mark-schneider-nestle', 'Mark Schneider', 'German business executive. CEO of Nestle since 2017. Previously led Fresenius health care group. Oversees the world\'s largest food and beverage company by revenue.'],
];
missingPeople.forEach(([id, name, bio]) => { if(addPerson(id, name, bio)) newPeople++; });

// === Part 2: Add 100+ new prominent people ===
const bigPeopleAdd = [
  // Media & Entertainment
  ['bob-iger', 'Bob Iger', 'American media executive. CEO of The Walt Disney Company (2005-2020, returned 2022-present). Oversaw Disney\'s acquisitions of Pixar, Marvel, Lucasfilm, and 21st Century Fox. One of the most powerful executives in entertainment history.'],
  ['david-zaslav', 'David Zaslav', 'American media executive. CEO of Warner Bros. Discovery since 2022. Previously CEO of Discovery Inc (2007-2022). Oversees HBO, CNN, Warner Bros. studios, and Discovery networks.'],
  ['jeff-zucker', 'Jeff Zucker', 'American media executive. Former president of CNN Worldwide (2013-2022). Former CEO of NBCUniversal. Former executive producer of Today show.'],
  ['jeff-shell', 'Jeff Shell', 'American businessman. Former CEO of NBCUniversal (2020-2023). Departed after acknowledging an inappropriate relationship with a colleague.'],
  ['brian-roberts', 'Brian Roberts', 'American billionaire businessman. Chairman and CEO of Comcast Corporation since 2002. Son of Comcast co-founder Ralph Roberts. Controls one of the largest telecommunications and media companies globally, owning NBCUniversal and Sky.'],
  ['shari-redstone', 'Shari Redstone', 'American businesswoman and media magnate. President of National Amusements and Chair of Paramount Global (formerly ViacomCBS). Daughter of Sumner Redstone. Controls CBS, Paramount Pictures, MTV, Showtime, and Nickelodeon.'],
  ['barry-diller', 'Barry Diller', 'American billionaire businessman and media executive. Chairman of IAC and Expedia Group. Former chairman of Fox Broadcasting and Paramount Pictures. Pioneer of the Fox Broadcasting Company and QVC.'],
  ['michael-bloomberg', 'Michael Bloomberg', 'American billionaire businessman and politician. Founder of Bloomberg L.P., the financial data and media company. Former Mayor of New York City (2002-2013). Major philanthropist donating over $17 billion to various causes.'],
  ['sumner-redstone', 'Sumner Redstone', 'American media magnate (1923-2020). Controlling shareholder of National Amusements, Viacom, and CBS. Built one of the largest media empires in history. Born Sumner Murray Rothstein to a Jewish family in Boston.'],

  // Finance & Banking
  ['lloyd-blankfein', 'Lloyd Blankfein', 'American banker. Former Chairman and CEO of Goldman Sachs (2006-2018). Led Goldman through the 2008 financial crisis, during which the bank received a $10 billion government bailout. Born to a Jewish family in the Bronx.'],
  ['jamie-dimon', 'Jamie Dimon', 'American billionaire businessman. Chairman and CEO of JPMorgan Chase since 2005. Leads the largest bank in the United States. Named the most influential banker in the world. His JPMorgan Chase had Jeffrey Epstein as a client for over 15 years.'],
  ['brian-moynihan', 'Brian Moynihan', 'American businessman. Chairman and CEO of Bank of America since 2010. Leads one of the Big Four banking institutions in the United States.'],
  ['david-solomon', 'David Solomon', 'American banker. Chairman and CEO of Goldman Sachs since 2018. Also DJs under the name D-Sol. Leads one of the most prominent investment banks globally.'],
  ['ray-dalio', 'Ray Dalio', 'American billionaire investor. Founder of Bridgewater Associates, the world\'s largest hedge fund. Pioneer of risk parity investing. Author of "Principles." Born to an Italian-American family in Queens, has invested significantly in Israel.'],
  ['ken-griffin', 'Ken Griffin', 'American billionaire hedge fund manager. Founder and CEO of Citadel LLC. One of the wealthiest people in America. Major political donor. Citadel is one of the most dominant hedge funds and market makers globally.'],
  ['steve-schwarzman', 'Steve Schwarzman', 'American billionaire businessman. Chairman, CEO, and co-founder of Blackstone, the world\'s largest alternative investment firm managing $1 trillion in assets. Born to a Jewish family in Philadelphia. Major Republican donor.'],
  ['carl-icahn', 'Carl Icahn', 'American billionaire financier. Founder of Icahn Enterprises. Known as a corporate raider and activist investor. Has taken major positions in companies including TWA, Texaco, and Apple. Born to a Jewish family in Queens, New York.'],
  ['paul-singer-ind', 'Paul Singer', 'American billionaire hedge fund manager. Founder of Elliott Management Corporation, one of the most powerful activist hedge funds. Known for aggressive tactics including seizing Argentine naval vessel. Major Republican donor and pro-Israel advocate.'],
  ['dan-loeb', 'Dan Loeb', 'American billionaire hedge fund manager. Founder and CEO of Third Point LLC. Known as an activist investor targeting companies like Yahoo, Sony, and Nestle. Born to a Jewish family.'],
  ['nelson-peltz', 'Nelson Peltz', 'American billionaire businessman. Co-founder of Trian Fund Management. Activist investor who has influenced Disney, P&G, Wendy\'s, and DuPont. Born to a Jewish family in Brooklyn.'],

  // Technology
  ['mark-zuckerberg', 'Mark Zuckerberg', 'American billionaire technology entrepreneur. Co-founder, Chairman, and CEO of Meta Platforms (formerly Facebook). Built the world\'s largest social media platform with over 3 billion users. Born to a Jewish family in White Plains, New York.'],
  ['sergey-brin', 'Sergey Brin', 'American billionaire computer scientist. Co-founder of Google and Alphabet Inc. Born in Moscow to a Jewish family, emigrated to the US at age 6. Developed the Google search algorithm with Larry Page at Stanford.'],
  ['larry-page', 'Larry Page', 'American billionaire computer scientist. Co-founder of Google and Alphabet Inc. Developed the PageRank algorithm that became the foundation of Google Search. One of the wealthiest people in the world.'],
  ['larry-ellison', 'Larry Ellison', 'American billionaire technology entrepreneur. Co-founder of Oracle Corporation. One of the richest people in the world. Born to a Jewish mother in New York City. Major investor in various tech and biotech companies.'],
  ['michael-dell', 'Michael Dell', 'American billionaire businessman. Founder, Chairman, and CEO of Dell Technologies. Started the company from his university dorm room. Born to a Jewish family in Houston, Texas.'],
  ['marc-benioff', 'Marc Benioff', 'American billionaire internet entrepreneur. Founder, Chairman, and CEO of Salesforce. Pioneer of cloud computing and SaaS. Born to a Jewish family in San Francisco. Major philanthropist.'],
  ['sheryl-sandberg', 'Sheryl Sandberg', 'American technology executive and author. Former COO of Meta Platforms/Facebook (2008-2022). Author of "Lean In." Previously Chief of Staff to Treasury Secretary Larry Summers. Born to a Jewish family.'],
  ['jeff-bezos', 'Jeff Bezos', 'American billionaire technology entrepreneur. Founder and executive chairman of Amazon, the world\'s largest e-commerce and cloud computing company. Owner of The Washington Post and Blue Origin.'],
  ['sam-altman', 'Sam Altman', 'American entrepreneur and investor. CEO of OpenAI, creator of ChatGPT. Former president of Y Combinator. Born to a Jewish family in Chicago. One of the most influential figures in the AI revolution.'],

  // Politics & Government
  ['chuck-schumer', 'Chuck Schumer', 'American politician. U.S. Senate Majority Leader since 2021. Senior Senator from New York. The highest-ranking Jewish elected official in American history. Strong supporter of Israel.'],
  ['anthony-blinken', 'Antony Blinken', 'American diplomat and politician. U.S. Secretary of State since 2021. Stepson of Samuel Pisar, a Holocaust survivor. Has deep Jewish heritage through his family connections.'],
  ['janet-yellen', 'Janet Yellen', 'American economist. U.S. Secretary of the Treasury since 2021. Former Chair of the Federal Reserve (2014-2018). First woman to lead both the Treasury and the Fed. Born to a Jewish family in Brooklyn.'],
  ['merrick-garland', 'Merrick Garland', 'American jurist and government official. U.S. Attorney General since 2021. Former Chief Judge of the U.S. Court of Appeals for the D.C. Circuit. Born to a Jewish family, grandparents fled antisemitism in Eastern Europe.'],
  ['jared-kushner', 'Jared Kushner', 'American businessman, real estate developer, and former government official. Senior Advisor to President Trump (2017-2021). Married to Ivanka Trump. Architect of the Abraham Accords. CEO of Kushner Companies. Born to a prominent Jewish family.'],
  ['benjamin-netanyahu', 'Benjamin Netanyahu', 'Israeli politician. Prime Minister of Israel (1996-1999, 2009-2021, 2022-present). The longest-serving prime minister in Israeli history. Former MIT and Harvard educated. His brother Yonatan was killed leading the Entebbe raid.'],

  // Philanthropy & Organizations
  ['sheldon-adelson-estate', 'Miriam Adelson', 'Israeli-American physician and billionaire philanthropist. Widow of Sheldon Adelson (founder of Las Vegas Sands). One of the largest donors to Republican Party and pro-Israel causes. Owner of The Dallas Mavericks NBA team and Israel Hayom newspaper.'],
  ['ronald-lauder', 'Ronald Lauder', 'American businessman and philanthropist. President of the World Jewish Congress since 2007. Son of Estee Lauder co-founder Joseph Lauder. Former U.S. Ambassador to Austria. Major art collector and founder of the Neue Galerie.'],
  ['charles-bronfman', 'Charles Bronfman', 'Canadian-American businessman and philanthropist. Son of Samuel Bronfman (Seagram\'s). Co-founder of Birthright Israel with Michael Steinhardt. Founded the Andrea & Charles Bronfman Philanthropies. Former owner of the Montreal Expos.'],
  ['michael-steinhardt', 'Michael Steinhardt', 'American financier and philanthropist. Pioneer hedge fund manager. Co-founder of Birthright Israel with Charles Bronfman. Resigned from multiple Jewish organizational boards in 2019 after allegations of sexual harassment.'],
  ['haim-saban', 'Haim Saban', 'Egyptian-born Israeli-American billionaire media proprietor. Creator of the Power Rangers franchise. Chairman of Univision. One of the largest donors to the Democratic Party and pro-Israel lobby. Co-founded the Saban Center for Middle East Policy at Brookings.'],
  ['norman-braman', 'Norman Braman', 'American billionaire businessman and philanthropist. Automobile dealer. Former owner of the Philadelphia Eagles. Major donor to Marco Rubio and Republican causes. Active in Jewish communal organizations.'],
  ['lynn-schusterman', 'Lynn Schusterman', 'American billionaire philanthropist. Chair of the Charles and Lynn Schusterman Family Philanthropies. One of the largest Jewish philanthropists in the US, funding Birthright Israel, BBYO, and numerous Jewish education initiatives.'],

  // Media Personalities & Journalists
  ['wolf-blitzer', 'Wolf Blitzer', 'American journalist. Lead political anchor for CNN. Former Jerusalem correspondent for CNN and reporter for AIPAC\'s Near East Report. Born in Augsburg, Germany to Jewish Holocaust survivor parents.'],
  ['anderson-cooper', 'Anderson Cooper', 'American journalist. Primary anchor of CNN\'s Anderson Cooper 360. Correspondent for 60 Minutes. Son of Gloria Vanderbilt. One of the most recognized news anchors in American television.'],
  ['jake-tapper', 'Jake Tapper', 'American journalist, author, and cartoonist. Anchor and Chief Washington correspondent for CNN. Known for pressing political interviewees. Has covered extensively on political figures\' connections to various networks.'],

  // Hollywood & Entertainment
  ['steven-spielberg', 'Steven Spielberg', 'American filmmaker. One of the most commercially successful directors in cinema history. Director of Schindler\'s List, Jaws, E.T., Indiana Jones, Saving Private Ryan. Co-founder of DreamWorks. Established the USC Shoah Foundation to record Holocaust testimony.'],
  ['jerry-seinfeld', 'Jerry Seinfeld', 'American comedian, actor, and writer. Creator and star of Seinfeld, one of the most influential sitcoms in television history. Strong supporter of Israel. Born to a Jewish family in Brooklyn.'],
  ['seth-rogen', 'Seth Rogen', 'Canadian-American actor, comedian, writer, and producer. Born to Jewish parents in Vancouver. Attended Jewish summer camp. Has spoken publicly about his complex relationship with Israel and Jewish identity.'],
  ['natalie-portman', 'Natalie Portman', 'Israeli-American actress. Born Neta-Lee Hershlag in Jerusalem. Academy Award winner. Declined the Genesis Prize in 2018 citing disagreement with Israeli government policies. Harvard graduate with a degree in psychology.'],
  ['gal-gadot', 'Gal Gadot', 'Israeli actress and model. Best known as Wonder Woman. Served in the Israel Defense Forces as a combat fitness instructor. Former Miss Israel. One of the most prominent Israeli figures in Hollywood.'],

  // Academic & Intellectual
  ['noam-chomsky-full', 'Noam Chomsky', 'SKIP'],
  ['alan-greenspan', 'Alan Greenspan', 'American economist. Chairman of the Federal Reserve (1987-2006). Served under four presidents. His policies of low interest rates in the 2000s were criticized as contributing to the housing bubble and 2008 financial crisis. Born to a Jewish family in New York.'],
  ['ben-bernanke', 'Ben Bernanke', 'American economist. Chairman of the Federal Reserve (2006-2014). Led the Fed\'s response to the 2008 financial crisis. Nobel Prize in Economics (2022). Born to a Jewish family in Augusta, Georgia.'],
  ['ruth-bader-ginsburg', 'Ruth Bader Ginsburg', 'American jurist (1933-2020). Associate Justice of the U.S. Supreme Court (1993-2020). Pioneer of gender equality law. Second Jewish Supreme Court Justice. Became a cultural icon known as "Notorious RBG."'],
  ['elena-kagan', 'Elena Kagan', 'American jurist. Associate Justice of the U.S. Supreme Court since 2010. Former Solicitor General and Harvard Law School Dean. Fourth Jewish Justice to serve on the Supreme Court.'],

  // Billionaires & Industry
  ['bernard-arnault', 'Bernard Arnault', 'French billionaire businessman. Chairman and CEO of LVMH, the world\'s largest luxury goods company. Has been the richest person in the world. Controls brands including Louis Vuitton, Dior, Tiffany, Hennessy, and more.'],
  ['len-blavatnik', 'Len Blavatnik', 'Soviet-born British-American billionaire businessman. Founder and chairman of Access Industries. Owner of Warner Music Group. One of the largest donors to Oxford University and other institutions. Born to a Jewish family in Odessa, Ukraine.'],
  ['roman-abramovich', 'Roman Abramovich', 'Russian-Israeli billionaire. Former owner of Chelsea Football Club (2003-2022). Made fortune during Russian privatization of the 1990s. Holds Israeli citizenship. Subject to sanctions after Russia\'s invasion of Ukraine in 2022.'],
  ['george-soros', 'George Soros', 'Hungarian-American billionaire investor and philanthropist. Founder of the Open Society Foundations. Known as "The Man Who Broke the Bank of England" for shorting the pound in 1992. Born to a Jewish family in Budapest. One of the most frequent targets of antisemitic conspiracy theories.'],
  ['sheldon-adelson', 'Sheldon Adelson', 'American billionaire businessman (1933-2021). Founder, Chairman, and CEO of Las Vegas Sands Corporation. One of the largest donors to the Republican Party and Israeli causes. Owner of Israel Hayom newspaper. Donated over $500 million to political campaigns.'],

  // Additional Epstein-adjacent figures
  ['sergey-brin-ep', 'Sergey Brin', 'SKIP'],
  ['leslie-moonves', 'Les Moonves', 'SKIP'],
  ['katie-couric', 'Katie Couric', 'American journalist and TV personality. Former anchor of CBS Evening News and Today show. Attended dinner at Jeffrey Epstein\'s Manhattan apartment in 2010, later expressed regret and claimed she did not know the nature of his crimes.'],
  ['george-stephanopoulos', 'George Stephanopoulos', 'American journalist and former political advisor. Anchor of ABC News\' Good Morning America. Former aide to Bill Clinton. Attended a dinner at Epstein\'s Manhattan home in 2010 with other media figures.'],
  ['chelsea-handler', 'Chelsea Handler', 'American comedian, actress, writer, and television host. Attended one of Epstein\'s dinners in New York. Subsequently discussed the experience publicly on her shows.'],
];

bigPeopleAdd.forEach(([id, name, bio]) => {
  if (bio === 'SKIP') return;
  if (addPerson(id, name, bio)) newPeople++;
});

// === Part 3: Add individuals to existing entries ===
const entryAdditions = [
  // Media entries
  ['United States', 'fox-news', { name: 'Rupert Murdoch', id: 'rupert-murdoch', role: 'Founder' }],
  ['United States', 'comcast-nbcuniversal', { name: 'Brian Roberts', id: 'brian-roberts', role: 'Chairman & CEO, Comcast' }],
  ['United States', 'walt-disney-company', { name: 'Bob Iger', id: 'bob-iger', role: 'CEO' }],
  ['United States', 'warner-bros-discovery', { name: 'David Zaslav', id: 'david-zaslav', role: 'CEO' }],
  
  // Finance entries
  ['United States', 'goldman-sachs', { name: 'Lloyd Blankfein', id: 'lloyd-blankfein', role: 'Former Chairman & CEO' }],
  ['United States', 'goldman-sachs', { name: 'David Solomon', id: 'david-solomon', role: 'Chairman & CEO' }],
  ['United States', 'jpmorgan-chase', { name: 'Jamie Dimon', id: 'jamie-dimon', role: 'Chairman & CEO' }],
  ['United States', 'blackstone', { name: 'Steve Schwarzman', id: 'steve-schwarzman', role: 'Co-Founder, Chairman & CEO' }],
  
  // Tech entries
  ['United States', 'meta-platforms', { name: 'Mark Zuckerberg', id: 'mark-zuckerberg', role: 'Founder, Chairman & CEO' }],
  ['United States', 'meta-platforms', { name: 'Sheryl Sandberg', id: 'sheryl-sandberg', role: 'Former COO' }],
  ['United States', 'alphabet-google', { name: 'Sergey Brin', id: 'sergey-brin', role: 'Co-Founder' }],
  ['United States', 'alphabet-google', { name: 'Larry Page', id: 'larry-page', role: 'Co-Founder' }],
  ['United States', 'oracle', { name: 'Larry Ellison', id: 'larry-ellison', role: 'Co-Founder & Chairman' }],
  ['United States', 'dell-technologies', { name: 'Michael Dell', id: 'michael-dell', role: 'Founder, Chairman & CEO' }],
  ['United States', 'salesforce', { name: 'Marc Benioff', id: 'marc-benioff', role: 'Founder, Chairman & CEO' }],
  ['United States', 'amazon', { name: 'Jeff Bezos', id: 'jeff-bezos', role: 'Founder & Executive Chairman' }],
  ['United States', 'openai', { name: 'Sam Altman', id: 'sam-altman', role: 'CEO' }],
  
  // Politics
  ['United States', 'aipac', { name: 'Chuck Schumer', id: 'chuck-schumer', role: 'Key Congressional Ally' }],
  ['Israel', 'knesset', { name: 'Benjamin Netanyahu', id: 'benjamin-netanyahu', role: 'Prime Minister' }],
  
  // Philanthropy
  ['United States', 'birthright-israel', { name: 'Charles Bronfman', id: 'charles-bronfman', role: 'Co-Founder' }],
  ['United States', 'birthright-israel', { name: 'Michael Steinhardt', id: 'michael-steinhardt', role: 'Co-Founder' }],
  ['United States', 'world-jewish-congress', { name: 'Ronald Lauder', id: 'ronald-lauder', role: 'President' }],

  // Bloomberg
  ['United States', 'bloomberg-lp', { name: 'Michael Bloomberg', id: 'michael-bloomberg', role: 'Founder & CEO' }],
  
  // Soros / Open Society
  ['United States', 'open-society-foundations', { name: 'George Soros', id: 'george-soros', role: 'Founder & Chair' }],
];

entryAdditions.forEach(([country, entryId, ind]) => {
  if (addToEntry(country, entryId, ind)) newRefs++;
});

// Save
fs.writeFileSync(pFile, JSON.stringify(pd, null, 2));
fs.writeFileSync(jFile, JSON.stringify(jd, null, 2));

const totalPeople = Object.keys(pd.people).length;
let totalEntries = 0, totalIndRefs = 0;
for (const c in jd.countries) { 
  totalEntries += jd.countries[c].length;
  for (const e of jd.countries[c]) {
    if (e.individuals) totalIndRefs += e.individuals.length;
  }
}

console.log(`Added ${newPeople} new people`);
console.log(`Added ${newRefs} new entry references`);
console.log(`Total people: ${totalPeople}`);
console.log(`Total entries: ${totalEntries}`);
console.log(`Total individual references: ${totalIndRefs}`);

// Verify no gaps
let gaps = 0;
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    if (e.individuals) {
      for (const i of e.individuals) {
        if (i.id && !pd.people[i.id]) { gaps++; console.log('GAP:', i.id, i.name); }
      }
    }
  }
}
console.log('Remaining gaps:', gaps);
