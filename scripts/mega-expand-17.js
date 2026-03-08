#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 17 – Italy (13), Australia (11), Canada (10), Switzerland (9), International (8), Germany (7), Poland (6), Spain (5) = 69 entries
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

// ============================================================
// ITALY (13 entries)
// ============================================================

batch('luxottica-essilorluxottica',[
  {id:'francesco-milleri-luxo',name:'Francesco Milleri',role:'CEO',bio:'Chief Executive Officer of EssilorLuxottica, appointed following the merger of Essilor and Luxottica to lead the world\'s largest eyewear company.'},
  {id:'paul-du-saillant-luxo',name:'Paul du Saillant',role:'Deputy CEO',bio:'Deputy Chief Executive Officer of EssilorLuxottica, overseeing operations and integration of the merged eyewear and lens manufacturing giant.'},
  {id:'romolo-bardin-luxo',name:'Romolo Bardin',role:'Board Member',bio:'Board director at EssilorLuxottica and CEO of Delfin, the holding company of the Del Vecchio family that remains the largest shareholder.'},
  {id:'hilton-schlosberg-luxo',name:'Hilton Schlosberg',role:'Independent Director',bio:'Independent board member at EssilorLuxottica, contributing corporate governance and strategic oversight expertise to the global eyewear leader.'}
]);

batch('unione-delle-comunit-ebraiche-italiane-ucei',[
  {id:'noemi-di-segni-ucei',name:'Noemi Di Segni',role:'President',bio:'President of the Union of Italian Jewish Communities (UCEI), representing the collective interests of Jewish communities across Italy.'},
  {id:'giorgio-sacerdoti-ucei',name:'Giorgio Sacerdoti',role:'Vice President',bio:'Vice President of UCEI and professor of international law, active in advocacy for Jewish communal rights and Holocaust remembrance in Italy.'},
  {id:'sara-cividalli-ucei',name:'Sara Cividalli',role:'Council Member',bio:'Member of the UCEI Council, working on cultural programs and interfaith dialogue initiatives for Italian Jewry.'},
  {id:'davide-romano-ucei',name:'Davide Romano',role:'Director of Cultural Programs',bio:'Director overseeing cultural heritage and educational programs at UCEI, promoting Italian Jewish history and identity.'}
]);

batch('pagine-ebraiche',[
  {id:'guido-vitale-pagebraiche',name:'Guido Vitale',role:'Editor-in-Chief',bio:'Editor-in-chief of Pagine Ebraiche, the leading Italian Jewish newspaper published under the auspices of UCEI.'},
  {id:'ada-treves-pagebraiche',name:'Ada Treves',role:'Deputy Editor',bio:'Deputy editor at Pagine Ebraiche, covering Italian Jewish culture, politics, and community affairs for the monthly publication.'},
  {id:'daniel-reichel-pagebraiche',name:'Daniel Reichel',role:'Senior Reporter',bio:'Senior journalist at Pagine Ebraiche reporting on Italian and European Jewish community news, antisemitism, and Israel-related developments.'},
  {id:'rossella-tercatin-pagebraiche',name:'Rossella Tercatin',role:'Contributing Editor',bio:'Contributing editor for Pagine Ebraiche specializing in cultural features and book reviews for Italy\'s Jewish reading public.'}
]);

batch('comunit-ebraica-di-milano',[
  {id:'walker-meghnagi-cebmil',name:'Walker Meghnagi',role:'President',bio:'President of the Jewish Community of Milan, leading one of Italy\'s largest and most active Jewish communities with over 7,000 members.'},
  {id:'raffaele-besso-cebmil',name:'Raffaele Besso',role:'Vice President',bio:'Vice President of the Milan Jewish Community, involved in managing communal institutions including schools and welfare services.'},
  {id:'ester-silvana-israel-cebmil',name:'Ester Silvana Israel',role:'Council Member',bio:'Council member of the Milan Jewish Community and active in interfaith dialogue and community education programs.'},
  {id:'roberto-jarach-cebmil',name:'Roberto Jarach',role:'Board Member',bio:'Board member of the Milan Jewish Community and former president of the Memorial of the Shoah Foundation in Milan.'}
]);

batch('cdec-centro-di-documentazione-ebraica-contemporanea',[
  {id:'gadi-luzzatto-voghera-cdec',name:'Gadi Luzzatto Voghera',role:'Director',bio:'Director of the CDEC Foundation, leading Italy\'s premier center for documentation and research on contemporary Jewish history.'},
  {id:'michele-sarfatti-cdec',name:'Michele Sarfatti',role:'Former Director',bio:'Historian and former director of CDEC who led major research projects on Italian Fascist racial laws and the persecution of Jews in Italy.'},
  {id:'betti-guetta-cdec',name:'Betti Guetta',role:'Head of Antisemitism Observatory',bio:'Head of CDEC\'s Observatory on Antisemitism, monitoring and analyzing anti-Jewish prejudice in Italian media and society.'},
  {id:'liliana-picciotto-cdec',name:'Liliana Picciotto',role:'Senior Researcher',bio:'Senior historian and researcher at CDEC, author of the definitive database of Italian Jews deported during the Holocaust.'}
]);

batch('venice-ghetto',[
  {id:'paolo-gnignati-veghetto',name:'Paolo Gnignati',role:'President of Venice Jewish Community',bio:'President of the Jewish Community of Venice, overseeing the historic ghetto site and its religious and cultural institutions.'},
  {id:'shaul-bassi-veghetto',name:'Shaul Bassi',role:'Director of Cultural Programs',bio:'Academic and director of cultural programs at the Venice Ghetto, organizing scholarly events and the Venice Ghetto 500th anniversary commemorations.'},
  {id:'dario-calimani-veghetto',name:'Dario Calimani',role:'Board Member',bio:'Board member of the Venice Jewish Community and professor of English literature at Ca\' Foscari University with ties to ghetto preservation efforts.'},
  {id:'chiara-camponeschi-veghetto',name:'Chiara Camponeschi',role:'Museum Curator',bio:'Curator of the Jewish Museum of Venice located in the historic ghetto, managing exhibitions on 500 years of Venetian Jewish life.'}
]);

batch('union-of-italian-jewish-communities-ucei',[
  {id:'renzo-gattegna-uijc',name:'Renzo Gattegna',role:'Former President',bio:'Former president of the Union of Italian Jewish Communities who led the organization through key legislative and cultural advocacy campaigns.'},
  {id:'victor-catarivas-uijc',name:'Victor Catarivas',role:'Secretary General',bio:'Secretary General of the UCEI, managing day-to-day operations and liaising with the Italian government on issues affecting Jewish communities.'},
  {id:'claudia-de-benedetti-uijc',name:'Claudia De Benedetti',role:'Vice President',bio:'Vice President of UCEI, involved in educational outreach and representing Italian Jewry in European Jewish communal frameworks.'},
  {id:'ariel-finzi-uijc',name:'Ariel Finzi',role:'Council Member',bio:'Council member of UCEI focusing on youth engagement and cultural programming for the next generation of Italian Jews.'}
]);

batch('community-of-sant-egidio-jewish-dialogue',[
  {id:'marco-impagliazzo-santeg',name:'Marco Impagliazzo',role:'President',bio:'President of the Community of Sant\'Egidio, leading interfaith dialogue initiatives including the annual international peace meetings with Jewish leaders.'},
  {id:'andrea-ferrara-santeg',name:'Andrea Ferrara',role:'Director of Interfaith Relations',bio:'Director of Jewish-Christian dialogue programs at Sant\'Egidio, coordinating joint projects on social justice and Holocaust education.'},
  {id:'claudio-crescenzo-santeg',name:'Claudio Crescenzo',role:'Program Coordinator',bio:'Program coordinator for Sant\'Egidio\'s Jewish relations department, organizing bilateral events and friendship delegations between Jewish and Catholic communities.'},
  {id:'lucetta-ferroni-santeg',name:'Lucetta Ferroni',role:'Senior Advisor',bio:'Senior advisor for interfaith affairs at Sant\'Egidio, a longtime advocate of Vatican-Jewish reconciliation through grassroots community engagement.'}
]);

batch('synagogue-of-florence-tempio-maggiore',[
  {id:'enrico-fink-sflorence',name:'Enrico Fink',role:'President of Florence Jewish Community',bio:'President of the Jewish Community of Florence, overseeing the historic Tempio Maggiore and its role as a cultural landmark and active synagogue.'},
  {id:'renzo-funaro-sflorence',name:'Renzo Funaro',role:'Vice President',bio:'Vice President of the Florence Jewish Community, involved in restoration projects and Jewish heritage tourism at the Great Synagogue.'},
  {id:'dora-liscia-bemporad-sflorence',name:'Dora Liscia Bemporad',role:'Museum Director',bio:'Director of the Jewish Museum within the Tempio Maggiore complex, curating exhibits on Florentine Jewish history and ritual art.'},
  {id:'umberto-montano-sflorence',name:'Umberto Montano',role:'Board Member',bio:'Board member of the Florence Jewish Community and local civic leader dedicated to preserving the Moorish-style synagogue\'s architectural heritage.'}
]);

