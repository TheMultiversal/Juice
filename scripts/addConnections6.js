// addConnections6.js - US Museums, Media, Business, Tech, Real Estate, Sports, Schools, Camps
// Run AFTER addConnections5.js
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

// ============================================================
// US - MUSEUMS & RESEARCH continued
// ============================================================
addConn('museum-of-jewish-heritage-a-living-memorial-to-the-holocaust', [
  { name: "Battery Park City, NYC", type: "location", description: "Located in Battery Park City, Lower Manhattan, overlooking the Statue of Liberty and Ellis Island." },
  { name: "Yad Vashem", type: "partner", description: "Partners with Yad Vashem for exhibitions and Holocaust documentation." },
  { name: "NYC Department of Education", type: "education partner", description: "Provides Holocaust education programs to NYC public school students." },
  { name: "Steven Spielberg USC Shoah Foundation", type: "testimony partner", description: "Uses video testimonies from the USC Shoah Foundation in exhibits." }
]);
updDesc('museum-of-jewish-heritage-a-living-memorial-to-the-holocaust', 'Opened in 1997 in Battery Park City, Manhattan, overlooking the Statue of Liberty. Houses a collection of 40,000+ artifacts, photographs, and films documenting modern Jewish life before, during, and after the Holocaust. The museum\'s distinctive hexagonal shape symbolizes the Star of David and the six million Jews killed. Hosts major traveling exhibitions and serves as a venue for significant Jewish community events.');
addInd('museum-of-jewish-heritage-a-living-memorial-to-the-holocaust', { name: "Jack Kliger", bio: "Former president and CEO of the Museum of Jewish Heritage. Built the institution into a major NYC cultural landmark." });

addConn('national-museum-of-american-jewish-history', [
  { name: "Smithsonian Institution", type: "affiliate", description: "The only Smithsonian-affiliated museum dedicated to American Jewish history." },
  { name: "Independence Mall, Philadelphia", type: "location", description: "Located on Independence Mall, near the Liberty Bell, symbolizing Jewish contributions to American freedom." },
  { name: "National Archives", type: "research partner", description: "Partners with National Archives on documenting Jewish American history." }
]);
updDesc('national-museum-of-american-jewish-history', 'The only museum in the US dedicated exclusively to American Jewish history. Located on Philadelphia\'s Independence Mall, steps from the Liberty Bell. A Smithsonian-affiliated museum housing a collection of 30,000+ objects spanning 360+ years of Jewish life in America. The $150 million building opened in 2010. Explores the intersection of Jewish identity and American democracy.');

addConn('yivo-institute-for-jewish-research', [
  { name: "Center for Jewish History", type: "resident institution", description: "YIVO is headquartered at the Center for Jewish History in NYC." },
  { name: "Vilna (Vilnius)", type: "founding city", description: "YIVO was founded in Vilna, Lithuania in 1925. Its archives were rescued from the Nazis." },
  { name: "Max Weinreich", type: "founding scholar", description: "Linguist Max Weinreich was a key founder of YIVO and champion of Yiddish scholarship." },
  { name: "24 million archival items", type: "collection", description: "YIVO holds 24 million items - the largest collection of Yiddish materials in the world." }
]);
updDesc('yivo-institute-for-jewish-research', 'Founded in 1925 in Vilna (now Vilnius, Lithuania), YIVO is the preeminent center for Eastern European Jewish and Yiddish studies. Its archives - 24 million items - were partially rescued from Nazi destruction in a dramatic wartime operation. Relocated to New York in 1940. YIVO\'s collection includes irreplaceable documents of Jewish life in Eastern Europe, the Yiddish theater, and immigrant communities.');
addInd('yivo-institute-for-jewish-research', { name: "Max Weinreich", bio: "Co-founder of YIVO (1925) and pioneering Yiddish linguist. Author of 'History of the Yiddish Language.' Coined the phrase 'a language is a dialect with an army and a navy.'" });

addConn('center-for-jewish-history', [
  { name: "YIVO", type: "resident institution", description: "YIVO Institute for Jewish Research is one of five partner organizations." },
  { name: "Leo Baeck Institute", type: "resident institution", description: "The Leo Baeck Institute documents German-Jewish history." },
  { name: "American Jewish Historical Society", type: "resident institution", description: "AJHS preserves American Jewish history since 1654." },
  { name: "American Sephardi Federation", type: "resident institution", description: "Documents Sephardic Jewish heritage and culture." },
  { name: "100 million archival documents", type: "collection", description: "Combined collections hold over 100 million archival documents." }
]);
updDesc('center-for-jewish-history', 'Located in Manhattan\'s Chelsea neighborhood, the Center houses five major Jewish research institutions under one roof: YIVO, Leo Baeck Institute, American Jewish Historical Society, American Sephardi Federation, and Yeshiva University Museum. Combined holdings of over 100 million archival documents make it the largest Jewish archive outside Israel. The state-of-the-art facility opened in 2000.');

// ============================================================
// US - TECH & BUSINESS (thin entries)
// ============================================================
addConn('bloomberg-l-p', [
  { name: "Michael Bloomberg", type: "founder", description: "Michael Bloomberg (Jewish) founded Bloomberg L.P. in 1981 and is worth $100+ billion." },
  { name: "Bloomberg Philanthropies", type: "foundation", description: "Bloomberg Philanthropies has given away $17+ billion to public health, arts, education, and climate." },
  { name: "NYC Mayor's office", type: "political career", description: "Bloomberg served as Mayor of New York City from 2002-2013, spending $650 million of his own money on campaigns." },
  { name: "Johns Hopkins University", type: "major donation", description: "Bloomberg donated $3.35 billion to Johns Hopkins - the largest gift to any educational institution." },
  { name: "Wall Street", type: "industry influence", description: "The Bloomberg Terminal is used by 325,000+ financial professionals worldwide and generates $10B+ in annual revenue." }
]);
updDesc('bloomberg-l-p', 'Founded in 1981 by Michael Bloomberg (Jewish), who built a $100+ billion fortune from the Bloomberg Terminal - used by 325,000+ financial professionals worldwide. Bloomberg L.P. also operates Bloomberg News, Bloomberg TV, Bloomberg Radio, and Bloomberg Businessweek. Bloomberg served as NYC Mayor (2002-2013). His philanthropic foundation has given away $17+ billion, including $3.35B to Johns Hopkins University.');

addConn('oracle-corporation', [
  { name: "Larry Ellison", type: "co-founder", description: "Larry Ellison (Jewish) co-founded Oracle in 1977 and is one of the richest people in the world ($150B+)." },
  { name: "Safra Catz", type: "CEO", description: "Safra Catz (Jewish, Israeli-born) has been Oracle CEO since 2014, one of the highest-paid women in tech." },
  { name: "Oracle Cloud Infrastructure", type: "business", description: "Oracle is a major cloud computing and AI infrastructure company." },
  { name: "Israel R&D", type: "operations", description: "Oracle has major R&D operations in Israel with thousands of employees." },
  { name: "US Department of Defense", type: "government contracts", description: "Oracle has major contracts with the US military and intelligence agencies." }
]);
updDesc('oracle-corporation', 'Co-founded by Larry Ellison (Jewish) in 1977. Oracle is a $300+ billion enterprise technology giant providing database, cloud, and enterprise software. Ellison, worth $150+ billion, is one of the world\'s richest people. CEO Safra Catz (Jewish, Israeli-born) is one of the highest-paid executives in America. Oracle has major R&D centers in Israel and major US government contracts.');

