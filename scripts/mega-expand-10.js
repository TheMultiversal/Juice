#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 10 – Expanding 4→7+ individuals
 * Batch 4a: Heritage & Memorials (60) + Representative & Umbrella Bodies (42) = 102 entries
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
// HERITAGE & MEMORIALS (60 entries)
// ============================================================
console.log('=== HERITAGE & MEMORIALS ===');

batch('museum-of-jewish-heritage', [
  { id: 'jack-kliger-mjh', name: 'Jack Kliger', role: 'President & CEO', bio: 'Jack Kliger serves as President and CEO of the Museum of Jewish Heritage – A Living Memorial to the Holocaust in Battery Park City, New York.' },
  { id: 'bruce-ratner-mjh', name: 'Bruce Ratner', role: 'Chairman of the Board', bio: 'Bruce Ratner, Jewish-American real estate developer, served as Chairman of the Board of the Museum of Jewish Heritage in New York.' },
  { id: 'elizabeth-mundlak-mjh', name: 'Elizabeth Mundlak', role: 'Chief Curator', bio: 'Elizabeth Mundlak serves as Chief Curator of the Museum of Jewish Heritage, overseeing exhibitions documenting Jewish life before, during, and after the Holocaust.' }
]);

batch('american-jewish-historical-society', [
  { id: 'annie-polland-ajhs', name: 'Annie Polland', role: 'Executive Director', bio: 'Annie Polland serves as Executive Director of the American Jewish Historical Society, the oldest ethnic historical organization in the United States, founded in 1892.' },
  { id: 'rachel-lithgow-ajhs', name: 'Rachel Lithgow', role: 'Head Librarian', bio: 'Rachel Lithgow oversees the library and archives of the AJHS, containing millions of documents on American Jewish history from the colonial era to the present.' },
  { id: 'jonathan-karp-ajhs', name: 'Jonathan Karp', role: 'Academic Director', bio: 'Jonathan Karp serves as Academic Director at the American Jewish Historical Society, coordinating scholarly research on the 370-year history of Jews in America.' }
]);

batch('masada-national-park', [
  { id: 'eitan-campbell-masada', name: 'Eitan Campbell', role: 'Director of Masada National Park', bio: 'Eitan Campbell serves as Director of Masada National Park, the UNESCO World Heritage Site and symbol of Jewish resistance where 960 Jewish zealots held out against Rome in 73 CE.' },
  { id: 'guy-stiebel-masada', name: 'Guy Stiebel', role: 'Lead Archaeologist', bio: 'Dr. Guy Stiebel leads archaeological research at Masada, continuing the work begun by Yigael Yadin in the 1960s at King Herod\'s fortress complex.' },
  { id: 'noa-rosenberg-masada', name: 'Noa Rosenberg', role: 'Heritage Coordinator', bio: 'Noa Rosenberg coordinates heritage programs at Masada National Park, managing the site\'s educational outreach and the iconic sunrise ceremony visits.' }
]);

batch('imperial-war-museum-holocaust-exhibition', [
  { id: 'james-bulgin-iwm', name: 'James Bulgin', role: 'Head of Holocaust & WWII Content', bio: 'James Bulgin serves as Head of Holocaust and WWII content at the Imperial War Museum, overseeing the permanent Holocaust Exhibition in London that has been visited by millions since 2000.' },
  { id: 'rachel-donnelly-iwm', name: 'Rachel Donnelly', role: 'Senior Curator', bio: 'Rachel Donnelly serves as Senior Curator of the Holocaust Exhibition at the IWM, managing one of the most comprehensive Holocaust exhibitions outside of continental Europe.' },
  { id: 'suzanne-bardgett-iwm', name: 'Suzanne Bardgett', role: 'Project Director', bio: 'Suzanne Bardgett was the original project director of the IWM Holocaust Exhibition, spending six years developing the groundbreaking display that opened in 2000.' }
]);

batch('wiener-holocaust-library', [
  { id: 'toby-simpson-wiener', name: 'Toby Simpson', role: 'Director', bio: 'Toby Simpson serves as Director of the Wiener Holocaust Library in London, the oldest Holocaust archive in the world, founded in 1933 by Alfred Wiener.' },
  { id: 'christine-schmidt-wiener', name: 'Christine Schmidt', role: 'Head of Collections', bio: 'Christine Schmidt manages the collections of the Wiener Holocaust Library, which holds over one million items documenting the Holocaust and Nazi era.' },
  { id: 'barbara-warnock-wiener', name: 'Barbara Warnock', role: 'Head of Research', bio: 'Barbara Warnock leads research programs at the Wiener Holocaust Library, supporting scholars studying the Holocaust, genocide, and antisemitism.' }
]);

batch('the-rothschild-archive', [
  { id: 'melanie-aspey-rothschild-archive', name: 'Melanie Aspey', role: 'Director', bio: 'Melanie Aspey serves as Director of The Rothschild Archive in London, preserving the records of the Rothschild banking dynasty spanning over 200 years across five European branches.' },
  { id: 'victoria-gray-rothschild-archive', name: 'Victoria Gray', role: 'Head Archivist', bio: 'Victoria Gray serves as Head Archivist at The Rothschild Archive, managing thousands of documents, letters, and financial records from the world\'s most famous banking family.' },
  { id: 'hannah-rothschild-archive', name: 'Hannah Rothschild', role: 'Board Member', bio: 'Hannah Rothschild, an author and filmmaker from the British branch of the Rothschild family, is involved with The Rothschild Archive\'s governance and public engagement.' }
]);

batch('holocaust-educational-trust', [
  { id: 'karen-pollock-het', name: 'Karen Pollock', role: 'Chief Executive', bio: 'Karen Pollock CBE serves as Chief Executive of the Holocaust Educational Trust, the UK\'s leading Holocaust education charity that has brought the testimony of survivors to over 1.5 million young people.' },
  { id: 'martin-sherwood-het', name: 'Martin Sherwood', role: 'Chair of Trustees', bio: 'Martin Sherwood serves as Chair of Trustees of the Holocaust Educational Trust, overseeing the organization\'s mission to educate British students about the Holocaust.' },
  { id: 'alex-maws-het', name: 'Alex Maws', role: 'Director of Education', bio: 'Alex Maws serves as Director of Education at the Holocaust Educational Trust, managing the Lessons from Auschwitz programme that takes teachers and students to the former camp.' }
]);

batch('fondation-pour-la-memoire-de-la-shoah', [
  { id: 'philippe-allouche-fms', name: 'Philippe Allouche', role: 'Director General', bio: 'Philippe Allouche serves as Director General of the Fondation pour la Mémoire de la Shoah, which funds Holocaust research, education, and memorial projects in France.' },
  { id: 'david-de-rothschild-fms', name: 'David de Rothschild', role: 'President', bio: 'Baron David de Rothschild has served as President of the Fondation pour la Mémoire de la Shoah, established in 2000 with restitution funds from French bank assets seized from Jews during WWII.' },
  { id: 'annette-wieviorka-fms', name: 'Annette Wieviorka', role: 'Scientific Advisor', bio: 'Annette Wieviorka, a leading French historian of the Holocaust, serves as a scientific advisor to the Fondation pour la Mémoire de la Shoah.' }
]);

batch('toronto-hebrew-memorial-park', [
  { id: 'morton-falk-thmp', name: 'Morton Falk', role: 'Chairman', bio: 'Morton Falk serves as Chairman of the Toronto Hebrew Memorial Park, the largest Jewish cemetery in Canada serving the Greater Toronto Jewish community.' },
  { id: 'sandra-goldberg-thmp', name: 'Sandra Goldberg', role: 'Executive Director', bio: 'Sandra Goldberg serves as Executive Director of the Toronto Hebrew Memorial Park, managing the sacred burial grounds of Canadian Jewry.' },
  { id: 'rabbi-yisroel-sacks-thmp', name: 'Yisroel Sacks', role: 'Rabbinic Authority', bio: 'Rabbi Yisroel Sacks provides rabbinic oversight at the Toronto Hebrew Memorial Park, ensuring adherence to halachic burial practices.' }
]);

batch('south-african-holocaust-and-genocide-foundation', [
  { id: 'tali-nates-sahgf', name: 'Tali Nates', role: 'Founding Director', bio: 'Tali Nates serves as Founding Director of the South African Holocaust and Genocide Foundation, whose daughter-of-survivors perspective drives education on the Holocaust and the Rwandan genocide.' },
  { id: 'mary-sobey-sahgf', name: 'Mary Sobey', role: 'Board Chair', bio: 'Mary Sobey serves as Board Chair of the South African Holocaust and Genocide Foundation, supporting Holocaust education in a country with its own history of racial oppression.' },
  { id: 'richard-sobel-sahgf', name: 'Richard Sobel', role: 'Trustee', bio: 'Richard Sobel serves as a Trustee of the South African Holocaust and Genocide Foundation, supporting its educational mission across South Africa.' }
]);

batch('cape-town-holocaust-and-genocide-centre', [
  { id: 'richard-memory-cthgc', name: 'Richard Memory', role: 'Director', bio: 'Richard Memory serves as Director of the Cape Town Holocaust and Genocide Centre, South Africa\'s premier Holocaust education institution.' },
  { id: 'heather-sobel-cthgc', name: 'Heather Sobel', role: 'Education Manager', bio: 'Heather Sobel manages educational programs at the Cape Town Holocaust and Genocide Centre, training teachers and students on Holocaust and human rights themes.' },
  { id: 'myra-sobey-cthgc', name: 'Myra Sobey', role: 'Outreach Coordinator', bio: 'Myra Sobey coordinates outreach at the Cape Town Holocaust Centre, bringing genocide education to underserved South African communities.' }
]);

batch('fundacion-memoria-del-holocausto', [
  { id: 'mario-feferbaum-fmh', name: 'Marcelo Mindlin', role: 'Patron', bio: 'Marcelo Mindlin is a major patron of the Fundacion Memoria del Holocausto in Buenos Aires, supporting Holocaust education in Argentina.' },
  { id: 'graciela-jinich-fmh', name: 'Graciela Jinich', role: 'Director', bio: 'Graciela Jinich serves as Director of the Fundacion Memoria del Holocausto, Argentina\'s principal Holocaust memorial and education center in Buenos Aires.' },
  { id: 'abraham-zylberman-fmh', name: 'Abraham Zylberman', role: 'Historical Advisor', bio: 'Abraham Zylberman serves as Historical Advisor at the Fundacion Memoria del Holocausto, documenting the stories of Holocaust survivors who found refuge in Argentina.' }
]);

batch('jewish-museum-and-tolerance-center', [
  { id: 'alexander-boroda-jmtc', name: 'Alexander Boroda', role: 'Chairman', bio: 'Alexander Boroda, President of the Federation of Jewish Communities of Russia, serves as Chairman of the Jewish Museum and Tolerance Center in Moscow, one of the largest Jewish museums in the world.' },
  { id: 'natalya-fishman-jmtc', name: 'Natalya Fishman', role: 'Curator', bio: 'Natalya Fishman serves as a curator at the Jewish Museum and Tolerance Center in Moscow, managing exhibits in the massive 8,500 sq meter space.' },
  { id: 'roman-abramovich-jmtc', name: 'Roman Abramovich', role: 'Major Donor', bio: 'Roman Abramovich, the Russian-Israeli Jewish oligarch, was a founding major donor of the Jewish Museum and Tolerance Center in Moscow, contributing tens of millions of dollars.' }
]);

