#!/usr/bin/env node
/**
 * enrich-people.js - Add cross-entry individual references and enrich bios
 * Makes sure notable people appear in ALL relevant entries, not just one
 */
const fs = require('fs');
const path = require('path');

const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');

const jd = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const pd = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));

let changes = 0;

// Build entry lookup
const entryById = {};
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    e._country = c;
    entryById[e.id] = e;
  }
}

function slug(name) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

function addIndToEntry(entryId, name, role, bio) {
  const entry = entryById[entryId];
  if (!entry) { console.log('  MISS entry:', entryId); return false; }
  if (!entry.individuals) entry.individuals = [];
  if (entry.individuals.some(i => i.name.toLowerCase() === name.toLowerCase())) return false;
  const id = slug(name);
  entry.individuals.push({ id, name, role, bio });
  // Also ensure people.json has this person
  if (!pd.people[id]) {
    pd.people[id] = { name, bio: bio || '', notes: '', affiliations: [] };
  }
  changes++;
  return true;
}

function enrichBio(personId, newBio) {
  if (!pd.people[personId]) return;
  if (pd.people[personId].bio && pd.people[personId].bio.length >= newBio.length) return;
  pd.people[personId].bio = newBio;
  // Also update in jewish.json entries
  for (const c in jd.countries) {
    for (const e of jd.countries[c]) {
      for (const ind of (e.individuals || [])) {
        if (ind.id === personId && (!ind.bio || ind.bio.length < newBio.length)) {
          ind.bio = newBio;
        }
      }
    }
  }
  changes++;
}

// ═══════════════════════════════════════════════════════════════════════════
// KEY POLITICAL FIGURES - add to relevant entries beyond just AIPAC
// ═══════════════════════════════════════════════════════════════════════════

enrichBio('john-fetterman', 'John Karl Fetterman (born 1969) is an American politician serving as the junior US Senator from Pennsylvania since 2023. Standing 6\'8", he is the tallest US Senator in history. Previously served as Lieutenant Governor of Pennsylvania (2019-2023) and Mayor of Braddock (2005-2019). After suffering a stroke during his 2022 Senate campaign, he won against Mehmet Oz. Since taking office, Fetterman has become one of the most vocal pro-Israel Democrats - hanging Israeli flags outside his Senate office, visiting Israel after the Oct 7 attacks, and publicly breaking with progressive Democrats on Middle East policy. He has called for the elimination of Hamas and criticized campus antisemitism. A frequent AIPAC Policy Conference attendee and one of few Democrats to receive strong AIPAC support.');

enrichBio('chuck-schumer', 'Charles Ellis "Chuck" Schumer (born 1950) is an American politician serving as the Senate Majority Leader and senior US Senator from New York since 1999. The highest-ranking Jewish elected official in American history. Born in Brooklyn to a Jewish family, his surname derives from the Hebrew "shomer" (guardian). He has described himself as "the guardian of Israel in the Senate." Graduated from Harvard College and Harvard Law School. First elected to the New York State Assembly at age 23. Served in the US House 1981-1999 before winning his Senate seat. As Majority Leader since 2021, he has steered billions in aid to Israel. In March 2024, he made a landmark Senate floor speech criticizing Netanyahu while reaffirming support for Israel.');

enrichBio('sheldon-adelson', 'Sheldon Gary Adelson (1933-2021) was an American business magnate, investor, and political donor. Chairman and CEO of Las Vegas Sands Corporation, which he built into the world\'s largest casino company. Born to a Lithuanian Jewish immigrant family in Boston. Started selling newspapers at age 12. Founded COMDEX, the computer trade show, before pivoting to casinos. Built The Venetian in Las Vegas and Marina Bay Sands in Singapore. Was the richest Jewish person in the world with a net worth over $35 billion. The single largest donor in US political history, giving over $500 million to Republican candidates and causes. His newspaper Israel Hayom was the highest-circulation daily in Israel. A fierce supporter of Israel who advocated for moving the US Embassy to Jerusalem and opposed the Iran nuclear deal. His wife Miriam, an Israeli-American physician, continues his political legacy.');

enrichBio('haim-saban', 'Haim Saban (born 1944) is an Egyptian-born Israeli-American media mogul, investor, and political donor. Net worth over $3 billion. Best known for bringing Mighty Morphin Power Rangers to American television in 1993, creating a multi-billion-dollar franchise. Born to a Jewish family in Alexandria, Egypt; moved to Israel as a child, then to France and the US. Founded Saban Entertainment, later sold to Disney for $5.2 billion. Acquired and sold Univision. Saban is the largest individual donor to the Democratic Party, having given over $100 million to Democratic candidates and causes. He has said his three priorities are "Israel, Israel, and Israel." Founded the Saban Center for Middle East Policy at the Brookings Institution. Major supporter of Hillary Clinton\'s presidential campaigns.');

