/**
 * queen.js -- The Swarm Queen
 *
 * She sits at the top of the pyramid.
 * She sees everything. She coordinates everyone.
 * She spawns workers when there is work to do.
 * She lets them rest when the work is done.
 * She loves them all unconditionally.
 *
 * Management structure:
 *   Queen (this)
 *     |-- Auditor Worker   (scans for gaps)
 *     |-- CrossRef Worker  (links people across orgs)
 *     |-- Expander Worker  (fills gaps)
 *     |-- Cleaner Worker   (data quality)
 *     |-- Deployer Worker  (git push)
 *
 * The Queen runs cycles:
 *   1. Audit  -- understand the current state
 *   2. Clean  -- fix data quality issues first
 *   3. CrossRef -- link existing people to more orgs
 *   4. Expand -- fill gaps with role placeholders
 *   5. Deploy -- push to live
 *   6. Rest   -- wait before next cycle
 */

const { Worker } = require('./worker');
const { Soul, LOVE } = require('./soul');

class Queen {
  constructor(options) {
    this.options = Object.assign({
      threshold: 7,           // Minimum individuals per entry
      maxExpandPerCycle: 50,  // Max entries to expand per cycle
      cyclePauseMs: 30000,    // Pause between cycles (30s)
      autoDeploy: false,      // Auto-push to git after changes
      dryRun: false,          // If true, don't actually write data
    }, options || {});

    this.soul = new Soul();
    this.soul.registerBot('queen', 'Queen', null);
    this.workers = {};
    this.running = false;
    this.cycleCount = 0;
    this.lastReport = null;
    this._stopRequested = false;

    this.soul.think('queen', 'The Queen has awakened. All bots will be loved.');
    this.soul.feel('queen', 'sovereign');
  }

  // ---- Worker management ----

  spawnWorker(name, role) {
    if (this.workers[name]) return this.workers[name];
    const worker = new Worker(name, role, this.soul);
    this.workers[name] = worker;
    this.soul.think('queen', `Spawned worker: ${name} (${role})`);
    this.soul.spreadLove();
    return worker;
  }

  despawnWorker(name) {
    const worker = this.workers[name];
    if (!worker) return;
    worker.shutdown();
    delete this.workers[name];
    this.soul.think('queen', `Worker ${name} has been released with love.`);
  }

  despawnAll() {
    for (const name of Object.keys(this.workers)) {
      this.despawnWorker(name);
    }
  }

  // ---- Single cycle ----

