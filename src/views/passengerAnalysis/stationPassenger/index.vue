<template>
  <div class="stationPassenger" id="stationPassenger">
    <div class="search-box">
      <div style="margin-right:0.6vw;width:3vw;">时间</div>
      <el-date-picker
        v-model="value1"
        size="small"
        type="daterange"
        range-separator="至"
        @change="getAllData()"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <div style="margin-right:0.6vw;margin-left:1.8vw;width:3vw;">站点</div>
      <el-autocomplete
        class="inline-input"
        style="width:12vw"
        size="small"
        v-model="state2"
        :fetch-suggestions="querySearch"
        placeholder="请输入站点"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
      <div style="margin-right:0.6vw;margin-left:1.8vw;width:3vw;">时段</div>
      <el-select size="small" @change="getAllData()" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </div>

    <div class='stationBox'>
      <div class="tit">
        <div class="fonq">站点客流信息</div>
        <div>2021-04-10</div>
      </div>
      <!-- <div class="stationnum">
        <div style="display:flex;align-items: center;">
          <img style="margin-right:0.4vw" src="@/assets/image/licon_1.png" /> 站点总数
        </div>
        <div>4124个</div>
      </div> -->
      <div class="tlList" v-for="(iteam,n) in tlstation" :key="n">
        <div style="display:flex;align-items: center;">
            <img @click="toShow(iteam,n)" v-if="iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxktrue.png" />
            <img @click="toShow(iteam,n)" v-if="!iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxkfalse.png" />
            <img width="20" height="20" style="margin:0 0.2vw" :src="iteam.img" />
            乘车{{iteam.name}}
        </div>
        <div><span style="color:#00FFFF">{{iteam.zsnum}}</span>个</div>
        <!-- <div><span style="color:#00FFFF">{{stationroll[iteam.value]==undefined?0:stationroll[iteam.value].length}}</span>个</div> -->
      </div>
      <div style="margin-top:1.4vh;display:flex;align-items: center;color:#00FFFF;font-weight: bold;">
        <img @click="toheat()" v-if='isheat' style="margin-right:0.4vw" width="18" height="18" src="@/assets/image/fxktrue.png" />
        <img @click="toheat()" v-if='!isheat' style="margin-right:0.4vw" width="18" height="18" src="@/assets/image/fxkfalse.png" />
         热力图
      </div>
    </div>


    <div class="erach-box" id="echstation"  
      v-loading="echload"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"></div>



  </div>
</template>

