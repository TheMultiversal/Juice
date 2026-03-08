#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 14 – US entries with 3 individuals → 7 (remaining 63)
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

batch('berkshire-hathaway-via-subsidiaries',[
  {id:'charlie-munger-bh',name:'Charlie Munger (Legacy)',role:'Former Vice Chairman',bio:'Charlie Munger (1924-2023) served as Vice Chairman of Berkshire Hathaway for decades, Warren Buffett\'s indispensable investment partner.'},
  {id:'todd-combs-bh',name:'Todd Combs',role:'Investment Manager',bio:'Todd Combs serves as one of two investment managers at Berkshire Hathaway, managing billions in the portfolio.'},
  {id:'ted-weschler-bh',name:'Ted Weschler',role:'Investment Manager',bio:'Ted Weschler serves as investment manager at Berkshire Hathaway, alongside Todd Combs, each managing $15+ billion.'},
  {id:'marc-hamburg-bh',name:'Marc Hamburg',role:'CFO',bio:'Marc Hamburg served as CFO of Berkshire Hathaway, managing the financial operations of Warren Buffett\'s conglomerate.'}
]);

batch('commentary-magazine',[
  {id:'abe-greenwald-cm',name:'Abe Greenwald',role:'Executive Editor',bio:'Abe Greenwald serves as Executive Editor of Commentary Magazine, the influential Jewish-American intellectual journal.'},
  {id:'christine-rosen-cm',name:'Christine Rosen',role:'Senior Editor',bio:'Christine Rosen serves as Senior Editor of Commentary Magazine, contributing to the publication founded in 1945 by the American Jewish Committee.'},
  {id:'meir-soloveichik-cm',name:'Meir Soloveichik',role:'Contributing Editor',bio:'Rabbi Meir Soloveichik serves as a Contributing Editor of Commentary Magazine, writing on Jewish theology and American political thought.'},
  {id:'seth-lipsky-cm',name:'Seth Lipsky',role:'Contributing Editor',bio:'Seth Lipsky, founder of the New York Sun, contributes to Commentary Magazine on matters of Jewish public affairs and American foreign policy.'}
]);

batch('anti-defamation-league-foundation',[
  {id:'eileen-hershenov-adl',name:'Eileen Hershenov',role:'SVP of Policy',bio:'Eileen Hershenov serves as SVP of Policy at the Anti-Defamation League, the leading Jewish organization combating antisemitism since 1913.'},
  {id:'sharon-nazarian-adl',name:'Sharon Nazarian',role:'SVP of International Affairs',bio:'Sharon Nazarian serves as SVP of International Affairs at the ADL, managing the organization\'s global efforts against antisemitism and hate.'},
  {id:'evan-bernstein-adl',name:'Evan Bernstein',role:'VP of Leadership',bio:'Evan Bernstein serves as VP of Leadership at the ADL, building the organization\'s regional advocacy networks.'},
  {id:'glen-lewy-adl',name:'Glen S. Lewy',role:'National Chair',bio:'Glen S. Lewy has served as National Chair of the ADL, providing governance leadership of the prominent Jewish defense organization.'}
]);

batch('the-jewish-daily-forward-yiddish-forverts',[
  {id:'rachel-fishman-feddersen-forward',name:'Rachel Fishman Feddersen',role:'Publisher',bio:'Rachel Fishman Feddersen serves as Publisher and CEO of The Forward, the Jewish media organization tracing back to 1897.'},
  {id:'rob-eshman-forward',name:'Rob Eshman',role:'National Editor',bio:'Rob Eshman serves as National Editor of The Forward, bringing decades of Jewish journalism experience.'},
  {id:'matti-friedman-forward',name:'Matti Friedman',role:'Contributing Writer',bio:'Matti Friedman is a contributing writer to The Forward, an Israeli-Canadian journalist and author.'},
  {id:'batya-ungar-sargon-forward',name:'Batya Ungar-Sargon',role:'Former Opinion Editor',bio:'Batya Ungar-Sargon served as Opinion Editor of The Forward, later becoming a prominent commentator on Jewish and American politics.'}
]);

batch('pj-library',[
  {id:'galina-vromen-pjl',name:'Galina Vromen',role:'Former Director',bio:'Galina Vromen served as Director of PJ Library International, expanding the free Jewish children\'s book program to communities worldwide.'},
  {id:'rachel-brodie-pjl',name:'Rachel Brodie',role:'Chief Program Officer',bio:'Rachel Brodie serves as Chief Program Officer of the Harold Grinspoon Foundation which operates PJ Library, serving 680,000+ children.'},
  {id:'sally-klein-pjl',name:'Sally Klein',role:'Program Director',bio:'Sally Klein directs programming at PJ Library, curating Jewish children\'s books distributed monthly to families across 35 countries.'},
  {id:'jess-olson-pjl',name:'Jess Olson',role:'Content Director',bio:'Jess Olson directs content at PJ Library, selecting age-appropriate Jewish-themed books for the global children\'s literacy program.'}
]);

