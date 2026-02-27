/**
 * expandData45.js - Comprehensive Epstein Network Expansion
 * Adds all known Epstein associates with detailed bios,
 * creates an "Epstein Network" entry, and connects everyone.
 */
const fs = require('fs');
const path = require('path');
const pFile = path.join(__dirname, '..', 'data', 'people.json');
const jFile = path.join(__dirname, '..', 'data', 'jewish.json');
const pd = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const jd = JSON.parse(fs.readFileSync(jFile, 'utf8'));

// Helper
function addPerson(id, name, bio) {
  if (!pd.people[id]) {
    pd.people[id] = { name, bio, notes: '', affiliations: [] };
    return true;
  } else {
    // Update bio if new is longer
    if (bio.length > (pd.people[id].bio || '').length) {
      pd.people[id].bio = bio;
    }
    return false;
  }
}

let newPeople = 0;

// --- EPSTEIN ASSOCIATES: Comprehensive list ---
const epsteinPeople = [
  ['prince-andrew', 'Prince Andrew', 'Prince Andrew, Duke of York. Second son of Queen Elizabeth II. Close associate of Jeffrey Epstein. Photographed with Virginia Giuffre at Ghislaine Maxwell\'s London home in 2001. Flew on Epstein\'s private jet multiple times. Stayed at Epstein\'s Manhattan mansion, Palm Beach estate, and private island. Settled civil sexual abuse lawsuit with Virginia Giuffre in February 2022 for an estimated $12 million. Stripped of military titles and royal patronages by Queen Elizabeth in January 2022.'],
  ['donald-trump', 'Donald Trump', '45th and 47th President of the United States. Had a social relationship with Jeffrey Epstein in the 1990s and early 2000s in Palm Beach and New York. Famously told New York Magazine in 2002: "I\'ve known Jeff for fifteen years. Terrific guy. He\'s a lot of fun to be with. It is even said that he likes beautiful women as much as I do, and many of them are on the younger side." Later banned Epstein from Mar-a-Lago reportedly after an incident involving a member\'s daughter. Alexander Acosta, Trump\'s Labor Secretary, had negotiated Epstein\'s lenient 2008 plea deal as U.S. Attorney.'],
  ['reid-hoffman', 'Reid Hoffman', 'American billionaire internet entrepreneur. Co-founder of LinkedIn. Met with Epstein multiple times after his 2008 conviction for advice on philanthropy and AI. Publicly apologized in 2019 for the association, stating he was told Epstein had served his time. Donated $500K to MIT to compensate for Epstein\'s tainted donations. Major Democratic Party donor and tech industry networker.'],
  ['ehud-barak', 'Ehud Barak', 'Former Prime Minister of Israel (1999-2001) and Defense Minister. Visited Epstein\'s Manhattan townhouse multiple times, including after his 2008 conviction. Photographed entering Epstein\'s residence in January 2016. Had business dealings with Epstein through Carbyne, an Israeli surveillance tech startup that Epstein invested in and Barak chaired. Received funding from Epstein-linked entities.'],
  ['steven-pinker', 'Steven Pinker', 'Canadian-American cognitive psychologist, linguist, and author. Harvard professor. Provided legal advice to Epstein\'s defense team in 2007, helping to argue that Epstein\'s solicitation did not constitute sex trafficking under federal law. Flew on Epstein\'s plane at least once in 2002 to a TED conference. Has stated his contact with Epstein was limited and professional.'],
  ['mort-zuckerman', 'Mort Zuckerman', 'Canadian-American billionaire media proprietor and real estate developer. Owner of the New York Daily News and former owner of U.S. News & World Report. Named in Epstein\'s black book. Attended dinner parties at Epstein\'s Manhattan mansion. Part of the New York social circle that overlapped with Epstein\'s network.'],
  ['eva-andersson-dubin', 'Eva Andersson-Dubin', 'Swedish-American physician and former Miss Sweden. Dated Jeffrey Epstein in the 1980s. Married billionaire hedge fund manager Glenn Dubin. Her family remained close to Epstein for decades after their relationship ended. Epstein named her as a backup executor of his will.'],
  ['glenn-dubin', 'Glenn Dubin', 'American billionaire hedge fund manager. Co-founder of Highbridge Capital Management. Close friend of Jeffrey Epstein for over 20 years. His wife Eva previously dated Epstein. Named in Epstein\'s black book. The Dubin family maintained a close relationship with Epstein even after his 2008 conviction. Virginia Giuffre alleged she was directed to have sexual encounters with Dubin, which he denied.'],
  ['peter-mandelson', 'Peter Mandelson', 'British Labour politician, Baron Mandelson. Former Secretary of State for Business. Close associate of Jeffrey Epstein. Met with Epstein multiple times including at his properties. Named in Epstein\'s black book and flight logs. Photographed at social events with Epstein and Ghislaine Maxwell.'],
  ['naomi-campbell', 'Naomi Campbell', 'British supermodel. Appeared in Epstein\'s flight logs and was photographed on his yacht and at social events with Epstein and Ghislaine Maxwell. Part of the international social circle surrounding Epstein.'],
  ['les-moonves', 'Les Moonves', 'American media executive. Former Chairman and CEO of CBS Corporation (2003-2018). Named in Epstein\'s black book with multiple contact numbers. Part of the New York and Hollywood media circle connected to Epstein.'],
  ['harvey-weinstein', 'Harvey Weinstein', 'American former film producer and convicted sex offender. Co-founder of Miramax and The Weinstein Company. Named in Epstein\'s black book. Both were part of overlapping New York social and power circles. Convicted of rape and sexual assault in February 2020.'],
  ['dershowitz-alan', 'Alan Dershowitz', 'SKIP'],
  ['sarah-kellen', 'Sarah Kellen', 'Associate of Jeffrey Epstein. Identified as one of Epstein\'s key recruiters and schedulers. Named in multiple lawsuits and court documents as helping to recruit and schedule underage girls for Epstein. Granted non-prosecution agreement as part of Epstein\'s 2008 plea deal. Later married NASCAR driver Brian Vickers.'],
  ['nadia-marcinkova', 'Nadia Marcinkova', 'Originally from Slovakia, brought to the United States by Jeffrey Epstein as a teenager. Described in court documents as a victim who later became an associate. Named in the 2008 non-prosecution agreement. Later rebranded as Nadia Marcinko and became a pilot.'],
  ['jean-luc-brunel-upd', 'Jean-Luc Brunel', 'SKIP'],
  ['alexander-acosta', 'Alexander Acosta', 'American lawyer and politician. As U.S. Attorney for the Southern District of Florida, negotiated the controversial 2008 plea deal that allowed Jeffrey Epstein to avoid federal charges and receive a lenient 13-month county jail sentence with work release. Later served as U.S. Secretary of Labor under Trump (2017-2019), resigned in July 2019 after renewed scrutiny of the Epstein plea deal.'],
  ['steve-bannon', 'Steve Bannon', 'American media executive and political strategist. Former White House Chief Strategist under Trump. Reportedly visited Epstein in prison and met with him multiple times. Was at Epstein\'s Manhattan townhouse in late 2018, months before Epstein\'s arrest.'],
  ['joichi-ito', 'Joichi Ito', 'Japanese-American activist, businessman, and former director of MIT Media Lab. Resigned in September 2019 after it was revealed he had concealed the extent of Epstein\'s donations to MIT. Emails showed he deliberately listed Epstein as "anonymous" in donation records. Had received $1.7 million from Epstein for his personal investments and helped direct $7.5 million to the MIT Media Lab.'],
  ['lawrence-krauss', 'Lawrence Krauss', 'American-Canadian theoretical physicist. Foundation Professor at Arizona State University. Close associate of Epstein who attended his dinners and events. Defended Epstein publicly after his 2008 conviction. Resigned from ASU in 2019 after sexual misconduct allegations and renewed scrutiny of his Epstein ties.'],
  ['marvin-minsky', 'Marvin Minsky', 'American cognitive and computer scientist (1927-2016). Pioneer of artificial intelligence and co-founder of MIT AI Lab. Visited Epstein\'s private island. Virginia Giuffre alleged she was directed to have sexual relations with Minsky, though he denied any sexual contact. Received research funding through Epstein-connected channels.'],
  ['george-mitchell', 'George Mitchell', 'American politician and diplomat. Former U.S. Senate Majority Leader (1989-1995) and Special Envoy to the Middle East. Named in court documents related to the Epstein case. Virginia Giuffre alleged encounters with Mitchell, which he denied. His name appeared in Epstein\'s flight logs.'],
  ['bill-richardson', 'Bill Richardson', 'American politician (1947-2023). Former Governor of New Mexico and U.S. Secretary of Energy. Named in court documents related to the Epstein case. Virginia Giuffre alleged encounters with Richardson, which he denied. Epstein had a ranch in New Mexico near Richardson\'s sphere of influence.'],
  ['tom-barrack', 'Tom Barrack', 'American private equity real estate investor. Founder of Colony Capital. Named in Epstein\'s contacts. Part of the New York real estate and finance social circle that overlapped with Epstein\'s network.'],
  ['leslie-groff', 'Lesley Groff', 'Long-time personal assistant to Jeffrey Epstein. Named in court documents as one of the key members of Epstein\'s inner circle. Helped organize Epstein\'s schedule and logistics. Granted non-prosecution agreement as part of the 2008 plea deal.'],
  ['adriana-ross', 'Adriana Ross', 'Former model from Poland. Named as one of Epstein\'s associates and alleged co-conspirators. Part of Epstein\'s inner circle of young women. Granted immunity under the 2008 non-prosecution agreement. Invoked the Fifth Amendment when deposed.'],
  ['robert-maxwell', 'Robert Maxwell', 'British media proprietor and politician (1923-1991). Father of Ghislaine Maxwell. Born Jan Ludvik Hyman Binyamin Hoch in Czechoslovakia to a Jewish family. Built a publishing empire including Mirror Group Newspapers. Alleged connections to Mossad, MI6, and KGB. Died under mysterious circumstances falling from his yacht. After death, found to have defrauded Mirror Group pension funds of 460 million pounds. His intelligence connections are widely believed to have been inherited by Ghislaine, who introduced Epstein into elite circles.'],
  ['denny-hastert', 'Dennis Hastert', 'American politician. Former Speaker of the United States House of Representatives (1999-2007). Named in Epstein\'s contact records. Later convicted in 2015 of structuring bank withdrawals to conceal hush money paid to cover up sexual abuse of boys he had coached in wrestling decades earlier.'],
  ['stuart-pivar', 'Stuart Pivar', 'American art collector and businessman. Co-founder of the New York Academy of Art with Andy Warhol. Close friend of Jeffrey Epstein for over 20 years. Described himself as Epstein\'s oldest friend and claimed to have been the one who introduced Epstein to many in the art world.'],
  ['victoria-zdrok', 'Victoria Zdrok', 'Ukrainian-American model, lawyer, and author. Named in Epstein\'s black book and flight logs. Part of the social circle surrounding Epstein.'],
  ['lawrence-summers-ep', 'Lawrence Summers', 'SKIP'],
  ['modelage-connection', 'MC2 Modeling Agency', 'SKIP'],
];

