#!/usr/bin/env node
/**
 * expand-entries-batch4.js - Final batch: add 3rd+ individuals to notable entries still at 2
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
function slug(name) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function addInd(eid, name, role, bio) {
  const entry = findEntry(eid);
  if (!entry) return;
  if (!entry.individuals) entry.individuals = [];
  if (entry.individuals.some(i => i.name.toLowerCase() === name.toLowerCase())) return;
  const id = slug(name);
  entry.individuals.push({ id, name, role, bio });
  if (!pd.people[id]) {
    pd.people[id] = { name, bio: bio||'', notes: '',
      affiliations: [{ organization: entry.name, role, entryId: entry.id, country: entry._country||'' }]
    };
  } else {
    const affs = pd.people[id].affiliations || [];
    if (!affs.some(a => a.entryId === entry.id)) {
      affs.push({ organization: entry.name, role, entryId: entry.id, country: entry._country||'' });
    }
  }
  changes++;
}
function addConn(eid, name, type, desc, linkedId) {
  const entry = findEntry(eid);
  if (!entry) return;
  if (!entry.connections) entry.connections = [];
  if (entry.connections.some(c => (c.name||c.target||'').toLowerCase() === name.toLowerCase())) return;
  const conn = { name, type, description: desc };
  if (linkedId) conn.entryId = linkedId;
  entry.connections.push(conn);
  changes++;
}

// ═════ TECH ═════

addInd('anthropic', 'Tom Brown', 'Co-founder', 'Co-author of the GPT-3 paper at OpenAI. Co-founded Anthropic focused on AI safety.');
addInd('broadcom', 'Henry Nicholas', 'Co-founder', 'Co-founded Broadcom with Henry Samueli in 1991. Led the company as CEO until 2003.');
addInd('qualcomm', 'Cristiano Amon', 'CEO', 'CEO of Qualcomm since 2021. Brazilian engineer who led Qualcomm\'s 5G chip strategy.');
addInd('amazon-israel-r-d', 'Elan Dekel', 'VP of Amazon Israel R&D', 'Leads Amazon\'s Israel R&D operations which include teams from AWS, Alexa, and Ring.');
addInd('fiverr-us-operations', 'Micha Kaufman', 'Co-founder & CEO', 'Israeli entrepreneur who co-founded Fiverr in 2010.');
addInd('iac-interactivecorp', 'Joey Levin', 'CEO', 'CEO of IAC since 2015. Oversees Barry Diller\'s internet holding company.');
addInd('iac-interactivecorp', 'Barry Diller', 'Chairman', 'Founder and Chairman of IAC. Built Expedia, Match Group, and numerous other internet companies. Former Paramount chief.');
addInd('palantir-technologies', 'Stephen Cohen', 'Co-founder', 'Co-founded Palantir. Leads the company\'s engineering and technology efforts.');

// ═════ FINANCE ═════

addInd('apollo-global-management', 'Leon Black', 'Co-founder & Former Chairman', 'Co-founded Apollo in 1990. Stepped down as chairman in 2021 after revelations about ties to Jeffrey Epstein.');
addInd('warburg-pincus', 'Timothy Geithner', 'President', 'President of Warburg Pincus since 2014. Former US Treasury Secretary under Obama.');
addInd('berkshire-hathaway-via-subsidiaries', 'Ajit Jain', 'Vice Chairman (Insurance)', 'Runs Berkshire\'s massive insurance operations. Buffett has called him irreplaceable.');
addInd('bear-stearns-historic', 'Ralph Cioffi', 'Former Hedge Fund Manager', 'Managed two Bear Stearns hedge funds whose collapse in June 2007 was the first major event of the financial crisis.');
addInd('cascade-investment', 'Bill Gates', 'Founder', 'Microsoft co-founder whose personal wealth is managed through Cascade Investment.');

// ═════ MEDIA / ENTERTAINMENT ═════

addInd('the-new-york-times-company', 'David Perpetua', 'Head of Engineering', 'Oversees NYT\'s technology and engineering operations.');
addInd('dreamworks-animation', 'Steven Spielberg', 'Co-founder of DreamWorks SKG', 'The most commercially successful filmmaker in history. Co-founded DreamWorks SKG in 1994.');
addInd('warner-bros-pictures-historic-founding', 'Harry Warner', 'Co-founder (deceased)', 'Eldest of the four Warner brothers who founded Warner Bros. in 1923. Born Hirsz Wonsal in Poland.');
addInd('warner-bros-pictures-historic-founding', 'Jack Warner', 'Co-founder & Studio Head (deceased)', 'Youngest Warner brother who ran the studio for decades. Known for his iron-fisted management style.');
addInd('simon-schuster', 'Jonathan Karp', 'CEO', 'CEO of Simon & Schuster. Led the company through its $1.62B acquisition by KKR in 2023.');
addInd('mgm-studios-historic', 'Louis B. Mayer', 'Co-founder & Studio Head (deceased)', 'Born Lazar Meir in the Russian Empire. Co-founded MGM in 1924 and made it the most prestigious Hollywood studio.');
addInd('mgm-studios-historic', 'Irving Thalberg', 'Head of Production (deceased)', 'The "Boy Wonder" of Hollywood who ran MGM\'s production at age 26. The Irving G. Thalberg Memorial Award is named after him.');
addInd('random-house', 'Bennett Cerf', 'Co-founder (deceased)', 'Co-founded Random House in 1927. Famous wit, TV panelist on "What\'s My Line?" and publisher of the Modern Library.');
addInd('commentary-magazine', 'Irving Kristol', 'Contributing Editor (deceased)', 'Contributing editor called "the godfather of neoconservatism." Husband of Gertrude Himmelfarb.');
addInd('the-forward', 'Abraham Cahan', 'Founding Editor (deceased)', 'Edited the Yiddish Forverts for nearly 50 years. Seminal figure in American Jewish journalism.');
addInd('the-jewish-daily-forward-yiddish-forverts', 'Isaac Bashevis Singer', 'Staff Writer (deceased)', 'Nobel Prize-winning Yiddish writer who published much of his work first in the Forverts.');
addInd('marvel-entertainment-legacy', 'Joe Simon', 'Co-creator of Captain America (deceased)', 'Created Captain America with Jack Kirby in 1940. Also created Fighting American and other characters.');
addInd('warner-music-group', 'Max Lousada', 'CEO of Recorded Music', 'Heads Warner Music Group\'s global recorded music operations.');

// ═════ REAL ESTATE ═════

addInd('rudin-management', 'Jack Rudin', 'Former Co-Chairman (deceased)', 'Family patriarch who led Rudin Management for decades alongside brother Lewis Rudin.');
addInd('kushner-companies', 'Laurent Morali', 'President', 'President of Kushner Companies. Oversees the firm\'s real estate development operations.');
addInd('zeckendorf-development', 'William Zeckendorf Sr.', 'Original Founder (deceased)', 'Legendary NYC real estate developer who assembled the site for the United Nations headquarters.');
addInd('brookfield-properties', 'Ric Clark', 'Senior Managing Partner', 'Senior Managing Partner at Brookfield. Oversaw the rebuilding of the World Financial Center after 9/11.');

// ═════ SPORTS ═════

addInd('dallas-mavericks', 'Patrick Dumont', 'Governor', 'Son-in-law of Sheldon Adelson and Governor of the Dallas Mavericks as representative of the Adelson ownership group.');
addInd('los-angeles-clippers', 'Shelly Sterling', 'Former Co-owner', 'Co-owned the team with husband Donald Sterling. The NBA forced the sale after Sterling\'s racist remarks in 2014.');
addInd('philadelphia-76ers', 'Michael Rubin', 'Part-owner', 'Fanatics CEO and part-owner of the 76ers. Former owner of GSI Commerce.');
addInd('golden-state-warriors', 'Bob Myers', 'Former GM', 'Former GM who built the Warriors dynasty, drafting Steph Curry, Klay Thompson, and Draymond Green.');
addInd('miami-dolphins', 'Tom Garfinkel', 'Vice Chairman & CEO', 'Vice Chairman, President & CEO of the Miami Dolphins and Hard Rock Stadium.');

// ═════ JEWISH ORGANIZATIONS ═════

addInd('chabad-lubavitch', 'Rabbi Moshe Kotlarsky', 'Vice Chairman (deceased)', 'Vice Chairman of Merkos L\'Inyonei Chinuch, Chabad\'s educational arm. Oversaw the global network of over 5,000 Chabad centers until his death in 2024.');
addInd('b-nai-b-rith-international', 'Charles Kaufman', 'Past President', 'Past president who helped modernize B\'nai B\'rith\'s global operations.');
addInd('hadassah-the-women-s-zionist-organization-of-america', 'Henrietta Szold', 'Founder (deceased)', 'Founded Hadassah in 1912. Also founded Youth Aliyah, which rescued thousands of children from Nazi Europe.');
addInd('jewish-federations-of-north-america-jfna', 'Julie Platt', 'Board Chair', 'Board Chair of JFNA. Los Angeles civic leader and major Jewish philanthropist.');
addInd('republican-jewish-coalition', 'Ronald Lauder', 'Key Donor', 'Estee Lauder heir and World Jewish Congress president. Major RJC donor and longtime Republican fundraiser.');
addInd('orthodox-union-ou', 'Moishe Bane', 'Past President', 'Past president of the Orthodox Union. Led the organization during a period of significant growth.');
addInd('jewish-theological-seminary', 'Abraham Joshua Heschel', 'Former Professor (deceased)', 'One of the most influential Jewish theologians of the 20th century. Marched with MLK in Selma. Author of "The Sabbath" and "God in Search of Man."');
addInd('simon-wiesenthal-center', 'Simon Wiesenthal', 'Namesake (deceased)', 'Holocaust survivor who spent his life tracking down Nazi war criminals. The "conscience of the Holocaust." Helped bring over 1,100 Nazi war criminals to justice.');
addInd('national-council-of-jewish-women-ncjw', 'Hannah Solomon', 'Founder (deceased)', 'Founded NCJW in 1893 at the Chicago World\'s Fair. Pioneered Jewish women\'s civic engagement in America.');
addInd('washington-institute-for-near-east-policy-winep', 'Dennis Ross', 'Distinguished Fellow', 'Longtime US diplomat and Middle East peace negotiator. Served under presidents Bush, Clinton, and Obama.');
addInd('bronfman-philanthropies', 'Dana Bronfman', 'Board Member', 'Third-generation Bronfman family member involved in family philanthropy.');
addInd('charles-and-lynn-schusterman-family-philanthropies', 'Lynn Schusterman', 'Co-founder & Chair Emerita', 'Co-founded the philanthropies with husband Charles. One of the most influential Jewish philanthropists in America.');
addInd('zionist-organization-of-america-zoa', 'Morton Klein', 'National President', 'National President of ZOA since 1993. One of the most outspoken pro-Israel advocates in America.');
addInd('zionist-organization-of-america-zoa', 'Louis Brandeis', 'Historic Leader (deceased)', 'First Jewish Supreme Court Justice who led the ZOA (then FAZ) during WWI. The ZOA grew from 12,000 to 176,000 members under his leadership.');
addInd('reconstructing-judaism', 'Rabbi David Teutsch', 'Former President', 'Led the Reconstructionist Rabbinical College 1993-2002. Major figure in shaping Reconstructionist thought.');
addInd('rabbinical-assembly', 'Rabbi Amy Eilberg', 'Historic First', 'First woman ordained as a Conservative rabbi (1985). Her ordination was a watershed moment for the movement.');
addInd('las-vegas-sands-corp', 'Miriam Adelson', 'Majority Owner', 'Israeli-American physician and widow of Sheldon Adelson. Controls the Las Vegas Sands fortune and has become one of the largest Republican donors.');

// ═════ EDUCATION ═════

addInd('brandeis-university', 'Jehuda Reinharz', 'Former President', 'President of Brandeis 1994-2010. Led the university\'s growth and endowment expansion.');
addInd('hebrew-union-college-jewish-institute-of-religion', 'Rabbi Sally Priesand', 'Historic First', 'First woman ordained as a rabbi in America (1972) at HUC-JIR. A landmark in Jewish history.');

// ═════ RETAIL ═════

addInd('gap-inc', 'Donald Fisher', 'Co-founder (deceased)', 'Co-founded Gap in 1969 with wife Doris. Built it into the largest specialty apparel retailer in the US.');
addInd('gap-inc', 'Doris Fisher', 'Co-founder', 'Co-founded Gap with husband Donald. One of the wealthiest women in America and a major art collector.');
addInd('neiman-marcus', 'Stanley Marcus', 'Former Chairman (deceased)', 'Third-generation family member who transformed Neiman Marcus into a luxury retail icon. Invented the "His and Hers" extravagant holiday gifts.');

// ═════ HEALTH ═════

addInd('mount-sinai-health-system', 'Dennis Charney', 'Dean of Icahn School of Medicine', 'Dean of the Icahn School of Medicine at Mount Sinai. Leading researcher in mood and anxiety disorders.');
addInd('mount-sinai-health-system', 'Kenneth Davis', 'Former CEO', 'Former CEO of Mount Sinai Health System. Built it into one of the largest academic medical systems in the US.');

// ═════ OTHER ═════

addInd('us-department-of-state-special-envoy-antisemitism', 'Ira Forman', 'Former Special Envoy (Obama era)', 'Served as Special Envoy to Monitor and Combat Anti-Semitism under Obama.');
addInd('museum-of-the-jewish-people-at-beit-hatfutsot', 'Dan Tadmor', 'CEO', 'CEO of the Museum of the Jewish People. Led the museum\'s major $100M renovation completed in 2021.');
addInd('carnegie-endowment-for-international-peace', 'William Burns', 'Former President', 'President of Carnegie 2014-2021 before becoming CIA Director. Career diplomat.');
addInd('92nd-street-y', 'Sol Adler', 'Former Executive Director', 'Led the 92nd Street Y through a period of significant cultural programming expansion.');
addInd('wynn-resorts', 'Linda Chen', 'President of Wynn Macau', 'President and Executive Director of Wynn Macau Ltd.');
addInd('bed-bath-beyond', 'Mark Tritton', 'Former CEO', 'Former Target merchandising chief who became CEO of Bed Bath & Beyond in 2019. His strategy overhaul was blamed for accelerating the company\'s decline.');
addInd('under-armour', 'Patrik Frisk', 'Former CEO', 'CEO of Under Armour 2020-2022. Former president of Aldo Group.');

// Write
fs.writeFileSync(JD_PATH, JSON.stringify(jd, null, 2), 'utf8');
fs.writeFileSync(PD_PATH, JSON.stringify(pd, null, 2), 'utf8');

let total = 0;
for (const c in jd.countries) total += jd.countries[c].length;
const pd2 = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));
console.log(`Done! ${changes} changes. Entries: ${total}, People: ${Object.keys(pd2.people).length}`);
