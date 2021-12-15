<template>
  <div
    class="operServices"
    v-loading="poloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="operMap" id="operMap"></div>
    <div class="rightlinemsg">
      <div class="tit">匹配线路</div>
      <div class="bttit">
        <div>线路名称</div>
        <div v-if="tlstation[0].isxz">重复系数</div>
        <div v-if="tlstation[1].isxz">百公里人次</div>
        <div v-if="tlstation[2].isxz">满载率</div>
        <div v-if="tlstation[3].isxz">线路长度(km)</div>
        <div v-if="tlstation[4].isxz">非直线系数</div>
        <div v-if="tlstation[5].isxz">轨交重复站数</div>
      </div>
      <div class="tablbox">
        <div
          :class="nowindex==n?'bttit bttit1 bttit2':'bttit bttit1'"
          @click="toDetail(item,n)"
          v-for="(item,n) in lineaData"
          :key="n"
        >
          <div>{{item.lineName}}</div>
          <div v-if="tlstation[0].isxz">{{item.cfd==null?'':item.cfd.toFixed(2)}}</div>
          <div v-if="tlstation[1].isxz">{{item.bglrc}}</div>
          <div v-if="tlstation[2].isxz">{{item.mzl}}</div>
          <div v-if="tlstation[3].isxz">{{item.cd==null?'':item.cd.toFixed(2)}}</div>
          <div v-if="tlstation[4].isxz">{{item.fzxxs==null?'':item.fzxxs.toFixed(2)}}</div>
          <div v-if="tlstation[5].isxz">{{item.gjcf}}</div>
        </div>
      </div>
    </div>

    <div class="rightlinemsg left-box">
      <div style="text-align:left" class="tit">筛选指标</div>
      <div style="font-weight:bold;box-sizing:border-box;padding-left:1vw;margin-top:2vh">线路</div>
      <div class="table-box">
        <div class="table-iteanm" v-for="(iteam,n) in tlstation" :key="n">
          <img
            @click="toShow(iteam,n)"
            v-if="iteam.isxz"
            style="cursor:pointer"
            width="18"
            height="18"
            src="@/assets/image/fxktrue.png"
          />
          <img
            @click="toShow(iteam,n)"
            v-if="!iteam.isxz"
            style="cursor:pointer"
            width="18"
            height="18"
            src="@/assets/image/fxkfalse.png"
          />
          <div class="natit">{{iteam.name}}</div>
          <el-input
            v-if="n!==6&&n!==7&&iteam.isxz"
            style="width:40%"
            type="number"
            @change="getData()"
            size="mini"
            v-model="iteam.value"
            placeholder
          >
            <template slot="prepend">
              <span style="font-size:20px" v-show="iteam.name=='百公里人次'">＜</span>
              <i v-show="iteam.name!=='百公里人次'" class="iconfont icondayufuhao"></i>
            </template>
          </el-input>
        </div>
      </div>

      <div  style="font-weight:bold;box-sizing:border-box;padding-left:1vw;padding-top:2vh;">站点</div>
      <div class="table-box">
        <div class="table-iteanm" style="padding-top:0.5vh" >
          <img
            style="cursor:pointer"
            width="18"
            height="18"
            @click="toZdShow()"
            v-if="zdisxz"
            src="@/assets/image/fxktrue.png"
          />
          <img
            style="cursor:pointer"
            width="18"
            height="18"
            v-if="!zdisxz"
            @click="toZdShow()"
            src="@/assets/image/fxkfalse.png"
          />
          <div class="natit">换乘压力</div>
          <el-input
            style="width:40%"
            type="number"
            @change="getZdData()"
            size="mini"
            v-model="zdvalue"
            placeholder
          >
            <template slot="prepend">
              <i class="iconfont icondayufuhao"></i>
            </template>
          </el-input>
        </div>
      </div>

      <div  style="font-weight:bold;box-sizing:border-box;padding-left:1vw;padding-top:2vh;">道路</div>
      <div class="table-box">
        <div class="table-iteanm" style="padding-top:0.5vh" >
          <img
           v-if="dlisxz"
            style="cursor:pointer"
            width="18"
            height="18" 
             @click="toDlShow()" 
            src="@/assets/image/fxktrue.png"
          />
          <img
          v-if="!dlisxz"
            style="cursor:pointer"
            width="18"
            height="18"
            @click="toDlShow()" 
            src="@/assets/image/fxkfalse.png"
          />
          <div class="natit">长期拥堵路段</div>
        
        </div>
      </div>

    </div>

    <div class="search-box">
      <div style="margin-right:0.6vw;width:3.6vw;">线路名称</div>
      <el-select
        size="small"
        clearable
        filterable
        @change="toDetail1(value)"
        v-model="value"
        placeholder="请选择"
      >
        <el-option
          v-for="(item,index) in lineaData"
          :key="index"
          :label="item.lineName"
          :value="item.lineName"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MyMapper: null,
      polineGroups: new AMap.OverlayGroup(), //线集合
      overlayopi: new AMap.OverlayGroup(),//拥堵路段
      overlayGroups3: new AMap.OverlayGroup(),//车辆可视化街镇集合
      M_InfoWindow: null, //信息窗口
      markerarr: [],
      poloading: true,
      nowindex: -1,
      dlisxz:true,
      hcloca:null,
      hclayer:null,
      zdisxz:true,
      lineaData: [],
      zdvalue:100,
      hvdataall: [],
      lineaData3: [],
      options: [],
      value: "",
      tlstation: [
        {
          name: "线路重复系数",
          value: 0.5,
          isxz: true,
          img: require("@/assets/image/cyan.png")
        },
        {
          name: "百公里人次",
          value: 100,
          isxz: false,
          img: require("@/assets/image/blue1.png")
        },
        {
          name: "满载率",
          value: 0.7,
          isxz: false,
          img: require("@/assets/image/green1.png")
        },
        {
          name: "线路长度",
          value: 30,
          isxz: false,
          img: require("@/assets/image/yellow1.png")
        },
        {
          name: "非直线系数",
          value: 0.2,
          isxz: false,
          img: require("@/assets/image/icon_purple1.png")
        },
        {
          name: "与轨交重复",
          value: 3,
          isxz: false,
          img: require("@/assets/image/icon_red1.png")
        }
        // {
        //   name:'拥堵情况',
        //   value:null,
        //   isxz:false,
        //   img:require('@/assets/image/icon_red1.png')
        // },
        // {
        //   name:'换乘压力',
        //   value:null,
        //   isxz:false,
        //   img:require('@/assets/image/icon_red1.png')
        // }
      ]
    };
  },
  watch: {},
  mounted() {
    this.initMap();
  },
  created() {
    this.getdataline();
    this.gethcData()
    this.getroaddata()
  },
  methods: {
    toLine() {},
    getdataline() {
      this.$fetchGet("route/routeList").then(res => {
        this.options = res.result;
      });
    },
     getroaddata(){
       this.$fetchGet("curve/list").then(res => {
        res.result.forEach(iteam=>{
          iteam.path=[]
          iteam.centerpoint={}
          this.$fetchGet("config-road-paint/list",{
              name:iteam.roadsegid
            }).then(resro => {
              iteam.centerpoint=resro.result[parseInt(resro.result.length/2)]
              iteam.path=resro.result
            })
            this.lineaData3.push(iteam)
        })
         setTimeout(() => {
          this.pointSearch(this.lineaData3)
        }, 2000);
        
      })

    },
    pointSearch(arr) {
      arr.forEach(iteam => {
        
        if(iteam.path.length>0){
          let marker1 = new AMap.Marker({
            content: `<div class="marker_container">
            <span  class="${((iteam.congestIndex>1&&iteam.congestIndex<1.5)||iteam.congestIndex==1)?'green_marker':((iteam.congestIndex<1.8&&iteam.congestIndex>1.5)||iteam.congestIndex==1.5)?'yellow_marker'
            :((iteam.congestIndex<2&&iteam.congestIndex>1.8)||iteam.congestIndex==1.8)?'red_marker':'reds_marker'}"></span>
            </div> `,
            offset: new AMap.Pixel(-6, -6),
            extData: iteam,
            zIndex: 5000,
            cursor:'pointer',
            position: [iteam.centerpoint.pointX, iteam.centerpoint.pointY],
          });
          marker1.on('click', e => {
            
            this.M_getlindata(iteam)
            this.$fetchGet("curve/detail", {
              roadName: iteam.roadsegid
            }).then(res => {
              this.M_openRoad(iteam.centerpoint, res)
            })
  
          })
         
          this.markerarr.push(marker1)
          this.overlayGroups3.addOverlay(marker1)
          this.MyMapper.add(this.overlayGroups3);

        }
       
      })
      
      

    },
    M_getlindata(arrno){

      

      let list = []
      let deviceArr = [];
      arrno.path.map((item,index) => {
          if(deviceArr.indexOf(item.origFid) === -1){
              list.push({
                  windowIdArr: item.origFid,
                  deviceArr: []
              });
              deviceArr.push(item.origFid)
          }
      });
      list.map(item => {
        arrno.path.map(items => {
              if(item.windowIdArr == items.origFid){
              item.deviceArr.push([items.pointX,items.pointY])
              }
          })
      })
      console.log(list);

      this.S_ply(arrno,list)


     
        

    
    },
    M_openRoad(position, res) {
      let infoWin = `<div class="info-win">
      <div class="win-triangle"></div>
      <div class="info-box">
        <div class="info-content">
          <div class="info">
            <div class="info-name">${res.result.description}</div>
          </div>
        </div>
      </div>
    </div>`
      this.M_openInfoWin([position.lng||position.pointX, position.lat||position.pointY], infoWin)
      this.MyMapper.setZoomAndCenter(16, [position.lng||position.pointX, position.lat||position.pointY],true)
     

    },
    S_ply(iteam,arrList){
      let allploy=[]
      if(this.overlayopi){
        this.overlayopi.clearOverlays()
      }
      let colorline=((iteam.congestIndex>1&&iteam.congestIndex<1.5)||iteam.congestIndex==1)?'rgb(22, 206, 149)':((iteam.congestIndex<1.8&&iteam.congestIndex>1.5)||iteam.congestIndex==1.5)?'#ea8900'
      :((iteam.congestIndex<2&&iteam.congestIndex>1.8)||iteam.congestIndex==1.8)?'rgb(216, 3, 4)':'rgb(143, 0, 33)'
      if(this.saLinedata){
        this.MyMapper.remove(this.saLinedata)
      }
      arrList.forEach(itrm=>{
        let saLinedata = new AMap.Polyline({
          path: itrm.deviceArr,
          strokeColor: colorline,
          strokeOpacity: 1,
          strokeWeight: 4,
          cursor: 'pointer',
          strokeStyle: "solid",
          zIndex: 30,
          // map: this.MyMapper,
          extData: iteam
        })


        allploy.push(saLinedata)
        

      })
      this.overlayopi.addOverlays(allploy)
      this.MyMapper.add(this.overlayopi);
      
    },
    //站点的筛选
    toZdShow(){
      this.zdisxz=!this.zdisxz
      if(this.zdisxz){
        this.getZdData()
      }else{
         if(this.hclayer){
          this.hclayer.remove();
        }
      }
    },
    //道路的筛选
    toDlShow(){
      this.dlisxz=!this.dlisxz

      if(this.dlisxz){
        this.overlayGroups3.show()
        
        this.overlayopi.show()
      }else{
        this.overlayGroups3.hide()
        this.overlayopi.hide()
      }
    },
      //获取换乘压力的明细
    gethcData(){
       this.$fetchGet("transfer/avg").then(res => {
         this.hvdataall=res.result
         let arr=[]
        res.result.forEach(iteam=>{
           if(iteam.count>100){
             arr.push(iteam)
           }
        })
          this.localMainhcyl(arr)
       })
      
    },
    getZdData(){

       let arr=[]
        this.hvdataall.forEach(iteam=>{
           if(iteam.count>this.zdvalue){
             arr.push(iteam)
           }
        })
          this.localMainhcyl(arr)

    },
    //换乘压力的数据
    localMainhcyl(datapoint){
      
      if(this.hclayer){
         this.hclayer.remove();
      }
     this.hcloca = new Loca.Container({
          map: this.MyMapper,
      });
      let _events = datapoint;
      
        var list = _events.map(e => {
            let arr =[e.longitude,e.latitude]
            return {
                "type": "Feature",
                "properties": {
                    rawData: e
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": arr
                }
            }
        })
  
        var data = {
            "type": "FeatureCollection",
            "features": list,
        };
          // 拾取测试
        var geo = new Loca.GeoJSONSource({
            data: data,
        });
        this.hclayer = new Loca.IconLayer({
            zIndex: 10,
            opacity: 1,
        });
        this.hclayer.setSource(geo);
        this.hclayer.setStyle({
            unit: 'px',
            icon:require("../../assets/image/icon_gj1.png"),
            iconSize: [32,32],
            rotation: 0,
        })
        this.hcloca.add(this.hclayer);
        this.MyMapper.on('click', (e) => {
          const feat = this.hclayer.queryFeature(e.pixel.toArray());
          if (feat) {
            console.log(feat)
            let strn=feat.properties.rawData

            let infoWin = `<div class="info-win">
            <div class="win-triangle"></div>
            <div class="info-box">
              <div class="info-content">
                <div class="info">
                  <div class="info-name">站名：${strn.stationName}</div>
                </div>
                <div class="info">
                  <div class="info-name">换乘: ${strn.count}</div>
                </div>
              </div>
            </div>
          </div>`
            this.M_openInfoWin([strn.longitude, strn.latitude], infoWin)
           
          }
      });
  
    },
    initMap() {
      this.MyMapper = new AMap.Map("operMap", {
        zoom: 10, // 地图级别
        center: [121.460752,31.011182], // 中心点
        // resizeEnable: true, //监控地图容器尺寸变化
        mapStyle: "amap://styles/d67717253a691e523956e9482ca38f1e",
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
      });
      this.MyMapper.on('click', (e) => {
        this.M_InfoWindow.close()
      });
      this.M_InfoWindow = new AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        content: "",
        anchor: "top-right",
        offset: new AMap.Pixel(-6, -6)
      });
      this.M_zzploy()
      setTimeout(() => {
        this.$store.commit("SET_LOADING", false);
      }, 200);
      this.getData();
    },
     M_zzploy(){
      new AMap.DistrictSearch({
        extensions:'all',
        subdistrict:0
      }).search('浦东新区',(status,result)=>{
          // 外多边形坐标数组和内多边形坐标数组
          var outer = [
              new AMap.LngLat(-360,90,true),
              new AMap.LngLat(-360,-90,true),
              new AMap.LngLat(360,-90,true),
              new AMap.LngLat(360,90,true),
          ];
          var holes = result.districtList[0].boundaries

          var pathArray = [
              outer
          ];
          pathArray.push.apply(pathArray,holes)
          var polygon = new AMap.Polygon( {
              pathL:pathArray,
              strokeColor: '#00eeff',
              strokeWeight: 1,
              fillColor: '#71B3ff',
              fillOpacity: 0.05
          });
          polygon.setPath(pathArray);
          this.MyMapper.add(polygon)
      })
    
    },

    getData() {
      this.poloading = true;
      this.lineaData = [];
      if (this.polineGroups._overlays.length > 0) {
        this.polineGroups.clearOverlays();
      }
      this.$fetchPost(
        "route/composite",
        {
          cfd: this.tlstation[0].value || -1, // 重复度
          gjcf: this.tlstation[5].isxz == false ? -1 : this.tlstation[5].value,
          fzxxs: this.tlstation[4].isxz == false ? -1 : this.tlstation[4].value, // 非直线系数
          cd: this.tlstation[3].isxz == false ? -1 : this.tlstation[3].value, // 长度
          bglrc: this.tlstation[1].isxz == false ? -1 : this.tlstation[1].value, // 百公里人次
          mzl: this.tlstation[2].isxz == false ? -1 : this.tlstation[2].value, // 满载率
          ifFilter: true
        },
        "json"
      ).then(res => {
        if (res.code !== 500) {
          res.result.forEach(ite => {
            ite.geom = this.setData(ite.geom);
          });
          this.lineaData = res.result;
          this.passCorrline(this.lineaData);
        }
        this.poloading = false;
      });
    },
    passCorrline(data) {
      let lines = [];
      data.forEach(iteam => {
        let kyLinedata = new AMap.Polyline({
          path: iteam.geom,
          strokeColor: "#35A594",
          strokeOpacity: 1,
          strokeWeight: 4,
          zIndex: 10,
          cursor: "pointer",
          strokeStyle: "solid",
          extData: iteam
        });

        kyLinedata.on("click", e => {
          e.target.setOptions({
            strokeColor: "#A200FF",
            zIndex: 18
          });
          let num = Math.round(e.target.getPath().length / 2);
          this.setConten(e.target.getPath()[num], e.target.getExtData());
        });
        // kyLinedata.on("mouseout", e => {
        //   e.target.setOptions({
        //     strokeColor: "#35A594",
        //     zIndex: 10
        //   });
        //   this.M_InfoWindow.close();
        // });
        lines.push(kyLinedata);
      });

      this.polineGroups.addOverlays(lines);
      this.MyMapper.add(this.polineGroups);
    },
    setData(data) {
      let str = data.split(" ");
      let arr = [];
      str.forEach(iteam => {
        arr.push([Number(iteam.split(",")[0]), Number(iteam.split(",")[1])]);
      });
      return arr;
    },
    setConten(position, ExtData) {
      let infoWin = `<div class="info-win">
              <div class="win-triangle"></div>
              <div class="info-box">
                <div class="info-content">
                  <div class="info">
                    <div class="info-name">${ExtData.lineName}</div>
                    <div class="info-item"  style="display:${
                      ExtData.cfd == null ? "none" : "block"
                    }">重复系数：${ExtData.cfd == null ? "" : ExtData.cfd}</div>
                    <div class="info-item"  style="display:${
                      ExtData.bglrc == null ? "none" : "block"
                    }">百公里人次：${
        ExtData.bglrc == null ? "" : ExtData.bglrc
      }</div>
                    <div class="info-item" style="display:${
                      ExtData.mzl == null ? "none" : "block"
                    }">满载率：${ExtData.mzl == null ? "" : ExtData.mzl}</div> 
                    <div class="info-item" style="display:${
                      ExtData.fzxxs == null ? "none" : "block"
                    }">非直线系数：${
        ExtData.fzxxs == null ? "" : ExtData.fzxxs
      }</div> 
                    <div class="info-item" style="display:${
                      ExtData.cd == null ? "none" : "block"
                    }">线路长度(km)：${
        ExtData.cd == null ? "" : ExtData.cd
      }</div> 
                  </div>
                </div>
              </div>
            </div>`;
      this.M_openInfoWin(position, infoWin);
    },
    // 打开信息窗口
    M_openInfoWin(pos, info) {
      this.M_InfoWindow.setContent(info);
      this.M_InfoWindow.open(this.MyMapper, pos);
    },
    toDetail(row, index) {
      this.nowindex = index;
      this.polineGroups._overlays.forEach(iteam => {
        if (iteam.getExtData().lineName == row.lineName) {
          iteam.setOptions({
            strokeColor: "#A200FF",
            zIndex: 18
          });
          let num = Math.round(iteam.getPath().length / 2);
          this.setConten(iteam.getPath()[num], row);
          this.MyMapper.setFitView(iteam, true, [120, 200, 60, 100]);
        } else {
          iteam.setOptions({
            strokeColor: "#35A594",
            zIndex: 10
          });
        }
      });
    },
    toDetail1(name) {
      this.polineGroups._overlays.forEach(iteam => {
        if (iteam.getExtData().lineName == name) {
          iteam.setOptions({
            strokeColor: "#A200FF",
            zIndex: 18
          });
          let num = Math.round(iteam.getPath().length / 2);

          this.setConten(iteam.getPath()[num], iteam.getExtData());
          this.MyMapper.setFitView(iteam, true, [120, 200, 60, 100]);
        } else {
          // this.$message.error({
          //   message: '无此线路信息'
          // });
          iteam.setOptions({
            strokeColor: "#35A594",
            zIndex: 10
          });
        }
      });
    },
    toShow(row, n) {
      row.isxz = !row.isxz;
      // if(row.isxz){

      // }
      this.getData();
    },
    //输入框的数值发生改变的时候
    getChangeData(row) {
      // if(row.isxz){
      //   this.getData()
      // }else{
      //   return
      // }
    }
  }
};
</script>
<style lang="scss">
#operMap {
   .marker_container{
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: relative;
  }
 .red_marker,.green_marker,.yellow_marker,.reds_marker{
    width: 2px;
    height: 2px;
    display: block;
    background: #ffffff;
    border-radius: 100%;
    
  }
  .red_marker{
    box-shadow:0 0 0 3px rgb(216 3 4 / 75%), 0px 0 0 6px rgb(216 3 4 / 58%);
  }
  .green_marker{
    box-shadow:0 0 0 3px rgb(22 206 149 / 75%), 0px 0 0 6px rgb(22 206 149 / 58%);
  }
  .yellow_marker{
    box-shadow:0 0 0 3px rgb(224 158 0 / 75%), 0px 0 0 6px rgb(243 152 0 / 58%);
  }
  .reds_marker{
    box-shadow:0 0 0 3px rgb(143 0 33 / 75%), 0px 0 0 6px rgb(143 0 33 / 58%);
  }
  // .green_marker:after,.yellow_marker:after,
 .red_marker:after,.reds_marker:after{
   content:'';
   display:block;
   width:2000%;
   height: 2000%;
   border-radius:100%;
   animation:scaleHide 3s ease 0s infinite;
   top:-974%;
   left:-955%;
   position:relative;
   z-index:-1;
   opacity: 0;
 }
