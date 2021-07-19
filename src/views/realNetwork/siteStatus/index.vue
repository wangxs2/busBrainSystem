<template>
  <div class="siteStatus" id="siteStatus">
    <div class="search-box">
      <div style="margin-right:0.8vw">行政区域</div>
      <el-select style="margin-right:1.5vw" clearable  filterable size="small" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.regionName"
          :label="item.regionName"
          :value="item.regionName"
        ></el-option>
      </el-select>
      <div style="margin-right:0.8vw">站点类型</div>
      <el-select style="margin-right:1.5vw" clearable  filterable size="small" v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <!-- <div @click="allheat" :class="isheat==2?'rltbtn rltbtn1':'rltbtn'" style="margin-left:1.8vw">热力图</div>   -->
      <div @click="allpoint" :class="point==1?'rltbtn rltbtn1':'rltbtn'" style="margin-left:1.8vw">数据统计</div>
    </div>
    <div v-if="point==1" class="leftlinemsg">
      <div class="tit">
        <div class="titw">站点总数</div>
        <div>4326辆</div>
      </div>
      <div class="boeline"></div>
      <div class="itmsg-box">
        <div class="itmsg">
          <div class="itmsgs">
            <i slot="prefix" class="iconfont iconIOTtubiao_huabanfuben" ></i>
            有线路经过
          </div>
          <div>0</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
           <i slot="prefix" class="iconfont iconhuaban-" ></i>
           无线路经过
          </div>
          <div>0</div>
        </div>
    
      </div>
    </div>
  </div>
</template>

<script>
import MapMixin from '../../networkExcellent/networkMap'
export default {
  mixins: [MapMixin],
  data() {
  return {
    options: [],
    options1: [
      {
        id:1,
        name:"中途站"
      },
      {
        id:2,
        name:"首末站"
      },
      {
        id:3,
        name:"枢纽站"
      }
    ],
    value:"",
    value1:"",
    point:1,
    isheat:1,
  }
  },
  created(){
    this.getAreaLine()
  },
  mounted(){
    this.M_initMap('siteStatus')
  },
  methods:{
    allpoint(){
      if(this.point==1){
        this.point=2
      }else{
        this.point=1
      }
    },
    
    getAreaLine(){
      this.$fetchGet("passenger/region").then(res => {
        this.options=res.result
        setTimeout(()=>{
        this.$store.commit('SET_LOADING',false)
        },200)
      })
    },
  }
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.siteStatus{
  width: 100%;
  height: 100%;
  position: relative;
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(140);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
    z-index: 10;
    .clearbtn{
      width: vw(60);
      height: vh(32);
      background: rgba(69, 120, 255, 0.35);
      border: 1px solid rgba(39, 182, 255, 0.5);
      border-radius: 2px;
      text-align:center;
      line-height:vh(32);
      cursor:pointer;
    }
    .clearbtn:active{
      background: rgba(69, 120, 255, 0.6);
    }
    .rltbtn{
      width: vw(80);
      height: vh(34);
      background: rgba(26, 66, 118, 0.2);
      border: 1px solid #27B6FF;
      border-radius: vw(18);
       box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset;
       text-align:center;
      line-height:vh(34);
      cursor:pointer;

    }
    .rltbtn:active{
      background: rgba(26, 66, 118, 0.8);
    }
    .rltbtn1{
      background: #4578FF;
      color:#ffffff;
    }
    .rltbtn2{
      background: #4578FF;
    }
    .qhbtn{
      width: vw(120);
      height: vh(36);
      background: rgba(26, 66, 118, 0.2);
      border: 1px solid #27B6FF;
      border-radius: vw(18);
      box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset;
      display:flex;
      align-items: center;
      margin-left:vw(12);
      .btnnow{
        flex:1;
        text-align:center;
        height:100%;
        line-height:vh(36);
        cursor:pointer;
      }
      .btnnow:first-child{
        border-top-left-radius:vw(18);
        border-bottom-left-radius:vw(18);
      }
      .btnnow:last-child{
        border-top-right-radius:vw(18);
        border-bottom-right-radius:vw(18);
      }
      .activebtn{
        background: #4578FF;
      }
    }
  }
 .leftlinemsg {
    position: absolute;
    top: vh(145);
    right: vw(20);
    width: vw(370);
    height: vw(200);
    background: url("~@/assets/image/bjk.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    padding:0 vw(24);
     z-index: 10;
    .tit {
      width: 100%;
      height: vw(60);
      font-size: vw(17);
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      // padding:0 vw(24);
      padding-top:vh(10);
      .titw{
        text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
          -0 -0 1.4em rgba(255, 255, 255, 0.7);
        font-weight: bold;
      }
    }
    .boeline{
      width: 100%;
      height: 1px;
      background: #00FFFF;
      opacity: 0.5;
    }
    .itmsg-box {
      box-sizing: border-box;
      // padding: 0 vw(32);
      margin-top: vh(22);
      .itmsg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: vh(28);
        .itmsgs {
          display: flex;
          align-items: center;
          i{
            font-size:vw(19);
            color:#5D89FF;
            margin-right:vw(8);
          }
        }
      }
    }
    
  }
  .leftlinemsg1 {
      top: vh(460);
      height:vw(332);
      .itmsg-box{
        .itmsg{
          margin-bottom: vh(12);
        }
      }
      
  }
 
}
</style>