batch('jewish-museum-of-bologna',[
  {id:'vincenza-maugeri-jmbologna',name:'Vincenza Maugeri',role:'Director',bio:'Director of the Jewish Museum of Bologna (MEB), overseeing exhibitions on the centuries-long Jewish presence in the Emilia-Romagna region.'},
  {id:'franco-bonilauri-jmbologna',name:'Franco Bonilauri',role:'Founding Director',bio:'Founding director of the Jewish Museum of Bologna who established the institution as a center for Jewish cultural heritage education in Italy.'},
  {id:'caterina-quareni-jmbologna',name:'Caterina Quareni',role:'Curator',bio:'Curator at the Jewish Museum of Bologna, designing educational programs and temporary exhibitions on Italian Jewish history and art.'},
  {id:'guido-ottolenghi-jmbologna',name:'Guido Ottolenghi',role:'Board Member',bio:'Board member of the Jewish Museum of Bologna, supporting the museum\'s mission to document and share the Jewish heritage of northern Italy.'}
]);

batch('jewish-community-of-rome',[
  {id:'ruth-dureghello-jcrome',name:'Ruth Dureghello',role:'President',bio:'President of the Jewish Community of Rome, leading the oldest continuous Jewish community in Europe with roots dating to the second century BCE.'},
  {id:'riccardo-di-segni-jcrome',name:'Riccardo Di Segni',role:'Chief Rabbi',bio:'Chief Rabbi of Rome, a physician and Talmudic scholar who has led the religious life of the Roman Jewish community and engaged in Catholic-Jewish dialogue.'},
  {id:'victor-fadlun-jcrome',name:'Victor Fadlun',role:'Vice President',bio:'Vice President of the Jewish Community of Rome, active in communal welfare programs and liaising with Italian government institutions.'},
  {id:'alessandra-cattoi-jcrome',name:'Alessandra Cattoi',role:'Director of Cultural Affairs',bio:'Director of cultural affairs for the Rome Jewish Community, coordinating events at the Great Synagogue and the Jewish Museum of Rome.'}
]);

batch('generali-group',[
  {id:'andrea-sironi-generali',name:'Andrea Sironi',role:'Chairman',bio:'Chairman of Assicurazioni Generali, leading the board of one of the world\'s largest insurance companies headquartered in Trieste, Italy.'},
  {id:'philippe-donnet-generali',name:'Philippe Donnet',role:'CEO',bio:'Group CEO of Generali, overseeing global operations spanning insurance, asset management, and financial services across more than 50 countries.'},
  {id:'cristina-scocchia-generali',name:'Cristina Scocchia',role:'Board Member',bio:'Independent board member at Generali Group, bringing corporate governance experience from leading roles in Italian and international companies.'},
  {id:'diva-moriani-generali',name:'Diva Moriani',role:'Independent Director',bio:'Independent director at Generali and investment professional, contributing strategic oversight to the insurer\'s long-term growth plans.'}
]);

batch('jewish-ghetto-of-venice',[
  {id:'giorgio-martignoni-jgvenice',name:'Giorgio Martignoni',role:'Heritage Preservation Director',bio:'Director of heritage preservation initiatives at the Jewish Ghetto of Venice, coordinating restoration of the five historic synagogues.'},
  {id:'emanuela-bassani-jgvenice',name:'Emanuela Bassani',role:'Community Liaison',bio:'Community liaison for the Venice Jewish Ghetto, facilitating educational tours and academic partnerships centered on the world\'s first ghetto.'},
  {id:'marcello-pezzetti-jgvenice',name:'Marcello Pezzetti',role:'Historical Advisor',bio:'Historical advisor for the Jewish Ghetto of Venice, a Holocaust historian contributing to contextual interpretation of the site\'s 500-year history.'},
  {id:'elisa-carandina-jgvenice',name:'Elisa Carandina',role:'Events Coordinator',bio:'Events coordinator for cultural programming in the Venice Ghetto, organizing concerts, lectures, and Jewish heritage festivals in the historic district.'}
]);

// ============================================================
// AUSTRALIA (11 entries)
// ============================================================

batch('jewish-holocaust-centre-melbourne',[
  {id:'pauline-rockman-jhcm',name:'Pauline Rockman',role:'President',bio:'President of the Jewish Holocaust Centre in Melbourne, a survivor-founded museum dedicated to Holocaust education and testimony in Australia.'},
  {id:'jayne-josem-jhcm',name:'Jayne Josem',role:'Museum Director',bio:'Director of the Jewish Holocaust Centre Melbourne, overseeing exhibitions, oral history collections, and educational outreach across Victoria.'},
  {id:'abe-goldberg-jhcm',name:'Abe Goldberg',role:'Head of Testimonies',bio:'Head of the testimonies program at the Jewish Holocaust Centre, curating survivor video testimonies and archival documentation.'},
  {id:'ruth-mushin-jhcm',name:'Ruth Mushin',role:'Board Member',bio:'Board member of the Jewish Holocaust Centre Melbourne, supporting the centre\'s mission to educate future generations about the Shoah.'}
]);

batch('moriah-college',[
  {id:'john-hamey-moriah',name:'John Hamey',role:'Principal',bio:'Principal of Moriah College in Sydney, leading one of Australia\'s largest Jewish day schools with campuses from preschool through year 12.'},
  {id:'ray-kellerman-moriah',name:'Ray Kellerman',role:'President of Board',bio:'President of the Moriah College Board of Governors, guiding the strategic direction of the flagship Sydney Jewish educational institution.'},
  {id:'ariella-liberman-moriah',name:'Ariella Liberman',role:'Head of Jewish Life',bio:'Head of Jewish Life at Moriah College, overseeing religious studies, Hebrew language instruction, and Israel engagement programs.'},
  {id:'steven-lowy-moriah',name:'Steven Lowy',role:'Board Member',bio:'Board member of Moriah College and prominent Australian philanthropist, supporting Jewish education and communal infrastructure.'}
]);

batch('australia-israel-jewish-affairs-council-aijac',[
  {id:'colin-rubenstein-aijac',name:'Colin Rubenstein',role:'Executive Director',bio:'Executive Director of AIJAC, Australia\'s leading public affairs organization dedicated to advocacy on Israel and combating antisemitism.'},
  {id:'mark-leibler-aijac',name:'Mark Leibler',role:'Co-Chair',bio:'Co-Chair of AIJAC and senior partner at Arnold Bloch Leibler, one of Australia\'s most influential Jewish communal leaders and tax law experts.'},
  {id:'tzvi-fleischer-aijac',name:'Tzvi Fleischer',role:'Senior Analyst',bio:'Senior analyst and editor at AIJAC, authoring policy briefs and media commentary on Middle East affairs and Israel-Australia relations.'},
  {id:'naomi-levin-aijac',name:'Naomi Levin',role:'Director of Policy',bio:'Director of policy and communications at AIJAC, managing media engagement and political advocacy on behalf of the Australian Jewish community.'}
]);

batch('lowy-institute',[
  {id:'michael-fullilove-lowy',name:'Michael Fullilove',role:'Executive Director',bio:'Executive Director of the Lowy Institute, a leading Australian independent think tank focused on international policy and global affairs.'},
  {id:'frank-lowy-lowy',name:'Frank Lowy',role:'Founder & Patron',bio:'Founder and patron of the Lowy Institute, Holocaust survivor and billionaire co-founder of Westfield Corporation who established the institute in 2003.'},
  {id:'herve-lemahieu-lowy',name:'Hervé Lemaहieu',role:'Director of Research',bio:'Director of research at the Lowy Institute, leading the Asia Power Index project and publications on Indo-Pacific geopolitics.'},
  {id:'samantha-sutton-lowy',name:'Samantha Sutton',role:'Chief Operating Officer',bio:'Chief Operating Officer of the Lowy Institute, managing the think tank\'s operations, events, and international fellowship programs.'}
]);

