/**
 * expandData44.js – Fix 30 duplicate people in people.json
 * Merges duplicate name entries: keeps longer bio, updates all references in jewish.json
 */
const fs = require('fs');
const path = require('path');
const pFile = path.join(__dirname, '..', 'data', 'people.json');
const jFile = path.join(__dirname, '..', 'data', 'jewish.json');
const pd = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const jd = JSON.parse(fs.readFileSync(jFile, 'utf8'));

// Map of duplicate IDs to merge: keepId -> [removeIds]
// We keep whichever has the longer bio (or the first if equal)
const duplicates = [
  ['shari-redstone', ['shari-redstone-nat']],
  ['bruce-flatt', ['bruce-flatt-brookfield']],
  ['paul-singer', ['paul-singer-elliott', 'paul-singer-em']],
  ['david-siegel', ['david-siegel-twosigma']],
  ['levi-strauss', ['levi-strauss-founder']],
  ['bob-pittman', ['bob-pittman-iheart']],
  ['ag-sulzberger', ['a-g-sulzberger']],
  ['leslie-wexner', ['leslie-wexner-ind']],
  ['michael-marks', ['michael-marks-founder']],
  ['jack-cohen', ['jack-cohen-tesco']],
  ['david-de-rothschild', ['david-de-rothschild-fr']],
  ['david-sassoon', ['david-sassoon-ohel']],
  ['david-marshall', ['david-marshall-singapore']],
  ['katharine-graham', ['katharine-graham-wp']],
  ['sidney-klajner', ['sidney-klajner-einstein']],
  ['sarah-cohen', ['sarah-cohen-kochi']],
  ['maurice-cohen', ['maurice-cohen-ireland']],
  ['aaron-ahomtre-toakyirafa', ['aaron-toakyirafa']],
  ['isaac-arazi', ['isaac-arazi-leb']],
  ['moses-samuels', ['moses-samuels-myanmar']],
  ['robert-singer', ['robert-singer-serbia']],
  ['elon-musk', ['elon-musk-ind']],
  ['woody-allen', ['woody-allen-ind']],
  ['marcelo-mindlin', ['marcelo-mindlin-museum']],
  ['klaus-schwab', ['klaus-schwab-wef']],
  ['eugene-meyer', ['eugene-meyer-wapo', 'eugene-meyer-wp']],
  ['henry-kissinger', ['henry-kissinger-cfr']],
  ['alan-dershowitz', ['alan-dershowitz-ind']],
  ['lawrence-summers', ['lawrence-summers-harvard']],
  ['bill-clinton', ['bill-clinton-individual', 'bill-clinton-ind']]
];

let mergedCount = 0;
let refsUpdated = 0;

duplicates.forEach(([keepCandidate, removeIds]) => {
  // Determine which id to keep based on longer bio
  let allIds = [keepCandidate, ...removeIds].filter(id => pd.people[id]);
  if (allIds.length < 2) {
    // Only one exists, check if we need to pick a different keep
    if (allIds.length === 1 && allIds[0] !== keepCandidate) {
      // The keepCandidate doesn't exist, but a removeId does - need to find the right one
    }
    return;
  }
  
  // Find the one with longest bio
  let keepId = allIds[0];
  let longestBio = (pd.people[allIds[0]]?.bio || '').length;
  for (let i = 1; i < allIds.length; i++) {
    const bioLen = (pd.people[allIds[i]]?.bio || '').length;
    if (bioLen > longestBio) {
      longestBio = bioLen;
      keepId = allIds[i];
    }
  }
  
  const toRemove = allIds.filter(id => id !== keepId);
  
  toRemove.forEach(removeId => {
    if (!pd.people[removeId]) return;
    
    // Merge bio if keep bio is shorter
    const keepBio = pd.people[keepId]?.bio || '';
    const removeBio = pd.people[removeId]?.bio || '';
    if (removeBio.length > keepBio.length) {
      pd.people[keepId].bio = removeBio;
    }
    
    // Remove the duplicate
    delete pd.people[removeId];
    mergedCount++;
    
    // Update all references in jewish.json
    for (const country in jd.countries) {
      jd.countries[country].forEach(entry => {
        if (entry.individuals) {
          // Check if keepId already exists in this entry
          const hasKeep = entry.individuals.some(ind => ind.id === keepId);
          entry.individuals.forEach(ind => {
            if (ind.id === removeId) {
              if (hasKeep) {
                // Both exist - mark for removal
                ind._remove = true;
              } else {
                // Just update the ID
                ind.id = keepId;
              }
              refsUpdated++;
            }
          });
          // Remove marked duplicates
          entry.individuals = entry.individuals.filter(ind => !ind._remove);
        }
        // Also update connections
        if (entry.connections) {
          entry.connections.forEach(conn => {
            if (conn.related_individuals) {
              conn.related_individuals = conn.related_individuals.map(ri => ri === removeId ? keepId : ri);
              // Remove duplicate related_individuals
              conn.related_individuals = [...new Set(conn.related_individuals)];
            }
          });
        }
      });
    }
  });
});

fs.writeFileSync(pFile, JSON.stringify(pd, null, 2));
fs.writeFileSync(jFile, JSON.stringify(jd, null, 2));

const finalCount = Object.keys(pd.people).length;
console.log(`Merged ${mergedCount} duplicate people entries`);
console.log(`Updated ${refsUpdated} references in jewish.json`);
console.log(`People count: ${finalCount}`);
