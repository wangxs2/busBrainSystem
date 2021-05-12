import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/mainstyle.scss'
import store from './stores'
import './permission' //路由判断
import common from './libs/common.js' //自定义包
Vue.use(ElementUI);
Vue.use(common)

Vue.config.productionTip = false

Vue.prototype.ZURL = 'http://localhost:8004'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
