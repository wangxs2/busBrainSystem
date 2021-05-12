<template>
  <div class="apiList-box">
    <div class="search-box">
      <div></div>
      <div>
        <!-- <el-button type="primary" size="medium" @click="addProject()">新增</el-button> -->
      </div>
    </div>
    <div class="tabel-box">
      <el-table :data="tableData" border :height="$store.getters.docHeight-20">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="requestUrl" label="访问地址"></el-table-column>
        <el-table-column prop="requestParam" label="访问参数"></el-table-column>
        <el-table-column prop="ipAddress" label="IP地址"></el-table-column>
        <el-table-column prop="createT" label="发生时间"></el-table-column>
        <el-table-column prop="ifSuccess" label="是否成功"></el-table-column>
        <el-table-column prop="headerFields" label="请求头"></el-table-column>
        <el-table-column prop="unit" label="请求企业">
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="upmepoint(scope.row)">修改</el-button>
            <el-button @click="mepoint(scope.row)" type="primary">调用</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageNo"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      title="结果"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="60%">
        <json-viewer :value="responseJs" :expand-depth="4" copyable sort></json-viewer>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

  
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  components: {
     JsonViewer,
  },
  data() {
    return {
      total: null,
      dialogVisible:false,
      query: {
        pageNo: 1,
        pageSize: 10
      },
      responseJs:'',
      tableData: []
    };
  },
  beforeCreate() {},
  created() {
    this.getall()
  },
  mounted() {},

  methods: {
    handleSizeChange(val) {
      //分页 选择每页条数
      this.query.pageSize = val;
      this.getall()

    },
    handleCurrentChange(val) {
      //分页 选择当前是多少页
      this.query.pageNo = val;
      this.getall()

    },
    addProject() {},
    getall() {
      this.$fetchGet("/api2db/request-api-log/list",this.query).then(res => {
        this.tableData = res.result.records;
        this.total=res.result.total;
      })
    },
    mepoint(row) {
      this.$fetchGet("/api2db/conf-api/executeUrl",
      {
        id: row.id,
        param: row.param
      }
      ).then(res => {
        this.dialogVisible=true
        this.responseJs=res
      })
    },
    upmepoint(row){

    }
  }
};
</script>
<style lang="scss">
</style>

<style lang="scss" scoped>
.apiList-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
    overflow: hidden;
    box-sizing:border-box;
    padding:12px;
  .search-box {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .page-box{
    width: 100%;
    height: 40px;
    text-align:right;
  }
  .tabel-box{
    flex:1;
  }
}
</style>
