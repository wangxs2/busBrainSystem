import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const stores = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
})

// 自适应计算
function countratio(w) {
  let whdef = 100 / 1920;
  let rem = w * whdef;
  $('html').css('font-size', rem + "px");
}

countratio($(document).width())

window.addEventListener("resize", () => { //设置高度
  stores.commit('SET_HEIGHT', $(document).height() - 180)
  countratio($(document).width())
})

export default stores
