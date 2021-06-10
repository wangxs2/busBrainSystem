export default class Map {
    constructor(data) {
        Object.assign(this, this.data(data))
        this.mounted()
    }
    data(data) {
        return {
            el: data.el, // 地图容器
            datar:{},
            linesearch:null
        }
    }
      // 方法调用
  mounted() {
    this.initMap()
  }
  initMap() {
    this.map = new AMap.Map(this.el, {
        zoom: 10, // 地图级别
        center: this.mapCenter, // 中心点
        // resizeEnable: true, //监控地图容器尺寸变化
        mapStyle:'amap://styles/d67717253a691e523956e9482ca38f1e',
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
      })
      this.linesearch = new AMap.LineSearch({
        pageIndex: 1,
        city: '上海',
        pageSize: 1,
        extensions: 'all'
    });

  }

//   lineSearch(busLineName,callback) {
//     //实例化公交线路查询类，只取回一条路线
       
//     //搜索“536”相关公交线路
//     // linesearch.search(busLineName, (status, result)=> {
//     //     if (status === 'complete' && result.info === 'OK') {
//     //       callback
//     //     } else {
//     //     }
//     // });
// }
  


}