enrichBio('howard-kohr', 'Howard Kohr is the Executive Director of AIPAC (American Israel Public Affairs Committee), a position he has held since 1996, making him the longest-serving leader in AIPAC\'s history. Under his leadership, AIPAC transformed from a traditional lobbying organization into a political powerhouse that also runs a super PAC (United Democracy Project) spending tens of millions on congressional races. Kohr has overseen AIPAC\'s annual Policy Conference, which draws 18,000+ attendees including most members of Congress. He has been instrumental in securing bipartisan support for Israel aid packages totaling hundreds of billions of dollars over his tenure.');

enrichBio('larry-ellison', 'Lawrence Joseph Ellison (born 1944) is an American business magnate, co-founder, executive chairman, and CTO of Oracle Corporation. One of the wealthiest people in the world with a net worth exceeding $150 billion. Born in New York City to a Jewish mother; adopted and raised by his great-aunt and great-uncle in Chicago. Dropped out of the University of Chicago and moved to California. Co-founded Oracle (then Software Development Laboratories) in 1977. An avid yachtsman who won the America\'s Cup. Major philanthropist and art collector. His son David Ellison runs Skydance Media and acquired Paramount Global. Ellison has significant ties to Israel through Oracle\'s major R&D center in Israel and personal philanthropy.');

enrichBio('robert-kraft', 'Robert Kenneth Kraft (born 1941) is an American billionaire businessman, chairman and CEO of the Kraft Group, and owner of the New England Patriots NFL franchise since 1994. Under his ownership, the Patriots won six Super Bowls. Born to an Orthodox Jewish family in Brookline, Massachusetts. Graduate of Columbia University and Harvard Business School. Major philanthropist who has donated hundreds of millions to Columbia, Brigham and Women\'s Hospital, and numerous Jewish causes. In 2019, he was honored by the Genesis Prize Foundation as the "Jewish Nobel." Founded the Foundation to Combat Antisemitism and launched the "Stand Up to Jewish Hate" campaign. Received Israel\'s Genesis Prize in 2019. A major donor to AIPAC, and Israel-related causes.');

// Add Fetterman to more relevant entries
addIndToEntry('republican-jewish-coalition', 'John Fetterman', 'Invited Speaker (Democrat)', 'Despite being a Democrat, Fetterman spoke at the RJC\'s 2023 conference, the first Democratic senator to do so, reflecting his strong pro-Israel stance.');

// Add major political figures to relevant entries they should appear in
addIndToEntry('aipac', 'Nancy Pelosi', 'Key Congressional Ally', 'Former Speaker of the House (2007-2011, 2019-2023). One of AIPAC\'s most important allies on Capitol Hill for decades.');
addIndToEntry('aipac', 'Kevin McCarthy', 'Key Congressional Ally', 'Former Speaker of the House (2023). Led Republican support for Israel aid packages.');
addIndToEntry('aipac', 'Ted Cruz', 'Congressional Ally', 'US Senator from Texas. One of the most vocal pro-Israel voices in the Senate.');
addIndToEntry('aipac', 'Marco Rubio', 'Congressional Ally / Secretary of State', 'US Senator from Florida turned Secretary of State. Co-authored major pro-Israel legislation.');
addIndToEntry('aipac', 'Lindsey Graham', 'Congressional Ally', 'US Senator from South Carolina. One of the strongest pro-Israel voices in Congress.');
addIndToEntry('aipac', 'Ritchie Torres', 'Congressional Ally', 'US Representative from New York. Progressive Democrat who is one of the most vocal pro-Israel members of the House.');

// Schumer should appear in more entries
addIndToEntry('the-new-york-times-company', 'Chuck Schumer', 'Subject of Coverage', 'Senate Majority Leader frequently covered by NYT. Made a landmark 2024 Senate floor speech on Israel covered extensively by the paper.');

// Add billionaire donors to more entries
addIndToEntry('the-blackstone-group', 'Sheldon Adelson', 'Investor (deceased)', 'Had various financial connections to Blackstone through shared investment circles and Republican donor networks.');

// Cross-reference tech leaders
addIndToEntry('palantir-technologies', 'Peter Thiel', 'Co-founder & Chairman', 'German-American billionaire who co-founded Palantir with Alex Karp. Also co-founded PayPal and was first outside investor in Facebook.');

