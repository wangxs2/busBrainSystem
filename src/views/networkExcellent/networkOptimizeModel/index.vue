<template>
  <div
    class="roadDistribution-box"
    id="lineIndex"
    v-loading="assloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="go-back" @click="goBack">返 回</div>
    <div class="search-box-wrapper" v-if="searchInputBoxShow">
      <div class="search-box">
        <div style="margin-right: 0.6vw; width: 15vw">线路长度 ></div>
        <el-input
          v-model="lineOpQuery.length"
          placeholder="长度"
          type="number"
        ></el-input>
        <div style="margin-left: 0.2vw">km</div>
        <!-- <el-select
          size="small"
          filterable
          clearable
          @clear="expertont"
          @change="toDetail1()"
          v-model="value"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in linewData"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select> -->
      </div>
      <div class="search-box">
        <div style="margin-right: 0.6vw; width: 15vw">
          途径客运走廊线路长度/客运走廊长度 >
        </div>
        <el-input
          v-model="lineOpQuery.lengthOnlineZlPer"
          placeholder="长度"
          type="number"
        ></el-input>
        <div style="margin-left: 0.2vw">%</div>
      </div>
      <div class="search-box">
        <div style="margin-right: 0.6vw; width: 15vw">
          客运走廊上客流量/线路客流量 >
        </div>
        <el-input
          v-model="lineOpQuery.passengerOnlinePer"
          placeholder="客流量"
          type="number"
        ></el-input>
        <div style="margin-left: 0.2vw">%</div>
      </div>
      <div class="search-box">
        <div style="margin-right: 0.6vw; width: 15vw">客运走廊上客流量 ></div>
        <el-input
          v-model="lineOpQuery.passengerOnline"
          placeholder="客流量"
          type="number"
        ></el-input>
      </div>
      <div class="search-box">
        <div style="margin-right: 0.6vw; width: 15vw">定班线筛除</div>
      </div>
      <div class="btn-box">
        <!-- <div class="btn cancel" @click="cancelSearch">取 消</div> -->
        <div class="btn confirm" @click="confirmSearch">确 定</div>
      </div>
    </div>
    <div class="line-color-box">
      <div class="name-line" v-for="(item, index) in lineData" :key="index">
        <div class="name">{{ item.routeName }}</div>
        <div class="line" :style="{ background: item.lineColor }"></div>
      </div>
    </div>
    <!-- 线路排序按钮 -->
    <div class="right-btn-box">
      <div class="line-sort" @click="lineSort" v-if="lineSortBtnShow">
        线路排序
      </div>
      <div class="line-sort" @click="lineOptimize" v-if="lineSortShow">
        骨干线路优化
      </div>
      <div
        class="line-sort"
        @click="noLineOptimize"
        v-if="noLineOptimizeBtnShow"
      >
        下一步(非骨干线路优化)
      </div>
    </div>
    <!-- 线路排序 -->
    <div class="rightlinemsg" v-if="lineSortShow">
      <div class="tit">骨干线路排序</div>
      <div class="bttit">
        <div>排名</div>
        <div>线路名称</div>
        <div style="position: relative">途径客运走廊线路长度</div>
        <div style="position: relative">途径客运走廊线路长度占比</div>
        <div style="position: relative">线路途径客运走廊的客流量</div>
        <div>线路客流量</div>
        <div>非直线系数</div>
        <div style="position: relative">高峰发车间隔</div>
        <div>分值</div>
      </div>
      <div class="tablbox">
        <div
          :class="nowindex == n ? 'bttit bttit1 bttit2' : 'bttit bttit1'"
          @click="toDetail(item, n)"
          v-for="(item, n) in lineData"
          :key="n"
        >
          <div style="white-space: nowrap">{{ n + 1 }}</div>
          <div>{{ item.routeName }}</div>
          <div>{{ item.lengthOnline }}</div>
          <div>{{ item.lengthOnlinePer }}</div>
          <div>{{ item.passengerOnline }}</div>
          <div>{{ item.passenger }}</div>
          <div>{{ item.fzxxs }}</div>
          <div>{{ item.fcjg }}</div>
          <div>{{ item.score }}</div>
        </div>
      </div>
    </div>

    <div class="rightlinemsg2" v-if="lineSortShow">
      <div class="tit">根据排名，上南路骨干线路为：</div>
      <div class="content">
        {{ lineData && lineData.length > 0 ? lineData[0].routeName : '' }}
      </div>
    </div>
    <!-- 线路排序 -->
    <!-- 非骨干线路优化 -->
    <div class="rightlinemsg4" v-if="noLineOptimizeShow">
      <div class="tit">
        非骨干线路优化
        <div class="btn confirm" @click="noLineOptionmizeConfirm">确 定</div>
      </div>
      <div class="bttit">
        <div>序号</div>
        <div>线路名称</div>
        <div style="position: relative">途径客运走廊线路长度</div>
        <div style="position: relative">途径客运走廊线路长度占比</div>
        <div style="position: relative">线路途径客运走廊的客流量</div>
        <div>线路客流量</div>
        <div>非直线系数</div>
        <div style="position: relative">高峰发车间隔</div>
        <div>分值</div>
      </div>
      <div class="tablbox">
        <div
          :class="nowindex == n ? 'bttit bttit1 bttit2' : 'bttit bttit1'"
          @click="toDetailNoOptimize(item, n)"
          v-for="(item, n) in lineDataNo"
          :key="n"
        >
          <div style="white-space: nowrap">{{ n + 1 }}</div>
          <div>{{ item.routeName }}</div>
          <div>{{ item.lengthOnline }}</div>
          <div>{{ item.lengthOnlinePer }}</div>
          <div>{{ item.passengerOnline }}</div>
          <div>{{ item.passenger }}</div>
          <div>{{ item.fzxxs }}</div>
          <div>{{ item.fcjg }}</div>
          <div>{{ item.score }}</div>
        </div>
      </div>
    </div>
    <div class="rightlinemsg5" v-if="adjustwayScoreShow">
      <div class="tit">
        调整方式-评分
        <div class="btn confirm" @click="adjustScoreConfirm">确 定</div>
      </div>
      <div class="bttit">
        <div>调整方式</div>
        <div>分值</div>
      </div>
      <div class="tablbox">
        <div
          :class="nowindex == n ? 'bttit bttit1 bttit2' : 'bttit bttit1'"
          v-for="(item, n) in adjustType"
          :key="n"
        >
          <div>{{ item.name }}</div>
          <div>{{ item.value }}</div>
        </div>
      </div>
    </div>
    <!-- 非骨干线路优化 -->
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
      input: '',
      adjustType: [
        {
          name: '缩短',
          value: ''
        },
        {
          name: '拆分（合并）',
          value: ''
        },
        {
          name: '撤线',
          value: ''
        },
        {
          name: '改定班、高峰线',
          value: ''
        },
        {
          name: '新辟',
          value: ''
        },
      ],
      lineSortBtnShow: false,
      lineSortShow: false,
      noLineOptimizeBtnShow: false,
      noLineOptimizeShow: false,
      adjustwayScoreShow: false,
      searchInputBoxShow: true,
      lineOpQuery: {
        length: 13,
        lengthOnlineZlPer: 40,
        passengerOnlinePer: 40,
        passengerOnline: 1000,
      },
      lineData: [],
      lineDataNo: []
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
  },

  methods: {
    // 取消搜索默认线网数据
    cancelSearch () {

    },
    // 确认搜索默认线网数据
    confirmSearch () {
      this.M_map.clearMap();
      this.getroaddata()
      this.lineSortBtnShow = true
    },
    // 线路排序
    lineSort () {
      this.lineSortBtnShow = false
      this.lineSortShow = true
      this.searchInputBoxShow = false
    },
    // 骨干线路优化
    lineOptimize () {
      // 点击地图显示线路
      this.noLineOptimizeBtnShow = true
    },
    // 非骨干线路优化
    noLineOptimize () {
      this.lineSortShow = false
      this.noLineOptimizeBtnShow = false
      this.noLineOptimizeShow = true
    },
    // 非骨干线路优化确定按钮
    noLineOptionmizeConfirm () {
      this.adjustwayScoreShow = true
    },
    // 调整方式-评分弹框
    toDetailNoOptimize () {
      this.lineSortBtnShow = false
      // 点击确定地图显示线路
    },
    // 调整方式-评分确定按钮
    adjustScoreConfirm () {

    },
    // 返回按钮
    goBack () {
      this.searchInputBoxShow = true
      this.lineSortBtnShow = false
      this.lineSortShow = false
      this.noLineOptimizeBtnShow = false
      this.noLineOptimizeShow = false
      this.adjustwayScoreShow = false
    },
    expertont () {
      this.linewData1 = this.linewData
      this.alllinepo(this.linewData)
    },
    randomRgbColor () { //随机生成RGB颜色
      var r = Math.floor(Math.random() * 256); //随机生成256以内r值
      var g = Math.floor(Math.random() * 256); //随机生成256以内g值
      var b = Math.floor(Math.random() * 256); //随机生成256以内b值
      return `rgb(${r},${g},${b})`; //返回rgb(r,g,b)格式颜色
    },
    getroaddata () {
      this.lineData = []
      this.lineDataNo = []
      this.$fetchPost(
        "net/xwyh",
        {
          length: Number(this.lineOpQuery.length),
          lengthOnlineZlPer: Number(this.lineOpQuery.lengthOnlineZlPer),
          passengerOnlinePer: Number(this.lineOpQuery.passengerOnlinePer),
          passengerOnline: Number(this.lineOpQuery.passengerOnline),
        }
      ).then(res => {
        this.lineData = res.result
        this.lineData.forEach((item, index) => {
          item.lineColor = this.randomRgbColor()
          this.lineSearchPudong(item.routeName, item)
          if (index !== 0) {
            this.lineDataNo.push(item)
          }
        })


      })

    },
    getGaoDeLine (name) {

    },
    toDetail (row, index) {
      this.nowindex = index
      this.alllinepo([row])
      this.linewData1 = [itam]

    },
    toDetail1 () {
      this.linewData.forEach(itam => {
        if (itam.name == this.value) {
          this.alllinepo([itam])
          this.linewData1 = [itam]
        }
      })

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
</style>

<style lang="scss" scoped>
.roadDistribution-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .go-back {
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(140);
    left: vw(20);
    z-index: 10;
    background: rgba(12, 38, 104, 0.7);
    font-size: vw(20);
    padding: vh(10) vw(20);
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    box-sizing: border-box;
  }
  .search-box-wrapper {
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(200);
    left: vw(20);
    z-index: 10;
    background: rgba(12, 38, 104, 0.7);

    .search-box {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      color: #dae4ff;
      margin-bottom: vh(10);
      &:last-child {
        margin-bottom: 0;
      }
      .el-input {
        width: vw(100);
      }
    }
    .btn-box {
      display: flex;
      justify-content: flex-end;
      .btn {
        padding: vh(10) vw(20);
        border: 1px solid #27b6ff;
        border-radius: vw(5);
        &.cancel {
        }
        &.confirm {
          margin-left: vw(10);
        }
      }
    }
  }
  .line-color-box {
    position: absolute;
    bottom: vh(100);
    left: vw(20);
    width: vw(300);
    z-index: 10;
    height: vh(300);
    padding: vh(20) vw(20);
    // overflow: hidden;
    flex-direction: column;
    display: flex;
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    overflow: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    .name-line {
      display: flex;
      align-items: center;
      margin-bottom: vh(10);
      .name {
        font-size: vw(20);
        color: #fff;
      }
      .line {
        width: vw(100);
        height: vh(8);
        margin-left: vw(20);
      }
    }
  }
  .right-btn-box {
    display: flex;
    position: absolute;
    bottom: vh(100);
    right: vw(20);
    z-index: 10;
    .line-sort {
      font-size: vw(20);
      padding: vh(10) vw(20);
      background: rgba(12, 38, 104, 1);
      border: 1px solid rgba(69, 120, 255, 0.6);
      box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
      box-sizing: border-box;
      margin-left: vw(10);
    }
  }

  .rightlinemsg2 {
    position: absolute;
    bottom: vh(200);
    right: vw(20);
    z-index: 10;
    width: vw(600);
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    box-sizing: border-box;
    padding: 0 vw(20);
    padding-bottom: vh(10);

    .tit {
      width: 100%;
      height: vh(50);
      font-size: vw(20);
      color: #ffffff;
      line-height: vh(50);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align: center;
      font-weight: bold;

      border-bottom: 1px solid rgba(69, 120, 255, 0.6);
    }
    .content {
      font-size: vw(18);
      line-height: vh(20);
      margin-top: vh(10);
    }
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
    max-height: vh(600);
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

  .rightlinemsg5 {
    position: absolute;
    top: vh(600);
    right: vw(20);
    width: vw(450);
    z-index: 10;
    max-height: vh(260);
    // overflow: hidden;
    flex-direction: column;
    display: flex;
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    //  overflow: hidden;
    box-sizing: border-box;
    .tit {
      position: relative;
      .btn {
        position: absolute;
        top: vh(10);
        right: vw(10);
        height: vh(30);
        width: vw(70);
        line-height: vh(30);
        text-align: center;
        border: 1px solid #27b6ff;
        border-radius: vw(5);
      }
    }
    .bttit {
      width: 100%;
      padding: vh(10) vw(5);
      box-sizing: border-box;
      &.bttit1 {
        height: vh(25);
      }
    }
  }
  .rightlinemsg4 {
    position: absolute;
    top: vh(180);
    right: vw(20);
    max-width: vw(600);
    z-index: 10;
    max-height: vh(400);
    // overflow: hidden;
    flex-direction: column;
    display: flex;
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    //  overflow: hidden;
    overflow: scroll;
    .tit {
      position: relative;
      .btn {
        position: absolute;
        top: vh(10);
        right: vw(10);
        height: vh(30);
        width: vw(70);
        line-height: vh(30);
        text-align: center;
        border: 1px solid #27b6ff;
        border-radius: vw(5);
      }
    }
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
</style>
