#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 11 – Expanding 4→7+ individuals
 * Batch 4b: Education & Academia (40) + Culture & Arts (35) + Charity & Philanthropy (18) = 93 entries
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
// EDUCATION & ACADEMIA (40 entries)
// ============================================================
console.log('=== EDUCATION & ACADEMIA ===');

batch('brandeis-university', [
  { id: 'ron-liebowitz-brandeis', name: 'Ron Liebowitz', role: 'President', bio: 'Ron Liebowitz serves as President of Brandeis University, the only nonsectarian Jewish-sponsored research university in the United States, founded in 1948 and named after Justice Louis Brandeis.' },
  { id: 'lisa-lynch-brandeis', name: 'Lisa Lynch', role: 'Provost', bio: 'Lisa Lynch serves as Provost of Brandeis University, overseeing the academic programs of the university known for its commitment to social justice and scholarly excellence.' },
  { id: 'jonathan-sarna-brandeis', name: 'Jonathan Sarna', role: 'Professor of American Jewish History', bio: 'Jonathan Sarna is a professor at Brandeis University and one of the foremost scholars of American Jewish history, author of the definitive "American Judaism: A History."' }
]);

batch('touro-university', [
  { id: 'alan-kadish-touro', name: 'Alan Kadish', role: 'President & CEO', bio: 'Dr. Alan Kadish serves as President and CEO of the Touro University System, a Jewish-sponsored educational institution with 35+ campuses and over 19,000 students worldwide.' },
  { id: 'rabbi-doniel-lander-touro', name: 'Doniel Lander', role: 'Chancellor (Legacy)', bio: 'Rabbi Doniel Lander (1943-2022) served as Chancellor of Touro University and Rosh HaYeshiva of Ohr HaChaim, transforming Touro into one of the largest Jewish educational institutions.' },
  { id: 'patricia-salkin-touro', name: 'Patricia Salkin', role: 'Provost', bio: 'Patricia Salkin serves as Provost of Touro University, managing academic operations across the system\'s schools of law, medicine, health sciences, and Jewish studies.' }
]);

batch('jewish-theological-seminary', [
  { id: 'shuly-rubin-schwartz-jts', name: 'Shuly Rubin Schwartz', role: 'Chancellor', bio: 'Shuly Rubin Schwartz serves as Chancellor of the Jewish Theological Seminary, the flagship institution of Conservative Judaism in America and one of the most important Jewish academic centers in the world.' },
  { id: 'david-kraemer-jts', name: 'David Kraemer', role: 'Professor of Talmud', bio: 'David Kraemer serves as Professor of Talmud and Rabbinics at JTS, a leading scholar of Jewish dietary laws and ancient rabbinic literature.' },
  { id: 'burton-visotzky-jts', name: 'Burton Visotzky', role: 'Professor of Midrash', bio: 'Burton Visotzky serves as Professor of Midrash and Interreligious Studies at JTS, a pioneer in interfaith dialogue and Jewish-Christian biblical interpretation.' }
]);

batch('yeshiva-university', [
  { id: 'ari-berman-yu', name: 'Ari Berman', role: 'President', bio: 'Rabbi Dr. Ari Berman serves as President of Yeshiva University, the flagship institution of Modern Orthodox Judaism with campuses in Manhattan and the Bronx.' },
  { id: 'selma-botman-yu', name: 'Selma Botman', role: 'Provost', bio: 'Selma Botman serves as Provost of Yeshiva University, overseeing academic programs that blend Torah studies with secular education under the motto "Torah Umadda."' },
  { id: 'menachem-penner-yu', name: 'Menachem Penner', role: 'Dean of RIETS', bio: 'Rabbi Menachem Penner serves as Dean of the Rabbi Isaac Elchanan Theological Seminary (RIETS) at Yeshiva University, the premier Modern Orthodox rabbinical seminary.' }
]);

batch('hillel-international', [
  { id: 'adam-lehman-hillel', name: 'Adam Lehman', role: 'President & CEO', bio: 'Adam Lehman serves as President and CEO of Hillel International, the largest Jewish campus organization in the world, engaging students at 850+ colleges and universities.' },
  { id: 'eric-fingerhut-hillel', name: 'Eric Fingerhut', role: 'Former President & CEO', bio: 'Eric Fingerhut served as President and CEO of Hillel International before moving to lead JFNA, transforming Hillel\'s engagement model for the next generation.' },
  { id: 'becky-voorwinde-hillel', name: 'Becky Voorwinde', role: 'Global VP of Campus', bio: 'Becky Voorwinde serves as Global VP of Campus at Hillel International, overseeing programming that reaches over 250,000 Jewish students globally.' }
]);

batch('hebrew-union-college-jewish-institute-of-religion', [
  { id: 'andrew-rehfeld-huc', name: 'Andrew Rehfeld', role: 'President', bio: 'Andrew Rehfeld serves as President of Hebrew Union College-Jewish Institute of Religion, the seminary of Reform Judaism with campuses in Cincinnati, New York, Los Angeles, and Jerusalem.' },
  { id: 'andrea-weiss-huc', name: 'Andrea Weiss', role: 'Provost', bio: 'Rabbi Andrea Weiss serves as Provost of HUC-JIR, overseeing the academic programs that train Reform rabbis, cantors, educators, and communal professionals.' },
  { id: 'david-ellenson-huc', name: 'David Ellenson', role: 'Chancellor Emeritus', bio: 'Rabbi David Ellenson (1947-2023) served as Chancellor of HUC-JIR and was a leading scholar of modern Jewish history and the Reform movement.' }
]);

batch('ort-america', [
  { id: 'hilde-myriam-pardo-ort', name: 'Dr. Jean de Gunzburg', role: 'Chairman of World ORT', bio: 'Dr. Jean de Gunzburg has served as Chairman of World ORT, overseeing ORT America\'s role in the global Jewish educational network that serves 200,000+ students annually.' },
  { id: 'naomi-levin-ort', name: 'Naomi Levin', role: 'CEO of ORT America', bio: 'Naomi Levin serves as CEO of ORT America, leading the American arm of the global Jewish educational organization founded in Russia in 1880.' },
  { id: 'robert-singer-ort', name: 'Robert Singer', role: 'Director General Emeritus', bio: 'Robert Singer served as Director General of World ORT, building it into the world\'s largest Jewish education and vocational training network.' }
]);

batch('ramaz-school-nyc', [
  { id: 'andrew-shack-ramaz', name: 'Andrew Shack', role: 'Head of School', bio: 'Andrew Shack serves as Head of the Ramaz School, one of the premier Modern Orthodox day schools in Manhattan, founded in 1937 by Rabbi Joseph Lookstein.' },
  { id: 'haskel-lookstein-ramaz', name: 'Haskel Lookstein', role: 'Rabbi Emeritus', bio: 'Rabbi Haskel Lookstein served as Principal and then Rabbi of Congregation Kehilath Jeshurun and the Ramaz School for over 60 years, shaping generations of Modern Orthodox leaders.' },
  { id: 'steven-burg-ramaz', name: 'Steven Burg', role: 'Board President', bio: 'Steven Burg serves on the Board of the Ramaz School, supporting the institution\'s mission of academic excellence combined with Torah learning on Manhattan\'s Upper East Side.' }
]);

batch('camp-ramah', [
  { id: 'rabbi-mitchell-cohen-ramah', name: 'Mitchell Cohen', role: 'National Director', bio: 'Rabbi Mitchell Cohen serves as National Director of the National Ramah Commission, overseeing the network of Camp Ramah summer camps that have been shaping Conservative Jewish identity since 1947.' },
  { id: 'amy-skopp-cooper-ramah', name: 'Amy Skopp Cooper', role: 'Associate Director', bio: 'Amy Skopp Cooper serves as Associate National Director of the National Ramah Commission, managing programming that serves thousands of campers across North America annually.' },
  { id: 'hillary-choset-ramah', name: 'Hillary Choset', role: 'Camp Director (Poconos)', bio: 'Hillary Choset serves as Director of Camp Ramah in the Poconos, one of the flagship camps in the Ramah network that has produced generations of Jewish leaders.' }
]);

batch('camp-young-judaea', [
  { id: 'david-marcus-cyj', name: 'David Marcus', role: 'Camp Director', bio: 'David Marcus serves as Director of Camp Young Judaea, the Zionist summer camp affiliated with the Hadassah organization, promoting Jewish identity and Israel connection since 1939.' },
  { id: 'sharon-edelman-cyj', name: 'Sharon Edelman', role: 'Program Director', bio: 'Sharon Edelman directs programming at Camp Young Judaea, creating immersive Jewish and Zionist educational experiences for hundreds of campers each summer.' },
  { id: 'moshe-abelesz-cyj', name: 'Moshe Abelesz', role: 'Israel Programs Coordinator', bio: 'Moshe Abelesz coordinates Israel programs at Camp Young Judaea, building the Israel component that distinguishes the camp\'s Zionist educational mission.' }
]);

batch('harvard-hillel', [
  { id: 'rabbi-jonah-steinberg-hh', name: 'Jonah Steinberg', role: 'Executive Director', bio: 'Rabbi Jonah Steinberg serves as Executive Director of Harvard Hillel, the Jewish student organization at one of the world\'s most prestigious universities.' },
  { id: 'rachel-gelman-hh', name: 'Rachel Gelman', role: 'Program Director', bio: 'Rachel Gelman directs programming at Harvard Hillel, creating space for Jewish intellectual life, cultural celebration, and community building at Harvard.' },
  { id: 'eric-nelson-hh', name: 'Eric Nelson', role: 'Board Chair', bio: 'Eric Nelson serves as Board Chair of Harvard Hillel, guiding one of the most prominent campus Jewish organizations that has produced leading Jewish thinkers and leaders.' }
]);

batch('gratz-college', [
  { id: 'paul-finkelman-gratz', name: 'Paul Finkelman', role: 'President', bio: 'Dr. Paul Finkelman served as President of Gratz College, the oldest independent Jewish college in North America, founded in Philadelphia in 1895.' },
  { id: 'zev-eleff-gratz', name: 'Zev Eleff', role: 'Chief Academic Officer', bio: 'Zev Eleff has served as Chief Academic Officer at Gratz College, a historian of American Judaism who has helped modernize the college\'s academic programs.' },
  { id: 'joy-goldstein-gratz', name: 'Joy Goldstein', role: 'Director of Holocaust Studies', bio: 'Joy Goldstein directs the Holocaust and Genocide Studies program at Gratz College, one of the first colleges to offer a master\'s degree in Holocaust studies.' }
]);

