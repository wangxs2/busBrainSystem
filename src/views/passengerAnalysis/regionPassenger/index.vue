<template>
  <div class="regionPassenger">
    <div class="search-box">
      <div style="margin-right:0.6vw;width:3vw;">时间</div>
      <el-date-picker
        v-model="value1"
        size="small"
        type="daterange"
        @change="getRegionData()"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <div class="lkicon">
      <div style="text-align:center">区域客流数：</div>
      <div class="lk"></div>
      <div style="margin-top:0.2vh">0-1000</div>
      <div class="lk lk1"></div>
      <div style="margin-top:0.2vh">1001-10000</div>
      <div class="lk lk2"></div>
      <div style="margin-top:0.2vh">10001-20000</div>
      <div class="lk lk3"></div>
      <div style="margin-top:0.2vh">20001-30000</div>
      <div style="margin-top:0.2vh" class="lk lk4"></div>
      <div >大于30000</div>
    </div>
    <div class="rightlinemsg">
      <div class="tit">区域分布概况</div>
      <div class="bttit">
        <div>区域</div>
        <div>客流量</div>
      </div>
      <div class="tablbox">
        <div class="bttit bttit1" v-for="(item,n) in lineaData" :key="n">
          <div>{{item.regionName}}</div>
          <div>{{item.sd+item.sp}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
          value1:[new Date().getTime() - 3600 * 1000 * 24 * 7,new Date()],
          lineaData: [],
        }
    },
    created() {
           
      this.getRegionData()
     

    },
    mounted() {
      window.onresize = ()=> {
        // this.myChart.resize()
        // this.myChart1.resize()
        // this.myChart3.resize()
      }
    },
    methods: {
      tomeay(row) {
      this.islist = row.id;
      },
    
      getRegionData(){
        this.$fetchGet("/passenger/regionPassenger",{
            st:this.$moment(this.value1[0]).format("YYYY-MM-DD"),
            et:this.$moment(this.value1[1]).format("YYYY-MM-DD"),
        }).then(res => {
          this.$fetchGet("/passenger/region").then(resall => {
            res.result.forEach(iteam=>{
              resall.result.forEach(itam=>{

                if(iteam.regionName==itam.regionName){
                  iteam.centerLatitude=itam.centerLatitude
                  iteam.centerLongitude=itam.centerLongitude
                  iteam.polygonGeom=itam.polygonGeom
                }
              })
            })
          
            this.lineaData=res.result
            this.$store.commit('SET_REGIONDATA', res.result)
            setTimeout(()=>{
            this.$store.commit('SET_LOADING',false)
            },500)

          })
          // this.$store.commit('SET_REGIONDATA', res.result)
          //  setTimeout(()=>{
          //   this.$store.commit('SET_LOADING',false)
          //   },500)

        })
      },
    }
};
</script>
<style lang="scss" scoped>
.regionPassenger{

  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(138);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
  }
  .lkicon {
    position: absolute;
    top: vh(140);
    right: vw(12);
    background: rgba(26, 66, 118, 0.2);
    border: 1px solid #27b6ff;
    box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset;
    border-radius: 2px;
    box-sizing: border-box;
    padding: vh(8) vw(20);
    display:flex;
    align-items: center;
    justify-content: space-between;
    font-size:vw(16);
    .lk{
      width: vw(14);
      height: vh(14);
      background: #00D8FF;
      margin-left:vw(8);
      margin-right:vw(4);
    }
    .lk1{
     background: #9000FF;
    }
    .lk2{
      background: #FF9100;
    }
    .lk3{
      background: #FF00FF;
    }
    .lk4{
      background: #FF4200;
    }
    
  }
  .rightlinemsg{
    position: absolute;
    top: vh(190);
    right: vw(20);
    width: vw(300);
    height: vh(864);
    background: url("~@/assets/image/form_bj.png");
    // border:1px solid #ffffff;
    background-size: 100% 100%;
    overflow: hidden;
     flex-direction: column;
    display: flex;
    .tit {
      width: 100%;
      height: vh(60);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(75);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align:center;
      font-weight: bold;
    }
    .bttit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      color:#27B6FF;
      // padding:0 vw(30);
      // padding-right: vw(10);
      font-size:vw(18);
      margin-left:vw(8);
      margin-right:vw(8);
      margin-top: vh(16);
      div {
        flex: 1;
        text-align: center;
      }
    }
    .bttit1 {
      // padding:0;
      width: 100%;
      height: vh(42);
      // margin-bottom:vh(20);
      color:#ffffff;
      margin-top: vh(0);
      cursor: pointer;
      font-size:vw(16);
    }
    .bttit1:hover {
      background: rgba(93, 137, 255, 0.1);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
    }
    .tablbox {
      flex: 1;
      box-sizing: border-box;
      margin-right: vw(10);
      // margin-left: vw(8);
      overflow: hidden;
      overflow-y: scroll;
      margin-top: vh(12);
      margin-bottom: vh(30);
      
    }
  }
}
</style>