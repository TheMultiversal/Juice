// expandData27.js - Wave 3: More unique entries, more countries, more categories
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
function addEntry(country, entry) {
  if (!data.countries[country]) data.countries[country] = [];
  if (data.countries[country].some(e => e.id === entry.id)) return false;
  data.countries[country].push(entry);
  return true;
}
let added = 0;
function add(country, e) {
  for (const ind of (e.individuals || [])) addPerson(ind.id, ind.name, ind.bio);
  if (addEntry(country, e)) added++;
}

// ============================================================
// US Wave 3 - More unique entries
// ============================================================
const us3 = [
  { name: 'Paramount Pictures', id: slug('Paramount Pictures'), type: 'film studio', category: 'Entertainment & Media', description: 'Paramount Pictures is one of the "Big Five" major Hollywood film studios, originally founded in 1912 by Adolph Zukor, a Hungarian Jewish immigrant. Paramount has produced some of the highest-grossing films in history including The Godfather, Titanic, Transformers, and Mission: Impossible. Now a subsidiary of Paramount Global.', website: 'https://www.paramount.com/studios', founded: 1912, individuals: [{ id: slug('Adolph Zukor'), name: 'Adolph Zukor', role: 'Founder', bio: 'Founder of Paramount Pictures. Hungarian-born Jewish immigrant who was a pioneer of the American film industry.' }], connections: [{ name: 'Paramount Global', type: 'parent company', description: 'Paramount Pictures is the film studio division of Paramount Global.' }] },
  { name: 'Warner Bros. Pictures', id: slug('Warner Bros Pictures'), type: 'film studio', category: 'Entertainment & Media', description: 'Warner Bros. Pictures is one of the "Big Five" major Hollywood studios. Founded in 1923 by four brothers - Harry, Albert, Sam, and Jack Warner - sons of Polish Jewish immigrants. Warner Bros. pioneered "talkies" with The Jazz Singer (1927) and has produced iconic franchises including Harry Potter, DC Comics films, The Matrix, and Looney Tunes.', website: 'https://www.warnerbros.com', founded: 1923, individuals: [{ id: slug('Harry Warner'), name: 'Harry Warner', role: 'Co-Founder', bio: 'Co-founder and first president of Warner Bros. Eldest of the Warner brothers, sons of Polish Jewish immigrants.' }, { id: slug('Jack Warner'), name: 'Jack Warner', role: 'Co-Founder', bio: 'Co-founder of Warner Bros. Led the studio as production chief for decades. Known for his larger-than-life personality.' }], connections: [{ name: 'Warner Bros. Discovery', type: 'corporate evolution', description: 'Warner Bros. Pictures is now part of Warner Bros. Discovery.' }, { name: 'Paramount Pictures', type: 'studio peer', description: 'Both are classic Hollywood studios founded by Jewish immigrants.' }] },
  { name: 'Universal Pictures', id: slug('Universal Pictures'), type: 'film studio', category: 'Entertainment & Media', description: 'Universal Pictures is one of the oldest and most successful Hollywood studios, founded by Carl Laemmle, a German-Jewish immigrant, in 1912. Universal has produced iconic films including Jaws, E.T., Jurassic Park, Fast & Furious, and the Universal Monsters franchise. It is now part of NBCUniversal, owned by Comcast.', website: 'https://www.universalpictures.com', founded: 1912, individuals: [{ id: slug('Carl Laemmle'), name: 'Carl Laemmle', role: 'Founder', bio: 'Founder of Universal Pictures. German-Jewish immigrant who pioneered the Hollywood studio system. Used his position to rescue over 300 Jewish families from Nazi Germany.' }], connections: [{ name: 'Warner Bros. Pictures', type: 'studio peer', description: 'Both are classic Hollywood studios founded by Jewish immigrants.' }] },
  { name: 'Metro-Goldwyn-Mayer (MGM)', id: slug('Metro-Goldwyn-Mayer MGM'), type: 'film studio', category: 'Entertainment & Media', description: 'Metro-Goldwyn-Mayer (MGM) was once the most powerful studio in Hollywood, known for its Leo the Lion logo and motto "Ars Gratia Artis." Founded through mergers by Marcus Loew, with Louis B. Mayer (born Lazar Meir, a Belarusian Jewish immigrant) serving as studio head for decades. MGM produced classics including The Wizard of Oz, Gone with the Wind, and James Bond films. Amazon acquired MGM in 2022 for $8.45 billion.', website: 'https://www.mgm.com', founded: 1924, individuals: [{ id: slug('Louis B. Mayer'), name: 'Louis B. Mayer', role: 'Co-Founder & Studio Head', bio: 'Co-founder and legendary studio head of MGM. Born Lazar Meir to a Jewish family in the Russian Empire. Was the highest-paid person in America in the 1930s.' }], connections: [{ name: 'Universal Pictures', type: 'studio peer', description: 'Both are classic Hollywood studios with Jewish founders.' }] },
  { name: 'Columbia Pictures', id: slug('Columbia Pictures'), type: 'film studio', category: 'Entertainment & Media', description: 'Columbia Pictures is a major film studio originally founded as CBC Film Sales Corporation by Harry Cohn, Jack Cohn, and Joe Brandt in 1918 (renamed Columbia in 1924). Harry Cohn, the son of a Jewish tailor from Germany, ran the studio with an iron fist for decades. Columbia produced Spider-Man, Men in Black, Ghostbusters, and many other iconic films. Now owned by Sony.', website: 'https://www.sonypictures.com/columbia', founded: 1918, individuals: [{ id: slug('Harry Cohn'), name: 'Harry Cohn', role: 'Co-Founder & President', bio: 'Co-founder and longtime president of Columbia Pictures. Notorious studio boss known for his demanding leadership style. Son of German Jewish immigrants.' }], connections: [{ name: 'Metro-Goldwyn-Mayer (MGM)', type: 'studio peer', description: 'Both are classic Hollywood studios founded by Jewish entrepreneurs.' }] },
  { name: 'Fox Corporation', id: slug('Fox Corporation'), type: 'media company', category: 'Entertainment & Media', description: 'Fox Corporation operates Fox News, Fox Sports, Fox Business, and the Fox television network. While founded by Rupert Murdoch, Fox Corporation has significant Jewish leadership including former Fox News president and co-president. Lachlan Murdoch serves as Chairman and CEO. Fox News is the most-watched cable news network in the United States.', website: 'https://www.foxcorporation.com', founded: 2019, individuals: [], connections: [{ name: 'Paramount Global', type: 'media peer', description: 'Both are major American media companies.' }] },
  { name: 'Comcast Corporation', id: slug('Comcast Corporation'), type: 'media & telecom conglomerate', category: 'Entertainment & Media', description: 'Comcast Corporation is the largest cable television company and home internet provider in the United States, and the third-largest home telephone provider. Under CEO Brian Roberts, the son of founder Ralph Roberts, Comcast acquired NBCUniversal for $30 billion and DreamWorks Animation for $3.8 billion. The Roberts family has deep ties to the Jewish community in Philadelphia.', website: 'https://www.comcastcorporation.com', founded: 1963, individuals: [{ id: slug('Brian Roberts'), name: 'Brian Roberts', role: 'Chairman & CEO', bio: 'Chairman and CEO of Comcast Corporation. Son of co-founder Ralph Roberts. Built Comcast from a small cable operator into one of the world\'s largest media companies.' }, { id: slug('Ralph Roberts'), name: 'Ralph Roberts', role: 'Co-Founder', bio: 'Co-founder of Comcast Corporation. Jewish American businessman from New York who moved to Philadelphia. Died in 2015.' }], connections: [{ name: 'Universal Pictures', type: 'owned studio', description: 'Comcast owns Universal Pictures through its NBCUniversal subsidiary.' }, { name: 'DreamWorks Animation', type: 'acquired studio', description: 'Comcast acquired DreamWorks Animation in 2016.' }] },
  { name: 'ViacomCBS Foundation', id: slug('ViacomCBS Foundation'), type: 'philanthropic foundation', category: 'Philanthropy & Foundations', description: 'The Redstone family\'s National Amusements controls Paramount Global (formerly ViacomCBS). The Redstone fortune, built by Sumner Redstone (born Sumner Murray Rothstein, son of a Boston Jewish family), spans media including Paramount Pictures, CBS, Showtime, MTV, Nickelodeon, and BET. Sumner Redstone was one of the most powerful media moguls in American history.', website: '', founded: 2000, individuals: [{ id: slug('Sumner Redstone'), name: 'Sumner Redstone', role: 'Patriarch', bio: 'Media mogul who built the Viacom empire. Born Sumner Murray Rothstein to a Jewish family in Boston. Controlled Paramount, CBS, MTV, Nickelodeon. Died in 2020.' }], connections: [{ name: 'Paramount Global', type: 'corporate connection', description: 'The Redstone family controls Paramount Global through National Amusements.' }] },
  { name: 'Las Vegas Sands Corp.', id: slug('Las Vegas Sands Corp'), type: 'casino & resort company', category: 'Real Estate & Property', description: 'Las Vegas Sands Corp. is the world\'s leading developer of integrated resorts. Founded by Sheldon Adelson, who built The Venetian in Las Vegas and Marina Bay Sands in Singapore. Adelson was one of the wealthiest people in the world and the largest Republican donor in US history before his death in 2021. His wife Miriam Adelson continues the family\'s major philanthropic and political engagement.', website: 'https://www.sands.com', founded: 1988, individuals: [{ id: slug('Sheldon Adelson'), name: 'Sheldon Adelson', role: 'Founder', bio: 'Founder of Las Vegas Sands. Was one of the world\'s wealthiest people and the largest political donor in US history. Major supporter of Israel and Jewish causes. Died in 2021.' }, { id: slug('Miriam Adelson'), name: 'Miriam Adelson', role: 'Majority Owner', bio: 'Majority owner of Las Vegas Sands. Israeli-American physician and one of the world\'s wealthiest women. Major political donor and supporter of Israel.' }], connections: [{ name: 'The Marcus Foundation', type: 'Republican donor peer', description: 'Both the Adelson and Marcus families are among the largest Republican donors in the US.' }] },
  { name: 'Wynn Resorts', id: slug('Wynn Resorts'), type: 'casino & resort company', category: 'Real Estate & Property', description: 'Wynn Resorts is a luxury casino and resort company founded by Steve Wynn. Known for transforming the Las Vegas Strip with the Wynn and Encore resorts, and building Wynn Palace and Wynn Macau in China. Wynn is credited with sparking the modern era of mega-resorts on the Las Vegas Strip.', website: 'https://www.wynnresorts.com', founded: 2002, individuals: [{ id: slug('Steve Wynn'), name: 'Steve Wynn', role: 'Founder', bio: 'Founder of Wynn Resorts. Transformed the Las Vegas Strip with The Mirage, Bellagio, and Wynn resorts. Resigned as chairman in 2018.' }], connections: [{ name: 'Las Vegas Sands Corp.', type: 'casino industry peer', description: 'Both are major Las Vegas & Macau casino resort operators.' }] },
  { name: 'Berkshire Hathaway', id: slug('Berkshire Hathaway'), type: 'conglomerate', category: 'Conglomerates', description: 'While Berkshire Hathaway is led by Warren Buffett, the company\'s vice chairman for decades was Charlie Munger, and key executives have included Ajit Jain and Greg Abel. The company has significant investments in companies founded or led by Jewish executives, and Buffett\'s close partnership with the late Munger and extensive dealings with Jewish business leaders have been a hallmark of his career.', website: 'https://www.berkshirehathaway.com', founded: 1839, individuals: [], connections: [{ name: '3G Capital', type: 'investment partner', description: 'Berkshire Hathaway partnered with 3G Capital to acquire Kraft Heinz.' }] },
  { name: 'Kraft Heinz Company', id: slug('Kraft Heinz Company'), type: 'food & beverage company', category: 'Food & Beverage', description: 'The Kraft Heinz Company is one of the largest food and beverage companies in the world, formed from the 2015 merger of Kraft Foods and H.J. Heinz, orchestrated by 3G Capital and Berkshire Hathaway. The Kraft family, of German Jewish heritage, built Kraft Foods into an American household name. Brands include Oscar Mayer, Philadelphia, Maxwell House, and Planters.', website: 'https://www.kraftheinzcompany.com', founded: 2015, individuals: [], connections: [{ name: '3G Capital', type: 'controlling shareholder', description: '3G Capital co-owns Kraft Heinz with Berkshire Hathaway.' }, { name: 'Starbucks Corporation', type: 'food industry peer', description: 'Both are major American food and beverage companies.' }] },
  { name: 'Hasbro', id: slug('Hasbro'), type: 'toy company', category: 'Entertainment & Media', description: 'Hasbro, Inc. is one of the world\'s largest toy and entertainment companies. Founded by Henry and Helal Hassenfeld, Jewish immigrants from Poland, in 1923 as a textile remnant company in Providence, Rhode Island. Hasbro owns iconic brands including Monopoly, Transformers, My Little Pony, Nerf, Play-Doh, and Dungeons & Dragons. The Hassenfeld family led the company for three generations.', website: 'https://www.hasbro.com', founded: 1923, individuals: [{ id: slug('Henry Hassenfeld'), name: 'Henry Hassenfeld', role: 'Co-Founder', bio: 'Co-founder of Hasbro. Polish Jewish immigrant who started the company as a textile business in Providence, Rhode Island.' }], connections: [{ name: 'The Walt Disney Company', type: 'licensing partner', description: 'Hasbro has produced toys for many Disney properties.' }] },
  { name: 'Mattel', id: slug('Mattel'), type: 'toy company', category: 'Entertainment & Media', description: 'Mattel, Inc. is the world\'s second-largest toy company by revenue. Co-founded by Ruth Handler and her husband Elliot Handler (both Jewish) along with Harold Matson in 1945. Ruth Handler invented the Barbie doll in 1959, named after her daughter Barbara. Mattel also makes Hot Wheels, Fisher-Price, American Girl, and UNO.', website: 'https://www.mattel.com', founded: 1945, individuals: [{ id: slug('Ruth Handler'), name: 'Ruth Handler', role: 'Co-Founder', bio: 'Co-founder of Mattel and inventor of the Barbie doll. Born to a Jewish family of Polish immigrants in Denver, Colorado. Died in 2002.' }], connections: [{ name: 'Hasbro', type: 'toy industry rival', description: 'The world\'s two largest toy companies.' }] },
  // HEALTHCARE
  { name: 'Mount Sinai Health System', id: slug('Mount Sinai Health System'), type: 'hospital system', category: 'Healthcare & Pharmaceuticals', description: 'The Mount Sinai Health System is one of the largest academic medical systems in the United States, encompassing eight hospitals, the Icahn School of Medicine at Mount Sinai, and a network of ambulatory practices. Founded in 1852 by a group of Jewish philanthropists to serve New York\'s poor regardless of religion, Mount Sinai is consistently ranked among the top hospitals in the nation.', website: 'https://www.mountsinai.org', founded: 1852, individuals: [], connections: [{ name: 'Hadassah Medical Center', type: 'medical peer', description: 'Both are major medical centers with Jewish founding heritage.' }] },
  { name: 'Cedars-Sinai Medical Center', id: slug('Cedars-Sinai Medical Center'), type: 'hospital', category: 'Healthcare & Pharmaceuticals', description: 'Cedars-Sinai Medical Center is a nonprofit, tertiary medical center in Los Angeles and one of the largest hospitals on the West Coast. Founded through the merger of Cedars of Lebanon Hospital and Mount Sinai Hospital, both established by the Jewish community. Known as the "hospital to the stars," it is consistently ranked among the top hospitals in the US and is a major research institution.', website: 'https://www.cedars-sinai.org', founded: 1902, individuals: [], connections: [{ name: 'Mount Sinai Health System', type: 'medical peer', description: 'Both are major medical centers founded by the Jewish community.' }] },
  // THINK TANKS
  { name: 'Brookings Institution', id: slug('Brookings Institution'), type: 'think tank', category: 'Advocacy & Public Affairs', description: 'The Brookings Institution is one of the most prestigious and influential think tanks in the world. While not a Jewish organization, Brookings has had significant Jewish leadership and fellows, particularly in its Middle East programs. Its Saban Center for Middle East Policy (funded by Haim Saban) has been highly influential in shaping US policy in the Middle East.', website: 'https://www.brookings.edu', founded: 1916, individuals: [], connections: [{ name: 'Saban Capital Group', type: 'donor connection', description: 'Haim Saban funded the Saban Center at Brookings.' }] },
  { name: 'Council on Foreign Relations', id: slug('Council on Foreign Relations'), type: 'think tank', category: 'Advocacy & Public Affairs', description: 'The Council on Foreign Relations (CFR) is among the most influential US foreign policy think tanks. While not a Jewish organization, CFR has had many prominent Jewish members and leaders throughout its history, and it publishes Foreign Affairs, one of the most important publications on international relations. Membership includes top figures from government, business, and academia.', website: 'https://www.cfr.org', founded: 1921, individuals: [], connections: [{ name: 'Brookings Institution', type: 'think tank peer', description: 'Both are premier American foreign policy think tanks.' }] },
];

