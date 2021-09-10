<template>
  <div class="passengerAnalysis">
  
    <keep-alive>
         <router-view @changeKl="klsonClick"></router-view>
    </keep-alive>
  </div>
</template>
<script>

export default {
  data(){
    return{
      options:[],
      value:"",
       testdata:"POLYGON((121.822 31.0072,121.822 31.0093,121.818 31.0094,121.819 31.0068,121.822 31.0065,121.823 31.0009,121.823 30.9996,121.823 30.998,121.824 30.9978,121.824 30.9967,121.823 30.9968,121.823 30.9967,121.822 30.9944,121.823 30.9942,121.822 30.9906,121.829 30.9893,121.834 30.9881,121.836 30.9878,121.836 30.9868,121.835 30.9823,121.839 30.981,121.838 30.9791,121.844 30.977,121.844 30.9749,121.845 30.9745,121.844 30.9708,121.844 30.962,121.842 30.9533,121.841 30.9483,121.841 30.9458,121.841 30.937,121.841 30.931,121.841 30.9301,121.842 30.9295,121.841 30.9287,121.841 30.9291,121.841 30.9275,121.839 30.9282,121.838 30.9268,121.84 30.9261,121.841 30.9253,121.863 30.9152,121.887 30.9032,121.881 30.8911,121.881 30.8891,121.88 30.8874,121.887 30.8823,121.87 30.8671,121.88 30.8578,121.898 30.8727,121.904 30.8829,121.902 30.8856,121.9 30.8897,121.899 30.8921,121.898 30.8943,121.898 30.896,121.898 30.8977,121.897 30.9014,121.897 30.9052,121.898 30.9084,121.899 30.9124,121.901 30.9166,121.903 30.9192,121.905 30.9218,121.907 30.9241,121.909 30.9255,121.91 30.9297,121.911 30.938,121.91 30.9427,121.909 30.9534,121.907 30.9632,121.904 30.9715,121.891 30.9731,121.889 30.9788,121.882 30.9987,121.856 31.0034,121.857 31.0011,121.855 31.0009,121.854 31.0006,121.853 31.0008,121.851 31.0012,121.85 31.0014,121.85 31.0009,121.85 31.001,121.85 31,121.841 31.0003,121.841 31.0058,121.837 31.006,121.837 31.0066,121.822 31.0072))",
      
    }
  },
  watch:{
    
  },
  mounted(){
    

  },
  methods:{
      testpoly(iteam){

          let str =iteam.replace("POLYGON((", "");
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
    getTest(){
      this.$fetchGet("route/baseLineMessage").then(res=>{  
        this.options=res.result
        res.result.forEach(ite=>{
          ite.geom=this.setData(ite.geom)
        })
        // console.log(res.result)
        MyMap.createPolygon(res.result)
      })
    },
    setData(data){
        let str=data.split(' ')
        let arr=[]
        str.forEach(iteam=>{
          arr.push([Number(iteam.split(',')[0]),Number(iteam.split(',')[1])])
        })
        return arr
      },
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
         
            if(MyMap.busPolyline){
              MyMap.busPolyline.hide()
              MyMap.overlayGroups1.hide()
            }
            if(MyMap.overlayGroups.getOverlays().length>0){
              MyMap.overlayGroups.hide()
            }
           
            if(MyMap.infoWindow){
              MyMap.infoWindow.open()
            }
              break;
          case "区域客流":
            if(this.$store.getters.allStation){
             
              for(let key  in this.$store.getters.allStation){
                  MyMap.zdklMapOption.mass[key].hide()
                }

              if(MyMap.zdklMapOption.heat.getDataSet()){
                 MyMap.zdklMapOption.heat.hide()
              }
            }
            if(MyMap.busPolyline){
              MyMap.busPolyline.hide()
              MyMap.overlayGroups1.hide()
            }
            if(MyMap.infoWindow){
              MyMap.infoWindow.close()
            }
              break;
          case "线路客流":
           
            if(this.$store.getters.allStation){
              if(MyMap.zdklMapOption.heat.getDataSet()){
                 MyMap.zdklMapOption.heat.hide()
              }
              for(let key  in this.$store.getters.allStation){
                  MyMap.zdklMapOption.mass[key].hide()
                }
            }
            if(MyMap.overlayGroups.getOverlays().length>0){
              MyMap.overlayGroups.hide()
            }
            if(MyMap.infoWindow){
              MyMap.infoWindow.close()
            }
           
              break;
          case "断面客流":
             
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
        let heatOption=this.$store.getters.stationHeat;
        console.log(MyMap.zdklMapOption.heat)
        MyMap.zdklMapOption.heat.setDataSet({data: heatOption, max: 100})
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
  .unclick-stations-lis{
    cursor:pointer;
    text-decoration:underline;
    color:#4578FF;
    margin-right:0.4vw;
  }
  .unclick-stations-lis:hover{
    color: #00FFFF;
  }
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
  width: vw(178);
  height: vw(178);
  // background-image: radial-gradient(circle, rgb(49, 144, 228) 0%, rgb(41, 122, 204) 30%, rgb(29, 84, 166) 70%);
  border-radius:50%;
  // background: url("~@/assets/image/reginmark.png");
  // background-size: 100% 100%;
  background-size: contain;
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
  background:rgba(0,0,0,0.8);
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
