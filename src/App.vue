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
.topAdd{
  .el-input__inner {
  background: rgba(26, 66, 118, 0.2) !important;
  color: #dae4ff !important;
  border: 1px solid #27B6FF !important;
  box-shadow: 0px 0px vh(6) rgba(39, 182, 255, 0.8) inset !important;
}

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
.el-range-editor--small .el-range-input{
  background: rgba(26, 66, 118, 0.2) !important;
   color: #dae4ff !important;
}
.el-date-editor .el-range-separator{
  color: #dae4ff !important;
}
.el-picker-panel__body{
   background: rgba(26, 66, 118,1) !important;
    border:none !important;
     color: #dae4ff !important;
  box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset !important;

}
 .tabbottom{
    margin-top:vh(6);
    .el-pagination{
      text-align:right !important;
      .el-pagination__total{
        color:#ffffff;
      }
    }
    .el-pagination button:disabled{
      background: #000022;
    }
    .el-pager li{
      background: #000022;
    }
  }
.el-picker-panel{
  border:none !important;
}
.el-date-range-picker__content.is-left{
  border-right:1px solid rgba(39, 182, 255, 0.5)!important;
}
.el-picker-panel__icon-btn{
  color: #ffffff !important;
}
.el-picker-panel__icon-btn:hover{
  
  color: #409EFF !important;
}
.el-date-table td.next-month, .el-date-table td.prev-month{
  color:#7e8186!important;
}
.el-date-table{
  font-size:16px!important;
}
.el-date-table td.in-range div, .el-date-table td.in-range div:hover, .el-date-table.is-week-mode .el-date-table__row.current div, .el-date-table.is-week-mode .el-date-table__row:hover div{
   background: rgba(16, 56, 100, 1) !important;
}
.el-date-table th{
  border-bottom:1px solid rgba(39, 182, 255, 0.5)!important;
  color: #dae4ff !important;
}

.el-table{
   background: #000022!important;
 
   
}
.el-table th, .el-table tr{
  background: #000022!important;
  color:#ffffff !important;
}
.el-table--striped .el-table__body tr.el-table__row--striped td{
  background: #000022!important;
}
.el-table td, .el-table th.is-leaf{
  border-bottom:none!important;
}
// .el-table__header-wrapper{
//  box-shadow: 0px 0px 10px #ffffff inset !important;
//   thead{
//     tr{
//       box-shadow: 0px 0px 10px #ffffff inset !important;
//     }
    
//   }
  
// }
.el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td{
  background: rgba(25, 79, 149, 1) !important;
}
.el-tree-node:focus>.el-tree-node__content{
  background: rgba(25, 79, 149, 1) !important;
}
.el-tree-node:hover>.el-tree-node__content{
  background: rgba(25, 79, 149, 1) !important;
}
</style>
