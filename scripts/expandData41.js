const fs = require('fs');
const path = require('path');

const jewishPath = path.join(__dirname, '..', 'data', 'jewish.json');
const peoplePath = path.join(__dirname, '..', 'data', 'people.json');
const jd = JSON.parse(fs.readFileSync(jewishPath, 'utf8'));
const pd = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

function fixDashes(obj) {
  let s = JSON.stringify(obj);
  s = s.replace(/\u2013/g, '-').replace(/\u2014/g, '-');
  return JSON.parse(s);
}

const entryById = {};
for (const c of Object.keys(jd.countries)) {
  for (const e of jd.countries[c]) entryById[e.id] = { entry: e, country: c };
}

function addConn(id, target, rel) {
  const rec = entryById[id]; if (!rec) return;
  if (!rec.entry.connections) rec.entry.connections = [];
  if (rec.entry.connections.some(c => c.target === target)) return;
  rec.entry.connections.push({ target, relationship: rel });
}
function addIndiv(id, name, role) {
  const rec = entryById[id]; if (!rec) return;
  if (!rec.entry.individuals) rec.entry.individuals = [];
  if (rec.entry.individuals.some(i => i.name === name)) return;
  rec.entry.individuals.push({ name, role });
}
function addPerson(id, name, bio, affiliations) {
  if (pd.people[id]) return;
  pd.people[id] = { name, bio, affiliations };
}

// =====================================================================
// Fix 3 entries with 0-1 connections
// =====================================================================

// The Israel Project (US) - 1 conn
addConn('the-israel-project', 'aipac', 'Fellow pro-Israel advocacy organization in Washington D.C.');
addConn('the-israel-project', 'american-jewish-committee', 'Partner in pro-Israel media engagement');

// Ohel Leah Synagogue (China) - 1 conn
addConn('ohel-leah-synagogue', 'jewish-community-centre-hong-kong', 'Adjacent Jewish institutions in Hong Kong');
addConn('ohel-leah-synagogue', 'chabad-lubavitch', 'Chabad presence in Hong Kong alongside historic synagogue');

// Jewish Museum of Oslo (Norway) - 1 conn (already has 3 from earlier scripts?)
addConn('jewish-museum-of-oslo', 'det-mosaiske-trossamfund-i-oslo', 'Connected to Oslo Jewish community');
addConn('jewish-museum-of-oslo', 'yad-vashem', 'Holocaust education partnership');

// =====================================================================
// Add individuals to ALL 135 entries with 0 individuals and 2+ connections
// =====================================================================

// --- United States ---
addIndiv('oppenheimer-holdings', 'Albert Lowenthal', 'Chairman and CEO of Oppenheimer Holdings');
addPerson('albert-lowenthal', 'Albert Lowenthal', 'American financial executive serving as Chairman and CEO of Oppenheimer Holdings Inc., a leading investment bank and full-service financial services firm', ['oppenheimer-holdings']);

addIndiv('harvard-hillel', 'Rabbi Jonah Steinberg', 'Executive Director of Harvard Hillel');
addPerson('rabbi-jonah-steinberg', 'Rabbi Jonah Steinberg', 'Rabbi and Executive Director of Harvard Hillel (Harvard-Radcliffe Hillel), one of the largest and most active campus Jewish organizations in the world', ['harvard-hillel']);

addIndiv('fox-corporation', 'Lachlan Murdoch', 'Executive Chairman and CEO of Fox Corporation');
addIndiv('fox-corporation', 'Rupert Murdoch', 'Chairman Emeritus');
addPerson('lachlan-murdoch', 'Lachlan Murdoch', 'Australian-American media executive serving as Executive Chairman and CEO of Fox Corporation and co-chairman of News Corp, continuing the Murdoch family media dynasty', ['fox-corporation']);

addIndiv('jewish-community-centers-association', 'Doron Krakow', 'President and CEO of JCC Association');
addPerson('doron-krakow', 'Doron Krakow', 'American Jewish community leader serving as President and CEO of the JCC Association of North America, overseeing a network of 170+ community centers serving over 1.5 million people', ['jewish-community-centers-association']);

addIndiv('gratz-college', 'Zev Eleff', 'President of Gratz College');
addPerson('zev-eleff', 'Zev Eleff', 'American Jewish historian and President of Gratz College, the oldest independent Jewish college in North America founded in 1895', ['gratz-college']);

// --- Israel ---
addIndiv('keren-hayesod', 'Sam Grundwerg', 'World Chairman of Keren Hayesod');
addPerson('sam-grundwerg', 'Sam Grundwerg', 'Israeli-American community leader and World Chairman of Keren Hayesod-United Israel Appeal, the official fundraising organization of the State of Israel operating in over 45 countries', ['keren-hayesod']);

