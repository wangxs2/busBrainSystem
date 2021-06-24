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
      busPolyline: null,
      mapCenter: [121.460752,31.011182], // 默认地图中心点
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

   //线路重复系数公交线
   drawbusLine(BusArr,type) {
    if(this.busPolyline){
      this.map.remove(this.busPolyline)
     
    }
    let num=Math.round((BusArr.geom.length)/2)
    //线路重复系数公交线
    this.busPolyline = new AMap.Polyline({
      map: this.map,
      path: BusArr.geom,
      strokeColor: "#50C0FF",//线颜色
      strokeOpacity: 0.8,//线透明度
      isOutline: true,
      outlineColor: '#50C0FF',
      showDir: true,
      lineJoin :'round',
      lineCap :'round',
      cursor:'pointer',
      strokeWeight: 10//线宽
    });
    var marker = new AMap.Marker({ content: ' ', map: this.map });
    this.busPolyline.on('mouseover',  (e)=> {
      marker.setPosition(BusArr.geom[num]);
      marker.setLabel({ content: `<div style='box-shadow: 0px 0px 10px rgba(0, 49, 61, 0.8) inset;background:rgba(0, 49, 61, 0.6);border: 1px solid #00FFFF;padding:10px 16px;border-radius:8px;font-size:18px;color:#ffffff'>${type==1?"重复系数："+BusArr.coefficient:"线路长度："+BusArr.lineLength}</div>` })

    })
    this.busPolyline.on('mouseout',  (e)=> {
      marker.setLabel({ content: `` })
    })

    this.map.setFitView(this.busPolyline, true, [60, 200, 60, 60]);

  }



}