<template>
  <div class="contentPage">
    <div class="contentBorder">
      <el-row class="topAdd">
        <el-col style="width: 300px" class="queryinp">
          <div>
            <el-input
              placeholder="用户名或姓名查找"
              v-model="query.userName"
              size="small"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchName"
              ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-button type="primary" size="small" @click="addrole"
          >添加用户</el-button
        >
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
              style="width: 100%"
              :height="$store.getters.docHeight - 35"
            >
              <el-table-column
                :resizable="false"
                type="index"
                width="60"
                label="序号"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                prop="userName"
                label="用户名"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                prop="realName"
                label="姓名"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                prop="userTel"
                label="联系方式"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                prop="orgName"
                label="组织"
                align="center"
              ></el-table-column>
              <el-table-column
                :resizable="false"
                prop="roleName"
                label="角色"
                align="center"
              ></el-table-column>
              <!-- <el-table-column :resizable="false"
                prop="status"
                label="状态"
                :formatter="Fstatus"
                width="160"
                align="center"
              ></el-table-column>
              <el-table-column :resizable="false" prop="remark" label="描述" align="center"></el-table-column>-->
              <el-table-column
                :resizable="false"
                fixed="right"
                label="操作"
                align="center"
                width="200"
              >
                <template slot-scope="scope">
                  <!-- <el-button size="mini" type="success" @click="allocation(scope.row)">角色分配</el-button> -->
                  <el-button
                    size="mini"
                    type="success"
                    @click="updateAuth(scope.row)"
                    >更新</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="cancelBtn(scope.row)"
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-size="query.pageSize"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 用户表单 -->
    <el-dialog
      title="用户信息"
      @close="emptyForm"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="addForm.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input
            v-model="addForm.realName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="userTel">
          <el-input
            v-model="addForm.userTel"
            placeholder="请输入联系方式(11位)"
          ></el-input>
        </el-form-item>
        <el-form-item label="组织">
          <el-cascader
            style="width: 100%"
            :options="originTree"
            :props="defaultProps"
            @change="selectOrg"
            change-on-select
            :show-all-levels="false"
            v-model="parent"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="角色" prop="roleId1">
          <el-select
            style="width: 100%"
            v-model="addForm.roleId1"
            multiple
            @change="selectRoles"
            placeholder="选择角色"
          >
            <el-option
              v-for="item in allRole"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="状态" prop="status">
          <el-select style="width:100%" v-model="addForm.status" placeholder="请选择用户状态">
            <el-option
              v-for="item in userStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="addForm.remark" placeholder="请输入描述内容"></el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subForm" :loading="subBtnLonging"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 用户表单 -->
    <!-- 角色表单 -->
    <el-dialog
      :visible.sync="dialogform"
      style="width: 100%"
      @close="emptyroleForm"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="text-align: center; margin-top: -44px; font-size: 22px">
        角色分配
        <span style="color: red">{{ thisRow.userName }}</span>
      </div>
      <el-button size="mini" type="primary" @click="isShowForm = true"
        >添加角色</el-button
      >

      <el-table
        highlight-current-row
        border
        style="width: 100%; margin-top: 10px;"
        :data="roleAllotTab"
      >
        <el-table-column
          :resizable="false"
          prop="orgName"
          align="center"
          label="组织"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="roleName"
          align="center"
          label="角色"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          align="center"
          label="操作"
          width="210"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteRole(scope.row)"
              >删除</el-button
            >
            <el-button size="mini" type="primary" v-if="scope.row.mainOrg == 1"
              >主要角色</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="mainRole(scope.row)"
              v-else
              >设置为主要角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-form
        :inline="true"
        :model="roleForm"
        :rules="rules"
        ref="roleForm"
        style="margin-top: 20px"
        label-width="80px"
        v-if="isShowForm"
        label-position="right"
      >
        <el-form-item label="组织">
          <el-cascader
            :options="originTree"
            :props="defaultProps"
            @change="selectOrg"
            change-on-select
            :show-all-levels="false"
            v-model="parent"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="角色" prop="roleId1">
          <el-select
            v-model="roleForm.roleId1"
            multiple
            @change="selectRoles"
            placeholder="选择角色"
          >
            <el-option
              v-for="item in allRole"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-left: 30px"
            type="primary"
            size="mini"
            @click="addRole"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 角色表单 -->
  </div>
</template>

