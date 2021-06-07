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
  color: #ffffff;
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

  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.sa-gantt {
  .el-table_1_column_1,
  .el-table_1_column_2,
  .el-table_1_column_3 {
    background: #eef4ff;
    border-bottom: none;
    border-right: none;
    color: #2b315a;
  }
}

//滚动条凹槽的颜色，还可以设置边框属性

::-webkit-scrollbar-track-piece {
  background-color: rgba(93, 137, 255, 0.1);
  border-radius: vw(16);
}

//滚动条的宽度

::-webkit-scrollbar {
  width: vw(9);

  height: vh(9);
}

//滚动条的设置

::-webkit-scrollbar-thumb {
  background-color: rgba(93, 137, 255, 0.5);

  background-clip: padding-box;
  border-radius: vw(16);

  min-height: vw(20);
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(93, 137, 255, 0.7);
}

.el-input__inner {
  background: rgba(26, 66, 118, 0.2) !important;
  color: #dae4ff !important;
  border: 1px solid #27B6FF !important;
  box-shadow: 0px 0px vh(6) rgba(39, 182, 255, 0.8) inset !important;
}
.el-select-dropdown {
  background: rgba(26, 66, 118, 1) !important;
  border: 1px solid #27B6FF !important;
  box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset !important;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background: rgba(69, 120, 255, 1) !important;
  color: #ffffff !important;
}
.el-select-dropdown__item{
color: #dae4ff !important;
}
.el-autocomplete-suggestion{
  background: rgba(26, 66, 118, 1) !important;
  border: 1px solid #27B6FF !important;
  box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset !important;

}
.el-autocomplete-suggestion li{
  color: #dae4ff !important;
}
.el-autocomplete-suggestion li:hover{
  background: rgba(69, 120, 255, 1) !important;
  color: #ffffff !important;
}
</style>
