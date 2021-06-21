<template>
  <div class="passengerAnalysis">
    
      <div v-show="$route.name!=='断面客流'" class="passengerMap" id="passengerMap">
      </div>
      <router-view @changeKl="klsonClick"></router-view>
  </div>
</template>

<script>
import Map from "./passengerMap.js";
let MyMap = null; // 地图实例
export default {
  data(){
    return{
      options:[],
      value:"",
      styleStition:{
        '0-500':{
                url: require('@/assets/image/cyan.png'),
                anchor: new AMap.Pixel(6,6),
                size: new AMap.Size(11,11)
              },
        '500-1000':{
                url: require('@/assets/image/blue1.png'),
                anchor: new AMap.Pixel(6,6),
                size: new AMap.Size(11,11)
              },
        '1000-2000':{
                url: require('@/assets/image/green1.png'),
                anchor: new AMap.Pixel(6,6),
                size: new AMap.Size(11,11)
              },
        '2000-3000':{
                url: require('@/assets/image/yellow1.png'),
                anchor: new AMap.Pixel(6,6),
                size: new AMap.Size(11,11)
              },
        '3000-4000':{
                url: require('@/assets/image/icon_purple1.png'),
                anchor: new AMap.Pixel(6,6),
                size: new AMap.Size(11,11)
              },
        '4000+':{
               url: require('@/assets/image/icon_red1.png'),
                anchor: new AMap.Pixel(6,6),
                size: new AMap.Size(11,11)
        }
      }
    }

  },
  watch:{
    '$route':{
      handler(val,oldval){
        if(val){
          this.judgeRoute(val)
        }
      },
    },
    '$store.getters.regionData':{
      handler(val,oldval){
        if(val){
          MyMap.addOverlayGroup(MyMap.getRegionMark(val))
        }
      },
    },
    '$store.getters.allStation':{
      handler(val,oldval){
       if(val){
         let heatOption=this.$store.getters.stationHeat;
        for(let key  in val){
            MyMap.xrhld(key,val[key],this.styleStition[key])
          }
         MyMap.zdklMapOption.heat.setDataSet({data: heatOption, max: 100})
         
       }
      },
    },

  },
  mounted(){
    MyMap = new Map({ el: "passengerMap" });
    this.judgeRoute(this.$route)
  },
  methods:{
    qchh(){
        var result = [];
        var obj = {};
        for(var i =0; i<arr.length; i++){
            if(!obj[arr[i].key]){
              result.push(arr[i]);
              obj[arr[i].key] = true;
            }
        }

    },
    allData(){
      let arpoy=[]
      this.options.forEach(iteam=>{
        let obj={
          routeName:iteam.name,
          geom:'',
          lineLength:'',
        }

      })

        

     
    },
    pushLine(){
    },
    judgeRoute(val){
      switch(val.name) {
          case "站点客流":
           
            if(MyMap.overlayGroups.getOverlays().length>0){
              MyMap.overlayGroups.hide()
            }
              break;
          case "区域客流":
            if(MyMap.zdklMapOption.heat.getDataSet()){
              MyMap.zdklMapOption.heat.hide()
              for(let key  in this.$store.getters.allStation){
                  MyMap.zdklMapOption.mass[key].hide()
                }
            }
              break;
          case "公交线路网":
           
              break;
          case "公交专用道":
             
              break;
          case "客运走廊":
              break;
          default:
          } 
    },
    klsonClick(row){
      if(row.isStation){
        if(row.isStation.isxz){
          MyMap.zdklMapOption.mass[row.isStation.value].show()
        }else{
          MyMap.zdklMapOption.mass[row.isStation.value].hide()
        }
      }
      if(row.isheat==true){
        MyMap.zdklMapOption.heat.show()
      }else if(row.isheat==false){
        MyMap.zdklMapOption.heat.hide()
      }

      if(row.toLine){
        MyMap.drawbusLine(row.toLine,row.toLinestation)
        // MyMap.getSearchLine(row.toLine)

      }
    },
  }
};
</script>
<style  lang="scss">
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
.passengerAnalysis{
  .el-select-dropdown,.el-popper{
    max-width:800px !important;
    left:0px!important;
  }
  .amap-marker-label{
    border:none!important;
    background:none!important;
  }
  .lineklbox{
    // width:vw(390);
    // height:vw(320);
    box-sizing:border-box;
    padding:18px 18px;
    background:rgba(0, 49, 61, 1)!important;
    border: 1px solid #00FFFF;
    
  }
}
.regionMark{
  width: vw(100);
  height: vw(100);
  // background-image: radial-gradient(circle, rgb(49, 144, 228) 0%, rgb(41, 122, 204) 30%, rgb(29, 84, 166) 70%);
  border-radius:50%;
  // background: url("~@/assets/image/reginmark.png");
    background-size: 100% 100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
<style lang="scss" scoped>
.passengerAnalysis{
  width: 100%;
  height: 100%;
  background:#000000;
  position: relative;
  .passengerMap{
    width:100%;
    height:100%;
    .searchbox{
      width:500px;
      position: absolute;
      top: vh(270);
      left: vw(20);
      z-index:200;
      display:flex;

    }
  }
}
</style>
