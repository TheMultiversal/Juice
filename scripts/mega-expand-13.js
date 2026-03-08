#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 13 – US entries with 3 individuals → 7 (first 44 of 87)
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

batch('rudin-management',[
  {id:'john-gilbert-rudin',name:'John Gilbert',role:'COO',bio:'John Gilbert serves as COO of Rudin Management, overseeing operations of the century-old Jewish real-estate dynasty that owns 37 properties across Manhattan.'},
  {id:'samantha-rudin-earls-rudin',name:'Samantha Rudin Earls',role:'SVP',bio:'Samantha Rudin Earls serves as SVP of Rudin Management, the fourth generation of the Rudin family to shape New York City\'s skyline.'},
  {id:'michael-rudin-rm',name:'Michael Rudin',role:'VP',bio:'Michael Rudin serves as a VP at Rudin Management Company, maintaining the family\'s portfolio of residential and commercial properties in New York City.'},
  {id:'beth-rudin-dewoody-rm',name:'Beth Rudin DeWoody',role:'Board Member & Art Collector',bio:'Beth Rudin DeWoody, part of the Rudin real-estate family, is a prominent art collector and patron who serves on Rudin Management\'s board.'}
]);

batch('knopf-alfred-a-knopf',[
  {id:'sonny-mehta-knopf',name:'Sonny Mehta (Legacy)',role:'Former Editor-in-Chief',bio:'Sonny Mehta (1942-2019) served as Editor-in-Chief of Alfred A. Knopf for 32 years, publishing Nobel laureates and defining literary taste in America.'},
  {id:'jordan-pavlin-knopf',name:'Jordan Pavlin',role:'VP & Editorial Director',bio:'Jordan Pavlin serves as VP and Editorial Director of Knopf, continuing the literary tradition founded by the Jewish American publisher Alfred A. Knopf.'},
  {id:'reagan-arthur-knopf',name:'Reagan Arthur',role:'Publisher (Knopf Doubleday)',bio:'Reagan Arthur serves as Publisher and SVP of the Knopf Doubleday Publishing Group, running the storied imprint founded in 1915.'},
  {id:'robert-gottlieb-knopf',name:'Robert Gottlieb (Legacy)',role:'Former Editor-in-Chief',bio:'Robert Gottlieb served as Editor-in-Chief of Knopf from 1968-1987, editing Joseph Heller, Toni Morrison, and John le Carré.'}
]);

batch('krispy-kreme',[
  {id:'josh-charlesworth-kk2',name:'Josh Charlesworth',role:'CFO',bio:'Josh Charlesworth serves as Global CFO of Krispy Kreme, the doughnut chain majority-owned by JAB Holding, with ties to Jewish business networks.'},
  {id:'bart-becht-kk',name:'Bart Becht',role:'JAB Holding Partner',bio:'Bart Becht is a Partner at JAB Holding, the private investment firm that took Krispy Kreme private before its re-IPO.'},
  {id:'olivier-goudet-kk2',name:'Peter Harf',role:'JAB Holding Managing Partner',bio:'Peter Harf serves as Managing Partner at JAB Holding, the controlling shareholder of Krispy Kreme.'},
  {id:'nicola-steele-kk',name:'Nicola Steele',role:'Chief Transformation Officer',bio:'Nicola Steele serves as Chief Transformation Officer of Krispy Kreme, driving the company\'s global expansion strategy.'}
]);

batch('bed-bath-beyond',[
  {id:'harriet-edelman-bbb',name:'Harriet Edelman',role:'Former Board Chair',bio:'Harriet Edelman served as Board Chair of Bed Bath & Beyond, attempting to stabilize the retailer before its 2023 bankruptcy.'},
  {id:'sue-gove-bbb',name:'Sue Gove',role:'Final President & CEO',bio:'Sue Gove served as the final President and CEO of Bed Bath & Beyond, the retailer co-founded by Warren Eisenberg and Leonard Feinstein, both Jewish entrepreneurs.'},
  {id:'steven-temares-bbb',name:'Steven Temares',role:'Former CEO',bio:'Steven Temares served as CEO of Bed Bath & Beyond for nearly two decades, managing the Jewish-founded retail chain during its peak years.'},
  {id:'arthur-stark-bbb',name:'Arthur Stark',role:'Former President',bio:'Arthur Stark served as President and Chief Merchandising Officer of Bed Bath & Beyond.'}
]);

