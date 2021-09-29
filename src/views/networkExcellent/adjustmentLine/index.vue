<template>
  <div class="repetitionRactor" id="adjustLine"
  v-loading="poloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
     <div class="search-box">
      <div style="margin-right:0.6vw;white-space: nowrap">线路名称</div>
      <el-select style="width:75%" size="small" filterable @change="getDetail" v-model="value" placeholder="请选择">
        <el-option
          v-for="(item,n) in allData"
          :key="n"
          :label="item.routeName"
          :value="item.routeName">
        </el-option>
      </el-select>
     <el-button style="width:5vw;margin-left:0.4vw;" @click="saveBtn()" type="primary" size="mini" >保存</el-button>
     <el-button style="width:5vw;margin-left:0.4vw;" @click="getDetail()" type="primary" size="mini" >刷新</el-button>
     <div style="margin-left:0.8vw;margin-right:0.4vw;;white-space: nowrap;">地铁</div>
     <el-switch
        v-model="mreobr"
        @change="mreobrclick(2)"
        active-color="#409EFF"
        inactive-color="#ff4949">
      </el-switch>
      <div style="margin-left:0.8vw;margin-right:0.4vw;;white-space: nowrap;">公交站点</div>
      <el-switch
          v-model="mreobr1"
          @change="mreobrclick(3)"
          active-color="#409EFF"
          inactive-color="#ff4949">
        </el-switch>

      <el-button style="width:5vw;margin-left:0.4vw;" type="primary" size="mini" >支线公交</el-button>
      <el-button style="width:5vw;margin-left:0.4vw;"  type="info" size="mini" >定制公交</el-button>
      <el-button style="width:5vw;margin-left:0.4vw;" type="success" size="mini" >特色公交</el-button>
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
        <div>轨交重复站数</div>
       
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
          <div >{{item.gjcf}}</div>
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
          mreobr:true,
          mreobr1:false,
          poloading:false,
          input:'',
          nowindex:-1,
          lineaData: [],
          allData: [],
          datavsion:[],
          vsonzb:{},
          metrodata:[{name:'1号线',color:'#e3022a'},{name:'2号线',color:'#8dc218'},{name:'3号线',color:'#fdd501'},
                    {name:'4号线',color:'#411d81'},{name:'5号线',color:'#924a96'},{name:'6号线',color:'#d10368'},
                    {name:'7号线',color:'#f26b11'},{name:'8号线',color:'#0092d7'},{name:'9号线',color:'#0092d7'},
                    {name:'10号线',color:'#c3aecb'},{name:'11号线',color:'#841d30'},{name:'12号线',color:'#027a5f'},
                    {name:'13号线',color:'#e09abe'},{name:'14号线',color:'#655f23'},{name:'15号线',color:'#B9A981'},
                    {name:'16号线',color:'#98D1C0'},{name:'17号线',color:'#B67770'},{name:'18号线',color:'#D5A461'}],
        }
    },
    mounted(){
      this.M_initMap('adjustLine')

    },
    watch:{
       '$route.query.mallCode':{
        handler(val,oldval){
          if(val){
            this.value=val
           this.getDetail()
          }
        },
      },
    },
    created(){

      //  const routerParams = this.$route.query.mallCode
      //   // 将数据放在当前组件的数据内
      //   this.value = routerParams;
      //   if(this.value){
      //     this.getDetail()
      //   }
        
      this.pointAll()
      this.upBtn()
      this.getData()
    },
    methods:{
      upBtn(){
        this.metrodata.forEach(iteam=>{
          this.lineSearch(iteam.name,2,iteam)
        })
      },
      mreobrclick(type){
        this.M_ishow(type==2?this.mreobr:this.mreobr1,type)
      },
      getData(){
          this.$fetchGet("route/routeList").then(res => {
            this.allData=res.result;
            
          })
      },
      getDetail(){
        this.poloading=true
        this.nowindex=-1
        this.datavsion=[]
          this.$fetchGet("route/baseLineDetail",{
            routeName:this.value,
            direction:1
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
      toQWE(){
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
            this.M_pointAll3(res.result['站点的详细属性'])
            setTimeout(()=>{
              this.$store.commit('SET_LOADING',false)
            },1000)
            
          }
          this.poloading=false
        });  


      
     
     
    },
    }
  
}
</script>
<style lang="scss">
#adjustLine{
  .amap-info-window{
      background: #fff;
      border-radius: 3px;
      padding: 3px 7px;
      box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
      position: relative;
      color:black;
      white-space: nowrap
  }
  .amap-info-sharp{
      position: absolute;
      top: 21px;
      bottom: 0;
      left: 50%;
      margin-left: -12px;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-top: 12px solid #fff;
  }


}

      
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
