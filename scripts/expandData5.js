// Massive expansion script 5 - More profiles, more people, more coverage
// Run: node scripts/expandData5.js

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
// UNITED STATES - Even more entries
// ============================================================

// Advocacy & Political
addEntry("United States", { name: "AIPAC", type: "lobbying org", category: "Advocacy & Political Organizations", founded: 1963, description: "America's pro-Israel lobby. America Israel Public Affairs Committee advocates for a strong US-Israel relationship.", website: "https://www.aipac.org/", individuals: [], connections: [] });
addEntry("United States", { name: "Republican Jewish Coalition", type: "political organization", category: "Advocacy & Political Organizations", founded: 1985, description: "Organization promoting Jewish involvement in the Republican Party. Advocates for strong US-Israel relations and conservative principles.", website: "https://www.rjchq.org/", individuals: [], connections: [] });
addEntry("United States", { name: "National Jewish Democratic Council", type: "political organization", category: "Advocacy & Political Organizations", founded: 1990, description: "Organization that encouraged Jewish participation in the Democratic Party. Promoted domestic policy and support for Israel.", individuals: [], connections: [] });
addEntry("United States", { name: "The Israel Project", type: "advocacy organization", category: "Advocacy & Political Organizations", founded: 2003, description: "American nonprofit media advocacy organization. Provided journalists and leaders with information about Israel and the Middle East.", individuals: [], connections: [] });
addEntry("United States", { name: "StandWithUs", type: "advocacy organization", category: "Advocacy & Political Organizations", founded: 2001, description: "Israel education organization combating antisemitism and delegitimization of Israel on campuses and in the media.", website: "https://www.standwithus.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Americans for Peace Now", type: "advocacy organization", category: "Advocacy & Political Organizations", founded: 1981, description: "Progressive American Zionist organization advocating for a two-state solution to the Israeli-Palestinian conflict.", website: "https://peacenow.org/", individuals: [], connections: [] });

// More Education
addEntry("United States", { name: "Yeshiva University", type: "university", category: "Education & Academia", founded: 1886, description: "Private Orthodox Jewish university in New York. Oldest institution of higher learning in the US combining Jewish scholarship with Western knowledge. Includes Albert Einstein College of Medicine.", website: "https://www.yu.edu/", individuals: [], connections: [] });
addEntry("United States", { name: "Jewish Theological Seminary", type: "seminary", category: "Education & Academia", founded: 1887, description: "Academic institution and rabbinical seminary of Conservative Judaism. Located in Manhattan. Houses one of the world's great Judaica libraries.", website: "https://www.jtsa.edu/", individuals: [], connections: [] });
addEntry("United States", { name: "Hebrew Union College", type: "seminary", category: "Education & Academia", founded: 1875, description: "Reform Jewish seminary and university with campuses in Cincinnati, New York, Los Angeles, and Jerusalem. Founded by Rabbi Isaac Mayer Wise. Oldest institution of higher Jewish learning in the Americas.", website: "https://huc.edu/", individuals: [{ name: "Isaac Mayer Wise", role: "Founder (1819-1900)", bio: "Bohemian-born rabbi considered the founder of American Reform Judaism." }], connections: [] });

// More Community
addEntry("United States", { name: "Hadassah, The Women's Zionist Organization of America", type: "women's organization", category: "Community & Social Organizations", founded: 1912, description: "Largest Jewish women's organization in the US with 300,000 members. Founded by Henrietta Szold. Supports Hadassah Medical Center in Jerusalem.", website: "https://www.hadassah.org/", individuals: [{ name: "Henrietta Szold", role: "Founder (1860-1945)", bio: "American Jewish Zionist leader, founder of Hadassah. Also organized the rescue of thousands of children from Nazi-occupied Europe." }], connections: [] });
addEntry("United States", { name: "ORT America", type: "educational organization", category: "Education & Academia", founded: 1922, description: "American affiliate of World ORT, providing cutting-edge STEM education and training. Supports schools and programs in Israel, the FSU, Latin America, and Africa.", website: "https://www.ortamerica.org/", individuals: [], connections: [] });
addEntry("United States", { name: "National Council of Jewish Women (NCJW)", type: "women's organization", category: "Community & Social Organizations", founded: 1893, description: "Grassroots organization of volunteers and advocates dedicated to social justice. Founded by Hannah Greenbaum Solomon. 90,000 members across 200 US communities.", individuals: [{ name: "Hannah Greenbaum Solomon", role: "Founder (1858-1942)", bio: "Social activist who founded the National Council of Jewish Women at the 1893 World's Fair." }], connections: [] });

