<template>
  <div class="personTime">
    <div class="search-box">

      <div style="margin-right:0.6vw;width:3vw;">时间</div>
      <el-date-picker
        v-model="value1"
        size="small"
        @change="getData()"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <div style="margin-right:0.6vw;margin-left:1.8vw;width:3.6vw;">线路名称</div>
      <el-select size="small" @change="getData()" clearable filterable v-model="query.lineName" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.routeId"
          :label="item.routeName"
          :value="item.routeName">
        </el-option>
      </el-select>
      <div style="margin-right:0.6vw;margin-left:1.8vw;width:3.5vw;">阈值设置</div>
      <el-input style="width:10%"  size="small" v-model="query.nums" @input="getData" placeholder="请输入阈值"></el-input>
    </div>
    <div class="table-data"  v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(12, 38, 104, 0.2)">
      <div class="table-header">
       
        <div>线路名称</div>
        <div>所属公司</div>
        <div>线路等级</div>
        <div>百公里人次</div>
        
      </div>
      <div class="table-contain">
        <div class="tableTr"   v-for="(item,index) in alldata" :key="index">
         
          <div >{{item.xlmc}}</div>
          <div >{{item.company}}</div>
          <div >{{item.company}}</div>
          <div>{{item.baipass}}</div>
          <!-- <div style="width:10%;color:#00FFFF">查看明细</div> -->
        </div>
        <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-if="alldata.length==0">无数据</div>
      </div>
    </div>
    <!-- <div class="tabbottom" v-if="alldata.length!==0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.pageNo"
          :page-size="query.pageSize"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
    </div> -->
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
          value1:[new Date().getTime() - 3600 * 1000 * 24 * 7,new Date()],
          loading:true,
          query:{
            st:'',
            et:'',
            lineName:'',
            nums:''
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
      getData(){
        this.loading=true
        this.$fetchGet("route/hundreds",{
            st:this.$moment(this.value1[0]).format("YYYY-MM-DD"),
            et:this.$moment(this.value1[1]).format("YYYY-MM-DD"),
            lineName:this.query.lineName,
            nums:this.query.nums
        }).then(res => {
          if(res.code==200){
            this.alldata=res.result
          }else{
            this.alldata=[]
            this.$message.error(res.message)
          }
          this.loading=false

        })
      }
    }
  
}
</script>
<style lang="scss">
.personTime{
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
.personTime{
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    width:98%;
    top: vh(62);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
  }
  .table-data{
    position: absolute;
    width:98%;
    height:vh(840);
    top: vh(130);
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
        flex:1;
        // text-align:left;
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
          flex:1;
          //  text-align:left;
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
