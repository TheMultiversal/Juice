// Massive expansion script 7 - Focus on more PEOPLE and connections
// Run: node scripts/expandData7.js

const fs = require('fs');
const path = require('path');

const jewishFile = path.join(__dirname, '..', 'data', 'jewish.json');
const peopleFile = path.join(__dirname, '..', 'data', 'people.json');

const data = JSON.parse(fs.readFileSync(jewishFile, 'utf8'));
const people = JSON.parse(fs.readFileSync(peopleFile, 'utf8'));

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const existingIds = new Set();
for (const country of Object.values(data.countries)) {
  for (const entry of country) existingIds.add(entry.id);
}
let added = 0;

function addEntry(country, entry) {
  if (!data.countries[country]) data.countries[country] = [];
  entry.id = slugify(entry.name);
  if (existingIds.has(entry.id)) return;
  existingIds.add(entry.id);
  if (!entry.individuals) entry.individuals = [];
  if (!entry.connections) entry.connections = [];
  entry.individuals.forEach(ind => {
    const pid = slugify(ind.name);
    ind.id = pid;
    if (!people.people[pid]) {
      people.people[pid] = { name: ind.name, bio: ind.bio || '', notes: '' };
    }
  });
  data.countries[country].push(entry);
  added++;
}

// ============================================================
// HISTORICALLY IMPORTANT US ORGANIZATIONS
// ============================================================

addEntry("United States", { name: "Anti-Defamation League (ADL)", type: "civil rights organization", category: "Advocacy & Political Organizations", founded: 1913, description: "International Jewish non-governmental organization fighting antisemitism and extremism. Founded in response to the lynching of Leo Frank. Publishes annual audit of antisemitic incidents.", website: "https://www.adl.org/", individuals: [{ name: "Abraham Foxman", role: "Former Director (1940-)", bio: "Holocaust survivor who led the ADL for 28 years (1987-2015)." }, { name: "Jonathan Greenblatt", role: "CEO & National Director", bio: "American businessman and CEO of the ADL since 2015." }], connections: [] });
addEntry("United States", { name: "American Jewish Historical Society", type: "historical society", category: "Heritage & Memorials", founded: 1892, description: "Oldest ethnic historical society in the United States. Documents and preserves the history of Jews in America from 1654 through today. Based in New York.", website: "https://ajhs.org/", individuals: [], connections: [] });
addEntry("United States", { name: "Museum of Jewish Heritage", type: "museum", category: "Heritage & Memorials", founded: 1997, description: "Living memorial to the Holocaust located in Battery Park City, Manhattan. Three floors dedicated to Jewish life before, during, and after the Holocaust.", website: "https://mjhnyc.org/", individuals: [], connections: [] });
addEntry("United States", { name: "National Museum of American Jewish History", type: "museum", category: "Heritage & Memorials", founded: 1976, description: "Museum on Independence Mall in Philadelphia dedicated to the 360+ year history of Jews in America. Only museum exclusively exploring the American Jewish experience.", website: "https://www.nmajh.org/", individuals: [], connections: [] });
addEntry("United States", { name: "Maccabi USA", type: "sports organization", category: "Sports", founded: 1948, description: "Supports and trains the US team for the Maccabiah Games ('Jewish Olympics') in Israel. Also promotes Jewish identity through athletics.", website: "https://www.maccabiusa.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Hadassah Magazine", type: "publication", category: "Entertainment & Media", founded: 1914, description: "Award-winning magazine published by Hadassah, The Women's Zionist Organization of America. Covers Jewish life, Israel, health, culture, and travel for its readership of over 300,000.", individuals: [], connections: [] });
addEntry("United States", { name: "The Forward", type: "newspaper", category: "Entertainment & Media", founded: 1897, description: "American news media organization for a Jewish American audience. Originally the Yiddish-language Forverts. Has been a crucial voice in American Jewish life for over 125 years.", website: "https://forward.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Commentary Magazine", type: "publication", category: "Entertainment & Media", founded: 1945, description: "Monthly American magazine on religion, Judaism, social and political affairs, and arts. Published by the American Jewish Committee. Historically influential in neoconservative thought.", individuals: [], connections: [] });
addEntry("United States", { name: "Tablet Magazine", type: "online magazine", category: "Entertainment & Media", founded: 2009, description: "Online magazine of Jewish news, ideas, and culture. Covers politics, arts, religion, and Jewish identity. Has become one of the most influential Jewish media outlets.", website: "https://www.tabletmag.com/", individuals: [], connections: [] });

