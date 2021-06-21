<template>
  <div class="annualPlan">
    <div class="search-box">

      <div style="margin-right:0vw;margin-left:1.8vw;width:3vw;">年份</div>
      <el-select size="small" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button  type="primary" size="small" style="margin-left:0.4vw" >Excel导入</el-button>
    </div>
    <div class="table-data">
      <div class="table-header">
        <div>线路名称</div>
        <div>所属公司</div>
        <div>调整方式</div>
        <div>实施年份</div>
        <div>推进情况</div>
      </div>
      <div class="table-contain">
        <div class="tableTr"   v-for="item in 40">
          <div>{{item}}</div>
          <div>上海巴士公交有限公司</div>
          <div>修改线路 </div>
          <div>2019</div>
          <div>重复率降低20%</div>
        </div>
      </div>
    </div>
    <div class="tabbottom">
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
          value:'2021',
          query:{
            pageNo:1,
            pageSize:20,
          },
          total:100,
        }
   },
    created(){
      
      this.getData()
    },
    mounted(){

    },
    methods:{
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
      getData(){
        
        this.$fetchGet("adjust-plan/list",this.query).then(res => {
          setTimeout(()=>{
            this.$store.commit('SET_LOADING',false)
          },200)

        })
      }
    }
  
}
</script>
<style lang="scss">
.annualPlan{
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
.annualPlan{
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
        flex:1;
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
        }

      }
      .tableTr:hover {
        background:rgba(12, 38, 104, 0.5);
        color: #4578FF;
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