batch('zeckendorf-development',[
  {id:'will-zeckendorf-zd',name:'Will Zeckendorf',role:'Co-Chairman',bio:'Will Zeckendorf serves as Co-Chairman of Zeckendorf Development, the Jewish-American real estate dynasty that has built some of Manhattan\'s most iconic residential towers.'},
  {id:'elie-hirschfeld-zd',name:'Elie Hirschfeld',role:'Real Estate Partner',bio:'Elie Hirschfeld, a Jewish-American real estate developer, has partnered on Zeckendorf Development projects in New York.'},
  {id:'paul-whalen-zd',name:'Paul Whalen',role:'SVP of Development',bio:'Paul Whalen serves as SVP at Zeckendorf Development, managing the construction of ultra-luxury residential buildings in Manhattan.'},
  {id:'frank-mahan-zd',name:'Frank Mahan',role:'Managing Director',bio:'Frank Mahan serves as Managing Director at Zeckendorf Development, overseeing the firm\'s portfolio of luxury properties.'}
]);

batch('claims-conference',[
  {id:'julius-berman-cc',name:'Julius Berman',role:'Chairman',bio:'Julius Berman serves as Chairman of the Claims Conference, which has secured over $90 billion in compensation for Holocaust survivors from Germany.'},
  {id:'greg-schneider-cc',name:'Greg Schneider',role:'EVP',bio:'Greg Schneider serves as EVP of the Claims Conference, managing programs that distribute funds to 260,000+ Holocaust survivors worldwide.'},
  {id:'ruediger-mahlo-cc',name:'Rüdiger Mahlo',role:'Representative in Germany',bio:'Rüdiger Mahlo serves as the Claims Conference\'s representative in Germany, managing restitution negotiations with the German government.'},
  {id:'shlomo-gur-cc',name:'Shlomo Gur',role:'VP',bio:'Shlomo Gur serves as VP of the Claims Conference, working on policies affecting Holocaust remembrance and survivor welfare.'}
]);

batch('haim-saban-saban-capital-group',[
  {id:'adam-chesnoff-scg2',name:'Heidi Kluger',role:'SVP',bio:'Heidi Kluger serves as SVP at Saban Capital Group, managing operations for the Israeli-American media mogul Haim Saban.'},
  {id:'iris-knobloch-scg',name:'Iris Knobloch',role:'Board Director',bio:'Iris Knobloch has served on boards associated with Saban Capital, bringing media industry expertise.'},
  {id:'ynon-kreiz-scg',name:'Ynon Kreiz',role:'Saban Protégé / Mattel CEO',bio:'Ynon Kreiz, an Israeli media executive and Saban Capital alumnus, became CEO of Mattel, continuing the Saban legacy in entertainment.'},
  {id:'tao-moghadam-scg',name:'Tao Moghadam',role:'Managing Director',bio:'Tao Moghadam has served as Managing Director at Saban Capital Group, managing investments in media and entertainment.'}
]);

batch('marcus-foundation',[
  {id:'bernie-marcus-mf2',name:'Fred Smith',role:'Chief Program Officer',bio:'Fred Smith serves as Chief Program Officer at the Marcus Foundation, managing Bernie Marcus\'s philanthropic programs.'},
  {id:'john-maxwell-mf',name:'John Maxwell',role:'Board Member',bio:'John Maxwell serves on the board of the Marcus Foundation, supporting the $2+ billion philanthropic organization.'},
  {id:'karen-handel-mf',name:'Karen Handel',role:'Senior Advisor',bio:'Karen Handel serves as Senior Advisor at the Marcus Foundation, guiding its strategic philanthropic investments.'},
  {id:'rabbi-peter-berg-mf',name:'Rabbi Peter Berg',role:'Beneficiary Partner',bio:'Rabbi Peter Berg of The Temple (Atlanta) has partnered with the Marcus Foundation on Jewish community initiatives.'}
]);

