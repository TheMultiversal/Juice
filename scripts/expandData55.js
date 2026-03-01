/**
 * expandData55.js – Add key individuals to sparse Germany & Australia entries
 */
const fs = require('fs');
const path = require('path');
const pFile = path.join(__dirname, '..', 'data', 'people.json');
const jFile = path.join(__dirname, '..', 'data', 'jewish.json');
const pd = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const jd = JSON.parse(fs.readFileSync(jFile, 'utf8'));

function addPerson(id, name, bio) {
  if (!pd.people[id]) {
    pd.people[id] = { name, bio, notes: '', affiliations: [] };
    return true;
  }
  if (bio && bio.length > (pd.people[id].bio || '').length) pd.people[id].bio = bio;
  return false;
}

let newPeople = 0;
let updatedEntries = 0;

const individualsMap = {
  "central-council-of-jews-in-germany": [
    {"id": "person-josef-schuster", "name": "Josef Schuster", "role": "President", "bio": "Has served as President of the Central Council of Jews in Germany since 2014, representing the interests of Jewish communities across the country."},
    {"id": "person-charlotte-knobloch", "name": "Charlotte Knobloch", "role": "Former President", "bio": "Served as President of the Central Council from 2006 to 2010 and remains President of the Jewish Community of Munich and Upper Bavaria."},
    {"id": "person-paul-spiegel", "name": "Paul Spiegel", "role": "Former President", "bio": "Led the Central Council of Jews in Germany from 2000 until his death in 2006, advocating for Holocaust remembrance and Jewish life in Germany."},
    {"id": "person-daniel-botmann", "name": "Daniel Botmann", "role": "Managing Director", "bio": "Serves as Managing Director of the Central Council of Jews in Germany, overseeing day-to-day operations and organizational strategy."}
  ],
  "delivery-hero": [
    {"id": "person-niklas-ostberg", "name": "Niklas Östberg", "role": "Co-founder & CEO", "bio": "Swedish entrepreneur who co-founded Delivery Hero in 2011 in Berlin and has led it as CEO, growing it into a global food delivery platform."},
    {"id": "person-emmanuel-thomassin", "name": "Emmanuel Thomassin", "role": "Former CFO", "bio": "Served as CFO of Delivery Hero from 2015, overseeing its IPO and financial strategy during rapid international expansion."},
    {"id": "person-pieter-jan-vandepitte", "name": "Pieter-Jan Vandepitte", "role": "CFO", "bio": "Became CFO of Delivery Hero, managing the company's financial operations across its global food delivery network."},
    {"id": "person-hakan-koc", "name": "Hakan Koç", "role": "Co-founder", "bio": "Co-founded Delivery Hero alongside Niklas Östberg, helping build the initial platform that became one of Europe's largest food delivery companies."}
  ],
  "leo-baeck-institute": [
    {"id": "person-leo-baeck", "name": "Leo Baeck", "role": "Namesake", "bio": "Rabbi and leader of Progressive Judaism in Germany who survived Theresienstadt; the institute was named in his honor to preserve German-Jewish heritage."},
    {"id": "person-william-seltzer", "name": "William Seltzer", "role": "Former President", "bio": "Served as President of the Leo Baeck Institute, stewarding its mission to document and preserve the history of German-speaking Jewry."},
    {"id": "person-carol-kahn-strauss", "name": "Carol Kahn Strauss", "role": "Former Executive Director", "bio": "Led the Leo Baeck Institute in New York for decades, building its archive and library into essential resources for German-Jewish history research."},
    {"id": "person-michael-brenner", "name": "Michael Brenner", "role": "International President", "bio": "Historian and professor at LMU Munich who serves as International President of the Leo Baeck Institute, advancing scholarship on German-Jewish history."}
  ],
  "ronald-s-lauder-foundation-germany": [
    {"id": "person-ronald-lauder", "name": "Ronald S. Lauder", "role": "Founder & Chairman", "bio": "Estée Lauder heir and President of the World Jewish Congress who founded the Ronald S. Lauder Foundation to revitalize Jewish life in Central and Eastern Europe."},
    {"id": "person-joshua-spinner", "name": "Joshua Spinner", "role": "Executive Vice President", "bio": "Senior executive who has helped lead the Lauder Foundation's programs in Germany, supporting Jewish education and community building."},
    {"id": "person-sabine-bamberger-stemmann", "name": "Sabine Bamberger-Stemmann", "role": "Director, Germany Programs", "bio": "Has overseen the Lauder Foundation's educational and cultural programs in Germany, fostering Jewish identity among young people."}
  ],
  "jewish-museum-frankfurt": [
    {"id": "person-mirjam-wenzel", "name": "Mirjam Wenzel", "role": "Director", "bio": "Serves as Director of the Jewish Museum Frankfurt, overseeing its major renovation and reopening in 2020 with a modernized exhibition concept."},
    {"id": "person-fritz-backhaus", "name": "Fritz Backhaus", "role": "Former Deputy Director", "bio": "Served as Deputy Director and chief curator of the Jewish Museum Frankfurt, shaping its exhibitions on Frankfurt's rich Jewish history."},
    {"id": "person-sabine-koss", "name": "Sabine Koss", "role": "Managing Director", "bio": "Manages the operational side of the Jewish Museum Frankfurt, supporting its educational programs and public outreach."}
  ],
  "j-disches-museum-m-nchen": [
    {"id": "person-bernhard-purin", "name": "Bernhard Purin", "role": "Founding Director", "bio": "Served as founding Director of the Jewish Museum Munich since its opening in 2007, curating exhibitions on Munich's Jewish history and culture."},
    {"id": "person-charlotte-knobloch", "name": "Charlotte Knobloch", "role": "Key Advocate", "bio": "As President of the Jewish Community of Munich and Upper Bavaria, she was instrumental in establishing the Jewish Museum Munich."},
    {"id": "person-lilian-harlander", "name": "Lilian Harlander", "role": "Curator", "bio": "Serves as curator at the Jewish Museum Munich, developing exhibitions exploring Jewish life, history, and culture in the Bavarian capital."}
  ],
  "maccabi-germany": [
    {"id": "person-alon-meyer", "name": "Alon Meyer", "role": "President", "bio": "Has served as President of Maccabi Germany since 2009, growing the organization and leading its fight against antisemitism in sports."},
    {"id": "person-oren-osterer", "name": "Oren Osterer", "role": "Vice President", "bio": "Serves as Vice President of Maccabi Germany, supporting the organization's sports programs and community initiatives."},
    {"id": "person-uri-schaefer", "name": "Uri Schäfer", "role": "Board Member", "bio": "Active board member of Maccabi Germany, contributing to the organization's mission of promoting Jewish identity through sport."}
  ],
  "wizo-germany": [
    {"id": "person-rebecca-siemoneit-barum", "name": "Rebecca Siemoneit-Barum", "role": "President", "bio": "Serves as President of WIZO Germany, leading fundraising and awareness efforts for women's and children's welfare programs in Israel."},
    {"id": "person-karen-lux", "name": "Karen Lux", "role": "Vice President", "bio": "Serves as Vice President of WIZO Germany, supporting the organization's charitable work and advocacy for women's issues."},
    {"id": "person-esther-herlitz", "name": "Esther Herlitz", "role": "Honorary President", "bio": "Israeli diplomat and former Knesset member who served as World WIZO President and inspired the German chapter's activities."}
  ],
  "zentralrat-der-juden-in-deutschland-central-council-of-jews-in-germany": [
    {"id": "person-josef-schuster", "name": "Josef Schuster", "role": "President", "bio": "Has served as President of the Central Council of Jews in Germany since 2014, representing the interests of Jewish communities across the country."},
    {"id": "person-charlotte-knobloch", "name": "Charlotte Knobloch", "role": "Former President", "bio": "Served as President of the Central Council from 2006 to 2010 and remains President of the Jewish Community of Munich and Upper Bavaria."},
    {"id": "person-paul-spiegel", "name": "Paul Spiegel", "role": "Former President", "bio": "Led the Central Council of Jews in Germany from 2000 until his death in 2006, advocating for Holocaust remembrance and Jewish life in Germany."},
    {"id": "person-daniel-botmann", "name": "Daniel Botmann", "role": "Managing Director", "bio": "Serves as Managing Director of the Central Council of Jews in Germany, overseeing day-to-day operations and organizational strategy."}
  ],
  "axel-springer-se": [
    {"id": "person-axel-springer", "name": "Axel Springer", "role": "Founder", "bio": "Founded the publishing house in 1946 in Hamburg, building it into Europe's largest digital publisher; he was a strong advocate for Israel and German-Israeli reconciliation."},
    {"id": "person-mathias-dopfner", "name": "Mathias Döpfner", "role": "CEO", "bio": "Has led Axel Springer SE as CEO since 2002, transforming the traditional publisher into a leading digital media and classifieds company."},
    {"id": "person-friede-springer", "name": "Friede Springer", "role": "Majority Shareholder & Supervisory Board Member", "bio": "Widow of Axel Springer who became the company's largest shareholder and a powerful force in German media and philanthropy."},
    {"id": "person-ralph-buchi", "name": "Ralph Büchi", "role": "President, Ringier Axel Springer Media", "bio": "Senior executive who has led key divisions of Axel Springer's international media operations."}
  ],
  "stolpersteine-stumbling-stones": [
    {"id": "person-gunter-demnig", "name": "Gunter Demnig", "role": "Creator & Artist", "bio": "German artist who conceived and began installing Stolpersteine in 1992, creating the world's largest decentralized Holocaust memorial with over 100,000 brass plaques across Europe."},
    {"id": "person-michael-friedrichs-friedlaender", "name": "Michael Friedrichs-Friedländer", "role": "Artisan Fabricator", "bio": "Master craftsman in Berlin who hand-stamps each Stolperstein brass plaque, personally producing thousands of memorial stones."},
    {"id": "person-anna-warda", "name": "Anna Warda", "role": "Coordinator", "bio": "Coordinates the Stolpersteine project logistics and community engagement, managing installations across multiple European countries."}
  ],
  "j-dische-gemeinde-zu-berlin-jewish-community-of-berlin": [
    {"id": "person-gideon-joffe", "name": "Gideon Joffe", "role": "Chairman", "bio": "Has served as Chairman of the Jewish Community of Berlin, representing one of the fastest-growing Jewish communities in Europe."},
    {"id": "person-michael-jochanan-blumenthal", "name": "Michael Jochanan Blumenthal", "role": "Former Chairman", "bio": "Former U.S. Treasury Secretary who later became a leader of the Jewish Community of Berlin and first director of the Jewish Museum Berlin."},
    {"id": "person-yehuda-teichtal", "name": "Yehuda Teichtal", "role": "Community Rabbi", "bio": "Chabad rabbi serving the Jewish Community of Berlin, prominent in interfaith dialogue and community outreach programs."}
  ],
  "memorial-to-the-murdered-jews-of-europe": [
    {"id": "person-peter-eisenman", "name": "Peter Eisenman", "role": "Architect & Designer", "bio": "American architect who designed the Memorial to the Murdered Jews of Europe in Berlin, consisting of 2,711 concrete stelae opened in 2005."},
    {"id": "person-lea-rosh", "name": "Lea Rosh", "role": "Initiator & Chair of the Foundation", "bio": "German journalist and activist who spearheaded the campaign to build the Holocaust Memorial in Berlin, chairing the supporting foundation."},
    {"id": "person-uwe-neumarker", "name": "Uwe Neumärker", "role": "Director of the Foundation", "bio": "Serves as Director of the Foundation for the Memorial to the Murdered Jews of Europe, overseeing the memorial and its information center."}
  ],
  "neue-synagoge-berlin": [
    {"id": "person-hermann-simon", "name": "Hermann Simon", "role": "Founding Director, Centrum Judaicum", "bio": "Historian who founded and directed the Centrum Judaicum in the Neue Synagoge Berlin, building it into a major center for Berlin's Jewish history."},
    {"id": "person-gideon-joffe", "name": "Gideon Joffe", "role": "Chairman, Jewish Community of Berlin", "bio": "As Chairman of the Jewish Community of Berlin, he oversees the Neue Synagoge, which serves as a cultural and historic landmark."},
    {"id": "person-chana-schustermann", "name": "Chana Schüstermann", "role": "Director, Centrum Judaicum", "bio": "Leads the Centrum Judaicum foundation housed in the Neue Synagoge, managing exhibitions and educational programs on Berlin Jewish life."}
  ],
  "jewish-museum-berlin": [
    {"id": "person-daniel-libeskind", "name": "Daniel Libeskind", "role": "Architect", "bio": "Polish-American architect who designed the iconic zinc-clad Jewish Museum Berlin building, which opened in 2001 as a landmark of deconstructivist architecture."},
    {"id": "person-w-michael-blumenthal", "name": "W. Michael Blumenthal", "role": "Founding Director", "bio": "Former U.S. Treasury Secretary who served as the founding Director of the Jewish Museum Berlin from 1997 to 2014, shaping its mission and identity."},
    {"id": "person-hetty-berg", "name": "Hetty Berg", "role": "Director", "bio": "Dutch museum professional who became Director of the Jewish Museum Berlin in 2020, overseeing its exhibitions and public programs."},
    {"id": "person-cilly-kugelmann", "name": "Cilly Kugelmann", "role": "Former Program Director", "bio": "Served as Program Director and chief curator of the Jewish Museum Berlin, shaping major exhibitions on German-Jewish history and culture."}
  ],
  "sachsenhausen-memorial": [
    {"id": "person-axel-drecoll", "name": "Axel Drecoll", "role": "Director", "bio": "Serves as Director of the Sachsenhausen Memorial and Museum, overseeing the preservation of the former concentration camp as a site of remembrance and education."},
    {"id": "person-guenter-morsch", "name": "Günter Morsch", "role": "Former Director", "bio": "Led the Sachsenhausen Memorial and the Brandenburg Memorials Foundation for many years, establishing it as a leading Holocaust education site."},
    {"id": "person-astrid-ley", "name": "Astrid Ley", "role": "Deputy Director", "bio": "Serves as Deputy Director and head curator of the Sachsenhausen Memorial, leading research and exhibition development on the camp's history."}
  ],
  "abraham-geiger-college": [
    {"id": "person-walter-homolka", "name": "Walter Homolka", "role": "Founder & Former Rector", "bio": "Founded Abraham Geiger College in 1999 at the University of Potsdam, establishing the first rabbinical seminary in continental Europe since the Holocaust."},
    {"id": "person-abraham-geiger", "name": "Abraham Geiger", "role": "Namesake", "bio": "19th-century German rabbi considered a founding figure of Reform Judaism, after whom the college is named."},
    {"id": "person-rabbiner-henry-g-brandt", "name": "Henry G. Brandt", "role": "Honorary President", "bio": "Prominent Reform rabbi in Germany who served as Honorary President of the Abraham Geiger College and championed liberal Jewish life in Europe."}
  ],
  "zalando": [
    {"id": "person-robert-gentz", "name": "Robert Gentz", "role": "Co-founder & Co-CEO", "bio": "Co-founded Zalando in 2008 in Berlin and has served as Co-CEO, building it into Europe's leading online fashion and lifestyle platform."},
    {"id": "person-david-schneider", "name": "David Schneider", "role": "Co-founder & Co-CEO", "bio": "Co-founded Zalando with Robert Gentz and served as Co-CEO, overseeing the company's technology and platform strategy."},
    {"id": "person-rubin-ritter", "name": "Rubin Ritter", "role": "Former Co-CEO", "bio": "Served as Co-CEO of Zalando alongside Gentz and Schneider until 2021, leading the company's commercial and marketing strategy."},
    {"id": "person-oliver-samwer", "name": "Oliver Samwer", "role": "Early Investor (Rocket Internet)", "bio": "Co-founder of Rocket Internet who served as a key early investor and backer of Zalando, helping it scale rapidly across Europe."}
  ],
  "leo-baeck-institute-germany": [
    {"id": "person-leo-baeck", "name": "Leo Baeck", "role": "Namesake", "bio": "Rabbi and leader of Progressive Judaism in Germany who survived Theresienstadt; the institute was named in his honor to preserve German-Jewish heritage."},
    {"id": "person-michael-brenner", "name": "Michael Brenner", "role": "International President", "bio": "Historian and professor at LMU Munich who serves as International President of the Leo Baeck Institute, advancing scholarship on German-Jewish history."},
    {"id": "person-carol-kahn-strauss", "name": "Carol Kahn Strauss", "role": "Former Executive Director", "bio": "Led the Leo Baeck Institute in New York for decades, building its archive and library into essential resources for German-Jewish history research."},
    {"id": "person-william-seltzer", "name": "William Seltzer", "role": "Former President", "bio": "Served as President of the Leo Baeck Institute, stewarding its mission to document and preserve the history of German-speaking Jewry."}
  ],
  "moses-mendelssohn-center-for-european-jewish-studies": [
    {"id": "person-julius-schoeps", "name": "Julius H. Schoeps", "role": "Founding Director", "bio": "Historian and great-great-grandson of Moses Mendelssohn who founded the Moses Mendelssohn Center at the University of Potsdam in 1992."},
    {"id": "person-elke-vera-kotowski", "name": "Elke-Vera Kotowski", "role": "Deputy Director", "bio": "Serves as Deputy Director of the Moses Mendelssohn Center, leading research projects on European-Jewish history and culture."},
    {"id": "person-werner-tressl", "name": "Werner Treß", "role": "Research Associate", "bio": "Historian at the Moses Mendelssohn Center who researches the history of book burnings and cultural persecution in Nazi Germany."}
  ],
  "zentralwohlfahrtsstelle-der-juden-in-deutschland": [
    {"id": "person-aron-schuster", "name": "Aron Schuster", "role": "Director", "bio": "Serves as Director of the Central Welfare Office of Jews in Germany, overseeing social services and integration programs for Jewish communities."},
    {"id": "person-benjamin-bloch", "name": "Benjamin Bloch", "role": "Deputy Director", "bio": "Serves as Deputy Director of the ZWST, managing welfare and educational programs for Jewish communities throughout Germany."},
    {"id": "person-josef-schuster", "name": "Josef Schuster", "role": "Board Chairman (via Zentralrat)", "bio": "As President of the Central Council of Jews in Germany, he provides oversight to the ZWST's welfare mission and strategic direction."}
  ],
  "allgemeine-rabbinerkonferenz-general-rabbinical-conference": [
    {"id": "person-henry-g-brandt", "name": "Henry G. Brandt", "role": "Former Chairman", "bio": "Served as founding Chairman of the General Rabbinical Conference of Germany, unifying Reform, Conservative, and Liberal rabbis in Germany."},
    {"id": "person-andreas-nachama", "name": "Andreas Nachama", "role": "Chairman", "bio": "Rabbi and historian who serves as Chairman of the Allgemeine Rabbinerkonferenz, also known for directing the Topography of Terror documentation center in Berlin."},
    {"id": "person-avichai-apel", "name": "Avichai Apel", "role": "Orthodox Representative", "bio": "Orthodox rabbi in Germany who participates in the General Rabbinical Conference, representing the Orthodox stream in interfaith and community dialogue."}
  ],
  "european-maccabi-games": [
    {"id": "person-alon-meyer", "name": "Alon Meyer", "role": "President, Maccabi Germany (2015 Host)", "bio": "As President of Maccabi Germany, he led the organization of the 2015 European Maccabi Games held in Berlin, a landmark event for Jewish sports in Europe."},
    {"id": "person-yossi-sharabi", "name": "Yossi Sharabi", "role": "Tournament Director", "bio": "Served as Tournament Director for multiple European Maccabi Games, coordinating logistics and athletic competitions across host cities."},
    {"id": "person-pierre-kahn", "name": "Pierre Kahn", "role": "Chairman, European Maccabi Confederation", "bio": "Leads the European Maccabi Confederation which oversees the European Maccabi Games, promoting Jewish identity through sports across the continent."}
  ],
  "j-dische-allgemeine": [
    {"id": "person-guido-knopp", "name": "Guido Knopp", "role": "Contributing Editor", "bio": "Renowned German historian and journalist who has contributed to the Jüdische Allgemeine's coverage of German-Jewish history and current affairs."},
    {"id": "person-detlef-david-kauschke", "name": "Detlef David Kauschke", "role": "Editor-in-Chief", "bio": "Serves as Editor-in-Chief of the Jüdische Allgemeine, the leading Jewish newspaper in Germany, published by the Central Council of Jews."},
    {"id": "person-josef-schuster", "name": "Josef Schuster", "role": "Publisher (via Zentralrat)", "bio": "As President of the Central Council of Jews in Germany, he serves as publisher of the Jüdische Allgemeine, the council's official weekly newspaper."},
    {"id": "person-daniel-botmann", "name": "Daniel Botmann", "role": "Managing Director (via Zentralrat)", "bio": "As Managing Director of the Central Council, he oversees operational aspects including the publication of the Jüdische Allgemeine."}
  ],
  "atlassian": [
    {"id": "person-mike-cannon-brookes", "name": "Mike Cannon-Brookes", "role": "Co-founder & Co-CEO", "bio": "Co-founded Atlassian in 2002 in Sydney with Scott Farquhar, building it into a global software company known for Jira, Confluence, and Trello."},
    {"id": "person-scott-farquhar", "name": "Scott Farquhar", "role": "Co-founder & Co-CEO", "bio": "Co-founded Atlassian with Mike Cannon-Brookes, serving as Co-CEO and helping grow the company to over 300,000 enterprise customers worldwide."},
    {"id": "person-jay-simons", "name": "Jay Simons", "role": "Former President", "bio": "Served as President of Atlassian for over a decade, driving the company's go-to-market strategy and its unique no-sales-team model."},
    {"id": "person-anu-bharadwaj", "name": "Anu Bharadwaj", "role": "Chief Operating Officer", "bio": "Serves as COO of Atlassian, overseeing the company's product and engineering teams across its collaboration software suite."}
  ],
  "jewish-holocaust-centre-melbourne": [
    {"id": "person-pauline-rockman", "name": "Pauline Rockman", "role": "President", "bio": "Daughter of Holocaust survivors who served as President of the Jewish Holocaust Centre in Melbourne, championing survivor testimony and education."},
    {"id": "person-helen-mahemoff", "name": "Helen Mahemoff", "role": "Former President", "bio": "Led the Jewish Holocaust Centre Melbourne as President, overseeing its educational programs and outreach to schools across Victoria."},
    {"id": "person-jayne-josem", "name": "Jayne Josem", "role": "Museum Director", "bio": "Serves as Director of the Jewish Holocaust Centre Melbourne, managing its museum, archives and survivor testimony programs."}
  ],
  "csl-limited": [
    {"id": "person-paul-perreault", "name": "Paul Perreault", "role": "CEO & Managing Director", "bio": "Led CSL Limited as CEO from 2013, growing the Melbourne-based biopharmaceutical company into a global leader in plasma-derived therapies."},
    {"id": "person-brian-mcnamee", "name": "Brian McNamee", "role": "Former CEO", "bio": "Served as CEO of CSL from 1990 to 2013, overseeing the company's transformation from government laboratory to global biopharmaceutical giant."},
    {"id": "person-paul-mckenzie", "name": "Paul McKenzie", "role": "CEO & Managing Director", "bio": "Became CEO of CSL, continuing the company's growth in plasma-derived and recombinant therapies and vaccine manufacturing."},
    {"id": "person-elizabeth-alexander", "name": "Elizabeth Alexander", "role": "Chair", "bio": "Serves as Chair of CSL Limited's board, providing governance leadership for one of Australia's most valuable companies."}
  ],
  "visy-industries-anthony-pratt": [
    {"id": "person-anthony-pratt", "name": "Anthony Pratt", "role": "Executive Chairman", "bio": "Leads Visy Industries as Executive Chairman, making it one of the world's largest privately owned packaging and recycling companies; one of Australia's wealthiest individuals."},
    {"id": "person-richard-pratt", "name": "Richard Pratt", "role": "Former Chairman & Patriarch", "bio": "Built Visy Industries into a packaging empire and was a renowned philanthropist before his death in 2009; father of Anthony Pratt."},
    {"id": "person-fiona-pratt", "name": "Fiona Pratt", "role": "Family Member & Philanthropist", "bio": "Member of the Pratt family and active philanthropist supporting arts, education, and Jewish community causes in Australia."}
  ],
  "lowy-institute": [
    {"id": "person-frank-lowy", "name": "Frank Lowy", "role": "Founder & Benefactor", "bio": "Hungarian-born Australian billionaire and Westfield founder who established the Lowy Institute in 2003 to promote informed debate on Australia's international policy."},
    {"id": "person-michael-fullilove", "name": "Michael Fullilove", "role": "Executive Director", "bio": "Leads the Lowy Institute as Executive Director, making it one of the leading independent international policy think tanks in the Asia-Pacific region."},
    {"id": "person-steven-lowy", "name": "Steven Lowy", "role": "Board Member", "bio": "Son of Frank Lowy who serves on the Lowy Institute board, continuing the family's commitment to public policy and philanthropy."}
  ],
  "pratt-foundation": [
    {"id": "person-richard-pratt", "name": "Richard Pratt", "role": "Co-founder", "bio": "Co-founded the Pratt Foundation with his wife Jeanne in 1978, making it one of Australia's largest philanthropic organizations."},
    {"id": "person-jeanne-pratt", "name": "Jeanne Pratt", "role": "Co-founder & Chair", "bio": "Co-founded the Pratt Foundation with her husband Richard and continues to lead it as Chair, directing grants to arts, education, and community welfare."},
    {"id": "person-anthony-pratt", "name": "Anthony Pratt", "role": "Director", "bio": "Serves as a director of the Pratt Foundation, continuing the family's philanthropic legacy across Australia and internationally."},
    {"id": "person-sam-lipski", "name": "Sam Lipski", "role": "Advisory Role", "bio": "Veteran Australian Jewish journalist and community leader who has advised the Pratt Foundation on philanthropic strategy and community programs."}
  ],
  "meriton-harry-triguboff": [
    {"id": "person-harry-triguboff", "name": "Harry Triguboff", "role": "Founder & Managing Director", "bio": "Founded Meriton in 1963 and built it into Australia's largest apartment developer; a Chinese-born Australian billionaire often called 'high-rise Harry'."},
    {"id": "person-peter-spira", "name": "Peter Spira", "role": "General Manager", "bio": "Long-serving General Manager of Meriton who oversees the company's development operations across Sydney, Brisbane, and the Gold Coast."},
    {"id": "person-adrian-bo", "name": "Adrian Bo", "role": "Head of Sales", "bio": "Leads Meriton's sales division, managing residential property sales across one of Australia's most prolific apartment development portfolios."}
  ],
  "jewish-museum-of-australia": [
    {"id": "person-helen-light", "name": "Helen Light", "role": "Former Director", "bio": "Served as Director of the Jewish Museum of Australia in Melbourne for many years, shaping its exhibitions on the Australian Jewish experience."},
    {"id": "person-robert-gillespie", "name": "Robert Gillespie", "role": "President", "bio": "Served as President of the Jewish Museum of Australia, providing governance leadership and supporting the museum's community engagement programs."},
    {"id": "person-tamara-green", "name": "Tamara Green", "role": "Curator", "bio": "Serves as curator at the Jewish Museum of Australia, developing exhibitions that explore Jewish life, art, and heritage in the Australian context."}
  ],
  "sydney-jewish-museum": [
    {"id": "person-norman-seligman", "name": "Norman Seligman", "role": "Co-founder & Former President", "bio": "Holocaust survivor who co-founded the Sydney Jewish Museum in 1992 to preserve Holocaust memory and combat prejudice through education."},
    {"id": "person-gus-lehrer", "name": "Gus Lehrer", "role": "President", "bio": "Served as President of the Sydney Jewish Museum board, overseeing its governance and strategic direction as a leading Holocaust education center."},
    {"id": "person-roslyn-sugarman", "name": "Roslyn Sugarman", "role": "Head of Education & Content", "bio": "Leads the education and content team at the Sydney Jewish Museum, developing programs that use Holocaust history to promote tolerance and human rights."}
  ],
  "zionist-federation-of-australia": [
    {"id": "person-jeremy-leibler", "name": "Jeremy Leibler", "role": "President", "bio": "Prominent Australian lawyer who serves as President of the Zionist Federation of Australia, leading advocacy for Israel and Jewish community interests."},
    {"id": "person-ginette-searle", "name": "Ginette Searle", "role": "CEO", "bio": "Serves as CEO of the Zionist Federation of Australia, managing the organization's operations, programs, and Israel engagement activities."},
    {"id": "person-mark-leibler", "name": "Mark Leibler", "role": "Honorary Life Member & Senior Leader", "bio": "Former national chairman and honorary life member of the ZFA, he is one of Australia's most influential Jewish community leaders and tax lawyers."}
  ],
  "nsw-jewish-board-of-deputies": [
    {"id": "person-lesli-berger", "name": "Lesli Berger", "role": "President", "bio": "Has served as President of the NSW Jewish Board of Deputies, the elected representative body of the Jewish community in New South Wales."},
    {"id": "person-vic-alhadeff", "name": "Vic Alhadeff", "role": "Former CEO", "bio": "Led the NSW Jewish Board of Deputies as CEO for many years, serving as the community's primary spokesperson and interfaith advocate."},
    {"id": "person-darren-bark", "name": "Darren Bark", "role": "CEO", "bio": "Serves as CEO of the NSW Jewish Board of Deputies, overseeing community advocacy, government relations, and communal affairs in New South Wales."}
  ],
  "mount-scopus-memorial-college": [
    {"id": "person-rabbi-james-kennard", "name": "Rabbi James Kennard", "role": "Principal", "bio": "Serves as Principal of Mount Scopus Memorial College in Melbourne, one of Australia's largest Jewish day schools."},
    {"id": "person-tony-rubin", "name": "Tony Rubin", "role": "Former President", "bio": "Served as President of the Mount Scopus Foundation, supporting the college's educational programs and facilities in Melbourne."},
    {"id": "person-steven-rothfield", "name": "Steven Rothfield", "role": "Board Leader", "bio": "Community leader who has served in board leadership roles at Mount Scopus Memorial College, supporting the school's governance and fundraising."}
  ],
  "moriah-college-sydney": [
    {"id": "person-john-mimran", "name": "John Mimran", "role": "Principal", "bio": "Serves as Principal of Moriah College in Sydney, leading one of Australia's largest Jewish day schools in academics and Jewish education."},
    {"id": "person-adam-carpenter", "name": "Adam Carpenter", "role": "President of the Board", "bio": "Serves as President of the Moriah College board, overseeing governance and strategic direction for Sydney's largest Jewish school."},
    {"id": "person-ray-kellerman", "name": "Ray Kellerman", "role": "Former President", "bio": "Long-serving past president of Moriah College who guided the school's growth and development over many years."}
  ],
  "the-australian-jewish-news": [
    {"id": "person-zeddy-lawrence", "name": "Zeddy Lawrence", "role": "Editor-in-Chief", "bio": "Serves as Editor-in-Chief of The Australian Jewish News, the primary Jewish community newspaper serving Melbourne and Sydney."},
    {"id": "person-robert-gillespie-ajn", "name": "Robert Gillespie", "role": "Chairman", "bio": "Served as Chairman of the board of The Australian Jewish News, providing governance and strategic direction for the publication."},
    {"id": "person-sam-lipski", "name": "Sam Lipski", "role": "Former Editor-in-Chief", "bio": "Legendary Australian Jewish journalist who served as Editor-in-Chief of The Australian Jewish News, shaping Jewish media in Australia for decades."}
  ],
  "jewish-community-council-of-victoria-jccv": [
    {"id": "person-daniel-aghion", "name": "Daniel Aghion", "role": "President", "bio": "Serves as President of the Jewish Community Council of Victoria, the elected representative body of the Jewish community in Victoria."},
    {"id": "person-jennifer-huppert", "name": "Jennifer Huppert", "role": "Former President", "bio": "Served as President of the JCCV, advocating for the Jewish community's interests and combating antisemitism in Victoria."},
    {"id": "person-judy-fetter", "name": "Judy Fetter", "role": "Former President", "bio": "Served as President of the JCCV, contributing to community governance and interfaith dialogue in the Victorian Jewish community."}
  ],
  "lendlease-group": [
    {"id": "person-dick-dusseldorp", "name": "Dick Dusseldorp", "role": "Founder", "bio": "Dutch-born Australian industrialist who founded Lend Lease Corporation in 1958, building it into one of Australia's leading property and infrastructure companies."},
    {"id": "person-tony-lombardo", "name": "Tony Lombardo", "role": "CEO & Managing Director", "bio": "Serves as CEO and Managing Director of Lendlease Group, overseeing its global property development, construction, and investment operations."},
    {"id": "person-steve-mccann", "name": "Steve McCann", "role": "Former CEO", "bio": "Led Lendlease Group as CEO from 2008 to 2021, guiding the company through major international development projects and strategic transformation."},
    {"id": "person-michael-ullmer", "name": "Michael Ullmer", "role": "Chairman", "bio": "Serves as Chairman of Lendlease Group, providing board-level governance for the multinational property and infrastructure corporation."}
  ],
  "monash-university-jewish-studies": [
    {"id": "person-mark-baker", "name": "Mark Baker", "role": "Director, Australian Centre for Jewish Civilisation", "bio": "Historian who directs the Australian Centre for Jewish Civilisation at Monash University, leading research and teaching on Jewish history and culture."},
    {"id": "person-andrew-markus", "name": "Andrew Markus", "role": "Professor of Jewish Civilisation", "bio": "Pratt Foundation Research Professor of Jewish Civilisation at Monash University, known for his research on Australian social cohesion and immigration."},
    {"id": "person-myer-samra", "name": "Myer Samra", "role": "Lecturer in Jewish Studies", "bio": "Lectures in Jewish civilization at Monash University, contributing to the academic program on Jewish history and culture in Australia."}
  ]
};

