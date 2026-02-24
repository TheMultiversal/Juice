// addConnections2.js - US entries enrichment
// Run AFTER addConnections.js
// Adds connections, enriched descriptions, and individuals to all remaining US entries
const fs = require('fs');
const path = require('path');
const jewishFile = path.join(__dirname, '..', 'data', 'jewish.json');
const peopleFile = path.join(__dirname, '..', 'data', 'people.json');
const data = JSON.parse(fs.readFileSync(jewishFile, 'utf8'));
const people = JSON.parse(fs.readFileSync(peopleFile, 'utf8'));

function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
const entryIndex = {};
for (const country in data.countries) { for (const entry of data.countries[country]) { entryIndex[entry.id] = { entry, country }; } }

function addConn(id, connections) {
  if (!entryIndex[id]) return;
  const e = entryIndex[id].entry;
  if (!e.connections) e.connections = [];
  connections.forEach(c => { if (!e.connections.find(x => x.name === c.name)) e.connections.push(c); });
}
function updDesc(id, d) { if (entryIndex[id]) entryIndex[id].entry.description = d; }
function updBio(id, name, bio) {
  if (!entryIndex[id]) return;
  const ind = entryIndex[id].entry.individuals.find(i => i.name === name);
  if (ind) { ind.bio = bio; const pid = slugify(name); if (people.people[pid]) people.people[pid].bio = bio; }
}
function addInd(id, person) {
  if (!entryIndex[id]) return;
  const e = entryIndex[id].entry;
  const pid = slugify(person.name);
  if (!e.individuals.find(i => i.id === pid)) {
    person.id = pid; e.individuals.push(person);
    if (!people.people[pid]) people.people[pid] = { name: person.name, bio: person.bio || '', notes: '' };
  }
}

// ============================================================
// US - TECHNOLOGY
// ============================================================

addConn('iac-interactivecorp', [
  { name: "Barry Diller", type: "founder/chairman", description: "Barry Diller (Jewish) controls IAC/InterActiveCorp, a media and internet conglomerate." },
  { name: "Match Group", type: "spinoff", description: "IAC spun off Match Group (Tinder, Match.com, Hinge) in 2020." },
  { name: "Angi Homeservices", type: "subsidiary", description: "IAC owns Angi (formerly Angie's List)." },
  { name: "Expedia Group", type: "former subsidiary", description: "IAC previously owned Expedia before spinning it off." },
  { name: "Paramount Pictures", type: "career history", description: "Diller was chairman of Paramount Pictures and Fox Broadcasting before IAC." },
  { name: "Diane von Furstenberg", type: "personal connection", description: "Diller is married to fashion designer Diane von Furstenberg (Jewish, Belgian-born)." }
]);
updDesc('iac-interactivecorp', 'Founded by Barry Diller (Jewish). IAC is a holding company that has launched and spun off Match Group (Tinder, Match.com, OkCupid, Hinge), Expedia, Ticketmaster, and others. Diller previously ran Paramount Pictures and Fox Broadcasting. Total companies spun off by IAC are worth over $100 billion. Diller is married to fashion designer Diane von Furstenberg (Jewish).');

addConn('qualcomm', [
  { name: "Irwin Jacobs", type: "co-founder", description: "Irwin Jacobs (Jewish) co-founded Qualcomm in 1985 and served as CEO until 2005." },
  { name: "Paul Jacobs", type: "former CEO", description: "Paul Jacobs (Jewish), son of Irwin, served as Qualcomm CEO 2005-2014." },
  { name: "CDMA technology", type: "innovation", description: "Qualcomm invented CDMA cellular technology which became the foundation of 3G/4G/5G." },
  { name: "Technion", type: "philanthropy", description: "Irwin Jacobs is a major donor to Technion - Israel Institute of Technology." },
  { name: "UC San Diego", type: "philanthropy", description: "The Jacobs family donated $120M+ to UCSD; the engineering school bears their name." },
  { name: "Israeli R&D", type: "operations", description: "Qualcomm operates R&D centers in Israel." }
]);
updDesc('qualcomm', 'Co-founded by Irwin Jacobs (Jewish) and Andrew Viterbi (Jewish) in 1985 in San Diego. Qualcomm invented CDMA technology underlying modern cellular networks. Revenue exceeds $35B annually. Irwin\'s son Paul Jacobs (Jewish) served as CEO 2005-2014. Irwin Jacobs is a major Technion donor and philanthropist. The Jacobs School of Engineering at UCSD bears the family name. Qualcomm has R&D operations in Israel.');
addInd('qualcomm', { name: 'Andrew Viterbi', role: 'Co-founder', bio: 'Andrew Viterbi (Jewish, Italian-born), co-founder of Qualcomm. Invented the Viterbi algorithm used in cellular networks, WiFi, and space communications. The Viterbi School of Engineering at USC bears his name.' });

addConn('nvidia-corporation', [
  { name: "Jensen Huang", type: "CEO", description: "Jensen Huang (not Jewish) co-founded Nvidia, but Israeli engineers play key roles." },
  { name: "Mellanox Technologies", type: "acquisition", description: "Nvidia acquired Israeli company Mellanox Technologies for $6.9 billion in 2020." },
  { name: "Israel R&D", type: "operations", description: "Nvidia's Israel operations (from Mellanox) are a critical part of its data center networking." },
  { name: "AI industry", type: "market", description: "Nvidia is the world's most valuable semiconductor company, powering the AI revolution." },
  { name: "Eyal Waldman", type: "Mellanox founder", description: "Eyal Waldman (Israeli Jewish) founded Mellanox and received $700M+ from the Nvidia acquisition." }
]);
updDesc('nvidia-corporation', 'Nvidia acquired Israeli company Mellanox Technologies for $6.9 billion in 2020, making Israel a critical hub for Nvidia\'s data center networking division. Mellanox was founded by Eyal Waldman (Israeli Jewish). Nvidia employs thousands of engineers in Israel. The company is now worth over $3 trillion, making it one of the most valuable companies in history.');
addInd('nvidia-corporation', { name: 'Eyal Waldman', role: 'Founder of Mellanox (acquired by Nvidia)', bio: 'Eyal Waldman (Israeli Jewish), founder and former CEO of Mellanox Technologies. Mellanox was acquired by Nvidia for $6.9 billion. Waldman is a prominent Israeli tech entrepreneur and philanthropist.' });

addConn('salesforce', [
  { name: "Marc Benioff", type: "co-founder & CEO", description: "Marc Benioff (Jewish) co-founded Salesforce in 1999." },
  { name: "Time Magazine", type: "media ownership", description: "Benioff and his wife Lynne purchased Time Magazine for $190 million in 2018." },
  { name: "UCSF Benioff Children's Hospital", type: "philanthropy", description: "Benioff donated $300M+ to UCSF Children's Hospital." },
  { name: "World Economic Forum", type: "leadership", description: "Benioff is a prominent voice at Davos and in stakeholder capitalism movement." },
  { name: "Oracle", type: "origin", description: "Benioff worked at Oracle under Larry Ellison before founding Salesforce." },
  { name: "Slack", type: "acquisition", description: "Salesforce acquired Slack for $27.7 billion in 2021." },
  { name: "Israeli tech companies", type: "acquisitions", description: "Salesforce has acquired multiple Israeli companies including ClickSoftware ($1.35B) and Datorama." }
]);
updDesc('salesforce', 'Founded by Marc Benioff (Jewish) in 1999, pioneering cloud-based CRM. Benioff previously worked at Oracle under Larry Ellison (Jewish). Salesforce is now a $200B+ company. Benioff owns Time Magazine and has donated $300M+ to UCSF Children\'s Hospital. Salesforce acquired Israeli companies ClickSoftware ($1.35B) and Datorama, and Slack for $27.7B.');

addConn('openai', [
  { name: "Sam Altman", type: "CEO", description: "Sam Altman (Jewish) is CEO of OpenAI, the company behind ChatGPT." },
  { name: "Microsoft", type: "investor/partner", description: "Microsoft invested $13B+ in OpenAI; deep integration with Azure cloud." },
  { name: "Y Combinator", type: "career history", description: "Altman was president of Y Combinator before leading OpenAI." },
  { name: "Ilya Sutskever", type: "co-founder", description: "Ilya Sutskever (Jewish, Israeli-born) was co-founder and chief scientist of OpenAI." },
  { name: "Greg Brockman", type: "co-founder", description: "Greg Brockman is president and co-founder of OpenAI." },
  { name: "AI safety community", type: "industry", description: "OpenAI is central to the global AI safety and development debate." }
]);
updDesc('openai', 'Co-founded with Sam Altman (Jewish) as CEO. Altman was previously president of Y Combinator. Chief scientist Ilya Sutskever (Jewish, born in Russia, raised in Israel) was instrumental in building GPT models before departing. Microsoft invested $13B+ in OpenAI. ChatGPT became the fastest-growing consumer app in history. OpenAI is valued at $80B+.');
addInd('openai', { name: 'Sam Altman', role: 'CEO', bio: 'Sam Altman (Jewish) is CEO of OpenAI. Previously president of Y Combinator. Born in Chicago, raised in St. Louis. Openly gay. Leading figure in AI development.' });
addInd('openai', { name: 'Ilya Sutskever', role: 'Co-founder & former Chief Scientist', bio: 'Ilya Sutskever (Jewish), born in Russia, raised in Israel. Co-founded OpenAI and was chief scientist. Pioneer of deep learning, student of Geoffrey Hinton. Left OpenAI in 2024 to found Safe Superintelligence Inc.' });

addConn('uber-technologies', [
  { name: "Travis Kalanick", type: "co-founder", description: "Travis Kalanick (Jewish mother) co-founded Uber in 2009." },
  { name: "Dara Khosrowshahi", type: "CEO", description: "Current CEO (not Jewish) since 2017." },
  { name: "SoftBank", type: "investor", description: "Major Uber investor." },
  { name: "Gett (Israel)", type: "competitor", description: "Israeli ride-hailing company Gett competed with Uber." },
  { name: "Silicon Valley", type: "tech ecosystem", description: "Uber is part of the broader VC-funded tech ecosystem with many Jewish founders and investors." }
]);

addConn('airbnb', [
  { name: "Nathan Blecharczyk", type: "co-founder", description: "Nathan Blecharczyk (Jewish) is co-founder and Chief Strategy Officer of Airbnb." },
  { name: "Brian Chesky", type: "co-founder & CEO", description: "Brian Chesky co-founded Airbnb with Blecharczyk and Joe Gebbia." },
  { name: "Israel/West Bank controversy", type: "political", description: "Airbnb faced pressure from BDS movement over listings in Israeli settlements; initially delisted then reversed." },
  { name: "IPO (2020)", type: "milestone", description: "Airbnb went public in 2020 at $47B valuation." }
]);
updDesc('airbnb', 'Co-founded by Nathan Blecharczyk (Jewish), Brian Chesky, and Joe Gebbia in 2008. Blecharczyk serves as Chief Strategy Officer and is a billionaire. Airbnb went public in 2020 and is now worth $80B+. The company faced controversy over listings in Israeli settlements in the West Bank, initially delisting them under BDS pressure before reversing the decision.');

