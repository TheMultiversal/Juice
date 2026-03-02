#!/usr/bin/env node
/**
 * expand-entries-batch3.js - Third batch: add individuals to major entries that still only have 2
 */
const fs = require('fs');
const path = require('path');

const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');

const jd = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const pd = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));

let changes = 0;

function findEntry(id) {
  for (const c in jd.countries) {
    for (const e of jd.countries[c]) {
      if (e.id === id) { e._country = c; return e; }
    }
  }
  return null;
}

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function addInd(entryId, name, role, bio) {
  const entry = findEntry(entryId);
  if (!entry) { console.log('  MISS:', entryId); return; }
  if (!entry.individuals) entry.individuals = [];
  if (entry.individuals.some(i => i.name.toLowerCase() === name.toLowerCase())) return;
  const id = slug(name);
  entry.individuals.push({ id, name, role, bio });
  if (!pd.people[id]) {
    pd.people[id] = { name, bio: bio || '', notes: '',
      affiliations: [{ organization: entry.name, role, entryId: entry.id, country: entry._country || '' }]
    };
  } else {
    const affs = pd.people[id].affiliations || [];
    if (!affs.some(a => a.entryId === entry.id)) {
      affs.push({ organization: entry.name, role, entryId: entry.id, country: entry._country || '' });
    }
  }
  changes++;
}

function addConn(entryId, name, type, description, linkedId) {
  const entry = findEntry(entryId);
  if (!entry) return;
  if (!entry.connections) entry.connections = [];
  if (entry.connections.some(c => (c.name||c.target||'').toLowerCase() === name.toLowerCase())) return;
  const conn = { name, type, description };
  if (linkedId) conn.entryId = linkedId;
  entry.connections.push(conn);
  changes++;
}

// ═════ TECH ═════

// Google / Alphabet
addInd('google-alphabet-inc', 'Sergey Brin', 'Co-founder & President of Alphabet', 'Co-founded Google with Larry Page in 1998 at Stanford. Born in Moscow to Jewish parents who emigrated from the Soviet Union.');
addInd('google-alphabet-inc', 'Ruth Porat', 'President & CIO of Alphabet', 'Former CFO of Morgan Stanley. Joined Google as CFO in 2015, promoted to President & CIO of Alphabet in 2023.');
addInd('google-alphabet-inc', 'Susan Wojcicki', 'Former CEO of YouTube (deceased)', 'Google\'s 16th employee and former CEO of YouTube (2014-2023). Google\'s first headquarters was in her garage. Died in 2024.');

// OpenAI
addInd('openai', 'Greg Brockman', 'Co-founder & Former President', 'Co-founded OpenAI with Sam Altman. Former CTO of Stripe. Briefly departed during Nov 2023 board crisis.');
addInd('openai', 'Ilya Sutskever', 'Co-founder & Former Chief Scientist', 'Israeli-Canadian AI researcher. Key architect of GPT models. Departed in 2024 to found Safe Superintelligence Inc.');

// Anthropic
addInd('anthropic', 'Dario Amodei', 'Co-founder & CEO', 'Former VP of Research at OpenAI. Co-founded Anthropic in 2021 with focus on AI safety.');
addInd('anthropic', 'Daniela Amodei', 'Co-founder & President', 'Former VP of Operations at OpenAI. Co-founded Anthropic with her brother Dario.');

// Palantir Technologies
addInd('palantir-technologies', 'Alex Karp', 'Co-founder & CEO', 'CEO of Palantir since its founding. Holds a PhD from Frankfurt. Known for his unconventional leadership style.');
addInd('palantir-technologies', 'Joe Lonsdale', 'Co-founder', 'Co-founded Palantir and later founded 8VC venture capital and Addepar.');

// PayPal
addInd('paypal', 'Max Levchin', 'Co-founder', 'Ukrainian-born technologist who co-founded PayPal with Peter Thiel. Later founded Affirm.');
addInd('paypal', 'David Sacks', 'Former COO', 'Early PayPal executive ("PayPal Mafia"). Later founded Yammer and became a prominent tech investor and political commentator.');

