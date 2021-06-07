<template>
  <div class="login">
  <div class="bityu">公交大脑</div>
    <div class="login-content">
      <div class="title-form">
        <div class="title">用户登录</div>
        <div class="input-form">
          <el-form
            :model="loginForm"
            :show-message="false"
            :rules="loginRules"
            ref="loginForm"
            class="ruleSa"
          >
            <el-form-item label prop="username" style="position: relative;margin-bottom:14px">
              <el-input type="text" placeholder="请输入账号" v-model="loginForm.username">
                <i slot="prefix" class="iconfont" style="font-size:17px;margin-left:3px;"></i>
              </el-input>
              <span v-if="nameFlag" class="error-message">{{nameMess}}</span>
            </el-form-item>
            <el-form-item label prop="password" style="position: relative;margin-bottom:0;">
              <el-input type="password" placeholder="请输入密码" v-model="loginForm.password">
                <i slot="prefix" class="iconfont" style="font-size:24px;"></i>
              </el-input>
              <span v-if="pswFlag" class="error-message">{{pswMess}}</span>
            </el-form-item>
            <div class="passwordSa">
              <el-checkbox v-model="checked" @change="rememberPasswordS">记住用户名</el-checkbox>
              <!-- <span style="cursor: pointer" @click="forget">忘记密码?</span> -->
            </div>
            <el-form-item style="margin-bottom:0;margin-top:18px">
            <!-- @click="login('loginForm')" -->
              <el-button :loading="subLoad" type="primary" @click="tologin()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  <!-- <div>
      <el-button type="primary" @click="tologin()">登录</el-button>
  </div> -->
</template>

