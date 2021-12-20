<template>
  <div
    class="roadDistribution-box"
    id="lineIndex"
    v-loading="assloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="search-box">
      <div style="margin-right: 0.6vw; width: 3.6vw">线路名称</div>
      <el-select
        popper-class="select-mltiple"
        size="small"
        filterable
        clearable
        multiple
        @clear="expertont"
        @change="toDetail1"
        v-model="value"
        placeholder="请选择"
      >
        <el-option
          v-for="(item, index) in linewData"
          :key="index"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </div>
    <div class="rightlinemsg">
      <div class="tit">上南路公交线路一览表</div>
      <div class="bttit">
        <div>序号</div>
        <div>线路名称</div>
        <div>所属公司</div>
        <div style="position: relative">
          非直线系数
          <img
            class="sxactive"
            @click="sottable('非直线系数', 'sx')"
            width="18"
            height="18"
            src="../../../assets/image/sx.png"
          />
          <img
            class="sxactive1"
            @click="sottable('非直线系数', 'jx')"
            width="18"
            height="18"
            src="../../../assets/image/jx.png"
          />
        </div>
        <div style="position: relative">
          线路总长(km)
          <img
            @click="sottable('线路总长', 'sx')"
            class="sxactive"
            width="18"
            height="18"
            src="../../../assets/image/sx.png"
          />
          <img
            @click="sottable('线路总长', 'jx')"
            class="sxactive1"
            width="18"
            height="18"
            src="../../../assets/image/jx.png"
          />
        </div>
        <div style="position: relative">
          路径上长度(km)
          <img
            @click="sottable('路径上长度', 'sx')"
            class="sxactive"
            width="18"
            height="18"
            src="../../../assets/image/sx.png"
          />
          <img
            @click="sottable('路径上长度', 'jx')"
            class="sxactive1"
            width="18"
            height="18"
            src="../../../assets/image/jx.png"
          />
        </div>
        <div>站点数</div>
        <div>路径上站点数</div>
        <div style="position: relative">
          站点占比
          <img
            @click="sottable('站点占比', 'sx')"
            class="sxactive"
            width="18"
            height="18"
            src="../../../assets/image/sx.png"
          />
          <img
            @click="sottable('站点占比', 'jx')"
            class="sxactive1"
            width="18"
            height="18"
            src="../../../assets/image/jx.png"
          />
        </div>
        <div>配车数</div>
        <div>全天客流</div>
        <div>上南路相关客流</div>
        <div>百公里人次</div>
      </div>
      <div class="tablbox">
        <div
          :class="nowindex == n ? 'bttit bttit1 bttit2' : 'bttit bttit1'"
          @click="toDetail(item, n)"
          v-for="(item, n) in linewData1"
          :key="n"
        >
          <div style="white-space: nowrap">{{ n + 1 }}</div>
          <div>{{ item.name }}</div>
          <div>{{ item.company }}</div>
          <div>{{ item.fzxxs }}</div>
          <div>{{ item.lengthall }}</div>
          <div>{{ item.lhsleng }}</div>
          <div>{{ item.stnum }}</div>
          <div>{{ item.ljnum }}</div>
          <div>{{ parseInt(item.zdzb * 100) }}%</div>
          <div>{{ item.pcs }}</div>
          <div>{{ item.qtkl }}</div>
          <div>{{ item.xgkl }}</div>
          <div>{{ item.bglrc }}</div>
        </div>
      </div>
    </div>

    <div class="rightlinemsg1">
      <div class="tit">上南路公交线网总体情况</div>
      <div style="margin-top: 1vh">道路长度：7.3km</div>
      <div style="margin: 0.5vh 0">线路总数：31条</div>

      <el-tooltip class="item" effect="dark" placement="top">
        <div slot="content">
          <img src="../../../assets/image/pjcd.png" />
        </div>
        <div style="cursor: pointer">线路平均覆盖长度：2.6km</div>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" placement="top">
        <div slot="content">
          <img src="../../../assets/image/gscfxs.png" />
        </div>
        <div style="cursor: pointer; margin: 0.5vh 0">线路重复系数：10.8</div>
      </el-tooltip>
      <div>站点总数：南向北 12个，北向南 11个</div>
    </div>
  </div>
