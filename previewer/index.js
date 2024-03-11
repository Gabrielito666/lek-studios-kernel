const path = require('path');
const { execSync } = require('child_process');

const getLaunchPreviewer = (dirname) => () => {
    const previewerPath = path.resolve(dirname, 'previewer.js')
    const concurrentlyCommand = [
        `concurrently`,
        `"node ${path.resolve(__dirname, 'start-webpack.js')} ${previewerPath}"`,
        `"wait-on http://localhost:8080 && electron ${path.resolve(__dirname, './electron-starter.js')}"`
    ].join(' ');

    execSync(concurrentlyCommand, { stdio: 'inherit' });
}
module.exports = getLaunchPreviewer;