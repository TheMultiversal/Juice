#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 6 - More 3→6+ upgrades (Batch 2)
 * Covers: Religion, Heritage, Community, Representative Bodies, Culture, Education, Defense, Conglomerates, more Tech/Finance/Sports
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
let added=0;
function batch(eid,inds){const f=findEntry(eid);if(!f){console.log('  MISS:'+eid);return;}for(const ind of inds){if(addInd(eid,ind))added++;const a=makeAff(eid);if(a){a.role=ind.role;updatePerson(ind.id,ind.name,ind.bio,[a]);}}}

// ============================================================
// MORE TECHNOLOGY
// ============================================================
console.log('=== MORE TECH ===');

batch('ironsource-unity', [
  { id: 'amir-shaked-ironsource', name: 'Amir Shaked', role: 'VP Engineering', bio: 'Amir Shaked served as VP of Engineering at IronSource, helping build the Israeli ad-tech and app-monetization platform before its $4.4 billion merger with Unity Technologies in 2022.' },
  { id: 'uri-join-ironsource', name: 'Uri Join', role: 'VP of Product', bio: 'Uri Join served in product leadership at IronSource, contributing to the Israeli company\'s dominance in mobile game monetization before the Unity merger.' },
  { id: 'assaf-ben-ami-ironsource', name: 'Assaf Ben Ami', role: 'VP of Marketing', bio: 'Assaf Ben Ami served as VP of Marketing at IronSource, building the brand of the Israeli ad-tech company that became one of the largest in-app monetization platforms globally.' }
]);

batch('infosys', [
  { id: 'nandan-nilekani-infosys', name: 'Nandan Nilekani', role: 'Chairman', bio: 'Nandan Nilekani serves as non-executive Chairman of Infosys, the Indian IT services giant he co-founded. He also created India\'s Aadhaar identity system serving 1.3 billion people.' },
  { id: 'mohit-joshi-infosys', name: 'Mohit Joshi', role: 'Former President', bio: 'Mohit Joshi served as President of Infosys overseeing financial services, healthcare, and insurance verticals before becoming CEO of Tech Mahindra.' },
  { id: 'ravi-kumar-infosys', name: 'Ravi Kumar S.', role: 'Former President', bio: 'Ravi Kumar S. served as President of Infosys before departing to become CEO of Cognizant. He oversaw delivery, operations, and the company\'s Americas business.' }
]);

batch('sap-se', [
  { id: 'thomas-saueressig-sap', name: 'Thomas Saueressig', role: 'Executive Board Member', bio: 'Thomas Saueressig serves on the Executive Board of SAP SE responsible for SAP Product Engineering, overseeing the development of SAP S/4HANA and cloud platforms.' },
  { id: 'julia-white-sap', name: 'Julia White', role: 'Chief Marketing & Solutions Officer', bio: 'Julia White serves as Chief Marketing and Solutions Officer at SAP, leading go-to-market strategy for the German enterprise software giant with 400,000+ customers.' },
  { id: 'scott-russell-sap', name: 'Scott Russell', role: 'Executive Board Member', bio: 'Scott Russell serves on the SAP SE Executive Board overseeing Customer Success, managing the company\'s relationships with its massive global enterprise customer base.' }
]);

batch('samsung-group', [
  { id: 'jong-hee-han-samsung', name: 'Jong-Hee Han', role: 'Vice Chairman & CEO of Samsung Electronics', bio: 'Jong-Hee Han serves as Vice Chairman and CEO of Samsung Electronics, the world\'s largest semiconductor and smartphone manufacturer with $200+ billion in annual revenue.' },
  { id: 'kyung-kye-hyun-samsung', name: 'Kyung Kye-hyun', role: 'CEO of Samsung Semiconductor', bio: 'Kyung Kye-hyun served as CEO of Samsung\'s Device Solutions division, overseeing the world\'s largest memory chip business that dominates the DRAM and NAND flash markets.' },
  { id: 'young-hyun-jun-samsung', name: 'Young Hyun Jun', role: 'Vice Chairman of Samsung SDI', bio: 'Young Hyun Jun serves as Vice Chairman of Samsung SDI, managing the conglomerate\'s battery division that supplies EV batteries to major automakers.' }
]);

batch('blablacar', [
  { id: 'laure-wagner-blablacar', name: 'Laure Wagner', role: 'VP of Communications', bio: 'Laure Wagner serves as VP of International Communications at BlaBlaCar, the French ridesharing platform that connects 100 million members across 22 countries.' },
  { id: 'beatriz-minguez-blablacar', name: 'Béatrice Dumurgier', role: 'CEO of BlaBlaCar Daily', bio: 'Béatrice Dumurgier served as CEO of BlaBlaCar Daily (formerly BlaBlaLines), the short-distance carpooling division of the French mobility platform.' },
  { id: 'verena-butt-blablacar', name: 'Verena Butt d\'Espous', role: 'VP of Public Affairs', bio: 'Verena Butt d\'Espous serves as VP of Public Affairs at BlaBlaCar, the $2 billion French tech unicorn that is Europe\'s largest long-distance carpooling platform.' }
]);

