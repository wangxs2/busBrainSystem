<template>
<!-- 辅助决策的可视化 -->
  <div class="assistPolicy"    
   v-loading="assloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="left-box">
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
          <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-show="alldata.length==0">无数据</div>
        </div>
      </div>
      <div class="titbox" style="margin-bottom:8px;margin-top:14px">线路重复系数</div>
      <div class="con-box table-data table-data1" >
        <div id="assech2"></div>
         <img class="imgcs" src="@/assets/image/ccline.png" alt="" srcset="">
        <div style="position:absolute;right:36px;top:85px;display:flex; flex-direction: column;align-items: center">
          <div style="display:flex;align-items: center">
            <div style="width:10px;height:10px;border-radius:50%;background:#F5256A;margin-right:8px"></div>≥0.5
          </div>
          <div style="display:flex;align-items: center;margin-top:20px">
            <div style="width:10px;height:10px;border-radius:50%;background:#4578FF;margin-right:6px;margin-left:6px"></div>＜0.5
          </div>
        </div>
      </div>
      <div class="titbox" style="margin-top:14px">线路长度</div>
      <div class="big-tab big-tab4">

        <div id="assech1"></div>
        <img class="imgcs" src="@/assets/image/cfxx.png" alt="" srcset="">
        <div style="position:absolute;right:36px;top:60px;display:flex; flex-direction: column;align-items: center">
          <div style="display:flex;align-items: center">
            <div style="width:10px;height:10px;border-radius:50%;background:#F5256A;margin-right:8px"></div>≥30km
          </div>
          <div style="display:flex;align-items: center;margin-top:20px">
            <div style="width:10px;height:10px;border-radius:50%;background:#4578FF;margin-right:6px;margin-left:6px"></div>＜30km
          </div>
        </div>

        
      </div>
    </div>
    <div class="center-box">
      <div class="map-box1" ref="compreMapks"  id="compreMapks">
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
          <div class="tulibox" v-show="nowName!=='长期拥堵路段'&&nowName!=='百公里人次'&&nowName!=='换乘压力'">
            <div style="display:flex;align-items: center">
              <div class="linetu"></div>
              <div class="fonttu">{{nowName}} ≤ {{nownum}}</div>
            </div>
             <div style="display:flex;align-items: center;margin-top:1vh">
              <div class="linetu linetu1"></div>
              <div class="fonttu">{{nowName}}＞{{nownum}}</div>
            </div>
          </div>
          <div class="tulibox tulibox1" v-show="nowName=='百公里人次'">
            <div style="display:flex;align-items: center">
              <div class="linetu"></div>
              <div class="fonttu">0-30</div>
            </div>
            <div style="display:flex;align-items: center;margin-top:1vh">
              <div class="linetu" style="background:#e5d887"></div>
              <div class="fonttu">30-60</div>
            </div>
            <div style="display:flex;align-items: center;margin-top:1vh">
              <div class="linetu" style="background:#f06f59"></div>
              <div class="fonttu">60-100</div>
            </div>
            <div style="display:flex;align-items: center;margin-top:1vh">
              <div class="linetu linetu1"></div>
              <div class="fonttu">100以上</div>
            </div>
          </div>
           <div class="tulibox tulibox1" v-show="nowName=='换乘压力'">
            <div style="display:flex;align-items: center">
              <div class="">
                <img width="20" height="20" src="@/assets/image/1hc.png" alt="" srcset="">
              </div>
              <div class="fonttu">1-5</div>
            </div>
            <div style="display:flex;align-items: center;margin-top:1vh">
              <div class=""><img width="20" height="20" src="@/assets/image/2hc.png" alt="" srcset=""></div>
              <div class="fonttu">6-10</div>
            </div>
            <div style="display:flex;align-items: center;margin-top:1vh">
              <div class=""><img width="20" height="20" src="@/assets/image/3hc.png" alt="" srcset=""></div>
              <div class="fonttu">10-30</div>
            </div>
            <div style="display:flex;align-items: center;margin-top:1vh">
              <div class=""><img width="20" height="20" src="@/assets/image/4hc.png" alt="" srcset=""></div>
              <div class="fonttu">30-50</div>
            </div>
            <div style="display:flex;align-items: center;margin-top:1vh">
              <div class=""><img width="20" height="20" src="@/assets/image/5hc.png" alt="" srcset=""></div>
              <div class="fonttu">50-100</div>
            </div>
            <div style="display:flex;align-items: center;margin-top:1vh">
              <div class=""><img width="20" height="20" src="@/assets/image/6hc.png" alt="" srcset=""></div>
              <div class="fonttu">100-500</div>
            </div>
            <div style="display:flex;align-items: center;margin-top:1vh">
              <div class=""><img width="20" height="20" src="@/assets/image/7hc.png" alt="" srcset=""></div>
              <div class="fonttu">500-6000</div>
            </div>
          </div>
      </div>
      <div class="cen-bottom">
        <div class="cen-bottom-left">
          <div class="titbox" style="margin-top:18px;margin-bottom:8px">百公里人次</div>
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
        <div class="cen-bottom-right">
           <div class="titbox" style="margin-top:18px;margin-bottom:8px">换乘压力</div>
          <div class="big-tab" id="hcechbox2">
          
          
            
          </div>
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="titbox" style="margin-bottom:8px">满载率</div>
      <div class="right-svg">
        <div class="node-one">
            <el-progress type="circle" color="#E1453E" :width="120" stroke-linecap="butt" :stroke-width="16" :percentage="mlldata[0].mzl"></el-progress>
            <div class="btfon btfon6">
              <div  class="btfon1 btfon3">1</div>
             <div style="flex:1;text-align:center"> {{mlldata[0].xlmc}}</div>
            </div>
        </div>
        <div class="two-one">
           <div>
              <el-progress type="circle" color="#E19E3E" :width="96" stroke-linecap="butt" :stroke-width="16" :percentage="mlldata[1].mzl"></el-progress>
              <div class="btfon btfon7">
                <div  class="btfon1 btfon4">2</div>
                <div style="flex:1;text-align:center"> {{mlldata[1].xlmc}}</div>
              </div>
           </div>
           <div>
               <el-progress type="circle" color="#38CE97" :width="96" stroke-linecap="butt" :stroke-width="16" :percentage="mlldata[2].mzl"></el-progress>
              <div class="btfon btfon8">
                <div  class="btfon1 btfon5">3</div>
                <div style="flex:1;text-align:center"> {{mlldata[2].xlmc}}</div>
              </div>
           </div>
           
        </div>
        <!-- <div class="three-box"> -->


          <div class="three-box swiper-container" id="swiper6" >
            <div class="swiper-wrapper">
              <div class="swiper-slide"  v-for="(iteam,index) in mlgdata" :key="index">
                <div v-for="(item,i) in iteam" :key="item.index" v-show="index>0">
                  <el-progress type="circle" color="#4578FF" :width="80" stroke-linecap="butt" :stroke-width="16" :percentage="item.mzl"></el-progress>
                  <div class="btfon">
                    <div  class="btfon1">{{item.index}}</div>
                    <div style="flex:1;text-align:center">{{item.xlmc}}</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

            

        <!-- </div> -->
      </div>
      <div class="titbox" style="margin-bottom:8px;margin-top:18px">长期拥堵路段</div>
      <div class="con-box con-box1 table-data" >
        <div class="table-header">
          <div style="width:10%"></div>
          <div style="width:45%">道路名称</div>
          <div style="width:45%">拥堵系数</div>
        </div>
        <div class="table-contain swiper-container" id="swiper5">
          <div class="swiper-wrapper">
            <div class="swiper-slide"   v-for="(iteam,index) in lineaData" :key="index">
              <div class="tableTr" v-for="(item,o) in iteam" :key="item.index">
                <div  style="width:10%">
                  <div :class="item.index==1?'roud roud1':item.index==2?'roud roud2':item.index==3?'roud roud3':'roud'">{{item.index}}</div>
                </div>
                <div style="width:45%">{{item.roadsegid}}</div>
                <div style="width:45%">{{item.congestIndex}}</div>
              </div>
            </div>
          </div>
          <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-show="alldata.length==0">无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapMixin from '../networkExcellent/networkMap';
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
      alldata1:[],//线路重复系数
      alldata2:[],//百公里人次
      OverlengData:[],
      lineaData:[],//长期拥堵乱
      lineaData1:[],//长期拥堵乱
      personData:[],
      value:'',
      swipertable:null,
      assloading:true,
      swipertable2:null,
      swipertable3:null,
      myCharthc:null,
      swipertable4:null,
      swipertable5:null,
      swipertable6:null,
      swipertable7:null,
      qdData:[],
      qdData1:[],//线路重复系数
      mlldata:[
        
        {
          xlmc:"",
          mzl:0,
        },
        {
          xlmc:"",
          mzl:0,
        },
        {
          xlmc:"",
          mzl:0,
        },
      
      ],//manzailv
      mlgdata:[],
      hvdataall:[],//换乘压力
      options:[],
      personData1:[],
      value1:[new Date().getTime() - 3600 * 1000 * 24 * 30,new Date()],
      threedata:[],
      nowName:"非直线系数",
      nownum:1.6,
      tlstation:[
        {
            name:'非直线系数',
            isxz:true,
            num:1.6,
          },
          {
            name:'线路重复系数',
            isxz:false,
            num:0.5,
          },
          {
            name:'长期拥堵路段',
            isxz:false,
             num:30,
          },
          {
            name:'百公里人次',
            isxz:false,
             num:30,
          },
          {
            name:'满载率',
            isxz:false,
             num:0.7,
          },
          {
            name:'超长线路',
            isxz:false,
            num:'30km',
          },
          {
            name:'换乘压力',
            isxz:false,
            num:'',
          }
      ],
      myChart1:null,
      myChart2:null

    }

  },
  mounted() {
    this.M_initMap('compreMapks')
    this.initSwipertable()
   
    this.gethcData()
    // this.trafficLayer.setMap(this.M_map);
    // this.initechart1()
  },
  created(){
      this.getNoLi()
      this.getAreaLine()
  },
  methods:{
    initechart1(data1,data2){
      this.myChart1 = this.$echarts.init(document.getElementById('assech1'));
      this.myChart1.setOption({
           tooltip: {
                show:false,
                  trigger: 'item'
              },
              legend: {
                show:false,
              },
              title: [],
              series: [
                {
                  name: ' ',
                  type: 'pie',
                  radius: ['75%', '95%'],
                  center: ['40%', '55%'],
                  startAngle: 180,
                  color: ['#0263FF', '#F5256A', 'transparent'],
                  hoverAnimation: false,
                  legendHoverLink: false,
                  labelLine:{
                    length:1,
                    lineStyle:{
                      color:'transparent'
                    }
                   
                  },
                  itemStyle:{
                  },
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  },
                    data: [
                     
                      {
                        value: (data2/(data1+data2))*50,
                        name: Math.round((data2/(data1+data2))*100)+'%',
                        label: {
                            color: "rgba(255, 255, 255, 1)"
                          }
                      },
                       {
                        value: (data1/(data1+data2))*50,
                        name: Math.round((data1/(data1+data2))*100)+'%',
                         label: {
                            color: "rgba(255, 255, 255, 1)"
                          }
                      },
                      {
                        value: 50,
                        name: '3'
                      }
                    ]
                  }
              ]
         
      });

    },
    initechart2(data1,data2){
      this.myChart2 = this.$echarts.init(document.getElementById('assech2'));
      this.myChart2.setOption({
           tooltip: {
                show:false,
                  trigger: 'item'
              },
              legend: {
                show:false,
              },
              title: [],
              series: [
                {
                    name: ' ',
                    type: 'pie',
                    radius: ['72%', '89%'],
                    center: ['44%', '55%'],
                    startAngle: 180,
                    color: [ '#0263FF','#F5256A', 'transparent'],
                        hoverAnimation: false,
                    legendHoverLink: false,
                  labelLine:{
                    length:0,
                     length2:0,
                    lineStyle:{
                      color:'transparent'
                    }
                   
                  },
                  itemStyle:{
                  },
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  },
                    data: [
                     
                      {
                        value: (data2/(data1+data2))*50,
                        name: Math.round((data2/(data1+data2))*100)+'%',
                        label: {
                            color: "rgba(255, 255, 255, 1)"
                          }
                      },
                       {
                        value: (data1/(data1+data2))*50,
                        name: Math.round((data1/(data1+data2))*100)+'%',
                         label: {
                            color: "rgba(255, 255, 255, 1)"
                          }
                      },
                      {
                        value: 50,
                        name: '3'
                      }
                    ]
                  }
              ]
      });

    },
    //获取换乘压力的明细
    gethcData(){
       this.$fetchGet("http://180.167.126.126:3005/pos/transfer/avg").then(res => {
         let echobjd={
           arr1:[],
           arr2:[],
           arr3:[],
           arr4:[],
           arr5:[],
           arr6:[],
           arr7:[]
         }
         
         this.hvdataall=res.result
        res.result.forEach(iteam=>{
          if(iteam.count&&iteam.count<6){
            echobjd.arr1.push(iteam)
          }else if(iteam.count>5&&iteam.count<11){
            echobjd.arr2.push(iteam)
          }else if(iteam.count>10&&iteam.count<31){
            echobjd.arr3.push(iteam)
          }else if(iteam.count>30&&iteam.count<51){
            echobjd.arr4.push(iteam)
          }else if(iteam.count>50&&iteam.count<101){
            echobjd.arr5.push(iteam)
          }else if(iteam.count>100&&iteam.count<501){
            echobjd.arr6.push(iteam)
          }else if(iteam.count>500){
            echobjd.arr7.push(iteam)
          }
        })

          console.log(echobjd)
          this.initecharthc(echobjd)


       })

       this.$fetchGet("curve/often").then(res => {

       })
    },
    getNoLi(){
      //非直线系数的数据
      this.$fetchGet("route/straightCoefficient").then(res => {
        res.result.forEach((item,index)=>{
            if(item.geom){
              item.geom=this.Q_setData(item.geom)
            }
            
        })
        this.alldata=res.result;
        let arr=this.alldata.sort(this.compare('coefficient',false))
        arr.forEach((iteam,index)=>{
            iteam.index = index + 1;
        })
        
        this.M_BUSLINE(this.alldata,10)
        this.qdData=arrGroup(arr,5)
        this.threedata=arrGroup(res.result,3)
      })

       //线路重复系数的的数据
      this.$fetchGet("route/lineCoefficient").then(res => {
        let arr8=[],arr9=[]
        res.result.forEach((item,index)=>{
            // item.geom=this.Q_setData(item.geom)
            if(item.geom){
              item.geom=this.Q_setData(item.geom)
            }
            item.index = index + 1;
            if(Number(item.coefficient)>0.5){
              
              arr8.push(item)
            }else{
              arr9.push(item)
            }
        })
        this.initechart2(arr8.length,arr9.length)
        this.alldata1=res.result;
        this.qdData1=arrGroup(res.result,5)
       
      })


      //百公里人次
      this.$fetchGet("route/hundreds",{
      }).then(res => {

        res.result.forEach((item,index)=>{
            // item.geom=this.Q_setData(item.geom)
            if(item.geom){
              item.geom=this.Q_setData(item.geom)
            }
        })
        this.alldata3=res.result;
        let arr=this.alldata3.sort(this.compare('baipass',false))
        arr.forEach((iteam,index)=>{
            iteam.index = index + 1;
        })
        this.personData = arrGroup(arr,8);
      })


    // 线路长度
      this.$fetchGet("route/overLength").then(res => {
        let arr8=[],arr9=[];
        
          res.result.forEach((item,index)=>{
              // item.geom=this.Q_setData(item.geom)
              if(item.geom){
              item.geom=this.Q_setData(item.geom)
            }
              if(Number(item.lineLength)>30){
                arr8.push(item)
              }else{
                arr9.push(item)
              }
          })
          this.initechart1(arr8.length,arr9.length)
          // 
          // this.alldata=res.result;
          let arr=res.result.sort(this.compare('lineLength',false))
          arr.forEach((iteam,index)=>{
              iteam.index = index + 1;
          })
          this.OverlengData=arr;


          setTimeout(()=>{
          this.assloading=false
          },2000)
      })


    // 满载率
      this.$fetchGet("route/mzl",{
        st:this.$moment(this.value1[0]).format("YYYY-MM-DD"),
          et:this.$moment(this.value1[1]).format("YYYY-MM-DD"),
      }).then(res => {
        
          res.result.forEach((item,index)=>{
            if(item.geom){
              item.geom=this.Q_setData(item.geom)
            }
            
             if(item.mzl==null){
                item.mzl=0
              }
          })
          
          let arr=res.result.sort(this.compare('mzl',false))
          arr.forEach((iteam,index)=>{
              iteam.index = index + 1;
              
          })
          this.mlldata=arr;
          this.mlgdata=arrGroup(arr,3);
      })


    //  长期拥堵的路段
      this.$fetchGet("curve/often").then(res => {
        res.result.forEach((iteam,index)=>{
              iteam.index = index + 1;
              
          })
          this.lineaData1=res.result
        this.lineaData=arrGroup(res.result,5);

        // this.M_autoInput(this.lineaData)
        // setTimeout(()=>{
        // this.$store.commit('SET_LOADING',false)
        // },200)
        
      })








      


    },
    //  排序
    compare(attr,rev){
      //第二个参数没有传递 默认升序排列
      if(rev == undefined){
        rev = 1;
      }else{
        rev = (rev) ? 1 : -1;
      }
      
      return function(a,b){
        a = a[attr];
        b = b[attr];
        if(a < b){
          return rev * -1;
        }
        if(a > b){
          return rev * 1;
        }
        return 0;
      }
    },

    //换乘压力的统计图
    initecharthc(echobjd){
          this.myCharthc = this.$echarts.init(document.getElementById('hcechbox2'));
          this.myCharthc.setOption({
              tooltip: {
                show:false,
                  trigger: 'item'
              },
              legend: {
                    orient: 'vertical',
                    right: '10%',
                    top:'center',
                    icon:'circle',
                    textStyle:{
                        color:'#ffffff'
                    },
              },
              title: [],
              series: [
                  {
                      name: '',
                      type: 'pie',
                      radius: ['60%', '75%'],
                       center: ["33%", "50%"],
                      color: ['#00FFFF', '#4578FF', '#F5256A','#5AB91B','#FFCA40','#D35F1A','#00A08A'],
                      avoidLabelOverlap: false,
                      label:{
                        color:'#ffffff',
                        formatter:'{d}%'

                    },
                    labelLine: {
                        show: true,
                        length:0,
                        length2:0,
                    },
                      hoverAnimation: false,
                    legendHoverLink: false,
                      emphasis: {
                          label: {
                              show: true,
                              fontSize: '18',
                               color:'#ffffff',

                          }
                      },
                     
                      data: 
                      [
                          {value: echobjd.arr1.length, name: '1-5'},
                          {value: echobjd.arr2.length, name: '6-10'},
                          {value: echobjd.arr3.length, name: '10-30'},
                          {value: echobjd.arr4.length, name: '30-50'},
                          {value: echobjd.arr5.length, name: '50-100'},
                          {value: echobjd.arr6.length, name: '100-500'},
                          {value: echobjd.arr7.length, name: '500-6000'},
                         
                      ]
                  }
              ]
          });
      },
    
    toShow(row,n){
      this.nowName=row.name
      this.nownum=row.num
      if(row.isxz){
        return 
      }else{
        //  row.isxz=!row.isxz
         this.tlstation.forEach(iteam=>{
           if(iteam.name==this.nowName){
             iteam.isxz=true
           }
           if(iteam.name!==this.nowName){
              iteam.isxz=false
           }
         })


        switch (this.nowName) {
            case '非直线系数' :
                this.M_BUSLINE(this.alldata,10)
                break;
            case '线路重复系数' :
                 this.M_BUSLINE(this.alldata1,11)
                break;
            case '百公里人次' :
                 this.M_BUSLINE(this.alldata3,19)
                break;
            case '长期拥堵路段' :
              this.M_autoInput(this.lineaData1)
                break;
            case '满载率' :
                this.M_BUSLINE(this.mlldata,17)
                break;
            case '超长线路' :

             this.M_BUSLINE(this.OverlengData,16)  
                
                break;
            case '换乘压力' :

            this.localMainhcyl(this.hvdataall)
                
                break;
            default :
                 
        }
      } 
     
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
      screenfull.toggle(this.$refs.compreMapks)
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
      // this.swipertable7 = new Swiper("#swiper7", {
      //   loop: true, // 循环模式选项
      //   mousewheel: true,
      //   autoplay: {
      //     delay: 5000 // 切换时间
      //   },
      //   observer: true, //修改swiper自己或子元素时，自动初始化swiper
      //   observeParents: true //修改swiper的父元素时，自动初始化swiper
      // });

    },
  }
  
}
</script>
<style lang="scss">
.el-progress__text{
  color:#ffffff;
}
.el-progress-circle__track{
  stroke:#00ffff26
}

