<template>
  <div class="treeleft">
    <el-dropdown @command="changemenu" v-for="(item,n) in menuData" :key="item.id">
      <div class="one-meanu">
        <div :class="meauindex==n?'fram-active':'framf'">{{item.name}}</div>
        <div v-if="meauindex==n" class="animate__animated animate__fadeInUp line-bor"></div>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="{iteam,n}" v-for="(iteam) in item.children" :key="iteam.id">
          <div class="son-name">{{iteam.name}}</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import menuItem from "./menuItem";
import {
  getCookie,
  delCookie
} from '@/libs/util'
export default {
  name: "menuNav",
  components: {
    menuItem
  },
  data() {
    return {
      ihow: false,
      meauindex: 0
    };
  },
  computed: {
    ...mapGetters(["menuData", "menuFlag"]),
  },
  created() {
    
  },
  mounted(){

    let str=this.$route.matched[1].name
      this.$store.getters.menuData.forEach((iteam,index)=>{
          if(iteam.name==str){
            this.meauindex=index
          }
      })
  },
  methods: {
    changemenu(command){
       this.meauindex = command.n
      this.$router.push(command.iteam.url);
    }
  }
};
</script>

<style lang="scss">
.el-dropdown-menu{
  background-color: RGBA(0, 35, 79, 0.8) !important;
  border:none!important;
  padding:vh(0) vw(0)!important;
  box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset !important;
   top: vw(48) !important;
   border-radius:0!important;
  .el-dropdown-menu__item{
      color:rgba(255, 255, 255, 1)!important;
      font-size:vw(16)!important;
      padding:vh(6) vw(50);
  }
}
.el-popper .popper__arrow, .el-popper .popper__arrow::after {
  content: none!important;
    border: none!important;
    border-style:none!important;
}

.el-dropdown-menu__item:hover{
  background-color:rgba(69, 120, 255, 1)!important;
}

</style>

<style lang="scss"  scoped>
.treeleft {
  width: 100%;
  height: 100%;
  display: flex;

  .one-meanu {
    width: vw(180);
    height: vw(60);
    line-height: vw(60);
    position: relative;
    font-size: vw(18);
    font-family: Microsoft YaHei;
    font-weight: 500;

    color: #ffffff;
    text-align: center;
    cursor: pointer;
    .fram-active {
      font-weight: bold;
      color: #00ffff;
      font-style: italic;
      text-shadow: 0 0 1.8em #00ffff, -0 -0 1.8em #00ffff;
    }
    .framf {
      color: #ffffff;
      font-style: italic;
    }
    .line-bor {
      position: absolute;
      left: 0;
      bottom: 0;
      width: vw(180);
      height: 3px;
      background: #00ffff;
      border-radius: 50%;
    }

    .sonmenu-box {
      width: vw(180);
      position: absolute;
      z-index: 100;
      box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset;
      background: RGBA(0, 35, 79, 0.8);
      left: 0;
      top: vw(60);
      .son-name {
        width: 100%;
        font-size: vw(18);
        box-sizing:border-box;
        padding:vh(0) vw(40);
      }
      .son-name:hover {
        background: #4578ff;
      }
    }
  }
  .one-meanu:hover > .framf {
    color: #00ffff;
    font-weight: bold;
  }
}
</style>

