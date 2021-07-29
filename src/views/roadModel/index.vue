<template>
  <div class="roadModel">
    <div class="titbox">
      <div class="titf">道路拥堵系数预测</div>
      <div>

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
      myChart1:null
    }
  },
   created() {
      this.$store.commit('SET_LOADING',false)
      
  },
  mounted(){
      window.onresize = ()=> {
        this.myChart.resize()
        this.myChart1.resize()
      }
      this.initechart()
      this.initechart1()
  },
  methods:{
    initechart(){
        this.myChart = this.$echarts.init(document.getElementById('echartroad1'));
        this.myChart.setOption({
            tooltip: {
              show:false,
           
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
                left: '2.5%',
                right: '1%',
                bottom: '3%',
                top:'10%',
                containLabel: true
            },
            xAxis: {
                data:['09:05','09:10','09:15','09:20','09:20','09:20','09:20','09:20','09:20'],
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
                   interval:0,
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
                  name: '当前车上人数',
                  type: 'bar',
                  barWidth:28,
                  stack: 'one',
                  itemStyle:{
                        normal: {
                            label: {
                                show: true,		//开启显示
                                position: 'top',	//在上方显示
                                textStyle: {	    //数值样式
                                    color: '#DAE4FF',
                                    fontSize: 14
                                }
                            }
                        }
                    },
                  data: [5,6,7,5,5,5,12,1,6]
              },
            ]

        },true)

    },
    initechart1(){
        this.myChart1 = this.$echarts.init(document.getElementById('echartroad2'));
        this.myChart1.setOption({
            tooltip: {
              show:false,
           
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
           
            grid: {
                left: '2.5%',
                right: '1%',
                bottom: '3%',
                top:'10%',
                containLabel: true
            },
            color:['#4578FF'],
            xAxis: {
                data:['09:05','09:10','09:15','09:20','09:20','09:20','09:20','09:20','09:20'],
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
                   interval:0,
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
                  name: '当前车上人数',
                  type: 'bar',
                  barWidth:28,
                  stack: 'one',
                  itemStyle:{
                        normal: {
                            label: {
                                show: true,		//开启显示
                                position: 'top',	//在上方显示
                                textStyle: {	    //数值样式
                                    color: '#DAE4FF',
                                    fontSize: 14
                                }
                            }
                        }
                    },
                  data: [5,6,7,5,5,5,12,1,6]
              },
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
