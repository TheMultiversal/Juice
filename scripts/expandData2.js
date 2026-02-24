// Second massive expansion - Run AFTER expandData.js
// node scripts/expandData2.js
// Adds: more businesses, more Israeli tech, banking dynasties, more sports,
// more media, publishers, record labels, more communities, heritage sites, etc.

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

function addEntry(country, entry) {
  if (!data.countries[country]) data.countries[country] = [];
  entry.id = slugify(entry.name);
  if (existingIds.has(entry.id)) return;
  existingIds.add(entry.id);
  if (!entry.individuals) entry.individuals = [];
  entry.individuals.forEach(ind => {
    const pid = slugify(ind.name);
    ind.id = pid;
    if (!people.people[pid]) {
      people.people[pid] = { name: ind.name, bio: ind.bio || '', notes: '' };
    } else if (ind.bio && ind.bio.length > (people.people[pid].bio || '').length) {
      people.people[pid].bio = ind.bio;
    }
  });
  data.countries[country].push(entry);
}

const us = "United States";
const il = "Israel";
const uk = "United Kingdom";
const fr = "France";
const de = "Germany";
const ca = "Canada";
const au = "Australia";
const ru = "Russia";
const za = "South Africa";
const br = "Brazil";
const ar = "Argentina";

// ============================================================
// UNITED STATES - MORE
// ============================================================

// --- More Finance / Banking ---
addEntry(us, { name: "Lehman Brothers (historic)", type: "investment bank (defunct)", description: "Historic investment bank founded in 1850 by Jewish brothers Henry, Emanuel, and Mayer Lehman. Its collapse triggered the 2008 financial crisis.", website: "", individuals: [{ name: "Henry Lehman", role: "Co-founder (1822-1855)", bio: "German-Jewish immigrant who co-founded Lehman Brothers." }] });
addEntry(us, { name: "Bear Stearns (historic)", type: "investment bank (defunct)", description: "Major investment bank co-founded by Joseph Bear, Robert Stearns, and Harold Mayer in 1923. Collapsed in 2008.", website: "", individuals: [{ name: "Alan Greenberg", role: "Former CEO (1927-2014)", bio: "Long-time Jewish CEO of Bear Stearns." }] });
addEntry(us, { name: "Salomon Brothers (historic)", type: "investment bank (defunct)", description: "Wall Street investment bank founded in 1910 by three Jewish brothers.", website: "", individuals: [{ name: "Arthur Salomon", role: "Co-founder", bio: "Jewish co-founder of Salomon Brothers." }] });
addEntry(us, { name: "Kuhn, Loeb & Co. (historic)", type: "investment bank (defunct)", description: "Major American investment bank founded in 1867 by Jewish bankers Abraham Kuhn and Solomon Loeb.", website: "", individuals: [{ name: "Jacob Schiff", role: "Senior Partner (1847-1920)", bio: "Jewish financier and philanthropist who led Kuhn Loeb to prominence." }] });
addEntry(us, { name: "Loews Corporation", type: "conglomerate", description: "Conglomerate controlled by the Tisch family.", website: "https://www.loews.com/", individuals: [{ name: "James Tisch", role: "CEO", bio: "Jewish CEO of Loews Corporation." }] });
addEntry(us, { name: "Och-Ziff Capital Management (Sculptor Capital)", type: "hedge fund", description: "Former multi-strategy hedge fund.", website: "", individuals: [{ name: "Daniel Och", role: "Founder", bio: "Jewish founder of Och-Ziff Capital Management." }] });
addEntry(us, { name: "SAC Capital Advisors / Point72", type: "hedge fund", description: "Hedge fund founded by Steven A. Cohen.", website: "https://www.point72.com/", individuals: [{ name: "Steven A. Cohen", role: "Founder", bio: "Jewish billionaire hedge fund manager, owner of the NY Mets." }] });
addEntry(us, { name: "Baupost Group", type: "hedge fund", description: "Boston-based value-oriented investment partnership.", website: "", individuals: [{ name: "Seth Klarman", role: "CEO", bio: "Jewish billionaire investor known as the 'Oracle of Boston.'" }] });
addEntry(us, { name: "Third Point LLC", type: "hedge fund", description: "Activist hedge fund.", website: "https://www.thirdpoint.com/", individuals: [{ name: "Daniel Loeb", role: "Founder & CEO", bio: "Jewish activist investor and hedge fund manager." }] });
addEntry(us, { name: "Icahn Enterprises", type: "conglomerate", description: "Diversified conglomerate controlled by Carl Icahn.", website: "https://www.ielp.com/", individuals: [{ name: "Carl Icahn", role: "Founder & Chairman", bio: "Jewish billionaire activist investor and corporate raider." }] });
addEntry(us, { name: "Soros Fund Management", type: "hedge fund", description: "Family office managing assets for George Soros.", website: "", individuals: [{ name: "George Soros", role: "Founder", bio: "Hungarian-born Jewish billionaire investor and philanthropist." }] });
addEntry(us, { name: "Goldman Sachs (historic)", type: "investment bank", description: "Major investment bank founded in 1869 by Marcus Goldman, a Jewish immigrant from Bavaria. His son-in-law Samuel Sachs later joined.", website: "https://www.goldmansachs.com/", individuals: [{ name: "Marcus Goldman", role: "Founder (1821-1904)", bio: "Bavarian-Jewish immigrant who founded Goldman Sachs." }, { name: "Samuel Sachs", role: "Co-founder (1851-1935)", bio: "Jewish co-founder and son-in-law of Marcus Goldman." }] });
addEntry(us, { name: "The Blackstone Group", type: "private equity", description: "World's largest alternative investment firm. Co-founded by Stephen Schwarzman, who is Jewish.", website: "https://www.blackstone.com/", individuals: [{ name: "Stephen Schwarzman", role: "Co-founder, Chairman & CEO", bio: "Jewish billionaire, co-founder of Blackstone, major philanthropist." }, { name: "Jonathan Gray", role: "President & COO", bio: "Jewish president and COO of Blackstone." }] });

// --- Record Labels / Music Industry ---
addEntry(us, { name: "Atlantic Records", type: "record label", description: "Major record label founded in 1947 by Ahmet Ertegun and Herb Abramson (Jewish).", website: "https://www.atlanticrecords.com/", individuals: [{ name: "Herb Abramson", role: "Co-founder (1916-1999)", bio: "Jewish co-founder of Atlantic Records." }] });
addEntry(us, { name: "Interscope Records", type: "record label", description: "Major record label. Chairman John Janick is Jewish.", website: "https://www.interscope.com/", individuals: [{ name: "John Janick", role: "Chairman & CEO", bio: "Jewish chairman and CEO of Interscope Geffen A&M Records." }] });
addEntry(us, { name: "Geffen Records", type: "record label", description: "Record label founded by David Geffen in 1980.", website: "", individuals: [{ name: "David Geffen", role: "Founder", bio: "Jewish media mogul, co-founder of DreamWorks." }] });
addEntry(us, { name: "Elektra Records", type: "record label", description: "Record label founded by Jac Holzman (Jewish) in 1950.", website: "", individuals: [{ name: "Jac Holzman", role: "Founder", bio: "Jewish founder of Elektra Records." }] });
addEntry(us, { name: "A&M Records (historic)", type: "record label", description: "Record label co-founded by Herb Alpert (Jewish) and Jerry Moss in 1962.", website: "", individuals: [{ name: "Herb Alpert", role: "Co-founder", bio: "Jewish musician and co-founder of A&M Records." }] });
addEntry(us, { name: "Warner Music Group", type: "record label/music", description: "One of the 'Big Three' record labels. Owned by Len Blavatnik's Access Industries.", website: "https://www.wmg.com/", individuals: [{ name: "Len Blavatnik", role: "Owner", bio: "Ukrainian-born Jewish billionaire who acquired Warner Music Group." }] });
addEntry(us, { name: "Universal Music Group (US operations)", type: "record label/music", description: "World's largest music company. Long led by Jewish executives including Lucian Grainge.", website: "https://www.universalmusic.com/", individuals: [{ name: "Lucian Grainge", role: "Chairman & CEO", bio: "British-Jewish music executive, CEO of Universal Music Group." }] });
addEntry(us, { name: "Sony Music (legacy)", type: "record label/music", description: "Major record label. Former CBS Records, led for decades by Jewish executives including Clive Davis.", website: "https://www.sonymusic.com/", individuals: [{ name: "Clive Davis", role: "Chief Creative Officer (Emeritus)", bio: "Jewish music executive who discovered Whitney Houston, Alicia Keys, and many others." }] });

// --- Publishing ---
addEntry(us, { name: "Simon & Schuster", type: "publishing", description: "Major book publisher co-founded in 1924 by Richard Simon and Max Schuster, both Jewish.", website: "https://www.simonandschuster.com/", individuals: [{ name: "Richard Simon", role: "Co-founder (1899-1960)", bio: "Jewish co-founder of Simon & Schuster." }, { name: "Max Schuster", role: "Co-founder (1897-1970)", bio: "Jewish co-founder of Simon & Schuster." }] });
addEntry(us, { name: "Random House (Penguin Random House)", type: "publishing", description: "World's largest book publisher. Founded in 1927 by Bennett Cerf (Jewish) and Donald Klopfer.", website: "https://www.penguinrandomhouse.com/", individuals: [{ name: "Bennett Cerf", role: "Co-founder (1898-1971)", bio: "Jewish publisher and co-founder of Random House." }] });
addEntry(us, { name: "Alfred A. Knopf", type: "publishing", description: "Prestigious publishing house founded by Alfred A. Knopf (Jewish) in 1915.", website: "", individuals: [{ name: "Alfred A. Knopf", role: "Founder (1892-1984)", bio: "Jewish publisher known for literary quality." }] });
addEntry(us, { name: "Scholastic Corporation", type: "publishing", description: "World's largest publisher and distributor of children's books. Founded in 1920 by Maurice R. Robinson; longtime chairman Richard Robinson (Jewish) led the company for decades.", website: "https://www.scholastic.com/", individuals: [{ name: "Richard Robinson", role: "Former Chairman & CEO (1937-2019)", bio: "Jewish longtime chairman of Scholastic Corporation." }] });

