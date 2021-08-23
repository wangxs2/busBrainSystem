<template>
  <div class="roadDistribution-box" id="roaddistr">
    <div class="lkicon">
      <div>拥堵指数</div>
      <div style=" display:flex;align-items:center;margin-top:0.8vh">
        <div class="lk1"></div>
        <div class="lk1 lk2"></div>
        <div class="lk1 lk3"></div>
        <div class="lk1 lk4"></div>
        
      </div>
      <div style=" display:flex;margin-top:0.2vh">
        <div style="flex:1">1.0</div>
        <div style="flex:1">1.5</div>
        <div style="flex:1">1.8</div>
        <div style="flex:1">2.0</div>
      </div>
      <!-- <div style="text-align:left;margin-top:0.4vh"> 更新时间：{{$moment().format("YYYY/M/D    hh:mm:ss")}}</div> -->
    </div>
    <div class="rightlinemsg">
      <div class="tit">实时拥堵路况</div>
      <div class="bttit">
        <div>道路名称</div>
        <div>拥堵指数</div>
        <div>平均速度</div>
      </div>
      <div class="tablbox">
        <div  :class="nowindex==n?'bttit bttit1 bttit2':'bttit bttit1'" @click="toDetail(item,n)" v-for="(item,n) in lineaData" :key="n">
          <div style="white-space:nowrap">{{item.roadsegid}}</div>
          <div :style="{'color':((item.congestIndex>1&&item.congestIndex<1.5)||item.congestIndex==1)?'rgb(22, 206, 149)':((item.congestIndex<1.8&&item.congestIndex>1.5)||item.congestIndex==1.5)?'rgb(247, 157, 6)'
            :((item.congestIndex<2&&item.congestIndex>1.8)||item.congestIndex==1.8)?'rgb(216, 3, 4)':'rgb(143, 0, 33)'}">{{item.congestIndex}}</div>
          <div >{{item.speed}}</div>
        
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MapMixin from '../../networkExcellent/networkMap'
export default {
  mixins: [MapMixin],
  components: {
  },
  data() {
    return {
       lineaData:[],
       nowindex:-1,
    };
  },
  beforeCreate() {},
  created() {
     this.getroaddata()
  },
  mounted() {
    this.M_initMap('roaddistr')
    // this.trafficLayer.setMap(this.M_map);
  },

  methods: {
    getroaddata(){
       this.$fetchGet("curve/list").then(res => {
        this.lineaData=res.result
        this.M_autoInput(this.lineaData)
        // this.pointEvent()
        // setTimeout(()=>{
        // this.$store.commit('SET_LOADING',false)
        // },200)
        
      })

    },
    pointEvent() {
      this.M_addGroupEvent((str,position) => {
        // console.log(str)
        //  this.$fetchGet("curve/detail", {
        //   roadName: str.roadsegid
        // }).then(res => {
        //   this.M_openRoad(position, res)
        // })
         this.$fetchGet("curve/detail",{
            roadName:str.roadsegid
          }).then(res => {
            this.M_searroad(str.roadsegid,res)
          })
      });
  },
   getLocation(){
     this.M_addGroupEvent((ExtData,position)=>{
     })
    },
    toDetail(row,n){
      this.nowindex=n
      //  this.$store.commit('SET_LOADING',true)
       this.$fetchGet("curve/detail",{
         roadName:row.roadsegid
       }).then(res => {
         this.M_searroad(row.roadsegid,res)
       })

    },

  }
};
</script>
<style lang="scss">
.roadDistribution-box{
 .info-win {
      padding-right: vw(20);
      // height: vw(110);
      position: relative;
      .win-triangle {
        position: absolute;
        top: 0;
        right: vw(16);
        width: vw(20);
        height: vw(20);
        transform: skewX(-45deg);
        background: rgba(1, 11, 66, 1);
        border: 1px solid rgba(45, 125, 241, 1);
      }
      .info-box {
        background: rgba(1, 11, 66, 1);
        border: 1px solid rgba(45, 125, 241, 1);
        border-radius: 4px;
        .info-content {
          position: relative;
          background: rgba(1, 11, 66, 1);
          border-radius: 4px;
          padding: vh(12) vw(16) vh(10) vw(10);
          color: #fff;
          // display: flex;
          .icon {
            width: vw(98);
            height: vw(88);
            background: #000;
            margin-right: vw(10);
            float: left;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            width: vw(180);
            min-height: vh(60);
            .info-name {
              font-size: vw(16);
              font-weight: bold;
              margin-bottom: vw(12);
            }
            .info-item {
              font-size: vw(14);
              line-height: vw(20);
              margin-top: vw(6);
              // overflow: hidden;
              // white-space: nowrap;
              // text-overflow: ellipsis;
            }
          }
        }
      }
    }
}
</style>

<style lang="scss" scoped>
.roadDistribution-box {
  width:100%;
  height:100%;
  box-sizing: border-box;
 position:relative;
  .lkicon{
    position:absolute;
    top:vh(160);
    right:vw(12);
    width: vw(300);
    background: rgba(26, 66, 118, 0.2);
    border: 1px solid #27B6FF;
    box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset;
    opacity: 0.8;
    border-radius: 2px;
    box-sizing: border-box;
    padding:vh(8) vw(20);
    z-index:10;
    .lk1{
      width: vw(60);
      height: vh(12);
      background: rgb(22, 206, 149);
    }
    .lk2{
      background: rgb(247, 157, 6);
    }
    .lk3{
      background: rgb(216, 3, 4);
    }
    .lk4{
      background: rgb(143, 0, 33);
    }
  }
   .rightlinemsg{
    position: absolute;
    top: vh(260);
    right: vw(20);
    // width: vw(314);
     z-index:10;
    max-height: vh(800);
    overflow: hidden;
    flex-direction: column;
    display: flex;
    // background: rgba(26, 66, 118, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    .tit {
      width: 100%;
      height: vh(50);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(50);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align:center;
      font-weight: bold;
      box-sizing: border-box;
      padding:0 vw(20);
      border-bottom: 1px solid rgba(69, 120, 255, 0.6);
    }
    .bttit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      color:#ffffff;
      padding:vh(10) vw(20);
      padding-left: vw(0);
      font-size:vw(16);
      margin-top: vh(16);
      background: linear-gradient(
      to right,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.1) 10%,
      rgba(35,198,200,0.2) 20%,
      rgba(35,198,200,0.4) 30%,
      rgba(35,198,200,0.5) 40%,
      rgba(35,198,200,0.5) 50%,
      rgba(35,198,200,0.5) 60%,
      rgba(35,198,200,0.4) 70%,
      rgba(35,198,200,0.3) 80%,
      rgba(0,0,0,0) 90%,
      rgba(0,0,0,0) 100%);
      div {
        flex: 1;
        text-align: center;
        margin-left:vw(20);
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
      background:none;
    }
    .bttit1:hover {
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
      color:#27B6FF;
      font-weight:bold;
    }
    .bttit2{
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
      color:#27B6FF;
      font-weight:bold;

    }
    .tablbox {
      flex: 1;
      box-sizing: border-box;
      // margin-right: vw(10);
      // margin-left: vw(8);
      overflow: hidden;
      overflow-y: scroll;
      margin-top: vh(12);
      margin-bottom: vh(30);
      
    }
  }
  
}
</style>
