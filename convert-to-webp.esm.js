import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import sharp from 'sharp';

const FOLDERS = ['dogparkly.com/images', 'instagram', 'qteabobafood.com'];

// Define the directory containing images
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Function to convert PNG to WebP
const convertToWebP = async (filePath) => {
  const fileName = path.basename(filePath, path.extname(filePath)); // Get the file name without extension
  const outputFilePath = path.join(path.dirname(filePath), `${fileName}.webp`);

  try {
    if (fsSync.existsSync(outputFilePath)) {
      console.log(`Already exists: ${outputFilePath}`);
      return;
    }
    // Convert the image to WebP
    await sharp(filePath)
      .webp({
        quality: 45,
      })
      .toFile(outputFilePath);
    console.log(`Converted: ${filePath} → ${outputFilePath}`);
  } catch (error) {
    console.error(`Failed to convert ${filePath}:`, error);
  }
};

// Function to process all PNG files in the directory
const processImages = async (folderPath) => {
  const imagesDir = path.resolve(__dirname, folderPath);
  try {
    const files = await fs.readdir(imagesDir);

    // Filter jpg and png files and convert them
    const jpgFiles = files.filter((file) =>
      ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase()),
    );
    if (jpgFiles.length === 0) {
      console.log('No PNG files found in the directory.');
      return;
    }

    for (const file of jpgFiles) {
      const filePath = path.join(imagesDir, file);
      await convertToWebP(filePath);
    }

    console.log('All files have been processed.');
  } catch (error) {
    console.error('Error processing images:', error);
  }
};

// Run the script

for (const folder of FOLDERS) {
  await processImages(folder);
}
