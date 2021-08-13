<template>
  <div class="realNetwork">
    <div class="top-box">
      <div class="top-left">
        <div class="tl-box1">
          <div class="itlist">
            <div class="fonq1">今日平均计划配置数</div>
            <div class="fonq2">{{rightObj.onLineValue.active||0}}</div>
          </div>
          <div class="itlist">
            <div class="fonq1">今日运营车辆总数</div>
            <div class="fonq2">{{rightObj.runningValue.active||0}}</div>
          </div>
          <div class="itlist">
            <div class="fonq1">当前运营车辆数</div>
            <div class="fonq2">{{rightObj.runningValue.num||0}}</div>
          </div>
          <div class="itlist">
            <div class="fonq1">运营率</div>
            <div class="fonq2">{{rightObj.runningValue.percent}}</div>
          </div>
        </div>
        <div class="tl-box2">
          <div class="lttit">存在历史定位车辆总数</div>
          <div class="lttit1">{{rightObj.count.num}}</div>
          <div class="bitit-box">
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_zzry.png" alt="" srcset="">
                <div>
                    <div class="bigttn">{{rightObj.count.active}}</div>
                    <div class="bigttn1">车辆活跃数</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_gjxl.png" alt="" srcset="">
                <div>
                    <div class="bigttn">{{rightObj.count.percent}}</div>
                    <div class="bigttn1">车辆活跃率</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_kll.png" alt="" srcset="">
                <div>
                    <div class="bigttn">{{rightObj.gpsValue.num}}</div>
                    <div class="bigttn1">车辆数定位数</div>
                </div>
            </div>
            <div class="bitit">
                <img  src="@/assets/image/home/4.1_icon_qzz.png" alt="" srcset="">
                <div>
                    <div class="bigttn">{{rightObj.gpsValue.percent}}</div>
                    <div class="bigttn1">车辆定位率</div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-box"  
      v-loading="echloadsd1"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(8, 0, 64, 0.7)">
        <div class="map-box1" ref="compreMapks1"  id="compreMapks1">
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
<!-- v-show="tlstation[3].isxz" -->
          <div class="seting-box seting-box1" >
             <div class="table-box">
              <div  class="table-iteanm" v-for="(iteam,n) in tlstation1" :key="n" >
                <img @click="toShow1(iteam,n)" v-if="iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxktrue.png" />
                <img @click="toShow1(iteam,n)" v-if="!iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxkfalse.png" />
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
            <div class="fonq2">{{righavg.avgSpeed}}km/h</div>
          </div>
          <div class="itlist">
            <div class="fonq1">公交平均畅行指数</div>
            <div class="fonq2">{{righavg.avgIndex}}</div>
          </div>
          <div class="itlist">
            <div class="fonq1">公交平均运行稳定性</div>
            <div class="fonq2">{{righavg.exchange}}</div>
          </div>
          <div class="itlist">
            <div class="fonq1">平均运行准点率</div>
            <div class="fonq2">{{righavg.rightOnTime}}%</div>
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
                <div style="color:#4578FF">{{stadata.stations}}个</div>
              </div>
              <div class="echleng1" style="margin-top:1.5vh">
                <div style="display:flex;align-items: center;">
                   <div class="rounbox rounbox1"></div>
                    无线路经过：

                </div>
                <div style="color:#F5256A">{{stadata.stationsInRun-stadata.stations}}个</div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="erach-box" id="echstation"  
      v-loading="echloadsd"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"></div>
  </div>
</template>

<script>
import MapMixin from '../networkExcellent/networkMap';
 import screenfull from "screenfull";