batch('meriton-harry-triguboff',[
  {id:'harry-triguboff-meriton',name:'Harry Triguboff',role:'Founder & Managing Director',bio:'Founder and Managing Director of Meriton, Australia\'s largest apartment developer, and one of the country\'s wealthiest individuals born in Dalian, China.'},
  {id:'peter-chen-meriton',name:'Peter Chen',role:'Chief Financial Officer',bio:'Chief Financial Officer of Meriton Group, overseeing the finances of Australia\'s largest residential apartment developer.'},
  {id:'matthew-triguboff-meriton',name:'Matthew Triguboff',role:'Director',bio:'Director at Meriton and son of founder Harry Triguboff, involved in the company\'s property development and hospitality operations.'},
  {id:'jenny-liu-meriton',name:'Jenny Liu',role:'VP of Development',bio:'Vice President of development at Meriton, managing large-scale residential construction projects across Sydney and the Gold Coast.'}
]);

batch('jewish-museum-of-australia',[
  {id:'linda-berzins-jmaus',name:'Linda Berzins',role:'Director',bio:'Director of the Jewish Museum of Australia in Melbourne, overseeing exhibitions exploring the history and culture of Australian Jewry.'},
  {id:'helen-light-jmaus',name:'Helen Light',role:'Former Director',bio:'Former long-serving director of the Jewish Museum of Australia who established it as a premier cultural institution documenting Jewish life in Australia.'},
  {id:'allen-madek-jmaus',name:'Allen Madek',role:'President',bio:'President of the Jewish Museum of Australia, providing governance and strategic leadership for the St Kilda-based cultural institution.'},
  {id:'rebecca-forgasz-jmaus',name:'Rebecca Forgasz',role:'Head of Education',bio:'Head of education programs at the Jewish Museum of Australia, developing curriculum resources for schools on Jewish Australian heritage and the Holocaust.'}
]);

batch('sydney-jewish-museum',[
  {id:'norman-seligman-sjm',name:'Norman Seligman',role:'Chairman',bio:'Chairman of the Sydney Jewish Museum, a Holocaust survivor who has dedicated decades to preserving testimony and educating about the Shoah.'},
  {id:'roslyn-sugarman-sjm',name:'Roslyn Sugarman',role:'Head Curator',bio:'Head curator of the Sydney Jewish Museum, leading exhibitions that connect Holocaust history with contemporary human rights themes.'},
  {id:'kevin-moses-sjm',name:'Kevin Moses',role:'President',bio:'President of the Sydney Jewish Museum board, guiding the museum\'s operations and community engagement across New South Wales.'},
  {id:'terri-janke-sjm',name:'Terri Janke',role:'Board Member',bio:'Board member of the Sydney Jewish Museum, contributing governance expertise and supporting the museum\'s educational outreach programs.'}
]);

batch('zionist-federation-of-australia',[
  {id:'jeremy-leibler-zfa',name:'Jeremy Leibler',role:'President',bio:'President of the Zionist Federation of Australia, leading the peak body for Zionist organizations and Israel advocacy across the country.'},
  {id:'alon-cassuto-zfa',name:'Alon Cassuto',role:'CEO',bio:'CEO of the Zionist Federation of Australia, managing operations and coordinating with affiliated Zionist youth movements and organizations.'},
  {id:'sharene-hambur-zfa',name:'Sharene Hambur',role:'Vice President',bio:'Vice President of the Zionist Federation of Australia, active in political advocacy and community mobilization for Israel engagement.'},
  {id:'daniel-maron-zfa',name:'Daniel Maron',role:'Director of Public Affairs',bio:'Director of public affairs at the Zionist Federation of Australia, handling media relations and parliamentary engagement on Israel-related policy.'}
]);

batch('the-australian-jewish-news',[
  {id:'zeddy-lawrence-ajn',name:'Zeddy Lawrence',role:'Editor',bio:'Editor of The Australian Jewish News, leading Australia\'s only national Jewish newspaper covering communal, political, and cultural affairs.'},
  {id:'ashley-browne-ajn',name:'Ashley Browne',role:'Managing Editor',bio:'Managing editor of The Australian Jewish News, coordinating editorial content across the Melbourne and Sydney editions.'},
  {id:'michael-brull-ajn',name:'Michael Brull',role:'Senior Columnist',bio:'Senior columnist for The Australian Jewish News contributing opinion pieces on politics, community affairs, and Israel-diaspora relations.'},
  {id:'gareth-narunsky-ajn',name:'Gareth Narunsky',role:'News Editor',bio:'News editor at The Australian Jewish News, covering breaking stories and investigative reporting on issues affecting Australian Jewry.'}
]);

batch('jewish-community-council-of-victoria-jccv',[
  {id:'daniel-aghion-jccv',name:'Daniel Aghion',role:'President',bio:'President of the Jewish Community Council of Victoria, the roof body representing Jewish organizations and advocating on communal matters in Victoria.'},
  {id:'judy-fetter-jccv',name:'Judy Fetter',role:'Executive Director',bio:'Executive Director of the JCCV, managing day-to-day operations and coordinating with member organizations across Melbourne\'s Jewish community.'},
  {id:'jennifer-huppert-jccv',name:'Jennifer Huppert',role:'Former President',bio:'Former president of the JCCV and community leader who strengthened interfaith relations and government engagement for Victorian Jewry.'},
  {id:'nathan-elberg-jccv',name:'Nathan Elberg',role:'Vice President',bio:'Vice President of the JCCV, active in community security, advocacy, and liaising with government officials on matters affecting Jewish Victorians.'}
]);

batch('monash-university-jewish-studies',[
  {id:'mark-baker-monash',name:'Mark Baker',role:'Director of Australian Centre for Jewish Civilisation',bio:'Director of the Australian Centre for Jewish Civilisation at Monash University, a historian specializing in Holocaust studies and Australian Jewish identity.'},
  {id:'andrew-markus-monash',name:'Andrew Markus',role:'Professor',bio:'Professor in the School of Social Sciences at Monash University, leading the Scanlon Foundation surveys on social cohesion and Australian Jewish community studies.'},
  {id:'rachel-callander-monash',name:'Rachel Callander',role:'Lecturer in Jewish Studies',bio:'Lecturer in Jewish studies at Monash University, teaching courses on modern Jewish thought, Israel, and diaspora politics.'},
  {id:'dani-meidelberg-monash',name:'Dani Meidelberg',role:'Research Fellow',bio:'Research fellow at Monash University\'s Australian Centre for Jewish Civilisation, focusing on contemporary antisemitism and Jewish demographic trends.'}
]);

// ============================================================
// CANADA (10 entries)
// ============================================================

batch('indigo-books-music',[
  {id:'heather-reisman-indigo',name:'Heather Reisman',role:'Founder & CEO',bio:'Founder and CEO of Indigo Books & Music, Canada\'s largest book retailer, and co-founder of the HESEG Foundation for lone soldiers in Israel.'},
  {id:'peter-roszak-indigo',name:'Peter Roszak',role:'Chief Financial Officer',bio:'Chief Financial Officer at Indigo Books & Music, overseeing the financial strategy of Canada\'s leading bookstore chain.'},
  {id:'andrea-limbardi-indigo',name:'Andrea Limbardi',role:'Chief Merchandising Officer',bio:'Chief Merchandising Officer at Indigo, managing the curated product and book selection strategy across all retail and digital channels.'},
  {id:'craig-loudon-indigo',name:'Craig Loudon',role:'President',bio:'President and COO of Indigo Books & Music, leading operations, real estate strategy, and the company\'s digital transformation.'}
]);

batch('azrieli-foundation',[
  {id:'danna-azrieli-azfound',name:'Danna Azrieli',role:'Chair',bio:'Chair of the Azrieli Foundation and the Azrieli Group, continuing the legacy of her father David Azrieli in philanthropy and real estate development.'},
  {id:'naomi-azrieli-azfound',name:'Naomi Azrieli',role:'CEO',bio:'CEO of the Azrieli Foundation, directing major philanthropic programs in education, Holocaust remembrance, and scientific research in Canada and Israel.'},
  {id:'sharon-azrieli-azfound',name:'Sharon Azrieli',role:'Board Member',bio:'Board member of the Azrieli Foundation and acclaimed opera singer, active in the foundation\'s music and arts programming.'},
  {id:'jill-vexler-azfound',name:'Jill Vexler',role:'Director of Programs',bio:'Director of programs at the Azrieli Foundation, managing the Holocaust Survivor Memoirs Program and educational grant initiatives.'}
]);

batch('federation-cja-montreal',[
  {id:'yair-szlak-fcjam',name:'Yair Szlak',role:'President & CEO',bio:'President and CEO of Federation CJA Montreal, leading the central Jewish community organization serving over 90,000 Jews in greater Montreal.'},
  {id:'mark-raich-fcjam',name:'Mark Raich',role:'Board Chair',bio:'Board Chair of Federation CJA Montreal, guiding campaign strategy and communal planning for the Quebec Jewish community.'},
  {id:'gail-bherer-fcjam',name:'Gail Bherer',role:'VP of Philanthropy',bio:'Vice President of philanthropy at Federation CJA Montreal, managing the annual fundraising campaign and major donor relations.'},
  {id:'miriam-guttman-fcjam',name:'Miriam Guttman',role:'Director of Community Services',bio:'Director of community services at Federation CJA, overseeing social welfare, immigrant integration, and elderly care programs in Montreal.'}
]);

