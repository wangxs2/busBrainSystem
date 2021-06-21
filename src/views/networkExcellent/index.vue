<template>
  <div class="networkExcellent">
      <div v-show="$route.name!=='年度计划'" class="networkMap" id="networkMap">
      </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Map from "./networkMap.js";
let MyMap = null; // 地图实例
export default {
 mounted(){
    MyMap = new Map({ el: "networkMap" });
  },
  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.networkExcellent{
 
 
}
</style>