// Add people (skip those marked SKIP or duplicates)
epsteinPeople.forEach(([id, name, bio]) => {
  if (bio === 'SKIP') return;
  if (addPerson(id, name, bio)) newPeople++;
});

// Also ensure existing Epstein-connected people have good bios
const bioUpdates = {
  'jeffrey-epstein': 'American financier and convicted sex offender (1953-2019). Born in Brooklyn, New York, to a Jewish family. Worked as a math teacher at Dalton School (hired by Donald Barr, father of later AG Bill Barr). Joined Bear Stearns in 1976, became a limited partner. Founded J. Epstein & Co in 1982, claiming to only serve billionaires - his only known major client was Leslie Wexner. Arrested in 2006 in Palm Beach for soliciting a minor. Negotiated a lenient plea deal in 2008 under U.S. Attorney Alexander Acosta, serving 13 months in county jail with work release. Re-arrested July 6, 2019 by SDNY on federal sex trafficking charges. His Manhattan townhouse was reportedly the largest private residence in NYC - originally owned by Wexner. Found dead in Metropolitan Correctional Center on August 10, 2019, officially ruled suicide by hanging, though circumstances remain highly disputed (broken cameras, sleeping guards, broken hyoid bone). His black book contained contact information for hundreds of prominent people. Flight logs of his private jet (dubbed the "Lolita Express") showed trips to his private island in the US Virgin Islands (Little St. James), his ranch in New Mexico, and residences worldwide.',
  'ghislaine-maxwell': 'British socialite and convicted sex trafficker. Born in France to Robert Maxwell, a British media magnate with alleged intelligence connections (Mossad, MI6). After her father\'s mysterious death in 1991, she moved to New York and became Jeffrey Epstein\'s girlfriend, then his closest associate and alleged chief procurer. Convicted in December 2021 on five of six federal charges including sex trafficking of a minor. Sentenced to 20 years in federal prison in June 2022. Prosecutors established she recruited, groomed, and trafficked underage girls for Epstein from 1994 to 2004. Her connections bridged Epstein into British aristocracy, the Clinton circle, and the global elite. She introduced Epstein to Prince Andrew and many high-society figures.',
  'leon-black': 'American billionaire investor. Co-founder and former CEO of Apollo Global Management. Paid Jeffrey Epstein at least $158 million between 2012 and 2017 for tax and estate planning advice - far exceeding typical advisory fees. Stepped down as Apollo CEO in March 2021 after an internal review of his Epstein ties, though was initially cleared. Later stepped down as chairman in 2022 amid further scrutiny. Born in New York to a Jewish family.',
  'jes-staley': 'British-American banker. Former CEO of Barclays (2015-2021). Resigned after a regulatory investigation into his characterization of his relationship with Jeffrey Epstein. Staley had exchanged 1,200 emails with Epstein between 2008 and 2012, including on weekends, with content described as very personal. While at JP Morgan, he had brought Epstein on as a client.',
  'bill-gates': 'American billionaire technologist. Co-founder of Microsoft. Met with Jeffrey Epstein multiple times between 2011 and 2014, after Epstein\'s conviction. Flew on Epstein\'s private plane at least once. Emails showed Gates described Epstein\'s lifestyle as "intriguing" and considered partnering with him on a charitable fund. His ex-wife Melinda French Gates cited the Epstein relationship as a factor in their divorce.',
};
for (const [id, bio] of Object.entries(bioUpdates)) {
  if (pd.people[id] && bio.length > (pd.people[id].bio || '').length) {
    pd.people[id].bio = bio;
  }
}

