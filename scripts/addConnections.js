// addConnections.js - Run AFTER expandData2.js
// Enriches all entries with connections, updated descriptions, and cross-references
// node scripts/addConnections.js

const fs = require('fs');
const path = require('path');

const jewishFile = path.join(__dirname, '..', 'data', 'jewish.json');
const peopleFile = path.join(__dirname, '..', 'data', 'people.json');

const data = JSON.parse(fs.readFileSync(jewishFile, 'utf8'));
const people = JSON.parse(fs.readFileSync(peopleFile, 'utf8'));

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Build index of all entries by id
const entryIndex = {};
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    entryIndex[entry.id] = { entry, country };
  }
}

// Helper: add connections to an entry by id
function addConnections(entryId, connections) {
  if (entryIndex[entryId]) {
    const entry = entryIndex[entryId].entry;
    if (!entry.connections) entry.connections = [];
    connections.forEach(c => {
      if (!entry.connections.find(ec => ec.name === c.name)) {
        entry.connections.push(c);
      }
    });
  }
}

// Helper: update description
function updateDesc(entryId, newDesc) {
  if (entryIndex[entryId]) {
    entryIndex[entryId].entry.description = newDesc;
  }
}

// Helper: update individuals' bios
function updateBio(entryId, personName, newBio) {
  if (entryIndex[entryId]) {
    const entry = entryIndex[entryId].entry;
    const ind = entry.individuals.find(i => i.name === personName);
    if (ind) {
      ind.bio = newBio;
      const pid = slugify(personName);
      if (people.people[pid]) {
        people.people[pid].bio = newBio;
      }
    }
  }
}

// Helper: add individual to entry
function addIndividual(entryId, person) {
  if (entryIndex[entryId]) {
    const entry = entryIndex[entryId].entry;
    const pid = slugify(person.name);
    if (!entry.individuals.find(i => i.id === pid)) {
      person.id = pid;
      entry.individuals.push(person);
      if (!people.people[pid]) {
        people.people[pid] = { name: person.name, bio: person.bio || '', notes: '' };
      }
    }
  }
}

// ============================================================
// UNITED STATES - ADVOCACY & LOBBYING
// ============================================================

addConnections('american-jewish-committee-ajc-', [
  { name: "Anti-Defamation League (ADL)", type: "sister organization", description: "Fellow major Jewish advocacy organization, often coordinates on antisemitism issues." },
  { name: "Conference of Presidents", type: "member organization", description: "AJC is a member of the Conference of Presidents of Major American Jewish Organizations." },
  { name: "AIPAC", type: "allied organization", description: "Both work on pro-Israel advocacy in Washington, D.C." },
  { name: "World Jewish Congress", type: "partner", description: "AJC partners with WJC on global Jewish diplomacy." },
  { name: "Israeli Government", type: "diplomatic partner", description: "AJC maintains offices in Israel and works directly with Israeli diplomats worldwide." },
  { name: "United Nations", type: "advocacy target", description: "AJC holds consultative status at the UN and advocates against anti-Israel resolutions." }
]);

addConnections('anti-defamation-league-adl-', [
  { name: "American Jewish Committee (AJC)", type: "sister organization", description: "Fellow major Jewish advocacy organization." },
  { name: "B'nai B'rith International", type: "parent organization", description: "ADL was originally founded under B'nai B'rith in 1913." },
  { name: "Meta/Facebook", type: "tech partnership", description: "ADL works with Meta on hate speech monitoring and content moderation policies." },
  { name: "Google/YouTube", type: "tech partnership", description: "ADL advises on content moderation and hate speech algorithms." },
  { name: "PayPal", type: "financial partnership", description: "ADL partnered with PayPal to research financial networks of extremist groups." },
  { name: "Silicon Valley Tech Companies", type: "advisory role", description: "ADL's Center for Technology and Society advises major tech firms on hate speech policies." },
  { name: "FBI", type: "law enforcement partner", description: "ADL provides hate crime training to FBI agents and law enforcement nationwide." },
  { name: "Conference of Presidents", type: "member", description: "ADL is a member of the Conference of Presidents of Major American Jewish Organizations." }
]);

addConnections('aipac-american-israel-public-affairs-committee-', [
  { name: "US Congress", type: "lobbying target", description: "AIPAC is one of the most influential lobbying groups in Congress, supporting pro-Israel legislation." },
  { name: "Democratic Party", type: "political engagement", description: "AIPAC engages with Democratic members of Congress on bipartisan Israel support." },
  { name: "Republican Party", type: "political engagement", description: "AIPAC engages with Republican members of Congress on bipartisan Israel support." },
  { name: "United Israel Appeal", type: "allied cause", description: "Both support US-Israel relations and Israel-related philanthropy." },
  { name: "Jewish Federations of North America", type: "community partner", description: "Works with JFNA on mobilizing grassroots pro-Israel support." },
  { name: "Israeli Embassy (Washington)", type: "diplomatic relationship", description: "Coordinates closely with Israeli diplomatic staff." },
  { name: "J Street", type: "rival organization", description: "J Street was founded as a progressive alternative to AIPAC's approach." }
]);

addConnections('j-street', [
  { name: "AIPAC", type: "rival organization", description: "J Street was founded as an alternative to AIPAC, promoting a two-state solution." },
  { name: "Americans for Peace Now", type: "allied organization", description: "Both advocate for Israeli-Palestinian peace." },
  { name: "New Israel Fund", type: "allied organization", description: "Both support progressive causes related to Israel." },
  { name: "Democratic Party", type: "political alignment", description: "J Street primarily engages with Democratic lawmakers." },
  { name: "George Soros", type: "funder", description: "George Soros was an early supporter and donor to J Street." }
]);

addConnections('conference-of-presidents-of-major-american-jewish-organizations', [
  { name: "AIPAC", type: "member organization", description: "AIPAC is one of the 50+ member organizations." },
  { name: "ADL", type: "member organization", description: "ADL is a member of the Conference." },
  { name: "AJC", type: "member organization", description: "AJC is a member of the Conference." },
  { name: "Hadassah", type: "member organization", description: "Hadassah is a member of the Conference." },
  { name: "B'nai B'rith International", type: "member organization", description: "B'nai B'rith is a member of the Conference." },
  { name: "Jewish Federations of North America", type: "community partner", description: "Works together on national and international Jewish issues." }
]);

addConnections('standwithus', [
  { name: "Israeli Government", type: "partnership", description: "Receives funding from the Israeli government for campus advocacy." },
  { name: "ADL", type: "allied organization", description: "Both combat antisemitism on college campuses." },
  { name: "Hillel International", type: "campus partner", description: "Works with Hillel chapters on pro-Israel campus activities." },
  { name: "AIPAC", type: "allied organization", description: "Both engage in pro-Israel advocacy." }
]);

// ============================================================
// UNITED STATES - TECHNOLOGY
// ============================================================

addConnections('google-alphabet-', [
  { name: "Stanford University", type: "origin", description: "Larry Page and Sergey Brin founded Google while PhD students at Stanford." },
  { name: "Waze (Israel)", type: "acquisition", description: "Google acquired Israeli navigation app Waze for $1.15 billion in 2013." },
  { name: "YouTube", type: "subsidiary", description: "Acquired YouTube in 2006; Susan Wojcicki (Jewish) was longtime CEO." },
  { name: "Google Israel R&D Center", type: "Israeli operations", description: "Major R&D center in Tel Aviv and Haifa employing thousands of Israeli engineers." },
  { name: "ADL", type: "partnership", description: "Google/YouTube works with ADL on content moderation policies." },
  { name: "Eric Schmidt", type: "key figure", description: "Former CEO Eric Schmidt (not Jewish) worked closely with Jewish co-founders." },
  { name: "Check Point Software (Israel)", type: "Israeli tech ecosystem", description: "Part of the broader Israeli-connected Silicon Valley tech ecosystem." },
  { name: "Michael Bloomberg", type: "tech industry peer", description: "Fellow Jewish tech billionaire and philanthropist." }
]);
updateDesc('google-alphabet-', 'Co-founded by Sergey Brin (Jewish, born in Moscow) and Larry Page. Brin immigrated from the Soviet Union as a child. Google acquired multiple Israeli companies including Waze ($1.15B), has major R&D centers in Tel Aviv and Haifa, and employs thousands of engineers in Israel. Brin is a major philanthropist supporting Jewish causes.');
updateBio('google-alphabet-', 'Sergey Brin', 'Jewish co-founder of Google, born in Moscow, Russia. Immigrated to the US as a child. Net worth ~$100 billion. Major philanthropist through the Brin Wojcicki Foundation. His family fled Soviet antisemitism.');