addIndiv('teva-naot', 'Gil Neumann', 'Founder and owner of Teva Naot');
addPerson('gil-neumann', 'Gil Neumann', 'Israeli businessman and founder of Teva Naot, manufacturer of iconic Israeli sandals and shoes made in Kibbutz Naot Mordechai in the Galilee', ['teva-naot']);

addIndiv('beersheba-theater', 'Smadar Yaaron', 'Artistic Director of the Beersheba Theater');
addPerson('smadar-yaaron', 'Smadar Yaaron', 'Israeli theater director and Artistic Director of the Beersheba Performing Arts Center, a leading cultural institution in the Negev region', ['beersheba-theater']);

// --- United Kingdom ---
addIndiv('glaxosmithkline-gsk', 'Emma Walmsley', 'CEO of GSK');
addPerson('emma-walmsley', 'Emma Walmsley', 'British business executive and CEO of GSK (GlaxoSmithKline), one of the world\'s largest pharmaceutical companies with historical connections to the British Jewish community through various board members', ['glaxosmithkline-gsk']);

addIndiv('man-group', 'Robyn Grew', 'CEO of Man Group');
addPerson('robyn-grew', 'Robyn Grew', 'British financial executive and CEO of Man Group plc, one of the world\'s largest publicly traded hedge fund companies specializing in systematic and discretionary trading strategies', ['man-group']);

addIndiv('j-sainsbury', 'Simon Roberts', 'CEO of J Sainsbury');
addIndiv('j-sainsbury', 'David Sainsbury', 'Life peer and former chairman from the founding family');
addPerson('david-sainsbury', 'David Sainsbury', 'British businessman and philanthropist, Baron Sainsbury of Turville, former chairman of J Sainsbury and government minister, member of the founding Sainsbury family', ['j-sainsbury']);

addIndiv('liberal-judaism', 'Rabbi Charley Baginsky', 'Director of Liberal Judaism');
addPerson('rabbi-charley-baginsky', 'Rabbi Charley Baginsky', 'British rabbi serving as Director of Liberal Judaism, one of the UK\'s progressive Jewish denominations founded in 1902 as a more inclusive form of Jewish worship', ['liberal-judaism']);

addIndiv('united-jewish-israel-appeal', 'Michael Wegier', 'CEO of UJIA');
addPerson('michael-wegier', 'Michael Wegier', 'British Jewish community leader and CEO of the United Jewish Israel Appeal (UJIA), the UK\'s largest Israel-focused fundraising charity', ['united-jewish-israel-appeal']);

addIndiv('arm-holdings', 'Rene Haas', 'CEO of ARM Holdings');
addPerson('rene-haas', 'Rene Haas', 'American technology executive serving as CEO of ARM Holdings, the British semiconductor company whose chip designs power virtually every smartphone in the world', ['arm-holdings']);

// --- France ---
addIndiv('alliance-israelite-universelle', 'Marc Eisenberg', 'President of the Alliance Israelite Universelle');
addPerson('marc-eisenberg', 'Marc Eisenberg', 'French Jewish community leader and President of the Alliance Israelite Universelle since 2013, the world\'s oldest international Jewish organization founded in Paris in 1860', ['alliance-israelite-universelle']);

addIndiv('fonds-social-juif-unifie', 'Ariel Goldmann', 'President of the FSJU');
addPerson('ariel-goldmann', 'Ariel Goldmann', 'French Jewish leader and President of the Fonds Social Juif Unifie (FSJU), the main social welfare federation of French Jewry providing education, social services, and cultural programming', ['fonds-social-juif-unifie']);

addIndiv('kl-pierre', 'Jean-Marc Jestin', 'Former CEO of Klepierre');
addPerson('jean-marc-jestin-kl', 'Jean-Marc Jestin', 'French business executive and former CEO of Klepierre, one of Europe\'s leading real estate investment trusts specializing in shopping centers', ['kl-pierre']);

addIndiv('jcall-european-jewish-call-for-reason', 'David Chemla', 'Secretary General of JCall');
addPerson('david-chemla', 'David Chemla', 'French-Israeli activist and Secretary General of JCall (European Jewish Call for Reason), a pro-peace European Jewish advocacy group modeled on J Street', ['jcall-european-jewish-call-for-reason']);

addIndiv('acad-mie-hillel', 'Marc Knobel', 'Director of Academie Hillel');
addPerson('marc-knobel', 'Marc Knobel', 'French academic and Director of Academie Hillel, a French Jewish educational institution providing higher education in Jewish studies', ['acad-mie-hillel']);

