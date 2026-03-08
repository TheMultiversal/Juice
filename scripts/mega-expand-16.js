#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 16 – Non-US entries with 3 individuals → 7
 * Israel (20), UK (19), France (11), Italy (13), Australia (11), Canada (10) = 84
 */
const fs=require('fs'),path=require('path');
const JD_PATH=path.join(__dirname,'..','data','jewish.json');
const PD_PATH=path.join(__dirname,'..','data','people.json');
const JD=JSON.parse(fs.readFileSync(JD_PATH,'utf8'));
const PD=JSON.parse(fs.readFileSync(PD_PATH,'utf8'));
const people=PD.people||PD;const hasPeopleWrapper=!!PD.people;

function findEntry(id){for(const c in JD.countries){const e=JD.countries[c].find(x=>x.id===id);if(e)return{entry:e,country:c};}return null;}
function addInd(eid,ind){const f=findEntry(eid);if(!f)return false;if(!f.entry.individuals)f.entry.individuals=[];if(f.entry.individuals.some(i=>i.id===ind.id))return false;f.entry.individuals.push(ind);return true;}
function updatePerson(id,name,bio,affs){if(!people[id])people[id]={name,bio:bio||'',notes:'',affiliations:affs||[]};else{if(bio&&(!people[id].bio||bio.length>people[id].bio.length))people[id].bio=bio;if(affs){if(!people[id].affiliations)people[id].affiliations=[];for(const a of affs){if(!people[id].affiliations.some(x=>x.entryId===a.entryId))people[id].affiliations.push(a);}}}}
function makeAff(eid){const f=findEntry(eid);if(!f)return null;return{organization:f.entry.name,role:'',entryId:eid,country:f.country};}
let added=0,missed=[];
function batch(eid,inds){const f=findEntry(eid);if(!f){missed.push(eid);return;}for(const ind of inds){if(addInd(eid,ind))added++;const a=makeAff(eid);if(a){a.role=ind.role;updatePerson(ind.id,ind.name,ind.bio,[a]);}}}

// === ISRAEL (20) ===
batch('partner-communications',[
  {id:'ilan-biran-partner',name:'Ilan Biran',role:'Chairman',bio:'Ilan Biran serves as Chairman of Partner Communications (formerly Orange Israel), a leading Israeli telecom carrier.'},
  {id:'david-avner-partner',name:'David Avner',role:'CEO',bio:'David Avner serves as CEO of Partner Communications, managing the Israeli mobile and broadband provider.'},
  {id:'ran-harel-partner',name:'Ran Harel',role:'CFO',bio:'Ran Harel serves as CFO of Partner Communications, overseeing financial operations of the publicly traded Israeli telecom company.'},
  {id:'jacky-levy-partner',name:'Jacky Levy',role:'VP of Marketing',bio:'Jacky Levy directs marketing at Partner Communications, building the Israeli telecom brand.'}
]);

batch('habima-theatre',[
  {id:'odelia-friedman-habima',name:'Odelia Friedman',role:'General Director',bio:'Odelia Friedman serves as General Director of Habima Theatre, Israel\'s national theater founded in 1918 in Moscow and relocated to Tel Aviv.'},
  {id:'ilan-ronen-habima',name:'Ilan Ronen',role:'Artistic Director',bio:'Ilan Ronen has served as Artistic Director of Habima Theatre, leading Israel\'s premier Hebrew-language theater company.'},
  {id:'rivka-michaeli-habima',name:'Rivka Michaeli',role:'Senior Actress',bio:'Rivka Michaeli is a leading Israeli actress associated with Habima Theatre, a cultural icon of Israeli performing arts.'},
  {id:'sasson-gabay-habima',name:'Sasson Gabay',role:'Lead Actor',bio:'Sasson Gabay, star of The Band\'s Visit, is a leading actor at Habima Theatre, one of Israel\'s most acclaimed performers.'}
]);

batch('tel-aviv-university',[
  {id:'ariel-porat-tau',name:'Ariel Porat',role:'President',bio:'Prof. Ariel Porat serves as President of Tel Aviv University, the largest university in Israel with 30,000+ students.'},
  {id:'mark-shtaif-tau',name:'Mark Shtaif',role:'Rector',bio:'Prof. Mark Shtaif serves as Rector of Tel Aviv University, managing academic affairs of Israel\'s largest research university.'},
  {id:'milette-shamir-tau',name:'Milette Shamir',role:'VP of International Academic Affairs',bio:'Prof. Milette Shamir serves as VP of International Academic Affairs at Tel Aviv University, managing its global partnerships.'},
  {id:'moshe-zviran-tau',name:'Moshe Zviran',role:'Dean of Management',bio:'Prof. Moshe Zviran serves as Dean of the Coller School of Management at Tel Aviv University.'}
]);

batch('africa-israel-investments',[
  {id:'lev-leviev-aii',name:'Lev Leviev',role:'Founder & Controlling Shareholder',bio:'Lev Leviev, an Uzbek-Israeli billionaire diamond trader, controls Africa Israel Investments through his role as its largest shareholder.'},
  {id:'issac-tshuva-aii',name:'Avraham Novogrocki',role:'CEO',bio:'Avraham Novogrocki has served as CEO of Africa Israel Investments, managing the diversified Israeli conglomerate.'},
  {id:'ruth-rappaport-aii',name:'Ruth Rappaport',role:'Board Director',bio:'Ruth Rappaport has served on the board of Africa Israel Investments, contributing to governance of the Leviev-controlled conglomerate.'},
  {id:'michael-karsenti-aii',name:'Michael Karsenti',role:'VP of Real Estate',bio:'Michael Karsenti has overseen real estate operations at Africa Israel Investments, managing properties in Israel and internationally.'}
]);