addConnections('facebook-meta-', [
  { name: "Harvard University", type: "origin", description: "Mark Zuckerberg founded Facebook at Harvard in 2004." },
  { name: "Sheryl Sandberg", type: "key executive", description: "Jewish COO of Meta 2008-2022, author of Lean In." },
  { name: "Instagram", type: "subsidiary", description: "Meta acquired Instagram in 2012 for $1 billion." },
  { name: "WhatsApp", type: "subsidiary", description: "Acquired WhatsApp in 2014 for $19 billion; co-founded by Jan Koum (Jewish)." },
  { name: "ADL", type: "content partnership", description: "Meta works with ADL on hate speech and content moderation." },
  { name: "Onavo (Israel)", type: "acquisition", description: "Acquired Israeli mobile analytics company Onavo in 2013." },
  { name: "Meta Israel R&D", type: "Israeli operations", description: "Operates R&D center in Tel Aviv focused on AI and security." },
  { name: "Peter Thiel", type: "early investor", description: "Early Facebook investor; co-founded PayPal with other Jewish entrepreneurs." },
  { name: "Dustin Moskovitz", type: "co-founder", description: "Jewish co-founder of Facebook, later founded Asana." }
]);
updateDesc('facebook-meta-', 'Founded by Mark Zuckerberg (Jewish) at Harvard in 2004. Zuckerberg had a Jewish upbringing and celebrated his Bar Mitzvah as "Star Wars" themed. COO Sheryl Sandberg (Jewish) was a key executive 2008-2022. Meta acquired Israeli company Onavo, operates R&D in Tel Aviv, and works with the ADL on content policies. Co-founder Dustin Moskovitz (Jewish) left to found Asana.');
updateBio('facebook-meta-', 'Mark Zuckerberg', 'Jewish founder and CEO of Meta/Facebook. Raised in a Jewish household in Dobbs Ferry, NY. Had a Bar Mitzvah. Married Priscilla Chan; they run the Chan Zuckerberg Initiative with $45B+ in pledged philanthropy. Net worth ~$100 billion.');

addConnections('oracle', [
  { name: "Israeli Tech Industry", type: "operations", description: "Oracle has a large R&D presence in Israel with multiple development centers." },
  { name: "NetSuite", type: "acquisition", description: "Oracle acquired NetSuite (founded by Evan Goldberg, Jewish) for $9.3 billion." },
  { name: "Amdocs (Israel)", type: "industry peer", description: "Fellow tech company with major Israeli connections." },
  { name: "Larry Ellison Foundation", type: "philanthropy", description: "Ellison's foundation supports medical research and education." },
  { name: "Tesla/SpaceX", type: "board connection", description: "Larry Ellison serves on Tesla's board of directors alongside Elon Musk." },
  { name: "University of Southern California", type: "philanthropy", description: "Ellison has donated to USC and other institutions." }
]);
updateDesc('oracle', 'Founded by Larry Ellison (Jewish mother, raised by adoptive Jewish family in Chicago). Oracle is one of the largest enterprise software companies in the world. Has significant R&D operations in Israel. Ellison acquired NetSuite (founded by Evan Goldberg, Jewish) for $9.3B. Ellison is one of the wealthiest people in the world with a net worth exceeding $150 billion.');
updateBio('oracle', 'Larry Ellison', 'Born to a Jewish mother in New York City, raised by his great-aunt and great-uncle (Jewish adoptive parents) in Chicago. Co-founded Oracle in 1977. One of the richest people in the world. Sits on Tesla\'s board. Known for his close relationship with Israel and Jewish philanthropic causes.');

addConnections('dell-technologies', [
  { name: "Michael & Susan Dell Foundation", type: "philanthropy", description: "Dell family foundation has donated $2.4B+ to education, health, and community initiatives, including Jewish causes." },
  { name: "Israel", type: "operations", description: "Dell has a major campus in Ra'anana, Israel employing 3,000+ people and acquired Israeli companies including Compellent." },
  { name: "EMC Corporation", type: "merger", description: "Dell merged with EMC in 2016 for $67 billion, the largest tech merger at the time." },
  { name: "VMware", type: "subsidiary", description: "Acquired through the EMC merger; later spun off." },
  { name: "SecureWorks", type: "subsidiary", description: "Dell-owned cybersecurity company." },
  { name: "University of Texas", type: "philanthropy", description: "Dell donated $300M to UT Austin, where he started the company from his dorm room." },
  { name: "MSD Capital", type: "investment", description: "Michael Dell's private investment firm manages the Dell family fortune." },
  { name: "Tevel Aerobotics (Israel)", type: "investment", description: "Dell invested in Israeli agricultural robotics startup." },
  { name: "Jewish Federation of Austin", type: "community involvement", description: "The Dell family has supported Jewish community organizations in Austin, Texas." }
]);
updateDesc('dell-technologies', 'Founded in 1984 by Michael Dell (Jewish) from his University of Texas dorm room. Dell has a major campus in Ra\'anana, Israel employing 3,000+ people. Dell acquired Israeli companies and maintains significant Israeli R&D operations. Michael Dell\'s family foundation has donated $2.4B+ to various causes. The company merged with EMC ($67B) in 2016, becoming Dell Technologies.');
updateBio('dell-technologies', 'Michael Dell', 'Jewish founder and CEO of Dell Technologies. Born to a Jewish family in Houston, Texas. Started Dell from his UT Austin dorm room in 1984. Net worth ~$70 billion. Major philanthropist through the Michael & Susan Dell Foundation ($2.4B+ donated). Strong supporter of Israel with Dell\'s major Ra\'anana campus employing 3,000+.');

addConnections('dell-technologies-israel-operations-', [
  { name: "Dell Technologies", type: "parent company", description: "Israeli operations are part of the global Dell Technologies enterprise." },
  { name: "Ra'anana Tech Hub", type: "location", description: "Dell's Israel campus is in Ra'anana, a major tech hub north of Tel Aviv." },
  { name: "Israel Defense Forces (IDF)", type: "talent pipeline", description: "Many Dell Israel employees are graduates of IDF tech units like Unit 8200." },
  { name: "Technion", type: "talent source", description: "Dell recruits engineers from Technion - Israel Institute of Technology." },
  { name: "Michael & Susan Dell Foundation", type: "philanthropy", description: "The Dell Foundation supports education programs in Israel." },
  { name: "Check Point Software", type: "Israeli tech peer", description: "Fellow American-Israeli tech company headquartered near Dell Israel." }
]);
updateDesc('dell-technologies-israel-operations-', 'Founded by Michael Dell (Jewish). Dell has a major campus in Ra\'anana, Israel employing 3,000+ engineers and staff. Dell acquired several Israeli companies and invests heavily in Israeli R&D, particularly in storage, cloud, and cybersecurity technologies. Many employees are Unit 8200 and Technion graduates.');

addConnections('intel-israel-', [
  { name: "Mobileye (Israel)", type: "acquisition", description: "Intel acquired Israeli autonomous driving company Mobileye for $15.3 billion in 2017, later IPO'd it." },
  { name: "Tower Semiconductor (Israel)", type: "attempted acquisition", description: "Intel attempted to acquire Israeli chip maker Tower Semiconductor." },
  { name: "Technion", type: "partnership", description: "Intel partners with Technion for semiconductor research." },
  { name: "Israel Innovation Authority", type: "government partnership", description: "Intel works with the Israeli government on chip development." },
  { name: "Unit 8200", type: "talent pipeline", description: "Many Intel Israel engineers come from the elite IDF signals intelligence unit." },
  { name: "Andy Grove", type: "founding figure", description: "Andy Grove (born András Gróf, Jewish Hungarian) was Intel's legendary CEO who built the company." }
]);

addConnections('microsoft', [
  { name: "Steve Ballmer", type: "former CEO", description: "Steve Ballmer (Jewish father) served as Microsoft CEO 2000-2014. Now owner of LA Clippers." },
  { name: "Microsoft Israel R&D", type: "Israeli operations", description: "Major R&D center in Herzliya and Haifa, one of Microsoft's largest outside the US." },
  { name: "LinkedIn", type: "subsidiary", description: "Microsoft acquired LinkedIn (co-founded by Reid Hoffman, Jewish mother) for $26.2 billion." },
  { name: "GitHub", type: "subsidiary", description: "Microsoft acquired GitHub for $7.5 billion in 2018." },
  { name: "Activision Blizzard", type: "acquisition", description: "Acquired in 2023 for $69 billion; Bobby Kotick (Jewish) was CEO." },
  { name: "OpenAI", type: "investment", description: "Microsoft invested $13B+ in OpenAI; Sam Altman (Jewish) is CEO." },
  { name: "Amdocs (Israel)", type: "tech ecosystem", description: "Part of the broader Israeli-connected enterprise tech ecosystem." }
]);

