<template>
  <div class="busStop-box">
    <div class="search-box">
      <div style="margin-right:0.8vw">行政区域</div>
      <el-select style="margin-right:1.5vw" clearable  filterable @change="getpatharea" size="small" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.regionName"
          :label="item.regionName"
          :value="item.regionName"
        ></el-option>
      </el-select>
      <el-autocomplete
        class="inline-input"
        size="small"
        v-model="state2"
        :fetch-suggestions="querySearch"
        placeholder="请输入站点"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
      <div class="clearbtn" style="margin-left:0.8vw">清除</div>
      <div @click="allheat" :class="isheat==2?'rltbtn rltbtn1':'rltbtn'" style="margin-left:1.8vw">热力图</div>  
      <div @click="allpoint" :class="point==1?'rltbtn rltbtn1':'rltbtn'" style="margin-left:1.8vw">站点分布</div>
      <div style="margin-left:1.8vw">站点覆盖区域</div>
      <div class="qhbtn">
        <div :class="isbtn==iteam.name?'btnnow activebtn':'btnnow' " @click="tobtn(iteam)" v-for="(iteam,n) in typelst" :key="n">{{iteam.name}}米</div>
      </div>
    </div>
    <div class="leftlinemsg">
      <div class="tit">基本指标</div>
      <div class="itmsg-box">
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_1.png" />
            站点总数
          </div>
          <div>{{listMsg['站点总数']}}个</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_2.png" />
            全区300米覆盖面积
          </div>
          <div>{{Number(listMsg['全区300米覆盖面积']).toFixed(2)}}平方公里</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_3.png" />
            建成区300米覆盖率
          </div>
          <div>{{Number(listMsg['建成区300米覆盖率'])}}</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_4.png" />
            总面积300米覆盖率
          </div>
          <div>{{Number(listMsg['总面积300米覆盖率'])}}</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_2.png" />
            全区500米覆盖面积
          </div>
          <div>{{Number(listMsg['全区500米覆盖面积']).toFixed(2)}}平方公里</div>
        </div>
         <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_3.png" />
            建成区500米覆盖率
          </div>
          <div>{{Number(listMsg['建成区500米覆盖率'])}}</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_4.png" />
            总面积500米覆盖率
          </div>
          <div>{{Number(listMsg['总面积500米覆盖率'])}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCookie,
  delCookie
} from '@/libs/util'
export default {
  components: {},
  data() {
    return {
      options: [],
      restaurants:[],
      value: "",
      state2: "",
      typelst:[
        {
          name:'300',
          id:1
        },{
          name:'500',
          id:2
        }
      ],
      listMsg:{},
      isbtn:-1,
      point:1,
      isheat:1,
      adminArea:[],
      data:[
        [116.40537166077495,39.89448780861658],
        [116.412076,39.899135],
        [116.41191599778595,39.9012153530144],
        [116.410445,39.901759999999996],
        [116.40542400000001,39.89969299999999],
        [116.40537166077495,39.89448780861658]
      ]
    };
  },
  beforeCreate() {},
  created() {
    if(getCookie('reagonName')){
      this.value=getCookie('reagonName')
    }
    
  },
  mounted() {
    this.pointAll()
    this.getAreaLine()
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      results.forEach(iteam=>{
        iteam.value=iteam.stationName
      })
      cb(results);
    },
    createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.stationName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
    handleSelect(iteam) {
      this.$fetchGet("/indicator/stationDetail",{
        code:iteam.stationName,
        direction:iteam.routeDirection
      }).then(res => {
        this.$emit('changefun',{
          stattiondetail:res.result
      })
      })
    },
    tobtn(row){
      this.isbtn=row.name
      this.$emit('changefun',{
          isbtn:row.name
      })
    },
    getpatharea(){
      let arr=[]
      if(this.value==''){
      
         this.$emit('changefun',{
            adminArea:'',
            stationdata:this.restaurants
        })
        delCookie("reagonName")
      }else{
       
        document.cookie = "reagonName=" + this.value;
        let obj={}
        this.options.forEach(iut=>{
          if(iut.regionName==this.value){
            obj=iut
          }
        })
        this.restaurants.forEach(iteam=>{
          if(iteam.regionName==this.value){
            arr.push(iteam)
          }
        })
        
        this.$emit('changefun',{
            adminArea:obj,
            stationdata:arr
        })

      }
      
     
    },
    allpoint(){
      if(this.point==1){
        this.point=2
      }else{
        this.point=1
      }
      this.$emit('changefun',{
          ispoint:this.point
      })
    },
    allheat(){
      if(this.isheat==1){
        this.isheat=2
      }else{
        this.isheat=1
      }
      this.$emit('changefun',{
          isheat:this.isheat
      })
    },
    // getAreaData(){
    //    this.$fetchGet("indicator/stationCoverArea",{
    //     radius:this.isbtn
    //   }).then(res => {
    //     this.listMsg=res.result.res
    //   });

    // },
    getAreaLine(){
      this.$fetchGet("passenger/region").then(res => {
        this.options=res.result
      })
      this.$fetchGet("indicator/stationBasicMessage").then(res => {
        this.listMsg=res.result
      })
    },
    pointAll(){
      this.$fetchGet("indicator/stationList").then(res => {
        if(res.result&&res.result['站点的详细属性']){
          let arr=this.cloneObj(res.result['站点的详细属性']),heatOption = [];
          this.restaurants =this.cloneObj(res.result['站点的详细属性'])
          this.$store.commit('SET_STATION', res.result['站点的详细属性'])
          arr.forEach(iteam=>{
            var heatOptionObj = {};
            heatOptionObj.lng = iteam.longitude;
            heatOptionObj.lat = iteam.latitude;
            heatOption.push(heatOptionObj);
          })
          this.$store.commit('SET_HEATMAP',heatOption)
          setTimeout(()=>{
              this.$store.commit('SET_LOADING',false)
            },500)
        }
      });  


      
     
     
    },
    
  }
};
</script>
<style lang="scss">
</style>

<style lang="scss" scoped>
.busStop-box {
  box-sizing: border-box;
  margin-top: vw(70);
  z-index: 10;
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(76);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
      z-index: 12;
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
    left: vw(20);
    width: vw(370);
    height: vh(420);
    background: url("~@/assets/image/bigline.png");
    background-size: 100% 100%;
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
        margin-bottom: vh(22);
        .itmsgs {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