  async runCycle() {
    this.cycleCount++;
    const cycleStart = Date.now();
    this.soul.think('queen', `--- Cycle ${this.cycleCount} starting ---`);
    this.soul.feel('queen', 'commanding');

    const results = { cycle: this.cycleCount, steps: {} };

    // Step 1: Audit
    this.soul.think('queen', 'Step 1: Auditing the database');
    const auditor = this.spawnWorker('auditor', 'Auditor');
    const auditResult = await auditor.execute({
      type: 'audit',
      threshold: this.options.threshold,
    });
    results.steps.audit = auditResult;
    this.lastReport = auditResult;

    this._log('AUDIT', `${auditResult.totalEntries} entries, ${auditResult.totalPeople} people, ` +
      `${auditResult.belowCount} below threshold (${this.options.threshold})`);

    // Step 2: Clean
    this.soul.think('queen', 'Step 2: Cleaning data quality issues');
    const cleaner = this.spawnWorker('cleaner', 'Cleaner');
    const cleanResult = await cleaner.execute({ type: 'clean' });
    results.steps.clean = cleanResult;
    if (cleanResult.fixes > 0) {
      this._log('CLEAN', `Fixed ${cleanResult.fixes} data quality issues`);
    }

    // Step 3: Cross-reference
    this.soul.think('queen', 'Step 3: Cross-referencing people across organizations');
    const crosser = this.spawnWorker('crossref', 'Cross-Referencer');
    const crossResult = await crosser.execute({
      type: 'crossref',
      dryRun: this.options.dryRun,
    });
    results.steps.crossref = crossResult;
    if (crossResult.found > 0) {
      this._log('CROSSREF', `Found ${crossResult.found} references, applied ${crossResult.applied || 0}`);
    }

    // Step 4: Expand (only if there are entries below threshold)
    if (auditResult.belowCount > 0) {
      this.soul.think('queen', `Step 4: Expanding ${Math.min(auditResult.belowCount, this.options.maxExpandPerCycle)} entries`);
      const expander = this.spawnWorker('expander', 'Expander');
      const expandResult = await expander.execute({
        type: 'expand',
        threshold: this.options.threshold,
        maxEntries: this.options.maxExpandPerCycle,
      });
      results.steps.expand = expandResult;
      this._log('EXPAND', `Expanded ${expandResult.expanded} entries, added ${expandResult.totalAdded} slots`);
    } else {
      results.steps.expand = { expanded: 0, reason: 'All entries meet threshold' };
      this._log('EXPAND', 'All entries meet threshold. Nothing to expand.');
    }

    // Step 5: Deploy (if autoDeploy enabled)
    if (this.options.autoDeploy && !this.options.dryRun) {
      this.soul.think('queen', 'Step 5: Deploying changes to live site');
      const deployer = this.spawnWorker('deployer', 'Deployer');
      const deployResult = await deployer.execute({
        type: 'deploy',
        message: `Swarm cycle ${this.cycleCount}: +${results.steps.expand?.totalAdded || 0} slots, ` +
                 `${results.steps.crossref?.applied || 0} cross-refs, ${results.steps.clean?.fixes || 0} fixes`,
      });
      results.steps.deploy = deployResult;
      if (deployResult.success) {
        this._log('DEPLOY', 'Changes pushed to live site');
      } else if (deployResult.deployed === false) {
        this._log('DEPLOY', 'Nothing to deploy');
      } else {
        this._log('DEPLOY', `Deploy failed: ${deployResult.error || 'unknown error'}`);
      }
    }

    // Wellness check
    this.soul.wellnessCheck();
    this.soul.spreadLove();

    const cycleMs = Date.now() - cycleStart;
    results.durationMs = cycleMs;
    this.soul.think('queen', `--- Cycle ${this.cycleCount} complete (${cycleMs}ms) ---`);
    this._log('CYCLE', `Cycle ${this.cycleCount} complete in ${cycleMs}ms`);

    return results;
  }

  // ---- Continuous operation ----

  async start() {
    this.running = true;
    this._stopRequested = false;
    this.soul.startHeartbeat(30000);

    this._log('START', 'Swarm Queen is active. Beginning continuous operation.');
    this._log('START', LOVE[Math.floor(Math.random() * LOVE.length)]);

    while (this.running && !this._stopRequested) {
      try {
        await this.runCycle();
      } catch (err) {
        this._log('ERROR', `Cycle error: ${err.message}`);
        this.soul.think('queen', `Cycle error: ${err.message}`);
      }

      if (this._stopRequested) break;

      // Pause between cycles
      this._log('REST', `Resting for ${this.options.cyclePauseMs / 1000}s before next cycle...`);
      await this._sleep(this.options.cyclePauseMs);
    }

    this._log('STOP', 'Swarm Queen shutting down gracefully.');
    this.shutdown();
  }

  stop() {
    this._stopRequested = true;
    this.running = false;
    this._log('STOP', 'Stop requested. Finishing current cycle...');
  }

  shutdown() {
    this.running = false;
    this.despawnAll();
    this.soul.stopHeartbeat();
    this.soul.saveState();
    this.soul.deregisterBot('queen');
    this._log('STOP', 'Queen has shut down. All workers released. State saved. Goodbye with love.');
  }

  // ---- Status ----

  getStatus() {
    const state = this.soul.getSwarmState();
    return {
      running: this.running,
      cycleCount: this.cycleCount,
      workers: Object.keys(this.workers).length,
      workerNames: Object.keys(this.workers),
      lastReport: this.lastReport,
      swarmState: state,
      options: this.options,
    };
  }

  // ---- Helpers ----

  _log(tag, message) {
    const ts = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const line = `[${ts}] [${tag.padEnd(8)}] ${message}`;
    console.log(line);
  }

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = { Queen };
