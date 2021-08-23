<template>
  <div class="asmin" style="width:100%;height:100%;box-sizing:border-box;">
     <keep-alive>
       <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'appMain'
}
</script>
<style lang="scss" scoped>
.asmin{
  // padding-top:vw(55);
}
</style>
