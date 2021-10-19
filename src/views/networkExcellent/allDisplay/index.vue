<template>
  <div class="repetitionRactor" id="alldisplay" ref="fields">
    <div class="search-box">

      <div style="margin-right:0.6vw;" @click="handlerBulder">地铁</div>
      <el-select style="width:200px" size="small" filterable @change="getDetail" v-model="value" placeholder="请选择">
        <el-option
          v-for="(item,n) in metrodata"
          :key="n"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    
      <!-- @blur="getDetail" -->
    </div>
    <div class="rightlinemsg">
      <div class="tit">时刻匹配路线</div>
      <div class="bttit">
        <div>开往方向</div>
        <div style="white-space:nowrap;">地铁站名称</div>
        <div >匹配线路</div>
        <div >站点名称</div>
        <div style="white-space:nowrap;">末班车时间</div>
      </div>
      <div class="tablbox">
        <div  :class="nowindex==n?'bttit bttit1 bttit2':'bttit bttit1'" @click="toDetail(item,n)" v-for="(item,n) in lineaData" :key="n">
          <div>{{item.lineDirection}}</div>
          <div style="white-space:nowrap;">{{item.metroName}}</div>
          <div >{{item.line}}</div>
          <div >{{item.stationName}}</div>
          <div >{{item.departureTime}}</div>
        </div>

        <div style="text-align:center" v-if="lineaData.length==0">暂无数据~</div>
      </div>
    </div>
    <div class="rightlinemsg rightlinemsg1">
      <div class="tit">轨交接驳站点</div>
      <div class="bttit">
        <div style="white-space:nowrap;">地铁站名称</div>
        <div style="white-space:nowrap;">公交站点名称</div>
        <div >途经线路</div>
        <div style="white-space:nowrap;" >接驳范围(m)</div>
       
       
      </div>
      <div class="tablbox">
        <div  :class="nowindex1==n?'bttit bttit1 bttit2':'bttit bttit1'" v-for="(item,n) in allData" :key="n">
          <div>{{item.lineName}}</div>
          <div style="white-space:nowrap;">{{item.version}}</div>
          <div >{{item.cfd==null?'0':item.cfd.toFixed(2)}}</div>
          <div >{{item.bglrc==null?'0':item.bglrc}}</div>
        </div>
        <div style="text-align:center" v-if="lineaData.length==0">暂无数据~</div>
      </div>
    </div>
    <div class="rightlinemsg leftlinemsg">
      <div class="tit">途径线路</div>
      <div class="bttit">
        <div>线路名称</div>
        <div style="white-space:nowrap;">重复站数(站)</div>
      </div>
      <div class="tablbox">
        <div  :class="nowindex2==n?'bttit bttit1 bttit2':'bttit bttit1'"  v-for="(item,n) in allData1" :key="n">
          <div>{{item.lineName}}</div>
          <div style="white-space:nowrap;">{{item.version}}</div>
        </div>

        <div style="text-align:center" v-if="lineaData.length==0">暂无数据~</div>
      </div>
    </div>
    
  </div>
</template>