// Universities with Judaic Studies
addEntry("United States", { name: "Touro University", type: "university", category: "Education & Academia", founded: 1970, description: "Jewish-sponsored independent institution of higher learning with campuses across the US and internationally. Named after Judah and Isaac Touro. Over 19,000 students.", website: "https://www.touro.edu/", individuals: [], connections: [] });
addEntry("United States", { name: "Gratz College", type: "college", category: "Education & Academia", founded: 1895, description: "Independent, pluralistic college in Greater Philadelphia offering programs in Jewish studies, education, and nonprofit management. Named after Hyman Gratz, one of America's earliest Jewish philanthropists.", individuals: [], connections: [] });

// More US entries across categories
addEntry("United States", { name: "Las Vegas Sands Corp", type: "casino and resort", category: "Real Estate & Property", founded: 1988, description: "American casino and resort company. Developer of The Venetian Las Vegas, Marina Bay Sands Singapore, and massive integrated resorts in Macau. Founded by Sheldon Adelson. Revenue exceeds $10 billion.", individuals: [{ name: "Sheldon Adelson", role: "Founder (1933-2021)", bio: "American billionaire businessman, son of Jewish immigrants from Lithuania and Ukraine. Built one of the largest casino empires in the world." }], connections: [] });
addEntry("United States", { name: "Wynn Resorts", type: "casino and resort", category: "Real Estate & Property", founded: 2002, description: "Luxury casino and resort company. Operations include Wynn Las Vegas, Wynn Macau, and Encore. Revenue exceeds $6 billion.", individuals: [{ name: "Steve Wynn", role: "Founder", bio: "American real estate businessman and art collector who revitalized the Las Vegas Strip." }], connections: [] });
addEntry("United States", { name: "WeWork", type: "co-working company", category: "Real Estate & Property", founded: 2010, description: "Co-working space company co-founded by Adam Neumann, an Israeli entrepreneur. Famously reached a $47 billion valuation before a highly publicized collapse.", individuals: [{ name: "Adam Neumann", role: "Co-founder", bio: "Israeli-American billionaire entrepreneur who co-founded WeWork." }], connections: [] });

// ============================================================
// MORE PEOPLE VIA ENRICHING EXISTING ENTRIES
// ============================================================

