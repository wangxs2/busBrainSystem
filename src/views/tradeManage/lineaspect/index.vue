<template>
  <div class="lineaspect">
    <div class="topbox">
      <div class="left-top">
        <div class="left-list">
            <div class="bitit">
                <img  src="@/assets/image/home/4.2_icon_gjzd.png" alt="" srcset="">
                <div>
                    <div class="bigttn">13266</div>
                    <div class="bigttn1">公交站点总数</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.2_icon_ygz.png" alt="" srcset="">
                <div>
                    <div class="bigttn">13266</div>
                    <div class="bigttn1">已改造站点数</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.2_icon_wgz.png" alt="" srcset="">
                <div>
                    <div class="bigttn">13266</div>
                    <div class="bigttn1">未改造站点数</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.2_icon_sbzl.png" alt="" srcset="">
                <div>
                    <div class="bigttn">13266</div>
                    <div class="bigttn1">设备总量</div>
                </div>
            </div>
        </div>
        <div class="titbox" style="margin-bottom:0px;margin-top:14px">公交站点统计</div>
        <div class="earch-box">
          <div class="sectionEcks">
            <svg width="220px" height="220px" transform="translate(0,0)rotate(-100)" class="svg">
                <circle class="progress" r="95" cy="110" cx="110" stroke-width="4" stroke="#4578FF" stroke-linejoin="butt" stroke-linecap="butt" fill="none" stroke-dashoffset="20px" stroke-dasharray="540px" />
                <circle class="progress" r="75" cy="110" cx="110" stroke-width="4" stroke="#00FF4E" stroke-linejoin="butt" stroke-linecap="butt" fill="none" stroke-dashoffset="140px" stroke-dasharray="440px" />
                <circle class="progress" r="55" cy="110" cx="110" stroke-width="4" stroke="#FFE400" stroke-linejoin="butt" stroke-linecap="butt" fill="none" stroke-dashoffset="60px" stroke-dasharray="200px" />
                <text  transform="translate(70, -36) rotate(100)"  fill="#ffffff" class="txt"> 90%</text>
                <text  transform="translate(50, -38) rotate(100)"  fill="#ffffff" class="txt"> 52%</text>
                <text  transform="translate(30, -40) rotate(100)"  fill="#ffffff" class="txt"> 40%</text>
            </svg>

            <div class="tyu">服务半径覆盖率</div>
            <div class="tyuli">
              <div style="display:flex;align-items: center;">
                <div style="background:#4578FF" class="yun"></div>
                <div class="yuname">800米</div>
              </div>
              <div style="display:flex;align-items: center;">
                <div style="background:#00FF4E" class="yun"></div>
                <div class="yuname">500米</div>
              </div>
              <div style="display:flex;align-items: center;">
                <div style="background:#FFE400" class="yun"></div>
                <div class="yuname">300米</div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
      <div class="center-top">
        <div class="map-box1" ref="compreMapks"  id="compreMapks">
          <img @click="mapFullEvent()" class="qpbtn" width="24" height="24" src="@/assets/image/home/qp.png" alt="" srcset="">
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
        </div>

      </div>
      <div class="right-top">
        <div class="titbox" style="margin-bottom:0px;">站点类型</div>
        <div class="earch-rigt-box">
          <div id="ecrtks"></div>
        </div>
        <div class="titbox" style="margin-top:15px;">换乘压力</div>
        <div class="lu-rigt-box"></div>
      </div>
    </div>
    <div class="bottombox">
      <div class="titbox" style="margin-bottom:8px;margin-top:12px">站点养护</div>
       <div class="table-data">
        <div class="table-header">
        
          <div >站点编号</div>
          <div>所属区域</div>
          <div >站点名称</div>
          <div>养护内容</div>
          <div >养护原因</div>
          <div >养护人</div>
          <div >养护时间</div>
          
        </div>
        <div class="table-contain swiper-container" id="swiperks">
          <div class="swiper-wrapper">
            <div class="swiper-slide"   v-for="(iteam,index) in qdData" :key="index">
              <div class="tableTr" v-for="(item,i) in iteam" :key="i+2">
                <div>{{item.index}}</div>
                <div >{{item.routeName}}</div>
                <div >{{item.coefficient.toFixed(2)}}</div>
                <div >{{item.routeName}}</div>
                <div>{{item.coefficient.toFixed(2)}}</div>
                <div >{{item.routeName}}</div>
                <div >{{item.coefficient.toFixed(2)}}</div>
              </div>
            </div>
          </div>
          <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-if="qdData.length==0">无数据</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import MapMixin from '../../networkExcellent/networkMap';
import Swiper from "swiper";
import { arrGroup } from '@/libs/util.js';
 import screenfull from "screenfull";