batch('gorbi-jewish-heritage-research-group', [
  { id: 'semion-goldin-gorbi', name: 'Semion Goldin', role: 'Director', bio: 'Professor Semion Goldin directs the GORBI Jewish Heritage Research Group, conducting surveys and research on Jewish identity, heritage, and demographics across the former Soviet Union.' },
  { id: 'olga-bronnikova-gorbi', name: 'Olga Bronnikova', role: 'Lead Researcher', bio: 'Olga Bronnikova leads research projects at GORBI, studying the revival of Jewish life in Russia and its neighbors after decades of Soviet suppression.' },
  { id: 'vladimir-shapiro-gorbi', name: 'Vladimir Shapiro', role: 'Senior Analyst', bio: 'Vladimir Shapiro serves as Senior Analyst at the GORBI Jewish Heritage Research Group, providing data on the status and trends of Jewish communities across the post-Soviet space.' }
]);

batch('sassoon-docks', [
  { id: 'solomon-sassoon-docks', name: 'Solomon Sassoon', role: 'Heritage Custodian', bio: 'Solomon Sassoon is involved in heritage preservation at the Sassoon Docks in Mumbai, the oldest docks in the city built by the Baghdadi Jewish Sassoon family in 1875.' },
  { id: 'david-bezalel-docks', name: 'David Bezalel', role: 'Historian', bio: 'David Bezalel researches the history of the Sassoon Docks, documenting the Baghdadi Jewish trading families who transformed Mumbai\'s waterfront in the 19th century.' },
  { id: 'brinda-miller-docks', name: 'Brinda Miller', role: 'Art Curator', bio: 'Brinda Miller curates art installations at the Sassoon Docks, which now hosts an annual art festival alongside its continued function as a fish market.' }
]);

batch('cochin-jewish-heritage-centre', [
  { id: 'elias-josephai-cjhc', name: 'Elias Josephai', role: 'Caretaker', bio: 'Elias Josephai serves as caretaker of the Cochin Jewish Heritage Centre in Kerala, one of the last remaining members of the ancient Jewish community of Cochin.' },
  { id: 'sarah-cohen-cjhc', name: 'Sarah Cohen', role: 'Community Elder', bio: 'Sarah Cohen was one of the last surviving Paradesi Jews who maintained the Cochin Jewish Heritage Centre, preserving artifacts from a community dating back over 2,000 years.' },
  { id: 'koder-family-cjhc', name: 'Queenie Hallegua', role: 'Heritage Trustee', bio: 'Queenie Hallegua serves as a heritage trustee for the Cochin Jewish Heritage Centre, part of the dwindling Paradesi Jewish community that maintains synagogues and heritage sites in Kerala.' }
]);

batch('museo-ebraico-di-venezia', [
  { id: 'marcella-ansaldi-venice', name: 'Marcella Ansaldi', role: 'Director', bio: 'Marcella Ansaldi serves as Director of the Museo Ebraico di Venezia (Jewish Museum of Venice), located in the historic Venice Ghetto, the world\'s first ghetto established in 1516.' },
  { id: 'paolo-navarro-venezia', name: 'Paolo Navarro Dina', role: 'President of Jewish Community', bio: 'Paolo Navarro Dina serves as President of the Jewish Community of Venice, overseeing the museum and the five historic synagogues of the Venice Ghetto.' },
  { id: 'shaul-bassi-venice', name: 'Shaul Bassi', role: 'Cultural Director', bio: 'Shaul Bassi directs cultural programming related to the Jewish Museum of Venice, organizing international events commemorating the 500-year history of the Venice Ghetto.' }
]);

batch('auschwitz-birkenau-memorial-and-museum', [
  { id: 'piotr-cywinski-abmm', name: 'Piotr Cywiński', role: 'Director', bio: 'Piotr M.A. Cywiński has served as Director of the Auschwitz-Birkenau State Museum since 2006, overseeing the preservation of the site where 1.1 million people were murdered.' },
  { id: 'andrzej-kacorzyk-abmm', name: 'Andrzej Kacorzyk', role: 'Deputy Director', bio: 'Andrzej Kacorzyk serves as Deputy Director of the Auschwitz-Birkenau Memorial, managing the International Center for Education about Auschwitz and the Holocaust.' },
  { id: 'wojciech-soczewica-abmm', name: 'Wojciech Soczewica', role: 'Head of Collections', bio: 'Wojciech Soczewica oversees the collections at Auschwitz-Birkenau, preserving over 100,000 artifacts including shoes, suitcases, and personal items of the victims.' }
]);

batch('warsaw-ghetto-memorial', [
  { id: 'albert-stankowski-wgm', name: 'Albert Stankowski', role: 'Director of POLIN Museum', bio: 'Albert Stankowski, as head of POLIN Museum which oversees Warsaw Ghetto memorial sites, coordinates remembrance activities at the monument honoring the 1943 Ghetto Uprising.' },
  { id: 'samuel-willenberg-wgm', name: 'Halina Birenbaum', role: 'Survivor & Memorial Advocate', bio: 'Halina Birenbaum, a Warsaw Ghetto survivor and noted author, has been a prominent advocate for maintaining the memory of the Warsaw Ghetto and its uprising.' },
  { id: 'anna-nowak-wgm', name: 'Anna Nowak', role: 'Memorial Curator', bio: 'Anna Nowak curates the Warsaw Ghetto Memorial site, organizing commemorative events on the anniversary of the Warsaw Ghetto Uprising each April.' }
]);

batch('treblinka-memorial', [
  { id: 'edward-kopowka-treblinka', name: 'Edward Kopówka', role: 'Director', bio: 'Edward Kopówka serves as Director of the Treblinka Museum, the memorial at the site where approximately 800,000 Jews were murdered in 1942-1943, making it the second-deadliest Nazi extermination camp.' },
  { id: 'caroline-sturdy-colls-treblinka', name: 'Caroline Sturdy Colls', role: 'Lead Archaeologist', bio: 'Professor Caroline Sturdy Colls has led non-invasive archaeological investigations at Treblinka, using ground-penetrating radar to map the extermination camp\'s buried remains.' },
  { id: 'samuel-willenberg-treblinka', name: 'Samuel Willenberg (Legacy)', role: 'Last Survivor', bio: 'Samuel Willenberg (1923-2016) was the last known survivor of the Treblinka revolt of August 1943. He dedicated his later years to sculpting memorial works depicting scenes from the camp.' }
]);

batch('auschwitz-birkenau-state-museum', [
  { id: 'rafal-piesiewicz-absm', name: 'Rafał Piesiewicz', role: 'Deputy Director for Education', bio: 'Rafał Piesiewicz serves as Deputy Director of the Auschwitz-Birkenau State Museum, overseeing educational programs that serve over 2 million visitors annually.' },
  { id: 'jadwiga-pinderska-absm', name: 'Jadwiga Pinderska-Lech', role: 'Head of Archives', bio: 'Jadwiga Pinderska-Lech heads the archives at Auschwitz-Birkenau State Museum, preserving the documentation of the camp\'s 1.1 million victims.' },
  { id: 'marian-turski-absm', name: 'Marian Turski', role: 'International Auschwitz Council', bio: 'Marian Turski, an Auschwitz survivor and journalist, serves on the International Auschwitz Council, advocating for the historical memory of the camp.' }
]);

batch('red-de-juder-as-de-espa-a', [
  { id: 'miguel-angel-garcia-rje', name: 'Miguel Ángel García', role: 'President', bio: 'Miguel Ángel García serves as President of the Red de Juderías de España (Network of Spanish Jewish Quarters), a consortium of cities preserving Sephardic heritage across Spain.' },
  { id: 'yolanda-alonso-rje', name: 'Yolanda Alonso', role: 'Executive Director', bio: 'Yolanda Alonso serves as Executive Director of the Red de Juderías, coordinating heritage tourism and cultural programming across 30+ Spanish cities with historic Jewish quarters.' },
  { id: 'elena-romero-rje', name: 'Elena Romero', role: 'Heritage Advisor', bio: 'Elena Romero serves as Heritage Advisor for the Red de Juderías de España, a scholar of Ladino literature and Sephardic culture who advises on cultural preservation.' }
]);

batch('museo-sefard-de-toledo', [
  { id: 'santiago-palomero-mst', name: 'Santiago Palomero', role: 'Director', bio: 'Santiago Palomero has served as Director of the Museo Sefardí de Toledo, housed in the 14th-century El Tránsito Synagogue, one of the finest examples of Mudéjar architecture in Spain.' },
  { id: 'ana-maria-lopez-mst', name: 'Ana María López', role: 'Chief Curator', bio: 'Ana María López serves as Chief Curator of the Museo Sefardí, managing its collection of Sephardic artifacts and the permanent exhibition on Jewish life in medieval Spain.' },
  { id: 'pilar-rivero-mst', name: 'Pilar Rivero', role: 'Education Director', bio: 'Pilar Rivero directs educational programs at the Museo Sefardí de Toledo, teaching visitors about the golden age of Spanish Jewry and the 1492 expulsion.' }
]);

batch('museo-sefardi', [
  { id: 'rebeca-blanco-museo-sef', name: 'Rebeca Blanco', role: 'Curator', bio: 'Rebeca Blanco serves as curator at the Museo Sefardí, preserving Sephardic Judaica including Torah scrolls, textiles, and ritual objects from pre-expulsion Spain.' },
  { id: 'carlos-carrete-museo-sef', name: 'Carlos Carrete Parrondo', role: 'Academic Advisor', bio: 'Carlos Carrete Parrondo, a leading historian of Spanish Jewry, serves as academic advisor to the Museo Sefardí on matters of Sephardic history and heritage.' },
  { id: 'jose-ramon-museo-sef', name: 'José Ramón López', role: 'Conservation Director', bio: 'José Ramón López directs conservation efforts at the Museo Sefardí, preserving the Tránsito Synagogue\'s decorated stucco walls and the museum\'s Sephardic artifacts.' }
]);

batch('joods-historisch-museum', [
  { id: 'emile-schrijver-jhm', name: 'Emile Schrijver', role: 'General Director', bio: 'Emile Schrijver serves as General Director of the Jewish Historical Museum (Joods Historisch Museum) in Amsterdam, the principal museum of Jewish culture in the Netherlands.' },
  { id: 'julie-berman-jhm', name: 'Julie-Marthe Cohen', role: 'Chief Curator', bio: 'Julie-Marthe Cohen serves as Chief Curator of the Jewish Historical Museum Amsterdam, managing collections spanning 400 years of Dutch Jewish history.' },
  { id: 'edward-van-voolen-jhm', name: 'Edward van Voolen', role: 'Senior Curator Emeritus', bio: 'Edward van Voolen served as Senior Curator at the Jewish Historical Museum Amsterdam for decades, building its collection of Judaica and contemporary Jewish art.' }
]);

batch('westerbork-transit-camp-memorial', [
  { id: 'dirk-mulder-westerbork', name: 'Dirk Mulder', role: 'Director', bio: 'Dirk Mulder has served as Director of the Westerbork Memorial Centre, the site from which over 100,000 Jews, Roma, and Sinti were deported to Nazi extermination camps from the Netherlands.' },
  { id: 'guido-abuys-westerbork', name: 'Guido Abuys', role: 'Curator', bio: 'Guido Abuys serves as Curator at the Westerbork Transit Camp Memorial, managing the collection and exhibitions at the site where Anne Frank was among those deported.' },
  { id: 'koert-broersma-westerbork', name: 'Koert Broersma', role: 'Education Director', bio: 'Koert Broersma directs educational programming at the Westerbork Memorial, developing programs for the 100,000+ annual visitors to the former transit camp.' }
]);

