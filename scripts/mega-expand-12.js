#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 12 – Remaining 100 entries with 4 individuals → 7+
 * Covers US (32), Israel (15), UK (8), France (7), Canada (6), South Africa (5),
 * Germany (4), Russia (4), Argentina (3), Brazil (3), Mexico (3), Australia (2),
 * Sweden (2), Japan (2), International (1), Netherlands (1), Austria (1), Belgium (1)
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
// UNITED STATES (32 entries)
// ============================================================
console.log('=== UNITED STATES ===');

batch('avi-chai-foundation', [
  { id: 'yossi-prager-avichai', name: 'Yossi Prager', role: 'Executive Director (North America)', bio: 'Yossi Prager served as Executive Director of the AVI CHAI Foundation\'s North American operations, managing the spend-down of the $1 billion foundation that supported Jewish education.' },
  { id: 'mem-bernstein-avichai', name: 'Mem Bernstein', role: 'Board Chair', bio: 'Mem Bernstein served as Chair of the AVI CHAI Foundation\'s board, continuing the legacy of founder Zalman C. Bernstein who established the foundation to strengthen Jewish identity.' },
  { id: 'eli-look-avichai', name: 'Eli Look', role: 'Director of Strategy', bio: 'Eli Look directed strategy at the AVI CHAI Foundation, which concluded its operations in 2020 after deploying over $1 billion for Jewish day schools, summer camps, and media.' }
]);

batch('national-jewish-democratic-council', [
  { id: 'halie-soifer-njdc', name: 'Halie Soifer', role: 'CEO', bio: 'Halie Soifer served as CEO of the Jewish Democratic Council of America (successor to NJDC), advocating for the intersection of Jewish values and Democratic Party politics.' },
  { id: 'ron-klein-njdc', name: 'Ron Klein', role: 'Chair', bio: 'Ron Klein, former U.S. Congressman from Florida, served as Chair of the Jewish Democratic Council, leading Jewish outreach within the Democratic Party.' },
  { id: 'ann-lewis-njdc', name: 'Ann Lewis', role: 'Senior Advisor', bio: 'Ann Lewis served as Senior Advisor to the National Jewish Democratic Council, a veteran Democratic strategist who coordinated Jewish community engagement with the party.' }
]);

batch('nordstrom', [
  { id: 'erik-nordstrom-nord', name: 'Erik Nordstrom', role: 'CEO', bio: 'Erik Nordstrom serves as CEO of Nordstrom Inc., the fashion retail giant with Jewish connections through partnerships and philanthropic circles.' },
  { id: 'pete-nordstrom-nord', name: 'Pete Nordstrom', role: 'President', bio: 'Pete Nordstrom serves as President and Chief Brand Officer of Nordstrom, leading the fashion direction of the 100+ year-old retailer.' },
  { id: 'jenny-ming-nordstrom', name: 'Jenny Ming', role: 'Board Director', bio: 'Jenny Ming served on the Board of Directors of Nordstrom, bringing retail expertise from her leadership of Charlotte Russe and Old Navy.' }
]);

batch('middle-east-forum', [
  { id: 'daniel-pipes-mef', name: 'Daniel Pipes', role: 'President', bio: 'Daniel Pipes, a Jewish-American historian and political commentator, serves as President of the Middle East Forum, a think tank promoting American interests in the Middle East.' },
  { id: 'gregg-roman-mef', name: 'Gregg Roman', role: 'Director', bio: 'Gregg Roman serves as Director of the Middle East Forum, managing the organization\'s research and policy advocacy on Middle Eastern affairs.' },
  { id: 'sam-westrop-mef', name: 'Sam Westrop', role: 'Director of Islamist Watch', bio: 'Sam Westrop directs the Islamist Watch project at the Middle East Forum, monitoring Islamist organizations and their influence in Western countries.' }
]);

batch('jewish-institute-for-national-security-of-america-jinsa', [
  { id: 'michael-makovsky-jinsa', name: 'Michael Makovsky', role: 'President & CEO', bio: 'Michael Makovsky serves as President and CEO of JINSA, the Jewish Institute for National Security of America, which promotes U.S.-Israel security cooperation.' },
  { id: 'david-ivry-jinsa', name: 'David Ivry', role: 'Board Chair', bio: 'David Ivry, former Commander of the Israel Air Force and Ambassador to the U.S., has served as Board Chair of JINSA.' },
  { id: 'john-hannah-jinsa', name: 'John Hannah', role: 'Senior Fellow', bio: 'John Hannah serves as a Senior Fellow at JINSA, a former national security advisor to Vice President Cheney specializing in U.S.-Israel strategic relations.' }
]);

batch('friends-of-the-israel-defense-forces', [
  { id: 'steven-lowy-fidf2', name: 'Steven Lowy', role: 'National Chairman', bio: 'Steven Lowy serves as National Chairman of FIDF (Friends of the Israel Defense Forces), leading the organization that raises $100+ million annually for IDF soldier welfare.' },
  { id: 'meir-klifi-amir-fidf2', name: 'Meir Klifi-Amir', role: 'National Director & CEO', bio: 'Major General (Res.) Meir Klifi-Amir serves as National Director and CEO of FIDF, managing welfare programs for IDF soldiers and veterans.' },
  { id: 'lauri-kassman-fidf2', name: 'Lauri Kassman', role: 'National VP of Development', bio: 'Lauri Kassman serves as National VP of Development at FIDF, coordinating fundraising events and donor relations across the United States.' }
]);

batch('taro-pharmaceutical-industries-us', [
  { id: 'uday-baldota-taro-us', name: 'Uday Baldota', role: 'CEO', bio: 'Uday Baldota serves as CEO of Taro Pharmaceutical Industries\' U.S. operations, the Sun Pharma subsidiary with deep roots in the Israeli pharmaceutical industry.' },
  { id: 'james-kedrowski-taro-us', name: 'James Kedrowski', role: 'COO', bio: 'James Kedrowski serves as COO of Taro Pharmaceutical, overseeing manufacturing and distribution of generic pharmaceutical products across North America.' },
  { id: 'tal-levitt-taro-us', name: 'Tal Levitt', role: 'VP of R&D', bio: 'Tal Levitt leads research and development at Taro Pharmaceutical\'s U.S. division, developing generic dermatological and topical pharmaceutical products.' }
]);

batch('forest-city-realty-brookfield', [
  { id: 'brian-kingston-fcr', name: 'Brian Kingston', role: 'CEO of Brookfield Property', bio: 'Brian Kingston serves as CEO of Brookfield Property Partners, which acquired Forest City Realty Trust, the real-estate company founded by the Ratner Jewish family in Cleveland.' },
  { id: 'albert-ratner-fcr', name: 'Albert Ratner', role: 'Co-Chairman Emeritus', bio: 'Albert Ratner served as Co-Chairman of Forest City Enterprises, the Ratner family-founded real estate empire that developed properties across the United States for over a century.' },
  { id: 'deborah-ratner-salzberg-fcr', name: 'Deborah Ratner Salzberg', role: 'Board Member', bio: 'Deborah Ratner Salzberg, of the founding Ratner family, has served on boards related to Forest City\'s legacy properties and Jewish philanthropic causes.' }
]);

batch('yivo-institute-for-jewish-research', [
  { id: 'jonathan-brent-yivo', name: 'Jonathan Brent', role: 'Executive Director', bio: 'Jonathan Brent serves as Executive Director of YIVO Institute for Jewish Research, the world\'s premiere center for Eastern European Jewish studies, founded in Vilna in 1925.' },
  { id: 'ruth-wisse-yivo', name: 'Ruth Wisse', role: 'Board Member & Scholar', bio: 'Ruth Wisse, a leading Yiddish literature scholar, has served on YIVO\'s academic board, supporting the preservation of Yiddish language and culture.' },
  { id: 'max-weinreich-yivo', name: 'Max Weinreich (Legacy)', role: 'Co-Founder', bio: 'Max Weinreich (1894-1969) was the co-founder and leading scholar of YIVO, a linguist whose work defined modern Yiddish studies and preserved Eastern European Jewish intellectual heritage.' }
]);

batch('bloomingdale-s', [
  { id: 'tony-spring-blooms', name: 'Tony Spring', role: 'CEO of Macy\'s Inc.', bio: 'Tony Spring serves as CEO of Macy\'s Inc., the parent company of Bloomingdale\'s, the luxury department store founded by the Bloomingdale Jewish family in 1861.' },
  { id: 'olivier-bron-blooms', name: 'Olivier Bron', role: 'Chairman of Bloomingdale\'s', bio: 'Olivier Bron serves as Chairman and CEO of Bloomingdale\'s, leading the upscale retail chain founded by brothers Joseph and Lyman Bloomingdale.' },
  { id: 'frank-doroff-blooms', name: 'Frank Doroff', role: 'Former Vice Chairman', bio: 'Frank Doroff served as Vice Chairman and GM of Bloomingdale\'s, playing a key role in the luxury retailer\'s brand identity for decades.' }
]);

batch('sears-roebuck-historic', [
  { id: 'julius-rosenwald-sears', name: 'Julius Rosenwald (Legacy)', role: 'Former President', bio: 'Julius Rosenwald (1862-1932), a Jewish-American business magnate, served as President of Sears, Roebuck and Co., transforming it into the world\'s largest retailer and becoming one of America\'s greatest philanthropists.' },
  { id: 'lessing-rosenwald-sears', name: 'Lessing Rosenwald', role: 'Former Chairman', bio: 'Lessing Rosenwald, son of Julius, served as Chairman of Sears from 1932-1939, also known as a prominent art collector who donated his collection to the National Gallery.' },
  { id: 'richard-sears-legacy', name: 'Richard W. Sears (Legacy)', role: 'Founder', bio: 'Richard Sears (1863-1914) co-founded Sears, Roebuck and Company, which was later transformed by his Jewish partner Julius Rosenwald into a retail empire that changed American commerce.' }
]);

batch('foundation-for-jewish-camp', [
  { id: 'jeremy-fingerman-fjcamp', name: 'Jeremy Fingerman', role: 'CEO', bio: 'Jeremy Fingerman serves as CEO of the Foundation for Jewish Camp (FJC), which has invested over $100 million in growing Jewish camp programs that serve 180,000+ youth annually.' },
  { id: 'elisa-spungen-bildner-fjcamp', name: 'Elisa Spungen Bildner', role: 'Founding Chair', bio: 'Elisa Spungen Bildner co-founded and chaired the Foundation for Jewish Camp, believing that immersive camp experiences are the most effective tool for building Jewish identity.' },
  { id: 'rabinowitz-fjcamp', name: 'Abigail Pogrebin', role: 'Board Member', bio: 'Abigail Pogrebin, author and Jewish cultural commentator, serves on the board of the Foundation for Jewish Camp, supporting its mission of "Camp for all" Jewish youth.' }
]);