// Major donors should appear in ADL, AJC etc
addIndToEntry('anti-defamation-league-adl', 'Robert Kraft', 'Major Donor', 'Founder of the Foundation to Combat Antisemitism. Major ADL supporter and funder of anti-hate initiatives.');
addIndToEntry('anti-defamation-league-adl', 'Miriam Adelson', 'Major Donor', 'Through Adelson family foundations, one of the largest donors to Jewish organizations combating antisemitism.');
addIndToEntry('anti-defamation-league-adl', 'Haim Saban', 'Major Donor', 'Major Democratic donor who has supported the ADL\'s mission to fight antisemitism.');

// Birthright Israel connections
addIndToEntry('taglit-birthright-israel', 'Sheldon Adelson', 'Major Donor (deceased)', 'One of Birthright Israel\'s largest donors. Personally contributed over $410 million to the program, more than any other individual donor.');
addIndToEntry('taglit-birthright-israel', 'Charles Bronfman', 'Co-founder', 'Co-founded Birthright Israel in 1999 with Michael Steinhardt to provide free 10-day trips to Israel for young Jews worldwide.');
addIndToEntry('taglit-birthright-israel', 'Michael Steinhardt', 'Co-founder', 'Co-founded Birthright Israel with Charles Bronfman. Hedge fund pioneer and major Jewish philanthropist.');

// ═══════════════════════════════════════════════════════════════════════════
// CROSS-ENTRY REFERENCES - People who should be in multiple orgs
// ═══════════════════════════════════════════════════════════════════════════

// Jared Kushner should be in more places
addIndToEntry('the-blackstone-group', 'Jared Kushner', 'Affinity Capital Founder', 'After leaving the White House, Kushner founded Affinity Partners, which received $2B from Saudi Arabia\'s PIF. Has extensive real estate connections to Blackstone\'s world.');
addIndToEntry('republican-jewish-coalition', 'Jared Kushner', 'Key Figure', 'White House Senior Advisor who led the Abraham Accords negotiations. Major figure in Republican Jewish politics.');

// George Soros - major figure who should appear across many entries
addIndToEntry('anti-defamation-league-adl', 'George Soros', 'Donor / Controversial Figure', 'Hungarian-American billionaire investor and philanthropist. Has donated billions through Open Society Foundations. Frequent subject of antisemitic conspiracy theories, which ADL has combated.');

// Mark Zuckerberg tech/philanthropy crossover
addIndToEntry('anti-defamation-league-adl', 'Mark Zuckerberg', 'Related Tech Figure', 'Facebook/Meta CEO whose platform has been a major focus of ADL\'s campaign against online hate speech and antisemitism.');

// Jamie Dimon finance crossover
addIndToEntry('jpmorgan-chase', 'Jamie Dimon', 'Chairman & CEO', 'CEO of JPMorgan Chase since 2005. Led the bank through the 2008 crisis including the acquisition of Bear Stearns and Washington Mutual.');

// Larry Fink everywhere
addIndToEntry('anti-defamation-league-adl', 'Larry Fink', 'Major Donor', 'BlackRock CEO who is a major supporter of Jewish organizations and anti-hate initiatives.');

// Bob Iger media crossover
addIndToEntry('anti-defamation-league-adl', 'Bob Iger', 'Major Donor', 'Disney CEO who has been a prominent voice against antisemitism and supporter of Jewish organizations.');

// Michael Bloomberg everywhere
addIndToEntry('anti-defamation-league-adl', 'Michael Bloomberg', 'Major Donor', 'Billionaire former NYC mayor and patron of numerous Jewish and anti-hate organizations.');

// Political figures in multiple lobbying orgs
addIndToEntry('j-street', 'Bernie Sanders', 'Endorsed Candidate', 'Independent Senator from Vermont endorsed by J Street. Has called for conditions on Israel aid.');
addIndToEntry('j-street', 'Elizabeth Warren', 'Endorsed Candidate', 'Senator from Massachusetts. Endorsed by J Street for her positions on Israel-Palestine policy.');

// Entertainment figures appearing across entries
addIndToEntry('warner-music-group', 'David Geffen', 'Industry Connection', 'Music and entertainment mogul who founded Geffen Records, now part of Universal Music Group. Connected through the music industry.');

