<template>
  <div class="busModel">
    <div class="search-box">
        <div style="display:flex; align-items: center;">
            <div style="margin-right:0.6vw;white-space: nowrap">公交站点</div>
            <el-autocomplete
                style="width:75%"
                class="inline-input"
                size="small"
                v-model="stationName"
                :fetch-suggestions="querySearch"
                placeholder="请输入站点"
                :trigger-on-focus="false"
                @select="handleSelect"
            ></el-autocomplete>
            <div style="margin-right:0.6vw;margin-left:1.6vw;white-space: nowrap">行驶方向</div>
            <el-select style="width:75%" size="small" filterable @change="get_30_day()"  v-model="direction" placeholder="请选择">
                <el-option
                v-for="(item,n) in directionlist"
                :key="n"
                :label="item.name"
                :value="item.direction">
                </el-option>
            </el-select>
        </div>
        <div style="display:flex; align-items: center;">
            <div @click="chagetop(1)" :class="noeindex==1?'topfont topfontac':'topfont'">
                <i style="font-size:22px" class="iconfont iconrili" ></i>
                日历图
            </div>
            <div @click="chagetop(2)"  :class="noeindex==2?'topfont topfontac':'topfont'">
                <i style="font-size:22px" class="iconfont iconsignal-fill" ></i>
                柱状图
            </div>
        </div>
    </div>
    <div class="cancelbox" v-show="stcecar.length!==0&&noeindex==1">
        <div class="cancelhead">
            <div v-for="(item,index) in weekdate" :key="index">{{item}}</div>

        </div>
        <div class="cancelbody">
            <div v-for="(iteam,i) in stcecar"  :class="i==30?'canite canite1':i>30?'canite canite2':((i>6&&i<14)||(i>20&&i<28))?'canite canite3':'canite'">
                <div>{{iteam.date}}</div>
                <div class="noe">{{iteam.countPassenger}}</div>
                <div>客流人数</div>
            </div>
            <!-- <div style="width:100%;margin-top:10vh;text-align:center" v-if="stcecar.length==0">暂无数据~</div> -->
        </div>

    </div>
    <div class="lenglist" v-show="stcecar.length!==0&&noeindex==2">
        <div class="lengbox"></div> <div>历史客流数据</div>
        <div class="lengbox lengbox1"></div> <div>实时客流数据</div>
        <div class="lengbox lengbox2"></div> <div>未来七天客流预测</div>
    </div>
    <div style="width:100%;margin-top:10vh;text-align:center" v-if="stcecar.length==0">暂无数据~</div>
    <div class="echartsox" id="echartsox" v-show="stcecar.length!==0&&noeindex==2">
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return{
        value:'',
        noeindex:2,
        myChart:null,
        weekNames:["周一","周二","周三","周四","周五","周六","周日"],
        weekdate:[],
        allData:[],
        value1:[new Date().getTime() - 3600 * 1000 * 24 * 30,new Date()],
        stcecar:[],
        directionlist:[
            {
                direction:0,
                name:'上行'
            },
            {
                direction:1,
                name:'下行'
            }
        ],
        direction:0,
        stationName:'东方路蓝村路',
        latcace:[],
        restaurants:[]

    }

  },
  created() {
    
    this.pointAll()
    this.get_30_day()
    this.initweek()
  },
  mounted(){
      window.onresize = ()=> {
        this.myChart.resize()
      }
  },
  methods:{
    chagetop(type){
        this.noeindex=type
    },
    initweek(){
        let newd=this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format("YYYY-MM-DD")
        let newd1=this.getWeek(newd)
        var index = this.weekNames.findIndex(item=> item===newd1);
        this.weekdate=this.reSort(this.weekNames,index)
    },
    pointAll(){
        this.$fetchGet("indicator/stationList").then(res => {
            if(res.result&&res.result['站点的详细属性']){
                this.restaurants =this.cloneObj(res.result['站点的详细属性'])
                this.$store.commit('SET_LOADING',false)
            }
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
    //   this.$fetchGet("/indicator/stationDetail",{
    //     code:iteam.stationName,
    //     direction:iteam.routeDirection
    //   }).then(res => {
    //     this.$emit('changefun',{
    //       stattiondetail:res.result
    //   })
    //   })
    this.stationName=iteam.stationName
    this.get_30_day()
    },
    getData(){
        // this.stcecar=[]
        this.$fetchGet("passenger/sklearn",{
            st:this.$moment(this.value1[0]).format("YYYY-MM-DD"),
            et:this.$moment(this.value1[1]).format("YYYY-MM-DD"),
            stationName:this.stationName,
            direction:this.direction
        }).then(res => {
            if(res.result.length==0){
                console.log(456)
                this.stcecar=[]
                this.$echarts.init(document.getElementById('echartsox'));

            }else{
                console.log(555)
                let arr=[],arr1=[]
                this.stcecar.forEach(iteam=>{
                    res.result.forEach(item=>{
                        if(iteam.date==item.passengerDate){
                            iteam.countPassenger=item.countPassenger
                        }
                    })
                    iteam.date=iteam.date.split('-')[1]+'月'+iteam.date.split('-')[2]+'日'
                    arr.push(iteam.date)
                    arr1.push(iteam.countPassenger)

                
                })
                console.log(this.stcecar)
                this.initechart(arr,arr1)

            }
           
        })

    },
    //星期天排序
    reSort(arr,index){
        index = index || 0;
        if( !arr || arr.length === 0 || index > arr.length ) return arr;
        var front = arr.slice(0,index);
        var end = arr.slice(index);
        return end.concat(front);
    },
    //获取当前是周几
    getWeek(dateString) {
        var dateArray = dateString.split("-");
        let date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
        return "周" + "日一二三四五六".charAt(date.getDay());
    },
      //获取日历
    getCalendar(){

    },
    get_30_day (){
        this.stcecar=[]
        var thrityMonth = [];
        var thrityMonth1 = [];
        for (var i = 0; i < 31; i++) {
         thrityMonth.unshift(this.$moment(new Date(new Date().setDate(new Date().getDate() - i))).format("YYYY-MM-DD"))
        }
        for (var i = 1; i < 8; i++) {
         thrityMonth1.unshift(this.$moment(new Date(new Date().setDate(new Date().getDate() + i)).toLocaleDateString()).format("YYYY-MM-DD"))
        }
       
        let oiu=thrityMonth1.reverse()
        let arr=thrityMonth.concat(oiu)
        arr.forEach(iteam=>{
             let obj={
                date:iteam,
                countPassenger:1000
            }
            this.stcecar.push(obj)
        })
        this.getData()
    },
    initechart(arr,arr1){
        let setdate=[]
        arr1.forEach((iteam,index)=>{
             let obj={
                value:Math.abs(iteam),
                itemStyle:{
                    color:'rgba(218, 228, 255, 0.8)',
            
                }
            }
            if(index==30){
                obj.itemStyle.color="#0077F0"
            }else if(index>30)(
                obj.itemStyle.color="#00FFFF"
            )
            setdate.push(obj)

        })
        this.myChart = this.$echarts.init(document.getElementById('echartsox'));
        this.myChart.setOption({
            tooltip: {
                show:false,
            //    backgroundColor:'#144A8C',
            //   borderWidth:0,
            //   textStyle:{
            //     color:'#D9EFFF',
            //   }
            },
            title:{
              text:"",
              textStyle:{
                color:'#DAE4FF',
                fontWeight:'normal',
                fontSize:16,
                
              },
              top:26,
              left:10,
            },
           
            grid: {
                left: '1%',
                right: '1%',
                bottom: '1%',
                top:'3%',
                containLabel: true
            },
            xAxis: {
                data:arr,
                name: '',
                nameTextStyle:{
                  color:'#DAE4FF'
                },
                splitLine:{
                  show:false,
                  lineStyle:{
                      color:'#194F95',
                      type:'dashed'
                    }
                },
                 axisLabel : {
                   interval:0,
                rotate:25 ,
                  formatter: '{value}',
                  textStyle: {
                      color: '#DAE4FF',
                      fontSize:16
                  }
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                  onZero: true,
                  lineStyle:{
                    color:'#194F95',
                  }
                },
                splitArea:{
                    show:false,
                    interval:30,
                    areaStyle:{
                        color:['rgba(12, 38, 104,0)','rgba(12, 38, 104,0.8)']
                    }
                },
            },
            yAxis: {
              splitLine:{
                  show:true,
                  lineStyle:{
                      color:'#4578FF',
                      type:'dashed'
                    }
                },
                axisLabel : {
                  formatter: '{value}',
                  textStyle: {
                      color: '#fff',
                      fontSize:16
                  }
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false,
                  onZero: true,
                  lineStyle:{
                    color:'#194F95',
                  }
                },
            },
            series: [
                {
                  name: '当前车上人数',
                  type: 'bar',
                  barWidth:20,
                  stack: 'one',
                  itemStyle:{
                        normal: {
                            label: {
                                show: true,		//开启显示
                                position: 'top',	//在上方显示
                                textStyle: {	    //数值样式
                                    color: '#DAE4FF',
                                    fontSize: 14
                                }
                            }
                        }
                    },
                  data: setdate
              },
            ]

        },true)

      },

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.busModel{
    width:100%;
    height: 100%;
    box-sizing: border-box;
    padding:0 vw(20);
    padding-top: vh(140);
    display:flex;
        flex-direction: column;
    .search-box{
        width:100%;
        background: rgba(12, 38, 104, 0.7);
        box-sizing: border-box;
        padding: vh(10) vw(16);
        display:flex;
        align-items: center;
        justify-content: space-between;
        .topfont{
            color:#DAE4FF;
            display:flex;
            flex-direction: column;
            align-items: center;
            margin-left:0.8vw;
            cursor:pointer;
        }
        .topfont:hover{
            color:rgba(69, 120, 255,0.6)
        }
        .topfontac{
             color:#4578FF
        }
    }
    .lenglist{
        width:100%;
        // height:vh(50);
        justify-content:flex-end;
        display:flex;
        align-items: center;
        box-sizing:border-box;
        padding:vh(12) 0;
        .lengbox{
            width:vw(28);
            height:vh(18);
            background:rgba(218, 228, 255, 0.8);
            border-radius:vw(3);
            margin-right:vw(2);
            margin-left:vw(16);
        }
        .lengbox1{
            background:#0077F0;
        }
        .lengbox2{
            background:#00FFFF;
        }
    }
    .cancelbox{
        width: vw(1884);
        height: vh(835);
        border: 1px solid rgba(25, 79, 149, 0.2);
        margin-top:vh(12);
        border: 1px solid rgba(25, 79, 149, 0.2);
        border-right:none;
        border-bottom:none;
        display:flex;
        flex-direction: column;
        .cancelhead{
            width:100%;
            display:flex;
            flex-wrap: wrap;
            box-shadow: 0px 0px vh(20) rgba(25, 79, 149, 1) inset;
            box-sizing:border-box;
            padding:vh(10) 0;
            div{
                width:vw(268);
                text-align:center;
                color:#4578FF;
            }
        }
        .cancelbody{
            flex:1;
            display:flex;
            flex-wrap: wrap;
            .canite{
                width:vw(268);
                height:vh(132);
                border-right:1px dashed rgba(25, 79, 149, 0.2);
                border-bottom:1px dashed rgba(25, 79, 149, 0.2);
                 display:flex;
                flex-direction: column;
                align-items: center;
                justify-content:center;
                color:#DAE4FF;
                font-size:vw(15);
                cursor:pointer;
                .noe{
                    font-size:vw(28);
                    margin:vh(6) 0;
                }
                
            }
            .canite1{
                background: #4578FF;
                border-radius: 2px;
            }
            .canite2{
                background:rgba(12, 38, 104,0.8);
                color:#00FFFF;
            }
            .canite3{
                background: rgba(25, 79, 149,0.2);
            }

        }
    }
    .echartsox{
      flex:1;
      box-shadow: 0px 0px vh(10) rgba(25, 79, 149, 1) inset;
      box-sizing:border-box;
    //   margin-top:vh(12);
      background:rgba(12, 38, 104, 0.2);
      margin-bottom:vh(12);
      position:relative;
     
    }
}

</style>
