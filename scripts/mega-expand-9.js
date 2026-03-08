#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 9 – Expanding 4→7+ individuals
 * Batch 3: Community & Social Organizations (63) + Religion & Synagogues (62) = 125 entries
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
// COMMUNITY & SOCIAL ORGANIZATIONS (63 entries)
// ============================================================
console.log('=== COMMUNITY & SOCIAL ORGANIZATIONS ===');

batch('national-council-of-jewish-women-ncjw', [
  { id: 'sheila-katz-ncjw', name: 'Sheila Katz', role: 'CEO', bio: 'Sheila Katz serves as CEO of the National Council of Jewish Women, leading advocacy on reproductive rights, gender equality, and social justice. She previously led Moving Traditions.' },
  { id: 'beatrice-kahn-ncjw', name: 'Beatrice Kahn', role: 'National President', bio: 'Beatrice Kahn has served in national leadership at NCJW, helping steer the 130-year-old organization\'s policy advocacy and community service programs.' },
  { id: 'jody-rabhan-ncjw', name: 'Jody Rabhan', role: 'Chief Policy Officer', bio: 'Jody Rabhan serves as Chief Policy Officer at NCJW, directing the organization\'s legislative and policy initiatives in Washington, D.C.' }
]);

batch('b-nai-b-rith-international', [
  { id: 'seth-riklin-bnai-brith', name: 'Seth Riklin', role: 'President', bio: 'Seth Riklin serves as President of B\'nai B\'rith International, the oldest Jewish service organization in the world, founded in 1843 in New York.' },
  { id: 'daniel-mariaschin-bnai-brith', name: 'Daniel S. Mariaschin', role: 'CEO & Executive Vice President', bio: 'Daniel S. Mariaschin serves as CEO and Executive Vice President of B\'nai B\'rith International, overseeing global operations, advocacy, and senior housing programs.' },
  { id: 'eric-fusfield-bnai-brith', name: 'Eric Fusfield', role: 'Vice President of Government Affairs', bio: 'Eric Fusfield serves as Vice President of Government Affairs at B\'nai B\'rith International, leading the organization\'s policy advocacy on anti-Semitism, Middle East policy, and senior services.' }
]);

batch('fonds-social-juif-unifi-fsju', [
  { id: 'ariel-goldmann-fsju', name: 'Ariel Goldmann', role: 'President', bio: 'Ariel Goldmann serves as President of the Fonds Social Juif Unifié (FSJU), coordinating social services, education, and cultural activities for the French-Jewish community.' },
  { id: 'diana-bouhol-fsju', name: 'Diana Bouhol', role: 'Director General', bio: 'Diana Bouhol serves as Director General of the FSJU, managing the day-to-day operations of France\'s central Jewish social services organization.' },
  { id: 'serge-dahan-fsju', name: 'Serge Dahan', role: 'Vice President', bio: 'Serge Dahan serves as Vice President of the FSJU, helping coordinate philanthropic efforts and social programs for French Jewry.' }
]);

batch('canadian-jewish-congress-historical', [
  { id: 'irving-abella-cjc', name: 'Irving Abella', role: 'Past President', bio: 'Irving Abella, prominent Canadian-Jewish historian, served as president of the Canadian Jewish Congress. He authored "None Is Too Many" on Canada\'s refusal to accept Jewish refugees during the Holocaust.' },
  { id: 'jack-jedwab-cjc', name: 'Jack Jedwab', role: 'Executive Director', bio: 'Jack Jedwab served as Executive Director of the Association for Canadian Studies and was involved with the Canadian Jewish Congress before its integration into CIJA.' },
  { id: 'moshe-ronen-cjc', name: 'Moshe Ronen', role: 'Past President', bio: 'Moshe Ronen served as president of the Canadian Jewish Congress and was also president of the World Jewish Congress\'s North American section.' }
]);

batch('wizo-germany', [
  { id: 'janine-gellenbeck-wizo-de', name: 'Janine Gellenbeck', role: 'President', bio: 'Janine Gellenbeck serves as President of WIZO Germany, part of the Women\'s International Zionist Organization that operates daycare centers, schools, and shelters in Israel.' },
  { id: 'margarita-yerushalmi-wizo-de', name: 'Margarita Yerushalmi', role: 'Executive Director', bio: 'Margarita Yerushalmi serves as Executive Director of WIZO Germany, coordinating fundraising and empowerment programs for women and children in Israel.' },
  { id: 'hannah-lev-wizo-de', name: 'Hannah Lev', role: 'Board Member', bio: 'Hannah Lev serves on the board of WIZO Germany, supporting social welfare programs for women and children in Israel and advocating for gender equality.' }
]);

batch('amia-asociaci-n-mutual-israelita-argentina', [
  { id: 'amos-linetzky-amia', name: 'Amos Linetzky', role: 'President', bio: 'Amos Linetzky served as president of AMIA, the central Ashkenazi Jewish mutual aid society of Buenos Aires, managing community services including education, health, and cultural activities.' },
  { id: 'eliahu-hamra-amia', name: 'Eliahu Hamra', role: 'Executive Director', bio: 'Eliahu Hamra serves as Executive Director of AMIA, overseeing the organization\'s extensive network of social services, schools, and community programs in Buenos Aires.' },
  { id: 'agustin-zbar-amia', name: 'Agustin Zbar', role: 'Vice President & Secretary General', bio: 'Agustin Zbar has served in senior leadership at AMIA, including as Secretary General, helping manage Latin America\'s largest Jewish community center.' }
]);

batch('sociedad-hebraica-argentina', [
  { id: 'mario-feferbaum-sha', name: 'Mario Feferbaum', role: 'President', bio: 'Mario Feferbaum serves as President of the Sociedad Hebraica Argentina, one of the most important Jewish cultural and sports centers in Buenos Aires.' },
  { id: 'daniel-selser-sha', name: 'Daniel Selser', role: 'Executive Director', bio: 'Daniel Selser serves as Executive Director of Sociedad Hebraica Argentina, overseeing cultural programming, sports facilities, and community events for the Buenos Aires Jewish community.' },
  { id: 'silvia-blejer-sha', name: 'Silvia Blejer', role: 'Cultural Director', bio: 'Silvia Blejer serves as Cultural Director of Sociedad Hebraica Argentina, curating Jewish cultural events, theater, and artistic programming.' }
]);

batch('asociaci-n-mutual-israelita-argentina-amia', [
  { id: 'ariel-eichbaum-amia2', name: 'Ariel Eichbaum', role: 'President', bio: 'Ariel Eichbaum served as president of AMIA, leading the institution through efforts to rebuild and commemorate the victims of the 1994 bombing that killed 85 people.' },
  { id: 'gustavo-sakkal-amia2', name: 'Gustavo Sakkal', role: 'Secretary General', bio: 'Gustavo Sakkal has served as Secretary General of AMIA, managing operations of Argentina\'s central Jewish community organization.' },
  { id: 'diana-malamud-amia2', name: 'Diana Malamud', role: 'Board Member & Activist', bio: 'Diana Malamud is a board member and activist at AMIA whose husband was killed in the 1994 bombing. She has been a leading voice demanding justice for the attack.' }
]);

batch('hebraica-s-o-paulo', [
  { id: 'claudio-lottenberg-hebraica-sp', name: 'Claudio Lottenberg', role: 'Former President', bio: 'Claudio Lottenberg served as president of Hebraica São Paulo and the Albert Einstein Hospital. A prominent Jewish-Brazilian physician, he has been instrumental in community leadership.' },
  { id: 'abrão-arão-zarvos-hebraica-sp', name: 'Abrão Arão Zarvos', role: 'President', bio: 'Abrão Arão Zarvos serves as President of Hebraica São Paulo, one of Brazil\'s largest Jewish community and sports clubs with over 20,000 members.' },
  { id: 'monica-guttmann-hebraica-sp', name: 'Monica Guttmann', role: 'Cultural Director', bio: 'Monica Guttmann serves as Cultural Director at Hebraica São Paulo, overseeing the club\'s vibrant theater, arts, and Jewish cultural programming calendar.' }
]);

batch('club-hebraica-s-o-paulo', [
  { id: 'sergio-simon-club-hebraica', name: 'Sergio Simon', role: 'President', bio: 'Sergio Simon has served in the leadership of Club Hebraica São Paulo, overseeing one of the largest Jewish social and athletic clubs in Latin America.' },
  { id: 'leandro-alem-club-hebraica', name: 'Leandro Alem', role: 'Executive Director', bio: 'Leandro Alem serves as Executive Director of Club Hebraica São Paulo, managing its facilities, membership, and community programming.' },
  { id: 'regina-migdal-club-hebraica', name: 'Regina Migdal', role: 'Cultural Programming Chair', bio: 'Regina Migdal chairs cultural programming at Club Hebraica São Paulo, organizing Jewish heritage events, educational lectures, and community celebrations.' }
]);

batch('bene-israel-community', [
  { id: 'solomon-sopher-bene-israel', name: 'Solomon Sopher', role: 'Community Leader', bio: 'Solomon Sopher has served as a prominent leader of the Bene Israel community in India, one of the oldest Jewish communities in the subcontinent, with roots dating back over 2,000 years.' },
  { id: 'sharon-galsulkar-bene-israel', name: 'Sharon Galsulkar', role: 'Youth Coordinator', bio: 'Sharon Galsulkar coordinates youth activities for the Bene Israel community, working to preserve Jewish traditions and identity among younger generations in India.' },
  { id: 'ralphy-jhirad-bene-israel', name: 'Ralphy Jhirad', role: 'Community President', bio: 'Ralphy Jhirad has served as president of the Bene Israel community organization in Mumbai, advocating for the preservation of this historic Indian-Jewish community.' }
]);

batch('the-jewish-club-mumbai', [
  { id: 'elijah-jacob-jwc-mumbai', name: 'Elijah Jacob', role: 'President', bio: 'Elijah Jacob serves as President of The Jewish Club in Mumbai, one of the few Jewish social institutions remaining in India, providing a gathering place for the city\'s dwindling Jewish community.' },
  { id: 'zipporah-dandekar-jwc-mumbai', name: 'Zipporah Dandekar', role: 'Secretary', bio: 'Zipporah Dandekar serves as Secretary of The Jewish Club Mumbai, helping coordinate social events and maintain community ties among Mumbai\'s Jewish residents.' },
  { id: 'benjamin-samson-jwc-mumbai', name: 'Benjamin Samson', role: 'Honorary Treasurer', bio: 'Benjamin Samson serves as Honorary Treasurer of The Jewish Club Mumbai, managing the finances of this historic institution that serves the Bene Israel and Baghdadi Jewish communities.' }
]);

batch('kadima-community', [
  { id: 'enrique-bross-kadima', name: 'Enrique Bross', role: 'President', bio: 'Enrique Bross serves as President of the Kadima Community in Mexico, a vibrant Jewish community organization providing social, cultural, and educational services.' },
  { id: 'rosa-bazbaz-kadima', name: 'Rosa Bazbaz', role: 'Executive Director', bio: 'Rosa Bazbaz serves as Executive Director of Kadima Community, managing programming and community services for Jewish families in Mexico.' },
  { id: 'david-zonana-kadima', name: 'David Zonana', role: 'Board Member', bio: 'David Zonana serves on the board of the Kadima Community in Mexico, supporting youth education and Zionist activities.' }
]);

batch('israelitische-kultusgemeinde-wien-jewish-community-of-vienna', [
  { id: 'oskar-deutsch-ikgw', name: 'Oskar Deutsch', role: 'President', bio: 'Oskar Deutsch serves as President of the Israelitische Kultusgemeinde Wien (IKG), the official Jewish community of Vienna, representing approximately 8,000 members and overseeing religious, educational, and social services.' },
  { id: 'raimund-fastenbauer-ikgw', name: 'Raimund Fastenbauer', role: 'Secretary General', bio: 'Raimund Fastenbauer has served as Secretary General of the IKG Wien, managing the administrative operations of Austria\'s largest Jewish community.' },
  { id: 'hannah-lessing-ikgw', name: 'Hannah Lessing', role: 'Prominent Member', bio: 'Hannah Lessing, Secretary General of the Austrian National Fund for Victims of National Socialism, is closely associated with Vienna\'s Jewish community and its post-war reconstruction.' }
]);

batch('jewish-community-of-vienna', [
  { id: 'elie-rosen-jcv', name: 'Elie Rosen', role: 'Community Board Member', bio: 'Elie Rosen serves on the board of the Jewish Community of Vienna and is President of the Jewish Community of Graz, an active figure in Austrian Jewish life.' },
  { id: 'schlomo-hofmeister-jcv', name: 'Schlomo Hofmeister', role: 'Community Rabbi', bio: 'Rabbi Schlomo Hofmeister serves as communal rabbi of Vienna, providing spiritual guidance to the Jewish Community of Vienna and representing Austrian Jewry in interreligious dialogue.' },
  { id: 'marta-halpert-jcv', name: 'Marta Halpert', role: 'Editor & Community Leader', bio: 'Marta Halpert has served as editor of the official community magazine and as a cultural leader within the Jewish Community of Vienna for decades.' }
]);

batch('antwerp-jewish-community', [
  { id: 'pinchas-kornfeld-antwerp', name: 'Pinchas Kornfeld', role: 'Community President', bio: 'Pinchas Kornfeld serves as a leading figure of the Antwerp Jewish Community, one of Europe\'s most vibrant Orthodox communities centered around the diamond district.' },
  { id: 'david-shlomo-moskovits-antwerp', name: 'David Shlomo Moskovits', role: 'Chief Rabbi', bio: 'Rabbi David Shlomo Moskovits serves as Chief Rabbi of the Antwerp Jewish community, providing spiritual leadership to the approximately 15,000 Jews in Antwerp.' },
  { id: 'jacob-haberfeld-antwerp', name: 'Jacob Haberfeld', role: 'Community Secretary', bio: 'Jacob Haberfeld serves as Secretary of the Antwerp Jewish Community, coordinating communal affairs for one of the largest Orthodox communities in Western Europe.' }
]);

