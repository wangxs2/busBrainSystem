<template>
  <div
    class="roadDistribution-box"
    id="lineIndex"
    v-loading="assloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="rightlinemsg">
      <div class="tit">上南路轨交基本情况</div>
      <div>
        <p>
          （1）上南路客运走廊与5条轨道交通线路相交：轨道交通
          6号线、7号线、8号线、11号线、13号线；
        </p>
        <p>
          （2）上南路博成路、上南路浦东南路、上南路德州路、上南路华夏西路4个公交站点与轨道交通站点相接驳；
        </p>
        <p>（3）沿线轨道站点5个(中华艺术宫、耀华路、成山路、上南路、三林)；</p>
        <p>（4）6号线联系浦东塘桥、陆家嘴等区域；</p>
        <p>（5）7号线联系浦西、浦东北蔡、花木地区；</p>
        <p>（6）8号线联系浦西；</p>
        <p>（7）11号线联系浦西、浦东康桥、迪士尼地区；</p>
        <p>（8）13号线联系浦西、浦东北蔡、张江地区。</p>
      </div>
      <div class="tit">详细信息</div>
      <div class="bttit">
        <div>轨交站点名称</div>
        <div>接驳站点名称</div>
        <div>途径线路名称</div>
      </div>
      <div class="tablbox">
        <div
          class="bttit bttit1"
          @click="toDetail1(item)"
          v-for="(item, index) in mgdata"
          :key="index"
        >
          <div>{{ item.name }}</div>
          <div>{{ item.styion }}</div>
          <div>{{ item.routeLine }}</div>
        </div>
        <!-- <div  class="bttit bttit1">
          <div>耀华路</div>
          <div>上南路浦东南路</div>
          <div>177路;454路;576路;83路;978路;981路;沪塘专线;万周专线;周南线</div>
        </div>
         <div  class="bttit bttit1">
          <div>成山路</div>
          <div>上南路德州路</div>
          <div>177路;576路;610路;627路;782路;787路;83路;955路;973路;976路;978路;980路;981路;沪塘专线;浦东36路;万周专线;周南线</div>
        </div>
         <div  class="bttit bttit1">
          <div>上南路</div>
          <div>上南路华夏西路</div>
          <div>174路;177路;576路;583路;627路;955路;973路;976路;978路;986路;沪塘专线;三林1路;万周专线;周南线</div>
        </div> -->
      </div>
    </div>

    <div class="rightlinemsg2">
      <div class="tit">途径线路</div>
      <div v-for="(item, index) in tjxuname1" :key="index">
        <span :style="{ background: item.colors }" class="xincolor"></span>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