addConn('meta-platforms-facebook', [
  { name: "Mark Zuckerberg", type: "founder/CEO", description: "Mark Zuckerberg (Jewish) founded Facebook in 2004 at Harvard. Worth $200+ billion." },
  { name: "Sheryl Sandberg", type: "former COO", description: "Sheryl Sandberg (Jewish) served as Facebook/Meta COO (2008-2022), authored 'Lean In.'" },
  { name: "Instagram", type: "subsidiary", description: "Meta acquired Instagram for $1 billion in 2012." },
  { name: "WhatsApp", type: "subsidiary", description: "Meta acquired WhatsApp for $19 billion in 2014; co-founder Jan Koum was Jewish-Ukrainian." },
  { name: "Israel operations", type: "R&D", description: "Meta has significant R&D operations in Tel Aviv." }
]);
updDesc('meta-platforms-facebook', 'Founded in 2004 by Mark Zuckerberg (Jewish) at Harvard. Meta is a $1+ trillion company operating Facebook (3B+ users), Instagram (2B+), WhatsApp (2B+), and developing AR/VR (Quest headsets). Zuckerberg, worth $200+ billion, has pledged 99% of his wealth to the Chan Zuckerberg Initiative. Former COO Sheryl Sandberg (Jewish) was named one of the most powerful women in the world. Major R&D presence in Israel.');

addConn('google-alphabet-inc', [
  { name: "Sergey Brin", type: "co-founder", description: "Sergey Brin (Jewish, born in Soviet Union) co-founded Google in 1998. Worth $130+ billion." },
  { name: "Larry Page", type: "co-founder", description: "Larry Page (Jewish mother) co-founded Google with Brin at Stanford." },
  { name: "Susan Wojcicki", type: "former YouTube CEO", description: "Susan Wojcicki (Jewish) was CEO of YouTube (2014-2023). Google was started in her garage." },
  { name: "Israel R&D", type: "operations", description: "Google\'s Israel office (opened 2006) was its first in the Middle East, employing 2,000+ engineers." },
  { name: "Waze acquisition", type: "Israeli tech", description: "Google acquired Israeli navigation app Waze for $1.1 billion in 2013." }
]);
updDesc('google-alphabet-inc', 'Co-founded in 1998 by Sergey Brin (Jewish, born in Moscow) and Larry Page (Jewish mother) at Stanford. Alphabet/Google is a $2+ trillion company. Brin\'s family fled Soviet antisemitism in 1979. Google acquired Israeli Waze ($1.1B, 2013). Late YouTube CEO Susan Wojcicki (Jewish) grew up hosting Google\'s servers in her garage. Google Israel in Tel Aviv employs 2,000+ engineers and is a key R&D hub.');

addConn('the-walt-disney-company', [
  { name: "Bob Iger", type: "CEO", description: "Bob Iger (Jewish) served as Disney CEO (2005-2020, 2022-present), transforming the company through acquisitions." },
  { name: "Michael Eisner", type: "former CEO", description: "Michael Eisner (Jewish) led Disney from 1984-2005, growing it from $1.8B to $60B in market cap." },
  { name: "Jeffrey Katzenberg", type: "former studio chief", description: "Jeffrey Katzenberg (Jewish) ran Walt Disney Studios, overseeing the Disney Renaissance." },
  { name: "Marvel acquisition", type: "acquisition", description: "Disney acquired Marvel Entertainment from Ike Perlmutter (Jewish, Israeli-born) for $4 billion." },
  { name: "Pixar/Lucasfilm", type: "acquisitions", description: "Disney acquired Pixar ($7.4B) and Lucasfilm ($4B) under Iger." }
]);
updDesc('the-walt-disney-company', 'While Walt Disney himself was not Jewish, Disney has been led by Jewish executives for decades. Michael Eisner (Jewish, CEO 1984-2005) grew Disney from $1.8B to $60B market cap. Bob Iger (Jewish, CEO 2005-2020, 2022-present) acquired Marvel ($4B from Ike Perlmutter, Jewish/Israeli), Pixar ($7.4B), Lucasfilm ($4B), and 21st Century Fox ($71B). Jeffrey Katzenberg (Jewish) ran the studio during the Disney Renaissance (Little Mermaid, Lion King, Beauty and the Beast).');

addConn('haim-saban-saban-capital-group', [
  { name: "Mighty Morphin Power Rangers", type: "entertainment", description: "Saban co-created the Power Rangers franchise, selling it to Disney for $4.3 billion." },
  { name: "Univision", type: "media investment", description: "Saban led a consortium acquiring Univision for $13.7 billion." },
  { name: "FIDF", type: "pro-Israel philanthropy", description: "Saban is a major donor to FIDF and pro-Israel causes." },
  { name: "Democratic Party", type: "political donor", description: "Saban is one of the largest donors to the Democratic Party, especially on Israel." },
  { name: "Saban Center at Brookings", type: "think tank", description: "Funded the Brookings Institution's Saban Center for Middle East Policy." }
]);
updDesc('haim-saban-saban-capital-group', 'Israeli-American billionaire Haim Saban (Jewish) built his fortune through the Power Rangers franchise (sold to Disney for $4.3B) and Univision ($13.7B acquisition). Born in Egypt, raised in Israel. One of the largest donors to the Democratic Party and pro-Israel causes. Funded the Saban Center for Middle East Policy at the Brookings Institution. Major FIDF supporter. Net worth estimated at $3+ billion.');

addConn('dreamworks', [
  { name: "Steven Spielberg", type: "co-founder", description: "Steven Spielberg (Jewish) co-founded DreamWorks SKG in 1994." },
  { name: "Jeffrey Katzenberg", type: "co-founder", description: "Jeffrey Katzenberg (Jewish) co-founded DreamWorks after leaving Disney." },
  { name: "David Geffen", type: "co-founder", description: "David Geffen (Jewish) co-founded DreamWorks; billionaire music/film mogul." },
  { name: "DreamWorks Animation", type: "spinoff", description: "DreamWorks Animation (Shrek, Kung Fu Panda) was sold to NBCUniversal for $3.8 billion." },
  { name: "Amblin Partners", type: "successor", description: "Spielberg's Amblin Partners continues as a major film production company." }
]);
updDesc('dreamworks', 'Co-founded in 1994 by Steven Spielberg (Jewish), Jeffrey Katzenberg (Jewish), and David Geffen (Jewish) - the SKG in DreamWorks SKG. All three founders are billionaires. DreamWorks Animation (Shrek, Kung Fu Panda, How to Train Your Dragon) was sold to NBCUniversal/Comcast for $3.8B. The live-action studio produced American Beauty, Gladiator, Saving Private Ryan, and A Beautiful Mind.');

