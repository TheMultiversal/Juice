/**
 * brain.js -- The Knowledge Engine
 *
 * This is the infinite IQ. The master of all knowledge.
 * It knows the data, understands the patterns, sees the connections.
 *
 * Capabilities:
 *   - Read and write jewish.json and people.json
 *   - Cross-reference people across organizations
 *   - Audit data quality (duplicates, gaps, inconsistencies)
 *   - Expand entries with role-appropriate individuals
 *   - Generate affiliation networks
 *   - Git operations for deployment
 *
 * This brain does not guess. It works from what it knows.
 * When it does not know, it says so.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync } = require('child_process');
const config = require('./config');

const DATA_DIR = path.join(__dirname, '..', 'data');
const JD_PATH = path.join(DATA_DIR, 'jewish.json');
const PD_PATH = path.join(DATA_DIR, 'people.json');
const ROOT = path.join(__dirname, '..');

// Role templates per category -- the brain knows what roles each type of org has
const ROLE_TEMPLATES = {
  'Banking & Financial Services': ['CEO', 'Chairman', 'CFO', 'Head of Investment Banking', 'Chief Risk Officer', 'Board Member', 'Managing Director'],
  'Investment & Private Equity': ['Managing Partner', 'Founding Partner', 'Chief Investment Officer', 'Senior Partner', 'Chairman', 'Board Member', 'Head of Strategy'],
  'Technology': ['CEO', 'CTO', 'Chairman', 'VP of Engineering', 'Chief Product Officer', 'Board Member', 'Co-founder'],
  'Entertainment & Media': ['CEO', 'Editor-in-Chief', 'Chairman', 'Executive Producer', 'Chief Content Officer', 'Head of Programming', 'Board Member'],
  'Healthcare & Pharmaceuticals': ['CEO', 'Chief Medical Officer', 'Chairman', 'VP of Research', 'Chief Scientific Officer', 'Board Member', 'Head of Clinical Trials'],
  'Real Estate & Property': ['CEO', 'Chairman', 'Managing Director', 'Head of Development', 'Chief Investment Officer', 'Board Member', 'VP of Operations'],
  'Defense & Security': ['Director', 'Deputy Director', 'Head of Operations', 'Chief of Staff', 'Intelligence Director', 'Senior Analyst', 'Board Member'],
  'Retail & Consumer Goods': ['CEO', 'Chairman', 'COO', 'Chief Merchandising Officer', 'VP of Retail Operations', 'Board Member', 'Head of E-Commerce'],
  'Retail & E-Commerce': ['CEO', 'Chairman', 'COO', 'Chief Digital Officer', 'VP of Operations', 'Board Member', 'Head of Marketing'],
  'Food & Beverage': ['CEO', 'Chairman', 'COO', 'VP of Operations', 'Chief Marketing Officer', 'Board Member', 'Head of Production'],
  'Manufacturing & Industry': ['CEO', 'Chairman', 'COO', 'Head of Production', 'Chief Technology Officer', 'Board Member', 'VP of Supply Chain'],
  'Government & Diplomacy': ['Director', 'Deputy Director', 'Secretary General', 'Chief of Staff', 'Senior Advisor', 'Head of Policy', 'Board Member'],
  'Advocacy & Political Organizations': ['President', 'Executive Director', 'Chairman', 'VP of Advocacy', 'Head of Policy', 'Board Member', 'Director of Government Relations'],
  'Advocacy & Public Affairs': ['President', 'Executive Director', 'Chairman', 'VP of Communications', 'Head of Campaigns', 'Board Member', 'Policy Director'],
  'Research & Think Tanks': ['President', 'Director', 'Senior Fellow', 'Head of Research', 'Board Chair', 'Chief Economist', 'Program Director'],
  'Philanthropy & Foundations': ['President', 'Executive Director', 'Chairman', 'Program Officer', 'VP of Grants', 'Board Member', 'Chief Philanthropic Officer'],
  'Philanthropy': ['President', 'Executive Director', 'Board Chair', 'Program Director', 'VP of Development', 'Senior Advisor', 'Chief Giving Officer'],
  'Education': ['President', 'Dean', 'Provost', 'Chancellor', 'Board Chair', 'Director of Admissions', 'Head of Research'],
  'Community & Social Organizations': ['President', 'Executive Director', 'Chairman', 'VP of Programs', 'Community Director', 'Board Member', 'Chief Development Officer'],
  'Religion & Synagogues': ['Senior Rabbi', 'Executive Director', 'Board President', 'Cantor', 'Director of Education', 'VP of Operations', 'Community Relations Director'],
  'Heritage & Memorials': ['Director', 'Chief Curator', 'Chairman', 'Head of Education', 'Head of Collections', 'Board Member', 'Research Director'],
  'Representative & Umbrella Bodies': ['President', 'Executive Director', 'Secretary General', 'Vice President', 'Board Chair', 'Director of Policy', 'Head of Community Relations'],
  'Culture & Arts': ['Director', 'Chief Curator', 'Chairman', 'Artistic Director', 'Head of Programs', 'Board Member', 'Education Director'],
  'Charity & Philanthropy': ['President', 'CEO', 'Board Chair', 'VP of Development', 'Program Director', 'Managing Director', 'Chief Philanthropy Officer'],
  'Fashion & Luxury': ['CEO', 'Creative Director', 'Chairman', 'Chief Brand Officer', 'Head of Design', 'Board Member', 'VP of Marketing'],
  'Fashion & Consumer Goods': ['CEO', 'Chairman', 'COO', 'Head of Design', 'Chief Marketing Officer', 'VP of Retail', 'Board Member'],
  'Conglomerates': ['CEO', 'Chairman', 'COO', 'CFO', 'Head of Strategy', 'Board Member', 'President of Operations'],
  'Energy': ['CEO', 'Chairman', 'COO', 'Head of Exploration', 'Chief Sustainability Officer', 'Board Member', 'VP of Operations'],
  'Utilities & Energy': ['CEO', 'Chairman', 'COO', 'Head of Infrastructure', 'Chief Technology Officer', 'Board Member', 'VP of Operations'],
  'Sports & Recreation': ['Owner', 'President', 'General Manager', 'Head Coach', 'VP of Operations', 'Board Member', 'Director of Player Personnel'],
  'Transportation & Logistics': ['CEO', 'Chairman', 'COO', 'VP of Operations', 'Chief Safety Officer', 'Board Member', 'Head of Logistics'],
  'Legal': ['Managing Partner', 'Senior Partner', 'Chairman', 'Head of Litigation', 'Chief Operating Partner', 'Board Chair', 'Pro Bono Director'],
  'Media': ['Editor-in-Chief', 'Publisher', 'CEO', 'Chairman', 'Head of Content', 'Board Member', 'VP of Digital'],
  'Political': ['President', 'Chairman', 'Executive Director', 'Chief of Staff', 'Director of Policy', 'Board Member', 'Senior Advisor'],
  'Finance': ['CEO', 'Chairman', 'CIO', 'Managing Partner', 'Head of Trading', 'Board Member', 'Chief Strategist'],
  'Notable Individuals': ['Principal', 'Director', 'Associate', 'Manager', 'Advisor', 'Coordinator', 'Chief of Staff'],
};

// Default roles if category not found
const DEFAULT_ROLES = ['Director', 'Deputy Director', 'Chairman', 'Board Member', 'VP of Operations', 'Secretary General', 'Chief of Staff'];

// Fallback roles tried when all template roles are taken
const FALLBACK_ROLES = [
  'Senior Vice President', 'General Counsel', 'Chief Strategy Officer',
  'Head of Communications', 'Chief Compliance Officer', 'VP of Development',
  'Chief Administrative Officer', 'Head of Partnerships', 'Treasurer',
  'VP of International Affairs', 'Director of Special Projects', 'Secretary',
  'Head of Government Relations', 'Chief People Officer', 'VP of External Relations',
  'Director of Programs', 'Board Advisor', 'VP of Community Relations',
  'Chief Diversity Officer', 'Head of Innovation', 'VP of Public Affairs',
];

class Brain {
  constructor(soul) {
    this.soul = soul;
    this._jd = null;
    this._pd = null;
    this._people = null;
    this._hasPeopleWrapper = false;
  }

  // ---- Data I/O ----

  loadData() {
    this._jd = JSON.parse(fs.readFileSync(JD_PATH, 'utf8'));
    this._pd = JSON.parse(fs.readFileSync(PD_PATH, 'utf8'));
    this._hasPeopleWrapper = !!this._pd.people;
    this._people = this._pd.people || this._pd;
    return { entries: this._countEntries(), people: Object.keys(this._people).length };
  }

  saveData() {
    fs.writeFileSync(JD_PATH, JSON.stringify(this._jd, null, 2));
    fs.writeFileSync(PD_PATH, JSON.stringify(
      this._hasPeopleWrapper ? { people: this._people } : this._people, null, 2
    ));
    const counts = { entries: this._countEntries(), people: Object.keys(this._people).length };
    return counts;
  }

  _countEntries() {
    let n = 0;
    for (const c in this._jd.countries) n += this._jd.countries[c].length;
    return n;
  }

  // ---- Entry lookup ----

  findEntry(id) {
    for (const c in this._jd.countries) {
      const e = this._jd.countries[c].find(x => x.id === id);
      if (e) return { entry: e, country: c };
    }
    return null;
  }

  getAllEntries() {
    const entries = [];
    for (const c in this._jd.countries) {
      for (const e of this._jd.countries[c]) {
        entries.push({ entry: e, country: c });
      }
    }
    return entries;
  }

  // ---- Audit: find entries below threshold ----

  audit(minIndividuals) {
    const min = minIndividuals || 7;
    const below = [];
    const distribution = {};
    for (const c in this._jd.countries) {
      for (const e of this._jd.countries[c]) {
        const n = (e.individuals || []).length;
        distribution[n] = (distribution[n] || 0) + 1;
        if (n < min) {
          below.push({ id: e.id, name: e.name, category: e.category, country: c, count: n, need: min - n });
        }
      }
    }
    return {
      totalEntries: this._countEntries(),
      totalPeople: Object.keys(this._people).length,
      distribution: distribution,
      belowThreshold: below,
      belowCount: below.length,
    };
  }

  // ---- Cross-reference: find people who should appear in multiple orgs ----

  crossReference() {
    const results = [];
    const personEntries = {};  // personId -> [entryId, ...]

    // Build a map of which entries each person belongs to
    for (const c in this._jd.countries) {
      for (const e of this._jd.countries[c]) {
        for (const ind of (e.individuals || [])) {
          if (!personEntries[ind.id]) personEntries[ind.id] = [];
          personEntries[ind.id].push(e.id);
        }
      }
    }

    // Check people.json affiliations vs actual entry presence
    for (const [pid, person] of Object.entries(this._people)) {
      if (!person.affiliations) continue;
      for (const aff of person.affiliations) {
        const eid = aff.entryId;
        if (!eid) continue;
        // Check if this person is actually in this entry's individuals
        if (!personEntries[pid] || !personEntries[pid].includes(eid)) {
          const f = this.findEntry(eid);
          if (f) {
            results.push({
              personId: pid,
              personName: person.name,
              entryId: eid,
              entryName: f.entry.name,
              role: aff.role,
              action: 'add_individual',
              reason: 'Person has affiliation in people.json but is not in entry individuals',
            });
          }
        }
      }
    }

    return results;
  }

  // ---- Apply cross-references ----

  applyCrossReferences(refs) {
    let applied = 0;
    for (const ref of refs) {
      const f = this.findEntry(ref.entryId);
      if (!f) continue;
      if (!f.entry.individuals) f.entry.individuals = [];
      if (f.entry.individuals.some(i => i.id === ref.personId)) continue;

      const person = this._people[ref.personId];
      if (!person) continue;

      f.entry.individuals.push({
        id: ref.personId,
        name: person.name,
        role: ref.role || '',
        bio: person.bio || '',
      });
      applied++;
    }
    return applied;
  }

  // ---- Find duplicate entries ----

  findDuplicates() {
    const seen = {};
    const dupes = [];
    for (const c in this._jd.countries) {
      for (const e of this._jd.countries[c]) {
        const normName = (e.name || '').toLowerCase().trim();
        if (seen[normName]) {
          dupes.push({ name: e.name, id1: seen[normName], id2: e.id, country: c });
        } else {
          seen[normName] = e.id;
        }
      }
    }
    return dupes;
  }

  // ---- Find people with similar names (potential duplicates) ----

  findSimilarPeople() {
    const byName = {};
    for (const [pid, person] of Object.entries(this._people)) {
      const norm = (person.name || '').toLowerCase().trim();
      if (!byName[norm]) byName[norm] = [];
      byName[norm].push(pid);
    }
    const dupes = [];
    for (const [name, ids] of Object.entries(byName)) {
      if (ids.length > 1) dupes.push({ name, ids });
    }
    return dupes;
  }

  // ---- Expand an entry with role-appropriate placeholders ----

  expandEntry(entryId, targetCount) {
    const f = this.findEntry(entryId);
    if (!f) return { added: 0, reason: 'Entry not found' };
    if (!f.entry.individuals) f.entry.individuals = [];

    const current = f.entry.individuals.length;
    const target = targetCount || 7;
    if (current >= target) return { added: 0, reason: 'Already at or above target' };

    const needed = target - current;
    const cat = f.entry.category || '';
    const templateRoles = ROLE_TEMPLATES[cat] || DEFAULT_ROLES;
    // Combine template roles with fallback roles for maximum coverage
    const allRoles = [...templateRoles, ...FALLBACK_ROLES];
    const existingRoles = new Set(f.entry.individuals.map(i => (i.role || '').toLowerCase()));

    let added = 0;
    for (let i = 0; i < allRoles.length && added < needed; i++) {
      const role = allRoles[i];
      // Skip if this role already exists (case-insensitive)
      if (existingRoles.has(role.toLowerCase())) continue;

      // Create a placeholder individual
      const slug = f.entry.id + '-' + role.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (f.entry.individuals.some(ind => ind.id === slug)) continue;

      const ind = {
        id: slug,
        name: '[Pending Research]',
        role: role,
        bio: `${role} of ${f.entry.name}. Research pending -- this position will be filled with verified information.`,
      };

      f.entry.individuals.push(ind);
      existingRoles.add(role.toLowerCase());

      // Also add to people.json
      if (!this._people[slug]) {
        this._people[slug] = {
          name: '[Pending Research]',
          bio: ind.bio,
          notes: 'Auto-generated placeholder by swarm bot. Needs human verification.',
          affiliations: [{
            organization: f.entry.name,
            role: role,
            entryId: f.entry.id,
            country: f.country,
          }],
        };
      }
      added++;
    }

    return { added, entryId: f.entry.id, from: current, to: current + added };
  }

  // ---- Get roles for a category ----

  getRolesForCategory(category) {
    return ROLE_TEMPLATES[category] || DEFAULT_ROLES;
  }

  // ---- Data quality: ensure no em dashes, clean formatting ----

  cleanData() {
    let fixes = 0;

    // Clean people bios and names -- no em dashes
    for (const [pid, person] of Object.entries(this._people)) {
      if (person.bio && person.bio.includes('\u2014')) {
        person.bio = person.bio.replace(/\u2014/g, ' -- ');
        fixes++;
      }
      if (person.name && person.name.includes('\u2014')) {
        person.name = person.name.replace(/\u2014/g, ' -- ');
        fixes++;
      }
      if (person.bio && person.bio.includes('\u2013')) {
        person.bio = person.bio.replace(/\u2013/g, '-');
        fixes++;
      }
    }

    // Clean entry data
    for (const c in this._jd.countries) {
      for (const e of this._jd.countries[c]) {
        if (e.description && e.description.includes('\u2014')) {
          e.description = e.description.replace(/\u2014/g, ' -- ');
          fixes++;
        }
        for (const ind of (e.individuals || [])) {
          if (ind.bio && ind.bio.includes('\u2014')) {
            ind.bio = ind.bio.replace(/\u2014/g, ' -- ');
            fixes++;
          }
        }
      }
    }

    return fixes;
  }

  // ---- Git operations ----

  gitStatus() {
    try {
      const status = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf8' });
      return status.trim().split('\n').filter(Boolean);
    } catch (err) {
      return ['ERROR: ' + err.message];
    }
  }

  gitCommitAndPush(message) {
    try {
      execSync('git add -A', { cwd: ROOT, encoding: 'utf8' });
      const commitMsg = message || `Swarm update: ${new Date().toISOString().slice(0, 16)}`;
      execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd: ROOT, encoding: 'utf8' });
      execSync('git push', { cwd: ROOT, encoding: 'utf8', timeout: 60000 });
      return { success: true, message: commitMsg };
    } catch (err) {
      return { success: false, error: err.message.slice(0, 200) };
    }
  }

  // ---- Statistics ----

  getStats() {
    const dist = {};
    const catDist = {};
    const countryDist = {};
    let totalInds = 0;

    for (const c in this._jd.countries) {
      for (const e of this._jd.countries[c]) {
        const n = (e.individuals || []).length;
        dist[n] = (dist[n] || 0) + 1;
        totalInds += n;
        const cat = e.category || 'Unknown';
        if (!catDist[cat]) catDist[cat] = { count: 0, totalInds: 0 };
        catDist[cat].count++;
        catDist[cat].totalInds += n;
        countryDist[c] = (countryDist[c] || 0) + 1;
      }
    }

    return {
      totalEntries: this._countEntries(),
      totalPeople: Object.keys(this._people).length,
      totalIndividualSlots: totalInds,
      distribution: dist,
      categoryCounts: catDist,
      countryCounts: countryDist,
    };
  }

  // ---- AI-powered research via OpenAI ----

  async aiResearch(entryId, targetCount) {
    if (!config.hasAI()) {
      return { error: 'No OpenAI API key configured. Set OPENAI_API_KEY in .env file.' };
    }

    const f = this.findEntry(entryId);
    if (!f) return { error: 'Entry not found: ' + entryId };

    const entry = f.entry;
    if (!entry.individuals) entry.individuals = [];

    // Count how many placeholders need replacing
    const pendingCount = entry.individuals.filter(i => i.name === '[Pending Research]').length;
    const realCount = entry.individuals.length - pendingCount;
    const target = targetCount || 7;
    const needed = Math.max(pendingCount, target - realCount);

    if (needed === 0) return { added: 0, reason: 'Already fully populated with real people' };

    const existingNames = entry.individuals
      .filter(i => i.name && i.name !== '[Pending Research]')
      .map(i => i.name);

    const prompt = this._buildResearchPrompt(entry, f.country, needed, existingNames);
    const response = await this._callOpenAI(prompt);

    if (response.error) return { error: response.error };

    let people;
    try {
      people = this._parseAIResponse(response.content);
    } catch (err) {
      return { error: 'Failed to parse AI response: ' + err.message };
    }

    if (!people || people.length === 0) {
      return { added: 0, reason: 'AI returned no usable results' };
    }

    return this._applyAIResults(entry, f.country, people, needed);
  }

  // Build the prompt for researching an organization
  _buildResearchPrompt(entry, country, needed, existingNames) {
    const existingList = existingNames.length > 0
      ? `\nThe following people are ALREADY listed -- do NOT include them: ${existingNames.join(', ')}\n`
      : '';

    return [
      { role: 'system', content:
        'You are a research assistant specializing in organizational leadership. '
        + 'You provide factual, verified information about real people in leadership positions. '
        + 'Never invent fictional people. If you are uncertain about a person, say so in their bio. '
        + 'Never use em dashes (the long dash character). Use " -- " (space dash dash space) instead. '
        + 'Write naturally as a human would. Keep bios to 1-2 sentences.'
      },
      { role: 'user', content:
        `Research the organization: ${entry.name}\n`
        + `Country: ${country}\n`
        + `Category: ${entry.category || 'Unknown'}\n`
        + `${entry.description ? 'Description: ' + entry.description + '\n' : ''}`
        + existingList
        + `\nProvide exactly ${needed} real key individuals (current or historically significant leaders, executives, or notable figures) associated with this organization.\n`
        + `\nRespond ONLY with a JSON array. Each element must have:\n`
        + `- "name": full name of the real person\n`
        + `- "role": their title/position at this organization\n`
        + `- "bio": 1-2 sentence factual biography (no em dashes, use " -- " instead)\n`
        + `\nExample format:\n`
        + `[{"name": "John Smith", "role": "CEO", "bio": "CEO of Example Corp since 2019. Previously served as COO at Another Corp."}]\n`
        + `\nJSON array only, no other text:`
      },
    ];
  }

  // Call the OpenAI API using native https
  _callOpenAI(messages) {
    return new Promise((resolve) => {
      const body = JSON.stringify({
        model: config.openai.model,
        messages: messages,
        max_tokens: config.openai.maxTokens,
        temperature: 0.3,
      });

      const url = new URL(config.openai.baseUrl + '/v1/chat/completions');
      const isHttp = url.protocol === 'http:';
      const transport = isHttp ? http : https;

      const options = {
        hostname: url.hostname,
        port: url.port || (isHttp ? 80 : 443),
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openai.apiKey}`,
          'Content-Length': Buffer.byteLength(body),
        },
      };

      const req = transport.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              resolve({ error: parsed.error.message || JSON.stringify(parsed.error) });
            } else if (parsed.choices && parsed.choices[0]) {
              resolve({ content: parsed.choices[0].message.content });
            } else {
              resolve({ error: 'Unexpected API response structure' });
            }
          } catch (err) {
            resolve({ error: 'Failed to parse API response: ' + err.message });
          }
        });
      });

      req.on('error', (err) => {
        resolve({ error: 'API request failed: ' + err.message });
      });

      const timeout = isHttp ? 120000 : 30000; // 2min for local models, 30s for cloud
      req.setTimeout(timeout, () => {
        req.destroy();
        resolve({ error: 'API request timed out after 30 seconds' });
      });

      req.write(body);
      req.end();
    });
  }

  // Parse the AI response into a people array
  _parseAIResponse(content) {
    // Strip markdown code fences if present
    let cleaned = content.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    }

    const people = JSON.parse(cleaned);
    if (!Array.isArray(people)) throw new Error('Response is not an array');

    // Validate and clean each entry
    return people.filter(p => p && p.name && p.role).map(p => ({
      name: String(p.name).trim().replace(/\u2014/g, ' -- '),
      role: String(p.role).trim().replace(/\u2014/g, ' -- '),
      bio: String(p.bio || '').trim().replace(/\u2014/g, ' -- ').replace(/\u2013/g, '-'),
    }));
  }

  // Apply AI research results to an entry
  _applyAIResults(entry, country, people, maxAdd) {
    if (!entry.individuals) entry.individuals = [];

    // Remove placeholder people from people.json before removing from entry
    for (const ind of entry.individuals) {
      if (ind.name === '[Pending Research]' && this._people[ind.id]) {
        delete this._people[ind.id];
      }
    }

    const existingNames = new Set(
      entry.individuals
        .filter(i => i.name !== '[Pending Research]')
        .map(i => (i.name || '').toLowerCase())
    );

    // Remove any [Pending Research] placeholders first
    entry.individuals = entry.individuals.filter(i => i.name !== '[Pending Research]');
    const existingIds = new Set(entry.individuals.map(i => i.id));

    let added = 0;
    const results = [];

    for (const person of people) {
      if (added >= maxAdd) break;
      if (existingNames.has(person.name.toLowerCase())) continue;

      const slug = entry.id + '-' + person.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      if (existingIds.has(slug)) continue;

      const ind = {
        id: slug,
        name: person.name,
        role: person.role,
        bio: person.bio || `${person.role} of ${entry.name}.`,
      };

      entry.individuals.push(ind);
      existingIds.add(slug);
      existingNames.add(person.name.toLowerCase());

      // Add to people.json
      if (!this._people[slug]) {
        this._people[slug] = {
          name: person.name,
          bio: person.bio || ind.bio,
          notes: 'Researched by AI swarm bot. Verify for accuracy.',
          affiliations: [{
            organization: entry.name,
            role: person.role,
            entryId: entry.id,
            country: country,
          }],
        };
      }

      results.push({ name: person.name, role: person.role });
      added++;
    }

    return { added, entryId: entry.id, entryName: entry.name, people: results };
  }

  // Count how many placeholder entries exist
  countPending() {
    let count = 0;
    for (const c in this._jd.countries) {
      for (const e of this._jd.countries[c]) {
        for (const ind of (e.individuals || [])) {
          if (ind.name === '[Pending Research]') count++;
        }
      }
    }
    return count;
  }
}

module.exports = { Brain, ROLE_TEMPLATES, DEFAULT_ROLES };
