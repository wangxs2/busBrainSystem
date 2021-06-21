<template>
  <div class="systembox">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>
<style lang="scss">
.systembox{
  .el-input-group__append, .el-input-group__prepend{
   background: rgba(26, 66, 118, 1) !important;
  border: 1px solid #27B6FF !important;
  border-right:none;
}
.el-pagination .btn-next, .el-pagination .btn-prev{
  background: transparent !important;
  color: #ffffff !important;
}
.el-pagination{
  color: #ffffff !important;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background: transparent !important;
}
.el-table__fixed-right::before, .el-table__fixed::before{
  background: transparent !important;
}
.systemheader{
  box-shadow: 0px 0px 10px rgba(69, 120, 255, 1) inset!important;
  border: 1px solid #27b6ff!important;
}
}
</style>
<style lang="scss" scoped>
.systembox{
  width: 100%;
  height: 100%;
  box-sizing:border-box;
  padding:vh(20) vw(20);
  padding-top:vh(128);
  background: #000022;
 
}
</style>
