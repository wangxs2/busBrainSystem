<template>
  <div class="contentPage">
    <div class="contentBorder">
      <div class="topAdd">
        <el-button type="primary" size="small" @click="allAuth"
          >查看所有</el-button
        >
        <el-button type="primary" size="small" @click="addAuth"
          >添加组织</el-button
        >
      </div>
      <el-row class="authcontent">
        <el-col :span="5" class="authTree">
          <div>
            <el-tree
              :data="authsTree"
              :props="defaultProps"
              default-expand-all
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
          <div
            style="box-sizing: border-box; padding: 8px; background: #ffffff"
          >
            <el-table
              :data="authTab"
              stripe
              border
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
                label="组织名称"
                align="center"
              ></el-table-column>
              <!-- <el-table-column :resizable="false" prop="shortName" label="组织简称" align="center"></el-table-column> -->
              <el-table-column
                :resizable="false"
                prop="parentName"
                label="上级组织"
                align="center"
              ></el-table-column>
              <!-- <el-table-column :resizable="false" label="地址" :formatter="Fdir" align="center"></el-table-column> -->
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
      title="组织信息"
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
              <el-form-item label="组织名称" prop="name">
                <el-input
                  v-model="authForm.name"
                  placeholder="请输入组织名称"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <!-- <el-col :span="12"> -->
          <!-- <div>
              <el-form-item label="组织简称" prop="shortName">
                <el-input v-model="authForm.shortName" placeholder="请输入组织简称"></el-input>
              </el-form-item>
            </div>
          </el-col>-->
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <!-- v-if="isAction === 'update'?(parent.length > 0?true:false):true" -->
              <el-form-item label="上级组织" prop="parent">
                <el-cascader
                  :options="authsTree"
                  :props="defaultProps"
                  change-on-select
                  :show-all-levels="false"
                  v-model="parent"
                ></el-cascader>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              &nbsp;
              <!-- <el-form-item label="组织类型">
                <el-input v-model="authForm.type"></el-input>
              </el-form-item>-->
            </div>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="18"> -->
          <!-- <div> -->
          <!-- <el-form-item label="地址" prop="Address" :rules="isAddress()"> -->
          <!-- <el-select
                  style="width:32%"
                  v-model="authForm.province"
                  filterable
                  placeholder="请选择省"
                >
                  <el-option
                    v-for="item in provinceData"
                    :key="item.id"
                    :label="item.fullname"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select style="width:32%" v-model="authForm.city" filterable placeholder="请选择市">
                  <el-option
                    v-for="item in CityData1"
                    :key="item.id"
                    :label="item.fullname"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  style="width:32%"
                  v-model="authForm.zone"
                  filterable
                  placeholder="请选择区/县"
                >
                  <el-option
                    v-for="item in CityData2"
                    :key="item.id"
                    :label="item.fullname"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>-->
          <!-- <el-col :span="6">
            <el-form-item label="地址">
              <el-input v-model="authForm.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
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
    return {
      timeFlag: 1, //加载次数
      provinceData: null, //省数据
      CityData1: null, //一级城市
      CityData2: null, //一级城市
      tabLoading: false, //表格加载
      query: {
        //查询表数据
        page: 1,
        pageSize: 20,
        id: ""
      },
      authTab: [], //权限列表数据
      total: 0, //表格列数据
      authsTree: [], //权限树数据
      subBtnLonging: false, //防止重复提交
      dialogform: false, //表单弹框控制
      parent: [], //选择父节点
      authForm: {
        //添加信息
        pid: "",
        name: "",
        ppath: "",
        type: "",
        shortName: "",
        // province: "",
        // provinceId: "",
        // city: "",
        // cityId: "",
        // zone: "",
        // zoneId: "",
        // address: ""
      },
      isAction: "", //表单操作 查看 添加 更新
      defaultProps: {
        label: "name",
        children: "children",
        value: "id"
      },
      rules: {
        name: [
          { required: true, message: "请输入组织名称", trigger: "blur" },
          { min: 1, max: 40, message: '长度在 1 到 40个字符', trigger: 'blur' }
        ],
        shortName: [
          { required: true, message: "请输入组织简称", trigger: "blur" }
        ]
      },
      parentAuthTree: [],
      curOrgsAllList: []
    };
  },
  created () {
    this.getAuthsTree();
    // this.getProvinceData();
  },
  mounted () {
    this.getorgAll()
  },
  watch: {
    parent: function (val, oldval) {
      //选择父节点
      if (val.length > 0) {
        let arr = val.slice(0);
        arr.pop();
        this.authForm.ppath = arr.join(",");
        this.authForm.pid = val[val.length - 1];
      }
    },
    "authForm.province": function (val, oldVal) {
      //选择省
      if (val) {
        val = val.split(",");
        if (this.timeFlag > 1) {
          this.authForm.city = "";
          this.authForm.zone = "";
        }
        this.getCityData(val[1]).then(res => {
          this.CityData1 = res;
          this.timeFlag++;
        });
      }
    },
    "authForm.city": function (val, oldVal) {
      //选择市
      if (val) {
        val = val.split(",");
        if (this.timeFlag > 1) {
          this.authForm.zone = "";
        }
        this.getCityData(val[1]).then(res => {
          this.CityData2 = res;
          this.timeFlag++;
        });
      }
    }
  },
  methods: {
    selectOrg (val) {
      if (val && val.length == 1) {
        val.forEach(item => {
          this.parentAuthTree.forEach(items => {
            if (item == items.id) {
              this.authForm.ppath = items.path
              this.authForm.pid = items.id

            }
          })
        })
      } else if (val && val.length > 1) {
        let x = [val[val.length - 1]]
        x.forEach(item => {
          this.parentAuthTree.forEach(items => {
            if (item == items.id) {
              this.authForm.ppath = items.path
              this.authForm.pid = items.id

            }
          })
        })
      }
    },
    getProvinceData () {
      //获取省份信息
      this.$fetchGet("robot/getProvinceList").then(res => {
        let province = JSON.parse(res).result[0];
        this.provinceData = province.map(item => {
          item.value = item.fullname + "," + item.id;
          return item;
        });
      });
    },
    getCityData (id) {
      //获取下级城市信息
      return new Promise((resolve, reject) => {
        this.$fetchGet("robot/getCityZoneList", { id }).then(res => {
          let city = JSON.parse(res).result[0];
          resolve(
            city.map(item => {
              item.value = item.fullname + "," + item.id;
              return item;
            })
          );
        });
      });
    },
    isAddress () {
      //地址验证
      let rules = {
        required: true,
        validator: (rule, value, callback) => {
          if (
            this.authForm.province == "" ||
            this.authForm.city == "" ||
            this.authForm.zone == ""
          ) {
            return callback(new Error("请选择完整地址"));
          } else {
            callback();
          }
        }
      };
      return rules;
    },
    getorgAll () {
      this.$fetchGet("orgs", this.query).then(res => {
        this.curOrgsAllList = res.list
        this.getAuthTab();
      });
    },
    getAuthTab () {
      //获取权限表格数据
      this.tabLoading = true;
      this.$fetchGet("orgs", this.query).then(res => {
        this.tabLoading = false;
        if (res.list && res.list.length) {
          res.list.forEach(item => {
            if (item.pid) {
              this.curOrgsAllList.forEach(items => {
                if (item.pid == items.id) {
                  item.parentName = items.name
                }
              })
            }
          })
        }
        this.authTab = res.list;
        this.total = res.total;
      });
    },
    getAuthsTree () {
      //获取权限树数据
      this.$fetchGet("orgs/getTree").then(res => {
        this.parentAuthTree = res
        res.forEach(item => {
          if (!item.pid) {
            item.pid = 0
          }
        })
        let authsTree = this.parseChildren(0, res.slice(0));
        this.deleteChildren(authsTree);
        this.authsTree = authsTree;
        this.$store.commit("SET_ORG", res);
      });
    },
    subForm: _debounce(function () {
      //提交表单
      this.$refs.authForm.validate(valid => {
        if (valid) {
          if (this.parent.length == 0) {
            this.authForm.ppath = '1'
          }
          let formData = this.cloneObj(this.authForm);
          // formData.provinceId = formData.province.split(",")[1];
          // formData.province = formData.province.split(",")[0];
          // formData.cityId = formData.city.split(",")[1];
          // formData.city = formData.city.split(",")[0];
          // formData.zoneId = formData.zone.split(",")[1];
          // formData.zone = formData.zone.split(",")[0];

          // if (this.parent.length == 0 && this.isAction !== "update") {
          //   this.Gwarning("请选择上级组织！");
          //   return;
          // }

          this.subBtnLonging = true;
          if (this.isAction === "add") {
            this.$fetchPost("orgs", formData).then(res => {
              if (res) {
                this.Gsuccess("添加成功");
                this.dialogform = false;
                this.getAuthTab();
                this.getAuthsTree();
              } else {
                this.Gerror(res.message);
              }
              this.subBtnLonging = false;
            });
          } else if (this.isAction === "update") {
            this.$fetchPut("orgs", formData).then(res => {
              if (res) {
                this.Gsuccess("更新成功");
                this.dialogform = false;
                this.getAuthTab();
                this.getAuthsTree();
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
      this.query.id = val.id;
      this.getAuthTab();
      this.getAuthsTree();
    },
    emptyForm () {
      //清空表单和验证
      this.authForm = {
        pid: "",
        name: "",
        ppath: "",
        // type: "",
        shortName: "",
        // province: "",
        // provinceId: "",
        // city: "",
        // cityId: "",
        // zone: "",
        // zoneId: "",
        // address: ""
      };
      this.parent = [];
      this.subBtnLonging = false
      this.$refs.authForm.resetFields();
      this.$refs.authForm.clearValidate();
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
    },
    addAuth () {
      //添加权限
      this.timeFlag = 1;
      this.isAction = "add";
      this.dialogform = true;
    },
    updateAuth (row) {
      console.log(row)
      //更新权限
      this.timeFlag = 0;
      this.isAction = "update";
      this.dialogform = true;
      $.each(this.authForm, (key, item) => {
        this.authForm[key] = row[key] + "";
      });

      if (row.path == "" || row.path == undefined) {
        this.parent = [];
        this.authForm.pid = "";
        this.authForm.ppath = "";
      } else {
        let thisId = row.path,
          arr = [];
        thisId = thisId.split(",");
        $.each(thisId, (index, item) => {
          arr.push(parseInt(item));
        });
        arr = arr.filter(function (n) { return n })
        this.parent = arr;
      }
      // this.authForm.province = row.province + "," + row.provinceId;
      // this.authForm.city = row.city + "," + row.cityId;
      // this.authForm.zone = row.zone + "," + row.zoneId;
      this.authForm.id = row.id;
    },
    deleteAuth (row) {
      //删除权限
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$fetchDelete("orgs/id/" + row.id).then(res => {
          if (res == 1) {
            this.Gsuccess("删除成功！");
            this.getAuthTab();
            this.getAuthsTree();
          } else {
            this.Gerror(res.value.id);
          }
        })
      })
    },
    Fdir (row) {
      //格式地址数据
      return (
        row.province +
        "," +
        row.city +
        "," +
        row.zone +
        (row.address ? "," + row.address : "")
      );
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
      this.query.id = "";
      this.getAuthTab();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-tree-node__label {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}
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
      // display: flex;
      // align-items: stretch;
      padding-top: 10px;
      box-sizing: border-box;
      .authTree {
        box-sizing: border-box;
        // margin-right: 10px;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #fff;
        .el-tree {
          color: #000;
        }
      }
      .authTab {
        // background-color: #fff;
        padding: 0 15px;
        box-sizing: border-box;
      }
    }
  }
}
</style>