addConnections('bloomberg-lp', [
  { name: "Bloomberg Philanthropies", type: "philanthropy", description: "Michael Bloomberg has donated over $14 billion through Bloomberg Philanthropies." },
  { name: "Johns Hopkins University", type: "philanthropy", description: "Bloomberg donated $3.3 billion to Johns Hopkins, the largest ever to a university." },
  { name: "Everytown for Gun Safety", type: "founded organization", description: "Bloomberg founded and funds the gun control advocacy group." },
  { name: "City of New York", type: "government", description: "Bloomberg served as Mayor of NYC 2002-2013." },
  { name: "Israel", type: "philanthropy", description: "Bloomberg is a major donor to Israeli institutions and causes." },
  { name: "Magen David Adom", type: "philanthropy", description: "Bloomberg donated $6 million to Israel's emergency medical service." }
]);

// ============================================================
// UNITED STATES - MEDIA & ENTERTAINMENT
// ============================================================

addConnections('walt-disney-company', [
  { name: "Bob Iger", type: "CEO", description: "Bob Iger (Jewish) served as Disney CEO 2005-2020 and returned 2022-present." },
  { name: "Disney+", type: "streaming", description: "Launched under Iger's leadership in 2019." },
  { name: "Marvel Studios", type: "subsidiary", description: "Acquired by Disney; Kevin Feige (Jewish) heads Marvel Studios." },
  { name: "21st Century Fox", type: "acquisition", description: "Disney acquired 21st Century Fox for $71.3 billion in 2019." },
  { name: "Pixar", type: "subsidiary", description: "Disney acquired Pixar from Steve Jobs in 2006." },
  { name: "ABC News", type: "subsidiary", description: "Disney owns ABC television network." },
  { name: "Michael Eisner", type: "former CEO", description: "Michael Eisner (Jewish) was Disney CEO 1984-2005, transforming the company." }
]);
updateBio('walt-disney-company', 'Bob Iger', 'Jewish CEO of The Walt Disney Company. Born to a Jewish family in New York City. Led Disney through major acquisitions of Pixar, Marvel, Lucasfilm, and 21st Century Fox. His memoir \"The Ride of a Lifetime\" was a bestseller. Returned as CEO in 2022.');

addConnections('comcast-nbcuniversal', [
  { name: "NBCUniversal", type: "subsidiary", description: "Comcast acquired NBCUniversal in 2011." },
  { name: "DreamWorks Animation", type: "acquisition", description: "Acquired DreamWorks Animation (founded by Jeffrey Katzenberg & Steven Spielberg, both Jewish) in 2016." },
  { name: "Universal Pictures", type: "subsidiary", description: "Part of NBCUniversal." },
  { name: "Sky Group", type: "acquisition", description: "Comcast acquired European broadcaster Sky for $39 billion." },
  { name: "Xfinity", type: "brand", description: "Comcast's consumer brand for cable, internet, and phone." },
  { name: "Philadelphia Jewish community", type: "community", description: "Roberts family are prominent members of Philadelphia's Jewish community." }
]);

addConnections('warner-bros-discovery', [
  { name: "David Zaslav", type: "CEO", description: "David Zaslav (Jewish) is CEO of Warner Bros. Discovery." },
  { name: "HBO", type: "subsidiary", description: "Premium cable network known for The Sopranos, Game of Thrones, etc." },
  { name: "CNN", type: "subsidiary", description: "Major news network owned by Warner Bros. Discovery." },
  { name: "DC Comics", type: "subsidiary", description: "Home of Batman, Superman, Wonder Woman." },
  { name: "Warner Music Group", type: "former sibling", description: "Previously part of the same Time Warner conglomerate." },
  { name: "AT&T", type: "former owner", description: "AT&T spun off WarnerMedia which merged with Discovery in 2022." }
]);

addConnections('the-new-york-times', [
  { name: "Sulzberger Family", type: "ownership", description: "The Ochs-Sulzberger family (Jewish) has controlled the NYT since 1896." },
  { name: "The Athletic", type: "acquisition", description: "NYT acquired The Athletic for $550 million in 2022." },
  { name: "Wirecutter", type: "subsidiary", description: "NYT owns product review site Wirecutter." },
  { name: "New York City Jewish Community", type: "cultural significance", description: "The NYT has been central to New York Jewish intellectual life for over a century." },
  { name: "Adolph Ochs", type: "founder", description: "Adolph Ochs (Jewish) purchased the NYT in 1896 and established its journalistic standards." }
]);

addConnections('paramount-global', [
  { name: "Shari Redstone", type: "controlling owner", description: "Shari Redstone (Jewish) controls Paramount through National Amusements." },
  { name: "CBS", type: "subsidiary", description: "CBS broadcast network merged back into Paramount." },
  { name: "MTV/Nickelodeon", type: "subsidiaries", description: "Paramount Global owns MTV, Nickelodeon, BET, and other cable networks." },
  { name: "Paramount Pictures", type: "subsidiary", description: "Historic film studio, one of the 'Big Five' Hollywood studios." },
  { name: "Sumner Redstone", type: "former chairman", description: "Sumner Redstone (Jewish, born Sumner Rothstein) built the Viacom/CBS empire." },
  { name: "Skydance Media", type: "merger partner", description: "Paramount agreed to merge with David Ellison's (Jewish, son of Larry Ellison) Skydance Media." }
]);

addConnections('news-corp', [
  { name: "Wall Street Journal", type: "subsidiary", description: "News Corp owns the Wall Street Journal and Dow Jones." },
  { name: "HarperCollins", type: "subsidiary", description: "Major publishing house owned by News Corp." },
  { name: "New York Post", type: "subsidiary", description: "News Corp owns the New York Post tabloid." },
  { name: "Fox Corporation", type: "sibling company", description: "Rupert Murdoch split his empire; Fox Corp was separated from News Corp in 2013." },
  { name: "Robert Thomson", type: "CEO", description: "CEO of News Corp." }
]);

// ============================================================
// UNITED STATES - FINANCE & BANKING
// ============================================================

addConnections('goldman-sachs', [
  { name: "Marcus Goldman", type: "founder", description: "Marcus Goldman (Jewish, German immigrant) founded the firm in 1869." },
  { name: "Samuel Sachs", type: "co-founder", description: "Samuel Sachs (Jewish) was Goldman's son-in-law and co-founder." },
  { name: "Lloyd Blankfein", type: "former CEO", description: "Lloyd Blankfein (Jewish) was chairman and CEO 2006-2018." },
  { name: "David Solomon", type: "CEO", description: "David Solomon (Jewish) is current chairman and CEO since 2018." },
  { name: "US Treasury Department", type: "revolving door", description: "Multiple Goldman alumni have served as Treasury Secretary: Robert Rubin, Hank Paulson, Steven Mnuchin (Jewish)." },
  { name: "Federal Reserve", type: "alumni", description: "Goldman alumni have served in senior Federal Reserve roles." },
  { name: "JPMorgan Chase", type: "competitor", description: "Major Wall Street competitor." },
  { name: "Blackstone Group", type: "industry peer", description: "Founded by Stephen Schwarzman (Jewish), fellow Wall Street powerhouse." },
  { name: "Goldman Sachs Foundation", type: "philanthropy", description: "The firm's foundation supports education and community development." }
]);

addConnections('blackrock', [
  { name: "Larry Fink", type: "founder & CEO", description: "Larry Fink (Jewish) founded BlackRock in 1988. It is now the world's largest asset manager with $10T+ AUM." },
  { name: "Goldman Sachs", type: "industry connection", description: "BlackRock was incubated within The Blackstone Group, which was co-founded by Jewish entrepreneurs." },
  { name: "Blackstone Group", type: "origin", description: "BlackRock was originally a subsidiary of Blackstone Group before becoming independent." },
  { name: "Federal Reserve", type: "advisory role", description: "BlackRock has been hired by the Federal Reserve to manage bond-buying programs." },
  { name: "US Government", type: "advisory role", description: "BlackRock advises governments worldwide on financial policy." },
  { name: "Aladdin Platform", type: "technology", description: "BlackRock's Aladdin risk management platform is used by institutions managing $20T+ in assets." },
  { name: "Israeli Government Bonds", type: "investment", description: "BlackRock is a significant holder of Israeli government bonds." }
]);