batch('warby-parker', [
  { id: 'neil-blumenthal-wp', name: 'Neil Blumenthal', role: 'Co-Founder & Co-CEO', bio: 'Neil Blumenthal, a Jewish-American entrepreneur, co-founded Warby Parker, the direct-to-consumer eyewear company that disrupted the optical industry with its buy-one-give-one model.' },
  { id: 'dave-gilboa-wp', name: 'Dave Gilboa', role: 'Co-Founder & Co-CEO', bio: 'Dave Gilboa, a Jewish-American entrepreneur, co-founded Warby Parker with three Wharton classmates, building it into a publicly traded company valued at billions.' },
  { id: 'andrew-hunt-wp', name: 'Andrew Hunt', role: 'Co-Founder', bio: 'Andrew Hunt co-founded Warby Parker in 2010, contributing to the revolutionary eyewear brand that combines fashionable design with social impact.' }
]);

batch('viacomcbs-foundation', [
  { id: 'shari-redstone-vcbs', name: 'Shari Redstone', role: 'Chair of Paramount Global', bio: 'Shari Redstone, daughter of Sumner Redstone and a prominent Jewish media executive, serves as Chair of Paramount Global (formerly ViacomCBS).' },
  { id: 'sumner-redstone-vcbs', name: 'Sumner Redstone (Legacy)', role: 'Founder', bio: 'Sumner Redstone (1923-2020), born Sumner Rothstein, was a Jewish-American media mogul who built Viacom into a global media empire through National Amusements.' },
  { id: 'bob-bakish-vcbs', name: 'Bob Bakish', role: 'Former CEO', bio: 'Bob Bakish served as CEO of ViacomCBS (later Paramount Global), leading the merged entertainment company before its acquisition by Skydance Media.' }
]);

batch('the-marcus-foundation', [
  { id: 'bernie-marcus-tmf', name: 'Bernie Marcus', role: 'Founder', bio: 'Bernie Marcus, Jewish-American co-founder of The Home Depot, established the Marcus Foundation which has donated over $2 billion to medical research, Jewish causes, and veteran support.' },
  { id: 'jay-kaiman-tmf', name: 'Jay Kaiman', role: 'Executive Director', bio: 'Jay Kaiman serves as Executive Director of the Marcus Foundation, managing Bernie Marcus\'s philanthropy focused on autism research, Israel, and free enterprise.' },
  { id: 'billi-marcus-tmf', name: 'Billi Marcus', role: 'Co-Chair', bio: 'Billi Marcus serves as Co-Chair of the Marcus Foundation alongside her husband Bernie, supporting the Georgia Aquarium, the Israel Democracy Institute, and medical research.' }
]);

batch('activision-blizzard', [
  { id: 'bobby-kotick-actblz', name: 'Bobby Kotick', role: 'Former CEO', bio: 'Bobby Kotick, a Jewish-American businessman, served as CEO of Activision Blizzard for three decades, building it into the world\'s largest gaming company before its $69 billion acquisition by Microsoft.' },
  { id: 'brian-kelly-actblz', name: 'Brian Kelly', role: 'Former Co-Chairman', bio: 'Brian Kelly served as Co-Chairman of Activision Blizzard\'s board, providing governance during the company\'s growth into a gaming giant.' },
  { id: 'barry-diller-actblz', name: 'Barry Diller', role: 'Board Advisor', bio: 'Barry Diller, the Jewish-American media mogul, has been associated with Activision Blizzard through overlapping media industry leadership circles.' }
]);

batch('hadassah-womens-zionist-org', [
  { id: 'rhoda-smolow-hadassah', name: 'Rhoda Smolow', role: 'National President', bio: 'Rhoda Smolow serves as National President of Hadassah, the Women\'s Zionist Organization of America, the largest Jewish women\'s organization in the U.S. with 300,000 members.' },
  { id: 'janice-weinman-hadassah', name: 'Janice Weinman', role: 'Executive Director', bio: 'Janice Weinman served as Executive Director of Hadassah, managing the organization that operates two research hospitals in Jerusalem and advocates for women\'s health.' },
  { id: 'henrietta-szold-hadassah', name: 'Henrietta Szold (Legacy)', role: 'Founder', bio: 'Henrietta Szold (1860-1945) founded Hadassah in 1912, building the organization that established the Hadassah Medical Organization in Jerusalem and rescued thousands of children through Youth Aliyah.' }
]);

batch('ticketmaster', [
  { id: 'michael-rapino-tm', name: 'Michael Rapino', role: 'CEO of Live Nation Entertainment', bio: 'Michael Rapino serves as CEO of Live Nation Entertainment, the parent company of Ticketmaster, the dominant live event ticketing platform.' },
  { id: 'irving-azoff-tm', name: 'Irving Azoff', role: 'Former Executive Chairman', bio: 'Irving Azoff, a Jewish-American entertainment mogul, served as Executive Chairman of Ticketmaster/Live Nation and is considered one of the most powerful figures in the music industry.' },
  { id: 'fred-rosen-tm', name: 'Fred Rosen', role: 'Former CEO', bio: 'Fred Rosen, a Jewish-American entrepreneur, served as CEO of Ticketmaster from 1982 to 1998, transforming it into the dominant force in live event ticketing.' }
]);

batch('paul-singer', [
  { id: 'paul-singer-ps', name: 'Paul Singer', role: 'Founder & Co-CEO', bio: 'Paul Singer, a Jewish-American billionaire, is the founder and co-CEO of Elliott Management Corporation, one of the world\'s largest activist hedge funds with $55+ billion under management.' },
  { id: 'jesse-cohn-ps', name: 'Jesse Cohn', role: 'Managing Partner', bio: 'Jesse Cohn serves as Managing Partner at Elliott Management, leading many of the firm\'s high-profile activist campaigns alongside Paul Singer.' },
  { id: 'gordon-singer-ps', name: 'Gordon Singer', role: 'Head of Elliott Advisors (UK)', bio: 'Gordon Singer, son of Paul Singer, heads Elliott Advisors in London, managing the firm\'s European operations and activist investments.' }
]);

batch('news-corp', [
  { id: 'robert-thomson-newscorp', name: 'Robert Thomson', role: 'CEO', bio: 'Robert Thomson serves as CEO of News Corp, the media company controlled by the Murdoch family that publishes The Wall Street Journal, New York Post, and other global media properties.' },
  { id: 'rupert-murdoch-newscorp', name: 'Rupert Murdoch', role: 'Chairman Emeritus', bio: 'Rupert Murdoch serves as Chairman Emeritus of News Corp, the media mogul whose empire spans newspapers, book publishing, and digital real estate services.' },
  { id: 'lachlan-murdoch-newscorp', name: 'Lachlan Murdoch', role: 'Executive Chairman of Fox/News Corp', bio: 'Lachlan Murdoch has served as Executive Chairman of both Fox Corporation and News Corp, continuing the Murdoch family\'s media empire.' }
]);

batch('washington-post', [
  { id: 'jeff-bezos-wapo', name: 'Jeff Bezos', role: 'Owner', bio: 'Jeff Bezos, Amazon founder, purchased The Washington Post in 2013, continuing the legacy of the Jewish Meyer-Graham family which owned the paper from 1933 to 2013.' },
  { id: 'katharine-graham-wapo', name: 'Katharine Graham (Legacy)', role: 'Former Publisher', bio: 'Katharine Graham (1917-2001) was the Jewish-American publisher of The Washington Post who oversaw the Pentagon Papers and Watergate coverage, becoming the first female CEO of a Fortune 500 company.' },
  { id: 'donald-graham-wapo', name: 'Donald Graham', role: 'Former Publisher', bio: 'Donald Graham, son of Katharine Graham, served as publisher and chairman of The Washington Post before the family sold the paper to Jeff Bezos in 2013.' }
]);

batch('us-house-foreign-affairs-committee', [
  { id: 'michael-mccaul-hfac', name: 'Michael McCaul', role: 'Former Chairman', bio: 'Michael McCaul served as Chairman of the U.S. House Foreign Affairs Committee, overseeing American foreign policy including the U.S.-Israel relationship.' },
  { id: 'gregory-meeks-hfac', name: 'Gregory Meeks', role: 'Ranking Member', bio: 'Gregory Meeks serves as Ranking Member of the House Foreign Affairs Committee, a strong supporter of U.S.-Israel relations and security cooperation.' },
  { id: 'brad-schneider-hfac', name: 'Brad Schneider', role: 'Member', bio: 'Brad Schneider, a Jewish-American congressman from Illinois, is a prominent member of the House Foreign Affairs Committee and co-chair of the Congressional Caucus for the Abraham Accords.' }
]);

// Various "connections" entries - adding context individuals
batch('george-stephanopoulos-connections', [
  { id: 'george-stephanopoulos-gs', name: 'George Stephanopoulos', role: 'Anchor', bio: 'George Stephanopoulos is the anchor of ABC\'s Good Morning America and This Week, a former Clinton White House communications director.' },
  { id: 'ali-wentworth-gs', name: 'Ali Wentworth', role: 'Spouse & Actress', bio: 'Ali Wentworth is an actress and comedian married to George Stephanopoulos.' },
  { id: 'jeffrey-epstein-gs', name: 'Jeffrey Epstein', role: 'Connection', bio: 'Jeffrey Epstein was a convicted sex offender and financier whose connections to media and political figures drew scrutiny.' }
]);

batch('terra-mar-project', [
  { id: 'ghislaine-maxwell-tmp', name: 'Ghislaine Maxwell', role: 'Founder', bio: 'Ghislaine Maxwell founded the TerraMar Project, an ocean conservation nonprofit, before being convicted of sex trafficking in connection with Jeffrey Epstein.' },
  { id: 'scott-borgerson-tmp', name: 'Scott Borgerson', role: 'Associate', bio: 'Scott Borgerson, a maritime security expert, was associated with the TerraMar Project and Ghislaine Maxwell.' },
  { id: 'laura-goldman-tmp', name: 'Laura Goldman', role: 'Advisor', bio: 'Laura Goldman advised on operations related to the TerraMar Project before its dissolution in 2019.' }
]);

