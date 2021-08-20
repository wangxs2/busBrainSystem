<template>
  <div class="staffMove">
    <div class="top-box">
      <div class="top-left">
        <div class="tl-box1">
          <div class="itlist">
            <div class="fonq1">今日平均计划配置数</div>
            <div class="fonq2">3959</div>
          </div>
          <div class="itlist">
            <div class="fonq1">今日运营车辆总数</div>
            <div class="fonq2">3959</div>
          </div>
          <div class="itlist">
            <div class="fonq1">当前运营车辆数</div>
            <div class="fonq2">3959</div>
          </div>
          <div class="itlist">
            <div class="fonq1">运营率</div>
            <div class="fonq2">97.3%</div>
          </div>
        </div>
        <div class="tl-box2">
          <div class="lttit">存在历史定位车辆总数</div>
          <div class="lttit1">1176</div>
          <div class="bitit-box">
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_zzry.png" alt="" srcset="">
                <div>
                    <div class="bigttn">13266</div>
                    <div class="bigttn1">车辆活跃数</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_gjxl.png" alt="" srcset="">
                <div>
                    <div class="bigttn">454</div>
                    <div class="bigttn1">车辆活跃率</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_kll.png" alt="" srcset="">
                <div>
                    <div class="bigttn">7453</div>
                    <div class="bigttn1">车辆数定位数</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_qzz.png" alt="" srcset="">
                <div>
                    <div class="bigttn">97%</div>
                    <div class="bigttn1">车辆定位率</div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-box">
        <div class="map-box1" ref="compreMapks1"  id="compreMapks1">
          <img @click="mapFullEvent()" class="qpbtn" width="24" height="24" src="@/assets/image/home/qp.png" alt="" srcset="">
          <div class="seting-box" >
            <div class="settit">显示设置</div>
            <div class="table-box">
              <div  class="table-iteanm" v-for="(iteam,n) in tlstation" :key="n" >
                <img @click="toShow(iteam,n)" v-show="iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxktrue.png" />
                <img @click="toShow(iteam,n)" v-show="!iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxkfalse.png" />
                <div class="natit">{{iteam.name}}</div>
                
              </div>
            </div>

          </div>
          
        </div>
      
      </div>
      <div class="top-left top-right">
        <div class="tl-box1">
          <div class="itlist">
            <div class="fonq1">公交平均车速</div>
            <div class="fonq2">56km/h</div>
          </div>
          <div class="itlist">
            <div class="fonq1">公交平均畅行指数</div>
            <div class="fonq2">45</div>
          </div>
          <div class="itlist">
            <div class="fonq1">公交平均运行稳定性</div>
            <div class="fonq2">45</div>
          </div>
          <div class="itlist">
            <div class="fonq1">平均运行准点率</div>
            <div class="fonq2">85%</div>
          </div>
        </div>
        <div class="titbox" style="margin-top:18px;margin-bottom:8px">站点信息</div>
        <div class="right-ech" >
            <div id="echbox"></div>
            <div class="echleng">
              <div class="echleng1">
                <div style="display:flex;align-items: center;">
                  <div class="rounbox"></div>
                    有线路经过：

                </div>
                <div style="color:#4578FF">205个</div>
              </div>
              <div class="echleng1">
                <div style="display:flex;align-items: center;">
                   <div class="rounbox rounbox1"></div>
                    无线路经过：

                </div>
                <div style="color:#F5256A">32个</div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="erach-box" id="echstation"  
      v-loading="echload"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"></div>
  </div>
</template>

