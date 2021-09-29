// const areasIcon = require('@img/map/icon_0_1@3x.png')
import * as http from '@/libs/http'
// import store from './stores'
import Anmation from "@/libs/anmation.js";
let Myanmation = null; // 地图实例
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
      // 覆盖物点组
      M_pointGroup: null,
      hcloca:null,//换乘要的local
      massall1: null,//站点智能化建设
      M_pointEvent: [],
      czsnzmas:null,
      markerarr: [],
      testLIneda:[],
      // 信息窗口
      M_InfoWindow: null,
      busPolyline: null,
      busPolyline1: null,
      massall: null,
      polyEditor: null,
      mouseTool: null,
      station: null,
      layer: null,
      trafficLayer: null,
      colors:{
        '1-2':"#34b000",
        '2-4':"#FECB00",
        '4-6':"#FF2A2A",
        '6+':"#B10400",
      },
      geocoder: null,//逆地址解析
      markers: [],
      trafficGroups: new AMap.OverlayGroup(),//拥堵路段
      overlayGroupthree: new AMap.OverlayGroup(),//300米的圆
      overlayGroups: new AMap.OverlayGroup(),//调整方案站点集合
      overlayGroups1: new AMap.OverlayGroup(),//车辆可视化公交车集合
      overlayGroups2: new AMap.OverlayGroup(),//车辆可视化街镇集合
      overlayGroups3: new AMap.OverlayGroup(),//车辆可视化街镇集合
      meroGroups: new AMap.OverlayGroup(),//地铁线路的集合
      realTownGroups: new AMap.OverlayGroup(),//实时运营街镇的集合
      realbusGroups: new AMap.OverlayGroup(),//实时运营公交的集合
      overlayGroupsgl: new AMap.OverlayGroup(),//实时运营分布UI率
      zgdGroups: new AMap.OverlayGroup(),//实时运营主干道
      xwrhGroups: new AMap.OverlayGroup(),//线网融合
      xwrhGroups1: new AMap.OverlayGroup(),//线网融合
      xwrhGroups2: new AMap.OverlayGroup(),//线网融合

      linkLayer:null,
        labelLayer:null,
        marker1:null,
        marker2:null,
        busPolylineod:null,
        scatterLayer1:null,
        scatterLayer2:null,
        linesearch1:null,
      
      
      nework: {
      }

    }
  },
  methods: {
    // 处理颜色
    M_disColor(adcode) {
      if (!this.M_peopleColors[adcode]) {
        let num = this.sourceData[adcode]
        if (!num) {
          this.M_peopleColors[adcode] = '#fded86'
        } else {
          /* #33559b #5673bd #6683d1 #7896e5 #86a3f4 #98aff6 #abbcf7 #c2cefa #dae1fc #f0f3fe */
          /* #9d4429 #c74e29 #e35b2c #e77235 #eb8a40 #f0a04b #f5b857 #f9d063 #fde86e #fded86 */
          if (num >= 9000) {
            this.M_peopleColors[adcode] = '#9d4429'
          } else if (num >= 8000) {
            this.M_peopleColors[adcode] = '#c74e29'
          } else if (num >= 7000) {
            this.M_peopleColors[adcode] = '#e35b2c'
          } else if (num >= 6000) {
            this.M_peopleColors[adcode] = '#e77235'
          } else if (num >= 5000) {
            this.M_peopleColors[adcode] = '#eb8a40'
          } else if (num >= 4000) {
            this.M_peopleColors[adcode] = '#f0a04b'
          } else if (num >= 3000) {
            this.M_peopleColors[adcode] = '#f5b857'
          } else if (num >= 2000) {
            this.M_peopleColors[adcode] = '#f9d063'
          } else if (num >= 1000) {
            this.M_peopleColors[adcode] = '#fde86e'
          } else {
            this.M_peopleColors[adcode] = '#fded86'
          }
        }
      }
      return this.M_peopleColors[adcode]
    },
    // 初始化中国地图
    M_initChinaMap(el) {
      const disCountry = new AMap.DistrictLayer.Country({
        zIndex: 10,
        SOC: 'CHN',
        depth: 1,
        styles: {
          'nation-stroke': '#6B9FE7',
          'nation-lineWidth': '4',
          'coastline-stroke': '#6B9FE7',
          'province-stroke': [107, 156, 224, 1],
          'fill': (props) => { // 中国特有字段
            return this.M_disColor(props.adcode_pro)
          }
        }
      })

      const BGdiv = document.createElement('div')
      const customLayer = new AMap.CustomLayer(BGdiv, {
        zooms: [3, 10],
        alwaysRender: false, // 缩放过程中是否重绘，复杂绘制建议设为false
        zIndex: -1
      })

      customLayer.render = () => {
        const size = this.M_map.getSize()
        BGdiv.style.width = size.width + 'px'
        BGdiv.style.height = size.height + 'px'
        BGdiv.style.backgroundImage = 'radial-gradient(#10479D, #0B122F)'
      }

      this.M_map = new AMap.Map(el, {
        zoom: 10, // 地图级别
        center: this.mapCenter, // 中心点
        // resizeEnable: true, //监控地图容器尺寸变化
        mapStyle: 'amap://styles/d67717253a691e523956e9482ca38f1e',
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级

      })

      
    },
    // 初始化小镇地图
    M_initMap(el) {
      this.M_map = new AMap.Map(el, {
        mapStyle: this.M_style, // 自定义地图样式
        // pitch: 50, // 俯仰角度，默认0，[0,83]，2D地图下无效
        // viewMode: '3D',
        zoom: 10, // 地图级别
        showIndoorMap: false,
        viewMode: '3D',
        // center: this.M_center, // 中心点
        // resizeEnable: true, // 监控地图容器尺寸变化
        // expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
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

      this.M_pointGroup = new AMap.OverlayGroup()
      
      this.M_createInfoWin()

      this.station = new AMap.StationSearch({
        pageIndex: 1, //页码
        pageSize: 60, //单页显示结果条数
        city: ''   //确定搜索城市
      });

      this.M_map.on('click', (e) => {
        this.M_closeInfoWin()
      });
      this.geocoder = new AMap.Geocoder({
        city: "", //城市设为北京，默认：“全国”
        radius: 10, //范围，默认：500
        extensions: 'all'
      });
      // 创建 AMap.LabelsLayer 图层
      this.layer = new AMap.LabelsLayer({
        zooms: [3, 20],
        zIndex: 1000,
        collision: false
      });
    },
    // 设置车辆可视化
    M_setAreasPoint(data) {
      if (this.M_pointGroup) {
        console.log(4444)
        this.M_pointGroup.clearOverlays()
      }
      this.M_closeInfoWin()
      if (this.overlayGroups1) {
        this.overlayGroups1.clearOverlays()
      }
      const iconm = require('../../assets/image/blue.png')
      let marks = []
      data.forEach(iteam => {
        const marker = new AMap.Marker({
          position: iteam.centre||[iteam.centerLongitude,iteam.centerLatitude],
          // 将 html 传给 content background: url(icon) url(${iconm}) <div> ${iteam.percent || 0}</div>
          content: `<div class="regionMark" style="width:178px;height:178px;background:url(${iconm})">
            <div> ${iteam.name||iteam.regionName}</div>
             <div>  ${iteam.num||iteam.routeNum||0}</div>
             
            </div>`,
          // 以 icon 的 [center bottom] 为原点
          offset: new AMap.Pixel(-89, -89),
          zIndex: 10,
          cursor: 'pointer',
          extData: iteam,
          map: this.M_map
        })
        // marker.on('click',e=>{
        //   this.M_map.setZoom(16)
        // })
        marks.push(marker)
      })
      // this.M_addGroup(marks)
      this.M_pointGroup.addOverlays(marks)
      this.M_map.add(this.M_pointGroup)
    },
    // 设置重点区
    M_setAreas(data) {
      let polyarr = []
      data.forEach(iteam => {
        let str = iteam.polygonGeom.replace("POLYGON((", "");
        let str1 = str.replace("))", "");
        let arr = str1.split(",");
        let path = []
        arr.forEach(iteam => {
          path.push(
            new AMap.LngLat(iteam.split(" ")[0], iteam.split(" ")[1])
          );
        });
        const Polygon = new AMap.Polygon({
          path: path, // 合
          fillColor: '#35A594', // 多边形填充颜色
          fillOpacity: 0.2, // 填充颜色
          strokeColor: '#35A594', // 线条颜色
          strokeWeight: 1, // 线条宽度，默认为 1
          cursor: 'pointer'
        })
        Polygon.on('mouseover', (e) => {

          e.target.setOptions({
            strokeColor: "#FF00FF",
            fillColor: "#FF00FF",
          })
        })
        Polygon.on('mouseout', (e) => {
          e.target.setOptions({
            strokeColor: "#35A594",
            fillColor: "#35A594",
          })

        })
        polyarr.push(Polygon)
      })
      this.overlayGroups2.addOverlays(polyarr)
      this.M_map.add(this.overlayGroups2)
      this.overlayGroups2.hide()
    },
    // 设置边界
    M_setTownPath(path) {
      const pathArray = [
        [
          new AMap.LngLat(-360, 90, true),
          new AMap.LngLat(-360, -90, true),
          new AMap.LngLat(360, -90, true),
          new AMap.LngLat(360, 90, true)
        ]
      ]
      // eslint-disable-next-line no-useless-call
      pathArray.push.apply(pathArray, [path])

      const Polygon = new AMap.Polygon({
        bubble: true,
        strokeColor: '#6A37CB',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#0d2055',
        fillOpacity: 0.4,
        path: pathArray,
        map: this.M_map
      })
      return Polygon
    },
    M_regeoCode(lnglat) {

      this.geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.regeocode) {
          var address = result.regeocode.formattedAddress;
          // document.getElementById('address').value = address;
        } else {
        }
      });
    },

    // 车辆可视化的公交车添加点
    M_addPoint(data,type) {
      if (this.M_pointGroup) {
        this.M_pointGroup.clearOverlays()
      }
      if (this.overlayGroups1) {
        this.overlayGroups1.clearOverlays()
      }
      let markers = []
      data.forEach(iteam => {
        const marker = new AMap.Marker({
          position: type==2?iteam.lnglat:[iteam.lng, iteam.lat],
          offset: new AMap.Pixel(-16, -16),
          topWhenClick: true,
          icon: new AMap.Icon({
            size: new AMap.Size(32, 32),
            image: type==2?require('../../assets/image/alpoint1.png'):require('../../assets/image/orange1.png'),
            imageSize: new AMap.Size(32, 32)
          }), // 添加 Icon 图标 URL
          extData: iteam
        })
        markers.push(marker)

        this.overlayGroups1.addOverlays(markers)
        this.M_map.add(this.overlayGroups1)

      })

    },
    // 修改组
    M_upDateGroup(index, points) {
      const group = this.M_pointGroup.getOverlays()[index]
      group.clearOverlays()
      group.addOverlays(points)
      if (this.lengthSelect === 5 || this.lengthSelect === '') {
        group.show()
      } else {
        group.hide()
      }
    },

    // 添加点事件
    M_addGroupEvent(callback) {
      // if(this.M_pointEvent.length>0){
      //   AMap.Event.clearListeners(this.M_pointEvent)
      // }
      this.M_pointEvent = []
      let flag = ''
      // this.M_pointEvent.push(
      //   AMap.event.addListener(this.M_pointGroup, 'mousemove', (e) => {
      //     const ExtData = e.target.getExtData()
      //     const name = ExtData.name
      //     const TypeName = e.target.TypeName

      //     if (TypeName === '视频监控') return

      //     if (flag !== name) {
      //       callback && callback(TypeName, ExtData)
      //       flag = name
      //     }
      //   })
      // )
      // this.M_pointEvent.push(
      //   AMap.event.addListener(this.M_pointGroup, 'mouseout', (e) => {
      //     this.M_closeInfoWin()
      //     flag = ''
      //   })
      // )




      this.M_pointEvent.push(
        AMap.Event.addListener(this.overlayGroups1, 'click', (e) => {
          const ExtData = e.target.getExtData()
          const position = e.target.getPosition()
          callback && callback(ExtData, 2, position)
          flag = ''
        })
      )


      this.M_pointEvent.push(
        AMap.Event.addListener(this.xwrhGroups2, 'click', (e) => {
          const ExtData = e.target.getExtData()
          const position = e.target.getPosition()
          callback && callback(ExtData)
          flag = ''
        })
      )


      





      this.M_pointEvent.push(
        AMap.Event.addListener(this.M_pointGroup, 'click', (e) => {
          const ExtData = e.target.getExtData()
          callback && callback(ExtData)
          flag = ''
        })
      )



      this.M_pointEvent.push(
        AMap.Event.addListener(this.overlayGroupsgl, 'click', (e) => {
          const ExtData = e.target.getExtData()
          callback && callback(ExtData)
          flag = ''
        })
      )




      this.M_pointEvent.push(
        AMap.Event.addListener(this.overlayGroups3, 'click', (e) => {
          const ExtData = e.target.getExtData()
          const position = e.target.getPosition()
          callback && callback(ExtData, position)
          flag = ''
        })
      )

    },
    // 设置地图中心点和缩放级别 coord 数组
    M_setZoomAndCenter(coord, zoom = 15) {
      this.M_map.setZoomAndCenter(zoom, coord)
    },
    // 操作组
    M_handleGroup(index) {
      if (index === false) {
        this.M_pointGroup.show()
      } else {
        this.M_pointGroup.hide()
        const group = this.M_pointGroup.getOverlays()[index]
        group && group.show()
      }
    },
    // 分组添加到组
    M_addGroup(points) {
      const group = new AMap.OverlayGroup()
      // group.type = type
      group.addOverlays(points)
      this.M_pointGroup.addOverlay(group)
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
    // url: require('../../assets/image/alpoint1.png'),
    // anchor: new AMap.Pixel(28, 16),
    // size: new AMap.Size(16, 16),
    // zIndex: 20,
    M_czsnz(datapoint){
      let style = [
        {
          url: require('../../assets/image/czp.png'),
          anchor: new AMap.Pixel(24,24),
          size: new AMap.Size(48,48),
          zIndex: 1,
        },
        {
          url: require('../../assets/image/snp.png'),
          anchor: new AMap.Pixel(24,24),
          size: new AMap.Size(48,48),
          zIndex: 1,
        },
        {
          url: require('../../assets/image/snpn.png'),
          anchor: new AMap.Pixel(24,24),
          size: new AMap.Size(48,48),
          zIndex: 1,
        },
        {
          url: require('../../assets/image/czpn.png'),
          anchor: new AMap.Pixel(24,24),
          size: new AMap.Size(48,48),
          zIndex: 1,
        }
      ];
      this.czsnzmas = new AMap.MassMarks(datapoint, {
          opacity: 1,
          cursor: 'pointer',
          style: style
      });


      this.czsnzmas.on('click',  (e)=> {

       
        let infoWin = `<div class="info-win">
        <div class="win-triangle"></div>
        <div class="info-box">
          <div class="info-content">
            <div class="info">
              <div class="info-name">站点名称：${e.data.name}</div>
            </div>
            <div class="info">
              <div class="info-name">站点地址：${e.data.address}</div>
            </div>
            <div class="info">
              <div class="info-name">线路：${e.data.route}</div>
            </div>
            <div class="info">
              <div class="info-name">现场管理主体：${e.data.manageEntity}</div>
            </div>
            <div class="info">
              <div class="info-name">责任所属：${e.data.responsibility}</div>
            </div>
            <div class="info">
              <div class="info-name">智能安防：${e.data.security=='0'?'未安装':'已安装'}</div>
            </div>
            <div class="info">
              <div class="info-name">信息化：${e.data.information=='0'?'未改造':'已改造'}</div>
            </div>
         
          </div>
        </div>
      </div>`

      this.M_openInfoWin(e.data.lnglat, infoWin)
      });
      
      this.czsnzmas.setMap(this.M_map);

    },
    M_pointAll4(datapoint){
      let style = [
        {
          url: 'https://webapi.amap.com/images/mass/mass2.png',
          anchor: new AMap.Pixel(3, 3),
          size: new AMap.Size(5, 5),
          zIndex: 1,
        }];
      this.massall1 = new AMap.MassMarks(datapoint, {
          opacity: 0.8,
          cursor: 'pointer',
          style: style
      });


      this.massall1.on('click',  (e)=> {

        http.fetchGet('gps/ebusManage',{
          pdbCode:e.data.code,  
        }).then(res=>{

          let str=''
          let sf=''
          if(res.result.routeInfor.length>0){
            str =this.getStationLisLinesDomStr(res.result.routeInfor)
          }
          if(res.result.terminalSta.length>0){
            sf =this.getStationLisLinesDomStr1(res.result.terminalSta)
          }
          let infoWin = 
          `<div class="marhznbox">

            <div class="titit">
              <div class="omgtit"></div>
              <div style="margin:0 4px">${e.data.code}</div>
              <div>${e.data.address}</div>    
            </div>

            <div style="font-size:18px" class="linlist">
              经过线路：${str}
            </div>

            <div class="tablebox">
              <div class="tablehead">
                <div style="width:20%">设备编号</div>
                <div style="width:20%">设备类型</div>
                <div style="width:20%">在线状态</div>
                <div style="width:40%">绑定线路</div>
              </div>

              <div class="tablebody">
                ${sf}
              </div>
            </div>
          
        
          </div>`
          this.M_openInfoWin1(e.data.lnglat, infoWin)


        
        })

      });
      
      this.massall1.setMap(this.M_map);
      
    },

    localMain(datapoint){

      var loca = new Loca.Container({
          map: this.M_map,
      });
      let _events = datapoint;
      
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
        var layer = new Loca.IconLayer({
            zIndex: 10,
            opacity: 1,
        });
        layer.setSource(geo);
        layer.setStyle({
            unit: 'px',
            icon:require('../../assets/image/alpoint1.png'),
            iconSize: [11,11],
            rotation: 0,
        })
  
        loca.add(layer);
        this.M_map.on('click', (e) => {
          const feat = layer.queryFeature(e.pixel.toArray());
          if (feat) {
           
          }
      });
  
    },
    //换乘压力的数据
    localMainhcyl(datapoint){
      this.M_map.clearMap()

     this.hcloca = new Loca.Container({
          map: this.M_map,
      });
      let _events = datapoint;
      
        var list = _events.map(e => {
            let arr =[e.longitude,e.latitude]
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
        this.hclayer = new Loca.IconLayer({
            zIndex: 10,
            opacity: 1,
        });
        this.hclayer.setSource(geo);
        this.hclayer.setStyle({
            unit: 'px',
            icon:function (index, item) {
              let iconh=''
              let num=item.properties.rawData.count
              if(num>0&&num<6){
                iconh=require("../../assets/image/1hc.png")
              }else if(num>5&&num<11){
                iconh=require("../../assets/image/2hc.png")
              }else if(num>10&&num<31){
                iconh=require("../../assets/image/3hc.png")
              }else if(num>30&&num<51){
                iconh=require("../../assets/image/4hc.png")
              }else if(num>50&&num<101){
                iconh=require("../../assets/image/5hc.png")
              }else if(num>100&&num<501){
                iconh=require("../../assets/image/6hc.png")
              }else if(num>500){
                iconh=require("../../assets/image/7hc.png")
              }
                  return iconh
              },
            
            iconSize: [11,11],
            rotation: 0,
        })
  
        this.hcloca.add(this.hclayer);
        this.M_map.on('click', (e) => {
          const feat = this.hclayer.queryFeature(e.pixel.toArray());
          if (feat) {
            console.log(feat)
            let strn=feat.properties.rawData

            let infoWin = `<div class="info-win">
            <div class="win-triangle"></div>
            <div class="info-box">
              <div class="info-content">
                <div class="info">
                  <div class="info-name">站名：${strn.stationName}</div>
                </div>
                <div class="info">
                  <div class="info-name">换乘: ${strn.count}</div>
                </div>
              </div>
            </div>
          </div>`
            this.M_openInfoWin([strn.longitude, strn.latitude], infoWin)
           
          }
      });
  
    },
    getStationLisLinesDomStr(data){

      var domStr = '';
      for (var i = 0; i < data.length; i++) {
          var lineDom = `<span style="color:#FFFFFF;font-size:18px">${data[i].routeName||''}、</span>`
          domStr += lineDom
      }
      // domStr = domStr.substring(0, domStr.length - 1);
      return domStr;

    },
    getStationLisLinesDomStr1(data){

      var domStr = '';
      for (var i = 0; i < data.length; i++) {
        let dhjli=''
          if(data[i].routelist.length>0){
            dhjli=this.getStationLisLinesDomStr3(data[i].routelist)
          }
          var lineDom = `
            <div style="width:100%;height:46px;display:flex;align-items: center;border-top: 1px dashed #00FFFF;">
              <div style="width:20%;height: 100%;display:flex;align-items: center;justify-content: center; border-right: 1px dashed #00FFFF;">${data[i].terminalId}</div>
              <div style="width:20%;height: 100%;display:flex;align-items: center;justify-content: center; border-right: 1px dashed #00FFFF;">${data[i].terminalTypeName}</div>
              <div style="width:20%;height: 100%;display:flex;align-items: center;justify-content: center; border-right: 1px dashed #00FFFF;">${data[i].terminalStatus==0?'在线':'离线'}</div>
              <div style="width:40%;height: 100%;display:flex;align-items: center;justify-content: center; border-right: 1px dashed #00FFFF;">${dhjli}</div>
            </div>
          `
          domStr += lineDom
      }
      // domStr = domStr.substring(0, domStr.length - 1);
      return domStr;

    },
    getStationLisLinesDomStr3(data){

      var domStr = '';
      for (var i = 0; i < data.length; i++) {
          var lineDom = `<span style="color:#FFFFFF;font-size:16px">${data[i].routeName}、</span>`
          domStr += lineDom
      }
      // domStr = domStr.substring(0, domStr.length - 1);
      return domStr;

    },
    //站点集合
    M_pointAll3(datapoint,type) {
      // if (this.massall) {
      //   this.massall.clear()
      // }
      var markers = [];
      var icon = {
        type: 'image',
        image: require('../../assets/image/alpoint1.png'),
        size: type==2?[18,18]:[11, 11],
        anchor: 'bottom-center',
      }
      var normalMarker = new AMap.Marker({
        anchor: 'bottom-center',
        offset: [0, -21],
      });
      datapoint.forEach(iteam => {

        var curPosition = iteam.lnglat;
        var curData = {
          position: curPosition,
          extData: iteam.stationName,
          icon
        };

        var labelMarker = new AMap.LabelMarker(curData);

        markers.push(labelMarker);

        // 给marker绑定事件
        labelMarker.on('mouseover', (e) => {
          var position = e.target.getExtData();
          if (position) {
            normalMarker.setContent(
              '<div class="amap-info-window">'
              + position +
              '<div class="amap-info-sharp"></div>' +
              '</div>');
            normalMarker.setPosition(e.target.getPosition());
            this.M_map.add(normalMarker);
          }
        });

        labelMarker.on('mouseout', () => {
          this.M_map.remove(normalMarker);
        });

      })
      this.layer.add(markers);
      this.M_map.add(this.layer);
      type==2?'':this.layer.hide()
    },

  
  
 
    
    
    M_drawbusLine(BusArr, type) {
      if (this.busPolyline) {
        this.M_map.remove(this.busPolyline)
      }
      if (this.busPolyline1) {
        this.M_map.remove(this.busPolyline1)
      }
      if (this.markers) {
        this.overlayGroups.removeOverlays(this.markers)
      }
      if (this.polyEditor) {
        this.polyEditor.close();
      }

      // this.lineSearch(BusArr.routeName)
      let num = Math.round((BusArr.geom.length) / 2)
      //线路调整
      this.busPolyline = new AMap.Polyline({
        map: this.M_map,
        path: BusArr.geom,
        strokeColor: "#00FFFF",//线颜色
        strokeOpacity: 0.8,//线透明度
        isOutline: true,
        outlineColor: '#50C0FF',
        showDir: true,
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 12,
        cursor: 'pointer',
        strokeWeight: 10//线宽
      });
      this.busPolyline1 = new AMap.Polyline({
        map: this.M_map,
        path: BusArr.geom,
        strokeColor: "#A200FF",//线颜色
        strokeOpacity: 1,//线透明度
        showDir: true,
        lineJoin: 'round',
        lineCap: 'round',
        cursor: 'pointer',
        zIndex: 10,
        strokeWeight: 10//线宽
      });
      this.M_map.setFitView(this.busPolyline, true, [60, 200, 60, 60]);
      this.polyEditor = new AMap.PolylineEditor(this.M_map, this.busPolyline1, {
      });
      this.polyEditor.setTarget(this.busPolyline1);
      this.polyEditor.open();
    },
    testLinesearch(busLineName){
      let linesearch = new AMap.LineSearch({
        pageIndex: 1,
        city: '上海',
        pageSize: 10,
        extensions: 'all'
      });
      linesearch.search(busLineName, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          

            this.testLIneda.push({
              routeName:busLineName,
              version:busLineName+"+1",
              geom:result.lineInfo[1].path.join(' '),
              directionDesc:result.lineInfo[1].name,
              direction:1})



              // return  result.lineInfo[1].name
         
         
        } 
        
      });

    },

    //300米的圆
  threeCircle(data,radius){
    // if(this.overlayGroups){
    //   this.overlayGroups.getOverlays().forEach(iy=>{
    //     this.map.remove(iy)
    //   })
    // }
    if(this.overlayGroupthree){
      this.overlayGroups.clearOverlays()
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
            // map:this.map,
            strokeOpacity: 0.1,
            fillOpacity:1,
            // 线样式还支持 'dashed'
            fillColor: '#1A4276',
            zIndex: 10,
        })
        // this.map.add(circle);
        circleAll.push(circle)
        
        
      }
     
    })
    this.overlayGroupthree.addOverlays(circleAll)
    this.M_map.add(this.overlayGroupthree)
  },

 

  

    

    

    M_autoInputzgt(data) {
      
      // data.forEach(iteam => {
      //   var placeSearch = new AMap.PlaceSearch({
      //     city: '全国'
      //   });
      //   placeSearch.search('上海市' + iteam.regionName, (status, result) => {
      //     // 搜索成功时，result即是对应的匹配数据
      //     if (result.poiList.pois[0]) {
      //       let row=result.poiList.pois[0]
      //       let marker1 = new AMap.Marker({
      //         content: `<div style='width:12px;height:12px;border-radius:50%;background:#b40100'></div> `,
      //         offset: new AMap.Pixel(-6, -6),
      //         zIndex: 100,
      //         position: [row.location.lng, row.location.lat],
      //       });

      //       marker1.on('click',e=>{

      //         let infoWin = `<div class="info-win">
      //         <div class="win-triangle"></div>
      //         <div class="info-box">
      //           <div class="info-content">
      //             <div class="info">
      //               <div class="info-name">名称：${iteam.regionName}</div>
      //             </div>
      //             <div class="info">
      //               <div class="info-name">平均车速：${iteam.avgSpeed}km/h</div>
      //             </div>
      //             <div class="info">
      //               <div class="info-name">畅行指数：${iteam.avgIndex}min/km</div>
      //             </div>
      //             <div class="info">
      //             <div class="info-name">运行稳定性：${iteam.exchange}</div>
      //           </div>
      //           </div>
      //         </div>
      //       </div>`
      //         this.M_InfoWindow.setAnchor('top-right')
      //         this.M_openInfoWin([row.location.lng, row.location.lat], infoWin)


      //       })
           

      //       this.zgdGroups.addOverlay(marker1)
      //       this.M_map.add(this.zgdGroups)
      //     }

      //   })



      // })
      // 


      data.forEach(iteam=>{

        

        let busPolyline = new AMap.Polyline({
          // map: this.M_map,
          path: this.TestsetData(iteam.geom,2),
          strokeColor: "#A200FF",//线颜色
          strokeOpacity: 0.8,//线透明度
          isOutline: true,
          outlineColor: "#A200FF",
          zIndex: 100,
          cursor:'pointer',
          strokeWeight: 4//线宽
        });
        busPolyline.on('mouseover',(e) => {
          e.target.setOptions({
            strokeColor: "#00FFFF",
            zIndex: 200,
          })
          
        })


        busPolyline.on('mouseout', (e) => {
          e.target.setOptions({
            strokeColor: "#A200FF",
            zIndex: 100,
          })
  
        })


        busPolyline.on('click',e=>{

                  let infoWin = `<div class="info-win">
                  <div class="win-triangle"></div>
                  <div class="info-box">
                    <div class="info-content">
                      <div class="info">
                        <div class="info-name">名称：${iteam.regionName}</div>
                      </div>
                      <div class="info">
                        <div class="info-name">平均车速：${iteam.avgSpeed}km/h</div>
                      </div>
                      <div class="info">
                        <div class="info-name">畅行指数：${iteam.avgIndex}min/km</div>
                      </div>
                      <div class="info">
                      <div class="info-name">运行稳定性：${iteam.exchange}</div>
                    </div>
                    </div>
                  </div>
                </div>`

                let num = Math.round(e.target.getPath().length / 2)
                  this.M_InfoWindow.setAnchor('top-right')
                  this.M_openInfoWin(e.target.getPath()[num], infoWin)
        })

        this.zgdGroups.addOverlay(busPolyline)
              this.M_map.add(this.zgdGroups)

      })
      // this.M_map.add(this.zgdGroups)


    },

    //行业管理线网现状规划管理

    setxwxzgh(data){
      if(this.xwrhGroups2){
        this.xwrhGroups2.clearOverlays()
      }
      // if(this.realbusGroups.getOverlays().length>0){
      //     this.realbusGroups.hide()
      // }
      this.M_closeInfoWin()
      const iconm = require('../../assets/image/blue.png')
      data.forEach(iteam => {
        const marker = new AMap.Marker({
          position:[iteam.centerLongitude,iteam.centerLatitude],
          // 将 html 传给 content background: url(icon) url(${iconm})
          content: `<div class="regionMark" style="width:178px;height:178px;background:url(${iconm})">
            <div> ${iteam.regionName}</div>
             <div>  ${iteam.routeNum}</div>
             <div> </div>
            </div>`,
          // 以 icon 的 [center bottom] 为原点
          offset: new AMap.Pixel(-89, -89),
          zIndex: 10,
          cursor: 'pointer',
          extData: iteam,
          
        })

        this.xwrhGroups2.addOverlay(marker)
        this.M_map.add(this.xwrhGroups2)
      })

    },

    //行业管理里面的线网融合
    lineSearchtes(busLineName,item){
      if(this.xwrhGroups){
        this.xwrhGroups.clearOverlays()
      }
      if(this.xwrhGroups1){
        this.xwrhGroups1.clearOverlays()
      }
      let linesearch = new AMap.LineSearch({
        pageIndex: 1,
        city: '上海',
        pageSize: 1,
        extensions: 'all'
      });

      linesearch.search(busLineName, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {


          let busPolyline = new AMap.Polyline({
            // map: this.M_map,
            path: result.lineInfo[0].path,
            strokeColor: item.color,//线颜色
            strokeOpacity: 0.8,//线透明度
            isOutline: true,
            outlineColor: item.color,
            zIndex: 100,
            strokeWeight: 1//线宽
          });


        let datas = result.lineInfo[0].via_stops
        let markers = []
        datas.forEach(iteam => {
          var marker = new AMap.Marker({
            position: iteam.location,
            icon: new AMap.Icon({
              image: require('../../assets/image/icon_dt.png'),
              size: [16, 16],
              imageSize: [16, 16],
            }),
            offset: new AMap.Pixel(-8, -16),
            extData: iteam,
            cursor: 'pointer',
          })
          marker.on('click', (e) => {
            if(this.xwrhGroups1){
              this.xwrhGroups1.clearOverlays()
            }
            this.M_map.setFitView(marker, true, [150, 240, 60, 60]);
            let stationKeyWord=e.target.getExtData().name+'(地铁站)'
            this.station.search(stationKeyWord, (status, resd) => {
              if (status === 'complete' && resd.info === 'OK') {
                resd.stationInfo[1].buslines.forEach(itm=>{

                  linesearch.search(itm.name, (status, lida) => {

                    if (status === 'complete' && lida.info === 'OK') {

                                    
                        let busPolyline1 = new AMap.Polyline({
                          // map: this.M_map,
                          path: lida.lineInfo[0].path,
                          strokeColor:"#00FFFF",//线颜色
                          strokeOpacity: 0.8,//线透明度
                          isOutline: true,
                          outlineColor: "#00FFFF",
                          zIndex: 100,
                          strokeWeight: 1//线宽
                        });

                        this.xwrhGroups1.addOverlay(busPolyline1)
                        this.M_map.add(this.xwrhGroups1)

                    }

                  })



                })
               
              }
            });
          })
          markers.push(marker)
        })
        this.xwrhGroups.addOverlay(busPolyline)
        this.xwrhGroups.addOverlays(markers)

        this.M_map.add(this.xwrhGroups)






         

        } 
      });

    },
    lineSearch(busLineName, type, item) {

      let linesearch = new AMap.LineSearch({
        pageIndex: 1,
        city: '上海',
        pageSize: 1,
        extensions: 'all'
      });
      linesearch.search(busLineName, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          if (type == 2) {
            this.M_metroLine(result, item, type)
          } else if (type == 3) {

            this.M_metroLine(result, item, type)
            this.lineSearch_Callback(result, type);
          } else {
            this.lineSearch_Callback(result);
          }

        } else {

        }
      });

    },

    lineSearch_Callback(data, type) {
      var lineArr = data.lineInfo;
      var lineNum = data.lineInfo.length;
      if (lineNum == 0) {
      } else {

        let datas = data.lineInfo[0].via_stops
        this.markers = []
        datas.forEach(iteam => {
          var marker = new AMap.Marker({
            position: iteam.location,
            icon: new AMap.Icon({
              image: type == 3 ? require('../../assets/image/icon_dt.png') : require('../../assets/image/orange1.png'),
              size: [16, 16],
              imageSize: [16, 16],
            }),
            offset: new AMap.Pixel(-8, -16),
            extData: iteam,
            cursor: 'pointer',
          })
          let marker1 = new AMap.Marker({ content: ' ', map: this.M_map, offset: new AMap.Pixel(0, -20) });
          marker.on('mouseover', (e) => {
            marker1.setPosition(e.target.getPosition());
            marker1.setLabel({ content: `<div style='color:rgba(26, 66, 118, 1)'>${e.target.getExtData().name}</div>` })
          });
          marker.on('mouseout', (e) => {
            marker1.setPosition(e.target.getPosition());
            marker1.setLabel({ content: null })
          });
          if (type == 3) {
            marker.on('click', (e) => {
              this.M_station(e.target.getExtData().name)
            })
          }
          this.markers.push(marker)
        })
        this.overlayGroups.addOverlays(this.markers)
        this.M_map.add(this.overlayGroups);

      }
    },
    M_station(stationKeyWord) {
      this.station.search(stationKeyWord, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          this.stationSearch_CallBack(result);
        } else {

        }
      });

    },
    stationSearch_CallBack(searchResult) {
      var stationArr = searchResult.stationInfo;
      var searchNum = stationArr.length;
      if (searchNum > 0) {
      }
    },

    M_metroLine(data, item, type) {
      var lineArr = data.lineInfo;
      var lineNum = data.lineInfo.length;
      if (lineNum == 0) {
      } else {
        let busPolyline = new AMap.Polyline({
          // map: this.M_map,
          path: lineArr[0].path,
          strokeColor: item.color,//线颜色
          strokeOpacity: 0.8,//线透明度
          isOutline: true,
          outlineColor: item.color,
          zIndex: 100,
          strokeWeight: 1//线宽
        });
        if (type == 3) {
          this.M_map.setFitView(busPolyline, true, [150, 240, 60, 60]);
        }
        this.meroGroups.addOverlay(busPolyline)
        this.M_map.add(this.meroGroups);
      }
    },
    //辅助决策绘制的线路
    M_BUSLINE(data, type) {

      if(this.hclayer){
        this.hcloca.remove(this.hclayer)
      }
      
      let lineArr = []

      data.forEach(iteam => {
        let color=""
        if(type==10){ 
          if((iteam.coefficient)>1.5){
            color='#D53838'
          }else{
            color='#3EAABA'
          }
        }
        if(type==11){ 
          if(Number(iteam.coefficient)>0.5){
            color='#D53838'
          }else{
            color='#3EAABA'
          }
        }
        if(type==16){ 
          if(Number(iteam.lineLength)>30){
            color='#D53838'
          }else{
            color='#3EAABA'
          }
        }
        if(type==17){ 
          if(Number(iteam.mzl)>69){
            color='#D53838'
          }else{
            color='#3EAABA'
          }
        }
        if(type==19){ 
          if((iteam.baipass)<31){
            color='#D53838'
          }else if((iteam.baipass)<61&&(iteam.baipass)>30){
            color='#e5d887'
          }else if((iteam.baipass)<101&&(iteam.baipass)>60){
            color='#f06f59'
          }else{
            color='#3EAABA'
          }
        }
        let busPolyline = new AMap.Polyline({
          map: this.M_map,
          path: type == 2 ? iteam : iteam.geom,
          strokeColor: color,//线颜色
          strokeOpacity: 0.8,//线透明度
          zIndex: 100,
          cursor: 'pointer',
          extData: iteam,
          strokeWeight: 2//线宽
        });
        lineArr.push(busPolyline)
        if (type == 3) {
          let busPolyline2 = new AMap.Polyline({
            map: this.M_map,
            path: [iteam.geom[0], iteam.geom[iteam.geom.length - 1]],
            strokeColor: '#A200FF',//线颜色
            strokeOpacity: 0.8,//线透明度
            zIndex: 100,
            cursor: 'pointer',
            extData: iteam,
            strokeWeight: 4//线宽
          });


          let marker = new AMap.Marker({ content: ' ', map: this.M_map });
          busPolyline.on('mouseover', (e) => {
            let str = e.target.getExtData()
            let num = Math.round(e.target.getPath().length / 2)
            let position = e.target.getPath()[num]
            marker.setPosition(position);
            marker.setLabel({
              content: `
              <div style='color:rgba(26, 66, 118, 1)'>
               <div>线路长度：${str.realDistance.toFixed(2)}km</div>
               <div>非直线系数：${str.coefficient.toFixed(2)}</div>
              </div>`
            })
          });
          busPolyline.on('mouseout', (e) => {
            let num = Math.round(e.target.getPath().length / 2)
            let position = e.target.getPath()[num]
            marker.setPosition(position);
            marker.setLabel({ content: null })
          });
          busPolyline2.on('mouseover', (e) => {
            let str = e.target.getLength()
            let position = e.target.getPath()[0]
            marker.setPosition(position);
            marker.setLabel({
              content: `
              <div style='color:rgba(26, 66, 118, 1)'>
               <div>线段长度：${str}m</div>
              </div>`
            })
            busPolyline2.on('mouseout', (e) => {
              let position = e.target.getPath()[0]
              marker.setPosition(position);
              marker.setLabel({ content: null })
            });
          });


        }
      })

      this.M_map.setFitView(lineArr, true,[0,0,0,0])
      // this.M_map.setZoom(11)
    },
    M_ishow(flag, type) {
      if (type == 2) {
        flag ? this.meroGroups.show() : this.meroGroups.hide()
      } else {
        flag ? this.layer.show() : this.layer.hide()
      }
    },
    M_ismeclea() {
      this.meroGroups.clear()
    },
    M_setPath(pathArr) {
      this.busPolyline1.setPath(pathArr)
      if (this.polyEditor) {
        this.polyEditor.close();
      }

    },
    M_closepoly() {
      this.polyEditor.close();
      return this.busPolyline1.getPath()
    },
    M_remove() {
      if (this.busPolyline) {
        this.M_map.remove([this.busPolyline1, this.busPolyline])
        this.M_map.remove(this.markers)
        if (this.polyEditor) {
          this.polyEditor.close();
        }
      }
    },
    //线网现状规划
    M_linxz(){

      let busPolyline2 = new AMap.Polyline({
        map: this.M_map,
        path: geom,
        strokeColor: '#A200FF',//线颜色
        strokeOpacity: 0.8,//线透明度
        zIndex: 100,
        cursor: 'pointer',
        extData: iteam,
        strokeWeight: 4//线宽
      });


    },
    // 获取搜索信息
    M_autoInput(data) {
      this.M_map.clearMap()
      let markerarr = []
      data.forEach(iteam => {
        var placeSearch = new AMap.PlaceSearch({
          city: '全国'
        });
        placeSearch.search('上海市' + iteam.roadsegid, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          if (result.poiList.pois[0]) {
            this.pointSearch(result.poiList.pois[0], iteam)
          }

        })



      })
      // 


    },

    pointSearch(row, data) {
      // Myanmation = new Anmation({
      //   center: [row.location.lng, row.location.lat],
      //   color: {
      //     fillColor: "#b40100",
      //     fillOpacity: 0.7
      //   }
      // });
      // this.M_map.add(Myanmation.circleGroup)
      let marker1 = new AMap.Marker({
        content: `<div style='width:12px;height:12px;border-radius:50%;background:#b40100'></div> `,
        offset: new AMap.Pixel(-6, -6),
        extData: data,
        zIndex: 5000,
        cursor:'pointer',
        position: [row.location.lng, row.location.lat],
      });
      marker1.on('click', e => {
        this.$fetchGet("curve/detail", {
          roadName: data.roadsegid
        }).then(res => {
          this.M_openRoad(row.location, res)
        })

      })
     
      this.markerarr.push(marker1)

      this.overlayGroups3.addOverlay(marker1)
      this.M_map.add(this.overlayGroups3);

    },
    M_searroad(name, res) {
      let arr = this.overlayGroups3.getOverlays()
      arr.forEach(iteam => {
        if (iteam.getExtData().roadsegid == name) {
          this.M_openRoad(iteam.getPosition(), res)
        }
      })
    },
    M_openRoad(position, res) {
      let infoWin = `<div class="info-win">
      <div class="win-triangle"></div>
      <div class="info-box">
        <div class="info-content">
          <div class="info">
            <div class="info-name">${res.result.description}</div>
          </div>
        </div>
      </div>
    </div>`
      this.M_openInfoWin([position.lng, position.lat], infoWin)
      this.M_map.setZoomAndCenter(16, [position.lng, position.lat],true)
      this.$store.commit('SET_LOADING', false)

    },


    // 打开信息窗口
    M_openInfoWin(pos, info) {
      this.M_InfoWindow.setContent(info)
      this.M_InfoWindow.open(this.M_map, pos)
    },
    M_openInfoWin1(pos, info) {
      this.M_InfoWindow.setContent(info)
      this.M_InfoWindow.setAnchor('bottom-center')
      this.M_InfoWindow.open(this.M_map, pos)
    },
    // 关闭信息窗
    M_closeInfoWin() {

      this.M_InfoWindow.close()
    },
    //公交专用道
    M_passCorrline(data) {
      let datalin = []
      data.forEach(iteam => {
        let kyLinedata = new AMap.Polyline({
          path: iteam.path,
          strokeColor: "#BE7322",
          strokeOpacity: 1,
          strokeWeight: 4,
          cursor: 'pointer',
          strokeStyle: "solid",
          zIndex: 30,
          map: this.M_map,
          extData: iteam
        })

        kyLinedata.on('click', (e) => {
          let srt = e.target.getExtData()
          this.S_setbulne(srt)
        
        });

        datalin.push(kyLinedata)
      })

      this.M_map.setFitView(this.datalin, true, [60, 200, 60, 60]);
      //  

    },
    S_setbulne(srt){

      let num = Math.floor((srt.path.length) / 2)

      let infoWin = `<div class="info-win">
        <div class="win-triangle"></div>
        <div class="info-box">
          <div class="info-content">
            <div class="info">
              <div class="info-name">名称：${srt.name}</div>
            </div>
            <div class="info">
              <div class="info-name">里程：${srt.length}km</div>
            </div>
            <div class="info">
              <div class="info-name">备注：${srt.remark == undefined ? '无' : ''}</div>
            </div>
            <div class="info">
              <div class="info-name">线路条数：${srt.lineNumber}</div>
            </div>
          </div>
        </div>
      </div>`
      this.M_openInfoWin(srt.path[num], infoWin)
      // this.M_map.setZoomAndCenter(16,srt.path[num],true)

    },
    M_addPolygon(data,data1) {
      let polygon = new AMap.Polygon({
        path: data,
        fillColor: '#ccebc5',
        strokeOpacity: 1,
        fillOpacity: 0.5,
        strokeColor: '#A200FF',
        strokeWeight: 4,
        strokeDasharray: [5, 5],
        map:this.M_map,
        zIndex:100
      });

     
      // var polygon = new AMap.Polygon({
      //   pathL:[data,data1],
      //   strokeColor: '#00eeff',
      //   strokeWeight: 1,
      //   fillColor: '#71B3ff',
      //   fillOpacity: 0.5
      // });
      // polygon.setPath([data,data1]);
      // this.M_map.add(polygon)
    },
    M_drawPolygon () {
      this.mouseTool.polygon({
        strokeColor: "#FF33FF", 
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillColor: '#1791fc',
        fillOpacity: 0.4,
        // 线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        // strokeDasharray: [30,10],
      })


      this.mouseTool.on('draw', (event)=> {
        // event.obj 为绘制出来的覆盖物对象
        
        
      })
    },
    M_formattingCharacters (val) {
      let arr = val
      arr.push(val[0]);
      let arr1 = [];
      let arr2;
      arr.forEach((iteam, index) => {
        arr1.push(iteam.lng + ' ' + iteam.lat)
      })
      arr2 = arr1.join(',')
      let arr3 = `POLYGON((${arr2}))`
      return arr3

    },
    M_setTypedata(row){
      let str = row.replace("POLYGON((", "");
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
    //实时运营车辆里面街镇的数据
    M_createPolygon(data){

      data.forEach(iteam=>{
        let polygonLine = new AMap.Polygon({
          path: this.M_setTypedata(iteam.polygonGeom),
          cursor: "pointer",
          strokeColor: "#00B2CA",
          strokeWeight: 2,
          bubble :true,
          strokeOpacity: 1,
          fillOpacity:0.2,
          zIndex: 10,
        })
        let markarea = new AMap.Marker({
          position: [iteam.centerLongitude,iteam.centerLatitude],
          // 将 html 传给 content background: url(icon) url(${iconm})
          content: `<div class="regionMark" style="background:#00B2CA">
            <div style="font-weight: bold;margin-bottom:12px"> ${iteam.regionName}</div>
             <div>${iteam.avgIndex}min/km</div>
             <div> ${iteam.avgSpeed}km/h</div>
            </div>`,
          // 以 icon 的 [center bottom] 为原点
          offset: new AMap.Pixel(-13, -30),
          zIndex: 10,
          cursor: 'pointer',
          extData: iteam,
        })

        this.realTownGroups.addOverlay(polygonLine)
        this.realTownGroups.addOverlay(markarea)
        this.M_map.add(this.realTownGroups)
        // this.realTownGroups.hide()
        
      })
      this.M_map.setZoomAndCenter(15,[121.515414,31.2331])



    },
    M_crealinebus(iteam,type){
      // data.forEach(iteam => {
       
       
      // })

      if(this.xwrhGroups2){
        this.xwrhGroups2.clearOverlays()
      }
      

      let kyLinedata = new AMap.Polyline({
        path: iteam.geom,
        strokeColor: "#00FFFF",
        strokeOpacity: 1,
        strokeWeight: 4,
        cursor: 'pointer',
        zIndex: 50,
        strokeStyle: "solid",
        extData: iteam
      })
     
      kyLinedata.on('click', (e) => {
        let srt = e.target.getExtData()
        let num = Math.floor((srt.geom.length) / 2)
        let infoWin=''
        if(type==2){

          infoWin = `<div class="info-win">
          <div class="win-triangle"></div>
          <div class="info-box">
            <div class="info-content">
              <div class="info">
                <div class="info-name">线路名称名称：${srt.routeName}</div>
              </div>
            </div>
          </div>
        </div>`

        }else{
          infoWin = `<div class="info-win">
          <div class="win-triangle"></div>
          <div class="info-box">
            <div class="info-content">
              <div class="info">
                <div class="info-name">线路名称名称：${srt.routeName}</div>
              </div>
              <div class="info">
                <div class="info-name">平均车速：${srt.avgSpeed}km/h</div>
              </div>
              <div class="info">
                <div class="info-name">平均畅行指数：${srt.avgIndex}min/km</div>
              </div>
              <div class="info">
                <div class="info-name">平均车速稳定性：${srt.exchange}</div>
              </div>
              <div class="info">
                <div class="info-name">平均运行准点率：${srt.rightOnTime}%</div>
              </div>
            </div>
          </div>
        </div>`
        }
        this.M_map.setZoomAndCenter(12,srt.geom[num],true)
        this.M_openInfoWin(srt.geom[num], infoWin)
        
      });


      kyLinedata.on('mouseover', (e) => {


        e.target.setOptions({
          strokeColor: "#A200FF",
          zIndex: 500,
        })
      })
      kyLinedata.on('mouseout', (e) => {
        e.target.setOptions({
          strokeColor: "#00FFFF",
          zIndex: 50,
        })
        // this.M_closeInfoWin()

      })


      this.realbusGroups.addOverlay(kyLinedata)
      this.M_map.add(this.realbusGroups)
      // this.realbusGroups.hide()
      
    },

      // 实施运营的分布规律
      M_addPoint1(data,type) {
      
        let markers = []
        data.forEach(iteam => {
          const marker = new AMap.Marker({
            position: type==2?iteam.lnglat:[iteam.lng, iteam.lat],
            offset: new AMap.Pixel(-9, -9),
            topWhenClick: true,
            icon: new AMap.Icon({
              size: new AMap.Size(18, 18),
              image: require('../../assets/image/alpoint1.png'),
              imageSize: new AMap.Size(18, 18)
            }), // 添加 Icon 图标 URL
            extData: iteam
          })
          markers.push(marker)
  
          this.overlayGroupsgl.addOverlays(markers)
          this.M_map.add(this.overlayGroupsgl)
          this.M_map.setFitView(this.markers, true, [60, 200, 60, 60]);
  
        })
  
      },
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
              fillOpacity: 0.5
          });
          polygon.setPath(pathArray);
          this.M_map.add(polygon)
      })
    
    }
    
  }
}

export default Map