// --- More Retail / Consumer ---
addEntry(us, { name: "Bed Bath & Beyond (historic)", type: "retail (defunct)", description: "Home goods retailer co-founded by Warren Eisenberg and Leonard Feinstein, both Jewish.", website: "", individuals: [{ name: "Warren Eisenberg", role: "Co-founder", bio: "Jewish co-founder of Bed Bath & Beyond." }, { name: "Leonard Feinstein", role: "Co-founder", bio: "Jewish co-founder of Bed Bath & Beyond." }] });
addEntry(us, { name: "Staples", type: "retail", description: "Office supply retail chain co-founded by Thomas Stemberg (Jewish) in 1986.", website: "https://www.staples.com/", individuals: [{ name: "Thomas Stemberg", role: "Co-founder (1949-2015)", bio: "Jewish co-founder of Staples." }] });
addEntry(us, { name: "Toys 'R' Us (historic)", type: "retail (defunct)", description: "Iconic toy retailer founded by Charles Lazarus (Jewish) in 1948.", website: "", individuals: [{ name: "Charles Lazarus", role: "Founder (1923-2018)", bio: "Jewish founder of Toys 'R' Us." }] });
addEntry(us, { name: "Macy's / Federated Department Stores", type: "retail", description: "Major department store chain. The Straus family (Jewish) owned and operated Macy's starting in the late 1800s.", website: "https://www.macys.com/", individuals: [{ name: "Isidor Straus", role: "Former Owner (1845-1912)", bio: "Jewish co-owner of Macy's who perished on the Titanic." }, { name: "Nathan Straus", role: "Former Owner (1848-1931)", bio: "Jewish co-owner. Major philanthropist, supported pasteurized milk for children." }] });
addEntry(us, { name: "Neiman Marcus", type: "retail", description: "Luxury department store chain founded in 1907 by Herbert Marcus, Carrie Marcus Neiman, and A.L. Neiman - a Jewish family in Dallas.", website: "https://www.neimanmarcus.com/", individuals: [{ name: "Herbert Marcus", role: "Co-founder (1878-1950)", bio: "Jewish co-founder of Neiman Marcus." }, { name: "Stanley Marcus", role: "Former President (1905-2002)", bio: "Jewish retail visionary who made Neiman Marcus a global luxury brand." }] });
addEntry(us, { name: "Bloomingdale's", type: "retail", description: "Upscale department store chain founded by brothers Joseph and Lyman Bloomingdale (Jewish) in 1861.", website: "https://www.bloomingdales.com/", individuals: [{ name: "Joseph Bloomingdale", role: "Co-founder (1842-1904)", bio: "Jewish co-founder of Bloomingdale's." }] });
addEntry(us, { name: "Sears Roebuck (historic)", type: "retail", description: "Once the largest retailer in the US. Julius Rosenwald (Jewish) was president and transformed the company.", website: "", individuals: [{ name: "Julius Rosenwald", role: "President & Chairman (1862-1932)", bio: "Jewish businessman who built Sears into a retail giant. Major philanthropist who funded schools for African Americans." }] });

// --- More Entertainment ---
addEntry(us, { name: "Marvel Entertainment (legacy)", type: "entertainment", description: "Comic book and entertainment company. Created by Jewish founders Martin Goodman, Stan Lee, and Jack Kirby.", website: "https://www.marvel.com/", individuals: [{ name: "Stan Lee", role: "Co-creator (1922-2018)", bio: "Born Stanley Lieber. Jewish comic book writer who co-created Spider-Man, X-Men, and many others." }, { name: "Jack Kirby", role: "Co-creator (1917-1994)", bio: "Born Jacob Kurtzberg. Jewish comic book artist who co-created Captain America, Hulk, Fantastic Four." }] });
addEntry(us, { name: "DC Comics (legacy)", type: "entertainment", description: "Comic book publisher. Superman created by Jewish writers Jerry Siegel and Joe Shuster.", website: "https://www.dc.com/", individuals: [{ name: "Jerry Siegel", role: "Superman Co-creator (1914-1996)", bio: "Jewish co-creator of Superman." }, { name: "Joe Shuster", role: "Superman Co-creator (1914-1992)", bio: "Jewish co-creator of Superman." }, { name: "Bob Kane", role: "Batman Co-creator (1915-1998)", bio: "Born Robert Kahn. Jewish co-creator of Batman." }] });
addEntry(us, { name: "MGM Studios (historic)", type: "entertainment", description: "Legendary film studio. Co-founded by Louis B. Mayer (Jewish) and Marcus Loew.", website: "", individuals: [{ name: "Louis B. Mayer", role: "Co-founder (1884-1957)", bio: "Jewish film mogul who co-founded Metro-Goldwyn-Mayer." }, { name: "Samuel Goldwyn", role: "Co-founder (1879-1974)", bio: "Born Szmuel Gelbfisz. Jewish film producer." }] });
addEntry(us, { name: "Warner Bros. Pictures (historic founding)", type: "entertainment", description: "Major film studio founded by the four Warner brothers, Jewish immigrants from Poland.", website: "", individuals: [{ name: "Jack Warner", role: "Co-founder (1892-1978)", bio: "Jewish co-founder of Warner Bros." }, { name: "Harry Warner", role: "Co-founder (1881-1958)", bio: "Jewish co-founder of Warner Bros." }] });
addEntry(us, { name: "Paramount Pictures (historic founding)", type: "entertainment", description: "Major film studio. Founded by Adolph Zukor (Jewish) in 1912.", website: "", individuals: [{ name: "Adolph Zukor", role: "Founder (1873-1976)", bio: "Hungarian-born Jewish founder of Paramount Pictures." }] });
addEntry(us, { name: "Columbia Pictures (historic founding)", type: "entertainment", description: "Major film studio founded by Harry Cohn (Jewish) and Jack Cohn in 1924.", website: "", individuals: [{ name: "Harry Cohn", role: "Co-founder (1891-1958)", bio: "Jewish co-founder and longtime president of Columbia Pictures." }] });
addEntry(us, { name: "Universal Pictures (historic founding)", type: "entertainment", description: "Major film studio founded by Carl Laemmle (Jewish) in 1912.", website: "", individuals: [{ name: "Carl Laemmle", role: "Founder (1867-1939)", bio: "German-Jewish immigrant who founded Universal Pictures." }] });
addEntry(us, { name: "20th Century Fox (historic founding)", type: "entertainment", description: "Major film studio. William Fox (born Wilhelm Fuchs, Jewish) founded Fox Film Corporation in 1915.", website: "", individuals: [{ name: "William Fox", role: "Founder (1879-1952)", bio: "Hungarian-born Jewish founder of Fox Film Corporation." }] });
addEntry(us, { name: "Netflix", type: "entertainment/technology", description: "Streaming giant. Co-founded by Marc Randolph (Jewish) in 1997.", website: "https://www.netflix.com/", individuals: [{ name: "Marc Randolph", role: "Co-founder", bio: "Jewish co-founder and first CEO of Netflix." }] });
addEntry(us, { name: "Lionsgate Films", type: "entertainment", description: "Film and television studio. Founded by Frank Giustra and others; former CEO Jon Feltheimer is Jewish.", website: "https://www.lionsgate.com/", individuals: [{ name: "Jon Feltheimer", role: "CEO", bio: "Jewish CEO of Lionsgate Entertainment." }] });

// --- More Tech ---
addEntry(us, { name: "Microsoft (Israel R&D)", type: "technology", description: "Tech giant with its largest R&D center outside the US in Israel, employing 2,000+. Former CEO Steve Ballmer has Jewish heritage (Jewish mother). Acquired Israeli companies including Aorato and Adallom.", website: "https://www.microsoft.com/", individuals: [{ name: "Steve Ballmer", role: "Former CEO", bio: "Former Microsoft CEO with Jewish heritage through his mother." }] });
addEntry(us, { name: "Apple (Israel R&D)", type: "technology", description: "Tech giant with major R&D centers in Herzliya and Haifa. Acquired Israeli companies: Anobit ($400M, flash storage), PrimeSense ($360M, 3D sensing for Face ID), and LinX ($20M, camera tech).", website: "https://www.apple.com/", individuals: [{ name: "Johny Srouji", role: "SVP Hardware Technologies", bio: "Israeli-Arab VP at Apple who leads chip design, partly in Israel." }] });
addEntry(us, { name: "Amazon (Israel R&D)", type: "technology", description: "E-commerce and cloud giant. Acquired Israeli chipmaker Annapurna Labs for $350M (now powers AWS Graviton chips). Multiple R&D centers in Israel.", website: "https://www.amazon.com/", individuals: [{ name: "Navot Volk", role: "GM of Annapurna Labs Israel", bio: "Israeli GM leading Amazon's Annapurna Labs chip development." }] });
addEntry(us, { name: "Oracle (Israel operations)", type: "technology", description: "Enterprise software giant. Co-founded by Larry Ellison (Jewish). Acquired Israeli companies Ravello Systems and Dyn. Major R&D in Israel.", website: "https://www.oracle.com/", individuals: [{ name: "Larry Ellison", role: "Co-founder & Chairman", bio: "Jewish co-founder and chairman of Oracle, one of the world's wealthiest people." }] });
addEntry(us, { name: "Wix.com (US operations)", type: "technology", description: "Israeli-founded website builder platform headquartered in Tel Aviv with major US operations. Founded by Israeli entrepreneurs Avishai Abrahami, Nadav Abrahami, and Giora Kaplan.", website: "https://www.wix.com/", individuals: [{ name: "Avishai Abrahami", role: "Co-founder & CEO", bio: "Israeli co-founder and CEO of Wix.com." }] });
addEntry(us, { name: "Palo Alto Networks", type: "cybersecurity", description: "Cybersecurity company co-founded by Israeli Nir Zuk.", website: "https://www.paloaltonetworks.com/", individuals: [{ name: "Nir Zuk", role: "Co-founder & CTO", bio: "Israeli co-founder of Palo Alto Networks, previously co-developed the first stateful inspection firewall at Check Point." }] });
addEntry(us, { name: "CrowdStrike", type: "cybersecurity", description: "Major cybersecurity company. Co-founded by George Kurtz and Dmitri Alperovitch. Has acquired Israeli companies and employs significant Israeli cybersecurity talent.", website: "https://www.crowdstrike.com/", individuals: [{ name: "Dmitri Alperovitch", role: "Co-founder & Former CTO", bio: "Russian-born Jewish-American cybersecurity expert, co-founder of CrowdStrike." }] });
addEntry(us, { name: "Akamai Technologies", type: "technology", description: "Content delivery network co-founded by MIT professor Tom Leighton and Danny Lewin. Danny Lewin was a Jewish-Israeli American who was killed on American Airlines Flight 11 on 9/11.", website: "https://www.akamai.com/", individuals: [{ name: "Danny Lewin", role: "Co-founder (1970-2001)", bio: "Israeli-American mathematician and co-founder of Akamai. First victim of the 9/11 attacks." }] });
addEntry(us, { name: "Dell Technologies (Israel operations)", type: "technology", description: "Founded by Michael Dell (Jewish). Dell has a major campus in Ra'anana, Israel employing 3,000+ and acquired Israeli companies.", website: "https://www.dell.com/", individuals: [{ name: "Michael Dell", role: "Founder & CEO", bio: "Jewish founder and CEO of Dell Technologies." }] });
addEntry(us, { name: "Fiverr (US operations)", type: "technology", description: "Israeli-founded freelance marketplace with offices in New York and Tel Aviv. Founded by Israeli entrepreneurs Micha Kaufman and Shai Wininger.", website: "https://www.fiverr.com/", individuals: [{ name: "Micha Kaufman", role: "Co-founder & CEO", bio: "Israeli co-founder and CEO of Fiverr." }, { name: "Shai Wininger", role: "Co-founder", bio: "Israeli co-founder of Fiverr, also co-founded Lemonade Insurance." }] });