for (const e of us3) add('United States', e);

// ============================================================
// ISRAEL - Wave 3
// ============================================================
const il3 = [
  { name: 'Check Point Software Technologies', id: slug('Check Point Software Technologies'), type: 'cybersecurity company', category: 'Technology', description: 'Check Point Software Technologies is a multinational cybersecurity company founded by Gil Shwed in 1993. It pioneered the modern firewall and is one of the world\'s largest cybersecurity companies. The company\'s products protect government institutions and Fortune 100 companies worldwide. Check Point is considered a foundational company of Israel\'s "Startup Nation" tech ecosystem.', website: 'https://www.checkpoint.com', founded: 1993, individuals: [{ id: slug('Gil Shwed'), name: 'Gil Shwed', role: 'Founder & CEO', bio: 'Founder and CEO of Check Point Software Technologies. Israeli tech pioneer who invented the commercial firewall. One of Israel\'s wealthiest people.' }], connections: [{ name: 'CyberArk', type: 'Israeli cybersecurity peer', description: 'Both are leading Israeli cybersecurity companies.' }] },
  { name: 'Nice Ltd.', id: slug('Nice Ltd'), type: 'enterprise software', category: 'Technology', description: 'NICE Ltd. is an Israeli software company that develops cloud and on-premises enterprise software solutions. NICE systems are used by contact centers, financial institutions, and public safety organizations worldwide. The company\'s workforce management and analytics products are used by over 85% of Fortune 100 companies.', website: 'https://www.nice.com', founded: 1986, individuals: [{ id: slug('Barak Eilam'), name: 'Barak Eilam', role: 'CEO', bio: 'CEO of NICE Ltd. Israeli technology executive leading one of Israel\'s largest software companies.' }], connections: [{ name: 'Check Point Software Technologies', type: 'Israeli enterprise software peer', description: 'Both are major Israeli enterprise software companies.' }] },
  { name: 'Amdocs', id: slug('Amdocs'), type: 'IT services company', category: 'Technology', description: 'Amdocs Limited is a multinational corporation headquartered in Chesterfield, Missouri, but founded in Israel and deeply rooted in Israeli tech. Amdocs provides software and services to communications companies worldwide, with its systems managing billing and service for over 350 service providers globally, touching billions of subscribers.', website: 'https://www.amdocs.com', founded: 1982, individuals: [], connections: [{ name: 'Nice Ltd.', type: 'Israeli tech peer', description: 'Both are major Israeli technology companies serving enterprise clients.' }] },
  { name: 'Yad Vashem', id: slug('Yad Vashem'), type: 'memorial & museum', category: 'Heritage & Memorials', description: 'Yad Vashem is Israel\'s official memorial to the victims of the Holocaust and the world\'s leading center for Holocaust documentation, research, and education. Located on Mount Herzl in Jerusalem, it features a museum, memorial hall, children\'s memorial, archive of over 200 million pages, and the name database of over 4.8 million Holocaust victims. The title "Righteous Among the Nations" is conferred by Yad Vashem.', website: 'https://www.yadvashem.org', founded: 1953, individuals: [], connections: [{ name: 'Auschwitz-Birkenau State Museum', type: 'memorial peer', description: 'Both are primary institutions preserving Holocaust memory.' }, { name: 'United States Holocaust Memorial Museum', type: 'museum peer', description: 'Both are leading Holocaust memorial institutions.' }, { name: 'POLIN Museum', type: 'educational partner', description: 'Both document the history and destruction of European Jewry.' }] },
  { name: 'Israel Museum', id: slug('Israel Museum'), type: 'museum', category: 'Heritage & Memorials', description: 'The Israel Museum in Jerusalem is the largest cultural institution in Israel and one of the world\'s leading art and archaeology museums. Founded in 1965, it houses the Dead Sea Scrolls in the Shrine of the Book, extensive archaeological collections from the Holy Land, and fine art from around the world. The museum attracts nearly one million visitors annually.', website: 'https://www.imj.org.il', founded: 1965, individuals: [], connections: [{ name: 'Yad Vashem', type: 'Jerusalem cultural institution', description: 'Both are major cultural institutions in Jerusalem.' }] },
  { name: 'World Zionist Organization', id: slug('World Zionist Organization'), type: 'political organization', category: 'Advocacy & Public Affairs', description: 'The World Zionist Organization (WZO) was founded by Theodor Herzl at the First Zionist Congress in Basel, Switzerland, in 1897. It was the driving force behind the establishment of the State of Israel and continues to promote Zionism, Jewish education, and settlement activity. WZO elections are held every five years as a form of "Parliament of the Jewish people."', website: 'https://www.wzo.org.il', founded: 1897, individuals: [{ id: slug('Theodor Herzl'), name: 'Theodor Herzl', role: 'Founder', bio: 'Founder of the World Zionist Organization and father of modern political Zionism. Austro-Hungarian journalist whose book Der Judenstaat launched the Zionist movement. Died in 1904.' }], connections: [{ name: 'Jewish Agency for Israel', type: 'historical partner', description: 'The WZO helped establish the Jewish Agency.' }] },
  { name: 'Hadassah Medical Organization', id: slug('Hadassah Medical Organization'), type: 'medical organization', category: 'Healthcare & Pharmaceuticals', description: 'The Hadassah Medical Organization operates Israel\'s leading medical center, comprising two hospitals on Mount Scopus and in Ein Kerem, Jerusalem. Founded in 1934, Hadassah performs cutting-edge medical research, trains generations of Israeli physicians, and treats over one million patients annually regardless of religion, ethnicity, or nationality.', website: 'https://www.hadassah-med.com', founded: 1934, individuals: [], connections: [{ name: 'Hadassah (Women\'s Zionist Organization)', type: 'parent organization', description: 'Operated by Hadassah, the Women\'s Zionist Organization of America.' }, { name: 'Hebrew University of Jerusalem', type: 'academic affiliation', description: 'Hadassah Medical Center is affiliated with the Hebrew University Faculty of Medicine.' }] },
];

