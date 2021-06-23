import * as http from '../../libs/http'
export default class Map {
  constructor(data) {
    Object.assign(this, this.data(data))
    this.mounted()
  }
  data(data) {
    return {
      el: data.el, // 地图容器
      datar: {},
      linesearch: null,
      polygonLine: null,
      infoWindow:null,//信息窗口
      overlayGroups: new AMap.OverlayGroup(),//区域客流站点集合
    
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
      mapStyle: 'amap://styles/d67717253a691e523956e9482ca38f1e',
      expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
    })
    
    this.map.add(this.overlayGroups);
    this.infoWindow = new AMap.InfoWindow({
      isCustom: true,  //使用自定义窗体
      content: '',
      offset: new AMap.Pixel(0, -35)
    });


  }



}