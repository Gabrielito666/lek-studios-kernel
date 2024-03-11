const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const getPackageJson = require('./getPackageJson');
const getDefaultFiles = require('./getDafaultFiles');

const getNpxIndex = ({ package_name, package_version, dirname }) => async() =>
{
  try {
    const default_files = await getDefaultFiles(dirname);
    const packageJsonContent = await getPackageJson({ dirname, package_name, package_version });
    
    await fs.writeFile(path.resolve(process.cwd(), 'package.json'), packageJsonContent);
    await Promise.all(default_files.map(async({ userPath, content }) => { await fs.writeFile(userPath, content) }));
    
    execSync('npm install', { stdio: 'inherit' });
        
    console.log(`
      Your "${package_name}" project has been successfully initialized.
      
      Use 'npm run dev' to open the previewer and edit image.js to edit your photo.
      
      Use 'npm run export' to export your product to where you want it to go.
    `);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
module.exports = getNpxIndex;