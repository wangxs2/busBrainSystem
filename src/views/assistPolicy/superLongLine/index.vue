<template>
  <div class="superLongLine" id="superLongLine">
        <div class="search-box">

      <div style="margin-right:0.6vw;margin-left:0.1vw;width:3.5vw;">线路名称</div>
      <el-select style="width:40%" size="small" clearable @clear="getData" filterable @change="getDetail" v-model="value" placeholder="请选择">
        <el-option
          v-for="(item,n) in lineaData"
          :key="n"
          :label="item.routeName"
          :value="item.routeName">
        </el-option>
      </el-select>
      <div style="margin-right:0.6vw;margin-left:1vw;width:3.5vw;">阈值设置</div>
      <!-- @blur="getDetail" -->
      <el-input style="width:30%" type="number" @change="getData"  size="mini" v-model="input"  placeholder="">
        <template slot="prepend"> 线路长度<i class="iconfont icondayufuhao" ></i></template>
      </el-input>
    </div>
    <div class="rightlinemsg">
      <div class="tit">线路长度</div>
      <div class="bttit">
        <div>线路名称</div>
        <div>线路长度(km)</div>
      </div>
      <div class="tablbox">
        <div :class="nowindex==n?'bttit bttit1 bttit2':'bttit bttit1'" @click="toDetail(item,n)" v-for="(item,n) in lineaData"  :key="n">
          <div>{{item.routeName}}</div>
          <div>{{item.lineLength}}</div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
//超长线路
import MapMixin from '../../networkExcellent/networkMap'
// let dataLine=require('./dataq.js')
export default {
  mixins: [MapMixin],
     data(){
        return {
          value:'',
          input:25,
          nowindex:-1,
          lineaData: [],
          allData:[],
        }
    },
    created(){
      this.getData()
      
      
      
    },
   mounted(){
     this.M_initMap('superLongLine')
    //  let arr=dataLine.reult.data.location
    //  console.log(dataLine.reult)
    //   let testdata=[]
    //   arr.forEach(iteam=>{
    //     iteam=this.TestsetData(iteam,2)
    //     testdata.push(iteam)
    //     // console.log(iteam)
    //   })
    //   console.log(testdata)
    //   this.M_BUSLINE(testdata,2)
  },
  methods:{
      testga(str){
      },
       getData(){
          this.$fetchGet("route/overLength",{
            length:this.input,
          }).then(res => {
            res.result.forEach(iteam=>{
              iteam.geom=this.Q_setData(iteam.geom)
            })
            this.allData=res.result
            this.lineaData=res.result;
            this.M_BUSLINE(this.allData)
            setTimeout(()=>{
              this.$store.commit('SET_LOADING',false)
            },500)
          })
      },
     getDetail(){
      
      this.allData.forEach(itam=>{
          if(itam.routeName==this.value){
            this.M_BUSLINE([itam])
          }
        })
              
              
         

      },
      clearpoit(){

      },
      toDetail(data,index){
          this.nowindex=index
          this.M_BUSLINE([data])
        
      },
      getDetail1(){
        
        if(this.input==''){
            this.lineaData=this.allData
            this.M_BUSLINE(this.lineaData)
        }else{
            let arr=[]
          this.allData.forEach(itam=>{
              if(itam.lineLength>this.input){
                arr.push(itam)
              }
            })
            this.lineaData=arr
            this.M_BUSLINE(this.lineaData)
         }


      },
    
  
  }
  
}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.superLongLine{
   width:100%;
  height:100%;
  position: relative;
    .search-box {
    width:40%;
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(140);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
    z-index:10
  }
   .rightlinemsg{
    position: absolute;
    z-index:10;
    top: vh(180);
    right: vw(20);
    width: vw(300);
    height: vh(864);
    background: url("~@/assets/image/form_bj.png");
    // border:1px solid #ffffff;
    background-size: 100% 100%;
    overflow: hidden;
     flex-direction: column;
    display: flex;
    .tit {
      width: 100%;
      height: vh(60);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(75);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align:center;
      font-weight: bold;
    }
    .bttit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      color:#27B6FF;
      // padding:0 vw(30);
      // padding-right: vw(10);
      font-size:vw(18);
      margin-left:vw(8);
      margin-right:vw(8);
      margin-top: vh(16);
      div {
        flex: 1;
        text-align: center;
      }
    }
    .bttit1 {
      // padding:0;
      width: 100%;
      height: vh(42);
      // margin-bottom:vh(20);
      color:#ffffff;
      margin-top: vh(0);
      cursor: pointer;
      font-size:vw(16);
    }
    .bttit1:hover {
      background: rgba(93, 137, 255, 0.2);
      color:#27B6FF;
      font-weight:bold;
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
    }
    .bttit2{
        background: rgba(93, 137, 255, 0.2);
      color:#27B6FF;
      font-weight:bold;
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
    }
    .tablbox {
      flex: 1;
      box-sizing: border-box;
      margin-right: vw(10);
      // margin-left: vw(8);
      overflow: hidden;
      overflow-y: scroll;
      margin-top: vh(12);
      margin-bottom: vh(30);
      
    }
  }
 
 
 
}
</style>