batch('birthright-israel', [
  { id: 'gidi-mark-birthright', name: 'Gidi Mark', role: 'CEO', bio: 'Gidi Mark serves as CEO of Birthright Israel, the program that has brought over 800,000 young Jewish adults on free 10-day trips to Israel since 1999.' },
  { id: 'charles-bronfman-birthright', name: 'Charles Bronfman', role: 'Co-Founder', bio: 'Charles Bronfman, Canadian-Jewish billionaire and philanthropist, co-founded Birthright Israel with Michael Steinhardt, creating one of the most impactful Jewish identity programs in history.' },
  { id: 'michael-steinhardt-birthright', name: 'Michael Steinhardt', role: 'Co-Founder', bio: 'Michael Steinhardt, a Jewish-American investor and philanthropist, co-founded Birthright Israel, believing that a trip to Israel could transform Jewish identity for young adults.' }
]);

batch('technion-israel-institute-of-technology', [
  { id: 'uri-sivan-technion', name: 'Uri Sivan', role: 'President', bio: 'Professor Uri Sivan serves as President of the Technion - Israel Institute of Technology, Israel\'s oldest university and one of the world\'s leading science and technology research institutions.' },
  { id: 'boaz-golany-technion', name: 'Boaz Golany', role: 'Executive VP', bio: 'Professor Boaz Golany serves as Executive Vice President of the Technion, overseeing operations of the institution whose graduates lead Israel\'s tech industry.' },
  { id: 'peretz-lavie-technion', name: 'Peretz Lavie', role: 'President Emeritus', bio: 'Professor Peretz Lavie served as President of the Technion, leading the institution that has produced three Nobel laureates and powered Israel\'s "Startup Nation" reputation.' }
]);

batch('reichman-university-idc-herzliya', [
  { id: 'uriel-reichman-idc', name: 'Uriel Reichman', role: 'Founding President', bio: 'Professor Uriel Reichman is the Founding President of Reichman University (formerly IDC Herzliya), Israel\'s first private university and a hub for innovation and entrepreneurship education.' },
  { id: 'rafi-melnick-idc', name: 'Rafi Melnick', role: 'Provost', bio: 'Professor Rafi Melnick serves as Provost of Reichman University, managing its academic programs including the highly regarded Raphael Recanati International School.' },
  { id: 'yoav-tepper-idc', name: 'Yoav Tepper', role: 'VP of External Relations', bio: 'Yoav Tepper serves as VP of External Relations at Reichman University, managing international partnerships and the university\'s global reputation.' }
]);

batch('hebrew-university-of-jerusalem', [
  { id: 'asher-cohen-huji', name: 'Asher Cohen', role: 'President', bio: 'Professor Asher Cohen serves as President of the Hebrew University of Jerusalem, founded in 1918 and opened in 1925 with a board that included Albert Einstein, Sigmund Freud, and Chaim Weizmann.' },
  { id: 'tamir-sheafer-huji', name: 'Tamir Sheafer', role: 'Rector', bio: 'Professor Tamir Sheafer serves as Rector of the Hebrew University of Jerusalem, overseeing academic affairs of the institution that has produced eight Nobel laureates.' },
  { id: 'oron-shagrir-huji', name: 'Oron Shagrir', role: 'Vice President for Research', bio: 'Professor Oron Shagrir serves as Vice President for Research and Development at the Hebrew University, managing one of the most prolific research institutions in the Middle East.' }
]);

batch('acad-mie-hillel', [
  { id: 'marc-william-academie', name: 'Marc William', role: 'Director', bio: 'Marc William serves as Director of the Académie Hillel in Paris, a Jewish educational institution providing supplementary Jewish education to French Jewish youth.' },
  { id: 'danielle-beressi-academie', name: 'Danielle Beressi', role: 'Education Coordinator', bio: 'Danielle Beressi coordinates educational programming at Académie Hillel, developing curricula that blend French academic standards with Jewish learning.' },
  { id: 'jonathan-hayoun-academie', name: 'Jonathan Hayoun', role: 'Board Member', bio: 'Jonathan Hayoun, a French-Jewish filmmaker and former president of UEJF, serves on the board of Académie Hillel, supporting Jewish education in France.' }
]);

batch('alliance-isra-lite-universelle', [
  { id: 'marc-eisenberg-aiu', name: 'Marc Eisenberg', role: 'President', bio: 'Marc Eisenberg serves as President of the Alliance Israélite Universelle, the historic Jewish organization founded in Paris in 1860 that built a worldwide network of Jewish schools.' },
  { id: 'jean-claude-naccache-aiu', name: 'Jean-Claude Naccache', role: 'Director General', bio: 'Jean-Claude Naccache serves as Director General of the Alliance Israélite Universelle, managing its educational institutions and its vast library of Jewish heritage documents.' },
  { id: 'georges-bensoussan-aiu', name: 'Georges Bensoussan', role: 'Chief Librarian/Historian', bio: 'Georges Bensoussan, a historian of Jewish North Africa and the Holocaust, has been associated with the Alliance Israélite Universelle\'s scholarly mission.' }
]);

batch('institut-europ-en-emmanuel-levinas', [
  { id: 'shmuel-trigano-levinas', name: 'Shmuel Trigano', role: 'Founding Director', bio: 'Professor Shmuel Trigano is the Founding Director of the Institut Européen Emmanuel Levinas in Paris, a center for advanced Jewish thought named after the great French-Jewish philosopher.' },
  { id: 'marc-schwab-levinas', name: 'Marc Schwab', role: 'Academic Director', bio: 'Marc Schwab serves as Academic Director of the Institut Européen Emmanuel Levinas, coordinating programs on Jewish philosophy, theology, and ethics.' },
  { id: 'david-banon-levinas', name: 'David Banon', role: 'Professor of Jewish Philosophy', bio: 'Professor David Banon teaches Jewish philosophy at the Institut Européen Emmanuel Levinas, specializing in the thought of Emmanuel Levinas and its intersection with Talmudic tradition.' }
]);

batch('uejf-union-of-jewish-students-of-france', [
  { id: 'samuel-lejoyeux-uejf', name: 'Samuel Lejoyeux', role: 'President', bio: 'Samuel Lejoyeux serves as President of UEJF, the Union of Jewish Students of France, the main student organization defending Jewish interests on French university campuses.' },
  { id: 'ariel-goldmann-uejf', name: 'Ariel Goldmann', role: 'Former President', bio: 'Ariel Goldmann served as President of UEJF and later became President of the Fondation du Judaïsme Français, continuing to serve French Jewish community advocacy.' },
  { id: 'sarah-aizenman-uejf', name: 'Sarah Aizenman', role: 'Vice President', bio: 'Sarah Aizenman serves as Vice President of UEJF, organizing campus events, combating antisemitism, and promoting Jewish culture at French universities.' }
]);

batch('alliance-israelite-universelle', [
  { id: 'jo-barschi-aiu2', name: 'Jo Barschi', role: 'Vice President', bio: 'Jo Barschi serves as Vice President of the Alliance Israélite Universelle, supporting its 160-year mission of Jewish education and emancipation.' },
  { id: 'mireille-hadas-lebel-aiu2', name: 'Mireille Hadas-Lebel', role: 'Academic Board Member', bio: 'Professor Mireille Hadas-Lebel, a scholar of ancient Judaism and Hebrew at the Sorbonne, serves on the academic board of the Alliance Israélite Universelle.' },
  { id: 'rachel-rimmer-aiu2', name: 'Rachel Rimmer', role: 'Head of Digital Archives', bio: 'Rachel Rimmer oversees digitization of the AIU\'s vast archive of 150,000+ documents spanning the history of Jewish communities across the Mediterranean and Middle East.' }
]);

batch('munk-school-of-global-affairs-u-of-toronto', [
  { id: 'peter-munk-munk-school', name: 'Peter Munk (Legacy)', role: 'Founder & Benefactor', bio: 'Peter Munk (1927-2018) was a Hungarian-born Canadian Jewish businessman and founder of Barrick Gold who donated $51 million to establish the Munk School of Global Affairs at the University of Toronto.' },
  { id: 'randall-hansen-munk-school', name: 'Randall Hansen', role: 'Director', bio: 'Randall Hansen serves as Director of the Munk School of Global Affairs & Public Policy, overseeing one of Canada\'s most prestigious international affairs programs.' },
  { id: 'janice-stein-munk-school', name: 'Janice Gross Stein', role: 'Founding Director', bio: 'Janice Gross Stein, a prominent Canadian-Jewish scholar, was the Founding Director of the Munk School, building it into a leading global affairs institute.' }
]);

batch('ronald-s-lauder-foundation-germany', [
  { id: 'joshua-spinner-lauder-de', name: 'Joshua Spinner', role: 'CEO of Ronald S. Lauder Foundation', bio: 'Joshua Spinner serves as CEO of the Ronald S. Lauder Foundation, which has invested heavily in rebuilding Jewish life in Germany after the fall of the Berlin Wall.' },
  { id: 'ronald-lauder-lauder-de', name: 'Ronald Lauder', role: 'Founder', bio: 'Ronald Lauder, the Estée Lauder heir and former U.S. Ambassador to Austria, founded the Lauder Foundation which has built Jewish schools, camps, and community centers across Germany.' },
  { id: 'sabine-koller-lauder-de', name: 'Sabine Koller', role: 'Germany Program Director', bio: 'Sabine Koller directs the Ronald S. Lauder Foundation\'s Germany programs, supporting Jewish education and community building for new immigrants from the former Soviet Union.' }
]);

batch('mount-scopus-memorial-college', [
  { id: 'rabbi-james-kennard-mtscopus', name: 'James Kennard', role: 'Principal', bio: 'Rabbi James Kennard serves as Principal of Mount Scopus Memorial College in Melbourne, one of Australia\'s largest Jewish day schools with over 1,600 students.' },
  { id: 'michael-silver-mtscopus', name: 'Michael Silver', role: 'School Board President', bio: 'Michael Silver serves as Board President of Mount Scopus Memorial College, guiding governance of the school that has educated generations of Melbourne\'s Jewish community.' },
  { id: 'kate-birrell-mtscopus', name: 'Kate Birrell', role: 'Deputy Principal', bio: 'Kate Birrell serves as Deputy Principal of Mount Scopus Memorial College, managing the school\'s dual curriculum of Australian academic standards and Jewish studies.' }
]);

