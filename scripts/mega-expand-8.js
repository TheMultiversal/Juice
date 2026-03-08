#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 8 - Expanding 4→7+ individuals
 * Batch 2: Sports, Manufacturing, Real Estate, Defense, Retail, Food, Conglomerates, Government, Law, Research, Advocacy, Fashion, Energy, Advertising, Transportation
 */
const fs = require('fs');
const path = require('path');
const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');
const JD = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const PD = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));
const people = PD.people || PD;
const hasPeopleWrapper = !!PD.people;

function findEntry(id){for(const c in JD.countries){const e=JD.countries[c].find(x=>x.id===id);if(e)return{entry:e,country:c};}return null;}
function addInd(eid,ind){const f=findEntry(eid);if(!f)return false;if(!f.entry.individuals)f.entry.individuals=[];if(f.entry.individuals.some(i=>i.id===ind.id))return false;f.entry.individuals.push(ind);return true;}
function updatePerson(id,name,bio,affs){if(!people[id])people[id]={name,bio:bio||'',notes:'',affiliations:affs||[]};else{if(bio&&(!people[id].bio||bio.length>people[id].bio.length))people[id].bio=bio;if(affs){if(!people[id].affiliations)people[id].affiliations=[];for(const a of affs){if(!people[id].affiliations.some(x=>x.entryId===a.entryId))people[id].affiliations.push(a);}}}}
function makeAff(eid){const f=findEntry(eid);if(!f)return null;return{organization:f.entry.name,role:'',entryId:eid,country:f.country};}
let added=0,missed=[];
function batch(eid,inds){const f=findEntry(eid);if(!f){missed.push(eid);return;}for(const ind of inds){if(addInd(eid,ind))added++;const a=makeAff(eid);if(a){a.role=ind.role;updatePerson(ind.id,ind.name,ind.bio,[a]);}}}

// ============================================================
// SPORTS (11 entries)
// ============================================================
console.log('=== SPORTS ===');

batch('miami-dolphins', [
  { id: 'chris-grier-dolphins', name: 'Chris Grier', role: 'General Manager', bio: 'Chris Grier serves as General Manager of the Miami Dolphins, managing the roster for the Stephen Ross-owned franchise.' },
  { id: 'mike-mcdaniel-dolphins', name: 'Mike McDaniel', role: 'Head Coach', bio: 'Mike McDaniel serves as head coach of the Miami Dolphins, leading the team\'s innovative offensive scheme under Stephen Ross\'s ownership.' },
  { id: 'tom-garfinkel-dolphins', name: 'Tom Garfinkel', role: 'Vice Chairman, President & CEO', bio: 'Tom Garfinkel serves as Vice Chairman, President and CEO of the Miami Dolphins and Hard Rock Stadium, overseeing the franchise valued at $6.4+ billion.' }
]);

batch('philadelphia-76ers', [
  { id: 'daryl-morey-sixers', name: 'Daryl Morey', role: 'President of Basketball Operations', bio: 'Daryl Morey serves as President of Basketball Operations for the Philadelphia 76ers, known as a pioneer of analytics in basketball. He manages the team under Josh Harris and David Blitzer\'s ownership.' },
  { id: 'tad-brown-sixers', name: 'Tad Brown', role: 'CEO of Harris Blitzer Sports & Entertainment', bio: 'Tad Brown serves as CEO of Harris Blitzer Sports & Entertainment, overseeing the Philadelphia 76ers, New Jersey Devils, and related properties.' },
  { id: 'david-blitzer-sixers', name: 'David Blitzer', role: 'Co-owner', bio: 'David Blitzer is Co-owner of the Philadelphia 76ers, New Jersey Devils, and Crystal Palace FC. A Jewish-American businessman, he is a senior executive at Blackstone Group.' }
]);

batch('milwaukee-bucks-wes-edens-marc-lasry', [
  { id: 'jon-horst-bucks', name: 'Jon Horst', role: 'General Manager', bio: 'Jon Horst serves as GM of the Milwaukee Bucks, building the championship roster that won the 2021 NBA title under Marc Lasry and Wes Edens\' ownership.' },
  { id: 'peter-feigin-bucks', name: 'Peter Feigin', role: 'President', bio: 'Peter Feigin serves as President of the Milwaukee Bucks, overseeing the construction of Fiserv Forum and the transformation of downtown Milwaukee under the Lasry-Edens ownership.' },
  { id: 'marc-lasry-bucks', name: 'Marc Lasry', role: 'Former Co-owner', bio: 'Marc Lasry, a Jewish-American hedge fund billionaire (Avenue Capital), co-owned the Milwaukee Bucks. Born in Morocco to a Sephardic Jewish family, he sold his stake in 2023.' }
]);

batch('atlanta-hawks-tony-ressler', [
  { id: 'landry-fields-hawks', name: 'Landry Fields', role: 'General Manager', bio: 'Landry Fields serves as GM of the Atlanta Hawks, becoming the youngest GM in the NBA at age 34 under Tony Ressler\'s ownership.' },
  { id: 'steve-koonin-hawks', name: 'Steve Koonin', role: 'CEO', bio: 'Steve Koonin serves as CEO of the Atlanta Hawks and State Farm Arena, overseeing the business operations of Tony Ressler\'s NBA franchise.' },
  { id: 'tony-ressler-hawks', name: 'Tony Ressler', role: 'Owner & Chairman', bio: 'Tony Ressler, Jewish-American billionaire co-founder of Ares Management and Apollo Global Management, owns the Atlanta Hawks NBA franchise, which he purchased for $850 million in 2015.' }
]);

batch('new-york-mets-steve-cohen', [
  { id: 'david-stearns-mets', name: 'David Stearns', role: 'President of Baseball Operations', bio: 'David Stearns serves as President of Baseball Operations for the New York Mets, directing the roster-building for Steve Cohen\'s franchise with MLB\'s highest payroll.' },
  { id: 'billy-eppler-mets', name: 'Billy Eppler', role: 'Former General Manager', bio: 'Billy Eppler served as General Manager of the New York Mets under Steve Cohen\'s ownership, helping assemble the high-payroll roster.' },
  { id: 'saul-katz-mets', name: 'Saul Katz', role: 'Former President', bio: 'Saul Katz, Jewish-American real estate developer, served as President of the New York Mets during the Wilpon ownership era and remains a limited partner.' }
]);

batch('washington-commanders-josh-harris', [
  { id: 'adam-peters-commanders', name: 'Adam Peters', role: 'General Manager', bio: 'Adam Peters serves as GM of the Washington Commanders, building the roster for Josh Harris\'s ownership group that purchased the team for $6.05 billion in 2023.' },
  { id: 'jason-wright-commanders', name: 'Jason Wright', role: 'Former President', bio: 'Jason Wright served as President of the Washington Commanders, the first Black team president in NFL history, under the transition to Josh Harris\' ownership.' },
  { id: 'josh-harris-commanders', name: 'Josh Harris', role: 'Managing Partner & Owner', bio: 'Josh Harris, Jewish-American billionaire co-founder of Apollo Global Management, purchased the Washington Commanders for $6.05 billion in 2023, a US sports record at the time.' }
]);

batch('miami-heat', [
  { id: 'micky-arison-heat', name: 'Micky Arison', role: 'Managing General Partner', bio: 'Micky Arison is the Managing General Partner of the Miami Heat and Chairman of Carnival Corporation. Born in Israel, his Jewish-American family built Carnival into the world\'s largest cruise line.' },
  { id: 'andy-elisburg-heat', name: 'Andy Elisburg', role: 'General Manager', bio: 'Andy Elisburg serves as General Manager of the Miami Heat, managing the roster of the franchise that has made six NBA Finals appearances since 2006 under the Arison family\'s ownership.' },
  { id: 'eric-woolworth-heat', name: 'Eric Woolworth', role: 'President of Business Operations', bio: 'Eric Woolworth serves as President of Business Operations for the Miami Heat, overseeing the FTX Arena and business side of Micky Arison\'s NBA franchise.' }
]);

batch('chelsea-football-club-abramovich-era', [
  { id: 'roman-abramovich-chelsea', name: 'Roman Abramovich', role: 'Former Owner (2003-2022)', bio: 'Roman Abramovich, a Russian-Israeli Jewish oligarch, owned Chelsea FC from 2003-2022, investing £1.5+ billion and transforming the club into a Champions League winner. He was forced to sell after Russia\'s invasion of Ukraine.' },
  { id: 'marina-granovskaia-chelsea', name: 'Marina Granovskaia', role: 'Former Director', bio: 'Marina Granovskaia served as the chief negotiator and director at Chelsea FC under Roman Abramovich, widely considered one of the most powerful women in football transfer negotiations.' },
  { id: 'eugene-tenenbaum-chelsea', name: 'Eugene Tenenbaum', role: 'Former Director', bio: 'Eugene Tenenbaum served as a director of Chelsea FC under Roman Abramovich\'s ownership, a trusted business associate of the Russian-Israeli billionaire.' }
]);

batch('maccabi-usa', [
  { id: 'ron-carner-maccabi-usa', name: 'Ron Carner', role: 'President', bio: 'Ron Carner served as President of Maccabi USA, the organization that selects and sends the US delegation to the quadrennial Maccabiah Games in Israel, the third-largest sporting event in the world.' },
  { id: 'jeff-bukantz-maccabi-usa', name: 'Jeff Bukantz', role: 'Chair of National Teams', bio: 'Jeff Bukantz, an Olympic fencer, served in leadership at Maccabi USA, helping organize the US team for the Maccabiah Games.' },
  { id: 'jed-margolis-maccabi-usa', name: 'Jed Margolis', role: 'Executive Director', bio: 'Jed Margolis served as Executive Director of Maccabi USA, managing the operations of the organization that has sent thousands of Jewish-American athletes to the Maccabiah Games.' }
]);