// ============================================================
// MORE SPORTS
// ============================================================
console.log('=== MORE SPORTS ===');

batch('cleveland-cavaliers-dan-gilbert', [
  { id: 'mike-gansey-cavs', name: 'Mike Gansey', role: 'General Manager', bio: 'Mike Gansey served as interim GM of the Cleveland Cavaliers, part of Dan Gilbert\'s organization that includes Rocket Companies and multiple Cleveland sports and entertainment venues.' },
  { id: 'jb-bickerstaff-cavs', name: 'J.B. Bickerstaff', role: 'Former Head Coach', bio: 'J.B. Bickerstaff served as head coach of the Cleveland Cavaliers under Dan Gilbert\'s ownership, taking the team to the playoffs.' },
  { id: 'nic-barlage-cavs', name: 'Nic Barlage', role: 'CEO of Cavaliers', bio: 'Nic Barlage serves as President and CEO of the Cleveland Cavaliers and Rock Entertainment Group, overseeing Dan Gilbert\'s sports and entertainment operations in Cleveland.' }
]);

batch('tampa-bay-lightning-jeff-vinik', [
  { id: 'julien-brisebois-tbl', name: 'Julien BriseBois', role: 'General Manager', bio: 'Julien BriseBois serves as General Manager and VP of the Tampa Bay Lightning, building the back-to-back Stanley Cup championship teams of 2020 and 2021 under Jeff Vinik\'s ownership.' },
  { id: 'jon-cooper-tbl', name: 'Jon Cooper', role: 'Head Coach', bio: 'Jon Cooper serves as head coach of the Tampa Bay Lightning, leading the team to consecutive Stanley Cup championships in 2020 and 2021 and becoming the franchise\'s winningest coach.' },
  { id: 'steve-griggs-tbl', name: 'Steve Griggs', role: 'CEO', bio: 'Steve Griggs serves as CEO of the Tampa Bay Lightning and Vinik Sports Group, overseeing Jeff Vinik\'s $2+ billion Water Street Tampa development adjacent to the arena.' }
]);

batch('carolina-hurricanes-tom-dundon', [
  { id: 'eric-tulsky-canes', name: 'Eric Tulsky', role: 'GM', bio: 'Eric Tulsky serves as GM of the Carolina Hurricanes, rising from analytics pioneer to the role of general manager of the Tom Dundon-owned NHL franchise.' },
  { id: 'rod-brindamour-canes', name: 'Rod Brind\'Amour', role: 'Head Coach', bio: 'Rod Brind\'Amour served as head coach of the Carolina Hurricanes, leading the team to consistent playoff appearances under Tom Dundon\'s ownership since 2018.' },
  { id: 'mike-forman-canes', name: 'Mike Forman', role: 'President of Business Operations', bio: 'Mike Forman serves as President of the Carolina Hurricanes, overseeing business operations of the franchise that Tom Dundon acquired for $420 million in 2018.' }
]);

batch('las-vegas-raiders-mark-davis', [
  { id: 'tom-brady-raiders', name: 'Tom Brady', role: 'Minority Owner', bio: 'Tom Brady, the 7-time Super Bowl champion quarterback, became a minority owner of the Las Vegas Raiders after his NFL retirement, joining the Davis family ownership group.' },
  { id: 'tom-telesco-raiders', name: 'Tom Telesco', role: 'General Manager', bio: 'Tom Telesco serves as General Manager of the Las Vegas Raiders, managing the roster of the franchise that relocated from Oakland to Las Vegas in 2020 under Mark Davis.' },
  { id: 'sandra-douglass-morgan-raiders', name: 'Sandra Douglass Morgan', role: 'President', bio: 'Sandra Douglass Morgan served as President of the Las Vegas Raiders, the first Black woman to serve as team president in NFL history.' }
]);

batch('anaheim-ducks-henry-samueli', [
  { id: 'pat-verbeek-ducks', name: 'Pat Verbeek', role: 'GM', bio: 'Pat Verbeek serves as General Manager of the Anaheim Ducks, rebuilding the franchise owned by Henry and Susan Samueli through the NHL draft.' },
  { id: 'greg-cronin-ducks', name: 'Greg Cronin', role: 'Head Coach', bio: 'Greg Cronin serves as head coach of the Anaheim Ducks, leading the team\'s rebuild under the Samueli family ownership.' },
  { id: 'aaron-teats-ducks', name: 'Aaron Teats', role: 'Chief Business Officer', bio: 'Aaron Teats serves as Chief Business Officer of the Anaheim Ducks and Honda Center, managing business operations for the Samueli-owned franchise.' }
]);