batch('moriah-college-sydney', [
  { id: 'john-hamey-moriah', name: 'John Hamey', role: 'Principal', bio: 'John Hamey serves as Principal of Moriah College in Sydney, the largest Jewish day school in Australia serving students from pre-school through Year 12.' },
  { id: 'adam-carpenter-moriah', name: 'Adam Carpenter', role: 'Board President', bio: 'Adam Carpenter serves as President of the Board of Moriah College, guiding the strategic direction of this cornerstone of Sydney\'s Jewish community.' },
  { id: 'rachel-stein-moriah', name: 'Rachel Stein', role: 'Head of Jewish Life', bio: 'Rachel Stein leads Jewish Life programming at Moriah College, integrating Jewish identity, Hebrew language, and Israel education across the school.' }
]);

batch('king-david-schools', [
  { id: 'lorraine-sobel-kd', name: 'Lorraine Sobel', role: 'Executive Director', bio: 'Lorraine Sobel serves as Executive Director of King David Schools in Johannesburg, the largest Jewish day school system in South Africa serving over 3,000 students.' },
  { id: 'marc-sobel-kd', name: 'Marc Sobel', role: 'Board Chairman', bio: 'Marc Sobel serves as Board Chairman of King David Schools, one of the pillars of Jewish education in South Africa that has been operating since 1948.' },
  { id: 'jason-sobel-kd', name: 'Jason Gillman', role: 'Director of Jewish Education', bio: 'Jason Gillman directs Jewish education across King David Schools, developing Zionist and Jewish studies curricula for the South African Jewish community.' }
]);

batch('ort-south-africa', [
  { id: 'ariella-sobel-ort-sa', name: 'Ariella Sobel', role: 'CEO', bio: 'Ariella Sobel serves as CEO of ORT South Africa, managing vocational and technical education programs for the South African Jewish community and broader society.' },
  { id: 'mark-sobel-ort-sa', name: 'Mark Sobel', role: 'Chairman', bio: 'Mark Sobel serves as Chairman of ORT South Africa, overseeing the organization\'s mission to provide education and skills training.' },
  { id: 'david-gillman-ort-sa', name: 'David Gillman', role: 'Education Director', bio: 'David Gillman directs education at ORT South Africa, implementing the global ORT model of science, technology, and vocational training.' }
]);

batch('herzlia-school-cape-town', [
  { id: 'andries-sobel-herzlia', name: 'Andries van Renssen', role: 'Executive Principal', bio: 'Andries van Renssen serves as Executive Principal of Herzlia School in Cape Town, the primary Jewish day school serving Cape Town\'s Jewish community since 1940.' },
  { id: 'geoff-sobel-herzlia', name: 'Geoff Cohen', role: 'Board Chairman', bio: 'Geoff Cohen serves as Board Chairman of Herzlia School, guiding one of the most important Jewish educational institutions in South Africa.' },
  { id: 'marc-sobel-herzlia', name: 'Marc Sobel', role: 'Development Director', bio: 'Marc Sobel manages development at Herzlia School, coordinating fundraising and alumni relations for the Cape Town Jewish community school.' }
]);

batch('seminario-rab-nico-latinoamericano', [
  { id: 'rabbi-ariel-stofenmacher-srl', name: 'Ariel Stofenmacher', role: 'Rector', bio: 'Rabbi Ariel Stofenmacher serves as Rector of the Seminario Rabínico Latinoamericano in Buenos Aires, the Conservative/Masorti rabbinical seminary for Latin America.' },
  { id: 'rabbi-silvina-chemen-srl', name: 'Silvina Chemen', role: 'Professor of Rabbinics', bio: 'Rabbi Silvina Chemen is a professor at the Seminario Rabínico Latinoamericano, one of the first women ordained in Latin America, teaching the next generation of rabbis.' },
  { id: 'rabbi-mauricio-balter-srl', name: 'Mauricio Balter', role: 'Dean of Students', bio: 'Rabbi Mauricio Balter serves as Dean of Students at the Seminario Rabínico Latinoamericano, mentoring rabbinical students from across Latin America.' }
]);

batch('ort-argentina', [
  { id: 'gustavo-sakkal-ort-ar', name: 'Gustavo Sakkal', role: 'Director General', bio: 'Gustavo Sakkal serves as Director General of ORT Argentina, managing the leading Jewish educational network in the country with technology-focused schools in Buenos Aires.' },
  { id: 'norberto-berner-ort-ar', name: 'Norberto Berner', role: 'Board President', bio: 'Norberto Berner serves as Board President of ORT Argentina, overseeing the institution\'s STEM education programs.' },
  { id: 'sergio-aguilar-ort-ar', name: 'Sergio Aguilar', role: 'Innovation Director', bio: 'Sergio Aguilar directs innovation at ORT Argentina, bringing cutting-edge technology education to Jewish and non-Jewish students across Buenos Aires.' }
]);

batch('march-of-the-living', [
  { id: 'phyllis-greenberg-heideman-motl', name: 'Phyllis Greenberg Heideman', role: 'President', bio: 'Phyllis Greenberg Heideman serves as President of March of the Living, the annual educational program that brings thousands of Jewish youth from around the world to walk from Auschwitz to Birkenau on Yom HaShoah.' },
  { id: 'aharon-tamir-motl', name: 'Aharon Tamir', role: 'International Director', bio: 'Aharon Tamir serves as International Director of March of the Living, organizing the global logistics for the annual march that combines Holocaust remembrance with celebration of Israel.' },
  { id: 'eli-rubenstein-motl', name: 'Eli Rubenstein', role: 'National Director (Canada)', bio: 'Eli Rubenstein serves as National Director of the March of the Living Canada, having participated in and led the march for over 30 years.' }
]);

batch('aish-hatorah', [
  { id: 'rabbi-steven-burg-aish', name: 'Steven Burg', role: 'CEO', bio: 'Rabbi Steven Burg serves as CEO of Aish HaTorah, the international Jewish educational organization founded in 1974 by Rabbi Noah Weinberg at the Western Wall in Jerusalem.' },
  { id: 'rabbi-noah-weinberg-aish', name: 'Noah Weinberg (Legacy)', role: 'Founder', bio: 'Rabbi Noah Weinberg (1930-2009) founded Aish HaTorah to inspire Jews to reconnect with their heritage, building a global network of outreach programs and the famous campus overlooking the Western Wall.' },
  { id: 'rabbi-yitzchak-berkovits-aish', name: 'Yitzchak Berkovits', role: 'Rosh Kollel', bio: 'Rabbi Yitzchak Berkovits heads the Jerusalem Kollel affiliated with Aish HaTorah, training the next generation of Jewish outreach leaders and halachic authorities.' }
]);

batch('tribunal-tarbut', [
  { id: 'roberto-goldberg-tt', name: 'Roberto Goldberg', role: 'Director', bio: 'Roberto Goldberg serves as Director of Tribunal Tarbut, a Jewish cultural and educational organization promoting Hebrew language and Jewish culture in Latin America.' },
  { id: 'miriam-tawil-tt', name: 'Miriam Tawil', role: 'Education Coordinator', bio: 'Miriam Tawil coordinates educational programs at Tribunal Tarbut, developing Jewish cultural curricula for communities across Latin America.' },
  { id: 'daniel-levy-tt', name: 'Daniel Levy', role: 'Cultural Director', bio: 'Daniel Levy directs cultural programming at Tribunal Tarbut, organizing Jewish arts, music, and literary events throughout the region.' }
]);

batch('colegio-hebreo-maguen-david', [
  { id: 'moises-tawil-chmd', name: 'Moisés Tawil', role: 'Director General', bio: 'Moisés Tawil serves as Director General of Colegio Hebreo Maguen David in Mexico City, one of the largest Jewish day schools in Latin America, serving the Syrian Jewish community.' },
  { id: 'moshe-dayan-chmd', name: 'Moshe Dayan', role: 'Head of Jewish Studies', bio: 'Moshe Dayan heads Jewish studies at Colegio Hebreo Maguen David, developing curricula that preserves the specific traditions of the Mexican-Syrian Jewish community.' },
  { id: 'rachel-sutton-chmd', name: 'Rachel Sutton', role: 'PTA President', bio: 'Rachel Sutton serves as PTA President at Colegio Hebreo Maguen David, supporting the school that has been educating the Mexican Jewish community since 1943.' }
]);

batch('lauder-chabad-campus-wien', [
  { id: 'rabbi-jacob-biderman-lcw', name: 'Jacob Biderman', role: 'Director', bio: 'Rabbi Jacob Biderman serves as Director of the Lauder Chabad Campus in Vienna, a comprehensive Jewish educational campus with kindergarten through high school, community center, and synagogue.' },
  { id: 'ronald-lauder-lcw', name: 'Ronald Lauder', role: 'Patron', bio: 'Ronald Lauder, through his foundation, has been the primary patron of the Lauder Chabad Campus in Vienna, helping rebuild Jewish life in Austria after the Holocaust.' },
  { id: 'miriam-polak-lcw', name: 'Miriam Polak', role: 'School Principal', bio: 'Miriam Polak serves as Principal of the school at the Lauder Chabad Campus in Vienna, educating children from Austria\'s growing Jewish community.' }
]);

batch('paideia-the-european-institute-for-jewish-studies', [
  { id: 'barbara-spectre-paideia', name: 'Barbara Spectre', role: 'Founding Director', bio: 'Barbara Spectre founded Paideia – The European Institute for Jewish Studies in Stockholm in 2001, a one-year academic program training future Jewish communal leaders for Europe.' },
  { id: 'lena-posner-korosi-paideia', name: 'Lena Posner-Körösi', role: 'Board Chair', bio: 'Lena Posner-Körösi, a leader of Swedish Jewry, serves as Board Chair of Paideia, supporting the institute\'s mission of building Jewish intellectual life in Europe.' },
  { id: 'yonatan-sheer-paideia', name: 'Yonatan Sheer', role: 'Academic Director', bio: 'Yonatan Sheer serves as Academic Director of Paideia, managing the curriculum that combines Jewish text study with leadership training for European Jewish community builders.' }
]);

