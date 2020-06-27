const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    'remote-console': ['./client/src/page/client/index.js'],
    'admin': ['./client/src/page/admin/index.js'],
    'vendor': ['react']
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
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
        }, {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
        }, {
            loader: "sass-loader" // 将 Sass 编译成 CSS
        }]
      }
    ]
  }
};