addConn('las-vegas-sands-corp', [
  { name: "Sheldon Adelson", type: "founder", description: "Sheldon Adelson (Jewish, 1933-2021) built Las Vegas Sands into a $50+ billion gaming empire." },
  { name: "Miriam Adelson", type: "owner", description: "Dr. Miriam Adelson (Jewish, Israeli-born physician) inherited control of LVS, net worth $35+ billion." },
  { name: "The Venetian/Palazzo", type: "property", description: "The Adelson family's iconic Las Vegas Strip properties." },
  { name: "Marina Bay Sands Singapore", type: "property", description: "LVS operates the iconic Marina Bay Sands in Singapore." },
  { name: "Republican Party", type: "political donations", description: "The Adelsons donated over $500 million to Republican causes and candidates." },
  { name: "Israel Hayom", type: "media", description: "Adelson founded Israel Hayom, a free daily newspaper supporting Netanyahu." }
]);
updDesc('las-vegas-sands-corp', 'Founded by Sheldon Adelson (Jewish, 1933-2021) who built it into the world\'s largest casino company. Operates The Venetian/Palazzo in Las Vegas and Marina Bay Sands in Singapore. Adelson was the largest Republican donor in US history, giving $500+ million to GOP causes. His widow Dr. Miriam Adelson (Israeli-born physician, net worth $35B+) now controls the company. Adelson founded Israel Hayom newspaper.');

addConn('berkshire-hathaway-via-subsidiaries', [
  { name: "Warren Buffett", type: "chairman/CEO", description: "While Buffett is not Jewish, Berkshire has many Jewish-connected subsidiaries and leaders." },
  { name: "Ajit Jain", type: "vice chairman", description: "Various Jewish executives have held senior positions at Berkshire subsidiaries." },
  { name: "Israel bonds", type: "investment", description: "Buffett was the first major American investor to acquire an Israeli company (Iscar, $4B, 2006)." },
  { name: "Iscar (IMC Group)", type: "Israeli subsidiary", description: "Buffett bought Israeli toolmaker Iscar for $4 billion in 2006 from the Wertheimer family." },
  { name: "GEICO, See's Candies", type: "subsidiaries", description: "Berkshire owns dozens of major companies across industries." }
]);
updDesc('berkshire-hathaway-via-subsidiaries', 'Warren Buffett\'s $900+ billion conglomerate has significant Jewish connections. Buffett made his first-ever foreign acquisition when he bought Israeli toolmaker Iscar (IMC Group) from the Wertheimer family for $4 billion in 2006, calling it "an outstanding business." Buffett has been a strong supporter of Israel, buying more of Iscar in 2013. Multiple Jewish executives have led Berkshire subsidiaries.');

addConn('kraft-group', [
  { name: "Robert Kraft", type: "owner", description: "Robert Kraft (Jewish) owns the Kraft Group, the New England Patriots, and New England Revolution." },
  { name: "New England Patriots", type: "sports franchise", description: "Kraft bought the Patriots for $172 million in 1994; now worth $7+ billion." },
  { name: "Genesis Prize Foundation", type: "philanthropy", description: "Kraft won the Genesis Prize (the 'Jewish Nobel') in 2019." },
  { name: "Columbia University", type: "alma mater", description: "Kraft graduated from Columbia Business School." },
  { name: "Israel connections", type: "philanthropy", description: "Kraft has donated hundreds of millions to Jewish and Israeli causes." }
]);
updDesc('kraft-group', 'Owned by Robert Kraft (Jewish), who built his fortune in paper and packaging before buying the New England Patriots for $172 million in 1994 (now worth $7+ billion). The Patriots won 6 Super Bowls under Kraft\'s ownership. Won the Genesis Prize (\"Jewish Nobel\") in 2019. Major philanthropist supporting Harvard, Columbia, Jewish causes, and Israel. Net worth estimated at $11+ billion.');

// ============================================================
// US - REAL ESTATE
// ============================================================
addConn('sl-green-realty-corp', [
  { name: "Marc Holliday", type: "CEO", description: "Marc Holliday (Jewish) has led SL Green as CEO since 2004." },
  { name: "One Vanderbilt", type: "flagship property", description: "SL Green developed One Vanderbilt, the tallest office tower in Midtown Manhattan." },
  { name: "Stephen L. Green", type: "founder", description: "Stephen L. Green founded SL Green; it became NYC's largest office REIT." },
  { name: "New York City skyline", type: "real estate portfolio", description: "SL Green is the largest office landlord in Manhattan." }
]);
updDesc('sl-green-realty-corp', 'Manhattan\'s largest office landlord, founded by Stephen L. Green. CEO Marc Holliday (Jewish) developed One Vanderbilt - the tallest office tower in Midtown Manhattan at 1,401 feet. SL Green\'s portfolio includes over 30 million square feet of Manhattan office space. The company\'s developments have reshaped the NYC skyline.');

addConn('lefrak-organization', [
  { name: "Richard LeFrak", type: "chairman", description: "Richard LeFrak (Jewish) runs the family real estate empire founded by his grandfather." },
  { name: "LeFrak City, Queens", type: "development", description: "LeFrak City in Queens houses 15,000+ residents in a massive postwar development." },
  { name: "Newport, Jersey City", type: "development", description: "The LeFrak family developed Newport, a 600-acre waterfront community in Jersey City." },
  { name: "Donald Trump", type: "friendship", description: "Richard LeFrak is a close friend of Donald Trump and served on his infrastructure council." }
]);
updDesc('lefrak-organization', 'A four-generation Jewish family real estate empire. Richard LeFrak (Jewish) chairs the organization, which built LeFrak City in Queens (15,000+ residents) and Newport, a 600-acre waterfront community in Jersey City. The LeFrak family fortune is estimated at $7+ billion. Richard LeFrak served on Donald Trump\'s infrastructure advisory council.');

addConn('extell-development-company', [
  { name: "Gary Barnett", type: "founder/CEO", description: "Gary Barnett (Jewish, born Gershon Swiatycki in Israel) founded Extell in 1989." },
  { name: "One57", type: "development", description: "Extell's One57 was one of the first supertall luxury towers on Billionaires' Row." },
  { name: "Central Park Tower", type: "development", description: "Central Park Tower (1,550 feet) is the tallest residential building in the world." },
  { name: "Billionaires' Row", type: "NYC real estate", description: "Extell was a pioneer of NYC's Billionaires' Row along 57th Street." }
]);
updDesc('extell-development-company', 'Founded by Gary Barnett (Jewish, born Gershon Swiatycki in Israel) in 1989. Extell pioneered NYC\'s \"Billionaires\' Row\" with One57 and developed Central Park Tower - the world\'s tallest residential building at 1,550 feet. The penthouse at One57 sold for $100 million. Barnett, an Orthodox Jew, has transformed Manhattan\'s skyline with ultra-luxury developments.');

