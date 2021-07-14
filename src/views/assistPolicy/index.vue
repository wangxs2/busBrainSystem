<template>
  <div class="assistPolicy">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>
<style lang="scss">
.assistPolicy{
   .el-input__inner {
      background: rgba(26, 66, 118, 0.2) !important;
      color: #dae4ff !important;
      border: 1px solid #27B6FF !important; 
      // box-shadow: 0px 0px vh(6) rgba(39, 182, 255, 0.8) inset !important;
       border-left: none !important;
      //  padding-left:0!important;
    }
    .el-input-group__append, .el-input-group__prepend{
      border: 1px solid #27B6FF !important;
       background: rgba(26, 66, 118, 0.2) !important;
       color: #dae4ff !important;
       padding:0 vw(6) !important;
       border-right: none !important;
      
    }

}


</style>
<style lang="scss" scoped>
.assistPolicy{
width:100%;
  height:100%;
 
}
</style>
