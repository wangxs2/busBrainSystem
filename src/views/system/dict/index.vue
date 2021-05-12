<template>
  <div class="contentPage">
    <!-- 数据库字典 -->
    <div class="contentBorder">
      <el-row class="topAdd">
        <el-col style="width: 300px" class="queryinp">
          <div>
            <el-input
              placeholder="数据表名查找"
              v-model="query.name"
              size="small"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getRoleTab"
              ></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>

      <el-row class="rolecontent">
        <el-col
          class="roleTab"
          v-loading="tabLoading"
          element-loading-text="拼命加载中"
        >
          <div>
            <el-table
              :data="roleTabData"
              stripe
              border
              style="width: 100%"
              :height="$store.getters.docHeight"
            >
              <el-table-column :resizable="false" type="expand">
                <template slot-scope="scope">
                  <div>
                    <el-table :data="props.row.columns" style="width: 100%">
                      <el-table-column
                        :resizable="false"
                        label="字段名"
                        prop="column_name"
                      ></el-table-column>
                      <el-table-column
                        :resizable="false"
                        label="数据类型"
                        prop="column_type"
                      ></el-table-column>
                      <el-table-column
                        :resizable="false"
                        label="是否为空"
                        prop="is_nullable"
                      ></el-table-column>
                      <el-table-column
                        :resizable="false"
                        label="约束类型"
                        :formatter="Formatterconstraint"
                        prop="constraint_type"
                      ></el-table-column>
                      <el-table-column
                        :resizable="false"
                        label="默认值"
                        :formatter="Formatterdefault"
                        prop="column_default"
                      ></el-table-column>
                      <el-table-column
                        :resizable="false"
                        label="描述"
                        prop="column_comment"
                      ></el-table-column>
                      <el-table-column
                        :resizable="false"
                        label="外键关联表"
                        prop="referenced_table_name"
                      ></el-table-column>
                      <el-table-column
                        :resizable="false"
                        label="联表字段"
                        prop="referenced_column_name"
                      ></el-table-column>
                    </el-table>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :resizable="false"
                label="表名"
                prop="table_name"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                label="数据量"
                prop="table_rows"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                label="自增量当前值"
                prop="auto_increment"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                label="表描述"
                prop="table_comment"
              ></el-table-column>
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

    <!-- 角色表单 -->
    <el-dialog
      title="角色信息"
      @close="emptyForm"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-row>
        <el-col :span="11">
          <div>
            <h3>上级权限</h3>
            <ul id="roletree" class="ztree"></ul>
          </div>
        </el-col>
        <el-col :span="13">
          <div>
            <el-form
              :model="addForm"
              :rules="rules"
              ref="addForm"
              label-width="80px"
              label-position="right"
            >
              <el-form-item label="角色名称" prop="name">
                <el-input
                  v-model="addForm.name"
                  placeholder="请输入角色名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="角色编码" prop="code">
                <el-input
                  v-model="addForm.code"
                  placeholder="请输入角色编码"
                ></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input
                  type="textarea"
                  v-model="addForm.descr"
                  placeholder="请输入描述内容"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="100px">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="subForm"
                  :loading="subBtnLonging"
                  >确 定</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 角色表单 -->
    <!-- 查看权限 -->
    <el-dialog
      title="查看权限信息"
      :visible.sync="dialogform"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="padding: 0 35%; box-sizing: border-box">
        <ul id="tree" class="ztree"></ul>
      </div>
    </el-dialog>
    <!-- 查看权限 -->
  </div>
</template>

