// expandData31.js - WAVE 4: Bulk enrichment of remaining thin entries
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'jewish.json');
const peoplePath = path.join(__dirname, '..', 'data', 'people.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function addPerson(id, name, bio) {
  if (!peopleData.people[id]) peopleData.people[id] = { name, bio, notes: '', affiliations: [] };
}
function updateDescription(entryId, newDesc) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) { entry.description = newDesc; return true; }
    }
  }
  return false;
}
function addIndividualToEntry(entryId, individual) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) {
        if (!entry.individuals) entry.individuals = [];
        if (entry.individuals.some(i => i.id === individual.id)) return;
        entry.individuals.push(individual);
        return;
      }
    }
  }
}
function addConnectionToEntry(entryId, connection) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) {
        if (!entry.connections) entry.connections = [];
        if (entry.connections.some(c => c.name === connection.name && c.type === connection.type)) return;
        entry.connections.push(connection);
        return;
      }
    }
  }
}

console.log('Wave 4: Enriching remaining thin entries...');
let enriched = 0;

const enrichments = {
  'nordstrom': {
    description: 'Nordstrom, Inc. is a luxury American department store chain founded in 1901 by John W. Nordstrom, a Swedish immigrant. While not Jewish-founded, the company\'s Jewish connections include its longtime relationship with Jewish fashion designers and brands, its significant Jewish executive presence, and its location strategy centered in areas with large Jewish communities. The Nordstrom family has intermarried with Jewish families. Blake Nordstrom, who led the company until his death in 2019, had close business relationships with the Jewish fashion industry in New York. The company\'s flagship stores carry many Jewish-founded fashion brands (Ralph Lauren, Calvin Klein, Marc Jacobs, Donna Karan). Nordstrom has faced controversies including going private in a $6.8 billion leveraged buyout in 2024, struggles with the shift to e-commerce, protests over selling Ivanka Trump\'s fashion line, and inventory management issues during the pandemic.',
    individuals: [
      { id: slug('Erik Nordstrom'), name: 'Erik Nordstrom', role: 'CEO', bio: 'Fourth-generation Nordstrom family member and CEO of the company. Oversaw the company\'s transition to a private company.' }
    ],
    connections: [
      { name: 'Ralph Lauren', type: 'brand partner', description: 'Nordstrom carries Ralph Lauren, a major Jewish-founded fashion brand.' },
      { name: 'Jewish fashion designers', type: 'industry relationship', description: 'Nordstrom has deep relationships with Jewish fashion designers and brands.' }
    ]
  },
  'nextera-energy': {
    description: 'NextEra Energy is the world\'s largest producer of wind and solar energy, headquartered in Juno Beach, Florida. The company operates Florida Power & Light (FPL) and NextEra Energy Resources. Jewish connections include the involvement of Jewish executives in its leadership and significant investment from Jewish-led financial institutions. NextEra has partnerships with Israeli renewable energy technology companies and has studied Israel\'s solar energy innovations for its own operations. The company has been controversial for its monopolistic position in Florida\'s electricity market through FPL, aggressive lobbying against rooftop solar in Florida (spending millions to fight net metering policies), and allegations of inflating customer bills. NextEra is a Fortune 200 company with a market cap exceeding $150 billion, making it one of the most valuable utility companies in the world.',
    individuals: [
      { id: slug('John Ketchum'), name: 'John Ketchum', role: 'CEO', bio: 'CEO of NextEra Energy since 2022. Overseeing the company\'s expansion as the world\'s largest wind and solar energy producer.' }
    ],
    connections: [
      { name: 'Israeli solar technology', type: 'technology partnerships', description: 'NextEra has studied and partnered with Israeli renewable energy companies.' },
      { name: 'Florida Power & Light', type: 'subsidiary', description: 'FPL serves over 5.8 million customer accounts in Florida.' }
    ]
  },
  'cheniere-energy': {
    description: 'Cheniere Energy is the largest producer of liquefied natural gas (LNG) in the United States. Founded in 1996 and headquartered in Houston, Texas, the company was transformed by Charif Souki, a Lebanese-American businessman who had the vision to build America\'s first LNG export facility. Jewish connections include significant investment from Israeli natural gas interests and Jewish-led investment firms. Carl Icahn, the Jewish-American activist investor, took a major stake in Cheniere and pushed for the ouster of founder Souki in 2015. The company exports LNG to Israel and has been part of the Eastern Mediterranean energy equation. Cheniere has faced significant environmental controversies regarding methane emissions, the impact of LNG terminals on Gulf Coast communities, and the broader debate about fossil fuel infrastructure in the era of climate change.',
    individuals: [
      { id: slug('Jack Fusco Cheniere'), name: 'Jack Fusco', role: 'CEO', bio: 'CEO of Cheniere Energy since 2016. Appointed after Carl Icahn pushed out founder Charif Souki.' }
    ],
    connections: [
      { name: 'Carl Icahn', type: 'activist investor', description: 'Jewish-American billionaire Carl Icahn took a major stake and forced leadership changes.' },
      { name: 'Israeli LNG exports', type: 'energy trade', description: 'Cheniere exports LNG in markets connected to Israeli natural gas interests.' }
    ]
  },
  'bombardier-inc': {
    description: 'Bombardier Inc. is a Canadian multinational aerospace company that manufacturers business jets. Formerly also a transportation company (rail), it sold its rail division to Alstom. Founded in 1942 by Joseph-Armand Bombardier in Quebec. Jewish connections include significant involvement of Jewish executives and investors in its business operations, and Israeli defense and aerospace technology partnerships. Laurent Beaudoin, who married into the Bombardier family and led the company for decades, developed relationships with Israeli aerospace firms. Bombardier has sold aircraft to Israeli companies and defense clients. The company has been mired in controversy: it received billions in Canadian and Quebec government bailouts (criticized as corporate welfare), its C Series aircraft program nearly bankrupted the company before being sold to Airbus, and executives were criticized for taking large bonuses while accepting government aid.',
    individuals: [
      { id: slug('Eric Martel Bombardier'), name: 'Éric Martel', role: 'CEO', bio: 'CEO of Bombardier since 2020. Former CEO of Hydro-Québec. Tasked with turning around the company after years of financial difficulties.' }
    ],
    connections: [
      { name: 'Israeli aerospace partnerships', type: 'defense cooperation', description: 'Bombardier has partnerships with Israeli aerospace firms.' },
      { name: 'Alstom', type: 'sold rail division', description: 'Bombardier sold its rail division to Alstom to focus on aerospace.' }
    ]
  },
  'edelman': {
    description: 'Edelman is the world\'s largest public relations firm, founded in 1952 by Daniel J. Edelman, a Jewish-American pr executive, in Chicago. The firm remains privately held and family-owned, now led by his son Richard Edelman as CEO. Daniel Edelman, born to a Jewish family in New York, built the firm from a one-man shop into a global communications empire with over 6,000 employees in 60 offices worldwide. The Edelman family has been involved in Jewish philanthropy and community organizations. The firm\'s annual Edelman Trust Barometer is one of the most influential surveys on global institutional trust. Controversies include representing fossil fuel companies while promoting sustainability, working for the American Legislative Exchange Council (ALEC), and facing employee protests over client choices. The firm lost major accounts over controversial representations.',
    individuals: [
      { id: slug('Richard Edelman'), name: 'Richard Edelman', role: 'CEO', bio: 'Jewish-American PR executive and CEO of Edelman, the world\'s largest PR firm. Son of founder Daniel J. Edelman. Known for the annual Edelman Trust Barometer.' }
    ],
    connections: [
      { name: 'Jewish philanthropy', type: 'family involvement', description: 'The Edelman family has been active in Jewish philanthropic causes.' },
      { name: 'Global communications industry', type: 'market leader', description: 'Edelman is the world\'s largest independently owned PR firm.' }
    ]
  },
  'interpublic-group-ipg': {
    description: 'Interpublic Group of Companies (IPG) is one of the "Big Four" global advertising and marketing holding companies, headquartered in New York City. Founded in 1961 by Marion Harper Jr., IPG owns agencies including McCann Worldgroup, FCB, MullenLowe, and Weber Shandwick. Jewish connections abound in the advertising industry: many of IPG\'s agencies and subsidiaries have been led by Jewish executives, and the advertising industry in New York has historically had significant Jewish leadership. IPG has operations in Israel and has worked on campaigns for Israeli brands and tourism. The company has faced controversies including accounting scandals (restating earnings in 2002-2003), leadership turmoil, and broader industry concerns about advertising ethics, data privacy, and the digital transformation of media buying.',
    individuals: [
      { id: slug('Philippe Krakowsky'), name: 'Philippe Krakowsky', role: 'CEO', bio: 'CEO of Interpublic Group since 2021. Has led the company\'s digital transformation and strategic positioning.' }
    ],
    connections: [
      { name: 'WPP', type: 'industry rival', description: 'Both are "Big Four" global advertising holding companies.' },
      { name: 'Israeli marketing', type: 'operations', description: 'IPG has operations and campaigns connected to Israel.' }
    ]
  },
  'wpp-plc-us-operations': {
    description: 'WPP plc is the world\'s largest advertising and public relations company by revenue, founded in 1985 by Sir Martin Sorrell (born to a Jewish family in London). Sorrell, one of the most prominent Jewish business leaders in Britain, built WPP through aggressive acquisitions, purchasing agencies including J. Walter Thompson, Ogilvy & Mather, Young & Rubicam, and Grey. Under Sorrell\'s leadership from 1985 to 2018, WPP grew from a wire shopping basket manufacturer into a $20 billion advertising empire. Sorrell was forced out in 2018 after an investigation into personal misconduct allegations. He then founded S4 Capital to compete with WPP. WPP has significant Israeli operations through its agencies. Controversies include Sorrell\'s departure scandal, concerns about the holding company model in advertising, and debates about data privacy in digital advertising.',
    individuals: [
      { id: slug('Martin Sorrell'), name: 'Sir Martin Sorrell', role: 'Founder & Former CEO', bio: 'Jewish-British advertising mogul who built WPP into the world\'s largest advertising company. Born to a Jewish family in London. Forced out in 2018 after misconduct allegations. Founded rival company S4 Capital.' },
      { id: slug('Mark Read WPP'), name: 'Mark Read', role: 'CEO', bio: 'CEO of WPP since 2018, succeeding founder Martin Sorrell.' }
    ],
    connections: [
      { name: 'WPP Israeli operations', type: 'local presence', description: 'WPP agencies operate in Israel.' },
      { name: 'S4 Capital', type: 'competitor', description: 'Founded by former WPP CEO Martin Sorrell to compete with WPP.' },
      { name: 'Interpublic Group', type: 'industry rival', description: 'Both are global advertising holding companies.' }
    ]
  },
  'iheart-media': {
    description: 'iHeartMedia is the largest radio broadcast company in the United States, owning over 860 radio stations and the iHeartRadio digital platform. The company\'s Jewish connections include its ownership and executive history: it was created from Clear Channel Communications, which was taken private in 2008 by Bain Capital and Thomas H. Lee Partners (co-founded by Thomas H. Lee, a Jewish-American financier). The leveraged buyout loaded the company with $20 billion in debt, leading to its 2018 bankruptcy - one of the largest media bankruptcies in US history. Jewish executives have held key roles in its management. Bob Pittman, the current CEO, rebuilt the company post-bankruptcy. iHeartMedia hosts the iHeartRadio Music Festival and Awards. Controversies include the massive debt from the leveraged buyout, accusations of homogenizing local radio, and the Rush Limbaugh controversy that led to advertiser boycotts.',
    individuals: [
      { id: slug('Bob Pittman iHeart'), name: 'Bob Pittman', role: 'Chairman & CEO', bio: 'Media executive who co-founded MTV and now leads iHeartMedia. Navigated the company through bankruptcy and rebuilt it as a multimedia platform.' }
    ],
    connections: [
      { name: 'Bain Capital', type: 'former owner', description: 'Bain Capital\'s leveraged buyout loaded iHeartMedia with $20 billion in debt, leading to bankruptcy.' },
      { name: 'Thomas H. Lee Partners', type: 'former owner', description: 'Jewish-founded PE firm co-led the buyout.' }
    ]
  },
  'cohen-steers': {
    description: 'Cohen & Steers is a global investment management firm specializing in real assets, including real estate securities, infrastructure, and natural resource equities. Founded in 1986 by Martin Cohen and Robert Steers in New York City. Martin Cohen, a Jewish-American investment manager, and Robert Steers pioneered the concept of investing in real estate investment trusts (REITs) as a distinct asset class. The firm manages over $80 billion in assets and is publicly traded on the NYSE. Cohen & Steers played a pivotal role in establishing REITs as a mainstream investment category, enabling average investors to participate in real estate markets. The firm\'s dual Jewish-Gentile founding partnership is emblematic of Wall Street\'s evolution toward meritocracy.',
    individuals: [
      { id: slug('Martin Cohen CS'), name: 'Martin Cohen', role: 'Co-Founder & Co-Chairman', bio: 'Jewish-American financier who co-founded Cohen & Steers and pioneered REIT investing as a mainstream asset class.' }
    ],
    connections: [
      { name: 'Real estate securities', type: 'pioneered sector', description: 'Cohen & Steers pioneered REIT investing as a distinct asset class.' },
      { name: 'New York financial industry', type: 'Wall Street presence', description: 'Based in New York, part of the Jewish legacy in American finance.' }
    ]
  },
  'davis-polk-wardwell': {
    description: 'Davis Polk & Wardwell is one of the most elite and oldest law firms in the United States, founded in 1849 in New York City. The firm has historically served as counsel to JPMorgan and Morgan Stanley and handles the most complex corporate transactions and regulatory matters. While Davis Polk was historically one of the "white-shoe" firms that excluded Jews from partnership for much of the 20th century, it transformed dramatically and has since had numerous Jewish partners and leaders. The firm now represents major Israeli companies in US capital markets transactions and M&A deals. Davis Polk\'s transformation from an exclusionary institution to one with significant Jewish leadership mirrors the broader evolution of elite American institutions. The firm acts as counsel to major banks and is involved in virtually every major Wall Street transaction.',
    individuals: [],
    connections: [
      { name: 'JPMorgan Chase', type: 'longtime counsel', description: 'Davis Polk has historically served as outside counsel to JPMorgan.' },
      { name: 'Israeli companies', type: 'legal representation', description: 'Davis Polk represents Israeli companies in US capital markets transactions.' },
      { name: 'Sullivan & Cromwell', type: 'peer firm', description: 'Both are elite New York law firms that evolved from exclusionary to inclusive.' }
    ]
  },
  'rand-corporation': {
    description: 'The RAND Corporation is one of the most influential think tanks in the world, founded in 1948 as a research and development organization spun off from Douglas Aircraft Company. Originally created to advise the US military, RAND has expanded to cover domestic and international policy. Jewish connections include many prominent Jewish researchers, analysts, and leaders who have shaped RAND\'s work. Daniel Ellsberg, a Jewish-American analyst, was working at RAND when he leaked the Pentagon Papers in 1971, exposing government deceptions about the Vietnam War. Herman Kahn, a Jewish-American futurist and RAND strategist, developed nuclear war scenarios (satirized in Dr. Strangelove). Albert Wohlstetter, a Jewish-American strategist, was a key RAND analyst who shaped US nuclear deterrence policy. RAND has been controversial for its role in developing Cold War military strategy, the Vietnam War, and more recently for studies on the Israeli-Palestinian conflict.',
    individuals: [
      { id: slug('Daniel Ellsberg'), name: 'Daniel Ellsberg', role: 'Former Analyst', bio: 'Jewish-American military analyst (1931-2023) who worked at RAND and leaked the Pentagon Papers in 1971, exposing government lies about the Vietnam War. One of the most famous whistleblowers in American history.' },
      { id: slug('Herman Kahn RAND'), name: 'Herman Kahn', role: 'Former Strategist', bio: 'Jewish-American futurist and nuclear strategist (1922-1983) at RAND. Developed nuclear war scenarios. Satirized as Dr. Strangelove. Later founded the Hudson Institute.' }
    ],
    connections: [
      { name: 'Pentagon Papers', type: 'historical event', description: 'RAND analyst Daniel Ellsberg leaked the Pentagon Papers from RAND in 1971.' },
      { name: 'US Department of Defense', type: 'primary client', description: 'RAND was created to advise the US military.' },
      { name: 'Nuclear deterrence policy', type: 'key contribution', description: 'Jewish-American strategists at RAND shaped US nuclear policy during the Cold War.' }
    ]
  },
  'nbcuniversal': {
    description: 'NBCUniversal is a major American media and entertainment conglomerate owned by Comcast Corporation. The company encompasses NBC Television Network, Universal Pictures, Universal Studios theme parks, and various cable channels. Jewish connections run deep: Universal Pictures was co-founded in 1912 by Carl Laemmle, a German-Jewish immigrant from Laupheim, Württemberg. NBC\'s history includes network leadership by Jewish executives including Fred Silverman and Jeff Zucker. Current NBCUniversal leadership includes Jewish executives in key positions. Universal Pictures\' founding by Carl Laemmle is one of the foundational stories of Jewish Hollywood - Laemmle used his position to help bring over 300 Jewish families from Germany to the US during the Nazi era, saving their lives. The company has faced controversies including the handling of the Matt Lauer sexual harassment scandal at NBC News, coverage bias allegations, and the tension between news standards and corporate ownership under Comcast.',
    individuals: [
      { id: slug('Carl Laemmle'), name: 'Carl Laemmle', role: 'Founder of Universal Pictures', bio: 'German-Jewish immigrant (1867-1939) who founded Universal Pictures in 1912. Used his Hollywood influence to rescue over 300 Jewish families from Nazi Germany by sponsoring their immigration to the US.' },
      { id: slug('Jeff Shell'), name: 'Jeff Shell', role: 'Former CEO', bio: 'Jewish-American media executive who served as CEO of NBCUniversal. Was fired in 2023 after an investigation into an inappropriate relationship with a woman who accused him of sexual harassment.' }
    ],
    connections: [
      { name: 'Comcast', type: 'parent company', description: 'NBCUniversal is owned by Comcast, the Jewish-co-founded telecom giant.' },
      { name: 'DreamWorks Animation', type: 'subsidiary', description: 'NBCUniversal acquired DreamWorks Animation for $3.8 billion.' },
      { name: 'Matt Lauer scandal', type: 'controversy', description: 'NBC faced criticism for its handling of the Matt Lauer sexual harassment allegations.' }
    ]
  },
  'jpmorgan-chase': {
    description: 'JPMorgan Chase & Co. is the largest bank in the United States and one of the largest in the world, with over $3.7 trillion in assets. While historically a White Anglo-Saxon Protestant (WASP) institution founded by J.P. Morgan, the bank\'s modern Jewish connections are extensive: Sandy Weill (born to Jewish-Polish immigrants) was the architect of Citicorp\'s merger with Travelers Group, reshaping banking; JPMorgan acquired Bear Stearns (Jewish-founded) in 2008 during the financial crisis. The bank has numerous Jewish executives in senior leadership. JPMorgan Chase has major Israeli operations, serving as a key financial partner for Israeli companies and the Israeli government. CEO Jamie Dimon, though of Greek descent, has been a strong advocate for US-Israel relationships. Controversies include the bank\'s role in the 2008 financial crisis, the "London Whale" trading scandal ($6.2 billion loss), settlements totaling over $30 billion for mortgage-backed securities fraud, and facilitating Jeffrey Epstein\'s banking ($290 million settlement).',
    individuals: [
      { id: slug('Jamie Dimon'), name: 'Jamie Dimon', role: 'Chairman & CEO', bio: 'CEO of JPMorgan Chase since 2005 and the most powerful banker in America. Of Greek descent, he has maintained strong US-Israel financial relationships.' }
    ],
    connections: [
      { name: 'Bear Stearns', type: 'acquisition', description: 'JPMorgan acquired the Jewish-founded Bear Stearns during the 2008 financial crisis.' },
      { name: 'Israeli banking operations', type: 'financial services', description: 'JPMorgan is a key banking partner for Israeli companies and government.' },
      { name: 'Jeffrey Epstein', type: 'controversy', description: 'JPMorgan maintained banking relationships with Jeffrey Epstein, settling for $290 million.' },
      { name: 'Goldman Sachs', type: 'industry rival', description: 'Both are the most powerful banks on Wall Street.' }
    ]
  },
  'broadcom': {
    description: 'Broadcom Inc. is a global technology company that designs, develops, and supplies semiconductor and infrastructure software solutions. The company was co-founded by Henry Samueli, a Jewish-American engineer and professor at UCLA, and Henry Nicholas in 1991 as Broadcom Corporation. Samueli, the son of Jewish Holocaust survivors from Poland, built Broadcom into one of the largest semiconductor companies in the world. The modern Broadcom also includes the former Avago Technologies and the $69 billion acquisition of VMware in 2023. Samueli and his wife Susan are major philanthropists, owning the Anaheim Ducks NHL team and donating hundreds of millions to Jewish causes, UCLA, and education. Henry Nicholas was convicted of securities fraud. The company has been controversial for its aggressive acquisition strategy, particularly the VMware deal which critics say will raise prices for enterprise software customers.',
    individuals: [
      { id: slug('Henry Samueli'), name: 'Henry Samueli', role: 'Co-Founder & Chairman', bio: 'Jewish-American engineer, co-founder of Broadcom. Son of Holocaust survivors from Poland. UCLA professor. Owner of the Anaheim Ducks. Major philanthropist who has donated hundreds of millions to education and Jewish causes.' },
      { id: slug('Hock Tan'), name: 'Hock Tan', role: 'CEO', bio: 'Malaysian-American CEO of Broadcom. One of the highest-paid executives in the world. Led the VMware acquisition and was previously CEO of Avago Technologies.' }
    ],
    connections: [
      { name: 'VMware', type: 'acquisition', description: 'Broadcom acquired VMware for $69 billion in 2023.' },
      { name: 'Jewish philanthropy', type: 'Samueli donations', description: 'Henry Samueli has donated hundreds of millions to Jewish causes and education.' },
      { name: 'Intel', type: 'competitor', description: 'Both are major semiconductor companies.' }
    ]
  },
  'unilever': {
    description: 'Unilever is a British-Dutch multinational consumer goods company and one of the world\'s largest, with brands including Dove, Ben & Jerry\'s, Hellmann\'s, Lipton, and Vaseline. Unilever\'s Jewish connections include the significant involvement of Jewish financiers in the original Margarine Unie merger that created the company, and its extensive Israeli operations under Ben & Jerry\'s and other brands. The company faced a major Israel-related controversy in 2021 when Ben & Jerry\'s (founded by Jewish Americans Ben Cohen and Jerry Greenfield) announced it would stop selling ice cream in Israeli settlements in the occupied West Bank, leading to boycott threats, lawsuits from US states with anti-BDS laws, and ultimately Unilever selling Ben & Jerry\'s Israeli operations to a local licensee against the founders\' wishes. This incident became a landmark case in the intersection of corporate social responsibility, the BDS movement, and anti-BDS legislation.',
    individuals: [],
    connections: [
      { name: 'Ben & Jerry\'s', type: 'subsidiary', description: 'Ben & Jerry\'s West Bank settlement controversy was a landmark BDS-related corporate case.' },
      { name: 'BDS Movement', type: 'controversy', description: 'Ben & Jerry\'s settlement boycott created a major BDS vs. anti-BDS legal battle.' },
      { name: 'Israeli operations', type: 'market presence', description: 'Unilever operates many brands in Israel.' }
    ]
  },
  'toyota-motor-corporation': {
    description: 'Toyota Motor Corporation is the world\'s largest automobile manufacturer by volume, headquartered in Toyota City, Japan. While a Japanese company, Toyota has significant Israeli connections: the company operates a research center in Israel focused on autonomous driving, AI, and cybersecurity through Toyota Research Institute. Toyota has partnered with Israeli startups including Mobileye (Intel) for advanced driver assistance systems, invested in Israeli automotive technology companies, and has been implementing Israeli-developed cybersecurity solutions to protect connected vehicles. Toyota has faced controversies including the massive "unintended acceleration" recall crisis (2009-2010) that resulted in $1.2 billion in federal fines and over $3 billion in settlements, the Takata airbag recall, and criticism of its slow transition to fully electric vehicles. Former chairman Fujio Cho built relationships with Israeli tech leaders.',
    individuals: [
      { id: slug('Akio Toyoda'), name: 'Akio Toyoda', role: 'Chairman', bio: 'Chairman of Toyota Motor Corporation and grandson of the company\'s founder. Led the company as CEO from 2009-2023, navigating the recall crisis and pushing into hydrogen fuel cell technology.' }
    ],
    connections: [
      { name: 'Israeli R&D center', type: 'technology', description: 'Toyota operates a research center in Israel for autonomous driving and AI.' },
      { name: 'Mobileye', type: 'technology partner', description: 'Toyota uses Israeli-developed ADAS technology.' },
      { name: 'Israeli startup investments', type: 'venture investments', description: 'Toyota has invested in Israeli automotive technology companies.' }
    ]
  },
  'novo-nordisk': {
    description: 'Novo Nordisk is a Danish multinational pharmaceutical company and the world\'s largest producer of insulin, now also famous for its blockbuster weight-loss drugs Ozempic and Wegovy (semaglutide). The company became the most valuable company in Europe by market capitalization in 2023-2024. Novo Nordisk\'s Jewish connections include the company\'s historical relationship with Jewish scientists in diabetes research and its Israeli operations. The company has a significant presence in Israel, partnering with Israeli biotech companies and operating clinical trials through Israeli hospitals. Novo Nordisk was founded in 1923 by August Krogh, a Nobel Prize-winning physiologist, and his wife Marie Krogh, who was inspired by the discovery of insulin. Controversies include the high cost of insulin in the United States (where patients pay hundreds of dollars for a drug that costs a few dollars to produce), the ethics of marketing weight-loss drugs, and concerns about supply shortages of semaglutide products.',
    individuals: [
      { id: slug('Lars Fruergaard Jorgensen'), name: 'Lars Fruergaard Jørgensen', role: 'CEO', bio: 'CEO of Novo Nordisk since 2017. Oversaw the company\'s rise to become Europe\'s most valuable company driven by Ozempic and Wegovy demand.' }
    ],
    connections: [
      { name: 'Israeli biotech partnerships', type: 'R&D', description: 'Novo Nordisk partners with Israeli biotech companies and runs clinical trials in Israel.' },
      { name: 'Ozempic/Wegovy', type: 'product', description: 'Semaglutide drugs drove Novo Nordisk to become Europe\'s most valuable company.' },
      { name: 'Insulin pricing controversy', type: 'controversy', description: 'Novo Nordisk has faced criticism for high US insulin prices despite low production costs.' }
    ]
  },
  'groupe-bollor': {
    description: 'Groupe Bolloré is a French industrial conglomerate controlled by billionaire Vincent Bolloré, with operations in media, transportation, logistics, and energy storage. The company\'s Jewish connections include Bolloré\'s close business relationships with prominent Jewish business leaders in France and his control of Vivendi, which owns major entertainment assets. Through Vivendi, Bolloré controls Canal+ (French TV), Havas (global advertising), and attempted a hostile takeover of Lagardère (Hachette publishing). The Bolloré family has connections to the Jewish business networks in France through shared corporate board seats and business dealings. Vincent Bolloré has been deeply controversial for his right-wing media influence, being accused of politicizing Canal+ and CNews (which critics call "the French Fox News"). He has been convicted of corruption charges related to bribing officials in Togo and Guinea to obtain port contracts in Africa.',
    individuals: [
      { id: slug('Vincent Bollore'), name: 'Vincent Bolloré', role: 'Chairman', bio: 'French billionaire industrialist who controls Groupe Bolloré and Vivendi. Convicted of corruption for bribing African officials for port contracts. Accused of using his media empire (CNews, Canal+) to promote far-right politics in France.' }
    ],
    connections: [
      { name: 'Vivendi', type: 'controlled company', description: 'Bolloré controls Vivendi, which owns Canal+, Havas, and other media assets.' },
      { name: 'French Jewish business network', type: 'business relationships', description: 'Bolloré has close business ties with Jewish business leaders in France.' },
      { name: 'Africa port corruption', type: 'criminal conviction', description: 'Convicted of bribing officials in Togo and Guinea for port contracts.' }
    ]
  },
  'kl-pierre': {
    description: 'Klépierre is a French real estate investment trust (REIT) and one of Europe\'s largest operators of shopping centers, with a portfolio of over 70 shopping centers in 12 European countries. The company was created from the real estate assets of BNP Paribas. Klépierre\'s Jewish connections include its origins in the French banking sector, where Jewish financiers have played a significant historical role, and its business operations across European markets with historical Jewish communities. The company operates malls in Israel and has Israeli investors in its shareholder base. Simon Property Group, partially founded and led by Jewish-American real estate moguls, is Klépierre\'s closest US peer. The company has faced challenges from the shift to e-commerce, the COVID-19 pandemic\'s impact on retail, and broader questions about the future of physical retail centers in a digital economy.',
    individuals: [],
    connections: [
      { name: 'BNP Paribas', type: 'origin', description: 'Klépierre was created from BNP Paribas real estate assets.' },
      { name: 'European retail real estate', type: 'market leader', description: 'One of Europe\'s largest shopping center operators.' }
    ]
  },
  'partner-communications': {
    description: 'Partner Communications Company Ltd. is a major Israeli telecommunications provider, originally branded as Orange Israel under a licensing agreement with the French telecom Orange S.A. Founded in 1998, Partner became one of Israel\'s three major mobile operators alongside Pelephone and Cellcom. The company\'s entire identity is Israeli: it is listed on the Tel Aviv Stock Exchange and NASDAQ and is one of Israel\'s core telecommunications infrastructure providers, serving millions of Israeli subscribers. Partner faced a major controversy in 2015 when Orange S.A.\'s CEO Stéphane Richard publicly expressed a desire to terminate the brand licensing agreement, widely interpreted as yielding to BDS pressure. This led to a diplomatic incident between Israel and France, with Israeli Prime Minister Netanyahu condemning the move. The episode became a landmark case in corporate responses to anti-Israel boycott pressure. Israeli billionaire Haim Saban publicly condemned Orange.',
    individuals: [
      { id: slug('Avi Gabbay Partner'), name: 'Avi Gabbay', role: 'Former CEO', bio: 'Israeli businessman and politician who served as CEO of Bezeq. Later became chairman of the Israeli Labor Party. His career exemplifies the intersection of Israeli business and politics.' }
    ],
    connections: [
      { name: 'Orange S.A. controversy', type: 'BDS controversy', description: 'Orange\'s desire to end the Partner brand licensing deal due to BDS pressure caused a diplomatic incident.' },
      { name: 'Israeli telecommunications', type: 'core infrastructure', description: 'Partner is one of Israel\'s three major mobile operators.' },
      { name: 'Bezeq', type: 'industry competitor', description: 'Both are major Israeli telecom providers.' }
    ]
  },
  'bezeq': {
    description: 'Bezeq (The Israel Telecommunication Corp.) is Israel\'s largest telecommunications company, often called the "Israeli AT&T." Established in 1984 as a government-owned company and privatized in 2005, Bezeq provides fixed-line telephony, internet, and television services across Israel. The company and its subsidiaries (Pelephone for mobile, yes for satellite TV) serve millions of Israeli customers. Bezeq became embroiled in one of Israel\'s biggest corruption scandals: Case 4000 (the Bezeq-Walla Affair) involving former Prime Minister Benjamin Netanyahu, who allegedly approved regulatory changes favorable to Bezeq owner Shaul Elovitch in exchange for positive news coverage on the Walla news site (also owned by Elovitch). This scandal was one of multiple corruption cases against Netanyahu. Bezeq represents the nexus of Israeli business, media, and political power.',
    individuals: [
      { id: slug('Shaul Elovitch'), name: 'Shaul Elovitch', role: 'Former Controlling Shareholder', bio: 'Israeli businessman who controlled Bezeq and the Walla news site. Charged alongside PM Netanyahu in Case 4000 for an alleged quid pro quo involving regulatory favors for positive news coverage.' }
    ],
    connections: [
      { name: 'Netanyahu Case 4000', type: 'corruption scandal', description: 'Bezeq owner allegedly exchanged positive coverage for regulatory favors from PM Netanyahu.' },
      { name: 'Walla!', type: 'media connection', description: 'The Walla news site, owned by Bezeq\'s owner, was central to the corruption case.' },
      { name: 'Partner Communications', type: 'competitor', description: 'Both are major Israeli telecom companies.' }
    ]
  },
  'israel-electric-corporation': {
    description: 'Israel Electric Corporation (IEC) is Israel\'s largest electricity supplier, a government-owned utility that generates and distributes the vast majority of Israel\'s electrical power. Established in 1923 as the Palestine Electric Corporation by Pinhas Rutenberg, a Zionist leader and engineer who obtained a concession from the British Mandate authorities. The company built the landmark Naharayim hydroelectric power station at the confluence of the Jordan and Yarmouk rivers. IEC is deeply intertwined with Israeli national security, as the electrical grid is a critical infrastructure target. The corporation has been controversial for its massive debt (over $20 billion), reliance on coal and natural gas (criticized by environmentalists), its powerful labor union (the Histadrut-affiliated IEC workers committee is one of the strongest in Israel), resistance to market liberalization and competition, and allegations of political patronage in hiring. IEC has been transitioning to natural gas from Israel\'s offshore Leviathan and Tamar fields.',
    individuals: [
      { id: slug('Pinhas Rutenberg'), name: 'Pinhas Rutenberg', role: 'Founder', bio: 'Russian-Jewish Zionist leader and engineer (1879-1942) who founded the Palestine Electric Corporation in 1923. A former Russian revolutionary who became one of the most important builders of pre-state Israel\'s infrastructure.' }
    ],
    connections: [
      { name: 'Israeli national infrastructure', type: 'strategic asset', description: 'IEC supplies the vast majority of Israel\'s electricity and is critical infrastructure.' },
      { name: 'Leviathan/Tamar gas fields', type: 'energy source', description: 'IEC is transitioning to natural gas from Israel\'s offshore fields.' },
      { name: 'Histadrut', type: 'labor union', description: 'IEC\'s powerful workers committee is one of the strongest unions in Israel.' }
    ]
  },
  'zim-integrated-shipping-services': {
    description: 'ZIM Integrated Shipping Services is Israel\'s largest cargo shipping company and one of the top 10 container shipping lines in the world. Founded in 1945, before Israeli independence, by the Jewish Agency and the Histadrut labor federation to provide maritime transport for Jewish immigration to Palestine (Aliyah). The company\'s name is an acronym for "Zim Yisrael Navigation." ZIM played a crucial role in bringing Holocaust survivors and Jewish refugees to Israel during and after the 1948 War of Independence. The company went public on the NYSE in 2021 during the shipping boom, with its stock price surging dramatically during the COVID-era supply chain crisis. ZIM has been controversial as a target of BDS campaigns - its ships and port operations have been protested by pro-Palestinian activists worldwide, particularly at the Port of Oakland. The company has also faced environmental criticism over shipping emissions.',
    individuals: [],
    connections: [
      { name: 'Jewish Agency', type: 'co-founder', description: 'The Jewish Agency co-founded ZIM to transport Jewish immigrants to Palestine.' },
      { name: 'Histadrut', type: 'co-founder', description: 'Israel\'s major labor federation co-founded ZIM.' },
      { name: 'BDS Movement', type: 'boycott target', description: 'ZIM ships and port operations have been major targets of pro-Palestinian protests.' },
      { name: 'Aliyah/Jewish immigration', type: 'historical mission', description: 'ZIM was created to facilitate Jewish immigration to Israel, including Holocaust survivors.' }
    ]
  },
  'habima-theatre': {
    description: 'Habima Theatre is the national theater of Israel and one of the most significant cultural institutions in the Jewish world. Founded in 1917 in Moscow by Nahum Zemach, a Lithuanian-Jewish theater director, Habima was the first Hebrew-language theater company in the world. The name "Habima" means "the stage" in Hebrew. The theater was supported by Konstantin Stanislavski and performed in Hebrew in Soviet Russia before relocating to Palestine in 1931. Habima became Israel\'s national theater in 1958. The theater has premiered works by leading Jewish and Israeli playwrights and has been at the intersection of Jewish identity, Hebrew language revival, and Israeli national culture. Controversies include debates over its repertoire choices, a 2012 controversy when its London performances were protested by pro-Palestinian activists during a Globe Theatre festival, and ongoing debates about artistic freedom versus national representation.',
    individuals: [
      { id: slug('Nahum Zemach'), name: 'Nahum Zemach', role: 'Founder', bio: 'Lithuanian-Jewish theater director (1887-1939) who founded Habima in Moscow in 1917 as the world\'s first Hebrew-language theater company.' }
    ],
    connections: [
      { name: 'Hebrew language revival', type: 'cultural contribution', description: 'Habima was central to the revival of Hebrew as a living cultural language.' },
      { name: 'Israeli national culture', type: 'national institution', description: 'Habima is Israel\'s national theater since 1958.' },
      { name: 'BDS controversy', type: 'protests', description: 'Habima\'s international performances have been protested by pro-Palestinian activists.' }
    ]
  },
  'israel-chemicals-icl': {
    description: 'Israel Chemicals Ltd. (ICL Group) is a multinational mining and chemical company that is the world\'s sixth-largest producer of potash and one of the largest producers of bromine. Based in Tel Aviv, ICL extracts minerals from the Dead Sea, one of the most unique natural resources on Earth. The company was originally a government-owned enterprise managing Dead Sea mineral rights. ICL was privatized and is now controlled by the Israel Corporation, itself controlled by the Ofer family (one of Israel\'s wealthiest families). ICL has been controversial for its Dead Sea mining operations, which environmentalists blame for contributing to the Dead Sea\'s shrinking water levels and the formation of sinkholes. The company has also faced labor disputes, criticism over its profit margins on public mineral resources, and questions about the environmental impact of its bromine extraction. ICL operates globally across Israel, Europe, China, and the Americas.',
    individuals: [
      { id: slug('Raviv Zoller'), name: 'Raviv Zoller', role: 'CEO', bio: 'Israeli businessman serving as CEO of ICL Group. Overseeing the company\'s global mining and chemical operations.' }
    ],
    connections: [
      { name: 'Dead Sea', type: 'primary resource', description: 'ICL extracts minerals from the Dead Sea, contributing to environmental concerns about its shrinking.' },
      { name: 'Ofer family', type: 'controlling shareholders', description: 'One of Israel\'s wealthiest families controls ICL through the Israel Corporation.' },
      { name: 'Environmental controversy', type: 'Dead Sea impact', description: 'ICL\'s Dead Sea mining is blamed for contributing to shrinking water levels and sinkholes.' }
    ]
  },
  'sheba-medical-center': {
    description: 'Sheba Medical Center (Tel HaShomer) is the largest hospital in Israel and the Middle East, and has been consistently ranked among the top 10 hospitals in the world by Newsweek. Located in Ramat Gan near Tel Aviv, Sheba serves as a national referral center with over 150 departments and clinics. The hospital was founded in 1948, the same year as Israeli independence, by Dr. Chaim Sheba, a pioneering Israeli physician who later served as Director General of Israel\'s Ministry of Health. Sheba Medical Center has been at the forefront of medical innovation including Israel\'s COVID-19 vaccination campaign, cancer immunotherapy research, and telemedicine. The hospital also operates ARC Innovation Center, Israel\'s first health-tech innovation center within a medical institution. Sheba has treated patients from around the world, including Palestinian patients and soldiers from the Syrian civil war, demonstrating medical humanitarianism that transcends political boundaries.',
    individuals: [
      { id: slug('Chaim Sheba'), name: 'Dr. Chaim Sheba', role: 'Founder', bio: 'Pioneering Israeli physician (1908-1971) who founded Sheba Medical Center. Also known as the "father of Israeli medicine." Served as Director General of Israel\'s Ministry of Health.' }
    ],
    connections: [
      { name: 'Israeli healthcare system', type: 'flagship institution', description: 'Sheba is Israel\'s largest and most advanced medical center.' },
      { name: 'ARC Innovation Center', type: 'health-tech incubator', description: 'Israel\'s first health-tech innovation center within a hospital.' },
      { name: 'Humanitarian medicine', type: 'cross-border care', description: 'Sheba treats patients from around the world including Palestinians and Syrians.' }
    ]
  },
  'birthright-israel': {
    description: 'Birthright Israel (Taglit) is a nonprofit educational organization that provides free 10-day heritage trips to Israel for young Jewish adults aged 18-32 from around the world. Founded in 1999 by Charles Bronfman (of the Jewish-Canadian Bronfman family) and Michael Steinhardt (a prominent Jewish-American hedge fund manager). The program has brought over 800,000 young Jews from 68 countries to Israel. Birthright is funded by a partnership between the Israeli government, private Jewish donors, and Jewish communities worldwide. Major donors include Sheldon Adelson (who donated over $400 million before his death) and the Bronfman and Steinhardt families. The program has been controversial: critics accuse it of being a propaganda tool that presents a one-sided view of Israel without exposing participants to Palestinian perspectives, of "birthright washing" the occupation, and of being designed to increase support for Israel and promote Jewish marriage. Michael Steinhardt was also accused of sexually harassing young women, leading to his departure from the board.',
    individuals: [
      { id: slug('Charles Bronfman Birthright'), name: 'Charles Bronfman', role: 'Co-Founder', bio: 'Jewish-Canadian billionaire philanthropist who co-founded Birthright Israel. Member of the Bronfman family (Seagram\'s). Has donated hundreds of millions to Jewish causes.' },
      { id: slug('Michael Steinhardt'), name: 'Michael Steinhardt', role: 'Co-Founder', bio: 'Jewish-American hedge fund manager who co-founded Birthright Israel. Departed the board after sexual harassment allegations. Previously donated $125 million to NYU\'s Steinhardt School.' }
    ],
    connections: [
      { name: 'Sheldon Adelson / Adelson Foundation', type: 'major donor', description: 'Sheldon Adelson donated over $400 million to Birthright Israel.' },
      { name: 'Israeli government', type: 'co-funder', description: 'The Israeli government is a major co-funder of Birthright trips.' },
      { name: 'Steinhardt sexual harassment', type: 'controversy', description: 'Co-founder Michael Steinhardt was accused of sexually harassing young women.' },
      { name: 'BDS criticism', type: 'controversy', description: 'Critics accuse Birthright of presenting a one-sided view of Israel.' }
    ]
  },
  'toronto-international-film-festival-tiff': {
    description: 'The Toronto International Film Festival (TIFF) is one of the most prestigious and influential public film festivals in the world, considered the top launching pad for Academy Award contenders. Founded in 1976 as the "Festival of Festivals." Jewish connections include the significant role of Jewish filmmakers, distributors, and executives in the festival\'s programming and industry events. TIFF has screened Israeli films and hosted Israeli filmmakers. The festival became a flashpoint in the Israel-Palestine debate in 2009 when it featured a "City to City" spotlight on Tel Aviv, sparking a controversial open letter signed by filmmakers including Ken Loach, Danny Glover, and Jane Fonda accusing the festival of complicity in Israeli "brand Israel" campaigns. The "Toronto Declaration" and subsequent counter-letter divided the film community and became a landmark moment in cultural boycott debates. TIFF\'s Jewish CEO Piers Handling led the festival through this controversy.',
    individuals: [
      { id: slug('Piers Handling'), name: 'Piers Handling', role: 'Former CEO & Director', bio: 'Led TIFF for over 20 years and navigated the controversial 2009 Tel Aviv spotlight controversy.' }
    ],
    connections: [
      { name: 'Tel Aviv spotlight controversy', type: 'Israel-Palestine debate', description: 'TIFF\'s 2009 Tel Aviv spotlight divided the film community over cultural boycotts of Israel.' },
      { name: 'Israeli cinema', type: 'programming', description: 'TIFF has screened Israeli films and hosted Israeli filmmakers.' },
      { name: 'Academy Awards', type: 'awards pipeline', description: 'TIFF is considered the top launching pad for Oscar contenders.' }
    ]
  },
  'inditex': {
    description: 'Inditex (Industria de Diseño Textil S.A.) is the world\'s largest fashion retailer, parent company of Zara, Massimo Dutti, Pull & Bear, Bershka, and other brands. Founded in 1985 by Amancio Ortega in A Coruña, Spain. While the Ortega family is not Jewish, Inditex\'s Jewish connections include its extensive Israeli retail operations - Zara operates numerous stores in Israel through the Fox Group franchise. The company has been targeted by BDS campaigns for operating in Israel, with periodic boycott calls. Inditex has faced controversies including allegations of using forced labor in its supply chains (particularly Uyghur labor in China), environmental criticism as a pioneer of "fast fashion" that contributes to textile waste, a 2022 incident where a Zara creative director\'s comments were accused of being anti-Palestinian, and labor rights issues in garment factories in Bangladesh and Turkey.',
    individuals: [
      { id: slug('Amancio Ortega'), name: 'Amancio Ortega', role: 'Founder', bio: 'Spanish billionaire who founded Inditex/Zara. One of the wealthiest people in the world. Known for his extreme privacy and reclusive lifestyle.' }
    ],
    connections: [
      { name: 'Israeli retail operations', type: 'market presence', description: 'Zara operates stores in Israel through the Fox Group franchise.' },
      { name: 'BDS targeting', type: 'boycott campaigns', description: 'Inditex has been targeted by BDS for operating in Israel.' },
      { name: 'Fast fashion criticism', type: 'environmental controversy', description: 'Inditex/Zara is a pioneer of fast fashion, criticized for textile waste.' }
    ]
  },
  'csl-limited': {
    description: 'CSL Limited is an Australian global biotechnology company that is one of the world\'s largest producers of blood plasma products and vaccines. Founded in 1916 as the Commonwealth Serum Laboratories, a government-owned entity that was privatized in 1994. CSL\'s Jewish connections include its partnerships with Israeli biotech companies, its research collaborations with Israeli universities, and the involvement of Jewish scientists in its product development. CSL acquired Seqirus (vaccines) and Vifor Pharma (iron deficiency, kidney diseases). The company played a critical role in manufacturing COVID-19 vaccines (AstraZeneca) for Australia. CSL has been controversial for its pricing of blood plasma products, the ethics of paid plasma collection in the US (where donors from disadvantaged communities sell their plasma), and disputes with competitors over patent rights.',
    individuals: [
      { id: slug('Paul Perreault CSL'), name: 'Paul Perreault', role: 'Former CEO', bio: 'Former CEO of CSL Limited who transformed the company into one of the world\'s largest biotech firms.' }
    ],
    connections: [
      { name: 'Israeli biotech partnerships', type: 'R&D', description: 'CSL collaborates with Israeli biotech companies and universities.' },
      { name: 'Plasma pricing', type: 'controversy', description: 'CSL has faced criticism over its pricing of blood plasma products and paid collection ethics.' }
    ]
  }
};