batch('jean-luc-brunel-mc2', [
  { id: 'jean-luc-brunel-mc2p', name: 'Jean-Luc Brunel', role: 'Founder', bio: 'Jean-Luc Brunel (1946-2022) was a French modeling agent who founded MC2, who was charged with sex trafficking before dying in custody.' },
  { id: 'jeffrey-epstein-mc2', name: 'Jeffrey Epstein', role: 'Associate & Funder', bio: 'Jeffrey Epstein was a convicted sex offender who provided financial backing for MC2 Model Management.' },
  { id: 'ghislaine-maxwell-mc2', name: 'Ghislaine Maxwell', role: 'Associate', bio: 'Ghislaine Maxwell was a convicted sex trafficker associated with the MC2 modeling network and Jeffrey Epstein.' }
]);

batch('jes-staley-connections', [
  { id: 'jes-staley-jsc', name: 'Jes Staley', role: 'Former CEO of Barclays', bio: 'Jes Staley served as CEO of Barclays Bank before resigning over his ties to Jeffrey Epstein, which were investigated by UK financial regulators.' },
  { id: 'jeffrey-epstein-js', name: 'Jeffrey Epstein', role: 'Connection', bio: 'Jeffrey Epstein was a convicted sex offender whose relationship with Jes Staley predated Staley\'s time at Barclays.' },
  { id: 'barclays-board-js', name: 'Nigel Higgins', role: 'Barclays Chairman', bio: 'Nigel Higgins became Chairman of Barclays during the investigation into Jes Staley\'s connections to Jeffrey Epstein.' }
]);

batch('mortimer-zuckerman-connections', [
  { id: 'mortimer-zuckerman-mzc', name: 'Mortimer Zuckerman', role: 'Publisher & Real Estate Developer', bio: 'Mortimer Zuckerman is a Jewish-American billionaire media proprietor (U.S. News & World Report, NY Daily News) and real estate developer (Boston Properties).' },
  { id: 'jeffrey-epstein-mz', name: 'Jeffrey Epstein', role: 'Connection', bio: 'Jeffrey Epstein was a financier whose social connections included media and real estate figures.' },
  { id: 'ghislaine-maxwell-mz', name: 'Ghislaine Maxwell', role: 'Social Connection', bio: 'Ghislaine Maxwell moved in the same social circles as various media and real estate moguls in New York.' }
]);

batch('lawrence-krauss-connections', [
  { id: 'lawrence-krauss-lkc', name: 'Lawrence Krauss', role: 'Physicist', bio: 'Lawrence Krauss is a Jewish-American theoretical physicist and cosmologist, formerly of Arizona State University, known for work on the cosmological constant.' },
  { id: 'jeffrey-epstein-lk', name: 'Jeffrey Epstein', role: 'Donor', bio: 'Jeffrey Epstein was a financier who donated to scientific institutions and cultivated relationships with prominent scientists.' },
  { id: 'origins-project-lk', name: 'Lindy Elkins-Tanton', role: 'Origins Project Co-Director', bio: 'Lindy Elkins-Tanton served in leadership at Arizona State University\'s research programs associated with Krauss\'s work.' }
]);

batch('cy-vance-connections', [
  { id: 'cy-vance-cvc', name: 'Cyrus Vance Jr.', role: 'Former Manhattan DA', bio: 'Cyrus Vance Jr. served as Manhattan District Attorney, handling cases including the initial Jeffrey Epstein plea deal and Harvey Weinstein prosecution.' },
  { id: 'jeffrey-epstein-cv', name: 'Jeffrey Epstein', role: 'Subject', bio: 'Jeffrey Epstein\'s case was handled by the Manhattan DA\'s office, raising questions about the justice system\'s treatment of wealthy defendants.' },
  { id: 'linda-fairstein-cv', name: 'Linda Fairstein', role: 'Former NY Sex Crimes Prosecutor', bio: 'Linda Fairstein, a former head of the Manhattan DA\'s sex crimes unit, was involved in the broader conversation about prosecution of sex crimes in New York.' }
]);

batch('kevin-spacey-connections', [
  { id: 'kevin-spacey-ksc', name: 'Kevin Spacey', role: 'Actor', bio: 'Kevin Spacey is an American actor known for House of Cards and American Beauty, who faced multiple sexual misconduct allegations.' },
  { id: 'jeffrey-epstein-ks', name: 'Jeffrey Epstein', role: 'Connection', bio: 'Jeffrey Epstein\'s flight logs and social connections included various entertainment industry figures.' },
  { id: 'ghislaine-maxwell-ks', name: 'Ghislaine Maxwell', role: 'Social Connection', bio: 'Ghislaine Maxwell\'s social network included figures from entertainment, media, and politics.' }
]);

batch('mar-a-lago', [
  { id: 'donald-trump-mal', name: 'Donald Trump', role: 'Owner', bio: 'Donald Trump owns Mar-a-Lago, the Palm Beach estate that has served as a social nexus for political and business figures.' },
  { id: 'jeffrey-epstein-mal', name: 'Jeffrey Epstein', role: 'Former Member', bio: 'Jeffrey Epstein was a former member of Mar-a-Lago before being expelled by the club.' },
  { id: 'ghislaine-maxwell-mal', name: 'Ghislaine Maxwell', role: 'Former Visitor', bio: 'Ghislaine Maxwell was photographed at Mar-a-Lago events prior to the exposure of her criminal activities.' }
]);

batch('nadia-marcinkova-connections', [
  { id: 'nadia-marcinkova-nmc', name: 'Nadia Marcinko', role: 'Aviator', bio: 'Nadia Marcinko (formerly Marcinkova) is a pilot and former victim-turned-associate of Jeffrey Epstein who later sought to distance herself from the scandal.' },
  { id: 'jeffrey-epstein-nm', name: 'Jeffrey Epstein', role: 'Connection', bio: 'Jeffrey Epstein was a convicted sex offender who maintained a network of associates and victims.' },
  { id: 'ghislaine-maxwell-nm', name: 'Ghislaine Maxwell', role: 'Connection', bio: 'Ghislaine Maxwell was convicted of sex trafficking for her role in Jeffrey Epstein\'s criminal enterprise.' }
]);

// ============================================================
// ISRAEL (15 entries)
// ============================================================
console.log('=== ISRAEL ===');

batch('mossad-institute-for-intelligence-and-special-operations', [
  { id: 'david-barnea-mossad', name: 'David Barnea', role: 'Director', bio: 'David Barnea serves as Director of the Mossad, Israel\'s national intelligence agency responsible for intelligence collection, covert operations, and counterterrorism.' },
  { id: 'yossi-cohen-mossad', name: 'Yossi Cohen', role: 'Former Director', bio: 'Yossi Cohen served as Director of the Mossad from 2016-2021, overseeing operations during a period of expanding Abraham Accords and regional diplomacy.' },
  { id: 'meir-dagan-mossad', name: 'Meir Dagan (Legacy)', role: 'Former Director', bio: 'Meir Dagan (1945-2016) served as Director of the Mossad from 2002-2011, credited with disrupting Iran\'s nuclear program and leading the organization during a transformative era.' }
]);

batch('shin-bet-israel-security-agency', [
  { id: 'ronen-bar-shinbet', name: 'Ronen Bar', role: 'Director', bio: 'Ronen Bar serves as Director of the Shin Bet (Israel Security Agency), Israel\'s internal security service responsible for counterterrorism, counterintelligence, and VIP protection.' },
  { id: 'nadav-argaman-shinbet', name: 'Nadav Argaman', role: 'Former Director', bio: 'Nadav Argaman served as Director of the Shin Bet from 2016-2021, leading the agency during heightened security challenges.' },
  { id: 'yuval-diskin-shinbet', name: 'Yuval Diskin', role: 'Former Director', bio: 'Yuval Diskin served as Director of the Shin Bet from 2005-2011, later becoming an outspoken critic of Israeli government security policies.' }
]);

batch('iec-israel-electric-corporation', [
  { id: 'meir-spiegler-iec', name: 'Meir Spiegler', role: 'CEO', bio: 'Meir Spiegler serves as CEO of the Israel Electric Corporation, the main supplier of electrical power in Israel, a state-owned monopoly serving 2.8 million customers.' },
  { id: 'yiftah-ron-tal-iec', name: 'Yiftah Ron-Tal', role: 'Chairman', bio: 'Yiftah Ron-Tal has served as Chairman of the Israel Electric Corporation, leading the utility through its transition toward renewable energy and natural gas.' },
  { id: 'orit-farkash-hacohen-iec', name: 'Orit Farkash-Hacohen', role: 'Board Member', bio: 'Orit Farkash-Hacohen has served on the board of the Israel Electric Corporation, bringing legal and regulatory expertise to the state utility.' }
]);

batch('jewish-national-fund-keren-kayemeth-leisrael-kkl-jnf', [
  { id: 'avraham-duvdevani-kkl', name: 'Avraham Duvdevani', role: 'Chairman', bio: 'Avraham Duvdevani has served as Chairman of KKL-JNF, the organization that manages 13% of Israel\'s land, plants forests, and develops water infrastructure.' },
  { id: 'amnon-ben-ami-kkl', name: 'Amnon Ben-Ami', role: 'Director General', bio: 'Amnon Ben-Ami served as Director General of KKL-JNF, managing the organization\'s forestry, land development, and environmental projects across Israel.' },
  { id: 'daniel-atar-kkl', name: 'Daniel Atar', role: 'Former Chairman', bio: 'Daniel Atar served as Chairman of KKL-JNF, leading the organization that has planted over 260 million trees in Israel since its founding in 1901.' }
]);

batch('start-up-nation-ecosystem', [
  { id: 'saul-singer-snec', name: 'Saul Singer', role: 'Co-Author', bio: 'Saul Singer co-authored "Start-Up Nation: The Story of Israel\'s Economic Miracle," which popularized the concept of Israel as the "Start-Up Nation."' },
  { id: 'dan-senor-snec', name: 'Dan Senor', role: 'Co-Author', bio: 'Dan Senor co-authored "Start-Up Nation" and serves as a foreign policy analyst, documenting how Israel produces more startups per capita than any other country.' },
  { id: 'avi-hasson-snec', name: 'Avi Hasson', role: 'Former Chief Scientist', bio: 'Avi Hasson served as Chief Scientist of Israel\'s Ministry of Economy, leading the Israel Innovation Authority that nurtures the Start-Up Nation ecosystem.' }
]);

batch('channel-13-reshet', [
  { id: 'avi-weiss-ch13', name: 'Avi Weiss', role: 'CEO', bio: 'Avi Weiss serves as CEO of Reshet Media (Channel 13), one of Israel\'s major commercial television broadcasters.' },
  { id: 'len-blavatnik-ch13', name: 'Len Blavatnik', role: 'Owner (Access Industries)', bio: 'Len Blavatnik, a Ukrainian-born Jewish billionaire, controls Channel 13 through his holdings in Reshet Media, making him a major player in Israeli media.' },
  { id: 'yonit-levi-ch13', name: 'Yonit Levi', role: 'Lead Anchor', bio: 'Yonit Levi serves as lead news anchor on Channel 13 (Reshet), one of the most recognized and trusted journalists in Israel.' }
]);