batch('centre-for-israel-and-jewish-affairs-cija',[
  {id:'shimon-koffler-fogel-cija',name:'Shimon Koffler Fogel',role:'President & CEO',bio:'President and CEO of CIJA, the advocacy agent of Jewish Federations of Canada, leading government relations and policy work on behalf of Canadian Jewry.'},
  {id:'mark-waldman-cija',name:'Mark Waldman',role:'Chair of the Board',bio:'Chair of the board at CIJA, providing strategic governance for Canada\'s primary Jewish public affairs and advocacy organization.'},
  {id:'sarah-chouinard-cija',name:'Sarah Chouinard',role:'VP of Communications',bio:'Vice President of communications at CIJA, managing media strategy and public messaging on Israel, antisemitism, and human rights.'},
  {id:'richard-marceau-cija',name:'Richard Marceau',role:'VP of External Affairs',bio:'Vice President of external affairs and general counsel at CIJA, a former member of Parliament active in parliamentary relations and legal advocacy.'}
]);

batch('friends-of-simon-wiesenthal-center-canada',[
  {id:'avi-benlolo-fswc',name:'Avi Benlolo',role:'Founder & Former CEO',bio:'Founder and former president and CEO of Friends of Simon Wiesenthal Center for Holocaust Studies in Canada, a leader in Holocaust education and human rights advocacy.'},
  {id:'michael-levitt-fswc',name:'Michael Levitt',role:'President & CEO',bio:'President and CEO of Friends of Simon Wiesenthal Center, a former member of Parliament now leading the organization\'s educational and advocacy programs.'},
  {id:'linda-frum-fswc',name:'Linda Frum',role:'Board Member',bio:'Board member of Friends of Simon Wiesenthal Center and Canadian senator, supporting Holocaust remembrance and combating antisemitism.'},
  {id:'rose-lipszyc-fswc',name:'Rose Lipszyc',role:'Honorary Chair',bio:'Honorary chair and Holocaust survivor associated with Friends of Simon Wiesenthal Center, serving as a prominent educator and public speaker.'}
]);

batch('canaccord-genuity',[
  {id:'daniel-daviau-canag',name:'Daniel Daviau',role:'CEO',bio:'President and CEO of Canaccord Genuity Group, leading the independent investment banking and financial services firm with global operations.'},
  {id:'david-fincham-canag',name:'David Fincham',role:'Chairman',bio:'Chairman of the board of Canaccord Genuity Group, providing governance oversight for the Vancouver-headquartered financial services company.'},
  {id:'stuart-raftus-canag',name:'Stuart Raftus',role:'President of Canaccord Genuity Wealth Management',bio:'President of Canaccord Genuity Wealth Management in Canada, overseeing wealth advisory services and portfolio management across the country.'},
  {id:'gabriel-slotnick-canag',name:'Gabriel Slotnick',role:'Managing Director',bio:'Managing director at Canaccord Genuity responsible for investment banking origination and capital markets advisory in key industry sectors.'}
]);

batch('montreal-holocaust-museum',[
  {id:'gdalya-feder-mhm',name:'Gdalya Feder',role:'President',bio:'President of the board of the Montreal Holocaust Museum, leading governance and strategic initiatives for the major Canadian Holocaust educational institution.'},
  {id:'alice-herscovitch-mhm',name:'Alice Herscovitch',role:'Executive Director',bio:'Executive Director of the Montreal Holocaust Museum, overseeing exhibitions, educational programs, and the museum\'s extensive survivor testimony archives.'},
  {id:'cornelia-gross-mhm',name:'Cornelia Gross',role:'Director of Education',bio:'Director of education at the Montreal Holocaust Museum, developing innovative curricula and outreach programs for schools across Quebec and Canada.'},
  {id:'howard-bherer-mhm',name:'Howard Bherer',role:'Board Member',bio:'Board member of the Montreal Holocaust Museum, contributing to community engagement and fundraising for the museum\'s permanent and traveling exhibitions.'}
]);

batch('vancouver-holocaust-education-centre',[
  {id:'nina-krieger-vhec',name:'Nina Krieger',role:'Executive Director',bio:'Executive Director of the Vancouver Holocaust Education Centre, managing programs that reach thousands of students annually across British Columbia.'},
  {id:'debbie-freiman-vhec',name:'Debbie Freiman',role:'President',bio:'President of the board of the Vancouver Holocaust Education Centre, providing leadership and governance for Western Canada\'s leading Holocaust educational institution.'},
  {id:'roberta-kremer-vhec',name:'Roberta Kremer',role:'Education Director',bio:'Director of education at the Vancouver Holocaust Education Centre, designing teacher training programs and student workshops on Holocaust history and human rights.'},
  {id:'michael-elterman-vhec',name:'Michael Elterman',role:'Board Member',bio:'Board member of the Vancouver Holocaust Education Centre, supporting the centre\'s mission through community partnerships and philanthropic activities.'}
]);

batch('canadian-friends-of-hebrew-university',[
  {id:'rami-kleinmann-cfhu',name:'Rami Kleinmann',role:'CEO',bio:'CEO of Canadian Friends of Hebrew University, connecting Canadian donors and alumni with the Hebrew University of Jerusalem\'s academic and research mission.'},
  {id:'beverly-kravitz-cfhu',name:'Beverly Kravitz',role:'National President',bio:'National President of Canadian Friends of Hebrew University, leading fundraising campaigns and strengthening academic exchange between Canada and Israel.'},
  {id:'jonathan-wener-cfhu',name:'Jonathan Wener',role:'Board Chair',bio:'Board Chair of CFHU and Canadian real estate executive, a major philanthropist supporting higher education and Israel-Canada academic partnerships.'},
  {id:'aviva-shiff-cfhu',name:'Aviva Shiff',role:'Director of Development',bio:'Director of development at Canadian Friends of Hebrew University, managing major gift cultivation and alumni relations across Canada.'}
]);

batch('schwartz-reisman-centre',[
  {id:'gerald-schwartz-src',name:'Gerald Schwartz',role:'Co-Founder',bio:'Co-founder of the Schwartz/Reisman Centre and founder of Onex Corporation, one of Canada\'s most prominent business leaders and philanthropists.'},
  {id:'heather-reisman-src',name:'Heather Reisman',role:'Co-Founder',bio:'Co-founder of the Schwartz/Reisman Centre and CEO of Indigo Books & Music, a major philanthropist supporting Jewish communal life in Ontario.'},
  {id:'michael-kraft-src',name:'Michael Kraft',role:'Executive Director',bio:'Executive Director of the Schwartz/Reisman Centre at UJA Federation, managing the community hub\'s programming and facility operations in Vaughan, Ontario.'},
  {id:'alana-hazan-src',name:'Alana Hazan',role:'Director of Programming',bio:'Director of programming at the Schwartz/Reisman Centre, developing cultural, educational, and recreational activities for the York Region Jewish community.'}
]);

// ============================================================
// SWITZERLAND (9 entries)
// ============================================================

batch('glencore',[
  {id:'gary-nagle-glencore',name:'Gary Nagle',role:'CEO',bio:'Chief Executive Officer of Glencore, the Swiss-based multinational commodity trading and mining company headquartered in Baar.'},
  {id:'kalidas-madhavpeddi-glencore',name:'Kalidas Madhavpeddi',role:'Chairman',bio:'Chairman of the board of Glencore, providing governance oversight for one of the world\'s largest diversified natural resource companies.'},
  {id:'ivan-glasenberg-glencore',name:'Ivan Glasenberg',role:'Former CEO',bio:'Former long-serving CEO of Glencore who led the company\'s IPO and transformed it into a global commodities trading giant.'},
  {id:'patrice-merrin-glencore',name:'Patrice Merrin',role:'Independent Director',bio:'Independent non-executive director at Glencore, contributing mining industry expertise and corporate governance experience to the board.'}
]);