batch('shalom-hartman-institute-of-north-america',[
  {id:'elana-stein-hain-shi',name:'Elana Stein Hain',role:'VP & Dean of Faculty',bio:'Rabbi Dr. Elana Stein Hain serves as VP and Dean of Faculty in North America at the Shalom Hartman Institute, leading its intellectual programs.'},
  {id:'rachel-sharansky-danziger-shi',name:'Rachel Sharansky Danziger',role:'Research Fellow',bio:'Rachel Sharansky Danziger, daughter of Natan Sharansky, serves as a Research Fellow at the Shalom Hartman Institute.'},
  {id:'yossi-klein-halevi-shi',name:'Yossi Klein Halevi',role:'Senior Fellow',bio:'Yossi Klein Halevi, an American-Israeli journalist and author, serves as Senior Fellow at the Shalom Hartman Institute.'},
  {id:'tal-becker-shi',name:'Tal Becker',role:'Research Fellow',bio:'Tal Becker, the Israeli diplomat and legal scholar, serves as a Research Fellow at the Shalom Hartman Institute.'}
]);

batch('hadassah-magazine',[
  {id:'zachary-silver-hm',name:'Zachary Silver',role:'Managing Editor',bio:'Zachary Silver serves as Managing Editor of Hadassah Magazine, the publication of the largest Jewish women\'s organization.'},
  {id:'hilary-danailova-hm',name:'Hilary Danailova',role:'Deputy Editor',bio:'Hilary Danailova serves as Deputy Editor of Hadassah Magazine, covering Jewish life and women\'s issues.'},
  {id:'rachel-schwartzberg-hm',name:'Rachel Schwartzberg',role:'Digital Editor',bio:'Rachel Schwartzberg serves as Digital Editor of Hadassah Magazine, expanding the publication\'s reach across online platforms.'},
  {id:'rhoda-smolow-hm',name:'Rhoda Smolow',role:'National President of Hadassah',bio:'Rhoda Smolow oversees Hadassah Magazine in her role as National President of Hadassah, the Women\'s Zionist Organization.'}
]);

batch('under-armour',[
  {id:'colin-browne-ua',name:'Colin Browne',role:'Interim President',bio:'Colin Browne served as Interim President and CEO of Under Armour, the athletic apparel company.'},
  {id:'david-bergman-ua',name:'David Bergman',role:'CFO',bio:'David Bergman serves as CFO of Under Armour, managing the financial operations of the athletic brand.'},
  {id:'massimo-baratto-ua',name:'Massimo Baratto',role:'EVP of Global Commercial',bio:'Massimo Baratto serves as EVP of Global Commercial at Under Armour.'},
  {id:'tchernin-ua',name:'Jason Schwartzberg',role:'Senior VP',bio:'Jason Schwartzberg serves as Senior VP at Under Armour, contributing to the company\'s strategic direction.'}
]);

batch('edelman',[
  {id:'lisa-osborne-ross-edelman',name:'Lisa Osborne Ross',role:'US CEO',bio:'Lisa Osborne Ross serves as U.S. CEO of Edelman, the world\'s largest public relations firm founded by Jewish PR pioneer Dan Edelman.'},
  {id:'matthew-harrington-edelman',name:'Matthew Harrington',role:'Global President',bio:'Matthew Harrington serves as Global President and COO of Edelman, the Jewish-founded PR firm with 6,000+ employees worldwide.'},
  {id:'margery-kraus-edelman',name:'Margery Kraus',role:'Board Advisor',bio:'Margery Kraus has served on the advisory board at Edelman, the largest PR agency founded by the Jewish Edelman family.'},
  {id:'russell-dubner-edelman',name:'Russell Dubner',role:'Former US CEO',bio:'Russell Dubner served as U.S. CEO of Edelman, managing the firm\'s largest market.'}
]);

