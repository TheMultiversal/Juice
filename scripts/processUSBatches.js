/**
 * Process US batch results from sub-agent research
 * Reads content from workspace storage files, strips markdown, merges JSON, writes batch file
 */
const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Arkhi\\AppData\\Roaming\\Code\\User\\workspaceStorage\\0cd112926bdee9730e71fe74059ca3d0\\GitHub.copilot-chat\\chat-session-resources\\81116532-45fd-4989-bca3-868d61856398';

const files = [
  { name: 'Batch 1 (US 1-50)', path: path.join(baseDir, 'toolu_bdrk_01H8YCk4JFNvkaE9394hm5XT__vscode-1772339181989', 'content.txt') },
  { name: 'Batch 2 (US 51-100)', path: path.join(baseDir, 'toolu_bdrk_019AgPTuMM5GEpGKFQcUg4HZ__vscode-1772339181990', 'content.txt') },
  { name: 'Batch 3 (US 101-152)', path: path.join(baseDir, 'toolu_bdrk_01EDYbg9gcFnguE2zKo64PN6__vscode-1772339182001', 'content.txt') },
  { name: 'Batch 4 (US 153-202)', path: path.join(baseDir, 'toolu_bdrk_011oYDL9X496p52YaLrYfTY2__vscode-1772339182002', 'content.json') },
];

const merged = {};
let totalEntries = 0;
let totalIndividuals = 0;

for (const file of files) {
  console.log(`Processing ${file.name}...`);
  let content = fs.readFileSync(file.path, 'utf8');
  
  // Strip markdown code fences and any leading text
  // Find the first { and last }
  const firstBrace = content.indexOf('{');
  const lastBrace = content.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1) {
    console.error(`  ERROR: No JSON object found in ${file.name}`);
    continue;
  }
  content = content.substring(firstBrace, lastBrace + 1);
  
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    console.error(`  ERROR parsing JSON from ${file.name}: ${e.message}`);
    // Try to find position
    const pos = parseInt(e.message.match(/position (\d+)/)?.[1] || '0');
    if (pos > 0) {
      console.error(`  Context around position ${pos}: ...${content.substring(pos - 50, pos + 50)}...`);
    }
    continue;
  }
  
  const entries = Object.keys(parsed).length;
  let individuals = 0;
  for (const [key, val] of Object.entries(parsed)) {
    individuals += val.length;
    // Remove em dashes
    for (const ind of val) {
      if (ind.bio) ind.bio = ind.bio.replace(/\u2014/g, '-').replace(/\u2013/g, '-');
      if (ind.role) ind.role = ind.role.replace(/\u2014/g, '-').replace(/\u2013/g, '-');
    }
  }
  
  Object.assign(merged, parsed);
  totalEntries += entries;
  totalIndividuals += individuals;
  console.log(`  ${entries} entries, ${individuals} individuals`);
}

console.log(`\nTotal merged: ${totalEntries} entries, ${totalIndividuals} individuals`);
console.log(`Unique keys: ${Object.keys(merged).length}`);

// Write merged batch file
const outPath = path.join(__dirname, 'us_batch_all.json');
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2));
console.log(`\nWrote merged batch to ${outPath}`);
