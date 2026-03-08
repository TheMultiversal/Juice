#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 7 - Expanding 4→7+ individuals
 * Batch 1: Technology, Entertainment & Media, Banking, Investment, Healthcare
 */
const fs = require('fs');
const path = require('path');
const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');
const JD = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const PD = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));
const people = PD.people || PD;
const hasPeopleWrapper = !!PD.people;

function findEntry(id){for(const c in JD.countries){const e=JD.countries[c].find(x=>x.id===id);if(e)return{entry:e,country:c};}return null;}
function addInd(eid,ind){const f=findEntry(eid);if(!f)return false;if(!f.entry.individuals)f.entry.individuals=[];if(f.entry.individuals.some(i=>i.id===ind.id))return false;f.entry.individuals.push(ind);return true;}
function updatePerson(id,name,bio,affs){if(!people[id])people[id]={name,bio:bio||'',notes:'',affiliations:affs||[]};else{if(bio&&(!people[id].bio||bio.length>people[id].bio.length))people[id].bio=bio;if(affs){if(!people[id].affiliations)people[id].affiliations=[];for(const a of affs){if(!people[id].affiliations.some(x=>x.entryId===a.entryId))people[id].affiliations.push(a);}}}}
function makeAff(eid){const f=findEntry(eid);if(!f)return null;return{organization:f.entry.name,role:'',entryId:eid,country:f.country};}
let added=0,missed=[];
function batch(eid,inds){const f=findEntry(eid);if(!f){missed.push(eid);return;}for(const ind of inds){if(addInd(eid,ind))added++;const a=makeAff(eid);if(a){a.role=ind.role;updatePerson(ind.id,ind.name,ind.bio,[a]);}}}

// ============================================================
// TECHNOLOGY (43 entries)
// ============================================================
console.log('=== TECHNOLOGY ===');

batch('nvidia', [
  { id: 'ajay-puri-nvidia', name: 'Ajay Puri', role: 'EVP Worldwide Field Operations', bio: 'Ajay Puri serves as Executive Vice President of Worldwide Field Operations at Nvidia, overseeing global sales and partnerships for the $3+ trillion AI chip giant.' },
  { id: 'debora-shoquist-nvidia', name: 'Debora Shoquist', role: 'EVP of Operations', bio: 'Debora Shoquist serves as Executive Vice President of Operations at Nvidia, managing the supply chain and manufacturing for the world\'s most valuable semiconductor company.' },
  { id: 'dwight-diercks-nvidia', name: 'Dwight Diercks', role: 'SVP of Software Engineering', bio: 'Dwight Diercks serves as Senior Vice President of Software Engineering at Nvidia, overseeing CUDA and the software ecosystem that is central to AI development.' }
]);

batch('meta-platforms-facebook', [
  { id: 'andrew-bosworth-meta', name: 'Andrew Bosworth', role: 'CTO', bio: 'Andrew "Boz" Bosworth serves as Chief Technology Officer of Meta Platforms, leading the Reality Labs division including Quest VR headsets and the company\'s metaverse strategy.' },
  { id: 'javier-olivan-meta', name: 'Javier Olivan', role: 'COO', bio: 'Javier Olivan serves as Chief Operating Officer of Meta Platforms, succeeding Sheryl Sandberg. He oversees business operations, ads, and the company\'s family of apps.' },
  { id: 'chris-cox-meta', name: 'Chris Cox', role: 'Chief Product Officer', bio: 'Chris Cox serves as Chief Product Officer of Meta Platforms, overseeing product direction for Facebook, Instagram, WhatsApp, and Threads.' }
]);

batch('google-alphabet-inc', [
  { id: 'prabhakar-raghavan-google', name: 'Prabhakar Raghavan', role: 'SVP of Knowledge & Information', bio: 'Prabhakar Raghavan serves as Senior Vice President at Google overseeing Search, Ads, Geo, and Commerce, leading the core business of the $300+ billion revenue company.' },
  { id: 'kent-walker-google', name: 'Kent Walker', role: 'President of Global Affairs', bio: 'Kent Walker serves as President of Global Affairs and Chief Legal Officer at Alphabet, managing the company\'s regulatory and policy strategy worldwide.' },
  { id: 'philipp-schindler-google', name: 'Philipp Schindler', role: 'SVP & Chief Business Officer', bio: 'Philipp Schindler serves as SVP and Chief Business Officer of Google, overseeing the advertising business that generates over 80% of Alphabet\'s revenue.' }
]);

batch('alphabet-google', [
  { id: 'jeff-dean-google', name: 'Jeff Dean', role: 'Chief Scientist', bio: 'Jeff Dean serves as Chief Scientist at Google DeepMind, having previously led Google AI. He co-invented key technologies like MapReduce and TensorFlow that shaped modern computing.' },
  { id: 'demis-hassabis-alphabet', name: 'Demis Hassabis', role: 'CEO of Google DeepMind', bio: 'Demis Hassabis is CEO of Google DeepMind and Nobel Prize winner in Chemistry (2024). He leads Alphabet\'s AI research lab that created AlphaFold and Gemini.' },
  { id: 'thomas-kurian-google', name: 'Thomas Kurian', role: 'CEO of Google Cloud', bio: 'Thomas Kurian serves as CEO of Google Cloud, growing the division to $30+ billion in annual revenue and making it a major competitor to AWS and Azure.' }
]);

batch('salesforce', [
  { id: 'amy-weaver-salesforce', name: 'Amy Weaver', role: 'President & CFO', bio: 'Amy Weaver serves as President and CFO of Salesforce, steering the financial strategy of the $30+ billion CRM giant through its transition to AI-powered products.' },
  { id: 'clara-shih-salesforce', name: 'Clara Shih', role: 'CEO of Salesforce AI', bio: 'Clara Shih serves as CEO of Salesforce AI, leading the company\'s artificial intelligence strategy including Einstein GPT and AI-powered CRM innovations.' },
  { id: 'brian-millham-salesforce', name: 'Brian Millham', role: 'President & COO', bio: 'Brian Millham serves as President and Chief Operating Officer of Salesforce, overseeing the go-to-market organization and customer success operations.' }
]);

batch('palantir-technologies', [
  { id: 'shyam-sankar-palantir', name: 'Shyam Sankar', role: 'CTO', bio: 'Shyam Sankar serves as CTO of Palantir Technologies, overseeing the engineering of the data analytics platform used by governments and enterprises worldwide.' },
  { id: 'ryan-taylor-palantir', name: 'Ryan Taylor', role: 'Chief Revenue Officer', bio: 'Ryan Taylor serves as Chief Revenue Officer and Chief Legal Officer at Palantir Technologies, driving revenue growth for the Peter Thiel-co-founded data analytics firm.' },
  { id: 'dave-glazer-palantir', name: 'Dave Glazer', role: 'CFO', bio: 'Dave Glazer serves as CFO of Palantir Technologies, managing the finances of the data analytics company that has seen its stock surge on AI demand.' }
]);

batch('uber-technologies', [
  { id: 'nelson-chai-uber', name: 'Nelson Chai', role: 'Former CFO', bio: 'Nelson Chai served as CFO of Uber Technologies, guiding the ride-hailing giant to profitability and managing its complex financial structure through the pandemic.' },
  { id: 'tony-west-uber', name: 'Tony West', role: 'Chief Legal Officer', bio: 'Tony West serves as Chief Legal Officer of Uber Technologies, managing the company\'s regulatory, legal, and government affairs globally.' },
  { id: 'andrew-macdonald-uber', name: 'Andrew Macdonald', role: 'SVP of Mobility', bio: 'Andrew Macdonald serves as SVP of Mobility at Uber Technologies, leading the core ride-hailing business that operates in 10,000+ cities worldwide.' }
]);

batch('airbnb', [
  { id: 'dave-stephenson-airbnb', name: 'Dave Stephenson', role: 'CFO', bio: 'Dave Stephenson serves as CFO of Airbnb, managing the finances of the $80+ billion short-term rental platform that has transformed the global hospitality industry.' },
  { id: 'catherine-powell-airbnb', name: 'Catherine Powell', role: 'Chief Hosting Officer', bio: 'Catherine Powell served as Chief Hosting Officer at Airbnb, overseeing the platform\'s relationship with its 4+ million hosts worldwide.' },
  { id: 'nate-blecharczyk-airbnb', name: 'Nathan Blecharczyk', role: 'Chief Strategy Officer', bio: 'Nathan Blecharczyk is Co-founder and Chief Strategy Officer of Airbnb, the technical architect behind the platform that has facilitated over 1.5 billion guest arrivals.' }
]);

batch('microsoft-israel-r-d', [
  { id: 'assaf-rappaport-microsoft', name: 'Assaf Rappaport', role: 'Former Corporate VP', bio: 'Assaf Rappaport served as Corporate VP at Microsoft after the $500M acquisition of his company Adallom. He later founded Wiz, the cybersecurity startup valued at $12 billion.' },
  { id: 'rani-borkar-microsoft-il', name: 'Rani Borkar', role: 'Former Corporate VP', bio: 'Rani Borkar served as Corporate VP of Microsoft\'s Israel R&D Center, one of the company\'s largest engineering centers outside Redmond with 2,000+ employees.' },
  { id: 'karni-chagal-feferkorn-ms', name: 'Karni Chagal-Feferkorn', role: 'Deputy General Counsel', bio: 'Karni Chagal-Feferkorn serves in legal leadership at Microsoft Israel, supporting the R&D center that works on Azure, cybersecurity, and AI technologies.' }
]);

batch('palo-alto-networks', [
  { id: 'lee-klarich-panw', name: 'Lee Klarich', role: 'Chief Product Officer', bio: 'Lee Klarich serves as Chief Product Officer at Palo Alto Networks, shaping the cybersecurity product portfolio of the $100+ billion market cap company.' },
  { id: 'dipak-golechha-panw', name: 'Dipak Golechha', role: 'CFO', bio: 'Dipak Golechha serves as CFO of Palo Alto Networks, managing the financial operations of one of the world\'s largest cybersecurity companies.' },
  { id: 'bj-jenkins-panw', name: 'BJ Jenkins', role: 'President', bio: 'BJ Jenkins serves as President of Palo Alto Networks, overseeing go-to-market operations for the Israeli-founded cybersecurity giant.' }
]);

batch('databricks', [
  { id: 'ali-ghodsi-databricks', name: 'Ali Ghodsi', role: 'Co-founder & CEO', bio: 'Ali Ghodsi is Co-founder and CEO of Databricks, the $43 billion data and AI platform company. Born in Iran and raised in Sweden, he co-created Apache Spark at UC Berkeley.' },
  { id: 'matei-zaharia-databricks', name: 'Matei Zaharia', role: 'Co-founder & CTO', bio: 'Matei Zaharia is Co-founder and CTO of Databricks and creator of Apache Spark. He is also a professor at Stanford, pioneering work in large-scale data processing.' },
  { id: 'reynold-xin-databricks', name: 'Reynold Xin', role: 'Co-founder & Chief Architect', bio: 'Reynold Xin is Co-founder and Chief Architect of Databricks, leading the technical architecture of the data lakehouse platform used by thousands of enterprises.' }
]);

batch('slack-technologies', [
  { id: 'cal-henderson-slack', name: 'Cal Henderson', role: 'Co-founder & CTO', bio: 'Cal Henderson is Co-founder and CTO of Slack Technologies, building the messaging platform from a failed gaming venture into a $27.7 billion acquisition by Salesforce.' },
  { id: 'tamar-yehoshua-slack', name: 'Tamar Yehoshua', role: 'Chief Product Officer', bio: 'Tamar Yehoshua served as Chief Product Officer at Slack Technologies, shaping the product experience of the workplace messaging platform with 200,000+ paid customers.' },
  { id: 'allen-shim-slack', name: 'Allen Shim', role: 'CFO', bio: 'Allen Shim served as CFO of Slack Technologies, guiding the company\'s financial strategy through its IPO and the $27.7 billion acquisition by Salesforce in 2021.' }
]);

batch('elon-musk-connections', [
  { id: 'gwynne-shotwell-spacex', name: 'Gwynne Shotwell', role: 'President & COO of SpaceX', bio: 'Gwynne Shotwell serves as President and COO of SpaceX, managing the day-to-day operations of Elon Musk\'s $180 billion space venture that leads commercial launch services.' },
  { id: 'jared-birchall-musk', name: 'Jared Birchall', role: 'Wealth Manager & Neuralink CEO', bio: 'Jared Birchall manages Elon Musk\'s personal wealth through Excession LLC and serves as CEO of Neuralink, Musk\'s brain-computer interface startup.' },
  { id: 'david-sacks-musk-circle', name: 'David Sacks', role: 'PayPal Mafia / AI Czar', bio: 'David Sacks, former PayPal COO and Yammer CEO, is part of the Elon Musk inner circle. He was appointed White House AI & Crypto Czar in the Trump administration.' }
]);