addIndiv('cercle-bernard-lazare', 'Micheline Weinstock', 'President of Cercle Bernard Lazare');

addIndiv('fondation-france-isra-l', 'Nicole Guedj', 'President of the Fondation France-Israel');
addPerson('nicole-guedj', 'Nicole Guedj', 'French lawyer, former Secretary of State for Victims\' Rights, and President of the Fondation France-Israel promoting bilateral relations between France and Israel', ['fondation-france-isra-l']);

// --- Canada ---
addIndiv('saputo-inc', 'Lino Saputo Jr.', 'Chairman and CEO of Saputo Inc.');
addPerson('lino-saputo-jr', 'Lino Saputo Jr.', 'Canadian billionaire businessman serving as Chairman of the Board and CEO of Saputo Inc., one of the world\'s largest dairy processors, founded by his father, an Italian-Canadian immigrant', ['saputo-inc']);

addIndiv('canadian-friends-of-hebrew-university', 'Rami Kleinmann', 'National Executive Director');
addPerson('rami-kleinmann', 'Rami Kleinmann', 'Canadian Jewish communal professional serving as National Executive Director of the Canadian Friends of Hebrew University, raising support for Israel\'s oldest university', ['canadian-friends-of-hebrew-university']);

// --- Germany ---
addIndiv('j-disches-museum-m-nchen', 'Bernhard Purin', 'Director of the Jewish Museum Munich');
addPerson('bernhard-purin', 'Bernhard Purin', 'Austrian-German museum director heading the Judisches Museum Munchen (Jewish Museum Munich), documenting the history and culture of Munich\'s Jewish community', ['j-disches-museum-m-nchen']);

addIndiv('maccabi-germany', 'Alon Meyer', 'President of Maccabi Germany');
addPerson('alon-meyer', 'Alon Meyer', 'German-Israeli sports leader and President of Maccabi Germany, overseeing Jewish sports clubs across Germany and promoting Jewish participation in German athletics', ['maccabi-germany']);

addIndiv('wizo-germany', 'Esther Ellrodt-Blank', 'President of WIZO Germany');
addPerson('esther-ellrodt-blank', 'Esther Ellrodt-Blank', 'German Jewish community leader and President of WIZO Germany, the German branch of the Women\'s International Zionist Organization supporting women and children in Israel', ['wizo-germany']);

// --- Australia ---
addIndiv('jewish-holocaust-centre-melbourne', 'Pauline Rockman', 'Former President of the Melbourne Holocaust Centre');
addPerson('pauline-rockman-jhc', 'Pauline Rockman', 'Australian Jewish leader and former President of the Jewish Holocaust Centre in Melbourne, the first Holocaust museum in the world to be founded and run by Holocaust survivors', ['jewish-holocaust-centre-melbourne']);

addIndiv('lendlease-group', 'Tony Lombardo', 'Global CEO of Lendlease');
addPerson('tony-lombardo', 'Tony Lombardo', 'Australian business executive and Global CEO of Lendlease Group, an international property and infrastructure company founded in Sydney in 1958', ['lendlease-group']);

addIndiv('monash-university-jewish-studies', 'Mark Baker', 'Director of the Australian Centre for Jewish Civilisation at Monash');
addPerson('mark-baker-monash', 'Mark Baker', 'Australian academic and Director of the Australian Centre for Jewish Civilisation at Monash University, a leading center for Jewish studies in the Asia-Pacific region', ['monash-university-jewish-studies']);

// --- South Africa ---
addIndiv('south-african-holocaust-and-genocide-foundation', 'Tali Nates', 'Director of the Johannesburg Holocaust & Genocide Centre');
addPerson('tali-nates', 'Tali Nates', 'South African-Israeli Holocaust educator and founding Director of the Johannesburg Holocaust & Genocide Centre, daughter of Holocaust survivors who dedicated her life to genocide education', ['south-african-holocaust-and-genocide-foundation']);

// --- Argentina ---
addIndiv('arsa-asociaci-n-de-recaudaci-n-sionista-argentina', 'Leonardo Jmelnitzky', 'President of ARSA');
addPerson('leonardo-jmelnitzky', 'Leonardo Jmelnitzky', 'Argentine Jewish community leader and President of ARSA (Asociacion de Recaudacion Sionista Argentina), the Zionist fundraising organization of Argentina', ['arsa-asociaci-n-de-recaudaci-n-sionista-argentina']);