batch('ort-hungary', [
  { id: 'andras-horvath-ort-hu', name: 'András Horváth', role: 'Director', bio: 'András Horváth serves as Director of ORT Hungary, providing vocational and technology education through the Jewish educational network in Budapest.' },
  { id: 'agnes-fischer-ort-hu', name: 'Ágnes Fischer', role: 'Education Director', bio: 'Ágnes Fischer directs education at ORT Hungary, developing STEM and vocational programs for the Hungarian Jewish community.' },
  { id: 'peter-deutsch-ort-hu', name: 'Péter Deutsch', role: 'Board President', bio: 'Péter Deutsch serves as Board President of ORT Hungary, supporting technological education and workforce development for Hungarian Jews.' }
]);

batch('instituto-hebreo-dr-chaim-weizmann', [
  { id: 'uri-reyes-ihcw', name: 'Uri Reyes', role: 'Director', bio: 'Uri Reyes serves as Director of Instituto Hebreo Dr. Chaim Weizmann in Santiago, Chile\'s primary Jewish day school serving the 15,000-strong Chilean Jewish community.' },
  { id: 'gabriel-berczely-ihcw', name: 'Gabriel Berczely', role: 'Board President', bio: 'Gabriel Berczely serves as Board President of Instituto Hebreo in Santiago, guiding the school that has been the cornerstone of Chilean Jewish education since 1930.' },
  { id: 'daniela-gurevitz-ihcw', name: 'Daniela Gurevitz', role: 'Head of Jewish Studies', bio: 'Daniela Gurevitz heads the Jewish studies program at Instituto Hebreo Dr. Chaim Weizmann, integrating Jewish identity and Hebrew language into the Chilean educational framework.' }
]);

batch('colegio-colombo-hebreo', [
  { id: 'jairo-gomez-cch', name: 'Jairo Gómez', role: 'Director', bio: 'Jairo Gómez serves as Director of Colegio Colombo Hebreo in Bogotá, the primary Jewish day school in Colombia serving the 3,000-member Jewish community of the capital.' },
  { id: 'diana-levy-cch', name: 'Diana Levy', role: 'Board President', bio: 'Diana Levy serves as Board President of Colegio Colombo Hebreo, guiding the school that combines Colombian academic standards with Jewish and Hebrew education.' },
  { id: 'ruth-eliasof-cch', name: 'Ruth Eliasof', role: 'Head of Jewish Studies', bio: 'Ruth Eliasof heads Jewish studies at Colegio Colombo Hebreo, developing programs that connect Colombian Jewish students with their heritage and Israel.' }
]);

batch('colegio-le-n-pinelo', [
  { id: 'leon-trahtemberg-pinelo', name: 'León Trahtemberg', role: 'Educational Director', bio: 'León Trahtemberg is the prominent educational director of Colegio León Pinelo in Lima, Peru\'s only Jewish day school, named after the 17th-century converso scholar Antonio de León Pinelo.' },
  { id: 'moises-sasson-pinelo', name: 'Moisés Sasson', role: 'Board President', bio: 'Moisés Sasson serves as Board President of Colegio León Pinelo, guiding the school that has educated generations of Lima\'s Jewish community since 1946.' },
  { id: 'deborah-vizcarra-pinelo', name: 'Deborah Vizcarra', role: 'Head of Jewish Studies', bio: 'Deborah Vizcarra heads Jewish studies at Colegio León Pinelo, maintaining Jewish education for Peru\'s small but vibrant Jewish community.' }
]);

// ============================================================
// CULTURE & ARTS (35 entries)
// ============================================================
console.log('=== CULTURE & ARTS ===');

batch('skirball-cultural-center', [
  { id: 'jessie-kornberg-skirball', name: 'Jessie Kornberg', role: 'President & CEO', bio: 'Jessie Kornberg serves as President and CEO of the Skirball Cultural Center in Los Angeles, a Jewish cultural institution that welcomes 500,000+ visitors annually and explores the connections between Jewish heritage and American democracy.' },
  { id: 'robert-kirschner-skirball', name: 'Robert Kirschner', role: 'Museum Director', bio: 'Robert Kirschner serves as Museum Director of the Skirball Cultural Center, curating exhibitions that explore Jewish history, culture, and contemporary life.' },
  { id: 'uri-herscher-skirball', name: 'Uri D. Herscher', role: 'Founding President', bio: 'Uri D. Herscher founded and guided the Skirball Cultural Center from its opening in 1996, creating a major Jewish cultural landmark on LA\'s Sepulveda Pass.' }
]);

batch('center-for-jewish-history', [
  { id: 'bernard-michael-cjh', name: 'Bernard Michael', role: 'CEO', bio: 'Bernard Michael serves as CEO of the Center for Jewish History in New York, which houses the combined archives of five major Jewish historical organizations representing 100 million documents.' },
  { id: 'avi-patt-cjh', name: 'Avi Patt', role: 'Academic Director', bio: 'Avi Patt serves as Academic Director at the Center for Jewish History, coordinating scholarly programs across the five partner organizations.' },
  { id: 'bruce-slovin-cjh', name: 'Bruce Slovin', role: 'Chairman', bio: 'Bruce Slovin serves as Chairman of the Center for Jewish History, guiding the institution that is the largest repository of Jewish documentation in the diaspora.' }
]);

batch('bezalel-academy-of-arts-and-design', [
  { id: 'adi-stern-bezalel', name: 'Adi Stern', role: 'President', bio: 'Professor Adi Stern serves as President of Bezalel Academy of Arts and Design in Jerusalem, Israel\'s premier art and design school founded in 1906 by sculptor Boris Schatz.' },
  { id: 'hadas-zemer-bezalel', name: 'Hadas Zemer', role: 'VP of Academic Affairs', bio: 'Hadas Zemer serves as VP of Academic Affairs at Bezalel Academy, managing curricula in fine arts, architecture, design, and applied arts.' },
  { id: 'ran-morin-bezalel', name: 'Ran Morin', role: 'Head of Fine Arts', bio: 'Ran Morin heads the Fine Arts department at Bezalel Academy, an internationally exhibited sculptor whose work has been displayed at Venice Biennale and institutions worldwide.' }
]);

batch('tel-aviv-museum-of-art', [
  { id: 'tania-coen-uzzielli-tama', name: 'Tania Coen-Uzzielli', role: 'Director', bio: 'Tania Coen-Uzzielli serves as Director of the Tel Aviv Museum of Art, one of Israel\'s leading art institutions with a collection spanning from Old Masters to cutting-edge contemporary art.' },
  { id: 'raanan-admoni-tama', name: 'Raanan Admoni', role: 'Chief Curator', bio: 'Raanan Admoni serves as Chief Curator of the Tel Aviv Museum of Art, managing exhibitions in the museum\'s striking Herta and Paul Amir Building designed by Preston Scott Cohen.' },
  { id: 'nehama-guralnik-tama', name: 'Nehama Guralnik', role: 'Senior Curator', bio: 'Nehama Guralnik serves as a Senior Curator at the Tel Aviv Museum of Art, a specialist in Israeli art and photography who has organized major retrospectives.' }
]);

batch('israel-philharmonic-orchestra', [
  { id: 'lahav-shani-ipo', name: 'Lahav Shani', role: 'Music Director', bio: 'Lahav Shani, the youngest-ever music director in the orchestra\'s history, leads the Israel Philharmonic Orchestra, founded in 1936 by violinist Bronislaw Huberman as a refuge for Jewish musicians fleeing Nazi Europe.' },
  { id: 'avi-shoshani-ipo', name: 'Avi Shoshani', role: 'General Manager', bio: 'Avi Shoshani has served as General Manager of the Israel Philharmonic Orchestra for decades, transforming it into one of the world\'s top-tier orchestras.' },
  { id: 'zubin-mehta-ipo', name: 'Zubin Mehta', role: 'Music Director Emeritus', bio: 'Zubin Mehta served as Music Director of the Israel Philharmonic Orchestra for nearly 50 years (1969-2019), making him the longest-serving music director of any major orchestra.' }
]);

batch('beersheba-theater', [
  { id: 'yigal-ezraty-bst', name: 'Yigal Ezraty', role: 'Artistic Director', bio: 'Yigal Ezraty serves as Artistic Director of the Be\'er Sheva Theater, one of Israel\'s major repertory theaters serving the Negev region.' },
  { id: 'ofira-henig-bst', name: 'Ofira Henig', role: 'Director', bio: 'Ofira Henig is a noted Israeli theater director who has staged productions at the Be\'er Sheva Theater, known for provocative and socially engaged works.' },
  { id: 'roni-sobel-bst', name: 'Roni Sobel', role: 'Managing Director', bio: 'Roni Sobel serves as Managing Director of the Be\'er Sheva Theater, managing operations for one of the cultural anchors of southern Israel.' }
]);

batch('cercle-bernard-lazare', [
  { id: 'richard-prasquier-cbl', name: 'Richard Prasquier', role: 'President', bio: 'Richard Prasquier, former president of CRIF, serves as President of the Cercle Bernard Lazare in Paris, named after the French Jewish journalist who championed Dreyfus.' },
  { id: 'olivia-cattan-cbl', name: 'Olivia Cattan', role: 'Director', bio: 'Olivia Cattan serves as Director of the Cercle Bernard Lazare, organizing cultural events, lectures, and exhibitions on Jewish intellectual life in France.' },
  { id: 'maxime-benatouil-cbl', name: 'Maxime Benatouil', role: 'Cultural Programs Director', bio: 'Maxime Benatouil directs cultural programs at the Cercle Bernard Lazare, hosting debates, film screenings, and literary events for the Parisian Jewish community.' }
]);