// Process both Germany and Australia entries
const countries = ['Germany', 'Australia'];

for (const country of countries) {
  const entries = jd.countries[country] || [];
  const index = {};
  entries.forEach((e, i) => { index[e.id] = i; });

  for (const [entryId, individuals] of Object.entries(individualsMap)) {
    const idx = index[entryId];
    if (idx === undefined) continue;

    const entry = entries[idx];
    const existingIds = new Set((entry.individuals || []).map(i => i.id));

    if (!entry.individuals) entry.individuals = [];

    let addedToEntry = 0;
    for (const ind of individuals) {
      if (addPerson(ind.id, ind.name, ind.bio)) newPeople++;

      if (!existingIds.has(ind.id)) {
        entry.individuals.push({
          id: ind.id,
          name: ind.name,
          role: ind.role,
          bio: ind.bio
        });
        existingIds.add(ind.id);
        addedToEntry++;
      }
    }

    if (addedToEntry > 0) {
      updatedEntries++;
      console.log(`  ${entryId}: +${addedToEntry} individuals (total: ${entry.individuals.length})`);
    }
  }
}

// Save
fs.writeFileSync(pFile, JSON.stringify(pd, null, 2));
fs.writeFileSync(jFile, JSON.stringify(jd, null, 2));

// Verify
const totalPeople = Object.keys(pd.people).length;
let totalEntries = 0;
for (const c in jd.countries) totalEntries += jd.countries[c].length;

console.log(`\n=== expandData55 RESULTS ===`);
console.log(`Entries updated: ${updatedEntries}`);
console.log(`New people added: ${newPeople}`);
console.log(`Total people in DB: ${totalPeople}`);
console.log(`Total entries: ${totalEntries}`);

// Verify all targeted entries now have individuals
let sparse = 0;
for (const entryId of Object.keys(individualsMap)) {
  for (const country of countries) {
    const entries = jd.countries[country] || [];
    const found = entries.find(e => e.id === entryId);
    if (found) {
      const cnt = (found.individuals || []).length;
      if (cnt <= 1) { console.log(`STILL SPARSE: ${entryId} (${cnt})`); sparse++; }
    }
  }
}
console.log(`Still sparse: ${sparse}`);
