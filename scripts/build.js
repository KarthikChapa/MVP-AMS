const fs = require('fs');
const path = require('path');

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
  files.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const newPath = action === 'hide' 
        ? `${fullPath}${tempSuffix}` 
        : fullPath.replace(tempSuffix, '');
      fs.renameSync(fullPath, newPath);
    }
  });
}

try {
  // Hide files before build
  await renameFiles(filesToRename, 'hide');

  // Run the build command
  require('child_process').execSync('next build', { stdio: 'inherit' });
} finally {
  // Always try to restore files, even if build fails
  await renameFiles(filesToRename.map(f => f + tempSuffix), 'restore');
}