// --- Create Epstein Network entry in jewish.json ---
const epsteinEntry = {
  id: 'epstein-network',
  name: 'The Epstein Network',
  category: 'Controversy',
  summary: 'The network of associates, enablers, and connected individuals surrounding Jeffrey Epstein and Ghislaine Maxwell. This entry maps the documented connections between Epstein and prominent figures across finance, politics, technology, media, academia, and royalty. Connections are based on flight logs, court documents, Epstein\'s black book, financial records, deposition testimony, and investigative journalism.',
  website: '',
  connections: [
    { source: 'epstein-network', target: 'wexner-foundation', type: 'Financial – Wexner was Epstein\'s only known major client' },
    { source: 'epstein-network', target: 'apollo-global', type: 'Financial – Leon Black paid Epstein $158M in advisory fees' },
    { source: 'epstein-network', target: 'barclays', type: 'Financial – Jes Staley brought Epstein as JP Morgan client' },
    { source: 'epstein-network', target: 'microsoft', type: 'Technology – Bill Gates met Epstein multiple times post-conviction' }
  ],
  individuals: [
    { name: 'Jeffrey Epstein', id: 'jeffrey-epstein', role: 'Principal' },
    { name: 'Ghislaine Maxwell', id: 'ghislaine-maxwell', role: 'Chief Associate & Convicted Trafficker' },
    { name: 'Leslie Wexner', id: 'leslie-wexner', role: 'Primary Financial Client' },
    { name: 'Leon Black', id: 'leon-black', role: 'Financial Associate ($158M in fees)' },
    { name: 'Bill Gates', id: 'bill-gates', role: 'Post-Conviction Associate' },
    { name: 'Prince Andrew', id: 'prince-andrew', role: 'Close Associate (settled civil suit)' },
    { name: 'Ehud Barak', id: 'ehud-barak', role: 'Business Partner (Carbyne)' },
    { name: 'Alan Dershowitz', id: 'alan-dershowitz-ind', role: 'Legal Advisor & Associate' },
    { name: 'Bill Clinton', id: 'bill-clinton-individual', role: 'Flight Log Passenger (26+ flights)' },
    { name: 'Donald Trump', id: 'donald-trump', role: 'Former Social Associate' },
    { name: 'Jes Staley', id: 'jes-staley', role: 'Banking Associate (1,200+ emails)' },
    { name: 'Reid Hoffman', id: 'reid-hoffman', role: 'Post-Conviction Meeting Attendee' },
    { name: 'Steven Pinker', id: 'steven-pinker', role: 'Legal Consultation Provider' },
    { name: 'Mort Zuckerman', id: 'mort-zuckerman', role: 'Black Book Contact & Social Associate' },
    { name: 'Glenn Dubin', id: 'glenn-dubin', role: 'Close Friend (20+ years)' },
    { name: 'Eva Andersson-Dubin', id: 'eva-andersson-dubin', role: 'Former Girlfriend' },
    { name: 'Peter Mandelson', id: 'peter-mandelson', role: 'Black Book Contact & Associate' },
    { name: 'Jean-Luc Brunel', id: 'jean-luc-brunel', role: 'Modeling Agent & Associate (died in custody)' },
    { name: 'Sarah Kellen', id: 'sarah-kellen', role: 'Personal Scheduler & Alleged Recruiter' },
    { name: 'Nadia Marcinkova', id: 'nadia-marcinkova', role: 'Victim Turned Associate' },
    { name: 'Alexander Acosta', id: 'alexander-acosta', role: 'Prosecutor (negotiated plea deal)' },
    { name: 'Steve Bannon', id: 'steve-bannon', role: 'Post-Arrest Visitor' },
    { name: 'Joichi Ito', id: 'joichi-ito', role: 'MIT Media Lab (concealed donations)' },
    { name: 'Lawrence Krauss', id: 'lawrence-krauss', role: 'Academic Associate & Public Defender' },
    { name: 'George Mitchell', id: 'george-mitchell', role: 'Named in Court Documents' },
    { name: 'Bill Richardson', id: 'bill-richardson', role: 'Named in Court Documents' },
    { name: 'Robert Maxwell', id: 'robert-maxwell', role: 'Ghislaine\'s Father (intelligence ties)' },
    { name: 'Dennis Hastert', id: 'denny-hastert', role: 'Contact (later convicted of abuse)' },
    { name: 'Stuart Pivar', id: 'stuart-pivar', role: 'Self-Described Oldest Friend' },
    { name: 'Lesley Groff', id: 'leslie-groff', role: 'Personal Assistant' },
    { name: 'Adriana Ross', id: 'adriana-ross', role: 'Inner Circle Associate' },
    { name: 'Henry Kissinger', id: 'henry-kissinger', role: 'Black Book Contact' },
    { name: 'Lawrence Summers', id: 'lawrence-summers-harvard', role: 'Academic Contact (Harvard)' },
    { name: 'Harvey Weinstein', id: 'harvey-weinstein', role: 'Black Book Contact' },
    { name: 'Naomi Campbell', id: 'naomi-campbell', role: 'Flight Log & Social Circle' },
    { name: 'Les Moonves', id: 'les-moonves', role: 'Black Book Contact' },
    { name: 'Elon Musk', id: 'elon-musk-ind', role: 'Photographed at Event 2011' },
    { name: 'Woody Allen', id: 'woody-allen-ind', role: 'Social Associate' }
  ]
};

