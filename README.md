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
    vue
    vue-router
    axios
    vue-loader
    vue-template-compiler
    eslint-loader
    eslint
    eslint-config-alloy 
    eslint-plugin-vue 
    babel-eslint
    eslint-friendly-formatter

## 3. 编码
    demo2_blank

## 4. 打包vue
    1). loader配置
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

      将style-loader替换为vue-style-loader

    2). plugin配置
      const VueLoaderPlugin = require('vue-loader/lib/plugin')
      new VueLoaderPlugin()

## 5. vue组件HMR
    1). 开发服务器开启HMR
      devServer: {
        hot: true, // 开启HMR
      }
    2). 使用上内置HMR插件
      new webpack.HotModuleReplacementPlugin(),
    3). 说明
      vue-loader对所有vue组件进行的HMR监视处理

## 6. vue路由组件懒加载
    const A = () => import('@/pages/A')
    {
      path: '/a',
      component: A,
    }

## 7. eslint代码规范检查
    1). loader配置
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
    2). .eslintrc.js
      module.exports = {
        extends: [
          'eslint-config-alloy/vue',
        ],
        globals: {
          // 这里填入你的项目需要的全局变量
          // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
          //
          // Vue: false
        },
        rules: {
          // 这里填入你的项目需要的个性化配置，比如：
          //
          // // @fixable 一个缩进必须用两个空格替代
          // 'indent': [
          //     'error',
          //     2,
          //     {
          //         SwitchCase: 1,
          //         flatTernaryExpressions: true
          //     }
          // ]
          // semi: "off",
          // indent: "off",
          // 'no-trailing-spaces': 'off',
          // 'vue/script-indent': 'off',
          // 'vue/html-indent': 'off',
        }
      }
    3). .eslintignore
      /build/
      /config/
      /dist/
      /*.js