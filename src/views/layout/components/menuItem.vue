<template>
  <el-submenu v-if="item.children && item.children.length" :index="navIndex">
    <!-- 创建父级菜单 -->
    <template slot="title">
      <i style="color:#fff;" class="iconfont" :class="item.props"></i>
      <span slot="title" class="menuIcon">{{ item.name }}</span>
    </template>
    <!-- 创建子菜单 -->
    <template v-for="(subItem,i) in item.children">
      <nav-item
        :key="navIndex+'-'+i"
        :item="subItem"
        :navIndex="navIndex+'-'+i"
        v-if="subItem.children && subItem.children.length"
      ></nav-item>
      <el-menu-item :key="navIndex+'-'+i" :index="subItem.url" v-else>
        <i style="color:#fff;" class="iconfont" :class="subItem.props"></i>
        <span slot="title" class="menuIcon">{{ subItem.name }}</span>
      </el-menu-item>
    </template>
  </el-submenu>
  <el-menu-item v-else :index="item.url">
    <i style="color:#fff;" class="iconfont"  :class="item.props"></i>
    <span slot="title" class="menuIcon">{{ item.name }}</span>
    <!-- <i v-if="$store.getters.routerNow==item.url" style="color:#fff;position: absolute;right:-4px;top:16px" class="iconfont iconsanjiaoxing-copy1"></i> -->
  </el-menu-item>
</template>

<script>
export default {
  name: "navItem",
  props: ["item", "navIndex"],
  created(){
    
  },
  mounted(){
    this.$store.commit("SET_ROUTERNOW", this.$route.path);
  },
};
</script>
<style>
.el-menu-item, .el-submenu__title{
  height:48px !important;
  line-height:48px !important;
}
.iconsanjiaoxing-copy1{
  width:16px;
  height:16px;
  background-size: 100% 100%;

}
.icon-shitu{
  display:inline-block;
  width:18px;
  height:18px;
  background-size: 100% 100%;
  margin-bottom:3px
}
.icon-xmxx{
  display:inline-block;
  width:18px;
  height:18px;
  background-size: 100% 100%;
}
.icon-xtgl{
  display:inline-block;
  width:18px;
  height:18px;
  background-size: 100% 100%;
}
.icon-wdgl{
  display:inline-block;
  width:18px;
  height:18px;
  background-size: 100% 100%;
}
.icon-spxx{
  display:inline-block;
  width:18px;
  height:18px;
  background-size: 100% 100%;
}

</style>