addConn('rxr-realty', [
  { name: "Scott Rechler", type: "CEO", description: "Scott Rechler (Jewish) is CEO of RXR, one of the largest real estate companies in the NY region." },
  { name: "Starrett-Lehigh Building", type: "property", description: "RXR owns the iconic Starrett-Lehigh Building in Chelsea." },
  { name: "Port Authority of New York", type: "board", description: "Rechler served as vice chairman of the Port Authority of NY & NJ." }
]);
updDesc('rxr-realty', 'Led by Scott Rechler (Jewish), RXR is one of the largest real estate owners and operators in the New York metropolitan area, managing 30+ million square feet of commercial property. Rechler served as vice chairman of the Port Authority of New York and New Jersey. RXR\'s portfolio includes major Manhattan office buildings and a $1 billion investment platform.');

addConn('boston-properties', [
  { name: "Mortimer Zuckerman", type: "co-founder", description: "Mortimer Zuckerman (Jewish) co-founded Boston Properties and owned the NY Daily News and US News & World Report." },
  { name: "Owen Thomas", type: "CEO", description: "Owen Thomas leads Boston Properties, now called BXP." },
  { name: "General Motors Building", type: "property", description: "BXP owns the GM Building on Fifth Avenue, one of NYC's most valuable properties." },
  { name: "Salesforce Tower SF", type: "property", description: "BXP developed Salesforce Tower in San Francisco." }
]);
updDesc('boston-properties', 'Co-founded by Mortimer Zuckerman (Jewish), who also owned the New York Daily News and US News & World Report. Now called BXP, it is one of the largest publicly traded office REITs in the US. Portfolio includes the General Motors Building on Fifth Avenue, Salesforce Tower (SF), and premium office properties in NYC, Boston, LA, Seattle, and DC. Manages 54 million square feet of Class A office space.');

addConn('mack-real-estate-group', [
  { name: "William Mack", type: "founder", description: "William Mack (Jewish) is a prominent NYC real estate developer and philanthropist." },
  { name: "Mack-Cali Realty", type: "creation", description: "Mack merged his real estate portfolio to create Mack-Cali Realty." },
  { name: "1 Wall Street", type: "development", description: "Mack Real Estate developed the conversion of 1 Wall Street into luxury residences." }
]);
updDesc('mack-real-estate-group', 'Founded by William Mack (Jewish), a prominent NYC real estate developer. Mack created Mack-Cali Realty (now Veris Residential), one of the largest REITs in the NY/NJ region. The Mack family developed the conversion of 1 Wall Street into luxury residences. William Mack is a major philanthropist supporting UJA-Federation, NYU, and Jewish causes.');

addConn('simon-property-group', [
  { name: "Melvin Simon", type: "co-founder", description: "Melvin Simon (Jewish) co-founded Simon Property Group with his brother Herbert." },
  { name: "David Simon", type: "CEO", description: "David Simon (Jewish) has led SPG as CEO since 1995, making it the largest US mall REIT." },
  { name: "Premium Outlets", type: "brand", description: "SPG operates the Premium Outlets brand with 80+ centers." },
  { name: "Taubman Centers acquisition", type: "deal", description: "SPG acquired rival Taubman Centers for $3.4 billion in 2020." }
]);
updDesc('simon-property-group', 'Founded by Melvin Simon (Jewish) and his brother Herbert. Simon Property Group is the largest shopping mall REIT in the US, valued at $60+ billion. CEO David Simon (Jewish, Mel\'s son) has led the company since 1995. Owns or operates 200+ properties including Premium Outlets, Mills malls, and iconic centers like Roosevelt Field and Houston Galleria. Acquired Taubman Centers for $3.4B.');

addConn('brookfield-properties-ric-clark', [
  { name: "Ric Clark", type: "former chairman", description: "Ric Clark (Jewish) served as chairman of Brookfield Property Partners." },
  { name: "Brookfield Place NYC", type: "property", description: "Brookfield Place in Lower Manhattan is a major mixed-use complex." },
  { name: "Manhattan West", type: "development", description: "Brookfield developed the $5B Manhattan West megaproject near Hudson Yards." }
]);
updDesc('brookfield-properties-ric-clark', 'Ric Clark (Jewish) served as chairman of Brookfield Property Partners, one of the world\'s largest commercial real estate companies. Brookfield Properties manages 150+ million sq ft of office, retail, and multifamily space globally. Major NYC properties include Brookfield Place in Lower Manhattan and the $5 billion Manhattan West development. Part of the broader Brookfield Asset Management empire ($800B+ AUM).');

addConn('mack-cali-realty-veris-residential', [
  { name: "Mack family", type: "founders", description: "Founded by the Mack family - major Jewish real estate developers." },
  { name: "NJ waterfront", type: "portfolio", description: "Major developer of NJ waterfront residential and commercial properties." },
  { name: "Transformation to residential", type: "strategy", description: "Rebranded from Mack-Cali to Veris Residential, pivoting from office to multifamily." }
]);
updDesc('mack-cali-realty-veris-residential', 'Originally founded by the Mack family (Jewish, prominent NYC/NJ real estate developers). Now rebranded as Veris Residential after pivoting from office to multifamily housing. Owns and operates 6,000+ apartment units primarily along the NJ waterfront with views of Manhattan. The transformation from commercial office to residential REIT reflects broader market trends.');

addConn('forest-city-realty-brookfield', [
  { name: "Ratner family", type: "founding family", description: "The Ratner family (Jewish) founded Forest City Enterprises in Cleveland in 1920." },
  { name: "Barclays Center", type: "development", description: "Forest City developed Barclays Center and Pacific Park in Brooklyn." },
  { name: "Bruce Ratner", type: "developer", description: "Bruce Ratner (Jewish) led the development of Atlantic Yards/Pacific Park and brought the Nets to Brooklyn." },
  { name: "Brookfield acquisition", type: "acquisition", description: "Brookfield Asset Management acquired Forest City Realty for $11.4 billion in 2018." }
]);
updDesc('forest-city-realty-brookfield', 'Founded by the Ratner family (Jewish) in Cleveland in 1920. Bruce Ratner (Jewish) developed the Barclays Center and the $4.9B Pacific Park mega-project in Brooklyn, bringing the Nets to Brooklyn. Forest City was acquired by Brookfield Asset Management for $11.4 billion in 2018. The company developed major mixed-use projects across the US including MetroTech Center in Brooklyn and The Yards in DC.');

