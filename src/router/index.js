import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'
import login from '@/views/login/index'
import lineCharacteristics from '@/views/lineCharacteristics/index'
import roadDistribution from '@/views/lineCharacteristics/roadDistribution/index'
import publicTransport from '@/views/lineCharacteristics/publicTransport/index'  
import busStop from '@/views/lineCharacteristics/busStop/index' 
import busLane from '@/views/lineCharacteristics/busLane/index' 
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
        path: '/lineCharacteristics',
        name: '线网特征',
        component: lineCharacteristics,
        children: [
          {
            path: '/lineCharacteristics/roadDistribution',
            name: '道路网',
            component: roadDistribution,
          },
          {
            path: '/lineCharacteristics/publicTransport',
            name: '公交线路网',
            component: publicTransport,
          },
          {
            path: '/lineCharacteristics/busStop',
            name: '公交站点',
            component: busStop,
            
          },{
            path: '/lineCharacteristics/busLane',
            name: '公交专用道',
            component: busLane,
            
          }
        ]

      }
    ]

  }

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