// More Healthcare / Pharma
addEntry("United States", { name: "Pfizer", type: "pharmaceutical company", category: "Healthcare & Pharmaceuticals", founded: 1849, description: "One of the world's largest pharmaceutical companies. Co-founded by Charles Pfizer, a German-American chemist. Known for developing one of the leading COVID-19 mRNA vaccines with BioNTech. Revenue exceeds $58 billion.", website: "https://www.pfizer.com/", individuals: [{ name: "Albert Bourla", role: "CEO", bio: "Greek-American veterinarian and CEO of Pfizer. Led the company's COVID-19 vaccine development. Of Sephardic Jewish descent." }], connections: [] });
addEntry("United States", { name: "Moderna", type: "biotechnology company", category: "Healthcare & Pharmaceuticals", founded: 2010, description: "Biotechnology company pioneering mRNA therapeutics and vaccines. Market cap exceeds $50 billion after developing one of the primary COVID-19 vaccines.", website: "https://www.modernatx.com/", individuals: [{ name: "Stéphane Bancel", role: "CEO", bio: "French businessman and CEO of Moderna." }], connections: [] });
addEntry("United States", { name: "Johnson & Johnson", type: "pharmaceutical company", category: "Healthcare & Pharmaceuticals", founded: 1886, description: "American multinational medical devices, pharmaceutical, and consumer goods company. One of the world's most valuable companies. Revenue exceeds $85 billion.", website: "https://www.jnj.com/", individuals: [], connections: [] });
addEntry("United States", { name: "AbbVie", type: "pharmaceutical company", category: "Healthcare & Pharmaceuticals", founded: 2013, description: "American pharmaceutical company. Maker of Humira, the world's best-selling prescription drug. Spun off from Abbott Laboratories. Revenue exceeds $58 billion.", website: "https://www.abbvie.com/", individuals: [], connections: [] });

// More Technology
addEntry("United States", { name: "Broadcom", type: "technology company", category: "Technology", founded: 1961, description: "American designer, developer, manufacturer and global supplier of semiconductor and infrastructure software. Revenue exceeds $35 billion. Market cap exceeds $600 billion.", website: "https://www.broadcom.com/", individuals: [{ name: "Hock Tan", role: "CEO", bio: "Malaysian-American businessman and CEO of Broadcom." }], connections: [] });
addEntry("United States", { name: "Qualcomm", type: "technology company", category: "Technology", founded: 1985, description: "American multinational corporation creating semiconductors, software, and services for wireless technology. Dominates the mobile processor market.", website: "https://www.qualcomm.com/", individuals: [{ name: "Irwin Jacobs", role: "Co-founder", bio: "American electrical engineer, co-founder of Qualcomm and Linkabit." }], connections: [] });
addEntry("United States", { name: "Palantir Technologies", type: "technology company", category: "Technology", founded: 2003, description: "Software company specializing in big data analytics. Founded by Peter Thiel and others. Major contracts with US intelligence agencies and military. Named after the palantíri in Lord of the Rings.", website: "https://www.palantir.com/", individuals: [{ name: "Peter Thiel", role: "Co-founder", bio: "German-American billionaire entrepreneur, co-founder of PayPal and Palantir." }, { name: "Alex Karp", role: "CEO", bio: "American billionaire, CEO of Palantir Technologies." }], connections: [] });
addEntry("United States", { name: "Uber Technologies", type: "technology company", category: "Technology", founded: 2009, description: "American multinational ride-hailing and delivery company. Operates in 72 countries. One of the largest companies in the gig economy.", website: "https://www.uber.com/", individuals: [{ name: "Travis Kalanick", role: "Co-founder", bio: "American entrepreneur, co-founder of Uber." }], connections: [] });
addEntry("United States", { name: "Airbnb", type: "technology company", category: "Technology", founded: 2008, description: "American company that operates an online marketplace for lodging, primarily homestays. Over 7 million listings worldwide. Market cap exceeds $80 billion.", website: "https://www.airbnb.com/", individuals: [{ name: "Brian Chesky", role: "Co-founder & CEO", bio: "American billionaire and co-founder of Airbnb." }], connections: [] });

