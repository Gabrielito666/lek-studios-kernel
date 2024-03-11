const fs = require('fs');
const path = require('path');

const kernelJsContent =
`const lekStudioKernel = require('lek-studios-kernel');
module.exports = lekStudioKernel
({
    dirname : __dirname,
    package_name : 'my-lek-studio-package',
    package_version : '^1.0.0'
});`;
const indexJsContent =
`#!/usr/bin/env node
const { npxIndex } = require('./kernel.js');
npxIndex();`;
const previewerJsContent =
`import React from "react";
import XXXX from "../../../XXXX";
const Previewer =>
{

    return <></>
}
export default Previewer;`;

const exportJsContent =
`const puppeteer = require('puppeteer');
const getExportHtml = require('./getExportHtml');
const path = require('path');

(async () => {
  const { html, props } = await getExportHtml();
  const { exports, id } = props;
  const output = exports ? path.resolve(process.cwd(), exports) : path.resolve(process.cwd(), './output.png');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.waitForSelector("#\${id}");
  const div = await page.$("#\${id}");
  await div.screenshot({ path: output });
  await browser.close();
  console.log('your creation has been successfully exported')
})();`;

fs.writeFile(path.resolve(process.cwd(), '.gitignore'), 'node_modules', () => {});
fs.writeFile(path.resolve(process.cwd(), 'kernel.js'), kernelJsContent, () => {});
fs.writeFile(path.resolve(process.cwd(), 'index.js'), indexJsContent, () => {});
fs.writeFile(path.resolve(process.cwd(), 'previewer.js', previewerJsContent, () => {}));
fs.writeFile(path.resolve(process.cwd(), 'export.js', exportJsContent, () => {}));
fs.mkdir(path.resolve(process.cwd(), 'scripts'), () => {});
fs.mkdir(path.resolve(process.cwd(), 'default_files'), () => {});