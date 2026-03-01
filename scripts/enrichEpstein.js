/**
 * enrichEpstein.js - Add individuals to sparse Epstein sub-entries
 * Based on court documents, flight logs, depositions, investigative journalism
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'jewish.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Find the Epstein network entry
let epsteinEntry = null;
let epsteinCountry = null;
for (const [country, entries] of Object.entries(data.countries)) {
  const found = entries.find(e => e.id === 'epstein-network');
  if (found) { epsteinEntry = found; epsteinCountry = country; break; }
}
if (!epsteinEntry) {
  // Check sub-entries too - maybe Epstein sub-entries are top-level
  for (const [country, entries] of Object.entries(data.countries)) {
    for (const e of entries) {
      if (e.subEntries) {
        const sub = e.subEntries.find(s => s.id === 'epstein-network');
        if (sub) { console.log('Found as sub-entry of', e.id); }
      }
    }
  }
}

// All entries are top-level in their country array
// Find them directly
const allEntries = Object.values(data.countries).flat();

// Map of entry ID -> new individuals to add
const enrichments = {
  "bill-clinton-connections": [
    { id: "doug-band", name: "Doug Band", role: "Clinton presidential advisor who appeared on Epstein flight logs accompanying Clinton on multiple trips", bio: "Doug Band served as counselor to President Clinton and co-founded Teneo Holdings. He appeared on Epstein flight logs accompanying Clinton on multiple trips aboard the private jet." },
    { id: "mark-middleton", name: "Mark Middleton", role: "Special Assistant to President Clinton who arranged at least three Epstein visits to the White House in the 1990s", bio: "Mark Middleton served as Special Assistant to President Clinton and arranged at least three Epstein visits to the White House in the 1990s according to visitor logs obtained via FOIA." },
    { id: "chris-tucker", name: "Chris Tucker", role: "Comedian who accompanied Clinton on Epstein's Boeing 727 on a 2002 trip to Africa", bio: "Chris Tucker is an actor and comedian who accompanied Bill Clinton on Jeffrey Epstein's Boeing 727 on a 2002 trip to Africa, as documented in Epstein's flight logs." },
    { id: "kevin-spacey-clinton", name: "Kevin Spacey", role: "Actor who accompanied Clinton on Epstein's jet on a 2002 trip to Africa", bio: "Kevin Spacey accompanied Clinton on Epstein's jet on a 2002 trip to Africa per flight logs. Has faced separate sexual misconduct allegations." },
    { id: "chauntae-davies", name: "Chauntae Davies", role: "Massage therapist and Epstein victim present on flights with Clinton", bio: "Chauntae Davies was a massage therapist and Epstein victim who was present on flights with Clinton. She has publicly stated Clinton was a gentleman." }
  ],
  "donald-trump-connections": [
    { id: "george-houraney", name: "George Houraney", role: "Florida businessman who organized a 'calendar girls' event at Mar-a-Lago in 1992 attended only by Trump and Epstein", bio: "George Houraney organized a 'calendar girls' event at Mar-a-Lago in 1992 attended only by Trump and Epstein. He warned Trump about Epstein's behavior with women." },
    { id: "virginia-giuffre-maralago", name: "Virginia Giuffre", role: "Recruited by Ghislaine Maxwell from Mar-a-Lago where she worked as a spa attendant at age 16", bio: "Virginia Giuffre was recruited by Ghislaine Maxwell from Mar-a-Lago where Giuffre worked as a spa attendant at age 16. She became a key accuser in the Epstein case." },
    { id: "bradley-edwards", name: "Bradley Edwards", role: "Victims' attorney who stated Trump was the only powerful person to voluntarily assist his investigation", bio: "Bradley Edwards was a victims' attorney who stated Trump was the only powerful person to voluntarily assist his investigation into Epstein's crimes." },
    { id: "mark-epstein", name: "Mark Epstein", role: "Jeffrey Epstein's brother who testified about Trump and Jeffrey's social relationship in Palm Beach", bio: "Mark Epstein is Jeffrey Epstein's brother who testified in deposition about Trump and Jeffrey's social relationship in Palm Beach." },
    { id: "ghislaine-maxwell-maralago", name: "Ghislaine Maxwell", role: "Recruited Giuffre from Mar-a-Lago; had membership/access to the club", bio: "Ghislaine Maxwell recruited Virginia Giuffre from Mar-a-Lago and had membership and access to the club." }
  ],
  "prince-andrew": [
    { id: "virginia-giuffre-andrew", name: "Virginia Giuffre", role: "Primary accuser who alleged she was trafficked to Prince Andrew; settled civil suit in February 2022", bio: "Virginia Giuffre was the primary accuser who alleged she was trafficked to Prince Andrew in London, NYC, and the US Virgin Islands. They settled a civil suit in February 2022." },
    { id: "johanna-sjoberg", name: "Johanna Sjoberg", role: "Testified that Prince Andrew groped her at Epstein's Manhattan mansion", bio: "Johanna Sjoberg testified in deposition that Prince Andrew groped her at Epstein's Manhattan mansion using a Spitting Image puppet." },
    { id: "juan-alessi", name: "Juan Alessi", role: "Epstein's house manager in Palm Beach for over a decade; testified about Andrew's visits", bio: "Juan Alessi served as Epstein's house manager in Palm Beach for over a decade. He testified about Prince Andrew's visits to Epstein's estate." },
    { id: "sarah-ferguson-andrew", name: "Sarah Ferguson", role: "Duchess of York; Epstein paid 15,000 GBP toward her debts, arranged through Andrew", bio: "Sarah Ferguson, Duchess of York, had debts partially paid by Epstein (15,000 GBP) arranged through Prince Andrew." },
    { id: "steve-scully-butler", name: "Steve Scully", role: "Epstein's former butler in Palm Beach who described Andrew's visits to the estate", bio: "Steve Scully was Epstein's former butler in Palm Beach who described Andrew's visits and activities at the estate in interviews and court testimony." },
    { id: "victoria-hervey", name: "Lady Victoria Hervey", role: "British socialite in Epstein-Maxwell social circle who publicly discussed Andrew's involvement", bio: "Lady Victoria Hervey is a British socialite in the Epstein-Maxwell social circle who publicly discussed Andrew's involvement in documentary appearances." }
  ],
  "les-wexner-connections": [
    { id: "maria-farmer", name: "Maria Farmer", role: "One of the first Epstein accusers; sexually assaulted at Wexner's Ohio estate in 1996", bio: "Maria Farmer was one of the first Epstein accusers. She was sexually assaulted at Wexner's Ohio estate ('The Limiteds') in 1996 while working as an artist." },
    { id: "annie-farmer", name: "Annie Farmer", role: "Maria Farmer's younger sister; victimized by Epstein as a teenager", bio: "Annie Farmer is Maria Farmer's younger sister who was victimized by Epstein as a teenager. She delivered a victim impact statement at the 2022 Maxwell sentencing." },
    { id: "abigail-wexner", name: "Abigail Koppel Wexner", role: "Les Wexner's wife; co-managed the Wexner Foundation during Epstein's financial involvement", bio: "Abigail Koppel Wexner is Les Wexner's wife who co-managed the Wexner Foundation during the period of Epstein's financial involvement." },
    { id: "robert-morosky", name: "Robert Morosky", role: "Former Vice Chairman of The Limited whose departure was allegedly influenced by Epstein's growing control", bio: "Robert Morosky was the former Vice Chairman of The Limited whose departure from the company was allegedly influenced by Epstein's growing control." },
    { id: "ed-razek", name: "Ed Razek", role: "L Brands chief marketing officer; part of the Victoria's Secret apparatus Epstein exploited", bio: "Ed Razek served as L Brands chief marketing officer and longtime Wexner lieutenant. He was part of the Victoria's Secret apparatus Epstein exploited." }
  ],
  "alan-dershowitz-connections": [
    { id: "virginia-giuffre-dershowitz", name: "Virginia Giuffre", role: "Accused Dershowitz of sexual abuse on multiple occasions; defamation suits settled in 2024", bio: "Virginia Giuffre accused Alan Dershowitz of sexual abuse on multiple occasions. Defamation suits between them were eventually settled in 2024." },
    { id: "david-boies-dershowitz", name: "David Boies", role: "Boies Schiller attorney who represented Giuffre and filed claims against Dershowitz", bio: "David Boies is a partner at Boies Schiller who represented Virginia Giuffre and filed claims against Dershowitz." },
    { id: "brad-edwards-dershowitz", name: "Brad Edwards", role: "Victims' attorney who brought original Crime Victims' Rights Act claims implicating Dershowitz", bio: "Brad Edwards is a victims' attorney who brought original Crime Victims' Rights Act claims that implicated Dershowitz." },
    { id: "paul-cassell", name: "Paul Cassell", role: "University of Utah law professor who represented Epstein victims pro bono in CVRA proceedings", bio: "Paul Cassell is a University of Utah law professor who represented Epstein victims pro bono in CVRA proceedings." },
    { id: "sarah-ransome", name: "Sarah Ransome", role: "Epstein accuser who filed suit against Epstein and Maxwell, and made claims regarding Dershowitz", bio: "Sarah Ransome is an Epstein accuser who filed suit against Epstein and Maxwell, and who also made claims regarding Dershowitz." }
  ],
  "alexander-acosta-connections": [
    { id: "barry-krischer", name: "Barry Krischer", role: "Palm Beach County State Attorney who reduced state charges against Epstein despite police evidence of dozens of victims", bio: "Barry Krischer was the Palm Beach County State Attorney who reduced state charges against Epstein to a single prostitution count despite police evidence of dozens of victims." },
    { id: "marie-villafana", name: "A. Marie Villafana", role: "Federal prosecutor who drafted a 53-page federal indictment against Epstein that was never filed", bio: "A. Marie Villafana was the federal prosecutor who drafted a 53-page federal indictment against Epstein that was never filed after the NPA was negotiated." },
    { id: "jay-lefkowitz", name: "Jay Lefkowitz", role: "Epstein defense attorney from Kirkland & Ellis who negotiated the non-prosecution agreement with Acosta", bio: "Jay Lefkowitz was Epstein's defense attorney from Kirkland & Ellis who negotiated the non-prosecution agreement directly with Acosta." },
    { id: "courtney-wild", name: "Courtney Wild", role: "Epstein victim who challenged the legality of the NPA under the Crime Victims' Rights Act", bio: "Courtney Wild is an Epstein victim who challenged the legality of the NPA under the Crime Victims' Rights Act, arguing victims were not consulted." },
    { id: "ben-sasse", name: "Sen. Ben Sasse", role: "U.S. Senator who publicly challenged Acosta about the Epstein NPA during his 2017 confirmation hearing", bio: "Ben Sasse is a former U.S. Senator who publicly challenged Acosta about the Epstein NPA during his 2017 confirmation hearing for Secretary of Labor." },
    { id: "julie-k-brown", name: "Julie K. Brown", role: "Miami Herald reporter whose 'Perversion of Justice' series exposed the NPA deal and led to Acosta's resignation", bio: "Julie K. Brown is a Miami Herald investigative reporter whose 'Perversion of Justice' series exposed the NPA deal and led to Acosta's resignation as Labor Secretary." }
  ],
  "ghislaine-maxwell-connections": [
    { id: "jean-luc-brunel", name: "Jean-Luc Brunel", role: "French modeling agent accused of procuring young girls through his MC2 agency; found dead in Paris prison in 2022", bio: "Jean-Luc Brunel was a French modeling agent and close Epstein associate accused of procuring young girls through his MC2 modeling agency. He was found dead in a Paris prison in February 2022." },
    { id: "sarah-kellen-maxwell", name: "Sarah Kellen", role: "Epstein's personal assistant who scheduled 'massage' appointments with victims; named co-conspirator", bio: "Sarah Kellen was Epstein's personal assistant who scheduled 'massage' appointments with victims. She was named as a co-conspirator in federal filings." },
    { id: "nadia-marcinko", name: "Nadia Marcinko", role: "Brought to the US from Eastern Europe by Epstein as a teenager; later became a pilot; named co-conspirator", bio: "Nadia Marcinko was brought to the US from Eastern Europe by Epstein as a teenager. She later became a pilot and Epstein associate and was named a co-conspirator." },
    { id: "lesley-groff-maxwell", name: "Lesley Groff", role: "Epstein's longtime executive assistant who arranged travel logistics; named co-conspirator", bio: "Lesley Groff was Epstein's longtime executive assistant who arranged travel logistics and maintained contacts. She was named as a co-conspirator." },
    { id: "adriana-ross", name: "Adriana Ross", role: "Epstein associate from Poland who invoked the Fifth Amendment over 100 times in depositions", bio: "Adriana Ross is an Epstein associate originally from Poland who invoked the Fifth Amendment over 100 times in depositions." },
    { id: "emmy-tayler", name: "Emmy Tayler", role: "Ghislaine Maxwell's personal assistant; witnesses described her participating in abuse", bio: "Emmy Tayler was Ghislaine Maxwell's personal assistant. Witnesses described her participating in abuse according to depositions and victim testimony." }
  ],
  "elon-musk-connections": [
    { id: "ghislaine-maxwell-musk", name: "Ghislaine Maxwell", role: "Photographed with Musk at a 2014 Vanity Fair Oscar party", bio: "Ghislaine Maxwell was photographed with Musk and his then-partner Talulah Riley at a 2014 Vanity Fair Oscar party." },
    { id: "talulah-riley", name: "Talulah Riley", role: "Musk's ex-wife; Epstein falsely claimed to have introduced her to Musk", bio: "Talulah Riley is Musk's ex-wife. Epstein falsely claimed to have introduced her to Musk, which both Riley and Musk deny." },
    { id: "reid-hoffman-musk", name: "Reid Hoffman", role: "LinkedIn co-founder who facilitated Epstein's connections in Silicon Valley; later publicly apologized", bio: "Reid Hoffman is the LinkedIn co-founder who facilitated Epstein's connections in Silicon Valley and later publicly apologized for the association." }
  ],
  "bill-gates-connections": [
    { id: "melinda-french-gates", name: "Melinda French Gates", role: "Cited Gates' meetings with Epstein as a serious concern; contributed to their 2021 divorce", bio: "Melinda French Gates cited her husband's meetings with Epstein as a serious concern. The association contributed to their 2021 divorce." },
    { id: "boris-nikolic", name: "Boris Nikolic", role: "Gates' science advisor named as fallback executor in Epstein's will, to Nikolic's stated surprise", bio: "Boris Nikolic was Bill Gates' science advisor who was named as fallback executor in Epstein's will, apparently to his surprise." },
    { id: "larry-cohen-gates", name: "Larry Cohen", role: "Gates Foundation advisor who helped arrange meetings between Gates and Epstein", bio: "Larry Cohen was a Gates Foundation advisor who helped arrange and attended meetings between Gates and Epstein." },
    { id: "eva-dubin-gates", name: "Eva Dubin", role: "Socialite and wife of Glenn Dubin who hosted at least one Gates-Epstein dinner", bio: "Eva Dubin is a socialite and wife of Glenn Dubin who hosted at least one Gates-Epstein dinner at her home." },
    { id: "jes-staley-gates", name: "Jes Staley", role: "Former JPMorgan and Barclays CEO with close Epstein relationship; moved in same circles as Gates", bio: "Jes Staley is the former JPMorgan CEO and former Barclays CEO who had a close relationship with Epstein and moved in the same circles as Gates." }
  ],
  "henry-kissinger-connections": [
    { id: "woody-allen-kissinger", name: "Woody Allen", role: "Director who attended dinners at Epstein's Manhattan mansion alongside Kissinger", bio: "Woody Allen attended dinners at Epstein's Manhattan mansion alongside Henry Kissinger, as documented in Epstein's personal calendar." },
    { id: "katie-couric", name: "Katie Couric", role: "Journalist who attended a 2010 dinner at Epstein's home where Kissinger was present", bio: "Katie Couric is a journalist who attended a 2010 dinner at Epstein's home where Kissinger was also present. She wrote about it in her memoir 'Going There'." },
    { id: "george-stephanopoulos-kissinger", name: "George Stephanopoulos", role: "ABC News anchor who attended a 2010 post-conviction dinner at Epstein's home with Kissinger", bio: "George Stephanopoulos attended a 2010 post-conviction dinner at Epstein's Manhattan home with Kissinger and others." },
    { id: "ehud-barak-kissinger", name: "Ehud Barak", role: "Former Israeli PM with documented relationships with both Kissinger and Epstein", bio: "Ehud Barak is a former Israeli Prime Minister with documented relationships with both Kissinger and Epstein. He visited Epstein's residences extensively." },
    { id: "mort-zuckerman", name: "Mort Zuckerman", role: "Media executive and real estate billionaire who appeared at Epstein social gatherings with Kissinger", bio: "Mort Zuckerman is a media executive and real estate billionaire who appeared at Epstein social gatherings with Kissinger." }
  ],
  "victoria-giuffre": [
    { id: "brad-edwards-giuffre", name: "Brad Edwards", role: "Plaintiffs' attorney who represented Giuffre and Epstein victims for over a decade", bio: "Brad Edwards represented Virginia Giuffre and Epstein victims for over a decade. He authored 'Relentless Pursuit' about the case." },
    { id: "david-boies-giuffre", name: "David Boies", role: "Boies Schiller Flexner attorney who represented Giuffre in cases against Maxwell and others", bio: "David Boies represented Giuffre in her cases against Maxwell and others through his firm Boies Schiller Flexner." },
    { id: "sigrid-mccawley", name: "Sigrid McCawley", role: "Attorney at Boies Schiller who served as lead counsel in Giuffre's civil suit against Maxwell", bio: "Sigrid McCawley is an attorney at Boies Schiller who served as lead counsel in Giuffre's civil suit against Maxwell." },
    { id: "paul-cassell-giuffre", name: "Paul Cassell", role: "University of Utah law professor who served as pro bono co-counsel for Epstein victims in the CVRA challenge", bio: "Paul Cassell is a University of Utah law professor who served as pro bono co-counsel for Epstein victims in the CVRA challenge." },
    { id: "courtney-wild-giuffre", name: "Courtney Wild", role: "Fellow Epstein victim who joined with Giuffre in legal challenges to the NPA; identified as 'Jane Doe 1'", bio: "Courtney Wild is an Epstein victim who joined with Giuffre in legal challenges to the NPA. She was identified as 'Jane Doe 1' in proceedings." },
    { id: "jack-scarola", name: "Jack Scarola", role: "Florida attorney representing multiple Epstein victims including in civil proceedings", bio: "Jack Scarola is a Florida attorney representing multiple Epstein victims including in civil proceedings." }
  ],
  "harvey-weinstein-connections": [
    { id: "david-boies-weinstein", name: "David Boies", role: "Attorney retained by Weinstein to suppress NYT stories while simultaneously representing Epstein victims", bio: "David Boies was retained by Weinstein to suppress NYT stories while simultaneously representing Epstein victims through his firm." },
    { id: "ehud-barak-weinstein", name: "Ehud Barak", role: "Former Israeli PM who had business investments with Weinstein and close relationship with Epstein", bio: "Ehud Barak is a former Israeli PM who had business investments with Weinstein and a close documented relationship with Epstein." },
    { id: "lisa-bloom", name: "Lisa Bloom", role: "Attorney who advised Weinstein on PR/legal strategy; daughter of Gloria Allred", bio: "Lisa Bloom is an attorney and legal commentator who advised Weinstein on PR and legal strategy. She is the daughter of Gloria Allred, who represented sexual abuse victims." },
    { id: "ron-burkle", name: "Ron Burkle", role: "Billionaire investor connected to both Weinstein and Clinton/Epstein social circles", bio: "Ron Burkle is a billionaire investor connected to both Weinstein and Clinton/Epstein social circles." },
    { id: "benjamin-brafman", name: "Benjamin Brafman", role: "Defense attorney who represented Weinstein in criminal case", bio: "Benjamin Brafman is a defense attorney who represented Weinstein in his criminal case. Previously represented associates in Epstein's orbit." }
  ],
  "glenn-dubin-connections": [
    { id: "eva-andersson-dubin", name: "Eva Andersson-Dubin", role: "Glenn Dubin's wife, former Miss Sweden; dated Epstein in the 1980s and maintained close friendship", bio: "Eva Andersson-Dubin is Glenn Dubin's wife and former Miss Sweden. She dated Epstein in the 1980s and maintained a close friendship throughout." },
    { id: "rinaldo-rizzo", name: "Rinaldo Rizzo", role: "Dubins' chef who testified that Epstein sent a young Swedish woman to the Dubins' home", bio: "Rinaldo Rizzo was the Dubins' chef and houseman who testified in deposition that Epstein sent a young Swedish woman to the Dubins' home." },
    { id: "virginia-giuffre-dubin", name: "Virginia Giuffre", role: "Alleged in court filings that Epstein directed her to have sexual encounters with Glenn Dubin", bio: "Virginia Giuffre alleged in court filings that Epstein directed her to have sexual encounters with Glenn Dubin." },
    { id: "celina-dubin", name: "Celina Dubin", role: "Glenn and Eva's daughter for whom Epstein established a trust fund", bio: "Celina Dubin is the daughter of Glenn and Eva Dubin. Jeffrey Epstein established a trust fund for her." },
    { id: "tom-pritzker", name: "Tom Pritzker", role: "Hyatt Hotels executive chairman and Dubin social circle member named in Epstein's personal contacts", bio: "Tom Pritzker is the executive chairman of Hyatt Hotels and a Dubin social circle member. He was named in Epstein's personal contacts." }
  ],
  "noam-chomsky-connections": [
    { id: "woody-allen-chomsky", name: "Woody Allen", role: "Film director who dined with Chomsky and Epstein at Epstein's Manhattan residence", bio: "Woody Allen dined with Chomsky and Epstein at Epstein's Manhattan residence according to WSJ reporting on Epstein's personal calendar." },
    { id: "bev-stohl", name: "Bev Stohl", role: "Epstein's personal scheduler who arranged multiple Chomsky visits to Epstein's residence", bio: "Bev Stohl was Epstein's personal scheduler who arranged multiple Chomsky visits to Epstein's residence, according to Epstein calendar documents obtained by WSJ." },
    { id: "lawrence-krauss-chomsky", name: "Lawrence Krauss", role: "Theoretical physicist who maintained an intellectual relationship with Epstein and received Epstein funding", bio: "Lawrence Krauss is a theoretical physicist who, like Chomsky, maintained an intellectual relationship with Epstein and received Epstein funding." },
    { id: "leon-botstein", name: "Leon Botstein", role: "President of Bard College who appeared on Epstein's schedule; Epstein was a donor to Bard", bio: "Leon Botstein is the president of Bard College who appeared on Epstein's schedule. Epstein was a donor to Bard." }
  ],
  "metropolitan-correctional-center": [
    { id: "tova-noel", name: "Tova Noel", role: "MCC correctional officer who falsified records and fell asleep the night Epstein died; given deferred prosecution", bio: "Tova Noel was an MCC correctional officer who falsified records and fell asleep during her shift the night Epstein died. She was charged but given a deferred prosecution agreement." },
    { id: "michael-thomas-mcc", name: "Michael Thomas", role: "MCC correctional officer who falsified records and fell asleep on duty the night Epstein died", bio: "Michael Thomas was an MCC correctional officer who falsified records and fell asleep on duty the night Epstein died. He was charged but given a deferred prosecution agreement." },
    { id: "nicholas-tartaglione", name: "Nicholas Tartaglione", role: "Former police officer charged with quadruple murder; was Epstein's cellmate before being transferred days before his death", bio: "Nicholas Tartaglione was a former Briarcliff Manor police officer charged with quadruple murder. He was Epstein's cellmate before being abruptly transferred days before Epstein's death." },
    { id: "william-barr-mcc", name: "William Barr", role: "US Attorney General who ordered DOJ/BOP investigation into Epstein's death", bio: "William Barr was US Attorney General who ordered a DOJ/BOP investigation into Epstein's death and publicly stated security cameras had malfunctioned." },
    { id: "lamine-ndiaye", name: "Lamine N'Diaye", role: "Warden of MCC New York who was reassigned after Epstein's death", bio: "Lamine N'Diaye was the warden of MCC New York who was reassigned after Epstein's death as part of administrative fallout." }
  ],
  "palm-beach-police": [
    { id: "michael-reiter", name: "Michael Reiter", role: "Palm Beach Police Chief who led the investigation and pushed for federal involvement", bio: "Michael Reiter was the Palm Beach Police Chief who led the investigation into Epstein and pushed for federal involvement after the state attorney reduced charges." },
    { id: "joseph-recarey", name: "Joseph Recarey", role: "Lead Palm Beach detective who built the case, identified over 30 victims; died in May 2018", bio: "Joseph Recarey was the lead Palm Beach detective who built the case against Epstein, identifying over 30 victims through extensive interviews. He died in May 2018." },
    { id: "barry-krischer-pbpd", name: "Barry Krischer", role: "Palm Beach County State Attorney who obtained only a single solicitation charge despite police evidence", bio: "Barry Krischer was the Palm Beach County State Attorney who took the case to grand jury but obtained only a single solicitation charge, frustrating police investigators." },
    { id: "michele-pagan", name: "Michele Pagan", role: "Palm Beach Police detective involved in victim interviews and evidence collection", bio: "Michele Pagan was a Palm Beach Police detective involved in victim interviews and evidence collection in the Epstein investigation." },
    { id: "alison-arden", name: "Alison Arden", role: "Aspiring model who filed one of the earliest known police reports about Epstein in 1997", bio: "Alison Arden was an aspiring model who filed a 1997 police report (with Santa Monica PD) that Epstein groped her. It was one of the earliest known reports." }
  ],
  "fbi": [
    { id: "marie-villafana-fbi", name: "A. Marie Villafana", role: "AUSA who drafted a 53-page federal indictment that was shelved when the NPA was negotiated", bio: "A. Marie Villafana was the Assistant US Attorney who worked with FBI agents and drafted a 53-page federal indictment against Epstein that was shelved when the NPA was negotiated." },
    { id: "julie-k-brown-fbi", name: "Julie K. Brown", role: "Miami Herald reporter whose 'Perversion of Justice' series effectively forced the FBI to reopen the case", bio: "Julie K. Brown is a Miami Herald investigative reporter whose 'Perversion of Justice' series effectively forced the FBI to reopen the Epstein case in 2018-2019." },
    { id: "william-sweeney-jr", name: "William Sweeney Jr.", role: "FBI Assistant Director in Charge of the NY Field Office who led the 2019 arrest operation", bio: "William Sweeney Jr. was the FBI Assistant Director in Charge of the New York Field Office who led the 2019 arrest operation and spoke at the press conference." },
    { id: "michael-reiter-fbi", name: "Michael Reiter", role: "Palm Beach Police Chief who referred the case to the FBI after state attorney downgraded charges", bio: "Michael Reiter was the Palm Beach Police Chief who referred the case to the FBI after the state attorney downgraded charges." },
    { id: "courtney-wild-fbi", name: "Courtney Wild", role: "Epstein victim whose CVRA legal challenge helped expose failures in original FBI/DOJ handling", bio: "Courtney Wild is an Epstein victim whose CVRA legal challenge in federal court helped expose failures in the original FBI/DOJ handling." }
  ],
  "sdny": [
    { id: "geoffrey-berman", name: "Geoffrey Berman", role: "US Attorney for SDNY who announced Epstein's July 2019 indictment on sex trafficking charges", bio: "Geoffrey Berman was the US Attorney for the Southern District of New York who announced Epstein's July 2019 indictment on sex trafficking charges." },
    { id: "audrey-strauss", name: "Audrey Strauss", role: "Deputy/Acting US Attorney for SDNY who oversaw the Maxwell prosecution", bio: "Audrey Strauss served as Deputy/Acting US Attorney for SDNY and oversaw the Ghislaine Maxwell prosecution after Berman's departure." },
    { id: "maurene-comey", name: "Maurene Comey", role: "SDNY AUSA on the Epstein/Maxwell prosecution team; daughter of former FBI Director James Comey", bio: "Maurene Comey was an SDNY Assistant US Attorney and member of the Epstein/Maxwell prosecution team. She is the daughter of former FBI Director James Comey." },
    { id: "alex-rossmiller", name: "Alex Rossmiller", role: "SDNY AUSA who served on the prosecution team for Epstein and Maxwell cases", bio: "Alex Rossmiller was an SDNY Assistant US Attorney who served on the prosecution team for both the Epstein and Maxwell cases." },
    { id: "alison-moe", name: "Alison Moe", role: "SDNY prosecutor who delivered a powerful statement at Epstein's bail hearing", bio: "Alison Moe was an SDNY prosecutor who delivered a powerful statement at Epstein's bail hearing detailing the danger he posed." },
    { id: "william-sweeney-jr-sdny", name: "William Sweeney Jr.", role: "FBI AD who coordinated with SDNY on Epstein's arrest at Teterboro Airport", bio: "William Sweeney Jr. was the FBI Assistant Director in Charge of the NY Field Office who coordinated with SDNY on Epstein's arrest at Teterboro Airport." }
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
      }
    }
    // Also check subEntries
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
