const path = require('path');

const fs = require('fs').promises;
const getPackageJson = async ({ dirname, package_name, package_version }) =>
{
    try
    {
        const scripts_path = path.resolve(dirname, './scripts');
        const customScripts = (await fs.readdir(scripts_path))
        .filter(file => path.extname(file) === '.js')
        .map(file => ({ name : path.basename(file, path.extname(file)), path : path.resolve(scripts_path, file) }))
        .reduce((acc, { name, path }) => ({ ...acc, [name] : `node ${ path }` }));

        const packageJsonContent = 
        {
            "name": "my-lek-studio-project",
            "description": "a lek-studio-project",
            "dependencies": {
                [package_name]: package_version
            },
            "scripts": {
                "dev": `node ./node_modules/${package_name}/previewer.js`,
                "export": `node ./node_modules/${package_name}/capture.js`,
                ...customScripts
            }
        };
        return JSON.stringify(packageJsonContent);
    }
    catch (error)
    {
        console.error('Error reading the script directory', error);
        throw error;
    }
};
module.exports = getPackageJson;