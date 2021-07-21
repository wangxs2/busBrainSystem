<template>
  <div class="busLane-box" id="busLane">
     <div class="leftlinemsg1">
      <div class="titbox">
        <div class="titboxname">
          公交专用道列表
        </div>
        <div class="imgtit">
        </div>
      </div>
      <div class="bttit">
        <div>名称</div>
        <div>里程(km)</div>
        <div>线路条数</div>
      </div>
      <div class="tablbox">
        <div class="bttit bttit1" v-for="(item,n) in lineData" :key="n">
          <div style="text-align:left;padding-left:1vw">{{item.name}}</div>
          <div>{{item.length}}</div>
          <div>{{item.lineNumber}}</div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import MapMixin from '../../networkExcellent/networkMap'
let dataLine=require('@/libs/data.js')
export default {
  mixins: [MapMixin],
  components: {
  },
  data() {
    return {
      lineData:[]
    };
  },
  beforeCreate() {},
  created() {
    let arr=this.cloneObj(dataLine.datafg)
    console.log(arr)
    // console.log(arr)
    arr.forEach(iteam=>{
      iteam.path=this.TestsetData(iteam.path,2)
      this.lineData.push(iteam)
    })
    console.log(this.lineData)
    
     this.$store.commit('SET_LOADING',false)
    
  
  },
  mounted() {
    this.M_initMap('busLane')
    this.M_passCorrline(this.lineData)
  },
  methods: {

  }
};
</script>
<style lang="scss">
.busLane-box{
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
            min-height: vh(20);
            .info-name {
              font-size: vw(16);
              font-weight: bold;
              margin-bottom: vw(9);
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
.busLane-box {
 
   width:100%;
  height:100%;
  box-sizing: border-box;
 position:relative;
  .leftlinemsg1 {
    position: absolute;
    top: vh(150);
    left: vw(20);
    width: vw(370);
    height: vh(588);
    background: url("~@/assets/image/bigline.png");
    background-size: 100% 100%;
    flex-direction: column;
    display: flex;
    font-size: vw(17);
     z-index: 10;
    .titbox {
      width: 100%;
      height: vh(58);
      box-sizing: border-box;
      padding: 0 vw(30);
      padding-top:vh(10);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .titboxname {
        font-weight: bold;
        text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
          -0 -0 1.4em rgba(255, 255, 255, 0.7);
    }
    .imgtit {
      display: flex;
      align-items: center;
      margin-top: vh(6);
    }
    .bttit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      // padding:0 vw(30);
      padding-right: vw(10);
      margin-top: vh(20);
      div {
        flex: 1;
        text-align: center;
      }
    }
    .bttit1 {
      // padding:0;
      width: 100%;
      // height: vh(42);
      // margin-bottom:vh(20);
      margin-top: vh(6);
      cursor: pointer;
    }
    .bttit1:hover {
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
    }
    .tablbox {
      flex: 1;
      box-sizing: border-box;
      margin-right: vw(10);
      margin-left: vw(8);
      overflow: hidden;
      overflow-y: scroll;
      margin-top: vh(12);
      margin-bottom: vh(30);
    }
  }
}
</style>