.yellow_marker:after{
  background:#ea8900;
}
.red_marker:after{
   background: rgb(216, 3, 4);
}
.green_marker:after{
  background: rgb(22, 206, 149);
}
.reds_marker:after{
   background: rgb(143, 0, 33);
}
  
 @-webkit-keyframes scaleHide{0%{transform:scale(0.1,0.1);opacity:1}100%{transform:scale(1,1);opacity:.05}}
  .amap-marker-label {
    background-color: transparent !important;
    border: none !important;
  }
  .info-win {
    padding-right: vw(20);
    position: relative;
    .win-triangle {
      position: absolute;
      top: 0;
      right: vw(16);
      width: vw(20);
      height: vw(20);
      transform: skewX(-45deg);
      background: rgba(1, 11, 66, 1);
      border: 1px solid rgba(45, 125, 241, 1);
    }
    .info-box {
      background: rgba(1, 11, 66, 1);
      border: 1px solid rgba(45, 125, 241, 1);
      border-radius: 4px;
      .info-content {
        position: relative;
        background: rgba(1, 11, 66, 1);
        border-radius: 4px;
        padding: vh(12) vw(16) vh(10) vw(10);
        color: #fff;
        .icon {
          width: vw(98);
          height: vw(88);
          background: #000;
          margin-right: vw(10);
          float: left;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          width: vw(180);
          min-height: vh(108);
          .info-name {
            font-size: vw(16);
            font-weight: bold;
            margin-bottom: vw(12);
          }
          .info-item {
            font-size: vw(14);
            line-height: vw(20);
            margin-top: vw(6);
          }
        }
      }
    }
  }
}

