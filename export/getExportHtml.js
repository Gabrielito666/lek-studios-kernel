const ReactDOMServer = require('react-dom/server');
const React = require('react');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack-export-config');
const htmlImagesToBase64 = require('./htmlImagesToBase64'); 

const getGetExportHtml = dirname => async () =>
{
  const pathToCompile = path.resolve(dirname, 'export.js');
  console.log('wait please...')
  await webpack_compile(pathToCompile);
  const exportElement = require('./dist-export/bundle');
  const stringStyle = fs.readFileSync(path.resolve(__dirname, './dist-export/styles.css'), 'utf-8');
  const original = exportElement.default();
  const { width, height, exports, className, children } = original.props;
  const style = { width : width + 'px', height : height + 'px' };

  const Component = () => React.createElement(
    'div', 
    null,
    React.createElement('style', null, stringStyle),
    React.createElement('div', { className, style, id }, children)
  );
  const htmlPure = ReactDOMServer.renderToStaticMarkup(Component());
  const html = await htmlImagesToBase64(htmlPure);
  return { html, props : original.props };
};

const webpack_compile = pathToCompile => new Promise((resolve, reject) =>
{
  webpack(
    webpackConfig(pathToCompile),
    (err, stats) =>
    {
      if (err || stats.hasErrors()) reject(err || stats.toString('errors-only'));
      else resolve();
    }
  );
});

module.exports = getGetExportHtml;