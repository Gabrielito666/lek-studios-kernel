const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const getWebpackPreviewerConfig = previewer_path => ({
  mode: 'development',
  entry: previewer_path,
  output: {
    path: path.resolve(__dirname, 'dist-dev'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!lek-photographic-studio)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    open: false,
    client: {
      logging: 'error',
    },
  }
});
module.exports = getWebpackPreviewerConfig;