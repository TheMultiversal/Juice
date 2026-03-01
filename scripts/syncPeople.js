/**
 * syncPeople.js - Ensure all individuals from jewish.json have entries in people.json
 */
const fs = require('fs');
const path = require('path');

const jewishPath = path.join(__dirname, '..', 'data', 'jewish.json');
const peoplePath = path.join(__dirname, '..', 'data', 'people.json');

const jewish = JSON.parse(fs.readFileSync(jewishPath, 'utf8'));
const data = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
const people = data.people; // keyed by ID

const existingIds = new Set(Object.keys(people));

// Collect all individuals from all entries
const allEntries = Object.values(jewish.countries).flat();
let added = 0;

for (const entry of allEntries) {
  const individuals = entry.individuals || [];
  for (const ind of individuals) {
    if (!ind.id) continue;
    if (!existingIds.has(ind.id)) {
      people[ind.id] = {
        name: ind.name,
        bio: ind.bio || ind.role || '',
        notes: '',
        affiliations: [
          {
            organization: entry.name || '',
            role: ind.role || '',
            entryId: entry.id,
            country: ''
          }
        ]
      };
      existingIds.add(ind.id);
      added++;
    }
  }
}

console.log(`Added ${added} new people to people.json (total: ${Object.keys(people).length})`);
fs.writeFileSync(peoplePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Saved.');