// Add to US under jewish.json
if (!jd.countries['United States']) jd.countries['United States'] = [];
// Remove old epstein-network entry if exists
jd.countries['United States'] = jd.countries['United States'].filter(e => e.id !== 'epstein-network');
jd.countries['United States'].push(epsteinEntry);

// Also update some existing people bios for Epstein connections
const epsteinBioAdditions = {
  'alan-dershowitz-ind': 'American lawyer and Harvard Law professor emeritus. Member of Jeffrey Epstein\'s defense team in the 2008 case. Helped negotiate the controversial plea deal. Flew on Epstein\'s private jet and visited his properties. Virginia Giuffre alleged sexual encounters directed by Epstein, which Dershowitz vehemently denied and counter-sued. Represented Trump during first impeachment trial. One of the most prominent public figures connected to the Epstein case.',
  'bill-clinton-individual': 'Former President of the United States (1993-2001). Flight logs show he flew on Epstein\'s private jet (the "Lolita Express") at least 26 times. Secret Service detail was reportedly declined on some trips. Visited Epstein\'s private island Little St. James according to some accounts. A Clinton spokesperson acknowledged the flights but denied knowledge of Epstein\'s crimes.',
  'elon-musk-ind': 'South African-born American billionaire. CEO of Tesla, SpaceX, owner of X (formerly Twitter). Photographed at an event with Ghislaine Maxwell in 2011. His name appeared in Epstein\'s contacts. Has stated he did not have a personal relationship with Epstein.',
  'woody-allen-ind': 'American filmmaker and comedian. Had dinner with Jeffrey Epstein and others. A photograph exists of Allen with Epstein and others at social events. His relationship with Epstein was described as casual and social.',
  'noam-chomsky': 'American linguist, philosopher, and political activist. Professor emeritus at MIT. Met with Jeffrey Epstein multiple times, including after his 2008 conviction. Epstein reportedly helped arrange a meeting between Chomsky and former Israeli Prime Minister Ehud Barak. Chomsky acknowledged the meetings but stated they discussed political topics.',
  'henry-kissinger': 'American diplomat and political scientist (1923-2023). Former U.S. Secretary of State and National Security Advisor. Named in Jeffrey Epstein\'s black book of contacts. Attended at least one dinner at Epstein\'s Manhattan townhouse.',
};
for (const [id, bio] of Object.entries(epsteinBioAdditions)) {
  if (pd.people[id]) {
    if (bio.length > (pd.people[id].bio || '').length) {
      pd.people[id].bio = bio;
    }
  }
}

// Also check if lawrence-summers-harvard exists
if (!pd.people['lawrence-summers-harvard']) {
  addPerson('lawrence-summers-harvard', 'Lawrence Summers', 'American economist. Former U.S. Secretary of the Treasury (1999-2001) and President of Harvard University (2001-2006). Met with Jeffrey Epstein on multiple occasions, including after his 2008 conviction. Epstein donated to Harvard and visited campus. Flew on Epstein\'s plane at least once. Director of the National Economic Council under Obama (2009-2010).');
  newPeople++;
}

// Save
fs.writeFileSync(pFile, JSON.stringify(pd, null, 2));
fs.writeFileSync(jFile, JSON.stringify(jd, null, 2));

const totalPeople = Object.keys(pd.people).length;
let totalEntries = 0;
for (const c in jd.countries) totalEntries += jd.countries[c].length;

console.log(`Added ${newPeople} new people`);
console.log(`Total people: ${totalPeople}`);
console.log(`Total entries: ${totalEntries}`);
console.log('Epstein Network entry has ' + epsteinEntry.individuals.length + ' individuals');