addConn('wework', [
  { name: "Adam Neumann", type: "co-founder", description: "Adam Neumann (Israeli Jewish) co-founded WeWork in 2010." },
  { name: "Israel", type: "origin", description: "Neumann was born in Israel, served in the IDF's Navy, and moved to New York." },
  { name: "SoftBank", type: "investor", description: "SoftBank invested over $10 billion in WeWork." },
  { name: "Kabbalah Centre", type: "spiritual influence", description: "Neumann was influenced by Kabbalah and Madonna's spiritual teacher." },
  { name: "Rebekah Neumann", type: "co-founder", description: "Rebekah Paltrow Neumann (Jewish, cousin of Gwyneth Paltrow) was chief brand officer." },
  { name: "Flow", type: "new venture", description: "After WeWork, Neumann started Flow, a residential real estate company backed by a16z." }
]);
updDesc('wework', 'Co-founded by Adam Neumann (Israeli Jewish, born on a kibbutz) and Miguel McKelvey in 2010. Neumann served in the Israeli Navy. WeWork was once valued at $47 billion before its dramatic collapse. SoftBank invested over $10 billion. Neumann\'s wife Rebekah (Jewish, cousin of Gwyneth Paltrow) was chief brand officer. Neumann later started Flow, backed by Andreessen Horowitz.');

addConn('stripe', [
  { name: "Patrick Collison", type: "co-founder & CEO", description: "Irish co-founders; Stripe has significant Jewish involvement in leadership and investment." },
  { name: "Sequoia Capital", type: "investor", description: "Sequoia (co-founded by Don Valentine; Michael Moritz, Jewish, was key partner) is a major Stripe investor." },
  { name: "Israeli fintech ecosystem", type: "industry connection", description: "Stripe competes and partners with Israeli fintech companies." },
  { name: "Peter Thiel", type: "early investor", description: "Peter Thiel was an early Stripe investor." }
]);

addConn('netflix', [
  { name: "Reed Hastings", type: "co-founder", description: "Reed Hastings co-founded Netflix (not Jewish)." },
  { name: "Marc Randolph", type: "co-founder", description: "Marc Randolph (Jewish) co-founded Netflix in 1997." },
  { name: "Ted Sarandos", type: "co-CEO", description: "Ted Sarandos serves as co-CEO." },
  { name: "Hollywood studios", type: "industry disruption", description: "Netflix disrupted the traditional studio system, many of which were founded by Jewish moguls." },
  { name: "Israeli content", type: "content", description: "Netflix has licensed and produced Israeli TV shows including Fauda and Shtisel." },
  { name: "Ari Emanuel / WME", type: "talent pipeline", description: "Netflix works with WME and CAA (both with significant Jewish leadership) for talent." }
]);
updDesc('netflix', 'Co-founded by Marc Randolph (Jewish) and Reed Hastings in 1997 as a DVD-by-mail service. Now the world\'s largest streaming platform with 250M+ subscribers. Netflix has produced and distributed Israeli content including Fauda and Shtisel. Randolph is the great-nephew of Edward Bernays (the father of public relations) and great-great-nephew of Sigmund Freud (both Jewish).');
addInd('netflix', { name: 'Marc Randolph', role: 'Co-founder', bio: 'Marc Randolph (Jewish) co-founded Netflix in 1997. He is the great-nephew of Edward Bernays (father of PR) and great-great-nephew of Sigmund Freud. First CEO of Netflix before handing the role to Reed Hastings.' });

addConn('zoom-video-communications', [
  { name: "Eric Yuan", type: "founder & CEO", description: "Eric Yuan founded Zoom (not Jewish), but the platform was widely adopted by Jewish communities." },
  { name: "Jewish community adoption", type: "cultural impact", description: "Zoom became essential for Jewish religious services, shiva calls, and community during COVID-19." },
  { name: "Five9", type: "attempted acquisition", description: "Zoom attempted to acquire Five9 (co-founded by Prem Uppaluru) for $14.7B." }
]);

// ============================================================
// US - FINANCE: HEDGE FUNDS & PE
// ============================================================

addConn('apollo-global-management', [
  { name: "Leon Black", type: "co-founder", description: "Leon Black (Jewish) co-founded Apollo in 1990. Stepped down as chairman in 2021." },
  { name: "Marc Rowan", type: "CEO", description: "Marc Rowan (Jewish) is CEO of Apollo Global Management." },
  { name: "Joshua Harris", type: "co-founder", description: "Joshua Harris (Jewish) co-founded Apollo. Now owns Washington Commanders and 76ers." },
  { name: "Athene Holding", type: "subsidiary", description: "Apollo owns Athene, a major insurance and annuities company." },
  { name: "Drexel Burnham Lambert", type: "origin", description: "Apollo's founders all came from Drexel Burnham Lambert (Michael Milken's firm)." },
  { name: "Michael Milken", type: "industry connection", description: "Apollo founders worked under Michael Milken (Jewish) at Drexel Burnham Lambert." },
  { name: "Washington Commanders", type: "sports ownership", description: "Josh Harris's ownership group bought the Commanders for $6.05 billion." }
]);
updDesc('apollo-global-management', 'Co-founded by Leon Black, Joshua Harris, and Marc Rowan (all Jewish) in 1990 after leaving Drexel Burnham Lambert (Michael Milken\'s firm). Apollo manages $600B+ in assets. Marc Rowan (Jewish) is CEO. Josh Harris (Jewish) now owns the Washington Commanders ($6.05B purchase) and Philadelphia 76ers. One of the "Big Three" PE firms alongside Blackstone and KKR.');

addConn('kkr-co', [
  { name: "Henry Kravis", type: "co-founder", description: "Henry Kravis (Jewish) co-founded KKR in 1976." },
  { name: "George Roberts", type: "co-founder", description: "George Roberts (Jewish, cousin of Kravis) co-founded KKR." },
  { name: "Jerome Kohlberg", type: "co-founder", description: "Jerome Kohlberg (Jewish) was the 'K' in KKR." },
  { name: "Bear Stearns", type: "origin", description: "All three founders came from Bear Stearns' investment banking division." },
  { name: "RJR Nabisco", type: "landmark deal", description: "KKR's 1989 leveraged buyout of RJR Nabisco ($25B) was immortalized in 'Barbarians at the Gate.'" },
  { name: "Columbia University", type: "philanthropy", description: "Kravis donated to Columbia Business School; the building bears his name." },
  { name: "Mount Sinai", type: "philanthropy", description: "Kravis donated to Mount Sinai Medical Center." }
]);
updDesc('kkr-co', 'Co-founded by Henry Kravis (Jewish), George Roberts (Jewish, Kravis\'s cousin), and Jerome Kohlberg (Jewish) in 1976, all from Bear Stearns. KKR pioneered the leveraged buyout industry. Their $25B takeover of RJR Nabisco in 1989 was the largest buyout in history at the time. KKR manages $500B+ in assets. Kravis is a major philanthropist supporting Jewish and cultural causes.');

addConn('warburg-pincus', [
  { name: "Warburg family", type: "founding family", description: "Named after the Warburg banking dynasty (Jewish, German-American), one of the most influential banking families in history." },
  { name: "Lionel Pincus", type: "co-founder", description: "Lionel Pincus (Jewish) co-founded the modern Warburg Pincus." },
  { name: "Eric Warburg", type: "founding family", description: "Eric Warburg (Jewish) of the Warburg banking dynasty established the firm." },
  { name: "Tim Geithner", type: "president", description: "Former US Treasury Secretary Tim Geithner (not Jewish) is president of Warburg Pincus." },
  { name: "Federal Reserve history", type: "historical", description: "Paul Warburg (Jewish) was a key architect of the Federal Reserve System in 1913." },
  { name: "M. M. Warburg & CO", type: "family bank", description: "The Warburg family's Hamburg bank dates back to 1798." }
]);
updDesc('warburg-pincus', 'Named after the Warburg banking dynasty (Jewish, German-American). Paul Warburg (Jewish) was a key architect of the Federal Reserve System. The firm manages $83B+ in private equity and growth investments globally. The Warburg family is one of the most influential banking dynasties in the history of Western finance alongside the Rothschilds.');

addConn('elliott-management-corporation', [
  { name: "Paul Singer", type: "founder", description: "Paul Singer (Jewish) founded Elliott Management in 1977. Known as an aggressive activist investor." },
  { name: "Republican Party", type: "political donations", description: "Singer is one of the largest Republican donors and a major GOP fundraiser." },
  { name: "Argentina sovereign debt", type: "notable investment", description: "Elliott famously fought Argentina for 15 years over sovereign debt, eventually winning $2.4 billion." },
  { name: "Paul E. Singer Foundation", type: "philanthropy", description: "Supports Jewish causes, Israel, and LGBT rights." },
  { name: "Manhattan Institute", type: "think tank support", description: "Singer is a major supporter of the Manhattan Institute." },
  { name: "Israel", type: "philanthropy", description: "Singer is a significant donor to Israeli causes and institutions." }
]);
updDesc('elliott-management-corporation', 'Founded by Paul Singer (Jewish) in 1977. Elliott manages $65B+ and is known as one of the most aggressive activist hedge funds. Singer fought Argentina for 15 years over sovereign debt, eventually winning $2.4B. Singer is one of the largest Republican donors and a major supporter of Israel and Jewish causes. Also supports LGBT rights through his foundation.');

addConn('two-sigma-investments', [
  { name: "David Siegel", type: "co-founder", description: "David Siegel (Jewish) co-founded Two Sigma in 2001." },
  { name: "John Overdeck", type: "co-founder", description: "John Overdeck (Jewish) co-founded Two Sigma." },
  { name: "D.E. Shaw", type: "origin", description: "Both founders came from D.E. Shaw hedge fund." },
  { name: "Quantitative trading", type: "strategy", description: "Two Sigma is one of the largest quantitative hedge funds, using AI and machine learning." },
  { name: "Overdeck Family Foundation", type: "philanthropy", description: "Supports STEM education and education reform." }
]);
updDesc('two-sigma-investments', 'Co-founded by David Siegel (Jewish) and John Overdeck (Jewish) in 2001, both alumni of D.E. Shaw. Two Sigma manages $60B+ using AI, machine learning, and distributed computing for trading. One of the most technologically advanced hedge funds in the world.');

addConn('d-e-shaw-co', [
  { name: "David E. Shaw", type: "founder", description: "David E. Shaw (Jewish) founded D.E. Shaw in 1988." },
  { name: "Jeff Bezos", type: "alumni", description: "Jeff Bezos worked at D.E. Shaw before founding Amazon in 1994." },
  { name: "Two Sigma", type: "alumni firm", description: "Two Sigma founders David Siegel and John Overdeck came from D.E. Shaw." },
  { name: "Computational biochemistry", type: "research", description: "Shaw also founded D.E. Shaw Research, doing computational biochemistry with the Anton supercomputer." },
  { name: "Columbia University", type: "academic connection", description: "Shaw is an adjunct professor at Columbia." }
]);
updDesc('d-e-shaw-co', 'Founded by David E. Shaw (Jewish) in 1988. D.E. Shaw pioneered quantitative and computational investing, managing $60B+. Jeff Bezos worked at D.E. Shaw before founding Amazon. Two Sigma co-founders Siegel and Overdeck also came from D.E. Shaw. Shaw also founded D.E. Shaw Research for computational biochemistry.');

