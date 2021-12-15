<template>
  <div class="linePassenger" id="linePassenger">
    <div class="search-box">
        <div style="margin-right:0.6vw;width:3vw;">时间</div>
        <el-date-picker
          v-model="value1"
          size="small"
          type="daterange"
          range-separator="至"
          @change="changeDate"
          	:picker-options="pickerOptions"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <div style="margin-right:0.6vw;margin-left:1.8vw;width:3.6vw;">线路名称</div>
        <el-select size="small" filterable @change="toLine()" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.routeId"
            :label="item.routeName"
            :value="item.routeId">
          </el-option>
        </el-select>
        <div class="qhbtn">
        <div :class="isbtn==iteam.id?'btnnow activebtn':'btnnow' " @click="tobtn(iteam)" v-for="(iteam,n) in typelst" :key="n">{{iteam.name}}</div>
        </div>
    
    
    </div>
  </div>
</template>

<script>
import Map from "../passengerMap.js";
let MyMap = null; // 地图实例
export default {
    
    data(){
        return {
           pickerOptions: {
              disabledDate(date) {
                //这里设置今天以前的不可选
                let time =new Date("2021-05-31").getTime()
                  return date.getTime()> Date.now() ||date.getTime()<time;
              }
            },
            options:[],
            value1:['2021-07-01','2021-07-31'],
            value:"",
            isbtn:0,
            typelst:[
              {
                name:'上行',
                id:0
              },{
                name:'下行',
                id:1
              }
            ],
        }
    },
    created() {
      console.log(this.$route.query.idName)
      // this.getTestod()
    },
    mounted() {
      MyMap = new Map({ el: "linePassenger" });
      console.log(this.$route.query.idName)
      this.getAllline()
    },
    watch:{
      '$route.query.idName':{
        handler(val,oldval){
          if(val){
           this.getAllline(val)
          }
        },
      },
    },
    methods: {
     
      toLine(){
        this.getLinepassenger()
      },
      tobtn(row){
        this.isbtn=row.id
        this.getLinepassenger()
      },
      changeDate(){
        this.getLinepassenger()
      },
      getTestod(){
        this.$fetchGet("tranfer/odList",{
          date:20200131,
          lineName:''
        }).then(res=>{})
      },
      getAllline(val){ 
        this.value=val
        // this.getLinepassenger()

        // console.log(val)
        this.$fetchGet("route/routeList").then(res=>{
           res.result.forEach(iteam=>{
            if(iteam.routeName=='610路'||iteam.routeName=='871路'||iteam.routeName=='浦东73路'){
              iteam.routeName=iteam.routeName+'(客流采集仪)'
            }
          })
          this.options=res.result
         if(val){
           this.getLinepassenger()
            // this.options.forEach(iteam=>{
              // if(iteam.routeName==val){
              //   this.value=iteam.routeId
                
              // }else{

              // }
            // })

          }else{
               setTimeout(()=>{
                this.$store.commit('SET_LOADING',false)
                },200)
          }
        })
      },
      getLinepassenger(){
        this.$store.commit('SET_LOADING',true)


        this.$fetchGet("passenger/linePassengerNum",{
          direction:this.isbtn,
          st:this.$moment(this.value1[0]).format("YYYY-MM-DD"),
          et:this.$moment(this.value1[1]).format("YYYY-MM-DD"),
          routeId:this.value

        }).then(res => {
            if(res.result['线路客流']==null){
             

              this.$message({
                  message: '由于数据清洗原因，暂无此线路数据!',
                  type: 'warning'
                });
            }else{

              this.$fetchGet("passenger/linePassenger",{
              direction:this.isbtn,
              st:this.$moment(this.value1[0]).format("YYYY-MM-DD"),
              et:this.$moment(this.value1[1]).format("YYYY-MM-DD"),
              routeId:this.value

            }).then(res => {
                if(res.result['线路走向']){
                  let obj=res.result['线路走向']
                  obj.geom=this.setData(obj.geom)
                  MyMap.drawbusLine(obj,res.result['线路站点列表'])
                }else{
                  this.$message({
                      message: '无此线路信息!',
                      type: 'warning'
                    });
                }
                this.$store.commit('SET_LOADING',false)
            })
              
            }
            
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
};
</script>
<style lang="scss" scoped>
.linePassenger{
  width:100%;
  height:100%;
  position: relative;
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(138);
    left: vw(20);
    display: flex;
    z-index:10;
    align-items: center;
    color: #dae4ff;
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
}
</style>