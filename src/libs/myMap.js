export default class Map {
    constructor(data) {
        Object.assign(this, this.data(data))
        this.mounted()
    }
    data(data) {
        return {
            el: data.el, // 地图容器
            mass:null,//海量点站点
            heatmap:null,//热力图
            infoWindow:null,//信息窗口
            polygonThree:null,//300
            polygonThree1:null,//500
            polygonThree2:null,//500
            pathSimplifierIns:null,
            overlayGroups:new AMap.OverlayGroup(),//站点300米和500米的集合
            overlayGroups1:new AMap.OverlayGroup(),//站点300米和500米的集合
            busLaneGroups:new AMap.OverlayGroup(),//公交专用道
            kyLinedata:null,
            kyLineOver:new AMap.OverlayGroup(),//客运走廊
            keyunLaneGroups:new AMap.OverlayGroup(),//客运走廊
            map: null, // 地图实例
            mapCenter: [121.460752,31.011182], // 默认地图中心点
            mapLayers: [[new AMap.TileLayer()], [new AMap.TileLayer.Satellite()]],// 图层类型 0标准图层 1卫星图层 , new AMap.TileLayer.RoadNet()
            trafficLayer:null,//道路网
            colors:{
              '1-4':"#34b000",
              '4-6':"#FECB00",
              '6-8':"#FF2A2A",
              '8+':"#B10400",
            },
            // linePaths:[
            //   {
            //     name:'45',
            //     path:[[121.490051, 31.144892],[121.498367, 31.146238]]
            //   },{
            //     name:'45',
            //     path:[[121.512024, 31.202855],[121.57309, 31.348091]]
            //   }
            // ]
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
       this.map.on("moveend", () => {
        
       })
      // let RoadNet= new AMap.TileLayer.RoadNet({
      //    map:this.map
      //  })
     
      this.trafficLayer = new AMap.TileLayer.Traffic({
            zIndex: 10,
            // autoRefresh:true,
        });
      this.map.plugin(["AMap.HeatMap"],  ()=> {      //加载热力图插件
        this.heatmap = new AMap.HeatMap(this.map, {
            opacity: [0, 0.8], 
            gradient: {
                0.5: '#3EFF8F',
                0.65: '#67E8FF',
                0.7: '#1CD1FF',
                0.9: '#FFEE0E',
                1.0: '#FF5E41'
            }
        }); 
      })   //在地图对象叠加热力图

      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$', 'lib/utils'], (PathSimplifier, $, utils)=> {
        if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }

        let color
        this.pathSimplifierIns = new PathSimplifier({
          zIndex: 200,
          map: this.map, //所属的地图实例
          getPath: function (pathData, pathIndex) {
              return pathData.path;
          },
          getHoverTitle: function (pathData, pathIndex, pointIndex) {
             
          },
          renderOptions: {
              pathLineStyle: {
                  dirArrowStyle: true
              },
              getPathStyle:  (pathItem, zoom)=> {
                color = this.colors[pathItem.pathData.name];
                  return {
                      pathLineStyle: {
                          strokeStyle: color,
                          borderWidth: 0,
                          lineWidth: 3
                      },
                      pathLineSelectedStyle: {
                          lineWidth: 0,
                          borderWidth: 0,
                          strokeStyle: null
                      },
                      pathNavigatorStyle: {
                          fillStyle: color
                      },
                      startPointStyle: {
                          radius: 0,
                          fillStyle: '#109618',
                          lineWidth: 0,
                          strokeStyle: '#eeeeee'
                      },
                      endPointStyle: {
                          radius: 0,
                          fillStyle: '#dc3912',
                          lineWidth: 0,
                          strokeStyle: '#eeeeee'
                      },
                      keyPointHoverStyle: {
                          radius: 4,
                          fillStyle: 'rgba(0, 0, 0, 0)',
                          lineWidth: 0,
                          strokeStyle: '#ffa500'
                      },
                      pathLineHoverStyle: {
                          lineWidth: 0,
                          strokeStyle: 'rgba(204, 63, 88,1)',
                          borderWidth: 0,
                          borderStyle: '#00000000',
                          dirArrowStyle: false
                      }
                  };
              }
          }
      });

      window.pathSimplifierIns = this.pathSimplifierIns;
      // this.pathSimplifierIns.setData(this.linePaths);

      //initRoutesContainer(d);
      function onload() {
          this.pathSimplifierIns.renderLater();
      }

      function onerror(e) {
      }
  });

      this.infoWindow = new AMap.InfoWindow({
          isCustom: true,  //使用自定义窗体
          content: this.createInfoWindow(),
          offset: new AMap.Pixel(0, -35)
      });
      this.trafficLayer.setMap(this.map);
      this.isTraffic(true)
      this.map.add(this.overlayGroups);
      this.map.add(this.overlayGroups1);

  }
  //设置信息窗口的内容
  createInfoWindow(name,data){
    let content=`
      <div class="myinfobox">
        <div class="titfont">
          <div class="infoimg"></div>
          ${name}
        </div>
        <div class="line-lsi">
          <div class="tithear">线路:</div>
          <div style="flex:1">${data}</div>
          
         </div>
      </div>
    `

    return content

  }
  //查询站点
  searchStation(data,position){

    var station = new AMap.StationSearch({
        pageIndex: 1, //页码
        pageSize: 60, //单页显示结果条数
        city: '上海'   //确定搜索城市
    });
    station.search(data, (status, result)=> {
        if (status === 'complete' && result.info === 'OK') {
          let startr='',arg=[]
            
            result.stationInfo[0].buslines.forEach(iteam=>{
              arg.push(iteam.name.split('(')[0])
            })
            
            startr=arg.join(',')
            this.infoWindow.setContent(this.createInfoWindow(data,startr))
            setTimeout(()=>{
              this.infoWindow.open(this.map,position);
            },200)
            
        } else {
            
        }
    });

  }
  setHeatemap(val){
    this.heatmap.setDataSet({
      data: val,
      max: 100
  });
  }
  addPolygon(data) {
    this.polygonThree = new AMap.Polygon({
      path: data,
      fillColor: '#144D95',
      strokeOpacity: 1,
      fillOpacity: 0.5,
      strokeWeight: 0,
       zIndex: 200,
    });
    this.map.add(this.polygonThree);
  }
  addPolygon1(data) {
    this.polygonThree1 = new AMap.Polygon({
      path: data,
      fillColor: '#144D95',
      strokeOpacity: 1,
      fillOpacity: 0.5,
      strokeWeight: 0,
       zIndex: 200,
    });
    this.map.add(this.polygonThree1);
  }

  addPolygon2(data) {
    if(this.polygonThree2){
      this.map.remove(this.polygonThree2)
    }
    this.polygonThree2= new AMap.Polygon({
      path: data,
      fillColor: '#144D95',
      strokeOpacity: 1,
      fillOpacity: 0.5,
      strokeWeight: 0,
       zIndex: 200,
    });
    this.map.add(this.polygonThree2);
  }

  //公交专用道
  busLane(){

  }