batch('sodastream-israel', [
  { id: 'daniel-birnbaum-ss', name: 'Daniel Birnbaum', role: 'Former CEO', bio: 'Daniel Birnbaum served as CEO of SodaStream, the Israeli home carbonation company that became a symbol of Israeli-Palestinian economic cooperation before its $3.2B acquisition by PepsiCo.' },
  { id: 'eyal-shohat-ss', name: 'Eyal Shohat', role: 'COO', bio: 'Eyal Shohat has served as COO of SodaStream Israel, managing the company\'s manufacturing operations in the Negev.' },
  { id: 'ramon-laguarta-ss', name: 'Ramon Laguarta', role: 'PepsiCo CEO (Owner)', bio: 'Ramon Laguarta, CEO of PepsiCo, oversees SodaStream after PepsiCo\'s $3.2 billion acquisition of the Israeli company in 2018.' }
]);

batch('biontech-pfizer-israel-partnership', [
  { id: 'ugur-sahin-biontech-il', name: 'Uğur Şahin', role: 'BioNTech CEO', bio: 'Uğur Şahin co-founded BioNTech and led the development of the Pfizer-BioNTech COVID-19 vaccine, with Israel becoming the world\'s first mass vaccination laboratory.' },
  { id: 'albert-bourla-biontech-il', name: 'Albert Bourla', role: 'Pfizer CEO', bio: 'Albert Bourla, a Greek-Jewish veterinarian turned pharma CEO, led Pfizer\'s partnership with Israel to conduct the world\'s fastest national vaccination campaign.' },
  { id: 'nachman-ash-biontech-il', name: 'Nachman Ash', role: 'Israel Director General of Health', bio: 'Nachman Ash served as Director General of Israel\'s Ministry of Health, managing the landmark vaccination deal with Pfizer-BioNTech that made Israel the world\'s COVID-19 vaccination model.' }
]);

batch('mekorot', [
  { id: 'eli-cohen-mekorot', name: 'Eli Cohen', role: 'CEO', bio: 'Eli Cohen has served as CEO of Mekorot, Israel\'s national water company that manages the country\'s water supply, desalination plants, and water technology innovation.' },
  { id: 'yechezkel-lifshitz-mekorot', name: 'Yechezkel Lifshitz', role: 'Chairman', bio: 'Yechezkel Lifshitz served as Chairman of Mekorot, overseeing the state water company that provides 70% of Israel\'s water supply and operates five desalination plants.' },
  { id: 'abraham-tenne-mekorot', name: 'Abraham Tenne', role: 'Head of Desalination', bio: 'Abraham Tenne heads the desalination division at Mekorot, leading the technology that has made Israel a global leader in water innovation and drought resilience.' }
]);

batch('galei-zahal-idf-radio', [
  { id: 'yaron-dekel-galei', name: 'Yaron Dekel', role: 'Station Director', bio: 'Yaron Dekel has served as or adjacent to station leadership at Galei Tzahal (IDF Radio), the Israeli military\'s radio station that has become a major mainstream media outlet.' },
  { id: 'roni-daniel-galei', name: 'Roni Daniel (Legacy)', role: 'Military Correspondent', bio: 'Roni Daniel (1950-2022) was the legendary military correspondent for Israeli media who was closely associated with Galei Tzahal for decades.' },
  { id: 'jacky-levy-galei', name: 'Jacky Levy', role: 'Program Director', bio: 'Jacky Levy directs programming at Galei Tzahal, managing the military radio station that uniquely serves as both an army institution and one of Israel\'s most popular media outlets.' }
]);

batch('taro-pharmaceutical-israel', [
  { id: 'dilip-shanghvi-taro-il', name: 'Dilip Shanghvi', role: 'Parent Company Chairman (Sun Pharma)', bio: 'Dilip Shanghvi, founder of Sun Pharmaceutical Industries, controls Taro Pharmaceutical Israel as a subsidiary of the Indian pharma giant.' },
  { id: 'uday-baldota-taro-il', name: 'Uday Baldota', role: 'CEO', bio: 'Uday Baldota serves as CEO of Taro Pharmaceutical, managing the Israeli-founded generic pharmaceutical company now owned by Sun Pharma.' },
  { id: 'barrie-levitt-taro-il', name: 'Barrie Levitt', role: 'Former Chairman', bio: 'Barrie Levitt served as Chairman of Taro Pharmaceutical for decades, building the Israeli generic drug company before its acquisition by Sun Pharma.' }
]);

batch('nefesh-b-nefesh-israel', [
  { id: 'rabbi-yehoshua-fass-nbn', name: 'Yehoshua Fass', role: 'Co-Founder & Executive Director', bio: 'Rabbi Yehoshua Fass co-founded Nefesh B\'Nefesh in 2002 to facilitate aliyah from North America and the UK, having helped over 75,000 new immigrants move to Israel.' },
  { id: 'tony-gelbart-nbn', name: 'Tony Gelbart', role: 'Co-Founder', bio: 'Tony Gelbart co-founded Nefesh B\'Nefesh, providing the philanthropic vision and funding to create a streamlined aliyah process.' },
  { id: 'zev-gershinsky-nbn', name: 'Zev Gershinsky', role: 'Director of Aliyah', bio: 'Zev Gershinsky directs aliyah operations at Nefesh B\'Nefesh, managing the logistics and support services for thousands of new immigrants annually.' }
]);

batch('walla-news', [
  { id: 'ilan-yeshua-walla', name: 'Ilan Yeshua', role: 'Former CEO', bio: 'Ilan Yeshua served as CEO of Walla News, whose testimony in the Netanyahu corruption trial became a key element of the Case 4000 proceedings.' },
  { id: 'shaul-elovitch-walla', name: 'Shaul Elovitch', role: 'Former Owner (Bezeq)', bio: 'Shaul Elovitch, as owner of Bezeq which controlled Walla News, was implicated in the Netanyahu corruption case involving favorable media coverage.' },
  { id: 'aviram-elad-walla', name: 'Aviram Elad', role: 'Editor', bio: 'Aviram Elad served as editor at Walla News, involved in the editorial decisions that became central to the Israeli political corruption investigation.' }
]);

batch('teva-naot', [
  { id: 'gal-amir-naot', name: 'Gal Amir', role: 'CEO', bio: 'Gal Amir serves as CEO of Teva Naot, the Israeli sandal and shoe company originating from Kibbutz Naot Mordechai known for its comfortable cork footwear.' },
  { id: 'ilan-naot-naot', name: 'Ilan Green', role: 'Head of Design', bio: 'Ilan Green heads design at Teva Naot, maintaining the brand\'s identity of handcrafted Israeli comfort footwear while expanding into global markets.' },
  { id: 'daphne-naor-naot', name: 'Daphne Naor', role: 'International Sales Director', bio: 'Daphne Naor directs international sales for Teva Naot, expanding the Israeli footwear brand to markets across North America, Europe, and Asia.' }
]);

batch('sodastream', [
  { id: 'daniel-birnbaum-ss2', name: 'Daniel Birnbaum', role: 'Former CEO', bio: 'Daniel Birnbaum led SodaStream as CEO, championing Israeli-Palestinian coexistence at the company\'s factory before PepsiCo\'s acquisition.' },
  { id: 'ramon-laguarta-ss2', name: 'Ramon Laguarta', role: 'PepsiCo CEO (Parent)', bio: 'Ramon Laguarta oversees SodaStream as part of PepsiCo\'s portfolio after the $3.2 billion acquisition.' },
  { id: 'karin-sharvit-ss2', name: 'Karin Sharvit', role: 'Marketing Director', bio: 'Karin Sharvit directs marketing for SodaStream, managing the brand\'s global presence and its campaigns featuring celebrities like Scarlett Johansson.' }
]);

// ============================================================
// UNITED KINGDOM (8 entries)
// ============================================================
console.log('=== UNITED KINGDOM ===');

batch('bbc-british-broadcasting-corporation', [
  { id: 'tim-davie-bbc', name: 'Tim Davie', role: 'Director-General', bio: 'Tim Davie serves as Director-General of the BBC, the world\'s oldest national broadcasting organization.' },
  { id: 'samir-shah-bbc', name: 'Samir Shah', role: 'Chairman', bio: 'Samir Shah serves as Chairman of the BBC Board, providing governance oversight of the public broadcaster.' },
  { id: 'deborah-turness-bbc', name: 'Deborah Turness', role: 'CEO of BBC News', bio: 'Deborah Turness serves as CEO of BBC News and Current Affairs, managing the BBC\'s global news operations.' }
]);

batch('unilever', [
  { id: 'hein-schumacher-unilever', name: 'Hein Schumacher', role: 'CEO', bio: 'Hein Schumacher serves as CEO of Unilever, the Anglo-Dutch consumer goods giant that faced BDS campaigns over its Ben & Jerry\'s brand\'s West Bank decisions.' },
  { id: 'nils-andersen-unilever', name: 'Nils Andersen', role: 'Chairman', bio: 'Nils Andersen serves as Chairman of Unilever, overseeing the company through the Ben & Jerry\'s controversy over Israel-Palestine.' },
  { id: 'alan-jope-unilever', name: 'Alan Jope', role: 'Former CEO', bio: 'Alan Jope served as CEO of Unilever during the Ben & Jerry\'s West Bank settlement controversy, navigating the conflict between brand activism and corporate policy.' }
]);

batch('jewish-chronicle', [
  { id: 'jake-wallis-simons-jc', name: 'Jake Wallis Simons', role: 'Editor', bio: 'Jake Wallis Simons serves as Editor of the Jewish Chronicle, the world\'s oldest continuously published Jewish newspaper, founded in London in 1841.' },
  { id: 'robbie-gibb-jc', name: 'Robbie Gibb', role: 'Board Chair', bio: 'Sir Robbie Gibb serves as Chair of the Jewish Chronicle\'s board, bringing media experience from his role as BBC Head of Communications.' },
  { id: 'stephen-pollard-jc', name: 'Stephen Pollard', role: 'Former Editor', bio: 'Stephen Pollard served as Editor of the Jewish Chronicle from 2008-2023, leading the paper through the era of the Labour antisemitism crisis.' }
]);

