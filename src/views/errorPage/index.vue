<template>
  <div class="containererrPage">
    <div class="errPage-container">
      <el-button @click="back"
                 icon='arrow-left'
                 class="pan-back-btn">返回</el-button>
      <el-row>
        <el-col :span="12">
          <h1 class="text-jumbo text-ginormous">Oops!</h1>
          <h2>该页面正在开发中，敬请期待</h2>
          <h6>&nbsp;</h6>
          <ul class="list-unstyled">
            <li>或者你可以去:</li>
            <li class="link-type">
              <router-link to="/clean/home">首页</router-link>
            </li>
          </ul>
        </el-col>
        <el-col :span="12">
          <!-- <img :src="errGif"
               width="313"
               height="428"
               alt="Girl has dropped her ice cream."> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // errGif: errGif + '?' + +new Date(),
    };
  },
  mounted () {
    this.$nextTick(function () {
      // $('.containererrPage').height($(document).height() - 200);
      // window.onresize = function () {
      //   $('.containererrPage').height($(document).height() - 200);
      // }
    });
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.containererrPage {
  width: 100%;
  height:100%;
  background: #fff;
  padding-top: 200px;
  box-sizing: border-box;
  background: url("~@/assets/image/home/bj.png");
  background-size: 100% 100%;
}
.errPage-container {
  width: 800px;
  margin: 0 auto;
}
.pan-back-btn {
  background: #008489;
  color: #fff;
}
.pan-gif {
  margin: 0 auto;
  display: block;
}
.pan-img {
  display: block;
  margin: 0 auto;
}
.text-jumbo {
  font-size: 60px;
  font-weight: 700;
  color: #484848;
}
.list-unstyled {
  font-size: 14px;
}
.list-unstyled a {
  color: #008489;
  text-decoration: none;
}
.list-unstyled a:hover {
  text-decoration: underline;
}

.list-unstyled li {
  padding-bottom: 5px;
}
</style>