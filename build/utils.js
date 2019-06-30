/* 
工具模块
*/
// 引入抽取 css 的 loader
const cssExtractLoader = require('mini-css-extract-plugin').loader;
const path = require('path');

// 环境判断
const IS_PROD = process.env.NODE_ENV === 'production';

/* 
得到指定目录的绝对路径
*/
const resolve = dir => path.resolve(__dirname, '..', dir);

// eslint 配置
const generateEslintRules = () => {
  let eslint = [];
  if (!IS_PROD) {
    eslint = [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: resolve('src'),
      options: {
        formatter: require('eslint-friendly-formatter'), // eslint 友好提示
        emitWarning: true,
      },
    }];
  }
  return eslint;
};

// css loader 配置
const generateCssRules = () => {
  const generateCssLoaders = (loaderName) => {
    const loaders = IS_PROD 
        ? [cssExtractLoader, 'css-loader', 'postcss-loader']
        : ['vue-style-loader', 'css-loader']
    
    // 如果有名称则创建一个该名称的 loader 来解析，例如 less、stylus、scss
    if (loaderName) {
      loaders.push(`${loaderName}-loader`);
    }
    return loaders;
  };
  const loadersObj = {
    'css': generateCssLoaders(),
    'styl(us)?': generateCssLoaders('stylus'),
    'less': generateCssLoaders('less'),
    's[ac]ss': generateCssLoaders('sass'),
  };
  const loaderRules = [];
  // 生成带 test 的完整 rule
  for (const name in loadersObj) {
    loaderRules.push({
      test: new RegExp(`\\.${name}$`),
      use: loadersObj[name],
    });
  }
  return loaderRules;
};

module.exports = {
  IS_PROD,
  resolve,
  eslintRules: generateEslintRules(),
  cssRulus: generateCssRules(),
}