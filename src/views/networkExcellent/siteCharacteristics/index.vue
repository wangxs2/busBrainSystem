<template>
  <div class="roadDistribution-box" id="lineIndex" v-loading="assloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="search-box">
      <div style="margin-right:0.6vw;width:3.6vw;">站点名称</div>
      <el-select
        size="small"
        filterable
        clearable
         @clear="expertont"
        @change="toDetail1()"
        v-model="value"
        placeholder="请选择"
      >
        <el-option
          v-for="(item,index) in linewData"
          :key="index"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </div>
    <div class="rightlinemsg" v-show="!iszd">
      <div class="tit">停靠线路统计</div>

      <div id="echio"></div>

      <div class="tit">客流量统计</div>
        <div id="echio1"></div>
      
    </div>

    <!-- <div class="rightlinemsg1" v-show="!iszd">
        
    </div> -->

    <div class="rightlinemsg2" v-if="iszd">
        <div class="tit">详细信息</div>
        <div style="margin-top:1vh">站点名称：{{detailobj.name}}</div>
        <div>南向北站点数：{{detailobj.nxb}}</div>
        <div>北向南站点数：{{detailobj.bxn}}</div>
        <div>上车客流量：{{detailobj.zdsckl}}</div>
        <div>下车客流量：{{detailobj.zdxckl}}</div>
        <div>总客流量：{{detailobj.zdkl}}</div>
        <!-- <div>途径线路：{{detailobj.routeLine}}</div> -->
        <div class="tit">途径线路</div>
        <div  v-for="(item,index) in tjxuname"  :key="index">
          <span :style="{'background':item.colors}" class="xincolor"></span> {{item.name}}
        </div>
    </div>

    <div class="rightlinemsg3">
      <div class="tit">站点公交线路数量</div>
      <div style="display:flex;align-items: center;padding-left:1.5vw;margin-top:0.6vh">
        <img src="../../../assets/image/rollbig.png" width="20" height="20" alt="" srcset="">1-3
      </div>
      <div style="display:flex;align-items: center;padding-left:1.4vw;margin-top:0.6vh">
        <img src="../../../assets/image/rollbig.png" width="25" height="25" alt="" srcset="">4-6
      </div>
      <div style="display:flex;align-items: center;padding-left:1.3vw;margin-top:0.6vh">
        <img src="../../../assets/image/rollbig.png" width="30" height="30" alt="" srcset="">7-8
      </div>
       <div style="display:flex;align-items: center;padding-left:1.2vw;margin-top:0.6vh">
        <img src="../../../assets/image/rollbig.png" width="35" height="35" alt="" srcset="">9-12
      </div>
      <div style="display:flex;align-items: center;padding-left:1.1vw;margin-top:0.3vh">
        <img src="../../../assets/image/rollbig.png" width="40" height="40" alt="" srcset="">13-17
      </div>
      <div class="tit">路段公交线路数量</div>

      <div style="display:flex;align-items: center;padding-left:1.5vw;margin-top:0.6vh">
        <span style="display:inline-block;width:1.5vw;height:0.4vh;background:#35a700;margin-right:0.3vw"></span> 1-3
      </div>
      <div style="display:flex;align-items: center;padding-left:1.5vw;margin-top:0.6vh">
        <span style="display:inline-block;width:1.5vw;height:0.4vh;background:#90d20d;margin-right:0.3vw"></span> 4-6
      </div>
      <div style="display:flex;align-items: center;padding-left:1.5vw;margin-top:0.6vh">
        <span style="display:inline-block;width:1.5vw;height:0.4vh;background:#fdfd4d;margin-right:0.3vw"></span> 7-9
      </div>
      <div style="display:flex;align-items: center;padding-left:1.5vw;margin-top:0.6vh">
        <span style="display:inline-block;width:1.5vw;height:0.4vh;background:#ff7a00;margin-right:0.3vw"></span> 10-12
      </div>
      <div style="display:flex;align-items: center;padding-left:1.5vw;margin-top:0.6vh">
        <span style="display:inline-block;width:1.5vw;height:0.4vh;background:#ff0000;margin-right:0.3vw"></span> 13-19
      </div>
    </div>
  </div>