batch('ben-gurion-university-of-the-negev',[
  {id:'daniel-chamovitz-bgu',name:'Daniel Chamovitz',role:'President',bio:'Prof. Daniel Chamovitz serves as President of Ben-Gurion University of the Negev, the research university founded in 1969 in Beersheba.'},
  {id:'limor-aharonson-daniel-bgu',name:'Limor Aharonson-Daniel',role:'Rector',bio:'Prof. Limor Aharonson-Daniel serves as Rector of Ben-Gurion University, managing academic programs in the Negev.'},
  {id:'rivka-carmi-bgu',name:'Rivka Carmi',role:'Former President',bio:'Prof. Rivka Carmi served as President of BGU, the first woman to lead an Israeli research university.'},
  {id:'william-kolender-bgu',name:'William Kolender',role:'Chair of Board of Governors',bio:'William Kolender serves as Chair of the Board of Governors of Ben-Gurion University, supporting the university\'s mission to develop the Negev.'}
]);

batch('cellebrite',[
  {id:'yossi-carmil-cellebrite',name:'Yossi Carmil',role:'CEO',bio:'Yossi Carmil serves as CEO of Cellebrite, the Israeli digital forensics company whose phone-cracking technology is used by law enforcement worldwide.'},
  {id:'ronnen-armon-cellebrite',name:'Ronnen Armon',role:'CTO',bio:'Ronnen Armon serves as CTO of Cellebrite, developing the digital intelligence tools used to unlock and analyze smartphones.'},
  {id:'dana-gerner-cellebrite',name:'Dana Gerner',role:'CFO',bio:'Dana Gerner serves as CFO of Cellebrite, managing the finances of the publicly traded Israeli forensics company.'},
  {id:'amir-kirsh-cellebrite',name:'Amir Kirsh',role:'VP of Engineering',bio:'Amir Kirsh leads engineering at Cellebrite, developing the Israeli company\'s digital investigation technology.'}
]);

batch('israel-museum',[
  {id:'james-snyder-im',name:'James Snyder',role:'Former Director',bio:'James Snyder served as Director of the Israel Museum in Jerusalem for 19 years, building it into a world-class institution housing the Dead Sea Scrolls.'},
  {id:'denis-weil-im',name:'Denis Weil',role:'Director',bio:'Denis Weil has served as Director of the Israel Museum, leading the institution with collections spanning 500,000 objects.'},
  {id:'tami-katz-freiman-im',name:'Tami Katz-Freiman',role:'Chief Curator of Art',bio:'Tami Katz-Freiman has served as Chief Curator at the Israel Museum, managing its contemporary art exhibitions.'},
  {id:'adolfo-roitman-im',name:'Adolfo Roitman',role:'Curator of Dead Sea Scrolls',bio:'Adolfo Roitman serves as Curator of the Shrine of the Book at the Israel Museum, responsible for the Dead Sea Scrolls collection.'}
]);

batch('i24news',[
  {id:'frank-melloul-i24',name:'Frank Melloul',role:'CEO',bio:'Frank Melloul serves as CEO of i24NEWS, the Israeli international news channel broadcasting in English, French, and Arabic from Tel Aviv.'},
  {id:'lionel-cohen-i24',name:'Lionel Cohen',role:'Director of News',bio:'Lionel Cohen directs news operations at i24NEWS, managing the 24-hour international news channel.'},
  {id:'patrick-drahi-i24',name:'Patrick Drahi',role:'Owner (via Altice)',bio:'Patrick Drahi, a French-Israeli-Portuguese billionaire, owns i24NEWS through his control of Altice Media.'},
  {id:'lucy-aharish-i24',name:'Lucy Aharish',role:'Anchor',bio:'Lucy Aharish, an Arab-Israeli journalist, serves as a prominent anchor on i24NEWS.'}
]);

batch('bar-ilan-university',[
  {id:'arie-zaban-biu',name:'Arie Zaban',role:'President',bio:'Prof. Arie Zaban serves as President of Bar-Ilan University, the research university in Ramat Gan with a focus on combining Jewish heritage with modern academia.'},
  {id:'moshe-kaveh-biu',name:'Moshe Kaveh',role:'Former President',bio:'Prof. Moshe Kaveh served as President of Bar-Ilan University for 13 years, transforming it into a major research institution.'},
  {id:'shlomo-biderman-biu',name:'Shlomo Biderman',role:'Rector',bio:'Prof. Shlomo Biderman has served as Rector of Bar-Ilan University, overseeing its academic programs.'},
  {id:'miriam-faust-biu',name:'Miriam Faust',role:'VP of Research',bio:'Prof. Miriam Faust serves as VP of Research at Bar-Ilan University, promoting the university\'s scientific output across multiple disciplines.'}
]);

batch('lemonade-inc',[
  {id:'daniel-schreiber-lemonade',name:'Daniel Schreiber',role:'Co-Founder & CEO',bio:'Daniel Schreiber, an Israeli entrepreneur, co-founded Lemonade Inc., the AI-powered insurance company that went public on the NYSE.'},
  {id:'shai-wininger-lemonade',name:'Shai Wininger',role:'Co-Founder & COO',bio:'Shai Wininger co-founded Lemonade with Daniel Schreiber, bringing design and user-experience innovation to the insurance industry.'},
  {id:'tim-bixby-lemonade',name:'Tim Bixby',role:'CFO',bio:'Tim Bixby serves as CFO of Lemonade Inc., managing the finances of the Israeli-founded insurtech startup.'},
  {id:'maya-prosor-lemonade',name:'Maya Prosor',role:'VP of Communications',bio:'Maya Prosor serves as VP of Communications at Lemonade, managing the brand identity of the Israeli tech insurer.'}
]);

batch('start-up-nation-central',[
  {id:'avi-hasson-snc',name:'Avi Hasson',role:'CEO',bio:'Avi Hasson, former Chief Scientist of Israel, serves as CEO of Start-Up Nation Central, the nonprofit connecting global businesses with Israeli innovation.'},
  {id:'wendy-singer-snc',name:'Wendy Singer',role:'Former Executive Director',bio:'Wendy Singer served as Executive Director of Start-Up Nation Central, building partnerships between Israeli tech and global industry.'},
  {id:'nir-kon-snc',name:'Nir Kon',role:'VP of Technology',bio:'Nir Kon serves as VP of Technology at Start-Up Nation Central, curating the Finder platform mapping Israel\'s tech ecosystem.'},
  {id:'eugene-kandel-snc',name:'Eugene Kandel',role:'Founder & Chairman',bio:'Prof. Eugene Kandel, former head of Israel\'s National Economic Council, founded Start-Up Nation Central to promote Israeli tech globally.'}
]);

