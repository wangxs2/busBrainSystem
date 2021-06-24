import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'
import login from '@/views/login/index'

import errorPage from '@/views/errorPage/index'
import HOME from '@/views/home/index'
import lineCharacteristics from '@/views/lineCharacteristics/index'
import roadDistribution from '@/views/lineCharacteristics/roadDistribution/index'
import publicTransport from '@/views/lineCharacteristics/publicTransport/index'   //公交线路
import busStop from '@/views/lineCharacteristics/busStop/index' //公交站点
import busLane from '@/views/lineCharacteristics/busLane/index'  //公交专用道
import passengerCorridor from '@/views/lineCharacteristics/passengerCorridor/index' //客运走廊

import passengerAnalysis from '@/views/passengerAnalysis/index'   //客流分析
import linePassenger from '@/views/passengerAnalysis/linePassenger/index' //线路客流
import sectionPassenger from '@/views/passengerAnalysis/sectionPassenger/index'  //断面客流
import stationPassenger from '@/views/passengerAnalysis/stationPassenger/index' //站点客流
import regionPassenger from '@/views/passengerAnalysis/regionPassenger/index' //区域客流

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
    
    path: '/errorPage',
    name: 'errorPage',
    component: errorPage
  },
  {
    path: '/home',
    name: '首页',
    component: HOME
  },
  // {
  //   path: '/layout',
  //   name: Layout,
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/lineCharacteristics',
  //       name: '线网特征',
  //       component: lineCharacteristics,
  //       children: [
  //         {
  //           path: '/lineCharacteristics/roadDistribution',
  //           name: '道路网',
  //           component: roadDistribution,
  //         },
  //         {
  //           path: '/lineCharacteristics/publicTransport',
  //           name: '公交线路网',
  //           component: publicTransport,
  //         },
  //         {
  //           path: '/lineCharacteristics/busStop',
  //           name: '公交站点',
  //           component: busStop,
            
  //         },{ 
  //           path: '/lineCharacteristics/busLane',
  //           name: '公交专用道',
  //           component: busLane,
            
  //         },{
  //           path: '/lineCharacteristics/passengerCorridor',
  //           name: '客运走廊',
  //           component: passengerCorridor,
            
  //         }
  //       ]

  //     },
  //     {
  //       path: '/passengerAnalysis',
  //       name: '客流分析',
  //       component: passengerAnalysis,
  //       children: [
  //         {
  //           path: '/passengerAnalysis/linePassenger',
  //           name: '线路客流',
  //           component: linePassenger,
  //         },
  //         {
  //           path: '/passengerAnalysis/sectionPassenger',
  //           name: '断面客流',
  //           component: sectionPassenger,
  //         },
  //         {
  //           path: '/passengerAnalysis/stationPassenger',
  //           name: '站点客流',
  //           component: stationPassenger,
            
  //         },{ 
  //           path: '/passengerAnalysis/regionPassenger',
  //           name: '区域客流',
  //           component: regionPassenger,
            
  //         }
  //       ]

  //     }
  //   ]

  // }

]

export const asyncRouterMap = [{
  path: '',
  // component: ''
  component: Layout,
  name: 'Layout',
}]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
