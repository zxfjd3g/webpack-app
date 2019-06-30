# 自定义webpack项目(jquery基础版)

## 1. 重要目标
    1). 通用
      各种资源打包: js/css/less/stylus/img/font
      代码分割(code spliting)
      模块懒加载(module lazy load)

    2). 开发环境
      内存中打包-->启动服务器-->打开浏览器访问, 
      live-realod
      sourcemap调试
      
    3). 生产环境
      JS拆分打包 --> JS压缩
      抽取CSS单独打包  --> CSS压缩
      利用浏览器缓存: 利用打包的hash值
	
## 2. 下载相关包
    webpack
    webpack-cli
    html-webpack-plugin
    webpack-merge
    webpack-dev-server
    copy-webpack-plugin 
    clean-webpack-plugin@2.0.2
    mini-css-extract-plugin 
    optimize-css-assets-webpack-plugin
    babel-loader
    @babel/core 
    @babel/preset-env 
    @babel/plugin-syntax-dynamic-import
    file-loader 
    url-loader
    css-loader 
    style-loader 
    less-loader 
    less 
    stylus-loader 
    stylus
    friendly-errors-webpack-plugin
    jquery@1.12

## 3. 编码
  demo1_blank

## 4. 配置
    1). build/webpack.base.conf.js
      /* 
      基础配置
      */
      const CopyPlugin = require('copy-webpack-plugin')
      const utils = require('./utils')

      module.exports = {
        // 入口
        entry: {
          app: './src/main.js'
        },

        // 出口
        output: {
          path: utils.resolve('dist')
        },

        // 模块解析(简化模块引入)
        resolve: {
          // 引入模块的默认扩展名
          extensions: ['.js', '.vue'],
          // 引入模块的别名
          alias: {
            '@': utils.resolve('src'), // 配置 @ 指向 src
          },
        },

        // 模块加载器
        module: {
          rules: [
            // ES6 => ES5
            {
              test: /\.js$/,
              use: 'babel-loader',
              include: utils.resolve('src'),
            },
            // img
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10240,
                name: 'images/[name].[hash:7].[ext]',
              }
            },
            // audio/video
            {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10240,
                name: 'media/[name].[hash:7].[ext]',
              },
            }, 
            // font
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10240,
                name: 'fonts/[name].[hash:7].[ext]',
              },
            }
          ]
        },

        // 插件
        plugins: [
          // 将源码项目static下的源码文件中拷贝到打包项目的static下
          new CopyPlugin([{
            from: utils.resolve('static'),
            to: utils.resolve('dist/static'),
          }, ]),
        ]
      }

    2). build/webpack.dev.conf.js
      /* 
      开发环境配置
      */
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
            // 加载css
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            },

            // 加载less
            {
              test: /\.less$/,
              use: ['style-loader', 'css-loader', 'less-loader']
            },

            // 加载stylus
            {
              test: /\.styl(us)?$/,
              use: ['style-loader', 'css-loader', 'stylus-loader']
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
          new FriendlyErrorsPlugin()
        ],
      })

      module.exports = devConfig

    3). build/webpack.prod.conf.js
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

    4). .babelrc
      {
        "presets": [
          "@babel/preset-env"
        ],
        "plugins": [
          "@babel/plugin-syntax-dynamic-import"
        ]
      }
    5). server.js
      const Koa = require('koa');
      const serve = require('koa-static');

      const openDefaultBrowser = function (url) {
        const { exec } = require('child_process');
        let type = '';
        switch (process.platform) {
          case 'darwin':
            type = `open ${url}`;
            break;
          case 'win32':
            type = `start ${url}`;
            break;
          default:
            type = `xdg-open ${[url]}`;
        }
        exec(type);
      };

      const app = new Koa();

      app.use(serve('./dist', { extensions: ['html'] }));

      app.listen(3030, (err) => {
        if (!err) {
          console.log('server listen 3030');
          setTimeout(() => {
            openDefaultBrowser('http://localhost:3030');
          }, 1000);
        } else {
          console.error(err);
        }
      });
    6). package.json
      {
        "name": "webpack-mini",
        "version": "1.0.0",
        "main": "index.js",
        "license": "MIT",
        "scripts": {
          "dev": "webpack-dev-server --progress --config build/webpack.dev.conf.js",
          "build": "webpack --progress --config build/webpack.prod.conf.js",
          "server": "node server.js"
        },
        "devDependencies": {
          "@babel/core": "^7.4.5",
          "@babel/plugin-syntax-dynamic-import": "^7.2.0",
          "@babel/preset-env": "^7.4.5",
          "babel-loader": "^8.0.6",
          "clean-webpack-plugin": "2.0.2",
          "copy-webpack-plugin": "^5.0.3",
          "css-loader": "^3.0.0",
          "file-loader": "^4.0.0",
          "friendly-errors-webpack-plugin": "^1.7.0",
          "html-webpack-plugin": "^3.2.0",
          "jquery": "1.12",
          "koa": "^2.7.0",
          "koa-static": "^5.0.0",
          "less": "^3.9.0",
          "less-loader": "^5.0.0",
          "mini-css-extract-plugin": "^0.7.0",
          "optimize-css-assets-webpack-plugin": "^5.0.3",
          "style-loader": "^0.23.1",
          "stylus": "^0.54.5",
          "stylus-loader": "^3.0.2",
          "url-loader": "^2.0.1",
          "webpack": "^4.35.0",
          "webpack-cli": "^3.3.5",
          "webpack-dev-server": "^3.7.2",
          "webpack-merge": "^4.2.1"
        }
      }

## 5. 打包运行
    1). 开发环境运行:
        yarn run dev
    2). 生产环境打包并运行
        yarn run build
        yarn run server
        