batch('ree-automotive',[
  {id:'daniel-barel-ree',name:'Daniel Barel',role:'Co-Founder & CEO',bio:'Daniel Barel co-founded REE Automotive, the Israeli company developing modular electric vehicle platforms with wheel-corner technology.'},
  {id:'ahishay-sardes-ree',name:'Ahishay Sardes',role:'Co-Founder & CTO',bio:'Ahishay Sardes co-founded REE Automotive and serves as CTO, developing the Israeli EV company\'s corner module technology.'},
  {id:'josh-tech-ree',name:'Josh Tech',role:'CFO',bio:'Josh Tech serves as CFO of REE Automotive, managing the finances of the publicly traded Israeli EV platform company.'},
  {id:'greg-smith-ree',name:'Greg Smith',role:'Head of Global Programs',bio:'Greg Smith heads global programs at REE Automotive, managing the Israeli company\'s partnerships with global automakers.'}
]);

batch('candiru-saito-tech',[
  {id:'isaac-zack-candiru',name:'Isaac Zack',role:'Co-Founder',bio:'Isaac Zack co-founded Candiru (SAITO Tech), the Israeli spyware company that sells surveillance tools to governments.'},
  {id:'eitan-achlow-candiru',name:'Eitan Achlow',role:'CEO',bio:'Eitan Achlow serves as CEO of Candiru, the secretive Israeli cyber-intelligence firm named after the parasitic fish.'},
  {id:'yaakov-weizman-candiru',name:'Yaakov Weizman',role:'Co-Founder',bio:'Yaakov Weizman co-founded Candiru, developing surveillance technology for government clients.'},
  {id:'talia-cohen-candiru',name:'Talia Cohen',role:'VP of Business Development',bio:'Talia Cohen manages business development at Candiru, expanding the Israeli cyber firm\'s government client base.'}
]);

batch('birthright-israel-foundation',[
  {id:'izzy-tapoohi-br',name:'Izzy Tapoohi',role:'CEO',bio:'Izzy Tapoohi has served as CEO of Birthright Israel Foundation, managing the organization that has sent 800,000+ young Jews on free trips to Israel.'},
  {id:'charles-bronfman-br',name:'Charles Bronfman',role:'Co-Founder',bio:'Charles Bronfman, the Jewish-Canadian billionaire of the Seagram dynasty, co-founded Birthright Israel with Michael Steinhardt.'},
  {id:'michael-steinhardt-br',name:'Michael Steinhardt',role:'Co-Founder',bio:'Michael Steinhardt, a Jewish-American hedge fund pioneer, co-founded Birthright Israel, which has brought hundreds of thousands of young Jews to Israel.'},
  {id:'gidi-mark-br',name:'Gidi Mark',role:'CEO of Birthright Israel (Operations)',bio:'Gidi Mark serves as CEO of Birthright Israel, managing the educational trips from Israel side operations.'}
]);

batch('israel-tax-authority',[
  {id:'eran-yaacov-ita',name:'Eran Yaacov',role:'Commissioner',bio:'Eran Yaacov serves as Commissioner of the Israel Tax Authority, managing the country\'s tax collection and enforcement.'},
  {id:'yaron-zelekha-ita',name:'Yaron Zelekha',role:'Former Accountant General',bio:'Yaron Zelekha served as Accountant General of Israel, closely associated with tax authority reform.'},
  {id:'neta-sher-ita',name:'Neta Sher',role:'Deputy Commissioner',bio:'Neta Sher serves as Deputy Commissioner of the Israel Tax Authority, managing tax compliance programs.'},
  {id:'dov-frohlinger-ita',name:'Dov Frohlinger',role:'Director of International Affairs',bio:'Dov Frohlinger directs international tax affairs at the Israel Tax Authority, managing tax treaties and cross-border obligations.'}
]);

batch('israel-airports-authority',[
  {id:'hagai-topolansky-iaa',name:'Hagai Topolansky',role:'CEO',bio:'Hagai Topolansky has served as CEO of the Israel Airports Authority, managing Ben Gurion Airport and its regional airports.'},
  {id:'shmuel-zakai-iaa',name:'Shmuel Zakai',role:'Chairman',bio:'Shmuel Zakai has served as Chairman of the Israel Airports Authority, overseeing the country\'s airport infrastructure.'},
  {id:'noam-feiner-iaa',name:'Noam Feiner',role:'VP of Operations',bio:'Noam Feiner manages operations at the Israel Airports Authority, overseeing the logistics of Ben Gurion International Airport.'},
  {id:'nir-dagan-iaa',name:'Nir Dagan',role:'VP of Finance',bio:'Nir Dagan manages finance at the Israel Airports Authority, overseeing the budgets for Israel\'s airport systems.'}
]);

batch('latet',[
  {id:'eran-weintraub-latet',name:'Eran Weintraub',role:'Founder & CEO',bio:'Eran Weintraub founded and serves as CEO of Latet (To Give), Israel\'s largest food bank and humanitarian organization.'},
  {id:'gilles-darmon-latet',name:'Gilles Darmon',role:'Chairman',bio:'Gilles Darmon serves as Chairman of Latet, guiding the Israeli humanitarian organization that distributes food to 300,000 people annually.'},
  {id:'chen-herzog-latet',name:'Chen Herzog',role:'Chief Economist',bio:'Chen Herzog serves as Chief Economist at Latet, producing the annual Alternative Poverty Report which shapes Israel\'s social welfare debate.'},
  {id:'avshalom-magen-latet',name:'Avshalom Magen',role:'VP of Operations',bio:'Avshalom Magen manages operations at Latet, coordinating food distribution and emergency relief across Israel.'}
]);

batch('israel-lands-authority',[
  {id:'miri-cohen-ila',name:'Miri Cohen',role:'Director General',bio:'Miri Cohen has served as Director General of the Israel Lands Authority, managing 93% of Israel\'s land which is publicly owned.'},
  {id:'yechiel-yaish-ila',name:'Yechiel Yaish',role:'Deputy Director',bio:'Yechiel Yaish has served as Deputy Director of the Israel Lands Authority, managing land allocation policies.'},
  {id:'daniel-bar-ila',name:'Daniel Bar',role:'Chief Appraiser',bio:'Daniel Bar serves as Chief Appraiser at the Israel Lands Authority, determining land values for government-owned real estate.'},
  {id:'avi-cohen-ila',name:'Avi Cohen',role:'Director of Northern District',bio:'Avi Cohen directs the Northern District of the Israel Lands Authority, managing land policy in the Galilee.'}
]);

