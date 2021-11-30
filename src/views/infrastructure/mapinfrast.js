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
   
      lcalzd:null,
      layerzd:null,//站点的
      M_InfoWindow: null,
      polyEditor :null,
      polylineRoute:null,
     
    

    }
  },
  methods: {
    // 初始化小镇地图
    M_initMap(el) {
      this.M_map = new AMap.Map(el, {
        mapStyle: this.M_style, // 自定义地图样式
        // pitch: 50, // 俯仰角度，默认0，[0,83]，2D地图下无效
        viewMode: '3D',
        zoom: 10, // 地图级别
        center: this.M_center, // 中心点

        resizeEnable: true, // 监控地图容器尺寸变化
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
      })

      this.lcalzd = new Loca.Container({
          map: this.M_map,
      });

      this.mouseTool = new AMap.MouseTool(this.M_map)

     
     

      this.M_createInfoWin()
      this.M_map.on('click', (e) => {
        this.M_InfoWindow.close()
      });
    },

    chlinelin(geom){
      let arr=[]
      geom.split(' ').forEach(item=>{
        arr.push(item.split(','))
      })
      this.polylineRoute = new AMap.Polyline({
        map: this.M_map,
        path: arr,
        strokeColor: '#A200FF',//线颜色
        strokeOpacity: 0.8,//线透明度
        zIndex: 100,
        cursor: 'pointer',
        strokeWeight: 4//线宽
      });

      this.M_map.setFitView(this.polylineRoute, true,[0,0,0,0])
      this.polyEditor = new AMap.PolylineEditor(this.M_map, this.polylineRoute);

    },
    



    maplocalMain(datapoint){
  
    
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
        let geo = new Loca.GeoJSONSource({
            data: data,
        });
        this.layerzd = new Loca.IconLayer({
            zIndex: 60,
            opacity: 1,
        });
        this.layerzd.setSource(geo);
        this.layerzd.setStyle({
            unit: 'px',
            icon:require('../../assets/image/alpoint1.png'),
            iconSize: [11,11],
            rotation: 0,
        })
  
        this.lcalzd.add(this.layerzd);
        this.M_map.on('click', (e) => {
          const feat = this.layerzd.queryFeature(e.pixel.toArray());
          if (feat) {
            let data = feat.properties.rawData;
            this.setConwidow(data)

            if(this.isInputStation){
              this.formLabelAlign.stationCodeList.push(data.messagerecord)
            }
          
          }
      });
  
     
  
    },


    setConwidow(name){

      let kcontent=  `<div class="info-win">
        <div class="win-triangle"></div>
        <div class="info-box">
          <div class="info-content">
            <div class="info">
              <div class="info-name">站点名称： ${name.stationName}</div>
            </div>
          </div>
        </div>
      </div>`
    this.M_openInfoWin(name.lnglat, kcontent)
  
    },


    drawPolyline () {
      this.isInputStation=true
      this.mouseTool.polyline({
        strokeColor: "#3366FF", 
        strokeOpacity: 1,
        strokeWeight: 6,
        // 线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        // strokeDasharray: [10, 5],
      })

      this.mouseTool.on('draw', (event)=> {
        // event.obj 为绘制出来的覆盖物对象
        // log.info('覆盖物对象绘制完成')
        
        this.formLabelAlign.geom=event.obj.getPath()
        
        this.polylineRoute=event.obj

      

        this.polyEditor = new AMap.PolylineEditor(this.M_map, this.polylineRoute);
        this.mouseTool.close()
        this.isInputStation=false
      })
    },


    editPolyline(){
      this.isInputStation=true
      this.polyEditor.setTarget(this.polylineRoute);
      this.polyEditor.open();
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