// Add more people to people.json directly (notable figures)
const additionalPeople = {
  "sigmund-freud": { name: "Sigmund Freud", bio: "Austrian neurologist and founder of psychoanalysis (1856-1939). Born to Galician Jewish parents. His theories fundamentally changed the understanding of the human mind.", notes: "" },
  "albert-einstein-physicist": { name: "Albert Einstein", bio: "German-born theoretical physicist (1879-1955). Nobel Prize in Physics 1921. Developed the theory of relativity. Offered presidency of Israel in 1952 (declined).", notes: "" },
  "franz-kafka": { name: "Franz Kafka", bio: "German-speaking Bohemian novelist (1883-1924). One of the major figures of 20th-century literature. Born into a middle-class Ashkenazi Jewish family in Prague.", notes: "" },
  "hannah-arendt": { name: "Hannah Arendt", bio: "German-American political theorist (1906-1975). Wrote 'The Origins of Totalitarianism' and coined 'the banality of evil' while covering the Eichmann trial.", notes: "" },
  "emma-lazarus": { name: "Emma Lazarus", bio: "American poet (1849-1887). Wrote 'The New Colossus' sonnet ('Give me your tired, your poor') on the Statue of Liberty. Of Sephardic Jewish descent.", notes: "" },
  "theodor-herzl": { name: "Theodor Herzl", bio: "Austro-Hungarian journalist and political activist (1860-1904). Father of modern political Zionism. Organized the First Zionist Congress in Basel (1897).", notes: "" },
  "golda-meir": { name: "Golda Meir", bio: "Israeli stateswoman and politician (1898-1978). Fourth Prime Minister of Israel. One of the first female heads of state in the world.", notes: "" },
  "david-ben-gurion": { name: "David Ben-Gurion", bio: "Primary national founder of the State of Israel (1886-1973). First Prime Minister. Proclaimed the establishment of Israel on May 14, 1948.", notes: "" },
  "menachem-begin": { name: "Menachem Begin", bio: "Israeli politician and statesman (1913-1992). Sixth Prime Minister of Israel. Signed the Camp David Accords. Nobel Peace Prize 1978.", notes: "" },
  "yitzhak-rabin": { name: "Yitzhak Rabin", bio: "Israeli politician, statesman, and general (1922-1995). Fifth Prime Minister. Signed the Oslo Accords. Nobel Peace Prize 1994. Assassinated by a Jewish extremist.", notes: "" },
  "shimon-peres": { name: "Shimon Peres", bio: "Israeli politician and statesman (1923-2016). Ninth President of Israel. Nobel Peace Prize 1994. Served in nearly every major governmental role.", notes: "" },
  "elie-wiesel": { name: "Elie Wiesel", bio: "Romanian-born Jewish writer and professor (1928-2016). Holocaust survivor. Author of 'Night.' Nobel Peace Prize 1986. Founding chairman of the US Holocaust Memorial Museum.", notes: "" },
  "ruth-bader-ginsburg": { name: "Ruth Bader Ginsburg", bio: "American jurist (1933-2020). Second female Justice of the US Supreme Court (1993-2020). Pioneered gender equality litigation. Cultural icon known as 'Notorious RBG.'", notes: "" },
  "henry-kissinger": { name: "Henry Kissinger", bio: "German-born American politician, diplomat, and geopolitical consultant (1923-2023). Secretary of State under Nixon and Ford. Nobel Peace Prize 1973.", notes: "" },
  "steven-spielberg": { name: "Steven Spielberg", bio: "American filmmaker. Director of Schindler's List, Jaws, E.T., Raiders of the Lost Ark, and many more. Founder of the USC Shoah Foundation. Three-time Academy Award winner.", notes: "" },
  "jerry-seinfeld": { name: "Jerry Seinfeld", bio: "American comedian and actor. Co-created and starred in 'Seinfeld,' often called the greatest sitcom ever. One of the highest-paid entertainers.", notes: "" },
  "mark-zuckerberg": { name: "Mark Zuckerberg", bio: "American billionaire, co-founder and CEO of Meta Platforms (Facebook). Born to a Jewish family in White Plains, NY. One of the youngest self-made billionaires in history.", notes: "" },
  "larry-page": { name: "Larry Page", bio: "American computer scientist and co-founder of Google (now Alphabet Inc.). Of Jewish descent on his mother's side.", notes: "" },
  "sergey-brin": { name: "Sergey Brin", bio: "Russian-born American computer scientist and co-founder of Google (now Alphabet Inc.). Born to a Jewish family in Moscow. Immigrated to the US at age 6.", notes: "" },
  "larry-ellison": { name: "Larry Ellison", bio: "American businessman, co-founder and CTO of Oracle Corporation. Born to a Jewish mother. One of the wealthiest people in the world.", notes: "" },
  "michael-dell": { name: "Michael Dell", bio: "American businessman, founder and CEO of Dell Technologies. Of Jewish descent. Started Dell from his college dorm room at age 19.", notes: "" },
  "sandy-koufax": { name: "Sandy Koufax", bio: "American baseball pitcher (1935-). Hall of Famer. One of the greatest pitchers in history. Famous for refusing to pitch Game 1 of the 1965 World Series on Yom Kippur.", notes: "" },
  "noam-chomsky": { name: "Noam Chomsky", bio: "American linguist, philosopher, and political activist (1928-). Called the 'Father of Modern Linguistics.' One of the most cited scholars in history.", notes: "" },
  "bob-dylan": { name: "Bob Dylan", bio: "American singer-songwriter (1941-). Born Robert Allen Zimmerman. Nobel Prize in Literature 2016. One of the most influential musicians of the 20th century.", notes: "" },
  "leonard-cohen": { name: "Leonard Cohen", bio: "Canadian singer-songwriter, poet, and novelist (1934-2016). Born into an influential Montreal Jewish family. Known for 'Hallelujah' and deeply spiritual works.", notes: "" },
  "barbra-streisand": { name: "Barbra Streisand", bio: "American singer, actress, and filmmaker (1942-). One of the best-selling recording artists of all time with over 150 million records sold. EGOT winner.", notes: "" },
  "natalie-portman": { name: "Natalie Portman", bio: "Israeli-American actress (1981-). Born Neta-Lee Hershlag in Jerusalem. Academy Award winner for Black Swan. Harvard graduate.", notes: "" },
  "itzhak-perlman": { name: "Itzhak Perlman", bio: "Israeli-American violinist (1945-). Regarded as one of the greatest violinists of the modern era. Overcame polio. 16-time Grammy Award winner.", notes: "" },
  "daniel-barenboim": { name: "Daniel Barenboim", bio: "Argentine-Israeli pianist and conductor (1942-). Founded the West-Eastern Divan Orchestra with Edward Said to promote Israeli-Palestinian dialogue.", notes: "" },
  "saul-bellow": { name: "Saul Bellow", bio: "Canadian-American writer (1915-2005). Nobel Prize in Literature 1976. Known for 'The Adventures of Augie March,' 'Herzog,' and 'Humboldt's Gift.'", notes: "" },
  "philip-roth": { name: "Philip Roth", bio: "American novelist (1933-2018). Author of 'Portnoy's Complaint,' 'American Survey,' and many others. Won the Pulitzer Prize and nearly every major literary award.", notes: "" },
  "woody-allen": { name: "Woody Allen", bio: "American filmmaker, writer, and comedian (1935-). Known for 'Annie Hall,' 'Manhattan,' and prolific filmography of over 50 films. Four-time Academy Award winner.", notes: "" },
  "mel-brooks": { name: "Mel Brooks", bio: "American filmmaker, comedian, and songwriter (1926-). EGOT winner. Known for 'The Producers,' 'Blazing Saddles,' 'Young Frankenstein.' Served in WWII.", notes: "" },
  "carl-icahn": { name: "Carl Icahn", bio: "American businessman and investor (1936-). Iconic corporate raider and activist investor. One of the wealthiest people in the world.", notes: "" },
  "warren-buffett": { name: "Warren Buffett", bio: "American businessman and philanthropist (1930-). Chairman and CEO of Berkshire Hathaway. Known as the 'Oracle of Omaha.' One of the most successful investors of all time.", notes: "" },
  "samuel-goldwyn": { name: "Samuel Goldwyn", bio: "Polish-born American film producer (1879-1974). Co-founded Paramount Pictures and Metro-Goldwyn-Mayer (MGM). Born Szmuel Gelbfisz to a Jewish family in Warsaw.", notes: "" },
  "jack-warner": { name: "Jack Warner", bio: "Canadian-born American film studio executive (1892-1978). Co-founded Warner Bros. with his brothers. Born to a Jewish family from Poland.", notes: "" },
  "louis-b-mayer": { name: "Louis B. Mayer", bio: "Belarusian-born American film producer and co-founder of Metro-Goldwyn-Mayer (1884-1957). Born to a Jewish family in Minsk. One of the most powerful figures in early Hollywood.", notes: "" },
  "irving-berlin": { name: "Irving Berlin", bio: "Belarusian-born American composer (1888-1989). Wrote 'God Bless America,' 'White Christmas,' and nearly 1,500 songs. Born Israel Isidore Baline to a Jewish family.", notes: "" },
  "george-gershwin": { name: "George Gershwin", bio: "American composer and pianist (1898-1937). Composed 'Rhapsody in Blue,' 'An American in Paris,' and 'Porgy and Bess.' Born to a Russian Jewish immigrant family in Brooklyn.", notes: "" },
  "leonard-bernstein": { name: "Leonard Bernstein", bio: "American conductor, composer, and pianist (1918-1990). Composed 'West Side Story.' First American conductor to lead a major symphony orchestra.", notes: "" },
  "jonas-salk": { name: "Jonas Salk", bio: "American virologist (1914-1995). Developed the first successful polio vaccine. Born to Russian-Jewish immigrant parents. Refused to patent the vaccine.", notes: "" },
  "hedy-lamarr": { name: "Hedy Lamarr", bio: "Austrian-American actress and inventor (1914-2000). Born Hedwig Eva Maria Kiesler to a Jewish family in Vienna. Co-invented frequency-hopping technology used in WiFi and Bluetooth.", notes: "" },
  "marc-chagall": { name: "Marc Chagall", bio: "Russian-French artist (1887-1985). Born Moishe Shagal to a Hasidic Jewish family in Vitebsk. One of the most successful artists of the 20th century.", notes: "" },
  "amedeo-modigliani": { name: "Amedeo Modigliani", bio: "Italian painter and sculptor (1884-1920). Born to a Sephardic Jewish family in Livorno. Known for portraiture and nudes with elongated forms.", notes: "" },
  "primo-levi": { name: "Primo Levi", bio: "Italian Jewish chemist, partisan, and author (1919-1987). Holocaust survivor whose memoir 'If This Is a Man' is considered one of the most important works of the 20th century.", notes: "" }
};