addConn('zeckendorf-development', [
  { name: "William Zeckendorf Jr.", type: "partner", description: "William Zeckendorf Jr. (Jewish) and his brother Arthur are prominent NYC luxury developers." },
  { name: "520 Park Avenue", type: "development", description: "Developed 520 Park Avenue, one of NYC's most expensive residential buildings." },
  { name: "15 Central Park West", type: "development", description: "Developed 15 Central Park West - the most successful condominium in NYC history." },
  { name: "William Zeckendorf Sr.", type: "legendary predecessor", description: "William Zeckendorf Sr. (Jewish) was one of the most famous real estate developers in American history." }
]);
updDesc('zeckendorf-development', 'The Zeckendorf family (Jewish) has been a major force in NYC real estate for three generations. William Zeckendorf Sr. was a legendary developer who helped plan the United Nations headquarters. His grandsons William Jr. and Arthur developed 15 Central Park West - the most successful condo in NYC history - and 520 Park Avenue, where penthouses sold for $100+ million.');

addConn('starbucks-howard-schultz-era', [
  { name: "Howard Schultz", type: "former CEO/chairman", description: "Howard Schultz (Jewish) built Starbucks from 11 stores to 35,000+ global locations." },
  { name: "Italy inspiration", type: "concept", description: "Schultz was inspired by Italian espresso bars to transform Starbucks from a coffee bean retailer." },
  { name: "Employee benefits", type: "corporate policy", description: "Schultz pioneered offering stock options and health insurance to part-time employees." },
  { name: "2024 presidential exploration", type: "politics", description: "Schultz explored a 2020 presidential run as an independent." }
]);
updDesc('starbucks-howard-schultz-era', 'Howard Schultz (Jewish) transformed Starbucks from 11 stores in 1987 to 35,000+ locations worldwide. Grew up in Brooklyn public housing. Pioneered offering health insurance and stock options to part-time workers. Under his leadership, Starbucks became a cultural phenomenon and one of the most recognized brands in the world. Net worth $3+ billion. Explored a 2020 presidential bid.');

// ============================================================
// US - SPORTS TEAMS
// ============================================================
addConn('new-england-patriots-kraft-group', [
  { name: "Robert Kraft", type: "owner", description: "Robert Kraft (Jewish) bought the Patriots for $172M in 1994; now worth $7B+." },
  { name: "6 Super Bowl victories", type: "championships", description: "The Patriots won 6 Super Bowls under Kraft's ownership, becoming an NFL dynasty." },
  { name: "Gillette Stadium", type: "venue", description: "Kraft built Gillette Stadium and the Patriot Place shopping/entertainment complex." },
  { name: "New England Revolution", type: "MLS team", description: "Kraft also owns the Revolution MLS soccer team." }
]);
updDesc('new-england-patriots-kraft-group', 'Owned by Robert Kraft (Jewish) since 1994. Under Kraft, the Patriots became the most successful NFL franchise of the 21st century, winning 6 Super Bowls. Kraft bought the team for $172 million - now valued at $7+ billion. Built Gillette Stadium and Patriot Place. Kraft won the Genesis Prize and is a major Jewish philanthropist.');

addConn('miami-dolphins-stephen-ross', [
  { name: "Stephen Ross", type: "owner", description: "Stephen Ross (Jewish) owns the Dolphins and is founder of Related Companies." },
  { name: "Related Companies", type: "real estate empire", description: "Ross founded Related Companies, developer of NYC's Hudson Yards ($25B project)." },
  { name: "Hard Rock Stadium", type: "venue", description: "Ross invested $550 million to renovate Hard Rock Stadium." },
  { name: "Hudson Yards", type: "development", description: "Ross's $25 billion Hudson Yards is the largest private real estate development in US history." },
  { name: "Equinox/SoulCycle", type: "fitness", description: "Ross also owns Equinox fitness clubs and SoulCycle through Related." }
]);
updDesc('miami-dolphins-stephen-ross', 'Owned by Stephen Ross (Jewish), founder of Related Companies. Ross developed Hudson Yards - the largest private real estate development in US history ($25 billion). Bought the Dolphins for $1.1 billion in 2009; team now valued at $6+ billion. Also owns Equinox, SoulCycle. Net worth estimated at $12+ billion. Ross is a major University of Michigan donor ($400M+).');

addConn('brooklyn-nets-formerly-ratner', [
  { name: "Joe Tsai", type: "current owner", description: "Joe Tsai (Alibaba co-founder) bought the Nets from Mikhail Prokhorov." },
  { name: "Bruce Ratner", type: "former owner", description: "Bruce Ratner (Jewish) brought the Nets to Brooklyn and developed Barclays Center." },
  { name: "Barclays Center", type: "venue", description: "Ratner developed the $1 billion Barclays Center in Brooklyn." },
  { name: "Atlantic Yards/Pacific Park", type: "development", description: "The arena was part of Ratner's larger Pacific Park development." }
]);
updDesc('brooklyn-nets-formerly-ratner', 'Bruce Ratner (Jewish) brought the Nets from New Jersey to Brooklyn, developing the $1 billion Barclays Center as part of the $4.9 billion Pacific Park/Atlantic Yards mega-project. Ratner\'s Forest City Enterprises developed the project. The Nets were later sold to Russian billionaire Mikhail Prokhorov, then to Joe Tsai. The move to Brooklyn transformed the borough\'s identity.');

addConn('los-angeles-clippers-steve-ballmer', [
  { name: "Steve Ballmer", type: "owner", description: "Steve Ballmer (Jewish mother) bought the Clippers for $2 billion in 2014." },
  { name: "Microsoft", type: "career", description: "Ballmer was CEO of Microsoft (2000-2014) and is worth $120+ billion." },
  { name: "Intuit Dome", type: "venue", description: "Ballmer built the $2 billion Intuit Dome as the Clippers' new arena in Inglewood." },
  { name: "Donald Sterling", type: "predecessor", description: "Ballmer bought the Clippers after Donald Sterling (Jewish) was banned for racist remarks." }
]);
updDesc('los-angeles-clippers-steve-ballmer', 'Owned by Steve Ballmer (Jewish mother), former Microsoft CEO (2000-2014), worth $120+ billion. Bought the Clippers for $2 billion in 2014 after Donald Sterling (Jewish, born Donald Tokowitz) was banned by the NBA. Ballmer built the $2 billion Intuit Dome in Inglewood as the team\'s new home. Ballmer is the richest owner in professional sports.');

addConn('las-vegas-raiders-mark-davis', [
  { name: "Mark Davis", type: "owner", description: "Mark Davis (Jewish) inherited the Raiders from his father Al Davis." },
  { name: "Al Davis", type: "founding figure", description: "Al Davis (Jewish) was a legendary NFL figure who owned the Raiders for decades and coined 'Just win, baby.'" },
  { name: "Allegiant Stadium", type: "venue", description: "Davis moved the Raiders to Las Vegas and built the $1.9 billion Allegiant Stadium." },
  { name: "Las Vegas WNBA (Aces)", type: "ownership", description: "Davis also owns the Las Vegas Aces WNBA team, which won back-to-back championships." }
]);
updDesc('las-vegas-raiders-mark-davis', 'Owned by Mark Davis (Jewish), son of legendary NFL owner Al Davis (Jewish). Al Davis coined "Just win, baby" and was known for breaking barriers - hiring the first Black head coach, Latino head coach, and female CEO in NFL history. Mark moved the team to Las Vegas, building the $1.9 billion Allegiant Stadium. Also owns the WNBA\'s Las Vegas Aces (back-to-back champions).');

