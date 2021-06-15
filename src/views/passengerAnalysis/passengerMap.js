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
      overlayGroups: new AMap.OverlayGroup(),//区域客流站点集合
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
      // resizeEnable: true, //监控地图容器尺寸变化
      mapStyle: 'amap://styles/d67717253a691e523956e9482ca38f1e',
      expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
    })
    this.linesearch = new AMap.LineSearch({
      pageIndex: 1,
      city: '上海',
      pageSize: 1,
      extensions: 'all'
    });
    this.map.add(this.overlayGroups);

    this.map.plugin(["AMap.HeatMap"], () => {      //加载热力图插件
      this.zdklMapOption.heat = new AMap.HeatMap(this.map, {
        opacity: [0, 0.8], zIndex: 110,
        gradient: {
          0.5: '#3EFF8F',
          0.65: '#67E8FF',
          0.7: '#1CD1FF',
          0.95: '#FFEE0E',
          1.0: '#FF5E41'
        }
      }
      );
      //在地图对象叠加热力图
      // this.zdklMapOption.heat.setDataSet({data: heatOption, max: zdklMapOption.heatMaxCount}); //设置热力图数据集

    });

  }


  //渲染不同的海量点
  xrhld(massIndex, data, style) {
    this.zdklMapOption.mass[massIndex] = new AMap.MassMarks(data, {
      opacity: 0.8,
      zIndex: 111,
      cursor: 'pointer',
      style: style
    });
    var marker = new AMap.Marker({ content: ' ', map: this.map });
    this.zdklMapOption.mass[massIndex].on('mouseover', function (e) {
      marker.setPosition(e.data.lnglat);
      marker.setLabel({ content: `<div style='color:rgba(26, 66, 118, 1)'>${e.data.stationName}</div>` })
    });
    this.zdklMapOption.mass[massIndex].on('mouseout', function (e) {
      marker.setPosition(e.data.lnglat);
      marker.setLabel({ content: null })
    });
    // this.zdklMapOption.mass[massIndex].on('click', function (e) {
    //     StopDetail.showMarker(zdklMap, e.data.id, beginDate, endDate);
    // });
    this.zdklMapOption.mass[massIndex].setMap(this.map);
  }


  getRegionMark(datas) {
    let markers = []
    datas.forEach(iteam => {
      let iconm = ''
      
      if ((iteam.sd + iteam.sp) < 1001) {
        iconm = require('../../assets/image/blue.png')
      } else if ((iteam.sd + iteam.sp) > 1000 && (iteam.sd + iteam.sp) < 10001) {
        iconm = require('../../assets/image/violet.png')
      } else if ((iteam.sd + iteam.sp) > 10000 && (iteam.sd + iteam.sp) < 20001) {
        iconm = require('../../assets/image/orange.png')
      } else if ((iteam.sd + iteam.sp) > 20000 && (iteam.sd + iteam.sp) < 30001) {
        iconm = require('../../assets/image/reginmark.png')
      } else if ((iteam.sd + iteam.sp) > 30000) {
        iconm = require('../../assets/image/red.png')
      }
      // console.log(iconm)
      var marker = new AMap.Marker({
        position: [iteam.centerLongitude, parseFloat(iteam.centerLatitude)],
        // 将 html 传给 content background: url(icon)
        content: `<div class="regionMark" style="background: url(${iconm})">
          <div> ${iteam.regionName}</div>
          <div> 上车 ${iteam.sd}</div>
          <div> 下车 ${iteam.sp}</div>
         
          </div>`,
        // 以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(-13, -30),
        cursor: 'pointer',
        extData: { iteam }
      });

      marker.on('mouseover', (e) => {
        
        if (e.target.getExtData()) {
          let str = e.target.getExtData().iteam.polygonGeom.replace("POLYGON((", "");
          let str1 = str.replace("))", "");
          let arr = str1.split(",");
          let path=[]
          arr.forEach(iteam => {
            path.push(
              new AMap.LngLat(iteam.split(" ")[0], iteam.split(" ")[1])
            );
          });
          this.createPolygon(path)
        }
      });
      marker.on('mouseout', (e) => {
        this.map.remove(this.polygonLine);
        
      });




      


      markers.push(marker)
    })
    return markers


  }


  createPolygon(path) {
    // let isColor = row.regionBerths - row.sumBicycle
    this.polygonLine = new AMap.Polygon({
      path: path,
      cursor: "pointer",
      strokeColor: "#35A594",
      strokeWeight: 2,
      strokeOpacity: 1,
      fillOpacity: 0.4,
      zIndex: 50,
    });
    this.map.add(this.polygonLine);
    
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


  drawbusLine(startPot, endPot, BusArr) {
    //绘制起点，终点
    new AMap.Marker({
      map: this.map,
      position: startPot, //基点位置
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
      zIndex: 10,
      anchor: 'bottom-center',
    });
    new AMap.Marker({
      map: this.map,
      position: endPot, //基点位置
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
      zIndex: 10,
      anchor: 'bottom-center',
    });
    //绘制乘车的路线
    let busPolyline = new AMap.Polyline({
      map: this.map,
      path: BusArr,
      strokeColor: "#50C0FF",//线颜色
      strokeOpacity: 0.8,//线透明度
      isOutline: true,
      outlineColor: '#50C0FF',
      showDir: true,
      strokeWeight: 10//线宽
    });
    // 将 busPolyline 显示在地图中心并自动缩放地图到合适级别。
    // true表示需要动画过程，[60,200,60,60]表示上下左右避让像素
    this.map.setFitView(busPolyline, true, [60, 200, 60, 60]);

  }




}