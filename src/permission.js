import router from './router/index.js'
import store from './stores'
import {
  getCookie,
  delCookie
} from './libs/util'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
  showSpinner: false
})

router.beforeEach((to, from, next) => {

  NProgress.start() // 进度条开始
  if (to.path === '/login') {
    next()
    // store.commit('SET_ID', '') //清除user
    return
  }
  if (to.path === '/') {
    next("/login")
    // store.commit('SET_ID', '') //清除user
    return
  }
  next()
  // if (to.path !== '/login' && !getCookie('user')) {
  //   next('/login')
  //   return
  // } else {
  //   if (store.getters.userId !== getCookie('user') + '') {
  //     //判断是否拉取用户信息 权限

  //     store.commit('SET_ID', getCookie('user'))
  //     // store.commit('SET_NAME', getCookie('userName'))
  //     store
  //       .dispatch('GenerateRoutes')
  //       .then(res => {
  //         // console.log(res)
  //         if (res == 1) {
  //           Message.error({
  //             message: '权限错误,请重新登录！'
  //           })
  //           next('/login')
  //         } else {
  //           router.addRoutes(res.routerData)
  //           next({
  //             ...to,
  //             replace: true
  //           })
  //         }
  //       })
  //       .catch(() => {
  //         next('/login')
  //       })
  //   } else {
  //     //正常页面跳转
  //     next()
  //   }
  // }


})

router.afterEach((to, from) => {
  NProgress.done() // finish progress bar
})