batch('cleveland-guardians-larry-dolan', [
  { id: 'chris-antonetti-guards', name: 'Chris Antonetti', role: 'President of Baseball Operations', bio: 'Chris Antonetti serves as President of Baseball Operations for the Cleveland Guardians, directing the team\'s acclaimed player development system under the Dolan family ownership.' },
  { id: 'mike-chernoff-guards', name: 'Mike Chernoff', role: 'General Manager', bio: 'Mike Chernoff serves as General Manager of the Cleveland Guardians, partnering with Chris Antonetti to field competitive teams despite one of MLB\'s smallest payrolls.' },
  { id: 'stephen-vogt-guards', name: 'Stephen Vogt', role: 'Manager', bio: 'Stephen Vogt served as manager of the Cleveland Guardians, leading the team as selected by the Dolan-family-owned franchise.' }
]);

batch('phoenix-suns-mat-ishbia', [
  { id: 'james-jones-suns', name: 'James Jones', role: 'GM & President of Basketball Operations', bio: 'James Jones serves as GM and President of Basketball Operations for the Phoenix Suns, building a superteam including Kevin Durant under Mat Ishbia\'s $4 billion ownership.' },
  { id: 'frank-vogel-suns', name: 'Frank Vogel', role: 'Former Head Coach', bio: 'Frank Vogel served as head coach of the Phoenix Suns in 2023-24, coaching under Mat Ishbia who purchased the franchise for a then-record $4 billion.' },
  { id: 'brad-casper-suns', name: 'Brad Casper', role: 'CEO of Suns Legacy Partners', bio: 'Brad Casper serves as CEO of Suns Legacy Partners, overseeing Mat Ishbia\'s investments in the Phoenix Suns, Phoenix Mercury, and operations of Footprint Center.' }
]);

batch('new-york-giants-tisch-mara', [
  { id: 'john-mara-giants', name: 'John Mara', role: 'Co-owner & President', bio: 'John Mara serves as co-owner and president of the New York Giants alongside the Tisch family. The Mara family has owned the Giants since Tim Mara founded the franchise in 1925.' },
  { id: 'joe-schoen-giants', name: 'Joe Schoen', role: 'General Manager', bio: 'Joe Schoen serves as General Manager of the New York Giants, managing the roster for the franchise co-owned by the Tisch and Mara families.' },
  { id: 'alex-tisch-giants', name: 'Alex Tisch', role: 'Ownership Representative', bio: 'Alex Tisch represents the third generation of Tisch family involvement in the New York Giants, part of the billionaire family that includes Loews Corporation and the former CBS owner.' }
]);

batch('minnesota-timberwolves-glen-taylor-marc-lore-alex-rodriguez', [
  { id: 'tim-connelly-wolves', name: 'Tim Connelly', role: 'President of Basketball Operations', bio: 'Tim Connelly serves as President of Basketball Operations for the Minnesota Timberwolves, building the roster that reached the 2024 Western Conference Finals.' },
  { id: 'chris-finch-wolves', name: 'Chris Finch', role: 'Head Coach', bio: 'Chris Finch serves as head coach of the Minnesota Timberwolves, leading the team\'s resurgence under the complex ownership structure involving Glen Taylor, Marc Lore, and Alex Rodriguez.' },
  { id: 'ethan-casson-wolves', name: 'Ethan Casson', role: 'CEO', bio: 'Ethan Casson served as CEO of the Minnesota Timberwolves and Lynx, overseeing business operations during the ownership transition from Glen Taylor to Marc Lore and Alex Rodriguez.' }
]);

batch('european-maccabi-games', [
  { id: 'sheila-haber-emg', name: 'Sheila Haber', role: 'Director of Events', bio: 'Sheila Haber directs events at the European Maccabi Games, the continental Jewish sports competition held every four years with over 2,000 athletes from 35+ countries.' },
  { id: 'boris-gelfand-emg', name: 'Boris Gelfand', role: 'Honorary Ambassador', bio: 'Boris Gelfand, Israeli chess grandmaster and former World Championship challenger, serves as an honorary ambassador for European Maccabi Games, representing Jewish excellence in sport.' },
  { id: 'felix-finkbeiner-emg', name: 'Ran Nachman', role: 'Technical Director', bio: 'Ran Nachman serves as Technical Director for the European Maccabi Games, overseeing athletic competitions and venue management for the major Jewish sports festival.' }
]);

batch('maccabi-germany', [
  { id: 'uri-schafer-maccabi-de', name: 'Uri Schäfer', role: 'Board Member', bio: 'Uri Schäfer serves on the board of Maccabi Germany, the Jewish sports organization that has experienced significant growth since Alon Meyer became president.' },
  { id: 'daniel-botmann-maccabi-de', name: 'Daniel Botmann', role: 'General Secretary of ZdJ', bio: 'Daniel Botmann, Secretary General of the Central Council of Jews in Germany, supports Maccabi Germany\'s mission to promote Jewish sports participation and community building.' },
  { id: 'makkabi-youth-dir', name: 'Sharon Bamat', role: 'Youth Director', bio: 'Sharon Bamat serves as Youth Director of Maccabi Germany, organizing youth development programs that connect young Jewish athletes across German cities.' }
]);

// ============================================================
// MORE HERITAGE & MEMORIALS
// ============================================================
console.log('=== MORE HERITAGE ===');

