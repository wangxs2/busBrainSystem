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
      massall: null,
      infoWindow:null,//信息窗口
      mapCenter:[121.529169,31.228813],
      carSearch:{
        leftlon:120.626846,
        rightlon:122.348953,
        leftlat:31.529928,
        rightlat:30.967558,
        zoom:16,
      },
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
      offset: new AMap.Pixel(0, -22)
    });
    
    this.map.on('moveend',(e)=>{
      this.carSearch.leftlon=e.target.getBounds().southWest.lng
      this.carSearch.rightlon=e.target.getBounds().northEast.lng
      this.carSearch.leftlat=e.target.getBounds().northEast.lat
      this.carSearch.rightlat=e.target.getBounds().southWest.lat
      this.carSearch.zoom=Math.round(e.target.getZoom())
      this.setCarData1()
      
    })


  }

  setCarData(){
    this.setCarData1()
    // http.fetchGet('gps/list',this.carSearch).then(res=>{
    // })
  }
  setCarData1(){
    http.fetchGet('gps/list',this.carSearch).then(res=>{
      if(res.result){
        res.result.forEach(iteam=>{
          if(iteam.lng){
            iteam.lnglat=[iteam.lng,iteam.lat]
          }
        })
        this.pointAll3(res.result)
      }
      
    })
  }


     //车辆运行可视化
     pointAll3(datapoint){
      if(this.massall){
        this.massall.clear()
      }
      let style = [
        {
          url: require('../../assets/image/icon_gj1.png'),
          anchor: new AMap.Pixel(16, 16),
          size: new AMap.Size(32, 32),
          zIndex: 20,
        }];
      this.massall = new AMap.MassMarks(datapoint, {
          opacity: 1,
          cursor: 'pointer',
          style: style[0]
      });
      this.massall.setMap(this.map);
      let marker = new AMap.Marker({content: ' ', map: this.map});
      this.massall.on('click',  (e)=> {
          this.infoWindow.setContent(this.createInfoWindow(1,e.data))
          this.infoWindow.open(this.map,[e.data.lng,e.data.lat]);
          this.map.setZoomAndCenter(20,[e.data.lng,e.data.lat]);
      });
      this.massall.on('mouseout',  (e)=> {
        this.infoWindow.close()
      });
      
    }

    //设置信息窗口的内容
  createInfoWindow(type,data){
    let content=''
    if(type==1){
      content=`
      <div class="myinfobox1">
       
        <div class="line-lsi">
          <div class="tithear">车辆编号:</div>
          <div style="flex:1;text-align:right">${data.routeName}</div>
        </div>
        <div class="line-lsi">
          <div class="tithear">车牌号码:</div>
          <div style="flex:1;text-align:right">${data.plateNum}</div>
        </div>
        <div class="line-lsi">
          <div class="tithear">站点名称:</div>
          <div style="flex:1;text-align:right">${data.stationName}</div>
        </div>
        <div class="line-lsi">
          <div class="tithear">线路名称:</div>
          <div style="flex:1;text-align:right">${data.routeName}</div>
        </div>
        <div class="line-lsi">
          <div class="tithear">开往方向:</div>
          <div style="flex:1;text-align:right">${data.routeDirection}</div>
        </div>
        <div class="line-lsi">
          <div class="tithear">更新时间:</div>
          <div style="flex:1;text-align:right">${data.updateTime}</div>
        </div>
      </div>
    `

    }else if(type==2){
      content=`
      <div class="myinfobox">
        <div class="titfont">
          <div class="infoimg"></div>
          ${name.stationName}
        </div>
        <div class="line-lsi1">
          <div class="itean-lsi">经度:${name.lnglat[0]}</div>
          <div class="">维度:${name.lnglat[1]}</div>
         
          
         </div>
      </div>
    `
    }else{
      return
    }

    return content

  }



}