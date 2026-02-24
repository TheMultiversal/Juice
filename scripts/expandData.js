// Massive data expansion script - adds hundreds more entries to existing data
// Run AFTER generateFullData.js: node scripts/expandData.js
// Adds: law firms, real estate, sports, fashion, VC, think tanks, more tech, more media, etc.

const fs = require('fs');
const path = require('path');

const jewishFile = path.join(__dirname, '..', 'data', 'jewish.json');
const peopleFile = path.join(__dirname, '..', 'data', 'people.json');

const data = JSON.parse(fs.readFileSync(jewishFile, 'utf8'));
const people = JSON.parse(fs.readFileSync(peopleFile, 'utf8'));

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Track existing IDs to avoid duplicates
const existingIds = new Set();
for (const country of Object.values(data.countries)) {
  for (const entry of country) {
    existingIds.add(entry.id);
  }
}

function addEntry(country, entry) {
  if (!data.countries[country]) data.countries[country] = [];
  entry.id = slugify(entry.name);
  if (existingIds.has(entry.id)) return; // skip duplicates
  existingIds.add(entry.id);
  if (!entry.individuals) entry.individuals = [];
  entry.individuals.forEach(ind => {
    const pid = slugify(ind.name);
    ind.id = pid;
    if (!people.people[pid]) {
      people.people[pid] = { name: ind.name, bio: ind.bio || '', notes: '' };
    } else if (ind.bio && ind.bio.length > (people.people[pid].bio || '').length) {
      people.people[pid].bio = ind.bio;
    }
  });
  data.countries[country].push(entry);
}

const us = "United States";
const il = "Israel";
const uk = "United Kingdom";
const fr = "France";
const de = "Germany";
const ca = "Canada";
const au = "Australia";
const ru = "Russia";
const za = "South Africa";
const br = "Brazil";
const ar = "Argentina";

// ============================================================
// UNITED STATES - EXPANSION
// ============================================================

// --- Law Firms ---
addEntry(us, { name: "Wachtell, Lipton, Rosen & Katz", type: "law firm", description: "Elite New York law firm specializing in corporate law, M&A, and litigation. Founded 1965.", website: "https://www.wlrk.com/", individuals: [{ name: "Herbert Wachtell", role: "Co-founder", bio: "Co-founder of Wachtell Lipton, pioneered the 'poison pill' defense." }, { name: "Martin Lipton", role: "Co-founder", bio: "Corporate lawyer credited with inventing the shareholder rights plan." }] });
addEntry(us, { name: "Skadden, Arps, Slate, Meagher & Flom", type: "law firm", description: "One of the highest-grossing law firms in the world, known for M&A and corporate work.", website: "https://www.skadden.com/", individuals: [{ name: "Joseph Flom", role: "Founding Partner (1923-2011)", bio: "Pioneer of hostile takeover law, transformed Skadden into a powerhouse." }] });
addEntry(us, { name: "Paul, Weiss, Rifkind, Wharton & Garrison", type: "law firm", description: "Major international law firm based in New York.", website: "https://www.paulweiss.com/", individuals: [] });
addEntry(us, { name: "Fried, Frank, Harris, Shriver & Jacobson", type: "law firm", description: "International law firm based in New York, founded 1971.", website: "https://www.friedfrank.com/", individuals: [] });
addEntry(us, { name: "Greenberg Traurig", type: "law firm", description: "Global law firm with over 2,750 attorneys across 47 offices.", website: "https://www.gtlaw.com/", individuals: [] });
addEntry(us, { name: "Kasowitz Benson Torres", type: "law firm", description: "Litigation-focused law firm based in New York.", website: "https://www.kasowitz.com/", individuals: [{ name: "Marc Kasowitz", role: "Founding Partner", bio: "Founding partner, known as a litigator for high-profile clients." }] });
addEntry(us, { name: "Proskauer Rose", type: "law firm", description: "International law firm headquartered in New York, founded 1875.", website: "https://www.proskauer.com/", individuals: [] });
addEntry(us, { name: "Schulte Roth & Zabel", type: "law firm", description: "Law firm focused on investment management, M&A, and finance.", website: "https://www.srz.com/", individuals: [] });

// --- Real Estate ---
addEntry(us, { name: "Brookfield Asset Management", type: "real estate/asset management", description: "Global alternative asset management company managing over $900B.", website: "https://www.brookfield.com/", individuals: [{ name: "Bruce Flatt", role: "CEO", bio: "CEO of Brookfield Asset Management." }] });
addEntry(us, { name: "Related Companies", type: "real estate", description: "Privately held real estate firm, developer of Hudson Yards in NYC.", website: "https://www.related.com/", individuals: [{ name: "Stephen Ross", role: "Founder & Chairman", bio: "Billionaire real estate developer, owner of the Miami Dolphins." }] });
addEntry(us, { name: "Vornado Realty Trust", type: "real estate investment trust", description: "One of the largest owners of commercial real estate in the US.", website: "https://www.vno.com/", individuals: [{ name: "Steven Roth", role: "Chairman & CEO", bio: "Chairman and CEO of Vornado Realty Trust." }] });
addEntry(us, { name: "Tishman Speyer", type: "real estate", description: "Global real estate developer and owner, built Rockefeller Center renovations.", website: "https://www.tishmanspeyer.com/", individuals: [{ name: "Rob Speyer", role: "President & CEO", bio: "President and CEO of Tishman Speyer." }] });
addEntry(us, { name: "Kushner Companies", type: "real estate", description: "Real estate development company based in New York.", website: "https://www.kushnercompanies.com/", individuals: [{ name: "Jared Kushner", role: "Former CEO", bio: "Former CEO, served as Senior Advisor to President Trump." }, { name: "Charles Kushner", role: "Founder", bio: "Founder of Kushner Companies." }] });
addEntry(us, { name: "SL Green Realty Corp", type: "real estate investment trust", description: "Largest office landlord in Manhattan.", website: "https://slgreen.com/", individuals: [{ name: "Marc Holliday", role: "CEO", bio: "CEO of SL Green Realty." }] });
addEntry(us, { name: "Silverstein Properties", type: "real estate", description: "Developer of the World Trade Center complex rebuilding.", website: "https://www.silversteinproperties.com/", individuals: [{ name: "Larry Silverstein", role: "Chairman", bio: "Chairman of Silverstein Properties, leaseholder of the original WTC." }] });
addEntry(us, { name: "LeFrak Organization", type: "real estate", description: "Family-owned real estate firm, one of the largest in New York.", website: "https://www.lefrak.com/", individuals: [{ name: "Richard LeFrak", role: "Chairman & CEO", bio: "Chairman of the LeFrak Organization." }] });
addEntry(us, { name: "Extell Development Company", type: "real estate", description: "NYC-based real estate developer of luxury residential and commercial properties.", website: "https://www.extelldev.com/", individuals: [{ name: "Gary Barnett", role: "Founder & Chairman", bio: "Founder and chairman of Extell Development." }] });
addEntry(us, { name: "RXR Realty", type: "real estate", description: "Vertically integrated real estate operating company in the New York area.", website: "https://rxr.com/", individuals: [{ name: "Scott Rechler", role: "Chairman & CEO", bio: "Chairman and CEO of RXR Realty." }] });
addEntry(us, { name: "Boston Properties", type: "real estate investment trust", description: "One of the largest publicly traded developers and owners of Class A office space.", website: "https://www.bostonproperties.com/", individuals: [{ name: "Mortimer Zuckerman", role: "Co-founder", bio: "Co-founder of Boston Properties, media mogul, owner of NY Daily News." }] });
addEntry(us, { name: "Mack Real Estate Group", type: "real estate", description: "New York-based real estate investment firm.", website: "https://www.mackregroup.com/", individuals: [{ name: "Richard Mack", role: "CEO", bio: "CEO of Mack Real Estate Group." }] });