// Qualcomm
addInd('qualcomm', 'Irwin Jacobs', 'Co-founder', 'Co-founded Qualcomm in 1985. Pioneered CDMA wireless technology. Major San Diego philanthropist.');
addInd('qualcomm', 'Andrew Viterbi', 'Co-founder', 'Italian-born American engineer who co-founded Qualcomm. Invented the Viterbi algorithm.');

// Broadcom
addInd('broadcom', 'Hock Tan', 'CEO', 'CEO since 2006 (then Avago). Engineered the $69B acquisition of VMware in 2023. Born in Malaysia.');
addInd('broadcom', 'Henry Samueli', 'Co-founder & CTO', 'Co-founded Broadcom in 1991. Also co-owner of the Anaheim Ducks NHL team.');

// Andreessen Horowitz
addInd('andreessen-horowitz-a16z', 'Ben Horowitz', 'Co-founder & General Partner', 'Co-founded a16z in 2009. Author of "The Hard Thing About Hard Things." Former CEO of Opsware.');
addInd('andreessen-horowitz-a16z', 'Marc Andreessen', 'Co-founder & General Partner', 'Created Mosaic and co-founded Netscape. One of the most influential VC investors in Silicon Valley.');

// Moderna
addInd('moderna', 'Stephane Bancel', 'CEO', 'CEO of Moderna since 2011. French businessman who led the development of the Moderna COVID-19 vaccine.');
addInd('moderna', 'Noubar Afeyan', 'Co-founder & Chairman', 'Armenian-American entrepreneur who co-founded Moderna. Also founder of Flagship Pioneering.');

// DreamWorks Animation
addInd('dreamworks-animation', 'David Geffen', 'Co-founder of DreamWorks SKG', 'Co-founded DreamWorks with Spielberg and Katzenberg. Record executive and entertainment mogul. One of the richest people in entertainment.');
addInd('dreamworks-animation', 'Jeffrey Katzenberg', 'Co-founder of DreamWorks SKG', 'Former Walt Disney Studios chairman who co-founded DreamWorks. Led DreamWorks Animation which produced Shrek, Madagascar, Kung Fu Panda.');

// ═════ FINANCE ═════

// Apollo Global Management
addInd('apollo-global-management', 'Marc Rowan', 'CEO', 'CEO of Apollo since 2021. Co-founder of the firm. Major Wharton donor.');
addInd('apollo-global-management', 'Josh Harris', 'Co-founder', 'Co-founded Apollo. Owner of the Washington Commanders, Philadelphia 76ers, and New Jersey Devils.');

// Warburg Pincus
addInd('warburg-pincus', 'Charles Kaye', 'Co-CEO', 'Co-CEO of Warburg Pincus. Leads the firm\'s global investment strategy.');
addInd('warburg-pincus', 'Jeffrey Perlman', 'Co-CEO', 'Co-CEO of Warburg Pincus. Previously led the firm\'s Southeast Asia operations.');

// Berkshire Hathaway
addInd('berkshire-hathaway-via-subsidiaries', 'Warren Buffett', 'Chairman & CEO', 'CEO of Berkshire Hathaway since 1965. "The Oracle of Omaha." One of the wealthiest people in history.');
addInd('berkshire-hathaway-via-subsidiaries', 'Greg Abel', 'Vice Chairman (Non-Insurance)', 'Designated successor to Buffett as CEO. Oversees Berkshire\'s non-insurance businesses.');

// Bear Stearns
addInd('bear-stearns-historic', 'Alan Schwartz', 'Last CEO', 'CEO of Bear Stearns during its 2008 collapse. Oversaw the forced sale to JPMorgan Chase.');
addInd('bear-stearns-historic', 'Jimmy Cayne', 'Former CEO & Chairman', 'CEO 1993-2008. Controversial figure who was playing bridge when the firm collapsed. Lost ~$1 billion in Bear Stearns stock.');