// --- More Healthcare ---
addEntry(us, { name: "Teva Pharmaceutical (US operations)", type: "pharmaceutical", description: "US operations of Israeli pharma giant Teva, the world's largest generic drug manufacturer. Founded in Jerusalem in 1901.", website: "https://www.tevapharm.com/", individuals: [{ name: "Eli Hurvitz", role: "Former Chairman (1932-2011)", bio: "Israeli businessman who led Teva's global expansion for decades." }] });
addEntry(us, { name: "Moderna (Israeli connections)", type: "pharmaceutical", description: "mRNA vaccine pioneer. Israeli scientist Tal Zaks served as Chief Medical Officer during COVID-19 vaccine development.", website: "https://www.modernatx.com/", individuals: [{ name: "Tal Zaks", role: "Former CMO", bio: "Israeli physician-scientist who served as Moderna's Chief Medical Officer during COVID-19 vaccine development." }] });
addEntry(us, { name: "Mount Sinai Health System", type: "healthcare", description: "Major NYC hospital system. Originally founded as Jews' Hospital in 1852 to serve the Jewish community.", website: "https://www.mountsinai.org/", individuals: [{ name: "Kenneth Davis", role: "Former CEO", bio: "Jewish physician who led Mount Sinai Health System." }] });
addEntry(us, { name: "Maimonides Medical Center", type: "hospital", description: "Large hospital in Brooklyn named after the Jewish philosopher Moses Maimonides. Serves a large Jewish community.", website: "https://www.maimonides.org/", individuals: [] });
addEntry(us, { name: "Montefiore Medical Center", type: "hospital", description: "Academic medical center in the Bronx, named after Sir Moses Montefiore, the Jewish philanthropist.", website: "https://www.montefiore.org/", individuals: [] });
addEntry(us, { name: "Northwell Health (formerly North Shore-LIJ)", type: "healthcare", description: "New York's largest healthcare provider. Formerly Long Island Jewish Medical Center. CEO Michael Dowling has partnered extensively with Israeli medical innovation.", website: "https://www.northwell.edu/", individuals: [{ name: "Michael Dowling", role: "CEO", bio: "CEO of Northwell Health, partner of Israeli medical innovations." }] });

// --- Synagogues & Religious ---
addEntry(us, { name: "Temple Emanu-El (New York)", type: "synagogue", description: "One of the largest Reform synagogues in the world, in Manhattan.", website: "https://www.emanuelnyc.org/", individuals: [] });
addEntry(us, { name: "Congregation Shearith Israel (NYC)", type: "synagogue", description: "The oldest Jewish congregation in North America, founded in 1654 by Sephardic Jews.", website: "https://www.shearithisrael.org/", individuals: [] });
addEntry(us, { name: "Congregation Beth Elohim (Brooklyn)", type: "synagogue", description: "Historic Reform synagogue in Brooklyn, founded 1861.", website: "https://www.bethel.org/", individuals: [] });
addEntry(us, { name: "Wilshire Boulevard Temple (Los Angeles)", type: "synagogue", description: "Oldest Jewish congregation in Los Angeles, founded 1862.", website: "https://www.wbtla.org/", individuals: [] });
addEntry(us, { name: "Touro Synagogue (Newport, RI)", type: "synagogue/historic", description: "Oldest surviving synagogue building in the United States, built 1763.", website: "https://www.tourosynagogue.org/", individuals: [] });
addEntry(us, { name: "Kehilath Jeshurun (NYC)", type: "synagogue", description: "Prominent Modern Orthodox synagogue on Manhattan's Upper East Side.", website: "https://www.ckj.org/", individuals: [] });
addEntry(us, { name: "Young Israel movement", type: "religious movement", description: "Movement of Modern Orthodox synagogues across North America, founded 1912.", website: "https://www.youngisrael.org/", individuals: [] });

// --- Jewish Day Schools ---
addEntry(us, { name: "SAR Academy & High School", type: "education", description: "Modern Orthodox Jewish day school in the Riverdale section of the Bronx.", website: "https://www.saracademy.org/", individuals: [] });
addEntry(us, { name: "Ramaz School (NYC)", type: "education", description: "Modern Orthodox Jewish day school on Manhattan's Upper East Side.", website: "https://www.ramaz.org/", individuals: [] });
addEntry(us, { name: "Heschel School (NYC)", type: "education", description: "Jewish day school in Manhattan.", website: "https://www.heschel.org/", individuals: [] });
addEntry(us, { name: "Charles E. Smith Jewish Day School (DC)", type: "education", description: "Largest Jewish day school in Greater Washington, DC.", website: "https://www.cesjds.org/", individuals: [] });
addEntry(us, { name: "Milken Community School (LA)", type: "education", description: "Jewish day school in Los Angeles, founded by the Milken family.", website: "https://www.milkenschool.org/", individuals: [{ name: "Michael Milken", role: "Benefactor", bio: "Jewish financier and philanthropist." }] });
addEntry(us, { name: "Solomon Schechter Day Schools", type: "education network", description: "Network of Conservative-affiliated Jewish day schools across North America.", website: "", individuals: [] });

// --- Jewish Summer Camps ---
addEntry(us, { name: "Camp Ramah", type: "summer camp network", description: "Network of Jewish summer camps affiliated with Conservative Judaism.", website: "https://www.campramah.org/", individuals: [] });
addEntry(us, { name: "URJ Camp Newman / Camp George", type: "summer camp", description: "Union for Reform Judaism summer camp programs.", website: "", individuals: [] });
addEntry(us, { name: "Camp Young Judaea", type: "summer camp", description: "Hadassah-affiliated Zionist youth camps.", website: "", individuals: [] });

// --- More Sports ---
addEntry(us, { name: "Las Vegas Raiders (Mark Davis)", type: "sports franchise", description: "NFL franchise. Owner Mark Davis's mother Carol was Jewish, making him of Jewish heritage.", website: "https://www.raiders.com/", individuals: [{ name: "Mark Davis", role: "Owner", bio: "Owner of the Las Vegas Raiders. His mother Carol was Jewish." }] });
addEntry(us, { name: "Minnesota Timberwolves (Glen Taylor/Marc Lore/Alex Rodriguez)", type: "sports franchise", description: "NBA franchise. Part-owner Marc Lore is Jewish.", website: "https://www.nba.com/timberwolves/", individuals: [{ name: "Marc Lore", role: "Part-owner", bio: "Jewish entrepreneur, former CEO of Walmart eCommerce." }] });
addEntry(us, { name: "Milwaukee Bucks (Wes Edens/Marc Lasry)", type: "sports franchise", description: "NBA championship team. Co-owner Marc Lasry is a Moroccan-born Jewish American billionaire.", website: "https://www.nba.com/bucks/", individuals: [{ name: "Marc Lasry", role: "Former Co-owner", bio: "Moroccan-born Jewish billionaire hedge fund manager." }] });
addEntry(us, { name: "Atlanta Hawks (Tony Ressler)", type: "sports franchise", description: "NBA franchise owned by Tony Ressler, who is Jewish.", website: "https://www.nba.com/hawks/", individuals: [{ name: "Tony Ressler", role: "Owner", bio: "Jewish billionaire co-founder of Ares Management." }] });
addEntry(us, { name: "Phoenix Suns (Mat Ishbia)", type: "sports franchise", description: "NBA franchise owned by Mat Ishbia, who is Jewish.", website: "https://www.nba.com/suns/", individuals: [{ name: "Mat Ishbia", role: "Owner", bio: "Jewish billionaire, CEO of United Wholesale Mortgage, owner of the Phoenix Suns." }] });
addEntry(us, { name: "Cleveland Cavaliers (Dan Gilbert)", type: "sports franchise", description: "NBA franchise owned by Dan Gilbert, who is Jewish. Also founder of Quicken Loans/Rocket Mortgage.", website: "https://www.nba.com/cavaliers/", individuals: [{ name: "Dan Gilbert", role: "Owner", bio: "Jewish billionaire, founder of Quicken Loans and owner of the Cleveland Cavaliers." }] });
addEntry(us, { name: "Boston Celtics (Wyc Grousbeck)", type: "sports franchise", description: "NBA franchise. Lead owner Wyc Grousbeck is Jewish.", website: "https://www.nba.com/celtics/", individuals: [{ name: "Wyc Grousbeck", role: "Lead Owner & Governor", bio: "Jewish lead owner and governor of the Boston Celtics." }] });
addEntry(us, { name: "Anaheim Ducks (Henry Samueli)", type: "sports franchise", description: "NHL franchise owned by Broadcom co-founder Henry Samueli, who is Jewish.", website: "https://www.nhl.com/ducks/", individuals: [{ name: "Henry Samueli", role: "Owner", bio: "Jewish co-founder of Broadcom, owner of the Anaheim Ducks." }] });
addEntry(us, { name: "Carolina Hurricanes (Tom Dundon)", type: "sports franchise", description: "NHL franchise. Jewish businessman Tom Dundon is majority owner.", website: "https://www.nhl.com/hurricanes/", individuals: [{ name: "Tom Dundon", role: "Owner", bio: "Jewish majority owner of the Carolina Hurricanes." }] });
addEntry(us, { name: "Tampa Bay Lightning (Jeff Vinik)", type: "sports franchise", description: "NHL franchise owned by Jeff Vinik, who is Jewish.", website: "https://www.nhl.com/lightning/", individuals: [{ name: "Jeff Vinik", role: "Owner", bio: "Jewish billionaire owner of the Tampa Bay Lightning." }] });