<script>
import base64 from "@/libs/base.js";
import store from "@/stores";
import { _debounce } from "@/libs/public.js";
export default {
  data() {
    let check = (rule, value, callback) => {
      if (value === "") {
        if (rule.field == "username") {
          this.nameFlag = true;
          this.nameMess = "请输入账号";
        } else {
          this.pswFlag = true;
          this.pswMess = "请输入密码";
        }
        return callback(new Error());
      } else {
        if (rule.field == "username") {
          this.nameFlag = false;
          this.nameMess = "";
        } else {
          this.pswFlag = false;
          this.pswMess = "";
        }
        callback();
      }
    };
    return {
      iframeUrl:null,
      checked: false, //记住用户名
      subLoad: false, //登录按钮动画
      message: "", // 登录提示
      nameMess: "",
      nameFlag: false,
      pswMess: "",
      pswFlag: false,
      loginForm: {
        // 登录数据
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", validator: check }],
        password: [{ required: true, trigger: "blur", validator: check }]
      }
    };
  },
  beforeCreate() {
    if (this.$route.query.flag) {
      this.$router.push("/login");
      location.reload();
    }
  },
  created(){
    console.log(new Date().getDate())
    document.cookie = "metabase.SESSION=" + 'bbbdab37-2391-4bb9-87cf-7577228638f07879';
  },
  mounted() {
    // document.onkeydown = event => {
    //   //回车登录
    //   if (event.keyCode === 13) {
    //     this.login();
    //   }
    // };
    // sessionStorage.clear()
    // if (localStorage.getItem("checked") == "true") {
    //   this.loginForm.username = localStorage.getItem("userNameSa")
    //   this.checked = true
    // }

    var jwt = require("jsonwebtoken");

    var METABASE_SITE_URL = "http://10.1.30.204:3000";
    var METABASE_SECRET_KEY =
      "f8a44db443fc5ac9b0971ce50698b8c75da37a508e697ee03abbe1f900cbdc04";
    var payload = {
      resource: { dashboard: 4 },
      params: {},
      exp: Math.round(Date.now() / 1000) + 10 * 60 // 10 minute expiration
    };
    var token = jwt.sign(payload, METABASE_SECRET_KEY);

    this.iframeUrl =
      METABASE_SITE_URL +
      "/embed/dashboard/" +
      token +
      "#bordered=true&titled=true";
  },
  methods: {
    //记住密码
    rememberPasswordS(val) {
      this.checked = val;
      if (this.checked) {
        localStorage.setItem("userNameSa", this.loginForm.username);
        localStorage.setItem("checked", true);
      } else {
        localStorage.removeItem("userNameSa");
        localStorage.removeItem("checked");
      }
    },
    tologin(){
    //  document.cookie = "metabase.SESSION=" + 'bbbdab37-2391-4bb9-87cf-7577228638f07879';
      let b=new base64()
      let data={
        username:'1229320501@qq.com',
        password:'999999999'
      }
      let data1={
        username:'1229320501@qq.com',
        remember:true,
        password:'999999999'
      }
      let timeNumber = new Date().getTime();
      data.password = b.encode(
            timeNumber +
            "&" +
            b.encode(data.password) +
            "&" +
            timeNumber
          ); //加密
      this.$fetchPost("/login",data)
      .then(res=>{
        // document.cookie ="metabase.SESSION=aa93df65-b217-48ba-9759-1ded01e3d60e";
        
          document.cookie ="metabase.SESSION="+res.info.metabaseSession;
          sessionStorage.setItem("metabase.SESSION", res.info.metabaseSession)
          localStorage.setItem('metabase.SESSION', res.info.metabaseSession)
          this.$router.push("/lineCharacteristics/roadDistribution");
        // this.$fetchPost("http://101.231.47.117:50009/api/session",data1,'json')
        // .then(res=>{
        // })
      })
      // this.$fetchGet("http://101.231.47.117:50020/busbrain/indicator/repetition?routeId=1")
      // .then(res=>{
      //   this.$router.push("/lineCharacteristics");
      // })
      // this.$router.push("/lineCharacteristics");
    },
    login: _debounce(function(formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     this.subLoad = true;
      //     this.$fetchPost("sys/login", this.loginForm, 'json')
      //       .then(res => {
      //         this.subLoad = false;
      //         if (res.code == 200) {
      //           document.cookie = "flag=true";
      //           document.cookie = "user=" + res.result.userInfo.id;
      //           document.cookie = "userName=" + res.result.userInfo.username;
      //           document.cookie = "Token=" + res.result.token;
      //           document.cookie = "roleid=" + res.result.role[0].id;
      //           document.cookie = "realname=" + res.result.userInfo.realname;
      //           document.cookie = "orgname=" + res.result.org[0].name;
      //           document.cookie = "realcode=" +  res.result.role[0].code;
      //           this.$store.commit('SET_TOKEN', res.result.token)
      //           this.$store.commit("SET_ID", res.result.userInfo.id);
      //           this.$store.commit("SET_USERINFO", res.result.userInfo);
      //           this.$store.commit("SET_NAME", res.result.userInfo.username);
      //           this.$store.commit("SET_REALNAME", res.result.userInfo.realname);
      //           this.$store.commit("SET_ROLES", res.result.org);
      //           localStorage.setItem("userNameSa", this.loginForm.username);
      //           this.$store.commit("SET_ROLEID", res.result.role[0].id);
      //           this.$store.commit("SET_ROLECODE", res.result.role[0].code);
      //            this.$router.push("/lineCharacteristics");
      //           this.$message.success(res.message)
      //         } else {
      //           this.$message.error(res.message)
      //         }
      //       })
      //       .catch(res => {
      //         this.subLoad = false;
      //       });
      //   }
      // });
    }, 300),
    forget() {
      //忘记密码
      this.$router.push("/forgetPwd");
    }
  }
};
</script>
<style lang="scss">
.login .login-content .title-form .input-form .el-form-item .el-input{
  background: rgba(26, 66, 118, 0.2) !important;
   border: 1px solid #27B6FF !important;
    // box-shadow: 0px 0px vh(6) rgba(39, 182, 255, 0.8) inset !important;
}
.login {
  .el-input__inner {
   background: rgba(26, 66, 118, 0.2) !important;
    color: #dae4ff !important;
   
      line-height: vh(44);
    height: vh(44);
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
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("~@/assets/image/dl_bj.png");
    background-size: 100% 100%;
    .bityu{
      font-size: vw(42);
      font-weight: bold;
      margin-bottom: vh(16);
    }
  .login-content {
    width: vw(564);
    height: vh(512);
    background: url("~@/assets/image/dlk.png");
    background-size: 100% 100%;
    .title-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height:100%;
      .title {
        font-size: vw(36);
        font-family: FZZhengHeiS-EB-GB;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        margin-top: vh(90);
        margin-bottom: 0;
      }
      .input-form {
        width: vw(360);
        margin-top: vh(20);
        .el-form-item {
          .el-input {
            position: relative;
            width: vw(360);
            height: wh(44);
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
        .passwordSa {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: vh(20);
          font-size: vw(14);
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(73, 155, 252, 1);
        }
      }
    }
  }
}
</style>