for (const e of il3) add('Israel', e);

// ============================================================
// HUNGARY
// ============================================================
const hu = [
  { name: 'Dohany Street Synagogue', id: slug('Dohany Street Synagogue'), type: 'synagogue', category: 'Religion & Synagogues', description: 'The Dohany Street Synagogue in Budapest is the largest synagogue in Europe and the second-largest in the world. Built in 1859 in the Moorish Revival style, it seats 3,000 worshippers. The complex includes the Heroes\' Temple, the Raoul Wallenberg Memorial Park (a Holocaust memorial), and the Jewish Museum. Budapest\'s Jewish community of approximately 75,000-100,000 is the largest in Central Europe.', website: '', founded: 1859, individuals: [], connections: [{ name: 'Jewish Museum in Prague', type: 'Central European Jewish heritage', description: 'Both are major Jewish heritage sites in Central Europe.' }] },
  { name: 'Hungarian Jewish Museum and Archives', id: slug('Hungarian Jewish Museum'), type: 'museum', category: 'Heritage & Memorials', description: 'The Hungarian Jewish Museum and Archives, located in the Dohany Street Synagogue complex in Budapest, houses one of the most important Judaica collections in Central Europe. Hungary was home to approximately 825,000 Jews before the Holocaust. The museum documents the rich history of Hungarian Jewry, which produced an extraordinary number of Nobel laureates, scientists, musicians, and intellectuals.', website: '', founded: 1916, individuals: [], connections: [{ name: 'Dohany Street Synagogue', type: 'co-located', description: 'Located in the Dohany Street Synagogue complex.' }] },
];

