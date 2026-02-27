const fs = require('fs');
const path = require('path');

const jewishPath = path.join(__dirname, '..', 'data', 'jewish.json');
const peoplePath = path.join(__dirname, '..', 'data', 'people.json');
const jd = JSON.parse(fs.readFileSync(jewishPath, 'utf8'));
const pd = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

function fixDashes(obj) {
  let s = JSON.stringify(obj);
  s = s.replace(/\u2013/g, '-').replace(/\u2014/g, '-');
  return JSON.parse(s);
}

// =====================================================================
// Fix 4 duplicate entries by merging the best data and removing dupes
// =====================================================================

function mergeConnections(a, b) {
  const seen = new Set();
  const result = [];
  for (const conn of [...(a || []), ...(b || [])]) {
    const key = conn.target || conn.name || JSON.stringify(conn);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(conn);
    }
  }
  return result;
}

function mergeIndividuals(a, b) {
  const seen = new Set();
  const result = [];
  for (const ind of [...(a || []), ...(b || [])]) {
    if (!seen.has(ind.name)) {
      seen.add(ind.name);
      result.push(ind);
    }
  }
  return result;
}

// For each duplicate, keep the entry in the most appropriate country with merged data
const duplicates = {
  'ohel-leah-synagogue': { keep: 'Hong Kong', remove: 'China' },
  'birthright-israel-foundation': { keep: 'Israel', remove: 'United States' },
  'brookfield-asset-management': { keep: 'Canada', remove: 'United States' },
  'european-jewish-congress': { keep: 'Belgium', remove: 'International' }
};

for (const [id, { keep, remove }] of Object.entries(duplicates)) {
  let keepEntry = null, removeEntry = null;
  let keepIdx = -1, removeIdx = -1;
  
  if (jd.countries[keep]) {
    keepIdx = jd.countries[keep].findIndex(e => e.id === id);
    if (keepIdx >= 0) keepEntry = jd.countries[keep][keepIdx];
  }
  if (jd.countries[remove]) {
    removeIdx = jd.countries[remove].findIndex(e => e.id === id);
    if (removeIdx >= 0) removeEntry = jd.countries[remove][removeIdx];
  }
  
  if (keepEntry && removeEntry) {
    // Merge connections and individuals from removed into kept
    keepEntry.connections = mergeConnections(keepEntry.connections, removeEntry.connections);
    keepEntry.individuals = mergeIndividuals(keepEntry.individuals, removeEntry.individuals);
    // Use the longer description
    if ((removeEntry.description || '').length > (keepEntry.description || '').length) {
      keepEntry.description = removeEntry.description;
    }
    // Use website if missing
    if (!keepEntry.website && removeEntry.website) keepEntry.website = removeEntry.website;
    // Remove the duplicate
    jd.countries[remove].splice(removeIdx, 1);
    console.log('Merged', id, '- kept in', keep, ', removed from', remove);
  } else {
    console.log('Could not find both entries for', id);
  }
}

// Also find and fix duplicate estee-lauder entries
let esteeDupes = [];
for (const c of Object.keys(jd.countries)) {
  for (let i = 0; i < jd.countries[c].length; i++) {
    const e = jd.countries[c][i];
    if (e.id === 'estee-lauder-companies' || e.id === 'the-estee-lauder-companies') {
      esteeDupes.push({ country: c, idx: i, entry: e });
    }
  }
}
if (esteeDupes.length === 2) {
  // Merge into one
  const keep = esteeDupes[1]; // the-estee-lauder-companies (more complete)
  const remove = esteeDupes[0]; // estee-lauder-companies
  keep.entry.connections = mergeConnections(keep.entry.connections, remove.entry.connections);
  keep.entry.individuals = mergeIndividuals(keep.entry.individuals, remove.entry.individuals);
  if ((remove.entry.description || '').length > (keep.entry.description || '').length) {
    keep.entry.description = remove.entry.description;
  }
  jd.countries[remove.country].splice(remove.idx, 1);
  console.log('Merged estee-lauder duplicates');
}

// Also check for any ASML duplicate
let asmlDupes = [];
for (const c of Object.keys(jd.countries)) {
  for (let i = 0; i < jd.countries[c].length; i++) {
    if (jd.countries[c][i].id === 'asml' || jd.countries[c][i].id === 'asml-holding') {
      asmlDupes.push({ country: c, idx: i, entry: jd.countries[c][i] });
    }
  }
}
if (asmlDupes.length === 2) {
  const keep = asmlDupes.find(a => a.entry.id === 'asml-holding') || asmlDupes[1];
  const remove = asmlDupes.find(a => a.entry.id !== keep.entry.id);
  if (keep && remove) {
    keep.entry.connections = mergeConnections(keep.entry.connections, remove.entry.connections);
    keep.entry.individuals = mergeIndividuals(keep.entry.individuals, remove.entry.individuals);
    jd.countries[remove.country].splice(remove.idx, 1);
    console.log('Merged ASML duplicates');
  }
}

// Fix dashes
const fixedJd = fixDashes(jd);
const fixedPd = fixDashes(pd);

let totalEntries = 0, totalConns = 0, zeroIndiv = 0, zeroConn = 0, lowConn = 0;
for (const c of Object.keys(fixedJd.countries)) {
  for (const e of fixedJd.countries[c]) {
    totalEntries++;
    totalConns += (e.connections || []).length;
    if ((e.individuals || []).length === 0) zeroIndiv++;
    if ((e.connections || []).length === 0) zeroConn++;
    if ((e.connections || []).length <= 1) lowConn++;
  }
}
const totalPeople = Object.keys(fixedPd.people).length;

console.log('\n=== expandData43 (Dedup) Results ===');
console.log('Total entries:', totalEntries);
console.log('Total people:', totalPeople);
console.log('Total connections:', totalConns);
console.log('Entries with 0 connections:', zeroConn);
console.log('Entries with 0-1 connections:', lowConn);
console.log('Entries with 0 individuals:', zeroIndiv);

fs.writeFileSync(jewishPath, JSON.stringify(fixedJd, null, 2));
fs.writeFileSync(peoplePath, JSON.stringify(fixedPd, null, 2));
console.log('Files written successfully.');