addConn('pershing-square-capital-management', [
  { name: "Bill Ackman", type: "founder", description: "Bill Ackman (Jewish) founded Pershing Square in 2004." },
  { name: "Herbalife", type: "famous short", description: "Ackman's $1B short bet against Herbalife was a legendary Wall Street battle against Carl Icahn (Jewish)." },
  { name: "Carl Icahn", type: "rival", description: "Carl Icahn (Jewish) took the opposite side of Ackman's Herbalife trade." },
  { name: "Harvard University", type: "alma mater/philanthropy", description: "Ackman is a Harvard graduate and significant donor." },
  { name: "Israel support", type: "advocacy", description: "Ackman has been a vocal supporter of Israel and critic of antisemitism on college campuses." },
  { name: "Pershing Square Foundation", type: "philanthropy", description: "Ackman and his wife Neri Oxman (Israeli Jewish) run the Pershing Square Foundation." }
]);
updDesc('pershing-square-capital-management', 'Founded by Bill Ackman (Jewish) in 2004. Ackman is one of Wall Street\'s most prominent activist investors. His $1B short against Herbalife was a legendary battle with Carl Icahn (Jewish). Ackman is married to Neri Oxman (Israeli Jewish, former MIT professor). He has been a vocal supporter of Israel and critic of antisemitism at Harvard and other universities.');

addConn('tiger-global-management', [
  { name: "Chase Coleman", type: "founder", description: "Chase Coleman III founded Tiger Global (not Jewish)." },
  { name: "Scott Shleifer", type: "partner", description: "Scott Shleifer (Jewish) is a partner who built Tiger Global's private investment operation." },
  { name: "Israeli tech investments", type: "portfolio", description: "Tiger Global has been one of the most active investors in Israeli tech startups." },
  { name: "JFrog", type: "Israeli investment", description: "Tiger Global invested in Israeli DevOps company JFrog." },
  { name: "Monday.com", type: "Israeli investment", description: "Tiger Global invested in Israeli work management platform Monday.com." }
]);

addConn('icahn-enterprises', [
  { name: "Carl Icahn", type: "founder", description: "Carl Icahn (Jewish) is a legendary activist investor and corporate raider." },
  { name: "Bill Ackman", type: "rival", description: "Icahn and Ackman (Jewish) had the famous Herbalife battle." },
  { name: "TWA", type: "historic takeover", description: "Icahn's hostile takeover of TWA in 1985 was one of the most famous corporate raids." },
  { name: "Apple", type: "activism", description: "Icahn pushed Apple for larger share buybacks." },
  { name: "Princeton University", type: "philanthropy", description: "Icahn donated to Princeton; the genomics institute bears his name." },
  { name: "Mount Sinai", type: "philanthropy", description: "Icahn School of Medicine at Mount Sinai bears his name after $200M+ in donations." }
]);
updDesc('icahn-enterprises', 'Founded by Carl Icahn (Jewish), one of Wall Street\'s most legendary activist investors and corporate raiders. Known for hostile takeovers including TWA and battles with other titans. The Icahn School of Medicine at Mount Sinai bears his name after $200M+ in donations. His battle with Bill Ackman (Jewish) over Herbalife was a Wall Street classic. Net worth ~$7 billion.');

addConn('sac-capital-advisors-point72', [
  { name: "Steven A. Cohen", type: "founder", description: "Steven A. Cohen (Jewish) founded SAC Capital, now Point72." },
  { name: "New York Mets", type: "sports ownership", description: "Cohen bought the New York Mets for $2.4 billion in 2020." },
  { name: "Insider trading case", type: "legal", description: "SAC Capital pleaded guilty to insider trading and paid $1.8B in fines; Cohen was not personally charged." },
  { name: "Cohen Veterans Network", type: "philanthropy", description: "Cohen established mental health clinics for veterans." },
  { name: "Point72 Asset Management", type: "successor fund", description: "Cohen relaunched as Point72 after SAC Capital's legal issues." }
]);

addConn('third-point-llc', [
  { name: "Dan Loeb", type: "founder", description: "Dan Loeb (Jewish) founded Third Point in 1995." },
  { name: "Sony Pictures", type: "activism", description: "Loeb pushed for Sony to spin off its entertainment division." },
  { name: "Yahoo", type: "activism", description: "Loeb led the campaign to replace Yahoo's CEO." },
  { name: "Israel", type: "philanthropy", description: "Loeb is a supporter of Israel and has donated to Israeli institutions." },
  { name: "Surfing", type: "personal", description: "Loeb is an avid surfer and competitive athlete." }
]);

addConn('och-ziff-capital-management-sculptor-capital', [
  { name: "Daniel Och", type: "founder", description: "Daniel Och (Jewish) founded Och-Ziff (now Sculptor Capital) in 1994." },
  { name: "Goldman Sachs", type: "origin", description: "Och was head of proprietary trading at Goldman Sachs before founding his fund." },
  { name: "Africa corruption case", type: "legal", description: "Och-Ziff paid $412M to settle charges of bribing African officials." },
  { name: "UJA-Federation", type: "philanthropy", description: "Och has been active in Jewish philanthropy." }
]);

addConn('cerberus-capital-management', [
  { name: "Stephen Feinberg", type: "co-founder", description: "Stephen Feinberg (Jewish) co-founded Cerberus in 1992." },
  { name: "DynCorp", type: "defense investment", description: "Cerberus owned military contractor DynCorp." },
  { name: "Chrysler", type: "auto investment", description: "Cerberus acquired Chrysler in 2007 before the financial crisis." },
  { name: "Remington Arms", type: "investment", description: "Cerberus owned Freedom Group (Remington firearms)." },
  { name: "US intelligence community", type: "advisory", description: "Feinberg served on the President's Intelligence Advisory Board." },
  { name: "Trump administration", type: "political connection", description: "Feinberg served as an advisor to President Trump." }
]);

addConn('bain-capital', [
  { name: "Mitt Romney", type: "co-founder", description: "Mitt Romney (not Jewish) co-founded Bain Capital in 1984." },
  { name: "Joshua Bekenstein", type: "co-chairman", description: "Joshua Bekenstein (Jewish) is co-chairman of Bain Capital." },
  { name: "Bain & Company", type: "origin", description: "Bain Capital was spun out of consulting firm Bain & Company." },
  { name: "Toys 'R' Us", type: "investment", description: "Bain Capital was involved in the leveraged buyout of Toys 'R' Us." },
  { name: "Dunkin' Brands", type: "investment", description: "Bain Capital acquired and grew Dunkin' Donuts." },
  { name: "Clear Channel (iHeart)", type: "investment", description: "Bain Capital was involved in the Clear Channel (now iHeartMedia) buyout." }
]);

addConn('sequoia-capital', [
  { name: "Michael Moritz", type: "former partner", description: "Sir Michael Moritz (Jewish, Welsh-born) was a key partner who invested in Google, Yahoo, PayPal, and LinkedIn." },
  { name: "Don Valentine", type: "founder", description: "Don Valentine founded Sequoia in 1972." },
  { name: "Doug Leone", type: "former managing partner", description: "Doug Leone (Jewish, Italian-born) was managing partner and led investments in ServiceNow and others." },
  { name: "Google", type: "investment", description: "Sequoia was an early investor in Google." },
  { name: "Apple", type: "investment", description: "Sequoia invested in Apple in its early days." },
  { name: "WhatsApp", type: "investment", description: "Sequoia was the only VC investor in WhatsApp, earning $3B+ on a $60M investment." },
  { name: "Israeli startups", type: "portfolio", description: "Sequoia has invested in numerous Israeli startups." }
]);
updDesc('sequoia-capital', 'Founded in 1972. Key partner Michael Moritz (Jewish, Welsh-born) invested in Google, Yahoo, PayPal, LinkedIn, and YouTube. Partner Doug Leone (Jewish, Italian-born) was managing partner. Sequoia has backed companies worth over $3.3 trillion in combined value including Apple, Google, WhatsApp, and Stripe. Active investor in Israeli tech startups.');

addConn('andreessen-horowitz-a16z', [
  { name: "Ben Horowitz", type: "co-founder", description: "Ben Horowitz (Jewish) co-founded a16z in 2009." },
  { name: "Marc Andreessen", type: "co-founder", description: "Marc Andreessen co-founded a16z. Invented the first web browser (Mosaic/Netscape)." },
  { name: "Adam Neumann / Flow", type: "investment", description: "a16z invested $350M in Adam Neumann's (Israeli Jewish) new company Flow." },
  { name: "Israeli tech", type: "portfolio", description: "a16z has invested in numerous Israeli tech companies." },
  { name: "Coinbase", type: "investment", description: "a16z was one of the largest investors in Coinbase." },
  { name: "GitHub", type: "investment", description: "a16z invested in GitHub before Microsoft's acquisition." }
]);
updDesc('andreessen-horowitz-a16z', 'Co-founded by Ben Horowitz (Jewish) and Marc Andreessen in 2009. a16z manages $35B+ and is one of Silicon Valley\'s most influential VC firms. Horowitz wrote the bestselling book "The Hard Thing About Hard Things." a16z invested $350M in Adam Neumann\'s (Israeli Jewish) new company Flow. The firm has backed Coinbase, GitHub, Airbnb, and many Israeli startups.');

addConn('cantor-fitzgerald', [
  { name: "Howard Lutnick", type: "chairman & CEO", description: "Howard Lutnick (Jewish) is chairman and CEO; survived the 9/11 attacks that killed 658 Cantor employees." },
  { name: "September 11 attacks", type: "historic tragedy", description: "Cantor Fitzgerald lost 658 employees (over two-thirds of its workforce) in the 9/11 attacks at the World Trade Center." },
  { name: "Cantor Fitzgerald Relief Fund", type: "philanthropy", description: "Lutnick created the relief fund for families of 9/11 victims." },
  { name: "BGC Partners", type: "subsidiary", description: "Lutnick built BGC Partners from Cantor's ruins after 9/11." },
  { name: "Trump administration", type: "political", description: "Lutnick was named Commerce Secretary designate in 2024." },
  { name: "Haverford College", type: "alma mater", description: "Lutnick graduated from Haverford and later served on the board." }
]);
updDesc('cantor-fitzgerald', 'Led by Howard Lutnick (Jewish), who tragically lost 658 employees (including his brother) in the 9/11 attacks. Lutnick rebuilt the firm and created the Cantor Fitzgerald Relief Fund. He pledged 25% of Cantor\'s profits for 5 years to families of victims. Lutnick was named Commerce Secretary designate in the Trump administration in 2024. Major financial services firm in bond trading.');