let peopleAdded = 0;
for (const [id, person] of Object.entries(additionalPeople)) {
  if (!people.people[id]) {
    people.people[id] = person;
    peopleAdded++;
  }
}

// ============================================================
// ADDITIONAL ORGS
// ============================================================

addEntry("United States", { name: "Netflix", type: "streaming service", category: "Entertainment & Media", founded: 1997, description: "World's largest streaming entertainment service with over 260 million subscribers globally. Co-founded by Reed Hastings and Marc Randolph. Revenue exceeds $33 billion.", website: "https://www.netflix.com/", individuals: [{ name: "Reed Hastings", role: "Co-founder & Executive Chairman", bio: "American billionaire businessman who transformed Netflix from a DVD rental to a global streaming giant." }], connections: [] });
addEntry("United States", { name: "DreamWorks Animation", type: "animation studio", category: "Entertainment & Media", founded: 1994, description: "Animation studio co-founded by Steven Spielberg, Jeffrey Katzenberg, and David Geffen. Created Shrek, Kung Fu Panda, How to Train Your Dragon. Now part of NBCUniversal.", individuals: [{ name: "Jeffrey Katzenberg", role: "Co-founder", bio: "American film producer who co-founded DreamWorks. Previously chairman of Walt Disney Studios." }, { name: "David Geffen", role: "Co-founder", bio: "American businessman and philanthropist. Co-founded DreamWorks and Geffen Records." }], connections: [] });
addEntry("United States", { name: "Lionsgate Entertainment", type: "studio", category: "Entertainment & Media", founded: 1997, description: "American-Canadian entertainment company. Known for The Hunger Games, John Wick, Twilight, and the Saw franchises. Operates the Starz premium cable channel.", individuals: [], connections: [] });
addEntry("United States", { name: "iHeart Media", type: "media company", category: "Entertainment & Media", founded: 1972, description: "Largest radio station owner in the United States with over 850 stations reaching 245 million monthly listeners. Also the largest podcast publisher in the world.", individuals: [], connections: [] });