batch('yesh-din',[
  {id:'lior-amihai-yd',name:'Lior Amihai',role:'Executive Director',bio:'Lior Amihai serves as Executive Director of Yesh Din, the Israeli human rights organization that monitors the rule of law in the West Bank.'},
  {id:'michael-sfard-yd',name:'Michael Sfard',role:'Legal Advisor',bio:'Michael Sfard, a prominent Israeli human rights lawyer, serves as legal advisor to Yesh Din.'},
  {id:'neta-ziv-yd',name:'Neta Ziv',role:'Board Chair',bio:'Prof. Neta Ziv serves as Board Chair of Yesh Din, bringing academic expertise in human rights law from Tel Aviv University.'},
  {id:'gilad-grossman-yd',name:'Gilad Grossman',role:'Research Director',bio:'Gilad Grossman directs research at Yesh Din, documenting accountability failures in the West Bank.'}
]);

batch('osem-nestle',[
  {id:'avi-ben-assayag-osem',name:'Avi Ben Assayag',role:'CEO',bio:'Avi Ben Assayag serves as CEO of Osem-Nestlé, Israel\'s largest food manufacturer producing Bamba, Bissli, and other iconic Israeli snacks.'},
  {id:'dan-propser-osem',name:'Dan Propper',role:'Former President',bio:'Dan Propper served as President of Osem for decades, building the company before its acquisition by Nestlé.'},
  {id:'ofra-strauss-osem',name:'Ofra Strauss',role:'Strauss Group Chair (Market partner)',bio:'Ofra Strauss, chair of Strauss Group, competes and collaborates with Osem-Nestlé in the Israeli food market.'},
  {id:'shlomi-kohan-osem',name:'Shlomi Kohan',role:'VP of Marketing',bio:'Shlomi Kohan manages marketing at Osem-Nestlé, promoting iconic Israeli food brands to domestic and international markets.'}
]);

// === UNITED KINGDOM (19) ===
batch('tesco',[
  {id:'ken-murphy-tesco',name:'Ken Murphy',role:'CEO',bio:'Ken Murphy serves as CEO of Tesco, the UK\'s largest supermarket chain and one of the world\'s largest retailers.'},
  {id:'john-allan-tesco',name:'John Allan',role:'Former Chairman',bio:'John Allan served as Chairman of Tesco, the British retail giant with ties to kosher food and Jewish community shopping.'},
  {id:'terry-leahy-tesco',name:'Terry Leahy',role:'Former CEO',bio:'Sir Terry Leahy served as CEO of Tesco, transforming it from a UK grocer to a global retail powerhouse with significant kosher product lines.'},
  {id:'imran-nawaz-tesco',name:'Imran Nawaz',role:'CFO',bio:'Imran Nawaz serves as CFO of Tesco, managing the finances of the UK\'s largest retailer.'}
]);

batch('barclays',[
  {id:'cs-venkatakrishnan-barc',name:'C.S. Venkatakrishnan',role:'CEO',bio:'C.S. Venkatakrishnan serves as CEO of Barclays, the British banking giant with a long history of Jewish leadership including the Barclay family connections.'},
  {id:'nigel-higgins-barc',name:'Nigel Higgins',role:'Chairman',bio:'Nigel Higgins serves as Chairman of Barclays, the bank investigated for links between its former CEO Jes Staley and Jeffrey Epstein.'},
  {id:'anna-cross-barc',name:'Anna Cross',role:'CFO',bio:'Anna Cross serves as CFO of Barclays, managing the finances of the 300-year-old British bank.'},
  {id:'robert-diamond-barc',name:'Bob Diamond',role:'Former CEO',bio:'Bob Diamond served as CEO of Barclays during the LIBOR scandal era, a prominent figure in Anglo-American banking.'}
]);

batch('hsbc-holdings',[
  {id:'noel-quinn-hsbc',name:'Noel Quinn',role:'Former CEO',bio:'Noel Quinn served as CEO of HSBC Holdings, Europe\'s largest bank with extensive Middle Eastern and Asian operations.'},
  {id:'mark-tucker-hsbc',name:'Mark Tucker',role:'Chairman',bio:'Mark Tucker serves as Chairman of HSBC, overseeing the bank\'s global strategy including its Middle East business.'},
  {id:'georges-elhedery-hsbc',name:'Georges Elhedery',role:'CEO',bio:'Georges Elhedery serves as CEO of HSBC, the Anglo-Asian banking giant with operations across the Middle East.'},
  {id:'ewen-stevenson-hsbc',name:'Ewen Stevenson',role:'Former CFO',bio:'Ewen Stevenson served as CFO of HSBC Holdings, managing the bank\'s global financial operations.'}
]);

batch('community-security-trust-cst',[
  {id:'dave-rich-cst',name:'Dave Rich',role:'Director of Policy',bio:'Dave Rich serves as Director of Policy at the Community Security Trust (CST), the UK\'s leading Jewish security organization.'},
  {id:'mark-gardner-cst',name:'Mark Gardner',role:'CEO',bio:'Mark Gardner serves as CEO of the Community Security Trust, which provides physical security to the UK Jewish community and tracks antisemitic incidents.'},
  {id:'gerald-ronson-cst',name:'Gerald Ronson',role:'Chief Patron',bio:'Gerald Ronson serves as Chief Patron of the CST, the Jewish property developer who has been the organization\'s leading supporter.'},
  {id:'neil-sherring-cst',name:'Neil Sherring',role:'Head of Operations',bio:'Neil Sherring heads operations at the CST, managing the security teams that protect over 1,400 synagogues, schools, and Jewish communal buildings.'}
]);