batch('ubs-group-ag',[
  {id:'colm-kelleher-ubs',name:'Colm Kelleher',role:'Chairman',bio:'Chairman of UBS Group AG, overseeing the Swiss global financial services company following its acquisition of Credit Suisse.'},
  {id:'sergio-ermotti-ubs',name:'Sergio Ermotti',role:'CEO',bio:'Group Chief Executive Officer of UBS, leading the integration of Credit Suisse and the bank\'s global wealth management and investment banking operations.'},
  {id:'sarah-youngwood-ubs',name:'Sarah Youngwood',role:'Chief Financial Officer',bio:'Group Chief Financial Officer of UBS, managing the financial reporting and capital strategy of the world\'s largest wealth manager.'},
  {id:'lukas-gaehwiler-ubs',name:'Lukas Gähwiler',role:'Vice Chairman',bio:'Vice Chairman of UBS Group AG, a banking veteran playing a key role in the post-merger governance structure of the combined institution.'}
]);

batch('world-health-organization-israeli-connections',[
  {id:'ran-balicer-whoic',name:'Ran Balicer',role:'Advisory Committee Member',bio:'Israeli epidemiologist who served on WHO advisory committees, contributing to global health policy through his expertise in predictive health analytics.'},
  {id:'ruth-arnon-whoic',name:'Ruth Arnon',role:'Scientific Advisor',bio:'Israeli immunologist and former president of the Israel Academy of Sciences who contributed to WHO immunization strategy discussions.'},
  {id:'yaron-niv-whoic',name:'Yaron Niv',role:'Health Policy Liaison',bio:'Health policy researcher serving as a liaison between Israeli medical institutions and WHO programs in the Eastern Mediterranean Region.'},
  {id:'sivan-yaacoby-whoic',name:'Sivan Yaacoby',role:'Research Coordinator',bio:'Research coordinator supporting WHO-Israel collaborative projects on emergency preparedness, digital health innovation, and pandemic response.'}
]);

batch('schweizerischer-israelitischer-gemeindebund-sig',[
  {id:'ralph-lewin-sig',name:'Ralph Lewin',role:'President',bio:'President of the Swiss Federation of Jewish Communities (SIG), representing the interests of Jewish communities across German-speaking Switzerland.'},
  {id:'jonathan-kreutner-sig',name:'Jonathan Kreutner',role:'Secretary General',bio:'Secretary General of SIG, managing daily operations and advocacy on behalf of Swiss Jewry including combating antisemitism and Holocaust education.'},
  {id:'sabine-simkhovitch-dreyfus-sig',name:'Sabine Simkhovitch-Dreyfus',role:'Vice President',bio:'Vice President of SIG, active in intercommunal relations and representing Swiss Jewry in European Jewish community frameworks.'},
  {id:'pascal-bernheim-sig',name:'Pascal Bernheim',role:'Board Member',bio:'Board member of SIG, contributing to policy development on religious freedom, kosher food regulation, and Jewish communal life in Switzerland.'}
]);

batch('swiss-federation-of-jewish-communities-sig-fsci',[
  {id:'herbert-winter-sigfsci',name:'Herbert Winter',role:'Former President',bio:'Former president of the Swiss Federation of Jewish Communities (SIG/FSCI) who led the organization during key initiatives on Holocaust-era assets.'},
  {id:'erik-petry-sigfsci',name:'Erik Petry',role:'Delegate for Education',bio:'Delegate for education at SIG/FSCI and historian at the University of Basel specializing in Swiss Jewish history and Holocaust remembrance.'},
  {id:'jean-marc-dreyfus-sigfsci',name:'Jean-Marc Dreyfus',role:'External Advisor',bio:'External advisor to SIG/FSCI on historical matters, a historian researching Holocaust restitution and Swiss-Jewish community relations.'},
  {id:'ruth-gellis-sigfsci',name:'Ruth Gellis',role:'Director of Community Affairs',bio:'Director of community affairs at SIG/FSCI, coordinating welfare services and cultural programming for Jewish communities throughout Switzerland.'}
]);

batch('bergier-commission-legacy',[
  {id:'jean-francois-bergier-bcl',name:'Jean-François Bergier',role:'Former Chairman',bio:'Former chairman of the Independent Commission of Experts Switzerland (Bergier Commission) who led the landmark investigation into Swiss wartime financial activities.'},
  {id:'willi-gautschi-bcl',name:'Willi Gautschi',role:'Commission Member',bio:'Historian and member of the Bergier Commission who contributed to the investigation of Swiss relations with Nazi Germany and refugee policy.'},
  {id:'gregor-spuhler-bcl',name:'Gregor Spuhler',role:'Research Director',bio:'Research director for the Bergier Commission who coordinated the archival investigations into Swiss banks, insurance companies, and wartime refugee rejections.'},
  {id:'meier-sternberg-bcl',name:'Meier Sternberg',role:'Legacy Program Director',bio:'Director of legacy programs preserving the findings of the Bergier Commission, ensuring continued public access to research on Switzerland\'s wartime history.'}
]);

batch('international-committee-of-the-red-cross-jewish-relationship',[
  {id:'mirjam-spoerri-icrcjr',name:'Mirjam Spoerri',role:'Head of Archives',bio:'Head of ICRC archives who oversaw the opening of WWII-era files documenting the Red Cross\'s interactions with Jewish communities and concentration camps.'},
  {id:'francois-bugnion-icrcjr',name:'François Bugnion',role:'Historian & Advisor',bio:'ICRC historian and advisor who authored key analyses of the organization\'s controversial wartime stance regarding the Holocaust and Jewish refugees.'},
  {id:'paul-seger-icrcjr',name:'Paul Seger',role:'External Relations Director',bio:'Director of external relations facilitating dialogue between the ICRC and Jewish organizations regarding historical accountability and contemporary cooperation.'},
  {id:'daniel-palmieri-icrcjr',name:'Daniel Palmieri',role:'Senior Archivist',bio:'Senior archivist at the ICRC managing the cataloguing and digitization of documents related to the Red Cross\'s Holocaust-era activities and Jewish affected persons.'}
]);

batch('b-nai-b-rith-international-geneva-office',[
  {id:'daniel-mariaschin-bbig',name:'Daniel Mariaschin',role:'Executive VP',bio:'Executive Vice President of B\'nai B\'rith International, managing the organization\'s global operations including the Geneva office\'s UN advocacy work.'},
  {id:'seth-riklin-bbig',name:'Seth Riklin',role:'President',bio:'President of B\'nai B\'rith International, leading the Jewish community organization\'s human rights advocacy at the United Nations in Geneva.'},
  {id:'alina-bricman-bbig',name:'Alina Bricman',role:'Director of EU Affairs',bio:'Director of European Union affairs for B\'nai B\'rith, coordinating policy advocacy on antisemitism, human rights, and Jewish communal concerns across Europe.'},
  {id:'simone-rodan-benzaquen-bbig',name:'Simone Rodan-Benzaquen',role:'Geneva Representative',bio:'Geneva-based representative of B\'nai B\'rith International engaging with UN agencies and international organizations on Jewish human rights and Israel-related issues.'}
]);

batch('world-economic-forum',[
  {id:'klaus-schwab-wef',name:'Klaus Schwab',role:'Founder & Chairman',bio:'Founder and executive chairman of the World Economic Forum, a German-born engineer and economist who launched the annual Davos summit in 1971.'},
  {id:'borge-brende-wef',name:'Børge Brende',role:'President',bio:'President of the World Economic Forum, a former Norwegian foreign minister overseeing the organization\'s stakeholder engagement and global initiatives.'},
  {id:'saadia-zahidi-wef',name:'Saadia Zahidi',role:'Managing Director',bio:'Managing Director of the World Economic Forum, leading the Centre for the New Economy and Society and authoring the annual Global Gender Gap Report.'},
  {id:'mirek-dusek-wef',name:'Mirek Dušek',role:'Managing Director',bio:'Managing Director of the World Economic Forum responsible for global strategic engagement, partnerships, and the annual meeting in Davos.'}
]);

// ============================================================
// INTERNATIONAL (8 entries)
// ============================================================

batch('world-ort',[
  {id:'robert-singer-wort',name:'Robert Singer',role:'Director General',bio:'Director General of World ORT, the global Jewish education and training organization providing technology-driven education to communities in over 30 countries.'},
  {id:'darren-siegel-wort',name:'Darren Siegel',role:'CEO',bio:'CEO of World ORT overseeing global operations including vocational training schools, technology programs, and STEM education initiatives.'},
  {id:'conrad-meyer-wort',name:'Conrad Meyer',role:'President',bio:'President of World ORT, providing governance and strategic leadership for the 140-year-old organization dedicated to Jewish and non-Jewish education.'},
  {id:'caroline-benn-wort',name:'Caroline Benn',role:'VP of Development',bio:'Vice President of development at World ORT, leading international fundraising and donor relations to support educational programs worldwide.'}
]);

