#!/usr/bin/env node
/**
 * MEGA EXPANSION PART 5 - Push 3-individual entries to 6+ (Batch 1)
 * Targets: Technology, Investment, Entertainment, Banking, Healthcare, Sports, Real Estate, Food
 */

const fs = require('fs');
const path = require('path');

const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');

const JD = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const PD = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));
const people = PD.people || PD;
const hasPeopleWrapper = !!PD.people;

function findEntry(entryId) {
  for (const c in JD.countries) {
    const entry = JD.countries[c].find(e => e.id === entryId);
    if (entry) return { entry, country: c };
  }
  return null;
}

function addInd(entryId, ind) {
  const f = findEntry(entryId);
  if (!f) return false;
  if (!f.entry.individuals) f.entry.individuals = [];
  if (f.entry.individuals.some(i => i.id === ind.id)) return false;
  f.entry.individuals.push(ind);
  return true;
}

function updatePerson(id, name, bio, affs) {
  if (!people[id]) people[id] = { name, bio: bio || '', notes: '', affiliations: affs || [] };
  else {
    if (bio && (!people[id].bio || bio.length > people[id].bio.length)) people[id].bio = bio;
    if (affs) {
      if (!people[id].affiliations) people[id].affiliations = [];
      for (const a of affs) {
        if (!people[id].affiliations.some(x => x.entryId === a.entryId)) people[id].affiliations.push(a);
      }
    }
  }
}

function makeAff(entryId) {
  const f = findEntry(entryId);
  if (!f) return null;
  return { organization: f.entry.name, role: '', entryId, country: f.country };
}

let added = 0;

function batch(entryId, individuals) {
  const f = findEntry(entryId);
  if (!f) { console.log('  MISSING: ' + entryId); return; }
  for (const ind of individuals) {
    if (addInd(entryId, ind)) added++;
    const aff = makeAff(entryId);
    if (aff) {
      aff.role = ind.role;
      updatePerson(ind.id, ind.name, ind.bio, [aff]);
    }
  }
}

// ============================================================
// TECHNOLOGY (3→6+)
// ============================================================
console.log('=== TECHNOLOGY ===');

batch('openai', [
  { id: 'mira-murati', name: 'Mira Murati', role: 'Former CTO', bio: 'Mira Murati served as CTO of OpenAI, briefly becoming interim CEO during the November 2023 board crisis. She led development of ChatGPT and DALL-E before departing in September 2024.' },
  { id: 'jan-leike', name: 'Jan Leike', role: 'Former Head of Alignment', bio: 'Jan Leike led OpenAI\'s superalignment team focused on AI safety before resigning in May 2024, citing concerns that safety culture had taken a back seat to product development.' },
  { id: 'brad-lightcap', name: 'Brad Lightcap', role: 'COO', bio: 'Brad Lightcap serves as COO of OpenAI, overseeing business operations including the company\'s transformation from a nonprofit to a capped-profit entity valued at over $150 billion.' },
  { id: 'reid-hoffman-openai', name: 'Reid Hoffman', role: 'Former Board Member', bio: 'LinkedIn co-founder Reid Hoffman served on OpenAI\'s board of directors before stepping down in 2023 amid the company\'s commercial expansion, citing potential conflicts of interest with his AI investments.' }
]);

batch('anthropic', [
  { id: 'jack-clark-anthropic', name: 'Jack Clark', role: 'Co-founder & Head of Policy', bio: 'Jack Clark co-founded Anthropic after leaving OpenAI where he was Policy Director. He leads policy efforts at Anthropic and co-authored influential AI safety research.' },
  { id: 'chris-olah', name: 'Chris Olah', role: 'Co-founder', bio: 'Chris Olah co-founded Anthropic after pioneering work on neural network interpretability at Google Brain and OpenAI. His research on understanding AI systems influenced Anthropic\'s safety-focused mission.' },
  { id: 'jared-kaplan-anthropic', name: 'Jared Kaplan', role: 'Co-founder', bio: 'Jared Kaplan, a physicist from Johns Hopkins University, co-founded Anthropic and co-authored the influential scaling laws paper that demonstrated predictable improvements in AI capability with scale.' }
]);

batch('zoom-video-communications', [
  { id: 'velchamy-sankarlingam', name: 'Velchamy Sankarlingam', role: 'President of Product & Engineering', bio: 'Velchamy Sankarlingam serves as President of Product and Engineering at Zoom, overseeing platform development and AI integration across Zoom\'s product suite.' },
  { id: 'graeme-geddes-zoom', name: 'Graeme Geddes', role: 'CRO', bio: 'Graeme Geddes served as Chief Revenue Officer at Zoom Video Communications, leading the company\'s global sales organization during its rapid pandemic-era growth.' },
  { id: 'jonathan-chadwick-zoom', name: 'Jonathan Chadwick', role: 'Board Member', bio: 'Jonathan Chadwick serves on the board of Zoom Video Communications, bringing experience as former CFO of VMware, Skype, and McAfee.' }
]);

batch('broadcom', [
  { id: 'charlie-kawwas', name: 'Charlie Kawwas', role: 'President of Semiconductor Solutions', bio: 'Charlie Kawwas serves as President of the Semiconductor Solutions Group at Broadcom, overseeing the company\'s chip design and manufacturing operations.' },
  { id: 'tom-krause-broadcom', name: 'Tom Krause', role: 'President of Infrastructure Software', bio: 'Tom Krause serves as President of the Infrastructure Software Group at Broadcom following the $61 billion acquisition of VMware in 2023.' },
  { id: 'kirsten-spears-broadcom', name: 'Kirsten Spears', role: 'CFO', bio: 'Kirsten Spears serves as CFO of Broadcom Inc., managing financial operations of the $700+ billion semiconductor and software giant.' }
]);

batch('spotify', [
  { id: 'gustav-soderstrom', name: 'Gustav Söderström', role: 'Co-President', bio: 'Gustav Söderström serves as Co-President of Spotify, overseeing product and technology. He has driven the platform\'s expansion into podcasts, audiobooks, and AI-powered features.' },
  { id: 'alex-norstrom', name: 'Alex Norström', role: 'Co-President', bio: 'Alex Norström serves as Co-President of Spotify, responsible for the company\'s business functions including advertising, partnerships, and marketplace operations.' },
  { id: 'paul-vogel-spotify', name: 'Paul Vogel', role: 'CFO', bio: 'Paul Vogel serves as CFO of Spotify Technology SA, overseeing financial operations of the world\'s largest music streaming platform with 600+ million users.' }
]);

batch('mobileye', [
  { id: 'shai-shalev-shwartz', name: 'Shai Shalev-Shwartz', role: 'CTO', bio: 'Professor Shai Shalev-Shwartz served as CTO of Mobileye, leading the development of autonomous driving technology. A Hebrew University professor, he co-authored foundational machine learning textbooks.' },
  { id: 'nimrod-nehushtan-mobileye', name: 'Nimrod Nehushtan', role: 'VP Strategy', bio: 'Nimrod Nehushtan served as VP of Strategy at Mobileye, helping guide the company through its IPO and strategic positioning in the autonomous vehicle market.' },
  { id: 'jack-weast', name: 'Jack Weast', role: 'VP of Autonomous Vehicle Standards', bio: 'Jack Weast serves as VP of Autonomous Vehicle Standards at Mobileye, leading the development of the Responsibility-Sensitive Safety model for self-driving cars.' }
]);

batch('apple-israel-r-d', [
  { id: 'avi-itzkovitch', name: 'Avi Itzkovitch', role: 'Former VP of R&D Israel', bio: 'Avi Itzkovitch led Apple\'s Israel operations which employ 2,000+ engineers working on chip design, camera technology, and storage following Apple\'s acquisition of Anobit and PrimeSense.' },
  { id: 'aharon-aharon-anobit', name: 'Aharon Aharon', role: 'Co-founder of Anobit (acquired by Apple)', bio: 'Aharon Aharon co-founded Anobit Technologies, a flash storage company acquired by Apple in 2012 for $400 million—Apple\'s first acquisition in Israel that established its major R&D presence there.' },
  { id: 'gabi-hilevitz', name: 'Gabi Hilevitz', role: 'Director of Hardware Engineering', bio: 'Gabi Hilevitz leads hardware engineering teams at Apple\'s Israel R&D center, contributing to the development of Apple\'s custom silicon chips including M-series processors.' }
]);

batch('amazon-israel-r-d', [
  { id: 'eitan-medina', name: 'Eitan Medina', role: 'Country Manager AWS Israel', bio: 'Eitan Medina serves as Country Manager for AWS Israel, overseeing Amazon\'s cloud computing operations and partner ecosystem in the Israeli market.' },
  { id: 'hsiang-sheng-wen', name: 'Ronen Korman', role: 'Head of Alexa AI Israel', bio: 'Ronen Korman leads Amazon\'s Alexa AI research center in Israel, developing natural language processing and voice recognition technologies.' },
  { id: 'max-friefeld-amazon', name: 'Max Friefeld', role: 'Former Head of Annapurna Labs Israel', bio: 'Max Friefeld helped lead Annapurna Labs Israel, Amazon\'s custom chip design subsidiary acquired in 2015, which develops Graviton processors powering AWS data centers.' }
]);

batch('oracle-israel-operations', [
  { id: 'eran-feigenbaum-oracle', name: 'Eran Feigenbaum', role: 'VP of Technology Israel', bio: 'Eran Feigenbaum leads Oracle\'s technology division in Israel, overseeing cloud infrastructure and AI development at one of Oracle\'s largest R&D centers outside the US.' },
  { id: 'dorit-dor-oracle', name: 'Dorit Dor', role: 'Former VP Oracle Cloud Israel', bio: 'Dorit Dor served in senior roles at Oracle Israel operations, contributing to the company\'s cloud platform development. She previously served as CTO of Check Point Software.' },
  { id: 'elad-sherf-oracle', name: 'Elad Sherf', role: 'Director of Engineering', bio: 'Elad Sherf directs engineering teams at Oracle\'s Israel R&D center, one of Oracle\'s strategic hubs for database and cloud technology development.' }
]);

batch('qualcomm', [
  { id: 'alex-katouzian', name: 'Alex Katouzian', role: 'Former SVP & GM of Mobile', bio: 'Alex Katouzian served as SVP and GM of Mobile, Compute, and Infrastructure at Qualcomm, overseeing the Snapdragon processor platform powering billions of devices.' },
  { id: 'james-thompson-qualcomm', name: 'James Thompson', role: 'CTO', bio: 'James Thompson serves as CTO of Qualcomm Inc., leading technology strategy and research across 5G, AI, and connected computing platforms.' },
  { id: 'akash-palkhiwala', name: 'Akash Palkhiwala', role: 'CFO', bio: 'Akash Palkhiwala serves as CFO of Qualcomm, overseeing financial operations of the $180+ billion semiconductor company and its licensing business.' }
]);