// --- More Real Estate ---
addEntry(us, { name: "Simon Property Group", type: "real estate investment trust", description: "Largest REIT in the US and largest shopping mall operator globally. Founded by Mel Simon (Jewish).", website: "https://www.simon.com/", individuals: [{ name: "David Simon", role: "Chairman & CEO", bio: "Jewish CEO of Simon Property Group." }] });
addEntry(us, { name: "Brookfield Properties (Ric Clark)", type: "real estate", description: "Major commercial real estate company. Jewish executive Ric Clark served as chairman.", website: "https://www.brookfieldproperties.com/", individuals: [{ name: "Ric Clark", role: "Former Chairman", bio: "Jewish former chairman of Brookfield Property Partners." }] });
addEntry(us, { name: "Mack-Cali Realty (Veris Residential)", type: "real estate", description: "Real estate company founded by the Mack family (Jewish). William Mack is a prominent Jewish real estate developer.", website: "https://www.verisresidential.com/", individuals: [{ name: "William Mack", role: "Founder", bio: "Jewish real estate developer who co-founded Mack-Cali Realty." }] });
addEntry(us, { name: "Forest City Realty (Brookfield)", type: "real estate", description: "Real estate company founded by the Ratner and Miller families (Jewish). Developed Barclays Center.", website: "", individuals: [{ name: "Albert Ratner", role: "Co-Chairman Emeritus", bio: "Jewish real estate developer." }] });
addEntry(us, { name: "Rudin Management", type: "real estate", description: "Family-owned NYC real estate company, one of the city's oldest private landlords. Jewish Rudin family has developed over 40 properties in Manhattan.", website: "https://www.rudin.com/", individuals: [{ name: "William Rudin", role: "CEO", bio: "Jewish CEO of Rudin Management Company." }, { name: "Eric Rudin", role: "Co-Chairman", bio: "Jewish co-chairman of Rudin Management." }] });
addEntry(us, { name: "Durst Organization", type: "real estate", description: "Family-owned NYC real estate company. Jewish family that has developed major skyscrapers.", website: "https://www.durst.org/", individuals: [{ name: "Douglas Durst", role: "Chairman", bio: "Jewish chairman of The Durst Organization." }] });
addEntry(us, { name: "Zeckendorf Development", type: "real estate", description: "Luxury real estate developer in NYC. Jewish Zeckendorf family has been prominent in real estate for generations.", website: "https://www.zeckendorf.com/", individuals: [{ name: "William Zeckendorf Jr.", role: "Co-chairman", bio: "Jewish real estate developer." }, { name: "Arthur Zeckendorf", role: "Co-chairman", bio: "Jewish real estate developer." }] });

// --- Food & Beverage ---
addEntry(us, { name: "Starbucks (Howard Schultz era)", type: "food & beverage", description: "Global coffeehouse chain built by Howard Schultz (Jewish) from a small Seattle coffee shop into a global brand with 35,000+ locations.", website: "https://www.starbucks.com/", individuals: [{ name: "Howard Schultz", role: "Former CEO & Chairman", bio: "Jewish former CEO who transformed Starbucks into a global brand. Grew up in Brooklyn public housing." }] });
addEntry(us, { name: "Manischewitz", type: "food", description: "Producer of kosher foods since 1888, best known for matzo and kosher wine.", website: "https://www.manischewitz.com/", individuals: [] });
addEntry(us, { name: "Sabra Hummus", type: "food", description: "Leading hummus brand in the US. Joint venture of PepsiCo and Israeli Strauss Group.", website: "https://www.sabra.com/", individuals: [] });
addEntry(us, { name: "Nathan's Famous", type: "food", description: "Iconic hot dog company founded by Nathan Handwerker (Jewish) in 1916 on Coney Island.", website: "https://www.nathansfamous.com/", individuals: [{ name: "Nathan Handwerker", role: "Founder (1891-1974)", bio: "Polish-Jewish immigrant who founded Nathan's Famous hot dogs on Coney Island." }] });
addEntry(us, { name: "Häagen-Dazs", type: "food", description: "Premium ice cream brand founded by Reuben and Rose Mattus (Jewish) in 1961 in the Bronx.", website: "https://www.haagendazs.us/", individuals: [{ name: "Reuben Mattus", role: "Founder (1912-1994)", bio: "Jewish founder of Häagen-Dazs." }] });
addEntry(us, { name: "Snapple", type: "beverage", description: "Beverage company co-founded in 1972 by Leonard Marsh, Hyman Golden, and Arnold Greenberg - all three Jewish friends from Brooklyn.", website: "https://www.snapple.com/", individuals: [{ name: "Leonard Marsh", role: "Co-founder", bio: "Jewish co-founder of Snapple." }, { name: "Hyman Golden", role: "Co-founder", bio: "Jewish co-founder of Snapple." }, { name: "Arnold Greenberg", role: "Co-founder", bio: "Jewish co-founder of Snapple." }] });
addEntry(us, { name: "Kind Snacks", type: "food", description: "Healthy snack company founded by Daniel Lubetzky, an American-Jewish entrepreneur of Mexican descent.", website: "https://www.kindsnacks.com/", individuals: [{ name: "Daniel Lubetzky", role: "Founder", bio: "Jewish-American founder of Kind Snacks, son of a Holocaust survivor." }] });

// ============================================================
// ISRAEL - MORE
// ============================================================