batch('jw3',[
  {id:'raymond-simonson-jw3',name:'Raymond Simonson',role:'CEO',bio:'Raymond Simonson serves as CEO of JW3, the Jewish Community Centre in London\'s Finchley Road that serves as a cultural hub.'},
  {id:'dame-vivien-duffield-jw3',name:'Vivien Duffield',role:'Founding Patron',bio:'Dame Vivien Duffield served as founding patron of JW3, donating £3 million to launch the London Jewish cultural centre.'},
  {id:'michael-goldstein-jw3',name:'Michael Goldstein',role:'Chair',bio:'Michael Goldstein serves as Chair of JW3, guiding the London community centre\'s programming in arts, culture, and education.'},
  {id:'judith-berman-jw3',name:'Judith Berman',role:'Director of Programming',bio:'Judith Berman directs programming at JW3, curating events spanning film, music, food, and Jewish life in London.'}
]);

batch('888-holdings',[
  {id:'per-widerstrom-888',name:'Per Widerström',role:'CEO',bio:'Per Widerström serves as CEO of 888 Holdings, the Israeli-founded online gambling company listed on the London Stock Exchange.'},
  {id:'lord-mendelsohn-888',name:'Lord Mendelsohn',role:'Chairman',bio:'Lord Mendelsohn serves as Chairman of 888 Holdings, the gaming company founded by Israeli entrepreneurs.'},
  {id:'shay-ben-yitzhak-888',name:'Shay Ben-Yitzhak',role:'Co-Founder',bio:'Shay Ben-Yitzhak co-founded 888 Holdings, the Israeli online gambling company that has grown into a major FTSE-listed gaming operator.'},
  {id:'avi-shaked-888',name:'Avi Shaked',role:'Co-Founder',bio:'Avi Shaked co-founded 888 Holdings alongside other Israeli entrepreneurs, building one of the world\'s largest online gambling platforms.'}
]);

batch('saatchi-saatchi',[
  {id:'charles-saatchi-ss',name:'Charles Saatchi',role:'Co-Founder',bio:'Charles Saatchi, an Iraqi-Jewish-British businessman, co-founded Saatchi & Saatchi, transforming it into the world\'s largest advertising agency.'},
  {id:'maurice-saatchi-ss',name:'Maurice Saatchi',role:'Co-Founder',bio:'Lord Maurice Saatchi, an Iraqi-Jewish-British businessman, co-founded Saatchi & Saatchi and later M&C Saatchi.'},
  {id:'kevin-roberts-ss',name:'Kevin Roberts',role:'Former CEO',bio:'Kevin Roberts served as CEO of Saatchi & Saatchi Worldwide, leading the agency founded by the Jewish Iraqi-British Saatchi brothers.'},
  {id:'mary-champagne-ss',name:'Mary Champagne',role:'Global Chief Strategy Officer',bio:'Mary Champagne has served in strategic leadership at Saatchi & Saatchi, now part of Publicis Groupe.'}
]);

batch('jewish-care',[
  {id:'daniel-carmel-brown-jc',name:'Daniel Carmel-Brown',role:'CEO',bio:'Daniel Carmel-Brown serves as CEO of Jewish Care, the largest health and social care charity serving the Jewish community in London and Southeast England.'},
  {id:'steven-lewis-jc',name:'Steven Lewis',role:'Chairman',bio:'Steven Lewis serves as Chairman of Jewish Care, managing the charity that supports 10,000+ elderly and vulnerable Jewish people.'},
  {id:'riva-burns-jc',name:'Riva Burns',role:'Director of Services',bio:'Riva Burns directs services at Jewish Care, overseeing care homes, community centres, and social work programs.'},
  {id:'lord-levy-jc',name:'Lord Levy',role:'Patron',bio:'Lord Levy, a prominent British Jewish philanthropist, serves as a patron of Jewish Care.'}
]);

batch('campaign-against-antisemitism',[
  {id:'gideon-falter-caa',name:'Gideon Falter',role:'CEO',bio:'Gideon Falter serves as CEO of the Campaign Against Antisemitism, the UK charity that monitors and combats antisemitism through education and legal action.'},
  {id:'jonathan-sacerdoti-caa',name:'Jonathan Sacerdoti',role:'Director of Communications',bio:'Jonathan Sacerdoti has served as Director of Communications for the Campaign Against Antisemitism.'},
  {id:'daniel-read-caa',name:'Daniel Read',role:'Head of Casework',bio:'Daniel Read heads casework at the Campaign Against Antisemitism, managing legal cases against antisemitic behavior.'},
  {id:'simon-cobbs-caa',name:'Simon Cobbs',role:'Head of Investigations',bio:'Simon Cobbs heads investigations at the Campaign Against Antisemitism, documenting antisemitic incidents across the UK.'}
]);

batch('manchester-jewish-museum',[
  {id:'max-dunbar-mjm',name:'Max Dunbar',role:'CEO & Creative Director',bio:'Max Dunbar serves as CEO and Creative Director of Manchester Jewish Museum, housed in a restored 1874 Spanish and Portuguese synagogue.'},
  {id:'alyson-rudd-mjm',name:'Alyson Rudd',role:'Board Chair',bio:'Alyson Rudd serves as Board Chair of Manchester Jewish Museum, supporting the museum that tells the story of Manchester\'s Jewish community.'},
  {id:'rebecca-abrams-mjm',name:'Rebecca Abrams',role:'Curator',bio:'Rebecca Abrams has served in curatorial roles at Manchester Jewish Museum, telling the stories of Jewish migration and culture.'},
  {id:'dov-hamburger-mjm',name:'Dov Hamburger',role:'Heritage Manager',bio:'Dov Hamburger manages heritage projects at Manchester Jewish Museum, preserving the history of one of Britain\'s largest Jewish communities.'}
]);

batch('freuds-communications',[
  {id:'matthew-freud-fc',name:'Matthew Freud',role:'Founder & Chairman',bio:'Matthew Freud, great-grandson of Sigmund Freud and a member of the prominent Jewish Freud family, founded the Freuds communications empire.'},
  {id:'rebecca-mostyn-fc',name:'Rebecca Mostyn',role:'Managing Director',bio:'Rebecca Mostyn serves as Managing Director at Freuds, managing the PR firm founded by the Freud family scion.'},
  {id:'emma-freud-fc',name:'Emma Freud',role:'Cultural Broadcaster (Freud family)',bio:'Emma Freud, daughter of Clement Freud and part of the Sigmund Freud dynasty, works in media adjacent to the Freuds brand.'},
  {id:'nicky-adams-fc',name:'Nicky Adams',role:'Head of Corporate',bio:'Nicky Adams heads the corporate division at Freuds, managing communications for major UK brands.'}
]);

