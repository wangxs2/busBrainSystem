<template>
  <div class="tags">
    <div class="rightinif">
      <div class="img-write" @click="clickIcon">
        
      </div>
      <span style="margin-right:12px;color:#64718D">{{getCookie('orgname')}}</span>
      <span style="color:#64718D">{{getCookie('realname')}}</span>
      <el-dropdown @command="handleCommand">
        <span class="rightinif-link" style="color:#64718D">
          <span
            style="display:inline-block;width:32px;height:32px;background:rgba(237,238,240,1);border-radius:50%;margin-right:8px"
          >
            <img src="../../../assets/image/icon_4_tx@3x.png" />
          </span>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="a">修改密码</el-dropdown-item> -->
          <el-dropdown-item command="b">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      @close="emptyForm"
      :visible.sync="upPwdPop"
      width="576"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="upPwdForm"
        ref="upPwdForm"
        :rules="rules"
        label-width="90px"
        label-position="right"
      >
        <el-form-item label="原密码" prop="oldPwd">
          <el-input
            v-model="upPwdForm.oldPwd"
            type="password"
            placeholder="输入原密码"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd1">
          <el-input
            v-model="upPwdForm.newPwd1"
            type="password"
            placeholder="输入新密码"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPwd">
          <el-input
            v-model="upPwdForm.newPwd"
            type="password"
            placeholder="再次输入新密码"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div style="text-align: right;">
            <el-button @click="upPwdPop = false">取 消</el-button>
            <el-button type="primary" @click="upPwdbtn">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getCookie,
  delCookie
} from '@/libs/util';
import basePwd from "@/libs/base.js";
import { validatePwd } from "@/libs/validate.js";
const b64 = new basePwd();

export default {
  name: "topTag",
  data () {
    let checkOldPwd = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      } else {
        this.$fetchGet("traffic-investment/user/checkPwd/" + b64.encode(value)).then(res => {
          if (res.valid) {
            callback();
          } else {
            return callback(new Error("原密码错误"));
          }
        });
      }
    };
    let checkPwd = (rule, value, callback) => {
      if (value === "") {
        if (rule.field == "newPwd") {
          return callback(new Error("请输入新密码"));
        } else if (rule.field == "newPwd1") {
          return callback(new Error("请再次输入新密码"));
        }
      } else {
        if (rule.field == "newPwd") {
          if (validatePwd(value)) {
            if (this.upPwdForm.newPwd1 == "") {
              callback();
            } else {
              if (this.upPwdForm.newPwd1 == value) {
                callback();
              } else {
                return callback(new Error("两次密码不一致"));
              }
            }
          } else {
            this.Gwarning(
              "密码至少包含8个字符，至少1个字母，1个数字和1个特殊字符！"
            );
            return callback(new Error("密码格式错误"));
          }
        }
        if (rule.field == "newPwd1") {
          if (validatePwd(value)) {
            if (this.upPwdForm.newPwd == "") {
              callback();
            } else {
              if (this.upPwdForm.newPwd == value) {
                callback();
              } else {
                return callback(new Error("两次密码不一致"));
              }
            }
          } else {
            this.Gwarning(
              "密码至少包含8个字符，至少1个字母，1个数字和1个特殊字符！"
            );
            return callback(new Error("密码格式错误"));
          }
        }
      }
    };
    return {
      upPwdPop: false, //密码修改
      nowTime: new Date(),
      streetName: '',
      strNowTime: "",
      upPwdForm: {
        oldPwd: "",
        newPwd1: "",
        newPwd: ""
      },
      rules: {
        oldPwd: [
          {
            required: true,
            trigger: "blur",
            validator: checkOldPwd
          }
        ],
        newPwd: [
          {
            required: true,
            trigger: "blur",
            validator: checkPwd
          }
        ],
        newPwd1: [
          {
            required: true,
            trigger: "blur",
            validator: checkPwd
          }
        ]
      },
      curUserName: '',
      smallModel: false,
      tableList: [],
    };
  },
  computed: {
    ...mapGetters(["menuFlag", "userName"]),
    getRouterName: function () {
      return this.$route.matched.slice(1);
    }
  },
  created () {
  },
  mounted () {
    this.curUserName = sessionStorage.getItem("curUserName");
    // this.start()
    // this.getProjectInquiryList()
  },
  methods: {
    clickIcon () {
      this.smallModel = true
      this.$emit('toptagsidevalue', this.smallModel)
      this.getProjectInquiryList()
    },
    getProjectInquiryList () {
      this.$fetchGet('traffic-investment/comment/unread').then(res => {
        this.tableList = res.result.comment
        this.$emit('toptagtablelist', this.tableList)
      })
    },
    emptyForm () {
      //清空操作
      this.upPwdForm = {
        oldPwd: "",
        newPwd1: "",
        newPwd: ""
      };
      this.$refs.upPwdForm.resetFields();
    },
    upPwdbtn () {
      //修改密码 
      this.$refs.upPwdForm.validate(valid => {
        if (valid) {
          this.$fetchPut("traffic-investment/user/pwd/" + b64.encode(this.upPwdForm.newPwd)).then(
            res => {
              if (res == "success") {
                this.Gsuccess("修改成功");
                this.upPwdPop = false;
              } else {
                this.Gwarning(res);
              }
            }
          );
        } else {
          this.Gwarning("请完善信息");
        }
      });
    },

    handleCommand (command) {
      //下拉菜单
      if (command === "b") {
        this.$router.push("/login?flag=true");
        delCookie('Token')
        store.commit('SET_ID', '') //清除user
        store.commit('SET_TOKEN', '') //清除user

      } else if (command === "a") {
        this.upPwdPop = true;
      }
    },

  }
};
</script>


<style lang="scss" scoped>
.tags {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  margin-right: 30px;
  .rightinif {
    flex: 1;
    display: flex;
    align-items: center;
    .img-write {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-right: 30px;
      cursor: pointer;
      .img {
        width: 20px;
        height: 20px;
      }
      .write {
        position: absolute;
        top: 21px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ff4242;
      }
    }
    .rightinif-link {
      display: flex;
      align-items: center;
      margin-left: 17px;
    }
  }
}
</style>

<style lang="scss">
.tags {
  .el-dialog {
    width: 576px;
  }
}
</style>
