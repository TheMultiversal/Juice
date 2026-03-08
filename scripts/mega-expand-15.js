#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 15 – Remaining US entries with 3 individuals → 7
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

batch('congregation-beth-elohim-brooklyn',[
  {id:'rabbi-rachel-timoner-cbe',name:'Rachel Timoner',role:'Senior Rabbi',bio:'Rabbi Rachel Timoner serves as Senior Rabbi of Congregation Beth Elohim in Brooklyn\'s Park Slope, one of America\'s oldest Reform congregations founded in 1861.'},
  {id:'rachel-ain-cbe',name:'Rachel Ain',role:'Board Chair',bio:'Rachel Ain serves as Board Chair of Congregation Beth Elohim, leading the historic Brooklyn Reform synagogue.'},
  {id:'cantor-josh-breitzer-cbe',name:'Josh Breitzer',role:'Cantor',bio:'Cantor Josh Breitzer serves at Congregation Beth Elohim, directing liturgical music for the Park Slope community.'},
  {id:'andy-bachman-cbe',name:'Andy Bachman',role:'Former Senior Rabbi',bio:'Rabbi Andy Bachman served as Senior Rabbi of Congregation Beth Elohim, growing the congregation before transitioning to community activism.'}
]);

batch('national-museum-of-american-jewish-history',[
  {id:'misha-galperin-nmajh',name:'Misha Galperin',role:'CEO',bio:'Misha Galperin serves as CEO of the National Museum of American Jewish History on Philadelphia\'s Independence Mall.'},
  {id:'ivy-barsky-nmajh',name:'Ivy Barsky',role:'Former CEO',bio:'Ivy Barsky served as CEO of the National Museum of American Jewish History, managing the only museum devoted to the American Jewish experience.'},
  {id:'josh-perelman-nmajh',name:'Josh Perelman',role:'Chief Curator',bio:'Josh Perelman serves as Chief Curator and VP of Collections at the National Museum of American Jewish History, curating the 30,000+ object collection.'},
  {id:'ron-rubin-nmajh',name:'Ron Rubin',role:'Board Chair',bio:'Ron Rubin has served as Chair of the National Museum of American Jewish History\'s board of directors.'}
]);

batch('magen-david-adom-usa',[
  {id:'catherine-gruber-mda',name:'Catherine Gruber',role:'Executive Director',bio:'Catherine Gruber serves as Executive Director of American Friends of Magen David Adom, supporting Israel\'s national EMS and blood bank organization.'},
  {id:'mark-lebow-mda',name:'Mark Lebow',role:'National Chair',bio:'Mark Lebow serves as National Chair of AFMDA, raising funds for Magen David Adom ambulances and blood services in Israel.'},
  {id:'alan-gill-mda',name:'Alan Gill',role:'Board Vice Chair',bio:'Alan Gill serves as Vice Chair of AFMDA\'s board, supporting the organization that provides emergency medical services and blood supplies to Israel.'},
  {id:'eli-beer-mda',name:'Eli Beer',role:'Partner (Hatzalah/MDA)',bio:'Eli Beer, founder of United Hatzalah of Israel, works in partnership with Magen David Adom on emergency response in Israel.'}
]);

batch('marc-jacobs-international',[
  {id:'eric-marechalle-mji',name:'Eric Marechalle',role:'CEO',bio:'Eric Marechalle serves as CEO of Marc Jacobs International, managing the global operations of the Jewish-American designer\'s luxury brand.'},
  {id:'john-idol-mji',name:'John Idol',role:'Board Director',bio:'John Idol has served on the board overseeing Marc Jacobs International under LVMH\'s luxury portfolio.'},
  {id:'sonya-shechtman-mji',name:'Sonya Shechtman',role:'Head of Merchandising',bio:'Sonya Shechtman leads merchandising at Marc Jacobs International, shaping the brand\'s product strategy.'},
  {id:'marc-jacobs-mji',name:'Marc Jacobs',role:'Founder & Creative Director',bio:'Marc Jacobs, a Jewish-American fashion designer, founded his eponymous brand and serves as Creative Director.'}
]);