addConn('minnesota-timberwolves-glen-taylor-marc-lore-alex-rodriguez', [
  { name: "Marc Lore", type: "co-owner", description: "Marc Lore (Jewish) is co-owner; he previously sold Jet.com to Walmart for $3.3 billion." },
  { name: "Glen Taylor", type: "former majority owner", description: "Glen Taylor sold the team to Lore and Alex Rodriguez." },
  { name: "Alex Rodriguez", type: "co-owner", description: "Former MLB star A-Rod co-owns the Timberwolves with Lore." },
  { name: "Target Center", type: "venue", description: "The Timberwolves play at Target Center in Minneapolis." }
]);
updDesc('minnesota-timberwolves-glen-taylor-marc-lore-alex-rodriguez', 'Co-owned by Marc Lore (Jewish), who sold Jet.com to Walmart for $3.3 billion and previously co-founded Diapers.com (sold to Amazon for $500M). Lore and Alex Rodriguez agreed to buy the Timberwolves and Lynx from Glen Taylor for $1.5 billion. Lore is an entrepreneur known for innovative business concepts and is developing a utopian city called Telosa.');

addConn('phoenix-suns-mat-ishbia', [
  { name: "Mat Ishbia", type: "owner", description: "Mat Ishbia (Jewish) bought the Suns and Mercury for $4 billion in 2023." },
  { name: "United Wholesale Mortgage", type: "business", description: "Ishbia is CEO of UWM, the #1 wholesale mortgage lender in America." },
  { name: "Michigan State", type: "college", description: "Ishbia was a walk-on player on Michigan State's 2000 national championship basketball team." }
]);
updDesc('phoenix-suns-mat-ishbia', 'Mat Ishbia (Jewish) bought the Phoenix Suns and Mercury for a then-record $4 billion in 2023. CEO of United Wholesale Mortgage (UWM), the largest wholesale mortgage lender in the US. Walk-on member of Michigan State\'s 2000 national championship basketball team. Net worth estimated at $5+ billion.');

addConn('anaheim-ducks-henry-samueli', [
  { name: "Henry Samueli", type: "owner", description: "Henry Samueli (Jewish) owns the Anaheim Ducks and co-founded Broadcom." },
  { name: "Broadcom", type: "company", description: "Samueli co-founded Broadcom, a major semiconductor company." },
  { name: "Honda Center", type: "venue", description: "The Ducks play at Honda Center in Anaheim." },
  { name: "Susan Samueli", type: "co-owner/philanthropy", description: "Susan Samueli (Jewish) co-owns the Ducks and supports UCI health programs." }
]);
updDesc('anaheim-ducks-henry-samueli', 'Owned by Henry Samueli (Jewish), co-founder of Broadcom, a major semiconductor company now worth $700+ billion. Samueli and his wife Susan bought the Ducks from Disney in 2005. Henry is a professor emeritus at UC Irvine and major donor to UCI engineering. The Samuelis are prominent Orange County philanthropists. The Ducks won the Stanley Cup in 2007.');

addConn('carolina-hurricanes-tom-dundon', [
  { name: "Tom Dundon", type: "owner", description: "Tom Dundon (Jewish) became majority owner of the Hurricanes in 2018." },
  { name: "Adara Capital", type: "investment firm", description: "Dundon runs the Dallas-based investment firm Adara Capital." },
  { name: "AAF", type: "business venture", description: "Dundon invested in the Alliance of American Football league before it folded." },
  { name: "Stanley Cup 2006", type: "history", description: "The Hurricanes won the Stanley Cup in 2006." }
]);
updDesc('carolina-hurricanes-tom-dundon', 'Majority owned by Tom Dundon (Jewish) since 2018. Dundon is a Dallas-based billionaire who runs Adara Capital investment firm. Made his fortune in auto lending. Under his ownership, the Hurricanes have become consistent playoff contenders. The team won the Stanley Cup in 2006 and has built a strong following in the Raleigh, NC market.');

// ============================================================
// US - RESEARCH INSTITUTES / THINK TANKS
// ============================================================
addConn('hudson-institute', [
  { name: "Herman Kahn", type: "founder", description: "Herman Kahn (Jewish) founded the Hudson Institute in 1961 as a Cold War think tank." },
  { name: "US defense policy", type: "focus area", description: "Hudson focuses on US defense, foreign policy, and national security." },
  { name: "Mike Pompeo", type: "fellow", description: "Former Secretary of State Mike Pompeo became a Hudson Institute fellow." },
  { name: "Neoconservative movement", type: "intellectual alignment", description: "Hudson has aligned with hawkish national security and pro-Israel positions." }
]);
updDesc('hudson-institute', 'Founded in 1961 by Herman Kahn (Jewish), a nuclear strategist and futurist. The Hudson Institute is a conservative think tank focusing on defense, foreign policy, technology, and economics. Has become increasingly influential in pro-Israel policy circles. Fellows have included senior government officials. Based in Washington, D.C. Kahn was a model for the character of Dr. Strangelove.');

addConn('middle-east-media-research-institute-memri', [
  { name: "Yigal Carmon", type: "founder", description: "Yigal Carmon (Jewish, Israeli) founded MEMRI in 1998; former Israeli military intelligence officer." },
  { name: "US government", type: "consumer", description: "MEMRI's translations are used by US government agencies and media outlets." },
  { name: "Israeli intelligence", type: "founder background", description: "Carmon served in Israeli military intelligence before founding MEMRI." },
  { name: "Middle East media monitoring", type: "mission", description: "MEMRI translates and analyzes Arabic, Farsi, and Turkish media for English-speaking audiences." }
]);
updDesc('middle-east-media-research-institute-memri', 'Founded in 1998 by Yigal Carmon (Jewish, Israeli), a former Israeli military intelligence colonel, and Meyrav Wurmser. MEMRI translates and analyzes Arabic, Farsi, Turkish, and Urdu media for Western audiences. Its translations are widely used by US policymakers, journalists, and academics. Provides insight into Middle Eastern political discourse, extremism, and antisemitism.');

// ============================================================
// US - FASHION, RETAIL
// ============================================================
addConn('marc-jacobs-international', [
  { name: "Marc Jacobs", type: "founder/designer", description: "Marc Jacobs (Jewish) is one of the most influential American fashion designers." },
  { name: "LVMH", type: "parent company (former)", description: "Jacobs served as creative director of Louis Vuitton (1997-2014) under LVMH." },
  { name: "Parsons School of Design", type: "education", description: "Jacobs graduated from Parsons, winning the Perry Ellis Gold Thimble Award." }
]);
updDesc('marc-jacobs-international', 'Marc Jacobs (Jewish) is one of the most influential American fashion designers. Served as creative director of Louis Vuitton from 1997-2014, revitalizing the brand. His eponymous label is known for avant-garde, provocative designs. At 24, he was fired from Perry Ellis for his famous "grunge collection" - now considered a fashion milestone. A fixture of NYC fashion culture.');

