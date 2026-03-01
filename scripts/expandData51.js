/**
 * expandData51.js – Epstein Network Expansion Phase 4
 *
 * The black book had 1,571 entries. Court documents unsealed in 2024
 * revealed 170+ additional names. Flight logs documented hundreds of
 * passengers. This phase targets remaining major documented names.
 *
 * Categories covered:
 * - Remaining black book names (real estate, sports, philanthropy, socialites)
 * - Additional flight log passengers
 * - 2024 unsealed document names (John/Jane Does identified)
 * - Epstein's financial structure (shell companies, tax schemes)
 * - Additional Caribbean / USVI connections
 * - New Mexico / Zorro Ranch connections
 * - More French connections (Paris apartment, modeling)
 * - Additional Israeli connections (Carbyne, tech, intelligence)
 * - Institutional enablers (foundations, universities, banks)
 * - More sports figures, chefs, doctors, architects
 * - Political donors and operatives
 * - Additional victims who came forward post-2019
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

const entries = [

  // ================================================================
  // BLACK BOOK  -  REMAINING MAJOR NAMES (Sports, Real Estate, Society)
  // ================================================================
  ['rupert-murdoch-ep', 'Rupert Murdoch', 'Australian-born American media mogul. Founder of News Corp, Fox News, and 21st Century Fox. Named in Epstein\'s black book with multiple contact numbers including homes in New York, London, Los Angeles, and his ranch. One of the most powerful media figures in the world. His ex-wife Wendi Deng and son James Murdoch were also listed.'],
  ['donald-newhouse', 'Donald Newhouse', 'American billionaire. Co-owner of Advance Publications (Conde Nast, Reddit, Discovery). Named in Epstein\'s black book. One of the wealthiest and most reclusive media owners in America.'],
  ['si-newhouse', 'Si Newhouse', 'American publishing magnate (1927-2017). Chairman of Advance Publications and Conde Nast. Named in Epstein\'s black book. Oversaw Vanity Fair, GQ, The New Yorker, Vogue, and Wired.'],
  ['les-moonves-ep2', 'Les Moonves Detail', 'SKIP'],
  ['rupert-loewenstein', 'Prince Rupert Loewenstein', 'German-British financier (1933-2014). Financial manager for the Rolling Stones for decades. Named in Epstein\'s black book. Part of the European aristocratic circle.'],
  ['ghislaine-friend-carol', 'Carol Mack', 'Socialite and friend of Ghislaine Maxwell. Named in multiple Epstein-related testimonies as someone who socialized with Maxwell and attended her events.'],

  // BLACK BOOK  -  SPORTS
  ['ehud-laniado-sport', 'Sport Section', 'SKIP'],
  ['mark-messier', 'Mark Messier', 'Canadian former professional ice hockey player. Named in Epstein\'s black book. One of the greatest hockey players in history.'],
  ['andre-agassi', 'Andre Agassi', 'American former professional tennis player. Named in Epstein\'s black book. One of the greatest tennis players of all time.'],
  ['john-mcenroe', 'John McEnroe', 'American former professional tennis player and commentator. Named in Epstein\'s black book.'],
  ['jean-claude-killy', 'Jean-Claude Killy', 'French former alpine ski racer. Triple Olympic gold medalist. Named in Epstein\'s black book as part of European sports connections.'],
  ['pat-riley', 'Pat Riley', 'American professional basketball coach and president of the Miami Heat. Named in Epstein\'s black book through the Palm Beach/Miami social scene.'],

  // BLACK BOOK  -  MORE BILLIONAIRES & BUSINESS
  ['david-martinez', 'David Martinez', 'Mexican billionaire and hedge fund manager. Founder of Fintech Advisory. Named in Epstein\'s black book.'],
  ['peter-morton', 'Peter Morton', 'American entrepreneur. Co-founder of Hard Rock Cafe. Named in Epstein\'s black book.'],
  ['steve-wynn', 'Steve Wynn', 'American billionaire casino developer. Former CEO of Wynn Resorts. Named in Epstein\'s black book. Later faced his own sexual misconduct allegations and resigned from Wynn Resorts in 2018.'],
  ['howard-schultz', 'Howard Schultz', 'American businessman. Former CEO of Starbucks. Named in Epstein\'s black book.'],
  ['tommy-hilfiger-ep', 'Tommy Hilfiger', 'American fashion designer. Founder of Tommy Hilfiger Corporation. Named in Epstein\'s black book.'],
  ['rupert-johnson', 'Rupert Johnson Jr.', 'American billionaire investor. Vice Chairman of Franklin Templeton Investments. Named in Epstein\'s black book.'],
  ['leonard-lauder', 'Leonard Lauder', 'American billionaire businessman. Chairman Emeritus of Estee Lauder Companies. Named in Epstein\'s black book. Brother of Ronald Lauder.'],
  ['ronald-lauder-ep', 'Ronald Lauder', 'American billionaire businessman and diplomat. Former US Ambassador to Austria. President of the World Jewish Congress. Named in Epstein\'s contacts. Brother of Leonard Lauder. His family\'s Neue Galerie is on the same block as Epstein\'s Manhattan townhouse.'],
  ['jeff-greene', 'Jeff Greene', 'American billionaire real estate developer and politician. Named in Epstein\'s contacts. Admitted flying on Epstein\'s plane with young women before running for office.'],
  ['samuel-waksal', 'Samuel Waksal', 'American businessman. Former CEO of ImClone Systems. Convicted of insider trading. Named in Epstein\'s contacts.'],
  ['david-geffen-detail', 'Geffen Detail', 'SKIP'],
  ['mort-mandel', 'Mort Mandel', 'American billionaire businessman and philanthropist (1921-2019). Co-founder of Premier Industrial Corporation. Named in Epstein\'s contacts through philanthropic circles.'],
  ['leon-charney', 'Leon Charney', 'American real estate investor and media figure (1938-2016). Named in Epstein\'s contacts. Also known for Middle East peace efforts.'],
  ['steven-roth', 'Steven Roth', 'American billionaire real estate developer. Chairman of Vornado Realty Trust. Named in Epstein\'s black book.'],
  ['charles-kushner', 'Charles Kushner', 'American real estate developer. Father of Jared Kushner. Convicted of tax evasion and witness tampering. Named in Epstein\'s contacts through New York real estate circles. Pardoned by Trump in 2020.'],
  ['howard-lutnick-ep', 'Howard Lutnick', 'American businessman. Chairman and CEO of Cantor Fitzgerald. Named in Epstein\'s black book.'],

  // BLACK BOOK  -  MORE SOCIALITIES / NY SCENE
  ['denise-rich', 'Denise Rich', 'American songwriter and socialite. Ex-wife of Marc Rich (whose Clinton pardon was controversial). Named in Epstein\'s black book. Major Democratic Party fundraiser.'],
  ['blaine-trump', 'Blaine Trump', 'American socialite. Former wife of Robert Trump (Donald\'s brother). Named in Epstein\'s black book. Part of the New York social elite.'],
  ['marla-maples', 'Marla Maples', 'American actress and television personality. Second wife of Donald Trump. Named in Epstein\'s contacts.'],
  ['stephanie-powers', 'Stefanie Powers', 'American actress. Named in Epstein\'s black book.'],
  ['brooke-shields-ep', 'Brooke Shields', 'American actress and model. Named in Epstein\'s black book.'],
  ['carol-alt-detail', 'Alt Detail', 'SKIP'],
  ['daisy-fuentes-ep', 'Daisy Fuentes', 'Cuban-American television host and model. Named in Epstein\'s black book.'],
  ['phyllis-george', 'Phyllis George', 'American sportscaster and former Miss America (1949-2020). Named in Epstein\'s black book.'],
  ['debbie-von-bismarck', 'Countess Debbie von Bismarck', 'American-born socialite married into the Bismarck family. Named in Epstein\'s black book. Part of the European aristocratic social scene connected to Maxwell.'],

  // ================================================================
  // ADDITIONAL FLIGHT LOG PASSENGERS
  // ================================================================
  ['alan-dershowitz-flights', 'Dershowitz Flights', 'SKIP'],
  ['larry-summers-trip', 'Summers Trip', 'SKIP'],
  ['naomi-campbell-passeng', 'Campbell Log', 'SKIP'],
  ['cindy-lopez', 'Cindy Lopez', 'Former associate of Ghislaine Maxwell. Appeared on Epstein flight logs multiple times. Described in victim testimony as having been present during trafficking activities.'],
  ['kelly-bovino', 'Kelly Bovino', 'Named on Epstein flight logs. Appeared as a frequent passenger on the Lolita Express during the late 1990s and early 2000s.'],
  ['teala-davies', 'Teala Davies', 'Epstein victim who was recruited as a teenager. Filed civil claims against the Epstein estate. Founded a non-profit to help trafficking survivors. Has spoken publicly about systemic failures that enabled Epstein.'],

  // ================================================================
  // 2024 DOCUMENT UNSEALING  -  Identified Does
  // ================================================================
  ['doe-36', 'Bill Cosby', 'American comedian and actor. Identified as Doe 36 in 2024 Epstein document unsealing. Named by Virginia Giuffre in a list of people Epstein associated with. Cosby denied any connection. Already convicted separately of sexual assault (conviction later overturned on procedural grounds).'],
  ['doe-73', 'Michael Jackson (Doe 73)', 'SKIP'],
  ['doe-unnamed-prince', 'Prince Andrew Docs', 'SKIP'],
  ['doe-147', 'David Copperfield (Doe 147)', 'SKIP'],
  ['doe-marvin', 'Marvin Minsky Docs', 'SKIP'],
  ['doe-academics', 'Academic Does', 'SKIP'],
  ['tom-pritzker-doe', 'Tom Pritzker Doe', 'SKIP'],
  ['glenn-dubin-doe', 'Dubin Doe', 'SKIP'],
  ['stephen-kaufmann-detail', 'Kaufmann Detail', 'SKIP'],

  // ================================================================
  // ISRAELI CONNECTIONS / INTELLIGENCE / TECH
  // ================================================================
  ['ehud-barak-carbyne', 'Barak Carbyne', 'SKIP'],
  ['paul-singer', 'Paul Singer', 'American billionaire hedge fund manager. Founder of Elliott Management. Named in Epstein\'s contacts through Republican donor and Israeli philanthropic networks. Major supporter of Israeli causes.'],
  ['naftali-bennett', 'Naftali Bennett', 'Former Prime Minister of Israel. Connected through overlapping Israeli tech and political circles that Epstein cultivated, particularly through Ehud Barak and the Carbyne venture.'],
  ['robert-maxwell-mossad', 'Maxwell Mossad', 'SKIP'],
  ['rafi-eitan', 'Rafi Eitan', 'Israeli intelligence officer (1926-2019). Former head of LAKAM, the Israeli scientific intelligence unit. Handler of spy Jonathan Pollard. Named by investigative journalists as having links to the Robert Maxwell intelligence network that some believe was connected to Epstein.'],
  ['oren-rosen', 'Oren Rosen', 'SKIP'],

  // ================================================================
  // FRENCH CONNECTIONS
  // ================================================================
  ['claude-dubarry', 'Claude DuBarry', 'SKIP'],
  ['jean-luc-brunel-paris', 'Brunel Paris Detail', 'SKIP'],
  ['thierry-mugler', 'Thierry Mugler', 'French fashion designer (1948-2022). Named in Epstein\'s contacts through Paris fashion connections.'],
  ['karl-lagerfeld-ep', 'Karl Lagerfeld', 'German fashion designer (1933-2019). Creative director of Chanel. Named in Epstein\'s contacts. One of the most influential fashion figures of the 20th and 21st centuries.'],
  ['jean-paul-gaultier', 'Jean-Paul Gaultier', 'French fashion designer. Named in Epstein\'s contacts through Paris social circles.'],
  ['alain-delon', 'Alain Delon', 'French actor (1935-2024). One of the most famous French actors. Named in Epstein\'s black book among Paris contacts.'],
  ['nicolas-sarkozy-ep', 'Nicolas Sarkozy', 'Former President of France (2007-2012). Named in Epstein\'s contacts. Part of the political elite that Epstein cultivated international connections with.'],
  ['carla-bruni', 'Carla Bruni', 'Italian-French supermodel and singer. Wife of Nicolas Sarkozy. Named in Epstein\'s black book.'],
  ['princess-olga', 'Princess Olga of Greece', 'Member of the Greek royal family. Named in Epstein\'s contacts as part of European royalty connections.'],

  // ================================================================
  // CARIBBEAN / USVI / ISLAND CONNECTIONS
  // ================================================================
  ['cecile-de-jongh-detail2', 'Cecile Detail 2', 'SKIP'],
  ['ken-mapp', 'Kenneth Mapp', 'Former Governor of the U.S. Virgin Islands (2015-2019). Succeeded John de Jongh. The USVI government under his administration continued to provide tax benefits to Epstein\'s companies despite his sex offender status.'],
  ['albert-bryan-jr', 'Albert Bryan Jr.', 'Governor of the U.S. Virgin Islands (2019-present). Under his administration, the USVI filed the landmark lawsuit against Epstein\'s estate and later against JPMorgan and Deutsche Bank.'],
  ['epstein-island-workers', 'Island Workers', 'SKIP'],
  ['cathy-alexander', 'Cathy Alexander', 'Administrative assistant who worked for Epstein\'s Southern Trust Company in the U.S. Virgin Islands. Testified about the company\'s operations and Epstein\'s activities on the islands.'],

  // ================================================================
  // NEW MEXICO / ZORRO RANCH
  // ================================================================
  ['bill-richardson-nm', 'Richardson NM Detail', 'SKIP'],
  ['ranch-workers', 'Ranch Workers', 'SKIP'],
  ['eva-andersson-ranch', 'Eva Ranch', 'SKIP'],

  // ================================================================
  // MORE WALL STREET / PRIVATE EQUITY
  // ================================================================
  ['alan-howard', 'Alan Howard', 'British billionaire hedge fund manager. Co-founder of Brevan Howard. Named in Epstein\'s contacts.'],
  ['daniel-och', 'Daniel Och', 'American billionaire hedge fund manager. Founder of Och-Ziff Capital Management. Named in Epstein\'s contacts through Wall Street social circles.'],
  ['david-bonderman', 'David Bonderman', 'American billionaire private equity investor (1942-2023). Co-founder of TPG Capital. Named in Epstein\'s contacts.'],
  ['michael-price-ep', 'Michael Price', 'American value investor and hedge fund manager. Named in Epstein\'s black book.'],
  ['andrew-tisch', 'Andrew Tisch', 'American billionaire businessman. Co-chairman of Loews Corporation. Part of the Tisch family. Named in Epstein\'s contacts.'],
  ['larry-tisch', 'Larry Tisch', 'American billionaire businessman (1923-2003). Former CEO of CBS and co-chairman of Loews Corporation. Named in Epstein\'s contacts.'],
  ['jonathan-tisch', 'Jonathan Tisch', 'American billionaire businessman. Co-owner of the New York Giants. Chairman of Loews Hotels. Named in Epstein\'s contacts.'],
  ['joe-lewis-ep', 'Joe Lewis', 'British billionaire businessman. Owner of Tottenham Hotspur FC. Named in Epstein\'s contacts. Later convicted of insider trading in 2023.'],
  ['peter-cohen', 'Peter Cohen', 'American financier. Former CEO of Shearson Lehman Brothers. Named in Epstein\'s contacts.'],
  ['jeffrey-epstein-vi', 'Epstein VI Foundation', 'SKIP'],
  ['james-wolfensohn-ep', 'James Wolfensohn', 'Australian-American banker (1933-2020). Former President of the World Bank. Named in Epstein\'s contacts.'],

  // ================================================================
  // POLITICAL OPERATIVES / DONORS
  // ================================================================
  ['terry-mcauliffe', 'Terry McAuliffe', 'American politician and businessman. Former Governor of Virginia and DNC Chairman. Named in Epstein\'s contacts through Clinton political circles.'],
  ['john-podesta', 'John Podesta', 'American political consultant. White House Chief of Staff under Clinton, counselor to Obama, senior adviser to Biden. Named in Epstein\'s contacts.'],
  ['george-soros-ep', 'George Soros Details', 'SKIP'],
  ['david-rockefeller', 'David Rockefeller', 'American banker and philanthropist (1915-2017). Former chairman of Chase Manhattan Bank. Named in Epstein\'s contacts. Last surviving grandson of John D. Rockefeller.'],
  ['laurance-rockefeller', 'Laurance Rockefeller', 'American businessman, philanthropist, and conservationist (1910-2004). Named in Epstein\'s contacts. Grandson of John D. Rockefeller.'],
  ['lynn-de-rothschild-detail', 'Lynn Detail', 'SKIP'],
  ['pamela-harriman', 'Pamela Harriman', 'British-born American political figure and diplomat (1920-1997). U.S. Ambassador to France. Named in Epstein\'s contacts (pre-mortem entries). Major Democratic fundraiser.'],

  // ================================================================
  // ADDITIONAL TV / FILM PERSONALITIES
  // ================================================================
  ['charlie-sheen', 'Charlie Sheen', 'American actor. Named in Epstein\'s contacts.'],
  ['bob-hope-ep', 'Bob Hope', 'SKIP'],
  ['clint-eastwood-ep', 'Clint Eastwood', 'American actor and filmmaker. Named in Epstein\'s contacts.'],
  ['john-travolta-ep', 'John Travolta', 'American actor and pilot. Named in Epstein\'s black book.'],
  ['oprah-winfrey-ep', 'Oprah Winfrey', 'American talk show host, media executive, and billionaire. Named in Epstein\'s contacts.'],
  ['steven-spielberg-ep', 'Steven Spielberg', 'American filmmaker. Named in Epstein\'s contacts. Director of Schindler\'s List, Jaws, E.T., and many more. One of the most successful filmmakers in history.'],
  ['george-lucas-ep', 'George Lucas', 'American filmmaker. Creator of Star Wars and Indiana Jones. Named in Epstein\'s contacts.'],
  ['ron-howard-ep', 'Ron Howard', 'American filmmaker and actor. Director and producer. Named in Epstein\'s contacts through Brian Grazer\'s Imagine Entertainment.'],
  ['mike-nichols', 'Mike Nichols', 'German-American film and theater director (1931-2014). Director of The Graduate. Named in Epstein\'s black book. Husband of Diane Sawyer (also in book).'],
  ['barbara-streisand-ep', 'Barbra Streisand', 'American singer, actress, and filmmaker. Named in Epstein\'s contacts.'],
  ['joan-collins-ep', 'Joan Collins', 'British-American actress. Star of Dynasty. Named in Epstein\'s black book.'],
  ['michael-douglas-ep', 'Michael Douglas', 'American actor and producer. Named in Epstein\'s contacts.'],
  ['catherine-zeta-jones-ep', 'Catherine Zeta-Jones', 'Welsh actress. Named in Epstein\'s contacts alongside husband Michael Douglas.'],

  // ================================================================
  // ADDITIONAL MUSICIANS
  // ================================================================
  ['paul-mccartney-ep', 'Paul McCartney', 'British musician. Member of the Beatles. Named in Epstein\'s black book. Father of Stella McCartney (also listed).'],
  ['eric-clapton-ep', 'Eric Clapton', 'British musician and guitarist. Named in Epstein\'s black book.'],
  ['mick-fleetwood-ep', 'Mick Fleetwood', 'British musician. Co-founder of Fleetwood Mac. Named in Epstein\'s contacts.'],
  ['rod-stewart-ep', 'Rod Stewart', 'British-American singer. Named in Epstein\'s black book.'],
  ['sting-ep', 'Sting', 'British musician. Former lead singer of The Police. Named in Epstein\'s contacts.'],
  ['bono-ep', 'Bono', 'Irish musician. Lead singer of U2. Named in Epstein\'s contacts.'],
  ['david-geffen-music', 'Geffen Music', 'SKIP'],

  // ================================================================
  // CHEFS / RESTAURANTS / HOSPITALITY
  // ================================================================
  ['adam-dell', 'Adam Dell', 'American venture capitalist. Brother of Michael Dell. Named in Epstein\'s contacts.'],
  ['nello-balan', 'Nello Balan', 'Italian-born New York restaurateur. Owner of Nello restaurant on Madison Avenue, a power spot frequented by Epstein and his social circle.'],

  // ================================================================
  // ARCHITECTS / DESIGNERS
  // ================================================================
  ['peter-marino', 'Peter Marino', 'American architect. Known for designing luxury retail stores (Louis Vuitton, Chanel, Dior). Named in Epstein\'s contacts through New York social and real estate circles.'],
  ['thierry-despont', 'Thierry Despont', 'French-American architect and designer. Designed interiors for some of the world\'s wealthiest people. Named in Epstein\'s contacts.'],

  // ================================================================
  // ADDITIONAL DOCTORS / MEDICAL
  // ================================================================
  ['dr-howard-tucker', 'Howard Tucker', 'SKIP'],
  ['mark-epstein-apts', 'Mark Epstein Apts', 'SKIP'],

  // ================================================================
  // VICTIMS COMPENSATION FUND / ESTATE
  // ================================================================
  ['jordana-friedman', 'Jordana Friedman', 'Managed victims\' claims for the Epstein Victims\' Compensation Fund administered by Kenneth Feinberg. The fund paid out over $121 million to more than 135 claimants.'],
  ['ken-feinberg', 'Kenneth Feinberg', 'American attorney. Special Master who administered the Jeffrey Epstein Victims\' Compensation Fund. Previously administered the 9/11 Victim Compensation Fund and BP oil spill fund. The Epstein fund paid out approximately $121 million to over 135 claimants before closing.'],

  // ================================================================
  // ADDITIONAL POLITICAL FIGURES
  // ================================================================
  ['bob-menendez', 'Bob Menendez', 'American politician. U.S. Senator from New Jersey. Named in Epstein\'s contacts. Later convicted of corruption charges in 2024 in an unrelated case.'],
  ['barney-frank', 'Barney Frank', 'American politician. Former U.S. Representative from Massachusetts. Named in Epstein\'s contacts.'],
  ['joe-biden-ep', 'Joe Biden', 'SKIP'],
  ['mick-mulvaney', 'Mick Mulvaney', 'SKIP'],
  ['mike-pence-ep', 'Mike Pence', 'SKIP'],

  // ================================================================
  // ADDITIONAL BRITISH ESTABLISHMENT
  // ================================================================
  ['peter-mandelson-detail', 'Mandelson Detail', 'SKIP'],
  ['naomi-campbell-london', 'Campbell London', 'SKIP'],
  ['ghislaine-london-set', 'London Set', 'SKIP'],
  ['mark-cecil', 'Lord Valentine Cecil', 'SKIP'],
  ['prince-michael-kent', 'Prince Michael of Kent', 'British royal and first cousin of Queen Elizabeth II. Named in Epstein\'s contacts. Part of the British royal family circle connected through Prince Andrew and Ghislaine Maxwell.'],
  ['philip-green', 'Sir Philip Green', 'British billionaire businessman. Former chairman of Arcadia Group (Topshop). Named in Epstein\'s contacts. Later faced his own sexual harassment allegations.'],
  ['mohammed-al-fayed', 'Mohamed Al-Fayed', 'Egyptian-born businessman (1929-2023). Former owner of Harrods and Fulham FC. Father of Dodi Fayed. Named in Epstein\'s contacts. After his death, over 100 women came forward with sexual assault allegations against him.'],
  ['evgeny-lebedev', 'Evgeny Lebedev', 'Russian-British media proprietor. Owner of The Independent and London Evening Standard. Son of Russian oligarch Alexander Lebedev. Named in Epstein\'s contacts through London social circles.'],

  // ================================================================
  // ADDITIONAL MODELING INDUSTRY
  // ================================================================
  ['gerald-marie', 'Gerald Marie', 'French model agent. Former head of Elite Model Management in Europe. Accused of rape by multiple models. Close associate of Jean-Luc Brunel. Part of the modeling industry predator network that overlapped with Epstein\'s pipeline. Died 2024.'],
  ['paolo-zampolli', 'Paolo Zampolli', 'Italian-American modeling agent. Founder of ID Model Management. Introduced Melania Knauss to Donald Trump. Named in Epstein\'s contacts through the New York modeling world.'],
  ['naomi-campbell-model', 'Campbell Model', 'SKIP'],

  // ================================================================
  // ADDITIONAL ACADEMICS / UNIVERSITY CONNECTIONS
  // ================================================================
  ['dershowitz-harvard', 'Dersh Harvard', 'SKIP'],
  ['robert-zimmer', 'Robert Zimmer', 'American mathematician (1947-2023). Former President of the University of Chicago. Epstein donated to the university and maintained contacts with its leadership.'],
  ['lee-bollinger', 'Lee Bollinger', 'American attorney and academic. Former President of Columbia University. Named in Epstein\'s contacts.'],
  ['ruth-simmons', 'Ruth Simmons', 'American academic administrator. Former President of Brown University and Prairie View A&M. Named in Epstein\'s contacts through academic philanthropy circles.'],

  // ================================================================
  // NEWS / MEDIA PERSONALITIES (Additional)
  // ================================================================
  ['geraldo-rivera-ep', 'Geraldo Rivera', 'American journalist and talk show host. Named in Epstein\'s contacts.'],
  ['maria-bartiromo', 'Maria Bartiromo', 'American television journalist. Fox Business anchor. Named in Epstein\'s contacts.'],
  ['chris-cuomo-ep', 'Chris Cuomo', 'American television journalist. Former CNN anchor. Named in Epstein\'s contacts through his brother Andrew Cuomo and New York circles.'],
  ['larry-king-ep', 'Larry King', 'American television and radio host (1933-2021). Named in Epstein\'s black book.'],
  ['connie-chung-ep', 'Connie Chung', 'American television journalist. Former CBS and CNN anchor. Named in Epstein\'s contacts.'],
  ['mort-zuckerman-detail', 'Zuckerman Detail', 'SKIP'],

  // ================================================================
  // JPMORGAN / DEUTSCHE BANK ADDITIONAL
  // ================================================================
  ['mary-erdoes-detail', 'Erdoes Detail', 'SKIP'],
  ['jamie-dimon-detail', 'Dimon Detail', 'SKIP'],
  ['anshu-jain', 'Anshu Jain', 'Indian-born British banker (1963-2022). Former Co-CEO of Deutsche Bank. Under his leadership, Deutsche Bank took on Epstein as a client after JPMorgan dropped him in 2013.'],
  ['john-cryan', 'John Cryan', 'British-Australian banker. Former CEO of Deutsche Bank (2015-2018). Under his watch, the bank continued to service Epstein despite increasing red flags.'],

  // ================================================================
  // ADDITIONAL PHILANTHROPY / FOUNDATIONS
  // ================================================================
  ['michael-bloomberg-phil', 'Bloomberg Phil', 'SKIP'],
  ['edgar-bronfman-phil', 'Bronfman Phil', 'SKIP'],
  ['charles-bronfman-ep', 'Charles Bronfman', 'Canadian-American businessman and philanthropist. Co-founder of Birthright Israel. Named in Epstein\'s contacts through Jewish philanthropic circles. Brother of Edgar Bronfman Sr.'],

  // ================================================================
  // MORE REAL ESTATE / PROPERTY
  // ================================================================
  ['andrew-farkas', 'Andrew Farkas', 'American real estate developer. Founder of Island Capital Group. Named in Epstein\'s contacts through New York real estate.'],
  ['ben-lambert', 'Ben Lambert', 'American real estate executive. Named in Epstein\'s black book. Part of New York commercial real estate circles.'],
  ['stephen-ross-detail', 'Ross Detail', 'SKIP'],

  // ================================================================
  // TECH ADDITIONS
  // ================================================================
  ['sergey-brin-detail2', 'Brin Detail 2', 'SKIP'],
  ['niklas-zennstrom', 'Niklas Zennstrom', 'Swedish-born entrepreneur. Co-founder of Skype. Named in Epstein\'s contacts.'],
  ['elon-musk-photo', 'Musk Photo', 'SKIP'],

  // ================================================================
  // ADDITIONAL ART / CULTURE
  // ================================================================
  ['eli-broad', 'Eli Broad', 'American billionaire philanthropist (1933-2021). Co-founded KB Home and SunAmerica. Built the Broad Museum in Los Angeles. Named in Epstein\'s contacts.'],
  ['michael-bloomberg-art-detail', 'Bloomberg Art', 'SKIP'],
  ['francois-de-menil', 'Francois de Menil', 'American architect and art patron. Member of the de Menil family, major art collectors. Named in Epstein\'s contacts.'],
  ['larry-gagosian-detail', 'Gagosian Detail', 'SKIP'],
  ['dakis-joannou', 'Dakis Joannou', 'Cypriot industrialist and art collector. One of the world\'s most prominent contemporary art collectors. Named in Epstein\'s contacts.'],
  ['charles-saatchi', 'Charles Saatchi', 'Iraqi-British businessman and art collector. Co-founder of Saatchi & Saatchi advertising agency. Founder of the Saatchi Gallery. Named in Epstein\'s contacts.'],
  ['david-zwirner', 'David Zwirner', 'German-American art dealer. Founder of the David Zwirner gallery empire. Named in Epstein\'s contacts.'],

  // ================================================================
  // ADDITIONAL INTELLIGENCE / GOVERNMENT CONNECTIONS
  // ================================================================
  ['robert-mueller-detail', 'Mueller Detail', 'SKIP'],
  ['james-clapper', 'James Clapper', 'Former Director of National Intelligence (2010-2017). Broader intelligence community connections to the Epstein case have been investigated by journalists, particularly questions about whether intelligence agencies had knowledge of or involvement in Epstein\'s activities.'],
  ['john-brennan', 'John Brennan', 'Former CIA Director (2013-2017). Questions about intelligence community knowledge of Epstein\'s activities have included the CIA, given Robert Maxwell\'s alleged Mossad connections and claims by Ari Ben-Menashe.'],
  ['william-casey-era', 'Casey Era', 'SKIP'],

  // ================================================================
  // ADDITIONAL VICTIMS WHO CAME FORWARD POST-2019
  // ================================================================
  ['jennifer-araoz', 'Jennifer Araoz', 'Epstein victim and accuser. Testified she was recruited outside her Manhattan high school at age 14 in 2001 and repeatedly abused by Epstein at his townhouse. Filed one of the first lawsuits after New York changed its statute of limitations for sexual assault. Has spoken publicly about her experience, including testifying before Congress.'],
  ['elizabeth-stein-2', 'Elizabeth Stein (Victim)', 'SKIP'],
  ['priscilla-doe-2', 'Priscilla 2', 'SKIP'],
  ['juliette-bryant', 'Juliette Bryant', 'South African model and Epstein victim. Alleged she was trafficked to multiple countries by Epstein and Maxwell. Claimed she was abused at Epstein\'s properties in New York, the Caribbean, and Africa.'],

  // ================================================================
  // CONNECTED SCANDALS / PARALLEL CASES
  // ================================================================
  ['keith-raniere', 'Keith Raniere', 'American cult leader and convicted sex trafficker. Founder of NXIVM. Sentenced to 120 years in prison. Clare Bronfman (daughter of Edgar Bronfman Sr., who was in Epstein\'s black book) was a major NXIVM funder and was also convicted. The NXIVM and Epstein cases exposed overlapping patterns of elite trafficking networks.'],
  ['clare-bronfman', 'Clare Bronfman', 'American-Canadian heiress. Daughter of Edgar Bronfman Sr. (Seagram, WJC - in Epstein\'s black book). Major financial backer of NXIVM cult. Sentenced to over 6 years in federal prison for racketeering in 2020. Her case represented an intersection of two major trafficking scandals.'],
  ['r-kelly-parallel', 'R. Kelly Parallel', 'SKIP'],
  ['peter-nygard-detail', 'Nygard Detail', 'SKIP'],

  // ================================================================
  // ADDITIONAL FAMOUS AUTHORS / INTELLECTUALS
  // ================================================================
  ['elie-wiesel', 'Elie Wiesel', 'Romanian-born American writer, Holocaust survivor, and Nobel laureate (1928-2016). The Elie Wiesel Foundation for Humanity lost $15.2 million invested with Epstein\'s money management  -  the same amount as almost the entire foundation endowment. The loss devastated the foundation.'],
  ['alan-dershowitz-books', 'Dershowitz Books', 'SKIP'],
  ['salman-rushdie-ep', 'Salman Rushdie', 'British-American novelist. Author of "The Satanic Verses." Named in Epstein\'s contacts.'],
  ['tom-wolfe-ep', 'Tom Wolfe', 'American author and journalist (1930-2018). Named in Epstein\'s contacts.'],

  // ================================================================
  // ADDITIONAL INVESTMENT BANKING
  // ================================================================
  ['lloyd-blankfein-detail', 'Blankfein Detail', 'SKIP'],
  ['john-mack', 'John Mack', 'American businessman. Former CEO and Chairman of Morgan Stanley. Named in Epstein\'s contacts.'],
  ['richard-fuld', 'Richard Fuld', 'American banker. Former CEO of Lehman Brothers (led the firm into the largest bankruptcy in US history). Named in Epstein\'s contacts.'],
  ['vikram-pandit', 'Vikram Pandit', 'Indian-American banker. Former CEO of Citigroup. Named in Epstein\'s contacts.'],

  // ================================================================
  // ADDITIONAL FASHION / LUXURY
  // ================================================================
  ['jean-paul-gaultier-detail', 'Gaultier Detail', 'SKIP'],
  ['manolo-blahnik', 'Manolo Blahnik', 'Spanish fashion designer. Creator of luxury shoe brand Manolo Blahnik. Named in Epstein\'s contacts.'],
  ['roberto-cavalli', 'Roberto Cavalli', 'Italian fashion designer (1940-2024). Named in Epstein\'s contacts.'],
  ['randolph-hearst', 'Randolph Hearst', 'SKIP'],
  ['andre-leon-talley', 'Andre Leon Talley', 'American fashion journalist (1948-2022). Former creative director of Vogue. Named in Epstein\'s contacts.'],
];

entries.forEach(([id, name, bio]) => {
  if (bio === 'SKIP') return;
  if (addPerson(id, name, bio)) newPeople++;
});

// ===== BIO UPDATES =====
const bioUpdates = {
  'mort-zuckerman': 'Canadian-American billionaire media proprietor and real estate developer. Co-founded Boston Properties. Former publisher of the New York Daily News and editor-in-chief of U.S. News & World Report. Named in Epstein\'s black book with multiple contact numbers. Part of Epstein\'s inner social circle in New York. Former boyfriend of Ghislaine Maxwell, which was one of the key social connections that helped Epstein access New York elite society.',
  'alan-dershowitz-ind': 'American lawyer and Harvard Law professor emeritus. Part of Epstein\'s defense team that negotiated the 2008 plea deal. Virginia Giuffre accused him of being one of the men she was trafficked to, which he vehemently denied for years. Filed defamation suits and counter-suits. In 2024, Giuffre dropped her lawsuit, saying she "may have made a mistake." Appeared on flight logs. Received a massage at Epstein\'s home (claimed he kept his underwear on). His aggressive public defense of himself and Epstein became one of the most visible aspects of the scandal. Later served on Trump\'s impeachment defense team.',
  'ehud-barak': 'Former Prime Minister of Israel (1999-2001). Close associate of Jeffrey Epstein post-conviction. Co-invested with Epstein in Carbyne, an Israeli emergency call technology company. Photographed entering Epstein\'s Manhattan townhouse in 2016. Admitted to visiting Epstein\'s island and New York home but denied any wrongdoing. Received funding from Epstein-linked entities. Virginia Giuffre named him in court documents. His deep connection to Epstein was one of the most significant international political links in the network.',
  'jean-luc-brunel': 'French modeling agent (1946-2022). Founder of MC2 Model Management, funded by Epstein. Accused by multiple women of sexual abuse and trafficking young models. Arrested in Paris in December 2020 on rape and trafficking charges. Found dead by apparent hanging in his jail cell in February 2022, echoing Epstein\'s death. Former protege of John Casablancas at Elite Model Management. Used the modeling industry as a pipeline to supply Epstein with girls, operating across France, the US, and internationally. Flight logs show him as one of the most frequent passengers on the Lolita Express.',
  'glenn-dubin': 'American billionaire hedge fund manager. Co-founder of Highbridge Capital Management. One of Epstein\'s closest friends for over 20 years. Virginia Giuffre alleged she was trafficked to Dubin. His wife Eva Andersson-Dubin (former Miss Sweden and Epstein\'s ex-girlfriend) was named as a backup executor of Epstein\'s will. The Dubins\' au pair was allegedly sent to Epstein for "training." Dubin denied all allegations. Named in both the black book and flight logs.',
};

for (const [id, bio] of Object.entries(bioUpdates)) {
  if (pd.people[id] && bio.length > (pd.people[id].bio || '').length) {
    pd.people[id].bio = bio;
  }
}

// ===== UPDATE EPSTEIN ENTRY =====
const usEntries = jd.countries['United States'];
const epIdx = usEntries.findIndex(e => e.id === 'epstein-network');
const epEntry = usEntries[epIdx];

const additionalIndividuals = [
  // SPORTS
  { name: 'Mark Messier', id: 'mark-messier', role: 'Hockey Legend - Black Book Contact' },
  { name: 'Andre Agassi', id: 'andre-agassi', role: 'Tennis Legend - Black Book Contact' },
  { name: 'John McEnroe', id: 'john-mcenroe', role: 'Tennis Legend - Black Book Contact' },
  { name: 'Pat Riley', id: 'pat-riley', role: 'NBA Coach/Miami Heat - Black Book Contact' },
  { name: 'Jean-Claude Killy', id: 'jean-claude-killy', role: 'Triple Olympic Ski Champion - Black Book Contact' },

  // BILLIONAIRES / BUSINESS
  { name: 'Rupert Murdoch', id: 'rupert-murdoch-ep', role: 'News Corp/Fox Founder - Black Book (Wife & Son Also Listed)' },
  { name: 'Donald Newhouse', id: 'donald-newhouse', role: 'Advance Publications (Conde Nast, Reddit) - Black Book' },
  { name: 'Si Newhouse', id: 'si-newhouse', role: 'Advance/Conde Nast Chairman - Black Book (d. 2017)' },
  { name: 'Steve Wynn', id: 'steve-wynn', role: 'Casino Mogul - Black Book (Own Misconduct Allegations)' },
  { name: 'Howard Schultz', id: 'howard-schultz', role: 'Starbucks CEO - Black Book Contact' },
  { name: 'Tommy Hilfiger', id: 'tommy-hilfiger-ep', role: 'Fashion Designer - Black Book Contact' },
  { name: 'Leonard Lauder', id: 'leonard-lauder', role: 'Estee Lauder Chairman - Black Book Contact' },
  { name: 'Ronald Lauder', id: 'ronald-lauder-ep', role: 'WJC President/Estee Lauder - Contacts, Lives Near Townhouse' },
  { name: 'Jeff Greene', id: 'jeff-greene', role: 'Billionaire - Admitted Flying with Young Women on Epstein\'s Plane' },
  { name: 'Samuel Waksal', id: 'samuel-waksal', role: 'ImClone (Convicted Insider Trading) - Contacts' },
  { name: 'Steven Roth', id: 'steven-roth', role: 'Vornado Realty Trust - Black Book Contact' },
  { name: 'Charles Kushner', id: 'charles-kushner', role: 'Kushner Real Estate (Convicted, Pardoned) - Contacts' },
  { name: 'Howard Lutnick', id: 'howard-lutnick-ep', role: 'Cantor Fitzgerald CEO - Black Book Contact' },
  { name: 'Peter Morton', id: 'peter-morton', role: 'Hard Rock Cafe Co-Founder - Black Book Contact' },
  { name: 'David Martinez', id: 'david-martinez', role: 'Fintech Advisory (Mexico) - Black Book Contact' },
  { name: 'Rupert Johnson Jr.', id: 'rupert-johnson', role: 'Franklin Templeton - Black Book Contact' },
  { name: 'Adam Dell', id: 'adam-dell', role: 'Venture Capitalist (Michael Dell\'s Brother) - Contacts' },

  // WALL STREET / FINANCE
  { name: 'Paul Singer', id: 'paul-singer', role: 'Elliott Management Founder - Contacts' },
  { name: 'Alan Howard', id: 'alan-howard', role: 'Brevan Howard Co-Founder - Contacts' },
  { name: 'Daniel Och', id: 'daniel-och', role: 'Och-Ziff Capital Founder - Contacts' },
  { name: 'David Bonderman', id: 'david-bonderman', role: 'TPG Capital Co-Founder - Contacts (d. 2023)' },
  { name: 'Andrew Tisch', id: 'andrew-tisch', role: 'Loews Corporation - Contacts' },
  { name: 'Jonathan Tisch', id: 'jonathan-tisch', role: 'Loews Hotels / NY Giants - Contacts' },
  { name: 'Joe Lewis', id: 'joe-lewis-ep', role: 'Billionaire / Spurs Owner (Convicted Insider Trading) - Contacts' },
  { name: 'James Wolfensohn', id: 'james-wolfensohn-ep', role: 'World Bank President - Contacts (d. 2020)' },
  { name: 'John Mack', id: 'john-mack', role: 'Morgan Stanley CEO - Contacts' },
  { name: 'Richard Fuld', id: 'richard-fuld', role: 'Lehman Brothers CEO - Contacts' },
  { name: 'Vikram Pandit', id: 'vikram-pandit', role: 'Citigroup CEO - Contacts' },
  { name: 'Peter Cohen', id: 'peter-cohen', role: 'Shearson Lehman CEO - Contacts' },
  { name: 'Anshu Jain', id: 'anshu-jain', role: 'Deutsche Bank Co-CEO - Took On Epstein After JPM Dropped Him (d. 2022)' },
  { name: 'John Cryan', id: 'john-cryan', role: 'Deutsche Bank CEO - Continued Servicing Epstein' },

  // SOCIALITES & NY SOCIETY
  { name: 'Denise Rich', id: 'denise-rich', role: 'Songwriter/Socialite (Marc Rich Ex-Wife) - Black Book' },
  { name: 'Blaine Trump', id: 'blaine-trump', role: 'Socialite (Robert Trump Ex-Wife) - Black Book Contact' },
  { name: 'Marla Maples', id: 'marla-maples', role: 'Actress (Trump\'s 2nd Wife) - Contacts' },
  { name: 'Brooke Shields', id: 'brooke-shields-ep', role: 'Actress/Model - Black Book Contact' },
  { name: 'Daisy Fuentes', id: 'daisy-fuentes-ep', role: 'MTV Host/Model - Black Book Contact' },
  { name: 'Countess Debbie von Bismarck', id: 'debbie-von-bismarck', role: 'Bismarck Family Socialite - Black Book Contact' },
  { name: 'Peggy Siegal', id: 'peggy-siegal', role: 'PR - Rehabilitated Epstein\'s Image Post-2008' },

  // POLITICS
  { name: 'Terry McAuliffe', id: 'terry-mcauliffe', role: 'VA Governor / DNC Chair - Clinton Circle, Contacts' },
  { name: 'John Podesta', id: 'john-podesta', role: 'Clinton WH Chief of Staff - Contacts' },
  { name: 'David Rockefeller', id: 'david-rockefeller', role: 'Chase Manhattan / Rockefeller Dynasty - Contacts (d. 2017)' },
  { name: 'Bob Menendez', id: 'bob-menendez', role: 'U.S. Senator NJ - Contacts (Convicted Corruption 2024)' },
  { name: 'Barney Frank', id: 'barney-frank', role: 'U.S. Representative MA - Contacts' },
  { name: 'Kenneth Mapp', id: 'ken-mapp', role: 'USVI Governor - Gave Epstein Tax Benefits Despite Sex Offender Status' },
  { name: 'Albert Bryan Jr.', id: 'albert-bryan-jr', role: 'USVI Governor - Filed Landmark Lawsuits Against Estate & JPM' },
  { name: 'Nicolas Sarkozy', id: 'nicolas-sarkozy-ep', role: 'Former French President - Contacts' },

  // TV / FILM
  { name: 'Bill Cosby', id: 'doe-36', role: 'Actor/Comedian - Named in 2024 Document Unsealing (Own Conviction)' },
  { name: 'Charlie Sheen', id: 'charlie-sheen', role: 'Actor - Contacts' },
  { name: 'Clint Eastwood', id: 'clint-eastwood-ep', role: 'Actor/Director - Contacts' },
  { name: 'John Travolta', id: 'john-travolta-ep', role: 'Actor - Black Book Contact' },
  { name: 'Oprah Winfrey', id: 'oprah-winfrey-ep', role: 'Media Mogul - Contacts' },
  { name: 'Steven Spielberg', id: 'steven-spielberg-ep', role: 'Director - Contacts' },
  { name: 'George Lucas', id: 'george-lucas-ep', role: 'Star Wars Creator - Contacts' },
  { name: 'Ron Howard', id: 'ron-howard-ep', role: 'Director/Producer - Contacts' },
  { name: 'Mike Nichols', id: 'mike-nichols', role: 'Director (Diane Sawyer\'s Husband) - Black Book (d. 2014)' },
  { name: 'Barbra Streisand', id: 'barbara-streisand-ep', role: 'Singer/Actress - Contacts' },
  { name: 'Joan Collins', id: 'joan-collins-ep', role: 'Dynasty Star - Black Book Contact' },
  { name: 'Michael Douglas', id: 'michael-douglas-ep', role: 'Actor - Contacts' },

  // MUSICIANS
  { name: 'Paul McCartney', id: 'paul-mccartney-ep', role: 'Beatles - Black Book Contact' },
  { name: 'Eric Clapton', id: 'eric-clapton-ep', role: 'Guitarist - Black Book Contact' },
  { name: 'Rod Stewart', id: 'rod-stewart-ep', role: 'Singer - Black Book Contact' },
  { name: 'Sting', id: 'sting-ep', role: 'The Police / Solo - Contacts' },
  { name: 'Bono', id: 'bono-ep', role: 'U2 - Contacts' },

  // MEDIA / PUBLISHING
  { name: 'Geraldo Rivera', id: 'geraldo-rivera-ep', role: 'TV Journalist - Contacts' },
  { name: 'Maria Bartiromo', id: 'maria-bartiromo', role: 'Fox Business Anchor - Contacts' },
  { name: 'Chris Cuomo', id: 'chris-cuomo-ep', role: 'CNN Anchor (Andrew\'s Brother) - Contacts' },
  { name: 'Larry King', id: 'larry-king-ep', role: 'TV/Radio Host - Black Book (d. 2021)' },
  { name: 'Connie Chung', id: 'connie-chung-ep', role: 'CBS/CNN Anchor - Contacts' },

  // FRENCH CONNECTIONS
  { name: 'Karl Lagerfeld', id: 'karl-lagerfeld-ep', role: 'Chanel Creative Director - Contacts (d. 2019)' },
  { name: 'Jean-Paul Gaultier', id: 'jean-paul-gaultier', role: 'Fashion Designer - Paris Circle' },
  { name: 'Alain Delon', id: 'alain-delon', role: 'French Film Legend - Black Book (d. 2024)' },
  { name: 'Carla Bruni', id: 'carla-bruni', role: 'Supermodel / French First Lady - Black Book Contact' },
  { name: 'Thierry Mugler', id: 'thierry-mugler', role: 'Fashion Designer - Contacts (d. 2022)' },
  { name: 'Gerald Marie', id: 'gerald-marie', role: 'Elite Model Management Europe - Brunel Associate, Rapist (d. 2024)' },

  // BRITISH ESTABLISHMENT
  { name: 'Prince Michael of Kent', id: 'prince-michael-kent', role: 'British Royal / Queen\'s Cousin - Contacts' },
  { name: 'Sir Philip Green', id: 'philip-green', role: 'Topshop Billionaire - Contacts (Own Misconduct Allegations)' },
  { name: 'Mohamed Al-Fayed', id: 'mohammed-al-fayed', role: 'Harrods Owner - Contacts (100+ Assault Claims After Death)' },
  { name: 'Evgeny Lebedev', id: 'evgeny-lebedev', role: 'Media Owner (Standard/Independent) - London Contacts' },
  { name: 'Prince Rupert Loewenstein', id: 'rupert-loewenstein', role: 'Stones\' Financier/Aristocrat - Black Book (d. 2014)' },

  // VICTIMS (additional)
  { name: 'Jennifer Araoz', id: 'jennifer-araoz', role: 'Victim - Recruited at 14 Outside School, Testified to Congress' },
  { name: 'Juliette Bryant', id: 'juliette-bryant', role: 'Victim - Trafficked Internationally' },
  { name: 'Teala Davies', id: 'teala-davies', role: 'Victim - Founded Survivor Non-Profit' },

  // FLIGHT LOG / STAFF
  { name: 'Cindy Lopez', id: 'cindy-lopez', role: 'Maxwell Associate - Multiple Flight Logs' },
  { name: 'Cathy Alexander', id: 'cathy-alexander', role: 'Southern Trust Company (USVI) - Testified About Operations' },
  { name: 'Kelly Bovino', id: 'kelly-bovino', role: 'Frequent Flight Log Passenger' },
  { name: 'Paolo Zampolli', id: 'paolo-zampolli', role: 'Modeling Agent - Introduced Melania to Trump, Epstein Network' },
  { name: 'Peter Listerman', id: 'peter-listerman', role: 'Russian Model Agent - Trafficking Overlap with Epstein/Brunel' },

  // ACADEMICS
  { name: 'Lee Bollinger', id: 'lee-bollinger', role: 'Columbia University President - Contacts' },
  { name: 'Martin Nowak', id: 'martin-nowak', role: 'Harvard - Received $6.5M, Primary Epstein Contact' },

  // INTEL / GOVERNMENT
  { name: 'Rafi Eitan', id: 'rafi-eitan', role: 'Israeli Intel (LAKAM) - Robert Maxwell Handler (d. 2019)' },
  { name: 'Naftali Bennett', id: 'naftali-bennett', role: 'Former Israeli PM - Overlapping Tech/Political Circles' },
  { name: 'George Nader', id: 'george-nader', role: 'Convicted Pedophile / Political Adviser - 10-Year Sentence' },

  // ART / CULTURE
  { name: 'Charles Saatchi', id: 'charles-saatchi', role: 'Saatchi Gallery/Advertising - Contacts' },
  { name: 'David Zwirner', id: 'david-zwirner', role: 'Art Dealer - Contacts' },
  { name: 'Dakis Joannou', id: 'dakis-joannou', role: 'Art Collector/Industrialist - Contacts' },
  { name: 'Eli Broad', id: 'eli-broad', role: 'Billionaire Philanthropist / Broad Museum - Contacts (d. 2021)' },
  { name: 'Peter Marino', id: 'peter-marino', role: 'Luxury Architect (LV, Chanel) - Contacts' },
  { name: 'Andre Leon Talley', id: 'andre-leon-talley', role: 'Vogue Creative Director - Contacts (d. 2022)' },
  { name: 'Manolo Blahnik', id: 'manolo-blahnik', role: 'Shoe Designer - Contacts' },
  { name: 'Roberto Cavalli', id: 'roberto-cavalli', role: 'Fashion Designer - Contacts (d. 2024)' },

  // ESTATE / LEGAL
  { name: 'Kenneth Feinberg', id: 'ken-feinberg', role: 'Victims\' Fund Admin - Paid $121M to 135+ Claimants' },

  // PHILANTHROPY
  { name: 'Elie Wiesel', id: 'elie-wiesel', role: 'Nobel Laureate - Foundation Lost $15.2M to Epstein (d. 2016)' },
  { name: 'Charles Bronfman', id: 'charles-bronfman-ep', role: 'Seagram / Birthright Israel Co-Founder - Contacts' },

  // CONNECTED SCANDALS
  { name: 'Keith Raniere', id: 'keith-raniere', role: 'NXIVM Cult Leader - 120-Year Sentence, Bronfman-Funded' },
  { name: 'Clare Bronfman', id: 'clare-bronfman', role: 'Bronfman Heiress / NXIVM (Convicted) - Father in Black Book' },

  // AUTHORS
  { name: 'Salman Rushdie', id: 'salman-rushdie-ep', role: 'Author - Contacts' },

  // MODELING
  { name: 'John Casablancas', id: 'john-casablancas', role: 'Elite Model Management - Brunel\'s Mentor (d. 2013)' },

  // BANKING
  { name: 'Anshu Jain', id: 'anshu-jain', role: 'Deutsche Bank Co-CEO - Approved Epstein Account (d. 2022)' },
];

const existingIds = new Set(epEntry.individuals.map(i => i.id));
let added = 0;
additionalIndividuals.forEach(ind => {
  if (!existingIds.has(ind.id)) {
    epEntry.individuals.push(ind);
    existingIds.add(ind.id);
    added++;
  }
});

// Update summary
epEntry.summary = 'The most comprehensive mapping of the Jeffrey Epstein and Ghislaine Maxwell network, documenting ' + epEntry.individuals.length + ' connected individuals. Sources include: the seized black book (1,571 contacts taken by butler Alfredo Rodriguez), Lolita Express flight logs (1995-2013), the 2008 non-prosecution agreement (NPA), the 2019 SDNY indictment, the 2021 Maxwell trial (testimony from victims, staff, and experts), the 2024 mass document unsealing (170+ identified names), JPMorgan internal communications ($365M settlement), Deutsche Bank compliance failures ($150M fine), Leon Black payments ($158M), FBI raid evidence from the NYC townhouse (thousands of photos and CDs), victim depositions, Victims\' Compensation Fund records ($121M to 135+ claimants), and investigative journalism (Miami Herald, NY Times, Vanity Fair, Netflix). The network extends through Wall Street, Hollywood, Silicon Valley, Washington DC, Buckingham Palace, the Elysee Palace, Downing Street, academia (Harvard, MIT, Princeton, Columbia), fashion capitals (Victoria\'s Secret, MC2, Elite Model Management), the art world, media empires, the modeling industry, Middle Eastern royalty, and alleged intelligence services across the United States, United Kingdom, France, Israel, Saudi Arabia, the U.S. Virgin Islands, and beyond.';

usEntries[epIdx] = epEntry;

// SAVE
fs.writeFileSync(pFile, JSON.stringify(pd, null, 2));
fs.writeFileSync(jFile, JSON.stringify(jd, null, 2));

const totalPeople = Object.keys(pd.people).length;
let totalEntries = 0, totalConns = 0;
for (const c in jd.countries) {
  totalEntries += jd.countries[c].length;
  jd.countries[c].forEach(e => { if (e.connections) totalConns += e.connections.length; });
}

console.log(`\n=== PHASE 4 RESULTS ===`);
console.log(`New people added to DB: ${newPeople}`);
console.log(`New individuals in Epstein entry: ${added}`);
console.log(`Epstein Network total individuals: ${epEntry.individuals.length}`);
console.log(`Epstein Network org connections: ${epEntry.connections.length}`);
console.log(`Total people in DB: ${totalPeople}`);
console.log(`Total entries: ${totalEntries}`);
console.log(`Total connections: ${totalConns}`);

let missing = 0;
epEntry.individuals.forEach(i => {
  if (!pd.people[i.id]) { console.log('MISSING:', i.id, i.name); missing++; }
});
console.log(`Missing people entries: ${missing}`);

const seen = {};
epEntry.individuals.forEach(i => {
  if (seen[i.id]) console.log('DUPLICATE:', i.id);
  seen[i.id] = true;
});
console.log('Duplicate check complete');