// Wachtell Lipton
addInd('wachtell-lipton-rosen-katz', 'Martin Lipton', 'Founding Partner', 'Co-founded Wachtell Lipton in 1965. Invented the "poison pill" anti-takeover defense that transformed corporate law.');
addInd('wachtell-lipton-rosen-katz', 'Herbert Wachtell', 'Founding Partner', 'Co-founded the firm. One of America\'s top trial lawyers, known for high-stakes corporate litigation.');
addInd('wachtell-lipton-rosen-katz', 'Edward Herlihy', 'Partner & Co-Chairman', 'Advised on more M&A transactions than any other lawyer. Key advisor in the 2008 financial crisis bank mergers.');

// ═════ MEDIA / ENTERTAINMENT ═════

// Paramount Global
addInd('paramount-global', 'Bob Bakish', 'Former CEO', 'Former CEO of Paramount Global (2019-2024). Led the ViacomCBS rebranding to Paramount Global.');
addInd('paramount-global', 'David Ellison', 'Incoming CEO (via Skydance)', 'Son of Larry Ellison (Oracle). His Skydance Media merged with Paramount in 2024.');

// Random House
addInd('random-house', 'Markus Dohle', 'Former CEO', 'German-born former CEO of Penguin Random House. Oversaw its growth into the world\'s largest book publisher.');
addInd('random-house', 'Peter Olson', 'Former CEO', 'CEO of Random House 1998-2008. Oversaw the era before the Penguin merger.');

// Warner Music Group
addInd('warner-music-group', 'Len Blavatnik', 'Owner', 'Soviet-born American billionaire who acquired Warner Music Group in 2011 for $3.3B through Access Industries.');
addInd('warner-music-group', 'Robert Kyncl', 'CEO', 'CEO since 2023. Former YouTube Chief Business Officer.');

// Commentary Magazine
addInd('commentary-magazine', 'John Podhoretz', 'Editor', 'Editor of Commentary since 2009. Son of former editor Norman Podhoretz. Prominent neoconservative intellectual.');
addInd('commentary-magazine', 'Norman Podhoretz', 'Editor Emeritus', 'Editor of Commentary 1960-1995. One of the founding voices of neoconservatism. Authored "Making It" and "Breaking Ranks."');

// The Forward
addInd('the-forward', 'Jodi Rudoren', 'Editor-in-Chief', 'Editor-in-Chief of the Forward since 2019. Former New York Times Jerusalem bureau chief.');
addInd('the-forward', 'Rachel Fishman Feddersen', 'Publisher & CEO', 'CEO and publisher of the Forward. Led the paper\'s transition to a nonprofit model.');

// The Jewish Daily Forward (Yiddish)
addInd('the-jewish-daily-forward-yiddish-forverts', 'Abraham Cahan', 'Founding Editor', 'Founded the Yiddish Forverts in 1897. Edited it for nearly 50 years. Also wrote "The Rise of David Levinsky."');

// Marvel Entertainment Legacy
addInd('marvel-entertainment-legacy', 'Stan Lee', 'Co-creator & Chairman Emeritus (deceased)', 'Born Stanley Martin Lieber. Co-created Spider-Man, X-Men, Fantastic Four, Iron Man, Thor, Hulk, and many more. The most influential comic book creator in history.');
addInd('marvel-entertainment-legacy', 'Jack Kirby', 'Co-creator (deceased)', 'Born Jacob Kurtzberg. Co-created the Fantastic Four, X-Men, Captain America, and the entire Marvel cosmic universe with Stan Lee.');

// ═════ REAL ESTATE ═════

// Rudin Management
addInd('rudin-management', 'William Rudin', 'Co-Chairman & CEO', 'Third-generation leader of Rudin Management. Major NYC real estate dynasty.');
addInd('rudin-management', 'Eric Rudin', 'Co-Chairman', 'Co-Chairman of Rudin Management. Oversees the family\'s portfolio of NYC office and residential buildings.');