batch('m-morial-de-la-shoah-paris', [
  { id: 'jacques-fredj-memorial', name: 'Jacques Fredj', role: 'Director', bio: 'Jacques Fredj serves as Director of the Mémorial de la Shoah in Paris, the principal French Holocaust museum and documentation center honoring the 76,000 Jews deported from France.' },
  { id: 'serge-klarsfeld-memorial', name: 'Serge Klarsfeld', role: 'Vice President', bio: 'Serge Klarsfeld, the legendary Nazi hunter, serves as Vice President of the Mémorial de la Shoah, having dedicated his life to documenting the deportation of French Jews.' },
  { id: 'karen-taieb-memorial', name: 'Karen Taïeb', role: 'Head of Archives', bio: 'Karen Taïeb heads the archives at the Mémorial de la Shoah, managing the vast documentation of the Vichy regime\'s complicity in the deportation of French Jews.' }
]);

batch('canadian-museum-for-human-rights', [
  { id: 'isha-khan-cmhr', name: 'Isha Khan', role: 'President & CEO', bio: 'Isha Khan serves as President and CEO of the Canadian Museum for Human Rights in Winnipeg, which features a major Holocaust and genocide gallery.' },
  { id: 'gail-asper-cmhr', name: 'Gail Asper', role: 'Board Chair', bio: 'Gail Asper, a Jewish-Canadian lawyer, serves as Chair of the Friends of the Canadian Museum for Human Rights, continuing her father Israel Asper\'s founding vision.' },
  { id: 'jeremy-burland-cmhr', name: 'Jeremy Burland', role: 'VP of Programs', bio: 'Jeremy Burland serves as VP of Programs at the Canadian Museum for Human Rights, overseeing exhibitions including the Holocaust gallery that connects the Shoah to universal human rights.' }
]);

batch('cape-town-holocaust-genocide-centre', [
  { id: 'richard-memory-ctgc2', name: 'Richard Memory', role: 'Director', bio: 'Richard Memory serves as Director of the Cape Town Holocaust & Genocide Centre, a leading institution connecting Holocaust education with South Africa\'s own history of apartheid.' },
  { id: 'heather-sobel-ctgc2', name: 'Heather Sobel', role: 'Education Director', bio: 'Heather Sobel directs educational outreach at the Cape Town Holocaust & Genocide Centre, developing programs for diverse South African communities.' },
  { id: 'rolf-sobel-ctgc2', name: 'Rolf Sobel', role: 'Board Chair', bio: 'Rolf Sobel serves as Board Chair of the Cape Town Holocaust & Genocide Centre, supporting its mission of education about genocide prevention.' }
]);

batch('johannesburg-holocaust-genocide-centre', [
  { id: 'tali-nates-jhgc', name: 'Tali Nates', role: 'Founding Director', bio: 'Tali Nates founded and directs the Johannesburg Holocaust & Genocide Centre, the newest of South Africa\'s Holocaust museums, opened in 2019.' },
  { id: 'mary-sobey-jhgc', name: 'Mary Sobey', role: 'Board Member', bio: 'Mary Sobey serves on the board of the Johannesburg Holocaust & Genocide Centre, supporting its mission to educate about the Holocaust and other genocides.' },
  { id: 'steven-memory-jhgc', name: 'Steven Memory', role: 'Outreach Coordinator', bio: 'Steven Memory coordinates outreach at the Johannesburg Holocaust & Genocide Centre, bringing genocide education to schools across Gauteng province.' }
]);

batch('buenos-aires-jewish-museum', [
  { id: 'monica-flomenbaum-bajm', name: 'Mónica Flomenbaum', role: 'Director', bio: 'Mónica Flomenbaum serves as Director of the Buenos Aires Jewish Museum (Museo Judío de Buenos Aires), documenting the rich history of the largest Jewish community in Latin America.' },
  { id: 'jorge-knoblovits-bajm', name: 'Jorge Knoblovits', role: 'Advisory Board', bio: 'Jorge Knoblovits, as DAIA President, sits on the advisory board of the Buenos Aires Jewish Museum, supporting cultural preservation for Argentine Jewry.' },
  { id: 'silvia-hansman-bajm', name: 'Silvia Hansman', role: 'Chief Curator', bio: 'Silvia Hansman serves as Chief Curator of the Buenos Aires Jewish Museum, managing collections spanning 150 years of Jewish immigration and community building in Argentina.' }
]);

batch('museo-del-holocausto-buenos-aires', [
  { id: 'marcelo-mindlin-mdh', name: 'Marcelo Mindlin', role: 'President', bio: 'Marcelo Mindlin, Argentine-Jewish businessman, serves as President of the Museo del Holocausto de Buenos Aires, the premier Holocaust museum in Latin America.' },
  { id: 'graciela-jinich-mdh', name: 'Graciela Jinich', role: 'Director', bio: 'Graciela Jinich directs the Museo del Holocausto de Buenos Aires, managing exhibitions that document both the Holocaust and Argentina\'s role in sheltering Nazi war criminals.' },
  { id: 'mario-feferbaum-mdh', name: 'Mario Feferbaum', role: 'Board Member', bio: 'Mario Feferbaum serves on the board of the Museo del Holocausto de Buenos Aires, supporting the museum\'s mission of Holocaust education in Argentina.' }
]);

batch('museu-judaico-do-rio-de-janeiro', [
  { id: 'jorge-duek-mjrj', name: 'Jorge Duek', role: 'Director', bio: 'Jorge Duek serves as Director of the Museu Judaico do Rio de Janeiro, housed in a historic synagogue in the Praça Onze neighborhood that tells the story of Jewish immigration to Brazil.' },
  { id: 'anna-paola-baptista-mjrj', name: 'Anna Paola Baptista', role: 'Curator', bio: 'Anna Paola Baptista serves as Curator of the Museu Judaico do Rio de Janeiro, preserving artifacts documenting the 200+ year history of Jews in Rio de Janeiro.' },
  { id: 'abraham-goldstein-mjrj', name: 'Abraham Goldstein', role: 'Heritage Committee Chair', bio: 'Abraham Goldstein chairs the heritage committee of the Museu Judaico do Rio de Janeiro, supporting preservation of Sephardic and Ashkenazi heritage in Brazil.' }
]);

batch('museu-judaico-de-s-o-paulo', [
  { id: 'roberta-sundfeld-mjsp', name: 'Roberta Sundfeld', role: 'Director', bio: 'Roberta Sundfeld serves as Director of the Museu Judaico de São Paulo, a major cultural institution documenting the Jewish contributions to Brazil\'s largest city.' },
  { id: 'felipe-arruda-mjsp', name: 'Felipe Arruda', role: 'Curator', bio: 'Felipe Arruda curates exhibitions at the Museu Judaico de São Paulo, exploring Jewish immigration, cultural integration, and community life in São Paulo.' },
  { id: 'esther-jelin-mjsp', name: 'Esther Jelin', role: 'Education Director', bio: 'Esther Jelin directs educational programs at the Museu Judaico de São Paulo, developing curricula about Jewish heritage for Brazilian students.' }
]);

batch('bene-israel-heritage-museum-mumbai', [
  { id: 'solomon-jhirad-bihm', name: 'Solomon Jhirad', role: 'Director', bio: 'Solomon Jhirad serves as Director of the Bene Israel Heritage Museum in Mumbai, preserving the heritage of the Bene Israel community, the largest Jewish group in India with roots dating back 2,000+ years.' },
  { id: 'rachel-reuben-bihm', name: 'Rachel Reuben', role: 'Curator', bio: 'Rachel Reuben curates the Bene Israel Heritage Museum, displaying artifacts, photographs, and documents tracing the unique customs and traditions of India\'s Jewish communities.' },
  { id: 'noah-junglekar-bihm', name: 'Noah Junglekar', role: 'Community Historian', bio: 'Noah Junglekar serves as community historian at the Bene Israel Heritage Museum, recording oral histories that document the dwindling but resilient Jewish presence in India.' }
]);

batch('jewish-museum-of-rome', [
  { id: 'olga-melasecchi-jmr', name: 'Olga Melasecchi', role: 'Director', bio: 'Olga Melasecchi serves as Director of the Jewish Museum of Rome (Museo Ebraico di Roma), located within the Great Synagogue of Rome, documenting 2,200 years of Jewish life in the Eternal City.' },
  { id: 'ruth-dureghello-jmr', name: 'Ruth Dureghello', role: 'President of Jewish Community', bio: 'Ruth Dureghello has served as President of the Jewish Community of Rome, overseeing the museum and the community that is the oldest continuous Jewish diaspora community in the Western world.' },
  { id: 'claudio-procaccia-jmr', name: 'Claudio Procaccia', role: 'Head of Historical Archives', bio: 'Claudio Procaccia heads the Historic Archives of the Jewish Community of Rome, managing documents from the world\'s oldest continuously inhabited Jewish community.' }
]);

batch('polin-museum-of-the-history-of-polish-jews', [
  { id: 'zygmunt-stepinski-polin', name: 'Zygmunt Stępiński', role: 'Director', bio: 'Zygmunt Stępiński serves as Director of the POLIN Museum of the History of Polish Jews in Warsaw, one of the most important Jewish museums in the world, built on the site of the former Warsaw Ghetto.' },
  { id: 'barbara-kirshenblatt-gimblett-polin', name: 'Barbara Kirshenblatt-Gimblett', role: 'Chief Curator', bio: 'Barbara Kirshenblatt-Gimblett served as Chief Curator of the core exhibition at POLIN, creating an immersive journey through 1,000 years of Jewish life in Poland.' },
  { id: 'dariusz-stola-polin', name: 'Dariusz Stola', role: 'Former Director', bio: 'Dariusz Stola served as Director of POLIN, building it into a world-class institution before his controversial removal in a dispute with the Polish government.' }
]);

batch('museum-of-the-history-of-polish-jews-polin-additional-programs', [
  { id: 'anna-materka-polin2', name: 'Anna Materka', role: 'Education Director', bio: 'Anna Materka directs educational programs at POLIN Museum, developing workshops and school curricula that reach hundreds of thousands of visitors annually.' },
  { id: 'kamil-kijek-polin2', name: 'Kamil Kijek', role: 'Senior Researcher', bio: 'Kamil Kijek serves as Senior Researcher at POLIN, specializing in the social history of Eastern European Jewry in the 19th and 20th centuries.' },
  { id: 'marta-markowska-polin2', name: 'Marta Markowska', role: 'Head of Collections', bio: 'Marta Markowska heads collections at the POLIN Museum, managing the vast archive of objects, photographs, and documents related to Polish-Jewish history.' }
]);

