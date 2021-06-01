<template>
  <div class="lineCharacteristicsc" id="lineCharacteristics">
    <router-view></router-view>
  </div>
</template>

<script>
import Map from "@/libs/myMap.js";
let MyMap = null; // 地图实例
export default {
  data(){
    return{
    }
  },
  watch:{
    $route:{
      handler(val,oldval){
        
        if(val.name=="道路网"){
          MyMap.isTraffic(true)
        }else{
          MyMap.isTraffic(false)
        }
        
      },
    }
  },

  created(){
   

  },
  mounted(){
     MyMap = new Map({ el: "lineCharacteristics" });
     console.log(this.$router)
  }
  
}
</script>

<style lang="scss" scoped>
.lineCharacteristicsc{
  width: 100%;
  height: 100%;
}
</style>