addConn('michael-kors-capri-holdings', [
  { name: "Michael Kors", type: "founder/designer", description: "Michael Kors (Jewish, born Karl Anderson Jr.) is a billionaire fashion designer." },
  { name: "Capri Holdings", type: "parent company", description: "Kors renamed his company Capri Holdings after acquiring Versace ($2.1B) and Jimmy Choo ($1.2B)." },
  { name: "Tapestry merger", type: "deal", description: "Tapestry (Coach) attempted to acquire Capri Holdings for $8.5 billion." },
  { name: "Project Runway", type: "media", description: "Kors served as a judge on Project Runway, becoming a household name." }
]);
updDesc('michael-kors-capri-holdings', 'Michael Kors (Jewish, born Karl Anderson Jr.) built a fashion empire now called Capri Holdings. Acquired Versace for $2.1 billion and Jimmy Choo for $1.2 billion. Kors became a household name as a judge on Project Runway. His accessible luxury brand generates billions in annual revenue. Born to a Jewish mother; his stepfather\'s surname Kors was adopted as his professional name.');

addConn('home-depot', [
  { name: "Bernie Marcus", type: "co-founder", description: "Bernie Marcus (Jewish) co-founded Home Depot in 1978." },
  { name: "Arthur Blank", type: "co-founder", description: "Arthur Blank (Jewish) co-founded Home Depot; later bought the Atlanta Falcons." },
  { name: "Marcus Foundation", type: "philanthropy", description: "Bernie Marcus has given away $2+ billion, including $250M to the Georgia Aquarium." },
  { name: "Republican Party", type: "political donations", description: "Marcus is a major Republican donor and Trump supporter." },
  { name: "Grady Memorial Hospital", type: "philanthropy", description: "Marcus donated $250M to Grady Hospital and $400M to autism research." }
]);
updDesc('home-depot', 'Co-founded in 1978 by Bernie Marcus (Jewish) and Arthur Blank (Jewish), who were both fired from Handy Dan hardware. Home Depot grew to 2,300+ stores and $150+ billion market cap. Marcus, now worth $10+ billion, has donated $2+ billion through the Marcus Foundation (Georgia Aquarium, autism research, veterans). Blank owns the Atlanta Falcons and Atlanta United FC. Both men are among the most philanthropic Jewish Americans.');

addConn('costco-wholesale', [
  { name: "Jeffrey Brotman", type: "co-founder", description: "Jeffrey Brotman (Jewish) co-founded Costco in 1983 with James Sinegal." },
  { name: "Sol Price", type: "inspiration", description: "Sol Price (Jewish) invented the warehouse club concept with FedMart and Price Club - Costco later merged with Price Club." },
  { name: "Washington state", type: "headquarters", description: "Costco is headquartered in Issaquah, Washington." },
  { name: "Kirkland Signature", type: "private label", description: "Costco's Kirkland brand generates $60+ billion in annual sales." }
]);
updDesc('costco-wholesale', 'Co-founded in 1983 by Jeffrey Brotman (Jewish) and James Sinegal. The warehouse club concept was invented by Sol Price (Jewish), whose Price Club later merged with Costco. Now the third-largest retailer in the world with 850+ warehouses, 300,000+ employees, and $200+ billion in annual revenue. Known for treating employees well (high wages, benefits) and the famous $1.50 hot dog combo.');

addConn('revlon', [
  { name: "Charles Revson", type: "founder", description: "Charles Revson (Jewish) co-founded Revlon in 1932, building it into a cosmetics empire." },
  { name: "Ronald Perelman", type: "former owner", description: "Ronald Perelman (Jewish) acquired Revlon in a hostile takeover in 1985." },
  { name: "MacAndrews & Forbes", type: "holding company", description: "Perelman's MacAndrews & Forbes controlled Revlon for decades." },
  { name: "Bankruptcy 2022", type: "financial event", description: "Revlon filed for bankruptcy in 2022 and was acquired by Revlon's lenders." }
]);
updDesc('revlon', 'Founded in 1932 by Charles Revson (Jewish) and his brother Joseph. Revlon revolutionized the cosmetics industry by matching nail polish to lipstick colors. In 1985, Ronald Perelman (Jewish) acquired Revlon in a famous hostile takeover for $2.7 billion. The company struggled financially and filed for bankruptcy in 2022. At its peak, Revlon was one of the most recognized beauty brands in the world.');

// ============================================================
// US - TECH (additional thin entries)
// ============================================================
addConn('intel-corporation', [
  { name: "Andrew Grove", type: "former CEO", description: "Andrew Grove (Jewish, born András Gróf in Hungary, Holocaust survivor) led Intel as CEO, named Time's Person of the Year 1997." },
  { name: "Israel operations", type: "major presence", description: "Intel Israel is the company's largest site outside the US, with 14,000+ employees and $50B+ invested." },
  { name: "Mobileye acquisition", type: "Israeli deal", description: "Intel acquired Israeli self-driving car company Mobileye for $15.3 billion in 2017." },
  { name: "Habana Labs acquisition", type: "Israeli deal", description: "Intel acquired Israeli AI chip startup Habana Labs for $2 billion in 2019." },
  { name: "Moore's Law", type: "foundational principle", description: "Founded by Gordon Moore and Robert Noyce; Andy Grove made Intel a tech giant." }
]);
updDesc('intel-corporation', 'While founders Moore and Noyce were not Jewish, Intel\'s greatest CEO - Andrew Grove (Jewish, born András Gróf in Budapest, Holocaust survivor) - transformed Intel into the world\'s dominant chipmaker. Time\'s Person of the Year 1997. Intel Israel is the company\'s largest non-US site with 14,000+ employees and $50B+ invested. Intel acquired Israeli Mobileye ($15.3B) and Habana Labs ($2B). Intel\'s Haifa lab designed the Centrino and many key processor architectures.');

addConn('broadcom-inc', [
  { name: "Henry Samueli", type: "co-founder", description: "Henry Samueli (Jewish) co-founded Broadcom in 1991 with Henry Nicholas." },
  { name: "Hock Tan", type: "CEO", description: "Hock Tan has led the combined Broadcom-Avago entity but Samueli remains CTO." },
  { name: "Anaheim Ducks", type: "sports ownership", description: "Samueli owns the Anaheim Ducks NHL team." },
  { name: "VMware acquisition", type: "deal", description: "Broadcom acquired VMware for $61 billion in 2023." }
]);
updDesc('broadcom-inc', 'Co-founded in 1991 by Henry Samueli (Jewish) and Henry Nicholas at UCLA. Broadcom became a leading semiconductor company for wireless and broadband communications. After Avago Technologies acquired Broadcom for $37B in 2016, Samueli remained as CTO. The combined company acquired VMware for $61B in 2023. Now a $700+ billion company. Samueli is a billionaire who also owns the Anaheim Ducks.');