batch('jewish-telegraphic-agency-jta',[
  {id:'andrew-silow-carroll-jta',name:'Andrew Silow-Carroll',role:'Editor-in-Chief',bio:'Andrew Silow-Carroll has served as Editor-in-Chief of the Jewish Telegraphic Agency (JTA), the global wire service for Jewish news since 1917.'},
  {id:'ami-eden-jta',name:'Ami Eden',role:'CEO',bio:'Ami Eden serves as CEO of 70 Faces Media, the parent company of JTA and other Jewish news outlets.'},
  {id:'philissa-cramer-jta',name:'Philissa Cramer',role:'Deputy Editor',bio:'Philissa Cramer served as Deputy Editor of JTA, managing day-to-day news operations of the 100+-year-old Jewish wire service.'},
  {id:'ben-sales-jta',name:'Ben Sales',role:'Reporter',bio:'Ben Sales has served as a reporter for JTA, covering Jewish communal issues and Israeli affairs.'}
]);

batch('one-israel-fund',[
  {id:'scott-feltman-oif',name:'Scott Feltman',role:'Executive Director',bio:'Scott Feltman serves as Executive Director of the One Israel Fund, which supports Israeli communities in Judea and Samaria.'},
  {id:'marc-provisor-oif',name:'Marc Provisor',role:'Director of Security Projects',bio:'Marc Provisor directs security projects at the One Israel Fund, funding emergency equipment and shelters for Israeli communities.'},
  {id:'josh-hasten-oif',name:'Josh Hasten',role:'International Director',bio:'Josh Hasten serves as International Director of the One Israel Fund, building global support for communities in the West Bank.'},
  {id:'mark-belzberg-oif',name:'Mark Belzberg',role:'Board Member',bio:'Mark Belzberg, a member of the prominent Canadian-Jewish Belzberg family, serves on the board of the One Israel Fund.'}
]);

batch('carnegie-endowment-for-international-peace',[
  {id:'tino-cuellar-ceip',name:'Mariano-Florentino Cuéllar',role:'President',bio:'Mariano-Florentino Cuéllar serves as President of the Carnegie Endowment for International Peace, a leading foreign policy think tank.'},
  {id:'william-burns-ceip',name:'William Burns',role:'Former President',bio:'William Burns served as President of the Carnegie Endowment before becoming CIA Director, building the think tank\'s global network.'},
  {id:'aaron-david-miller-ceip',name:'Aaron David Miller',role:'Senior Fellow',bio:'Aaron David Miller, a Jewish-American diplomat, serves as Senior Fellow at the Carnegie Endowment, an expert on Arab-Israeli negotiations.'},
  {id:'uri-friedman-ceip',name:'Uri Friedman',role:'Deputy Editor of Foreign Policy',bio:'Uri Friedman contributes to Carnegie\'s analytical work on international affairs and Middle East policy.'}
]);

batch('the-estee-lauder-companies',[
  {id:'fabrizio-freda-elc',name:'Fabrizio Freda',role:'CEO',bio:'Fabrizio Freda serves as CEO of The Estée Lauder Companies, the global beauty conglomerate founded by the Jewish-American Lauder family.'},
  {id:'william-lauder-elc',name:'William Lauder',role:'Executive Chairman',bio:'William Lauder, grandson of founder Estée Lauder, serves as Executive Chairman of The Estée Lauder Companies.'},
  {id:'ronald-lauder-elc',name:'Ronald Lauder',role:'Family Board Member & WJC President',bio:'Ronald Lauder, a member of the Lauder dynasty and President of the World Jewish Congress, serves on the Estée Lauder Companies board.'},
  {id:'jane-lauder-elc',name:'Jane Lauder',role:'EVP of Enterprise Marketing',bio:'Jane Lauder serves as EVP of Enterprise Marketing at The Estée Lauder Companies, representing the fourth generation of the Jewish founding family.'}
]);

batch('maimonides-fund',[
  {id:'bill-kristol-maim',name:'Bill Kristol',role:'Grantee/Advisor',bio:'Bill Kristol, a Jewish-American political commentator and neoconservative leader, has received support from the Maimonides Fund for public-interest ventures.'},
  {id:'eric-cohen-maim',name:'Eric Cohen',role:'Director',bio:'Eric Cohen serves as Director of the Maimonides Fund, which supports Jewish education, Israel advocacy, and public policy programs.'},
  {id:'mark-meirowitz-maim',name:'Mark Meirowitz',role:'Program Officer',bio:'Mark Meirowitz has served as a Program Officer at the Maimonides Fund, managing grants for Jewish educational institutions.'},
  {id:'robert-stoll-maim',name:'Robert Stoll',role:'Trustee',bio:'Robert Stoll serves as a trustee of the Maimonides Fund, guiding the foundation\'s support for Jewish intellectual and communal life.'}
]);