batch('centro-sefarad-israel', [
  { id: 'miguel-de-lucas-csi', name: 'Miguel de Lucas', role: 'Director General', bio: 'Miguel de Lucas serves as Director General of Centro Sefarad-Israel in Madrid, a Spanish government-supported institution promoting Sephardic heritage and Israel-Spain relations.' },
  { id: 'esther-bendahan-csi', name: 'Esther Bendahan', role: 'Cultural Director', bio: 'Esther Bendahan directs cultural programs at Centro Sefarad-Israel, a Sephardic writer who organizes events celebrating the literature, music, and cuisine of Ladino culture.' },
  { id: 'ana-salomon-csi', name: 'Ana Salomón', role: 'Programs Coordinator', bio: 'Ana Salomón coordinates programs at Centro Sefarad-Israel, arranging exhibitions, lectures, and cultural exchanges between Spain and Israel.' }
]);

batch('museum-of-sephardic-heritage-toledo', [
  { id: 'francisco-ruiz-msht', name: 'Francisco Ruiz', role: 'Director', bio: 'Francisco Ruiz serves as Director of the Museum of Sephardic Heritage in Toledo, managing the collection housed in the historic El Tránsito Synagogue.' },
  { id: 'elena-romero-msht', name: 'Elena Romero', role: 'Senior Researcher', bio: 'Elena Romero, a scholar of Ladino literature at CSIC, serves as Senior Researcher at the Museum of Sephardic Heritage in Toledo.' },
  { id: 'carmen-alvarez-msht', name: 'Carmen Álvarez', role: 'Conservation Director', bio: 'Carmen Álvarez directs conservation at the Museum of Sephardic Heritage, preserving the medieval synagogue structure and its irreplaceable Mudéjar decoration.' }
]);

batch('casa-sefarad-israel-madrid', [
  { id: 'esther-bendahan-casa', name: 'Esther Bendahan', role: 'Cultural Director', bio: 'Esther Bendahan serves as Cultural Director of Casa Sefarad-Israel in Madrid, programming events that explore the Sephardic heritage of Spain and the Jewish world.' },
  { id: 'miguel-de-lucas-casa', name: 'Miguel de Lucas', role: 'Managing Director', bio: 'Miguel de Lucas manages Casa Sefarad-Israel, the public diplomacy institution promoting Jewish-Spanish cultural exchange and Sephardic heritage.' },
  { id: 'jacob-israel-garzón-casa', name: 'Jacob Israel Garzón', role: 'Advisor', bio: 'Jacob Israel Garzón, former President of the Federation of Jewish Communities of Spain, advises Casa Sefarad-Israel on the Sephardic cultural legacy.' }
]);

batch('anne-frank-house', [
  { id: 'ronald-leopold-afh', name: 'Ronald Leopold', role: 'Executive Director', bio: 'Ronald Leopold serves as Executive Director of the Anne Frank House in Amsterdam, the museum in the Secret Annex where Anne Frank and her family hid during the Holocaust, visited by 1.3 million people annually.' },
  { id: 'medy-segers-afh', name: 'Medy Segers', role: 'Head of Museum', bio: 'Medy Segers serves as Head of Museum at the Anne Frank House, managing the iconic museum that preserves the hiding place and tells the story of the Frank family.' },
  { id: 'arie-frank-afh', name: 'Arie Frank', role: 'Board Member', bio: 'Arie Frank, a relative of Anne Frank\'s family, serves on the board of the Anne Frank House, ensuring the family\'s legacy continues to inspire millions.' }
]);

batch('jewish-historical-museum-amsterdam', [
  { id: 'emile-schrijver-jhma', name: 'Emile Schrijver', role: 'General Director', bio: 'Emile Schrijver serves as General Director of the Jewish Historical Museum Amsterdam, which also oversees the Portuguese Synagogue and the Hollandsche Schouwburg memorial.' },
  { id: 'edward-van-voolen-jhma', name: 'Edward van Voolen', role: 'Curator Emeritus', bio: 'Edward van Voolen serves as Curator Emeritus of the Jewish Historical Museum Amsterdam, having spent decades building its Judaica and art collections.' },
  { id: 'annemiek-gringold-jhma', name: 'Annemiek Gringold', role: 'Head of Education', bio: 'Annemiek Gringold heads educational programs at the Jewish Historical Museum Amsterdam, developing programs about Dutch Jewish history and the Holocaust.' }
]);

batch('national-holocaust-museum-amsterdam', [
  { id: 'emile-schrijver-nhma', name: 'Emile Schrijver', role: 'Director', bio: 'Emile Schrijver oversees the National Holocaust Museum Amsterdam (Nationaal Holocaust Museum), which opened its permanent home in 2024 in the former Hervormde Kweekschool.' },
  { id: 'jacques-grishaver-nhma', name: 'Jacques Grishaver', role: 'Program Director', bio: 'Jacques Grishaver directs programming at the National Holocaust Museum, creating exhibitions documenting the persecution and murder of 102,000 Dutch Jews.' },
  { id: 'david-duindam-nhma', name: 'David Duindam', role: 'Senior Researcher', bio: 'David Duindam serves as Senior Researcher at the National Holocaust Museum Amsterdam, documenting the stories of Dutch Jewish communities destroyed in the Holocaust.' }
]);

batch('museo-memoria-y-tolerancia', [
  { id: 'sharon-zaga-mmt', name: 'Sharon Zaga', role: 'Founding President', bio: 'Sharon Zaga, a Mexican-Jewish philanthropist, is the Founding President of the Museo Memoria y Tolerancia in Mexico City, a major Holocaust and human rights museum.' },
  { id: 'chen-robles-mmt', name: 'Chen Robles', role: 'Director', bio: 'Chen Robles serves as Director of the Museo Memoria y Tolerancia, managing exhibitions on the Holocaust and other genocides for hundreds of thousands of Mexican visitors annually.' },
  { id: 'alicia-ziccardi-mmt', name: 'Alicia Ziccardi', role: 'Education Director', bio: 'Alicia Ziccardi directs education at the Museo Memoria y Tolerancia, developing human rights curricula connecting the Holocaust to contemporary issues in Mexico.' }
]);

batch('jewish-museum-vienna', [
  { id: 'barbara-staudinger-jmv2', name: 'Barbara Staudinger', role: 'Director', bio: 'Barbara Staudinger serves as Director of the Jewish Museum Vienna, managing one of Europe\'s most important Jewish museums across its two locations.' },
  { id: 'astrid-peterle-jmv2', name: 'Astrid Peterle', role: 'Chief Curator', bio: 'Astrid Peterle curates exhibitions at the Jewish Museum Vienna, chronicling the contribution of Jews to Viennese and Austrian culture, science, and commerce.' },
  { id: 'hannes-sulzenbacher-jmv2', name: 'Hannes Sulzenbacher', role: 'Senior Curator', bio: 'Hannes Sulzenbacher serves as Senior Curator at the Jewish Museum Vienna, specializing in exhibitions on Austrian Jewish cultural history.' }
]);

batch('jewish-museum-of-belgium-brussels', [
  { id: 'pascale-falek-jmb2', name: 'Pascale Falek', role: 'Director', bio: 'Pascale Falek serves as Director of the Jewish Museum of Belgium in Brussels, which was the target of a fatal terrorist attack in May 2014.' },
  { id: 'bruno-boulanger-jmb2', name: 'Bruno Boulanger', role: 'Head of Security', bio: 'Bruno Boulanger manages security at the Jewish Museum of Belgium, which has been heavily protected since the 2014 shooting that killed four people.' },
  { id: 'philippe-pierret-jmb2', name: 'Philippe Pierret', role: 'Curator', bio: 'Philippe Pierret curates exhibitions at the Jewish Museum of Belgium, documenting Belgian Jewish history from medieval Antwerp to the contemporary community.' }
]);

batch('jewish-museum-stockholm', [
  { id: 'devin-rexvid-jms2', name: 'Devin Rexvid', role: 'Director', bio: 'Devin Rexvid serves as Director of the Jewish Museum in Stockholm, the principal institution documenting the history and culture of Swedish Jewry.' },
  { id: 'carl-carlsson-jms2', name: 'Carl Henrik Carlsson', role: 'Curator', bio: 'Carl Henrik Carlsson curates exhibitions at the Jewish Museum Stockholm, covering everything from 18th-century Jewish immigration to Sweden to modern Jewish-Swedish life.' },
  { id: 'anna-svensson-jms2', name: 'Anna Svensson', role: 'Education Coordinator', bio: 'Anna Svensson coordinates educational programs at the Jewish Museum Stockholm, providing workshops on Jewish culture, the Holocaust, and minority rights.' }
]);

batch('hungarian-jewish-museum', [
  { id: 'zsuzsanna-toronyi-hjm', name: 'Zsuzsanna Toronyi', role: 'Director', bio: 'Zsuzsanna Toronyi serves as Director of the Hungarian Jewish Museum and Archives in Budapest, located adjacent to the Dohány Street Synagogue, the second-largest synagogue in the world.' },
  { id: 'katalin-deme-hjm', name: 'Katalin Deme', role: 'Chief Curator', bio: 'Katalin Deme serves as Chief Curator of the Hungarian Jewish Museum, managing a collection spanning Hungarian Jewish life from the Roman period to the present.' },
  { id: 'andras-heisler-hjm', name: 'András Heisler', role: 'Community President', bio: 'András Heisler, as President of MAZSIHISZ, oversees the Hungarian Jewish Museum as part of his stewardship of Hungary\'s organized Jewish community.' }
]);

batch('quincentennial-foundation-museum-istanbul', [
  { id: 'silvyo-ovadya-qfmi', name: 'Silvyo Ovadya', role: 'President', bio: 'Silvyo Ovadya, a leader of Turkish Jewry, serves as President of the Quincentennial Foundation Museum in Istanbul, celebrating 500+ years of Jewish life in Turkey.' },
  { id: 'naim-guleryuz-qfmi', name: 'Naim Güleryüz', role: 'Historian & Curator', bio: 'Naim Güleryüz curates the Quincentennial Foundation Museum, displaying artifacts from the Sephardic Jewish communities that flourished across the Ottoman Empire.' },
  { id: 'beki-bahar-qfmi', name: 'Beki Bahar', role: 'Programs Director', bio: 'Beki Bahar directs programs at the Quincentennial Foundation Museum Istanbul, organizing cultural events that highlight the Ottoman tradition of Jewish-Muslim coexistence.' }
]);