addConn('lazard', [
  { name: "Lazard family", type: "founding family", description: "Founded by three Lazard brothers (Jewish, from France) in 1848 in New Orleans." },
  { name: "Felix Rohatyn", type: "legendary partner", description: "Felix Rohatyn (Jewish, Austrian-born) saved New York City from bankruptcy in the 1970s as partner at Lazard." },
  { name: "Bruce Wasserstein", type: "former CEO", description: "Bruce Wasserstein (Jewish) was CEO until his death in 2009. Known as 'Bid-'em-up Bruce.'" },
  { name: "Kenneth Jacobs", type: "CEO", description: "Kenneth Jacobs (Jewish) is current chairman and CEO of Lazard." },
  { name: "Rothschild & Co", type: "industry peer", description: "Fellow storied investment bank with Jewish founding family." },
  { name: "Goldman Sachs", type: "industry peer", description: "Competes for major M&A advisory mandates." }
]);
updDesc('lazard', 'Founded in 1848 by the Lazard brothers (Jewish, French) in New Orleans. Lazard is one of the world\'s premier financial advisory firms. Felix Rohatyn (Jewish) saved NYC from bankruptcy in the 1970s as Lazard partner. Bruce Wasserstein (Jewish, "Bid-em-up Bruce") was CEO. Current CEO Kenneth Jacobs (Jewish). Lazard has advised on some of the largest M&A deals in history.');

// ============================================================
// US - HISTORIC INVESTMENT BANKS
// ============================================================

addConn('lehman-brothers-historic', [
  { name: "Lehman family", type: "founding family", description: "Founded by Henry, Emanuel, and Mayer Lehman (Jewish, Bavarian immigrants) in 1850." },
  { name: "2008 Financial Crisis", type: "collapse", description: "Lehman Brothers' bankruptcy in September 2008 triggered the global financial crisis." },
  { name: "Richard Fuld", type: "final CEO", description: "Richard Fuld (Jewish) was CEO during Lehman's collapse; known as 'The Gorilla of Wall Street.'" },
  { name: "Barclays", type: "acquirer", description: "Barclays acquired Lehman's US operations from bankruptcy." },
  { name: "Goldman Sachs", type: "industry peer", description: "Fellow Jewish-founded Wall Street firm that survived the crisis with government support." },
  { name: "Kuhn, Loeb & Co.", type: "historical peer", description: "Fellow Jewish-founded investment bank." }
]);
updDesc('lehman-brothers-historic', 'Founded in 1850 by Henry, Emanuel, and Mayer Lehman (Jewish, Bavarian immigrants) in Alabama. Grew into one of Wall Street\'s premier investment banks. Its bankruptcy on September 15, 2008 (under CEO Richard Fuld, Jewish) was the largest in US history ($639B in assets) and triggered the global financial crisis. The Lehman family later became prominent philanthropists.');

addConn('bear-stearns-historic', [
  { name: "Joseph Bear, Robert Stearns, Harold Mayer", type: "founders", description: "Founded in 1923 by Joseph Bear, Robert Stearns, and Harold Mayer (Jewish)." },
  { name: "Alan 'Ace' Greenberg", type: "legendary CEO", description: "Alan Greenberg (Jewish) led Bear Stearns as CEO/chairman for decades." },
  { name: "JPMorgan Chase", type: "acquirer", description: "JPMorgan acquired Bear Stearns in 2008 fire sale for $10/share during the financial crisis." },
  { name: "KKR founders", type: "alumni", description: "KKR co-founders Kravis, Roberts, and Kohlberg (all Jewish) came from Bear Stearns." },
  { name: "James Cayne", type: "final CEO", description: "James Cayne (Jewish) was CEO during Bear Stearns' collapse." }
]);

addConn('salomon-brothers-historic', [
  { name: "Arthur, Herbert, and Percy Salomon", type: "founders", description: "Founded by the Salomon brothers (Jewish) in 1910." },
  { name: "John Gutfreund", type: "legendary CEO", description: "John Gutfreund (Jewish) was known as 'King of Wall Street' in the 1980s." },
  { name: "Michael Bloomberg", type: "alumni", description: "Michael Bloomberg (Jewish) was a Salomon Brothers partner before founding Bloomberg LP." },
  { name: "Travelers Group / Citigroup", type: "acquirer", description: "Salomon was acquired by Travelers (Sandy Weill, Jewish) and merged into Citigroup." },
  { name: "Sandy Weill", type: "acquirer", description: "Sandy Weill (Jewish) acquired Salomon and built Citigroup." }
]);
updDesc('salomon-brothers-historic', 'Founded by the Salomon brothers (Jewish) in 1910. Became one of Wall Street\'s most powerful firms. John Gutfreund (Jewish, "King of Wall Street") was CEO. Michael Bloomberg (Jewish) was a Salomon partner before founding Bloomberg LP. Acquired by Sandy Weill\'s (Jewish) Travelers Group, which merged with Citibank to form Citigroup.');

addConn('kuhn-loeb-co-historic', [
  { name: "Abraham Kuhn and Solomon Loeb", type: "founders", description: "Founded in 1867 by Abraham Kuhn and Solomon Loeb (Jewish, German immigrants)." },
  { name: "Jacob Schiff", type: "legendary leader", description: "Jacob Schiff (Jewish) led Kuhn Loeb and was one of the most powerful bankers in American history." },
  { name: "Warburg family", type: "marriage alliance", description: "The Warburgs married into the Kuhn Loeb/Schiff families, creating a banking dynasty." },
  { name: "Union Pacific Railroad", type: "historic client", description: "Kuhn Loeb financed major railroads including Union Pacific." },
  { name: "Japanese government", type: "historic client", description: "Schiff financed Japan in the Russo-Japanese War, partly due to opposition to Russian antisemitism." },
  { name: "Lehman Brothers", type: "industry peer", description: "Fellow Jewish-founded Wall Street firm." }
]);
updDesc('kuhn-loeb-co-historic', 'Founded in 1867 by Abraham Kuhn and Solomon Loeb (Jewish, German immigrants). Under Jacob Schiff (Jewish), became one of the most powerful investment banks in America, rivaling J.P. Morgan. Schiff financed Japan in the Russo-Japanese War due to his opposition to anti-Jewish pogroms in Russia. The Kuhn Loeb, Schiff, and Warburg families intermarried, creating one of the most influential banking dynasties in history.');

addConn('goldman-sachs-historic', [
  { name: "Goldman Sachs (current)", type: "continuation", description: "Goldman Sachs continues as one of the most powerful investment banks in the world." },
  { name: "Marcus Goldman", type: "founder", description: "Marcus Goldman (Jewish, German immigrant) founded the firm in 1869." },
  { name: "Sidney Weinberg", type: "legendary CEO", description: "Sidney Weinberg (Jewish, 'Mr. Wall Street') led Goldman Sachs for decades and advised presidents." },
  { name: "Gus Levy", type: "legendary chairman", description: "Gustave Levy (Jewish) was chairman and pioneered block trading." },
  { name: "Robert Rubin", type: "alumni", description: "Robert Rubin (Jewish) was Goldman co-chairman before becoming US Treasury Secretary under Clinton." }
]);

// ============================================================
// US - MEDIA & ENTERTAINMENT
// ============================================================

addConn('cond-nast', [
  { name: "Si Newhouse Jr.", type: "former chairman", description: "Si Newhouse Jr. (Jewish) ran Condé Nast and its parent Advance Publications for decades." },
  { name: "Advance Publications", type: "parent company", description: "Condé Nast is owned by Advance Publications (Newhouse family, Jewish)." },
  { name: "Vogue", type: "flagship publication", description: "Condé Nast publishes Vogue, The New Yorker, Vanity Fair, Wired, and GQ." },
  { name: "Reddit", type: "investment", description: "Advance Publications (Newhouse family) is the largest shareholder of Reddit." },
  { name: "Anna Wintour", type: "editor-in-chief", description: "Anna Wintour leads Condé Nast as chief content officer." }
]);
updDesc('cond-nast', 'Owned by Advance Publications (Newhouse family, Jewish). Si Newhouse Jr. (Jewish) ran Condé Nast for decades. Publishes Vogue, The New Yorker, Vanity Fair, Wired, GQ, and more. The Newhouse family also owns a stake in Reddit through Advance Publications. One of the most influential media companies in fashion and culture.');

addConn('the-washington-post', [
  { name: "Katherine Graham", type: "former publisher", description: "Katherine Graham (Jewish father) was publisher during Watergate; first female Fortune 500 CEO." },
  { name: "Eugene Meyer", type: "former owner", description: "Eugene Meyer (Jewish) bought the Post at auction in 1933; was also first president of the World Bank." },
  { name: "Donald Graham", type: "former chairman", description: "Donald Graham (Jewish heritage) was chairman before selling to Bezos." },
  { name: "Jeff Bezos", type: "current owner", description: "Jeff Bezos purchased the Washington Post in 2013 for $250 million." },
  { name: "Watergate scandal", type: "historic significance", description: "Under Katherine Graham, the Post broke the Watergate story that brought down Nixon." },
  { name: "Ben Bradlee", type: "legendary editor", description: "Ben Bradlee was executive editor during Watergate." }
]);
updDesc('the-washington-post', 'Purchased in 1933 by Eugene Meyer (Jewish), first president of the World Bank. His daughter Katherine Graham (Jewish father) became publisher and the first female Fortune 500 CEO. Under Graham, the Post broke the Watergate story. Jeff Bezos bought the paper in 2013 for $250M. The Meyer-Graham family led the Post through its most influential era in American journalism.');

addConn('breitbart-news', [
  { name: "Andrew Breitbart", type: "founder", description: "Andrew Breitbart (Jewish, adopted by a Jewish family) founded Breitbart News in 2007." },
  { name: "Larry Solov", type: "CEO", description: "Larry Solov (Jewish), Breitbart's childhood friend, is CEO." },
  { name: "Steve Bannon", type: "former chairman", description: "Steve Bannon ran Breitbart before joining the Trump White House." },
  { name: "Israel", type: "editorial stance", description: "Breitbart is strongly pro-Israel; Breitbart conceived of the site partly during a trip to Israel." },
  { name: "Jerusalem bureau", type: "operations", description: "Breitbart News was one of the first conservative outlets to open a Jerusalem bureau." }
]);
updDesc('breitbart-news', 'Founded by Andrew Breitbart (Jewish, adopted by a Jewish family) in 2007 after a trip to Israel. Breitbart conceived the site as a pro-Israel, conservative news platform. CEO Larry Solov (Jewish) is Breitbart\'s childhood friend. Steve Bannon ran the site before joining the Trump White House. Breitbart was one of the first conservative outlets to open a Jerusalem bureau.');

addConn('iheartmedia', [
  { name: "Bob Pittman", type: "CEO", description: "Bob Pittman is CEO (co-created MTV)." },
  { name: "Bain Capital", type: "former owner", description: "Bain Capital (Joshua Bekenstein, Jewish, is co-chairman) was involved in the Clear Channel/iHeart buyout." },
  { name: "Clear Channel", type: "predecessor", description: "iHeartMedia was formerly Clear Channel Communications." },
  { name: "850+ radio stations", type: "scale", description: "iHeartMedia owns 850+ radio stations across the US." }
]);

