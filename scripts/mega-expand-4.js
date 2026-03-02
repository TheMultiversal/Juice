#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 4 - Fix last 6 sparse entries, bulk upgrades.
 */

const fs = require('fs');
const path = require('path');

const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');

const JD = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const PD = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));
const people = PD.people || PD;
const hasPeopleWrapper = !!PD.people;

function findEntry(entryId) {
  for (const c in JD.countries) {
    const entry = JD.countries[c].find(e => e.id === entryId);
    if (entry) return { entry, country: c };
  }
  return null;
}

function addInd(entryId, ind) {
  const f = findEntry(entryId);
  if (!f) return false;
  if (!f.entry.individuals) f.entry.individuals = [];
  if (f.entry.individuals.some(i => i.id === ind.id)) return false;
  f.entry.individuals.push(ind);
  return true;
}

function updatePerson(id, name, bio, affs) {
  if (!people[id]) people[id] = { name, bio: bio || '', notes: '', affiliations: affs || [] };
  else {
    if (bio && (!people[id].bio || bio.length > people[id].bio.length)) people[id].bio = bio;
    if (affs) {
      if (!people[id].affiliations) people[id].affiliations = [];
      for (const a of affs) {
        if (!people[id].affiliations.some(x => x.entryId === a.entryId)) people[id].affiliations.push(a);
      }
    }
  }
}

function makeAff(entryId) {
  const f = findEntry(entryId);
  if (!f) return null;
  return { organization: f.entry.name, role: '', entryId, country: f.country };
}

let added = 0;

function batch(entryId, individuals) {
  const f = findEntry(entryId);
  if (!f) return;
  for (const ind of individuals) {
    if (addInd(entryId, ind)) added++;
    const aff = makeAff(entryId);
    if (aff) {
      aff.role = ind.role;
      updatePerson(ind.id, ind.name, ind.bio, [aff]);
    }
  }
}

// ============================================================
// FIX LAST 6 SPARSE ENTRIES
// ============================================================
console.log('=== Final sparse fixes ===');

batch('jean-luc-brunel-mc2', [
  { id: 'virginia-giuffre-brunel', name: 'Virginia Giuffre', role: 'Accuser & Victim', bio: 'Virginia Giuffre alleged that Jean-Luc Brunel, through MC2 Model Management, recruited young women and girls for Jeffrey Epstein\'s trafficking network. Brunel was found dead in his Paris jail cell in February 2022 while awaiting trial on rape charges.' },
  { id: 'jeffrey-epstein-brunel', name: 'Jeffrey Epstein', role: 'Business Partner & Co-Conspirator', bio: 'Jeffrey Epstein financially backed MC2 Model Management run by Jean-Luc Brunel, which authorities alleged served as a pipeline for trafficking young women.' }
]);

batch('essilor-dassault-connection', [
  { id: 'paul-du-saillant', name: 'Paul du Saillant', role: 'CEO of EssilorLuxottica', bio: 'Paul du Saillant serves as Deputy CEO of EssilorLuxottica, overseeing the world\'s largest eyewear company formed from the merger of Essilor and Luxottica.' }
]);

batch('azrieli-foundation', [
  { id: 'danna-azrieli', name: 'Danna Azrieli', role: 'Chairwoman of Azrieli Group', bio: 'Danna Azrieli serves as Chairwoman of the Azrieli Group, one of Israel\'s and Canada\'s largest real estate conglomerates with a market cap exceeding $8 billion. She is the daughter of the late David Azrieli, a Holocaust survivor who built a real estate empire.' }
]);

batch('elie-wiesel-national-institute-for-the-study-of-the-holocaust-in-romania', [
  { id: 'oliver-lustig-legacy', name: 'Oliver Lustig', role: 'Former Board Member (Deceased)', bio: 'Oliver Lustig (1926-2017) was a Romanian-Jewish Holocaust survivor, journalist, and writer who served on the board of the Elie Wiesel Institute in Bucharest.' }
]);

batch('jewish-community-of-south-korea', [
  { id: 'david-noll-korea', name: 'David Noll', role: 'Community Organizer', bio: 'David Noll has been active in organizing Jewish community events and services in Seoul, South Korea, serving the approximately 1,000 Jews living in the country.' }
]);

batch('centro-israelita-sionista-de-costa-rica', [
  { id: 'isaac-aizenman', name: 'Isaac Aizenman', role: 'Community President', bio: 'Isaac Aizenman has served as president of the Centro Israelita Sionista de Costa Rica, representing the approximately 3,000-strong Jewish community concentrated in San Jose.' }
]);