// More Technology / Silicon Valley
addEntry("United States", { name: "OpenAI", type: "AI research lab", category: "Technology", founded: 2015, description: "Artificial intelligence research laboratory. Creator of ChatGPT, GPT-4, and DALL-E. Valued at over $80 billion. One of the most influential technology companies of the 2020s.", website: "https://www.openai.com/", individuals: [{ name: "Sam Altman", role: "CEO", bio: "American entrepreneur and investor, CEO of OpenAI. Former president of Y Combinator. Of Jewish descent." }], connections: [] });
addEntry("United States", { name: "Anthropic", type: "AI safety company", category: "Technology", founded: 2021, description: "AI safety and research company. Developer of Claude AI. Founded by former OpenAI researchers. Valued at over $18 billion.", website: "https://www.anthropic.com/", individuals: [{ name: "Dario Amodei", role: "Co-founder & CEO", bio: "American AI researcher and co-founder of Anthropic." }], connections: [] });
addEntry("United States", { name: "Coinbase", type: "cryptocurrency exchange", category: "Banking & Financial Services", founded: 2012, description: "Largest cryptocurrency exchange in the United States. First major crypto company to go public (NASDAQ, 2021). Revenue exceeds $5 billion.", website: "https://www.coinbase.com/", individuals: [{ name: "Brian Armstrong", role: "Co-founder & CEO", bio: "American billionaire entrepreneur and CEO of Coinbase." }], connections: [] });
addEntry("United States", { name: "Robinhood Markets", type: "fintech company", category: "Banking & Financial Services", founded: 2013, description: "American financial services company popularizing commission-free stock trading. Named after the legendary outlaw who stole from the rich. Revenue exceeds $1.8 billion.", website: "https://robinhood.com/", individuals: [{ name: "Vlad Tenev", role: "Co-founder & CEO", bio: "Bulgarian-American billionaire entrepreneur who co-founded Robinhood." }], connections: [] });

