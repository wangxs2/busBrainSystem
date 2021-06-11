<template>
  <div class="passengerAnalysis">
    
      <div v-show="$route.name!=='断面客流'" class="passengerMap" id="passengerMap">
        <!-- <div class="searchbox">
          <el-select :popper-append-to-body="false" size="small" @change="lins()" v-model="value" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-button size="mini" type="success" plain @click="allData">发送线路数据</el-button>
        </div> -->
        
      </div>
      <router-view @changeKl="klsonClick"></router-view>
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
      value:"",
      styleStition:{
        '0-500':{
                url: require('@/assets/image/icon_cyan.png'),
                anchor: new AMap.Pixel(15,15),
                size: new AMap.Size(30,30)
              },
        '500-1000':{
                url: require('@/assets/image/icon_blue.png'),
                anchor: new AMap.Pixel(15,15),
                size: new AMap.Size(30,30)
              },
        '1000-2000':{
                url: require('@/assets/image/icon_green.png'),
                anchor: new AMap.Pixel(15,15),
                size: new AMap.Size(30,30)
              },
        '2000-3000':{
                url: require('@/assets/image/icon_yellow.png'),
                anchor: new AMap.Pixel(15,15),
                size: new AMap.Size(30,30)
              },
        '3000-4000':{
                url: require('@/assets/image/icon_purple.png'),
                anchor: new AMap.Pixel(15,15),
                size: new AMap.Size(30,30)
              },
        '4000+':{
               url: require('@/assets/image/icon_red.png'),
                anchor: new AMap.Pixel(15,15),
                size: new AMap.Size(30,30)
        }
      }
    }

  },
  watch:{
    '$route':{
      handler(val,oldval){
        if(val){
          this.judgeRoute(val)
        }
      },
    },

  },
  mounted(){
    // this.options=dataLine.arrline
    MyMap = new Map({ el: "passengerMap" });
    this.judgeRoute(this.$route)
  },
  methods:{
    qchh(){
        var result = [];
        var obj = {};
        for(var i =0; i<arr.length; i++){
            if(!obj[arr[i].key]){
              result.push(arr[i]);
              obj[arr[i].key] = true;
            }
        }
        console.log(result);

    },
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
          routeName:iteam.name,
          geom:'',
          lineLength:'',
        }
        MyMap.linesearch.search(iteam.name, (status, result)=> {
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
              console.log(iteam)
            }
        });

      })

        setTimeout(()=>{
          this.$fetchPost("route/approve",arpoy,'json').then(res=>{
          })

        },30000)

     
    },
    pushLine(){
    },
    judgeRoute(val){
      switch(val.name) {
          case "站点客流":
            let stationkl=this.$store.getters.allStation;
             for(let key  in stationkl){
                MyMap.xrhld(key,stationkl[key],this.styleStition[key])
              }

              break;
          case "公交站点":
           
              break;
          case "公交线路网":
           
              break;
          case "公交专用道":
             
              break;
          case "客运走廊":
              break;
          default:
          } 
    },
    klsonClick(row){
      console.log(row)
      if(row.isStation){
        if(row.isStation.isxz){
          MyMap.zdklMapOption.mass[row.isStation.value].show()
        }else{
          MyMap.zdklMapOption.mass[row.isStation.value].hide()
        }
      }
    },
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