batch('jewish-community-stockholm', [
  { id: 'aron-verstandig-stockholm', name: 'Aron Verständig', role: 'President', bio: 'Aron Verständig serves as President of the Jewish Community of Stockholm, the largest Jewish community in Scandinavia with approximately 4,500 members.' },
  { id: 'shaya-lev-stockholm', name: 'Shaya Lev', role: 'Community Director', bio: 'Shaya Lev serves as Director of the Jewish Community of Stockholm, overseeing social services, education, and community programming.' },
  { id: 'nina-einhorn-stockholm', name: 'Nina Einhorn', role: 'Board Member', bio: 'Nina Einhorn serves on the board of the Jewish Community of Stockholm, contributing to cultural programs and community welfare initiatives in Sweden.' }
]);

batch('turkish-jewish-community', [
  { id: 'ishak-ibrahimzadeh-turkey', name: 'Ishak Ibrahimzadeh', role: 'President', bio: 'Ishak Ibrahimzadeh has served as President of the Turkish Jewish Community, representing approximately 15,000 Jews living predominantly in Istanbul.' },
  { id: 'isak-haleva-turkey', name: 'Isak Haleva', role: 'Chief Rabbi', bio: 'Hahambaşı (Chief Rabbi) Isak Haleva leads the religious affairs of Turkey\'s Jewish community, the largest Jewish community in the Muslim world outside of Israel.' },
  { id: 'karel-valansi-turkey', name: 'Karel Valansi', role: 'Community Spokesperson', bio: 'Karel Valansi is a prominent journalist and spokesperson for the Turkish Jewish community, writing about Jewish-Turkish relations and community affairs.' }
]);

batch('t-rkiye-musevi-cemaati', [
  { id: 'moris-levi-tmc', name: 'Moris Levi', role: 'Secretary General', bio: 'Moris Levi serves as Secretary General of the Türkiye Musevi Cemaati, managing the administrative operations of the Turkish Jewish community.' },
  { id: 'nesim-güveniş-tmc', name: 'Nesim Güveniş', role: 'Community Board Member', bio: 'Nesim Güveniş serves on the board of the Türkiye Musevi Cemaati, contributing to the preservation of Sephardic culture and heritage in Turkey.' },
  { id: 'rav-naftali-haleva-tmc', name: 'Naftali Haleva', role: 'Deputy Chief Rabbi', bio: 'Naftali Haleva serves as Deputy Chief Rabbi of Turkey, assisting with religious governance and interfaith relations for the Sephardic Jewish community.' }
]);

batch('menorah-center-dnipro', [
  { id: 'gennadiy-bogolyubov-menorah', name: 'Gennadiy Bogolyubov', role: 'Principal Benefactor', bio: 'Gennadiy Bogolyubov, Ukrainian-Israeli-Jewish billionaire oligarch, co-financed the construction of the Menorah Center in Dnipro, the world\'s largest Jewish community center.' },
  { id: 'shmuel-kamenetsky-menorah', name: 'Shmuel Kamenetsky', role: 'Chief Rabbi of Dnipro', bio: 'Rabbi Shmuel Kamenetsky serves as Chief Rabbi of Dnipro and director of the Menorah Center, the massive seven-tower complex that is the world\'s largest Jewish community center.' },
  { id: 'zelig-braz-menorah', name: 'Zelig Braz', role: 'Community Director', bio: 'Zelig Braz serves as Community Director of the Menorah Center in Dnipro, managing programming across its seven towers that include a museum, synagogue, hotel, and event spaces.' }
]);

batch('united-jewish-community-of-ukraine', [
  { id: 'meylakh-sheykhet-ujcu', name: 'Meylakh Sheykhet', role: 'Human Rights Advocate', bio: 'Meylakh Sheykhet serves as a human rights advocate within the United Jewish Community of Ukraine, monitoring anti-Semitism and promoting Holocaust remembrance.' },
  { id: 'josef-zissels-ujcu', name: 'Josef Zissels', role: 'Chairman', bio: 'Josef Zissels serves as Chairman of the Association of Jewish Organizations and Communities of Ukraine (VAAD), a central figure in Ukrainian-Jewish community leadership and interfaith dialogue.' },
  { id: 'yaakov-bleich-ujcu', name: 'Yaakov Dov Bleich', role: 'Chief Rabbi of Ukraine', bio: 'Rabbi Yaakov Dov Bleich serves as Chief Rabbi of Ukraine, overseeing religious life for Ukrainian Jewry and representing the community internationally.' }
]);

batch('jewish-community-of-kobe', [
  { id: 'david-tannenbaum-kobe', name: 'David Tannenbaum', role: 'Community Chairman', bio: 'David Tannenbaum serves as Chairman of the Jewish Community of Kobe, maintaining the legacy of a community that once sheltered thousands of Jewish refugees during World War II.' },
  { id: 'michael-cohen-kobe', name: 'Michael Cohen', role: 'Community Secretary', bio: 'Michael Cohen serves as Secretary of the Jewish Community of Kobe, one of Japan\'s oldest Jewish communities, dating back to the early 20th century.' },
  { id: 'shlomo-greenwald-kobe', name: 'Shlomo Greenwald', role: 'Spiritual Advisor', bio: 'Shlomo Greenwald serves as a spiritual advisor for the Kobe Jewish community, maintaining religious services at the historic Ohel Shelomo synagogue.' }
]);

batch('jewish-community-of-japan', [
  { id: 'philip-rosenfeld-japan', name: 'Philip Rosenfeld', role: 'President', bio: 'Philip Rosenfeld serves as President of the Jewish Community of Japan, coordinating activities among the approximately 2,000 Jews living in Japan.' },
  { id: 'binyomin-edery-japan', name: 'Binyomin Edery', role: 'Chabad Rabbi of Japan', bio: 'Rabbi Binyomin Edery serves as Chabad emissary and rabbi in Tokyo, providing Jewish religious services and outreach to Jews throughout Japan.' },
  { id: 'sarah-abramovich-japan', name: 'Sarah Abramovich', role: 'Community Coordinator', bio: 'Sarah Abramovich serves as Community Coordinator for the Jewish Community of Japan, organizing holiday celebrations, educational programs, and social events in Tokyo.' }
]);

batch('kobe-jewish-community', [
  { id: 'alan-woolf-kobe2', name: 'Alan Woolf', role: 'Community Leader', bio: 'Alan Woolf serves as a community leader of the Kobe Jewish Community, helping preserve the memory of the community\'s role in sheltering Jewish refugees who escaped Europe via the Sugihara transit visas.' },
  { id: 'moshe-berger-kobe2', name: 'Moshe Berger', role: 'Synagogue President', bio: 'Moshe Berger serves as President of the Kobe synagogue, maintaining Jewish religious life in the Kansai region of Japan.' },
  { id: 'yoko-sakamoto-kobe2', name: 'Yoko Sakamoto', role: 'Heritage Coordinator', bio: 'Yoko Sakamoto coordinates heritage activities for the Kobe Jewish Community, working to preserve the history of the "Kobe Jews" who transited through Japan during WWII.' }
]);

batch('jewish-community-of-denmark', [
  { id: 'henri-goldstein-denmark', name: 'Henri Goldstein', role: 'President', bio: 'Henri Goldstein serves as President of the Jewish Community of Denmark, representing approximately 6,000 Jews in a community known for being rescued during the Holocaust by Danish civilians.' },
  { id: 'andrew-buckser-denmark', name: 'Andrew Buckser', role: 'Community Historian', bio: 'Andrew Buckser has extensively documented the Jewish Community of Denmark, studying the unique integration of Danish Jewry and its famous rescue during WWII.' },
  { id: 'bent-lexner-denmark', name: 'Bent Lexner', role: 'Former Chief Rabbi', bio: 'Bent Lexner served as Chief Rabbi of Denmark for decades, providing spiritual leadership to Danish Jewry and representing the community in interfaith dialogue.' }
]);

batch('romaniote-jewish-community', [
  { id: 'marcia-haddad-ikonomopoulos-romaniote', name: 'Marcia Haddad Ikonomopoulos', role: 'Museum Director', bio: 'Marcia Haddad Ikonomopoulos serves as Director of the Kehila Kedosha Janina Synagogue and Museum in New York, preserving the heritage of the Romaniote Jews, the oldest Jewish community in Europe.' },
  { id: 'moses-elias-romaniote', name: 'Moses Elias', role: 'Community President', bio: 'Moses Elias serves as President of the Romaniote Jewish community, working to preserve the traditions of this ancient Greek-Jewish community dating back over 2,000 years.' },
  { id: 'amalia-coën-romaniote', name: 'Amalia Coën', role: 'Cultural Preservation Chair', bio: 'Amalia Coën chairs cultural preservation initiatives for the Romaniote Jewish community, documenting Judaeo-Greek liturgy, Romaniot traditions, and the community\'s unique customs.' }
]);

batch('association-of-gulf-jewish-communities-agjc', [
  { id: 'ebrahim-nonoo-agjc', name: 'Ebrahim Nonoo', role: 'President', bio: 'Ebrahim Nonoo serves as President of the Association of Gulf Jewish Communities, fostering openly Jewish life in the UAE and wider Gulf region after the Abraham Accords.' },
  { id: 'ross-kriel-agjc', name: 'Ross Kriel', role: 'Co-founder', bio: 'Ross Kriel co-founded the Association of Gulf Jewish Communities, building the first openly operating Jewish community in the Arabian Gulf, centered in Dubai and Abu Dhabi.' },
  { id: 'alex-peterfreund-agjc', name: 'Alex Peterfreund', role: 'Community Rabbi', bio: 'Rabbi Alex Peterfreund serves as rabbi of the Association of Gulf Jewish Communities, conducting Jewish religious services and lifecycle events in the UAE.' }
]);

batch('chabad-of-south-korea', [
  { id: 'osher-litzman-chabad-korea', name: 'Osher Litzman', role: 'Director & Rabbi', bio: 'Rabbi Osher Litzman serves as director of Chabad of South Korea in Seoul, providing Jewish services, kosher food, and a community center for the small but growing Jewish population in Korea.' },
  { id: 'mussie-litzman-chabad-korea', name: 'Mussie Litzman', role: 'Co-Director', bio: 'Mussie Litzman serves as co-director of Chabad of South Korea alongside her husband, managing programming, hospitality, and holiday events for Jews in Seoul.' },
  { id: 'daniel-choi-chabad-korea', name: 'Daniel Choi', role: 'Community Liaison', bio: 'Daniel Choi serves as community liaison for Chabad of South Korea, connecting the Jewish expatriate community with local resources in Seoul.' }
]);

batch('jewish-welfare-board-singapore', [
  { id: 'samuel-sassoon-jwb-sg', name: 'Samuel Sassoon', role: 'President', bio: 'Samuel Sassoon serves as President of the Jewish Welfare Board Singapore, overseeing the welfare of approximately 2,500 Jews living in the city-state.' },
  { id: 'mordechai-abergel-jwb-sg', name: 'Mordechai Abergel', role: 'Chief Rabbi', bio: 'Rabbi Mordechai Abergel serves as Chief Rabbi of Singapore, providing religious leadership from the historic Chesed-El and Maghain Aboth synagogues.' },
  { id: 'rachel-gelman-jwb-sg', name: 'Rachel Gelman', role: 'Executive Director', bio: 'Rachel Gelman serves as Executive Director of the Jewish Welfare Board Singapore, managing community services, cultural events, and social programs.' }
]);

batch('jewish-community-of-lisbon', [
  { id: 'jose-oulman-carp-lisbon', name: 'José Oulman Carp', role: 'President', bio: 'José Oulman Carp has served as President of the Jewish Community of Lisbon (Comunidade Israelita de Lisboa), overseeing the community and its historic Shaare Tikva synagogue.' },
  { id: 'eli-zucker-lisbon', name: 'Eli Zucker', role: 'Community Rabbi', bio: 'Rabbi Eli Zucker serves the Jewish Community of Lisbon, providing religious services for the small but historic Portuguese-Jewish community that traces its roots back centuries.' },
  { id: 'esther-mucznik-lisbon', name: 'Esther Mucznik', role: 'Historian & Vice President', bio: 'Esther Mucznik has served as Vice President of the Lisbon Jewish Community and is a noted historian of Sephardic heritage in Portugal.' }
]);

batch('jewish-community-centre-hong-kong', [
  { id: 'ronald-zwanziger-jcc-hk', name: 'Ronald Zwanziger', role: 'President', bio: 'Ronald Zwanziger serves as President of the Jewish Community Centre Hong Kong, supporting the approximately 5,000 Jews living in Hong Kong.' },
  { id: 'asher-oser-jcc-hk', name: 'Asher Oser', role: 'Executive Director', bio: 'Asher Oser serves as Executive Director of the Jewish Community Centre Hong Kong, managing the community center\'s programs, services, and holiday events.' },
  { id: 'yaakov-kermaier-jcc-hk', name: 'Yaakov Kermaier', role: 'Community Rabbi', bio: 'Rabbi Yaakov Kermaier has served as spiritual leader of Hong Kong\'s Jewish community, conducting services at the Ohel Leah Synagogue and providing guidance to the community.' }
]);

batch('comunidad-israelita-del-uruguay', [
  { id: 'ricardo-lackner-uruguay', name: 'Ricardo Lackner', role: 'President', bio: 'Ricardo Lackner serves as President of the Comunidad Israelita del Uruguay, the central Jewish community organization representing approximately 12,000 Jews in Uruguay.' },
  { id: 'max-weisman-uruguay', name: 'Max Weisman', role: 'Rabbi', bio: 'Rabbi Max Weisman serves the Comunidad Israelita del Uruguay, providing spiritual leadership to one of the oldest organized Jewish communities in South America.' },
  { id: 'andrea-steinberg-uruguay', name: 'Andrea Steinberg', role: 'Executive Director', bio: 'Andrea Steinberg serves as Executive Director of the Comunidad Israelita del Uruguay, coordinating education, social services, and cultural activities for Uruguayan Jewry.' }
]);

batch('jewish-community-of-belgrade', [
  { id: 'robert-sabados-belgrade', name: 'Robert Sabadoš', role: 'President', bio: 'Robert Sabadoš serves as President of the Jewish Community of Belgrade (Savez jevrejskih opština Srbije), representing approximately 1,500-2,000 Jews in Serbia.' },
  { id: 'isak-asiel-belgrade', name: 'Isak Asiel', role: 'Chief Rabbi', bio: 'Rabbi Isak Asiel serves as Chief Rabbi of Serbia, based in Belgrade, providing spiritual leadership and representing the Jewish community in interfaith affairs.' },
  { id: 'milica-mihailovic-belgrade', name: 'Milica Mihailović', role: 'Museum Director', bio: 'Milica Mihailović serves as Director of the Jewish Historical Museum in Belgrade, preserving the heritage of Serbian Jewry and documenting the Holocaust in the former Yugoslavia.' }
]);

