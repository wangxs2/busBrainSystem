<template>
  <div class="operServices">
    <div class="operMap" id="operMap">

    </div>
    <div class="rightlinemsg">
      <div class="tit">匹配线路</div>
      <div class="bttit">
        <div>线路名称</div>
        <div>重复系数</div>
        <div>百公里人次</div>
        <div>满载率</div>
        <div>线路长度</div>
        <div>非直线系数</div>
         <div>轨交重复站数</div>
      </div>
      <div class="tablbox">
        <div  :class="nowindex==n?'bttit bttit1 bttit2':'bttit bttit1'" @click="toDetail(item,n)" v-for="(item,n) in lineaData" :key="n">
          <div>{{item.routeName}}</div>
          <div>0.6</div>
          <div>0.6</div>
          <div>50</div>
          <div>100km</div>
          <div>1</div>
          <div>9</div>
        </div>
      </div>
    </div>

    <div class="rightlinemsg left-box">
      <div style="text-align:left" class="tit">筛选指标</div>
      <div class="table-box">
        <div  class="table-iteanm" v-for="(iteam,n) in tlstation" :key="n">
        <img @click="toShow(iteam,n)" v-if="iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxktrue.png" />
        <img @click="toShow(iteam,n)" v-if="!iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxkfalse.png" />
         <div class="natit">{{iteam.name}}</div>
         <el-input v-if="n!==6&&n!==7" style="width:40%"   size="mini" v-model="iteam.value"  placeholder="">
           <template slot="prepend"> <i class="iconfont icondayufuhao" ></i></template>
         </el-input>
      </div>
      </div>
      
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      MyMapper:null,
      polineGroups:new AMap.OverlayGroup(),//线集合
      nowindex:-1,
      lineaData: [],
      tlstation:[
          {
            name:'线路重复系数',
            value:'',
            isxz:true,
            img:require('@/assets/image/cyan.png')
          },
          {
            name:'百公里人次',
            value:'',
            isxz:false,
            img:require('@/assets/image/blue1.png')
          },
          {
            name:'满载率',
            value:'',
            isxz:false,
            img:require('@/assets/image/green1.png')
          },
          {
            name:'线路长度',
            value:'',
            isxz:true,
            img:require('@/assets/image/yellow1.png')
          },
          {
            name:'非直线系数',
            value:'1.5',
            isxz:true,
            img:require('@/assets/image/icon_purple1.png')
          },
          {
            name:'与轨交重复',
            value:'',
            isxz:false,
            img:require('@/assets/image/icon_red1.png')
          },
          {
            name:'拥堵情况',
            value:'',
            isxz:false,
            img:require('@/assets/image/icon_red1.png')
          },
          {
            name:'换成压力',
            value:'',
            isxz:false,
            img:require('@/assets/image/icon_red1.png')
          }
        ],
    }

  },
  watch:{
  },
  mounted(){
    this.initMap()
  },
  created(){
   
  },
  methods:{
    initMap(){
       this.MyMapper=new AMap.Map('operMap', {
        zoom: 10, // 地图级别
        center: this.mapCenter, // 中心点
        // resizeEnable: true, //监控地图容器尺寸变化
        mapStyle: 'amap://styles/d67717253a691e523956e9482ca38f1e',
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
      })
      setTimeout(()=>{
        this.$store.commit('SET_LOADING',false)
      },200)
       this.getData()

    },
    getData(){
        this.$fetchGet("route/lineCoefficient").then(res => {
          res.result.forEach(iteam=>{
              this.$fetchGet("route/baseLineDetail",{
                routeName:iteam.routeName
              }).then(res => {
                if(res){
                  iteam.geom=this.setData(res.result[0].geom)
                }
              })
              this.lineaData.push(iteam)
              // 
          })
           setTimeout(()=>{
            this.passCorrline(this.lineaData)
          },1000)
          
        })
    },
    passCorrline(data){
      console.log(data)
      let lines=[]
      data.forEach(iteam=>{
        let kyLinedata = new AMap.Polyline({
          path: iteam.geom,
          strokeColor: "#35A594",
          strokeOpacity: 1,
          strokeWeight:2,
          zIndex:20,
          cursor:'pointer',
          strokeStyle: "solid",
        })
        
        // kyLinedata.on('click',(e)=>{
        // })
        lines.push(kyLinedata)
        console.log(this.MyMapper)
        this.MyMapper.add(kyLinedata);
        
      })
      console.log(lines)
      
    },
    setData(data){
      let str=data.split(' ')
      let arr=[]
      str.forEach(iteam=>{
        arr.push([Number(iteam.split(',')[0]),Number(iteam.split(',')[1])])
      })
      return arr

    },
    toShow(row,n){
      this.tlstation[n].isxz=!this.tlstation[n].isxz
    }
  }
  
}
</script>
<style lang="scss">
#operMap {

  .amap-marker-label{
    background-color:transparent!important;
    border:none!important;
}
}