addConnections('blackstone-group', [
  { name: "Stephen Schwarzman", type: "founder", description: "Stephen Schwarzman (Jewish) co-founded Blackstone in 1985. Net worth ~$40 billion." },
  { name: "Pete Peterson", type: "co-founder", description: "Pete Peterson co-founded Blackstone with Schwarzman." },
  { name: "Jonathan Gray", type: "President & COO", description: "Jonathan Gray (Jewish) is president and COO of Blackstone." },
  { name: "BlackRock", type: "spinoff", description: "Larry Fink's BlackRock was originally a Blackstone subsidiary." },
  { name: "Hilton Hotels", type: "investment", description: "Blackstone's $26B acquisition of Hilton was one of the most profitable PE deals ever." },
  { name: "Schwarzman Scholars", type: "philanthropy", description: "Schwarzman's scholarship program at Tsinghua University in Beijing." },
  { name: "MIT", type: "philanthropy", description: "Schwarzman donated $350M to MIT for a new computing college." },
  { name: "Israel", type: "investment", description: "Blackstone has invested in Israeli companies and real estate." }
]);

addConnections('citadel-llc', [
  { name: "Ken Griffin", type: "founder", description: "Ken Griffin founded Citadel in 1990. Not Jewish, but Citadel employs many Jewish executives." },
  { name: "Citadel Securities", type: "market making arm", description: "One of the largest market makers in the world." },
  { name: "Goldman Sachs", type: "industry peer", description: "Competes for top financial talent." }
]);

addConnections('renaissance-technologies', [
  { name: "Jim Simons", type: "founder", description: "Jim Simons (Jewish) founded Renaissance Technologies. Legendary mathematician-turned-investor." },
  { name: "Medallion Fund", type: "flagship fund", description: "The Medallion Fund is considered the most successful hedge fund in history, averaging 66% annual returns." },
  { name: "Stony Brook University", type: "philanthropy", description: "Simons was a major donor to Stony Brook and served as mathematics department chair." },
  { name: "Simons Foundation", type: "philanthropy", description: "The Simons Foundation supports mathematics, physics, and autism research with $4B+ in grants." },
  { name: "Math for America", type: "education", description: "Simons founded Math for America to improve math teaching." },
  { name: "MIT", type: "academic connection", description: "Simons received his PhD from Berkeley and had connections to MIT's math community." }
]);

addConnections('the-carlyle-group', [
  { name: "David Rubenstein", type: "co-founder", description: "David Rubenstein (Jewish) co-founded Carlyle in 1987. Major philanthropist, signed Giving Pledge." },
  { name: "National Archives", type: "philanthropy", description: "Rubenstein donated to restore the Magna Carta and other historical documents." },
  { name: "Kennedy Center", type: "philanthropy", description: "Rubenstein is chairman of the Kennedy Center and a major arts patron." },
  { name: "Duke University", type: "philanthropy", description: "Rubenstein donated $50M+ to Duke University." },
  { name: "Blackstone Group", type: "industry peer", description: "Fellow private equity giant." }
]);

addConnections('soros-fund-management', [
  { name: "George Soros", type: "founder", description: "George Soros (Jewish, Hungarian-born) founded the fund. Known as 'The Man Who Broke the Bank of England.'" },
  { name: "Open Society Foundations", type: "philanthropy", description: "Soros's $32B+ philanthropic network supporting democracy and human rights worldwide." },
  { name: "Alexander Soros", type: "successor", description: "Alexander Soros (Jewish) now leads the Soros philanthropic empire." },
  { name: "Central European University", type: "founded institution", description: "Soros founded CEU in Budapest (now Vienna) to promote open society values." },
  { name: "J Street", type: "funded organization", description: "Soros was an early supporter of J Street's pro-peace advocacy." },
  { name: "Democratic Party", type: "political donations", description: "Soros is one of the largest donors to Democratic causes." },
  { name: "Quantum Fund", type: "legendary fund", description: "Soros's Quantum Fund returned 30%+ annually over decades." }
]);

// ============================================================
// UNITED STATES - ENTERTAINMENT & STUDIOS
// ============================================================

addConnections('warner-music-group', [
  { name: "Len Blavatnik", type: "owner", description: "Len Blavatnik (Jewish, Ukrainian-born) acquired Warner Music for $3.3 billion through Access Industries." },
  { name: "Access Industries", type: "parent company", description: "Blavatnik's industrial conglomerate owns Warner Music." },
  { name: "Atlantic Records", type: "subsidiary", description: "Major label within Warner Music Group." },
  { name: "Warner Bros. Discovery", type: "former sibling", description: "Previously part of the Time Warner conglomerate." },
  { name: "Blavatnik Family Foundation", type: "philanthropy", description: "Supports education, culture, and Jewish causes." },
  { name: "Tel Aviv University", type: "philanthropy", description: "Blavatnik donated to TAU's School of Computer Science." }
]);

addConnections('universal-music-group', [
  { name: "Lucian Grainge", type: "CEO", description: "Sir Lucian Grainge (Jewish, British) is chairman and CEO of UMG." },
  { name: "Vivendi", type: "former parent", description: "UMG was previously owned by Vivendi." },
  { name: "Interscope Records", type: "subsidiary", description: "Major label within UMG." },
  { name: "Republic Records", type: "subsidiary", description: "Major label within UMG." },
  { name: "Def Jam Recordings", type: "subsidiary", description: "Co-founded by Rick Rubin (Jewish); major hip-hop label within UMG." },
  { name: "Island Records", type: "subsidiary", description: "Legendary label within UMG." }
]);

// ============================================================
// UNITED STATES - RETAIL & CONSUMER
// ============================================================

addConnections('starbucks', [
  { name: "Howard Schultz", type: "founder/builder", description: "Howard Schultz (Jewish) grew Starbucks from 11 stores to a global empire of 35,000+ locations." },
  { name: "Schultz Family Foundation", type: "philanthropy", description: "Supports veterans, youth, and underserved communities." },
  { name: "Israel", type: "controversy", description: "Schultz has faced boycott calls despite having no Starbucks stores in Israel." },
  { name: "Lev Leviev", type: "Jewish business network", description: "Part of the broader network of Jewish business leaders." }
]);
updateBio('starbucks', 'Howard Schultz', 'Jewish business leader who built Starbucks into a global brand. Born to a Jewish family in Brooklyn public housing projects. Grew Starbucks from 11 stores to 35,000+ worldwide. Net worth ~$5 billion. Active philanthropist; considered running for US President in 2020.');

addConnections('costco', [
  { name: "Jeffrey Brotman", type: "co-founder", description: "Jeffrey Brotman (Jewish) co-founded Costco in 1983." },
  { name: "Jim Sinegal", type: "co-founder", description: "Jim Sinegal co-founded Costco with Brotman." },
  { name: "Price Club", type: "merger", description: "Costco merged with Price Club (founded by Sol Price, Jewish) in 1993." },
  { name: "Sol Price", type: "pioneer", description: "Sol Price (Jewish) invented the warehouse club retail model with Price Club." },
  { name: "Brotman family philanthropy", type: "philanthropy", description: "The Brotman family supported Jewish community organizations in Seattle." }
]);

addConnections('ralph-lauren-corporation', [
  { name: "Ralph Lauren", type: "founder", description: "Ralph Lauren (Jewish, born Ralph Lifshitz) founded the fashion empire." },
  { name: "Polo brand", type: "flagship brand", description: "The iconic Polo Ralph Lauren brand." },
  { name: "Ralph Lauren Foundation", type: "philanthropy", description: "Supports cancer research and education." },
  { name: "Fashion industry", type: "industry", description: "Lauren is one of several prominent Jewish figures who shaped American fashion, alongside Calvin Klein and Donna Karan." },
  { name: "Calvin Klein", type: "industry peer", description: "Fellow Jewish fashion designer who built a major American brand." },
  { name: "Donna Karan/DKNY", type: "industry peer", description: "Fellow Jewish fashion designer and DKNY founder." }
]);