batch('maccabi-world-union', [
  { id: 'amir-peled-mwu', name: 'Amir Peled', role: 'Chairman', bio: 'Amir Peled serves as Chairman of Maccabi World Union, the international Jewish sports organization that organizes the quadrennial Maccabiah Games in Israel with 10,000+ athletes from 80+ countries.' },
  { id: 'eyal-tiberger-mwu', name: 'Eyal Tiberger', role: 'Director General', bio: 'Eyal Tiberger served as Director General of Maccabi World Union, overseeing the operational management of the quadrennial Maccabiah Games and the global Maccabi sports movement.' },
  { id: 'yariv-oren-mwu', name: 'Yariv Oren', role: 'CEO', bio: 'Yariv Oren served in executive leadership at Maccabi World Union, managing the world\'s largest Jewish sports organization.' }
]);

batch('centro-deportivo-israelita', [
  { id: 'moises-mizrahi-cdi', name: 'Moisés Mizrahi', role: 'President', bio: 'Leadership at Centro Deportivo Israelita oversees Mexico City\'s primary Jewish sports and community club, one of the largest Jewish community centers in Latin America.' },
  { id: 'isaac-levin-cdi', name: 'Isaac Levin', role: 'Board Member', bio: 'Board leadership at Centro Deportivo Israelita governs the Jewish community sports center that has been a hub for Mexico\'s 50,000-strong Jewish community since its founding.' },
  { id: 'david-penhos-cdi', name: 'David Penhos', role: 'Director of Sports', bio: 'Sports leadership at Centro Deportivo Israelita manages the athletic programs at Mexico City\'s premier Jewish sports club, hosting competitions across multiple disciplines.' }
]);

// ============================================================
// MANUFACTURING & INDUSTRY (11 entries)
// ============================================================
console.log('=== MANUFACTURING & INDUSTRY ===');

batch('tesla', [
  { id: 'drew-baglino-tesla', name: 'Drew Baglino', role: 'Former SVP of Powertrain & Energy Engineering', bio: 'Drew Baglino served as SVP of Powertrain and Energy Engineering at Tesla, leading the development of the 4680 battery cell and vehicle powertrain systems.' },
  { id: 'vaibhav-taneja-tesla', name: 'Vaibhav Taneja', role: 'CFO', bio: 'Vaibhav Taneja serves as CFO and Chief Accounting Officer of Tesla, managing the finances of the $750+ billion electric vehicle and energy company founded by Elon Musk.' },
  { id: 'tom-zhu-tesla', name: 'Tom Zhu', role: 'SVP of Automotive', bio: 'Tom Zhu serves as Senior Vice President of Automotive at Tesla, overseeing global vehicle production and delivery operations across Gigafactories worldwide.' }
]);

batch('icl-group', [
  { id: 'raviv-zoller-icl', name: 'Raviv Zoller', role: 'President & CEO', bio: 'Raviv Zoller serves as President and CEO of ICL Group, the Israeli specialty minerals company that is one of the world\'s largest producers of potash, bromine, and phosphate fertilizers.' },
  { id: 'aviram-lahav-icl', name: 'Aviram Lahav', role: 'CFO', bio: 'Aviram Lahav serves as CFO of ICL Group, managing the finances of the Israeli minerals giant with operations in the Dead Sea and global specialty chemicals markets.' },
  { id: 'elamparithy-selvarajan-icl', name: 'Johanan Locker', role: 'Chairman', bio: 'Johanan Locker serves as Chairman of ICL Group\'s board of directors, providing governance for the Israeli specialty minerals and chemicals company.' }
]);

batch('barrick-gold-peter-munk', [
  { id: 'mark-bristow-barrick', name: 'Mark Bristow', role: 'President & CEO', bio: 'Mark Bristow serves as President and CEO of Barrick Gold, the world\'s second-largest gold mining company founded by the late Jewish-Canadian businessman Peter Munk.' },
  { id: 'peter-munk-barrick', name: 'Peter Munk', role: 'Founder (1927-2018)', bio: 'Peter Munk (1927-2018) was the Jewish-Hungarian-Canadian founder of Barrick Gold, building it into the world\'s largest gold mining company. A Holocaust survivor, he became one of Canada\'s greatest philanthropists.' },
  { id: 'kevin-thomson-barrick', name: 'Kevin Thomson', role: 'SVP & General Counsel', bio: 'Kevin Thomson serves as SVP, General Counsel and Corporate Secretary at Barrick Gold, the mining giant founded by the late Peter Munk.' }
]);

batch('de-beers-oppenheimer-family-legacy', [
  { id: 'nicky-oppenheimer-debeers', name: 'Nicky Oppenheimer', role: 'Former Chairman', bio: 'Nicky Oppenheimer served as Chairman of De Beers, the third generation of the Jewish-South African Oppenheimer family to lead the diamond empire founded by Cecil Rhodes and later controlled by Ernest Oppenheimer.' },
  { id: 'jonathan-oppenheimer-debeers', name: 'Jonathan Oppenheimer', role: 'Family Heir', bio: 'Jonathan Oppenheimer is the heir to the Oppenheimer family fortune, the Jewish-South African dynasty that controlled De Beers diamonds and Anglo American for nearly a century.' },
  { id: 'al-cook-debeers', name: 'Al Cook', role: 'CEO of De Beers Group', bio: 'Al Cook serves as CEO of De Beers Group, leading the diamond mining and marketing company that was controlled by the Jewish Oppenheimer family for the better part of the 20th century.' }
]);

batch('anglo-american-oppenheimer-legacy', [
  { id: 'ernest-oppenheimer-anglo', name: 'Ernest Oppenheimer', role: 'Founder (1880-1957)', bio: 'Sir Ernest Oppenheimer (1880-1957), a German-born Jewish businessman, founded Anglo American and took control of De Beers, creating one of the world\'s great mining empires in South Africa.' },
  { id: 'harry-oppenheimer-anglo', name: 'Harry Oppenheimer', role: 'Former Chairman (1908-2000)', bio: 'Harry Oppenheimer (1908-2000) succeeded his father Ernest as chairman of Anglo American and De Beers, becoming one of the most powerful businessmen in South African history.' },
  { id: 'duncan-wanblad-anglo', name: 'Duncan Wanblad', role: 'CEO', bio: 'Duncan Wanblad serves as CEO of Anglo American, the mining giant originally founded by the Oppenheimer Jewish family that has been the subject of a $49 billion takeover bid by BHP.' }
]);

batch('antwerp-diamond-centre', [
  { id: 'ari-epstein-adc', name: 'Ari Epstein', role: 'CEO of AWDC', bio: 'Ari Epstein serves as CEO of the Antwerp World Diamond Centre (AWDC), the organization representing the diamond industry in Antwerp where 80% of the world\'s rough diamonds are traded.' },
  { id: 'nishit-parikh-adc', name: 'Nishit Parikh', role: 'President of AWDC', bio: 'Nishit Parikh serves as President of the Antwerp World Diamond Centre, representing the diamond trade that has been dominated by Jewish merchants since the 15th century.' },
  { id: 'rafael-levi-adc', name: 'Rafael Levi', role: 'Board Member', bio: 'Board leadership at the Antwerp Diamond Centre governs the world\'s largest diamond trading hub, where Jewish families have been central to the industry for over five centuries.' }
]);

batch('antwerp-diamond-bourse', [
  { id: 'michel-cohen-antwerpdb', name: 'Michel Cohen', role: 'President', bio: 'Michel Cohen served as President of the Antwerp Diamond Bourse, one of the world\'s oldest and largest diamond exchanges where Jewish traders have dominated the industry since the 1500s.' },
  { id: 'peter-meeus-antwerpdb', name: 'Peter Meeus', role: 'Honorary President of Antwerp Diamond Bourse', bio: 'Peter Meeus serves as Honorary President of the Antwerp Diamond Bourse, having led the organization that oversees billions of dollars in diamond trading annually.' },
  { id: 'rudi-nys-antwerpdb', name: 'Rudi Nys', role: 'Director of Diamond Office', bio: 'Senior leadership at the Diamond Office supports the Antwerp Diamond Bourse, the city where the Jewish community has controlled diamond trading for centuries.' }
]);

// ============================================================
// REAL ESTATE & PROPERTY (11 entries)
// ============================================================
console.log('=== REAL ESTATE & PROPERTY ===');

batch('brookfield-properties', [
  { id: 'ben-brown-brookfield', name: 'Ben Brown', role: 'CEO', bio: 'Ben Brown serves as CEO of Brookfield Properties, the real estate arm of Brookfield Asset Management managing $268+ billion in assets across office, retail, multifamily, and logistics.' },
  { id: 'brian-kingston-brookfield', name: 'Brian Kingston', role: 'CEO of Brookfield Real Estate', bio: 'Brian Kingston serves as CEO of Brookfield\'s Real Estate Group, overseeing one of the world\'s largest real estate portfolios with properties on five continents.' },
  { id: 'mitch-rudin-brookfield', name: 'Mitch Rudin', role: 'President of Brookfield Real Estate', bio: 'Mitch Rudin served as Chairman and CEO of Brookfield Property Partners, overseeing the publicly traded real estate vehicle within the Brookfield empire.' }
]);

batch('vornado-realty-trust', [
  { id: 'steven-roth-vornado', name: 'Steven Roth', role: 'Chairman & CEO', bio: 'Steven Roth is Chairman and CEO of Vornado Realty Trust, one of the largest REITs in America with premier office and retail properties in New York and Washington DC. An influential Jewish-American real estate mogul.' },
  { id: 'michael-franco-vornado', name: 'Michael Franco', role: 'President & CFO', bio: 'Michael Franco serves as President and CFO of Vornado Realty Trust, managing the finances of the $5+ billion REIT focused on premier office properties.' },
  { id: 'glen-weiss-vornado', name: 'Glen Weiss', role: 'Co-Head of Real Estate', bio: 'Glen Weiss serves as Co-Head of Real Estate at Vornado, managing the leasing operations of the REIT\'s premier Manhattan office portfolio including the PENN District.' }
]);