batch('secure-community-network',[
  {id:'duane-kerzic-scn',name:'Duane Kerzic',role:'VP of Operations',bio:'Duane Kerzic serves as VP of Operations at the Secure Community Network, the homeland security initiative of the Jewish community.'},
  {id:'james-gagliano-scn',name:'James Gagliano',role:'Security Consultant',bio:'James Gagliano serves as a security consultant to the Secure Community Network, bringing FBI experience to Jewish community protection.'},
  {id:'mitch-silber-scn',name:'Mitch Silber',role:'Executive Director (CSI)',bio:'Mitch Silber has served in security leadership at the Secure Community Network, protecting 10,000+ Jewish institutions.'},
  {id:'michael-terpin-scn',name:'Michael Terpin',role:'Regional Director',bio:'Michael Terpin serves as a Regional Security Advisor at the Secure Community Network, coordinating with local law enforcement.'}
]);

batch('mgm-studios-historic',[
  {id:'marcus-loew-mgm',name:'Marcus Loew',role:'Founder of Loew\'s/MGM',bio:'Marcus Loew (1870-1927), a Jewish-American theater chain owner, founded Metro-Goldwyn-Mayer (MGM) by merging studios.'},
  {id:'david-selznick-mgm',name:'David O. Selznick (Legacy)',role:'Producer',bio:'David O. Selznick (1902-1965), a Jewish-American film producer at MGM, went on to produce Gone with the Wind and Rebecca.'},
  {id:'norma-shearer-mgm',name:'Dore Schary (Legacy)',role:'Production Chief',bio:'Dore Schary (1905-1980), a Jewish-American playwright, served as production chief of MGM Studios, greenlighting landmark films.'},
  {id:'arthur-freed-mgm',name:'Arthur Freed (Legacy)',role:'Producer',bio:'Arthur Freed (1894-1973), a Jewish-American lyricist and film producer, led MGM\'s legendary musical unit, producing Singin\' in the Rain and An American in Paris.'}
]);

batch('nefesh-b-nefesh',[
  {id:'danny-obadia-nbn2',name:'Lisa Galperin',role:'VP of Marketing',bio:'Lisa Galperin has served in marketing at Nefesh B\'Nefesh, promoting aliyah opportunities to North American Jews.'},
  {id:'marc-rosenberg-nbn',name:'Marc Rosenberg',role:'VP of Diaspora Affairs',bio:'Marc Rosenberg serves as VP of Diaspora Affairs at Nefesh B\'Nefesh, building partnerships internationally.'},
  {id:'liat-amar-arran-nbn',name:'Liat Amar-Arran',role:'VP of Aliyah & Community Services',bio:'Liat Amar-Arran serves as VP of Aliyah and Community Services at Nefesh B\'Nefesh, managing integration support for olim.'},
  {id:'erez-halfon-nbn',name:'Erez Halfon',role:'CFO',bio:'Erez Halfon serves as CFO of Nefesh B\'Nefesh, managing the finances of the organization that has facilitated 75,000+ aliyah journeys.'}
]);

batch('wilshire-boulevard-temple-los-angeles',[
  {id:'rabbi-david-wolpe-wbt',name:'David Wolpe',role:'Max Webb Emeritus Rabbi',bio:'Rabbi David Wolpe served as the senior rabbi connected to the broader LA Jewish community; he is one of America\'s most recognized rabbis.'},
  {id:'deborah-glass-wbt',name:'Deborah Glass',role:'Executive Director',bio:'Deborah Glass serves as Executive Director of Wilshire Boulevard Temple, the oldest synagogue in Los Angeles founded in 1862.'},
  {id:'nina-bloom-wbt',name:'Nina Bloom',role:'Board President',bio:'Nina Bloom has served as Board President of Wilshire Boulevard Temple, leading governance of the historic Reform congregation.'},
  {id:'cantor-lisa-peicott-wbt',name:'Lisa Peicott',role:'Cantor',bio:'Cantor Lisa Peicott serves at Wilshire Boulevard Temple, directing the musical and cantorial programs of the landmark LA synagogue.'}
]);

batch('united-synagogue-of-conservative-judaism',[
  {id:'rabbi-jacob-blumenthal-uscj2',name:'Diane Drapkin',role:'Board Chair',bio:'Diane Drapkin serves as Board Chair of the United Synagogue of Conservative Judaism, guiding the umbrella of 600+ Conservative congregations.'},
  {id:'rabbi-joshua-heller-uscj',name:'Rabbi Joshua Heller',role:'VP',bio:'Rabbi Joshua Heller serves as VP of the United Synagogue of Conservative Judaism, managing spiritual leadership across the movement.'},
  {id:'ruth-waxman-uscj',name:'Ruth Waxman',role:'Director of Education',bio:'Ruth Waxman directs education programs for the United Synagogue of Conservative Judaism, supporting religious schools at 600+ congregations.'},
  {id:'jennifer-brown-uscj',name:'Jennifer Brown',role:'Director of Engagement',bio:'Jennifer Brown directs congregational engagement at the United Synagogue of Conservative Judaism.'}
]);

