# 自定义webpack项目(vue升级版)

## 1. 重要目标
    1). 通用
      整合简化配置

    2). 开发环境
      使用proxyaxios请求跨域解决
      
    3). 生产环境
      打包文件分析
      使用postcss给特定样式加上厂商前缀
      开启gzip压缩

      
## 2. 下载相关包
    axios
    compression-webpack-plugin
    webpack-bundle-analyzer
    speed-measure-webpack-plugin
    dll-link-webpack-plugin
    postcss-loader
    autoprefixer

## 3. 编码
    webpack-app3_blank

## 4. 打包分析
    1). 说明:
      分析打包文件(JS)的内部组成, 找出不需要或可以优化的模块: webpack-bundle-analyzer
      打包速度分析可以看出哪些操作比耗时, 看看是否可以优化: speed-measure-webpack-plugin
      speed-measure-webpack-plugin: 分析打包速度
    2). 配置:
      // 执行命令时带上了 --report
      if (process.env.npm_config_report) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 打包体积分析
        prodConfig.plugins.push(new BundleAnalyzerPlugin()); 

        const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 打包速度分析
        const smp = new SpeedMeasurePlugin();
        prodConfig = smp.wrap(prodConfig);
      }
    3). 命令:
      "build-report": "npm run build --report"

## 5. 开启Gzip压缩
    1). 说明: 
      对打包文件(js/css)进行进一步压缩, 返回给浏览器后会自动解压运行
      
    2). 配置
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

## 6. 使用dll-link-webpack-plugin提升打包速度
    1). 插件配置
      var DllLinkPlugin = require("dll-link-webpack-plugin");
      // 使用DLL插件
      new DllLinkPlugin({
        htmlMode: true,
        config: require('./webpack.dll.conf.js'),
      }),

    2). webpack.dll.conf.js
      const webpack = require('webpack');
      const {dependencies} = require('../package.json');
      const {resolve} = require('./utils');

      const vendors = Object.keys(dependencies);
      const excludeVendors = ['@babel/polyfill']; // 不打包进 vendor 的依赖

      excludeVendors.forEach((dep) => {
        const index = vendors.indexOf(dep);
        if (index > -1) {
          vendors.splice(index, 1);
        }
      });

      module.exports = {
        mode: process.env.NODE_ENV,
        entry: {
          vendor: vendors,
        },
        output: {
          path: resolve('dist'),
          filename: 'js/[name].[hash].js',
          library: '[name]',
        },
        plugins: [
          new webpack.DllPlugin({
            path: resolve('dist/[name]-manifest'),
            name: '[name]',
          }),
        ],
      };

## 7. 使用postcss
    1). 说明: 
      通过postcss给样式加厂商前缀
    2). loader配置
      [cssExtractLoader, 'css-loader', 'postcss-loader']
    3). postcss.config.js
      module.exports = {
        plugins: [
          require('autoprefixer'),
        ],
      };
