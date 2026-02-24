// expandData32.js - WAVE 5: Bulk enrichment of community/institutional entries
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
function updateDescription(entryId, newDesc) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) { entry.description = newDesc; return true; }
    }
  }
  return false;
}
function addIndividualToEntry(entryId, individual) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) {
        if (!entry.individuals) entry.individuals = [];
        if (entry.individuals.some(i => i.id === individual.id)) return;
        entry.individuals.push(individual);
        return;
      }
    }
  }
}
function addConnectionToEntry(entryId, connection) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) {
        if (!entry.connections) entry.connections = [];
        if (entry.connections.some(c => c.name === connection.name && c.type === connection.type)) return;
        entry.connections.push(connection);
        return;
      }
    }
  }
}

console.log('Wave 5: Enriching community & institutional entries...');
let enriched = 0;

const enrichments = {
  // ===== US INSTITUTIONS =====
  'jewish-theological-seminary': {
    description: 'The Jewish Theological Seminary of America (JTS) is the academic and spiritual center of Conservative Judaism, located in New York City. Founded in 1887 by Sabato Morais, an Italian-born Sephardic rabbi, JTS became the leading seminary for training Conservative rabbis, cantors, and Jewish educators. Under the legendary leadership of Solomon Schechter (1902-1915), JTS became a world-class institution of Jewish scholarship. The seminary houses one of the greatest collections of Jewish manuscripts and rare books in the world, including fragments from the Cairo Genizah. JTS has shaped American Jewish life for over 135 years and represents the intellectual heart of Conservative Judaism, which was once the largest Jewish denomination in America. The seminary made the historic decision to ordain women as rabbis in 1983 and to ordain openly LGBTQ+ rabbis in 2007, both of which caused significant controversy within the Conservative movement.',
    individuals: [
      { id: slug('Solomon Schechter'), name: 'Solomon Schechter', role: 'Former President', bio: 'Romanian-born rabbi and scholar (1847-1915) who transformed JTS into a world-class institution. Discovered and rescued the Cairo Genizah manuscripts. Founded the United Synagogue of Conservative Judaism.' }
    ],
    connections: [
      { name: 'Conservative Judaism', type: 'denominational center', description: 'JTS is the academic and spiritual center of Conservative Judaism.' },
      { name: 'Cairo Genizah', type: 'manuscript collection', description: 'JTS houses fragments from the Cairo Genizah, one of the greatest Jewish manuscript discoveries.' },
      { name: 'Hebrew Union College', type: 'peer institution', description: 'HUC is the Reform equivalent of JTS for the Conservative movement.' }
    ]
  },
  'hebrew-union-college-huc': {
    description: 'Hebrew Union College-Jewish Institute of Religion (HUC-JIR) is the academic, spiritual, and professional leadership development center of Reform Judaism, with campuses in Cincinnati, New York, Los Angeles, and Jerusalem. Founded in 1875 by Rabbi Isaac Mayer Wise, it is the oldest Jewish seminary in America. HUC ordained the first female rabbi in America, Sally Priesand, in 1972 - a landmark moment in Jewish history. The seminary trains Reform rabbis, cantors, educators, and communal leaders. Its Jerusalem campus represents Reform Judaism\'s connection to Israel, though Reform Judaism faces discrimination in Israel where the Orthodox rabbinate controls religious affairs. HUC houses the American Jewish Archives and the Skirball Museum. The seminary has faced controversies including debates within Reform Judaism about Israel, declining enrollment, and the decision to close its Cincinnati campus ordination program.',
    individuals: [
      { id: slug('Isaac Mayer Wise'), name: 'Isaac Mayer Wise', role: 'Founder', bio: 'Bohemian-born American rabbi (1819-1900) who founded HUC and is considered the "father of American Reform Judaism." Also founded the Union of American Hebrew Congregations and the Central Conference of American Rabbis.' },
      { id: slug('Sally Priesand'), name: 'Sally Priesand', role: 'First Female Rabbi Ordained in America', bio: 'American rabbi ordained by HUC in 1972, becoming the first woman ordained as a rabbi in the United States. A landmark figure in Jewish feminist history.' }
    ],
    connections: [
      { name: 'Reform Judaism', type: 'denominational center', description: 'HUC is the academic heart of Reform Judaism.' },
      { name: 'Sally Priesand ordination', type: 'historic milestone', description: 'HUC ordained the first female rabbi in America in 1972.' },
      { name: 'Jewish Theological Seminary', type: 'peer institution', description: 'JTS is the Conservative equivalent of HUC for the Reform movement.' }
    ]
  },
  'touro-university': {
    description: 'Touro University (Touro College and University System) is a Jewish-sponsored independent institution of higher education with 35+ campuses worldwide. Founded in 1970 by Rabbi Bernard Lander, a Holocaust-era refugee, to provide higher education opportunities for Jewish students and underserved communities. Named after Judah Touro, a 19th-century Jewish-American philanthropist. Touro operates schools of medicine, law, pharmacy, health sciences, and technology in the US, Israel, Russia, and Germany. The Touro University system includes Touro College of Osteopathic Medicine, Touro Law Center, and the Lander College schools for Jewish students. Rabbi Lander, who had a PhD from Columbia and worked with government agencies on poverty issues, created Touro to bridge secular education with Jewish values. The institution has faced accreditation challenges and lawsuits over academic standards, and criticism regarding its governance structure.',
    individuals: [
      { id: slug('Bernard Lander'), name: 'Rabbi Bernard Lander', role: 'Founder', bio: 'Jewish-American educator (1915-2010) who founded Touro College in 1970. PhD from Columbia University. Worked on President Johnson\'s War on Poverty. Created Touro to provide higher education for Jewish students and underserved communities.' }
    ],
    connections: [
      { name: 'Jewish higher education', type: 'mission', description: 'Touro was founded to bridge secular education with Jewish values.' },
      { name: 'Israeli campuses', type: 'international operations', description: 'Touro operates campuses in Israel.' },
      { name: 'Yeshiva University', type: 'peer institution', description: 'Both are Jewish-sponsored universities in New York.' }
    ]
  },
  'museum-of-jewish-heritage': {
    description: 'The Museum of Jewish Heritage – A Living Memorial to the Holocaust is a museum located in Battery Park City, Manhattan, overlooking the Statue of Liberty and Ellis Island. Opened in 1997, the museum tells the story of Jewish life before, during, and after the Holocaust through personal artifacts, photographs, and oral histories. Its location overlooking the harbor through which millions of Jewish immigrants entered America is deeply symbolic. The museum\'s three-tiered structure represents the three points of the Star of David. The museum houses over 25,000 artifacts and a garden of stones designed by Andy Goldsworthy as a memorial. Former chairman Robert M. Morgenthau (the legendary Manhattan District Attorney and grandson of Henry Morgenthau Sr., who documented the Armenian genocide) championed the museum\'s creation. The museum has hosted controversial exhibitions and speaking events, navigating the politics of Holocaust memory and Israeli-Palestinian issues.',
    individuals: [
      { id: slug('Robert Morgenthau'), name: 'Robert M. Morgenthau', role: 'Former Chairman', bio: 'Jewish-American attorney (1919-2019) who served as Manhattan District Attorney for 35 years (the longest-serving in NYC history). Grandson of Henry Morgenthau Sr. Champion of the Museum of Jewish Heritage.' }
    ],
    connections: [
      { name: 'Holocaust education', type: 'core mission', description: 'The museum tells the story of Jewish life before, during, and after the Holocaust.' },
      { name: 'Yad Vashem', type: 'peer institution', description: 'Both are major Holocaust memorial museums.' },
      { name: 'Ellis Island', type: 'symbolic location', description: 'The museum overlooks Ellis Island, through which millions of Jewish immigrants entered America.' }
    ]
  },
  'american-jewish-historical-society': {
    description: 'The American Jewish Historical Society (AJHS) is the oldest ethnic and cultural archive in the United States, founded in 1892. AJHS collects, preserves, and provides access to the history of Jews in America, documenting over 350 years of Jewish life on the American continent. As the nation\'s oldest cultural archive of any ethnic group, AJHS predates most other immigrant heritage organizations by decades, reflecting the deep roots of Jewish community organization in America. The society\'s collections include millions of documents, photographs, and artifacts spanning from the earliest Jewish arrivals in New Amsterdam (1654) to the present. Holdings include papers from Emma Lazarus (who wrote the poem on the Statue of Liberty), records of Jewish labor movements, and documentation of anti-Semitism in America. AJHS relocated from Brandeis University to the Center for Jewish History in Manhattan in 2000.',
    individuals: [],
    connections: [
      { name: 'Center for Jewish History', type: 'current home', description: 'AJHS is located at the Center for Jewish History in Manhattan.' },
      { name: 'Emma Lazarus', type: 'collections', description: 'AJHS holds papers from Emma Lazarus, author of the poem on the Statue of Liberty.' },
      { name: 'American Jewish identity', type: 'preservation', description: 'AJHS documents over 350 years of Jewish life in America.' }
    ]
  },
  'national-council-of-jewish-women-ncjw': {
    description: 'The National Council of Jewish Women (NCJW) is a volunteer organization inspired by Jewish values that has been advocating for women\'s rights, children\'s welfare, and social justice since 1893. Founded by Hannah Greenebaum Solomon at the World Parliament of Religions in Chicago (part of the 1893 World\'s Fair). NCJW was one of the first women\'s organizations to champion progressive causes including women\'s suffrage, child labor laws, and immigrant rights. The organization has over 90,000 members and advocates for reproductive rights, voting access, and social safety net programs. NCJW runs the BenchMark program for child development and advocates for Supreme Court justices who support women\'s rights. Hannah Solomon was a pioneering Jewish feminist who organized the first National Council of Jewish Women congress as an alternative to women\'s exclusion from the male-dominated Jewish establishment.',
    individuals: [
      { id: slug('Hannah Solomon'), name: 'Hannah Greenebaum Solomon', role: 'Founder', bio: 'Jewish-American social activist (1858-1942) who founded NCJW at the 1893 World\'s Fair in Chicago. One of the pioneering Jewish feminists in America. Advocated for women\'s suffrage, child welfare, and immigrant rights.' }
    ],
    connections: [
      { name: 'Women\'s suffrage movement', type: 'historic advocacy', description: 'NCJW was one of the early organizations supporting women\'s suffrage.' },
      { name: 'Jewish feminism', type: 'movement founding', description: 'NCJW represents one of the earliest Jewish feminist organizations in America.' },
      { name: 'Reproductive rights', type: 'current advocacy', description: 'NCJW advocates for reproductive rights as a Jewish values issue.' }
    ]
  },
  'maccabi-usa': {
    description: 'Maccabi USA is the official organization responsible for selecting, training, and sending American Jewish athletes to compete in the Maccabiah Games in Israel - the third-largest multi-sport event in the world (after the Olympics and FIFA World Cup). Founded in 1948, Maccabi USA has sent thousands of Jewish-American athletes to compete in Israel across over 40 sports. The Maccabiah Games, first held in 1932 in Palestine, serve as a celebration of Jewish athleticism and Zionist identity. Notable American Maccabiah participants include basketball players, swimmers, and other athletes who went on to professional careers. The organization also runs the JCC Maccabi Games for Jewish teenagers in North America. Maccabi USA is part of the global Maccabi World Union network. The Maccabiah has faced tragedy: during the 1997 Games, the temporary Maccabiah Bridge collapse over the Yarkon River killed four Australian athletes and injured over 60.',
    individuals: [],
    connections: [
      { name: 'Maccabiah Games', type: 'primary event', description: 'Maccabi USA sends athletes to the Maccabiah Games in Israel, the third-largest multi-sport event globally.' },
      { name: 'Maccabi World Union', type: 'parent organization', description: 'Maccabi USA is part of the global Maccabi network.' },
      { name: '1997 bridge disaster', type: 'tragedy', description: 'Four Australian athletes died when the Maccabiah Bridge collapsed over the Yarkon River in 1997.' }
    ]
  },
  'hadassah-magazine': {
    description: 'Hadassah Magazine is the official publication of Hadassah, the Women\'s Zionist Organization of America, and one of the most widely circulated Jewish periodicals in the world. With approximately 250,000 subscribers, it reaches more Jewish-American households than almost any other Jewish publication. Published since 1914, the magazine covers Israel, Jewish culture, health, travel, and social issues. Hadassah itself, founded by Henrietta Szold in 1912, is the largest Jewish women\'s organization in the United States with approximately 300,000 members. Hadassah was named after Queen Esther\'s Hebrew name. The organization is best known for building and funding the Hadassah Medical Organization in Jerusalem, including the Hadassah Medical Center with its famous Chagall windows. Hadassah Magazine serves as both a community publication and a platform for discussion of issues affecting Jewish women, Israel, and American Jewish identity.',
    individuals: [
      { id: slug('Henrietta Szold'), name: 'Henrietta Szold', role: 'Founder of Hadassah', bio: 'American Jewish leader (1860-1945) who founded Hadassah in 1912. She also led the Youth Aliyah movement that rescued thousands of Jewish children from Nazi Europe. One of the most important women in Zionist history.' }
    ],
    connections: [
      { name: 'Hadassah Medical Center', type: 'flagship project', description: 'Hadassah built and funds the Hadassah Medical Center in Jerusalem, featuring Chagall windows.' },
      { name: 'Youth Aliyah', type: 'Szold legacy', description: 'Henrietta Szold led Youth Aliyah, which rescued thousands of Jewish children from Nazi Europe.' },
      { name: 'The Forward', type: 'peer publication', description: 'Both are major Jewish-American publications.' }
    ]
  },
  'the-forward': {
    description: 'The Forward (originally the Jewish Daily Forward / Forverts) is one of the oldest and most influential Jewish media outlets in America, founded in 1897 as a Yiddish-language daily newspaper on the Lower East Side of Manhattan. Originally a socialist publication serving Jewish immigrants, the Forward was the largest non-English newspaper in America under legendary editor Abraham Cahan, reaching a circulation of 275,000 in the 1920s. The Forward published Yiddish literature by greats like Isaac Bashevis Singer and Sholem Aleichem. It transitioned to English in the 1990s and became a digital-only publication in 2019. The Forward has been influential in covering Jewish-American life, Israel, antisemitism, and social justice. It has faced controversies including a 2023 editorial crisis when its editor was fired amid debates about coverage of the Israel-Palestine conflict. The Forward was instrumental in building Jewish labor movements and advocating for workers\' rights.',
    individuals: [
      { id: slug('Abraham Cahan Forward'), name: 'Abraham Cahan', role: 'Founding Editor', bio: 'Lithuanian-Jewish immigrant (1860-1951) who served as editor of the Forward for 50 years (1903-1951). Under his leadership, the Forward became the largest non-English newspaper in America. A giant of Yiddish journalism and literature.' }
    ],
    connections: [
      { name: 'Yiddish literature', type: 'publishing legacy', description: 'The Forward published works by Isaac Bashevis Singer, Sholem Aleichem, and other Yiddish literary greats.' },
      { name: 'Jewish labor movement', type: 'advocacy', description: 'The Forward was instrumental in building Jewish labor unions and workers\' rights movements.' },
      { name: 'Lower East Side', type: 'historic location', description: 'The Forward was founded on the Lower East Side of Manhattan, the heart of Jewish immigrant America.' }
    ]
  },
  'americans-for-peace-now': {
    description: 'Americans for Peace Now (APN) is the American affiliate of Shalom Achshav (Peace Now), the Israeli peace movement. Founded in 1981, APN advocates for a two-state solution to the Israeli-Palestinian conflict and opposes Israeli settlement expansion in the occupied territories. The organization represents the liberal Zionist perspective: pro-Israel but critical of the occupation and settlement enterprise. APN lobbies Congress, publishes research on settlement growth (its "Facts on the Ground" reports are widely cited), and engages American Jewish communities in dialogue about peace. The organization has been controversial within the Jewish community, with critics accusing it of undermining Israeli security and providing ammunition to Israel\'s detractors. Supporters view it as an essential voice for peace within Zionism. APN\'s positions have historically aligned with the Israeli Labor Party and the broader Israeli peace camp.',
    individuals: [],
    connections: [
      { name: 'Peace Now / Shalom Achshav', type: 'Israeli affiliate', description: 'APN is the American branch of Israel\'s largest peace movement.' },
      { name: 'Settlement monitoring', type: 'research', description: 'APN publishes widely-cited research on Israeli settlement expansion.' },
      { name: 'AIPAC', type: 'policy contrast', description: 'APN and AIPAC often represent opposing perspectives on Israeli policy within the American Jewish community.' }
    ]
  },
  'shalom-hartman-institute-of-north-america': {
    description: 'The Shalom Hartman Institute of North America is the American arm of the Jerusalem-based Shalom Hartman Institute, a leading center for Jewish thought and education. Founded by Rabbi David Hartman (1931-2013), a Canadian-American-Israeli rabbi and philosopher, the institute brings together Jewish scholars, rabbis, and community leaders for rigorous intellectual engagement with Jewish texts, Israel, and contemporary issues. The North American branch runs programs that have educated thousands of rabbis and Jewish leaders across all denominations. The Hartman Institute is known for promoting pluralistic Judaism, encouraging debate between secular and religious, liberal and conservative perspectives. Its scholars include prominent public intellectuals like Yossi Klein Halevi and Donniel Hartman. The institute navigates the complex space between supporting Israel and critiquing its policies, making it sometimes controversial in both liberal and conservative Jewish circles.',
    individuals: [
      { id: slug('David Hartman'), name: 'Rabbi David Hartman', role: 'Founder', bio: 'Canadian-American-Israeli rabbi and philosopher (1931-2013) who founded the Shalom Hartman Institute in Jerusalem. A leading Jewish thinker who advocated for pluralism and dialogue within Judaism.' }
    ],
    connections: [
      { name: 'Shalom Hartman Institute Jerusalem', type: 'parent institution', description: 'The North American branch extends the work of the Jerusalem-based institute.' },
      { name: 'Pluralistic Judaism', type: 'core philosophy', description: 'The institute promotes dialogue across all Jewish denominations and perspectives.' }
    ]
  },
  'avi-chai-foundation': {
    description: 'The AVI CHAI Foundation was an American private foundation dedicated to strengthening Jewish identity and literacy, fostering mutual understanding among Jews of different backgrounds, and encouraging Jewish education. Founded in 1984 by Sanford "Sandy" Bernstein, a Jewish-American investor who founded the investment management firm Sanford C. Bernstein & Co. (later Alliance Bernstein). The foundation operated on a "spend-down" model, distributing all assets before closing in 2020 after giving away over $1 billion. AVI CHAI funded Jewish day schools, summer camps, Israel education programs, and birthright trips. It supported Jewish publishing (including the Sefaria online library of Jewish texts), educational technology, and programs bridging religious and secular Israeli communities. The foundation was notable for its strategic approach to philanthropy and its intentional sundown, reflecting Bernstein\'s belief that each generation should create its own philanthropies.',
    individuals: [
      { id: slug('Sandy Bernstein Avi Chai'), name: 'Sanford "Sandy" Bernstein', role: 'Founder', bio: 'Jewish-American investor (1926-2014) who founded Sanford C. Bernstein & Co. (now Alliance Bernstein) and the AVI CHAI Foundation. Gave away over $1 billion to Jewish education causes. A ba\'al teshuva (returnee to Jewish observance) who used his wealth to strengthen Jewish identity.' }
    ],
    connections: [
      { name: 'Jewish day schools', type: 'major funding', description: 'AVI CHAI was a primary funder of Jewish day school education in North America.' },
      { name: 'Sefaria', type: 'funded project', description: 'AVI CHAI supported Sefaria, the free online library of Jewish texts.' },
      { name: 'Alliance Bernstein', type: 'founder\'s company', description: 'Sandy Bernstein founded the investment firm that generated the foundation\'s endowment.' }
    ]
  },
  'national-jewish-democratic-council': {
    description: 'The National Jewish Democratic Council (NJDC) is an American political organization that advocates for Jewish participation in the Democratic Party and promotes Jewish values in progressive policy. Founded in 1990, NJDC serves as the primary voice for Jewish Democrats, working to elect Democratic candidates and promote policies aligned with Jewish values including social justice, support for Israel, separation of church and state, and civil rights. The organization provides information to Jewish voters, organizes political events, and responds to antisemitism from across the political spectrum. NJDC operates in a landscape where approximately 70% of American Jews consistently vote Democratic, making Jewish voters an important Democratic constituency. The organization has been controversial for its partisan nature within a community where some argue Jewish advocacy should be bipartisan, and has clashed with the Republican Jewish Coalition over which party better serves Jewish interests.',
    individuals: [],
    connections: [
      { name: 'Democratic Party', type: 'political advocacy', description: 'NJDC advocates for Jewish participation in the Democratic Party.' },
      { name: 'Republican Jewish Coalition', type: 'partisan counterpart', description: 'NJDC and RJC represent competing partisan voices in the American Jewish community.' },
      { name: 'AIPAC', type: 'advocacy peer', description: 'Both advocate on Jewish issues in American politics, though AIPAC is nominally bipartisan.' }
    ]
  },

  // ===== EUROPEAN INSTITUTIONS =====
  'pagine-ebraiche': {
    description: 'Pagine Ebraiche ("Jewish Pages") is an Italian Jewish monthly newspaper published by the Union of Italian Jewish Communities (UCEI). Founded in 2010, it is the primary media outlet for Italy\'s Jewish community, covering Jewish culture, Italian-Jewish relations, Israel, Holocaust memory, and Italian politics. Italy\'s Jewish community, while small (approximately 25,000-30,000 members), has one of the oldest continuous Jewish presences in Europe, predating Christianity. Italian Jews have made enormous contributions to Italian culture, science, and politics. Pagine Ebraiche reports on antisemitism in Italy, the legacy of the Italian racial laws of 1938 (when Mussolini\'s fascist government enacted anti-Jewish legislation), and contemporary Jewish life. The publication also covers the complex relationship between Italy and Israel, and the Italian Jewish diaspora worldwide.',
    individuals: [],
    connections: [
      { name: 'Union of Italian Jewish Communities (UCEI)', type: 'publisher', description: 'Pagine Ebraiche is published by UCEI, the umbrella organization of Italian Jewry.' },
      { name: 'Italian racial laws of 1938', type: 'historical coverage', description: 'The publication covers the legacy of Mussolini\'s anti-Jewish legislation.' },
      { name: 'Italian Jewish community', type: 'community news', description: 'Covers one of Europe\'s oldest continuous Jewish communities (~25,000 members).' }
    ]
  },
  'sa-jewish-report': {
    description: 'The SA Jewish Report is the leading Jewish community newspaper in South Africa, covering news, politics, culture, and Israel-related issues relevant to the South African Jewish community (~50,000 members). Published since the 1990s, it serves one of the most organized and tight-knit Jewish diasporas in the world. South African Jewry has a unique history: the community was overwhelmingly Litvak (Lithuanian Jewish) in origin and produced a disproportionate number of anti-apartheid activists, including Joe Slovo, Ruth First, and Helen Suzman. The SA Jewish Report covers the complex relationship between Jews and post-apartheid South Africa, including the ANC government\'s increasingly critical stance toward Israel, the BDS movement\'s strong presence in South Africa, and debates about whether Jewish anti-apartheid activists\' legacy aligns with support for or criticism of Israel. The community has seen significant emigration to Israel, Australia, and other countries.',
    individuals: [],
    connections: [
      { name: 'South African Jewish Board of Deputies', type: 'community organization', description: 'The Board represents South African Jewry and works closely with the SA Jewish Report.' },
      { name: 'Anti-apartheid Jewish activists', type: 'historical coverage', description: 'Covers the legacy of Jewish anti-apartheid figures like Joe Slovo and Helen Suzman.' },
      { name: 'BDS in South Africa', type: 'current coverage', description: 'Reports on the BDS movement\'s strong presence in South Africa.' }
    ]
  },
  'radio-shalom': {
    description: 'Radio Shalom is a Jewish community radio station broadcasting in Paris, France, serving the largest Jewish community in Europe (approximately 450,000-500,000 people). Founded in 1981 following France\'s legalization of free radio, Radio Shalom was among the first Jewish radio stations in Europe. Broadcasting in French and Hebrew, it covers Jewish culture, Israeli news, French Jewish community affairs, and combats antisemitism through media. France\'s Jewish community - the third-largest in the world - has faced a dramatic rise in antisemitism since the early 2000s, with violent attacks including the 2012 Toulouse school shooting, the 2015 Hyper Cacher supermarket siege (linked to the Charlie Hebdo attack), and the 2017 murder of Sarah Halimi. Radio Shalom reports on these events and the growing Jewish emigration from France (aliyah) to Israel, with tens of thousands of French Jews relocating since 2000.',
    individuals: [],
    connections: [
      { name: 'French Jewish community', type: 'community service', description: 'Serves Europe\'s largest Jewish community of approximately 450,000-500,000 people.' },
      { name: 'CRIF', type: 'community partner', description: 'Works with CRIF, the representative body of French Jewish institutions.' },
      { name: 'French antisemitism', type: 'coverage', description: 'Reports on the dramatic rise in antisemitism in France since 2000.' }
    ]
  },
  'niw-nieuw-isra-lietisch-weekblad': {
    description: 'The NIW (Nieuw Israëlietisch Weekblad / New Israelite Weekly) is the oldest continuously published Jewish newspaper in the Netherlands and one of the oldest in the world, founded in 1865. It serves the Dutch Jewish community, which was devastated during the Holocaust - approximately 75% of Dutch Jews (102,000 out of 140,000) were murdered, the highest percentage of any Western European country. The NIW reports on Dutch Jewish community affairs, Israel, antisemitism in the Netherlands, and Holocaust remembrance. The newspaper covers the complex history of Dutch-Jewish relations, including the bitter debate over Dutch collaboration with the Nazi deportation machinery and the postwar treatment of returning Holocaust survivors. The NIW also covers the legacy of Anne Frank and the Amsterdam Jewish Quarter. The contemporary Dutch Jewish community numbers approximately 30,000-50,000 members.',
    individuals: [],
    connections: [
      { name: 'Dutch Holocaust history', type: 'historical coverage', description: '75% of Dutch Jews were murdered in the Holocaust - the highest percentage in Western Europe.' },
      { name: 'Anne Frank legacy', type: 'cultural coverage', description: 'Covers the legacy of Anne Frank and the Amsterdam Jewish Quarter.' },
      { name: 'Dutch Jewish community', type: 'community service', description: 'Serves the Netherlands\' Jewish community of approximately 30,000-50,000 members.' }
    ]
  },
  'sigmund-freud-museum': {
    description: 'The Sigmund Freud Museum is located in the former apartment and office of Sigmund Freud at Berggasse 19 in Vienna, Austria, where the Jewish-Austrian neurologist lived and worked from 1891 to 1938. Freud, born to Galician Jewish parents, is one of the most influential intellectual figures of the 20th century, having founded psychoanalysis and profoundly shaped modern understanding of the human mind. The museum documents Freud\'s life, work, and the context of early 20th-century Vienna\'s Jewish intellectual culture. Freud was forced to flee Vienna in 1938 after the Nazi annexation of Austria (Anschluss), with four of his sisters later dying in concentration camps. The museum explores Freud\'s Jewish identity, his writings on religion (including "Moses and Monotheism"), and the destruction of Vienna\'s vibrant Jewish intellectual community by the Nazis. The museum was renovated and expanded in 2020.',
    individuals: [
      { id: slug('Sigmund Freud'), name: 'Sigmund Freud', role: 'Subject', bio: 'Austrian-Jewish neurologist (1856-1939) who founded psychoanalysis and revolutionized understanding of the human psyche. Born to Galician Jewish parents. Fled Vienna after the Nazi annexation in 1938. Four of his sisters died in concentration camps. His work on the unconscious, dreams, and sexuality transformed modern thought.' }
    ],
    connections: [
      { name: 'Viennese Jewish intellectual culture', type: 'historical context', description: 'The museum documents Vienna\'s vibrant Jewish intellectual community destroyed by Nazism.' },
      { name: 'Nazi annexation of Austria', type: 'historical event', description: 'Freud was forced to flee Vienna in 1938; four of his sisters died in camps.' },
      { name: 'Psychoanalysis', type: 'intellectual legacy', description: 'Freud\'s founding of psychoanalysis transformed modern thought about the human mind.' }
    ]
  },
  'leo-baeck-institute': {
    description: 'The Leo Baeck Institute is a research library and archive devoted to the history of German-speaking Jewry, with centers in New York, London, and Jerusalem. Named after Rabbi Leo Baeck (1873-1956), the last great leader of German Jewry who survived Theresienstadt concentration camp and became a symbol of courage and spiritual resistance against the Nazis. The institute was founded in 1955 to preserve and study the extraordinary cultural heritage of German-speaking Jews, who despite being a small minority produced giants in science (Einstein, Born), philosophy (Arendt, Benjamin), literature (Kafka, Heine), music (Mendelssohn, Mahler), and business (the Warburgs, Rothschilds). The New York branch houses over 80,000 volumes and millions of documents. The institute\'s work is a monument to a civilization that was destroyed by the Holocaust but whose intellectual and cultural legacy profoundly shaped the modern world.',
    individuals: [
      { id: slug('Leo Baeck'), name: 'Rabbi Leo Baeck', role: 'Namesake', bio: 'German rabbi and scholar (1873-1956) who led German Jewry during the Nazi period. Refused to abandon his community despite chances to escape. Survived Theresienstadt concentration camp. Symbol of spiritual resistance against Nazism.' }
    ],
    connections: [
      { name: 'German-Jewish heritage', type: 'core mission', description: 'The institute preserves the extraordinary cultural history of German-speaking Jewry.' },
      { name: 'Theresienstadt', type: 'Leo Baeck\'s internment', description: 'Rabbi Leo Baeck survived Theresienstadt camp after refusing to leave his community.' },
      { name: 'Center for Jewish History', type: 'current home (NYC)', description: 'The New York LBI is housed at the Center for Jewish History in Manhattan.' }
    ]
  },

  // ===== INTERNATIONAL COMMUNITIES =====
  'jewish-community-of-suva': {
    description: 'The Jewish Community of Suva, Fiji is one of the smallest and most remote Jewish communities in the world, numbering only a handful of families. Despite its tiny size, the community has maintained Jewish life in the South Pacific through holiday celebrations, Shabbat gatherings, and connections to larger Jewish communities in Australia and New Zealand. Fiji\'s Jewish history includes a small wave of Jewish settlers in the 19th and early 20th centuries, some involved in Fiji\'s sugar and trade industries. During World War II, Jewish refugees from Europe found temporary haven in Fiji. The community has been supported by Chabad emissaries and visiting rabbis from Australia. The existence of this community illustrates the global reach of Jewish diaspora, with Jewish life maintained even in some of the world\'s most remote island nations.',
    individuals: [],
    connections: [
      { name: 'Australian Jewish community', type: 'regional support', description: 'Fiji\'s tiny Jewish community is supported by and connected to Australian Jewry.' },
      { name: 'Chabad', type: 'religious support', description: 'Chabad emissaries have provided religious services to Fiji\'s Jewish community.' }
    ]
  },
  'jewish-community-of-port-moresby': {
    description: 'The Jewish Community of Port Moresby is an extremely small congregation in the capital of Papua New Guinea, one of the most remote Jewish communities on Earth. The community consists of a handful of Jewish families, mostly expatriates involved in mining, development, aid work, and diplomatic service. PNG\'s Jewish presence dates to the colonial era when Jewish businesspeople and administrators worked in the territory. During World War II, Jewish soldiers serving in Allied forces were among those fighting in the Pacific theater in PNG. The community maintains minimal Jewish observance through informal gatherings and connections to Jewish communities in Australia. The existence of Jews in PNG highlights the extraordinary global dispersion of the Jewish people, with Jewish life maintained in even the most unlikely and challenging environments.',
    individuals: [],
    connections: [
      { name: 'Australian Jewish community', type: 'regional support', description: 'PNG\'s Jewish community is supported by Australian Jewish organizations.' },
      { name: 'Jewish diaspora', type: 'global dispersion', description: 'Illustrates the extraordinary global reach of the Jewish diaspora.' }
    ]
  },
  'jewish-community-of-botswana': {
    description: 'The Jewish Community of Botswana is an extremely small community in southern Africa, numbering only a few families, mostly South African Jews and Israeli expatriates involved in Botswana\'s diamond industry, development work, and business. Botswana is the world\'s largest producer of diamonds by value, and De Beers (which has significant Jewish connections through the Oppenheimer family) has been the country\'s primary diamond mining partner since independence. Israeli diamond dealers and polishers have been active in Botswana\'s diamond sector, and Israel has maintained diplomatic and economic relations with Botswana. The community gathers for major Jewish holidays and maintains connections to the larger South African Jewish community across the border. Botswana has been one of the more Israel-friendly nations in Africa, maintaining quiet but consistent diplomatic relations.',
    individuals: [],
    connections: [
      { name: 'De Beers / Oppenheimer family', type: 'diamond industry', description: 'De Beers, with Jewish connections through the Oppenheimers, is the primary diamond mining partner in Botswana.' },
      { name: 'Israeli diamond industry', type: 'economic connection', description: 'Israeli diamond dealers and polishers are active in Botswana\'s diamond sector.' },
      { name: 'South African Jewish community', type: 'regional support', description: 'Botswana\'s Jews are connected to the larger South African Jewish community.' }
    ]
  },
  'jewish-community-of-sri-lanka': {
    description: 'The Jewish Community of Sri Lanka is a tiny community with a fascinating historical footprint. Jewish merchants were present in Ceylon (as Sri Lanka was known) for centuries, part of the broader Jewish trading networks across the Indian Ocean. The most notable aspect of Sri Lankan Jewish history is the Jewish cemetery in Colombo, dating to the Dutch colonial period (17th-18th century), which testifies to a more significant past Jewish presence. Today\'s community consists primarily of Israeli tourists (Sri Lanka has been a popular backpacker destination for Israelis after military service), expatriates, and a handful of permanent residents. Chabad of Sri Lanka has operated to serve Israeli tourists and the small resident community. The country\'s interaction with Israel has been complex - Sri Lanka was one of the first Asian countries to recognize Israel but has also supported Palestinian statehood at the UN.',
    individuals: [],
    connections: [
      { name: 'Israeli tourism', type: 'visitor community', description: 'Sri Lanka is a popular destination for young Israelis, creating a seasonal Jewish presence.' },
      { name: 'Chabad', type: 'community support', description: 'Chabad operates in Sri Lanka to serve Israeli tourists and residents.' },
      { name: 'Indian Ocean Jewish trading networks', type: 'historical context', description: 'Jewish merchants were part of ancient Indian Ocean trading networks touching Ceylon.' }
    ]
  },
  'jewish-community-of-madagascar': {
    description: 'The Jewish Community of Madagascar has a unique and controversial history. While there are very few practicing Jews in Madagascar today, the island has a significant connection to Jewish history through the "Madagascar Plan" - a Nazi proposal in 1940 to forcibly relocate all of Europe\'s Jews to the island. Though never implemented (the Nazis chose genocide instead), the plan illustrates the extreme measures considered for the Jewish population. Madagascar also has the Malagasy community of Zafimaniry who have claimed some Jewish heritage. In the modern era, a small number of Malagasy have converted or identified with Judaism, and there are Israeli expatriates involved in business and NGO work. Israel has provided agricultural and development assistance to Madagascar. The story of Jews and Madagascar is primarily one of the darkest chapter of history - a reminder of the Nazi plan that was scrapped only because something even more horrific was chosen instead.',
    individuals: [],
    connections: [
      { name: 'Madagascar Plan', type: 'historical significance', description: 'The Nazis planned to forcibly relocate all European Jews to Madagascar before choosing genocide instead.' },
      { name: 'Israel development aid', type: 'bilateral relations', description: 'Israel has provided agricultural and development assistance to Madagascar.' }
    ]
  },
  'jewish-community-of-luxembourg': {
    description: 'The Jewish Community of Luxembourg (Consistoire Israélite de Luxembourg) is the organized Jewish community in the Grand Duchy of Luxembourg, numbering approximately 1,500-2,000 members. Luxembourg\'s Jewish history dates to the 13th century, with Jews facing periodic expulsions and readmission throughout the Middle Ages. The modern community was decimated during the Holocaust when Nazi Germany occupied Luxembourg in 1940 - approximately 2,000 Jews lived in Luxembourg before the war, and over 1,000 were killed in the Holocaust. Today\'s community includes descendants of survivors, Sephardic Jews from North Africa, Israeli expatriates, and Jewish professionals working in Luxembourg\'s international financial sector. Luxembourg is home to major European institutions and banks, and Jewish business leaders play notable roles in the Grand Duchy\'s financial industry. The Luxembourg synagogue, rebuilt after wartime destruction, serves as the community\'s spiritual center.',
    individuals: [],
    connections: [
      { name: 'Luxembourg Holocaust history', type: 'wartime tragedy', description: 'Over 1,000 of Luxembourg\'s 2,000 Jews were killed during the Nazi occupation.' },
      { name: 'Luxembourg financial sector', type: 'community involvement', description: 'Jewish professionals play notable roles in Luxembourg\'s international banking sector.' },
      { name: 'European Jewish Congress', type: 'affiliated organization', description: 'Luxembourg\'s Jewish community is part of the European Jewish Congress network.' }
    ]
  },
  'jewish-community-of-montenegro': {
    description: 'The Jewish Community of Montenegro (Jevrejska Zajednica Crne Gore) is one of the smallest Jewish communities in Europe, numbering approximately 300-500 members. Montenegro\'s Jewish history includes Sephardic Jews who settled in the Bay of Kotor after the 1492 Spanish Expulsion, establishing a community in cities like Kotor, Budva, and Podgorica. During World War II, Italian-occupied Montenegro provided some protection to Jews until the German occupation in 1943, after which Jews were deported and murdered. Today\'s community is active in preserving Jewish heritage, maintaining the Kotor Jewish cemetery, and educating about Jewish history in the region. Montenegro was the last European country to establish diplomatic relations with Israel (in 2006 when it became independent). The tiny community hosts cultural events and is involved in interfaith dialogue in the multi-ethnic Balkans.',
    individuals: [],
    connections: [
      { name: 'Sephardic heritage', type: 'historical roots', description: 'Sephardic Jews settled in Montenegro after the 1492 expulsion from Spain.' },
      { name: 'Balkan Jewish network', type: 'regional connections', description: 'Connected to Jewish communities across the former Yugoslavia.' },
      { name: 'Montenegro-Israel relations', type: 'diplomatic', description: 'Montenegro established relations with Israel upon independence in 2006.' }
    ]
  },
  'icelandic-jewish-community': {
    description: 'The Icelandic Jewish Community is one of Europe\'s smallest, numbering approximately 100-250 people on this North Atlantic island nation. Iceland\' Jewish history is minimal - a small number of Jewish merchants and refugees arrived in the 19th and early 20th centuries. During the Holocaust, Iceland (then under Danish sovereignty) had a complex relationship with Jewish refugees. Today\'s community is largely composed of Jewish immigrants and their families, plus Israeli expatriates. Iceland\'s relationship with Israel has been notable: in 2011, Iceland became one of the first Western countries to recognize Palestinian statehood, straining relations with Israel. In 2018, the Icelandic parliament debated banning circumcision, which the Jewish community and Anti-Defamation League strongly opposed as a threat to religious freedom. The community gathers informally for holidays and is supported by visiting rabbis. Reykjavik is likely the world\'s most northern city with an organized Jewish presence.',
    individuals: [],
    connections: [
      { name: 'Circumcision ban debate', type: 'controversy', description: 'Iceland\'s 2018 debate on banning circumcision was viewed as a threat to Jewish religious freedom.' },
      { name: 'Palestinian recognition', type: 'diplomatic issue', description: 'Iceland was one of the first Western countries to recognize Palestinian statehood in 2011.' },
      { name: 'Nordic Jewish communities', type: 'regional network', description: 'Connected to the small Jewish communities across Scandinavia.' }
    ]
  },
  'taiwan-jewish-community': {
    description: 'The Taiwan Jewish Community is a small but active congregation in Taipei, numbering approximately 300-500 members. The community is composed primarily of American, Israeli, and European Jewish expatriates working in Taiwan\'s technology, business, and diplomatic sectors. The Taipei Jewish Center, established in 1975, serves as the community hub with Shabbat services, holiday celebrations, and educational programs. Taiwan does not have formal diplomatic relations with Israel (as part of its complex global diplomatic situation due to Chinese pressure), but the two countries maintain informal ties through trade offices and significant economic relationships, particularly in technology. Israeli tech companies have partnerships with Taiwanese semiconductor and electronics firms. The community is served by a Chabad presence and visiting rabbis. Taiwan\'s relationship with the Jewish community highlights the pragmatic diplomatic connections between Israel and countries navigating the complexities of Chinese politics.',
    individuals: [],
    connections: [
      { name: 'Taiwan-Israel tech ties', type: 'economic relations', description: 'Taiwan and Israel have significant technology partnerships despite no formal diplomatic relations.' },
      { name: 'Chabad', type: 'community support', description: 'Chabad provides religious services to Taiwan\'s Jewish community.' },
      { name: 'Semiconductor industry', type: 'tech cooperation', description: 'Israeli tech companies partner with Taiwanese semiconductor firms.' }
    ]
  },

  // ===== REMAINING COMPANIES/ORGS =====
  'brookfield-properties': {
    description: 'Brookfield Properties is the real estate investment arm of Brookfield Asset Management, one of the world\'s largest alternative asset managers. The company owns and operates iconic real estate assets including Brookfield Place in Manhattan, Canary Wharf in London, and the former World Financial Center adjacent to the World Trade Center site. Jewish connections include the significant Jewish executive and investor presence at Brookfield Asset Management and the company\'s extensive dealings in markets with large Jewish communities (particularly New York). Brookfield Properties\' Brookfield Place development in Lower Manhattan (formerly the World Financial Center) is directly adjacent to the 9/11 memorial site. The company has been controversial for aggressive development practices, displacement of local communities, and the environmental impact of its large-scale real estate developments. Brookfield Asset Management was cofounded by Jack Cockwell and is now led by Bruce Flatt.',
    individuals: [],
    connections: [
      { name: 'World Trade Center site', type: 'adjacent property', description: 'Brookfield Place is directly adjacent to the 9/11 memorial in Lower Manhattan.' },
      { name: 'Brookfield Asset Management', type: 'parent company', description: 'One of the world\'s largest alternative asset managers.' },
      { name: 'New York real estate', type: 'major market', description: 'Brookfield is a major force in New York City real estate.' }
    ]
  },
  'grupo-clar-n': {
    description: 'Grupo Clarín is the largest media conglomerate in Argentina, controlling the Clarín newspaper (Argentina\'s largest daily), Canal 13 television, Radio Mitre, and cable operator Cablevisión. The company\'s Jewish connections include the role of Jewish executives and journalists in its operations, and its coverage of the Argentine Jewish community (the largest in Latin America, approximately 180,000-250,000 members). Grupo Clarín has been deeply controversial: during Argentina\'s military dictatorship (1976-1983), Clarín was accused of collaboration with the junta, including benefiting from the forced sale of Papel Prensa (the paper monopoly) by the Jewish-Argentine Graiver family under circumstances of extortion and torture. David Graiver, a Jewish-Argentine banker, died under mysterious circumstances in 1976, and his family was forced to sell their Papel Prensa shares while imprisoned by the junta. This dark history intertwines Argentina\'s Jewish community with one of the country\'s most powerful media empires.',
    individuals: [
      { id: slug('Hector Magnetto'), name: 'Héctor Magnetto', role: 'CEO', bio: 'Longtime CEO of Grupo Clarín who built it into Argentina\'s largest media conglomerate. Controversial figure in Argentine media and politics.' }
    ],
    connections: [
      { name: 'Papel Prensa / Graiver family', type: 'historical controversy', description: 'The Jewish-Argentine Graiver family was forced to sell Papel Prensa to Clarín under military junta duress.' },
      { name: 'Argentine Jewish community', type: 'community coverage', description: 'Covers Latin America\'s largest Jewish community.' },
      { name: 'Argentine military dictatorship', type: 'collaboration allegations', description: 'Clarín was accused of collaborating with the 1976-1983 military junta.' }
    ]
  },
  'knopf-alfred-a-knopf': {
    description: 'Alfred A. Knopf, Inc. is one of the most prestigious book publishing houses in America, founded in 1915 by Alfred A. Knopf Sr. and Blanche Knopf, both Jewish Americans. The Knopfs built a publishing house renowned for literary quality, introducing American readers to a remarkable range of European, Asian, and Latin American authors. Knopf published Nobel Prize winners including Albert Camus, Gabriel García Márquez, Toni Morrison, and Kazuo Ishiguro, as well as writers like H.L. Mencken, Franz Kafka, and Joan Didion. Alfred Knopf was known for his impeccable taste, the distinctive Borzoi colophon (a running dog), and his commitment to beautiful book design. Blanche Knopf, often overshadowed by her husband, was an equally brilliant editor who championed European and African literature. The company is now an imprint of Penguin Random House. The Knopf legacy represents the enormous contribution of Jewish publishers to American intellectual and cultural life.',
    individuals: [
      { id: slug('Alfred Knopf Sr'), name: 'Alfred A. Knopf Sr.', role: 'Co-Founder', bio: 'Jewish-American publisher (1892-1984) who co-founded the prestigious Knopf publishing house. Known for literary excellence, the Borzoi colophon, and introducing global literature to American readers.' },
      { id: slug('Blanche Knopf'), name: 'Blanche Knopf', role: 'Co-Founder', bio: 'Jewish-American publisher (1894-1966) who co-founded Knopf with her husband. A brilliant editor who championed European and African literature, often overshadowed in historical accounts despite her central role.' }
    ],
    connections: [
      { name: 'Penguin Random House', type: 'parent company', description: 'Knopf is now an imprint of Penguin Random House.' },
      { name: 'Nobel Prize authors', type: 'publishing legacy', description: 'Knopf published numerous Nobel Prize-winning authors.' },
      { name: 'Jewish publishing tradition', type: 'cultural contribution', description: 'Knopf represents the Jewish contribution to American publishing and intellectual life.' }
    ]
  },
  'blablacar': {
    description: 'BlaBlaCar is a French long-distance carpooling platform and one of the world\'s largest ride-sharing companies, with over 100 million members in 22 countries. Founded in 2006 by Frédéric Mazzella. BlaBlaCar\'s Jewish connections include investment from Jewish-led venture capital firms including Accel Partners and Index Ventures. The company operates in Israel, where it connects to the country\'s tech-savvy transportation market. Index Ventures, a major BlaBlaCar investor, was co-founded by Neil Rimer, a Jewish-Swiss venture capitalist who has been one of Europe\'s most influential tech investors. BlaBlaCar has been controversial for its impact on traditional bus and rail services, regulatory battles with transport authorities in multiple countries, safety concerns about ride-sharing with strangers, and the debate about whether it truly reduces carbon emissions or simply enables more road travel.',
    individuals: [
      { id: slug('Frederic Mazzella'), name: 'Frédéric Mazzella', role: 'Founder & President', bio: 'French entrepreneur who founded BlaBlaCar in 2006, building it into the world\'s largest long-distance ride-sharing platform with over 100 million members.' }
    ],
    connections: [
      { name: 'Index Ventures', type: 'investor', description: 'Jewish-co-founded VC firm Index Ventures is a major BlaBlaCar investor.' },
      { name: 'Israeli operations', type: 'market presence', description: 'BlaBlaCar operates in Israel.' }
    ]
  }
};