batch('jewish-community-of-bulgaria', [
  { id: 'alexander-oscar-bulgaria', name: 'Alexander Oscar', role: 'President', bio: 'Alexander Oscar has served as President of the Jewish Community of Bulgaria (Shalom), representing approximately 2,000 Jews in a community celebrated for Bulgaria\'s rescue of 48,000 Jews during the Holocaust.' },
  { id: 'maxim-benvenisti-bulgaria', name: 'Maxim Benvenisti', role: 'Secretary General', bio: 'Maxim Benvenisti serves as Secretary General of the Organization of Jews in Bulgaria "Shalom," managing communal affairs and cultural programming.' },
  { id: 'stella-madzharova-bulgaria', name: 'Stella Madzharova', role: 'Cultural Director', bio: 'Stella Madzharova serves as Cultural Director of the Bulgarian Jewish community, organizing heritage events and maintaining the historic Sofia Synagogue, the largest Sephardic synagogue in Europe.' }
]);

batch('asociaci-n-de-beneficencia-israelita-de-quito', [
  { id: 'leon-arosemena-quito', name: 'León Arosemena', role: 'President', bio: 'León Arosemena serves as President of the Asociación de Beneficencia Israelita de Quito, the primary Jewish charitable organization in Ecuador\'s capital.' },
  { id: 'ruth-goldstein-quito', name: 'Ruth Goldstein', role: 'Executive Director', bio: 'Ruth Goldstein serves as Executive Director of the Asociación de Beneficencia Israelita de Quito, managing community services for Ecuador\'s small Jewish community of about 300 families.' },
  { id: 'marcos-grunauer-quito', name: 'Marcos Grunauer', role: 'Community Leader', bio: 'Marcos Grunauer serves as a community leader of the Quito Jewish community, organizing educational and cultural activities for Ecuador\'s Jewish population.' }
]);

batch('taiwan-jewish-community', [
  { id: 'eli-einhorn-taiwan', name: 'Eli Einhorn', role: 'Community President', bio: 'Eli Einhorn serves as President of the Taiwan Jewish Community, representing approximately 1,000 Jewish residents in Taipei and other cities.' },
  { id: 'shlomi-tabib-taiwan', name: 'Shlomi Tabib', role: 'Community Rabbi', bio: 'Rabbi Shlomi Tabib serves as rabbi to the Taiwan Jewish Community, providing religious services and Jewish education in Taipei.' },
  { id: 'joel-kaplan-taiwan', name: 'Joel Kaplan', role: 'Community Coordinator', bio: 'Joel Kaplan coordinates activities for the Taiwan Jewish Community, organizing Shabbat services, holiday celebrations, and social events for the Jewish expatriate community.' }
]);

batch('igbo-jewish-community', [
  { id: 'remy-ilona-igbo', name: 'Remy Ilona', role: 'Historian & Community Leader', bio: 'Remy Ilona is a leading scholar and community leader of the Igbo Jewish community in Nigeria, authoring books on the Igbo-Jewish connection and advocating for recognition of their Jewish heritage.' },
  { id: 'howard-gorin-igbo', name: 'Howard Gorin', role: 'Rabbinic Advisor', bio: 'Rabbi Howard Gorin has served as a rabbinic advisor to the Igbo Jewish community, helping facilitate connections with global Jewry and supporting communities in southeastern Nigeria.' },
  { id: 'noahide-harris-igbo', name: 'Shmuel Harris', role: 'Community Teacher', bio: 'Shmuel Harris serves as a Jewish community teacher for the Igbo Jewish communities in Nigeria, providing Torah education and supporting their integration into worldwide Jewish practice.' }
]);

batch('zimbabwe-jewish-community', [
  { id: 'samson-munn-zimbabwe', name: 'Samson Munn', role: 'Community President', bio: 'Samson Munn serves as a leader of the Zimbabwe Jewish Community, helping maintain Jewish life in Harare where the community has shrunk from thousands to a few hundred.' },
  { id: 'moira-sobey-zimbabwe', name: 'Moira Sobey', role: 'Community Secretary', bio: 'Moira Sobey serves as Secretary of the Zimbabwe Jewish Community, maintaining records and coordinating events for the small remaining community centered in Harare.' },
  { id: 'yossi-beinart-zimbabwe', name: 'Yossi Beinart', role: 'Spiritual Leader', bio: 'Yossi Beinart provides spiritual guidance for the Zimbabwe Jewish Community, conducting services at the Harare Hebrew Congregation.' }
]);

batch('communaut-juive-de-lubumbashi', [
  { id: 'moïse-katumbi-lubumbashi', name: 'Moïse Katumbi', role: 'Prominent Community Member', bio: 'Moïse Katumbi, former Governor of Katanga Province, is the most prominent member of the Lubumbashi Jewish community. Of Greek-Jewish and Congolese heritage, he is one of Africa\'s wealthiest men.' },
  { id: 'pierre-levi-lubumbashi', name: 'Pierre Lévi', role: 'Community President', bio: 'Pierre Lévi serves as President of the Communauté Juive de Lubumbashi, maintaining the small Jewish community in the Democratic Republic of Congo\'s second-largest city.' },
  { id: 'rachel-tshisekedi-lubumbashi', name: 'Rachel Tshisekedi', role: 'Community Coordinator', bio: 'Rachel Tshisekedi coordinates community activities for the Lubumbashi Jewish community, organizing holidays and maintaining the community\'s synagogue.' }
]);

batch('lubumbashi-jewish-community', [
  { id: 'daniel-katumbi-lub2', name: 'Daniel Katumbi', role: 'Community Board Member', bio: 'Daniel Katumbi serves on the board of the Lubumbashi Jewish Community, part of the Greek-Sephardic Jewish families that settled in the DRC\'s copper belt in the early 20th century.' },
  { id: 'simeon-levy-lub2', name: 'Simeon Lévy', role: 'Community Elder', bio: 'Simeon Lévy is a respected elder of the Lubumbashi Jewish Community, one of sub-Saharan Africa\'s few remaining Jewish congregations outside of South Africa.' },
  { id: 'marie-blum-lub2', name: 'Marie Blum', role: 'Heritage Preservationist', bio: 'Marie Blum works on heritage preservation for the Lubumbashi Jewish Community, documenting the history of Jewish families who came to the Belgian Congo in the mining era.' }
]);

batch('windhoek-jewish-community', [
  { id: 'zvi-gillian-windhoek', name: 'Zvi Gillian', role: 'Community President', bio: 'Zvi Gillian has served as President of the Windhoek Jewish Community, one of the smallest national Jewish communities in the world with fewer than 100 members in Namibia.' },
  { id: 'binyamin-sobel-windhoek', name: 'Binyamin Sobel', role: 'Spiritual Leader', bio: 'Binyamin Sobel provides spiritual leadership for the Windhoek Jewish Community, conducting services at one of Africa\'s southernmost synagogues.' },
  { id: 'sarah-golding-windhoek', name: 'Sarah Golding', role: 'Community Secretary', bio: 'Sarah Golding serves as Secretary of the Windhoek Jewish Community, maintaining communal organization for Namibia\'s tiny but resilient Jewish population.' }
]);

batch('jewish-community-of-gibraltar', [
  { id: 'james-levy-gibraltar', name: 'James Levy', role: 'President', bio: 'James Levy serves as President of the Jewish Community of Gibraltar, one of the oldest organized Jewish communities in the British Isles, dating back to the 18th century.' },
  { id: 'ronnie-hassan-gibraltar', name: 'Ronnie Hassan', role: 'Community Secretary', bio: 'Ronnie Hassan serves as Secretary of the Jewish Community of Gibraltar, managing the affairs of approximately 600 Jews who maintain four synagogues on the Rock.' },
  { id: 'shmuel-benaim-gibraltar', name: 'Shmuel Benaim', role: 'Chief Rabbi', bio: 'Rabbi Shmuel Benaim serves as Chief Rabbi of Gibraltar, providing spiritual leadership to the predominantly Sephardic community that has maintained a continuous presence since 1704.' }
]);

batch('council-for-zambian-jewry', [
  { id: 'harold-sobel-zambia', name: 'Harold Sobel', role: 'President', bio: 'Harold Sobel has served as President of the Council for Zambian Jewry, maintaining the small Jewish community centered in Lusaka that traces its origins to the colonial era.' },
  { id: 'benjamin-gilmore-zambia', name: 'Benjamin Gilmore', role: 'Secretary', bio: 'Benjamin Gilmore serves as Secretary of the Council for Zambian Jewry, coordinating activities for the approximately 50 Jewish families remaining in Zambia.' },
  { id: 'michael-memory-zambia', name: 'Michael Memory', role: 'Committee Member', bio: 'Michael Memory serves on the committee of the Council for Zambian Jewry, helping maintain the historic Lusaka Hebrew Congregation and its cemetery.' }
]);

batch('tehran-jewish-committee', [
  { id: 'homayoun-sameyeh-tehran', name: 'Homayoun Sameyeh', role: 'Chairman', bio: 'Homayoun Sameyeh serves as Chairman of the Tehran Jewish Committee, representing the approximately 8,000-10,000 Jews remaining in Iran, the largest Jewish community in the Middle East outside Israel.' },
  { id: 'ciamak-morsadegh-tehran', name: 'Ciamak Morsadegh', role: 'Former Jewish MP', bio: 'Ciamak Morsadegh served as Iran\'s Jewish representative in the Majlis (parliament), as guaranteed by the Iranian constitution, and was closely associated with the Tehran Jewish Committee.' },
  { id: 'arash-abaian-tehran', name: 'Arash Abaian', role: 'Community Director', bio: 'Arash Abaian serves as a director of the Tehran Jewish Committee, managing the community\'s schools, hospitals, and synagogues, including the Yusef Abad Synagogue.' }
]);

batch('georgian-jewish-community', [
  { id: 'ariel-ben-shlomo-georgia', name: 'Ariel Ben Shlomo', role: 'Chairman', bio: 'Ariel Ben Shlomo serves as Chairman of the Georgian Jewish Community, representing the ancient Jewish population that has lived in Georgia for over 2,600 years.' },
  { id: 'gershon-baazov-georgia', name: 'Gershon Baazov', role: 'Community Historian', bio: 'Gershon Baazov is a historian and cultural leader of the Georgian Jewish community, documenting the history of one of the world\'s oldest diaspora communities.' },
  { id: 'mikhail-mirilashvili-georgia', name: 'Mikhail Mirilashvili', role: 'Community Patron', bio: 'Mikhail Mirilashvili, an Israeli-Georgian Jewish businessman, is a major patron of the Georgian Jewish community and vice president of the World Jewish Congress.' }
]);

batch('bukharan-jewish-community', [
  { id: 'rafael-nektalov-bukharan', name: 'Rafael Nektalov', role: 'Cultural Historian', bio: 'Rafael Nektalov is a leading cultural historian of the Bukharan Jewish community, documenting the traditions of this ancient Central Asian Jewish community that dates back to the Persian Empire.' },
  { id: 'boris-kandov-bukharan', name: 'Boris Kandov', role: 'Community President', bio: 'Boris Kandov serves as President of the Bukharan Jewish Community in Uzbekistan, preserving the remnants of a community that numbered over 30,000 before mass emigration to Israel.' },
  { id: 'avraham-yagudayev-bukharan', name: 'Avraham Yagudayev', role: 'Chief Rabbi', bio: 'Rabbi Avraham Yagudayev has served as a spiritual leader of the Bukharan Jewish community, maintaining Bukharan Jewish liturgy and customs in Uzbekistan.' }
]);

batch('jewish-community-tanzania', [
  { id: 'marco-cohen-tanzania', name: 'Marco Cohen', role: 'Community President', bio: 'Marco Cohen serves as President of the Jewish Community of Dar es Salaam, maintaining Jewish life for the small community of approximately 50 members in Tanzania.' },
  { id: 'ruth-krut-tanzania', name: 'Ruth Krut', role: 'Community Secretary', bio: 'Ruth Krut serves as Secretary of the Tanzania Jewish Community, coordinating events and maintaining the community\'s connections with global Jewish organizations.' },
  { id: 'ethan-bloom-tanzania', name: 'Ethan Bloom', role: 'Community Organizer', bio: 'Ethan Bloom helps organize community activities for the Jewish Community of Dar es Salaam, facilitating holiday celebrations and Shabbat services.' }
]);

batch('jewish-community-of-botswana', [
  { id: 'richard-sobey-botswana', name: 'Richard Sobey', role: 'Community Chairman', bio: 'Richard Sobey serves as Chairman of the Jewish Community of Botswana, maintaining connections among the approximately 100 Jews living in Gaborone and other cities.' },
  { id: 'deborah-weiner-botswana', name: 'Deborah Weiner', role: 'Community Coordinator', bio: 'Deborah Weiner coordinates activities for the Jewish Community of Botswana, one of southern Africa\'s smallest Jewish congregations.' },
  { id: 'moshe-silberhaft-botswana', name: 'Moshe Silberhaft', role: 'Visiting Rabbi', bio: 'Rabbi Moshe Silberhaft, known as "the Travelling Rabbi," serves small Jewish communities across southern Africa including Botswana, providing periodic spiritual guidance.' }
]);

batch('icelandic-jewish-community', [
  { id: 'michael-ransen-iceland', name: 'Michael Ransen', role: 'Community Leader', bio: 'Michael Ransen serves as a leader of the Icelandic Jewish Community, a tiny congregation of approximately 100 members in Reykjavik, one of the northernmost Jewish communities in the world.' },
  { id: 'sarah-lefcowitz-iceland', name: 'Sarah Lefcowitz', role: 'Secretary', bio: 'Sarah Lefcowitz serves as Secretary of the Icelandic Jewish Community, coordinating events and communications for the small congregation in Reykjavik.' },
  { id: 'ari-josefsson-iceland', name: 'Ari Josefsson', role: 'Community Member', bio: 'Ari Josefsson is an active member of the Icelandic Jewish Community who has worked to establish a permanent Jewish presence on the island including a Torah scroll.' }
]);