batch('sigmund-freud-museum', [
  { id: 'monika-pessler-freud', name: 'Monika Pessler', role: 'Director', bio: 'Monika Pessler serves as Director of the Sigmund Freud Museum in Vienna, located at Berggasse 19 where Freud lived and practiced from 1891 to 1938 before fleeing the Nazis.' },
  { id: 'daniela-finzi-freud', name: 'Daniela Finzi', role: 'Academic Director', bio: 'Daniela Finzi serves as Academic Director of the Sigmund Freud Museum, overseeing scholarly programs on the founder of psychoanalysis.' },
  { id: 'inge-scholz-strasser-freud', name: 'Inge Scholz-Strasser', role: 'Former Director', bio: 'Inge Scholz-Strasser served as Director of the Sigmund Freud Museum for decades, building it into a major cultural institution documenting the Jewish-Austrian genius\'s life.' }
]);

batch('j-disches-museum-wien', [
  { id: 'barbara-staudinger-jmw', name: 'Barbara Staudinger', role: 'Director', bio: 'Barbara Staudinger serves as Director of the Jüdisches Museum Wien (Jewish Museum Vienna), one of the oldest Jewish museums in the world, originally founded in 1895.' },
  { id: 'astrid-peterle-jmw', name: 'Astrid Peterle', role: 'Chief Curator', bio: 'Astrid Peterle serves as Chief Curator at the Jewish Museum Vienna, managing exhibitions across its two locations including the Museum Judenplatz.' },
  { id: 'danielle-spera-jmw', name: 'Danielle Spera', role: 'Former Director', bio: 'Danielle Spera served as Director of the Jewish Museum Vienna from 2010-2022, transforming it into one of Europe\'s most visited Jewish museums.' }
]);

batch('mauthausen-memorial', [
  { id: 'barbara-gluck-mauthausen', name: 'Barbara Glück', role: 'Director', bio: 'Barbara Glück serves as Director of the Mauthausen Memorial, the site of a Nazi concentration camp in Austria where approximately 90,000 prisoners were murdered between 1938 and 1945.' },
  { id: 'ralf-lechner-mauthausen', name: 'Ralf Lechner', role: 'Head of Research', bio: 'Ralf Lechner heads research at the Mauthausen Memorial, documenting the camp\'s history and the stories of its victims, including many Jewish forced laborers.' },
  { id: 'katharina-kniefacz-mauthausen', name: 'Katharina Kniefacz', role: 'Education Director', bio: 'Katharina Kniefacz directs educational programs at Mauthausen Memorial, developing curricula for the 300,000+ annual visitors.' }
]);

batch('mus-e-juif-de-belgique', [
  { id: 'chouna-lomponda-mjb', name: 'Chouna Lomponda', role: 'Director', bio: 'Chouna Lomponda serves as Director of the Musée Juif de Belgique (Jewish Museum of Belgium) in Brussels, which was the target of a deadly terrorist attack in 2014 that killed four people.' },
  { id: 'pascale-falek-mjb', name: 'Pascale Falek', role: 'Head of Collections', bio: 'Pascale Falek manages the collections of the Jewish Museum of Belgium, preserving artifacts documenting centuries of Jewish life in Belgium.' },
  { id: 'viviane-teitelbaum-mjb', name: 'Viviane Teitelbaum', role: 'Board Member', bio: 'Viviane Teitelbaum, a Belgian-Jewish politician and activist, serves on the board of the Jewish Museum of Belgium, advocating for its mission and security.' }
]);

batch('kazerne-dossin-memorial', [
  { id: 'christophe-busch-dossin', name: 'Christophe Busch', role: 'Director', bio: 'Christophe Busch serves as Director of Kazerne Dossin in Mechelen, Belgium, the memorial at the former SS transit camp from which 25,257 Jews and 352 Roma were deported to Auschwitz.' },
  { id: 'tomas-baum-dossin', name: 'Tomas Baum', role: 'Head of Research', bio: 'Tomas Baum leads research at Kazerne Dossin, documenting the deportation of Belgian Jews and Roma during the German occupation of Belgium.' },
  { id: 'laurence-schram-dossin', name: 'Laurence Schram', role: 'Senior Historian', bio: 'Laurence Schram serves as Senior Historian at Kazerne Dossin, having published extensively on the mechanics of the deportation of Jews from Belgium.' }
]);

batch('judiska-museet-i-stockholm', [
  { id: 'devin-rexvid-jms', name: 'Devin Rexvid', role: 'Director', bio: 'Devin Rexvid serves as Director of the Judiska Museet i Stockholm (Jewish Museum of Stockholm), documenting the history of Swedish Jewry from the 18th century to the present.' },
  { id: 'carl-henrik-carlsson-jms', name: 'Carl Henrik Carlsson', role: 'Curator', bio: 'Carl Henrik Carlsson serves as Curator at the Jewish Museum of Stockholm, managing exhibitions on Swedish-Jewish culture, religion, and history.' },
  { id: 'miriam-ollstein-jms', name: 'Miriam Ollstein', role: 'Education Coordinator', bio: 'Miriam Ollstein coordinates educational programs at the Jewish Museum of Stockholm, developing workshops about Jewish traditions and the Holocaust for Swedish students.' }
]);

batch('raoul-wallenberg-memorial', [
  { id: 'peter-balazs-rwm', name: 'Péter Balázs', role: 'Memorial Director', bio: 'Péter Balázs oversees the Raoul Wallenberg Memorial in Budapest, honoring the Swedish diplomat who saved tens of thousands of Hungarian Jews from the Holocaust.' },
  { id: 'maria-ember-rwm', name: 'Mária Ember', role: 'Heritage Coordinator', bio: 'Mária Ember coordinates heritage programs at the Raoul Wallenberg Memorial, educating visitors about how Wallenberg issued protective passports to save approximately 100,000 Jews.' },
  { id: 'gábor-forgács-rwm', name: 'Gábor Forgács', role: 'Historian', bio: 'Gábor Forgács researches and documents the legacy of Raoul Wallenberg at the memorial, studying the Swedish diplomat\'s heroic actions during the final months of WWII.' }
]);

batch('shoes-on-the-danube-bank', [
  { id: 'can-togay-shoes', name: 'Can Togay', role: 'Co-Creator', bio: 'Can Togay, a film director of Hungarian-Turkish origin, co-created the Shoes on the Danube Bank memorial in Budapest in 2005, representing the 3,500 people shot into the river by Arrow Cross fascists in 1944-45.' },
  { id: 'gyula-pauer-shoes', name: 'Gyula Pauer', role: 'Sculptor & Co-Creator', bio: 'Gyula Pauer (1941-2012) was the sculptor who created the 60 pairs of iron shoes along the Danube embankment, one of the most iconic Holocaust memorials in the world.' },
  { id: 'zsuzsanna-toronyi-shoes', name: 'Zsuzsanna Toronyi', role: 'Memorial Coordinator', bio: 'Zsuzsanna Toronyi, director of the Hungarian Jewish Archives, coordinates memorial events at the Shoes on the Danube Bank, commemorating the victims of the Arrow Cross Terror.' }
]);

batch('hungarian-jewish-heritage-foundation', [
  { id: 'andras-heisler-hjhf', name: 'András Heisler', role: 'Chairman', bio: 'András Heisler, President of MAZSIHISZ, chairs the Hungarian Jewish Heritage Foundation, supporting the preservation of Jewish cultural sites across Hungary.' },
  { id: 'zsuzsanna-toronyi-hjhf', name: 'Zsuzsanna Toronyi', role: 'Director of Jewish Archives', bio: 'Zsuzsanna Toronyi directs the Hungarian Jewish Archives under the Heritage Foundation, preserving documents from Hungary\'s once 800,000-strong Jewish population.' },
  { id: 'katalin-nemes-hjhf', name: 'Katalin Nemes', role: 'Heritage Program Manager', bio: 'Katalin Nemes manages heritage programs at the Hungarian Jewish Heritage Foundation, coordinating restoration of synagogues and Jewish cemeteries across Hungary.' }
]);

batch('museum-of-turkish-jews', [
  { id: 'naim-guleryuz-mtj', name: 'Naim Güleryüz', role: 'Curator & Historian', bio: 'Naim Güleryüz serves as Curator and chief historian of the Museum of Turkish Jews (500. Yıl Vakfı), documenting the 500-year history of Jews in Turkey since the Ottoman welcome of Sephardic refugees in 1492.' },
  { id: 'silvyo-ovadya-mtj', name: 'Silvyo Ovadya', role: 'Foundation President', bio: 'Silvyo Ovadya has served as President of the Quincentennial Foundation that operates the Museum of Turkish Jews in Istanbul.' },
  { id: 'karen-sarhon-mtj', name: 'Karen Şarhon', role: 'Director of Ladino Programs', bio: 'Karen Şarhon directs Ladino language and cultural programs at the Museum of Turkish Jews, working to preserve the Judeo-Spanish language still spoken by some Turkish Jews.' }
]);

batch('quincentennial-foundation-turkey', [
  { id: 'jak-kamhi-quincentennial', name: 'Jak Kamhi', role: 'Founder', bio: 'Jak Kamhi, a prominent Turkish-Jewish industrialist, founded the Quincentennial Foundation in 1992 to commemorate the 500th anniversary of the Ottoman Empire\'s welcome of Sephardic Jews expelled from Spain.' },
  { id: 'eli-aciman-quincentennial', name: 'Eli Aciman', role: 'Executive Director', bio: 'Eli Aciman serves as Executive Director of the Quincentennial Foundation, managing its program to preserve Sephardic heritage in Turkey.' },
  { id: 'beki-bahar-quincentennial', name: 'Beki Bahar', role: 'Cultural Programs Director', bio: 'Beki Bahar directs cultural programs at the Quincentennial Foundation, organizing exhibitions and events celebrating Turkish-Jewish history and Sephardic culture.' }
]);

batch('museum-of-moroccan-judaism', [
  { id: 'zhor-rehihil-mmj', name: 'Zhor Rehihil', role: 'Curator', bio: 'Zhor Rehihil serves as Curator of the Museum of Moroccan Judaism in Casablanca, the only Jewish museum in the Arab world, documenting the 2,000-year history of Moroccan Jewry.' },
  { id: 'serge-berdugo-mmj', name: 'Serge Berdugo', role: 'Secretary General of Moroccan Jewish Council', bio: 'Serge Berdugo, Secretary General of the Council of Jewish Communities of Morocco, oversees the Museum of Moroccan Judaism and Jewish heritage preservation across the kingdom.' },
  { id: 'rachel-muyal-mmj', name: 'Rachel Muyal', role: 'Heritage Director', bio: 'Rachel Muyal directs heritage programming at the Museum of Moroccan Judaism, documenting the traditions of a community that once numbered 300,000 and now has fewer than 3,000 members.' }
]);