// More Real Estate
addEntry("United States", { name: "Kushner Companies", type: "real estate", category: "Real Estate & Property", founded: 1985, description: "Real estate firm founded by Charles Kushner. Owns and manages over 20,000 apartments and millions of square feet of commercial space. Based in New York City.", individuals: [{ name: "Charles Kushner", role: "Founder", bio: "American real estate developer and founder of Kushner Companies." }, { name: "Jared Kushner", role: "Former Principal", bio: "American businessman, former Senior Advisor to President Trump and principal at Kushner Companies." }], connections: [] });
addEntry("United States", { name: "LeFrak Organization", type: "real estate", category: "Real Estate & Property", founded: 1901, description: "One of America's largest privately held real estate companies, owned by the LeFrak family. Developer of Newport, a massive mixed-use community in Jersey City.", individuals: [{ name: "Richard LeFrak", role: "Chairman & CEO", bio: "American billionaire real estate developer." }], connections: [] });
addEntry("United States", { name: "Tishman Speyer", type: "real estate", category: "Real Estate & Property", founded: 1978, description: "One of the largest real estate developers and operators. Portfolio includes Rockefeller Center, Yankee Stadium, and properties across 31 countries.", individuals: [{ name: "Jerry Speyer", role: "Co-founder", bio: "American billionaire real estate developer, former chairman of the Museum of Modern Art." }], connections: [] });
addEntry("United States", { name: "Related Companies", type: "real estate", category: "Real Estate & Property", founded: 1972, description: "Major American real estate firm based in New York. Developer of Hudson Yards, the largest private real estate development in US history ($25 billion).", individuals: [{ name: "Stephen Ross", role: "Founder & Chairman", bio: "American billionaire real estate developer and owner of the Miami Dolphins." }], connections: [] });

// Retail & Consumer
addEntry("United States", { name: "Costco Wholesale", type: "retail company", category: "Retail & Consumer Goods", founded: 1983, description: "American multinational corporation operating a chain of membership-only big-box warehouse stores. Third-largest retailer in the world. Revenue exceeds $230 billion.", website: "https://www.costco.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Home Depot", type: "retail company", category: "Retail & Consumer Goods", founded: 1978, description: "Largest home improvement retailer in the United States. Over 2,300 stores across North America. Revenue exceeds $157 billion.", website: "https://www.homedepot.com/", individuals: [{ name: "Bernie Marcus", role: "Co-founder", bio: "American billionaire businessman and philanthropist who co-founded The Home Depot." }, { name: "Arthur Blank", role: "Co-founder", bio: "American billionaire businessman, co-founder of The Home Depot and owner of the Atlanta Falcons." }], connections: [] });
addEntry("United States", { name: "Nordstrom", type: "retail company", category: "Retail & Consumer Goods", founded: 1901, description: "American luxury department store chain. Founded by John W. Nordstrom, a Swedish immigrant, and Carl F. Wallin. Operates over 350 stores.", website: "https://www.nordstrom.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Bed Bath & Beyond", type: "retail company", category: "Retail & Consumer Goods", founded: 1971, description: "American chain of domestic merchandise retail stores. Co-founded by Warren Eisenberg and Leonard Feinstein, both Jewish. At its peak had over 1,000 stores.", individuals: [{ name: "Warren Eisenberg", role: "Co-founder", bio: "American businessman who co-founded Bed Bath & Beyond." }, { name: "Leonard Feinstein", role: "Co-founder", bio: "American businessman who co-founded Bed Bath & Beyond." }], connections: [] });