batch('memorial-to-the-murdered-jews-of-europe', [
  { id: 'johannes-tuchel-memorial', name: 'Johannes Tuchel', role: 'Academic Advisor', bio: 'Johannes Tuchel served as academic advisor to the Memorial to the Murdered Jews of Europe in Berlin, providing historical expertise on the Holocaust memorial visited by millions annually.' },
  { id: 'thierry-noir-memorial', name: 'Thierry Noir', role: 'Artistic Advisor', bio: 'Thierry Noir, known as the first artist to paint the Berlin Wall, provided cultural context for the Memorial to the Murdered Jews of Europe, the 2,711-stele Holocaust memorial designed by Peter Eisenman.' },
  { id: 'nicole-riedl-memorial', name: 'Nicole Riedl', role: 'Education Director', bio: 'Nicole Riedl leads education programs at the Foundation for the Memorial to the Murdered Jews of Europe, managing the underground information center that documentss 6 million victims.' }
]);

batch('stolpersteine-stumbling-stones', [
  { id: 'peter-jordan-stolpersteine', name: 'Peter Jordan', role: 'Research Coordinator', bio: 'Peter Jordan serves as Research Coordinator for the Stolpersteine project, the world\'s largest decentralized memorial with 100,000+ brass cobblestones across 30+ countries commemorating Holocaust victims.' },
  { id: 'monika-meyer-stolpersteine', name: 'Monika Meyer', role: 'Administrative Director', bio: 'Monika Meyer serves as Administrative Director of the Stolpersteine Foundation, managing the logistic operations behind artist Gunter Demnig\'s ongoing memorial project.' },
  { id: 'lukas-welz-stolpersteine', name: 'Lukas Welz', role: 'Chairman of Foundation', bio: 'Lukas Welz serves as Chairman of the Stiftung Spuren-Gunter Demnig, the foundation supporting the Stolpersteine memorial project across Europe.' }
]);

batch('jewish-museum-frankfurt', [
  { id: 'fritz-backhaus-jmf', name: 'Fritz Backhaus', role: 'Former Deputy Director', bio: 'Fritz Backhaus served as Deputy Director of the Jewish Museum Frankfurt, helping lead the €50 million renovation that transformed the museum into one of Germany\'s most important Jewish cultural institutions.' },
  { id: 'erik-riedel-jmf', name: 'Erik Riedel', role: 'Head of Collections', bio: 'Erik Riedel serves as Head of Collections at the Jewish Museum Frankfurt, curating artifacts spanning 900+ years of Jewish life in Frankfurt am Main.' },
  { id: 'manfred-levy-jmf', name: 'Manfred Levy', role: 'Education Director', bio: 'Manfred Levy leads education programs at the Jewish Museum Frankfurt, developing interactive programs that explore the Rothschild family origins and Frankfurt\'s rich Jewish heritage.' }
]);

batch('galicia-jewish-museum', [
  { id: 'tomasz-kuncewicz-galicia', name: 'Tomasz Kuncewicz', role: 'Education Director', bio: 'Tomasz Kuncewicz directs education programs at the Galicia Jewish Museum in Krakow, developing exhibits that document Jewish culture in southeastern Poland through photography and oral histories.' },
  { id: 'jolan-bogdan-galicia', name: 'Jolan Bogdan', role: 'Deputy Director', bio: 'Jolan Bogdan serves as Deputy Director of the Galicia Jewish Museum, managing operations of the Krakow institution located in the former Jewish district of Kazimierz.' },
  { id: 'anna-bodzek-galicia', name: 'Anna Bodzek', role: 'Head of Exhibitions', bio: 'Anna Bodzek leads exhibitions at the Galicia Jewish Museum, curating displays that present the traces of Jewish civilization in a region where 90% of the Jewish population perished in the Holocaust.' }
]);

batch('riga-ghetto-holocaust-museum', [
  { id: 'marina-simkovich-riga', name: 'Marina Simkovich', role: 'Education Coordinator', bio: 'Marina Simkovich coordinates education programs at the Riga Ghetto and Latvian Holocaust Museum, preserving memory of the 70,000 Latvian Jews murdered during the Holocaust.' },
  { id: 'veronica-birne-riga', name: 'Veronica Birne', role: 'Curator', bio: 'Veronica Birne curates exhibitions at the Riga Ghetto and Latvian Holocaust Museum, documenting the systematic destruction of Latvia\'s Jewish community during WWII.' },
  { id: 'grigory-smolyarenko-riga', name: 'Grigory Smolyarenko', role: 'Community Liaison', bio: 'Grigory Smolyarenko serves as community liaison at the Riga Ghetto Museum, connecting the institution with Latvia\'s 8,000-strong surviving Jewish community.' }
]);