// --- Venture Capital & Private Equity ---
addEntry(us, { name: "Sequoia Capital", type: "venture capital", description: "Legendary Silicon Valley VC firm backing Apple, Google, and many others.", website: "https://www.sequoiacap.com/", individuals: [{ name: "Michael Moritz", role: "Partner", bio: "Welsh-American billionaire venture capitalist at Sequoia." }] });
addEntry(us, { name: "Andreessen Horowitz (a16z)", type: "venture capital", description: "Major Silicon Valley venture capital firm.", website: "https://a16z.com/", individuals: [{ name: "Marc Andreessen", role: "Co-Founder", bio: "Co-creator of the Mosaic web browser, co-founder of a16z." }, { name: "Ben Horowitz", role: "Co-Founder", bio: "Co-founder of a16z, author of 'The Hard Thing About Hard Things.'" }] });
addEntry(us, { name: "KKR & Co.", type: "private equity", description: "Global investment firm managing multiple alternative asset classes.", website: "https://www.kkr.com/", individuals: [{ name: "Henry Kravis", role: "Co-Founder & Co-Chairman", bio: "Co-founder of KKR, pioneer of the leveraged buyout." }] });
addEntry(us, { name: "Apollo Global Management", type: "private equity", description: "Global alternative investment manager.", website: "https://www.apollo.com/", individuals: [{ name: "Marc Rowan", role: "CEO", bio: "CEO of Apollo Global Management." }, { name: "Leon Black", role: "Co-Founder", bio: "Co-founder of Apollo Global Management." }] });
addEntry(us, { name: "Warburg Pincus", type: "private equity", description: "Global private equity firm focused on growth investing.", website: "https://www.warburgpincus.com/", individuals: [] });
addEntry(us, { name: "Bain Capital", type: "private equity", description: "Private investment firm founded in 1984.", website: "https://www.baincapital.com/", individuals: [] });
addEntry(us, { name: "Cerberus Capital Management", type: "private equity", description: "Private equity firm with $60B+ in assets.", website: "https://www.cerberus.com/", individuals: [{ name: "Stephen Feinberg", role: "Co-Founder & CEO", bio: "Co-founder and CEO of Cerberus Capital Management." }] });
addEntry(us, { name: "Elliott Management Corporation", type: "hedge fund", description: "One of the largest and most successful activist hedge funds.", website: "https://www.elliottmgmt.com/", individuals: [{ name: "Paul Singer", role: "Founder & Co-CEO", bio: "Billionaire hedge fund manager and major Republican donor." }] });
addEntry(us, { name: "Two Sigma Investments", type: "hedge fund", description: "Quantitative hedge fund using AI and machine learning.", website: "https://www.twosigma.com/", individuals: [{ name: "David Siegel", role: "Co-founder", bio: "Co-founder and co-chairman of Two Sigma." }] });
addEntry(us, { name: "D.E. Shaw & Co.", type: "hedge fund", description: "Multinational investment management firm.", website: "https://www.deshaw.com/", individuals: [{ name: "David Shaw", role: "Founder", bio: "Founder of D.E. Shaw, former Columbia University professor." }] });
addEntry(us, { name: "Bridgewater Associates", type: "hedge fund", description: "World's largest hedge fund by AUM. Has employed many Jewish senior executives and invested heavily in Israeli markets.", website: "https://www.bridgewater.com/", individuals: [] });
addEntry(us, { name: "Tiger Global Management", type: "hedge fund", description: "Investment firm focused on public and private companies.", website: "", individuals: [{ name: "Chase Coleman", role: "Founder & Chairman", bio: "Billionaire hedge fund manager." }] });
addEntry(us, { name: "Pershing Square Capital Management", type: "hedge fund", description: "Activist hedge fund founded by Bill Ackman.", website: "https://pershingsquareholdings.com/", individuals: [{ name: "Bill Ackman", role: "Founder & CEO", bio: "Billionaire activist investor and hedge fund manager." }] });

// --- Sports ---
addEntry(us, { name: "New England Patriots (Kraft Group)", type: "sports franchise", description: "NFL franchise owned by the Kraft family.", website: "https://www.patriots.com/", individuals: [{ name: "Robert Kraft", role: "Owner", bio: "Owner of the New England Patriots since 1994." }] });
addEntry(us, { name: "Miami Dolphins (Stephen Ross)", type: "sports franchise", description: "NFL franchise owned by Stephen Ross.", website: "https://www.miamidolphins.com/", individuals: [{ name: "Stephen Ross", role: "Owner", bio: "Owner of the Miami Dolphins and Related Companies." }] });
addEntry(us, { name: "New York Giants (Tisch/Mara)", type: "sports franchise", description: "NFL franchise co-owned by the Tisch family.", website: "https://www.giants.com/", individuals: [{ name: "Steve Tisch", role: "Co-owner & Chairman", bio: "Co-owner of the NY Giants, Academy Award-winning film producer." }] });
addEntry(us, { name: "Washington Commanders (Josh Harris)", type: "sports franchise", description: "NFL franchise purchased by Josh Harris group in 2023.", website: "https://www.commanders.com/", individuals: [{ name: "Josh Harris", role: "Owner", bio: "Co-founder of Apollo Global Management, owner of multiple sports teams." }] });
addEntry(us, { name: "Philadelphia 76ers (Harris Blitzer)", type: "sports franchise", description: "NBA franchise owned by Josh Harris and David Blitzer.", website: "https://www.nba.com/sixers/", individuals: [] });
addEntry(us, { name: "Brooklyn Nets (formerly Ratner)", type: "sports franchise", description: "NBA franchise. Previously owned by Bruce Ratner (Jewish) who brought the team to Brooklyn.", website: "https://www.nba.com/nets/", individuals: [{ name: "Bruce Ratner", role: "Former Owner", bio: "Jewish real estate developer who brought the Nets to Brooklyn." }] });
addEntry(us, { name: "Golden State Warriors (Joe Lacob)", type: "sports franchise", description: "NBA franchise.", website: "https://www.nba.com/warriors/", individuals: [{ name: "Joe Lacob", role: "Owner & Governor", bio: "Venture capitalist and owner of the Golden State Warriors." }] });
addEntry(us, { name: "Los Angeles Clippers (Steve Ballmer)", type: "sports franchise", description: "NBA franchise. Owner Steve Ballmer has Jewish heritage through his mother Beatrice Dworman.", website: "https://www.nba.com/clippers/", individuals: [{ name: "Steve Ballmer", role: "Owner", bio: "Former Microsoft CEO, has Jewish heritage through his mother." }] });
addEntry(us, { name: "Dallas Mavericks (Mark Cuban)", type: "sports franchise", description: "NBA franchise.", website: "https://www.nba.com/mavericks/", individuals: [{ name: "Mark Cuban", role: "Former Owner", bio: "Billionaire entrepreneur and former Mavericks owner." }] });
addEntry(us, { name: "Cleveland Guardians (Larry Dolan)", type: "sports franchise", description: "MLB franchise owned by the Dolan family.", website: "https://www.mlb.com/guardians", individuals: [{ name: "Larry Dolan", role: "Owner", bio: "Owner of the Cleveland Guardians." }] });
addEntry(us, { name: "New York Mets (Steve Cohen)", type: "sports franchise", description: "MLB franchise purchased by Steve Cohen in 2020.", website: "https://www.mlb.com/mets/", individuals: [{ name: "Steve Cohen", role: "Owner", bio: "Hedge fund billionaire and owner of the NY Mets." }] });

// --- Think Tanks ---
addEntry(us, { name: "Brookings Institution", type: "think tank", description: "Prominent American research and policy institution, founded 1916.", website: "https://www.brookings.edu/", individuals: [{ name: "Martin Indyk", role: "Former Executive VP", bio: "Australian-American diplomat and think tank leader." }] });
addEntry(us, { name: "Washington Institute for Near East Policy (WINEP)", type: "think tank", description: "Policy research institute focused on US Middle East policy.", website: "https://www.washingtoninstitute.org/", individuals: [{ name: "Robert Satloff", role: "Executive Director", bio: "Executive Director of the Washington Institute." }] });
addEntry(us, { name: "Council on Foreign Relations", type: "think tank", description: "Non-partisan think tank and publisher focused on US foreign policy.", website: "https://www.cfr.org/", individuals: [] });
addEntry(us, { name: "American Enterprise Institute (AEI)", type: "think tank", description: "Conservative think tank focused on government, politics, economics, and social welfare.", website: "https://www.aei.org/", individuals: [] });
addEntry(us, { name: "Hudson Institute", type: "think tank", description: "Conservative think tank focused on defense, international relations, and economics.", website: "https://www.hudson.org/", individuals: [] });
addEntry(us, { name: "Middle East Media Research Institute (MEMRI)", type: "research institute", description: "Translates and analyzes media from the Middle East.", website: "https://www.memri.org/", individuals: [{ name: "Yigal Carmon", role: "President & Co-Founder", bio: "Former Israeli military intelligence officer, co-founded MEMRI." }] });
addEntry(us, { name: "Foundation for Defense of Democracies (FDD)", type: "think tank", description: "Non-partisan policy institute focused on national security and foreign policy.", website: "https://www.fdd.org/", individuals: [{ name: "Mark Dubowitz", role: "CEO", bio: "CEO of FDD, known for Iran sanctions advocacy." }] });
addEntry(us, { name: "Jewish Institute for National Security of America (JINSA)", type: "think tank", description: "Non-partisan think tank focusing on US-Israel security cooperation.", website: "https://jinsa.org/", individuals: [] });
addEntry(us, { name: "Middle East Forum", type: "think tank", description: "Think tank promoting American interests in the Middle East.", website: "https://www.meforum.org/", individuals: [{ name: "Daniel Pipes", role: "President", bio: "Political commentator and president of the Middle East Forum." }] });

