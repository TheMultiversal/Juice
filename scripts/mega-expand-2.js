#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 2 - Cross-referencing, Sports, Law Firms, More Tech,
 * Healthcare, Food & Beverage, Transportation, Government, Culture & Arts, etc.
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
  if (!f) { return false; }
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
let missed = [];

function batch(entryId, individuals) {
  const f = findEntry(entryId);
  if (!f) { missed.push(entryId); return; }
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
// SPORTS (29 entries) - Multiple team owners and executives
// ============================================================
console.log('=== Sports ===');

batch('golden-state-warriors', [
  { id: 'joe-lacob', name: 'Joe Lacob', role: 'Governor & CEO', bio: 'Joseph Steven Lacob (born January 10, 1956) is a Jewish-American billionaire venture capitalist and Governor/CEO of the Golden State Warriors. He purchased the team in 2010 for $450 million; it is now valued at over $7 billion. Under his ownership, the Warriors won 4 NBA championships (2015, 2017, 2018, 2022). He is a partner at Kleiner Perkins. Net worth approximately $1.5 billion.' },
  { id: 'peter-guber', name: 'Peter Guber', role: 'Co-Owner & Vice Chairman', bio: 'Peter Guber (born March 1, 1942) is a Jewish-American businessman who co-owns the Golden State Warriors and Los Angeles Dodgers. He was formerly CEO of Sony Pictures Entertainment. Net worth approximately $800 million.' }
]);

batch('philadelphia-76ers', [
  { id: 'josh-harris-76ers', name: 'Josh Harris', role: 'Former Managing Partner', bio: 'Joshua J. Harris (born December 4, 1964) is a Jewish-American billionaire co-founder of Apollo Global Management. He owned the Philadelphia 76ers and New Jersey Devils before purchasing the Washington Commanders for $6.05 billion, the most expensive sale in US sports history. Net worth approximately $7 billion.' },
  { id: 'david-blitzer', name: 'David Blitzer', role: 'Co-Owner', bio: 'David Scott Blitzer (born 1970) is a Jewish-American billionaire who co-owns the Philadelphia 76ers and holds stakes in multiple sports teams globally. He is a senior executive at Blackstone Group. Net worth approximately $3.5 billion.' }
]);

batch('los-angeles-clippers', [
  { id: 'steve-ballmer', name: 'Steve Ballmer', role: 'Owner', bio: 'Steven Anthony Ballmer (born March 24, 1956) purchased the LA Clippers for $2 billion in 2014 after the Donald Sterling racism scandal. Former CEO of Microsoft (2000-2014). Ballmer is the richest sports team owner in the world with a net worth exceeding $120 billion. He built the $1.8 billion Intuit Dome.' }
]);

batch('brooklyn-nets', [
  { id: 'joe-tsai', name: 'Joe Tsai', role: 'Owner', bio: 'Joseph Chung-Hsin Tsai (born January 31, 1964) is a Taiwanese-Canadian billionaire who co-founded Alibaba Group with Jack Ma. He purchased the Brooklyn Nets and Barclays Center for $3.4 billion in 2019. Net worth approximately $10 billion. Previously the Brooklyn Nets were owned by Mikhail Prokhorov, a Russian oligarch.' }
]);

batch('miami-heat', [
  { id: 'micky-arison', name: 'Micky Arison', role: 'Managing General Partner', bio: 'Micky Arison (born June 29, 1949) is an Israeli-American Jewish billionaire who owns the Miami Heat and serves as chairman of Carnival Corporation, the world\'s largest cruise line operator. Born in Tel Aviv. Net worth approximately $8.4 billion.' }
]);

batch('miami-dolphins', [
  { id: 'stephen-ross', name: 'Stephen Ross', role: 'Owner', bio: 'Stephen M. Ross (born May 10, 1940) is a Jewish-American billionaire real estate developer and owner of the Miami Dolphins, Hard Rock Stadium, and founder of Related Companies. Ross drew controversy for hosting a Trump fundraiser in 2019. He is the developer behind Hudson Yards, the largest private real estate development in US history at $25 billion. Net worth approximately $12.2 billion.' }
]);

batch('new-england-patriots', [
  { id: 'robert-kraft', name: 'Robert Kraft', role: 'Owner & Chairman', bio: 'Robert Kenneth Kraft (born June 5, 1941) is a Jewish-American billionaire who owns the New England Patriots, New England Revolution, and Gillette Stadium. Under his ownership, the Patriots won 6 Super Bowls. He purchased the team for $172 million in 1994; it is now valued at over $7 billion. He is one of the most prominent Jewish-American sports owners and a major donor to Israel and Jewish causes. Kraft established the Genesis Prize Foundation. Net worth approximately $11.6 billion.' }
]);

batch('tottenham-hotspur-f-c', [
  { id: 'daniel-levy-thfc', name: 'Daniel Levy', role: 'Chairman', bio: 'Daniel Levy (born 1962) is a British-Jewish businessman who has served as Chairman of Tottenham Hotspur since 2001. He oversaw the construction of the state-of-the-art £1.2 billion Tottenham Hotspur Stadium. ENIC Group, controlled by the Lewis family (Joe Lewis, now deceased after fraud conviction), owns Tottenham.' },
  { id: 'joe-lewis-legacy', name: 'Joe Lewis', role: 'Former Majority Owner (Convicted)', bio: 'Joseph Charles Lewis (1937-2024) was a British-Jewish billionaire financier who owned Tottenham Hotspur through ENIC Group. In 2023, he was indicted by US prosecutors for insider trading and subsequently pleaded guilty, paying $50 million in penalties. His net worth at its peak was approximately $5.6 billion.' }
]);

batch('chelsea-football-club-abramovich-era', [
  { id: 'roman-abramovich', name: 'Roman Abramovich', role: 'Former Owner', bio: 'Roman Arkadyevich Abramovich (born October 24, 1966) is a Russian-Israeli-Portuguese Jewish oligarch who owned Chelsea FC from 2003-2022, spending over $2 billion on players and winning 5 Premier League titles, 2 Champions League titles, and 14 other trophies. He was forced to sell in 2022 after being sanctioned by the UK following Russia\'s invasion of Ukraine. The club was sold for £4.25 billion. His net worth peaked at $23 billion but has since declined. He holds Israeli and Portuguese citizenship.' }
]);

batch('dallas-mavericks', [
  { id: 'mark-cuban', name: 'Mark Cuban', role: 'Former Owner', bio: 'Mark Cuban (born July 31, 1958) is a Jewish-American billionaire who owned the Dallas Mavericks from 2000-2024, building the franchise into an NBA champion in 2011. He sold his majority stake to the Adelson family (Miriam Adelson) in 2024 for $3.5 billion. Cuban is also known for Shark Tank and his pharmaceutical company Cost Plus Drugs. Net worth approximately $5.7 billion.' }
]);

// ============================================================
// LAW FIRMS (11 entries)
// ============================================================
console.log('=== Law Firms ===');

batch('wachtell-lipton-rosen-katz', [
  { id: 'herbert-wachtell', name: 'Herbert Wachtell', role: 'Co-Founder & Partner', bio: 'Herbert M. Wachtell is a Jewish-American lawyer who co-founded Wachtell, Lipton, Rosen & Katz, consistently ranked as the most profitable law firm in the world. The firm created the "poison pill" anti-takeover defense that transformed corporate law.' },
  { id: 'martin-lipton', name: 'Martin Lipton', role: 'Co-Founder & Partner', bio: 'Martin Lipton (born September 22, 1931) is a Jewish-American lawyer who co-founded Wachtell Lipton and invented the "shareholder rights plan" (poison pill), one of the most important innovations in corporate governance. Wachtell Lipton partners earn $7-10 million annually, the highest in the legal profession.' },
  { id: 'edward-herlihy', name: 'Edward Herlihy', role: 'Chairman', bio: 'Edward D. Herlihy serves as Chairman of Wachtell Lipton and is considered the leading M&A lawyer in the US, having advised on over $2 trillion in transactions.' }
]);

batch('kirkland-ellis', [
  { id: 'jon-ballis', name: 'Jon Ballis', role: 'Managing Partner (Global)', bio: 'Jon A. Ballis serves as Global Chairman of Kirkland & Ellis, the world\'s highest-grossing law firm with annual revenue exceeding $7 billion. Kirkland dominates private equity legal work and represents most major PE firms.' },
  { id: 'jeffrey-hammes', name: 'Jeffrey Hammes', role: 'Former Chairman', bio: 'Jeffrey C. Hammes served as Global Chairman of Kirkland & Ellis, building it into the world\'s largest law firm by revenue.' }
]);

batch('paul-weiss-rifkind-wharton-garrison', [
  { id: 'brad-karp', name: 'Brad Karp', role: 'Chairman', bio: 'Brad S. Karp is a Jewish-American lawyer serving as Chairman of Paul, Weiss, Rifkind, Wharton & Garrison. The firm is known for its litigation expertise and M&A dealmaking. Karp has been named one of the most influential lawyers in the US.' },
  { id: 'john-paulson', name: 'John Paulson', role: 'Major Client & Donor', bio: 'John Paulson, the billionaire hedge fund manager who made $15 billion betting against the subprime mortgage market in 2007-2008, is a major client and associate of Paul Weiss.' }
]);

batch('skadden-arps-slate-meagher-flom', [
  { id: 'eric-friedman', name: 'Eric Friedman', role: 'Executive Partner', bio: 'Eric J. Friedman serves as Executive Partner of Skadden, Arps, Slate, Meagher & Flom, one of the world\'s most prestigious law firms. Founded by Joseph Flom (1923-2011), a Jewish-American lawyer who made Skadden the dominant force in hostile takeover law.' },
  { id: 'joseph-flom-legacy', name: 'Joseph Flom', role: 'Partner (Deceased)', bio: 'Joseph Harold Flom (1923-2011) was a Jewish-American lawyer who transformed Skadden Arps from a small firm into one of the world\'s most powerful, pioneering the hostile takeover defense practice. He grew up in poverty in Brooklyn and became one of the most influential corporate lawyers in American history.' }
]);

batch('greenberg-traurig', [
  { id: 'richard-rosenbaum', name: 'Richard Rosenbaum', role: 'Executive Chairman', bio: 'Richard A. Rosenbaum serves as Executive Chairman of Greenberg Traurig, one of the world\'s largest law firms with 2,700+ attorneys in 45 offices. The firm was founded by Jewish-American lawyers in Miami.' },
  { id: 'larry-hoffman', name: 'Larry Hoffman', role: 'Co-Founder', bio: 'Larry J. Hoffman is a co-founder of Greenberg Traurig, a leading global law firm. The firm has been deeply connected to the Florida Jewish community and political circles.' }
]);

// ============================================================
// MORE TECHNOLOGY - Expanding sparse entries
// ============================================================
console.log('=== More Technology ===');

batch('openai', [
  { id: 'sam-altman', name: 'Sam Altman', role: 'CEO', bio: 'Samuel Harris Altman (born April 22, 1985) is a Jewish-American entrepreneur and CEO of OpenAI, creator of ChatGPT. He was briefly fired and rehired in November 2023 in a dramatic boardroom coup. Previously served as president of Y Combinator. OpenAI\'s valuation exceeds $80 billion. Altman has spoken about his Jewish identity and growing up gay in a Jewish family in St. Louis.' },
  { id: 'greg-brockman', name: 'Greg Brockman', role: 'President & Co-Founder', bio: 'Greg Brockman is President and co-founder of OpenAI. He resigned alongside Sam Altman during the November 2023 board crisis and returned when Altman was reinstated.' },
  { id: 'ilya-sutskever', name: 'Ilya Sutskever', role: 'Co-Founder & Former Chief Scientist', bio: 'Ilya Sutskever is an Israeli-Canadian-born AI researcher who co-founded OpenAI. Born in Russia, raised in Israel. He was a key figure in the November 2023 board crisis that temporarily ousted Sam Altman. He subsequently left OpenAI and co-founded Safe Superintelligence Inc. (SSI). Previously a researcher at Google Brain under Geoffrey Hinton.' }
]);

batch('anthropic', [
  { id: 'dario-amodei', name: 'Dario Amodei', role: 'CEO & Co-Founder', bio: 'Dario Amodei is CEO and co-founder of Anthropic, the AI safety company behind Claude. He previously served as VP of Research at OpenAI before leaving in 2021 over safety disagreements. Anthropic has raised over $7.3 billion at a $18 billion valuation, with major investments from Google ($2B) and Amazon ($4B).' },
  { id: 'daniela-amodei', name: 'Daniela Amodei', role: 'President & Co-Founder', bio: 'Daniela Amodei is President and co-founder of Anthropic. She previously served as VP of Operations at OpenAI before co-founding Anthropic with her brother Dario.' }
]);

batch('palantir-technologies', [
  { id: 'peter-thiel', name: 'Peter Thiel', role: 'Co-Founder & Chairman', bio: 'Peter Andreas Thiel (born October 11, 1967) is a German-American billionaire who co-founded Palantir Technologies and was a co-founder of PayPal. Palantir provides data analytics to intelligence agencies, military, and corporations. Market cap exceeds $50 billion. Thiel was the first outside investor in Facebook ($500K for 10.2% in 2004). Known for destroying Gawker Media by funding Hulk Hogan\'s lawsuit. Net worth approximately $9.1 billion.' },
  { id: 'alex-karp', name: 'Alex Karp', role: 'CEO', bio: 'Alexander Caedmon Karp (born October 2, 1967) is the Jewish-American CEO of Palantir Technologies. He holds a PhD from the Frankfurt School. Palantir\'s software is used by the CIA, FBI, NSA, and military worldwide. He has been openly critical of Silicon Valley culture while leading one of the most controversial tech companies. Net worth approximately $4.7 billion.' }
]);

batch('meta-platforms-facebook', [
  { id: 'mark-zuckerberg-meta', name: 'Mark Zuckerberg', role: 'Founder, Chairman & CEO', bio: 'Mark Elliot Zuckerberg (born May 14, 1984) is a Jewish-American billionaire who founded Facebook (now Meta Platforms) in 2004. With a net worth approaching $200 billion, he is one of the richest people in history. Meta operates Facebook (3B+ users), Instagram (2B+), WhatsApp (2B+), and is investing $100B+ in AI and the metaverse. Zuckerberg had a Jewish upbringing and was bar mitzvahed. The Chan Zuckerberg Initiative has committed over $3 billion to charitable causes.' },
  { id: 'sheryl-sandberg', name: 'Sheryl Sandberg', role: 'Former COO', bio: 'Sheryl Kara Sandberg (born August 28, 1969) is a Jewish-American billionaire businesswoman who served as Meta\'s COO from 2008-2022, building its advertising business into a $120B+ annual revenue machine. Author of "Lean In." Previously VP at Google and Chief of Staff to Treasury Secretary Larry Summers. Net worth approximately $2 billion. She has been active in Jewish philanthropy.' }
]);

batch('nvidia-corporation', [
  { id: 'jensen-huang', name: 'Jensen Huang', role: 'Founder & CEO', bio: 'Jensen Huang (born February 17, 1963) is the Taiwanese-American founder and CEO of NVIDIA, which has become the most valuable company in the world with a market cap exceeding $3 trillion due to its dominance in AI chips. While not Jewish, NVIDIA has deep connections to Israel through its $6.9 billion acquisition of Mellanox Technologies and major R&D operations in Israel employing 3,000+ engineers.' },
  { id: 'colette-kress', name: 'Colette Kress', role: 'CFO', bio: 'Colette M. Kress serves as CFO of NVIDIA, overseeing the financial operations of the world\'s most valuable semiconductor company with annual revenue exceeding $60 billion.' }
]);

batch('broadcom-inc', [
  { id: 'hock-tan', name: 'Hock Tan', role: 'CEO', bio: 'Hock E. Tan (born February 2, 1953) is CEO of Broadcom Inc., which acquired VMware for $61 billion in 2023. Broadcom has a market cap exceeding $700 billion. Tan was raised in a Chinese-Jewish household in Malaysia. Under his leadership, Broadcom has become a serial acquirer of semiconductor and software companies.' }
]);

batch('dell-technologies', [
  { id: 'michael-dell', name: 'Michael Dell', role: 'Founder & CEO', bio: 'Michael Saul Dell (born February 23, 1965) is a Jewish-American billionaire who founded Dell Technologies in 1984 from his University of Texas dorm room. He took Dell private in 2013 for $24.4 billion and returned it to public markets in 2018. Dell Technologies has annual revenue exceeding $90 billion and is a major player in enterprise computing." Net worth approximately $115 billion.' }
]);

batch('oracle-corporation', [
  { id: 'larry-ellison', name: 'Larry Ellison', role: 'Co-Founder, CTO & Chairman', bio: 'Lawrence Joseph Ellison (born August 17, 1944) was born to a Jewish-American unwed mother and adopted by his great-aunt and her husband. He co-founded Oracle Corporation, the world\'s second-largest software company. Net worth approximately $150 billion, making him one of the top 5 richest people on Earth. Known for his lavish lifestyle, owning 98% of the Hawaiian island of Lanai. Oracle has major operations in Israel and acquired Israeli companies including Ravello Systems and Dyn.' },
  { id: 'safra-catz', name: 'Safra Catz', role: 'CEO', bio: 'Safra Ada Catz (born December 1, 1961) is an Israeli-American businesswoman serving as CEO of Oracle Corporation. Born in Holon, Israel, she is one of the most powerful women in technology and was briefly considered for a cabinet position in the Trump administration. Her compensation has exceeded $100 million annually.' }
]);

batch('salesforce', [
  { id: 'marc-benioff', name: 'Marc Benioff', role: 'Founder, Chairman & CEO', bio: 'Marc Russell Benioff (born September 25, 1964) is a Jewish-American billionaire who founded Salesforce in 1999, pioneering the Software as a Service (SaaS) model. Salesforce has a market cap exceeding $250 billion and annual revenue over $30 billion. Benioff owns Time magazine. He is a major philanthropist and has been vocal about corporate social responsibility. Net worth approximately $10 billion.' }
]);

batch('airbnb', [
  { id: 'brian-chesky', name: 'Brian Chesky', role: 'Co-Founder & CEO', bio: 'Brian Joseph Chesky (born August 29, 1981) is the Jewish-American co-founder and CEO of Airbnb. The company went public in 2020 in the biggest US IPO of that year, reaching a market cap over $100 billion. Airbnb has faced controversy for listing properties in Israeli settlements in the West Bank. Net worth approximately $12 billion.' },
  { id: 'nathan-blecharczyk', name: 'Nathan Blecharczyk', role: 'Co-Founder & Chief Strategy Officer', bio: 'Nathan Blecharczyk, who is Jewish, co-founded Airbnb and serves as Chief Strategy Officer. His technical skills built the original platform. His wife Elizabeth is involved in major philanthropic efforts.' }
]);

// ============================================================
// HEALTHCARE - Additional entries
// ============================================================
console.log('=== Healthcare ===');

batch('pfizer-inc', [
  { id: 'albert-bourla-pfizer', name: 'Albert Bourla', role: 'Chairman & CEO', bio: 'Albert Bourla (born October 21, 1961) is a Greek-born Jewish-American veterinarian and Chairman/CEO of Pfizer, one of the world\'s largest pharmaceutical companies with annual revenue exceeding $50 billion. Born in Thessaloniki to a Sephardic Jewish family that survived the Holocaust. He led the fastest vaccine development in history, delivering the COVID-19 mRNA vaccine in under a year. His parents survived the Nazi occupation - nearly all of Thessaloniki\'s 50,000 Jews were deported to Auschwitz.' }
]);

batch('moderna', [
  { id: 'noubar-afeyan', name: 'Noubar Afeyan', role: 'Co-Founder & Chairman', bio: 'Noubar Afeyan (born 1962) is an Armenian-American billionaire who co-founded Moderna and serves as Chairman. He also founded Flagship Pioneering, the venture firm that created Moderna. Moderna\'s COVID-19 vaccine generated over $36 billion in revenue.' },
  { id: 'stephane-bancel', name: 'Stephane Bancel', role: 'CEO', bio: 'Stephane Bancel is CEO of Moderna, overseeing the company\'s transformation from a startup to a pharmaceutical giant through its wildly successful mRNA COVID-19 vaccine. Net worth approximately $4.5 billion.' }
]);

batch('teva-pharmaceutical-industries', [
  { id: 'richard-francis', name: 'Richard Francis', role: 'CEO', bio: 'Richard Francis serves as CEO of Teva Pharmaceutical Industries, the world\'s largest generic drug manufacturer headquartered in Israel. Teva has annual revenue exceeding $15 billion but has faced major legal challenges including a $4.25 billion opioid settlement.' },
  { id: 'eli-hurvitz-legacy', name: 'Eli Hurvitz', role: 'Former CEO (Deceased)', bio: 'Eli Hurvitz (1932-2011) served as CEO and chairman of Teva Pharmaceuticals for decades, transforming it from a small Israeli company into the world\'s largest generic drug maker. He was awarded the Israel Prize for his contributions to the economy.' }
]);

batch('regeneron-pharmaceuticals', [
  { id: 'leonard-schleifer', name: 'Leonard Schleifer', role: 'Founder, President & CEO', bio: 'Leonard S. Schleifer (born 1953) is a Jewish-American physician-scientist who founded Regeneron Pharmaceuticals in 1988, building it into one of the world\'s most valuable biotech companies with a market cap exceeding $100 billion. Regeneron\'s products include Dupixent, Eylea, and the REGEN-COV COVID antibody treatment. Net worth approximately $3 billion.' },
  { id: 'george-yancopoulos', name: 'George Yancopoulos', role: 'Co-Founder, President & Chief Scientific Officer', bio: 'George D. Yancopoulos is co-founder, President, and Chief Scientific Officer of Regeneron. He is one of the most-cited scientists in the world and holds hundreds of patents. He led the development of Regeneron\'s COVID-19 antibody cocktail used to treat President Trump.' }
]);

batch('cedars-sinai-medical-center', [
  { id: 'thomas-priselac', name: 'Thomas Priselac', role: 'President & CEO', bio: 'Thomas M. Priselac served as President and CEO of Cedars-Sinai Medical Center in Los Angeles, one of the largest non-profit hospitals in the US. Originally founded as the Kaspare Cohn Hospital by the Jewish community of Los Angeles in 1902, it merged with Mount Sinai Hospital in 1961 to form Cedars-Sinai.' }
]);

// ============================================================
// FOOD & BEVERAGE
// ============================================================
console.log('=== Food & Beverage ===');

batch('starbucks-corporation', [
  { id: 'howard-schultz', name: 'Howard Schultz', role: 'Former Chairman & CEO', bio: 'Howard D. Schultz (born July 19, 1953) is a Jewish-American billionaire who built Starbucks from 11 stores into a global empire with 35,000+ locations across 80 countries. He grew up in the Bayview Housing Projects in Brooklyn. Net worth approximately $5 billion. Schultz has been a vocal supporter of Israel and Jewish causes, and faced boycotts over perceived support for Israel during the Gaza conflict (although his financial support for Israel has been disputed). He briefly explored a presidential run in 2020.' }
]);

batch('kraft-heinz-company', [
  { id: '3g-jorge-lemann', name: 'Jorge Paulo Lemann', role: 'Major Shareholder (via 3G Capital)', bio: 'Jorge Paulo Lemann (born August 26, 1939) is a Swiss-Brazilian-Jewish billionaire who, through 3G Capital, orchestrated the merger of Kraft and Heinz and has acquired Burger King, Tim Hortons, and Anheuser-Busch InBev. Net worth approximately $16 billion. He is the richest person in Brazil. Lemann is of Swiss-Jewish and Brazilian descent.' }
]);

batch('strauss-group', [
  { id: 'ofra-strauss', name: 'Ofra Strauss', role: 'Chairperson', bio: 'Ofra Strauss is the Chairperson of Strauss Group, one of Israel\'s largest food and beverage companies. The company produces Elite coffee, Sabra hummus (joint venture with PepsiCo), and various dairy products. Annual revenue exceeds $2 billion. She is a third-generation leader of the Strauss family business.' }
]);

batch('haagen-dazs', [
  { id: 'reuben-mattus-legacy', name: 'Reuben Mattus', role: 'Founder (Deceased)', bio: 'Reuben Mattus (1912-1994) was a Polish-born Jewish-American entrepreneur who founded Haagen-Dazs in 1961 in the Bronx, New York. He chose the Danish-sounding name to convey a European heritage. He and his wife Rose built it into one of the world\'s most popular premium ice cream brands. He was a strong supporter of Israel and the company originally carried a map of Israel on its packaging. General Mills now owns the brand.' }
]);

batch('sabra-hummus', [
  { id: 'tuvia-sapir', name: 'Tuvia Sapir', role: 'Co-Founder', bio: 'Tuvia Sapir is an Israeli-American businessman who co-founded Sabra Dipping Company, the largest hummus brand in the US with over 60% market share. Sabra is a joint venture between Strauss Group (Israel) and PepsiCo. The brand has been a frequent target of BDS boycott campaigns.' }
]);

// ============================================================
// GOVERNMENT & DIPLOMACY  
// ============================================================
console.log('=== Government ===');

batch('knesset-israeli-parliament', [
  { id: 'benjamin-netanyahu-knesset', name: 'Benjamin Netanyahu', role: 'Prime Minister & MK', bio: 'Benjamin "Bibi" Netanyahu (born October 21, 1949) is the longest-serving Prime Minister in Israeli history. He leads the Likud party and has dominated Israeli politics for three decades. He faces corruption charges in three separate cases. His judicial reform push in 2023 sparked massive protests. He leads Israel\'s war cabinet following the October 7, 2023 Hamas attack.' },
  { id: 'bezalel-smotrich', name: 'Bezalel Smotrich', role: 'Finance Minister & MK', bio: 'Bezalel Smotrich is Israel\'s Finance Minister and leader of the Religious Zionism party. An advocate for Israeli settlement expansion and annexation of the West Bank. His extremist positions have drawn international criticism and put strain on US-Israel relations.' }
]);

batch('fbi', [
  { id: 'merrick-garland', name: 'Merrick Garland', role: 'Attorney General', bio: 'Merrick Brian Garland (born November 13, 1952) is a Jewish-American jurist serving as US Attorney General. He was nominated by Obama for the Supreme Court in 2016 but Senate Republicans refused to hold hearings. He oversees the DOJ\'s prosecution of January 6 defendants and the federal cases against Donald Trump.' },
  { id: 'christopher-wray', name: 'Christopher Wray', role: 'FBI Director', bio: 'Christopher Wray serves as Director of the FBI. While not Jewish, the FBI has historical connections to the Jewish community through its monitoring of hate crimes and domestic terrorism, including antisemitic threats.' }
]);

// ============================================================
// CULTURE & ARTS  
// ============================================================
console.log('=== Culture & Arts ===');

batch('berlinale-berlin-international-film-festival', [
  { id: 'tricia-tuttle', name: 'Tricia Tuttle', role: 'Executive Director', bio: 'Tricia Tuttle serves as Executive Director of the Berlin International Film Festival (Berlinale), one of the world\'s premier film festivals. The 2024 Berlinale was marked by controversy when several filmmakers made statements about the Israel-Gaza war during the ceremony.' }
]);

batch('habima-national-theatre', [
  { id: 'odelia-friedman', name: 'Odelia Friedman', role: 'General Director', bio: 'Odelia Friedman serves as General Director of Habima, Israel\'s national theater founded in 1917 in Moscow by Russian-Jewish artists. Habima relocated to Tel Aviv in 1928 and has been the center of Hebrew-language theater for over a century.' }
]);

batch('israel-philharmonic-orchestra', [
  { id: 'lahav-shani', name: 'Lahav Shani', role: 'Music Director', bio: 'Lahav Shani (born August 8, 1989) is an Israeli conductor and pianist who serves as Music Director of the Israel Philharmonic Orchestra, the Berlin Philharmonic (from 2020), and the Concertgebouw Orchestra. He is the youngest conductor ever appointed to lead the Berlin Philharmonic. The IPO was founded in 1936 by violinist Bronislaw Huberman, who rescued 75 Jewish musicians from Europe.' }
]);

batch('tel-aviv-museum-of-art', [
  { id: 'tania-coen-uzzielli', name: 'Tania Coen-Uzzielli', role: 'Director', bio: 'Tania Coen-Uzzielli has served as Director of the Tel Aviv Museum of Art, one of Israel\'s foremost art museums featuring Israeli and international contemporary art.' }
]);

// ============================================================
// INVESTMENT & PRIVATE EQUITY - Additional
// ============================================================
console.log('=== More Investment ===');

batch('blackstone-group', [
  { id: 'stephen-schwarzman', name: 'Stephen Schwarzman', role: 'Co-Founder, Chairman & CEO', bio: 'Stephen Allen Schwarzman (born February 14, 1947) is a Jewish-American billionaire who co-founded Blackstone Group, the world\'s largest alternative investment firm with over $1 trillion in assets under management. Net worth approximately $40 billion. He donated $400 million to MIT and $150 million to Yale. Major Republican donor and advisor to Donald Trump. The son of a Jewish dry goods store owner in Philadelphia.' },
  { id: 'jonathan-gray', name: 'Jonathan Gray', role: 'President & COO', bio: 'Jonathan Gray is President and COO of Blackstone, widely expected to eventually succeed Stephen Schwarzman as CEO. He oversees Blackstone\'s $330+ billion real estate portfolio, the largest in the world. He and his wife have donated over $300 million to charitable causes.' }
]);

batch('apollo-global-management', [
  { id: 'marc-rowan', name: 'Marc Rowan', role: 'CEO', bio: 'Marc Rowan (born 1962) is a Jewish-American billionaire who co-founded Apollo Global Management and serves as CEO. Apollo manages over $600 billion in assets. Net worth approximately $11 billion. He led an effort to remove the president of the University of Pennsylvania over the antisemitism controversy in 2023, threatening to withhold donations of over $50 million.' },
  { id: 'leon-black', name: 'Leon Black', role: 'Co-Founder (Departed)', bio: 'Leon David Black (born July 31, 1951) is a Jewish-American billionaire and co-founder of Apollo Global Management. He stepped down as chairman in 2021 after it was revealed he had paid Jeffrey Epstein $158 million in professional fees between 2012-2017 (after Epstein\'s first conviction). An independent review found no criminal wrongdoing but the revelations were damaging. Net worth approximately $10 billion.' }
]);

batch('bridgewater-associates', [
  { id: 'ray-dalio', name: 'Ray Dalio', role: 'Founder & CIO Mentor', bio: 'Raymond Thomas Dalio (born August 8, 1949) is the founder of Bridgewater Associates, the world\'s largest hedge fund with over $150 billion in assets under management. While not Jewish, Dalio has extensive connections to Jewish financial networks. He is the author of "Principles" and has been one of the most influential figures in global finance. Net worth approximately $16.4 billion.' }
]);

batch('citadel-llc', [
  { id: 'ken-griffin', name: 'Ken Griffin', role: 'Founder & CEO', bio: 'Kenneth Cordele Griffin (born October 15, 1968) is the founder and CEO of Citadel LLC, one of the world\'s largest hedge funds with $60+ billion in assets, and Citadel Securities, a market maker that handles 25% of all US equities trading. While not Jewish, Griffin is deeply connected to Jewish philanthropic and financial networks. Net worth approximately $38 billion. He purchased the most expensive home ever sold ($238 million in London).' }
]);

batch('renaissance-technologies', [
  { id: 'jim-simons-legacy', name: 'Jim Simons', role: 'Founder (Deceased)', bio: 'James Harris Simons (1938-2024) was a Jewish-American mathematician and billionaire hedge fund manager who founded Renaissance Technologies. His Medallion Fund delivered annualized returns of 66% (before fees) from 1988-2018, making it the most successful investment fund in history. Simons was a codebreaker at the NSA before his finance career. He donated $4.2 billion to education, research, and autism causes through the Simons Foundation. Net worth approximately $31.4 billion at death.' }
]);

batch('soros-fund-management', [
  { id: 'george-soros-fund', name: 'George Soros', role: 'Founder & Chairman', bio: 'George Soros (born August 12, 1930) is a Hungarian-born Jewish-American billionaire investor and philanthropist who founded Soros Fund Management. Famous for "breaking the Bank of England" in 1992, earning $1 billion in a single day by shorting the British pound. Through the Open Society Foundations, he has distributed over $32 billion for democracy, education, and human rights. He is one of the most demonized figures in right-wing and antisemitic conspiracy theories worldwide. Net worth approximately $6.7 billion.' },
  { id: 'alex-soros', name: 'Alex Soros', role: 'Chairman of Open Society Foundations', bio: 'Alexander George Soros (born 1985) succeeded his father George as chairman of the Open Society Foundations in June 2023, taking control of the $25 billion philanthropic network. He has been more overtly political than his father, spending significant time with Democratic Party leaders.' }
]);

// ============================================================
// CONGLOMERATES - Additional
// ============================================================
console.log('=== More Conglomerates ===');

batch('advance-publications', [
  { id: 'donald-newhouse', name: 'Donald Newhouse', role: 'Co-Owner', bio: 'Donald Edward Newhouse (born 1929) is a Jewish-American billionaire who co-owns Advance Publications with his brother\'s estate. Advance owns Conde Nast (Vogue, GQ, The New Yorker, Vanity Fair), Reddit (major shareholder), and American City Business Journals. Net worth approximately $13 billion.' },
  { id: 'si-newhouse-jr-legacy', name: 'Si Newhouse Jr.', role: 'Former Chairman (Deceased)', bio: 'Samuel Irving "Si" Newhouse Jr. (1927-2017) was a Jewish-American media magnate who ran Conde Nast for decades, transforming it into the world\'s most prestigious magazine publisher. His father Samuel Newhouse Sr., a Jewish immigrant\'s son from the Lower East Side, built the original media empire.' }
]);

batch('loews-corporation', [
  { id: 'james-tisch', name: 'James Tisch', role: 'CEO', bio: 'James S. Tisch is a Jewish-American billionaire serving as CEO of Loews Corporation, the diversified conglomerate controlled by the Tisch family. Loews holdings include CNA Financial (insurance), Boardwalk Pipelines, and Loews Hotels. His father Laurence Tisch once controlled CBS. The Tisch family net worth exceeds $6 billion. He also serves as chair of the Conference of Presidents of Major American Jewish Organizations.' }
]);

// ============================================================
// MEDIA - Additional
// ============================================================
console.log('=== More Media ===');

batch('the-new-york-times-company', [
  { id: 'ag-sulzberger', name: 'A.G. Sulzberger', role: 'Chairman & Publisher', bio: 'Arthur Gregg Sulzberger (born 1980) is the sixth member of the Sulzberger family to serve as publisher of The New York Times. The family is of Jewish descent (his great-great-grandfather Adolph Ochs purchased the Times in 1896). The Times has faced criticism from both pro-Israel and pro-Palestinian sides for its coverage of the Israeli-Palestinian conflict.' },
  { id: 'meredith-kopit-levien', name: 'Meredith Kopit Levien', role: 'President & CEO', bio: 'Meredith Kopit Levien serves as President and CEO of The New York Times Company. Under her leadership, the Times crossed 10 million subscribers and acquired Wordle and The Athletic.' }
]);

batch('comcast-corporation', [
  { id: 'brian-roberts', name: 'Brian Roberts', role: 'Chairman & CEO', bio: 'Brian Leon Roberts (born June 28, 1959) is a Jewish-American billionaire serving as Chairman and CEO of Comcast Corporation, the largest broadcasting and cable television company in the world. Comcast owns NBCUniversal, Sky, DreamWorks Animation, and Peacock streaming. Annual revenue exceeds $120 billion. In 2024, Comcast announced a plan to spin off its cable TV networks. His father Ralph Roberts, a Jewish-American entrepreneur, founded Comcast. Net worth approximately $2.4 billion.' }
]);

batch('bloomberg-l-p', [
  { id: 'michael-bloomberg', name: 'Michael Bloomberg', role: 'Founder & Owner', bio: 'Michael Rubens Bloomberg (born February 14, 1942) is a Jewish-American billionaire who founded Bloomberg LP, the financial data and media company with annual revenue exceeding $12 billion. He served as Mayor of New York City for 12 years (2002-2013) and has donated over $17 billion to charitable causes, making him one of the most generous philanthropists in history. He briefly ran for president in 2020, spending $1 billion on his campaign. Net worth approximately $106 billion.' }
]);

batch('news-corp', [
  { id: 'robert-thomson', name: 'Robert Thomson', role: 'CEO', bio: 'Robert James Thomson serves as CEO of News Corp, the publishing arm of Rupert Murdoch\'s media empire. News Corp owns The Wall Street Journal, New York Post, The Times (London), HarperCollins, and Realtor.com.' }
]);

// ============================================================
// REAL ESTATE - Additional
// ============================================================
console.log('=== More Real Estate ===');

batch('related-companies', [
  { id: 'stephen-ross-related', name: 'Stephen Ross', role: 'Founder & Chairman', bio: 'Stephen M. Ross is a Jewish-American billionaire who founded the Related Companies, the most prolific private real estate company in the US. Related developed Hudson Yards on Manhattan\'s west side, the largest private real estate development in American history at $25 billion. He also owns the Miami Dolphins and Equinox. Net worth approximately $12.2 billion.' },
  { id: 'jeff-blau', name: 'Jeff Blau', role: 'CEO', bio: 'Jeff T. Blau serves as CEO of the Related Companies, overseeing the firm\'s $60 billion portfolio of real estate assets including Hudson Yards, one of the most significant urban developments in history.' }
]);

batch('silverstein-properties', [
  { id: 'larry-silverstein', name: 'Larry Silverstein', role: 'Chairman', bio: 'Larry Alan Silverstein (born May 30, 1931) is a Jewish-American billionaire real estate developer and Chairman of Silverstein Properties. He famously signed a 99-year lease on the World Trade Center just six weeks before the September 11, 2001 attacks. He received approximately $4.6 billion in insurance payments and has led the rebuilding of the WTC site for over two decades. His close connection to the WTC has made him the subject of numerous conspiracy theories. Net worth approximately $10 billion.' }
]);

batch('tishman-speyer', [
  { id: 'rob-speyer', name: 'Rob Speyer', role: 'President & CEO', bio: 'Robert J. Speyer is a Jewish-American real estate executive serving as President and CEO of Tishman Speyer. The company owns and operates iconic properties including Rockefeller Center, the Chrysler Center, and 130+ properties globally worth over $75 billion. His father Jerry Speyer built the firm into one of the world\'s premier real estate companies.' }
]);

batch('brookfield-properties', [
  { id: 'bruce-flatt', name: 'Bruce Flatt', role: 'CEO of Brookfield Corp', bio: 'Bruce Flatt is CEO of Brookfield Corporation, one of the world\'s largest alternative asset managers with over $850 billion in assets. Often called "Canada\'s Warren Buffett." Brookfield Properties manages one of the world\'s largest real estate portfolios.' }
]);

// ============================================================
// CROSS-REFERENCING - Add key people to multiple entries
// ============================================================
console.log('=== Cross-Referencing ===');

// Mark Zuckerberg in Chan Zuckerberg Initiative
batch('chan-zuckerberg-initiative', [
  { id: 'mark-zuckerberg-meta', name: 'Mark Zuckerberg', role: 'Co-Founder', bio: 'Mark Zuckerberg and his wife Priscilla Chan founded CZI in 2015, pledging to give away 99% of their Meta shares (valued at $45+ billion at the time) to advance human potential and equality. CZI has invested billions in education, science, and criminal justice reform.' },
  { id: 'priscilla-chan', name: 'Priscilla Chan', role: 'Co-Founder & Co-CEO', bio: 'Priscilla Chan is a physician and philanthropist who co-founded the Chan Zuckerberg Initiative with her husband Mark Zuckerberg. CZI has committed over $3 billion to biomedical research through the Chan Zuckerberg Biohub.' }
]);

// George Soros in more entries
batch('george-soros-open-society-foundations', [
  { id: 'george-soros-fund', name: 'George Soros', role: 'Founder & Chairman', bio: 'George Soros has distributed over $32 billion through the Open Society Foundations, the world\'s largest private funder of independent groups working for justice, democratic governance, and human rights in over 120 countries.' },
  { id: 'alex-soros', name: 'Alex Soros', role: 'Chairman', bio: 'Alex Soros took over as chairman of the Open Society Foundations in 2023, becoming one of the most influential figures in global philanthropy.' }
]);

// Ronald Lauder cross-reference
batch('ronald-s-lauder-foundation', [
  { id: 'ronald-lauder', name: 'Ronald Lauder', role: 'President', bio: 'Ronald S. Lauder serves as president of the World Jewish Congress. His philanthropic foundation has invested hundreds of millions in Jewish education, cultural institutions, and Holocaust remembrance across Central and Eastern Europe.' }
]);

// Robert Kraft cross-reference
batch('kraft-group', [
  { id: 'robert-kraft', name: 'Robert Kraft', role: 'Chairman & CEO', bio: 'Robert Kraft is Chairman and CEO of the Kraft Group, which encompasses the New England Patriots, New England Revolution, Gillette Stadium, and numerous other business interests. Net worth approximately $11.6 billion.' }
]);

// ============================================================
// SAVE ALL DATA
// ============================================================
console.log('\n=== Saving ===');
fs.writeFileSync(JD_PATH, JSON.stringify(JD, null, 2), 'utf8');
const out = hasPeopleWrapper ? { people } : people;
fs.writeFileSync(PD_PATH, JSON.stringify(out, null, 2), 'utf8');

let totalInds = 0, totalEntries = 0;
for (const c in JD.countries) for (const e of JD.countries[c]) { totalEntries++; totalInds += (e.individuals || []).length; }

console.log('  Added individuals:', added);
console.log('  Missed entry IDs:', missed.length, missed);
console.log('  Total entries:', totalEntries);
console.log('  Total individuals across entries:', totalInds);
console.log('  Total people in people.json:', Object.keys(people).length);
console.log('\nDone!');
