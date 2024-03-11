#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

const packageJsonContent = 
`{
  "name": "my-lek-studio-project",
  "description": "lek-studio-project",
  "dependencies": {
    "lek-studios-kernel": "^2.0.8"
  }
}`;

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

(async () =>
  {
    try
    {
      await fs.writeFile(path.resolve(process.cwd(), '.gitignore'), 'node_modules');
      await fs.writeFile(path.resolve(process.cwd(), 'kernel.js'), kernelJsContent);
      await fs.writeFile(path.resolve(process.cwd(), 'index.js'), indexJsContent);
      await fs.writeFile(path.resolve(process.cwd(), 'previewer.js'), previewerJsContent);
      await fs.writeFile(path.resolve(process.cwd(), 'export.js'), exportJsContent);
      await fs.mkdir(path.resolve(process.cwd(), 'scripts'));
      await fs.mkdir(path.resolve(process.cwd(), 'default_files'));

      execSync('npm install', { stdio: 'inherit' });
    }
    catch (error)
    {
      console.error('An error occurred:', error);
    }
  }
)()