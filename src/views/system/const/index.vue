<template>
  <div class="contentPage">
    <div class="contentBorder">
      <!-- header -->
      <el-row class="topAdd">
        <el-col style="width:300px" class="queryinp">
          <div>
            <el-input placeholder="常量类型或类型编码查找" v-model="query.name" size="small">
              <el-button slot="append" icon="el-icon-search" @click="getTypeTab"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-button type="primary" size="small" @click="allConst">查看所有</el-button>
        <el-button type="primary" size="small" @click="addTypeBtn">添加常量类型</el-button>
        <el-button type="primary" size="small" @click="addBtn">添加常量</el-button>
      </el-row>
      <!-- header -->
      <!-- body -->
      <el-row class="Constcontent">
        <el-col :span="8" class="typetab">
          <div v-loading="typeLoading" element-loading-text="拼命加载中">
            <el-table
              :data="typeTabData"
              style="width: 100%"
              :height="$store.getters.docHeight-35"
            >
              <el-table-column :resizable="false" type="index" width="60"></el-table-column>
              <el-table-column :resizable="false" prop="name" label="常量类型"></el-table-column>
              <el-table-column :resizable="false" prop="code" label="类型编码"></el-table-column>
              <el-table-column
                :resizable="false"
                fixed="right"
                label="查看详情"
                width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <i class="el-icon-view G-icon" @click="selecttypeRow(scope.row)"></i>
                </template>
              </el-table-column>
              <el-table-column :resizable="false" fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" @click="updateTypeBtn(scope.row)">更新</el-button>
                  <el-button size="mini" type="danger" @click="deleteTypeBtn(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="tabbottom">
              <el-pagination
                background
                @size-change="typeSizeChange"
                @current-change="typeCurrentChange"
                :current-page="query.page"
                :page-size="query.pageSize"
                layout="total, prev, pager, next"
                :total="typeTotal"
              ></el-pagination>
            </div>
          </div>
        </el-col>
        <el-col :span="16" class="consttab">
          <div v-loading="constLoading" element-loading-text="拼命加载中">
            <el-table
              :data="constTabData"
              border
              :height="$store.getters.docHeight-35"
              style="width: 100%"
            >
              <el-table-column :resizable="false" type="index" width="60"></el-table-column>
              <el-table-column :resizable="false" prop="typeName" label="常量类型" width="120"></el-table-column>
              <el-table-column :resizable="false" prop="pName" label="父常量" width="120"></el-table-column>
              <el-table-column :resizable="false" prop="name" label="常量名称" width="120"></el-table-column>
              <el-table-column :resizable="false" prop="val" label="常量值" width="130"></el-table-column>
              <el-table-column :resizable="false" prop="descr" label="描述"></el-table-column>
              <el-table-column :resizable="false" fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" @click="updateBtn(scope.row)">更新</el-button>
                  <el-button size="mini" type="danger" @click="deleteBtn(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="tabbottom">
              <el-pagination
                @size-change="constSizeChange"
                @current-change="constCurrentChange"
                :current-page="constQuery.page"
                :page-size="constQuery.pageSize"
                layout="total, prev, pager, next"
                :total="constTotal"
              ></el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- body -->
      <!-- 常量类型弹窗 -->
      <el-dialog
        title="常量类型信息"
        @close="emptyTypeForm"
        :visible.sync="typedialogform"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="infoTypeForm"
          :rules="rules"
          ref="infoTypeForm"
          label-width="80px"
          label-position="right"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <div>
                <el-form-item label="类型名称" prop="name">
                  <el-input v-model="infoTypeForm.name" placeholder="请输入类型名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="类型编码" prop="code">
                  <el-input v-model="infoTypeForm.code" placeholder="请输入类型编码"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button @click="typedialogform = false">取 消</el-button>
          <el-button type="primary" @click="subType" :loading="subBtnTypeLonging">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 常量类型弹窗 -->
      <!-- 常量弹窗 -->
      <el-dialog
        title="常量信息"
        @close="emptyForm"
        :visible.sync="dialogform"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="infoForm"
          :rules="rules"
          ref="infoForm"
          label-width="80px"
          label-position="right"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <div>
                <el-form-item label="常量类型" prop="typeId">
                  <el-select v-model="infoForm.typeId" placeholder="请选择常量类型">
                    <el-option
                      v-for="item in typeTabData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="父级常量" prop="pId">
                  <el-select v-model="infoForm.pId" placeholder="请选择父级常量">
                    <el-option
                      v-for="item in FconstTabData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div>
                <el-form-item label="常量名称" prop="name">
                  <el-input v-model="infoForm.name" placeholder="请输入常量名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="常量值" prop="val">
                  <el-input v-model="infoForm.val" placeholder="请输入常量值"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-form-item label="描述" prop="descr">
            <el-input type="textarea" placeholder="请输入常量描述" v-model="infoForm.descr"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogform = false">取 消</el-button>
          <el-button type="primary" @click="subBtn" :loading="subBtnTypeLonging">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 常量弹窗 -->
    </div>
  </div>
