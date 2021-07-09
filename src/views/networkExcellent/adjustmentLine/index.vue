<template>
  <div class="repetitionRactor" id="adjustLine">
     <div class="search-box">
      <div style="margin-right:0.6vw;width:5vw;">线路名称</div>
      <el-select style="width:75%" size="small" filterable @change="getDetail" v-model="value" placeholder="请选择">
        <el-option
          v-for="(item,n) in allData"
          :key="n"
          :label="item.routeName"
          :value="item.routeName">
        </el-option>
      </el-select>
     <el-button style="width:5vw;margin-left:0.4vw;" @click="saveBtn()" type="primary" size="mini" >保存</el-button>
    </div>
    <div class="rightlinemsg">
      <div class="tit">版本记录</div>
      <div class="bttit">
        <div>版本号</div>
        <div>时间</div>
      </div>
      <div class="tablbox">
        <div  :class="nowindex==n?'bttit bttit1 bttit2':'bttit bttit1'" @click="toDetail(item,n)" v-for="(item,n) in datavsion" :key="n">
          <div>{{item.version}}</div>
          <div>{{item.time}}</div>
        </div>
         <div style="text-align:center" v-if="datavsion.length==0">无调整信息</div>
      </div>
    </div>
    <div class="lkicon">
      <div class="lk1"></div>调整前
      <div class="lk1 lk2"></div>调整后
    </div>
    <div class="rightlinemsg rightlinemsg1" v-if="datavsion.length!==0">
      <div class="tit">{{value}}</div>
      <div class="bttit">
        <div>指标</div>
        <div>调整前</div>
        <div>调整后</div>
      </div>
      <div class="tablbox">
        <div  class="bttit bttit1">
          <div>百公里人次</div>
          <div>{{vsonzb.bglrc}}</div>
          <div>{{vsonzb.bglrc}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapMixin from '../networkMap'
//线路重复系数辅助决策
export default {
  mixins: [MapMixin],
   data(){
        return {
          value:'',
          input:'',
          nowindex:-1,
          lineaData: [
            {
              name:'01-78',
              time:'2021-12-10'
            }
          ],
          allData: [],
          datavsion:[],
          vsonzb:{},
        }
    },
    mounted(){
      this.M_initMap('adjustLine')

    },
    created(){
      // this.pointAll()
      this.getData()
    },
    methods:{
      getData(){
          this.$fetchGet("route/routeList").then(res => {
              setTimeout(()=>{
                this.$store.commit('SET_LOADING',false)
              },500)
            this.allData=res.result;

          })
      },
  
      getDetail(){
        this.nowindex=-1
        this.datavsion=[]
          this.$fetchGet("route/baseLineDetail",{
            routeName:this.value
          }).then(res => {
            if(res.result){

              this.allData.forEach(itam=>{
                if(itam.routeName==res.result[0].routeName){
                  res.result[0].coefficient=itam.coefficient
                }
              })
                res.result[0].geom=this.setData(res.result[0].geom)
                this.M_drawbusLine(res.result[0])
            }

          })

           this.$fetchGet("net/getLineHistory",{
             routeName:this.value
           }).then(res => {
             if(res.result){this.datavsion=res.result}
           })
         
       

      },
      saveBtn(){
        this.$emit('changnet',{
          saveLine:1
        })
      },
      toDetail(data,index){
        this.nowindex=index
        this.vsonzb=data
        this.M_setPath(this.setData(data.geom))
      },
    
      setData(data){
        let str=data.split(' ')
        let arr=[]
        str.forEach(iteam=>{
          arr.push([Number(iteam.split(',')[0]),Number(iteam.split(',')[1])])
        })
        return arr

      },
      pointAll(){
        this.$fetchGet("indicator/stationList").then(res => {
          if(res.result&&res.result['站点的详细属性']){
            console.log(this.M_pointAll3)
            this.M_pointAll3(res.result['站点的详细属性'])
          
          }
        });  


      
     
     
    },
    }
  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.repetitionRactor{
  width:100%;
  height:100%;
  position: relative;

  .search-box {
    // width:40%;
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(140);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
    z-index:2;
  }
  
  
  .rightlinemsg{
    position: absolute;
     z-index:2;
    top: vh(240);
    right: vw(20);
    width: vw(314);
    height: vh(350);
    background: url("~@/assets/image/msgLine.png");
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
      margin-right: vw(10);
      // margin-left: vw(8);
      overflow: hidden;
      overflow-y: scroll;
      margin-top: vh(12);
      margin-bottom: vh(30);
      
    }
  }
  .rightlinemsg1{
      top: vh(600);
  }

  .lkicon{
    position:absolute;
    z-index:2;
    top:vh(180);
    right:vw(26);
    width: vw(270);
    height: vh(40);
    background: rgba(26, 66, 118, 0.2);
    border: 1px solid #27B6FF;
    box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset;
    opacity: 0.8;
    border-radius: 2px;
    box-sizing: border-box;
    padding:vh(8) vw(20);
    display: flex;
    align-items: center;
    justify-content: space-around;
    .lk1{
      width: vw(50);
      height: vh(6);
      background: #00FFFF;
    }
    .lk2{
      background: #A200FF;
    }
  }
 
}
</style>
