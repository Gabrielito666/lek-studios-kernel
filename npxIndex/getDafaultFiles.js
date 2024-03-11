const path = require('path');
const fs = require('fs').promises;

const getDefaultFiles = async dirname => {
    try {
        const default_files_path = path.resolve(dirname, './default_files');
        const entries = await fs.readdir(default_files_path, { withFileTypes: true });
        const filesInfoPromises = entries
            .filter(dirent => dirent.isFile())
            .map(async dirent => {
                const filePath = path.resolve(default_files_path, dirent.name);
                const userPath = path.resolve(process.cwd(), dirent.name)
                const content = await fs.readFile(filePath, 'utf-8');
                return { userPath, content };
            });

        return await Promise.all(filesInfoPromises);
    } catch (error) {
        console.error('Error reading the default_files directory', error);
        throw error;
    }
};

module.exports = getDefaultFiles;
