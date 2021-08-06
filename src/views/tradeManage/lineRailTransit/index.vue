<template>
  <div class="lineRailTransit">
    <div class="letft-box">
      <div class="titbox" style="margin-bottom:8px">非直线系数</div>
      <div class="con-box table-data" >
        <div class="table-header">
        
          <div style="width:10%"></div>
          <div style="width:45%">线路名称</div>
          <div style="width:45%">非直线系数</div>
          
        </div>
        <div class="table-contain swiper-container" id="swiper3">
          <div class="swiper-wrapper">
            <div class="swiper-slide"   v-for="(iteam,index) in qdData" :key="index">
              <div class="tableTr" v-for="(item,o) in iteam" :key="item.index">
          
                <div  style="width:10%">
                  <div :class="item.index==1?'roud roud1':item.index==2?'roud roud2':item.index==3?'roud roud3':'roud'">{{item.index}}</div>
                </div>
                <div style="width:45%">{{item.routeName}}</div>
                <div style="width:45%">{{item.coefficient.toFixed(2)}}</div>
              </div>
            </div>
          </div>
          <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-if="alldata.length==0">无数据</div>
        </div>



      </div>
      <div class="titbox" style="margin-bottom:8px;margin-top:18px">线路重复系数</div>
      <div class="con-box table-data" >
        <div class="table-header">
        
          <div style="width:10%"></div>
          <div style="width:45%">线路名称</div>
          <div style="width:45%">线路重复系数</div>
          
        </div>
        <div class="table-contain swiper-container" id="swiper4">
          <div class="swiper-wrapper">
            <div class="swiper-slide"   v-for="(iteam,index) in qdData" :key="index">
              <div class="tableTr" v-for="(item,o) in iteam" :key="item.index">
          
                <div  style="width:10%">
                  <div :class="item.index==1?'roud roud1':item.index==2?'roud roud2':item.index==3?'roud roud3':'roud'">{{item.index}}</div>
                </div>
                <div style="width:45%">{{item.routeName}}</div>
                <div style="width:45%">{{item.coefficient.toFixed(2)}}</div>
              </div>
            </div>
          </div>
          <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-if="alldata.length==0">无数据</div>
        </div>
      </div>

      <div class="titbox" style="margin-top:18px">百公里人数</div>
      <div class="big-tab swiper-container" id="swiper2" >
        <div class="swiper-wrapper">
          <div class="swiper-slide"  v-for="(iteam,index) in personData" :key="index">
             <div class="big-tab2"  v-for="(item,index) in iteam" :key="item.index">
              <div :class="item.index==1?'itea-per itea-per3':item.index==2?'itea-per itea-per4':item.index==3?'itea-per itea-per5':'itea-per'">{{item.index}}</div>
              <div :class="item.index==1?'itea-per1 itea-per7':item.index==2?'itea-per1 itea-per8':item.index==3?'itea-per1 itea-per9':'itea-per1'">{{item.xlmc}}</div>
              <div class="itea-per2">{{item.baipass}}人</div>
            </div>

          </div>
        </div>
       
        
      </div>
      

    </div>
    <div class="center-box">
      <div class="map-box">
        <div class="map-box1" ref="compreMap"  id="compreMap">
          <img @click="mapFullEvent()" class="qpbtn" width="24" height="24" src="@/assets/image/home/qp.png" alt="" srcset="">
          <div class="bitit-box">
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_zzry.png" alt="" srcset="">
                <div>
                    <div class="bigttn">13266</div>
                    <div class="bigttn1">在职人数(人)</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_gjxl.png" alt="" srcset="">
                <div>
                    <div class="bigttn">454</div>
                    <div class="bigttn1">公交线路数(条)</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_kll.png" alt="" srcset="">
                <div>
                    <div class="bigttn">7453</div>
                    <div class="bigttn1">客流量(人次)</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_qzz.png" alt="" srcset="">
                <div>
                    <div class="bigttn">97%</div>
                    <div class="bigttn1">起讫站发车准点率</div>
                </div>
            </div>
          </div>
          <div class="seting-box" >
            <div class="settit">显示设置</div>
            <div class="table-box">
              <div  class="table-iteanm" v-for="(iteam,n) in tlstation" :key="n">
                <img @click="toShow(iteam,n)" v-if="iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxktrue.png" />
                <img @click="toShow(iteam,n)" v-if="!iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxkfalse.png" />
                <div class="natit">{{iteam.name}}</div>
                
              </div>
            </div>

          </div>
          <div class="search-box">
            <el-select style="" clearable  filterable  size="small" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.regionName"
                :label="item.regionName"
                :value="item.regionName"
              ></el-option>
            </el-select>
            <el-select style="margin-top:1.2vh" clearable  filterable  size="small" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.regionName"
                :label="item.regionName"
                :value="item.regionName"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="titbox" style="margin-bottom:8px;margin-top:6px">数据清单</div>
      <div class="table-data table-data1">
        <div class="table-header">
        
          <div style="width:15%">线路名称</div>
          <div style="width:25%">反映时间</div>
          <div style="width:30%">反映内容</div>
          <div style="width:15%">处置状态</div>
          <div style="width:15%">处置情况</div>
          
        </div>
        <div class="table-contain swiper-container" id="swiper1">
          <div class="swiper-wrapper">
            <div class="swiper-slide"   v-for="(iteam,index) in qdData" :key="index">
              <div class="tableTr" v-for="(item,i) in iteam" :key="i+2">
                <div  style="width:15%">
                  <div>{{index+1}}</div>
                </div>
                <div style="width:25%">{{item.routeName}}</div>
                <div style="width:30%">{{item.coefficient.toFixed(2)}}</div>
                <div style="width:15%">{{item.routeName}}</div>
                <div style="width:15%">{{item.coefficient.toFixed(2)}}</div>

              </div>
            
              
            </div>
          </div>
          <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-if="alldata.length==0">无数据</div>
        </div>
      </div>
      
    </div>
    <div class="right-box">
      <div class="titbox">满载率</div>
      <div class="big-tab big-tab1 swiper-container" id="swiper6">
        <div class="swiper-wrapper">
          <div class="swiper-slide"   v-for="(iteam,index) in personData1" :key="index">
           <div class="big-tab8" v-for="(item,o) in iteam" :key="item.index">
              <svg width="80px" height="80px" class="svg">
                  <circle r="30" cy="40" cx="40" stroke-width="10" stroke="#00ffff26" stroke-linejoin="round" stroke-linecap="round" fill="none"/>
                  <circle class="progress" r="30" cy="40" cx="40" stroke-width="10" :stroke="item.index==1?'#E1453E':item.index==2?'#E19E3E':item.index==3?'#38CE97':'#1593FF'" stroke-linejoin="butt" stroke-linecap="butt" fill="none" stroke-dashoffset="50px" stroke-dasharray="200px" />
                  <text x="25" y="45" fill="#ffffff" class="txt" id="txt"> 40%</text>
              </svg>
              <div :class="item.index==1?'btfon btfon6':item.index==2?'btfon btfon7':item.index==3?'btfon btfon8':'btfon'">
                <div  :class="item.index==1?'btfon1 btfon3':item.index==2?'btfon1 btfon4':item.index==3?'btfon1 btfon5':'btfon1'">{{item.index}}</div>
                {{item.xlmc}}
              </div>
            </div>
          </div>
        </div>
        <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-if="alldata.length==0">无数据</div>
      </div>



      <div class="titbox" style="margin-top:18px">线路长度</div>
      <div class="big-tab big-tab4">
        <rank-block
          :rank-data="OverlengData"
          :gradient-ramp="['#E9795B', '#FF9A85']"
          block-tit
          font-color="#FF9A85"
        ></rank-block>
        
      </div>
      <div class="titbox" style="margin-bottom:8px;margin-top:18px">长期拥堵路段</div>
      <div class="con-box table-data" >
        <div class="table-header">
          <div style="width:10%"></div>
          <div style="width:45%">道路名称</div>
          <div style="width:45%">拥堵系数</div>
        </div>
        <div class="table-contain swiper-container" id="swiper5">
          <div class="swiper-wrapper">
            <div class="swiper-slide"   v-for="(iteam,index) in qdData" :key="index">
              <div class="tableTr" v-for="(item,o) in iteam" :key="item.index">
          
                <div  style="width:10%">
                  <div :class="item.index==1?'roud roud1':item.index==2?'roud roud2':item.index==3?'roud roud3':'roud'">{{item.index}}</div>
                </div>
                <div style="width:45%">{{item.routeName}}</div>
                <div style="width:45%">{{item.coefficient.toFixed(2)}}</div>
              </div>
            </div>
          </div>
          <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-if="alldata.length==0">无数据</div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import MapMixin from '../../networkExcellent/networkMap';