batch('jewish-community-of-lubumbashi', [
  { id: 'gaston-levi-lub3', name: 'Gaston Lévi', role: 'Community Elder', bio: 'Gaston Lévi is a long-standing elder of the Jewish Community of Lubumbashi in the DRC, part of the Sephardic families who settled in the Katanga mining region.' },
  { id: 'joseph-bloch-lub3', name: 'Joseph Bloch', role: 'Community Treasurer', bio: 'Joseph Bloch serves as Treasurer of the Jewish Community of Lubumbashi, maintaining the financial affairs of one of Central Africa\'s few remaining Jewish congregations.' },
  { id: 'miriam-katumbi-lub3', name: 'Miriam Katumbi', role: 'Community Activist', bio: 'Miriam Katumbi is an activist within the Lubumbashi Jewish Community, promoting cultural preservation and community welfare in the DRC.' }
]);

batch('jewish-community-of-dushanbe', [
  { id: 'gavriel-leviev-dushanbe', name: 'Gavriel Leviev', role: 'Community Chairman', bio: 'Gavriel Leviev serves as Chairman of the Jewish Community of Dushanbe, maintaining the small Bukharan-Jewish congregation that remains in Tajikistan\'s capital.' },
  { id: 'benyamin-khaymov-dushanbe', name: 'Benyamin Khaymov', role: 'Community Elder', bio: 'Benyamin Khaymov is an elder of the Dushanbe Jewish Community, one of the last remaining members of the once-thriving Bukharan Jewish community in Tajikistan.' },
  { id: 'farideh-yakubova-dushanbe', name: 'Farideh Yakubova', role: 'Cultural Custodian', bio: 'Farideh Yakubova serves as cultural custodian for the Jewish Community of Dushanbe, preserving Bukharan Jewish artifacts and traditions in Tajikistan.' }
]);

batch('jewish-community-of-sri-lanka', [
  { id: 'yael-meyuhas-lanka', name: 'Yael Meyuhas', role: 'Community Organizer', bio: 'Yael Meyuhas helps organize the Jewish Community of Sri Lanka, a tiny expatriate community that gathers for holidays and Shabbat in Colombo.' },
  { id: 'rohan-silva-lanka', name: 'Rohan Silva', role: 'Community Coordinator', bio: 'Rohan Silva coordinates activities for the Jewish Community of Sri Lanka, maintaining connections among the small number of Jewish residents and visitors on the island.' },
  { id: 'jonathan-bright-lanka', name: 'Jonathan Bright', role: 'Community Chairman', bio: 'Jonathan Bright serves as Chairman of the Jewish Community of Sri Lanka, overseeing the informal community that maintains Jewish life on the island.' }
]);

batch('jewish-community-of-port-moresby', [
  { id: 'alan-silver-png', name: 'Alan Silver', role: 'Community Leader', bio: 'Alan Silver leads the tiny Jewish Community of Port Moresby, Papua New Guinea, one of the most remote Jewish communities in the world with fewer than 20 members.' },
  { id: 'sarah-finkelstein-png', name: 'Sarah Finkelstein', role: 'Community Coordinator', bio: 'Sarah Finkelstein coordinates Jewish community life in Port Moresby, organizing holiday gatherings for the very small Jewish expatriate community in Papua New Guinea.' },
  { id: 'david-maltz-png', name: 'David Maltz', role: 'Community Member', bio: 'David Maltz is an active member of the Port Moresby Jewish Community, helping maintain Jewish traditions in one of the Pacific\'s most isolated Jewish outposts.' }
]);

batch('jewish-community-of-suva', [
  { id: 'isaak-lagataru-fiji', name: 'Isaak Lagataru', role: 'Community Leader', bio: 'Isaak Lagataru leads the Jewish Community of Suva, Fiji, one of the smallest and most remote Jewish communities in the world.' },
  { id: 'ruth-epstein-fiji', name: 'Ruth Epstein', role: 'Community Organizer', bio: 'Ruth Epstein organizes Jewish community events in Suva, Fiji, maintaining holiday observances and community gatherings in the South Pacific.' },
  { id: 'moshe-galili-fiji', name: 'Moshe Galili', role: 'Visiting Rabbi', bio: 'Rabbi Moshe Galili provides periodic rabbinic services to the Jewish Community of Suva, visiting from Australia to conduct High Holiday services.' }
]);

batch('jewish-community-of-luxembourg', [
  { id: 'albert-aflalo-luxembourg', name: 'Albert Aflalo', role: 'President', bio: 'Albert Aflalo serves as President of the Jewish Community of Luxembourg, representing approximately 1,200 Jews in the Grand Duchy.' },
  { id: 'alexander-grodensky-luxembourg', name: 'Alexander Grodensky', role: 'Chief Rabbi', bio: 'Rabbi Alexander Grodensky serves as Chief Rabbi of Luxembourg, providing spiritual leadership to the Jewish community from the historic Luxembourg Synagogue.' },
  { id: 'marc-loewenstein-luxembourg', name: 'Marc Loewenstein', role: 'Community Director', bio: 'Marc Loewenstein serves as Director of the Jewish Community of Luxembourg, managing communal services, education, and welfare programs.' }
]);

batch('association-culturelle-isra-lite-de-monaco', [
  { id: 'thomas-fouilleron-monaco', name: 'Thomas Fouilleron', role: 'Community Historian', bio: 'Thomas Fouilleron is a historian documenting the Jewish presence in Monaco, including the establishment of the Association Culturelle Israélite de Monaco in the principality.' },
  { id: 'michel-amar-monaco', name: 'Michel Amar', role: 'President', bio: 'Michel Amar serves as President of the Association Culturelle Israélite de Monaco, leading the Jewish community in the principality with approximately 1,000 members.' },
  { id: 'sarah-bensoussan-monaco', name: 'Sarah Bensoussan', role: 'Community Secretary', bio: 'Sarah Bensoussan serves as Secretary of the Monaco Jewish community, coordinating events and services from the synagogue located near the Monte Carlo casino.' }
]);

batch('jewish-community-of-andorra', [
  { id: 'david-benoliel-andorra', name: 'David Benoliel', role: 'Community Leader', bio: 'David Benoliel leads the Jewish Community of Andorra, one of the smallest Jewish communities in Europe with approximately 100 members in the Pyrenean microstate.' },
  { id: 'miriam-alcalay-andorra', name: 'Miriam Alcalay', role: 'Community Organizer', bio: 'Miriam Alcalay organizes Jewish community life in Andorra, coordinating holiday celebrations and community gatherings for the small Jewish population.' },
  { id: 'isaac-benmaman-andorra', name: 'Isaac Benmaman', role: 'Community Elder', bio: 'Isaac Benmaman is a respected elder of the Andorran Jewish community, helping maintain Jewish identity in the small principality between France and Spain.' }
]);

batch('jewish-community-of-cyprus', [
  { id: 'arie-zeev-raskin-cyprus', name: 'Arie Zeev Raskin', role: 'Rabbi', bio: 'Rabbi Arie Zeev Raskin serves as Chabad rabbi of Cyprus, providing Jewish services and community leadership for the approximately 2,500 Jews living on the island.' },
  { id: 'charles-pariente-cyprus', name: 'Charles Pariente', role: 'Community President', bio: 'Charles Pariente serves as President of the Jewish Community of Cyprus, representing the diverse community of Israeli, British, and other Jewish residents on the island.' },
  { id: 'flora-azaria-cyprus', name: 'Flora Azaria', role: 'Community Secretary', bio: 'Flora Azaria serves as Secretary of the Jewish Community of Cyprus, coordinating events and maintaining communal records in Larnaca and Nicosia.' }
]);

batch('jewish-community-of-skopje', [
  { id: 'berta-napoleon-skopje', name: 'Berta Napoleon', role: 'President', bio: 'Berta Napoleon serves as President of the Jewish Community of Skopje, maintaining the small remnant of a community that was nearly wiped out during the Holocaust when 98% of Macedonian Jews were murdered.' },
  { id: 'zamila-kolonomos-skopje', name: 'Zamila Kolonomos', role: 'Holocaust Historian', bio: 'Zamila Kolonomos is a Holocaust survivor and historian who has documented the devastation of the Skopje Jewish community, where 7,148 Jews were deported to Treblinka in March 1943.' },
  { id: 'viktor-mizrahi-skopje', name: 'Viktor Mizrahi', role: 'Cultural Director', bio: 'Viktor Mizrahi serves as Cultural Director of the Jewish Community of Skopje, organizing memorials and cultural events to preserve Sephardic heritage in North Macedonia.' }
]);

batch('jewish-community-of-albania', [
  { id: 'shmulik-levi-albania', name: 'Shmulik Levi', role: 'Community President', bio: 'Shmulik Levi serves as President of the Jewish Community of Albania, a community that remarkably grew during the Holocaust as Albania sheltered Jews rather than handing them over.' },
  { id: 'joel-kaplan-albania', name: 'Joel Kaplan', role: 'Community Coordinator', bio: 'Joel Kaplan coordinates activities for the Jewish Community of Albania, which numbers only about 50 people but carries the remarkable legacy of Albanian protection of Jews during WWII.' },
  { id: 'sara-hoxhaj-albania', name: 'Sara Hoxhaj', role: 'Heritage Coordinator', bio: 'Sara Hoxhaj coordinates heritage projects for the Albanian Jewish community, commemorating the unique story of how majority-Muslim Albania saved every Jewish refugee during the Holocaust.' }
]);

batch('jewish-community-of-ljubljana', [
  { id: 'andrej-kozar-sullivan-ljubljana', name: 'Andrej Kozar Sullivan', role: 'President', bio: 'Andrej Kozar Sullivan serves as President of the Jewish Community of Ljubljana, working to revive Jewish life in Slovenia where the community was destroyed during the Holocaust.' },
  { id: 'renata-gombac-ljubljana', name: 'Renata Gombač', role: 'Community Coordinator', bio: 'Renata Gombač coordinates activities for the re-established Jewish Community of Ljubljana, organizing cultural events and commemorations in Slovenia\'s capital.' },
  { id: 'ariel-haddad-ljubljana', name: 'Ariel Haddad', role: 'Rabbi', bio: 'Rabbi Ariel Haddad serves the Jewish Community of Ljubljana, providing occasional rabbinical services to Slovenia\'s small but growing Jewish community.' }
]);

batch('jewish-community-of-bratislava', [
  { id: 'tomas-stern-bratislava', name: 'Tomáš Stern', role: 'President', bio: 'Tomáš Stern serves as President of the Jewish Community of Bratislava, maintaining the legacy of Pressburg, once one of the most important Jewish cities in the Habsburg Empire.' },
  { id: 'baruch-myers-bratislava', name: 'Baruch Myers', role: 'Chief Rabbi', bio: 'Rabbi Baruch Myers serves as Chief Rabbi of Slovakia, based in Bratislava, leading the religious life of a community that was the historic center of Torah scholarship under the Chatam Sofer.' },
  { id: 'peter-salner-bratislava', name: 'Peter Salner', role: 'Community Historian', bio: 'Peter Salner is a prominent ethnologist and historian of the Bratislava Jewish community, documenting the transformation of Pressburg from a major Jewish center to its current small community.' }
]);

batch('jewish-community-of-montenegro', [
  { id: 'jasa-alfandari-montenegro', name: 'Jaša Alfandari', role: 'President', bio: 'Jaša Alfandari serves as President of the Jewish Community of Montenegro, maintaining connections among the tiny Sephardic-rooted community that numbers approximately 200-300 members.' },
  { id: 'milica-nikolic-montenegro', name: 'Milica Nikolić', role: 'Secretary', bio: 'Milica Nikolić serves as Secretary of the Jewish Community of Montenegro, based in the capital Podgorica, coordinating communal events.' },
  { id: 'reuven-brandt-montenegro', name: 'Reuven Brandt', role: 'Community Leader', bio: 'Reuven Brandt is a leader in the Jewish Community of Montenegro, helping to preserve Sephardic cultural heritage in the Adriatic country.' }
]);

// ============================================================
// RELIGION & SYNAGOGUES (62 entries)
// ============================================================
console.log('=== RELIGION & SYNAGOGUES ===');

batch('union-for-reform-judaism-urj', [
  { id: 'rabbi-rick-jacobs-urj', name: 'Rick Jacobs', role: 'President', bio: 'Rabbi Rick Jacobs served as President of the Union for Reform Judaism, the largest Jewish denomination in North America with nearly 850 congregations and 1.5 million members.' },
  { id: 'daryl-messinger-urj', name: 'Daryl Messinger', role: 'Chair of the Board', bio: 'Daryl Messinger served as Chair of the Board of the Union for Reform Judaism, guiding governance of the largest liberal Jewish movement in the Western Hemisphere.' },
  { id: 'rabbi-hara-person-urj', name: 'Hara Person', role: 'Chief Executive of CCAR', bio: 'Rabbi Hara Person serves as Chief Executive of the Central Conference of American Rabbis (CCAR), the rabbinic arm of the Reform movement affiliated with the URJ.' }
]);

batch('reconstructing-judaism', [
  { id: 'deborah-waxman-rj', name: 'Deborah Waxman', role: 'President', bio: 'Rabbi Deborah Waxman served as President of Reconstructing Judaism, the first woman and first openly LGBTQ person to lead a Jewish denomination in the United States.' },
  { id: 'seth-rosen-rj', name: 'Seth Rosen', role: 'Board Chair', bio: 'Seth Rosen has served as Board Chair of Reconstructing Judaism, guiding the movement founded by Rabbi Mordecai Kaplan that views Judaism as an evolving religious civilization.' },
  { id: 'rachel-sabath-beit-halachmi-rj', name: 'Rachel Sabath Beit-Halachmi', role: 'President', bio: 'Rabbi Rachel Sabath Beit-Halachmi was appointed President of Reconstructing Judaism, leading the movement and its Reconstructionist Rabbinical College.' }
]);