// --- Fashion & Retail ---
addEntry(us, { name: "Ralph Lauren Corporation", type: "fashion", description: "Global fashion house and lifestyle brand.", website: "https://www.ralphlauren.com/", individuals: [{ name: "Ralph Lauren", role: "Founder & Executive Chairman", bio: "Fashion designer who built a global luxury brand." }] });
addEntry(us, { name: "Calvin Klein (PVH Corp)", type: "fashion", description: "Global fashion house known for minimalist aesthetic.", website: "https://www.calvinklein.us/", individuals: [{ name: "Calvin Klein", role: "Founder", bio: "Fashion designer who founded the brand in 1968." }] });
addEntry(us, { name: "Levi Strauss & Co.", type: "fashion/retail", description: "American clothing company known for Levi's jeans, founded in 1853.", website: "https://www.levistrauss.com/", individuals: [{ name: "Levi Strauss", role: "Founder (1829-1902)", bio: "German-American businessman who founded Levi Strauss & Co." }] });
addEntry(us, { name: "Marc Jacobs International", type: "fashion", description: "American fashion designer brand.", website: "https://www.marcjacobs.com/", individuals: [{ name: "Marc Jacobs", role: "Founder", bio: "Fashion designer, former creative director of Louis Vuitton." }] });
addEntry(us, { name: "Michael Kors (Capri Holdings)", type: "fashion", description: "Global luxury fashion brand.", website: "https://www.michaelkors.com/", individuals: [{ name: "Michael Kors", role: "Founder", bio: "Fashion designer who built a global luxury brand." }] });
addEntry(us, { name: "Donna Karan / DKNY", type: "fashion", description: "Iconic American fashion brand.", website: "https://www.donnakaran.com/", individuals: [{ name: "Donna Karan", role: "Founder", bio: "Fashion designer who created Donna Karan New York." }] });
addEntry(us, { name: "Gap Inc.", type: "retail", description: "Global retail company owning Gap, Banana Republic, Old Navy, and Athleta.", website: "https://www.gapinc.com/", individuals: [{ name: "Donald Fisher", role: "Co-founder (1928-2009)", bio: "Co-founded Gap in 1969." }, { name: "Doris Fisher", role: "Co-founder", bio: "Co-founded Gap with her husband Donald." }] });
addEntry(us, { name: "Home Depot", type: "retail", description: "World's largest home improvement retailer.", website: "https://www.homedepot.com/", individuals: [{ name: "Bernie Marcus", role: "Co-founder", bio: "Co-founder of The Home Depot and major philanthropist." }] });
addEntry(us, { name: "Costco Wholesale", type: "retail", description: "Second-largest retailer worldwide. Co-founded by Jeffrey Brotman, who was Jewish.", website: "https://www.costco.com/", individuals: [{ name: "Jeffrey Brotman", role: "Co-founder (1942-2017)", bio: "Jewish co-founder of Costco Wholesale." }] });
addEntry(us, { name: "Revlon", type: "cosmetics", description: "Global cosmetics company co-founded by Charles Revson, who was Jewish.", website: "https://www.revlon.com/", individuals: [{ name: "Charles Revson", role: "Co-founder (1906-1975)", bio: "Jewish co-founder of Revlon." }] });

// --- More Technology ---
addEntry(us, { name: "Qualcomm", type: "technology", description: "Multinational semiconductor and telecommunications equipment company.", website: "https://www.qualcomm.com/", individuals: [{ name: "Irwin Jacobs", role: "Co-Founder", bio: "Co-founded Qualcomm in 1985." }] });
addEntry(us, { name: "Intel Corporation", type: "technology", description: "World's largest semiconductor chip maker.", website: "https://www.intel.com/", individuals: [{ name: "Andrew Grove", role: "Former CEO (1936-2016)", bio: "Hungarian-born CEO who transformed Intel into a tech giant." }] });
addEntry(us, { name: "Broadcom Inc.", type: "technology", description: "Designer, developer and supplier of semiconductor and infrastructure software. Co-founded by Henry Samueli, who is Jewish.", website: "https://www.broadcom.com/", individuals: [{ name: "Henry Samueli", role: "Co-founder & CTO", bio: "Jewish co-founder of Broadcom, owner of the Anaheim Ducks." }] });
addEntry(us, { name: "Nvidia Corporation", type: "technology", description: "Leading GPU and AI chip company. Acquired Israeli company Mellanox Technologies for $6.9B in 2020. Major R&D operations in Israel with 3,000+ employees.", website: "https://www.nvidia.com/", individuals: [] });
addEntry(us, { name: "Salesforce", type: "technology", description: "Enterprise cloud computing company.", website: "https://www.salesforce.com/", individuals: [{ name: "Marc Benioff", role: "Co-founder & CEO", bio: "Co-founder and CEO of Salesforce." }] });
addEntry(us, { name: "Palantir Technologies", type: "technology", description: "Software company specializing in big data analytics for intelligence and defense.", website: "https://www.palantir.com/", individuals: [{ name: "Peter Thiel", role: "Co-Founder", bio: "Billionaire tech entrepreneur, co-founded Palantir and PayPal." }, { name: "Alex Karp", role: "CEO", bio: "CEO of Palantir Technologies." }] });
addEntry(us, { name: "OpenAI", type: "technology/AI", description: "AI research company developing artificial general intelligence.", website: "https://openai.com/", individuals: [{ name: "Sam Altman", role: "CEO", bio: "CEO of OpenAI, former president of Y Combinator." }] });
addEntry(us, { name: "Uber Technologies", type: "technology", description: "Ride-hailing and food delivery technology company.", website: "https://www.uber.com/", individuals: [{ name: "Travis Kalanick", role: "Co-Founder", bio: "Co-founder and former CEO of Uber." }] });
addEntry(us, { name: "Airbnb", type: "technology", description: "Online marketplace for short-term accommodations. Co-founder Nathan Blecharczyk is Jewish. Backed by Jewish investors including Sequoia Capital and Andreessen Horowitz.", website: "https://www.airbnb.com/", individuals: [{ name: "Nathan Blecharczyk", role: "Co-founder & Chief Strategy Officer", bio: "Jewish co-founder of Airbnb." }] });
addEntry(us, { name: "WeWork", type: "real estate/technology", description: "Shared workspace provider.", website: "https://www.wework.com/", individuals: [{ name: "Adam Neumann", role: "Co-Founder", bio: "Israeli-American entrepreneur, co-founded WeWork." }] });
addEntry(us, { name: "Zoom Video Communications", type: "technology", description: "Video conferencing platform. Backed by early investor Emergence Capital (Jewish co-founder Jason Green). Has R&D operations in Israel.", website: "https://zoom.us/", individuals: [] });
addEntry(us, { name: "PayPal", type: "fintech", description: "Online payments system.", website: "https://www.paypal.com/", individuals: [{ name: "Peter Thiel", role: "Co-Founder", bio: "Co-founder of PayPal and Palantir." }, { name: "Max Levchin", role: "Co-Founder", bio: "Ukrainian-born co-founder of PayPal." }] });
addEntry(us, { name: "Stripe", type: "fintech", description: "Technology company processing online payments. Backed by Sequoia Capital, Tiger Global, and other firms with Jewish leadership. Has Israeli engineering operations.", website: "https://stripe.com/", individuals: [] });

// --- More Media / Entertainment ---
addEntry(us, { name: "NBCUniversal (Comcast)", type: "media conglomerate", description: "Major American media conglomerate.", website: "https://www.nbcuniversal.com/", individuals: [{ name: "Brian Roberts", role: "Chairman & CEO (Comcast)", bio: "Chairman and CEO of Comcast, parent of NBCUniversal." }] });
addEntry(us, { name: "Lionsgate Entertainment", type: "entertainment", description: "Film and television studio.", website: "https://www.lionsgate.com/", individuals: [] });
addEntry(us, { name: "A24 Films", type: "entertainment", description: "Independent entertainment company known for acclaimed films.", website: "https://a24films.com/", individuals: [{ name: "Daniel Katz", role: "Co-founder", bio: "Co-founder of A24." }] });
addEntry(us, { name: "CAA (Creative Artists Agency)", type: "talent agency", description: "Leading talent and sports agency in entertainment.", website: "https://www.caa.com/", individuals: [{ name: "Bryan Lourd", role: "Co-Chairman", bio: "Co-Chairman of CAA." }] });
addEntry(us, { name: "WME (William Morris Endeavor)", type: "talent agency", description: "Major talent agency and entertainment company.", website: "https://www.wmeagency.com/", individuals: [{ name: "Ari Emanuel", role: "CEO (Endeavor)", bio: "CEO of Endeavor, one of Hollywood's most powerful agents." }] });
addEntry(us, { name: "ViacomCBS / Paramount Global", type: "media conglomerate", description: "Mass media and entertainment conglomerate.", website: "https://www.paramount.com/", individuals: [{ name: "Sumner Redstone", role: "Founder (1923-2020)", bio: "Media magnate who built Viacom empire." }] });
addEntry(us, { name: "iHeartMedia", type: "media", description: "Largest radio company in the US.", website: "https://www.iheartmedia.com/", individuals: [{ name: "Bob Pittman", role: "Chairman & CEO", bio: "Co-founder of MTV, CEO of iHeartMedia." }] });
addEntry(us, { name: "The New York Times Company", type: "media", description: "Global media organization, publisher of The New York Times.", website: "https://www.nytimes.com/", individuals: [{ name: "A.G. Sulzberger", role: "Publisher & Chairman", bio: "Fifth-generation publisher of The New York Times." }] });
addEntry(us, { name: "Condé Nast", type: "media/publishing", description: "Mass media company publishing Vogue, GQ, Vanity Fair, The New Yorker, and more.", website: "https://www.condenast.com/", individuals: [] });
addEntry(us, { name: "The Washington Post", type: "media", description: "Major American newspaper.", website: "https://www.washingtonpost.com/", individuals: [] });
addEntry(us, { name: "Breitbart News", type: "media", description: "Far-right syndicated news, opinion, and commentary website.", website: "https://www.breitbart.com/", individuals: [{ name: "Andrew Breitbart", role: "Founder (1969-2012)", bio: "Conservative media publisher who founded Breitbart News." }] });