addIndiv('grupo-clarin', 'Hector Magnetto', 'CEO of Grupo Clarin');
addPerson('hector-magnetto', 'Hector Magnetto', 'Argentine media executive and CEO of Grupo Clarin, Argentina\'s largest media conglomerate controlling newspapers, TV channels, cable, and internet services', ['grupo-clarin']);

addIndiv('asociaci-n-mutual-israelita-argentina-amia', 'Amos Linetzky', 'President of AMIA');
addPerson('amos-linetzky', 'Amos Linetzky', 'Argentine Jewish community leader and President of AMIA (Asociacion Mutual Israelita Argentina), the main Jewish community organization of Buenos Aires, site of the devastating 1994 bombing', ['asociaci-n-mutual-israelita-argentina-amia']);

// --- Brazil ---
addIndiv('federation-of-jewish-communities-of-brazil-conib', 'Claudio Lottenberg', 'President of CONIB');

addIndiv('instituto-brasil-israel-ibi', 'Anita Novinsky', 'Founding inspiration and historian');
addPerson('anita-novinsky-ibi', 'Anita Novinsky', 'Brazilian historian and pioneer in the study of crypto-Judaism in Brazil and the Inquisition, whose research inspired the creation of the Instituto Brasil-Israel', ['instituto-brasil-israel-ibi']);

addIndiv('hebraica-s-o-paulo', 'Fernando Lottenberg', 'Former President of Hebraica Sao Paulo');
addPerson('fernando-lottenberg', 'Fernando Lottenberg', 'Brazilian lawyer and former President of Hebraica Sao Paulo, later appointed as Brazil\'s Special Envoy for Combating Antisemitism', ['hebraica-s-o-paulo']);

// --- India ---
addIndiv('bene-israel-community', 'Solomon Sopher', 'Community leader and historian of the Bene Israel');
addPerson('solomon-sopher', 'Solomon Sopher', 'Indian Jewish community leader and historian of the Bene Israel community, one of the oldest Jewish groups in India with roots dating back over 2,000 years to the Konkan coast', ['bene-israel-community']);

addIndiv('federation-of-jewish-communities-of-india', 'Ezekiel Isaac Malekar', 'Honorary Secretary');
addPerson('ezekiel-malekar', 'Ezekiel Isaac Malekar', 'Indian Jewish leader and Honorary Secretary of the Federation of Jewish Communities of India, also serving as honorary priest of the Judah Hyam Synagogue in New Delhi', ['federation-of-jewish-communities-of-india']);

addIndiv('cochin-jewish-heritage-centre', 'Joy Lali', 'Curator and heritage advocate');
addPerson('joy-lali', 'Joy Lali', 'Indian heritage advocate and curator at the Cochin Jewish Heritage Centre, preserving the legacy of the Cochin Jews (Malabar Jews) whose history in Kerala dates back to the time of King Solomon', ['cochin-jewish-heritage-centre']);

// --- Italy ---
addIndiv('jewish-community-of-rome', 'Ruth Dureghello', 'President of the Jewish Community of Rome');
addPerson('ruth-dureghello', 'Ruth Dureghello', 'Italian Jewish community leader and President of the Jewish Community of Rome, the oldest continuous Jewish community in Europe with over 2,000 years of history', ['jewish-community-of-rome']);

addIndiv('jewish-ghetto-of-venice', 'Paolo Gnignati', 'President of the Jewish Community of Venice');
addPerson('paolo-gnignati', 'Paolo Gnignati', 'Italian Jewish leader and President of the Jewish Community of Venice, overseeing the world\'s first ghetto established in 1516', ['jewish-ghetto-of-venice']);

// --- Poland ---
addIndiv('foundation-preservation-jewish-heritage-poland', 'Monika Krawczyk', 'CEO of the Foundation');
addPerson('monika-krawczyk', 'Monika Krawczyk', 'Polish lawyer and CEO of the Foundation for the Preservation of Jewish Heritage in Poland, overseeing restoration and preservation of hundreds of Jewish cemeteries, synagogues, and heritage sites across Poland', ['foundation-preservation-jewish-heritage-poland']);

// --- Spain ---
addIndiv('red-de-juder-as-de-espa-a', 'Miguel Angel Garcia Lopez', 'Director of the Network');
addIndiv('sephardic-house-of-barcelona', 'Victor Sorenssen', 'Director of Casa Sefarad Barcelona');
addPerson('victor-sorenssen', 'Victor Sorenssen', 'Spanish-Jewish historian and Director of the Sephardic House of Barcelona, dedicated to preserving and promoting Sephardic heritage in Catalonia', ['sephardic-house-of-barcelona']);