addConn('lionsgate-entertainment', [
  { name: "Jon Feltheimer", type: "CEO", description: "Jon Feltheimer (Jewish) has been CEO of Lionsgate since 2000." },
  { name: "Frank Giustra", type: "founder", description: "Frank Giustra (Jewish background) co-founded Lionsgate." },
  { name: "Starz", type: "acquisition", description: "Lionsgate acquired premium cable channel Starz for $4.4 billion." },
  { name: "The Hunger Games", type: "franchise", description: "Lionsgate produced the Hunger Games franchise." },
  { name: "John Wick", type: "franchise", description: "Lionsgate produces the John Wick franchise." },
  { name: "Twilight", type: "franchise", description: "Lionsgate distributed the Twilight film series." }
]);

addConn('a24-films', [
  { name: "Daniel Katz", type: "co-founder", description: "Daniel Katz (Jewish) co-founded A24 in 2012." },
  { name: "David Fenkel", type: "co-founder", description: "David Fenkel co-founded A24." },
  { name: "Everything Everywhere All at Once", type: "production", description: "A24 produced the Oscar-winning Everything Everywhere All at Once." },
  { name: "Moonlight", type: "production", description: "A24 produced the Oscar-winning Moonlight." },
  { name: "Independent film", type: "industry", description: "A24 has become the most prestigious independent film studio." }
]);

addConn('caa-creative-artists-agency', [
  { name: "Michael Ovitz", type: "co-founder", description: "Michael Ovitz (Jewish) co-founded CAA in 1975 and built it into Hollywood's most powerful agency." },
  { name: "Ron Meyer", type: "co-founder", description: "Ron Meyer (Jewish) co-founded CAA; later became president of Universal Studios." },
  { name: "Bryan Lourd", type: "managing partner", description: "Bryan Lourd is co-chairman of CAA." },
  { name: "Hollywood", type: "industry", description: "CAA represents the biggest stars in entertainment, sports, and media." },
  { name: "WME", type: "rival", description: "WME (led by Ari Emanuel, Jewish) is CAA's primary rival." }
]);
updDesc('caa-creative-artists-agency', 'Co-founded by Michael Ovitz (Jewish) and Ron Meyer (Jewish) in 1975. CAA is one of the two most powerful talent agencies in entertainment (alongside WME). Ovitz was called "the most powerful man in Hollywood." Meyer later became president of Universal Studios. CAA represents top actors, directors, athletes, and media personalities worldwide.');

addConn('wme-william-morris-endeavor', [
  { name: "Ari Emanuel", type: "CEO", description: "Ari Emanuel (Jewish, Israeli-American) is CEO of Endeavor/WME. Brother of former Chicago mayor Rahm Emanuel." },
  { name: "Rahm Emanuel", type: "brother", description: "Rahm Emanuel (Jewish) is Ari's brother; served as Obama's Chief of Staff, Chicago mayor, and US Ambassador to Japan." },
  { name: "Ezekiel Emanuel", type: "brother", description: "Dr. Ezekiel Emanuel (Jewish) is Ari's brother; prominent bioethicist and healthcare policy expert." },
  { name: "UFC", type: "subsidiary", description: "Endeavor (WME's parent) acquired the UFC for $4 billion." },
  { name: "CAA", type: "rival", description: "WME's primary rival in talent representation." },
  { name: "William Morris Agency", type: "predecessor", description: "WME formed from the 2009 merger of Endeavor and the William Morris Agency (founded 1898)." },
  { name: "IMG", type: "subsidiary", description: "Endeavor acquired IMG sports and fashion agency." }
]);
updDesc('wme-william-morris-endeavor', 'Led by Ari Emanuel (Jewish, Israeli-American), CEO of Endeavor/WME. Ari is the brother of Rahm Emanuel (former Obama Chief of Staff, Chicago mayor, US Ambassador to Japan). WME formed from the 2009 merger of Endeavor and the historic William Morris Agency (founded 1898). Endeavor owns UFC ($4B acquisition), IMG, and Professional Bull Riders. One of the most powerful talent agencies in the world.');

// ============================================================
// US - HISTORIC ENTERTAINMENT STUDIOS
// ============================================================

addConn('warner-bros-pictures-historic-founding', [
  { name: "Warner brothers", type: "founders", description: "Founded by Harry, Albert, Sam, and Jack Warner (Jewish, Polish immigrants) in 1923." },
  { name: "The Jazz Singer", type: "historic film", description: "Warner Bros. produced The Jazz Singer (1927), the first major 'talkie,' starring Al Jolson (Jewish)." },
  { name: "Warner Bros. Discovery", type: "successor", description: "The studio is now part of Warner Bros. Discovery." },
  { name: "Hollywood founding", type: "industry", description: "Warner Bros. is one of the 'Big Five' studios, most of which were founded by Jewish immigrants." }
]);

addConn('paramount-pictures-historic-founding', [
  { name: "Adolph Zukor", type: "founder", description: "Adolph Zukor (Jewish, Hungarian immigrant) founded Paramount in 1912." },
  { name: "Jesse Lasky", type: "co-founder", description: "Jesse Lasky (Jewish) co-founded Paramount Pictures." },
  { name: "Barney Balaban", type: "president", description: "Barney Balaban (Jewish) was president of Paramount for 27 years." },
  { name: "Paramount Global", type: "successor", description: "Now part of Paramount Global (controlled by Shari Redstone, Jewish)." },
  { name: "Hollywood founding", type: "industry", description: "Part of the Jewish-founded Hollywood studio system." }
]);

addConn('universal-pictures-historic-founding', [
  { name: "Carl Laemmle", type: "founder", description: "Carl Laemmle (Jewish, German immigrant) founded Universal Pictures in 1912." },
  { name: "Lew Wasserman", type: "legendary president", description: "Lew Wasserman (Jewish) ran MCA/Universal and was the most powerful man in entertainment for decades." },
  { name: "Steven Spielberg", type: "key filmmaker", description: "Steven Spielberg (Jewish) directed many of Universal's biggest films." },
  { name: "Comcast/NBCUniversal", type: "successor", description: "Universal is now part of Comcast's NBCUniversal (Brian Roberts, Jewish)." }
]);

addConn('columbia-pictures-historic-founding', [
  { name: "Harry and Jack Cohn", type: "founders", description: "Founded by Harry Cohn (Jewish) and Jack Cohn (Jewish) in 1924." },
  { name: "Joe Brandt", type: "co-founder", description: "Joe Brandt co-founded Columbia Pictures." },
  { name: "Sony Pictures", type: "successor", description: "Columbia is now part of Sony Pictures Entertainment." }
]);

addConn('20th-century-fox-historic-founding', [
  { name: "William Fox", type: "founder", description: "William Fox (Jewish, born Vilmos Fuchs, Hungarian immigrant) founded Fox Film Corporation in 1915." },
  { name: "Disney", type: "acquirer", description: "21st Century Fox's entertainment assets were acquired by Disney for $71.3 billion in 2019." },
  { name: "Rupert Murdoch", type: "former owner", description: "Rupert Murdoch's News Corp owned 21st Century Fox before the Disney sale." }
]);

addConn('mgm-studios-historic', [
  { name: "Louis B. Mayer", type: "co-founder", description: "Louis B. Mayer (Jewish, born Lazar Meir in Minsk) co-founded MGM in 1924." },
  { name: "Samuel Goldwyn", type: "co-founder", description: "Samuel Goldwyn (Jewish, born Szmuel Gelbfisz in Warsaw) was part of the original merger." },
  { name: "Irving Thalberg", type: "production head", description: "Irving Thalberg (Jewish, 'The Boy Wonder') ran MGM production and revolutionized filmmaking." },
  { name: "Amazon", type: "acquirer", description: "Amazon acquired MGM for $8.5 billion in 2022." },
  { name: "James Bond franchise", type: "property", description: "MGM owns the James Bond franchise." }
]);
updDesc('mgm-studios-historic', 'Co-founded by Louis B. Mayer (Jewish, born Lazar Meir in Minsk) and others in 1924. Irving Thalberg (Jewish, "The Boy Wonder") ran production. Samuel Goldwyn (Jewish, born in Warsaw) was part of the original merger. MGM was "the Tiffany of Hollywood studios." Amazon acquired MGM for $8.5 billion in 2022. MGM owns the James Bond franchise.');

addConn('marvel-entertainment-legacy', [
  { name: "Martin Goodman", type: "founder", description: "Martin Goodman (Jewish) founded Marvel's predecessor, Timely Comics, in 1939." },
  { name: "Stan Lee", type: "creative visionary", description: "Stan Lee (Jewish, born Stanley Lieber) created Spider-Man, X-Men, Fantastic Four, Iron Man, Hulk, Thor, and many more." },
  { name: "Jack Kirby", type: "co-creator", description: "Jack Kirby (Jewish, born Jacob Kurtzberg) co-created Captain America, X-Men, Fantastic Four, and more." },
  { name: "Joe Simon", type: "co-creator", description: "Joe Simon (Jewish) co-created Captain America with Jack Kirby." },
  { name: "Disney", type: "owner", description: "Disney acquired Marvel Entertainment for $4 billion in 2009. Kevin Feige (Jewish) heads Marvel Studios." },
  { name: "Isaac Perlmutter", type: "former CEO", description: "Isaac Perlmutter (Israeli Jewish) was CEO of Marvel Entertainment; major Trump donor." }
]);
updDesc('marvel-entertainment-legacy', 'Founded as Timely Comics by Martin Goodman (Jewish) in 1939. Stan Lee (Jewish, born Stanley Lieber) and Jack Kirby (Jewish, born Jacob Kurtzberg) created the Marvel Universe: Spider-Man, X-Men, Fantastic Four, Captain America, Iron Man, Hulk, and more. Isaac Perlmutter (Israeli Jewish) was CEO. Kevin Feige (Jewish) heads Marvel Studios under Disney, which acquired Marvel for $4 billion in 2009. The MCU has grossed $30B+ at box office.');

addConn('dc-comics-legacy', [
  { name: "Jerry Siegel and Joe Shuster", type: "Superman creators", description: "Jerry Siegel (Jewish) and Joe Shuster (Jewish, Canadian) created Superman in 1938." },
  { name: "Bob Kane", type: "Batman creator", description: "Bob Kane (Jewish, born Robert Kahn) created Batman in 1939." },
  { name: "Bill Finger", type: "Batman co-creator", description: "Bill Finger (Jewish) was the uncredited co-creator of Batman." },
  { name: "Jack Liebowitz", type: "executive", description: "Jack Liebowitz (Jewish) built DC Comics into a major publisher." },
  { name: "Warner Bros.", type: "owner", description: "DC Comics is owned by Warner Bros. Discovery." }
]);
updDesc('dc-comics-legacy', 'Superman was created by Jerry Siegel (Jewish) and Joe Shuster (Jewish, Canadian) in 1938 — the first modern superhero. Batman was created by Bob Kane (Jewish, born Robert Kahn) and Bill Finger (Jewish) in 1939. Jack Liebowitz (Jewish) built DC into a publishing empire. Now owned by Warner Bros. Discovery. Jewish creators essentially invented the American superhero genre.');

// ============================================================
// US - SPORTS
// ============================================================

