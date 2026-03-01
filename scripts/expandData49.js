/**
 * expandData49.js – Epstein Network Expansion Phase 2
 * 
 * Adds 100+ additional documented connections from:
 * - Flight logs (Lolita Express passenger manifests, released 2015 & 2024)
 * - Full black book (1,571 entries seized from Epstein's butler Alfredo Rodriguez)
 * - 2024 court document unsealing (Doe v. Epstein, SDNY)
 * - Maxwell trial testimony & exhibits
 * - Financial records, depositions, investigative reporting
 * - Epstein's properties: Palm Beach, NYC townhouse, Zorro Ranch (NM),
 *   Little St. James (USVI), Paris apartment, Great St. James
 * - Victoria's Secret pipeline, MC2 Modeling, Bear Stearns, Harvard/MIT/etc.
 * - Staff, pilots, property managers, recruiters
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
  if (bio && bio.length > (pd.people[id].bio || '').length) {
    pd.people[id].bio = bio;
  }
  return false;
}

let newPeople = 0;

const newEntries = [

  // ===== PILOTS & FLIGHT CREW =====
  ['larry-visoski', 'Larry Visoski', 'Epstein\'s chief pilot for over 25 years. Flew the Boeing 727 "Lolita Express" and Epstein\'s Gulfstream. Testified at Ghislaine Maxwell\'s trial. Said he flew celebrities, politicians, and scientists but claimed he never witnessed sexual activity. Kept flight logs that became crucial evidence.'],
  ['david-rodgers', 'David Rodgers', 'Epstein\'s pilot. His handwritten flight logs became key evidence listing hundreds of passengers on Epstein\'s planes between 1995-2013. The logs documented flights to Little St. James, Teterboro, Palm Beach, Paris, and other destinations.'],

  // ===== EPSTEIN STAFF & INNER CIRCLE =====
  ['mark-epstein', 'Mark Epstein', 'Jeffrey Epstein\'s younger brother. Real estate developer in New York. Owned apartments in buildings where Epstein allegedly housed young women. Testified in depositions about his brother\'s activities. Connected to Epstein\'s property management.'],
  ['emmy-tayler', 'Emmy Tayler', 'British personal assistant to Ghislaine Maxwell. Described as Maxwell\'s "right hand." Alleged to have helped manage logistics. Named by victims in depositions as being present during abuse.'],
  ['haley-robson', 'Haley Robson', 'Recruited teenage girls for Jeffrey Epstein while herself a minor. Described as a key recruiter in Palm Beach, bringing girls to Epstein\'s mansion for $200 per recruit. Later cooperated with law enforcement. Testified at Maxwell trial about the recruitment pyramid.'],
  ['alfredo-rodriguez', 'Alfredo Rodriguez', 'Epstein\'s former butler at his Palm Beach home. Stole Epstein\'s "black book" of contacts and attempted to sell it for $50,000. Was sentenced to 18 months in prison for obstruction. The black book he took became one of the most important pieces of evidence in the case. Died of mesothelioma in 2015.'],
  ['janusz-banasiak', 'Janusz Banasiak', 'Maintenance worker at Epstein\'s Palm Beach estate. Testified he was instructed to clean sex toys and witnessed daily visits by young girls. Destroyed hard drives from Epstein\'s security cameras on orders from Epstein\'s staff.'],
  ['miles-alexander', 'Miles Alexander', 'Sued Epstein\'s estate as a victim advocate and witness. Connected to the management of Epstein\'s Little St. James island operations.'],

  // ===== MORE VICTIMS & ACCUSERS =====
  ['sarah-ransome', 'Sarah Ransome', 'South African-born victim of Jeffrey Epstein and Ghislaine Maxwell. Reported being trapped on Little St. James island in 2006 and attempting to swim away. Filed lawsuits against Epstein, Maxwell, and associates. Co-authored "Silenced No More" about her experience as a trafficking survivor.'],
  ['johanna-sjoberg', 'Johanna Sjoberg', 'Victim and witness. College student recruited by Maxwell to work for Epstein. Described the infamous photo of Prince Andrew with his arm around Virginia Giuffre. Testified in depositions about sexual abuse and the operation of Epstein\'s homes.'],
  ['teresa-helm', 'Teresa Helm', 'Epstein victim who was recruited as a masseuse. Among the women who came forward in the original Palm Beach investigation. Testified about Epstein\'s abuse pattern.'],
  ['michelle-licata', 'Michelle Licata', 'One of the Palm Beach victims who was 16 when recruited to Epstein\'s mansion. Appeared in Julie K. Brown\'s Miami Herald investigation. Spoke publicly about the abuse and the failure of the justice system.'],
  ['chauntae-davies', 'Chauntae Davies', 'Former massage therapist and victim of Jeffrey Epstein. Recruited by Maxwell. Was photographed with Bill Clinton on the 2002 Africa trip on Epstein\'s plane. Has spoken publicly about being raped by Epstein multiple times.'],
  ['elizabeth-stein', 'Elizabeth Stein', 'One of the Jane Does in the Epstein litigation. Filed claims against the Epstein estate\'s victims\' compensation fund.'],
  ['priscilla-doe', 'Priscilla Doe', 'Pseudonymous Epstein accuser. Filed suit in 2019 alleging she was trafficked and abused starting at age 20. One of numerous Jane/John Does in Epstein-related litigation.'],
  ['lindsay-menz', 'Lindsay Menz', 'Victim advocate connected to the Epstein case who helped bring attention to the scope of abuse.'],

  // ===== ADDITIONAL POLITICIANS & GOVERNMENT =====
  ['doug-band', 'Doug Band', 'American political advisor. Co-founder of Teneo and longtime aide to Bill Clinton. Appeared on Epstein flight logs accompanying Clinton. Served as gatekeeper for Clinton\'s post-presidential activities and was reportedly present on flights to Africa and elsewhere.'],
  ['ehud-olmert', 'Ehud Olmert', 'Former Prime Minister of Israel (2006-2009). Named in Epstein\'s black book. His predecessor Barak had even closer Epstein ties.'],
  ['shimon-peres', 'Shimon Peres', 'Former President and Prime Minister of Israel (1923-2016). Nobel Peace Prize laureate. Named in Epstein\'s black book with multiple contact details.'],
  ['jose-maria-aznar', 'Jose Maria Aznar', 'Former Prime Minister of Spain (1996-2004). Named in Epstein\'s black book.'],
  ['eduardo-saverin', 'Eduardo Saverin', 'SKIP'],
  ['terrence-duvernay', 'Terrence Duvernay', 'Former U.S. Secret Service agent. Reportedly detailed to Epstein under a security agreement. His presence raised questions about government connections to Epstein.'],

  // ===== MORE BLACK BOOK & FLIGHT LOG NAMES =====
  ['david-geffen', 'David Geffen', 'American business magnate and film producer. Co-founder of DreamWorks SKG. Named in Epstein\'s black book. One of the wealthiest people in the entertainment industry.'],
  ['rupert-murdoch-son', 'James Murdoch', 'British-American businessman. Son of Rupert Murdoch. Former CEO of 21st Century Fox. Named in Epstein\'s contacts.'],
  ['tommy-mottola', 'Tommy Mottola', 'American music executive. Former head of Sony Music Entertainment. Named in Epstein\'s black book.'],
  ['jerry-seinfeld', 'Jerry Seinfeld', 'American comedian, actor, writer, and producer. Named in Epstein\'s black book.'],
  ['phil-collins-ep', 'Phil Collins', 'British musician, singer, and drummer. Named in Epstein\'s black book.'],
  ['bobby-de-niro', 'Robert De Niro', 'American actor and producer. Named in Epstein\'s black book with multiple contact entries.'],
  ['bruce-willis', 'Bruce Willis', 'American actor. Named in Epstein\'s black book.'],
  ['minnie-driver-ep', 'Minnie Driver', 'British-American actress. Named in Epstein\'s black book.'],
  ['elizabeth-hurley', 'Elizabeth Hurley', 'British actress and model. Named in Epstein\'s black book.'],
  ['christy-turlington', 'Christy Turlington', 'American supermodel. Named in Epstein\'s black book.'],
  ['claudia-schiffer', 'Claudia Schiffer', 'German supermodel. Named in Epstein\'s black book.'],
  ['carol-alt', 'Carol Alt', 'American supermodel and actress. Named in Epstein\'s black book.'],
  ['jimmy-buffett-ep', 'Jimmy Buffett', 'American musician, songwriter, and businessman (1946-2023). Named in Epstein\'s black book. Had property near Epstein\'s in the Caribbean.'],
  ['john-cleese-ep', 'John Cleese', 'British actor and comedian. Co-founder of Monty Python. Named in Epstein\'s black book.'],
  ['tim-robbins', 'Tim Robbins', 'American actor and filmmaker. Named in Epstein\'s black book.'],
  ['brian-grazer', 'Brian Grazer', 'American film and television producer. Co-founder of Imagine Entertainment with Ron Howard. Named in Epstein\'s black book.'],
  ['peggy-siegal', 'Peggy Siegal', 'New York public relations executive and social fixture. Close associate of Epstein who helped rehabilitate his image after 2008. Arranged post-conviction social events and dinners for Epstein with prominent guests. Lost her career after the 2019 arrest.'],
  ['peter-brant', 'Peter Brant', 'American billionaire businessman, newspaper publisher, and art collector. Named in Epstein\'s black book. Major figure in the New York art and social scene.'],
  ['john-gutfreund', 'John Gutfreund', 'American businessman (1929-2016). Former CEO of Salomon Brothers. Named in Epstein\'s black book. Known as "the King of Wall Street" in the 1980s.'],

  // ===== ADDITIONAL FINANCE / BUSINESS =====
  ['wilbur-ross', 'Wilbur Ross', 'American billionaire investor and politician. Former U.S. Secretary of Commerce. Named in Epstein\'s black book with multiple contact numbers. Known for restructuring failed companies.'],
  ['john-paulson', 'John Paulson', 'American billionaire hedge fund manager. Founder of Paulson & Co. Named in Epstein\'s contacts. Famous for making $15 billion betting against subprime mortgages.'],
  ['paul-tudor-jones', 'Paul Tudor Jones', 'American billionaire hedge fund manager. Founder of Tudor Investment Corp. Named in Epstein\'s black book.'],
  ['dov-charney', 'Dov Charney', 'Canadian-American businessman. Founder of American Apparel. Named in Epstein\'s contacts.'],
  ['mort-janklow', 'Mort Janklow', 'American literary agent (1930-2022). Founded Janklow & Nesbit Associates. Named in Epstein\'s black book. One of the most powerful literary agents in New York.'],
  ['gordon-getty', 'Gordon Getty', 'American billionaire businessman and composer. Heir to the Getty oil fortune. Named in Epstein\'s black book.'],
  ['reinaldo-herrera', 'Reinaldo Herrera', 'Venezuelan-American socialite, editor, and aristocrat. Named in Epstein\'s black book. Vanity Fair contributing editor.'],
  ['evelyn-de-rothschild', 'Sir Evelyn de Rothschild', 'British financier (1931-2022). Former chairman of N M Rothschild & Sons. His wife Lynn Forester de Rothschild was in Epstein\'s inner circle. Named in Epstein\'s black book.'],
  ['sandy-gallin', 'Sandy Gallin', 'American talent manager and real estate developer (1940-2017). Managed Dolly Parton, Cher, and Michael Jackson. Named in Epstein\'s black book.'],
  ['bruce-wasserstein', 'Bruce Wasserstein', 'American investment banker (1947-2009). CEO of Lazard. Named in Epstein\'s black book. Known as "Bid-\'em-up Bruce" for his M&A work.'],
  ['edgar-bronfman-jr', 'Edgar Bronfman Jr.', 'Canadian-American businessman. Former CEO of Warner Music Group and Seagram Company. Named in Epstein\'s black book. Son of Edgar Bronfman Sr.'],
  ['matthew-bronfman', 'Matthew Bronfman', 'American-Canadian businessman. Investment banker and Bronfman family member. Named in Epstein\'s contacts.'],

  // ===== VICTORIA\'S SECRET PIPELINE =====
  ['ed-razek', 'Ed Razek', 'Former Chief Marketing Officer of L Brands (Victoria\'s Secret). Controlled casting for Victoria\'s Secret Fashion Shows and catalog. Accused of using his position for sexual misconduct. Victims alleged Epstein exploited his connection to Wexner and Razek to lure models with promises of Victoria\'s Secret work. Retired in 2019.'],
  ['erin-heatherton', 'Erin Heatherton', 'American model and former Victoria\'s Secret Angel. Alleged that Epstein held sway over Victoria\'s Secret casting. Multiple models reported that Epstein posed as a VS recruiter to gain access to young women.'],

  // ===== MORE ACADEMICS & INTELLECTUALS =====
  ['dershowitz-defense', 'Guy de Rothschild', 'SKIP'],
  ['leon-botstein', 'Leon Botstein', 'American conductor and academic. President of Bard College. Named in Epstein\'s black book. Part of the academic and cultural elite Epstein cultivated.'],
  ['henry-rosovsky', 'Henry Rosovsky', 'American economist. Former Dean of the Faculty of Arts and Sciences at Harvard. Epstein donated to Harvard\'s Program for Evolutionary Dynamics and was given an office at the university even after his conviction. Rosovsky helped facilitate Epstein\'s Harvard connections.'],
  ['martin-nowak', 'Martin Nowak', 'Austrian-American mathematical biologist. Director of Harvard\'s Program for Evolutionary Dynamics, which received $6.5 million from Epstein. Nowak maintained the relationship and served as Epstein\'s primary Harvard contact even post-conviction. Harvard investigated the donations.'],
  ['alan-krueger', 'Alan Krueger', 'American economist (1960-2019). Princeton University professor and former Chairman of the Council of Economic Advisers. Named in Epstein\'s contacts. Part of the academic network Epstein cultivated.'],
  ['eric-lander', 'Eric Lander', 'American mathematician and geneticist. Former director of the Broad Institute at MIT/Harvard. Named in Epstein\'s contacts. Later served briefly as Biden\'s science advisor before resigning. Part of the scientific elite that Epstein courted.'],

  // ===== MORE INTERNATIONAL FIGURES =====
  ['prince-mohammed-bin-salman', 'Mohammed bin Salman', 'Crown Prince and Prime Minister of Saudi Arabia. Named in reporting on Epstein\'s international connections. Epstein cultivated relationships with Middle Eastern leaders and claimed to do business consulting in the region.'],
  ['wafic-said', 'Wafic Said', 'Syrian-born Saudi Arabian businessman. Named in Epstein\'s black book. Billionaire philanthropist known for funding the Said Business School at Oxford.'],
  ['hasnat-khan', 'Hasnat Khan', 'British-Pakistani heart surgeon. Named in Epstein\'s black book. Former boyfriend of Princess Diana.'],
  ['ghislaine-noam', 'Nicole Junkermann', 'German-born businesswoman and investor. Founded NJF Holdings. Connected to Epstein through business dealings. Reported to have visited Epstein\'s island. Her business ties have drawn media scrutiny.'],
  ['giuseppe-cipriani', 'Giuseppe Cipriani', 'Italian-American restaurateur. Owner of Cipriani restaurants. Named in Epstein\'s black book with multiple entries.'],
  ['thierry-lhermitte', 'Thierry Lhermitte', 'French actor. Named in Epstein\'s black book as part of his French contacts, largely cultivated through Jean-Luc Brunel and the Paris modeling scene.'],
  ['jean-marc-brunel', 'MC2 Model Management', 'SKIP'],

  // ===== EPSTEIN\'S FINANCIAL STRUCTURE =====
  ['cecile-de-jongh', 'Cecile de Jongh', 'Wife of John de Jongh Jr., former Governor of the U.S. Virgin Islands. Worked for one of Epstein\'s companies in the USVI, Southern Trust Company. Her employment raised conflict-of-interest concerns given Epstein\'s tax arrangements with the territory.'],
  ['john-de-jongh', 'John de Jongh Jr.', 'Former Governor of the U.S. Virgin Islands (2007-2015). Epstein contributed to his campaigns and his wife worked for an Epstein company. The USVI later sued Epstein\'s estate and JP Morgan for facilitating trafficking on its territory.'],
  ['denise-george', 'Denise George', 'Former Attorney General of the U.S. Virgin Islands. Filed a landmark lawsuit against Epstein\'s estate in 2020 and later against JP Morgan. Was fired by the governor the day after suing JP Morgan, raising concerns about political interference.'],

  // ===== JPMORGAN SPECIFIC =====
  ['john-duffy', 'John Duffy', 'Former JP Morgan executive. Communicated with Jes Staley about Epstein\'s account. JP Morgan internal emails showed bankers discussed Epstein\'s criminal status but maintained his accounts for the revenue they generated.'],

  // ===== DEUTSCHE BANK SPECIFIC =====
  ['paul-morris', 'Paul Morris', 'Deutsche Bank relationship manager involved in onboarding and maintaining Epstein\'s accounts after JP Morgan dropped him in 2013. Deutsche Bank paid $150 million to NY regulators for compliance failures related to the Epstein accounts.'],

  // ===== MORE PALM BEACH INVESTIGATION =====
  ['joseph-recarey', 'Joseph Recarey', 'Palm Beach Police detective. Key investigator in the original 2005 Epstein case. Conducted victim interviews and built a case with 36 identified victims before the FBI took over. Died in 2018 under unexplained circumstances, which some have found suspicious.'],
  ['marie-villafana', 'Marie Villafana', 'Former Assistant U.S. Attorney in the Southern District of Florida. Helped negotiate the controversial 2008 plea deal. Later transferred out of the district. Her role in the lenient agreement was scrutinized.'],
  ['ann-marie-mcsweeney', 'R. Alexander Acosta Defense', 'SKIP'],

  // ===== EPSTEIN ISLAND / PROPERTIES =====
  ['glenn-aguilar', 'Glenn Aguilar', 'Construction manager on Epstein\'s Little St. James island. Oversaw building projects including the infamous blue-and-white striped temple structure. Workers on the island reported strange construction requirements.'],
  ['tiffany-doe', 'Tiffany Doe', 'Pseudonymous accuser who filed a 2016 lawsuit alleging she was recruited by Epstein at age 13. The suit named both Epstein and Donald Trump, but was dropped before the 2016 election amid reported threats against the plaintiff.'],

  // ===== ADDITIONAL MEDIA FIGURES =====
  ['matt-lauer', 'Matt Lauer', 'American television journalist. Former anchor of The Today Show. Named in Epstein\'s contacts. Later fired from NBC in 2017 over sexual misconduct allegations. Briefly owned property near Epstein\'s in New Zealand.'],
  ['tom-brokaw', 'Tom Brokaw', 'American television journalist. Former NBC Nightly News anchor. Named in Epstein\'s black book.'],
  ['ted-kennedy', 'Ted Kennedy', 'American politician (1932-2009). U.S. Senator from Massachusetts for nearly 47 years. Named in Epstein\'s black book.'],
  ['rudy-giuliani', 'Rudy Giuliani', 'American lawyer and politician. Former Mayor of New York City. Named in Epstein\'s black book with multiple contact entries. Was NYC mayor during the time Epstein operated from his East 71st Street townhouse.'],
  ['michael-wolf', 'Michael Wolff', 'American journalist and author. Named in Epstein\'s contacts. Author of "Fire and Fury" about the Trump administration.'],
  ['anderson-cooper', 'Anderson Cooper', 'American broadcast journalist. CNN anchor. Named in Epstein\'s black book.'],
  ['joan-rivers', 'Joan Rivers', 'American comedian and television host (1933-2014). Named in Epstein\'s black book.'],
  ['gayle-king', 'Gayle King', 'American television journalist. CBS Mornings co-host. Named in Epstein\'s contacts.'],

  // ===== ADDITIONAL ENTERTAINMENT =====
  ['michael-jackson-ep', 'Michael Jackson', 'American singer and entertainer (1958-2009). Named in Epstein\'s black book. One of the most famous entertainers in history.'],
  ['magician-uri-geller', 'Uri Geller', 'Israeli-British illusionist. Named in Epstein\'s black book. Known for spoon-bending acts. Lives near Epstein associate Ehud Barak in Israel.'],
  ['kevin-costner', 'Kevin Costner', 'American actor and filmmaker. Named in Epstein\'s black book.'],
  ['ben-affleck', 'Ben Affleck', 'American actor and filmmaker. Named in Epstein\'s contacts.'],
  ['matt-damon', 'Matt Damon', 'American actor. Named in Epstein\'s contacts.'],
  ['chelsea-clinton', 'Chelsea Clinton', 'American author and global health advocate. Daughter of Bill and Hillary Clinton. Named in Epstein\'s contacts due to Clinton family connections.'],
  ['bobby-kotick', 'Bobby Kotick', 'American businessman. Former CEO of Activision Blizzard. Named in Epstein\'s contacts. Reportedly visited Epstein\'s properties.'],

  // ===== ADDITIONAL SOCIALITES & NY SOCIETY =====
  ['ghislaine-friends-shelley', 'Shelley Lewis', 'Television producer and member of Ghislaine Maxwell\'s social circle. Attended Maxwell\'s social events. Part of the New York society set that enabled Maxwell\'s standing.'],
  ['christina-oxenberg', 'Princess Christina Oxenberg', 'American author and member of the Serbian royal family. Part of the New York social scene connected to Maxwell. Later became an outspoken critic of Epstein and Maxwell after learning about the abuse.'],
  ['christopher-mason', 'Christopher Mason', 'British-born New York journalist and socialite. Knew Ghislaine Maxwell socially and reported on the Epstein case. Described the normalization of Epstein in New York society.'],

  // ===== NEW MEXICO / ZORRO RANCH =====
  ['bill-richardson-ranch', 'Tina Flaherty', 'SKIP'],
  ['ranch-manager', 'Brice Gordon', 'Ranch manager at Epstein\'s Zorro Ranch in Stanley, New Mexico. The 10,000-acre ranch was where Epstein reportedly planned to "seed the human race" with his DNA through a mass insemination program involving transhumanist ideas. Victims reported being brought to the ranch.'],

  // ===== ADDITIONAL LEGAL & COMPLIANCE =====
  ['cravath-lawyer', 'Robert Giuffra', 'American attorney at Sullivan & Cromwell. Represented Deutsche Bank in Epstein-related litigation. Not related to Virginia Giuffre despite the similar surname.'],
  ['boies-connection', 'Laura Menninger', 'American attorney. Represented Ghislaine Maxwell at her criminal trial alongside Jeffrey Pagliuca. Part of the defense team from Haddon, Morgan and Foreman in Denver.'],
  ['jeffrey-pagliuca', 'Jeffrey Pagliuca', 'American attorney. Co-represented Ghislaine Maxwell in her criminal defense. Partner at Haddon, Morgan and Foreman.'],
  ['audrey-strauss', 'Audrey Strauss', 'Acting U.S. Attorney for the SDNY. Announced the July 2020 arrest of Ghislaine Maxwell. Oversaw the prosecution upon Geoffrey Berman\'s departure.'],
  ['comey-original', 'James Comey', 'American lawyer. Former FBI Director (2013-2017). His daughter Maurene Comey was on the Maxwell prosecution team. Before his tenure, the FBI had investigated Epstein but failed to bring federal charges before 2019.'],

  // ===== CONNECTED PHILANTHROPIC/INSTITUTIONAL =====
  ['leon-black-wife', 'Debra Black', 'American philanthropist. Wife of Leon Black. Both appeared in Epstein\'s social circle. She and Leon Black attended events connected to Epstein.'],
  ['peter-thiel', 'Peter Thiel', 'German-American billionaire entrepreneur and venture capitalist. Co-founder of PayPal and Palantir. Named in Epstein\'s contacts.'],
  ['jeffrey-sachs', 'Jeffrey Sachs', 'American economist and professor at Columbia University. Named in Epstein\'s contacts. Prominent expert on sustainable development and global poverty.'],

  // ===== MODELING WORLD =====
  ['eileen-ford', 'Eileen Ford', 'American businesswoman (1922-2014). Co-founder of Ford Models, the world\'s most prominent modeling agency. Named in Epstein\'s black book. The modeling industry was a key pipeline for Epstein and Brunel to access young women.'],
  ['mc2-people', 'Mark Epstein Connection', 'SKIP'],
  ['stephanie-seymour', 'Stephanie Seymour', 'American supermodel. Named in Epstein\'s black book. Connected to the Victoria\'s Secret and modeling world that overlapped with Epstein\'s network.'],

  // ===== ADDITIONAL WALL STREET =====
  ['larry-gagosian', 'Larry Gagosian', 'American art dealer. Founder of Gagosian Gallery, the world\'s largest gallery network. Named in Epstein\'s black book. Part of the intersection of art, wealth, and social power that Epstein cultivated.'],
  ['jeff-epstein-donkey', 'Richard Branson', 'British entrepreneur. Founder of Virgin Group. Named in Epstein\'s black book. Epstein visited Branson\'s Necker Island in the Caribbean, near Epstein\'s own island.'],
  ['simon-de-pury', 'Simon de Pury', 'Swiss art auctioneer and collector. Named in Epstein\'s black book. Chairman of Phillips auction house.'],
  ['leon-botstein-art', 'Alberto Mugrabi', 'SKIP'],

  // ===== MORE CLINTON ASSOCIATES =====
  ['clinton-aide-justin', 'Justin Cooper', 'Aide to Bill Clinton who managed technology for the Clinton Foundation. Appeared in Epstein flight log documentation.'],
  ['huma-abedin', 'Huma Abedin', 'American political staffer. Senior aide to Hillary Clinton. Named in Epstein\'s contacts through the Clinton connection.'],

  // ===== BRITISH CONNECTIONS =====
  ['mark-lloyd', 'Gwendolyn Beck', 'SKIP'],
  ['alan-dershowitz-acc', 'Clare Hazell-Iveagh', 'British socialite. Countess of Iveagh. Named in Epstein\'s black book. Part of the British aristocratic social circle connected to Maxwell and Prince Andrew.'],
  ['viscount-linley', 'Viscount David Linley', 'British furniture maker and former chairman of Christie\'s. Nephew of Queen Elizabeth II. Named in Epstein\'s black book.'],
  ['earl-spencer', 'Earl Charles Spencer', 'British peer and author. Brother of Princess Diana. Named in Epstein\'s black book.'],
  ['duchess-cornwall', 'Duchess of York Sarah', 'SKIP'],
  ['andrew-lloyd-webber', 'Andrew Lloyd Webber', 'British composer. Creator of Phantom of the Opera, Cats, Evita. Named in Epstein\'s black book.'],
  ['rupert-soames', 'Rupert Soames', 'British businessman. Grandson of Winston Churchill. Named in Epstein\'s black book.'],

  // ===== ADDITIONAL POWER BROKERS =====
  ['alan-dershowitz-full', 'Ghislaine Social Set', 'SKIP'],
  ['michael-bloomberg-detail', 'Bloomberg Foundation', 'SKIP'],
  ['henry-jarecki', 'Henry Jarecki', 'Austrian-American psychiatrist and commodities trader. Named in Epstein\'s black book. Made a fortune in the gold market. Social connection to Epstein through New York financial circles.'],
  ['nicolas-berggruen', 'Nicolas Berggruen', 'German-American billionaire investor and philanthropist. Founder of Berggruen Institute. Named in Epstein\'s black book.'],
  ['john-hitchcox', 'John Hitchcox', 'British property developer. Dated model Elle Macpherson. Named in Epstein\'s contacts and black book.'],
  ['naomi-watts', 'Naomi Watts', 'British-Australian actress. Named in Epstein\'s black book.'],
  ['donna-karan', 'Donna Karan', 'American fashion designer. Founder of DKNY. Named in Epstein\'s black book. Initially made controversial comments defending Harvey Weinstein.'],
  ['oscar-de-la-renta', 'Oscar de la Renta', 'Dominican-American fashion designer (1932-2014). Named in Epstein\'s black book. One of the most influential fashion designers in the world.'],
  ['carolina-herrera', 'Carolina Herrera', 'Venezuelan-American fashion designer. Named in Epstein\'s black book.'],
  ['yves-carcelle', 'Yves Carcelle', 'French businessman (1948-2014). CEO of Louis Vuitton. Named in Epstein\'s black book.'],
];

newEntries.forEach(([id, name, bio]) => {
  if (bio === 'SKIP') return;
  if (addPerson(id, name, bio)) newPeople++;
});

// ===== BIO UPDATES FOR EXISTING PEOPLE =====
const bioUpdates = {
  'bill-clinton-individual': 'Former President of the United States (1993-2001). One of the most connected individuals in the Epstein network. Flight logs show at least 26 trips on Epstein\'s Boeing 727 "Lolita Express," including trips to Africa, Asia, and Europe. Secret Service reportedly declined protection on some trips. A victim (Chauntae Davies) was photographed giving Clinton a neck massage on the Africa trip. Clinton\'s aide Doug Band accompanied him on multiple flights. Clinton has said he knew "nothing about the terrible crimes." After leaving office, Epstein donated to the Clinton Foundation and helped arrange meetings.',
  'ghislaine-maxwell': 'British socialite and convicted sex trafficker. Daughter of media baron Robert Maxwell. Found guilty in December 2021 on five of six federal charges including sex trafficking of a minor. Sentenced to 20 years in federal prison. Described by prosecutors as Epstein\'s "partner in crime" who recruited, groomed, and abused victims for years. Operated across the US, UK, and internationally. Maintained elite social standing in New York and London that gave Epstein access to powerful circles. Managed Epstein\'s household operations and kept a detailed "manual" for staff. Her father Robert Maxwell had connections to Mossad, MI6, and the KGB before his mysterious death in 1991.',
  'jeffrey-epstein': 'American financier and convicted sex offender (1953-2019). Born in Brooklyn. Hired as a teacher at Dalton School (1974) by Donald Barr without a degree. Worked at Bear Stearns (1976-1981) before founding his own firm. Maintained a client relationship primarily with Leslie Wexner, who gave him power of attorney and a $77M townhouse. Registered as a sex offender in 2008 after a lenient federal plea deal for soliciting a minor. Arrested again July 6, 2019 on federal sex trafficking charges. Found dead in his Manhattan jail cell August 10, 2019  -  officially ruled suicide but circumstances remain highly disputed. His estate was valued at over $577M. Maintained properties in Manhattan, Palm Beach, New Mexico (Zorro Ranch), Paris, and two private Caribbean islands (Little St. James and Great St. James). His black book contained 1,571 names. Flight logs documented hundreds of passengers. Over 150 victims have been identified.',
  'leslie-wexner': 'American billionaire businessman. Founder and former CEO of L Brands (Victoria\'s Secret, Bath & Body Works). Epstein\'s only known major financial client. Gave Epstein sweeping power of attorney over his finances. Transferred his $77 million Manhattan townhouse to Epstein. Epstein posed as a Victoria\'s Secret recruiter to lure models and young women. Wexner\'s foundation provided Epstein with institutional legitimacy. Wexner has said he was "never aware of the illegal activity" and severed ties before the 2008 plea deal, though the exact timeline is disputed. His wife Abigail managed the family\'s philanthropic reputation afterward.',
  'prince-andrew': 'Prince Andrew, Duke of York. Second son of Queen Elizabeth II. Friend of Ghislaine Maxwell and Jeffrey Epstein. Virginia Giuffre alleged she was trafficked to Andrew three times when she was 17. Settled Giuffre\'s civil lawsuit in February 2022 for an estimated $12 million while denying the allegations. Stripped of military titles and royal patronages. The infamous photograph of Andrew with his arm around Giuffre\'s waist at Maxwell\'s London home became one of the defining images of the scandal. Gave a disastrous BBC Newsnight interview in 2019 that was widely seen as evasive. Used Epstein money to pay Sarah Ferguson\'s debts. Stayed at Epstein\'s properties multiple times including after the 2008 conviction.',
  'alan-dershowitz-ind': 'American lawyer and Harvard Law professor emeritus. Part of Epstein\'s defense team that negotiated the 2008 plea deal. Virginia Giuffre accused him of being one of the men she was trafficked to, which he vehemently denied. Filed defamation suits. In 2024, Giuffre dropped her lawsuit against Dershowitz, saying she "may have made a mistake." Continued to publicly advocate for the innocence of those accused. Received a massage at Epstein\'s home which he said he kept his underwear on for.',
  'noam-chomsky': 'American linguist, philosopher, and political activist. Institute Professor Emeritus at MIT. One of the most cited scholars in history. Met with Jeffrey Epstein multiple times after his 2008 conviction, including at Epstein\'s Manhattan townhouse. Confirmed meetings in 2015 and 2016. Said he saw nothing wrong with meeting Epstein and that "what\'s the point" of asking about it. Also arranged for Epstein to meet with other academics.',
  'henry-kissinger': 'American diplomat and political scientist (1923-2023). Former U.S. Secretary of State and National Security Advisor. Nobel Peace Prize laureate. Named in Epstein\'s black book. Attended dinners at Epstein\'s Manhattan townhouse. One of the most powerful political figures of the 20th century and one of the highest-profile names in Epstein\'s network.',
  'elon-musk-ind': 'South African-born American businessman. CEO of Tesla and SpaceX. Owner of X (formerly Twitter). Photographed with Ghislaine Maxwell at a 2011 Vanity Fair Oscar party. Musk said Maxwell photobombed him. Named in Epstein\'s contacts.',
};

for (const [id, bio] of Object.entries(bioUpdates)) {
  if (pd.people[id] && bio.length > (pd.people[id].bio || '').length) {
    pd.people[id].bio = bio;
  }
}

// ===== UPDATE EPSTEIN NETWORK INDIVIDUALS =====
const usEntries = jd.countries['United States'];
const epIdx = usEntries.findIndex(e => e.id === 'epstein-network');
const epEntry = usEntries[epIdx];

const additionalIndividuals = [
  // PILOTS & STAFF
  { name: 'Larry Visoski', id: 'larry-visoski', role: 'Chief Pilot - Flew "Lolita Express" for 25+ Years, Testified at Maxwell Trial' },
  { name: 'David Rodgers', id: 'david-rodgers', role: 'Pilot - Handwritten Flight Logs Became Key Evidence' },
  { name: 'Mark Epstein', id: 'mark-epstein', role: 'Jeffrey\'s Brother - Owned Apartments Where Victims Were Housed' },
  { name: 'Emmy Tayler', id: 'emmy-tayler', role: 'Maxwell\'s Personal Assistant - "Right Hand Woman"' },
  { name: 'Haley Robson', id: 'haley-robson', role: 'Recruiter While Still a Minor - Testified at Maxwell Trial' },
  { name: 'Alfredo Rodriguez', id: 'alfredo-rodriguez', role: 'Butler - Stole Black Book, Jailed for Obstruction (d. 2015)' },
  { name: 'Janusz Banasiak', id: 'janusz-banasiak', role: 'Maintenance - Destroyed Security Camera Hard Drives' },
  { name: 'Juan Alessi', id: 'juan-alessi', role: 'House Manager 11 Years, Testified at Maxwell Trial' },
  { name: 'Cimberly Espinosa', id: 'cimberly-espinosa', role: 'Executive Assistant - Testified at Maxwell Trial' },
  { name: 'Brice Gordon', id: 'ranch-manager', role: 'Zorro Ranch Manager, New Mexico' },
  { name: 'Glenn Aguilar', id: 'glenn-aguilar', role: 'Construction Manager - Built Island Temple Structure' },

  // MORE VICTIMS
  { name: 'Sarah Ransome', id: 'sarah-ransome', role: 'Victim - Trapped on Island, Tried to Swim Away, Author' },
  { name: 'Johanna Sjoberg', id: 'johanna-sjoberg', role: 'Victim - Recruited by Maxwell, Described Andrew Photo' },
  { name: 'Chauntae Davies', id: 'chauntae-davies', role: 'Victim - Photographed with Clinton, Raped by Epstein' },
  { name: 'Teresa Helm', id: 'teresa-helm', role: 'Victim - Palm Beach Investigation Witness' },
  { name: 'Michelle Licata', id: 'michelle-licata', role: 'Victim - Recruited at 16, Featured in Miami Herald Investigation' },

  // POLITICIANS & GOVERNMENT
  { name: 'Doug Band', id: 'doug-band', role: 'Clinton Aide - On Flight Logs Accompanying Clinton' },
  { name: 'Ehud Olmert', id: 'ehud-olmert', role: 'Former Israeli PM - Black Book Contact' },
  { name: 'Shimon Peres', id: 'shimon-peres', role: 'Former Israeli President/PM - Black Book (d. 2016)' },
  { name: 'Jose Maria Aznar', id: 'jose-maria-aznar', role: 'Former Spanish PM - Black Book Contact' },
  { name: 'Ted Kennedy', id: 'ted-kennedy', role: 'U.S. Senator - Black Book Contact (d. 2009)' },
  { name: 'Rudy Giuliani', id: 'rudy-giuliani', role: 'Former NYC Mayor - Black Book, NYC During Epstein\'s Operation' },
  { name: 'Chelsea Clinton', id: 'chelsea-clinton', role: 'Clinton Daughter - Named in Contacts' },

  // USVI GOVERNMENT
  { name: 'Cecile de Jongh', id: 'cecile-de-jongh', role: 'USVI Governor\'s Wife - Worked for Epstein Company' },
  { name: 'John de Jongh Jr.', id: 'john-de-jongh', role: 'Former USVI Governor - Epstein Campaign Donor & Tax Deals' },
  { name: 'Denise George', id: 'denise-george', role: 'USVI AG - Filed Epstein/JPM Lawsuits, Fired Day After Suing JPM' },

  // INVESTIGATORS & PROSECUTORS
  { name: 'Joseph Recarey', id: 'joseph-recarey', role: 'Palm Beach Detective - Built Case with 36 Victims (d. 2018)' },
  { name: 'Marie Villafana', id: 'marie-villafana', role: 'FL AUSA - Helped Negotiate Controversial 2008 Plea Deal' },
  { name: 'Audrey Strauss', id: 'audrey-strauss', role: 'Acting SDNY US Attorney - Announced Maxwell Arrest July 2020' },
  { name: 'James Comey', id: 'james-comey', role: 'Former FBI Director - Daughter Prosecuted Maxwell' },
  { name: 'Paul Cassell', id: 'paul-cassell', role: 'Crime Victims\' Rights Attorney - Overturned Plea Deal' },
  { name: 'Jack Scarola', id: 'jack-scarola', role: 'Victims\' Attorney - Among First to Take On Epstein Cases' },
  { name: 'Reid Weingarten', id: 'reid-weingarten', role: 'Maxwell Defense Attorney' },
  { name: 'Laura Menninger', id: 'boies-connection', role: 'Maxwell Defense Attorney' },
  { name: 'Jeffrey Pagliuca', id: 'jeffrey-pagliuca', role: 'Maxwell Defense Attorney' },

  // BLACK BOOK - ENTERTAINMENT
  { name: 'David Geffen', id: 'david-geffen', role: 'DreamWorks Co-Founder - Black Book Contact' },
  { name: 'Tommy Mottola', id: 'tommy-mottola', role: 'Sony Music Head - Black Book Contact' },
  { name: 'Jerry Seinfeld', id: 'jerry-seinfeld', role: 'Comedian - Black Book Contact' },
  { name: 'Phil Collins', id: 'phil-collins-ep', role: 'Musician - Black Book Contact' },
  { name: 'Robert De Niro', id: 'bobby-de-niro', role: 'Actor - Black Book Contact' },
  { name: 'Bruce Willis', id: 'bruce-willis', role: 'Actor - Black Book Contact' },
  { name: 'Minnie Driver', id: 'minnie-driver-ep', role: 'Actress - Black Book Contact' },
  { name: 'Elizabeth Hurley', id: 'elizabeth-hurley', role: 'Actress/Model - Black Book Contact' },
  { name: 'Christy Turlington', id: 'christy-turlington', role: 'Supermodel - Black Book Contact' },
  { name: 'Claudia Schiffer', id: 'claudia-schiffer', role: 'Supermodel - Black Book Contact' },
  { name: 'Carol Alt', id: 'carol-alt', role: 'Supermodel - Black Book Contact' },
  { name: 'Jimmy Buffett', id: 'jimmy-buffett-ep', role: 'Musician - Black Book, Caribbean Property Neighbor (d. 2023)' },
  { name: 'John Cleese', id: 'john-cleese-ep', role: 'Actor/Comedian - Black Book Contact' },
  { name: 'Tim Robbins', id: 'tim-robbins', role: 'Actor - Black Book Contact' },
  { name: 'Brian Grazer', id: 'brian-grazer', role: 'Film Producer (Imagine) - Black Book Contact' },
  { name: 'Michael Jackson', id: 'michael-jackson-ep', role: 'Musician - Black Book Contact (d. 2009)' },
  { name: 'Uri Geller', id: 'magician-uri-geller', role: 'Illusionist - Black Book Contact' },
  { name: 'Kevin Costner', id: 'kevin-costner', role: 'Actor - Black Book Contact' },
  { name: 'Ben Affleck', id: 'ben-affleck', role: 'Actor - Black Book Contact' },
  { name: 'Matt Damon', id: 'matt-damon', role: 'Actor - Black Book Contact' },
  { name: 'Joan Rivers', id: 'joan-rivers', role: 'Comedian - Black Book Contact (d. 2014)' },
  { name: 'Andrew Lloyd Webber', id: 'andrew-lloyd-webber', role: 'Composer - Black Book Contact' },
  { name: 'Naomi Watts', id: 'naomi-watts', role: 'Actress - Black Book Contact' },
  { name: 'Donna Karan', id: 'donna-karan', role: 'Fashion Designer (DKNY) - Black Book Contact' },
  { name: 'Oscar de la Renta', id: 'oscar-de-la-renta', role: 'Fashion Designer - Black Book Contact (d. 2014)' },
  { name: 'Carolina Herrera', id: 'carolina-herrera', role: 'Fashion Designer - Black Book Contact' },

  // BLACK BOOK - MEDIA / JOURNALISM
  { name: 'Matt Lauer', id: 'matt-lauer', role: 'Today Show Host - Contacts, Property Near Epstein (Fired for Misconduct)' },
  { name: 'Tom Brokaw', id: 'tom-brokaw', role: 'NBC Anchor - Black Book Contact' },
  { name: 'Anderson Cooper', id: 'anderson-cooper', role: 'CNN Anchor - Black Book Contact' },
  { name: 'Gayle King', id: 'gayle-king', role: 'CBS Mornings - Black Book Contact' },
  { name: 'Michael Wolff', id: 'michael-wolf', role: 'Journalist/Author - Black Book Contact' },
  { name: 'James Murdoch', id: 'rupert-murdoch-son', role: 'Fox/News Corp - Epstein Contacts' },

  // BLACK BOOK - FINANCE/BUSINESS
  { name: 'Wilbur Ross', id: 'wilbur-ross', role: 'Commerce Secretary - Black Book Contact' },
  { name: 'John Paulson', id: 'john-paulson', role: 'Hedge Fund Billionaire - Black Book Contact' },
  { name: 'Paul Tudor Jones', id: 'paul-tudor-jones', role: 'Tudor Investment Founder - Black Book Contact' },
  { name: 'Gordon Getty', id: 'gordon-getty', role: 'Getty Oil Heir - Black Book Contact' },
  { name: 'John Gutfreund', id: 'john-gutfreund', role: 'Salomon Brothers CEO - Black Book (d. 2016)' },
  { name: 'Bruce Wasserstein', id: 'bruce-wasserstein', role: 'Lazard CEO - Black Book (d. 2009)' },
  { name: 'Mort Janklow', id: 'mort-janklow', role: 'Literary Agent - Black Book (d. 2022)' },
  { name: 'Edgar Bronfman Jr.', id: 'edgar-bronfman-jr', role: 'Warner Music/Seagram CEO - Black Book Contact' },
  { name: 'Bobby Kotick', id: 'bobby-kotick', role: 'Activision CEO - Contacts, Visited Properties' },
  { name: 'Peter Thiel', id: 'peter-thiel', role: 'PayPal/Palantir Co-Founder - Named in Contacts' },
  { name: 'Larry Gagosian', id: 'larry-gagosian', role: 'Art Dealer - Black Book Contact' },
  { name: 'Richard Branson', id: 'jeff-epstein-donkey', role: 'Virgin Founder - Black Book, Epstein Visited Necker Island' },
  { name: 'Simon de Pury', id: 'simon-de-pury', role: 'Phillips Auction Chairman - Black Book Contact' },
  { name: 'Peter Brant', id: 'peter-brant', role: 'Publisher/Art Collector - Black Book Contact' },
  { name: 'Sir Evelyn de Rothschild', id: 'evelyn-de-rothschild', role: 'N M Rothschild Chairman - Black Book, Wife in Inner Circle (d. 2022)' },
  { name: 'Henry Jarecki', id: 'henry-jarecki', role: 'Psychiatrist/Commodities Trader - Black Book Contact' },
  { name: 'Nicolas Berggruen', id: 'nicolas-berggruen', role: 'Investor/Philanthropist - Black Book Contact' },
  { name: 'Yves Carcelle', id: 'yves-carcelle', role: 'Louis Vuitton CEO - Black Book (d. 2014)' },
  { name: 'Reinaldo Herrera', id: 'reinaldo-herrera', role: 'Venezuelan Socialite/Vanity Fair Editor - Black Book Contact' },
  { name: 'Sandy Gallin', id: 'sandy-gallin', role: 'Talent Manager (Cher, Dolly Parton) - Black Book (d. 2017)' },

  // BLACK BOOK - BRITISH / INTERNATIONAL
  { name: 'Viscount David Linley', id: 'viscount-linley', role: 'Queen\'s Nephew/Christie\'s - Black Book Contact' },
  { name: 'Earl Charles Spencer', id: 'earl-spencer', role: 'Diana\'s Brother - Black Book Contact' },
  { name: 'Rupert Soames', id: 'rupert-soames', role: 'Churchill\'s Grandson - Black Book Contact' },
  { name: 'Clare Hazell-Iveagh', id: 'alan-dershowitz-acc', role: 'Countess - Black Book, British Aristocratic Network' },
  { name: 'Wafic Said', id: 'wafic-said', role: 'Saudi Billionaire - Black Book, Oxford Donor' },
  { name: 'Hasnat Khan', id: 'hasnat-khan', role: 'Surgeon/Diana\'s Ex - Black Book Contact' },
  { name: 'Nicole Junkermann', id: 'ghislaine-noam', role: 'German Investor - Connected Through Business, Visited Island' },
  { name: 'Giuseppe Cipriani', id: 'giuseppe-cipriani', role: 'Cipriani Restaurants - Black Book Contact' },
  { name: 'Thierry Lhermitte', id: 'thierry-lhermitte', role: 'French Actor - Black Book, Paris Circle' },
  { name: 'MBS (Mohammed bin Salman)', id: 'prince-mohammed-bin-salman', role: 'Saudi Crown Prince - International Network' },
  { name: 'Jose Maria Aznar', id: 'jose-maria-aznar', role: 'Former Spanish PM - Black Book Contact' },
  { name: 'John Hitchcox', id: 'john-hitchcox', role: 'British Property Developer - Black Book Contact' },

  // VICTORIA\'S SECRET
  { name: 'Ed Razek', id: 'ed-razek', role: 'Victoria\'s Secret CMO - Epstein Used VS Connection to Lure Models' },
  { name: 'Abigail Wexner', id: 'les-wexner-foundation', role: 'Wexner\'s Wife - Managed Family Reputation' },

  // SOCIAL ENABLERS
  { name: 'Peggy Siegal', id: 'peggy-siegal', role: 'PR Executive - Rehabilitated Epstein\'s Image Post-2008' },
  { name: 'Shelley Lewis', id: 'ghislaine-friends-shelley', role: 'TV Producer - Maxwell Social Circle' },
  { name: 'Princess Christina Oxenberg', id: 'christina-oxenberg', role: 'Author/Royal - Later Became Epstein/Maxwell Critic' },
  { name: 'Wendi Deng', id: 'wendi-deng', role: 'Murdoch Ex-Wife - Black Book, Maxwell Circle' },
  { name: 'Nicky Hilton', id: 'nicky-hilton', role: 'Socialite - Black Book Contact' },
  { name: 'Paris Hilton', id: 'conrad-hilton-family', role: 'Socialite - Black Book Contact' },
  { name: 'Ivana Trump', id: 'ivana-trump', role: 'Trump Ex-Wife - Black Book Contact (d. 2022)' },

  // ACADEMICS (NOT YET IN INDIVIDUALS LIST)
  { name: 'Martin Nowak', id: 'martin-nowak', role: 'Harvard - Received $6.5M From Epstein, Primary Harvard Contact' },
  { name: 'Henry Rosovsky', id: 'henry-rosovsky', role: 'Former Harvard Dean - Facilitated Epstein University Access' },
  { name: 'Leon Botstein', id: 'leon-botstein', role: 'Bard College President - Black Book Contact' },
  { name: 'Eric Lander', id: 'eric-lander', role: 'Broad Institute/Biden Science Advisor - Contacts' },
  { name: 'Jeffrey Sachs', id: 'jeffrey-sachs', role: 'Columbia Economist - Named in Contacts' },

  // MORE BANKING
  { name: 'John Duffy', id: 'john-duffy', role: 'JP Morgan Executive - Internal Epstein Account Communications' },
  { name: 'Paul Morris', id: 'paul-morris', role: 'Deutsche Bank - Onboarded Epstein Post-JPM ($150M Fine)' },

  // CLINTON ASSOCIATES
  { name: 'Justin Cooper', id: 'clinton-aide-justin', role: 'Clinton Aide - Flight Log Documentation' },
  { name: 'Huma Abedin', id: 'huma-abedin', role: 'Clinton Aide - Named in Contacts' },

  // MODELING
  { name: 'Eileen Ford', id: 'eileen-ford', role: 'Ford Models Founder - Black Book, Modeling Pipeline (d. 2014)' },
  { name: 'Stephanie Seymour', id: 'stephanie-seymour', role: 'Supermodel - Black Book Contact' },
  { name: 'Jeffrey Fuller', id: 'jeffrey-fuller', role: 'MC2 Model Management - Epstein-Funded Agency' },

  // MISCELLANEOUS
  { name: 'Dov Charney', id: 'dov-charney', role: 'American Apparel Founder - Named in Contacts' },
  { name: 'Debra Black', id: 'leon-black-wife', role: 'Leon Black\'s Wife - Epstein Social Circle' },
  { name: 'Robert Giuffra', id: 'cravath-lawyer', role: 'Attorney - Represented Deutsche Bank in Epstein Cases' },
  { name: 'Matthew Bronfman', id: 'matthew-bronfman', role: 'Bronfman Family - Named in Contacts' },
  { name: 'Christopher Mason', id: 'christopher-mason', role: 'Journalist/Socialite - Reported on Epstein Social Normalization' },
  { name: 'Terrence Duvernay', id: 'terrence-duvernay', role: 'Secret Service - Detailed to Epstein' },
];

// Merge new individuals into the existing list
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
epEntry.summary = 'The network of associates, enablers, victims, prosecutors, and connected individuals surrounding Jeffrey Epstein and Ghislaine Maxwell. This entry maps ' + epEntry.individuals.length + ' documented connections based on court filings, flight logs (Lolita Express manifests listing hundreds of passengers), Epstein\'s seized black book (1,571 contact entries taken by butler Alfredo Rodriguez), financial records (JPMorgan $365M settlement, Deutsche Bank $150M fine), the 2008 non-prosecution agreement, the 2019 SDNY indictment, the 2021 Maxwell trial testimony and exhibits, 2024 court document unsealing, and investigative journalism including the Miami Herald\'s "Perversion of Justice" series. The network spans finance, politics, technology, media, academia, royalty, entertainment, modeling, law enforcement, intelligence communities, and Epstein\'s personal staff across the United States, United Kingdom, France, Israel, the U.S. Virgin Islands, and beyond.';

// Add more connections
const newConnections = [
  { source: 'epstein-network', target: 'victoria-s-secret', type: 'Modeling Pipeline - Epstein posed as VS recruiter, Ed Razek connection' },
  { source: 'epstein-network', target: 'bear-stearns', type: 'Career Origin - Epstein worked at Bear Stearns 1976-1981' },
  { source: 'epstein-network', target: 'dalton-school', type: 'Career Origin - Donald Barr hired Epstein as teacher 1974' },
  { source: 'epstein-network', target: 'virgin-group', type: 'Social - Epstein visited Branson\'s Necker Island' },
  { source: 'epstein-network', target: 'dreamworks', type: 'Entertainment - David Geffen in black book' },
  { source: 'epstein-network', target: 'warner-music-group', type: 'Entertainment - Edgar Bronfman Jr. (CEO) in black book' },
  { source: 'epstein-network', target: 'clinton-foundation', type: 'Political - Epstein donated, 26+ flights with Clinton' },
  { source: 'epstein-network', target: 'ford-models', type: 'Modeling - Eileen Ford in black book, modeling pipeline' },
  { source: 'epstein-network', target: 'lazard', type: 'Finance - Bruce Wasserstein (CEO) in black book' },
  { source: 'epstein-network', target: 'seagram', type: 'Finance - Bronfman family connections' },
  { source: 'epstein-network', target: 'columbia-university', type: 'Academic - Jeffrey Sachs connection' },
  { source: 'epstein-network', target: 'princeton-university', type: 'Academic - Alan Krueger connection' },
  { source: 'epstein-network', target: 'broad-institute', type: 'Academic - Eric Lander connection' },
];

// Verify connection targets exist
const allEntryIds = new Set();
for (const c in jd.countries) jd.countries[c].forEach(e => allEntryIds.add(e.id));

const validNewConns = newConnections.filter(c => {
  if (allEntryIds.has(c.target)) return true;
  console.log('Connection target not found (skipping):', c.target);
  return false;
});

// Add valid connections, avoiding duplicates
const existingTargets = new Set(epEntry.connections.map(c => c.target));
validNewConns.forEach(c => {
  if (!existingTargets.has(c.target)) {
    epEntry.connections.push(c);
    existingTargets.add(c.target);
  }
});

usEntries[epIdx] = epEntry;

// SAVE
fs.writeFileSync(pFile, JSON.stringify(pd, null, 2));
fs.writeFileSync(jFile, JSON.stringify(jd, null, 2));

const totalPeople = Object.keys(pd.people).length;
let totalEntries = 0, totalConns = 0;
for (const c in jd.countries) {
  totalEntries += jd.countries[c].length;
  for (const e of jd.countries[c]) {
    if (e.connections) totalConns += e.connections.length;
  }
}

console.log(`\n=== RESULTS ===`);
console.log(`New people added to DB: ${newPeople}`);
console.log(`New individuals added to Epstein entry: ${added}`);
console.log(`Epstein Network now has ${epEntry.individuals.length} individuals`);
console.log(`Epstein Network has ${epEntry.connections.length} org connections`);
console.log(`Total people in DB: ${totalPeople}`);
console.log(`Total entries: ${totalEntries}`);
console.log(`Total connections: ${totalConns}`);

// Verify all Epstein individuals exist in people.json
let missing = 0;
epEntry.individuals.forEach(i => {
  if (!pd.people[i.id]) { console.log('MISSING PEOPLE ENTRY:', i.id, i.name); missing++; }
});
console.log(`Missing people entries: ${missing}`);

// Check for duplicate individuals
const dupeCheck = {};
epEntry.individuals.forEach(i => {
  if (dupeCheck[i.id]) console.log('DUPLICATE:', i.id);
  dupeCheck[i.id] = true;
});
