<template>
  <div class="apiList-box">
    <div class="search-box">
      <div></div>
      <div>
        <el-button type="primary" size="medium" @click="addProject()">新增</el-button>
      </div>
    </div>
    <div class="tabel-box">
      <el-table :data="tableData" border  :height="$store.getters.docHeight-20">
        <el-table-column type="index" label="序号" align="center"  width="60"></el-table-column>
        <el-table-column prop="id" label="编号" align="left" ></el-table-column>
        <el-table-column prop="platformCode" label="场景编号" width="110"></el-table-column>
        <el-table-column prop="apiUrl" label="API路径"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <!-- <el-table-column prop="limitTimes" label="数据上限" width="100"></el-table-column>
        <el-table-column prop="cronId" label="定时id" width="80"></el-table-column>
        <el-table-column prop="targetTab" label="目标库" width="100"></el-table-column> -->
        <el-table-column prop="method" label="方法" width="60"></el-table-column>
        <el-table-column prop="param" label="参数表达{json形式}" width="400">
          <template slot-scope="scope">
            <el-input v-model="scope.row.param"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="upmepoint(scope.row)">修改</el-button>
            <el-button @click="mepoint(scope.row)" type="primary">调用</el-button>
          </template>
        </el-table-column>
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
      width="50%">
        <json-viewer :value="responseJs" :expand-depth="4" copyable sort></json-viewer>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

      <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="formdialogVisible"
      :show-close="false"
      @close="handclose()"
      width="60%">

        <el-form label-position="right" :rules="rules" label-width="80px" ref="formLabelAlign" :model="formLabelAlign">
          <!-- <el-form-item label="id">
            <el-input v-model="formLabelAlign.id"></el-input>
          </el-form-item> -->
          <el-form-item label="API路径" prop="apiUrl">
            <el-input v-model="formLabelAlign.apiUrl"></el-input>
          </el-form-item>
          <el-form-item label="场景编号" prop="platformCode">
            <el-input v-model="formLabelAlign.platformCode"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="formLabelAlign.description"></el-input>
          </el-form-item>
          <el-form-item label="数据上限">
            <el-input v-model="formLabelAlign.limitTimes"></el-input>
          </el-form-item>
          <el-form-item label="定时id">
            <el-input v-model="formLabelAlign.cronId"></el-input>
          </el-form-item>
          <el-form-item label="目标库">
            <el-input v-model="formLabelAlign.targetTab"></el-input>
          </el-form-item>
          <el-form-item label="方法" prop="method">
            <el-input v-model="formLabelAlign.method"></el-input>
          </el-form-item>
            <el-form-item label="参数">
            <el-input v-model="formLabelAlign.param"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="formdialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="saveIp()">确 定</el-button>
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
      formdialogVisible:false,
      query: {
        pageNo: 1,
        pageSize: 10
      },
      responseJs:'',
      title:'',
       formLabelAlign: {
          id: '',                          //id
          apiUrl: '',                    // API路径
          description: '',                 //描述
          limitTimes: '',                 //数据上限
          cronId: '',                     //定时id
          targetTab : '',                // 目标库
          method : '',                     //方法
          param: '',                       //参数表达{json形式}
          platformCode:'',//场景编号
        },
      tableData: [],
      rules:{
         apiUrl:[
                    { required: true, message: 'apiUrl路径', trigger: 'blur' },
                ],
          platformCode:[
                    { required: true, message: '场景编号', trigger: 'blur' },
                ],
          method:[
                    { required: true, message: '方法', trigger: 'blur' },
                ],
      }
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
    addProject() {
      this.title="新增"
      this.formdialogVisible=true
    },
    handclose(){
      this.formLabelAlign = {
         id: '',                          //id
          apiUrl: '',                    // API路径
          description: '',                 //描述
          limitTimes: '',                 //数据上限
          cronId: '',                     //定时id
          targetTab : '',                // 目标库
          method : '',                     //方法
          param: '',                       //参数表达{json形式}
          platformCode:'',//场景编号
      };
      this.$refs.formLabelAlign.resetFields();
    },
    saveIp(){
       this.$refs["formLabelAlign"].validate((valid) => {
          if (valid){
            if(this.title=="新增"){
               this.$fetchPost("/api2db/conf-api/add", this.formLabelAlign, 'json')
                .then(res => {
                  if(res.code=="200"){
                    this.formdialogVisible=false
                    this.getall()

                  }else{
                    this.$message({
                            message:res.message,
                            type: 'error'
                        });
                  }

                })

            }else{
                this.$fetchPost("/api2db/conf-api/update", this.formLabelAlign, 'json')
                .then(res => {
                  if(res.code=="200"){
                    this.formdialogVisible=false
                    this.getall()

                  }else{
                    this.$message({
                            message:res.message,
                            type: 'error'
                        });
                  }

                })
            }
           
          }else{
                    this.$message({
                        message: '请完善信息！',
                        type: 'warning'
                    });
                }
       })
    },
    getall() {
      this.$fetchGet("/api2db/conf-api/list",this.query).then(res => {
        this.tableData = res.result.records;
        console.log(77)
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
      this.title="修改"
      this.formdialogVisible=true

       $.each(this.formLabelAlign, (key, item) => {
        this.formLabelAlign[key] = row[key] + "";
      });

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
    height: 60px;
    text-align:right;
  }
  .tabel-box{
    flex:1;
  }
}
</style>