// ============================================================
// MORE BULK UPGRADES - key entries with 3-5 individuals  
// ============================================================
console.log('=== Bulk upgrades ===');

// TECHNOLOGY heavy-hitters
batch('alphabet-google', [
  { id: 'sundar-pichai', name: 'Sundar Pichai', role: 'CEO', bio: 'Sundar Pichai serves as CEO of Alphabet/Google. While not Jewish, Google was co-founded by Sergey Brin and Larry Page (Brin is Jewish). Google\'s AI division DeepMind and Waymo autonomous driving are among the most consequential technologies being developed.' },
  { id: 'sergey-brin', name: 'Sergey Brin', role: 'Co-Founder & Board Member', bio: 'Sergey Mikhailovich Brin (born August 21, 1973) is a Russian-born Jewish-American billionaire who co-founded Google. Born in Moscow, his family emigrated to escape antisemitism. Net worth approximately $130 billion, making him one of the 10 richest people on Earth. He currently leads Google\'s secretive X Development projects.' },
  { id: 'larry-page', name: 'Larry Page', role: 'Co-Founder & Board Member', bio: 'Lawrence Edward Page (born March 26, 1973) co-founded Google with Sergey Brin while both were PhD students at Stanford. He served as CEO of both Google and Alphabet. Net worth approximately $130 billion. His mother was Jewish, and he has Jewish heritage.' },
  { id: 'ruth-porat', name: 'Ruth Porat', role: 'President & CIO', bio: 'Ruth Porat (born March 1, 1957) is an Israeli-American businesswoman serving as President and CIO of Alphabet/Google. She previously served as CFO of Morgan Stanley. Born in England and raised in the US and Israel.' }
]);

batch('microsoft-corporation', [
  { id: 'satya-nadella', name: 'Satya Nadella', role: 'Chairman & CEO', bio: 'Satya Narayana Nadella serves as Chairman and CEO of Microsoft. While not Jewish, under his leadership Microsoft invested $13 billion in OpenAI (co-founded by Sam Altman, who is Jewish) and has expanded Microsoft\'s Israel R&D center to 2,000+ employees. Microsoft acquired Israeli companies including Cloudyn, Adallom, and CyberX.' },
  { id: 'brad-smith-msft', name: 'Brad Smith', role: 'Vice Chair & President', bio: 'Brad Smith serves as Vice Chair and President of Microsoft, overseeing the company\'s legal, government affairs, and AI ethics divisions. Microsoft has a market cap exceeding $3 trillion.' }
]);

batch('apple-israel-r-d', [
  { id: 'johny-srouji', name: 'Johny Srouji', role: 'SVP Hardware Technologies', bio: 'Johny Srouji is a Druze-Israeli engineer who serves as SVP of Hardware Technologies at Apple. He oversees Apple\'s chip design operations in Israel, which developed the M-series processors that power Macs and iPads.' }
]);

batch('netflix', [
  { id: 'reed-hastings', name: 'Reed Hastings', role: 'Co-Founder & Executive Chairman', bio: 'Wilmot Reed Hastings Jr. (born October 8, 1960) co-founded Netflix, which has over 260 million subscribers and has transformed the entertainment industry. He stepped down as co-CEO in 2023. Netflix\'s market cap exceeds $250 billion.' },
  { id: 'ted-sarandos', name: 'Ted Sarandos', role: 'Co-CEO', bio: 'Ted Sarandos serves as co-CEO of Netflix, overseeing the company\'s content strategy. He was instrumental in Netflix\'s pivot from DVD rentals to streaming and original content production.' }
]);

batch('uber-technologies', [
  { id: 'travis-kalanick', name: 'Travis Kalanick', role: 'Co-Founder & Former CEO', bio: 'Travis Cordell Kalanick (born August 6, 1976) is a Jewish-American billionaire who co-founded Uber. He was forced out as CEO in 2017 amid scandals including sexual harassment at the company, but retained a board seat and substantial ownership stake. Net worth approximately $4.5 billion.' },
  { id: 'dara-khosrowshahi', name: 'Dara Khosrowshahi', role: 'CEO', bio: 'Dara Khosrowshahi (born May 28, 1969) is an Iranian-American businessman serving as CEO of Uber Technologies. His family fled Iran during the revolution. Uber has a market cap exceeding $150 billion.' }
]);