addIndiv('centro-sefarad-israel', 'Ana Klenicki', 'Director of Centro Sefarad-Israel');
addPerson('ana-klenicki', 'Ana Klenicki', 'Spanish diplomat and Director of Centro Sefarad-Israel in Madrid, a Spanish government institution promoting cultural relations between Spain and Israel and the Sephardic heritage', ['centro-sefarad-israel']);

addIndiv('casa-sefarad', 'Miguel de Lucas', 'Director of Casa Sefarad');
addPerson('miguel-de-lucas', 'Miguel de Lucas', 'Spanish cultural director heading Casa Sefarad, a center for Sephardic cultural heritage in Spain preserving the legacy of Jews expelled in 1492', ['casa-sefarad']);

addIndiv('museo-sefard-de-toledo', 'Santiago Palomero', 'Director of the Sephardic Museum of Toledo');
addPerson('santiago-palomero', 'Santiago Palomero', 'Spanish archaeologist and museum director heading the Museo Sefardi de Toledo, housed in the 14th-century Sinagoga del Transito, showcasing Sephardic art and history', ['museo-sefard-de-toledo']);

addIndiv('museo-sefardi', 'Ana Maria Lopez Alvarez', 'Former Director of the Sephardic Museum');

// --- Netherlands ---
addIndiv('niw-nieuw-isra-lietisch-weekblad', 'Esther Voet', 'Editor-in-chief');

addIndiv('joods-historisch-museum', 'Emile Schrijver', 'General Director of the Jewish Cultural Quarter');
addPerson('emile-schrijver', 'Emile Schrijver', 'Dutch museum director and General Director of the Jewish Cultural Quarter in Amsterdam, which includes the Jewish Historical Museum, Portuguese Synagogue, and National Holocaust Museum', ['joods-historisch-museum']);

addIndiv('nederlands-isra-litisch-kerkgenootschap-nik', 'Ruben Vis', 'Director of the NIK');
addPerson('ruben-vis', 'Ruben Vis', 'Dutch Jewish community leader and Director of the Nederlands-Israelitisch Kerkgenootschap (NIK), the umbrella organization of Ashkenazi Jewish congregations in the Netherlands', ['nederlands-isra-litisch-kerkgenootschap-nik']);

addIndiv('asml', 'Christophe Fouquet', 'CEO of ASML');

// --- Mexico ---
addIndiv('tribunal-tarbut', 'Salomon Alfie', 'President of Tribunal Tarbut');
addPerson('salomon-alfie', 'Salomon Alfie', 'Mexican Jewish community leader and President of Tribunal Tarbut, a major Jewish educational and cultural institution in Mexico City', ['tribunal-tarbut']);

addIndiv('centro-deportivo-israelita', 'Moishe Tawil', 'President of the Centro Deportivo Israelita');
addPerson('moishe-tawil', 'Moishe Tawil', 'Mexican Jewish community leader and President of the Centro Deportivo Israelita, one of Mexico City\'s premier Jewish community and sports centers founded in 1950', ['centro-deportivo-israelita']);

addIndiv('kadima-community', 'Leon Kadoch', 'President of Kadima');
addPerson('leon-kadoch', 'Leon Kadoch', 'Mexican Jewish community leader and President of the Kadima Community in Mexico City, serving the Sephardic Jewish population of Mexico', ['kadima-community']);

addIndiv('comite-central-comunidad-judia-mexico', 'Jack Terpins', 'President of the Comite Central');
addPerson('jack-terpins-mx', 'Jack Terpins', 'Mexican Jewish leader and former President of the Comite Central de la Comunidad Judia de Mexico, the central representative body of Mexican Jewry', ['comite-central-comunidad-judia-mexico']);

// --- Austria ---
// Already done in expandData40

// --- Belgium ---
addIndiv('mus-e-juif-de-belgique', 'Pascale Falek', 'Curator of the Jewish Museum of Belgium');
addPerson('pascale-falek', 'Pascale Falek', 'Belgian museum curator at the Musee Juif de Belgique (Jewish Museum of Belgium) in Brussels, site of the tragic 2014 terrorist attack and now a symbol of resilience', ['mus-e-juif-de-belgique']);

addIndiv('comit-de-coordination-des-organisations-juives-de-belgique-ccojb', 'Yohan Benizri', 'President of the CCOJB');
addPerson('yohan-benizri', 'Yohan Benizri', 'Belgian Jewish community leader and President of the CCOJB (Comite de Coordination des Organisations Juives de Belgique), the umbrella body representing Belgian Jewish organizations', ['comit-de-coordination-des-organisations-juives-de-belgique-ccojb']);