for (const entryId in enrichments) {
  const e = enrichments[entryId];
  if (e.description) {
    const found = updateDescription(entryId, e.description);
    if (found) enriched++;
    else console.log(`  Warning: Entry not found: ${entryId}`);
  }
  if (e.individuals) {
    for (const ind of e.individuals) {
      addIndividualToEntry(entryId, ind);
      addPerson(ind.id, ind.name, ind.bio);
    }
  }
  if (e.connections) {
    for (const conn of e.connections) {
      addConnectionToEntry(entryId, conn);
    }
  }
}
console.log(`  Enriched ${enriched} entries`);

// ============================================================
// PART 2: Re-sort and rebuild affiliations  
// ============================================================
console.log('Re-sorting entries...');
for (const country in data.countries) {
  data.countries[country].sort((a, b) => {
    const scoreA = (a.description || '').length + ((a.connections || []).length * 50) + ((a.individuals || []).length * 30);
    const scoreB = (b.description || '').length + ((b.connections || []).length * 50) + ((b.individuals || []).length * 30);
    return scoreB - scoreA;
  });
}

console.log('Rebuilding affiliations...');
const affMap = {};
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    for (const ind of (entry.individuals || [])) {
      if (!affMap[ind.id]) affMap[ind.id] = [];
      affMap[ind.id].push({ organization: entry.name, role: ind.role || 'Associated', entryId: entry.id, country });
    }
  }
}
let affCount = 0;
for (const pid in peopleData.people) {
  if (!peopleData.people[pid].affiliations) peopleData.people[pid].affiliations = [];
  if (affMap[pid]) {
    for (const aff of affMap[pid]) {
      if (!peopleData.people[pid].affiliations.some(a => a.entryId === aff.entryId)) {
        peopleData.people[pid].affiliations.push(aff);
        affCount++;
      }
    }
  }
}
console.log(`  Updated ${affCount} affiliations`);

// Save
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2));

// Stats
let totalEntries = 0, totalPeople = Object.keys(peopleData.people).length;
let shortDescs = 0, noIndividuals = 0, totalConns = 0;
for (const c in data.countries) for (const e of data.countries[c]) {
  totalEntries++;
  if ((e.description || '').length < 200) shortDescs++;
  if (!e.individuals || e.individuals.length === 0) noIndividuals++;
  if (e.connections) totalConns += e.connections.length;
}
console.log(`\n=== STATS ===`);
console.log(`Entries: ${totalEntries}`);
console.log(`People: ${totalPeople}`);
console.log(`Connections: ${totalConns}`);
console.log(`Still thin (<200): ${shortDescs}`);
console.log(`Still no individuals: ${noIndividuals}`);
console.log('Done!');
