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
      markers:[],
      linesearch: null,
      busPolyline: null,
      busPolyline1: null,
      massall: null,
      polyEditor:null,
      polygonLine: null,
      infoWindow: null,//信息窗口
      overlayGroups: new AMap.OverlayGroup(),//调整方案站点集合

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
      this.map.remove(this.busPolyline1)
    }
    if(this.markers){
      this.overlayGroups.removeOverlays(this.markers)
    }
    if(this.polyEditor){
      this.polyEditor.close();
    }
    
    this.lineSearch(BusArr.routeName)
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

    //渲染站点
  pointAll3(datapoint){
      if(this.massall){
        this.massall.clear()
      }
      let style = [
        {
          url: require('../../assets/image/alpoint1.png'),
          anchor: new AMap.Pixel(6, 6),
          size: new AMap.Size(11, 11),
          zIndex: 20,
        }];
      this.massall = new AMap.MassMarks(datapoint, {
          opacity: 0.8,
          cursor: 'pointer',
          style: style[0]
      });
      this.massall.setMap(this.map);
      let marker = new AMap.Marker({content: ' ', map: this.map});
      this.massall.on('mouseover',  (e)=> {
          marker.setPosition(e.data.lnglat);
          marker.setLabel({content: `<div style='color:rgba(26, 66, 118, 1)'>${e.data.stationName}</div>`})
      });
      this.massall.on('mouseout',  (e)=> {
          marker.setPosition(e.data.lnglat);
          marker.setLabel({content:null})
      });
      
  }


  lineSearch(busLineName){

    let  linesearch = new AMap.LineSearch({
        pageIndex: 1,
        city: '上海',
        pageSize: 1,
        extensions: 'all'
    });

    linesearch.search(busLineName, (status, result)=> {
      if (status === 'complete' && result.info === 'OK') {
          this.lineSearch_Callback(result);
      } else {
        
      }
    });

  }


  lineSearch_Callback(data) {
    var lineArr = data.lineInfo;
    var lineNum = data.lineInfo.length;
    if (lineNum == 0) {
    } else {
      
      let datas = data.lineInfo[0].via_stops
      this.markers = []
      datas.forEach(iteam => {
        var marker = new AMap.Marker({
          position: iteam.location,
          icon:new AMap.Icon({
            image:require('../../assets/image/orange1.png'),
            size: [32,32],
            imageSize : [32,32],
           }),
          offset: new AMap.Pixel(-16, -16),
          extData:iteam,
          cursor: 'pointer',
        })
        let marker1 = new AMap.Marker({content: ' ', map: this.map,offset: new AMap.Pixel(0, -20) });
        marker.on('mouseover',  (e)=> {
          marker1.setPosition(e.target.getPosition());
          marker1.setLabel({content: `<div style='color:rgba(26, 66, 118, 1)'>${e.target.getExtData().name}</div>`})
        });
        marker.on('mouseout',  (e)=> {
          marker1.setPosition(e.target.getPosition());
          marker1.setLabel({content:null})
        });
        this.markers.push(marker)
      })
      this.overlayGroups.addOverlays(this.markers)
      this.map.add(this.overlayGroups);
      
    }
  }








}