addConnections('estee-lauder-companies', [
  { name: "Estée Lauder", type: "founder", description: "Estée Lauder (Jewish, née Josephine Esther Mentzer) founded the cosmetics empire in 1946." },
  { name: "Ronald Lauder", type: "family/chairman", description: "Ronald Lauder (Jewish) served as chairman and is president of the World Jewish Congress." },
  { name: "World Jewish Congress", type: "connection", description: "Ronald Lauder has been president of the World Jewish Congress since 2007." },
  { name: "Clinique", type: "brand", description: "Major cosmetics brand owned by Estée Lauder Companies." },
  { name: "MAC Cosmetics", type: "brand", description: "Major cosmetics brand owned by Estée Lauder Companies." },
  { name: "Lauder Foundation", type: "philanthropy", description: "The Lauder family supports Jewish education and cultural preservation worldwide." },
  { name: "Museum of Modern Art", type: "philanthropy", description: "Ronald Lauder donated his art collection and funds to MoMA and the Neue Galerie." }
]);

// ============================================================
// UNITED STATES - REAL ESTATE
// ============================================================

addConnections('brookfield-asset-management', [
  { name: "Bruce Flatt", type: "CEO", description: "CEO of Brookfield; the company has Jewish leadership in key positions." },
  { name: "Brookfield Properties", type: "subsidiary", description: "Major commercial real estate arm." },
  { name: "Manhattan West", type: "development", description: "Major NYC development project." }
]);

addConnections('related-companies', [
  { name: "Stephen Ross", type: "founder", description: "Stephen Ross (Jewish) founded Related Companies and developed Hudson Yards." },
  { name: "Hudson Yards", type: "development", description: "The $25 billion Hudson Yards development in Manhattan, the largest private real estate development in US history." },
  { name: "Miami Dolphins", type: "sports ownership", description: "Ross owns the Miami Dolphins NFL team." },
  { name: "Equinox", type: "investment", description: "Related Companies owns Equinox fitness clubs." },
  { name: "Jeff Blau", type: "CEO", description: "Jeff Blau (Jewish) is CEO of Related Companies." },
  { name: "Time Warner Center", type: "development", description: "Related developed the Time Warner Center in Columbus Circle." }
]);

// ============================================================
// UNITED STATES - PHILANTHROPY & FOUNDATIONS
// ============================================================

addConnections('jewish-federations-of-north-america', [
  { name: "United Jewish Appeal (UJA)", type: "predecessor", description: "JFNA was formed from the merger of UJA, United Israel Appeal, and Council of Jewish Federations." },
  { name: "Jewish Agency for Israel", type: "partner", description: "JFNA works with the Jewish Agency on Israel-related programs." },
  { name: "American Jewish Joint Distribution Committee", type: "partner", description: "JFNA supports JDC's overseas Jewish community programs." },
  { name: "Birthright Israel", type: "partner", description: "JFNA helps fund Birthright Israel trips for young Jews." },
  { name: "Local Jewish Federations", type: "network", description: "JFNA is the umbrella for 146 local Jewish Federations and 300+ communities." },
  { name: "Conference of Presidents", type: "member", description: "JFNA is a member of the Conference of Presidents." }
]);

addConnections('birthright-israel', [
  { name: "Charles Bronfman", type: "co-founder", description: "Charles Bronfman (Jewish, Seagram heir) co-founded Birthright Israel." },
  { name: "Michael Steinhardt", type: "co-founder", description: "Michael Steinhardt (Jewish) co-founded Birthright Israel." },
  { name: "Sheldon Adelson", type: "major donor", description: "Sheldon Adelson (Jewish) donated $410M+ to Birthright Israel." },
  { name: "Israeli Government", type: "co-funder", description: "The Israeli government provides significant funding for Birthright." },
  { name: "Jewish Agency for Israel", type: "partner", description: "The Jewish Agency helps coordinate Birthright trips." },
  { name: "Hillel International", type: "campus partner", description: "Hillel helps recruit college students for Birthright trips." },
  { name: "JFNA", type: "partner", description: "Jewish Federations help fund and promote Birthright." }
]);

addConnections('hillel-international', [
  { name: "Birthright Israel", type: "partner", description: "Hillel helps recruit students for Birthright trips." },
  { name: "AIPAC", type: "campus connection", description: "Some Hillel chapters coordinate with AIPAC on campus." },
  { name: "StandWithUs", type: "campus partner", description: "Both work on Jewish life and Israel advocacy on campuses." },
  { name: "Chabad on Campus", type: "campus peer", description: "Both serve Jewish students on college campuses." },
  { name: "Jewish Federations", type: "funder", description: "Local Jewish Federations help fund Hillel chapters." }
]);

// ============================================================
// UNITED STATES - EDUCATION
// ============================================================

addConnections('brandeis-university', [
  { name: "Louis Brandeis", type: "namesake", description: "Named after Louis Brandeis (Jewish), first Jewish Supreme Court Justice." },
  { name: "Hadassah", type: "founding supporter", description: "Hadassah was instrumental in founding Brandeis University." },
  { name: "Jewish community", type: "founding", description: "Founded in 1948 by the American Jewish community as a nonsectarian university." }
]);

addConnections('yeshiva-university', [
  { name: "Albert Einstein College of Medicine", type: "subsidiary", description: "YU's medical school in the Bronx, named after Albert Einstein (Jewish)." },
  { name: "Rabbi Isaac Elchanan Theological Seminary", type: "seminary", description: "YU's rabbinical school, one of the premier Orthodox rabbinical seminaries." },
  { name: "Orthodox Union", type: "community connection", description: "YU is closely connected to the Modern Orthodox community." },
  { name: "Yeshiva University Museum", type: "cultural institution", description: "Exhibits Jewish art and culture." }
]);

// ============================================================
// UNITED STATES - LAW FIRMS
// ============================================================

addConnections('wachtell-lipton-rosen-katz', [
  { name: "Herbert Wachtell", type: "founding partner", description: "Herbert Wachtell (Jewish) co-founded the firm." },
  { name: "Martin Lipton", type: "founding partner", description: "Martin Lipton (Jewish) invented the 'poison pill' defense against hostile takeovers." },
  { name: "New York University", type: "philanthropy", description: "Lipton donated to NYU School of Law." },
  { name: "Wall Street", type: "client base", description: "Wachtell Lipton is the go-to firm for the biggest M&A deals on Wall Street." }
]);

addConnections('paul-weiss', [
  { name: "Brad Karp", type: "chairman", description: "Brad Karp (Jewish) is chairman of Paul Weiss." },
  { name: "Goldman Sachs", type: "major client", description: "Paul Weiss regularly represents Goldman Sachs and other major financial institutions." },
  { name: "Major corporate clients", type: "practice", description: "One of the most prestigious corporate law firms in the world." }
]);

// ============================================================
// UNITED STATES - SPORTS
// ============================================================

addConnections('new-york-knicks-msg-', [
  { name: "Madison Square Garden", type: "venue", description: "MSG is the iconic home of the Knicks and Rangers." },
  { name: "James Dolan", type: "owner", description: "James Dolan owns MSG and the Knicks/Rangers." },
  { name: "New York Rangers", type: "sibling team", description: "Also owned by MSG Sports." }
]);

addConnections('new-england-patriots', [
  { name: "Robert Kraft", type: "owner", description: "Robert Kraft (Jewish) purchased the Patriots in 1994 for $172M; now worth $7B+." },
  { name: "Kraft Group", type: "parent company", description: "The Kraft Group is Robert Kraft's holding company." },
  { name: "Israel", type: "philanthropy", description: "Kraft is a major supporter of Israel and Jewish causes." },
  { name: "Columbia University", type: "alma mater", description: "Kraft is a Columbia University alumnus and donor." },
  { name: "Tom Brady era", type: "legacy", description: "Under Kraft's ownership, the Patriots won 6 Super Bowls." },
  { name: "New England Revolution", type: "sibling team", description: "Kraft also owns the MLS team New England Revolution." },
  { name: "Genesis Prize", type: "award", description: "Kraft won the Genesis Prize ('Jewish Nobel') in 2019, donating the $1M prize to combat antisemitism." }
]);

// ============================================================
// ISRAEL - TECHNOLOGY
// ============================================================

addConnections('check-point-software', [
  { name: "Gil Shwed", type: "founder & CEO", description: "Gil Shwed (Jewish) co-founded Check Point and serves as CEO. Pioneer of the modern firewall." },
  { name: "Unit 8200", type: "origin", description: "Shwed served in IDF Unit 8200, the elite signals intelligence unit that spawned many Israeli tech companies." },
  { name: "NASDAQ", type: "listing", description: "Check Point is listed on NASDAQ." },
  { name: "Palo Alto Networks", type: "competitor/offshoot", description: "Several Check Point alumni founded competing cybersecurity firms." },
  { name: "CyberArk", type: "Israeli cybersecurity peer", description: "Fellow Israeli cybersecurity company." },
  { name: "Wiz", type: "Israeli cybersecurity peer", description: "Cloud security startup founded by Check Point alumni." }
]);

