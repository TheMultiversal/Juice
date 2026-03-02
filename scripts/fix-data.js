#!/usr/bin/env node
/**
 * fix-data.js - Phase 1: Merge duplicates, fix entryId references, remove dashes
 * Does NOT remove orphan affiliations - instead fixes the entryId to the correct one
 */
const fs = require('fs');
const path = require('path');

const JD_PATH = path.join(__dirname, '..', 'data', 'jewish.json');
const PD_PATH = path.join(__dirname, '..', 'data', 'people.json');

const jd = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
const pd = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));

let changes = 0;

// ─── Build ID index ──────────────────────────────────────────────────────
const allIds = new Set();
const nameToId = {};
const idToName = {};
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    allIds.add(e.id);
    idToName[e.id] = e.name;
    const nm = e.name.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    nameToId[nm] = e.id;
    // Also index common variations
    const slug = e.id;
    nameToId[slug] = e.id;
  }
}

// ─── 1. Merge duplicate entries ──────────────────────────────────────────
const MERGE_MAP = {
  'h-agen-dazs': 'haagen-dazs',
  'iheartmedia': 'iheart-media',
  'jewish-national-fund-usa': 'jewish-national-fund-usa-jnf-usa',
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
  let keepEntry = null;

  for (const c in jd.countries) {
    for (let i = 0; i < jd.countries[c].length; i++) {
      const e = jd.countries[c][i];
      if (e.id === removeId) { removeEntry = e; removeCountry = c; removeIdx = i; }
      if (e.id === keepId) { keepEntry = e; }
    }
  }

  if (!removeEntry || !keepEntry) continue;

  // Merge longer description
  if ((removeEntry.description || '').length > (keepEntry.description || '').length) {
    keepEntry.description = removeEntry.description;
  }

  // Merge individuals (by id)
  const existingIndIds = new Set((keepEntry.individuals || []).map(i => i.id));
  if (removeEntry.individuals) {
    for (const ind of removeEntry.individuals) {
      if (!existingIndIds.has(ind.id)) {
        if (!keepEntry.individuals) keepEntry.individuals = [];
        keepEntry.individuals.push(ind);
        existingIndIds.add(ind.id);
      }
    }
  }

  // Merge connections (by name)
  const existingConnNames = new Set((keepEntry.connections || []).map(c => (c.name || c.target || '').toLowerCase()));
  if (removeEntry.connections) {
    for (const conn of removeEntry.connections) {
      const key = (conn.name || conn.target || '').toLowerCase();
      if (key && !existingConnNames.has(key)) {
        if (!keepEntry.connections) keepEntry.connections = [];
        keepEntry.connections.push(conn);
        existingConnNames.add(key);
      }
    }
  }

  if (!keepEntry.website && removeEntry.website) keepEntry.website = removeEntry.website;
  if (!keepEntry.founded && removeEntry.founded) keepEntry.founded = removeEntry.founded;
  if (!keepEntry.category && removeEntry.category) keepEntry.category = removeEntry.category;

  // Remove the duplicate
  jd.countries[removeCountry].splice(removeIdx, 1);
  console.log(`MERGED ${removeId} -> ${keepId}`);
  changes++;

  // Add to MERGE_MAP as alias for affiliation fixing
  allIds.delete(removeId);
}

// ─── 2. Build ID alias map for orphan fixing ─────────────────────────────
// Map stale/wrong IDs to correct entry IDs
const ID_FIX = {
  ...MERGE_MAP,
  'jeffrey-epstein-network': 'epstein-network',
  'goldman-sachs': 'goldman-sachs-historic',
  'meta-platforms': 'meta-platforms-facebook',
  'estee-lauder-companies': 'the-estee-lauder-companies',
  'blackstone-inc': 'the-blackstone-group',
  'bloomberg-lp': 'bloomberg-lp-terminal',
  'partner-communications-orange-israel': 'partner-communications',
  'iac': 'iac-interactivecorp',
  'check-point-software': 'check-point-software-technologies',
  'mobileye-intel': 'mobileye',
  'marks-and-spencer': 'marks-spencer',
  'new-york-times-company': 'new-york-times',
  'warner-bros-pictures': 'warner-bros-entertainment',
};

