<template>
  <div class="controlModel">
    <div class="search-box titbox">
      <div class="titf">发车时间对比</div>
      <div style="display:flex;align-items: center">
         <div class="qhbtn">
           <div :class="isbtn==iteam.id?'btnnow activebtn':'btnnow' " @click="tobtn(iteam)" v-for="(iteam,n) in typelst" :key="n">{{iteam.name}}</div>
        </div>
        

      </div>
    </div>
    <div class="echartroad" id="echartroayx">
    </div>
    </div>
  </div>

 
  </div>
</template>

<script>
const BASE_TIME = '2021-11-15';
export default {
  name: '',
  data(){
    return{
      myChart:null,
      myChart1:null,
      roadName:"",
      roadNameData:[],
      histsx:[],//历史上行数据
      histxx:[],
      realsx:[],//实际上行的数据
      realxx:[],
      dataX:[],
      dataXj:[],//下行的横坐标
      isbtn:0,
       typelst:[
              {
                name:'上行',
                id:0
              },{
                name:'下行',
                id:1
              }
            ],
    }
  },
   created() {
      
      // this.getList()
      this.getData()
      console.log(new Date("2020-11-15 23:59:59").getTime())
      console.log(new Date("2020-11-15 0:00:00").getTime())

      
  },
  mounted(){
      window.onresize = ()=> {
        this.myChart.resize()
        this.myChart1.resize()
      }
      // this.getData()
     
  },
  methods:{
    tobtn(row){
      if(row.id==1){
         this.initechart(this.dataXj,this.histxx,this.realxx)
      }else{
        this.initechart(this.dataX,this.histsx,this.realsx)
      }
      this.isbtn=row.id
    
    },
    getList(){
      this.$fetchGet("main-road/list").then(res => {
        this.roadNameData=res.result
        this.roadName=res.result[0].roadName
        this.getData()
      })

    },
    getData(){
      this.$store.commit('SET_LOADING',true)
      this.$fetchGet("/real-depart-data/compareList?direction=0").then(res => {
        let arr=[],arr1=[],arr2=[]
        // res.result.forEach(iteam=>{
        //   arr.push(iteam.datatime)
        //   arr1.push(iteam.congestIndex)
        //   arr2.push(iteam.speed)
        // })
        // this.initechart(arr,arr1)
        // this.initechart1(arr,arr2)
        
        // var arr = [1,2,2,3,4,4,5,1,3];
        res.result.history.forEach((iteam,index)=>{
          if(iteam.routeDirection=='0'){
            this.histsx.push(BASE_TIME+' '+iteam.departTime)
              //  this.histsx.push(`${BASE_TIME} ${this.$moment(`${BASE_TIME} ${iteam.departTime}`).format('YYYY-MM-DD HH:mm').substr(11, 10)}`);
            
          }else{
            this.histxx.push(BASE_TIME+' '+iteam.departTime)
          }
        })
         res.result.real.forEach(iteam=>{
          if(iteam.routeDirection=='0'){
            this.realsx.push(BASE_TIME+' '+iteam.departTime)
            //  this.realsx.push(new Date(BASE_TIME+' '+iteam.departTime).getTime())
          }else{
            this.realxx.push(BASE_TIME+' '+iteam.departTime)
          }
        })
        this.histsx.forEach((iteam,index)=>{
          this.dataX.push('第'+(index+1)+'班')
        })
         this.histxx.forEach((iteam,index)=>{
          this.dataXj.push('第'+(index+1)+'班')
        })
        // this.realsx.forEach((iteam,index)=>{
          // this.dataX.push('第'+(index+1)+'班')
          // arr1.push(['第'+(index+1)+'班',iteam])
        // })
        // console.log(arr1)
        console.log(this.histxx)
        console.log(this.realxx)
        setTimeout(()=>{
           this.initechart(this.dataX,this.histsx,this.realsx)
        },500)
       
        // var newArr = this.unique(res.result.history);
        // console.log(newArr);
      })


    },
    getDataw(){ 
     this.$fetchGet("main-road/list").then(res => {

     })

    },
    unique(arr){
        var newArr = [];
        for(var i = 0; i < arr.length; i++){
            for(var j = i+1; j < arr.length; j++){
              if(arr[i].departTime == arr[j].departTime){
                  ++i;
              }
            }
            newArr.push(arr[i]);
        }
        return newArr;
    },     


    initechart(dataX,data1,data2){
        this.myChart = this.$echarts.init(document.getElementById('echartroayx'));
        this.myChart.setOption({
          tooltip: {
              show:true,
              backgroundColor:'#144A8C',
              borderWidth:0,
              textStyle:{
                color:'#D9EFFF',
              },
              formatter:  (params)=> {
                let str=params.value.substr(11,20)
                return '<div>'+params.seriesName+'</div><div>'+params.name+'：'+str+'</div>'
              }
              
           
            },
           xAxis: {
              type: 'category',
              data: dataX,
              // data:["第一班车","第二班车","第三班车","第四班车"],
              name: '',
              nameTextStyle:{
                color:'#ffffff'
              },
              splitLine:{
                show:false,
                lineStyle:{
                    color:'#194F95',
                    type:'dashed'
                  }
              },
              axisLabel : {
                  // interval:15,
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
                }
              },
            },
             grid: {
                left: '1%',
                right: '1%',
                bottom: '3%',
                top:'6%',
                containLabel: true
            },
            color: ["#8C2ECA", "#D35F1A"],
            yAxis: {
              type: 'time',
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
                      color: '#ffffff',
                      fontSize:12
                  }
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false,
                  onZero: true,
                  lineStyle:{
                    color:'#ffffff',
                  }
                },
              min: "2021-11-15 00:00",
              max: "2021-11-15 23:59",
               splitNumber: 40,
              axisLabel:{
                formatter:  (value)=> {
                  return (this.$moment(value).format('YYYY-MM-DD HH:mm')).substr(11,20)
                }
            

              }
            },
              legend: {
                top:'2%',
                textStyle:{
                  color:"#ffffff"
                }
              },
            series: [
               {
                //  type: 'bar',
                type: 'scatter',
                symbolSize: '10',
                name:"历史发车时间",
                // data: ["2021-11-15 08:30","2021-11-15 06:30","2021-11-15 22:30"],
                data:data1
              
              },
               {
                type: 'scatter',
                // type: 'bar',
                name:"实际发车时间",
                symbolSize: '6',
                // data: ["2021-11-15 05:30","2021-11-15 06:30","2021-11-15 22:30"],
                data:data2
              
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
.controlModel{
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
    .qhbtn{
        width: vw(120);
        height: vh(36);
        background: rgba(26, 66, 118, 0.2);
        border: 1px solid #27B6FF;
        border-radius: vw(18);
        box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset;
        display:flex;
        align-items: center;
        margin-left:vw(12);
        .btnnow{
          flex:1;
          text-align:center;
          height:100%;
          line-height:vh(36);
          cursor:pointer;
        }
        .btnnow:first-child{
          border-top-left-radius:vw(18);
          border-bottom-left-radius:vw(18);
        }
        .btnnow:last-child{
          border-top-right-radius:vw(18);
          border-bottom-right-radius:vw(18);
        }
        .activebtn{
          background: #4578FF;
        }
      }
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
    height: 100%;
    box-shadow: 0px 0px vh(10) rgba(25, 79, 149, 1) inset;
      box-sizing:border-box;
      margin-top:vh(15);
      background:rgba(12, 38, 104, 0.2);
  }


}

</style>
