<template>
  <div class="operServices">
    <div class="operMap" v-show="$route.name!=='百公里人次辅助决策'&&$route.name!=='满载率辅助决策'" id="operMap">
      </div>
    <router-view @changeoper="klsonClick"></router-view>
  </div>
</template>

<script>
import Map from "./operMap.js";
let MyMapper = null; // 地图实例
export default {
  watch:{
    '$route':{
      handler(val,oldval){
        if(val){
          this.judgeRoute(val)
        }
      },
    },
  },
  mounted(){
    MyMapper = new Map({ el: "operMap" });
  },
  methods:{
    klsonClick(row){
      if(row.operLine){
        MyMapper.drawbusLine(row.operLine,row.typeline)
      }
      
    },
    judgeRoute(val){
      switch(val.name) {
          case "线路重复系数辅助决策":
            if(MyMapper.busPolyline){
              MyMapper.map.remove(MyMapper.busPolyline)
            }
              break;
          case "超长线路辅助决策":
            if(MyMapper.busPolyline){
             MyMapper.map.remove(MyMapper.busPolyline)
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
  }
  
}
</script>
<style lang="scss">
#operMap {

  .amap-marker-label{
    background-color:transparent!important;
    border:none!important;
}

}

</style>
<style lang="scss" scoped>
.operServices{
  width: 100%;
  height: 100%;
  background:#000000;
  position: relative;
  .operMap{
    width:100%;
    height:100%;
  }
 
 
}
</style>