.operServices {
  .el-input__inner {
    background: rgba(26, 66, 118, 0.2) !important;
    color: #dae4ff !important;
    border: 1px solid #27b6ff !important;
    // box-shadow: 0px 0px vh(6) rgba(39, 182, 255, 0.8) inset !important;
    border-left: none !important;
    padding-left: 0 !important;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    border: 1px solid #27b6ff !important;
    background: rgba(26, 66, 118, 0.2) !important;
    color: #dae4ff !important;
    padding: 0 vw(6) !important;
    border-right: none !important;
  }
}
</style>
<style lang="scss" scoped>
.operServices {
  width: 100%;
  height: 100%;
  background: #000000;
  position: relative;
  .operMap {
    width: 100%;
    height: 100%;
  }
  .marker_container {
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: relative;
  }
  .yellow_marker {
    width: 2px;
    height: 2px;
    display: block;
    background: #ffffff;
    border-radius: 100%;
    box-shadow: 0 0 0 3px rgb(224 158 0 / 75%), 0px 0 0 6px rgb(243 152 0 / 58%);
  }

  .yellow_marker:after {
    content: "";
    display: block;
    width: 2000%;
    height: 2000%;
    border-radius: 100%;
    background: #ea8900;
    animation: scaleHide 3s ease 0s infinite;
    top: -974%;
    left: -955%;
    position: relative;
    z-index: -1;
    opacity: 0;
  }
  @-webkit-keyframes scaleHide {
    0% {
      transform: scale(0.1, 0.1);
      opacity: 1;
    }
    100% {
      transform: scale(1, 1);
      opacity: 0.05;
    }
  }
  //  .scaleHide{
  //    position: relative;
  //    margin-left: 50%;
  //    line-height: 20px;
  //    top: 50%
  //  }
  //  .css3delay4:after{
  //    animation-delay:.4s!important;
  //  }
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(160);
    left: vw(20);
    display: flex;
    z-index: 10;
    align-items: center;
    color: #dae4ff;
  }
  .rightlinemsg {
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
      text-align: center;
      font-weight: bold;
      box-sizing: border-box;
      padding: 0 vw(20);
      border-bottom: 1px solid rgba(69, 120, 255, 0.6);
    }
    .bttit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      color: #ffffff;
      padding: vh(10) vw(20);
      padding-left: vw(0);
      font-size: vw(16);
      margin-top: vh(16);
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.1) 10%,
        rgba(35, 198, 200, 0.2) 20%,
        rgba(35, 198, 200, 0.4) 30%,
        rgba(35, 198, 200, 0.5) 40%,
        rgba(35, 198, 200, 0.5) 50%,
        rgba(35, 198, 200, 0.5) 60%,
        rgba(35, 198, 200, 0.4) 70%,
        rgba(35, 198, 200, 0.3) 80%,
        rgba(0, 0, 0, 0) 90%,
        rgba(0, 0, 0, 0) 100%
      );
      div {
        flex: 1;
        text-align: center;
        margin-left: vw(20);
      }
    }
    .bttit1 {
      // padding:0;
      width: 100%;
      height: vh(42);
      // margin-bottom:vh(20);
      color: #ffffff;
      margin-top: vh(0);
      cursor: pointer;
      font-size: vw(16);
      background: none;
    }
    .bttit1:hover {
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
      color: #27b6ff;
      font-weight: bold;
    }
    .bttit2 {
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
      color: #27b6ff;
      font-weight: bold;
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
  .left-box {
    position: absolute;
    top: vh(260);
    left: vw(20);
    width: vw(314);
    // height: vh(480);
    box-sizing: border-box;
    padding-bottom: vh(12);
    .table-box {
      flex-direction: column;
      display: flex;
      box-sizing: border-box;
      padding-left: vw(20);
      .table-iteanm {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding-top: vh(20);
        img {
          margin-right: vw(6);
        }
        .natit {
          display: inline-block;
          width: 6.6vw;
        }
      }
    }
  }
}
</style>