<script>
//综合展示
import MapMixin from '../networkMap'
export default {
  mixins: [MapMixin],
   data(){
        return {
          value:'',
          input:'',
          nowindex:-1,
          nowindex1:-1,
          nowindex2:-1,
          lineaData: [],
          metrodata:[{name:'1号线',color:'#e3022a'},{name:'2号线',color:'#8dc218'},{name:'3号线',color:'#fdd501'},
                  {name:'4号线',color:'#411d81'},{name:'5号线',color:'#924a96'},{name:'6号线',color:'#d10368'},
                  {name:'7号线',color:'#f26b11'},{name:'8号线',color:'#0092d7'},{name:'9号线',color:'#0092d7'},
                  {name:'10号线',color:'#c3aecb'},{name:'11号线',color:'#841d30'},{name:'12号线',color:'#027a5f'},
                  {name:'13号线',color:'#e09abe'},{name:'14号线',color:'#655f23'},{name:'15号线',color:'#B9A981'},
                  {name:'16号线',color:'#98D1C0'},{name:'17号线',color:'#B67770'},{name:'18号线',color:'#D5A461'}],
          allData: [],
          allData1: [],
        }
    },
    mounted(){
      this.M_initMap('alldisplay')


      // var map = new Indoor.Map('alldisplay',{
      //     key:'37e2d7a58a3f8897326b9b0250254eef',
      //     buildingId:'B00156YKHU'
      // });
      
      // //由于地图数据使用了异步加载，为避免出错请把所有的逻辑放在mapready事件内
      // map.once('mapready',function(){
      //     console.log(map.getFloor());
      // })


    },
    created(){
      this.getData()
    },
    methods:{
      handlerBulder () {
          const html = this.$refs.fields.outerHTML
          console.log(this.$refs.fields.outerHTML)

          var a = document.createElement('a');

          var url = window.URL.createObjectURL(new Blob([html],

          { type: "text/plain;charset='utf-8'" }));

          a.href = url;

          a.download = 'form.html';

          a.click();

          window.URL.revokeObjectURL(url);

          },
      getData(){
        this.$store.commit('SET_LOADING',false)
         
      },
      getDetail(){
        let arr=this.M_map.getAllOverlays()
        if(arr.length>0){
         this.meroGroups.removeOverlays(arr)
         this.overlayGroups.removeOverlays(arr)
        }
        this.metrodata.forEach(iteam=>{
          if(iteam.name==this.value){
            this.lineSearch(iteam.name,3,iteam)
          }
        })
          this.$fetchGet("net/matchTime",{
            line:this.value
          }).then(res => {
           this.lineaData=res.result
          })
      },
      toDetail(data,index){
        this.nowindex=index
        this.$fetchGet("net/matchTime",{
            line:data.line,
            metroName:data.metroName,
          }).then(res => {
          })
        
      },
      setData(data){
        let str=data.split(' ')
        let arr=[]
        str.forEach(iteam=>{
          arr.push([Number(iteam.split(',')[0]),Number(iteam.split(',')[1])])
        })
        return arr
      },
    }
  
}
</script>
<style lang="scss">

.myinfobox{
    width: vw(342);
    height:100%;
    background: url("~@/assets/image/tk_bj.png");
    background-size: 100% 100%;
    border:1px solid rgba(0, 255, 255, 0.65);
    box-sizing: border-box;
    padding: vh(10) vw(26);
    font-size: vw(16);
    padding-bottom: vh(34);
    display: flex;
    flex-direction: column;
    .infoimg{
      width: vw(48);
      height: vw(48);
      background: url("~@/assets/image/gf_icon.png");
      background-size: 100% 100%;
    }
    .line-lsi{
      display: flex;
      justify-content: flex-start;
      width: 100%;
      flex: 1;
      .tithear{
        width: vw(42);
        height:vh(20);
        display: inline-block;
      }
    }
    .itean-lsi{
      margin-bottom:0.2vh;
    }
    .titfont{
      display: flex;
      align-items: center;
      font-size: vw(20);
      color: #00FFFF;
      font-weight: bold;
      width: 100%;
      height: vh(30);
      margin: vh(16) vw(0);
      margin-left: vw(-12);
      margin-top: vh(4);
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
    z-index:10;
  }
  .rightlinemsg{
    position: absolute;
    top: vh(160);
    right: vw(20);
    // width: vw(314);
    max-height: vh(450);
    overflow: hidden;
    flex-direction: column;
    display: flex;
    // background: rgba(26, 66, 118, 1);
    border: 1px solid rgba(69, 120, 255, 0.6);
    box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 1) inset;
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
      // height: vh(42);
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
  .rightlinemsg1{
    top: vh(620);
  }
  .leftlinemsg{
    top:vh(210);
    left:vw(20);
    max-width:vw(300);
  }
 
 
}
</style>
