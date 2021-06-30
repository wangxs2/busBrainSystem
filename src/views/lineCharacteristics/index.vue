<template>
  <div class="lineCharacteristicsc" id="lineCharacteristics">
    <router-view @changefun="sonClick"></router-view>
  </div>
   
</template>

<script>
// import Map from "@/libs/myMap.js";
// let MyMapLine = null; // 地图实例
let dataLine=require('./car.js')
export default {
  data(){
    return{
      radiusAll:[]
    }
  },
   computed: {
    
  },
  watch:{
    // '$route':{
    //   handler:function(val,oldval){
    //    this.judgeRouteLine(val)
    //   },
    //   deep:true,
    //   immediate: true
    // },
    '$store.getters.userStation':{
      handler(val,oldval){
       if(val.length>0){

         
         MyMapLine.pointAll3(val)
       }
      },
      deep:true,
      immediate: true
    },
    '$store.getters.dataArrLine':{
      handler(val,oldval){
       if(val.length>0){
        MyMapLine.pathSimplifierIns.setData(this.$store.getters.dataArrLine)
        MyMapLine.pathSimplifierIns.show()
       }
      },

    },
    '$store.getters.keyunData2':{
      handler(val,oldval){
       if(val){
          MyMapLine.addGjMarker(this.$store.getters.keyunData)
          MyMapLine.addOverlayGroup4(MyMapLine.passCorrline(this.$store.getters.keyunData2))
       }
      },
    },
   
  },
  created(){
   
    
    
  },
  mounted(){
    let nowroute=this.$route
  },
  methods:{
     setSz(baseArray){
        let len = baseArray.length;
        let n = 1; //假设每行显示4个
        let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
        let res = [];
        for (let i = 0; i < lineNum; i++) {
            // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
            let temp = baseArray.slice(i*n, i*n+n);
            let art=[]
            temp[0].split(',').forEach(iru=>{
                art.push(parseFloat(iru))
            })
            res.push(art);
        }
        
        return res

    },
    group(array, subGroupLength) {
        let index = 0;
        let newArray = [];
        while(index < array.length) {
            newArray.push(array.slice(index, index += subGroupLength));
        }
        return newArray;
    },
    judgeRouteLine(val){
      switch(val.name) {
          case "道路网":
            if(MyMapLine){
              MyMapLine.isTraffic(true)
              if(MyMapLine.infoWindow){
                MyMapLine.infoWindow.close()
              }
              if(MyMapLine.massall){
                  MyMapLine.massall.hide()
                 
                  if(MyMapLine.polygonLine){
                    MyMapLine.polygonLine.hide()
                   
                    MyMapLine.overlayGroups.getOverlays().forEach(iy=>{
                      MyMapLine.map.remove(iy)
                    })
                  }
              }
              if(MyMapLine.kymassnew){
                  MyMapLine.kymassnew.hide()
                  MyMapLine.kyLineOver.hide()
              }

              if(MyMapLine.pathSimplifierIns){
                  MyMapLine.pathSimplifierIns.setData(null)
              }
            }
              
              break;
          case "公交站点":
             if(MyMapLine){
                if(MyMapLine.infoWindow){
                    MyMapLine.infoWindow.close()
                }
                if(MyMapLine.trafficLayer){
                    MyMapLine.isTraffic(false)
                }
                // if(MyMapLine.massall){
                //   MyMapLine.massall.show()
                //   if(MyMapLine.polygonLine){
                //     MyMapLine.polygonLine.show()
                //   }
                // }
                // else{
                //   MyMapLine.pointAll3(this.$store.getters.userStation)
                // }
                if(MyMapLine.kymassnew){
                  MyMapLine.kymassnew.hide()
                    MyMapLine.kyLineOver.hide()
                }
                if(MyMapLine.pathSimplifierIns){
                    MyMapLine.pathSimplifierIns.setData(null)
                }
                // if(this.$store.getters.userStation){
                //   // MyMapLine.pointAll3(this.$store.getters.userStation)
                // }
                
             }
              break;
          case "公交线路网":
           if(MyMapLine){
              if(MyMapLine.kymassnew){
                 MyMapLine.kymassnew.hide()
                MyMapLine.kyLineOver.hide()
              }
               if(MyMapLine.trafficLayer){
                  MyMapLine.isTraffic(false)
              }
              if(MyMapLine.infoWindow){
                  MyMapLine.infoWindow.close()
                }
              if(MyMapLine.massall){
                MyMapLine.massall.hide()
                if(MyMapLine.polygonLine){
                  MyMapLine.polygonLine.hide()
                  MyMapLine.overlayGroups.getOverlays().forEach(iy=>{
                    MyMapLine.map.remove(iy)
                  })
                }
              }
           }
          
              //  setTimeout(()=>{
              //     MyMapLine.pathSimplifierIns.setData(this.$store.getters.dataArrLine)
              //   },1000)
              
              
              break;
          case "公交专用道":
              if(MyMapLine){
                if(MyMapLine.infoWindow){
                  MyMapLine.infoWindow.close()
                }
                if(MyMapLine.trafficLayer){
                    MyMapLine.isTraffic(false)
                }
                //隐藏公交站点里面的数据
                if(MyMapLine.massall){
                  MyMapLine.massall.hide()
                  
                  if(MyMapLine.polygonLine){
                    MyMapLine.polygonLine.hide()
                    MyMapLine.overlayGroups.getOverlays().forEach(iy=>{
                      MyMapLine.map.remove(iy)
                    })
                  }
                }
                //隐藏客运走廊里面的数据
                if(MyMapLine.kymassnew){
                  MyMapLine.kymassnew.hide()
                  MyMapLine.kyLineOver.hide()
                }
                //隐藏公交线网里面的数据
                if(MyMapLine.pathSimplifierIns){
                  MyMapLine.pathSimplifierIns.setData(null)
                }
                MyMapLine.heatmap.hide()
              }
              break;
          case "客运走廊":
              if(MyMapLine){
                if(MyMapLine.infoWindow){
                    MyMapLine.infoWindow.close()
                }
                if(MyMapLine.trafficLayer){
                    MyMapLine.isTraffic(false)
                }
                if(MyMapLine.massall){
                  MyMapLine.massall.hide()
                  if(MyMapLine.polygonLine){
                    MyMapLine.polygonLine.hide()
                    MyMapLine.overlayGroups.getOverlays().forEach(iy=>{
                      MyMapLine.map.remove(iy)
                    })
                  }
                }
                // if(MyMapLine.kymassnew){
                 
                //   MyMapLine.kymassnew.show()
                //   MyMapLine.kyLineOver.show()
                // }
               
                //隐藏公交线网里面的数据
                if(MyMapLine.pathSimplifierIns){
                  MyMapLine.pathSimplifierIns.setData(null)
                }
                MyMapLine.heatmap.hide()
              }
              
              break;
          default:
          } 
    },
    sonClick(row){
 

      if(row.ispoint==1){
        MyMapLine.isMass(true)
      }else if(row.ispoint==2){
        MyMapLine.isMass(false)
      }

      if(row.isheat==1){
        MyMapLine.heatmap.hide()
      }else if(row.isheat==2){
        let arr=MyMapLine.heatmap.getDataSet()
        if(arr){
          MyMapLine.heatmap.show()
        }else{
          MyMapLine.setHeatemap(this.$store.getters.heatData)
        }
        
      }


      if(row.isinfobtn){
        MyMapLine.searchStation(row.isinfobtn.stationName,[row.isinfobtn.longitude==undefined?row.isinfobtn.lon:row.isinfobtn.longitude,row.isinfobtn.latitude==undefined?row.isinfobtn.lat:row.isinfobtn.latitude]) 
      }
      if(row.stattiondetail){
        MyMapLine.infoWindow.setContent(MyMapLine.createInfoWindow(2,row.stattiondetail))
        MyMapLine.infoWindow.open(MyMapLine.map,[row.stattiondetail.longitude,row.stattiondetail.latitude]);
        MyMapLine.map.setZoomAndCenter(16,[row.stattiondetail.longitude,row.stattiondetail.latitude])
      }

      if(row.stationdata){
        MyMapLine.pointAll3(row.stationdata)
        if(row.adminArea){
          MyMapLine.createPolygon(row.adminArea)
          MyMapLine.addOverlayGroup(MyMapLine.threeCircle(row.stationdata,300))
        }
       

      }

       if(row.isbtn){
          MyMapLine.setRadius(row.isbtn)
        }
       
    },
    separateArr(data, n) {
          //获取要切割的数组的长度
          let len = data.length;
          let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
          let res = [];
          for (let i = 0; i < lineNum; i++) {
              // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
              let temp = data.slice(i * n, i * n + n);
              res.push(temp);
          }
          return res;
      },
  }
  
}
</script>
<style lang="scss">
.amap-info-contentContainer{
  .myinfobox{
    width: vw(342);
    height:100%;
    // background: url("~@/assets/image/tk_bj1.png");
    // background-size: 100% 100%;
    border:1px solid rgba(0, 255, 255, 0.65);
    background: rgba(0, 49, 61, 0.5);
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
  .myinfobox:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -12px;
    border-top: 12px solid  rgba(0, 255, 255, 0.65);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    transform: translateX(-50%);
  }

}
</style>
<style lang="scss" scoped>

.lineCharacteristicsc{
  width: 100%;
  height: 100%;
}
</style>
