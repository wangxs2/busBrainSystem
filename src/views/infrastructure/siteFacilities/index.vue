<template>
  <div class="infrastructure" id="infrastruc">
    <div @click="setclick" class="btn-set">数据列表</div>

    <div class="seting-box">
      <div class="settit">显示设置</div>
      <div class="table-box">
        <div class="table-iteanm" v-for="(iteam,n) in tlstation" :key="n">
          <img
            @click="toShow(iteam,n)"
            v-show="iteam.isxz"
            style="cursor:pointer"
            width="18"
            height="18"
            src="@/assets/image/fxktrue.png"
          />
          <img
            @click="toShow(iteam,n)"
            v-show="!iteam.isxz"
            style="cursor:pointer"
            width="18"
            height="18"
            src="@/assets/image/fxkfalse.png"
          />
          <div class="natit">{{iteam.name}}</div>
        </div>
      </div>
    </div>


    <!-- 停保场枢纽站的清单列表 -->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="80%"
      header-row-class-name="header-tab"
      @close="closedia()"
      custom-class="disadioa">
      <!-- 停保场和枢纽站的列表 -->
      <div class="mybix" v-show="nowName=='停保场'||nowName=='枢纽站'">
        <div class="ecgbox">
          <div class="ecgbox-it" id="echarebox1"></div>
          <div class="ecgbox-it" id="echarebox2"></div>
          <div class="ecgbox-it" id="echarebox3"></div>
        </div>
        <div class="tabox">
          <el-table
            :data="tableData"
            border
            :max-height="500"
            style="width: 100%">
            <el-table-column   type="index" label="序号" align="center"  :index="1"> </el-table-column>
            <el-table-column prop="town" label="街镇" ></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="axis" label="枢纽"></el-table-column>
            <el-table-column prop="address" label="位置"> </el-table-column>
            <el-table-column prop="route" label="线路"></el-table-column>
            <el-table-column prop="" label="始发线路(条)"></el-table-column>
            <el-table-column prop="manageEntity" label="现场管理主体"> </el-table-column>
            <el-table-column prop="responsibility" label="责任所属"> </el-table-column>
            <el-table-column prop="areaCovered" label="占地面积" ></el-table-column>
            <el-table-column prop="areaManage" label="管理用房面积"></el-table-column>
            <el-table-column prop="other" label="备注"> </el-table-column>
            <el-table-column prop="" label="产权/使用权"> </el-table-column>
            <el-table-column prop="" label="启用日期"></el-table-column>
          </el-table>
        </div>
        <div class="page-all">
           <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="page"
            :total="total">
          </el-pagination>
        </div>

      </div>
      <!-- 停保场和枢纽站的列表 -->
      <!--  首末站数据列表-->
      <div class="mybix" v-show="nowName=='首末站'">
       
        <div class="tabox">
          <el-table
            :data="tableData"
            border
            :max-height="540"
            style="width: 100%">
            <el-table-column   type="index" label="序号" align="center"  :index="1"> </el-table-column>
            <el-table-column prop="pdbcode" label="站点编号" ></el-table-column>
            <el-table-column prop="stationName" label="站点名称"></el-table-column>
            <el-table-column prop="stationAddress" label="站点地址"> </el-table-column>
            <el-table-column prop="lineList" label="经过线路"> </el-table-column>
           
          </el-table>
        </div>
        <div class="page-all">
           <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="page"
            :total="total">
          </el-pagination>
        </div>

      </div>

      <!--  首末站数据列表-->
      <!--  中途站数据列表-->
      <div class="mybix" v-show="nowName=='中途站'">
         <div class="ecgbox">
          <div class="ecgbox-it" id="echarebox4"></div>
          <div class="ecgbox-it" id="echarebox5"></div>
          <div class="ecgbox-it" id="echarebox6"></div>
        </div>
       
        <div class="tabox">
          <el-table
            :data="tableData"
            border
            :max-height="500"
            style="width: 100%">
            <el-table-column   type="index" label="序号" align="center"  :index="1"> </el-table-column>
            <el-table-column prop="quyu" label="区域" ></el-table-column>
            <el-table-column prop="area" label="环域"></el-table-column>
            <el-table-column prop="roadName" label="路名"> </el-table-column>
            <el-table-column prop="stationName" label="站点名称"> </el-table-column>
            <el-table-column prop="stationAddress" label="站点地址"></el-table-column>
            <el-table-column prop="lineList" label="经过线路"></el-table-column>
            <el-table-column prop="stationType" label="设备类型"> </el-table-column>
            <el-table-column prop="pdbcode" label="站点编号"> </el-table-column>
           
          </el-table>
        </div>
        <div class="page-all">
           <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="page"
            :total="total">
          </el-pagination>
        </div>

      </div>

      <!--  中途站数据列表-->
      
    </el-dialog>
    <!-- 停保场枢纽站的清单列表 -->
 
  </div>
