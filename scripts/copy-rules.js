/**
 * Script to copy rules from the rules directory to the dist/rules directory
 * Handles both files and subdirectories
 */

const fs = require('fs');
const path = require('path');

// Create dist/rules directory if it doesn't exist
const sourceDir = path.join(__dirname, '..', 'rules');
const targetDir = path.join(__dirname, '..', 'dist', 'rules');

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

// Function to copy a directory recursively
function copyDirectory(source, target) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  let count = 0;
  const items = fs.readdirSync(source);

  for (const item of items) {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);

    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      // Recursively copy subdirectories
      count += copyDirectory(sourcePath, targetPath);
    } else {
      // Copy files
      fs.copyFileSync(sourcePath, targetPath);
      count++;
    }
  }

  return count;
}

// Copy all rules
try {
  const copiedCount = copyDirectory(sourceDir, targetDir);
  console.log(`Successfully copied ${copiedCount} rule files to ${targetDir}`);
} catch (error) {
  console.error(`Error copying rules: ${error.message}`);
  process.exit(1);
}