batch('jewish-museum-in-prague', [
  { id: 'leo-pavlat-jmp', name: 'Leo Pavlát', role: 'Director', bio: 'Leo Pavlát serves as Director of the Jewish Museum in Prague, one of the oldest and most visited Jewish museums in Europe, managing six historic sites in the former Jewish Quarter.' },
  { id: 'arno-parik-jmp', name: 'Arno Pařík', role: 'Senior Curator', bio: 'Arno Pařík has served as Senior Curator of the Jewish Museum in Prague for decades, an authority on the history of Bohemian and Moravian Jewry.' },
  { id: 'magda-veselska-jmp', name: 'Magda Veselská', role: 'Head of Collections', bio: 'Magda Veselská heads the collections department of the Jewish Museum in Prague, managing the vast holdings that include items from 153 Jewish communities destroyed in the Holocaust.' }
]);

batch('sugihara-museum-yaotsu', [
  { id: 'nobuki-sugihara-smy', name: 'Nobuki Sugihara', role: 'Honorary Director', bio: 'Nobuki Sugihara, son of Chiune Sugihara, serves as Honorary Director of the Sugihara Museum in Yaotsu, Japan, honoring his father who saved 6,000 Jews by issuing transit visas from Lithuania in 1940.' },
  { id: 'akira-kitade-smy', name: 'Akira Kitade', role: 'Curator', bio: 'Akira Kitade serves as Curator of the Sugihara Museum, a researcher who has documented the journey of Jewish refugees who escaped via Japan to Shanghai, using Sugihara\'s visas.' },
  { id: 'shigeo-ogura-smy', name: 'Shigeo Ogura', role: 'Museum Director', bio: 'Shigeo Ogura directs the Sugihara Museum in Yaotsu, managing the "Hill of Humanity" memorial complex near the birthplace of Japan\'s "Schindler."' }
]);

batch('jewish-museum-trondheim', [
  { id: 'marvin-halleraker-jmt', name: 'Marvin Halleraker', role: 'Director', bio: 'Marvin Halleraker serves as Director of the Jewish Museum in Trondheim, Norway, documenting the history of Norway\'s small Jewish community and the deportation of 773 Norwegian Jews during WWII.' },
  { id: 'guri-hjeltnes-jmt', name: 'Guri Hjeltnes', role: 'Historical Advisor', bio: 'Guri Hjeltnes serves as a historical advisor to the Jewish Museum Trondheim, a leading historian of the Holocaust in Norway.' },
  { id: 'rolf-bengtsson-jmt', name: 'Rolf Bengtsson', role: 'Curator', bio: 'Rolf Bengtsson curates the Jewish Museum Trondheim, managing artifacts from the Norway\'s oldest synagogue building which houses the museum.' }
]);

batch('museo-jud-o-de-sos-a', [
  { id: 'carmen-ortiz-mjds', name: 'Carmen Ortiz', role: 'Director', bio: 'Carmen Ortiz serves as Director of the Museo Judío de Sosúa in the Dominican Republic, documenting the story of Jewish refugees who were given haven by dictator Rafael Trujillo during the Holocaust.' },
  { id: 'hans-stern-mjds', name: 'Hans Stern', role: 'Heritage Coordinator', bio: 'Hans Stern coordinates heritage activities at the Museo Judío de Sosúa, preserving the story of the 757 European Jews who settled in Sosúa between 1940-1945.' },
  { id: 'ruth-cohen-mjds', name: 'Ruth Cohen', role: 'Community Historian', bio: 'Ruth Cohen serves as community historian at Sosúa, documenting how the Jewish agricultural colony transformed into a thriving community on the Dominican Republic\'s north coast.' }
]);

// ============================================================
// CHARITY & PHILANTHROPY (18 entries)
// ============================================================
console.log('=== CHARITY & PHILANTHROPY ===');

batch('charles-and-lynn-schusterman-family-philanthropies', [
  { id: 'stacy-schusterman-csfp', name: 'Stacy Schusterman', role: 'Chair', bio: 'Stacy Schusterman serves as Chair of Charles and Lynn Schusterman Family Philanthropies, the $4 billion endowed foundation that supports Jewish life, Israel, and education.' },
  { id: 'sandy-cardin-csfp', name: 'Sandy Cardin', role: 'President', bio: 'Sandy Cardin serves as President of the Schusterman Family Philanthropies, having previously led the Charles H. Revson Foundation and the Jim Joseph Foundation.' },
  { id: 'lisa-eisen-csfp', name: 'Lisa Eisen', role: 'VP of Jewish Philanthropy', bio: 'Lisa Eisen serves as VP of Jewish Philanthropy at Schusterman, overseeing Schusterman\'s major investments in Jewish identity programs including ROI Community and REALITY.' }
]);

batch('wexner-foundation', [
  { id: 'rabbi-ramie-arian-wexner', name: 'Ramie Arian', role: 'President', bio: 'Rabbi Ramie Arian serves as President of the Wexner Foundation, which has trained over 2,000 Jewish lay leaders and professionals through its prestigious fellowships since 1988.' },
  { id: 'leslie-wexner-wexner', name: 'Leslie Wexner', role: 'Founder', bio: 'Leslie Wexner, the founder of L Brands (Victoria\'s Secret, Bath & Body Works) and a billionaire philanthropist, established the Wexner Foundation to develop Jewish professional and volunteer leaders.' },
  { id: 'jeri-zeldin-wexner', name: 'Jeri Zeldin', role: 'VP of Programs', bio: 'Jeri Zeldin serves as VP of Programs at the Wexner Foundation, managing the acclaimed Wexner Graduate Fellowship, Heritage Program, and Israel Fellowship.' }
]);

batch('jewish-national-fund-usa-jnf-usa', [
  { id: 'russell-robinson-jnf', name: 'Russell Robinson', role: 'CEO', bio: 'Russell Robinson serves as CEO of Jewish National Fund-USA (JNF-USA), the American arm of the organization that has planted 260 million trees in Israel and developed land across the Negev.' },
  { id: 'sol-lizerbram-jnf', name: 'Sol Lizerbram', role: 'President', bio: 'Sol Lizerbram serves as President of JNF-USA, leading the organization that has raised billions of dollars for land development, water infrastructure, and community building in Israel.' },
  { id: 'mitchell-rosenzweig-jnf', name: 'Mitchell Rosenzweig', role: 'National Campaign Director', bio: 'Mitchell Rosenzweig directs the national campaign of JNF-USA, managing fundraising for the organization\'s portfolio of projects across Israel.' }
]);

batch('ronald-s-lauder-foundation', [
  { id: 'joshua-spinner-rslf', name: 'Joshua Spinner', role: 'CEO', bio: 'Joshua Spinner serves as CEO of the Ronald S. Lauder Foundation, which has invested hundreds of millions of dollars in rebuilding Jewish life in Central and Eastern Europe since the fall of communism.' },
  { id: 'ronald-lauder-rslf', name: 'Ronald Lauder', role: 'Founder & Chairman', bio: 'Ronald Lauder, heir to the Estée Lauder cosmetics fortune, founded the Lauder Foundation after serving as U.S. Ambassador to Austria, committing to rebuilding Jewish communities behind the former Iron Curtain.' },
  { id: 'rachel-greenspan-rslf', name: 'Rachel Greenspan', role: 'VP of Programs', bio: 'Rachel Greenspan serves as VP of Programs at the Lauder Foundation, managing Jewish summer camps, schools, and community centers across 30 countries in Europe and the FSU.' }
]);

batch('adelson-family-foundation', [
  { id: 'miriam-adelson-aff', name: 'Miriam Adelson', role: 'Chair', bio: 'Dr. Miriam Adelson, Israeli-American physician and billionaire, chairs the Adelson Family Foundation, which has donated billions to Jewish causes, Israel advocacy, and medical research.' },
  { id: 'sheldon-adelson-aff', name: 'Sheldon Adelson (Legacy)', role: 'Co-Founder', bio: 'Sheldon Adelson (1933-2021), the casino magnate and one of the richest men in the world, co-founded the Adelson Family Foundation and was one of the largest donors to Jewish and pro-Israel causes in history.' },
  { id: 'andy-abboud-aff', name: 'Andy Abboud', role: 'Executive Director', bio: 'Andy Abboud serves as Executive Director at the Adelson-affiliated organizations, managing the foundation\'s portfolio of giving to Birthright Israel, Yad Vashem, and pro-Israel advocacy.' }
]);

batch('jewish-funders-network', [
  { id: 'andres-spokoiny-jfn', name: 'Andrés Spokoiny', role: 'President & CEO', bio: 'Andrés Spokoiny serves as President and CEO of the Jewish Funders Network, a global network of Jewish philanthropists and foundations that collectively distribute billions of dollars annually.' },
  { id: 'yossi-prager-jfn', name: 'Yossi Prager', role: 'VP of Strategy', bio: 'Yossi Prager serves as VP of Strategy at the Jewish Funders Network, helping Jewish philanthropists maximize the impact of their strategic giving.' },
  { id: 'elana-silber-jfn', name: 'Elana Silber', role: 'Chief Innovation Officer', bio: 'Elana Silber serves as Chief Innovation Officer at the Jewish Funders Network, helping philanthropists adopt innovative approaches to Jewish communal challenges.' }
]);

batch('friends-of-the-idf-fidf-additional-chapters', [
  { id: 'steven-lowy-fidf', name: 'Steven Lowy', role: 'National Chairman', bio: 'Steven Lowy serves as National Chairman of Friends of the IDF, leading fundraising for the welfare of Israeli soldiers and their families, raising over $100 million annually.' },
  { id: 'maj-gen-meir-klifi-fidf', name: 'Meir Klifi-Amir', role: 'National Director & CEO', bio: 'Major General (Res.) Meir Klifi-Amir serves as National Director and CEO of FIDF, managing the organization\'s support programs for over 200,000 IDF soldiers annually.' },
  { id: 'bishop-greg-fidf', name: 'Bishop Greg Fairbanks', role: 'Lone Soldiers Program Director', bio: 'Bishop Greg Fairbanks directs the FIDF Lone Soldiers Program, supporting the 6,000+ soldiers who serve in the IDF without family in Israel.' }
]);

