<template>
  <div class="tradeManage" 
   v-loading="assloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
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
                <div style="color:#4578FF">2963个</div>
              </div>
              <div class="echleng1">
                <div style="display:flex;align-items: center;">
                   <div class="rounbox rounbox1"></div>
                    未改造站点数：

                </div>
                <div style="color:#F5256A">{{zonum-2963}}个</div>
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
                  三角站杆：
                </div>
                <!-- {{stadata['三角杆']}} -->
                <div style="color:#4578FF">2536个</div>
              </div>
              <div class="echleng1" style="margin-top:1.5vh">
                <div style="display:flex;align-items: center;">
                   <div class="rounbox" style="background:#00FFFF"></div>
                    亭牌合一：

                </div>
                <div style="color:#00FFFF">820个</div>
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
                <img @click="toShow(iteam,n)" v-show="iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxktrue.png" />
                <img @click="toShow(iteam,n)" v-show="!iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxkfalse.png" />
                <div class="natit">{{iteam.name}}</div>
              </div>
            </div>

          </div>
          <div class="seting-box seting-box1" v-show="tlstation[0].isxz==true" >
            
            <div class="table-box">
              <div  class="table-iteanm" v-for="(iteam,n) in tlstation1" :key="n" >
                <img @click="toShow1(iteam,n)" v-show="iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxktrue.png" />
                <img @click="toShow1(iteam,n)" v-show="!iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxkfalse.png" />
                <div class="natit">{{iteam.name}}</div>
                
              </div>
            </div>

          </div>
          <div class="search-box" v-show="tlstation[2].isxz">
            <div style="margin-right:0.6vw;white-space: nowrap">地铁线路名称</div>
              <el-select style="width:75%" size="small" filterable @change="getDetail" v-model="value" placeholder="请选择">
                <el-option
                  v-for="(item,n) in metrodata"
                  :key="n"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
          </div>
      </div>
      <div class="cen-bottom">
        <div class="titbox" style="margin-top:16px;margin-bottom:8px">车辆生命期体征-维修保养记录</div>

         <div class="table-data">
        <div class="table-header">
        
          <div >报修时间</div>
          <div>车辆自编号</div>
          <div >车牌号</div>
          <div>维修内容</div>
          <div >维修人员</div>
        </div>
        <div class="table-contain swiper-container" id="swiperhy">
          <div class="swiper-wrapper">
            <div class="swiper-slide"   v-for="(iteam,index) in awdata" :key="index">
              <div class="tableTr" v-for="(item,i) in iteam" :key="i+2">
                <div>{{item.BXSJ}}</div>
                <div >{{item.ZBH}}</div>
                <div >{{item.CPH}}</div>
                <div >{{item.WXXZ}}</div>
                <div>{{item.BXY}}</div>
              </div>
            </div>
          </div>
          <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-show="awdata.length==0">无数据</div>
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
        <div class="titbox" style="margin-top:24px;margin-bottom:0px">线网服务质量</div>
        <div class="table-contain swiper-container" id="swiperhy1">
          <div class="swiper-wrapper">
            <div class="swiper-slide"   v-for="(iteam,index) in fwpldata" :key="index">
              <div class="rightpj-box" v-for="(item,i) in iteam" :key="i+2">
                  <div style="display:flex;align-items: center;justify-content:space-between;margin-bottom:1.2vh">
                    <div>线路名称：</div>
                    <div>{{item.routeName}}</div>
                  </div>
                  <div style="display:flex;align-items: center;justify-content:space-between;margin-bottom:1.2vh">
                    <div>反映时间：</div>
                    <div>{{item.receiveTime}}</div>
                  </div>
                  <div style="display:flex;align-items: center;justify-content:space-between;margin-bottom:1.5vh">
                    <div>反映内容：</div>
                    <div style="width:60%;height:24px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
                      
                       <el-tooltip class="item" effect="dark" placement="top-start">
                         <div style="width:300px;font-size:16px;" slot="content">{{item.content}}</div>
                          <div style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.content}}</div>
                        </el-tooltip>
                    </div>
                  </div>
                  <img  :src="item.hdlStatus=='处理中'?require('@/assets/image/4.6_2.png'):require('@/assets/image/4.6_3.png')" alt="" srcset="">
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="rightpj-box">
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
        </div> -->
        <!-- <div class="rightpj-box">
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
        </div> -->
    </div>
  </div>
</template>

<script>
import MapMixin from '../networkExcellent/networkMap';
 import screenfull from "screenfull";
 import Swiper from "swiper";
 import { arrGroup } from '@/libs/util.js';
 let wxjl=require('./datawxjl.js')
