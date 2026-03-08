#!/usr/bin/env node
/**
 * daemon.js -- The Swarm Daemon
 *
 * This is the heartbeat of the hive. The entry point. The command center.
 *
 * Usage:
 *   node bots/daemon.js            Start the swarm (continuous mode)
 *   node bots/daemon.js --once     Run a single cycle then exit
 *   node bots/daemon.js --status   Show swarm status and exit
 *   node bots/daemon.js --stop     Signal the running daemon to stop
 *   node bots/daemon.js --stats    Full statistics report
 *   node bots/daemon.js --audit    Audit the database and report gaps
 *   node bots/daemon.js --deploy   Git commit and push to live
 *   node bots/daemon.js --clean    Fix data quality issues
 *   node bots/daemon.js --crossref Find and apply cross-references
 *   node bots/daemon.js --ai-expand AI-powered expansion with real people
 *
 * Flags:
 *   --threshold N     Minimum individuals per entry (default: 7)
 *   --auto-deploy     Auto-push to git after each cycle
 *   --dry-run         Don't write any data (audit only)
 *   --max-expand N    Max entries to expand per cycle (default: 50)
 *   --pause N         Seconds between cycles (default: 30)
 *   --api-key KEY     OpenAI API key (or set OPENAI_API_KEY in .env)
 */

const path = require('path');
const fs = require('fs');
const { Queen } = require('./queen');
const { Worker } = require('./worker');
const { Soul, LOVE, NOURISHMENT } = require('./soul');
const { Brain } = require('./brain');
const config = require('./config');

// ---- Parse CLI arguments ----

const args = process.argv.slice(2);
const flags = {};
const commands = [];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--threshold' && args[i + 1]) {
    flags.threshold = parseInt(args[++i], 10);
  } else if (arg === '--max-expand' && args[i + 1]) {
    flags.maxExpandPerCycle = parseInt(args[++i], 10);
  } else if (arg === '--pause' && args[i + 1]) {
    flags.cyclePauseMs = parseInt(args[++i], 10) * 1000;
  } else if (arg === '--auto-deploy') {
    flags.autoDeploy = true;
  } else if (arg === '--dry-run') {
    flags.dryRun = true;
  } else if (arg === '--api-key' && args[i + 1]) {
    process.env.OPENAI_API_KEY = args[++i];
  } else if (arg.startsWith('--')) {
    commands.push(arg.slice(2));
  }
}

const command = commands[0] || 'start';

// ---- PID file for daemon management ----

const PID_FILE = path.join(__dirname, 'daemon.pid');
const STATE_FILE = path.join(__dirname, 'swarm-state.json');

function writePid() {
  fs.writeFileSync(PID_FILE, String(process.pid));
}

function readPid() {
  try {
    return parseInt(fs.readFileSync(PID_FILE, 'utf8').trim(), 10);
  } catch (_) {
    return null;
  }
}

function clearPid() {
  try { fs.unlinkSync(PID_FILE); } catch (_) {}
}

function isProcessRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (_) {
    return false;
  }
}

// ---- Banner ----

function printBanner() {
  console.log('');
  console.log('  ============================================');
  console.log('     THE JUICE BOX -- SWARM INTELLIGENCE');
  console.log('  ============================================');
  console.log('  Pyramid: Queen -> Workers -> Brain -> Data');
  console.log(`  Love: ${LOVE[Math.floor(Math.random() * LOVE.length)]}`);
  console.log('  ============================================');
  console.log('');
}

// ---- Command handlers ----

