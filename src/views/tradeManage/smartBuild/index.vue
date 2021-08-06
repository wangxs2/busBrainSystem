<template>
  <div class="smartBuild">
    <div class="left-box">
      <div class="bitit-box">
        <div class="bitit">
            <img  src="@/assets/image/home/4.1_icon_zzry.png" alt="" srcset="">
            <div>
                <div class="bigttn">13266</div>
                <div class="bigttn1">在职人数</div>
            </div>
        </div>
        <div class="bitit">
            <img  src="@/assets/image/home/4.1_icon_gjxl.png" alt="" srcset="">
            <div>
                <div class="bigttn">454</div>
                <div class="bigttn1">车辆总数</div>
            </div>
        </div>
        
      </div>
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
.smartBuild{

  width:100%;
  height: 100%;
  background: url("~@/assets/image/zhbj.png");
  background-size: 100% 100%;
  display: flex;
  box-sizing: border-box;
  padding:vh(12) vw(16);
  .left-box,.right-box{
     width:vw(396);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .bitit-box{
      display: flex;
      flex-wrap:wrap ;
      margin-top:vh(6);
      background: rgba(12, 38, 104,0.3);
      width:100%;
      height:vh(122);
      .bitit{
        width: vw(180);
        height: vh(90);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left:vw(12);
        margin-top:vh(12);
        box-sizing:border-box;
        padding:vh(12) vw(9);
        box-shadow: 0px 0px  vh(12) rgba(0, 255, 255, 0.5) inset;
        img{
          margin-right:vw(4);
        }
        .bigttn{
          font-size: vw(32);
          font-family: 'DINOT';
          font-weight: bold;
          color: #00FFFF;

        }
      }
    }
  }
  .center-box{
     width:vw(1060);
    height: 100%;
    margin: 0 vw(14);
     box-sizing:border-box;
    padding:vh(6) vw(6);
    display: flex;
    flex-direction: column;
  }
 
}
</style>