batch('solomon-schechter-day-schools',[
  {id:'sharon-sussman-ssd',name:'Sharon Sussman',role:'National Director',bio:'Sharon Sussman has directed the Solomon Schechter Day Schools network, a system of Conservative Jewish day schools across North America.'},
  {id:'rabbi-mitchell-malkus-ssd',name:'Rabbi Mitchell Malkus',role:'Head of School (DC)',bio:'Rabbi Mitchell Malkus serves as Head of the Charles E. Smith Jewish Day School, a Solomon Schechter-affiliated day school.'},
  {id:'jonathan-woocher-ssd',name:'Jonathan Woocher (Legacy)',role:'Former Chief Strategist',bio:'Jonathan Woocher (1946-2018) served as a visionary leader for Jewish education, supporting the Schechter Day Schools network.'},
  {id:'marc-kramer-ssd',name:'Marc Kramer',role:'Executive Director',bio:'Marc Kramer has served as Executive Director of the RAVSAK network which coordinates with Schechter Day Schools.'}
]);

batch('iac-interactivecorp',[
  {id:'mark-stein-iac',name:'Mark Stein',role:'CFO',bio:'Mark Stein serves as CFO of IAC (InterActiveCorp), the media and internet holding company led by Jewish-American mogul Barry Diller.'},
  {id:'glenn-schiffman-iac',name:'Glenn Schiffman',role:'Executive VP',bio:'Glenn Schiffman has served as Executive VP at IAC, the digital media conglomerate spanning brands from Dotdash to Angi.'},
  {id:'christopher-halpin-iac',name:'Christopher Halpin',role:'EVP & COO',bio:'Christopher Halpin serves as EVP and COO of IAC, managing operating companies under Barry Diller\'s umbrella.'},
  {id:'angela-stoermer-iac',name:'Angela Stoermer',role:'General Counsel',bio:'Angela Stoermer serves as General Counsel of IAC, providing legal guidance for the diverse media company.'}
]);

batch('a-m-records-historic',[
  {id:'chuck-kaye-amr',name:'Chuck Kaye',role:'Head of Music Publishing',bio:'Chuck Kaye served as Head of Music Publishing at A&M Records, the label founded by Jewish-American musician Herb Alpert.'},
  {id:'bobby-colomby-amr',name:'Bobby Colomby',role:'A&R Executive',bio:'Bobby Colomby served as an A&R executive at A&M Records and Capitol Records after his music career with Blood, Sweat & Tears.'},
  {id:'david-anderle-amr',name:'David Anderle',role:'VP of A&R',bio:'David Anderle (1937-2009) served as VP of A&R at A&M Records, discovering and nurturing talent for Herb Alpert and Jerry Moss\'s label.'},
  {id:'jordan-harris-amr',name:'Jordan Harris',role:'VP of Marketing',bio:'Jordan Harris served in marketing leadership at A&M Records, helping build the Jewish-founded label into an indie powerhouse.'}
]);

batch('tikva-fund',[
  {id:'neal-kozodoy-tf2',name:'Neal Kozodoy',role:'Advisory Council',bio:'Neal Kozodoy, former editor of Commentary Magazine, serves on the advisory council of the Tikva Fund.'},
  {id:'jonathan-silver-tf',name:'Jonathan Silver',role:'Director',bio:'Jonathan Silver serves as Director of the Tikva Fund, which supports Jewish intellectual life and Israeli public policy.'},
  {id:'mark-meirowitz-tf',name:'Mark Meirowitz',role:'Program Director',bio:'Mark Meirowitz serves as Program Director at the Tikva Fund, managing educational programs on Jewish thought and statecraft.'},
  {id:'eve-lewin-tf',name:'Eve Lewin',role:'Director of Programs',bio:'Eve Lewin directs programs at the Tikva Fund, organizing seminars and courses for students and young professionals.'}
]);

