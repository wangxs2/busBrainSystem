<template>
  <div class="forget-pwd">
    <div class="forget-pwd-content">
      <div class="title-form">
        <div class="title">找回密码</div>
        <div class="input-form" v-if="resetPwd">
          <el-form
            :model="phoneDxForm"
            :show-message="false"
            :rules="phoneDxRules"
            ref="phoneDxForm"
            class="ruleSa"
          >
            <el-form-item label prop="number" style="position: relative;margin-bottom:15px">
              <el-input type="text" placeholder="请输入手机号码" v-model="phoneDxForm.number">
                <i slot="prefix" class="iconfont" style="font-size:17px;margin-left:3px;"></i>
              </el-input>
              <img src="../../assets/image/icon_zh@3x.png" alt class="zdy-icon" />
              <span v-if="phoneFlag" class="error-message">{{phoneMess}}</span>
            </el-form-item>
            <div class="dx-code-wrapper">
              <el-form-item label prop="veriCode" style="position: relative;margin-bottom:0;">
                <el-input type="text" placeholder="请输入短信验证码" v-model="phoneDxForm.veriCode">
                  <i slot="prefix" class="iconfont" style="font-size:24px;"></i>
                </el-input>
                <img src="../../assets/image/icon_yzh@3x.png" alt class="zdy-icon" />
                <span v-if="dxCodeFlag" class="error-message">{{dxCodeMess}}</span>
              </el-form-item>
              <el-button
                :class="[disabledBtn?'dx-code dx-code-grey':'dx-code']"
                @click="getCode"
                :disabled="disabledBtn"
              >{{codeText}}</el-button>
            </div>
            <el-form-item style="margin-bottom:0;margin-top:49px">
              <el-button :loading="subLoadDxCode" type="primary" @click="goBack('phoneDxForm')">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="input-form" v-else>
          <el-form
            :model="resetPwdForm"
            :show-message="false"
            :rules="resetPwdRules"
            ref="resetPwdForm"
            class="ruleSa"
          >
            <el-form-item label prop="password" style="position: relative;margin-bottom:14px">
              <el-input type="password" placeholder="请输入新密码" v-model="resetPwdForm.password">
                <i slot="prefix" class="iconfont" style="font-size:17px;margin-left:3px;"></i>
              </el-input>
              <img src="../../assets/image/icon_mm@3x.png" alt class="zdy-icon" />
              <span v-if="resetPwdFlag" class="error-message">{{resetPwdMess}}</span>
            </el-form-item>
            <el-form-item label prop="againPwd" style="position: relative;margin-bottom:0;">
              <el-input type="password" placeholder="再次确认新密码" v-model="resetPwdForm.againPwd">
                <i slot="prefix" class="iconfont" style="font-size:24px;"></i>
              </el-input>
              <img src="../../assets/image/icon_mm@3x.png" alt class="zdy-icon" />
              <span v-if="againResetPwdFlag" class="error-message">{{againResetPwdMess}}</span>
            </el-form-item>
            <el-form-item style="margin-bottom:0;margin-top:48px">
              <el-button
                :loading="subLoadResetPwd"
                type="primary"
                @click="resetPassword('resetPwdForm')"
              >完成</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import base64 from "@/libs/base.js";
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      let str = /^[1][2,3,4,5,7,8][0-9]{9}$/
      if (!value) {
        this.phoneMess = '手机号码不能为空'
        this.phoneFlag = true
        return callback(new Error());
      } else {
        this.phoneMess = ''
        this.phoneFlag = false
        callback();
      }
      if (!str.test(value)) {
        this.phoneMess = '手机号码为11位整数值'
        this.phoneFlag = true
        callback(new Error());
      } else {
        this.phoneMess = ''
        this.phoneFlag = false
        callback();
      }
    };
    var checkDxCode = (rule, value, callback) => {
      let str = /^[0-9]{6}$/
      if (!value) {
        this.dxCodeMess = '验证码不能为空'
        this.dxCodeFlag = true
        return callback(new Error());
      } else {
        this.dxCodeMess = ''
        this.dxCodeFlag = false
        callback();
      }
      if (!str.test(value)) {
        this.dxCodeMess = '验证码为6位整数值'
        this.dxCodeFlag = true
        callback(new Error());
      } else {
        this.dxCodeMess = ''
        this.dxCodeFlag = false
        callback();
      }
    };
    var checkResetPwd = (rule, value, callback) => {
      let str = /^[A-Za-z0-9]{6,}$/
      if (!value) {
        this.resetPwdMess = '密码不能为空'
        this.resetPwdFlag = true
        return callback(new Error());
      } else {
        this.resetPwdMess = ''
        this.resetPwdFlag = false
        callback();
      }
      if (!str.test(value)) {
        this.resetPwdMess = '密码不少于6位英文+数字'
        this.resetPwdFlag = true
        callback(new Error());
      } else {
        this.resetPwdMess = ''
        this.resetPwdFlag = false
        callback();
      }
    };
    var checkAgainResetPwd = (rule, value, callback) => {
      let str = /^[A-Za-z0-9]{6,}$/
      if (!value) {
        this.againResetPwdMess = '确认密码不能为空'
        this.againResetPwdFlag = true
        return callback(new Error());
      } else {
        this.againResetPwdMess = ''
        this.againResetPwdFlag = false
        callback();
      }
      if (!str.test(value)) {
        this.againResetPwdMess = '确认密码不少于6位英文+数字'
        this.againResetPwdFlag = true
        callback(new Error());
      } else {
        this.againResetPwdMess = ''
        this.againResetPwdFlag = false
        callback();
      }
    };
    return {
      resetPwd: true,
      subLoadDxCode: false,
      subLoadResetPwd: false,

      phoneMess: "", // 短信验证表单
      phoneFlag: false,
      dxCodeMess: "",
      dxCodeFlag: false,
      phoneDxForm: {
        // 登录数据
        number: "",
        veriCode: ""
      },
      phoneDxRules: {
        number: [
          { required: true, trigger: "blur", validator: checkPhone }
        ],
        veriCode: [
          { required: true, trigger: "blur", validator: checkDxCode }
        ]
      },

      resetPwdMess: "", // 重置密码校验表单
      resetPwdFlag: false,
      againResetPwdMess: "",
      againResetPwdFlag: false,
      resetPwdForm: {
        // 登录数据
        username: "",
        password: "",
        againPwd: '',
      },
      resetPwdRules: {
        password: [
          { required: true, trigger: "blur", validator: checkResetPwd }
        ],
        againPwd: [
          { required: true, trigger: "blur", validator: checkAgainResetPwd }
        ]
      },
      codeText: "获取验证码",
      timer: 60,
      disabledBtn: false,
      time: null,
      username: ''
    };
  },
  mounted () {
  },
  methods: {
    // 获取倒计时
    getSecond (timer) {
      this.codeText = '重新获取' + this.timer + 's'
      this.timer--
      if (this.timer == 0) {
        clearInterval(this.time)
        this.codeText = '发送验证码'
        this.timer = this.timer
        this.disabledBtn = false
      }
    },
    // 发送短信
    getCode () {
      if (this.time) {
        this.timer = 60
        clearInterval(this.time)
      }
      var reg = /^1[23456789]\d{9}$/
      var userPhone = reg.test(this.phoneDxForm.number)
      if (userPhone) {
        this.disabledBtn = true
        this.$fetchGet('traffic-investment/sys/sendVeriCode', { number: this.phoneDxForm.number }).then(res => {
          console.log(res)
          if (res.code == 200) {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
        this.time = setInterval(() => {
          this.getSecond(60)
        }, 1000)
      } else {
        this.phoneMess = '手机号码为11位整数值'
        this.phoneFlag = true
      }

    },
    // 下一步
    goBack (formName) {
      this.subLoadDxCode = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$fetchGet('traffic-investment/sys/checkVeriCode', { number: this.phoneDxForm.number, veriCode: this.phoneDxForm.veriCode }).then(res => {
            this.subLoadDxCode = false
            console.log(res)
            if (res.code == 200) {
              this.resetPwd = false
              this.username = res.result.username
              this.$message.success("验证成功")
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error('请正确输入手机号码及验证码信息')
          return false;
        }
      });
    },
    // 完成重置密码
    resetPassword (formName) {
      if (this.resetPwdForm.password == this.resetPwdForm.againPwd && !this.againResetPwdFlag && !this.resetPwdFlag) {
        this.subLoadResetPwd = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$fetchPost('traffic-investment/sys/user/changePassword', {
              username: this.username,
              password: this.resetPwdForm.password
            }, 'json').then(res => {
              this.subLoadResetPwd = false
              if (res.code == 200) {
                this.$message.success(res.message)
                this.$router.push({ path: '/login' })
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            this.$message.error('请正确输入密码及确认密码')
            return false;
          }
        });
      } else {
        this.againResetPwdMess = '新密码与确认密码不相同'
        this.againResetPwdFlag = true
      }

    }
  }
};
</script>
<style lang="scss">
.forget-pwd {
  .el-input__inner {
    border: none;
    font-size: 16px;
    color: #989898;
    line-height: vh(44);
    height: vh(44);
    background: rgba(248, 249, 253, 1);
  }
  .el-input__prefix {
    width: vw(30);
  }
  .el-form-item {
    position: relative;
    .zdy-icon {
      position: absolute;
      top: vh(12);
      left: vw(5);
      width: vw(20);
      height: vh(20);
    }
  }
  .el-form-item__content {
    line-height: vh(44);
  }
}
</style>

<style lang="scss" scoped>
.forget-pwd {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/image/bg_1@3x.png") center center no-repeat;
  background-size: 100% 100%;
  .forget-pwd-content {
    display: flex;
    justify-content: flex-end;
    width: vw(840);
    height: vh(486);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 6px rgba(74, 156, 252, 0.2);
    .title-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .title {
        font-size: vw(22);
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(44, 50, 90, 1);
        margin-top: vh(87);
      }
      .input-form {
        width: vw(360);
        margin-top: vh(42);
        .el-form-item {
          .el-input {
            position: relative;
            // width: vw(360);
            height: vh(44);
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(223, 226, 233, 1);
            border-radius: vw(4);
          }
          .error-message {
            position: absolute;
            top: 0;
            right: vw(20);
            color: red;
          }
          .el-button {
            width: vw(360);
            height: vh(44);
            background: rgba(74, 156, 252, 1);
            border-radius: vw(4);
          }
          .el-button--primary {
            border: 1px solid rgba(74, 156, 252, 1);
          }
        }
        .dx-code-wrapper {
          display: flex;
          .el-form-item {
            flex: 1;
          }
          .dx-code {
            width: vw(105);
            height: vh(44);
            background: rgba(74, 156, 252, 1);
            border-radius: vw(4);
            font-size: vw(16);
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: vh(44);
            margin-left: vw(15);
          }
          .dx-code-grey {
            background: #999;
          }
          .el-button {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