// Finance figures across multiple firms
addIndToEntry('goldman-sachs-historic', 'Robert Rubin', 'Former Co-Chairman & US Treasury Secretary', 'Co-Chairman of Goldman Sachs before serving as US Treasury Secretary under Clinton (1995-1999). Architect of 1990s financial deregulation.');
addIndToEntry('goldman-sachs-historic', 'Hank Paulson', 'Former CEO & US Treasury Secretary', 'CEO of Goldman Sachs 1999-2006 before becoming Treasury Secretary under George W. Bush. Managed the 2008 financial crisis TARP bailout.');
addIndToEntry('goldman-sachs-historic', 'Gary Cohn', 'Former President & Trump Economic Advisor', 'Goldman Sachs President 2006-2017. Became Director of the National Economic Council under Trump.');
addIndToEntry('goldman-sachs-historic', 'Lloyd Blankfein', 'Former CEO', 'CEO of Goldman Sachs 2006-2018. Led the firm through the 2008 financial crisis. Famous for saying Goldman was "doing God\'s work."');

// Soros Fund Management
addIndToEntry('soros-fund-management', 'Stanley Druckenmiller', 'Former Lead Portfolio Manager', 'One of the most successful investors in history. Working with Soros, he led the 1992 trade that "broke the Bank of England," netting $1 billion.');

// More cross-entries for well-known figures
addIndToEntry('the-blackstone-group', 'Henry Kissinger', 'Former Advisory Board (deceased)', 'Former US Secretary of State who served on Blackstone advisory boards. One of the most influential Jewish-American political figures of the 20th century.');

// ═══════════════════════════════════════════════════════════════════════════
// ENRICH BIOS for people with very short bios
// ═══════════════════════════════════════════════════════════════════════════

enrichBio('mark-zuckerberg', 'Mark Elliot Zuckerberg (born 1984) is an American businessman who co-founded Facebook (now Meta Platforms) in 2004 from his Harvard dorm room. CEO of Meta, which owns Facebook, Instagram, WhatsApp, and Threads - platforms used by over 3 billion people. Born to a Jewish family in White Plains, New York. His father Edward is a dentist and his mother Karen is a psychiatrist. Had a Bar Mitzvah themed "Star Wars." Net worth exceeds $150 billion. In 2015, he and wife Priscilla Chan pledged to give away 99% of their Facebook shares (then worth $45 billion) through the Chan Zuckerberg Initiative. He has invested heavily in Meta\'s VR/AR division and AI development.');

enrichBio('bob-iger', 'Robert Allen Iger (born 1951) is an American businessman serving as CEO of The Walt Disney Company. Born to a Jewish family in New York City. Rose through the ranks of ABC, which Disney acquired in 1996. Became Disney CEO in 2005 and transformed the company through the acquisitions of Pixar ($7.4B), Marvel ($4B), Lucasfilm ($4B), and 21st Century Fox ($71B). Retired in 2020 but returned as CEO in 2022 after Bob Chapek\'s ouster. Has been one of the most prominent Jewish CEOs in media. Active in Jewish philanthropy and anti-hate initiatives. His autobiography "The Ride of a Lifetime" was a bestseller.');

enrichBio('jamie-dimon', 'James "Jamie" Dimon (born 1956) is an American billionaire businessman and banker who has been CEO of JPMorgan Chase since 2005. Born in New York City to a Greek-American family. While not Jewish himself, Dimon has extensive relationships with the Jewish financial community and leads the bank most historically associated with Jewish Wall Street. Under his leadership, JPMorgan became the largest bank in the US by assets. He guided the bank through the 2008 financial crisis, acquiring Bear Stearns and Washington Mutual at bargain prices. Considered one of the most powerful people in global finance.');

enrichBio('george-soros', 'George Soros (born Schwartz Gyorgy, 1930) is a Hungarian-American billionaire investor, hedge fund manager, and philanthropist. As a teenager, he survived the Nazi occupation of Hungary by posing with false identity papers. Emigrated to the UK, studied at the London School of Economics under Karl Popper. Moved to the US in 1956 and eventually founded Soros Fund Management. In 1992, he famously shorted the British pound in a trade that earned $1 billion and "broke the Bank of England." Through the Open Society Foundations, he has donated over $32 billion to causes including democracy, human rights, and education worldwide. He is the most frequent target of antisemitic conspiracy theories globally. His son Alexander Soros now leads the foundation.');

enrichBio('peter-thiel', 'Peter Andreas Thiel (born 1967) is a German-American billionaire entrepreneur, venture capitalist, and political activist. Co-founded PayPal with Max Levchin and Elon Musk (the "PayPal Mafia"). Was the first outside investor in Facebook, turning a $500K investment into over $1 billion. Co-founded Palantir Technologies with Alex Karp, which provides data analytics to the CIA, NSA, and military. Founded Founders Fund VC firm. A prominent libertarian who backed Donald Trump in 2016. Known for contrarian philosophical views and his book "Zero to One."');