addConnections('wix-com', [
  { name: "Avishai Abrahami", type: "co-founder & CEO", description: "Avishai Abrahami (Jewish, Israeli) co-founded Wix in 2006." },
  { name: "Tel Aviv", type: "headquarters", description: "Wix is headquartered in Tel Aviv." },
  { name: "NASDAQ", type: "listing", description: "Wix is listed on NASDAQ." },
  { name: "Israeli tech ecosystem", type: "ecosystem", description: "Wix is one of Israel's most successful consumer tech companies." }
]);

addConnections('fiverr', [
  { name: "Micha Kaufman", type: "co-founder & CEO", description: "Micha Kaufman (Israeli Jewish) co-founded Fiverr." },
  { name: "Tel Aviv", type: "headquarters", description: "Fiverr is headquartered in Tel Aviv." },
  { name: "NASDAQ", type: "listing", description: "Fiverr is listed on NASDAQ." },
  { name: "Israeli tech ecosystem", type: "ecosystem", description: "Part of Israel's thriving startup scene." }
]);

addConnections('mobileye', [
  { name: "Amnon Shashua", type: "co-founder & CEO", description: "Prof. Amnon Shashua (Israeli Jewish) co-founded Mobileye." },
  { name: "Intel", type: "parent/acquirer", description: "Intel acquired Mobileye for $15.3 billion in 2017." },
  { name: "Hebrew University", type: "academic origin", description: "Mobileye technology originated from Shashua's research at Hebrew University." },
  { name: "Jerusalem", type: "headquarters", description: "Mobileye is headquartered in Jerusalem." },
  { name: "BMW, Volkswagen, GM", type: "customers", description: "Major automakers use Mobileye's autonomous driving technology." },
  { name: "Unit 8200", type: "talent pipeline", description: "Mobileye recruits from Israel's elite military tech units." }
]);

addConnections('nice-systems', [
  { name: "Unit 8200", type: "origin", description: "NICE was founded by 7 IDF veterans from signals intelligence." },
  { name: "Ra'anana", type: "headquarters", description: "NICE is headquartered in Ra'anana, Israel." },
  { name: "NASDAQ", type: "listing", description: "NICE is listed on NASDAQ." },
  { name: "Israeli defense industry", type: "origin", description: "NICE emerged from Israeli military intelligence technology." }
]);

addConnections('cyberark', [
  { name: "Udi Mokady", type: "founder & CEO", description: "Udi Mokady (Israeli Jewish) co-founded CyberArk." },
  { name: "Petah Tikva", type: "headquarters", description: "CyberArk is headquartered in Petah Tikva, Israel." },
  { name: "Unit 8200", type: "talent source", description: "CyberArk recruits from Israel's elite military cyber units." },
  { name: "Check Point", type: "cybersecurity peer", description: "Fellow Israeli cybersecurity pioneer." },
  { name: "NASDAQ", type: "listing", description: "CyberArk is listed on NASDAQ." }
]);

// ============================================================
// ISRAEL - DEFENSE
// ============================================================

addConnections('israel-aerospace-industries-iai-', [
  { name: "Israeli Ministry of Defense", type: "government owner", description: "IAI is fully owned by the Israeli government." },
  { name: "IDF", type: "primary customer", description: "IAI is a primary supplier to the Israel Defense Forces." },
  { name: "Boeing", type: "partnership", description: "IAI partners with Boeing on various defense programs." },
  { name: "Arrow Missile System", type: "product", description: "IAI develops the Arrow anti-ballistic missile system." },
  { name: "Rafael Advanced Defense Systems", type: "peer", description: "Fellow Israeli defense company." },
  { name: "Elbit Systems", type: "peer", description: "Fellow Israeli defense company." }
]);

addConnections('rafael-advanced-defense-systems', [
  { name: "Iron Dome", type: "product", description: "Rafael developed the Iron Dome missile defense system in partnership with the IDF." },
  { name: "US Department of Defense", type: "customer", description: "The US co-produces Iron Dome components." },
  { name: "Raytheon", type: "partnership", description: "Raytheon co-produces Iron Dome for the US military." },
  { name: "IAI", type: "industry peer", description: "Fellow Israeli defense company." },
  { name: "Elbit Systems", type: "industry peer", description: "Fellow Israeli defense company." },
  { name: "IDF", type: "primary customer", description: "Rafael is a primary supplier to the Israel Defense Forces." }
]);

addConnections('elbit-systems', [
  { name: "Israeli Ministry of Defense", type: "major customer", description: "Elbit is a key supplier to the IDF." },
  { name: "US Military", type: "customer", description: "Elbit supplies night vision, drone, and electronics systems to the US military." },
  { name: "Michael Federmann", type: "controlling family", description: "The Federmann family (Jewish) controls Elbit Systems." },
  { name: "Haifa", type: "headquarters", description: "Elbit is headquartered in Haifa, Israel." },
  { name: "Rafael", type: "industry peer", description: "Fellow Israeli defense company." },
  { name: "IAI", type: "industry peer", description: "Fellow Israeli defense company." }
]);

// ============================================================
// ISRAEL - GOVERNMENT & INSTITUTIONS
// ============================================================

addConnections('jewish-agency-for-israel', [
  { name: "World Zionist Organization", type: "historic relationship", description: "The Jewish Agency grew out of the World Zionist Organization." },
  { name: "Israeli Government", type: "quasi-governmental", description: "The Jewish Agency works closely with the Israeli government on immigration and diaspora relations." },
  { name: "Birthright Israel", type: "partner", description: "Helps coordinate Birthright trips." },
  { name: "Jewish Federations", type: "partner", description: "Works with JFNA and local federations worldwide." },
  { name: "Aliyah", type: "core mission", description: "Facilitates Jewish immigration to Israel (Aliyah)." },
  { name: "Nefesh B'Nefesh", type: "partner", description: "Partners on North American Aliyah programs." }
]);

addConnections('mossad', [
  { name: "Israeli Prime Minister", type: "reports to", description: "Mossad reports directly to the Israeli Prime Minister." },
  { name: "Shin Bet", type: "sibling agency", description: "Israel's domestic security service." },
  { name: "Aman (Military Intelligence)", type: "sibling agency", description: "IDF military intelligence directorate." },
  { name: "Unit 8200", type: "signals intelligence", description: "IDF's signals intelligence unit, Israel's equivalent of the NSA." },
  { name: "CIA", type: "intelligence partner", description: "Mossad works closely with the CIA on Middle East intelligence." },
  { name: "MI6", type: "intelligence partner", description: "Mossad collaborates with British intelligence." }
]);

addConnections('unit-8200', [
  { name: "Check Point Software", type: "alumni company", description: "Founded by Unit 8200 alumni." },
  { name: "NSO Group", type: "alumni company", description: "Founded by Unit 8200 alumni; developed Pegasus spyware." },
  { name: "Wiz", type: "alumni company", description: "Cloud security startup founded by Unit 8200 alumni." },
  { name: "CyberArk", type: "alumni company", description: "Cybersecurity company with Unit 8200 alumni." },
  { name: "Palo Alto Networks", type: "alumni company", description: "Cybersecurity company with Unit 8200 alumni in leadership." },
  { name: "Mossad", type: "intelligence community", description: "Unit 8200 feeds into Israel's intelligence community." },
  { name: "Israel Defense Forces", type: "parent organization", description: "Unit 8200 is part of the IDF's Intelligence Corps." },
  { name: "Silicon Valley", type: "talent export", description: "Unit 8200 alumni have founded or led dozens of Silicon Valley companies." }
]);

// ============================================================
// UNITED KINGDOM
// ============================================================

addConnections('rothschild-co', [
  { name: "Rothschild Family", type: "founding dynasty", description: "The Rothschild banking family (Jewish) has been one of the most influential financial dynasties in history since the 18th century." },
  { name: "Bank of England", type: "historical relationship", description: "The Rothschilds played a key role in British government finance and the Bank of England." },
  { name: "State of Israel", type: "historical role", description: "The Balfour Declaration of 1917 was addressed to Lord Walter Rothschild. The family helped finance early Jewish settlement in Palestine." },
  { name: "Edmond de Rothschild Group", type: "family branch", description: "Swiss-based branch of the Rothschild family's financial operations." },
  { name: "N M Rothschild & Sons", type: "banking arm", description: "The London-based investment banking division." },
  { name: "Waddesdon Manor", type: "cultural heritage", description: "Rothschild family estate, now a National Trust property." }
]);

