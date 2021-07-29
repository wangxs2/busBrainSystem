<template>
  <div class="flowtionSite" id="flowtionSite">
    <div class="search-box">
      <div style="margin-right:0.8vw">站点名称</div>
      <el-select style="margin-right:1.5vw" clearable  filterable size="small" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.regionName"
          :label="item.regionName"
          :value="item.regionName"
        ></el-option>
      </el-select>



      <div style="margin-left:0.8vw" @click="M_drawPolygon()">开始绘制</div>
      
    </div>
    
  </div>
</template>

<script>
import MapMixin from '../../networkExcellent/networkMap'
let dataLine=require('./round.js')
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
    sitionflow:[
      {
        name:'一点',
        lng:121.52424015017762,
        lat:31.225037918487356,
      },
      {
        name:'一点',
        lng:121.52735434969686,
        lat:31.22355442659475,
      }
    ],
    value1:"",
    point:1,
    isheat:1,
  }
  },
  created(){
    this.getAreaLine()
    
   
  },
  mounted(){
    this.M_initMap('flowtionSite')
    // let path1=this.TestsetData(dataLine.datafg,2)//中环
    // let path2=this.TestsetData(dataLine.datafg1,2)//内
    // let path3=this.TestsetData(dataLine.datafg2,2)//外
    // this.M_addPolygon(path1,path2)
    // this.M_zzploy()
    this.M_addPoint(this.sitionflow)
     this.pointEvent()
  },
  methods:{
    allpoint(){
      if(this.point==1){
        this.point=2
      }else{
        this.point=1
      }
    },
    getData(){
    },
    pointEvent(){
      this.M_addGroupEvent((str,type)=>{
          if(type==2){
            let content=`
            <div class="myinfobox1">
              <div class="line-lsi">
                <div class="infoimg"></div>
                <div class="tithear">车辆编号:${str.name}</div>
               
              </div>
              <div class="echarebox" id="echarebox"></div>
            </div>
              
            `
            this.M_InfoWindow.setAnchor('bottom-center')
            this.M_openInfoWin([str.lng,str.lat],content)
            this.initechart()

          }
        
      })

    },
    initechart(){
        this.myChart = this.$echarts.init(document.getElementById('echarebox'));
        this.myChart.setOption({
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
.flowtionSite{


.myinfobox1{
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
.flowtionSite{
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
   
  }
 
 
}
</style>