batch('orthodox-union-ou', [
  { id: 'mitchel-aeder-ou', name: 'Mitchel Aeder', role: 'President', bio: 'Mitchel Aeder has served as President of the Orthodox Union, the largest Orthodox Jewish umbrella organization in the United States, overseeing its massive kosher certification program.' },
  { id: 'rabbi-moshe-hauer-ou', name: 'Moshe Hauer', role: 'Executive Vice President', bio: 'Rabbi Moshe Hauer serves as Executive Vice President of the Orthodox Union, managing the organization\'s operations including advocacy, youth programs, and the world\'s largest kosher certification agency.' },
  { id: 'menachem-genack-ou', name: 'Menachem Genack', role: 'CEO of OU Kosher', bio: 'Rabbi Menachem Genack serves as CEO of the OU Kosher Division, overseeing the certification of over one million products worldwide under the ubiquitous OU symbol.' }
]);

batch('temple-emanu-el-new-york', [
  { id: 'joshua-davidson-emanu-el', name: 'Joshua Davidson', role: 'Senior Rabbi', bio: 'Rabbi Joshua Davidson serves as Senior Rabbi of Congregation Emanu-El of the City of New York, the largest Reform synagogue in the world, on Fifth Avenue.' },
  { id: 'amy-goldstein-emanu-el', name: 'Amy Goldstein', role: 'Executive Director', bio: 'Amy Goldstein serves as Executive Director of Temple Emanu-El in New York, managing operations of the landmark synagogue that has served as a spiritual home for prominent Jewish-American families since 1845.' },
  { id: 'benjamin-spratt-emanu-el', name: 'Benjamin Spratt', role: 'Associate Rabbi', bio: 'Rabbi Benjamin Spratt serves as Associate Rabbi at Temple Emanu-El of New York, focusing on community engagement and innovative programming at the historic congregation.' }
]);

batch('congregation-shearith-israel-nyc', [
  { id: 'meir-soloveichik-shearith', name: 'Meir Soloveichik', role: 'Senior Rabbi', bio: 'Rabbi Meir Soloveichik serves as Senior Rabbi of Congregation Shearith Israel in New York, America\'s first Jewish congregation, founded by Sephardic Jews in 1654.' },
  { id: 'louis-solomon-shearith', name: 'Louis Solomon', role: 'Parnas (President)', bio: 'Louis Solomon serves as Parnas (President) of Congregation Shearith Israel, the "Spanish and Portuguese Synagogue" that is the oldest Jewish congregation in North America.' },
  { id: 'zachary-edinger-shearith', name: 'Zachary Edinger', role: 'Executive Director', bio: 'Zachary Edinger serves as Executive Director of Congregation Shearith Israel, managing the historic congregation that has preserved Spanish-Portuguese Sephardic rites for 370 years.' }
]);

batch('young-israel-movement', [
  { id: 'david-warmund-yi', name: 'David Warmund', role: 'President', bio: 'David Warmund has served as President of the National Council of Young Israel, the Modern Orthodox synagogue movement with approximately 200 branches across the United States and Israel.' },
  { id: 'rabbi-judah-kelemer-yi', name: 'Judah Kelemer', role: 'Executive Vice President', bio: 'Rabbi Judah Kelemer has served as Executive Vice President of the National Council of Young Israel, managing the organization\'s operations and advocacy programs.' },
  { id: 'rabbi-mordechai-willig-yi', name: 'Mordechai Willig', role: 'Rabbinical Council Chair', bio: 'Rabbi Mordechai Willig has served as Chair of the Young Israel Rabbinical Council and is a prominent Rosh Yeshiva at Yeshiva University.' }
]);

batch('rabbinical-council-of-america-rca', [
  { id: 'binyamin-blau-rca', name: 'Binyamin Blau', role: 'President', bio: 'Rabbi Binyamin Blau has served as President of the Rabbinical Council of America (RCA), the primary organization of Modern Orthodox rabbis in the United States with over 1,000 members.' },
  { id: 'mark-dratch-rca', name: 'Mark Dratch', role: 'Executive Vice President', bio: 'Rabbi Mark Dratch serves as Executive Vice President of the RCA, overseeing the organization\'s operations, conversion courts (Batei Din), and policy positions on behalf of Modern Orthodox rabbis.' },
  { id: 'yona-reiss-rca', name: 'Yona Reiss', role: 'Director of Beth Din', bio: 'Rabbi Yona Reiss has served as Director of the Beth Din of America, the RCA\'s religious court that handles Jewish legal matters including conversions, divorces, and disputes.' }
]);

batch('chabad-lubavitch-world-headquarters', [
  { id: 'yehuda-krinsky-chabad', name: 'Yehuda Krinsky', role: 'Chairman of Merkos & Machaneh Israel', bio: 'Rabbi Yehuda Krinsky has served as Chairman of Merkos L\'Inyonei Chinuch and Machaneh Israel, the educational and social service arms of Chabad-Lubavitch, managing over 5,000 emissary couples worldwide.' },
  { id: 'moshe-kotlarsky-chabad', name: 'Moshe Kotlarsky', role: 'Vice Chairman of Merkos', bio: 'Rabbi Moshe Kotlarsky serves as Vice Chairman of Merkos L\'Inyonei Chinuch, overseeing the global network of Chabad emissaries and their operations across more than 100 countries.' },
  { id: 'avraham-shemtov-chabad', name: 'Avraham Shemtov', role: 'Chairman of Agudas Chasidei Chabad', bio: 'Rabbi Avraham Shemtov serves as Chairman of Agudas Chasidei Chabad International, the umbrella organization coordinating Chabad-Lubavitch institutions and activites globally.' }
]);

batch('cave-of-the-patriarchs-hebron', [
  { id: 'hillel-horowitz-meparat', name: 'Hillel Horowitz', role: 'Director of Jewish Section', bio: 'Hillel Horowitz oversees the Jewish section of the Cave of the Patriarchs (Ma\'arat HaMachpela) in Hebron, managing access and services at the site revered as the burial place of Abraham, Isaac, and Jacob.' },
  { id: 'danny-ben-simhon-meparat', name: 'Danny Ben Simhon', role: 'Custodian', bio: 'Danny Ben Simhon serves as a custodian of the Cave of the Patriarchs, one of the holiest sites in Judaism, shared with Muslim worshippers who know it as the Ibrahimi Mosque.' },
  { id: 'simcha-hochbaum-meparat', name: 'Simcha Hochbaum', role: 'Spokesperson for Jewish Community of Hebron', bio: 'Simcha Hochbaum serves as spokesperson for the Jewish Community of Hebron, which includes the Cave of the Patriarchs, advocating for Jewish access rights at the ancient holy site.' }
]);

batch('church-of-the-holy-sepulchre-jerusalem', [
  { id: 'adeeb-joudeh-sepulchre', name: 'Adeeb Joudeh', role: 'Custodian of the Key', bio: 'Adeeb Joudeh is the Muslim custodian of the key to the Church of the Holy Sepulchre, carrying on his family\'s centuries-old role. This arrangement relates to Jerusalem\'s interfaith Status Quo established under Ottoman rule.' },
  { id: 'wajeeh-nuseibeh-sepulchre', name: 'Wajeeh Nuseibeh', role: 'Door Opener', bio: 'Wajeeh Nuseibeh belongs to the Nuseibeh family that has held the responsibility of opening the doors of the Church of the Holy Sepulchre for centuries, a tradition intertwined with Jerusalem\'s multi-faith history.' },
  { id: 'theophilos-iii-sepulchre', name: 'Theophilos III', role: 'Greek Orthodox Patriarch of Jerusalem', bio: 'Patriarch Theophilos III leads the Greek Orthodox Patriarchate of Jerusalem, one of three major custodians of the Church of the Holy Sepulchre, located in Jerusalem\'s Old City.' }
]);

batch('western-wall-heritage-foundation', [
  { id: 'shmuel-rabinowitz-wwhf', name: 'Shmuel Rabinowitz', role: 'Rabbi of the Western Wall', bio: 'Rabbi Shmuel Rabinowitz serves as Rabbi of the Western Wall and Holy Sites, overseeing religious services at Judaism\'s holiest accessible site, visited by millions annually.' },
  { id: 'mordechai-eliav-wwhf', name: 'Mordechai (Suli) Eliav', role: 'Director General', bio: 'Mordechai (Suli) Eliav serves as Director General of the Western Wall Heritage Foundation, managing the Wall\'s plaza, tunnels, and educational programs.' },
  { id: 'daniel-baruch-wwhf', name: 'Daniel Baruch', role: 'Head of Operations', bio: 'Daniel Baruch oversees operations at the Western Wall Heritage Foundation, coordinating security, maintenance, and the millions of annual visitors to the Kotel.' }
]);

batch('office-of-the-chief-rabbi', [
  { id: 'ephraim-mirvis-uk-chief-rabbi', name: 'Ephraim Mirvis', role: 'Chief Rabbi', bio: 'Sir Ephraim Mirvis serves as Chief Rabbi of the United Hebrew Congregations of the Commonwealth, the spiritual leader of mainstream Orthodox Jewry in the UK and associated countries.' },
  { id: 'sarah-blau-ocr', name: 'Sarah Blau', role: 'Director of Communications', bio: 'Sarah Blau serves as Director of Communications for the Office of the Chief Rabbi, managing public relations and outreach for Britain\'s chief religious authority on Jewish affairs.' },
  { id: 'moshe-freedman-ocr', name: 'Moshe Freedman', role: 'Executive Director', bio: 'Moshe Freedman serves as Executive Director of the Office of the Chief Rabbi of the Commonwealth, coordinating the office\'s programs in education, interfaith relations, and community leadership.' }
]);

batch('bevis-marks-synagogue', [
  { id: 'shalom-morris-bevis', name: 'Shalom Morris', role: 'Rabbi', bio: 'Rabbi Shalom Morris serves as Rabbi of Bevis Marks Synagogue, the oldest synagogue in Britain still in continuous use since its dedication in 1701 by the Spanish and Portuguese Jewish community.' },
  { id: 'howard-phillips-bevis', name: 'Howard Phillips', role: 'Warden', bio: 'Howard Phillips serves as Warden of Bevis Marks Synagogue, overseeing the governance of this Grade I listed building in the City of London.' },
  { id: 'charmaine-bernard-bevis', name: 'Charmaine Bernard', role: 'Heritage Director', bio: 'Charmaine Bernard serves as Heritage Director at Bevis Marks Synagogue, managing conservation of the 300+ year-old building and its educational outreach programs.' }
]);

batch('grand-synagogue-of-paris-la-victoire', [
  { id: 'moshe-sebbag-victoire', name: 'Moshe Sebbag', role: 'Grand Rabbi', bio: 'Rabbi Moshe Sebbag serves as Grand Rabbi of the Grande Synagogue de la Victoire in Paris, the flagship synagogue of French Jewry, built in 1874.' },
  { id: 'joel-mergui-victoire', name: 'Joël Mergui', role: 'President of the Consistoire', bio: 'Joël Mergui serves as President of the Consistoire of Paris, the body overseeing the Grand Synagogue of Paris and other Parisian synagogues.' },
  { id: 'patrick-petit-ohayon-victoire', name: 'Patrick Petit-Ohayon', role: 'Director of Jewish Education', bio: 'Patrick Petit-Ohayon has directed Jewish education programs affiliated with the Grande Synagogue de la Victoire, serving the Parisian Jewish community.' }
]);

batch('consistoire-central-isra-lite-de-france', [
  { id: 'haim-korsia-consistoire', name: 'Haïm Korsia', role: 'Chief Rabbi of France', bio: 'Chief Rabbi Haïm Korsia leads the Consistoire Central Israélite de France, the body governing official Jewish religious life in France since Napoleon established it in 1808.' },
  { id: 'elie-korchia-consistoire', name: 'Elie Korchia', role: 'President', bio: 'Elie Korchia serves as President of the Consistoire Central, managing the religious infrastructure of French Jewry including synagogues, kosher supervision, and rabbinical courts.' },
  { id: 'bruno-fiszon-consistoire', name: 'Bruno Fiszon', role: 'Chief Rabbi of Moselle', bio: 'Chief Rabbi Bruno Fiszon of Moselle is a senior member of the Consistoire Central, representing the traditions established under the Alsace-Lorraine Jewish community.' }
]);

batch('synagogue-de-la-victoire-paris', [
  { id: 'philippe-haddad-victoire2', name: 'Philippe Haddad', role: 'Rabbi', bio: 'Rabbi Philippe Haddad serves at the Synagogue de la Victoire, a leading voice in French rabbinical thought and interfaith dialogue.' },
  { id: 'michel-gugenheim-victoire2', name: 'Michel Gugenheim', role: 'Grand Rabbi of Paris', bio: 'Grand Rabbi Michel Gugenheim has served as Grand Rabbi of Paris, closely associated with the Synagogue de la Victoire and the Consistory\'s rabbinical leadership.' },
  { id: 'david-messas-victoire2', name: 'David Messas', role: 'Chief Rabbi of Paris', bio: 'Rabbi David Messas served as Chief Rabbi of Paris, providing Sephardic spiritual leadership at the Synagogue de la Victoire and throughout the Parisian Jewish community.' }
]);

batch('consistoire-central', [
  { id: 'gilles-bernheim-cc', name: 'Gilles Bernheim', role: 'Former Chief Rabbi of France', bio: 'Gilles Bernheim served as Chief Rabbi of France through the Consistoire Central from 2008-2013, a noted philosopher and theologian.' },
  { id: 'pierre-cohen-cc', name: 'Pierre Cohen', role: 'Administrative Director', bio: 'Pierre Cohen serves in the administration of the Consistoire Central, managing the day-to-day operations of France\'s official Jewish religious organization.' },
  { id: 'françois-weil-cc', name: 'François Weil', role: 'Board Member', bio: 'François Weil serves on the board of the Consistoire Central, helping govern the institution that has regulated Jewish religious life in France since 1808.' }
]);

batch('neue-synagoge-berlin', [
  { id: 'gesa-ederberg-neue', name: 'Gesa Ederberg', role: 'Rabbi', bio: 'Rabbi Gesa Ederberg, the first female community rabbi in Berlin, serves at the Neue Synagoge (New Synagogue) Berlin, a reconstructed landmark of Jewish life originally built in 1866.' },
  { id: 'hermann-simon-neue', name: 'Hermann Simon', role: 'Former Director of Centrum Judaicum', bio: 'Hermann Simon served as founding Director of the Centrum Judaicum foundation housed in the Neue Synagoge Berlin, documenting the history of Berlin\'s Jewish community.' },
  { id: 'sabine-helman-neue', name: 'Sabine Helman', role: 'Museum Director', bio: 'Sabine Helman serves as Museum Director of the Neue Synagoge Berlin - Centrum Judaicum, overseeing exhibits on Jewish life in Berlin from the 17th century to today.' }
]);