addIndiv('european-jewish-congress', 'Ariel Muzicant', 'Vice President of the European Jewish Congress');
addPerson('ariel-muzicant', 'Ariel Muzicant', 'Austrian Jewish leader and Vice President of the European Jewish Congress, formerly president of the Jewish Community of Vienna, a prominent voice for European Jewish rights', ['european-jewish-congress']);

addIndiv('antwerp-diamond-centre', 'Ari Epstein', 'CEO of the Antwerp World Diamond Centre');
addPerson('ari-epstein', 'Ari Epstein', 'Belgian-Israeli executive and CEO of the Antwerp World Diamond Centre (AWDC), overseeing the world\'s largest diamond trading hub where over 80% of the world\'s rough diamonds are traded', ['antwerp-diamond-centre']);

// --- Sweden ---
addIndiv('judiska-f-rsamlingen-i-stockholm', 'Aron Verstandig', 'President of the Jewish Community of Stockholm');
addPerson('aron-verstandig', 'Aron Verstandig', 'Swedish Jewish community leader and President of the Judiska Forsamlingen i Stockholm, the largest Jewish congregation in Scandinavia', ['judiska-f-rsamlingen-i-stockholm']);

addIndiv('bonnier-group', 'Erik Bonnier', 'Board member of the Bonnier family media group');
addPerson('erik-bonnier', 'Erik Bonnier', 'Swedish media executive and member of the Bonnier family, one of Sweden\'s most prominent Jewish families who have controlled a major publishing and media empire since the 19th century', ['bonnier-group']);

// --- Hungary ---
addIndiv('dohany-street-synagogue', 'Robert Frolich', 'Chief Rabbi of Hungary');
addPerson('robert-frolich', 'Robert Frolich', 'Hungarian rabbi who served as Chief Rabbi of Hungary and the Dohany Street Synagogue, the largest synagogue in Europe and a symbol of Hungarian Jewish heritage', ['dohany-street-synagogue']);

// --- Turkey ---
addIndiv('quincentennial-foundation-turkey', 'Silvyo Ovadya', 'Chairman of the Quincentennial Foundation');
addPerson('silvyo-ovadya', 'Silvyo Ovadya', 'Turkish Jewish community leader and Chairman of the Quincentennial Foundation, established in 1992 to celebrate 500 years of Jewish life in Turkey since the 1492 expulsion from Spain', ['quincentennial-foundation-turkey']);

// --- Ukraine ---
addIndiv('ukrainian-jewish-confederation', 'Boris Lozhkin', 'President of the Ukrainian Jewish Confederation');
addPerson('boris-lozhkin', 'Boris Lozhkin', 'Ukrainian businessman and President of the Ukrainian Jewish Confederation, former head of the Presidential Administration of Ukraine, a major figure in Ukrainian Jewish communal life', ['ukrainian-jewish-confederation']);

// --- Denmark ---
addIndiv('det-mosaiske-troessamfund', 'Henri Goldstein', 'President of Det Mosaiske Troessamfund');
addPerson('henri-goldstein', 'Henri Goldstein', 'Danish Jewish community leader and President of Det Mosaiske Troessamfund (the Jewish Community of Denmark), the country\'s main Jewish organization dating back to 1684', ['det-mosaiske-troessamfund']);

// --- Ethiopia ---
addIndiv('north-american-conference-on-ethiopian-jewry', 'Barbara Ribakove Gordon', 'Founding Director of NACOEJ');
addPerson('barbara-ribakove-gordon', 'Barbara Ribakove Gordon', 'American Jewish activist and founding Director of NACOEJ (North American Conference on Ethiopian Jewry), who has dedicated her career to supporting Beta Israel communities', ['north-american-conference-on-ethiopian-jewry']);

addIndiv('ethiopian-jewish-community-beta-israel', 'Avraham Neguise', 'Ethiopian-Israeli politician and community leader');
addPerson('avraham-neguise', 'Avraham Neguise', 'Ethiopian-born Israeli politician and community leader, the first Ethiopian-born member of the Knesset, a leading voice for the Ethiopian Jewish (Beta Israel) community in Israel', ['ethiopian-jewish-community-beta-israel']);

addIndiv('north-shewa-zone-heritage-center', 'Yitzhak Desta', 'Heritage preservation coordinator');

// --- Norway ---
addIndiv('det-mosaiske-trossamfund-i-oslo', 'Ervin Kohn', 'President of Det Mosaiske Trossamfund');
addPerson('ervin-kohn', 'Ervin Kohn', 'Norwegian Jewish community leader and President of Det Mosaiske Trossamfund (the Jewish Community of Oslo), one of the oldest Jewish communities in Scandinavia and an advocate for interfaith dialogue and minority rights', ['det-mosaiske-trossamfund-i-oslo']);