for (const e of hu) add('Hungary', e);

// ============================================================
// SWEDEN
// ============================================================
const se = [
  { name: 'Jewish Community of Stockholm', id: slug('Jewish Community Stockholm'), type: 'communal organization', category: 'Community & Social Organizations', description: 'The Jewish Community of Stockholm is the largest Jewish community in Scandinavia, numbering approximately 6,000-8,000 members. Sweden is notable for its role in WWII as a neutral country that accepted Jewish refugees, including nearly all of Denmark\'s Jews rescued in 1943. The Swedish diplomat Raoul Wallenberg saved tens of thousands of Hungarian Jews in 1944.', website: '', founded: 1775, individuals: [], connections: [{ name: 'Jewish Community of Helsinki', type: 'Scandinavian peer', description: 'Both represent Jewish communities in Scandinavian countries.' }] },
  { name: 'Bonnier Group', id: slug('Bonnier Group'), type: 'media company', category: 'Entertainment & Media', description: 'The Bonnier Group is one of the largest media companies in Scandinavia, owned by the Bonnier family, which traces Jewish ancestry to Gerhard Bonnier who founded a bookshop in Copenhagen in 1804. The group operates TV channels, newspapers (including Dagens Nyheter), publishing houses, and digital media across Scandinavia and internationally.', website: 'https://www.bonnier.com', founded: 1804, individuals: [], connections: [{ name: 'Axel Springer SE', type: 'European media peer', description: 'Both are major European media companies with significant history.' }] },
];