<script>
import MapMixin from '../../networkExcellent/networkMap';
export default {
  mixins: [MapMixin],
    data(){
      return {
        echload:true,
        myChart:null,
        myChart1:null,
        tlstation:[
          {
              name:'车辆实时运行',
              isxz:true,
              num:0.6,
            },
            {
              name:'站点现状',
              isxz:false,
              num:0.5,
            },
            {
              name:'站点客流分布高峰',
              isxz:false,
              num:30,
            },
            {
              name:'运行分析',
              isxz:false,
              num:30,
            }
        ],
      }
    },
    created(){
        
        this.getechdata()
        
    },
    mounted() {
      this.M_initMap('compreMapks1')
      // this.initSwipertable()
      // this.trafficLayer.setMap(this.M_map);
    },
    methods: {
      initechart(data,data1){
          this.myChart = this.$echarts.init(document.getElementById('echstation'));
          this.myChart.setOption({
            grid:{
              top:60,
              left:80,
              right:40,
              bottom:60,
            },
            tooltip:{
              trigger: 'axis',
              formatter:'客流量：{c}人次',
              backgroundColor:'#144A8C',
              borderWidth:0,
              textStyle:{
                color:'#D9EFFF',
              }
            },
            title:{
              text:"客流量/人次",
              textStyle:{
                color:'#DAE4FF',
                fontWeight:'normal',
                fontSize:16,
                
              },
              top:26,
              left:10,
            },
            color:['#836DF0'],
            xAxis: {
                type: 'category',
                boundaryGap:false,
                axisLabel:{
                  interval:0,
                  rotate:25 ,
                  color:"#D9EFFF",
                  borderType:"dashed",
                  borderColor:"#194F95",
                
                },
                axisTick: {
                  show:false
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                    color:'#194F95',
                    type:'dashed'
                  }
                },
                axisLine:{
                  lineStyle:{
                    color:'#194F95',
                    type:'dashed'
                  }
                },
                data: data
            },
            yAxis: {
            
                type: 'value',
                axisLabel:{
                  color:"#D9EFFF",
                  borderType:"dashed",
                  borderColor:"#194F95",
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                    color:'#194F95',
                    type:'dashed'
                  }
                },
                
            },
            series: [{
                data:data1,
                type: 'line',
                smooth: true ,
                legendHoverLink: true ,
                showSymbol:false,
                symbolSize: 10,
                areaStyle: {
                  color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(131, 109, 240, 0.7)' // 0% 处的颜色
                        },
                        {
                            offset: 0.08, color: 'rgba(131, 109, 240, 0.7)' // 100% 处的颜色
                        },
                        {
                            offset: 1, color: 'rgba(131, 109, 240, 0)' // 100% 处的颜色
                        }
                        ],
                        global: false // 缺省为 false
                  }
                }
            }]
          });
          this.echload=false
      },
      initechart1(){
          this.myChart1 = this.$echarts.init(document.getElementById('echbox'));
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
                    top: '31%',
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
      getechdata(){
        let arr=[],arr1=[]
        this.$fetchGet("passenger/dailyPassenger").then(res=>{
          res.result.forEach(iteam=>{
            arr.push(iteam.date)
            arr1.push(iteam.sum)
          })
          this.initechart(arr,arr1)
        this.initechart1()
          setTimeout(()=>{
          this.$store.commit('SET_LOADING',false)
          },200)
          })
      },
        // 设置地图全屏显示
      mapFullEvent () {
        console.log(screenfull)
        if (!screenfull.isEnabled) {
          return false
        }
        screenfull.toggle(this.$refs.compreMapks1)
      },
    },
  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.staffMove{

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
  .top-box{
    width:100%;
    height:vh(610);
    display:flex;
    .top-left{
      width:vw(396);
      height:100%;
      display:flex;
      flex-direction: column;
      align-items: center;
      .tl-box1{
        width:vw(396);
        height:vh(252);
        background: rgba(12, 38, 104,0.3);
        box-sizing:border-box;
        padding:vh(12) vw(12);
        .itlist{
          width:100%;
          height:vh(50);
          padding:vh(8) vw(22);
          box-sizing:border-box;
          box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 0.4) inset;
          display:flex;
          justify-content:space-between;
          font-weight: bold;
           align-items: center;
           margin-top:vh(8);
          .fonq1{
            font-size:vw(18);
          }
          .fonq2{
            font-size:vw(32);
            font-family: DINOT;
            color:#00FFFF;
          }
        }
      }
       .tl-box2{
        width:vw(396);
        height:vh(340);
        background: rgba(12, 38, 104,0.3);
        margin-top:vh(14);
        display:flex;
        flex-direction: column;
        align-items: center;
        .lttit{
           width:vw(372);
           height:vh(36);
           font-size:vw(16);
           border-left:vw(8) solid rgba(0, 255, 255, 0.5);
           border-right:vw(8) solid rgba(0, 255, 255, 0.5);
           background:rgba(0, 255, 255, 0.1);
           text-align:center;
           line-height:vh(36);
           margin-top:vh(16);
           box-sizing:border-box;
        }
        .lttit1{
            width:vw(372);
           height:vh(60);
            font-size:vw(32);
            font-family: DINOT;
            color:#00FFFF;
            box-sizing:border-box;
            text-align:center;
           line-height:vh(60);

          // box-shadow: 10px 0px 10px rgba(0, 255, 255, 0.5) inset,   /*左边阴影*/ 
          // 0px -10px 10px rgba(0, 255, 255, 0),  /*上边阴影*/ 
          // 10px 0px 10px rgba(0, 255, 255, 0.5) inset,  /*右边阴影*/ 
          // 0px 10px 10px rgba(0, 255, 255, 0.5) inset; /*下边阴影*/ 
           box-shadow: 0px 0px  vh(12) rgba(0, 255, 255, 0.5) inset;
          //  border:1px solid rgba(0, 255, 255, 0.5) ;
          //  border-top:none;
          //  box-shadow: inset -5px -5px 5px #f7726f;
        }

        .bitit-box{
          display: flex;
          flex-wrap:wrap ;
           margin-top:vh(6);
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
      }
      .right-ech{
        width:vw(380);
        height:vh(270);
        box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 1) inset;
        #echbox{
          width:100%;
          height:vh(200);
          box-sizing:border-box;
          padding-top:vh(18);
          
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
                // width:6.6vw;
              }
            }
          }
        }
        
      }
    }
  }
  .erach-box{
    width:vw(1880);
    height:vh(312);
    background: url("~@/assets/image/zdbj.png");
    background-size: 100% 100%;
    margin-top:vh(8);
  }
 
}
</style>