addEntry(il, { name: "Bezeq (Israel Telecom)", type: "telecommunications", description: "Israel's largest telecommunications company. Founded 1984, formerly state-owned.", website: "https://www.bezeq.co.il/", individuals: [{ name: "Shaul Elovitch", role: "Former Controlling Shareholder", bio: "Israeli businessman, former controlling shareholder of Bezeq." }] });
addEntry(il, { name: "Partner Communications (Orange Israel)", type: "telecommunications", description: "Major Israeli mobile phone operator. Founded by Haim Saban (Jewish).", website: "https://www.partner.co.il/", individuals: [{ name: "Haim Saban", role: "Original Investor", bio: "Egyptian-born Israeli-American media mogul, early investor in Partner." }] });
addEntry(il, { name: "Cellcom Israel", type: "telecommunications", description: "Major Israeli cellular provider. Founded 1994.", website: "https://www.cellcom.co.il/", individuals: [{ name: "Nochi Dankner", role: "Former Owner", bio: "Israeli businessman who controlled Cellcom through IDB Holdings." }] });
addEntry(il, { name: "IEC (Israel Electric Corporation)", type: "utility", description: "Israel's largest electricity supplier. State-owned company founded in 1923 by Pinhas Rutenberg.", website: "https://www.iec.co.il/", individuals: [{ name: "Pinhas Rutenberg", role: "Founder (1879-1942)", bio: "Russian-Jewish Zionist who founded the Palestine Electric Corporation." }] });
addEntry(il, { name: "Delek Group", type: "energy/conglomerate", description: "Israeli conglomerate with interests in energy, infrastructure, and finance.", website: "https://www.delek-group.com/", individuals: [{ name: "Yitzhak Tshuva", role: "Chairman", bio: "Israeli billionaire, chairman of Delek Group." }] });
addEntry(il, { name: "Gazit-Globe", type: "real estate", description: "Israeli global real estate company operating shopping centers worldwide.", website: "https://www.gazitglobe.com/", individuals: [{ name: "Chaim Katzman", role: "Founder & Chairman", bio: "Israeli real estate billionaire." }] });
addEntry(il, { name: "Azrieli Group", type: "real estate", description: "Major Israeli real estate and holding company.", website: "https://www.azrieli.com/", individuals: [{ name: "David Azrieli", role: "Founder (1922-2014)", bio: "Canadian-Israeli billionaire who built the Azrieli Towers." }] });
addEntry(il, { name: "IDB Holdings", type: "conglomerate", description: "Israeli conglomerate with interests in telecom, insurance, and industry. Controlled by the Dankner family.", website: "", individuals: [{ name: "Nochi Dankner", role: "Former Chairman", bio: "Israeli businessman who controlled IDB Holdings." }] });
addEntry(il, { name: "Africa Israel Investments", type: "conglomerate", description: "Israeli conglomerate with real estate and construction interests.", website: "https://www.africa-israel.com/", individuals: [{ name: "Lev Leviev", role: "Chairman", bio: "Uzbek-born Israeli diamond and real estate magnate." }] });
addEntry(il, { name: "Discount Investment Corporation", type: "investment holding", description: "Israeli holding company with diverse investments. Controlled by the Recanati family (Jewish banking dynasty).", website: "", individuals: [{ name: "Leon Recanati", role: "Founder", bio: "Israeli businessman from the prominent Recanati Jewish banking family." }] });
addEntry(il, { name: "SolarEdge Technologies", type: "clean energy", description: "Israeli smart energy technology company.", website: "https://www.solaredge.com/", individuals: [{ name: "Guy Sella", role: "Co-founder & Former CEO (1962-2019)", bio: "Israeli co-founder of SolarEdge." }] });
addEntry(il, { name: "Orbotech (KLA)", type: "technology", description: "Israeli company specializing in automated optical inspection. Acquired by KLA for $3.4B in 2019.", website: "", individuals: [{ name: "Shlomo Barak", role: "Former CEO", bio: "Israeli CEO who led Orbotech through its acquisition by KLA." }] });
addEntry(il, { name: "Mellanox Technologies (Nvidia)", type: "technology", description: "Israeli-American supplier of computer networking products. Acquired by Nvidia for $6.9B.", website: "", individuals: [{ name: "Eyal Waldman", role: "Co-founder & Former CEO", bio: "Israeli co-founder of Mellanox Technologies." }] });
addEntry(il, { name: "Habana Labs (Intel)", type: "AI/chips", description: "Israeli AI processor company acquired by Intel for $2B in 2019. Co-founded by David Dahan and Ran Halutz.", website: "", individuals: [{ name: "David Dahan", role: "Co-founder", bio: "Israeli co-founder of Habana Labs." }] });
addEntry(il, { name: "StoreDot", type: "technology", description: "Israeli company developing ultra-fast-charging battery technology. Founded by Doron Myersdorf.", website: "https://www.store-dot.com/", individuals: [{ name: "Doron Myersdorf", role: "Founder & CEO", bio: "Israeli founder and CEO of StoreDot." }] });
addEntry(il, { name: "Innoviz Technologies", type: "autonomous driving", description: "Israeli lidar sensor company for autonomous vehicles. Founded by Omer Keilaf and four other Israeli entrepreneurs.", website: "https://innoviz.tech/", individuals: [{ name: "Omer Keilaf", role: "Co-founder & CEO", bio: "Israeli co-founder and CEO of Innoviz Technologies." }] });
addEntry(il, { name: "REE Automotive", type: "automotive", description: "Israeli automotive technology company developing electric vehicle platforms. Founded by Daniel Barel.", website: "https://ree.auto/", individuals: [{ name: "Daniel Barel", role: "Co-founder & CEO", bio: "Israeli co-founder and CEO of REE Automotive." }] });
addEntry(il, { name: "Orcam Technologies", type: "assistive technology", description: "Israeli company creating AI-powered assistive devices for the visually impaired. Co-founded by Amnon Shashua.", website: "https://www.orcam.com/", individuals: [{ name: "Amnon Shashua", role: "Co-founder", bio: "Israeli professor and co-founder of Mobileye and OrCam." }] });
addEntry(il, { name: "Watergen", type: "water technology", description: "Israeli company generating drinking water from air. Founded by Maxim Pasik.", website: "https://www.watergen.com/", individuals: [{ name: "Maxim Pasik", role: "President", bio: "Israeli-Russian president of Watergen." }] });
addEntry(il, { name: "Given Imaging (Medtronic)", type: "medical devices", description: "Israeli company that invented the PillCam (capsule endoscopy). Acquired by Medtronic for $1B. Founded by Gavriel Iddan.", website: "", individuals: [{ name: "Gavriel Iddan", role: "Inventor & Co-founder", bio: "Israeli engineer who invented the PillCam capsule endoscopy." }] });
addEntry(il, { name: "Israel Chemicals Ltd (ICL)", type: "chemicals", description: "Israeli multinational manufacturing fertilizers, specialty chemicals, and metals. Controlled by Israel Corp. (Ofer family).", website: "https://www.icl-group.com/", individuals: [{ name: "Idan Ofer", role: "Controlling Shareholder", bio: "Israeli billionaire, controlling shareholder of ICL through Israel Corp." }] });
addEntry(il, { name: "Taro Pharmaceutical (Israel)", type: "pharmaceutical", description: "Israeli specialty pharmaceutical company. Controlled by Sun Pharmaceutical, originally founded by the Levitt family.", website: "https://www.taro.com/", individuals: [{ name: "Barrie Levitt", role: "Former Chairman", bio: "Jewish co-founder of Taro Pharmaceutical." }] });
addEntry(il, { name: "BioNTech-Pfizer Israel Partnership", type: "pharmaceutical partnership", description: "Israel was one of the first countries to mass-vaccinate; Pfizer partnership used Israeli health data for COVID vaccine studies. Pfizer CEO Albert Bourla is a Sephardic Jew from Thessaloniki.", website: "", individuals: [{ name: "Albert Bourla", role: "CEO of Pfizer", bio: "Greek-Jewish CEO of Pfizer whose parents survived the Holocaust in Thessaloniki." }] });
addEntry(il, { name: "Israeli Wine Industry", type: "wine/agriculture", description: "Israel's modern wine industry includes over 300 wineries. Baron Edmond de Rothschild (Jewish) established Carmel Winery in 1882, pioneering Israeli viticulture.", website: "", individuals: [{ name: "Edmond de Rothschild", role: "Pioneer (1845-1934)", bio: "Jewish French banker who funded early Jewish settlements and wineries in Palestine." }] });
addEntry(il, { name: "Ahava Dead Sea Laboratories", type: "cosmetics", description: "Israeli cosmetics company using Dead Sea minerals. Founded in 1988 in Kibbutz Mitzpe Shalem.", website: "https://www.ahava.com/", individuals: [{ name: "Eliezer Manor", role: "Former CEO", bio: "Israeli businessman who led Ahava's global expansion." }] });
addEntry(il, { name: "SodaStream (Israel)", type: "consumer goods", description: "Israeli home carbonation company. Acquired by PepsiCo for $3.2B in 2018. Led by CEO Daniel Birnbaum.", website: "https://sodastream.com/", individuals: [{ name: "Daniel Birnbaum", role: "Former CEO", bio: "Israeli CEO who led SodaStream through its acquisition by PepsiCo." }] });
addEntry(il, { name: "Channel 12 (Keshet)", type: "media", description: "Israel's most-watched television channel. Owned by Keshet Media Group, led by Avi Nir.", website: "https://www.mako.co.il/", individuals: [{ name: "Avi Nir", role: "CEO of Keshet", bio: "Israeli CEO of Keshet Media Group." }] });
addEntry(il, { name: "Channel 13 (Reshet)", type: "media", description: "Major Israeli commercial television channel. Owned by Reshet Media.", website: "https://13tv.co.il/", individuals: [{ name: "Amos Regev", role: "CEO", bio: "Israeli journalist and CEO of Channel 13." }] });
addEntry(il, { name: "Galei Zahal (IDF Radio)", type: "media", description: "Israel Defense Forces radio station. Founded in 1950, one of Israel's most popular stations.", website: "", individuals: [] });
addEntry(il, { name: "Walla! News", type: "media", description: "Major Israeli news and content website. Owned by Bezeq group.", website: "https://www.walla.co.il/", individuals: [] });
addEntry(il, { name: "Start-Up Nation (ecosystem)", type: "innovation ecosystem", description: "Israel has the highest density of startups per capita globally, with 6,000+ tech companies.", website: "", individuals: [] });
addEntry(il, { name: "Western Wall Heritage Foundation", type: "religious/heritage", description: "Manages the Western Wall (Kotel) plaza and tunnels in Jerusalem.", website: "https://www.thekotel.org/", individuals: [] });
addEntry(il, { name: "Temple Mount / Haram al-Sharif", type: "religious site", description: "Holiest site in Judaism, site of the ancient Jewish Temples.", website: "", individuals: [] });
addEntry(il, { name: "Masada National Park", type: "heritage site", description: "Ancient fortress overlooking the Dead Sea, UNESCO World Heritage Site, symbol of Jewish resistance.", website: "", individuals: [] });
addEntry(il, { name: "Church of the Holy Sepulchre (Jerusalem)", type: "religious site", description: "Major Christian church in Jerusalem's Old City, administered in part under Israeli authority.", website: "", individuals: [] });
addEntry(il, { name: "Cave of the Patriarchs (Hebron)", type: "religious site", description: "Second holiest site in Judaism, traditional burial place of Abraham, Isaac, and Jacob.", website: "", individuals: [] });

// ============================================================
// UK - MORE
// ============================================================

addEntry(uk, { name: "Freuds Communications", type: "PR firm", description: "Major PR firm founded by Matthew Freud, great-grandson of Sigmund Freud.", website: "https://freuds.com/", individuals: [{ name: "Matthew Freud", role: "Founder", bio: "British PR executive, great-grandson of Sigmund Freud." }] });
addEntry(uk, { name: "Saatchi & Saatchi", type: "advertising", description: "Global advertising agency founded by Iraqi-Jewish brothers Charles and Maurice Saatchi.", website: "https://saatchi.com/", individuals: [{ name: "Charles Saatchi", role: "Co-founder", bio: "Iraqi-Jewish co-founder of Saatchi & Saatchi." }, { name: "Maurice Saatchi", role: "Co-founder", bio: "Iraqi-Jewish co-founder of Saatchi & Saatchi. Now Baron Saatchi." }] });
addEntry(uk, { name: "WPP plc", type: "advertising/PR", description: "World's largest advertising company. Founded by Sir Martin Sorrell (Jewish) who built it into a global advertising empire.", website: "https://www.wpp.com/", individuals: [{ name: "Martin Sorrell", role: "Founder", bio: "Jewish British businessman who founded and built WPP into the world's largest ad company." }] });
addEntry(uk, { name: "Marks & Spencer (M&S)", type: "retail", description: "Iconic British retailer. Co-founded by Michael Marks (Jewish, born in Belarus) in 1884. The Sieff family (Jewish) also led the company for decades.", website: "https://www.marksandspencer.com/", individuals: [{ name: "Michael Marks", role: "Co-founder (1859-1907)", bio: "Belarusian-Jewish immigrant who co-founded Marks & Spencer." }, { name: "Israel Sieff", role: "Former Chairman (1889-1972)", bio: "Jewish businessman and Zionist who led M&S for decades." }] });
addEntry(uk, { name: "Arcadia Group / Topshop (Philip Green)", type: "retail (defunct)", description: "Fashion retail empire led by Sir Philip Green, who is Jewish.", website: "", individuals: [{ name: "Philip Green", role: "Former Owner", bio: "Jewish British billionaire businessman." }] });
addEntry(uk, { name: "Entain (formerly GVC Holdings)", type: "gambling/technology", description: "British-based sports betting and gaming group. Israeli-born Shay Segev served as CEO.", website: "https://www.entaingroup.com/", individuals: [{ name: "Shay Segev", role: "Former CEO", bio: "Israeli former CEO of Entain." }] });
addEntry(uk, { name: "888 Holdings", type: "online gambling", description: "Israeli-founded online gambling company listed on the London Stock Exchange. Founded by Israeli Aharon Shaked and three partners.", website: "https://www.888.com/", individuals: [{ name: "Aharon Shaked", role: "Co-founder", bio: "Israeli co-founder of 888 Holdings." }] });
addEntry(uk, { name: "Plus500", type: "fintech", description: "Israeli-founded online trading platform listed on the London Stock Exchange. Founded by six Israeli alumni of the Technion.", website: "https://www.plus500.com/", individuals: [{ name: "Alon Gonen", role: "Co-founder", bio: "Israeli co-founder of Plus500." }] });
addEntry(uk, { name: "The Rothschild Archive", type: "archive/heritage", description: "Archive documenting the history of the Rothschild family in the UK and globally.", website: "https://www.rothschildarchive.org/", individuals: [] });
addEntry(uk, { name: "Manchester Jewish Museum", type: "museum", description: "Museum in a former Spanish and Portuguese synagogue in Manchester.", website: "https://www.manchesterjewishmuseum.com/", individuals: [] });
addEntry(uk, { name: "Jewish Museum London", type: "museum", description: "Museum exploring Jewish life and heritage in Britain.", website: "https://jewishmuseum.org.uk/", individuals: [] });
addEntry(uk, { name: "Bevis Marks Synagogue", type: "synagogue", description: "Oldest synagogue in Britain still in use, built 1701.", website: "https://www.sephardi.org.uk/bevis-marks/", individuals: [] });
addEntry(uk, { name: "Kindertransport Association (UK)", type: "memorial/charity", description: "Organization preserving the memory of the Kindertransport which rescued 10,000 Jewish children from Nazi Europe to Britain.", website: "", individuals: [] });

// ============================================================
// FRANCE - MORE
// ============================================================