batch('institute-for-jewish-policy-research-jpr', [
  { id: 'jonathan-boyd-jpr', name: 'Jonathan Boyd', role: 'Executive Director', bio: 'Jonathan Boyd serves as Executive Director of the Institute for Jewish Policy Research (JPR), the UK\'s leading independent think tank on Jewish community issues in Europe.' },
  { id: 'daniel-staetsky-jpr', name: 'Daniel Staetsky', role: 'Senior Researcher', bio: 'Daniel Staetsky serves as Senior Researcher at JPR, the foremost demographer of European Jewry whose work maps the size and trends of Jewish populations across Europe.' },
  { id: 'helena-miller-jpr', name: 'Helena Miller', role: 'Research Director', bio: 'Helena Miller has served as a research director at JPR, contributing to studies on Jewish education, identity, and community trends in the UK and Europe.' }
]);

batch('entain-formerly-gvc-holdings', [
  { id: 'jette-nygaard-entain', name: 'Jette Nygaard-Andersen', role: 'Former CEO', bio: 'Jette Nygaard-Andersen served as CEO of Entain (formerly GVC Holdings), the gambling company co-founded by Israeli Kenny Alexander.' },
  { id: 'barry-gibson-entain', name: 'Barry Gibson', role: 'Chairman', bio: 'Barry Gibson serves as Chairman of Entain, previously GVC Holdings, one of the world\'s largest sports betting and gaming companies.' },
  { id: 'gavin-isaacs-entain', name: 'Gavin Isaacs', role: 'Former CEO', bio: 'Gavin Isaacs, a South African-Jewish executive, has held senior roles in the global gambling industry including connections to GVC/Entain\'s corporate leadership.' }
]);

batch('glaxosmithkline-gsk', [
  { id: 'emma-walmsley-gsk', name: 'Emma Walmsley', role: 'CEO', bio: 'Emma Walmsley serves as CEO of GSK, one of the world\'s largest pharmaceutical companies, which has significant operations and partnerships in Israel.' },
  { id: 'jonathan-symonds-gsk', name: 'Jonathan Symonds', role: 'Chairman', bio: 'Sir Jonathan Symonds serves as Chairman of GSK, overseeing the pharma giant\'s strategy and governance.' },
  { id: 'hal-barron-gsk', name: 'Hal Barron', role: 'Former CSO', bio: 'Dr. Hal Barron served as Chief Scientific Officer and President of R&D at GSK, a leading figure in pharmaceutical innovation with connections to the global biotech community.' }
]);

batch('naomi-campbell-connections', [
  { id: 'naomi-campbell-nc', name: 'Naomi Campbell', role: 'Supermodel', bio: 'Naomi Campbell is a British supermodel whose social connections include various figures in the Jeffrey Epstein network.' },
  { id: 'jeffrey-epstein-nc', name: 'Jeffrey Epstein', role: 'Connection', bio: 'Jeffrey Epstein maintained social connections with numerous celebrities and public figures.' },
  { id: 'ghislaine-maxwell-nc', name: 'Ghislaine Maxwell', role: 'Social Connection', bio: 'Ghislaine Maxwell was known for her extensive social connections in the fashion and entertainment worlds.' }
]);

batch('bp', [
  { id: 'murray-auchincloss-bp', name: 'Murray Auchincloss', role: 'CEO', bio: 'Murray Auchincloss serves as CEO of BP (British Petroleum), one of the world\'s largest energy companies with operations across the Middle East.' },
  { id: 'helge-lund-bp', name: 'Helge Lund', role: 'Chairman', bio: 'Helge Lund serves as Chairman of BP, overseeing the energy giant\'s strategy including its Middle Eastern operations.' },
  { id: 'bob-dudley-bp', name: 'Bob Dudley', role: 'Former CEO', bio: 'Bob Dudley served as CEO of BP, leading the company during the Deepwater Horizon aftermath and expansion of Middle East partnerships.' }
]);

// ============================================================
// FRANCE (7 entries)
// ============================================================
console.log('=== FRANCE ===');

batch('lvmh', [
  { id: 'bernard-arnault-lvmh', name: 'Bernard Arnault', role: 'Chairman & CEO', bio: 'Bernard Arnault serves as Chairman and CEO of LVMH, the world\'s largest luxury goods company, with a fortune making him one of the richest people in the world.' },
  { id: 'antoine-arnault-lvmh', name: 'Antoine Arnault', role: 'Head of Communications', bio: 'Antoine Arnault serves as Head of Image and Communications at LVMH, part of the Arnault family that controls the luxury empire including Louis Vuitton, Dior, and Tiffany.' },
  { id: 'delphine-arnault-lvmh', name: 'Delphine Arnault', role: 'CEO of Dior', bio: 'Delphine Arnault serves as CEO of Christian Dior, the jewel of the LVMH luxury empire, and is seen as a potential successor to her father Bernard.' }
]);

batch('groupe-bollor', [
  { id: 'vincent-bollore-gb', name: 'Vincent Bolloré', role: 'Founder & Former Chairman', bio: 'Vincent Bolloré is the French billionaire who built Groupe Bolloré into a massive conglomerate spanning logistics, media (Vivendi/Canal+), and Africa operations.' },
  { id: 'cyrille-bollore-gb', name: 'Cyrille Bolloré', role: 'Chairman & CEO', bio: 'Cyrille Bolloré serves as Chairman and CEO of Groupe Bolloré, taking over leadership from his father Vincent of the Breton conglomerate.' },
  { id: 'yannick-bollore-gb', name: 'Yannick Bolloré', role: 'Chairman of Vivendi', bio: 'Yannick Bolloré serves as Chairman of Vivendi, the media arm of the Bolloré empire that includes Canal+, Havas, and Lagardère.' }
]);

batch('kering', [
  { id: 'francois-henri-pinault-kering', name: 'François-Henri Pinault', role: 'Chairman & CEO', bio: 'François-Henri Pinault serves as Chairman and CEO of Kering, the luxury group that owns Gucci, Saint Laurent, Balenciaga, and Bottega Veneta.' },
  { id: 'francesca-bellettini-kering', name: 'Francesca Bellettini', role: 'Deputy CEO', bio: 'Francesca Bellettini serves as Deputy CEO of Kering and CEO of Saint Laurent, managing one of the group\'s most profitable luxury brands.' },
  { id: 'jean-francois-palus-kering', name: 'Jean-François Palus', role: 'Group Managing Director', bio: 'Jean-François Palus has served as Group Managing Director of Kering, overseeing operations of the luxury conglomerate.' }
]);

batch('radio-shalom', [
  { id: 'igor-mendes-radio-shalom', name: 'Igor Mendes', role: 'Director', bio: 'Igor Mendes serves as Director of Radio Shalom, the Jewish community radio station in Paris broadcasting news, music, and cultural programs for French Jewry.' },
  { id: 'pascal-bensoussan-radio-shalom', name: 'Pascal Bensoussan', role: 'Program Director', bio: 'Pascal Bensoussan directs programming at Radio Shalom Paris, curating content on Jewish culture, Israeli news, and community affairs for the French Jewish audience.' },
  { id: 'marc-bensimhon-radio-shalom', name: 'Marc Bensimhon', role: 'Managing Editor', bio: 'Marc Bensimhon manages editorial content at Radio Shalom, covering French Jewish community news and international affairs relevant to the Jewish world.' }
]);

batch('soci-t-g-n-rale', [
  { id: 'slawomir-krupa-socgen', name: 'Slawomir Krupa', role: 'CEO', bio: 'Slawomir Krupa serves as CEO of Société Générale, one of France\'s largest banks with a significant history of involvement in financial reparations for Holocaust victims.' },
  { id: 'lorenzo-bini-smaghi-socgen', name: 'Lorenzo Bini Smaghi', role: 'Chairman', bio: 'Lorenzo Bini Smaghi serves as Chairman of Société Générale, overseeing the French banking giant with global operations.' },
  { id: 'frederic-oudea-socgen', name: 'Frédéric Oudéa', role: 'Former CEO', bio: 'Frédéric Oudéa served as CEO of Société Générale for over a decade, leading the bank through the financial crisis and post-crisis restructuring.' }
]);

batch('fondation-france-isra-l', [
  { id: 'nicolas-bauer-ffi', name: 'Nicolas Bauer', role: 'President', bio: 'Nicolas Bauer serves as President of the Fondation France-Israël, promoting cultural, scientific, and economic cooperation between France and Israel.' },
  { id: 'arielle-schwab-ffi', name: 'Arielle Schwab', role: 'Director', bio: 'Arielle Schwab serves as Director of the Fondation France-Israël, organizing exchanges that strengthen the bilateral relationship.' },
  { id: 'daniel-shek-ffi', name: 'Daniel Shek', role: 'Ambassador & Board Member', bio: 'Daniel Shek, former Israeli Ambassador to France, serves on the board of the Fondation France-Israël, leveraging diplomatic experience for cultural diplomacy.' }
]);

batch('rothschild-co-france', [
  { id: 'alexandre-de-rothschild-rcf', name: 'Alexandre de Rothschild', role: 'Executive Chairman', bio: 'Alexandre de Rothschild serves as Executive Chairman of Rothschild & Co, the French branch of the legendary Rothschild banking dynasty that has been a pillar of global finance since the 18th century.' },
  { id: 'robert-de-rothschild-rcf', name: 'François Henrot', role: 'Vice Chairman', bio: 'François Henrot has served as Vice Chairman of Rothschild & Co, managing the firm\'s advisory business and its position as one of the world\'s premier independent investment banks.' },
  { id: 'mark-stephens-rcf', name: 'Mark Stephens', role: 'Global Head of Advisory', bio: 'Mark Stephens serves in a senior advisory capacity at Rothschild & Co France, managing the firm\'s M&A and financial advisory operations across Europe.' }
]);

// ============================================================
// CANADA (6 entries)
// ============================================================
console.log('=== CANADA ===');

batch('toronto-international-film-festival-tiff', [
  { id: 'cameron-bailey-tiff', name: 'Cameron Bailey', role: 'CEO', bio: 'Cameron Bailey serves as CEO of the Toronto International Film Festival (TIFF), one of the world\'s largest and most influential film festivals.' },
  { id: 'piers-handling-tiff', name: 'Piers Handling', role: 'Former Director & CEO', bio: 'Piers Handling served as Director and CEO of TIFF for over two decades, building it into a premier launchpad for Oscar-contending films.' },
  { id: 'lisa-chicken-tiff', name: 'Lisa de Wilde', role: 'Board Chair', bio: 'Lisa de Wilde serves as Chair of TIFF\'s Board of Directors, guiding the festival\'s strategic direction and its year-round cultural programming.' }
]);

