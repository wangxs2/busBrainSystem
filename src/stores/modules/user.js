import {
  fetchPost
} from "@/libs/http"
const user = {
  state: {
    userId: "",
    roleId: "",
    userName: '',
    ishuadata:2,//从项目材料回来是否刷新
    token: '',
    routerNow: "",
    userInfo: "",
    roleCode: "",
    realname:'',
    userRole: [], //用户角色
    userOrg: [], //用户组织
    btnAuth: '', //按钮权限
    isBreak: "",//是否刷新页面
    constructionCode: '', // 项目code
    constructionName: ''
  },
  mutations: {
    SET_BTNAUTH: (state, btnAuth) => { //按钮权限
      state.btnAuth = btnAuth
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
    SET_ROLES: (state, userRole) => { //用户角色
      state.userRole = userRole
    },
    SET_ORG: (state, userOrg) => { //用户组织
      state.userOrg = userOrg
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