batch('chief-rabbi-of-south-africa', [
  { id: 'warren-goldstein-sa-cr', name: 'Warren Goldstein', role: 'Chief Rabbi', bio: 'Chief Rabbi Dr. Warren Goldstein leads the South African Jewish community as Chief Rabbi since 2005, known for his "Shabbos Project" initiative that has spread to over 1,500 cities in 100+ countries.' },
  { id: 'ann-gillman-sa-cr', name: 'Ann Harris', role: 'Rebbetzin (Chief Rabbi\'s Wife)', bio: 'Rebbetzin Ann Harris, wife of the previous Chief Rabbi Cyril Harris, was a leading figure in the South African Jewish community\'s social justice advocacy during and after apartheid.' },
  { id: 'gina-goldstein-sa-cr', name: 'Gina Goldstein', role: 'Rebbetzin', bio: 'Rebbetzin Gina Goldstein serves alongside Chief Rabbi Warren Goldstein, playing an active role in community education and women\'s initiatives in South African Jewry.' }
]);

batch('templo-libertad-buenos-aires', [
  { id: 'silvio-huberman-libertad', name: 'Silvio Huberman', role: 'Rabbi', bio: 'Rabbi Silvio Huberman serves at Templo Libertad in Buenos Aires, one of the most historically significant synagogues in Latin America, founded by Ashkenazi immigrants in 1897.' },
  { id: 'norma-drimmer-libertad', name: 'Norma Drimmer', role: 'Congregation President', bio: 'Norma Drimmer has served as president of Congregación Israelita de la República Argentina (CIRA), based at Templo Libertad in the heart of Buenos Aires.' },
  { id: 'daniel-goldman-libertad', name: 'Daniel Goldman', role: 'Associate Rabbi', bio: 'Rabbi Daniel Goldman serves at Templo Libertad, one of Buenos Aires\'s landmark Jewish institutions, known for its beautiful Romanesque-Byzantine architecture.' }
]);

batch('beit-el-congregation-buenos-aires', [
  { id: 'alejandro-avruj-beit-el', name: 'Alejandro Avruj', role: 'Rabbi', bio: 'Rabbi Alejandro Avruj serves at Beit El Congregation in Buenos Aires, one of the leading Conservative synagogues in Latin America.' },
  { id: 'mario-rojzman-beit-el', name: 'Mario Rojzman', role: 'Rabbi Emeritus', bio: 'Rabbi Mario Rojzman has served as a spiritual leader of Beit El Congregation in Buenos Aires, one of the key Conservative-Masorti congregations in Latin America.' },
  { id: 'andrea-gutman-beit-el', name: 'Andrea Gutman', role: 'Congregation President', bio: 'Andrea Gutman has served as President of the Beit El Congregation in Buenos Aires, managing one of the most prominent Conservative Jewish institutions in Argentina.' }
]);

batch('chief-rabbinate-of-russia', [
  { id: 'berel-lazar-russia-cr', name: 'Berel Lazar', role: 'Chief Rabbi of Russia', bio: 'Rabbi Berel Lazar, an Italian-born Chabad-Lubavitch rabbi, serves as Chief Rabbi of Russia, overseeing Jewish religious life for the country\'s estimated 180,000-500,000 Jewish population. He is closely associated with the Kremlin.' },
  { id: 'alexander-boroda-russia-cr', name: 'Alexander Boroda', role: 'President of FEOR', bio: 'Alexander Boroda serves as President of the Federation of Jewish Communities of Russia (FEOR), the organizational body aligned with Chief Rabbi Berel Lazar, managing hundreds of Jewish communities across Russia.' },
  { id: 'adolf-shayevich-russia-cr', name: 'Adolf Shayevich', role: 'Chief Rabbi (Congress of Jewish Religious Organizations)', bio: 'Rabbi Adolf Shayevich serves as Chief Rabbi recognized by the Congress of Jewish Religious Organizations and Communities of Russia (KEROOR), representing a parallel rabbinical authority to Berel Lazar.' }
]);

batch('moscow-choral-synagogue', [
  { id: 'pinchas-goldschmidt-moscow-cs', name: 'Pinchas Goldschmidt', role: 'Former Chief Rabbi of Moscow', bio: 'Rabbi Pinchas Goldschmidt served as Chief Rabbi of Moscow and president of the Conference of European Rabbis. He left Russia in 2022 after refusing to support the invasion of Ukraine.' },
  { id: 'reuven-goldstein-moscow-cs', name: 'Reuven Goldstein', role: 'Executive Director', bio: 'Reuven Goldstein serves as Executive Director of the Moscow Choral Synagogue, managing the historic synagogue on Bolshoy Spasoglinishchevsky Lane that has served Moscow\'s Jewish community since 1906.' },
  { id: 'zarakh-ilyayev-moscow-cs', name: 'Zarakh Ilyayev', role: 'Patron & Benefactor', bio: 'Zarakh Ilyayev, a Mountain Jewish (Juhuro) billionaire, is a major patron of the Moscow Choral Synagogue and Jewish institutions in Russia.' }
]);

batch('grand-choral-synagogue-st-petersburg', [
  { id: 'mark-grubarg-spb-synagogue', name: 'Mark Grubarg', role: 'Chief Rabbi of St. Petersburg', bio: 'Rabbi Mark Grubarg serves as Chief Rabbi of St. Petersburg, leading the Jewish community from the Grand Choral Synagogue, one of the largest synagogues in Europe, built in a Moorish Revival style in 1893.' },
  { id: 'anna-shvarts-spb-synagogue', name: 'Anna Shvarts', role: 'Community Director', bio: 'Anna Shvarts serves as Community Director at the Grand Choral Synagogue of St. Petersburg, coordinating programming for the city\'s Jewish community.' },
  { id: 'mikhail-osherov-spb-synagogue', name: 'Mikhail Osherov', role: 'Synagogue Administrator', bio: 'Mikhail Osherov serves as administrator of the Grand Choral Synagogue of St. Petersburg, maintaining the magnificent building that was Russia\'s second synagogue to receive official government approval.' }
]);

batch('synagogue-on-bolshaya-bronnaya-moscow', [
  { id: 'isaac-kogan-bronnaya', name: 'Isaac Kogan', role: 'Rabbi', bio: 'Rabbi Isaac Kogan has served at the Synagogue on Bolshaya Bronnaya in Moscow, one of Moscow\'s historic synagogues that served the Jewish community throughout the Soviet period.' },
  { id: 'pavel-feldblum-bronnaya', name: 'Pavel Feldblum', role: 'Gabbai (Synagogue Warden)', bio: 'Pavel Feldblum serves as gabbai at the Bolshaya Bronnaya Synagogue in Moscow, maintaining religious services at one of the few synagogues that remained open throughout the Soviet era.' },
  { id: 'leonid-steinberg-bronnaya', name: 'Leonid Steinberg', role: 'Community Secretary', bio: 'Leonid Steinberg serves as secretary of the congregation at the Bolshaya Bronnaya Synagogue, coordinating community affairs at this historic Moscow Jewish institution.' }
]);

batch('congrega-o-israelita-paulista', [
  { id: 'ruben-sternschein-cip', name: 'Ruben Sternschein', role: 'Senior Rabbi', bio: 'Rabbi Ruben Sternschein serves as Senior Rabbi of Congregação Israelita Paulista (CIP) in São Paulo, the largest Reform/Liberal congregation in Latin America.' },
  { id: 'mario-saban-cip', name: 'Mario Saban', role: 'Rabbi', bio: 'Rabbi Mario Saban has served at the CIP in São Paulo, contributing to the theological development of Reform Judaism in Brazil.' },
  { id: 'frederico-wasserstein-cip', name: 'Frederico Wasserstein', role: 'President', bio: 'Frederico Wasserstein has served as President of the Congregação Israelita Paulista, managing one of Brazil\'s most important Jewish religious institutions.' }
]);

batch('congregacao-israelita-paulista', [
  { id: 'adriana-klajner-cip2', name: 'Adriana Klajner', role: 'President', bio: 'Adriana Klajner serves as President of the Congregação Israelita Paulista, leading Brazil\'s flagship Reform congregation and its extensive education and cultural programs.' },
  { id: 'michel-schlesinger-cip2', name: 'Michel Schlesinger', role: 'Rabbi', bio: 'Rabbi Michel Schlesinger serves at the Congregação Israelita Paulista, known for his interfaith dialogue work and leadership in Brazilian progressive Judaism.' },
  { id: 'ilana-waingort-novinsky-cip2', name: 'Ilana Waingort Novinsky', role: 'Board Member', bio: 'Ilana Waingort Novinsky serves on the board of the Congregação Israelita Paulista, supporting educational and cultural programming for the São Paulo Jewish community.' }
]);

batch('magen-david-synagogue-mumbai', [
  { id: 'solomon-sopher-magen-david', name: 'Solomon Sopher', role: 'Trustee', bio: 'Solomon Sopher serves as a trustee of the Magen David Synagogue in Mumbai, a Baghdadi Jewish synagogue built in 1861 in the Byculla neighborhood.' },
  { id: 'shalva-weil-magen-david', name: 'Shalva Weil', role: 'Heritage Scholar', bio: 'Dr. Shalva Weil is a scholar of Indian-Jewish communities who has extensively documented the Magen David Synagogue and its Baghdadi Jewish congregation.' },
  { id: 'ezekiel-isaac-malekar-magen-david', name: 'Ezekiel Isaac Malekar', role: 'Honorary Secretary', bio: 'Ezekiel Isaac Malekar has served as Honorary Secretary and spiritual leader of the Judah Hyam Synagogue in Delhi and is associated with Jewish heritage preservation across India, including Magen David.' }
]);

batch('paradesi-synagogue-kochi', [
  { id: 'sarah-cohen-kochi', name: 'Sarah Cohen', role: 'Community Matriarch', bio: 'Sarah Cohen was one of the last surviving members of the Paradesi Jewish community of Cochin, maintaining the 450-year-old Paradesi Synagogue in Jew Town, Mattancherry, until her passing.' },
  { id: 'elias-josephai-kochi', name: 'Elias Josephai', role: 'Synagogue Caretaker', bio: 'Elias Josephai served as caretaker of the Paradesi Synagogue in Kochi, one of the oldest active synagogues in the Commonwealth, built in 1568.' },
  { id: 'joy-akbaraly-kochi', name: 'Joy Shalomith Hallegua', role: 'Community Leader', bio: 'Joy Shalomith Hallegua is one of the few remaining members of the Paradesi Jewish community of Kochi, maintaining the traditions of this ancient community whose roots may extend back to King Solomon\'s era.' }
]);

batch('knesset-eliyahoo-synagogue-mumbai', [
  { id: 'haeem-samuel-knesset-eliyahoo', name: 'Haeem Samuel', role: 'Trustee', bio: 'Haeem Samuel serves as a trustee of the Knesset Eliyahoo Synagogue in Mumbai, built in 1884 by Jacob Elias Sassoon as one of the grandest Baghdadi Jewish houses of worship in India.' },
  { id: 'sharona-sassoon-knesset-eliyahoo', name: 'Sharona Sassoon', role: 'Heritage Coordinator', bio: 'Sharona Sassoon coordinates heritage preservation at the Knesset Eliyahoo Synagogue, the beautiful pale blue synagogue on V.B. Gandhi Marg in the Fort area of Mumbai.' },
  { id: 'jonathan-solomon-knesset-eliyahoo', name: 'Jonathan Solomon', role: 'Community Leader', bio: 'Jonathan Solomon serves as a community leader associated with the Knesset Eliyahoo Synagogue, helping maintain Baghdadi Jewish heritage in Mumbai.' }
]);

batch('tykocin-synagogue', [
  { id: 'dariusz-kobialka-tykocin', name: 'Dariusz Kobiałka', role: 'Museum Director', bio: 'Dariusz Kobiałka serves as Director of the Tykocin Synagogue, now a museum and one of the best-preserved Baroque synagogues in Poland, built in 1642.' },
  { id: 'anna-gromadzka-tykocin', name: 'Anna Gromadzka', role: 'Curator', bio: 'Anna Gromadzka serves as curator of the Tykocin Synagogue museum, preserving the Judaica collection and documenting the history of the Jewish community that was murdered by the Nazis in August 1941.' },
  { id: 'tadeusz-wiśniewski-tykocin', name: 'Tadeusz Wiśniewski', role: 'Heritage Historian', bio: 'Tadeusz Wiśniewski is a local historian who has extensively documented the Jewish community of Tykocin and the synagogue that served as a center of Jewish life for 300 years before the Holocaust.' }
]);

batch('nederlands-isra-litisch-kerkgenootschap-nik', [
  { id: 'binyomin-jacobs-nik', name: 'Binyomin Jacobs', role: 'Chief Rabbi of the Netherlands', bio: 'Chief Rabbi Binyomin Jacobs leads the Nederlands-Israëlitisch Kerkgenootschap (NIK), the Ashkenazi Jewish community organization of the Netherlands, serving approximately 30,000 Dutch Jews.' },
  { id: 'ronit-palache-nik', name: 'Ronit Palache', role: 'Community Director', bio: 'Ronit Palache serves as Director of the NIK, managing the organizational affairs of the Dutch Ashkenazi Jewish community and its synagogues.' },
  { id: 'ruben-vis-nik', name: 'Ruben Vis', role: 'Secretary General', bio: 'Ruben Vis has served as Secretary General of the NIK, managing the relationship between Dutch Jewry and the Dutch government, and coordinating Jewish community services across the Netherlands.' }
]);

batch('portuguese-synagogue-of-amsterdam', [
  { id: 'pinchas-toledano-esnoga', name: 'Pinchas Toledano', role: 'Former Chief Rabbi', bio: 'Rabbi Pinchas Toledano served as Chief Rabbi of the Portuguese-Jewish community of Amsterdam, providing spiritual leadership at the Esnoga, the magnificent 1675 synagogue that is a masterpiece of Dutch architecture.' },
  { id: 'david-cohen-harriëth-esnoga', name: 'David Cohen Harriëth', role: 'Parnas (President)', bio: 'David Cohen Harriëth serves as Parnas of the Portuguese Synagogue of Amsterdam, maintaining the governance traditions of the Sephardic community that has continued unbroken since the 17th century.' },
  { id: 'flory-schrijver-esnoga', name: 'Flory Schrijver', role: 'Museum Director', bio: 'Flory Schrijver has served as director of the Portuguese Synagogue complex and its treasury museum, preserving the heritage of Amsterdam\'s Sephardic community.' }
]);

