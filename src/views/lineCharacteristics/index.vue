<template>
  <div class="lineCharacteristicsc" id="lineCharacteristics">
    <router-view @changefun="sonClick"></router-view>
  </div>
</template>

<script>
import Map from "@/libs/myMap.js";
let MyMap = null; // 地图实例
export default {
  data(){
    return{
      kyline:[121.519582,31.244213,121.519504,31.241951,121.519706,31.240515,121.520005,31.239596,121.520566,31.238437,121.522564,31.234565,121.524342,31.231122,121.525827,31.227642,121.527369,31.223936,121.5288,31.220249,121.529217,31.218594,121.529336,31.216774,121.529217,31.21494,121.528592,31.213133,121.527758,31.211611,121.52685,31.209842,121.525213,31.206825,121.523456,31.203604,121.521253,31.199657,121.518743,31.194945,121.516408,31.192784,121.513805,31.191212,121.510819,31.189607]
   
    }
  },
   computed: {
    
  },
  watch:{
    '$store.getters.userStation':{
      handler(val,oldval){
       if(val){
         MyMap.isTraffic(false)
         MyMap.pointAll3(val)
         console.log(this.$store.getters.threeMap)
         MyMap.addPolygon(this.$store.getters.threeMap)
        
       }
      },
    },
    '$store.getters.isbtn':{
      handler(val,oldval){
       if(val){
        //  console.log(val)
       }
      },
    },
    '$route':{
      handler(val,oldval){
         
       if(val){
         this.judgeRoute(val)
       }
      },
    },
  },
  created(){
  },
  mounted(){
     MyMap = new Map({ el: "lineCharacteristics" });
    let nowroute=this.$route
    // let arr=[]
    // MyMap.addPolygon(arr)
    this.judgeRoute(nowroute)
  },
  methods:{
    judgeRoute(val){
      switch(val.name) {
          case "道路网":
            console.log("进到道路网")
            MyMap.isTraffic(true)
            if(MyMap.mass){
                MyMap.isMass(false)
              }
              break;
          case "公交站点":
              MyMap.isTraffic(false)
              if(MyMap.mass){
                MyMap.isMass(true)
              }
              break;
          case "公交线路网":
              MyMap.isTraffic(false)
              if(MyMap.mass){
                MyMap.isMass(false)
              }
              break;
          case "公交专用道":
              MyMap.isTraffic(false)
              if(MyMap.mass){
                MyMap.isMass(false)
              }
              MyMap.heatmap.hide()
              break;
          case "客运走廊":
              MyMap.isTraffic(false)
              if(MyMap.mass){
                MyMap.isMass(false)
              }
              MyMap.heatmap.hide()
              // let str=MyMap.overlayGroups1.getOverlays()
             MyMap.passCorrline(this.separateArr(this.kyline,2))
             console.log(this.$store.getters.keyunData1)
             MyMap.addOverlayGroup3(MyMap.addGjMarker(this.$store.getters.keyunData,2))
             MyMap.addOverlayGroup3(MyMap.addGjMarker(this.$store.getters.keyunData1,1))
              break;
          default:
          } 
    },
    sonClick(row){
      console.log(row)
      // if(row.isbtn&&row.isbtn==1){
      //   MyMap.overlayGroups.show()
      //  MyMap.overlayGroups1.hide()
      // }else if(row.isbtn==2){
      //   let str=MyMap.overlayGroups1.getOverlays()
      //   if(str.length>0){
      //     MyMap.overlayGroups.hide()
      //     MyMap.overlayGroups1.show()
      //   }else{
      //     MyMap.overlayGroups.hide()
      //     MyMap.addOverlayGroup1(MyMap.threeCircle(this.$store.getters.userStation.slice(1,2),500))
      //   }
      // }
      if(row.ispoint==1){
        MyMap.isMass(true)
      }else if(row.ispoint==2){
        MyMap.isMass(false)
      }

      if(row.isheat==1){
        MyMap.heatmap.hide()
      }else if(row.isheat==2){
        let arr=MyMap.heatmap.getDataSet()
        if(arr){
          MyMap.heatmap.show()
        }else{
          console.log('判断')
          MyMap.setHeatemap(this.$store.getters.heatData)
        }
        // console.log(this.$store.getters.heatData)
        
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

<style lang="scss" scoped>
.lineCharacteristicsc{
  width: 100%;
  height: 100%;
}
</style>
