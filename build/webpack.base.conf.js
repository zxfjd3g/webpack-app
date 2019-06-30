/* 
基础配置
*/
const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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
      // vue$: 'vue/dist/vue.runtime.esm.js', // 配置 vue 指向es module的版本
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

      // 处理vue
{
  test: /\.vue$/,
  use: [{
    loader: 'vue-loader',
    options: {
      // 将vue模板中的标签属性引入模板转换为require引入
      transformToRequire: { 
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href',
      },
    },
  }, ],
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
      },
    ]
  },

  // 插件
  plugins: [
    // 将源码项目static下的源码文件中拷贝到打包项目的static下
    new CopyPlugin([{
      from: utils.resolve('static'),
      to: utils.resolve('dist/static'),
    }, ]),
    // 加载vue插件
    new VueLoaderPlugin()
  ]
}