// More Advertising & PR
addEntry("United States", { name: "Interpublic Group (IPG)", type: "advertising company", category: "Advertising & PR", founded: 1930, description: "One of the 'Big Four' advertising holding companies in the world. Subsidiaries include McCann, FCB, MullenLowe. Revenue exceeds $10 billion.", website: "https://www.interpublic.com/", individuals: [], connections: [] });
addEntry("United States", { name: "Edelman", type: "public relations firm", category: "Advertising & PR", founded: 1952, description: "Largest public relations firm in the world by revenue. Founded by Daniel Edelman. Family-owned with over 6,000 employees across 60+ offices.", website: "https://www.edelman.com/", individuals: [{ name: "Daniel Edelman", role: "Founder (1920-2013)", bio: "American public relations pioneer who founded what became the world's largest PR firm." }], connections: [] });
addEntry("United States", { name: "WPP plc (US Operations)", type: "advertising company", category: "Advertising & PR", founded: 1971, description: "World's largest advertising company by revenue with major US operations including GroupM, Ogilvy, VMLY&R, and Grey. Headquartered in London.", individuals: [], connections: [] });

// ============================================================
// MORE FRANCE
// ============================================================

addEntry("France", { name: "Groupe Bolloré", type: "conglomerate", category: "Conglomerates", founded: 1822, description: "French industrial group with interests in transportation, logistics, communications, and media. Controlled by Vincent Bolloré. Owns Vivendi, Canal+, Havas.", website: "https://www.bollore.com/", individuals: [{ name: "Vincent Bolloré", role: "Chairman", bio: "French billionaire businessman controlling the Bolloré Group." }], connections: [] });
addEntry("France", { name: "Dassault Group", type: "industrial conglomerate", category: "Defense & Security", founded: 1929, description: "French conglomerate founded by Marcel Dassault (born Marcel Bloch). Major manufacturer of military aircraft (Rafale, Mirage), business jets (Falcon), and software (Dassault Systèmes). Marcel Dassault was a Jewish WWII concentration camp survivor.", individuals: [{ name: "Marcel Dassault", role: "Founder (1892-1986)", bio: "French aviator and industrialist of Jewish descent. Survived Buchenwald concentration camp." }, { name: "Serge Dassault", role: "Former Chairman (1925-2018)", bio: "French businessman and politician, son of Marcel Dassault." }], connections: [] });
addEntry("France", { name: "LVMH", type: "luxury goods conglomerate", category: "Fashion & Luxury", founded: 1987, description: "World's largest luxury goods conglomerate. Brands include Louis Vuitton, Dior, Fendi, Givenchy, Moët & Chandon, Dom Pérignon, Hennessy, Tiffany & Co., Sephora. Revenue exceeds $86 billion.", website: "https://www.lvmh.com/", individuals: [{ name: "Bernard Arnault", role: "Chairman & CEO", bio: "French billionaire, chairman and CEO of LVMH, at various times the world's wealthiest person." }], connections: [] });
addEntry("France", { name: "Kering", type: "luxury goods conglomerate", category: "Fashion & Luxury", founded: 1963, description: "French luxury group. Brands include Gucci, Saint Laurent, Balenciaga, Bottega Veneta, and Alexander McQueen. Revenue exceeds $20 billion.", website: "https://www.kering.com/", individuals: [{ name: "François-Henri Pinault", role: "Chairman & CEO", bio: "French billionaire businessman controlling Kering and Artémis." }], connections: [] });
addEntry("France", { name: "Mémorial de la Shoah", type: "memorial museum", category: "Heritage & Memorials", founded: 2005, description: "France's national Holocaust museum and memorial in Paris. Documents the persecution of Jews by the Vichy regime and the deportation of 76,000 French Jews to death camps.", website: "https://www.memorialdelashoah.org/", individuals: [], connections: [] });
addEntry("France", { name: "Publicis Groupe", type: "advertising company", category: "Advertising & PR", founded: 1926, description: "Third-largest advertising and communications group in the world. Founded by Marcel Bleustein-Blanchet, a French Jew. Revenue exceeds $14 billion.", website: "https://www.publicisgroupe.com/", individuals: [{ name: "Marcel Bleustein-Blanchet", role: "Founder (1906-1996)", bio: "French advertising pioneer of Jewish descent who founded Publicis in 1926." }], connections: [] });
addEntry("France", { name: "BNP Paribas", type: "bank", category: "Banking & Financial Services", founded: 1848, description: "Largest bank in the Eurozone by assets and one of the largest banks in the world. Assets exceed $2.7 trillion. Operates in 68 countries.", website: "https://www.bnpparibas.com/", individuals: [], connections: [] });
addEntry("France", { name: "Société Générale", type: "bank", category: "Banking & Financial Services", founded: 1864, description: "One of the leading European financial services groups. Assets exceed $1.5 trillion. One of the oldest banks in France.", website: "https://www.societegenerale.com/", individuals: [], connections: [] });

