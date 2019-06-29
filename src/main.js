import $ from 'jquery'
import {cube} from './js/math'
import lessons from './assets/json/lessons.json'
// import './assets/css/test1.css'
// import './assets/css/test2.less'
import './assets/css/test3.styl'

console.log(cube(3))

$(() => {
  const $app = $('#app')
  // 根据json数据显示一个列表
  const $ul = $('<ul>')
  $app.append($ul)
  lessons.forEach(lesson => {
    $ul.append(`<li>课程名: <span class="lesson-name">${lesson.name}</span>, 时间: ${lesson.days}天</li>`)
  })

  // 添加一个按钮
  const $button = $('<button>我要学习</button>')
  $button.click(function () {
    // import()-->使模块拆分单独打包, 点击回调才执行--> 懒加载
    import('./js/atguigu').then(atguigu => {
      if (atguigu.studyConfirm()) {
        atguigu.goAtguigu()
      }
    })
  })
  $app.append($button)
})
