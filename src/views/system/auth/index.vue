<template>
  <div class="contentPage">
    <div class="contentBorder">
      <div class="topAdd">
        <el-button type="primary" size="small" @click="allAuth"
          >查看所有</el-button
        >
        <el-button type="primary" size="small" @click="addAuth"
          >添加权限</el-button
        >
      </div>
      <el-row class="authcontent">
        <el-col :span="5" class="authTree">
          <div>
            <el-tree
              :data="authsTree"
              :props="defaultProps"
              accordion
              @node-click="authsTreeNodeClick"
            ></el-tree>
          </div>
        </el-col>
        <el-col
          :span="19"
          v-loading="tabLoading"
          element-loading-text="拼命加载中"
          class="authTab"
        >
          <div>
            <el-table
              :data="authTab"
              style="width: 100%"
              :height="$store.getters.docHeight - 35"
              class="pageTable"
            >
              <el-table-column
                :resizable="false"
                fixed
                type="index"
                width="60"
                label="序号"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                fixed
                prop="name"
                label="资源名称"
                min-width="180"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                prop="type"
                label="资源类型"
                :formatter="Ftype"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                prop="code"
                label="权限编码"
                min-width="160"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                prop="url"
                label="访问url地址"
                min-width="150"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                prop="parentname"
                label="父节点"
                min-width="160"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                prop="descr"
                label="描述"
                min-width="200"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                fixed="right"
                label="操作"
                width="150"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="updateAuth(scope.row)"
                    >更新</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteAuth(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <div class="tabbottom">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 权限表单 -->
    <el-dialog
      title="权限信息"
      @close="emptyForm"
      :visible.sync="dialogform"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="authForm"
        :rules="rules"
        ref="authForm"
        label-width="80px"
        label-position="right"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="权限名称" prop="name">
                <el-input
                  v-model="authForm.name"
                  placeholder="请输入权限名称"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="资源类型" prop="type">
                <el-select v-model="authForm.type">
                  <el-option label="菜单" value="1"></el-option>
                  <el-option label="方法" value="3"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="权限编码" v-show="authForm.type === '3'">
                <el-input
                  v-model="authForm.code"
                  placeholder="请输入权限编码"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="url地址"
                v-show="authForm.type === '1'"
                prop="url"
              >
                <el-input
                  v-model="authForm.url"
                  placeholder="格式/xxxx"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="上传图标">
                <el-input
                  v-model="authForm.props"
                  placeholder="格式el-icon-fa-hand-o-right"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="isAction !== 'update'">
          <el-col :span="12">
            <div>
              <el-form-item label="父节点">
                <el-cascader
                  :options="parentData"
                  :props="defaultProps"
                  change-on-select
                  clearable
                  :show-all-levels="false"
                  v-model="parent"
                  @change="selectparent"
                ></el-cascader>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="7">
            <div>
              <el-form-item label="插入节点">
                <el-select
                  v-model="thisSon"
                  placeholder="请选择插入节点名称"
                  clearable
                  @change="selectSon"
                >
                  <el-option
                    v-for="item in sonData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id + ',' + item.sort"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="5">
            <div style="line-height: 34px">
              <el-radio-group v-model="authForm.insertType">
                <el-radio :label="1">之前</el-radio>
                <el-radio :label="2">之后</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="描述" prop="descr">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入描述"
            v-model="authForm.descr"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogform = false">取 消</el-button>
        <el-button type="primary" @click="subForm" :loading="subBtnLonging"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 权限表单 -->
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
      tabLoading: false, //表格加载
      query: {
        //查询表数据
        page: 1,
        pageSize: 20,
        sort: ""
      },
      authTab: [], //权限列表数据
      total: 0, //表格列数据
      oldauthsTree: [], //原始权限树数据
      authsTree: [], //权限树数据
      subBtnLonging: false, //防止重复提交
      dialogform: false, //表单弹框控制
      AuthTreeData: null, //权限数据
      parentData: [], //父节点信息
      sonData: [], //子节点信息
      thisSon: "", //当前选择的子节点数据
      parent: [], //选择父节点
      authForm: {
        //添加信息
        props: "",
        name: "",
        pid: 1000,
        pidSort: null,
        type: "1",
        url: "",
        code: "",
        insertSort: "",
        insertType: "",
        descr: ""
      },
      isAction: "", //表单操作 查看 添加 更新
      defaultProps: {
        label: "name",
        children: "children",
        value: "Ids"
      },
      rules: {
        name: [
          { required: true, message: "请输入权限名称", trigger: "blur" },
          { min: 1, max: 20, message: '长度在 1 到 20个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, validator: checkid, trigger: "change" }
        ],
        url: [
          { required: true, validator: checkid, trigger: "blur" },
          { min: 1, max: 100, message: '长度在 1 到 100个字符', trigger: 'blur' }
        ],
        descr: [
          { required: true, validator: checkid, trigger: "blur" },
          { min: 1, max: 100, message: '长度在 1 到 100个字符', trigger: 'blur' }
        ],
      },
      FtypeData: ["", "菜单", "", "方法"] //格式资源类型数据
    };
  },
  created () {
    this.getParent();
    this.getAuthsTree();
  },
  mounted () {
    this.getAuthTab();
  },
  methods: {
    getAuthTab () {
      //获取权限表格数据
      this.tabLoading = true;
      this.$fetchGet("auths", this.query).then(res => {
        let tabdata = res.list;

        $.each(tabdata, (index, item) => {
          if (item.pid == 1) {
            item.parentname = "无";
          }
          $.each(this.oldauthsTree, (treeIndex, treeItem) => {
            if (item.pid == treeItem.id) {
              item.parentname = treeItem.name;
            }
          });
        });
        this.tabLoading = false;
        this.authTab = tabdata;
        this.total = res.total;
      });
    },
    getAuthsTree () {
      //获取权限树数据
      this.$fetchGet("auths/authsTree").then(res => {
        this.oldauthsTree = res.slice(0);
        let authsTree = this.parseChildren(1000, res.slice(0));
        this.deleteChildren(authsTree);
        this.authsTree = authsTree;
      });
    },
    getParent () {
      //获取菜单（不包括方法）节点信息
      this.$fetchGet("auths/authsTree").then(res => {
        let parentData = this.parseChildren(1000, res.slice(0));
        this.deleteChildren(parentData);
        this.parentData = parentData;
      });
    },
    getSon (pid) {
      //获取子节点
      if (pid === undefined || pid === null) {
        pid = null;
      }
      this.$fetchGet("auths/sonAuths", {
        pid: pid
      }).then(res => {
        this.sonData = res;
      });
    },
    subForm: _debounce(function () {
      //提交表单
      if (this.isAction === "add" && !this.authForm.pid) {
        this.authForm.pid = 1000
      }
      this.$refs.authForm.validate(valid => {
        if (valid) {
          let formData = this.cloneObj(this.authForm);
          if (formData.pidSort == 'null') {
            formData.pidSort = null
          }
          this.subBtnLonging = true;
          if (this.isAction === "add") {
            this.$fetchPost("auths", formData).then(res => {
              if (res) {
                this.Gsuccess("添加成功");
                this.dialogform = false;
                this.getAuthTab();
                this.getAuthsTree();
                this.getParent();
              } else {
                this.Gerror(res.message);
              }
              this.subBtnLonging = false;
            });
          } else if (this.isAction === "update") {
            delete formData.insertSort;
            delete formData.insertType;
            delete formData.pidSort;
            this.$fetchPut("auths/update", formData).then(res => {
              if (res) {
                this.Gsuccess("更新成功");
                this.dialogform = false;
                this.getAuthTab();
                this.getAuthsTree();
                this.getParent();
              } else {
                this.Gerror(res.message);
              }
              this.subBtnLonging = false;
            });
          }
        }
      });
    }, 300),
    authsTreeNodeClick (val) {
      //树的点击事件
      this.query.sort = val.sort;
      this.getAuthTab();
    },
    emptyForm () {
      //清空表单和验证
      this.authForm = {
        props: "",
        name: "",
        pid: null,
        pidSort: null,
        type: "1",
        url: "",
        code: "",
        insertSort: "",
        insertType: "",
        descr: ""
      };
      this.parent = [];
      this.subBtnLonging = false
      this.$refs.authForm.resetFields();
    },
    parseChildren (pid, json) {
      //格式父级权限
      var arr = [];
      $.each(json, (index, item) => {
        item.Ids = item.id + "," + item.pid + "," + item.sort;
        if (item.pid === pid) {
          arr.push(item);
          item.children = this.parseChildren(item.id, json);
        }
      });
      return arr;
    },
    deleteChildren (menuData) {
      //删除空的child
      $.each(menuData, (index, item) => {
        if (item.children && item.children.length) {
          this.deleteChildren(item.children);
        } else {
          delete item.children;
        }

        /* if (item.children) {
          if (item.children.length) {
            this.deleteChildren(item.children);
          } else {
            delete item.children;
            item.a = item.a;
          }
        } else {
          delete item.children;
          item.a = item.a;
        } */
      });
    },
    selectparent (val) {
      //选择父节点
      let thisParent = [];
      this.thisSon = "";
      thisParent = val[val.length - 1].split(",");
      this.authForm.pid = thisParent[0];
      this.authForm.pidSort = thisParent[2];
      this.getSon(thisParent[0]);
    },
    selectSon (val) {
      //选择子节点
      let thisSon = val.split(",");
      this.authForm.insertId = thisSon[0];
      this.authForm.insertSort = thisSon[1];
    },
    addAuth () {
      //添加权限
      this.isAction = "add";
      this.dialogform = true;
      this.getSon();
    },
    updateAuth (row) {
      //更新权限
      this.isAction = "update";
      this.dialogform = true;
      $.each(this.authForm, (key, item) => {
        this.authForm[key] = row[key] + "";
      });
      this.authForm.id = row.id;
    },
    deleteAuth (row) {
      //删除权限
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$fetchDelete("auths", {
          id: row.id,
          pid: row.pid,
          sort: row.sort
        }).then(res => {
          if (res = 1) {
            this.Gsuccess("删除成功！");
            this.getAuthTab();
            this.getAuthsTree();
            this.getParent();
          } else {
            this.Gerror(res.message);
          }
        });
      });
    },
    Ftype (row, column, cellValue) {
      //格式资源类型
      return this.FtypeData[row.type];
    },
    handleSizeChange (val) {
      //分页 选择每页条数
      this.query.pageSize = val;
      this.getAuthTab();
    },
    handleCurrentChange (val) {
      //分页 选择当前是多少页
      this.query.page = val;
      this.getAuthTab();
    },
    allAuth () {
      //查看所有权限
      this.query.sort = "";
      this.getAuthTab();
    }
  }
};
</script>

<style lang="scss" scoped>
.contentPage {
  background: #e3e9f3;
  .contentBorder {
    // width: 100%;
    height: 100%;
    position: relative;
    .topAdd {
      text-align: right;
      width: 100%;
      height: 50px;
      background: #fff;
      padding: 10px;
      box-sizing: border-box;
    }
    .authcontent {
      display: flex;
      align-items: stretch;
      padding-top: 10px;
      box-sizing: border-box;
      .authTree {
        box-sizing: border-box;
        margin-right: 10px;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #fff;
        .el-tree {
          color: #000;
        }
      }
      .authTab {
        background-color: #fff;
      }
    }
  }
}
</style>

