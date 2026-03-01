/**
 * Generic batch enrichment script
 * Reads an individuals batch JSON file and applies individuals to jewish.json
 * Usage: node scripts/enrichBatch.js <batchFile>
 */
const fs = require('fs');
const path = require('path');

const batchFile = process.argv[2];
if (!batchFile) {
  console.error('Usage: node scripts/enrichBatch.js <batchFile>');
  process.exit(1);
}

const jewishPath = path.join(__dirname, '..', 'data', 'jewish.json');
const data = JSON.parse(fs.readFileSync(jewishPath, 'utf8'));
const batch = JSON.parse(fs.readFileSync(path.resolve(batchFile), 'utf8'));

let totalAdded = 0;
let entriesUpdated = 0;
let entriesNotFound = 0;

for (const [entryId, individuals] of Object.entries(batch)) {
  let found = false;
  for (const country of Object.keys(data.countries)) {
    const entries = data.countries[country];
    for (const entry of entries) {
      if (entry.id === entryId) {
        found = true;
        const existingIds = new Set((entry.individuals || []).map(i => i.id));
        let added = 0;
        for (const ind of individuals) {
          if (!existingIds.has(ind.id)) {
            entry.individuals.push(ind);
            existingIds.add(ind.id);
            added++;
          }
        }
        if (added > 0) {
          entriesUpdated++;
          totalAdded += added;
        }
        break;
      }
    }
    if (found) break;
  }
  if (!found) {
    console.warn(`Entry not found: ${entryId}`);
    entriesNotFound++;
  }
}

fs.writeFileSync(jewishPath, JSON.stringify(data, null, 2));
console.log(`Done: ${entriesUpdated} entries updated, ${totalAdded} individuals added, ${entriesNotFound} not found`);