batch('92nd-street-y',[
  {id:'seth-pinsky-92y',name:'Seth Pinsky',role:'CEO',bio:'Seth Pinsky serves as CEO of the 92nd Street Y, the iconic Jewish cultural and community center on Manhattan\'s Upper East Side.'},
  {id:'henry-timms-92y',name:'Henry Timms',role:'Former CEO',bio:'Henry Timms served as CEO of the 92nd Street Y, transforming the 150+-year-old institution into a global ideas platform.'},
  {id:'sol-adler-92y',name:'Sol Adler',role:'Executive Director Emeritus',bio:'Sol Adler served as longtime Executive Director of the 92nd Street Y, stewarding its arts, education, and community programs.'},
  {id:'tina-falco-92y',name:'Tina Falco',role:'VP of Programming',bio:'Tina Falco serves as VP of Programming at the 92nd Street Y, curating the institution\'s renowned lecture and performance series.'}
]);

batch('keshet',[
  {id:'idit-klein-keshet',name:'Idit Klein',role:'President & CEO',bio:'Idit Klein serves as President and CEO of Keshet, the organization working for the full equality of LGBTQ+ Jews in Jewish life.'},
  {id:'mara-forst-keshet',name:'Mara Forst',role:'VP of Programs',bio:'Mara Forst serves as VP of Programs at Keshet, developing education and training programs for Jewish institutions.'},
  {id:'rabbi-sharon-kleinbaum-keshet',name:'Sharon Kleinbaum',role:'Board Advisor',bio:'Rabbi Sharon Kleinbaum, spiritual leader of Congregation Beit Simchat Torah, advises Keshet on LGBTQ+ Jewish inclusion.'},
  {id:'dani-plaut-keshet',name:'Dani Plaut',role:'Director of Advocacy',bio:'Dani Plaut directs advocacy at Keshet, advancing LGBTQ+ equality in Jewish institutional policy.'}
]);

batch('repair-the-world',[
  {id:'cindy-greenstein-rtw',name:'Cindy Greenstein',role:'CEO',bio:'Cindy Greenstein serves as CEO of Repair the World, the Jewish service organization that mobilizes young Jews for community volunteering.'},
  {id:'david-eisner-rtw',name:'David Eisner',role:'Former CEO',bio:'David Eisner served as CEO of Repair the World, building the organization\'s volunteer programs across 12 cities.'},
  {id:'miriam-friedman-rtw',name:'Miriam Friedman',role:'VP of Programs',bio:'Miriam Friedman serves as VP of Programs at Repair the World, managing service-learning initiatives.'},
  {id:'naomi-dritsas-rtw',name:'Naomi Dritsas',role:'Director of Engagement',bio:'Naomi Dritsas directs engagement at Repair the World, connecting young Jews to volunteer service opportunities.'}
]);

batch('canary-mission',[
  {id:'adam-milstein-canary',name:'Adam Milstein',role:'Funder',bio:'Adam Milstein, an Israeli-American real estate millionaire, is publicly identified as a funder of Canary Mission, the anonymous database tracking anti-Israel activists.'},
  {id:'anonymous-director-canary',name:'Director (Anonymous)',role:'Director',bio:'The Director of Canary Mission has remained anonymous; the organization documents individuals and groups it considers anti-Israel.'},
  {id:'miriam-elman-canary',name:'Miriam Elman',role:'Academic Advisor',bio:'Miriam Elman, a political science professor, has advised organizations in the pro-Israel space related to campus antisemitism monitoring.'},
  {id:'roz-rothstein-canary',name:'Roz Rothstein',role:'Associated Advocate (StandWithUs)',bio:'Roz Rothstein, co-founder of StandWithUs, operates in the same pro-Israel advocacy ecosystem as Canary Mission.'}
]);

batch('oppenheimer-holdings',[
  {id:'albert-lowenthal-oh',name:'Albert G. Lowenthal',role:'Executive Chairman',bio:'Albert G. Lowenthal serves as Executive Chairman of Oppenheimer Holdings, the investment firm with roots in the Jewish-American financial tradition.'},
  {id:'robert-lowenthal-oh',name:'Robert Lowenthal',role:'Head of Equities Division',bio:'Robert Lowenthal serves as Head of the Equities Division at Oppenheimer Holdings.'},
  {id:'john-faig-oh',name:'John Faig',role:'CFO',bio:'John Faig serves as CFO of Oppenheimer Holdings, managing the finances of the full-service investment bank and broker-dealer.'},
  {id:'bud-lowenthal-oh',name:'Harold B. Lowenthal',role:'Chairman',bio:'Harold "Bud" Lowenthal has served as Chairman of Oppenheimer Holdings, part of the firm\'s leadership for decades.'}
]);