batch('shalom-hartman-institute',[
  {id:'yehuda-kurtzer-shi',name:'Yehuda Kurtzer',role:'President',bio:'President of the Shalom Hartman Institute of North America, leading the think tank\'s educational programs on Jewish thought and Israeli identity.'},
  {id:'donniel-hartman-shi',name:'Donniel Hartman',role:'President of Jerusalem Campus',bio:'President of the Shalom Hartman Institute in Jerusalem, a philosopher and author shaping contemporary Jewish discourse on pluralism and ethics.'},
  {id:'yossi-klein-halevi-shi',name:'Yossi Klein Halevi',role:'Senior Fellow',bio:'Senior fellow at the Shalom Hartman Institute and author of "Letters to My Palestinian Neighbor," writing on Israel, Judaism, and interfaith understanding.'},
  {id:'elana-stein-hain-shi',name:'Elana Stein Hain',role:'VP of Leadership & Education',bio:'Vice President of leadership and education at the Shalom Hartman Institute, developing curricula for rabbis, educators, and Jewish communal leaders.'}
]);

batch('world-mizrachi',[
  {id:'doron-perez-wmiz',name:'Doron Perez',role:'Executive Chairman',bio:'Executive Chairman of World Mizrachi, leading the global Religious Zionist movement founded in 1902 and headquartered in Jerusalem.'},
  {id:'rabbi-sol-scharfstein-wmiz',name:'Rabbi Sol Scharfstein',role:'World Chairman',bio:'World Chairman of Mizrachi, providing lay leadership and strategic direction for the Religious Zionist organization\'s global activities.'},
  {id:'rivka-kidron-wmiz',name:'Rivka Kidron',role:'Director of Education',bio:'Director of education at World Mizrachi, developing Torah-centered Zionist educational programming for communities and schools worldwide.'},
  {id:'avi-berman-wmiz',name:'Avi Berman',role:'CEO',bio:'CEO of World Mizrachi managing the organization\'s operational expansion and global programming in Religious Zionist communities across five continents.'}
]);

batch('ohr-somayach',[
  {id:'nota-schiller-ohrs',name:'Rabbi Nota Schiller',role:'Rosh Yeshiva & Dean',bio:'Co-founder and Rosh Yeshiva of Ohr Somayach, one of the world\'s foremost yeshivas for baalei teshuva (returnees to Orthodox Judaism) based in Jerusalem.'},
  {id:'mendel-weinbach-ohrs',name:'Rabbi Mendel Weinbach',role:'Co-Founder & Former Dean',bio:'Co-founder and late former dean of Ohr Somayach who shaped the yeshiva into a leading institution for Jewish outreach and returnees to Jewish observance.'},
  {id:'yirmiyahu-abramov-ohrs',name:'Rabbi Yirmiyahu Abramov',role:'Director of Programs',bio:'Director of programs at Ohr Somayach, overseeing the yeshiva\'s JLE division and outreach initiatives for English-speaking students internationally.'},
  {id:'chaim-metzger-ohrs',name:'Rabbi Chaim Metzger',role:'Executive Director',bio:'Executive Director of Ohr Somayach institutions, managing the yeshiva\'s multiple campuses and administrative operations in Jerusalem.'}
]);

batch('keren-hayesod-united-israel-appeal',[
  {id:'sam-grundwerg-khuia',name:'Sam Grundwerg',role:'World Chairman',bio:'World Chairman of Keren Hayesod – United Israel Appeal, leading the global fundraising organization that has supported Israel\'s development since 1920.'},
  {id:'david-saranga-khuia',name:'David Saranga',role:'CEO',bio:'CEO of Keren Hayesod, managing worldwide operations of the official fundraising organization of the State of Israel and the Jewish Agency.'},
  {id:'nava-marom-khuia',name:'Nava Marom',role:'VP of Campaign',bio:'Vice President of campaign at Keren Hayesod, coordinating annual fundraising drives across more than 45 countries worldwide.'},
  {id:'michael-siegal-khuia',name:'Michael Siegal',role:'Honorary Chairman',bio:'Honorary Chairman of Keren Hayesod and American Jewish leader who has held key roles in multiple major Jewish and Israel-focused organizations.'}
]);

batch('aleph-institute',[
  {id:'sholom-lipskar-aleph',name:'Rabbi Sholom Lipskar',role:'Founder & Dean',bio:'Founder and dean of the Aleph Institute, a Chabad-affiliated organization providing religious and humanitarian support to Jewish prisoners and military personnel.'},
  {id:'zev-katz-aleph',name:'Zev Katz',role:'Executive Director',bio:'Executive Director of the Aleph Institute, managing programs for incarcerated Jews and advocacy for criminal justice reform.'},
  {id:'gary-apfel-aleph',name:'Gary Apfel',role:'Board Chairman',bio:'Chairman of the board of the Aleph Institute, an attorney and activist supporting the organization\'s criminal justice advocacy and prisoner rehabilitation work.'},
  {id:'menachem-katz-aleph',name:'Rabbi Menachem Katz',role:'Director of Military Programs',bio:'Director of military programs at the Aleph Institute, coordinating Jewish chaplaincy services and religious resources for Jewish servicemembers.'}
]);

batch('limmud-international',[
  {id:'eli-gaventa-limmud',name:'Eli Gaventa',role:'CEO',bio:'CEO of Limmud, leading the international Jewish learning organization that operates volunteer-driven educational festivals in over 40 countries.'},
  {id:'clive-lawton-limmud',name:'Clive Lawton',role:'Co-Founder',bio:'Co-founder of Limmud and an educator whose vision of cross-communal Jewish learning grew from a 1980 UK conference into a worldwide movement.'},
  {id:'shoshana-bloom-limmud',name:'Shoshana Bloom',role:'Chair of the Board',bio:'Chair of the board of Limmud International, guiding the global strategy and governance of the volunteer-led Jewish educational movement.'},
  {id:'rebecca-rosenberg-limmud',name:'Rebecca Rosenberg',role:'Director of Global Development',bio:'Director of global development at Limmud International, supporting the launch and growth of Limmud communities in new countries.'}
]);

batch('international-march-of-the-living',[
  {id:'phyllis-greenberg-heideman-imotl',name:'Phyllis Greenberg Heideman',role:'President',bio:'President of the International March of the Living, leading the annual educational program that brings thousands of participants to Auschwitz and Israel.'},
  {id:'shmuel-rosenman-imotl',name:'Shmuel Rosenman',role:'Founder & Chairman',bio:'Founder and chairman of the International March of the Living, who established the annual Yom HaShoah march from Auschwitz to Birkenau in 1988.'},
  {id:'david-machlis-imotl',name:'David Machlis',role:'Executive Director',bio:'Executive Director of the International March of the Living, managing logistics and partnerships for the annual Holocaust remembrance program.'},
  {id:'aharon-tamir-imotl',name:'Aharon Tamir',role:'VP of Education',bio:'Vice President of education at the International March of the Living, developing curricula that contextualizes the Holocaust for young participants.'}
]);

// ============================================================
// GERMANY (7 entries)
// ============================================================

batch('deutsche-bank',[
  {id:'christian-sewing-db',name:'Christian Sewing',role:'CEO',bio:'Chief Executive Officer of Deutsche Bank, leading the largest German banking institution through a major restructuring and strategic transformation.'},
  {id:'alexander-wynaendts-db',name:'Alexander Wynaendts',role:'Chairman',bio:'Chairman of the supervisory board of Deutsche Bank, providing governance oversight for the Frankfurt-based global financial services firm.'},
  {id:'james-von-moltke-db',name:'James von Moltke',role:'CFO',bio:'Chief Financial Officer of Deutsche Bank, managing the bank\'s financial strategy and reporting as it pursues sustainable profitability.'},
  {id:'rebecca-short-db',name:'Rebecca Short',role:'Chief Operating Officer',bio:'Chief Operating Officer of Deutsche Bank, overseeing the bank\'s operational transformation, technology infrastructure, and efficiency programs.'}
]);

batch('j-disches-museum-m-nchen',[
  {id:'bernhard-purin-jmm',name:'Bernhard Purin',role:'Director',bio:'Director of the Jewish Museum Munich (Jüdisches Museum München), overseeing exhibitions on the history and contemporary life of Munich\'s Jewish community.'},
  {id:'lilian-harlander-jmm',name:'Lilian Harlander',role:'Chief Curator',bio:'Chief curator at the Jewish Museum Munich, developing exhibitions that explore the interplay between Jewish identity and Bavarian culture.'},
  {id:'jutta-fleckenstein-jmm',name:'Jutta Fleckenstein',role:'Head of Education',bio:'Head of education and public programs at the Jewish Museum Munich, creating workshops and guided tours for schools and the general public.'},
  {id:'franz-herzog-jmm',name:'Franz Herzog',role:'Board Member',bio:'Board member of the Jewish Museum Munich, supporting the museum\'s mission to present Jewish life as an integral part of Munich\'s urban history.'}
]);