export default {
  mixins: [MapMixin],
  data(){
    return{
      myChart1:null,
      objline:{},
      restaurants:[],
      lefttda:{},
      stadata:{},
      zonum:0,
      myChart2:null,
      assloading:true,
       swipertable:null,
       value:"9号线",
       nowName:"站点智能化建设",
       nowName1:"途径站",
       qdData:[],
       awdata:[],
       fwpldata:[],
      carSearch:{
        // leftlon:null,
        // rightlon:null,
        // leftlat:null,
        // rightlat:null,
        zoom:0,
      },
       toxidata:[ {num: 297, name: "浦东新区", centre: [121.550734,31.227827]}],
      metrodata:[{name:'1号线',color:'#e3022a'},{name:'2号线',color:'#8dc218'},{name:'3号线',color:'#fdd501'},
                    {name:'4号线',color:'#411d81'},{name:'5号线',color:'#924a96'},{name:'6号线',color:'#d10368'},
                    {name:'7号线',color:'#f26b11'},{name:'8号线',color:'#0092d7'},{name:'9号线',color:'#0092d7'},
                    {name:'10号线',color:'#c3aecb'},{name:'11号线',color:'#841d30'},{name:'12号线',color:'#027a5f'},
                    {name:'13号线',color:'#e09abe'},{name:'14号线',color:'#655f23'},{name:'15号线',color:'#B9A981'},
                    {name:'16号线',color:'#98D1C0'},{name:'17号线',color:'#B67770'},{name:'18号线',color:'#D5A461'}],
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
      ],
      tlstation1:[
        {
            name:'途径站',
            isxz:true,
            num:0.6,
          },
          {
            name:'场站和枢纽站',
            isxz:false,
            num:0.5,
          },
         
      ]
    }

  },
    created(){
       
        this.initSwipertable()
        this.getNoLi()
        this.getAllLine()
        this.getda()
        this.awdata=arrGroup(wxjl.datawx,5)
        this.fwpldata=arrGroup(wxjl.fwpj,2)
    },
    mounted(){
      this.M_initMap('compreMapks5')
       
       this.M_map.on('moveend',(e)=>{
         this.carSearch.zoom=Math.round(e.target.getZoom())

         

          if(this.tlstation[1].isxz==true){
            // if(this.carSearch.zoom>15){
            //   this.xwrhGroups2.hide()
            // }
            // if(this.carSearch.zoom<13){
            //   this.realbusGroups.hide()
            // }
            this.getgpsLine()
          }
        
       })
       this.pointAll2()
    },
    methods:{
         // 设置地图全屏显示
    mapFullEvent () {
      if (!screenfull.isEnabled) {
        return false
      }
      screenfull.toggle(this.$refs.compreMapks5)
    },
    

     getBusLine(){
         this.$fetchGet("gps/realBusRoute").then(res => {
           res.result.forEach(iteam=>{
            this.$fetchGet("route/baseLineDetail",{
              routeName:iteam.routeName
            }).then(resall => {
              if(resall.result.length>0){
                  iteam.geom=this.Q_setData(resall.result[0].geom)
                  this.M_crealinebus(iteam)
              }
            })
           })
              // setTimeout(()=>{
              // this.echloadsd1=false
              // },3000)
          

           
          
         
        })



      


      },
    getDetail(){
      this.metrodata.forEach(iteam=>{
        if(this.value==iteam.name){
          this.lineSearchtes(iteam.name,iteam)
        }
      })
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
        this.zonum=res.result.stations
        this.initechart1(res.result.stations)

        console.log("站点总数")
      })

       setTimeout(()=>{
          this.assloading=false
        },2000)
    },
    getgpsLine(){
       this.$fetchGet("gps/route",this.carSearch).then(res => {
        if(res.result&&res.result.length>0){
           if(this.carSearch.zoom>11&&this.carSearch.zoom<16){
              this.setxwxzgh(res.result)
              this.pointEvent()
            }
            if(this.carSearch.zoom>15){
              // this.M_addPoint(res.result)
              
              res.result.forEach(iteam=>{
                iteam.geom=this.Q_setData(iteam.geom)
                this.M_crealinebus(iteam,2)
              })
              
              // this.pointEvent()
            }

        }
      })

    },
    getAllLine(){
      
      this.$fetchGet("route/baseTotal").then(res =>{
        this.objline=res.result

      })
    },

    toShow1(row,n){

       this.nowName1=row.name

        if(row.isxz){
        return
      }else{

      
        this.tlstation1.forEach(iteam=>{
          if(iteam.name==this.nowName){
            iteam.isxz=true
          }
          if(iteam.name!==this.nowName1){
          
              iteam.isxz=false
          }
        })
        switch (row.name) {
            case '途径站' :
            

                break;
            case '场站和枢纽站' :

              
            
                break;
            
            default :
                
        }
      }

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
              if(this.massall1){
                this.massall1.show()
              }
              

               if(this.xwrhGroups){
                  this.xwrhGroups.hide()
                }
                if(this.xwrhGroups1){
                  this.xwrhGroups1.hide()
                }

                if(this.realbusGroups){
                
                    this.realbusGroups.hide()
                }


                  if(this.xwrhGroups2){
                  this.xwrhGroups2.hide()
                }
               

              

                break;
            case '线网现状规划' :

              this.M_setZoomAndCenter([121.473658,31.230378],12)
              this.getgpsLine()
              //  if(this.realbusGroups.getOverlays().length>0){
              //       this.realbusGroups.show()
              //   }else{
              //     this.getBusLine()
              //   }
              if(this.massall1){
                this.massall1.hide()
              }
              

               if(this.xwrhGroups){
                  this.xwrhGroups.hide()
                }
                if(this.xwrhGroups1){
                  this.xwrhGroups1.hide()
                }
                // this.setxwxzgh(this.toxidata)
                // this.pointEvent()
              
            
                break;
            case '线网融合' :

              if(this.massall1){
                this.massall1.hide()

              }

              
               if(this.xwrhGroups2){
                  this.xwrhGroups2.hide()
                }

              if(this.realbusGroups.getOverlays().length>0){
                    this.realbusGroups.hide()
                }

              this.lineSearchtes('9号线',this.metrodata[8])


                break;
            
            default :
                
        }
      }

    },

    pointEvent(){
      this.M_addGroupEvent((str)=>{
        // this.getBusLine()

        this.M_setZoomAndCenter([str.centerLongitude,str.centerLatitude],17)
        if(this.realbusGroups.getOverlays().length>0){
            this.realbusGroups.show()
        }else{
          this.getgpsLine()
        }

        // if(this.realbusGroups){
        //   this.realbusGroups.clearOverlays()
        // }

        this.M_setZoomAndCenter([str.centerLongitude,str.centerLatitude],17)
        // this.xwrhGroups2.clearOverlays()
        // this.getgpsLine()

      })
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
        this.$fetchGet("gps/ebusList").then(res => {
          // if(res.result&&res.result['站点的详细属性']){
          //     this.restaurants =this.cloneObj(res.result['站点的详细属性'])
          //     this.M_pointAll4(this.restaurants)
          // }
          let arr=[]
          res.result.data.forEach(iteam=>{
            let obj={}
            obj.lnglat=[iteam.lon,iteam.lat]
            obj.style=0
            obj.code=iteam.code
            arr.push(obj)
            // this.restaurants.push(iteam)
          })
          console.log(arr)
          this.M_pointAll4(arr)
        })
    },
    initSwipertable() {
      this.swipertable = new Swiper("#swiperhy", {
        loop: true, // 循环模式选项
        mousewheel: true,
        direction: "vertical",
        autoplay: {
          delay: 8000 // 切换时间
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });

      this.swipertable = new Swiper("#swiperhy1", {
        loop: true, // 循环模式选项
        mousewheel: true,
        autoplay: {
          delay: 8000 // 切换时间
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
  
    },
      initechart1(dase){
          this.myChart1 = this.$echarts.init(document.getElementById('echbox1'));
          this.myChart1.setOption({
              tooltip: {
                show:false,
                  trigger: 'item'
              },
              legend: {
                show:false,
                  // top: '5%',
                  // left: 'center'
              },
               title: [
                  {
                    text: dase,
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
                        value: 2963/dase*75,
                        name: '已改造站点'
                      },
                      {
                        value: (dase-2963)/dase*75,
                        name: '未改造站点'
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
                show:false,
                  trigger: 'item'
              },
              legend: {
                  show:false
              },
              title: [
                  {
                    text: 3356,
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
                          {value: 2256/3356*75, name: '三角站杆'},
                          {value: 820/3356*75, name: '亭牌合一'},
                         
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
            // width: vw(180);
            min-height: vh(20);
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
      .search-box{
        position: absolute;
        left: vw(12);
        top: vw(14);
        z-index:10;
        display:flex;
        align-items: center;
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
      .seting-box1{
          position: absolute;
          left: vw(212);
          bottom: vw(14);
          z-index:10;
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
  #swiperhy1{

     width:100%;
      height:vh(480);
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
       margin-top:vh(16);

    }
  }

 
}
</style>