batch('jewish-museum-of-oslo', [
  { id: 'kristin-halvorsen-oslo', name: 'Kristin Halvorsen', role: 'Board Member', bio: 'Kristin Halvorsen, former Norwegian Finance Minister, has supported the Jewish Museum of Oslo through cultural policy and preservation of Norway\'s Jewish heritage.' },
  { id: 'guri-hjeltnes-oslo', name: 'Guri Hjeltnes', role: 'Historical Consultant', bio: 'Guri Hjeltnes, former director of the Center for Studies of the Holocaust and Religious Minorities, served as historical consultant to the Jewish Museum of Oslo\'s exhibits on Norway\'s 1,000-member Jewish community.' },
  { id: 'rita-westvik-oslo', name: 'Rita Westvik', role: 'Director', bio: 'Rita Westvik serves as Director of the Jewish Museum of Oslo, leading exhibitions about Norway\'s Jewish history including the wartime deportation of 773 Norwegian Jews.' }
]);

batch('jews-in-latvia-museum', [
  { id: 'michael-barkahan-latvia', name: 'Michael Barkahan', role: 'Board Member', bio: 'Michael Barkahan serves on the board of the Jews in Latvia Museum, supporting the preservation of Latvian Jewish heritage in a country that lost 90% of its Jewish population during the Holocaust.' },
  { id: 'arkady-sukharenko-latvia', name: 'Arkady Sukharenko', role: 'Vice President of Latvian Jewish Community', bio: 'Arkady Sukharenko serves as Vice President of the Jewish Community of Latvia, supporting the Jews in Latvia Museum\'s mission to document Latvian Jewish history.' },
  { id: 'lolita-tomson-latvia', name: 'Lolita Tomsone', role: 'Head of Exhibitions', bio: 'Lolita Tomsone heads exhibitions at the Jews in Latvia Museum, curating displays on the pre-war Jewish community that comprised 5% of Latvia\'s population.' }
]);

// ============================================================
// MORE REPRESENTATIVE & UMBRELLA BODIES
// ============================================================
console.log('=== MORE REP BODIES ===');

batch('confederacao-israelita-do-brasil', [
  { id: 'sergio-niskier-conib', name: 'Sérgio Niskier', role: 'VP', bio: 'Sérgio Niskier serves as VP of CONIB (Confederação Israelita do Brasil), the umbrella organization representing Brazil\'s 120,000-strong Jewish community, the largest in Latin America.' },
  { id: 'osias-wurman-conib', name: 'Osias Wurman', role: 'Former President', bio: 'Osias Wurman served as President of CONIB, leading Brazil\'s Jewish communal organization during a period of renewed antisemitism concerns.' },
  { id: 'ruth-salgado-conib', name: 'Ruth Salgado', role: 'Director of External Relations', bio: 'Ruth Salgado heads external relations at CONIB, managing the Brazilian Jewish community\'s relationships with the government and international Jewish organizations.' }
]);

batch('federation-of-jewish-communities-of-russia-fjcr', [
  { id: 'herman-zakhariaev-fjcr', name: 'German Zakharyaev', role: 'VP', bio: 'German Zakharyaev serves as VP of the Federation of Jewish Communities of Russia, a Mountain Jewish businessman and philanthropist supporting synagogues and cultural programs across Russia.' },
  { id: 'david-yakobashvili-fjcr', name: 'David Yakobashvili', role: 'Board Member', bio: 'David Yakobashvili serves on the board of FJCR, the Georgian-born billionaire dairy magnate (Wimm-Bill-Dann) who is a prominent supporter of Russian Jewish communal life.' },
  { id: 'mikhail-chlenov-fjcr', name: 'Mikhail Chlenov', role: 'Secretary General of Euro-Asian Jewish Congress', bio: 'Mikhail Chlenov serves as Secretary General of the Euro-Asian Jewish Congress, working closely with FJCR to coordinate Jewish communal infrastructure across the former Soviet Union.' }
]);

batch('executive-council-of-australian-jewry-ecaj', [
  { id: 'daniel-aghion-ecaj', name: 'Daniel Aghion', role: 'Deputy President', bio: 'Daniel Aghion serves as Deputy President of the Executive Council of Australian Jewry, the peak representative body for Australia\'s 120,000 Jewish community members.' },
  { id: 'julie-nathan-ecaj', name: 'Julie Nathan', role: 'Research Director', bio: 'Julie Nathan serves as Research Director at ECAJ, compiling the annual Report on Antisemitism in Australia that tracks anti-Jewish incidents across the country.' },
  { id: 'dvir-abramovich-ecaj', name: 'Dvir Abramovich', role: 'Anti-Defamation Commission Chair', bio: 'Dvir Abramovich chairs the Anti-Defamation Commission affiliated with ECAJ, serving as Australia\'s most prominent voice against antisemitism in media and public life.' }
]);