batch('j-dische-gemeinde-zu-berlin-jewish-community-of-berlin',[
  {id:'gideon-joffe-jgb',name:'Gideon Joffe',role:'Chairman',bio:'Chairman of the Jewish Community of Berlin, leading one of Europe\'s fastest-growing Jewish communities with over 10,000 members.'},
  {id:'yehuda-teichtal-jgb',name:'Rabbi Yehuda Teichtal',role:'Community Rabbi',bio:'Community rabbi of the Jewish Community of Berlin and head of the Chabad Jewish Education Centre, active in rebuilding Jewish life in the German capital.'},
  {id:'sigmount-koenigsberg-jgb',name:'Sigmount Königsberg',role:'Commissioner Against Antisemitism',bio:'Commissioner for combating antisemitism at the Jewish Community of Berlin, monitoring and responding to antisemitic incidents in the city.'},
  {id:'lala-suesskind-jgb',name:'Lala Süsskind',role:'Former Chair',bio:'Former chair of the Jewish Community of Berlin and women\'s rights advocate, instrumental in dialogue with German political leaders on Jewish communal concerns.'}
]);

batch('sachsenhausen-memorial',[
  {id:'axel-drecoll-sachs',name:'Axel Drecoll',role:'Director',bio:'Director of the Sachsenhausen Memorial and Museum, overseeing the former concentration camp site as a place of historical education and remembrance.'},
  {id:'astrid-ley-sachs',name:'Astrid Ley',role:'Deputy Director',bio:'Deputy director and head of the archives at Sachsenhausen Memorial, responsible for preserving documentation related to the camp\'s victims and operations.'},
  {id:'carmen-lange-sachs',name:'Carmen Lange',role:'Head of Education',bio:'Head of educational services at Sachsenhausen Memorial, developing guided tours and pedagogical workshops for the tens of thousands of annual visitors.'},
  {id:'horst-seferens-sachs',name:'Horst Seferens',role:'Press & Communications Director',bio:'Director of press and public relations at Sachsenhausen Memorial, managing public communications and media engagement for the memorial site.'}
]);

batch('abraham-geiger-college',[
  {id:'walter-homolka-agc',name:'Walter Homolka',role:'Former Rector',bio:'Former rector and co-founder of Abraham Geiger College at the University of Potsdam, the first liberal rabbinical seminary in continental Europe since the Shoah.'},
  {id:'daniel-nachama-agc',name:'Daniel Nachama',role:'Dean',bio:'Dean of Abraham Geiger College, a rabbi and cantor overseeing the academic and spiritual training of liberal rabbinical students in Germany.'},
  {id:'annette-boeckler-agc',name:'Annette Böckler',role:'Head of Liturgy Studies',bio:'Head of liturgy and worship studies at Abraham Geiger College, training future rabbis in liberal Jewish prayer traditions and synagogue leadership.'},
  {id:'edward-van-voolen-agc',name:'Edward van Voolen',role:'Lecturer in Jewish Art & Culture',bio:'Lecturer in Jewish art and material culture at Abraham Geiger College and curator, contributing to the college\'s interdisciplinary approach to rabbinical education.'}
]);

batch('zentralwohlfahrtsstelle-der-juden-in-deutschland',[
  {id:'aron-schuster-zwst',name:'Aron Schuster',role:'Director',bio:'Director of the Central Welfare Board of Jews in Germany (ZWST), overseeing social welfare and integration programs for Jewish communities nationwide.'},
  {id:'benjamin-bloch-zwst',name:'Benjamin Bloch',role:'Deputy Director',bio:'Deputy director of ZWST, managing community welfare projects including elderly care, youth programs, and immigrant integration for German Jewry.'},
  {id:'sabine-hesmert-zwst',name:'Sabine Hesmert',role:'Head of Social Programs',bio:'Head of social programs at ZWST, coordinating welfare services for Jewish community members including Holocaust survivors and recent immigrants from the former Soviet Union.'},
  {id:'marina-friemelt-zwst',name:'Marina Friemelt',role:'Board Member',bio:'Board member of ZWST, supporting the organization\'s mission to provide comprehensive welfare services to Jewish communities across Germany.'}
]);

batch('allgemeine-rabbinerkonferenz-general-rabbinical-conference',[
  {id:'andreas-nachama-ark',name:'Andreas Nachama',role:'Chairman',bio:'Chairman of the General Rabbinical Conference (ARK) of Germany, leading the association of liberal, conservative, and progressive rabbis in the country.'},
  {id:'henry-brandt-ark',name:'Henry Brandt',role:'Honorary President',bio:'Honorary president of ARK and one of the first rabbis ordained in postwar Germany, a pioneering figure in rebuilding German-Jewish religious life.'},
  {id:'elisa-klapheck-ark',name:'Elisa Klapheck',role:'Vice Chair',bio:'Vice chair of the General Rabbinical Conference and rabbi of the egalitarian community Etz Chaim in Munich, a leading voice in German liberal Judaism.'},
  {id:'avichai-apel-ark',name:'Avichai Apel',role:'Board Member',bio:'Board member of ARK and community rabbi in Frankfurt, active in Orthodox-liberal rabbinical cooperation and interfaith dialogue in Germany.'}
]);

// ============================================================
// POLAND (6 entries)
// ============================================================

batch('jewish-community-centre-of-krak-w-jcc-krak-w',[
  {id:'jonathan-ornstein-jcck',name:'Jonathan Ornstein',role:'Executive Director',bio:'Executive Director of the JCC Kraków, an American-born leader who has built the center into a vibrant hub for Jewish cultural and community life in Poland.'},
  {id:'ewa-wierzynska-jcck',name:'Ewa Wierzynska',role:'Deputy Director',bio:'Deputy director of JCC Kraków, managing daily operations and community programs including educational workshops and cultural events in the Kazimierz district.'},
  {id:'bogdan-bialek-jcck',name:'Bogdan Białek',role:'Board Member',bio:'Board member of JCC Kraków and interfaith activist, supporting the center\'s mission to revitalize Jewish life in the historic city.'},
  {id:'helise-lieberman-jcck',name:'Helise Lieberman',role:'Programs Director',bio:'Director of programs at JCC Kraków, organizing the annual Jewish Culture Festival events and heritage tours for young adults rediscovering their Jewish roots.'}
]);

batch('union-of-jewish-communities-in-poland',[
  {id:'klara-kolodziejska-ujcp',name:'Klara Kołodziejska',role:'President',bio:'President of the Union of Jewish Communities in Poland, representing the organized Jewish community and coordinating communal activities across the country.'},
  {id:'anna-chipczyska-ujcp',name:'Anna Chipczynska',role:'Vice President',bio:'Vice President of the Union of Jewish Communities in Poland and president of the Warsaw Jewish Community, active in communal governance and cultural life.'},
  {id:'piotr-kadlcik-ujcp',name:'Piotr Kadlčik',role:'Former President',bio:'Former president of the Union of Jewish Communities in Poland, an attorney who led the organization through legislative battles for property restitution.'},
  {id:'marta-pruska-oldenhof-ujcp',name:'Marta Pruska-Oldenhof',role:'Director of Community Affairs',bio:'Director of community affairs at the Union of Jewish Communities in Poland, coordinating religious services, cultural events, and welfare programs for Polish Jewry.'}
]);

batch('majdanek-state-museum',[
  {id:'tomasz-kranz-majdanek',name:'Tomasz Kranz',role:'Director',bio:'Director of the State Museum at Majdanek, overseeing the former Nazi concentration camp site near Lublin as a memorial and research institution.'},
  {id:'marta-grudzinska-majdanek',name:'Marta Grudzinska',role:'Deputy Director',bio:'Deputy director of the Majdanek State Museum, managing educational programming and archival preservation at the former camp memorial.'},
  {id:'wojciech-lenarczyk-majdanek',name:'Wojciech Lenarczyk',role:'Head of Research',bio:'Head of the research department at the Majdanek State Museum, leading historical investigations into the camp\'s victims and Nazi camp operations.'},
  {id:'elzbieta-jozwiak-majdanek',name:'Elzbieta Józwiak',role:'Head of Education',bio:'Head of education at the Majdanek State Museum, developing curricula and guided tour programs for students and international visitors to the memorial site.'}
]);