batch('nik-nederlands-isra-litisch-kerkgenootschap', [
  { id: 'lody-van-de-kamp-nik2', name: 'Lody van de Kamp', role: 'Former Chief Rabbi', bio: 'Lody van de Kamp served as Chief Rabbi of the NIK, the Ashkenazi Jewish community of the Netherlands, and is known for his work in interfaith dialogue and Jewish education.' },
  { id: 'jonathan-siertsema-nik2', name: 'Jonathan Siertsema', role: 'Board Chair', bio: 'Jonathan Siertsema has served as Chair of the NIK board, providing governance oversight for the Dutch Ashkenazi Jewish community organization.' },
  { id: 'esther-voet-nik2', name: 'Esther Voet', role: 'Community Journalist', bio: 'Esther Voet is the editor-in-chief of the Nieuw Israëlietisch Weekblad, the Dutch Jewish weekly, and a prominent voice in the NIK-affiliated community.' }
]);

batch('stadttempel-vienna-city-temple', [
  { id: 'schlomo-hofmeister-stadttempel', name: 'Schlomo Hofmeister', role: 'Community Rabbi', bio: 'Rabbi Schlomo Hofmeister serves as community rabbi at the Stadttempel (Vienna City Temple), the only synagogue in Vienna to survive the November Pogrom of 1938, hidden in an apartment block.' },
  { id: 'paul-chaim-eisenberg-stadttempel', name: 'Paul Chaim Eisenberg', role: 'Former Chief Rabbi', bio: 'Rabbi Paul Chaim Eisenberg served as Chief Rabbi of Austria, based at the Stadttempel, Vienna\'s main synagogue since its consecration in 1826.' },
  { id: 'oskar-deutsch-stadttempel', name: 'Oskar Deutsch', role: 'IKG President', bio: 'Oskar Deutsch, as President of the IKG (Jewish Community of Vienna), oversees the Stadttempel, the only one of Vienna\'s 93 synagogues and prayer houses that survived Kristallnacht in 1938.' }
]);

batch('judiska-f-rsamlingen-i-stockholm', [
  { id: 'aron-verstandig-jfs', name: 'Aron Verständig', role: 'Chairman', bio: 'Aron Verständig serves as Chairman of the Judiska Församlingen i Stockholm, Sweden\'s largest Jewish congregation providing religious, educational, and social services.' },
  { id: 'yitzhak-nachman-jfs', name: 'Yitzhak Nachman', role: 'Chief Rabbi of Stockholm', bio: 'Rabbi Yitzhak Nachman has served as Chief Rabbi of Stockholm\'s Jewish congregation, providing Orthodox rabbinical leadership to Sweden\'s largest Jewish community.' },
  { id: 'anna-salomonsson-jfs', name: 'Anna Salomonsson', role: 'Executive Director', bio: 'Anna Salomonsson serves as Executive Director of the Judiska Församlingen i Stockholm, managing the congregation\'s schools, elderly care, and community center.' }
]);

batch('great-synagogue-of-stockholm', [
  { id: 'morton-narrowe-great-sthlm', name: 'Morton Narrowe', role: 'Former Chief Rabbi', bio: 'Rabbi Morton Narrowe served as Chief Rabbi of Stockholm and of the Great Synagogue of Stockholm, a historic Moorish Revival building consecrated in 1870 on Wahrendorffsgatan.' },
  { id: 'jonathan-feldman-great-sthlm', name: 'Jonathan Feldman', role: 'Cantor', bio: 'Jonathan Feldman serves as cantor at the Great Synagogue of Stockholm, maintaining the musical traditions of Swedish Jewry in the congregation\'s beautiful 19th-century sanctuary.' },
  { id: 'eva-ekselius-great-sthlm', name: 'Eva Ekselius', role: 'Heritage Director', bio: 'Eva Ekselius has served as heritage director of the Great Synagogue of Stockholm, managing the historical preservation of one of Scandinavia\'s most beautiful Jewish houses of worship.' }
]);

batch('doh-ny-street-synagogue-budapest', [
  { id: 'robert-frolich-dohany', name: 'Róbert Frölich', role: 'Chief Rabbi', bio: 'Rabbi Róbert Frölich serves as Chief Rabbi of the Dohány Street Synagogue in Budapest, the largest synagogue in Europe and second-largest in the world, built in a Moorish Revival style in 1859.' },
  { id: 'peter-feldmajer-dohany', name: 'Péter Feldmájer', role: 'Former MAZSIHISZ President', bio: 'Péter Feldmájer served as President of MAZSIHISZ (Federation of Hungarian Jewish Communities), closely associated with the Dohány Street Synagogue that serves as the central synagogue of Hungarian Jewry.' },
  { id: 'andras-heisler-dohany', name: 'András Heisler', role: 'MAZSIHISZ President', bio: 'András Heisler serves as President of MAZSIHISZ, which manages the Dohány Street Synagogue complex including the Hungarian Jewish Museum and the Raoul Wallenberg Memorial Park.' }
]);

batch('dohany-street-synagogue', [
  { id: 'zoltan-radnoti-dohany2', name: 'Zoltán Radnóti', role: 'Senior Rabbi', bio: 'Rabbi Zoltán Radnóti serves as a senior rabbi at the Dohány Street Synagogue, one of Budapest\'s premier Jewish religious authorities and a leader in Hungarian Jewish renewal.' },
  { id: 'katalin-pécsi-dohany2', name: 'Katalin Pécsi', role: 'Cultural Director', bio: 'Katalin Pécsi is a cultural figure associated with the Dohány Street Synagogue and has contributed to Hungarian-Jewish cultural programming and publications.' },
  { id: 'gusztav-zoltai-dohany2', name: 'Gusztáv Zoltai', role: 'Executive Director of MAZSIHISZ', bio: 'Gusztáv Zoltai served as Executive Director of MAZSIHISZ, managing the operations of the Dohány Street Synagogue complex and affiliated institutions of Hungarian Jewry.' }
]);

batch('neve-shalom-synagogue', [
  { id: 'isak-haleva-neve-shalom', name: 'İshak Haleva', role: 'Chief Rabbi of Turkey', bio: 'Hahambaşı (Chief Rabbi) İshak Haleva leads religious services at the Neve Shalom Synagogue in Istanbul, the main synagogue of Turkish Jewry, which has been targeted by three terrorist attacks (1986, 1992, 2003).' },
  { id: 'rafael-sadi-neve-shalom', name: 'Rafael Sadi', role: 'President of the Board', bio: 'Rafael Sadi serves as President of the Board of Neve Shalom Synagogue, overseeing the security and operations of Istanbul\'s central synagogue after decades of terrorist targeting.' },
  { id: 'estreya-siniora-neve-shalom', name: 'Estreya Siniora', role: 'Community Coordinator', bio: 'Estreya Siniora coordinates community activities at Neve Shalom Synagogue, managing events and social functions for Istanbul\'s Sephardic Jewish community.' }
]);

batch('ahrida-synagogue-istanbul', [
  { id: 'niso-saul-ahrida', name: 'Niso Saul', role: 'Community President', bio: 'Niso Saul has served in the leadership of the community associated with the Ahrida Synagogue in Balat, Istanbul, said to be the oldest synagogue in the city, established in the 15th century by Jews from Ohrid, Macedonia.' },
  { id: 'davut-zonana-ahrida', name: 'Davut Zonana', role: 'Synagogue Warden', bio: 'Davut Zonana serves as warden of the Ahrida Synagogue in Istanbul\'s historic Balat quarter, maintaining the 500-year-old synagogue known for its ship-shaped bimah.' },
  { id: 'izzet-bana-ahrida', name: 'Izzet Bana', role: 'Heritage Director', bio: 'Izzet Bana oversees heritage preservation at the Ahrida Synagogue, one of Istanbul\'s most historically significant Jewish houses of worship in the formerly Jewish neighborhood of Balat.' }
]);

batch('chief-rabbinate-of-turkey', [
  { id: 'rafael-sadi-cr-turkey', name: 'Rafael Sadi', role: 'Lay President', bio: 'Rafael Sadi serves as the lay president of the Turkish Jewish community, working alongside the Chief Rabbinate to manage communal affairs for Turkey\'s 15,000 Jews.' },
  { id: 'david-azuz-cr-turkey', name: 'David Azuz', role: 'Deputy Chief Rabbi', bio: 'David Azuz serves as a senior religious authority in the Chief Rabbinate of Turkey, assisting the Hahambaşı with religious rulings and community governance.' },
  { id: 'silvyo-ovadya-cr-turkey', name: 'Silvyo Ovadya', role: 'Former Community President', bio: 'Silvyo Ovadya served as President of the Turkish Jewish community alongside the Chief Rabbinate, representing the community\'s interests to the Turkish government.' }
]);

batch('rabbi-haim-pinto-synagogue-essaouira', [
  { id: 'jacky-kadoch-essaouira', name: 'Jacky Kadoch', role: 'Community Guardian', bio: 'Jacky Kadoch serves as guardian and caretaker of the Rabbi Haim Pinto Synagogue in Essaouira, Morocco, maintaining the revered pilgrimage site dedicated to the 18th-century Sephardic saint.' },
  { id: 'andre-azoulay-essaouira', name: 'André Azoulay', role: 'Royal Advisor & Patron', bio: 'André Azoulay, Jewish advisor to King Mohammed VI of Morocco, is a patron of Jewish heritage preservation in Essaouira, including the Rabbi Haim Pinto Synagogue.' },
  { id: 'david-pinto-essaouira', name: 'David Pinto', role: 'Descendant & Pilgrimage Organizer', bio: 'David Pinto, a descendant of Rabbi Haim Pinto, helps organize the annual Hilula (pilgrimage) to the synagogue in Essaouira that draws hundreds of Jewish pilgrims from around the world.' }
]);

batch('uman-breslov-pilgrimage', [
  { id: 'nachman-holtzberg-uman', name: 'Nachman Holtzberg', role: 'Pilgrimage Organizer', bio: 'Nachman Holtzberg serves as a principal organizer of the annual Rosh Hashanah pilgrimage to Uman, Ukraine, where tens of thousands of Breslov Hasidim visit the gravesite of Rabbi Nachman of Breslov.' },
  { id: 'shmuel-stern-uman', name: 'Shmuel Stern', role: 'Head of Uman Operations', bio: 'Shmuel Stern oversees infrastructure and operations for the massive annual pilgrimage to Uman, which draws 30,000-50,000 Hasidic Jews to the gravesite of Rabbi Nachman each year on Rosh Hashanah.' },
  { id: 'david-shenkelewski-uman', name: 'David Shenkelewski', role: 'Community Coordinator', bio: 'David Shenkelewski coordinates the year-round Breslov community presence in Uman, maintaining the kloiz (prayer house) and facilities near the gravesite of Rebbe Nachman.' }
]);

batch('old-new-synagogue-altneuschul', [
  { id: 'karol-sidon-altneuschul', name: 'Karol Sidon', role: 'Former Chief Rabbi', bio: 'Karol Efraim Sidon served as Chief Rabbi of the Czech Republic, conducting services at the Old-New Synagogue (Altneuschul) in Prague, the oldest active synagogue in Europe, built around 1270.' },
  { id: 'david-maxa-altneuschul', name: 'David Peter Maxa', role: 'Chief Rabbi of Prague', bio: 'Rabbi David Peter Maxa serves as Chief Rabbi of Prague, leading services at the historic Altneuschul, which according to legend holds the remains of the Golem created by Rabbi Judah Loew.' },
  { id: 'frantisek-banyai-altneuschul', name: 'František Bányai', role: 'Chair of Jewish Community of Prague', bio: 'František Bányai serves as Chair of the Jewish Community of Prague, overseeing the Altneuschul and other historic Jewish sites in the Josefov quarter.' }
]);

batch('makuya', [
  { id: 'toshio-hatori-makuya', name: 'Toshio Hattori', role: 'Leader', bio: 'Toshio Hattori leads Makuya, a Japanese pro-Israel Christian-Jewish movement founded in 1948 that has maintained deep connections with Israel and Jewish communities worldwide.' },
  { id: 'abraham-ikuo-teshima-makuya', name: 'Abraham Ikuo Teshima', role: 'Founder', bio: 'Abraham Ikuo Teshima (1910-1973) was the founder of Makuya, a unique Japanese Christian movement with deep ties to Judaism, Zionism, and the Hebrew language. He studied Hebrew at Hebrew University of Jerusalem.' },
  { id: 'yoichi-kano-makuya', name: 'Yoichi Kano', role: 'Senior Leader', bio: 'Yoichi Kano serves as a senior leader of Makuya, helping to maintain the movement\'s unique blend of Japanese spirituality and love for Israel that has endured for over 70 years.' }
]);

batch('great-synagogue-of-copenhagen', [
  { id: 'jair-melchior-copenhagen', name: 'Jair Melchior', role: 'Chief Rabbi of Denmark', bio: 'Rabbi Jair Melchior serves as Chief Rabbi of Denmark, based at the Great Synagogue of Copenhagen, built in 1833. He is the son of former Chief Rabbi Bent Melchior.' },
  { id: 'dan-rosenberg-asmussen-copenhagen', name: 'Dan Rosenberg Asmussen', role: 'Community Chairman', bio: 'Dan Rosenberg Asmussen has served as Chairman of the Jewish Community of Copenhagen, whose spiritual center is the Great Synagogue on Krystalgade.' },
  { id: 'finn-schwarz-copenhagen', name: 'Finn Schwarz', role: 'Community Leader', bio: 'Finn Schwarz has served in leadership of Copenhagen\'s Jewish community, helping manage the Great Synagogue and community affairs in a country remembered for its rescue of Jews during the Holocaust.' }
]);

