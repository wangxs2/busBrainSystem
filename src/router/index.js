import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'
import login from '@/views/login/index'
import apiList from '@/views/apiList/index'
import forgetPwd from '@/views/forgetPwd/index'
Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/forgetPwd',
    name: 'forgetPwd',
    component: forgetPwd
  },
  {
    path: '/layout',
    name: Layout,
    component: Layout,
    children: [
      {
        path: '/apiList',
        name: 'apiList',
        component: apiList

      }
    ]

  },

]

export const asyncRouterMap = [{
  path: '',
  component: ''
  // component: Layout
}]

export default new Router({
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
