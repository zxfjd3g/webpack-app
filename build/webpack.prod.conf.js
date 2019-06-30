/* 
生产环境配置
*/
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const baseConfig = require('./webpack.base.conf')

const prodConfig = merge(baseConfig, {
  
  // 生成sourcemap文件
  devtool: 'cheap-module-source-map',

  // 优化
  /* optimization: {
    // 对引入的所有第三方包进行单独打包
    splitChunks: {
      chunks: 'all'
    }
  }, */

  // 插件
  plugins: [
    // 抽取css单独打包
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    // 压缩css文件
    new OptimizeCssAssetsPlugin()
  ]
})

// 执行命令时带上了 --report
if (process.env.npm_config_report) {
  const {
    BundleAnalyzerPlugin
  } = require('webpack-bundle-analyzer'); // 打包体积分析
  prodConfig.plugins.push(new BundleAnalyzerPlugin());

  const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 打包速度分析
  const smp = new SpeedMeasurePlugin();
  prodConfig = smp.wrap(prodConfig);
}

// 使用Gzip压缩插件实现打包的js/css的gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
prodConfig.plugins.push(
  new CompressionWebpackPlugin({
    filename: '[path].gz[query]', // 文件名
    algorithm: 'gzip', // 使用gzip压缩
    test: /\.(js|css)$/, // 对js/css文件进行处理
    threshold: 10240, // 超过此大小的文件才处理
    minRatio: 0.8 // 最小压缩率
  })
)

module.exports = prodConfig