// Try to auto-discover more ID fixes by fuzzy matching
const freshIds = new Set();
for (const c in jd.countries) for (const e of jd.countries[c]) freshIds.add(e.id);

for (const [pid, person] of Object.entries(pd.people)) {
  if (!person.affiliations) continue;
  for (const aff of person.affiliations) {
    if (!aff.entryId || freshIds.has(aff.entryId) || ID_FIX[aff.entryId]) continue;
    // Try to find close match
    const stale = aff.entryId;
    // Try starts-with match
    const candidates = [...freshIds].filter(id => {
      return id.startsWith(stale.split('-')[0]) || stale.startsWith(id.split('-')[0]);
    });
    if (candidates.length === 1) {
      ID_FIX[stale] = candidates[0];
    } else {
      // Try substring match on name
      const orgName = (aff.organization || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (orgName.length > 4) {
        for (const c in jd.countries) {
          for (const e of jd.countries[c]) {
            const eName = e.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (eName === orgName || (orgName.length > 8 && eName.includes(orgName))) {
              ID_FIX[stale] = e.id;
              break;
            }
          }
          if (ID_FIX[stale]) break;
        }
      }
    }
  }
}

console.log(`\nID fixes discovered: ${Object.keys(ID_FIX).length}`);

// ─── 3. Fix all entry references across jewish.json ──────────────────────
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    if (e.connections) {
      for (const conn of e.connections) {
        if (conn.entryId && ID_FIX[conn.entryId]) { conn.entryId = ID_FIX[conn.entryId]; changes++; }
        if (conn.target && ID_FIX[conn.target]) { conn.target = ID_FIX[conn.target]; changes++; }
        if (conn.source && ID_FIX[conn.source]) { conn.source = ID_FIX[conn.source]; changes++; }
      }
    }
  }
}

// ─── 4. Fix affiliations in people.json ──────────────────────────────────
let fixedAffs = 0, stillOrphan = 0;
for (const [pid, person] of Object.entries(pd.people)) {
  if (!person.affiliations) continue;
  for (const aff of person.affiliations) {
    if (!aff.entryId) continue;
    if (ID_FIX[aff.entryId]) {
      aff.entryId = ID_FIX[aff.entryId];
      fixedAffs++;
      changes++;
    }
    if (!freshIds.has(aff.entryId) && !ID_FIX[aff.entryId]) {
      stillOrphan++;
    }
  }
}
console.log(`Fixed ${fixedAffs} affiliations, ${stillOrphan} still orphaned`);

// ─── 5. Deduplicate individuals within entries ───────────────────────────
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    if (!e.individuals) continue;
    const seen = new Set();
    const deduped = [];
    for (const ind of e.individuals) {
      const key = ind.id || ind.name.toLowerCase().replace(/[^a-z]/g, '');
      if (seen.has(key)) { changes++; continue; }
      seen.add(key);
      deduped.push(ind);
    }
    if (deduped.length < e.individuals.length) e.individuals = deduped;
  }
}

// ─── 6. Deduplicate affiliations in people.json ─────────────────────────
for (const [pid, person] of Object.entries(pd.people)) {
  if (!person.affiliations || person.affiliations.length <= 1) continue;
  const seen = new Set();
  const deduped = [];
  for (const aff of person.affiliations) {
    const key = (aff.entryId || aff.organization || '').toLowerCase();
    if (seen.has(key)) { changes++; continue; }
    seen.add(key);
    deduped.push(aff);
  }
  if (deduped.length < person.affiliations.length) person.affiliations = deduped;
}

// ─── 7. Remove ALL em dashes and en dashes from data ────────────────────
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

// ─── Write ───────────────────────────────────────────────────────────────
fs.writeFileSync(JD_PATH, JSON.stringify(jd, null, 2), 'utf8');
fs.writeFileSync(PD_PATH, JSON.stringify(pd, null, 2), 'utf8');

let total = 0;
for (const c in jd.countries) total += jd.countries[c].length;
console.log(`\nDone! ${changes} changes. Entries: ${total}, People: ${Object.keys(pd.people).length}`);