.assistPolicy{
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
.assistPolicy{
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
  .con-box{
      width: vw(380);
      height: vh(262);
      box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 1) inset;
      
    }
  .con-box1{
    height: vh(265);
  }
  .table-data1{
      position: relative;
    .imgcs{
      width: vw(90);
      height: vw(90);
      position: absolute;
      left:vw(77);
      top: vh(95);
    }

  }
  .table-data{
    box-sizing: border-box;
    overflow:hidden;
    display:flex;
    flex-direction: column;
    #assech2{
      width:vw(230);
      height:100%;
      box-sizing:border-box;
      position: absolute;
      left:vw(20);
      top: vh(30);
    }
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
  .big-tab{
    width:vw(506);
    height:vh(240);
    background: rgba(12, 38, 104, 0.2);
    box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 1) inset;
    box-sizing:border-box;
    // padding-top:vh(12);
    padding-left:vw(30);
    overflow:hidden;
    display:flex;
    flex-wrap:wrap ;
    #assech1{
      width:vw(220);
      height:100%;
      box-sizing:border-box;
      position: absolute;
      left:vw(50);
      top: vh(30);
    }
    .big-tab2{
      margin-right:vw(24);
      margin-top:vh(30);
    }
    .itea-per{
      width:vw(90);
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
      width:vw(90);
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
  .big-tab4{
    width:100%;
    height:vh(198);
    padding-left:0;
    box-shadow: none;
    position: relative;
    .imgcs{
      width: vw(80);
      height: vw(80);
      position: absolute;
      left:vw(100);
      top: vh(80);
    }
    
  }
  #swiper1,#swiper3,#swiper4,#swiper5{
      width:100%;
      height:vh(200);
      .swiper-wrapper{
        width:100%;
        height:100%;
      }
  }

   #swiper2,#swiper7{
    .swiper-slide{
      width:100%;
      height:100%;
        display:flex;
      flex-wrap:wrap ;
    }
  }
   #swiper6{
    .swiper-slide{
      width:100%;
      height:100%;
      display:flex;
      justify-content:space-between;
    }
  }
 
  .left-box{
    width:vw(396);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
        bottom: vw(104);
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
        position: absolute;
        right: vw(12);
        bottom: vw(14);
        // width:vw(200);
        // height:vh(90);
        z-index:10;
        box-shadow: 0px 0px vh(6)  #4578FF inset;
         background: rgba(12, 38, 104,1);
        box-sizing:border-box;
        padding:vh(18) vw(10);
        .linetu{
          width:vw(50);
          height:vh(5);
          background: #3EAABA;
          margin-right:vw(8);
        }
        .linetu1{
          background:#D53838
        }
      }
    }

    .cen-bottom{
      width:100%;
      flex:1;
      display:flex;
      .cen-bottom-left{
        width:vw(522);
        height:100%;
        flex-direction: column;
          display: flex;
          box-sizing:border-box;
      }
      .cen-bottom-right{
        width:vw(522);
        height:100%;
        margin-left:vw(12);
      }
    }
  }
  .right-box{
    width:vw(396);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .right-svg{
      width:vw(380);
      height:vh(494);
      box-shadow: 0px 0px vh(6) #27B6FF inset;
      box-sizing:border-box;
      padding:vh(18) vw(24);
      .node-one{
        width:100%;
        height:vh(150);
        display:flex;
        flex-direction: column;
        align-items: center;
      }
      .two-one{
        margin-top:vh(24);
         display:flex;
         justify-content:space-between;
         box-sizing:border-box;
         padding:vh(0) vw(30);
      }
      .three-box{
        width:100%;
        margin-top:vh(24);
        // display:flex;
        //  justify-content:space-between;


      }
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
          line-height:vh(22);
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
  }
 
}
</style>
