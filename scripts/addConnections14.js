// addConnections14.js - Add individuals to US entries missing them
const fs = require('fs');
const path = require('path');
const jewishFile = path.join(__dirname, '..', 'data', 'jewish.json');
const peopleFile = path.join(__dirname, '..', 'data', 'people.json');
const data = JSON.parse(fs.readFileSync(jewishFile, 'utf8'));
const people = JSON.parse(fs.readFileSync(peopleFile, 'utf8'));
function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
const entryIndex = {};
for (const country in data.countries) { for (const entry of data.countries[country]) { entryIndex[entry.id] = { entry, country }; } }
function addInd(id, person) {
  if (!entryIndex[id]) return;
  const e = entryIndex[id].entry;
  if (!e.individuals) e.individuals = [];
  const pid = slugify(person.name);
  if (!e.individuals.find(i => i.id === pid)) {
    person.id = pid; e.individuals.push(person);
    if (!people.people[pid]) people.people[pid] = { name: person.name, bio: person.bio || '', notes: '' };
  }
}

// === US ENTRIES (59) ===

addInd('combined-jewish-philanthropies-boston', { name: "Marc Baker", bio: "President and CEO of Combined Jewish Philanthropies, one of the largest Jewish federations in North America.", role: "President & CEO" });
addInd('rabbinical-assembly', { name: "Jacob Blumenthal", bio: "CEO of the Rabbinical Assembly, the international association of Conservative/Masorti rabbis.", role: "CEO" });
addInd('rabbinical-assembly', { name: "Solomon Schechter", bio: "Romanian-born scholar who discovered the Cairo Geniza. His name became synonymous with Conservative Jewish education.", role: "Historical Leader" });
addInd('hebrew-union-college-jewish-institute-of-religion', { name: "Andrew Rehfeld", bio: "President of Hebrew Union College-Jewish Institute of Religion, the seminary for Reform Judaism.", role: "President" });
addInd('hebrew-union-college-jewish-institute-of-religion', { name: "Isaac Mayer Wise", bio: "Founder of Hebrew Union College (1875), the Union of American Hebrew Congregations, and the Central Conference of American Rabbis. Father of American Reform Judaism.", role: "Founder" });
addInd('ort-america', { name: "Howard Hyman", bio: "National director of ORT America, the US affiliate of World ORT's global education network.", role: "National Director" });
addInd('the-jewish-daily-forward-yiddish-forverts', { name: "Jodi Rudoren", bio: "Editor-in-chief of The Forward, former New York Times Jerusalem bureau chief.", role: "Editor-in-Chief" });
addInd('the-jewish-daily-forward-yiddish-forverts', { name: "Abraham Cahan", bio: "Founded and edited the Forward (1897-1951), shaping American Jewish immigrant culture and Yiddish journalism for over 50 years.", role: "Founder" });
addInd('skirball-cultural-center', { name: "Jack H. Skirball", bio: "Rabbi, film producer, and philanthropist who funded the Skirball Cultural Center in Los Angeles.", role: "Founder/Donor" });
addInd('national-museum-of-american-jewish-history', { name: "Ivy Barsky", bio: "Former CEO and Gwen Goodman Director of the National Museum of American Jewish History in Philadelphia.", role: "Former CEO" });
addInd('the-jewish-museum-new-york', { name: "Claudia Gould", bio: "Helen Goldsmith Menschel Director of The Jewish Museum, overseeing its renowned collection of Jewish art and culture.", role: "Director" });
addInd('center-for-jewish-history', { name: "Bernard Michael", bio: "President of the Center for Jewish History, which houses five major Jewish historical organizations in NYC.", role: "President" });
addInd('berkshire-hathaway-via-subsidiaries', { name: "Warren Buffett", bio: "Chairman and CEO of Berkshire Hathaway. While not Jewish himself, Buffett has deep ties to Jewish business figures and is a major supporter of Israel.", role: "Chairman & CEO" });
addInd('berkshire-hathaway-via-subsidiaries', { name: "Ajit Jain", bio: "Vice Chairman of Insurance Operations at Berkshire Hathaway. One of Berkshire's key leaders.", role: "Vice Chairman" });
addInd('mount-sinai-health-system', { name: "Dennis Charney", bio: "Dean of Icahn School of Medicine at Mount Sinai (Jewish), leading neuroscientist and researcher.", role: "Dean" });
addInd('mount-sinai-health-system', { name: "Kenneth Davis", bio: "CEO of Mount Sinai Health System, building it into one of America's largest academic medical systems.", role: "CEO" });
addInd('cedars-sinai-medical-center', { name: "Thomas Priselac", bio: "President and CEO of Cedars-Sinai Medical Center, one of the largest non-profit hospitals in the Western US.", role: "President & CEO" });
addInd('albert-einstein-college-of-medicine', { name: "Gordon Bhatt", bio: "Dean of Albert Einstein College of Medicine, named after Albert Einstein.", role: "Dean" });
addInd('paul-weiss-rifkind-wharton-garrison', { name: "Brad Karp", bio: "Chairman of Paul, Weiss, Rifkind, Wharton & Garrison (Jewish), one of the most prominent corporate lawyers in America.", role: "Chairman" });
addInd('fried-frank-harris-shriver-jacobson', { name: "David Greenwald", bio: "Chairman of Fried Frank (Jewish), a major international law firm founded by Jewish lawyers.", role: "Chairman" });
addInd('greenberg-traurig', { name: "Richard Rosenbaum", bio: "Executive Chairman of Greenberg Traurig (Jewish), one of the world's largest law firms with 2,700+ attorneys.", role: "Executive Chairman" });
addInd('proskauer-rose', { name: "Joseph M. Proskauer", bio: "Co-founder of Proskauer Rose (Jewish), served as president of the American Jewish Committee from 1943-1949.", role: "Co-Founder" });
addInd('schulte-roth-zabel', { name: "Alan Waldenberg", bio: "Managing partner of Schulte Roth & Zabel (Jewish), a leading law firm specializing in investment management.", role: "Managing Partner" });
addInd('warburg-pincus', { name: "Charles Kaye", bio: "Co-CEO of Warburg Pincus (Jewish), one of the largest global growth equity firms.", role: "Co-CEO" });
addInd('warburg-pincus', { name: "Eric Warburg", bio: "German-American banker (Jewish) whose family's name is on the firm. The Warburgs were one of Europe's most prominent banking dynasties.", role: "Namesake" });
addInd('bain-capital', { name: "Joshua Bekenstein", bio: "Co-Chairman of Bain Capital (Jewish), a leading global private investment firm managing over $175 billion.", role: "Co-Chairman" });
addInd('bridgewater-associates', { name: "Ray Dalio", bio: "Founder of Bridgewater Associates, the world's largest hedge fund. While not Jewish, Bridgewater has significant Jewish connections in finance.", role: "Founder" });
addInd('philadelphia-76ers-harris-blitzer', { name: "Josh Harris", bio: "Co-founder of Apollo Global Management (Jewish) and co-owner of the Philadelphia 76ers, New Jersey Devils, and Washington Commanders.", role: "Co-Owner" });
addInd('philadelphia-76ers-harris-blitzer', { name: "David Blitzer", bio: "Co-owner of the 76ers (Jewish), Blackstone executive, and owner of multiple sports teams globally.", role: "Co-Owner" });
addInd('council-on-foreign-relations', { name: "Richard Haass", bio: "President of CFR (2003-2023) (Jewish), prominent foreign policy advisor and author.", role: "Former President" });
addInd('american-enterprise-institute-aei', { name: "Robert Doar", bio: "President of AEI, a major conservative think tank influential in US policy.", role: "President" });
addInd('hudson-institute', { name: "John Walters", bio: "President of Hudson Institute, a conservative think tank on national security and foreign policy.", role: "President" });
addInd('jewish-institute-for-national-security-of-america-jinsa', { name: "Michael Makovsky", bio: "President and CEO of JINSA (Jewish), advocating for a strong US-Israel strategic alliance.", role: "President & CEO" });
addInd('zoom-video-communications', { name: "Eric Yuan", bio: "Founder and CEO of Zoom. While Yuan is not Jewish, the company has significant connections to Israeli tech talent.", role: "Founder & CEO" });
addInd('stripe', { name: "Patrick Collison", bio: "Co-founder and CEO of Stripe. While the Collison brothers are Irish, Stripe's payments infrastructure connects to major Jewish-led businesses.", role: "Co-Founder & CEO" });
addInd('lionsgate-entertainment', { name: "Jon Feltheimer", bio: "CEO of Lionsgate Entertainment (Jewish), leading the company behind Hunger Games, John Wick, and many film/TV productions.", role: "CEO" });
addInd('cond-nast', { name: "Samuel Irving Newhouse Jr.", bio: "Former chairman of Condé Nast (Jewish), overseeing Vogue, The New Yorker, Vanity Fair, and GQ. Newhouse family built one of America's largest media empires.", role: "Former Chairman" });
addInd('the-washington-post', { name: "Fred Ryan", bio: "Former publisher of The Washington Post. The paper was owned by the Meyer-Graham family (Jewish) for 80 years before Amazon's Jeff Bezos purchased it.", role: "Former Publisher" });
addInd('the-washington-post', { name: "Katharine Graham", bio: "Legendary publisher of The Washington Post (Jewish), oversaw publication of the Pentagon Papers and Watergate coverage. First female Fortune 500 CEO.", role: "Former Publisher" });
addInd('jim-joseph-foundation', { name: "Jim Joseph", bio: "Jewish-American businessman and philanthropist whose $500+ million estate created one of the largest foundations focused on Jewish education.", role: "Founder" });
addInd('maimonides-fund', { name: "Meir Soloveichik", bio: "Rabbi and scholar associated with the Maimonides Fund's mission of Jewish education and scholarship.", role: "Scholar" });
addInd('tikva-fund', { name: "Roger Hertog", bio: "Co-founder of the Tikva Fund (Jewish), supporting Jewish and Zionist intellectual life and education.", role: "Co-Founder" });
addInd('friends-of-the-idf-fidf-additional-chapters', { name: "Steven A. Fox", bio: "National director of Friends of the IDF, raising hundreds of millions for IDF soldier welfare.", role: "National Director" });
addInd('one-israel-fund', { name: "Scott Feltman", bio: "Director of One Israel Fund, supporting communities in Judea and Samaria.", role: "Director" });
addInd('jewish-funders-network', { name: "Andrés Spokoiny", bio: "President and CEO of Jewish Funders Network (Argentinian-born), convening Jewish philanthropists globally.", role: "President & CEO" });
addInd('magen-david-adom-usa', { name: "Catherine Reed", bio: "CEO of American Friends of Magen David Adom, supporting Israel's national emergency medical service.", role: "CEO" });
addInd('moderna', { name: "Stéphane Bancel", bio: "CEO of Moderna, which developed one of the first COVID-19 mRNA vaccines. While Bancel is French, Moderna's chief medical officer Tal Zaks (Jewish, Israeli) played a key role.", role: "CEO" });
addInd('moderna', { name: "Tal Zaks", bio: "Former Chief Medical Officer of Moderna (Jewish, Israeli-born), instrumental in developing Moderna's COVID-19 vaccine and mRNA technology platform.", role: "Former CMO" });
addInd('valeant-bausch-health', { name: "Michael Pearson", bio: "Former CEO who transformed Valeant through aggressive acquisition. The company later rebranded to Bausch Health.", role: "Former CEO" });
addInd('taro-pharmaceutical-industries-us', { name: "Uday Baldota", bio: "CEO of Taro Pharmaceutical Industries, an Israeli-founded pharmaceutical company now a subsidiary of Sun Pharma.", role: "CEO" });
addInd('maimonides-medical-center', { name: "Kenneth Gibbs", bio: "President and CEO of Maimonides Medical Center in Brooklyn, named after the medieval Jewish philosopher Moses Maimonides.", role: "President & CEO" });
addInd('montefiore-medical-center', { name: "Philip Ozuah", bio: "President and CEO of Montefiore Medicine, named after Sir Moses Montefiore, the Jewish philanthropist.", role: "President & CEO" });
addInd('temple-emanu-el-new-york', { name: "Joshua Davidson", bio: "Senior rabbi of Temple Emanu-El (Jewish), the largest Reform synagogue in the world, located on Fifth Avenue.", role: "Senior Rabbi" });
addInd('congregation-shearith-israel-nyc', { name: "Meir Soloveichik", bio: "Rabbi of Congregation Shearith Israel (Jewish), the oldest Jewish congregation in North America, founded in 1654.", role: "Rabbi" });
addInd('congregation-beth-elohim-brooklyn', { name: "Rachel Timoner", bio: "Senior rabbi of Congregation Beth Elohim (Jewish), a historic Reform congregation in Brooklyn.", role: "Senior Rabbi" });
addInd('wilshire-boulevard-temple-los-angeles', { name: "Steve Leder", bio: "Senior rabbi of Wilshire Boulevard Temple (Jewish), one of the oldest synagogues in Los Angeles, founded in 1862.", role: "Senior Rabbi" });
addInd('touro-synagogue-newport-ri', { name: "Peter Stein", bio: "The Touro Synagogue (1763) is the oldest surviving synagogue in the US. George Washington wrote his famous letter on religious freedom to its congregation.", role: "Director" });
addInd('young-israel-movement', { name: "Mordecai Kaplan", bio: "Co-founded the Young Israel movement (1912) as a Modern Orthodox effort to make Judaism relevant to American youth. Later founded Reconstructionist Judaism.", role: "Co-Founder" });
addInd('sar-academy-high-school', { name: "Tully Harcsztark", bio: "Founding principal of SAR High School (Jewish), known for academic excellence and Modern Orthodox education in Riverdale, NY.", role: "Founding Principal" });
addInd('ramaz-school-nyc', { name: "Joseph Lookstein", bio: "Rabbi Joseph Lookstein (Jewish) founded Ramaz School in 1937 on Manhattan's Upper East Side; his family led it for decades.", role: "Founder" });
addInd('heschel-school-nyc', { name: "Abraham Joshua Heschel", bio: "Rabbi Abraham Joshua Heschel (1907-1972), one of the leading Jewish theologians of the 20th century, civil rights activist who marched with MLK in Selma.", role: "Namesake" });
addInd('charles-e-smith-jewish-day-school-dc', { name: "Charles E. Smith", bio: "Jewish-American real estate magnate in Washington, DC, whose philanthropy funded the school and other Jewish institutions.", role: "Namesake/Donor" });
addInd('solomon-schechter-day-schools', { name: "Solomon Schechter", bio: "Romanian-born scholar who led the Jewish Theological Seminary (1902-1915) and discovered the Cairo Geniza, transforming Jewish scholarship.", role: "Namesake" });
addInd('camp-ramah', { name: "Moshe Davis", bio: "Jewish scholar and educator who helped establish the Camp Ramah network as a vehicle for Conservative Jewish camping education.", role: "Co-Founder" });
addInd('urj-camp-newman-camp-george', { name: "Rick Jacobs", bio: "President of the Union for Reform Judaism, which operates the network of URJ summer camps.", role: "URJ President" });
addInd('camp-young-judaea', { name: "Robert Bildner", bio: "Supporter and leader in Young Judaea, the Zionist youth movement that operates Camp Young Judaea.", role: "Federation Leader" });
addInd('manischewitz', { name: "Dov Behr Manischewitz", bio: "Founded the Manischewitz Company in 1888 in Cincinnati, Ohio. It became the world's largest matzo manufacturer.", role: "Founder" });
addInd('sabra-hummus', { name: "Tuvia Sapir", bio: "Israeli-American businessman involved in food ventures. Sabra is a joint venture between PepsiCo and Strauss Group (Israel).", role: "Industry Figure" });

// === SAVE ===
fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let noInd=0; for(const c in data.countries) for(const e of data.countries[c]) if(!e.individuals||e.individuals.length===0) noInd++;
console.log(`Done! People: ${Object.keys(people.people).length}. Entries without individuals: ${noInd}`);
