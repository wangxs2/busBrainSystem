<template>
  <div class="realNetworkbox">
    <!-- <div class="netrelMap" id="netrelMap">
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  watch:{
   
  },
   mounted(){

  },
  methods:{
  
  }
  
}
</script>
<style lang="scss">
.realNetworkbox{
  .myinfobox1{
    width: vw(346);
    height:vw(308);
    background: url("~@/assets/image/tk_bj1.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: vh(34) vw(26);
    font-size: vw(16);
    padding-top: vh(50);
    display: flex;
    flex-direction: column;
    .line-lsi{
      display: flex;
      justify-content: flex-start;
      width: 100%;
      flex: 1;
      .tithear{
        width: vw(80);
        height:vh(20);
        display: inline-block;
      }
    }
   
  }
}

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
