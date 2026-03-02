const { execSync } = require('node:child_process');

const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const protectedBranches = ['main', 'staging', 'prod'];

const validBranchRegex = /^(feat|fix|docs|refactor|chore)\/[a-z0-9-]+$/;

if (protectedBranches.includes(branchName)) {
  process.exit(0);
}

// Otherwise, check against the naming convention
if (!validBranchRegex.test(branchName)) {
  console.error('\x1b[31m%s\x1b[0m', '------------------------------------------------------');
  console.error('\x1b[31m%s\x1b[0m', `❌ Error: Invalid branch name "${branchName}"`);
  console.error(
    'Branch names must be "main", "staging", "prod" or follow: <type>/<short-description>',
  );
  console.error('Allowed types: feat/, fix/, docs/, refactor/, chore/');
  console.error('Example: feat/google-auth');
  console.error('To fix this, rename your branch with:');
  console.error('\x1b[32m%s\x1b[0m', `   git branch -m <correct-type>/<description>`);
  console.error('\x1b[31m%s\x1b[0m', '------------------------------------------------------');
  process.exit(1);
}