.operServices{
    .el-input__inner {
      background: rgba(26, 66, 118, 0.2) !important;
      color: #dae4ff !important;
      border: 1px solid #27B6FF !important; 
      // box-shadow: 0px 0px vh(6) rgba(39, 182, 255, 0.8) inset !important;
       border-left: none !important;
       padding-left:0!important;
    }
    .el-input-group__append, .el-input-group__prepend{
      border: 1px solid #27B6FF !important;
       background: rgba(26, 66, 118, 0.2) !important;
       color: #dae4ff !important;
       padding:0 vw(6) !important;
       border-right: none !important;
      
    }

}


</style>
<style lang="scss" scoped>
.operServices{
  width: 100%;
  height: 100%;
  background:#000000;
  position: relative;
  .operMap{
    width:100%;
    height:100%;
  }
  .rightlinemsg{
    position: absolute;
    top: vh(200);
    right: vw(20);
    // width: vw(314);
    max-height: vh(800);
    overflow: hidden;
    flex-direction: column;
    display: flex;
    // background: rgba(26, 66, 118, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    .tit {
      width: 100%;
      height: vh(50);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(50);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align:center;
      font-weight: bold;
      box-sizing: border-box;
      padding:0 vw(20);
      border-bottom: 1px solid rgba(69, 120, 255, 0.6);
    }
    .bttit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      color:#ffffff;
      padding:vh(10) vw(20);
      padding-left: vw(0);
      font-size:vw(16);
      margin-top: vh(16);
      background: linear-gradient(
      to right,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.1) 10%,
      rgba(35,198,200,0.2) 20%,
      rgba(35,198,200,0.4) 30%,
      rgba(35,198,200,0.5) 40%,
      rgba(35,198,200,0.5) 50%,
      rgba(35,198,200,0.5) 60%,
      rgba(35,198,200,0.4) 70%,
      rgba(35,198,200,0.3) 80%,
      rgba(0,0,0,0) 90%,
      rgba(0,0,0,0) 100%);
      div {
        flex: 1;
        text-align: center;
        margin-left:vw(20);
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
      background:none;
    }
    .bttit1:hover {
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
      color:#27B6FF;
      font-weight:bold;
    }
    .bttit2{
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
      color:#27B6FF;
      font-weight:bold;

    }
    .tablbox {
      flex: 1;
      box-sizing: border-box;
      // margin-right: vw(10);
      // margin-left: vw(8);
      overflow: hidden;
      overflow-y: scroll;
      margin-top: vh(12);
      margin-bottom: vh(30);
      
    }
  }
  .left-box{
    position: absolute;
    top: vh(200);
    left: vw(20);
    width: vw(314);
    height: vh(480);
    .table-box{
      flex-direction: column;
      display: flex;
      box-sizing:border-box;
      padding-left:vw(20);
      .table-iteanm{
        box-sizing:border-box;
        display: flex;
        align-items: center;
        padding-top:vh(20);
        img{
          margin-right:vw(6);
        }
        .natit{
          display:inline-block;
          width:6.6vw;
        }
      }
    }
   
  }
 
 
}
</style>
