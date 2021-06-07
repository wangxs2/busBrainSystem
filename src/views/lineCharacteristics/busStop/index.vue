<template>
  <div class="busStop-box">
    <div class="search-box">
      <div style="margin-right:0.8vw">行政区域</div>
      <el-select style="margin-right:1.5vw" size="small" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-autocomplete
        class="inline-input"
        size="small"
        v-model="state2"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>

      <div class="clearbtn" style="margin-left:0.8vw">清除</div>
      <div @click="allheat" :class="isheat==2?'rltbtn rltbtn1':'rltbtn'" style="margin-left:1.8vw">热力图</div>  
      <div @click="allpoint" :class="point==1?'rltbtn rltbtn1':'rltbtn'" style="margin-left:1.8vw">站点分布</div>
      <div style="margin-left:1.8vw">站点覆盖区域 </div>
      <div class="qhbtn">
        <div :class="isbtn==iteam.id?'btnnow activebtn':'btnnow' " @click="tobtn(iteam)" v-for="(iteam,n) in typelst" :key="n">{{iteam.name}}</div>
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
          <div>264条</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_2.png" />
            300米站点覆盖面积
          </div>
          <div>4422.75公里</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_3.png" />
            300米站点覆盖率
          </div>
          <div>2.42</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_4.png" />
            300米站点覆盖面积
          </div>
          <div>10.14</div>
        </div>
        <div class="itmsg">
          <div class="itmsgs">
            <img style="margin-right:0.4vw" src="@/assets/image/licon_2.png" />
            300米站点覆盖率
          </div>
          <div>3650.5公里</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "曹路"
        },
        {
          value: "选项2",
          label: "金桥"
        },
        {
          value: "选项3",
          label: "川沙"
        },
        {
          value: "选项4",
          label: "唐镇"
        },
        {
          value: "选项5",
          label: "南汇"
        }
      ],
      value: "",
      state2: "",
      typelst:[
        {
          name:'300米',
          id:1
        },{
          name:'500米',
          id:2
        }
      ],
      isbtn:1,
      point:1,
      isheat:1,
    };
  },
  beforeCreate() {},
  created() {
    this.pointAll()
  },
  mounted() {
    
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      console.log(results)
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
  
    handleSelect(item) {
      console.log(item);
    },
    tobtn(row){
      this.isbtn=row.id
      this.$emit('changefun',{
          isbtn:row.id
      })
    },
    allpoint(){
      if(this.point==1){
        this.point=2
      }else{
        this.point=1
      }
      console.log(this.point)
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
            },2000)
        }
        
      });  

      this.$fetchGet("indicator/stationCoverArea").then(res => {
        console.log(res.result.geo300.num) 
        let arrdata=JSON.parse(res.result.geo300.num)
        let bigDate=[]
        arrdata.forEach(iteam=>{
          let org=[]
          org.push(iteam)
          bigDate.push(org)
        })
         console.log(bigDate)
        this.$store.commit('SET_THREEMAP', bigDate)
        
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
  position: relative;
  z-index: 10;
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(70);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
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
    height: vh(330);
    background: url("~@/assets/image/msgLine.png");
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
