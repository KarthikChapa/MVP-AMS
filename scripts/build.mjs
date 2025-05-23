import { promises as fs } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Temporarily rename AI/ML related files
const filesToRename = [
  // AI API routes
  'app/api/biometric-fatigue',
  'app/api/career-advisor',
  'app/api/video-analysis',
  'app/api/performance-prediction',
  'app/api/wearables',
  // AI-related pages
  'app/test-ml',
  'app/video-exercise',
  // AI-related components
  'components/video-exercise',
  'components/dashboard/biometric-status.tsx',
  'components/dashboard/video-analysis.tsx',
  'components/dashboard/performance-prediction.tsx',
  // AI-related libraries
  'lib/ai',
  'lib/wearables',
  // Model types
  'lib/types/mediapipe.d.ts',
  'lib/types/vertex-ai.d.ts',
];

const tempSuffix = '.prebuild';

const apiStubTemplate = `import { createStubEndpoint } from '../stub';
export const GET = createStubEndpoint('ENDPOINT_NAME');
export const POST = createStubEndpoint('ENDPOINT_NAME');`;

const componentTemplate = `import { COMPONENT_NAME } from '@/components/stub';
export default COMPONENT_NAME;`;

async function createStubFile(filePath, type, name) {
  let content;
  if (type === 'api') {
    content = apiStubTemplate.replace(/ENDPOINT_NAME/g, name);
  } else if (type === 'component') {
    content = componentTemplate.replace(/COMPONENT_NAME/g, name);
  }
  
  if (content) {
    const dir = dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, content);
  }
}

async function createStubs() {
  // Create stub API routes
  const apiStubs = {
    'app/api/biometric-fatigue/route.ts': 'Biometric Fatigue',
    'app/api/career-advisor/route.ts': 'Career Advisor',
    'app/api/video-analysis/route.ts': 'Video Analysis',
    'app/api/performance-prediction/route.ts': 'Performance Prediction',
    'app/api/wearables/route.ts': 'Wearables',
  };

  // Create stub components
  const componentStubs = {
    'app/video-exercise/page.tsx': 'VideoPlayer',
    'components/video-exercise/video-player.tsx': 'VideoPlayer',
    'components/video-exercise/exercise-list.tsx': 'VideoExerciseHeader',
  };

  for (const [path, name] of Object.entries(apiStubs)) {
    await createStubFile(path, 'api', name);
  }

  for (const [path, name] of Object.entries(componentStubs)) {
    await createStubFile(path, 'component', name);
  }
}

async function safeWrite(path, content) {
  const dir = dirname(path);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path, content, 'utf8');
}

async function safeDelete(path) {
  try {
    await fs.unlink(path);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function safeMove(src, dest) {
  try {
    await fs.rename(src, dest);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function processFiles(files, action) {
  for (const file of files) {
    const fullPath = join(process.cwd(), file);
    const backupPath = `${fullPath}.bak`;
    const stubPath = `${fullPath}.stub`;

    try {
      if (action === 'prepare') {
        // Backup original file if it exists
        try {
          await fs.access(fullPath);
          await safeMove(fullPath, backupPath);
        } catch (error) {
          if (error.code !== 'ENOENT') throw error;
        }
      } else if (action === 'restore') {
        // Delete stub if it exists
        await safeDelete(fullPath);
        // Restore original from backup
        await safeMove(backupPath, fullPath);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
}

async function main() {
  let buildFailed = false;
  try {
    console.log('Preparing files for build...');
    await processFiles(filesToRename, 'prepare');

    console.log('Creating stub files...');
    await createStubs();

    console.log('Running Next.js build...');
    execSync('next build', { stdio: 'inherit' });
  } catch (error) {
    console.error('Build failed:', error);
    buildFailed = true;
  } finally {
    console.log('Restoring original files...');
    await processFiles(filesToRename, 'restore');

    if (buildFailed) {
      process.exit(1);
    }
  }
}

main().catch(console.error);