batch('simon-property-group', [
  { id: 'david-simon-spg', name: 'David Simon', role: 'Chairman & CEO', bio: 'David Simon serves as Chairman, President and CEO of Simon Property Group, the largest REIT in the world and the Jewish-American family\'s mall empire with 200+ properties.' },
  { id: 'brian-mcdade-spg', name: 'Brian McDade', role: 'CFO', bio: 'Brian McDade serves as CFO of Simon Property Group, managing the finances of the world\'s largest retail REIT with a $50+ billion market cap.' },
  { id: 'adam-reuben-spg', name: 'Adam Reuben', role: 'SVP of Leasing', bio: 'Senior leasing leadership at Simon Property Group manages tenant relationships across the largest portfolio of premium shopping centers and outlet malls in the world.' }
]);

batch('sl-green-realty', [
  { id: 'marc-holliday-slgreen', name: 'Marc Holliday', role: 'Chairman & CEO', bio: 'Marc Holliday serves as Chairman and CEO of SL Green Realty, Manhattan\'s largest office landlord with nearly 30 million square feet of commercial space in New York City.' },
  { id: 'andrew-mathias-slgreen', name: 'Andrew Mathias', role: 'President', bio: 'Andrew Mathias serves as President of SL Green Realty, co-leading Manhattan\'s largest commercial landlord and the developer of One Vanderbilt, the city\'s tallest office tower.' },
  { id: 'matt-diliberto-slgreen', name: 'Matt DiLiberto', role: 'CFO', bio: 'Matt DiLiberto serves as CFO of SL Green Realty, managing the finances of Manhattan\'s largest office landlord during the post-pandemic office market transformation.' }
]);

batch('gazit-globe', [
  { id: 'chaim-katzman-gazit', name: 'Chaim Katzman', role: 'Founder & Chairman', bio: 'Chaim Katzman is the Founder and Chairman of Gazit-Globe, the Israeli real estate company with a global portfolio valued at $3.5+ billion across retail and mixed-use properties in North America, Europe, and Israel.' },
  { id: 'adi-jemini-gazit', name: 'Adi Jemini', role: 'CEO', bio: 'Senior leadership at Gazit-Globe manages the day-to-day operations of the Israeli real estate investment company with properties across North America and Europe.' },
  { id: 'shay-avshalomov-gazit', name: 'Shay Avshalomov', role: 'CFO', bio: 'Financial leadership at Gazit-Globe oversees the Israeli real estate company\'s global portfolio of supermarket-anchored shopping centers and mixed-use developments.' }
]);

batch('reichmann-family-olympia-york', [
  { id: 'paul-reichmann-oly', name: 'Paul Reichmann', role: 'Co-founder (1930-2013)', bio: 'Paul Reichmann (1930-2013) was the mastermind behind Olympia & York, once the world\'s largest property developer. Born to an Orthodox Jewish family in Vienna, he built Canary Wharf in London and the World Financial Center in New York.' },
  { id: 'albert-reichmann-oly', name: 'Albert Reichmann', role: 'Co-founder', bio: 'Albert Reichmann co-founded Olympia & York with his brothers Paul and Ralph, building the Orthodox Jewish Canadian family\'s real estate empire that included Canary Wharf and the World Financial Center.' },
  { id: 'ralph-reichmann-oly', name: 'Ralph Reichmann', role: 'Co-founder', bio: 'Ralph Reichmann co-founded Olympia & York, the Jewish-Canadian family\'s real estate company that at its peak was the world\'s largest private property developer.' }
]);

batch('westfield-corporation-scentre-unibail', [
  { id: 'frank-lowy-westfield', name: 'Frank Lowy', role: 'Co-founder', bio: 'Sir Frank Lowy, born to a Jewish family in Czechoslovakia and a Holocaust survivor, co-founded Westfield Corporation which became the world\'s largest shopping center company before merging with Unibail-Rodamco for $32 billion.' },
  { id: 'peter-lowy-westfield', name: 'Peter Lowy', role: 'Co-CEO', bio: 'Peter Lowy served as Co-CEO of Westfield Corporation alongside his brother Steven, continuing the Jewish-Australian Lowy family\'s leadership of the global mall empire.' },
  { id: 'steven-lowy-westfield', name: 'Steven Lowy', role: 'Co-CEO', bio: 'Steven Lowy served as Co-CEO of Westfield Corporation, helping lead the Lowy family\'s shopping center empire through its $32 billion merger with Unibail-Rodamco.' }
]);

// ============================================================
// DEFENSE & SECURITY (9 entries)
// ============================================================
console.log('=== DEFENSE & SECURITY ===');

batch('elbit-systems', [
  { id: 'bezhalel-machlis-elbit', name: 'Bezhalel Machlis', role: 'President & CEO', bio: 'Bezhalel Machlis serves as President and CEO of Elbit Systems, Israel\'s largest defense electronics company with $6+ billion in annual revenue and operations in intelligence, UAVs, and combat systems.' },
  { id: 'ran-kril-elbit', name: 'Ran Kril', role: 'EVP & General Manager of Intelligence Division', bio: 'Ran Kril serves as EVP at Elbit Systems, overseeing the Israeli defense company\'s intelligence systems division that develops advanced C4ISR and cyber capabilities.' },
  { id: 'kobi-bramli-elbit', name: 'Kobi Bramli', role: 'CFO', bio: 'Kobi Bramli serves as CFO of Elbit Systems, managing the finances of Israel\'s largest defense electronics company listed on both TASE and NASDAQ.' }
]);

batch('rafael-advanced-defense-systems', [
  { id: 'yoav-har-even-rafael', name: 'Yoav Har-Even', role: 'President & CEO', bio: 'Yoav Har-Even serves as President and CEO of Rafael Advanced Defense Systems, the Israeli state-owned company that develops Iron Dome, David\'s Sling, and Trophy active protection systems.' },
  { id: 'gideon-weiss-rafael', name: 'Gideon Weiss', role: 'EVP of R&D', bio: 'Senior R&D leadership at Rafael Advanced Defense Systems develops Israel\'s most advanced defense technologies including Iron Dome and air defense missile systems.' },
  { id: 'ran-gozali-rafael', name: 'Ran Gozali', role: 'EVP of Land & Naval Division', bio: 'Ran Gozali serves as EVP at Rafael, overseeing the Israeli defense company\'s land and naval division including the Trophy active protection system used on Merkava tanks.' }
]);

batch('nso-group', [
  { id: 'shalev-hulio-nso', name: 'Shalev Hulio', role: 'Co-founder & Former CEO', bio: 'Shalev Hulio co-founded NSO Group, the Israeli cyber intelligence company behind the Pegasus spyware used by governments worldwide for surveillance. The company has been subject to international controversy.' },
  { id: 'omri-lavie-nso', name: 'Omri Lavie', role: 'Co-founder', bio: 'Omri Lavie co-founded NSO Group, the Israeli cyber intelligence firm whose Pegasus spyware has been used by dozens of governments to surveil journalists, activists, and politicians.' },
  { id: 'yaron-shohat-nso', name: 'Yaron Shohat', role: 'CEO', bio: 'Yaron Shohat served as CEO of NSO Group, managing the controversial Israeli cyber intelligence company during international scrutiny of its Pegasus spyware product.' }
]);

batch('verint-systems', [
  { id: 'dan-bodner-verint', name: 'Dan Bodner', role: 'Chairman & CEO', bio: 'Dan Bodner serves as Chairman and CEO of Verint Systems, the Israeli-founded customer engagement and cyber intelligence company with operations in 180 countries.' },
  { id: 'grant-highlander-verint', name: 'Grant Highlander', role: 'CFO', bio: 'Grant Highlander serves as CFO of Verint Systems, managing the finances of the Israeli-American enterprise cyber intelligence and customer engagement company.' },
  { id: 'elan-moriah-verint', name: 'Elan Moriah', role: 'President of Verint Open Platform', bio: 'Elan Moriah serves as President of the Verint Open Platform, leading product development for the Israeli-founded company\'s AI-powered customer engagement solutions.' }
]);

batch('talpiot-program', [
  { id: 'nahman-ash-talpiot', name: 'Nahman Ash', role: 'Former Commander', bio: 'Major General Nahman Ash served as a Talpiot program alumnus and later headed the IDF Technological and Logistics Directorate. The elite program produces Israel\'s top military technologists.' },
  { id: 'amir-naiberg-talpiot', name: 'Amir Naiberg', role: 'Talpiot Alumnus & Tech Leader', bio: 'Amir Naiberg is a Talpiot program graduate who went on to lead various technology initiatives. Talpiot is the IDF\'s elite technology training program selecting 50 recruits annually.' },
  { id: 'marius-nacht-talpiot', name: 'Marius Nacht', role: 'Talpiot Alumnus & Check Point Co-founder', bio: 'Marius Nacht, a Talpiot program alumnus, co-founded Check Point Software Technologies, one of the world\'s largest cybersecurity companies. Talpiot graduates are disproportionately represented in Israeli tech leadership.' }
]);

batch('israel-national-cyber-directorate', [
  { id: 'gaby-portnoy-incd', name: 'Gaby Portnoy', role: 'Director General', bio: 'Gaby Portnoy serves as Director General of the Israel National Cyber Directorate, leading Israel\'s national cybersecurity authority and "Cyber Dome" defense initiative.' },
  { id: 'yigal-unna-incd', name: 'Yigal Unna', role: 'Former Director General', bio: 'Yigal Unna served as Director General of the Israel National Cyber Directorate, leading the country\'s cyber defense strategy as Israel emerged as a global cybersecurity powerhouse.' },
  { id: 'eviatar-matania-incd', name: 'Eviatar Matania', role: 'Founding Head', bio: 'Professor Eviatar Matania was the founding head of the Israel National Cyber Bureau (precursor to INCD), establishing the organizational framework for Israel\'s national cyber defense.' }
]);

// ============================================================
// RETAIL & E-COMMERCE (9 entries)
// ============================================================
console.log('=== RETAIL & E-COMMERCE ===');