for (const e of se) add('Sweden', e);

// ============================================================
// LITHUANIA
// ============================================================
const lt = [
  { name: 'Vilna Gaon Jewish State Museum', id: slug('Vilna Gaon Jewish State Museum'), type: 'museum', category: 'Heritage & Memorials', description: 'The Vilna Gaon Jewish State Museum in Vilnius documents the history of Lithuanian Jewry. Lithuania, known as the "Jerusalem of the North," was one of the greatest centers of Jewish learning and culture in Europe for centuries. Before the Holocaust, Lithuania had approximately 220,000 Jews; about 95% were murdered, making it one of the highest death rates in Europe.', website: 'https://www.jmuseum.lt', founded: 1989, individuals: [], connections: [{ name: 'POLIN Museum', type: 'Baltic/Eastern European peer', description: 'Both document the rich Jewish history and the Holocaust in Eastern Europe.' }] },
];

for (const e of lt) add('Lithuania', e);

// ============================================================
// LATVIA
// ============================================================
const lv = [
  { name: 'Riga Ghetto and Latvian Holocaust Museum', id: slug('Riga Ghetto Holocaust Museum'), type: 'museum', category: 'Heritage & Memorials', description: 'The Riga Ghetto and Latvian Holocaust Museum preserves the memory of the approximately 70,000 Latvian Jews murdered during the Holocaust, as well as thousands of Jews deported from other European countries to Latvia. Before WWII, Jews constituted about 5% of Latvia\'s population and were prominent in commerce, the professions, and cultural life.', website: '', founded: 2010, individuals: [], connections: [{ name: 'Vilna Gaon Jewish State Museum', type: 'Baltic peer', description: 'Both document the Jewish history and Holocaust in the Baltic states.' }] },
];

