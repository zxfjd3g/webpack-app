/* 
开发环境配置
*/
const webpack = require('webpack')
const merge = require('webpack-merge') // 合并配置的
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 友好打包输出提示的

const baseConfig = require('./webpack.base.conf')
const utils = require('./utils')

const devConfig = merge(baseConfig, {
  // 模块加载器
  module: {
    rules: [
      
    ]
  },

  // 开启sourcemap调试
  devtool: 'cheap-module-eval-source-map',

  // 开发服务器
  devServer: {
    host: 'localhost', // 主机名
    port: '8888', // 端口号
    open: true, // 自动打开浏览器访问
    quiet: true, // 不输出打包信息
    hot: true, // 开启HMR
    overlay: true, // 在页面上显示错误信息
  },

  // 插件
  plugins: [
    // 友好的打包输出提示
    new FriendlyErrorsPlugin(),
    // HMR插件
    new webpack.HotModuleReplacementPlugin(),
  ],
})

module.exports = devConfig