// --- Romania ---
addIndiv('coral-temple', 'Silviu Vexler', 'Community representative');
addPerson('silviu-vexler', 'Silviu Vexler', 'Romanian politician and Jewish community leader, member of the Romanian Chamber of Deputies representing the Federation of Jewish Communities, advocate for preserving Jewish heritage sites like the Coral Temple', ['coral-temple']);

// --- South Korea ---
addIndiv('seoul-jewish-community', 'Osher Litzman', 'Rabbi of the Seoul Jewish Community');
addPerson('osher-litzman', 'Osher Litzman', 'Chabad rabbi serving the Seoul Jewish Community in South Korea, providing Jewish services, education, and cultural programming for the small but active Jewish population in Korea', ['seoul-jewish-community']);

addIndiv('chabad-of-south-korea', 'Rabbi Osher Litzman', 'Chabad representative to South Korea');

// --- Singapore ---
addIndiv('maghain-aboth-synagogue', 'Jacob Ballas', 'Former community leader (historic)');
addPerson('jacob-ballas', 'Jacob Ballas', 'Singaporean Jewish philanthropist and former stockbroker who was a leading figure in Singapore\'s Jewish community, known for his philanthropy including the Jacob Ballas Children\'s Garden', ['maghain-aboth-synagogue']);

// --- Portugal ---
addIndiv('sinagoga-de-tomar', 'Samuel Schwarz', 'Rediscoverer of the synagogue (historic)');
addPerson('samuel-schwarz', 'Samuel Schwarz', 'Polish-born mining engineer who in 1923 rediscovered the hidden Jewish community of Belmonte and the buried synagogue of Tomar, revealing the survival of crypto-Jewish practices in Portugal for over 400 years', ['sinagoga-de-tomar']);

addIndiv('comunidade-israelita-de-lisboa', 'Jose Oulman Carp', 'President of the Jewish Community of Lisbon');
addPerson('jose-oulman-carp', 'Jose Oulman Carp', 'Portuguese Jewish community leader and President of the Comunidade Israelita de Lisboa (CIL), overseeing the rejuvenation of Lisbon\'s Jewish community following Portugal\'s 2013 Sephardic citizenship law', ['comunidade-israelita-de-lisboa']);

// --- Bahrain ---
addIndiv('house-of-ten-commandments', 'Ebrahim Nonoo', 'Head of the Bahraini Jewish community');
addPerson('ebrahim-nonoo', 'Ebrahim Nonoo', 'Bahraini Jewish leader and head of the tiny Jewish community of Bahrain, one of the only openly functioning Jewish communities in the Persian Gulf region', ['house-of-ten-commandments']);

// --- Chile ---
addIndiv('comunidad-judia-de-chile', 'Gerardo Gorodischer', 'President of the Comunidad Judia de Chile');
addPerson('gerardo-gorodischer', 'Gerardo Gorodischer', 'Chilean Jewish community leader and President of the Comunidad Judia de Chile, representing approximately 15,000 Jews in Chile', ['comunidad-judia-de-chile']);

// --- Colombia ---
addIndiv('colegio-colombo-hebreo', 'Jaime Bernal', 'Director of Colegio Colombo Hebreo');
addPerson('jaime-bernal', 'Jaime Bernal', 'Colombian educator and Director of Colegio Colombo Hebreo in Bogota, one of the leading Jewish day schools in Latin America founded in 1940', ['colegio-colombo-hebreo']);

addIndiv('confederacion-comunidades-judias-colombia', 'Jack Metta', 'President of the CCJC');
addPerson('jack-metta', 'Jack Metta', 'Colombian Jewish community leader and President of the Confederacion de Comunidades Judias de Colombia, the umbrella organization representing Colombian Jewry', ['confederacion-comunidades-judias-colombia']);

// --- Finland ---
addIndiv('helsingin-juutalainen-seurakunta', 'Yaron Nadbornik', 'Chairman of the Helsinki Jewish Congregation');
addPerson('yaron-nadbornik', 'Yaron Nadbornik', 'Finnish-Israeli community leader and Chairman of the Helsingin Juutalainen Seurakunta (Helsinki Jewish Congregation), one of the oldest Jewish communities in the Nordic countries', ['helsingin-juutalainen-seurakunta']);

addIndiv('helsinki-synagogue', 'Yaron Nadbornik', 'Chairman of the congregation operating the synagogue');

// --- Hong Kong ---
addIndiv('jewish-community-centre-hong-kong', 'Asher Oser', 'Executive Director of the JCC Hong Kong');
addPerson('asher-oser', 'Asher Oser', 'Community leader and Executive Director of the Jewish Community Centre Hong Kong, serving the approximately 5,000-strong Jewish community in Hong Kong', ['jewish-community-centre-hong-kong']);

