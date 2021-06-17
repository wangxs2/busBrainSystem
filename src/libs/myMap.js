import * as http from './http'
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
            polygonLine:null,//行政区域的范围
            infoWindow:null,//信息窗口
            polygonThree:null,//300
            polygonThree1:null,//500
            polygonThree2:null,//500
            pathSimplifierIns:null,
            overlayGroups:new AMap.OverlayGroup(),//站点300米和500米的集合
            overlayGroups1:new AMap.OverlayGroup(),//站点300米和500米的集合
            busLaneGroups:new AMap.OverlayGroup(),//公交专用道
            kyLinedata:null,
            layerky:null,//客运走廊的点
            kyLineOver:new AMap.OverlayGroup(),//客运走廊的线
            map: null, // 地图实例
            mapCenter: [121.460752,31.011182], // 默认地图中心点
            mapLayers: [[new AMap.TileLayer()], [new AMap.TileLayer.Satellite()]],// 图层类型 0标准图层 1卫星图层 , new AMap.TileLayer.RoadNet()
            trafficLayer:null,//道路网
            colors:{
              '1-2':"#34b000",
              '2-4':"#FECB00",
              '4-6':"#FF2A2A",
              '6+':"#B10400",
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
      this.layerky = new AMap.LabelsLayer({
            zooms: [3, 20],
            zIndex: 1000,
            collision: false
        });
        // 将图层添加到地图
      this.map.add(this.layerky);
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

      // window.pathSimplifierIns = this.pathSimplifierIns;
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
      // this.map.add(this.overlayGroups);
      // this.map.add(this.overlayGroups1);

  }
  //is显示公交线网
  ispathSimp(){
    
    this.pathSimplifierIns.hide()
  }
  //设置信息窗口的内容
  createInfoWindow(type,name,data){
    let content=''
    if(type==1){
      content=`
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
    }

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
            
            startr=arg.join('、')
            this.infoWindow.setContent(this.createInfoWindow(1,data,startr))
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
    console.log(data)
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
        zIndex:20,
        strokeStyle: "solid",
      })
      kyLinedata.on('click',(e)=>{
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
  addGjMarker(data) {
    let markers = [];
    data.forEach(iteam=>{

      var curPosition = iteam.lnglat;
      var curData = {
          position: curPosition,
          icon: {
            type: 'image',
            image: iteam.type=="mmap"?require('../assets/image/icon_dt1.png'):require('../assets/image/icon_gj1.png'),
            size: [32,32],
             imageSize:new AMap.Size(32,32),
            anchor: 'bottom-center',
          }
      };
      var labelMarker = new AMap.LabelMarker(curData);

      markers.push(labelMarker);

      labelMarker.on('click', (e) => {
        this.searchStation(iteam.stationName,curPosition) 
      });

    })
    this.layerky.add(markers);

   
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
    if(this.mass){
      this.mass.clear()
    }
    var style = [
      {
        url: require('../assets/image/alpoint1.png'),
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(11, 11),
        zIndex: 20,
      }];
    this.mass = new AMap.MassMarks(datapoint, {
        opacity: 0.8,
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
    this.mass.on('click',  (e)=> {
      http.fetchGet('indicator/stationDetail',{
        code:e.data.stationName,
        direction:e.data.routeDirection
      }).then(res=>{
        this.infoWindow.setContent(this.createInfoWindow(2,res.result))
        this.infoWindow.open(this.map,[e.data.longitude,e.data.latitude]);
        this.map.getFitZoomAndCenterByBounds([e.data.longitude,e.data.latitude],[150, 60, 100, 60])
      })
  });
    this.mass.setMap(this.map);
  }
  //行政区域的范围
  createPolygon(path) {
    // let isColor = row.regionBerths - row.sumBicycle
    if(this.polygonLine){
      this.map.remove(this.polygonLine)
    }
    this.polygonLine = new AMap.Polygon({
      path: this.setTypedata(path),
      cursor: "pointer",
      strokeColor: "#35A594",
      strokeWeight: 2,
      bubble :true,
      strokeOpacity: 1,
      strokeStyle :'dashed',
      fillOpacity:0.1,
      zIndex: 10,
    });
    this.map.add(this.polygonLine);
    this.map.setFitView(this.polygonLine)
  }
  setTypedata(row){
    let str = row.polygonGeom.replace("POLYGON((", "");
    let str1 = str.replace("))", "");
    let arr = str1.split(",");
    let path=[]
    arr.forEach(iteam => {
      path.push(
        new AMap.LngLat(iteam.split(" ")[0], iteam.split(" ")[1])
      );
    });
    return path
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

  setRadius(num){
    if(this.overlayGroups.getOverlays().length>0){
      this.overlayGroups.getOverlays().forEach(iteam=>{
        iteam.forEach(itam=>{
          itam.setRadius(num)
        })
        
      })
    }

  }
  //300米的圆
  threeCircle(data,radius){
    if(this.overlayGroups){
      this.overlayGroups.getOverlays().forEach(iy=>{
        this.map.remove(iy)
      })
    }
    let circleAll=[]
    data.forEach(iteam=>{
      if(iteam.longitude!=0&&iteam.latitude!=0&&iteam.longitude!=iteam.latitude){
        var circle = new AMap.Circle({
            center: [iteam.longitude,iteam.latitude],
            radius: radius, //半径
            borderWeight: 0,
            strokeColor: "", 
            strokeOpacity: 1,
            strokeWeight: 1,
            map:this.map,
            strokeOpacity: 0.1,
            fillOpacity:1,
            // 线样式还支持 'dashed'
            fillColor: '#1A4276',
            zIndex: 10,
        })
        this.map.add(circle);
        circleAll.push(circle)
        
      }
     
    })
    return circleAll
  }


}