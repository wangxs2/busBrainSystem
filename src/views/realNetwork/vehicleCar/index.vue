<template>
  <div class="vehicleCarbox" id="vehicle">
    <div class="search-box">
      <div style="margin-right:0.8vw">行政区域</div>
      <el-select style="margin-right:1.5vw" clearable  filterable size="small" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.regionName"
          :label="item.regionName"
          :value="item.regionName"
        ></el-option>
      </el-select>
      <!-- <div @click="allheat" :class="isheat==2?'rltbtn rltbtn1':'rltbtn'" style="margin-left:1.8vw">热力图</div>   -->
      <div @click="allpoint" :class="point==1?'rltbtn rltbtn1':'rltbtn'" style="margin-left:1.8vw">数据统计</div>
    </div>
    <div v-if="point==1" class="leftlinemsg">
      <div class="tit">
        <div class="titw">浦东公交车辆库总数</div>
        <div>4326辆</div>
      </div>
      <div class="boeline"></div>
      <div class="itmsg-box">
        <div class="itmsg">
          <div class="itmsgs">
            <i slot="prefix" class="iconfont iconIOTtubiao_huabanfuben" ></i>
            今日平均计划配置数
          </div>
          <div>0</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
           <i slot="prefix" class="iconfont iconhuaban-" ></i>
           今日运营车辆总数
          </div>
          <div>0</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
           <i slot="prefix" class="iconfont iconswticongongjiaoche1" ></i>
            当前运营车辆数
          </div>
          <div>0</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <i slot="prefix" class="iconfont iconpiechart" ></i>
            运营率
          </div>
          <div>0</div>
        </div>
    
      </div>
    </div>
    <div v-if="point==1" class="leftlinemsg leftlinemsg1">
      <div class="tit">
        <div class="titw">存在历史定位车辆总数</div>
        <div>4326辆</div>
      </div>
      <div class="boeline"></div>
      <div class="itmsg-box">
        <div class="itmsg">
          <div class="itmsgs">
            <i slot="prefix" class="iconfont iconzhankaizhedie" ></i>
            车辆活跃数
          </div>
          <div>0</div>
        </div>
        <div class="itmsg" style="margin-bottom:2.8vh">
          <div class="itmsgs">
          <i slot="prefix" class="iconfont iconpiechart" ></i>
           车辆活跃率
          </div>
          <div>0</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <i slot="prefix" class="iconfont iconlocationdingwei" ></i>
            车辆数定位数
          </div>
          <div>0</div>
        </div>
        <div class="itmsg" style="margin-bottom:2.8vh">
          <div class="itmsgs">
            <i slot="prefix" class="iconfont iconpiechart" ></i>
            车辆定位率
          </div>
          <div>0</div>
        </div>

        <div class="itmsg">
          <div class="itmsgs">
           <i slot="prefix" class="iconfont iconyunyingzhongxin" ></i>
            车辆运营数
          </div>
          <div>0</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <i slot="prefix" class="iconfont iconpiechart" ></i>
            车辆运营率
          </div>
          <div>0</div>
        </div>
    
      </div>
    </div>
  </div>
</template>

