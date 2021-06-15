import {
  fetchGet
} from '@/libs/http'
import {
  constantRouterMap,
  asyncRouterMap
} from '@/router'
import {
  getCookie
} from '@/libs/util'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
// console.log(process.env.NODE_ENV)
const localList = `
,/system,/system/roles,/system/orgs,/system/users,/system/auth,/lineCharacteristics,/lineCharacteristics/roadDistribution,/lineCharacteristics/publicTransport,/lineCharacteristics/busStop,/lineCharacteristics/busLane,
` //本地列表 注意最后加逗号

/**
 * 递归菜单
 */
function filterAsyncMenu (pid, json) {
  let arr = []
  json.map(item => {
    if (item.pid === pid) {
      if (localList.indexOf(item.url + ',') == -1 || item.url === '') {
        //判断是否本地页面 不是去错误页面
        item.url = '/error'
      }
      arr.push(item)
      item.children = filterAsyncMenu(item.id, json)
    }
  })
  return arr
}

/**
 * 格式菜单成路由表
 */

function filterAsyncRouter (menusaData) {
  let arr = [],
    obj
  menusaData.forEach(item => {
    obj = {}
    if (item.children && item.children.length) {
      obj.children = filterAsyncRouter(item.children)
    }

    if (item.url === '/error') {
      //加载错误页面
      obj.path = '/error'
      obj.component = _import('errorPage/index')
    } else {
      obj.path = item.url
      // console.log(item.url)
      // console.log(item.url.slice(1))
      obj.component = _import(item.url.slice(1) + '/index')
    }
    obj.name = item.name
    arr.push(obj)
  })
  return arr
}
const permission = {
  state: {
    menuData: [], //菜单数据
    routers: constantRouterMap, //路由表
    addRouters: [], //动态路由表
  },
  mutations: {
    SET_MENU: (state, menuData) => { //菜单
      state.menuData = menuData
    },
    SET_ROUTERS: (state, routers) => { //设置路由
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ //获取菜单
      commit,
      state
    }) {

      return new Promise((resolve, reject) => {
        fetchGet('auths/menu').then(res => {
          if (!res) {
            resolve(1)
            return
          }
          let menuData = filterAsyncMenu(1000, res.slice(0))
          asyncRouterMap[0].children = filterAsyncRouter(menuData.slice(0))
          let routerData = asyncRouterMap
          commit('SET_MENU', menuData)
          console.log(menuData)
          console.log(routerData)
          commit('SET_ROUTERS', routerData)
          resolve({
            menuData,
            routerData
          })
        })
      })
    }
  }
}

export default permission