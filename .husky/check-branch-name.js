const { execSync } = require('child_process');

const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

// Your README rules in Regex
const validBranchRegex = /^(feat|fix|docs|refactor|chore)\/[a-z0-9-]+$/;
const protectedBranches = ['main'];

if (protectedBranches.includes(branchName)) {
  process.exit(0);
}

if (!validBranchRegex.test(branchName)) {
  console.error('\x1b[31m%s\x1b[0m', '------------------------------------------------------');
  console.error('\x1b[31m%s\x1b[0m', `❌ Error: Invalid branch name "${branchName}"`);
  console.error('Branch names must follow: <type>/<short-description>');
  console.error('Allowed types: feat/, fix/, docs/, refactor/, chore/');
  console.error('Example: feat/google-auth');
  console.error('\x1b[31m%s\x1b[0m', '------------------------------------------------------');
  process.exit(1);
}