<script>
import MapMixin from '../../networkExcellent/networkMap'
export default {
  mixins: [MapMixin],
  data() {
  return {
    options: [],
    value:"",
    point:1,
    isheat:1,
    carSearch:{
      leftlon:null,
      rightlon:null,
      leftlat:null,
      rightlat:null,
      zoom:0,
    },
  }
  },
  created(){
      this.getAreaLine()
  },
   mounted(){
     this.M_initMap('vehicle')
     this.M_map.setZoom([12,20])
     this.M_setZoomAndCenter([121.473658,31.230378],12)
     this.M_map.on('moveend',(e)=>{
      this.carSearch.leftlon=e.target.getBounds().southWest.lng
      this.carSearch.rightlon=e.target.getBounds().northEast.lng
      this.carSearch.leftlat=e.target.getBounds().northEast.lat
      this.carSearch.rightlat=e.target.getBounds().southWest.lat
      this.carSearch.zoom=Math.round(e.target.getZoom())
      if(this.carSearch.zoom>13){
        this.overlayGroups2.show()
      }else{
        this.overlayGroups2.hide()
      }
      this.getData()
      
    })
  
   },
  methods:{
      allpoint(){
      if(this.point==1){
        this.point=2
      }else{
        this.point=1
      }
      
    },
    allheat(){
      if(this.isheat==1){
        this.isheat=2
      }else{
        this.isheat=1
      }
    },
    getAreaLine(){
      this.$fetchGet("passenger/region").then(res => {
        this.options=res.result
        setTimeout(()=>{
        this.$store.commit('SET_LOADING',false)
        },200)
        this.M_setAreas(this.options)
      })
    },
    getData(){
      this.$fetchGet("gps/list",this.carSearch).then(res => {
        if(res.result&&res.result.length>0){
           if(this.carSearch.zoom>11&&this.carSearch.zoom<16){
              this.M_setAreasPoint(res.result)
              this.pointEvent()
            }
            if(this.carSearch.zoom>15){
              this.M_addPoint(res.result)
              this.pointEvent()
            }

        }
      })
    },
    pointEvent(){
      this.M_addGroupEvent((str,type)=>{
          if(type==2){
            console.log(7889)
            let content=`
            <div class="myinfobox1">
       
              <div class="line-lsi">
                <div class="tithear">车辆编号:</div>
                <div style="flex:1;text-align:right">${str.routeName}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">车牌号码:</div>
                <div style="flex:1;text-align:right">${str.plateNum}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">站点名称:</div>
                <div style="flex:1;text-align:right">${str.stationName}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">线路名称:</div>
                <div style="flex:1;text-align:right">${str.routeName}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">开往方向:</div>
                <div style="flex:1;text-align:right">${str.routeDirection}</div>
              </div>
              <div class="line-lsi">
                <div class="tithear">更新时间:</div>
                <div style="flex:1;text-align:right">${this.$moment(str.updateTime).format("YYYY-MM-DD hh:mm:ss")}</div>
              </div>
            </div>
              
            `
            this.M_InfoWindow.setAnchor('bottom-center')
            this.M_openInfoWin([str.lng,str.lat],content)

          }else{
            this.M_setZoomAndCenter(str.centre,16)
            this.getData()
          }
        
      })

    }
  }

  
}
</script>
<style lang="scss">
.vehicleCarbox{
  .regionMark{
    width: vw(178);
    height: vw(178);
    border-radius:50%;
    background-size: contain;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .myinfobox1{
    width: vw(346);
    height:vw(308);
    background: url("~@/assets/image/tk_bj.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: vh(34) vw(26);
    font-size: vw(16);
    padding-top: vh(50);
    display: flex;
    flex-direction: column;
    .line-lsi{
      display: flex;
      justify-content: flex-start;
      width: 100%;
      flex: 1;
      .tithear{
        width: vw(80);
        height:vh(20);
        display: inline-block;
      }
    }
   
  }

}



</style>
<style lang="scss" scoped>
.vehicleCarbox{
   width:100%;
  height:100%;
  position: relative;
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(140);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
    z-index: 10;
    .clearbtn{
      width: vw(60);
      height: vh(32);
      background: rgba(69, 120, 255, 0.35);
      border: 1px solid rgba(39, 182, 255, 0.5);
      border-radius: 2px;
      text-align:center;
      line-height:vh(32);
      cursor:pointer;
    }
    .clearbtn:active{
      background: rgba(69, 120, 255, 0.6);
    }
    .rltbtn{
      width: vw(80);
      height: vh(34);
      background: rgba(26, 66, 118, 0.2);
      border: 1px solid #27B6FF;
      border-radius: vw(18);
       box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset;
       text-align:center;
      line-height:vh(34);
      cursor:pointer;

    }
    .rltbtn:active{
      background: rgba(26, 66, 118, 0.8);
    }
    .rltbtn1{
      background: #4578FF;
      color:#ffffff;
    }
    .rltbtn2{
      background: #4578FF;
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
 .leftlinemsg {
    position: absolute;
    top: vh(145);
    right: vw(20);
    width: vw(370);
    height: vw(275);
    background: url("~@/assets/image/bjk.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    padding:0 vw(24);
     z-index: 10;
    .tit {
      width: 100%;
      height: vw(60);
      font-size: vw(17);
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      // padding:0 vw(24);
      padding-top:vh(10);
      .titw{
        text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
          -0 -0 1.4em rgba(255, 255, 255, 0.7);
        font-weight: bold;
      }
    }
    .boeline{
      width: 100%;
      height: 1px;
      background: #00FFFF;
      opacity: 0.5;
    }
    .itmsg-box {
      box-sizing: border-box;
      // padding: 0 vw(32);
      margin-top: vh(22);
      .itmsg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: vh(28);
        .itmsgs {
          display: flex;
          align-items: center;
          i{
            font-size:vw(19);
            color:#5D89FF;
            margin-right:vw(8);
          }
        }
      }
    }
    
  }
  .leftlinemsg1 {
      top: vh(460);
      height:vw(332);
      .itmsg-box{
        .itmsg{
          margin-bottom: vh(12);
        }
      }
      
  }
}

</style>