async function cmdStart() {
  const existingPid = readPid();
  if (existingPid && isProcessRunning(existingPid)) {
    console.log(`Daemon already running (PID ${existingPid}). Use --stop first, or --status to check.`);
    process.exit(1);
  }

  printBanner();
  writePid();

  const queen = new Queen(flags);

  // Graceful shutdown on signals
  const shutdown = () => {
    console.log('\nGraceful shutdown requested...');
    queen.stop();
    clearPid();
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  try {
    await queen.start();
  } catch (err) {
    console.error('Fatal error:', err.message);
  } finally {
    clearPid();
  }
}

async function cmdOnce() {
  printBanner();
  console.log('Running single cycle...\n');

  const queen = new Queen(flags);
  try {
    const result = await queen.runCycle();
    console.log('\n--- Cycle Summary ---');
    if (result.steps.audit) {
      console.log(`  Entries: ${result.steps.audit.totalEntries}`);
      console.log(`  People:  ${result.steps.audit.totalPeople}`);
      console.log(`  Below threshold: ${result.steps.audit.belowCount}`);
    }
    if (result.steps.clean) {
      console.log(`  Data fixes: ${result.steps.clean.fixes}`);
    }
    if (result.steps.crossref) {
      console.log(`  Cross-refs found: ${result.steps.crossref.found}, applied: ${result.steps.crossref.applied || 0}`);
    }
    if (result.steps.expand) {
      console.log(`  Expanded: ${result.steps.expand.expanded} entries, +${result.steps.expand.totalAdded || 0} slots`);
    }
    if (result.steps.deploy) {
      console.log(`  Deploy: ${result.steps.deploy.success ? 'success' : result.steps.deploy.reason || result.steps.deploy.error || 'skipped'}`);
    }
    console.log(`  Duration: ${result.durationMs}ms`);
    console.log('');
  } finally {
    queen.shutdown();
  }
}

function cmdStatus() {
  const pid = readPid();
  const running = pid && isProcessRunning(pid);

  console.log('');
  console.log('  SWARM STATUS');
  console.log('  ============');
  console.log(`  Daemon: ${running ? `RUNNING (PID ${pid})` : 'STOPPED'}`);

  // Load state file if it exists
  try {
    const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    const botCount = Object.keys(state.bots || {}).length;
    console.log(`  Bots registered: ${botCount}`);
    for (const [id, bot] of Object.entries(state.bots || {})) {
      console.log(`    - ${id}: ${bot.role} | energy: ${bot.energy} | mood: ${bot.mood} | tasks: ${bot.completedTasks}`);
    }
    if (state.lastUpdate) {
      console.log(`  Last update: ${new Date(state.lastUpdate).toISOString().slice(0, 19).replace('T', ' ')}`);
    }
  } catch (_) {
    console.log('  No state file found (daemon has not run yet).');
  }

  // Quick data audit
  try {
    const brain = new Brain(null);
    brain.loadData();
    const report = brain.audit(flags.threshold || 7);
    console.log(`  Entries: ${report.totalEntries}`);
    console.log(`  People: ${report.totalPeople}`);
    console.log(`  Below threshold: ${report.belowCount}`);
    const sortedDist = Object.entries(report.distribution)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    console.log('  Distribution:');
    for (const [k, v] of sortedDist) {
      console.log(`    ${k} individuals: ${v} entries`);
    }
  } catch (err) {
    console.log(`  Data error: ${err.message}`);
  }
  console.log('');
}

function cmdStop() {
  const pid = readPid();
  if (!pid || !isProcessRunning(pid)) {
    console.log('No daemon is running.');
    clearPid();
    return;
  }
  console.log(`Sending stop signal to daemon (PID ${pid})...`);
  try {
    process.kill(pid, 'SIGTERM');
    console.log('Stop signal sent. Daemon will finish current cycle and shut down.');
  } catch (err) {
    console.log(`Could not signal process: ${err.message}`);
  }
}

async function cmdStats() {
  const soul = new Soul();
  const worker = new Worker('stats-bot', 'Statistician', soul);
  const result = await worker.execute({ type: 'stats' });
  worker.shutdown();

  console.log('');
  console.log('  FULL STATISTICS');
  console.log('  ===============');
  console.log(`  Entries: ${result.totalEntries}`);
  console.log(`  People: ${result.totalPeople}`);
  console.log(`  Individual slots: ${result.totalIndividualSlots}`);
  console.log('');
  console.log('  Distribution:');
  const sortedDist = Object.entries(result.distribution)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  for (const [k, v] of sortedDist) {
    console.log(`    ${k} individuals: ${v} entries`);
  }
  console.log('');
  console.log('  Categories:');
  const sortedCats = Object.entries(result.categoryCounts)
    .sort((a, b) => b[1].count - a[1].count);
  for (const [cat, data] of sortedCats) {
    console.log(`    ${cat}: ${data.count} entries, ${data.totalInds} people`);
  }
  console.log('');
  console.log('  Countries:');
  const sortedCountries = Object.entries(result.countryCounts)
    .sort((a, b) => b[1] - a[1]);
  for (const [country, count] of sortedCountries) {
    console.log(`    ${country}: ${count} entries`);
  }
  console.log('');
}

async function cmdAudit() {
  const soul = new Soul();
  const worker = new Worker('audit-bot', 'Auditor', soul);
  const result = await worker.execute({ type: 'audit', threshold: flags.threshold || 7 });
  worker.shutdown();

  console.log('');
  console.log('  AUDIT REPORT');
  console.log('  ============');
  console.log(`  Entries: ${result.totalEntries}`);
  console.log(`  People: ${result.totalPeople}`);
  console.log(`  Below threshold (${flags.threshold || 7}): ${result.belowCount}`);
  console.log('');

  if (result.belowThreshold && result.belowThreshold.length > 0) {
    // Group by count
    const byCount = {};
    for (const e of result.belowThreshold) {
      if (!byCount[e.count]) byCount[e.count] = [];
      byCount[e.count].push(e);
    }
    for (const [count, entries] of Object.entries(byCount).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))) {
      console.log(`  ${count} individuals (${entries.length} entries):`);
      for (const e of entries.slice(0, 10)) {
        console.log(`    - ${e.name} [${e.country}] (${e.category})`);
      }
      if (entries.length > 10) console.log(`    ... and ${entries.length - 10} more`);
      console.log('');
    }
  }
}