export default {
  mixins: [MapMixin],
    data(){
      return {
        echloadsd:true,
        righavg:{},
        echloadsd1:false,
        myChart3:null,
        stadata:{},
        myChart:null,
        myChart1:null,
        rightObj:{
          count:{},
          gpsValue:{},
          runningValue:{},
          onLineValue:{},
          runningValue:{}
        },
        value1:[new Date().getTime() - 3600 * 1000 * 24 * 30,new Date()],
        carSearch:{
          leftlon:null,
          rightlon:null,
          leftlat:null,
          rightlat:null,
          zoom:0,
        },

        nowName:"车辆实时运行",
        listMsg:[],//客流分布规律的接口
        
        jzeaData:[],//车辆运行街镇的的车辆实时运行
        buslineData:[],
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
              name:'站点客流分布规律',
              isxz:false,
              num:30,
            },
            {
              name:'运行分析',
              isxz:false,
              num:30,
            }
        ],
        tlstation1:[
          {
              name:'区域',
              isxz:true,
            },
            {
              name:'主干道',
              isxz:false,
            },
            {
              name:'公交线路',
              isxz:false,
            }
        ],
      }
    },
    created(){
        this.getechdata()
        this.getroad()
        this.getcentre()
    },
    mounted() {
      this.M_initMap('compreMapks1')
      this.M_setZoomAndCenter([121.473658,31.230378],12)
       this.M_map.on('moveend',(e)=>{
        this.carSearch.leftlon=e.target.getBounds().southWest.lng
        this.carSearch.rightlon=e.target.getBounds().northEast.lng
        this.carSearch.leftlat=e.target.getBounds().northEast.lat
        this.carSearch.rightlat=e.target.getBounds().southWest.lat
        this.carSearch.zoom=Math.round(e.target.getZoom())
        if(this.tlstation[1].isxz==true){
          if(this.carSearch.zoom>13){
            this.overlayGroups2.show()
          }else{
            this.overlayGroups2.hide()
          }
          this.getData()
        }
        if(this.tlstation[0].isxz==true){
          if(this.carSearch.zoom>13){
            this.overlayGroups2.show()
          }else{
            this.overlayGroups2.hide()
          }
          this.getData1()
        }
        
        
      })
      // this.initSwipertable()
      // this.trafficLayer.setMap(this.M_map);
    },
    methods: {
      
      getSSyx(){
        //街镇的
       
        //主干道
        this.$fetchGet("gps/realBusRoad").then(res => {
         
        })
        //线路车况
        this.$fetchGet("gps/realBusRoute").then(res => {
         
        })
      },
      //客流分布规律
      getstion(){
          this.echloadsd1=true
        this.$fetchGet("passenger/all",{
          type:1,
          st:this.$moment(this.value1[0]).format("YYYY-MM"),
          et:this.$moment(this.value1[1]).format("YYYY-MM"),
        }).then(res => {
           for(let key  in res.result){
              this.listMsg=this.listMsg.concat(res.result[key])
            }
            this.M_addPoint1(this.listMsg,2)
            this.pointEvent1()
  
           setTimeout(()=>{
            this.echloadsd1=false
            },2000)
        })

      },

      pointEvent1(){
        this.M_addGroupEvent((str)=>{
          console.log(str)
              let content=`
              <div class="myinfobox2">
                <div class="line-lsi">
                  <div class="infoimg"></div>
                  <div class="tithear">车辆编号:${str.messagerecord}</div>
                
                </div>
                <div class="echarebox" id="echarebox"></div>
              </div>
                
              `
              this.M_InfoWindow.setAnchor('bottom-center')
              this.M_openInfoWin(str.lnglat,content)
               this.$fetchGet("passenger/stationDetail",{
                  stationName:'浦东南路上南路',
                  direction:0,
                  st:this.$moment(this.value1[0]).format("YYYY-MM"),
                  et:this.$moment(this.value1[1]).format("YYYY-MM"),
                }).then(res => {

                  // for(let key  in res.result){
                  //   this.listMsg=this.listMsg.concat(res.result[key])
                  // }

                  this.initechart3(res.result)


                  
                })
              

          
        })

      },
      initechart3(data){
        for(let key  in res.result){
          this.listMsg=this.listMsg.concat(res.result[key])
        }
        this.myChart3 = this.$echarts.init(document.getElementById('echarebox'));
        this.myChart3.setOption({
            tooltip: {
               backgroundColor:'#144A8C',
              borderWidth:0,
              textStyle:{
                color:'#D9EFFF',
              }
            },
            title:{
              text:"客流量",
              textStyle:{
                color:'#DAE4FF',
                fontWeight:'normal',
                fontSize:16,
                
              },
              top:10,
              left:'center',
            },
            legend:{
              show:true,
              bottom:10,
              textStyle:{
                color:'#DAE4FF'
              },
              itemStyle:{
                borderWidth:0
              }
            },
            color:['#8C2ECA', '#D35F1A', '#5AB91B'],
            grid: {
                left: '1%',
                right: '2%',
                bottom: '16%',
                top:50,
                containLabel: true
            },
            xAxis: {
                data:[1,1,1,1,1,1,1],
                name: '',
                nameTextStyle:{
                  color:'#DAE4FF'
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                      color:'#008E9B',
                      type:'dashed'
                    }
                },
                 axisLabel : {
                   interval:0,
                   rotate:0 ,
                  formatter: '{value}',
                  textStyle: {
                      color: '#ffffff',
                      fontSize:16
                  }
                },
                axisLine:{
                  onZero: true,
                  lineStyle:{
                    color:'#00FFFF',
                    type:'dashed'
                  }
                },
            },
            yAxis: {
              splitLine:{
                  show:true,
                  lineStyle:{
                      color:'#008E9B',
                      type:'dashed'
                    }
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
                    name: '线路一',
                    type: 'line',
                    stack: '总量',
                    symbolSize:6,
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '线路二',
                    type: 'line',
                    stack: '总量',
                    symbolSize:6,
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '线路三',
                    type: 'line',
                    stack: '总量',
                    symbolSize:6,
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
            ]

        })

    },
    toShow1(row,n){
      this.tlstation1[n].isxz=!this.tlstation1[n].isxz

      switch (row.name) {
            case '区域' :
              if(row.isxz){
                this.realTownGroups.show()
              }else{
                this.realTownGroups.hide()
              }
            
            case '主干道' :
           
            case '公交线路' :

              if(row.isxz){
                this.realbusGroups.show()
              }else{
                this.realbusGroups.hide()
              }


            break;
            

            default :
                
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
            case '车辆实时运行' :
              this.M_setZoomAndCenter([121.473658,31.230378],13)
                this.realTownGroups.hide()
                this.realbusGroups.hide()
                break;
            case '站点现状' :
              this.M_setZoomAndCenter([121.510737,31.230525],12)
              this.realTownGroups.hide()
              this.realbusGroups.hide()
                break;
            case '站点客流分布规律' :


                if (this.M_pointGroup) {
                  this.M_pointGroup.clearOverlays()
                }
                this.M_closeInfoWin()
                if (this.overlayGroups1) {
                  this.overlayGroups1.clearOverlays()
                }

                this.realTownGroups.hide()
              this.realbusGroups.hide()

              if(this.overlayGroupsgl.getOverlays().length>0){
                  this.overlayGroupsgl.show()
              }else{
                this.getstion()
              }
                break;
            case '运行分析' :

                    if (this.M_pointGroup) {
                      this.M_pointGroup.clearOverlays()
                    }
                    this.M_closeInfoWin()
                    if (this.overlayGroups1) {
                      this.overlayGroups1.clearOverlays()
                    }
                              
                  if(this.realbusGroups.getOverlays().length>0){
                      this.realTownGroups.show()
                      // this.realbusGroups.show()
                  }else{
                    //分区域
                    this.getJzmag()
                    //公交线路
                    // this.getBusLine()
                  }
                break;
            default :
                
        }
      }

    },
      getcentre(){
        this.$fetchGet("gps/centre").then(res => {
          this.rightObj=res.result
        })

        this.$fetchGet("gps/stationMessage").then(res => {
          this.stadata=res.result
          let noli=this.stadata.stationsInRun-this.stadata.stations
          this.initechart1(this.stadata.stationsInRun,this.stadata.stations,noli)
        })

        
        this.$fetchGet("gps/realAverageBusRoute").then(res => {
          this.righavg=res.result
        })
        
      },
      //车辆实时运行
      getData1(){
      this.$fetchGet("gps/list",this.carSearch).then(res => {
        if(res.result&&res.result.length>0){
           if(this.carSearch.zoom>11&&this.carSearch.zoom<16){
              this.M_setAreasPoint(res.result)
              this.pointEvent()
            }
            if(this.carSearch.zoom>15){
              this.M_addPoint(res.result)
              this.pointEvent()
            }

        }
      })
    },
      //站点现状
      getData(){
      this.$fetchGet("gps/station",this.carSearch).then(res => {
        if(res.result&&res.result.length>0){
          
          if(this.carSearch.zoom>11&&this.carSearch.zoom<17){
            res.result.forEach(iteam=>{
              iteam.centre=iteam.centre.split(',')
            })
            console.log(res.result)
            this.M_setAreasPoint(res.result)
            this.pointEvent()
          }
          if(this.carSearch.zoom>16){
            this.M_addPoint(res.result)
            this.pointEvent()
          }

        }
      })
    },

     pointEvent(){
      this.M_addGroupEvent((str,type)=>{
        
          if(type==2){
            let content=`
            <div class="myinfobox1">
              <div class="line-lsi">
                <div class="tithear">车辆编号:</div>
                <div style="flex:1;text-align:right">${str.code||''}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">车牌号:</div>
                <div style="flex:1;text-align:right">${str.plateNum||''}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">站点名称:</div>
                <div style="flex:1;text-align:right">${str.name||str.stationName||''}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">线路名称:</div>
                <div style="flex:1;text-align:right">${str.route_name||str.routeName}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">开往方向:</div>
                <div style="flex:1;text-align:right">${str.direction||str.routeDirection}</div>
              </div>
               <div class="line-lsi">
                <div class="tithear">更新时间:</div>
                <div style="flex:1;text-align:right">${this.$moment(str.updateTime).format("YYYY-MM-DD HH:mm:ss")}</div>
              </div>
              
            </div>
              
            `
            this.M_InfoWindow.setAnchor('bottom-center')
            this.M_openInfoWin([str.lng,str.lat],content)

          }else{
            this.M_setZoomAndCenter(str.centre,17)
            this.getData()
          }
        
      })

    },
      //获取主干道的信息
      getroad(){
        

        // this.$fetchGet("main-road/list").then(res => {

         
        // })

        this.$fetchGet("gps/realBusRoad").then(res => {
         
        })

      },
      getBusLine(){
        this.echloadsd1=true
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
          setTimeout(()=>{
          this.echloadsd1=false
          },3000)
          

           
          
         
        })



      


      },
      //街镇信息
      getJzmag(){
        this.$fetchGet("gps/realBusRegion").then(res => {
          this.$fetchGet("passenger/region").then(resall => {
             res.result.forEach(iteam=>{
              resall.result.forEach(itam=>{
                if(iteam.regionName==itam.regionName){
                  iteam.centerLatitude=Number(itam.centerLatitude)
                  iteam.centerLongitude=itam.centerLongitude
                  iteam.polygonGeom=itam.polygonGeom
                }
              })
            })

            this.jzeaData=res.result
            console.log(this.jzeaData)
            this.M_createPolygon(this.jzeaData)
         
          })
         
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
          this.echloadsd=false
      },
      initechart1(stationsInRun,yd,ad){
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
                    text: stationsInRun,
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
                        value: (yd/stationsInRun)*75,
                        name: '1'
                      },
                      {
                        value: (ad/stationsInRun)*75,
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
.realNetwork{
.regionMark{
  width:120px;
  height: 120px;
  // background-image: radial-gradient(circle, rgb(49, 144, 228) 0%, rgb(41, 122, 204) 30%, rgb(29, 84, 166) 70%);
  border-radius:50%;
  // background: url("~@/assets/image/reginmark.png");
  // background-size: 100% 100%;
  background-size: contain;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.myinfobox1{
    width: vw(316);
    height:vw(308);
    background: url("~@/assets/image/tk_bj1.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: vh(34) vw(26);
    font-size: vw(16);
    padding-top: vh(50);
    display: flex;
    flex-direction: column;
    .line-lsi{
      display: flex;
      justify-content: flex-start;
      width: 100%;
      flex: 1;
      .tithear{
        width: vw(80);
        height:vh(20);
        display: inline-block;
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


 .amap-info-window{
      background: #fff;
      border-radius: 3px;
      padding: 3px 7px;
      box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
      position: relative;
      color:black;
      white-space: nowrap
  }
  .amap-info-sharp{
      position: absolute;
      top: 21px;
      bottom: 0;
      left: 50%;
      margin-left: -12px;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-top: 12px solid #fff;
  }



  .myinfobox2{
    width:vw(728);
    height:vh(422);
    background: url("~@/assets/image/tk_bj2.png");
    background-size: 100% 100%;
    // border:1px solid #00FFFF;
    // background:rgba(0, 255, 255, 0.1);
    // box-shadow: 0px 0px vh(10) #00FFFF inset !important;
    box-sizing: border-box;
    padding: vh(34) vw(26);
    font-size: vw(16);
    padding-top: vh(24);
    display: flex;
    flex-direction: column;
    .line-lsi{
      display: flex;
      justify-content: flex-start;
      width: 100%;
      height:vh(40);
      color:#00FFFF;
      align-items: center;
      font-size:vw(22);
      padding-top: vh(6);
      .infoimg{
      width: vw(48);
      height: vw(48);
      background: url("~@/assets/image/gf_icon.png");
      background-size: 100% 100%;
    }
      
    }
    .echarebox{
      flex:1;
    }
   
  }

}


</style>
<style lang="scss" scoped>
.realNetwork{

  width:100%;
  height: 100%;
  background: url("~@/assets/image/zhbj.png");
  background-size: 100% 100%;
  display: flex;
  box-sizing: border-box;
  padding:vh(12) vw(16);
  flex-direction: column;
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
        .seting-box1{
          position: absolute;
          left: vw(200);
          bottom: vw(14);
          z-index:10;
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
