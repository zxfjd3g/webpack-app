import Vue from 'vue'
import VueRouter from 'vue-router'
// import A from '@/pages/A.vue'
// import B from '@/pages/B.vue'

const A = () => import('@/pages/A')
const B = () => import('@/pages/B')

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/a',
      component: A,
    },
    {
      path: '/b',
      component: B,
    },
  ]
})