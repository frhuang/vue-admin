import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Test1 = () => System.import('@/views/Test1')
const Test2 = () => System.import('@/views/Test2')

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Test1
    },
    {
      path: '/test2',
      component: Test2
    }
  ]
})