<script>
import { _debounce } from "@/libs/public.js";
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
    var validateUserTel = (rule, value, callback) => {
      let str = /^[1][2,3,4,5,7,8][0-9]{9}$/
      if (!value) {
        return callback(new Error('联系方式不能为空'));
      }
      if (!str.test(value)) {
        callback(new Error('联系方式为11位整数值'));
      } else {
        callback();
      }
    };
    return {
      userStatus: [
        {
          //用户状态
          label: "有效",
          value: 1
        },
        {
          label: "冻结",
          value: 2
        }
      ],
      userFstatus: ["", "有效", "冻结"], //格式数据
      isAction: "", //表单操作 查看 添加 更新
      query: {
        //查询表数据
        page: 1,
        pageSize: 20,
        // userName: "",
        // realName: "",
        // orgId: ""
      },
      tabLoading: false, //表格加载
      roleTabData: [], //表格数据
      total: 0, //表格列数据
      dialogFormVisible: false, //弹框控制
      dialogform: false, //角色弹框控制
      addForm: {
        //表单信息
        id: '',
        userName: "",
        realName: "",
        // status: "",
        orgIds: "",
        roleIds: "",
        userTel: ""
        // remark: ""
      },
      subBtnLonging: false, //防止重复提交
      roleAllotTab: [], //角色表格数据
      thisRow: {}, //当前行数据
      originTree: [], //组织树数据
      roleForm: {
        // 添加角色分配
        userId: "",
        orgId: "",
        roleId: ""
      },
      allRole: [], //所有角色
      parent: [], //选择组织节点
      defaultProps: {
        label: "name",
        children: "children",
        value: "id"
      },
      isShowForm: false, //添加表单
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 15, message: '长度在 1 到 15个字符', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 15, message: '长度在 1 到 15个字符', trigger: 'blur' }],
        userTel: [
          { required: true, message: "请输入联系方式(11位)", trigger: "blur" },
          { validator: validateUserTel, trigger: 'blur' }],
        // status: [{ required: true, validator: checkid, trigger: "change" }],
        // roleId1: [{ required: true, validator: checkid, trigger: "change" }]
        roleId1: [{ required: true, message: "请选择角色", trigger: "change" }]
      }
    };
  },
  created () {
    this.getorgsTree();
    this.getAllRole();
  },
  mounted () {
    this.getRoleTab();
  },
  methods: {
    selectRoles (val) {
      this.$forceUpdate()
      this.addForm.roleIds = val.join(",")
      this.roleForm.roleIds = val.join(",")
    },
    getAllRole () {
      //获取所有角色
      this.$fetchGet("roles/idAndName").then(res => {
        this.allRole = res;
        this.$store.commit('SET_LOADING',false)
      });
    },
    getorgsTree () {
      //获取组织树数据
      this.$fetchGet("orgs/getTree").then(res => {
        res.forEach(item => {
          if (!item.pid) {
            item.pid = 0
          }
        })
        let originTree = this.parseChildren(0, res.slice(0));
        this.deleteChildren(originTree);
        this.originTree = originTree;
      });
    },
    searchName () {
      this.query.page = 1
      //获取角色列表
      if (!this.query.userName) {
        this.query = {
          page: this.query.page,
          pageSize: this.query.pageSize,
        }
      }
      this.getRoleTab()
    },
    getRoleTab () {
      this.tabLoading = true;
      this.$fetchGet("users", this.query).then(res => {
        this.tabLoading = false;
        if (res.list && res.list.length > 0) {
          res.list.forEach(item => {
            item.roleId1 = []
            item.roleNameList = []
            item.orgs1 = []
            item.orgNameList = []
            item.roles.forEach(items => {
              item.roleId1.push(items.id)
              item.roleNameList.push(items.name)
            })
            item.orgs.forEach(items => {
              items.orgId = items.path!==null?(items.path.split(',')).map(Number):""
              item.orgs1.push(items.orgId)
              item.orgNameList.push(items.name)
            })
            item.roleName = item.roleNameList && item.roleNameList.length ? item.roleNameList.join(",") : ''
            item.orgName = item.orgNameList && item.orgNameList.length ? item.orgNameList.join(",") : ''
          })
        }
        this.roleTabData = res.list;
        this.total = res.total;
      });
    },
    getNewRole () {
      //获取当前的角色列表
      this.$fetchGet("users/getRoleByUser/" + this.roleForm.userId).then(
        res => {
          this.roleAllotTab = res;
        }
      );
    },
    addRole () {
      //角色分配添加角色
      if (this.roleForm.orgId == "") {
        this.Gwarning("角色组织不能为空");
        return;
      }
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.$fetchPost("users/saveOrgAndRole", this.roleForm).then(res => {
            if (res == 1) {
              this.Gsuccess("添加成功");
              this.getNewRole();
            } else {
              this.Gerror("添加失败", +res.message);
            }
          });
        }
      });
    },
    deleteRole (row) {
      //角色分配删除角色
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$fetchDelete("users/deleteOrgAndRole", {
          userId: row.userId,
          orgId: row.orgId,
          roleId: row.roleId
        }).then(res => {
          if (res == 1) {
            this.Gsuccess("删除成功");
            this.getNewRole();
          } else {
            this.Gerror("删除失败", +res.message);
          }
        });
      });
    },
    mainRole (row) {
      //角色分配设置主要角色
      this.$fetchPut("roles/signMainOrg", {
        userId: row.userId,
        orgId: row.orgId,
        roleId: row.roleId
      }).then(res => {
        if (res.status == 0) {
          this.Gsuccess("更新成功");
          this.getNewRole();
        } else {
          this.Gerror("更新失败", +res.message);
        }
      });
    },
    allocation (row) {
      //角色分配
      this.dialogform = true;
      this.roleForm.userId = row.id;
      this.thisRow = row;
      this.roleAllotTab = row.roles;
      // this.getNewRole();

    },
    addrole () {
      //添加角色
      this.dialogFormVisible = true;
      this.isAction = "add";
    },
    updateAuth (row) {
      this.parent = []
      // if (row.orgs.length && row.orgs[0] && row.orgs[0].id) {
      //   this.parent = [row.orgs[0].id]
      // } else {
      //   this.parent = ''
      // }
      if (row.orgs.length) {
        row.orgs.forEach(item => {
          this.parent.push(item.id)
        })
      }
      this.addForm.roleId1 = []

      //更新
      $.each(this.addForm, (key, item) => {
        this.addForm[key] = row[key];
      });
      this.isAction = "update";
      this.dialogFormVisible = true;
      this.addForm.id = row.id;

      this.addForm.roleIds = row.roleId1.join(",")
      this.addForm.roleId1 = row.roleId1
      // let x = [], y = []
      // x = this.flatten(row.orgs1)
      // y = this.arr_unique4(x)
      if (this.parent) {
        this.addForm.orgIds = this.parent.join(",");
      } else {
        this.addForm.orgIds = ''
      }
    },
    cancelBtn (row) {
      //删除
      this.$confirm(`确认删除？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$fetchDelete("users/id/" + row.id).then(res => {
          if (res == 1) {
            this.Gsuccess(`删除成功！`);
            this.getRoleTab();
          } else {
            this.Gerror(`删除失败！`);
          }
        });
      });
    },
    freezeBtn (row) {
      //冻结
      this.$confirm("确认冻结？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$fetchPut("users/freezeUser/" + row.id).then(res => {
          if (res == "success") {
            this.Gsuccess("冻结成功！");
            this.getRoleTab();
          } else {
            this.Gerror("冻结失败！");
          }
        });
      });
    },
    subForm: _debounce(function () {
      //提交表单
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let formData = this.cloneObj(this.addForm);
          this.subBtnLonging = true;
          if (this.isAction === "add") {
            this.$fetchPost("users", formData).then(res => {
              if (res) {
                this.Gsuccess("添加成功");
                this.dialogFormVisible = false;
                this.getRoleTab();
              } else {
                this.Gerror(res.message);
              }
              this.subBtnLonging = false;
            });
          } else if (this.isAction === "update") {
            this.$fetchPut("users", formData).then(res => {
              if (res) {
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
    }, 300),
    emptyForm () {
      //清空表单
      this.addForm = {
        userName: "",
        realName: "",
        userTel: '',
        // status: "",
        // remark: "",
        roleIds: '',
        roleId1: [],
        orgIds: '',
      };
      this.parent = []
      this.subBtnLonging = false
      this.$refs.addForm.resetFields();
    },
    emptyroleForm () {
      this.roleForm = {
        userId: "",
        orgId: '',
        roleId: '',
        roleId1: []
      };
      if (this.isShowForm) {
        this.$refs.roleForm.resetFields();
        this.isShowForm = false;
      }
    },
    selectOrg (val) {
      let x = this.flatten(val)
      let y = this.arr_unique4(x)
      //选择组织
      this.addForm.orgIds = y.join(",");
      this.roleForm.orgIds = y.join(",");
    },
    // 二维转一维
    flatten (arr) {
      return [].concat(...arr.map(x => Array.isArray(x) ? this.flatten(x) : x))
    },
    // 数组去重
    arr_unique4 (arr) {
      var res = [];
      arr.forEach((val) => {
        if (!res.includes(val)) {
          res.push(val);
        }
      });
      return res;
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
    },
    Fstatus (row) {
      //格式状态
      return this.userFstatus[row.status];
    },
    parseChildren (pid, json) {
      //格式父级权限
      var arr = [];
      $.each(json, (index, item) => {
        // item.Ids = item.pid + "," + item.id;
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
      });
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