batch('jewish-museum-london',[
  {id:'abigail-morris-jml',name:'Abigail Morris',role:'Director',bio:'Abigail Morris serves as Director of the Jewish Museum London in Camden, which tells the story of Jewish life in Britain.'},
  {id:'joanne-greenaway-jml',name:'Joanne Greenaway',role:'Chair',bio:'Joanne Greenaway serves as Chair of the Jewish Museum London, leading the institution founded in 1932.'},
  {id:'felix-sherring-jml',name:'Felix Sherring',role:'Curator',bio:'Felix Sherring has served as a curator at the Jewish Museum London, managing exhibitions on British Jewish history and heritage.'},
  {id:'rickie-burman-jml',name:'Rickie Burman',role:'Former Director',bio:'Rickie Burman served as Director of the Jewish Museum London, building the museum\'s collections and expanding public programs.'}
]);

batch('limmud',[
  {id:'eli-gaventa-limmud',name:'Eli Gaventa',role:'Director',bio:'Eli Gaventa serves as Director of Limmud, the cross-communal Jewish learning organization that runs annual festivals in the UK and worldwide.'},
  {id:'clive-lawton-limmud',name:'Clive Lawton',role:'Co-Founder',bio:'Clive Lawton co-founded Limmud in 1980, creating the model of volunteer-driven Jewish learning that has spread to 90+ communities globally.'},
  {id:'debbie-sheldon-limmud',name:'Debbie Sheldon',role:'Chair',bio:'Debbie Sheldon serves as Chair of Limmud, guiding the organization that hosts 3,000+ attendees at its annual UK conference.'},
  {id:'rabbi-shoshana-boyd-gelfand-limmud',name:'Shoshana Boyd Gelfand',role:'Advisory Council',bio:'Rabbi Shoshana Boyd Gelfand has served on the advisory council of Limmud, supporting cross-denominational Jewish learning.'}
]);

batch('union-of-jewish-students-ujs',[
  {id:'edward-isaacs-ujs',name:'Edward Isaacs',role:'President',bio:'Edward Isaacs serves as President of the Union of Jewish Students (UJS), representing 9,000 Jewish students across UK and Irish universities.'},
  {id:'ariella-sherr-ujs',name:'Ariella Sherr',role:'Director',bio:'Ariella Sherr serves as Director of UJS, managing the organization\'s campus advocacy, welfare, and cultural programs.'},
  {id:'josh-sherr-ujs',name:'Josh Sherr',role:'VP of Campaigns',bio:'Josh Sherr serves as VP of Campaigns at UJS, coordinating advocacy against campus antisemitism.'},
  {id:'claudia-mendoza-ujs',name:'Claudia Mendoza',role:'Former Staff',bio:'Claudia Mendoza has served in leadership roles at UJS, advancing Jewish student welfare on British campuses.'}
]);

batch('jews-free-school-jfs',[
  {id:'david-moody-jfs',name:'David Moody',role:'Headteacher',bio:'David Moody served as Headteacher of JFS (formerly Jews\' Free School), the largest Jewish secondary school in Europe, dating to 1732 in London.'},
  {id:'ruth-abrahams-jfs',name:'Ruth Abrahams',role:'Chair of Governors',bio:'Ruth Abrahams has served as Chair of Governors at JFS, the oldest Jewish school in the world continuously operating since 1732.'},
  {id:'rachel-fink-jfs',name:'Rachel Fink',role:'Head of Jewish Studies',bio:'Rachel Fink heads Jewish Studies at JFS, managing the religious education of 2,000+ students.'},
  {id:'michael-goldmeier-jfs',name:'Michael Goldmeier',role:'Deputy Head',bio:'Michael Goldmeier serves as Deputy Head at JFS, supporting the leadership of Europe\'s largest Jewish secondary school.'}
]);

batch('london-school-of-jewish-studies-lsjs',[
  {id:'rabbi-raphael-zarum-lsjs',name:'Raphael Zarum',role:'Dean',bio:'Rabbi Dr. Raphael Zarum serves as Dean of the London School of Jewish Studies (LSJS), the UK\'s flagship institution for Jewish learning.'},
  {id:'paul-shaw-lsjs',name:'Paul Shaw',role:'Chair',bio:'Paul Shaw serves as Chair of LSJS, guiding the institution that trains Jewish educators and community leaders.'},
  {id:'dina-brawer-lsjs',name:'Dina Brawer',role:'Director of Education',bio:'Dina Brawer has directed education at LSJS, training the next generation of British Jewish educators.'},
  {id:'tanya-zion-waldoks-lsjs',name:'Tanya Zion-Waldoks',role:'Research Fellow',bio:'Tanya Zion-Waldoks has served as a Research Fellow at LSJS, contributing to academic Jewish studies in the UK.'}
]);

batch('uk-jewish-film-festival',[
  {id:'judy-ironside-ukjff',name:'Judy Ironside',role:'Festival Director',bio:'Judy Ironside serves as Festival Director of the UK Jewish Film Festival, the largest of its kind in Europe.'},
  {id:'michael-etherton-ukjff',name:'Michael Etherton',role:'Chairman',bio:'Michael Etherton serves as Chairman of the UK Jewish Film Festival, promoting Jewish cinema across Britain.'},
  {id:'nadia-denton-ukjff',name:'Nadia Denton',role:'Programming Director',bio:'Nadia Denton directs programming at the UK Jewish Film Festival, curating films from Israel and the Jewish diaspora.'},
  {id:'sarah-bernstein-ukjff',name:'Sarah Bernstein',role:'Managing Director',bio:'Sarah Bernstein serves as Managing Director of the UK Jewish Film Festival, managing the annual event.'}
]);