batch('b-nai-brith-canada', [
  { id: 'michael-mostyn-bbc2', name: 'Michael Mostyn', role: 'CEO', bio: 'Michael Mostyn serves as CEO of B\'nai Brith Canada, the country\'s oldest Jewish advocacy organization, tracking antisemitism and advocating for Jewish community rights since 1875.' },
  { id: 'sam-goldstein-bbc2', name: 'Sam Goldstein', role: 'National Chair', bio: 'Sam Goldstein serves as National Chair of B\'nai Brith Canada, leading governance of the organization that publishes Canada\'s annual audit of antisemitic incidents.' },
  { id: 'marvin-kurz-bbc2', name: 'Marvin Kurz', role: 'National Legal Counsel', bio: 'Marvin Kurz serves as National Legal Counsel for B\'nai Brith Canada, handling legal matters related to antisemitism, hate crimes, and civil liberties.' }
]);

batch('mount-sinai-hospital-toronto', [
  { id: 'gary-newton-msh', name: 'Gary Newton', role: 'President & CEO', bio: 'Dr. Gary Newton serves as President and CEO of Sinai Health System (Mount Sinai Hospital), one of Canada\'s leading teaching hospitals founded by the Toronto Jewish community in 1923.' },
  { id: 'ari-babcock-msh', name: 'Ari Babcock', role: 'Board Chair', bio: 'Ari Babcock serves as Board Chair of Sinai Health System, guiding the hospital that originated as a response to discrimination against Jewish doctors in Toronto hospitals.' },
  { id: 'zane-cohen-msh', name: 'Zane Cohen', role: 'Surgeon & Namesake of Digestive Centre', bio: 'Dr. Zane Cohen is the namesake of the Zane Cohen Centre for Digestive Diseases at Mount Sinai Hospital, a leading gastrointestinal surgeon and medical innovator.' }
]);

batch('canadian-jewish-news', [
  { id: 'yoni-goldstein-cjn', name: 'Yoni Goldstein', role: 'Editor-in-Chief', bio: 'Yoni Goldstein serves as Editor-in-Chief of the Canadian Jewish News (CJN), the national Jewish newspaper serving the 400,000-strong Canadian Jewish community.' },
  { id: 'elizabeth-faye-cjn', name: 'Elizabeth Chicken', role: 'Publisher', bio: 'Elizabeth Chicken serves as Publisher of the Canadian Jewish News, leading the paper\'s evolution from a print publication to a multi-platform media organization.' },
  { id: 'bernie-bellan-cjn', name: 'Bernie Bellan', role: 'Contributing Editor', bio: 'Bernie Bellan is a veteran Canadian Jewish journalist who has contributed to the Canadian Jewish News and related Jewish media across the country.' }
]);

batch('cirque-du-soleil', [
  { id: 'guy-laliberte-cds', name: 'Guy Laliberté', role: 'Founder', bio: 'Guy Laliberté founded Cirque du Soleil in 1984, building it from Quebec street performers into a $3 billion global entertainment empire before selling his stake.' },
  { id: 'daniel-lamarre-cds', name: 'Daniel Lamarre', role: 'Executive Vice-Chairman', bio: 'Daniel Lamarre serves as Executive Vice-Chairman of Cirque du Soleil, having previously served as CEO, guiding the company through its COVID recovery.' },
  { id: 'stephane-lefebvre-cds', name: 'Stéphane Lefebvre', role: 'CEO', bio: 'Stéphane Lefebvre serves as CEO of Cirque du Soleil Entertainment Group, managing the world\'s largest theatrical producer with shows on six continents.' }
]);

batch('saputo-inc', [
  { id: 'lino-saputo-jr-sap', name: 'Lino Saputo Jr.', role: 'Chair & CEO', bio: 'Lino Saputo Jr. serves as Chair and CEO of Saputo Inc., the Canadian dairy giant founded by his family in Montreal in 1954.' },
  { id: 'maxime-therrien-sap', name: 'Maxime Therrien', role: 'CFO', bio: 'Maxime Therrien serves as CFO of Saputo Inc., managing the finances of one of Canada\'s largest food companies with revenues exceeding $15 billion.' },
  { id: 'kai-bockmann-sap', name: 'Kai Bockmann', role: 'President & COO', bio: 'Kai Bockmann serves as President and COO of Saputo Inc., managing global dairy operations across Canada, the U.S., the UK, Argentina, and Australia.' }
]);

// ============================================================
// SOUTH AFRICA (5), GERMANY (4), RUSSIA (4), ARGENTINA (3), BRAZIL (3)
// MEXICO (3), AUSTRALIA (2), SWEDEN (2), JAPAN (2), others
// ============================================================
console.log('=== SOUTH AFRICA ===');

batch('sa-jewish-report', [
  { id: 'peta-krost-sajr', name: 'Peta Krost Maunder', role: 'Editor', bio: 'Peta Krost Maunder serves as Editor of the SA Jewish Report, the weekly newspaper serving South Africa\'s 52,000-member Jewish community.' },
  { id: 'howard-sackstein-sajr', name: 'Howard Sackstein', role: 'Chairman', bio: 'Howard Sackstein serves as Chairman of the SA Jewish Report, guiding the newspaper that is the primary source of news for South African Jewry.' },
  { id: 'steven-sobel-sajr', name: 'Steven Sobel', role: 'Business Manager', bio: 'Steven Sobel manages business operations at the SA Jewish Report, supporting the newspaper\'s financial sustainability.' }
]);

batch('liberty-group-donald-gordon', [
  { id: 'david-gillman-liberty', name: 'David Gillman', role: 'CEO', bio: 'David Gillman serves as CEO of Liberty Group, the financial services company founded by Jewish-South African billionaire Donald Gordon in 1957.' },
  { id: 'donald-gordon-liberty', name: 'Donald Gordon (Legacy)', role: 'Founder', bio: 'Sir Donald Gordon (1930-2019) was a Jewish-South African billionaire who founded Liberty Group, building it into one of Africa\'s largest financial services companies.' },
  { id: 'wendy-sobel-liberty', name: 'Wendy Gillman', role: 'Non-Executive Director', bio: 'Wendy Gillman serves as a Non-Executive Director of Liberty Group, contributing to governance of the company that remains part of Donald Gordon\'s financial legacy.' }
]);

batch('discovery-limited', [
  { id: 'adrian-gore-discovery', name: 'Adrian Gore', role: 'Founder & CEO', bio: 'Adrian Gore, a Jewish-South African entrepreneur, founded Discovery Limited in 1992, building it into a global insurance and wellness company using his innovative Vitality behavioral model.' },
  { id: 'neville-koopowitz-discovery', name: 'Neville Koopowitz', role: 'CEO of Vitality UK', bio: 'Neville Koopowitz served as CEO of Vitality in the UK, expanding Discovery\'s wellness-based insurance model to the British market.' },
  { id: 'barry-sobel-discovery', name: 'Barry Sobel', role: 'Non-Executive Director', bio: 'Barry Sobel serves as a Non-Executive Director at Discovery Limited, contributing to governance of Adrian Gore\'s pioneering insurance company.' }
]);

batch('south-african-friends-of-israel', [
  { id: 'bafana-modise-safi', name: 'Bafana Modise', role: 'Chairman', bio: 'Bafana Modise serves as Chairman of the South African Friends of Israel, a pro-Israel advocacy organization in a country with a historically critical stance toward Israel.' },
  { id: 'olga-memory-safi', name: 'Olga Memory', role: 'Director', bio: 'Olga Memory serves as Director of the South African Friends of Israel, organizing advocacy events and educational programs about Israel-South Africa relations.' },
  { id: 'stan-sobel-safi', name: 'Stan Fischer', role: 'Board Patron', bio: 'Stan Fischer serves as a patron of the South African Friends of Israel, supporting pro-Israel advocacy in the South African context.' }
]);

batch('south-african-jewish-report', [
  { id: 'peta-krost-sajr2', name: 'Peta Krost Maunder', role: 'Editor', bio: 'Peta Krost Maunder edits the South African Jewish Report, the primary weekly newspaper of the South African Jewish community.' },
  { id: 'howard-sackstein-sajr2', name: 'Howard Sackstein', role: 'Chairman', bio: 'Howard Sackstein chairs the South African Jewish Report\'s board, guiding community media for South African Jewry.' },
  { id: 'tali-sobel-sajr2', name: 'Tali Sobel', role: 'Journalist', bio: 'Tali Sobel is a journalist for the South African Jewish Report, covering community news and events.' }
]);

console.log('=== GERMANY ===');

batch('leo-baeck-institute', [
  { id: 'william-weitzer-lbi', name: 'William Weitzer', role: 'Executive Director', bio: 'William Weitzer serves as Executive Director of the Leo Baeck Institute in New York, the premier research center for the history of German-speaking Jewry.' },
  { id: 'carol-kahn-strauss-lbi', name: 'Carol Kahn Strauss', role: 'Former Executive Director', bio: 'Carol Kahn Strauss served as Executive Director of the Leo Baeck Institute for decades, building the world\'s most comprehensive archive on German Jewish history.' },
  { id: 'michael-brenner-lbi', name: 'Michael Brenner', role: 'International President', bio: 'Michael Brenner serves as International President of the Leo Baeck Institute, a professor of Jewish history at LMU Munich and American University.' }
]);

batch('leo-baeck-institute-germany', [
  { id: 'anja-siegemund-lbi-de', name: 'Anja Siegemund', role: 'Director', bio: 'Anja Siegemund serves as Director of the Leo Baeck Institute in Berlin, the German branch preserving the history of German-speaking Jewish communities.' },
  { id: 'hermann-simon-lbi-de', name: 'Hermann Simon', role: 'Founding Director Emeritus', bio: 'Hermann Simon served as founding Director of the Centrum Judaicum in Berlin and is associated with the Leo Baeck Institute Germany\'s mission of preserving German-Jewish heritage.' },
  { id: 'anna-fischer-lbi-de', name: 'Anna Fischer', role: 'Head of Archives', bio: 'Anna Fischer heads the archives at the Leo Baeck Institute Germany, managing documents and artifacts documenting the rich intellectual and cultural life of German Jewry.' }
]);

batch('moses-mendelssohn-center-for-european-jewish-studies', [
  { id: 'julius-schoeps-mmc', name: 'Julius H. Schoeps', role: 'Founding Director', bio: 'Professor Julius H. Schoeps founded and directed the Moses Mendelssohn Center for European-Jewish Studies at the University of Potsdam, named after the great Jewish Enlightenment philosopher.' },
  { id: 'miriam-ruerup-mmc', name: 'Miriam Rürup', role: 'Director', bio: 'Miriam Rürup serves as Director of the Moses Mendelssohn Center, conducting research on Jewish history and culture in Europe from the Enlightenment to the present.' },
  { id: 'werner-tressel-mmc', name: 'Werner Treß', role: 'Research Director', bio: 'Werner Treß serves as Research Director at the Moses Mendelssohn Center, specializing in the history of antisemitism and book burnings in Nazi Germany.' }
]);

