<template>
  <div class="repetitionRactor" id="adjustLine"
  v-loading="poloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
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
    <!-- <div class="rightlinemsg">
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
    </div> -->
    <div class="lkicon">
      <div class="lk1"></div>调整前
      <div class="lk1 lk2"></div>调整后
    </div>
    <!-- <div class="rightlinemsg rightlinemsg1" v-if="datavsion.length!==0">
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
    </div> -->
     <div class="rightlinemsg">
      <div class="tit">匹配线路</div>
      <div class="bttit">
        <div>线路名称</div>
        <div>版本号</div>
        <div >重复系数</div>
        <div >百公里人次</div>
        <div >满载率</div>
        <div>线路长度(km)</div>
        <div>非直线系数</div>
        <!-- <div>轨交重复站数</div> -->
      </div>
      <div class="tablbox">
        <div  :class="nowindex==n?'bttit bttit1 bttit2':'bttit bttit1'" @click="toDetail(item,n)" v-for="(item,n) in lineaData" :key="n">
          <div>{{item.lineName}}</div>
          <div style="white-space:nowrap;">{{item.version}}</div>
          <div >{{item.cfd==null?'0':item.cfd.toFixed(2)}}</div>
          <div >{{item.bglrc==null?'0':item.bglrc}}</div>
          <div >{{item.mzl==null?'0':item.mzl.toFixed(2)}}</div>
          <div >{{item.cd==null?'0':item.cd.toFixed(2)}}</div>
          <div >{{item.fzxxs==null?'':item.fzxxs.toFixed(2)}}</div>
          <!-- <div ></div> -->
        </div>

        <div style="text-align:center" v-if="lineaData.length==0">暂无调整记录</div>
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
          poloading:true,
          input:'',
          nowindex:-1,
          lineaData: [],
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
            this.poloading=false

          })
      },
      getDetail(){
         this.poloading=true
        this.nowindex=-1
        this.datavsion=[]
          this.$fetchGet("route/baseLineDetail",{
            routeName:this.value
          }).then(res => {
            if(res.result.length>0){
              this.allData.forEach(itam=>{
                if(itam.routeName==res.result[0].routeName){
                  res.result[0].coefficient=itam.coefficient
                }
              })
                res.result[0].geom=this.setData(res.result[0].geom)
                this.M_drawbusLine(res.result[0])
            }else{
              this.M_remove()
            }
             this.poloading=false

          })

          this.$fetchGet("net/getLineHistory",{
             routeName:this.value
           }).then(res => {
             if(res.result){
               this.lineaData=res.result
               }
           })
         
       

      },
      saveBtn(){
         this.poloading=true
        let allPath=(this.M_closepoly()).join(' ')
        this.$fetchPost("net/saveNewGeom",{
             geom:allPath,
            line:this.value
           },'json').then(res => {
             this.poloading=false
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
          this.poloading=false
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
    top: vh(240);
    right: vw(20);
    // width: vw(314);
    max-height: vh(800);
    overflow: hidden;
    flex-direction: column;
    display: flex;
    // background: rgba(26, 66, 118, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(15) rgba(69, 120, 255, 1) inset;
    z-index:10;
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
