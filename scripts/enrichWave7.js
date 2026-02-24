// Wave 7: Final enrichment of ALL remaining thin entries (<200 char descriptions)
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'jewish.json');
const peoplePath = path.join(__dirname, '..', 'data', 'people.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function addPerson(id, name, bio) {
  if (!peopleData.people[id]) peopleData.people[id] = { name, bio, notes: '', affiliations: [] };
}

function enrichEntry(entryId, updates) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) {
        if (updates.description) entry.description = updates.description;
        if (updates.individuals) {
          if (!entry.individuals) entry.individuals = [];
          for (const ind of updates.individuals) {
            if (!entry.individuals.some(i => i.id === ind.id)) {
              entry.individuals.push(ind);
              addPerson(ind.id, ind.name, ind.bio);
            }
          }
        }
        if (updates.connections) {
          if (!entry.connections) entry.connections = [];
          for (const conn of updates.connections) {
            if (!entry.connections.some(c => c.name === conn.name && c.type === conn.type)) {
              entry.connections.push(conn);
            }
          }
        }
        return true;
      }
    }
  }
  return false;
}

let enriched = 0;
const enrichments = {
  'soci-t-g-n-rale': {
    description: 'Societe Generale is one of France\'s largest banking groups, founded in 1864 by a group of industrialists including several prominent Jewish financiers. The bank has significant Israeli connections through its investment banking and asset management operations. During the Holocaust, the bank administered accounts of deported Jews, and in 2014 paid $1.3 billion to settle US sanctions violations including transactions with sanctioned countries. The bank has faced multiple legal issues including the Jerome Kerviel trading scandal in 2008 that resulted in a 4.9 billion euro loss, one of the largest trading losses in history. Societe Generale operates in Israel and maintains relationships with Israeli tech companies and financial institutions.',
    individuals: [
      { id: slug('Slawomir Krupa'), name: 'Slawomir Krupa', role: 'CEO', bio: 'CEO of Societe Generale since May 2023. Polish-born French banker who previously led the Americas division.' }
    ],
    connections: [
      { name: 'BNP Paribas', type: 'industry peer', description: 'Both are major French banking groups with global operations.' },
      { name: 'Credit Agricole', type: 'industry peer', description: 'Competing French banking institution.' }
    ]
  },
  'federace-idovsk-ch-obc-v-esk-republice': {
    description: 'The Federation of Jewish Communities in the Czech Republic (Federace zidovskych obci v Ceske republice) is the umbrella organization representing the approximately 3,000-4,000 Jews living in the Czech Republic. Founded after the Velvet Revolution in 1989, it represents 10 Jewish communities across the country. The Federation oversees religious life, education, social services, and the preservation of Jewish cultural heritage in a country with a rich Jewish history dating to the 10th century. It manages multiple synagogues and cemeteries, and operates social welfare programs for elderly Holocaust survivors still living in the Czech Republic.',
    individuals: [
      { id: slug('Petr Papousek'), name: 'Petr Papousek', role: 'President', bio: 'President of the Federation of Jewish Communities in the Czech Republic. Leads communal affairs and heritage preservation.' }
    ],
    connections: [
      { name: 'European Jewish Congress', type: 'affiliate', description: 'Czech member of the European Jewish Congress.' },
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Represents Czech Jewry internationally.' },
      { name: 'Jewish Museum in Prague', type: 'cultural partner', description: 'Works with the Jewish Museum on heritage preservation.' }
    ]
  },
  'jewish-welfare-board-singapore': {
    description: 'The Jewish Welfare Board of Singapore oversees the communal affairs of Singapore\'s small but historic Jewish community, numbering approximately 300-500 people. Singapore\'s Jewish presence dates to the early 19th century when Baghdadi Jewish traders from Iraq established themselves in the colony. The community built the Maghain Aboth Synagogue in 1878 and Chesed-El Synagogue in 1905, both of which are national monuments. Prominent Singaporean Jewish families include the Sassoons, Menashys, and Marshalls. David Marshall, Singapore\'s first Chief Minister, was of Baghdadi Jewish heritage. The community maintains ties with Israeli business networks and Chabad.',
    individuals: [
      { id: slug('Reuben Hasid'), name: 'Reuben Hasid', role: 'President', bio: 'President of the Jewish Welfare Board of Singapore, overseeing the small but historic Jewish community.' }
    ],
    connections: [
      { name: 'Maghain Aboth Synagogue', type: 'community institution', description: 'Singapore\'s oldest synagogue, managed under the JWB.' },
      { name: 'Chabad', type: 'religious support', description: 'Chabad operates programs supporting Singapore\'s Jewish community.' }
    ]
  },
  'lauder-chabad-campus-wien': {
    description: 'The Lauder Chabad Campus Vienna is a Jewish educational campus in Vienna, Austria, that combines the philanthropic vision of Ronald S. Lauder with Chabad-Lubavitch\'s educational approach. The campus operates a kindergarten, primary school, and secondary school serving Jewish families in Vienna and the broader Austrian Jewish community. Founded with significant funding from the Ronald S. Lauder Foundation, it represents the revival of Jewish education in a city where the pre-Holocaust Jewish community numbered over 200,000. The campus also hosts cultural events and community programs that serve as a center of Jewish life in modern Vienna.',
    individuals: [
      { id: slug('Ronald Lauder'), name: 'Ronald Lauder', role: 'Patron', bio: 'American billionaire businessman, president of the World Jewish Congress, and heir to the Estee Lauder fortune. Major funder of Jewish educational institutions across Central and Eastern Europe.' }
    ],
    connections: [
      { name: 'Ronald S. Lauder Foundation', type: 'funder', description: 'The Lauder Foundation provides major funding for the campus.' },
      { name: 'Chabad', type: 'religious partner', description: 'Chabad-Lubavitch provides the religious educational framework.' },
      { name: 'Israelitische Kultusgemeinde Wien', type: 'communal partner', description: 'Works with the official Viennese Jewish community.' }
    ]
  },
  'union-des-tudiants-juifs-de-france-uejf': {
    description: 'The Union of Jewish Students of France (Union des Etudiants Juifs de France, UEJF) is the leading Jewish student organization in France, founded in 1944 during the resistance against Nazi occupation. UEJF has approximately 15,000 members across French universities and grandes ecoles. The organization combats antisemitism and racism, provides legal advocacy, and has brought landmark court cases against online hate speech. UEJF was notably involved in suing Twitter and other social media platforms for failing to remove antisemitic content. It also organizes educational trips to Israel and Auschwitz, and advocates for the French Jewish community on campuses where antisemitic incidents have risen sharply.',
    individuals: [
      { id: slug('Samuel Lejoyeux'), name: 'Samuel Lejoyeux', role: 'President', bio: 'President of UEJF, leading the fight against antisemitism on French university campuses.' }
    ],
    connections: [
      { name: 'CRIF', type: 'communal partner', description: 'UEJF is a member organization of the umbrella CRIF body.' },
      { name: 'SOS Racisme', type: 'advocacy partner', description: 'Partners on anti-racism campaigns in France.' }
    ]
  },
  'keneseth-eliyahoo-synagogue': {
    description: 'Keneseth Eliyahoo Synagogue is a historic Sephardic synagogue in Mumbai, India, built in 1884 by Jacob Elias Sassoon of the prominent Sassoon family, Baghdadi Jewish merchants who built a commercial empire across India and East Asia. The synagogue, located on V.B. Gandhi Marg in the Fort area, is one of Mumbai\'s finest heritage structures with its sky-blue interior and stained glass windows. It was declared a Grade I heritage structure by the Maharashtra government. The Sassoon family, often called the "Rothschilds of the East," built the synagogue as a gift to the Baghdadi Jewish community. After a major restoration completed in 2019 funded by the Indian government and Jewish organizations, the synagogue serves as both an active place of worship and a heritage landmark.',
    individuals: [
      { id: slug('Jacob Elias Sassoon'), name: 'Jacob Elias Sassoon', role: 'Builder/Donor', bio: 'Member of the Sassoon dynasty who built Keneseth Eliyahoo Synagogue in 1884. Part of the Baghdadi Jewish trading family that dominated Indian and East Asian commerce.' }
    ],
    connections: [
      { name: 'Magen David Synagogue Mumbai', type: 'community institution', description: 'Both serve Mumbai\'s historic Baghdadi Jewish community.' },
      { name: 'Sassoon Docks', type: 'family legacy', description: 'The Sassoon family built major Mumbai infrastructure including the docks.' }
    ]
  },
  'centraal-joods-overleg-cjo': {
    description: 'The Centraal Joods Overleg (CJO, Central Jewish Consultation) is the umbrella organization of Dutch Jewry, representing the approximately 30,000-50,000 Jews in the Netherlands. The CJO coordinates between Dutch Jewish organizations and serves as the primary contact point with the Dutch government on matters affecting the Jewish community. The Netherlands had a pre-war Jewish population of approximately 140,000, of which 75% were murdered in the Holocaust - one of the highest proportional losses in Western Europe. The CJO works on Holocaust restitution, combating antisemitism, security for Jewish institutions, and maintaining relationships with Israel. It encompasses both Ashkenazi and Sephardic communities.',
    individuals: [
      { id: slug('Ronny Naftaniel'), name: 'Ronny Naftaniel', role: 'Former Director', bio: 'Longtime director of the CJO and prominent voice for Dutch Jewry on Holocaust restitution and combating antisemitism.' }
    ],
    connections: [
      { name: 'Nederlands-Israelitisch Kerkgenootschap (NIK)', type: 'member', description: 'The Ashkenazi Jewish community is a key CJO member.' },
      { name: 'European Jewish Congress', type: 'affiliate', description: 'Represents Dutch Jewry in the European Jewish Congress.' }
    ]
  },
  'paideia-the-european-institute-for-jewish-studies': {
    description: 'Paideia, the European Institute for Jewish Studies in Sweden, is a non-denominational academic institute in Stockholm dedicated to the renewal of Jewish culture in Europe. Founded in 2001 with support from the Swedish government, Paideia runs intensive academic programs training a new generation of Jewish community leaders, educators, and cultural activists from across Europe. The institute\'s flagship One Year Program brings fellows from 20+ countries annually. Paideia has trained over 500 alumni who now lead Jewish organizations, cultural projects, and educational initiatives across Europe, contributing to the revival of Jewish life on a continent devastated by the Holocaust.',
    individuals: [
      { id: slug('Barbara Spectre'), name: 'Barbara Spectre', role: 'Founding Director', bio: 'American-Israeli academic who founded Paideia in Stockholm in 2001 to train the next generation of European Jewish leaders.' }
    ],
    connections: [
      { name: 'Swedish Government', type: 'funder', description: 'The Swedish government provided founding support for Paideia.' },
      { name: 'European Jewish Congress', type: 'partner', description: 'Works with EJC on European Jewish cultural renewal.' }
    ]
  },
  'instituto-hebreo-dr-chaim-weizmann': {
    description: 'Instituto Hebreo Dr. Chaim Weizmann is a Jewish day school in Santiago, Chile, named after Israel\'s first president Chaim Weizmann. It is the largest Jewish school in Chile, serving the approximately 18,000-strong Chilean Jewish community. The school provides education from kindergarten through high school with a curriculum integrating Chilean national standards, Hebrew language, Jewish history, and Israel studies. Founded by the organized Jewish community of Chile, it has produced generations of Chilean Jewish leaders in business, politics, and the professions. The school maintains partnerships with Israeli educational institutions.',
    individuals: [],
    connections: [
      { name: 'Comunidad Judia de Chile', type: 'parent organization', description: 'The school is operated by the organized Chilean Jewish community.' },
      { name: 'Jewish Agency for Israel', type: 'educational partner', description: 'Partners on Israel education and Hebrew language programs.' }
    ]
  },
  'colegio-colombo-hebreo': {
    description: 'Colegio Colombo Hebreo is the primary Jewish day school in Bogota, Colombia, serving the approximately 5,000-7,000 strong Colombian Jewish community. Founded by Colombian Jewish families, the school provides bilingual education (Spanish and English) with Hebrew and Jewish studies integrated into the curriculum. The school is known for its academic excellence and regularly ranks among the top schools in Colombia. It serves as a cultural hub for the Jewish community and maintains connections with Israeli educational institutions. Colombia\'s Jewish community, concentrated in Bogota with smaller populations in Medellin, Cali, and Barranquilla, is primarily of Ashkenazi and Sephardic descent.',
    individuals: [],
    connections: [
      { name: 'Jewish Agency for Israel', type: 'educational partner', description: 'Partners on Israel education programs.' },
      { name: 'ORT', type: 'educational network', description: 'Connected to the ORT global Jewish education network.' }
    ]
  },
  'vilna-gaon-jewish-state-museum': {
    description: 'The Vilna Gaon Jewish State Museum in Vilnius, Lithuania, is the only state Jewish museum in the Baltic states. Named after the Vilna Gaon (Elijah ben Solomon Zalman, 1720-1797), the great Talmudic scholar, the museum documents the rich 700-year history of Lithuanian Jewry - a community that was one of the most intellectually vibrant in the Jewish world. Before the Holocaust, Vilnius was known as the "Jerusalem of Lithuania," home to 100,000 Jews, comprising up to 45% of the city\'s population. The Nazis and local collaborators murdered approximately 95% of Lithuanian Jews - some 200,000 people. The museum preserves artifacts, documents, and testimonies from this destroyed civilization.',
    individuals: [],
    connections: [
      { name: 'Yad Vashem', type: 'research partner', description: 'Collaborates on Holocaust documentation and Lithuanian Jewish history.' },
      { name: 'YIVO Institute for Jewish Research', type: 'historical connection', description: 'YIVO was originally founded in Vilna in 1925 before relocating to New York.' }
    ]
  },
  'russian-jewish-congress-rjc': {
    description: 'The Russian Jewish Congress (RJC) is the leading secular Jewish organization in Russia, representing the interests of the estimated 150,000-500,000 Jews in the Russian Federation. Founded in 1996, the RJC works on preserving Jewish cultural heritage, combating antisemitism, supporting Jewish education, and maintaining Russia\'s relationship with Israel. The organization has been led by prominent Russian oligarchs and businessmen. The RJC funds Jewish schools, community centers, and cultural programs across Russia. It operates in a complex political environment where Russian-Israeli relations have fluctuated, particularly since Russia\'s invasion of Ukraine in 2022, which prompted significant Jewish emigration from Russia.',
    individuals: [
      { id: slug('Yuri Kanner'), name: 'Yuri Kanner', role: 'President', bio: 'President of the Russian Jewish Congress. Business leader and communal activist.' }
    ],
    connections: [
      { name: 'Federation of Jewish Communities of Russia', type: 'communal peer', description: 'Both represent aspects of Russian Jewish community life.' },
      { name: 'World Jewish Congress', type: 'affiliate', description: 'RJC is affiliated with the WJC representing Russian Jewry.' },
      { name: 'Jewish Agency for Israel', type: 'aliyah partner', description: 'Works with the Jewish Agency on Jewish life in Russia and emigration.' }
    ]
  },
  'elie-wiesel-national-institute-for-the-study-of-the-holocaust-in-romania': {
    description: 'The Elie Wiesel National Institute for the Study of the Holocaust in Romania is the Romanian government\'s official body for Holocaust research, education, and remembrance. Named after Nobel laureate Elie Wiesel, who was born in Sighet, Romania, the institute was established following the 2004 Wiesel Commission report that documented Romania\'s active participation in the Holocaust. Romania was responsible for the deaths of approximately 280,000-380,000 Jews and 11,000 Roma during the Holocaust, primarily through deportations to Transnistria and massacres in Bessarabia, Bukovina, and the Iasi pogrom of 1941. The institute conducts research, publishes academic works, and leads educational initiatives to ensure Romania confronts its Holocaust history.',
    individuals: [
      { id: slug('Alexandru Florian'), name: 'Alexandru Florian', role: 'Director', bio: 'Director of the Elie Wiesel National Institute, leading Romania\'s official Holocaust research and education efforts.' }
    ],
    connections: [
      { name: 'Yad Vashem', type: 'research partner', description: 'Collaborates on Holocaust documentation of Romanian participation.' },
      { name: 'United States Holocaust Memorial Museum', type: 'research partner', description: 'Partners on scholarship about the Holocaust in Romania.' }
    ]
  },
  'cdec-centro-di-documentazione-ebraica-contemporanea': {
    description: 'CDEC (Centro di Documentazione Ebraica Contemporanea) is Italy\'s foremost center for the study and documentation of contemporary Jewish history and culture, based in Milan. Founded in 1955, CDEC maintains extensive archives documenting the persecution and deportation of Italian Jews during the Holocaust (approximately 7,500 of Italy\'s 45,000 Jews were murdered, primarily at Auschwitz), as well as the broader history of Italian Jewry. CDEC operates a major library, digital archive, and research center. It monitors antisemitism in Italy and publishes the annual report on antisemitic incidents. The center also documents the contributions of Italian Jews to Italian culture, science, and public life.',
    individuals: [
      { id: slug('Gadi Luzzatto Voghera'), name: 'Gadi Luzzatto Voghera', role: 'Director', bio: 'Director of CDEC, historian specializing in Italian Jewish history and antisemitism.' }
    ],
    connections: [
      { name: 'Unione delle Comunita Ebraiche Italiane (UCEI)', type: 'communal partner', description: 'CDEC works closely with Italy\'s umbrella Jewish organization.' },
      { name: 'Yad Vashem', type: 'research partner', description: 'Collaborates on documenting the Holocaust in Italy.' }
    ]
  },
  'south-african-zionist-federation-sazf': {
    description: 'The South African Zionist Federation (SAZF) is the Zionist movement\'s representative body in South Africa, founded in 1898 - making it one of the oldest Zionist organizations in the world, predating even the State of Israel by five decades. The SAZF promotes Israel advocacy, facilitates aliyah, supports Israel-South Africa relations, and coordinates Zionist activities across the country. South Africa\'s Jewish community of approximately 50,000-60,000 (down from a peak of 120,000) has maintained one of the highest per-capita rates of aliyah in the world. The SAZF operates in an increasingly challenging environment as South Africa\'s ANC government has taken strongly critical positions toward Israel, including bringing the ICJ genocide case in 2024.',
    individuals: [
      { id: slug('Rowan Sobel Sobel'), name: 'Rowan Sobel', role: 'Chairman', bio: 'Chairman of the South African Zionist Federation, leading Israel advocacy in South Africa.' }
    ],
    connections: [
      { name: 'World Zionist Organization', type: 'affiliate', description: 'SAZF is one of the oldest affiliates of the WZO.' },
      { name: 'South African Jewish Board of Deputies', type: 'communal partner', description: 'Works alongside the SAJBD on community matters.' },
      { name: 'Jewish Agency for Israel', type: 'aliyah partner', description: 'Facilitates South African aliyah to Israel.' }
    ]
  },
  'nederlands-isra-litisch-kerkgenootschap-nik': {
    description: 'The Nederlands Israelitisch Kerkgenootschap (NIK) is the Ashkenazi Jewish community organization of the Netherlands, one of the oldest Jewish communal structures in Western Europe. The NIK oversees synagogues, religious courts, kosher supervision, and lifecycle services for Dutch Ashkenazi Jews. Before the Holocaust, the Netherlands had over 140,000 Jews; approximately 102,000 were murdered - a 75% death rate, the highest in Western Europe, due in part to the efficiency of the Dutch civil registry and the geographic difficulty of escape. Today the Dutch Jewish community numbers approximately 30,000-50,000. The NIK maintains the historic Portuguese and Ashkenazi synagogue complexes in Amsterdam.',
    individuals: [],
    connections: [
      { name: 'Centraal Joods Overleg (CJO)', type: 'member', description: 'NIK is a key member of the Dutch Jewish umbrella body.' },
      { name: 'Conference of European Rabbis', type: 'religious affiliate', description: 'Dutch rabbis participate in the Conference of European Rabbis.' }
    ]
  },
  'comunit-ebraica-di-milano': {
    description: 'The Comunita Ebraica di Milano (Jewish Community of Milan) is the largest Jewish community in Italy with approximately 10,000 members, representing about one-third of Italian Jewry. Milan\'s Jewish community dates to the Roman era and has been a center of Jewish intellectual and commercial life in Italy for centuries. The community operates synagogues (including the Central Synagogue on Via Guastalla), schools, youth programs, and social services. During the Holocaust, hundreds of Milanese Jews were deported to Auschwitz from the Binario 21 (Platform 21) at Milan Central Station, now the Memoriale della Shoah. The community has produced notable figures in Italian business, fashion, publishing, and academia.',
    individuals: [
      { id: slug('Walker Meghnagi'), name: 'Walker Meghnagi', role: 'President', bio: 'President of the Jewish Community of Milan, Italy\'s largest Jewish congregation.' }
    ],
    connections: [
      { name: 'Unione delle Comunita Ebraiche Italiane (UCEI)', type: 'umbrella body', description: 'Milan\'s community is a key constituent of UCEI.' },
      { name: 'Memoriale della Shoah', type: 'Holocaust memorial', description: 'The community supports the Platform 21 Holocaust memorial at Milan Central Station.' }
    ]
  },
  'casa-sefarad': {
    description: 'Casa Sefarad-Israel is a Spanish public diplomacy institution in Madrid dedicated to strengthening relations between Spain and the Jewish world, particularly Israel and the Sephardic diaspora. Founded in 2006 as a joint initiative of the Spanish Ministry of Foreign Affairs, the Madrid city government, and other public institutions, it promotes cultural exchange, academic dialogue, and the recovery of Spain\'s Jewish heritage. Spain expelled its Jewish population in 1492, and Casa Sefarad represents the modern effort at reconciliation, particularly through Spain\'s 2015 law granting citizenship to descendants of Sephardic Jews. The center organizes exhibitions, conferences, and educational programs exploring the rich Sephardic heritage of the Iberian Peninsula.',
    individuals: [],
    connections: [
      { name: 'Spanish Ministry of Foreign Affairs', type: 'government partner', description: 'Casa Sefarad is a Spanish government initiative.' },
      { name: 'Red de Juderias de Espana', type: 'heritage partner', description: 'Both work to preserve and promote Jewish heritage in Spain.' }
    ]
  },
  'museo-sefard-de-toledo': {
    description: 'The Museo Sefardi (Sephardic Museum) in Toledo, Spain, is housed in the historic Sinagoga del Transito, built in 1357 by Samuel ha-Levi, treasurer to King Pedro I of Castile. The synagogue is one of the finest examples of Mudejar architecture and features stunning Hebrew inscriptions and ornamental plasterwork. The museum documents the history of Sephardic Jews in Spain from their arrival in the Roman period through the Golden Age of coexistence (convivencia), the 1492 expulsion, and the global Sephardic diaspora. Toledo was one of the most important centers of Jewish life in medieval Europe, home to major Talmudic scholars, translators, poets, and philosophers. The museum is a UNESCO World Heritage site.',
    individuals: [],
    connections: [
      { name: 'Casa Sefarad', type: 'heritage partner', description: 'Both institutions promote Sephardic heritage in Spain.' },
      { name: 'Red de Juderias de Espana', type: 'network member', description: 'Toledo is a key member of Spain\'s Jewish quarter network.' }
    ]
  },
  'j-disches-museum-wien': {
    description: 'The Judisches Museum Wien (Jewish Museum Vienna) is one of the oldest Jewish museums in the world, originally founded in 1895, closed by the Nazis in 1938, and reopened in 1988. It operates two locations: the main building on Dorotheergasse and the Museum Judenplatz in Vienna\'s historic Jewish quarter. Vienna\'s pre-Holocaust Jewish community of approximately 185,000 was one of the most culturally influential in history, producing figures like Sigmund Freud, Gustav Mahler, Stefan Zweig, and Ludwig Wittgenstein. The museum documents this extraordinary cultural legacy and the catastrophic destruction during the Holocaust when 65,000 Austrian Jews were murdered. The Museum Judenplatz features Rachel Whiteread\'s Nameless Library memorial above excavated medieval synagogue ruins.',
    individuals: [],
    connections: [
      { name: 'Israelitische Kultusgemeinde Wien', type: 'communal partner', description: 'Works with Vienna\'s official Jewish community.' },
      { name: 'Jewish Museum Berlin', type: 'museum peer', description: 'Both are major European Jewish museums documenting German-speaking Jewish civilizations.' }
    ]
  },
  'kadima-community': {
    description: 'The Kadima Community represents Jewish communal life in various locations where small but significant Jewish populations maintain organized community structures. Kadima (meaning "forward" in Hebrew) communities typically operate as multi-service organizations providing religious services, cultural programming, youth activities, and social support for Jews living in areas with small Jewish populations. These communities often serve as the sole Jewish institutional presence in their regions, maintaining connections to larger Jewish organizational networks and to Israel. Kadima communities emphasize Jewish continuity and identity preservation, especially important for geographically isolated Jewish populations.',
    individuals: [],
    connections: [
      { name: 'World Jewish Congress', type: 'international link', description: 'Connected to global Jewish networks.' }
    ]
  },
  'centro-deportivo-israelita': {
    description: 'Centro Deportivo Israelita (CDI) is the largest Jewish sports, cultural, and social club in Mexico City, serving as a central gathering point for the approximately 50,000-strong Mexican Jewish community. Founded in 1950, CDI operates extensive athletic facilities, swimming pools, cultural centers, and social halls. It hosts major Jewish community events, holiday celebrations, and educational programs. CDI represents the integration of Jewish community life with Mexican culture, particularly among the Ashkenazi segment of Mexican Jewry. The center has produced Olympic athletes and serves as a model for Latin American Jewish community centers. It also functions as a social hub where much of the business and social networking within the Mexican Jewish community takes place.',
    individuals: [],
    connections: [
      { name: 'Comite Central de la Comunidad Judia de Mexico', type: 'communal partner', description: 'CDI is a key institution within organized Mexican Jewish life.' },
      { name: 'Maccabi World Union', type: 'sports affiliate', description: 'Connected to the global Jewish sports movement.' }
    ]
  },
  'museum-of-moroccan-judaism': {
    description: 'The Museum of Moroccan Judaism in Casablanca is the only Jewish museum in the Arab world. Founded in 1997, it documents the 2,000-year history of Jews in Morocco, a community that once numbered over 250,000 people before mass emigration to Israel and France following Israeli independence. The museum houses Torah scrolls, liturgical objects, traditional clothing, photographs, and documents from Jewish communities across Morocco - from Fez and Marrakech to the Berber mountain villages. Morocco has maintained a uniquely tolerant relationship with its Jewish minority; King Mohammed V famously refused to deport Moroccan Jews during Vichy French control in World War II. Today approximately 2,500 Jews remain in Morocco, and the museum preserves their heritage for future generations.',
    individuals: [],
    connections: [
      { name: 'Conseil des Communautes Israelites du Maroc', type: 'communal partner', description: 'The museum works with Morocco\'s Jewish communal council.' },
      { name: 'Bayt Dakira', type: 'heritage partner', description: 'Both preserve Moroccan Jewish heritage.' }
    ]
  },
  'gibraltar-hebrew-community': {
    description: 'The Gibraltar Hebrew Community has maintained a continuous Jewish presence on the Rock of Gibraltar since the 18th century, making it one of the oldest established Jewish communities in the British Crown Dependencies. The community numbers approximately 600-800 people and operates four synagogues, the most notable being the Great Synagogue (Shaar Hashamayim, established 1724) in the Sephardic tradition. Gibraltar\'s Jewish community is predominantly of Moroccan and Mediterranean Sephardic descent. Despite its small size, the community has been disproportionately influential in Gibraltar\'s government and commerce. Several Chief Ministers of Gibraltar have been Jewish. The community maintains close ties with both British and Israeli Jewish networks.',
    individuals: [],
    connections: [
      { name: 'Board of Deputies of British Jews', type: 'communal link', description: 'Connected to British Jewish communal structures.' },
      { name: 'World Sephardi Federation', type: 'affiliate', description: 'Part of the global Sephardic network.' }
    ]
  },
  'jewish-museum-frankfurt': {
    description: 'The Jewish Museum Frankfurt (Judisches Museum Frankfurt) is the oldest independent Jewish museum in Germany, originally opened in 1988 in the former Rothschild Palace on the Untermainkai. After a major renovation, it reopened in 2020 with expanded exhibition spaces. Frankfurt\'s Jewish community was historically one of the most important in Germany - the city\'s Judengasse (Jews\' Alley) was the first Jewish ghetto in Europe, established in 1462. The Rothschild banking dynasty originated in Frankfurt\'s Jewish quarter. Other notable Frankfurt Jews include Anne Frank (whose family lived in the city before fleeing to Amsterdam) and philosopher Theodor Adorno. The museum documents this rich history alongside the devastation of the Holocaust and the rebuilding of Jewish life in Frankfurt.',
    individuals: [
      { id: slug('Mirjam Wenzel'), name: 'Mirjam Wenzel', role: 'Director', bio: 'Director of the Jewish Museum Frankfurt, overseeing its reopening and expansion in 2020.' }
    ],
    connections: [
      { name: 'Jewish Museum Berlin', type: 'museum peer', description: 'Both document German Jewish history in major cities.' },
      { name: 'Rothschild family', type: 'historical connection', description: 'The museum is housed in a former Rothschild palace.' }
    ]
  },
  'asociaci-n-de-beneficencia-israelita-de-quito': {
    description: 'The Asociacion de Beneficencia Israelita de Quito (Jewish Charitable Association of Quito) is the central Jewish communal organization in Ecuador\'s capital, serving the approximately 500-800 Jews living in the city. Ecuador\'s Jewish community, while small, has played a notable role in the country\'s commercial and professional life. Many Ecuadorian Jews are descended from refugees who fled Nazi Europe; Ecuador was one of the few Latin American countries that accepted significant numbers of Jewish immigrants in the 1930s. The association operates a synagogue, community center, and social services, and maintains the Jewish cemetery of Quito. It works to preserve Jewish identity among a community experiencing assimilation pressures.',
    individuals: [],
    connections: [
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Represents Ecuadorian Jewry in international forums.' },
      { name: 'American Jewish Joint Distribution Committee', type: 'support', description: 'JDC provides support to small Latin American Jewish communities.' }
    ]
  },
  'jw3': {
    description: 'JW3 is London\'s Jewish community center, located on Finchley Road in the heart of one of London\'s most Jewish neighborhoods. Opened in 2013 after a 25-year campaign and 54 million pound fundraising effort, JW3 was designed to be a modern, non-denominational hub for Jewish arts, culture, and community life. The center includes cinemas, a restaurant (serving modern Israeli cuisine), event spaces, classrooms, and studios. JW3 hosts hundreds of events annually - from film festivals and art exhibitions to cooking classes and debates. It was partly inspired by New York\'s 92nd Street Y model and represents a new approach to Jewish community engagement in the UK, welcoming people of all backgrounds. The center has become the primary venue for major Jewish cultural events in London.',
    individuals: [
      { id: slug('Raymond Simonson'), name: 'Raymond Simonson', role: 'CEO', bio: 'CEO of JW3 since its founding, building it into London\'s premier Jewish cultural center.' }
    ],
    connections: [
      { name: '92nd Street Y', type: 'model institution', description: 'JW3 was partly inspired by the 92Y model.' },
      { name: 'UK Jewish Film Festival', type: 'venue partner', description: 'JW3 hosts UKJFF screenings annually.' },
      { name: 'Jewish Leadership Council', type: 'communal partner', description: 'JW3 is part of UK Jewish communal leadership networks.' }
    ]
  },
  'hebraica-s-o-paulo': {
    description: 'Clube Hebraica Sao Paulo is the largest Jewish social and sports club in Latin America, founded in 1953. Located in the Pinheiros neighborhood of Sao Paulo, the club spans a massive complex with sports facilities, swimming pools, theaters, libraries, and event spaces. It serves as the social epicenter of Sao Paulo\'s Jewish community of approximately 60,000-80,000, the largest in Latin America. Hebraica hosts cultural events, Israeli national day celebrations, and community gatherings. The club has produced Olympic athletes and national champions in multiple sports. It also operates educational and youth programs focused on Jewish identity and connection to Israel. The club maintains strong ties with Israeli cultural and sporting institutions.',
    individuals: [],
    connections: [
      { name: 'Maccabi World Union', type: 'sports affiliate', description: 'Connected to the global Jewish sports movement.' },
      { name: 'Confederacao Israelita do Brasil', type: 'communal partner', description: 'Part of the organized Brazilian Jewish community.' },
      { name: 'Albert Einstein Israelite Hospital', type: 'community institution', description: 'Both are pillars of Sao Paulo\'s Jewish community.' }
    ]
  },
  'museo-ebraico-di-venezia': {
    description: 'The Museo Ebraico di Venezia (Jewish Museum of Venice) is located in the Campo del Ghetto Nuovo, the site of the world\'s first ghetto. Venice created the original "ghetto" in 1516 when it confined Jews to a small island in Cannaregio, giving the world the term "ghetto" (from the Venetian word for foundry). The museum, founded in 1955, documents the 500-year history of Venice\'s Jewish community through ritual objects, textiles, and documents. The museum complex includes tours of the five historic synagogues (Scuole) built within the ghetto between the 16th and 18th centuries - masterpieces of hidden architecture, modest on the outside but ornately beautiful within. Venice\'s Jewish community today numbers fewer than 500 but maintains this extraordinary heritage.',
    individuals: [],
    connections: [
      { name: 'Comunita Ebraica di Venezia', type: 'operating body', description: 'The museum is operated by Venice\'s Jewish community.' },
      { name: 'Unione delle Comunita Ebraiche Italiane (UCEI)', type: 'umbrella body', description: 'Part of Italy\'s Jewish communal structure.' }
    ]
  },
  'lusaka-hebrew-congregation': {
    description: 'The Lusaka Hebrew Congregation serves the small Jewish community of Zambia\'s capital city. Zambia\'s Jewish population, numbering approximately 50-100 people, is descended primarily from Lithuanian and other Eastern European Jews who migrated to Northern Rhodesia (now Zambia) in the early 20th century to pursue mining and commercial opportunities in the Copperbelt region. At its peak in the 1950s-60s, the community numbered over 1,200. Most emigrated to South Africa, Israel, and other countries after Zambian independence. The synagogue maintains services and serves as a gathering point for the remaining community and Jewish visitors. The community has been noted for its warm relations with the broader Zambian society and government.',
    individuals: [],
    connections: [
      { name: 'Council for Zambian Jewry', type: 'umbrella body', description: 'The congregation operates under the Council for Zambian Jewry.' },
      { name: 'South African Jewish Board of Deputies', type: 'regional connection', description: 'Maintains ties with Southern African Jewish networks.' }
    ]
  },
  'judiska-museet-i-stockholm': {
    description: 'The Judiska Museet (Jewish Museum) in Stockholm documents the history of Jews in Sweden from the 18th century to the present. Sweden\'s Jewish history is unique in that it was one of the few European countries to remain neutral during World War War II, and Swedish diplomat Raoul Wallenberg saved tens of thousands of Hungarian Jews through the issuance of protective passports. Sweden also accepted Danish Jews fleeing Nazi occupation in 1943. The museum preserves artifacts, documents, and testimonies from Swedish Jewish life and explores themes of migration, identity, and Sweden\'s role as both bystander and rescuer during the Holocaust. Today Sweden has approximately 15,000-20,000 Jews, concentrated in Stockholm, Gothenburg, and Malmo.',
    individuals: [],
    connections: [
      { name: 'Official Council of Swedish Jewish Communities', type: 'communal partner', description: 'The museum works with Sweden\'s Jewish umbrella organization.' },
      { name: 'Jewish Museum Berlin', type: 'museum peer', description: 'Both document national Jewish experiences in Northern Europe.' }
    ]
  },
  'jewish-museum-oslo': {
    description: 'The Jewish Museum Oslo (Jodisk Museum Oslo) is housed in the oldest surviving synagogue building in Norway, built in 1921 in the Calmeyers gate neighborhood. The museum documents the history of Jews in Norway, a community that has always been small but significant. Norway banned Jewish entry until 1851. During the Nazi occupation, 773 Norwegian Jews (nearly half the community) were deported on the ship SS Donau to Auschwitz in November 1942; only 34 survived. The Norwegian government formally apologized in 2012. The museum presents this history through permanent and temporary exhibitions, educational programs, and cultural events. Today Norway\'s Jewish community numbers approximately 1,500-2,000 people.',
    individuals: [],
    connections: [
      { name: 'Det Mosaiske Trossamfund i Oslo', type: 'communal partner', description: 'The museum is connected to Oslo\'s Jewish congregation.' },
      { name: 'HL-senteret (Norwegian Center for Holocaust and Minority Studies)', type: 'educational partner', description: 'Both document the Holocaust in Norway.' }
    ]
  },
  'vaad-of-ukraine': {
    description: 'The Vaad of Ukraine is the Association of Jewish Organizations and Communities of Ukraine, serving as an umbrella body for Ukrainian Jewry. Ukraine has one of the historically most significant Jewish populations in the world, with estimates of the current community ranging from 50,000 to 200,000 people. Before the Holocaust, Ukraine had over 2.7 million Jews; approximately 1.5 million were murdered, including the Babi Yar massacre near Kyiv where 33,771 Jews were shot in two days in September 1941. Following Russia\'s 2022 invasion, thousands of Ukrainian Jews have been evacuated with the help of Israeli, American, and international Jewish organizations. The Vaad coordinates communal affairs, humanitarian aid, and community services during the ongoing conflict.',
    individuals: [],
    connections: [
      { name: 'Jewish Agency for Israel', type: 'evacuation partner', description: 'The Jewish Agency has evacuated thousands of Ukrainian Jews since 2022.' },
      { name: 'American Jewish Joint Distribution Committee', type: 'humanitarian partner', description: 'JDC provides extensive humanitarian assistance to Ukrainian Jews.' },
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Represents Ukrainian Jewry internationally.' }
    ]
  },
  'det-mosaiske-trossamfund-i-oslo': {
    description: 'Det Mosaiske Trossamfund (DMT, The Mosaic Religious Community) in Oslo is the larger of Norway\'s two Jewish congregations, serving the approximately 1,000-1,500 Jews in the Oslo area. Founded in 1892, DMT operates the main synagogue in Bergstien, a community center, kindergarten, and social programs. The congregation faced tragedy during World War II when hundreds of its members were deported to Auschwitz. In the post-war era, the community has rebuilt and maintained active Jewish life despite its small size. DMT has faced security challenges in recent decades and operates with significant security measures. The congregation is pluralistic and maintains connections with both Israeli and European Jewish networks.',
    individuals: [],
    connections: [
      { name: 'Jewish Museum Oslo', type: 'cultural partner', description: 'DMT works with the Jewish Museum on preserving Norwegian Jewish heritage.' },
      { name: 'Official Council of Swedish Jewish Communities', type: 'Scandinavian peer', description: 'Nordic Jewish communities coordinate on shared concerns.' }
    ]
  },
  'musmeah-yeshua-synagogue': {
    description: 'Musmeah Yeshua Synagogue in Yangon, Myanmar, is the last functioning synagogue in the country and a testament to the once-thriving Jewish community of Burma. Built in 1896 by Baghdadi Jewish traders, the synagogue features a striking blue-and-white interior with ornate columns and a beautiful bimah. Burma\'s Jewish history dates to the 18th century, when Sephardic and Baghdadi Jewish merchants settled in Rangoon (now Yangon). At its peak in the 1940s, the community numbered approximately 2,500. Most left after the military coup of 1962. Today, only about 20 Jews remain in Myanmar. The synagogue is maintained as both a place of worship and a heritage site, attracting Jewish visitors from around the world. It was restored with support from international Jewish organizations.',
    individuals: [
      { id: slug('Moses Samuels'), name: 'Moses Samuels', role: 'Trustee', bio: 'Trustee of Musmeah Yeshua Synagogue and one of the last remaining Jews in Myanmar. Serves as caretaker of Burmese Jewish heritage.' }
    ],
    connections: [
      { name: 'World Monuments Fund', type: 'preservation partner', description: 'Assisted in the synagogue\'s restoration.' }
    ]
  },
  'colegio-le-n-pinelo': {
    description: 'Colegio Leon Pinelo is the only Jewish day school in Peru, located in Lima and serving the approximately 2,500-strong Peruvian Jewish community. Named after Antonio de Leon Pinelo, a colonial-era jurist believed to have been of converso (secret Jewish) descent, the school provides education from kindergarten through high school. The curriculum integrates Peruvian national education standards with Hebrew language, Jewish studies, and Israel education. Peru\'s Jewish community is predominantly descended from late 19th and early 20th century immigrants from Eastern Europe, along with a smaller Sephardic community. The school is considered one of the top academic institutions in Lima and has produced prominent Peruvian business leaders and professionals.',
    individuals: [],
    connections: [
      { name: 'Asociacion Judia del Peru', type: 'communal partner', description: 'Part of Peru\'s organized Jewish community.' },
      { name: 'Jewish Agency for Israel', type: 'educational partner', description: 'Partners on Hebrew language and Israel education programs.' }
    ]
  },
  'council-for-zambian-jewry': {
    description: 'The Council for Zambian Jewry is the umbrella organization for the tiny but historically significant Jewish community of Zambia. At its peak in the 1950s-60s during the heyday of the Copperbelt mining boom, Zambia\'s Jewish community numbered over 1,200, with congregations in Lusaka, Livingstone, Ndola, Kitwe, and Mufulira. Most were Lithuanian-origin Jews who had migrated via South Africa. Community members played significant roles in Zambia\'s business sector, particularly in mining, trade, and retail. After independence in 1964 and subsequent nationalizations, most Jews emigrated. Today fewer than 100 Jews remain. The Council maintains the community\'s remaining institutions, cemeteries, and historical records.',
    individuals: [],
    connections: [
      { name: 'Lusaka Hebrew Congregation', type: 'member', description: 'The Lusaka congregation operates under the Council.' },
      { name: 'South African Jewish Board of Deputies', type: 'regional link', description: 'Connected to Southern African Jewish networks.' }
    ]
  },
  'jewish-community-of-ljubljana': {
    description: 'The Jewish Community of Ljubljana represents the small but emerging Jewish community in Slovenia\'s capital. Slovenia\'s Jewish history includes a medieval presence in towns like Maribor (which had a significant Jewish quarter before the 1496 expulsion) and Ljubljana. During the Holocaust, the few hundred Jews in the territory were deported and murdered by the Nazis and their collaborators. After decades of near-absence, a small Jewish community has reconstituted itself in independent Slovenia, numbering approximately 100-200 people. The community was formally re-established in 2003 and operates cultural programs, religious services, and educational outreach. It marks a symbolic renewal of Jewish life in a country where it was nearly completely extinguished.',
    individuals: [],
    connections: [
      { name: 'European Jewish Congress', type: 'affiliate', description: 'Connected to European Jewish communal networks.' }
    ]
  },
  'federaci-n-de-comunidades-jud-as-de-espa-a-fcje': {
    description: 'The Federacion de Comunidades Judias de Espana (FCJE, Federation of Jewish Communities of Spain) is the umbrella organization representing approximately 40,000-50,000 Jews in Spain. Spain\'s modern Jewish community is relatively recent, as Jews were expelled in 1492 and only began returning in significant numbers in the 20th century. The FCJE represents communities in Madrid, Barcelona, Malaga, Marbella, and other cities. It works with the Spanish government on issues affecting the Jewish community, including the landmark 2015 Sephardic citizenship law that offered nationality to descendants of expelled Jews. The FCJE also combats antisemitism, supports Jewish education, and promotes interfaith dialogue in a country still reckoning with its history of the Inquisition.',
    individuals: [
      { id: slug('Isaac Querub Caro'), name: 'Isaac Querub Caro', role: 'President', bio: 'President of the Federation of Jewish Communities of Spain, leading the community\'s representation and advocacy.' }
    ],
    connections: [
      { name: 'European Jewish Congress', type: 'affiliate', description: 'FCJE represents Spanish Jewry in the EJC.' },
      { name: 'Casa Sefarad', type: 'heritage partner', description: 'Both promote Jewish heritage in Spain.' },
      { name: 'World Sephardi Federation', type: 'affiliate', description: 'Connected to the global Sephardic community.' }
    ]
  },
  'maghain-aboth-synagogue': {
    description: 'Maghain Aboth Synagogue ("Shield of our Fathers") is the oldest synagogue in Southeast Asia, built in 1878 in Singapore by the Baghdadi Jewish community. The synagogue was gazetted as a national monument of Singapore in 1998. Built in the colonial neoclassical style, it serves as the spiritual home of Singapore\'s small Jewish community of approximately 300-500 people. The synagogue\'s history is intertwined with the Baghdadi Jewish trading families - the Sassoons, Menashys, and others - who established commercial networks across the British Empire. During the Japanese occupation of Singapore (1942-1945), the community suffered persecution, with some members interned. The synagogue survived the war and continues to hold regular services.',
    individuals: [],
    connections: [
      { name: 'Jewish Welfare Board Singapore', type: 'communal partner', description: 'The synagogue is managed under the JWB.' },
      { name: 'Chesed-El Synagogue', type: 'sister congregation', description: 'Singapore\'s other historic synagogue, also a national monument.' }
    ]
  },
  'community-of-jewish-descent-in-madagascar': {
    description: 'The Community of Jewish Descent in Madagascar represents a unique group of Malagasy people who have embraced Jewish identity and practice. This community of several hundred members, primarily in Antananarivo and other cities, includes descendants of Jewish traders and settlers as well as Malagasy who have adopted Judaism. Madagascar has an unusual connection to Jewish history: the Nazis briefly considered the "Madagascar Plan" to deport all European Jews to the island in 1940, though this was never implemented. Additionally, some scholars have noted cultural parallels between certain Malagasy practices and Jewish traditions. The community has sought formal recognition from mainstream Judaism and maintains connections with international Jewish organizations.',
    individuals: [],
    connections: [
      { name: 'Kulanu', type: 'outreach partner', description: 'Kulanu supports emerging Jewish communities worldwide including Madagascar.' }
    ]
  },
  'imperial-war-museum-holocaust-exhibition': {
    description: 'The Holocaust Exhibition at the Imperial War Museum in London is one of the most comprehensive and visited Holocaust exhibitions in the world outside Israel and the United States. Opened in 2000, it uses two floors of the museum to tell the story of European Jewish persecution and mass murder through artifacts, documents, film footage, survivor testimonies, and immersive displays. The exhibition traces the rise of antisemitism, Nazi persecution, the implementation of the "Final Solution," and liberation. Over 15 million people have visited since its opening. The IWM also holds significant archives related to the Holocaust and British liberation of concentration camps, including Bergen-Belsen. The exhibition was developed in consultation with Holocaust survivors living in Britain.',
    individuals: [],
    connections: [
      { name: 'Holocaust Educational Trust', type: 'education partner', description: 'HET\'s educational programs connect with the IWM exhibition.' },
      { name: 'Wiener Holocaust Library', type: 'archival partner', description: 'Both hold significant Holocaust documentation in London.' },
      { name: 'Yad Vashem', type: 'research partner', description: 'Collaborates on exhibition content and research materials.' }
    ]
  },
  'centro-sefarad-israel': {
    description: 'Centro Sefarad-Israel in Madrid is a Spanish public diplomacy institution that promotes Spanish-Israeli relations and the recovery of Sephardic Jewish heritage. Operating as a cultural center and diplomatic bridge, it hosts lectures, film screenings, art exhibitions, and academic conferences exploring the intersection of Spanish and Jewish civilizations. The center is particularly significant given Spain\'s 1492 expulsion of Jews and the ongoing process of historical reconciliation. Centro Sefarad-Israel works to educate Spaniards about the Sephardic Jewish legacy that shaped Spanish language, culture, music, and cuisine. It also facilitates business, academic, and cultural exchanges between Spain and Israel, and supports the Ladino (Judeo-Spanish) language preservation effort.',
    individuals: [],
    connections: [
      { name: 'Casa Sefarad', type: 'partner institution', description: 'Both promote Sephardic heritage and Israel-Spain relations.' },
      { name: 'Israeli Embassy in Spain', type: 'diplomatic partner', description: 'Works with the Israeli embassy on cultural diplomacy.' }
    ]
  },
  'bayt-dakira-house-of-memory': {
    description: 'Bayt Dakira (House of Memory) in Essaouira, Morocco, is a museum and heritage center dedicated to Moroccan Jewish history and the Jewish heritage of the city formerly known as Mogador. Inaugurated in 2020 as part of King Mohammed VI\'s initiative to preserve Morocco\'s multicultural heritage, Bayt Dakira is located in a restored historic building in the old Jewish quarter (mellah). Essaouira was once one-third Jewish, with a thriving community of merchants, artisans, and diplomats who played key roles in Morocco\'s international trade. The center houses archives, photographs, ritual objects, and interactive displays documenting centuries of Jewish life in the city. It represents Morocco\'s unique approach to preserving Jewish heritage as part of its national identity.',
    individuals: [],
    connections: [
      { name: 'Museum of Moroccan Judaism', type: 'heritage partner', description: 'Both preserve Moroccan Jewish heritage.' },
      { name: 'Conseil des Communautes Israelites du Maroc', type: 'communal support', description: 'Supported by Morocco\'s Jewish communal council.' },
      { name: 'Moroccan Government', type: 'government initiative', description: 'Part of King Mohammed VI\'s heritage preservation program.' }
    ]
  },
  'moriah-college': {
    description: 'Moriah College is the largest Jewish day school in the Southern Hemisphere, located in Sydney, Australia. Founded in 1943, the school serves over 1,800 students from preschool through Year 12. Moriah provides a dual curriculum integrating the New South Wales Board of Studies requirements with Jewish studies, Hebrew language, and Israel education. The school is Modern Orthodox in orientation but welcomes students from all Jewish backgrounds. It has produced notable alumni in Australian business, law, medicine, and public life. Moriah\'s campus in Queens Park includes state-of-the-art facilities including performing arts centers, science labs, and sports complexes. The school is a cornerstone institution of Sydney\'s 50,000-strong Jewish community.',
    individuals: [],
    connections: [
      { name: 'Executive Council of Australian Jewry', type: 'communal link', description: 'Part of the organized Australian Jewish community.' },
      { name: 'Sydney Jewish Museum', type: 'educational partner', description: 'Students participate in Holocaust education at the museum.' }
    ]
  },
  'hebrew-congregation-of-st-thomas': {
    description: 'The Hebrew Congregation of St. Thomas in the US Virgin Islands maintains one of the oldest synagogues in continuous use in the Western Hemisphere. The Beracha Veshalom Vegmiluth Hasadim synagogue was founded in 1796 by Sephardic Jews who settled on the island during the Danish colonial era. The synagogue features a distinctive sand floor, said to symbolize the desert wanderings of the Israelites and the secret worship of conversos during the Inquisition. Charlotte Amalie was once a major Jewish commercial center, and the community played a significant role in Caribbean trade. The artist Camille Pissarro was born into the St. Thomas Jewish community in 1830. Today the congregation serves approximately 100-150 community members plus many Jewish tourists.',
    individuals: [],
    connections: [
      { name: 'Caribbean Jewish Congress', type: 'regional body', description: 'Part of the network of Caribbean Jewish communities.' },
      { name: 'American Jewish Historical Society', type: 'heritage partner', description: 'Connected as one of the oldest Jewish congregations in the Americas.' }
    ]
  },
  'hebraica-buenos-aires': {
    description: 'Sociedad Hebraica Argentina, commonly known as Hebraica Buenos Aires, is the largest Jewish social, cultural, and educational institution in Argentina and one of the largest in the world. Founded in 1926, its massive complex in Buenos Aires houses sports facilities, theaters, libraries, art galleries, and educational centers. Hebraica serves as the cultural hub of Argentina\'s 180,000-strong Jewish community, the largest in Latin America. The institution was profoundly impacted by the 1994 AMIA bombing (the AMIA building was nearby), which killed 85 people in the deadliest antisemitic attack in Latin American history. Hebraica has produced Olympic athletes and hosts major cultural events that bridge Argentine and Jewish cultures.',
    individuals: [],
    connections: [
      { name: 'AMIA (Asociacion Mutual Israelita Argentina)', type: 'communal partner', description: 'Both are pillars of Jewish communal life in Buenos Aires.' },
      { name: 'DAIA', type: 'advocacy partner', description: 'Works with DAIA on representing Argentine Jewish interests.' },
      { name: 'Maccabi World Union', type: 'sports affiliate', description: 'Connected to the global Jewish sports movement.' }
    ]
  },
  'jews-in-latvia-museum': {
    description: 'The Jews in Latvia Museum in Riga documents the history of Latvian Jewry from the 16th century to the present. Latvia\'s Jewish population of approximately 93,000 before World War II was nearly annihilated during the Holocaust, with approximately 70,000 Latvian Jews murdered by the Nazis and local collaborators, including the notorious Rumbula forest massacres of 1941 where approximately 25,000 Riga Jews were shot in two days. The museum preserves this history through documents, photographs, personal artifacts, and survivor testimonies. It also documents the contributions of Latvian Jews to the country\'s cultural, economic, and intellectual life. Today approximately 6,000-9,000 Jews live in Latvia, primarily in Riga.',
    individuals: [],
    connections: [
      { name: 'Yad Vashem', type: 'research partner', description: 'Collaborates on documenting the Holocaust in Latvia.' },
      { name: 'Riga Ghetto and Latvian Holocaust Museum', type: 'partner museum', description: 'Both document the Holocaust in Latvia.' }
    ]
  },
  'cercle-bernard-lazare': {
    description: 'Cercle Bernard Lazare is a French Jewish leftist association named after Bernard Lazare, the journalist and anarchist who was one of the first defenders of Alfred Dreyfus during the Dreyfus Affair. Founded in 1958, the organization promotes progressive Jewish values and advocates for peace and justice, including Israeli-Palestinian peace. It represents the secular, left-wing tradition within French Jewish life, which has been historically significant but has diminished as French Jewish politics have shifted rightward due to antisemitism and security concerns. The Cercle organizes conferences, publishes analyses, and maintains a presence in French public debate on Jewish identity, Israel-Palestine, and the fight against both antisemitism and racism.',
    individuals: [],
    connections: [
      { name: 'JCall (European Jewish Call for Reason)', type: 'ideological partner', description: 'Both represent progressive Jewish voices in France and Europe.' },
      { name: 'CRIF', type: 'communal context', description: 'Operates within the broader French Jewish communal framework.' }
    ]
  },
  'schweizerischer-israelitischer-gemeindebund-sig': {
    description: 'The Schweizerischer Israelitischer Gemeindebund (SIG, Swiss Federation of Jewish Communities) is the umbrella organization representing the approximately 18,000 Jews in Switzerland. Founded in 1904, the SIG represents 23 Jewish communities across Switzerland. The organization gained particular prominence through its role in the 1990s Swiss banking controversy, when it was revealed that Swiss banks had retained dormant accounts belonging to Holocaust victims. The resulting investigation and 1998 settlement of $1.25 billion brought global attention to Switzerland\'s wartime conduct. The SIG combats antisemitism, advocates for Jewish community interests with the Swiss federal government, and addresses issues of religious freedom including ritual slaughter (shechita), which has been banned in Switzerland since 1893.',
    individuals: [
      { id: slug('Ralph Lewin'), name: 'Ralph Lewin', role: 'President', bio: 'President of the Swiss Federation of Jewish Communities, advocating for Jewish community interests in Switzerland.' }
    ],
    connections: [
      { name: 'European Jewish Congress', type: 'affiliate', description: 'SIG represents Swiss Jewry in the EJC.' },
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Connected to the WJC for international representation.' },
      { name: 'World Jewish Restitution Organization', type: 'restitution partner', description: 'Worked together on the Swiss banking scandal resolution.' }
    ]
  },
  'makuya': {
    description: 'Makuya is a Japanese religious movement founded in 1948 by Abraham Ikuro Teshima that draws heavily on Jewish and biblical traditions. The movement, based primarily in Japan, has several thousand adherents who study Hebrew, observe modified Jewish practices, and maintain a deep connection to the State of Israel. Makuya members regularly visit Israel, and the movement has established study centers in Jerusalem. Teshima was influenced by his study of the Hebrew Bible and developed a theology emphasizing the restoration of Israel as fulfilling biblical prophecy. Makuya is considered one of the most philo-Semitic religious movements in Asia. Members have served as volunteers in Israel and have been recognized by Israeli institutions for their support.',
    individuals: [
      { id: slug('Abraham Ikuro Teshima'), name: 'Abraham Ikuro Teshima', role: 'Founder', bio: 'Japanese Christian-influenced thinker who founded Makuya in 1948, emphasizing Hebrew scripture and support for Israel.' }
    ],
    connections: [
      { name: 'Hebrew University of Jerusalem', type: 'academic connection', description: 'Makuya members study at and support Hebrew University.' },
      { name: 'Jewish Agency for Israel', type: 'relationship', description: 'Makuya has been recognized for its support of Israel.' }
    ]
  },
  'luxottica': {
    description: 'Luxottica is the world\'s largest eyewear company, now part of EssilorLuxottica following a 2018 merger. Founded in 1961 by Leonardo Del Vecchio in Italy, the company controls a massive share of the global eyewear market through brands including Ray-Ban, Oakley, Persol, and Oliver Peoples, along with licensed brands like Chanel, Prada, and Giorgio Armani. The company has significant connections to Israeli business and technology. Luxottica has invested in Israeli optical technology companies and maintains research partnerships with Israeli institutions. Dario Werthein, an Argentine-Israeli businessman, served on the board. The company\'s market dominance has faced scrutiny for near-monopolistic control of the eyewear industry, with consumer advocates arguing this artificially inflates prices.',
    individuals: [
      { id: slug('Leonardo Del Vecchio'), name: 'Leonardo Del Vecchio', role: 'Founder', bio: 'Italian billionaire who founded Luxottica and built it into the world\'s largest eyewear company. Died in 2022.' },
      { id: slug('Francesco Milleri'), name: 'Francesco Milleri', role: 'CEO', bio: 'CEO of EssilorLuxottica since 2021. Close associate of founder Leonardo Del Vecchio.' }
    ],
    connections: [
      { name: 'Essilor', type: 'merger partner', description: 'Merged with Essilor in 2018 to form EssilorLuxottica.' }
    ]
  },
  'sephardic-house-of-barcelona': {
    description: 'The Sephardic House of Barcelona (Casa de Sefarad Barcelona) preserves and promotes the Sephardic Jewish heritage of Barcelona and Catalonia. Barcelona had one of the most important Jewish communities in medieval Spain, with a thriving Call (Jewish quarter) that produced renowned scholars, translators, and cartographers. The 1391 anti-Jewish riots devastated the community, and the 1492 expulsion ended open Jewish life in the city. Today the Sephardic House works to recover this heritage through cultural events, educational programs, tours of the medieval Call, and connections with the global Sephardic diaspora. The organization supports archaeological preservation of Barcelona\'s Jewish heritage sites and promotes dialogue between the city\'s small but growing modern Jewish community and broader Catalan society.',
    individuals: [],
    connections: [
      { name: 'Federacion de Comunidades Judias de Espana (FCJE)', type: 'communal link', description: 'Part of Spain\'s organized Jewish community.' },
      { name: 'Red de Juderias de Espana', type: 'heritage network', description: 'Barcelona is part of Spain\'s Jewish heritage network.' }
    ]
  },
  'central-board-of-jewish-communities-in-greece-kis': {
    description: 'The Central Board of Jewish Communities in Greece (KIS, Kentriko Israelitiko Symvoulio) is the official representative body of Greek Jewry. Greece\'s Jewish history spans over 2,300 years, making it one of the oldest Jewish communities in Europe. The community was devastated during the Holocaust: approximately 86% of Greek Jews were murdered, including nearly the entire community of Thessaloniki (Salonika), which had been one of the largest and most important Sephardic communities in the world with over 50,000 members. Today approximately 5,000 Jews live in Greece, primarily in Athens and Thessaloniki. KIS manages communal affairs, combats antisemitism, preserves heritage sites including ancient synagogues and Holocaust memorials, and represents Greek Jewry to the government and international bodies.',
    individuals: [
      { id: slug('David Saltiel'), name: 'David Saltiel', role: 'President', bio: 'President of the Central Board of Jewish Communities in Greece, leading the community\'s representation and heritage preservation.' }
    ],
    connections: [
      { name: 'World Jewish Congress', type: 'affiliate', description: 'KIS represents Greek Jewry in the WJC.' },
      { name: 'European Jewish Congress', type: 'affiliate', description: 'Member of the European Jewish Congress.' }
    ]
  },
  'jewish-community-of-lubumbashi': {
    description: 'The Jewish Community of Lubumbashi in the Democratic Republic of the Congo represents one of sub-Saharan Africa\'s most unusual Jewish stories. Lubumbashi (formerly Elisabethville) attracted Jewish settlers in the early 20th century, drawn by the mineral wealth of the Katanga region. At its peak in the 1950s, the community numbered several hundred, primarily Sephardic Jews from Rhodes and Ashkenazi Jews from Belgium and Eastern Europe. They established a synagogue, cemetery, and community institutions. After Congolese independence in 1960 and subsequent political instability, most Jews departed. Today only a handful remain, but the community buildings and cemetery still stand as testimony to this little-known chapter of African Jewish history.',
    individuals: [],
    connections: [
      { name: 'American Jewish Joint Distribution Committee', type: 'historical support', description: 'JDC provided support to small African Jewish communities.' }
    ]
  },
  'unione-delle-comunit-ebraiche-italiane-ucei': {
    description: 'The Unione delle Comunita Ebraiche Italiane (UCEI) is the umbrella organization of Italian Jewry, representing the approximately 25,000-30,000 Jews in Italy across 21 communities. Italian Jewry is one of the oldest in Europe, with a continuous presence dating to the Roman Republic period (2nd century BCE). The UCEI managed Italy\'s complex Jewish communal structure, which includes communities in Rome (the oldest in Europe, dating to 161 BCE), Milan, Turin, Florence, Venice, and other cities. Italy\'s Jewish community was partially protected during the Holocaust by the actions of individual Italians and some officials, though approximately 7,500 Italian Jews were deported and murdered. UCEI operates rabbinical courts, kosher supervision, schools, and cultural institutions.',
    individuals: [
      { id: slug('Noemi Di Segni'), name: 'Noemi Di Segni', role: 'President', bio: 'President of the Union of Italian Jewish Communities, the umbrella organization for Italian Jewry.' }
    ],
    connections: [
      { name: 'European Jewish Congress', type: 'affiliate', description: 'Represents Italian Jewry in the European Jewish Congress.' },
      { name: 'CDEC', type: 'cultural partner', description: 'UCEI works with CDEC on Italian Jewish documentation and research.' },
      { name: 'Comunita Ebraica di Roma', type: 'member', description: 'Rome\'s ancient Jewish community is the UCEI\'s largest.' }
    ]
  },
  'neve-shalom-synagogue': {
    description: 'Neve Shalom Synagogue is the largest synagogue in Istanbul, Turkey, and has been the target of multiple terrorist attacks. Built in 1951 in the Galata quarter, it serves as the principal place of worship for Istanbul\'s Jewish community, which numbers approximately 15,000-20,000 and is the largest Muslim-majority country Jewish population outside Israel and Iran. The synagogue was attacked in 1986 by Palestinian militants (killing 22 worshippers), bombed in 2003 by al-Qaeda affiliates (killing 6), and targeted in a failed attack in 2016. Despite these attacks, the community has persisted. Turkey\'s Jewish community dates to the Ottoman Empire\'s welcoming of Sephardic Jews expelled from Spain in 1492, and Turkish Jews have played significant roles in commerce, industry, and diplomacy.',
    individuals: [],
    connections: [
      { name: 'Turkiye Musevi Cemaati', type: 'governing body', description: 'The synagogue is under the governance of the Turkish Jewish community council.' },
      { name: 'World Sephardi Federation', type: 'heritage connection', description: 'Part of the global Sephardic community heritage.' }
    ]
  },
  'museum-of-turkish-jews': {
    description: 'The Museum of Turkish Jews (500. Yil Vakfi Turk Musevileri Muzesi) in Istanbul is housed in the Zulfaris Synagogue, built in the 17th century. The museum, opened in 2001, celebrates the history of Jews in Turkey, particularly the Ottoman Empire\'s welcome of Sephardic Jews expelled from Spain in 1492. The museum displays ethnographic and historical materials including ritual objects, documents, photographs, clothing, and artifacts spanning five centuries of Jewish life in Turkey. It highlights the Ottoman tradition of tolerance and the contributions of Turkish Jews to the country\'s commerce, industry, music, and culture. The museum is operated by the Quincentennial Foundation, established in 1992 to mark 500 years since the welcome of Sephardic Jews.',
    individuals: [],
    connections: [
      { name: 'Turkiye Musevi Cemaati', type: 'communal partner', description: 'The museum is connected to Turkey\'s Jewish community organization.' },
      { name: 'Neve Shalom Synagogue', type: 'community institution', description: 'Both are key institutions of Istanbul\'s Jewish heritage.' }
    ]
  },
  'kazerne-dossin-memorial': {
    description: 'Kazerne Dossin is the Holocaust memorial, museum, and documentation center in Mechelen (Malines), Belgium, located in the former SS Transit Camp from which 25,257 Jews and 352 Roma and Sinti were deported to Auschwitz-Birkenau between 1942 and 1944. Of those deported, only 1,207 survived. The museum, which opened its modern wing in 2012, documents the persecution and murder of Belgian Jews and Roma, as well as broader themes of mass violence and human rights. Belgium\'s Jewish community of approximately 66,000 before the war was targeted through roundups and deportations organized by the German occupation with collaboration from local authorities. The camp building is preserved as a memorial, and the museum serves as a major educational institution.',
    individuals: [],
    connections: [
      { name: 'Yad Vashem', type: 'research partner', description: 'Collaborates on Holocaust documentation and research.' },
      { name: 'Auschwitz-Birkenau Memorial', type: 'memorial connection', description: 'Documents the deportation route from Mechelen to Auschwitz.' }
    ]
  },
  'eliyahu-hanavi-synagogue': {
    description: 'The Eliyahu Hanavi Synagogue in Alexandria, Egypt, is one of the most magnificent synagogues in the Middle East and Africa. Originally built in 1354 and rebuilt in its current neo-classical form in 1850, the synagogue can seat up to 700 worshippers and features Italian marble columns, ornate stained glass, and a stunning interior. It underwent a major Egyptian government-funded restoration completed in 2020 costing $5.4 million, despite Alexandria\'s Jewish community having dwindled to fewer than a dozen people from a peak of approximately 40,000 in the 1940s. Egypt\'s Jews, who numbered about 80,000, were largely expelled or forced to flee following the Suez Crisis of 1956 and the Arab-Israeli wars. The restoration represents Egypt\'s effort to preserve its multicultural heritage.',
    individuals: [],
    connections: [
      { name: 'Egyptian Ministry of Antiquities', type: 'restoration partner', description: 'The Egyptian government funded the synagogue\'s restoration.' },
      { name: 'World Monuments Fund', type: 'preservation partner', description: 'International organizations have supported the synagogue\'s preservation.' }
    ]
  },
  'cape-town-holocaust-and-genocide-centre': {
    description: 'The Cape Town Holocaust and Genocide Centre (CTHGC) is Africa\'s first Holocaust museum, opened in 1999 in Cape Town, South Africa. The museum uniquely connects the Holocaust to the South African experience of apartheid and other genocides including Rwanda, Armenia, and Cambodia. It uses personal testimonies and artifacts from the approximately 500 Holocaust survivors who settled in Cape Town after World War II. The museum serves as a major educational institution, reaching over 30,000 students annually and training teachers across Southern Africa. It is particularly significant in the South African context, where parallels between Nazi racial ideology and apartheid resonate deeply. The museum also addresses contemporary issues of xenophobia, racism, and human rights in South Africa.',
    individuals: [],
    connections: [
      { name: 'South African Jewish Board of Deputies', type: 'communal partner', description: 'Works with the SAJBD on Holocaust education.' },
      { name: 'Yad Vashem', type: 'partner', description: 'Collaborates on content and educational materials.' },
      { name: 'Sydney Jewish Museum', type: 'museum peer', description: 'Both connect Holocaust history to local national experiences.' }
    ]
  },
  'jewish-community-centre-of-krak-w-jcc-krak-w': {
    description: 'The Jewish Community Centre of Krakow (JCC Krakow) is one of the most vibrant centers of Jewish life in post-Holocaust Poland. Opened in 2008 in the Kazimierz neighborhood - the historic Jewish quarter and the area depicted in Schindler\'s List - the JCC serves as a hub for the renewed Jewish community and cultural life in Krakow. Before the Holocaust, Krakow had 65,000 Jews comprising approximately 25% of the city\'s population. The Nazis created the Krakow Ghetto and the nearby Plaszow concentration camp. Today the JCC serves approximately 600 active community members and thousands of visitors through cultural programs, Hebrew and Yiddish classes, Shabbat dinners, holiday celebrations, and genealogy resources for descendants of Krakow Jews worldwide.',
    individuals: [
      { id: slug('Jonathan Ornstein'), name: 'Jonathan Ornstein', role: 'Executive Director', bio: 'American-born executive director of JCC Krakow, leading the revival of Jewish life in one of Europe\'s most historically significant Jewish cities.' }
    ],
    connections: [
      { name: 'American Jewish Joint Distribution Committee', type: 'funder', description: 'JDC has been a key supporter of Jewish communal revival in Poland.' },
      { name: 'Galicia Jewish Museum', type: 'cultural partner', description: 'Both promote Jewish heritage in Krakow\'s Kazimierz district.' }
    ]
  },
  'danish-jewish-museum': {
    description: 'The Danish Jewish Museum (Dansk Jodisk Museum) in Copenhagen tells the story of Jewish life in Denmark from the 17th century to the present, housed in a building designed by architect Daniel Libeskind. Denmark holds a unique place in Holocaust history: in October 1943, Danish citizens organized the rescue of approximately 7,220 of Denmark\'s 7,800 Jews, ferrying them to safety in neutral Sweden in fishing boats. This act of collective national resistance saved 95% of Danish Jewry and remains one of the most extraordinary rescue operations of the Holocaust. The museum documents this history alongside the broader story of Jewish immigration, integration, and cultural life in Denmark. Today approximately 6,000-8,000 Jews live in Denmark.',
    individuals: [],
    connections: [
      { name: 'Jewish Museum Berlin', type: 'architecture connection', description: 'Both have buildings designed by Daniel Libeskind.' },
      { name: 'Jewish Historical Museum Amsterdam', type: 'museum peer', description: 'Both document Jewish experiences in Northern European countries.' }
    ]
  },
  'caribbean-jewish-congress': {
    description: 'The Caribbean Jewish Congress represents the scattered but historically significant Jewish communities across the Caribbean islands. Jewish settlement in the Caribbean dates to the 1600s, making it among the oldest in the Americas. Sephardic Jews fleeing the Inquisition settled in Curacao (1651), Jamaica (1655), Barbados (1628), and other islands, establishing some of the oldest synagogues in the Western Hemisphere. These communities played crucial roles in the sugar, shipping, and trading industries that shaped the colonial Caribbean. Today the Caribbean Jewish population is small but maintains historic synagogues and congregations in Jamaica, Curacao, Trinidad, US Virgin Islands, Barbados, and other islands.',
    individuals: [],
    connections: [
      { name: 'Hebrew Congregation of St. Thomas', type: 'member', description: 'One of the historic congregations in the Caribbean network.' },
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Represents Caribbean Jewry internationally.' }
    ]
  },
  'conseil-des-communaut-s-isra-lites-du-maroc': {
    description: 'The Conseil des Communautes Israelites du Maroc (Council of Israelite Communities of Morocco) is the official representative body of Moroccan Jewry. Morocco has the largest remaining Jewish community in the Arab world, estimated at approximately 2,500 people, concentrated in Casablanca. The council oversees communal affairs, synagogues, cemeteries, and heritage preservation in a country known for its relative tolerance toward its Jewish minority. Morocco\'s Jewish population once exceeded 250,000 before mass emigration to Israel and France. Under the Moroccan monarchy, particularly King Mohammed V (who reportedly protected Moroccan Jews during the Vichy era) and King Mohammed VI, the government has actively preserved Jewish heritage, restoring synagogues, cemeteries, and the mellah (Jewish quarter) districts.',
    individuals: [
      { id: slug('Serge Berdugo'), name: 'Serge Berdugo', role: 'Secretary General', bio: 'Secretary General of the Council of Israelite Communities of Morocco. Former Moroccan Minister of Tourism and ambassador. One of the most prominent Jewish political figures in the Arab world.' }
    ],
    connections: [
      { name: 'Museum of Moroccan Judaism', type: 'cultural institution', description: 'The council supports the only Jewish museum in the Arab world.' },
      { name: 'Bayt Dakira', type: 'heritage site', description: 'Connected to Morocco\'s Jewish heritage preservation network.' },
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Represents Moroccan Jewry internationally.' }
    ]
  },
  'jewish-community-of-skopje': {
    description: 'The Jewish Community of Skopje represents the small but resilient Jewish community of North Macedonia. Before the Holocaust, approximately 7,762 Jews lived in Macedonia, primarily in Skopje, Bitola, and Stip. On March 11, 1943, Bulgarian occupation forces (acting under Nazi direction) rounded up and deported nearly all Macedonian Jews - 7,144 people - to the Treblinka extermination camp. Only 200 survived, a destruction rate of 98%. The post-war community reconstituted itself and today numbers approximately 200 people. The community operates the Holocaust Memorial Center in Skopje, opened in 2011, which is the first Holocaust museum in a former Yugoslav state. Macedonian Jewish heritage also includes the Beit Yakov Synagogue, which houses the community center.',
    individuals: [],
    connections: [
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Represents Macedonian Jewry internationally.' },
      { name: 'Yad Vashem', type: 'memorial partner', description: 'Collaborates on documenting the destruction of Macedonian Jewry.' }
    ]
  },
  't-rkiye-musevi-cemaati': {
    description: 'Turkiye Musevi Cemaati (The Jewish Community of Turkey) is the governing body of Turkish Jewry, representing approximately 15,000-20,000 Jews, primarily in Istanbul with smaller communities in Izmir and Ankara. The community is overwhelmingly Sephardic, descended from Jews who were welcomed by Sultan Bayezid II after the 1492 Spanish expulsion. For centuries, Ottoman and Turkish Jews played significant roles in commerce, diplomacy, and the professions. The community faced challenges including the 1942 Varlik Vergisi (Capital Tax) that disproportionately targeted non-Muslim minorities, and the 1955 Istanbul pogrom. Despite declining numbers due to emigration (primarily to Israel), the community maintains 16 synagogues in Istanbul, schools, a hospital, and cultural institutions.',
    individuals: [
      { id: slug('Ishak Ibrahimzadeh'), name: 'Ishak Ibrahimzadeh', role: 'President', bio: 'President of the Jewish Community of Turkey, leading the community\'s representation and institutional management.' }
    ],
    connections: [
      { name: 'Neve Shalom Synagogue', type: 'community institution', description: 'Istanbul\'s principal synagogue is under the community\'s governance.' },
      { name: 'Museum of Turkish Jews', type: 'cultural institution', description: 'The community supports the museum documenting Turkish Jewish history.' },
      { name: 'European Jewish Congress', type: 'affiliate', description: 'Represents Turkish Jewry in European forums.' }
    ]
  },
  'old-new-synagogue-altneuschul': {
    description: 'The Old New Synagogue (Altneuschul or Staronova Synagoga) in Prague is the oldest active synagogue in Europe, built around 1270 in the early Gothic style. It has served as the main synagogue of Prague\'s Jewish community for over 750 years, surviving fires, pogroms, Nazi occupation, and Communist rule. According to legend, the attic houses the remains of the Golem, the clay figure created by Rabbi Judah Loew ben Bezalel (the Maharal of Prague, c. 1520-1609) to protect the Jewish community from antisemitic attacks. The synagogue is part of the Prague Jewish Quarter (Josefov), one of the best-preserved Jewish historic districts in Europe. It remains in active use for Shabbat and holiday services by Prague\'s approximately 3,000-member Jewish community.',
    individuals: [],
    connections: [
      { name: 'Jewish Museum in Prague', type: 'heritage partner', description: 'Part of Prague\'s Jewish heritage complex.' },
      { name: 'Federation of Jewish Communities in the Czech Republic', type: 'communal body', description: 'Under the Czech Jewish community\'s governance.' }
    ]
  },
  'jewish-heritage-centre-kochi': {
    description: 'The Jewish Heritage Centre in Kochi (Cochin), India, preserves the legacy of one of the oldest Jewish communities in the world. The Paradesi Synagogue in Kochi\'s Jew Town was built in 1568 and is the oldest active synagogue in the Commonwealth of Nations. The Cochin Jews, or Malabar Jews, arrived in India as early as 70 CE according to tradition, making them one of the most ancient Jewish communities outside the Middle East. They were divided into the Paradesi (foreign) Jews and the older Malabari Jews. At their peak the community numbered several thousand, but most migrated to Israel after 1948. Today fewer than 30 Jews remain in Kochi. The heritage centre and synagogue are major tourist attractions, featuring beautiful Chinese hand-painted floor tiles, Belgian glass chandeliers, and centuries of Jewish artifacts.',
    individuals: [],
    connections: [
      { name: 'Federation of Jewish Communities of India', type: 'communal link', description: 'Connected to India\'s broader Jewish community network.' },
      { name: 'Indian government', type: 'protected heritage', description: 'The Paradesi Synagogue is a protected heritage site.' }
    ]
  },
  'ohel-rachel-synagogue': {
    description: 'Ohel Rachel Synagogue in Shanghai, China, is the largest synagogue in East Asia. Built in 1920 by Jacob Sassoon (of the Baghdadi Sassoon dynasty) and named after his wife Rachel, the synagogue served Shanghai\'s Sephardic Jewish community. Shanghai has a unique place in Jewish history: during World War II, the city became a refuge for approximately 20,000 Jewish refugees from Europe, most of whom were concentrated in the Hongkou ghetto. Unlike almost everywhere else in the world, Shanghai required no visa for entry, saving thousands of lives. The synagogue was confiscated after the Communist revolution and has been intermittently accessible since. It is currently used by the Shanghai Municipal Education Commission, though Jewish visitors can sometimes arrange access.',
    individuals: [],
    connections: [
      { name: 'Shanghai Jewish Refugees Museum', type: 'heritage partner', description: 'Both document Jewish history in Shanghai.' },
      { name: 'Sassoon family', type: 'founder connection', description: 'Built by Jacob Sassoon of the prominent Baghdadi Jewish trading dynasty.' }
    ]
  },
  'surabaya-jewish-community': {
    description: 'The Jewish Community of Surabaya, Indonesia, represents a nearly extinct community that was once the largest in Southeast Asia\'s most populous country. Surabaya\'s Jews, primarily Baghdadi and Dutch Sephardic traders, settled in the city during the Dutch colonial era. The community built a synagogue and maintained a cemetery. At its peak in the 1920s-1930s, the community numbered several hundred. The Japanese occupation during World War II disrupted the community, and Indonesian independence and subsequent political changes led to the departure of most Jews. Today the community is essentially defunct, with the former synagogue building repurposed. The Jewish cemetery in Surabaya remains as one of the few physical traces of what was once a thriving community.',
    individuals: [],
    connections: []
  },
  'judiska-f-rsamlingen-i-stockholm': {
    description: 'Judiska Forsamlingen i Stockholm (The Jewish Community of Stockholm) is the largest Jewish congregation in Scandinavia, serving approximately 4,500 members out of Sweden\'s total Jewish population of 15,000-20,000. Founded in 1775, the congregation operates the Great Synagogue of Stockholm (built 1870), schools, a kindergarten, elderly care facilities, and cultural programs. Sweden\'s Jewish community has a distinctive history: while Sweden remained neutral during World War II, the country accepted Danish Jews fleeing Nazi occupation in 1943 (the famous rescue operation), and Swedish diplomat Raoul Wallenberg saved tens of thousands of Hungarian Jews through the issuance of protective passports. The congregation maintains active connections with Israel and Jewish communities worldwide.',
    individuals: [],
    connections: [
      { name: 'Official Council of Swedish Jewish Communities', type: 'umbrella body', description: 'The Stockholm congregation is a key member of Sweden\'s central council.' },
      { name: 'Judiska Museet i Stockholm', type: 'cultural partner', description: 'Connected to Stockholm\'s Jewish Museum.' }
    ]
  },
  'the-synagogue-of-bahrain': {
    description: 'The Synagogue of Bahrain is one of very few synagogues in the Persian Gulf region. Bahrain\'s Jewish community, though tiny (fewer than 50 people), has roots dating to the early 20th century and is notable for the relatively open position of Jews in Bahraini society. Houda Nonoo, a Bahraini Jew, served as Bahrain\'s Ambassador to the United States from 2008 to 2013, being the first Jewish ambassador from any Arab country. After the Abraham Accords normalization agreements of 2020, Bahrain\'s Jewish community gained more visibility. The synagogue, which was renovated in 2021, serves as both a place of worship and a symbol of Bahrain\'s religious pluralism. King Hamad bin Isa Al Khalifa has made public gestures of support for the Jewish community.',
    individuals: [
      { id: slug('Houda Nonoo'), name: 'Houda Nonoo', role: 'Community Leader', bio: 'Bahraini-Jewish diplomat who served as Bahrain\'s Ambassador to the United States (2008-2013), the first Jewish ambassador from an Arab country.' }
    ],
    connections: [
      { name: 'Abraham Accords', type: 'diplomatic context', description: 'Bahrain\'s normalization with Israel has boosted visibility of the Jewish community.' },
      { name: 'Association of Gulf Jewish Communities', type: 'regional network', description: 'Connected to the emerging network of Gulf Jewish communities.' }
    ]
  },
  'jewish-heritage-of-malta': {
    description: 'Jewish Heritage of Malta documents and preserves the traces of Jewish life on the Mediterranean island nation. Jews have lived in Malta since Roman times, with significant communities in Mdina and Valletta. The Knights of St. John expelled Jews in 1492 (coinciding with the Spanish expulsion), and the Inquisition operated in Malta until 1798. Despite persecution, some conversos (secret Jews) remained, and scholars have identified crypto-Jewish practices surviving into the modern era. Today Malta\'s Jewish community is extremely small (approximately 120 people), consisting mainly of expatriates. Heritage sites include the former Jewish street in Mdina, archaeological remains in Rabat, and the restored mikve (ritual bath). The Maltese-Jewish heritage has gained scholarly attention as part of the broader Mediterranean Sephardic diaspora story.',
    individuals: [],
    connections: [
      { name: 'Museum of Moroccan Judaism', type: 'Mediterranean heritage', description: 'Both preserve Jewish heritage in Mediterranean countries.' }
    ]
  },
  'magen-david-synagogue-mumbai': {
    description: 'Magen David Synagogue in the Byculla neighborhood of Mumbai, India, is a magnificent 19th-century synagogue built by David Sassoon in 1861. The synagogue is one of the architectural jewels of Mumbai, with a striking clock tower that has become a city landmark. Like the Keneseth Eliyahoo Synagogue, it was built by the Sassoon family, the Baghdadi Jewish trading dynasty that dominated commerce in British India. David Sassoon (1792-1864), known as the "Rothschild of the East," built a vast commercial empire spanning India, China, and the Middle East. His family endowed synagogues, schools, hospitals, libraries, and other institutions across Mumbai. The synagogue continues to serve the small remaining Baghdadi Jewish community and was granted Grade I heritage status.',
    individuals: [
      { id: slug('David Sassoon'), name: 'David Sassoon', role: 'Builder/Founder', bio: 'Baghdadi Jewish patriarch who built a trading empire across the British Empire and endowed major institutions in Mumbai including the Magen David Synagogue. Known as the "Rothschild of the East."' }
    ],
    connections: [
      { name: 'Keneseth Eliyahoo Synagogue', type: 'Sassoon-built institution', description: 'Both synagogues were built by members of the Sassoon family.' },
      { name: 'Sassoon Docks', type: 'family legacy', description: 'David Sassoon built Mumbai\'s famous docks alongside his communal institutions.' }
    ]
  },
  'sephardi-hebrew-congregation-of-harare': {
    description: 'The Sephardi Hebrew Congregation of Harare represents the Sephardic segment of Zimbabwe\'s Jewish community. Jews have lived in Zimbabwe (formerly Rhodesia) since the colonial era, with Sephardim arriving primarily from Rhodes, Salonika, and other Mediterranean communities. At its peak in the 1960s-70s, Zimbabwe\'s Jewish community numbered approximately 7,500. Since Zimbabwe\'s independence in 1980 and subsequent political and economic instability under Robert Mugabe\'s rule, the vast majority of Jews emigrated to South Africa, Israel, Australia, and elsewhere. Today fewer than 200 Jews remain in the entire country. The congregation maintains services and communal bonds among the remaining community members.',
    individuals: [],
    connections: [
      { name: 'South African Jewish Board of Deputies', type: 'regional connection', description: 'Connected to Southern African Jewish networks.' },
      { name: 'World Sephardi Federation', type: 'Sephardic heritage', description: 'Part of the global Sephardic network.' }
    ]
  },
  'red-de-juder-as-de-espa-a': {
    description: 'The Red de Juderias de Espana (Network of Jewish Quarters of Spain) is a nonprofit organization connecting 25 Spanish cities and towns that preserve their historic Jewish quarters (juderias or calls). Founded in 1999, the network promotes cultural tourism, heritage preservation, and historical education around Spain\'s medieval Jewish past. Spain was home to one of the largest and most culturally significant Jewish communities in world history, producing figures like Maimonides, Judah Halevi, and Abraham Ibn Ezra. The 1492 expulsion by Ferdinand and Isabella ended centuries of Jewish life, but the physical heritage remains in remarkable synagogues, ritual baths, and urban layouts across cities like Toledo, Cordoba, Girona, Segovia, and Hervas. The network has developed cultural routes, guided tours, and interpretive centers.',
    individuals: [],
    connections: [
      { name: 'Museo Sefardi de Toledo', type: 'member site', description: 'Toledo\'s Sephardic Museum is a flagship site of the network.' },
      { name: 'Casa Sefarad', type: 'heritage partner', description: 'Both promote Spain\'s Jewish heritage.' },
      { name: 'Federacion de Comunidades Judias de Espana (FCJE)', type: 'communal partner', description: 'Connected to Spain\'s modern Jewish community.' }
    ]
  },
  'funda-o-safra': {
    description: 'The Fundacao Safra (Safra Foundation) is the philanthropic arm of the Safra banking dynasty, one of the most prominent Sephardic Jewish families in the world. The Safra family, of Syrian-Lebanese Jewish origin, built a banking empire spanning Brazil, Switzerland, the United States, and the Middle East. Edmond Safra (1932-1999) founded Republic National Bank of New York and Safra National Bank of New York before his death in Monaco under suspicious circumstances in 1999. His brother Joseph Safra became the world\'s wealthiest banker. The Foundation supports healthcare, education, culture, and humanitarian causes in Brazil, Israel, and worldwide. The Safra family has donated hundreds of millions to Jewish institutions globally, including hospitals in Israel and synagogues in multiple countries.',
    individuals: [
      { id: slug('Joseph Safra'), name: 'Joseph Safra', role: 'Former Patriarch', bio: 'Syrian-Brazilian-Jewish banking magnate, once the wealthiest banker in the world. Head of Banco Safra and J. Safra Sarasin. Died in 2020.' },
      { id: slug('Vicky Safra'), name: 'Vicky Safra', role: 'President', bio: 'Widow of Edmond Safra and president of the Edmond J. Safra Foundation. Brazilian-born philanthropist and one of the wealthiest women in the world.' }
    ],
    connections: [
      { name: 'Banco Safra', type: 'family bank', description: 'The Safra Foundation is endowed through the family\'s banking empire.' },
      { name: 'Albert Einstein Israelite Hospital', type: 'philanthropic partner', description: 'The Safra family has been a major supporter of the Albert Einstein Hospital in Sao Paulo.' }
    ]
  },
  'albert-einstein-hospital': {
    description: 'Hospital Israelita Albert Einstein is one of the top-ranked hospitals in Latin America, located in Sao Paulo, Brazil. Founded in 1955 by the Jewish community of Sao Paulo, it is a nonprofit institution that combines world-class medical care with social responsibility programs providing free healthcare to underserved communities through its partnership with Brazil\'s public health system (SUS). Named after Albert Einstein, it is consistently ranked as the best hospital in Latin America by international medical rankings. The hospital pioneered many medical procedures in Brazil and maintains research partnerships with leading global medical institutions including Johns Hopkins, Harvard, and the Technion in Israel. It has been a critical institution during public health emergencies including the COVID-19 pandemic.',
    individuals: [
      { id: slug('Sidney Klajner Einstein'), name: 'Sidney Klajner', role: 'President', bio: 'President of Hospital Israelita Albert Einstein. Leading physician and hospital administrator.' }
    ],
    connections: [
      { name: 'Sociedade Beneficente Israelita Brasileira', type: 'founding body', description: 'Founded by the Jewish Beneficent Society of Sao Paulo.' },
      { name: 'Johns Hopkins Medicine', type: 'academic partner', description: 'Maintains medical research partnerships.' },
      { name: 'Technion-Israel Institute of Technology', type: 'research partner', description: 'Partners with the Technion on medical technology research.' }
    ]
  },
  'abrahamic-family-house': {
    description: 'The Abrahamic Family House on Saadiyat Island in Abu Dhabi, United Arab Emirates, is a landmark interfaith complex housing a mosque, a church, and a synagogue side by side. Designed by Sir David Adjaye and opened in 2023, it was inspired by the Document on Human Fraternity signed by Pope Francis and Grand Imam Ahmed el-Tayeb. The synagogue component makes it one of very few purpose-built synagogues in the Gulf region. The complex is a signature project of the Abraham Accords era and represents the UAE\'s positioning as a center of religious tolerance. The Jewish community in the UAE has grown significantly since the Abraham Accords of 2020, with estimates of 1,000-3,000 Jews now residing in Dubai and Abu Dhabi. The complex symbolizes a new era in Muslim-Jewish-Christian relations in the Gulf.',
    individuals: [],
    connections: [
      { name: 'Abraham Accords', type: 'diplomatic context', description: 'The complex emerged from the normalization of UAE-Israel relations.' },
      { name: 'Association of Gulf Jewish Communities', type: 'communal connection', description: 'Connected to the growing Jewish community infrastructure in the Gulf.' }
    ]
  },
  'wellington-hebrew-congregation': {
    description: 'The Wellington Hebrew Congregation, founded in 1843, is one of the oldest Jewish congregations in the Southern Hemisphere and the oldest in New Zealand. The congregation operates the Wellington Synagogue on Webb Street, built in 1908, which is a registered historic building. New Zealand\'s Jewish community numbers approximately 7,000-8,000 people concentrated in Auckland and Wellington. Despite its small size, the community has produced notable New Zealanders including politicians, judges, and business leaders. The congregation maintains a mikveh, cemetery, and educational programs, and serves as a communal hub for Wellington\'s Jews. New Zealand\'s Jewish history includes the arrival of gold rush-era settlers in the 1860s and refugees from Nazi Europe in the 1930s-40s.',
    individuals: [],
    connections: [
      { name: 'New Zealand Jewish Council', type: 'umbrella body', description: 'Part of New Zealand\'s national Jewish communal structure.' },
      { name: 'Executive Council of Australian Jewry', type: 'regional connection', description: 'Maintains ties with Australasian Jewish networks.' }
    ]
  },
  'house-of-israel-community': {
    description: 'The House of Israel community represents one of several emerging Jewish communities in sub-Saharan Africa. These communities, found in countries like Ghana, Nigeria, Uganda, and others, consist of Africans who practice Judaism and identify as descendants of ancient Israelite communities or who have independently adopted Jewish practices. Some trace their origins to migration patterns from North Africa or the Middle East, while others point to oral traditions of Israelite ancestry. These communities face challenges in gaining recognition from mainstream Judaism but have received varying degrees of support from organizations like Kulanu and the Jewish Agency. The movement represents a growing part of the global Jewish population and raises important questions about Jewish identity and inclusivity.',
    individuals: [],
    connections: [
      { name: 'Kulanu', type: 'outreach partner', description: 'Kulanu supports emerging Jewish communities in Africa and worldwide.' },
      { name: 'Jewish Agency for Israel', type: 'recognition body', description: 'Some African Jewish communities seek recognition from the Jewish Agency.' }
    ]
  },
  'bene-israel-community': {
    description: 'The Bene Israel are the largest of India\'s Jewish communities, numbering approximately 60,000-70,000 worldwide with the majority now living in Israel. The community claims descent from Jews who settled on the Konkan coast of western India approximately 2,100 years ago, making them one of the most ancient Jewish communities in the world. The Bene Israel maintained Jewish practices including Shabbat observance, circumcision, and kosher-adjacent dietary laws for centuries despite isolation from other Jewish communities. They served prominently in the Indian military, civil service, and the Bollywood film industry. Mass aliyah to Israel began after 1948, and today the Israeli Bene Israel community is concentrated in cities like Beersheba, Ramle, and Dimona. Those remaining in India live primarily in Mumbai and Pune.',
    individuals: [],
    connections: [
      { name: 'Federation of Jewish Communities of India', type: 'communal body', description: 'The Bene Israel are represented within India\'s broader Jewish communal structure.' },
      { name: 'Jewish Agency for Israel', type: 'aliyah partner', description: 'The Jewish Agency facilitated Bene Israel aliyah to Israel.' }
    ]
  },
  'museum-of-the-jewish-people-at-beit-hatfutsot': {
    description: 'The Museum of the Jewish People at Beit Hatfutsot (ANU Museum), located on the campus of Tel Aviv University, is the world\'s premier museum dedicated to the story of the global Jewish people. Originally opened in 1978, it underwent a massive renovation and reopened in 2021 as ANU - Museum of the Jewish People. The museum presents the ongoing story of Jewish communities across the world through interactive displays, multimedia installations, genealogical databases, and rotating exhibitions. Its databases include the world\'s largest collection of Jewish music, an extensive Jewish surnames database, and a visual documentation of historic synagogues from 80 countries. The museum connects the past and present of Jewish civilization across six continents.',
    individuals: [
      { id: slug('Irina Nevzlin Beit Hatfutsot'), name: 'Irina Nevzlin', role: 'Chairwoman', bio: 'Chairwoman of the Board of Directors of the Museum of the Jewish People. Russian-Israeli philanthropist.' },
      { id: slug('Dan Tadmor Beit Hatfutsot'), name: 'Dan Tadmor', role: 'CEO', bio: 'CEO of the Museum of the Jewish People at Beit Hatfutsot.' }
    ],
    connections: [
      { name: 'Tel Aviv University', type: 'campus partner', description: 'Located on the TAU campus.' },
      { name: 'National Museum of American Jewish History', type: 'museum peer', description: 'Both tell the story of Jewish diasporic experience.' },
      { name: 'Jewish Museum Berlin', type: 'museum peer', description: 'Both are major Jewish museums documenting global Jewish civilization.' }
    ]
  },
  'temple-emil-manila': {
    description: 'Temple Emil is the only synagogue in the Philippines, located in Makati, Metro Manila. It serves the approximately 100-200 Jews living in the Philippines, a community with a remarkable history. During World War II, Philippine President Manuel Quezon, with the assistance of the Frieder family (American Jewish businessmen based in Manila), launched a rescue plan that brought approximately 1,300 Jewish refugees from Europe to the Philippines. This "Open Door" policy, one of the few in the world at the time, saved lives when most countries refused entry to Jewish refugees. The synagogue was established in the post-war era and named after the Frieder brothers\' grandfather. It serves as both a place of worship and community gathering space for expatriates and visitors.',
    individuals: [],
    connections: [
      { name: 'American Jewish Joint Distribution Committee', type: 'historical support', description: 'JDC supported Jewish communities in Asia including the Philippines.' }
    ]
  },
  'chabad-of-kathmandu': {
    description: 'Chabad of Kathmandu, Nepal, operates one of the most unique Chabad centers in the world, serving the thousands of Israeli and Jewish backpackers who visit Nepal annually, particularly after completing their military service. During the trekking season, the Kathmandu Chabad House hosts some of the largest Passover seders in the world, with over 1,500 participants. Founded by Rabbi Chezki and Chani Lifshitz, it also provides emergency assistance to travelers, including during the devastating 2015 Nepal earthquake when Chabad coordinated Israeli rescue teams. The center serves kosher meals, provides Shabbat services, and offers a "home away from home" for young Israelis on the popular post-army Nepal trekking circuit.',
    individuals: [
      { id: slug('Chezki Lifshitz'), name: 'Rabbi Chezki Lifshitz', role: 'Director', bio: 'Director of Chabad of Kathmandu since 1999. Coordinated major rescue efforts during the 2015 Nepal earthquake.' }
    ],
    connections: [
      { name: 'Chabad', type: 'parent organization', description: 'Part of the global Chabad-Lubavitch network.' },
      { name: 'Israel Defense Forces', type: 'community connection', description: 'Serves as a gathering point for post-IDF travelers in Nepal.' }
    ]
  },
  'jewish-community-of-sarajevo': {
    description: 'The Jewish Community of Sarajevo (La Benevolencija) is one of the most historically significant and resilient Jewish communities in Southeastern Europe. Jews have lived in Sarajevo since 1565, when Sephardic refugees from Spain settled there under Ottoman protection. The community produced the famous Sarajevo Haggadah, a 14th-century illuminated manuscript that is one of the most valuable Jewish books in existence. During World War II, approximately 10,000 of Bosnia\'s 14,000 Jews were murdered. During the Bosnian War (1992-1995), La Benevolencija operated as a humanitarian organization providing aid to all Sarajevans regardless of ethnicity - one of the few organizations to cross all sectarian lines. Today approximately 700-1,000 Jews live in Sarajevo.',
    individuals: [],
    connections: [
      { name: 'American Jewish Joint Distribution Committee', type: 'support', description: 'JDC has provided ongoing support to the Sarajevo Jewish community.' },
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Represents Bosnian Jewry internationally.' }
    ]
  },
  'jewish-community-of-belgrade': {
    description: 'The Jewish Community of Belgrade (Jevrejska Opcina Beograd) represents Serbia\'s Jewish community of approximately 2,500-3,000 people, concentrated in the capital. Belgrade\'s Jewish history dates to Roman times, and the city has had an organized Jewish community since the early Ottoman period. Before World War II, approximately 12,000 Jews lived in Belgrade. The Nazi occupation was catastrophic: Serbia was declared "Judenfrei" (free of Jews) by August 1942, with approximately 90% of Serbian Jews murdered. The community rebuilt after the war and today operates a synagogue (the Sukkat Shalom in Marsala Birjuzova Street), community center, Jewish historical museum, and cultural programs. Belgrade\'s Jewish community has maintained warm relations with the broader Serbian society and government.',
    individuals: [],
    connections: [
      { name: 'World Jewish Congress', type: 'affiliate', description: 'Represents Serbian Jewry internationally.' },
      { name: 'Federation of Jewish Communities of Serbia', type: 'umbrella body', description: 'Part of Serbia\'s broader Jewish communal structure.' }
    ]
  }
};