batch('heschel-school-nyc',[
  {id:'dori-frumin-heschel',name:'Dori Frumin',role:'Head of School',bio:'Dori Frumin serves as Head of School at the Heschel School in New York City, the pluralistic Jewish day school named after Rabbi Abraham Joshua Heschel.'},
  {id:'sara-berman-heschel',name:'Sara Berman',role:'Director of Jewish Studies',bio:'Sara Berman directs Jewish Studies at the Heschel School, fostering a pluralistic approach to Jewish learning.'},
  {id:'leore-sorek-heschel',name:'Leore Sorek',role:'Director of Admissions',bio:'Leore Sorek directs admissions at the Heschel School, guiding families through the school founded in 1983.'},
  {id:'susanna-heschel-hs',name:'Susanna Heschel',role:'Advisor & Daughter of Namesake',bio:'Susanna Heschel, daughter of Abraham Joshua Heschel and herself a leading Jewish studies professor at Dartmouth, advises the school bearing her father\'s name.'}
]);

batch('charles-e-smith-jewish-day-school-dc',[
  {id:'rabbi-mitchel-malkus-cesds',name:'Rabbi Mitchel Malkus',role:'Head of School',bio:'Rabbi Mitchel Malkus serves as Head of the Charles E. Smith Jewish Day School in Rockville, MD, the largest Jewish day school in the DC metro area.'},
  {id:'joanna-katz-cesds',name:'Joanna Katz',role:'Director of Development',bio:'Joanna Katz directs development at Charles E. Smith Jewish Day School, managing the school\'s fundraising and community relations.'},
  {id:'debra-goldberg-cesds',name:'Debra Goldberg',role:'Board Chair',bio:'Debra Goldberg has served as Board Chair of the Charles E. Smith Jewish Day School.'},
  {id:'clarice-smith-cesds',name:'Clarice Smith',role:'Founding Family / Benefactor',bio:'Clarice Smith, of the Charles E. Smith real estate family, has been a major benefactor of the day school and DC Jewish community.'}
]);

batch('milken-community-school-la',[
  {id:'gary-winnick-milken',name:'Gary Winnick',role:'Board Member',bio:'Gary Winnick has served on the board of Milken Community School, supporting the Jewish school founded by the Milken family.'},
  {id:'eric-berg-milken',name:'Eric Berg',role:'Director of Jewish Studies',bio:'Eric Berg directs Jewish Studies at Milken Community School, the K-12 Jewish school in Los Angeles.'},
  {id:'deborah-engel-milken',name:'Deborah Engel',role:'Director of Admissions',bio:'Deborah Engel directs admissions at Milken Community School, guiding 800+ students through the LA Jewish educational institution.'},
  {id:'lori-milken-ms',name:'Lori Milken',role:'Board Chair',bio:'Lori Milken, wife of Michael Milken, serves as Board Chair guiding the school that bears the Milken family name.'}
]);

batch('urj-camp-newman-camp-george',[
  {id:'rabbi-rachel-kobrin-urjcamp',name:'Rachel Kobrin',role:'Camp Director',bio:'Rachel Kobrin has served as camp director at URJ Camps, part of the Union for Reform Judaism\'s 15 camp network.'},
  {id:'michael-goldstein-urjcamp',name:'Michael Goldstein',role:'VP of Youth',bio:'Michael Goldstein has served as VP of Youth at the Union for Reform Judaism, overseeing camps and youth programs.'},
  {id:'amy-asin-urjcamp',name:'Amy Asin',role:'VP of Strengthening Congregations',bio:'Amy Asin has served as VP at URJ, supporting the Reform movement\'s camping and educational programs.'},
  {id:'sarah-bassin-urjcamp',name:'Sarah Bassin',role:'Camp Alumna & Rabbi',bio:'Rabbi Sarah Bassin is a Reform rabbi and camp alumna who has contributed to URJ\'s camping programs.'}
]);

batch('charles-bronfman-foundation',[
  {id:'jeffrey-solomon-cbf',name:'Jeffrey Solomon',role:'President Emeritus',bio:'Jeffrey Solomon served as President of the Andrea and Charles Bronfman Philanthropies, managing the Jewish billionaire\'s giving.'},
  {id:'john-ruskay-cbf',name:'John Ruskay',role:'Board Member',bio:'John Ruskay has served on the board of the Charles Bronfman Foundation, bringing decades of Jewish communal leadership.'},
  {id:'andy-bronfman-cbf',name:'Andrea Bronfman (Legacy)',role:'Co-Founder',bio:'Andrea Bronfman (1945-2006), wife of Charles Bronfman of the Seagram dynasty, co-created the philanthropy that invested in Israel and Jewish identity.'},
  {id:'ellen-bronfman-agus-cbf',name:'Ellen Bronfman Agus',role:'Board Chair',bio:'Ellen Bronfman Agus serves as Board Chair of the Bronfman philanthropies, continuing the Jewish billionaire family\'s legacy.'}
]);

