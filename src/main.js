import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/mainstyle.scss'
import store from './stores'
import './permission' //路由判断
import common from './libs/common.js' //自定义包

import moment from 'moment'//导入文件
Vue.prototype.$moment = moment;//赋值使用
import animated from 'animate.css'

Vue.use(animated)

Vue.use(ElementUI);
Vue.use(common)

Vue.config.productionTip = false
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register('/sw-proxy.js')
//     .then(function(registration){
//       console.log("Service Worker registered with scope: ", registration.scope);
//     }).catch(function(err) {
//       console.log("Service Worker registered failed:", err);
//     });
// }





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