batch('macy-s-federated-department-stores', [
  { id: 'tony-spring-macys', name: 'Tony Spring', role: 'Chairman & CEO', bio: 'Tony Spring serves as Chairman and CEO of Macy\'s Inc., leading the iconic American department store chain with 700+ stores including Macy\'s, Bloomingdale\'s, and Bluemercury.' },
  { id: 'adrian-mitchell-macys', name: 'Adrian Mitchell', role: 'CFO', bio: 'Adrian Mitchell serves as CFO of Macy\'s Inc., managing the finances of the $24+ billion retail company through its transformation strategy.' },
  { id: 'isidor-straus-macys', name: 'Isidor Straus', role: 'Former Co-owner (1845-1912)', bio: 'Isidor Straus (1845-1912), born to a Jewish family in Germany, co-owned Macy\'s department store with his brother Nathan. He and his wife Ida famously perished together on the Titanic, refusing to be separated.' }
]);

batch('home-depot', [
  { id: 'ted-decker-homedepot', name: 'Ted Decker', role: 'Chairman, President & CEO', bio: 'Ted Decker serves as Chairman, President and CEO of The Home Depot, the world\'s largest home improvement retailer with $150+ billion in annual revenue and 2,300+ stores.' },
  { id: 'bernie-marcus-homedepot', name: 'Bernie Marcus', role: 'Co-founder', bio: 'Bernie Marcus, a Jewish-American billionaire, co-founded The Home Depot with Arthur Blank, building it into the world\'s largest home improvement retailer. He is a major philanthropist and Republican donor.' },
  { id: 'arthur-blank-homedepot', name: 'Arthur Blank', role: 'Co-founder', bio: 'Arthur Blank, a Jewish-American billionaire, co-founded The Home Depot. He also owns the Atlanta Falcons NFL team and Atlanta United FC. He and Marcus were both fired from Handy Dan before founding Home Depot.' }
]);

batch('gap-inc', [
  { id: 'richard-dickson-gap', name: 'Richard Dickson', role: 'President & CEO', bio: 'Richard Dickson serves as President and CEO of Gap Inc., leading the portfolio of Gap, Old Navy, Banana Republic, and Athleta brands with $15+ billion in annual revenue.' },
  { id: 'doris-fisher-gap', name: 'Doris Fisher', role: 'Co-founder', bio: 'Doris Fisher co-founded Gap Inc. with her husband Don Fisher in 1969, building a single store into a global retail empire. The Jewish-American Fisher family remains the largest shareholder.' },
  { id: 'katrina-oleary-gap', name: 'Katrina O\'Connell', role: 'CFO', bio: 'Financial leadership at Gap Inc. manages the finances of the iconic American apparel retailer founded by the Jewish-American Fisher family in San Francisco.' }
]);

batch('costco-wholesale', [
  { id: 'ron-vachris-costco', name: 'Ron Vachris', role: 'President & CEO', bio: 'Ron Vachris serves as President and CEO of Costco, the world\'s third-largest retailer with $240+ billion in annual revenue and 875+ warehouse locations globally.' },
  { id: 'jim-sinegal-costco', name: 'Jim Sinegal', role: 'Co-founder & Former CEO', bio: 'Jim Sinegal co-founded Costco with Jeffrey Brotman and served as CEO until 2012, building it into the world\'s largest membership warehouse club with a legendary corporate culture.' },
  { id: 'jeffrey-brotman-costco', name: 'Jeffrey Brotman', role: 'Co-founder (1942-2017)', bio: 'Jeffrey Brotman (1942-2017), a Jewish-American businessman from a family of retailers, co-founded Costco Wholesale in 1983, building it into the third-largest retailer in the world.' }
]);

batch('sephora', [
  { id: 'guillaume-motte-sephora', name: 'Guillaume Motte', role: 'President & CEO', bio: 'Guillaume Motte serves as President and CEO of Sephora, the LVMH-owned beauty retailer with 3,000+ stores in 35 countries and a dominant e-commerce presence.' },
  { id: 'martin-brok-sephora', name: 'Martin Brok', role: 'Former CEO', bio: 'Martin Brok served as CEO of Sephora, leading the LVMH-owned beauty retailer\'s global expansion to become the world\'s leading specialty beauty retailer.' },
  { id: 'artemis-patrick-sephora', name: 'Artemis Patrick', role: 'Global Chief Commercial Officer', bio: 'Artemis Patrick serves as Global Chief Commercial Officer at Sephora, overseeing merchandising and brand partnerships for the beauty retail giant.' }
]);

batch('arcadia-group-topshop-philip-green', [
  { id: 'philip-green-arcadia', name: 'Sir Philip Green', role: 'Former Owner', bio: 'Sir Philip Green, a Jewish-British billionaire, owned the Arcadia Group (Topshop, Dorothy Perkins, Burton) before its collapse in 2020. He was known for his lavish lifestyle and controversial business practices.' },
  { id: 'tina-green-arcadia', name: 'Lady Tina Green', role: 'Owner on Record', bio: 'Lady Tina Green, wife of Sir Philip Green, was the legal owner of Arcadia Group through a family trust in Monaco, at times receiving the largest dividend in UK corporate history.' },
  { id: 'ian-grabiner-arcadia', name: 'Ian Grabiner', role: 'Former CEO', bio: 'Ian Grabiner served as CEO of the Arcadia Group under Philip Green\'s ownership, managing the British retail empire of Topshop, Dorothy Perkins, and other brands before its collapse.' }
]);

batch('zalando', [
  { id: 'robert-gentz-zalando', name: 'Robert Gentz', role: 'Co-founder & Co-CEO', bio: 'Robert Gentz is Co-founder and Co-CEO of Zalando, Europe\'s largest online fashion retailer with 50+ million active customers and €10+ billion in annual revenue.' },
  { id: 'david-schneider-zalando', name: 'David Schneider', role: 'Co-founder & Co-CEO', bio: 'David Schneider is Co-founder and Co-CEO of Zalando, the German e-commerce giant that has become the dominant online fashion platform in Europe.' },
  { id: 'sandra-dembeck-zalando', name: 'Sandra Dembeck', role: 'CFO', bio: 'Sandra Dembeck serves as CFO of Zalando, managing the finances of Europe\'s largest online fashion retailer headquartered in Berlin.' }
]);

// ============================================================
// FOOD & BEVERAGE (9 entries)
// ============================================================
console.log('=== FOOD & BEVERAGE ===');

batch('strauss-group', [
  { id: 'giora-bardea-strauss', name: 'Giora Bardea', role: 'CEO', bio: 'Giora Bardea serves as CEO of Strauss Group, one of Israel\'s largest food and beverage companies producing coffee, dairy, snacks, and water under brands like Elite, Sabra, and Strauss.' },
  { id: 'ofra-strauss-group', name: 'Ofra Strauss', role: 'Chair', bio: 'Ofra Strauss serves as Chair of Strauss Group, the third generation of the Strauss family to lead the Israeli food giant. She transformed the company through global partnerships including with PepsiCo.' },
  { id: 'tali-reznick-strauss', name: 'Tali Reznick', role: 'CFO', bio: 'Financial leadership at Strauss Group manages the Israeli food company that has grown from a small dairy operation to a $2+ billion multinational food and beverage corporation.' }
]);

batch('tnuva', [
  { id: 'eyal-malis-tnuva', name: 'Eyal Malis', role: 'CEO', bio: 'Eyal Malis serves as CEO of Tnuva, Israel\'s largest food manufacturer and dairy company controlling 70% of the Israeli dairy market, owned by China\'s Bright Food Group.' },
  { id: 'arik-shor-tnuva', name: 'Arik Shor', role: 'CFO', bio: 'Financial leadership at Tnuva oversees the finances of Israel\'s dominant dairy company that produces milk, cheese, and other food products for the domestic market.' },
  { id: 'hamutal-gouri-tnuva', name: 'Hamutal Gouri', role: 'VP of Marketing', bio: 'Marketing leadership at Tnuva manages the brand strategy for Israel\'s most iconic food brand, whose products are a staple in nearly every Israeli household.' }
]);

batch('osem-nestl', [
  { id: 'itzik-saig-osem', name: 'Itzik Saig', role: 'CEO', bio: 'Itzik Saig serves as CEO of Osem-Nestlé, the Nestlé subsidiary that is one of Israel\'s largest food manufacturers producing Bamba, Bissli, and other iconic Israeli snacks.' },
  { id: 'dan-propper-osem', name: 'Dan Propper', role: 'Former CEO', bio: 'Dan Propper served as President and CEO of Osem for decades, building the Israeli food company from a local manufacturer into a Nestlé subsidiary and one of the country\'s most recognized brands.' },
  { id: 'dani-shmuel-osem', name: 'Dani Samuel', role: 'CFO', bio: 'Financial leadership at Osem-Nestlé manages the finances of the Israeli food giant whose Bamba peanut snack became globally famous after peanut allergy research proved its benefits.' }
]);

batch('netafim', [
  { id: 'gaby-miodownik-netafim', name: 'Gaby Miodownik', role: 'CEO', bio: 'Gaby Miodownik serves as CEO of Netafim, the Israeli company that invented drip irrigation and now provides precision agriculture solutions in 110+ countries worldwide.' },
  { id: 'simcha-blass-netafim', name: 'Simcha Blass', role: 'Inventor & Co-founder (1897-1982)', bio: 'Simcha Blass (1897-1982) was the Jewish-Polish-Israeli water engineer who invented modern drip irrigation and co-founded Netafim, transforming agriculture in water-scarce regions globally.' },
  { id: 'naty-barak-netafim', name: 'Naty Barak', role: 'Chief Sustainability Officer', bio: 'Naty Barak serves as Chief Sustainability Officer at Netafim, advancing the Israeli drip irrigation company\'s mission to provide food security through water-efficient agriculture.' }
]);