</template>
<script>
import MapMixin from '../mapmimx'
import mystate from '../zddata.json'
import snline from '../colorsd.json'
import myline from '../linall.json'
export default {
  mixins: [MapMixin],
  components: {
  },
  data() {
    return {
       lineaData:[],
       allcolor:[
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
       tjxuname:[],
       iszd:false,
       detailobj:{
             "name":"上南路浦东南路",
            "nxb":6,
            "bxn":11,
            "zdkl":5916,
            "zdsckl":0,
            "zdxckl":0,
            routeLine:'',
            "lnglat":[121.494625,31.177365]
       },
       nowindex:-1,
       value:'',
      //snroad:'121.49271,31.186894,121.493453,31.183938,121.493926,31.18176,121.494625,31.178514,121.494946,31.17707,121.495417,31.174377,121.495666,31.173264,121.496045,31.171363,121.496526,31.170036,121.496946,31.16796,121.497064,31.166019,121.497185,31.16426,121.497434,31.162621,121.49773,31.161365,121.498394,31.159383,121.49941,31.157792,121.50027,31.156861,121.501573,31.155051,121.502069,31.154084,121.502791,31.153049,121.504402,31.151955,121.505419,31.151051,121.50563,31.150697,121.506013,31.149826,121.506485,31.148637,121.507918,31.146588,121.509881,31.144123,121.511801,31.141768,121.512654,31.140481,121.514089,31.138258,121.516229,31.134982,121.519945,31.128903,121.521159,31.126932',
       assloading:true,
       linewData:[],
       stationName:[""],
       nxbdata:[],
       bxndata:[],
       myChart:null,
        myChart1:null,
    };
  },
  beforeCreate() {},
  created() {
     
     this.assloading=false
        this.linewData=mystate
  },
  mounted() {
    this.M_initMap('lineIndex')
    
    this.getroaddata()
    window.onresize = ()=> {
        this.myChart.resize()
        this.myChart1.resize()
      }
  },

  methods: {
    getroaddata(){
       this.allstation1(mystate)
       this.snmhx(snline)
        let arrX=[],arr1=[],arr2=[],arr3=[],arr4=[],arr5=[]
        
      mystate.forEach(iteam=>{
          arrX.push(iteam.name)
          arr1.push(iteam.nxb)
          arr2.push(iteam.bxn)
          if(iteam.zdkl){
            arr3.push(iteam.zdkl)
            arr4.push(iteam.zdsckl)
            arr5.push(iteam.zdxckl)
          }
          
      })
      console.log(arrX,arr1,arr2)
      this.initechart(arrX,arr1,arr2)
      this.initechart1(arrX,arr3,arr4,arr5)



         this.$fetchPost(
          "route/composite",
          {
            cfd: -1, // 重复度
            gjcf: -1,
            fzxxs:  -1, // 非直线系数
            cd:  -1, // 长度
            bglrc:  -1, // 百公里人次
            mzl:  -1, // 满载率
            ifFilter: true
          },
          "json"
        ).then(res => {
            res.result.forEach(iteam=>{
                myline.forEach(itam=>{
                    if(iteam.lineName==itam.name){
                        itam.geom=iteam.geom
                    }
                })
            })
            this.lineaData=myline
            // console.log(this.linewData)
            // this.alllinepo(this.linewData)
            

        })


    },
    expertont(){
      this.iszd=false
      if(this.kyLineOver){
      this.kyLineOver.clearOverlays()
    }
      // this.linewData1=this.linewData
      // this.alllinepo(this.linewData)
    },
    toDetail(row){
        

         this.tjxuname=[]
        this.linewData.forEach(itam=>{
          if(itam.name==row.name){
              console.log(itam.routeLine)
              let routearr=[]
              let arr=itam.routeLine.split(';')
              this.lineaData.forEach((iu,index)=>{
                arr.forEach(it=>{
                  if(it==iu.name){
                    iu.colors=this.allcolor[index]
                    routearr.push(iu)
                  }
                })
              })
              this.tjxuname=routearr
              this.alllinepo(routearr,2)
          }
      })
         
    },
    toDetail1(){
      this.tjxuname=[]
        this.linewData.forEach(itam=>{
          if(itam.name==this.value){
            this.iszd=true
               this.detailobj=itam
              let routearr=[]
              let arr=itam.routeLine.split(';')
              this.lineaData.forEach((iu,index)=>{
                arr.forEach(it=>{
                  if(it==iu.name){
                    iu.colors=this.allcolor[index]
                    routearr.push(iu)
                  }
                })
              })
              this.tjxuname=routearr
              this.alllinepo(routearr,2)
          }
      })

    },
    initechart(arrX,arr1,arr2){
        this.myChart = this.$echarts.init(document.getElementById('echio'));
        this.myChart.setOption({
            tooltip: {
               backgroundColor:'#144A8C',
              borderWidth:0,
              textStyle:{
                color:'#D9EFFF',
              }
            },
            legend:{
                show:true,
                textStyle:{
                color:'#ffffff',
              }
            },
            title:{
              text:"停靠站线路数(条)",
              textStyle:{
                color:'#DAE4FF',
                fontWeight:'normal',
                fontSize:16,
                
              },
              top:26,
              left:10,
            },
            color:['#5470c6', '#fac858'],
            grid: {
                left: '6%',
                right: '3%',
                bottom: '1%',
                containLabel: true
            },
            xAxis: {
                data:arrX,
                name: '',
                nameTextStyle:{
                  color:'#DAE4FF'
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                      color:'#194F95',
                      type:'dashed'
                    }
                },
                 axisLabel : {
                   interval:0,
                rotate:25 ,
                  formatter: '{value}',
                  textStyle: {
                      color: '#DAE4FF',
                      fontSize:12
                  }
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                  onZero: true,
                  lineStyle:{
                    color:'#194F95',
                    type:'dashed'
                  }
                },
            },
            yAxis: {
              splitLine:{
                  show:true,
                  lineStyle:{
                      color:'#194F95',
                      type:'dashed'
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel : {
                  formatter: '{value}',
                  textStyle: {
                      color: '#fff',
                      fontSize:16
                  }
                },
                axisLine:{
                  onZero: true,
                  lineStyle:{
                    color:'#194F95',
                    type:'dashed'
                  }
                },
            },
            series: [
                {
                  name: '南向北',
                  type: 'bar',
                  barWidth:12,
                  data:  arr1
              },
               {
                  name: '北向南',
                  type: 'bar',
                  barWidth:12,
                  data:  arr2
              }
            ]

        })

    },
    initechart1(arrX,arr1,arr2,arr3){
        this.myChart1 = this.$echarts.init(document.getElementById('echio1'));
        this.myChart1.setOption({
            tooltip: {
               backgroundColor:'#144A8C',
              borderWidth:0,
              textStyle:{
                color:'#D9EFFF',
              }
            },
            legend:{
                show:true,
                textStyle:{
                color:'#ffffff',
              }
            },
            color:['#2968E8','#5470c6', '#fac858'],
            title:{
              text:"客流量",
              textStyle:{
                color:'#DAE4FF',
                fontWeight:'normal',
                fontSize:16,
                
              },
              top:26,
              left:10,
            },
            grid: {
                left: '6%',
                right: '3%',
                bottom: '1%',
                containLabel: true
            },
            xAxis: {
                data:arrX,
                name: '',
                nameTextStyle:{
                  color:'#DAE4FF'
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                      color:'#194F95',
                      type:'dashed'
                    }
                },
                 axisLabel : {
                   interval:0,
                rotate:25 ,
                  formatter: '{value}',
                  textStyle: {
                      color: '#DAE4FF',
                      fontSize:12
                  }
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                  onZero: true,
                  lineStyle:{
                    color:'#194F95',
                    type:'dashed'
                  }
                },
            },
            yAxis: {
              splitLine:{
                  show:true,
                  lineStyle:{
                      color:'#194F95',
                      type:'dashed'
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel : {
                  formatter: '{value}',
                  textStyle: {
                      color: '#fff',
                      fontSize:16
                  }
                },
                axisLine:{
                  onZero: true,
                  lineStyle:{
                    color:'#194F95',
                    type:'dashed'
                  }
                },
            },
            series: [
                {
                  name: '站点客流量',
                  type: 'bar',
                  barWidth:8,
                  data:  arr1
              },
               {
                  name: '站点上车客流量',
                  type: 'bar',
                  barWidth:8,
                  data:  arr2
              },
               {
                  name: '站点下车客流量',
                  type: 'bar',
                  barWidth:8,
                  data:  arr3
              }
            ]

        })

    },

  }
};
</script>
<style lang="scss">
.roadDistribution-box{
  
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
  width:100%;
  height:100%;
  box-sizing: border-box;
 position:relative;
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
  .rightlinemsg3{
     position: absolute;
    bottom: vh(20);
    left: vw(20);
    // width: vw(314);
     z-index:10;
    max-height: vh(800);
    overflow: hidden;
    flex-direction: column;
    display: flex;
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
      padding-bottom:vh(10);
    .tit {
      width: 100%;
      height: vh(50);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(50);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align:center;
      font-weight: bold;
     box-sizing: border-box;
      padding:0 vw(20);
      border-bottom: 1px solid rgba(69, 120, 255, 0.6);
    }

  }
  .rightlinemsg2{
      position: absolute;
    top: vh(300);
    right: vw(20);
    // width: vw(314);
     z-index:10;
    max-height: vh(800);
    overflow: hidden;
    flex-direction: column;
    display: flex;
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
     box-sizing: border-box;
    
      padding:0 vw(20);
      padding-bottom:vh(10);
    .tit {
      width: 100%;
      height: vh(50);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(50);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align:center;
      font-weight: bold;
     
      border-bottom: 1px solid rgba(69, 120, 255, 0.6);
    }
    .xincolor{
      display:inline-block;
      width:1.5vw;
      height:0.4vh;
      background:#ff0000;
      margin-right:0.3vw
    }
   

  }
  .rightlinemsg1{
       position: absolute;
    bottom: vh(40);
    right: vw(20);
    // width: vw(314);
     z-index:10;
    max-height: vh(800);
    overflow: hidden;
    flex-direction: column;
    display: flex;
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
   
    .tit {
      width: 100%;
      height: vh(50);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(50);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align:center;
      font-weight: bold;
       box-sizing: border-box;
      padding:0 vw(20);
      border-bottom: 1px solid rgba(69, 120, 255, 0.6);
    }
    

  }
   .rightlinemsg{
    position: absolute;
    top: vh(300);
    right: vw(20);
    // width: vw(314);
     z-index:10;
    max-height: vh(800);
    overflow: hidden;
    flex-direction: column;
    display: flex;
    background: rgba(12, 38, 104, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    .tit {
      width: 100%;
      height: vh(50);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(50);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align:center;
      font-weight: bold;
      box-sizing: border-box;
      padding:0 vw(20);
      border-bottom: 1px solid rgba(69, 120, 255, 0.6);
    }
    #echio{
        width:vw(460);
        height:vh(300);
    }
      #echio1{
        width:vw(460);
        height:vh(300);
    }
  }
  
}
</style>
