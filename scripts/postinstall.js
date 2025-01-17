import { execSync } from 'child_process';

try {
  // Check if TypeScript is installed
  execSync('tsc --version', { stdio: 'ignore' });
  console.log('TypeScript detected, running tsc...');
  execSync('tsc', { stdio: 'inherit' });
} catch (error) {
  console.warn('TypeScript is not installed. Skipping compilation.');
}