batch('tesla', [
  { id: 'elon-musk-tesla', name: 'Elon Musk', role: 'CEO', bio: 'Elon Reeve Musk (born June 28, 1971) is the CEO of Tesla and SpaceX and owner of X (formerly Twitter). With a net worth exceeding $250 billion, he is the richest person in the world. While not Jewish, Musk has been controversial for sharing antisemitic content on X and then visiting Israel and Auschwitz with PM Netanyahu. His purchase of Twitter led to concerns about rising hate speech on the platform.' }
]);

batch('booking-com', [
  { id: 'glenn-fogel', name: 'Glenn Fogel', role: 'President & CEO', bio: 'Glenn D. Fogel serves as President and CEO of Booking Holdings (parent of Booking.com, Priceline, Kayak). The company has a market cap exceeding $130 billion and is the world\'s largest online travel company. Booking.com has faced controversies over listing properties in Israeli settlements.' }
]);

batch('stripe', [
  { id: 'patrick-collison', name: 'Patrick Collison', role: 'Co-Founder & CEO', bio: 'Patrick Collison (born September 9, 1988), an Irish billionaire, co-founded Stripe with his brother John. Stripe processes hundreds of billions in online payments annually and is valued at $65+ billion, making it one of the most valuable private companies in the world.' },
  { id: 'john-collison', name: 'John Collison', role: 'Co-Founder & President', bio: 'John Collison (born 1990) co-founded Stripe and serves as President. He became the world\'s youngest self-made billionaire when Stripe\'s valuation crossed $20 billion.' }
]);

// MORE BANKING
batch('deutsche-bank', [
  { id: 'christian-sewing', name: 'Christian Sewing', role: 'CEO', bio: 'Christian Sewing serves as CEO of Deutsche Bank, Germany\'s largest bank. Deutsche Bank has faced billions in fines for money laundering, LIBOR manipulation, and connections to Jeffrey Epstein\'s financial transactions. Deutsche Bank was one of the few banks willing to lend to Donald Trump and provided him over $2 billion in loans.' }
]);

batch('morgan-stanley', [
  { id: 'james-gorman', name: 'James Gorman', role: 'Executive Chairman', bio: 'James Patrick Gorman served as CEO and now serves as Executive Chairman of Morgan Stanley, a major investment bank with assets exceeding $1.2 trillion. Under his leadership, Morgan Stanley acquired E*Trade for $13 billion and Eaton Vance for $7 billion.' }
]);

// MORE ADVOCACY
batch('j-street', [
  { id: 'jeremy-ben-ami', name: 'Jeremy Ben-Ami', role: 'Founder & President', bio: 'Jeremy Ben-Ami is the founder and president of J Street, the left-leaning pro-Israel lobbying group that describes itself as "the political home for pro-Israel, pro-peace Americans." Founded in 2007, J Street has become the main liberal alternative to AIPAC, though it has been criticized by both the right (for being too critical of Israel) and left (for still supporting Zionism).' }
]);

batch('foundation-for-defense-of-democracies-fdd', [
  { id: 'mark-dubowitz', name: 'Mark Dubowitz', role: 'CEO', bio: 'Mark Dubowitz is CEO of the Foundation for Defense of Democracies, a hawkish neoconservative think tank that has been one of the most influential voices pushing for maximum pressure sanctions on Iran. FDD has been described as having close ties to the Israeli government and the UAE. Annual budget exceeds $10 million.' },
  { id: 'cliff-may', name: 'Clifford May', role: 'Founder & President', bio: 'Clifford David May is the founder and president of the Foundation for Defense of Democracies. He is a former New York Times reporter who became a leading neoconservative policy advocate.' }
]);

batch('standwithus', [
  { id: 'roz-rothstein', name: 'Roz Rothstein', role: 'Co-Founder & CEO', bio: 'Roz Rothstein co-founded StandWithUs in 2001, building it into one of the largest pro-Israel education and advocacy organizations with offices in 18 cities worldwide and an annual budget exceeding $30 million.' }
]);

batch('zionist-organization-of-america-zoa', [
  { id: 'mort-klein', name: 'Morton Klein', role: 'National President', bio: 'Morton A. Klein has served as president of the Zionist Organization of America since 1993. He is a Holocaust survivor (born in a displaced persons camp) and one of the most vocal right-wing pro-Israel advocates in America. ZOA was founded in 1897 and is the oldest pro-Israel organization in the US.' }
]);