for (const e of lv) add('Latvia', e);

// ============================================================
// ESTONIA
// ============================================================
const ee = [
  { name: 'Jewish Community of Estonia', id: slug('Jewish Community Estonia'), type: 'communal organization', category: 'Community & Social Organizations', description: 'The Jewish Community of Estonia is a small but resilient community of approximately 2,000-3,000 members. Estonia was the first country to be declared "Judenfrei" (free of Jews) by the Nazis in 1942 after nearly all Estonian Jews were killed. After independence from the Soviet Union in 1991, the community was reorganized and today maintains a synagogue and community center in Tallinn.', website: '', founded: 1988, individuals: [], connections: [{ name: 'Riga Ghetto and Latvian Holocaust Museum', type: 'Baltic peer', description: 'Both represent post-Holocaust Jewish communities in the Baltic states.' }] },
];

for (const e of ee) add('Estonia', e);

// ============================================================
// TUNISIA
// ============================================================
const tn = [
  { name: 'El Ghriba Synagogue', id: slug('El Ghriba Synagogue'), type: 'historic synagogue', category: 'Religion & Synagogues', description: 'The El Ghriba Synagogue on the island of Djerba, Tunisia, is one of the oldest synagogues in the world, with traditions claiming it was founded after the destruction of the First Temple in 586 BCE. It houses one of the oldest Torah scrolls in the world. The synagogue is a pilgrimage site for Jews from across North Africa and is a UNESCO-recognized cultural treasure.', website: '', founded: -500, individuals: [], connections: [{ name: 'Paradesi Synagogue', type: 'ancient synagogue peer', description: 'Both are among the world\'s oldest still-functioning synagogues.' }] },
];