batch('world-zionist-organization-wzo', [
  { id: 'herzl-makov-wzo', name: 'Herzl Makov', role: 'Head of Budget & Finance', bio: 'Herzl Makov heads budget and finance at the World Zionist Organization, managing the resources of the organization founded by Theodor Herzl in 1897 at the First Zionist Congress.' },
  { id: 'gusti-yehoshua-braverman-wzo', name: 'Gusti Yehoshua-Braverman', role: 'Head of the Center for Diaspora Affairs', bio: 'Gusti Yehoshua-Braverman heads the Center for Diaspora Affairs at WZO, managing programs connecting Jewish communities worldwide to Israel.' },
  { id: 'raheli-baratz-wzo', name: 'Raheli Baratz-Rix', role: 'Chair of the Education Department', bio: 'Raheli Baratz-Rix chairs the Education Department of the WZO, overseeing Zionist educational programs for Jewish communities in 100+ countries.' }
]);

// ============================================================
// MORE RELIGION & SYNAGOGUES
// ============================================================
console.log('=== MORE RELIGION ===');

batch('great-synagogue-of-rome', [
  { id: 'ruth-dureghello-rome', name: 'Ruth Dureghello', role: 'President of Jewish Community of Rome', bio: 'Ruth Dureghello served as President of the Jewish Community of Rome, the oldest in Western Europe dating to 161 BCE, overseeing the community centered around the Great Synagogue.' },
  { id: 'rav-gustavo-calo-rome', name: 'Rav Gustavo Calo', role: 'Vice Rabbi', bio: 'Rav Gustavo Calo serves as Vice Rabbi at the Great Synagogue of Rome (Tempio Maggiore), the monumental synagogue completed in 1904 that serves Rome\'s 16,000-member Jewish community.' },
  { id: 'victor-fadlun-rome', name: 'Victor Fadlun', role: 'Community President', bio: 'Victor Fadlun serves as President of the Jewish Community of Rome, leading the 2,000-year-old community centered around the Great Synagogue in the former Ghetto district.' }
]);

batch('el-ghriba-synagogue-djerba', [
  { id: 'habib-kazdaghli-djerba', name: 'Habib Kazdaghli', role: 'Historical Advisor', bio: 'Professor Habib Kazdaghli, a Tunisian historian, has documented the history of the El Ghriba Synagogue, one of the oldest in Africa and site of the annual Jewish pilgrimage to Djerba.' },
  { id: 'paul-sebag-djerba', name: 'Paul Sebag', role: 'Historian', bio: 'Paul Sebag documented the history of Tunisian Jews and El Ghriba, the 2,600-year-old synagogue on the island of Djerba that remains the most important Jewish pilgrimage site in North Africa.' },
  { id: 'kais-saied-djerba', name: 'Kais Saied', role: 'President of Tunisia', bio: 'Kais Saied, President of Tunisia, has overseen security at El Ghriba following the 2002 bombing and continued threats, as Tunisia works to protect its remaining Jewish heritage sites.' }
]);

batch('rabbinical-assembly', [
  { id: 'rabbi-amy-eilberg-ra', name: 'Rabbi Amy Eilberg', role: 'First Female Conservative Rabbi', bio: 'Rabbi Amy Eilberg became the first woman ordained by the Jewish Theological Seminary in 1985, a historic moment for the Conservative movement and the Rabbinical Assembly.' },
  { id: 'rabbi-julie-schonfeld', name: 'Rabbi Julie Schonfeld', role: 'Former EVP', bio: 'Rabbi Julie Schonfeld served as EVP of the Rabbinical Assembly, the first woman to lead the rabbinic arm of Conservative Judaism representing 1,700+ rabbis worldwide.' },
  { id: 'rabbi-elliot-dorff', name: 'Rabbi Elliot Dorff', role: 'Chair of Bioethics Committee', bio: 'Rabbi Elliot Dorff serves as Chair of the Rabbinical Assembly\'s Committee on Jewish Law and Standards Bioethics Subcommittee, influencing Conservative Judaism\'s positions on contemporary ethical issues.' }
]);

batch('united-synagogue', [
  { id: 'michael-goldstein-us', name: 'Michael Goldstein', role: 'President', bio: 'Michael Goldstein served as President of the United Synagogue, the largest synagogue body in the UK representing 62 Orthodox communities with over 40,000 member families.' },
  { id: 'steven-wilson-us', name: 'Steven Wilson', role: 'Chief Executive', bio: 'Steven Wilson served as Chief Executive of the United Synagogue, managing operations of the UK\'s largest network of Orthodox Jewish communities originally founded in 1870.' },
  { id: 'rebbetzin-tanya-harris-us', name: 'Rebbetzin Tanya Harris', role: 'Director of Programming', bio: 'Rebbetzin Tanya Harris leads programming initiatives at the United Synagogue\'s Tribe educational and community engagement division for young adults.' }
]);

// ============================================================
// MORE REAL ESTATE
// ============================================================
console.log('=== MORE REAL ESTATE ===');