batch('akamai-technologies', [
  { id: 'adam-karon-akamai', name: 'Adam Karon', role: 'COO & GM of Compute', bio: 'Adam Karon serves as COO and GM of the Compute business at Akamai Technologies, overseeing the company\'s cloud computing expansion following the Linode acquisition.' },
  { id: 'ed-mcgowan-akamai', name: 'Ed McGowan', role: 'CFO', bio: 'Ed McGowan serves as CFO of Akamai Technologies, managing financial operations of the CDN and cybersecurity giant serving 30% of global internet traffic.' },
  { id: 'mani-sundaram-akamai', name: 'Mani Sundaram', role: 'EVP & GM of Security', bio: 'Mani Sundaram serves as EVP and GM of the Security Technology Group at Akamai, overseeing the company\'s enterprise security and zero-trust platform.' }
]);

batch('cyberark', [
  { id: 'chen-bitan-cyberark', name: 'Chen Bitan', role: 'VP of Engineering', bio: 'Chen Bitan serves as VP of Engineering at CyberArk, contributing to the development of the company\'s privileged access management solutions protecting Fortune 500 companies.' },
  { id: 'roy-adar-cyberark', name: 'Roy Adar', role: 'VP of Product', bio: 'Roy Adar serves as SVP of Product Management at CyberArk Software, shaping the company\'s identity security platform that protects critical infrastructure worldwide.' },
  { id: 'eduarda-camacho-cyberark', name: 'Eduarda Camacho', role: 'COO', bio: 'Eduarda Camacho serves as COO of CyberArk, overseeing global operations of the $10+ billion market cap identity security company headquartered in Israel.' }
]);

batch('sentinelone', [
  { id: 'ric-smith-sentinelone', name: 'Ric Smith', role: 'CTO', bio: 'Ric Smith serves as CTO of SentinelOne, leading the technical direction of the AI-powered cybersecurity platform that competes with CrowdStrike and Microsoft.' },
  { id: 'dave-bernhardt-sentinelone', name: 'Dave Bernhardt', role: 'CFO', bio: 'Dave Bernhardt serves as CFO of SentinelOne, managing finances of the Israeli-founded cybersecurity company that went public on NYSE in 2021.' },
  { id: 'nicholas-warner-sentinelone', name: 'Nicholas Warner', role: 'COO', bio: 'Nicholas Warner serves as COO of SentinelOne, overseeing revenue operations and go-to-market strategy for the AI-driven endpoint security platform.' }
]);

batch('crowdstrike', [
  { id: 'burt-podbere', name: 'Burt Podbere', role: 'CFO', bio: 'Burt Podbere serves as CFO of CrowdStrike Holdings, overseeing financial operations of the $60+ billion cybersecurity company known for its Falcon platform.' },
  { id: 'rawlin-stone', name: 'Rawlin Stone', role: 'CRO', bio: 'Rawlin Stone served as Chief Revenue Officer at CrowdStrike, driving the cybersecurity company\'s sales growth to over $3 billion in annual recurring revenue.' },
  { id: 'michael-sentonas', name: 'Michael Sentonas', role: 'President', bio: 'Michael Sentonas serves as President of CrowdStrike, overseeing technology strategy and go-to-market operations of the cybersecurity leader.' }
]);

batch('wix-com', [
  { id: 'lior-shemesh-wix', name: 'Lior Shemesh', role: 'CFO', bio: 'Lior Shemesh serves as CFO of Wix.com Ltd., overseeing financial strategy of the Israeli-founded website builder platform serving 250+ million users worldwide.' },
  { id: 'ronit-eshel-wix', name: 'Ronit Eshel', role: 'VP of Engineering', bio: 'Ronit Eshel serves as VP of Engineering at Wix.com, leading development of the company\'s AI-powered website creation and e-commerce tools from its Tel Aviv headquarters.' },
  { id: 'omer-shai-wix', name: 'Omer Shai', role: 'CMO', bio: 'Omer Shai serves as CMO of Wix.com, leading the company\'s global marketing including its high-profile Super Bowl advertising campaigns.' }
]);

batch('zillow-group', [
  { id: 'jeremy-wacksman-zillow', name: 'Jeremy Wacksman', role: 'COO', bio: 'Jeremy Wacksman serves as COO of Zillow Group, overseeing Zillow\'s rentals, new construction, and business technology divisions in the $14 billion real estate technology company.' },
  { id: 'jennifer-rock-zillow', name: 'Jennifer Rock', role: 'CFO', bio: 'Jennifer Rock served as interim CFO of Zillow Group, managing finances during the company\'s transition away from its iBuying business.' },
  { id: 'jun-choo-zillow', name: 'Jun Choo', role: 'CTO', bio: 'Jun Choo serves as CTO of Zillow Group, leading technology development including AI-powered Zestimate home valuations and the company\'s housing super app vision.' }
]);

batch('fiverr-us-operations', [
  { id: 'hila-klein-fiverr', name: 'Hila Klein', role: 'VP of Product', bio: 'Hila Klein leads product development at Fiverr, the Israeli-founded freelance marketplace platform that connects millions of businesses with freelancers worldwide.' },
  { id: 'gil-sheinfeld-fiverr', name: 'Gil Sheinfeld', role: 'CFO', bio: 'Gil Sheinfeld served as VP of Finance at Fiverr International, contributing to the company\'s successful IPO on NYSE in 2019.' },
  { id: 'gali-arnon-fiverr', name: 'Gali Arnon', role: 'CMO', bio: 'Gali Arnon serves as CMO of Fiverr International, leading marketing strategy for one of the world\'s largest freelance services marketplaces.' }
]);

batch('nice-systems', [
  { id: 'chris-wooten-nice', name: 'Chris Wooten', role: 'EVP', bio: 'Chris Wooten serves as EVP at NICE Systems, overseeing the company\'s CXone cloud platform that provides customer experience solutions to enterprises globally.' },
  { id: 'beth-gaspich-nice', name: 'Beth Gaspich', role: 'CFO', bio: 'Beth Gaspich serves as CFO of NICE Ltd., managing financial operations of the $12+ billion Israeli enterprise software company.' },
  { id: 'yaron-hertz-nice', name: 'Yaron Hertz', role: 'President of NICE Americas', bio: 'Yaron Hertz serves as President of NICE Americas, leading the company\'s largest market division for its cloud analytics and AI-powered customer engagement platforms.' }
]);

batch('amdocs', [
  { id: 'anthony-goonetilleke-amdocs', name: 'Anthony Goonetilleke', role: 'Group President of Technology', bio: 'Anthony Goonetilleke serves as Group President of Technology and Head of Strategy at Amdocs, overseeing the company\'s telecom software and services platform.' },
  { id: 'matt-cantwell-amdocs', name: 'Matt Cantwell', role: 'CFO', bio: 'Matt Cantwell serves as CFO of Amdocs Limited, managing finances of the $4+ billion Israeli-founded telecom software company serving major carriers worldwide.' },
  { id: 'josh-duncan-amdocs', name: 'Joshua Sheffer', role: 'President of Delivery', bio: 'Joshua Sheffer serves as President of Delivery at Amdocs, overseeing service delivery operations for the company\'s 350+ telecom and media clients.' }
]);

batch('outbrain', [
  { id: 'oded-napchi-outbrain', name: 'Oded Napchi', role: 'SVP of Operations', bio: 'Oded Napchi serves as SVP of Operations at Outbrain, managing the content discovery platform\'s global operations serving over a billion monthly users.' },
  { id: 'veronica-millan-outbrain', name: 'Veronica Millan', role: 'CFO', bio: 'Veronica Millan served as CFO of Outbrain Inc., guiding the Israeli-founded content recommendation platform through its 2021 IPO on Nasdaq.' },
  { id: 'eytan-galai-outbrain', name: 'Eytan Galai', role: 'VP of R&D', bio: 'Eytan Galai serves as VP of R&D at Outbrain, leading engineering development for the content discovery platform founded in Israel in 2006.' }
]);

batch('appsflyer', [
  { id: 'ronen-mense-appsflyer', name: 'Ronen Mense', role: 'President & Managing Director', bio: 'Ronen Mense serves as President and Managing Director at AppsFlyer, overseeing business operations of the Israeli mobile attribution and marketing analytics platform.' },
  { id: 'lisa-gevelber-appsflyer', name: 'Lisa Gevelber', role: 'Board Member', bio: 'Lisa Gevelber serves on AppsFlyer\'s board of directors, bringing experience as former VP of Marketing at Google Americas.' },
  { id: 'shani-rosenfelder-appsflyer', name: 'Shani Rosenfelder', role: 'Director of Content', bio: 'Shani Rosenfelder leads content strategy at AppsFlyer, producing influential mobile marketing research at the $2 billion Israeli analytics company.' }
]);

// ============================================================
// INVESTMENT & PRIVATE EQUITY (3→6+)
// ============================================================
console.log('=== INVESTMENT & PRIVATE EQUITY ===');

batch('apollo-global-management', [
  { id: 'scott-kleinman-apollo', name: 'Scott Kleinman', role: 'Co-President', bio: 'Scott Kleinman serves as Co-President of Apollo Global Management, overseeing the firm\'s $670+ billion in assets under management across private equity, credit, and real assets.' },
  { id: 'john-zito-apollo', name: 'John Zito', role: 'Co-President', bio: 'John Zito serves as Co-President of Apollo Global Management alongside Scott Kleinman, managing the firm\'s global investment operations.' },
  { id: 'martin-kelly-apollo', name: 'Martin Kelly', role: 'CFO', bio: 'Martin Kelly serves as CFO of Apollo Global Management, overseeing financial operations of one of the world\'s largest alternative asset managers founded in 1990.' }
]);

batch('blackstone-group', [
  { id: 'joe-baratta-blackstone', name: 'Joseph Baratta', role: 'Global Head of Private Equity', bio: 'Joseph Baratta serves as Global Head of Private Equity at Blackstone, overseeing the world\'s largest private equity platform with over $300 billion in assets.' },
  { id: 'kathleen-mccarthy-blackstone', name: 'Kathleen McCarthy', role: 'Global Co-Head of Real Estate', bio: 'Kathleen McCarthy serves as Global Co-Head of Real Estate at Blackstone, managing the firm\'s $330+ billion real estate portfolio—the largest in the world.' },
  { id: 'michael-chae-blackstone', name: 'Michael Chae', role: 'CFO', bio: 'Michael Chae serves as CFO of Blackstone Inc., overseeing finances of the $1 trillion+ AUM alternative investment firm co-founded by Stephen Schwarzman and Pete Peterson.' }
]);

batch('citadel', [
  { id: 'umesh-subramanian-citadel', name: 'Umesh Subramanian', role: 'CTO', bio: 'Umesh Subramanian serves as CTO of Citadel, managing the technology infrastructure behind one of the world\'s most successful hedge funds with $60+ billion in AUM.' },
  { id: 'justin-luini-citadel', name: 'Justin Luini', role: 'Global Head of Equities', bio: 'Justin Luini serves as Global Head of Equities at Citadel, managing equity trading strategies at the $60+ billion hedge fund founded by Ken Griffin.' },
  { id: 'joao-silva-citadel', name: 'João Almeida', role: 'Global Head of Fixed Income', bio: 'João Almeida serves as Global Head of Fixed Income at Citadel, overseeing credit and rates trading at one of the most profitable hedge funds in history.' }
]);

