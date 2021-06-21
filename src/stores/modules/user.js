import {
  fetchPost
} from "@/libs/http"
const user = {
  state: {
    userId: "",
    aloading:true,
    roleId: "",
    userName: '',
    ishuadata:2,//从项目材料回来是否刷新
    token: '',
    routerNow: "",
    userInfo: "",
    roleCode: "",
    realname:'',
    heatData:[],
    userRole: [],
    codeMeau:'',//菜单的CODE
    routehistroy: [], //用户路由记录
    userStation: [], //站点的信息
    threeMap:[],//300米
    threeMap1:[],//300米
    threeMap2:[],//300米
    btnAuth: '', //按钮权限
    isBreak: "",//是否刷新页面
    keyunData:[],//客运走廊的数据
    keyunData1:[],//客运走廊的数据
    keyunData2:[],//客运走廊的数据
    constructionCode: '', // 项目code
    constructionName: '',
    isbtn:1,
    allStation:{},//站点客流
    dataArrLine:[],
    stationHeat:[],//站点客流的热力图
    regionData:[],//区域客流
  
  },
  mutations: {
    SET_KLSTATION:(state, allStation) => { //站点客流
      state.allStation = allStation
    },
    SET_CODEMEAU:(state, codeMeau) => { //菜单的CODE
      state.codeMeau = codeMeau
    },
    SET_REGIONDATA:(state, regionData) => { //区域客流
      state.regionData = regionData
    },
    SET_HEATSTATION:(state, stationHeat) => { //站点客流热力图
      state.stationHeat = stationHeat
    },
    SET_ARRLINE:(state, dataArrLine) => { //公交线网
      state.dataArrLine = dataArrLine
    },
    SET_BTNAUTH: (state, isbtn) => { //子路由的传值300米
      state.isbtn = isbtn
    },
     SET_THREEMAP: (state, threeMap) => { //300米
      state.threeMap = threeMap
    },
    SET_THREEMAP1: (state, threeMap1) => { //500米
      state.threeMap1 = threeMap1
    },
    SET_THREEMAP2: (state, threeMap2) => { //500米
      state.threeMap2 = threeMap2
    },
     SET_KEYUNDATA: (state, keyunData) => { //客运走廊
      state.keyunData = keyunData
    },
    SET_KEYUNDATA1: (state, keyunData1) => { //客运走廊
      state.keyunData1 = keyunData1
    },
    SET_KEYUNDATA2: (state, keyunData2) => { //客运走廊线
      state.keyunData2 = keyunData2
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
    SET_STATION: (state, userStation) => {
      state.userStation = userStation
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
