const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['./client/src/index.js'],
  output: {
    path: path.resolve(__dirname, 'client/assets'),
    filename: 'remote-console.min.js',
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