<template>
  <div class="publicTransport-box" id="publicTransport"    v-loading="lloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="leftlinemsg">
      <div class="tit">线网分布信息</div>
      <div class="itmsg-box">
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_1.png" />
            线路总数
          </div>
          <div>{{objline['线路总数']}}条</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_2.png" />
            线路总长
          </div>
          <div>{{objline['线路总长']}}公里</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_3.png" />
            线路重复系数
          </div>
          <div style="display:flex;align-items: center;">{{objline['线路重复系数']}}

              <el-tooltip v-if="objline['线路重复系数']<2.5"  effect="dark" content="参考系数2.5" placement="right-start">
                  <img style="margin-left:0.4vw" src="@/assets/image/xjt.png" /> 
              </el-tooltip>  
              <el-tooltip v-if="objline['线路重复系数']>2.5"  effect="dark" content="参考系数2.5" placement="right-start">
                  <img  style="margin-left:0.4vw" src="@/assets/image/sst.png" />
              </el-tooltip>  

                <!-- <el-popover
                  placement="right-start"
                  title=""
                  width="200"
                  trigger="hover"
                  content="参考系数2.5">
                  <div slot="reference">
                      <img v-show="objline['线路重复系数']<2.5" style="margin-left:0.4vw" src="@/assets/image/xjt.png" /> 
                      <img v-show="objline['线路重复系数']>2.5" style="margin-left:0.4vw" src="@/assets/image/sst.png" />
                  </div>
                  
                </el-popover> -->
            
          </div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_4.png" />
            线网密度 
          </div>
          <div style="display:flex;align-items: center;">{{objline['线网密度(浦东新区总面积)']}}  

              <el-tooltip v-if="objline['线网密度(浦东新区总面积)']<3"  effect="dark" content="参考系数3" placement="right-start">
                  <img style="margin-left:0.4vw" src="@/assets/image/xjt.png" /> 
              </el-tooltip>  
              <el-tooltip v-if="objline['线网密度(浦东新区总面积)']>3"  effect="dark" content="参考系数3" placement="right-start">
                  <img  style="margin-left:0.4vw" src="@/assets/image/sst.png" />
              </el-tooltip>  
          </div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_2.png" />
            线网长度
          </div>
          <div>{{objline['线网长度']}}公里</div>
        </div>
      </div>
    </div>
    <div class="leftlinemsg1">
      <div class="titbox">
        <div class="titboxname">
          <div
            @click="tomeay(item)"
            :class="islist==(n+1)?'meay meay-active':'meay'"
            v-for="(item,n) in lisData"
            :key="n"
          >{{item.name}}</div>
        </div>
        <div class="imgtit">
          <!-- <img style="margin-right:0.4vw" src="@/assets/image/download.png" />
          下载 -->
        </div>
      </div>
      <div class="bttit">
        <div>排名</div>
        <div>线路名称</div>
        <div>线长(公里)</div>
      </div>
      <div class="tablbox">
        <div :class="iscline==n?'bttit bttit1 bttit2':'bttit bttit1'" @click="hzline(item,n)" v-for="(item,n) in lineaData" :key="n">
          <div>{{n+1}}</div>
          <div>{{item.routeName}}</div>
          <div>{{item.lineLength}}</div>
        </div>
      </div>
    </div>

    <div class="lkicon">
      <div style="text-align:center">线网颜色说明(条)</div>
      <div class="lkicon-box">
        <div class="lkicon-itam">
          <div class="lk1"></div>1-2
        </div>
        <div class="lkicon-itam">
          <div class="lk1 lk2"></div>2-4
        </div>
        <div class="lkicon-itam">
          <div class="lk1 lk3"></div>4-6
        </div>
         <div class="lkicon-itam">
          <div class="lk1 lk4"></div>大于6
        </div>
      </div>
    </div>

    <div class="rightlinemsg" v-show="isrour">
      <div class="tit">
        线路信息说明
        <!-- <div>{{objLine.routeName}}</div> -->
      </div>

      <div class="conten-box">
        <div class="ityu">
            线路名称：{{objLine.name}}
        </div>
        <div class="ityu">
            类型：{{objLine.type}}
        </div>
        <div class="ityu">
            首班车时间：{{objLine.stime.length>0?objLine.stime.substring(0, 2):'--'}}:{{objLine.stime.length>0?objLine.stime.substring(2, 4):'--'}}
        </div>
        <div class="ityu">
            末班车时间：{{objLine.etime.length>0?objLine.etime.substring(0, 2):'--'}}:{{objLine.etime.length>0?objLine.etime.substring(2, 4):'--'}}
        </div>
        <div class="ityu">
            起点站：{{objLine.start_stop}}
        </div>
        <div class="ityu">
            终点站：{{objLine.end_stop}}
        </div>
        <div class="ityu">
            所属公司：{{objLine.company}}
        </div>
        <div class="ityu"  >重复系数：{{ExtData.cfd==null?'':ExtData.cfd}}</div>
        <div class="ityu" >百公里人次：{{ExtData.bglrc==null?'':ExtData.bglrc}}</div>
        <div class="ityu" >满载率：{{ExtData.mzl==null?'':ExtData.mzl}}</div> 
        <div class="ityu">非直线系数：{{ExtData.fzxxs==null?'':ExtData.fzxxs}}</div> 
        <div class="ityu" >线路长度(km)：{{ExtData.cd==null?'':ExtData.cd}}</div> 
      </div>

    </div>
  </div>
