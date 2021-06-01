<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import url("./assets/iconfont/iconfont.css");
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  font-size: vw(16);
  color: #FFFFFF;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*火狐*/
  -moz-user-select: none;
  /*webkit浏览器*/
  -webkit-user-select: none;
  /* IE10 */
  -ms-user-select: none;
  /* 早期浏览器 */
  -khtml-user-select: none;
  user-select: none;
  -webkit-user-select: text;
  overflow: hidden;
}
 .sa-gantt {
   .el-table_1_column_1 ,.el-table_1_column_2  ,.el-table_1_column_3{
            background:#EEF4FF;
            border-bottom:none;
            border-right:none;
            color:#2B315A;
    }
  }
</style>