addConnections('marks-spencer', [
  { name: "Michael Marks", type: "co-founder", description: "Michael Marks (Jewish, Polish immigrant) co-founded M&S in 1884." },
  { name: "Simon Marks", type: "builder", description: "Simon Marks (Jewish, son of founder) built M&S into a major retailer; created Baron Marks of Broughton." },
  { name: "Israel Sieff", type: "co-leader", description: "Israel Sieff (Jewish) was chairman and helped grow M&S; also a prominent Zionist." },
  { name: "Zionist movement", type: "historical connection", description: "Simon Marks and Israel Sieff were active in the Zionist movement and friends with Chaim Weizmann." },
  { name: "Chaim Weizmann", type: "personal connection", description: "Marks and Sieff were close friends of Chaim Weizmann, first President of Israel." },
  { name: "British Jewish community", type: "cultural significance", description: "M&S has been iconic in British Jewish life for over a century." }
]);

// ============================================================
// FRANCE
// ============================================================

addConnections('publicis-groupe', [
  { name: "Marcel Bleustein-Blanchet", type: "founder", description: "Marcel Bleustein-Blanchet (Jewish, French) founded Publicis in 1926." },
  { name: "Elisabeth Badinter", type: "heir/shareholder", description: "Elisabeth Badinter (Jewish), daughter of the founder, is the largest shareholder." },
  { name: "Maurice Lévy", type: "former CEO", description: "Maurice Lévy (Jewish, French) was CEO 1987-2017, building Publicis into a global giant." },
  { name: "Arthur Sadoun", type: "CEO", description: "Arthur Sadoun (Jewish) is current CEO of Publicis Groupe." },
  { name: "Sapient", type: "acquisition", description: "Publicis acquired Sapient for $3.7 billion." },
  { name: "Saatchi & Saatchi", type: "subsidiary", description: "Publicis owns Saatchi & Saatchi (founded by Maurice and Charles Saatchi, Jewish Iraqi brothers)." },
  { name: "Leo Burnett", type: "subsidiary", description: "Major advertising agency within Publicis." }
]);

addConnections('lvmh', [
  { name: "Bernard Arnault", type: "CEO/Chairman", description: "Bernard Arnault leads LVMH, the world's largest luxury goods company. Not Jewish, but LVMH has significant Jewish connections." },
  { name: "Sephora", type: "subsidiary", description: "LVMH owns Sephora retail chain." },
  { name: "Louis Vuitton", type: "flagship brand", description: "Iconic luxury fashion brand." },
  { name: "Dior", type: "subsidiary", description: "Christian Dior fashion house." }
]);

// ============================================================
// CANADA
// ============================================================

addConnections('onex-corporation', [
  { name: "Gerry Schwartz", type: "founder & CEO", description: "Gerry Schwartz (Jewish) founded Onex in 1984." },
  { name: "Heather Reisman", type: "spouse/Indigo", description: "Schwartz's wife Heather Reisman (Jewish) is founder and CEO of Indigo Books & Music." },
  { name: "HESEG Foundation", type: "philanthropy", description: "Schwartz and Reisman's foundation supporting lone soldiers who immigrate to Israel." },
  { name: "Mount Sinai Hospital (Toronto)", type: "philanthropy", description: "Major donors to Mount Sinai Hospital." },
  { name: "Canadian Jewish community", type: "community leadership", description: "Schwartz and Reisman are prominent leaders in Canada's Jewish community." },
  { name: "Indigo Books & Music", type: "family connection", description: "Schwartz's wife Heather Reisman founded Indigo." }
]);

addConnections('indigo-books-music', [
  { name: "Heather Reisman", type: "founder & CEO", description: "Heather Reisman (Jewish) founded Indigo in 1996." },
  { name: "Gerry Schwartz", type: "spouse/Onex", description: "Reisman's husband Gerry Schwartz (Jewish) is founder of Onex Corporation." },
  { name: "HESEG Foundation", type: "philanthropy", description: "Reisman and Schwartz's foundation supporting IDF lone soldiers." },
  { name: "Onex Corporation", type: "family connection", description: "Reisman's husband founded Onex." },
  { name: "Canadian Jewish community", type: "community", description: "Reisman is one of Canada's most prominent Jewish business leaders." }
]);

// ============================================================
// RUSSIA / FORMER SOVIET UNION
// ============================================================

addConnections('alfa-group', [
  { name: "Mikhail Fridman", type: "co-founder", description: "Mikhail Fridman (Jewish, Ukrainian-born) co-founded Alfa Group." },
  { name: "German Khan", type: "co-founder", description: "German Khan (Jewish) is a co-founder of Alfa Group." },
  { name: "Alfa-Bank", type: "subsidiary", description: "Russia's largest private bank." },
  { name: "LetterOne", type: "investment vehicle", description: "Fridman's Luxembourg-based investment company." },
  { name: "Genesis Philanthropy Group", type: "philanthropy", description: "Fridman co-founded GPG to support Jewish identity and education worldwide." },
  { name: "Russian Jewish Congress", type: "community", description: "Fridman has been active in Russian Jewish community leadership." }
]);

// ============================================================
// SOUTH AFRICA
// ============================================================

addConnections('naspers', [
  { name: "Prosus", type: "subsidiary", description: "Naspers' international internet investment arm." },
  { name: "Tencent", type: "major investment", description: "Naspers' early investment in Tencent was worth over $200 billion at its peak." },
  { name: "Koos Bekker", type: "former CEO", description: "Made the legendary Tencent investment." },
  { name: "South African Jewish community", type: "community", description: "Naspers has connections to South Africa's Jewish business community." }
]);

// ============================================================
// AUSTRALIA
// ============================================================

addConnections('westfield-group', [
  { name: "Frank Lowy", type: "co-founder", description: "Sir Frank Lowy (Jewish, Czech-born, Holocaust survivor) co-founded Westfield." },
  { name: "John Lowy", type: "co-founder", description: "John Lowy co-founded Westfield with Frank." },
  { name: "Unibail-Rodamco-Westfield", type: "merger", description: "Westfield merged with Unibail-Rodamco in 2018 for $32 billion." },
  { name: "Lowy Institute", type: "think tank", description: "Frank Lowy founded the Lowy Institute for International Policy in Sydney." },
  { name: "Football Federation Australia", type: "sports", description: "Frank Lowy was chairman of Football Federation Australia." },
  { name: "Israel", type: "personal connection", description: "Lowy fought in Israel's War of Independence in 1948 before immigrating to Australia." },
  { name: "Australian Jewish community", type: "community", description: "The Lowy family are pillars of Australia's Jewish community." }
]);

// ============================================================
// AUTO-GENERATE CROSS-REFERENCES
// ============================================================
// For all entries, cross-reference any shared individuals
// This creates automatic connections where the same person appears in multiple entries

const personToEntries = {};
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    if (entry.individuals) {
      entry.individuals.forEach(ind => {
        if (!personToEntries[ind.name]) personToEntries[ind.name] = [];
        personToEntries[ind.name].push({ entryId: entry.id, entryName: entry.name, country });
      });
    }
  }
}

// Add connections for entries that share individuals
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    if (!entry.connections) entry.connections = [];
    if (entry.individuals) {
      entry.individuals.forEach(ind => {
        const appearances = personToEntries[ind.name] || [];
        appearances.forEach(app => {
          if (app.entryId !== entry.id && !entry.connections.find(c => c.entryId === app.entryId)) {
            entry.connections.push({
              name: app.entryName,
              type: "shared individual",
              description: `${ind.name} is also associated with ${app.entryName} (${app.country}).`,
              entryId: app.entryId
            });
          }
        });
      });
    }
  }
}

// ============================================================
// ENRICH DESCRIPTIONS for entries that have sparse descriptions
// ============================================================

// Technology
updateDesc('microsoft', 'Co-founded by Bill Gates and Paul Allen in 1975. Steve Ballmer (Jewish father) served as CEO 2000-2014. Microsoft has one of its largest R&D centers outside the US in Israel (Herzliya & Haifa). Acquired LinkedIn (co-founded by Reid Hoffman, Jewish mother) for $26.2B, GitHub for $7.5B, and Activision Blizzard for $69B (Bobby Kotick, Jewish, was CEO). Major investor ($13B+) in OpenAI (Sam Altman, Jewish, is CEO).');
updateDesc('bloomberg-lp', 'Founded by Michael Bloomberg (Jewish) in 1981. Bloomberg is the dominant financial data and media company with $12B+ annual revenue. Bloomberg served as Mayor of NYC 2002-2013 and ran for President in 2020. He has donated over $14.4 billion through Bloomberg Philanthropies, making him one of the largest philanthropists in history. Major supporter of Israel and Jewish causes.');