// --- Foundations & Philanthropy ---
addEntry(us, { name: "Charles and Lynn Schusterman Family Philanthropies", type: "foundation", description: "Major Jewish philanthropic foundation supporting Israel and Jewish life.", website: "https://www.schusterman.org/", individuals: [{ name: "Lynn Schusterman", role: "Co-Founder & Chair", bio: "Billionaire philanthropist focusing on Jewish engagement." }] });
addEntry(us, { name: "Jim Joseph Foundation", type: "foundation", description: "Foundation funding Jewish education in the US.", website: "https://jimjosephfoundation.org/", individuals: [] });
addEntry(us, { name: "Maimonides Fund", type: "foundation", description: "Philanthropy supporting Jewish education and Israel-related causes.", website: "", individuals: [] });
addEntry(us, { name: "Marcus Foundation", type: "foundation", description: "Foundation engaging in philanthropy focused on children, medical research, free enterprise, and Jewish causes.", website: "https://www.marcusfound.org/", individuals: [{ name: "Bernie Marcus", role: "Co-founder", bio: "Home Depot co-founder turned philanthropist." }] });
addEntry(us, { name: "Charles Bronfman Foundation", type: "foundation", description: "Philanthropic initiatives promoting Jewish heritage and Canadian-American understanding.", website: "", individuals: [{ name: "Charles Bronfman", role: "Founder", bio: "Canadian-American businessman and philanthropist." }] });
addEntry(us, { name: "Adelson Family Foundation", type: "foundation", description: "Major philanthropic foundation supporting medical research and Jewish causes.", website: "", individuals: [{ name: "Miriam Adelson", role: "Co-Chair", bio: "Israeli-American physician and one of the wealthiest women in the world." }] });
addEntry(us, { name: "Klarman Family Foundation", type: "foundation", description: "Philanthropic foundation focusing on civic participation and Jewish life.", website: "", individuals: [{ name: "Seth Klarman", role: "Founder", bio: "Billionaire investor and founder of Baupost Group." }] });
addEntry(us, { name: "Pritzker Foundation", type: "foundation", description: "Philanthropic organization of the Pritzker family.", website: "", individuals: [{ name: "Penny Pritzker", role: "Chair", bio: "Former US Secretary of Commerce, billionaire businesswoman." }] });
addEntry(us, { name: "Wexner Foundation", type: "foundation", description: "Foundation investing in professional and volunteer Jewish leadership.", website: "https://www.wexnerfoundation.org/", individuals: [{ name: "Leslie Wexner", role: "Founder", bio: "Founder of L Brands (Victoria's Secret), major philanthropist." }] });
addEntry(us, { name: "Ronald S. Lauder Foundation", type: "foundation", description: "Foundation rebuilding Jewish communities in Central and Eastern Europe.", website: "https://lauderfoundation.com/", individuals: [{ name: "Ronald Lauder", role: "President", bio: "Businessman, philanthropist, president of the World Jewish Congress." }] });
addEntry(us, { name: "Tikva Fund", type: "foundation/think tank", description: "Foundation supporting education and intellectual projects in Israel and the US.", website: "https://tikvahfund.org/", individuals: [] });

// --- More Charities ---
addEntry(us, { name: "Friends of the IDF (FIDF) - additional chapters", type: "charity", description: "Major chapters in New York, Los Angeles, and other cities supporting IDF soldiers.", website: "https://www.fidf.org/", individuals: [] });
addEntry(us, { name: "Nefesh B'Nefesh", type: "non-profit", description: "Organization facilitating aliyah (immigration to Israel) from North America and the UK.", website: "https://www.nbn.org.il/", individuals: [{ name: "Rabbi Yehoshua Fass", role: "Co-Founder & Executive Director", bio: "Co-founded Nefesh B'Nefesh in 2002." }] });
addEntry(us, { name: "One Israel Fund", type: "charity", description: "Supports communities in Judea and Samaria (West Bank).", website: "https://oneisraelfund.org/", individuals: [] });
addEntry(us, { name: "Jewish Funders Network", type: "non-profit", description: "International organization of Jewish philanthropists and foundations.", website: "https://www.jfunders.org/", individuals: [] });
addEntry(us, { name: "Magen David Adom USA", type: "charity", description: "US fundraising arm of Israel's national EMS organization.", website: "https://www.mdais.org/", individuals: [] });
addEntry(us, { name: "PJ Library", type: "educational charity", description: "Sends free Jewish-content books to families monthly, funded by the Grinspoon Foundation.", website: "https://pjlibrary.org/", individuals: [{ name: "Harold Grinspoon", role: "Founder", bio: "Real estate developer and philanthropist behind PJ Library." }] });

// --- Medical / Pharma ---
addEntry(us, { name: "Pfizer", type: "pharmaceutical", description: "One of the world's largest pharmaceutical companies.", website: "https://www.pfizer.com/", individuals: [{ name: "Albert Bourla", role: "CEO", bio: "Greek-born veterinarian and CEO of Pfizer, led COVID-19 vaccine development." }] });
addEntry(us, { name: "Moderna", type: "biotechnology", description: "Biotechnology company pioneering mRNA therapeutics and vaccines.", website: "https://www.modernatx.com/", individuals: [] });
addEntry(us, { name: "Regeneron Pharmaceuticals", type: "biotechnology", description: "Biopharmaceutical company focused on drug discovery and development.", website: "https://www.regeneron.com/", individuals: [{ name: "Leonard Schleifer", role: "Founder, President & CEO", bio: "Co-founded Regeneron in 1988." }] });
addEntry(us, { name: "Valeant/Bausch Health", type: "pharmaceutical", description: "Multinational pharmaceutical company.", website: "https://www.bauschhealth.com/", individuals: [] });
addEntry(us, { name: "Taro Pharmaceutical Industries (US)", type: "pharmaceutical", description: "Specialty pharmaceutical company, subsidiary of Sun Pharma.", website: "https://www.taro.com/", individuals: [] });

// --- Consulting ---
addEntry(us, { name: "Cantor Fitzgerald", type: "financial services", description: "Financial services firm. CEO Howard Lutnick is Jewish. Lost 658 employees on 9/11.", website: "https://www.cantor.com/", individuals: [{ name: "Howard Lutnick", role: "Chairman & CEO", bio: "Jewish CEO of Cantor Fitzgerald." }] });
addEntry(us, { name: "Lazard", type: "investment bank", description: "Financial advisory and asset management firm founded in 1848 by three Jewish brothers from France.", website: "https://www.lazard.com/", individuals: [{ name: "Alexandre Lazard", role: "Co-founder (1824-1884)", bio: "French Jewish co-founder of Lazard." }] });

// ============================================================
// ISRAEL - EXPANSION
// ============================================================