</template>

<script>
// import gaosudata from '../road.json'
import "../ecstyle.js";//下载自定义主题
export default {
  name: '',
  data(){
    return{
      total:null,
      totaltjz:0,
      nowName: "停保场",
       tableData: [],
      tlstation: [
        {
          name: "停保场",
          isxz: true,
          num: 0.6
        },
        {
          name: "枢纽站",
          isxz: false,
          num: 0.5
        },
        {
          name: "首末站",
          isxz: false,
          num: 30
        },
        {
          name: "中途站",
          isxz: false,
          num: 30
        }
      ],
      snzData:[],
      czData:[],
      testdata:[],
      tjzData:[],
      smzData:[],
      dialogVisible:false,
      testdata1:[],
      MyMapper:null,
      myChart1:null,
      myChart2:null,
      myChart3:null,
       myChart4:null,
      myChart5:null,
      myChart6:null,
      layerzd:null,
      allline:[],
      lcalzd:null,
      smap:null,
      page:1,
      pageSize:10,
      M_InfoWindow:null,
    }

  },
  mounted(){
    this.initMap()
    //  this.$nextTick(() => {
    //     this.initechart()
    //   });

      window.addEventListener('resize', () => {
        this.myChart1.resize();
        this.myChart2.resize();
        this.myChart3.resize();
     })
    
  },
  created() {
    // this.testdata=gaosudata
    this.getTjstation()
    this.getBasesta()
    this.getStation()
    this.gettjmap()
    this.gettjmap1()
    // gaosudata.forEach(itam=>{

    //   AMap.convertFrom([itam.POINT_X,itam.POINT_Y], 'gps',  (status, result)=> {
    //           if (result.info === 'ok') {
    //               itam.path=result.locations
    //           }
    //       });
      
    // })
    // this.testdata=gaosudata
    // console.log(this.testdata)
    // let testdata1=this.testdata.shift()
    // this.testdata.forEach((iteam,index)=>{

      // if(iteam.POINT_X){
      //   this.allline.push([iteam.POINT_X,iteam.POINT_Y])
      // }

      // if(iteam.NAME==testdata1[index].NAME)
      
    // })
    //  console.log(this.allline)


    // const [arr1, arr2, arr3] = [...map]
       

       
    this.$store.commit('SET_LOADING',false)
  },
  methods:{
    handleClose(){

    },
    setclick(){
      this.dialogVisible=true
      // this.$nextTick(() => {
      //     this.initechart()
      //     this.initechart1()
      // });

      switch (this.nowName) {
          case "停保场":
            this.getBasesta1()
            this.gettjmap()
            break;
          case "枢纽站":
            this.getBasesta1()
            this.gettjmap()
            
            break;
          case "首末站":
            this.getStation1()
            break;
          case "中途站":
           this.getTjstation1()
            this.gettjmap1()
            break;
          default:
      }

    },
   
    initMap(){
       this.MyMapper=new AMap.Map('infrastruc', {
        zoom: 10, // 地图级别
          // viewMode: '3D',
          center:[121.473667,31.230525],
        // center: this.mapCenter, // 中心点
        // resizeEnable: true, //监控地图容器尺寸变化
        mapStyle: 'amap://styles/d67717253a691e523956e9482ca38f1e',
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
      })
       this.lcalzd = new Loca.Container({
          map: this.MyMapper,
      });
      this.M_InfoWindow = new AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        content: '',
        anchor: 'top-right',
        offset: new AMap.Pixel(-6, -6)
      })

       this.MyMapper.on('click', (e) => {
        this.M_InfoWindow.close()
      });
      //  this.getlindata()
        // this.setline()
    },
    closedia(){
      this.page=1
    },
    handleCurrentChange(val){
      this.page=val
       switch (this.nowName) {
          case "停保场":
            this.getBasesta1()
            break;
          case "枢纽站":
            this.getBasesta1()
            break;
          case "首末站":

            this.getStation1()
            break;
          case "中途站":
            this.getTjstation1()
            break;
          default:
      }

    },
    toShow(row, n) {
      this.M_InfoWindow.close()
      this.nowName = row.name;
      if (row.isxz) {
        return;
      } else {
        this.tlstation.forEach(iteam => {
          if (iteam.name == this.nowName) {
            iteam.isxz = true;
          }
          if (iteam.name !== this.nowName) {
            iteam.isxz = false;
          }
        });
        switch (row.name) {
          case "停保场":
            this.maplocalMain(this.czData)
            
            break;
          case "枢纽站":
            this.maplocalMain(this.snzData)
            break;
          case "首末站":
            
            this.maplocalMain(this.smzData)
           
            break;
          case "中途站":
            this.maplocalMain(this.tjzData)
            break;
          default:
        }
      }
    },
    getlindata(){
      

          this.smap = new Map()

      this.testdata.forEach(item => {
          if (this.smap.has(item.ORIG_FID)) {
              this.smap.set(item.ORIG_FID, this.smap.get(item.ORIG_FID).concat(item))
          } else {
              this.smap.set(item.ORIG_FID, [item]) 
          }
      })

      this.smap.forEach((iteam,inna)=>{
        let arr=[]
        iteam.forEach(iam=>{
          arr.push([iam.POINT_X,iam.POINT_Y])
        })
         this.testdata1.push(arr)
      })

      // console.log(this.testdata1)
      // let arrgd=[]
      // this.testdata1.slice(100,200).forEach(oyt=>{
        //  AMap.convertFrom(oyt, 'gps',  (status, result)=> {
          
        //       if (result.info === 'ok') {
        //           // console.log(result.locations)
        //          oyt=result.locations
        //          arrgd.push(oyt)
                 
        //          setTimeout(() => {
        //            console.log(arrgd)
        //            this.initLines(arrgd)
        //         }, 4000);
        //       }
        //   });
          // console.log(arrgd)
         

      // })
         
  
      this.initLines(this.testdata1)

    },
    //首末站
    getStation(){
      this.$fetchGet("/config-final-station/final",
        {
          page:1,
          pageSize:6000
        }).then(res => {
          this.smzData=res.result.list
      })

      

    },
    //首末站
    getStation1(){
      this.$fetchGet("/config-final-station/final",
        {
        page:this.page,
          pageSize:this.pageSize
        }).then(res => {
           this.tableData=res.result.list
          this.total=res.result.total
      })

      

    },
    //中途站
    getTjstation(){
      this.$fetchGet("/config-way-station/way",
        {
          page:1,
          pageSize:6000
        }).then(res => {
        if(res.result){
          this.tjzData=res.result.list
        }
      })
    },
    getTjstation1(){
      this.$fetchGet("/config-way-station/way",
        {
          page:this.page,
          pageSize:this.pageSize
        }).then(res => {
        if(res.result){
          this.tableData=res.result.list
          this.total=res.result.total
        }
      })
    },
    //停保场和枢纽站
    getBasesta(){
        this.$fetchGet("base-station/list",
        {
          page:1,
          pageSize:1000
        }).then(res =>{

          if(res.result){
            res.result.list.forEach(iteam=>{
              if(iteam.axis==1){
                this.snzData.push(iteam)
                 
              }else{
                this.czData.push(iteam)
              }
            })
            this.maplocalMain(this.czData)
          }
          


        })

    },
    getBasesta1(){
      this.$fetchGet("base-station/list",
        {
          page:this.page,
          pageSize:this.pageSize
        }).then(res =>{
          this.tableData=res.result.list
          this.total=res.result.total
        })
    },
    gettjmap(){
      this.$fetchGet("base-station/map").then(res =>{
        let arr1=[],arr2=[],arr3=[]
        for (let key in res.result['街镇']) {
            
            let obj={
              name:key,
              value:res.result['街镇'][key]
            }
            arr1.push(obj)
        }
         for (let key in res.result['管理主体']) {
            
            let obj={
              name:key,
              value:res.result['管理主体'][key]
            }
            arr2.push(obj)
        }
         for (let key in res.result['责任所属']) {
            
            let obj={
              name:key,
              value:res.result['责任所属'][key]
            }
            arr3.push(obj)
        }

        this.initechart(arr1,arr2,arr3)


        


      })

    },
    gettjmap1(){
      this.$fetchGet("config-way-station/map").then(res =>{
         let arr1=[],arr2=[],arr3=[]
        for (let key in res.result['区域']) {
            
            let obj={
              name:key,
              value:res.result['区域'][key]
            }
            arr1.push(obj)
        }
         for (let key in res.result['环区']) {
            
            let obj={
              name:key,
              value:res.result['环区'][key]
            }
            arr2.push(obj)
        }
         for (let key in res.result['设备类型']) {
            
            let obj={
              name:key,
              value:res.result['设备类型'][key]
            }
            arr3.push(obj)
        }

        this.initechart1(arr1,arr2,arr3)

      })

    },
    zhgps(arr){

       AMap.convertFrom(arr, 'gps',  (status, result)=> {
              if (result.info === 'ok') {
                  // console.log(result.locations)
                  return result.locations
              }
          });
    },
    initLines(datapoint){
      let _events = datapoint;
      var list = _events.map(e => {
         
          return {
              "type": "Feature",
              "properties": {
                // type:e.name
              },
              "geometry": {
                  "type": "LineString",
                  "coordinates": e
              }
          }
      })

      var data = {
          "type": "FeatureCollection",
          "features": list,
      };

      var geo = new Loca.GeoJSONSource({
        data: data,
      });

      var ll = new Loca.LineLayer({
          loca:this.lcalzd
      });
      // var colors = ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'].reverse();
      var colors={
        '1-2':"#34b000",
        '2-4':"#FECB00",
        '4-6':"#FF2A2A",
        '6+':"#B10400",
      }
      ll.setSource(geo, {
          color: "#34b000",
          lineWidth: 2,
          dashArray: [10, 0, 10, 0],
      });
      console.log(ll)
    },
    initechart(arr1,arr2,arr3){
      this.myChart1 = this.$echarts.init(document.getElementById("echarebox1"),'customed');
      this.myChart1.setOption({
          title: {
            text: '街镇统计',
            top: '0',
            left: '20%',
            textStyle: {
              color: "#D9EFFF",
              fontWeight:'normal',
              fontSize:'12'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
             type: 'scroll',
            orient: 'vertical',
            left: 'left',
             pageIconColor:'#ffffff',
             pageTextStyle:{
               color:'#ffffff'
             },
               pageIconSize: [10, 10],
            textStyle: {
              color: "#D9EFFF",
            }
          },
          series: [
            {
              name: '街镇',
              type: 'pie',
              radius: '50%',
              data: arr1,
               label: {
                            color: "rgba(255, 255, 255, 1)"
                          },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
      });
      this.myChart2 = this.$echarts.init(document.getElementById("echarebox2"),'customed');
      this.myChart2.setOption({
          title: {
            text: '现场管理主体统计',
           top: '0',
            left: '20%',
            textStyle: {
              color: "#D9EFFF",
              fontWeight:'normal',
              fontSize:'12'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            left: 'left',
             pageIconColor:'#ffffff',
             pageTextStyle:{
               color:'#ffffff'
             },
               pageIconSize: [10, 10],
            textStyle: {
              color: "#D9EFFF",
            }
          },
          series: [
            {
              name: '现场管理主体',
              type: 'pie',
              radius: '50%',
              data:arr2,
              //  labelLine:{
              //       length:2,
              //        length2:2,
                   
              //     },
               label: {
                            color: "rgba(255, 255, 255, 1)"
                          },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
      });
      this.myChart3 = this.$echarts.init(document.getElementById("echarebox3"),'customed');
      this.myChart3.setOption({
          title: {
            text: '责任所属统计',
          top: '0',
            left: '20%',
            textStyle: {
              color: "#D9EFFF",
              fontWeight:'normal',
              fontSize:'12'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
             type: 'scroll',
            orient: 'vertical',
            left: 'left',
             pageIconColor:'#ffffff',
             pageTextStyle:{
               color:'#ffffff'
             },
               pageIconSize: [10, 10],
            textStyle: {
              color: "#D9EFFF",
            }
          },
          series: [
            {
              name: '责任所属',
              type: 'pie',
              radius: '50%',
              data: arr3,
               labelLine:{
                    // length:0,
                    //  length2:0,
                    // lineStyle:{
                    //   color:'transparent'
                    // }
                  },
               label: {
                            color: "rgba(255, 255, 255, 1)"
                          },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
      });

    },
    initechart1(arr1,arr2,arr3){
      this.myChart4 = this.$echarts.init(document.getElementById("echarebox4"));
      this.myChart4.setOption({
          title: {
            text: '区域统计',
            // subtext: 'Fake Data',
            bottom: '0',
            left: 'center',
            textStyle: {
              color: "#D9EFFF",
              fontWeight:'normal',
              fontSize:'12'
            }
          },
          color: ['#0263FF', '#F5256A'],
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
              color: "#D9EFFF",
            }
          },
          series: [
            {
              name: '区域',
              type: 'pie',
              radius: '50%',
              data:arr1,
               label: {
                            color: "rgba(255, 255, 255, 1)"
                          },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
      });
      this.myChart5 = this.$echarts.init(document.getElementById("echarebox5"));
      this.myChart5.setOption({
          title: {
            text: '环域统计',
            // subtext: 'Fake Data',
             bottom: '0',
            left: 'center',
            textStyle: {
              color: "#D9EFFF",
              fontWeight:'normal',
              fontSize:'12'
            }
          },
          color: ['#00FFFF', '#4578FF','#00A08A','#2E16B1'],
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
              color: "#D9EFFF",
            }
          },
          series: [
            {
              name: '环域',
              type: 'pie',
              radius: '50%',
              data: arr2,
               label: {
                            color: "rgba(255, 255, 255, 1)"
                          },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
      });
      this.myChart6 = this.$echarts.init(document.getElementById("echarebox6"),'customed');
      this.myChart6.setOption({
          title: {
            text: '设备类型统计',
            // subtext: 'Fake Data',
             bottom: '0',
            left: 'right',
            textStyle: {
              color: "#D9EFFF",
              fontWeight:'normal',
              fontSize:'12'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
             type: 'scroll',
            orient: 'vertical',
           left: 'left',
             pageIconColor:'#ffffff',
             pageTextStyle:{
               color:'#ffffff'
             },
               pageIconSize: [10, 10],
            textStyle: {
              color: "#D9EFFF",
            }
          },
          series: [
            {
              name: '设备类型',
              type: 'pie',
              radius: '50%',
              data:arr3,
               label: {
                            color: "rgba(255, 255, 255, 1)"
                          },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
      });

    },
    maplocalMain(datapoint){
      console.log(datapoint)
       if(this.layerzd){
          this.lcalzd.remove(this.layerzd)
        }
        let iconsa,arrsa;
        if(this.nowName=='停保场'){
          iconsa=require('../../../assets/image/czp.png')
        }else if(this.nowName=='枢纽站'){
          iconsa=require('../../../assets/image/snp.png')
        }else{
          iconsa=require('../../../assets/image/icon_gj1.png')
        }

      let _events = datapoint;
        var list = _events.map(e => {
            let arr =(this.nowName=='停保场'||this.nowName=='枢纽站')?[e.longitude,e.latitude]:[e.lng,e.lat]
            return {
                "type": "Feature",
                "properties": {
                    rawData: e
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": arr
                }
            }
        })
        var data = {
            "type": "FeatureCollection",
            "features": list,
        };
          // 拾取测试
        let geo = new Loca.GeoJSONSource({
            data: data,
        });
        this.layerzd = new Loca.IconLayer({
            zIndex: 10,
            opacity: 1,
        });
        this.layerzd.setSource(geo);
        this.layerzd.setStyle({
            unit: 'px',
            icon:iconsa,
            iconSize: [32,32],
            rotation: 0,
        })
        console.log(this.layerzd)
        this.lcalzd.add(this.layerzd);
        this.MyMapper.on('click', (e) => {
          const feat = this.layerzd.queryFeature(e.pixel.toArray());
          if (feat) {

            let data = feat.properties.rawData;
            console.log(data)
            this.M_openRoad(data)
            // http.fetchGet('indicator/stationDetail',{
            //   code:data.stationName,
            //   direction:data.routeDirection
            // }).then(res=>{
            //   this.setConwidow(res.result)
            
            // })
          }
      });

        // var dat = new Loca.Dat();
        // dat.addLayer(layer);

    },
    M_openRoad(res) {
      let infoWin=''
      switch (this.nowName) {
          case "停保场":
              infoWin = `<div class="info-win">
              <div class="win-triangle"></div>
              <div class="info-box">
                <div class="info-content">
                  <div class="info">
                    <div class="info-name">街镇：${res.town}</div> 
                    <div class="info-name">名称：${res.name}</div>
                    <div class="info-name">地址：${res.address}</div>
                    <div class="info-name">线路：${res.route}</div> 
                    <div class="info-name">现场管理主体：${res.manageEntity}</div> 
                    <div class="info-name">责任所属：${res.responsibility||'--'}</div> 
                    <div class="info-name">占地面积：${res.areaCovered||'--'}</div> 
                    <div class="info-name">管理用房面积：${res.areaManage||'--'}</div> 
                    <div class="info-name">备注：${res.other||'--'}</div> 
                  </div>
                </div>
              </div>
            </div>`

           this.M_openInfoWin([res.longitude, res.latitude], infoWin)
            
            break;
          case "枢纽站":

              infoWin = `<div class="info-win">
              <div class="win-triangle"></div>
              <div class="info-box">
                <div class="info-content">
                  <div class="info">
                    <div class="info-name">站点名称：${res.name}</div> 
                    <div class="info-name">站点编号：${res.pdbcode||'--'}</div>
                    <div class="info-name">站点地址：${res.address}</div>
                    <div class="info-name">经过线路：${res.route}</div> 
                  </div>
                </div>
              </div>
            </div>`

           this.M_openInfoWin([res.longitude, res.latitude], infoWin)
            
            break;
          case "首末站":
            infoWin = `<div class="info-win">
            <div class="win-triangle"></div>
            <div class="info-box">
              <div class="info-content">
                <div class="info">
                  <div class="info-name">站点名称：${res.stationName}</div> 
                   <div class="info-name">站点编号：${res.pdbcode}</div>
                  <div class="info-name">站点地址：${res.stationAddress}</div>
                  <div class="info-name">经过线路：${res.lineList}</div> 
                </div>
              </div>
            </div>
          </div>`

           this.M_openInfoWin([res.lng, res.lat], infoWin)
            break;
          case "中途站":

            infoWin = `<div class="info-win">
            <div class="win-triangle"></div>
            <div class="info-box">
              <div class="info-content">
                <div class="info">
                  <div class="info-name">区域：${res.quyu}</div>
                  <div class="info-name">环域：${res.area}</div>
                  <div class="info-name">路名：${res.roadName}</div>
                  <div class="info-name">站名：${res.stationName}</div> 
                  <div class="info-name">地址：${res.stationAddress}</div>
                  <div class="info-name">经过线路：${res.lineList}</div> 
                  <div class="info-name">设备类型：${res.stationType}</div>
                  <div class="info-name">站点编号：${res.pdbcode}</div>
                </div>
              </div>
            </div>
          </div>`

           this.M_openInfoWin([res.lng, res.lat], infoWin)
          
            break;
          default:
      }
     
     
     

    },
    M_openInfoWin(pos, info) {
      this.M_InfoWindow.setContent(info)
      this.M_InfoWindow.open(this.MyMapper, pos)
    },
    setline(){
       let kyLinedata = new AMap.Polyline({
        path:this.allline,
        strokeColor: "#35A594",
        strokeOpacity: 1,
        strokeWeight: 8,
        zIndex:20,
        strokeStyle: "solid",
      })
      this.MyMapper.add(kyLinedata);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// .infrastructure{
  .disadioa, .el-pager li{
    background:rgba(0,0,0,0.9) !important;
  }
  
  .el-dialog__headerbtn .el-dialog__close{
    color:#ffffff;
    font-size:24px;
  }
  .disadioa{
    // margin:0 auto !important;
    margin-top:vh(100)!important;
    .el-dialog__header{
      padding-top:36px!important;
    }
    .el-dialog__body{
      padding:0!important;
    }
    
  }

  .el-table__header-wrapper th{
    background-color:rgba(12, 38, 104, 0.6)!important;
  }
  .el-pagination button:disabled{
    background:transparent !important;
    color:#ffffff!important;
  }
  .el-pagination .btn-next, .el-pagination .btn-pre{
    background:transparent !important;
    color:#ffffff!important;
  }
  .el-pager li.btn-quicknext, .el-pager li.btn-quickprev{
    color:#ffffff!important;
  }
  .el-pagination .btn-next, .el-pagination .btn-prev{
    background:transparent !important;
    color:#ffffff!important;
  }
  .disadioa{
    .el-table--border, .el-table--group{
      border:1px solid rgba(12, 38, 104, 1) !important;
    }
    .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
      border-right:1px solid rgba(12, 38, 104, 1) !important;
    }
    .el-table--border td{
      border-bottom:1px solid rgba(12, 38, 104, 1) !important;
    }
    .el-table--border::after, .el-table--group::after, .el-table::before{
      background-color:transparent !important;
    }
    .el-table tbody tr:hover>td { 
        background-color:rgba(12, 38, 104, 0.6)!important;
    }
    .el-pagination{
        color:#ffffff!important;
    }
    .mybix{
      width:100%;
      min-height:vh(700);
      border:1px solid rgba(12, 38, 104, 1);
      display:flex;
      flex-direction: column;
      box-sizing:border-box;
      padding:vh(10) vw(12);
      .page-all{
        width:100%;
        // height:vh(50);
        text-align:right;
        box-sizing:border-box;
        padding:vh(10) 0;
      }
      
      .ecgbox{
        width:100%;
        height:vh(200);
        border-bottom:1px solid rgba(12, 38, 104, 1);
        display:flex;
        .ecgbox-it{
          flex:1
        }
      }
      .tabox{
        flex:1;
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
            max-width: vw(280);
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
  

// }
  
</style>

<style scoped lang="scss">
.infrastructure{
  width:100%;
  height: 100%;
  box-sizing: border-box;
  // padding-top: vh(140);
   position: relative;
   .btn-set{
     position: absolute;
      left: vw(24);
      top: vw(124);
      z-index: 10;
      background: rgba(12, 38, 104, 0.6);
      box-shadow: 0px 0px vh(6) #27b6ff inset;
      box-sizing: border-box;
       padding: vh(8) vw(12);
       cursor: pointer;
   }
   .btn-set:active{
     background: rgba(12, 38, 104, 1);
     color: #27b6ff
   }
   .seting-box {
    position: absolute;
    right: vw(24);
    top: vw(114);
    z-index: 10;
    background: rgba(12, 38, 104, 0.6);
    box-shadow: 0px 0px vh(6) #27b6ff inset;
    box-sizing: border-box;
    padding: vh(12) vw(16);
    .settit {
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      font-weight: bold;
    }
    .table-box {
      flex-direction: column;
      display: flex;
      box-sizing: border-box;
      // padding-left:vw(20);
      .table-iteanm {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding-top: vh(20);
        img {
          margin-right: vw(6);
        }
        .natit {
          display: inline-block;
          // width:6.6vw;
        }
      }
    }
  }
}

</style>
