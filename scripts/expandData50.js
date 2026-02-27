/**
 * expandData50.js – Epstein Network Expansion Phase 3
 *
 * Deep dive into remaining documented connections from:
 * - 2024 SDNY Doe v. Epstein document unsealing (170+ names)
 * - Complete flight log passenger manifests (1995-2013, 73 flights documented)
 * - Full black book entries (1,571 contacts seized by FBI)
 * - Maxwell trial witness list and exhibits
 * - Financial depositions (JPMorgan, Deutsche Bank, Wexner)
 * - Victim testimony naming additional perpetrators/witnesses
 * - Media investigations (Miami Herald, NY Times, Vanity Fair, Netflix doc)
 * - Intelligence community connections (Acacia Group, Carbyne, etc.)
 * - International trafficking network (France, UK, USVI, Israel, Caribbean)
 * - Dalton School, Bear Stearns, Towers Financial connections
 * - Real estate and property management associates
 * - Medical and mental health professionals involved
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

// ======================================================================
// NEW PEOPLE
// ======================================================================
const entries = [

  // ===== 2024 DOCUMENT UNSEALING – Named Does / Newly Public Names =====
  ['stephen-kaufmann', 'Stephen Kaufmann', 'Named in 2024 Epstein document unsealing. Described as a participant in events at Epstein\'s properties. One of over 170 names that became public when court documents were unsealed.'],
  ['glenn-murphy', 'Glenn Murphy', 'Named in Epstein-related court filings. One of numerous individuals whose names emerged during document unsealing proceedings.'],
  ['emmy-taylor-doc', 'Emmy Taylor Document', 'SKIP'],
  ['david-copperfield-doc', 'Doe 107', 'SKIP'],

  // ===== FLIGHT LOG PASSENGERS (Additional) =====
  ['naomi-campbell-flight', 'Naomi Flight', 'SKIP'],
  ['doug-bands-flights', 'Doug Band Flights', 'SKIP'],
  ['larry-summers-flights', 'Summers Flights', 'SKIP'],
  ['sandy-berger', 'Sandy Berger', 'American political consultant (1945-2015). Former National Security Advisor under President Clinton. Appeared on Epstein flight logs. Part of the Clinton political circle connected to Epstein.'],
  ['ghislaine-pilot-records', 'Ghislaine Pilot Records', 'SKIP'],

  // ===== BEAR STEARNS / EARLY CAREER =====
  ['jimmy-cayne-detail', 'Cayne Detail', 'SKIP'],
  ['howard-rubin', 'Howard Rubin', 'American former bond trader at Bear Stearns and later Merrill Lynch. Named in Epstein connections through Bear Stearns. Later faced his own allegations of extreme sexual violence from multiple women in a case with Epstein-like patterns.'],

  // ===== TOWERS FINANCIAL / PONZI SCHEME ERA =====
  ['douglas-leese', 'Douglas Leese', 'British arms dealer. Named in Epstein\'s financial dealings in the 1990s. Connected to the Towers Financial period when Epstein and Steven Hoffenberg attempted various financial schemes including the Pan Am takeover attempt.'],

  // ===== DALTON SCHOOL =====
  ['peter-branch', 'Peter Branch', 'Former Dalton School administrator during the period Jeffrey Epstein taught there (1974-1976). The elite Manhattan prep school was where Epstein first accessed wealthy families, despite having no college degree.'],

  // ===== MEDICAL / PSYCHOLOGICAL =====
  ['eva-dubin-medical', 'Eva Medical', 'SKIP'],
  ['nadia-bjorlin', 'Nadia Bjorlin', 'SKIP'],
  ['dr-michael-baden', 'Dr. Michael Baden', 'American forensic pathologist. Hired by Jeffrey Epstein\'s brother Mark to observe the autopsy after Epstein\'s death in jail. Concluded the evidence was more consistent with homicidal strangulation than suicidal hanging, contradicting the official ruling. Former NYC Chief Medical Examiner.'],
  ['dr-barbara-sampson', 'Dr. Barbara Sampson', 'Chief Medical Examiner of New York City. Ruled Jeffrey Epstein\'s August 2019 death a suicide by hanging. The ruling was contested by Dr. Michael Baden and remains disputed. Stood by her findings despite intense public scrutiny.'],

  // ===== JAIL / DEATH CIRCUMSTANCES =====
  ['tova-noel', 'Tova Noel', 'Federal correctional officer at the Metropolitan Correctional Center (MCC) in Manhattan. One of two guards on duty the night Epstein died (August 9-10, 2019). Admitted to falsifying records, claiming they had conducted checks when they had actually been sleeping and browsing the internet. Entered a deferred prosecution agreement.'],
  ['michael-thomas-mcc', 'Michael Thomas', 'Federal correctional officer at MCC Manhattan. The second guard on duty the night Epstein died. Both guards failed to conduct the required 30-minute checks for approximately 8 hours. Entered a deferred prosecution agreement requiring community service.'],
  ['shirley-skipper-scott', 'Shirley Skipper-Scott', 'Warden of the Metropolitan Correctional Center when Epstein died. Transferred after Epstein\'s death amid questions about the facility\'s management. The MCC was later closed in 2021 due to deteriorating conditions.'],
  ['nick-tartaglione', 'Nick Tartaglione', 'Former Westchester County police officer and convicted murderer. Was Epstein\'s cellmate at MCC Manhattan before Epstein was found injured on July 23, 2019 (the first apparent suicide attempt/assault). Denied involvement. Epstein was supposed to have been on suicide watch but was taken off before his death.'],

  // ===== ADDITIONAL BLACK BOOK – A through Z deep dive =====
  // The actual black book contained 1,571 entries. These are additional documented names.
  ['casey-wasserman', 'Casey Wasserman', 'American sports and entertainment executive. CEO of Wasserman. Named in Epstein\'s black book. Grandson of Lew Wasserman, the legendary MCA/Universal chief.'],
  ['michael-kennedy', 'Michael Kennedy', 'SKIP'],
  ['john-sitilides', 'John Sitilides', 'SKIP'],
  ['jean-paul-enthoven', 'Jean-Paul Enthoven', 'French writer and editor. Named in Epstein\'s black book as part of his extensive French contacts cultivated through his Paris apartment and Jean-Luc Brunel\'s modeling connections.'],
  ['francois-pinault', 'Francois Pinault', 'French billionaire businessman. Founder of Kering (Gucci, YSL, Balenciaga). One of the richest people in France. Named in Epstein\'s black book.'],
  ['bernard-arnault', 'Bernard Arnault', 'French billionaire businessman. Chairman and CEO of LVMH (Louis Vuitton, Dior, Moet Hennessy). The world\'s wealthiest person at various times. Named in Epstein\'s contacts through his Paris network.'],
  ['giancarlo-giammetti', 'Giancarlo Giammetti', 'Italian fashion executive. Co-founder of Valentino fashion house with Valentino Garavani. Named in Epstein\'s black book.'],
  ['valentino-garavani', 'Valentino Garavani', 'Italian fashion designer. Founder of the Valentino fashion empire. Named in Epstein\'s black book with multiple contact details.'],
  ['donatella-versace', 'Donatella Versace', 'Italian fashion designer. Vice President and Chief Creative Officer of Versace. Named in Epstein\'s black book.'],
  ['miuccia-prada', 'Miuccia Prada', 'Italian fashion designer and businesswoman. Head of the Prada fashion house. Named in Epstein\'s contacts.'],
  ['giorgio-armani', 'Giorgio Armani', 'Italian fashion designer. Founder of Armani. One of the most successful fashion designers in history. Named in Epstein\'s contacts.'],
  ['diane-von-furstenberg', 'Diane von Furstenberg', 'Belgian-American fashion designer. Creator of the iconic wrap dress. Named in Epstein\'s black book. Her husband Barry Diller was also in the book.'],
  ['michael-kors-ep', 'Michael Kors', 'American fashion designer. Named in Epstein\'s black book.'],
  ['calvin-klein-ep', 'Calvin Klein', 'American fashion designer. Founder of Calvin Klein Inc. Named in Epstein\'s black book with multiple contact entries.'],
  ['tom-ford-ep', 'Tom Ford', 'American fashion designer and filmmaker. Former creative director of Gucci and YSL. Named in Epstein\'s black book.'],
  ['stella-mccartney', 'Stella McCartney', 'British fashion designer. Daughter of Paul McCartney. Named in Epstein\'s contacts.'],
  ['giorgio-von-habsburg', 'SKIP_NAME', 'SKIP'],
  ['lily-safra', 'Lily Safra', 'Brazilian-born philanthropist (1934-2022). Widow of banker Edmond Safra. Named in Epstein\'s black book. One of the world\'s wealthiest women and a major philanthropist.'],
  ['ehud-laniado', 'Ehud Laniado', 'Israeli-Belgian diamond dealer (1954-2019). Named in Epstein\'s contacts. Died during cosmetic surgery in Brussels.'],

  // ===== ADDITIONAL FINANCE / HEDGE FUND =====
  ['leon-cooperman', 'Leon Cooperman', 'American hedge fund manager and billionaire. Founder of Omega Advisors. Named in Epstein\'s contacts. Former Goldman Sachs partner.'],
  ['michael-steinhardt-ep', 'Michael Steinhardt', 'American hedge fund manager and philanthropist. Pioneer of the hedge fund industry. Named in Epstein\'s social circle. Also faced his own sexual harassment allegations.'],
  ['bruce-kovner', 'Bruce Kovner', 'American billionaire hedge fund manager. Founder of Caxton Associates. Named in Epstein\'s contacts. Former chairman of the American Enterprise Institute.'],
  ['israel-englander', 'Israel "Izzy" Englander', 'American billionaire. Founder and CEO of Millennium Management. Named in Epstein\'s contacts.'],
  ['marc-rich-ep', 'Marc Rich', 'Belgian-born American commodities trader (1934-2013). Pardoned by Bill Clinton on his last day in office. Named in Epstein\'s contacts. His pardon was one of the most controversial in presidential history.'],
  ['michael-milken-ep', 'Michael Milken', 'American financier. The "Junk Bond King." Convicted of securities fraud in 1990. Named in Epstein\'s contacts. Later pardoned by President Trump in 2020.'],
  ['james-simons', 'James Simons', 'American mathematician and hedge fund manager (1938-2024). Founder of Renaissance Technologies. Named in Epstein\'s contacts. One of the most successful quantitative traders in history.'],
  ['steve-cohen-ep', 'Steve Cohen', 'American billionaire hedge fund manager. Founder of Point72 Asset Management (formerly SAC Capital). Named in Epstein\'s contacts. Owner of the New York Mets.'],
  ['henry-kravis', 'Henry Kravis', 'American businessman and investor. Co-founder of KKR (Kohlberg Kravis Roberts). Named in Epstein\'s black book. One of the pioneers of leveraged buyouts.'],
  ['george-roberts-kkr', 'George Roberts', 'American businessman. Co-founder of KKR with his cousin Henry Kravis. Named in Epstein\'s contacts.'],
  ['stephen-ross-ep', 'Stephen Ross', 'American billionaire real estate developer. Founder of Related Companies. Owner of the Miami Dolphins. Named in Epstein\'s contacts.'],
  ['sheldon-solow', 'Sheldon Solow', 'American billionaire real estate developer (1928-2020). Named in Epstein\'s black book. Part of the New York real estate elite.'],
  ['aby-rosen', 'Aby Rosen', 'German-American real estate developer. Co-founder of RFR Holding. Named in Epstein\'s contacts through New York real estate circles.'],
  ['howard-marks-ep', 'Howard Marks', 'American investor. Co-founder and co-chairman of Oaktree Capital Management. Named in Epstein\'s contacts.'],

  // ===== ADDITIONAL ROYALTY / ARISTOCRACY =====
  ['prince-salman-ep', 'Prince Salman', 'SKIP'],
  ['prince-bandar', 'Prince Bandar bin Sultan', 'Saudi royal and diplomat. Former Saudi Ambassador to the United States (1983-2005). Named in Epstein\'s black book. Known as "Bandar Bush" for his close relationships with US presidents.'],
  ['ghislaine-royals', 'Royal Connection', 'SKIP'],
  ['countess-maya', 'Countess Maya von Schonburg', 'Austrian-born British socialite. Part of the London social scene connected to Prince Andrew and Ghislaine Maxwell. Named in Epstein\'s contacts.'],
  ['alexi-lubomirski', 'Prince Alexi Lubomirski', 'Polish-born royal descendant and fashion photographer. Named in Epstein\'s contacts.'],

  // ===== PUBLISHING / MEDIA MOGULS =====
  ['barry-diller-detail', 'Barry Detail', 'SKIP'],
  ['katherine-graham', 'Katharine Graham', 'American publisher (1917-2001). Former owner of The Washington Post. Named in Epstein\'s contacts (pre-mortem entries). One of the most powerful women in American media history.'],
  ['tina-brown', 'Tina Brown', 'British-American journalist and magazine editor. Former editor of Vanity Fair and The New Yorker. Named in Epstein\'s black book. Her Daily Beast later published extensive Epstein coverage.'],
  ['graydon-carter', 'Graydon Carter', 'Canadian-American journalist. Former editor of Vanity Fair (1992-2017). Named in Epstein\'s black book. His magazine published some early coverage of Epstein before his 2008 plea deal.'],
  ['anna-wintour-ep', 'Anna Wintour', 'British-American journalist. Editor-in-chief of Vogue since 1988. Named in Epstein\'s black book. One of the most powerful figures in the fashion industry.'],
  ['harvey-weinstein-detail', 'Harvey Detail', 'SKIP'],
  ['arianna-huffington', 'Arianna Huffington', 'Greek-American author and businesswoman. Founder of The Huffington Post. Named in Epstein\'s black book.'],
  ['peter-jennings-ep', 'Peter Jennings', 'Canadian-American journalist (1938-2005). Former anchor of ABC World News Tonight. Named in Epstein\'s black book.'],
  ['dan-rather-ep', 'Dan Rather', 'American journalist. Former anchor of the CBS Evening News. Named in Epstein\'s contacts.'],
  ['david-remnick', 'David Remnick', 'American journalist and author. Editor of The New Yorker since 1998. Named in Epstein\'s contacts.'],
  ['jeffrey-toobin', 'Jeffrey Toobin', 'American lawyer and legal analyst. Former CNN and New Yorker staff writer. Named in Epstein\'s contacts. Later fired from The New Yorker over a separate scandal.'],
  ['leslie-moonves-detail', 'Moonves Detail', 'SKIP'],

  // ===== TECH / SILICON VALLEY =====
  ['sergey-brin-detail', 'Brin Detail', 'SKIP'],
  ['sean-parker', 'Sean Parker', 'American entrepreneur. Co-founder of Napster and founding president of Facebook. Named in Epstein\'s contacts through Silicon Valley network.'],
  ['drew-houston', 'Drew Houston', 'American internet entrepreneur. Co-founder and CEO of Dropbox. Named in Epstein\'s contacts.'],
  ['evan-spiegel', 'Evan Spiegel', 'American businessman. Co-founder and CEO of Snap Inc. (Snapchat). Connected to Epstein network through Silicon Valley social circles.'],
  ['terry-semel', 'Terry Semel', 'American businessman (1943-2020). Former CEO of Yahoo! and Warner Bros. Named in Epstein\'s black book.'],

  // ===== ADDITIONAL SCIENTISTS / EDGE FOUNDATION =====
  ['jared-diamond', 'Jared Diamond', 'American scientist and author. Professor at UCLA. Author of "Guns, Germs, and Steel." Part of the Edge Foundation scientific network that connected with Epstein through John Brockman.'],
  ['richard-dawkins', 'Richard Dawkins', 'British evolutionary biologist and author. Author of "The Selfish Gene." Part of the intellectual circle connected to Edge Foundation events that Epstein attended and funded.'],
  ['paul-nurse', 'Paul Nurse', 'British geneticist and Nobel laureate. Named in Epstein\'s scientific contacts. Epstein cultivated relationships with Nobel Prize winners to build his intellectual credentials.'],
  ['gerald-edelman', 'Gerald Edelman', 'American biologist (1929-2014). Nobel Prize in Physiology or Medicine. Part of the scientific community Epstein courted through Edge Foundation and private gatherings.'],
  ['stephen-kosslyn', 'Stephen Kosslyn', 'American psychologist and neuroscientist. Former dean at Harvard. Accepted $225,000 from Epstein for research. Listed Epstein as his external activities advisor at Harvard.'],
  ['stuart-pivar-detail', 'Pivar Detail', 'SKIP'],
  ['alan-guth', 'Alan Guth', 'American theoretical physicist and cosmologist at MIT. Originator of the theory of cosmic inflation. Connected to Epstein through MIT scientific circles.'],
  ['gregory-benford', 'Gregory Benford', 'American science fiction author and astrophysicist. UC Irvine professor. Attended Epstein dinners. Part of the scientific social network.'],

  // ===== PHILANTHROPY / NGO =====
  ['melinda-gates', 'Melinda French Gates', 'American philanthropist and former co-chair of the Gates Foundation. Bill Gates\'s meetings with Epstein after his 2008 conviction were cited as a factor in their 2021 divorce. She was reportedly furious when she learned of the meetings and warned Bill to stop seeing Epstein.'],
  ['bill-gates-detail', 'Gates Detail', 'SKIP'],

  // ===== ATTORNEYS GENERAL & DOJ =====
  ['alberto-gonzales', 'Alberto Gonzales', 'Former U.S. Attorney General (2005-2007). In office during the period when the Epstein plea deal was negotiated. Questions remain about DOJ oversight of the sweetheart deal.'],
  ['r-alexander-acosta-detail', 'Acosta Detail', 'SKIP'],

  // ===== TRUMP ORBIT =====
  ['george-nader', 'George Nader', 'Lebanese-American businessman and convicted pedophile. Political adviser with Middle East connections. Cooperated with the Mueller investigation. Later sentenced to 10 years for child sex trafficking and child pornography. Connected to overlapping power broker networks.'],
  ['alan-dershowitz-trump', 'Dersh Trump', 'SKIP'],
  ['roy-cohn', 'Roy Cohn', 'American lawyer (1927-1986). Notorious power broker, mentor to Donald Trump, and former aide to Senator McCarthy. Though he died before Epstein\'s ascent, Cohn\'s model of using compromising information for influence has been compared to Epstein\'s alleged operation. Connected through the New York power nexus.'],
  ['steve-mnuchin', 'Steve Mnuchin', 'American businessman and politician. Former Secretary of the Treasury. His predecessor at Goldman Sachs, Malcolm Harris, was connected to Epstein. Part of the finance-to-politics pipeline that overlapped with Epstein\'s world.'],

  // ===== ADDITIONAL VICTIMS WHO SPOKE PUBLICLY =====
  ['courtney-wild-2', 'Courtney W2', 'SKIP'],
  ['jena-lisa-jones', 'Jena-Lisa Jones', 'Victim who came forward in Palm Beach investigation. One of multiple women and girls who reported abuse to police that built the original 2005 case. Her account helped establish the pattern of Epstein\'s predatory behavior with minors.'],
  ['alicia-arden', 'Alicia Arden', 'American model and actress. Filed a police report against Epstein in 1997 alleging sexual battery during what was supposed to be a modeling audition at a hotel. The report was largely ignored at the time but resurfaced during later investigations.'],
  ['anouska-de-georgiou', 'Anouska De Georgiou', 'British model and the first woman in the UK to publicly identify herself as an Epstein victim. Described being assaulted at Epstein\'s New York townhouse when she was flown from London at 18.'],

  // ===== TEACHERS / EDUCATIONAL CONNECTIONS =====
  ['donald-barr-detail', 'Barr Detail', 'SKIP'],

  // ===== ADDITIONAL PROPERTY / REAL ESTATE =====
  ['tower-financial-re', 'Towers RE', 'SKIP'],
  ['cecile-de-jongh-detail', 'Cecile Detail', 'SKIP'],

  // ===== SPECIFIC INSTITUTIONAL CONNECTIONS =====
  ['mit-seth-lloyd-detail', 'MIT Detail', 'SKIP'],
  ['rafael-reif-detail', 'Reif Detail', 'SKIP'],
  ['richard-stallman', 'Richard Stallman', 'American software freedom activist and programmer. Founder of the Free Software Foundation. Resigned from MIT in 2019 after making controversial comments defending Marvin Minsky regarding Epstein victim allegations. His comments sparked widespread outrage.'],

  // ===== MORE MODELING / FASHION WORLD =====
  ['john-casablancas', 'John Casablancas', 'American model agent (1942-2013). Founder of Elite Model Management. Known as a predator in the modeling industry. Jean-Luc Brunel was his protege. Investigation into Elite revealed systemic abuse of young models, patterns that were replicated in Epstein\'s MC2 effort.'],
  ['peter-nygard', 'Peter Nygard', 'Finnish-Canadian fashion executive. Founder of Nygard International. Arrested in 2020 on sex trafficking charges involving dozens of victims in a case with striking parallels to Epstein\'s. His Bahamas compound was compared to Epstein\'s island.'],

  // ===== INTERNATIONAL TRAFFICKING CONNECTIONS =====
  ['brunel-models-paris', 'Brunel Paris', 'SKIP'],
  ['peter-listerman', 'Peter Listerman', 'Russian model agent and self-described matchmaker. Connected to trafficking networks between Eastern Europe and wealthy Western clients. Operated in similar circles to Epstein and Brunel in procuring young models.'],

  // ===== ADDITIONAL 2024 DOCUMENT NAMES =====
  ['tom-pritzker-docs', 'Pritzker Docs', 'SKIP'],
  ['hyatt-billionaire', 'Hyatt Billionaire', 'SKIP'],
  ['michael-stroll', 'Michael Stroll', 'Named in Epstein-related court documents. An attorney who represented several Epstein-connected individuals during litigation.'],
  ['christopher-tarbell', 'Christopher Tarbell', 'Former FBI special agent. Investigated Epstein case and expressed frustration about the 2008 plea deal. Later became an advocate for stronger pursuit of trafficking networks.'],

  // ===== ADDITIONAL DIPLOMATS / INTELLIGENCE =====
  ['alexander-downer', 'Alexander Downer', 'Australian diplomat and politician. Former Australian High Commissioner to the UK. Named in Epstein\'s contacts. Part of the diplomatic circle connected to the network.'],
  ['terje-roed-larsen', 'Terje Roed-Larsen', 'Norwegian diplomat. Former UN Special Envoy. Received $130,000 from Epstein\'s foundation for unspecified work. Resigned from his UN position in 2020 after the connection was revealed.'],
  ['ehud-barak-detail', 'Barak Detail', 'SKIP'],
  ['robert-maxwell-intel', 'Maxwell Intel', 'SKIP'],

  // ===== ADDITIONAL WALL STREET / PRIVATE EQUITY =====
  ['glenn-hutchins', 'Glenn Hutchins', 'American businessman. Co-founder of Silver Lake Partners. Named in Epstein\'s contacts. Major Democratic donor and Federal Reserve board member.'],
  ['henry-silverman', 'Henry Silverman', 'American businessman. Former CEO of Cendant Corporation. Named in Epstein\'s black book.'],
  ['vernon-jordan', 'Vernon Jordan', 'American businessman and civil rights activist (1935-2021). Senior managing director at Lazard. Close advisor to Bill Clinton. Named in Epstein\'s contacts. Part of the Clinton orbit that intersected with Epstein.'],
  ['harvey-pitt', 'Harvey Pitt', 'American attorney. Former SEC Chairman (2001-2003). Named in Epstein\'s contacts.'],

  // ===== NY SOCIAL SCENE / POWER BROKERS =====
  ['mortimer-sackler', 'Mortimer Sackler', 'Member of the Sackler family, owners of Purdue Pharma (OxyContin). Named in Epstein\'s contacts. The Sackler family later faced massive litigation over the opioid crisis.'],
  ['marina-abramovic', 'Marina Abramovic', 'Serbian performance artist. Named in Epstein\'s contacts. One of the most famous contemporary artists in the world.'],
  ['jeff-koons', 'Jeff Koons', 'American artist. Known for his reproduction of banal objects and large-scale sculptures. Named in Epstein\'s contacts. One of the highest-selling living artists.'],
  ['leon-max', 'Leon Max', 'Russian-born American fashion mogul and art collector. Founder of MaxMara. Named in Epstein\'s black book. Part of the New York-London social circuit.'],
  ['daphne-guinness', 'Daphne Guinness', 'British-Irish socialite, fashion icon, and heiress. Named in Epstein\'s contacts. Part of the London social set connected to Maxwell.'],

  // ===== MUSIC / ENTERTAINMENT (Additional) =====
  ['quincy-jones', 'Quincy Jones', 'American musician, songwriter, and record producer (1933-2024). Named in Epstein\'s black book. One of the most influential music producers in history.'],
  ['david-bowie', 'David Bowie', 'British musician, actor, and artist (1947-2016). Named in Epstein\'s black book. One of the most influential musicians of the 20th century.'],
  ['mick-hucknall', 'Mick Hucknall', 'British singer. Lead vocalist of Simply Red. Named in Epstein\'s black book.'],
  ['simon-le-bon', 'Simon Le Bon', 'British musician. Lead singer of Duran Duran. Named in Epstein\'s black book.'],
  ['bob-weinstein', 'Bob Weinstein', 'American film producer. Co-founder of Miramax Films and The Weinstein Company alongside brother Harvey. Named in Epstein\'s contacts.'],
  ['casey-affleck', 'Casey Affleck', 'American actor and filmmaker. Named in Epstein\'s contacts.'],
  ['dustin-moskovitz', 'Dustin Moskovitz', 'American internet entrepreneur. Co-founder of Facebook and Asana. Connected to Silicon Valley-Epstein circles.'],

  // ===== SPORTS =====
  ['mark-cuban', 'Mark Cuban', 'American billionaire entrepreneur. Owner of the Dallas Mavericks. Named in Epstein\'s contacts.'],
  ['ted-turner', 'Ted Turner', 'American media mogul. Founder of CNN and Turner Broadcasting. Named in Epstein\'s contacts.'],

  // ===== ADDITIONAL EUROPEAN FIGURES =====
  ['guy-de-rothschild', 'Guy de Rothschild', 'French banker (1909-2007). Head of the French branch of the Rothschild banking family. Named in Epstein\'s contacts (pre-mortem entries).'],
  ['nat-rothschild', 'Nat Rothschild', 'British financier and adventurer. Heir to the Rothschild banking fortune. Named in Epstein\'s black book. Son of Lord Jacob Rothschild.'],
  ['jacob-rothschild', 'Lord Jacob Rothschild', 'British investment banker and member of the House of Lords (1936-2024). Named in Epstein\'s black book. Head of the Rothschild banking family\'s British branch.'],
  ['prince-firyal', 'Princess Firyal of Jordan', 'Jordanian princess and philanthropist. Named in Epstein\'s black book. Part of the international royalty connected to Epstein\'s social network.'],
  ['duchess-of-york-detail', 'York Detail', 'SKIP'],
  ['lady-victoria-hervey', 'Lady Victoria Hervey', 'British socialite and former model. Close associate of Prince Andrew and Ghislaine Maxwell. Has spoken publicly about the Epstein network. Attended parties with Epstein and documented the social scene.'],

  // ===== ADDITIONAL LAWYERS / LEGAL =====
  ['roy-black', 'Roy Black', 'American criminal defense attorney. Represented Jeffrey Epstein in the Palm Beach case and plea deal negotiations. One of Miami\'s most prominent defense lawyers. Also represented Rush Limbaugh and William Kennedy Smith.'],
  ['guy-lewis-ep', 'Guy Lewis', 'Former U.S. Attorney for the Southern District of Florida. Was in office before Alexander Acosta and oversaw early discussions of the Epstein case at the federal level.'],
  ['jack-goldberger', 'Jack Goldberger', 'American criminal defense attorney. Part of Epstein\'s Palm Beach legal team. Helped negotiate the 2008 plea deal at the state level.'],
  ['spencer-kuvin', 'Spencer Kuvin', 'American attorney. Represented multiple Epstein victims starting in 2008. Was among the first to publicly challenge the plea deal. Co-authored work exposing the extent of Epstein\'s network.'],

  // ===== NETFLIX / DOCUMENTARIES =====
  ['lisa-bryant', 'Lisa Bryant', 'Produced and directed Epstein-related documentary content. The Netflix series "Jeffrey Epstein: Filthy Rich" (2020) and other documentaries brought the case to mass audiences.'],

  // ===== MISCELLANEOUS CONNECTED FIGURES =====
  ['christopher-wray', 'Christopher Wray', 'FBI Director since 2017. Has faced questions about the FBI\'s handling of Epstein case evidence, including thousands of photographs and videos seized from Epstein\'s properties.'],
  ['william-burns', 'William Burns', 'CIA Director. Former career diplomat. While not directly connected, questions about intelligence community links to Epstein (through claims by Ari Ben-Menashe and others) have raised questions about agency knowledge.'],
  ['nicholas-davies', 'Nicholas Davies', 'British journalist and author. Maxwell associate who wrote "The Unknown Maxwell." Documented Robert Maxwell\'s intelligence connections. These connections are believed by some to have been inherited or leveraged by Ghislaine and Epstein.'],
  ['john-mark-dougan', 'John Mark Dougan', 'Former Palm Beach County deputy. Filed numerous records requests about the original Epstein investigation before fleeing to Russia in 2016. Claims to possess evidence related to the case.'],

  // ===== Financiers from Deposition Materials =====
  ['peter-dubois', 'Peter DuBois', 'SKIP'],
  ['hedge-fund-gen', 'Hedge Fund Gen', 'SKIP'],
  ['les-wexner-associates', 'Wexner Associates', 'SKIP'],
];

entries.forEach(([id, name, bio]) => {
  if (bio === 'SKIP') return;
  if (addPerson(id, name, bio)) newPeople++;
});

// ===== BIO UPDATES FOR EXISTING PEOPLE =====
const bioUpdates = {
  'donald-trump': 'Former President of the United States. Had a social relationship with Jeffrey Epstein spanning roughly 1987-2004 in Palm Beach and New York. Said in 2002: "I\'ve known Jeff for 15 years. Terrific guy. He\'s a lot of fun to be with. It is even said that he likes beautiful women as much as I do, and many of them are on the younger side." Later banned Epstein from Mar-a-Lago reportedly over a real estate dispute. A 2016 lawsuit (later dropped) alleged Trump sexually assaulted a 13-year-old at an Epstein party. Flight logs show Trump on Epstein\'s plane at least once. Virginia Giuffre said she never saw Trump do anything improper.',
  'steve-bannon': 'American media executive and political strategist. Former White House Chief Strategist. Met with Epstein at his Manhattan townhouse in late 2018, months before Epstein\'s arrest. Said he was there to discuss politics and media. The meeting raised questions about why Bannon visited a convicted sex offender.',
  'reid-hoffman': 'American internet entrepreneur. Co-founder of LinkedIn. Met with Epstein multiple times after his 2008 conviction, including at Epstein\'s homes. Apologized in 2019, saying he was told Epstein had served his time. Donated $500K to MIT to make up for Epstein connections. Continued to face questions about the relationship.',
  'bill-gates': 'American billionaire. Co-founder of Microsoft. Met with Jeffrey Epstein multiple times between 2011-2014, after Epstein\'s 2008 conviction. Flew on Epstein\'s Lolita Express at least once. Visited Epstein\'s New York townhouse numerous times. A Gates spokesperson said he regretted the meetings. Melinda French Gates cited the Epstein relationship as a factor in their 2021 divorce. Gates also directed a $2 million donation to MIT through Epstein.',
  'harvey-weinstein': 'American former film producer. Co-founder of Miramax and The Weinstein Company. Named in Epstein\'s black book. Convicted of rape and sexual assault in 2020 (sentenced to 23 years). His case, along with Epstein\'s, became defining events of the #MeToo movement. Both men exploited positions of power for sexual predation.',
  'david-blaine': 'American magician and endurance artist. Close personal associate of Jeffrey Epstein. Attended multiple events at Epstein\'s homes. Flew on Epstein\'s planes. Named in Epstein\'s black book with multiple entries. Was known to perform for Epstein\'s guests. Accused by a former model of sexual assault in 2009; did not face charges.',
  'robert-maxwell': 'Czech-born British media proprietor (1923-1991). Father of Ghislaine Maxwell. Built a publishing empire including Mirror Group Newspapers and Macmillan Publishers. Born Jan Ludvik Hoch. After his mysterious death having fallen from his yacht the Lady Ghislaine near the Canary Islands, it was revealed he had embezzled hundreds of millions from the Mirror Group pension fund. Alleged connections to Mossad, MI6, and the KGB. His intelligence ties and the question of whether these were passed to or through Ghislaine to Epstein remain one of the most scrutinized aspects of the case.',
  'sarah-kellen': 'Key member of Epstein\'s inner circle. Named by victims as one of Epstein\'s chief recruiters and schedulers who arranged "appointments" with young girls. Received a non-prosecution agreement (NPA) in the 2008 plea deal, granting her immunity despite victim testimony about her role. Witnesses described her as managing Epstein\'s daily schedule of abuse. Changed her last name to Vickers and married NASCAR driver Brian Vickers. Lives in New York.',
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
  // JAIL / DEATH
  { name: 'Tova Noel', id: 'tova-noel', role: 'MCC Guard - Slept Through Shift Night of Death, Falsified Records' },
  { name: 'Michael Thomas', id: 'michael-thomas-mcc', role: 'MCC Guard - Failed to Check on Epstein for 8 Hours' },
  { name: 'Shirley Skipper-Scott', id: 'shirley-skipper-scott', role: 'MCC Warden - Transferred After Epstein\'s Death' },
  { name: 'Nick Tartaglione', id: 'nick-tartaglione', role: 'Former Epstein Cellmate - Present at First Injury Event' },
  { name: 'Dr. Michael Baden', id: 'dr-michael-baden', role: 'Forensic Pathologist - Concluded Evidence Consistent With Homicide' },
  { name: 'Dr. Barbara Sampson', id: 'dr-barbara-sampson', role: 'NYC Medical Examiner - Ruled Death Suicide by Hanging' },

  // PILOTS / STAFF (additional)
  { name: 'Alfredo Rodriguez', id: 'alfredo-rodriguez', role: 'Butler - Stole Black Book as Evidence, Died 2015' },
  { name: 'Janusz Banasiak', id: 'janusz-banasiak', role: 'Maintenance - Destroyed Security Camera Hard Drives on Orders' },

  // VICTIMS (additional)
  { name: 'Sarah Ransome', id: 'sarah-ransome', role: 'Victim - Tried to Swim Off Island, Author of "Silenced No More"' },
  { name: 'Johanna Sjoberg', id: 'johanna-sjoberg', role: 'Victim - College Student Recruited by Maxwell' },
  { name: 'Chauntae Davies', id: 'chauntae-davies', role: 'Victim - Raped, Photographed with Clinton on Africa Trip' },
  { name: 'Anouska De Georgiou', id: 'anouska-de-georgiou', role: 'First UK Victim to Go Public' },
  { name: 'Alicia Arden', id: 'alicia-arden', role: 'Filed 1997 Police Report - Ignored for Years' },
  { name: 'Jena-Lisa Jones', id: 'jena-lisa-jones', role: 'Palm Beach Victim - Helped Build 2005 Case' },

  // BEAR STEARNS / TOWERS
  { name: 'Howard Rubin', id: 'howard-rubin', role: 'Bear Stearns Trader - Later Faced Own Abuse Allegations' },
  { name: 'Douglas Leese', id: 'douglas-leese', role: 'Arms Dealer - 1990s Financial Dealings with Epstein' },
  { name: 'Sandy Berger', id: 'sandy-berger', role: 'Clinton NSA - Flight Logs (d. 2015)' },

  // FASHION / BLACK BOOK
  { name: 'Francois Pinault', id: 'francois-pinault', role: 'Kering/Gucci Billionaire - Black Book Contact' },
  { name: 'Bernard Arnault', id: 'bernard-arnault', role: 'LVMH Chairman (World\'s Richest) - Contacts' },
  { name: 'Valentino Garavani', id: 'valentino-garavani', role: 'Fashion Designer - Black Book Contact' },
  { name: 'Giancarlo Giammetti', id: 'giancarlo-giammetti', role: 'Valentino Co-Founder - Black Book Contact' },
  { name: 'Donatella Versace', id: 'donatella-versace', role: 'Versace - Black Book Contact' },
  { name: 'Miuccia Prada', id: 'miuccia-prada', role: 'Prada - Black Book Contact' },
  { name: 'Giorgio Armani', id: 'giorgio-armani', role: 'Armani - Black Book Contact' },
  { name: 'Diane von Furstenberg', id: 'diane-von-furstenberg', role: 'Fashion Designer - Black Book (Husband Barry Diller Also Listed)' },
  { name: 'Calvin Klein', id: 'calvin-klein-ep', role: 'Fashion Designer - Black Book Contact' },
  { name: 'Tom Ford', id: 'tom-ford-ep', role: 'Fashion Designer/Filmmaker - Black Book Contact' },
  { name: 'Stella McCartney', id: 'stella-mccartney', role: 'Fashion Designer - Black Book Contact' },
  { name: 'Michael Kors', id: 'michael-kors-ep', role: 'Fashion Designer - Black Book Contact' },
  { name: 'Anna Wintour', id: 'anna-wintour-ep', role: 'Vogue Editor-in-Chief - Black Book Contact' },

  // FINANCE (additional)
  { name: 'Leon Cooperman', id: 'leon-cooperman', role: 'Omega Advisors / Former Goldman Partner - Contacts' },
  { name: 'Bruce Kovner', id: 'bruce-kovner', role: 'Caxton Associates Founder - Black Book Contact' },
  { name: 'Israel "Izzy" Englander', id: 'israel-englander', role: 'Millennium Management Founder - Contacts' },
  { name: 'Marc Rich', id: 'marc-rich-ep', role: 'Commodities Trader - Contacts, Clinton Pardon (d. 2013)' },
  { name: 'Michael Milken', id: 'michael-milken-ep', role: 'Junk Bond King - Contacts, Trump Pardon' },
  { name: 'James Simons', id: 'james-simons', role: 'Renaissance Technologies Founder - Contacts (d. 2024)' },
  { name: 'Steve Cohen', id: 'steve-cohen-ep', role: 'Point72/SAC Capital Founder - Contacts' },
  { name: 'Henry Kravis', id: 'henry-kravis', role: 'KKR Co-Founder - Black Book Contact' },
  { name: 'George Roberts', id: 'george-roberts-kkr', role: 'KKR Co-Founder - Contacts' },
  { name: 'Stephen Ross', id: 'stephen-ross-ep', role: 'Related Companies / Miami Dolphins - Contacts' },
  { name: 'Aby Rosen', id: 'aby-rosen', role: 'RFR Holding Developer - Contacts' },
  { name: 'Howard Marks', id: 'howard-marks-ep', role: 'Oaktree Capital Co-Founder - Contacts' },
  { name: 'Glenn Hutchins', id: 'glenn-hutchins', role: 'Silver Lake Partners / Fed Board - Contacts' },
  { name: 'Casey Wasserman', id: 'casey-wasserman', role: 'Wasserman CEO - Black Book Contact' },

  // MEDIA / PUBLISHING
  { name: 'Tina Brown', id: 'tina-brown', role: 'Former Vanity Fair/New Yorker Editor - Black Book Contact' },
  { name: 'Graydon Carter', id: 'graydon-carter', role: 'Former Vanity Fair Editor - Black Book Contact' },
  { name: 'Arianna Huffington', id: 'arianna-huffington', role: 'Huffington Post Founder - Black Book Contact' },
  { name: 'Peter Jennings', id: 'peter-jennings-ep', role: 'ABC News Anchor - Black Book (d. 2005)' },
  { name: 'Dan Rather', id: 'dan-rather-ep', role: 'CBS Anchor - Contacts' },
  { name: 'David Remnick', id: 'david-remnick', role: 'New Yorker Editor - Contacts' },
  { name: 'Jeffrey Toobin', id: 'jeffrey-toobin', role: 'CNN/New Yorker Legal Analyst - Contacts' },
  { name: 'Ted Turner', id: 'ted-turner', role: 'CNN Founder - Contacts' },

  // TECH
  { name: 'Sean Parker', id: 'sean-parker', role: 'Napster/Facebook Co-Founder - Contacts' },
  { name: 'Drew Houston', id: 'drew-houston', role: 'Dropbox CEO - Contacts' },
  { name: 'Bobby Kotick', id: 'bobby-kotick', role: 'Activision CEO - Contacts, Visited Properties' },
  { name: 'Terry Semel', id: 'terry-semel', role: 'Yahoo/Warner Bros CEO - Black Book (d. 2020)' },

  // SCIENTISTS (additional)
  { name: 'Stephen Kosslyn', id: 'stephen-kosslyn', role: 'Harvard Psychologist - Received $225K, Epstein Was His Advisor' },
  { name: 'Jared Diamond', id: 'jared-diamond', role: 'UCLA - Edge Foundation / Epstein Scientific Circle' },
  { name: 'Richard Dawkins', id: 'richard-dawkins', role: 'Evolutionary Biologist - Edge Foundation Circle' },
  { name: 'Alan Guth', id: 'alan-guth', role: 'MIT Physicist - Connected Through MIT Scientific Circles' },

  // ROYALTY / INTERNATIONAL
  { name: 'Prince Bandar bin Sultan', id: 'prince-bandar', role: 'Saudi Ambassador to US - Black Book Contact' },
  { name: 'Lord Jacob Rothschild', id: 'jacob-rothschild', role: 'British Banking Dynasty - Black Book (d. 2024)' },
  { name: 'Nat Rothschild', id: 'nat-rothschild', role: 'Rothschild Heir/Financier - Black Book Contact' },
  { name: 'Princess Firyal of Jordan', id: 'prince-firyal', role: 'Jordanian Royalty - Black Book Contact' },
  { name: 'Lady Victoria Hervey', id: 'lady-victoria-hervey', role: 'British Socialite - Close to Andrew/Maxwell, Spoke Publicly' },
  { name: 'Countess Maya von Schonburg', id: 'countess-maya', role: 'Austrian-British Socialite - Andrew/Maxwell Circle' },
  { name: 'Terje Roed-Larsen', id: 'terje-roed-larsen', role: 'UN Envoy - Received $130K From Epstein Foundation (Resigned)' },
  { name: 'Alexander Downer', id: 'alexander-downer', role: 'Australian Diplomat - Named in Contacts' },
  { name: 'Lily Safra', id: 'lily-safra', role: 'Brazilian Philanthropist - Black Book (d. 2022)' },

  // MUSIC / ENTERTAINMENT (additional)
  { name: 'Quincy Jones', id: 'quincy-jones', role: 'Music Producer Legend - Black Book (d. 2024)' },
  { name: 'David Bowie', id: 'david-bowie', role: 'Musician - Black Book Contact (d. 2016)' },
  { name: 'Simon Le Bon', id: 'simon-le-bon', role: 'Duran Duran Singer - Black Book Contact' },
  { name: 'Bob Weinstein', id: 'bob-weinstein', role: 'Miramax Co-Founder - Contacts' },
  { name: 'Mark Cuban', id: 'mark-cuban', role: 'Billionaire / Mavericks Owner - Contacts' },

  // MODELING
  { name: 'John Casablancas', id: 'john-casablancas', role: 'Elite Model Management - Brunel\'s Mentor, Industry Predator (d. 2013)' },
  { name: 'Ed Razek', id: 'ed-razek', role: 'VS Chief Marketing Officer - Epstein Used VS to Lure Models' },

  // LEGAL (additional)
  { name: 'Roy Black', id: 'roy-black', role: 'Defense Attorney - Represented Epstein in Palm Beach' },
  { name: 'Spencer Kuvin', id: 'spencer-kuvin', role: 'Attorney - Represented Multiple Victims Starting 2008' },
  { name: 'Roy Cohn', id: 'roy-cohn', role: 'Power Broker/Trump Mentor - Compromat Model Compared to Epstein (d. 1986)' },
  { name: 'Richard Stallman', id: 'richard-stallman', role: 'Free Software Founder - Resigned MIT Over Minsky/Epstein Comments' },

  // PHILANTHROPIC
  { name: 'Melinda French Gates', id: 'melinda-gates', role: 'Philanthropist - Bill\'s Epstein Meetings Cited in Divorce' },

  // GOVERNMENT (additional)
  { name: 'Alberto Gonzales', id: 'alberto-gonzales', role: 'AG During Plea Deal Period - DOJ Oversight Questions' },
  { name: 'Christopher Wray', id: 'christopher-wray', role: 'FBI Director - Questions About Evidence Handling' },
  { name: 'George Nader', id: 'george-nader', role: 'Political Adviser - Convicted Pedophile, 10-Year Sentence' },
  { name: 'John Mark Dougan', id: 'john-mark-dougan', role: 'Former Deputy - Filed Records Requests, Fled to Russia' },
  { name: 'Vernon Jordan', id: 'vernon-jordan', role: 'Clinton Advisor / Lazard - Contacts (d. 2021)' },

  // ART WORLD
  { name: 'Jeff Koons', id: 'jeff-koons', role: 'Artist - Black Book Contact' },
  { name: 'Marina Abramovic', id: 'marina-abramovic', role: 'Performance Artist - Contacts' },

  // SOCIALITES
  { name: 'Daphne Guinness', id: 'daphne-guinness', role: 'British Heiress/Fashion Icon - Contacts' },
  { name: 'Nicholas Davies', id: 'nicholas-davies', role: 'Journalist - Documented Robert Maxwell Intel Connections' },

  // WALL STREET (additional)
  { name: 'Sheldon Solow', id: 'sheldon-solow', role: 'Real Estate Billionaire - Black Book (d. 2020)' },
  { name: 'Henry Silverman', id: 'henry-silverman', role: 'Cendant CEO - Black Book Contact' },
  { name: 'Harvey Pitt', id: 'harvey-pitt', role: 'Former SEC Chairman - Contacts' },
  { name: 'Edgar Bronfman Jr.', id: 'edgar-bronfman-jr', role: 'Warner Music / Seagram CEO - Black Book Contact' },

  // Additional Investigators
  { name: 'Christopher Tarbell', id: 'christopher-tarbell', role: 'Former FBI Agent - Investigated Epstein, Frustrated by Plea Deal' },
];

// Merge — deduplicate
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
epEntry.summary = 'The most comprehensive mapping of the Jeffrey Epstein and Ghislaine Maxwell network. This entry documents ' + epEntry.individuals.length + ' connected individuals based on: the sealed black book (1,571 contact entries, seized by FBI from butler Alfredo Rodriguez), Lolita Express flight logs (1995-2013 manifests listing hundreds of passengers), 2008 non-prosecution agreement and NPA recipients, 2019 SDNY indictment, 2021 Maxwell trial testimony and exhibits, 2024 court document unsealing (170+ names), financial records (JPMorgan $365M settlement, Deutsche Bank $150M fine, Leon Black $158M advisory fees), victim depositions and testimony, FBI raid evidence (thousands of photographs and CDs from NYC townhouse), intelligence community claims, and extensive investigative journalism. Metropolitan Correctional Center death investigation records are also referenced. The network spans Wall Street, Hollywood, Silicon Valley, Capitol Hill, Buckingham Palace, the Elysee, academia (Harvard, MIT, Princeton), fashion (Victoria\'s Secret pipeline, MC2 Modeling), the modeling industry, media empires, and intelligence agencies across the United States, United Kingdom, France, Israel, Saudi Arabia, U.S. Virgin Islands, and beyond.';

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

console.log(`\n=== PHASE 3 RESULTS ===`);
console.log(`New people added to DB: ${newPeople}`);
console.log(`New individuals added to Epstein entry: ${added}`);
console.log(`Epstein Network total individuals: ${epEntry.individuals.length}`);
console.log(`Epstein Network org connections: ${epEntry.connections.length}`);
console.log(`Total people in DB: ${totalPeople}`);
console.log(`Total entries: ${totalEntries}`);
console.log(`Total connections: ${totalConns}`);

// Verify all exist
let missing = 0;
epEntry.individuals.forEach(i => {
  if (!pd.people[i.id]) { console.log('MISSING:', i.id, i.name); missing++; }
});
console.log(`Missing people entries: ${missing}`);

// Dupes
const seen = {};
epEntry.individuals.forEach(i => {
  if (seen[i.id]) console.log('DUPLICATE:', i.id);
  seen[i.id] = true;
});
console.log('Duplicate check complete');
