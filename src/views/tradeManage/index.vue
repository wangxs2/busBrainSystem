<template>
  <div class="tradeManage">
    <div class="left-box">
      <div class="bitit-box">
        <div class="bitit">
            <img  src="@/assets/image/home/4.1_icon_zzry.png" alt="" srcset="">
            <div>
                <div class="bigttn">{{lefttda['在职人数']}}</div>
                <div class="bigttn1">在职人数</div>
            </div>
        </div>
        <div class="bitit">
            <img  src="@/assets/image/home/4.1_icon_gjxl.png" alt="" srcset="">
            <div>
                <div class="bigttn">{{lefttda['车辆总数']}}</div>
                <div class="bigttn1">车辆总数</div>
            </div>
        </div>
        
      </div>
      <div class="titbox" style="margin-top:16px;margin-bottom:8px">站点信息</div>
      <div class="right-ech" >
            <div id="echbox1"></div>
            <div class="echleng">
              <div class="echleng1">
                <div style="display:flex;align-items: center;">
                  <div class="rounbox"></div>
                    已改造站点数：

                </div>
                <div style="color:#4578FF">205个</div>
              </div>
              <div class="echleng1">
                <div style="display:flex;align-items: center;">
                   <div class="rounbox rounbox1"></div>
                    已改造站点数：

                </div>
                <div style="color:#F5256A">32个</div>
              </div>
            </div>
      </div>
      <div class="titbox" style="margin-top:16px;margin-bottom:8px">设备信息</div>
      <div class="right-ech right-ech1" >
          <div id="echbox2"></div>
            <div class="echleng">
              <div class="echleng1">
                <div style="display:flex;align-items: center;">
                  <div class="rounbox" style="background:#4578FF"></div>
                   电子站牌：

                </div>
                <div style="color:#4578FF">{{stadata['三角杆']}}个</div>
              </div>
              <div class="echleng1" style="margin-top:1.5vh">
                <div style="display:flex;align-items: center;">
                   <div class="rounbox" style="background:#00FFFF"></div>
                    亭牌合一：

                </div>
                <div style="color:#00FFFF">{{stadata['亭牌合一']}}个</div>
              </div>
            </div>
      </div>
    </div>
      <div class="center-box">
      <div class="map-box1" ref="compreMapks5"  id="compreMapks5">
          <img @click="mapFullEvent()" class="qpbtn" width="24" height="24" src="@/assets/image/home/qp.png" alt="" srcset="">
          <div class="seting-box" >
            <div class="settit">显示设置</div>
            <div class="table-box">
              <div  class="table-iteanm" v-for="(iteam,n) in tlstation" :key="n" >
                <img @click="toShow(iteam,n)" v-if="iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxktrue.png" />
                <img @click="toShow(iteam,n)" v-if="!iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxkfalse.png" />
                <div class="natit">{{iteam.name}}</div>
                
              </div>
            </div>

          </div>
          <div class="tulibox">
           
          </div>
      </div>
      <div class="cen-bottom">
        <div class="titbox" style="margin-top:16px;margin-bottom:8px">车辆生命期体征-维修保养记录</div>

         <div class="table-data">
        <div class="table-header">
        
          <div >日期</div>
          <div>车辆自编号</div>
          <div >车牌号</div>
          <div>维修内容</div>
          <div >维修人员</div>
       
          
        </div>
        <div class="table-contain swiper-container" id="swiperhy">
          <div class="swiper-wrapper">
            <div class="swiper-slide"   v-for="(iteam,index) in qdData" :key="index">
              <div class="tableTr" v-for="(item,i) in iteam" :key="i+2">
                <div>{{item.index}}</div>
                <div >{{item.routeName}}</div>
                <div >{{item.coefficient.toFixed(2)}}</div>
                <div >{{item.routeName}}</div>
                <div>{{item.coefficient.toFixed(2)}}</div>
                
              </div>
            </div>
          </div>
          <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-if="qdData.length==0">无数据</div>
        </div>
      </div>
        
      </div>
    </div>
    <div class="right-box">
      <div class="titbox" style="">线网分布信息</div>
      <div class="team-rij">
        <div style="display:flex;align-items: center;">
          <img style="margin-right:0.5vw"  src="@/assets/image/licon_1.png" alt="" srcset="">
          线路总数
        </div>
        <div>{{objline['线路总数']}}条</div>

      </div>
      <div class="team-rij">
        <div style="display:flex;align-items: center;">
          <img style="margin-right:0.5vw"  src="@/assets/image/licon_2.png" alt="" srcset="">
          线路总长
        </div>
        <div>{{objline['线路总长']}}公里</div>

      </div>
      <div class="team-rij">
        <div style="display:flex;align-items: center;">
          <img style="margin-right:0.5vw"  src="@/assets/image/licon_3.png" alt="" srcset="">
          线路重复系数
        </div>
        <div>{{objline['线路重复系数']}}</div>

      </div>
      <div class="team-rij">
        <div style="display:flex;align-items: center;">
          <img style="margin-right:0.5vw"  src="@/assets/image/licon_4.png" alt="" srcset="">
          线网密度
        </div>
        <div>{{objline['线网密度(建成区)']}}</div>

      </div>
      <div class="team-rij">
        <div style="display:flex;align-items: center;">
          <img style="margin-right:0.5vw"  src="@/assets/image/licon_1.png" alt="" srcset="">
          线网长度
        </div>
        <div>{{objline['线网长度']}}公里</div>

      </div>

       <div class="titbox" style="margin-top:16px;margin-bottom:8px">线网服务质量</div>
       <div class="rightpj-box">
        <div style="display:flex;align-items: center;justify-content:space-between;margin-bottom:1.2vh">
           <div>线路名称：</div>
           <div>1101路</div>
        </div>
        <div style="display:flex;align-items: center;justify-content:space-between;margin-bottom:1.2vh">
           <div>反映时间：</div>
           <div>1101路</div>
         </div>
         <div style="display:flex;align-items: center;justify-content:space-between;margin-bottom:1.5vh">
           <div>反映内容：</div>
           <div>1101路</div>
         </div>
        <img  src="@/assets/image/4.6_1.png" alt="" srcset="">
         
       </div>
        <div style="margin-top:3vh" class="rightpj-box">
          <div style="display:flex;align-items: center;justify-content:space-between;margin-bottom:1.2vh">
           <div>线路名称：</div>
           <div>1101路</div>
        </div>
        <div style="display:flex;align-items: center;justify-content:space-between;margin-bottom:1.2vh">
           <div>反映时间：</div>
           <div>1101路</div>
         </div>
         <div style="display:flex;align-items: center;justify-content:space-between;margin-bottom:1.5vh">
           <div>反映内容：</div>
           <div>1101路</div>
         </div>
        <img  src="@/assets/image/4.6_2.png" alt="" srcset="">
        </div>
    </div>
  </div>
