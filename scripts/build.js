const fs = require('fs');
const path = require('path');

// Temporarily rename AI/ML related files
const filesToRename = [
  'app/api/biometric-fatigue',
  'app/api/career-advisor',
  'app/api/video-analysis',
  'lib/ai',
  'app/test-ml',
];

const tempSuffix = '.prebuild';

function renameFiles(files, action) {
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

// Hide files before build
renameFiles(filesToRename, 'hide');

// Run the build command
require('child_process').execSync('next build', { stdio: 'inherit' });

// Restore files after build
renameFiles(filesToRename.map(f => f + tempSuffix), 'restore');
