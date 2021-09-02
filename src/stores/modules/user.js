import {
  fetchPost
} from "@/libs/http"
const user = {
  state: {
    userId: "",
    aloading:false,
    roleId: "",
    userName: '',
    token: '',
    routerNow: "",
    userInfo: "",
    roleCode: "",
    realname:'',
    heatData:[],
    userRole: [],
    codeMeau:'',//菜单的CODE
    routehistroy: [], //用户路由记录
    btnAuth: '', //按钮权限
    isBreak: "",//是否刷新页面
    constructionCode: '', // 项目code
    constructionName: '',
    isbtn:1,
  
  },
  mutations: {
    
    SET_CODEMEAU:(state, codeMeau) => { //菜单的CODE
      state.codeMeau = codeMeau
    },
    SET_REGIONDATA:(state, regionData) => { //区域客流
      state.regionData = regionData
    },
   
    SET_ARRLINE:(state, dataArrLine) => { //公交线网
      state.dataArrLine = dataArrLine
    },
    SET_BTNAUTH: (state, isbtn) => { //子路由的传值300米
      state.isbtn = isbtn
    },
 
    
    SET_HEATMAP: (state, heatData) => { //储存热力图的值
      state.heatData = heatData
    },
    SET_LOADING: (state, aloading) => { //按钮权限
      state.aloading = aloading
    },
    SET_REALNAME: (state, realname) => { //按钮权限
      state.realname = realname
    },
    SET_USERINFO: (state, userInfo) => { //按钮权限
      state.userInfo = userInfo
    },
    SET_ISBREAK: (state, isBreak) => { //按钮权限
      state.isBreak = isBreak
    },
    SET_TOKEN: (state, token) => { //token
      state.token = token
    },
    SET_ID: (state, userId) => { //用户ID
      state.userId = userId
    },
    SET_ROLEID: (state, roleId) => { //用户ID
      state.roleId = roleId
    },
    SET_ROLECODE: (state, roleCode) => { //用户ID
      state.roleCode = roleCode
    },
    SET_NAME: (state, userName) => { //用户名
      state.userName = userName
    },
    SET_ROLES: (state, userRole) => { //用户路由记录
      state.userRole = userRole
    },
    SET_ROUTEHISTROY: (state, routehistroy) => { //用户路由记录
      state.routehistroy = routehistroy
    },
  
    SET_ROUTERNOW: (state, routerNow) => { //用户组织
      state.routerNow = routerNow
    },
    SET_CONSTRUCTIONCODE: (state, constructionCode) => { //项目code
      state.constructionCode = constructionCode
    },
    SET_CONSTRUCTIONNAME: (state, constructionName) => { //项目name
      state.constructionName = constructionName
    },

  },
  actions: {
    // GetUserInfo({ //获取用户信息
    //   commit,
    //   state
    // }) {
    //   return new Promise((resolve, reject) => {
    //     let b = new base64();
    //     let username = name;
    //     let password = pass;
    //     password = password ? password : '';
    //     fetchPost("login", {
    //       username: username,
    //       password: b.encode(password + '#THT#')
    //     }).then(res => {
    //       commit('SET_BTNAUTH', res.info.auth);
    //       resolve(true);
    //     })
    //   })
    // },
  }
}
export default user