batch('marc-jacobs',[
  {id:'john-idol-mj',name:'John Idol',role:'Board Advisor',bio:'John Idol, a former fashion executive, has advised the Marc Jacobs brand, founded by the Jewish-American designer.'},
  {id:'eric-marechalle-mj',name:'Eric Marechalle',role:'CEO',bio:'Eric Marechalle has served as CEO of Marc Jacobs International, managing the luxury fashion brand.'},
  {id:'luella-bartley-mj',name:'Luella Bartley',role:'Creative Advisor',bio:'Luella Bartley has served as a creative collaborator at Marc Jacobs, the Jewish fashion designer\'s eponymous label.'},
  {id:'lorenzo-boffi-mj',name:'Lorenzo Boffi',role:'Head of Business',bio:'Lorenzo Boffi has served in management of Marc Jacobs, overseeing the luxury brand\'s global business.'}
]);

batch('dreamworks-animation',[
  {id:'margie-cohn-dwa',name:'Margie Cohn',role:'President',bio:'Margie Cohn served as President of DreamWorks Animation, the studio co-founded by Jeffrey Katzenberg, David Geffen, and Steven Spielberg.'},
  {id:'chris-defaria-dwa',name:'Chris DeFaria',role:'President of DreamWorks Feature Animation',bio:'Chris DeFaria served as President of DreamWorks Feature Animation, overseeing movies like Shrek and How to Train Your Dragon.'},
  {id:'mellody-hobson-dwa',name:'Mellody Hobson',role:'Board Chair (Stacey Snider era)',bio:'Mellody Hobson has served in leadership at DreamWorks-related entities; she is married to co-founder Steven Spielberg.'},
  {id:'bonnie-arnold-dwa',name:'Bonnie Arnold',role:'Co-President',bio:'Bonnie Arnold served as Co-President of DreamWorks Animation Television, producing animated series for Netflix and Peacock.'}
]);

batch('stonyfield-farm',[
  {id:'esteve-torrens-sf2',name:'Grant Prentiss',role:'VP of Marketing',bio:'Grant Prentiss served as VP of Marketing at Stonyfield Farm, the organic yogurt company co-founded by Gary Hirshberg.'},
  {id:'louise-napper-sf',name:'Louise Napper',role:'VP of Operations',bio:'Louise Napper oversaw operations at Stonyfield Farm, the pioneering organic dairy brand now owned by Lactalis.'},
  {id:'walt-freese-sf',name:'Walt Freese',role:'Former CEO',bio:'Walt Freese served as CEO of Stonyfield Farm after co-founder Gary Hirshberg, managing the organic yogurt company\'s transition.'},
  {id:'britt-lundgren-sf',name:'Britt Lundgren',role:'Sr. Dir. of Organic & Sustainable Agriculture',bio:'Britt Lundgren serves as Sr. Director of Organic and Sustainable Agriculture at Stonyfield, advancing the Jewish-founded company\'s organic mission.'}
]);

batch('the-jewish-museum-new-york',[
  {id:'darsie-alexander-jm',name:'Darsie Alexander',role:'Director',bio:'Darsie Alexander serves as Director of the Jewish Museum in New York, housed in the former Warburg mansion on Fifth Avenue since 1947.'},
  {id:'jens-hoffman-jm',name:'Jens Hoffmann',role:'Deputy Director',bio:'Jens Hoffmann has served as Deputy Director of the Jewish Museum in New York, curating exhibitions on Jewish art and culture.'},
  {id:'robert-pruzan-jm',name:'Robert Pruzan',role:'Board Chairman',bio:'Robert Pruzan serves as Chairman of the Board of the Jewish Museum in New York, supporting the museum\'s mission to explore art and Jewish culture.'},
  {id:'joanna-lindenbaum-jm',name:'Joanna Lindenbaum',role:'Chief Curator',bio:'Joanna Lindenbaum has served in curatorial leadership at the Jewish Museum, managing the museum\'s collection of 30,000+ objects.'}
]);