// ============================================================
// MORE GERMANY
// ============================================================

addEntry("Germany", { name: "Jewish Museum Frankfurt", type: "museum", category: "Heritage & Memorials", founded: 1988, description: "Museum documenting the history and culture of Jews in Frankfurt, one of the most important Jewish communities in Germany. Located in the Rothschild Palace.", individuals: [], connections: [] });
addEntry("Germany", { name: "Central Council of Jews in Germany", type: "representative body", category: "Representative & Umbrella Bodies", founded: 1950, description: "Umbrella organization representing all Jewish communities in Germany. Approximately 100,000 members in over 100 communities. The majority are immigrants from the former Soviet Union.", website: "https://www.zentralratderjuden.de/", individuals: [{ name: "Josef Schuster", role: "President", bio: "German physician and president of the Central Council of Jews in Germany since 2014." }], connections: [] });
addEntry("Germany", { name: "Berlinale (Berlin International Film Festival)", type: "film festival", category: "Entertainment & Media", founded: 1951, description: "One of the world's largest and most prestigious film festivals. The Berlinale has been a major platform for political and artistic cinema. Named alongside Cannes and Venice in the 'Big Three' film festivals.", individuals: [], connections: [] });
addEntry("Germany", { name: "Deutsche Bank", type: "bank", category: "Banking & Financial Services", founded: 1870, description: "Germany's largest bank and one of the world's leading financial institutions. Assets exceed $1.4 trillion. Major investment bank.", website: "https://www.db.com/", individuals: [], connections: [] });
addEntry("Germany", { name: "SAP SE", type: "technology company", category: "Technology", founded: 1972, description: "Europe's most valuable technology company. World's largest provider of enterprise application software. Revenue exceeds $30 billion.", website: "https://www.sap.com/", individuals: [], connections: [] });
addEntry("Germany", { name: "Axel Springer SE", type: "media company", category: "Entertainment & Media", founded: 1946, description: "One of the largest publishing houses in Europe. Owns Bild, Die Welt, Politico, Business Insider. Revenue exceeds $3 billion.", website: "https://www.axelspringer.com/", individuals: [{ name: "Mathias Döpfner", role: "CEO", bio: "German journalist and CEO of Axel Springer SE." }], connections: [] });

// ============================================================
// SCANDINAVIAN & NORDIC
// ============================================================

addEntry("Sweden", { name: "Bonnier Group", type: "media conglomerate", category: "Entertainment & Media", founded: 1804, description: "Swedish media group owned by the Bonnier family for eight generations. One of the largest media groups in the Nordic region. Bonnier family is of Jewish descent. Publishes books, newspapers, TV, and digital media.", website: "https://www.bonnier.com/", individuals: [], connections: [] });
addEntry("Sweden", { name: "Great Synagogue of Stockholm", type: "synagogue", category: "Religion & Synagogues", founded: 1870, description: "Historic synagogue in central Stockholm, built in an exotic Moorish style. Serves the Jewish community of approximately 20,000 in Sweden.", individuals: [], connections: [] });
addEntry("Sweden", { name: "IKEA (International Operations)", type: "retail company", category: "Retail & Consumer Goods", founded: 1943, description: "World's largest furniture retailer with over 460 stores in 62 countries. Founded by Ingvar Kamprad. Revenue exceeds $45 billion.", website: "https://www.ikea.com/", individuals: [], connections: [] });

addEntry("Denmark", { name: "Danish Jewish Museum", type: "museum", category: "Heritage & Memorials", founded: 2004, description: "Museum in Copenhagen documenting 400 years of Jewish life in Denmark. Designed by architect Daniel Libeskind. Denmark is celebrated for its rescue of nearly all Danish Jews during WWII.", individuals: [{ name: "Daniel Libeskind", role: "Architect", bio: "Polish-American architect who designed the Danish Jewish Museum and the Jewish Museum Berlin." }], connections: [] });
addEntry("Denmark", { name: "Novo Nordisk", type: "pharmaceutical company", category: "Healthcare & Pharmaceuticals", founded: 1923, description: "Danish multinational pharmaceutical company. World leader in insulin production and diabetes care. Market cap exceeds $500 billion. Manufacturer of Ozempic and Wegovy.", website: "https://www.novonordisk.com/", individuals: [], connections: [] });

