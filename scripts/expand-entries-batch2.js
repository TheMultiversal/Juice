#!/usr/bin/env node
/**
 * expand-entries-batch2.js - Major second batch expansion of sparse entries
 * Focuses on well-known organizations with <=2 individuals or <=1 connection
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

// ═══════════════════════════════════════════════════════════════════════════
// MEDIA / ENTERTAINMENT
// ═══════════════════════════════════════════════════════════════════════════

// New York Times
addInd('new-york-times', 'Meredith Kopit Levien', 'CEO & President', 'CEO of The New York Times Company since 2020. Led the digital subscription transformation.');
addInd('new-york-times', 'A.G. Sulzberger', 'Publisher & Chairman', 'Fifth-generation publisher of The New York Times from the Ochs-Sulzberger family.');
addInd('new-york-times', 'Dean Baquet', 'Former Executive Editor', 'Executive Editor 2014-2022. First African-American to hold the role.');
addConn('new-york-times', 'Wirecutter', 'subsidiary', 'Product review website acquired by NYT in 2016 for ~$30M.');
addConn('new-york-times', 'The Athletic', 'subsidiary', 'Sports media company acquired by NYT in 2022 for $550M.');

// Miramax Films
addInd('miramax-films', 'Bob Weinstein', 'Co-founder', 'Co-founded Miramax with brother Harvey in 1979. Named after parents Miriam and Max.');
addConn('miramax-films', 'Disney', 'former-parent', 'Disney acquired Miramax in 1993 for ~$80M. The Weinsteins departed in 2005.');
addConn('miramax-films', 'Pulp Fiction', 'notable-production', 'Miramax distributed Quentin Tarantino\'s Pulp Fiction (1994), grossing $213M worldwide.');

// National Amusements
addInd('national-amusements', 'Shari Redstone', 'Chair & President', 'Daughter of Sumner Redstone who controls Paramount Global and its media empire through National Amusements.');
addConn('national-amusements', 'Paramount Global', 'controlled-entity', 'National Amusements is the controlling shareholder of Paramount Global (CBS, Paramount Pictures, MTV, etc.).');
addConn('national-amusements', 'Skydance Media', 'merger', 'In 2024, Shari Redstone agreed to merge Paramount with David Ellison\'s Skydance Media.');

// News Corp
addInd('news-corp', 'Robert Thomson', 'CEO', 'CEO of News Corp since 2013. Former editor of The Wall Street Journal and The Times of London.');
addInd('news-corp', 'Lachlan Murdoch', 'Co-Chairman', 'Son of Rupert Murdoch and co-chairman of News Corp and executive chairman of Fox Corporation.');
addConn('news-corp', 'Dow Jones', 'subsidiary', 'News Corp owns Dow Jones & Company, publisher of The Wall Street Journal.');
addConn('news-corp', 'HarperCollins', 'subsidiary', 'News Corp owns HarperCollins Publishers, one of the Big Five English-language publishers.');

// Ticketmaster
addInd('ticketmaster', 'Michael Rapino', 'CEO of Live Nation Entertainment', 'CEO of Live Nation (Ticketmaster parent) since 2005. Built Live Nation into the world\'s largest live entertainment company.');
addConn('ticketmaster', 'Live Nation', 'parent-company', 'Live Nation and Ticketmaster merged in 2010, creating a vertically integrated live entertainment monopoly.');
addConn('ticketmaster', 'DOJ Antitrust Lawsuit', 'legal', 'The DOJ filed an antitrust lawsuit against Live Nation-Ticketmaster in 2024 seeking to break up the company.');

// Advance Publications
addInd('advance-publications', 'Steven Newhouse', 'Co-President', 'Co-president alongside cousin. Oversees Advance\'s media and technology investments.');
addConn('advance-publications', 'Reddit', 'major-investment', 'Advance Publications was the largest institutional shareholder of Reddit prior to its 2024 IPO.');
addConn('advance-publications', 'Conde Nast', 'subsidiary', 'Advance Publications owns Conde Nast (Vogue, The New Yorker, Wired, Vanity Fair, GQ).');

// ═══════════════════════════════════════════════════════════════════════════
// FINANCE / INVESTMENT
// ═══════════════════════════════════════════════════════════════════════════

// KKR
addInd('kkr-kohlberg-kravis-roberts', 'Henry Kravis', 'Co-founder & Co-Executive Chairman', 'Co-founded KKR in 1976. Led the landmark $25B leveraged buyout of RJR Nabisco in 1988.');
addInd('kkr-kohlberg-kravis-roberts', 'George Roberts', 'Co-founder & Co-Executive Chairman', 'Cousin of Henry Kravis and co-founder of KKR. Major philanthropist.');
addInd('kkr-kohlberg-kravis-roberts', 'Scott Nuttall', 'Co-CEO', 'Co-CEO of KKR alongside Joe Bae since 2021.');
addConn('kkr-kohlberg-kravis-roberts', 'RJR Nabisco LBO', 'historic-deal', 'KKR\'s $25 billion buyout of RJR Nabisco in 1988 was the largest leveraged buyout in history at the time.');

// Two Sigma
addInd('two-sigma', 'John Overdeck', 'Co-Chairman & Co-founder', 'Co-founded Two Sigma in 2001. Former D.E. Shaw and Amazon employee. Major education philanthropist.');
addInd('two-sigma', 'David Siegel', 'Co-Chairman & Co-founder', 'Co-founded Two Sigma. Former D.E. Shaw technologist. Pioneer in applying machine learning to finance.');
addConn('two-sigma', 'Venn by Two Sigma', 'product', 'Two Sigma\'s free analytics platform for investment portfolios.');

// Evercore
addInd('evercore', 'Roger Altman', 'Founder & Senior Chairman', 'Founded Evercore in 1995. Former Deputy Treasury Secretary under Clinton.');
addInd('evercore', 'John Weinberg', 'CEO', 'CEO of Evercore since 2016. Former Goldman Sachs partner. Son of John L. Weinberg.');
addConn('evercore', 'US Treasury Department', 'government-connection', 'Roger Altman served as Deputy Treasury Secretary and has remained an influential Democratic economic advisor.');

// Cohen & Steers
addInd('cohen-steers', 'Robert Steers', 'Co-Chairman & Co-CEO', 'Co-founded Cohen & Steers in 1986. Pioneer of listed real estate securities investing.');
addConn('cohen-steers', 'Real Estate Securities', 'market-leadership', 'First US investment firm dedicated to listed real estate securities. Over $80B in AUM.');

// Leucadia National
addInd('leucadia-national', 'Rich Handler', 'CEO of Jefferies', 'CEO of Jefferies Financial Group (formerly Leucadia) since 2001.');
addConn('leucadia-national', 'Jefferies Financial Group', 'rebranding', 'Leucadia National merged with Jefferies in 2012 and was renamed Jefferies Financial Group in 2018.');

// Cascade Investment
addInd('cascade-investment', 'Michael Larson', 'CIO', 'Chief Investment Officer of Cascade since 1994. Manages Bill Gates\' personal fortune.');
addConn('cascade-investment', 'Four Seasons Hotels', 'major-holding', 'Cascade owns a controlling stake in Four Seasons Hotels and Resorts.');

// Brookfield Corporation
addInd('brookfield-corporation', 'Bruce Flatt', 'CEO', 'CEO of Brookfield since 2002. Called "Canada\'s Warren Buffett" for his value investing approach.');
addInd('brookfield-corporation', 'Sachin Shah', 'CEO of Brookfield Reinsurance', 'Leads Brookfield\'s insurance solutions business.');
addConn('brookfield-corporation', 'Oaktree Capital Management', 'subsidiary', 'Brookfield acquired a majority stake in Howard Marks\' Oaktree Capital in 2019.');

// ═══════════════════════════════════════════════════════════════════════════
// TECHNOLOGY
// ═══════════════════════════════════════════════════════════════════════════

// Zillow Group
addInd('zillow-group', 'Rich Barton', 'Co-founder & CEO', 'Co-founded Zillow in 2006. Also founded Expedia and co-founded Glassdoor.');
addInd('zillow-group', 'Lloyd Frink', 'Co-founder & Executive Chairman', 'Co-founded Zillow. Former VP of Engineering at Expedia.');
addConn('zillow-group', 'Trulia', 'acquisition', 'Zillow acquired competing real estate platform Trulia in 2015 for $3.5B.');

// Warby Parker
addInd('warby-parker', 'Neil Blumenthal', 'Co-founder & Co-CEO', 'Co-founded Warby Parker in 2010 while at Wharton. Pioneered direct-to-consumer eyewear.');
addInd('warby-parker', 'Dave Gilboa', 'Co-founder & Co-CEO', 'Co-founded Warby Parker. Named to Fortune 40 Under 40.');
addConn('warby-parker', 'VisionSpring', 'social-impact', 'For every pair of glasses sold, Warby Parker distributes a pair to someone in need through VisionSpring.');

// BlaBlaCar
addInd('blablacar', 'Nicolas Brusson', 'Co-founder & CEO', 'Co-founded BlaBlaCar and serves as CEO. Led expansion across Europe and beyond.');
addConn('blablacar', 'European Expansion', 'operations', 'BlaBlaCar operates in 22 countries with over 100 million members worldwide.');

// BioNTech
addInd('biontech', 'Ugur Sahin', 'Co-founder & CEO', 'Turkish-German physician who co-founded BioNTech. Developed the Pfizer-BioNTech COVID vaccine.');
addInd('biontech', 'Ozlem Tureci', 'Co-founder & CMO', 'Co-founded BioNTech with husband Ugur Sahin. Chief Medical Officer.');
addConn('biontech', 'Pfizer', 'partnership', 'BioNTech partnered with Pfizer to produce the first authorized COVID-19 mRNA vaccine.', 'pfizer-inc');

// Infosys
addInd('infosys', 'Salil Parekh', 'CEO', 'CEO of Infosys since 2018. Led the company\'s digital transformation strategy.');
addConn('infosys', 'Israel Development Center', 'operations', 'Infosys opened an innovation hub in Israel to tap into the country\'s tech ecosystem.');

// ═══════════════════════════════════════════════════════════════════════════
// CONSUMER / RETAIL / FOOD
// ═══════════════════════════════════════════════════════════════════════════

// Kraft Heinz
addInd('kraft-heinz-company', 'Carlos Abrams-Rivera', 'CEO', 'CEO of Kraft Heinz since 2024. Former leader of the North American business.');
addInd('kraft-heinz-company', 'Alex Behring', 'Chairman', 'Chairman of Kraft Heinz. Managing Partner at 3G Capital, which engineered the Kraft-Heinz merger.');
addConn('kraft-heinz-company', '3G Capital', 'major-shareholder', 'Brazilian-American private equity firm co-founded by Jorge Paulo Lemann that controls Kraft Heinz.');
addConn('kraft-heinz-company', 'Berkshire Hathaway', 'major-shareholder', 'Warren Buffett\'s Berkshire Hathaway is a major shareholder alongside 3G Capital.');

// Krispy Kreme
addInd('krispy-kreme', 'Josh Charlesworth', 'CEO', 'CEO of Krispy Kreme. Leads the company\'s global expansion strategy.');
addConn('krispy-kreme', 'JAB Holding Company', 'majority-owner', 'JAB Holding (Reimann family) took Krispy Kreme private in 2016; it re-IPO\'d in 2021.');

// Under Armour
addInd('under-armour', 'Kevin Plank', 'Founder & Executive Chairman', 'Founded Under Armour in 1996 from his grandmother\'s basement. Returned as CEO in 2024.');
addConn('under-armour', 'University of Maryland', 'founding', 'Kevin Plank was a University of Maryland football player who created Under Armour to make moisture-wicking shirts.');

// Starbucks Coffee Company (note: distinct from starbucks entry)
addInd('starbucks-coffee-company', 'Laxman Narasimhan', 'CEO (2023-2024)', 'Former Reckitt Benckiser CEO who served as Starbucks CEO before being replaced by Brian Niccol in 2024.');
addConn('starbucks-coffee-company', 'Howard Schultz Era', 'leadership-history', 'Howard Schultz served three stints as CEO (1986-2000, 2008-2017, 2022-2023) and transformed Starbucks from 11 stores to 35,000+ globally.');

// De Beers Group
addInd('de-beers-group', 'Al Cook', 'CEO', 'CEO of De Beers since 2023. Former BP executive.');
addConn('de-beers-group', 'Anglo American', 'parent-company', 'De Beers is 85% owned by mining giant Anglo American plc.');
addConn('de-beers-group', 'Oppenheimer Family', 'historical-owners', 'The Oppenheimer family (Ernest, Harry, Nicky) controlled De Beers from 1929-2012.');

// Pratt Industries
addInd('pratt-industries', 'Anthony Pratt', 'Executive Chairman', 'Son of founder Richard Pratt. One of Australia\'s richest people. Major recycled packaging advocate.');
addConn('pratt-industries', 'Visy Industries', 'parent-company', 'Pratt Industries is the US subsidiary of Australia\'s Visy Industries, the largest privately-owned paper/packaging company in Australia.');

// BP
addInd('bp', 'Murray Auchincloss', 'CEO', 'CEO of BP since 2024. Former CFO who was appointed after Bernard Looney\'s resignation.');
addConn('bp', 'Rosneft', 'major-investment', 'BP held a 19.75% stake in Russian oil giant Rosneft until divesting after the 2022 Russian invasion of Ukraine.');
addConn('bp', 'Deepwater Horizon', 'disaster', 'The 2010 Deepwater Horizon oil spill in the Gulf of Mexico cost BP over $65 billion in cleanup and settlements.');

// Osem-Nestle
addInd('osem-nestle', 'Avi Ben-Assayag', 'CEO', 'CEO of Osem-Nestle Israel. Leads one of Israel\'s largest food companies.');
addConn('osem-nestle', 'Nestle', 'parent-company', 'Nestle acquired full ownership of Osem in 2016. Osem produces iconic Israeli brands like Bamba.');

// J Sainsbury
addInd('j-sainsbury', 'Simon Roberts', 'CEO', 'CEO of Sainsbury\'s since 2020. Led the company through the pandemic and cost-of-living crisis.');
addConn('j-sainsbury', 'Qatar Investment Authority', 'major-shareholder', 'Qatar\'s sovereign wealth fund is one of the largest shareholders in Sainsbury\'s.');

// ═══════════════════════════════════════════════════════════════════════════
// REAL ESTATE / HOSPITALITY
// ═══════════════════════════════════════════════════════════════════════════

// Wynn Resorts
addInd('wynn-resorts', 'Craig Billings', 'CEO', 'CEO of Wynn Resorts since 2022.');
addInd('wynn-resorts', 'Steve Wynn', 'Founder', 'Founded Wynn Resorts in 2002. Resigned as chairman in 2018 amid sexual harassment allegations.');
addConn('wynn-resorts', 'Wynn Macau', 'subsidiary', 'Wynn Resorts operates major casino resorts in Macau, one of the world\'s largest gambling markets.');

// ═══════════════════════════════════════════════════════════════════════════
// NONPROFITS / EDUCATION / JEWISH ORGS
// ═══════════════════════════════════════════════════════════════════════════

// 92nd Street Y
addInd('92nd-street-y', 'Seth Pinsky', 'CEO', 'CEO of the 92nd Street Y since 2022. Former president of NYC Economic Development Corporation.');
addConn('92nd-street-y', '#GivingTuesday', 'creation', '92Y created #GivingTuesday in 2012, now a global philanthropic movement.');
addConn('92nd-street-y', 'Celebrity Interview Series', 'programming', '92Y\'s talk series has hosted every major public intellectual, author, and cultural figure.');

// Carnegie Endowment
addInd('carnegie-endowment-for-international-peace', 'Mariano-Florentino Cuellar', 'President', 'President since 2023. Former California Supreme Court Justice.');
addConn('carnegie-endowment-for-international-peace', 'Carnegie Moscow Center', 'former-program', 'Operated a Moscow-based policy center until Russia forced its closure in 2022.');

// Hebrew Union College
addInd('hebrew-union-college-jir', 'Andrew Rehfeld', 'President', 'President of HUC-JIR since 2018. First non-rabbi to lead the Reform rabbinical seminary.');
addConn('hebrew-union-college-jir', 'Reform Judaism', 'founding', 'HUC-JIR is the seminary of Reform Judaism, founded in 1875 by Isaac Mayer Wise.');
addConn('hebrew-union-college-jir', 'Skirball Cultural Center', 'affiliate', 'HUC-JIR founded the Skirball Cultural Center in Los Angeles.');

// Shalom Hartman Institute
addInd('shalom-hartman-institute-of-north-america', 'Yehuda Kurtzer', 'President', 'President of Shalom Hartman Institute of North America. Scholar of American Jewish life.');
addConn('shalom-hartman-institute-of-north-america', 'iEngage Project', 'program', 'Flagship educational initiative helping communities engage with Israel in a nuanced way.');

// Edelman (PR firm)
addInd('edelman', 'Richard Edelman', 'CEO', 'CEO of Edelman, the world\'s largest public relations firm. Son of founder Daniel Edelman.');
addInd('edelman', 'Daniel Edelman', 'Founder (deceased)', 'Founded Daniel J. Edelman, Inc. in 1952 in Chicago. Built it into the world\'s largest PR firm.');
addConn('edelman', 'Edelman Trust Barometer', 'annual-report', 'Edelman\'s annual Trust Barometer is one of the most cited global surveys on institutional trust.');

// Museum of the Jewish People (Beit Hatfutsot)
addInd('museum-of-the-jewish-people-at-beit-hatfutsot', 'Irina Nevzlin', 'Chair of Board of Directors', 'Daughter of Russian-Israeli billionaire Leonid Nevzlin. Leads the museum\'s strategic direction.');
addConn('museum-of-the-jewish-people-at-beit-hatfutsot', 'Tel Aviv University', 'location', 'Located on the campus of Tel Aviv University in Ramat Aviv.');

// US State Dept - Special Envoy
addInd('us-department-of-state-special-envoy-antisemitism', 'Deborah Lipstadt', 'Special Envoy (2022-2025)', 'Holocaust historian and Emory professor. Famously defeated Holocaust denier David Irving in a 2000 British court case.');
addConn('us-department-of-state-special-envoy-antisemitism', 'IHRA Definition', 'policy', 'The office promotes the International Holocaust Remembrance Alliance working definition of antisemitism.');

// WPP
addInd('wpp-plc-us-operations', 'Mark Read', 'CEO', 'CEO of WPP since 2018. Leads the world\'s largest advertising and PR group.');
addConn('wpp-plc-us-operations', 'GroupM', 'subsidiary', 'WPP\'s GroupM is the world\'s largest media buying organization.');

// Alfa Group
addInd('alfa-group', 'Mikhail Fridman', 'Co-founder', 'Ukrainian-born billionaire who co-founded Alfa Group. One of Russia\'s richest people. Sanctioned by EU after 2022 invasion.');
addInd('alfa-group', 'German Khan', 'Co-founder', 'Co-founded Alfa Group with Fridman and Kuzmichev. Former EVP of TNK-BP.');
addInd('alfa-group', 'Petr Aven', 'President of Alfa-Bank', 'President of Alfa-Bank, Russia\'s largest private bank. Former Russian Minister of Foreign Economic Relations. Sanctioned by EU after 2022 invasion.');
addConn('alfa-group', 'TNK-BP', 'former-holding', 'Alfa Group was a major shareholder in TNK-BP, the Russian-British oil venture sold to Rosneft in 2013 for $55B.');

// ═══════════════════════════════════════════════════════════════════════════
// Write back
// ═══════════════════════════════════════════════════════════════════════════

fs.writeFileSync(JD_PATH, JSON.stringify(jd, null, 2), 'utf8');
fs.writeFileSync(PD_PATH, JSON.stringify(pd, null, 2), 'utf8');

let total = 0;
for (const c in jd.countries) total += jd.countries[c].length;
console.log(`Done! ${changes} changes. Entries: ${total}, People: ${Object.keys(pd.people).length}`);