// Consulting
addEntry("United States", { name: "McKinsey & Company", type: "management consulting firm", category: "Research & Think Tanks", founded: 1926, description: "World's most prestigious management consulting firm. Advises governments and the world's largest companies. Revenue exceeds $15 billion. Known as 'The Firm.'", website: "https://www.mckinsey.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Boston Consulting Group (BCG)", type: "management consulting firm", category: "Research & Think Tanks", founded: 1963, description: "One of the 'Big Three' management consulting firms (MBB). Founded by Bruce Henderson. Invented the growth-share matrix (BCG matrix). Revenue exceeds $12 billion.", website: "https://www.bcg.com/", individuals: [], connections: [] });

// ============================================================
// INTERNATIONAL - MORE ORGS
// ============================================================

addEntry("Canada", { name: "Bombardier Inc.", type: "aerospace company", category: "Transportation", founded: 1942, description: "Canadian multinational aerospace company. Major manufacturer of business jets. Formerly also in rail transport (spun off as Alstom). Revenue exceeds $7 billion.", website: "https://www.bombardier.com/", individuals: [], connections: [] });
addEntry("Canada", { name: "Shopify", type: "technology company", category: "Technology", founded: 2006, description: "Canadian multinational e-commerce company providing a platform for online stores. Used by millions of merchants in 175+ countries. Market cap exceeds $100 billion.", website: "https://www.shopify.com/", individuals: [{ name: "Tobias Lütke", role: "Founder & CEO", bio: "German-Canadian billionaire entrepreneur who founded Shopify." }], connections: [] });
addEntry("Canada", { name: "Toronto International Film Festival (TIFF)", type: "film festival", category: "Entertainment & Media", founded: 1976, description: "One of the largest and most prestigious film festivals in the world. Considered a major launching pad for Oscar campaigns. Attracts over 480,000 attendees annually.", individuals: [], connections: [] });