batch('reid-hoffman-connections', [
  { id: 'jeff-weiner-linkedin', name: 'Jeff Weiner', role: 'Former LinkedIn CEO', bio: 'Jeff Weiner served as CEO of LinkedIn for over a decade, growing the professional network from 33 million to 700+ million members and orchestrating the $26.2 billion Microsoft acquisition.' },
  { id: 'sarah-smith-reid-hoffman', name: 'Sarah Guo', role: 'Greylock Partner / Conviction VC', bio: 'Sarah Guo, former Greylock partner alongside Reid Hoffman, founded Conviction, an AI-focused venture firm. She is prominent in the AI startup investment ecosystem.' },
  { id: 'allen-blue-linkedin', name: 'Allen Blue', role: 'Co-founder of LinkedIn', bio: 'Allen Blue is Co-founder of LinkedIn, having helped Reid Hoffman build the professional networking platform from launch in 2003 to the world\'s largest professional network.' }
]);

batch('snyk', [
  { id: 'peter-mckay-snyk', name: 'Peter McKay', role: 'CEO', bio: 'Peter McKay serves as CEO of Snyk, the Israeli-founded developer security company valued at $7.4 billion that helps developers find and fix vulnerabilities in code and containers.' },
  { id: 'guy-podjarny-snyk', name: 'Guy Podjarny', role: 'Founder', bio: 'Guy Podjarny is the founder of Snyk, the Israeli cybersecurity company that pioneered developer-first security and grew to over $200 million in annual recurring revenue.' },
  { id: 'danny-grander-snyk', name: 'Danny Grander', role: 'Co-founder & Chief Security Researcher', bio: 'Danny Grander is Co-founder of Snyk, leading security research at the Israeli developer security platform that has become the standard for open-source vulnerability scanning.' }
]);

batch('monday-com', [
  { id: 'eran-zinman-monday', name: 'Eran Zinman', role: 'Co-founder & Co-CEO', bio: 'Eran Zinman is Co-founder and Co-CEO of Monday.com, the Israeli work management platform that went public on NASDAQ in 2021 at a $6.8 billion valuation.' },
  { id: 'eliran-glazer-monday', name: 'Eliran Glazer', role: 'CFO', bio: 'Eliran Glazer serves as CFO of Monday.com, helping steer the Israeli SaaS company to profitability with 225,000+ customers worldwide.' },
  { id: 'daniel-lereya-monday', name: 'Daniel Lereya', role: 'VP of R&D', bio: 'Daniel Lereya serves as VP of R&D at Monday.com, overseeing product development for the Israeli work operating system that competes with Asana, Notion, and Jira.' }
]);

batch('taboola', [
  { id: 'eldad-maniv-taboola', name: 'Eldad Maniv', role: 'President & COO', bio: 'Eldad Maniv serves as President and COO of Taboola, the Israeli content discovery platform that reaches 500 million daily active users across 9,000 publisher partnerships.' },
  { id: 'stephen-walker-taboola', name: 'Stephen Walker', role: 'CFO', bio: 'Stephen Walker serves as CFO of Taboola, managing finances of the Israeli ad-tech company that went public via SPAC in 2021.' },
  { id: 'lior-golan-taboola', name: 'Lior Golan', role: 'CTO', bio: 'Lior Golan serves as CTO of Taboola, leading the technology behind the Israeli content recommendation platform\'s AI-driven ad network.' }
]);

batch('jfrog', [
  { id: 'shlomi-ben-haim-jfrog', name: 'Shlomi Ben Haim', role: 'Co-founder & CEO', bio: 'Shlomi Ben Haim is Co-founder and CEO of JFrog, the Israeli DevOps company whose Artifactory platform manages software packages for millions of developers.' },
  { id: 'yoav-landman-jfrog', name: 'Yoav Landman', role: 'Co-founder & CTO', bio: 'Yoav Landman is Co-founder and CTO of JFrog, creator of Artifactory, the universal artifact management platform central to enterprise software supply chains.' },
  { id: 'jacob-schulman-jfrog', name: 'Jacob Schulman', role: 'CFO', bio: 'Jacob Schulman serves as CFO of JFrog, guiding the Israeli DevOps company through its 2020 NASDAQ IPO and revenue growth beyond $300 million annually.' }
]);

batch('waze', [
  { id: 'noam-bardin-waze', name: 'Noam Bardin', role: 'Former CEO', bio: 'Noam Bardin served as CEO of Waze, the Israeli navigation app, through its $1.15 billion acquisition by Google in 2013 and beyond. He later founded Post News.' },
  { id: 'uri-levine-waze', name: 'Uri Levine', role: 'Co-founder', bio: 'Uri Levine is Co-founder of Waze, the Israeli crowdsourced navigation app acquired by Google for $1.15 billion. He is a prolific tech entrepreneur and author of "Fall in Love with the Problem."' },
  { id: 'amir-shinar-waze', name: 'Amir Shinar', role: 'Co-founder', bio: 'Amir Shinar is Co-founder of Waze, one of the original creators of the Israeli GPS navigation startup that pioneered community-based traffic reporting before selling to Google.' }
]);

batch('mobileye-global', [
  { id: 'amnon-shashua-mobileye', name: 'Amnon Shashua', role: 'Co-founder, President & CEO', bio: 'Amnon Shashua is Co-founder, President and CEO of Mobileye, the Israeli autonomous driving company. Intel acquired Mobileye for $15.3 billion in 2017 and re-IPO\'d it in 2022.' },
  { id: 'shai-shalev-shwartz-mobileye', name: 'Shai Shalev-Shwartz', role: 'CTO', bio: 'Shai Shalev-Shwartz serves as CTO of Mobileye, leading the AI and machine learning development for the autonomous driving technology used by 50+ automakers.' },
  { id: 'nimrod-nehushtan-mobileye', name: 'Nimrod Nehushtan', role: 'EVP & General Manager', bio: 'Nimrod Nehushtan serves as EVP at Mobileye, managing business operations for the Israeli self-driving technology company that powers ADAS systems in over 150 million vehicles.' }
]);

batch('deepmind', [
  { id: 'shane-legg-deepmind', name: 'Shane Legg', role: 'Co-founder & Chief AGI Scientist', bio: 'Shane Legg is Co-founder and Chief AGI Scientist at Google DeepMind, having pioneered the definition of artificial general intelligence and co-founding the AI lab in 2010.' },
  { id: 'mustafa-suleyman-deepmind', name: 'Mustafa Suleyman', role: 'Co-founder', bio: 'Mustafa Suleyman is a Co-founder of DeepMind and later CEO of Microsoft AI. He co-founded Inflection AI and was named one of TIME\'s most influential AI leaders.' },
  { id: 'lila-ibrahim-deepmind', name: 'Lila Ibrahim', role: 'COO', bio: 'Lila Ibrahim serves as COO of Google DeepMind, overseeing operations of the AI research lab behind AlphaGo, AlphaFold, and the Gemini model family.' }
]);

batch('wix-com-us-operations', [
  { id: 'avishai-abrahami-wix', name: 'Avishai Abrahami', role: 'Co-founder & CEO', bio: 'Avishai Abrahami is Co-founder and CEO of Wix.com, the Israeli website building platform with 250+ million users in 190 countries.' },
  { id: 'nir-zohar-wix', name: 'Nir Zohar', role: 'President & COO', bio: 'Nir Zohar serves as President and COO of Wix.com, overseeing the Israeli tech company\'s global operations and business strategy.' },
  { id: 'lior-shemesh-wix', name: 'Lior Shemesh', role: 'CFO', bio: 'Lior Shemesh serves as CFO of Wix.com, managing the finances of the Israeli website-builder platform that generates $1.5+ billion in annual revenue.' }
]);

batch('watergen', [
  { id: 'michael-mirilashvili-watergen', name: 'Michael Mirilashvili', role: 'President', bio: 'Michael Mirilashvili is President of Watergen, the Israeli company that generates drinking water from air. He is also VP of the World Jewish Congress and a major philanthropist.' },
  { id: 'maxim-pasik-watergen', name: 'Maxim Pasik', role: 'CEO', bio: 'Maxim Pasik serves as CEO of Watergen, leading the Israeli atmospheric water generation company that has deployed systems in disaster zones and underserved communities worldwide.' },
  { id: 'yehuda-kaploun-watergen', name: 'Yehuda Kaploun', role: 'President of Watergen USA', bio: 'Yehuda Kaploun serves as President of Watergen USA, expanding the Israeli water-from-air technology company\'s presence in North America.' }
]);

batch('mellanox-technologies-nvidia', [
  { id: 'michael-kagan-mellanox', name: 'Michael Kagan', role: 'CTO of Nvidia Networking', bio: 'Michael Kagan serves as CTO of Networking at Nvidia, formerly CTO of Mellanox Technologies. He led the development of InfiniBand networking technology central to AI data centers.' },
  { id: 'marc-sultzbaugh-mellanox', name: 'Marc Sultzbaugh', role: 'SVP of Sales', bio: 'Marc Sultzbaugh served as SVP of Worldwide Sales at Mellanox Technologies, growing the Israeli networking company into the dominant supplier of data center interconnects.' },
  { id: 'amir-prescher-mellanox', name: 'Amir Prescher', role: 'VP of Software', bio: 'Amir Prescher served as VP of Software Engineering at Mellanox Technologies, developing the software stack that complemented the Israeli company\'s high-performance networking hardware.' }
]);

batch('storedot', [
  { id: 'doron-myersdorf-storedot', name: 'Doron Myersdorf', role: 'Co-founder & CEO', bio: 'Doron Myersdorf is Co-founder and CEO of StoreDot, the Israeli battery technology company that has developed extreme fast charging (XFC) batteries that can charge in 5 minutes.' },
  { id: 'simon-litsyn-storedot', name: 'Simon Litsyn', role: 'Co-founder & CTO', bio: 'Simon Litsyn is Co-founder and CTO of StoreDot, leading the R&D of the Israeli extreme fast charging battery company backed by Samsung, BP, and Daimler.' },
  { id: 'nicki-skarek-storedot', name: 'Nicki Skarek', role: 'CFO', bio: 'Nicki Skarek serves as CFO of StoreDot, managing the finances of the Israeli battery startup that has raised over $200 million for its groundbreaking XFC technology.' }
]);

batch('varonis-systems', [
  { id: 'yaki-faitelson-varonis', name: 'Yaki Faitelson', role: 'Co-founder, Chairman & CEO', bio: 'Yaki Faitelson is Co-founder, Chairman and CEO of Varonis Systems, the Israeli cybersecurity company specializing in data security and analytics with a $5+ billion market cap.' },
  { id: 'ohad-korkus-varonis', name: 'Ohad Korkus', role: 'Co-founder & CTO', bio: 'Ohad Korkus is Co-founder and CTO of Varonis Systems, leading the technology development for the Israeli data security platform used by thousands of enterprise customers.' },
  { id: 'guy-melamed-varonis', name: 'Guy Melamed', role: 'CFO & COO', bio: 'Guy Melamed serves as CFO and COO of Varonis, steering the Israeli cybersecurity company through its transition from on-premises to SaaS delivery model.' }
]);

batch('innoviz-technologies', [
  { id: 'omer-keilaf-innoviz', name: 'Omer David Keilaf', role: 'Co-founder & CEO', bio: 'Omer David Keilaf is Co-founder and CEO of Innoviz Technologies, the Israeli lidar company whose sensors are used by BMW and other automakers for autonomous driving.' },
  { id: 'oren-rosenzweig-innoviz', name: 'Oren Rosenzweig', role: 'Co-founder & CTO', bio: 'Oren Rosenzweig is Co-founder and CTO of Innoviz Technologies, developing the solid-state lidar technology that enables next-generation autonomous vehicles.' },
  { id: 'eldar-cegla-innoviz', name: 'Eldar Cegla', role: 'Co-founder & VP of R&D', bio: 'Eldar Cegla is Co-founder and VP of R&D at Innoviz Technologies, contributing to the Israeli lidar company\'s breakthrough in solid-state sensor technology.' }
]);

batch('orcam-technologies', [
  { id: 'amnon-shashua-orcam', name: 'Amnon Shashua', role: 'Co-founder & CEO', bio: 'Amnon Shashua is Co-founder and co-CEO of Orcam Technologies, the Israeli AI company that develops wearable assistive devices for the visually impaired. He also co-founded Mobileye.' },
  { id: 'ziv-aviram-orcam', name: 'Ziv Aviram', role: 'Co-founder & Co-CEO', bio: 'Ziv Aviram is Co-founder and co-CEO of Orcam Technologies, having previously co-founded Mobileye with Amnon Shashua. Orcam\'s MyEye device has helped hundreds of thousands of visually impaired users.' },
  { id: 'yonatan-wexler-orcam', name: 'Yonatan Wexler', role: 'VP R&D', bio: 'Yonatan Wexler serves as VP of R&D at Orcam Technologies, leading the development of the Israeli company\'s AI-powered assistive technology.' }
]);

