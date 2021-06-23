<template>
  <div class="realNetworkbox">
    <div class="netrelMap" id="netrelMap">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Map from "./reanetMap.js";
let ntMyMap = null; // 地图实例
export default {
   mounted(){
    ntMyMap = new Map({ el: "netrelMap" });
  },
  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.realNetworkbox{
  width: 100%;
  height: 100%;
  background:#000000;
  position: relative;
   .netrelMap{
    width:100%;
    height:100%;
  }
}
</style>