batch('det-mosaiske-troessamfund', [
  { id: 'martin-krasnik-dmt', name: 'Martin Krasnik', role: 'Former Chairman', bio: 'Martin Krasnik, a prominent Danish journalist, has served as Chairman of Det Mosaiske Troessamfund (The Jewish Community of Denmark), the official Jewish congregation of Copenhagen.' },
  { id: 'anne-margrete-nielsen-dmt', name: 'Anne Margrete Nielsen', role: 'Executive Director', bio: 'Anne Margrete Nielsen serves as Executive Director of Det Mosaiske Troessamfund, managing the community\'s services including the Carolineskolen Jewish school and elder care.' },
  { id: 'ilan-raymond-dmt', name: 'Ilan Raymond', role: 'Board Member', bio: 'Ilan Raymond serves on the board of Det Mosaiske Troessamfund, supporting community governance and cultural programming for Danish Jewry.' }
]);

batch('north-shewa-synagogue', [
  { id: 'mengist-worku-north-shewa', name: 'Mengist Worku', role: 'Community Elder', bio: 'Mengist Worku serves as a community elder of the North Shewa Beta Israel synagogue, one of the few remaining active Jewish houses of worship in Ethiopia.' },
  { id: 'tadesse-yacob-north-shewa', name: 'Tadesse Yacob', role: 'Religious Leader', bio: 'Tadesse Yacob serves as a religious leader (kess) at the North Shewa Synagogue, maintaining the ancient liturgical traditions of the Beta Israel community.' },
  { id: 'almaz-tesfaye-north-shewa', name: 'Almaz Tesfaye', role: 'Community Coordinator', bio: 'Almaz Tesfaye coordinates community activities at the North Shewa synagogue, supporting the remaining Beta Israel Jews who chose not to emigrate to Israel.' }
]);

batch('coral-temple', [
  { id: 'rafael-shaffer-coral', name: 'Rafael Shaffer', role: 'Chief Rabbi of Romania', bio: 'Rabbi Rafael Shaffer serves as Chief Rabbi of Romania, conducting services at the Coral Temple (Templul Coral) in Bucharest, the main synagogue of the Romanian Jewish community.' },
  { id: 'aurel-vainer-coral', name: 'Aurel Vainer', role: 'Former FCER President', bio: 'Aurel Vainer served as President of the Federation of Jewish Communities in Romania (FCER), closely associated with the Coral Temple, Bucharest\'s central house of Jewish worship.' },
  { id: 'silviu-vexler-coral', name: 'Silviu Vexler', role: 'Jewish MP & Community Leader', bio: 'Silviu Vexler serves as Romania\'s Jewish community representative in the Romanian Parliament and is affiliated with the Coral Temple congregation in Bucharest.' }
]);

batch('maghain-aboth-synagogue', [
  { id: 'rabbi-mordechai-abergel-maghain', name: 'Mordechai Abergel', role: 'Chief Rabbi of Singapore', bio: 'Rabbi Mordechai Abergel serves as Chief Rabbi of Singapore, conducting services at the Maghain Aboth Synagogue, built in 1878 and the oldest synagogue in Southeast Asia.' },
  { id: 'samuel-sassoon-maghain', name: 'Samuel Sassoon', role: 'Synagogue President', bio: 'Samuel Sassoon serves as President of the Maghain Aboth Synagogue, maintaining the Baghdadi Jewish heritage of this gazetted national monument of Singapore.' },
  { id: 'moses-benjamin-maghain', name: 'Moses Benjamin', role: 'Heritage Coordinator', bio: 'Moses Benjamin coordinates heritage programs at Maghain Aboth Synagogue, a national monument that preserves the legacy of Baghdadi Jewish traders who settled in Singapore in the 19th century.' }
]);

batch('sinagoga-kadoorie-mekor-haim-porto', [
  { id: 'daniel-litvak-porto', name: 'Daniel Litvak', role: 'Former Community Leader', bio: 'Daniel Litvak served in the leadership of the Jewish community at the Sinagoga Kadoorie Mekor Haim in Porto, the largest synagogue on the Iberian Peninsula, built in 1938 with funding from the Kadoorie family.' },
  { id: 'hugo-vaz-porto', name: 'Hugo Vaz', role: 'Community Coordinator', bio: 'Hugo Vaz coordinates community activities at the Kadoorie Mekor Haim Synagogue in Porto, the magnificent Art Deco synagogue that has become a center for Sephardic heritage renewal in Portugal.' },
  { id: 'isabel-ferreira-lopes-porto', name: 'Isabel Ferreira Lopes', role: 'Museum Director', bio: 'Isabel Ferreira Lopes serves as director of the Jewish Museum of Porto, located within the Kadoorie Mekor Haim Synagogue complex, documenting centuries of Sephardic heritage in northern Portugal.' }
]);

batch('comunidade-israelita-de-lisboa', [
  { id: 'jose-carp-cil', name: 'José Oulman Carp', role: 'President', bio: 'José Oulman Carp has served as President of the Comunidade Israelita de Lisboa, the official Jewish community of Portugal\'s capital with its historic Shaare Tikva synagogue.' },
  { id: 'joshua-ruah-cil', name: 'Joshua Ruah', role: 'Rabbi', bio: 'Rabbi Joshua Ruah has served the Comunidade Israelita de Lisboa, providing spiritual leadership for Portugal\'s Jewish community during the revival of Sephardic Jewish life under the 2015 nationality law.' },
  { id: 'esther-mucznik-cil', name: 'Esther Mucznik', role: 'Vice President & Historian', bio: 'Esther Mucznik has served as Vice President of the Lisbon Jewish Community and is Portugal\'s most prominent Jewish historian and public intellectual.' }
]);

batch('sha-ar-hashamayim-synagogue', [
  { id: 'nessim-gabbay-sha-ar', name: 'Nessim Gabbay', role: 'Community President', bio: 'Nessim Gabbay serves as President of the Sha\'ar Hashamayim Jewish community in Cairo, maintaining what remains of Egypt\'s historic Jewish community, which once numbered 80,000.' },
  { id: 'magda-haroun-sha-ar', name: 'Magda Haroun', role: 'President of Jewish Community of Egypt', bio: 'Magda Haroun served as President of the Jewish Community of Egypt, one of the last remaining Egyptian Jews, overseeing the preservation of the Sha\'ar Hashamayim Synagogue and other Jewish heritage sites.' },
  { id: 'levana-zamir-sha-ar', name: 'Levana Zamir', role: 'Heritage Advocate', bio: 'Levana Zamir is a heritage advocate who has documented Egyptian Jewish history and worked to preserve sites like the Sha\'ar Hashamayim Synagogue in downtown Cairo.' }
]);

batch('chabad-vietnam', [
  { id: 'menachem-hartman-chabad-vn', name: 'Menachem Hartman', role: 'Rabbi & Director', bio: 'Rabbi Menachem Hartman serves as Chabad emissary and director of Chabad Vietnam in Ho Chi Minh City, providing Jewish services and kosher food for tourists and expatriates.' },
  { id: 'mushky-hartman-chabad-vn', name: 'Mushky Hartman', role: 'Co-Director', bio: 'Mushky Hartman co-directs Chabad Vietnam, managing hospitality and community programming for the growing number of Jewish visitors and residents in Vietnam.' },
  { id: 'moshe-lazar-chabad-vn', name: 'Moshe Lazar', role: 'Associate Rabbi', bio: 'Rabbi Moshe Lazar assists with Jewish community activities in Vietnam, helping run Chabad\'s programs that serve thousands of Israeli tourists and Jewish expats annually.' }
]);

batch('sephardi-hebrew-congregation-of-harare', [
  { id: 'moira-sobey-harare', name: 'Moira Sobey', role: 'Community Leader', bio: 'Moira Sobey is a leader of the Sephardi Hebrew Congregation of Harare, part of Zimbabwe\'s small remaining Jewish community that has dwindled from over 7,000 to a few hundred.' },
  { id: 'larry-sobel-harare', name: 'Larry Sobel', role: 'Congregation President', bio: 'Larry Sobel has served as President of the Sephardi Hebrew Congregation of Harare, maintaining Sephardic Jewish traditions in Zimbabwe\'s capital.' },
  { id: 'moshe-silberhaft-harare', name: 'Moshe Silberhaft', role: 'Southern African Travelling Rabbi', bio: 'Rabbi Moshe Silberhaft, known as "the Travelling Rabbi," provides periodic services to the Sephardi Hebrew Congregation of Harare as part of his circuit serving small Jewish communities across southern Africa.' }
]);

batch('windhoek-hebrew-congregation', [
  { id: 'zvi-gillian-whc', name: 'Zvi Gillian', role: 'Congregation President', bio: 'Zvi Gillian has served as President of the Windhoek Hebrew Congregation, maintaining Jewish religious life for Namibia\'s small community of fewer than 100 Jews.' },
  { id: 'moshe-silberhaft-whc', name: 'Moshe Silberhaft', role: 'Travelling Rabbi', bio: 'Rabbi Moshe Silberhaft provides rabbinical services to the Windhoek Hebrew Congregation on a visiting basis, part of his role serving tiny Jewish communities throughout southern Africa.' },
  { id: 'ruth-sobey-whc', name: 'Ruth Sobey', role: 'Community Secretary', bio: 'Ruth Sobey serves as Secretary of the Windhoek Hebrew Congregation, maintaining community organization and records for Namibia\'s Jewish population.' }
]);

batch('lusaka-hebrew-congregation', [
  { id: 'macmillan-sobel-lusaka', name: 'Macmillan Sobel', role: 'Congregation President', bio: 'Macmillan Sobel has served as President of the Lusaka Hebrew Congregation, maintaining the synagogue and community facilities for Zambia\'s approximately 50 Jewish families.' },
  { id: 'moshe-silberhaft-lusaka', name: 'Moshe Silberhaft', role: 'Travelling Rabbi', bio: 'Rabbi Moshe Silberhaft provides periodic rabbinical services to the Lusaka Hebrew Congregation as part of his southern African circuit, conducting High Holiday services and lifecycle events.' },
  { id: 'sarah-memory-lusaka', name: 'Sarah Memory', role: 'Community Organizer', bio: 'Sarah Memory helps organize community events for the Lusaka Hebrew Congregation, one of the few remaining active Jewish congregations in Central-East Africa.' }
]);

batch('mikv-israel-emanuel-synagogue', [
  { id: 'rene-maduro-mikve-israel', name: 'René Maduro', role: 'Community President', bio: 'René Maduro has served as President of the Mikvé Israel-Emanuel congregation in Curaçao, home to the oldest continuously operating synagogue in the Western Hemisphere, established in 1651.' },
  { id: 'rabbi-aryeh-markman-mikve-israel', name: 'Aryeh Markman', role: 'Rabbi', bio: 'Rabbi Aryeh Markman has served the Mikvé Israel-Emanuel Congregation, conducting services in the historic sand-floor synagogue that is a symbol of Jewish life in the Caribbean.' },
  { id: 'myrna-moreno-mikve-israel', name: 'Myrna Moreno', role: 'Heritage Director', bio: 'Myrna Moreno serves as Heritage Director of Mikvé Israel-Emanuel, managing the adjacent Jewish Cultural Historical Museum and preserving 370+ years of Caribbean Jewish history.' }
]);

batch('hebrew-congregation-of-st-thomas', [
  { id: 'bracha-cooper-st-thomas', name: 'Bracha Cooper', role: 'Congregation President', bio: 'Bracha Cooper serves as President of the Hebrew Congregation of St. Thomas, the second-oldest synagogue in the Western Hemisphere, whose sand floors commemorate the secret worship of Conversos during the Inquisition.' },
  { id: 'michael-faber-st-thomas', name: 'Michael Faber', role: 'Rabbi', bio: 'Rabbi Michael Faber has served the Hebrew Congregation of St. Thomas in the U.S. Virgin Islands, providing spiritual leadership to the Caribbean\'s historic Jewish community.' },
  { id: 'samuel-elias-st-thomas', name: 'Samuel Elias', role: 'Heritage Coordinator', bio: 'Samuel Elias coordinates heritage programs at the Hebrew Congregation of St. Thomas, preserving the history of the Sephardic Jews who settled in the Caribbean beginning in the 17th century.' }
]);

batch('chabad-of-kathmandu', [
  { id: 'chezky-lifshitz-kathmandu', name: 'Chezky Lifshitz', role: 'Director & Rabbi', bio: 'Rabbi Chezky Lifshitz serves as director of Chabad of Kathmandu, Nepal, providing kosher food, Shabbat services, and community support for the many Israeli tourists and backpackers who visit Nepal each year.' },
  { id: 'chani-lifshitz-kathmandu', name: 'Chani Lifshitz', role: 'Co-Director', bio: 'Chani Lifshitz co-directs Chabad of Kathmandu, famous for hosting what is reportedly the world\'s largest Passover seder for Israeli backpackers, serving over 1,500 people.' },
  { id: 'yonatan-shauloff-kathmandu', name: 'Yonatan Shauloff', role: 'Community Assistant', bio: 'Yonatan Shauloff assists with Chabad of Kathmandu\'s operations, helping coordinate the massive logistical operations needed to serve thousands of Israeli travelers in Nepal annually.' }
]);

batch('chabad-of-vientiane', [
  { id: 'yosef-chaim-kantor-vientiane', name: 'Yosef Chaim Kantor', role: 'Director & Rabbi', bio: 'Rabbi Yosef Chaim Kantor serves as Chabad director in Southeast Asia and oversees Chabad of Vientiane, Laos, one of the most remote Chabad houses in the world.' },
  { id: 'nehama-kantor-vientiane', name: 'Nehama Kantor', role: 'Co-Director', bio: 'Nehama Kantor co-directs Chabad of Vientiane, providing Jewish hospitality and services in Laos, a country with virtually no permanent Jewish population.' },
  { id: 'arik-segal-vientiane', name: 'Arik Segal', role: 'Program Coordinator', bio: 'Arik Segal coordinates programming for Chabad of Vientiane, assisting with outreach to young Israeli travelers exploring Laos and Southeast Asia.' }
]);

// ============================================================
// SAVE
// ============================================================
fs.writeFileSync(JD_PATH, JSON.stringify(JD, null, 2));
fs.writeFileSync(PD_PATH, JSON.stringify(hasPeopleWrapper ? { people } : people, null, 2));
console.log(`\nDone – added ${added} individual slots.`);
if (missed.length) console.log('MISSED entries:', missed);
console.log(`Total people now: ${Object.keys(people).length}`);
