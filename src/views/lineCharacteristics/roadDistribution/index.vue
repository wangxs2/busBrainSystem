<template>
  <div class="roadDistribution-box">
    <div class="lkicon">
      <div style=" display:flex;align-items:center;justify-content:space-around">
        畅通
        <div class="lk1"></div>
        <div class="lk1 lk2"></div>
        <div class="lk1 lk3"></div>
        <div class="lk1 lk4"></div>
        拥堵
      </div>
      <div style="text-align:left;margin-top:0.4vh"> 更新时间：{{$moment().format("YYYY/M/D    hh:mm:ss")}}</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
    
       
    };
  },
  beforeCreate() {},
  created() {
    console.log("我是道路网")
  },
  mounted() {
  },

  methods: {
  }
};
</script>
<style lang="scss">
</style>

<style lang="scss" scoped>
.roadDistribution-box {
  box-sizing: border-box;
  margin-top:vw(70);
   position:relative;
  z-index:10;
  .lkicon{
    position:absolute;
    top:vh(65);
    right:vw(12);
    width: vw(300);
    height: vh(70);
    background: rgba(26, 66, 118, 0.2);
    border: 1px solid #27B6FF;
    box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset;
    opacity: 0.8;
    border-radius: 2px;
    box-sizing: border-box;
    padding:vh(8) vw(20);
   
    .lk1{
      width: vw(40);
      height: vh(12);
      background: #34B000;
    }
    .lk2{
      background: #FECB00;
    }
    .lk3{
      background: #FF2A2A;
    }
    .lk4{
      background: #B10400;
    }
  }
  
}
</style>