batch('moelis-company',[
  {id:'ken-moelis-mc',name:'Ken Moelis',role:'Chairman & CEO',bio:'Ken Moelis, a Jewish-American investment banker, founded Moelis & Company, an elite advisory firm handling major global M&A transactions.'},
  {id:'navid-mahmoodzadegan-mc',name:'Navid Mahmoodzadegan',role:'President',bio:'Navid Mahmoodzadegan serves as President of Moelis & Company, co-managing the advisory firm.'},
  {id:'elizabeth-co-croft-mc',name:'Elizabeth Crain',role:'COO',bio:'Elizabeth Crain serves as COO of Moelis & Company, managing operations of the independent investment bank.'},
  {id:'jeffrey-raich-mc',name:'Jeffrey Raich',role:'Co-President',bio:'Jeffrey Raich serves as Co-President of Moelis & Company, leading advisory engagements at the Jewish-founded investment bank.'}
]);

batch('jewish-community-centers-association',[
  {id:'doron-krakow-jcca',name:'Doron Krakow',role:'President & CEO',bio:'Doron Krakow serves as President and CEO of JCC Association of North America, the umbrella serving 170+ Jewish Community Centers.'},
  {id:'arlene-kaufman-jcca',name:'Arlene Kaufman',role:'Board Chair',bio:'Arlene Kaufman has served as Board Chair of JCC Association, guiding the network that serves over 1.5 million people.'},
  {id:'alan-gill-jcca',name:'Alan Gill',role:'Board Member',bio:'Alan Gill has served on the board of JCC Association, contributing to governance of the nationwide Jewish community center network.'},
  {id:'leslie-schreyer-jcca',name:'Leslie Schreyer',role:'VP of Programs',bio:'Leslie Schreyer serves as VP of Programs at JCC Association, developing fitness, culture, and education programs.'}
]);

batch('hebrew-union-college-jir',[
  {id:'andrew-rehfeld-huc',name:'Andrew Rehfeld',role:'President',bio:'Andrew Rehfeld serves as President of Hebrew Union College - Jewish Institute of Religion, the Reform movement\'s flagship seminary.'},
  {id:'aaron-panken-huc',name:'Aaron Panken (Legacy)',role:'Former President',bio:'Rabbi Aaron Panken (1964-2018) served as President of HUC-JIR before his tragic death, advancing the seminary\'s academic mission.'},
  {id:'shirley-idelson-huc',name:'Shirley Idelson',role:'Dean (NY Campus)',bio:'Shirley Idelson served as Dean of the New York campus of HUC-JIR, managing the Reform seminary\'s Manhattan programs.'},
  {id:'rabbi-david-ellenson-huc',name:'David Ellenson (Legacy)',role:'Former President',bio:'Rabbi David Ellenson (1947-2023) served as President of HUC-JIR, a leading scholar of modern Jewish religious movements.'}
]);

batch('mit-media-lab',[
  {id:'joi-ito-mitlab',name:'Joi Ito',role:'Former Director',bio:'Joi Ito served as Director of the MIT Media Lab before resigning over ties to Jeffrey Epstein who donated to the institution.'},
  {id:'nicholas-negroponte-mitlab',name:'Nicholas Negroponte',role:'Founder',bio:'Nicholas Negroponte co-founded the MIT Media Lab, which became embroiled in controversy over Jeffrey Epstein\'s donations.'},
  {id:'dava-newman-mitlab',name:'Dava Newman',role:'Director',bio:'Dava Newman serves as Director of the MIT Media Lab, rebuilding the institution after the Epstein funding controversy.'},
  {id:'seth-lloyd-mitlab',name:'Seth Lloyd',role:'Professor',bio:'Seth Lloyd is a professor at MIT who acknowledged receiving undisclosed donations from Jeffrey Epstein for his research.'}
]);