</template>

<script>
import MapMixin from '@/libs/myMap.js'
export default {
  mixins: [MapMixin],
  components: {},
  
  data() {
    return {
      lloading:true,
      isrour:false,
      lineaData1:[],
      iscline:-1,
      ExtData:{},
      objLine:{
        name:"",
        type:'',
        stime:'',
        etime:'',
        start_stop:'',
        end_stop:'',
        company:'',

      },
      lisData: [
        {
          name: "最长线路",
          id: 1
        },
        {
          name: "最短线路",
          id: 2
        }
      ],
      objline:{},
      islist: 1,
      lineaData: []
    };
  },
  beforeCreate() {},
  created() {
    this.getLinelength()
  },
  mounted() {
    // if(this.$store.getters.dataArrLine.length!==0){
    //    this.$store.commit('SET_LOADING',false)
    // }else{
    //   this.getAllLine()
    // }
    this.M_initMap('publicTransport')
    // this.M_map.setStatus({
    //   dragEnable: false, // 地图是否可通过鼠标拖拽平移，默认为true
    //   keyboardEnable: false, //地图是否可通过键盘控制，默认为true
    //   doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
    //   zoomEnable: false, //地图是否可缩放，默认值为true

    // })
    this.getAllLine()
  },

  methods: {
    hzline(row,index){
      this.iscline=index
      this.lineaData1.forEach(iteam=>{
        if(iteam.lineName==row.routeName){
          this.ExtData=iteam
        }
      })
      // this.objLine.routeName=row.routeName
      this.lineSearchPudong(row.routeName)
      this.gjxlwmsg(row)
      this.isrour=true

    },
    tomeay(row) {
      this.islist = row.id;
      this.lineaData=this.lineaData.reverse()
    },
    getAllLine(){
      this.$fetchGet("route/baseTotal").then(res =>{
        this.objline=res.result
      })
      this.$fetchGet("route/lineSegment").then(res => {
        let dataArr=[]
        for(let key  in res.result){
          let obj={
            name:key,
            path1:''
          }
          obj.path1=res.result[key]
          dataArr.push(obj)
        }
        dataArr.forEach(iteam=>{
          iteam.path2=[]
          iteam.path1.forEach(itam=>{
             iteam.path2.push([[itam.split(' ')[0]],[itam.split(' ')[1]]])
           })

        })
        dataArr.forEach(team=>{
          team.path5=[]
            team.path2.forEach(iu=>{
              let arr=[]
              iu.forEach(iy=>{
                let arr1=[]
               
                 iy[0].split(',').forEach(iru=>{
                    arr1.push(parseFloat(iru))
                 })
                 arr.push(arr1)
                
              })
              team.path5.push(arr)
            })
        })
        dataArr.forEach(iuy=>{
          iuy.path=[]
          iuy.path5.forEach(ity=>{
            let obj={
              name:iuy.name,
              path:ity
            }
            iuy.path.push(obj)
          })
        })
        let lastArr=[]
        dataArr.forEach(ol=>{
          ol.path.forEach(opl=>{
            lastArr.push(opl)
          })
        })
        this.initLineAllbus(lastArr)
        // this.pathSimplifierIns.setData(lastArr)
        // this.pathSimplifierIns.show()
        
         setTimeout(() => {
          this.lloading=false
        }, 4000);
       

      })
    },
    getLinelength(){ 
      this.$fetchGet("route/baseLineMessage").then(res =>{
        this.lineaData=res.result

      })

       this.$fetchPost("route/composite",{
            cfd:0,   // 重复度
            gjcf:0,
            fzxxs: 0,  // 非直线系数
            cd:0,  // 长度
            bglrc:1000, // 百公里人次
            mzl:0,// 满载率
            ifFilter:false
        },'json').then(res => {
          if(res.code!==500){

            
           this.lineaData1=res.result}
          
        })
    },
    setSz(baseArray){
      let len = baseArray.length;
      let n = 1; //假设每行显示4个
      let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
      let res = [];
      for (let i = 0; i < lineNum; i++) {
          // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
          let temp = baseArray.slice(i*n, i*n+n);
          let art=[]
          temp[0].split(',').forEach(iru=>{
              art.push(parseFloat(iru))
          })
          res.push(art);
      }
      
      return res

    },
    clAllline(){

    }
  }
};
</script>
<style lang="scss">
</style>