batch('walkme', [
  { id: 'dan-adika-walkme', name: 'Dan Adika', role: 'Co-founder & CEO', bio: 'Dan Adika is Co-founder and CEO of WalkMe, the Israeli digital adoption platform that went public on NASDAQ in 2021 and was acquired by SAP for $1.5 billion in 2024.' },
  { id: 'rafael-sweary-walkme', name: 'Rafael Sweary', role: 'Co-founder & President', bio: 'Rafael Sweary is Co-founder and President of WalkMe, helping build the Israeli digital adoption platform from startup to a $1.5 billion SAP acquisition.' },
  { id: 'hagit-ynon-walkme', name: 'Hagit Ynon', role: 'CFO', bio: 'Hagit Ynon served as CFO of WalkMe, guiding the Israeli digital adoption platform through its 2021 IPO and subsequent acquisition by SAP.' }
]);

batch('orbotech-kla', [
  { id: 'asher-levy-orbotech', name: 'Asher Levy', role: 'Former CEO', bio: 'Asher Levy served as President and CEO of Orbotech, the Israeli electronics inspection company acquired by KLA Corporation for $3.4 billion in 2019.' },
  { id: 'yochai-richter-orbotech', name: 'Yochai Richter', role: 'VP & General Manager', bio: 'Yochai Richter served as VP and General Manager at Orbotech, leading the Israeli company\'s semiconductor inspection equipment business before the KLA acquisition.' },
  { id: 'ran-eshel-orbotech', name: 'Ran Eshel', role: 'SVP of Operations', bio: 'Ran Eshel served in senior operations leadership at Orbotech, managing manufacturing and supply chain for the Israeli electronics inspection company.' }
]);

batch('fiverr-international', [
  { id: 'micha-kaufman-fiverr', name: 'Micha Kaufman', role: 'Co-founder & CEO', bio: 'Micha Kaufman is Co-founder and CEO of Fiverr International, the Israeli freelance services marketplace listed on NYSE with millions of buyers and sellers.' },
  { id: 'shai-wininger-fiverr', name: 'Shai Wininger', role: 'Co-founder & President', bio: 'Shai Wininger is Co-founder and President of Fiverr, having co-created the Israeli gig economy platform. He also co-founded Lemonade, the AI-powered insurance company.' },
  { id: 'ofer-katz-fiverr', name: 'Ofer Katz', role: 'CFO', bio: 'Ofer Katz serves as CFO of Fiverr International, managing the finances of the Israeli freelance marketplace that has facilitated millions of digital service transactions.' }
]);

batch('fiverr', [
  { id: 'micha-kaufman-fiverr2', name: 'Micha Kaufman', role: 'Co-founder & CEO', bio: 'Micha Kaufman is Co-founder and CEO of Fiverr, the Israeli freelance services marketplace that has revolutionized the gig economy with services starting at $5.' },
  { id: 'hila-klein-fiverr', name: 'Hila Segal', role: 'Chief Marketing Officer', bio: 'Hila Segal serves as VP of Marketing at Fiverr, driving brand awareness and growth for the Israeli freelance marketplace platform.' },
  { id: 'gali-arnon-fiverr', name: 'Gali Arnon', role: 'Chief Business Officer', bio: 'Gali Arnon serves as Chief Business Officer of Fiverr, overseeing business development and strategic partnerships for the Israeli gig economy platform.' }
]);

batch('tower-semiconductor', [
  { id: 'russell-ellwanger-tower', name: 'Russell Ellwanger', role: 'CEO', bio: 'Russell Ellwanger serves as CEO of Tower Semiconductor, the Israeli specialty foundry that manufactures chips for analog, RF, and power management applications. Intel attempted a $5.4B acquisition in 2022.' },
  { id: 'ilan-flato-tower', name: 'Ilan Flato', role: 'CFO', bio: 'Ilan Flato serves as CFO of Tower Semiconductor, managing finances of the Israeli specialty chip manufacturer with foundries in Israel, Japan, and the US.' },
  { id: 'noit-levi-tower', name: 'Noit Levi', role: 'SVP & General Counsel', bio: 'Noit Levi serves as SVP, General Counsel and Corporate Secretary of Tower Semiconductor, handling legal and corporate governance for the Israeli foundry company.' }
]);

batch('sapiens-international', [
  { id: 'roni-al-dor-sapiens', name: 'Roni Al-Dor', role: 'President & CEO', bio: 'Roni Al-Dor serves as President and CEO of Sapiens International, the Israeli insurance software company providing digital platforms to over 600 financial institutions worldwide.' },
  { id: 'roni-giladi-sapiens', name: 'Roni Giladi', role: 'CFO', bio: 'Roni Giladi serves as CFO of Sapiens International, managing the finances of the Israeli insurance technology company with $500+ million in annual revenue.' },
  { id: 'alex-zukerman-sapiens', name: 'Alex Zukerman', role: 'EVP & Head of Americas', bio: 'Alex Zukerman serves as EVP and Head of Americas at Sapiens International, leading the Israeli insurtech\'s operations in its largest geographic market.' }
]);

batch('arm-holdings', [
  { id: 'rene-haas-arm', name: 'René Haas', role: 'CEO', bio: 'René Haas serves as CEO of ARM Holdings, the British chip design company whose architecture powers 99% of smartphones. ARM went public in 2023 at a $65 billion valuation.' },
  { id: 'jason-child-arm', name: 'Jason Child', role: 'CFO', bio: 'Jason Child serves as CFO of ARM Holdings, overseeing the financial strategy of the SoftBank-controlled chip design company during its massive AI-driven growth.' },
  { id: 'drew-henry-arm', name: 'Drew Henry', role: 'SVP of IP Products Group', bio: 'Drew Henry served as SVP at ARM Holdings, leading product groups for the chip architecture company whose designs are in over 280 billion chips.' }
]);

batch('delivery-hero', [
  { id: 'niklas-ostberg-deliveryhero', name: 'Niklas Östberg', role: 'Co-founder & CEO', bio: 'Niklas Östberg is Co-founder and CEO of Delivery Hero, the Berlin-based food delivery giant operating in 70+ countries with billions in annual revenue.' },
  { id: 'emmanuel-thomassin-dh', name: 'Emmanuel Thomassin', role: 'CFO', bio: 'Emmanuel Thomassin serves as CFO of Delivery Hero, managing the finances of the German food delivery company that competes globally with Uber Eats and DoorDash.' },
  { id: 'orri-hauksson-dh', name: 'Ørri Hauksson', role: 'CPO', bio: 'Ørri Hauksson serves as Chief Product Officer at Delivery Hero, leading product development for the Berlin-based delivery platform.' }
]);

batch('atlassian', [
  { id: 'mike-cannon-brookes-atlassian', name: 'Mike Cannon-Brookes', role: 'Co-founder & Co-CEO', bio: 'Mike Cannon-Brookes is Co-founder and Co-CEO of Atlassian, the Australian collaboration software company behind Jira and Confluence, worth $40+ billion.' },
  { id: 'scott-farquhar-atlassian', name: 'Scott Farquhar', role: 'Co-founder & Co-CEO', bio: 'Scott Farquhar is Co-founder and Co-CEO of Atlassian, building the Australian software company from a $10,000 credit card startup to a global enterprise worth tens of billions.' },
  { id: 'joe-binz-atlassian', name: 'Joe Binz', role: 'CFO', bio: 'Joe Binz serves as CFO of Atlassian, managing the finances of the Australian collaboration software company used by 300,000+ organizations worldwide.' }
]);

batch('mercado-libre', [
  { id: 'marcos-galperin-meli', name: 'Marcos Galperin', role: 'Founder, Chairman & CEO', bio: 'Marcos Galperin is Founder, Chairman and CEO of Mercado Libre, Latin America\'s largest e-commerce company worth $80+ billion focused on marketplace and fintech.' },
  { id: 'pedro-arnt-meli', name: 'Pedro Arnt', role: 'Former CFO', bio: 'Pedro Arnt served as CFO of Mercado Libre for over a decade, helping grow the Argentine e-commerce giant into a $80+ billion company. He later became CFO of Shopify.' },
  { id: 'daniel-rabinovich-meli', name: 'Daniel Rabinovich', role: 'COO', bio: 'Daniel Rabinovich serves as COO of Mercado Libre, overseeing operations of the Argentine e-commerce and fintech platform that serves 200+ million users across Latin America.' }
]);

batch('yandex', [
  { id: 'arkady-volozh-yandex', name: 'Arkady Volozh', role: 'Co-founder & Former CEO', bio: 'Arkady Volozh is the Co-founder and former CEO of Yandex, Russia\'s largest search engine and tech company. Born in Kazakhstan to a Jewish family, he built Yandex into a $10+ billion company.' },
  { id: 'ilya-segalovich-yandex', name: 'Ilya Segalovich', role: 'Co-founder & CTO (deceased)', bio: 'Ilya Segalovich (1964-2013) was Co-founder and CTO of Yandex, co-creating the Russian search engine with Arkady Volozh. Both were from Jewish families in the Soviet Union.' },
  { id: 'tigran-khudaverdyan-yandex', name: 'Tigran Khudaverdyan', role: 'Former Managing Director', bio: 'Tigran Khudaverdyan served as Managing Director of Yandex, overseeing the day-to-day operations of Russia\'s tech giant before departing amid international sanctions.' }
]);

batch('booking-com', [
  { id: 'glenn-fogel-booking', name: 'Glenn Fogel', role: 'CEO of Booking Holdings', bio: 'Glenn Fogel serves as CEO of Booking Holdings, the parent company of Booking.com, Priceline, and Kayak with $21+ billion in annual revenue.' },
  { id: 'david-goulden-booking', name: 'David Goulden', role: 'CFO of Booking Holdings', bio: 'David Goulden serves as CFO of Booking Holdings, managing the finances of the world\'s largest online travel platform processing over $150 billion in gross bookings annually.' },
  { id: 'arjan-dijk-booking', name: 'Arjan Dijk', role: 'SVP & CMO', bio: 'Arjan Dijk serves as SVP and Chief Marketing Officer at Booking.com, leading marketing strategy for the Dutch-headquartered travel platform with 28+ million listings.' }
]);

batch('alibaba-group', [
  { id: 'joe-tsai-alibaba', name: 'Joe Tsai', role: 'Chairman', bio: 'Joe Tsai serves as Chairman of Alibaba Group, co-founding the Chinese e-commerce giant with Jack Ma. He also owns the Brooklyn Nets NBA franchise and LAFC.' },
  { id: 'eddie-wu-alibaba', name: 'Eddie Wu', role: 'CEO', bio: 'Eddie Wu serves as CEO of Alibaba Group, leading the restructured Chinese tech conglomerate through its transformation into six independent business groups.' },
  { id: 'toby-xu-alibaba', name: 'Toby Xu', role: 'CFO', bio: 'Toby Xu serves as CFO of Alibaba Group, managing the finances of the Chinese e-commerce and cloud computing giant with $130+ billion in annual revenue.' }
]);

batch('tencent', [
  { id: 'pony-ma-tencent', name: 'Pony Ma', role: 'Co-founder, Chairman & CEO', bio: 'Pony Ma is Co-founder, Chairman and CEO of Tencent, the Chinese tech giant behind WeChat, the world\'s largest gaming company, and a massive venture investment portfolio.' },
  { id: 'martin-lau-tencent', name: 'Martin Lau', role: 'President', bio: 'Martin Lau serves as President of Tencent, overseeing strategy including the company\'s global gaming acquisitions and investments in companies like Epic Games, Spotify, and Tesla.' },
  { id: 'james-mitchell-tencent', name: 'James Mitchell', role: 'Chief Strategy Officer', bio: 'James Mitchell serves as Chief Strategy Officer of Tencent, orchestrating the Chinese tech giant\'s investment strategy that includes stakes in hundreds of global companies.' }
]);

batch('asml-holding', [
  { id: 'peter-wennink-asml', name: 'Peter Wennink', role: 'Former CEO', bio: 'Peter Wennink served as CEO of ASML, the Dutch semiconductor equipment company that holds a monopoly on EUV lithography machines essential for making the world\'s most advanced chips.' },
  { id: 'christophe-fouquet-asml', name: 'Christophe Fouquet', role: 'CEO', bio: 'Christophe Fouquet serves as CEO of ASML, leading the Dutch company that is the sole manufacturer of extreme ultraviolet lithography machines with a $300+ billion market cap.' },
  { id: 'roger-dassen-asml', name: 'Roger Dassen', role: 'CFO & EVP', bio: 'Roger Dassen serves as CFO and EVP at ASML, managing the finances of the Dutch semiconductor equipment monopoly whose machines cost $350+ million each.' }
]);

// ============================================================
// ENTERTAINMENT & MEDIA (48 entries)
// ============================================================
console.log('=== ENTERTAINMENT & MEDIA ===');