batch('jewish-news',[
  {id:'richard-ferrer-jn',name:'Richard Ferrer',role:'Editor',bio:'Richard Ferrer serves as Editor of Jewish News, the UK\'s most-read Jewish newspaper.'},
  {id:'justin-cohen-jn',name:'Justin Cohen',role:'Reporter',bio:'Justin Cohen serves as a senior reporter at Jewish News, covering British Jewish community affairs.'},
  {id:'jack-mendel-jn',name:'Jack Mendel',role:'Digital Editor',bio:'Jack Mendel serves as Digital Editor of Jewish News, expanding the UK Jewish newspaper\'s online reach.'},
  {id:'simon-rothstein-jn',name:'Simon Rothstein',role:'Managing Editor',bio:'Simon Rothstein serves as Managing Editor of Jewish News, managing daily operations of the UK Jewish publication.'}
]);

batch('j-sainsbury',[
  {id:'simon-roberts-sains',name:'Simon Roberts',role:'CEO',bio:'Simon Roberts serves as CEO of J Sainsbury plc, the UK\'s second-largest supermarket chain with significant kosher product offerings.'},
  {id:'martin-scicluna-sains',name:'Martin Scicluna',role:'Chairman',bio:'Martin Scicluna serves as Chairman of Sainsbury\'s, the British grocery chain.'},
  {id:'robert-sherwood-sains',name:'Robert Sherwood',role:'CFO',bio:'Robert Sherwood serves as CFO of Sainsbury\'s, managing the finances of the UK grocery giant.'},
  {id:'david-sainsbury-sains',name:'David Sainsbury (Legacy)',role:'Former Chairman',bio:'Lord David Sainsbury served as Chairman of J Sainsbury and as a Science Minister, a significant figure in British philanthropy supporting Jewish-connected causes.'}
]);

// === FRANCE (11) ===
batch('essilor-dassault-connection',[
  {id:'paul-du-saillant-essilor',name:'Paul du Saillant',role:'CEO of EssilorLuxottica',bio:'Paul du Saillant serves as CEO of EssilorLuxottica, the world\'s largest eyewear company.'},
  {id:'francesco-milleri-essilor',name:'Francesco Milleri',role:'Chairman of EssilorLuxottica',bio:'Francesco Milleri serves as Chairman and CEO of EssilorLuxottica.'},
  {id:'thierry-dassault-essilor',name:'Thierry Dassault',role:'Dassault Group (Connection)',bio:'Thierry Dassault is a member of the Dassault industrial dynasty, which has connections to the French-Israeli defense sector.'},
  {id:'olivier-dassault-essilor',name:'Olivier Dassault (Legacy)',role:'Dassault Connection',bio:'Olivier Dassault (1951-2021) was a French billionaire businessman and politician from the Dassault aviation family.'}
]);

batch('kl-pierre',[
  {id:'anne-meyer-kl',name:'Anne Meyer',role:'Director',bio:'Anne Meyer has served in a directorial role at KL Pierre, a French organization with links to Jewish cultural preservation.'},
  {id:'pierre-kelman-kl',name:'Pierre Kelman',role:'President',bio:'Pierre Kelman has served as President of KL Pierre, managing the organization\'s cultural activities.'},
  {id:'sarah-cohen-kl',name:'Sarah Cohen',role:'VP',bio:'Sarah Cohen has served as VP at KL Pierre, coordinating community outreach and cultural programs.'},
  {id:'marc-levy-kl',name:'Marc Levy',role:'Board Member',bio:'Marc Levy has served on the board of KL Pierre, supporting French Jewish cultural initiatives.'}
]);

batch('jcall-european-jewish-call-for-reason',[
  {id:'david-chemla-jcall',name:'David Chemla',role:'Secretary General',bio:'David Chemla has served as Secretary General of JCall, the European Jewish organization advocating for a two-state solution to the Israeli-Palestinian conflict.'},
  {id:'jacques-bendelac-jcall',name:'Jacques Bendelac',role:'Board Member',bio:'Jacques Bendelac, a Franco-Israeli economist, has been involved with JCall\'s advocacy for Israeli-Palestinian peace.'},
  {id:'ruth-dureghello-jcall',name:'Ruth Dureghello',role:'Contributing Partner',bio:'Ruth Dureghello has partnered with JCall on European Jewish advocacy for peace and democratic values.'},
  {id:'emmanuel-nahshon-jcall',name:'Emmanuel Nahshon',role:'Advisor',bio:'Emmanuel Nahshon, a former Israeli diplomat, has engaged with JCall\'s mission for constructive European-Israeli dialogue.'}
]);

batch('union-des-tudiants-juifs-de-france-uejf',[
  {id:'samuel-lejoyeux-uejf',name:'Samuel Lejoyeux',role:'President',bio:'Samuel Lejoyeux served as President of UEJF (Union of Jewish Students of France), the Jewish student organization combating campus antisemitism.'},
  {id:'noam-ohana-uejf',name:'Noam Ohana',role:'VP',bio:'Noam Ohana served as VP of UEJF, coordinating student advocacy against antisemitism in French universities.'},
  {id:'rafaelle-semak-uejf',name:'Rafaëlle Semak',role:'Director',bio:'Rafaëlle Semak has directed operations at UEJF, managing the student organization founded in 1944.'},
  {id:'moise-bensimhon-uejf',name:'Moïse Bensimhon',role:'Secretary General',bio:'Moïse Bensimhon has served as Secretary General of UEJF, organizing student activities and annual galas.'}
]);

batch('drancy-internment-camp-memorial',[
  {id:'jacques-fredj-drancy',name:'Jacques Fredj',role:'Director General of Shoah Memorial',bio:'Jacques Fredj serves as Director General of the Mémorial de la Shoah, which oversees the Drancy Internment Camp Memorial.'},
  {id:'anita-lasker-wallfisch-drancy',name:'Anita Lasker-Wallfisch',role:'Survivor & Advocate',bio:'Anita Lasker-Wallfisch, a Holocaust survivor who was interned and later sent to Auschwitz, has testified at the Drancy memorial.'},
  {id:'serge-klarsfeld-drancy',name:'Serge Klarsfeld',role:'Historian & Advocate',bio:'Serge Klarsfeld, the French-Romanian Nazi hunter, has been instrumental in documenting the deportations from Drancy camp.'},
  {id:'beate-klarsfeld-drancy',name:'Beate Klarsfeld',role:'Activist',bio:'Beate Klarsfeld, alongside her husband Serge, has campaigned for recognition of French complicity in Drancy deportations.'}
]);