batch('citadel-llc', [
  { id: 'jimmy-linn-citadel', name: 'Jimmy Linn', role: 'Head of Risk', bio: 'Jimmy Linn serves as Head of Risk at Citadel LLC, overseeing risk management across the multi-strategy hedge fund\'s global operations.' },
  { id: 'pablo-salame-citadel2', name: 'Pablo Salame', role: 'Global Head of Fixed Income & Macro', bio: 'Pablo Salame serves as Global Head of Fixed Income and Macro at Citadel following a distinguished career at Goldman Sachs where he co-headed the securities division.' },
  { id: 'brandon-haley-citadel', name: 'Brandon Haley', role: 'Head of Commodities', bio: 'Brandon Haley leads commodities trading at Citadel, managing one of the largest commodity trading operations in the hedge fund industry.' }
]);

batch('baupost-group', [
  { id: 'james-mooney-baupost', name: 'James Mooney', role: 'Managing Director', bio: 'James Mooney serves as Managing Director at the Baupost Group, the $27+ billion value-oriented hedge fund led by Seth Klarman.' },
  { id: 'fred-fogel-baupost', name: 'Fred Fogel', role: 'Partner', bio: 'Fred Fogel serves as a Partner at the Baupost Group, contributing to the firm\'s contrarian investment approach that has generated annualized returns of ~20% since 1982.' },
  { id: 'andrew-gilder-baupost', name: 'Andrew Gilder', role: 'Managing Director', bio: 'Andrew Gilder serves as Managing Director at the Baupost Group, one of the largest and most successful value investing hedge funds based in Boston.' }
]);

batch('d-e-shaw', [
  { id: 'peter-kolchinsky-deshaw', name: 'Eddie Fishman', role: 'Managing Director', bio: 'Eddie Fishman serves as Managing Director at D.E. Shaw, contributing to the quantitative hedge fund\'s $60+ billion in investment capital and management.' },
  { id: 'eric-wepsic-deshaw', name: 'Eric Wepsic', role: 'Managing Director', bio: 'Eric Wepsic serves as Managing Director at D.E. Shaw & Co., overseeing credit and systematic macro strategies at the pioneering quantitative investment firm.' },
  { id: 'george-pang-deshaw', name: 'George Pang', role: 'Managing Director', bio: 'George Pang serves as Managing Director at D.E. Shaw, managing systematic investment strategies at the firm that manages $60+ billion in assets.' }
]);

batch('d-e-shaw-co', [
  { id: 'julius-gaudio-deshaw2', name: 'Julius Gaudio', role: 'Executive Committee Member', bio: 'Julius Gaudio serves as a member of D.E. Shaw & Co.\'s Executive Committee, helping lead the $60+ billion systematic investment firm.' },
  { id: 'eddie-fishman-deshaw2', name: 'Eddie Fishman', role: 'Managing Director', bio: 'Eddie Fishman serves as Managing Director at D.E. Shaw & Co., contributing to macro and systematic strategies at the quantitative hedge fund pioneer.' },
  { id: 'eric-wepsic-deshaw2', name: 'Eric Wepsic', role: 'Managing Director', bio: 'Eric Wepsic serves as Managing Director at D.E. Shaw & Co., overseeing credit strategies at the multi-strategy quantitative investment firm.' }
]);

batch('two-sigma', [
  { id: 'carter-lyons-twosigma', name: 'Carter Lyons', role: 'Chief Business Officer', bio: 'Carter Lyons serves as Chief Business Officer of Two Sigma Investments, managing client relationships and business operations at the $60+ billion quantitative hedge fund.' },
  { id: 'jeff-wecker-twosigma', name: 'Jeff Wecker', role: 'CTO', bio: 'Jeff Wecker serves as CTO of Two Sigma, overseeing technology infrastructure powering the quantitative hedge fund\'s investment strategies across global markets.' },
  { id: 'adam-karr-twosigma', name: 'Adam Karr', role: 'Portfolio Manager', bio: 'Adam Karr serves as a portfolio manager at Two Sigma Investments, contributing to the quantitative fund\'s systematic approach to investing.' }
]);

batch('two-sigma-investments', [
  { id: 'carter-lyons-twosigma2', name: 'Carter Lyons', role: 'Chief Business Officer', bio: 'Carter Lyons serves as Chief Business Officer at Two Sigma Investments, overseeing business development and client relationships.' },
  { id: 'pablo-colas-twosigma', name: 'Pablo Colas', role: 'Managing Director', bio: 'Pablo Colas serves as Managing Director at Two Sigma Investments, contributing to the firm\'s systematic investment strategies.' },
  { id: 'jeff-wecker-twosigma2', name: 'Jeff Wecker', role: 'CTO', bio: 'Jeff Wecker serves as CTO of Two Sigma, designing the technology infrastructure that processes petabytes of data for the quantitative investment firm.' }
]);

batch('kkr-kohlberg-kravis-roberts', [
  { id: 'scott-nuttall-kkr2', name: 'Scott Nuttall', role: 'Co-CEO', bio: 'Scott Nuttall serves as Co-CEO of KKR alongside Joseph Bae, overseeing the firm\'s global operations managing $550+ billion in assets across private equity, credit, and real assets.' },
  { id: 'joseph-bae-kkr', name: 'Joseph Bae', role: 'Co-CEO', bio: 'Joseph Bae serves as Co-CEO of KKR & Co. Inc., managing the firm\'s investment operations across Asia-Pacific and the Americas. He has been instrumental in KKR\'s growth to over $550 billion in AUM.' },
  { id: 'robert-lewin-kkr', name: 'Robert Lewin', role: 'CFO', bio: 'Robert Lewin serves as CFO of KKR & Co. Inc., overseeing financial operations of the global investment firm founded by Henry Kravis, George Roberts, and Jerome Kohlberg Jr.' }
]);

batch('kkr-and-co', [
  { id: 'scott-nuttall-kkr3', name: 'Scott Nuttall', role: 'Co-CEO', bio: 'Scott Nuttall co-leads KKR alongside Joseph Bae, driving the firm\'s expansion into credit, infrastructure, and real estate beyond its leveraged buyout roots.' },
  { id: 'joseph-bae-kkr2', name: 'Joseph Bae', role: 'Co-CEO', bio: 'Joseph Bae serves as Co-CEO of KKR, managing the firm\'s global investment platform spanning private equity, credit, real assets, and insurance.' },
  { id: 'robert-lewin-kkr2', name: 'Robert Lewin', role: 'CFO', bio: 'Robert Lewin serves as CFO of KKR & Co., managing finances of one of the world\'s largest alternative asset managers.' }
]);

batch('pershing-square-capital-management', [
  { id: 'anthony-massaro-pershing', name: 'Anthony Massaro', role: 'Portfolio Manager', bio: 'Anthony Massaro serves as a portfolio manager at Pershing Square Capital Management, contributing to the fund\'s concentrated investment strategy under Bill Ackman.' },
  { id: 'feroz-dewan-pershing', name: 'Feroz Dewan', role: 'Former Partner', bio: 'Feroz Dewan served as a partner at Pershing Square Capital Management before launching Arena Investors. He contributed to several of Ackman\'s high-profile investment campaigns.' },
  { id: 'charles-korn-pershing', name: 'Charles Korn', role: 'Partner', bio: 'Charles Korn serves as a partner at Pershing Square Capital Management, the $16+ billion activist hedge fund led by Bill Ackman known for concentrated bets on public companies.' }
]);

batch('third-point-llc', [
  { id: 'munib-islam-thirdpoint', name: 'Munib Islam', role: 'Partner & CIO', bio: 'Munib Islam serves as Partner and CIO at Third Point LLC, co-managing the activit hedge fund\'s $12+ billion portfolio alongside founder Daniel Loeb.' },
  { id: 'daniel-gold-thirdpoint', name: 'Daniel Gold', role: 'Managing Director', bio: 'Daniel Gold serves as a Managing Director at Third Point LLC, contributing to the firm\'s event-driven and activist investment strategies.' },
  { id: 'robert-schwartz-thirdpoint', name: 'Robert Schwartz', role: 'Partner', bio: 'Robert Schwartz serves as Partner at Third Point LLC, the activist hedge fund known for its influential shareholder letters and campaigns at companies like Disney, Intel, and Sony.' }
]);

batch('sculptor-capital-management', [
  { id: 'wayne-cohen-sculptor', name: 'Wayne Cohen', role: 'Former Co-CIO', bio: 'Wayne Cohen served as Co-Chief Investment Officer of multi-strategy at Sculptor Capital Management (formerly Och-Ziff), the multi-billion dollar hedge fund.' },
  { id: 'james-levin-sculptor', name: 'James Levin', role: 'Former CIO', bio: 'James Levin served as CIO of Sculptor Capital Management before the firm was acquired by Rithm Capital in 2023 for $720 million.' },
  { id: 'harold-kelly-sculptor', name: 'Harold Kelly', role: 'Former CFO', bio: 'Harold Kelly served as CFO of Sculptor Capital Management, managing finances of the multi-strategy alternative asset management firm.' }
]);

batch('guggenheim-partners', [
  { id: 'scott-minerd-guggenheim', name: 'Scott Minerd', role: 'Former Global CIO (1962-2022)', bio: 'Scott Minerd served as Global CIO of Guggenheim Partners from 1998 until his death in 2022. He managed Guggenheim\'s $270+ billion in assets and was known for his macroeconomic insights.' },
  { id: 'anne-walsh-guggenheim', name: 'Anne Walsh', role: 'CIO of Guggenheim Investments', bio: 'Anne Walsh serves as CIO of Guggenheim Investments, succeeding Scott Minerd in managing the firm\'s $218+ billion in investment assets.' },
  { id: 'dina-powell-guggenheim', name: 'Dina Powell McCormick', role: 'Vice Chair', bio: 'Dina Powell McCormick serves as Vice Chair of Guggenheim Securities, the investment banking division. Previously served as Deputy National Security Advisor under Trump.' }
]);

batch('saban-capital-group', [
  { id: 'yair-saban', name: 'Yair Saban', role: 'Director', bio: 'Yair Saban serves as a director at Saban Capital Group, the investment firm founded by Israeli-American media mogul Haim Saban.' },
  { id: 'jennifer-grant-saban', name: 'Jennifer Grant', role: 'COO', bio: 'Jennifer Grant serves as COO of Saban Capital Group, managing operations of the private investment firm focused on media, entertainment, and communications.' },
  { id: 'adam-chesnoff-saban2', name: 'Adam Chesnoff', role: 'President & COO', bio: 'Adam Chesnoff serves as President and COO of Saban Capital Group, Haim Saban\'s investment vehicle that previously controlled Univision and Saban Entertainment.' }
]);

batch('cascade-investment', [
  { id: 'brad-smith-cascade', name: 'Brad Smith', role: 'Senior Analyst', bio: 'Brad Smith serves as a senior investment professional at Cascade Investment LLC, Bill Gates\' private investment vehicle managing $80+ billion in diversified holdings.' },
  { id: 'mike-larson-cascade', name: 'Michael Larson', role: 'Chief Investment Officer', bio: 'Michael Larson has served as CIO of Cascade Investment LLC since 1995, building Bill Gates\' personal investment portfolio into one of the largest private fortunes encompassing real estate, energy, and equities.' },
  { id: 'allan-golston-cascade', name: 'Allan Golston', role: 'Investment Manager', bio: 'Allan Golston contributes to investment management at Cascade Investment, the private holding company investing Bill Gates\' assets across diverse sectors.' }
]);