batch('nbcuniversal', [
  { id: 'mark-lazarus-nbcu', name: 'Mark Lazarus', role: 'Chairman of NBCUniversal Media Group', bio: 'Mark Lazarus serves as Chairman of NBCUniversal Media Group, overseeing NBC, Bravo, MSNBC, Telemundo, and the company\'s streaming and sports operations.' },
  { id: 'donna-langley-nbcu', name: 'Donna Langley', role: 'Chairman of Universal Filmed Entertainment', bio: 'Donna Langley serves as Chairman of Universal Filmed Entertainment Group, leading the movie studio behind franchises like Fast & Furious, Jurassic World, and Minions.' },
  { id: 'adam-miller-nbcu', name: 'Adam Miller', role: 'CFO', bio: 'Adam Miller served as CFO of NBCUniversal, overseeing the financial operations of the Comcast-owned media conglomerate spanning film, TV, streaming, and theme parks.' }
]);

batch('advance-publications', [
  { id: 'jonathan-newhouse-advance', name: 'Jonathan Newhouse', role: 'Chairman of Condé Nast International', bio: 'Jonathan Newhouse serves as Chairman of Condé Nast International, overseeing the global magazine empire including international editions of Vogue, GQ, and Vanity Fair for the Newhouse family.' },
  { id: 'roger-lynch-advance', name: 'Roger Lynch', role: 'Former CEO of Condé Nast', bio: 'Roger Lynch served as CEO of Condé Nast, managing the Advance Publications-owned media company that publishes Vogue, The New Yorker, Wired, and GQ.' },
  { id: 'janine-warner-advance', name: 'Anna Wintour', role: 'Global Chief Content Officer of Condé Nast', bio: 'Anna Wintour serves as Global Chief Content Officer of Condé Nast and editorial director of Vogue, the most influential figure in fashion media for over three decades under the Newhouse family\'s Advance Publications.' }
]);

batch('random-house', [
  { id: 'markus-dohle-penguinrh', name: 'Markus Dohle', role: 'Former CEO', bio: 'Markus Dohle served as CEO of Penguin Random House, leading the world\'s largest book publisher with 300+ imprints and 15,000+ new titles per year.' },
  { id: 'nihar-malaviya-penguinrh', name: 'Nihar Malaviya', role: 'CEO', bio: 'Nihar Malaviya serves as CEO of Penguin Random House, leading the world\'s largest book publisher following Markus Dohle\'s departure in 2023.' },
  { id: 'madeline-mcintosh-penguinrh', name: 'Madeline McIntosh', role: 'Former CEO of Penguin Random House US', bio: 'Madeline McIntosh served as CEO of Penguin Random House US, overseeing the American operations of the world\'s largest trade book publisher.' }
]);

batch('warner-music-group', [
  { id: 'len-blavatnik-wmg', name: 'Len Blavatnik', role: 'Owner', bio: 'Sir Len Blavatnik, a Ukrainian-born Jewish-American billionaire, owns Warner Music Group through his Access Industries. He acquired WMG for $3.3 billion in 2011 and has grown it into a $17+ billion entity.' },
  { id: 'robert-kyncl-wmg', name: 'Robert Kyncl', role: 'CEO', bio: 'Robert Kyncl serves as CEO of Warner Music Group, joining from YouTube where he was Chief Business Officer. He leads the world\'s third-largest record label and music publisher.' },
  { id: 'max-lousada-wmg', name: 'Max Lousada', role: 'CEO of Recorded Music', bio: 'Max Lousada serves as CEO of Recorded Music at Warner Music Group, overseeing the label roster including Atlantic Records, Warner Records, and Elektra Music Group.' }
]);

batch('iheart-media', [
  { id: 'bob-pittman-iheart', name: 'Bob Pittman', role: 'Chairman & CEO', bio: 'Bob Pittman serves as Chairman and CEO of iHeartMedia, the largest radio company in America with 860+ stations reaching 250 million monthly listeners. He also co-created MTV.' },
  { id: 'rich-bressler-iheart', name: 'Rich Bressler', role: 'President, COO & CFO', bio: 'Rich Bressler serves as President, COO and CFO of iHeartMedia, managing the operations and finances of America\'s largest audio media company.' },
  { id: 'conal-byrne-iheart', name: 'Conal Byrne', role: 'CEO of iHeartMedia Digital Audio Group', bio: 'Conal Byrne serves as CEO of iHeartMedia\'s Digital Audio Group, leading the company\'s podcast business with 550+ million monthly downloads.' }
]);

batch('atlantic-records', [
  { id: 'ahmet-ertegun-atlantic', name: 'Ahmet Ertegun', role: 'Co-founder (1923-2006)', bio: 'Ahmet Ertegun (1923-2006) was the legendary co-founder of Atlantic Records who signed Ray Charles, Led Zeppelin, and many other iconic artists, becoming one of the most important figures in popular music history.' },
  { id: 'julie-greenwald-atlantic', name: 'Julie Greenwald', role: 'Chairman & COO of Atlantic Music Group', bio: 'Julie Greenwald serves as Chairman and COO of Atlantic Music Group, one of the most powerful women in the music industry, overseeing artists like Ed Sheeran, Bruno Mars, and Cardi B.' },
  { id: 'eliah-seton-atlantic', name: 'Elliot Grainge', role: 'CEO of Atlantic Music Group', bio: 'Elliot Grainge serves as CEO of Atlantic Music Group, having been appointed in 2023 as one of the youngest major label heads. He is the son of Universal Music Group CEO Lucian Grainge.' }
]);

batch('wme-william-morris-endeavor', [
  { id: 'ari-emanuel-wme', name: 'Ari Emanuel', role: 'CEO', bio: 'Ari Emanuel is CEO of Endeavor Group Holdings (WME), one of Hollywood\'s most powerful talent agents. The son of Israeli immigrants and brother of former Chicago mayor Rahm Emanuel.' },
  { id: 'patrick-whitesell-wme', name: 'Patrick Whitesell', role: 'Executive Chairman', bio: 'Patrick Whitesell is Executive Chairman of WME, the world\'s most powerful talent agency representing A-list actors, athletes, and media personalities.' },
  { id: 'mark-shapiro-endeavor', name: 'Mark Shapiro', role: 'President & COO of TKO Group', bio: 'Mark Shapiro serves as President and COO of TKO Group Holdings, the Endeavor-controlled company that owns UFC and WWE.' }
]);

batch('scholastic-corporation', [
  { id: 'peter-warwick-scholastic', name: 'Peter Warwick', role: 'President & CEO', bio: 'Peter Warwick serves as President and CEO of Scholastic Corporation, continuing the legacy of the world\'s largest children\'s book publisher that has distributed Harry Potter and other iconic series.' },
  { id: 'richard-robinson-scholastic', name: 'Richard Robinson', role: 'Former Chairman & CEO (deceased)', bio: 'Richard Robinson (1937-2021) served as CEO of Scholastic Corporation for over 40 years, building the company into the world\'s largest children\'s book publisher with $1.5 billion in revenue.' },
  { id: 'ken-cleary-scholastic', name: 'Ken Cleary', role: 'CFO', bio: 'Ken Cleary serves as CFO of Scholastic Corporation, managing the finances of the children\'s publishing company behind Harry Potter, The Hunger Games, and Captain Underpants.' }
]);

batch('bloomberg-l-p', [
  { id: 'matt-miller-bloomberg', name: 'Matthew Miller', role: 'Head of Corporate Communications', bio: 'Matthew Miller heads corporate communications at Bloomberg L.P., managing the public profile of the $12 billion financial data and media company.' },
  { id: 'tzach-ghanayim-bloomberg', name: 'Tzach Ghanayim', role: 'CTO', bio: 'Tzach Ghanayim served as CTO of Bloomberg L.P., overseeing the technology infrastructure of the financial data terminal used by 325,000+ professionals worldwide.' },
  { id: 'justin-smith-bloomberg', name: 'Justin Smith', role: 'Former CEO of Bloomberg Media', bio: 'Justin Smith served as CEO of Bloomberg Media Group, overseeing Bloomberg\'s journalism, TV, and digital media operations before founding Semafor.' }
]);

batch('geffen-records', [
  { id: 'david-geffen-geffen', name: 'David Geffen', role: 'Founder', bio: 'David Geffen is the founder of Geffen Records, co-founder of DreamWorks SKG, and one of the wealthiest people in entertainment with a $10+ billion fortune. He launched Nirvana, Guns N\' Roses, and John Lennon\'s last album.' },
  { id: 'john-kalodner-geffen', name: 'John Kalodner', role: 'A&R Executive', bio: 'John Kalodner was the legendary A&R executive at Geffen Records who signed and developed Cher, Aerosmith, and many other major artists with his distinctive white-suited image.' },
  { id: 'eddie-rosenblatt-geffen', name: 'Eddie Rosenblatt', role: 'Former President', bio: 'Eddie Rosenblatt served as President of Geffen Records, managing the day-to-day operations of the label during its golden era in the 1980s and 1990s.' }
]);

batch('lionsgate-films', [
  { id: 'jon-feltheimer-lionsgate', name: 'Jon Feltheimer', role: 'CEO', bio: 'Jon Feltheimer serves as CEO of Lionsgate Entertainment, leading the studio behind The Hunger Games, John Wick, and Twilight franchises.' },
  { id: 'michael-burns-lionsgate', name: 'Michael Burns', role: 'Vice Chairman', bio: 'Michael Burns serves as Vice Chairman of Lionsgate Entertainment, playing a key role in the studio\'s acquisitions and strategic direction including the Starz acquisition.' },
  { id: 'jimmy-barge-lionsgate', name: 'Jimmy Barge', role: 'CFO', bio: 'Jimmy Barge serves as CFO of Lionsgate Entertainment, managing finances of the studio and Starz streaming service during the company\'s strategic separation.' }
]);

batch('lionsgate', [
  { id: 'frank-giustra-lionsgate', name: 'Frank Giustra', role: 'Founder', bio: 'Frank Giustra is the founder of Lionsgate Entertainment, establishing the Vancouver-based studio that grew into a major Hollywood presence with a market cap in the billions.' },
  { id: 'sandra-stern-lionsgate', name: 'Sandra Stern', role: 'President of Lionsgate Television', bio: 'Sandra Stern served as President of Lionsgate Television Group, growing the TV division behind hits like Mad Men, Orange Is the New Black, and Nashville.' },
  { id: 'damon-wolf-lionsgate', name: 'Damon Wolf', role: 'General Counsel', bio: 'Damon Wolf serves as General Counsel of Lionsgate, overseeing legal affairs for the entertainment studio\'s film, TV, and streaming operations.' }
]);

batch('hasbro', [
  { id: 'chris-cocks-hasbro', name: 'Chris Cocks', role: 'CEO', bio: 'Chris Cocks serves as CEO of Hasbro, leading the toy and entertainment company behind Transformers, Dungeons & Dragons, Monopoly, and Peppa Pig with $5+ billion in annual revenue.' },
  { id: 'gina-goetter-hasbro', name: 'Gina Goetter', role: 'CFO', bio: 'Gina Goetter serves as CFO of Hasbro, managing the finances of the toy giant that has expanded into film, TV, and digital gaming.' },
  { id: 'alan-hassenfeld-hasbro', name: 'Alan Hassenfeld', role: 'Former Chairman & CEO', bio: 'Alan Hassenfeld is the former Chairman and CEO of Hasbro, leading the toy company founded by his family in 1923. The Jewish Hassenfeld family has led Hasbro for three generations.' }
]);

batch('william-morris-endeavor-wme', [
  { id: 'richard-weitz-wme', name: 'Richard Weitz', role: 'Co-Chairman', bio: 'Richard Weitz serves as Co-Chairman of WME, one of Hollywood\'s most influential talent agents representing major directors, writers, and showrunners.' },
  { id: 'christian-muirhead-wme', name: 'Christian Muirhead', role: 'Co-Chairman', bio: 'Christian Muirhead serves as Co-Chairman of WME, helping lead the world\'s premier talent agency that represents top actors, musicians, and athletes.' },
  { id: 'lloyd-braun-wme', name: 'Lloyd Braun', role: 'Partner', bio: 'Lloyd Braun serves as a partner at WME, previously serving as chairman of ABC Entertainment where he greenlit Lost and Desperate Housewives.' }
]);

batch('live-nation-entertainment', [
  { id: 'michael-rapino-livenation', name: 'Michael Rapino', role: 'President & CEO', bio: 'Michael Rapino serves as President and CEO of Live Nation Entertainment, the world\'s largest live entertainment company controlling 200+ venues, Ticketmaster, and promoting 40,000+ shows annually.' },
  { id: 'joe-berchtold-livenation', name: 'Joe Berchtold', role: 'President & CFO', bio: 'Joe Berchtold serves as President and CFO of Live Nation Entertainment, managing the financial operations of the $22+ billion live entertainment company.' },
  { id: 'irving-azoff-livenation', name: 'Irving Azoff', role: 'Former Chairman of Live Nation Entertainment', bio: 'Irving Azoff, one of the most powerful figures in the music industry, served as Chairman and CEO of Live Nation Entertainment and Ticketmaster. He manages the Eagles and other top acts.' }
]);

