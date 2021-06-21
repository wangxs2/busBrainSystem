<template>
  <div class="operServices">
    <div class="operMap" id="operMap">
      </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Map from "./operMap.js";
let MyMap = null; // 地图实例
export default {
   mounted(){
    MyMap = new Map({ el: "operMap" });
  },
  
}
</script>
<style lang="scss">

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
