import { promises as fs } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Temporarily rename AI/ML related files
const filesToRename = [
  'app/api/biometric-fatigue',
  'app/api/career-advisor',
  'app/api/video-analysis',
  'app/api/performance-prediction',
  'lib/ai',
  'app/test-ml',
  'app/video-exercise',
  'components/video-exercise',
  'lib/wearables',
];

const tempSuffix = '.prebuild';

async function renameFiles(files, action) {
  for (const file of files) {
    const fullPath = join(process.cwd(), file);
    try {
      await fs.access(fullPath);
      const newPath = action === 'hide' 
        ? `${fullPath}${tempSuffix}` 
        : fullPath.replace(tempSuffix, '');
      await fs.rename(fullPath, newPath);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Error processing ${file}:`, error);
      }
    }
  }
}

async function main() {
  try {
    // Hide files before build
    await renameFiles(filesToRename, 'hide');

    // Run the build command
    execSync('next build', { stdio: 'inherit' });
  } finally {
    // Always try to restore files, even if build fails
    await renameFiles(filesToRename.map(f => f + tempSuffix), 'restore');
  }
}

main().catch(console.error);
