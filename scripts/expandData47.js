/**
 * expandData47.js – Fix entry references with correct IDs + more people to entries
 */
const fs = require('fs');
const path = require('path');
const pFile = path.join(__dirname, '..', 'data', 'people.json');
const jFile = path.join(__dirname, '..', 'data', 'jewish.json');
const pd = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const jd = JSON.parse(fs.readFileSync(jFile, 'utf8'));

function addToEntry(country, entryId, individual) {
  if (!jd.countries[country]) return false;
  const entry = jd.countries[country].find(e => e.id === entryId);
  if (!entry) return false;
  if (!entry.individuals) entry.individuals = [];
  if (entry.individuals.some(i => i.id === individual.id)) return false;
  entry.individuals.push(individual);
  return true;
}

let added = 0;

const refs = [
  // Media
  ['United States', 'fox-corporation', { name: 'Rupert Murdoch', id: 'rupert-murdoch', role: 'Founder & Chairman Emeritus' }],
  ['United States', 'fox-news-channel', { name: 'Rupert Murdoch', id: 'rupert-murdoch', role: 'Founder' }],
  ['United States', 'comcast-corporation', { name: 'Brian Roberts', id: 'brian-roberts', role: 'Chairman & CEO' }],
  ['United States', 'the-walt-disney-company', { name: 'Bob Iger', id: 'bob-iger', role: 'CEO' }],
  ['United States', 'walt-disney-company', { name: 'Bob Iger', id: 'bob-iger', role: 'CEO' }],
  ['United States', 'warner-bros-discovery', { name: 'David Zaslav', id: 'david-zaslav', role: 'CEO' }],
  ['United States', 'warner-music-group', { name: 'Len Blavatnik', id: 'len-blavatnik', role: 'Owner' }],
  
  // Finance
  ['United States', 'goldman-sachs-historic', { name: 'Lloyd Blankfein', id: 'lloyd-blankfein', role: 'Former Chairman & CEO' }],
  ['United States', 'goldman-sachs-historic', { name: 'David Solomon', id: 'david-solomon', role: 'Chairman & CEO' }],
  ['United States', 'jpmorgan-chase', { name: 'Jamie Dimon', id: 'jamie-dimon', role: 'Chairman & CEO' }],
  ['United States', 'the-blackstone-group', { name: 'Steve Schwarzman', id: 'steve-schwarzman', role: 'Co-Founder, Chairman & CEO' }],
  ['United States', 'blackstone-group', { name: 'Steve Schwarzman', id: 'steve-schwarzman', role: 'Co-Founder, Chairman & CEO' }],
  ['United States', 'soros-fund-management', { name: 'George Soros', id: 'george-soros', role: 'Founder & Chairman' }],
  ['United States', 'george-soros-open-society-foundations', { name: 'George Soros', id: 'george-soros', role: 'Founder' }],
  
  // Tech
  ['United States', 'meta-platforms-facebook', { name: 'Mark Zuckerberg', id: 'mark-zuckerberg', role: 'Founder, Chairman & CEO' }],
  ['United States', 'meta-platforms-facebook', { name: 'Sheryl Sandberg', id: 'sheryl-sandberg', role: 'Former COO' }],
  ['United States', 'google-alphabet-inc', { name: 'Sergey Brin', id: 'sergey-brin', role: 'Co-Founder' }],
  ['United States', 'google-alphabet-inc', { name: 'Larry Page', id: 'larry-page', role: 'Co-Founder' }],
  ['United States', 'alphabet-google', { name: 'Sergey Brin', id: 'sergey-brin', role: 'Co-Founder' }],
  ['United States', 'alphabet-google', { name: 'Larry Page', id: 'larry-page', role: 'Co-Founder' }],
  ['United States', 'oracle-corporation', { name: 'Larry Ellison', id: 'larry-ellison', role: 'Co-Founder & Chairman' }],
  ['United States', 'dell-technologies', { name: 'Michael Dell', id: 'michael-dell', role: 'Founder, Chairman & CEO' }],
  ['United States', 'dell-technologies-israel-operations', { name: 'Michael Dell', id: 'michael-dell', role: 'Founder' }],
  ['United States', 'salesforce', { name: 'Marc Benioff', id: 'marc-benioff', role: 'Founder, Chairman & CEO' }],
  ['United States', 'amazon', { name: 'Jeff Bezos', id: 'jeff-bezos', role: 'Founder & Executive Chairman' }],
  ['United States', 'amazon-israel-r-d', { name: 'Jeff Bezos', id: 'jeff-bezos', role: 'Founder' }],
  ['United States', 'openai', { name: 'Sam Altman', id: 'sam-altman', role: 'CEO' }],
  ['United States', 'bloomberg-l-p', { name: 'Michael Bloomberg', id: 'michael-bloomberg', role: 'Founder & CEO' }],
  ['United States', 'bloomberg-philanthropies', { name: 'Michael Bloomberg', id: 'michael-bloomberg', role: 'Founder' }],
  
  // Orgs
  ['United States', 'aipac', { name: 'Chuck Schumer', id: 'chuck-schumer', role: 'Key Congressional Ally' }],
  ['Israel', 'birthright-israel', { name: 'Charles Bronfman', id: 'charles-bronfman', role: 'Co-Founder' }],
  ['Israel', 'birthright-israel', { name: 'Michael Steinhardt', id: 'michael-steinhardt', role: 'Co-Founder' }],
  ['Israel', 'birthright-israel-foundation', { name: 'Charles Bronfman', id: 'charles-bronfman', role: 'Co-Founder' }],
  ['Israel', 'birthright-israel-foundation', { name: 'Michael Steinhardt', id: 'michael-steinhardt', role: 'Co-Founder' }],
  ['International', 'world-jewish-congress', { name: 'Ronald Lauder', id: 'ronald-lauder', role: 'President' }],
  ['Switzerland', 'world-jewish-congress-headquarters', { name: 'Ronald Lauder', id: 'ronald-lauder', role: 'President' }],
  ['Israel', 'knesset', { name: 'Benjamin Netanyahu', id: 'benjamin-netanyahu', role: 'Prime Minister' }],
  ['Israel', 'knesset-israeli-parliament', { name: 'Benjamin Netanyahu', id: 'benjamin-netanyahu', role: 'Prime Minister' }],
  
  // Additional
  ['United States', 'epstein-network', { name: 'Katie Couric', id: 'katie-couric', role: 'Dinner Attendee (2010)' }],
  ['United States', 'epstein-network', { name: 'George Stephanopoulos', id: 'george-stephanopoulos', role: 'Dinner Attendee (2010)' }],
  
  // Sheldon Adelson
  ['United States', 'las-vegas-sands', { name: 'Miriam Adelson', id: 'sheldon-adelson-estate', role: 'Majority Owner (widow)' }],
  ['United States', 'las-vegas-sands', { name: 'Sheldon Adelson', id: 'sheldon-adelson', role: 'Founder & Former CEO (d. 2021)' }],
  
  // Hollywood
  ['United States', 'steven-spielberg-amblin', { name: 'Steven Spielberg', id: 'steven-spielberg', role: 'Founder & Director' }],
];

refs.forEach(([country, entryId, ind]) => {
  if (addToEntry(country, entryId, ind)) added++;
});

fs.writeFileSync(jFile, JSON.stringify(jd, null, 2));

let totalIndRefs = 0;
for (const c in jd.countries) for (const e of jd.countries[c]) if (e.individuals) totalIndRefs += e.individuals.length;
console.log(`Added ${added} new entry references`);
console.log(`Total individual references: ${totalIndRefs}`);