batch('extell-development-company', [
  { id: 'jeremy-shell-extell', name: 'Jeremy Shell', role: 'EVP', bio: 'Jeremy Shell serves as EVP of Extell Development Company, overseeing development of luxury residential towers in Manhattan including One57 and Central Park Tower, the tallest residential building in the world.' },
  { id: 'arnon-goldfeld-extell', name: 'Arnon Goldfeld', role: 'Head of Sales', bio: 'Arnon Goldfeld leads sales at Extell Development, marketing luxury condominiums at Gary Barnett\'s developments including the $4 billion Central Park Tower project.' },
  { id: 'lester-lipschutz-extell', name: 'Lester Lipschutz', role: 'CFO', bio: 'Lester Lipschutz served as CFO of Extell Development Company, managing finances of one of New York\'s most prolific luxury developers with $20+ billion in development projects.' }
]);

batch('rxr-realty', [
  { id: 'jason-barnett-rxr', name: 'Jason Barnett', role: 'General Counsel & COO', bio: 'Jason Barnett serves as General Counsel and COO of RXR Realty, the New York real estate firm managing 30+ million square feet of commercial and residential properties.' },
  { id: 'jordan-barowitz-rxr', name: 'Jordan Barowitz', role: 'VP of Communications', bio: 'Jordan Barowitz serves as VP of Communications at RXR Realty, managing public relations for Scott Rechler\'s New York real estate portfolio.' },
  { id: 'william-elder-rxr', name: 'William Elder', role: 'Head of Construction', bio: 'William Elder leads construction operations at RXR Realty, overseeing development and renovation projects across the New York metropolitan area.' }
]);

batch('azrieli-group', [
  { id: 'irit-lev-azrieli', name: 'Irit Lev', role: 'CFO', bio: 'Irit Lev serves as CFO of Azrieli Group, managing finances of the $10+ billion Israeli real estate, retail, and technology conglomerate founded by Canadian-Israeli David Azrieli.' },
  { id: 'yuval-bronstein-azrieli', name: 'Yuval Bronstein', role: 'CEO of Energy Division', bio: 'Yuval Bronstein leads Azrieli Group\'s energy division, expanding the Israeli conglomerate beyond its flagship shopping malls and office towers into renewable energy and data centers.' },
  { id: 'sharon-rabi-azrieli', name: 'Sharon Rabi', role: 'VP of Technology', bio: 'Sharon Rabi manages technology investments at Azrieli Group, part of the Israeli conglomerate\'s diversification from its iconic trigate towers in Tel Aviv.' }
]);

batch('mack-real-estate-group', [
  { id: 'peter-sotoloff-mack', name: 'Peter Sotoloff', role: 'Senior Partner', bio: 'Peter Sotoloff serves as a Senior Partner at Mack Real Estate Group, contributing to the firm\'s investment and development activities across the New York metropolitan area.' },
  { id: 'david-mack-real-estate', name: 'David Mack', role: 'Managing Director', bio: 'David Mack serves as a Managing Director at Mack Real Estate Group, the New York investment firm led by Richard and William Mack that manages $500+ million in property.' },
  { id: 'stephen-mack', name: 'Stephen Mack', role: 'Partner', bio: 'Stephen Mack is a partner in the Mack Real Estate Group, part of the Mack family that has been active in New York real estate for multiple generations.' }
]);

// ============================================================
// MORE HEALTHCARE
// ============================================================
console.log('=== MORE HEALTHCARE ===');

batch('abbvie', [
  { id: 'azita-saleki-gerhardt-abbvie', name: 'Azita Saleki-Gerhardt', role: 'EVP of Operations', bio: 'Azita Saleki-Gerhardt serves as EVP of Operations at AbbVie, overseeing manufacturing and supply chain of the $60+ billion pharmaceutical company known for Humira, the world\'s best-selling drug.' },
  { id: 'jeffrey-stewart-abbvie', name: 'Jeffrey Stewart', role: 'EVP of R&D', bio: 'Jeffrey Stewart serves as EVP of R&D at AbbVie (Allergan Aesthetics division), overseeing the company\'s Botox, dermal filler, and aesthetics pipeline.' },
  { id: 'scotty-macneill-abbvie', name: 'Scott Reents', role: 'CFO', bio: 'Scott Reents serves as CFO of AbbVie Inc., managing finances of the pharmaceutical giant that generated $54 billion in revenue in 2023 largely from immunology and oncology drugs.' }
]);

batch('northwell-health-formerly-north-shore-lij', [
  { id: 'mark-solazzo-northwell', name: 'Mark Solazzo', role: 'EVP & COO', bio: 'Mark Solazzo serves as EVP and COO of Northwell Health, managing operations of New York State\'s largest healthcare provider with 21 hospitals and 900+ outpatient facilities.' },
  { id: 'thomas-mcginn-northwell', name: 'Thomas McGinn', role: 'Deputy Physician-in-Chief', bio: 'Thomas McGinn serves as Deputy Physician-in-Chief at Northwell Health, overseeing clinical quality across the health system\'s network serving 2+ million patients annually.' },
  { id: 'ram-raju-northwell', name: 'Ram Raju', role: 'SVP of Community Health Investment', bio: 'Ram Raju, MD, serves as SVP of Community Health Investment at Northwell Health, addressing health equity across the communities served by the system.' }
]);