addEntry("Norway", { name: "Jewish Museum of Oslo", type: "museum", category: "Heritage & Memorials", founded: 2008, description: "Museum in a former synagogue documenting Jewish life in Norway. Norway's pre-war Jewish community of 2,100 was nearly destroyed — 773 were deported in 1942-43. Today approximately 1,500 Jews live in Norway.", individuals: [], connections: [] });

addEntry("Finland", { name: "Helsinki Synagogue", type: "synagogue", category: "Religion & Synagogues", founded: 1906, description: "Main synagogue of Helsinki. Finland's Jewish population of approximately 1,800 is one of the smallest in Europe. Finnish Jews were unique in fighting alongside Germany in WWII while Finland refused to deport them.", individuals: [], connections: [] });

addEntry("Iceland", { name: "Icelandic Jewish Community", type: "community organization", category: "Community & Social Organizations", founded: 2000, description: "Small Jewish community in Iceland, numbering approximately 100-200. One of the smallest Jewish communities in Europe.", individuals: [], connections: [] });

// ============================================================
// MORE SOUTH AMERICA
// ============================================================

addEntry("Brazil", { name: "Federation of Jewish Communities of Brazil (CONIB)", type: "representative body", category: "Representative & Umbrella Bodies", founded: 1951, description: "Umbrella organization representing the Jewish community of Brazil, the second largest in Latin America at approximately 120,000. Headquarters in São Paulo.", individuals: [], connections: [] });
addEntry("Brazil", { name: "Museu Judaico de São Paulo", type: "museum", category: "Heritage & Memorials", founded: 2021, description: "Jewish museum opened in a former synagogue in São Paulo's Bom Retiro neighborhood. Documents the history of Jewish immigration to Brazil from the colonial period to the present.", individuals: [], connections: [] });
addEntry("Brazil", { name: "Albert Einstein Hospital (Hospital Israelita Albert Einstein)", type: "hospital", category: "Healthcare & Pharmaceuticals", founded: 1971, description: "Premier hospital in São Paulo, consistently ranked the best in Latin America. Founded by the Jewish community. Named after Albert Einstein.", website: "https://www.einstein.br/", individuals: [], connections: [] });

addEntry("Argentina", { name: "DAIA (Delegación de Asociaciones Israelitas Argentinas)", type: "representative body", category: "Representative & Umbrella Bodies", founded: 1935, description: "Political representative body of the Argentine Jewish community, the largest in Latin America at approximately 180,000. Played a key role in seeking justice for the AMIA bombing.", individuals: [], connections: [] });
addEntry("Argentina", { name: "Grupo Clarín", type: "media conglomerate", category: "Entertainment & Media", founded: 1945, description: "Largest media group in Argentina, operating the national newspaper Clarín, television channels, radio stations, and internet services.", individuals: [], connections: [] });
addEntry("Argentina", { name: "Mercado Libre", type: "technology company", category: "Technology", founded: 1999, description: "Argentine e-commerce and fintech company. Largest online marketplace in Latin America. Market cap exceeds $80 billion. Founded by Marcos Galperin.", website: "https://www.mercadolibre.com/", individuals: [{ name: "Marcos Galperin", role: "Founder & CEO", bio: "Argentine-Jewish billionaire, founder and CEO of Mercado Libre." }], connections: [] });

addEntry("Mexico", { name: "Comité Central de la Comunidad Judía de México", type: "representative body", category: "Representative & Umbrella Bodies", founded: 1938, description: "Central committee of the Jewish community of Mexico. Represents approximately 50,000 Jews and coordinates community activities.", individuals: [], connections: [] });
addEntry("Mexico", { name: "Grupo Televisa", type: "media conglomerate", category: "Entertainment & Media", founded: 1973, description: "Major mass media company in Mexico. Largest producer of Spanish-language content in the world. Founded by Emilio Azcárraga Vidaurreta.", individuals: [], connections: [] });

// ============================================================
// AFRICA
// ============================================================