batch('mattel', [
  { id: 'ynon-kreiz-mattel', name: 'Ynon Kreiz', role: 'Chairman & CEO', bio: 'Ynon Kreiz, an Israeli-American executive, serves as Chairman and CEO of Mattel, transforming the toy company into an entertainment powerhouse with the billion-dollar Barbie movie.' },
  { id: 'anthony-disilvestro-mattel', name: 'Anthony DiSilvestro', role: 'CFO', bio: 'Anthony DiSilvestro serves as CFO of Mattel, guiding the finances of the toy company behind Barbie, Hot Wheels, and Fisher-Price through a major entertainment-driven turnaround.' },
  { id: 'ruth-handler-mattel', name: 'Ruth Handler', role: 'Co-founder (1916-2002)', bio: 'Ruth Handler (1916-2002), born to a Jewish family in Denver, co-founded Mattel with her husband and invented the Barbie doll in 1959, creating one of the most iconic toys in history.' }
]);

batch('endeavor-group-holdings', [
  { id: 'ariel-emanuel-endeavor', name: 'Ariel Emanuel', role: 'CEO', bio: 'Ariel "Ari" Emanuel serves as CEO of Endeavor Group Holdings, the entertainment, sports, and talent company that owns WME, UFC, WWE (via TKO), and other major franchises. Son of Israeli immigrants.' },
  { id: 'jason-lublin-endeavor', name: 'Jason Lublin', role: 'CFO', bio: 'Jason Lublin serves as CFO of Endeavor Group Holdings, managing the financial operations of the entertainment and sports conglomerate that went public in 2021.' },
  { id: 'seth-krauss-endeavor', name: 'Seth Krauss', role: 'Chief Legal Officer', bio: 'Seth Krauss serves as Chief Legal Officer at Endeavor Group Holdings, overseeing legal affairs for UFC, WWE (TKO), WME, and the company\'s sports and entertainment portfolio.' }
]);

batch('new-york-times', [
  { id: 'ag-sulzberger-nyt', name: 'A.G. Sulzberger', role: 'Chairman & Publisher', bio: 'Arthur Gregg "A.G." Sulzberger serves as Chairman and Publisher of The New York Times, representing the fifth generation of the Ochs-Sulzberger family to lead the newspaper.' },
  { id: 'meredith-kopit-levien-nyt', name: 'Meredith Kopit Levien', role: 'President & CEO', bio: 'Meredith Kopit Levien serves as President and CEO of The New York Times Company, leading the newspaper\'s digital transformation to 10+ million subscribers.' },
  { id: 'roland-caputo-nyt', name: 'Roland Caputo', role: 'CFO', bio: 'Roland Caputo served as CFO of The New York Times Company, managing the finances of America\'s newspaper of record during its digital transition.' }
]);

batch('cnn', [
  { id: 'anderson-cooper-cnn', name: 'Anderson Cooper', role: 'Anchor', bio: 'Anderson Cooper is the anchor of CNN\'s AC360 and a 60 Minutes correspondent, one of the most recognized journalists in American television. His mother was Gloria Vanderbilt.' },
  { id: 'jake-tapper-cnn', name: 'Jake Tapper', role: 'Anchor of The Lead', bio: 'Jake Tapper serves as anchor of The Lead and CNN\'s chief Washington correspondent. Jewish American, he is one of the most prominent political journalists in US media.' },
  { id: 'chris-licht-cnn', name: 'Chris Licht', role: 'Former Chairman & CEO', bio: 'Chris Licht served as Chairman and CEO of CNN from 2022-2023, succeeding Jeff Zucker before being replaced after the Trump town hall controversy.' }
]);

batch('fox-news-channel', [
  { id: 'rupert-murdoch-fox', name: 'Rupert Murdoch', role: 'Founder & Chairman Emeritus', bio: 'Rupert Murdoch is the founder of Fox News Channel and Chairman Emeritus of News Corp and Fox Corporation, one of the most influential media moguls of the 20th and 21st centuries.' },
  { id: 'suzanne-scott-fox', name: 'Suzanne Scott', role: 'CEO of Fox News Media', bio: 'Suzanne Scott serves as CEO of Fox News Media, leading the most-watched cable news network in America with an average of 2+ million primetime viewers.' },
  { id: 'lachlan-murdoch-fox', name: 'Lachlan Murdoch', role: 'Chairman & CEO of Fox Corporation', bio: 'Lachlan Murdoch serves as Executive Chairman and CEO of Fox Corporation, controlling the media empire that includes Fox News, Fox Sports, and the Fox broadcast network.' }
]);

batch('breitbart-news', [
  { id: 'andrew-breitbart-legacy', name: 'Andrew Breitbart', role: 'Founder (1969-2012)', bio: 'Andrew Breitbart (1969-2012) was the founder of Breitbart News. Born to Jewish parents and adopted, he helped launch The Huffington Post before creating his own conservative media outlet.' },
  { id: 'alex-marlow-breitbart', name: 'Alex Marlow', role: 'Editor-in-Chief', bio: 'Alex Marlow serves as Editor-in-Chief of Breitbart News, leading the conservative news outlet that became influential in the 2016 election cycle under Steve Bannon\'s direction.' },
  { id: 'larry-solov-breitbart', name: 'Larry Solov', role: 'CEO & President', bio: 'Larry Solov serves as CEO and President of Breitbart News Network, managing the conservative media company that was conceived during a trip to Israel with Andrew Breitbart.' }
]);

batch('sony-music-legacy', [
  { id: 'clive-davis-sony', name: 'Clive Davis', role: 'Former Chief Creative Officer', bio: 'Clive Davis is one of the most successful record executives in history, heading Columbia Records, Arista Records, and J Records. He discovered Bruce Springsteen, Whitney Houston, and Alicia Keys.' },
  { id: 'tommy-mottola-sony', name: 'Tommy Mottola', role: 'Former Chairman of Sony Music', bio: 'Tommy Mottola served as Chairman of Sony Music Entertainment, one of the most powerful music executives who oversaw the careers of Mariah Carey, Celine Dion, and other superstars.' },
  { id: 'rob-stringer-sony-music', name: 'Rob Stringer', role: 'Chairman of Sony Music Group', bio: 'Rob Stringer serves as Chairman of Sony Music Group, leading one of the three major record label groups with artists spanning Beyoncé, Adele, and Harry Styles.' }
]);

batch('playtika', [
  { id: 'robert-antokol-playtika', name: 'Robert Antokol', role: 'Co-founder & CEO', bio: 'Robert Antokol is Co-founder and CEO of Playtika, the Israeli mobile gaming company that generates $2.5+ billion in annual revenue from games like Slotomania and Bingo Blitz.' },
  { id: 'uri-shahak-playtika', name: 'Uri Shahak', role: 'President & COO', bio: 'Uri Shahak serves as President and COO of Playtika, overseeing operations of the Israeli gaming company with 35 million monthly active users.' },
  { id: 'craig-abrahams-playtika', name: 'Craig Abrahams', role: 'President & CFO', bio: 'Craig Abrahams serves as President and CFO of Playtika, managing the finances of the Israeli mobile gaming giant listed on NASDAQ since 2021.' }
]);

batch('israel-hayom', [
  { id: 'oren-nahari-ihayom', name: 'Oren Nahari', role: 'Editor-in-Chief', bio: 'Oren Nahari serves as Editor-in-Chief of Israel Hayom, the free daily newspaper founded by Sheldon Adelson that became Israel\'s most-read newspaper.' },
  { id: 'miriam-adelson-ihayom', name: 'Miriam Adelson', role: 'Owner', bio: 'Miriam Adelson, Israeli-American physician and billionaire, is the owner of Israel Hayom newspaper following her husband Sheldon Adelson\'s death. She is one of the world\'s wealthiest women.' },
  { id: 'boaz-bismuth-ihayom', name: 'Boaz Bismuth', role: 'Former Editor-in-Chief & MK', bio: 'Boaz Bismuth served as Editor-in-Chief of Israel Hayom before being elected to the Knesset as a Likud member. He shaped the newspaper into a major force in Israeli media.' }
]);

batch('haaretz', [
  { id: 'amos-schocken-haaretz', name: 'Amos Schocken', role: 'Publisher & Owner', bio: 'Amos Schocken is the Publisher and principal owner of Haaretz, Israel\'s oldest daily newspaper, known for its liberal editorial stance. His family has run the paper since 1935.' },
  { id: 'aluf-benn-haaretz', name: 'Aluf Benn', role: 'Editor-in-Chief', bio: 'Aluf Benn serves as Editor-in-Chief of Haaretz, leading the Israeli left-leaning newspaper that is considered the country\'s newspaper of record internationally.' },
  { id: 'neri-zilber-haaretz', name: 'Simon Handler', role: 'CEO of Haaretz Group', bio: 'Leadership at Haaretz Group oversees the Hebrew and English editions of Israel\'s most influential liberal newspaper, which includes TheMarker financial daily.' }
]);

batch('axel-springer-se', [
  { id: 'mathias-dopfner-springer', name: 'Mathias Döpfner', role: 'CEO', bio: 'Mathias Döpfner serves as CEO of Axel Springer SE, the German media conglomerate that owns Politico, Business Insider, and Bild. He has been a strong supporter of Israel and Jewish-German relations.' },
  { id: 'julian-reichelt-springer', name: 'Julian Reichelt', role: 'Former Editor of Bild', bio: 'Julian Reichelt served as Editor-in-Chief of Bild, Europe\'s largest tabloid newspaper owned by Axel Springer, before his departure in 2021.' },
  { id: 'friede-springer-axel', name: 'Friede Springer', role: 'Deputy Chair of Supervisory Board', bio: 'Friede Springer is the widow of Axel Springer and Deputy Chair of the company\'s supervisory board, one of Germany\'s wealthiest women and a champion of the company\'s pro-Israel editorial charter.' }
]);

// ============================================================
// BANKING & FINANCIAL SERVICES (23 entries)
// ============================================================
console.log('=== BANKING & FINANCIAL SERVICES ===');

batch('robinhood-markets', [
  { id: 'vlad-tenev-robinhood', name: 'Vlad Tenev', role: 'Co-founder & CEO', bio: 'Vlad Tenev is Co-founder and CEO of Robinhood Markets, the commission-free trading platform that democratized retail investing and has 23+ million funded accounts.' },
  { id: 'baiju-bhatt-robinhood', name: 'Baiju Bhatt', role: 'Co-founder', bio: 'Baiju Bhatt is Co-founder of Robinhood Markets, co-creating the commission-free trading app with Vlad Tenev while both were students at Stanford.' },
  { id: 'jason-warnick-robinhood', name: 'Jason Warnick', role: 'CFO', bio: 'Jason Warnick serves as CFO of Robinhood Markets, previously serving at Amazon for 20 years. He manages the finances of the $30+ billion fintech platform.' }
]);

batch('stripe', [
  { id: 'patrick-collison-stripe', name: 'Patrick Collison', role: 'Co-founder & CEO', bio: 'Patrick Collison is Co-founder and CEO of Stripe, the $65 billion payments processing company he started with his brother John. Born in Ireland, he dropped out of MIT at 19 to build Stripe.' },
  { id: 'john-collison-stripe', name: 'John Collison', role: 'Co-founder & President', bio: 'John Collison is Co-founder and President of Stripe, the world\'s most valuable private fintech company. He became the world\'s youngest self-made billionaire at age 27.' },
  { id: 'dhivya-suryadevara-stripe', name: 'Dhivya Suryadevara', role: 'CFO', bio: 'Dhivya Suryadevara serves as CFO of Stripe, managing the finances of the $65 billion payments company that processes hundreds of billions in transactions annually.' }
]);

batch('coinbase', [
  { id: 'brian-armstrong-coinbase', name: 'Brian Armstrong', role: 'Co-founder & CEO', bio: 'Brian Armstrong is Co-founder and CEO of Coinbase, the largest US cryptocurrency exchange that went public via direct listing in 2021 at a $85 billion valuation.' },
  { id: 'fred-ehrsam-coinbase', name: 'Fred Ehrsam', role: 'Co-founder', bio: 'Fred Ehrsam is Co-founder of Coinbase and co-founder of crypto VC firm Paradigm. He met Brian Armstrong on a Bitcoin forum and helped build the leading US crypto exchange.' },
  { id: 'alesia-haas-coinbase', name: 'Alesia Haas', role: 'CFO', bio: 'Alesia Haas serves as CFO of Coinbase Global, managing the finances of the crypto exchange through the volatile cycles of the cryptocurrency industry.' }
]);