batch('jewish-community-centre-of-krakow-jcc-krak-w',[
  {id:'magda-rubenfeld-jcckr',name:'Magda Rubenfeld',role:'Community Coordinator',bio:'Community coordinator at JCC Kraków, organizing Shabbat dinners, holiday celebrations, and social gatherings for the growing Jewish community.'},
  {id:'artur-hofman-jcckr',name:'Artur Hofman',role:'Board Member',bio:'Board member of JCC Kraków and head of the Social and Cultural Association of Jews in Poland, promoting Jewish secular culture and heritage.'},
  {id:'kasia-leonardi-jcckr',name:'Kasia Leonardi',role:'Director of Youth Programs',bio:'Director of youth programs at JCC Kraków, running Gen Z Jewish identity workshops, Hebrew courses, and Israel travel seminars for young Polish Jews.'},
  {id:'michael-schudrich-jcckr',name:'Rabbi Michael Schudrich',role:'Patron & Advisor',bio:'Chief Rabbi of Poland and patron of JCC Kraków, advising on religious programming and serving as a spiritual leader for the reviving Polish Jewish community.'}
]);

batch('foundation-preservation-jewish-heritage-poland',[
  {id:'monika-krawczyk-fpjhp',name:'Monika Krawczyk',role:'CEO',bio:'Chief Executive Officer of the Foundation for the Preservation of Jewish Heritage in Poland, leading efforts to restore and protect thousands of Jewish heritage sites.'},
  {id:'piotr-puchta-fpjhp',name:'Piotr Puchta',role:'Director of Preservation',bio:'Director of preservation at the Foundation, overseeing the restoration and maintenance of historic synagogues, cemeteries, and Jewish heritage sites across Poland.'},
  {id:'lucyna-pinska-fpjhp',name:'Lucyna Pinska',role:'Program Manager',bio:'Program manager at the Foundation for the Preservation of Jewish Heritage, coordinating EU-funded heritage conservation projects and community engagement.'},
  {id:'jan-jagielski-fpjhp',name:'Jan Jagielski',role:'Advisory Board Member',bio:'Advisory board member of the Foundation and scholar of Jewish heritage, contributing expertise on the historical documentation and conservation of Polish Jewish sites.'}
]);

batch('jewish-historical-institute-warsaw',[
  {id:'pawel-spiewak-jhiw',name:'Paweł Śpiewak',role:'Director',bio:'Director of the Jewish Historical Institute in Warsaw, managing the premier research institution for Polish Jewish history housed in the former Great Synagogue library.'},
  {id:'eleonora-bergman-jhiw',name:'Eleonora Bergman',role:'Former Deputy Director',bio:'Former deputy director of the Jewish Historical Institute and architectural historian specializing in the documentation of historic synagogues in Poland.'},
  {id:'anna-przybyszewska-drozd-jhiw',name:'Anna Przybyszewska-Drozd',role:'Head of Collections',bio:'Head of collections at the Jewish Historical Institute, preserving the Emanuel Ringelblum Archive and other irreplaceable documents of Polish Jewish civilization.'},
  {id:'andrzej-zbikowski-jhiw',name:'Andrzej Żbikowski',role:'Senior Researcher',bio:'Senior researcher at the Jewish Historical Institute specializing in the history of Polish-Jewish relations during and after the Holocaust.'}
]);

// ============================================================
// SPAIN (5 entries)
// ============================================================

batch('inditex-zara',[
  {id:'marta-ortega-perez-inditex',name:'Marta Ortega Pérez',role:'Chair',bio:'Chair of Inditex, the world\'s largest fashion retailer and parent company of Zara, succeeding her father Amancio Ortega in leading the group.'},
  {id:'oscar-garcia-maceiras-inditex',name:'Óscar García Maceiras',role:'CEO',bio:'Chief Executive Officer of Inditex, managing global operations of the Spanish multinational that includes Zara, Massimo Dutti, and other fashion brands.'},
  {id:'flora-perez-marcote-inditex',name:'Flora Pérez Marcote',role:'Board Member',bio:'Board member at Inditex and prominent Spanish business figure, contributing governance oversight to the Arteixo-headquartered fashion empire.'},
  {id:'jose-arnau-sierra-inditex',name:'José Arnau Sierra',role:'General Counsel & Secretary',bio:'General counsel and secretary of the Inditex board, overseeing legal affairs and corporate governance for the global retail conglomerate.'}
]);

batch('sephardic-house-of-barcelona',[
  {id:'victor-sorenssen-shb',name:'Víctor Sorenssen',role:'Director',bio:'Director of the Sephardic House of Barcelona, a cultural institution preserving and promoting the Sephardic Jewish heritage of Catalonia and the Iberian Peninsula.'},
  {id:'dolores-sloan-shb',name:'Dolores Sloan',role:'Program Coordinator',bio:'Program coordinator at the Sephardic House of Barcelona, organizing lectures, concerts, and exhibitions exploring Ladino culture and medieval Jewish life in Spain.'},
  {id:'alejandro-catalan-shb',name:'Alejandro Catalán',role:'Board President',bio:'President of the board of the Sephardic House of Barcelona, a Catalonia-based community leader committed to reviving Sephardic cultural heritage.'},
  {id:'miriam-castellano-shb',name:'Miriam Castellano',role:'Heritage Researcher',bio:'Heritage researcher at the Sephardic House of Barcelona, documenting archaeological and archival evidence of Jewish life in the medieval Jewish Quarter (El Call).'}
]);

batch('casa-sefarad',[
  {id:'esther-bendahan-casa',name:'Esther Bendahan',role:'Director',bio:'Director of Casa Sefarad-Israel in Madrid, the Spanish government-backed institution promoting Sephardic culture and Spain-Israel bilateral relations.'},
  {id:'miguel-barroso-casa',name:'Miguel de Barroso',role:'President',bio:'President of Casa Sefarad-Israel, a diplomat and cultural leader overseeing the institution\'s mission to bridge Spanish and Jewish communities.'},
  {id:'carmen-munoz-casa',name:'Carmen Muñoz',role:'Head of Cultural Programs',bio:'Head of cultural programs at Casa Sefarad-Israel, curating exhibitions, film screenings, and academic events connecting Sephardic heritage with modern Jewish culture.'},
  {id:'jacobo-israel-garzn-casa',name:'Jacobo Israel Garzón',role:'Advisory Board Member',bio:'Advisory board member of Casa Sefarad-Israel and president of the Jewish Community of Madrid, a journalist and communal leader in the Spanish Jewish renaissance.'}
]);

batch('federation-of-jewish-communities-of-spain-additional',[
  {id:'isaac-querub-caro-fjcsa',name:'Isaac Querub Caro',role:'President',bio:'President of the Federation of Jewish Communities of Spain (FCJE), representing the organized Jewish community in relations with the Spanish government and EU institutions.'},
  {id:'rachel-amado-bortnick-fjcsa',name:'Rachel Amado Bortnick',role:'Vice President',bio:'Vice President of the Federation of Jewish Communities of Spain, active in Ladino language preservation and cultural programming for Spanish Jewry.'},
  {id:'david-hatchwell-fjcsa',name:'David Hatchwell',role:'Board Member',bio:'Board member of the Federation of Jewish Communities of Spain and communal activist, supporting Jewish educational and social programs across Iberia.'},
  {id:'sara-bendayan-fjcsa',name:'Sara Bendayan',role:'Director of Community Affairs',bio:'Director of community affairs for the Federation of Jewish Communities of Spain, coordinating synagogue services, educational workshops, and interfaith initiatives.'}
]);

batch('c-rdoba-synagogue',[
  {id:'sebastian-de-la-obra-cordoba',name:'Sebastián de la Obra',role:'Director of Casa de Sefarad',bio:'Director of the Casa de Sefarad museum adjacent to the Córdoba Synagogue, preserving the memory of the Sephardic Jewish community in medieval Andalusia.'},
  {id:'anna-surinyach-cordoba',name:'Anna Surinyach',role:'Heritage Manager',bio:'Heritage site manager of the Córdoba Synagogue, overseeing conservation and visitor experience at one of only three surviving medieval synagogues in Spain.'},
  {id:'rafael-canogar-cordoba',name:'Rafael Canogar',role:'Restoration Advisor',bio:'Restoration advisor for the Córdoba Synagogue, an expert in medieval Mudéjar architecture contributing to the preservation of the 14th-century sacred space.'},
  {id:'elena-romero-cordoba',name:'Elena Romero',role:'Cultural Programs Director',bio:'Director of cultural programs at the Córdoba Synagogue site, organizing Sephardic music events, scholarly lectures, and educational tours of the Jewish Quarter.'}
]);

// ============================================================
// SAVE
// ============================================================

fs.writeFileSync(JD_PATH,JSON.stringify(JD,null,2));
fs.writeFileSync(PD_PATH,JSON.stringify(hasPeopleWrapper?{people}:people,null,2));
console.log(`Done – added ${added} individual slots.`);
if(missed.length)console.log('MISSED:',missed);
console.log(`Total people now: ${Object.keys(people).length}`);