addConn('new-york-mets-steve-cohen', [
  { name: "Steven A. Cohen", type: "owner", description: "Steven A. Cohen (Jewish) bought the Mets for $2.4 billion in 2020." },
  { name: "Point72 / SAC Capital", type: "business", description: "Cohen runs Point72 (formerly SAC Capital), one of the largest hedge funds." },
  { name: "Cohen Veterans Network", type: "philanthropy", description: "Cohen supports mental health services for veterans." },
  { name: "Major League Baseball", type: "league", description: "The Mets compete in MLB." }
]);

addConn('washington-commanders-josh-harris', [
  { name: "Josh Harris", type: "owner", description: "Josh Harris (Jewish) led the group that bought the Commanders for $6.05 billion in 2023." },
  { name: "Apollo Global Management", type: "business", description: "Harris co-founded Apollo Global Management." },
  { name: "Philadelphia 76ers", type: "other sports", description: "Harris also owns the NBA's Philadelphia 76ers." },
  { name: "New Jersey Devils", type: "other sports", description: "Harris group also owns the NHL's New Jersey Devils." },
  { name: "Crystal Palace F.C.", type: "other sports", description: "Harris is co-owner of English Premier League club Crystal Palace." }
]);

addConn('philadelphia-76ers-harris-blitzer', [
  { name: "Josh Harris", type: "co-owner", description: "Josh Harris (Jewish) co-owns the 76ers." },
  { name: "David Blitzer", type: "co-owner", description: "David Blitzer (Jewish) co-owns the 76ers." },
  { name: "Apollo Global Management", type: "Harris's fund", description: "Harris co-founded Apollo." },
  { name: "Blackstone Group", type: "Blitzer's firm", description: "Blitzer is a senior executive at Blackstone." },
  { name: "Washington Commanders", type: "other sports", description: "Harris also owns the Commanders." }
]);

addConn('golden-state-warriors-joe-lacob', [
  { name: "Joe Lacob", type: "owner", description: "Joe Lacob (Jewish) led the group that bought the Warriors for $450M in 2010; now worth $7B+." },
  { name: "Kleiner Perkins", type: "career", description: "Lacob was a partner at Kleiner Perkins Caufield & Byers VC firm." },
  { name: "NBA Championships", type: "success", description: "Under Lacob's ownership, the Warriors won 4 NBA Championships (2015, 2017, 2018, 2022)." },
  { name: "Chase Center", type: "arena", description: "Lacob built the $1.4 billion Chase Center arena in San Francisco." }
]);

addConn('dallas-mavericks-mark-cuban', [
  { name: "Mark Cuban", type: "former owner", description: "Mark Cuban (Jewish) owned the Mavericks from 2000-2024." },
  { name: "Broadcast.com", type: "career", description: "Cuban sold Broadcast.com to Yahoo for $5.7 billion in 1999." },
  { name: "Shark Tank", type: "media", description: "Cuban was a star investor on ABC's Shark Tank." },
  { name: "Cost Plus Drugs", type: "venture", description: "Cuban founded Cost Plus Drugs to lower prescription drug costs." },
  { name: "Adelson family", type: "buyer", description: "Cuban sold the Mavericks to the Miriam Adelson (Jewish) family in 2024." }
]);
updDesc('dallas-mavericks-mark-cuban', 'Owned by Mark Cuban (Jewish) from 2000-2024. Cuban bought the team for $285M and sold for $3.5B to the Miriam Adelson (Jewish, widow of Sheldon Adelson) family. Cuban made his fortune selling Broadcast.com to Yahoo for $5.7B. Also known for Shark Tank and founding Cost Plus Drugs. Both buyer and seller are Jewish.');

addConn('cleveland-guardians-larry-dolan', [
  { name: "Larry Dolan", type: "owner", description: "Larry Dolan (Jewish) owns the Cleveland Guardians." },
  { name: "Cablevision / Dolan family", type: "family", description: "The Dolan family also owned Cablevision and Madison Square Garden (James Dolan, Larry's nephew)." },
  { name: "New York Knicks", type: "family connection", description: "James Dolan (Larry's nephew) owns the Knicks and MSG." },
  { name: "Major League Baseball", type: "league", description: "The Guardians compete in MLB." }
]);

addConn('atlanta-hawks-tony-ressler', [
  { name: "Tony Ressler", type: "owner", description: "Tony Ressler (Jewish) purchased the Atlanta Hawks in 2015." },
  { name: "Ares Management", type: "business", description: "Ressler co-founded Ares Management, a $300B+ alternative investment firm." },
  { name: "Apollo Global Management", type: "origin", description: "Ressler co-founded Apollo Global Management before starting Ares." },
  { name: "Leon Black", type: "former business partner", description: "Ressler co-founded Apollo with Leon Black (Jewish) and others." },
  { name: "Jami Gertz", type: "spouse", description: "Ressler is married to actress Jami Gertz (Jewish)." }
]);

addConn('new-england-patriots', [
  { name: "Robert Kraft", type: "owner", description: "Robert Kraft (Jewish) owns the Patriots, one of the most successful NFL franchises." },
  { name: "Israel", type: "philanthropy", description: "Kraft is a major supporter of Israel; received the Genesis Prize in 2019." },
  { name: "Foundation to Combat Antisemitism", type: "philanthropy", description: "Kraft launched the Foundation to Combat Antisemitism and the 'Stand Up to Jewish Hate' campaign." },
  { name: "New England Revolution", type: "sibling team", description: "Kraft also owns the MLS team." },
  { name: "Columbia University", type: "alma mater", description: "Kraft is a Columbia University alumnus." },
  { name: "NFL ownership", type: "league", description: "Kraft is one of the most influential NFL owners." }
]);

addConn('milwaukee-bucks-wes-edens-marc-lasry', [
  { name: "Marc Lasry", type: "former co-owner", description: "Marc Lasry (Jewish, Moroccan-born) was co-owner of the Bucks. Founder of Avenue Capital." },
  { name: "Wes Edens", type: "co-owner", description: "Wes Edens co-owns the Bucks." },
  { name: "Avenue Capital", type: "business", description: "Lasry founded Avenue Capital Group, a $12B+ investment firm." },
  { name: "Chelsea Clinton", type: "personal connection", description: "Lasry's son worked with Chelsea Clinton; the families are close." },
  { name: "2021 NBA Championship", type: "success", description: "The Bucks won the NBA Championship in 2021 under this ownership." }
]);

addConn('cleveland-cavaliers-dan-gilbert', [
  { name: "Dan Gilbert", type: "owner", description: "Dan Gilbert (Jewish) owns the Cleveland Cavaliers." },
  { name: "Rocket Mortgage / Quicken Loans", type: "business", description: "Gilbert founded Rocket Mortgage (Quicken Loans), the largest mortgage lender in the US." },
  { name: "Detroit revitalization", type: "philanthropy/business", description: "Gilbert has invested $7B+ in Detroit real estate and revitalization." },
  { name: "LeBron James", type: "sports connection", description: "Gilbert brought LeBron James back to Cleveland, winning the 2016 NBA Championship." },
  { name: "StockX", type: "investment", description: "Gilbert invested in StockX, the sneaker and streetwear marketplace." }
]);

addConn('boston-celtics-wyc-grousbeck', [
  { name: "Wyc Grousbeck", type: "lead owner", description: "Wyc Grousbeck (Jewish) has been lead owner of the Celtics since 2002." },
  { name: "Steve Pagliuca", type: "co-owner", description: "Steve Pagliuca (Bain Capital) is co-owner of the Celtics." },
  { name: "2024 NBA Championship", type: "success", description: "The Celtics won the 2024 NBA Championship, their 18th title." },
  { name: "Causeway Street Capital", type: "business", description: "Grousbeck is a venture capitalist and investor." }
]);

addConn('tampa-bay-lightning-jeff-vinik', [
  { name: "Jeff Vinik", type: "owner", description: "Jeff Vinik (Jewish) owns the Tampa Bay Lightning." },
  { name: "Fidelity Investments", type: "career", description: "Vinik previously managed the Fidelity Magellan Fund." },
  { name: "Stanley Cup wins", type: "success", description: "The Lightning won back-to-back Stanley Cups in 2020 and 2021 under Vinik." },
  { name: "Strategic Property Partners", type: "real estate", description: "Vinik is developing the $3B Water Street Tampa district." }
]);

// ============================================================
// US - REAL ESTATE
// ============================================================

addConn('silverstein-properties', [
  { name: "Larry Silverstein", type: "founder", description: "Larry Silverstein (Jewish) founded the firm and rebuilt the World Trade Center site." },
  { name: "World Trade Center", type: "development", description: "Silverstein signed the WTC lease 6 weeks before 9/11 and led the rebuilding, including One WTC." },
  { name: "September 11 attacks", type: "historic connection", description: "Silverstein\'s WTC lease and subsequent insurance claims were central to the post-9/11 rebuilding." },
  { name: "7 World Trade Center", type: "development", description: "Silverstein rebuilt 7 WTC as the first new tower at the WTC site." },
  { name: "Port Authority of NY & NJ", type: "lessor", description: "Silverstein leased the WTC from the Port Authority." }
]);
updDesc('silverstein-properties', 'Founded by Larry Silverstein (Jewish). Signed the 99-year lease on the World Trade Center just 6 weeks before 9/11. Led the $20B+ rebuilding of the WTC site including One World Trade Center, 3 WTC, 4 WTC, and 7 WTC. Silverstein Properties is one of New York\'s most prominent real estate development firms.');

addConn('kushner-companies', [
  { name: "Charles Kushner", type: "founder", description: "Charles Kushner (Jewish) founded Kushner Companies in 1985." },
  { name: "Jared Kushner", type: "former CEO/political", description: "Jared Kushner (Jewish) ran the company before serving as Senior Advisor to President Trump." },
  { name: "Ivanka Trump", type: "family", description: "Jared Kushner married Ivanka Trump, who converted to Orthodox Judaism." },
  { name: "Donald Trump", type: "political connection", description: "Jared served as Senior Advisor to his father-in-law President Trump." },
  { name: "Abraham Accords", type: "diplomatic achievement", description: "Jared Kushner played a key role in negotiating the Abraham Accords between Israel and Arab nations." },
  { name: "666 Fifth Avenue", type: "landmark deal", description: "Kushner Companies purchased 666 Fifth Avenue for $1.8 billion." },
  { name: "Affinity Partners", type: "investment fund", description: "After leaving government, Jared Kushner founded Affinity Partners, which received $2B from Saudi Arabia's PIF." }
]);
updDesc('kushner-companies', 'Founded by Charles Kushner (Jewish) in 1985. Jared Kushner (Jewish) ran the company before serving as Senior Advisor to President Trump. Jared married Ivanka Trump, who converted to Orthodox Judaism. Jared was instrumental in negotiating the Abraham Accords between Israel and UAE/Bahrain. After leaving government, Jared founded Affinity Partners, receiving $2B from Saudi Arabia\'s PIF.');