addConn('palantir-technologies', [
  { name: "Peter Thiel", type: "co-founder", description: "Peter Thiel (born in Germany) co-founded Palantir; major tech investor." },
  { name: "Alex Karp", type: "CEO", description: "Alex Karp (Jewish) has served as Palantir CEO since its founding in 2003." },
  { name: "US intelligence agencies", type: "government contracts", description: "Palantir has major contracts with the CIA, NSA, FBI, and military." },
  { name: "Israel operations", type: "controversial", description: "Palantir has been used by Israeli military and intelligence." },
  { name: "Stephen Cohen", type: "co-founder", description: "Stephen Cohen (Jewish) co-founded Palantir and serves as President." }
]);
updDesc('palantir-technologies', 'CEO Alex Karp (Jewish) leads Palantir, co-founded in 2003 with Peter Thiel and Stephen Cohen (Jewish). Named after the seeing stones in Lord of the Rings. Palantir builds data analytics software used by the CIA, NSA, military, and intelligence agencies. Market cap $100+ billion. Karp, who has a PhD from a German university, has spoken about his Jewish identity shaping his views on protecting democracies.');

addConn('paypal', [
  { name: "Max Levchin", type: "co-founder", description: "Max Levchin (Jewish, born in Ukraine) co-founded PayPal." },
  { name: "Peter Thiel", type: "co-founder", description: "Peter Thiel co-founded PayPal and later formed the 'PayPal Mafia.'" },
  { name: "David Sacks", type: "former COO", description: "David Sacks (Jewish, born in South Africa) served as PayPal's COO." },
  { name: "PayPal Mafia", type: "tech network", description: "PayPal alumni ('PayPal Mafia') went on to found Tesla, YouTube, LinkedIn, Yelp, and Palantir." },
  { name: "eBay", type: "former parent", description: "eBay acquired PayPal for $1.5 billion in 2002; PayPal later spun off in 2015." }
]);
updDesc('paypal', 'Co-founded by Max Levchin (Jewish, born in Kyiv, Ukraine) and Peter Thiel in 1998. David Sacks (Jewish, South African-born) was COO. The \"PayPal Mafia\" is among the most influential networks in tech - alumni went on to found or lead Tesla, YouTube, LinkedIn, Yelp, Palantir, and Yammer. Acquired by eBay for $1.5B (2002), spun off in 2015. Now a $70+ billion fintech company processing $1.5 trillion per year.');

// ============================================================
// US - MEDIA
// ============================================================
addConn('nbcuniversal-comcast', [
  { name: "Brian Roberts", type: "CEO/chairman", description: "Brian Roberts (Jewish) is CEO of Comcast, which owns NBCUniversal." },
  { name: "Ralph Roberts", type: "founder", description: "Ralph Roberts (Jewish) founded Comcast in 1963, building it into the largest cable company." },
  { name: "Universal Pictures", type: "studio", description: "NBCUniversal owns Universal Pictures, one of the Big Five studios." },
  { name: "Jeff Shell", type: "former CEO", description: "Jeff Shell (Jewish) served as CEO of NBCUniversal." },
  { name: "DreamWorks Animation", type: "acquisition", description: "NBCUniversal acquired DreamWorks Animation (Spielberg/Katzenberg/Geffen) for $3.8 billion." }
]);
updDesc('nbcuniversal-comcast', 'Comcast, founded by Ralph Roberts (Jewish) in 1963, is the largest cable/broadband company in the US. His son Brian Roberts (Jewish) serves as CEO, controlling the $180B+ company. Comcast owns NBCUniversal (NBC, MSNBC, CNBC, Universal Pictures, Universal theme parks). Acquired NBCUniversal for $30B and DreamWorks Animation for $3.8B. Jeff Shell (Jewish) served as NBCUniversal CEO.');

addConn('viacomcbs-paramount-global', [
  { name: "Sumner Redstone", type: "former controlling owner", description: "Sumner Redstone (Jewish, born Sumner Rothstein) controlled Viacom/CBS through National Amusements." },
  { name: "Shari Redstone", type: "controlling owner", description: "Shari Redstone (Jewish) took control after her father's decline, merging Viacom and CBS." },
  { name: "Paramount Pictures", type: "studio", description: "Paramount is one of the oldest and most iconic Hollywood studios." },
  { name: "MTV/Nickelodeon/BET", type: "networks", description: "Paramount Global owns MTV, Nickelodeon, BET, Comedy Central, and Showtime." },
  { name: "Skydance merger", type: "deal", description: "Paramount merged with David Ellison's (Jewish) Skydance Media in 2024." }
]);
updDesc('viacomcbs-paramount-global', 'Controlled by the Redstone family through National Amusements. Sumner Redstone (Jewish, born Rothstein, 1923-2020) built a media empire. His daughter Shari Redstone (Jewish) merged Viacom and CBS in 2019. Owns Paramount Pictures, MTV, Nickelodeon, BET, Comedy Central, Showtime, and CBS. In 2024, Paramount merged with David Ellison\'s (Jewish, son of Oracle\'s Larry Ellison) Skydance Media in a $8B deal.');

addConn('the-new-york-times-company', [
  { name: "Sulzberger family", type: "controlling family", description: "The Sulzberger family (Jewish) has controlled the NY Times since Adolph Ochs bought it in 1896." },
  { name: "A.G. Sulzberger", type: "publisher", description: "A.G. Sulzberger (Jewish) is the current publisher, the 5th generation of family leadership." },
  { name: "Adolph Ochs", type: "founding publisher", description: "Adolph Ochs (Jewish) bought the struggling Times in 1896 and coined 'All the News That's Fit to Print.'" },
  { name: "Wirecutter", type: "acquisition", description: "NYT acquired Wirecutter, The Athletic, and Wordle, growing to 10+ million subscribers." },
  { name: "Pulitzer Prizes", type: "journalism", description: "The NYT has won 132 Pulitzer Prizes, more than any other news organization." }
]);
updDesc('the-new-york-times-company', 'Controlled by the Sulzberger family (Jewish) since Adolph Ochs (Jewish) bought the paper in 1896. A.G. Sulzberger (5th generation) is the current publisher. The Times has won 132 Pulitzer Prizes - more than any news organization. \"All the News That\'s Fit to Print\" has been the masthead motto since 1897. Now a digital-first company with 10+ million subscribers. Acquired The Athletic, Wirecutter, and Wordle.');

// ============================================================
// SAVE
// ============================================================
fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));
let tc=0,wc=0,pc=0;for(const c in data.countries)for(const e of data.countries[c]){tc++;if(e.connections&&e.connections.length)wc++;pc+=(e.connections||[]).length;}
console.log(`addConnections6.js done! ${tc} entries, ${wc} with connections, ${pc} total connections, ${Object.keys(people.people).length} people.`);