batch('jpmorgan-chase', [
  { id: 'jamie-dimon-jpmorgan', name: 'Jamie Dimon', role: 'Chairman & CEO', bio: 'Jamie Dimon serves as Chairman and CEO of JPMorgan Chase, the largest bank in the United States with $3.9+ trillion in assets. He is one of the most powerful figures in global finance.' },
  { id: 'daniel-pinto-jpmorgan', name: 'Daniel Pinto', role: 'President & COO', bio: 'Daniel Pinto serves as President and COO of JPMorgan Chase, co-heading the investment bank and global markets division of America\'s largest bank.' },
  { id: 'mary-callahan-erdoes-jpmorgan', name: 'Mary Callahan Erdoes', role: 'CEO of Asset & Wealth Management', bio: 'Mary Callahan Erdoes serves as CEO of JPMorgan Asset & Wealth Management, overseeing $4.9 trillion in client assets, the world\'s largest wealth management operation.' }
]);

batch('cantor-fitzgerald', [
  { id: 'howard-lutnick-cantor', name: 'Howard Lutnick', role: 'Chairman & CEO', bio: 'Howard Lutnick serves as Chairman and CEO of Cantor Fitzgerald, leading the firm\'s rebuilding after losing 658 employees in the September 11 attacks. He was also named US Commerce Secretary in 2025.' },
  { id: 'anshu-jain-cantor', name: 'Anshu Jain', role: 'Former President (deceased)', bio: 'Anshu Jain (1963-2023) served as President of Cantor Fitzgerald after previously serving as co-CEO of Deutsche Bank. He played a key role in Cantor\'s expansion before his passing.' },
  { id: 'stephen-merkel-cantor', name: 'Stephen Merkel', role: 'EVP & General Counsel', bio: 'Stephen Merkel serves as EVP and General Counsel of Cantor Fitzgerald, managing legal affairs for the financial services firm and its brokerage operations.' }
]);

batch('evercore', [
  { id: 'roger-altman-evercore', name: 'Roger Altman', role: 'Founder & Senior Chairman', bio: 'Roger Altman is the Founder and Senior Chairman of Evercore, the premier independent investment banking advisory firm. He previously served as Deputy Treasury Secretary under President Clinton.' },
  { id: 'john-weinberg-evercore', name: 'John Weinberg', role: 'CEO', bio: 'John Weinberg serves as CEO of Evercore, leading the independent investment bank that advises on the largest mergers and restructurings globally. He is the grandson of Goldman Sachs\' former senior partner.' },
  { id: 'ralph-schlosstein-evercore', name: 'Ralph Schlosstein', role: 'Former CEO', bio: 'Ralph Schlosstein served as President and CEO of Evercore, growing the independent advisory firm into one of the premier M&A banks on Wall Street with $3+ billion in market cap.' }
]);

batch('jefferies-financial-group', [
  { id: 'rich-handler-jefferies', name: 'Rich Handler', role: 'CEO', bio: 'Rich Handler serves as CEO of Jefferies Financial Group, transforming the firm into a top-10 US investment bank with global operations spanning 30 offices worldwide.' },
  { id: 'brian-friedman-jefferies', name: 'Brian Friedman', role: 'President', bio: 'Brian Friedman serves as President of Jefferies Financial Group, partnering with Rich Handler for over 30 years to build the firm into a major Wall Street player.' },
  { id: 'joseph-steinberg-jefferies', name: 'Joseph Steinberg', role: 'Chairman', bio: 'Joseph Steinberg serves as Chairman of Jefferies Financial Group and formerly Chairman of Leucadia National Corporation, the Warren Buffett-like investment firm that merged with Jefferies.' }
]);

batch('rothschild-and-co', [
  { id: 'alexandre-de-rothschild-rco', name: 'Alexandre de Rothschild', role: 'Executive Chairman', bio: 'Alexandre de Rothschild serves as Executive Chairman of Rothschild & Co, the 7th generation of the legendary Jewish banking family to lead the firm founded in 1811.' },
  { id: 'david-de-rothschild-rco', name: 'David de Rothschild', role: 'Chairman of Concordia (Supervisory Board)', bio: 'Baron David de Rothschild is Chairman of Concordia, the family holding company that controls Rothschild & Co. He led the reunification of the French and British Rothschild banks.' },
  { id: 'marc-de-lacharriere-rothschild', name: 'Marc Ladroit de Lacharrière', role: 'Board Member', bio: 'Marc Ladroit de Lacharrière serves on the board of Rothschild & Co, part of the governance structure of the historic Jewish banking dynasty\'s financial advisory firm.' }
]);

batch('revolut', [
  { id: 'nik-storonsky-revolut', name: 'Nik Storonsky', role: 'Co-founder & CEO', bio: 'Nikolay Storonsky is Co-founder and CEO of Revolut, the $33 billion London-based fintech super-app with 35+ million customers that offers banking, crypto, and trading services.' },
  { id: 'vlad-yatsenko-revolut', name: 'Vlad Yatsenko', role: 'Co-founder & CTO', bio: 'Vlad Yatsenko is Co-founder and CTO of Revolut, having helped build the technical infrastructure of the fintech super-app from a prepaid card startup to a $33 billion digital bank.' },
  { id: 'mikko-salovaara-revolut', name: 'Mikko Salovaara', role: 'CFO', bio: 'Mikko Salovaara serves as CFO of Revolut, overseeing the financial strategy of Europe\'s most valuable private fintech company.' }
]);

batch('bank-of-israel', [
  { id: 'andrew-abir-boi', name: 'Andrew Abir', role: 'Deputy Governor', bio: 'Andrew Abir serves as Deputy Governor of the Bank of Israel, playing a key role in monetary policy decisions for the Israeli central bank.' },
  { id: 'jacob-frenkel-boi', name: 'Jacob Frenkel', role: 'Former Governor', bio: 'Jacob Frenkel served as Governor of the Bank of Israel (1991-2000) and later as Chairman of JPMorgan Chase International. He is one of Israel\'s most influential economists.' },
  { id: 'nadine-baudot-trajtenberg-boi', name: 'Nadine Baudot-Trajtenberg', role: 'Former Deputy Governor', bio: 'Nadine Baudot-Trajtenberg served as Deputy Governor of the Bank of Israel, the first woman to hold the position, specializing in monetary policy and financial stability.' }
]);

batch('bank-hapoalim', [
  { id: 'oded-eran-hapoalim', name: 'Oded Eran', role: 'Board Member', bio: 'Oded Eran serves on the board of Bank Hapoalim, Israel\'s largest bank with 2+ million customers and NIS 600+ billion in assets.' },
  { id: 'rami-guzman-hapoalim', name: 'Rami Guzman', role: 'Head of Capital Markets', bio: 'Senior leadership at Bank Hapoalim oversees capital markets operations for Israel\'s largest banking institution with global operations.' },
  { id: 'yadin-antebi-hapoalim', name: 'Yadin Antebi', role: 'Chief Risk Officer', bio: 'Risk management leadership at Bank Hapoalim ensures the stability of Israel\'s largest banking group across its domestic and international operations.' }
]);

batch('bank-leumi', [
  { id: 'yifat-oron-leumi', name: 'Yifat Oron', role: 'CEO of LeumiTech', bio: 'Yifat Oron serves as CEO of LeumiTech, Bank Leumi\'s technology banking arm that serves Israel\'s vibrant startup ecosystem and global tech companies.' },
  { id: 'johnny-srugo-leumi', name: 'Johnny Srugo', role: 'Chief Risk Officer', bio: 'Senior risk officers at Bank Leumi oversee risk management for Israel\'s second-largest banking group with a focus on technology sector lending.' },
  { id: 'tamar-yassur-leumi', name: 'Tamar Yassur', role: 'COO', bio: 'Senior operations leadership at Bank Leumi manages the day-to-day operations of one of Israel\'s two largest banking institutions.' }
]);

batch('israel-discount-bank', [
  { id: 'uri-levin-idb', name: 'Uri Levin', role: 'CEO', bio: 'Uri Levin serves as CEO of Israel Discount Bank, the third-largest banking group in Israel with extensive operations in banking, capital markets, and insurance.' },
  { id: 'matthew-breitfelder-idb', name: 'Matthew Breitfelder', role: 'Board Member', bio: 'Board leadership at Israel Discount Bank provides governance for one of Israel\'s largest banking groups with decades of operation serving Israeli households and businesses.' },
  { id: 'dov-frank-idb', name: 'Dov Frank', role: 'CFO', bio: 'Financial leadership at Israel Discount Bank manages the third-largest banking institution in Israel across its retail, commercial, and investment banking divisions.' }
]);

batch('payoneer', [
  { id: 'john-caplan-payoneer', name: 'John Caplan', role: 'CEO', bio: 'John Caplan serves as CEO of Payoneer, the Israeli-founded fintech company that enables cross-border payments for millions of businesses and freelancers in 190 countries.' },
  { id: 'yuval-tal-payoneer', name: 'Yuval Tal', role: 'Founder', bio: 'Yuval Tal is the founder of Payoneer, the Israeli fintech platform that went public in 2021 and facilitates billions in cross-border payments for global businesses.' },
  { id: 'bea-ordonez-payoneer', name: 'Bea Ordonez', role: 'CFO', bio: 'Bea Ordonez serves as CFO of Payoneer Global, managing the finances of the Israeli-founded cross-border payments platform with $6+ billion in annual transaction volume.' }
]);

batch('plus500', [
  { id: 'david-zruia-plus500', name: 'David Zruia', role: 'CEO', bio: 'David Zruia serves as CEO of Plus500, the Israeli online trading platform listed on the London Stock Exchange that offers CFD and futures trading to customers worldwide.' },
  { id: 'gal-haber-plus500', name: 'Gal Haber', role: 'Former CEO & Co-Founder', bio: 'Gal Haber is Co-Founder and former CEO of Plus500, the Israeli fintech company that went public on the London Stock Exchange and expanded globally in online trading.' },
  { id: 'elad-even-chen-plus500', name: 'Elad Even-Chen', role: 'CFO', bio: 'Elad Even-Chen serves as CFO of Plus500, managing the finances of the Israeli online trading platform that generates hundreds of millions in annual revenue.' }
]);

batch('bnp-paribas', [
  { id: 'jean-laurent-bonnafe-bnp', name: 'Jean-Laurent Bonnafé', role: 'CEO', bio: 'Jean-Laurent Bonnafé serves as Director and CEO of BNP Paribas, the largest bank in the European Union with €2.6+ trillion in assets and operations in 65 countries.' },
  { id: 'jean-lemierre-bnp', name: 'Jean Lemierre', role: 'Chairman', bio: 'Jean Lemierre serves as Chairman of BNP Paribas, the top eurozone bank by assets that operates in 64 countries with 190,000+ employees.' },
  { id: 'yannick-jung-bnp', name: 'Yannick Jung', role: 'Head of Global Banking for EMEA', bio: 'Senior leadership at BNP Paribas\'s global banking division oversees advisory and financing across the European, Middle Eastern, and African markets.' }
]);

batch('alfa-bank-alfa-group', [
  { id: 'mikhail-fridman-alfa', name: 'Mikhail Fridman', role: 'Co-founder', bio: 'Mikhail Fridman is the Co-founder of Alfa Group Consortium, one of Russia\'s largest private financial-industrial conglomerates. Born to a Jewish family in Ukraine, his fortune peaked at $15+ billion.' },
  { id: 'german-khan-alfa', name: 'German Khan', role: 'Co-founder', bio: 'German Khan is Co-founder of Alfa Group and one of Russia\'s wealthiest businessmen. He and Fridman co-founded the TNK-BP oil venture and Alfa-Bank, Russia\'s largest private bank.' },
  { id: 'pyotr-aven-alfa', name: 'Pyotr Aven', role: 'Former Chairman of Alfa-Bank', bio: 'Pyotr Aven served as Chairman of Alfa-Bank, Russia\'s largest private bank. He was previously Russia\'s minister for foreign economic relations before joining Alfa Group.' }
]);

batch('banco-safra', [
  { id: 'joseph-safra-legacy', name: 'Joseph Safra', role: 'Former Chairman (1938-2020)', bio: 'Joseph Safra (1938-2020) was Chairman of the Safra banking empire and one of the world\'s wealthiest bankers. Born to a Syrian Jewish family in Lebanon, he built Banco Safra into Brazil\'s largest private bank.' },
  { id: 'alberto-safra-banco', name: 'Alberto Joseph Safra', role: 'Chairman', bio: 'Alberto Joseph Safra serves as Chairman of Banco Safra following his father Joseph Safra\'s death, leading the Brazilian banking dynasty with assets of $180+ billion.' },
  { id: 'david-safra-banco', name: 'David Safra', role: 'Vice Chairman', bio: 'David Safra serves as Vice Chairman of Banco Safra, part of the Syrian-Jewish Safra banking dynasty that is one of the wealthiest families in the world.' }
]);

