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
      busPolyline: null,
      busPolyline1: null,
      polyEditor:null,
      polygonLine: null,
      infoWindow: null,//信息窗口
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

  //线路调整
  drawbusLine(BusArr, type) {
    if (this.busPolyline) {
      this.map.remove(this.busPolyline)
    }
    if (this.busPolyline1) {
      this.map.remove(this.busPolyline)
    }
    let num = Math.round((BusArr.geom.length) / 2)
    //线路调整
    this.busPolyline = new AMap.Polyline({
      map: this.map,
      path: BusArr.geom,
      strokeColor: "#00FFFF",//线颜色
      strokeOpacity: 0.8,//线透明度
      isOutline: true,
      outlineColor: '#50C0FF',
      showDir: true,
      lineJoin: 'round',
      lineCap: 'round',
      zIndex:12,
      cursor: 'pointer',
      strokeWeight: 10//线宽
    });
    this.busPolyline1 = new AMap.Polyline({
      map: this.map,
      path: BusArr.geom,
      strokeColor: "#A200FF",//线颜色
      strokeOpacity: 1,//线透明度
      showDir: true,
      lineJoin: 'round',
      lineCap: 'round',
      cursor: 'pointer',
      zIndex:10,
      strokeWeight: 10//线宽
    });
    this.map.setFitView(this.busPolyline, true, [60, 200, 60, 60]);
    this.polyEditor = new AMap.PolylineEditor(this.map, this.busPolyline1,{
    });
    this.polyEditor.setTarget(this.busPolyline1);
    this.polyEditor.open();
  }
  closepoly(){
    
    this.polyEditor.close();
    
  }



}