// Finance
updateDesc('blackrock', 'Founded by Larry Fink (Jewish) in 1988 in a single room at Blackstone Group. BlackRock is now the world\'s largest asset manager with over $10 trillion in assets under management. The Aladdin risk management platform is used by institutions managing $20T+ in assets. BlackRock has been hired by the Federal Reserve and other central banks as an advisor. Fink is one of the most powerful figures in global finance.');
updateDesc('blackstone-group', 'Co-founded by Stephen Schwarzman (Jewish) and Pete Peterson in 1985. Blackstone is the world\'s largest alternative investment firm with $1 trillion+ in AUM. Schwarzman is one of the wealthiest people in the world. Blackstone\'s $26B acquisition of Hilton Hotels was one of the most profitable private equity deals in history. Has significant investments in Israel.');
updateDesc('renaissance-technologies', 'Founded by Jim Simons (Jewish) in 1982. Renaissance\'s Medallion Fund is considered the most successful hedge fund in history, averaging 66% annual returns before fees. Simons was a former NSA codebreaker and mathematics professor. The Simons Foundation has donated $4B+ to mathematics, physics, and autism research. Simons passed away in 2024.');
updateDesc('the-carlyle-group', 'Co-founded by David Rubenstein (Jewish) in 1987. One of the world\'s largest private equity firms with $400B+ in AUM. Rubenstein is a major philanthropist who has donated to restore the Magna Carta, the Washington Monument, and other national treasures. Chairman of the Kennedy Center and a prominent television interviewer on Bloomberg TV.');

// Media
updateDesc('comcast-nbcuniversal', 'Founded by Ralph Roberts (Jewish) in 1963. Now led by his son Brian Roberts (Jewish), who is chairman and CEO. Comcast is the largest cable company in the US and owns NBCUniversal, which includes NBC, Universal Pictures, and theme parks. Acquired DreamWorks Animation (founded by Jeffrey Katzenberg and Steven Spielberg, both Jewish) and Sky Group ($39B). The Roberts family are prominent members of Philadelphia\'s Jewish community.');
updateDesc('the-new-york-times', 'The Ochs-Sulzberger family (Jewish) has controlled the New York Times since Adolph Ochs purchased it in 1896. A.G. Sulzberger (Jewish, 5th generation) is the current publisher. The NYT is considered the newspaper of record in the United States. The family\'s stewardship of the paper spans over 125 years across five generations.');
updateDesc('paramount-global', 'Controlled by Shari Redstone (Jewish) through National Amusements. Her father Sumner Redstone (Jewish, born Rothstein) built the Viacom/CBS media empire. Paramount owns CBS, MTV, Nickelodeon, BET, Paramount Pictures, Showtime, and Paramount+. In 2024, Paramount agreed to merge with Skydance Media, founded by David Ellison (Jewish), son of Oracle founder Larry Ellison.');

// Retail/Consumer
updateDesc('costco', 'Co-founded by Jeffrey Brotman (Jewish) and Jim Sinegal in 1983 in Seattle. Costco later merged with Price Club, which was founded by Sol Price (Jewish), the inventor of the warehouse club retail model. Costco is now the 5th largest retailer in the world with 800+ warehouses and $240B+ in annual revenue.');
updateDesc('ralph-lauren-corporation', 'Founded by Ralph Lauren (Jewish, born Ralph Lifshitz in the Bronx) in 1967 with a line of men\'s ties. Built into a $6B+ fashion empire encompassing Polo, Ralph Lauren, and other luxury brands. Lauren was born to Jewish immigrants from Belarus. He is a major philanthropist supporting cancer research.');
updateDesc('estee-lauder-companies', 'Founded by Estée Lauder (Jewish, née Josephine Esther Mentzer) in 1946. Now a Fortune 500 company with $15B+ in annual revenue. Ronald Lauder (Jewish), son of the founder, is president of the World Jewish Congress and a major art collector. The Lauder family supports Jewish education and cultural preservation globally. Brands include Clinique, MAC, Bobbi Brown, La Mer, and Aveda.');

// US Tech
updateDesc('intel-israel-', 'Intel has invested $50B+ in Israel since 1974, making it one of the largest foreign investors in Israel\'s history. Intel Israel employs 12,000+ people across development centers in Haifa, Jerusalem, and Petah Tikva, and a chip fabrication plant in Kiryat Gat. Intel\'s legendary CEO Andy Grove (Jewish, born András Gróf in Hungary, Holocaust survivor) built Intel into the world\'s dominant chip maker. Intel acquired Israeli companies Mobileye ($15.3B) and Tower Semiconductor.');

// Real Estate
updateDesc('related-companies', 'Founded by Stephen Ross (Jewish) in 1972. Developed Hudson Yards, the $25 billion mega-development in Manhattan , the largest private real estate project in US history. Ross also owns the Miami Dolphins NFL team. Jeff Blau (Jewish) serves as CEO. The firm has developed over $60 billion in real estate.');

// Defense
updateDesc('check-point-software', 'Co-founded by Gil Shwed (Jewish) in 1993, a veteran of IDF Unit 8200. Check Point invented the modern commercial firewall and pioneered network cybersecurity. Headquartered in Tel Aviv and Redwood City, CA. Revenue exceeds $2B annually. Many Check Point alumni have gone on to found other cybersecurity companies.');
updateDesc('mobileye', 'Co-founded by Prof. Amnon Shashua (Israeli Jewish) and Ziv Aviram in 1999 in Jerusalem. Mobileye developed the world\'s leading autonomous driving vision technology used by BMW, VW, GM, Ford, and others. Intel acquired Mobileye for $15.3 billion in 2017, then IPO\'d a minority stake in 2022. Shashua\'s technology originated from his research at Hebrew University.');

// ============================================================
// ADD MORE INDIVIDUALS WHERE MISSING
// ============================================================

// Google
addIndividual('google-alphabet-', { name: 'Susan Wojcicki', role: 'Former YouTube CEO', bio: 'Susan Wojcicki (Jewish, Polish-American) was CEO of YouTube 2014-2023. She rented her garage to Larry Page and Sergey Brin when they started Google. Passed away in 2024.' });

// Meta
addIndividual('facebook-meta-', { name: 'Sheryl Sandberg', role: 'Former COO', bio: 'Sheryl Sandberg (Jewish) was COO of Meta/Facebook 2008-2022. Author of Lean In. Previously VP at Google. Active in Jewish philanthropic causes.' });

// Microsoft
addIndividual('microsoft', { name: 'Steve Ballmer', role: 'Former CEO', bio: 'Steve Ballmer (Jewish father) was CEO of Microsoft 2000-2014. Now owns the LA Clippers. Net worth ~$120 billion.' });
addIndividual('microsoft', { name: 'Sam Altman', role: 'OpenAI CEO (Microsoft partner)', bio: 'Sam Altman (Jewish) is CEO of OpenAI, in which Microsoft invested $13B+. Previously president of Y Combinator.' });

// Paramount
addIndividual('paramount-global', { name: 'David Ellison', role: 'Incoming CEO (Skydance merger)', bio: 'David Ellison (Jewish), son of Oracle founder Larry Ellison, founded Skydance Media. Paramount agreed to merge with Skydance in 2024.' });

// Goldman Sachs
addIndividual('goldman-sachs', { name: 'Steven Mnuchin', role: 'Former Goldman Partner & US Treasury Secretary', bio: 'Steven Mnuchin (Jewish) was a Goldman Sachs partner before serving as US Treasury Secretary 2017-2021.' });

// Warner Music
addIndividual('warner-music-group', { name: 'Max Lousada', role: 'CEO of Recorded Music', bio: 'Leads Warner Music\'s global recorded music operations.' });

// ============================================================
// SAVE
// ============================================================

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));

// Stats
let totalEntries = 0;
let totalCountries = Object.keys(data.countries).length;
let entriesWithConnections = 0;
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    totalEntries++;
    if (entry.connections && entry.connections.length > 0) entriesWithConnections++;
  }
}
const totalPeople = Object.keys(people.people).length;

console.log(`Done! ${totalEntries} entries across ${totalCountries} countries, ${totalPeople} people.`);
console.log(`${entriesWithConnections} entries now have connections.`);
console.log('Saved to data/jewish.json and data/people.json');