//客运走廊
  passCorrline(data){
    let lines=[]
    data.forEach(iteam=>{
      let kyLinedata = new AMap.Polyline({
        path: iteam.lonlat1,
        strokeColor: "#35A594",
        strokeOpacity: 1,
        strokeWeight: 8,
        strokeStyle: "solid",
      })
      lines.push(kyLinedata)
      this.map.add(kyLinedata);

    })
    return lines
  }
//测试
  passCorrline1(data){
    data.forEach(iteam=>{
      let kyLinedata = new AMap.Polyline({
        path: iteam,
        strokeColor: "#35A594",
        strokeOpacity: 1,
        strokeWeight: 8,
        strokeStyle: "solid",
      })
      this.map.add(kyLinedata);

    })
  
  }
  //客运走廊的公交站点内
  addGjMarker(data,type) {
    let markers=[]
    data.forEach(iteam=>{
      let marker = new AMap.Marker({
        icon:new AMap.Icon({
          image:type==1?require('../assets/image/icon_dt1.png'):require('../assets/image/icon_gj1.png'),
          size:new AMap.Size(32,32),
          imageSize:new AMap.Size(32,32)
       }),
          position: [type==1?iteam.lon:iteam.longitude,type==1?iteam.lat:iteam.latitude],
          offset: new AMap.Pixel(-13, -30)
      });
      marker.setMap(this.map);
      marker.on('click',  ()=> {
          this.searchStation(iteam.stationName,marker.getPosition()) 
          
          
          
      });
      markers.push(marker)
    })
    return markers
  }
  //判断距离的
  juradius(lnglat,lnglat1){
    let marker = new AMap.Marker({
      icon:new AMap.Icon({
        image:'',
     }),
        position: lnglat,
    });

    let marker1 = new AMap.Marker({
      icon:new AMap.Icon({
        image:'',
     }),
        position: lnglat1,
    });

    var p1 = marker.getPosition();
    var p2 = marker1.getPosition();

    var distance = Math.round(p1.distance(p2));
    return distance

  }

  // 显示/隐藏 道路网
   isTraffic(flag) {
    flag ? this.trafficLayer.show() : this.trafficLayer.hide()
  }

  // 显示/隐藏 站点
  isMass(flag) {
    flag ? this.mass.show() : this.mass.hide()
  }
   //渲染站点
  pointAll3(datapoint,type){
    var style = [
      {
        url: require('../assets/image/alpoint1.png'),
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(11, 11),
        zIndex: 3,
      }];
    this.mass = new AMap.MassMarks(datapoint, {
        opacity: 0.8,
        zIndex: 60,
        cursor: 'pointer',
        style: style[0]
    });
    var marker = new AMap.Marker({content: ' ', map: this.map});
    this.mass.on('mouseover',  (e)=> {
        marker.setPosition(e.data.lnglat);
        marker.setLabel({content: `<div style='color:rgba(26, 66, 118, 1)'>${e.data.stationName}</div>`})
    });
    this.mass.on('mouseout',  (e)=> {
        marker.setPosition(e.data.lnglat);
        marker.setLabel({content:null})
    });
    this.mass.setMap(this.map);
  }
  //300mi 范围集合
  addOverlayGroup(Groups){
    this.overlayGroups.addOverlay(Groups)
  }
  //500mi
  addOverlayGroup1(Groups){
    this.overlayGroups1.addOverlay(Groups)
  }
  //公交专用道
  addOverlayGroup2(Groups){
    this.busLaneGroups.addOverlays(Groups)
  }
   //客运走廊的点
  addOverlayGroup3(Groups){
    this.keyunLaneGroups.addOverlays(Groups)
  }
    //客运走廊的线
    addOverlayGroup4(Groups){
      this.kyLineOver.addOverlays(Groups)
    }
  



  //公交专用道
  polylineBus(){
   let polyAll=[]
    data.forEach(iteam=>{
      if(iteam.longitude){
        var polyline = new AMap.Polyline({
          path: path,
          strokeColor: "#BE7322",
          strokeOpacity: 1,
          strokeWeight: 6,
          strokeStyle: "solid",
          zIndex: 10,
        })
        polyAll.push(polyline)
      }
     
    })
    return polyAll
  }

  
  //300米的圆
  threeCircle(data,radius){
    let circleAll=[]
    data.forEach(iteam=>{
      if(iteam.longitude!=0&&iteam.latitude!=0&&iteam.longitude!=iteam.latitude){
        var circle = new AMap.Circle({
            center: [iteam.longitude,iteam.latitude],
            radius: radius, //半径
            borderWeight: 1,
            strokeColor: "", 
            strokeOpacity: 1,
            strokeWeight: 1,
            map:this.map,
            strokeOpacity: 0.1,
            fillOpacity: 0.5,
            // 线样式还支持 'dashed'
            fillColor: 'rgba(23,145,252,0.1)',
            zIndex: 10,
        })
        circleAll.push(circle)
        
      }
     
    })
    return circleAll

    // let polygon = new AMap.Polygon({
    //   path: data,
    //   fillColor: '#144D95',
    //   strokeOpacity: 1,
    //   fillOpacity: 0.5,
    //   strokeColor: '#144D95',
    //   strokeWeight: 1,
    // });
    // return polygon




  }


}