addEntry("South Africa", { name: "South African Jewish Board of Deputies", type: "representative body", category: "Representative & Umbrella Bodies", founded: 1903, description: "Representative body of the South African Jewish community. Approximately 52,000 Jews live in South Africa, mostly in Johannesburg and Cape Town. Community has deep Lithuanian roots.", website: "https://www.sajbd.org/", individuals: [], connections: [] });
addEntry("South Africa", { name: "Naspers", type: "technology and media conglomerate", category: "Technology", founded: 1915, description: "South African multinational internet, technology and media group. Major shareholder of Tencent (China). One of the largest technology investors in the world. Market cap exceeds $30 billion.", website: "https://www.naspers.com/", individuals: [], connections: [] });
addEntry("South Africa", { name: "South African Holocaust and Genocide Foundation", type: "museum and educational organization", category: "Heritage & Memorials", founded: 1999, description: "Foundation operating the Cape Town Holocaust Centre and Durban Holocaust Centre. Among the first Holocaust centers in Africa.", individuals: [], connections: [] });

addEntry("Tunisia", { name: "El Ghriba Synagogue", type: "synagogue", category: "Religion & Synagogues", founded: -586, description: "Oldest synagogue in Africa and one of the oldest in the world, located on the island of Djerba. Annual pilgrimage site for Jews from across North Africa and Europe. Claims to contain stones from Solomon's Temple.", individuals: [], connections: [] });

addEntry("Zambia", { name: "Lusaka Hebrew Congregation", type: "congregation", category: "Religion & Synagogues", founded: 1928, description: "Historic Jewish congregation in Zambia's capital. Jewish presence in Zambia dates to early 20th century. Small community of approximately 50 families remains.", individuals: [], connections: [] });

addEntry("Zimbabwe", { name: "Sephardi Hebrew Congregation of Harare", type: "congregation", category: "Religion & Synagogues", founded: 1894, description: "Historic synagogue in Harare. At its peak in the 1950s-70s, Zimbabwe's Jewish community numbered approximately 7,000. Most emigrated during political upheaval. Approximately 120 Jews remain.", individuals: [], connections: [] });

addEntry("Namibia", { name: "Windhoek Hebrew Congregation", type: "congregation", category: "Religion & Synagogues", founded: 1924, description: "Small Jewish community in Namibia's capital. Jewish presence dates to German colonial period. Approximately 100 Jews live in Namibia today.", individuals: [], connections: [] });

addEntry("Democratic Republic of the Congo", { name: "Jewish Community of Lubumbashi", type: "community organization", category: "Community & Social Organizations", founded: 1910, description: "Historic Jewish community in the Katanga mining region. Sephardic Jews from Rhodes and Ashkenazi Jews settled in the Congo for mining opportunities. Few Jews remain today.", individuals: [], connections: [] });

// ============================================================
// MORE ASIA-PACIFIC
// ============================================================

addEntry("India", { name: "Keneseth Eliyahoo Synagogue", type: "synagogue", category: "Religion & Synagogues", founded: 1884, description: "Synagogue in Mumbai built by Jacob Sassoon of the Sassoon family. One of the finest synagogues in India. Located in the Fort area of Mumbai.", individuals: [{ name: "Jacob Sassoon", role: "Founder (1844-1916)", bio: "Baghdadi Jewish businessman and philanthropist in Bombay." }], connections: [] });
addEntry("India", { name: "Jewish Heritage Centre, Kochi", type: "heritage site", category: "Heritage & Memorials", founded: 1568, description: "Located in Cochin (Kochi), includes the Paradesi Synagogue (1568), the oldest active synagogue in the Commonwealth. The Cochin Jews are one of the oldest Jewish communities in India.", individuals: [], connections: [] });
addEntry("India", { name: "Tata Group", type: "conglomerate", category: "Conglomerates", founded: 1868, description: "India's largest conglomerate with revenues exceeding $150 billion. Includes Tata Steel, TCS, Tata Motors (Jaguar Land Rover), Taj Hotels. Founded by the Tata family (Zoroastrian, not Jewish).", website: "https://www.tata.com/", individuals: [], connections: [] });

addEntry("Philippines", { name: "Temple Emil, Manila", type: "synagogue", category: "Religion & Synagogues", founded: 1983, description: "Synagogue serving the Jewish community in Metro Manila. The Philippine Jewish community includes about 200 people. The Philippines was one of the few countries to accept Jewish refugees during WWII.", individuals: [], connections: [] });