// --- More Tech Startups ---
addEntry(il, { name: "Waze", type: "technology", description: "GPS navigation software acquired by Google for $1.1B in 2013.", website: "https://www.waze.com/", individuals: [{ name: "Uri Levine", role: "Co-founder", bio: "Israeli entrepreneur, co-founder of Waze." }, { name: "Ehud Shabtai", role: "Co-founder", bio: "Israeli programmer who originally created FreeMap Israel, which became Waze." }] });
addEntry(il, { name: "Mobileye Global", type: "autonomous driving", description: "Leading autonomous driving technology company. IPO'd at $16.7B in 2022.", website: "https://www.mobileye.com/", individuals: [] });
addEntry(il, { name: "IronSource (merged with Unity)", type: "ad-tech", description: "Israeli tech company specializing in app monetization and distribution.", website: "", individuals: [] });
addEntry(il, { name: "Gett", type: "ride-hailing", description: "Israeli ride-hailing app.", website: "https://www.gett.com/", individuals: [{ name: "Dave Waiser", role: "Founder & CEO", bio: "Russian-Israeli founder of Gett." }] });
addEntry(il, { name: "Via Transportation", type: "transportation tech", description: "Israeli-American transportation technology company.", website: "https://ridewithvia.com/", individuals: [{ name: "Daniel Ramot", role: "Co-Founder & CEO", bio: "Israeli co-founder and CEO of Via." }] });
addEntry(il, { name: "SentinelOne", type: "cybersecurity", description: "AI-powered cybersecurity company.", website: "https://www.sentinelone.com/", individuals: [{ name: "Tomer Weingarten", role: "Co-founder & CEO", bio: "Israeli co-founder of SentinelOne." }] });
addEntry(il, { name: "Snyk", type: "cybersecurity", description: "Developer security platform.", website: "https://snyk.io/", individuals: [{ name: "Guy Podjarny", role: "Co-founder", bio: "Israeli co-founder of Snyk." }] });
addEntry(il, { name: "JFrog", type: "DevOps", description: "Software company providing tools for DevOps.", website: "https://jfrog.com/", individuals: [{ name: "Shlomi Ben Haim", role: "Co-founder & CEO", bio: "Israeli co-founder of JFrog." }] });
addEntry(il, { name: "Lemonade Inc.", type: "insurtech", description: "AI-powered insurance company.", website: "https://www.lemonade.com/", individuals: [{ name: "Daniel Schreiber", role: "Co-founder & CEO", bio: "Israeli-American co-founder of Lemonade." }, { name: "Shai Wininger", role: "Co-founder & COO", bio: "Israeli co-founder of Lemonade." }] });
addEntry(il, { name: "Payoneer", type: "fintech", description: "Financial services company providing online money transfer.", website: "https://www.payoneer.com/", individuals: [{ name: "Yuval Tal", role: "Co-founder", bio: "Israeli co-founder of Payoneer." }] });
addEntry(il, { name: "ironSource (now Unity)", type: "ad-tech", description: "Israeli mobile monetization company merged with Unity in 2022.", website: "", individuals: [] });
addEntry(il, { name: "Taboola", type: "ad-tech", description: "Content discovery platform.", website: "https://www.taboola.com/", individuals: [{ name: "Adam Singolda", role: "Founder & CEO", bio: "Israeli founder and CEO of Taboola." }] });
addEntry(il, { name: "Outbrain", type: "ad-tech", description: "Web recommendation platform.", website: "https://www.outbrain.com/", individuals: [{ name: "Yaron Galai", role: "Co-founder", bio: "Israeli co-founder of Outbrain." }] });
addEntry(il, { name: "Varonis Systems", type: "cybersecurity", description: "Data security and analytics company.", website: "https://www.varonis.com/", individuals: [] });
addEntry(il, { name: "WalkMe", type: "technology", description: "Digital adoption platform.", website: "https://www.walkme.com/", individuals: [{ name: "Dan Adika", role: "Co-founder & CEO", bio: "Israeli co-founder of WalkMe." }] });
addEntry(il, { name: "AppsFlyer", type: "ad-tech", description: "Mobile attribution and marketing analytics platform.", website: "https://www.appsflyer.com/", individuals: [] });
addEntry(il, { name: "Cellebrite", type: "digital intelligence", description: "Provider of digital intelligence solutions for law enforcement.", website: "https://cellebrite.com/", individuals: [] });
addEntry(il, { name: "NSO Group", type: "cybersecurity/surveillance", description: "Controversial Israeli technology firm that developed Pegasus spyware.", website: "https://www.nsogroup.com/", individuals: [{ name: "Shalev Hulio", role: "Co-founder", bio: "Israeli co-founder of NSO Group." }] });
addEntry(il, { name: "Candiru (Saito Tech)", type: "cybersecurity/surveillance", description: "Israeli offensive cybersecurity company.", website: "", individuals: [] });
addEntry(il, { name: "Verint Systems", type: "intelligence/analytics", description: "Software and hardware for communications interception and analytics.", website: "https://www.verint.com/", individuals: [] });
addEntry(il, { name: "NICE Systems", type: "enterprise software", description: "Cloud and on-premises enterprise software solutions.", website: "https://www.nice.com/", individuals: [] });
addEntry(il, { name: "Amdocs", type: "technology", description: "Software and services provider for communications, media, and financial service providers.", website: "https://www.amdocs.com/", individuals: [] });
addEntry(il, { name: "Sapiens International", type: "technology", description: "Technology company providing software for the insurance industry.", website: "https://sapiens.com/", individuals: [] });

// --- Israeli Agriculture/CleanTech ---
addEntry(il, { name: "Netafim", type: "agriculture/technology", description: "World leader in drip irrigation technology, founded on Kibbutz Hatzerim.", website: "https://www.netafim.com/", individuals: [{ name: "Simcha Blass", role: "Inventor (1897-1982)", bio: "Israeli engineer who invented modern drip irrigation." }] });
addEntry(il, { name: "IDE Technologies", type: "water technology", description: "Global leader in water desalination technologies.", website: "https://www.ide-tech.com/", individuals: [] });
addEntry(il, { name: "Mekorot", type: "water utility", description: "Israel's national water company.", website: "https://www.mekorot.co.il/", individuals: [] });

// --- Israeli Settlements/Organizations ---
addEntry(il, { name: "Jewish National Fund - Keren Kayemeth LeIsrael (KKL-JNF)", type: "land development", description: "Responsible for planting forests, developing parks, and managing land in Israel.", website: "https://www.kkl-jnf.org/", individuals: [] });
addEntry(il, { name: "Birthright Israel (Taglit)", type: "educational program", description: "Free 10-day educational trips to Israel for Jewish young adults worldwide.", website: "https://www.birthrightisrael.com/", individuals: [] });
addEntry(il, { name: "Nefesh B'Nefesh (Israel)", type: "immigration", description: "Facilitates aliyah from North America and UK, works with Jewish Agency and Israeli government.", website: "https://www.nbn.org.il/", individuals: [] });
addEntry(il, { name: "Israel Innovation Authority", type: "government agency", description: "Government body promoting technological innovation in Israel.", website: "https://innovationisrael.org.il/", individuals: [] });
addEntry(il, { name: "Start-Up Nation Central", type: "non-profit", description: "Non-profit connecting business, government and NGOs to Israeli innovation.", website: "https://startupnationcentral.org/", individuals: [] });

// --- Israeli Military/Intelligence Ecosystem ---
addEntry(il, { name: "Unit 8200", type: "military/intelligence", description: "IDF's signals intelligence unit, known as a tech startup incubator.", website: "", individuals: [] });
addEntry(il, { name: "Talpiot Program", type: "military/education", description: "Elite IDF training program for exceptional recruits in science and leadership.", website: "", individuals: [] });

// ============================================================
// UNITED KINGDOM - EXPANSION
// ============================================================

addEntry(uk, { name: "Marks & Spencer", type: "retail", description: "Major British multinational retailer founded by Michael Marks and Thomas Spencer.", website: "https://www.marksandspencer.com/", individuals: [{ name: "Michael Marks", role: "Co-founder (1859-1907)", bio: "Polish-born Jewish immigrant who co-founded M&S." }] });
addEntry(uk, { name: "Tesco (Jack Cohen legacy)", type: "retail", description: "Britain's largest supermarket chain, founded by Jack Cohen in 1919.", website: "https://www.tesco.com/", individuals: [{ name: "Jack Cohen", role: "Founder (1898-1979)", bio: "Son of Jewish immigrants from Poland, founded Tesco from a market stall." }] });
addEntry(uk, { name: "N M Rothschild & Sons", type: "investment bank", description: "Historic British investment bank, part of the Rothschild banking family.", website: "https://www.rothschild.com/", individuals: [{ name: "Nathan Mayer Rothschild", role: "Founder (1777-1836)", bio: "Founded the London branch of the Rothschild banking dynasty." }] });
addEntry(uk, { name: "UK Jewish Film Festival", type: "cultural event", description: "Annual Jewish film festival in London and other UK cities.", website: "https://www.ukjewishfilm.org/", individuals: [] });
addEntry(uk, { name: "Wiener Holocaust Library", type: "archive/library", description: "One of the world's leading archives on the Holocaust, founded 1933.", website: "https://www.wienerholocaustlibrary.org/", individuals: [] });
addEntry(uk, { name: "London School of Jewish Studies (LSJS)", type: "education", description: "Centre of Jewish learning in London.", website: "https://www.lsjs.ac.uk/", individuals: [] });
addEntry(uk, { name: "Jews' College / Heythrop Association", type: "education", description: "Historic rabbinical seminary in London.", website: "", individuals: [] });
addEntry(uk, { name: "Union of Jewish Students (UJS)", type: "student organization", description: "Representing Jewish students in the UK and Ireland.", website: "https://www.ujs.org.uk/", individuals: [] });
addEntry(uk, { name: "Chelsea Football Club (Abramovich era)", type: "sports", description: "Premier League football club formerly owned by Roman Abramovich.", website: "https://www.chelseafc.com/", individuals: [{ name: "Roman Abramovich", role: "Former Owner", bio: "Russian-Israeli oligarch who owned Chelsea FC 2003-2022." }] });
addEntry(uk, { name: "Tottenham Hotspur F.C.", type: "sports", description: "Premier League football club historically associated with London's Jewish community.", website: "https://www.tottenhamhotspur.com/", individuals: [{ name: "Daniel Levy", role: "Chairman", bio: "Chairman of Tottenham Hotspur since 2001." }] });
addEntry(uk, { name: "Pears Foundation", type: "foundation", description: "Philanthropic foundation supporting social change, education, and coexistence.", website: "https://pearsfoundation.org.uk/", individuals: [] });
addEntry(uk, { name: "Dangoor Family / Exilarch's Foundation", type: "foundation", description: "Iraqi-Jewish family and their philanthropic foundation.", website: "", individuals: [{ name: "Sir Naim Dangoor", role: "Patriarch (1914-2015)", bio: "Iraqi-British Jewish businessman and philanthropist." }] });