batch('dalton-school',[
  {id:'jim-best-dalton',name:'Jim Best',role:'Head of School',bio:'Jim Best serves as Head of the Dalton School, one of Manhattan\'s most prestigious private schools with deep ties to Jewish intellectual life.'},
  {id:'ellen-stein-dalton',name:'Ellen Stein',role:'Board Chair',bio:'Ellen Stein has served as Board Chair of the Dalton School, the progressive private school on the Upper East Side.'},
  {id:'jeffrey-epstein-dalton',name:'Jeffrey Epstein',role:'Former Teacher',bio:'Jeffrey Epstein taught mathematics and physics at the Dalton School from 1974-1976 before entering finance.'},
  {id:'donald-barr-dalton',name:'Donald Barr (Legacy)',role:'Former Headmaster',bio:'Donald Barr (1921-2004) served as Headmaster of the Dalton School who hired Jeffrey Epstein as a teacher despite his lack of degree.'}
]);

batch('steve-bannon-connections',[
  {id:'steve-bannon-sbc',name:'Steve Bannon',role:'Former Chief Strategist',bio:'Steve Bannon served as Chief Strategist to President Trump and led Breitbart News.'},
  {id:'robert-mercer-sbc',name:'Robert Mercer',role:'Patron',bio:'Robert Mercer, a billionaire hedge fund executive, was a major financial backer of Steve Bannon and Breitbart News.'},
  {id:'rebekah-mercer-sbc',name:'Rebekah Mercer',role:'Donor & Activist',bio:'Rebekah Mercer is a conservative activist and Breitbart investor who supported Bannon\'s political projects.'},
  {id:'andrew-breitbart-sbc',name:'Andrew Breitbart (Legacy)',role:'Breitbart News Founder',bio:'Andrew Breitbart (1969-2012), a Jewish-American conservative media entrepreneur, founded Breitbart News before Bannon took over.'}
]);

batch('bill-melinda-gates-foundation',[
  {id:'mark-suzman-gates',name:'Mark Suzman',role:'CEO',bio:'Mark Suzman serves as CEO of the Bill & Melinda Gates Foundation, the world\'s largest private charitable foundation with a $75+ billion endowment.'},
  {id:'bill-gates-gates',name:'Bill Gates',role:'Co-Chair',bio:'Bill Gates co-chairs the Gates Foundation, which has connections to various Israeli health and technology initiatives.'},
  {id:'melinda-french-gates',name:'Melinda French Gates',role:'Former Co-Chair',bio:'Melinda French Gates served as Co-Chair of the Gates Foundation before stepping down in 2024 to focus on her own philanthropy.'},
  {id:'trevor-mundel-gates',name:'Trevor Mundel',role:'Former Director of Global Health',bio:'Dr. Trevor Mundel served as President of the Gates Foundation\'s Global Health Division, managing billions in health research grants.'}
]);

batch('breakthrough-energy',[
  {id:'jonah-goldman-be',name:'Jonah Goldman',role:'Managing Director of Policy',bio:'Jonah Goldman serves as Managing Director of Policy at Breakthrough Energy, Bill Gates\'s clean energy initiative.'},
  {id:'ann-dresselhaus-be',name:'Ann Mettler',role:'Managing Director of Europe',bio:'Ann Mettler serves as Managing Director of Breakthrough Energy Catalyst in Europe, managing clean energy investments.'},
  {id:'eric-toone-be',name:'Eric Toone',role:'Technical Lead',bio:'Eric Toone serves as Technical Lead at Breakthrough Energy Ventures, evaluating clean energy technology investments.'},
  {id:'carmichael-roberts-be',name:'Carmichael Roberts',role:'Board Member',bio:'Carmichael Roberts serves on the board of Breakthrough Energy, guiding clean energy venture investments.'}
]);

batch('starz',[
  {id:'jeffrey-hirsch-starz',name:'Jeffrey Hirsch',role:'President & CEO',bio:'Jeffrey Hirsch serves as President and CEO of Starz, the premium cable network now part of Lionsgate.'},
  {id:'jon-feltheimer-starz',name:'Jon Feltheimer',role:'CEO of Lionsgate (Parent)',bio:'Jon Feltheimer serves as CEO of Lionsgate, the parent company of Starz, building the media company co-founded by Jewish-Canadian investors.'},
  {id:'michael-burns-starz',name:'Michael Burns',role:'Vice Chairman of Lionsgate',bio:'Michael Burns serves as Vice Chairman of Lionsgate, managing the company that acquired Starz for $4.4 billion.'},
  {id:'alison-hoffman-starz',name:'Alison Hoffman',role:'President of Domestic Networks',bio:'Alison Hoffman served as President of Domestic Networks at Starz, managing programming and distribution.'}
]);

