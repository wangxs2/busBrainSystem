<template>
  <div class="busLane-box" id="busLane"  v-loading="assloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
     <div class="leftlinemsg1">
      <div class="titbox">
        <div class="titboxname">
          公交专用道列表
        </div>
        <div class="imgtit">
        </div>
      </div>
      <div class="bttit">
        <div>名称</div>
        <div>里程(km)</div>
      </div>
      <div class="tablbox">
        <div class="bttit bttit1" @click="todetail(item)" v-for="(item,n) in lineData" :key="n">
          <div style="text-align:left;padding-left:1vw">{{item.name}}</div>
          <div>{{item.length}}</div>
        </div>
      </div>
    </div>

    <div class="erach-box">

      <div class="search-box">
         <div class="qhbtn">
            <div :class="isbtn==iteam.name?'btnnow activebtn':'btnnow' " @click="tobtn(iteam)" v-for="(iteam,n) in typelst" :key="n">{{iteam.name}}</div>
          </div>

        <div>
          <el-select size="small"   filterable @change="todetailsa()" v-model="values" placeholder="请选择">
            <el-option
              v-for="(item,index) in lineData"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>

     

      <div  id="echstation"  
        v-loading="echloadsd"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)">

        
      </div>

    </div>


    
  
</div>
</template>

<script>
import MapMixin from '../../networkExcellent/networkMap'
let dataLine=require('@/libs/data.js')
export default {
  mixins: [MapMixin],
  components: {
  },
  data() {
    return {
      echloadsd:false,
      values:'',
      lineData:[],
      zxtdata:[],
      isbtn:'日',
      typelst:[
        {
          name:'日',
          id:1
        },{
          name:'周',
          id:2
        },{
          name:'月',
          id:3
        }
      ],
      myChart:null,
      assloading:true

    };
  },
  beforeCreate() {},
  created() {
    let arr=this.cloneObj(dataLine.datafg)
    arr.forEach(iteam=>{
      iteam.path=this.TestsetData(iteam.path,2)
      this.lineData.push(iteam)
    })
     this.$store.commit('SET_LOADING',false)
     this.getData()
  },
  mounted() {
    this.M_initMap('busLane')
    this.M_passCorrline(this.lineData)
     window.onresize = ()=> {
        this.myChart.resize()
      }
  },
  methods: {
    tobtn(row){
      this.values=''
      this.isbtn=row.name
      this.getData()

    },
    todetail(row){
      this.myChart.clear()
      this.S_setbulne(row)
      this.zxtdata.forEach(iteam=>{
        if(iteam.name==row.name){
         
          this.initechart([iteam])
        }
      })

    },
    todetailsa(){

      console.log(this.values)
      
       this.myChart.clear()
      this.zxtdata.forEach(iteam=>{
        if(iteam.name==this.values){
         
          this.initechart([iteam])
        }
      })

    },
 
    getData(){
      this.echloadsd=true
       this.$fetchGet("base-bus-exclusive-road/msg",{
         type:this.isbtn
       }).then(res => {
         this.zxtdata=[]
         let arr=[]
         for(let key  in res.result){
           if(res.result.[key].list!==null){

             let obj={} 
                obj.name=key
                obj.data=[]
                obj.dataX=[]
                 obj.type='line'
                obj.stack='总量'
                obj.smooth= true
                obj.markLine= {
                      data: [
                          {type: 'average', name: '平均值'}
                      ]
                  }
                res.result[key].list.forEach(iteam=>{
                    obj.data.push(Number(iteam.passengerNum))
                    if(this.isbtn=='周'){
                      obj.dataX.push(iteam.passengerDate.split('-')[1]+'周')
                    }else{
                      obj.dataX.push(iteam.passengerDate)
                    }
                    
                })
                this.zxtdata.push(obj)

           }
                
          }
          
            this.initechart(this.zxtdata)

             setTimeout(() => {
                this.assloading=false
            }, 1000);



       })

    },
    initechart(data){
      console.log(data)
   
        this.myChart = this.$echarts.init(document.getElementById('echstation'));
        this.myChart.setOption({
        grid:{
            top:40,
            left:80,
            right:40,
            bottom:60,
        },
        tooltip:{
            trigger: 'axis',
            backgroundColor:'#144A8C',
         
        },
        legend:{
            top:'1%',
            left:"center",
            textStyle:{
                color:'#ffffff'
            }
        },
        title:{
            text:"客流量/人次",
            textStyle:{
            color:'#DAE4FF',
            fontWeight:'normal',
            fontSize:16,
            
            },
            top:6,
            left:10,
        },
        color:['#ffca40','#00a08a','#e20048','#447bd4','#2e16b1','#5ab91b','#d35f1a','#8c2eca'],
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
                show:false,
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
            data: data[0].dataX
        },
        yAxis: {
        
            type: 'value',
            axisLabel:{
                // show:false,
                color:"#D9EFFF",
                borderType:"dashed",
                borderColor:"#194F95",
            },
            splitLine:{
                show:false,
                lineStyle:{
                color:'#194F95',
                type:'dashed'
                }
            },
            
        },
        series: data
        });
        this.echloadsd=false
    },

  }
};
</script>
<style lang="scss">
.busLane-box{
 .info-win {
      padding-right: vw(20);
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
            min-height: vh(20);
            .info-name {
              font-size: vw(16);
              font-weight: bold;
              margin-bottom: vw(9);
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
.busLane-box {
 
   width:100%;
  height:100%;
  box-sizing: border-box;
 position:relative;
  .leftlinemsg1 {
    position: absolute;
    top: vh(150);
    left: vw(20);
    width: vw(370);
    height: vh(588);
    background: url("~@/assets/image/bigline.png");
    background-size: 100% 100%;
    flex-direction: column;
    display: flex;
    font-size: vw(17);
     z-index: 10;
    .titbox {
      width: 100%;
      height: vh(58);
      box-sizing: border-box;
      padding: 0 vw(30);
      padding-top:vh(10);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .titboxname {
        font-weight: bold;
        text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
          -0 -0 1.4em rgba(255, 255, 255, 0.7);
    }
    .imgtit {
      display: flex;
      align-items: center;
      margin-top: vh(6);
    }
    .bttit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      // padding:0 vw(30);
      padding-right: vw(10);
      margin-top: vh(20);
      div {
        flex: 1;
        text-align: center;
      }
    }
    .bttit1 {
      // padding:0;
      width: 100%;
      // height: vh(42);
      // margin-bottom:vh(20);
      margin-top: vh(6);
      cursor: pointer;
    }
    .bttit1:hover {
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
    }
    .tablbox {
      flex: 1;
      box-sizing: border-box;
      margin-right: vw(10);
      margin-left: vw(8);
      overflow: hidden;
      overflow-y: scroll;
      margin-top: vh(12);
      margin-bottom: vh(30);
    }
  }

  .erach-box{
    position: absolute;
    bottom: vh(10);
    left: vw(20);
    width:vw(1880);
    height:vh(312);
    z-index:10;
    background: url("~@/assets/image/zdbj.png");
    background-size: 100% 100%;
    margin-top:vh(8);
    display:flex;
    flex-direction: column;
    .search-box{
      display:flex;
      align-items: center;
      margin-top:vh(16);
    }
    #echstation{
      flex:1;
    }
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
       margin-right:vw(12);
      //  margin-top:vh(16);
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
}
</style>
