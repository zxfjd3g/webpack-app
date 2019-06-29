/* 
工具模块
*/
const path = require('path')

/* 
得到指定目录的绝对路径
*/
const resolve = dir => path.resolve(__dirname, '..', dir)

module.exports = {
  resolve
}