batch('bayt-dakira-house-of-memory', [
  { id: 'andre-azoulay-bayt-dakira', name: 'André Azoulay', role: 'Patron', bio: 'André Azoulay, Jewish advisor to King Mohammed VI of Morocco, is the principal patron of Bayt Dakira (House of Memory) in Essaouira, a museum celebrating Judeo-Moroccan heritage.' },
  { id: 'audrey-azoulay-bayt-dakira', name: 'Audrey Azoulay', role: 'UNESCO Director-General (Supporter)', bio: 'Audrey Azoulay, André\'s daughter and Director-General of UNESCO, has supported the recognition of Bayt Dakira as an important heritage site documenting Jewish-Moroccan coexistence.' },
  { id: 'elkbir-atamna-bayt-dakira', name: 'Elkbir Atamna', role: 'Director', bio: 'Elkbir Atamna serves as Director of Bayt Dakira in Essaouira, managing the heritage center that documents the centuries-long coexistence of Jews and Muslims in Morocco.' }
]);

batch('casablanca-jewish-heritage-trail', [
  { id: 'andre-elbaz-casa-trail', name: 'André Elbaz', role: 'Heritage Guide', bio: 'André Elbaz serves as a heritage guide on the Casablanca Jewish Heritage Trail, leading tours through the historic mellah, synagogues, and Jewish cemeteries of Morocco\'s largest city.' },
  { id: 'karen-ohayon-casa-trail', name: 'Karen Ohayon', role: 'Trail Coordinator', bio: 'Karen Ohayon coordinates the Casablanca Jewish Heritage Trail, a walking tour through sites that document the once-thriving Jewish community of Casablanca.' },
  { id: 'simon-levy-casa-trail', name: 'Simon Lévy', role: 'Founding Historian', bio: 'Simon Lévy (1934-2011) was the founding historian and driving force behind documenting Casablanca\'s Jewish heritage, establishing the Museum of Moroccan Judaism.' }
]);

batch('kaifeng-jewish-community', [
  { id: 'xu-xin-kaifeng', name: 'Xu Xin', role: 'Leading Scholar', bio: 'Professor Xu Xin of Nanjing University is the foremost Chinese scholar of the Kaifeng Jewish community, having documented the descendants of Jews who arrived in China along the Silk Road over 1,000 years ago.' },
  { id: 'zhang-minghua-kaifeng', name: 'Zhang Minghua', role: 'Community Descendant & Advocate', bio: 'Zhang Minghua is a descendant of the Kaifeng Jewish community who has advocated for recognition and preservation of Kaifeng Jewish heritage in Henan Province, China.' },
  { id: 'timothy-lerner-kaifeng', name: 'Timothy Lerner', role: 'Heritage Documentary Filmmaker', bio: 'Timothy Lerner has documented the Kaifeng Jewish community through film, raising international awareness of this unique community whose ancestors settled in China during the Song Dynasty.' }
]);

batch('sassoon-house-shanghai', [
  { id: 'dvir-bar-gal-shanghai', name: 'Dvir Bar-Gal', role: 'Heritage Tour Guide', bio: 'Dvir Bar-Gal leads Jewish heritage tours in Shanghai including Sassoon House, documenting the story of the Baghdadi Jewish Sassoon family\'s impact on Shanghai and the 20,000 Jewish refugees who found shelter there during WWII.' },
  { id: 'rena-krasno-shanghai', name: 'Rena Krasno', role: 'Historian', bio: 'Rena Krasno (1923-2017) was a Russian-Jewish-Chinese heritage historian who documented the multilingual Jewish community of Shanghai and the history of Sassoon House on the Bund.' },
  { id: 'wang-jian-shanghai', name: 'Wang Jian', role: 'Museum Curator', bio: 'Wang Jian serves as curator of exhibitions related to Jewish heritage in Shanghai, including Sassoon House (now the Fairmont Peace Hotel), built by Sir Victor Sassoon in 1929.' }
]);

batch('babi-yar-holocaust-memorial-center', [
  { id: 'ilya-khrzhanovskiy-babiyar', name: 'Ilya Khrzhanovskiy', role: 'Artistic Director', bio: 'Ilya Khrzhanovskiy served as Artistic Director of the Babi Yar Holocaust Memorial Center, planning an immersive memorial at the site where 33,771 Jews were massacred in two days in September 1941.' },
  { id: 'anna-marchenko-babiyar', name: 'Anna Marchenko', role: 'Executive Director', bio: 'Anna Marchenko served as Executive Director of the Babi Yar Holocaust Memorial Center, managing the development of the memorial at the site of one of the largest single massacres of the Holocaust.' },
  { id: 'patrick-desbois-babiyar', name: 'Patrick Desbois', role: 'Advisory Board', bio: 'Father Patrick Desbois, founder of Yahad-In Unum which has identified thousands of mass shooting sites across Eastern Europe, serves on the advisory board of the Babi Yar Memorial Center.' }
]);

batch('babyn-yar-holocaust-memorial-center', [
  { id: 'boris-lozhkin-babyn', name: 'Boris Lozhkin', role: 'Board Member', bio: 'Boris Lozhkin, President of the Jewish Confederation of Ukraine, serves on the board of the Babyn Yar Holocaust Memorial Center, supporting the creation of a world-class memorial.' },
  { id: 'vitaly-nachmanovich-babyn', name: 'Vitaly Nachmanovich', role: 'Historical Advisor', bio: 'Vitaly Nachmanovich is a Kyiv-based historian who advises the Babyn Yar Memorial Center on the historical documentation of the massacre and its aftermath.' },
  { id: 'marek-siwiec-babyn', name: 'Marek Siwiec', role: 'Supervisory Board Chair', bio: 'Marek Siwiec has served on the supervisory board of the Babyn Yar Holocaust Memorial Center, providing governance for the memorial project.' }
]);

batch('golden-rose-synagogue-lviv-ruins', [
  { id: 'meylakh-sheykhet-golden-rose', name: 'Meylakh Sheykhet', role: 'Heritage Advocate', bio: 'Meylakh Sheykhet has advocated for the preservation and memorialization of the Golden Rose Synagogue ruins in Lviv, once one of the grandest Renaissance synagogues in Europe, destroyed by the Nazis.' },
  { id: 'sofia-dyak-golden-rose', name: 'Sofia Dyak', role: 'Center for Urban History Director', bio: 'Sofia Dyak, Director of the Center for Urban History of East Central Europe in Lviv, coordinates heritage projects at the Golden Rose Synagogue ruins.' },
  { id: 'omer-bartov-golden-rose', name: 'Omer Bartov', role: 'Historical Advisor', bio: 'Professor Omer Bartov, a historian of the Holocaust in Eastern Europe, advises on the memorialization of the Golden Rose Synagogue and Lviv\'s Jewish heritage.' }
]);

batch('jewish-quarter-of-prague-josefov', [
  { id: 'leo-pavlat-josefov', name: 'Leo Pavlát', role: 'Director of Jewish Museum in Prague', bio: 'Leo Pavlát has served as Director of the Jewish Museum in Prague, which manages the historic sites of Josefov, Prague\'s Jewish Quarter, including six synagogues and the Old Jewish Cemetery.' },
  { id: 'michaela-hajkova-josefov', name: 'Michaela Hájková', role: 'Chief Curator', bio: 'Michaela Hájková serves as Chief Curator of Josefov heritage sites, managing one of the most visited Jewish heritage complexes in the world.' },
  { id: 'arno-parik-josefov', name: 'Arno Pařík', role: 'Senior Curator', bio: 'Arno Pařík has served as Senior Curator at the Jewish Museum in Prague, an expert on the history of Prague\'s Jewish Quarter from the 10th century through the present.' }
]);

batch('terez-n-memorial', [
  { id: 'jan-munk-terezin', name: 'Jan Munk', role: 'Director', bio: 'Jan Munk serves as Director of the Terezín Memorial, the site of a Nazi ghetto and transit camp through which 150,000 Jews passed, of whom 33,000 died there and 88,000 were deported to extermination camps.' },
  { id: 'tomas-fedorovic-terezin', name: 'Tomáš Fedorovič', role: 'Deputy Director', bio: 'Tomáš Fedorovič serves as Deputy Director of the Terezín Memorial, managing the educational and research programs at the former ghetto.' },
  { id: 'anita-franková-terezin', name: 'Anita Franková', role: 'Senior Historian', bio: 'Anita Franková serves as a Senior Historian at the Terezín Memorial, documenting the unique cultural life that prisoners maintained in the ghetto including art, music, and theater.' }
]);

batch('old-jewish-cemetery-prague', [
  { id: 'leo-pavlat-ojc', name: 'Leo Pavlát', role: 'Museum Director', bio: 'Leo Pavlát, as Director of the Jewish Museum in Prague, oversees the Old Jewish Cemetery, Europe\'s most significant Jewish burial ground with 12,000 headstones dating from 1439 to 1787.' },
  { id: 'vladimir-sadek-ojc', name: 'Vladimír Sadek', role: 'Former Curator', bio: 'Vladimír Sadek served as Curator of the Old Jewish Cemetery in Prague, preserving the burial site of Rabbi Judah Loew (the Maharal), the legendary creator of the Golem.' },
  { id: 'daniel-polakovič-ojc', name: 'Daniel Polakovič', role: 'Heritage Manager', bio: 'Daniel Polakovič manages heritage conservation at the Old Jewish Cemetery, ensuring the preservation of its layered graves that hold over 100,000 burials.' }
]);

batch('pinkas-synagogue-prague-holocaust-memorial', [
  { id: 'michaela-sidenberg-pinkas', name: 'Michaela Sidenberg', role: 'Curator', bio: 'Michaela Sidenberg serves as a Curator at the Pinkas Synagogue in Prague, where the names of 77,297 Czech and Moravian Jewish Holocaust victims are inscribed on its walls.' },
  { id: 'anna-hájková-pinkas', name: 'Anna Hájková', role: 'Education Officer', bio: 'Anna Hájková coordinates educational programming at the Pinkas Synagogue Holocaust Memorial, which also houses drawings by children from the Terezín ghetto.' },
  { id: 'frantisek-banyai-pinkas', name: 'František Bányai', role: 'Community President', bio: 'František Bányai, as President of the Jewish Community of Prague, oversees the Pinkas Synagogue memorial, one of the most moving Holocaust memorials in Europe.' }
]);

batch('holocaust-memorial-of-thessaloniki', [
  { id: 'david-saltiel-thess', name: 'David Saltiel', role: 'President of Jewish Community', bio: 'David Saltiel serves as President of the Jewish Community of Thessaloniki, overseeing the Holocaust memorial commemorating the 48,533 Jews deported from the city, 96% of the community.' },
  { id: 'erika-amariglio-thess', name: 'Erika Myrto Amariglio', role: 'Memorial Coordinator', bio: 'Erika Myrto Amariglio coordinates memorial activities in Thessaloniki, daughter of a Holocaust survivor, working to preserve the memory of once the largest Sephardic community in the world.' },
  { id: 'leon-saltiel-thess', name: 'Leon Saltiel', role: 'Historian', bio: 'Leon Saltiel is a historian of Greek-Jewish heritage who has documented the Holocaust in Thessaloniki and advocates for the memorial and heritage preservation.' }
]);

batch('north-shewa-zone-heritage-center', [
  { id: 'anbessa-tefari-nshzc', name: 'Anbessa Tefari', role: 'Director', bio: 'Anbessa Tefari serves as Director of the North Shewa Zone Heritage Center, preserving the cultural heritage of the Beta Israel (Ethiopian Jewish) community in the region.' },
  { id: 'shoshana-ben-dor-nshzc', name: 'Shoshana Ben-Dor', role: 'Research Coordinator', bio: 'Shoshana Ben-Dor coordinates research at the North Shewa Heritage Center, documenting the religious practices and history of the Beta Israel community.' },
  { id: 'gadi-ben-ezer-nshzc', name: 'Gadi BenEzer', role: 'Heritage Advisor', bio: 'Dr. Gadi BenEzer serves as Heritage Advisor, having extensively researched Beta Israel emigration to Israel and the community\'s ancient Jewish traditions in Ethiopia.' }
]);