batch('cohen-steers', [
  { id: 'joseph-harvey-cohensteers', name: 'Joseph Harvey', role: 'President & CIO', bio: 'Joseph Harvey serves as President and CIO of Cohen & Steers, the $87+ billion asset manager specializing in real assets including REITs and infrastructure securities.' },
  { id: 'adam-derechin-cohensteers', name: 'Adam Derechin', role: 'COO', bio: 'Adam Derechin serves as COO of Cohen & Steers, managing operations of the NYSE-listed real assets investment manager focused on REITs, infrastructure, and commodities.' },
  { id: 'john-mcdonald-cohensteers', name: 'John McDonald', role: 'CFO', bio: 'John McDonald serves as CFO of Cohen & Steers Inc., overseeing financial operations of the specialized investment manager with expertise in real estate securities.' }
]);

batch('brookfield-corporation', [
  { id: 'connor-teskey-brookfield', name: 'Connor Teskey', role: 'President of Brookfield Asset Management', bio: 'Connor Teskey serves as President of Brookfield Asset Management, overseeing the firm\'s $925+ billion in assets under management across infrastructure, real estate, and renewables.' },
  { id: 'bahir-manios-brookfield', name: 'Bahir Manios', role: 'CFO', bio: 'Bahir Manios serves as CFO of Brookfield Corporation, managing finances of the Canadian alternative asset management giant formerly known as Brascan.' },
  { id: 'anuj-ranjan-brookfield', name: 'Anuj Ranjan', role: 'President of Private Equity', bio: 'Anuj Ranjan serves as President of Brookfield\'s Private Equity group, overseeing the firm\'s $130+ billion private equity portfolio across industrial, infrastructure, and business services sectors.' }
]);

// ============================================================
// ENTERTAINMENT & MEDIA (3→6+)
// ============================================================
console.log('=== ENTERTAINMENT & MEDIA ===');

batch('walt-disney-company', [
  { id: 'alan-horn-disney', name: 'Alan Horn', role: 'Former Chairman of Disney Studios', bio: 'Alan Horn served as Chairman of Walt Disney Studios from 2012-2021, overseeing the acquisition era that brought Pixar, Marvel, Lucasfilm, and Fox under Disney\'s umbrella.' },
  { id: 'alan-bergman-disney', name: 'Alan Bergman', role: 'Chairman of Disney Entertainment', bio: 'Alan Bergman serves as Chairman of Disney Entertainment, overseeing Walt Disney Studios, Disney Television, and streaming content for Disney+.' },
  { id: 'dana-walden-disney', name: 'Dana Walden', role: 'Co-Chairman of Disney Entertainment', bio: 'Dana Walden serves as Co-Chairman of Disney Entertainment, overseeing content creation across ABC, FX, Hulu, and National Geographic.' },
  { id: 'peter-rice-disney', name: 'Peter Rice', role: 'Former Chairman of General Entertainment', bio: 'Peter Rice served as Chairman of Walt Disney Television and General Entertainment Content before leaving in 2022. He previously led Fox Networks.' }
]);

batch('warner-bros-discovery', [
  { id: 'jb-perrette-wbd', name: 'JB Perrette', role: 'CEO of Global Streaming & Games', bio: 'JB Perrette serves as President and CEO of Global Streaming and Games at Warner Bros. Discovery, overseeing Max (formerly HBO Max), Discovery+, and WB Games.' },
  { id: 'mike-de-luca-wbd', name: 'Mike De Luca', role: 'Former Co-CEO of Warner Bros. Film', bio: 'Mike De Luca served as co-chairman and co-CEO of Warner Bros. Motion Picture Group, overseeing film production at the storied studio.' },
  { id: 'casey-bloys-wbd', name: 'Casey Bloys', role: 'Chairman and CEO of HBO & Max Content', bio: 'Casey Bloys serves as Chairman and CEO of HBO and Max Content, responsible for programming that includes Game of Thrones, Succession, and The White Lotus.' }
]);

batch('paramount-global', [
  { id: 'brian-robbins-paramount', name: 'Brian Robbins', role: 'President and CEO of Paramount Pictures', bio: 'Brian Robbins serves as President and CEO of Paramount Pictures, overseeing film production, marketing, and distribution at the studio founded by Adolph Zukor.' },
  { id: 'george-cheeks-paramount', name: 'George Cheeks', role: 'Co-CEO of Paramount Global', bio: 'George Cheeks serves as Co-CEO of Paramount Global, overseeing CBS, Paramount Television Studios, and Showtime Networks.' },
  { id: 'chris-mccarthy-paramount', name: 'Chris McCarthy', role: 'Co-CEO of Paramount Global', bio: 'Chris McCarthy serves as Co-CEO of Paramount Global, overseeing Paramount+, MTV, Nickelodeon, and BET Media Group.' }
]);

batch('viacomcbs-now-paramount', [
  { id: 'tom-mccarthy-viacom', name: 'Tom McCarthy', role: 'Former CFO', bio: 'Tom McCarthy served as Executive VP and CFO of ViacomCBS during the CBS-Viacom re-merger overseen by Shari Redstone.' },
  { id: 'bob-bakish-viacom', name: 'Bob Bakish', role: 'Former CEO', bio: 'Bob Bakish served as CEO of ViacomCBS (now Paramount Global) from 2019-2023, overseeing the Paramount+ streaming launch and CBS integration before the Skydance merger.' },
  { id: 'nancy-phillips-viacom', name: 'Nancy Phillips', role: 'General Counsel', bio: 'Nancy Phillips served as EVP and General Counsel at ViacomCBS, managing legal affairs during the corporate transformation into Paramount Global.' }
]);

batch('miramax-films', [
  { id: 'zanne-devine-miramax', name: 'Zanne Devine', role: 'Former Head of Film & TV', bio: 'Zanne Devine served as Head of Film and Television at Miramax, overseeing the company\'s content output after its acquisition by beIN Media Group in 2016.' },
  { id: 'bill-block-miramax', name: 'Bill Block', role: 'CEO', bio: 'Bill Block serves as CEO of Miramax, leading the studio\'s revival under beIN Media Group ownership after the Harvey Weinstein scandal devastated the brand.' },
  { id: 'nasser-al-khelaifi-miramax', name: 'Nasser Al-Khelaifi', role: 'Chairman (beIN Media Group)', bio: 'Nasser Al-Khelaifi, chairman of beIN Media Group and PSG president, acquired a majority stake in Miramax, overseeing the studio\'s post-Weinstein era as parent company head.' }
]);

batch('simon-schuster', [
  { id: 'dana-canedy-simon', name: 'Dana Canedy', role: 'Former SVP & Publisher', bio: 'Dana Canedy served as SVP and Publisher of Simon & Schuster\'s flagship imprint, the first African American woman to lead the division.' },
  { id: 'ian-chapman-simon', name: 'Ian Chapman', role: 'Former CEO of Simon & Schuster UK', bio: 'Ian Chapman led Simon & Schuster\'s UK operations, expanding the publisher\'s international reach in one of the world\'s largest English-language markets.' },
  { id: 'mindy-marques-simon', name: 'Mindy Marques', role: 'CEO', bio: 'Mindy Marques serves as CEO of Simon & Schuster under KKR ownership after the $1.62 billion acquisition in 2023, following the blocked Penguin Random House merger.' }
]);

batch('the-forward', [
  { id: 'samuel-norich-forward', name: 'Samuel Norich', role: 'Former Publisher', bio: 'Samuel Norich served as publisher of The Forward for over two decades, guiding the historic Yiddish-language newspaper\'s transition to English and digital media.' },
  { id: 'rob-eshman-forward', name: 'Rob Eshman', role: 'National Editor', bio: 'Rob Eshman serves as National Editor of The Forward, the historic Jewish-American newspaper founded in 1897 that covers Jewish life, culture, and politics.' },
  { id: 'mira-fox-forward', name: 'Mira Fox', role: 'Deputy Opinion Editor', bio: 'Mira Fox serves as Deputy Opinion Editor at The Forward, contributing to the newspaper\'s commentary on contemporary Jewish American issues and culture.' }
]);

batch('the-jerusalem-post', [
  { id: 'caroline-glick-jpost', name: 'Caroline Glick', role: 'Senior Contributing Editor', bio: 'Caroline Glick is a senior contributing editor at The Jerusalem Post and a prominent conservative commentator on Israeli politics and Middle East affairs.' },
  { id: 'herb-keinon-jpost', name: 'Herb Keinon', role: 'Senior Diplomatic Correspondent', bio: 'Herb Keinon serves as senior diplomatic correspondent at The Jerusalem Post, covering Israeli foreign policy and diplomatic relations for over three decades.' },
  { id: 'seth-frantzman-jpost', name: 'Seth Frantzman', role: 'Senior Middle East Correspondent', bio: 'Seth Frantzman serves as senior Middle East correspondent and analyst at The Jerusalem Post, covering defense, security, and regional affairs.' }
]);

// ============================================================
// BANKING & FINANCIAL SERVICES (3→6+)
// ============================================================
console.log('=== BANKING & FINANCIAL SERVICES ===');

batch('morgan-stanley', [
  { id: 'james-gorman-ms', name: 'James Gorman', role: 'Former CEO & Executive Chairman', bio: 'James Gorman served as CEO of Morgan Stanley from 2010-2024, transforming the firm from a trading-heavy bank into a wealth management powerhouse with the $13 billion E*Trade acquisition.' },
  { id: 'ted-pick-ms', name: 'Ted Pick', role: 'CEO', bio: 'Ted Pick became CEO of Morgan Stanley in January 2024, succeeding James Gorman. He previously led the firm\'s Institutional Securities Group.' },
  { id: 'andy-saperstein-ms', name: 'Andy Saperstein', role: 'Co-President', bio: 'Andy Saperstein serves as Co-President of Morgan Stanley, overseeing the firm\'s $5.5 trillion wealth management division.' },
  { id: 'dan-simkowitz-ms', name: 'Dan Simkowitz', role: 'Co-President', bio: 'Dan Simkowitz serves as Co-President of Morgan Stanley, overseeing investment management operations of the $1.4 trillion AUM division.' }
]);

// ============================================================
// HEALTHCARE & PHARMACEUTICALS (3→6+)
// ============================================================
console.log('=== HEALTHCARE & PHARMACEUTICALS ===');

batch('sackler-family-purdue-pharma', [
  { id: 'mortimer-sackler', name: 'Mortimer Sackler', role: 'Co-owner (1916-2010)', bio: 'Mortimer Sackler co-owned Purdue Pharma alongside his brothers, building the pharmaceutical empire that later produced OxyContin. The Sackler family amassed $13+ billion before facing thousands of opioid lawsuits.' },
  { id: 'kathe-sackler', name: 'Kathe Sackler', role: 'Former Board Member', bio: 'Kathe Sackler served on Purdue Pharma\'s board and was named in lawsuits alleging the family knowingly promoted OxyContin despite its addiction potential, contributing to the opioid crisis.' },
  { id: 'theresa-sackler', name: 'Theresa Sackler', role: 'Philanthropist & Family Member', bio: 'Dame Theresa Sackler, widow of Mortimer Sackler, is a philanthropist whose donations to cultural institutions like the V&A and Louvre became controversial amid the opioid crisis.' }
]);

