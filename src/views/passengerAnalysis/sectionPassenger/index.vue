<template>
  <div class="sectionPassenger">
    <div class="search-box">

      <div style="margin-right:0.6vw;width:3vw;">时间</div>
      <el-date-picker
        v-model="query.date"
        :clearable="false"
        type="date"
        @change="getData"
        placeholder="选择日期">
      </el-date-picker>
      <div style="margin-right:0.6vw;margin-left:1.8vw;width:3.6vw;">线路名称</div>
      <el-select size="small" @change="getData" filterable v-model="query.lineName" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.routeId"
          :label="item.routeName"
          :value="item.routeName">
        </el-option>
      </el-select>
      <div class="qhbtn">
        <div :class="query.direction==iteam.id?'btnnow activebtn':'btnnow' " @click="tobtn(iteam)" v-for="(iteam,n) in typelst" :key="n">{{iteam.name}}</div>
      </div>
    </div>

    <div class="sectionEc" id="sectionEc">

    </div>
   
  </div>
</template>

<script>
export default {
   data(){
        return {
          options:[
            {
              name:'2021',
              value:'2021',
            },{
               name:'2020',
              value:'2020',
            }
          ],
          value:'',
          typelst:[
              {
                name:'上行',
                id:0
              },{
                name:'下行',
                id:1
              }
            ],
          loading:true,
          query:{
            date:'2021-06-29',
            direction:0,
            lineName:'610路'
          },
          alldata:[],
          options:[],
          fileList:[],
          total:null,
          myChart:null,
          allids:''
        }
   },
   watch:{
   },
    created(){
      this.getData()
      this.getAllline()
    },
    mounted(){
       window.onresize = ()=> {
        this.myChart.resize()
      }
    },
    methods:{
      getAllline(){ 
        this.$fetchGet("route/routeList").then(res=>{
          this.options=res.result
        })
      },
   
      handleChange(file, fileList) {
        this.loading=true
        // this.fileList = fileList.slice(-3);
      },
       tobtn(row){
        this.query.direction=row.id
        this.getData()
      },
      getData(){
        this.loading=true
        let arr=[],arr1=[],arr2=[]
        this.$fetchGet("passenger/section",{
            date:this.$moment(this.query.date).format("YYYY-MM-DD"),
            direction:this.query.direction,
            lineName:this.query.lineName
        }).then(res => {
          setTimeout(()=>{
            this.$store.commit('SET_LOADING',false)
          },200)
          res.result.forEach(iteam=>{
            arr.push(iteam.stationName)
            arr1.push(iteam.onboard)
            // arr2.push(iteam.sp)
          })
           this.loading=false
           this.initechart(arr,arr1)
        })
      },
      initechart(arr,arr1){
        this.myChart = this.$echarts.init(document.getElementById('sectionEc'));
        this.myChart.setOption({
            tooltip: {
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
            color:['#5470c6', '#fac858'],
            grid: {
                left: '3%',
                right: '3%',
                bottom: '16%',
                containLabel: true
            },
            xAxis: {
                data:arr,
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
                  name: '当前车上人数',
                  type: 'bar',
                  barWidth:12,
                  stack: 'one',
                  data:  arr1
              },
            ]

        })

      },
  }
  
}
</script>
<style lang="scss">
.sectionPassenger{
  .el-pagination .btn-next, .el-pagination .btn-prev{
    background: transparent !important;
    color: #ffffff !important;
  }
  .el-pagination{
    color: #ffffff !important;
  }
}


</style>
<style lang="scss" scoped>
.sectionPassenger{
  width:100%;
  height:100%;
  display:flex;
  flex-direction: column;
  padding-top:vh(140);
  // margin-bottom:vh(80);
  .search-box {
    // background: rgba(12, 38, 104, 0.7);
    border-bottom:1px solid rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    display: flex;
    align-items: center;
    color: #dae4ff;
    height:60px;
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
  }

  .sectionEc{
    flex:1;
  }

   
 
 
}
</style>