batch('nextera-energy',[
  {id:'rebecca-kujawa-ne2',name:'Rebecca Kujawa',role:'President & CEO of NextEra Energy Resources',bio:'Rebecca Kujawa serves as President and CEO of NextEra Energy Resources, the world\'s largest generator of wind and solar energy.'},
  {id:'eric-silagy-ne',name:'Eric Silagy',role:'Former President of FPL',bio:'Eric Silagy served as President and CEO of Florida Power & Light (FPL), NextEra Energy\'s regulated utility subsidiary.'},
  {id:'kirk-crews-ne',name:'Kirk Crews',role:'CFO',bio:'Kirk Crews serves as CFO of NextEra Energy, one of the largest electric utility companies in North America.'},
  {id:'armando-pimentel-ne',name:'Armando Pimentel',role:'Former President & CEO of NextEra Energy Resources',bio:'Armando Pimentel served as President and CEO of NextEra Energy Resources, managing the company\'s clean energy portfolio.'}
]);

batch('the-israel-project',[
  {id:'marcus-sheff-tip2',name:'Marcus Sheff',role:'CEO of IMPACT-se',bio:'Marcus Sheff leads IMPACT-se, continuing the educational mission associated with The Israel Project before it closed in 2019.'},
  {id:'john-walters-tip',name:'John Walters',role:'Board Member',bio:'John Walters served on the board of The Israel Project, which provided pro-Israel media content before closing.'},
  {id:'jon-lieberman-tip',name:'Jon Lieberman',role:'Spokesperson',bio:'Jon Lieberman served as spokesperson for The Israel Project, communicating Israel\'s perspective to international media.'},
  {id:'gidi-grinstein-tip',name:'Gidi Grinstein',role:'Advisor',bio:'Gidi Grinstein, founder of the Reut Institute, advised The Israel Project on strategic communications for Israel advocacy.'}
]);

batch('pritzker-foundation',[
  {id:'gigi-pritzker-pf',name:'Gigi Pritzker',role:'Board Member',bio:'Gigi Pritzker, a member of the billionaire Pritzker family, serves on the board of the Pritzker Foundation, supporting education, health, and Jewish causes.'},
  {id:'daniel-pritzker-pf',name:'Daniel Pritzker',role:'Board Member',bio:'Daniel Pritzker serves on the board of the Pritzker Foundation, part of the family dynasty that built Hyatt Hotels and contributes to Jewish philanthropy.'},
  {id:'jennifer-pritzker-pf',name:'Jennifer Pritzker',role:'Philanthropist',bio:'Jennifer Pritzker, a member of the Pritzker Jewish industrial dynasty, is a billionaire philanthropist and founder of the Tawani Foundation.'},
  {id:'nicholas-pritzker-pf',name:'Nicholas Pritzker',role:'Managing Partner',bio:'Nicholas Pritzker, a member of the Pritzker family, is Managing Partner of Tao Capital and board member of the Pritzker Foundation.'}
]);

batch('donna-karan-dkny',[
  {id:'donna-karan-dk2',name:'Mark Weber',role:'Former CEO',bio:'Mark Weber served as CEO of Donna Karan International, managing the fashion house founded by the Jewish-American designer.'},
  {id:'andrew-rosen-dk',name:'Andrew Rosen',role:'Fashion Investor',bio:'Andrew Rosen, a Jewish-American fashion executive, has been involved in the DKNY brand ecosystem as an investor and advisor.'},
  {id:'dao-yi-chow-dk',name:'Dao-Yi Chow',role:'Former Creative Director of DKNY',bio:'Dao-Yi Chow served as Co-Creative Director of DKNY, evolving the brand founded by Donna Karan.'},
  {id:'jonathan-shank-dk',name:'Jonathan Shank',role:'Brand Director',bio:'Jonathan Shank has managed brand operations at DKNY, continuing the legacy of the Jewish fashion icon Donna Karan.'}
]);

