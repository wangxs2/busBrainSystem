<template>
  <div class="repetitionRactor" id="alldisplay" ref="fields">
    <div class="search-box">

      <div style="margin-right:0.6vw;" >线路名称</div>
      <el-select style="width:200px" @change="getallsd" size="small" filterable  v-model="value" placeholder="请选择">
        <el-option
          v-for="(item,n) in metrodata"
          :key="n"
          :label="item.routeName"
          :value="item.routeName">
        </el-option>
      </el-select>

 <div style="margin-right:0.6vw;margin-left:0.6vw;" >日期</div>
       <el-date-picker
        v-model="value1"
         size="small"
        type="date"
        @change="getallsd"
        :clearable="false"
        value-format="yyyyMMdd"
        placeholder="选择日期">
        </el-date-picker>
    
      
    </div>
   
   
    
  </div>
</template>

<script>
//综合展示
import MapMixin from '../networkMap'
export default {
  mixins: [MapMixin],
   data(){
        return {
          value:'85路',
        value1:'20191231',
          
        metrodata:[],
        // loca:null,
        // linkLayer:null,
        // labelLayer:null,
        // marker1:null,
        // marker2:null,
        // busPolyline:null,
        // scatterLayer1:null,
        // scatterLayer2:null,
        // linesearch1:null,
        }
    },
    mounted(){
      this.M_initMap('alldisplay')
      this.M_map.setPitch(45)


      // var map = new Indoor.Map('alldisplay',{
      //     key:'37e2d7a58a3f8897326b9b0250254eef',
      //     buildingId:'B00156YKHU'
      // });
      
      // //由于地图数据使用了异步加载，为避免出错请把所有的逻辑放在mapready事件内
      // map.once('mapready',function(){
      //     console.log(map.getFloor());
      // })


    },
    created(){
      this.getData()

      this.getall()
      this.lineSearch(this.value)
    },
    methods:{


     
      getData(){
          this.$fetchGet("route/routeList").then(res => {
            this.metrodata=res.result;
            
          })
      },
    getallsd(){

         if(this.linkLayer){
                        this.hcloca.remove(this.linkLayer)
                        this.M_map.remove(this.labelLayer)
                        this.hcloca.remove(this.scatterLayer1)
                        this.hcloca.remove(this.scatterLayer2)
                        
                    }
        this.getall()
        this.lineSearch(this.value)

    },
      getall(){
          this.$fetchGet("http://180.167.126.126:3005/pos/tbl-pos-txn-nor/odList",{
            date:this.value1,
            lineName:this.value
          }).then(res => {
            this.setoline(res)
            
          })
      },
       lineSearch(busLineName) {

                    if(this.marker1){
                        this.M_map.remove(this.marker1)
                        this.M_map.remove(this.marker2)
                        this.M_map.remove(this.busPolylineod)
                    }

                    
                   
                    //实例化公交线路查询类，只取回一条路线
                    if(!this.linesearch1){
                        this.linesearch1 = new AMap.LineSearch({
                            pageIndex: 1,
                            city: '上海',
                            pageSize: 1,
                            extensions: 'all'
                        });
                    }
                    //搜索“536”相关公交线路
                    this.linesearch1.search(busLineName, (status, result)=> {
                        // map.clearMap()
                        if (status === 'complete' && result.info === 'OK') {
                            this.lineSearch_Callback(result);
                        } else {
                            alert(result);
                        }
                    });
                },

                lineSearch_Callback(data) {
                        var lineArr = data.lineInfo;
                        var lineNum = data.lineInfo.length;
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
                    },

                drawbusLine(startPot, endPot, BusArr) {
                        //绘制起点，终点
                        this.marker1=new AMap.Marker({
                            map: this.M_map,
                            position: startPot, //基点位置
                            icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
                            zIndex: 10,
                            anchor: 'bottom-center',
                        });
                        this.marker2=new AMap.Marker({
                            map: this.M_map,
                            position: endPot, //基点位置
                            icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
                            zIndex: 10,
                            anchor: 'bottom-center',
                        });
                        //绘制乘车的路线
                        this.busPolylineod = new AMap.Polyline({
                            map: this.M_map,
                            path: BusArr,
                            strokeColor: "#ffeb3b",//线颜色
                            strokeOpacity: 0.8,//线透明度
                            isOutline:true,
                            outlineColor:'white',
                            strokeWeight: 6//线宽
                        });
                        // 将 busPolyline 显示在地图中心并自动缩放地图到合适级别。
                        // true表示需要动画过程，[60,200,60,60]表示上下左右避让像素
                        this.M_map.setFitView( this.busPolylineod, true, [60,200,60,60]);
                    
                    
                },
      setoline(testrt){

         
          this.hcloca = new Loca.Container({
            map: this.M_map,
        });

         this.linkLayer = new Loca.LinkLayer({
                        zIndex: 20,
                        opacity: 1,
                        visible: true,
                        zooms: [2, 22],
                    });

                    // 文字图层
                    this.labelLayer = new AMap.LabelsLayer({
                        rejectMapMask: true,
                        collision: true,
                        animation: true,
                    });
                    this.M_map.add(this.labelLayer);

                    //起点
                    this.scatterLayer1 = new Loca.ScatterLayer({
                        zIndex: 10,
                        opacity: 1,
                        visible: true,
                        zooms: [2, 22],
                    });

                    //终点
                    this.scatterLayer2 = new Loca.ScatterLayer({
                        zIndex: 10,
                        opacity: 0.8,
                        visible: true,
                        zooms: [2, 22],
                    });


         console.log(this.hcloca)
         console.log(this.linkLayer)

                   
                   
                    

                   

                    var setLabelsLayer = (testrt) => {
                        this.labelLayer.clear();
                        testrt.forEach((item) => {
                            var labelsMarker = new AMap.LabelMarker({
                                name: item.destinationStation,
                                position: [Number(item.destinationLngLat.split(',')[0]),Number(item.destinationLngLat.split(',')[1])],
                                zooms: [2, 22],
                                opacity: 1,
                                zIndex: 10,
                                text: {
                                    content: item.destinationStation,
                                    direction: 'bottom',
                                    offset: [0, -5],
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 'normal',
                                        fillColor: '#fff',
                                    },
                                },
                            });

                            var labelsMarker1 = new AMap.LabelMarker({
                                name: item.originStation,
                                position: [Number(item.originLngLat.split(',')[0]),Number(item.originLngLat.split(',')[1])],
                                zooms: [2, 22],
                                opacity: 1,
                                zIndex: 10,
                                text: {
                                    content: item.originStation,
                                    direction: 'bottom',
                                    offset: [0, -5],
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 'normal',
                                        fillColor: '#fff',
                                    },
                                },
                            });
                            this.labelLayer.add(labelsMarker);
                            this.labelLayer.add(labelsMarker1);
                        });
                    
                    };

                    setLabelsLayer(testrt)



                    var list = testrt.map(e => {
                    let arr =[Number(e.destinationLngLat.split(',')[0]),Number(e.destinationLngLat.split(',')[1])]
                    return {
                        "type": "Feature",
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


                var list1 = testrt.map(e => {
                    let arr =[Number(e.originLngLat.split(',')[0]),Number(e.originLngLat.split(',')[1])]
                    return {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": arr
                        }
                    }
                })

                var data1 = {
                    "type": "FeatureCollection",
                    "features": list1,
                };

                let geo1 = new Loca.GeoJSONSource({
                    data: data1,
                });

                let geo = new Loca.GeoJSONSource({
                    data: data,
                });

                // console.log(data1)
                this.scatterLayer1.setSource(geo);
                this.scatterLayer1.setStyle({
                        size: [100, 100],
                        unit: 'meter',
                        texture: 'https://a.amap.com/Loca/static/static/center-point.png',
                    });
                    this.hcloca.add(this.scatterLayer1);



                    this.scatterLayer2.setSource(geo1);
                    this.scatterLayer2.setStyle({
                        size: [100, 100],
                        unit: 'miter',
                        animate: true,
                        duration: 1000,
                        texture: 'https://a.amap.com/Loca/static/static/orange.png',
                    });
                    this.hcloca.add(this.scatterLayer2);



                    var list2 = testrt.map(e => {
                    let arr =[e.destinationLngLat.split(','),e.originLngLat.split(',')]
                    return {
                        "type": "Feature",
                        "properties": {
                            type: e
                        },
                        "geometry": {
                            "type": "LineString",
                            "coordinates": arr
                        }
                    }
                })

                var data2 = {
                    "type": "FeatureCollection",
                    "features": list2,
                };

                let geo2 = new Loca.GeoJSONSource({
                    data: data2,
                });

                this.linkLayer.setSource(geo2);
                this.linkLayer.setStyle({
                    
                    lineColors: function (index, item) {
                        return ['#00779d'];
                    },
                    height: function (index, item) {
                        return item.distance / 3;
                    },
                    smoothSteps: function (index, item) {
                        return 200;
                    },
                });
                this.hcloca.add(this.linkLayer);

         },
      
    
    }
  
}
</script>
<style lang="scss">

