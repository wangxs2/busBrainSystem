<template>
  <div class="layout">
   <app-main></app-main>
   <div class="header-box">
     <div class="menu-box">
       <menu-nav></menu-nav>
     </div>
   </div>
    
  </div>
</template>

<script>
import menuNav from "./components/menu";
import appMain from "./components/appMain";
export default {
  components: {
   menuNav,
    appMain
  },
  computed: {
    
  },
  data () {
    return {
     
    };
  },
  created () {
  
  },
  watch: {
   
  },
  methods: {
   
  }
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.layout{
  width:100%;
  height:100%;
  position:relative;
  .header-box{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:vw(70);
    background:url('~@/assets/image/top_bj.png');
    background-size:100% 100%;
    box-sizing:border-box;
    padding-left:vw(940);
    .menu-box{
      width:100%;
     height:100%;
    }
  }
  .appMain{
    margin-top:vw(0);
  }
}
</style>