addEntry("New Zealand", { name: "Wellington Hebrew Congregation", type: "congregation", category: "Religion & Synagogues", founded: 1843, description: "Oldest Jewish congregation in New Zealand, established just three years after formal European settlement began. Wellington's Jewish community played a significant role in the city's development.", individuals: [], connections: [] });

addEntry("Australia", { name: "Executive Council of Australian Jewry (ECAJ)", type: "representative body", category: "Representative & Umbrella Bodies", founded: 1944, description: "Peak representative body of the Australian Jewish community (approximately 120,000). Coordinates community activities and represents Jewish interests to government.", website: "https://www.ecaj.org.au/", individuals: [], connections: [] });
addEntry("Australia", { name: "Sydney Jewish Museum", type: "museum", category: "Heritage & Memorials", founded: 1992, description: "Museum in Darlinghurst, Sydney, dedicated to documenting and teaching about the Holocaust. Features survivor testimonies and exhibitions on human rights.", website: "https://sydneyjewishmuseum.com.au/", individuals: [], connections: [] });
addEntry("Australia", { name: "Atlassian", type: "technology company", category: "Technology", founded: 2002, description: "Australian enterprise software company (JIRA, Confluence, Trello, Bitbucket). One of Australia's most valuable tech companies. Market cap exceeds $50 billion.", website: "https://www.atlassian.com/", individuals: [{ name: "Mike Cannon-Brookes", role: "Co-founder & Co-CEO", bio: "Australian billionaire tech entrepreneur." }, { name: "Scott Farquhar", role: "Co-founder", bio: "Australian billionaire tech entrepreneur." }], connections: [] });

// ============================================================
// CARIBBEAN & CENTRAL AMERICA
// ============================================================

addEntry("Jamaica", { name: "Shaare Shalom Synagogue", type: "synagogue", category: "Religion & Synagogues", founded: 1912, description: "Synagogue in Kingston, Jamaica with a sand-covered floor. Jamaica's Jewish history dates to 1530 when Converso families arrived. United Congregation of Israelites is one of the oldest in the Western Hemisphere.", individuals: [], connections: [] });

addEntry("Barbados", { name: "Nidhe Israel Synagogue", type: "synagogue", category: "Religion & Synagogues", founded: 1654, description: "Historic synagogue in Bridgetown, Barbados. One of the oldest synagogues in the Western Hemisphere. Sephardic Jews played a major role in establishing the sugar industry. The mikveh was rediscovered in 2008.", individuals: [], connections: [] });

addEntry("U.S. Virgin Islands", { name: "Hebrew Congregation of St. Thomas", type: "congregation", category: "Religion & Synagogues", founded: 1796, description: "One of the oldest synagogues in continuous use under the American flag. Located in Charlotte Amalie. Features a sand-covered floor and is a National Historic Landmark.", individuals: [], connections: [] });

// ============================================================
// MIDDLE EAST
// ============================================================

addEntry("Bahrain", { name: "House of Ten Commandments", type: "synagogue", category: "Religion & Synagogues", founded: 1935, description: "Synagogue in Manama, Bahrain. One of the few remaining synagogues in the Arabian Gulf. Bahrain's Jewish community is tiny but has been present since the early 20th century. The Abraham Accords have brought renewed interest.", individuals: [], connections: [] });

addEntry("United Arab Emirates", { name: "Jewish Council of the Emirates", type: "community organization", category: "Community & Social Organizations", founded: 2018, description: "Official organization of the Jewish community in the UAE. Growing community of approximately 3,000. The Abraham Accords (2020) significantly boosted the community.", individuals: [], connections: [] });

addEntry("Morocco", { name: "Bayt Dakira (House of Memory)", type: "museum", category: "Heritage & Memorials", founded: 2020, description: "Jewish-Muslim museum and heritage center in Essaouira, Morocco. Morocco's King Mohammed VI has invested in preserving Jewish heritage sites across the country.", individuals: [], connections: [] });

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
console.log(`\n=== EXPANSION 5 COMPLETE ===`);
console.log(`Added ${added} new entries`);
console.log(`Total entries: ${total}`);
console.log(`Countries: ${Object.keys(data.countries).length}`);
console.log(`People: ${Object.keys(people.people).length}`);
