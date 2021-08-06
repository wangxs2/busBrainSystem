<template>
  <div class="roadModel">
    <div class="search-box titbox">
      <div class="titf">道路拥堵系数预测</div>
      <div style="display:flex;align-items: center">
         <div style="margin-right:0.6vw;margin-left:1.6vw;white-space: nowrap">主干道</div>
            <el-select style="width:75%" size="small" filterable @change="getData()"  v-model="roadName" placeholder="请选择">
                <el-option
                v-for="(item,n) in roadNameData"
                :key="n"
                :label="item.roadName"
                :value="item.roadName">
                </el-option>
            </el-select>

      </div>
    </div>
    <div class="echartroad" id="echartroad1">

    </div>
    <div class="titbox titbox1">
    <div class="titf">道路车速预测</div>
    <div>

    </div>
  </div>
  <div class="echartroad" id="echartroad2">

  </div>
 
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return{
      myChart:null,
      myChart1:null,
      roadName:"",
      roadNameData:[]
    }
  },
   created() {
      
      this.getList()
      
  },
  mounted(){
      window.onresize = ()=> {
        this.myChart.resize()
        this.myChart1.resize()
      }
     
  },
  methods:{
    getList(){
      this.$fetchGet("main-road/list").then(res => {
        this.roadNameData=res.result
        this.roadName=res.result[0].roadName
        this.getData()
      })

    },
    getData(){
      this.$store.commit('SET_LOADING',true)
      this.$fetchGet("curve/sklearn",{
        roadName:this.roadName
      }).then(res => {
        let arr=[],arr1=[],arr2=[]
        res.result.forEach(iteam=>{
          arr.push(iteam.datatime)
          arr1.push(iteam.congestIndex)
          arr2.push(iteam.speed)
        })
        this.initechart(arr,arr1)
        this.initechart1(arr,arr2)
      })


    },
    getDataw(){ 
     this.$fetchGet("main-road/list").then(res => {

     })

    },
    initechart(data,data1){
        this.myChart = this.$echarts.init(document.getElementById('echartroad1'));
        this.myChart.setOption({
            tooltip: {
              show:true,
              backgroundColor:'#144A8C',
              borderWidth:0,
              textStyle:{
                color:'#D9EFFF',
              }
           
            },
            title:{
              text:"",
              textStyle:{
                color:'#DAE4FF',
                fontWeight:'normal',
                fontSize:16,
                
              },
              top:26,
              left:10,
            },
            color:['#4578FF'],
            grid: {
                left: '1%',
                right: '1%',
                bottom: '3%',
                top:'10%',
                containLabel: true
            },
            xAxis: {
                data:data,
                name: '',
                nameTextStyle:{
                  color:'#DAE4FF'
                },
                splitLine:{
                  show:false,
                  lineStyle:{
                      color:'#194F95',
                      type:'dashed'
                    }
                },
                 axisLabel : {
                   interval:15,
                  formatter: '{value}',
                  textStyle: {
                      color: '#DAE4FF',
                      fontSize:16
                  }
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                  onZero: true,
                  lineStyle:{
                    color:'#194F95',
                  }
                },
                splitArea:{
                    show:false,
                    interval:30,
                    areaStyle:{
                        color:['rgba(12, 38, 104,0)','rgba(12, 38, 104,0.8)']
                    }
                },
            },
            yAxis: {
              splitLine:{
                  show:true,
                  lineStyle:{
                      color:'#4578FF',
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
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false,
                  onZero: true,
                  lineStyle:{
                    color:'#194F95',
                  }
                },
            },
            series: [
                {
                  name: '道路拥堵系数',
                  type: 'bar',
                  barWidth:4,
                  stack: 'one',
                  data: data1,
                
              },
               {
                  name: '',
                  type: 'line',
                  data: data1,
                  markPoint: {
                    itemStyle: {
                      color: '#FECB00',
                    },
                    label: {
                      color: '#000',
                    },
                    symbolSize: 40,
                    data: [
                      { type: 'max', name: '最大值' },
                      { type: 'min', name: '最小值' },
                    ],
                  },
              }
            ]

        },true)
        this.$store.commit('SET_LOADING',false)

    },
    initechart1(data,data1){
        this.myChart1 = this.$echarts.init(document.getElementById('echartroad2'));
        this.myChart1.setOption({
            tooltip: {
               show:true,
              backgroundColor:'#144A8C',
              borderWidth:0,
              textStyle:{
                color:'#D9EFFF',
              }
           
            },
            title:{
              text:"车速(km/h)",
              textStyle:{
                color:'#DAE4FF',
                fontWeight:'normal',
                fontSize:16,
                
              },
              top:6,
              left:10,
            },
           
            grid: {
                left: '1%',
                right: '1%',
                bottom: '3%',
                top:'13%',
                containLabel: true
            },
            color:['#4578FF'],
            xAxis: {
                data:data,
                name: '',
                nameTextStyle:{
                  color:'#DAE4FF'
                },
                splitLine:{
                  show:false,
                  lineStyle:{
                      color:'#194F95',
                    }
                },
                 axisLabel : {
                   interval:15,
                  formatter: '{value}',
                  textStyle: {
                      color: '#DAE4FF',
                      fontSize:16
                  }
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                  onZero: true,
                  lineStyle:{
                    color:'#194F95',
                  }
                },
                splitArea:{
                    show:false,
                    interval:30,
                    areaStyle:{
                        color:['rgba(12, 38, 104,0)','rgba(12, 38, 104,0.8)']
                    }
                },
            },
            yAxis: {
              splitLine:{
                  show:true,
                  lineStyle:{
                      color:'#4578FF',
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
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false,
                  onZero: true,
                  lineStyle:{
                    color:'#194F95',
                  }
                },
            },
            series: [
                {
                  name: '道路车速',
                  type: 'bar',
                  barWidth:4,
                  stack: 'one',
                
                  data: data1
              },
               {
                  name: '',
                  type: 'line',
                  data: data1,
                  markPoint: {
                    itemStyle: {
                      color: '#FECB00',
                    },
                    label: {
                      color: '#000',
                    },
                    symbolSize: 40,
                    data: [
                      { type: 'max', name: '最大值' },
                      { type: 'min', name: '最小值' },
                    ],
                  },
              }
            ]

        },true)

    },
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.roadModel{
   width:100%;
    height: 100%;
    padding:0 vw(20);
    padding-top: vh(140);
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
  .titbox{
    width: 100%;
    height: vh(56);
    background: rgba(12, 38, 104,0.8);
    border-radius: 2px;
    box-sizing: border-box;
    display:flex;
    justify-content:space-between;
    align-items: center;
    padding:0 vw(20);
    margin-top:vh(10);
    .titf{
      font-size: vw(20);
      font-weight: bold;

    }
  }
  .titbox1{
    margin-top:vh(30);
  }
  .echartroad{
    width: 100%;
    height: vh(365);
    box-shadow: 0px 0px vh(10) rgba(25, 79, 149, 1) inset;
      box-sizing:border-box;
      margin-top:vh(15);
      background:rgba(12, 38, 104, 0.2);
  }


}

</style>