.myinfobox{
    width: vw(342);
    height:100%;
    background: url("~@/assets/image/tk_bj.png");
    background-size: 100% 100%;
    border:1px solid rgba(0, 255, 255, 0.65);
    box-sizing: border-box;
    padding: vh(10) vw(26);
    font-size: vw(16);
    padding-bottom: vh(34);
    display: flex;
    flex-direction: column;
    .infoimg{
      width: vw(48);
      height: vw(48);
      background: url("~@/assets/image/gf_icon.png");
      background-size: 100% 100%;
    }
    .line-lsi{
      display: flex;
      justify-content: flex-start;
      width: 100%;
      flex: 1;
      .tithear{
        width: vw(42);
        height:vh(20);
        display: inline-block;
      }
    }
    .itean-lsi{
      margin-bottom:0.2vh;
    }
    .titfont{
      display: flex;
      align-items: center;
      font-size: vw(20);
      color: #00FFFF;
      font-weight: bold;
      width: 100%;
      height: vh(30);
      margin: vh(16) vw(0);
      margin-left: vw(-12);
      margin-top: vh(4);
    }
  }

</style>
<style lang="scss" scoped>
.repetitionRactor{
   width:100%;
  height:100%;
  position: relative;
  .search-box {
    // width:40%;
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(140);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
    z-index:10;
  }

 
 
}
</style>
