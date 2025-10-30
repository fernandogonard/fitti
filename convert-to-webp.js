const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'src', 'assets', 'branding');
const outputDir = path.join(__dirname, 'src', 'assets', 'branding');

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  files.forEach((file) => {
    const inputFile = path.join(inputDir, file);
    const outputFile = path.join(outputDir, file.replace(path.extname(file), '.webp'));

    sharp(inputFile)
      .webp()
      .toFile(outputFile)
      .then(() => {
        console.log(`Converted ${file} to WebP format.`);
      })
      .catch((err) => {
        console.error(`Error converting ${file}:`, err);
      });
  });
});