// Zeckendorf Development
addInd('zeckendorf-development', 'William Zeckendorf Jr.', 'Co-Chairman', 'Third-generation NYC real estate developer. His grandfather William Zeckendorf Sr. built the UN complex site.');
addInd('zeckendorf-development', 'Arthur Zeckendorf', 'Co-Chairman', 'Brother of William Jr. Together they developed 520 Park Avenue, the tallest residential tower on Park Avenue.');

// Brookfield Properties
addInd('brookfield-properties', 'Ben Brown', 'CEO', 'CEO of Brookfield Properties. Oversees one of the world\'s largest real estate portfolios.');
addInd('brookfield-properties', 'Brian Kingston', 'Former CEO', 'Former CEO of Brookfield Properties. Now leads Brookfield\'s real estate group globally.');

// Kushner Companies
addInd('kushner-companies', 'Charles Kushner', 'Founder & Chairman', 'Founded Kushner Companies. Was pardoned by President Trump in 2020 after a 2005 tax fraud conviction.');
addInd('kushner-companies', 'Jared Kushner', 'Former CEO & White House Senior Advisor', 'CEO of Kushner Companies who served as White House Senior Advisor to father-in-law President Trump (2017-2021).');

// ═════ SPORTS ═════

// Dallas Mavericks
addInd('dallas-mavericks', 'Mark Cuban', 'Former Owner', 'Jewish entrepreneur who owned the Dallas Mavericks from 2000-2024. Sold majority stake to Miriam Adelson and the Adelson family.');
addInd('dallas-mavericks', 'Miriam Adelson', 'Majority Owner', 'Israeli-American physician and widow of Sheldon Adelson. Purchased the Dallas Mavericks in 2024.');

// Los Angeles Clippers
addInd('los-angeles-clippers', 'Steve Ballmer', 'Owner', 'Former Microsoft CEO who purchased the Clippers for $2B in 2014 after the Donald Sterling scandal.');

// Philadelphia 76ers
addInd('philadelphia-76ers', 'Josh Harris', 'Former Owner', 'Apollo Global Management co-founder who owned the 76ers before selling to buy the Washington Commanders.');
addInd('philadelphia-76ers', 'David Blitzer', 'Former Co-owner', 'Co-owner alongside Harris. Also co-owns Crystal Palace FC and other sports teams globally.');

// Golden State Warriors
addInd('golden-state-warriors', 'Joe Lacob', 'Owner & Governor', 'Purchased the Warriors for $450M in 2010. Under his ownership, the team won 4 NBA championships.');
addInd('golden-state-warriors', 'Peter Guber', 'Co-owner', 'Hollywood producer (Batman, Rain Man) and co-owner of the Warriors. Also co-owns the Los Angeles Dodgers.');

// Miami Dolphins
addInd('miami-dolphins', 'Stephen Ross', 'Owner', 'Chairman & owner of the Miami Dolphins and Hard Rock Stadium. Also chairman of Related Companies, one of NYC\'s largest real estate firms.');
addInd('miami-dolphins', 'Bruce Beal', 'Vice Chairman', 'Vice Chairman of the Miami Dolphins. President of Related Companies.');

// ═════ JEWISH ORGANIZATIONS ═════

// Chabad-Lubavitch
addInd('chabad-lubavitch', 'Rabbi Menachem Mendel Schneerson', 'The Rebbe (deceased)', 'The seventh and last Lubavitcher Rebbe (1902-1994). Transformed Chabad into a worldwide movement with over 5,000 emissary families in 100+ countries. Posthumously awarded the Congressional Gold Medal.');
addInd('chabad-lubavitch', 'Rabbi Yehuda Krinsky', 'Chairman', 'Chairman of Chabad-Lubavitch educational and social service arms. Personal secretary to the Rebbe for over 40 years.');

// B\'nai B\'rith International
addInd('b-nai-b-rith-international', 'Seth Riklin', 'President', 'President of B\'nai B\'rith International. Leads the oldest Jewish service organization in the world (founded 1843).');
addInd('b-nai-b-rith-international', 'Daniel Mariaschin', 'CEO', 'CEO and Executive VP of B\'nai B\'rith International. Veteran Jewish organizational leader.');

