const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    'remote-console': ['./client/src/page/client/index.js'],
    'admin': ['./client/src/page/admin/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'client/assets'),
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};