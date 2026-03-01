/**
 * enrichEpstein2.js - Add individuals to remaining 27 sparse Epstein sub-entries
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'jewish.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const enrichments = {
  "harvard-university": [
    { id: "lawrence-summers-harvard", name: "Lawrence Summers", role: "Harvard president (2001-2006) who maintained a relationship with Epstein and met with him on campus after 2008 conviction", bio: "Economist who served as US Treasury Secretary under Clinton and then Harvard president. Acknowledged meeting Epstein on campus after 2008 conviction. Harvard's 2020 internal review found Summers had a substantive ongoing relationship with Epstein." },
    { id: "martin-nowak-harvard", name: "Martin Nowak", role: "Harvard evolutionary biologist whose Program for Evolutionary Dynamics received $6.5 million from Epstein", bio: "Austrian-American mathematician and biologist who directs the Program for Evolutionary Dynamics at Harvard. Epstein was the program's founding donor and visited Nowak's office frequently." },
    { id: "alan-dershowitz-harvard", name: "Alan Dershowitz", role: "Harvard Law School professor emeritus who served on Epstein's defense team", bio: "High-profile appellate lawyer and Harvard Law professor for over 50 years. Key member of Epstein's legal defense team that negotiated the controversial 2008 non-prosecution agreement." },
    { id: "drew-faust-harvard", name: "Drew Gilpin Faust", role: "Harvard president (2007-2018) who oversaw the period when the university accepted Epstein gifts after his conviction", bio: "Historian and 28th president of Harvard. Under her leadership, Harvard continued to accept donations from Epstein after his 2008 sex offense conviction." },
    { id: "stephen-kosslyn-harvard", name: "Stephen Kosslyn", role: "Former Harvard psychology dean who accepted Epstein research funding and visited Epstein's homes", bio: "Cognitive neuroscientist and former dean of social science at Harvard. Accepted research funding from Epstein and was identified in Harvard's 2020 internal review as having significant contact with Epstein." },
    { id: "robert-trivers-harvard", name: "Robert Trivers", role: "Evolutionary biologist who received Epstein research funding and visited his Virgin Islands property", bio: "Renowned evolutionary biologist who received funding through the Jeffrey Epstein VI Foundation. He visited Epstein's island and attended events at his Manhattan townhouse." }
  ],
  "l-brands-victorias-secret": [
    { id: "les-wexner-vs", name: "Les Wexner", role: "Founder of L Brands and Epstein's only known major financial patron who gave him sweeping power of attorney", bio: "American billionaire who built Victoria's Secret into a global brand. Granted Epstein power of attorney over his finances and transferred a $77 million Manhattan townhouse to him." },
    { id: "ed-razek-vs", name: "Ed Razek", role: "L Brands chief marketing officer whose Victoria's Secret brand was exploited by Epstein to approach young women", bio: "Longtime L Brands executive who oversaw Victoria's Secret marketing including the Angels fashion show. The VS brand was leveraged by Epstein to approach young women by posing as talent scouts." },
    { id: "maria-farmer-vs", name: "Maria Farmer", role: "One of the first Epstein accusers who was assaulted at Wexner's Ohio estate in 1996", bio: "Artist who was sexually assaulted by Epstein and Maxwell at Les Wexner's Ohio compound in 1996. She filed an FBI complaint in 1996 that was not pursued for years." },
    { id: "alicia-arden-vs", name: "Alicia Arden", role: "Aspiring model who filed a 1997 police report alleging Epstein groped her while using a talent scout pretense", bio: "Filed a police report with Santa Monica PD in 1997 alleging Epstein groped her during what was presented as a modeling audition connected to Victoria's Secret." },
    { id: "robert-morosky-vs", name: "Robert Morosky", role: "Former Vice Chairman of The Limited whose departure coincided with Epstein's growing influence over Wexner", bio: "Served as Vice Chairman of The Limited. His departure from the company reportedly coincided with Epstein's increasing control over Wexner's business affairs." }
  ],
  "dalton-school": [
    { id: "donald-barr-dalton", name: "Donald Barr", role: "Dalton School headmaster who hired the 20-year-old Epstein to teach math despite his lack of a college degree", bio: "Educator and former OSS intelligence officer who served as headmaster of the Dalton School. He hired Epstein to teach calculus and physics in 1974. Father of William Barr, who later served as US Attorney General." },
    { id: "william-barr-dalton", name: "William Barr", role: "Donald Barr's son and US Attorney General during Epstein's 2019 arrest and death in federal custody", bio: "Served as US Attorney General under Presidents George H.W. Bush and Donald Trump. He was AG during Epstein's arrest, imprisonment, and death at the Metropolitan Correctional Center in August 2019." },
    { id: "alan-greenberg-dalton", name: "Alan 'Ace' Greenberg", role: "Bear Stearns chairman who hired Epstein in 1976 based on recommendations from wealthy Dalton families", bio: "Legendary Wall Street trader who led Bear Stearns for decades. He hired Epstein as a junior trader at the firm based on recommendations from wealthy Dalton School parents." }
  ],
  "us-virgin-islands-gov": [
    { id: "denise-george-usvi", name: "Denise George", role: "USVI Attorney General who filed landmark civil suits against Epstein's estate and JPMorgan Chase", bio: "Served as USVI Attorney General and filed a groundbreaking civil enforcement action against Epstein's estate and JPMorgan Chase. She was fired by Governor Albert Bryan Jr. reportedly for filing the JPMorgan suit without approval." },
    { id: "albert-bryan-jr-usvi", name: "Albert Bryan Jr.", role: "USVI Governor who fired AG Denise George after she filed the JPMorgan Chase lawsuit", bio: "Governor of the US Virgin Islands who fired AG Denise George in January 2023 shortly after she filed the $190 million lawsuit against JPMorgan Chase." },
    { id: "cecile-de-jongh-usvi", name: "Cecile de Jongh", role: "Wife of former USVI Governor John de Jongh Jr. who was employed by Epstein on St. Thomas", bio: "Wife of former USVI Governor John de Jongh Jr. Court documents revealed she was employed by Epstein as an administrative assistant at his office on St. Thomas." },
    { id: "stephen-deckoff-usvi", name: "Stephen Deckoff", role: "Billionaire financier who purchased Epstein's two Virgin Islands properties for approximately $60 million in 2023", bio: "Founder of Black Diamond Capital Management. He purchased Little St. James and Great St. James islands from Epstein's estate for approximately $60 million in 2023." },
    { id: "ariel-smith-usvi", name: "Ariel Smith", role: "USVI Acting AG who continued Epstein-related litigation after Denise George's termination", bio: "Served as USVI Acting AG after Denise George's firing. She continued the litigation, helping secure a $105 million settlement with the Epstein estate and a $75 million settlement with JPMorgan Chase." }
  ],
  "reid-hoffman-connections": [
    { id: "joi-ito-hoffman", name: "Joi Ito", role: "MIT Media Lab director who accepted Epstein donations facilitated in part by Hoffman and resigned in 2019", bio: "Japanese-American activist and entrepreneur who directed the MIT Media Lab from 2011 to 2019. He accepted donations from Epstein and concealed them. He resigned in September 2019 after reporting by Ronan Farrow in The New Yorker." },
    { id: "danny-hillis-hoffman", name: "Danny Hillis", role: "Computer scientist and Edge Foundation member who received Epstein funding through overlapping networks", bio: "Pioneer in parallel computing who co-founded Thinking Machines Corporation. He acknowledged receiving research funding from Epstein and attending events at Epstein's residences." },
    { id: "seth-lloyd-hoffman", name: "Seth Lloyd", role: "MIT quantum computing professor who received $225,000 in personal gifts from Epstein", bio: "MIT mechanical engineering professor and quantum computing pioneer. He received $225,000 in personal gifts from Epstein and visited his island. MIT placed him on paid administrative leave in 2020." }
  ],
  "steve-bannon-connections": [
    { id: "michael-wolff-bannon", name: "Michael Wolff", role: "Journalist who documented Bannon-Epstein contacts while reporting on the Trump orbit", bio: "Journalist and author of 'Fire and Fury' and 'Siege.' In his reporting on the Trump White House, Wolff documented contacts between Bannon and Epstein." },
    { id: "guo-wengui-bannon", name: "Guo Wengui (Miles Guo)", role: "Chinese billionaire and Bannon associate on whose yacht Bannon was arrested for fraud in 2020", bio: "Chinese businessman and political dissident. Bannon was arrested aboard Guo's yacht in August 2020 on fraud charges related to the 'We Build the Wall' campaign." }
  ],
  "woody-allen-connections": [
    { id: "katie-couric-allen", name: "Katie Couric", role: "Journalist who attended a 2010 dinner at Epstein's Manhattan townhouse alongside Allen and other media figures", bio: "Television journalist and former NBC Today Show anchor. She attended a 2010 dinner at Epstein's townhouse after Epstein's conviction. She wrote about the visit in her 2021 memoir 'Going There.'" },
    { id: "chelsea-handler-allen", name: "Chelsea Handler", role: "Comedian who attended a 2010 dinner at Epstein's Manhattan home alongside Allen post-conviction", bio: "American comedian who attended a 2010 dinner party at Epstein's Manhattan townhouse with other media and entertainment figures." },
    { id: "charlie-rose-allen", name: "Charlie Rose", role: "Television journalist who attended social events at Epstein's Manhattan residence", bio: "Former CBS anchor and PBS talk show host who attended social events at Epstein's townhouse and appeared in Epstein's contacts. Rose was later fired from CBS and PBS in 2017 over his own sexual harassment allegations." },
    { id: "george-stephanopoulos-allen", name: "George Stephanopoulos", role: "ABC News anchor who attended the same 2010 post-conviction dinner at Epstein's home alongside Allen", bio: "Television journalist and former Clinton White House Communications Director who attended the same 2010 dinner at Epstein's Manhattan townhouse." }
  ],
  "george-stephanopoulos-connections": [
    { id: "katie-couric-stephanopoulos", name: "Katie Couric", role: "NBC/CBS journalist who attended the same 2010 post-conviction dinner at Epstein's Manhattan home", bio: "Television journalist who attended the same 2010 dinner at Epstein's townhouse. She later wrote about the experience in her 2021 memoir 'Going There.'" },
    { id: "woody-allen-stephanopoulos", name: "Woody Allen", role: "Filmmaker who attended the same 2010 dinner at Epstein's home alongside Stephanopoulos", bio: "American filmmaker who attended the 2010 dinner at Epstein's home alongside Stephanopoulos, Couric, and others." },
    { id: "chelsea-handler-stephanopoulos", name: "Chelsea Handler", role: "Comedian who attended the same 2010 post-conviction dinner at Epstein's Manhattan townhouse", bio: "American comedian who was among the guests at the 2010 dinner at Epstein's townhouse." }
  ],
  "terra-mar-project": [
    { id: "ghislaine-maxwell-terramar", name: "Ghislaine Maxwell", role: "Founder and president of the TerraMar Project, which dissolved six days after Epstein's 2019 arrest", bio: "British socialite who founded TerraMar in 2012 ostensibly for ocean conservation. The nonprofit dissolved on July 12, 2019, just six days after Epstein's arrest. Convicted of sex trafficking in December 2021." },
    { id: "scott-borgerson-terramar", name: "Scott Borgerson", role: "Maritime technology CEO and Maxwell's partner connected to TerraMar through ocean industry circles", bio: "CEO of CargoMetrics. He was Maxwell's romantic partner before her arrest. Maxwell was hiding at a property purchased by Borgerson in New Hampshire when the FBI arrested her in July 2020." },
    { id: "jan-eliasson-terramar", name: "Jan Eliasson", role: "Former UN Deputy Secretary-General who appeared at TerraMar Project events at the United Nations", bio: "Swedish diplomat who served as UN Deputy Secretary-General. He appeared at TerraMar events at the United Nations, lending the organization international legitimacy." },
    { id: "alexandra-cousteau-terramar", name: "Alexandra Cousteau", role: "Ocean conservationist and granddaughter of Jacques Cousteau who appeared at TerraMar Project events", bio: "National Geographic explorer and granddaughter of Jacques Cousteau. She appeared at TerraMar Project events providing environmental credibility." }
  ],
  "j-epstein-company": [
    { id: "les-wexner-jeco", name: "Les Wexner", role: "Only confirmed major client of J. Epstein & Co. who granted Epstein extraordinary financial authority", bio: "L Brands founder and billionaire who was Epstein's only publicly identified major client. He granted Epstein full power of attorney over his finances." },
    { id: "lesley-groff-jeco", name: "Lesley Groff", role: "Executive assistant who managed Epstein's schedule and communications at J. Epstein & Co. for 20 years", bio: "Served as Epstein's executive assistant both at J. Epstein & Co. and personally for approximately 20 years. Named as a potential co-conspirator in the 2008 plea deal." },
    { id: "darren-indyke-jeco", name: "Darren Indyke", role: "Epstein's longtime attorney, co-executor of his estate, and legal advisor for J. Epstein & Co.", bio: "Attorney who served as Epstein's personal lawyer for years and was appointed co-executor of Epstein's estate. He managed legal affairs connected to Epstein's financial entities." },
    { id: "richard-kahn-jeco", name: "Richard Kahn", role: "Co-executor of Epstein's estate and longtime financial associate of Epstein", bio: "Served as co-executor of Jeffrey Epstein's estate alongside Darren Indyke. He was a longtime associate who managed financial and estate matters." }
  ],
  "jes-staley-connections": [
    { id: "mary-erdoes-staley", name: "Mary Erdoes", role: "JPMorgan Asset Management CEO who received internal warnings about Staley's Epstein relationship", bio: "Head of JPMorgan Asset and Wealth Management. Internal bank emails revealed she was aware of Staley's close relationship with Epstein." },
    { id: "jamie-dimon-staley", name: "Jamie Dimon", role: "JPMorgan Chase CEO during the period the bank maintained Epstein's accounts despite compliance warnings", bio: "CEO of JPMorgan Chase since 2005. The bank maintained Epstein's accounts until 2013 despite internal compliance concerns. JPMorgan later settled for $290 million with Epstein victims." },
    { id: "virginia-giuffre-staley", name: "Virginia Giuffre", role: "Epstein survivor whose legal team's discovery revealed Staley's extensive post-conviction communications with Epstein", bio: "Primary Epstein accuser whose civil litigation against JPMorgan helped expose the extent of Staley's relationship with Epstein, including 1,200+ emails and island visits." }
  ],
  "clinton-foundation": [
    { id: "doug-band-cf", name: "Doug Band", role: "Clinton presidential advisor who appeared on Epstein flight logs accompanying Clinton on multiple trips", bio: "Served as counselor to President Clinton and co-founded Teneo Holdings. Appeared on Epstein flight logs accompanying Clinton on multiple trips." },
    { id: "ghislaine-maxwell-cf", name: "Ghislaine Maxwell", role: "Epstein associate who attended Clinton Global Initiative events and Chelsea Clinton's 2010 wedding", bio: "British socialite convicted of sex trafficking who attended Clinton Global Initiative events representing the TerraMar Project. Also attended Chelsea Clinton's 2010 wedding." },
    { id: "ira-magaziner-cf", name: "Ira Magaziner", role: "CEO of the Clinton Health Access Initiative who oversaw the foundation's global health programs", bio: "CEO of the Clinton Health Access Initiative (CHAI). He managed the foundation's global health work. Some of Clinton's Africa trips involved transport on Epstein's aircraft." },
    { id: "mark-middleton-cf", name: "Mark Middleton", role: "Special Assistant to President Clinton who arranged at least three Epstein visits to the White House", bio: "Served as Special Assistant to President Clinton and helped arrange Epstein's access to the White House. Visitor logs from FOIA showed he facilitated at least three Epstein visits." }
  ],
  "mortimer-zuckerman-connections": [
    { id: "ghislaine-maxwell-zuckerman", name: "Ghislaine Maxwell", role: "Epstein's primary associate who moved in the same Manhattan media and society circles as Zuckerman", bio: "British socialite convicted of sex trafficking who facilitated Epstein's social connections across Manhattan high society, including circles overlapping with Zuckerman." },
    { id: "leon-black-zuckerman", name: "Leon Black", role: "Apollo Global Management co-founder who, like Zuckerman, was a billionaire in Epstein's financial orbit", bio: "Apollo Global Management co-founder who paid Epstein $158 million in advisory fees between 2012 and 2017. Like Zuckerman, he was part of the New York billionaire circle Epstein cultivated." },
    { id: "henry-kissinger-zuckerman", name: "Henry Kissinger", role: "Former Secretary of State who attended Epstein social events alongside Zuckerman and other prominent figures", bio: "Former Secretary of State who appeared at Epstein social gatherings alongside Zuckerman and other New York elites. Both were listed in Epstein's contact book." }
  ],
  "lawrence-krauss-connections": [
    { id: "john-brockman-krauss", name: "John Brockman", role: "Literary agent and Edge Foundation founder who connected Krauss to Epstein's intellectual salon", bio: "Literary agent who founded the Edge Foundation and organized exclusive dinners where Epstein networked with scientists including Krauss." },
    { id: "steven-pinker-krauss", name: "Steven Pinker", role: "Harvard cognitive psychologist who attended Epstein events through the Brockman-Edge network alongside Krauss", bio: "Harvard professor and author who was photographed on Epstein's plane and attended events organized by Brockman where Epstein was present." },
    { id: "ghislaine-maxwell-krauss", name: "Ghislaine Maxwell", role: "Epstein's primary associate present at events where Krauss interacted with Epstein", bio: "British socialite convicted of sex trafficking who presided over Epstein's social and intellectual gatherings where scientists including Krauss met with Epstein." }
  ],
  "john-brockman-edge": [
    { id: "steven-pinker-edge", name: "Steven Pinker", role: "Harvard cognitive scientist and Edge contributor who attended events where Epstein was present", bio: "Harvard psychology professor and bestselling author who was a regular Edge contributor. Provided a linguistics opinion at Alan Dershowitz's request during Epstein legal proceedings." },
    { id: "joi-ito-edge", name: "Joi Ito", role: "MIT Media Lab director who accepted concealed Epstein donations facilitated through the Brockman network", bio: "Japanese-American entrepreneur who directed MIT Media Lab from 2011 to 2019. Connected to Epstein partly through Brockman's network. Resigned after Ronan Farrow reported he had concealed Epstein donations." },
    { id: "seth-lloyd-edge", name: "Seth Lloyd", role: "MIT quantum computing professor who received $225,000 in personal gifts from Epstein and visited his island", bio: "MIT professor and quantum computing pioneer who received $225,000 in personal gifts from Epstein. MIT placed him on paid administrative leave in 2020." },
    { id: "marvin-minsky-edge", name: "Marvin Minsky", role: "Pioneering MIT AI scientist Virginia Giuffre alleged she was directed to have relations with at Epstein's island", bio: "Late MIT professor considered a founding father of artificial intelligence. Virginia Giuffre alleged in a deposition that Epstein directed her to have sexual relations with Minsky at his Virgin Islands property. Minsky died in 2016." },
    { id: "danny-hillis-edge", name: "Danny Hillis", role: "Computer scientist and Edge Foundation member who received Epstein research funding", bio: "Pioneer in parallel computing who co-founded Thinking Machines Corporation. He was part of Brockman's Edge community and acknowledged receiving research funding from Epstein." }
  ],
  "epstein-vi-properties": [
    { id: "ghislaine-maxwell-vi", name: "Ghislaine Maxwell", role: "Epstein's partner who managed operations at the island properties and coordinated transport of victims", bio: "British socialite who managed household staff and logistics on Little St. James. Multiple victims described her as the 'lady of the house' who oversaw operations." },
    { id: "larry-visoski-vi", name: "Larry Visoski", role: "Epstein's chief pilot who flew hundreds of flights to the island and testified at Maxwell's trial", bio: "Served as Epstein's chief pilot for over 25 years flying the Boeing 727 and other aircraft to the islands. He testified at Ghislaine Maxwell's 2021 trial." },
    { id: "juan-alessi-vi", name: "Juan Alessi", role: "Epstein's longtime house manager who testified about operations and prominent visitors at the Maxwell trial", bio: "Served as Epstein's house manager in Palm Beach for over a decade. Provided key testimony at the Maxwell trial about young girls being brought to Epstein's properties." },
    { id: "stephen-deckoff-vi", name: "Stephen Deckoff", role: "Billionaire who purchased both Epstein islands from estate for approximately $60 million in 2023", bio: "Founder of Black Diamond Capital Management. He purchased Little St. James and Great St. James from Epstein's estate in 2023." }
  ],
  "cy-vance-connections": [
    { id: "john-sweeney-vance", name: "John K. Sweeney", role: "Former Manhattan DA who lobbied Vance's office on Epstein's behalf to reduce his sex offender status", bio: "Former senior Manhattan Assistant District Attorney turned defense lawyer retained by Epstein. He lobbied his former colleagues in Vance's office for Epstein's reduced sex offender registration level." },
    { id: "linda-fairstein-vance", name: "Linda Fairstein", role: "Former Manhattan sex crimes prosecutor who lobbied Vance's office as a defense consultant for Epstein", bio: "Former chief of the Sex Crimes Unit in the Manhattan DA's office. She was retained by Epstein's legal team and helped lobby Vance's office for the reduced sex offender designation." },
    { id: "ambra-battilana-gutierrez-vance", name: "Ambra Battilana Gutierrez", role: "Model whose NYPD sting recording of Weinstein admitting to groping was declined for prosecution by Vance", bio: "Italian-Filipino model who wore a wire for the NYPD and recorded Weinstein admitting to groping her. Despite this evidence, Vance's office declined to prosecute." }
  ],
  "kevin-spacey-connections": [
    { id: "bill-clinton-spacey", name: "Bill Clinton", role: "Former president who traveled with Spacey on Epstein's Boeing 727 to Africa in 2002", bio: "42nd President who traveled with Spacey and Chris Tucker on Epstein's jet during a 2002 trip to Africa, as documented in Epstein's flight logs." },
    { id: "chris-tucker-spacey", name: "Chris Tucker", role: "Comedian who traveled with Clinton and Spacey on Epstein's jet to Africa in 2002", bio: "American actor who accompanied Clinton and Spacey on the 2002 Africa trip aboard Epstein's Boeing 727, as documented in flight logs." },
    { id: "ghislaine-maxwell-spacey", name: "Ghislaine Maxwell", role: "Epstein's primary associate who was photographed with Spacey aboard Epstein's private jet", bio: "British socialite photographed with Spacey on Epstein's plane. Photos showed her and Spacey in the cockpit of Epstein's Boeing 727. Convicted of sex trafficking in 2021." }
  ],
  "david-boies-connections": [
    { id: "sigrid-mccawley-boies", name: "Sigrid McCawley", role: "Boies Schiller partner who served as lead counsel for Virginia Giuffre in her lawsuit against Maxwell", bio: "Attorney at Boies Schiller Flexner who led the Giuffre v. Maxwell civil litigation. Her legal work was instrumental in forcing the unsealing of court documents." },
    { id: "virginia-giuffre-boies", name: "Virginia Giuffre", role: "Lead Epstein accuser represented by Boies' firm in landmark lawsuits against Maxwell, Prince Andrew, and others", bio: "The most prominent Epstein survivor. Through Boies Schiller, she filed the 2015 lawsuit against Ghislaine Maxwell that broke open the Epstein case." },
    { id: "brad-edwards-boies", name: "Brad Edwards", role: "Plaintiffs' attorney who represented Epstein victims for over a decade alongside Boies' legal team", bio: "Florida attorney who represented Virginia Giuffre and dozens of Epstein victims for over a decade. He authored 'Relentless Pursuit' about the case." },
    { id: "ronan-farrow-boies", name: "Ronan Farrow", role: "Journalist who exposed Boies' dual role representing Epstein victims while deploying Black Cube for Weinstein", bio: "Investigative journalist whose book 'Catch and Kill' exposed how Boies' firm represented Epstein victims while simultaneously hiring Black Cube to surveil Weinstein's accusers." }
  ],
  "mar-a-lago": [
    { id: "donald-trump-maralago", name: "Donald Trump", role: "Owner of Mar-a-Lago since 1985 who later reportedly banned Epstein from the club", bio: "45th and 47th President. Purchased Mar-a-Lago in 1985 and converted it to a private club in 1995. He and Epstein socialized there in the 1990s before a reported falling out." },
    { id: "virginia-giuffre-maralago-entry", name: "Virginia Giuffre", role: "Epstein victim who was recruited by Maxwell at age 16 while working at the Mar-a-Lago spa", bio: "Recruited by Ghislaine Maxwell while working as a teenager in the Mar-a-Lago spa in 1999 or 2000. Maxwell approached her and brought her to Epstein." },
    { id: "ghislaine-maxwell-maralago-entry", name: "Ghislaine Maxwell", role: "Epstein's associate who recruited Virginia Giuffre at Mar-a-Lago's spa around 1999", bio: "British socialite who approached 16-year-old Virginia Giuffre at the Mar-a-Lago spa and recruited her for Epstein. Convicted of sex trafficking in 2021." },
    { id: "bernd-lembcke-maralago", name: "Bernd Lembcke", role: "Mar-a-Lago club manager who oversaw daily operations during the period Giuffre was recruited", bio: "Longtime manager of Mar-a-Lago who oversaw club operations. Deposed in the Giuffre-Maxwell litigation and questioned about what club staff may have observed." }
  ],
  "leslie-groff-connections": [
    { id: "sarah-kellen-groff", name: "Sarah Kellen", role: "Fellow Epstein assistant and named co-conspirator who worked alongside Groff managing operations", bio: "Epstein's personal scheduler who worked alongside Groff managing victim appointments and travel logistics. Named a potential co-conspirator in the 2008 NPA and received immunity." },
    { id: "nadia-marcinkova-groff", name: "Nadia Marcinkova", role: "Named co-conspirator who, along with Groff and Kellen, received immunity under the 2008 plea deal", bio: "Brought to the US from Eastern Europe by Epstein as a teenager. Along with Groff and Kellen, named as a potential co-conspirator in the 2008 NPA. All received immunity." },
    { id: "alexander-acosta-groff", name: "Alexander Acosta", role: "US Attorney who negotiated the 2008 plea deal that gave Groff and other co-conspirators immunity", bio: "Served as US Attorney for the Southern District of Florida. Negotiated the controversial NPA giving Groff and other co-conspirators immunity. Resigned as Trump's Labor Secretary in 2019." },
    { id: "courtney-wild-groff", name: "Courtney Wild", role: "Epstein victim who challenged the NPA that granted Groff immunity under the Crime Victims' Rights Act", bio: "Epstein victim identified as 'Jane Doe 1' who mounted a legal challenge arguing the NPA granting Groff and others immunity violated victims' rights." }
  ],
  "sarah-kellen-connections": [
    { id: "brian-vickers-kellen", name: "Brian Vickers", role: "NASCAR driver who married Sarah Kellen, who then rebranded as an interior designer", bio: "Professional NASCAR driver who married Sarah Kellen after the Epstein scandal. Kellen took the name Sarah Kellen Vickers and reinvented herself as an interior designer." },
    { id: "jean-luc-brunel-kellen", name: "Jean-Luc Brunel", role: "French modeling agent whose MC2 agency employed Kellen alongside her work for Epstein", bio: "French modeling agent who ran MC2 Model Management funded by Epstein. Kellen worked at MC2 as a booking agent. Brunel died in prison in February 2022." },
    { id: "virginia-giuffre-kellen", name: "Virginia Giuffre", role: "Epstein survivor who named Kellen in civil lawsuits as one of Epstein's primary recruiters", bio: "The most prominent Epstein accuser who identified Kellen as actively participating in recruiting and scheduling underage girls for Epstein." },
    { id: "adriana-ross-kellen", name: "Adriana Ross", role: "Polish-born Epstein associate who invoked the Fifth over 100 times and worked alongside Kellen", bio: "Polish-born Epstein associate who invoked the Fifth Amendment over 100 times in depositions. She worked alongside Kellen in Epstein's inner circle." }
  ],
  "nadia-marcinkova-connections": [
    { id: "virginia-giuffre-marcinkova", name: "Virginia Giuffre", role: "Epstein victim who described in depositions how Marcinkova participated in encounters arranged by Epstein", bio: "Lead Epstein accuser who described in sworn depositions how Marcinkova participated in sexual encounters arranged by Epstein." },
    { id: "sarah-kellen-marcinkova", name: "Sarah Kellen", role: "Fellow named co-conspirator who worked alongside Marcinkova in Epstein's inner circle", bio: "Epstein's personal scheduler who, like Marcinkova, was named as a potential co-conspirator in the 2008 NPA. Both received immunity." },
    { id: "alexander-acosta-marcinkova", name: "Alexander Acosta", role: "US Attorney who negotiated the plea deal granting Marcinkova and other co-conspirators immunity", bio: "Former US Attorney for the Southern District of Florida who negotiated the 2008 NPA granting immunity to Marcinkova and other named co-conspirators." }
  ],
  "mossad-israeli-intelligence": [
    { id: "ari-ben-menashe-mossad", name: "Ari Ben-Menashe", role: "Former Israeli intelligence operative who alleged Robert Maxwell and Epstein were connected to Israeli intelligence", bio: "Iranian-born Israeli who served in Israeli military intelligence. He publicly claimed Robert Maxwell was a Mossad asset and that Epstein was involved in an intelligence-linked operation." },
    { id: "robert-maxwell-mossad", name: "Robert Maxwell", role: "British media baron and Ghislaine Maxwell's father, widely alleged to have been a Mossad asset", bio: "Czech-born media proprietor whose funeral on the Mount of Olives in Jerusalem was attended by six current and former heads of Israeli intelligence." },
    { id: "victor-ostrovsky-mossad", name: "Victor Ostrovsky", role: "Former Mossad case officer who wrote about Maxwell's alleged intelligence connections in published memoirs", bio: "Former Mossad officer who authored 'By Way of Deception' (1990). He described Robert Maxwell's alleged role as a Mossad asset." },
    { id: "ehud-barak-mossad", name: "Ehud Barak", role: "Former Israeli PM and IDF Chief of Staff with extensive documented ties to Epstein", bio: "Israel's most decorated soldier who served as Prime Minister (1999-2001). Visited Epstein's properties, received $2.5 million from Epstein. His intelligence background fueled speculation." },
    { id: "rafi-eitan-mossad", name: "Rafi Eitan", role: "Former Mossad operations chief linked to the PROMIS software affair and Robert Maxwell", bio: "Legendary Israeli intelligence operative who led the capture of Adolf Eichmann. He was implicated in the PROMIS software scandal involving Maxwell." }
  ],
  "ehud-barak-connections": [
    { id: "noam-chomsky-barak", name: "Noam Chomsky", role: "MIT linguist who met Barak at a meeting arranged by Epstein at his Manhattan townhouse", bio: "MIT professor emeritus whose meetings with Epstein included an encounter with Barak arranged by Epstein, as reported by The Wall Street Journal." },
    { id: "nicole-junkermann-barak", name: "Nicole Junkermann", role: "German businesswoman who co-invested with Barak in Carbyne, the startup connected to Epstein funding", bio: "German entrepreneur and investor who sat on the board of Carbyne, the emergency call technology startup connected to both Barak and Epstein's financial network." },
    { id: "ghislaine-maxwell-barak", name: "Ghislaine Maxwell", role: "Epstein's associate who connected to Barak through Epstein's social network", bio: "British socialite convicted of sex trafficking. Her late father Robert Maxwell's alleged Israeli intelligence ties paralleled Barak's own military intelligence background." },
    { id: "jeffrey-epstein-barak", name: "Jeffrey Epstein", role: "Financier who paid Barak $2.5 million, hosted meetings for him, and connected him to Carbyne investment", bio: "American financier and convicted sex offender who maintained a well-documented relationship with Barak. Paid Barak $2.5 million through a foundation." }
  ],
  "maxwell-communications": [
    { id: "robert-maxwell-mc", name: "Robert Maxwell", role: "Founder and chairman of Maxwell Communications who died under mysterious circumstances in 1991", bio: "Czech-born media baron (born Jan Ludvik Hyman Binyamin Hoch) who built a vast publishing empire. Died falling from his yacht in November 1991. Posthumously revealed to have looted hundreds of millions from employee pension funds." },
    { id: "ghislaine-maxwell-mc", name: "Ghislaine Maxwell", role: "Robert's youngest daughter who moved to New York after his death and became Epstein's primary associate", bio: "Youngest of Robert Maxwell's nine children. After her father's death and the collapse of his empire, she relocated to New York and began her relationship with Jeffrey Epstein. Convicted of sex trafficking in 2021." },
    { id: "kevin-maxwell-mc", name: "Kevin Maxwell", role: "Robert Maxwell's son who was charged with fraud related to the pension fund scandal but acquitted in 1996", bio: "Son of Robert Maxwell who briefly held the record as Britain's largest personal bankrupt. Charged with conspiracy to defraud Mirror Group pensioners but acquitted in 1996." },
    { id: "ian-maxwell-mc", name: "Ian Maxwell", role: "Robert Maxwell's son who was co-charged in the pension fraud case and acquitted in 1996", bio: "Son of Robert Maxwell who was co-charged with fraud alongside his brother Kevin and acquitted in 1996. Ian has publicly defended his sister Ghislaine." },
    { id: "betty-maxwell-mc", name: "Elisabeth 'Betty' Maxwell", role: "Robert Maxwell's wife and Holocaust researcher who maintained the family after his death", bio: "French-born Holocaust researcher who married Robert Maxwell in 1945. She authored a memoir about her life with Maxwell and maintained the family through the pension fraud scandal." },
    { id: "isabel-maxwell-mc", name: "Isabel Maxwell", role: "Robert Maxwell's daughter who became a tech entrepreneur with connections to Israeli technology firms", bio: "Daughter of Robert Maxwell who co-founded Magellan, an early internet search directory. She later became involved in Israeli technology ventures." }
  ],
  "naomi-campbell-connections": [
    { id: "ghislaine-maxwell-campbell", name: "Ghislaine Maxwell", role: "Epstein's primary associate who moved in the same fashion and society circles as Campbell", bio: "British socialite convicted of sex trafficking. Photographed with Campbell at multiple social events. Both moved in overlapping fashion industry and Manhattan high-society circles." },
    { id: "jean-luc-brunel-campbell", name: "Jean-Luc Brunel", role: "French modeling agent funded by Epstein who operated in the same modeling industry as Campbell", bio: "French modeling agent whose MC2 agency was funded by Epstein. Operated in the fashion industry during the same era as Campbell. Died in prison in February 2022." },
    { id: "flavio-briatore-campbell", name: "Flavio Briatore", role: "Italian businessman and Campbell's ex-partner whose name appeared in Epstein's contact book", bio: "Italian businessman and former Formula One team principal who dated Campbell in the late 1990s. His name appeared in Epstein's contact book." }
  ]
};

// Apply enrichments
let totalAdded = 0;
let entriesEnriched = 0;

for (const [country, entries] of Object.entries(data.countries)) {
  for (const entry of entries) {
    if (enrichments[entry.id]) {
      const newIndividuals = enrichments[entry.id];
      const existingIds = new Set((entry.individuals || []).map(i => i.id));
      let added = 0;
      for (const ind of newIndividuals) {
        if (!existingIds.has(ind.id)) {
          if (!entry.individuals) entry.individuals = [];
          entry.individuals.push(ind);
          added++;
        }
      }
      if (added > 0) {
        console.log(`  ${entry.id}: +${added} individuals (now ${entry.individuals.length})`);
        totalAdded += added;
        entriesEnriched++;
      } else {
        console.log(`  ${entry.id}: 0 new (all ${newIndividuals.length} already exist)`);
      }
    }
    if (entry.subEntries) {
      for (const sub of entry.subEntries) {
        if (enrichments[sub.id]) {
          const newIndividuals = enrichments[sub.id];
          const existingIds = new Set((sub.individuals || []).map(i => i.id));
          let added = 0;
          for (const ind of newIndividuals) {
            if (!existingIds.has(ind.id)) {
              if (!sub.individuals) sub.individuals = [];
              sub.individuals.push(ind);
              added++;
            }
          }
          if (added > 0) {
            console.log(`  ${sub.id}: +${added} individuals (now ${sub.individuals.length})`);
            totalAdded += added;
            entriesEnriched++;
          }
        }
      }
    }
  }
}

console.log(`\nTotal: ${totalAdded} individuals added across ${entriesEnriched} entries`);

// Write back
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Saved to', dataPath);
