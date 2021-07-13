// const areasIcon = require('@img/map/icon_0_1@3x.png')

const Map = {
  data () {
    return {
      // 地图实例
      M_map: null,
      // 地图中心点
      M_center: [121.460752,31.011182],
      M_peopleColors: {},
      // 地图样式
      M_style: 'amap://styles/d67717253a691e523956e9482ca38f1e',
      // 覆盖物点组
      M_pointGroup: null,
      M_pointEvent: [],
      // 信息窗口
      M_InfoWindow: null,
      busPolyline: null,
      busPolyline1: null,
      massall: null,
      polyEditor:null,
      layer:null,
      geocoder:null,//逆地址解析
      markers:[],
      overlayGroups: new AMap.OverlayGroup(),//调整方案站点集合
      meroGroups: new AMap.OverlayGroup(),//地铁线路的集合
      nework:{
      }

    }
  },
  methods: {
    // 处理颜色
    M_disColor (adcode) {
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
    M_initChinaMap (el) {
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
            // console.log(props)
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
        mapStyle:'amap://styles/d67717253a691e523956e9482ca38f1e',
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
        // zooms: [3, 10],
        // showIndoorMap: false,
        // zoom: 3.8,
        // isHotspot: false,
        // defaultCursor: 'pointer',
        // touchZoomCenter: 1,
        // pitch: 0,
        // center: [104.921028, 38.644977],
        // layers: [
        //   customLayer,
        //   disCountry
        // ],
        // viewMode: '3D',
        // resizeEnable: true
      })
    },
    // 初始化小镇地图
    M_initMap (el) {
      this.M_map = new AMap.Map(el, {
        mapStyle: this.M_style, // 自定义地图样式
        // pitch: 50, // 俯仰角度，默认0，[0,83]，2D地图下无效
        // viewMode: '3D',
        zoom: 10, // 地图级别
        center: this.M_center, // 中心点
        resizeEnable: true, // 监控地图容器尺寸变化
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
      })
      this.M_pointGroup = new AMap.OverlayGroup()
      this.M_map.add(this.M_pointGroup)
      this.M_createInfoWin()
      
      this.M_map.on('click', (e) => {
        // console.log(e.lnglat.getLng(),e.lnglat.getLat())
        this.M_regeoCode([e.lnglat.getLng(),e.lnglat.getLat()])
      });
      this.geocoder = new AMap.Geocoder({
          city: "", //城市设为北京，默认：“全国”
          radius:10, //范围，默认：500
          extensions:'all'
      });
        // 创建 AMap.LabelsLayer 图层
        this.layer = new AMap.LabelsLayer({
          zooms: [3, 20],
          zIndex: 1000,
          collision: false
      });
    },
    // 设置重点区域名称标注
    M_setAreasPoint (data) {
      const marker = new AMap.Marker({
        position: data.centre,
        offset: new AMap.Pixel(-13, -17),
        topWhenClick: true,
        icon: new AMap.Icon({
          size: new AMap.Size(26, 34),
          // image: areasIcon,
          imageSize: new AMap.Size(26, 34)
        }), // 添加 Icon 图标 URL
        label: {
          content: `<div class="label-style">${data.name}</div>`,
          direction: 'right' // 设置文本标注方位
        },
        map: this.M_map
      })

      return marker
    },
    // 设置小镇重点区
    M_setAreas (data) {
      const Polygon = new AMap.Polygon({
        path: data.path, // 点集合
        fillColor: 'red', // 多边形填充颜色
        fillOpacity: 0.2, // 填充颜色
        strokeColor: 'red', // 线条颜色
        strokeWeight: 2, // 线条宽度，默认为 1
        map: this.M_map
      })
      this.M_setAreasPoint(data)
      return Polygon
    },
    // 设置边界
    M_setTownPath (path) {
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
        
        this.geocoder.getAddress(lnglat, (status, result)=> {
            if (status === 'complete'&&result.regeocode) {
                var address = result.regeocode.formattedAddress;
                console.log(result)
                // document.getElementById('address').value = address;
            }else{
            }
        });
    },
  
    // 添加点
    M_addPoint (data, icon, name) {
      const marker = new AMap.Marker({
        position: data.position,
        offset: new AMap.Pixel(-12, -12),
        topWhenClick: true,
        icon: new AMap.Icon({
          size: new AMap.Size(24, 24),
          image: icon,
          imageSize: new AMap.Size(24, 24)
        }), // 添加 Icon 图标 URL
        extData: data
      })
      marker.TypeName = name

      return marker
    },
    // 修改组
    M_upDateGroup (index, points) {
      const group = this.M_pointGroup.getOverlays()[index]
      group.clearOverlays()
      group.addOverlays(points)
      if (this.lengthSelect === 5 || this.lengthSelect === '') {
        group.show()
      } else {
        group.hide()
      }
    },
    // 分组添加到组
    M_addGroup (points) {
      const group = new AMap.OverlayGroup()
      // group.type = type
      group.addOverlays(points)
      this.M_pointGroup.addOverlay(group)
    },
    // 添加点事件
    M_addGroupEvent (callback) {
      this.M_pointEvent.forEach((item) => {
        AMap.event.removeListener(item)
      })

      this.M_pointEvent = []

      let flag = ''

      this.M_pointEvent.push(
        AMap.event.addListener(this.M_pointGroup, 'mousemove', (e) => {
          const ExtData = e.target.getExtData()
          const name = ExtData.name
          const TypeName = e.target.TypeName

          if (TypeName === '视频监控') return

          if (flag !== name) {
            callback && callback(TypeName, ExtData)
            flag = name
          }
        })
      )
      this.M_pointEvent.push(
        AMap.event.addListener(this.M_pointGroup, 'mouseout', (e) => {
          this.M_closeInfoWin()
          flag = ''
        })
      )

      this.M_pointEvent.push(
        AMap.event.addListener(this.M_pointGroup, 'click', (e) => {
          const ExtData = e.target.getExtData()
          const TypeName = e.target.TypeName

          if (TypeName !== '视频监控') return

          callback && callback(TypeName, ExtData)
          this.M_closeInfoWin()
          flag = ''
        })
      )
    },
    // 设置地图中心点和缩放级别 coord 数组
    M_setZoomAndCenter (coord, zoom = 15) {
      this.M_map.setZoomAndCenter(zoom, coord)
    },
    // 操作组
    M_handleGroup (index) {
      if (index === false) {
        this.M_pointGroup.show()
      } else {
        this.M_pointGroup.hide()
        const group = this.M_pointGroup.getOverlays()[index]
        group && group.show()
      }
    },
    // 创建窗口
    M_createInfoWin () {
      this.M_InfoWindow = new AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        content: '',
        anchor: 'top-right',
        offset: new AMap.Pixel(-6, -6)
      })
    },
  
    //站点集合
    M_pointAll3(datapoint){
      if(this.massall){
        this.massall.clear()
      }
      var markers = [];
      var icon={
        type: 'image',
        image: require('../../assets/image/alpoint1.png'),
        size: [11, 11],
        anchor: 'bottom-center',
      }
      var normalMarker = new AMap.Marker({
          anchor: 'bottom-center',
          offset: [0, -15],
      });
      datapoint.forEach(iteam=>{

        var curPosition = iteam.lnglat;
        var curData = {
            position: curPosition,
            extData:iteam.stationName,
            icon
        };

        var labelMarker = new AMap.LabelMarker(curData);

        markers.push(labelMarker);

        // 给marker绑定事件
        labelMarker.on('mouseover', (e)=>{
          var position = e.target.getExtData();
          if(position){
              normalMarker.setContent(
                  '<div class="amap-info-window">'
                      + position +
                      '<div class="amap-info-sharp"></div>' +
                  '</div>');
              normalMarker.setPosition(e.target.getPosition());
              this.M_map.add(normalMarker);
          }
      });

      labelMarker.on('mouseout', ()=>{
        this.M_map.remove(normalMarker);
      });

      })
      this.layer.add(markers);
      this.M_map.add(this.layer);
      this.layer.hide()
      // let style = [
      //   {
      //     url: require('../../assets/image/alpoint1.png'),
      //     anchor: new AMap.Pixel(6, 6),
      //     size: new AMap.Size(11, 11),
      //     zIndex: 20,
      //   }];
      // console.log(datapoint)
      // this.massall = new AMap.MassMarks(datapoint, {
      //     opacity: 0.8,
      //     cursor: 'pointer',
      //     style: style[0]
      // });
      // this.massall.setMap(this.M_map);
      // let marker = new AMap.Marker({content: ' ', map: this.M_map});
      // this.massall.on('mouseover',  (e)=> {
      //     marker.setPosition(e.data.lnglat);
      //     marker.setLabel({content: `<div style='color:rgba(26, 66, 118, 1)'>${e.data.stationName}</div>`})
      // });
      // this.massall.on('mouseout',  (e)=> {
      //     marker.setPosition(e.data.lnglat);
      //     marker.setLabel({content:null})
      // });
      
    },
    M_drawbusLine(BusArr, type) {
      if (this.busPolyline) {
        this.M_map.remove(this.busPolyline)
      }
      if (this.busPolyline1) {
        this.M_map.remove(this.busPolyline1)
      }
      if(this.markers){
        this.overlayGroups.removeOverlays(this.markers)
      }
      if(this.polyEditor){
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
        zIndex:12,
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
        zIndex:10,
        strokeWeight: 10//线宽
      });
      this.M_map.setFitView(this.busPolyline, true, [60, 200, 60, 60]);
      this.polyEditor = new AMap.PolylineEditor(this.M_map, this.busPolyline1,{
      });
      this.polyEditor.setTarget(this.busPolyline1);
      this.polyEditor.open();
    },
    lineSearch(busLineName,type,item){

      let  linesearch = new AMap.LineSearch({
          pageIndex: 1,
          city: '上海',
          pageSize: 1,
          extensions: 'all'
      });
  
      linesearch.search(busLineName, (status, result)=> {
        if (status === 'complete' && result.info === 'OK') {
            if(type==2){
              console.log(result)
              this.M_metroLine(result,item)
            }else{
              this.lineSearch_Callback(result);
            }
           
        } else {
          
        }
      });
  
    },
  
    lineSearch_Callback(data,type) {
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
              image:type==2?require('../../assets/image/icon_dt.png'):require('../../assets/image/orange1.png'),
              size: [16,16],
              imageSize : [16,16],
             }),
            offset: new AMap.Pixel(-8, -16),
            extData:iteam,
            cursor: 'pointer',
          })
          let marker1 = new AMap.Marker({content: ' ', map: this.M_map,offset: new AMap.Pixel(0, -20) });
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
        this.M_map.add(this.overlayGroups);
        
      }
    },
    M_metroLine(data,item){
      var lineArr = data.lineInfo;
      var lineNum = data.lineInfo.length;
      if (lineNum == 0) {
      } else {
        let busPolyline = new AMap.Polyline({
            // map: this.M_map,
            path: lineArr[0].path,
            strokeColor: item.color,//线颜色
            strokeOpacity: 0.8,//线透明度
            isOutline:true,
            outlineColor:item.color,
            zIndex:100,
            strokeWeight: 1//线宽
        });
        this.meroGroups.addOverlay(busPolyline)
        this.M_map.add(this.meroGroups);
    }

    },
    M_ishow(flag,type){
      if(type==2){
        flag ? this.meroGroups.show() : this.meroGroups.hide()
      }else{
        flag ? this.layer.show() : this.layer.hide()
      }
      

    },
    M_ismeclea(){
      this.meroGroups.clear()

    },
    M_setPath(pathArr){
      this.busPolyline1.setPath(pathArr)
      if(this.polyEditor){
        this.polyEditor.close();
      }

    },
    M_closepoly(){
      this.polyEditor.close();
      return this.busPolyline1.getPath()
    },
    M_remove(){
      if(this.busPolyline){
        this.M_map.remove([this.busPolyline1,this.busPolyline])
        this.M_map.remove(this.markers)
        if(this.polyEditor){
          this.polyEditor.close();
        }
      }
    },
    // 打开信息窗口
    M_openInfoWin (pos, info) {
      this.M_InfoWindow.setContent(info)
      this.M_InfoWindow.open(this.M_map, pos)
    },
    // 关闭信息窗
    M_closeInfoWin () {
      this.M_InfoWindow.close()
    }
  }
}

export default Map