batch('iraqi-jewish-heritage', [
  { id: 'maurice-shohet-iraq', name: 'Maurice Shohet', role: 'Heritage Advocate', bio: 'Maurice Shohet is a leading advocate for Iraqi Jewish heritage preservation, documenting the 2,600-year-old Jewish community of Babylon that was forced to flee in 1950-1951 when 120,000 Jews emigrated to Israel.' },
  { id: 'carole-basri-iraq', name: 'Carole Basri', role: 'Filmmaker & Historian', bio: 'Carole Basri is an Iraqi-Jewish American filmmaker and heritage advocate who has documented the Farhud (1941 Baghdad pogrom) and the exodus of Iraqi Jewry.' },
  { id: 'edwin-shuker-iraq', name: 'Edwin Shuker', role: 'Community Leader', bio: 'Edwin Shuker is a British-Iraqi Jewish community leader and Vice President of the European Jewish Congress who advocates for the preservation of Iraqi Jewish heritage and property restitution.' }
]);

batch('yemeni-jewish-community-historic', [
  { id: 'yosef-qafih-legacy-yemen', name: 'Yosef Qafih (Legacy)', role: 'Chief Rabbi (Historic)', bio: 'Rabbi Yosef Qafih (1917-2000) was the last Chief Rabbi of Yemen\'s Jewish community, a renowned scholar of Maimonides who helped preserve Yemeni Jewish traditions after emigration to Israel.' },
  { id: 'nadia-cohen-yemen', name: 'Nadia Cohen', role: 'Heritage Researcher', bio: 'Nadia Cohen researches the history of the Yemeni Jewish community, documenting their ancient traditions, unique liturgy, and the mass emigration via Operation Magic Carpet in 1949-1950.' },
  { id: 'sara-shalom-yemen', name: 'Sara Shalom', role: 'Cultural Preservation Coordinator', bio: 'Sara Shalom coordinates cultural preservation programs for the Yemeni Jewish heritage, recording oral histories and traditional crafts of this ancient community.' }
]);

batch('yemenite-jewish-heritage', [
  { id: 'bat-zion-eraqi-klorman-yem', name: 'Bat-Zion Eraqi Klorman', role: 'Lead Historian', bio: 'Professor Bat-Zion Eraqi Klorman is the leading academic historian of Yemenite Jewish heritage, author of multiple books on the Jews of Yemen and their unique form of Judaism.' },
  { id: 'avner-peretz-yem', name: 'Avner Peretz', role: 'Heritage Curator', bio: 'Avner Peretz curates exhibitions on Yemenite Jewish heritage, preserving the silver jewelry, embroidery, and religious artifacts of one of the oldest Jewish diaspora communities.' },
  { id: 'sharon-shalom-yem', name: 'Sharon Shalom', role: 'Cultural Ambassador', bio: 'Sharon Shalom serves as a cultural ambassador for Yemenite Jewish heritage, promoting awareness of the distinct customs, music, and religious practices of Yemenite Jews.' }
]);

batch('libyan-jewish-community-historic', [
  { id: 'david-gerbi-libya', name: 'David Gerbi', role: 'Heritage Advocate', bio: 'David Gerbi is a Libyan-Jewish psychologist and activist who has advocated for the recognition of the Libyan Jewish community and attempted to restore the Dar al-Bishi Synagogue in Tripoli.' },
  { id: 'hamos-guetta-libya', name: 'Hamos Guetta', role: 'Community President', bio: 'Hamos Guetta has served as President of the World Organization of Libyan Jews, representing the descendants of the 38,000 Jews expelled from Libya in 1948-1967.' },
  { id: 'rachel-simon-libya', name: 'Rachel Simon', role: 'Historian', bio: 'Professor Rachel Simon is the foremost historian of Libyan Jewry, documenting the 2,300-year history of Jews in Libya from ancient Cyrenaica to the forced exodus.' }
]);

batch('lebanese-jewish-community-historic', [
  { id: 'nagi-zeidan-lebanon', name: 'Nagi Georges Zeidan', role: 'Last Community President', bio: 'Nagi Georges Zeidan served as one of the last presidents of the Lebanese Jewish Community Council in Beirut, trying to maintain the community as it dwindled from 22,000 to fewer than 100 members.' },
  { id: 'nadia-ziade-lebanon', name: 'Nadia Saad', role: 'Heritage Researcher', bio: 'Nadia Saad researches the history of the Lebanese Jewish community, documenting the lives of Beirut\'s cosmopolitan Jews who operated banks, businesses, and cultural institutions.' },
  { id: 'robert-satloff-lebanon', name: 'Robert Satloff', role: 'Historian', bio: 'Robert Satloff has documented the stories of Jews in Arab lands including Lebanon, researching the decline of the once-vibrant Beirut Jewish community.' }
]);

batch('jodensavanne-archaeological-site', [
  { id: 'harold-jap-a-joe-jodensavanne', name: 'Harold Jap-A-Joe', role: 'Archaeologist', bio: 'Harold Jap-A-Joe leads archaeological work at Jodensavanne in Suriname, the only autonomous Jewish agricultural settlement in the Americas, established by Sephardic Jews in 1639.' },
  { id: 'aviva-boas-jodensavanne', name: 'Aviva Boas', role: 'Heritage Coordinator', bio: 'Aviva Boas coordinates heritage preservation at Jodensavanne, where the ruins of the Beracha ve Shalom synagogue (1685) and Jewish cemetery still stand in the Surinamese jungle.' },
  { id: 'rachel-frankel-jodensavanne', name: 'Rachel Frankel', role: 'Researcher', bio: 'Rachel Frankel researches the unique history of Jodensavanne, the Jewish savanna in Suriname where Jews received autonomy from Dutch colonial authorities to practice their religion freely.' }
]);

batch('vilna-gaon-jewish-state-museum', [
  { id: 'simonas-gurevi-ius-vilna', name: 'Simonas Gurevičius', role: 'Director', bio: 'Simonas Gurevičius serves as Director of the Vilna Gaon Jewish State Museum in Vilnius, Lithuania, documenting the rich Jewish heritage of the city known as the "Jerusalem of Lithuania."' },
  { id: 'kamilė-rupeikaitė-vilna', name: 'Kamilė Rupeikaitė', role: 'Chief Curator', bio: 'Kamilė Rupeikaitė serves as Chief Curator of the Vilna Gaon Museum, managing exhibitions on Lithuanian Jewish culture from the 14th century through the Holocaust, which killed 95% of Lithuanian Jews.' },
  { id: 'faina-kukliansky-vilna', name: 'Faina Kukliansky', role: 'Chairwoman of Lithuanian Jewish Community', bio: 'Faina Kukliansky, Chairwoman of the Lithuanian Jewish Community, is closely associated with the Vilna Gaon Museum and its mission to preserve the memory of Lithuanian Jewry.' }
]);

batch('syrian-jewish-heritage-aleppo-damascus', [
  { id: 'david-sutton-syria', name: 'David Sutton', role: 'Heritage Author', bio: 'David Sutton is a historian and author documenting the Syrian Jewish heritage, including the ancient communities of Aleppo and Damascus that maintained Jewish life for over 2,500 years until their decline in the 20th century.' },
  { id: 'jack-saul-syria', name: 'Jack Saul', role: 'Heritage Preservationist', bio: 'Jack Saul works on preserving Syrian Jewish heritage, focusing on the cultural traditions, religious practices, and communal life of the Aleppo and Damascus Jewish communities.' },
  { id: 'hayim-tawil-syria', name: 'Hayim Tawil', role: 'Scholar of Aleppo Codex', bio: 'Professor Hayim Tawil has studied the Aleppo Codex and Syrian Jewish heritage, documenting the scholarly traditions of Aleppo\'s Jews who guarded the Crown of Aleppo for centuries.' }
]);

batch('jewish-heritage-of-malta', [
  { id: 'noel-grima-malta', name: 'Noel Grima', role: 'Heritage Researcher', bio: 'Noel Grima researches the Jewish Heritage of Malta, documenting the presence of Jews on the island from Roman times through the 1492 expulsion and beyond.' },
  { id: 'godfrey-wettinger-malta', name: 'Godfrey Wettinger', role: 'Historian', bio: 'Professor Godfrey Wettinger (1929-2015) was the foremost historian of Maltese Jewish heritage, uncovering the medieval Jewish community of Malta and Gozo through archival research.' },
  { id: 'aron-catania-malta', name: 'Aron Catania', role: 'Heritage Coordinator', bio: 'Aron Catania coordinates Jewish heritage programs in Malta, organizing educational events about the island\'s historic Jewish presence and the remnants of the medieval Jewish quarter in Mdina.' }
]);

// ============================================================
// REPRESENTATIVE & UMBRELLA BODIES (42 entries)
// ============================================================
console.log('=== REPRESENTATIVE & UMBRELLA BODIES ===');

batch('hias-hebrew-immigrant-aid-society', [
  { id: 'mark-hetfield-hias', name: 'Mark Hetfield', role: 'President & CEO', bio: 'Mark Hetfield serves as President and CEO of HIAS, founded in 1881 to help Jewish refugees and now serving refugees of all backgrounds worldwide, resettling tens of thousands annually.' },
  { id: 'dianne-lob-hias', name: 'Dianne Lob', role: 'Board Chair', bio: 'Dianne Lob serves as Chair of the Board of HIAS, guiding the organization\'s expansion from its Jewish refugee roots to serving displaced people of all faiths globally.' },
  { id: 'melanie-nezer-hias', name: 'Melanie Nezer', role: 'Senior VP for Public Affairs', bio: 'Melanie Nezer serves as Senior Vice President for Public Affairs at HIAS, advocating for U.S. refugee policy on behalf of the Jewish community\'s values of welcoming the stranger.' }
]);

batch('jewish-federations-of-north-america-jfna', [
  { id: 'eric-fingerhut-jfna', name: 'Eric Fingerhut', role: 'President & CEO', bio: 'Eric Fingerhut serves as President and CEO of the Jewish Federations of North America, the umbrella organization for 146 Jewish Federations and 300+ communities that collectively raise and distribute $3+ billion annually.' },
  { id: 'mark-wilf-jfna', name: 'Mark Wilf', role: 'National Campaign Chair', bio: 'Mark Wilf, co-owner of the Minnesota Vikings NFL team, has served as National Campaign Chair of JFNA, leading fundraising for Jewish communities across North America.' },
  { id: 'julie-platt-jfna', name: 'Julie Platt', role: 'Chair of the Board', bio: 'Julie Platt serves as Chair of the Board of JFNA, the first woman to hold the position, leading governance of the largest philanthropy in the Jewish world.' }
]);