for (const e of tn) add('Tunisia', e);

// ============================================================
// IRAN
// ============================================================
const ir = [
  { name: 'Tehran Jewish Committee', id: slug('Tehran Jewish Committee'), type: 'communal organization', category: 'Community & Social Organizations', description: 'The Tehran Jewish Committee represents Iran\'s Jewish community, the largest in the Middle East outside Israel, numbering approximately 8,000-15,000 members. Iran (Persia) has one of the oldest Jewish communities in the world, dating back 2,700 years to the Babylonian exile. Despite political tensions between Iran and Israel, Iranian Jews have a constitutionally guaranteed seat in parliament and maintain synagogues, schools, and communal institutions.', website: '', founded: 1945, individuals: [], connections: [{ name: 'El Ghriba Synagogue', type: 'ancient community peer', description: 'Both represent Jewish communities with ancient roots in the Middle East/North Africa.' }] },
];

for (const e of ir) add('Iran', e);

// ============================================================
// UZBEKISTAN
// ============================================================
const uz = [
  { name: 'Bukharan Jewish Community', id: slug('Bukharan Jewish Community'), type: 'historical community', category: 'Community & Social Organizations', description: 'The Bukharan Jewish community has existed in Central Asia for over 2,000 years. Centered in Bukhara and Samarkand, these Jews maintained a distinct identity with their own language (Bukhori), cuisine, and traditions. Before the fall of the Soviet Union, approximately 45,000 Bukharan Jews lived in Uzbekistan. Most have since emigrated to Israel, the US, and other countries, with only a few thousand remaining.', website: '', founded: -400, individuals: [], connections: [{ name: 'Tehran Jewish Committee', type: 'Silk Road Jewish community', description: 'Both represent ancient Jewish communities along the Silk Road.' }] },
];

