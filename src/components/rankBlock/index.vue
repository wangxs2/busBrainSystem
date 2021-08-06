<template>
  <div class="rank-block">
    <div class="block-centent">
      <transition-group name="custom-classes-transition"
                        tag="div"
                        enter-active-class="bounce-my-enter"
                        leave-active-class="bounce-my-leave">
          <div class="lenglen" v-for="item in ranking"
             :key="item.index">
            <div>
              <div :class="item.index==1?'roud roud1':item.index==2?'roud roud2':item.index==3?'roud roud3':'roud'">{{item.index}}</div>
            </div>
            <div class="fontlen">{{item.routeName}}</div>
            <div class="lneib">
              <div :style="{width:(item.lineLength/79*167)+'px'}" class="lnei"></div>
            </div>
            <div>{{item.lineLength.toFixed(2)}}km</div>
          </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { arrGroup } from '@/libs/util.js';
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';

// interface PropData {
//   percentage: string;
//   index: number;
//   name: string;
//   describe: string;
//   [propName: string]: any;
// }

export default  {
 props:{
    gradientRamp: { // 渐变色
      type: Array,
      required: false,
      default: ''
    },
    blockTit: { // 标题
      type: String,
      required: false,
      default: ''
    },
    fontColor: { // 颜色
      type: String,
      required: false,
      default: ''
    },
    rankData: { // 原始数据
      type: Array,
      required: false,
      default: ''
    },


 },
  data(){
    return{
       // 分组数据
      groupData: [],
      // 当前数据
      ranking:  [],
      TimeNum:  null,
      TimeSubNum:  null,
    }
  },


  created() {
  },
  watch:{
    'rankData':{
      handler:function(val,oldval){
        if (val.length) {
          if (this.TimeNum) {
            clearTimeout(this.TimeNum);
            this.TimeNum = null;
          }

          if (this.TimeSubNum) {
            clearTimeout(this.TimeSubNum);
            this.TimeSubNum = null;
          }

          this.groupData = arrGroup(this.rankData, 5);
          this.rankAnimation(0);
        }
      },
      immediate: true
    }
  },
  methods:{
     // 排行的动画
    rankAnimation(index) {
      if (this.TimeNum) {
        clearTimeout(this.TimeNum);
        this.TimeNum = null;
      }

      // 每组中的数据切换
      const animationItem = (id) => {
        if (this.TimeSubNum) {
          clearTimeout(this.TimeSubNum);
          this.TimeSubNum = null;
        }
        this.$set(this.ranking, id, this.groupData[index][id]);

        this.TimeSubNum = setTimeout(() => {
          if (id < this.groupData[index].length - 1) {
              animationItem(++id);
          }
        }, 1200);
      };

      animationItem(0);

      // 每组切换
      this.TimeNum = setTimeout(() => {
        index = index < this.groupData.length - 1 ? index + 1 : 0;
        this.rankAnimation(index);
      }, 10000);
    }
    
  },
  
 
}
</script>

<style lang="scss" scoped>
.rank-block {
  width: 100%;
  height: 100%;
  padding: vh(0) vw(10);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .block-tit {
    font-size: vh(9);
    color: #f4f4f4;
    font-weight: 600;
  }
  .block-centent {
    flex: 1;
    width: 100%;
    height: 1px;
    position: relative;
    box-sizing:border-box;
    padding:vh(6) vw(10);
    .lenglen{
      display:flex;
      align-items: center;
      width:100%;
       height:vh(38);
      justify-content: space-between;
      .roud{
          width: vw(18);
          height:vw(18);
          background: #4578FF;
          border-radius: 50%;
          // padding:vh(2) vw(2);
          font-size:vw(12);
          line-height:vw(20);
          text-align:center;
          margin-right:vw(8);
        }
        .roud1{
          background: #E1453E;
        }
        .roud2{
          background: #E19E3E;
        }
        .roud3{
          background: #38CE97;
        }
      .lneib{
        width:vw(167);
        background: rgba(0, 255, 255, 0.1);
        border-radius: 6px;
        box-shadow: 0px 0px vh(5) #00FFFF inset;
        margin-right:vw(4);
      }
      .fontlen{
        width:vw(80);
        text-align:right;
        margin-right:vw(16);
      }
      .lnei{
        width: 167px;
        height: 12px;
        background: linear-gradient(-90deg, #00FFFF 0%, #4578FF 100%);
        // box-shadow: 0px 0px vh(10) #00FFFF inset;
        border-radius: 6px;
      }

    }
  }

  .bounce-my-enter {
    backface-visibility: visible;
    animation: myflip 1s;
  }
  @keyframes myflip {
    from {
      transform: rotate3d(1, 0, 0, 360deg);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    40% {
      transform: rotate3d(1, 0, 0, 190deg);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    50% {
      transform: rotate3d(1, 0, 0, 170deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    80% {
      transform: rotate3d(1, 0, 0, 0deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    to {
      transform: rotate3d(1, 0, 0, 0deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
  }
  .list-complete-enter,
  .list-complete-leave-to {
    opacity: 0;
  }
  .list-complete-leave-active {
    position: absolute;
    opacity: 0;
  }
  .bounce-my-leave {
    position: absolute;
  }
}
</style>
