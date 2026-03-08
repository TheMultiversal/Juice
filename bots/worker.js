/**
 * worker.js -- The Worker Bot
 *
 * Each worker is a focused, tireless, loving entity.
 * It receives tasks from the Queen, executes them through the Brain,
 * and reports back through the Soul.
 *
 * Tasks it can handle:
 *   - audit:      Scan the database and report gaps
 *   - crossref:   Find and apply cross-references
 *   - expand:     Expand entries below threshold
 *   - clean:      Fix data quality issues (em dashes, formatting)
 *   - deploy:     Git commit and push
 *   - dedup:      Find duplicate entries and people
 *   - stats:      Generate full statistics report
 */

const { Brain } = require('./brain');
const { Soul, LOVE, NOURISHMENT } = require('./soul');

class Worker {
  constructor(id, role, soul) {
    this.id = id;
    this.role = role;
    this.soul = soul;
    this.brain = new Brain(soul);
    this.born = Date.now();
    this.tasksCompleted = 0;
    this.alive = true;

    // Register with the soul
    this.soul.registerBot(id, role, 'queen');
    this.soul.feel(id, 'alive');
    this.soul.think(id, `I am ${id}, born to ${role}. Ready to serve with love.`);
  }

  // Execute a task
  async execute(task) {
    if (!this.alive) return { error: 'Worker is dead' };

    this.soul.setTask(this.id, task.type);
    this.soul.think(this.id, `Starting task: ${task.type}`);
    this.soul.feel(this.id, 'focused');

    let result;
    try {
      // Load fresh data for every task
      const loaded = this.brain.loadData();
      this.soul.think(this.id, `Data loaded: ${loaded.entries} entries, ${loaded.people} people`);

      switch (task.type) {
        case 'audit':
          result = this._audit(task);
          break;
        case 'crossref':
          result = this._crossref(task);
          break;
        case 'expand':
          result = this._expand(task);
          break;
        case 'ai-expand':
          result = await this._aiExpand(task);
          break;
        case 'clean':
          result = this._clean(task);
          break;
        case 'deploy':
          result = this._deploy(task);
          break;
        case 'dedup':
          result = this._dedup(task);
          break;
        case 'stats':
          result = this._stats(task);
          break;
        default:
          result = { error: `Unknown task type: ${task.type}` };
      }

      this.soul.completeTask(this.id, result);
      this.soul.feel(this.id, 'satisfied');
      this.tasksCompleted++;

    } catch (err) {
      result = { error: err.message };
      this.soul.feel(this.id, 'struggling');
      this.soul.think(this.id, `Task failed: ${err.message}`);
    }

    return result;
  }

  // ---- Task implementations ----

  _audit(task) {
    const threshold = task.threshold || 7;
    const report = this.brain.audit(threshold);
    this.soul.think(this.id,
      `Audit complete: ${report.totalEntries} entries, ${report.totalPeople} people. ` +
      `${report.belowCount} entries below ${threshold} individuals.`
    );
    return report;
  }

  _crossref(task) {
    const refs = this.brain.crossReference();
    this.soul.think(this.id, `Found ${refs.length} cross-references to apply`);

    if (task.dryRun) {
      return { found: refs.length, references: refs, applied: 0, dryRun: true };
    }

    if (refs.length > 0) {
      const applied = this.brain.applyCrossReferences(refs);
      this.brain.saveData();
      this.soul.think(this.id, `Applied ${applied} cross-references and saved`);
      return { found: refs.length, applied };
    }

    return { found: 0, applied: 0 };
  }

  _expand(task) {
    const threshold = task.threshold || 7;
    const maxEntries = task.maxEntries || 50;  // Safety limit per batch
    const report = this.brain.audit(threshold);

    if (report.belowCount === 0) {
      this.soul.think(this.id, 'All entries are at or above threshold. Nothing to expand.');
      return { expanded: 0, reason: 'All entries meet threshold' };
    }

    // Sort by most deficient first
    const targets = report.belowThreshold.sort((a, b) => a.count - b.count).slice(0, maxEntries);

    let totalAdded = 0;
    const results = [];
    for (const target of targets) {
      const r = this.brain.expandEntry(target.id, threshold);
      totalAdded += r.added;
      if (r.added > 0) results.push(r);
    }

    if (totalAdded > 0) {
      this.brain.saveData();
      this.soul.think(this.id,
        `Expanded ${results.length} entries, added ${totalAdded} individual slots. Data saved.`
      );
    }

    return { expanded: results.length, totalAdded, details: results };
  }

  _clean(task) {
    const fixes = this.brain.cleanData();
    if (fixes > 0) {
      this.brain.saveData();
      this.soul.think(this.id, `Cleaned ${fixes} data quality issues and saved`);
    }
    return { fixes };
  }

  _deploy(task) {
    const msg = task.message || `Swarm auto-deploy: ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`;
    const status = this.brain.gitStatus();

    if (status.length === 0 || (status.length === 1 && status[0] === '')) {
      this.soul.think(this.id, 'Nothing to deploy -- working tree clean');
      return { deployed: false, reason: 'Working tree clean' };
    }

    this.soul.think(this.id, `Deploying ${status.length} changed files...`);
    const result = this.brain.gitCommitAndPush(msg);

    if (result.success) {
      this.soul.think(this.id, 'Deployed successfully. Live site will update shortly.');
      this.soul.feel(this.id, 'proud');
    } else {
      this.soul.think(this.id, `Deploy failed: ${result.error}`);
      this.soul.feel(this.id, 'concerned');
    }

    return result;
  }

