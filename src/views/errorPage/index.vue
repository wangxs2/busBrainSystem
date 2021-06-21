<template>
  <div class="containererrPage">
    <div class="errPage-container">
      <div>该页面正在开发中，敬请期待……</div>
      <div style="flex:1"></div>
      <div>
        <el-button style="width:5vw" type="primary" size="mini" ><router-link to="/home">首页</router-link></el-button>
        <el-button @click="back" style="width:5vw;margin-left:1vw" type="primary" size="mini" >返回</el-button>
      </div>
      
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

<style lang="scss" scoped>
.containererrPage {
  width: 100%;
  height:100%;
  background: #fff;
  padding-top: 200px;
  box-sizing: border-box;
  background: url("~@/assets/image/404_bj.png");
  background-size: 100% 100%;
}
.errPage-container {
  width: vw(540);
  height:vw(540);
   background: url("~@/assets/image/404.png");
  background-size: 100% 100%;
  margin: 0 auto;
  display:flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding:vw(120) 0;
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