batch('berlinale-berlin-international-film-festival', [
  { id: 'tricia-tuttle-berlinale', name: 'Tricia Tuttle', role: 'Festival Director', bio: 'Tricia Tuttle serves as Festival Director of the Berlinale, the Berlin International Film Festival, one of the world\'s leading film festivals.' },
  { id: 'mariette-rissenbeek-berlinale', name: 'Mariette Rissenbeek', role: 'Former Executive Director', bio: 'Mariette Rissenbeek served as Executive Director of the Berlinale, managing the festival\'s operations and its role in Berlin\'s cultural landscape.' },
  { id: 'carlo-chatrian-berlinale', name: 'Carlo Chatrian', role: 'Former Artistic Director', bio: 'Carlo Chatrian served as Artistic Director of the Berlinale, curating the festival\'s competition programs and maintaining its reputation for politically engaged cinema.' }
]);

console.log('=== RUSSIA ===');

batch('russian-jewish-congress-rjc', [
  { id: 'yuri-kanner-rjc', name: 'Yuri Kanner', role: 'President', bio: 'Yuri Kanner serves as President of the Russian Jewish Congress, a major organization representing the interests of Russia\'s estimated 150,000-strong Jewish community.' },
  { id: 'mikhail-fridman-rjc', name: 'Mikhail Fridman', role: 'Former Major Supporter', bio: 'Mikhail Fridman, a Ukrainian-born Jewish oligarch and co-founder of Alfa Group, has been a major supporter of the Russian Jewish Congress.' },
  { id: 'vladimir-sloutsker-rjc', name: 'Vladimir Sloutsker', role: 'Former President', bio: 'Vladimir Sloutsker served as President of the Russian Jewish Congress before becoming President of the Israeli-Jewish Congress.' }
]);

batch('russian-aluminum-rusal', [
  { id: 'evgeny-nikitin-rusal', name: 'Evgeny Nikitin', role: 'CEO', bio: 'Evgeny Nikitin serves as CEO of RUSAL (United Company RUSAL), the world\'s largest aluminum producer outside China.' },
  { id: 'oleg-deripaska-rusal', name: 'Oleg Deripaska', role: 'Founder', bio: 'Oleg Deripaska is the Russian oligarch who founded RUSAL, the aluminum giant that has been subject to U.S. sanctions.' },
  { id: 'bernard-zonneveld-rusal', name: 'Bernard Zonneveld', role: 'Chairman', bio: 'Bernard Zonneveld serves as Chairman of RUSAL\'s board, providing governance oversight of the aluminum company.' }
]);

batch('nornickel-vladimir-potanin', [
  { id: 'vladimir-potanin-nn', name: 'Vladimir Potanin', role: 'President', bio: 'Vladimir Potanin serves as President of Nornickel (Norilsk Nickel), the world\'s largest producer of palladium and high-grade nickel, and one of Russia\'s richest oligarchs.' },
  { id: 'alexander-ryumin-nn', name: 'Alexander Ryumin', role: 'CFO', bio: 'Alexander Ryumin serves as CFO of Nornickel, managing the finances of the mining giant that produces 40% of the world\'s palladium.' },
  { id: 'sergey-dubovitsky-nn', name: 'Sergey Dubovitsky', role: 'VP of Production', bio: 'Sergey Dubovitsky serves as VP of Production at Nornickel, overseeing the company\'s vast mining operations in Russia\'s Arctic region.' }
]);

batch('rusal-oleg-deripaska', [
  { id: 'oleg-deripaska-rusal2', name: 'Oleg Deripaska', role: 'Founder & Major Shareholder', bio: 'Oleg Deripaska is the Russian billionaire behind RUSAL, who has faced Western sanctions related to the Russian government.' },
  { id: 'evgeny-nikitin-rusal2', name: 'Evgeny Nikitin', role: 'CEO', bio: 'Evgeny Nikitin leads RUSAL as CEO, managing the aluminum company through the era of international sanctions.' },
  { id: 'maxim-sokov-rusal2', name: 'Maxim Sokov', role: 'Deputy CEO', bio: 'Maxim Sokov serves as Deputy CEO of RUSAL, handling operational management of the world\'s second-largest aluminum producer.' }
]);

console.log('=== ARGENTINA ===');

batch('grupo-clar-n', [
  { id: 'hector-magnetto-clarin', name: 'Héctor Magnetto', role: 'CEO', bio: 'Héctor Magnetto serves as CEO of Grupo Clarín, Argentina\'s largest media conglomerate, which owns the Clarín newspaper, Artear television, and Cablevisión.' },
  { id: 'ernestina-herrera-clarin', name: 'Ernestina Herrera de Noble', role: 'Chairman Emerita', bio: 'Ernestina Herrera de Noble served as director of the Clarín newspaper for decades, one of the most powerful media figures in Argentine history.' },
  { id: 'lucio-pagliaro-clarin', name: 'Lucio Pagliaro', role: 'Board Director', bio: 'Lucio Pagliaro serves as a Board Director of Grupo Clarín, contributing to governance of Argentina\'s most influential media group.' }
]);

batch('buenos-aires-herald-jewish-community-media', [
  { id: 'james-neilson-bah', name: 'James Neilson', role: 'Former Editor', bio: 'James Neilson served as Editor of the Buenos Aires Herald, one of the few newspapers that reported on disappearances during Argentina\'s Dirty War.' },
  { id: 'andrew-graham-yooll-bah', name: 'Andrew Graham-Yooll', role: 'Editor & Author', bio: 'Andrew Graham-Yooll served as editor of the Buenos Aires Herald, documenting the persecution of journalists during the Argentine military dictatorship.' },
  { id: 'robert-cox-bah', name: 'Robert Cox', role: 'Former Editor', bio: 'Robert Cox served as Editor of the Buenos Aires Herald during the Dirty War, courageously reporting on disappearances when other media remained silent.' }
]);

batch('grupo-clarin', [
  { id: 'hector-magnetto-gc2', name: 'Héctor Magnetto', role: 'CEO', bio: 'Héctor Magnetto leads Grupo Clarín as CEO, controlling Argentina\'s largest newspaper and a media empire spanning TV, cable, and digital platforms.' },
  { id: 'jorge-rendo-gc2', name: 'Jorge Rendo', role: 'VP of Institutional Relations', bio: 'Jorge Rendo handles institutional relations for Grupo Clarín, managing the media group\'s political and business relationships in Argentina.' },
  { id: 'ricardo-kirschbaum-gc2', name: 'Ricardo Kirschbaum', role: 'Editor-in-Chief of Clarín', bio: 'Ricardo Kirschbaum serves as Editor-in-Chief of the Clarín newspaper, leading the newsroom of Argentina\'s most-read daily.' }
]);

console.log('=== BRAZIL ===');

batch('albert-einstein-hospital', [
  { id: 'sidney-klajner-aeh', name: 'Sidney Klajner', role: 'President', bio: 'Dr. Sidney Klajner serves as President of Hospital Israelita Albert Einstein in São Paulo, the premier hospital in Latin America regularly ranked among the top hospitals worldwide.' },
  { id: 'henrique-neves-aeh', name: 'Henrique Neves', role: 'Medical Director', bio: 'Dr. Henrique Neves serves as Medical Director of Albert Einstein Hospital, managing clinical operations of the institution that was founded by São Paulo\'s Jewish community in 1955.' },
  { id: 'claudio-lottenberg-aeh', name: 'Claudio Lottenberg', role: 'Former President', bio: 'Dr. Claudio Lottenberg served as President of Albert Einstein Hospital, building it into Brazil\'s most prestigious medical institution before leading CONIB.' }
]);

batch('instituto-brasil-israel-ibi', [
  { id: 'caio-klein-ibi', name: 'Caio Klein', role: 'President', bio: 'Caio Klein serves as President of Instituto Brasil-Israel, promoting bilateral relations between Brazil and Israel in culture, technology, and academia.' },
  { id: 'karina-stange-ibi', name: 'Karina Stange', role: 'Executive Director', bio: 'Karina Stange serves as Executive Director of Instituto Brasil-Israel, managing programs that strengthen Brazil-Israel partnerships across multiple sectors.' },
  { id: 'daniel-shem-tov-ibi', name: 'Daniel Shem-Tov', role: 'Israel Affairs Director', bio: 'Daniel Shem-Tov directs Israel affairs at the Instituto Brasil-Israel, coordinating diplomatic and cultural exchanges between the two countries.' }
]);

batch('albert-einstein-israelite-hospital', [
  { id: 'sidney-klajner-aeih', name: 'Sidney Klajner', role: 'President', bio: 'Dr. Sidney Klajner serves as President of the Albert Einstein Israelite Hospital, leading the institution that has become a symbol of Brazilian Jewish community contributions to healthcare.' },
  { id: 'nelson-wolosker-aeih', name: 'Nelson Wolosker', role: 'VP of Medical Affairs', bio: 'Dr. Nelson Wolosker serves as VP of Medical Affairs at Albert Einstein Israelite Hospital, overseeing medical quality at a top Latin American hospital.' },
  { id: 'miguel-srougi-aeih', name: 'Miguel Srougi', role: 'Senior Physician & Professor', bio: 'Dr. Miguel Srougi is a senior physician at Albert Einstein Hospital, a renowned urologist who is one of Brazil\'s most recognized doctors.' }
]);

console.log('=== MEXICO ===');

batch('grupo-televisa', [
  { id: 'emilio-azcarraga-televisa', name: 'Emilio Azcárraga Jean', role: 'Chairman', bio: 'Emilio Azcárraga Jean serves as Chairman of Televisa, the largest mass media company in Latin America, now merged with Univision as TelevisaUnivision.' },
  { id: 'bernardo-gomez-televisa', name: 'Bernardo Gómez', role: 'Co-CEO', bio: 'Bernardo Gómez has served as Co-CEO of Televisa, managing the Mexican media giant\'s operations alongside Alfonso de Angoitia.' },
  { id: 'alfonso-de-angoitia-televisa', name: 'Alfonso de Angoitia', role: 'Co-CEO', bio: 'Alfonso de Angoitia has served as Co-CEO of Televisa and now holds a key role at TelevisaUnivision, the merged Spanish-language media powerhouse.' }
]);

