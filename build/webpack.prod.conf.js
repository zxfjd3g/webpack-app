/* 
生产环境配置
*/
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const baseConfig = require('./webpack.base.conf')

const prodConfig = merge(baseConfig, {
  
  // 生产环境
  mode: 'production',

  // 出口
  output: {
    filename: 'js/[name].[chunkhash].js', // js打包文件
    publicPath: '/' // 打包文件中引用地址的前置路径
  },

  // 生成sourcemap文件
  devtool: 'cheap-source-map',

  // 优化
  optimization: {
    // 对引入的所有第三方包进行单独打包
    splitChunks: {
      chunks: 'all'
    }
  },

  // 模块加载器
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      // less
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      // stylus
      {
        test: /\.styl(us)?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      }
    ]
  },

  // 插件
  plugins: [
    // 清除打包文件夹下原有的文件
    new CleanWebpackPlugin(),
    // 生成html, 并进行压缩处理
    new HtmlPlugin({
      template: 'index.html', // 源文件页面
      filename: 'index.html', // 打包生成页面
      inject: true, // 自动引入js/css
      minify: { // 配置内部使用的html-minifier
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 删除可能省略的空格
        removeAttributeQuotes: true, // 删除属性的引号
      },
    }),
    // 抽取css单独打包
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    // 压缩css文件
    new OptimizeCssAssetsPlugin()
  ]
})

module.exports = prodConfig