addEntry(fr, { name: "Publicis Groupe", type: "advertising", description: "Third-largest advertising group worldwide. Founded by Marcel Bleustein-Blanchet, who was Jewish.", website: "https://www.publicisgroupe.com/", individuals: [{ name: "Marcel Bleustein-Blanchet", role: "Founder (1906-1996)", bio: "Jewish founder of Publicis." }, { name: "Maurice Lévy", role: "Chairman of Supervisory Board", bio: "Jewish chairman, led Publicis for decades." }] });
addEntry(fr, { name: "Dassault Group", type: "defense/aerospace", description: "French defense and aerospace conglomerate. Founded by Marcel Dassault (born Marcel Bloch), who was Jewish.", website: "https://www.dassault-aviation.com/", individuals: [{ name: "Marcel Dassault", role: "Founder (1892-1986)", bio: "Born Marcel Bloch, Jewish French aviation pioneer and industrialist." }, { name: "Serge Dassault", role: "Former CEO (1925-2018)", bio: "Son of Marcel, ran the Dassault empire." }] });
addEntry(fr, { name: "Essilor (Dassault connection)", type: "optics", description: "World's largest ophthalmic optics company. Has joint ventures with Israeli optical technology firms.", website: "https://www.essilorluxottica.com/", individuals: [{ name: "Hubert Sagnières", role: "Former CEO", bio: "Former CEO of Essilor who expanded Israeli partnerships." }] });
addEntry(fr, { name: "Sodexo (Israel operations)", type: "food services", description: "French food services company with Israeli operations. Founded by Pierre Bellon, with significant Jewish executive representation.", website: "https://www.sodexo.com/", individuals: [] });
addEntry(fr, { name: "Grand Synagogue of Paris (La Victoire)", type: "synagogue", description: "Largest synagogue in France, built 1874.", website: "", individuals: [] });
addEntry(fr, { name: "Drancy Internment Camp Memorial", type: "memorial", description: "Memorial at the site of the transit camp from which 65,000 Jews were deported during the Holocaust.", website: "", individuals: [] });

// ============================================================
// GERMANY - MORE
// ============================================================

addEntry(de, { name: "Axel Springer SE", type: "media/technology", description: "Major European media company, owner of Insider, Politico, Bild. Invested $100M+ in Israeli tech. CEO Mathias Döpfner is a vocal supporter of Israel and Jewish causes.", website: "https://www.axelspringer.com/", individuals: [{ name: "Mathias Döpfner", role: "CEO", bio: "CEO of Axel Springer, strong advocate for Israel and Jewish community." }, { name: "Friede Springer", role: "Majority Shareholder", bio: "Majority shareholder who has guided the company's pro-Israel stance." }] });
addEntry(de, { name: "Zalando", type: "e-commerce", description: "Major European e-commerce platform. Co-founded by David Schneider, who has Jewish heritage.", website: "https://www.zalando.de/", individuals: [{ name: "David Schneider", role: "Co-founder", bio: "Co-founder of Zalando." }] });
addEntry(de, { name: "Stolpersteine (Stumbling Stones)", type: "memorial project", description: "Brass memorial stones placed across Germany and Europe commemorating individual victims of the Holocaust, including millions of Jews.", website: "https://www.stolpersteine.eu/", individuals: [{ name: "Gunter Demnig", role: "Creator", bio: "German artist who created the Stolpersteine project." }] });
addEntry(de, { name: "Sachsenhausen Memorial", type: "memorial", description: "Memorial at the former concentration camp near Berlin.", website: "", individuals: [] });
addEntry(de, { name: "Neue Synagoge Berlin", type: "synagogue", description: "Historic Berlin synagogue, originally built 1866, destroyed in Kristallnacht, partially rebuilt.", website: "", individuals: [] });

// ============================================================
// CANADA - MORE
// ============================================================

addEntry(ca, { name: "Munk School of Global Affairs (U of Toronto)", type: "education", description: "Leading global affairs school. Founded through Peter Munk (Jewish) philanthropy.", website: "https://munkschool.utoronto.ca/", individuals: [{ name: "Peter Munk", role: "Benefactor (1927-2018)", bio: "Hungarian-born Canadian Jewish mining magnate, founder of Barrick Gold." }] });
addEntry(ca, { name: "Barrick Gold (Peter Munk)", type: "mining", description: "World's second-largest gold mining company. Founded by Peter Munk, a Hungarian-born Canadian Jew.", website: "https://www.barrick.com/", individuals: [{ name: "Peter Munk", role: "Founder (1927-2018)", bio: "Hungarian-born Canadian Jewish mining magnate." }] });
addEntry(ca, { name: "Onex Corporation", type: "private equity", description: "Canadian private equity firm founded by Gerry Schwartz (Jewish).", website: "https://www.onex.com/", individuals: [{ name: "Gerry Schwartz", role: "Founder & CEO", bio: "Jewish Canadian billionaire, founder and CEO of Onex Corporation. Husband of Heather Reisman (Indigo Books founder)." }] });
addEntry(ca, { name: "Indigo Books & Music", type: "retail", description: "Canada's largest bookstore chain. Founded by Heather Reisman (Jewish).", website: "https://www.chapters.indigo.ca/", individuals: [{ name: "Heather Reisman", role: "Founder & CEO", bio: "Jewish Canadian businesswoman, founder of Indigo Books. Also founded HESEG Foundation supporting lone soldiers in Israel." }] });
addEntry(ca, { name: "Canaccord Genuity", type: "financial services", description: "Canadian investment bank. Jewish president and CEO Dan Daviau.", website: "https://www.canaccordgenuity.com/", individuals: [{ name: "Dan Daviau", role: "CEO", bio: "Jewish CEO of Canaccord Genuity." }] });
addEntry(ca, { name: "Montreal Holocaust Museum", type: "museum", description: "Museum dedicated to educating about the Holocaust and its aftermath.", website: "https://museeholocauste.ca/", individuals: [] });
addEntry(ca, { name: "Vancouver Holocaust Education Centre", type: "museum", description: "Museum and education center in Vancouver.", website: "https://www.vhec.org/", individuals: [] });
addEntry(ca, { name: "Toronto Hebrew Memorial Park", type: "cemetery", description: "Largest Jewish cemetery in Canada.", website: "", individuals: [] });
addEntry(ca, { name: "Canadian Jewish Congress (historical)", type: "community", description: "Historical advocacy organization for Canadian Jews, founded 1919. Merged into CIJA in 2011.", website: "", individuals: [] });

// ============================================================
// AUSTRALIA - MORE
// ============================================================

addEntry(au, { name: "Lowy Institute", type: "think tank", description: "Independent international policy think tank. Founded by Frank Lowy (Jewish, Israeli-Australian).", website: "https://www.lowyinstitute.org/", individuals: [{ name: "Frank Lowy", role: "Founder", bio: "Israeli-Australian co-founder of Westfield, founder of the Lowy Institute." }] });
addEntry(au, { name: "Pratt Foundation", type: "foundation", description: "Major Australian philanthropic foundation established by the Jewish Pratt family.", website: "https://www.prattfoundation.com.au/", individuals: [{ name: "Anthony Pratt", role: "Chairman", bio: "Australia's richest person, Jewish businessman and philanthropist." }] });
addEntry(au, { name: "Visy Industries (Anthony Pratt)", type: "manufacturing", description: "Australia's largest private company, owned by the Jewish Pratt family. Revenue over $5B annually.", website: "https://www.visy.com.au/", individuals: [{ name: "Anthony Pratt", role: "Executive Chairman", bio: "Jewish Australian billionaire, chairman of Visy Industries and Pratt Industries." }] });
addEntry(au, { name: "Meriton (Harry Triguboff)", type: "real estate", description: "Australia's largest residential apartment developer, founded by Harry Triguboff (Jewish).", website: "https://www.meriton.com.au/", individuals: [{ name: "Harry Triguboff", role: "Founder", bio: "Chinese-born Australian Jewish billionaire, Australia's richest property developer." }] });

// ============================================================
// SOUTH AFRICA - MORE
// ============================================================

addEntry(za, { name: "Anglo American (Oppenheimer legacy)", type: "mining", description: "Global mining company historically led by the Oppenheimer family. Founded by Ernest Oppenheimer (Jewish).", website: "https://www.angloamerican.com/", individuals: [{ name: "Ernest Oppenheimer", role: "Founder (1880-1957)", bio: "German-born Jewish South African mining magnate who founded Anglo American." }, { name: "Harry Oppenheimer", role: "Former Chairman (1908-2000)", bio: "Jewish South African, son of Ernest, led Anglo American and De Beers." }] });
addEntry(za, { name: "Liberty Group (Donald Gordon)", type: "financial services", description: "Financial services company founded by Donald Gordon (Jewish).", website: "https://www.liberty.co.za/", individuals: [{ name: "Donald Gordon", role: "Founder (1930-2019)", bio: "Jewish South African insurance billionaire." }] });
addEntry(za, { name: "Johannesburg Holocaust & Genocide Centre", type: "museum", description: "Museum dedicated to Holocaust education in Johannesburg.", website: "https://www.jhbholocaust.co.za/", individuals: [] });
addEntry(za, { name: "King David Schools", type: "education", description: "Network of Jewish day schools in Johannesburg.", website: "https://www.kingdavid.org.za/", individuals: [] });
addEntry(za, { name: "Herzlia School (Cape Town)", type: "education", description: "Jewish day school in Cape Town.", website: "https://www.herzlia.com/", individuals: [] });
addEntry(za, { name: "South African Friends of Israel", type: "advocacy", description: "Pro-Israel advocacy organization in South Africa.", website: "", individuals: [] });

// ============================================================
// BRAZIL - MORE
// ============================================================

addEntry(br, { name: "Banco Safra", type: "banking", description: "Fourth-largest private bank in Brazil. Run by the Safra family, a prominent Lebanese-Jewish banking dynasty.", website: "https://www.safra.com.br/", individuals: [{ name: "Joseph Safra", role: "Former Chairman (1938-2020)", bio: "Lebanese-born Jewish Brazilian billionaire banker." }, { name: "Vicky Safra", role: "Controlling Shareholder", bio: "Jewish widow of Joseph Safra, one of the world's richest women." }] });
addEntry(br, { name: "Museu Judaico de São Paulo", type: "museum", description: "Jewish Museum of São Paulo, opened in 2021 in a historic synagogue.", website: "https://www.museujudaicosp.org.br/", individuals: [] });
addEntry(br, { name: "Congregação Israelita Paulista", type: "synagogue", description: "Largest Jewish congregation in Latin America, based in São Paulo.", website: "https://www.cfrpc.org.br/", individuals: [] });
addEntry(br, { name: "Museu Judaico do Rio de Janeiro", type: "museum", description: "Jewish Museum of Rio de Janeiro.", website: "", individuals: [] });