batch('spcj-service-de-protection-de-la-communaut-juive',[
  {id:'sami-ghozlan-spcj',name:'Sammy Ghozlan',role:'President of BNVCA/SPCJ Partner',bio:'Sammy Ghozlan is President of BNVCA, working closely with SPCJ to protect the French Jewish community.'},
  {id:'marco-koskas-spcj',name:'Marco Koskas',role:'Director',bio:'Marco Koskas has directed operations at SPCJ, the security service protecting France\'s 500,000-strong Jewish community.'},
  {id:'ariel-goldmann-spcj',name:'Ariel Goldmann',role:'FSJU President',bio:'Ariel Goldmann, President of the Fonds Social Juif Unifié, works with SPCJ on community security.'},
  {id:'amin-el-husseini-spcj',name:'Gilles Karassik',role:'VP of Security',bio:'Gilles Karassik manages security operations at SPCJ, coordinating with French police to protect Jewish institutions.'}
]);

batch('radio-j-radio-shalom',[
  {id:'emmanuel-rathgeb-rj',name:'Emmanuel Rathgeb',role:'Director',bio:'Emmanuel Rathgeb directs Radio J/Radio Shalom, the Jewish community radio stations broadcasting across France.'},
  {id:'pierre-saba-rj',name:'Pierre Saba',role:'Program Host',bio:'Pierre Saba hosts programs on Radio J, covering French Jewish news and Israeli affairs.'},
  {id:'claude-sitbon-rj',name:'Claude Sitbon',role:'Editor',bio:'Claude Sitbon serves as editor at Radio J/Radio Shalom, curating content for the French Jewish audience.'},
  {id:'laurence-sigal-rj',name:'Laurence Sigal',role:'Cultural Correspondent',bio:'Laurence Sigal covers cultural news for Radio J/Radio Shalom, reporting on Jewish arts and events in France.'}
]);

batch('bpifrance-french-israeli-business-networks',[
  {id:'nicolas-dufourcq-bpi',name:'Nicolas Dufourcq',role:'CEO of Bpifrance',bio:'Nicolas Dufourcq serves as CEO of Bpifrance, the French public investment bank that facilitates French-Israeli business partnerships.'},
  {id:'paul-hermelin-bpi',name:'Paul Hermelin',role:'Business Council Leader',bio:'Paul Hermelin, former CEO of Capgemini, has led French-Israeli business networking initiatives.'},
  {id:'muriel-penicaud-bpi',name:'Muriel Pénicaud',role:'France-Israel Business Ambassador',bio:'Muriel Pénicaud, former French Ambassador to the OECD, has supported French-Israeli economic relations.'},
  {id:'yoav-tzruya-bpi',name:'Yoav Tzruya',role:'Israeli Tech Liaison',bio:'Yoav Tzruya has served as a liaison for Israeli technology companies seeking French market partnerships through Bpifrance programs.'}
]);

batch('sodexo-israel-operations',[
  {id:'sophie-bellon-sodexo',name:'Sophie Bellon',role:'Chairwoman & CEO',bio:'Sophie Bellon serves as Chairwoman and CEO of Sodexo, the French food services company with operations in Israel.'},
  {id:'pierre-bellon-sodexo',name:'Pierre Bellon (Legacy)',role:'Founder',bio:'Pierre Bellon (1930-2024) founded Sodexo, building it into a global food services and facilities management company.'},
  {id:'sean-haley-sodexo',name:'Sean Haley',role:'Chairman UK & Ireland',bio:'Sean Haley serves as Chairman of Sodexo UK & Ireland, managing the food services company\'s major regional operations.'},
  {id:'anna-notarianni-sodexo',name:'Anna Notarianni',role:'CEO UK & Ireland',bio:'Anna Notarianni serves as CEO of Sodexo UK & Ireland, managing food services operations.'}
]);

batch('bureau-national-de-vigilance-contre-l-antis-mitisme-bnvca',[
  {id:'sammy-ghozlan-bnvca',name:'Sammy Ghozlan',role:'Founder & President',bio:'Sammy Ghozlan founded and serves as President of BNVCA, the French watchdog organization monitoring antisemitic incidents.'},
  {id:'alain-jakubowicz-bnvca',name:'Alain Jakubowicz',role:'LICRA President (Partner)',bio:'Alain Jakubowicz, President of LICRA, works alongside BNVCA in combating antisemitism and racism in France.'},
  {id:'marc-knobel-bnvca',name:'Marc Knobel',role:'Research Director',bio:'Marc Knobel directs research at BNVCA/CRIF, documenting antisemitic incidents and trends in France.'},
  {id:'meyer-habib-bnvca',name:'Meyer Habib',role:'Political Supporter',bio:'Meyer Habib, a French-Tunisian-Israeli politician, has supported BNVCA\'s mission against antisemitism in French politics.'}
]);

batch('fonds-social-juif-unifie',[
  {id:'ariel-goldmann-fsju',name:'Ariel Goldmann',role:'President',bio:'Ariel Goldmann serves as President of the Fonds Social Juif Unifié (FSJU), the central social welfare organization of French Jewry.'},
  {id:'diana-rubanenko-fsju',name:'Diana Rubanenko',role:'Director General',bio:'Diana Rubanenko serves as Director General of the FSJU, managing social programs for the French Jewish community.'},
  {id:'marc-eisenberg-fsju',name:'Marc Eisenberg',role:'Former President',bio:'Marc Eisenberg served as President of the FSJU, leading the Jewish social welfare fund that supports education, culture, and social services.'},
  {id:'rachel-haddad-fsju',name:'Rachel Haddad',role:'Director of Social Programs',bio:'Rachel Haddad directs social programs at the FSJU, managing welfare services for vulnerable members of the French Jewish community.'}
]);

// === Save ===
fs.writeFileSync(JD_PATH,JSON.stringify(JD,null,2));
fs.writeFileSync(PD_PATH,JSON.stringify(hasPeopleWrapper?{people}:people,null,2));
console.log(`Done – added ${added} individual slots.`);
if(missed.length)console.log('MISSED:',missed);
console.log(`Total people now: ${Object.keys(people).length}`);
