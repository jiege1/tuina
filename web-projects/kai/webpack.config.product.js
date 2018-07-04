const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
require('babel-polyfill');

const rootSrc = __dirname + '/src';

module.exports = {
  // mode: 'development',
  mode: 'none',
  entry: {
    index: rootSrc + '/index.js',
    login: rootSrc + '/login.js',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    chunkFilename: 'chunks/[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[wj][hash:base64:6]',
                modules: true,
                camelCase: true
              }
            },
            {
              loader: 'less-loader'
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  resolve: {
    alias: {
      core: path.join(__dirname, 'core'),
      components: rootSrc + '/components',
      common: rootSrc + '/common',
      pages: rootSrc + '/pages',
      store: rootSrc + '/store',
      reducers: rootSrc + '/reducers',
      api: rootSrc + '/api',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    // 压缩代码
    new UglifyJsPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname + '/public/index.html'),
      inject: true,
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.resolve(__dirname + '/public/login.html'),
      inject: true,
      chunks: ['login'],
    }),
    // 将css写入css文件，并注入html模版
    new ExtractTextPlugin({
      filename: '[name].min.css',
      allChunks: true,
    }),

    // 存在build目录时，执行build命令，先删除以前的build目录
    new CleanWebpackPlugin(
      ['build'],　 //匹配删除的文件
      {
        root: __dirname,       　　　　　　　　　　//根目录
        verbose: true,        　　　　　　　　　　//开启在控制台输出信息
        dry: false        　　　　　　　　　　//启用删除文件
      }
    )
  ],
};