// ============================================================
// ARGENTINA - MORE
// ============================================================

addEntry(ar, { name: "Grupo Werthein", type: "conglomerate", description: "Major Argentine business group owned by the Werthein family (Jewish). Interests in telecom, finance, real estate.", website: "", individuals: [{ name: "Adrián Werthein", role: "Co-chairman", bio: "Jewish Argentine businessman, co-chairman of Grupo Werthein." }] });
addEntry(ar, { name: "Museo del Holocausto (Buenos Aires)", type: "museum", description: "Holocaust Museum of Buenos Aires.", website: "https://www.museodelholocausto.org.ar/", individuals: [] });
addEntry(ar, { name: "ORT Argentina", type: "education", description: "Argentine branch of World ORT, providing technical education.", website: "https://www.ort.edu.ar/", individuals: [] });
addEntry(ar, { name: "Beit El Congregation (Buenos Aires)", type: "synagogue", description: "Major synagogue in Buenos Aires.", website: "", individuals: [] });
addEntry(ar, { name: "Templo Libertad (Buenos Aires)", type: "synagogue", description: "Historic synagogue in Buenos Aires, built in 1897.", website: "", individuals: [] });

// ============================================================
// RUSSIA - MORE
// ============================================================

addEntry(ru, { name: "LetterOne (Mikhail Fridman)", type: "investment", description: "International investment business founded by Jewish-Ukrainian billionaire Mikhail Fridman.", website: "https://www.letterone.com/", individuals: [{ name: "Mikhail Fridman", role: "Founder", bio: "Ukrainian-born Jewish billionaire, co-founder of Alfa Group and LetterOne." }] });
addEntry(ru, { name: "Russian Aluminum (RUSAL)", type: "metals", description: "World's second-largest aluminum producer. Roman Abramovich (Jewish) was a significant shareholder and instrumental in its formation.", website: "", individuals: [{ name: "Roman Abramovich", role: "Former Major Shareholder", bio: "Jewish Russian-Israeli billionaire, former owner of Chelsea FC." }] });
addEntry(ru, { name: "Yandex (Israeli R&D)", type: "technology", description: "Russia's largest internet company. Has R&D operations in Israel. Co-founded by Arkady Volozh, who is Jewish.", website: "https://www.yandex.com/", individuals: [{ name: "Arkady Volozh", role: "Co-founder", bio: "Kazakh-born Jewish co-founder of Yandex. Now based in Israel." }] });
addEntry(ru, { name: "Synagogue on Bolshaya Bronnaya (Moscow)", type: "synagogue", description: "Historic Choral Synagogue of Moscow.", website: "", individuals: [] });
addEntry(ru, { name: "Grand Choral Synagogue (St. Petersburg)", type: "synagogue", description: "Second largest synagogue in Europe, built in 1893.", website: "", individuals: [] });
addEntry(ru, { name: "GORBI Jewish Heritage Research Group", type: "heritage", description: "Group documenting Jewish heritage sites across the former Soviet Union.", website: "", individuals: [] });

// ============================================================
// ADDITIONAL COUNTRIES - MORE ENTRIES
// ============================================================

// INDIA - MORE
addEntry("India", { name: "Sassoon family legacy", type: "business dynasty (historic)", description: "Iraqi Jewish 'Rothschilds of the East.' Built major business empire in India and East Asia.", website: "", individuals: [{ name: "David Sassoon", role: "Patriarch (1792-1864)", bio: "Baghdadi Jewish businessman who established a vast trade empire in India." }] });
addEntry("India", { name: "Knesset Eliyahoo Synagogue (Mumbai)", type: "synagogue", description: "Beautiful 1884 synagogue in Mumbai, built by the Sassoon family.", website: "", individuals: [] });
addEntry("India", { name: "Paradesi Synagogue (Kochi)", type: "synagogue", description: "Oldest active synagogue in the Commonwealth, built in 1568.", website: "", individuals: [] });
addEntry("India", { name: "Bene Israel Heritage Museum (Mumbai)", type: "museum", description: "Museum documenting the history of India's largest Jewish community.", website: "", individuals: [] });

// MEXICO - MORE
addEntry("Mexico", { name: "Grupo Televisa (Jewish connections)", type: "media", description: "Largest Spanish-language media company. Emilio Azcárraga Jean worked extensively with Jewish media executives.", website: "https://www.televisa.com/", individuals: [] });
addEntry("Mexico", { name: "KidZania", type: "entertainment", description: "Mexican educational entertainment company. Co-founded by Xavier López Ancona with investment from Jewish Mexican investors.", website: "https://www.kidzania.com/", individuals: [] });
addEntry("Mexico", { name: "Colegio Hebreo Maguen David", type: "education", description: "Jewish day school in Mexico City.", website: "", individuals: [] });
addEntry("Mexico", { name: "Museo Memoria y Tolerancia", type: "museum", description: "Museum in Mexico City dedicated to Holocaust memory and tolerance, supported by the Jewish community.", website: "https://www.myt.org.mx/", individuals: [] });

// TURKEY - MORE
addEntry("Turkey", { name: "Neve Shalom Synagogue (Istanbul)", type: "synagogue", description: "Largest Sephardic synagogue in Istanbul, site of multiple terrorist attacks.", website: "", individuals: [] });
addEntry("Turkey", { name: "Ahrida Synagogue (Istanbul)", type: "synagogue", description: "Oldest synagogue in Istanbul, dating to the 15th century.", website: "", individuals: [] });
addEntry("Turkey", { name: "Turkish Jewish Community", type: "community", description: "Sephardic Jewish community descended from Jews expelled from Spain in 1492. Around 15,000 members.", website: "", individuals: [] });

// HUNGARY - MORE
addEntry("Hungary", { name: "Raoul Wallenberg Memorial", type: "memorial", description: "Memorials honoring the Swedish diplomat who saved tens of thousands of Hungarian Jews.", website: "", individuals: [] });
addEntry("Hungary", { name: "Shoes on the Danube Bank", type: "memorial", description: "Memorial to Jews shot into the Danube during WWII.", website: "", individuals: [] });
addEntry("Hungary", { name: "Hungarian Jewish Heritage Foundation", type: "heritage", description: "Organization preserving Jewish cultural heritage in Hungary.", website: "", individuals: [] });
addEntry("Hungary", { name: "ORT Hungary", type: "education", description: "Hungarian branch of World ORT.", website: "", individuals: [] });

// NETHERLANDS - MORE
addEntry("Netherlands", { name: "National Holocaust Museum (Amsterdam)", type: "museum", description: "New museum in a former nursery used to smuggle Jewish children to safety during WWII.", website: "https://www.nationaalholocaustmuseum.nl/", individuals: [] });
addEntry("Netherlands", { name: "Westerbork Transit Camp Memorial", type: "memorial", description: "Memorial at the site of the transit camp from which 102,000 Jews were deported.", website: "https://www.kampwesterbork.nl/", individuals: [] });

// POLAND - MORE
addEntry("Poland", { name: "Galicia Jewish Museum (Krakow)", type: "museum", description: "Museum commemorating the Jewish culture of Polish Galicia.", website: "https://galiciajewishmuseum.org/", individuals: [] });
addEntry("Poland", { name: "Museum of the History of Polish Jews (POLIN) - additional programs", type: "museum", description: "Extensive community and education programs at POLIN.", website: "", individuals: [] });
addEntry("Poland", { name: "Majdanek State Museum", type: "memorial", description: "Memorial at the former Nazi concentration camp.", website: "https://www.majdanek.eu/", individuals: [] });
addEntry("Poland", { name: "Treblinka Memorial", type: "memorial", description: "Memorial at the site of the Treblinka extermination camp where 800,000+ Jews were murdered.", website: "", individuals: [] });
addEntry("Poland", { name: "Warsaw Ghetto Memorial", type: "memorial", description: "Monument commemorating the Warsaw Ghetto Uprising of 1943.", website: "", individuals: [] });
addEntry("Poland", { name: "Tykocin Synagogue", type: "synagogue/historic", description: "One of the best-preserved Baroque synagogues in Poland, now a museum.", website: "", individuals: [] });

// UKRAINE - MORE
addEntry("Ukraine", { name: "Uman (Breslov pilgrimage)", type: "religious site", description: "City in Ukraine visited annually by 30,000+ Hasidic Jewish pilgrims to the grave of Rabbi Nachman of Breslov.", website: "", individuals: [{ name: "Rabbi Nachman of Breslov", role: "Founder of Breslov Hasidism (1772-1810)", bio: "Hasidic master buried in Uman, Ukraine." }] });
addEntry("Ukraine", { name: "Menorah Center (Dnipro)", type: "community center", description: "Largest Jewish community center in the world, a 7-tower complex in Dnipro.", website: "", individuals: [] });
addEntry("Ukraine", { name: "Golden Rose Synagogue (Lviv, ruins)", type: "historic site", description: "Ruins of a 16th-century synagogue in Lviv, now a memorial.", website: "", individuals: [] });

// ITALY - MORE
addEntry("Italy", { name: "Venice Ghetto", type: "historic site", description: "The original 'ghetto' - the first enforced Jewish quarter in Europe, established 1516.", website: "", individuals: [] });
addEntry("Italy", { name: "Synagogue of Florence (Tempio Maggiore)", type: "synagogue", description: "One of the largest synagogues in Southern Europe, built in Moorish Revival style in 1882.", website: "", individuals: [] });
addEntry("Italy", { name: "Jewish Museum of Bologna", type: "museum", description: "Museum of Jewish history in Bologna.", website: "", individuals: [] });
addEntry("Italy", { name: "Community of Sant'Egidio - Jewish dialogue", type: "interfaith", description: "Catholic community with deep Jewish-Christian dialogue programs.", website: "", individuals: [] });

// SPAIN - MORE
addEntry("Spain", { name: "Federation of Jewish Communities of Spain (additional)", type: "community", description: "Umbrella organization. Spain passed a 2015 law offering citizenship to Sephardic Jewish descendants.", website: "", individuals: [] });
addEntry("Spain", { name: "Córdoba Synagogue", type: "synagogue/historic", description: "14th-century synagogue, one of only three medieval synagogues remaining in Spain.", website: "", individuals: [] });
addEntry("Spain", { name: "Casa Sefarad-Israel (Madrid)", type: "cultural center", description: "Center promoting Sephardic heritage and Israel-Spain relations.", website: "", individuals: [] });