</template>
<script>
import MapMixin from '../mapmimx'
import myline from '../linall.json'
export default {
  mixins: [MapMixin],
  components: {
  },
  data () {
    return {
      nowindex: -1,
      value: '',
      snroad: '121.49271,31.186894,121.493453,31.183938,121.493926,31.18176,121.494625,31.178514,121.494946,31.17707,121.495417,31.174377,121.495666,31.173264,121.496045,31.171363,121.496526,31.170036,121.496946,31.16796,121.497064,31.166019,121.497185,31.16426,121.497434,31.162621,121.49773,31.161365,121.498394,31.159383,121.49941,31.157792,121.50027,31.156861,121.501573,31.155051,121.502069,31.154084,121.502791,31.153049,121.504402,31.151955,121.505419,31.151051,121.50563,31.150697,121.506013,31.149826,121.506485,31.148637,121.507918,31.146588,121.509881,31.144123,121.511801,31.141768,121.512654,31.140481,121.514089,31.138258,121.516229,31.134982,121.519945,31.128903,121.521159,31.126932',
      assloading: true,
      linewData: [],
      linewData1: [],
    };
  },
  beforeCreate () { },
  created () {
    this.getroaddata()
    this.assloading = false
    //  沪塘专线
    //     万周专线
    //     627路
    //     973路
    //     755路
    //     810路

  },
  mounted () {
    this.M_initMap('lineIndex')
    this.gjxlwmsg(this.TestsetData(this.snroad, 2))
  },

  methods: {
    expertont () {
      this.linewData1 = this.linewData
      this.alllinepo(this.linewData)
      this.stationSearchPudong(this.linewData)
    },
    getroaddata () {
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
        this.linewData = myline
        this.linewData1 = this.linewData
        console.log(this.linewData)
        this.alllinepo(this.linewData)
        this.stationSearchPudong(this.linewData)


      })

    },
    sottable (name, type) {
      switch (name) {
        case "非直线系数":
          if (type == 'sx') {
            this.linewData = this.linewData.sort((a, b) => {
              return a.fzxxs - b.fzxxs
            })
          } else if (type == 'jx') {
            this.linewData = this.linewData.sort((a, b) => {
              return b.fzxxs - a.fzxxs
            })
          }
          break;
        case "线路总长":

          if (type == 'sx') {
            this.linewData = this.linewData.sort((a, b) => {
              return a.lengthall - b.lengthall
            })
          } else if (type == 'jx') {
            this.linewData = this.linewData.sort((a, b) => {
              return b.lengthall - a.lengthall
            })
          }

          break;
        case "路径上长度":

          if (type == 'sx') {
            this.linewData = this.linewData.sort((a, b) => {
              return a.lhsleng - b.lhsleng
            })
          } else if (type == 'jx') {
            this.linewData = this.linewData.sort((a, b) => {
              return b.lhsleng - a.lhsleng
            })
          }

          break;
        case "站点占比":

          if (type == 'sx') {
            this.linewData = this.linewData.sort((a, b) => {
              return a.zdzb - b.zdzb
            })
          } else if (type == 'jx') {
            this.linewData = this.linewData.sort((a, b) => {
              return b.zdzb - a.zdzb
            })
          }

          break;


        default:

      }

    },
    toDetail (row, index) {
      this.nowindex = index
      this.alllinepo([row])
      this.stationSearchPudong([row])
      this.linewData1 = [row]

    },
    toDetail1 (val) {
      let curSelectArr = []
      this.allstationin_closeInfoWin()
      val.forEach(iteam => {

        this.linewData.forEach(itam => {
          if (itam.name == iteam) {
            curSelectArr.push(itam)
          }
        })
      })
      this.alllinepo(curSelectArr)
      this.stationSearchPudong(curSelectArr)
      this.linewData1 = curSelectArr

    }

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
.select-mltiple {
  .el-select-dropdown.is-multiple,
  .el-select-dropdown__item.selected {
    background: #458cff !important;
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
  .rightlinemsg1 {
    position: absolute;
    bottom: vh(60);
    left: vw(20);
    // width: vw(314);
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
    top: vh(160);
    right: vw(20);
    max-width: vw(600);
    z-index: 10;
    max-height: vh(700);
    // overflow: hidden;
    flex-direction: column;
    display: flex;
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    //  overflow: hidden;
    overflow: scroll;
    .sxactive {
      position: absolute;
      right: -12px;
      top: 14px;
      cursor: pointer;
    }
    .sxactive:active {
      top: 16px;
    }
    .sxactive1 {
      position: absolute;
      right: -12px;
      top: 28px;
      cursor: pointer;
    }
    .sxactive1:active {
      top: 30px;
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
      width: vw(1000);
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
      width: vw(1000);
      height: vh(42);
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
      // overflow: hidden;
      // overflow-y: scroll;
      margin-top: vh(12);
      margin-bottom: vh(30);
    }
  }
}
</style>
