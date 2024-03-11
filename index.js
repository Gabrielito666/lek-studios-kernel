const getNpxIndex = require('./npxIndex');
const getLaunchPreviewer = require('./previewer');
const getGetExportHtml = require('./export/getExportHtml');

const lekStudioKernel = ({ package_name, package_version, dirname }) =>
{
    const npxIndex = getNpxIndex({ package_name, package_version, dirname });
    const launchPreviewer = getLaunchPreviewer(dirname);
    const getExportHtml = getGetExportHtml(dirname);
    return { npxIndex, launchPreviewer, getExportHtml };
}
module.exports = lekStudioKernel;