/**
 * expandData54.js – Add key individuals to 25 sparse Canada entries
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
  if (bio && bio.length > (pd.people[id].bio || '').length) pd.people[id].bio = bio;
  return false;
}

let newPeople = 0;
let updatedEntries = 0;

const individualsMap = {
  "toronto-international-film-festival-tiff": [
    {"id": "person-piers-handling", "name": "Piers Handling", "role": "Former CEO & Director", "bio": "Led TIFF for over two decades (1994–2018), transforming it into one of the world's most prestigious film festivals."},
    {"id": "person-cameron-bailey", "name": "Cameron Bailey", "role": "CEO", "bio": "Became CEO of TIFF in 2020 after serving as Artistic Director, guiding the festival's programming and strategic vision."},
    {"id": "person-lisa-de-wilde", "name": "Lisa de Wilde", "role": "Board Chair", "bio": "Served as Chair of TIFF's Board of Directors, contributing governance leadership to the organization."},
    {"id": "person-michele-maheux", "name": "Michèle Maheux", "role": "Former Executive Director", "bio": "Served as Executive Director and COO of TIFF for many years, overseeing operations and industry programming."}
  ],
  "onex-corporation": [
    {"id": "person-gerry-schwartz", "name": "Gerry Schwartz", "role": "Founder & Chairman", "bio": "Founded Onex Corporation in 1984 and built it into one of Canada's largest private equity firms."},
    {"id": "person-bobby-le-blanc", "name": "Bobby Le Blanc", "role": "President & CEO", "bio": "Succeeded Gerry Schwartz as CEO, leading Onex's global private equity and credit operations."},
    {"id": "person-heather-reisman", "name": "Heather Reisman", "role": "Former Director & Spouse of Founder", "bio": "CEO of Indigo Books and wife of Gerry Schwartz, she served on the Onex board and is a prominent Canadian business figure."},
    {"id": "person-ewout-heersink", "name": "Ewout Heersink", "role": "Managing Director", "bio": "Senior Managing Director at Onex who played a key role in the firm's private equity investment strategy."}
  ],
  "shopify": [
    {"id": "person-tobi-lutke", "name": "Tobi Lütke", "role": "Co-founder & CEO", "bio": "Co-founded Shopify in 2006 and grew it into one of the world's leading e-commerce platforms, headquartered in Ottawa."},
    {"id": "person-harley-finkelstein", "name": "Harley Finkelstein", "role": "President", "bio": "Joined Shopify early and became President, serving as a key public face and advocate for entrepreneurship."},
    {"id": "person-daniel-weinand", "name": "Daniel Weinand", "role": "Co-founder & Former Chief Design Officer", "bio": "Co-founded Shopify alongside Tobi Lütke and Scott Lake, leading the platform's early design and user experience."},
    {"id": "person-amy-shapero", "name": "Amy Shapero", "role": "Former CFO", "bio": "Served as Shopify's CFO during a period of rapid growth, overseeing the company's financial strategy and public market performance."}
  ],
  "bombardier-inc": [
    {"id": "person-joseph-armand-bombardier", "name": "Joseph-Armand Bombardier", "role": "Founder", "bio": "Founded Bombardier in 1942 in Valcourt, Quebec, initially manufacturing snowmobiles before the company expanded into aerospace and rail."},
    {"id": "person-laurent-beaudoin", "name": "Laurent Beaudoin", "role": "Former Chairman & CEO", "bio": "Son-in-law of the founder, he led Bombardier's transformation into a global aerospace and transportation conglomerate."},
    {"id": "person-pierre-beaudoin", "name": "Pierre Beaudoin", "role": "Former CEO & Chairman", "bio": "Grandson of the founder who served as CEO and later Chairman, overseeing the C Series aircraft development."},
    {"id": "person-eric-martel", "name": "Éric Martel", "role": "President & CEO", "bio": "Became CEO in 2020 and led Bombardier's strategic refocus on business aviation after divesting rail and commercial aerospace units."}
  ],
  "reichmann-family-olympia-york": [
    {"id": "person-paul-reichmann", "name": "Paul Reichmann", "role": "Co-founder & Principal", "bio": "The driving force behind Olympia & York, he masterminded the development of Canary Wharf in London and major Toronto projects."},
    {"id": "person-albert-reichmann", "name": "Albert Reichmann", "role": "Co-founder & Partner", "bio": "Co-founded Olympia & York with his brothers and managed key aspects of the family's vast real estate empire."},
    {"id": "person-ralph-reichmann", "name": "Ralph Reichmann", "role": "Co-founder & Partner", "bio": "One of the three Reichmann brothers who built Olympia & York into the world's largest real estate development company in the 1980s."},
    {"id": "person-samuel-reichmann", "name": "Samuel Reichmann", "role": "Patriarch", "bio": "Father of Paul, Albert, and Ralph, he was a Hungarian-born businessman whose family emigrated to Canada and laid the foundation for the dynasty."}
  ],
  "b-nai-brith-canada": [
    {"id": "person-michael-mostyn", "name": "Michael Mostyn", "role": "CEO", "bio": "Serves as CEO of B'nai Brith Canada, leading the organization's advocacy, anti-hate, and community service work."},
    {"id": "person-sam-katz-bnai", "name": "Sam Katz", "role": "Former National President", "bio": "Served as president of B'nai Brith Canada, guiding the organization's policy and community engagement initiatives."},
    {"id": "person-david-matas", "name": "David Matas", "role": "Senior Legal Counsel", "bio": "Prominent international human rights lawyer who has served as senior legal counsel for B'nai Brith Canada."},
    {"id": "person-anita-bromberg", "name": "Anita Bromberg", "role": "Former National Director of Legal Affairs", "bio": "Led B'nai Brith Canada's legal affairs and the League for Human Rights, combating antisemitism and discrimination."}
  ],
  "barrick-gold-peter-munk": [
    {"id": "person-peter-munk", "name": "Peter Munk", "role": "Founder & Former Chairman", "bio": "Hungarian-born Canadian businessman who founded Barrick Gold in 1983, building it into the world's largest gold mining company."},
    {"id": "person-mark-bristow", "name": "Mark Bristow", "role": "President & CEO", "bio": "Became CEO of Barrick Gold following the 2019 merger with Randgold Resources, which he previously led."},
    {"id": "person-john-thornton", "name": "John Thornton", "role": "Executive Chairman", "bio": "Former Goldman Sachs president who became Executive Chairman of Barrick Gold, guiding its strategic direction."},
    {"id": "person-aaron-regent", "name": "Aaron Regent", "role": "Former CEO", "bio": "Served as CEO of Barrick Gold from 2009 to 2012, overseeing the company during a period of high gold prices and expansion."}
  ],
  "jewish-federations-of-canada-uia": [
    {"id": "person-nikki-gershbain", "name": "Nikki Gershbain", "role": "Former CEO", "bio": "Served as CEO of Jewish Federations of Canada – UIA, overseeing the national umbrella for Jewish community fundraising and services."},
    {"id": "person-linda-frum", "name": "Linda Frum", "role": "Former National Campaign Chair", "bio": "Canadian senator and journalist who served in leadership roles supporting the federation's national campaigns."},
    {"id": "person-jerry-lewkowitz", "name": "Jerry Lewkowitz", "role": "Former National Chair", "bio": "Served as national chair of JFCUIA, providing volunteer leadership for Canada's Jewish federation system."}
  ],
  "mount-sinai-hospital-toronto": [
    {"id": "person-joseph-mapa", "name": "Joseph Mapa", "role": "Former President & CEO", "bio": "Led Mount Sinai Hospital for many years, overseeing its growth into a leading teaching and research hospital in Toronto."},
    {"id": "person-zane-cohen", "name": "Zane Cohen", "role": "Surgeon & Namesake of Digestive Diseases Centre", "bio": "Renowned colorectal surgeon at Mount Sinai Hospital whose legacy includes the Zane Cohen Centre for Digestive Diseases."},
    {"id": "person-samuel-lunenfeld", "name": "Samuel Lunenfeld", "role": "Benefactor", "bio": "Major philanthropist whose donations established the Lunenfeld-Tanenbaum Research Institute at Mount Sinai Hospital."},
    {"id": "person-alan-bernstein", "name": "Alan Bernstein", "role": "Former Director, Lunenfeld-Tanenbaum Research Institute", "bio": "Leading biomedical researcher who helped build Mount Sinai's research institute into a world-class facility."}
  ],
  "federation-cja-montreal": [
    {"id": "person-yair-szlak", "name": "Yair Szlak", "role": "President & CEO", "bio": "Leads Federation CJA in Montreal, overseeing community services, fundraising, and Israel engagement for the Jewish community."},
    {"id": "person-eric-bhak", "name": "Eric Bhak", "role": "Former Board Chair", "bio": "Served as Chair of the Board of Directors of Federation CJA, providing volunteer leadership to Montreal's Jewish community."},
    {"id": "person-marc-gold", "name": "Marc Gold", "role": "Former President", "bio": "Canadian Senator who previously served as president of Federation CJA, strengthening community programming in Montreal."}
  ],
  "centre-for-israel-and-jewish-affairs-cija": [
    {"id": "person-shimon-koffler-fogel", "name": "Shimon Koffler Fogel", "role": "Former CEO", "bio": "Led CIJA as its CEO for many years, serving as Canadian Jewry's primary advocacy voice on Parliament Hill and in public policy."},
    {"id": "person-david-cape", "name": "David Cape", "role": "Former Chair", "bio": "Served as Chair of CIJA's board, helping shape the organization's government relations and public affairs strategies."},
    {"id": "person-richard-marceau", "name": "Richard Marceau", "role": "Vice President & General Counsel", "bio": "Former Bloc Québécois MP who joined CIJA to lead its Quebec advocacy and legal affairs."}
  ],
  "canadian-museum-for-human-rights": [
    {"id": "person-israel-asper", "name": "Israel Asper", "role": "Visionary & Initiator", "bio": "Media mogul and founder of CanWest Global Communications who conceived the idea for the Canadian Museum for Human Rights in Winnipeg before his death in 2003."},
    {"id": "person-gail-asper", "name": "Gail Asper", "role": "President, Friends of CMHR", "bio": "Daughter of Israel Asper who championed the museum's creation, leading fundraising and advocacy to bring it to completion in 2014."},
    {"id": "person-stuart-murray", "name": "Stuart Murray", "role": "Former President & CEO", "bio": "Served as the museum's first President and CEO, overseeing its construction and opening in Winnipeg."},
    {"id": "person-isha-khan", "name": "Isha Khan", "role": "CEO", "bio": "Appointed CEO of the Canadian Museum for Human Rights, leading the institution's programming and public engagement."}
  ],
  "friends-of-simon-wiesenthal-center-canada": [
    {"id": "person-avi-benlolo", "name": "Avi Benlolo", "role": "Founding President & CEO", "bio": "Founded and led Friends of Simon Wiesenthal Center for Holocaust Studies in Canada, becoming a leading voice against antisemitism and hate."},
    {"id": "person-michael-levitt", "name": "Michael Levitt", "role": "President & CEO", "bio": "Former Liberal MP who became President and CEO, continuing the organization's Holocaust education and anti-hate mission."},
    {"id": "person-jaime-kirzner-roberts", "name": "Jaime Kirzner-Roberts", "role": "Director of Policy", "bio": "Leads the policy and advocacy work at Friends of Simon Wiesenthal Center, focusing on combating antisemitism and online hate."}
  ],
  "munk-school-of-global-affairs-u-of-toronto": [
    {"id": "person-peter-munk", "name": "Peter Munk", "role": "Founding Benefactor", "bio": "Donated $50 million to the University of Toronto to establish the Munk School of Global Affairs & Public Policy in 2010."},
    {"id": "person-janice-stein", "name": "Janice Gross Stein", "role": "Founding Director", "bio": "Renowned political scientist who served as the founding director of the Munk School, shaping its research and policy focus."},
    {"id": "person-randall-hansen", "name": "Randall Hansen", "role": "Interim Director", "bio": "Political science professor who served as director, overseeing the school's academic programs and research centres."},
    {"id": "person-peter-loewen", "name": "Peter Loewen", "role": "Director", "bio": "Political scientist appointed as Director of the Munk School, leading its expansion in public policy education and research."}
  ],
  "canadian-jewish-congress-historical": [
    {"id": "person-samuel-bronfman", "name": "Samuel Bronfman", "role": "President (1939–1962)", "bio": "Seagram empire patriarch who served as president of the Canadian Jewish Congress for over two decades, guiding it through WWII and post-war refugee resettlement."},
    {"id": "person-irving-abella", "name": "Irving Abella", "role": "President & Historian", "bio": "Historian and author of 'None Is Too Many' who served as president of the Canadian Jewish Congress, documenting Canada's restrictive wartime immigration policies."},
    {"id": "person-saul-hayes", "name": "Saul Hayes", "role": "Executive Director", "bio": "Long-serving executive director of the Canadian Jewish Congress who managed day-to-day operations and external affairs for decades."},
    {"id": "person-jack-jedwab", "name": "Jack Jedwab", "role": "Former Executive Director (Quebec)", "bio": "Headed the Quebec region of the Canadian Jewish Congress and later became a leading researcher on Canadian diversity and identity."}
  ],
  "canaccord-genuity": [
    {"id": "person-peter-brown", "name": "Peter Brown", "role": "Former Chairman", "bio": "Built Canaccord from a small Vancouver brokerage into a major independent investment firm and served as its long-time chairman."},
    {"id": "person-dan-daviau", "name": "Dan Daviau", "role": "President & CEO", "bio": "Leads Canaccord Genuity Group as President and CEO, overseeing its global capital markets and wealth management operations."},
    {"id": "person-stuart-reaney", "name": "Stuart Reaney", "role": "Former Global Head of Capital Markets", "bio": "Served in senior capital markets roles at Canaccord Genuity, driving the firm's equity underwriting business."}
  ],
  "uja-federation-of-greater-toronto": [
    {"id": "person-adam-minsky", "name": "Adam Minsky", "role": "President & CEO", "bio": "Leads UJA Federation of Greater Toronto, overseeing one of North America's largest Jewish community fundraising and social service organizations."},
    {"id": "person-julia-koschitzky", "name": "Julia Koschitzky", "role": "Former Chair of the Board", "bio": "Prominent community leader and philanthropist who served as Chair of UJA Federation and has held leadership roles in global Jewish organizations."},
    {"id": "person-ted-sokolsky", "name": "Ted Sokolsky", "role": "Former President & CEO", "bio": "Previously led UJA Federation of Greater Toronto, strengthening its community programs and annual campaigns."},
    {"id": "person-larry-tanenbaum", "name": "Larry Tanenbaum", "role": "Major Donor & Leader", "bio": "Sports and business mogul who has been a key philanthropic leader and supporter of UJA Federation of Greater Toronto."}
  ],
  "montreal-holocaust-museum": [
    {"id": "person-alice-herscovitch", "name": "Alice Herscovitch", "role": "Former Executive Director", "bio": "Led the Montreal Holocaust Museum for many years, building it into a leading Holocaust education institution in Canada."},
    {"id": "person-cornelia-goldsmith", "name": "Cornelia Goldsmith", "role": "Former President", "bio": "Served as President of the board, overseeing the museum's educational programming and exhibition development."},
    {"id": "person-eszter-andor", "name": "Eszter Andor", "role": "Head of Collections & Exhibitions", "bio": "Curates the Montreal Holocaust Museum's permanent and travelling exhibitions, managing its collection of survivor artifacts and testimonies."}
  ],
  "canadian-jewish-news": [
    {"id": "person-mordechai-ben-dat", "name": "Mordechai Ben-Dat", "role": "Publisher & Editor", "bio": "Served as editor and later publisher of the Canadian Jewish News, guiding the paper through its transition to digital media."},
    {"id": "person-elizabeth-faber", "name": "Elizabeth Faber", "role": "Former Editor", "bio": "Served as editor of the Canadian Jewish News, shaping editorial coverage of Canadian Jewish community issues."},
    {"id": "person-bernie-lebow", "name": "Bernie Lebow", "role": "Former Publisher", "bio": "Served as publisher of the Canadian Jewish News for many years, overseeing its operations as the major English-language Jewish newspaper in Canada."}
  ],
  "vancouver-holocaust-education-centre": [
    {"id": "person-robert-krell", "name": "Robert Krell", "role": "Co-founder", "bio": "Child Holocaust survivor, psychiatrist, and co-founder of the Vancouver Holocaust Education Centre, dedicated to preserving survivor testimony."},
    {"id": "person-nina-krieger", "name": "Nina Krieger", "role": "Executive Director", "bio": "Leads the Vancouver Holocaust Education Centre, overseeing its educational programs and exhibitions on Holocaust remembrance."},
    {"id": "person-frieda-miller", "name": "Frieda Miller", "role": "Former Executive Director", "bio": "Shaped the VHEC's educational mandate over many years, building its programs for students and teachers across British Columbia."}
  ],
  "toronto-hebrew-memorial-park": [
    {"id": "person-benjamin-katz-thmp", "name": "Benjamin Katz", "role": "Community Leader", "bio": "Involved in the governance of the Toronto Hebrew Memorial Park, one of the major Jewish cemeteries serving the Greater Toronto Area."},
    {"id": "person-allan-offman", "name": "Allan Offman", "role": "Administrator", "bio": "Served in an administrative capacity at the Toronto Hebrew Memorial Park, managing cemetery operations and community relations."},
    {"id": "person-harvey-ostroff", "name": "Harvey Ostroff", "role": "Board Member", "bio": "Served on the board of the Toronto Hebrew Memorial Park, contributing to governance and community outreach efforts."}
  ],
  "brookfield-asset-management": [
    {"id": "person-bruce-flatt", "name": "Bruce Flatt", "role": "CEO", "bio": "Has led Brookfield Asset Management since 2002, growing it into one of the world's largest alternative asset managers with over $900 billion in AUM."},
    {"id": "person-jack-cockwell", "name": "Jack Cockwell", "role": "Former CEO & Group Chairman", "bio": "South African-born businessman who built the Brascan/Brookfield empire alongside the Bronfman family, serving as the company's strategic architect."},
    {"id": "person-edward-bronfman", "name": "Edward Bronfman", "role": "Former Chairman", "bio": "Member of the Bronfman family who served as chairman of Brascan (predecessor to Brookfield), shaping its early growth in Canadian real estate and resources."},
    {"id": "person-sachin-shah", "name": "Sachin Shah", "role": "CEO, Brookfield Asset Management Ltd.", "bio": "Leads the publicly listed Brookfield Asset Management entity, overseeing client relationships and capital raising globally."}
  ],
  "cirque-du-soleil": [
    {"id": "person-guy-laliberte", "name": "Guy Laliberté", "role": "Co-founder", "bio": "Former street performer who co-founded Cirque du Soleil in 1984 in Baie-Saint-Paul, Quebec, revolutionizing the circus arts globally."},
    {"id": "person-gilles-ste-croix", "name": "Gilles Ste-Croix", "role": "Co-founder", "bio": "Co-founded Cirque du Soleil with Guy Laliberté and played a key creative role in developing the company's signature artistic style."},
    {"id": "person-daniel-lamarre", "name": "Daniel Lamarre", "role": "Former President & CEO", "bio": "Led Cirque du Soleil for nearly two decades, expanding its shows worldwide and navigating the company through ownership changes."},
    {"id": "person-stephane-lefebvre", "name": "Stéphane Lefebvre", "role": "CEO", "bio": "Appointed CEO of Cirque du Soleil, leading the company's recovery and expansion following the pandemic restructuring."}
  ],
  "saputo-inc": [
    {"id": "person-lino-saputo-sr", "name": "Lino Saputo Sr.", "role": "Founder & Chairman Emeritus", "bio": "Founded Saputo Inc. in Montreal in 1954, growing it from a small cheese shop into one of the world's largest dairy processors."},
    {"id": "person-lino-saputo-jr", "name": "Lino Saputo Jr.", "role": "Chair of the Board & CEO", "bio": "Son of the founder who has led Saputo as CEO, expanding the company through global acquisitions in dairy and food products."},
    {"id": "person-carl-colizza", "name": "Carl Colizza", "role": "President & COO", "bio": "Serves as President and COO of Saputo Inc., overseeing the company's global dairy operations across multiple continents."},
    {"id": "person-maxime-therrien", "name": "Maxime Therrien", "role": "CFO", "bio": "Serves as Chief Financial Officer of Saputo, managing the company's financial strategy during its international growth phase."}
  ],
  "canadian-friends-of-hebrew-university": [
    {"id": "person-rami-kleinmann", "name": "Rami Kleinmann", "role": "CEO", "bio": "Leads Canadian Friends of the Hebrew University, fostering academic partnerships and fundraising to support Hebrew University of Jerusalem."},
    {"id": "person-avie-bennett", "name": "Avie Bennett", "role": "Former National President & Major Benefactor", "bio": "Canadian real estate developer and publisher who served as national president and was a leading philanthropic supporter of Hebrew University."},
    {"id": "person-jack-bick", "name": "Jack Bick", "role": "Former National Chair", "bio": "Served as national chair of CFHU, providing volunteer leadership and championing academic excellence at Hebrew University."}
  ]
};

// Get Canada entries
const caEntries = jd.countries['Canada'] || [];

// Build index for fast lookup
const caIndex = {};
caEntries.forEach((e, i) => { caIndex[e.id] = i; });

for (const [entryId, individuals] of Object.entries(individualsMap)) {
  const idx = caIndex[entryId];
  if (idx === undefined) {
    console.log('ENTRY NOT FOUND:', entryId);
    continue;
  }

  const entry = caEntries[idx];
  const existingIds = new Set((entry.individuals || []).map(i => i.id));

  if (!entry.individuals) entry.individuals = [];

  let addedToEntry = 0;
  for (const ind of individuals) {
    // Add to people.json
    if (addPerson(ind.id, ind.name, ind.bio)) newPeople++;

    // Add to entry individuals if not already present
    if (!existingIds.has(ind.id)) {
      entry.individuals.push({
        id: ind.id,
        name: ind.name,
        role: ind.role,
        bio: ind.bio
      });
      existingIds.add(ind.id);
      addedToEntry++;
    }
  }

  if (addedToEntry > 0) {
    updatedEntries++;
    console.log(`  ${entryId}: +${addedToEntry} individuals (total: ${entry.individuals.length})`);
  }
}

// Save
fs.writeFileSync(pFile, JSON.stringify(pd, null, 2));
fs.writeFileSync(jFile, JSON.stringify(jd, null, 2));

// Verify
const totalPeople = Object.keys(pd.people).length;
let totalEntries = 0;
for (const c in jd.countries) totalEntries += jd.countries[c].length;

console.log(`\n=== expandData54 RESULTS ===`);
console.log(`Entries updated: ${updatedEntries}`);
console.log(`New people added: ${newPeople}`);
console.log(`Total people in DB: ${totalPeople}`);
console.log(`Total entries: ${totalEntries}`);

// Verify all targeted entries now have individuals
let sparse = 0;
for (const entryId of Object.keys(individualsMap)) {
  const idx = caIndex[entryId];
  if (idx !== undefined) {
    const cnt = (caEntries[idx].individuals || []).length;
    if (cnt <= 1) { console.log(`STILL SPARSE: ${entryId} (${cnt})`); sparse++; }
  }
}
console.log(`Still sparse: ${sparse}`);
