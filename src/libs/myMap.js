export default class Map {
    constructor(data) {
        Object.assign(this, this.data(data))
        this.mounted()
    }
    data(data) {
        return {
            el: data.el, // 地图容器
            map: null, // 地图实例
            mapCenter: [121.460752,31.011182], // 默认地图中心点
            mapLayers: [[new AMap.TileLayer()], [new AMap.TileLayer.Satellite()]],// 图层类型 0标准图层 1卫星图层 , new AMap.TileLayer.RoadNet()
            trafficLayer:null,//道路网
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
        resizeEnable: true, //监控地图容器尺寸变化
        mapStyle:'amap://styles/d67717253a691e523956e9482ca38f1e',
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
      })


      this.trafficLayer = new AMap.TileLayer.Traffic({
            zIndex: 10,
            autoRefresh:true,
        });
      this.trafficLayer.setMap(this.map);
      this.isTraffic(true)

  }


  // 显示/隐藏 道路网
   isTraffic(flag) {
    flag ? this.trafficLayer.show() : this.trafficLayer.hide()
  }



}