export default {
  mixins: [MapMixin],
  data(){
    return{
      qdData:[],
      swipertable:null,
      tlstation:[
        {
            name:'热力图',
            isxz:true,
          },
          {
            name:'客流',
            isxz:false,
          },
          {
            name:'智能化改造',
            isxz:false,
          },
          {
            name:'换成压力',
            isxz:true,
          }
      ],
      myChart:null,
    }

  },
  created(){
    this.getNoLi()
      setTimeout(()=>{
      this.$store.commit('SET_LOADING',false)
      },200)
  },
  mounted() {
    this.M_initMap('compreMapks')
    // this.initSwipertable()
    this.initechart()
    // this.trafficLayer.setMap(this.M_map);
  },
  methods:{
    getNoLi(){
      this.$fetchGet("route/straightCoefficient").then(res => {
         res.result.forEach((item,index)=>{
          item.index = index + 1;
        })
        this.qdData=arrGroup(res.result,5)
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
    toShow(row,n){
      row.isxz=!row.isxz
    },
    initechart(){
        this.myChart = this.$echarts.init(document.getElementById('ecrtks'));
        this.myChart.setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: 'center',
                orient: 'vertical',
                right: 'right',
                
                itemStyle:{
                  borderType:"round"
                },
                textStyle:{
                  color:"#ffffff"
                }
            },
            color:['#3928A7','#4578FF','#00FFFF','#FFFF00'],
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 1048, name: '亭牌合一'},
                        {value: 735, name: '三角站杆'},
                        {value: 580, name: '亭牌合一1'},
                        {value: 484, name: '三角站杆1'},
                    ]
                }
            ]
        })

      },
    initSwipertable() {
     
      this.swipertable = new Swiper("#swiperks", {
        loop: true, // 循环模式选项
        mousewheel: true,
        direction: "vertical",
        autoplay: {
          delay: 8000 // 切换时间
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
  
    },
  }
  
}
</script>
<style lang="scss">
.lineaspect{
  .sectionEcks{
    position:relative;
    .tyu{
      position:absolute;
       bottom:vh(10);
      left:vw(135);
    }
    .tyuli{
      position:absolute;
       bottom:vh(10);
      right:vw(18);
      .yun{
        width:8px;
        height:8px;
        border-radius:50%;
        margin-right:vw(6);
      }
    }
  }
  .svg{
    // transform:rotate(-100deg);
     position:absolute;
      top:vh(12);
      left:vw(80);
    .progress{
        
    }
    .txt{
      transform-origin: 10% 50%;
      // transform:rotate(100deg);
      // position:absolute;
      // top:0;
      // left:0
      //  transform:rotateX(100deg);
    }
  }
 
}

</style>
<style lang="scss" scoped>
.lineaspect{
  width:100%;
  height: 100%;
  background: url("~@/assets/image/zhbj.png");
  background-size: 100% 100%;
  display: flex;
  box-sizing: border-box;
  padding:vh(12) vw(16);
  flex-direction: column;
  .titbox{
    width:100%;
    height:vh(56);
    background: #0C2668;
    font-size: vw(20);
    font-weight: bold;
    line-height: vh(56);
    box-sizing: border-box;
    padding-left: vw(22);
    display:flex;
    flex-direction: column;
  }
  .topbox{
    width:100%;
    top:vh(610);
    display:flex;
    .left-top{
      width:vw(396);
      height: 100%;
      .left-list{
        display:flex;
       flex-wrap:wrap ;
        .bitit{
            width: vw(180);
            height: vh(90);
            box-shadow: 0px 0px vh(6) #27B6FF inset;
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
    }
    .center-top{
      width:vw(1060);
      height: 100%;
      background: rgba(12, 38, 104, 0.2);
      margin:0 vw(14);
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
      }
    }
    .right-top{
       width:vw(396);
      height: 100%;
      .earch-rigt-box{
        width:vw(396);
        height:vh(284);
        background: rgba(12, 38, 104, 0.2);
        box-sizing:border-box;
          padding:vh(12) vw(17);
         #ecrtks{
          width:100%;
          height:100%;
          box-shadow: 0px 0px vh(6) #27B6FF inset;
        }
      }
      .lu-rigt-box{
         width:vw(396);
        height:vh(194);
        background: rgba(12, 38, 104, 0.2);
      }
    }
    .left-list{
      width:vw(396);
      height:vh(224);
      background: rgba(12, 38, 104, 0.2);
      box-sizing:border-box;
      padding-top:vh(16);
    }
    .earch-box{
      width:vw(396);
      height:vh(310);
      background: rgba(12, 38, 104, 0.2);
      box-sizing:border-box;
      padding:vh(6) vw(6);
      .sectionEcks{
        width:100%;
        height:100%;
        box-shadow: 0px 0px vh(6) #27B6FF inset;

      }
     

    }
  }
  .bottombox{
    width:100%;
    flex:1;
    .table-data{
      box-sizing: border-box;
      overflow:hidden;
      display:flex;
      flex-direction: column;
      .table-header{
        width:100%;
        height:vh(40);
        background: rgba(12, 38, 104, 0.2);
        color: #4578FF;
        font-size:vw(14);
        box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset;
        display:flex;
        // justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        // padding: 0 vw(20);
        div{
          flex:1;
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
          // justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          // padding: 0 vw(20);
          cursor:pointer;
          div{
            flex:1;
            text-align:center;
          }
         
        }
        .tableTr:hover {
          background:rgba(12, 38, 104, 0.5);
          color: #4578FF;
          font-weight:bold;
        } 
        .tableTr:nth-child(even){
          background:rgba(12, 38, 104, 0.2)

        }
      }
    }
  

  }
  #swiperks{
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
 

 
}
</style>