</template>

<script>
import MapMixin from '../networkExcellent/networkMap';
 import screenfull from "screenfull";
 import Swiper from "swiper";
 import { arrGroup } from '@/libs/util.js';
export default {
  mixins: [MapMixin],
  data(){
    return{
      myChart1:null,
      objline:{},
      restaurants:[],
      lefttda:{},
      stadata:{},
      myChart2:null,
       swipertable:null,
       nowName:"站点智能化建设",
       qdData:[],
      tlstation:[
        {
            name:'站点智能化建设',
            isxz:true,
            num:0.6,
          },
          {
            name:'线网现状规划',
            isxz:false,
            num:0.5,
          },
          {
            name:'线网融合',
            isxz:false,
             num:30,
          }
      ]
    }

  },
    created(){
        setTimeout(()=>{
        this.$store.commit('SET_LOADING',false)
        this.initechart1()
        // this.initechart2()
        this.initSwipertable()
        },200)
        this.getNoLi()
        this.getAllLine()
        this.getda()
        // this.pointAll2()
        // this.gettesr()
        
    },
    mounted(){
      this.M_initMap('compreMapks5')
      //  this.M_pointAll4(this.restaurants)
       this.pointAll2()

      //  console.log(this.testLinesearch('790路'))s
      // this.testLinesearch('790路')

    },
    methods:{
         // 设置地图全屏显示
    mapFullEvent () {
      console.log(screenfull)
      if (!screenfull.isEnabled) {
        return false
      }
      screenfull.toggle(this.$refs.compreMapks5)
    },
    gettesr(){
     
      this.$fetchGet("route/routeList").then(res =>{
        res.result.forEach(iteam=>{
            this.testLinesearch(iteam.routeName)
        })
      })

    },
    getda(){
      this.$fetchGet("indicator/basicBusInfo").then(res =>{
        this.lefttda=res.result
      })

      this.$fetchGet("gps/stationMessage").then(res => {
        this.stadata=res.result.brackets
        this.initechart2(this.stadata.total,this.stadata['三角杆'],this.stadata['亭牌合一'])
        // let noli=this.stadata.stationsInRun-this.stadata.stations
        // this.initechart1(this.stadata.stationsInRun,this.stadata.stations,noli)
      })
    },
    getAllLine(){
      
      this.$fetchGet("route/baseTotal").then(res =>{
        this.objline=res.result

      })
    },


    toShow(row,n){
      this.nowName=row.name
      if(row.isxz){
        return
      }else{

      
        this.tlstation.forEach(iteam=>{
          if(iteam.name==this.nowName){
            iteam.isxz=true
          }
          if(iteam.name!==this.nowName){
          
              iteam.isxz=false
          }
        })
        switch (row.name) {
            case '站点智能化建设' :
              this.M_setZoomAndCenter([121.473658,31.230378],13)
                this.realTownGroups.hide()
              this.realbusGroups.hide()
                break;
            case '线网现状规划' :
              this.M_setZoomAndCenter([121.510737,31.230525],12)
              this.realTownGroups.hide()
              this.realbusGroups.hide()
                break;
            case '线网融合' :


                break;
            
            default :
                
        }
      }

    },

    getNoLi(){
      this.$fetchGet("route/straightCoefficient").then(res => {
         res.result.forEach((item,index)=>{
          item.index = index + 1;
        })
        this.qdData=arrGroup(res.result,5)
      })
    },
    getznjz(){
      this.$fetchGet("gps/ebusManage",{
        pdbCode:'pdb0159'
      }).then(res => {

      })
      

    },
    pointAll2(){
     
        this.$fetchGet("indicator/stationList").then(res => {
          if(res.result&&res.result['站点的详细属性']){
              this.restaurants =this.cloneObj(res.result['站点的详细属性']).slice(1,100)
              this.M_pointAll4(this.restaurants)
             
              
          }
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
      initechart1(){
          this.myChart1 = this.$echarts.init(document.getElementById('echbox1'));
          this.myChart1.setOption({
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                show:false,
                  // top: '5%',
                  // left: 'center'
              },
               title: [
                  {
                    text: 2356,
                    itemGap: 5,
                    left: 'center',
                    top: '36%',
                    textStyle: {
                      fontWeight: 'bold',
                      fontSize: 32,
                      textAlign: 'center',
                      color: '#00FFFF'
                    }
                  },
                {
                  text: '站点总数',
                  left: 'center',
                  top: '55%',
                  textStyle: {
                    fontSize: 14,
                    color: '#fff',
                    textAlign: 'center'
                    // align:'left'
                  }
                }
              ],
              series: [
                        {
                    name: ' ',
                    type: 'pie',
                    radius: ['70%', '95%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    startAngle: 225,
                    color: ['#0263FF', '#F5256A', 'transparent'],
                    hoverAnimation: false,
                    legendHoverLink: false,
                    label: {
                      normal: {
                        show: false,
                        position: 'center'
                      },
                      emphasis: {
                        show: false,
                        textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                        }
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [
                      {
                        value: 60,
                        name: '1'
                      },
                      {
                        value: 15,
                        name: '2'
                      },
                      {
                        value: 25,
                        name: '3'
                      }
                    ]
                  }
              ]
          });
      },
      initechart2(to,sa,hy){
          this.myChart2 = this.$echarts.init(document.getElementById('echbox2'));
          this.myChart2.setOption({
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                  show:false
              },
              title: [
                  {
                    text: to,
                    itemGap: 5,
                    left: 'center',
                    top: '36%',
                    textStyle: {
                      fontWeight: 'bold',
                      fontSize: 32,
                      textAlign: 'center',
                      color: '#00FFFF'
                    }
                  },
                {
                  text: '设备总量',
                  left: 'center',
                  top: '55%',
                  textStyle: {
                    fontSize: 14,
                    color: '#fff',
                    textAlign: 'center'
                    // align:'left'
                  }
                }
              ],
              series: [
                  {
                      name: '',
                      type: 'pie',
                      radius: ['60%', '85%'],
                      color: ['#00FFFF', '#4578FF'],
                      avoidLabelOverlap: false,
                      label: {
                          show: false,
                          position: 'center'
                      },
                      hoverAnimation: false,
                    legendHoverLink: false,
                      emphasis: {
                          label: {
                              show: false,
                              fontSize: '40',
                              fontWeight: 'bold'
                          }
                      },
                      labelLine: {
                          show: false
                      },
                      data: [
                          {value: sa, name: '电子站牌'},
                          {value: hy, name: '亭牌合一'},
                         
                      ]
                  }
              ]
          });
      },
    }

  
}
</script>
<style lang="scss">
.tradeManage{

  .marhznbox{
    width: vw(614);
    height: vh(325);
    background: url("~@/assets/image/znhjs.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    padding:vh(24) vw(24);

    .titit{
      display: flex;
      align-items: center;
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #00FFFF;
      margin-bottom: vh(10);
      .omgtit{
        width: vw(48);
        height: vw(48);
        background: url("~@/assets/image/gf_icon.png");
        background-size: 100% 100%;
      }

    }

    .tablebox{
      width: 100%;
      border: 1px dashed #00FFFF;
      border-right: none;
      margin-top: vh(16);
      .tablehead{
        width:100%;
        height: vh(46);
        display: flex;
        box-sizing: border-box;
        align-items: center;
        div{
          text-align: center;
          height: 100%;
          line-height: vh(46);
          border-right: 1px dashed #00FFFF;
          
        }
      }
      .tablebody{
        width:100%;
      }
    }

  }

}


</style>
<style lang="scss" scoped>
.tradeManage{

  width:100%;
  height: 100%;
  background: url("~@/assets/image/zhbj.png");
  background-size: 100% 100%;
  display: flex;
  box-sizing: border-box;
  padding:vh(12) vw(16);
   padding-top: vh(140);
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
  .left-box,.right-box{
     width:vw(396);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .bitit-box{
      display: flex;
      flex-wrap:wrap ;
      margin-top:vh(6);
      background: rgba(12, 38, 104,0.3);
      width:100%;
      height:vh(122);
      .bitit{
        width: vw(180);
        height: vh(90);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left:vw(12);
        margin-top:vh(12);
        box-sizing:border-box;
        padding:vh(12) vw(9);
        box-shadow: 0px 0px  vh(12) rgba(0, 255, 255, 0.5) inset;
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

    .right-ech{
        width:vw(380);
        height:vh(294);
        box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 1) inset;
        #echbox1{
          width:100%;
          height:vh(235);
          box-sizing:border-box;
          padding-top:vh(18);
          
        }
         #echbox2{
          width:100%;
          height:vh(270);
          box-sizing:border-box;
          padding-top:vh(6);
          
        }
        .echleng{
          display:flex;
          flex-direction: column;
          align-items: center;
          margin-top:vh(-18);
          .echleng1{
            display:flex;
             justify-content:space-between;
             width:100%;
             box-sizing:border-box;
             padding:vh(0) vw(68);
             margin-top:vh(6);
            .rounbox{
              width:vw(10);
              height:vw(10);
              border-radius: 50%;
              background: #4578FF;
              margin-right:vw(6);
            }
            .rounbox1{
               background:#F5256A;
            }
          }
        }
    }
    .right-ech1{
        width:vw(380);
        height:vh(337);
        box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 1) inset;

    }
  }
  .center-box{
    width:vw(1060);
    height: 100%;
    margin: 0 vw(14);
    box-sizing:border-box;
    padding:vh(6) vw(6);
    display: flex;
    flex-direction: column;
    .map-box1{
      width:100%;
      height:vh(610);
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
      .tulibox{
        
      
      }
    }

    .cen-bottom{
      width:100%;
      flex:1;
      // display:flex;
    
    }
  }
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
  #swiperhy{
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
  .right-box{
    .team-rij{
      width:vw(380);
      height: vh(50);
      box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 1) inset;
      display:flex;
      align-items: center;
      justify-content: space-between;
      box-sizing:border-box;
      padding:vh(0)  vw(22);
      margin-top:vh(14)
    }
    .rightpj-box{
      width:vw(380);
      height:vh(220);
       box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 1) inset;
       box-sizing:border-box;
       padding:vh(22) vw(22);

    }
  }

 
}
</style>