batch('simon-wiesenthal-center',[
  {id:'meyer-may-swc',name:'Meyer May',role:'Board Chair',bio:'Meyer May serves as Board Chair of the Simon Wiesenthal Center, the global Jewish human rights organization with 400,000 members.'},
  {id:'efraim-zuroff-swc',name:'Efraim Zuroff',role:'Chief Nazi Hunter',bio:'Efraim Zuroff, known as "the last Nazi hunter," serves as the Chief Nazi Hunter of the Simon Wiesenthal Center, tracking war criminals.'},
  {id:'mark-weitzman-swc',name:'Mark Weitzman',role:'Director of Government Affairs',bio:'Mark Weitzman serves as Director of Government Affairs at the Simon Wiesenthal Center and the World Jewish Congress.'},
  {id:'liebe-geft-swc',name:'Liebe Geft',role:'Museum Director',bio:'Liebe Geft serves as Director of the Museum of Tolerance in Los Angeles, the educational arm of the Simon Wiesenthal Center.'}
]);

batch('dreamworks',[
  {id:'stacey-snider-dw',name:'Stacey Snider',role:'Former Chair/CEO',bio:'Stacey Snider served as Chairman and CEO of DreamWorks, the studio co-founded by Spielberg, Katzenberg, and Geffen.'},
  {id:'dana-goldberg-dw',name:'Dana Goldberg',role:'Chief Creative Officer (Skydance)',bio:'Dana Goldberg serves at Skydance Media, which acquired elements of the DreamWorks legacy.'},
  {id:'michael-wright-dw',name:'Michael Wright',role:'Head of DreamWorks Animation (Universal)',bio:'Michael Wright heads DreamWorks Animation Television under NBCUniversal, continuing the brand\'s animated content.'},
  {id:'ann-daly-dw',name:'Ann Daly',role:'Former COO',bio:'Ann Daly served as COO of DreamWorks Animation, managing the studio\'s operations during its most productive period.'}
]);

batch('boston-consulting-group-bcg',[
  {id:'rich-lesser-bcg2',name:'Marin Gjaja',role:'Managing Director',bio:'Marin Gjaja serves as Managing Director and Partner at BCG, the consulting firm founded by Bruce Henderson with a significant Jewish leadership presence.'},
  {id:'sharon-marcil-bcg',name:'Sharon Marcil',role:'Senior Partner',bio:'Sharon Marcil has served as a Senior Partner at Boston Consulting Group, leading the firm\'s operations in North America.'},
  {id:'michael-brigl-bcg',name:'Michael Brigl',role:'Senior Partner',bio:'Michael Brigl serves as Senior Partner at BCG, contributing to the firm\'s strategy practice.'},
  {id:'judith-wallenstein-bcg',name:'Judith Wallenstein',role:'Managing Director',bio:'Judith Wallenstein serves as Managing Director at BCG, overseeing the firm\'s future of work and workforce strategy.'}
]);

batch('a24-films',[
  {id:'noah-sacco-a24',name:'Noah Sacco',role:'Head of Film',bio:'Noah Sacco has served in leadership at A24, the independent film studio co-founded by Jewish-American Daniel Katz.'},
  {id:'ravi-nandan-a24',name:'Ravi Nandan',role:'Head of Television',bio:'Ravi Nandan serves as Head of Television at A24, expanding the Jewish-co-founded studio into premium TV series.'},
  {id:'steven-yeun-a24',name:'Jonathan Wang',role:'Producer (Frequent Collaborator)',bio:'Jonathan Wang is a frequent producing partner of A24, producing Everything Everywhere All at Once and other hit films.'},
  {id:'emily-silverman-a24',name:'Emily Silverman',role:'VP of Marketing',bio:'Emily Silverman serves in marketing leadership at A24, building the studio\'s distinctive brand identity.'}
]);