// Hadassah
addInd('hadassah-the-women-s-zionist-organization-of-america', 'Rhoda Smolow', 'National President', 'National President of Hadassah, the largest Jewish women\'s organization in the US with 300,000 members.');
addInd('hadassah-the-women-s-zionist-organization-of-america', 'Janice Weinman', 'Executive Director', 'Executive Director/CEO of Hadassah. Oversees operations of the 300,000-member organization.');

// Jewish Federations of North America (both entries)
addInd('the-jewish-federations-of-north-america', 'Eric Fingerhut', 'CEO', 'CEO of JFNA since 2019. Former US Congressman and Ohio state senator.');
addInd('the-jewish-federations-of-north-america', 'Mark Wilf', 'Board Chair', 'Board Chair of JFNA. Also co-owner of the Minnesota Vikings NFL team.');
addInd('jewish-federations-of-north-america-jfna', 'Eric Fingerhut', 'CEO', 'CEO of JFNA since 2019. Former US Congressman and Ohio state senator.');

// Republican Jewish Coalition  
addInd('republican-jewish-coalition', 'Matt Brooks', 'Executive Director', 'Long-serving executive director of the RJC. One of the most influential Jewish Republican political operatives.');
addInd('republican-jewish-coalition', 'Norm Coleman', 'Chairman', 'Former US Senator from Minnesota and Chairman of the RJC.');

// National Council of Jewish Women
addInd('national-council-of-jewish-women-ncjw', 'Sheila Katz', 'CEO', 'CEO of NCJW. Leads the organization\'s advocacy on reproductive rights, voting rights, and social justice.');

// Orthodox Union
addInd('orthodox-union-ou', 'Rabbi Moshe Hauer', 'Executive Vice President', 'EVP of the Orthodox Union. Leads the largest Orthodox Jewish organization in the US.');
addInd('orthodox-union-ou', 'Mitchell Aeder', 'President', 'President of the Orthodox Union. Leads the OU\'s board and governance.');

// Jewish Theological Seminary
addInd('jewish-theological-seminary', 'Shuly Rubin Schwartz', 'Chancellor', 'First woman to lead JTS as Chancellor (2020). Leading scholar of American Jewish history.');
addInd('jewish-theological-seminary', 'Arnold Eisen', 'Chancellor Emeritus', 'Chancellor of JTS 2007-2020. Leading scholar of contemporary Judaism and Jewish thought.');

// Reconstructing Judaism
addInd('reconstructing-judaism', 'Deborah Waxman', 'President', 'First woman and first lesbian to head a Jewish congregational union and rabbinical seminary.');
addInd('reconstructing-judaism', 'Mordecai Kaplan', 'Founder (deceased)', 'Founded Reconstructionist Judaism. Authored "Judaism as a Civilization" (1934). Reconceived Judaism as an evolving religious civilization.');

// Rabbinical Assembly
addInd('rabbinical-assembly', 'Jacob Blumenthal', 'CEO', 'CEO of the Rabbinical Assembly, the international association of Conservative/Masorti rabbis.');

// Simon Wiesenthal Center
addInd('simon-wiesenthal-center', 'Rabbi Marvin Hier', 'Founder & Dean', 'Founded the Simon Wiesenthal Center in 1977. Won two Academy Awards for documentaries on the Holocaust.');
addInd('simon-wiesenthal-center', 'Rabbi Abraham Cooper', 'Associate Dean & Director of Global Social Action', 'Long-serving associate dean. Leads the Center\'s efforts against antisemitism and hate.');

// Bronfman Philanthropies
addInd('bronfman-philanthropies', 'Charles Bronfman', 'Co-founder', 'Co-founded Bronfman Philanthropies. Former co-chairman of Seagram. Founded Birthright Israel.');
addInd('bronfman-philanthropies', 'Edgar Bronfman Sr.', 'Co-founder (deceased)', 'Former president of the World Jewish Congress. CEO of Seagram Company. Major Jewish philanthropist.');