// ============================================================
// FRANCE - EXPANSION
// ============================================================

addEntry(fr, { name: "Bureau National de Vigilance Contre l'Antisémitisme (BNVCA)", type: "advocacy", description: "French organization monitoring and combating antisemitic acts.", website: "", individuals: [] });
addEntry(fr, { name: "Fonds Social Juif Unifié (FSJU)", type: "social services", description: "United Jewish social fund of France.", website: "https://www.fsju.org/", individuals: [] });
addEntry(fr, { name: "Synagogue de la Victoire (Paris)", type: "synagogue", description: "Great Synagogue of Paris, the largest in France.", website: "", individuals: [] });
addEntry(fr, { name: "Institut Européen Emmanuel Levinas", type: "education", description: "Jewish educational institute in Paris.", website: "", individuals: [] });
addEntry(fr, { name: "BPIfrance / French-Israeli business networks", type: "business network", description: "France-Israel Chamber of Commerce and business connectivity.", website: "", individuals: [] });
addEntry(fr, { name: "Keren Hayesod France", type: "charity", description: "French branch of the global United Israel Appeal.", website: "", individuals: [] });
addEntry(fr, { name: "Rothschild & Co (France)", type: "investment bank", description: "French branch of the Rothschild banking family.", website: "https://www.rothschildandco.com/", individuals: [{ name: "David de Rothschild", role: "Chairman", bio: "Chairman of Rothschild & Co." }] });

// ============================================================
// GERMANY - EXPANSION
// ============================================================

addEntry(de, { name: "Axel Springer SE", type: "media conglomerate", description: "Largest publishing house in Europe, owner of Bild and Die Welt.", website: "https://www.axelspringer.com/", individuals: [{ name: "Mathias Döpfner", role: "CEO", bio: "CEO of Axel Springer, known for pro-Israel stance." }] });
addEntry(de, { name: "Zentralwohlfahrtsstelle der Juden in Deutschland", type: "welfare organization", description: "Central welfare office of Jews in Germany.", website: "https://zwst.org/", individuals: [] });
addEntry(de, { name: "European Maccabi Games", type: "sports", description: "Quadrennial Jewish multi-sport event in Europe, often held in Germany.", website: "https://www.maccabi.org/", individuals: [] });
addEntry(de, { name: "Moses Mendelssohn Center for European-Jewish Studies", type: "research institute", description: "Academic center at University of Potsdam for European Jewish studies.", website: "", individuals: [] });
addEntry(de, { name: "Leo Baeck Institute - Germany", type: "research", description: "Research institute documenting history of German-speaking Jewry.", website: "", individuals: [] });

// ============================================================
// CANADA - EXPANSION
// ============================================================

addEntry(ca, { name: "Mount Sinai Hospital Toronto", type: "hospital", description: "Leading teaching and research hospital in Toronto.", website: "https://www.mountsinai.on.ca/", individuals: [] });
addEntry(ca, { name: "Canadian Museum for Human Rights", type: "museum", description: "National museum with significant Holocaust gallery, supported by the Asper Foundation.", website: "https://humanrights.ca/", individuals: [{ name: "Gail Asper", role: "Chair Emeritus", bio: "Daughter of Israel Asper, led campaign for the museum." }] });
addEntry(ca, { name: "Bronfman Family / Seagram Company", type: "business dynasty", description: "Canadian Jewish business dynasty behind Seagram.", website: "", individuals: [{ name: "Edgar Bronfman Sr.", role: "Patriarch (1929-2013)", bio: "Canadian-American businessman, president of the World Jewish Congress." }, { name: "Charles Bronfman", role: "Co-Chair", bio: "Canadian-American philanthropist and businessman." }] });
addEntry(ca, { name: "Reichmann Family / Olympia & York", type: "real estate", description: "Canadian Jewish family that built one of the world's largest real estate empires.", website: "", individuals: [{ name: "Paul Reichmann", role: "Co-founder (1930-2013)", bio: "Hungarian-born Canadian real estate developer, built Canary Wharf." }] });
addEntry(ca, { name: "Indigo Books & Music", type: "retail", description: "Largest bookstore chain in Canada.", website: "https://www.indigo.ca/", individuals: [{ name: "Heather Reisman", role: "Founder & CEO", bio: "Canadian businesswoman, founder of Indigo, married to Gerry Schwartz." }] });
addEntry(ca, { name: "Onex Corporation", type: "private equity", description: "Canadian private equity firm.", website: "https://www.onex.com/", individuals: [{ name: "Gerry Schwartz", role: "Founder & Chairman", bio: "Canadian billionaire, founder of Onex Corporation." }] });

// ============================================================
// AUSTRALIA - EXPANSION
// ============================================================

addEntry(au, { name: "Westfield Corporation (Scentre/Unibail)", type: "real estate", description: "Global shopping center company founded in Australia.", website: "https://www.scentregroup.com/", individuals: [{ name: "Frank Lowy", role: "Co-founder", bio: "Israeli-Australian billionaire who co-founded Westfield." }, { name: "Harry Triguboff", role: "Meriton Group Founder", bio: "Australian billionaire property developer." }] });
addEntry(au, { name: "Jewish Museum of Australia", type: "museum", description: "Museum in Melbourne documenting Australian Jewish history.", website: "https://www.jewishmuseum.com.au/", individuals: [] });
addEntry(au, { name: "Sydney Jewish Museum", type: "museum", description: "Museum combining Holocaust memorial with Australian Jewish heritage.", website: "https://sydneyjewishmuseum.com.au/", individuals: [] });
addEntry(au, { name: "Mount Scopus Memorial College", type: "education", description: "Largest Jewish day school in the Southern Hemisphere, in Melbourne.", website: "https://www.scopus.vic.edu.au/", individuals: [] });
addEntry(au, { name: "Moriah College Sydney", type: "education", description: "Major Jewish day school in Sydney.", website: "https://www.moriah.nsw.edu.au/", individuals: [] });

// ============================================================
// RUSSIA - EXPANSION
// ============================================================

addEntry(ru, { name: "NORNICKEL (Vladimir Potanin)", type: "mining/metals", description: "World's largest producer of nickel and palladium.", website: "https://www.nornickel.com/", individuals: [] });
addEntry(ru, { name: "Alfa-Bank / Alfa Group", type: "banking/conglomerate", description: "Major Russian private bank.", website: "https://www.alfabank.ru/", individuals: [{ name: "Mikhail Fridman", role: "Co-founder", bio: "Ukrainian-born Russian-Israeli oligarch, co-founded Alfa Group." }] });
addEntry(ru, { name: "Rusal (Oleg Deripaska)", type: "aluminum/metals", description: "Major Russian aluminum company.", website: "https://rusal.ru/", individuals: [] });
addEntry(ru, { name: "Renova Group (Viktor Vekselberg)", type: "conglomerate", description: "Russian conglomerate.", website: "", individuals: [{ name: "Viktor Vekselberg", role: "Founder", bio: "Ukrainian-born Russian-Israeli billionaire businessman." }] });

// ============================================================
// SOUTH AFRICA - EXPANSION
// ============================================================