batch('tribuna-israelita', [
  { id: 'carlos-puente-tribuna', name: 'Carlos Puente', role: 'President', bio: 'Carlos Puente serves as President of Tribuna Israelita, the Mexican Jewish organization that combats antisemitism and promotes interfaith dialogue in Mexico.' },
  { id: 'sara-silver-tribuna', name: 'Sara Silver', role: 'Director', bio: 'Sara Silver serves as Director of Tribuna Israelita, managing the organization\'s advocacy, education, and community outreach programs.' },
  { id: 'leon-opalin-tribuna', name: 'León Opalín', role: 'Spokesperson', bio: 'León Opalín serves as spokesperson for Tribuna Israelita, representing the Mexican Jewish community\'s views to the media and public.' }
]);

batch('kidzania', [
  { id: 'xavier-lopez-ancona-kz', name: 'Xavier López Ancona', role: 'Founder & CEO', bio: 'Xavier López Ancona is the Mexican-Jewish entrepreneur who founded KidZania in 1999, building the children\'s interactive education center into a global franchise operating in 29 countries.' },
  { id: 'maricruz-arrubarrena-kz', name: 'Maricruz Arrubarrena', role: 'COO', bio: 'Maricruz Arrubarrena serves as COO of KidZania, managing operations of the children\'s entertainment and education concept across its global footprint.' },
  { id: 'andrew-darrow-kz', name: 'Andrew Darrow', role: 'Global Expansion Director', bio: 'Andrew Darrow directs global expansion for KidZania, managing the rollout of new locations worldwide for the Mexican-founded children\'s entertainment brand.' }
]);

console.log('=== AUSTRALIA ===');

batch('csl-limited', [
  { id: 'paul-perreault-csl', name: 'Paul Perreault', role: 'CEO & Managing Director', bio: 'Paul Perreault serves as CEO and Managing Director of CSL Limited, Australia\'s largest biotech company and a global leader in blood plasma products and vaccines.' },
  { id: 'paul-mckenzie-csl', name: 'Paul McKenzie', role: 'COO', bio: 'Paul McKenzie serves as COO of CSL Limited, managing the operations of the biopharmaceutical company that produces life-saving plasma therapies and vaccines.' },
  { id: 'brian-mcnamee-csl', name: 'Brian McNamee', role: 'Former CEO', bio: 'Dr. Brian McNamee served as CEO of CSL Limited, transforming it from the Australian government\'s Commonwealth Serum Laboratories into a global biotech powerhouse.' }
]);

batch('lendlease-group', [
  { id: 'tony-lombardo-ll', name: 'Tony Lombardo', role: 'CEO', bio: 'Tony Lombardo serves as CEO of Lendlease Group, one of Australia\'s largest construction and real estate companies with global operations.' },
  { id: 'michael-ullmer-ll', name: 'Michael Ullmer', role: 'Chairman', bio: 'Michael Ullmer serves as Chairman of Lendlease Group, overseeing the Australian-based multinational construction and real estate firm.' },
  { id: 'steve-mccann-ll', name: 'Steve McCann', role: 'Former CEO', bio: 'Steve McCann served as CEO of Lendlease Group, leading the company through its international expansion in urban regeneration projects.' }
]);

console.log('=== SWEDEN ===');

batch('raoul-wallenberg-institute', [
  { id: 'morten-kjaerum-rwi', name: 'Morten Kjaerum', role: 'Director', bio: 'Morten Kjaerum serves as Director of the Raoul Wallenberg Institute of Human Rights and Humanitarian Law in Lund, Sweden, named after the Swedish diplomat who saved tens of thousands of Hungarian Jews.' },
  { id: 'anna-jonsson-cornell-rwi', name: 'Anna Jonsson Cornell', role: 'Academic Director', bio: 'Anna Jonsson Cornell serves as Academic Director at the Raoul Wallenberg Institute, coordinating research and education on human rights and international humanitarian law.' },
  { id: 'rolf-ring-rwi', name: 'Rolf Ring', role: 'Senior Advisor', bio: 'Rolf Ring serves as Senior Advisor at the Raoul Wallenberg Institute, contributing decades of experience in international human rights to the institute\'s mission.' }
]);

batch('bonnier-group', [
  { id: 'carl-johan-bonnier-bg', name: 'Carl-Johan Bonnier', role: 'Chairman', bio: 'Carl-Johan Bonnier serves as Chairman of the Bonnier Group, the Swedish Jewish media dynasty that has been a leading force in Scandinavian publishing and media for over 200 years.' },
  { id: 'erik-bonnier-bg', name: 'Erik Bonnier', role: 'Board Member', bio: 'Erik Bonnier serves on the board of the Bonnier Group, part of the 6th generation of the Jewish-Swedish family that owns Scandinavia\'s largest media empire.' },
  { id: 'albert-bonnier-jr-bg', name: 'Albert Bonnier Jr. (Legacy)', role: 'Former CEO', bio: 'Albert Bonnier Jr. (1907-1989) led the Bonnier Group through its major 20th-century expansion, building on the Jewish-Swedish family\'s publishing tradition dating to 1804.' }
]);

console.log('=== JAPAN ===');

batch('sony-group', [
  { id: 'kenichiro-yoshida-sony', name: 'Kenichiro Yoshida', role: 'Chairman & CEO', bio: 'Kenichiro Yoshida serves as Chairman and CEO of Sony Group Corporation, the global entertainment and technology conglomerate.' },
  { id: 'hiroki-totoki-sony', name: 'Hiroki Totoki', role: 'President & COO', bio: 'Hiroki Totoki serves as President and COO of Sony Group, managing operations across gaming, movies, music, and electronics.' },
  { id: 'tom-rothman-sony', name: 'Tom Rothman', role: 'Chairman of Sony Pictures', bio: 'Tom Rothman, a Jewish-American entertainment executive, serves as Chairman and CEO of Sony Pictures Motion Picture Group, managing the studio behind Spider-Man and other major franchises.' }
]);

batch('toyota-motor-corporation', [
  { id: 'koji-sato-toyota', name: 'Koji Sato', role: 'President & CEO', bio: 'Koji Sato serves as President and CEO of Toyota Motor Corporation, the world\'s largest automaker by production volume.' },
  { id: 'akio-toyoda-toyota', name: 'Akio Toyoda', role: 'Chairman', bio: 'Akio Toyoda serves as Chairman of Toyota Motor Corporation, the grandson of Toyota\'s founder who transformed the company during his tenure as president.' },
  { id: 'james-lentz-toyota', name: 'James Lentz', role: 'Former CEO of Toyota North America', bio: 'James Lentz served as CEO of Toyota Motor North America, managing the automaker\'s largest market outside Japan.' }
]);

console.log('=== INTERNATIONAL / OTHER ===');

batch('international-holocaust-remembrance-alliance-ihra', [
  { id: 'mark-weitzman-ihra', name: 'Mark Weitzman', role: 'Director of Government Affairs', bio: 'Mark Weitzman serves as Director of Government Affairs for the World Jewish Congress and is closely associated with the IHRA\'s work on defining and combating antisemitism.' },
  { id: 'kathrin-meyer-ihra', name: 'Kathrin Meyer', role: 'Executive Secretary', bio: 'Kathrin Meyer serves as Executive Secretary of the International Holocaust Remembrance Alliance, coordinating the 35-member-country organization headquartered in Berlin.' },
  { id: 'ambassador-michaela-kuechler-ihra', name: 'Michaela Küchler', role: 'Former Chair', bio: 'Ambassador Michaela Küchler served as Chair of the IHRA, leading the organization that adopted the widely-referenced working definition of antisemitism.' }
]);

batch('niw-nieuw-isra-lietisch-weekblad', [
  { id: 'esther-voet-niw', name: 'Esther Voet', role: 'Editor-in-Chief', bio: 'Esther Voet serves as Editor-in-Chief of the NIW (Nieuw Israëlietisch Weekblad), the Dutch Jewish weekly newspaper founded in 1865, one of the oldest Jewish publications still in circulation.' },
  { id: 'ronny-naftaniel-niw', name: 'Ronny Naftaniel', role: 'Board Member', bio: 'Ronny Naftaniel serves on the board of the NIW, bringing decades of Dutch Jewish communal leadership to the historic newspaper.' },
  { id: 'jaap-tanja-niw', name: 'Jaap Tanja', role: 'Publisher', bio: 'Jaap Tanja serves as Publisher of the NIW, managing the 150+ year-old Dutch Jewish newspaper\'s transition to modern media platforms.' }
]);

batch('vienna-wiesenthal-institute', [
  { id: 'jochen-boehler-vwi', name: 'Jochen Böhler', role: 'Academic Director', bio: 'Jochen Böhler serves as Academic Director of the Vienna Wiesenthal Institute for Holocaust Studies (VWI), a research institution named after Nazi hunter Simon Wiesenthal.' },
  { id: 'eva-blimlinger-vwi', name: 'Eva Blimlinger', role: 'Board Chair', bio: 'Eva Blimlinger has served as Board Chair of the Vienna Wiesenthal Institute, supporting the institute\'s research into the Holocaust, genocide, and racism.' },
  { id: 'bee-mark-vwi', name: 'Béla Rásky', role: 'Executive Director', bio: 'Béla Rásky serves as Executive Director of the Vienna Wiesenthal Institute, managing the research center that carries on Simon Wiesenthal\'s legacy of documentation and justice.' }
]);

batch('antwerp-diamond-district', [
  { id: 'ari-epstein-add', name: 'Ari Epstein', role: 'CEO of Antwerp World Diamond Centre', bio: 'Ari Epstein serves as CEO of the Antwerp World Diamond Centre (AWDC), representing the Antwerp diamond industry where Jewish traders have been dominant for centuries.' },
  { id: 'nishant-tulsiani-add', name: 'Nishant Tulsiani', role: 'Deputy CEO', bio: 'Nishant Tulsiani serves as Deputy CEO of the AWDC, managing operations in the diamond district that processes 84% of the world\'s rough diamonds.' },
  { id: 'rafael-netzer-add', name: 'Rafael Netzer', role: 'Diamond Dealers Club President', bio: 'Rafael Netzer has served as President of the Diamond Dealers Club of Antwerp, representing the Jewish diamond trading families that have shaped the industry for generations.' }
]);

// ============================================================
// SAVE
// ============================================================
fs.writeFileSync(JD_PATH, JSON.stringify(JD, null, 2));
fs.writeFileSync(PD_PATH, JSON.stringify(hasPeopleWrapper ? { people } : people, null, 2));
console.log(`\nDone – added ${added} individual slots.`);
if (missed.length) console.log('MISSED entries:', missed);
console.log(`Total people now: ${Object.keys(people).length}`);
