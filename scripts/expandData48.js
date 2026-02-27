/**
 * expandData48.js – Massive Epstein Network Expansion
 * 
 * Sources: Court filings, flight logs (Lolita Express manifests), Epstein's black book,
 * financial disclosures, deposition testimony, investigative journalism (Miami Herald,
 * NY Times, etc.), Maxwell trial exhibits, SDNY indictment materials.
 *
 * Expands network from ~40 to 150+ individuals.
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

// =====================================================================
// PART 1: New people to add (not yet in database)
// =====================================================================
const newEpsteinPeople = [

  // --- VICTIMS / KEY WITNESSES ---
  ['courtney-wild', 'Courtney Wild', 'American victim advocate. One of the first victims to publicly identify herself in the Epstein case. Filed a lawsuit challenging the 2008 non-prosecution agreement. Her case was instrumental in the Crime Victims\' Rights Act ruling that found the government violated victims\' rights by not consulting them before the plea deal.'],
  ['annie-farmer', 'Annie Farmer', 'American educator and Epstein victim. Testified at Ghislaine Maxwell\'s trial in 2021. Described being recruited as a teenager in the 1990s and being groped by Maxwell at Epstein\'s New Mexico ranch. Her testimony was considered pivotal in the Maxwell conviction.'],
  ['carolyn-andriano', 'Carolyn Andriano', 'Known as "Carolyn" in court documents. One of the key victims in the federal case against Jeffrey Epstein. Testified at Ghislaine Maxwell\'s trial about being recruited at age 14 and abused at Epstein\'s Palm Beach mansion starting in 2002. Described a pyramid scheme of recruitment.'],

  // --- LEGAL FIGURES ---
  ['barry-krischer', 'Barry Krischer', 'Former Palm Beach County State Attorney. Initially handled the Epstein case in 2005-2006 but was criticized for presenting a weak case to the grand jury, resulting in only a single prostitution charge. A grand jury later investigated Krischer\'s handling of the case.'],
  ['brad-edwards', 'Brad Edwards', 'American attorney. Represented over 50 of Jeffrey Epstein\'s victims. Co-authored "Relentless Pursuit" about the Epstein case. Filed the Crime Victims\' Rights Act lawsuit that exposed the secret plea deal. Key figure in keeping the case alive for over a decade.'],
  ['julie-k-brown', 'Julie K. Brown', 'American investigative journalist at the Miami Herald. Her 2018 series "Perversion of Justice" reignited the Epstein case, leading to his 2019 arrest. Documented how Epstein\'s wealth and connections allowed him to escape serious federal charges in 2008. Author of "Perversion of Justice: The Jeffrey Epstein Story."'],
  ['sigrid-mccawley', 'Sigrid McCawley', 'American attorney at Boies Schiller Flexner. Lead counsel for Virginia Giuffre in lawsuits against Ghislaine Maxwell and others. Successfully argued for unsealing of documents that exposed the scope of Epstein\'s network.'],
  ['david-boies', 'David Boies', 'American attorney. Chairman of Boies Schiller Flexner. One of the most prominent trial lawyers in America. His firm represented Virginia Giuffre in the Epstein cases. Previously represented Al Gore in Bush v. Gore and the DOJ in the Microsoft antitrust case.'],
  ['geoffrey-berman', 'Geoffrey Berman', 'Former U.S. Attorney for the Southern District of New York. Oversaw the July 2019 arrest and indictment of Jeffrey Epstein on federal sex trafficking charges. Author of "Holding the Line" which detailed political pressure he faced during the case.'],
  ['maurene-comey', 'Maurene Comey', 'American prosecutor. Assistant U.S. Attorney in the SDNY who was part of the team that prosecuted the Ghislaine Maxwell case. Daughter of former FBI Director James Comey.'],
  ['alison-nathan', 'Alison Nathan', 'U.S. District Judge for the Southern District of New York. Presided over the Ghislaine Maxwell trial in 2021-2022. Managed the complex proceedings including the unsealing of numerous documents.'],
  ['jack-scarola', 'Jack Scarola', 'American attorney. Represented multiple Epstein victims in civil cases. Based in West Palm Beach, was among the first attorneys to take on Epstein victims\' cases.'],
  ['paul-cassell', 'Paul Cassell', 'American lawyer and law professor at the University of Utah. Represented Epstein victims in the Crime Victims\' Rights Act case. Former federal judge. His arguments led to the landmark ruling that the 2008 plea deal violated victims\' rights.'],
  ['ken-starr', 'Ken Starr', 'American lawyer (1946-2022). Former Solicitor General and Independent Counsel who investigated Bill Clinton. Was part of Jeffrey Epstein\'s legal defense team that negotiated the 2008 plea deal. His involvement was seen as exemplifying the elite legal firepower Epstein deployed.'],
  ['jay-lefkowitz', 'Jay Lefkowitz', 'American lawyer. Partner at Kirkland & Ellis. Was part of Epstein\'s defense team in the 2007-2008 plea negotiations. His firm also employed Alexander Acosta before he became U.S. Attorney.'],
  ['gerald-lefcourt', 'Gerald Lefcourt', 'American criminal defense attorney. Represented Jeffrey Epstein. Signed a letter to prosecutors in 2007 praising Epstein as a supporter of scientific research and philanthropy, asking for leniency.'],
  ['martin-weinberg', 'Martin Weinberg', 'American criminal defense attorney. Represented Jeffrey Epstein in 2019 federal case. Previously defended organized crime figures and political figures.'],
  ['reid-weingarten', 'Reid Weingarten', 'American attorney. Represented Ghislaine Maxwell in her federal criminal case. Previously defended other high-profile clients including former WorldCom CEO Bernie Ebbers.'],

  // --- FINANCIAL / BUSINESS ASSOCIATES ---
  ['lynn-forester-de-rothschild', 'Lynn Forester de Rothschild', 'American-British businesswoman. CEO of E.L. Rothschild. Wife of Sir Evelyn de Rothschild. Introduced Jeffrey Epstein to Bill Clinton according to some accounts. Appeared in Epstein\'s black book with multiple contact numbers. Had corresponded with Epstein.'],
  ['edgar-bronfman-sr', 'Edgar Bronfman Sr.', 'Canadian-American businessman (1929-2013). Former CEO of Seagram Company and president of the World Jewish Congress. Named in Epstein\'s black book. Father of Clare and Sara Bronfman (NXIVM). Part of the overlapping New York billionaire social circle.'],
  ['thomas-pritzker', 'Thomas Pritzker', 'American billionaire businessman. Executive Chairman of Hyatt Hotels Corporation. Named in Epstein\'s black book with multiple contact numbers. Member of the prominent Pritzker family of Chicago.'],
  ['mort-zuckerman-upd', 'Mortimer Zuckerman', 'SKIP'],
  ['alan-greenberg', 'Alan "Ace" Greenberg', 'American investment banker (1927-2014). Former CEO and Chairman of Bear Stearns. Hired Jeffrey Epstein at Bear Stearns in 1976 despite Epstein lacking a college degree. Epstein rose to become a limited partner before leaving under unclear circumstances in 1981.'],
  ['james-cayne', 'James Cayne', 'American businessman (1934-2024). Former CEO and Chairman of Bear Stearns (1993-2008). Worked alongside Jeffrey Epstein at Bear Stearns in the late 1970s. Bear Stearns was where Epstein built his financial industry credentials.'],
  ['steven-hoffenberg', 'Steven Hoffenberg', 'American financier and convicted fraudster (1944-2022). Former business partner of Jeffrey Epstein in the late 1980s and 1990s. Together they attempted to take over Pan American World Airways. Hoffenberg was convicted of running a $475 million Ponzi scheme through Towers Financial; he claimed Epstein was his partner in the fraud but Epstein was never charged. Found dead in 2022.'],
  ['eva-dubin-upd', 'Eva Dubin', 'SKIP'],
  ['ron-burkle', 'Ron Burkle', 'American billionaire businessman. Founder of The Yucaipa Companies. Close associate of Bill Clinton. Named in Epstein\'s black book. Part of Clinton\'s circle that overlapped with Epstein\'s network. Flew on Clinton\'s trips.'],
  ['leslie-wexner-update', 'Leslie Wexner', 'SKIP'],
  ['tom-pritzker-upd', 'Tom Pritzker', 'SKIP'],
  ['michael-sitrick', 'Michael Sitrick', 'American crisis management and public relations executive. Founder of Sitrick and Company. Represented Leslie Wexner during the Epstein scandal fallout.'],
  ['darren-indyke', 'Darren Indyke', 'American attorney. Longtime lawyer for Jeffrey Epstein. Named as a co-executor of Epstein\'s estate. Managed legal and financial affairs for Epstein for years. Named in various lawsuits related to the Epstein estate and alleged to have facilitated parts of the operation.'],
  ['richard-kahn', 'Richard Kahn', 'American financial executive. Co-executor of Jeffrey Epstein\'s estate alongside Darren Indyke. Had managed financial matters for Epstein. Both executors faced lawsuits from victims seeking compensation from the estate.'],
  ['boris-nikolic', 'Boris Nikolic', 'Bosnian-American biotech investor and physician. Former science advisor to Bill Gates. Named as a backup executor in Jeffrey Epstein\'s will, which shocked Nikolic, who called it "an aberration." Had met Epstein through the Gates Foundation circles.'],
  ['itzhak-perlman', 'Itzhak Perlman', 'Israeli-American violinist. One of the greatest living classical musicians. Named in Epstein\'s black book. Epstein cultivated relationships with prominent cultural figures as part of his social strategy.'],
  ['michael-ovitz', 'Michael Ovitz', 'American businessman. Co-founder of Creative Artists Agency (CAA) and briefly President of The Walt Disney Company. Named in Epstein\'s black book with multiple contact numbers. One of the most powerful figures in Hollywood history.'],
  ['rupert-murdoch-ep', 'Rupert Murdoch', 'SKIP'],
  ['pepe-fanjul', 'Pepe Fanjul', 'Cuban-American billionaire businessman. Vice Chairman of Flo-Sun, one of the largest sugar producers in the US. Named in Epstein\'s black book. Part of the Palm Beach social elite that overlapped with Epstein\'s circle.'],
  ['les-wexner-foundation', 'Abigail Wexner', 'American philanthropist and attorney. Wife of Leslie Wexner. Co-chair of the Wexner Foundation. Columbus, Ohio civic leader. After the Epstein connection became public, she took a more prominent role in managing the family\'s philanthropic reputation.'],

  // --- POLITICAL FIGURES ---
  ['tony-blair', 'Tony Blair', 'Former Prime Minister of the United Kingdom (1997-2007). Named in Epstein\'s black book. Visited Epstein after leaving office. Connections between Blair and Epstein came through mutual associates including Peter Mandelson.'],
  ['andrew-cuomo', 'Andrew Cuomo', 'Former Governor of New York (2011-2021). Named in Epstein\'s black book. His then-wife Kerry Kennedy (daughter of Robert F. Kennedy) also appeared in the contacts.'],
  ['bill-barr', 'William Barr', 'American attorney. U.S. Attorney General (2019-2020, also 1991-93 under Bush Sr.). Oversaw the federal response after Epstein\'s death in custody. His father Donald Barr hired Epstein as a teacher at Dalton School in 1974 despite Epstein having no degree. Recused himself from parts of the case citing a conflict of interest related to his former law firm.'],
  ['donald-barr', 'Donald Barr', 'American educator (1921-2004). Headmaster of the Dalton School in Manhattan. Hired Jeffrey Epstein as a math and physics teacher in 1974 despite Epstein not having a college degree. Father of future AG William Barr. Author of a 1973 sci-fi novel "Space Relations" involving themes of sexual slavery.'],
  ['john-kerry', 'John Kerry', 'American politician and diplomat. Former U.S. Secretary of State and 2004 presidential candidate. Named in Epstein\'s black book.'],
  ['chris-tucker', 'Chris Tucker', 'American actor and comedian. Appeared on Epstein\'s flight logs for a 2002 trip to Africa with Bill Clinton and others on Epstein\'s Boeing 727. Tucker said the trip was a humanitarian mission.'],
  ['al-gore', 'Al Gore', 'Former Vice President of the United States (1993-2001). Named in Epstein\'s black book. Part of the Clinton-era political circle connected to Epstein.'],
  ['george-pataki', 'George Pataki', 'Former Governor of New York (1995-2006). Named in Epstein\'s black book with multiple contact numbers.'],

  // --- SCIENTISTS / ACADEMICS ---
  ['murray-gell-mann', 'Murray Gell-Mann', 'American physicist (1929-2019). Nobel Prize winner (1969) for work on elementary particles. Visited Epstein\'s properties. Epstein cultivated relationships with leading scientists by funding research and hosting scientific gatherings at his properties.'],
  ['stephen-hawking', 'Stephen Hawking', 'British theoretical physicist (1942-2018). One of the most famous scientists in history. Attended a scientific conference on Epstein\'s private island in 2006. Photos emerged of Hawking at socializing events connected to Epstein\'s Virgin Islands property.'],
  ['george-church', 'George Church', 'American geneticist. Professor at Harvard and MIT. Pioneer of the Human Genome Project. Met with Epstein and accepted research funding. Epstein proposed a plan to "seed the human race" with his DNA at his New Mexico ranch, drawing on contact with scientists like Church.'],
  ['frank-wilczek', 'Frank Wilczek', 'American theoretical physicist. Nobel Prize in Physics (2004). Appeared in Epstein\'s black book and was connected to Epstein through scientific circles that Epstein cultivated.'],
  ['seth-lloyd', 'Seth Lloyd', 'American mechanical engineer and professor at MIT. Received $225,000 in research funding from Epstein after his 2008 conviction. MIT placed him on paid leave in 2019 after it was revealed he had continued accepting Epstein funds.'],
  ['robert-trivers', 'Robert Trivers', 'American evolutionary biologist and sociobiologist at Rutgers University. Received research funding from the Jeffrey Epstein VI Foundation. Had a close relationship with Epstein and visited his properties.'],
  ['lisa-randall', 'Lisa Randall', 'American theoretical physicist at Harvard. Named in Epstein\'s black book. One of many scientists Epstein cultivated by offering funding and access to exclusive gatherings.'],
  ['oliver-sacks', 'Oliver Sacks', 'British neurologist and author (1933-2015). Named in Epstein\'s black book. Author of "The Man Who Mistook His Wife for a Hat" and other popular science books.'],
  ['danny-hillis', 'Danny Hillis', 'American inventor, scientist, and author. Co-founder of Thinking Machines Corporation. Close associate of Epstein who served as a scientific advisor. Attended Epstein\'s dinners and introduced other scientists to Epstein. His company Applied Invention received Epstein funding.'],
  ['nathan-wolfe', 'Nathan Wolfe', 'American virologist. Founder of Global Viral (now Metabiota). Received funding from the Jeffrey Epstein VI Foundation. Epstein sat on the advisory board of his organization. Later connections to pandemic preparedness research drew scrutiny.'],
  ['nicholas-negroponte', 'Nicholas Negroponte', 'Greek-American architect and computer scientist. Founder of the MIT Media Lab. Directed Epstein donations to the Media Lab. His successor Joichi Ito resigned over the concealed Epstein donations. Negroponte defended accepting Epstein\'s money.'],
  ['gabriel-bhatt', 'Rafael Reif', 'Venezuelan-American electrical engineer. President of MIT (2012-2022). Reportedly knew of and approved concealed donations from Epstein to the MIT Media Lab. Internal investigation found he was aware the donations were being anonymized. Resigned as president in 2022.'],
  ['katinka-matson', 'Katinka Matson', 'American literary agent and co-founder of Brockman Inc. and Edge Foundation. The Edge gatherings connected Epstein with a network of elite scientists and thinkers. Her husband John Brockman facilitated many Epstein-scientist introductions.'],
  ['john-brockman', 'John Brockman', 'American literary agent and author. Founder of Edge Foundation, which organized annual gatherings of top scientists. Key connector between Epstein and the scientific community. Facilitated introductions between Epstein and numerous scientists and intellectuals. Described Epstein as "extremely bright" and a "close friend."'],

  // --- MODELS / ENTERTAINMENT / SOCIAL ---
  ['heidi-klum', 'Heidi Klum', 'German-American supermodel and television personality. Named in Epstein\'s black book.'],
  ['elle-macpherson', 'Elle Macpherson', 'Australian supermodel and businesswoman. Named in Epstein\'s flight logs. Had a social relationship with Epstein and was photographed at events with him.'],
  ['flavio-briatore', 'Flavio Briatore', 'Italian businessman and former Formula One team principal. Close associate of Ghislaine Maxwell and named in Epstein\'s black book. Part of the European jet-set social circle connected to Maxwell and Epstein.'],
  ['naomi-campbell-upd', 'Naomi Campbell', 'SKIP'],
  ['mick-jagger', 'Mick Jagger', 'British musician. Lead singer of the Rolling Stones. Named in Epstein\'s black book with multiple contact numbers.'],
  ['courtney-love', 'Courtney Love', 'American musician, actress, and artist. Named in Epstein\'s black book. Part of the entertainment world contacts in the book.'],
  ['alec-baldwin', 'Alec Baldwin', 'American actor and producer. Named in Epstein\'s black book with multiple contact numbers.'],
  ['ralph-fiennes', 'Ralph Fiennes', 'British actor. Named in Epstein\'s black book. Star of Schindler\'s List and the Harry Potter series.'],
  ['dustin-hoffman', 'Dustin Hoffman', 'American actor. Named in Epstein\'s black book. Two-time Academy Award winner.'],
  ['kevin-spacey', 'Kevin Spacey', 'American actor. Flew on Epstein\'s plane to Africa in 2002 alongside Bill Clinton and Chris Tucker. Later faced his own sexual assault allegations and criminal charges.'],
  ['chris-rock', 'Chris Rock', 'American comedian and actor. Named in Epstein\'s black book.'],
  ['david-blaine', 'David Blaine', 'American magician and endurance artist. Close associate of Jeffrey Epstein. Attended multiple social events at Epstein\'s properties. Flew on Epstein\'s plane. Named in Epstein\'s black book with multiple entries.'],
  ['david-copperfield', 'David Copperfield', 'American magician and illusionist. Named in Epstein\'s black book. Virginia Giuffre named him in testimony, though he denied any misconduct. One of the most famous magicians in the world.'],
  ['cate-blanchett', 'Cate Blanchett', 'Australian actress. Named in Epstein\'s black book. Two-time Academy Award winner.'],
  ['chelsea-handler-upd', 'Chelsea Handler', 'SKIP'],
  ['andrea-casiraghi', 'Andrea Casiraghi', 'Member of the Monaco royal family. Named in Epstein\'s black book. Son of Princess Caroline of Monaco.'],
  ['prince-albert-monaco', 'Prince Albert II of Monaco', 'Sovereign Prince of Monaco since 2005. Named in Epstein\'s black book.'],

  // --- EUROPEAN / INTERNATIONAL CONNECTIONS ---
  ['jean-luc-brunel-upd2', 'Jean-Luc Brunel', 'SKIP'],
  ['isabelle-de-rouvre', 'Isabelle de Rouvre', 'French property owner. Sold Jeffrey Epstein a Paris apartment for $8.4 million. Later sued Epstein claiming she was swindled and that the apartment was used for trafficking.'],
  ['sarah-ferguson', 'Sarah Ferguson', 'Duchess of York and former wife of Prince Andrew. Andrew paid off a 15,000 GBP debt to her using money from Epstein. Later said she was "deeply regretful" for the connection.'],
  ['prince-andrew-upd', 'Prince Andrew', 'SKIP'],
  ['nacho-figueras', 'Nacho Figueras', 'Argentine polo player and model. Part of the international social set connected to Epstein through Palm Beach and New York circles.'  ],
  ['nicky-hilton', 'Nicky Hilton', 'American socialite, businesswoman, and fashion designer. Named in Epstein\'s black book. Part of the New York high-society circle.'],
  ['conrad-black', 'Conrad Black', 'Canadian-born British media proprietor. Named in Epstein\'s black book. Former owner of Hollinger International (Telegraph newspapers). Later convicted of fraud. Close to Ghislaine Maxwell\'s social circle.'],

  // --- EPSTEIN\'S PROPERTIES / STAFF ---
  ['juan-alessi', 'Juan Alessi', 'Former house manager at Epstein\'s Palm Beach mansion for over 11 years (1990-2002). Testified at Ghislaine Maxwell\'s trial about the daily operations, including that Maxwell kept a "manual" for staff with strict rules about not speaking to anyone about the household. Described regular visits by young women.'],
  ['cimberly-espinosa', 'Cimberly Espinosa', 'Former executive assistant to Jeffrey Epstein at his New York office. Testified at Ghislaine Maxwell\'s trial about scheduling and operations. Described Ghislaine Maxwell as the "lady of the house."'],

  // --- FINANCIAL INSTITUTIONS & ENABLERS ---
  ['mary-erdoes', 'Mary Erdoes', 'American banker. CEO of JP Morgan Asset & Wealth Management. JP Morgan maintained Epstein as a client until 2013 despite his conviction. The US Virgin Islands sued JP Morgan for facilitating Epstein\'s sex trafficking, and the bank settled for $75 million in 2023.'],
  ['staley-jpmorgan', 'Jes Staley', 'SKIP'],
  ['deutsche-bank-rel', 'Rosemary Vrablic', 'American banker. Former managing director at Deutsche Bank. Personally managed Jeffrey Epstein\'s accounts at Deutsche Bank from 2013-2018. Deutsche Bank later admitted serious failures in monitoring Epstein\'s accounts and paid $150 million in penalties. Vrablic resigned in 2020.'],

  // --- INTELLIGENCE / GOVERNMENT FIGURES ---
  ['robert-mueller', 'Robert Mueller', 'American attorney. Former FBI Director (2001-2013). The FBI investigated Epstein in the 2000s but the case was handled at the local level. Mueller was FBI Director during the period of the 2008 plea deal.'],
  ['acosta-kirkland', 'Alexander Acosta', 'SKIP'],
  ['ari-ben-menashe', 'Ari Ben-Menashe', 'Israeli-Canadian former intelligence officer. Claimed that Robert Maxwell and later Ghislaine Maxwell and Epstein were Israeli intelligence assets, with Epstein used as a means to compromise and blackmail powerful figures. His claims are unverified but have been widely circulated.'],

  // --- ADDITIONAL BLACK BOOK / FLIGHT LOG NAMES ---
  ['david-koch', 'David Koch', 'American billionaire businessman (1940-2019). Co-owner of Koch Industries. Named in Epstein\'s black book. One of the wealthiest people in the world at the time of his death.'],
  ['sergey-brin-ep', 'Sergey Brin', 'SKIP'],
  ['james-patterson', 'James Patterson', 'American author. The best-selling author in the world. Co-wrote "Filthy Rich: The Shocking True Story of Jeffrey Epstein" in 2016, one of the first major books to investigate the Epstein case.'],
  ['charlie-rose', 'Charlie Rose', 'American television journalist. Former host of Charlie Rose on PBS and CBS This Morning. Named in Epstein\'s black book. Later faced his own sexual harassment allegations and was fired from CBS and PBS in 2017.'],
  ['mike-wallace', 'Mike Wallace', 'American journalist and media personality (1918-2012). Legendary 60 Minutes correspondent. Named in Epstein\'s black book.'],
  ['barbara-walters', 'Barbara Walters', 'American broadcast journalist (1929-2022). Pioneer of TV news. Named in Epstein\'s black book with multiple contact numbers.'],
  ['diane-sawyer', 'Diane Sawyer', 'American television journalist. Former anchor of ABC World News. Named in Epstein\'s black book.'],
  ['larry-summers-upd', 'Lawrence Summers', 'SKIP'],
  ['peter-soros', 'Peter Soros', 'Hungarian-American businessman and philanthropist. Nephew of George Soros. Named in Epstein\'s black book.'],
  ['arpad-busson', 'Arpad Busson', 'French financier and philanthropist. Founder of EIM Group. Named in Epstein\'s black book. Part of the European finance and philanthropy circuit.'],
  ['gerald-goldsmith', 'Zac Goldsmith', 'British politician, Baron Goldsmith. Named in Epstein\'s black book. Son of financier James Goldsmith. Former Minister of State for Pacific and the Environment.'],

  // --- MC2 MODEL MANAGEMENT ---
  ['mc2-modeling', 'MC2 Model Management', 'SKIP'],
  ['jeffrey-fuller', 'Jeffrey Fuller', 'American modeling executive. Partner in MC2 Model Management alongside Jean-Luc Brunel. MC2 was funded by Epstein and served as a pipeline for young models. Based in Miami.'],

  // --- PALM BEACH CONNECTIONS ---
  ['greg-holbert', 'Greg Holbert', 'Former Palm Beach police detective. Led the initial investigation into Jeffrey Epstein in 2005 after a victim\'s mother reported to police. Built a case documenting dozens of victims before the case was taken to the FBI.'],
  ['michael-reiter', 'Michael Reiter', 'Former Chief of the Palm Beach Police Department. Oversaw the initial Epstein investigation in 2005. Repeatedly pressured state and federal prosecutors to bring charges against Epstein, frustrated by the lenient outcomes.'],

  // --- ADDITIONAL POWERFUL FIGURES ---
  ['alan-patricof', 'Alan Patricof', 'American venture capitalist. Founder of Greycroft Partners and Apax Partners. Named in Epstein\'s black book. Major Democratic Party fundraiser.'],
  ['vera-wang', 'Vera Wang', 'American fashion designer. Named in Epstein\'s black book. One of the most famous fashion designers in the world.'],
  ['wendi-deng', 'Wendi Deng', 'Chinese-American businesswoman. Ex-wife of Rupert Murdoch. Named in Epstein\'s black book and connected to his social circle. Later linked to Ghislaine Maxwell\'s social network.'],
  ['conrad-hilton-family', 'Paris Hilton', 'American socialite and media personality. Named in Epstein\'s black book. Part of the New York socialite circle.'],
  ['maria-farmer', 'Maria Farmer', 'American artist. One of the first victims to report Epstein and Maxwell to the FBI in 1996. Was assaulted at Wexner\'s Ohio estate while working for Epstein. Her complaint to the FBI was effectively ignored for years.'],
  ['ivana-trump', 'Ivana Trump', 'Czech-American businesswoman and former model (1949-2022). First wife of Donald Trump. Named in Epstein\'s black book. Part of the New York social elite connected to Epstein.'],
  ['elaine-maxwell', 'Isabel Maxwell', 'British-American technology entrepreneur. Twin sister of Ghislaine Maxwell. Daughter of Robert Maxwell. Founded CommTouch (now Cyren), an Israeli software company. Her possible knowledge of Ghislaine and Epstein\'s activities has been the subject of speculation.'],
  ['christine-maxwell', 'Christine Maxwell', 'British-American internet pioneer. Sister of Ghislaine Maxwell. Co-founded Magellan, one of the first internet search engines. Married to Roger Malina. Her connections to internet technology and her father\'s intelligence connections have drawn scrutiny.'],
  ['kevin-maxwell', 'Kevin Maxwell', 'British businessman. Brother of Ghislaine Maxwell. Son of Robert Maxwell. Was acquitted of fraud charges related to his father\'s Mirror Group pension scandal. Attended Ghislaine\'s trial.'],
  ['ian-maxwell', 'Ian Maxwell', 'British publisher. Brother of Ghislaine Maxwell. Head of the Maxwell family. Publicly defended Ghislaine and attended her trial. Currently runs a publishing company.'],
];

newEpsteinPeople.forEach(([id, name, bio]) => {
  if (bio === 'SKIP') return;
  if (addPerson(id, name, bio)) newPeople++;
});

// =====================================================================
// PART 2: Update bios for existing people with Epstein context
// =====================================================================
const bioUpdates = {
  'virginia-giuffre': 'American victim advocate. Born Virginia Roberts. Key accuser and survivor in the Jeffrey Epstein case. Recruited by Ghislaine Maxwell at age 16 while working at Mar-a-Lago. Alleged she was trafficked to multiple prominent men including Prince Andrew, Alan Dershowitz, and others. Filed landmark lawsuit against Maxwell. Settled civil suit with Prince Andrew for estimated $12 million. Her testimony and legal battles were instrumental in bringing the Epstein network to justice. Named in court as having been flown around the world on the "Lolita Express" to Epstein\'s properties in New York, Florida, New Mexico, the US Virgin Islands, and to London and Paris.',
  'jamie-dimon': 'American billionaire businessman. Chairman and CEO of JPMorgan Chase since 2005. Leads the largest bank in the United States. JPMorgan maintained Jeffrey Epstein as a client for over 15 years despite his 2008 conviction. The bank settled with Epstein victims and the US Virgin Islands for a combined $365 million in 2023, admitting to compliance failures in monitoring Epstein\'s accounts. Named the most influential banker in the world.',
  'tom-barrack': 'American private equity real estate investor. Founder of Colony Capital (now DigitalBridge). Named in Epstein\'s contacts. Part of the New York real estate and finance social circle that overlapped with Epstein\'s network. Later indicted on charges of acting as an unregistered foreign agent for the UAE; acquitted in 2022.',
  'barry-diller': 'American billionaire businessman and media executive. Chairman of IAC and Expedia Group. Named in Epstein\'s black book with multiple contact numbers. Part of the New York media elite that overlapped with Epstein\'s social circle. Former chairman of Fox Broadcasting and Paramount Pictures.',
  'roman-abramovich': 'Russian-Israeli billionaire. Former owner of Chelsea FC. Named in Epstein\'s black book. Made fortune during Russian privatization. Holds Israeli citizenship. Subject to sanctions after Russia\'s 2022 invasion of Ukraine.',
  'rupert-murdoch': 'Australian-born American media mogul. Founder of News Corp and Fox. Named in Epstein\'s black book with multiple contact numbers. Built a global media empire. His ex-wife Wendi Deng also appeared in Epstein\'s contacts.',
  'michael-bloomberg': 'American billionaire businessman and politician. Founder of Bloomberg L.P. Former Mayor of New York City. Named in Epstein\'s black book. Major philanthropist.',
};

for (const [id, bio] of Object.entries(bioUpdates)) {
  if (pd.people[id] && bio.length > (pd.people[id].bio || '').length) {
    pd.people[id].bio = bio;
  }
}

// =====================================================================
// PART 3: Update the Epstein Network entry with ALL individuals
// =====================================================================
const usEntries = jd.countries['United States'];
const epIdx = usEntries.findIndex(e => e.id === 'epstein-network');
const epEntry = usEntries[epIdx];

// Map of ALL individuals for the Epstein Network
const allEpsteinIndividuals = [
  // --- Core Ring ---
  { name: 'Jeffrey Epstein', id: 'jeffrey-epstein', role: 'Principal - Financier & Convicted Sex Trafficker' },
  { name: 'Ghislaine Maxwell', id: 'ghislaine-maxwell', role: 'Chief Procurer & Convicted Sex Trafficker (20-yr sentence)' },
  { name: 'Sarah Kellen', id: 'sarah-kellen', role: 'Personal Scheduler & Alleged Recruiter (NPA recipient)' },
  { name: 'Nadia Marcinkova', id: 'nadia-marcinkova', role: 'Victim Turned Associate (NPA recipient)' },
  { name: 'Lesley Groff', id: 'leslie-groff', role: 'Personal Assistant (NPA recipient)' },
  { name: 'Adriana Ross', id: 'adriana-ross', role: 'Inner Circle Associate (NPA recipient)' },
  { name: 'Jean-Luc Brunel', id: 'jean-luc-brunel', role: 'MC2 Modeling Agent - Found Dead in Custody Feb 2022' },
  { name: 'Darren Indyke', id: 'darren-indyke', role: 'Longtime Lawyer & Estate Co-Executor' },
  { name: 'Richard Kahn', id: 'richard-kahn', role: 'Financial Manager & Estate Co-Executor' },

  // --- Victims / Key Witnesses ---
  { name: 'Virginia Giuffre', id: 'virginia-giuffre', role: 'Key Victim & Accuser - Recruited at 16 at Mar-a-Lago' },
  { name: 'Courtney Wild', id: 'courtney-wild', role: 'Victim & Advocate - Crime Victims\' Rights Act plaintiff' },
  { name: 'Annie Farmer', id: 'annie-farmer', role: 'Victim - Testified at Maxwell Trial' },
  { name: 'Carolyn Andriano', id: 'carolyn-andriano', role: 'Victim - Recruited at 14, testified at Maxwell Trial' },
  { name: 'Maria Farmer', id: 'maria-farmer', role: 'First Known Victim to Report to FBI (1996)' },

  // --- Financial Enablers ---
  { name: 'Leslie Wexner', id: 'leslie-wexner', role: 'Primary Financial Client - Gave Power of Attorney & $77M Townhouse' },
  { name: 'Leon Black', id: 'leon-black', role: 'Apollo Global - Paid $158M in Advisory Fees (2012-2017)' },
  { name: 'Jes Staley', id: 'jes-staley', role: 'Barclays/JP Morgan - 1,200+ Personal Emails with Epstein' },
  { name: 'Jamie Dimon', id: 'jamie-dimon', role: 'JPMorgan Chase CEO - Bank Kept Epstein as Client 15+ Years ($365M Settlement)' },
  { name: 'Mary Erdoes', id: 'mary-erdoes', role: 'JP Morgan Wealth Mgmt CEO - Bank Facilitated Epstein\'s Accounts' },
  { name: 'Rosemary Vrablic', id: 'deutsche-bank-rel', role: 'Deutsche Bank - Personally Managed Epstein Accounts ($150M Fine)' },
  { name: 'Steven Hoffenberg', id: 'steven-hoffenberg', role: 'Business Partner - Co-attempted Pan Am Takeover (d. 2022)' },
  { name: 'Alan "Ace" Greenberg', id: 'alan-greenberg', role: 'Bear Stearns CEO - Hired Epstein Without College Degree' },
  { name: 'James Cayne', id: 'james-cayne', role: 'Bear Stearns CEO - Early Epstein Colleague' },
  { name: 'Glenn Dubin', id: 'glenn-dubin', role: 'Highbridge Capital - Close Friend 20+ Years, Giuffre Accuser' },
  { name: 'Eva Andersson-Dubin', id: 'eva-andersson-dubin', role: 'Former Girlfriend of Epstein, Named Backup Executor' },
  { name: 'Boris Nikolic', id: 'boris-nikolic', role: 'Biotech Investor - Named Backup Executor in Will' },

  // --- Political Connections ---
  { name: 'Bill Clinton', id: 'bill-clinton-individual', role: 'Former President - 26+ Flights on Lolita Express' },
  { name: 'Donald Trump', id: 'donald-trump', role: 'Former President - Pre-2004 Social Associate, Banned From Mar-a-Lago' },
  { name: 'Prince Andrew', id: 'prince-andrew', role: 'Duke of York - Settled Civil Suit ($12M), Stripped of Titles' },
  { name: 'Ehud Barak', id: 'ehud-barak', role: 'Former Israeli PM - Carbyne Business Partner, Visited Post-Conviction' },
  { name: 'Tony Blair', id: 'tony-blair', role: 'Former UK PM - Black Book, Post-Office Visits' },
  { name: 'Bill Richardson', id: 'bill-richardson', role: 'Former NM Governor - Named in Court Documents (d. 2023)' },
  { name: 'George Mitchell', id: 'george-mitchell', role: 'Former Senate Majority Leader - Named in Court Documents' },
  { name: 'Dennis Hastert', id: 'denny-hastert', role: 'Former House Speaker - Epstein Contact (Later Convicted of Abuse)' },
  { name: 'Andrew Cuomo', id: 'andrew-cuomo', role: 'Former NY Governor - Black Book Contact' },
  { name: 'Al Gore', id: 'al-gore', role: 'Former Vice President - Black Book Contact' },
  { name: 'John Kerry', id: 'john-kerry', role: 'Former Secretary of State - Black Book Contact' },
  { name: 'George Pataki', id: 'george-pataki', role: 'Former NY Governor - Black Book Contact' },
  { name: 'Alexander Acosta', id: 'alexander-acosta', role: 'Former US Attorney - Negotiated Lenient 2008 Plea Deal' },
  { name: 'William Barr', id: 'bill-barr', role: 'AG During Epstein Death - Father Hired Epstein at Dalton' },
  { name: 'Donald Barr', id: 'donald-barr', role: 'Dalton School Headmaster - Hired Epstein Without Degree' },
  { name: 'Chris Tucker', id: 'chris-tucker', role: 'Actor - 2002 Africa Flight with Clinton on Lolita Express' },
  { name: 'Kevin Spacey', id: 'kevin-spacey', role: 'Actor - 2002 Africa Flight with Clinton on Lolita Express' },

  // --- Legal Team / Enablers ---
  { name: 'Alan Dershowitz', id: 'alan-dershowitz-ind', role: 'Defense Lawyer - Negotiated 2008 Deal, Accused by Giuffre' },
  { name: 'Ken Starr', id: 'ken-starr', role: 'Defense Lawyer - Negotiated 2008 Deal (d. 2022)' },
  { name: 'Jay Lefkowitz', id: 'jay-lefkowitz', role: 'Defense Lawyer (Kirkland & Ellis) - 2008 Plea Negotiations' },
  { name: 'Gerald Lefcourt', id: 'gerald-lefcourt', role: 'Defense Lawyer - Wrote Leniency Letter for Epstein' },
  { name: 'Martin Weinberg', id: 'martin-weinberg', role: 'Defense Lawyer - 2019 Federal Case' },
  { name: 'David Boies', id: 'david-boies', role: 'Attorney - Represented Giuffre Against Maxwell' },
  { name: 'Sigrid McCawley', id: 'sigrid-mccawley', role: 'Attorney - Lead Counsel for Giuffre, Unsealed Documents' },
  { name: 'Brad Edwards', id: 'brad-edwards', role: 'Attorney - Represented 50+ Victims, Wrote "Relentless Pursuit"' },
  { name: 'Barry Krischer', id: 'barry-krischer', role: 'Palm Beach State Attorney - Criticized for Weak Prosecution' },

  // --- Prosecutors & Investigators ---
  { name: 'Geoffrey Berman', id: 'geoffrey-berman', role: 'SDNY US Attorney - Oversaw 2019 Arrest & Indictment' },
  { name: 'Maurene Comey', id: 'maurene-comey', role: 'SDNY AUSA - Maxwell Prosecution Team' },
  { name: 'Judge Alison Nathan', id: 'alison-nathan', role: 'Federal Judge - Presided Over Maxwell Trial' },
  { name: 'Greg Holbert', id: 'greg-holbert', role: 'Palm Beach Detective - Led Initial 2005 Investigation' },
  { name: 'Michael Reiter', id: 'michael-reiter', role: 'Palm Beach Police Chief - Pressured Prosecutors for Charges' },
  { name: 'Julie K. Brown', id: 'julie-k-brown', role: 'Miami Herald - "Perversion of Justice" Reignited Case in 2018' },

  // --- Academic / Scientific Network ---
  { name: 'Lawrence Summers', id: 'lawrence-summers-harvard', role: 'Former Harvard President & Treasury Secretary - Post-Conviction Meetings' },
  { name: 'Steven Pinker', id: 'steven-pinker', role: 'Harvard - Provided Legal Advice to Epstein Defense (2007)' },
  { name: 'Noam Chomsky', id: 'noam-chomsky', role: 'MIT - Met Epstein Multiple Times Post-Conviction' },
  { name: 'Joichi Ito', id: 'joichi-ito', role: 'MIT Media Lab Director - Concealed $7.5M in Epstein Donations (Resigned)' },
  { name: 'Nicholas Negroponte', id: 'nicholas-negroponte', role: 'MIT Media Lab Founder - Directed Epstein Donations' },
  { name: 'Rafael Reif', id: 'gabriel-bhatt', role: 'MIT President - Knew of Concealed Epstein Donations (Resigned)' },
  { name: 'Seth Lloyd', id: 'seth-lloyd', role: 'MIT Professor - Received $225K From Epstein Post-Conviction' },
  { name: 'Lawrence Krauss', id: 'lawrence-krauss', role: 'ASU Physicist - Close Associate, Publicly Defended Epstein' },
  { name: 'George Church', id: 'george-church', role: 'Harvard/MIT Geneticist - Accepted Epstein Research Funding' },
  { name: 'Stephen Hawking', id: 'stephen-hawking', role: 'Physicist - Attended 2006 Conference on Epstein\'s Island' },
  { name: 'Murray Gell-Mann', id: 'murray-gell-mann', role: 'Nobel Physicist - Visited Epstein Properties' },
  { name: 'Danny Hillis', id: 'danny-hillis', role: 'Computer Scientist - Close Associate, Introduced Scientists to Epstein' },
  { name: 'Robert Trivers', id: 'robert-trivers', role: 'Evolutionary Biologist - Received Epstein Foundation Funding' },
  { name: 'Nathan Wolfe', id: 'nathan-wolfe', role: 'Virologist - Epstein Sat on His Advisory Board' },
  { name: 'Frank Wilczek', id: 'frank-wilczek', role: 'Nobel Physicist - Black Book Contact' },
  { name: 'Lisa Randall', id: 'lisa-randall', role: 'Harvard Physicist - Black Book Contact' },
  { name: 'Oliver Sacks', id: 'oliver-sacks', role: 'Neurologist & Author - Black Book Contact' },
  { name: 'Marvin Minsky', id: 'marvin-minsky', role: 'MIT AI Pioneer - Visited Island, Giuffre Accusation (d. 2016)' },
  { name: 'John Brockman', id: 'john-brockman', role: 'Edge Foundation - Key Connector Between Epstein & Scientists' },
  { name: 'Katinka Matson', id: 'katinka-matson', role: 'Edge Foundation Co-Founder - Facilitated Epstein-Science Network' },

  // --- Technology ---
  { name: 'Bill Gates', id: 'bill-gates', role: 'Microsoft - Multiple Post-Conviction Meetings, Flew on Jet, Cited in Divorce' },
  { name: 'Reid Hoffman', id: 'reid-hoffman', role: 'LinkedIn - Post-Conviction Meetings, Apologized, Donated $500K to MIT' },
  { name: 'Elon Musk', id: 'elon-musk-ind', role: 'Tesla/SpaceX - Photographed with Maxwell 2011' },
  { name: 'Sergey Brin', id: 'sergey-brin', role: 'Google Co-Founder - Reported in Epstein Dinners' },

  // --- Media & Entertainment ---
  { name: 'Woody Allen', id: 'woody-allen-ind', role: 'Filmmaker - Social Dinners with Epstein' },
  { name: 'Harvey Weinstein', id: 'harvey-weinstein', role: 'Film Producer - Black Book Contact (Convicted of Rape)' },
  { name: 'Les Moonves', id: 'les-moonves', role: 'CBS CEO - Black Book Contact' },
  { name: 'Naomi Campbell', id: 'naomi-campbell', role: 'Supermodel - Flight Logs & Social Events' },
  { name: 'Heidi Klum', id: 'heidi-klum', role: 'Supermodel - Black Book Contact' },
  { name: 'Elle Macpherson', id: 'elle-macpherson', role: 'Supermodel - Flight Logs & Social Contact' },
  { name: 'David Blaine', id: 'david-blaine', role: 'Magician - Close Associate, Attended Events, Flight Logs' },
  { name: 'David Copperfield', id: 'david-copperfield', role: 'Magician - Black Book, Named by Giuffre' },
  { name: 'Mick Jagger', id: 'mick-jagger', role: 'Rolling Stones - Black Book Contact' },
  { name: 'Alec Baldwin', id: 'alec-baldwin', role: 'Actor - Black Book Contact' },
  { name: 'Ralph Fiennes', id: 'ralph-fiennes', role: 'Actor - Black Book Contact' },
  { name: 'Dustin Hoffman', id: 'dustin-hoffman', role: 'Actor - Black Book Contact' },
  { name: 'Courtney Love', id: 'courtney-love', role: 'Musician - Black Book Contact' },
  { name: 'Chris Rock', id: 'chris-rock', role: 'Comedian - Black Book Contact' },
  { name: 'Cate Blanchett', id: 'cate-blanchett', role: 'Actress - Black Book Contact' },
  { name: 'Charlie Rose', id: 'charlie-rose', role: 'TV Journalist - Black Book (Later Fired for Harassment)' },
  { name: 'Barbara Walters', id: 'barbara-walters', role: 'Journalist - Black Book Contact' },
  { name: 'Diane Sawyer', id: 'diane-sawyer', role: 'ABC Journalist - Black Book Contact' },
  { name: 'Mike Wallace', id: 'mike-wallace', role: '60 Minutes - Black Book Contact' },
  { name: 'Katie Couric', id: 'katie-couric', role: 'Journalist - 2010 Post-Conviction Dinner Attendee' },
  { name: 'George Stephanopoulos', id: 'george-stephanopoulos', role: 'ABC News - 2010 Post-Conviction Dinner Attendee' },
  { name: 'Steve Bannon', id: 'steve-bannon', role: 'Breitbart/WH - Visited Epstein Pre-Arrest' },
  { name: 'James Patterson', id: 'james-patterson', role: 'Author - Wrote "Filthy Rich" Book on Epstein Case (2016)' },
  { name: 'Mort Zuckerman', id: 'mort-zuckerman', role: 'Media Owner (NY Daily News) - Black Book & Social Circle' },

  // --- Finance / Business (Black Book & Associates) ---
  { name: 'Lynn Forester de Rothschild', id: 'lynn-forester-de-rothschild', role: 'E.L. Rothschild CEO - Introduced Epstein to Clinton Circle' },
  { name: 'Edgar Bronfman Sr.', id: 'edgar-bronfman-sr', role: 'Seagram/WJC - Black Book Contact' },
  { name: 'Thomas Pritzker', id: 'thomas-pritzker', role: 'Hyatt Hotels - Black Book Contact' },
  { name: 'David Koch', id: 'david-koch', role: 'Koch Industries - Black Book Contact' },
  { name: 'Ron Burkle', id: 'ron-burkle', role: 'Yucaipa Companies - Black Book, Clinton Circle' },
  { name: 'Michael Ovitz', id: 'michael-ovitz', role: 'CAA/Disney - Black Book Contact' },
  { name: 'Pepe Fanjul', id: 'pepe-fanjul', role: 'Sugar Baron - Black Book, Palm Beach Circle' },
  { name: 'Alan Patricof', id: 'alan-patricof', role: 'Venture Capitalist - Black Book Contact' },
  { name: 'Arpad Busson', id: 'arpad-busson', role: 'EIM Group Financier - Black Book Contact' },
  { name: 'Peter Soros', id: 'peter-soros', role: 'George Soros Nephew - Black Book Contact' },
  { name: 'Itzhak Perlman', id: 'itzhak-perlman', role: 'World-Famous Violinist - Black Book Contact' },

  // --- International / Social ---
  { name: 'Peter Mandelson', id: 'peter-mandelson', role: 'UK Politician - Black Book, Multiple Visits' },
  { name: 'Sarah Ferguson', id: 'sarah-ferguson', role: 'Duchess of York - Andrew Used Epstein Money for Her Debt' },
  { name: 'Flavio Briatore', id: 'flavio-briatore', role: 'F1 Team Principal - Black Book, Maxwell Circle' },
  { name: 'Conrad Black', id: 'conrad-black', role: 'Media Baron - Black Book, Maxwell Social Circle' },
  { name: 'Andrea Casiraghi', id: 'andrea-casiraghi', role: 'Monaco Royal Family - Black Book Contact' },
  { name: 'Prince Albert II of Monaco', id: 'prince-albert-monaco', role: 'Sovereign Prince of Monaco - Black Book Contact' },
  { name: 'Nicky Hilton', id: 'nicky-hilton', role: 'Socialite - Black Book Contact' },
  { name: 'Vera Wang', id: 'vera-wang', role: 'Fashion Designer - Black Book Contact' },
  { name: 'Wendi Deng', id: 'wendi-deng', role: 'Murdoch Ex-Wife - Black Book, Maxwell Social Circle' },
  { name: 'Nacho Figueras', id: 'nacho-figueras', role: 'Polo Player - Social Circle' },
  { name: 'Zac Goldsmith', id: 'gerald-goldsmith', role: 'UK Politician - Black Book Contact' },
  { name: 'Isabelle de Rouvre', id: 'isabelle-de-rouvre', role: 'Sold Epstein Paris Apartment ($8.4M), Sued for Fraud' },
  { name: 'Ivana Trump', id: 'ivana-trump', role: 'Trump Ex-Wife - Black Book Contact' },

  // --- Maxwell Family ---
  { name: 'Robert Maxwell', id: 'robert-maxwell', role: 'Ghislaine\'s Father - Media Baron, Alleged Mossad/MI6/KGB (d. 1991)' },
  { name: 'Isabel Maxwell', id: 'elaine-maxwell', role: 'Ghislaine\'s Twin Sister - Israeli Tech Entrepreneur' },
  { name: 'Christine Maxwell', id: 'christine-maxwell', role: 'Ghislaine\'s Sister - Internet Pioneer (Magellan Search)' },
  { name: 'Kevin Maxwell', id: 'kevin-maxwell', role: 'Ghislaine\'s Brother - Acquitted of Pension Fraud' },
  { name: 'Ian Maxwell', id: 'ian-maxwell', role: 'Ghislaine\'s Brother - Family Spokesperson at Trial' },

  // --- Intelligence Claims ---
  { name: 'Ari Ben-Menashe', id: 'ari-ben-menashe', role: 'Former Israeli Intel - Claimed Epstein Was Intelligence Asset' },

  // --- Epstein Property Staff ---
  { name: 'Juan Alessi', id: 'juan-alessi', role: 'Palm Beach House Manager (11 years) - Testified at Maxwell Trial' },
  { name: 'Cimberly Espinosa', id: 'cimberly-espinosa', role: 'Executive Assistant - Testified at Maxwell Trial' },
  { name: 'Abigail Wexner', id: 'les-wexner-foundation', role: 'Leslie Wexner\'s Wife - Managed Philanthropic Reputation' },

  // --- Financial Institution Connections ---
  { name: 'Jeffrey Fuller', id: 'jeffrey-fuller', role: 'MC2 Model Management Partner - Epstein-Funded Agency' },

  // --- Henry Kissinger ---
  { name: 'Henry Kissinger', id: 'henry-kissinger', role: 'Former Secretary of State - Black Book Contact, Dinner Attendee' },

  // --- Paris Hilton ---
  { name: 'Paris Hilton', id: 'conrad-hilton-family', role: 'Socialite - Black Book Contact' },

  // --- Additional ---
  { name: 'Stuart Pivar', id: 'stuart-pivar', role: 'Art Collector - Self-Described "Oldest Friend"' },
  { name: 'Michael Sitrick', id: 'michael-sitrick', role: 'Crisis PR - Represented Wexner During Epstein Fallout' },
];

// Update the entry
epEntry.individuals = allEpsteinIndividuals;
epEntry.summary = 'The network of associates, enablers, victims, prosecutors, and connected individuals surrounding Jeffrey Epstein and Ghislaine Maxwell. This entry maps ' + allEpsteinIndividuals.length + ' documented connections based on court filings, flight logs (Lolita Express manifests), Epstein\'s black book (containing 1,571 names), financial records, deposition testimony, Maxwell trial exhibits, the 2008 non-prosecution agreement, and investigative journalism including the Miami Herald\'s "Perversion of Justice" series. The network spans finance, politics, technology, media, academia, royalty, entertainment, and intelligence communities across multiple countries.';

// Also add more connections to other entries
epEntry.connections = [
  { source: 'epstein-network', target: 'wexner-foundation', type: 'Financial - Wexner was Epstein\'s only known major client, gave him power of attorney' },
  { source: 'epstein-network', target: 'apollo-global', type: 'Financial - Leon Black paid $158M in advisory fees (2012-2017)' },
  { source: 'epstein-network', target: 'jpmorgan-chase', type: 'Financial - JP Morgan kept Epstein as client 15+ years, $365M settlement' },
  { source: 'epstein-network', target: 'deutsche-bank', type: 'Financial - Deutsche Bank managed Epstein accounts (2013-2018), $150M fine' },
  { source: 'epstein-network', target: 'barclays', type: 'Financial - Jes Staley (CEO) had 1,200+ emails with Epstein' },
  { source: 'epstein-network', target: 'goldman-sachs-historic', type: 'Financial - Multiple Goldman executives in black book' },
  { source: 'epstein-network', target: 'microsoft', type: 'Technology - Bill Gates met Epstein multiple times post-conviction' },
  { source: 'epstein-network', target: 'openai', type: 'Technology - Reid Hoffman (board) met Epstein post-conviction' },
  { source: 'epstein-network', target: 'mit-media-lab', type: 'Academic - $7.5M in concealed Epstein donations' },
  { source: 'epstein-network', target: 'harvard-university', type: 'Academic - Multiple Harvard faculty connected, Epstein donated to Harvard' },
  { source: 'epstein-network', target: 'fox-news-channel', type: 'Media - Rupert Murdoch in black book' },
  { source: 'epstein-network', target: 'walt-disney-company', type: 'Media - Michael Ovitz (former Disney president) in black book' },
  { source: 'epstein-network', target: 'world-jewish-congress', type: 'Organization - Edgar Bronfman Sr. (WJC president) in black book' },
];

usEntries[epIdx] = epEntry;

// =====================================================================
// SAVE
// =====================================================================
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

console.log(`Added ${newPeople} new people`);
console.log(`Epstein Network now has ${allEpsteinIndividuals.length} individuals`);
console.log(`Epstein Network has ${epEntry.connections.length} org connections`);
console.log(`Total people in DB: ${totalPeople}`);
console.log(`Total entries: ${totalEntries}`);
console.log(`Total connections: ${totalConns}`);

// Verify all Epstein individuals exist in people.json
let missing = 0;
allEpsteinIndividuals.forEach(i => {
  if (!pd.people[i.id]) { console.log('MISSING:', i.id, i.name); missing++; }
});
console.log('Missing people entries:', missing);
