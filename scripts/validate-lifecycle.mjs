import fs from 'node:fs';

const lifecycle = JSON.parse(fs.readFileSync(new URL('../LIFECYCLE.json', import.meta.url), 'utf8'));
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const migration = fs.readFileSync(new URL('../MIGRATION.md', import.meta.url), 'utf8');
const consumers = fs.readFileSync(new URL('../CONSUMERS.md', import.meta.url), 'utf8');
const policy = JSON.parse(fs.readFileSync(new URL('../.github/legacy-dependency-policy.json', import.meta.url), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const fail = (message) => {
  console.error(`lifecycle validation failed: ${message}`);
  process.exitCode = 1;
};

if (lifecycle.repository !== 'ORESoftware/ores-streams') fail('repository mismatch');
if (lifecycle.package !== pkg.name) fail('package name mismatch');
if (lifecycle.status !== 'legacy') fail('status must remain legacy');
if (lifecycle.authority !== false) fail('legacy repository must not claim authority');
if (lifecycle.mutable_dependencies_allowed !== false) fail('mutable dependencies must remain forbidden');
if (lifecycle.compatibility_policy?.new_features !== 'forbidden') fail('new features must remain forbidden');
if (policy.status !== lifecycle.status) fail('policy status mismatch');
if (policy.forbid_new_mutable_references !== true) fail('mutable reference policy must remain fail-closed');
if (!readme.includes('Lifecycle: legacy / compatibility-only')) fail('README legacy banner missing');
if (!readme.includes('ORESoftware/ores-transport')) fail('README transport migration boundary missing');
if (!migration.includes('immutable version or commit')) fail('migration must require immutable pinning');
if (!consumers.includes('active fleet consumer set is empty')) fail('consumer inventory statement missing');
if (!pkg.oresLifecycle || pkg.oresLifecycle.status !== lifecycle.status) fail('package lifecycle metadata mismatch');

if (!process.exitCode) console.log('ores-streams lifecycle policy: ok');
