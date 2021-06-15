<template>
  <div class="systembox">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>
<style>
.el-input-group__append, .el-input-group__prepend{
   background: rgba(26, 66, 118, 1) !important;
  border: 1px solid #27B6FF !important;
  border-right:none;
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