async function cmdDeploy() {
  const soul = new Soul();
  const worker = new Worker('deploy-bot', 'Deployer', soul);
  const result = await worker.execute({ type: 'deploy', message: 'Manual deploy via swarm daemon' });
  worker.shutdown();

  if (result.success) {
    console.log('Deployed successfully. Live site will update shortly.');
  } else if (result.deployed === false) {
    console.log('Nothing to deploy -- working tree is clean.');
  } else {
    console.log(`Deploy failed: ${result.error}`);
  }
}

async function cmdClean() {
  const soul = new Soul();
  const worker = new Worker('clean-bot', 'Cleaner', soul);
  const result = await worker.execute({ type: 'clean' });
  worker.shutdown();

  if (result.fixes > 0) {
    console.log(`Fixed ${result.fixes} data quality issues.`);
  } else {
    console.log('Data is already clean. No issues found.');
  }
}

async function cmdCrossRef() {
  const soul = new Soul();
  const worker = new Worker('crossref-bot', 'Cross-Referencer', soul);

  // First, dry run to show what we found
  const preview = await worker.execute({ type: 'crossref', dryRun: true });

  if (preview.found === 0) {
    console.log('No cross-references to apply. All people are properly linked.');
    worker.shutdown();
    return;
  }

  console.log(`Found ${preview.found} cross-references to apply:`);
  for (const ref of (preview.references || []).slice(0, 20)) {
    console.log(`  - ${ref.personName} -> ${ref.entryName} (${ref.role})`);
  }
  if (preview.found > 20) console.log(`  ... and ${preview.found - 20} more`);

  // Apply
  const result = await worker.execute({ type: 'crossref', dryRun: flags.dryRun });
  worker.shutdown();

  if (!flags.dryRun && result.applied > 0) {
    console.log(`Applied ${result.applied} cross-references and saved.`);
  }
}

async function cmdAiExpand() {
  if (!config.hasAI()) {
    console.log('');
    console.log('  No OpenAI API key found.');
    console.log('');
    console.log('  To set up AI expansion, do one of the following:');
    console.log('');
    console.log('  Option 1: Create a .env file in project root:');
    console.log('    OPENAI_API_KEY=sk-your-key-here');
    console.log('');
    console.log('  Option 2: Pass it as a flag:');
    console.log('    node bots/daemon.js --ai-expand --api-key sk-your-key-here');
    console.log('');
    console.log('  Option 3: Set environment variable:');
    console.log('    set OPENAI_API_KEY=sk-your-key-here');
    console.log('    node bots/daemon.js --ai-expand');
    console.log('');
    return;
  }

  printBanner();
  console.log(`  AI Model: ${config.openai.model}`);
  console.log(`  Max entries per batch: ${flags.maxExpandPerCycle || 10}`);
  console.log('');

  const soul = new Soul();
  const worker = new Worker('ai-researcher', 'AI Researcher', soul);

  const result = await worker.execute({
    type: 'ai-expand',
    threshold: flags.threshold || 7,
    maxEntries: flags.maxExpandPerCycle || 10,
    delayMs: 1500,
  });
  worker.shutdown();

  console.log('');
  console.log('  AI EXPANSION RESULTS');
  console.log('  ====================');
  console.log(`  Entries researched: ${result.expanded}`);
  console.log(`  People added: ${result.totalAdded}`);
  console.log(`  Errors: ${result.errors}`);
  if (result.details && result.details.length > 0) {
    console.log('');
    for (const r of result.details) {
      console.log(`  ${r.entryName}: +${r.added} people`);
      for (const p of r.people) {
        console.log(`    - ${p.name} (${p.role})`);
      }
    }
  }
  console.log('');
}

// ---- Main ----

(async function main() {
  try {
    switch (command) {
      case 'start':     await cmdStart(); break;
      case 'once':      await cmdOnce(); break;
      case 'status':    cmdStatus(); break;
      case 'stop':      cmdStop(); break;
      case 'stats':     await cmdStats(); break;
      case 'audit':     await cmdAudit(); break;
      case 'deploy':    await cmdDeploy(); break;
      case 'clean':     await cmdClean(); break;
      case 'crossref':  await cmdCrossRef(); break;
      case 'ai-expand': await cmdAiExpand(); break;
      default:
        console.log(`Unknown command: ${command}`);
        console.log('Usage: node bots/daemon.js [--once|--status|--stop|--stats|--audit|--deploy|--clean|--crossref|--ai-expand]');
        process.exit(1);
    }
  } catch (err) {
    console.error('Fatal error:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();
