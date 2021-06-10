<template>
  <div class="passengerAnalysis">
    
      <div v-show="$route.name!=='断面客流'" class="passengerMap" id="passengerMap">
        <div class="searchbox">
          <el-select :popper-append-to-body="false" size="small" @change="lins()" v-model="value" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-button size="mini" type="success" plain @click="allData">发送线路数据</el-button>
        </div>
        
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import Map from "./passengerMap.js";
let dataLine=require('./dataLine.js')
let MyMap = null; // 地图实例
export default {
  data(){
    return{
      options:[],
      value:""
    }

  },
  mounted(){
    console.log(dataLine.arrline)
    this.options=dataLine.arrline
     MyMap = new Map({ el: "passengerMap" });

    // let Mydata= MyMap.lineSearch()
 
  },
  methods:{
    lins(){
  

       MyMap.linesearch.search(this.value, (status, result)=> {
        if (status === 'complete' && result.info === 'OK') {
             let str=result.lineInfo[0].path
               let arrpo=[]
              str.forEach(iteam=>{
                arrpo.push([iteam.lng,iteam.lat])
              })
           
         
              let data=[
                  { 
                    routeName: this.value,
                    geom: arrpo.join(' '),
                    lineLength: result.lineInfo[0].distance,
                  }
                ]
                this.$fetchPost("route/approve",data,'json').then(res=>{
                 })
            } else {
            }
        });
     

    },
    allData(){
      let arpoy=[]
      this.options.forEach(iteam=>{
        let obj={
          routeName:iteam,
          geom:'',
          lineLength:'',
        }
        MyMap.linesearch.search(iteam, (status, result)=> {
        if (status === 'complete' && result.info === 'OK') {
          let str=result.lineInfo[0].path
               let arrpo=[]
              str.forEach(iteam=>{
                arrpo.push([iteam.lng,iteam.lat])
              })
                obj.geom=arrpo.join(' ')
                obj.lineLength=result.lineInfo[0].distance
                arpoy.push(obj)
            } else {
            }
        });

      })

        setTimeout(()=>{
          console.log(arpoy)
          this.$fetchPost("route/approve",arpoy,'json').then(res=>{
          })

        },30000)

     
    },
    pushLine(){
      
    }
  }
};
</script>
<style  lang="scss">
.passengerAnalysis{
  .el-select-dropdown,.el-popper{
  max-width:800px !important;
  left:0px!important;

}
}
</style>
<style lang="scss" scoped>
.passengerAnalysis{
  width: 100%;
  height: 100%;
  background:#000000;
  position: relative;
  .passengerMap{
    width:100%;
    height:100%;
    .searchbox{
      width:500px;
      position: absolute;
      top: vh(270);
      left: vw(20);
      z-index:200;
      display:flex;

    }
  }
}
</style>