for (const entryId in enrichments) {
  const e = enrichments[entryId];
  if (e.description) {
    const found = updateDescription(entryId, e.description);
    if (found) enriched++;
    else console.log(`  Warning: Entry not found: ${entryId}`);
  }
  if (e.individuals) {
    for (const ind of e.individuals) {
      addIndividualToEntry(entryId, ind);
      addPerson(ind.id, ind.name, ind.bio);
    }
  }
  if (e.connections) {
    for (const conn of e.connections) {
      addConnectionToEntry(entryId, conn);
    }
  }
}
console.log(`  Enriched ${enriched} entries`);

// Re-sort and rebuild affiliations
console.log('Re-sorting entries...');
for (const country in data.countries) {
  data.countries[country].sort((a, b) => {
    const scoreA = (a.description || '').length + ((a.connections || []).length * 50) + ((a.individuals || []).length * 30);
    const scoreB = (b.description || '').length + ((b.connections || []).length * 50) + ((b.individuals || []).length * 30);
    return scoreB - scoreA;
  });
}

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
console.log(`  Updated ${affCount} affiliations`);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2));

let totalEntries = 0, totalPeople = Object.keys(peopleData.people).length;
let shortDescs = 0, noIndividuals = 0;
for (const c in data.countries) for (const e of data.countries[c]) {
  totalEntries++;
  if ((e.description || '').length < 200) shortDescs++;
  if (!e.individuals || e.individuals.length === 0) noIndividuals++;
}
console.log(`\n=== STATS ===`);
console.log(`Entries: ${totalEntries}`);
console.log(`People: ${totalPeople}`);
console.log(`Still thin (<200): ${shortDescs}`);
console.log(`Still no individuals: ${noIndividuals}`);
console.log('Done!');