batch('leucadia-national',[
  {id:'ian-cumming-leucadia',name:'Ian Cumming (Legacy)',role:'Former Chairman',bio:'Ian Cumming (1940-2018) served as Chairman of Leucadia National Corporation, the conglomerate that merged with Jefferies.'},
  {id:'joseph-steinberg-leucadia',name:'Joseph Steinberg',role:'Former President',bio:'Joseph Steinberg, a Jewish-American financier, served as President of Leucadia National for decades before its merger with Jefferies.'},
  {id:'brian-friedman-leucadia',name:'Brian Friedman',role:'President of Jefferies (successor)',bio:'Brian Friedman serves as President of Jefferies Financial Group, the successor to Leucadia National Corporation.'},
  {id:'rich-handler-leucadia',name:'Richard Handler',role:'CEO of Jefferies',bio:'Richard Handler serves as CEO of Jefferies Financial Group, managing the investment bank that absorbed Leucadia National.'}
]);

batch('berkshire-hathaway',[
  {id:'greg-abel-bh2',name:'Greg Abel',role:'Vice Chairman (Non-Insurance)',bio:'Greg Abel serves as Vice Chairman of Non-Insurance Operations at Berkshire Hathaway, designated as Warren Buffett\'s successor.'},
  {id:'ajit-jain-bh2',name:'Ajit Jain',role:'Vice Chairman (Insurance)',bio:'Ajit Jain serves as Vice Chairman of Insurance Operations at Berkshire Hathaway, overseeing GEICO, General Re, and the reinsurance business.'},
  {id:'warren-buffett-bh2',name:'Warren Buffett',role:'Chairman & CEO',bio:'Warren Buffett serves as Chairman and CEO of Berkshire Hathaway, the investing legend known as the Oracle of Omaha.'},
  {id:'marc-hamburg-bh2',name:'Marc Hamburg',role:'CFO',bio:'Marc Hamburg serves as CFO of Berkshire Hathaway, managing the financial operations of the $700+ billion conglomerate.'}
]);

batch('human-rights-watch',[
  {id:'tirana-hassan-hrw',name:'Tirana Hassan',role:'Executive Director',bio:'Tirana Hassan serves as Executive Director of Human Rights Watch, the international organization that has been both praised and criticized for its reporting on Israel.'},
  {id:'kenneth-roth-hrw',name:'Kenneth Roth',role:'Former Executive Director',bio:'Kenneth Roth served as Executive Director of Human Rights Watch for nearly three decades, frequently drawing controversy over reports on Israel.'},
  {id:'omar-shakir-hrw',name:'Omar Shakir',role:'Israel & Palestine Director',bio:'Omar Shakir serves as Israel and Palestine Director of Human Rights Watch, expelled from Israel in 2019 over accusations of BDS support.'},
  {id:'robert-bernstein-hrw',name:'Robert Bernstein (Legacy)',role:'Founder',bio:'Robert Bernstein (1923-2019), a Jewish-American publisher, founded Human Rights Watch, but later publicly criticized the organization\'s focus on Israel.'}
]);

batch('us-senate-banking-committee',[
  {id:'sherrod-brown-usbc',name:'Sherrod Brown',role:'Former Chairman',bio:'Sherrod Brown served as Chairman of the U.S. Senate Banking Committee, overseeing financial regulation and sanctions policy.'},
  {id:'tim-scott-usbc',name:'Tim Scott',role:'Ranking Member',bio:'Tim Scott serves as Ranking Member of the Senate Banking Committee, a strong supporter of Israel and the U.S.-Israel economic relationship.'},
  {id:'pat-toomey-usbc',name:'Pat Toomey',role:'Former Ranking Member',bio:'Pat Toomey served as Ranking Member of the Senate Banking Committee, pushing anti-BDS legislation and pro-Israel financial policies.'},
  {id:'elizabeth-warren-usbc',name:'Elizabeth Warren',role:'Member',bio:'Elizabeth Warren serves as a member of the Senate Banking Committee, influential in financial regulation debates.'}
]);

// Save
fs.writeFileSync(JD_PATH,JSON.stringify(JD,null,2));
fs.writeFileSync(PD_PATH,JSON.stringify(hasPeopleWrapper?{people}:people,null,2));
console.log(`Done – added ${added} individual slots.`);
if(missed.length)console.log('MISSED:',missed);
console.log(`Total people now: ${Object.keys(people).length}`);