batch('sabra-hummus', [
  { id: 'shali-shalit-shelach-sabra', name: 'Shali Shalit Shelach', role: 'CEO', bio: 'Shali Shalit Shelach served as CEO of Sabra Dipping Company, the leading hummus brand in North America and a joint venture between PepsiCo and Strauss Group.' },
  { id: 'merav-gilboa-sabra', name: 'Merav Gilboa', role: 'VP of Marketing', bio: 'Marketing leadership at Sabra Hummus drives brand strategy for the #1 hummus brand in the United States, the PepsiCo/Strauss Group joint venture.' },
  { id: 'joey-faust-sabra', name: 'Joey Faust', role: 'VP of Operations', bio: 'Operations leadership at Sabra Dipping Company manages the manufacturing of America\'s top-selling hummus brand at its facilities in Virginia.' }
]);

batch('haagen-dazs', [
  { id: 'reuben-mattus-hd', name: 'Reuben Mattus', role: 'Founder (1912-1994)', bio: 'Reuben Mattus (1912-1994), a Jewish-Polish-American entrepreneur, founded Häagen-Dazs in 1961, creating the premium ice cream brand with a faux-Scandinavian name. He grew up making ice cream in the Bronx.' },
  { id: 'rose-mattus-hd', name: 'Rose Mattus', role: 'Co-founder (1916-2006)', bio: 'Rose Mattus (1916-2006) co-founded Häagen-Dazs with her husband Reuben, handling the business side of the premium ice cream brand started in their Bronx kitchen.' },
  { id: 'doris-mattus-hd', name: 'Doris Mattus Hurley', role: 'Daughter & Former VP', bio: 'Doris Mattus Hurley, daughter of founders Reuben and Rose Mattus, served in leadership at Häagen-Dazs and helped expand the Jewish-founded premium ice cream brand.' }
]);

batch('nandos', [
  { id: 'robbie-enthoven-nandos', name: 'Robbie Enthoven', role: 'Co-founder & Chairman', bio: 'Robbie Enthoven, a Jewish-South African businessman, co-founded Nando\'s in 1987, building the peri-peri chicken chain into a global brand with 1,200+ restaurants in 30 countries.' },
  { id: 'fernando-duarte-nandos', name: 'Fernando Duarte', role: 'Co-founder', bio: 'Fernando Duarte co-founded Nando\'s with Robbie Enthoven in Johannesburg, creating the Portuguese-Mozambican peri-peri chicken restaurant chain that has become a global phenomenon.' },
  { id: 'brett-sobel-nandos', name: 'Brett Sobel', role: 'Former CEO of Nando\'s International', bio: 'Brett Sobel served as CEO of Nando\'s International, expanding the South African-founded peri-peri restaurant chain\'s global footprint beyond its African and European strongholds.' }
]);

batch('nestl', [
  { id: 'mark-schneider-nestle', name: 'Mark Schneider', role: 'CEO', bio: 'Mark Schneider serves as CEO of Nestlé, the world\'s largest food and beverage company with CHF 90+ billion in annual revenue and 2,000+ brands including Nespresso, Kit Kat, and Purina.' },
  { id: 'paul-bulcke-nestle', name: 'Paul Bulcke', role: 'Chairman', bio: 'Paul Bulcke serves as Chairman of Nestlé, the Swiss food giant that is the world\'s largest food company with operations in 188 countries.' },
  { id: 'francois-xavier-roger-nestle', name: 'François-Xavier Roger', role: 'CFO', bio: 'François-Xavier Roger serves as CFO of Nestlé, managing the finances of the world\'s largest food and beverage company with a market cap exceeding $250 billion.' }
]);

// ============================================================
// CONGLOMERATES & HOLDING COMPANIES (9 entries)
// ============================================================
console.log('=== CONGLOMERATES & HOLDING COMPANIES ===');

batch('kraft-group', [
  { id: 'robert-kraft-kgroup', name: 'Robert Kraft', role: 'Chairman & CEO', bio: 'Robert Kraft, a Jewish-American billionaire, is Chairman and CEO of The Kraft Group, which owns the New England Patriots, New England Revolution, and Gillette Stadium. He is one of the most prominent Jewish sports owners in America.' },
  { id: 'jonathan-kraft-kgroup', name: 'Jonathan Kraft', role: 'President of Kraft Group', bio: 'Jonathan Kraft serves as President of The Kraft Group, overseeing the family conglomerate\'s interests in sports, paper, and packaging alongside his father Robert Kraft.' },
  { id: 'daniel-kraft-kgroup', name: 'Daniel Kraft', role: 'President of International Kraft Group', bio: 'Daniel Kraft serves as President of International Kraft Group, managing the Kraft family\'s global business interests outside the United States.' }
]);

batch('icahn-enterprises', [
  { id: 'carl-icahn-enterprises', name: 'Carl Icahn', role: 'Chairman', bio: 'Carl Icahn, a Jewish-American billionaire, is the Chairman of Icahn Enterprises, the diversified conglomerate controlling companies in energy, automotive, food packaging, and real estate. He is one of Wall Street\'s most legendary activist investors.' },
  { id: 'david-willetts-icahn', name: 'David Willetts', role: 'President & CEO', bio: 'David Willetts serves as President and CEO of Icahn Enterprises, managing the publicly traded conglomerate controlled by billionaire activist investor Carl Icahn.' },
  { id: 'ted-papapostolou-icahn', name: 'Ted Papapostolou', role: 'CFO', bio: 'Ted Papapostolou serves as CFO of Icahn Enterprises, managing the finances of Carl Icahn\'s diversified conglomerate and publicly traded holding company.' }
]);

batch('delek-group', [
  { id: 'idan-wallace-delek', name: 'Idan Wallace', role: 'CEO', bio: 'Idan Wallace served as CEO of Delek Group, the Israeli conglomerate controlled by Yitzhak Tshuva with interests in energy, infrastructure, and real estate.' },
  { id: 'yitzhak-tshuva-delek', name: 'Yitzhak Tshuva', role: 'Chairman & Controlling Shareholder', bio: 'Yitzhak Tshuva is the controlling shareholder of Delek Group, one of Israel\'s wealthiest businessmen with a fortune built from real estate and the Tamar and Leviathan gas fields.' },
  { id: 'barak-mashraki-delek', name: 'Barak Mashraki', role: 'CFO', bio: 'Financial leadership at Delek Group manages the Israeli conglomerate\'s diverse interests in energy (Tamar, Leviathan gas fields), infrastructure, and insurance.' }
]);

batch('idb-holdings', [
  { id: 'nochi-dankner-idb', name: 'Nochi Dankner', role: 'Former Chairman', bio: 'Nochi Dankner served as Chairman of IDB Holdings, the Israeli conglomerate that controlled major companies across telecom, insurance, and super markets before its dramatic collapse and his conviction for market manipulation.' },
  { id: 'eduardo-elsztain-idb', name: 'Eduardo Elsztain', role: 'Controlling Shareholder (via Dolphin)', bio: 'Eduardo Elsztain, an Argentine Jewish businessman, acquired control of IDB Holdings through Dolphin IL, restructuring the Israeli conglomerate after its near-collapse.' },
  { id: 'yoav-doppelt-idb', name: 'Yoav Doppelt', role: 'CEO', bio: 'Senior leadership at IDB Holdings manages the Israeli conglomerate that went through a dramatic restructuring following Nochi Dankner\'s tenure.' }
]);

batch('sheldon-adelson-empire', [
  { id: 'sheldon-adelson-empire-founder', name: 'Sheldon Adelson', role: 'Founder (1933-2021)', bio: 'Sheldon Adelson (1933-2021), born to a Jewish Lithuanian immigrant family, built the Las Vegas Sands casino empire and was the largest Republican donor in US history. His fortune peaked above $35 billion.' },
  { id: 'miriam-adelson-empire', name: 'Miriam Adelson', role: 'Chair of Las Vegas Sands', bio: 'Dr. Miriam Adelson, an Israeli-American physician, chairs Las Vegas Sands and controls the Adelson family fortune. She is one of the world\'s wealthiest women and a major Israel supporter.' },
  { id: 'rob-goldstein-lvs', name: 'Robert Goldstein', role: 'Former CEO of Las Vegas Sands', bio: 'Robert Goldstein served as Chairman and CEO of Las Vegas Sands following Sheldon Adelson\'s death, managing the $40+ billion casino resort company\'s operations in Macau and Singapore.' }
]);

batch('grupo-werthein', [
  { id: 'leo-werthein-grupo', name: 'Leopoldo "Leo" Werthein', role: 'Patriarch', bio: 'The Werthein family, Argentine Jewish business dynasty, controls Grupo Werthein with interests in telecom (Telecom Argentina), banking, agribusiness, and real estate.' },
  { id: 'dario-werthein-grupo', name: 'Darío Werthein', role: 'Business Leader', bio: 'Darío Werthein represents the newer generation of the Argentine Jewish Werthein business dynasty controlling one of the country\'s largest private conglomerates.' },
  { id: 'adrian-werthein-grupo', name: 'Adrián Werthein', role: 'President of DAIA (formerly)', bio: 'Adrián Werthein served as President of DAIA (Delegación de Asociaciones Israelitas Argentinas), the Jewish community\'s umbrella organization, while also being a leader in Grupo Werthein.' }
]);

batch('renova-group-viktor-vekselberg', [
  { id: 'viktor-vekselberg-renova', name: 'Viktor Vekselberg', role: 'Chairman', bio: 'Viktor Vekselberg, born to a Jewish-Ukrainian family, is Chairman of Renova Group, the Russian conglomerate with interests in metals, energy, telecom, and technology. He is subject to US sanctions.' },
  { id: 'andrew-intrater-renova', name: 'Andrew Intrater', role: 'CEO of Columbus Nova', bio: 'Andrew Intrater serves as CEO of Columbus Nova, the US-based investment affiliate of Vekselberg\'s Renova Group, managing the conglomerate\'s American investments.' },
  { id: 'evgeny-olkhovik-renova', name: 'Evgeny Olkhovik', role: 'President of Renova', bio: 'Evgeny Olkhovik served as President of Renova Group, managing the day-to-day operations of Viktor Vekselberg\'s diversified Russian conglomerate.' }
]);

