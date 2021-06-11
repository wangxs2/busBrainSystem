const getters = {
  docHeight: state => state.app.docHeight,
  isBreak: state => state.user.isBreak,
  menuFlag: state => state.app.menuFlag,
  userId: state => state.user.userId,
  realname: state => state.user.realname,
  ishuadata: state => state.user.ishuadata,
  roleCode: state => state.user.roleCode,
  roleId: state => state.user.roleId,
  userInfo: state => state.user.userInfo,
  userName: state => state.user.userName,
  userRole: state => state.user.userRole,
  routerNow: state => state.user.routerNow,
  userStation: state => state.user.userStation,
  aloading: state => state.user.aloading,
  isbtn: state => state.user.isbtn,
  heatData: state => state.user.heatData,
  threeMap: state => state.user.threeMap,
  threeMap1: state => state.user.threeMap1,
  threeMap2: state => state.user.threeMap2,
  btnAuth: state => state.user.btnAuth,
  menuData: state => state.permission.menuData,
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  token: state => state.user.token,
  keyunData: state => state.user.keyunData,
  keyunData1: state => state.user.keyunData1,
  keyunData2: state => state.user.keyunData2,
  constructionCode: state => state.user.constructionCode,
  constructionName: state => state.user.constructionName,
  allStation: state => state.user.allStation,
  dataArrLine: state => state.user.dataArrLine,
  stationHeat: state => state.user.stationHeat,
}
export default getters