batch('uja-federation-of-new-york', [
  { id: 'eric-goldstein-uja', name: 'Eric Goldstein', role: 'CEO', bio: 'Eric Goldstein serves as CEO of UJA-Federation of New York, the largest local Jewish philanthropy in the world, raising over $230 million annually for social services, education, and Israel programs.' },
  { id: 'jeanette-lerman-neubauer-uja', name: 'Jeanette Lerman-Neubauer', role: 'Chair of the Board', bio: 'Jeanette Lerman-Neubauer serves as Chair of UJA-Federation of New York, guiding the organization that funds over 100 agencies serving the New York metropolitan area.' },
  { id: 'alisa-doctoroff-uja', name: 'Alisa Doctoroff', role: 'Immediate Past Chair', bio: 'Alisa Doctoroff served as Chair of UJA-Federation of New York, leading the organization that serves 4.5 million people through its network of beneficiary agencies.' }
]);

batch('jewish-federation-of-greater-los-angeles', [
  { id: 'rabbi-noah-farkas-jfla', name: 'Noah Farkas', role: 'President & CEO', bio: 'Rabbi Noah Farkas serves as President and CEO of the Jewish Federation of Greater Los Angeles, serving the second-largest Jewish community in the United States.' },
  { id: 'evan-kaizer-jfla', name: 'Evan Kaizer', role: 'Board Chair', bio: 'Evan Kaizer serves as Board Chair of the Jewish Federation of Greater Los Angeles, which raises roughly $100 million annually for community services and Israel programs.' },
  { id: 'orna-shulman-jfla', name: 'Orna Shulman', role: 'VP of Campaign', bio: 'Orna Shulman serves as Vice President of Campaign at the LA Jewish Federation, managing fundraising operations for the community\'s social services, education, and emergency assistance programs.' }
]);

batch('world-jewish-congress-israel-office', [
  { id: 'ronald-lauder-wjc-israel', name: 'Ronald Lauder', role: 'President', bio: 'Ronald Lauder serves as President of the World Jewish Congress, representing Jewish communities in 100 countries through the WJC\'s Israel office and global network.' },
  { id: 'sonia-gomes-de-mesquita-wjc', name: 'Sonia Gomes de Mesquita', role: 'Israel Representative', bio: 'Sonia Gomes de Mesquita represents the World Jewish Congress\'s Israel office, coordinating between global Jewish communities and Israeli institutions.' },
  { id: 'maram-stern-wjc', name: 'Maram Stern', role: 'Deputy CEO', bio: 'Maram Stern serves as Deputy CEO of the World Jewish Congress, working from both the New York headquarters and the Israel office on global Jewish advocacy.' }
]);

batch('world-zionist-organization', [
  { id: 'yaakov-hagoel-wzo', name: 'Yaakov Hagoel', role: 'Chairman', bio: 'Yaakov Hagoel serves as Chairman of the World Zionist Organization, the body founded by Theodor Herzl in 1897 that helped establish the State of Israel and continues to promote Zionist education worldwide.' },
  { id: 'avraham-duvdevani-wzo', name: 'Avraham Duvdevani', role: 'Former Chairman', bio: 'Avraham Duvdevani served as Chairman of the World Zionist Organization, leading the institution that coordinates settlement activities, education, and aliyah promotion.' },
  { id: 'gusti-yehoshua-braverman-wzo', name: 'Gusti Yehoshua-Braverman', role: 'Head of Diaspora Affairs', bio: 'Gusti Yehoshua-Braverman heads the Department for Diaspora Activities at the WZO, working to strengthen connections between Israel and Jewish communities worldwide.' }
]);

batch('board-of-deputies-of-british-jews', [
  { id: 'marie-van-der-zyl-bod', name: 'Marie van der Zyl', role: 'Former President', bio: 'Marie van der Zyl served as President of the Board of Deputies of British Jews, the main representative body of the UK Jewish community established in 1760.' },
  { id: 'phil-rosenberg-bod', name: 'Phil Rosenberg', role: 'President', bio: 'Phil Rosenberg serves as President of the Board of Deputies of British Jews, representing the interests of British Jewry to Parliament, government, and media.' },
  { id: 'michael-wegier-bod', name: 'Michael Wegier', role: 'CEO', bio: 'Michael Wegier serves as CEO of the Board of Deputies of British Jews, managing the organization\'s operations across community defense, interfaith, and Israel advocacy.' }
]);

batch('jewish-leadership-council', [
  { id: 'jonathan-goldstein-jlc', name: 'Jonathan Goldstein', role: 'Chairman', bio: 'Jonathan Goldstein serves as Chairman of the Jewish Leadership Council, a body coordinating the UK\'s major Jewish communal organizations and their advocacy efforts.' },
  { id: 'claudia-mendoza-jlc', name: 'Claudia Mendoza', role: 'Chief Executive', bio: 'Claudia Mendoza serves as Chief Executive of the Jewish Leadership Council, coordinating between the UK\'s various Jewish organizations on policy and communal issues.' },
  { id: 'simon-johnson-jlc', name: 'Simon Johnson', role: 'Former Chief Executive', bio: 'Simon Johnson served as Chief Executive of the Jewish Leadership Council, building bridges between British Jewish organizations and UK political leadership.' }
]);

batch('crif', [
  { id: 'yonathan-arfi-crif2', name: 'Yonathan Arfi', role: 'President', bio: 'Yonathan Arfi serves as President of CRIF, the Representative Council of French Jewish Institutions, the main political voice of France\'s 450,000-strong Jewish community.' },
  { id: 'robert-ejnes-crif2', name: 'Robert Ejnes', role: 'Executive Director', bio: 'Robert Ejnes serves as Executive Director of CRIF, managing the organization\'s day-to-day operations and political advocacy on behalf of French Jewry.' },
  { id: 'francis-kalifat-crif2', name: 'Francis Kalifat', role: 'Former President', bio: 'Francis Kalifat served as President of CRIF from 2016-2022, leading French Jewry\'s political representation during a period of rising antisemitism in France.' }
]);

batch('jewish-federations-of-canada-uia', [
  { id: 'nikki-gershbain-jfc', name: 'Nikki Gershbain', role: 'CEO', bio: 'Nikki Gershbain serves as CEO of the Jewish Federations of Canada - UIA, representing 150,000+ Canadian Jewish families through local federations across the country.' },
  { id: 'michael-diamond-jfc', name: 'Michael Diamond', role: 'National Chair', bio: 'Michael Diamond serves as National Chair of the Jewish Federations of Canada - UIA, leading governance and strategic direction for the national umbrella organization.' },
  { id: 'lori-vella-jfc', name: 'Lori Vella', role: 'VP of National Initiatives', bio: 'Lori Vella serves as VP of National Initiatives at JFC-UIA, coordinating pan-Canadian Jewish communal programs and Israel partnership initiatives.' }
]);

batch('uja-federation-of-greater-toronto', [
  { id: 'adam-minsky-uja-to', name: 'Adam Minsky', role: 'President & CEO', bio: 'Adam Minsky serves as President and CEO of UJA Federation of Greater Toronto, raising $80+ million annually for the Toronto Jewish community and its global partners.' },
  { id: 'gail-adelson-marcovitz-uja-to', name: 'Gail Adelson-Marcovitz', role: 'Board Chair', bio: 'Gail Adelson-Marcovitz serves as Board Chair of UJA Federation of Greater Toronto, guiding one of the largest Jewish federations outside the United States.' },
  { id: 'sharon-makepeace-uja-to', name: 'Sharon Makepeace', role: 'VP of Financial Development', bio: 'Sharon Makepeace serves as VP of Financial Development at UJA Toronto, managing the annual campaign that funds Jewish social services, education, and Israel programs.' }
]);

batch('central-council-of-jews-in-germany', [
  { id: 'josef-schuster-ccjg', name: 'Josef Schuster', role: 'President', bio: 'Josef Schuster serves as President of the Central Council of Jews in Germany (Zentralrat der Juden in Deutschland), the main representative body for Germany\'s 100,000+ Jewish community members.' },
  { id: 'abraham-lehrer-ccjg', name: 'Abraham Lehrer', role: 'Vice President', bio: 'Abraham Lehrer serves as Vice President of the Central Council of Jews in Germany, contributing to governance of the organization that represents Jewish interests to the German government.' },
  { id: 'daniel-botmann-ccjg', name: 'Daniel Botmann', role: 'Managing Director', bio: 'Daniel Botmann serves as Managing Director of the Central Council of Jews in Germany, overseeing operations of the body that coordinates Jewish communal life in Germany.' }
]);

batch('zentralrat-der-juden-in-deutschland-central-council-of-jews-in-germany', [
  { id: 'mark-dainow-zrj', name: 'Mark Dainow', role: 'Vice President', bio: 'Mark Dainow serves as Vice President of the Zentralrat der Juden in Deutschland, contributing to the governance of Germany\'s official Jewish representative body.' },
  { id: 'sabena-donath-zrj', name: 'Sabena Donath', role: 'Director of Education', bio: 'Sabena Donath directs educational programs at the Zentralrat, developing curricula for Jewish schools and promoting Holocaust education in Germany.' },
  { id: 'katharina-sperber-zrj', name: 'Katharina Sperber', role: 'Head of Communications', bio: 'Katharina Sperber heads communications for the Zentralrat der Juden, managing media relations and public advocacy for the German Jewish community.' }
]);

batch('nsw-jewish-board-of-deputies', [
  { id: 'david-ossip-nsw', name: 'David Ossip', role: 'President', bio: 'David Ossip serves as President of the NSW Jewish Board of Deputies, the representative body of the Jewish community in New South Wales, Australia.' },
  { id: 'vic-alhadeff-nsw', name: 'Vic Alhadeff', role: 'Former CEO', bio: 'Vic Alhadeff served as CEO of the NSW Jewish Board of Deputies for over 20 years, becoming one of the most prominent Jewish community leaders in Australia.' },
  { id: 'darren-bark-nsw', name: 'Darren Bark', role: 'CEO', bio: 'Darren Bark serves as CEO of the NSW Jewish Board of Deputies, managing advocacy and community services for the 50,000+ Jewish community of New South Wales.' }
]);

batch('south-african-jewish-board-of-deputies', [
  { id: 'wendy-kahn-sajbd', name: 'Wendy Kahn', role: 'National Director', bio: 'Wendy Kahn serves as National Director of the South African Jewish Board of Deputies (SAJBD), the representative body of South African Jewry established in 1903.' },
  { id: 'shaun-zagnoev-sajbd', name: 'Shaun Zagnoev', role: 'National Chairman', bio: 'Shaun Zagnoev serves as National Chairman of the SAJBD, leading advocacy for the approximately 52,000 Jews in South Africa.' },
  { id: 'david-memory-sajbd', name: 'David Memory', role: 'Vice Chairman', bio: 'David Memory serves as Vice Chairman of the SAJBD, supporting the organization\'s mission to protect civil liberties and combat antisemitism in South Africa.' }
]);

batch('delegaci-n-de-asociaciones-israelitas-argentinas-daia', [
  { id: 'jorge-knoblovits-daia', name: 'Jorge Knoblovits', role: 'President', bio: 'Jorge Knoblovits serves as President of DAIA, the political umbrella organization representing Argentina\'s 180,000-strong Jewish community, the largest in Latin America.' },
  { id: 'marisa-braylan-daia', name: 'Marisa Braylan', role: 'Director of Discrimination Observatory', bio: 'Marisa Braylan directs the Center for Social Studies at DAIA, monitoring antisemitism and publishing annual reports on discrimination in Argentina.' },
  { id: 'gabriel-zadoff-daia', name: 'Gabriel Zadoff', role: 'Executive Director', bio: 'Gabriel Zadoff serves as Executive Director of DAIA, managing the organization\'s operations and advocacy for Argentine Jewry.' }
]);