batch('reliance-industries', [
  { id: 'mukesh-ambani-reliance', name: 'Mukesh Ambani', role: 'Chairman & Managing Director', bio: 'Mukesh Ambani is Chairman and Managing Director of Reliance Industries, India\'s most valuable company with a $200+ billion market cap spanning energy, telecom (Jio), and retail.' },
  { id: 'isha-ambani-reliance', name: 'Isha Ambani', role: 'Executive Director of Reliance Retail', bio: 'Isha Ambani serves as Executive Director of Reliance Retail Ventures, managing India\'s largest retail chain with 18,000+ stores as part of the Ambani family business empire.' },
  { id: 'akash-ambani-reliance', name: 'Akash Ambani', role: 'Chairman of Reliance Jio', bio: 'Akash Ambani serves as Chairman of Reliance Jio Infocomm, India\'s largest mobile network operator with 450+ million subscribers, part of the family conglomerate.' }
]);

batch('grupo-carso', [
  { id: 'carlos-slim-carso', name: 'Carlos Slim Helú', role: 'Founder & Honorary Chairman', bio: 'Carlos Slim Helú, of Lebanese Jewish descent through his mother\'s side (the Haddad family), is the Founder of Grupo Carso and one of the world\'s richest people, controlling vast telecom, retail, and industrial interests in Mexico and Latin America.' },
  { id: 'carlos-slim-domit-carso', name: 'Carlos Slim Domit', role: 'Chairman of Grupo Carso', bio: 'Carlos Slim Domit serves as Chairman of Grupo Carso, continuing his father Carlos Slim Helú\'s leadership of the Mexican conglomerate spanning construction, mining, and retail.' },
  { id: 'patrick-slim-domit-carso', name: 'Patrick Slim Domit', role: 'Chairman of América Móvil', bio: 'Patrick Slim Domit serves as Co-Chairman of América Móvil, the Slim family\'s telecom giant that is the largest mobile provider in Latin America with 400+ million subscribers.' }
]);

// ============================================================
// GOVERNMENT & DIPLOMACY (9 entries)
// ============================================================
console.log('=== GOVERNMENT & DIPLOMACY ===');

batch('jewish-agency-for-israel', [
  { id: 'doron-almog-jafi', name: 'Doron Almog', role: 'Chairman', bio: 'Major General (ret.) Doron Almog serves as Chairman of the Jewish Agency for Israel, the organization that facilitates Jewish immigration (aliyah) and diaspora-Israel relations since 1929.' },
  { id: 'amira-ahronoviz-jafi', name: 'Amira Ahronoviz', role: 'Director General', bio: 'Amira Ahronoviz serves as Director General and CEO of the Jewish Agency for Israel, managing the operational aspects of Jewish immigration, education, and community building worldwide.' },
  { id: 'yaakov-hagoel-jafi', name: 'Yaakov Hagoel', role: 'Acting Chairman of the World Zionist Organization', bio: 'Yaakov Hagoel serves as Acting Chairman of the World Zionist Organization, working closely with the Jewish Agency to advance Zionist ideals and Israel-diaspora relations.' }
]);

batch('prime-minister-s-office', [
  { id: 'yossi-shelley-pmo', name: 'Yossi Shelley', role: 'Director General (Former)', bio: 'Yossi Shelley served as Director General of the Prime Minister\'s Office of Israel, managing the administrative operations of the head of government.' },
  { id: 'ronen-bar-pmo', name: 'Ronen Bar', role: 'Head of Shin Bet', bio: 'Ronen Bar serves as head of the Shin Bet (Israel Security Agency), reporting to the Prime Minister\'s Office and responsible for Israel\'s domestic security and counterterrorism.' },
  { id: 'tzachi-hanegbi-pmo', name: 'Tzachi Hanegbi', role: 'National Security Advisor', bio: 'Tzachi Hanegbi served as National Security Advisor at the Prime Minister\'s Office, coordinating Israel\'s national security policy across intelligence and defense agencies.' }
]);

batch('ministry-of-defense', [
  { id: 'yoav-gallant-mod', name: 'Yoav Gallant', role: 'Former Minister of Defense', bio: 'Yoav Gallant served as Israel\'s Minister of Defense, overseeing the IDF during the 2023-2024 Gaza conflict. A former IDF Major General, he commanded southern forces and the Navy.' },
  { id: 'eyal-zamir-mod', name: 'Eyal Zamir', role: 'Director General', bio: 'Major General (ret.) Eyal Zamir serves as Director General of Israel\'s Ministry of Defense, managing the administrative side of the country\'s $24+ billion defense establishment.' },
  { id: 'amit-ben-ami-mod', name: 'Udi Adam', role: 'Former Director General', bio: 'Senior administrative leadership at Israel\'s Ministry of Defense has historically included retired military officers who bridge between the political leadership and the IDF.' }
]);

batch('israel-supreme-court', [
  { id: 'esther-hayut-isc', name: 'Esther Hayut', role: 'Former Chief Justice', bio: 'Justice Esther Hayut served as Chief Justice of the Supreme Court of Israel (2017-2024), leading the court during the contentious judicial reform crisis of 2023.' },
  { id: 'uzi-vogelman-isc', name: 'Uzi Vogelman', role: 'Justice', bio: 'Justice Uzi Vogelman served as a Justice on the Supreme Court of Israel, participating in landmark decisions on civil rights and government authority.' },
  { id: 'yitzhak-amit-isc', name: 'Yitzhak Amit', role: 'Chief Justice', bio: 'Justice Yitzhak Amit serves as Chief Justice of the Supreme Court of Israel, leading the judiciary that has been at the center of Israeli political debate over judicial reform.' }
]);

// ============================================================
// LAW FIRMS (6 entries)
// ============================================================
console.log('=== LAW FIRMS ===');

batch('sullivan-cromwell', [
  { id: 'joseph-shenker-sc', name: 'Joseph Shenker', role: 'Chairman', bio: 'Joseph Shenker serves as Chairman of Sullivan & Cromwell, one of the oldest and most prestigious law firms in the United States, advising on the largest corporate transactions.' },
  { id: 'scott-miller-sc', name: 'Scott Miller', role: 'Managing Partner', bio: 'Scott Miller serves as Managing Partner of Sullivan & Cromwell, leading the firm known for advising on mega-mergers and the most complex international transactions.' },
  { id: 'sergio-galvis-sc', name: 'Sergio Galvis', role: 'Partner & Head of M&A', bio: 'Sergio Galvis leads the M&A practice at Sullivan & Cromwell, advising on some of the largest corporate mergers and acquisitions in history.' }
]);

batch('proskauer-rose', [
  { id: 'joseph-leccese-proskauer', name: 'Joseph Leccese', role: 'Chairman', bio: 'Joseph Leccese serves as Chairman of Proskauer Rose, the prominent law firm with deep roots in the Jewish community, known for its sports law, private equity, and litigation practices.' },
  { id: 'ron-base-proskauer', name: 'Ronald Bass', role: 'Senior Partner', bio: 'Senior leadership at Proskauer Rose manages one of America\'s most prestigious law firms, long associated with the Jewish legal community and major sports and entertainment clients.' },
  { id: 'charles-adams-proskauer', name: 'Charles Adams', role: 'Partner & Head of Corporate', bio: 'Senior corporate partners at Proskauer Rose lead the firm\'s corporate transactional practice, advising private equity firms and major corporations on complex deals.' }
]);

batch('fried-frank-harris-shriver-jacobson', [
  { id: 'david-greenwald-friedfrank', name: 'David Greenwald', role: 'Chairman', bio: 'David Greenwald serves as Chairman of Fried, Frank, Harris, Shriver & Jacobson, the prominent New York law firm founded in 1971 with strong roots in the Jewish legal community.' },
  { id: 'aviva-preminger-friedfrank', name: 'Aviva Preminger', role: 'Partner & Head of Real Estate', bio: 'Aviva Preminger leads the real estate practice at Fried Frank, one of New York\'s premier law firms for real estate transactions and financing.' },
  { id: 'brian-mangino-friedfrank', name: 'Brian Mangino', role: 'Partner', bio: 'Partnership at Fried, Frank, Harris, Shriver & Jacobson includes leading practitioners in M&A, litigation, and government regulatory matters.' }
]);

batch('schulte-roth-zabel', [
  { id: 'alan-waldenberg-srz', name: 'Alan Waldenberg', role: 'Managing Partner', bio: 'Alan Waldenberg serves as Managing Partner of Schulte Roth & Zabel, the New York law firm that is the leading outside counsel to the hedge fund and private equity industry.' },
  { id: 'david-efron-srz', name: 'David Efron', role: 'Partner & Co-Head of M&A', bio: 'David Efron serves as Partner and Co-Head of M&A at Schulte Roth & Zabel, advising alternative investment managers on their most significant transactions.' },
  { id: 'stephanie-breslow-srz', name: 'Stephanie Breslow', role: 'Partner & Co-Head of Investment Management', bio: 'Stephanie Breslow serves as Partner and Co-Head of Investment Management at Schulte Roth & Zabel, advising premiere hedge funds and private equity firms on fund formation.' }
]);

batch('kasowitz-benson-torres', [
  { id: 'marc-kasowitz-kbt', name: 'Marc Kasowitz', role: 'Founding Partner', bio: 'Marc Kasowitz is the founding partner of Kasowitz Benson Torres, known as one of Donald Trump\'s longtime personal lawyers. The Jewish-American attorney built one of the most aggressive litigation firms on Wall Street.' },
  { id: 'michael-bowe-kbt', name: 'Michael Bowe', role: 'Partner', bio: 'Michael Bowe serves as a partner at Kasowitz Benson Torres, contributing to the firm\'s reputation as one of the most feared litigation firms in New York.' },
  { id: 'robin-cohen-kbt', name: 'Robin Cohen', role: 'Partner & Insurance Recovery Chair', bio: 'Robin Cohen chairs the Insurance Recovery practice at Kasowitz Benson Torres, leading one of the foremost insurance policyholder advocacy practices in the United States.' }
]);