batch('mount-sinai-health-system', [
  { id: 'david-muller-sinai', name: 'David Muller', role: 'Dean for Medical Education', bio: 'David Muller serves as Dean for Medical Education at Icahn School of Medicine at Mount Sinai, overseeing one of the largest medical education programs in the US.' },
  { id: 'wayne-keathley-sinai', name: 'Wayne Keathley', role: 'President of Mount Sinai Hospital', bio: 'Wayne Keathley serves as President of The Mount Sinai Hospital, managing operations of the flagship 1,139-bed teaching hospital in New York City.' },
  { id: 'erik-lium-sinai', name: 'Erik Lium', role: 'Chief Scientific Officer', bio: 'Erik Lium serves as Chief Scientific Officer of Mount Sinai Health System, overseeing biomedical research across one of the nation\'s leading academic medical centers.' }
]);

batch('biontech', [
  { id: 'sierk-poetting-biontech', name: 'Sierk Poetting', role: 'Former COO', bio: 'Sierk Poetting served as COO of BioNTech, managing operations during the development and global rollout of the Pfizer-BioNTech COVID-19 vaccine administered to billions.' },
  { id: 'jens-holstein-biontech', name: 'Jens Holstein', role: 'CFO', bio: 'Jens Holstein serves as CFO of BioNTech SE, managing finances of the German biotech company that earned €17 billion in revenue from its mRNA COVID-19 vaccine in 2022.' },
  { id: 'ryan-richardson-biontech', name: 'Ryan Richardson', role: 'Chief Strategy Officer', bio: 'Ryan Richardson serves as Chief Strategy Officer at BioNTech, guiding the company\'s expansion from COVID vaccines into oncology mRNA therapeutics and individualized cancer treatments.' }
]);

// ============================================================
// SPORTS (3→6+)
// ============================================================
console.log('=== SPORTS ===');

batch('golden-state-warriors', [
  { id: 'mike-dunleavy-warriors', name: 'Mike Dunleavy Jr.', role: 'General Manager', bio: 'Mike Dunleavy Jr. serves as General Manager of the Golden State Warriors, managing the roster of the franchise that won four NBA championships (2015, 2017, 2018, 2022) under Joe Lacob\'s ownership.' },
  { id: 'steve-kerr-warriors', name: 'Steve Kerr', role: 'Head Coach', bio: 'Steve Kerr coaches the Golden State Warriors, leading the team to four NBA championships. He is one of the most successful coaches in NBA history with a championship-era dynasty.' },
  { id: 'kirk-lacob-warriors', name: 'Kirk Lacob', role: 'President of G League Operations', bio: 'Kirk Lacob, son of owner Joe Lacob, serves in the Warriors\' front office handling G League operations and basketball development initiatives.' }
]);

batch('brooklyn-nets', [
  { id: 'oliver-yu-nets', name: 'Oliver Yu', role: 'CEO of BSE Global', bio: 'Oliver Yu serves as CEO of BSE Global, the parent company of the Brooklyn Nets, Barclays Center, and New York Liberty, overseeing all business operations.' },
  { id: 'jordi-fernandez-nets', name: 'Jordi Fernández', role: 'Head Coach', bio: 'Jordi Fernández serves as Head Coach of the Brooklyn Nets, leading the team through its rebuilding phase after the departures of Kevin Durant and Kyrie Irving.' },
  { id: 'david-levy-nets', name: 'David Levy', role: 'Former CEO', bio: 'David Levy served as CEO of the Brooklyn Nets from 2020-2022, bringing experience as former president of Turner Broadcasting.' }
]);

batch('new-england-patriots', [
  { id: 'jerod-mayo-pats', name: 'Jerod Mayo', role: 'Former Head Coach', bio: 'Jerod Mayo served as head coach of the New England Patriots in 2024, succeeding Bill Belichick as the franchise\'s new era coach under the Kraft family\'s ownership.' },
  { id: 'eliot-wolf-pats', name: 'Eliot Wolf', role: 'Executive VP of Player Personnel', bio: 'Eliot Wolf serves as EVP of Player Personnel for the New England Patriots, overseeing scouting and roster construction. He is the son of former Packers GM Ron Wolf.' },
  { id: 'josh-kraft', name: 'Josh Kraft', role: 'President of the New England Patriots Foundation', bio: 'Josh Kraft is the son of Robert Kraft and serves as President of the New England Patriots Foundation, directing the team\'s charitable and community programs.' }
]);

batch('dallas-mavericks', [
  { id: 'nico-harrison-mavs', name: 'Nico Harrison', role: 'GM & President of Basketball Operations', bio: 'Nico Harrison serves as GM and President of Basketball Operations for the Dallas Mavericks, building the roster that reached the 2024 NBA Finals.' },
  { id: 'jason-kidd-mavs', name: 'Jason Kidd', role: 'Head Coach', bio: 'Jason Kidd serves as head coach of the Dallas Mavericks, leading the team to the 2024 NBA Finals. A Hall of Fame point guard, he coaches under Miriam Adelson\'s ownership.' },
  { id: 'cynt-marshall-mavs', name: 'Cynt Marshall', role: 'Former CEO', bio: 'Cynt Marshall served as CEO of the Dallas Mavericks from 2018-2024, the first African American woman to serve as CEO of an NBA franchise.' }
]);

batch('los-angeles-clippers', [
  { id: 'lawrence-frank-clippers', name: 'Lawrence Frank', role: 'President of Basketball Operations', bio: 'Lawrence Frank serves as President of Basketball Operations for the LA Clippers, overseeing the team\'s basketball strategy under Steve Ballmer\'s $2 billion ownership.' },
  { id: 'gillian-zucker-clippers', name: 'Gillian Zucker', role: 'President of Business Operations', bio: 'Gillian Zucker serves as President of Business Operations for the LA Clippers, overseeing the opening of the $2 billion Intuit Dome arena in 2024.' },
  { id: 'ty-lue-clippers', name: 'Tyronn Lue', role: 'Head Coach', bio: 'Tyronn Lue serves as head coach of the LA Clippers, previously winning an NBA championship coaching LeBron James with the Cleveland Cavaliers in 2016.' }
]);

batch('boston-celtics-wyc-grousbeck', [
  { id: 'brad-stevens-celtics', name: 'Brad Stevens', role: 'President of Basketball Operations', bio: 'Brad Stevens serves as President of Basketball Operations for the Boston Celtics, building the roster that won the 2024 NBA championship—the franchise\'s record 18th title.' },
  { id: 'joe-mazzulla-celtics', name: 'Joe Mazzulla', role: 'Head Coach', bio: 'Joe Mazzulla serves as head coach of the Boston Celtics, leading the team to the 2024 NBA championship as one of the youngest head coaches in NBA history.' },
  { id: 'rich-gotham-celtics', name: 'Rich Gotham', role: 'President', bio: 'Rich Gotham serves as President of the Boston Celtics, overseeing business operations of the most decorated franchise in NBA history.' }
]);

// ============================================================
// REAL ESTATE & PROPERTY (3→6+)
// ============================================================
console.log('=== REAL ESTATE & PROPERTY ===');

batch('kushner-companies', [
  { id: 'nicole-kushner-meyer', name: 'Nicole Kushner Meyer', role: 'Principal', bio: 'Nicole Kushner Meyer is a principal at Kushner Companies and sister of Jared Kushner. She drew controversy in 2017 for marketing luxury condos to Chinese investors using the EB-5 visa program.' },
  { id: 'joshua-kushner-companies', name: 'Joshua Kushner', role: 'Family Member & Investor', bio: 'Joshua Kushner, brother of Jared, is a venture capitalist (Thrive Capital) and founder of Oscar Health. While not directly managing Kushner Companies, he is part of the Kushner family business dynasty.' },
  { id: 'joey-orbach-kushner', name: 'Joey Orbach', role: 'President of Kushner Real Estate Group', bio: 'Joey Orbach serves as President of Kushner Real Estate Group, overseeing the family\'s portfolio of 25,000+ apartment units across the eastern United States.' }
]);

batch('tishman-speyer', [
  { id: 'paul-frank-tishman', name: 'Paul Frank', role: 'CFO', bio: 'Paul Frank serves as CFO of Tishman Speyer, managing finances of the global real estate firm that owns and operates iconic properties including Rockefeller Center and the Spiral.' },
  { id: 'michael-bilerman-tishman', name: 'Michael Bilerman', role: 'CIO', bio: 'Michael Bilerman serves as CIO of Tishman Speyer, overseeing investment strategy for the real estate firm\'s $80+ billion portfolio across 30+ markets worldwide.' },
  { id: 'rob-speyer-jr', name: 'Ethan Bing', role: 'Managing Director', bio: 'Ethan Bing serves as a Managing Director at Tishman Speyer, contributing to the firm\'s development and acquisition activities across major global markets.' }
]);

batch('wework', [
  { id: 'john-santora-wework', name: 'John Santora', role: 'Former CEO', bio: 'John Santora served as CEO of WeWork following the company\'s 2023 bankruptcy filing, managing the restructuring of the co-working company that once had a $47 billion valuation.' },
  { id: 'masayoshi-son-wework', name: 'Masayoshi Son', role: 'Major Investor (SoftBank)', bio: 'Masayoshi Son, CEO of SoftBank, was WeWork\'s largest investor with $18.5 billion committed. The investment became SoftBank\'s biggest loss after WeWork\'s failed IPO and eventual bankruptcy.' },
  { id: 'rebekah-neumann-wework', name: 'Rebekah Neumann', role: 'Co-founder & Former Chief Brand Officer', bio: 'Rebekah Neumann, married to Adam Neumann, served as Chief Brand and Impact Officer at WeWork and CEO of WeGrow school. Her role was scrutinized in the company\'s failed 2019 IPO.' }
]);

batch('sl-green-realty-corp', [
  { id: 'steven-durels-slgreen', name: 'Steven Durels', role: 'EVP of Leasing', bio: 'Steven Durels serves as EVP and Director of Leasing at SL Green Realty Corp, Manhattan\'s largest office landlord with a 35+ million square foot portfolio.' },
  { id: 'matt-diliberto-slgreen', name: 'Matt DiLiberto', role: 'CFO', bio: 'Matt DiLiberto serves as CFO of SL Green Realty Corp, managing finances of the REIT that dominates Midtown Manhattan commercial real estate.' },
  { id: 'harry-macklowe-slgreen', name: 'Harry Macklowe', role: 'Former Partner on 432 Park', bio: 'Harry Macklowe partnered with SL Green on development projects in Manhattan, including involvement in some of the city\'s most iconic towers.' }
]);