addEntry(za, { name: "De Beers (Oppenheimer family legacy)", type: "mining/diamonds", description: "The diamond mining and trading company historically led by the Oppenheimer family.", website: "https://www.debeersgroup.com/", individuals: [{ name: "Ernest Oppenheimer", role: "Former Chairman (1880-1957)", bio: "German-born South African mining magnate." }, { name: "Nicky Oppenheimer", role: "Former Chairman", bio: "Former chairman of De Beers and Anglo American." }] });
addEntry(za, { name: "Investec", type: "banking/investment", description: "International specialist banking and asset management group founded in Johannesburg.", website: "https://www.investec.com/", individuals: [] });
addEntry(za, { name: "Discovery Limited", type: "financial services", description: "South African insurance and investment company.", website: "https://www.discovery.co.za/", individuals: [{ name: "Adrian Gore", role: "Founder & Group CEO", bio: "South African Jewish founder of Discovery Limited." }] });
addEntry(za, { name: "Naspers", type: "technology/media", description: "South African multinational conglomerate, major tech investor.", website: "https://www.naspers.com/", individuals: [] });

// ============================================================
// BRAZIL - EXPANSION
// ============================================================

addEntry(br, { name: "Safra Group", type: "banking", description: "Global banking group with Brazilian-Lebanese Jewish roots.", website: "https://www.safra.com.br/", individuals: [{ name: "Joseph Safra", role: "Patriarch (1938-2020)", bio: "Brazilian-Lebanese banker, once the world's richest banker." }] });
addEntry(br, { name: "Museu Judaico de São Paulo", type: "museum", description: "Jewish Museum of São Paulo.", website: "", individuals: [] });
addEntry(br, { name: "Congregação Israelita Paulista (CIP)", type: "synagogue/community", description: "One of the largest Jewish congregations in Latin America, in São Paulo.", website: "", individuals: [] });

// ============================================================
// ARGENTINA - EXPANSION
// ============================================================

addEntry(ar, { name: "Buenos Aires Jewish Museum", type: "museum", description: "Museum of Jewish heritage in Buenos Aires.", website: "", individuals: [] });
addEntry(ar, { name: "Seminario Rabínico Latinoamericano", type: "seminary", description: "Conservative rabbinical seminary in Buenos Aires, training rabbis for all of Latin America.", website: "", individuals: [] });
addEntry(ar, { name: "Grupo Werthein", type: "conglomerate", description: "Argentine Jewish-owned conglomerate with interests in telecom and finance.", website: "", individuals: [] });

// ============================================================
// MORE COUNTRIES ADDED
// ============================================================

// PORTUGAL
addEntry("Portugal", { name: "Jewish Community of Lisbon", type: "community", description: "Historic Jewish community dating back centuries.", website: "", individuals: [] });
addEntry("Portugal", { name: "Sinagoga Kadoorie Mekor Haim (Porto)", type: "synagogue", description: "Largest synagogue in the Iberian Peninsula, built in 1938.", website: "https://www.comunidade-israelita-porto.org/", individuals: [] });
addEntry("Portugal", { name: "Museu Judaico de Belmonte", type: "museum", description: "Museum documenting the history of crypto-Jews in Portugal.", website: "", individuals: [] });

// IRELAND
addEntry("Ireland", { name: "Jewish Representative Council of Ireland", type: "representative body", description: "Representative body for the Irish Jewish community.", website: "", individuals: [] });
addEntry("Ireland", { name: "Irish Jewish Museum (Dublin)", type: "museum", description: "Museum documenting Jewish heritage in Ireland.", website: "https://jewishmuseum.ie/", individuals: [] });

// CROATIA
addEntry("Croatia", { name: "Jewish Community of Zagreb", type: "community", description: "The largest Jewish community in Croatia.", website: "", individuals: [] });

// SERBIA
addEntry("Serbia", { name: "Federation of Jewish Communities in Serbia", type: "representative body", description: "Umbrella body of Serbian Jewish communities.", website: "", individuals: [] });

// BULGARIA  
addEntry("Bulgaria", { name: "Organization of the Jews in Bulgaria", type: "representative body", description: "Representative organization that notably saved Bulgaria's 48,000 Jews from the Holocaust.", website: "", individuals: [] });

// TUNISIA
addEntry("Tunisia", { name: "El Ghriba Synagogue (Djerba)", type: "synagogue", description: "One of the oldest synagogues in the world, on the island of Djerba.", website: "", individuals: [] });

// AZERBAIJAN
addEntry("Azerbaijan", { name: "Mountain Jewish Community of Azerbaijan", type: "community", description: "Historic community of Mountain Jews in Baku and the Red Settlement.", website: "", individuals: [] });

// GEORGIA
addEntry("Georgia", { name: "Georgian Jewish Community", type: "community", description: "One of the oldest Jewish communities in the world, over 2,600 years.", website: "", individuals: [] });

// UZBEKISTAN
addEntry("Uzbekistan", { name: "Bukharan Jewish Community", type: "community", description: "Historic Central Asian Jewish community, once numbering over 100,000.", website: "", individuals: [] });

// PERU
addEntry("Peru", { name: "Asociación Judía del Perú", type: "representative body", description: "Jewish community organization of Peru.", website: "", individuals: [] });

// VENEZUELA
addEntry("Venezuela", { name: "Confederación de Asociaciones Israelitas de Venezuela (CAIV)", type: "representative body", description: "Federation of Jewish associations in Venezuela.", website: "", individuals: [] });

// COSTA RICA
addEntry("Costa Rica", { name: "Centro Israelita Sionista de Costa Rica", type: "community", description: "Jewish community center in Costa Rica.", website: "", individuals: [] });

// GUATEMALA
addEntry("Guatemala", { name: "Comunidad Judía de Guatemala", type: "community", description: "Jewish community organization of Guatemala.", website: "", individuals: [] });

// ECUADOR
addEntry("Ecuador", { name: "Comunidad Judía del Ecuador", type: "community", description: "Jewish community of Ecuador, mainly in Quito.", website: "", individuals: [] });

// BOLIVIA
addEntry("Bolivia", { name: "Comunidad Israelita de Bolivia (Circulo Israelita)", type: "community", description: "Jewish community dating to immigration in the 1930s-40s.", website: "", individuals: [] });

// DOMINICAN REPUBLIC
addEntry("Dominican Republic", { name: "Jewish Community of Sosúa", type: "community/historic", description: "Community descended from Jewish refugees settled by Trujillo in 1940.", website: "", individuals: [] });
addEntry("Dominican Republic", { name: "Museo Judío de Sosúa", type: "museum", description: "Museum documenting the Jewish refugee settlement of Sosúa.", website: "", individuals: [] });

// JAMAICA
addEntry("Jamaica", { name: "United Congregation of Israelites", type: "synagogue", description: "Historic Jewish congregation in Kingston, Jamaica.", website: "", individuals: [] });

// THAILAND
addEntry("Thailand", { name: "Jewish Association of Thailand", type: "community", description: "Jewish community organization in Bangkok.", website: "https://www.jewishthailand.com/", individuals: [] });

// PHILIPPINES
addEntry("Philippines", { name: "Jewish Association of the Philippines", type: "community", description: "Community marking the history of Jewish refugees who were welcomed during WWII.", website: "", individuals: [] });

// SOUTH KOREA 
addEntry("South Korea", { name: "Jewish Community of South Korea", type: "community", description: "Small Jewish community mainly in Seoul.", website: "", individuals: [] });

// VIETNAM
addEntry("Vietnam", { name: "Chabad Vietnam", type: "religious center", description: "Chabad centers in Ho Chi Minh City and Hanoi.", website: "", individuals: [] });

// NIGERIA
addEntry("Nigeria", { name: "Igbo Jewish Community", type: "community", description: "Community of Igbo people who identify as Jews, claiming descent from ancient Israelites.", website: "", individuals: [] });

// ZIMBABWE
addEntry("Zimbabwe", { name: "Zimbabwe Jewish Community", type: "community", description: "Small but historic Jewish community, once numbering 7,500.", website: "", individuals: [] });

// DEMOCRATIC REPUBLIC OF CONGO
addEntry("Democratic Republic of Congo", { name: "Lubumbashi Jewish Community", type: "community", description: "Small Jewish community in the DRC.", website: "", individuals: [] });

// NAMIBIA
addEntry("Namibia", { name: "Windhoek Jewish Community", type: "community", description: "Small Jewish community in Namibia.", website: "", individuals: [] });

// GHANA
addEntry("Ghana", { name: "House of Israel Ghana", type: "community", description: "Community of Sefwi people who practice Judaism.", website: "", individuals: [] });

// EGYPT
addEntry("Egypt", { name: "Egyptian Jewish Community (historic)", type: "historic community", description: "Once vibrant Jewish community of 80,000+, now only a handful remain. Historic synagogues preserved.", website: "", individuals: [] });
addEntry("Egypt", { name: "Ben Ezra Synagogue (Cairo)", type: "synagogue/historic", description: "Historic synagogue in Old Cairo, famous for the Cairo Geniza.", website: "", individuals: [] });

// SYRIA
addEntry("Syria", { name: "Syrian Jewish Heritage (Aleppo/Damascus)", type: "historic community", description: "Historic communities in Aleppo and Damascus, mostly emigrated in the 20th century.", website: "", individuals: [] });

