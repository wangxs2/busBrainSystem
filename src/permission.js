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

function quc(arrays){
  var result = [];

  var obj = {};

  for(var i =0; i<arrays.length; i++){

      if(!obj[arrays[i].name]){

        result.push(arrays[i]);

        obj[arrays[i].name] = true;

      }

  }
  return result
}

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
 
  




  console.log('我在promise456')
  store.commit('SET_LOADING',true)
  let arour=[]
  let routenow = to.matched.slice(2)[0]
  // store.commit('SET_ROLES', [])
  if (to.path === '/login') {
    next()
    return
  }
  if (to.path === '/home') {
    next()
    return
  }
  if (to.path !== '/login' && !getCookie('user')) {
    next('/login')
    return
  } else {
    store.commit('SET_CODEMEAU', getCookie('meaucode'))
    console.log(store.getters.routehistroy)
    if(store.getters.userRole[0]==undefined){
      store.commit('SET_ROUTEHISTROY',[])
    }
    if (store.getters.userRole.length == 0) {
      store.getters.routehistroy.push(to.matched[2])
    }else if(to.matched[2]==undefined){
      return
    }else{
      store.getters.routehistroy.push(to.matched[2])
    }
    if (store.getters.userId !== getCookie('user') + '') {
      //判断是否拉取用户信息 权限

      store.commit('SET_ID', getCookie('user'))
      // store.commit('SET_NAME', getCookie('userName'))
      store
        .dispatch('GenerateRoutes')
        .then(res => {
          // console.log(res)
          if (res == 1) {
            Message.error({
              message: '权限错误,请重新登录！'
            })
            next('/login')
          } else {
            router.addRoutes(res.routerData)
            next({
              ...to,
              replace: true
            })
          }
        })
        .catch(() => {
          next('/login')
        })
    } else {
      //正常页面跳转
      next()
    }
  }


})

router.afterEach((to, from) => {
  NProgress.done() // finish progress bar
})