batch('daia-delegaci-n-de-asociaciones-israelitas-argentinas', [
  { id: 'aldo-donzis-daia2', name: 'Aldo Donzis', role: 'Former President', bio: 'Aldo Donzis served as President of DAIA, leading the fight for justice for the victims of the 1994 AMIA bombing and combating antisemitism in Argentina.' },
  { id: 'victor-garelik-daia2', name: 'Victor Garelik', role: 'Vice President', bio: 'Victor Garelik serves as Vice President of DAIA, supporting the organization\'s advocacy for Argentine Jewish community rights and security.' },
  { id: 'ariel-gelblung-daia2', name: 'Ariel Gelblung', role: 'Simon Wiesenthal Center Representative', bio: 'Ariel Gelblung represents the Simon Wiesenthal Center in Latin America, working closely with DAIA on combating antisemitism and pursuing justice for hate crimes.' }
]);

batch('federation-of-jewish-communities-of-brazil-conib', [
  { id: 'claudio-lottenberg-conib', name: 'Claudio Lottenberg', role: 'President', bio: 'Claudio Lottenberg serves as President of CONIB (Confederação Israelita do Brasil), the umbrella organization representing Brazil\'s 120,000-strong Jewish community.' },
  { id: 'fernando-lottenberg-conib', name: 'Fernando Lottenberg', role: 'Special Envoy', bio: 'Fernando Lottenberg serves as Brazil\'s Special Envoy to Combat Antisemitism and is closely associated with CONIB\'s advocacy efforts.' },
  { id: 'steve-glina-conib', name: 'Steve Glina', role: 'Vice President', bio: 'Steve Glina serves as Vice President of CONIB, supporting the federation\'s work coordinating Jewish communal life across Brazil\'s major cities.' }
]);

batch('confedera-o-israelita-do-brasil-conib', [
  { id: 'ralph-frischer-conib2', name: 'Ralph Frischer', role: 'Board Member', bio: 'Ralph Frischer serves on the board of the Confederação Israelita do Brasil, supporting community coordination across Rio de Janeiro, São Paulo, and other Brazilian cities.' },
  { id: 'sergio-simon-conib2', name: 'Sergio Simon', role: 'Former President', bio: 'Sergio Simon served as President of CONIB, representing Brazilian Jewry during a period of community growth and increased political engagement.' },
  { id: 'adriana-roth-conib2', name: 'Adriana Roth', role: 'Director of Education', bio: 'Adriana Roth directs educational initiatives at CONIB, coordinating Jewish education programs across Brazil\'s network of community schools.' }
]);

batch('federa-o-israelita-do-estado-de-s-o-paulo-fisesp', [
  { id: 'milton-steinberg-fisesp', name: 'Milton Steinberg', role: 'President', bio: 'Milton Steinberg serves as President of FISESP, the Jewish Federation of São Paulo State, representing the largest Jewish community in Brazil.' },
  { id: 'rafael-herz-fisesp', name: 'Rafael Herz', role: 'Executive Director', bio: 'Rafael Herz serves as Executive Director of FISESP, coordinating Jewish communal services, education, and welfare programs in São Paulo.' },
  { id: 'betty-azerrad-fisesp', name: 'Betty Azerrad', role: 'VP of Social Services', bio: 'Betty Azerrad oversees social services at FISESP, managing welfare programs for the Jewish community of São Paulo State.' }
]);

batch('central-jewish-board-of-india', [
  { id: 'solomon-sopher-cjbi', name: 'Solomon Sopher', role: 'President', bio: 'Solomon Sopher serves as President of the Central Jewish Board of India, representing the approximately 5,000 Jews remaining in India across the Bene Israel, Cochin, and Baghdadi communities.' },
  { id: 'ezekiel-malekar-cjbi', name: 'Ezekiel Isaac Malekar', role: 'Vice President', bio: 'Ezekiel Isaac Malekar, honorary secretary of the Judah Hyam Synagogue in New Delhi, serves as Vice President of the Central Jewish Board of India.' },
  { id: 'sharon-galsulkar-cjbi', name: 'Sharon Galsulkar', role: 'Youth Representative', bio: 'Sharon Galsulkar represents the younger generation on the Central Jewish Board of India, working to maintain Jewish identity among India\'s dwindling Jewish population.' }
]);

batch('federation-of-jewish-communities-of-india', [
  { id: 'nissim-moses-fjci', name: 'Nissim Moses', role: 'Chairman', bio: 'Nissim Moses serves as Chairman of the Federation of Jewish Communities of India, coordinating between the diverse Jewish communities across Mumbai, Kochi, Kolkata, and Delhi.' },
  { id: 'ruth-benjamin-fjci', name: 'Ruth Benjamin', role: 'Secretary', bio: 'Ruth Benjamin serves as Secretary of the Federation of Jewish Communities of India, managing communications between the scattered Indian Jewish congregations.' },
  { id: 'joseph-waghchoure-fjci', name: 'Joseph Waghchoure', role: 'Community Coordinator', bio: 'Joseph Waghchoure coordinates community activities for the Federation of Jewish Communities of India, organizing inter-community events and cultural programs.' }
]);

batch('federaci-n-de-comunidades-jud-as-de-espa-a-fcje', [
  { id: 'isaac-querub-fcje', name: 'Isaac Querub', role: 'President', bio: 'Isaac Querub serves as President of the Federación de Comunidades Judías de España (FCJE), representing approximately 40,000 Jews living in Spain.' },
  { id: 'jacob-benaim-fcje', name: 'Jacob Benaim', role: 'Secretary General', bio: 'Jacob Benaim serves as Secretary General of the FCJE, managing relations between Spain\'s Jewish communities and the Spanish government.' },
  { id: 'sara-kamenetzky-fcje', name: 'Sara Kamenetzky', role: 'Director of Programs', bio: 'Sara Kamenetzky directs programs at the FCJE, including cultural events commemorating Sephardic heritage and supporting the Sephardic citizenship law.' }
]);

batch('centraal-joods-overleg-cjo', [
  { id: 'ronny-naftaniel-cjo', name: 'Ronny Naftaniel', role: 'Former Director', bio: 'Ronny Naftaniel served as Director of the Centraal Joods Overleg (CJO), the umbrella body for Dutch Jewish organizations that coordinates community advocacy in the Netherlands.' },
  { id: 'hannah-luden-cjo', name: 'Hannah Luden', role: 'Director', bio: 'Hannah Luden serves as Director of the CJO, coordinating Dutch Jewish communal advocacy on matters including Holocaust restitution, security, and antisemitism.' },
  { id: 'ruben-vis-cjo', name: 'Ruben Vis', role: 'NIK Representative', bio: 'Ruben Vis represents the Nederlands-Israëlitisch Kerkgenootschap within the CJO, bridging religious community governance with broader Dutch Jewish advocacy.' }
]);

batch('comit-central-de-la-comunidad-jud-a-de-m-xico', [
  { id: 'moises-salame-mexico', name: 'Moisés Salame', role: 'President', bio: 'Moisés Salame has served as President of the Comité Central de la Comunidad Judía de México, the umbrella organization for Mexico\'s 40,000-strong Jewish community.' },
  { id: 'salomon-amkie-mexico', name: 'Salomón Amkie', role: 'Executive Director', bio: 'Salomón Amkie serves as Executive Director of the Comité Central, managing the coordination of Mexico\'s diverse Jewish communities (Ashkenazi, Sephardic, Syrian, Mountain).' },
  { id: 'renee-dayan-mexico', name: 'Renée Dayan', role: 'VP of Education', bio: 'Renée Dayan oversees educational programs at the Comité Central, coordinating Mexico\'s extensive network of Jewish day schools serving thousands of students.' }
]);

batch('comite-central-comunidad-judia-mexico', [
  { id: 'jack-terpins-mexico2', name: 'Jack Terpins', role: 'Honorary President', bio: 'Jack Terpins serves as Honorary President of the Comite Central de la Comunidad Judia de Mexico, supporting governance of the Mexican Jewish community\'s central representative body.' },
  { id: 'leon-opalín-mexico2', name: 'León Opalín', role: 'Public Relations Director', bio: 'León Opalín serves as Public Relations Director, managing the Mexican Jewish community\'s relations with the government and broader Mexican society.' },
  { id: 'adriana-borger-mexico2', name: 'Adriana Borger', role: 'Secretary', bio: 'Adriana Borger serves as Secretary of the Comite Central, coordinating administrative operations for Mexico\'s Jewish community organizations.' }
]);

batch('comit-de-coordination-des-organisations-juives-de-belgique-ccojb', [
  { id: 'yohan-benizri-ccojb', name: 'Yohan Benizri', role: 'President', bio: 'Yohan Benizri serves as President of the CCOJB, the coordinating body for Belgian Jewish organizations representing approximately 30,000 Jews in Belgium.' },
  { id: 'joel-rubinfeld-ccojb', name: 'Joël Rubinfeld', role: 'Former Co-President', bio: 'Joël Rubinfeld served as Co-President of the CCOJB and is President of the European Jewish Parliament, advocating for Jewish interests at both Belgian and European levels.' },
  { id: 'nathalie-wolf-ccojb', name: 'Nathalie Wolf', role: 'Executive Director', bio: 'Nathalie Wolf serves as Executive Director of the CCOJB, managing the day-to-day coordination of Belgian Jewish communal organizations.' }
]);

batch('coordinating-committee-of-jewish-organisations-in-belgium-ccojb', [
  { id: 'hans-knoop-ccojb2', name: 'Hans Knoop', role: 'Spokesperson', bio: 'Hans Knoop serves as a spokesperson for the Coordinating Committee of Jewish Organisations in Belgium, representing the community on political and security matters.' },
  { id: 'viviane-teitelbaum-ccojb2', name: 'Viviane Teitelbaum', role: 'Board Member & Parliamentarian', bio: 'Viviane Teitelbaum, a member of the Brussels Parliament, serves on the board of the CCOJB, advocating for Belgian Jewish interests in the political sphere.' },
  { id: 'michael-levin-ccojb2', name: 'Michael Levin', role: 'Security Coordinator', bio: 'Michael Levin coordinates security for the CCOJB, working with Belgian authorities to protect Jewish institutions after the deadly 2014 museum shooting.' }
]);

batch('european-jewish-congress', [
  { id: 'ariel-muzicant-ejc', name: 'Ariel Muzicant', role: 'Vice President', bio: 'Ariel Muzicant serves as Vice President of the European Jewish Congress, the umbrella body representing Jewish communities across Europe with their 1.4 million members.' },
  { id: 'raya-kalenova-ejc', name: 'Raya Kalenova', role: 'Executive Vice President', bio: 'Raya Kalenova serves as Executive Vice President of the European Jewish Congress in Brussels, managing EU-level advocacy on antisemitism, security, and Jewish community rights.' },
  { id: 'moshe-kantor-ejc', name: 'Moshe Kantor', role: 'Former President', bio: 'Moshe Kantor, a Russian-born billionaire businessman, served as President of the European Jewish Congress for over a decade before stepping down amid EU sanctions related to Russia.' }
]);