for (const e of uz) add('Uzbekistan', e);

// ============================================================
// AZERBAIJAN
// ============================================================
const az = [
  { name: 'Mountain Jews of Azerbaijan', id: slug('Mountain Jews Azerbaijan'), type: 'historical community', category: 'Community & Social Organizations', description: 'The Mountain Jews (Juhuro) of Azerbaijan are one of the oldest Jewish communities in the world, speaking their own language (Juhuri, a Judeo-Tat dialect). Concentrated in the red-brick "Jewish town" of Qirmizi Gasaba (Krasnaya Sloboda) near Quba, they represent the only all-Jewish town outside Israel. Azerbaijan is notable for maintaining good relations with both Israel and Iran, and its approximately 20,000-30,000 Jews enjoy freedom of worship.', website: '', founded: -500, individuals: [], connections: [{ name: 'Bukharan Jewish Community', type: 'Caucasian/Central Asian peer', description: 'Both are ancient Jewish communities in the former Soviet Union region.' }] },
];

for (const e of az) add('Azerbaijan', e);

// ============================================================
// GEORGIA (Country)
// ============================================================
const ge = [
  { name: 'Georgian Jewish Community', id: slug('Georgian Jewish Community'), type: 'historical community', category: 'Community & Social Organizations', description: 'The Georgian Jews are one of the oldest Jewish communities in the world, with a presence in Georgia dating back approximately 2,600 years. Georgian Jews have a unique identity, maintaining Georgian culture while preserving Jewish religious traditions. Before mass emigration to Israel in the 1970s-1990s, approximately 80,000 Jews lived in Georgia. Today approximately 3,000-6,000 remain, with the main synagogue in Tbilisi.', website: '', founded: -600, individuals: [], connections: [{ name: 'Mountain Jews of Azerbaijan', type: 'Caucasian peer', description: 'Both are ancient Jewish communities in the Caucasus region.' }] },
];

for (const e of ge) add('Georgia', e);

// ============================================================
// BAHRAIN
// ============================================================
const bh = [
  { name: 'Jewish Community of Bahrain', id: slug('Jewish Community Bahrain'), type: 'communal organization', category: 'Community & Social Organizations', description: 'Bahrain hosts a small but historic Jewish community, with the last Jewish ambassador to the Kingdom, Houda Nonoo, serving from 2008-2013 as Bahrain\'s ambassador to the US. Bahrain was one of the signatories of the Abraham Accords in 2020. The community maintains a synagogue in Manama and has seen renewed interest following normalization with Israel.', website: '', founded: 1880, individuals: [{ id: slug('Houda Nonoo'), name: 'Houda Nonoo', role: 'Community Leader', bio: 'Jewish Bahraini who served as Bahrain\'s Ambassador to the United States from 2008-2013. First Jewish ambassador from any Arab country.' }], connections: [{ name: 'Jewish Council of the Emirates', type: 'Gulf peer', description: 'Both represent Jewish communities in Gulf states that signed the Abraham Accords.' }] },
];

for (const e of bh) add('Bahrain', e);

// ============================================================
// REBUILD AFFILIATIONS & SORT
// ============================================================
console.log(`Added ${added} new entries`);
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

// Sort entries by prominence
for (const country in data.countries) {
  data.countries[country].sort((a, b) => {
    const scoreA = (a.connections ? a.connections.length : 0) * 3 + (a.individuals ? a.individuals.length : 0) * 2 + (a.description ? a.description.length : 0) / 100;
    const scoreB = (b.connections ? b.connections.length : 0) * 3 + (b.individuals ? b.individuals.length : 0) * 2 + (b.description ? b.description.length : 0) / 100;
    return scoreB - scoreA;
  });
}

// Sort countries by entry count
const sorted = {};
const countryKeys = Object.keys(data.countries).sort((a, b) => data.countries[b].length - data.countries[a].length);
for (const k of countryKeys) sorted[k] = data.countries[k];
data.countries = sorted;

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2));

let totalEntries = 0, totalConns = 0;
const catSet = new Set();
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    totalEntries++;
    if (entry.category) catSet.add(entry.category);
    if (entry.connections) totalConns += entry.connections.length;
  }
}

console.log('\n=== FINAL STATS ===');
console.log(`Entries: ${totalEntries}`);
console.log(`Countries: ${Object.keys(data.countries).length}`);
console.log(`People: ${Object.keys(peopleData.people).length}`);
console.log(`Connections: ${totalConns}`);
console.log(`Categories: ${catSet.size}`);
console.log('Done!');