batch('wynn-resorts', [
  { id: 'julie-cameron-wynn', name: 'Julie Cameron-Doe', role: 'CFO', bio: 'Julie Cameron-Doe serves as CFO of Wynn Resorts, managing finances of the luxury gaming and hospitality company with properties in Las Vegas and Macau.' },
  { id: 'brian-gullbrants-wynn', name: 'Brian Gullbrants', role: 'President of Wynn Las Vegas', bio: 'Brian Gullbrants serves as President and COO of Wynn Las Vegas, overseeing operations of the flagship luxury resort and casino on the Las Vegas Strip.' },
  { id: 'frederic-luvisutto-wynn', name: 'Frederic Luvisutto', role: 'COO of Wynn Macau', bio: 'Frederic Luvisutto serves as COO of Wynn Macau, managing the company\'s gaming and hospitality operations in the world\'s largest gambling market.' }
]);

batch('lefrak-organization', [
  { id: 'james-lefrak', name: 'James LeFrak', role: 'Principal', bio: 'James LeFrak serves as a principal of the LeFrak Organization, part of the third generation managing the family\'s $12+ billion real estate empire spanning residential, commercial, and mixed-use developments.' },
  { id: 'jacqueline-lefrak', name: 'Jacqueline LeFrak', role: 'COO', bio: 'Jacqueline LeFrak serves as COO of the LeFrak Organization, overseeing operations of the family firm that developed Newport, one of the largest waterfront communities on the East Coast.' },
  { id: 'edward-lefrak', name: 'Edward LeFrak', role: 'Principal', bio: 'Edward LeFrak is a principal of the LeFrak Organization, the New York-based real estate dynasty that has built 200,000+ housing units over four generations.' }
]);

// ============================================================
// FOOD & BEVERAGE (3→6+)
// ============================================================
console.log('=== FOOD & BEVERAGE ===');

batch('starbucks-coffee-company', [
  { id: 'mellody-hobson-starbucks', name: 'Mellody Hobson', role: 'Chair of the Board', bio: 'Mellody Hobson serves as Chair of the Starbucks Board of Directors. She is also co-CEO of Ariel Investments and the wife of filmmaker George Lucas.' },
  { id: 'laxman-narasimhan-starbucks', name: 'Laxman Narasimhan', role: 'Former CEO (2023-2024)', bio: 'Laxman Narasimhan served as CEO of Starbucks from March 2023 to August 2024, when he was replaced by Brian Niccol amid declining same-store sales.' },
  { id: 'rachel-ruggeri-starbucks', name: 'Rachel Ruggeri', role: 'CFO', bio: 'Rachel Ruggeri serves as EVP and CFO of Starbucks Corporation, overseeing financial operations of the 35,000+ store global coffee chain.' }
]);

batch('snapple', [
  { id: 'mike-weinstein-snapple', name: 'Mike Weinstein', role: 'Former CEO', bio: 'Mike Weinstein served as CEO of Snapple Beverage Group, helping build the iced tea and juice brand founded by Leonard Marsh, Hyman Golden, and Arnold Greenberg in Queens, New York.' },
  { id: 'ken-gilbert-snapple', name: 'Ken Gilbert', role: 'Former CFO', bio: 'Ken Gilbert served as CFO of Snapple during the brand\'s explosive growth in the 1990s before its $1.7 billion acquisition by Quaker Oats in 1994.' },
  { id: 'john-bravman-snapple', name: 'John Bravman', role: 'Marketing Director', bio: 'John Bravman contributed to Snapple\'s unconventional marketing strategy including the "Made from the Best Stuff on Earth" campaign that made it a cultural phenomenon.' }
]);

batch('kind-snacks', [
  { id: 'john-leahy-kind', name: 'John Leahy', role: 'Former President & CFO', bio: 'John Leahy served as President and CFO of Kind Snacks, helping Daniel Lubetzky build the healthy snack brand that was acquired by Mars Inc. in 2020.' },
  { id: 'elle-lanning-kind', name: 'Elle Lanning', role: 'CMO', bio: 'Elle Lanning served as CMO of Kind Snacks, leading marketing strategy for the brand known for its transparent ingredient lists and social mission.' },
  { id: 'mike-repole-kind', name: 'Mike Repole', role: 'Strategic Advisor', bio: 'Mike Repole, serial beverage entrepreneur (Vitaminwater, BodyArmor), served as strategic advisor to Kind Snacks, contributing to the health-conscious brand\'s growth strategy.' }
]);

batch('starbucks-corporation', [
  { id: 'kevin-johnson-starbucks', name: 'Kevin Johnson', role: 'Former CEO (2017-2022)', bio: 'Kevin Johnson served as CEO of Starbucks Corporation from 2017 to 2022, navigating the company through the COVID-19 pandemic and expanding digital ordering and drive-through operations.' },
  { id: 'brian-niccol-starbucks2', name: 'Brian Niccol', role: 'CEO', bio: 'Brian Niccol became CEO of Starbucks in September 2024, recruited from Chipotle where he transformed that chain\'s digital business and stock performance.' },
  { id: 'mellody-hobson-starbucks2', name: 'Mellody Hobson', role: 'Board Chair', bio: 'Mellody Hobson, co-CEO of Ariel Investments, chairs the Starbucks Corporation board of directors, overseeing governance of the 35,000+ store coffee empire.' }
]);

batch('manischewitz', [
  { id: 'randall-copeland-manischewitz', name: 'Randall Copeland', role: 'Former CEO', bio: 'Randall Copeland served as CEO of the Manischewitz Company, managing the iconic kosher food brand that has been a staple of Jewish American culture since 1888.' },
  { id: 'shalom-man-manischewitz', name: 'Shalom Yehuda Manischewitz', role: 'Original Founder\'s Son', bio: 'Shalom Yehuda Manischewitz was the son of founder Dov Behr Manischewitz who expanded the matzo bakery into a full kosher food company in the early 20th century.' },
  { id: 'kayco-herzog-manischewitz', name: 'Mayer Herzog', role: 'Owner (Kayco)', bio: 'Mayer Herzog owns Kayco (Kedem Food Products), which acquired Manischewitz in 1990. Kayco is one of the largest kosher food companies in America, also producing Kedem grape juice.' }
]);

batch('nathan-s-famous', [
  { id: 'james-walker-nathans', name: 'James Walker', role: 'President & COO', bio: 'James Walker serves as President and COO of Nathan\'s Famous Inc., overseeing operations of the iconic hot dog brand founded on Coney Island in 1916.' },
  { id: 'wayne-norbitz-nathans2', name: 'Wayne Norbitz', role: 'Former President', bio: 'Wayne Norbitz served as President and COO of Nathan\'s Famous for decades, growing the Coney Island hot dog stand into a national restaurant chain and packaged goods brand.' },
  { id: 'joey-chestnut-nathans', name: 'Joey Chestnut', role: 'Competitive Eating Champion', bio: 'Joey Chestnut is the 16-time champion of Nathan\'s Famous Hot Dog Eating Contest, the annual July 4th competition on Coney Island that has become an American cultural institution.' }
]);

// ============================================================
// LAW FIRMS (3→6+)
// ============================================================
console.log('=== LAW FIRMS ===');

batch('wachtell-lipton-rosen-katz', [
  { id: 'david-gruenstein-wachtell', name: 'David Gruenstein', role: 'Partner', bio: 'David Gruenstein is a partner at Wachtell, Lipton, Rosen & Katz, one of the most prestigious and profitable law firms in the world known for pioneering the "poison pill" defense.' },
  { id: 'adam-emmerich-wachtell', name: 'Adam Emmerich', role: 'Partner', bio: 'Adam Emmerich is a partner at Wachtell, Lipton, Rosen & Katz specializing in M&A and corporate governance, advising on some of the largest transactions globally.' },
  { id: 'karessa-cain-wachtell', name: 'Karessa Cain', role: 'Partner', bio: 'Karessa Cain is a partner at Wachtell, Lipton, Rosen & Katz, working in the firm\'s Restructuring and Finance department. The firm is known for having the highest profits per partner of any US law firm.' }
]);

// ============================================================
// FASHION & CONSUMER GOODS (3→6+)
// ============================================================
console.log('=== FASHION & CONSUMER GOODS ===');

batch('ralph-lauren-corporation', [
  { id: 'halide-alagoz-rl', name: 'Halide Alagöz', role: 'COO', bio: 'Halide Alagöz serves as COO of Ralph Lauren Corporation, overseeing global operations, supply chain, and sustainability at the $6+ billion luxury fashion company.' },
  { id: 'jane-nielsen-rl', name: 'Jane Nielsen', role: 'CFO', bio: 'Jane Nielsen serves as CFO of Ralph Lauren Corporation, managing finances of the iconic American fashion house founded in 1967.' },
  { id: 'jerry-lauren-rl', name: 'Jerry Lauren', role: 'SVP of Men\'s Design', bio: 'Jerry Lauren, brother of founder Ralph Lauren, served as SVP of Men\'s Concept Design, helping shape the brand\'s classic American aesthetic for over four decades.' }
]);

batch('est-e-lauder-companies', [
  { id: 'leonard-lauder-estee', name: 'Leonard Lauder', role: 'Chairman Emeritus', bio: 'Leonard Lauder, son of founder Estée Lauder, served as CEO for decades and currently serves as Chairman Emeritus. His art collection is worth over $1 billion.' },
  { id: 'ronald-lauder-estee', name: 'Ronald Lauder', role: 'Board Member & Philanthropist', bio: 'Ronald Lauder, son of Estée Lauder, is a board member of the company, president of the World Jewish Congress, and founder of the Neue Galerie in NYC. Net worth estimated at $4.5 billion.' },
  { id: 'jane-hertzmark-lauder', name: 'Jane Hertzmark Hudis', role: 'Group President', bio: 'Jane Hertzmark Hudis serves as Group President of The Estée Lauder Companies, overseeing multiple prestige beauty brands including Estée Lauder, La Mer, and Bobbi Brown.' }
]);

batch('calvin-klein', [
  { id: 'raf-simons-ck', name: 'Raf Simons', role: 'Former Chief Creative Officer', bio: 'Raf Simons served as Chief Creative Officer of Calvin Klein from 2016-2018, reimagining the brand\'s American fashion identity before departing amid creative differences.' },
  { id: 'stefan-larsson-ck', name: 'Stefan Larsson', role: 'CEO of PVH Corp', bio: 'Stefan Larsson serves as CEO of PVH Corp, parent company of Calvin Klein and Tommy Hilfiger, overseeing the $9+ billion global fashion conglomerate.' },
  { id: 'kelly-klein', name: 'Kelly Klein', role: 'Former Creative Director', bio: 'Kelly Klein, former wife of Calvin Klein, was involved in the brand\'s creative direction and published several design and photography books reflecting the brand\'s minimalist aesthetic.' }
]);

// ============================================================
// RETAIL (3→6+)
// ============================================================
console.log('=== RETAIL ===');

batch('neiman-marcus', [
  { id: 'geoffroy-van-raemdonck-nm', name: 'Geoffroy van Raemdonck', role: 'CEO', bio: 'Geoffroy van Raemdonck serves as CEO of Neiman Marcus Group, leading the luxury retailer through bankruptcy reorganization in 2020 and its proposed merger with Saks Fifth Avenue in 2024.' },
  { id: 'al-neiman', name: 'Al Neiman', role: 'Co-founder', bio: 'Al Neiman co-founded Neiman Marcus in Dallas, Texas in 1907 alongside Herbert and Carrie Marcus. The store became synonymous with American luxury retail.' },
  { id: 'carrie-marcus-neiman', name: 'Carrie Marcus Neiman', role: 'Co-founder', bio: 'Carrie Marcus Neiman, sister of Herbert Marcus, co-founded Neiman Marcus in 1907. She was instrumental in establishing the store\'s reputation for luxury and customer service.' }
]);