batch('davis-polk-wardwell', [
  { id: 'neil-barr-dp', name: 'Neil Barr', role: 'Presiding Partner', bio: 'Neil Barr serves as Presiding Partner of Davis Polk & Wardwell, one of the most elite Wall Street law firms, advising on the world\'s largest IPOs, mergers, and regulatory matters.' },
  { id: 'joseph-hall-dp', name: 'Joseph Hall', role: 'Partner & Co-Head of Corporate', bio: 'Joseph Hall serves as Partner and Co-Head of the Corporate Department at Davis Polk, one of the leading attorneys advising on the most significant capital markets transactions.' },
  { id: 'carey-dunne-dp', name: 'Carey Dunne', role: 'Partner', bio: 'Carey Dunne is a partner at Davis Polk & Wardwell, the elite Wall Street law firm that has been a cornerstone of American corporate law for over 170 years.' }
]);

// ============================================================
// RESEARCH & THINK TANKS (13 entries)
// ============================================================
console.log('=== RESEARCH & THINK TANKS ===');

batch('council-on-foreign-relations-cfr', [
  { id: 'michael-froman-cfr', name: 'Michael Froman', role: 'President', bio: 'Michael Froman serves as President of the Council on Foreign Relations, the influential US foreign policy think tank. He previously served as US Trade Representative under President Obama.' },
  { id: 'richard-haass-cfr', name: 'Richard Haass', role: 'President Emeritus', bio: 'Richard Haass, a Jewish-American diplomat and author, served as President of the Council on Foreign Relations for 20 years (2003-2023), making it one of the most influential think tanks globally.' },
  { id: 'james-lindsay-cfr', name: 'James Lindsay', role: 'SVP, Director of Studies', bio: 'James Lindsay serves as SVP and Director of Studies at CFR, overseeing the research output of the premier American foreign policy organization.' }
]);

batch('brookings-institution', [
  { id: 'cecilia-rouse-brookings', name: 'Cecilia Rouse', role: 'President', bio: 'Cecilia Rouse serves as President of the Brookings Institution, one of Washington\'s most influential think tanks. She previously served as Chair of the Council of Economic Advisers under President Biden.' },
  { id: 'ted-gayer-brookings', name: 'Ted Gayer', role: 'VP & Director of Economic Studies', bio: 'Ted Gayer served as VP and Director of Economic Studies at the Brookings Institution, overseeing the think tank\'s research on economic policy and regulation.' },
  { id: 'martin-indyk-brookings', name: 'Martin Indyk', role: 'Former Distinguished Fellow', bio: 'Martin Indyk, born in London to a Jewish family, served as a Distinguished Fellow at Brookings and as US Ambassador to Israel and Special Envoy for Israeli-Palestinian Negotiations.' }
]);

batch('mckinsey-company', [
  { id: 'bob-sternfels-mckinsey', name: 'Bob Sternfels', role: 'Global Managing Partner', bio: 'Bob Sternfels serves as Global Managing Partner of McKinsey & Company, leading the world\'s most prestigious management consulting firm with 45,000+ consultants in 65 countries.' },
  { id: 'tracy-francis-mckinsey', name: 'Tracy Francis', role: 'Chief Client Officer', bio: 'Tracy Francis serves as Chief Client Officer at McKinsey & Company, one of the most senior leaders at the consulting firm that advises the world\'s largest corporations and governments.' },
  { id: 'liz-hilton-segel-mckinsey', name: 'Liz Hilton Segel', role: 'Chief Client Officer (Former)', bio: 'Liz Hilton Segel served as Chief Client Officer and Managing Partner for North America at McKinsey & Company, one of the most powerful women in global consulting.' }
]);

// ============================================================
// PHILANTHROPY & FOUNDATIONS (6 entries)
// ============================================================
console.log('=== PHILANTHROPY & FOUNDATIONS ===');

batch('chan-zuckerberg-initiative', [
  { id: 'priscilla-chan-czi', name: 'Priscilla Chan', role: 'Co-founder & Co-CEO', bio: 'Priscilla Chan is Co-founder and Co-CEO of the Chan Zuckerberg Initiative, the philanthropic organization she created with her husband Mark Zuckerberg, pledging 99% of their Facebook wealth.' },
  { id: 'mark-zuckerberg-czi', name: 'Mark Zuckerberg', role: 'Co-founder', bio: 'Mark Zuckerberg co-founded the Chan Zuckerberg Initiative with his wife Priscilla Chan, committing $45+ billion in Meta shares to advance science, education, and community development.' },
  { id: 'joe-desimone-czi', name: 'Joe DeSimone', role: 'President of Science', bio: 'Joe DeSimone serves as President of Science at the Chan Zuckerberg Initiative, leading the CZ Biohub and scientific research programs funded by the Zuckerberg philanthropy.' }
]);

batch('charles-and-lynn-schusterman-family-foundation', [
  { id: 'stacy-schusterman-clf', name: 'Stacy Schusterman', role: 'Chair', bio: 'Stacy Schusterman serves as Chair of the Charles and Lynn Schusterman Family Philanthropies, one of the largest Jewish philanthropic organizations supporting Israel, education, and community.' },
  { id: 'sandy-cardin-clf', name: 'Sandy Cardin', role: 'President', bio: 'Sandy Cardin serves as President of the Charles and Lynn Schusterman Family Philanthropies, managing the foundation that has invested billions in Jewish community, education, and Israeli causes.' },
  { id: 'lynn-schusterman-clf', name: 'Lynn Schusterman', role: 'Founder & Co-Chair', bio: 'Lynn Schusterman is Co-founder and Co-Chair of the Schusterman Family Philanthropies, building one of the most impactful Jewish foundations following the legacy of her late husband Charles.' }
]);

// ============================================================
// ADVOCACY & PUBLIC AFFAIRS (6 entries)
// ============================================================
console.log('=== ADVOCACY & PUBLIC AFFAIRS ===');

batch('hadassah-womens-zionist-organization', [
  { id: 'rhoda-smolow-hadassah', name: 'Rhoda Smolow', role: 'National President', bio: 'Rhoda Smolow serves as National President of Hadassah, the Women\'s Zionist Organization of America, the largest women\'s volunteer organization in the US with 300,000 members.' },
  { id: 'janice-weinman-hadassah', name: 'Janice Weinman', role: 'Executive Director', bio: 'Janice Weinman serves as Executive Director and CEO of Hadassah, managing the day-to-day operations of the organization that funds Hadassah Medical Center in Jerusalem.' },
  { id: 'carol-ann-schwartz-hadassah', name: 'Carol Ann Schwartz', role: 'VP of Advocacy', bio: 'Advocacy leadership at Hadassah directs the organization\'s policy agenda covering healthcare, Israel support, and women\'s rights for its 300,000 members.' }
]);

batch('american-jewish-congress', [
  { id: 'jack-rosen-ajc', name: 'Jack Rosen', role: 'President', bio: 'Jack Rosen serves as President of the American Jewish Congress, the organization founded in 1918 that has been a major voice for Jewish civil rights and Israel advocacy.' },
  { id: 'david-harris-ajcongress', name: 'David Harris', role: 'Chair of the Board', bio: 'Board leadership at the American Jewish Congress oversees the historic organization that was founded by leaders including Rabbi Stephen Wise and has advocated for Jewish rights for over a century.' },
  { id: 'munr-kazmir-ajcongress', name: 'Munr Kazmir', role: 'Board Member', bio: 'Board members at the American Jewish Congress participate in the governance of one of America\'s oldest Jewish advocacy organizations, founded in 1918.' }
]);

// ============================================================
// FASHION & CONSUMER GOODS (5 entries)
// ============================================================
console.log('=== FASHION & CONSUMER GOODS ===');

batch('levi-strauss-co', [
  { id: 'michelle-gass-levis', name: 'Michelle Gass', role: 'President & CEO', bio: 'Michelle Gass serves as President and CEO of Levi Strauss & Co., leading the iconic American denim brand founded by Bavarian Jewish immigrant Levi Strauss in 1853.' },
  { id: 'levi-strauss-founder', name: 'Levi Strauss', role: 'Founder (1829-1902)', bio: 'Levi Strauss (1829-1902), a Jewish-Bavarian immigrant, founded Levi Strauss & Co. during the California Gold Rush, creating blue jeans and one of the world\'s most iconic brands.' },
  { id: 'harmit-singh-levis', name: 'Harmit Singh', role: 'CFO', bio: 'Harmit Singh serves as CFO and EVP of Levi Strauss & Co., managing the finances of the 170-year-old denim company founded by Jewish immigrant Levi Strauss.' }
]);

batch('revlon', [
  { id: 'charles-revson-revlon', name: 'Charles Revson', role: 'Founder (1906-1975)', bio: 'Charles Revson (1906-1975), a Jewish-American businessman, co-founded Revlon in 1932, building it into one of the world\'s leading cosmetics companies with his perfectionist approach and marketing genius.' },
  { id: 'ron-perelman-revlon', name: 'Ron Perelman', role: 'Former Controlling Shareholder', bio: 'Ron Perelman, a Jewish-American billionaire, controlled Revlon through his holding company MacAndrews & Forbes for nearly four decades before the cosmetics giant filed for bankruptcy in 2022.' },
  { id: 'elizabeth-arden-revlon', name: 'Debra Perelman', role: 'Former CEO', bio: 'Debra Perelman served as CEO of Revlon, the first woman to lead the cosmetics company. She is the daughter of billionaire Ron Perelman who controlled Revlon for decades.' }
]);