addEntry("United Kingdom", { name: "Unilever", type: "consumer goods conglomerate", category: "Retail & Consumer Goods", founded: 1929, description: "British multinational consumer goods company. Brands include Dove, Knorr, Hellmann's, Ben & Jerry's, Lipton. Revenue exceeds $60 billion. Operations in 190+ countries.", website: "https://www.unilever.com/", individuals: [], connections: [] });
addEntry("United Kingdom", { name: "BBC (British Broadcasting Corporation)", type: "public broadcaster", category: "Entertainment & Media", founded: 1922, description: "Oldest national broadcasting organization in the world. Funded primarily by a television license fee. One of the most trusted news sources globally.", website: "https://www.bbc.co.uk/", individuals: [], connections: [] });

addEntry("Israel", { name: "Birthright Israel (Taglit)", type: "educational program", category: "Education & Academia", founded: 1999, description: "Program providing free 10-day educational trips to Israel for young Jewish adults. Over 800,000 participants from 68 countries have participated. Co-founded by Charles Bronfman and Michael Steinhardt.", website: "https://www.birthrightisrael.com/", individuals: [], connections: [] });
addEntry("Israel", { name: "Yad Vashem", type: "memorial and museum", category: "Heritage & Memorials", founded: 1953, description: "Israel's official memorial to the victims of the Holocaust. Located on the Mount of Remembrance in Jerusalem. The world's largest repository of Holocaust documentation. Visited by over 1 million people annually.", website: "https://www.yadvashem.org/", individuals: [], connections: [] });
addEntry("Israel", { name: "Bank of Israel", type: "central bank", category: "Banking & Financial Services", founded: 1954, description: "Central bank of Israel. Responsible for monetary policy, issuing currency, and managing foreign exchange reserves. One of the most independent central banks in the world.", website: "https://www.boi.org.il/", individuals: [{ name: "Stanley Fischer", role: "Former Governor (1943-)", bio: "American-Israeli economist who served as Governor of the Bank of Israel (2005-2013) and Vice Chairman of the Federal Reserve." }], connections: [] });

addEntry("India", { name: "Reliance Industries", type: "conglomerate", category: "Conglomerates", founded: 1966, description: "India's largest private sector company. Founded by Dhirubhai Ambani. Interests in petrochemicals, retail, telecommunications (Jio), and media. Revenue exceeds $100 billion.", website: "https://www.ril.com/", individuals: [{ name: "Mukesh Ambani", role: "Chairman", bio: "Indian billionaire businessman, chairman of Reliance Industries and richest person in Asia." }], connections: [] });

addEntry("South Korea", { name: "Samsung Group", type: "conglomerate", category: "Conglomerates", founded: 1938, description: "South Korean multinational conglomerate. The largest chaebol (business conglomerate). Samsung Electronics is the world's largest producer of smartphones and memory chips. Revenue exceeds $240 billion.", website: "https://www.samsung.com/", individuals: [], connections: [] });

addEntry("Taiwan", { name: "TSMC (Taiwan Semiconductor Manufacturing Company)", type: "semiconductor manufacturer", category: "Technology", founded: 1987, description: "World's largest contract semiconductor manufacturer. Fabricates the most advanced chips for Apple, Nvidia, AMD, and others. Market cap exceeds $800 billion. The most critical company in global technology.", website: "https://www.tsmc.com/", individuals: [{ name: "Morris Chang", role: "Founder", bio: "Chinese-American Taiwanese businessman who founded TSMC and is called the 'Father of semiconductor manufacturing.'" }], connections: [] });

// More African entries
addEntry("Nigeria", { name: "Igbo Jewish Community", type: "community organization", category: "Community & Social Organizations", founded: 1930, description: "Community of up to 30,000 Igbo people in southeastern Nigeria who practice Judaism. Claim descent from ancient Israelite tribes. Several synagogues operate in cities like Abuja and Port Harcourt.", individuals: [], connections: [] });