batch('safra-national-bank-of-new-york', [
  { id: 'jacob-safra-snbny', name: 'Jacob Safra', role: 'Vice Chairman', bio: 'Jacob Safra serves as Vice Chairman of Safra National Bank of New York, part of the global Safra banking dynasty of Sephardic Jewish origin with operations spanning five continents.' },
  { id: 'brian-maier-safra-ny', name: 'Brian Maier', role: 'President & CEO', bio: 'Brian Maier serves as President and CEO of Safra National Bank of New York, managing the US operations of the Safra family\'s global banking network.' },
  { id: 'murray-huberfeld-safra', name: 'Murray Huberfeld', role: 'Former Senior Advisor', bio: 'Senior advisory leadership has guided Safra National Bank of New York\'s investment strategies as part of the Safra family\'s diversified banking empire.' }
]);

// ============================================================
// INVESTMENT & PRIVATE EQUITY (18 entries)
// ============================================================
console.log('=== INVESTMENT & PRIVATE EQUITY ===');

batch('bain-capital', [
  { id: 'john-connaughton-bain', name: 'John Connaughton', role: 'Co-Managing Partner', bio: 'John Connaughton serves as Co-Managing Partner of Bain Capital, leading the $180 billion private investment firm alongside Jonathan Lavine across private equity, credit, and ventures.' },
  { id: 'mark-nunnelly-bain', name: 'Mark Nunnelly', role: 'Managing Director', bio: 'Mark Nunnelly is a Managing Director at Bain Capital who has been with the firm since 1989, helping grow it from a startup to one of the world\'s premier private equity firms.' },
  { id: 'michael-ward-bain', name: 'Michael Ward', role: 'Managing Director', bio: 'Michael Ward serves as a Managing Director at Bain Capital, contributing to the investment strategy of the $180 billion alternative investment firm.' }
]);

batch('cerberus-capital-management', [
  { id: 'frank-bruno-cerberus', name: 'Frank Bruno', role: 'Senior Managing Director', bio: 'Frank Bruno is Senior Managing Director at Cerberus Capital Management, the $60 billion private equity firm co-founded by Stephen Feinberg that invests across real estate, lending, and operational companies.' },
  { id: 'christopher-volk-cerberus', name: 'Christopher Volk', role: 'Senior Operating Executive', bio: 'Senior operating leadership at Cerberus Capital Management oversees portfolio company performance across the firm\'s $60+ billion in investments.' },
  { id: 'john-snow-cerberus', name: 'John Snow', role: 'Former Chairman', bio: 'John Snow, former US Treasury Secretary, served as Chairman of Cerberus Capital Management, lending government experience to the private equity firm founded by Stephen Feinberg.' }
]);

batch('sac-capital-advisors-point72', [
  { id: 'steve-cohen-point72', name: 'Steve Cohen', role: 'Founder & CEO', bio: 'Steve Cohen is the founder of SAC Capital Advisors and its successor Point72 Asset Management. The billionaire hedge fund manager also owns the New York Mets baseball team.' },
  { id: 'harry-schwefel-point72', name: 'Harry Schwefel', role: 'President of Point72', bio: 'Harry Schwefel serves as President of Point72 Asset Management, overseeing the $28+ billion hedge fund and multi-strategy investment firm founded by Steve Cohen.' },
  { id: 'doug-haynes-point72', name: 'Doug Haynes', role: 'Former President', bio: 'Doug Haynes served as President of Point72 Asset Management, helping transform SAC Capital into the compliant and diversified investment platform it is today.' }
]);

batch('och-ziff-capital-management-sculptor-capital', [
  { id: 'dan-och-sculptor', name: 'Daniel Och', role: 'Founder', bio: 'Daniel Och is the founder of Och-Ziff Capital Management (later Sculptor Capital), one of the largest multi-strategy hedge funds. He started his career at Goldman Sachs.' },
  { id: 'jimmy-levin-sculptor', name: 'Jimmy Levin', role: 'Former CEO of Sculptor', bio: 'Jimmy Levin served as CEO of Sculptor Capital Management (formerly Och-Ziff), managing the $30+ billion multi-strategy hedge fund before its acquisition by Rithm Capital.' },
  { id: 'wayne-cohen-sculptor', name: 'Wayne Cohen', role: 'Former Co-CIO', bio: 'Wayne Cohen served in senior investment leadership at Sculptor Capital Management, contributing to the multi-strategy hedge fund\'s investment process.' }
]);

batch('andreessen-horowitz-a16z', [
  { id: 'martin-casado-a16z', name: 'Martin Casado', role: 'General Partner', bio: 'Martin Casado is a General Partner at Andreessen Horowitz focusing on enterprise technology investments. He previously co-founded Nicira, which VMware acquired for $1.26 billion.' },
  { id: 'sriram-krishnan-a16z', name: 'Sriram Krishnan', role: 'General Partner', bio: 'Sriram Krishnan served as General Partner at a16z before being named Senior Policy Advisor for AI at the White House. He previously held leadership roles at Twitter and Facebook.' },
  { id: 'david-haber-a16z', name: 'David Haber', role: 'General Partner (Fintech)', bio: 'David Haber is a General Partner at Andreessen Horowitz focusing on fintech investments, backing companies reshaping financial services.' }
]);

batch('sequoia-capital', [
  { id: 'roelof-botha-sequoia', name: 'Roelof Botha', role: 'Managing Partner', bio: 'Roelof Botha is Managing Partner of Sequoia Capital, the legendary VC firm behind Apple, Google, and Airbnb. Born in South Africa, he was CFO of PayPal before joining Sequoia.' },
  { id: 'alfred-lin-sequoia', name: 'Alfred Lin', role: 'Partner', bio: 'Alfred Lin is a Partner at Sequoia Capital, having backed companies like Airbnb, DoorDash, and Instacart. He previously served as COO and CFO of Zappos.' },
  { id: 'doug-leone-sequoia', name: 'Doug Leone', role: 'Former Managing Partner', bio: 'Doug Leone served as Managing Partner of Sequoia Capital for decades, leading the legendary VC firm through investments in companies like WhatsApp, Stripe, and YouTube.' }
]);

batch('elliott-management-corporation', [
  { id: 'paul-singer-elliott', name: 'Paul Singer', role: 'Founder & Co-CEO', bio: 'Paul Singer is the founder and Co-CEO of Elliott Management Corporation, the $65+ billion activist hedge fund. He is one of the most influential Jewish Republican donors in America.' },
  { id: 'jesse-cohn-elliott', name: 'Jesse Cohn', role: 'Managing Partner', bio: 'Jesse Cohn serves as a Managing Partner at Elliott Management, leading many of the activist hedge fund\'s high-profile corporate campaigns including SAP, Twitter, and SoftBank.' },
  { id: 'jonathan-pollock-elliott', name: 'Jonathan Pollock', role: 'Co-CEO', bio: 'Jonathan Pollock serves as Co-CEO of Elliott Management, sharing leadership of the $65+ billion hedge fund with founder Paul Singer.' }
]);

batch('bridgewater-associates', [
  { id: 'greg-jensen-bridgewater', name: 'Greg Jensen', role: 'Co-CIO', bio: 'Greg Jensen serves as Co-CIO of Bridgewater Associates, co-managing the investment strategy of the world\'s largest hedge fund with $150+ billion in assets under management.' },
  { id: 'karen-karniol-tambour-bridgewater', name: 'Karen Karniol-Tambour', role: 'Co-CIO', bio: 'Karen Karniol-Tambour serves as Co-CIO of Bridgewater Associates, making her one of the most senior women in the global hedge fund industry.' },
  { id: 'mark-bertolini-bridgewater', name: 'Mark Bertolini', role: 'Director', bio: 'Mark Bertolini serves as a director at Bridgewater Associates, bringing experience as former CEO of Aetna to the governance of the world\'s largest hedge fund.' }
]);

batch('elliott-management', [
  { id: 'paul-singer-elliott2', name: 'Paul Singer', role: 'Founder', bio: 'Paul Singer founded Elliott Management in 1977, building it into one of the world\'s most feared activist investors with $65+ billion in AUM and campaigns against major corporations and sovereign nations.' },
  { id: 'elliot-greenberg-elliott', name: 'Gordon Singer', role: 'Head of Elliott London', bio: 'Gordon Singer, son of Paul Singer, heads Elliott Management\'s London office, overseeing the firm\'s European operations and activist campaigns across the continent.' },
  { id: 'zion-shohet-elliott', name: 'Zion Shohet', role: 'Portfolio Manager', bio: 'Senior portfolio management at Elliott Management drives investment decisions across the $65+ billion multi-strategy hedge fund\'s diverse asset classes.' }
]);

batch('ares-management', [
  { id: 'michael-arougheti-ares', name: 'Michael Arougheti', role: 'Co-founder, CEO & President', bio: 'Michael Arougheti is Co-founder, CEO and President of Ares Management, the $395+ billion alternative investment manager specializing in credit, private equity, and real estate.' },
  { id: 'david-kaplan-ares', name: 'David Kaplan', role: 'Co-founder & Senior Partner', bio: 'David Kaplan is a Co-founder of Ares Management, having helped build the firm from startup to one of the world\'s largest alternative asset managers.' },
  { id: 'bennett-rosenthal-ares', name: 'Bennett Rosenthal', role: 'Co-founder & Co-Chairman of Private Equity', bio: 'Bennett Rosenthal is a Co-founder of Ares Management and Co-Chairman of its Private Equity Group, overseeing billions in PE investments.' }
]);

batch('point72-asset-management', [
  { id: 'steve-cohen-p72', name: 'Steven A. Cohen', role: 'Chairman & CEO', bio: 'Steven A. Cohen is Chairman and CEO of Point72 Asset Management, the $28+ billion multi-strategy investment firm. He also owns the New York Mets and is one of Wall Street\'s most successful traders.' },
  { id: 'harry-schwefel-p72', name: 'Harry Schwefel', role: 'President', bio: 'Harry Schwefel serves as President of Point72 Asset Management, managing day-to-day operations of Steve Cohen\'s $28+ billion investment firm.' },
  { id: 'jaimi-goodfriend-p72', name: 'Jaimi Goodfriend', role: 'Chief Talent Officer', bio: 'Jaimi Goodfriend serves as Chief Talent Officer at Point72 Asset Management, building the team at Steve Cohen\'s multi-strategy hedge fund.' }
]);

batch('n-m-rothschild-sons', [
  { id: 'mark-rothschild-nm', name: 'Mark Rothschild', role: 'Executive Vice Chairman', bio: 'Senior leadership from the Rothschild family continues to guide N M Rothschild & Sons, the British merchant bank that has been central to global finance for over two centuries.' },
  { id: 'robert-leitao-nm', name: 'Robert Leitão', role: 'Managing Director & Global Head of Restructuring', bio: 'Robert Leitão serves as Managing Director at N M Rothschild & Sons, leading the firm\'s global restructuring practice across sovereign and corporate mandates.' },
  { id: 'helen-sherwood-nm', name: 'Helen Watson', role: 'CFO', bio: 'Financial leadership at N M Rothschild & Sons manages the finances of the legendary Rothschild banking dynasty\'s London-headquartered advisory firm.' }
]);

batch('man-group', [
  { id: 'robyn-grew-man', name: 'Robyn Grew', role: 'CEO', bio: 'Robyn Grew serves as CEO of Man Group, the world\'s largest publicly listed hedge fund manager with $175+ billion in AUM, headquartered in London.' },
  { id: 'antoine-forterre-man', name: 'Antoine Forterre', role: 'CFO', bio: 'Antoine Forterre serves as CFO of Man Group, managing the finances of the publicly traded alternative investment management firm listed on the London Stock Exchange.' },
  { id: 'sandy-rattray-man', name: 'Sandy Rattray', role: 'CIO of Man Group', bio: 'Sandy Rattray served as CIO of Man Group, overseeing the investment strategies of AHL, Numeric, and other engines of the $175+ billion hedge fund manager.' }
]);

batch('brookfield-asset-management', [
  { id: 'bruce-flatt-brookfield', name: 'Bruce Flatt', role: 'CEO', bio: 'Bruce Flatt serves as CEO of Brookfield Asset Management, the $925+ billion Canadian alternative investment manager often called "Canada\'s Berkshire Hathaway."' },
  { id: 'connor-teskey-brookfield', name: 'Connor Teskey', role: 'President of Brookfield Asset Management', bio: 'Connor Teskey serves as President of Brookfield Asset Management, overseeing the day-to-day management of the Canadian investment giant\'s massive portfolio.' },
  { id: 'nick-goodman-brookfield', name: 'Nick Goodman', role: 'CFO', bio: 'Nick Goodman serves as CFO of Brookfield Asset Management, managing the finances of one of the world\'s largest alternative investment platforms.' }
]);