batch('las-vegas-sands-corp', [
  { id: 'patrick-dumont-sands', name: 'Patrick Dumont', role: 'President & COO', bio: 'Patrick Dumont serves as President and COO of Las Vegas Sands Corp (now Sands China), son-in-law of the late Sheldon Adelson who founded the $30+ billion gaming empire.' },
  { id: 'william-goldstein-sands', name: 'William Goldstein', role: 'President of The Venetian Resort', bio: 'William Goldstein served as President and COO of The Venetian Resort Las Vegas, the flagship property of the Adelson gaming empire before its $6.25 billion sale in 2021.' },
  { id: 'rob-goldstein-sands', name: 'Robert Goldstein', role: 'Chairman & CEO', bio: 'Robert Goldstein serves as Chairman and CEO of Las Vegas Sands Corp, succeeding founder Sheldon Adelson. He oversees the Adelson family\'s gaming operations in Macau and Singapore.' }
]);

batch('toys-r-us-historic', [
  { id: 'michael-goldstein-toys', name: 'Michael Goldstein', role: 'Former Chairman & CEO', bio: 'Michael Goldstein served as Chairman and CEO of Toys "R" Us, leading the iconic toy retailer during its peak years before the leveraged buyout that led to its 2017 bankruptcy.' },
  { id: 'john-eyler-toys', name: 'John Eyler', role: 'Former CEO', bio: 'John Eyler served as CEO of Toys "R" Us from 2000-2005, overseeing the retailer during the period leading up to its $6.6 billion leveraged buyout by Bain Capital, KKR, and Vornado.' },
  { id: 'dave-brandon-toys', name: 'Dave Brandon', role: 'Former CEO', bio: 'Dave Brandon served as CEO of Toys "R" Us during its final years, presiding over the 2017 bankruptcy and liquidation of the 70-year-old retailer that once dominated American toy sales.' }
]);

// ============================================================
// PHILANTHROPY (3→6+)
// ============================================================
console.log('=== PHILANTHROPY ===');

batch('bloomberg-philanthropies', [
  { id: 'patti-harris-bloomberg', name: 'Patricia Harris', role: 'CEO', bio: 'Patricia Harris serves as CEO of Bloomberg Philanthropies, directing $1.7+ billion annual giving across public health, environment, education, government innovation, and the arts.' },
  { id: 'kate-levin-bloomberg', name: 'Kate Levin', role: 'Chief Culture Officer', bio: 'Kate Levin serves as Advisor at Bloomberg Philanthropies, previously leading the Bloomberg arts strategy after serving as NYC Commissioner of Cultural Affairs.' },
  { id: 'kelly-henning-bloomberg', name: 'Kelly Henning', role: 'Head of Public Health Program', bio: 'Kelly Henning leads the Public Health program at Bloomberg Philanthropies, overseeing initiatives that have contributed to reducing tobacco use, drowning deaths, and road fatalities worldwide.' }
]);

batch('bronfman-philanthropies', [
  { id: 'jeffrey-solomon-bronfman', name: 'Jeffrey Solomon', role: 'Former President', bio: 'Jeffrey Solomon served as President of the Andrea and Charles Bronfman Philanthropies (ACBP), overseeing programs including Birthright Israel and the Gift of New York.' },
  { id: 'adam-bronfman', name: 'Adam Bronfman', role: 'Family Board Member', bio: 'Adam Bronfman, son of Edgar Bronfman Sr., serves as a board member of Bronfman family philanthropic entities, continuing the Seagram dynasty\'s Jewish philanthropic traditions.' },
  { id: 'clare-bronfman-family', name: 'Clare Bronfman', role: 'Family Member (convicted)', bio: 'Clare Bronfman, daughter of Edgar Bronfman Sr., was sentenced to nearly 7 years in prison in 2020 for her role in the NXIVM cult, having used her Bronfman fortune to finance the organization.' }
]);

batch('steinhardt-foundation-for-jewish-life', [
  { id: 'rabbi-joy-levitt-steinhardt', name: 'Rabbi Joy Levitt', role: 'Former Board Member', bio: 'Rabbi Joy Levitt served as a board member of the Steinhardt Foundation for Jewish Life, contributing to initiatives that expanded Jewish cultural engagement.' },
  { id: 'morlie-levin-steinhardt', name: 'Morlie Levin', role: 'CEO of Birthright Israel Foundation', bio: 'Morlie Levin serves as CEO of Birthright Israel Foundation, the signature program co-founded by Michael Steinhardt that has sent 800,000+ young Jews on free trips to Israel.' },
  { id: 'michael-steinhardt-controversy', name: 'Michael Steinhardt', role: 'Founder (banned from sector)', bio: 'Michael Steinhardt, billionaire hedge fund pioneer, was banned from leadership at nonprofit organizations in 2021 following multiple sexual harassment allegations from women in Jewish institutional life.' }
]);

// ============================================================
// RELIGION & SYNAGOGUES (3→6+)
// ============================================================
console.log('=== RELIGION & SYNAGOGUES ===');

batch('chabad-lubavitch', [
  { id: 'sholom-ber-levin-chabad', name: 'Sholom Ber Levin', role: 'Chief Librarian', bio: 'Rabbi Sholom Ber Levin serves as Chief Librarian of the Agudas Chassidei Chabad Library at 770 Eastern Parkway, Brooklyn, housing over 250,000 volumes of Jewish texts.' },
  { id: 'devorah-benjaminson-chabad', name: 'Devorah Benjaminson', role: 'International Director of CTEEN', bio: 'Devorah Benjaminson serves as International Director of CTeen (Chabad Teen Network), the youth division serving Jewish teenagers through Chabad-Lubavitch\'s 5,000+ centers worldwide.' },
  { id: 'moshe-greenwald-chabad', name: 'Moshe Kotlarsky', role: 'Former Vice Chairman', bio: 'Rabbi Moshe Kotlarsky served as Vice Chairman of Merkos L\'Inyonei Chinuch, Chabad-Lubavitch\'s educational arm, overseeing the Shluchim (emissary) network across 100+ countries before his passing in 2024.' }
]);

// ============================================================
// HERITAGE & MEMORIALS (3→6+)
// ============================================================
console.log('=== HERITAGE & MEMORIALS ===');

batch('claims-conference-conference-on-jewish-material-claims-against-germany', [
  { id: 'ruediger-mahlo-claims', name: 'Rüdiger Mahlo', role: 'Representative in Germany', bio: 'Rüdiger Mahlo serves as Representative of the Claims Conference in Germany, managing the organization\'s relationship with the German government which has paid $90+ billion in Holocaust reparations.' },
  { id: 'shmuel-hollander-claims', name: 'Shmuel Hollander', role: 'SVP of Finance', bio: 'Shmuel Hollander served as SVP of Finance at the Claims Conference, which was rocked by a $57 million fraud scheme discovered in 2009 involving fabricated claims.' },
  { id: 'wesley-fisher-claims', name: 'Wesley Fisher', role: 'Director of Research', bio: 'Wesley Fisher serves as Director of Research at the Claims Conference, overseeing documentation of $90+ billion in Holocaust restitution and compensation payments since 1951.' }
]);

batch('museum-of-the-jewish-people-at-beit-hatfutsot', [
  { id: 'orit-shaham-gover', name: 'Orit Shaham-Gover', role: 'Chief Curator', bio: 'Orit Shaham-Gover serves as Chief Curator at the Museum of the Jewish People at Beit Hatfutsot, curating exhibitions that tell the story of Jewish life across 4,000 years and 130 countries.' },
  { id: 'ron-lauffer', name: 'Ron Lauffer', role: 'Deputy Director', bio: 'Ron Lauffer serves as Deputy Director of the Museum of the Jewish People at Beit Hatfutsot, managing operations following the museum\'s $100 million renovation completed in 2021.' },
  { id: 'jack-ukeles-hatfutsot', name: 'Jack Ukeles', role: 'Strategic Planning Consultant', bio: 'Jack Ukeles served as strategic planning consultant for the Museum of the Jewish People at Beit Hatfutsot, guiding the institution\'s major renovation and rebranding from Diaspora Museum.' }
]);

// ============================================================
// REPRESENTATIVE & UMBRELLA BODIES (3→6+)
// ============================================================
console.log('=== REPRESENTATIVE & UMBRELLA BODIES ===');

batch('the-jewish-federations-of-north-america', [
  { id: 'jerry-silverman-jfna', name: 'Jerry Silverman', role: 'Former President & CEO', bio: 'Jerry Silverman served as President and CEO of the Jewish Federations of North America from 2009-2020, overseeing the umbrella organization representing 146 federations and 300 communities.' },
  { id: 'mark-wilf-jfna', name: 'Mark Wilf', role: 'Former Board Chair', bio: 'Mark Wilf, co-owner of the Minnesota Vikings NFL team, served as Board Chair of the Jewish Federations of North America, bringing business leadership to the largest Jewish communal organization.' },
  { id: 'becky-caspi-jfna', name: 'Becky Caspi', role: 'Senior VP', bio: 'Becky Caspi serves as Senior VP of the Jewish Federations of North America, overseeing programs that raise and distribute over $3 billion annually for Jewish causes worldwide.' }
]);

batch('world-jewish-congress-headquarters', [
  { id: 'robert-singer-wjc', name: 'Robert Singer', role: 'Former CEO', bio: 'Robert Singer served as CEO and Executive Vice President of the World Jewish Congress, managing global operations of the international organization representing Jewish communities in 100+ countries.' },
  { id: 'maram-stern-wjc', name: 'Maram Stern', role: 'Executive VP', bio: 'Maram Stern serves as Executive VP of the World Jewish Congress, serving as the organization\'s senior diplomatic representative in dealings with governments and international bodies.' },
  { id: 'menachem-rosensaft-wjc', name: 'Menachem Rosensaft', role: 'General Counsel', bio: 'Menachem Rosensaft serves as General Counsel and Associate Executive VP of the World Jewish Congress. He is a child of Holocaust survivors and adjunct professor of law at Cornell.' }
]);

batch('crif-conseil-repr-sentatif-des-institutions-juives-de-france', [
  { id: 'nathalie-delattre-crif', name: 'Nathalie Delattre', role: 'VP', bio: 'Nathalie Delattre has served in leadership at CRIF (Conseil Représentatif des Institutions Juives de France), the umbrella organization representing French Jewish communal life.' },
  { id: 'serge-cwajgenbaum-crif', name: 'Serge Cwajgenbaum', role: 'Former Secretary General', bio: 'Serge Cwajgenbaum served as Secretary General of CRIF, managing operations of the representative body of French Jewish institutions that advocates before the French government.' },
  { id: 'joel-mergui-crif', name: 'Joël Mergui', role: 'President of Consistoire Central', bio: 'Rabbi Joël Mergui serves as President of the Consistoire Central, the religious authority for Judaism in France that works alongside CRIF to represent the 500,000-strong French Jewish community.' }
]);