// JAPAN - MORE
addEntry("Japan", { name: "Sugihara Museum (Yaotsu)", type: "museum", description: "Museum honoring Chiune Sugihara, the Japanese diplomat who saved 6,000 Lithuanian Jews in WWII.", website: "", individuals: [{ name: "Chiune Sugihara", role: "Righteous Among the Nations (1900-1986)", bio: "Japanese diplomat who issued visas saving thousands of Jews." }] });
addEntry("Japan", { name: "Kobe Jewish Community", type: "community", description: "Historic community - Kobe was a refuge for Jewish refugees in WWII.", website: "", individuals: [] });

// CHINA - MORE
addEntry("China", { name: "Sassoon House (Shanghai)", type: "historic building", description: "Art Deco hotel on the Bund, built by the Sassoon Jewish family.", website: "", individuals: [] });
addEntry("China", { name: "Ohel Rachel Synagogue (Shanghai)", type: "synagogue", description: "Historic synagogue built by the Sassoon family in 1920.", website: "", individuals: [] });

// UAE - MORE
addEntry("United Arab Emirates", { name: "Abrahamic Family House (Abu Dhabi)", type: "interfaith", description: "Complex housing a mosque, church, and synagogue promoting interfaith dialogue, opened 2023.", website: "", individuals: [] });
addEntry("United Arab Emirates", { name: "Kosher restaurants and community in Dubai", type: "community/dining", description: "Growing kosher dining and community infrastructure following the Abraham Accords.", website: "", individuals: [] });

// MOROCCO - MORE
addEntry("Morocco", { name: "Bayt Dakira (House of Memory, Essaouira)", type: "museum/community center", description: "Jewish heritage center in Essaouira opened by King Mohammed VI in 2020.", website: "", individuals: [] });
addEntry("Morocco", { name: "Casablanca Jewish Heritage Trail", type: "heritage", description: "Tour of historic Jewish sites in Casablanca including synagogues, cemeteries, and the mellah.", website: "", individuals: [] });
addEntry("Morocco", { name: "Rabbi Haim Pinto Synagogue (Essaouira)", type: "synagogue", description: "Active synagogue and pilgrimage site in Essaouira.", website: "", individuals: [] });

// ETHIOPIA - MORE
addEntry("Ethiopia", { name: "North Shewa Synagogue", type: "synagogue/heritage", description: "Historic synagogue area of the Beta Israel community.", website: "", individuals: [] });
addEntry("Ethiopia", { name: "Operation Solomon Memorial", type: "memorial", description: "Commemoration of the 1991 airlift that brought 14,325 Ethiopian Jews to Israel in 36 hours.", website: "", individuals: [] });

// BAHRAIN - MORE
addEntry("Bahrain", { name: "Ambassador Houda Nonoo legacy", type: "diplomatic", description: "In 2008, Bahrain appointed Houda Nonoo - a Jewish woman - as its ambassador to the US.", website: "", individuals: [{ name: "Houda Nonoo", role: "Former Ambassador", bio: "Jewish Bahraini woman who served as Bahrain's ambassador to the US." }] });

// SWEDEN - MORE
addEntry("Sweden", { name: "Raoul Wallenberg Institute", type: "research/human rights", description: "Human rights institution named after the Swedish diplomat who saved Hungarian Jews.", website: "https://rwi.lu.se/", individuals: [{ name: "Raoul Wallenberg", role: "Namesake (1912-1947?)", bio: "Swedish diplomat who saved tens of thousands of Hungarian Jews." }] });
addEntry("Sweden", { name: "Great Synagogue of Stockholm", type: "synagogue", description: "Main synagogue in Stockholm, built in 1870.", website: "", individuals: [] });

// DENMARK - MORE
addEntry("Denmark", { name: "Danish Jewish Museum (Copenhagen)", type: "museum", description: "Museum designed by Daniel Libeskind documenting Danish Jewish history, including the rescue of Danish Jews in 1943.", website: "", individuals: [{ name: "Daniel Libeskind", role: "Architect", bio: "Jewish-Polish-American architect who designed the museum." }] });
addEntry("Denmark", { name: "Rescue of Danish Jews (1943)", type: "historic event", description: "The Danish resistance helped evacuate 7,220 of Denmark's 7,800 Jews to neutral Sweden in October 1943.", website: "", individuals: [] });

// NORWAY - MORE
addEntry("Norway", { name: "Center for Studies of the Holocaust and Religious Minorities (HL-senteret)", type: "research/museum", description: "Norwegian center for Holocaust education in a former Nazi headquarters.", website: "https://www.hlsenteret.no/", individuals: [] });

// GREECE - MORE
addEntry("Greece", { name: "Holocaust Memorial of Thessaloniki", type: "memorial", description: "Memorial honoring the 50,000 Jews of Thessaloniki murdered in the Holocaust - 96% of the community.", website: "", individuals: [] });
addEntry("Greece", { name: "Romaniote Jewish Community", type: "community", description: "One of the world's oldest Jewish communities, distinct from Ashkenazi and Sephardic traditions.", website: "", individuals: [] });

// CZECH REPUBLIC - MORE  
addEntry("Czech Republic", { name: "Old Jewish Cemetery (Prague)", type: "cemetery/historic", description: "One of the most significant Jewish historical monuments in Europe, dating to the 15th century.", website: "", individuals: [] });
addEntry("Czech Republic", { name: "Pinkas Synagogue (Prague Holocaust Memorial)", type: "memorial", description: "Synagogue whose walls are inscribed with the names of 77,297 Czech and Moravian Jewish Holocaust victims.", website: "", individuals: [] });
addEntry("Czech Republic", { name: "Terezín Memorial", type: "memorial", description: "Memorial at the former Theresienstadt concentration camp and ghetto.", website: "https://www.pamatnik-terezin.cz/", individuals: [] });

// AUSTRIA - MORE
addEntry("Austria", { name: "Mauthausen Memorial", type: "memorial", description: "Memorial at the former Mauthausen concentration camp.", website: "https://www.mauthausen-memorial.org/", individuals: [] });
addEntry("Austria", { name: "Sigmund Freud Museum (Vienna)", type: "museum", description: "Museum in the former office and home of Sigmund Freud.", website: "https://www.freud-museum.at/", individuals: [{ name: "Sigmund Freud", role: "Founder of Psychoanalysis (1856-1939)", bio: "Austrian Jewish neurologist who founded psychoanalysis." }] });
addEntry("Austria", { name: "Stadttempel (Vienna City Temple)", type: "synagogue", description: "Only synagogue in Vienna to survive Kristallnacht, as it was hidden within an apartment block.", website: "", individuals: [] });

// BELGIUM - MORE
addEntry("Belgium", { name: "Jewish Museum of Belgium (Brussels)", type: "museum", description: "Museum dedicated to Belgian Jewish history. Site of a terrorist attack in 2014.", website: "https://www.mjb-jmb.org/", individuals: [] });
addEntry("Belgium", { name: "Kazerne Dossin Memorial (Mechelen)", type: "memorial", description: "Holocaust museum and memorial at the site from which 25,000+ Jews were deported to Auschwitz.", website: "https://www.kazernedossin.eu/", individuals: [] });
addEntry("Belgium", { name: "Antwerp Jewish Community", type: "community", description: "One of the largest and most visible Orthodox Jewish communities in Europe.", website: "", individuals: [] });

// SWITZERLAND - MORE
addEntry("Switzerland", { name: "Bergier Commission legacy", type: "historical", description: "Independent commission that investigated Swiss dealings with Nazi Germany, including dormant Jewish bank accounts.", website: "", individuals: [] });
addEntry("Switzerland", { name: "International Committee of the Red Cross (Jewish relationship)", type: "international", description: "The ICRC's controversial wartime record regarding the Holocaust led to major institutional reforms.", website: "", individuals: [] });

// INTERNATIONAL - MORE
addEntry("International", { name: "March of the Living", type: "educational program", description: "Annual educational program bringing people from around the world to Poland and Israel to study the Holocaust.", website: "https://motl.org/", individuals: [] });
addEntry("International", { name: "Limmud International", type: "education", description: "Jewish educational conferences held in 40+ countries worldwide.", website: "https://limmud.org/", individuals: [] });
addEntry("International", { name: "Keren Hayesod - United Israel Appeal", type: "fundraising", description: "Major international fundraising organization for Israel, operating in 45+ countries.", website: "https://www.kfrfrpc.org.il/", individuals: [] });
addEntry("International", { name: "World Mizrachi", type: "religious zionist", description: "International Religious Zionist organization.", website: "https://mizrachi.org/", individuals: [] });
addEntry("International", { name: "International March of the Living", type: "commemoration", description: "Annual march from Auschwitz to Birkenau on Yom HaShoah.", website: "", individuals: [] });
addEntry("International", { name: "Aleph Institute", type: "chaplaincy/social services", description: "Jewish organization providing support to military personnel, prisoners, and their families.", website: "https://www.aleph-institute.org/", individuals: [] });
addEntry("International", { name: "Shalom Hartman Institute", type: "research/education", description: "Jewish research and education institute in Jerusalem and North America.", website: "https://www.hartman.org.il/", individuals: [{ name: "Donniel Hartman", role: "President", bio: "Jewish philosopher and president of the Hartman Institute." }] });
addEntry("International", { name: "Aish HaTorah", type: "educational/outreach", description: "International Orthodox Jewish outreach organization headquartered in Jerusalem.", website: "https://www.aish.com/", individuals: [] });
addEntry("International", { name: "Ohr Somayach", type: "yeshiva/outreach", description: "International network of yeshivas for Jewish outreach.", website: "https://ohr.edu/", individuals: [] });
addEntry("International", { name: "JDC (American Jewish Joint Distribution Committee) - Global", type: "humanitarian", description: "Active in 70+ countries providing disaster relief, community development, and Jewish community building.", website: "https://www.jdc.org/", individuals: [] });

// ============================================================
// Write updated files
// ============================================================

fs.writeFileSync(jewishFile, JSON.stringify(data, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));

const countryCount = Object.keys(data.countries).length;
const entryCount = Object.values(data.countries).reduce((s, e) => s + e.length, 0);
const personCount = Object.keys(people.people).length;

console.log(`\nExpansion 2 complete!`);
console.log(`Total: ${entryCount} entries across ${countryCount} countries/regions, and ${personCount} people.`);
console.log(`\nTop countries:`);
Object.entries(data.countries)
  .map(([c, e]) => [c, e.length])
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .forEach(([c, n]) => console.log(`  ${c}: ${n} entries`));