addConn('tishman-speyer', [
  { name: "Jerry Speyer", type: "co-founder", description: "Jerry Speyer (Jewish) co-founded Tishman Speyer." },
  { name: "Rob Speyer", type: "CEO", description: "Rob Speyer (Jewish), Jerry's son, is president and CEO." },
  { name: "Rockefeller Center", type: "landmark property", description: "Tishman Speyer owns Rockefeller Center." },
  { name: "MetLife Building", type: "property", description: "Tishman Speyer owns the MetLife Building (formerly Pan Am Building)." },
  { name: "Museum of Jewish Heritage", type: "philanthropy", description: "Jerry Speyer is chairman of the Museum of Jewish Heritage in NYC." },
  { name: "Israel", type: "philanthropy", description: "The Speyer family are major supporters of Israel and Jewish causes." }
]);

addConn('vornado-realty-trust', [
  { name: "Steven Roth", type: "founder & chairman", description: "Steven Roth (Jewish) founded Vornado Realty Trust." },
  { name: "theMART (Chicago)", type: "property", description: "Vornado owns theMART, one of the largest buildings in the world." },
  { name: "555 California Street", type: "property", description: "Vornado co-owns 555 California Street (former Bank of America Center) in San Francisco." },
  { name: "Penn Station redevelopment", type: "project", description: "Vornado is involved in the Penn Station area revitalization." },
  { name: "NYC real estate", type: "portfolio", description: "One of the largest office landlords in New York City." }
]);

addConn('durst-organization', [
  { name: "Durst family", type: "founding family", description: "The Durst family (Jewish) has been in NYC real estate for over 100 years." },
  { name: "One World Trade Center", type: "management", description: "Durst Organization co-developed and manages One World Trade Center." },
  { name: "Silverstein Properties", type: "partnership", description: "Partnered with Silverstein Properties on One WTC development." },
  { name: "Douglas Durst", type: "chairman", description: "Douglas Durst (Jewish) is chairman of the Durst Organization." },
  { name: "Bank of America Tower", type: "development", description: "Developed the Bank of America Tower at One Bryant Park, the first green skyscraper." }
]);

addConn('rudin-management', [
  { name: "Rudin family", type: "founding family", description: "The Rudin family (Jewish) has been in NYC real estate for over 100 years, owning 30+ properties." },
  { name: "Bill Rudin", type: "chairman", description: "Bill Rudin (Jewish) is co-chairman; also leads the Real Estate Board of New York." },
  { name: "Jack Rudin", type: "patriarch", description: "Jack Rudin (Jewish) was the family patriarch and a major NYC civic leader and philanthropist." },
  { name: "UJA-Federation", type: "philanthropy", description: "The Rudin family are major supporters of UJA-Federation and Jewish causes." }
]);

// ============================================================
// US - FASHION
// ============================================================

addConn('calvin-klein-pvh-corp', [
  { name: "Calvin Klein", type: "founder", description: "Calvin Klein (Jewish) founded the fashion brand in 1968." },
  { name: "Ralph Lauren", type: "industry peer", description: "Fellow Jewish fashion designer who built a major American brand." },
  { name: "Donna Karan", type: "industry peer", description: "Fellow Jewish fashion designer." },
  { name: "PVH Corp", type: "parent company", description: "PVH Corp (formerly Phillips-Van Heusen) owns Calvin Klein." },
  { name: "Barry Schwartz", type: "business partner", description: "Barry Schwartz (Jewish), Calvin's childhood friend, was his business partner and co-CEO." }
]);

addConn('donna-karan-dkny', [
  { name: "Donna Karan", type: "founder", description: "Donna Karan (Jewish, born Donna Faske) founded DKNY in 1984." },
  { name: "Anne Klein", type: "career origin", description: "Karan started her career at Anne Klein (also Jewish-founded)." },
  { name: "Calvin Klein", type: "industry peer", description: "Fellow Jewish fashion designer." },
  { name: "Ralph Lauren", type: "industry peer", description: "Fellow Jewish fashion designer." },
  { name: "LVMH", type: "former owner", description: "LVMH acquired Donna Karan International." },
  { name: "Urban Zen Foundation", type: "philanthropy", description: "Karan founded Urban Zen to integrate wellness and culture." }
]);

addConn('levi-strauss-co', [
  { name: "Levi Strauss", type: "founder", description: "Levi Strauss (Jewish, Bavarian immigrant) founded the company in 1853 and invented blue jeans." },
  { name: "San Francisco Gold Rush", type: "origin", description: "Levi Strauss came to San Francisco during the Gold Rush to sell goods to miners." },
  { name: "Jacob Davis", type: "co-inventor", description: "Jacob Davis (Jewish, Latvian immigrant) was the tailor who co-patented the riveted jeans with Strauss." },
  { name: "American cultural icon", type: "impact", description: "Blue jeans became one of the most iconic American inventions, worn worldwide." },
  { name: "Levi Strauss Foundation", type: "philanthropy", description: "Major philanthropic organization supporting social justice." }
]);
updDesc('levi-strauss-co', 'Founded by Levi Strauss (Jewish, Bavarian immigrant) in 1853 in San Francisco. Strauss and Jacob Davis (Jewish, Latvian immigrant) invented and patented riveted blue jeans. Blue jeans became one of the most iconic American cultural exports. Levi Strauss & Co. is now a $6B+ public company. The founding of Levi\'s represents one of the most successful immigrant entrepreneurship stories in American history.');

addConn('gap-inc', [
  { name: "Donald Fisher", type: "co-founder", description: "Donald Fisher (Jewish) co-founded Gap Inc. in 1969." },
  { name: "Doris Fisher", type: "co-founder", description: "Doris Fisher (Jewish) co-founded Gap with her husband Donald." },
  { name: "Old Navy", type: "subsidiary", description: "Gap Inc. owns Old Navy, Banana Republic, and Athleta." },
  { name: "Fisher family", type: "philanthropists", description: "The Fisher family is among San Francisco's largest philanthropists; Robert Fisher chairs the Gap board." },
  { name: "SFMOMA", type: "philanthropy", description: "The Fisher family donated $75M+ to SFMOMA and their art collection to the museum." }
]);
updDesc('gap-inc', 'Co-founded by Donald Fisher (Jewish) and Doris Fisher (Jewish) in San Francisco in 1969. Gap Inc. grew into a $15B+ retailer owning Gap, Old Navy, Banana Republic, and Athleta. The Fisher family is one of San Francisco\'s most prominent philanthropic families, donating extensively to SFMOMA and other institutions.');

// ============================================================
// US - FOOD & BEVERAGE
// ============================================================

addConn('manischewitz', [
  { name: "Dov Behr Manischewitz", type: "founder", description: "Dov Behr Manischewitz (Jewish, Lithuanian immigrant) founded the company in Cincinnati in 1888." },
  { name: "Passover", type: "religious significance", description: "Manischewitz is most famous for its matzo and kosher-for-Passover products." },
  { name: "American Jewish community", type: "cultural significance", description: "One of the most iconic brands in American Jewish culture." },
  { name: "Kayco", type: "current owner", description: "Manischewitz is owned by Kayco, which owns multiple kosher brands." }
]);

addConn('sabra-hummus', [
  { name: "Strauss Group", type: "co-owner", description: "Sabra is a joint venture between Strauss Group (Israeli) and PepsiCo." },
  { name: "PepsiCo", type: "co-owner", description: "PepsiCo owns 50% of Sabra Hummus." },
  { name: "Israel", type: "connection", description: "Sabra's Israeli parent company Strauss Group is one of Israel's largest food companies." },
  { name: "BDS movement", type: "controversy", description: "Sabra has been targeted by BDS boycott campaigns due to its Israeli ownership." }
]);

addConn('kind-snacks', [
  { name: "Daniel Lubetzky", type: "founder", description: "Daniel Lubetzky (Jewish, Mexican-born, son of a Holocaust survivor) founded KIND in 2004." },
  { name: "Mars Inc.", type: "acquirer", description: "Mars Inc. acquired a majority stake in KIND in 2020." },
  { name: "PeaceWorks", type: "related venture", description: "Lubetzky also founded PeaceWorks, promoting Israeli-Palestinian economic cooperation." },
  { name: "Holocaust remembrance", type: "personal mission", description: "Lubetzky's father survived Dachau; Daniel is a passionate advocate for Holocaust education and tolerance." },
  { name: "Shark Tank", type: "media", description: "Lubetzky appeared as a guest investor on Shark Tank." },
  { name: "Empatico", type: "philanthropy", description: "Lubetzky created Empatico, connecting classrooms globally to build empathy." }
]);
updDesc('kind-snacks', 'Founded by Daniel Lubetzky (Jewish, Mexican-born, son of a Holocaust survivor from Dachau) in 2004. KIND grew into a billion-dollar snack brand. Mars Inc. acquired a majority stake. Lubetzky also founded PeaceWorks to promote Israeli-Palestinian economic cooperation and Empatico for global classroom connections. His father\'s Holocaust survival deeply influenced his mission of kindness and tolerance.');

addConn('h-agen-dazs', [
  { name: "Reuben Mattus", type: "founder", description: "Reuben Mattus (Jewish, Polish immigrant) founded Häagen-Dazs in the Bronx in 1960." },
  { name: "Rose Mattus", type: "co-founder", description: "Rose Mattus (Jewish) co-founded the brand with her husband." },
  { name: "General Mills", type: "owner", description: "Häagen-Dazs is now owned by General Mills." },
  { name: "Danish-sounding name", type: "marketing", description: "The name 'Häagen-Dazs' was invented and has no meaning in any language — it was designed to sound European and exotic." }
]);

addConn('snapple', [
  { name: "Leonard Marsh, Hyman Golden, Arnold Greenberg", type: "founders", description: "All three co-founders (Jewish) started Snapple in Brooklyn." },
  { name: "Brooklyn", type: "origin", description: "Snapple started as a small beverage company in Brooklyn, NY." },
  { name: "Dr Pepper Snapple Group", type: "owner", description: "Snapple is now part of Keurig Dr Pepper." }
]);

addConn('nathan-s-famous', [
  { name: "Nathan Handwerker", type: "founder", description: "Nathan Handwerker (Jewish, Polish immigrant) founded Nathan's Famous in 1916." },
  { name: "Coney Island", type: "location", description: "Nathan's original hot dog stand in Coney Island is a New York City landmark." },
  { name: "July 4th Hot Dog Contest", type: "cultural event", description: "The annual Nathan's Hot Dog Eating Contest is one of America's most watched July 4th events." },
  { name: "Feltman's", type: "origin", description: "Handwerker worked at Feltman's restaurant before starting his own stand with a nickel hot dog." }
]);

// ============================================================
// US - THINK TANKS
// ============================================================

addConn('brookings-institution', [
  { name: "Martin Indyk", type: "former executive VP", description: "Martin Indyk (Jewish, Australian-born) was executive VP; also served as US Ambassador to Israel." },
  { name: "Haim Saban", type: "donor", description: "Haim Saban (Jewish, Israeli-American) funded the Saban Center for Middle East Policy at Brookings." },
  { name: "US foreign policy", type: "influence", description: "Brookings is one of the most influential think tanks shaping US foreign policy." },
  { name: "WINEP", type: "related think tank", description: "WINEP was founded as a Brookings-like think tank focused on Middle East policy." }
]);