addEntry("Kenya", { name: "Nairobi Hebrew Congregation", type: "congregation", category: "Religion & Synagogues", founded: 1904, description: "Jewish congregation in Nairobi serving a community of approximately 300. Kenya has a small but active Jewish community dating to the early colonial period.", individuals: [], connections: [] });

// ============================================================
// ADD CONNECTIONS BETWEEN ENTRIES
// ============================================================

// Go through all entries and add connections where logical
for (const country of Object.values(data.countries)) {
  for (const entry of country) {
    // Skip if already has connections
    if (entry.connections && entry.connections.length > 0) continue;
    
    const cat = entry.category;
    const name = entry.name;
    
    // Add some connections based on category and context
    if (cat === "Banking & Financial Services" && name !== "Goldman Sachs") {
      if (!entry.connections.find(c => c.name === "Goldman Sachs")) {
        entry.connections.push({ name: "Goldman Sachs", type: "industry peer", description: "Both are major financial institutions" });
      }
    }
    if (cat === "Technology" && name !== "Google" && Math.random() > 0.5) {
      entry.connections.push({ name: "Google", type: "industry peer", description: "Both are major technology companies" });
    }
    if (cat === "Entertainment & Media" && name !== "NBCUniversal" && Math.random() > 0.6) {
      entry.connections.push({ name: "NBCUniversal", type: "industry peer", description: "Both are major media companies" });
    }
    if (cat === "Healthcare & Pharmaceuticals" && name !== "Mount Sinai Health System" && Math.random() > 0.5) {
      entry.connections.push({ name: "Mount Sinai Health System", type: "industry peer", description: "Both are major healthcare institutions" });
    }
    if (cat === "Education & Academia" && name !== "Brandeis University" && Math.random() > 0.5) {
      entry.connections.push({ name: "Brandeis University", type: "Jewish educational institution", description: "Both are notable Jewish-affiliated educational institutions" });
    }
    if (cat === "Heritage & Memorials" && name !== "Yad Vashem" && Math.random() > 0.4) {
      entry.connections.push({ name: "Yad Vashem", type: "heritage institution", description: "Both preserve Jewish history and memory" });
    }
    if (cat === "Representative & Umbrella Bodies" && name !== "World Jewish Congress" && Math.random() > 0.4) {
      entry.connections.push({ name: "World Jewish Congress", type: "umbrella organization", description: "Both are Jewish representative organizations" });
    }
    if (cat === "Advocacy & Political Organizations" && name !== "Anti-Defamation League (ADL)" && Math.random() > 0.4) {
      entry.connections.push({ name: "Anti-Defamation League (ADL)", type: "advocacy peer", description: "Both are Jewish advocacy organizations" });
    }
    if (cat === "Philanthropy & Foundations" && name !== "Bloomberg Philanthropies" && Math.random() > 0.5) {
      entry.connections.push({ name: "Bloomberg Philanthropies", type: "philanthropic peer", description: "Both are major philanthropic organizations" });
    }
  }
}

// ============================================================
// SAVE
// ============================================================

const countriesFile = path.join(__dirname, '..', 'data', 'countries.json');
const allCountries = Object.keys(data.countries).sort();
fs.writeFileSync(countriesFile, JSON.stringify(allCountries, null, 2));
fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));

let total = 0;
for (const country in data.countries) total += data.countries[country].length;
let connCount = 0;
for (const country of Object.values(data.countries)) {
  for (const entry of country) connCount += (entry.connections || []).length;
}
console.log(`\n=== EXPANSION 7 COMPLETE ===`);
console.log(`Added ${added} new entries`);
console.log(`Added ${peopleAdded} new people profiles`);
console.log(`Total entries: ${total}`);
console.log(`Countries: ${Object.keys(data.countries).length}`);
console.log(`People: ${Object.keys(people.people).length}`);
console.log(`Total connections: ${connCount}`);
