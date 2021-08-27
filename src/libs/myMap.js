import * as http from '@/libs/http'
const Map = {
  data() {
    return {
      // 地图实例
      M_map: null,
      // 地图中心点
      M_center: [121.460752, 31.011182],
      M_peopleColors: {},
      // 地图样式
      M_style: 'amap://styles/d67717253a691e523956e9482ca38f1e',
      kymassnew:null,//客运走廊的点
      pathSimplifierIns:null,//公交线网
      heatmap:null,//热力图
      // 信息窗口
      M_InfoWindow: null,
      polygonLine:null,//行政区域的范围
      massall1: null,
      kyLineOver:new AMap.OverlayGroup(),//客运走廊的线
      colors:{
        '1-2':"#34b000",
        '2-4':"#FECB00",
        '4-6':"#FF2A2A",
        '6+':"#B10400",
      },
     

    }
  },
  methods: {
    // 初始化小镇地图
    M_initMap(el) {
      this.M_map = new AMap.Map(el, {
        mapStyle: this.M_style, // 自定义地图样式
        // pitch: 50, // 俯仰角度，默认0，[0,83]，2D地图下无效
        // viewMode: '3D',
        zoom: 10, // 地图级别
        center: this.M_center, // 中心点
        resizeEnable: true, // 监控地图容器尺寸变化
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
      })

      this.M_map.plugin(["AMap.HeatMap"],  ()=> {      //加载热力图插件
        this.heatmap = new AMap.HeatMap(this.M_map, {
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
            map: this.M_map, //所属的地图实例
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
      this.M_createInfoWin()
      this.M_map.on('click', (e) => {
        this.M_closeInfoWin()
      });
    
    },


          //客运走廊的公交站点内
    addGjMarker(data) {
      let style = [{
          url: require('../assets/image/icon_dt1.png'),
          anchor: new AMap.Pixel(32, 32),
          size: new AMap.Size(32,32),
          zIndex: 3,
        }, {
          url: require('../assets/image/icon_gj1.png'),
          anchor: new AMap.Pixel(32,32),
          size: new AMap.Size(32,32),
          zIndex: 2,
        }];

        this.kymassnew = new AMap.MassMarks(data, {
            opacity: 0.8,
            zIndex: 111,
            cursor: 'pointer',
            style: style
        });
        this.kymassnew.on('click', (e) => {
              this.searchStation(e.data.stationName,e.data.lnglat) 
           });

        this.kymassnew.setMap(this.M_map);
        // this.map.setFitView(this.kymassnew,true)
    
    },
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
      this.M_map.add(kyLinedata);

    })
    return lines
  },

  //客运走廊的线
  addOverlayGroup4(Groups){
    this.kyLineOver.addOverlays(Groups)
  },
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
          // this.infoWindow.setContent(this.createInfoWindow(1,data,startr))
          let kcontent=  `<div class="info-win">
              <div class="win-triangle"></div>
              <div class="info-box">
                <div class="info-content">
                  <div class="info">
                    <div class="info-name">名称：${data}</div>
                  </div>
                  <div class="info">
                    <div class="info-name">经过线路：${startr}</div>
                  </div>
                </div>
              </div>
            </div>`
        this.M_openInfoWin(position, kcontent)
        this.M_map.setZoomAndCenter(16, position,true)
          // setTimeout(()=>{
          //   this.infoWindow.open(this.M_map,position);
            
          // },200)
          
      } else {
          
      }
  });

  },

  // 关闭信息窗
  M_closeInfoWin() {

    this.M_InfoWindow.close()
  },


     //渲染站点
  pointAll3(datapoint){
    if(this.massall){
      this.massall.clear()
    }
    let style = [
      {
        url: require('../assets/image/alpoint1.png'),
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(11, 11),
        zIndex: 20,
      }];
    this.massall = new AMap.MassMarks(datapoint, {
        opacity: 0.8,
        zIndex: 111,
        cursor: 'pointer',
        style: style[0]
    });
    this.massall.setMap(this.M_map);
    // let marker = new AMap.Marker({content: ' ', map: this.M_map});
    // this.massall.on('mouseover',  (e)=> {
    //     marker.setPosition(e.data.lnglat);
    //     marker.setLabel({content: `<div style='color:rgba(26, 66, 118, 1)'>${e.data.stationName}</div>`})
    // });
    // this.massall.on('mouseout',  (e)=> {
    //     marker.setPosition(e.data.lnglat);
    //     marker.setLabel({content:null})
    // });
    this.massall.on('click',  (e)=> {
      http.fetchGet('indicator/stationDetail',{
        code:e.data.stationName,
        direction:e.data.routeDirection
      }).then(res=>{
        this.setConwidow(res.result)
        // this.infoWindow.setContent(this.createInfoWindow(2,res.result))
        // this.infoWindow.open(this.M_map,[e.data.longitude,e.data.latitude]);
        // this.M_map.setZoomAndCenter(16,[e.data.longitude,e.data.latitude],true)
      })
   });
    
  },

  setHeatemap(val){
    this.heatmap.setDataSet({
      data: val,
      max: 100
  });
  },

  //站点的详情
  setConwidow(name){

    let kcontent=  `<div class="info-win">
      <div class="win-triangle"></div>
      <div class="info-box">
        <div class="info-content">
          <div class="info">
            <div class="info-name">名称： ${name.stationName}</div>
          </div>
          <div class="info">
            <div class="info-name">经度：${name.lnglat[0]}</div>
          </div>
          <div class="info">
            <div class="info-name">维度：${name.lnglat[1]}</div>
          </div>
        </div>
      </div>
    </div>`
  this.M_openInfoWin(name.lnglat, kcontent)
  this.M_map.setZoomAndCenter(16, name.lnglat,true)

  },


  //行政区域的范围
  createPolygon(path) {
    // let isColor = row.regionBerths - row.sumBicycle
    if(this.polygonLine){
      this.M_map.remove(this.polygonLine)
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
    
    this.M_map.add(this.polygonLine);
    this.M_map.setFitView(this.polygonLine,true)
  },
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
  },


   // 创建窗口
   M_createInfoWin() {
    this.M_InfoWindow = new AMap.InfoWindow({
      isCustom: true,
      autoMove: true,
      content: '',
      anchor: 'top-right',
      offset: new AMap.Pixel(-6, -6)
    })
  },

    // 打开信息窗口
    M_openInfoWin(pos, info) {
      this.M_InfoWindow.setContent(info)
      this.M_InfoWindow.open(this.M_map, pos)
    },
 
    
  }
}

export default Map