addConn('washington-institute-for-near-east-policy-winep', [
  { name: "AIPAC", type: "origin", description: "WINEP was founded in 1985 by former AIPAC research director Martin Indyk." },
  { name: "Martin Indyk", type: "founder", description: "Martin Indyk (Jewish, Australian-born) founded WINEP; later served as US Ambassador to Israel." },
  { name: "Dennis Ross", type: "fellow", description: "Dennis Ross (Jewish), longtime Middle East peace envoy, is a counselor at WINEP." },
  { name: "US State Department", type: "policy influence", description: "Many WINEP fellows have served in senior State Department and NSC positions." },
  { name: "Brookings Institution", type: "partner think tank", description: "Indyk later led the Middle East department at Brookings." }
]);

addConn('foundation-for-defense-of-democracies-fdd', [
  { name: "Clifford May", type: "founder & president", description: "Clifford May founded FDD after 9/11." },
  { name: "Mark Dubowitz", type: "CEO", description: "Mark Dubowitz (Jewish, Canadian-born) is CEO of FDD." },
  { name: "Iran sanctions", type: "key focus", description: "FDD has been one of the most influential organizations pushing for sanctions against Iran." },
  { name: "US Treasury Department", type: "policy influence", description: "FDD has worked closely with the Treasury Department on sanctions policy." },
  { name: "Israel", type: "policy alignment", description: "FDD is strongly pro-Israel and focused on counterterrorism." },
  { name: "Sheldon Adelson", type: "donor", description: "Sheldon Adelson (Jewish) was a major FDD donor." }
]);

addConn('jewish-institute-for-national-security-of-america-jinsa', [
  { name: "US military", type: "engagement", description: "JINSA brings retired US military generals on visits to Israel." },
  { name: "IDF", type: "relationship", description: "JINSA promotes US-Israel military cooperation." },
  { name: "Michael Makovsky", type: "president & CEO", description: "Michael Makovsky (Jewish) leads JINSA." },
  { name: "US defense establishment", type: "network", description: "JINSA's advisory board includes many retired US generals and admirals." }
]);

addConn('middle-east-forum', [
  { name: "Daniel Pipes", type: "founder", description: "Daniel Pipes (Jewish) founded the Middle East Forum in 1994." },
  { name: "Campus Watch", type: "project", description: "The Forum runs Campus Watch, monitoring Middle East studies programs." },
  { name: "Islamist Watch", type: "project", description: "Monitors radical Islamist activity in the US." },
  { name: "Israel", type: "policy alignment", description: "The Forum is strongly pro-Israel." }
]);

addConn('council-on-foreign-relations', [
  { name: "Richard Haass", type: "former president", description: "Richard Haass (Jewish) was president of CFR for 20 years (2003-2023)." },
  { name: "Foreign Affairs", type: "publication", description: "CFR publishes Foreign Affairs, one of the most influential foreign policy journals." },
  { name: "US foreign policy establishment", type: "influence", description: "CFR is the most prestigious foreign policy think tank in the US." },
  { name: "David Rockefeller", type: "historic chairman", description: "David Rockefeller was longtime chairman of CFR." }
]);

addConn('american-enterprise-institute-aei', [
  { name: "Irving Kristol", type: "influential fellow", description: "Irving Kristol (Jewish, 'godfather of neoconservatism') was a key AEI scholar." },
  { name: "Paul Wolfowitz", type: "fellow", description: "Paul Wolfowitz (Jewish) was an AEI fellow after serving as Deputy Secretary of Defense." },
  { name: "Ben Bernanke", type: "fellow", description: "Ben Bernanke (Jewish, former Fed Chairman) is an AEI fellow." },
  { name: "Neoconservative movement", type: "intellectual home", description: "AEI has been a key intellectual home for neoconservative policy thinkers." },
  { name: "US foreign policy", type: "influence", description: "AEI scholars have significantly influenced US foreign and economic policy." }
]);

// ============================================================
// US - FOUNDATIONS
// ============================================================

addConn('pritzker-foundation', [
  { name: "Pritzker family", type: "founding family", description: "The Pritzker family (Jewish) is one of America's wealthiest families." },
  { name: "Hyatt Hotels", type: "business", description: "The Pritzker family founded Hyatt Hotels." },
  { name: "J.B. Pritzker", type: "family member", description: "J.B. Pritzker (Jewish) is Governor of Illinois." },
  { name: "Penny Pritzker", type: "family member", description: "Penny Pritzker (Jewish) served as US Commerce Secretary under Obama." },
  { name: "Pritzker Architecture Prize", type: "cultural contribution", description: "The family established the Pritzker Architecture Prize, the 'Nobel of architecture.'" },
  { name: "University of Chicago", type: "philanthropy", description: "Major donors to the University of Chicago." }
]);

addConn('wexner-foundation', [
  { name: "Les Wexner", type: "founder", description: "Les Wexner (Jewish) founded the Wexner Foundation and L Brands (Victoria's Secret, Bath & Body Works)." },
  { name: "Ohio State University", type: "philanthropy", description: "The Wexner Medical Center at OSU bears his name." },
  { name: "Jeffrey Epstein", type: "controversy", description: "Wexner was a business associate of Jeffrey Epstein, who managed his money." },
  { name: "Victoria's Secret", type: "business", description: "Wexner built Victoria's Secret into a $7B+ brand." },
  { name: "Wexner Heritage Program", type: "program", description: "Leadership development program for Jewish volunteers." }
]);

addConn('charles-and-lynn-schusterman-family-philanthropies', [
  { name: "Charles Schusterman", type: "founder", description: "Charles Schusterman (Jewish) founded Samson Energy and the family foundation." },
  { name: "Stacy Schusterman", type: "current leader", description: "Stacy Schusterman (Jewish) leads the foundation now." },
  { name: "ROI Community", type: "program", description: "Schusterman founded the ROI Community for young Jewish innovators." },
  { name: "Israel", type: "focus area", description: "Major supporter of Israel programs and Israeli-American relations." },
  { name: "AIPAC", type: "ally", description: "The Schusterman family has supported AIPAC and pro-Israel advocacy." }
]);

// ============================================================
// US - HEALTHCARE
// ============================================================

addConn('mount-sinai-health-system', [
  { name: "Icahn School of Medicine", type: "medical school", description: "Named after Carl Icahn (Jewish) who donated $200M+ to Mount Sinai." },
  { name: "Carl Icahn", type: "major donor", description: "Carl Icahn (Jewish) donated $200M+ for the medical school naming." },
  { name: "Kenneth Davis", type: "former CEO", description: "Kenneth Davis (Jewish) served as CEO of Mount Sinai Health System." },
  { name: "Henry Kravis", type: "donor", description: "Henry Kravis (Jewish, KKR co-founder) is a major Mount Sinai donor." },
  { name: "New York City Jewish community", type: "cultural significance", description: "Mount Sinai has been central to NYC's Jewish community since its founding in 1852." }
]);
updDesc('mount-sinai-health-system', 'Founded in 1852 to serve New York\'s Jewish community. Now a major academic medical system with 8 hospitals. The Icahn School of Medicine at Mount Sinai bears the name of Carl Icahn (Jewish) after $200M+ in donations. Henry Kravis (Jewish, KKR co-founder) is also a major donor. Mount Sinai is one of the top-ranked hospitals in the United States.');

addConn('cedars-sinai-medical-center', [
  { name: "Jewish community of Los Angeles", type: "founding", description: "Founded in 1902 by the Jewish community of Los Angeles." },
  { name: "Samuel Oschin", type: "major donor", description: "The Oschin family (Jewish) donated for the Samuel Oschin Cancer Center." },
  { name: "Hollywood", type: "connection", description: "Known as 'Hospital to the Stars' due to its proximity to Hollywood and celebrity patients." },
  { name: "Spielberg family", type: "donors", description: "Steven Spielberg (Jewish) and family have donated to Cedars-Sinai." },
  { name: "Board of Governors", type: "leadership", description: "Cedars-Sinai's board has historically included many prominent Jewish community leaders." }
]);
updDesc('cedars-sinai-medical-center', 'Founded in 1902 by the Jewish community of Los Angeles. Created from the merger of Cedars of Lebanon Hospital and Mount Sinai Hospital (LA). Known as the "Hospital to the Stars." One of the largest non-profit hospitals in the western US with a major research program. Steven Spielberg (Jewish) and many other Jewish philanthropists are major donors. Consistently ranked among America\'s top hospitals.');

addConn('moderna', [
  { name: "Noubar Afeyan", type: "co-founder & chairman", description: "Noubar Afeyan (Armenian-American) co-founded Moderna." },
  { name: "Tal Zaks", type: "former chief medical officer", description: "Tal Zaks (Israeli Jewish) was Moderna's chief medical officer during COVID vaccine development." },
  { name: "COVID-19 vaccine", type: "landmark achievement", description: "Moderna's mRNA COVID-19 vaccine was one of the first approved, saving millions of lives." },
  { name: "Israel", type: "early adopter", description: "Israel was one of the first countries to widely deploy the Moderna vaccine." },
  { name: "mRNA technology", type: "innovation", description: "Moderna pioneered mRNA technology that revolutionized vaccine development." }
]);
updDesc('moderna', 'Co-founded in 2010. Chief Medical Officer Tal Zaks (Israeli Jewish) played a central role in the development of Moderna\'s revolutionary mRNA COVID-19 vaccine. Israel was one of the first countries to widely deploy the vaccine. Moderna\'s market cap exceeded $100B during the pandemic. The mRNA platform is now being applied to cancer, RSV, and flu vaccines.');

addConn('regeneron-pharmaceuticals', [
  { name: "Leonard Schleifer", type: "co-founder & CEO", description: "Leonard Schleifer (Jewish) co-founded Regeneron in 1988." },
  { name: "George Yancopoulos", type: "co-founder & CSO", description: "George Yancopoulos co-founded Regeneron and serves as chief scientific officer." },
  { name: "REGEN-COV", type: "COVID treatment", description: "Regeneron developed REGEN-COV, a monoclonal antibody treatment for COVID-19." },
  { name: "Eylea", type: "product", description: "Regeneron's Eylea is one of the best-selling eye medicines in the world." },
  { name: "Dupixent", type: "product", description: "Regeneron's Dupixent is a blockbuster drug for eczema and asthma." },
  { name: "Westchester County", type: "headquarters", description: "Regeneron is headquartered in Tarrytown, NY; largest employer in Westchester County." }
]);
updDesc('regeneron-pharmaceuticals', 'Co-founded by Leonard Schleifer (Jewish) in 1988. Regeneron developed REGEN-COV (the monoclonal antibody COVID-19 treatment given to President Trump) and blockbuster drugs Eylea and Dupixent. Revenue exceeds $12B annually. Schleifer is one of the wealthiest people in pharma. Regeneron is headquartered in Tarrytown, NY.');

// ============================================================
// SAVE
// ============================================================

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0; for(const c in data.countries) for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;}
console.log(`Done! ${tc} entries, ${wc} with connections, ${Object.keys(people.people).length} people.`);