// IRAQ
addEntry("Iraq", { name: "Iraqi Jewish Community (historic)", type: "historic community", description: "One of the world's oldest Jewish communities, nearly all emigrated after 1948 to Israel.", website: "", individuals: [] });
addEntry("Iraq", { name: "Babylonian Jewry Heritage Center (Israel)", type: "museum/cultural", description: "Museum in Israel preserving the heritage of Iraqi Jews.", website: "https://www.babylonjewry.org.il/", individuals: [] });

// YEMEN
addEntry("Yemen", { name: "Yemeni Jewish Community (historic)", type: "historic community", description: "Ancient Jewish community, nearly all airlifted to Israel in Operation Magic Carpet (1949-50).", website: "", individuals: [] });

// LIBYA
addEntry("Libya", { name: "Libyan Jewish Community (historic)", type: "historic community", description: "Ancient community expelled after 1967, now a global diaspora.", website: "", individuals: [] });

// LEBANON
addEntry("Lebanon", { name: "Lebanese Jewish Community (historic)", type: "historic community", description: "Once thriving community centered in Beirut, now nearly extinct. Magen Abraham Synagogue partially restored.", website: "", individuals: [] });

// MYANMAR
addEntry("Myanmar", { name: "Musmeah Yeshua Synagogue (Yangon)", type: "synagogue/historic", description: "Last functioning synagogue in Myanmar, built by Baghdadi Jews in 1893.", website: "", individuals: [] });

// CURACAO
addEntry("Curaçao", { name: "Mikvé Israel-Emanuel Synagogue", type: "synagogue", description: "Oldest surviving synagogue in the Americas, built 1732.", website: "", individuals: [] });

// SURINAME
addEntry("Suriname", { name: "Jodensavanne Archaeological Site", type: "historic site", description: "Ruins of a 17th-century Jewish settlement in Suriname, one of the oldest in the Americas.", website: "", individuals: [] });
addEntry("Suriname", { name: "Neve Shalom Synagogue (Paramaribo)", type: "synagogue", description: "Historic synagogue in Paramaribo next to a mosque.", website: "", individuals: [] });

// GIBRALTAR
addEntry("Gibraltar", { name: "Jewish Community of Gibraltar", type: "community", description: "One of the oldest organized Jewish communities in the British Empire.", website: "", individuals: [] });

// TAIWAN
addEntry("Taiwan", { name: "Jewish Community of Taiwan", type: "community", description: "Small Jewish community centered in Taipei.", website: "", individuals: [] });

// ============================================================
// Additional prominent people not yet covered
// ============================================================

// Add standalone people entries via fake "notable individuals" entries
addEntry(us, { name: "Notable Jewish Philanthropists (US)", type: "individual profiles", description: "Prominent Jewish philanthropists in the United States.", website: "", individuals: [
  { name: "George Soros", role: "Investor & Philanthropist", bio: "Hungarian-born American billionaire investor, founder of the Open Society Foundations." },
  { name: "Michael Bloomberg", role: "Businessman & Former NYC Mayor", bio: "Founder of Bloomberg LP, served as Mayor of New York City 2002-2013." },
  { name: "Sheldon Adelson", role: "Casino Magnate (1933-2021)", bio: "Las Vegas Sands founder, major Republican and pro-Israel donor." },
  { name: "Len Blavatnik", role: "Investor & Philanthropist", bio: "Ukrainian-born British-American billionaire, founder of Access Industries, major Jewish philanthropist." },
] });
addEntry(us, { name: "Notable Jewish Political Figures (US)", type: "individual profiles", description: "Prominent Jewish figures in American politics.", website: "", individuals: [
  { name: "Bernie Sanders", role: "US Senator (Vermont)", bio: "US Senator from Vermont, first Jewish candidate to win a presidential primary." },
  { name: "Chuck Schumer", role: "US Senate Majority Leader", bio: "Senate Majority Leader and the highest-ranking Jewish elected official in US history." },
  { name: "Antony Blinken", role: "US Secretary of State", bio: "US Secretary of State under President Biden." },
  { name: "Janet Yellen", role: "US Secretary of the Treasury", bio: "First female US Secretary of the Treasury, former Fed Chair." },
  { name: "Merrick Garland", role: "US Attorney General", bio: "US Attorney General." },
] });
addEntry(us, { name: "Notable Jewish Entertainers (US)", type: "individual profiles", description: "Prominent Jewish figures in entertainment.", website: "", individuals: [
  { name: "Steven Spielberg", role: "Film Director", bio: "One of the most influential filmmakers in cinema history." },
  { name: "Jerry Seinfeld", role: "Comedian/Actor", bio: "Creator and star of the sitcom Seinfeld." },
  { name: "Seth Rogen", role: "Actor/Producer", bio: "Canadian-American actor, comedian, and filmmaker." },
  { name: "Gal Gadot", role: "Actress", bio: "Israeli actress and model, known for Wonder Woman." },
  { name: "Natalie Portman", role: "Actress", bio: "Israeli-American actress and Academy Award winner." },
  { name: "Scarlett Johansson", role: "Actress", bio: "American actress, one of the world's highest-grossing box office stars." },
] });
addEntry(us, { name: "Notable Jewish Scientists & Intellectuals (US)", type: "individual profiles", description: "Prominent Jewish figures in science and academia.", website: "", individuals: [
  { name: "Albert Einstein", role: "Physicist (1879-1955)", bio: "Nobel Prize-winning physicist who developed the theory of relativity." },
  { name: "J. Robert Oppenheimer", role: "Physicist (1904-1967)", bio: "Theoretical physicist known as the 'father of the atomic bomb.'" },
  { name: "Richard Feynman", role: "Physicist (1918-1988)", bio: "Nobel Prize-winning physicist known for quantum electrodynamics." },
  { name: "Noam Chomsky", role: "Linguist & Intellectual", bio: "Father of modern linguistics, prominent public intellectual." },
] });
addEntry(us, { name: "Notable Jewish Media Executives (US)", type: "individual profiles", description: "Prominent Jewish figures in media.", website: "", individuals: [
  { name: "Bob Iger", role: "CEO of Disney", bio: "CEO of The Walt Disney Company." },
  { name: "David Zaslav", role: "CEO of Warner Bros Discovery", bio: "CEO of Warner Bros. Discovery." },
  { name: "Brian Roberts", role: "CEO of Comcast", bio: "Chairman and CEO of Comcast Corporation." },
  { name: "Jeff Zucker", role: "Former CNN President", bio: "Former president of CNN, former CEO of NBCUniversal." },
  { name: "Les Moonves", role: "Former CBS CEO", bio: "Former chairman and CEO of CBS Corporation." },
] });

// ============================================================
// International Organizations
// ============================================================

addEntry("Switzerland", { name: "World Health Organization - Israeli connections", type: "international", description: "Israel's contributions to global health through WHO.", website: "", individuals: [] });
addEntry("Switzerland", { name: "B'nai B'rith International (Geneva office)", type: "NGO", description: "Geneva office handling UN relations.", website: "", individuals: [] });
addEntry("International", { name: "European Jewish Congress", type: "advocacy organization", description: "Representative organization of European Jewish communities.", website: "https://eurojewcong.org/", individuals: [{ name: "Ariel Muzicant", role: "Vice President", bio: "Austrian-Israeli businessman, VP of the European Jewish Congress." }] });
addEntry("International", { name: "World ORT", type: "educational organization", description: "Global Jewish educational network operating in 35+ countries.", website: "https://www.ort.org/", individuals: [] });
addEntry("International", { name: "Maccabi World Union", type: "sports organization", description: "International Jewish sports organization, organizer of the Maccabiah Games.", website: "https://www.maccabi.org/", individuals: [] });
addEntry("International", { name: "B'nai B'rith International", type: "service organization", description: "Oldest and largest Jewish service organization in the world, operating in 60+ countries.", website: "https://www.bnaibrith.org/", individuals: [] });
addEntry("International", { name: "Claims Conference (Conference on Jewish Material Claims Against Germany)", type: "restitution organization", description: "Secures compensation for Holocaust survivors from Germany and Austria.", website: "https://www.claimscon.org/", individuals: [] });
addEntry("International", { name: "International Holocaust Remembrance Alliance (IHRA)", type: "intergovernmental", description: "Intergovernmental body promoting Holocaust education, remembrance, and research.", website: "https://www.holocaustremembrance.com/", individuals: [] });

// ============================================================
// Write updated files
// ============================================================

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));

const countryCount = Object.keys(data.countries).length;
const entryCount = Object.values(data.countries).reduce((s, entries) => s + entries.length, 0);
const personCount = Object.keys(people.people).length;

console.log(`\nExpansion complete!`);
console.log(`Total: ${entryCount} entries across ${countryCount} countries/regions, and ${personCount} people.`);
console.log(`\nCountries/regions:`);
Object.keys(data.countries).sort().forEach(c => {
  console.log(`  ${c}: ${data.countries[c].length} entries`);
});