<script>
import Map from "../passengerMap.js";
let MyMap = null; // 地图实例
export default {
     data(){
        return {
          echload:true,
          options:[
            {
              name:'工作日',
              value:1
            },{
               name:'双休日',
              value:2
            }
          ],
          value1:[new Date().getTime() - 3600 * 1000 * 24 * 7,new Date()],
          value:'',
          state2:'',
          allStation:[],
          styleStition:{
            '0-500':{
                    url: require('@/assets/image/cyan.png'),
                    anchor: new AMap.Pixel(6,6),
                    size: new AMap.Size(11,11)
                  },
            '500-1000':{
                    url: require('@/assets/image/blue1.png'),
                    anchor: new AMap.Pixel(6,6),
                    size: new AMap.Size(11,11)
                  },
            '1000-2000':{
                    url: require('@/assets/image/green1.png'),
                    anchor: new AMap.Pixel(6,6),
                    size: new AMap.Size(11,11)
                  },
            '2000-3000':{
                    url: require('@/assets/image/yellow1.png'),
                    anchor: new AMap.Pixel(6,6),
                    size: new AMap.Size(11,11)
                  },
            '3000-4000':{
                    url: require('@/assets/image/icon_purple1.png'),
                    anchor: new AMap.Pixel(6,6),
                    size: new AMap.Size(11,11)
                  },
            '4000+':{
                  url: require('@/assets/image/icon_red1.png'),
                    anchor: new AMap.Pixel(6,6),
                    size: new AMap.Size(11,11)
            }
          },
          tlstation:[
            {
              name:'0-500',
              value:'0-500',
              isxz:true,
              img:require('@/assets/image/cyan.png'),
              zsnum:6754,
            },
            {
              name:'501-1000',
              value:'500-1000',
              isxz:true,
              img:require('@/assets/image/blue1.png'),
              zsnum:38,
            },
            {
              name:'1001-2000',
              value:'1000-2000',
              isxz:true,
              img:require('@/assets/image/green1.png'),
              zsnum:4,
            },
            {
              name:'2001-3000',
              value:'2000-3000',
              isxz:true,
              img:require('@/assets/image/yellow1.png'),
              zsnum:0,
            },
            {
              name:'3001-4000',
              value:'3000-4000',
              isxz:true,
              img:require('@/assets/image/icon_purple1.png'),
              zsnum:0,
            },
            {
              name:'4000+',
              value:'4000+',
              isxz:true,
              img:require('@/assets/image/icon_red1.png'),
              zsnum:0,
            }
          ],
          stationroll:{},
          isheat:false,
          idName:'',
          restaurants:[],
        }
    },
    created() {
      this.getAllData()
      this.getechdata()
    },
    watch:{
    },
    mounted() {
      MyMap = new Map({ el: "stationPassenger" });
      this.$nextTick( ()=> {
           $(".passengerAnalysis").on("click", ".unclick-stations-lis", e => {
             console.log($(e.target).data("code"))
            this.testroute($(e.target).data("code"))
          })
      })

    },
    methods: {
      initechart(data,data1){
          this.myChart = this.$echarts.init(document.getElementById('echstation'));
          this.myChart.setOption({
            grid:{
              top:60,
              left:80,
              right:40,
              bottom:60,
            },
            tooltip:{
              trigger: 'axis',
              formatter:'客流量：{c}人次',
              backgroundColor:'#144A8C',
              borderWidth:0,
              textStyle:{
                color:'#D9EFFF',
              }
            },
            title:{
              text:"客流量/人次",
              textStyle:{
                color:'#DAE4FF',
                fontWeight:'normal',
                fontSize:16,
                
              },
              top:26,
              left:10,
            },
            color:['#836DF0'],
            xAxis: {
                type: 'category',
                boundaryGap:false,
                axisLabel:{
                  interval:0,
                  rotate:25 ,
                  color:"#D9EFFF",
                  borderType:"dashed",
                  borderColor:"#194F95",
                
                },
                axisTick: {
                  show:false
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                    color:'#194F95',
                    type:'dashed'
                  }
                },
                axisLine:{
                  lineStyle:{
                    color:'#194F95',
                    type:'dashed'
                  }
                },
                data: data
            },
            yAxis: {
            
                type: 'value',
                axisLabel:{
                  color:"#D9EFFF",
                  borderType:"dashed",
                  borderColor:"#194F95",
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                    color:'#194F95',
                    type:'dashed'
                  }
                },
                
            },
            series: [{
                data:data1,
                type: 'line',
                smooth: true ,
                legendHoverLink: true ,
                showSymbol:false,
                symbolSize: 10,
                areaStyle: {
                  color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(131, 109, 240, 0.7)' // 0% 处的颜色
                        },
                        {
                            offset: 0.08, color: 'rgba(131, 109, 240, 0.7)' // 100% 处的颜色
                        },
                        {
                            offset: 1, color: 'rgba(131, 109, 240, 0)' // 100% 处的颜色
                        }
                        ],
                        global: false // 缺省为 false
                  }
                }
            }]
          });
          this.echload=false
      },
      getechdata(){
        let arr=[],arr1=[]
        this.$fetchGet("passenger/dailyPassenger").then(res=>{
          res.result.forEach(iteam=>{
            arr.push(iteam.date)
            arr1.push(iteam.sum)
          })
          this.initechart(arr,arr1)
        })
      },

      testroute(val){
        this.$router.push({
          path:'/passengerAnalysis/linePassenger',
            query:{
              idName:val
            }
          });
      },
      getAllData(){
        this.$store.commit('SET_LOADING',true)
          this.$fetchGet("passenger/all",{
            st:this.$moment(this.value1[0]).format("YYYY-MM-DD"),
            et:this.$moment(this.value1[1]).format("YYYY-MM-DD"),
            type:this.value
          }).then(res => {
            let arrheat=[]
            this.stationroll=res.result
             for(let key  in this.stationroll){
                this.stationroll[key].forEach(station=>{
                  arrheat.push({
                    lng: station.lnglat[0],
                    lat: station.lnglat[1],
                    count: station.sd,
                  })
                })
              }
            // this.$store.commit('SET_HEATSTATION', arrheat)
            // this.$store.commit('SET_KLSTATION', res.result)
            // MyMap.xrhld(key,val[key],this.styleStition[key])
            MyMap.zdklMapOption.heat.setDataSet({data: arrheat, max: 100})
             MyMap.zdklMapOption.heat.hide()
            for(let key  in res.result){
              MyMap.xrhld(key,res.result[key],this.styleStition[key])
            }
            setTimeout(()=>{
              this.$store.commit('SET_LOADING',false)
            },500)
          })

      },
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
          // this.$emit('changefun',{
          //     stattiondetail:res.result
          // })
        })
      },
      toheat(){
        this.isheat=!this.isheat
        this.isheat==true?MyMap.zdklMapOption.heat.show():MyMap.zdklMapOption.heat.hide()
      },
      toShow(row,index){
        this.tlstation[index].isxz=!this.tlstation[index].isxz
        if(row.isxz){
          MyMap.zdklMapOption.mass[row.value].show()
        }else{
          MyMap.zdklMapOption.mass[row.value].hide()
        }
      }
        
    }
};
</script>
<style lang="scss" scoped>
.stationPassenger{
  width:100%;
  height:100%;
  // box-sizing: border-box;
  // position: absolute;
  // z-index: 100;
  // left:0;
  // top: vh(70);
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(130);
    left: vw(20);
    display: flex;
    z-index:10;
    align-items: center;
    color: #dae4ff;
  }
  .stationBox{
    position: absolute;
    top: vh(170);
    right: vw(20);
    width: vw(300);
    z-index:10;
    // height: vh(424);
    background: rgba(26, 66, 118, 1);
    border: 1px solid rgba(39, 182, 255, 0.5);
    border-radius: 2px;
    display:flex;
    flex-direction: column;
    box-sizing:border-box;
    padding:vh(16) vw(17);
    box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 0.6) inset;
    .tit{
      display:flex;
      justify-content: space-between;
       align-items: center;
       width:100%;
       height:vh(50);
       border-bottom:1px solid rgba(0, 255, 255, 0.3);
       .fonq{
        font-size: vw(17);
        color: #ffffff;
        text-shadow: 0 0 1.2em #2054D3,
          -0 -0 1.4em rgba(255, 255, 255, 0.7);
        font-weight: bold;
       }
    }
    .stationnum{
      display:flex;
      justify-content: space-between;
       align-items: center;
      width: 100%;
      height: vh(44);
      background: linear-gradient(90deg, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.3) 50%, rgba(0, 255, 255, 0) 100%);
      border-radius: 2px;
      color: #FFFFFF;
      margin-top:vh(12);
      

    }
    .tlList{
      display:flex;
      justify-content: space-between;
       align-items: center;
       margin-top:vh(20);
    }

  }
   .erach-box{
    position: absolute;
    bottom: vh(20);
    left: vw(20);
    width:vw(1880);
    height:vh(312);
    z-index:10;
    background: url("~@/assets/image/zdbj.png");
    background-size: 100% 100%;

  }

}
</style>