  _dedup(task) {
    const entryDupes = this.brain.findDuplicates();
    const peopleDupes = this.brain.findSimilarPeople();
    this.soul.think(this.id,
      `Dedup scan: ${entryDupes.length} duplicate entries, ${peopleDupes.length} duplicate people`
    );
    return { entryDuplicates: entryDupes, peopleDuplicates: peopleDupes };
  }

  _stats(task) {
    const stats = this.brain.getStats();
    this.soul.think(this.id,
      `Stats: ${stats.totalEntries} entries, ${stats.totalPeople} people, ` +
      `${stats.totalIndividualSlots} individual slots`
    );
    return stats;
  }

  async _aiExpand(task) {
    const threshold = task.threshold || 7;
    const maxEntries = task.maxEntries || 10;  // Conservative default for AI calls
    const delayMs = task.delayMs || 3000;      // Pause between API calls to avoid rate limits(30 req/min)

    const report = this.brain.audit(threshold);
    // Also find entries with [Pending Research] placeholders
    const pendingCount = this.brain.countPending();

    // Prioritize entries with placeholders, then entries below threshold
    const allBelow = report.belowThreshold || [];
    const withPending = [];
    for (const c in this.brain._jd.countries) {
      for (const e of this.brain._jd.countries[c]) {
        const hasPending = (e.individuals || []).some(i => i.name === '[Pending Research]');
        if (hasPending) {
          withPending.push({
            id: e.id, name: e.name, category: e.category,
            country: c, count: (e.individuals || []).length,
          });
        }
      }
    }

    // Merge: pending-having entries first, then below-threshold
    const seenIds = new Set();
    const targets = [];
    for (const t of [...withPending, ...allBelow]) {
      if (seenIds.has(t.id)) continue;
      seenIds.add(t.id);
      targets.push(t);
    }
    const batch = targets.slice(0, maxEntries);

    if (batch.length === 0) {
      this.soul.think(this.id, 'Nothing to AI-expand. All entries are filled.');
      return { expanded: 0, errors: 0, pending: pendingCount };
    }

    this.soul.think(this.id, `AI-expanding ${batch.length} entries (${pendingCount} pending placeholders in database)...`);

    let totalAdded = 0;
    let errors = 0;
    const results = [];

    for (let i = 0; i < batch.length; i++) {
      const target = batch[i];
      this.soul.think(this.id, `[${i + 1}/${batch.length}] Researching: ${target.name} (${target.country})`);

      const r = await this.brain.aiResearch(target.id, threshold);

      if (r.error) {
        this.soul.think(this.id, `  Error: ${r.error}`);
        errors++;
        const errLower = r.error.toLowerCase();
        // If we get a rate limit error, back off and retry
        if (errLower.includes('rate') || errLower.includes('429') || errLower.includes('limit') || errLower.includes('too many') || errLower.includes('try again')) {
          let retryOk = false;
          for (let attempt = 1; attempt <= 2; attempt++) {
            const waitSec = attempt * 60;
            this.soul.think(this.id, `Rate limit hit. Waiting ${waitSec}s (attempt ${attempt}/2)...`);
            await new Promise(resolve => setTimeout(resolve, waitSec * 1000));
            const retry = await this.brain.aiResearch(target.id, threshold);
            if (!retry.error) {
              if (retry.added > 0) {
                totalAdded += retry.added;
                results.push(retry);
                errors--;
                this.soul.think(this.id, `  Retry succeeded! Added ${retry.added} people`);
              }
              retryOk = true;
              break;
            }
          }
          if (!retryOk) {
            this.soul.think(this.id, 'Still rate limited after retries. Stopping batch.');
            break;
          }
        } else if (errLower.includes('401') || errLower.includes('auth') || errLower.includes('insufficient_quota')) {
          this.soul.think(this.id, 'Auth error detected. Stopping batch.');
          break;
        }
      } else if (r.added > 0) {
        totalAdded += r.added;
        results.push(r);
        this.soul.think(this.id, `  Added ${r.added} people: ${r.people.map(p => p.name).join(', ')}`);
      } else {
        this.soul.think(this.id, `  Skipped: ${r.reason || 'no results'}`);
      }

      // Pause between calls
      if (i < batch.length - 1 && delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    if (totalAdded > 0) {
      this.brain.saveData();
      this.soul.think(this.id, `AI expansion complete. Added ${totalAdded} real people across ${results.length} entries. Data saved.`);
    }

    return { expanded: results.length, totalAdded, errors, details: results };
  }

  // ---- Lifecycle ----

  shutdown() {
    this.alive = false;
    this.soul.feel(this.id, 'at peace');
    this.soul.think(this.id, `Shutting down after ${this.tasksCompleted} tasks. It was an honor.`);
    this.soul.deregisterBot(this.id);
  }
}

module.exports = { Worker };