for (const [entryId, updates] of Object.entries(enrichments)) {
  if (enrichEntry(entryId, updates)) enriched++;
}
console.log(`Enriched ${enriched} entries`);

// Rebuild affiliations
console.log('Rebuilding affiliations...');
const affMap = {};
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    for (const ind of (entry.individuals || [])) {
      if (!affMap[ind.id]) affMap[ind.id] = [];
      affMap[ind.id].push({ organization: entry.name, role: ind.role || 'Associated', entryId: entry.id, country });
    }
  }
}
let affCount = 0;
for (const pid in peopleData.people) {
  if (!peopleData.people[pid].affiliations) peopleData.people[pid].affiliations = [];
  if (affMap[pid]) {
    for (const aff of affMap[pid]) {
      if (!peopleData.people[pid].affiliations.some(a => a.entryId === aff.entryId)) {
        peopleData.people[pid].affiliations.push(aff);
        affCount++;
      }
    }
  }
}
console.log(`Updated ${affCount} affiliations`);

// Sort entries by prominence within each country
console.log('Sorting entries by prominence...');
for (const country in data.countries) {
  data.countries[country].sort((a, b) => {
    const scoreA = (a.description || '').length + ((a.individuals || []).length * 100) + ((a.connections || []).length * 50);
    const scoreB = (b.description || '').length + ((b.individuals || []).length * 100) + ((b.connections || []).length * 50);
    return scoreB - scoreA;
  });
}

// Save
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2));

// Stats
let totalEntries = 0, totalConns = 0, totalPeople = Object.keys(peopleData.people).length;
let thin = 0;
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    totalEntries++;
    if (entry.description && entry.description.length < 200) thin++;
    if (entry.connections) totalConns += entry.connections.length;
  }
}
console.log(`\n=== FINAL STATS ===`);
console.log(`Entries: ${totalEntries}`);
console.log(`Countries: ${Object.keys(data.countries).length}`);
console.log(`People: ${totalPeople}`);
console.log(`Connections: ${totalConns}`);
console.log(`Remaining thin entries: ${thin}`);
console.log('Done!');