// ============================================================
// RESEARCH & THINK TANKS (3→6+)
// ============================================================
console.log('=== RESEARCH & THINK TANKS ===');

batch('rand-corporation', [
  { id: 'andrew-hoehn-rand', name: 'Andrew Hoehn', role: 'SVP for Research', bio: 'Andrew Hoehn serves as SVP for Research and Analysis at RAND Corporation, overseeing research programs that inform US defense, education, and public policy.' },
  { id: 'seth-jones-rand', name: 'Seth Jones', role: 'VP for International Security', bio: 'Seth Jones serves as VP and Director of the International Security and Defense Policy Program at RAND, a leading expert on counterterrorism and defense strategy.' },
  { id: 'obaid-younossi-rand', name: 'Obaid Younossi', role: 'Director of RAND Project Air Force', bio: 'Obaid Younossi directs RAND Project Air Force, the Air Force\'s federally funded research center that shapes US military aviation strategy and force planning.' }
]);

batch('washington-institute-for-near-east-policy-winep', [
  { id: 'patrick-clawson-winep', name: 'Patrick Clawson', role: 'Director of Research', bio: 'Patrick Clawson serves as Director of Research at the Washington Institute for Near East Policy, one of the most influential Middle East think tanks in Washington with close ties to Israeli policy.' },
  { id: 'michael-singh-winep', name: 'Michael Singh', role: 'Lane-Swig Senior Fellow', bio: 'Michael Singh serves as Lane-Swig Senior Fellow and Managing Director at the Washington Institute, a former NSC Senior Director for Middle East Affairs under President George W. Bush.' },
  { id: 'david-makovsky-winep', name: 'David Makovsky', role: 'Ziegler Distinguished Fellow', bio: 'David Makovsky serves as Ziegler Distinguished Fellow at WINEP, an expert on the Israeli-Palestinian peace process and author of multiple books on Middle East diplomacy.' }
]);

// ============================================================
// MANUFACTURING & INDUSTRY (3→6+)
// ============================================================
console.log('=== MANUFACTURING & INDUSTRY ===');

batch('de-beers-group', [
  { id: 'mark-cutifani-debeers', name: 'Mark Cutifani', role: 'Former CEO of Anglo American', bio: 'Mark Cutifani served as CEO of Anglo American, De Beers\' parent company, overseeing the diamond giant from its majority ownership position.' },
  { id: 'bruce-cleaver-debeers', name: 'Bruce Cleaver', role: 'Former CEO', bio: 'Bruce Cleaver served as CEO of De Beers Group, managing the world\'s leading diamond company that produces ~30% of global diamond supply from mines in Botswana, South Africa, Namibia, and Canada.' },
  { id: 'jonathan-oppenheimer', name: 'Jonathan Oppenheimer', role: 'Family Successor', bio: 'Jonathan Oppenheimer, son of Nicky Oppenheimer, represents the next generation of the Oppenheimer dynasty. The family sold their 40% stake in De Beers to Anglo American for $5.1 billion in 2012.' }
]);

batch('israel-chemicals-icl', [
  { id: 'aviram-lahav-icl', name: 'Aviram Lahav', role: 'CFO', bio: 'Aviram Lahav serves as CFO of ICL Group, managing finances of the $6 billion Israeli specialty minerals and chemicals company operating in the Dead Sea region and worldwide.' },
  { id: 'elamprakash-narasimhan-icl', name: 'Elamprakash Narasimhan', role: 'President of Phosphate Solutions', bio: 'Elamprakash Narasimhan leads ICL\'s Phosphate Solutions division, managing the company\'s global phosphate mining and specialty chemical production.' },
  { id: 'michal-silverberg-icl', name: 'Michal Silverberg', role: 'VP of Communications', bio: 'Michal Silverberg serves as VP of Global Communications at ICL Group, the Israeli-headquartered company that is one of the world\'s largest potash and phosphate producers.' }
]);

// ============================================================
// GOVERNMENT & DIPLOMACY (3→6+)
// ============================================================
console.log('=== GOVERNMENT & DIPLOMACY ===');

batch('us-department-of-state-special-envoy-antisemitism', [
  { id: 'hannah-rosenthal-envoy', name: 'Hannah Rosenthal', role: 'Former Special Envoy (2009-2012)', bio: 'Hannah Rosenthal served as Special Envoy to Monitor and Combat Antisemitism under President Obama from 2009-2012, the first woman to hold the position.' },
  { id: 'greg-rickman-envoy', name: 'Gregg Rickman', role: 'Former Special Envoy (2006-2009)', bio: 'Gregg Rickman served as Special Envoy to Monitor and Combat Antisemitism from 2006 to 2009, focusing on European antisemitism and Holocaust asset recovery.' },
  { id: 'john-miller-envoy', name: 'John Miller', role: 'First Special Envoy (2004-2005)', bio: 'John Miller served as the first Special Envoy to Monitor and Combat Antisemitism from 2004-2005, establishing the office created by the Global Anti-Semitism Review Act.' }
]);

// ============================================================
// TELECOMMUNICATIONS (3→6+)
// ============================================================
console.log('=== TELECOMMUNICATIONS ===');

batch('bezeq', [
  { id: 'ran-guron-bezeq', name: 'Ran Guron', role: 'CEO', bio: 'Ran Guron serves as CEO of Bezeq, Israel\'s largest telecommunications provider serving millions with landline, internet, and satellite TV through its subsidiaries.' },
  { id: 'david-mizrahi-bezeq', name: 'David Mizrahi', role: 'CFO', bio: 'David Mizrahi serves as CFO of Bezeq Israeli Telecommunication Corporation, managing finances of the company whose controlling shareholder Shaul Elovitch was convicted in the Netanyahu corruption case.' },
  { id: 'dudu-mizrahi-bezeq', name: 'Dudu Mizrahi', role: 'VP of Technology', bio: 'Dudu Mizrahi leads technology operations at Bezeq, overseeing Israel\'s broadband infrastructure and fiber optic network expansion serving 2.4 million households.' }
]);

// ============================================================
// TRANSPORTATION (3→6+)
// ============================================================
console.log('=== TRANSPORTATION ===');

batch('spacex', [
  { id: 'mark-juncosa-spacex', name: 'Mark Juncosa', role: 'VP of Vehicle Engineering', bio: 'Mark Juncosa serves as VP of Vehicle Engineering at SpaceX, overseeing the design and development of Falcon 9, Falcon Heavy, and Starship launch vehicles.' },
  { id: 'bill-gerstenmaier-spacex', name: 'Bill Gerstenmaier', role: 'VP of Build & Flight Reliability', bio: 'Bill Gerstenmaier serves as VP of Build and Flight Reliability at SpaceX after 40 years at NASA where he served as Associate Administrator for Human Exploration.' },
  { id: 'kathy-lueders-spacex', name: 'Kathy Lueders', role: 'VP of Starbase Operations', bio: 'Kathy Lueders serves as VP of Starbase Operations at SpaceX, overseeing the Boca Chica, Texas launch facility. She previously headed NASA\'s Human Spaceflight program.' }
]);

batch('zim-integrated-shipping-services', [
  { id: 'xavier-destriau-zim', name: 'Xavier Destriau', role: 'CFO', bio: 'Xavier Destriau serves as CFO of ZIM Integrated Shipping Services, managing finances of the Israeli shipping company that went public on NYSE in 2021.' },
  { id: 'david-arbel-zim', name: 'David Arbel', role: 'COO', bio: 'David Arbel serves as COO of ZIM Integrated Shipping Services, overseeing fleet operations of the Israeli carrier operating 150+ vessels across global trade routes.' },
  { id: 'noam-raz-zim', name: 'Noam Raz', role: 'Chief Commercial Officer', bio: 'Noam Raz serves as Chief Commercial Officer of ZIM, managing the commercial strategy of Israel\'s largest shipping company.' }
]);

// ============================================================
// UTILITIES & ENERGY (3→6+)
// ============================================================
console.log('=== UTILITIES & ENERGY ===');

batch('cheniere-energy', [
  { id: 'zach-davis-cheniere', name: 'Zach Davis', role: 'CFO', bio: 'Zach Davis serves as CFO of Cheniere Energy, managing finances of the largest LNG exporter in the US and the second-largest globally.' },
  { id: 'corey-grindal-cheniere', name: 'Corey Grindal', role: 'EVP of Operations', bio: 'Corey Grindal serves as EVP of Operations at Cheniere Energy, overseeing LNG production at the Sabine Pass and Corpus Christi terminals that export American natural gas worldwide.' },
  { id: 'sean-markowitz-cheniere', name: 'Sean Markowitz', role: 'SVP of Investor Relations', bio: 'Sean Markowitz serves as SVP of Investor Relations at Cheniere Energy, the $40+ billion company that transformed the US into the world\'s leading LNG exporter.' }
]);

// ============================================================
// ADVERTISING & PR (3→6+)
// ============================================================
console.log('=== ADVERTISING & PR ===');

batch('wpp-plc-us-operations', [
  { id: 'mark-read-wpp', name: 'Mark Read', role: 'CEO', bio: 'Mark Read serves as CEO of WPP plc, the world\'s largest advertising and PR holding company with $15+ billion in revenue and agencies including Ogilvy, GroupM, and VMLY&R.' },
  { id: 'sir-martin-sorrell-wpp', name: 'Sir Martin Sorrell', role: 'Founder & Former CEO', bio: 'Sir Martin Sorrell founded and built WPP from a wire basket company into the world\'s largest advertising empire over 33 years before departing in 2018 to found S4 Capital.' },
  { id: 'john-rogers-wpp', name: 'John Rogers', role: 'CFO', bio: 'John Rogers serves as CFO of WPP plc, managing finances of the London-headquartered advertising giant that employs 100,000+ people across 100+ countries.' }
]);

// ============================================================
// Save
// ============================================================
const outJD = hasPeopleWrapper ? JD : JD;
const outPD = hasPeopleWrapper ? { people } : people;

fs.writeFileSync(JD_PATH, JSON.stringify(JD, null, 2));
fs.writeFileSync(PD_PATH, JSON.stringify(outPD, null, 2));

// Count totals
let totalInds = 0, totalEntries = 0;
for (const c in JD.countries) { for (const e of JD.countries[c]) { totalEntries++; totalInds += (e.individuals||[]).length; } }
console.log(`\n=== RESULTS ===`);
console.log(`Added ${added} new individuals`);
console.log(`Total entries: ${totalEntries}`);
console.log(`Total individuals across entries: ${totalInds}`);
console.log(`Total people: ${Object.keys(people).length}`);

// Distribution
const dist = {'1-2':0,'3':0,'4':0,'5':0,'6-10':0,'11+':0};
for (const c in JD.countries) { for (const e of JD.countries[c]) { const n=(e.individuals||[]).length; if(n<=2)dist['1-2']++;else if(n===3)dist['3']++;else if(n===4)dist['4']++;else if(n===5)dist['5']++;else if(n<=10)dist['6-10']++;else dist['11+']++; } }
console.log('Distribution:', JSON.stringify(dist));