batch('benetton-group', [
  { id: 'luciano-benetton-group', name: 'Luciano Benetton', role: 'Co-founder', bio: 'Luciano Benetton co-founded the Benetton Group in 1965, building the Italian fashion brand known for its colorful knitwear and provocative advertising campaigns by Oliviero Toscani.' },
  { id: 'massimo-renon-benetton', name: 'Massimo Renon', role: 'CEO', bio: 'Massimo Renon serves as CEO of Benetton Group, leading the Italian fashion company through its restructuring and revival strategy.' },
  { id: 'alessandro-benetton-group', name: 'Alessandro Benetton', role: 'Chairman of Edizione', bio: 'Alessandro Benetton serves as Chairman of Edizione, the Benetton family holding company that controls Atlantia (highways), Autogrill, and the Benetton fashion brand.' }
]);

// ============================================================
// UTILITIES & ENERGY (5 entries)
// ============================================================
console.log('=== UTILITIES & ENERGY ===');

batch('solaredge-technologies', [
  { id: 'zvi-lando-solaredge', name: 'Zvi Lando', role: 'CEO', bio: 'Zvi Lando serves as CEO of SolarEdge Technologies, the Israeli solar energy company that produces smart inverters and power optimizers for solar panel systems worldwide.' },
  { id: 'guy-sella-solaredge', name: 'Guy Sella', role: 'Founder, Chairman & CEO (1966-2019)', bio: 'Guy Sella (1966-2019) was the founder, Chairman and CEO of SolarEdge Technologies, building the Israeli company into a global leader in smart solar energy technology before his untimely passing.' },
  { id: 'ronen-faier-solaredge', name: 'Ronen Faier', role: 'CFO', bio: 'Ronen Faier serves as CFO of SolarEdge Technologies, managing the finances of the Israeli solar energy company through its NASDAQ listing and global expansion.' }
]);

batch('israel-electric-corporation', [
  { id: 'meir-spiegler-iec', name: 'Meir Spiegler', role: 'CEO', bio: 'Meir Spiegler serves as CEO of the Israel Electric Corporation, the country\'s sole electricity supplier responsible for powering Israel\'s 9+ million population and growing tech infrastructure.' },
  { id: 'yiftah-ron-tal-iec', name: 'Yiftah Ron-Tal', role: 'Former Chairman', bio: 'Yiftah Ron-Tal served as Chairman of the Israel Electric Corporation, overseeing the state-owned utility during its transition toward renewable energy and market reform.' },
  { id: 'shmuel-erde-iec', name: 'Shmuel Erde', role: 'CFO', bio: 'Financial leadership at the Israel Electric Corporation manages the budget of Israel\'s state-owned electricity monopoly, one of the largest companies in the country.' }
]);

batch('shell-royal-dutch-shell', [
  { id: 'wael-sawan-shell', name: 'Wael Sawan', role: 'CEO', bio: 'Wael Sawan serves as CEO of Shell plc, the British multinational oil and gas company with $300+ billion in annual revenue, one of the world\'s largest energy companies.' },
  { id: 'sinead-gorman-shell', name: 'Sinead Gorman', role: 'CFO', bio: 'Sinead Gorman serves as CFO of Shell plc, managing the finances of the $200+ billion energy giant as it navigates the transition from fossil fuels to renewable energy.' },
  { id: 'henri-deterding-shell', name: 'Henri Deterding', role: 'Former Managing Director (1866-1939)', bio: 'Henri Deterding served as the long-time managing director of Royal Dutch Shell who built it into one of the world\'s largest oil companies in the early 20th century.' }
]);

// ============================================================
// ADVERTISING & PR (3 entries)
// ============================================================
console.log('=== ADVERTISING & PR ===');

batch('interpublic-group-ipg', [
  { id: 'philippe-krakowsky-ipg', name: 'Philippe Krakowsky', role: 'CEO', bio: 'Philippe Krakowsky serves as CEO of Interpublic Group, one of the "Big Four" global advertising holding companies with agencies including McCann, FCB, and MullenLowe.' },
  { id: 'ellen-johnson-ipg', name: 'Ellen Johnson', role: 'CFO', bio: 'Ellen Johnson serves as CFO of Interpublic Group, managing the finances of the $14+ billion advertising and marketing services conglomerate.' },
  { id: 'daryl-simm-ipg', name: 'Daryl Simm', role: 'CEO of Omnicom Media Group', bio: 'Senior leadership in the major advertising holding companies drives strategy for the global advertising industry that generates hundreds of billions in annual spending.' }
]);

batch('publicis-groupe', [
  { id: 'arthur-sadoun-publicis', name: 'Arthur Sadoun', role: 'Chairman & CEO', bio: 'Arthur Sadoun serves as Chairman and CEO of Publicis Groupe, the French advertising giant that is one of the four largest advertising holding companies with revenues exceeding €13 billion.' },
  { id: 'maurice-levy-publicis', name: 'Maurice Lévy', role: 'Chairman of Supervisory Board', bio: 'Maurice Lévy, a French Jewish businessman, served as CEO of Publicis Groupe for 30 years, building it into one of the world\'s largest advertising companies. He now chairs the supervisory board.' },
  { id: 'steve-king-publicis', name: 'Steve King', role: 'COO of Publicis Groupe', bio: 'Steve King served as COO of Publicis Groupe, managing operations of the French advertising giant\'s global network of agencies.' }
]);

batch('wpp-plc', [
  { id: 'mark-read-wpp', name: 'Mark Read', role: 'CEO', bio: 'Mark Read serves as CEO of WPP plc, the world\'s largest advertising holding company by revenue with agencies including GroupM, Ogilvy, and VMLY&R.' },
  { id: 'martin-sorrell-wpp', name: 'Sir Martin Sorrell', role: 'Founder', bio: 'Sir Martin Sorrell, a Jewish-British businessman, founded WPP and built it into the world\'s largest advertising company through decades of aggressive acquisitions. He departed in 2018 and founded S4 Capital.' },
  { id: 'joanne-wilson-wpp', name: 'Joanne Wilson', role: 'CFO', bio: 'Joanne Wilson serves as CFO of WPP plc, managing the finances of the $15+ billion advertising holding company with 100,000+ employees in 100+ countries.' }
]);

// ============================================================
// TRANSPORTATION (3 entries)
// ============================================================
console.log('=== TRANSPORTATION ===');

batch('el-al-israel-airlines', [
  { id: 'dina-ben-tal-ganancia-elal', name: 'Dina Ben Tal Ganancia', role: 'CEO', bio: 'Dina Ben Tal Ganancia serves as CEO of El Al Israel Airlines, Israel\'s national carrier and flag airline, overseeing its recovery and growth in the post-pandemic era.' },
  { id: 'eli-rozenberg-elal', name: 'Eli Rozenberg', role: 'Controlling Shareholder', bio: 'Eli Rozenberg, son of the late Kenny Rozenberg, controls El Al Israel Airlines through Kanfei Nesharim Aviation, having purchased a controlling stake in the Israeli national carrier.' },
  { id: 'avigal-soreq-elal', name: 'Avigal Soreq', role: 'CFO', bio: 'Financial leadership at El Al Israel Airlines manages the budget of Israel\'s flag carrier, which operates flights to destinations across five continents.' }
]);

batch('via-transportation', [
  { id: 'daniel-ramot-via', name: 'Daniel Ramot', role: 'Co-founder & CEO', bio: 'Daniel Ramot is Co-founder and CEO of Via Transportation, the Israeli-American mobility company whose technology powers public transit systems in 600+ cities worldwide.' },
  { id: 'oren-shoval-via', name: 'Oren Shoval', role: 'Co-founder & CTO', bio: 'Oren Shoval is Co-founder and CTO of Via Transportation, developing the AI-powered routing technology that optimizes shared ride services for cities and transit agencies globally.' },
  { id: 'nir-wasersprung-via', name: 'Nir Wasersprung', role: 'VP of Operations', bio: 'Senior operations leadership at Via Transportation manages the Israeli-founded company\'s global deployment of on-demand transit technology in hundreds of cities.' }
]);

batch('bombardier-inc', [
  { id: 'eric-martel-bombardier', name: 'Éric Martel', role: 'President & CEO', bio: 'Éric Martel serves as President and CEO of Bombardier Inc., leading the Canadian business jet manufacturer after it exited commercial aviation to focus on the Learjet, Challenger, and Global aircraft.' },
  { id: 'bart-demosky-bombardier', name: 'Bart Demosky', role: 'CFO', bio: 'Bart Demosky serves as CFO of Bombardier Inc., managing the finances of the Canadian aerospace company focused exclusively on business aviation.' },
  { id: 'laurent-beaudoin-bombardier', name: 'Laurent Beaudoin', role: 'Former Chairman & CEO', bio: 'Laurent Beaudoin served as Chairman and CEO of Bombardier for decades, transforming the Canadian company from a snowmobile maker into a global aerospace and rail giant.' }
]);

// ============================================================
// TELECOMMUNICATIONS
// ============================================================
console.log('=== TELECOMMUNICATIONS ===');

batch('comcast-corporation', [
  { id: 'brian-roberts-comcast', name: 'Brian Roberts', role: 'Chairman & CEO', bio: 'Brian Roberts serves as Chairman and CEO of Comcast Corporation, the largest cable company and broadband provider in the United States with $121+ billion in revenue. His father Ralph Roberts, son of Jewish immigrants, founded the company.' },
  { id: 'mike-cavanagh-comcast', name: 'Mike Cavanagh', role: 'President', bio: 'Mike Cavanagh serves as President of Comcast Corporation, the second-most senior executive at the media and telecommunications conglomerate that owns NBCUniversal, Sky, and Xfinity.' },
  { id: 'jason-armstrong-comcast', name: 'Jason Armstrong', role: 'CFO', bio: 'Jason Armstrong serves as CFO of Comcast Corporation, managing the finances of the Roberts family-controlled media and telecom conglomerate.' }
]);

// SAVE
fs.writeFileSync(JD_PATH, JSON.stringify(JD, null, 2));
fs.writeFileSync(PD_PATH, JSON.stringify(hasPeopleWrapper ? { people } : people, null, 2));
console.log('\n=== PART 8 COMPLETE ===');
console.log('Added', added, 'new individual slots');
if(missed.length) console.log('Missed entries:', missed);
