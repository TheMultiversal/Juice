// expandData29.js - WAVE 2: Massive enrichment of remaining thin entries
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
function addEntry(country, entry) {
  if (!data.countries[country]) data.countries[country] = [];
  if (data.countries[country].some(e => e.id === entry.id)) return false;
  data.countries[country].push(entry);
  return true;
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
function updateDescription(entryId, newDesc) {
  for (const country in data.countries) {
    for (const entry of data.countries[country]) {
      if (entry.id === entryId) {
        entry.description = newDesc;
        return true;
      }
    }
  }
  return false;
}

console.log('Wave 2: Enriching remaining thin entries...');
let enriched = 0;

const enrichments = {
  'bear-stearns-historic': {
    description: 'Bear Stearns was a major global investment bank and brokerage that was one of the first casualties of the 2008 financial crisis. Founded in 1923 by Joseph Bear, Robert Stearns, and Harold Mayer, all Jewish businessmen, the firm grew into the fifth-largest US investment bank. Bear Stearns was known as a scrappy, entrepreneurial firm with deep Jewish roots - CEO Alan "Ace" Greenberg, who ran the firm for decades, was famous for his frugality and charitable giving to Jewish causes. His successor James Cayne was also Jewish. The firm collapsed in March 2008 after a run on its hedge funds exposed to subprime mortgages, and was acquired by JPMorgan Chase for just $10 per share (originally offered $2, later revised) in a deal facilitated by the Federal Reserve. At its peak, Bear Stearns had been valued at over $170 per share. The collapse wiped out employees\' life savings and marked the beginning of the broader financial crisis. Former Bear Stearns executive Warren Spector and hedge fund managers Ralph Cioffi and Matthew Tannin faced criminal charges (acquitted) for their roles in the collapse.',
    individuals: [
      { id: slug('Alan Greenberg'), name: 'Alan "Ace" Greenberg', role: 'Former CEO & Chairman', bio: 'Jewish-American financier who led Bear Stearns from 1978 to 1993 as CEO and until 2001 as chairman. Known for extreme frugality and demanding employees reuse paper clips. Major philanthropist to Jewish causes. Authored "Memos from the Chairman."' },
      { id: slug('James Cayne'), name: 'James Cayne', role: 'Former CEO', bio: 'Jewish-American banker who served as Bear Stearns CEO from 1993 to 2008, presiding over the firm\'s collapse. Criticized for playing bridge and golf during the crisis. His $1 billion stake in the firm was reduced to approximately $61 million in the JPMorgan deal.' }
    ],
    connections: [
      { name: 'JPMorgan Chase', type: 'acquirer', description: 'JPMorgan acquired Bear Stearns for $10/share during the 2008 financial crisis.' },
      { name: 'Lehman Brothers', type: 'peer collapse', description: 'Both Jewish-founded investment banks collapsed during the 2008 financial crisis.' },
      { name: 'Goldman Sachs', type: 'industry peer', description: 'Both were major Wall Street investment banks with Jewish founding histories.' }
    ]
  },
  'tesla': {
    description: 'Tesla, Inc. is the world\'s most valuable automaker, headquartered in Austin, Texas. Founded in 2003 by Martin Eberhard and Marc Tarpenning, the company became synonymous with CEO Elon Musk, who joined as chairman and lead investor in 2004. Tesla\'s Jewish connections include co-founder and original CEO Martin Eberhard, who is Jewish. Several key Tesla executives have Jewish backgrounds, including former CFO Deepak Ahuja and various board members. Musk himself has complex relationships with the Jewish community: he visited Auschwitz with Ben Shapiro in 2024, but has also amplified antisemitic conspiracy theories on his platform X (Twitter), endorsed an antisemitic post in 2023, and faced widespread backlash from Jewish organizations including the ADL. Tesla\'s Israeli connections include the use of Israeli-made components, partnerships with Israeli tech companies including Mobileye (formerly supplied Tesla\'s autopilot cameras), and Tesla\'s plans for Israeli operations. JB Straubel, the Jewish-American engineer who served as CTO, was instrumental in developing Tesla\'s battery technology.',
    individuals: [
      { id: slug('Elon Musk'), name: 'Elon Musk', role: 'CEO', bio: 'South African-born CEO of Tesla and SpaceX, and owner of X (Twitter). The world\'s wealthiest person. Has had a contentious relationship with the Jewish community, endorsing antisemitic content on X while also visiting Auschwitz. His companies have significant Israeli business relationships.' },
      { id: slug('Martin Eberhard'), name: 'Martin Eberhard', role: 'Co-Founder & Original CEO', bio: 'Jewish-American engineer who co-founded Tesla Motors in 2003 and served as its first CEO. Conceived the Tesla Roadster. Was later ousted from the company and sued Musk and Tesla (settled 2009).' },
      { id: slug('JB Straubel'), name: 'JB Straubel', role: 'Former CTO & Co-Founder', bio: 'Co-founder and CTO of Tesla from 2004 to 2019. Key architect of Tesla\'s battery technology and Gigafactory concept. Founded Redwood Materials for battery recycling.' }
    ],
    connections: [
      { name: 'Mobileye', type: 'former supplier', description: 'Israeli company Mobileye supplied Tesla\'s autopilot cameras until their partnership ended in 2016.' },
      { name: 'Anti-Defamation League', type: 'critic', description: 'ADL has criticized Elon Musk for amplifying antisemitic content on X/Twitter.' },
      { name: 'SpaceX', type: 'CEO overlap', description: 'Both led by Elon Musk.' }
    ]
  },
  'morgan-stanley': {
    description: 'Morgan Stanley is one of the world\'s largest investment banks and financial services companies, founded in 1935 by Henry Sturgis Morgan, Harold Stanley, and others after the Glass-Steagall Act forced the separation of commercial and investment banking from J.P. Morgan & Co. While not Jewish-founded, Morgan Stanley has had significant Jewish leadership: Robert Greenhill, a Jewish-American banker, built the firm\'s dominant mergers and acquisitions practice in the 1970s-80s. The firm\'s current chairman and CEO James Gorman was succeeded in 2024 by Ted Pick. Morgan Stanley has extensive Israeli operations with offices in Israel and has been a major underwriter of Israeli government bonds and corporate offerings. The firm was involved in the 2008 financial crisis and received $10 billion in TARP bailout funds (repaid). Morgan Stanley paid $3.2 billion to settle charges of misleading investors on mortgage-backed securities. The firm manages over $6 trillion in client assets.',
    individuals: [
      { id: slug('Ted Pick'), name: 'Ted Pick', role: 'CEO', bio: 'CEO of Morgan Stanley since January 2024. Previously headed the firm\'s institutional securities group.' },
      { id: slug('Robert Greenhill'), name: 'Robert Greenhill', role: 'Former President', bio: 'Jewish-American investment banker who built Morgan Stanley\'s preeminent M&A practice. Served as president. Later founded Greenhill & Co.' }
    ],
    connections: [
      { name: 'Goldman Sachs', type: 'primary rival', description: 'Morgan Stanley and Goldman Sachs are the world\'s two leading investment banks.' },
      { name: 'Israeli government bonds', type: 'underwriting', description: 'Morgan Stanley has been a major underwriter of Israeli government bonds.' },
      { name: 'JP Morgan', type: 'historical origin', description: 'Morgan Stanley was spun off from J.P. Morgan & Co. due to Glass-Steagall in 1935.' }
    ]
  },
  'snapple': {
    description: 'Snapple is an American beverage brand founded in 1972 as Unadulterated Food Products by Leonard Marsh, Hyman Golden, and Arnold Greenberg, three Jewish-American childhood friends from Brooklyn. The brand name combined "snappy" and "apple." Snapple became famous for its quirky marketing and "Real Facts" bottle cap trivia. The founders built the brand into a powerhouse that was sold to Quaker Oats in 1994 for $1.7 billion - considered one of the worst acquisitions in corporate history, as Quaker struggled to manage the brand and sold it to Triade Partners for just $300 million in 1997. Cadbury Schweppes later acquired Snapple, which is now owned by Keurig Dr Pepper. The three Jewish founders, who started by selling apple juice from their Brooklyn window, became symbols of entrepreneurial success.',
    individuals: [
      { id: slug('Leonard Marsh'), name: 'Leonard Marsh', role: 'Co-Founder', bio: 'Jewish-American entrepreneur who co-founded Snapple with childhood friends from Brooklyn. Sold the company for $1.7 billion in 1994.' },
      { id: slug('Hyman Golden'), name: 'Hyman Golden', role: 'Co-Founder', bio: 'Jewish-American entrepreneur who co-founded Snapple. Along with partners Marsh and Greenberg, built the brand from a Brooklyn juice business.' },
      { id: slug('Arnold Greenberg'), name: 'Arnold Greenberg', role: 'Co-Founder', bio: 'Jewish-American entrepreneur who co-founded Snapple with Leonard Marsh and Hyman Golden.' }
    ],
    connections: [
      { name: 'Keurig Dr Pepper', type: 'current owner', description: 'Snapple is currently owned by Keurig Dr Pepper after a series of acquisitions.' },
      { name: 'Quaker Oats', type: 'former owner', description: 'Quaker Oats\' $1.7 billion acquisition of Snapple in 1994 is considered one of the worst deals in corporate history.' }
    ]
  },
  'under-armour': {
    description: 'Under Armour is an American sports apparel and equipment company founded in 1996 by Kevin Plank. The company\'s Jewish connection comes primarily through its long-serving CEO, Patrik Frisk (2020-2022), and through significant Jewish executive and investor involvement. Under Armour\'s Israeli connections include a partnership with Israeli-based biomechanics company Motionize, and the company sells products extensively in Israel. Board members and executives with Jewish backgrounds have been involved in the company. Under Armour has faced corporate governance controversies: a 2019 Wall Street Journal investigation revealed executives regularly visited strip clubs on expense accounts, leading to cultural reforms. The SEC investigated the company for accounting practices related to revenue recognition (settled in 2021 for $9 million). Founder Kevin Plank faced criticism for praise of President Trump in 2017.',
    individuals: [
      { id: slug('Kevin Plank'), name: 'Kevin Plank', role: 'Founder & Executive Chairman', bio: 'Founder of Under Armour who started the company from his grandmother\'s basement. Returned as CEO in 2024 after previously stepping down.' },
      { id: slug('Stephanie Linnartz'), name: 'Stephanie Linnartz', role: 'Former CEO', bio: 'Served as Under Armour CEO in 2023 before departing after less than a year.' }
    ],
    connections: [
      { name: 'Israeli tech partnerships', type: 'business', description: 'Under Armour has partnered with Israeli biomechanics and sports technology companies.' },
      { name: 'Nike', type: 'industry rival', description: 'Major competitor in sportswear.' }
    ]
  },
  'shopify': {
    description: 'Shopify is a Canadian multinational e-commerce company headquartered in Ottawa, Ontario, providing an online platform for businesses to create stores and sell products. Founded in 2006 by Tobias Lütke, Daniel Weinand, and Scott Lake. Shopify\'s Jewish connections include its significant Israeli presence: the company acquired Nachman Helbrans\' Israeli logistics startup Return Logic, and operates with multiple Israeli engineering teams. Numerous Jewish entrepreneurs use Shopify as their primary e-commerce platform, and the company has Jewish members on its leadership team. Shopify powers over 4 million online stores worldwide and processed over $235 billion in gross merchandise volume in 2023. The company has faced controversies including criticism for hosting stores that sell controversial political merchandise, its decision to lay off 20% of staff in 2023, and debates about its environmental impact.',
    individuals: [
      { id: slug('Tobias Lutke'), name: 'Tobias Lütke', role: 'Co-Founder & CEO', bio: 'German-Canadian entrepreneur who co-founded Shopify in 2006 after trying to build an online snowboard store. Built it into the world\'s leading e-commerce platform.' }
    ],
    connections: [
      { name: 'Israeli tech acquisitions', type: 'R&D', description: 'Shopify has acquired Israeli startups and employs Israeli engineers.' },
      { name: 'Amazon', type: 'competitor/partner', description: 'Shopify competes with Amazon\'s marketplace while also integrating with it.' }
    ]
  },
  'neiman-marcus': {
    description: 'Neiman Marcus Group is an American chain of luxury department stores, founded in 1907 in Dallas, Texas by Herbert Marcus, his sister Carrie Marcus Neiman, and her husband Al Neiman - all Jewish. The store became synonymous with luxury retail and was known for its annual Christmas catalog featuring extravagant fantasy gifts (his and hers private jets, a million-dollar bathtub). The Marcus family ran the company for decades; Stanley Marcus, son of Herbert, became legendary in retail as "the Pope of Fashion." The company has been through multiple leveraged buyouts: TPG Capital and Warburg Pincus bought it in 2005, and Ares Management and Canadian Pension Plan Investment Board acquired it in 2013 for $6 billion, loading it with debt. Neiman Marcus filed for Chapter 11 bankruptcy in May 2020 during the COVID-19 pandemic, becoming one of the largest retail bankruptcies in US history. It emerged from bankruptcy in September 2020. The company has faced criticism over its private equity-driven debt load.',
    individuals: [
      { id: slug('Herbert Marcus'), name: 'Herbert Marcus', role: 'Co-Founder', bio: 'Jewish-American co-founder of Neiman Marcus in Dallas in 1907. Built the store into a symbol of American luxury retail.' },
      { id: slug('Stanley Marcus'), name: 'Stanley Marcus', role: 'Former President', bio: 'Jewish-American retail legend, son of founder Herbert Marcus. Known as "the Pope of Fashion," he transformed Neiman Marcus into a globally recognized luxury brand. Created the famous Neiman Marcus Christmas catalog.' }
    ],
    connections: [
      { name: 'Nordstrom', type: 'retail rival', description: 'Both are luxury department store chains.' },
      { name: 'Saks Fifth Avenue', type: 'retail rival', description: 'Both are iconic American luxury retailers.' },
      { name: 'Ares Management', type: 'owner', description: 'Private equity firm that acquired Neiman Marcus in 2013.' }
    ]
  },
  'zoom-video-communications': {
    description: 'Zoom Video Communications is the video conferencing platform that became ubiquitous during the COVID-19 pandemic, growing from 10 million to over 300 million daily meeting participants in 2020. Founded in 2011 by Eric Yuan, a Chinese-American engineer who previously worked at Cisco\'s WebEx division. Zoom\'s Jewish connections include its Israeli R&D center, established after the company acquired Israeli startup Keybase in 2020. The company employs Israeli engineers working on encryption and security. Zoom has significant usage within Jewish communities worldwide, as synagogues, Jewish schools, and organizations adopted the platform during COVID-19 lockdowns, fundamentally changing Jewish communal life. The company faced controversies including "Zoombombing" incidents where trolls disrupted meetings (including antisemitic attacks on synagogue services), security vulnerabilities, routing data through Chinese servers, and scrutiny over privacy practices. Zoom settled an FTC privacy complaint for $85 million.',
    individuals: [
      { id: slug('Eric Yuan'), name: 'Eric Yuan', role: 'Founder & CEO', bio: 'Chinese-American entrepreneur who founded Zoom in 2011 after leaving Cisco. His visa applications to the US were rejected eight times before he was approved. During COVID-19, his net worth soared to over $20 billion.' }
    ],
    connections: [
      { name: 'Israeli R&D', type: 'operations', description: 'Zoom acquired Israeli startup Keybase and established Israeli engineering operations.' },
      { name: 'Cisco/WebEx', type: 'founder origin', description: 'Eric Yuan left Cisco\'s WebEx division to found Zoom.' },
      { name: 'Jewish communal organizations', type: 'platform adoption', description: 'Zoom became essential to Jewish communal life worldwide during COVID-19.' }
    ]
  },
  'coinbase': {
    description: 'Coinbase Global is the largest cryptocurrency exchange in the United States, founded in 2012 by Brian Armstrong and Fred Ehrsam. The company went public through a direct listing in April 2021, reaching a valuation of over $85 billion on its first day. Coinbase\'s Jewish connections include co-founder Fred Ehrsam, who is of Jewish heritage, and multiple Jewish executives and board members. The company has significant Israeli connections through its acquisition of Israeli blockchain analytics company Unbound Security and employment of Israeli engineers. Coinbase has been controversial: the SEC sued the company in 2023, alleging it operated as an unregistered securities exchange. The company has faced criticism for listing questionable tokens, was fined $50 million by New York regulators for compliance failures, and laid off approximately 20% of staff in 2022-2023 during the crypto winter. CEO Brian Armstrong has been politically active, opposing Elizabeth Warren\'s crypto regulation efforts.',
    individuals: [
      { id: slug('Brian Armstrong'), name: 'Brian Armstrong', role: 'Co-Founder & CEO', bio: 'CEO and co-founder of Coinbase, the largest US cryptocurrency exchange. Previously worked at Airbnb. Has been outspoken about cryptocurrency regulation.' },
      { id: slug('Fred Ehrsam'), name: 'Fred Ehrsam', role: 'Co-Founder', bio: 'Co-founder of Coinbase and Paradigm, a crypto investment firm. Of Jewish heritage. Former Goldman Sachs trader who left to co-found Coinbase.' }
    ],
    connections: [
      { name: 'Israeli blockchain companies', type: 'acquisitions', description: 'Coinbase has acquired Israeli security and blockchain analytics companies.' },
      { name: 'Goldman Sachs', type: 'founder origin', description: 'Co-founder Fred Ehrsam came from Goldman Sachs.' },
      { name: 'SEC', type: 'regulatory action', description: 'SEC sued Coinbase in 2023 for operating as an unregistered securities exchange.' }
    ]
  },
  'new-england-patriots': {
    description: 'The New England Patriots are a professional American football team in the NFL, owned since 1994 by Robert Kraft, one of the most prominent Jewish-American sports owners. Kraft, who grew up in an Orthodox Jewish family in Brookline, Massachusetts, purchased the team for $172 million; it is now valued at over $7 billion. Under Kraft\'s ownership, the Patriots became the most successful NFL dynasty, winning six Super Bowls with coach Bill Belichick and quarterback Tom Brady. Kraft is deeply connected to the Jewish and Israeli communities: he is a major donor to Jewish causes, has received the Genesis Prize ("Jewish Nobel"), and is active in combating antisemitism. He founded the Foundation to Combat Antisemitism (FCAS) and has lobbied the NFL to take action against hate speech. In 2019, Kraft faced personal controversy when he was charged with soliciting prostitution at a Florida spa (charges later dropped). He has donated over $100 million to Columbia University and $20 million to the Kraft Center for Jewish Student Life.',
    individuals: [
      { id: slug('Robert Kraft'), name: 'Robert Kraft', role: 'Owner', bio: 'Jewish-American billionaire who owns the New England Patriots. Raised in an Orthodox Jewish family. Major philanthropist and advocate against antisemitism. Founded the Foundation to Combat Antisemitism. Winner of the Genesis Prize. Purchased the Patriots for $172 million in 1994; now worth over $7 billion.' }
    ],
    connections: [
      { name: 'Foundation to Combat Antisemitism', type: 'founder', description: 'Robert Kraft founded FCAS to combat antisemitism through public awareness campaigns.' },
      { name: 'NFL', type: 'league', description: 'The NFL has multiple Jewish team owners including Kraft, Stephen Ross, and others.' },
      { name: 'Columbia University', type: 'donor', description: 'Kraft donated over $100 million to Columbia University.' },
      { name: 'Israel', type: 'personal connection', description: 'Kraft regularly visits Israel and is a major supporter of Israeli causes.' }
    ]
  },
  'philadelphia-76ers': {
    description: 'The Philadelphia 76ers are a professional basketball team in the NBA, owned by Josh Harris and David Blitzer, both Jewish-American investors. Harris, who is co-founder of Apollo Global Management, one of the world\'s largest private equity firms, purchased the team in 2011 for $280 million. Harris and Blitzer also own the New Jersey Devils (NHL). Harris reportedly sold a majority stake in 2023 for approximately $3 billion. David Blitzer leads Blitzer Group and has invested in sports teams globally including Crystal Palace FC and German football club FC Augsburg. Harris briefly ran for governor of New Jersey and was considered for positions in the Biden administration. The ownership group has been active in Jewish philanthropic circles. The 76ers have faced controversy over "The Process" - an extended period of intentional losing to acquire draft picks.',
    individuals: [
      { id: slug('Josh Harris'), name: 'Josh Harris', role: 'Managing Partner', bio: 'Jewish-American billionaire who co-founded Apollo Global Management, one of the world\'s largest private equity firms. Purchased the Philadelphia 76ers in 2011. Also owns the New Jersey Devils and Washington Commanders (acquired 2023 for $6.05 billion). Active in Jewish philanthropy.' },
      { id: slug('David Blitzer'), name: 'David Blitzer', role: 'Co-Owner', bio: 'Jewish-American investor and co-owner of the Philadelphia 76ers and New Jersey Devils. Founder of Blitzer Group. Invested in multiple international sports teams.' }
    ],
    connections: [
      { name: 'Apollo Global Management', type: 'owner connection', description: 'Josh Harris co-founded Apollo Global Management.' },
      { name: 'Washington Commanders', type: 'owner overlap', description: 'Josh Harris purchased the Washington Commanders in 2023 for $6.05 billion.' },
      { name: 'Brooklyn Nets', type: 'NBA peer', description: 'Both NBA teams with Jewish ownership.' }
    ]
  },
  'calvin-klein': {
    description: 'Calvin Klein is a global fashion brand founded in 1968 by Calvin Klein, a Jewish-American fashion designer born in the Bronx, New York, to Hungarian-Jewish immigrant parents. Klein revolutionized American fashion with his minimalist designs and provocative advertising. The brand became famous for its underwear and jeans lines and for controversial ads featuring then-15-year-old Brooke Shields ("Nothing comes between me and my Calvins") and later, Mark Wahlberg. Calvin Klein sold the company to Phillips-Van Heusen (now PVH Corp) in 2003 for approximately $430 million. Klein grew up attending a synagogue in the Bronx and has spoken about his Jewish heritage. The brand has been involved in controversies over sexualized advertising, accusations of exploitation of models, and supply chain labor concerns. Klein personally struggled publicly with substance abuse and was treated at multiple rehabilitation facilities.',
    individuals: [
      { id: slug('Calvin Klein'), name: 'Calvin Klein', role: 'Founder', bio: 'Jewish-American fashion designer born in the Bronx to Hungarian-Jewish immigrant parents. Founded Calvin Klein Inc. in 1968, revolutionizing American fashion with minimalist design and provocative marketing. Sold the brand to PVH Corp for $430 million.' }
    ],
    connections: [
      { name: 'PVH Corp', type: 'parent company', description: 'PVH Corp acquired Calvin Klein in 2003.' },
      { name: 'Ralph Lauren', type: 'industry peer', description: 'Both are iconic American fashion brands founded by Jewish designers from New York.' },
      { name: 'Donna Karan/DKNY', type: 'industry peer', description: 'Both are major fashion brands founded by Jewish-American designers.' }
    ]
  },
  'marc-jacobs': {
    description: 'Marc Jacobs is an American fashion brand founded by Marc Jacobs, a Jewish-American fashion designer born in New York City in 1963 and raised on the Upper West Side. Jacobs is widely regarded as one of the most influential fashion designers of his generation. He served as creative director of Louis Vuitton from 1997 to 2014, transforming the luxury brand and pioneering high-fashion/streetwear collaborations. Jacobs grew up in a Jewish family and attended the High School of Art and Design and Parsons School of Design. His personal life has been marked by public battles with substance abuse (he entered rehab multiple times and got sober in 2007) and his openness about being gay, making him a prominent LGBTQ+ figure in fashion. The Marc Jacobs brand, owned by LVMH, has faced financial challenges with its main line while the more affordable Marc by Marc Jacobs line was popular before being discontinued.',
    individuals: [
      { id: slug('Marc Jacobs'), name: 'Marc Jacobs', role: 'Founder & Chief Creative Officer', bio: 'Jewish-American fashion designer born in New York City. Served as creative director of Louis Vuitton from 1997-2014. One of the most influential designers of his generation. Openly gay and a prominent LGBTQ+ advocate.' }
    ],
    connections: [
      { name: 'LVMH', type: 'parent company', description: 'The Marc Jacobs brand is owned by LVMH.' },
      { name: 'Louis Vuitton', type: 'former role', description: 'Marc Jacobs served as Louis Vuitton creative director for 17 years.' },
      { name: 'Calvin Klein', type: 'industry peer', description: 'Both are iconic fashion brands founded by Jewish-American designers.' }
    ]
  },
  'viacomcbs-now-paramount': {
    description: 'Paramount Global (formerly ViacomCBS) is a major American media conglomerate controlling CBS, Paramount Pictures, MTV, Nickelodeon, Comedy Central, BET, Showtime, and Paramount+. The company has deep Jewish roots: Sumner Redstone (born Sumner Murray Rothstein), a Jewish-American media mogul, built the Viacom/CBS empire through aggressive acquisitions starting in the 1980s. His daughter Shari Redstone, who succeeded him, ultimately engineered the recombination of Viacom and CBS in 2019. Paramount Pictures itself was co-founded by Adolph Zukor, a Hungarian-Jewish immigrant, in 1912 - making it one of the oldest and most storied Hollywood studios. The conglomerate has faced recent challenges including declining linear TV viewership and streaming losses, leading to a 2024 merger agreement with Skydance Media. Controversies include former CBS CEO Les Moonves\' resignation over sexual misconduct allegations (2018), Sumner Redstone\'s mental competency battles, and lawsuits over elder abuse.',
    individuals: [
      { id: slug('Shari Redstone'), name: 'Shari Redstone', role: 'Chair', bio: 'Jewish-American billionaire who chairs Paramount Global through National Amusements. Daughter of Sumner Redstone. Engineered the Viacom-CBS merger and the 2024 Skydance deal.' },
      { id: slug('Sumner Redstone'), name: 'Sumner Redstone', role: 'Former Chairman', bio: 'Jewish-American media mogul (born Sumner Murray Rothstein, 1923-2020) who built the Viacom/CBS empire. Changed his name from Rothstein to Redstone. His final years were marked by legal battles over his mental competency.' },
      { id: slug('Adolph Zukor'), name: 'Adolph Zukor', role: 'Founder of Paramount Pictures', bio: 'Hungarian-Jewish immigrant (1873-1976) who co-founded Paramount Pictures in 1912, one of the original Hollywood movie studios. Lived to 103.' }
    ],
    connections: [
      { name: 'National Amusements', type: 'controlling shareholder', description: 'The Redstone family controls Paramount through National Amusements.' },
      { name: 'Walt Disney Company', type: 'industry rival', description: 'Both are major entertainment conglomerates with deep Jewish executive histories.' },
      { name: 'Skydance Media', type: 'merger partner', description: 'Paramount agreed to merge with Skydance Media in 2024, led by David Ellison (son of Larry Ellison).' }
    ]
  },
  'comcast-corporation': {
    description: 'Comcast Corporation is the largest broadcasting and cable television company in the world by revenue, and the parent company of NBCUniversal. Founded in 1963 by Ralph Roberts, a Jewish-American businessman from Philadelphia who started by purchasing a small cable system in Tupelo, Mississippi. Roberts\' son Brian Roberts became CEO in 2002 and transformed Comcast from a cable company into a media conglomerate by acquiring NBCUniversal from GE in 2013 for $16.7 billion and later Sky PLC for $39 billion. The Roberts family is Jewish and has been active in Jewish philanthropy. Brian Roberts is on the board of the JFNA (Jewish Federations of North America). Comcast has faced extensive criticism: dubbed the "most hated company in America" in customer satisfaction surveys, accused of monopolistic practices, lobbying against net neutrality, and antitrust concerns over its vertical integration of content and distribution. The company was fined $9.1 million by the FCC for billing irregularities.',
    individuals: [
      { id: slug('Brian Roberts'), name: 'Brian Roberts', role: 'Chairman & CEO', bio: 'Jewish-American billionaire CEO of Comcast since 2002. Son of founder Ralph Roberts. Transformed Comcast from a cable company into a global media empire. Active in Jewish philanthropy and serves on the board of Jewish Federations of North America.' },
      { id: slug('Ralph Roberts'), name: 'Ralph Roberts', role: 'Founder', bio: 'Jewish-American businessman (1920-2015) who founded Comcast in 1963 by purchasing a cable system in Tupelo, Mississippi. Built the foundation of what became America\'s largest cable company.' }
    ],
    connections: [
      { name: 'NBCUniversal', type: 'subsidiary', description: 'Comcast acquired NBCUniversal from GE in 2013 for $16.7 billion.' },
      { name: 'Walt Disney Company', type: 'competitor', description: 'Disney and Comcast (NBCUniversal) are the two largest entertainment companies.' },
      { name: 'Sky PLC', type: 'subsidiary', description: 'Comcast acquired European broadcaster Sky for $39 billion in 2018.' },
      { name: 'Paramount Global', type: 'competitor', description: 'Both are major media conglomerates with Jewish founding families.' }
    ]
  },
  'advance-publications': {
    description: 'Advance Publications is a privately held American media conglomerate owned by the Newhouse family. Founded by Samuel Irving Newhouse Sr. (born Solomon Isadore Neuhaus), a Jewish-American media mogul who began buying newspapers in the 1920s and built one of America\'s largest media empires. The company owns Condé Nast (publisher of Vogue, The New Yorker, Vanity Fair, GQ, Wired), Reddit (major shareholder), and Discovery Communications shares. Donald Newhouse and the late S.I. Newhouse Jr. (died 2017) continued the family dynasty. S.I. Newhouse Jr. was instrumental in making Condé Nast the premier luxury magazine publisher, hiring legendary editors like Anna Wintour and Tina Brown. The family\'s combined wealth exceeds $20 billion. The Newhouse family has been prominent in Jewish philanthropic circles. Controversies include accusations of editorial interference, newspaper closures in cities like Cleveland, and labor disputes.',
    individuals: [
      { id: slug('Donald Newhouse'), name: 'Donald Newhouse', role: 'Co-Owner', bio: 'Jewish-American billionaire who inherited Advance Publications with his brother. Oversees the newspaper and broadcast divisions.' },
      { id: slug('Samuel Newhouse Sr'), name: 'S.I. Newhouse Sr.', role: 'Founder', bio: 'Jewish-American media mogul (born Solomon Isadore Neuhaus, 1895-1979) who founded Advance Publications by acquiring newspapers. Built one of America\'s largest privately held media empires.' }
    ],
    connections: [
      { name: 'Condé Nast', type: 'subsidiary', description: 'Advance owns Condé Nast, publisher of Vogue, The New Yorker, Vanity Fair, and GQ.' },
      { name: 'Reddit', type: 'major investment', description: 'Advance Publications is the largest institutional shareholder of Reddit.' },
      { name: 'Warner Bros. Discovery', type: 'shareholder', description: 'Advance holds significant shares in Warner Bros. Discovery.' }
    ]
  },
  'stripe': {
    description: 'Stripe is a financial technology company that provides payment processing infrastructure for internet businesses. Founded in 2010 by brothers Patrick and John Collison, Irish entrepreneurs who moved to Silicon Valley. Stripe\'s Jewish connections include significant investment from Jewish venture capitalists and tech leaders: Peter Thiel\'s Founders Fund, Elon Musk (who later purchased Twitter), and Sequoia Capital (led by Jewish partners including Michael Moritz). Stripe has extensive Israeli connections through its acquisition of Israeli companies including Paystack-related talent and its employment of Israeli engineers. Multiple Jewish executives serve in senior roles. Stripe was valued at $95 billion in 2021 (later reduced to $50 billion, then recovered to $65+ billion). The company processes hundreds of billions of dollars in payments annually for companies including Amazon, Google, and Shopify.',
    individuals: [
      { id: slug('Patrick Collison'), name: 'Patrick Collison', role: 'Co-Founder & CEO', bio: 'Irish entrepreneur who co-founded Stripe at age 21 with his brother John. Built it into one of the most valuable private companies in the world.' },
      { id: slug('John Collison'), name: 'John Collison', role: 'Co-Founder & President', bio: 'Irish entrepreneur who co-founded Stripe with his brother Patrick. The youngest self-made billionaire in history at the time.' }
    ],
    connections: [
      { name: 'Founders Fund', type: 'investor', description: 'Peter Thiel\'s Founders Fund is a major Stripe investor.' },
      { name: 'Sequoia Capital', type: 'investor', description: 'Sequoia Capital, with significant Jewish leadership, is a major Stripe investor.' },
      { name: 'Israeli R&D', type: 'operations', description: 'Stripe employs Israeli engineers and has acquired Israeli tech talent.' }
    ]
  },
  'kirkland-ellis': {
    description: 'Kirkland & Ellis is the world\'s largest law firm by revenue, generating over $6 billion annually. Founded in 1909 in Chicago, the firm is dominant in private equity, leveraged buyouts, and restructuring. The firm\'s Jewish connections are significant: many of its top partners and rainmakers are Jewish, and the firm has deep ties to Jewish-led private equity firms including KKR, Apollo, and Blackstone. The firm has represented many Israeli companies and has an extensive practice involving Israeli business law. Controversies include criticism over its role in enabling leveraged buyouts that sometimes lead to job losses and corporate distress, representing controversial clients including the Sackler family (Purdue Pharma/opioid crisis) and former President Trump (the firm later stopped representing Trump after January 6). Several former Kirkland partners have been appointed as federal judges.',
    individuals: [
      { id: slug('Jon Ballis'), name: 'Jon Ballis', role: 'Chairman', bio: 'Chairman of Kirkland & Ellis, the world\'s highest-grossing law firm. Oversees a firm with over 3,000 attorneys.' }
    ],
    connections: [
      { name: 'KKR', type: 'client', description: 'Kirkland has extensive relationships with Jewish-led private equity firms including KKR.' },
      { name: 'Apollo Global Management', type: 'client', description: 'Kirkland represents Apollo and other major PE firms in leveraged transactions.' },
      { name: 'Blackstone', type: 'client', description: 'Kirkland is outside counsel to major private equity-backed transactions.' }
    ]
  },
  'glencore': {
    description: 'Glencore is the world\'s largest commodity trading company, headquartered in Baar, Switzerland. Founded as Marc Rich + Co AG in 1974 by Marc Rich, a Belgian-born Jewish-American commodities trader who became one of the most controversial businessmen of the 20th century. Rich was indicted in the US in 1983 on charges of tax evasion and illegal oil dealings with Iran during the hostage crisis, making him a fugitive until he received a presidential pardon from Bill Clinton on Clinton\'s last day in office in 2001 - one of the most controversial pardons in US history. Rich\'s business partner Pincus Green, also Jewish, was co-indicted and co-pardoned. Ivan Glasenberg, a Jewish South African, served as CEO from 2002 to 2021, making Glencore the world\'s dominant commodity trader. Current CEO Gary Nagle succeeded Glasenberg. The company has been involved in major controversies including a $1.1 billion DOJ fine for foreign bribery and oil market manipulation (2022), environmental destruction, and human rights abuses in mining operations across Africa and South America.',
    individuals: [
      { id: slug('Marc Rich'), name: 'Marc Rich', role: 'Founder', bio: 'Belgian-born Jewish-American commodities trader (1934-2013) who founded what became Glencore. Fled the US after being indicted for tax evasion and illegal Iranian oil trading. Received a controversial presidential pardon from Bill Clinton in 2001. Pioneer of modern commodity trading.' },
      { id: slug('Ivan Glasenberg'), name: 'Ivan Glasenberg', role: 'Former CEO', bio: 'Jewish South African businessman who served as Glencore CEO from 2002 to 2021. Israeli citizen. Built Glencore into the world\'s dominant commodity trading firm. Previously was a competitive race-walker representing Israel.' },
      { id: slug('Gary Nagle'), name: 'Gary Nagle', role: 'CEO', bio: 'South African CEO of Glencore since 2021. Previously headed Glencore\'s coal operations.' }
    ],
    connections: [
      { name: 'Israel', type: 'CEO citizenship', description: 'Former CEO Ivan Glasenberg is an Israeli citizen.' },
      { name: 'Clinton presidential pardon', type: 'controversy', description: 'Marc Rich\'s pardon by President Clinton remains one of the most controversial presidential pardons in US history.' },
      { name: 'US Department of Justice', type: 'criminal case', description: 'Glencore paid $1.1 billion in 2022 to resolve foreign bribery and market manipulation charges.' }
    ]
  },
  'lvmh': {
    description: 'LVMH Moët Hennessy Louis Vuitton is the world\'s largest luxury goods conglomerate, led by Bernard Arnault, the world\'s richest person at various points. While Arnault is Catholic, LVMH\'s Jewish connections are extensive: the company owns numerous brands with significant Jewish founders or creative directors, including Marc Jacobs (Louis Vuitton creative director 1997-2014), Donna Karan (DKNY), Sephora founder Dominique Mandonnaud, and connections through the Rothschild banking family who facilitated Arnault\'s original acquisition of LVMH. Baron Édouard de Rothschild\'s Château Lafite Rothschild wines are competitors/peers in the luxury wine space. LVMH has extensive Israeli operations and markets heavily in Israel. The company faced controversy when designer John Galliano was fired from Dior (LVMH subsidiary) in 2011 for antisemitic rants caught on video in a Paris café where he said "I love Hitler." LVMH has over 75 brands including Louis Vuitton, Dior, Tiffany, Moët, Hennessy, Bulgari, and Givenchy.',
    individuals: [
      { id: slug('Bernard Arnault'), name: 'Bernard Arnault', role: 'Chairman & CEO', bio: 'French billionaire chairman and CEO of LVMH, the world\'s largest luxury goods company. Consistently ranked as the world\'s wealthiest person with a net worth exceeding $200 billion. His acquisition of LVMH was facilitated by connections to the Rothschild banking family.' }
    ],
    connections: [
      { name: 'Marc Jacobs brand', type: 'subsidiary', description: 'LVMH owns the Marc Jacobs fashion brand, founded by the Jewish-American designer.' },
      { name: 'Rothschild & Co', type: 'facilitated acquisition', description: 'The Rothschild banking family helped facilitate Arnault\'s original acquisition of LVMH.' },
      { name: 'Dior/Galliano antisemitism scandal', type: 'controversy', description: 'John Galliano was fired from Dior (LVMH) for antisemitic rants in 2011.' },
      { name: 'Tiffany & Co.', type: 'subsidiary', description: 'LVMH acquired Tiffany for $15.8 billion in 2021.' }
    ]
  },
  'barclays': {
    description: 'Barclays is a British multinational universal bank, one of the largest in the world. The bank has complex historical ties to Jewish families: the Barclay, Bevan, and Tritton Quaker banking families who founded it in 1690 later merged with multiple financial institutions. In the modern era, Barclays has significant Jewish connections through its investment banking division (formerly Barclays Capital/Lehman Brothers operations post-2008). Barclays acquired the US operations of Lehman Brothers after its 2008 collapse. The bank has extensive operations in Israel and has been a target of BDS boycott campaigns. Controversies include the LIBOR rate-fixing scandal (2012, $453 million fine, CEO Bob Diamond forced to resign), a $2 billion fine for forex manipulation, investigations into its 2008 Qatar rescue deal (fraud charges against executives were later dropped), and CEO Jes Staley\'s resignation in 2021 over his relationship with Jeffrey Epstein. The bank traces its roots to goldsmith banking in 1690.',
    individuals: [
      { id: slug('C.S. Venkatakrishnan'), name: 'C.S. Venkatakrishnan', role: 'CEO', bio: 'Indian-American CEO of Barclays since 2021. Known as "Venkat." Previously the bank\'s chief risk officer.' },
      { id: slug('Jes Staley'), name: 'Jes Staley', role: 'Former CEO', bio: 'Former CEO of Barclays who resigned in 2021 over an investigation into his relationship with Jeffrey Epstein. Previously a senior JPMorgan executive.' }
    ],
    connections: [
      { name: 'Lehman Brothers', type: 'acquired operations', description: 'Barclays acquired the US operations of collapsed Jewish-founded Lehman Brothers in 2008.' },
      { name: 'Jeffrey Epstein', type: 'scandal', description: 'CEO Jes Staley resigned over his relationship with convicted sex offender Jeffrey Epstein.' },
      { name: 'BDS Movement', type: 'boycott target', description: 'Barclays has been targeted by the BDS movement for its business in Israel.' }
    ]
  },
  'hsbc-holdings': {
    description: 'HSBC Holdings is one of the world\'s largest banking and financial services organizations, founded in 1865 in Hong Kong to finance trade between Europe and Asia. The bank\'s Jewish connections include its modern executive leadership and controversial history. HSBC subsidiaries in France were found to have facilitated the Aryanization of Jewish assets during World War II. The bank has been investigated for its handling of dormant accounts belonging to Holocaust victims. In modern times, HSBC has a significant Israeli banking practice. The bank has been embroiled in major controversies: in 2012, HSBC paid $1.9 billion in fines for laundering money for Mexican drug cartels, sanctioned entities in Iran, Libya, and Sudan. Swiss subsidiary HSBC Private Bank was exposed in the 2015 "SwissLeaks" scandal for helping wealthy clients evade taxes. HSBC has over 40 million customers worldwide and operates in 62 countries.',
    individuals: [
      { id: slug('Noel Quinn'), name: 'Noel Quinn', role: 'Former CEO', bio: 'CEO of HSBC from 2020-2024. Led the bank through a strategic pivot toward Asia.' },
      { id: slug('Georges Elhedery'), name: 'Georges Elhedery', role: 'CEO', bio: 'Lebanese-born CEO of HSBC since 2024. Previously served as CFO.' }
    ],
    connections: [
      { name: 'Holocaust assets', type: 'historical controversy', description: 'HSBC subsidiaries facilitated the Aryanization of Jewish assets during WWII and have been investigated over dormant Holocaust-era accounts.' },
      { name: 'Mexican drug cartels', type: 'money laundering', description: 'HSBC paid $1.9 billion in fines for laundering money for drug cartels.' },
      { name: 'Deutsche Bank', type: 'global peer', description: 'Both are major global banks with Holocaust-era controversies.' }
    ]
  },
  'haagen-dazs': {
    description: 'Häagen-Dazs is a premium ice cream brand with a distinctive Scandinavian-sounding name that was entirely made up. The brand was created in 1961 by Reuben and Rose Mattus, Jewish-American immigrants from Poland. Reuben Mattus chose the fake Danish-sounding name as a tribute to Denmark\'s treatment of Jews during World War II - Denmark was the only occupied European country that actively rescued its Jewish population. The umlaut in the name has no linguistic meaning in any Scandinavian language. Starting from a Bronx kitchen, the Mattus family built Häagen-Dazs into the world\'s most recognized premium ice cream brand, selling it to Pillsbury in 1983. It is now owned by General Mills (in the US) and Froneri (a Nestlé joint venture outside the US). Häagen-Dazs operates in Israel and has faced BDS boycott pressure. The original Bronx factory has been the subject of nostalgic retrospectives about the brand\'s Jewish-American immigrant founding story.',
    individuals: [
      { id: slug('Reuben Mattus'), name: 'Reuben Mattus', role: 'Co-Founder', bio: 'Jewish-American ice cream entrepreneur (1912-1994) born in Poland. Created the Häagen-Dazs brand in 1961, inventing a fake Scandinavian name as a tribute to Danish rescue of Jews during WWII. Built the brand from a Bronx kitchen into a global premium ice cream empire.' },
      { id: slug('Rose Mattus'), name: 'Rose Mattus', role: 'Co-Founder', bio: 'Jewish-American businesswoman who co-founded Häagen-Dazs with husband Reuben. Continued to promote the brand and Jewish philanthropy after Reuben\'s death.' }
    ],
    connections: [
      { name: 'General Mills', type: 'US owner', description: 'General Mills owns Häagen-Dazs in the United States.' },
      { name: 'Nestlé', type: 'international owner', description: 'Nestlé subsidiary Froneri owns Häagen-Dazs outside the US.' },
      { name: 'Denmark WWII rescue', type: 'name origin', description: 'The Häagen-Dazs name was a tribute to Denmark\'s rescue of Jews during the Holocaust.' }
    ]
  },
  'sony-group': {
    description: 'Sony Group Corporation is a Japanese multinational conglomerate and one of the world\'s largest entertainment and electronics companies, operating PlayStation, Sony Pictures, Sony Music, and consumer electronics divisions. Sony\'s Jewish connections run primarily through its entertainment divisions. Sony Music has been shaped by Jewish executives: Clive Davis (Columbia/Arista/J Records), Tommy Mottola (Sony Music chairman), Walter Yetnikoff, and Doug Morris have all led Sony\'s music operations. Sony Pictures was previously known as Columbia Pictures, which was co-founded by Harry Cohn (born to Jewish parents). In 2014, Sony Pictures suffered a massive cyberattack attributed to North Korea (retaliating for the film "The Interview"), exposing internal emails including embarrassing exchanges about President Obama and celebrity salary negotiations. Sony has Israeli operations through Sony Semiconductor Israel and has acquired Israeli tech companies. Howard Stringer, who served as CEO (2005-2012), was the first non-Japanese to lead the company.',
    individuals: [
      { id: slug('Kenichiro Yoshida'), name: 'Kenichiro Yoshida', role: 'Chairman & CEO', bio: 'Chairman, President, and CEO of Sony Group since 2018. Oversaw the company\'s pivot to entertainment, gaming, and image sensors.' },
      { id: slug('Clive Davis'), name: 'Clive Davis', role: 'Former Sony Music Executive', bio: 'Jewish-American music industry legendary executive. Led Columbia Records, founded Arista Records and J Records. Discovered and signed Whitney Houston, Bruce Springsteen, Janis Joplin, and many others.' },
      { id: slug('Tommy Mottola'), name: 'Tommy Mottola', role: 'Former Sony Music Chairman', bio: 'Italian-American music executive who served as chairman of Sony Music (1988-2003). Married to Mariah Carey (1993-1998). His tenure was later criticized by artists including Michael Jackson.' }
    ],
    connections: [
      { name: 'Columbia Pictures', type: 'historical', description: 'Sony Pictures was originally Columbia Pictures, co-founded by Jewish executive Harry Cohn.' },
      { name: 'Sony Semiconductor Israel', type: 'Israeli operations', description: 'Sony operates semiconductor R&D in Israel.' },
      { name: 'Microsoft', type: 'gaming rival', description: 'Sony PlayStation and Xbox are the dominant gaming consoles.' }
    ]
  },
  'infosys': {
    description: 'Infosys Limited is one of India\'s largest IT services companies, co-founded in 1981 by N.R. Narayana Murthy and six colleagues. The company\'s Jewish and Israeli connections center on its significant Israeli operations: Infosys established its Israel Innovation Hub and has been involved in partnerships with Israeli tech companies and the Israeli government for digital transformation projects. The company has employed Israeli technologists and has invested in Israeli startups through its innovation fund. Infosys BPO operations serve Israeli financial institutions. The company\'s former CEO Vishal Sikka (2014-2017), who studied at Stanford, had significant connections to Silicon Valley\'s Jewish tech community. Infosys has been involved in controversies including whistleblower allegations of unethical practices (2019), visa fraud accusations in the US (settling for $34 million in 2013), and the cultural clash between founders and professional management.',
    individuals: [
      { id: slug('Salil Parekh'), name: 'Salil Parekh', role: 'CEO', bio: 'CEO and Managing Director of Infosys since 2018. Previously led Capgemini\'s operations.' }
    ],
    connections: [
      { name: 'Israel Innovation Hub', type: 'Israeli operations', description: 'Infosys operates an innovation hub in Israel for technology partnerships.' },
      { name: 'Israeli startups', type: 'investment', description: 'Infosys has invested in Israeli startups through its innovation fund.' },
      { name: 'Tata Consultancy Services', type: 'Indian peer', description: 'Both are leading Indian IT services companies.' }
    ]
  },
  'johnson-johnson': {
    description: 'Johnson & Johnson is one of the world\'s largest healthcare companies, founded in 1886 in New Brunswick, New Jersey. While not Jewish-founded, J&J has significant Jewish connections through its executive leadership and Israeli operations. The company operates Janssen Israel, a major pharmaceutical R&D center, and has acquired numerous Israeli biotech companies. Former CEO Alex Gorsky (2012-2022) oversaw major Israeli acquisitions. J&J was a key COVID-19 vaccine producer (single-dose Janssen vaccine). The company has faced enormous controversies: talcum powder cancer lawsuits (thousands of claims alleging J&J knew its talc contained asbestos, leading to a proposed $8.9 billion settlement), the opioid crisis (J&J paid $5 billion to settle claims its subsidiary Janssen contributed to the epidemic), and product recalls. J&J completed a planned split in 2023, separating its consumer health division (Kenvue). The company spends over $14 billion annually on R&D.',
    individuals: [
      { id: slug('Joaquin Duato'), name: 'Joaquin Duato', role: 'CEO', bio: 'CEO of Johnson & Johnson since 2022. Spanish-born executive who has been with J&J for over 30 years.' }
    ],
    connections: [
      { name: 'Janssen Israel', type: 'Israeli subsidiary', description: 'J&J\'s pharmaceutical arm Janssen operates a major R&D center in Israel.' },
      { name: 'Israeli biotech acquisitions', type: 'R&D', description: 'J&J has acquired multiple Israeli biotech companies.' },
      { name: 'Pfizer', type: 'pharma peer', description: 'Both are major pharmaceutical companies that produced COVID-19 vaccines.' }
    ]
  },
  'wynn-resorts': {
    description: 'Wynn Resorts is a luxury casino resort company founded in 2002 by Steve Wynn (born Stephen Alan Weinberg), a Jewish-American casino magnate who transformed Las Vegas. Born to a Jewish family, Wynn changed his surname from Weinberg at age 25. He is credited with driving the megaresort trend on the Las Vegas Strip, developing The Mirage, Bellagio, and Wynn Las Vegas. Wynn Resorts operates luxury properties in Las Vegas and Macau worth billions. Wynn was forced to resign as CEO and chairman in 2018 after the Wall Street Journal reported allegations of sexual misconduct from dozens of women spanning decades, including a $7.5 million settlement with a manicurist. He denied the allegations but sold his entire 12% stake for approximately $2.1 billion. Wynn was a major Republican donor and briefly served as RNC finance chairman. The company continues under CEO Craig Billings. Wynn was a prominent figure in Jewish philanthropy and donated millions to Jewish causes.',
    individuals: [
      { id: slug('Steve Wynn'), name: 'Steve Wynn', role: 'Founder & Former CEO', bio: 'Jewish-American casino magnate (born Stephen Alan Weinberg) who founded Wynn Resorts and transformed Las Vegas with luxury megaresorts. Forced to resign in 2018 over sexual misconduct allegations from dozens of women. Changed his name from Weinberg. Former RNC finance chairman.' },
      { id: slug('Craig Billings'), name: 'Craig Billings', role: 'CEO', bio: 'CEO of Wynn Resorts since 2022. Previously served as CFO and president of the company.' }
    ],
    connections: [
      { name: 'Las Vegas Sands', type: 'industry rival', description: 'Both are luxury casino companies founded by Jewish entrepreneurs (Steve Wynn and Sheldon Adelson respectively).' },
      { name: 'MGM Resorts', type: 'industry rival', description: 'Major competitor on the Las Vegas Strip.' },
      { name: 'Republican Party', type: 'political donations', description: 'Steve Wynn was a major Republican donor and briefly served as RNC finance chairman.' }
    ]
  },
  'databricks': {
    description: 'Databricks is a data analytics and AI company founded in 2013 by seven UC Berkeley computer scientists including Ali Ghodsi (CEO), Ion Stoica, Matei Zaharia, and others. The company created Apache Spark and has become a leader in data lakehouse technology. Databricks\' Jewish connections include investors from prominent Jewish-led venture capital firms and Jewish executives in senior positions. The company has significant Israeli presence through its R&D operations and has acquired Israeli AI and data companies. Valued at over $43 billion (as of 2023), Databricks competes with Snowflake and cloud providers. The company has not been publicly controversial but faces ongoing competition concerns and debates about data privacy in AI training.',
    individuals: [
      { id: slug('Ali Ghodsi'), name: 'Ali Ghodsi', role: 'CEO & Co-Founder', bio: 'Swedish-Iranian computer scientist and CEO of Databricks since its founding in 2013. Previously a researcher at UC Berkeley.' }
    ],
    connections: [
      { name: 'Israeli R&D', type: 'operations', description: 'Databricks has R&D operations in Israel.' },
      { name: 'Snowflake', type: 'competitor', description: 'Major competitor in the cloud data platform space.' },
      { name: 'Andreessen Horowitz', type: 'investor', description: 'a16z is a major investor in Databricks.' }
    ]
  },
  'robinhood-markets': {
    description: 'Robinhood Markets is a financial services company that pioneered commission-free stock trading through its mobile app, founded in 2013 by Vladimir Tenev and Baiju Bhatt. The app democratized investing, attracting millions of young, first-time investors. Robinhood\'s Jewish connections include significant Jewish investors and executives. The company became deeply controversial during the GameStop short squeeze in January 2021 when it restricted buying of GameStop and other "meme stocks," leading to Congressional hearings, customer outrage, and accusations that Robinhood prioritized the interests of its market maker Citadel Securities (led by Ken Griffin) over retail investors. The company has been fined by FINRA ($70 million, the largest ever) for misleading customers and system outages during a March 2020 crash. A 20-year-old Robinhood user, Alexander Kearns, died by suicide after misunderstanding an options balance showing a negative $730,000 (leading to a $70 million wrongful death settlement). The company went public in 2021 and has faced ongoing regulatory scrutiny.',
    individuals: [
      { id: slug('Vlad Tenev'), name: 'Vlad Tenev', role: 'Co-Founder & CEO', bio: 'Bulgarian-American entrepreneur who co-founded Robinhood. Testified before Congress during the 2021 GameStop saga.' },
      { id: slug('Baiju Bhatt'), name: 'Baiju Bhatt', role: 'Co-Founder', bio: 'Indian-American entrepreneur who co-founded Robinhood with Vlad Tenev at Stanford University.' }
    ],
    connections: [
      { name: 'Citadel Securities', type: 'market maker', description: 'Citadel Securities is Robinhood\'s primary market maker and source of payment for order flow revenue.' },
      { name: 'GameStop controversy', type: 'scandal', description: 'Robinhood restricted trading during the 2021 GameStop short squeeze, leading to Congressional hearings.' },
      { name: 'FINRA', type: 'regulatory fines', description: 'FINRA fined Robinhood $70 million for misleading customers and system failures.' }
    ]
  },
  'booking-com': {
    description: 'Booking.com is the world\'s largest online travel agency, part of Booking Holdings (formerly The Priceline Group). The platform was founded in Amsterdam in 1996 and was acquired by Priceline in 2005. Booking Holdings\' Jewish connections are significant: Priceline was co-founded by Jay Walker and Jesse Fink. Glenn Fogel, who is Jewish, has served as CEO of Booking Holdings since 2017. The company has major Israeli operations and has faced BDS boycott campaigns and legal challenges over listing properties in Israeli settlements in the West Bank. In 2020, Booking.com began labeling settlement properties with a warning, drawing criticism from the Israeli government. Dutch CEO Arthur Kosten was one of the original Booking.com founders. The company processes over 2.5 million room nights per day and had revenue exceeding $21 billion in 2023.',
    individuals: [
      { id: slug('Glenn Fogel'), name: 'Glenn Fogel', role: 'CEO of Booking Holdings', bio: 'Jewish-American CEO of Booking Holdings since 2017. Previously led the company\'s M&A strategy. Has navigated the controversy over listing settlement properties in the West Bank.' }
    ],
    connections: [
      { name: 'Israeli settlements', type: 'controversy', description: 'Booking.com has faced pressure and legal challenges over listing properties in Israeli West Bank settlements.' },
      { name: 'BDS Movement', type: 'boycott target', description: 'BDS has targeted Booking.com over settlement listings.' },
      { name: 'Airbnb', type: 'competitor', description: 'Major competitor that previously delisted settlement properties before reversing the decision.' }
    ]
  },
  'mobileye': {
    description: 'Mobileye is an Israeli technology company that develops autonomous driving and advanced driver-assistance systems (ADAS). Founded in 1999 by Professor Amnon Shashua and Ziv Aviram at the Hebrew University of Jerusalem. Mobileye\'s EyeQ computer vision chips are used by over 50 automakers in more than 150 million vehicles worldwide. The company had a landmark IPO in 2014 and was acquired by Intel for $15.3 billion in 2017 - at the time the largest acquisition of an Israeli tech company ever. Intel took Mobileye public again in 2022 at a $17 billion valuation. Amnon Shashua, an Israeli-Jewish computer scientist, is one of the most celebrated entrepreneurs in Israeli tech history. Mobileye represents one of the proudest achievements of the "Startup Nation" narrative. The company\'s technology has been controversial in the autonomous driving debate, particularly after the severance of its relationship with Tesla in 2016 following a fatal accident involving Tesla\'s Autopilot.',
    individuals: [
      { id: slug('Amnon Shashua'), name: 'Amnon Shashua', role: 'Co-Founder, President & CEO', bio: 'Israeli computer scientist and entrepreneur who co-founded Mobileye. Professor at Hebrew University of Jerusalem. Led the company through its acquisition by Intel for $15.3 billion. One of the most celebrated tech entrepreneurs in Israeli history. Also co-founded AI21 Labs.' },
      { id: slug('Ziv Aviram'), name: 'Ziv Aviram', role: 'Co-Founder & Former CEO', bio: 'Israeli entrepreneur who co-founded Mobileye with Amnon Shashua. Served as president and CEO before the Intel acquisition.' }
    ],
    connections: [
      { name: 'Intel', type: 'parent company', description: 'Intel acquired Mobileye for $15.3 billion in 2017.' },
      { name: 'Tesla', type: 'former partner', description: 'Mobileye supplied Tesla\'s Autopilot cameras until the partnership ended in 2016 after a fatal accident.' },
      { name: 'Hebrew University of Jerusalem', type: 'academic origin', description: 'Mobileye was founded at Hebrew University.' },
      { name: 'Nvidia', type: 'competitor', description: 'Both develop autonomous driving technology.' }
    ]
  },
  'deepmind': {
    description: 'DeepMind is a British artificial intelligence laboratory founded in 2010 by Demis Hassabis, Shane Legg, and Mustafa Suleyman. It was acquired by Google in 2014 for approximately $500 million. DeepMind\'s Jewish connection runs through its co-founder and CEO Demis Hassabis, who has a Greek-Cypriot father and a Chinese-Singaporean mother; the company has employed many Jewish AI researchers and has connections to Jewish academic networks in AI and computer science. DeepMind is headquartered in London and has made breakthrough achievements including AlphaGo (defeating the world Go champion in 2016), AlphaFold (solving the protein folding problem, potentially revolutionizing biology), and Gemini (Google\'s most advanced AI model). Hassabis won the Nobel Prize in Chemistry in 2024 for AlphaFold. The company has been at the center of debates about AI safety, hiring ethics (controversially using non-compete agreements to prevent researchers from joining competitors), and Google\'s use of DeepMind technology.',
    individuals: [
      { id: slug('Demis Hassabis'), name: 'Demis Hassabis', role: 'Co-Founder & CEO', bio: 'British AI researcher and entrepreneur who co-founded DeepMind. Won the 2024 Nobel Prize in Chemistry for AlphaFold. A chess prodigy who became one of the most influential figures in AI research.' }
    ],
    connections: [
      { name: 'Google', type: 'parent company', description: 'Google acquired DeepMind in 2014 for approximately $500 million.' },
      { name: 'OpenAI', type: 'competitor', description: 'Both are leading AI research labs.' },
      { name: 'Nobel Prize', type: 'recognition', description: 'DeepMind\'s AlphaFold earned Demis Hassabis the 2024 Nobel Prize in Chemistry.' }
    ]
  },
  'brookfield-corporation': {
    description: 'Brookfield Corporation (formerly Brookfield Asset Management) is a Canadian multinational alternative investment management company with over $900 billion in assets under management. The company\'s Jewish connection runs through CEO Bruce Flatt, one of the most powerful financiers in the world, and the company\'s significant Israeli real estate and infrastructure investments. Jack Cockwell, a Jewish South African-born businessman, was instrumental in transforming Brookfield from a Brazilian power company (Brascan) into a global asset management giant. Brookfield owns major real estate assets worldwide including Canary Wharf in London and Brookfield Place in Manhattan. The company has investments in Israeli infrastructure and has partnered with Israeli firms. Controversies include criticism of its handling of the Greenfield Park Shopping Centre development, labor practices at portfolio companies, and environmental concerns related to its fossil fuel investments.',
    individuals: [
      { id: slug('Bruce Flatt'), name: 'Bruce Flatt', role: 'CEO', bio: 'Canadian billionaire CEO of Brookfield Corporation. Often compared to Warren Buffett for his investment approach. Manages over $900 billion in assets across real estate, infrastructure, and renewables.' },
      { id: slug('Jack Cockwell'), name: 'Jack Cockwell', role: 'Former CEO', bio: 'Jewish South African-born Canadian businessman who transformed Brookfield from a Brazilian power company into a global asset management firm.' }
    ],
    connections: [
      { name: 'Israeli infrastructure', type: 'investments', description: 'Brookfield has investments in Israeli infrastructure and real estate.' },
      { name: 'Blackstone', type: 'competitor', description: 'Both are leading alternative asset managers.' },
      { name: 'Canary Wharf', type: 'owned asset', description: 'Brookfield owns Canary Wharf, London\'s major financial district development.' }
    ]
  },
  'tata-group': {
    description: 'Tata Group is one of India\'s largest and oldest conglomerates, founded in 1868 by Jamsetji Tata. While not Jewish-founded, the Tata family has significant historical connections to the Jewish communities of India, particularly the Baghdadi Jewish community of Mumbai. The Sassoon family, prominent Baghdadi Jews in Mumbai, had business interactions with the early Tata enterprises. In modern times, Tata has extensive Israeli connections: Tata Consultancy Services (TCS) has a major Israeli operation, Tata Communications operates submarine cables connecting Israel to global internet infrastructure, and Tata Group companies have invested in Israeli startups. The Tata Group\'s ethical business philosophy, established by the founding family, has been compared to Jewish business ethics. The group owns Jaguar Land Rover, Tata Steel, TCS, Tata Motors, and numerous other companies across 100+ countries.',
    individuals: [
      { id: slug('Natarajan Chandrasekaran'), name: 'N. Chandrasekaran', role: 'Chairman', bio: 'Chairman of Tata Sons since 2017. Previously CEO of Tata Consultancy Services, where he oversaw global technology operations including Israeli partnerships.' }
    ],
    connections: [
      { name: 'Israeli tech ecosystem', type: 'investment', description: 'Tata Group companies have invested in Israeli startups and technology.' },
      { name: 'TCS Israel', type: 'operations', description: 'Tata Consultancy Services has significant operations in Israel.' },
      { name: 'Baghdadi Jewish community', type: 'historical', description: 'The Tata family historically interacted with Mumbai\'s prominent Baghdadi Jewish merchant families.' }
    ]
  },
  'yandex': {
    description: 'Yandex is a Russian multinational technology corporation and the largest internet company in Russia, often called "Russia\'s Google." The company was founded in 2000 by Arkady Volozh, a Jewish entrepreneur born in Kazakhstan (then Soviet Union). Volozh grew up in a Jewish family and emigrated to Israel in 2014 while maintaining leadership of Yandex. After Russia\'s invasion of Ukraine in 2022, Yandex was restructured: Volozh was sanctioned by the EU (later removed after appealing), and Yandex\'s Russian operations were sold to a consortium of Russian investors. Volozh relocated to Israel and has spoken about his identity as a Jewish-Israeli tech leader. Yandex\'s search engine, maps, ride-hailing, food delivery, and cloud computing services dominate the Russian internet. The company has been criticized for complying with Russian government censorship requirements and for data-sharing concerns with Russian security services.',
    individuals: [
      { id: slug('Arkady Volozh'), name: 'Arkady Volozh', role: 'Founder & Former CEO', bio: 'Jewish-Kazakh-Israeli tech entrepreneur who founded Yandex. Born in Alma-Ata, Kazakhstan to a Jewish family. Emigrated to Israel in 2014. Was sanctioned by the EU after Russia\'s invasion of Ukraine before the sanctions were lifted. Built Yandex into Russia\'s dominant internet company.' }
    ],
    connections: [
      { name: 'Israel', type: 'founder residence', description: 'Founder Arkady Volozh emigrated to Israel and is now an Israeli citizen.' },
      { name: 'Google', type: 'competitor', description: 'Yandex is Russia\'s alternative to Google, dominating Russian search.' },
      { name: 'EU sanctions', type: 'controversy', description: 'Volozh was sanctioned by the EU over Yandex\'s role in Russia, later reversed.' }
    ]
  },
  'mercado-libre': {
    description: 'Mercado Libre is the largest e-commerce and fintech company in Latin America, often called "the Amazon of Latin America." Founded in 1999 by Marcos Galperin, a Jewish-Argentine entrepreneur from a prominent Buenos Aires Jewish family. Galperin studied at Stanford Business School, where he conceived the idea for the company with guidance from his professor and with early funding from Jewish tech investors including John Muse. The company operates in 18 Latin American countries with Mercado Pago (payments), Mercado Envios (logistics), and Mercado Crédito (lending). Galperin is one of Argentina\'s wealthiest people and has been an outspoken voice in Argentine business. He relocated from Argentina to Uruguay in 2020, citing tax and business reasons, drawing criticism from Argentine politicians. Mercado Libre\'s market cap exceeds $80 billion, making it one of the most valuable companies in Latin America.',
    individuals: [
      { id: slug('Marcos Galperin'), name: 'Marcos Galperin', role: 'Founder, Chairman & CEO', bio: 'Jewish-Argentine billionaire who founded Mercado Libre in 1999 while studying at Stanford. One of the most influential tech entrepreneurs in Latin America. Relocated from Argentina to Uruguay in 2020. Active in Jewish communal life in Buenos Aires.' }
    ],
    connections: [
      { name: 'Jewish community of Buenos Aires', type: 'founder heritage', description: 'Marcos Galperin comes from a prominent Buenos Aires Jewish family.' },
      { name: 'Stanford University', type: 'founding origin', description: 'Galperin conceived Mercado Libre while studying at Stanford Business School.' },
      { name: 'eBay', type: 'early investor', description: 'eBay was an early investor in Mercado Libre.' }
    ]
  },
  'grupo-carso': {
    description: 'Grupo Carso is the largest industrial conglomerate in Mexico, controlled by Carlos Slim Helú, one of the world\'s wealthiest people. Slim\'s family is of Lebanese Maronite Christian origin, but his business empire has significant connections to Mexico\'s Jewish community. Grupo Carso\'s name combines Carlos and Soumaya (his late wife). The Jewish connection to Slim and his empire includes: extensive business dealings with Jewish-Mexican business families, partnerships with Jewish-owned businesses, and investments in companies with significant Jewish leadership. His son-in-law Fernando Romero, architect, designed the Museo Soumaya. The Slim business empire controls Telmex, América Móvil, Grupo Sanborns, and large stakes in The New York Times and other companies. Slim was briefly the world\'s richest person, surpassing Bill Gates in 2010-2013.',
    individuals: [
      { id: slug('Carlos Slim'), name: 'Carlos Slim Helú', role: 'Chairman', bio: 'Mexican business magnate of Lebanese Christian origin who controls Grupo Carso. Was briefly the world\'s richest person. His business network has extensive connections to Mexico\'s Jewish business community.' }
    ],
    connections: [
      { name: 'Jewish-Mexican business community', type: 'business network', description: 'Slim has extensive business dealings with Jewish-Mexican families.' },
      { name: 'The New York Times', type: 'major shareholder', description: 'Slim is the largest shareholder in The New York Times Company.' },
      { name: 'América Móvil', type: 'subsidiary', description: 'América Móvil is the largest telecom company in Latin America.' }
    ]
  },
  'revolut': {
    description: 'Revolut is a British fintech company and digital banking alternative headquartered in London, founded in 2015 by Nikolay Storonsky and Vlad Yatsenko. The company has grown to over 35 million customers worldwide. Revolut\'s Jewish connections include investors from prominent Jewish-led venture capital firms and its expansion into Israel as one of its key markets. The company has employed Israeli engineers and has connections to the Israeli fintech ecosystem. Storonsky, born in Russia to a family with banking connections (his father was a director at Gazprom Neft), has built Revolut into one of Europe\'s most valuable fintech companies (valued at $33 billion in 2024). Controversies include a 2018 compliance scandal (employees alleged the company turned off sanctions screening systems), toxic work culture allegations, high employee turnover, and delays in obtaining its UK banking license (finally granted in 2024).',
    individuals: [
      { id: slug('Nikolay Storonsky'), name: 'Nikolay Storonsky', role: 'Co-Founder & CEO', bio: 'Russian-British entrepreneur who co-founded Revolut. Son of a Gazprom Neft director. Built Revolut into one of Europe\'s most valuable fintech companies. Has faced criticism over workplace culture.' }
    ],
    connections: [
      { name: 'Israeli market', type: 'expansion', description: 'Revolut expanded into Israel as one of its key growth markets.' },
      { name: 'Israeli fintech', type: 'ecosystem', description: 'Revolut has hired Israeli engineers and connected with the Israeli fintech ecosystem.' },
      { name: 'Wise (TransferWise)', type: 'competitor', description: 'Both are European fintech companies challenging traditional banking.' }
    ]
  },
  'council-on-foreign-relations-cfr': {
    description: 'The Council on Foreign Relations (CFR) is the most prestigious and influential US foreign policy think tank, founded in 1921 in New York City. The CFR publishes the journal Foreign Affairs and convenes meetings between government officials, academics, business leaders, and journalists. Jewish connections to the CFR are extensive: numerous Jewish scholars, diplomats, and businessmen have served as members, directors, and presidents. Henry Kissinger (Jewish-German refugee) was one of the CFR\'s most prominent members. Richard Haass served as president from 2003 to 2023. The CFR has been the subject of extensive conspiracy theories, often with antisemitic undertones, alleging it is a "shadow government" or part of a "New World Order." In reality, the CFR is a nonpartisan membership organization that provides a forum for foreign policy discussion. Its board has included numerous Jewish business leaders, and its programs frequently address US-Israel relations, Middle East policy, and antisemitism.',
    individuals: [
      { id: slug('Michael Froman'), name: 'Michael Froman', role: 'President', bio: 'President of the Council on Foreign Relations since 2023. Former US Trade Representative under President Obama. Jewish-American diplomat and trade negotiator.' },
      { id: slug('Richard Haass'), name: 'Richard Haass', role: 'Former President', bio: 'President of the CFR from 2003 to 2023. American diplomat and author. Led the organization through two decades of global upheaval.' },
      { id: slug('Henry Kissinger CFR'), name: 'Henry Kissinger', role: 'Former Member/Director', bio: 'Jewish-German refugee who became US Secretary of State and National Security Advisor. One of the most prominent CFR members. Nobel Peace Prize winner (1973). Died in 2023 at age 100.' }
    ],
    connections: [
      { name: 'Foreign Affairs journal', type: 'publication', description: 'CFR publishes Foreign Affairs, one of the most influential foreign policy journals.' },
      { name: 'Brookings Institution', type: 'peer think tank', description: 'Both are leading US foreign policy think tanks.' },
      { name: 'US-Israel policy', type: 'focus area', description: 'CFR frequently addresses US-Israel relations and Middle East policy.' }
    ]
  },
  'inditex-zara': {
    description: 'Inditex (Industria de Diseño Textil) is the world\'s largest fashion retailer, parent company of Zara, Pull&Bear, Massimo Dutti, Bershka, and other brands. Founded by Amancio Ortega in 1975 in A Coruña, Spain. While Ortega is not Jewish, Inditex\'s Jewish connections include its Israeli operations (Zara operates multiple stores in Israel and has been embroiled in BDS boycott campaigns), its sourcing from Israeli textile companies, and Jewish executives within the global organization. In November 2023, Zara faced massive controversy when an advertising campaign featuring mannequins wrapped in white cloth was widely interpreted as evoking images of Palestinian casualties in Gaza, leading to boycott calls. Inditex has faced labor rights controversies including allegations of sweatshop conditions in supply chains and the discovery of "SOS notes" from unpaid workers in Istanbul sewn into Zara garments (2017).',
    individuals: [
      { id: slug('Marta Ortega'), name: 'Marta Ortega', role: 'Chair', bio: 'Spanish businesswoman, daughter of founder Amancio Ortega. Became chair of Inditex in 2022. One of the youngest women to lead a major global corporation.' }
    ],
    connections: [
      { name: 'Israeli operations', type: 'retail', description: 'Zara operates multiple stores in Israel and has faced BDS boycott pressure.' },
      { name: 'BDS Movement', type: 'boycott target', description: 'Inditex/Zara has been targeted by BDS boycotts over Israeli operations.' },
      { name: 'Gaza controversy', type: 'advertising scandal', description: 'A 2023 Zara campaign was widely criticized for imagery seen as evoking Palestinian casualties.' }
    ]
  },
  'random-house': {
    description: 'Random House is the world\'s largest general-interest book publisher, now part of Penguin Random House (a subsidiary of German media giant Bertelsmann). The publishing house was founded in 1927 by Bennett Cerf and Donald Klopfer, both Jewish Americans. Cerf, the more public-facing of the two, became a cultural celebrity as a panelist on the TV game show "What\'s My Line?" and was known for his wit and love of puns. Under Cerf and Klopfer\'s leadership, Random House published defining works of 20th-century literature including James Joyce\'s "Ulysses" (which they fought to have its ban overturned), works by William Faulkner, Truman Capote, and Dr. Seuss. The Knopf imprint, founded by Alfred A. Knopf (also Jewish), is part of the Random House group. Random House merged with Penguin Books in 2013. The attempted acquisition of Simon & Schuster was blocked by antitrust regulators in 2022.',
    individuals: [
      { id: slug('Bennett Cerf'), name: 'Bennett Cerf', role: 'Co-Founder', bio: 'Jewish-American publisher (1898-1971) who co-founded Random House. Became a cultural celebrity through his appearances on "What\'s My Line?" Famous for publishing Joyce\'s "Ulysses" and fighting its ban.' },
      { id: slug('Donald Klopfer'), name: 'Donald Klopfer', role: 'Co-Founder', bio: 'Jewish-American publisher who co-founded Random House with Bennett Cerf. Managed the business side while Cerf served as the public face.' }
    ],
    connections: [
      { name: 'Penguin Random House', type: 'parent', description: 'Random House merged with Penguin Books in 2013.' },
      { name: 'Alfred A. Knopf (publisher)', type: 'imprint', description: 'Knopf, founded by Jewish publisher Alfred A. Knopf, is part of the Random House group.' },
      { name: 'Simon & Schuster', type: 'attempted acquisition', description: 'Penguin Random House\'s attempt to acquire Simon & Schuster was blocked by antitrust regulators.' }
    ]
  },
  'stonyfield-farm': {
    description: 'Stonyfield Farm is an organic yogurt company based in Londonderry, New Hampshire, founded in 1983 by Samuel Kaymen and Gary Hirshberg. The company\'s Jewish connection comes through Gary Hirshberg, the company\'s Jewish-American CEO and "CE-Yo" (a play on yogurt) who led the company for decades and became a leading voice for organic food and sustainable business. Under Hirshberg\'s leadership, Stonyfield grew from a small organic farming school into the world\'s largest organic yogurt brand. Hirshberg has been active in environmental causes, Democratic politics, and has spoken about how Jewish values of stewardship (tikkun olam) influence his approach to sustainable business. The company was sold to Groupe Danone in 2001, and later to Lactalis in 2014. Hirshberg has been controversially involved in opposing GMO labeling laws and has been criticized for some partnerships with conventional food companies.',
    individuals: [
      { id: slug('Gary Hirshberg'), name: 'Gary Hirshberg', role: 'Former CEO', bio: 'Jewish-American entrepreneur who built Stonyfield Farm into the world\'s largest organic yogurt company. Known as "CE-Yo." Pioneer of sustainable business practices. Has spoken about Jewish values of tikkun olam influencing his business ethics.' }
    ],
    connections: [
      { name: 'Lactalis', type: 'parent company', description: 'French dairy giant Lactalis owns Stonyfield Farm.' },
      { name: 'Organic food movement', type: 'industry leadership', description: 'Stonyfield was a pioneer in the organic food industry under Gary Hirshberg\'s leadership.' }
    ]
  },
  'bed-bath-beyond': {
    description: 'Bed Bath & Beyond was an American chain of domestic merchandise retail stores that filed for Chapter 11 bankruptcy in April 2023, closing all remaining stores. Founded in 1971 by Warren Eisenberg and Leonard Feinstein, both Jewish-American retail entrepreneurs who started with a single store called "Bed \'n Bath" in Springfield, New Jersey. They built it into a retail empire of over 1,500 stores at its peak. The chain was famous for its 20% off coupons and cluttered, floor-to-ceiling merchandise displays. The company became a "meme stock" during the GameStop saga in 2021-2022, when activist investor Ryan Cohen (also Jewish) took a large stake, only to sell it abruptly, leading to accusations of a pump-and-dump scheme. CFO Gustavo Arnal fell to his death from a New York City skyscraper in 2022 amid the stock\'s collapse, in what was ruled a suicide. The bankruptcy and liquidation marked the end of one of the most iconic Jewish-American retail stories.',
    individuals: [
      { id: slug('Warren Eisenberg'), name: 'Warren Eisenberg', role: 'Co-Founder', bio: 'Jewish-American retail entrepreneur who co-founded Bed Bath & Beyond with Leonard Feinstein in 1971. Built it from a single New Jersey store into a national chain of 1,500+ stores.' },
      { id: slug('Leonard Feinstein'), name: 'Leonard Feinstein', role: 'Co-Founder', bio: 'Jewish-American retail entrepreneur who co-founded Bed Bath & Beyond with Warren Eisenberg. Both served as co-chairmen before retiring.' }
    ],
    connections: [
      { name: 'Ryan Cohen', type: 'activist investor', description: 'Jewish-American investor Ryan Cohen took and quickly sold a large Bed Bath & Beyond stake during the meme stock era.' },
      { name: 'GameStop meme stock era', type: 'market event', description: 'Bed Bath & Beyond became caught up in the 2021-2022 meme stock phenomenon.' },
      { name: 'Chapter 11 bankruptcy', type: 'corporate event', description: 'Filed for bankruptcy in 2023 and liquidated all stores.' }
    ]
  },
  'bloomberg-philanthropies': {
    description: 'Bloomberg Philanthropies is the philanthropic organization of Michael Bloomberg, a Jewish-American billionaire businessman, politician, and philanthropist. Bloomberg, who grew up in a middle-class Jewish family in Medford, Massachusetts, co-founded Bloomberg L.P. in 1981 and served as Mayor of New York City from 2002 to 2013. His philanthropic organization has donated over $17 billion to causes including public health, the arts, education, the environment, and government innovation. Bloomberg has been a major donor to Jewish causes, including $16.3 million to the American Jewish Joint Distribution Committee and significant donations to Jewish Federations. He was awarded the Genesis Prize ("Jewish Nobel") in 2014 and redirected the $1 million prize to recognize young social entrepreneurs. Bloomberg briefly ran for the 2020 Democratic presidential nomination, spending over $1 billion of his own money. He has been a vocal supporter of Israel and has received numerous awards from Jewish organizations.',
    individuals: [
      { id: slug('Michael Bloomberg'), name: 'Michael Bloomberg', role: 'Founder', bio: 'Jewish-American billionaire, founder of Bloomberg L.P. and former NYC mayor (2002-2013). Has donated over $17 billion to philanthropy. Grew up in a Jewish family in Massachusetts. Genesis Prize winner (2014). 13th richest person in the world.' }
    ],
    connections: [
      { name: 'Bloomberg L.P.', type: 'founder\'s company', description: 'Bloomberg\'s financial data and media company, which generates the wealth supporting his philanthropy.' },
      { name: 'Genesis Prize Foundation', type: 'laureate', description: 'Bloomberg won the Genesis Prize ("Jewish Nobel") in 2014.' },
      { name: 'American Jewish Joint Distribution Committee', type: 'major recipient', description: 'Bloomberg has donated millions to JDC for global Jewish humanitarian work.' }
    ]
  },
  'bronfman-philanthropies': {
    description: 'The Bronfman Philanthropies encompass the charitable activities of the Bronfman family, one of the wealthiest and most influential Jewish families in North America. The family fortune was built by Samuel Bronfman, who founded the Seagram Company, a Canadian distillers empire that became the largest global beverages company. Edgar Bronfman Sr. served as president of the World Jewish Congress from 1981 to 2007, making him one of the most prominent Jewish leaders in the world during that period. He led the campaign to recover Holocaust-era Swiss bank accounts, resulting in a $1.25 billion settlement. The Bronfman family\'s philanthropy spans Jewish education (Bronfman Youth Fellowships, Hillel), Israel, arts, and culture. The family was involved in controversies including Edgar Bronfman Jr.\'s disastrous sale of Seagram to Vivendi in 2000 (which destroyed billions in family wealth) and Sara Bronfman\'s involvement with the NXIVM cult. The Charles Bronfman foundation supports Jewish innovation worldwide.',
    individuals: [
      { id: slug('Charles Bronfman'), name: 'Charles Bronfman', role: 'Philanthropist', bio: 'Jewish-Canadian billionaire philanthropist, son of Samuel Bronfman and co-founder of Birthright Israel. Former owner of the Montreal Expos (MLB). His foundations support Jewish education and innovation.' },
      { id: slug('Edgar Bronfman Sr'), name: 'Edgar Bronfman Sr.', role: 'Family Patriarch', bio: 'Jewish-Canadian billionaire (1929-2013) who served as president of the World Jewish Congress from 1981-2007. Led the campaign to recover Holocaust-era Swiss bank accounts. Built Seagram into a global empire.' }
    ],
    connections: [
      { name: 'World Jewish Congress', type: 'leadership', description: 'Edgar Bronfman Sr. led the WJC for 26 years, becoming one of the most prominent Jewish leaders globally.' },
      { name: 'Birthright Israel', type: 'co-founder', description: 'Charles Bronfman co-founded the Birthright Israel program.' },
      { name: 'Seagram Company', type: 'family business', description: 'The Bronfman fortune was built through the Seagram distillery empire.' },
      { name: 'Swiss bank Holocaust accounts', type: 'advocacy', description: 'Edgar Bronfman Sr. led the campaign for a $1.25 billion settlement from Swiss banks for Holocaust victims.' }
    ]
  },
  'ubs-group-ag': {
    description: 'UBS Group AG is the world\'s largest wealth manager and a major Swiss bank, formed from the 1998 merger of Union Bank of Switzerland and Swiss Bank Corporation. UBS has deeply controversial Jewish connections related to its handling of Holocaust-era assets. In the 1990s, UBS was at the center of the Swiss bank scandal when it was revealed that Swiss banks, including UBS predecessors, held billions in dormant accounts belonging to Holocaust victims. Security guard Christoph Meili discovered that UBS was shredding documents related to wartime-era transactions and became a whistleblower, facing legal threats from the bank. In 1998, UBS and Credit Suisse agreed to pay $1.25 billion to settle Holocaust victims\' claims. In modern times, UBS has Israeli operations and a significant Israeli client base. UBS was fined $3.7 billion by France for helping wealthy French clients evade taxes, and paid $780 million to the US DOJ for helping Americans evade taxes. In 2023, UBS acquired failing rival Credit Suisse in an emergency government-brokered deal.',
    individuals: [
      { id: slug('Sergio Ermotti'), name: 'Sergio Ermotti', role: 'CEO', bio: 'Swiss-Italian CEO of UBS, returning for a second term in 2023 to manage the Credit Suisse integration.' },
      { id: slug('Christoph Meili'), name: 'Christoph Meili', role: 'Whistleblower', bio: 'Former UBS security guard who discovered the bank was shredding Holocaust-era documents in 1997. Became a whistleblower, faced legal threats, and had to flee to the United States. Received American citizenship through a special act of Congress.' }
    ],
    connections: [
      { name: 'Holocaust-era assets', type: 'historical controversy', description: 'UBS predecessors held billions in dormant accounts of Holocaust victims, leading to a $1.25 billion settlement.' },
      { name: 'Credit Suisse', type: 'acquired', description: 'UBS acquired failing Credit Suisse in a 2023 emergency deal brokered by the Swiss government.' },
      { name: 'World Jewish Congress', type: 'settlement negotiator', description: 'The WJC led negotiations for the $1.25 billion Swiss bank Holocaust settlement.' }
    ]
  },
  'credit-suisse-now-ubs': {
    description: 'Credit Suisse was one of Switzerland\'s largest and most prestigious banks before its collapse and emergency acquisition by UBS in 2023. Founded in 1856 by Alfred Escher, the bank has deep Jewish connections through its history and controversies. Like other Swiss banks, Credit Suisse held dormant accounts belonging to Holocaust victims and participated in the $1.25 billion settlement in 1998. The bank was led by several Jewish executives including former CEO Brady Dougan. In its final years, Credit Suisse was embroiled in multiple scandals: the Greensill Capital collapse ($10 billion in client losses), the Archegos Capital Management implosion ($5.5 billion loss), a corporate espionage scandal (spying on former executive Iqbal Khan), a conviction for allowing drug money laundering for a Bulgarian cocaine trafficking ring, and leaked client data ("Suisse Secrets") revealing accounts held by dictators, war criminals, and sanctioned individuals. The bank\'s collapse in 2023 ended 167 years of Swiss banking history.',
    individuals: [
      { id: slug('Brady Dougan'), name: 'Brady Dougan', role: 'Former CEO', bio: 'Jewish-American banker who served as CEO of Credit Suisse from 2007 to 2015. Faced criticism for the bank\'s $2.6 billion tax evasion settlement with the DOJ while receiving large bonuses.' }
    ],
    connections: [
      { name: 'UBS', type: 'acquirer', description: 'UBS acquired Credit Suisse in a 2023 emergency deal after a bank run.' },
      { name: 'Holocaust asset settlement', type: 'historical', description: 'Credit Suisse participated in the $1.25 billion Swiss bank Holocaust settlement in 1998.' },
      { name: 'Archegos Capital', type: 'scandal', description: 'Credit Suisse lost $5.5 billion from the Archegos Capital implosion in 2021.' },
      { name: 'Greensill Capital', type: 'scandal', description: 'Credit Suisse clients lost $10 billion in the Greensill Capital collapse.' }
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
// Re-sort all entries
// ============================================================
console.log('Re-sorting entries by prominence...');
for (const country in data.countries) {
  data.countries[country].sort((a, b) => {
    const scoreA = (a.description || '').length + ((a.connections || []).length * 50) + ((a.individuals || []).length * 30);
    const scoreB = (b.description || '').length + ((b.connections || []).length * 50) + ((b.individuals || []).length * 30);
    return scoreB - scoreA;
  });
}

// Rebuild affiliations
console.log('Rebuilding affiliations...');
const affMap = {};
for (const country in data.countries) {
  for (const entry of data.countries[country]) {
    for (const ind of (entry.individuals || [])) {
      if (!affMap[ind.id]) affMap[ind.id] = [];
      affMap[ind.id].push({
        organization: entry.name,
        role: ind.role || 'Associated',
        entryId: entry.id,
        country: country
      });
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
let shortDescs = 0, noIndividuals = 0;
for (const c in data.countries) for (const e of data.countries[c]) {
  totalEntries++;
  if ((e.description || '').length < 200) shortDescs++;
  if (!e.individuals || e.individuals.length === 0) noIndividuals++;
}
console.log(`\n=== STATS ===`);
console.log(`Entries: ${totalEntries}`);
console.log(`People: ${totalPeople}`);
console.log(`Still thin (<200): ${shortDescs}`);
console.log(`Still no individuals: ${noIndividuals}`);
console.log('Done!');