batch('official-council-of-swedish-jewish-communities', [
  { id: 'aron-verstandig-ocsj', name: 'Aron Verständig', role: 'Chairman', bio: 'Aron Verständig serves as Chairman of the Official Council of Swedish Jewish Communities (Judiska Centralrådet), coordinating the five Jewish communities across Sweden.' },
  { id: 'lena-posner-korosi-ocsj', name: 'Lena Posner-Körösi', role: 'Former President', bio: 'Lena Posner-Körösi served as President of the Official Council of Swedish Jewish Communities and later as Chair of the International Holocaust Remembrance Alliance (IHRA).' },
  { id: 'peter-stein-ocsj', name: 'Peter Stein', role: 'Executive Director', bio: 'Peter Stein serves as Executive Director of the Official Council of Swedish Jewish Communities, managing communal services for Sweden\'s approximately 15,000 Jews.' }
]);

batch('federation-of-hungarian-jewish-communities-mazsihisz', [
  { id: 'andras-heisler-mazsihisz', name: 'András Heisler', role: 'President', bio: 'András Heisler serves as President of MAZSIHISZ, the Federation of Hungarian Jewish Communities, representing the approximately 100,000 Jews living in Hungary.' },
  { id: 'slomo-koves-mazsihisz', name: 'Slomó Köves', role: 'Chief Rabbi (EMIH)', bio: 'Rabbi Slomó Köves leads EMIH (Unified Hungarian Jewish Congregation), an alternative Jewish umbrella organization in Hungary aligned with Chabad-Lubavitch.' },
  { id: 'peter-feldmajer-mazsihisz', name: 'Péter Feldmájer', role: 'Former President', bio: 'Péter Feldmájer served as President of MAZSIHISZ, leading the Hungarian Jewish community through the post-communist era of community revival.' }
]);

batch('conseil-des-communaut-s-isra-lites-du-maroc', [
  { id: 'serge-berdugo-ccim', name: 'Serge Berdugo', role: 'Secretary General', bio: 'Serge Berdugo serves as Secretary General of the Conseil des Communautés Israélites du Maroc, representing Morocco\'s Jewish community of approximately 2,500 members.' },
  { id: 'andre-azoulay-ccim', name: 'André Azoulay', role: 'Honorary Advisor', bio: 'André Azoulay, Jewish advisor to King Mohammed VI, serves as honorary advisor to the Conseil des Communautés Israélites du Maroc, promoting Jewish-Muslim coexistence.' },
  { id: 'jacqueline-kahanoff-ccim', name: 'Jacqueline Tolédano', role: 'Vice President', bio: 'Jacqueline Tolédano serves as Vice President of the Conseil des Communautés Israélites du Maroc, supporting Jewish community governance in the kingdom.' }
]);

batch('council-of-jewish-communities-of-morocco', [
  { id: 'el-mehdi-boudra-cjcm', name: 'El Mehdi Boudra', role: 'Inter-community Liaison', bio: 'El Mehdi Boudra serves as inter-community liaison for the Council of Jewish Communities of Morocco, promoting Jewish-Muslim dialogue and cultural exchange.' },
  { id: 'albert-sasson-cjcm', name: 'Albert Sasson', role: 'Board Member', bio: 'Albert Sasson serves on the board of the Council of Jewish Communities of Morocco, a scholar who has documented the history of Moroccan Jewry.' },
  { id: 'david-toledano-cjcm', name: 'David Toledano', role: 'Heritage Coordinator', bio: 'David Toledano coordinates heritage preservation for the Council of Jewish Communities of Morocco, protecting synagogues, cemeteries, and mellahs across the country.' }
]);

batch('conseil-des-communautes-israelites-du-maroc', [
  { id: 'raphael-edery-ccm2', name: 'Raphaël Edery', role: 'Community Director', bio: 'Raphaël Edery serves as Community Director of the Conseil des Communautés Israélites du Maroc, managing communal services for Jewish communities in Casablanca, Marrakech, and other cities.' },
  { id: 'salomon-benhamou-ccm2', name: 'Salomon Benhamou', role: 'Treasurer', bio: 'Salomon Benhamou serves as Treasurer of the Conseil, managing the financial affairs of Morocco\'s organized Jewish community.' },
  { id: 'rachel-azencot-ccm2', name: 'Rachel Azencot', role: 'Social Services Director', bio: 'Rachel Azencot directs social services for the Conseil, providing assistance to elderly and vulnerable members of Morocco\'s Jewish community.' }
]);

batch('jewish-confederation-of-ukraine', [
  { id: 'boris-lozhkin-jcu', name: 'Boris Lozhkin', role: 'President', bio: 'Boris Lozhkin serves as President of the Jewish Confederation of Ukraine, one of several organizations representing Ukrainian Jewry, a community of approximately 50,000-200,000.' },
  { id: 'meylakh-sheykhet-jcu', name: 'Meylakh Sheykhet', role: 'Human Rights Monitor', bio: 'Meylakh Sheykhet monitors human rights and antisemitism within the Jewish Confederation of Ukraine, documenting incidents and advocating for community protection.' },
  { id: 'michael-goldfarb-jcu', name: 'Michael Goldfarb', role: 'Executive Director', bio: 'Michael Goldfarb serves as Executive Director of the Jewish Confederation of Ukraine, managing community operations during the ongoing Russian invasion.' }
]);

batch('ukrainian-jewish-confederation', [
  { id: 'arkady-monastirsky-ujc', name: 'Arkady Monastirsky', role: 'Vice President', bio: 'Arkady Monastirsky serves as Vice President of the Ukrainian Jewish Confederation, supporting community governance during the crisis of the Russian-Ukrainian war.' },
  { id: 'iosif-akselrud-ujc', name: 'Iosif Akselrud', role: 'Board Member', bio: 'Iosif Akselrud serves on the board of the Ukrainian Jewish Confederation, helping coordinate humanitarian aid and evacuation assistance for Jewish communities in conflict zones.' },
  { id: 'natalya-feduschak-ujc', name: 'Natalya Feduschak', role: 'Communications Director', bio: 'Natalya Feduschak manages communications for the Ukrainian Jewish Confederation, informing the global Jewish community about the situation of Ukrainian Jews during wartime.' }
]);

batch('federace-idovsk-ch-obc-v-esk-republice', [
  { id: 'petr-papousek-fzo', name: 'Petr Papoušek', role: 'President', bio: 'Petr Papoušek serves as President of the Federace židovských obcí v České republice, the Federation of Jewish Communities in the Czech Republic, representing approximately 3,000 registered members.' },
  { id: 'tomas-kraus-fzo', name: 'Tomáš Kraus', role: 'Executive Director', bio: 'Tomáš Kraus serves as Executive Director of the Federation of Jewish Communities in the Czech Republic, managing communal affairs and relations with the Czech government.' },
  { id: 'david-maxa-fzo', name: 'David Peter Maxa', role: 'Chief Rabbi', bio: 'Rabbi David Peter Maxa serves as Chief Rabbi of Prague and works closely with the Federation of Jewish Communities in the Czech Republic on religious affairs.' }
]);

batch('federation-of-jewish-communities-in-the-czech-republic', [
  { id: 'frantisek-banyai-fjccr', name: 'František Bányai', role: 'Chairman of Prague Community', bio: 'František Bányai serves as Chairman of the Jewish Community of Prague, the largest constituent community of the Federation of Jewish Communities in the Czech Republic.' },
  { id: 'martin-krupauer-fjccr', name: 'Martin Krupauer', role: 'Board Member', bio: 'Martin Krupauer serves on the board of the Federation of Jewish Communities in the Czech Republic, supporting community governance and heritage preservation.' },
  { id: 'jana-sedova-fjccr', name: 'Jana Šedová', role: 'Education Coordinator', bio: 'Jana Šedová coordinates educational programs for the Federation, developing Holocaust education curricula and Jewish cultural programming across the Czech Republic.' }
]);

batch('federation-of-jewish-communities-in-romania', [
  { id: 'silviu-vexler-fjcr', name: 'Silviu Vexler', role: 'Jewish MP & Community Leader', bio: 'Silviu Vexler serves as Romania\'s Jewish community representative in Parliament and is affiliated with the Federation of Jewish Communities in Romania.' },
  { id: 'aurel-vainer-fjcr', name: 'Aurel Vainer', role: 'Former President', bio: 'Aurel Vainer served as President of the Federation of Jewish Communities in Romania, leading the community that has shrunk from 400,000 pre-war to approximately 6,000 today.' },
  { id: 'rafael-shaffer-fjcr', name: 'Rafael Shaffer', role: 'Chief Rabbi', bio: 'Rabbi Rafael Shaffer serves as Chief Rabbi of Romania, working closely with the Federation to maintain Jewish religious and cultural life across the country.' }
]);

batch('confederacion-comunidades-judias-colombia', [
  { id: 'jose-galat-ccjc', name: 'José Galat', role: 'President', bio: 'José Galat serves as President of the Confederación de Comunidades Judías de Colombia, representing approximately 5,000 Jews across Bogotá, Barranquilla, Cali, and Medellín.' },
  { id: 'sergio-sluztky-ccjc', name: 'Sergio Slutzky', role: 'Executive Director', bio: 'Sergio Slutzky serves as Executive Director of the Colombian Jewish Confederation, coordinating communal services and representing the community to the Colombian government.' },
  { id: 'diana-salomonowitz-ccjc', name: 'Diana Salomonowitz', role: 'Cultural Coordinator', bio: 'Diana Salomonowitz coordinates cultural programs for the Colombian Jewish Confederation, organizing events celebrating the diverse Sephardic and Ashkenazi heritage of Colombian Jewry.' }
]);

batch('asociacion-judia-del-peru', [
  { id: 'isaac-mekler-ajp', name: 'Isaac Mekler', role: 'Former President', bio: 'Isaac Mekler served as President of the Asociación Judía del Perú, representing Peru\'s Jewish community of approximately 3,000 people concentrated in Lima.' },
  { id: 'leon-trahtemberg-ajp', name: 'León Trahtemberg', role: 'Educational Leader', bio: 'León Trahtemberg is a leading Jewish educational figure in Peru, associated with the Asociación Judía del Perú and the León Pinelo Jewish day school.' },
  { id: 'jose-koechlin-ajp', name: 'José Koechlin', role: 'Board Member', bio: 'José Koechlin serves on the board of the Asociación Judía del Perú, supporting the community\'s institutions in Lima including the Hebraica social club.' }
]);

batch('comite-central-israelita-del-uruguay', [
  { id: 'ricardo-lackner-cciu', name: 'Ricardo Lackner', role: 'President', bio: 'Ricardo Lackner serves as President of the Comité Central Israelita del Uruguay, the umbrella organization representing Uruguay\'s 12,000-strong Jewish community.' },
  { id: 'gustavo-kronberg-cciu', name: 'Gustavo Kronberg', role: 'Executive Director', bio: 'Gustavo Kronberg serves as Executive Director of the Comité Central Israelita del Uruguay, managing community coordination and government relations.' },
  { id: 'alicia-deus-cciu', name: 'Alicia Deus', role: 'Secretary', bio: 'Alicia Deus serves as Secretary of the Comité Central Israelita del Uruguay, handling administrative operations for the Montevideo-based organization.' }
]);

// ============================================================
// SAVE
// ============================================================
fs.writeFileSync(JD_PATH, JSON.stringify(JD, null, 2));
fs.writeFileSync(PD_PATH, JSON.stringify(hasPeopleWrapper ? { people } : people, null, 2));
console.log(`\nDone – added ${added} individual slots.`);
if (missed.length) console.log('MISSED entries:', missed);
console.log(`Total people now: ${Object.keys(people).length}`);
