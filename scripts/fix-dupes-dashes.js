#!/usr/bin/env node
/**
 * fix-dupes-dashes.js - Merge duplicate entries, fix duplicate affiliations, remove all em/en dashes
 */
const fs = require('fs');
const path = require('path');

const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');

const jd = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const pd = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));

let changes = 0;

// ─── 1. Merge duplicate entries ───────────────────────────────────────────
// Map of duplicate ID to keep ID (the one we keep gets the merged data)
const MERGE_MAP = {
  'h-agen-dazs': 'haagen-dazs',           // Häagen-Dazs umlaut slug dupe
  'iheartmedia': 'iheart-media',
  'jewish-national-fund-usa': 'jewish-national-fund-usa-jnf-usa',  // keep the more specific one
  'starbucks-howard-schultz-era': 'starbucks',
  'dell-technologies-israel-operations': 'dell-technologies',
  'the-washington-post': 'washington-post',
  'israel-aerospace-industries': 'israel-aerospace-industries-iai',
  'marks-spencer-m-s': 'marks-spencer',
  'mercadolibre': 'mercado-libre',
  'softbank': 'softbank-group',
};

for (const [removeId, keepId] of Object.entries(MERGE_MAP)) {
  let removeEntry = null, removeCountry = null, removeIdx = -1;
  let keepEntry = null, keepCountry = null;

  for (const c in jd.countries) {
    for (let i = 0; i < jd.countries[c].length; i++) {
      const e = jd.countries[c][i];
      if (e.id === removeId) { removeEntry = e; removeCountry = c; removeIdx = i; }
      if (e.id === keepId) { keepEntry = e; keepCountry = c; }
    }
  }

  if (!removeEntry) { console.log(`  Skip ${removeId}: not found`); continue; }
  if (!keepEntry) { console.log(`  Skip ${removeId}: keep target ${keepId} not found`); continue; }

  // Merge: take the longer description
  if ((removeEntry.description || '').length > (keepEntry.description || '').length) {
    keepEntry.description = removeEntry.description;
  }

  // Merge individuals (by id, avoid dupes)
  const existingIndIds = new Set((keepEntry.individuals || []).map(i => i.id));
  if (removeEntry.individuals) {
    for (const ind of removeEntry.individuals) {
      if (!existingIndIds.has(ind.id)) {
        if (!keepEntry.individuals) keepEntry.individuals = [];
        keepEntry.individuals.push(ind);
        existingIndIds.add(ind.id);
        console.log(`  Merged individual ${ind.name} from ${removeId} into ${keepId}`);
      }
    }
  }

  // Merge connections (by name, avoid dupes)
  const existingConnNames = new Set((keepEntry.connections || []).map(c => (c.name || c.target || '').toLowerCase()));
  if (removeEntry.connections) {
    for (const conn of removeEntry.connections) {
      const key = (conn.name || conn.target || '').toLowerCase();
      if (!existingConnNames.has(key)) {
        if (!keepEntry.connections) keepEntry.connections = [];
        keepEntry.connections.push(conn);
        existingConnNames.add(key);
        console.log(`  Merged connection ${conn.name || conn.target} from ${removeId} into ${keepId}`);
      }
    }
  }

  // Merge other fields
  if (!keepEntry.website && removeEntry.website) keepEntry.website = removeEntry.website;
  if (!keepEntry.founded && removeEntry.founded) keepEntry.founded = removeEntry.founded;
  if (!keepEntry.category && removeEntry.category) keepEntry.category = removeEntry.category;

  // Remove the duplicate entry
  jd.countries[removeCountry].splice(removeIdx, 1);
  console.log(`  MERGED ${removeId} -> ${keepId} (removed from ${removeCountry})`);
  changes++;

  // Update all references in connections across all entries
  for (const c in jd.countries) {
    for (const e of jd.countries[c]) {
      if (e.connections) {
        for (const conn of e.connections) {
          if (conn.entryId === removeId) { conn.entryId = keepId; changes++; }
          if (conn.target === removeId) { conn.target = keepId; changes++; }
          if (conn.source === removeId) { conn.source = keepId; changes++; }
        }
      }
    }
  }

  // Update people.json affiliations
  for (const [pid, person] of Object.entries(pd.people)) {
    if (person.affiliations) {
      for (const aff of person.affiliations) {
        if (aff.entryId === removeId) {
          aff.entryId = keepId;
          aff.organization = keepEntry.name;
          console.log(`  Fixed affiliation for ${person.name}: ${removeId} -> ${keepId}`);
          changes++;
        }
      }
    }
  }
}

// ─── 2. Deduplicate individuals within each entry ─────────────────────────
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    if (!e.individuals) continue;
    const seen = new Set();
    const deduped = [];
    for (const ind of e.individuals) {
      // Dedup by id OR by normalized name if no id
      const key = ind.id || ind.name.toLowerCase().replace(/[^a-z]/g, '');
      if (seen.has(key)) {
        console.log(`  Removed duplicate individual ${ind.name} from ${e.id}`);
        changes++;
        continue;
      }
      seen.add(key);
      deduped.push(ind);
    }
    e.individuals = deduped;
  }
}

// ─── 3. Deduplicate affiliations in people.json ──────────────────────────
for (const [pid, person] of Object.entries(pd.people)) {
  if (!person.affiliations || person.affiliations.length <= 1) continue;
  const seen = new Set();
  const deduped = [];
  for (const aff of person.affiliations) {
    const key = (aff.entryId || aff.organization || '').toLowerCase();
    if (seen.has(key)) {
      console.log(`  Removed duplicate affiliation "${aff.organization}" from ${person.name}`);
      changes++;
      continue;
    }
    seen.add(key);
    deduped.push(aff);
  }
  person.affiliations = deduped;
}

// ─── 4. Remove ALL em dashes (—) and en dashes (–) from data ────────────
function replaceDashes(obj) {
  if (typeof obj === 'string') {
    let s = obj;
    if (s.includes('\u2014')) { s = s.replace(/\u2014/g, ' - '); changes++; }
    if (s.includes('\u2013')) { s = s.replace(/\u2013/g, '-'); changes++; }
    return s;
  }
  if (Array.isArray(obj)) return obj.map(replaceDashes);
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      obj[k] = replaceDashes(obj[k]);
    }
  }
  return obj;
}

replaceDashes(jd);
replaceDashes(pd);

// ─── 5. Remove orphaned people entries that reference removed entries ────
// Also clean up person-* dummy IDs from duplicate entries
for (const [pid, person] of Object.entries(pd.people)) {
  if (person.affiliations) {
    person.affiliations = person.affiliations.filter(aff => {
      // Check if the entryId exists
      if (!aff.entryId) return true;
      // Check across all countries
      for (const c in jd.countries) {
        for (const e of jd.countries[c]) {
          if (e.id === aff.entryId) return true;
        }
      }
      console.log(`  Removed orphan affiliation ${aff.entryId} from ${person.name}`);
      changes++;
      return false;
    });
  }
}

// ─── Write back ──────────────────────────────────────────────────────────
fs.writeFileSync(JD_PATH, JSON.stringify(jd, null, 2), 'utf8');
fs.writeFileSync(PD_PATH, JSON.stringify(pd, null, 2), 'utf8');

console.log(`\nDone! ${changes} changes made.`);

// Final stats
let total = 0;
for (const c in jd.countries) total += jd.countries[c].length;
console.log(`Entries: ${total}, People: ${Object.keys(pd.people).length}`);
