<template>
  <div class="treeleft">
    <el-menu
      mode="vertical"
      ref="navbar"
      :collapse-transition="false"
      :default-active="$route.path"
      unique-opened
      router
      :collapse="menuFlag"
      active-text-color="#89B8FF"
      background-color="#272E59"
      text-color="#ffffff"
      @select="selectMenu"
    >
      <menu-item v-for="(item,n) in menuData" :item="item" :navIndex="String(n)" :key="item.id"></menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import menuItem from "./menuItem";

export default {
  name: "menuNav",
  components: {
    menuItem
  },
  data () {
    return {
      isCollapse: false,
      menuData:[
        {
          name:'api列表',
          id:1,
          props: "icon-spxx",
          url:"/apiList"
        },{
           name:'日志',
          id:2,
          props: "icon-wdgl",
          url:"/journal"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["menuFlag"]),
    sliceRouter: function () {
      //把router第一个 / 截取掉
      return this.$route.path.slice(1);
    }
  },
  created () {
    console.log(this.menuData)
  },
  methods: {
    selectMenu (index, indexPath) {
      this.$emit("mainmodelshow", false)
      this.$store.commit('SET_CONSTRUCTIONCODE', '')
      this.$store.commit('SET_CONSTRUCTIONNAME', '')
      // 手风琴效果
      // 获取当前打开的所有菜单
      this.$store.commit("SET_ROUTERNOW", index);
      // this.
      let openMenu = this.$refs.navbar.openedMenus.concat([]);
      // 获取点击菜单的父级index，如果当前点击的是根节点，则直接关闭所有打开菜单
      let nowMenuPath =
        indexPath.length > 1 ? indexPath[indexPath.length - 2] : "";
      if (nowMenuPath) {
        // 获取父级index在数组中索引，关闭其后所有的菜单
        let menuIndex = openMenu.indexOf(nowMenuPath);
        openMenu = openMenu.slice(menuIndex + 1);
      }
      openMenu = openMenu.reverse();
      openMenu.forEach(ele => {
        this.$refs.navbar.closeMenu(ele);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.treeleft {
  width: 261px;
}
.el-menu-item.is-active {
  background-color: #1c2149 !important;
  color: #89b8ff !important;
}
.el-menu-item {
  // padding-left: 16px !important;
}
</style>

<style lang="scss">
.treeleft {
  .menuIcon {
    padding: 0px 10px;
    font-size: 14px;
  }
}
</style>