import Swiper from "swiper";
import rankBlock from "@/components/rankBlock/index.vue";
import { arrGroup } from '@/libs/util.js';
 import screenfull from "screenfull";
export default {
  mixins: [MapMixin],
  components: {
    rankBlock
  },
  data(){
    return{
      alldata:[],
      OverlengData:[],
      personData:[],
      value:'',
      swipertable:null,
      swipertable2:null,
      swipertable3:null,
      swipertable4:null,
      swipertable5:null,
      swipertable6:null,
      qdData:[],
      options:[],
      personData1:[],
      tlstation:[
        {
            name:'客流',
            isxz:true,
          },
          {
            name:'运行分析',
            isxz:false,
          },
          {
            name:'两网融合',
            isxz:false,
          },
          {
            name:'辅助决策',
            isxz:true,
          }
      ]
    }

  },
  mounted() {
    this.M_initMap('compreMap')
    this.initSwipertable()
    this.trafficLayer.setMap(this.M_map);
  },
  created(){
      
      this.getNoLi()
      this.getOverleng()
      this.getAreaLine()
      this.getPerion()
      
  },
  methods:{
    getNoLi(){
      this.$fetchGet("route/straightCoefficient").then(res => {
         res.result.forEach((item,index)=>{
          item.index = index + 1;
        })
        this.alldata=res.result;
        this.qdData=arrGroup(res.result,5)
      })
    },
    toShow(row,n){
      row.isxz=!row.isxz
    },
    getAreaLine(){
      this.$fetchGet("passenger/region").then(res => {
        this.options=res.result
      })
     
    },
    //线路长度
    getOverleng(){
      this.$fetchGet("route/overLength").then(res => {
        res.result.forEach((item,index)=>{
          item.index = index + 1;
        })
        this.OverlengData=res.result;
      })
    },
     // 设置地图全屏显示
    mapFullEvent () {
      console.log(screenfull)
      if (!screenfull.isEnabled) {
        return false
      }
      screenfull.toggle(this.$refs.compreMap)
    },
    getPerion(){
      this.$fetchGet("route/hundreds",{
      }).then(res => {
        // personData=this.
        res.result.forEach((iteam,index)=>{
          iteam.index = index + 1;
        })
        this.personData = arrGroup(res.result,8);
         this.personData1 = arrGroup(res.result,6);

         setTimeout(()=>{
          this.$store.commit('SET_LOADING',false)
          },200)
      })

    },
    initSwipertable() {
      this.swipertable = new Swiper("#swiper1", {
        loop: true, // 循环模式选项
        direction: "vertical",
        mousewheel: true,
        autoplay: {
          delay: 5000 // 切换时间
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      this.swipertable2 = new Swiper("#swiper2", {
        loop: true, // 循环模式选项
        mousewheel: true,
        autoplay: {
          delay: 8000 // 切换时间
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      this.swipertable3 = new Swiper("#swiper3", {
        loop: true, // 循环模式选项
        direction: "vertical",
        mousewheel: true,
        autoplay: {
          delay: 6000 // 切换时间
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      this.swipertable4 = new Swiper("#swiper4", {
        loop: true, // 循环模式选项
        direction: "vertical",
        mousewheel: true,
        autoplay: {
          delay: 7500 // 切换时间
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      this.swipertable5 = new Swiper("#swiper5", {
        loop: true, // 循环模式选项
        direction: "vertical",
        mousewheel: true,
        autoplay: {
          delay: 7500 // 切换时间
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      this.swipertable6 = new Swiper("#swiper6", {
        loop: true, // 循环模式选项
        mousewheel: true,
        autoplay: {
          delay: 5000 // 切换时间
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });

    },
  }
  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.lineRailTransit{
  width:100%;
  height: 100%;
   background: url("~@/assets/image/zhbj.png");
    background-size: 100% 100%;
    display: flex;
    box-sizing: border-box;
    padding:vh(12) vw(16);
    .titbox{
      width:100%;
      height:vh(56);
      background: #0C2668;
      font-size: vw(20);
      font-weight: bold;
      line-height: vh(56);
      box-sizing: border-box;
      padding-left: vw(22);

    }
    .con-box{
      width: vw(380);
      height: vh(252);
      box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 1) inset;
      

    }
    .table-data{
      box-sizing: border-box;
      overflow:hidden;
      display:flex;
      flex-direction: column;
      .table-header{
        width:100%;
        height:vh(50);
        line-height:vh(50);
        color: #00FFFF;
        font-size:vw(16);
        display:flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 vw(20);
        padding-top:vh(8);
        div{
          // flex:1;
          text-align:center;
          font-weight: bold;
        }
      }
      .table-contain{
        // flex:1;
        overflow:hidden;
        // overflow-y:scroll;
        .tableTr{
          width:100%;
          height:vh(40);
          color: #ffffff;
          font-size:vw(16);
          display:flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          padding: 0 vw(20);
          cursor:pointer;
          div{
            // flex:1;
            display:flex;

            justify-content:center;
          }
          .roud{
            width: vw(18);
            height:vw(18);
            background: #4578FF;
            border-radius: 50%;
            font-size:vw(12);
            line-height:vw(18);
            text-align:center;
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

        }
        .tableTr:hover {
          background:rgba(12, 38, 104, 0.5);
          // color: #4578FF;
          // font-weight:bold;
        } 
        .tableTr:nth-child(even){
          // background:rgba(12, 38, 104, 0.2)

        }
      }
    }
    .table-data1{
      .table-header{
        width:100%;
        height:vh(40);
        background: rgba(12, 38, 104, 0.2);
        color: #4578FF;
        font-size:vw(14);
        box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset;
        display:flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 vw(20);
     
      }
      .table-contain{
          border:1px solid rgba(39, 182, 255, 0.2);
      }
    
      .tableTr:nth-child(even){
        background:rgba(12, 38, 104, 0.2)

      }

    }
  .big-tab8{
   display:flex;
    flex-direction: column;
    align-items: center;
    margin-left:vw(20);
    .btfon{
      width:vw(94);
      height:vh(18);
      display:flex;
      margin-top:vh(6);
      border: 1px solid #4578FF;
      align-items: center;
      font-size:vw(14);
      white-space:nowrap;
      .btfon1{
        height:100%;
        box-sizing:border-box;
        padding:vh(0) vw(2);
        margin-right:vw(2);
        font-size:vw(12);
        line-height:vh(21);
        background:rgba(69, 120, 255, 1);
      }
      .btfon3{
        background: #E1453E;
      }
      .btfon4{
        background: #E19E3E;
      }
      .btfon5{
        background:  #38CE97;
      }
    }
    .btfon6{
      border: 1px solid #E1453E;
    }
    .btfon7{
      border: 1px solid #E19E3E;
    }
    .btfon8{
      border: 1px solid #38CE97;
    }
  }
  
  .big-tab{
    width:100%;
    height:vh(194);
    background: rgba(12, 38, 104, 0.2);
    box-sizing:border-box;
    // padding-top:vh(12);
    padding-left:vw(20);
    overflow:hidden;
    display:flex;
    flex-wrap:wrap ;
    .big-tab2{
      margin-right:vw(12);
      margin-top:vh(12);
    }
    .itea-per{
      width:vw(80);
      height:vh(16);
      line-height:vh(17);
      background: #4578FF;
      font-size:vw(12);
      border-radius: 2px 2px 0px 0px;
      text-align:center;
    }
    .itea-per3{
      background: #E1453E;
    }
    .itea-per4{
      background: #E19E3E;
    }
    .itea-per5{
      background:  #38CE97;
    }
   
    .itea-per1{
      width:vw(80);
      height:vh(32);
      line-height:vh(34);
       font-size:vw(14);
       text-align:center;
      box-shadow: 0px 0px vh(4) rgba(69, 120, 255, 1) inset;
      background: rgba(69, 120, 255, 0.1);
    }
    .itea-per7{
      box-shadow: 0px 0px vh(4) rgba(225, 69, 62, 1) inset;
    }
    .itea-per8{
      box-shadow: 0px 0px vh(4) #E19E3E inset;
    }
    .itea-per9{
      box-shadow: 0px 0px vh(4) #38CE97 inset;
    }
    .itea-per2{
      width:vw(80);
      font-size:vw(22);
      text-align:center;
      margin-top:vh(4);
    }
  }
  .big-tab1{
    height:vh(270);
    box-sizing:border-box;
    padding-top:vh(6);
  }
  .big-tab4{
    height:vh(198);
    padding-left:0
    
  }
  .letft-box,.right-box{
    width: vw(396);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #swiper1,#swiper3,#swiper4,#swiper5{
      width:100%;
      height:vh(200);
      // margin-top:vh(2);
      .swiper-wrapper{
        width:100%;
        height:100%;
      }
      // .swiper-slide{
      //   width:100%;
      //   height:vh(40) ;
      // }

  }
 
  #swiper2, #swiper6{
    .swiper-slide{
      width:100%;
      height:100%;
        display:flex;
      flex-wrap:wrap ;
    }
  }
  .center-box{
    width:vw(1060);
    height:100%;
    margin:0 vw(14);
    .map-box{
      width:100%;
      height:vh(610);
      box-sizing:border-box;
      padding:vh(6) vw(6);
      background: rgba(12, 38, 104, 0.2);
      .map-box1{
        width:100%;
        height:100%;
        box-sizing:border-box;
        padding:vh(6) vw(6);
        box-shadow: 0px 0px vh(6) rgba(12, 38, 104, 1) inset;
        position:relative;
        .qpbtn{
          position: absolute;
          right: vw(28);
          bottom: vw(14);
          z-index:10;
          cursor:pointer;
        }
        .bitit-box{
          position: absolute;
          right: vw(20);
          top: vw(18);
          z-index:10;
          display: flex;
          .bitit{
            // width: vw(180);
            height: vh(80);
            background: rgba(12, 38, 104, 0.8);
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left:vw(10);
            box-sizing:border-box;
            padding:vh(12) vw(9);
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
        .seting-box{
          position: absolute;
          left: vw(12);
          bottom: vw(14);
          z-index:10;
          background: rgba(12, 38, 104, 0.6);
          box-shadow: 0px 0px vh(6) #27B6FF inset;
          box-sizing:border-box;
          padding:vh(12) vw(17);
          .settit{
             text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
              -0 -0 1.4em rgba(255, 255, 255, 0.7);
            font-weight: bold;
          }
          .table-box{
            flex-direction: column;
            display: flex;
            box-sizing:border-box;
            // padding-left:vw(20);
            .table-iteanm{
              box-sizing:border-box;
              display: flex;
              align-items: center;
              padding-top:vh(20);
              img{
                margin-right:vw(6);
              }
              .natit{
                display:inline-block;
                width:6.6vw;
              }
            }
          }
        }
        .search-box{
          position: absolute;
          left: vw(12);
          top: vw(18);
          z-index:10;
          display: flex;
          flex-direction: column;

        }
      }
    }
  }

 
}
</style>