<style lang="scss" scoped>
.publicTransport-box {
  box-sizing: border-box;
  // margin-top: vw(70);
 width:100%;
  height:100%;
 
   position:relative;
   .rightlinemsg{
        position: absolute;
    top: vh(440);
    right: vw(20);
    width: vw(370);
    height: vh(588);
    background: url("~@/assets/image/bigline.png");
    background-size: 100% 100%;
     z-index: 10;
       .tit {
      width: 100%;
      height: vh(60);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(80);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-indent: vw(32);
      font-weight: bold;
      display:flex;
      justify-content: space-between;
      box-sizing:border-box;
      padding-right:vw(32);
    }
    .conten-box{
        box-sizing:border-box;
      padding-left:vw(32);
      padding-right:vw(32);
      .ityu{
        margin-top:01vh;
      }
    }
   }
  .leftlinemsg {
    position: absolute;
    top: vh(140);
    left: vw(20);
    width: vw(370);
    height: vh(330);
    background: url("~@/assets/image/msgLine.png");
    background-size: 100% 100%;
     z-index: 10;
    .tit {
      width: 100%;
      height: vh(60);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(80);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-indent: vw(32);
      font-weight: bold;
    }
    .itmsg-box {
      box-sizing: border-box;
      padding: 0 vw(32);
      margin-top: vh(22);
      .itmsg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: vh(16);
        .itmsgs {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .leftlinemsg1 {
    position: absolute;
    top: vh(480);
    left: vw(20);
    width: vw(370);
    height: vh(588);
     z-index: 10;
    background: url("~@/assets/image/bigline.png");
    background-size: 100% 100%;
    flex-direction: column;
    display: flex;
    font-size: vw(17);
    .titbox {
      width: 100%;
      height: vh(58);
      box-sizing: border-box;
      padding: 0 vw(30);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .titboxname {
      display: flex;
      width: vw(180);
      line-height: vh(70);
      height: 100%;

      justify-content: space-between;
      .meay {
        display: block;
        margin-right: vw(20);
        text-align: center;

        cursor: pointer;
      }
      .meay-active {
        border-bottom: vw(2) solid #ffffff;
        font-weight: bold;
        text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
          -0 -0 1.4em rgba(255, 255, 255, 0.7);
      }
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
      height: vh(42);
      // margin-bottom:vh(20);
      margin-top: vh(0);
      cursor: pointer;
    }
    .bttit1:hover {
      background: rgba(93, 137, 255, 0.1);
      color:#2968E8;
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
    }
    .bttit2{
      background: rgba(93, 137, 255, 0.1);
      color:#2968E8;
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

  .lkicon {
    position: absolute;
    top: vh(140);
    right: vw(12);
    width: vw(300);
    height: vh(86);
     z-index: 10;
    background: rgba(26, 66, 118, 0.2);
    border: 1px solid #27b6ff;
    box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset;
    opacity: 0.8;
    border-radius: 2px;
    box-sizing: border-box;
    padding: vh(8) vw(20);
    .lkicon-box {
      display: flex;
      justify-content: space-between;
      margin-top: vh(8);
      .lk1{
        width: vw(60);
        height: vh(10);
        background: #34b000;
        margin-bottom: vh(6);
      }
      .lk2{
        background: #FECB00;
      }
      .lk3{
        background: #FF2A2A;
      }
      .lk4{
        background: #B10400;
      }
      .lkicon-itam {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