<script>
import zTree from "ztree";
import "ztree/css/metroStyle/metroStyle.css";
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
      isAction: "", //表单操作 查看 添加 更新
      query: {
        //查询表数据
        page: 1,
        pageSize: 20,
        table_name: ""
      },
      tabLoading: false, //表格加载
      roleTabData: [], //角色表格数据
      total: 0, //表格列数据
      dialogFormVisible: false, //弹框控制
      dialogform: false, //查看弹框控制
      addForm: {
        //表单信息
        name: "",
        code: "",
        descr: "",
        authIds: ""
      },
      treeData: [], //树数据
      selectId: "", //选中的id
      subBtnLonging: false, //防止重复提交
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入角色编码", trigger: "blur" }]
      }
    };
  },
  watch: {
    dialogFormVisible: function (val, oldval) {
      var _this = this;
      if (val) {
        _this.$nextTick(function () {
          _this.initzTree(_this.selectId);
        });
      }
    }
  },
  created () {
    this.getAuthsTree();
  },
  mounted () {
    this.getRoleTab();
  },
  methods: {
    getRoleTab () {
      //获取角色列表
      this.tabLoading = true;
      this.$fetchGet("sitioaTableCtrl/getSitiTableDict", this.query).then(res => {
        this.tabLoading = false;
        this.roleTabData = res.list;
        this.total = res.total;
      });
    },
    addrole () {
      //添加角色
      this.dialogFormVisible = true;
      this.isAction = "add";
    },
    check (row) {
      //查看
      this.$fetchGet("auths/roleId/" + row.id).then(res => {
        this.dialogform = true;
        this.isAction = "look";
        this.$nextTick(function () {
          this.menuTree(res);
        });
      });
    },
    updateAuth (row) {
      //更新
      this.$fetchGet("auths/roleId/" + row.id).then(res => {
        let Ids = [];
        $.each(this.treeData, (Pid, item) => {
          item.ranges = "diffent";
          $.each(res, (id, list) => {
            if (item.id == list.id) {
              Ids.push(list.id);
              item.ranges = list.ranges;
            }
          });
        });
        this.selectId = Ids;
        $.each(this.addForm, (key, item) => {
          this.addForm[key] = row[key] + "";
        });
        this.isAction = "update";
        this.dialogFormVisible = true;
        this.addForm.id = row.id;
      });
    },
    deleteAuth (row) {
      //删除
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$fetchDelete("roles/delete/" + row.id).then(res => {
          if (res == 1) {
            this.Gsuccess("删除成功！");
            this.getRoleTab();
          } else {
            this.Gerror("删除失败！");
          }
        });
      });
    },
    subForm () {
      //提交表单
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let formData = this.cloneObj(this.addForm);
          if (formData.authIds == "") {
            this.Gwarning("权限不能为空!");
            return;
          }
          this.subBtnLonging = true;
          if (this.isAction === "add") {
            this.$axios
              .post(
                "roles",
                {},
                {
                  params: formData
                }
              )
              .then(res => {
                if (res.status == 0) {
                  this.Gsuccess("添加成功");
                  this.dialogFormVisible = false;
                  this.getRoleTab();
                } else {
                  this.Gerror(res.message);
                }
                this.subBtnLonging = false;
              });
          } else if (this.isAction === "update") {
            this.$axios
              .put(
                "roles",
                {},
                {
                  params: formData
                }
              )
              .then(res => {
                if (res.status == 0) {
                  this.Gsuccess("更新成功");
                  this.dialogFormVisible = false;
                  this.getRoleTab();
                } else {
                  this.Gerror(res.message);
                }
                this.subBtnLonging = false;
              });
          }
        }
      });
    },
    emptyForm () {
      //清空表单
      this.addForm = {
        name: "",
        code: "",
        descr: "",
        authIds: ""
      };
      this.$refs.addForm.resetFields();
    },
    getAuthsTree () {
      //获取权限树数据
      this.$fetchGet("auths/authsTree").then(res => {
        this.treeData = res;
      });
    },
    //获得查看权限树的
    menuTree (treeData) {
      var _this = this;
      var IDMark_Switch = "_switch",
        IDMark_Icon = "_ico",
        IDMark_Span = "_span",
        IDMark_Input = "_input",
        IDMark_Check = "_check",
        IDMark_Edit = "_edit",
        IDMark_Remove = "_remove",
        IDMark_Ul = "_ul",
        IDMark_A = "_a";
      var setting = {
        edit: {
          drag: {
            isCopy: false,
            isMove: true
          },
          enable: false //设置 zTree 是否处于编辑状态
        },
        view: {
          addDiyDom: addDiyDom
        },
        check: {
          enable: false
        },
        data: {
          keep: {
            leaf: true,
            parent: true
          },
          simpleData: {
            open: true,
            enable: true,
            idKey: "id",
            pIdKey: "pid"
          },
          key: {
            name: "authName"
          }
        }
      };
      function addDiyDom (treeId, treeNode) {
        if (treeNode.parentNode && treeNode.parentNode.id != 2) return;
        var aObj = $("#" + treeNode.tId + IDMark_A);
        if (treeNode.rangeName) {
          var editStr =
            "<select class='selDemo' id='" +
            treeNode.id +
            "'><option value='r'>" +
            treeNode.rangeName +
            "</option></select>";
          aObj.after(editStr);
        }
      }
      // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      var ZREEE = $.fn.zTree.init($("#tree"), setting, treeData);

      ZREEE.expandAll(true);
    },
    //添加弹框的权限树
    initzTree (Sid) {
      var _this = this;
      var treeFlag = true;
      var IDMark_Switch = "_switch",
        IDMark_Icon = "_ico",
        IDMark_Span = "_span",
        IDMark_Input = "_input",
        IDMark_Check = "_check",
        IDMark_Edit = "_edit",
        IDMark_Remove = "_remove",
        IDMark_Ul = "_ul",
        IDMark_A = "_a";
      var setting = {
        edit: {
          drag: {
            isCopy: false,
            isMove: true
          },
          removeTitle: "删除",
          renameTitle: "更新",
          enable: false //设置 zTree 是否处于编辑状态
        },
        view: {
          addDiyDom: addDiyDom
        },
        check: {
          enable: true,
          chkStyle: "checkbox",
          radioType: "all"
        },
        callback: {
          onCheck: onCheck
        },
        data: {
          keep: {
            leaf: true,
            parent: true
          },
          simpleData: {
            open: true,
            enable: true,
            idKey: "id",
            pIdKey: "pid"
          },
          key: {
            name: "name",
            url: "href"
          }
        }
      };
      Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      function addDiyDom (treeId, treeNode) {
        if (treeNode.parentNode && treeNode.parentNode.id != 2) return;
        var aObj = $("#" + treeNode.tId + IDMark_A);
        var editStr = "";
        if (_this.isAction == "add") {
          editStr = "";
          if (treeNode.type == 3 && treeNode.setRange == 1) {
            editStr =
              "<select class='selDemo' id='" +
              treeNode.id +
              "'><option value='my-self'>限本人</option><option value='my-orga'>限所属部门</option><option value='all'>所有数据</option></select>";
            aObj.after(editStr);
            var btn = $("#" + treeNode.id);
            if (btn)
              btn.bind("change", function () {
                onCheck(treeId, treeNode);
              });
          }
        } else if (_this.isAction == "update") {
          editStr = "";
          if (
            treeNode.type == 3 &&
            treeNode.setRange == 1 &&
            treeNode.ranges == "diffent"
          ) {
            editStr =
              "<select class='selDemo' id='" +
              treeNode.id +
              "'><option value='my-self'>限本人</option><option value='my-orga'>限所属部门</option><option value='all'>所有数据</option></select>";
            aObj.after(editStr);
            var btn = $("#" + treeNode.id);
            if (btn)
              btn.bind("change", function () {
                onCheck(treeId, treeNode);
                // alert("diy Select value="+btn[0].value+" for " + treeNode.id);
              });
          } else if (
            treeNode.type == 3 &&
            treeNode.setRange == 1 &&
            treeNode.ranges == "all"
          ) {
            editStr =
              "<select class='selDemo' id='" +
              treeNode.id +
              "'><option value='my-self'>限本人</option><option value='my-orga'>限所属部门</option><option value='all' selected=selectd>所有数据</option></select>";
            aObj.after(editStr);
            var btn = $("#" + treeNode.id);
            if (btn)
              btn.bind("change", function () {
                onCheck(treeId, treeNode);
                // alert("diy Select value="+btn[0].value+" for " + treeNode.id);
              });
          } else if (
            treeNode.type == 3 &&
            treeNode.setRange == 1 &&
            treeNode.ranges == "my-self"
          ) {
            editStr =
              "<select class='selDemo' id='" +
              treeNode.id +
              "'><option value='my-self' selected=selectd >限本人</option><option value='my-orga'>限所属部门</option><option value='all'>所有数据</option></select>";
            aObj.after(editStr);
            var btn = $("#" + treeNode.id);
            if (btn)
              btn.bind("change", function () {
                onCheck(treeId, treeNode);
                // alert("diy Select value="+btn[0].value+" for " + treeNode.id);
              });
          } else if (
            treeNode.type == 3 &&
            treeNode.setRange == 1 &&
            treeNode.ranges == "my-orga"
          ) {
            editStr =
              "<select class='selDemo' id='" +
              treeNode.id +
              "'><option value='my-self'  >限本人</option><option value='my-orga' selected=selectd>限所属部门</option><option value='all'>所有数据</option></select>";
            aObj.after(editStr);
            var btn = $("#" + treeNode.id);
            if (btn)
              btn.bind("change", function () {
                onCheck(treeId, treeNode);
                // alert("diy Select value="+btn[0].value+" for " + treeNode.id);
              });
          }
        }
      }
      var sonNode = [];
      function onCheck (e, treeId, treeNode) {
        var treeObj = $.fn.zTree.getZTreeObj("roletree"),
          nodes = treeObj.getCheckedNodes(true),
          v = [];
        sonNode = [];
        for (var i = 0;i < nodes.length;i++) {
          if (nodes[i].type == 3) {
            v.push(nodes[i].id + "#" + $("#" + nodes[i].id).val());
          } else {
            v.push(nodes[i].id);
          }
          //获取选中节点的值
        }
        _this.addForm.authIds = v;
      }
      var ZREEE = $.fn.zTree.init($("#roletree"), setting, _this.treeData);

      if (_this.selectId.length != 0) {
        var node;
        $.each(_this.selectId, function (index, item) {
          if (item != null) {
            node = ZREEE.getNodeByParam("id", item);
          }
          ZREEE.checkNode(node, true, false);
        });
      }
      ZREEE.expandAll(true);
    },
    handleSizeChange (val) {
      //分页 选择每页条数
      this.query.pageSize = val;
      this.getRoleTab();
    },
    handleCurrentChange (val) {
      //分页 选择当前是多少页
      this.query.page = val;
      this.getRoleTab();
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
    .rolecontent {
      padding-top: 10px;
      box-sizing: border-box;
      .roleTab {
        background-color: #fff;
      }
    }
  }
}
</style>