import MapMixin from '../mapmimx'
import mystate from '../zddata.json'
import mystatezcg from '../gjzdlat.json'
import myline from '../linall.json'
export default {
  mixins: [MapMixin],
  components: {
  },
  data () {
    return {
      lineaData: [],
      allcolor: [
        "#e9ff56",
        "#ffb51e",
        "#ff7500",
        "#ffc774",
        "#efdeb0",
        "#7dff00",
        "#42dd5b",
        "#00b300",
        "#50ffb4",
        "#a3e2c5",
        "#ff00ff",
        "#ff0064",
        "#ffb3a6",
        "#b36d61",
        "#9d2932",
        "#00ffff",
        "#0096ff",
        "#0000ff",
        "#b400ff",
        "#dc9eff"
      ],
      tjxuname1: [],
      iszd: false,
      detailobj: {
        "name": "上南路浦东南路",
        "nxb": 6,
        "bxn": 11,
        "zdkl": 5916,
        "zdsckl": 0,
        "zdxckl": 0,
        "lnglat": [121.494625, 31.177365]
      },
      nowindex: -1,
      value: '',
      snroad: '121.49271,31.186894,121.493453,31.183938,121.493926,31.18176,121.494625,31.178514,121.494946,31.17707,121.495417,31.174377,121.495666,31.173264,121.496045,31.171363,121.496526,31.170036,121.496946,31.16796,121.497064,31.166019,121.497185,31.16426,121.497434,31.162621,121.49773,31.161365,121.498394,31.159383,121.49941,31.157792,121.50027,31.156861,121.501573,31.155051,121.502069,31.154084,121.502791,31.153049,121.504402,31.151955,121.505419,31.151051,121.50563,31.150697,121.506013,31.149826,121.506485,31.148637,121.507918,31.146588,121.509881,31.144123,121.511801,31.141768,121.512654,31.140481,121.514089,31.138258,121.516229,31.134982,121.519945,31.128903,121.521159,31.126932',
      assloading: true,
      linewData: [],
      stationName: [""],
      nxbdata: [],
      mgdata: [],
      bxndata: [],
      myChart: null,
      myChart1: null,
    };
  },
  beforeCreate () { },
  created () {

    this.assloading = false
    this.linewData = mystate
    this.mgdata = mystatezcg
  },
  mounted () {
    this.M_initMap('lineIndex')
    this.gjxlwmsg(this.TestsetData(this.snroad, 2))
    this.getroaddata()

  },

  methods: {
    getroaddata () {
      console.log(mystate, mystatezcg)
      this.allstation(mystate)
      this.allstation(mystatezcg)
      this.$fetchPost(
        "route/composite",
        {
          cfd: -1, // 重复度
          gjcf: -1,
          fzxxs: -1, // 非直线系数
          cd: -1, // 长度
          bglrc: -1, // 百公里人次
          mzl: -1, // 满载率
          ifFilter: true
        },
        "json"
      ).then(res => {
        res.result.forEach(iteam => {
          myline.forEach(itam => {
            if (iteam.lineName == itam.name) {
              itam.geom = iteam.geom
            }
          })
        })
        this.lineaData = myline
        // console.log(this.linewData)
        // this.alllinepo(this.linewData)


      })

      //   this.initechart(arrX,arr1,arr2)
      //   this.initechart1(arrX,arr3,arr4,arr2)


    },
    toDetail (row) {

      this.tjxuname1 = []
      mystatezcg.forEach(itam => {
        if (itam.name == row.name) {
          let routearr = []
          let arr = itam.routeLine.split(';')
          this.lineaData.forEach((iu, index) => {
            arr.forEach(it => {
              if (it == iu.name) {
                iu.colors = this.allcolor[index]
                routearr.push(iu)
              }
            })
          })
          this.tjxuname1 = routearr
          this.alllinepo(routearr, 2)
        }
      })

    },
    toDetail1 (row) {

      this.tjxuname1 = []
      mystatezcg.forEach(itam => {
        if (itam.name == row.name) {
          let routearr = []
          let arr = itam.routeLine.split(';')
          this.lineaData.forEach((iu, index) => {
            arr.forEach(it => {
              if (it == iu.name) {
                iu.colors = this.allcolor[index]
                routearr.push(iu)
              }
            })
          })
          this.tjxuname1 = routearr
          console.log(this.tjxuname1)
          this.alllinepo(routearr, 2)
        }
      })

    },


  }
};
</script>
<style lang="scss">
.roadDistribution-box {
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
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(160);
    left: vw(20);
    display: flex;
    z-index: 10;
    align-items: center;
    color: #dae4ff;
  }
  .rightlinemsg2 {
    position: absolute;
    bottom: vh(40);
    left: vw(20);
    // width: vw(460);
    z-index: 10;
    max-height: vh(800);
    overflow: hidden;
    flex-direction: column;
    display: flex;
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    box-sizing: border-box;
    padding: 0 vw(20);
    padding-bottom: vh(10);
    .xincolor {
      display: inline-block;
      width: 1.5vw;
      height: 0.4vh;
      background: #ff0000;
      margin-right: 0.3vw;
    }
    .tit {
      width: 100%;
      height: vh(50);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(50);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align: center;
      font-weight: bold;

      border-bottom: 1px solid rgba(69, 120, 255, 0.6);
    }
  }

  .rightlinemsg {
    position: absolute;
    top: vh(180);
    right: vw(20);
    max-width: vw(600);
    z-index: 10;
    max-height: vh(860);
    overflow: hidden;
    flex-direction: column;
    display: flex;
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    p {
      margin: vh(4) 0;
    }
    .tit {
      width: 100%;
      height: vh(50);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(50);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align: center;
      font-weight: bold;
      box-sizing: border-box;
      padding: 0 vw(20);
      border-bottom: 1px solid rgba(69, 120, 255, 0.6);
    }
    .bttit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      color: #ffffff;
      padding: vh(10) vw(20);
      padding-left: vw(0);
      font-size: vw(16);
      margin-top: vh(16);
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.1) 10%,
        rgba(35, 198, 200, 0.2) 20%,
        rgba(35, 198, 200, 0.4) 30%,
        rgba(35, 198, 200, 0.5) 40%,
        rgba(35, 198, 200, 0.5) 50%,
        rgba(35, 198, 200, 0.5) 60%,
        rgba(35, 198, 200, 0.4) 70%,
        rgba(35, 198, 200, 0.3) 80%,
        rgba(0, 0, 0, 0) 90%,
        rgba(0, 0, 0, 0) 100%
      );
      div {
        flex: 1;
        text-align: center;
        margin-left: vw(20);
      }
    }
    .bttit1 {
      // padding:0;
      width: 100%;
      min-height: vh(42);
      // margin-bottom:vh(20);
      color: #ffffff;
      margin-top: vh(0);
      cursor: pointer;
      font-size: vw(16);
      background: none;
    }
    .bttit1:hover {
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
      color: #27b6ff;
      font-weight: bold;
    }
    .bttit2 {
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
      color: #27b6ff;
      font-weight: bold;
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
