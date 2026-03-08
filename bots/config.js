/**
 * config.js -- Swarm Configuration
 *
 * Loads settings from environment variables or a .env file.
 * Keeps secrets out of the codebase.
 *
 * Setup:
 *   Create a .env file in the project root with:
 *     OPENAI_API_KEY=sk-your-key-here
 *     OPENAI_MODEL=gpt-4o          (optional, defaults to gpt-4o)
 *     OPENAI_MAX_TOKENS=2000       (optional)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ENV_PATH = path.join(ROOT, '.env');

// Load .env file if it exists
function loadEnv() {
  try {
    const raw = fs.readFileSync(ENV_PATH, 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  } catch (_) {
    // No .env file -- that is okay, user can set env vars directly
  }
}

loadEnv();

const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000', 10),
    baseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com',
  },

  hasAI() {
    return !!this.openai.apiKey;
  },
};

module.exports = config;
