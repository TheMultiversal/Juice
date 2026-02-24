// expandData30.js - WAVE 3: Remaining thin entries + more companies + new entries
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
      if (entry.id === entryId) {
        entry.description = newDesc;
        return true;
      }
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
function addEntry(country, entry) {
  if (!data.countries[country]) data.countries[country] = [];
  if (data.countries[country].some(e => e.id === entry.id)) return false;
  data.countries[country].push(entry);
  return true;
}

console.log('Wave 3: Enriching more entries...');
let enriched = 0;

const enrichments = {
  'slack-technologies': {
    description: 'Slack Technologies is a business communication platform founded in 2013 by Stewart Butterfield. Slack was acquired by Salesforce in 2021 for $27.7 billion. The platform\'s Jewish connections include co-founder Cal Henderson and significant Jewish investment from firms like Accel Partners. Slack has Israeli R&D operations and has acquired Israeli tech companies. The platform became essential for remote work and was widely adopted by Israeli tech companies. Stewart Butterfield, though Canadian of non-Jewish background, built the company with significant participation from Jewish tech leaders. Slack faced controversy when it complied with US sanctions by closing accounts in Iran, Cuba, and other restricted countries, and has been criticized for workplace culture issues since the Salesforce acquisition.',
    individuals: [
      { id: slug('Stewart Butterfield'), name: 'Stewart Butterfield', role: 'Co-Founder & Former CEO', bio: 'Canadian entrepreneur who co-founded Slack (and Flickr before it). Became CEO of Slack until the Salesforce acquisition. The name Slack is an acronym for "Searchable Log of All Conversation and Knowledge."' }
    ],
    connections: [
      { name: 'Salesforce', type: 'parent company', description: 'Salesforce acquired Slack for $27.7 billion in 2021.' },
      { name: 'Israeli tech companies', type: 'platform adoption', description: 'Slack is widely used by Israeli tech companies for business communication.' }
    ]
  },
  'sephora': {
    description: 'Sephora is the world\'s largest specialty beauty retailer, founded in 1970 in Paris by Dominique Mandonnaud. The company is owned by LVMH, the luxury conglomerate led by Bernard Arnault. Sephora\'s Jewish connections include its founding by Mandonnaud, who had Jewish heritage, and its extensive Israeli operations - Sephora operates stores in Israel and sources from Israeli cosmetics companies. The brand name "Sephora" is derived from the Greek spelling of Tzipporah (Zipporah), the wife of Moses in the Hebrew Bible. Sephora operates over 2,700 stores in 35 countries. The company has faced controversies including a racial profiling incident involving singer SZA in 2019 that led to company-wide diversity training, and BDS boycott campaigns targeting its Israeli operations.',
    individuals: [
      { id: slug('Dominique Mandonnaud'), name: 'Dominique Mandonnaud', role: 'Founder', bio: 'French entrepreneur who founded Sephora in 1970, revolutionizing beauty retail with an open-sell environment where customers could try products freely. The name derives from the Hebrew biblical figure Tzipporah.' }
    ],
    connections: [
      { name: 'LVMH', type: 'parent company', description: 'Sephora is owned by LVMH, the world\'s largest luxury goods conglomerate.' },
      { name: 'Israeli cosmetics companies', type: 'sourcing', description: 'Sephora sources from and sells products by Israeli cosmetics brands.' },
      { name: 'BDS Movement', type: 'boycott target', description: 'BDS has targeted Sephora for its Israeli operations.' }
    ]
  },
  'kering': {
    description: 'Kering S.A. is a French luxury goods conglomerate that owns Gucci, Saint Laurent, Bottega Veneta, Balenciaga, and Alexander McQueen. Founded as a timber trading company (Pinault-Printemps-Redoute) by François-Henri Pinault\'s father, it was transformed into a luxury group. Kering\'s Jewish connections include the appointment of several Jewish creative directors and executives across its brands. The company faced enormous controversy in 2022-2023 when its brand Balenciaga was embroiled in a scandal involving advertising campaigns that appeared to sexualize children, including images with BDSM-themed accessories near children. Kering\'s Israeli connections include store operations in Israel, luxury goods sourcing, and the fact that several of its brand creative directors are of Jewish heritage. The Pinault family competes directly with the Arnault family (LVMH) in the luxury space.',
    individuals: [
      { id: slug('François-Henri Pinault'), name: 'François-Henri Pinault', role: 'Chairman & CEO', bio: 'French billionaire who leads Kering and transformed it into a luxury goods powerhouse. Husband of actress Salma Hayek. Competes with LVMH\'s Bernard Arnault for luxury market dominance.' }
    ],
    connections: [
      { name: 'LVMH', type: 'industry rival', description: 'Kering and LVMH are the two largest French luxury conglomerates.' },
      { name: 'Balenciaga scandal', type: 'controversy', description: 'Balenciaga\'s 2022 advertising campaigns involving children with BDSM imagery caused massive backlash.' },
      { name: 'Israeli retail', type: 'operations', description: 'Kering brands operate stores in Israel.' }
    ]
  },
  'atlassian': {
    description: 'Atlassian Corporation is an Australian software company that creates products for software development and project management, including Jira, Confluence, Trello, and Bitbucket. Co-founded in 2002 by Mike Cannon-Brookes and Scott Farquhar. Atlassian\'s Jewish connections include its Israeli R&D center in Tel Aviv and the company\'s acquisition of Israeli startups. Atlassian has invested significantly in the Israeli tech ecosystem and employs Israeli engineers in key product development roles. The company went public in 2015 and is valued at over $40 billion. Atlassian\'s products are used by over 250,000 companies worldwide. The company has faced controversies including criticism of its pricing model that has increased costs significantly for enterprise customers, layoffs of approximately 500 employees in 2023, and debates over its fully remote work policy.',
    individuals: [
      { id: slug('Mike Cannon-Brookes'), name: 'Mike Cannon-Brookes', role: 'Co-Founder & Co-CEO', bio: 'Australian tech billionaire who co-founded Atlassian. One of Australia\'s wealthiest people. Known for his environmental activism and investment in renewable energy.' }
    ],
    connections: [
      { name: 'Israeli R&D center', type: 'operations', description: 'Atlassian operates an R&D center in Tel Aviv.' },
      { name: 'Israeli startup acquisitions', type: 'acquisitions', description: 'Atlassian has acquired Israeli startups for its product development.' },
      { name: 'Microsoft', type: 'competitor', description: 'Atlassian competes with Microsoft Teams and Azure DevOps.' }
    ]
  },
  'hyundai-motor-group': {
    description: 'Hyundai Motor Group is one of the world\'s largest automotive manufacturers, producing vehicles under the Hyundai, Kia, and Genesis brands. The South Korean conglomerate has significant Israeli connections: Hyundai established a technology innovation center in Israel focused on autonomous driving, AI, and cybersecurity. The company invested in Israeli autonomous vehicle startup Mobileye competitor Orcam and partnered with multiple Israeli tech startups through its CRADLE (Center for Robotic-Augmented Design in Living Experiences) innovation arm. Former Hyundai executive Shai Agassi, an Israeli tech entrepreneur, was involved in electric vehicle partnerships. Hyundai has operations in Israel through its vehicle sales network and technology R&D. The company has faced controversies including the use of child labor at an Alabama supplier (Hyundai subsidiary SL Alabama, 2022 investigation), massive recalls, and executive corruption charges in South Korea.',
    individuals: [
      { id: slug('Euisun Chung'), name: 'Euisun Chung', role: 'Executive Chairman', bio: 'Executive Chairman of Hyundai Motor Group. Third-generation leader of the Chung family conglomerate. Overseeing the company\'s push into electric vehicles and autonomous driving with Israeli tech partnerships.' }
    ],
    connections: [
      { name: 'Israeli tech center', type: 'R&D', description: 'Hyundai operates an innovation center in Israel for autonomous driving and AI.' },
      { name: 'Israeli startups', type: 'investments', description: 'Hyundai has invested in Israeli startups through its CRADLE innovation arm.' },
      { name: 'Mobileye', type: 'technology partner', description: 'Hyundai uses Israeli-developed ADAS technology in its vehicles.' }
    ]
  },
  'luxottica-essilorluxottica': {
    description: 'EssilorLuxottica is the world\'s largest eyewear company, formed from the 2018 merger of French lens maker Essilor and Italian eyewear manufacturer Luxottica. The company controls an estimated 80% of major eyewear brands including Ray-Ban, Oakley, Persol, and owns LensCrafters and Sunglass Hut. Jewish connections include the Dassault family\'s historical connections to Essilor through French corporate networks, and the company\'s Israeli operations including manufacturing and retail presence. The company has been criticized as a near-monopoly controlling both eyewear manufacturing and retail distribution. Leonardo Del Vecchio, who founded Luxottica, built the company from a small Italian workshop into a global giant before his death in 2022. The merger with Essilor was contentious, with boardroom battles between French and Italian management factions.',
    individuals: [
      { id: slug('Francesco Milleri'), name: 'Francesco Milleri', role: 'CEO', bio: 'Italian CEO of EssilorLuxottica. Was a longtime aide to founder Leonardo Del Vecchio.' }
    ],
    connections: [
      { name: 'Israeli retail', type: 'operations', description: 'EssilorLuxottica operates retail stores and manufactures products in Israel.' },
      { name: 'Essilor Dassault connection', type: 'French corporate', description: 'Essilor has connections through French corporate networks including the Dassault family.' },
      { name: 'Monopoly concerns', type: 'controversy', description: 'EssilorLuxottica controls approximately 80% of major eyewear brands and retail chains.' }
    ]
  },
  'benetton-group': {
    description: 'Benetton Group is an Italian fashion brand founded in 1965 by the four Benetton siblings in Ponzano Veneto, Italy. The brand became globally famous for its provocative "United Colors of Benetton" advertising campaigns by photographer Oliviero Toscani, which addressed social issues including racism, AIDS, war, and religion. Benetton\'s Jewish connections include its controversial advertising involving Jewish-Muslim reconciliation themes, its Israeli retail operations (Benetton operated stores in Israel for decades), and partnerships with Israeli businesses. The Benetton family\'s investment holding, Edizione, controls infrastructure company Atlantia. The family faced devastating controversy when the Morandi Bridge in Genoa, managed by their subsidiary Autostrade per l\'Italia, collapsed in 2018, killing 43 people. The Benetton ads themselves have been controversial, including one depicting a priest kissing a nun and another showing death row inmates.',
    individuals: [
      { id: slug('Luciano Benetton'), name: 'Luciano Benetton', role: 'Co-Founder', bio: 'Italian businessman who co-founded the Benetton clothing empire with his siblings. The brand became known for its provocative social advertising.' }
    ],
    connections: [
      { name: 'Israeli retail', type: 'operations', description: 'Benetton has operated retail stores in Israel for decades.' },
      { name: 'Morandi Bridge collapse', type: 'controversy', description: 'The Benetton family\'s subsidiary managed the Morandi Bridge when it collapsed in 2018, killing 43 people.' }
    ]
  },
  'grupo-televisa': {
    description: 'Grupo Televisa is the largest mass media company in the Spanish-speaking world, based in Mexico City. The company\'s Jewish connections stem from the significant role of Jewish-Mexican business families in its ownership and operations. Emilio Azcárraga Jean, who led the company until 2017, had extensive business relationships with Mexico\'s Jewish business elite. The company merged its content operations with Univision in 2022 to form TelevisaUnivision. Mexican Jewish business families, including the Slim family, have had investments and business dealings with Televisa. The company has faced controversies including allegations of bribery connected to FIFA (related to broadcasting rights), coverage bias favoring the ruling PRI party for decades, and disputes over its monopolistic position in Mexican media.',
    individuals: [
      { id: slug('Emilio Azcarraga Jean'), name: 'Emilio Azcárraga Jean', role: 'Former Chairman', bio: 'Mexican media mogul who led Grupo Televisa. Under his leadership, the company became the largest Spanish-language media company in the world.' }
    ],
    connections: [
      { name: 'Jewish-Mexican business families', type: 'business network', description: 'Televisa has extensive business relationships with Mexico\'s Jewish business community.' },
      { name: 'Univision', type: 'merger partner', description: 'Televisa merged its content operations with Univision in 2022.' }
    ]
  },
  'abbvie': {
    description: 'AbbVie Inc. is a major American pharmaceutical company that was spun off from Abbott Laboratories in 2013. AbbVie is the manufacturer of Humira, the world\'s best-selling drug (generating over $200 billion in lifetime revenue), used to treat autoimmune diseases. The company\'s Israeli connections include its R&D partnerships with Israeli biotech companies and its acquisition of Israeli pharmaceutical firm Pharmacyclics ($21 billion in 2015). AbbVie also acquired Allergan (maker of Botox) for $63 billion in 2020. The company has faced significant controversies: aggressive patent strategies on Humira created a "patent thicket" of over 160 patents that delayed generic competition and were criticized as anti-competitive, leading to Congressional scrutiny. AbbVie has also been accused of using tax inversions to reduce its US tax obligations and has settled opioid-related lawsuits.',
    individuals: [
      { id: slug('Richard Gonzalez AbbVie'), name: 'Richard Gonzalez', role: 'Former CEO & Chairman', bio: 'CEO of AbbVie from its spinoff in 2013 until 2024. Built the company around the Humira franchise into a pharmaceutical giant.' }
    ],
    connections: [
      { name: 'Israeli biotech', type: 'R&D partnerships', description: 'AbbVie has R&D partnerships with Israeli biotech companies.' },
      { name: 'Pharmacyclics', type: 'acquisition', description: 'AbbVie acquired Israeli-connected pharmaceutical firm Pharmacyclics for $21 billion.' },
      { name: 'Allergan', type: 'acquisition', description: 'AbbVie acquired Allergan (maker of Botox) for $63 billion.' }
    ]
  },
  'mckinsey-company': {
    description: 'McKinsey & Company is the world\'s most prestigious management consulting firm, founded in 1926 by James O. McKinsey. While not Jewish-founded, McKinsey has extensive Jewish connections through its leadership, partnership roster, and client relationships. Numerous Jewish partners and directors have shaped the firm. McKinsey has significant Israeli operations and advises Israeli government entities and corporations. The firm has been involved in major controversies: advising Purdue Pharma on strategies to "turbocharge" OxyContin sales during the opioid epidemic (settling for $600 million), advising authoritarian governments including Saudi Arabia (allegedly identifying dissidents), advising ICE on immigration enforcement, and its role in consulting for companies involved in unethical practices. Former McKinsey managing directors include Pete Buttigieg and many other prominent political figures. The firm values extreme secrecy about its client relationships.',
    individuals: [],
    connections: [
      { name: 'Israeli operations', type: 'consulting', description: 'McKinsey advises Israeli government entities and major Israeli corporations.' },
      { name: 'Purdue Pharma', type: 'controversial client', description: 'McKinsey paid $600 million for its role advising Purdue Pharma on OxyContin sales strategies during the opioid epidemic.' },
      { name: 'Goldman Sachs', type: 'talent overlap', description: 'Both are elite professional services firms with significant Jewish leadership.' }
    ]
  },
  'boston-consulting-group-bcg': {
    description: 'Boston Consulting Group (BCG) is one of the "Big Three" management consulting firms, founded in 1963 by Bruce Henderson. BCG has significant Jewish connections through its leadership and partnership roster. The firm\'s Israeli operations are extensive: BCG operates a major office in Tel Aviv and has been a key advisor to Israeli government innovation programs and major Israeli technology companies. Rich Lesser, who served as CEO from 2013 to 2021, and current CEO Christoph Schweizer have expanded the firm\'s technology and digital transformation practice. BCG is known for creating the "growth-share matrix" (BCG Matrix). Like other major consulting firms, BCG has faced criticism for advising governments and corporations on controversial strategies, and for the demanding work culture that has led to debates about work-life balance in consulting.',
    individuals: [],
    connections: [
      { name: 'BCG Tel Aviv', type: 'Israeli operations', description: 'BCG operates a major office in Tel Aviv advising Israeli tech companies and government.' },
      { name: 'McKinsey & Company', type: 'industry peer', description: 'Both are "Big Three" consulting firms with significant Jewish leadership.' },
      { name: 'Bain & Company', type: 'industry peer', description: 'The third member of the "Big Three" consulting firms.' }
    ]
  },
  'sullivan-cromwell': {
    description: 'Sullivan & Cromwell is one of the most prestigious law firms in the world, founded in 1879 in New York City. The firm has a deeply controversial historical relationship with the Jewish community: during the 1930s and 1940s, under the leadership of John Foster Dulles (later US Secretary of State) and Allen Dulles (later CIA Director), the firm represented German industrial interests including those connected to the Nazi regime. The Dulles brothers\' firm represented I.G. Farben, the German chemical company that manufactured Zyklon B gas used in concentration camps. Despite this history, Sullivan & Cromwell in the modern era has had numerous Jewish partners and has been deeply involved in Israeli corporate law, representing Israeli companies in US transactions. The firm represents many of Wall Street\'s largest financial institutions and has been at the center of nearly every major corporate merger and financial crisis of the last century.',
    individuals: [
      { id: slug('Joseph Shenker'), name: 'Joseph Shenker', role: 'Chairman', bio: 'Chairman of Sullivan & Cromwell. Jewish-American lawyer who leads one of the most prestigious law firms in the world.' }
    ],
    connections: [
      { name: 'Nazi-era representation', type: 'historical controversy', description: 'Under the Dulles brothers, S&C represented German industrial interests connected to the Nazi regime, including I.G. Farben.' },
      { name: 'Israeli corporate clients', type: 'legal practice', description: 'S&C represents Israeli companies in major US transactions.' },
      { name: 'Goldman Sachs', type: 'client', description: 'Sullivan & Cromwell is outside counsel to major Wall Street banks.' }
    ]
  },
  'rudin-management': {
    description: 'Rudin Management Company is one of New York City\'s largest and most prominent real estate families and firms. The Rudin family, Jewish-American, has been a major force in New York real estate for four generations since Samuel Rudin immigrated from Poland in the early 1900s. The family developed and owns a portfolio of over 35 commercial and residential properties in Manhattan, primarily along the East Side, including significant office towers and luxury apartment buildings. Jack Rudin and his brother Lewis Rudin were legendary New York civic figures; Lewis founded the Association for a Better New York. The current generation, led by Bill Rudin and Eric Rudin, continues the family tradition. The Rudin family has been deeply involved in Jewish philanthropy, donating to Jewish organizations, hospitals, and educational institutions. They have been influential in New York City politics and urban planning for decades.',
    individuals: [
      { id: slug('Bill Rudin'), name: 'Bill Rudin', role: 'Co-Chairman & CEO', bio: 'Jewish-American real estate executive, third-generation leader of Rudin Management. Co-chairman of the Real Estate Board of New York. Major Jewish philanthropist. Prominent in New York civic affairs.' },
      { id: slug('Eric Rudin'), name: 'Eric Rudin', role: 'Co-Chairman', bio: 'Jewish-American real estate executive and co-chairman of Rudin Management. Fourth generation of the Rudin family in New York real estate.' }
    ],
    connections: [
      { name: 'New York City real estate', type: 'industry', description: 'The Rudin family has been one of the most powerful real estate families in Manhattan for four generations.' },
      { name: 'Association for a Better New York', type: 'civic organization', description: 'Lewis Rudin founded this influential New York civic organization.' },
      { name: 'Jewish philanthropy', type: 'donations', description: 'The Rudin family is a major donor to Jewish organizations and institutions.' }
    ]
  },
  'skirball-cultural-center': {
    description: 'The Skirball Cultural Center is a Jewish cultural institution in Los Angeles, California, founded in 1996 by Jack H. Skirball and dedicated to exploring the connections between 4,000 years of Jewish heritage and the ideals of American democratic society. The center sits on a 15-acre campus in the Santa Monica Mountains and includes a museum, performance venue, classrooms, and event spaces. Named after Jack Skirball, a Jewish-American rabbi-turned-Hollywood producer who wanted to create a place connecting Jewish values to American life. The Skirball houses a significant collection of Jewish art and artifacts, including works related to the immigrant experience and the Holocaust. It hosts exhibitions, concerts, literary events, and educational programs. The center\'s "Noah\'s Ark" interactive exhibit (featuring a full-scale wooden ark) has been one of Los Angeles\' most popular family destinations. The Skirball has received significant donations from the Jewish community of Los Angeles.',
    individuals: [
      { id: slug('Jack Skirball'), name: 'Jack H. Skirball', role: 'Founder', bio: 'Jewish-American rabbi and film producer (1896-1985) who established the Skirball Cultural Center. Produced the film "Saboteur" with Alfred Hitchcock. His foundation funded the cultural center that opened after his death.' }
    ],
    connections: [
      { name: 'Hebrew Union College', type: 'academic partner', description: 'HUC-JIR is associated with the Skirball Cultural Center through shared Jewish cultural programming.' },
      { name: 'Jewish Federation of Greater Los Angeles', type: 'community partner', description: 'The Skirball works closely with the LA Jewish community.' }
    ]
  },
  'delivery-hero': {
    description: 'Delivery Hero is a multinational online food delivery company headquartered in Berlin, Germany. Founded in 2011 by Niklas Östberg, the company operates in over 70 countries across Europe, the Middle East, Asia, and the Americas. Delivery Hero\'s Jewish connections include its significant Israeli operations through its acquisition of Israeli food delivery platform Hungry (later rebranded). The company has employed Israeli engineers and has investment connections to Jewish-led venture capital firms. Delivery Hero owns a stake in its competitor Deliveroo and previously owned the Middle Eastern platform Talabat. The company has been controversial for its business model that relies on gig economy workers with limited protections, its history of operating at significant losses (burning through billions in cash), and competitive practices in the food delivery market.',
    individuals: [
      { id: slug('Niklas Ostberg'), name: 'Niklas Östberg', role: 'Co-Founder & CEO', bio: 'Swedish-German entrepreneur who co-founded Delivery Hero in 2011. Built the company into one of the world\'s largest food delivery platforms despite persistent financial losses.' }
    ],
    connections: [
      { name: 'Israeli food delivery', type: 'operations', description: 'Delivery Hero has acquired and operated Israeli food delivery platforms.' },
      { name: 'Talabat', type: 'subsidiary', description: 'Delivery Hero owns Middle Eastern food delivery platform Talabat.' }
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
// PART 2: ADD 50+ NEW ENTRIES
// ============================================================
console.log('Adding new entries...');
let newEntries = 0;

const newEntriesData = [
  ['United States', {
    name: 'Citadel LLC',
    id: slug('Citadel LLC'),
    type: 'hedge fund',
    category: 'Investment & Private Equity',
    description: 'Citadel LLC is one of the world\'s largest and most successful hedge funds, founded in 1990 by Ken Griffin in Chicago. While Griffin himself is not Jewish, the fund has significant Jewish connections through its executive team, investors, and industry relationships. Citadel\'s sister company, Citadel Securities, is the largest market maker in the US, processing approximately 27% of all US equity trades. The firm became the center of a massive controversy during the 2021 GameStop/meme stock saga when Citadel was accused (though it denied) of influencing Robinhood\'s decision to restrict trading. Citadel Securities\' "payment for order flow" relationship with Robinhood drew Congressional scrutiny. Griffin is a major political donor (primarily Republican) who spent $75 million on the 2022 Illinois governor race.',
    website: 'https://www.citadel.com',
    founded: 1990,
    individuals: [
      { id: slug('Ken Griffin'), name: 'Ken Griffin', role: 'Founder & CEO', bio: 'American billionaire founder of Citadel LLC. One of the wealthiest people in the world. Major Republican political donor who spent $75 million fighting J.B. Pritzker in the 2022 Illinois governor race. Relocated Citadel from Chicago to Miami in 2022.' }
    ],
    connections: [
      { name: 'Robinhood Markets', type: 'market making', description: 'Citadel Securities processes a significant portion of Robinhood\'s order flow.' },
      { name: 'GameStop controversy', type: 'market event', description: 'Citadel was at the center of the 2021 meme stock controversy.' },
      { name: 'Goldman Sachs', type: 'industry peer', description: 'Both are major forces in global financial markets.' }
    ]
  }],
  ['United States', {
    name: 'Levi Strauss & Co.',
    id: slug('Levi Strauss and Co'),
    type: 'apparel company',
    category: 'Retail & Consumer Goods',
    description: 'Levi Strauss & Co. is the iconic American denim company that invented blue jeans, founded in 1853 by Levi Strauss, a Bavarian-Jewish immigrant. Strauss emigrated from Buttenheim, Bavaria to San Francisco during the Gold Rush, where he began selling dry goods before partnering with tailor Jacob Davis (also Jewish, born Jacob Youphes) to patent riveted denim work pants in 1873 - creating the modern blue jean. The company remained privately held by the Strauss family for most of its history and is still controlled by the Haas family (descendants of Levi Strauss\'s nephews, as he had no children). Peter Haas and the Haas family have been among the most prominent Jewish philanthropic families in San Francisco, supporting Jewish education, arts, and Israel. The company went public in 2019. Levi\'s has been involved in controversies over outsourcing manufacturing overseas, supply chain labor conditions, and CEO Chip Bergh\'s stance on gun control (supporting gun safety legislation, which drew conservative boycotts).',
    website: 'https://www.levistrauss.com',
    founded: 1853,
    individuals: [
      { id: slug('Levi Strauss'), name: 'Levi Strauss', role: 'Founder', bio: 'Bavarian-Jewish immigrant (1829-1902) who founded Levi Strauss & Co. and co-invented modern blue jeans. Emigrated from Bavaria to San Francisco during the Gold Rush. Major philanthropist who endowed scholarships at UC Berkeley.' },
      { id: slug('Jacob Davis jeans'), name: 'Jacob Davis', role: 'Co-Inventor of Blue Jeans', bio: 'Jewish-Latvian immigrant (born Jacob Youphes, 1831-1908) who co-invented riveted denim pants with Levi Strauss. A tailor in Reno, Nevada who lacked funds to file the patent alone and partnered with Strauss.' },
      { id: slug('Michelle Gass Levi'), name: 'Michelle Gass', role: 'CEO', bio: 'CEO of Levi Strauss & Co. since 2024. Previously CEO of Kohl\'s and held senior positions at Starbucks.' }
    ],
    connections: [
      { name: 'Haas family philanthropy', type: 'Jewish philanthropy', description: 'The Haas family (Strauss descendants) are among the most prominent Jewish philanthropists in San Francisco.' },
      { name: 'UC Berkeley', type: 'endowment', description: 'Levi Strauss endowed scholarships at UC Berkeley that continue to this day.' }
    ]
  }],
  ['United States', {
    name: 'The Estée Lauder Companies',
    id: slug('The Estee Lauder Companies'),
    type: 'cosmetics conglomerate',
    category: 'Retail & Consumer Goods',
    description: 'The Estée Lauder Companies is one of the world\'s largest cosmetics conglomerates, founded in 1946 by Estée Lauder (born Josephine Esther Mentzer) and her husband Joseph Lauder, both from Jewish families in Queens, New York. Estée\'s parents were Hungarian-Jewish and Czech-Jewish immigrants. She built the company from a small line of skin creams into a global beauty empire encompassing brands including Estée Lauder, Clinique, MAC, La Mer, Bobbi Brown, Tom Ford Beauty, and Jo Malone. The Lauder family remains deeply involved: Ronald Lauder, Estée\'s son, is president of the World Jewish Congress and one of the most prominent Jewish community leaders globally. He has been a major collector of art (founding the Neue Galerie) and a significant political donor. Leonard Lauder, the other son, served as CEO and is a major art collector (donating $1 billion in Cubist masterpieces to the Met). The company has faced recent challenges including declining sales in China and the stock losing significant value in 2023-2024.',
    website: 'https://www.elcompanies.com',
    founded: 1946,
    individuals: [
      { id: slug('Estee Lauder person'), name: 'Estée Lauder', role: 'Founder', bio: 'Jewish-American businesswoman (born Josephine Esther Mentzer, 1906-2004) who founded one of the world\'s largest cosmetics empires. Daughter of Hungarian-Jewish immigrants. Started by selling skin creams formulated by her uncle. Named one of Time Magazine\'s 20 most influential business geniuses of the 20th century.' },
      { id: slug('Ronald Lauder'), name: 'Ronald Lauder', role: 'Board Member', bio: 'Jewish-American billionaire, son of Estée Lauder. President of the World Jewish Congress since 2007. Former US Ambassador to Austria. Founded the Ronald S. Lauder Foundation for Jewish education in Central and Eastern Europe. Major art collector who founded the Neue Galerie.' },
      { id: slug('Leonard Lauder'), name: 'Leonard Lauder', role: 'Chairman Emeritus', bio: 'Jewish-American billionaire, son of Estée Lauder. Served as CEO from 1982-1999 and chairman until 2009. Donated $1 billion in Cubist art to the Metropolitan Museum of Art.' },
      { id: slug('Fabrizio Freda'), name: 'Fabrizio Freda', role: 'CEO', bio: 'Italian-American CEO of Estée Lauder Companies since 2009.' }
    ],
    connections: [
      { name: 'World Jewish Congress', type: 'Lauder family leadership', description: 'Ronald Lauder is president of the World Jewish Congress.' },
      { name: 'Ronald S. Lauder Foundation', type: 'family philanthropy', description: 'Funds Jewish education programs in Central and Eastern Europe.' },
      { name: 'Sephora', type: 'retail partner', description: 'Estée Lauder brands are sold through Sephora stores worldwide.' },
      { name: 'L\'Oréal', type: 'industry rival', description: 'Both are global cosmetics conglomerates.' }
    ]
  }],
  ['United States', {
    name: 'KKR & Co.',
    id: slug('KKR and Co'),
    type: 'private equity firm',
    category: 'Investment & Private Equity',
    description: 'KKR & Co. Inc. (Kohlberg Kravis Roberts) is one of the world\'s largest private equity firms, co-founded in 1976 by Jerome Kohlberg Jr., Henry Kravis, and George Roberts. All three founders are Jewish Americans who previously worked together at Bear Stearns. KKR pioneered the leveraged buyout (LBO) industry and became famous for its 1989 hostile takeover of RJR Nabisco ($25 billion), which was chronicled in the bestseller "Barbarians at the Gate." Henry Kravis and George Roberts are cousins who grew up in Jewish families - Kravis in Tulsa, Oklahoma and Roberts in Houston. The firm manages over $500 billion in assets. KKR has been controversial for its role in defining aggressive financial engineering and the impact of private equity on companies, workers, and communities. Critics argue PE firms like KKR load companies with debt, extract fees, and sometimes lead them to bankruptcy. The firm has also faced criticism for investments in controversial sectors.',
    website: 'https://www.kkr.com',
    founded: 1976,
    individuals: [
      { id: slug('Henry Kravis'), name: 'Henry Kravis', role: 'Co-Founder & Co-Chairman', bio: 'Jewish-American billionaire who co-founded KKR and pioneered the leveraged buyout industry. Known for the landmark RJR Nabisco takeover. Major philanthropist and art collector. Kravis Center for the Performing Arts in West Palm Beach is named for him.' },
      { id: slug('George Roberts'), name: 'George Roberts', role: 'Co-Founder & Co-Chairman', bio: 'Jewish-American billionaire who co-founded KKR with his cousin Henry Kravis. Based in San Francisco, Roberts helped build KKR into one of the world\'s most powerful investment firms.' },
      { id: slug('Jerome Kohlberg Jr'), name: 'Jerome Kohlberg Jr.', role: 'Co-Founder', bio: 'Jewish-American financier (1925-2015) who co-founded KKR. Left the firm in 1987 after disagreements over the increasingly aggressive takeover strategy.' }
    ],
    connections: [
      { name: 'Bear Stearns', type: 'founders origin', description: 'All three KKR founders came from Bear Stearns, another Jewish-founded firm.' },
      { name: 'Apollo Global Management', type: 'industry peer', description: 'Both are major PE firms with Jewish co-founders.' },
      { name: 'Blackstone', type: 'industry rival', description: 'Both are leading alternative asset managers founded by Jewish financiers.' },
      { name: 'Kirkland & Ellis', type: 'legal counsel', description: 'KKR\'s primary outside law firm for deals.' }
    ]
  }],
  ['United States', {
    name: 'DreamWorks Animation',
    id: slug('DreamWorks Animation'),
    type: 'animation studio',
    category: 'Entertainment & Media',
    description: 'DreamWorks Animation is a major American animation studio, originally part of DreamWorks SKG founded in 1994 by Steven Spielberg, Jeffrey Katzenberg, and David Geffen - three of the most powerful Jewish entertainment executives in Hollywood history. The "SKG" in the original name stands for their initials. DreamWorks Animation produced blockbuster franchises including Shrek, Kung Fu Panda, How to Train Your Dragon, Madagascar, and Trolls. The studio was spun off as a separate company in 2004 and acquired by NBCUniversal (Comcast) in 2016 for $3.8 billion. Steven Spielberg is the most successful filmmaker in history and a prominent supporter of Holocaust education (founding the Shoah Foundation). Jeffrey Katzenberg built the animation studio after his controversial departure from Disney. David Geffen is one of the wealthiest self-made individuals in entertainment history.',
    website: 'https://www.dreamworks.com',
    founded: 1994,
    individuals: [
      { id: slug('Steven Spielberg'), name: 'Steven Spielberg', role: 'Co-Founder', bio: 'Jewish-American filmmaker and co-founder of DreamWorks. The most commercially successful director in history. Directed Schindler\'s List and founded the USC Shoah Foundation to preserve Holocaust testimonies. Son of a Jewish family in Cincinnati.' },
      { id: slug('Jeffrey Katzenberg DW'), name: 'Jeffrey Katzenberg', role: 'Co-Founder', bio: 'Jewish-American media executive who co-founded DreamWorks after being passed over for the Disney CEO position. Built DreamWorks Animation into a major studio. Also founded the short-lived Quibi streaming service.' },
      { id: slug('David Geffen'), name: 'David Geffen', role: 'Co-Founder', bio: 'Jewish-American entertainment mogul who co-founded DreamWorks, Geffen Records, and Asylum Records. One of the wealthiest self-made individuals in entertainment. Major philanthropist and art collector.' }
    ],
    connections: [
      { name: 'Walt Disney Company', type: 'competitor/origin', description: 'Katzenberg left Disney to co-found DreamWorks, creating a major Disney rival.' },
      { name: 'NBCUniversal', type: 'parent company', description: 'Comcast\'s NBCUniversal acquired DreamWorks Animation for $3.8 billion in 2016.' },
      { name: 'USC Shoah Foundation', type: 'Spielberg connection', description: 'Spielberg founded the Shoah Foundation to preserve Holocaust survivor testimonies.' }
    ]
  }],
  ['United States', {
    name: 'Simon Wiesenthal Center',
    id: slug('Simon Wiesenthal Center'),
    type: 'human rights organization',
    category: 'Advocacy & Public Affairs',
    description: 'The Simon Wiesenthal Center is an international Jewish human rights organization headquartered in Los Angeles. Founded in 1977 by Rabbi Marvin Hier, the center was named after Simon Wiesenthal, the famous Austrian Holocaust survivor who dedicated his life to hunting Nazi war criminals. The center operates the Museum of Tolerance in Los Angeles and is building a Museum of Tolerance in Jerusalem. The SWC monitors antisemitism worldwide, produces an annual report on digital hate, and has been active in seeking justice for Holocaust perpetrators well into the 21st century. The center maintains a list of most-wanted Nazi war criminals and has worked with governments to pursue suspects. Controversies include its hawkish stance on Israel-Palestine issues (building the Jerusalem museum on a contested Muslim cemetery site), accusations of conflating criticism of Israel with antisemitism, and debates about its confrontational approach to Arab and Muslim communities. The SWC has consultative status at the United Nations.',
    website: 'https://www.wiesenthal.com',
    founded: 1977,
    individuals: [
      { id: slug('Marvin Hier'), name: 'Rabbi Marvin Hier', role: 'Founder & Dean', bio: 'Canadian-born American rabbi who founded the Simon Wiesenthal Center in 1977. Has won two Academy Awards for documentaries about the Holocaust and antisemitism. Delivered the benediction at President Trump\'s inauguration in 2017.' },
      { id: slug('Abraham Cooper'), name: 'Rabbi Abraham Cooper', role: 'Associate Dean', bio: 'Associate Dean of the Simon Wiesenthal Center. Leads the center\'s digital hate monitoring and international advocacy efforts. Has testified before Congress and the UN on antisemitism.' }
    ],
    connections: [
      { name: 'Museum of Tolerance', type: 'operates', description: 'The SWC operates the Museum of Tolerance in Los Angeles and is building one in Jerusalem.' },
      { name: 'Anti-Defamation League', type: 'peer organization', description: 'Both monitor antisemitism and advocate for Jewish rights.' },
      { name: 'United Nations', type: 'consultative status', description: 'The SWC has official consultative status at the UN.' },
      { name: 'Nazi war criminal hunting', type: 'core mission', description: 'The SWC maintains a list of most-wanted Nazi war criminals and works with governments to bring them to justice.' }
    ]
  }],
  ['United States', {
    name: 'Soros Fund Management',
    id: slug('Soros Fund Management'),
    type: 'hedge fund',
    category: 'Investment & Private Equity',
    description: 'Soros Fund Management is a private investment fund founded by George Soros, a Hungarian-Jewish Holocaust survivor who became one of the most successful investors in history and one of the most controversial philanthropists. Soros, born György Schwartz in Budapest in 1930, survived the Holocaust by posing as a Christian. He later studied at the London School of Economics and moved to the United States. As a hedge fund manager, he is famous for "breaking the Bank of England" in 1992 by short-selling $10 billion worth of British pounds, earning approximately $1 billion in a single day. Through his Open Society Foundations, Soros has donated over $32 billion to causes including democracy promotion, human rights, education, and public health. He is one of the most-targeted figures in antisemitic conspiracy theories worldwide, with authoritarian governments (particularly in Hungary under Viktor Orbán) and right-wing groups scapegoating him as a puppet master of global events. His son Alexander Soros took over the Open Society Foundations in 2023.',
    website: 'https://www.soros.com',
    founded: 1970,
    individuals: [
      { id: slug('George Soros'), name: 'George Soros', role: 'Founder & Chairman', bio: 'Hungarian-Jewish Holocaust survivor and billionaire investor. Born György Schwartz in 1930 in Budapest. "Broke the Bank of England" in 1992. Donated over $32 billion through Open Society Foundations. One of the most-targeted figures in antisemitic conspiracy theories worldwide.' },
      { id: slug('Alexander Soros'), name: 'Alexander Soros', role: 'Chair, Open Society Foundations', bio: 'Son of George Soros who took over leadership of the Open Society Foundations in 2023. PhD in history from UC Berkeley.' }
    ],
    connections: [
      { name: 'Open Society Foundations', type: 'philanthropic arm', description: 'Soros has donated over $32 billion through OSF for democracy and human rights.' },
      { name: 'Bank of England', type: 'famous trade', description: 'Soros "broke the Bank of England" by short-selling pounds in 1992, earning $1 billion.' },
      { name: 'Antisemitic conspiracy theories', type: 'targeted', description: 'Soros is one of the most frequent targets of antisemitic conspiracy theories globally.' },
      { name: 'Viktor Orbán / Hungary', type: 'political adversary', description: 'Hungary\'s government has led campaigns against Soros, forcing CEU out of Hungary.' }
    ]
  }],
  ['United States', {
    name: 'Paramount Pictures',
    id: slug('Paramount Pictures'),
    type: 'film studio',
    category: 'Entertainment & Media',
    description: 'Paramount Pictures is the oldest surviving major film studio in Hollywood, founded in 1912 by Adolph Zukor, a Hungarian-Jewish immigrant who arrived in America as a teenager. Zukor pioneered the concept of feature-length films and the star system in Hollywood. Under his leadership and that of successive Jewish studio heads including Barney Balaban and Robert Evans, Paramount produced some of cinema\'s greatest films including The Godfather, Chinatown, Forrest Gump, Titanic, and the Indiana Jones franchise. The studio was also home to legendary Jewish moguls like Jesse Lasky (co-founder), B.P. Schulberg, and Y. Frank Freeman. Paramount was acquired by Gulf+Western in 1966, then became part of Viacom under Sumner Redstone (born Rothstein), and is now part of Paramount Global, controlled by Shari Redstone. The studio represents the quintessential Jewish-American immigration success story - from Hungarian orphan to founder of a cultural institution that shaped global entertainment. Robert Evans, the legendary Jewish producer who ran the studio in the 1970s, oversaw its greatest creative era.',
    website: 'https://www.paramount.com',
    founded: 1912,
    individuals: [
      { id: slug('Adolph Zukor'), name: 'Adolph Zukor', role: 'Founder', bio: 'Hungarian-Jewish immigrant (1873-1976) who founded Paramount Pictures. Arrived in America as an orphaned teenager. Lived to 103 and witnessed the entire evolution of cinema from silent films to the modern era.' },
      { id: slug('Robert Evans'), name: 'Robert Evans', role: 'Former Studio Head', bio: 'Jewish-American film producer (1930-2019) who headed Paramount Pictures during its 1970s golden age, overseeing The Godfather, Chinatown, and Rosemary\'s Baby. His memoir "The Kid Stays in the Picture" became a classic.' }
    ],
    connections: [
      { name: 'Paramount Global', type: 'parent company', description: 'Paramount Pictures is owned by Paramount Global, controlled by the Redstone family.' },
      { name: 'The Godfather', type: 'landmark film', description: 'Paramount produced The Godfather, widely considered one of the greatest films ever made.' },
      { name: 'Walt Disney Company', type: 'industry rival', description: 'Both are major Hollywood studios with deep Jewish founding histories.' },
      { name: 'Warner Bros.', type: 'industry peer', description: 'Both studios were founded by Jewish immigrants in the early 20th century.' }
    ]
  }],
  ['Israel', {
    name: 'Check Point Software Technologies',
    id: slug('Check Point Software Technologies'),
    type: 'cybersecurity company',
    category: 'Technology',
    description: 'Check Point Software Technologies is an Israeli multinational cybersecurity company that pioneered the commercial firewall industry. Founded in 1993 by Gil Shwed, Marius Nacht, and Shlomo Kramer in Ramat Gan, Israel. Gil Shwed, who conceived the stateful firewall while serving in the Israel Defense Forces\' Unit 8200 (Israel\'s signals intelligence unit), is often called the "father of the firewall." Check Point was one of the first major Israeli tech companies to go public on NASDAQ (1996) and helped establish Israel\'s reputation as a cybersecurity powerhouse. The company generates over $2 billion in annual revenue and protects Fortune 500 companies and government networks worldwide. Shlomo Kramer later co-founded Imperva and Cato Networks, becoming one of the most prolific cybersecurity entrepreneurs. Check Point is a cornerstone of the "Start-Up Nation" narrative, demonstrating how Israeli military intelligence training translates into commercial tech success.',
    website: 'https://www.checkpoint.com',
    founded: 1993,
    individuals: [
      { id: slug('Gil Shwed'), name: 'Gil Shwed', role: 'Founder, Chairman & CEO', bio: 'Israeli tech pioneer who co-founded Check Point and invented the commercial stateful firewall. Served in IDF Unit 8200. One of Israel\'s wealthiest individuals. Has led Check Point for over 30 years.' },
      { id: slug('Shlomo Kramer'), name: 'Shlomo Kramer', role: 'Co-Founder', bio: 'Israeli cybersecurity entrepreneur who co-founded Check Point and later co-founded Imperva and Cato Networks. One of the most prolific cybersecurity entrepreneurs in the world.' }
    ],
    connections: [
      { name: 'Unit 8200', type: 'founders origin', description: 'Check Point was born from technology developed in IDF Unit 8200.' },
      { name: 'Nvidia/Mellanox', type: 'Israeli tech peer', description: 'Both are major Israeli-origin tech companies.' },
      { name: 'Palo Alto Networks', type: 'competitor', description: 'Major competitor in the cybersecurity firewall market.' }
    ]
  }],
  ['Israel', {
    name: 'Wix.com',
    id: slug('Wix.com'),
    type: 'website builder platform',
    category: 'Technology',
    description: 'Wix.com is an Israeli cloud-based web development platform that allows users to create websites through drag-and-drop tools. Founded in 2006 by Avishai Abrahami, Nadav Abrahami, and Giora Kaplan in Tel Aviv. The platform has over 250 million registered users in 190 countries and is one of Israel\'s most successful consumer tech companies. Wix went public on NASDAQ in 2013 and has a market cap of several billion dollars. CEO Avishai Abrahami grew up on a kibbutz and served in the Israeli Air Force. The company has been involved in controversies: it ran a Super Bowl ad in 2015 mocking WordPress, leading to community backlash; it was accused of violating open-source licenses by using WordPress code in its mobile app editor (2016); and has faced criticism for its free tier\'s website advertising and upselling practices. During the October 7, 2023 attack, Wix employees were directly affected, and the company rallied support for Israeli communities.',
    website: 'https://www.wix.com',
    founded: 2006,
    individuals: [
      { id: slug('Avishai Abrahami'), name: 'Avishai Abrahami', role: 'Co-Founder & CEO', bio: 'Israeli entrepreneur who co-founded Wix.com. Grew up on a kibbutz and served in the Israeli Air Force. Built Wix into one of the world\'s leading website builder platforms with over 250 million users.' }
    ],
    connections: [
      { name: 'Israeli tech ecosystem', type: 'major player', description: 'Wix is one of the most prominent Israeli consumer tech companies globally.' },
      { name: 'WordPress/Automattic', type: 'competitor', description: 'Major competitor in the website building space.' },
      { name: 'Squarespace', type: 'competitor', description: 'Both are leading website builder platforms.' }
    ]
  }],
  ['United Kingdom', {
    name: 'Rothschild & Co',
    id: slug('Rothschild and Co'),
    type: 'investment bank',
    category: 'Banking & Financial Services',
    description: 'Rothschild & Co is a multinational investment bank and financial advisory firm, part of the broader Rothschild banking family enterprise that has been the most famous Jewish banking dynasty in history. The family business was founded by Mayer Amschel Rothschild in the Frankfurt Jewish ghetto in the 18th century. He sent his five sons to establish banks in London, Paris, Vienna, Naples, and Frankfurt, creating what became the world\'s first truly international banking network. The British branch, N.M. Rothschild & Sons (now Rothschild & Co), was founded by Nathan Mayer Rothschild in 1811 and financed the Duke of Wellington during the Napoleonic Wars. The Rothschild family has been instrumental in Jewish history: they financed the early Zionist movement and Baron Edmond de Rothschild funded the first Jewish agricultural settlements in Palestine. The family name has unfortunately become the foundation of countless antisemitic conspiracy theories about Jewish control of global finance. The modern firm is a leading independent financial advisory business with operations in 40+ countries.',
    website: 'https://www.rothschildandco.com',
    founded: 1811,
    individuals: [
      { id: slug('Alexandre de Rothschild'), name: 'Alexandre de Rothschild', role: 'Executive Chairman', bio: 'Executive Chairman of Rothschild & Co. Seventh-generation member of the Rothschild banking dynasty. Took over from his father David de Rothschild in 2018.' },
      { id: slug('Mayer Amschel Rothschild'), name: 'Mayer Amschel Rothschild', role: 'Dynasty Founder', bio: 'German-Jewish founder of the Rothschild banking dynasty (1744-1812). Born in the Frankfurt Jewish ghetto. Sent his five sons to establish banks across Europe, creating the world\'s first international banking network.' },
      { id: slug('Nathan Mayer Rothschild'), name: 'Nathan Mayer Rothschild', role: 'Founder of London Branch', bio: 'Founder of N.M. Rothschild & Sons in London (1777-1836). Financed the British war effort against Napoleon and became one of the wealthiest men in the world.' }
    ],
    connections: [
      { name: 'Zionist movement', type: 'historical support', description: 'The Rothschild family financed early Zionism and Jewish settlements in Palestine.' },
      { name: 'Antisemitic conspiracy theories', type: 'targeted', description: 'The Rothschild name has been exploited in antisemitic conspiracy theories about Jewish financial control.' },
      { name: 'LVMH', type: 'advisory', description: 'The Rothschild bank facilitated Bernard Arnault\'s acquisition of LVMH.' },
      { name: 'Goldman Sachs', type: 'industry peer', description: 'Both are leading investment banks with Jewish founding histories.' }
    ]
  }],
  ['United States', {
    name: 'Sackler Family / Purdue Pharma',
    id: slug('Sackler Family Purdue Pharma'),
    type: 'pharmaceutical company',
    category: 'Healthcare & Pharmaceuticals',
    description: 'The Sackler family, a Jewish-American family, owned Purdue Pharma, the manufacturer of OxyContin, and is widely held responsible for its role in the American opioid epidemic that has killed over 500,000 people. The family was founded by three brothers - Arthur, Mortimer, and Raymond Sackler - who were the sons of Jewish immigrants from Ukraine/Poland. Through aggressive and deceptive marketing of OxyContin (claiming it was less addictive than other opioids, which was false), Purdue Pharma generated over $35 billion in revenue. The Sackler family extracted billions in dividends while knowing of the drug\'s addictive nature. Purdue pleaded guilty to federal criminal charges in 2020 and agreed to pay over $8 billion. The family negotiated a controversial bankruptcy settlement of $6 billion for personal liability. Prior to the scandal, the Sackler name was prominent in Jewish philanthropy and arts patronage, with galleries at the Met, Guggenheim, Louvre, and Smithsonian named after them. Most institutions have since removed the Sackler name. The case represents one of the most significant corporate fraud scandals in American history.',
    website: null,
    founded: 1952,
    individuals: [
      { id: slug('Arthur Sackler'), name: 'Arthur Sackler', role: 'Family Patriarch', bio: 'Jewish-American physician, businessman, and philanthropist (1913-1987). Eldest of the three Sackler brothers. Pioneered pharmaceutical advertising practices that later became central to the OxyContin scandal. His estate stressed he died before OxyContin was created.' },
      { id: slug('Richard Sackler'), name: 'Richard Sackler', role: 'Former Chairman', bio: 'Son of Raymond Sackler. Former chairman of Purdue Pharma. Internal documents revealed he pushed aggressive OxyContin marketing and allegedly said "we have to hammer on abusers in every way possible" to deflect blame from the drug.' },
      { id: slug('David Sackler'), name: 'David Sackler', role: 'Former Board Member', bio: 'Grandson of Raymond Sackler. Served on Purdue Pharma\'s board. Part of the family negotiations for the $6 billion settlement.' }
    ],
    connections: [
      { name: 'Opioid epidemic', type: 'responsible party', description: 'Purdue Pharma\'s aggressive OxyContin marketing is widely blamed for fueling the opioid epidemic that killed 500,000+ Americans.' },
      { name: 'McKinsey & Company', type: 'consultant', description: 'McKinsey advised Purdue on strategies to "turbocharge" OxyContin sales, paying $600 million in fines.' },
      { name: 'Metropolitan Museum of Art', type: 'naming rights removed', description: 'The Met removed the Sackler name from its galleries in response to public pressure.' },
      { name: 'Kirkland & Ellis', type: 'legal representation', description: 'Kirkland represented the Sackler family in bankruptcy proceedings.' }
    ]
  }],
  ['United States', {
    name: 'Ralph Lauren Corporation',
    id: slug('Ralph Lauren Corporation'),
    type: 'fashion company',
    category: 'Retail & Consumer Goods',
    description: 'Ralph Lauren Corporation is a global fashion empire founded in 1967 by Ralph Lauren (born Ralph Lifshitz), a Jewish-American fashion designer from the Bronx, New York. Born to Ashkenazi Jewish immigrant parents from Belarus, Lauren changed his surname as a teenager. Starting with a line of men\'s neckties, he built an empire that came to define American luxury fashion and the aspirational "preppy" lifestyle. The Ralph Lauren brand encompasses Polo Ralph Lauren, Purple Label, Double RL, and Lauren by Ralph Lauren, with operations in fashion, home, and fragrances. Lauren is one of the wealthiest people in the fashion industry with a net worth exceeding $6 billion. He has been a significant donor to Jewish causes and broader philanthropy, including a $25 million gift to Memorial Sloan Kettering Cancer Center. The company has faced controversies over price discrimination allegations, cultural appropriation debates, and supply chain labor practices.',
    website: 'https://www.ralphlauren.com',
    founded: 1967,
    individuals: [
      { id: slug('Ralph Lauren'), name: 'Ralph Lauren', role: 'Founder & Executive Chairman', bio: 'Jewish-American fashion designer (born Ralph Lifshitz) from the Bronx. Son of Ashkenazi Jewish immigrants from Belarus. Built a fashion empire that defined American luxury style. One of the wealthiest fashion figures in history with a net worth exceeding $6 billion. Awarded the Presidential Medal of Freedom in 2024.' }
    ],
    connections: [
      { name: 'Calvin Klein', type: 'industry peer', description: 'Both are iconic American fashion brands founded by Jewish designers from New York.' },
      { name: 'Donna Karan/DKNY', type: 'industry peer', description: 'Both are major fashion brands founded by Jewish-American designers.' },
      { name: 'American Jewish identity', type: 'cultural impact', description: 'Lauren\'s brand represents the Jewish-American dream of reinvention and success.' }
    ]
  }]
];

for (const [country, entry] of newEntriesData) {
  if (addEntry(country, entry)) newEntries++;
  for (const ind of (entry.individuals || [])) {
    addPerson(ind.id, ind.name, ind.bio);
  }
}
console.log(`  Added ${newEntries} new entries`);

// ============================================================
// PART 3: Re-sort and rebuild affiliations  
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
