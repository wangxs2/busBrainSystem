<template>
  <div class="annualPlan">
    <div class="search-box">

      <div style="margin-right:0vw;margin-left:1.8vw;width:3vw;">年份</div>
      <el-select size="small" style="margin-right:0.4vw" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-upload
        class="upload-demo"
        action="/busbrain/adjust-plan/importExcel"
        :on-change="handleChange"
        :on-success="successFile"
        :show-file-list="false"
        :file-list="fileList">
        <el-button size="small" type="primary">Excel导入</el-button>
      </el-upload>
      <el-button size="small" style="margin-left: 0.6vw" @click="detilAll"  type="primary">批量删除</el-button>
    </div>
    <div class="table-data"  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(12, 38, 104, 0.2)">
      <div class="table-header">
        <div style="width:5%;cursor:pointer">
          <img @click="isshowdelete=!isshowdelete" v-if="!isshowdelete"  src="@/assets/image/fxkfalse.png" alt="" srcset="">
          <img @click="isshowdelete=!isshowdelete" v-if="isshowdelete" src="@/assets/image/fxktrue.png" alt="" srcset="">
        </div>
        <div style="width:15%">线路名称</div>
        <div style="width:20%">所属公司</div>
        <div style="width:20%">调整方式</div>
        <div style="width:10%">实施年份</div>
        <div style="width:20%">推进情况</div>
        <div style="width:10%">操作</div>
      </div>
      <div class="table-contain">
        <div class="tableTr"   v-for="(item,index) in alldata" :key="index">
          <div style="width:5%">
            <img @click="changeShow(item)" v-if="!item.isdetail" src="@/assets/image/fxkfalse.png" alt="" srcset="">
            <img @click="changeShow(item)"  v-if="item.isdetail" src="@/assets/image/fxktrue.png" alt="" srcset="">
          </div>
          <div style="width:15%">{{item.routeName}}</div>
          <div style="width:20%">{{item.company}}</div>
          <div style="width:20%">{{item.mainContent}} </div>
          <div style="width:10%">{{item.finishTime==null?'':item.finishTime.slice(0,4)}}</div>
          <div style="width:20%">{{item.classify}}</div>
          <div style="width:10%"> <el-button size="mini" type="warning">修改</el-button></div>
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
          isshowdelete:false,
          value:'2021',
          loading:true,
          query:{
            pageNo:1,
            pageSize:20, 
          },
          alldata:[],
          fileList:[],
          total:null,
          allids:''
        }
   },
   watch:{
     "isshowdelete":function(val,old){
       console.log(val)
       if(val==true){
         let arr=[]
          this.alldata.forEach(iteam=>{
            iteam.isdetail=true
            arr.push(iteam.id)
          })
          this.allids=arr.join(',')
       }else{
           this.alldata.forEach(iteam=>{
            iteam.isdetail=false
          })
          this.allids=''
       }
     },
   },
    created(){
      
      this.getData()
    },
    mounted(){

    },
    methods:{
      successFile(res){
        console.log(res)
        if(res.code==200){
          this.$message({
            showClose: true,
            message: '导入成功！',
            type: 'success'
          });
          this.getData();
        }
      },
      detilAll(){
          this.loading=true
          let arr=[]
          this.alldata.forEach(iteam=>{
            if(iteam.isdetail==true){
              arr.push(iteam.id)
            }
          })
          this.allids=arr.join(',')
          this.$fetchDelete("adjust-plan/deleteBatch",{ids:this.allids}).then(res => {
            if(res.code==200){
              this.$message({
                showClose: true,
                message: '删除成功！',
                type: 'success'
              });
              this.getData();
              this.isshowdelete=false
            }
          })

      },
      changeShow(row){
        row.isdetail=!row.isdetail
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
        this.$fetchGet("adjust-plan/list",this.query).then(res => {
          res.result.list.forEach(iteam=>{
            iteam.isdetail=false
          })
          this.alldata=res.result.list
          this.total=res.result.total
          this.loading=false
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