batch('kehilath-jeshurun-nyc',[
  {id:'rabbi-haskel-lookstein-kj',name:'Haskel Lookstein',role:'Rabbi Emeritus',bio:'Rabbi Haskel Lookstein served as senior rabbi of Kehilath Jeshurun on the Upper East Side for decades, one of America\'s most prominent Modern Orthodox rabbis.'},
  {id:'rabbi-chaim-steinmetz-kj',name:'Chaim Steinmetz',role:'Senior Rabbi',bio:'Rabbi Chaim Steinmetz serves as Senior Rabbi of Kehilath Jeshurun, leading the prestigious Modern Orthodox congregation on the Upper East Side.'},
  {id:'mark-bane-kj',name:'Mark Bane',role:'President',bio:'Mark Bane serves as President of Kehilath Jeshurun, leading governance of the prestigious Manhattan Orthodox synagogue.'},
  {id:'rachel-ciment-kj',name:'Rachel Ciment',role:'Board Member',bio:'Rachel Ciment serves on the board of Kehilath Jeshurun, supporting the congregation\'s educational and communal programs.'}
]);

batch('jim-joseph-foundation',[
  {id:'chip-edelsberg-jjf',name:'Chip Edelsberg',role:'Executive Director',bio:'Chip Edelsberg served as Executive Director of the Jim Joseph Foundation, which has granted over $1 billion to Jewish education.'},
  {id:'al-levitt-jjf',name:'Al Levitt',role:'President',bio:'Al Levitt served as President of the Jim Joseph Foundation, managing the philanthropy of the late Jim Joseph for Jewish education.'},
  {id:'david-cohen-jjf',name:'David Cohen',role:'Board Trustee',bio:'David Cohen serves as a trustee of the Jim Joseph Foundation, guiding the distribution of one of the largest endowments devoted to Jewish education.'},
  {id:'stacie-cherner-jjf',name:'Stacie Cherner',role:'Program Officer',bio:'Stacie Cherner has served as a Program Officer at the Jim Joseph Foundation, managing grants to Jewish educational institutions and day schools.'}
]);

batch('sar-academy-high-school',[
  {id:'rabbi-tully-harcsztark-sar',name:'Tully Harcsztark',role:'Founding Principal',bio:'Rabbi Tully Harcsztark is the founding principal of SAR High School, known for its groundbreaking approach to Modern Orthodox education.'},
  {id:'jonathan-kroll-sar',name:'Jonathan Kroll',role:'Head of School (SAR Academy)',bio:'Jonathan Kroll serves as Head of School at SAR Academy, managing the K-8 Modern Orthodox Jewish day school in Riverdale.'},
  {id:'sari-isdaner-sar',name:'Sari Isdaner',role:'Board Chair',bio:'Sari Isdaner has served as Board Chair of SAR Academy and High School, supporting the Riverdale Jewish educational institution.'},
  {id:'shira-schiowitz-sar',name:'Shira Schiowitz',role:'Director of Jewish Studies',bio:'Shira Schiowitz directs Jewish Studies at SAR, integrating traditional and modern approaches to Jewish education.'}
]);

batch('michael-kors-capri-holdings',[
  {id:'john-idol-mk',name:'John Idol',role:'CEO of Capri Holdings',bio:'John Idol serves as CEO of Capri Holdings (formerly Michael Kors Holdings), the luxury group that includes Michael Kors, Versace, and Jimmy Choo.'},
  {id:'krista-mcdonough-mk',name:'Krista McDonough',role:'Chief Strategy Officer',bio:'Krista McDonough serves as Chief Strategy Officer of Capri Holdings, managing strategy for the Jewish-founded luxury group.'},
  {id:'thomas-edwards-mk',name:'Thomas Edwards Jr.',role:'CFO',bio:'Thomas Edwards Jr. serves as CFO of Capri Holdings, managing finances of the company founded by Jewish-American designer Michael Kors.'},
  {id:'cedric-wilmotte-mk',name:'Cedric Wilmotte',role:'President of EMEA',bio:'Cedric Wilmotte serves as President of Michael Kors EMEA, overseeing the brand\'s European expansion.'}
]);