</template>

<script>
import { _debounce } from "@/libs/public.js";
export default {
  data () {
    let checkid = function (rule, value, callback) {
      if (value === "") {
        return callback(new Error("请选择"));
      } else {
        callback();
      }
    };
    return {
      query: {
        //表格参数
        name: "",
        pageSize: 20,
        page: 1
      },
      typeTotal: 0, //类型数据数量
      constQuery: {
        //常量表格参数
        pageSize: 20,
        page: 1,
        typeId: ""
      },
      constTotal: 0, //常量数据数量
      FtypeTabData: [], //所有的常量类型
      FconstTabData: [], //所有的常量数据
      typeTabData: [], //类型表格数据
      typeLoading: false, //类型表格加载动画
      constLoading: false, //常量表格加载动画
      constTabData: [], //常量表格数据
      typedialogform: false, //类型弹窗控制
      subBtnTypeLonging: false, //按钮重复
      isTypeAction: "", //类型操作
      infoTypeForm: {
        //类型表单参数
        name: "",
        code: ""
      },
      isAction: "", //当前操作
      dialogform: false, //弹窗控制
      infoForm: {
        //表单参数
        name: "",
        pId: "",
        typeId: "",
        val: "",
        descr: ""
      },
      rules: {
        typeId: [{ required: true, validator: checkid, trigger: "change" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        val: [{ required: true, message: "请输入常量值", trigger: "blur" }],
        code: [{ required: true, message: "请输入类型编码", trigger: "blur" }]
      }
    };
  },
  watch: {
    dialogform: function (val, oldval) {
      if (val) {
        this.getFromData();
      }
    }
  },
  created () {
    this.getTypeTab();
    this.getConstTab();
  },
  mounted () { },
  methods: {
    getFromData () {
      //获取常量类型 和父级常量
      this.$fetchGet("constTypes", {
        pageSize: 1000,
        page: 1
      }).then(res => {
        this.FtypeTabData = res.list;
      });
      this.$fetchGet("constDicts", {
        pageSize: 1000,
        page: 1
      }).then(res => {
        this.FconstTabData = res.list;
      });
    },
    getTypeTab () {
      //获取常量类型表格数据
      this.typeLoading = true;
      this.$fetchGet("constTypes", this.query).then(res => {
        this.typeTabData = res;
        this.typeTotal = res.length;
        this.typeLoading = false;
      });
    },
    getConstTab () {
      //常量表格数据
      this.constLoading = true;
      this.$fetchGet("constDicts", this.constQuery).then(res => {
        this.constTabData = res.list;
        this.constTotal = res.total;
        this.constLoading = false;
      });
    },
    addTypeBtn () {
      //添加类型
      this.isTypeAction = "add";
      this.typedialogform = true;
    },
    updateTypeBtn (row) {
      //更新类型
      this.isTypeAction = "update";
      $.each(this.infoTypeForm, (key, val) => {
        this.infoTypeForm[key] = row[key];
      });
      this.infoTypeForm.id = row.id;
      this.typedialogform = true;
    },
    deleteTypeBtn (row) {
      //删除类型
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$fetchDelete("constTypes/id/" + row.id)
          .then(res => {
            if (res === 1) {
              this.getTypeTab();
              this.Gsuccess("删除成功！");
            }
          })
          .catch(error => {
            this.Gerror(error);
          });
      });
    },
    subType: _debounce(function () {
      //类型提交
      this.$refs.infoTypeForm.validate(valid => {
        if (valid) {
          this.subBtnTypeLonging = true;
          if (this.isTypeAction == "add") {
            this.$fetchPost("constTypes/save", this.infoTypeForm)
              .then(res => {
                this.Gsuccess("添加成功");
                this.getTypeTab();
                this.typedialogform = false;
                this.subBtnTypeLonging = false;
              })
              .catch(error => {
                this.Gerror(error);
              });
          } else if (this.isTypeAction == "update") {
            this.$fetchPut("constTypes/update", this.infoTypeForm)
              .then(res => {
                this.Gsuccess("更新成功");
                this.getTypeTab();
                this.typedialogform = false;
                this.subBtnTypeLonging = false;
              })
              .catch(error => {
                this.Gerror(error);
              });
          }
        }
      });
    }, 300),
    addBtn () {
      //添加
      this.isAction = "add";
      this.dialogform = true;
    },
    updateBtn (row) {
      //更新
      this.isAction = "update";
      $.each(this.infoForm, (key, val) => {
        this.infoForm[key] = row[key];
      });
      this.infoForm.id = row.id;
      this.dialogform = true;
    },
    deleteBtn (row) {
      //删除
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$fetchDelete("constDicts/deleteById/" + row.id)
          .then(res => {
            if (res === 1) {
              this.getConstTab();
              this.Gsuccess("删除成功！");
            }
          })
          .catch(error => {
            this.Gerror(error);
          });
      });
    },
    subBtn: _debounce(function () {
      //提交常量
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          if (this.isAction === "add") {
            this.$fetchPost("constDicts/save", this.infoForm)
              .then(res => {
                this.Gsuccess("添加成功");
                this.getConstTab();
                this.dialogform = false;
                this.subBtnTypeLonging = false;
              })
              .catch(error => {
                this.Gerror(error);
              });
          } else if (this.isAction === "update") {
            this.$fetchPut("constDicts/update", this.infoForm)
              .then(res => {
                this.Gsuccess("更新成功");
                this.getConstTab();
                this.dialogform = false;
                this.subBtnTypeLonging = false;
              })
              .catch(error => {
                this.Gerror(error);
              });
          }
        }
      });
    }, 300),
    emptyForm () {
      //清空表单
      this.infoForm = {
        typeId: "",
        name: "",
        pId: "",
        val: "",
        descr: ""
      };
      this.$refs.infoForm.resetFields();
      this.subBtnTypeLonging = false;
    },
    emptyTypeForm () {
      //清空表单
      this.infoTypeForm = {
        name: "",
        code: ""
      };
      this.$refs.infoTypeForm.resetFields();
      this.subBtnTypeLonging = false;
    },
    allConst () {
      //查询所有
      this.constQuery.typeId = "";
      this.getConstTab();
    },
    selecttypeRow (row) {
      //查看详情
      this.constQuery.typeId = row.id;
      this.getConstTab();
    },
    typeSizeChange (val) {
      //分页 选择每页条数
      this.query.pageSize = val;
      this.getTypeTab();
    },
    typeCurrentChange (val) {
      //分页 选择当前是多少页
      this.query.page = val;
      this.getTypeTab();
    },
    constSizeChange (val) {
      //分页 选择每页条数
      this.constQuery.pageSize = val;
      this.getConstTab();
    },
    constCurrentChange (val) {
      //分页 选择当前是多少页
      this.constQuery.page = val;
      this.getConstTab();
    }
  }
};
</script>

<style lang="scss" scoped>
.contentPage {
  background: #000022;
  .contentBorder {
    // width: 100%;
    height: 100%;
    position: relative;
    .topAdd {
      text-align: right;
      width: 100%;
      height: 50px;
      background: rgba(12, 38, 104,0.8);
      padding: 10px;
      box-sizing: border-box;
    }

    .Constcontent {
      .tabbottom {
        text-align: right;
        width: 100%;
        height: 50px;
        padding: 10px;
        box-sizing: border-box;
      }
      padding-top: 10px;
      box-sizing: border-box;
      .typetab {
        padding-right: 10px;
        box-sizing: border-box;
      }
      .consttab {
      }
    }
  }
}
</style>
