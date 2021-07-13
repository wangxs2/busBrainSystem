<template>
  <div class="sectionPassenger">
    <div class="search-box">

      <div style="margin-right:0.6vw;width:3vw;">时间</div>
      <el-date-picker
        v-model="query.date"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <div style="margin-right:0.6vw;margin-left:1.8vw;width:3.6vw;">线路名称</div>
      <el-select size="small" filterable v-model="query.lineName" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.routeId"
          :label="item.routeName"
          :value="item.routeName">
        </el-option>
      </el-select>
      <div class="qhbtn">
        <div :class="query.direction==iteam.id?'btnnow activebtn':'btnnow' " @click="tobtn(iteam)" v-for="(iteam,n) in typelst" :key="n">{{iteam.name}}</div>
      </div>
    </div>
    <div class="table-data"  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(12, 38, 104, 0.2)">
      <div class="table-header">
       
        <div style="width:15%">上车站点</div>
        <div style="width:20%">下车站点</div>
        <div style="width:20%">线路数量(条)</div>
        <div style="width:15%">客流(人)</div>
        <div style="width:20%">平均乘车距离(km)</div>
        <div style="width:10%">明细</div>
      </div>
      <div class="table-contain">
        <div class="tableTr"   v-for="(item,index) in alldata" :key="index">
         
          <div style="width:15%">{{item.routeName}}</div>
          <div style="width:20%">{{item.company}}</div>
          <div style="width:20%">{{item.mainContent}} </div>
          <div style="width:15%">{{item.finishTime==null?'':item.finishTime.slice(0,4)}}</div>
          <div style="width:20%">{{item.classify}}</div>
          <div style="width:10%;color:#00FFFF">查看明细</div>
        </div>
        <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-if="alldata.length==0">无数据</div>
      </div>
    </div>
    <div class="tabbottom" v-if="alldata.length!==0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.pageNo"
          :page-size="query.pageSize"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
   data(){
        return {
          options:[
            {
              name:'2021',
              value:'2021',
            },{
               name:'2020',
              value:'2020',
            }
          ],
          value:'',
          typelst:[
              {
                name:'上行',
                id:0
              },{
                name:'下行',
                id:1
              }
            ],
          loading:true,
          query:{
            date:new Date(),
            direction:0,
            lineName:'961路'
          },
          alldata:[],
          options:[],
          fileList:[],
          total:null,
          allids:''
        }
   },
   watch:{
   },
    created(){
      
      this.getData()
      this.getAllline()
    },
    mounted(){

    },
    methods:{
      getAllline(){ 
        this.$fetchGet("route/routeList").then(res=>{
          this.options=res.result
        })
      },
      handleSizeChange (val) {
        //分页 选择每页条数
        this.query.pageSize = val;
        this.getData();
      },
      handleCurrentChange (val) {
        //分页 选择当前是多少页
        this.query.pageNo = val;
        this.getData();
      },
      handleChange(file, fileList) {
        this.loading=true
        // this.fileList = fileList.slice(-3);
      },
       tobtn(row){
        this.query.direction=row.id
        this.getData()
      },
      getData(){
        this.loading=true
        this.$fetchGet("passenger/section",{
            date:this.$moment(this.query.date).format("YYYY-MM-DD"),
            direction:this.query.direction,
            lineName:this.query.lineName
        }).then(res => {
          setTimeout(()=>{
            this.$store.commit('SET_LOADING',false)
          },200)
           this.loading=false
          res.result.list.forEach(iteam=>{
            iteam.isdetail=false
          })
          this.alldata=res.result.list
          // this.total=res.result.total
         
          

        })
      }
    }
  
}
</script>
<style lang="scss">
.sectionPassenger{
.el-pagination .btn-next, .el-pagination .btn-prev{
  background: transparent !important;
  color: #ffffff !important;
}
.el-pagination{
  color: #ffffff !important;
}
}


</style>
<style lang="scss" scoped>
.sectionPassenger{
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    width:98%;
    top: vh(140);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
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
  .table-data{
    position: absolute;
    width:98%;
    height:vh(800);
    top: vh(210);
    left: vw(20);
    box-sizing: border-box;
    overflow:hidden;
    display:flex;
    flex-direction: column;
    .table-header{
      width:100%;
      height:vh(44);
      background: rgba(12, 38, 104, 0.2);
      color: #4578FF;
      font-size:vw(16);
      box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset;
      display:flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 vw(20);
      div{
        // flex:1;
        text-align:left;
      }
    }
    .table-contain{
      flex:1;
      overflow:hidden;
      overflow-y:scroll;
      .tableTr{
        width:100%;
        height:vh(44);
        color: #ffffff;
        font-size:vw(16);
        display:flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 vw(20);
        cursor:pointer;
        div{
          // flex:1;
           text-align:left;
        }

      }
      .tableTr:hover {
        background:rgba(12, 38, 104, 0.5);
        color: #4578FF;
        font-weight:bold;
      } 
      .tableTr:nth-child(even){
        background:rgba(12, 38, 104, 0.2)

      }
    }
  }
  .tabbottom{
      position: absolute;
      width:98%;
      bottom: vh(20);
      left: vw(20);

  }
 
}
</style>