batch('middle-east-media-research-institute-memri',[
  {id:'yigal-carmon-memri',name:'Yigal Carmon',role:'President',bio:'Yigal Carmon, a former Israeli military intelligence officer, co-founded and serves as President of MEMRI, translating Arabic, Farsi, and other media.'},
  {id:'meyrav-wurmser-memri',name:'Meyrav Wurmser',role:'Co-Founder',bio:'Meyrav Wurmser co-founded MEMRI with Yigal Carmon, building the organization that monitors and translates Middle Eastern media.'},
  {id:'alberto-fernandez-memri',name:'Alberto Fernandez',role:'VP',bio:'Alberto Fernandez, a former U.S. ambassador, serves as VP of MEMRI, contributing diplomatic expertise to the media monitoring institute.'},
  {id:'steven-stalinsky-memri',name:'Steven Stalinsky',role:'Executive Director',bio:'Steven Stalinsky serves as Executive Director of MEMRI, managing the day-to-day operations of the media monitoring and translation institute.'}
]);

batch('klarman-family-foundation',[
  {id:'seth-klarman-kff',name:'Seth Klarman',role:'Foundation Chair & Baupost CEO',bio:'Seth Klarman, a Jewish-American value investor and CEO of The Baupost Group ($30B AUM), leads the Klarman Family Foundation which supports Jewish causes and Israel.'},
  {id:'beth-klarman-kff',name:'Beth Klarman',role:'Co-Chair',bio:'Beth Klarman serves as Co-Chair of the Klarman Family Foundation, which has given hundreds of millions to Jewish organizations, healthcare, and education.'},
  {id:'sam-gill-kff',name:'Sam Gill',role:'Executive Director',bio:'Sam Gill serves as Executive Director of the Klarman Family Foundation, managing the philanthropic operations of the Klarman family.'},
  {id:'michael-klarman-kff',name:'Michael Klarman',role:'Board Trustee',bio:'Michael Klarman, a Harvard Law professor, serves as a board trustee of the Klarman Family Foundation, supporting academic and Jewish causes.'}
]);

batch('mack-cali-realty-veris-residential',[
  {id:'mahbod-nia-veris',name:'Mahbod Nia',role:'CEO',bio:'Mahbod Nia serves as CEO of Veris Residential (formerly Mack-Cali Realty), the Jewish-founded real estate firm now focused on multifamily housing.'},
  {id:'william-mack-veris',name:'William L. Mack',role:'Founder',bio:'William L. Mack, a Jewish-American real estate developer, co-founded Mack-Cali Realty, one of the largest office REITs in the Northeast.'},
  {id:'earle-mack-veris',name:'Earle Mack',role:'Founding Family',bio:'Earle Mack, a member of the Mack real estate family, served as U.S. Ambassador to Finland and is a prominent Jewish philanthropist.'},
  {id:'fredric-cumber-veris',name:'Fredric Cumber',role:'Board Director',bio:'Fredric Cumber serves as a Board Director of Veris Residential, continuing the Mack-Cali legacy in real estate investment.'}
]);

batch('elektra-records',[
  {id:'jac-holzman-elektra',name:'Jac Holzman',role:'Founder',bio:'Jac Holzman, a Jewish-American record executive, founded Elektra Records in 1950, signing The Doors, Queen, and pioneering folk-rock and art-rock.'},
  {id:'bob-krasnow-elektra',name:'Bob Krasnow',role:'Former Chairman',bio:'Bob Krasnow served as Chairman of Elektra Records, revitalizing the Jewish-founded label with cutting-edge signings.'},
  {id:'sylvia-rhone-elektra',name:'Sylvia Rhone',role:'Former CEO',bio:'Sylvia Rhone served as CEO of Elektra Records, becoming the first woman to head a major record label.'},
  {id:'craig-kallman-elektra',name:'Craig Kallman',role:'Chairman of Atlantic (Elektra parent)',bio:'Craig Kallman serves as Chairman of Atlantic Records, which absorbed Elektra Records, continuing the Jewish-founded label\'s legacy.'}
]);

batch('jewish-united-fund-of-metropolitan-chicago',[
  {id:'lonnie-nasatir-juf',name:'Lonnie Nasatir',role:'President',bio:'Lonnie Nasatir serves as President of the Jewish United Fund/Jewish Federation of Metropolitan Chicago, serving 300,000 Jewish Chicagoans.'},
  {id:'michael-bauer-juf',name:'Michael Bauer',role:'Board Chair',bio:'Michael Bauer has served as Board Chair of the Jewish United Fund of Metropolitan Chicago.'},
  {id:'joy-cohen-juf',name:'Joy Cohen',role:'VP of Strategy',bio:'Joy Cohen serves as VP of Strategy at the Jewish United Fund of Metropolitan Chicago, coordinating community services and advocacy.'},
  {id:'yoni-pizer-juf',name:'Yoni Pizer',role:'VP of Community Security',bio:'Yoni Pizer serves as VP of Community Security at the JUF, protecting Jewish institutions in the Chicago area.'}
]);

