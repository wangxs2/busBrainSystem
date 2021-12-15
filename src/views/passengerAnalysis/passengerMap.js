import * as http from '../../libs/http'
import moment from 'moment'//导入文件
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
      locakl:null,//客流的海量点
      polygonLine: null,
      mapCenter: [121.460752,31.011182], // 默认地图中心点
      infoWindow:null,//信息窗口
      ijsa:{
        sp:4,
        sd:4,
        route:'45,12',
        lnglat:[1,1]
      },
      overlayGroups: new AMap.OverlayGroup(),//区域客流站点集合
      overlayGroups1: new AMap.OverlayGroup(),//线路客流站点集合
      zdklMapOption: { // 站点客流 - 地图覆盖物参数
        mass: {}, // 海量点数据
        heat: '', // 热力图数据
        heatMaxCount: 10000, // 热力图密度最大值
      }
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
      viewMode: '3D',
      // resizeEnable: true, //监控地图容器尺寸变化
      mapStyle: 'amap://styles/d67717253a691e523956e9482ca38f1e',
      expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
    })


    this.locakl = new Loca.Container({
        map: this.map,
    });
    this.M_zzploy()
    
    this.map.add(this.overlayGroups);
    this.infoWindow = new AMap.InfoWindow({
      isCustom: true,  //使用自定义窗体
      content: this.createInfoWindow(this.ijsa),
      offset: new AMap.Pixel(0, -35)
    });
    this.map.on('click',e=>{
      this.infoWindow.close()
    })
    this.infoWindow.open(this.mapCenter)
    console.log(this.infoWindow)
    // this.map.plugin(["AMap.HeatMap"], () => {      //加载热力图插件
    //   this.zdklMapOption.heat = new AMap.HeatMap(this.map, {
    //     opacity: [0, 0.8], zIndex: 110,
    //     gradient: {
    //       0.5: '#3EFF8F',
    //       0.65: '#67E8FF',
    //       0.7: '#1CD1FF',
    //       0.95: '#FFEE0E',
    //       1.0: '#FF5E41'
    //     }
    //   }
    //   );
 

    // });

  }


  //渲染不同的海量点
  xrhld(massIndex, data, style) {
    if(this.zdklMapOption.mass[massIndex]){
      this.zdklMapOption.mass[massIndex].clear()
    }
    this.zdklMapOption.mass[massIndex] = new AMap.MassMarks(data, {
      opacity: 0.8,
      zIndex: 111,
      cursor: 'pointer',
      style: style
    });
    
    this.zdklMapOption.mass[massIndex].on('click',  (e)=> {
      http.fetchGet('indicator/stationDetail',{
        code:e.data.stationName,
        direction:e.data.routeDirection
      }).then(res=>{
        this.map.setZoomAndCenter(16,e.data.lnglat,true)
        this.infoWindow.setContent(this.createInfoWindow(res.result))
        this.infoWindow.open(this.map,e.data.lnglat);
      })
    });
    this.zdklMapOption.mass[massIndex].setMap(this.map);
  }


  localMain(massIndex,datapoint,style,value1){

  
    let _events = datapoint;
    console.log(datapoint)
    
      var list = _events.map(e => {
          let arr =e.lnglat
          return {
              "type": "Feature",
              "properties": {
                  rawData: e
              },
              "geometry": {
                  "type": "Point",
                  "coordinates": arr
              }
          }
      })

      var data = {
          "type": "FeatureCollection",
          "features": list,
      };


        // 拾取测试
     
  

      var geo = new Loca.GeoJSONSource({
          data: data,
      });
      // var layer = new Loca.IconLayer({
      //     zIndex: 10,
      //     opacity: 1,
      // });
      this.zdklMapOption.mass[massIndex]=new Loca.IconLayer({
          zIndex: 10,
          opacity: 1,
      });
      this.zdklMapOption.mass[massIndex].setSource(geo);
      this.zdklMapOption.mass[massIndex].setStyle(style)
      console.log(this.zdklMapOption.mass[massIndex])
      this.locakl.add(this.zdklMapOption.mass[massIndex]);
      
      this.map.on('click', (e) => {
        const feat = this.zdklMapOption.mass[massIndex].queryFeature(e.pixel.toArray());
        if (feat) {
          let data = feat.properties.rawData;
          http.fetchGet('indicator/stationDetail',{
            code:data.stationName,
            direction:data.routeDirection,
            st:moment(value1[0]).format("YYYY-MM-DD"),
            et:moment(value1[1]).format("YYYY-MM-DD"),
          }).then(res=>{
            this.map.setZoomAndCenter(16,data.lnglat,true)
            this.infoWindow.setContent(this.createInfoWindow(res.result))
            this.infoWindow.open(this.map,data.lnglat);
          })
        }
      });

     

  }


  localheat(dare){


    let _events = dare;
    
      var list = _events.map(e => {
          let arr =e.lnglat
          return {
              "type": "Feature",
              "properties": {
                count: e.sd
              },
              "geometry": {
                  "type": "Point",
                  "coordinates": arr
              }
          }
      })

      var data = {
          "type": "FeatureCollection",
          "features": list,
      };




 
      var geo = new Loca.GeoJSONSource({
        data: data,
      });

      this.zdklMapOption.heat = new Loca.HeatMapLayer({
          // loca,
          zIndex: 10,
          opacity: 1,
          visible: true,
          zooms: [2, 22],
      });

      this.zdklMapOption.heat.setSource(geo, {
          radius: 20,
          unit: 'px',
          height: 0,
          // radius: 10,
          // unit: 'px',
          // height: 10,
          gradient: {
            0.5: '#3EFF8F',
            0.65: '#67E8FF',
            0.7: '#1CD1FF',
            0.9: '#FFEE0E',
            1.0: '#FF5E41'
          },
          value: function (index, feature) {
              return feature.properties.count;
          },
          min: 0,
          max: 10,  //4.6
          heightBezier: [0, .53, .37, .98],
      });
      this.locakl.add(this.zdklMapOption.heat);


  }


  //设置信息窗口的内容
  createInfoWindow(data){
    let content=''
    if(data){
      let str=''
      if(data.route){
        str =this.getStationLisLinesDomStr(data.route.split(','))
      }
      content=`
      <div  class="myinfobox">
        <div class="titfont">
          <div  class="infoimg"></div>
          ${data.stationName}
        </div>
        <div class="line-lsi1">
          <div class="itean-lsi" style="margin-bottom:6px">经度:${data.lnglat[0]}</div>
          <div class="" style="margin-bottom:6px">维度:${data.lnglat[1]}</div>
          <div class="" style="margin-bottom:6px">上车:${data.sp}</div>
          <div class="" style="margin-bottom:6px">下车:${data.sd}</div>
          <div class=" " style="margin-bottom:6px">经过线路:${str}</div>
          
         </div>
      </div>
    `
    }
   
    

    return content

  }
  M_zzploy(){
    new AMap.DistrictSearch({
      extensions:'all',
      subdistrict:0
    }).search('浦东新区',(status,result)=>{
        // 外多边形坐标数组和内多边形坐标数组
        var outer = [
            new AMap.LngLat(-360,90,true),
            new AMap.LngLat(-360,-90,true),
            new AMap.LngLat(360,-90,true),
            new AMap.LngLat(360,90,true),
        ];
        var holes = result.districtList[0].boundaries

        var pathArray = [
            outer
        ];
        pathArray.push.apply(pathArray,holes)
        var polygon = new AMap.Polygon( {
            pathL:pathArray,
            strokeColor: '#00eeff',
            strokeWeight: 1,
            fillColor: '#71B3ff',
            fillOpacity: 0.05
        });
        polygon.setPath(pathArray);
        this.map.add(polygon)
    })
  
  }
  getStationLisLinesDomStr(data) {
      var domStr = '';
      for (var i = 0; i < data.length; i++) {
          var lineDom = `<span data-code="${data[i]}" class="unclick-stations-lis">${data[i]}</span>`
          domStr += lineDom
      }
      // domStr = domStr.substring(0, domStr.length - 1);
      return domStr;
  }

  //区域客流的数据
  getRegionMark(datas) {
    let markers = []
    if(this.overlayGroups){
      this.overlayGroups.clearOverlays()
    }
    datas.forEach(iteam => {
      if(iteam.polygonGeom){
      let iconm = ''
      
      if ((iteam.sd + iteam.sp) < 1001) {
        iconm = require('../../assets/image/blue.png')
        // iconm = '#00D8FF'
      } else if ((iteam.sd + iteam.sp) > 1000 && (iteam.sd + iteam.sp) < 10001) {
        iconm = require('../../assets/image/violet.png')
        // iconm = '#9000FF'
      } else if ((iteam.sd + iteam.sp) > 10000 && (iteam.sd + iteam.sp) < 20001) {
        iconm = require('../../assets/image/orange.png')
        // iconm = '#FF9100'
      } else if ((iteam.sd + iteam.sp) > 20000 && (iteam.sd + iteam.sp) < 30001) {
        iconm = require('../../assets/image/reginmark.png')
        // iconm = '#FF00FF'
      } else if ((iteam.sd + iteam.sp) > 30000) {
        iconm = require('../../assets/image/red.png')
        // iconm = '#FF4200'
      }
      var marker = new AMap.Marker({
        position: [iteam.centerLongitude, parseFloat(iteam.centerLatitude)],
        // 将 html 传给 content background: url(icon) url(${iconm})
        content: `<div class="regionMark" style="background:url(${iconm})">
          <div> ${iteam.regionName}</div>
           <div> 上车 ${iteam.sp}</div>
           <div> 下车 ${iteam.sd}</div>
          </div>`,
          
        // 以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(-89, -89),
        zIndex: 10,
        cursor: 'pointer',
        extData: { iteam }
      });
      marker.on('click', (e) => {
        this.map.setFitView(marker,false)
      })

      let str =iteam.polygonGeom.replace("POLYGON((", "");
          let str1 = str.replace("))", "");
          let arr = str1.split(",");
          let path=[]
          arr.forEach(iteam => {
            path.push(
              new AMap.LngLat(iteam.split(" ")[0], iteam.split(" ")[1])
            );
          });
        let polygonLine = new AMap.Polygon({
          path: path,
          cursor: "pointer",
          strokeColor: "#35A594",
          strokeWeight: 2,
          strokeOpacity: 1,
          fillOpacity: 0.2,
          zIndex: 50,
          map:this.map
        });

        polygonLine.on('mouseover', (e) => {
         
          e.target.setOptions({
            strokeColor: "#FF00FF",
            fillColor : "#FF00FF",
          })
        })
        polygonLine.on('mouseout', (e) => {
         
          e.target.setOptions({
            strokeColor: "#35A594",
            fillColor : "#35A594",
            fillOpacity: 0.2,
          })

        })
      
      markers.push(marker)
      markers.push(polygonLine)
    }
    })
    this.map.setFitView(markers,false)
    return markers
  }
  testpou(path){
    let polygonLine = new AMap.Polygon({
      path: path,
      cursor: "pointer",
      strokeColor: "#35A594",
      strokeWeight: 2,
      strokeOpacity: 1,
      fillOpacity: 0.2,
      zIndex: 50,
      map:this.map
    });

  }
  createPolygon(data) {
    // let isColor = row.regionBerths - row.sumBicycle
    data.forEach((iteam,index)=>{
      let colors=index<90?'#3eaaba':(index>90&&index<160)?'#d53838':(index>160&&index<220)?'#e5d887':'#f06f59'
      let polygonLine = new AMap.Polyline({
        path: iteam.geom,
        strokeColor: colors,
        strokeOpacity: 1,
        strokeWeight:5,
        zIndex:20,
        strokeStyle: "solid",
      });
      this.map.add(polygonLine);

    })
    
    // this.map.setFitView(this.polygonLine,false)
    
  }
  addnew(Overlay) {
    // let newGrop = new AMap.OverlayGroup();
    // newGrop.addOverlays(Overlay);
    // // newGrop.attrId = type
    // this.polygonLineGroup.addOverlay(newGrop);
  }
  //区域客流 范围集合
  addOverlayGroup(Groups) {
    this.overlayGroups.addOverlays(Groups)
  }


  getSearchLine(busLineName) {

    //实例化公交线路查询类，只取回一条路线
    if (!this.linesearch) {
      this.linesearch = new AMap.LineSearch({
        pageIndex: 1,
        city: '北京',
        pageSize: 1,
        extensions: 'all'
      });
    }
    //搜索“536”相关公交线路
    this.linesearch.search(busLineName, (status, result) => {
      this.map.clearMap()
      if (status === 'complete' && result.info === 'OK') {
        var lineArr = result.lineInfo;
        var lineNum = result.lineInfo.length;
        if (lineNum == 0) {
        } else {
          for (var i = 0; i < lineNum; i++) {
            var pathArr = lineArr[i].path;
            var stops = lineArr[i].via_stops;
            var startPot = stops[0].location;
            var endPot = stops[stops.length - 1].location;
            if (i == 0) //作为示例，只绘制一条线路
              this.drawbusLine(startPot, endPot, pathArr);

          }
        }
      } else {
        alert(result);
      }
    });

  }

   //线路客流绘制公交线
  drawbusLine(BusArr,datas) {

    if(this.busPolyline){
      this.map.remove(this.busPolyline)
      this.overlayGroups1.clearOverlays()
    }
    let markers = []
    datas.forEach(iteam => {
      var marker = new AMap.Marker({
        position: [iteam.longitude,iteam.latitude],
        icon:new AMap.Icon({
          image:require('../../assets/image/orange1.png'),
          size: [24,24],
          imageSize : [24,24],
         }),
        offset: new AMap.Pixel(-12, -12),
        cursor: 'pointer',
        extData: { iteam }
      })



      var marker1 = new AMap.Marker({
        content: ' ', 
        offset :new AMap.Pixel(-0, -100),
      zIndex: 50, map: this.map});
      marker.on('mouseover',  (e)=> {
        marker1.setPosition([iteam.longitude,iteam.latitude]);
        marker1.setLabel({content: `
      
        <div class='lineklbox'>
          <div style="color: #00FFFF;font-size: 28px;margin-bottom:18px">${BusArr.routeName}</div>
          <div style="margin-bottom:18px;font-size: 18px">${datas[0].stationName}→${datas[datas.length-1].stationName}</div>
          <div style="color: #00FFFF;font-size: 22px;margin-bottom:18px">${iteam.stationName}</div>
          <div style="margin-bottom:18px;font-size: 18px">上车人数 ：${iteam.sp}</div>
          <div style="margin-bottom:8px;font-size: 18px">下车人数 ：${iteam.sd}</div>
        </div>
        `})
      });
      marker.on('mouseout',  (e)=> {
        marker1.setLabel({content:null})
      });
      markers.push(marker)
    })
    this.overlayGroups1.addOverlays(markers)
    this.map.add(this.overlayGroups1);
   
    //绘制乘车的路线
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
      strokeWeight: 10//线宽
    });

    this.map.setFitView(this.busPolyline, true, [60, 200, 60, 60]);

  }




}