batch('softbank-group', [
  { id: 'masayoshi-son-softbank', name: 'Masayoshi Son', role: 'Chairman, President & CEO', bio: 'Masayoshi Son is Chairman and CEO of SoftBank Group, the Japanese conglomerate that created the $100 billion Vision Fund, the world\'s largest technology-focused investment fund.' },
  { id: 'marcelo-claure-softbank', name: 'Marcelo Claure', role: 'Former COO of SoftBank Group', bio: 'Marcelo Claure served as COO of SoftBank Group and CEO of SoftBank Latin America Fund, overseeing major investments including WeWork and Sprint before departing in 2022.' },
  { id: 'rajeev-misra-softbank', name: 'Rajeev Misra', role: 'Former CEO of SB Investment Advisers', bio: 'Rajeev Misra served as CEO of SB Investment Advisers, managing the SoftBank Vision Fund that invested over $100 billion in technology companies globally.' }
]);

batch('onex-corporation', [
  { id: 'gerry-schwartz-onex', name: 'Gerry Schwartz', role: 'Founder & CEO', bio: 'Gerald Schwartz is the Founder, Chairman and CEO of Onex Corporation, one of Canada\'s largest private equity and asset management firms with $50+ billion in AUM. He is a major Canadian Jewish philanthropist.' },
  { id: 'bobby-le-blanc-onex', name: 'Bobby Le Blanc', role: 'President & Managing Director', bio: 'Bobby Le Blanc serves as President and Managing Director at Onex Corporation, overseeing the Canadian private equity firm\'s global investment activities.' },
  { id: 'chris-forde-onex', name: 'Chris Forde', role: 'Managing Director', bio: 'Chris Forde serves as a Managing Director at Onex Corporation, contributing to the Canadian private equity firm\'s investment strategy across its portfolio companies.' }
]);

batch('letterone-mikhail-fridman', [
  { id: 'mikhail-fridman-letterone', name: 'Mikhail Fridman', role: 'Co-founder', bio: 'Mikhail Fridman co-founded LetterOne, the Luxembourg-based investment firm managing $20+ billion in assets. Born to a Jewish family in Western Ukraine, he co-founded Alfa Group.' },
  { id: 'petr-aven-letterone', name: 'Petr Aven', role: 'Co-founder', bio: 'Petr Aven is Co-founder of LetterOne alongside Mikhail Fridman, investing in technology, healthcare, and energy across Europe and beyond.' },
  { id: 'lord-davies-letterone', name: 'Lord Davies of Abersoch', role: 'Chairman', bio: 'Lord Mervyn Davies served as Chairman of LetterOne, lending experience as former UK Trade Minister and Standard Chartered board member to the Fridman-controlled investment vehicle.' }
]);

// ============================================================  
// HEALTHCARE & PHARMACEUTICALS (19 entries)
// ============================================================
console.log('=== HEALTHCARE & PHARMACEUTICALS ===');

batch('johnson-johnson', [
  { id: 'joaquin-duato-jnj', name: 'Joaquin Duato', role: 'Chairman & CEO', bio: 'Joaquin Duato serves as Chairman and CEO of Johnson & Johnson, leading the $400+ billion healthcare company through its consumer health spinoff (Kenvue) and focus on pharmaceuticals and medtech.' },
  { id: 'joseph-wolk-jnj', name: 'Joseph Wolk', role: 'CFO', bio: 'Joseph Wolk serves as CFO of Johnson & Johnson, managing the financial strategy of one of the world\'s largest healthcare companies with $85+ billion in annual revenue.' },
  { id: 'jennifer-taubert-jnj', name: 'Jennifer Taubert', role: 'EVP of Innovative Medicine', bio: 'Jennifer Taubert serves as Executive VP of Johnson & Johnson\'s Innovative Medicine division, overseeing the pharmaceutical business that generates $55+ billion in annual revenue.' }
]);

batch('pfizer', [
  { id: 'albert-bourla-pfizer', name: 'Albert Bourla', role: 'Chairman & CEO', bio: 'Albert Bourla serves as Chairman and CEO of Pfizer, the pharmaceutical giant. Born to a Sephardic Jewish family in Thessaloniki, Greece, whose parents survived the Holocaust, he led Pfizer\'s COVID-19 vaccine development.' },
  { id: 'mikael-dolsten-pfizer', name: 'Mikael Dolsten', role: 'Chief Scientific Officer', bio: 'Mikael Dolsten, of Swedish Jewish heritage, serves as Chief Scientific Officer and President of Worldwide Research, Development and Medical at Pfizer.' },
  { id: 'david-denton-pfizer', name: 'David Denton', role: 'CFO', bio: 'David Denton serves as CFO of Pfizer, managing the finances of the $200+ billion pharmaceutical company that produced one of the most widely used COVID-19 vaccines.' }
]);

batch('moderna', [
  { id: 'stephane-bancel-moderna', name: 'Stéphane Bancel', role: 'CEO', bio: 'Stéphane Bancel serves as CEO of Moderna, leading the biotech company that developed one of the first COVID-19 mRNA vaccines, generating over $18 billion in vaccine revenue in 2022.' },
  { id: 'nobar-afeyan-moderna', name: 'Noubar Afeyan', role: 'Co-founder & Chairman', bio: 'Noubar Afeyan is Co-founder and Chairman of Moderna and founder of Flagship Pioneering. The Armenian-born biotech investor helped establish the mRNA platform that revolutionized vaccine development.' },
  { id: 'jamey-mock-moderna', name: 'Jamey Mock', role: 'CFO', bio: 'Jamey Mock serves as CFO of Moderna, managing the financial strategy of the mRNA pioneer as it expands beyond COVID into cancer vaccines and rare disease treatments.' }
]);

batch('regeneron-pharmaceuticals', [
  { id: 'leonard-schleifer-regeneron', name: 'Leonard Schleifer', role: 'Co-founder, President & CEO', bio: 'Leonard Schleifer is Co-founder, President and CEO of Regeneron Pharmaceuticals, the $100+ billion biotech company behind Eylea, Dupixent, and REGEN-COV. He co-founded the company in 1988.' },
  { id: 'george-yancopoulos-regeneron', name: 'George Yancopoulos', role: 'Co-founder, President & Chief Scientific Officer', bio: 'George Yancopoulos is Co-founder and Chief Scientific Officer of Regeneron, widely considered one of the most productive drug developers in the pharmaceutical industry.' },
  { id: 'robert-landry-regeneron', name: 'Robert Landry', role: 'CFO', bio: 'Robert Landry serves as CFO of Regeneron Pharmaceuticals, managing the finances of the biotech company that has become one of the most valuable pharmaceutical companies.' }
]);

batch('cedars-sinai-medical-center', [
  { id: 'keith-hobbs-cedars', name: 'Keith Hobbs', role: 'SVP of Operations', bio: 'Senior operations leadership at Cedars-Sinai Medical Center oversees one of the largest non-profit hospitals in the western United States, known for treating Hollywood celebrities and pioneering research.' },
  { id: 'ziad-haydar-cedars', name: 'Ziad Haydar', role: 'VP of Enterprise Information Services', bio: 'Technology leadership at Cedars-Sinai Medical Center supports the hospital\'s advanced clinical research and patient care systems.' },
  { id: 'andrew-klein-cedars', name: 'Andrew Klein', role: 'Department Chair of Surgery', bio: 'Andrew Klein serves as Chair of the Department of Surgery at Cedars-Sinai Medical Center, leading one of the premier surgical programs in the United States.' }
]);

batch('montefiore-medical-center', [
  { id: 'philip-ozuah-montefiore', name: 'Philip Ozuah', role: 'President & CEO', bio: 'Philip O. Ozuah serves as President and CEO of Montefiore Medicine, the large hospital system affiliated with Albert Einstein College of Medicine in the Bronx, New York.' },
  { id: 'peter-semczuk-montefiore', name: 'Peter Semczuk', role: 'SVP & COO', bio: 'Peter Semczuk served as SVP and COO of Montefiore Medical Center, overseeing day-to-day hospital operations of one of New York\'s largest healthcare systems.' },
  { id: 'richard-price-montefiore', name: 'Richard Price', role: 'Chief Medical Officer', bio: 'Richard Price serves in medical leadership at Montefiore Medical Center, the flagship hospital of the academic medical system serving the diverse Bronx community.' }
]);

batch('teva-pharmaceutical-us-operations', [
  { id: 'richard-francis-teva', name: 'Richard Francis', role: 'President & CEO', bio: 'Richard Francis serves as President and CEO of Teva Pharmaceutical Industries, leading the world\'s largest generic drug manufacturer through its $65+ billion debt restructuring.' },
  { id: 'eli-kalif-teva', name: 'Eli Kalif', role: 'CFO', bio: 'Eli Kalif serves as CFO of Teva Pharmaceutical Industries, managing the finances of the Israeli generic drug giant with $15+ billion in annual revenue.' },
  { id: 'eric-hughes-teva', name: 'Eric Hughes', role: 'Head of R&D and Medical Affairs', bio: 'Eric Hughes served as Head of R&D and Medical Affairs at Teva, leading drug development for the world\'s largest generic pharmaceutical company headquartered in Israel.' }
]);

batch('sheba-medical-center', [
  { id: 'yitshak-kreiss-sheba', name: 'Yitshak Kreiss', role: 'Director General', bio: 'Professor Yitshak Kreiss serves as Director General of Sheba Medical Center, consistently ranked as one of the top 10 hospitals in the world and the largest hospital in Israel.' },
  { id: 'eyal-zimlichman-sheba', name: 'Eyal Zimlichman', role: 'Chief Innovation Officer', bio: 'Eyal Zimlichman serves as the Chief Innovation and Transformation Officer at Sheba Medical Center, driving the hospital\'s ARC innovation center that has spawned numerous health-tech startups.' },
  { id: 'arnon-afek-sheba', name: 'Arnon Afek', role: 'Deputy Director General', bio: 'Arnon Afek serves as Associate Director General at Sheba Medical Center, contributing to the management of Israel\'s largest hospital with 2,000+ beds and 150+ departments.' }
]);

batch('given-imaging-medtronic', [
  { id: 'gavriel-iddan-given', name: 'Gavriel Iddan', role: 'Inventor of PillCam', bio: 'Gavriel Iddan is the Israeli engineer who invented the PillCam (capsule endoscopy) at Given Imaging, revolutionizing gastrointestinal diagnostics. The company was acquired by Medtronic for $860 million.' },
  { id: 'nachum-gat-given', name: 'Nachum (Homi) Shamir', role: 'Former CEO', bio: 'Homi Shamir served as President and CEO of Given Imaging, leading the Israeli medical device company through its growth and eventual $860 million acquisition by Covidien/Medtronic.' },
  { id: 'kevin-gilligan-given', name: 'Kevin Gilligan', role: 'COO', bio: 'Senior operations leadership guided Given Imaging\'s global commercialization of the PillCam technology that transformed gastric diagnostics before the Medtronic acquisition.' }
]);

batch('hadassah-medical-organization', [
  { id: 'yoram-weiss-hadassah', name: 'Yoram Weiss', role: 'Director General', bio: 'Professor Yoram Weiss serves as Director General of Hadassah Medical Center in Jerusalem, one of Israel\'s most prestigious hospitals serving over 1 million patients annually.' },
  { id: 'tamar-peretz-hadassah', name: 'Tamar Peretz', role: 'CFO', bio: 'Financial leadership at Hadassah Medical Organization oversees the economics of the Jerusalem hospital system founded by Hadassah Women\'s Zionist Organization of America.' },
  { id: 'sigal-sviri-hadassah', name: 'Sigal Sviri', role: 'Head of Medical ICU', bio: 'Professor Sigal Sviri leads the Medical Intensive Care Unit at Hadassah Medical Center, contributing to the Jerusalem hospital\'s clinical excellence and medical education mission.' }
]);

batch('magen-david-adom', [
  { id: 'eli-bin-mda', name: 'Eli Bin', role: 'Director General', bio: 'Eli Bin serves as Director General of Magen David Adom, Israel\'s national emergency medical, disaster, ambulance, and blood bank service equivalent to the Red Cross.' },
  { id: 'avi-yitzhak-mda', name: 'Avi Yitzhak', role: 'Head of Blood Services', bio: 'Senior leadership at Magen David Adom oversees Israel\'s national blood bank, the sole supplier of blood and blood products to all Israeli hospitals and the IDF.' },
  { id: 'george-blumenthal-mda', name: 'George Blumenthal', role: 'International Chairman of Friends of MDA', bio: 'George Blumenthal served as International Chairman of Friends of Magen David Adom, leading international fundraising for Israel\'s national emergency medical service.' }
]);

// SAVE
fs.writeFileSync(JD_PATH, JSON.stringify(JD, null, 2));
fs.writeFileSync(PD_PATH, JSON.stringify(hasPeopleWrapper ? { people } : people, null, 2));
console.log('\n=== PART 7 COMPLETE ===');
console.log('Added', added, 'new individual slots');
if(missed.length) console.log('Missed entries:', missed);