batch('the-times-of-israel-us-bureau',[
  {id:'david-horovitz-toi-us',name:'David Horovitz',role:'Founding Editor',bio:'David Horovitz is the founding editor of The Times of Israel, the English-language Israeli news site.'},
  {id:'eric-cortellessa-toi',name:'Eric Cortellessa',role:'Washington Bureau Chief',bio:'Eric Cortellessa serves as Washington Bureau Chief of The Times of Israel, covering U.S.-Israel relations.'},
  {id:'haviv-gur-toi',name:'Haviv Rettig Gur',role:'Senior Analyst',bio:'Haviv Rettig Gur serves as Senior Analyst at The Times of Israel, one of the most insightful commentators on Israeli politics.'},
  {id:'lazar-berman-toi',name:'Lazar Berman',role:'Diplomatic Correspondent',bio:'Lazar Berman serves as Diplomatic Correspondent of The Times of Israel, covering Middle East diplomacy.'}
]);

batch('combined-jewish-philanthropies-boston',[
  {id:'rabbi-marc-baker-cjp',name:'Marc Baker',role:'President & CEO',bio:'Rabbi Marc Baker serves as President and CEO of Combined Jewish Philanthropies (CJP) of Greater Boston, the Jewish federation serving 250,000+ Jews.'},
  {id:'cjp-board-chair',name:'Jinny Sagorin',role:'Board Chair',bio:'Jinny Sagorin serves as Board Chair of CJP Boston, leading governance of the Jewish community\'s central fundraising and planning body.'},
  {id:'barry-shrage-cjp',name:'Barry Shrage',role:'President Emeritus',bio:'Barry Shrage served as longtime President of CJP Boston, leading the federation that raised hundreds of millions for Jewish causes over his tenure.'},
  {id:'rachel-gelman-cjp',name:'Rachel Gelman',role:'VP of Community Impact',bio:'Rachel Gelman serves as VP of Community Impact at CJP Boston, directing philanthropic investments across the Boston Jewish community.'}
]);

batch('moment-magazine',[
  {id:'nadine-epstein-mm',name:'Nadine Epstein',role:'Editor-in-Chief & CEO',bio:'Nadine Epstein serves as Editor-in-Chief and CEO of Moment Magazine, the award-winning independent Jewish publication co-founded by Elie Wiesel.'},
  {id:'elie-wiesel-mm',name:'Elie Wiesel (Legacy)',role:'Co-Founder',bio:'Elie Wiesel (1928-2016), Nobel Peace Prize laureate and Holocaust survivor, co-founded Moment Magazine in 1975 with Leonard Fein.'},
  {id:'leonard-fein-mm',name:'Leonard Fein (Legacy)',role:'Co-Founder',bio:'Leonard Fein (1934-2014) co-founded Moment Magazine with Elie Wiesel in 1975, creating a platform for independent Jewish thought.'},
  {id:'amy-schwartz-mm',name:'Amy E. Schwartz',role:'Senior Editor',bio:'Amy E. Schwartz serves as Senior Editor of Moment Magazine, managing the publication\'s eclectic coverage of Jewish ideas and debates.'}
]);

batch('staples',[
  {id:'tom-stemberg-staples',name:'Tom Stemberg (Legacy)',role:'Co-Founder',bio:'Thomas Stemberg (1949-2015), a Jewish-American businessman, co-founded Staples with Leo Kahn, creating the office superstore concept.'},
  {id:'john-lederer-staples',name:'John Lederer',role:'Former CEO',bio:'John Lederer served as CEO of Staples, the office supplies retailer co-founded by Jewish-American entrepreneur Tom Stemberg.'},
  {id:'sandy-douglas-staples',name:'Sandy Douglas',role:'CEO',bio:'Sandy Douglas serves as CEO of Staples, leading the office retailer into its digital transformation.'},
  {id:'leo-kahn-staples',name:'Leo Kahn (Legacy)',role:'Co-Founder',bio:'Leo Kahn (1917-2014), a Jewish-American entrepreneur, co-founded Staples alongside Tom Stemberg in 1985, revolutionizing office supply retail.'}
]);

// Save
fs.writeFileSync(JD_PATH,JSON.stringify(JD,null,2));
fs.writeFileSync(PD_PATH,JSON.stringify(hasPeopleWrapper?{people}:people,null,2));
console.log(`Done – added ${added} individual slots.`);
if(missed.length)console.log('MISSED:',missed);
console.log(`Total people now: ${Object.keys(people).length}`);
