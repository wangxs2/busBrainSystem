const app = {
  state: {
    docHeight: $(document).height() - 180, //文档高度
    menuFlag: false, //左侧菜单的开关
    
  },
  mutations: {
    SET_FLAG: (state) => { //菜单收缩
      state.menuFlag = !state.menuFlag
    },
    SET_HEIGHT: (state, docHeight) => { //文档高度
      state.docHeight = docHeight
    }
  }
}
export default app