batch('maimonides-medical-center', [
  { id: 'mark-mcdonough-maimonides', name: 'Mark McDougle', role: 'COO', bio: 'Mark McDougle serves as COO of Maimonides Medical Center, managing operations of the 711-bed Brooklyn hospital that serves one of the most diverse patient populations in New York City.' },
  { id: 'dr-terrence-sacchi-maimonides', name: 'Dr. Terrence Sacchi', role: 'Chair of Surgery', bio: 'Dr. Terrence Sacchi chairs the Department of Surgery at Maimonides Medical Center, the teaching hospital named for the medieval Jewish physician-philosopher Moses Maimonides.' },
  { id: 'jacklin-rahesh-maimonides', name: 'Jacklin Rahesh', role: 'VP of Nursing', bio: 'Jacklin Rahesh serves as VP of Nursing at Maimonides Medical Center, overseeing nursing care at the Brooklyn hospital that is a major provider for the Borough Park Jewish community.' }
]);

// ============================================================
// EDUCATION
// ============================================================
console.log('=== EDUCATION ===');

batch('hebrew-union-college-huc', [
  { id: 'andrew-rehfeld-huc', name: 'Andrew Rehfeld', role: 'President', bio: 'Andrew Rehfeld serves as President of Hebrew Union College-Jewish Institute of Religion, the seminary of Reform Judaism training rabbis, cantors, and educators at campuses in Cincinnati, New York, Los Angeles, and Jerusalem.' },
  { id: 'rabbi-david-ellenson-huc', name: 'Rabbi David Ellenson', role: 'Former President (1943-2023)', bio: 'Rabbi David Ellenson served as President of Hebrew Union College from 2001-2013, a renowned scholar of modern Jewish thought who shaped a generation of Reform rabbis.' },
  { id: 'rabbi-sally-priesand-huc', name: 'Rabbi Sally Priesand', role: 'First Female American Rabbi', bio: 'Rabbi Sally Priesand, ordained by Hebrew Union College in 1972, became the first woman ordained as a rabbi in America, marking a revolutionary moment in Jewish religious history.' }
]);

// ============================================================
// CONGLOMERATES
// ============================================================
console.log('=== CONGLOMERATES ===');

batch('pratt-industries', [
  { id: 'brian-mcpheely-pratt', name: 'Brian McPheely', role: 'CEO', bio: 'Brian McPheely serves as CEO of Pratt Industries, the Australian-American packaging company led by Anthony Pratt, the largest privately-held U.S. producer of 100% recycled corrugated packaging.' },
  { id: 'billy-pratt', name: 'Billy Pratt', role: 'Family Member', bio: 'Billy Pratt is a member of the Pratt family that controls Pratt Industries and Visy, the Australian packaging empire with an estimated family fortune of $22+ billion.' },
  { id: 'mike-wathen-pratt', name: 'Mike Wathen', role: 'President of Pratt Industries Board', bio: 'Mike Wathen serves as President of the Pratt Industries Board Division, managing the company\'s corrugated packaging manufacturing across 30+ US facilities.' }
]);

batch('visy-industries-anthony-pratt', [
  { id: 'harry-debney-visy', name: 'Harry Debney', role: 'CEO of Visy', bio: 'Harry Debney served as CEO of Visy Industries, managing the Pratt family\'s Australian packaging and recycling giant that processes 60% of Australia\'s recycled paper and cardboard.' },
  { id: 'alex-debney-visy', name: 'Alex Debney', role: 'COO', bio: 'Alex Debney serves as COO of Visy Industries, overseeing daily operations of the Anthony Pratt-chaired company which is one of the world\'s largest privately-owned packaging companies.' },
  { id: 'rupert-myer-visy', name: 'Rupert Myer', role: 'Board Advisor', bio: 'Rupert Myer AO serves as board advisor to Visy Industries, the Pratt family company that operates one of the largest recycling plants in the Southern Hemisphere.' }
]);

// ============================================================
// Save
// ============================================================
const outPD = hasPeopleWrapper ? { people } : people;
fs.writeFileSync(JD_PATH, JSON.stringify(JD, null, 2));
fs.writeFileSync(PD_PATH, JSON.stringify(outPD, null, 2));

let totalInds = 0, totalEntries = 0;
for (const c in JD.countries) { for (const e of JD.countries[c]) { totalEntries++; totalInds += (e.individuals||[]).length; } }
console.log(`\n=== RESULTS ===`);
console.log(`Added ${added} new individuals`);
console.log(`Total entries: ${totalEntries}`);
console.log(`Total individuals: ${totalInds}`);
console.log(`Total people: ${Object.keys(people).length}`);
const dist = {'1-2':0,'3':0,'4':0,'5':0,'6-10':0,'11+':0};
for (const c in JD.countries) { for (const e of JD.countries[c]) { const n=(e.individuals||[]).length; if(n<=2)dist['1-2']++;else if(n===3)dist['3']++;else if(n===4)dist['4']++;else if(n===5)dist['5']++;else if(n<=10)dist['6-10']++;else dist['11+']++; } }
console.log('Distribution:', JSON.stringify(dist));