// Avi Chai Foundation
addInd('avi-chai-foundation', 'Zalman Bernstein', 'Founder (deceased)', 'Founded the Avi Chai Foundation. Wall Street financier who became Orthodox and dedicated his fortune to Jewish education.');

// Schusterman Family Philanthropies  
addInd('charles-and-lynn-schusterman-family-philanthropies', 'Stacy Schusterman', 'Chair', 'Chair of the Schusterman Family Philanthropies. Daughter of Charles Schusterman. Based in Tulsa, Oklahoma.');

// Las Vegas Sands
addInd('las-vegas-sands-corp', 'Sheldon Adelson', 'Founder (deceased)', 'Founded Las Vegas Sands and built The Venetian. Was the richest Jewish person in the world. Major Republican donor who gave over $500M to candidates.');
addInd('las-vegas-sands-corp', 'Robert Goldstein', 'CEO', 'CEO of Las Vegas Sands since 2021 following Sheldon Adelson\'s death. Led the $6.25B sale of the Las Vegas properties.');

// Washington Institute for Near East Policy (WINEP)
addInd('washington-institute-for-near-east-policy-winep', 'Robert Satloff', 'Executive Director', 'Executive Director of WINEP since 1993. Leading expert on US Middle East policy.');

// Estee Lauder Companies
addInd('est-e-lauder-companies', 'William Lauder', 'Executive Chairman', 'Grandson of Estee Lauder. Executive Chairman of The Estee Lauder Companies.');
addInd('est-e-lauder-companies', 'Fabrizio Freda', 'CEO', 'CEO of Estee Lauder Companies since 2009. Led the company\'s digital and Asian expansion.');

// Neiman Marcus
addInd('neiman-marcus', 'Geoffroy van Raemdonck', 'CEO', 'CEO of Neiman Marcus Group since 2018. Led the company through its 2020 bankruptcy and restructuring.');

// Macy\'s
addInd('macy-s-federated-department-stores', 'Tony Spring', 'CEO', 'CEO of Macy\'s Inc. since 2024. Former chairman of Bloomingdale\'s.');
addInd('macy-s-federated-department-stores', 'Jeff Gennette', 'Former CEO', 'CEO of Macy\'s 2017-2024. Oversaw the Polaris turnaround strategy.');

// Bed Bath & Beyond
addInd('bed-bath-beyond', 'Leonard Feinstein', 'Co-founder', 'Co-founded Bed Bath & Beyond in 1971. Built it into a $12 billion retail empire before the company\'s 2023 bankruptcy.');
addInd('bed-bath-beyond', 'Warren Eisenberg', 'Co-founder', 'Co-founded Bed Bath & Beyond with Leonard Feinstein. The two grew up together in the Bronx.');

// ═════ EDUCATION ═════

// Brandeis University
addInd('brandeis-university', 'Ronald Liebowitz', 'President', 'President of Brandeis University since 2016. The only non-sectarian Jewish-sponsored college in the US.');
addInd('brandeis-university', 'Abram Sachar', 'Founding President (deceased)', 'Founding president of Brandeis University (1948-1968). Named the school after Louis Brandeis.');

// Hebrew Union College - Jewish Institute of Religion
addInd('hebrew-union-college-jewish-institute-of-religion', 'David Ellenson', 'Former President (deceased)', 'President of HUC-JIR 2001-2013. Leading scholar of modern Jewish thought and law.');

// ═════ Write ═════

fs.writeFileSync(JD_PATH, JSON.stringify(jd, null, 2), 'utf8');
fs.writeFileSync(PD_PATH, JSON.stringify(pd, null, 2), 'utf8');

let total = 0;
for (const c in jd.countries) total += jd.countries[c].length;
console.log(`Done! ${changes} changes. Entries: ${total}, People: ${Object.keys(pd.people).length}`);
