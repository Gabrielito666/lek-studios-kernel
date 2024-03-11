const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getWebpackPreviewerConfig = require('./webpack-preview-config.js');
const PORT = 8080;
const previewer_path = process.argv[2]

const compiler = webpack(getWebpackPreviewerConfig(previewer_path));
const serverOptions = { hot: true, open: false };
const server = new WebpackDevServer(serverOptions, compiler);
server.startCallback(() => { console.log(`dev server in http://localhost:${PORT}`) });