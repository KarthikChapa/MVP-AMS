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

async function createTempVersion(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  // Remove AI-related imports and component usage
  const cleanedContent = content
    .replace(/import.*@\/lib\/ai[^;]*;?\n/g, '')
    .replace(/import.*@\/components\/video-exercise[^;]*;?\n/g, '')
    .replace(/import.*@\/lib\/wearables[^;]*;?\n/g, '')
    .replace(/<VideoPlayer[^>]*>.*?<\/VideoPlayer>/gs, '<div>Video Player Placeholder</div>')
    .replace(/<VideoExerciseHeader[^>]*>.*?<\/VideoExerciseHeader>/gs, '<div>Header Placeholder</div>')
    .replace(/<BiometricStatus[^>]*>.*?<\/BiometricStatus>/gs, '<div>Biometric Status Placeholder</div>')
    .replace(/<PerformancePrediction[^>]*>.*?<\/PerformancePrediction>/gs, '<div>Performance Prediction Placeholder</div>')
    .replace(/<VideoAnalysis[^>]*>.*?<\/VideoAnalysis>/gs, '<div>Video Analysis Placeholder</div>');
  
  await fs.writeFile(`${filePath}${tempSuffix}`, cleanedContent);
}

async function processFiles(files, action) {
  for (const file of files) {
    const fullPath = join(process.cwd(), file);
    try {
      const stats = await fs.stat(fullPath);
      if (stats.isFile()) {
        if (action === 'hide') {
          await createTempVersion(fullPath);
          await fs.rename(fullPath, `${fullPath}${tempSuffix}.bak`);
        } else {
          await fs.rename(`${fullPath}${tempSuffix}.bak`, fullPath);
          await fs.unlink(`${fullPath}${tempSuffix}`);
        }
      } else if (stats.isDirectory()) {
        const newPath = action === 'hide' 
          ? `${fullPath}${tempSuffix}` 
          : fullPath.replace(tempSuffix, '');
        await fs.rename(fullPath, newPath);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Error processing ${file}:`, error);
      }
    }
  }
}

async function main() {
  try {
    console.log('Processing AI-related files...');
    // Hide files and create temp versions
    await processFiles(filesToRename, 'hide');

    console.log('Running Next.js build...');
    // Run the build command
    execSync('next build', { stdio: 'inherit' });
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  } finally {
    console.log('Restoring AI-related files...');
    // Always try to restore files
    await processFiles(filesToRename.map(f => f + tempSuffix), 'restore');
  }
}

main().catch(console.error);