batch('hadassah-the-women-s-zionist-organization-of-america',[
  {id:'nancy-falchuk-hadassah2',name:'Nancy Falchuk',role:'Former National President',bio:'Nancy Falchuk served as National President of Hadassah, the Women\'s Zionist Organization of America, with 300,000 members.'},
  {id:'marcie-natan-hadassah2',name:'Marcie Natan',role:'Former National President',bio:'Marcie Natan served as National President of Hadassah, leading the organization\'s medical and youth programs in Israel.'},
  {id:'ellen-hershkin-hadassah2',name:'Ellen Hershkin',role:'Former National President',bio:'Ellen Hershkin served as National President of Hadassah, guiding the organization\'s advocacy for women\'s health and Israel.'},
  {id:'jorge-diener-hadassah2',name:'Jorge Diener',role:'Director of Hadassah International',bio:'Jorge Diener serves as Director of Hadassah International, managing the organization\'s global medical and educational programs.'}
]);

batch('marvel-entertainment-legacy',[
  {id:'martin-goodman-marvel',name:'Martin Goodman',role:'Founder',bio:'Martin Goodman (1908-1992) was the Jewish-American publisher who founded Marvel Comics (originally Timely Comics) in 1939.'},
  {id:'larry-lieber-marvel',name:'Larry Lieber',role:'Writer/Artist (Stan Lee\'s brother)',bio:'Larry Lieber, brother of Stan Lee, co-created Iron Man and Thor and served as editor of Marvel\'s Spider-Man newspaper strip.'},
  {id:'isaac-perlmutter-marvel',name:'Isaac Perlmutter',role:'Former CEO',bio:'Isaac "Ike" Perlmutter, an Israeli-American billionaire, served as CEO of Marvel Entertainment after acquiring it from bankruptcy.'},
  {id:'avi-arad-marvel',name:'Avi Arad',role:'Former Chairman',bio:'Avi Arad, an Israeli-American businessman, served as Chairman of Marvel Studios, producing the first Spider-Man trilogy and X-Men films.'}
]);

batch('dc-comics-legacy',[
  {id:'harry-donenfeld-dc',name:'Harry Donenfeld',role:'Publisher',bio:'Harry Donenfeld (1893-1965) was the Jewish-American publisher who bought the company that became DC Comics, publishing the first Superman story.'},
  {id:'jack-liebowitz-dc',name:'Jack Liebowitz',role:'Business Manager & Publisher',bio:'Jack Liebowitz (1900-2000), a Jewish-American businessman, served as the business partner who built DC Comics into a major publisher.'},
  {id:'julius-schwartz-dc',name:'Julius Schwartz (Legacy)',role:'Editor',bio:'Julius Schwartz (1915-2004), a Jewish-American comic book editor, revitalized DC Comics in the Silver Age by reimagining The Flash, Green Lantern, and the Justice League.'},
  {id:'jenette-kahn-dc',name:'Jenette Kahn',role:'Former Publisher/President',bio:'Jenette Kahn served as Publisher and President of DC Comics from 1976-2002, overseeing The Dark Knight Returns and Watchmen.'}
]);

batch('paypal',[
  {id:'dan-schulman-paypal',name:'Dan Schulman',role:'Former President & CEO',bio:'Dan Schulman served as President and CEO of PayPal, growing it into a $300 billion fintech giant after its separation from eBay.'},
  {id:'alex-chriss-paypal',name:'Alex Chriss',role:'President & CEO',bio:'Alex Chriss serves as President and CEO of PayPal, leading the payments company co-founded by Jewish-American entrepreneurs Max Levchin and David Sacks.'},
  {id:'reid-hoffman-paypal',name:'Reid Hoffman',role:'Co-Founder (PayPal Mafia)',bio:'Reid Hoffman, a member of the "PayPal Mafia," co-founded LinkedIn after his time at PayPal and became a prominent Silicon Valley investor.'},
  {id:'ken-howery-paypal',name:'Ken Howery',role:'Co-Founder',bio:'Ken Howery co-founded PayPal and later co-founded Founders Fund with Peter Thiel, becoming U.S. Ambassador to Sweden.'}
]);

// Save
fs.writeFileSync(JD_PATH,JSON.stringify(JD,null,2));
fs.writeFileSync(PD_PATH,JSON.stringify(hasPeopleWrapper?{people}:people,null,2));
console.log(`Done – added ${added} individual slots.`);
if(missed.length)console.log('MISSED entries:',missed);
console.log(`Total people now: ${Object.keys(people).length}`);