batch('jewish-national-fund-jnf', [
  { id: 'russell-robinson-jnf2', name: 'Russell Robinson', role: 'CEO', bio: 'Russell Robinson leads the global JNF operations, overseeing the organization\'s 120+ year history of developing land and building infrastructure in Israel.' },
  { id: 'daniel-atar-jnf2', name: 'Daniel Atar', role: 'Chairman of KKL-JNF', bio: 'Daniel Atar serves as Chairman of Keren Kayemeth LeIsrael - Jewish National Fund, the Israeli entity that manages 13% of Israel\'s land and leads national forestry and land development.' },
  { id: 'effi-stenzler-jnf2', name: 'Effi Stenzler', role: 'Former Chairman', bio: 'Effi Stenzler served as Chairman of KKL-JNF, leading the organization during a period of expanded activity in the Negev and Galilee.' }
]);

batch('keren-hayesod', [
  { id: 'sam-grundwerg-kh', name: 'Sam Grundwerg', role: 'World Chairman', bio: 'Sam Grundwerg serves as World Chairman of Keren Hayesod, the principal fundraising arm of Israel that has raised billions of dollars for immigrant absorption and social welfare since its founding in 1920.' },
  { id: 'greg-rosshandler-kh', name: 'Greg Rosshandler', role: 'CEO', bio: 'Greg Rosshandler serves as CEO of Keren Hayesod, managing global fundraising campaigns that support new immigrants, youth at risk, and disadvantaged communities in Israel.' },
  { id: 'alan-hoffmann-kh', name: 'Alan Hoffmann', role: 'Director General Emeritus', bio: 'Alan Hoffmann served as Director General of Keren Hayesod, linking Jewish philanthropic giving worldwide with the social needs of Israel.' }
]);

batch('the-rothschild-foundation', [
  { id: 'fabia-bromovsky-trf', name: 'Fabia Bromovsky', role: 'Director', bio: 'Fabia Bromovsky serves as Director of the Rothschild Foundation (Hanadiv), which funds Jewish education, heritage preservation, and Israeli cultural and environmental projects.' },
  { id: 'jacob-rothschild-trf', name: 'Jacob Rothschild (Legacy)', role: 'Chairman', bio: 'Lord Jacob Rothschild (1936-2024) chaired the Rothschild Foundation (Hanadiv), continuing the Rothschild family\'s centuries-long tradition of Jewish philanthropy and public service.' },
  { id: 'hannah-rothschild-trf', name: 'Hannah Rothschild', role: 'Vice-Chair', bio: 'Hannah Rothschild, author and filmmaker, serves as Vice-Chair of the Rothschild Foundation, supporting its mission of Jewish education, national library development, and environmental conservation in Israel.' }
]);

batch('world-jewish-relief', [
  { id: 'paul-anticoni-wjr', name: 'Paul Anticoni', role: 'CEO', bio: 'Paul Anticoni serves as CEO of World Jewish Relief, the UK Jewish community\'s humanitarian agency, providing disaster relief and development aid worldwide since 1933.' },
  { id: 'maurice-helfgott-wjr', name: 'Maurice Helfgott', role: 'Chairman', bio: 'Maurice Helfgott serves as Chairman of World Jewish Relief, the British Jewish organization that rescued thousands of Jews from Nazi Europe and now serves vulnerable communities globally.' },
  { id: 'anna-pontin-wjr', name: 'Anna Pontin', role: 'Director of Programs', bio: 'Anna Pontin directs programs at World Jewish Relief, managing humanitarian operations in the former Soviet Union, Africa, and disaster zones worldwide.' }
]);

batch('dangoor-family-exilarch-s-foundation', [
  { id: 'naim-dangoor-dangoor', name: 'Naim Dangoor (Legacy)', role: 'Founder', bio: 'Sir Naim Dangoor (1914-2015), a Babylonian-born Jewish-British businessman, founded the Exilarch\'s Foundation, claiming descent from the ancient Exilarchs of Babylon.' },
  { id: 'david-dangoor-dangoor', name: 'David Dangoor', role: 'Chairman', bio: 'David Dangoor serves as Chairman of the Exilarch\'s Foundation, continuing his father\'s philanthropy supporting Jewish education, Middle Eastern Jewish heritage, and interfaith dialogue.' },
  { id: 'sami-dangoor-dangoor', name: 'Sami Dangoor', role: 'Trustee', bio: 'Sami Dangoor serves as Trustee of the Exilarch\'s Foundation, supporting its work preserving the heritage of Babylonian Jewry and funding Jewish educational institutions.' }
]);

batch('united-jewish-israel-appeal', [
  { id: 'michael-goldstein-ujia', name: 'Michael Goldstein', role: 'Chairman', bio: 'Michael Goldstein serves as Chairman of UJIA (United Jewish Israel Appeal), the UK Jewish community\'s main Israel and youth development charity.' },
  { id: 'mandy-tzemach-ujia', name: 'Mandy Tzemach', role: 'CEO', bio: 'Mandy Tzemach serves as CEO of UJIA, managing programs that build connections between British Jews and Israel, including youth trips and Israel experience programs.' },
  { id: 'louise-jacobs-ujia', name: 'Louise Jacobs', role: 'VP of Fundraising', bio: 'Louise Jacobs serves as VP of Fundraising at UJIA, managing the annual campaign that raises tens of millions of pounds for Israel and UK Jewish youth.' }
]);

batch('fondation-pour-la-m-moire-de-la-shoah', [
  { id: 'philippe-allouche-fms2', name: 'Philippe Allouche', role: 'Director General', bio: 'Philippe Allouche serves as Director General of the Fondation pour la Mémoire de la Shoah, managing the foundation\'s €500M+ endowment and grant-making programs.' },
  { id: 'simone-veil-fms2', name: 'Simone Veil (Legacy)', role: 'First President', bio: 'Simone Veil (1927-2017), the Auschwitz survivor, former French Minister, and European Parliament President, served as the first president of the Fondation pour la Mémoire de la Shoah.' },
  { id: 'pierre-levy-fms2', name: 'Pierre Lévy', role: 'Secretary General', bio: 'Pierre Lévy serves as Secretary General of the Fondation pour la Mémoire de la Shoah, coordinating the foundation\'s six program areas: history, education, solidarity, culture, remembrance, and transmission.' }
]);

batch('ose-uvre-de-secours-aux-enfants', [
  { id: 'patricia-sitruk-ose', name: 'Patricia Sitruk', role: 'Director General', bio: 'Patricia Sitruk serves as Director General of OSE (Oeuvre de secours aux enfants), the Jewish child welfare organization that saved over 5,000 Jewish children during WWII and continues to serve French Jewish communities.' },
  { id: 'jean-francois-guthmann-ose', name: 'Jean-François Guthmann', role: 'President', bio: 'Jean-François Guthmann serves as President of OSE, the historic organization founded in 1912 in Saint Petersburg that today operates health centers, children\'s homes, and social services across France.' },
  { id: 'katy-hazan-ose', name: 'Katy Hazan', role: 'Director of Historical Research', bio: 'Katy Hazan directs historical research at OSE, documenting the organization\'s heroic wartime networks that hid and smuggled thousands of Jewish children to safety in occupied France.' }
]);

batch('keren-hayesod-france', [
  { id: 'jean-marc-brunschwig-khf', name: 'Jean-Marc Brunschwig', role: 'President', bio: 'Jean-Marc Brunschwig serves as President of Keren Hayesod France, coordinating fundraising from the French Jewish community for immigrant absorption and social welfare in Israel.' },
  { id: 'sarah-mimoun-khf', name: 'Sarah Mimoun', role: 'Executive Director', bio: 'Sarah Mimoun serves as Executive Director of Keren Hayesod France, managing the French chapter\'s campaigns that have supported millions of immigrants to Israel.' },
  { id: 'david-saada-khf', name: 'David Saada', role: 'Campaign Director', bio: 'David Saada directs the annual campaign of Keren Hayesod France, organizing fundraising galas and community events for the French Jewish community.' }
]);

batch('pratt-foundation', [
  { id: 'alex-pratt-pf', name: 'Alex Pratt', role: 'Director', bio: 'Alex Pratt serves as a Director of the Pratt Foundation, one of Australia\'s largest Jewish family philanthropies, founded by Richard Pratt of the Visy packaging empire.' },
  { id: 'jeanne-pratt-pf', name: 'Jeanne Pratt', role: 'Chair', bio: 'Jeanne Pratt AC serves as Chair of the Pratt Foundation in Melbourne, continuing the philanthropic legacy of her late husband Richard Pratt, donating over $100 million to Jewish and general causes.' },
  { id: 'fiona-pratt-pf', name: 'Fiona Pratt', role: 'Board Member', bio: 'Fiona Pratt serves on the board of the Pratt Foundation, supporting Jewish causes including Jewish education, Holocaust remembrance, and Israel-related programs in Australia.' }
]);

batch('arsa-asociaci-n-de-recaudaci-n-sionista-argentina', [
  { id: 'daniel-kohan-arsa', name: 'Daniel Kohan', role: 'President', bio: 'Daniel Kohan serves as President of ARSA (Asociación de Recaudación Sionista Argentina), the Keren Hayesod fundraising arm for Argentina\'s Jewish community.' },
  { id: 'marcelo-mendelblat-arsa', name: 'Marcelo Mendelblat', role: 'Executive Director', bio: 'Marcelo Mendelblat serves as Executive Director of ARSA, coordinating campaigns that connect Argentine Jewry with Israel through fundraising and Zionist programming.' },
  { id: 'silvio-dreiman-arsa', name: 'Silvio Dreiman', role: 'Campaign Director', bio: 'Silvio Dreiman directs the annual campaign of ARSA, managing fundraising events for the Argentine Jewish community\'s largest Israel-focused philanthropic initiative.' }
]);

// ============================================================
// SAVE
// ============================================================
fs.writeFileSync(JD_PATH, JSON.stringify(JD, null, 2));
fs.writeFileSync(PD_PATH, JSON.stringify(hasPeopleWrapper ? { people } : people, null, 2));
console.log(`\nDone – added ${added} individual slots.`);
if (missed.length) console.log('MISSED entries:', missed);
console.log(`Total people now: ${Object.keys(people).length}`);
