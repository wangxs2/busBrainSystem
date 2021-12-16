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
      kymassnew:new AMap.OverlayGroup(),//的点
      lcalzd:null,
      linegjxlw:null,
      layerzd:null,//站点的客流
      pathSimplifierIns:null,//公交线网
      heatmap:null,//热力图
      // 信息窗口
      M_InfoWindow: null,
      polygonLine:null,//行政区域的范围
      massall1: null,
      plfive:null,
      plthree:null,
      kyLineOver:new AMap.OverlayGroup(),//的线
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
        viewMode: '3D',
        zoom: 10, // 地图级别
        center: this.M_center, // 中心点
        resizeEnable: true, // 监控地图容器尺寸变化
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
      })

      this.lcalzd = new Loca.Container({
          map: this.M_map,
      });

      // this.M_map.plugin(["AMap.HeatMap"],  ()=> {      //加载热力图插件
      //   this.heatmap = new AMap.HeatMap(this.M_map, {
      //       opacity: [0, 0.8], 
      //       gradient: {
      //           0.5: '#3EFF8F',
      //           0.65: '#67E8FF',
      //           0.7: '#1CD1FF',
      //           0.9: '#FFEE0E',
      //           1.0: '#FF5E41'
      //       }
      //   }); 
      // })   //在地图对象叠加热力图

     

      this.M_createInfoWin()
      this.allstationin_createInfoWin()
      this.M_map.on('click', (e) => {
        this.M_closeInfoWin()
        this.allstationin_closeInfoWin()
      });
      this.M_zzploy()
    },
   

    



  //查询线路的信息
  lineSearchPudong(busLineName,item) {
    // console.log(busLineName,item,3333)
    let  linesearch;
    //实例化公交线路查询类，只取回一条路线
    if(!linesearch){
        linesearch = new AMap.LineSearch({
            pageIndex: 1,
            city: '上海',
            pageSize: 1,
            extensions: 'all'
        });
    }
    //搜索“536”相关公交线路
    linesearch.search(busLineName, (status, result)=> {
        if (status === 'complete' && result.info === 'OK') {
            // lineSearch_Callback(result);
            // console.log(result)
            this.xwyhModelLine(result.lineInfo[0].path,item)
        } else {
            // alert(result);
        }
    });
  },

  

  //绘制上南路
  gjxlwmsg(path,item){
    // console.log(11111)
    
    this.linegjxlw = new AMap.Polyline({
      path: path,
      strokeColor:'#d80304',
      strokeOpacity: 1,
      strokeWeight: 10,
      zIndex:9999,
      map:this.M_map,
      strokeStyle: "solid",
    })

    this.M_map.setFitView(this.linegjxlw,true)

  },
  

  //绘制线网优化页面公交线路
  xwyhModelLine(path,item){
    // console.log(11111)
    
    this.linegjxlw = new AMap.Polyline({
      path: path,
      strokeColor: item.lineColor,
      strokeOpacity: 1,
      strokeWeight: 5,
      zIndex:9999,
      map:this.M_map,
      strokeStyle: "solid",
    })

    this.M_map.setFitView(this.linegjxlw,true)

  },
  snmhx(arr){

    arr.forEach(iteam=>{
      if(iteam.path){
        let libug=new AMap.Polyline({
          path: this.TestsetData(iteam.path,2),
          strokeColor: iteam.colors,
          strokeOpacity: 1,
          strokeWeight: 8,
          zIndex:10,
          map:this.M_map,
          strokeStyle: "solid",
        })
      }
      
      
      
    })

    this.M_map.setZoomAndCenter(13,[121.497673,31.161305])
    

  },

  //绘制所有的公交线路
  alllinepo(arr,type){
    let lir=[]
    if(this.kyLineOver){
      this.kyLineOver.clearOverlays()
    }
    arr.forEach(iteam=>{
      if(iteam.geom){
        let libug=new AMap.Polyline({
          path: this.Q_setData(iteam.geom),
          strokeColor: type==2?iteam.colors:type!==2&&iteam.company=='浦东公交'?"#00ffff":'#35a700',
          strokeOpacity: 1,
          strokeWeight: 4,
          zIndex:10,
          cursor:'pointer',
          // map:this.M_map,
          strokeStyle: "solid",
        })
        var text=null
        libug.on('mouseover',e=>{
          // console.log(e)

           text = new AMap.Text({
              text:iteam.name,
              anchor:'center', // 设置文本标记锚点
              draggable:true,
              cursor:'pointer',
              // angle:10,
              style:{
                  'padding': '0.05rem 0.05rem',
                  'margin-bottom': '1rem',
                  'border-radius': '0.25rem',
                  'background-color': 'white',
                  'width': '1rem',
                  'border-width': 0,
                  'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
                  'text-align': 'center',
                  'font-size': '20px',
                  'color': 'blue'
              },
              position: e.target.getPath()[2]
          });
      
          text.setMap(this.M_map);
        })
        libug.on('mouseout',e=>{
          this.M_map.remove(text)

        })
        lir.push(libug)
      }
      
      
      
    })
    this.kyLineOver.addOverlays(lir)
      this.M_map.add(this.kyLineOver)
    

  

  },

  //绘制所有的站点
  allstation(arr,type){

    let lir=[]
    // if(this.kymassnew){
    //   this.kymassnew.clearOverlays()
    // }
    arr.forEach(iteam=>{
      if(iteam.lnglat){
        let libug=new AMap.Marker({
          position: iteam.lnglat,
          icon: new AMap.Icon({
            image: iteam.type==1?require('../../assets/image/icon_dt.png'):require('../../assets/image/icon_gj1.png'),
            size: [24, 24],
            imageSize: [24, 24],
          }),
          offset: new AMap.Pixel(-12, -12),
          extData: iteam,
          cursor: 'pointer',
        })
        libug.on('click',e=>{
          // this.iszd=true
          // this.detailobj=e.target.getExtData()
          if(e.target.getExtData().type==1){
            this.toDetail(e.target.getExtData())
          }
          if(type==5){
            this.toDetail(e.target.getExtData(),5)
          }
        })
        lir.push(libug)
      }
      
      
      
    })
    this.kymassnew.addOverlays(lir)
      this.M_map.add(this.kymassnew)

  },


  //绘制所有的站点
  allstation1(arr){

    let lir=[]
    // if(this.kymassnew){
    //   this.kymassnew.clearOverlays()
    // }
    arr.forEach(iteam=>{
      if(iteam.lnglat){
        let icons=null
        if(iteam.nxb>0&&iteam.nxb<4){
          icons= new AMap.Icon({
            image:require('../../assets/image/rollbig.png'),
            size: [20, 20],
            imageSize: [20, 20],
          })
        }else if(iteam.nxb>3&&iteam.nxb<7){
          icons= new AMap.Icon({
            image:require('../../assets/image/rollbig.png'),
            size: [25, 25],
            imageSize: [25, 25],
          })
        }else if(iteam.nxb>6&&iteam.nxb<9){
          icons= new AMap.Icon({
            image:require('../../assets/image/rollbig.png'),
            size: [30, 30],
            imageSize: [30, 30],
          })
        }else if(iteam.nxb>8&&iteam.nxb<13){
          icons= new AMap.Icon({
            image:require('../../assets/image/rollbig.png'),
            size: [35, 35],
            imageSize: [35, 35],
          })
        }else if(iteam.nxb>12){
          icons= new AMap.Icon({
            image:require('../../assets/image/rollbig.png'),
            size: [40, 40],
            imageSize: [40, 40],
          })
        }
        // console.log(iteam)
        let libug=new AMap.Marker({
          position: iteam.lnglat,
          icon: icons,
          offset: new AMap.Pixel(-12, -12),
          extData: iteam,
          cursor: 'pointer',
        })
        libug.on('click',e=>{
          this.iszd=true
          this.detailobj=e.target.getExtData()
          // console.log(this.detailobj)
          this.toDetail(this.detailobj)
          this.allstationin_openInfoWin([this.detailobj.lnglat[0],this.detailobj.lnglat[1]],this.detailobj)  
          this.M_openInfoWin(this.detailobj)
          
        })
        // libug.on('mouseover',e=>{
        // })
        // libug.on('mouseout',e=>{
        //  this.allstationin_closeInfoWin()

        // })
        lir.push(libug)
      }
      
      
      
    })
    this.kymassnew.addOverlays(lir)
      this.M_map.add(this.kymassnew)

  },

   // 创建站点窗口
  allstationin_createInfoWin(data) {
    // console.log(data)
    this.allstationin_InfoWindow = new AMap.InfoWindow({
      isCustom: true,
      autoMove: true,
      content: '',
      anchor: 'top-left',
      offset: new AMap.Pixel(30,-8)
    })
  },

 // 打开站点信息窗口
  allstationin_openInfoWin(pos, info) {
    // console.log(pos)
    
    let kcontent=  `<div class="info-win-sition">
    <div class="info-name">${info.name}</div>
</div>`
    this.allstationin_InfoWindow.setContent(kcontent)
    this.allstationin_InfoWindow.open(this.M_map, pos)
  },
    
  // 关闭站点信息窗
  allstationin_closeInfoWin() {

    this.allstationin_InfoWindow.close()
  },



 

  // 关闭信息窗
  M_closeInfoWin() {

    this.M_InfoWindow.close()
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
            fillOpacity: 0.05
        });
        polygon.setPath(pathArray);
        this.M_map.add(polygon)
    })
  
  },
   //300米和500米的覆盖面积
   radiusmsfive(datapoint){

    if(this.plfive){
      this.lcalzd.remove(this.plfive)
    }
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

    this.plfive = window.pl = new Loca.PointLayer({
        zIndex: 10,
        blend: 'lighter' //lighter normal
    });

    this.plfive.setSource(geo);
    this.plfive.setStyle({
        radius: 500,
        color: 'rgba(26, 66, 118, 0.6)',
        borderWidth: 0,
        blurRadius: -1,
        unit: 'meter',
    });
    this.lcalzd.add(this.plfive);

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
    M_openInfoWin(pos,info) {
      this.M_InfoWindow.setContent(info)
      this.M_InfoWindow.open(this.M_map, pos)
    },
 
    
  }
}

export default Map
