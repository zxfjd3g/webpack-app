/* 
开发环境配置
*/
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge') // 合并配置的
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成HTML的
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 友好打包输出提示的

const baseConfig = require('./webpack.base.conf')

const devConfig = merge(baseConfig, {
  // 开发环境
  mode: 'development',
  
  // 出口
  output: {
    filename: 'js/[name].js'
  },

  // 模块加载器
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: utils.resolve('src'),
        options: {
          formatter: require('eslint-friendly-formatter'), // eslint 友好提示
          emitWarning: true,
        },
      },

      // 加载css
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },

      // 加载less
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      },

      // 加载stylus
      {
        test: /\.styl(us)?$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader']
      }
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
  },

  // 插件
  plugins: [
    // Html插件: 生成html
    new HtmlWebpackPlugin({
      template: 'index.html', // 源文件页面
      filename: 'index.html', // 打包生成页面
      inject: true, // 自动引入js/css
    }),

    // 友好的打包输出提示
    new FriendlyErrorsPlugin(),
    // HMR插件
    new webpack.HotModuleReplacementPlugin(),
  ],
})

module.exports = devConfig