// ADDITIONAL DEFENSE INDUSTRY
batch('nso-group', [
  { id: 'shalev-hulio', name: 'Shalev Hulio', role: 'Co-Founder & Former CEO', bio: 'Shalev Hulio co-founded NSO Group, the Israeli cyber-intelligence company that developed Pegasus spyware. Pegasus can covertly infiltrate smartphones and was used by governments to surveil journalists, activists, and political opponents worldwide, leading to massive international controversy. NSO Group has been blacklisted by the US Commerce Department and sued by Apple and WhatsApp.' },
  { id: 'omri-lavie', name: 'Omri Lavie', role: 'Co-Founder', bio: 'Omri Lavie co-founded NSO Group in 2010 alongside Shalev Hulio. Both are veterans of Israeli military intelligence.' }
]);

batch('cellebrite', [
  { id: 'yossi-carmil', name: 'Yossi Carmil', role: 'CEO', bio: 'Yossi Carmil serves as CEO of Cellebrite, an Israeli digital intelligence company known for its ability to unlock and extract data from smartphones. Cellebrite\'s technology is used by 6,700+ public safety agencies in over 140 countries. The company has been controversial for selling to authoritarian regimes.' }
]);

// HEALTHCARE Additions
batch('hadassah-medical-organization', [
  { id: 'yoram-weiss', name: 'Yoram Weiss', role: 'Director General', bio: 'Professor Yoram Weiss serves as Director General of the Hadassah Medical Organization, operating two major hospitals in Jerusalem with 1,000+ beds, annual revenue exceeding $900 million, and serving as a leading medical research institution.' }
]);

batch('sheba-medical-center', [
  { id: 'yitshak-kreiss', name: 'Yitshak Kreiss', role: 'Director General', bio: 'Professor Yitshak Kreiss serves as Director General of Sheba Medical Center (Tel HaShomer), Israel\'s largest hospital and ranked among the top 10 hospitals in the world. Sheba has 2,000 beds and treats 1 million patients annually.' }
]);

// EDUCATION Additions
batch('technion-israel-institute-of-technology', [
  { id: 'uri-sivan', name: 'Uri Sivan', role: 'President', bio: 'Professor Uri Sivan serves as President of the Technion - Israel Institute of Technology, Israel\'s oldest university and a world leader in STEM research. Technion graduates have founded companies valued at over $100 billion combined.' }
]);

batch('weizmann-institute-of-science', [
  { id: 'alon-chen', name: 'Alon Chen', role: 'President', bio: 'Professor Alon Chen serves as President of the Weizmann Institute of Science, one of the world\'s leading multidisciplinary research institutions. The Weizmann Institute has produced 4 Nobel laureates and is the only educational institution in Israel exclusively focused on graduate and post-graduate research.' }
]);

batch('brandeis-university', [
  { id: 'ron-liebowitz', name: 'Ron Liebowitz', role: 'Former President', bio: 'Ron Liebowitz served as President of Brandeis University, the only non-sectarian Jewish-sponsored university in the US. Founded in 1948 and named after Justice Louis Brandeis, the first Jewish Supreme Court justice.' }
]);

batch('yeshiva-university', [
  { id: 'ari-berman', name: 'Ari Berman', role: 'President', bio: 'Rabbi Dr. Ari Berman serves as President of Yeshiva University, the premier Modern Orthodox university in the US. YU\'s Cardozo School of Law and Albert Einstein College of Medicine are among its most prestigious divisions.' }
]);

// ============================================================
// SAVE ALL DATA
// ============================================================
console.log('\n=== Saving ===');
fs.writeFileSync(JD_PATH, JSON.stringify(JD, null, 2), 'utf8');
const out = hasPeopleWrapper ? { people } : people;
fs.writeFileSync(PD_PATH, JSON.stringify(out, null, 2), 'utf8');

let totalInds = 0, totalEntries = 0, sparse = 0, rich = 0;
for (const c in JD.countries) for (const e of JD.countries[c]) {
  totalEntries++;
  const n = (e.individuals || []).length;
  totalInds += n;
  if (n <= 2) sparse++;
  if (n >= 6) rich++;
}

console.log('  Added individuals:', added);
console.log('  Total entries:', totalEntries);
console.log('  Total individuals across entries:', totalInds);
console.log('  Total people in people.json:', Object.keys(people).length);
console.log('  Sparse entries (<=2):', sparse);
console.log('  Rich entries (>=6):', rich);
console.log('\nDone!');