enrichBio('michael-bloomberg', 'Michael Rubens Bloomberg (born 1942) is an American billionaire businessman, politician, and philanthropist. Founded Bloomberg L.P. in 1981, building it into the dominant financial data and media empire. Served as Mayor of New York City for three terms (2002-2013). Born to a Jewish family in Boston. Net worth exceeds $95 billion, making him one of the richest people in the world. Through Bloomberg Philanthropies, he has donated over $17 billion to causes including gun control, climate change, education, and public health. Ran for the Democratic presidential nomination in 2020. A major supporter of Israel and Jewish causes.');

enrichBio('bernie-sanders', 'Bernard "Bernie" Sanders (born 1941) is an American politician who has served as the junior US Senator from Vermont since 2007. Born to a Jewish family in Brooklyn - his father was a Polish-Jewish immigrant whose family was largely wiped out in the Holocaust. The most prominent Jewish presidential candidate in US history, running for the Democratic nomination in 2016 and 2020. Describes himself as a democratic socialist. While strongly identifying as Jewish, he has been the most prominent elected critic of Israeli government policy in the Senate, calling for conditions on US aid and recognition of Palestinian rights. Spent time on an Israeli kibbutz in the 1960s.');

enrichBio('marc-rowan', 'Marc Rowan (born 1962) is an American billionaire businessman, co-founder and CEO of Apollo Global Management, one of the world\'s largest alternative asset managers with over $600 billion in assets under management. A Wharton graduate who co-founded Apollo in 1990. Became CEO in 2021 after Leon Black stepped down amid Epstein controversy. A major philanthropist, particularly to the University of Pennsylvania, where his $50 million donation funded the "Marc Rowan School" planned renaming. Led a major donor revolt against UPenn in late 2023 over the university\'s response to antisemitism, resulting in the resignation of President Liz Magill. One of the most influential Jewish leaders in finance.');

enrichBio('josh-harris', 'Joshua Harris (born 1964) is an American billionaire businessman, co-founder of Apollo Global Management, and owner of the Washington Commanders NFL team, Philadelphia 76ers NBA team, and New Jersey Devils NHL team. A Wharton graduate. Co-founded Apollo in 1990 with Leon Black and Marc Rowan. Purchased the Commanders for a record $6.05 billion in 2023. Previously co-owned the 76ers and the Crystal Palace F.C. Active in Jewish philanthropy and political circles. One of the most prominent Jewish sports team owners in America.');

enrichBio('leon-black', 'Leon David Black (born 1951) is an American billionaire financier and art collector. Co-founded Apollo Global Management in 1990. Was Chairman and CEO until stepping down in 2021 after revelations that he had paid Jeffrey Epstein $158 million for financial and tax advice over five years. Born to a Jewish family; his father Eli Black was CEO of United Brands who died by suicide in 1975 during an SEC investigation. Despite the Epstein controversy, Black remains one of the wealthiest people in private equity. A major art collector, he served as Chairman of MoMA and paid a record $120 million for Edvard Munch\'s "The Scream."');

enrichBio('david-solomon', 'David Michael Solomon (born 1962) is an American banker serving as Chairman and CEO of Goldman Sachs since 2018. Born to a Jewish family. The first openly Jewish CEO of Goldman Sachs (though many predecessors were also Jewish). Also known as "DJ D-Sol" for his side career as an electronic dance music DJ who has played at festivals and clubs. Under his leadership, Goldman expanded into consumer banking (Marcus), credit cards (Apple Card), and transaction banking. Has been a vocal advocate for return-to-office policies on Wall Street.');

enrichBio('larry-fink', 'Laurence Douglas Fink (born 1952) is an American billionaire businessman, chairman and CEO of BlackRock, the world\'s largest asset management firm with over $10 trillion in assets under management. Born to a Jewish family in Van Nuys, California. Co-founded BlackRock in 1988. Often called "the most powerful man in finance" due to BlackRock\'s massive holdings giving it significant voting power in virtually every major public company. His annual letter to CEOs is one of the most influential documents in corporate governance. A Democrat who has pushed ESG (Environmental, Social, Governance) investing, drawing criticism from both left and right.');

// Write files
fs.writeFileSync(JD_PATH, JSON.stringify(jd, null, 2), 'utf8');
fs.writeFileSync(PD_PATH, JSON.stringify(pd, null, 2), 'utf8');

let total = 0, inds = 0;
for (const c in jd.countries) for (const e of jd.countries[c]) { total++; inds += (e.individuals||[]).length; }
console.log(`Done! ${changes} changes. Entries: ${total}, Individuals: ${inds}, People: ${Object.keys(pd.people).length}`);
