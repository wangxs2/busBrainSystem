<template>
  <div class="flowtionNet">
    <div class="left-box">
      <div class="titbox" style="">换乘压力</div>
    </div>
    <div class="center-box"></div>
     <div class="right-box"></div>
  </div>
</template>

<script>
export default {
    created(){
        setTimeout(()=>{
        this.$store.commit('SET_LOADING',false)
        },200)
    }
  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.flowtionNet{
 width:100%;
  height: 100%;
  background: url("~@/assets/image/zhbj.png");
  background-size: 100% 100%;
  display: flex;
  box-sizing: border-box;
  padding:vh(12) vw(16);
  .titbox{
    width:100%;
    height:vh(56);
    background: #0C2668;
    font-size: vw(20);
    font-weight: bold;
    line-height: vh(56);
    box-sizing: border-box;
    padding-left: vw(22);
    display:flex;
    flex-direction: column;
  }
  .left-box{
    width:vw(396);
    height: 100%;
  }
  .center-box{
    width:vw(1060);
    height: 100%;
    margin: 0 vw(14);
  }
  .right-box{
    width:vw(396);
    height: 100%;
  }
}
</style>