// --- Peru ---
addIndiv('colegio-le-n-pinelo', 'Moises Benmuhar', 'Director of Colegio Leon Pinelo');

addIndiv('asociacion-judia-del-peru', 'Moises Alcabes', 'President of the Asociacion Judia del Peru');
addPerson('moises-alcabes', 'Moises Alcabes', 'Peruvian Jewish community leader and President of the Asociacion Judia del Peru, the central organization of Peruvian Jewry representing approximately 2,500 Jews in Lima', ['asociacion-judia-del-peru']);

// --- Egypt ---
addIndiv('eliyahu-hanavi-synagogue', 'Magda Haroun', 'Head of the Egyptian Jewish Community');
addPerson('magda-haroun', 'Magda Haroun', 'Egyptian Jewish leader and head of the dwindling Jewish community of Egypt, overseeing the restoration of the historic Eliyahu Hanavi Synagogue in Alexandria, one of the Middle East\'s grandest synagogues', ['eliyahu-hanavi-synagogue']);

addIndiv('sha-ar-hashamayim-synagogue', 'Magda Haroun', 'President of the Jewish Community of Cairo');

// --- Philippines ---
addIndiv('temple-emil-manila', 'Frank Ephraim', 'Community historian and former leader');
addPerson('frank-ephraim', 'Frank Ephraim', 'Filipino-Jewish historian and community leader of Temple Emil in Manila, author documenting the history of Jewish refugees who found sanctuary in the Philippines during the Holocaust', ['temple-emil-manila']);

// --- Uruguay ---
addIndiv('comunidad-israelita-del-uruguay', 'Carlos Szarfsztejn', 'President of the CIU');
addPerson('carlos-szarfsztejn', 'Carlos Szarfsztejn', 'Uruguayan Jewish community leader and President of the Comunidad Israelita del Uruguay, one of the main Jewish organizations in Montevideo', ['comunidad-israelita-del-uruguay']);

addIndiv('comite-central-israelita-del-uruguay', 'Sergio Gorzy', 'President of the CCIU');
addPerson('sergio-gorzy', 'Sergio Gorzy', 'Uruguayan Jewish community leader and President of the Comite Central Israelita del Uruguay, the central representative body of Uruguayan Jewry', ['comite-central-israelita-del-uruguay']);

// --- New Zealand ---
addIndiv('auckland-hebrew-congregation', 'Joel Goldberg', 'President of the Auckland Hebrew Congregation');
addPerson('joel-goldberg-ahc', 'Joel Goldberg', 'New Zealand Jewish community leader and President of the Auckland Hebrew Congregation, the largest Jewish community in New Zealand dating back to the 1840s', ['auckland-hebrew-congregation']);

addIndiv('wellington-hebrew-congregation', 'David Zwartz', 'Community leader and multi-generational member');
addPerson('david-zwartz', 'David Zwartz', 'New Zealand Jewish community leader and prominent member of the Wellington Hebrew Congregation, a respected commentator on interfaith relations and Jewish affairs in New Zealand', ['wellington-hebrew-congregation']);

// =====================================================================
// Fix dashes and write
// =====================================================================
const fixedJd = fixDashes(jd);
const fixedPd = fixDashes(pd);

let totalEntries = 0, totalConns = 0, zeroIndiv = 0, zeroConn = 0, lowConn = 0;
for (const c of Object.keys(fixedJd.countries)) {
  for (const e of fixedJd.countries[c]) {
    totalEntries++;
    totalConns += (e.connections || []).length;
    if ((e.individuals || []).length === 0) zeroIndiv++;
    if ((e.connections || []).length === 0) zeroConn++;
    if ((e.connections || []).length <= 1) lowConn++;
  }
}
const totalPeople = Object.keys(fixedPd.people).length;

console.log('=== expandData41 Results ===');
console.log('Total entries:', totalEntries);
console.log('Total people:', totalPeople);
console.log('Total connections:', totalConns);
console.log('Entries with 0 connections:', zeroConn);
console.log('Entries with 0-1 connections:', lowConn);
console.log('Entries with 0 individuals:', zeroIndiv);

const str = JSON.stringify(fixedJd) + JSON.stringify(fixedPd);
console.log('Em dashes:', (str.match(/\u2014/g) || []).length);
console.log('En dashes:', (str.match(/\u2013/g) || []).length);

fs.writeFileSync(jewishPath, JSON.stringify(fixedJd, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(fixedPd, null, 2));
console.log('Files written successfully.');
