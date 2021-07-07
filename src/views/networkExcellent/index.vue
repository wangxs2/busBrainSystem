<template>
  <div class="networkExcellent">
      <div v-show="$route.name!=='年度计划'" class="networkMap" id="networkMap">
      </div>
    <router-view @changnet="ntsonClick"></router-view>
  </div>
</template>

<script>
import Map from "./networkMap.js";
let ntMyMap = null; // 地图实例
export default {
  data(){
    return{
      
    }

  },
 watch:{
  '$store.getters.userStation':{
      handler(val,oldval){
       if(val.length>0){
         ntMyMap.pointAll3(val)
       }
      },
      deep:true,
      immediate: true
    },

 },
 mounted(){
    ntMyMap = new Map({ el: "networkMap" });
  },
  methods:{
    ntsonClick(row){
      if(row.operLine){
        ntMyMap.drawbusLine(row.operLine,row.typeline)
      }
      if(row.saveLine==1){
        ntMyMap.closepoly()
      }
      
    },
  }
  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.networkExcellent{
width: 100%;
  height: 100%;
   background:#000000;
  position: relative;
  .networkMap{
    width: 100%;
  height: 100%;
  }
 
}
</style>
