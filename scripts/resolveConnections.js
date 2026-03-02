#!/usr/bin/env node
/**
 * resolveConnections.js
 * Auto-resolves unresolved connections in jewish.json by matching
 * connection names to existing entry IDs via slug matching and
 * normalized name lookups.
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'jewish.json');
const jd = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Build lookup maps
const entryById = {};
const nameToId = {};
const slugToId = {};

for (const c in jd.countries) {
  for (const entry of jd.countries[c]) {
    entryById[entry.id] = entry;
    nameToId[entry.name.toLowerCase()] = entry.id;
    slugToId[slugify(entry.name)] = entry.id;
    // Also store without parenthetical suffixes
    const noParens = entry.name.replace(/\s*\([^)]*\)\s*/g, '').trim();
    if (noParens !== entry.name) {
      slugToId[slugify(noParens)] = entry.id;
    }
  }
}

function resolve(conn) {
  // Already has a valid entryId?
  if (conn.entryId && entryById[conn.entryId]) return null;
  if (conn.target && entryById[conn.target]) return null;
  if (!conn.name) return null;

  // Exact name match
  const exactId = nameToId[conn.name.toLowerCase()];
  if (exactId && entryById[exactId]) return exactId;

  // Slug match
  const slug = slugify(conn.name);
  if (slugToId[slug]) return slugToId[slug];

  // Slug match without parenthetical
  const noParens = conn.name.replace(/\s*\([^)]*\)\s*/g, '').trim();
  if (noParens !== conn.name) {
    const npSlug = slugify(noParens);
    if (slugToId[npSlug]) return slugToId[npSlug];
  }

  return null;
}

let fixed = 0;
let alreadyResolved = 0;
let stillUnresolved = 0;

for (const c in jd.countries) {
  for (const entry of jd.countries[c]) {
    if (!entry.connections) continue;
    for (const conn of entry.connections) {
      // Check if already has a valid entryId
      if (conn.entryId && entryById[conn.entryId]) {
        alreadyResolved++;
        continue;
      }
      if (conn.target && entryById[conn.target]) {
        alreadyResolved++;
        continue;
      }

      // Try to resolve
      const resolvedId = resolve(conn);
      if (resolvedId) {
        conn.entryId = resolvedId;
        fixed++;
      } else {
        stillUnresolved++;
      }
    }
  }
}

console.log(`Already resolved: ${alreadyResolved}`);
console.log(`Newly resolved (entryId set): ${fixed}`);
console.log(`Still unresolved: ${stillUnresolved}`);
console.log(`Total connections: ${alreadyResolved + fixed + stillUnresolved}`);

if (fixed > 0) {
  fs.writeFileSync(dataPath, JSON.stringify(jd, null, 2));
  console.log(`Updated jewish.json with ${fixed} resolved connections.`);
}
