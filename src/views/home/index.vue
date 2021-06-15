<template>
  <div class="homePage">
    <div class="left-home">
      <div class="left-l1">
      </div>
      <div class="left-l2">
      </div>
      <div class="left-l3">
      </div>
    </div>
    <div class="center-home">
      <div class="center-box">
        <div class="center-box1"></div>
      </div>
    </div>
    <div class="right-home">
       <div class="left-l4">
      </div>
      <div class="left-l5">
      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.homePage{
    width:100%;
    height:100%;
    background: url("~@/assets/image/home/bj.png");
    background-size: 100% 100%;
    box-sizing:border-box;
    padding:0 vw(60);
    display:flex;
    justify-content: center;
    align-items: center;
    .left-home{
      .left-l1{
        width:vw(648);
        height:vw(140);
        background: url("~@/assets/image/home/1.png");
        background-size: 100% 100%;
        cursor:pointer;
      }
      .left-l2{
        width:vw(564);
        height:vw(140);
        background: url("~@/assets/image/home/2.png");
        background-size: 100% 100%;
        margin-top:vh(20);
        cursor:pointer;
      }
      .left-l3{
        width:vw(646);
        height:vh(140);
        background: url("~@/assets/image/home/3.png");
        background-size: 100% 100%;
        margin-top:vh(20);
        cursor:pointer;
      }
    }
    .center-home{
      .center-box{
        width:vw(649);
        height:vw(649);
        border: 3px dashed #4578FF;
        border-radius:50%;
        display:flex;
        justify-content: center;
        align-items: center;
        -webkit-transform: rotate(360deg);
        animation: rotation 90s linear infinite;
        -moz-animation: rotation 90s linear infinite;
        -webkit-animation: rotation 90s linear infinite;
        -o-animation: rotation 90s linear infinite;
        .center-box1{
           width:vw(612);
            height:vw(612);
            background: url("~@/assets/image/home/center_bj.png");
            background-size: 100% 100%;
            border-radius:50%;
             -webkit-transform: rotate(360deg);
            animation: rotation1 150s linear infinite;
            -moz-animation: rotation1 150s linear infinite;
            -webkit-animation: rotation1 150s linear infinite;
            -o-animation: rotation1 150s linear infinite;
        }
         @-webkit-keyframes rotation1{
          from {-webkit-transform: rotate(-360deg);}
          to {-webkit-transform: rotate(0deg);}
          }
      }
      @-webkit-keyframes rotation{
      from {-webkit-transform: rotate(0deg);}
      to {-webkit-transform: rotate(360deg);}
      }
    }
    .right-home{
      .left-l4{
        width:vw(652);
        height:vw(220);
        background: url("~@/assets/image/home/4.png");
        background-size: 100% 100%;
        cursor:pointer;
        
      }
      .left-l5{
        width:vw(652);
        height:vw(222);
        background: url("~@/assets/image/home/5.png");
        background-size: 100% 100%;
        margin-top:vh(20);
        cursor:pointer;
      }
    }
}

</style>
