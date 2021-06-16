<template>
  <div class="layout" 
    v-loading="$store.getters.aloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
   <app-main></app-main>
   <div class="header-box">
     <div class="menu-box">
       <menu-nav></menu-nav>
     </div>
   </div>
   <div class="routelist">
     <div  :class="getRouterName.name==item.name?'parallelogram parallelogram1':'parallelogram'" v-for="(item,index) in quc($store.getters.userRole)" :key="index">
       <div @click="topath(item)" class="fontroute">{{ item.name }}</div>
        <div v-if="getRouterName.name!==item.name" @click="deleroute(item,index)" style="font-size:12px;margin-left:0.5vw"  class="fontroute iconfont iconguanbi"></div>
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
    getRouterName:  function() {
     return this.$route.matched.slice(2)[0]
    },
    myallroute:function(){
      return this.quc(this.$store.getters.userRole)
    },
    
  },
   data () {
    return {
      myRouterName:[],
      loading: true
    };
  },
 
  created () {
  
  },
  mounted(){

  },
   watch:{
    myallroute:{
      handler(val,oldval){
      },
    },
    '$route':{
      handler(val,oldval){
       
       if(val){
         
       }
      },
    },
  },
  watch: {
  },
  methods: {

    quc(arrays){
      var result = [];

      var obj = {};

      for(var i =0; i<arrays.length; i++){

          if(!obj[arrays[i].name]){

            result.push(arrays[i]);

            obj[arrays[i].name] = true;

          }

      }
      return result
    },
    topath(row){
      this.$router.push(row.path);
    },
    deleroute(row,index){
      let arr=this.quc(this.$store.getters.userRole)
      let arr1=arr.splice(index,1)
     this.$store.commit('SET_ROLES', arr)
    
    }
  }
};
</script>
<style lang="scss">
 .search-box{
    .el-input__inner {
      background: rgba(26, 66, 118, 0.2) !important;
      color: #dae4ff !important;
      border: 1px solid #27B6FF !important;
      box-shadow: 0px 0px vh(6) rgba(39, 182, 255, 0.8) inset !important;
    }

 }
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
    // z-index:5;
    .menu-box{
      width:100%;
     height:100%;
    }
  }
  .routelist{
    position:absolute;
    left:0;
    top:vh(70);
    width:100%;
    height:vw(70);
    z-index:10;
    // background:rgba(0, 0, 34,0.7);
    display:flex;
    box-sizing:border-box;
    padding-left:vw(30);

    .parallelogram {   
      // width:vw(160);
      height: vh(30);
      margin-top:vh(20);
      padding:vh(6) vw(30);
      box-sizing:border-box;
      transform:skew(-30deg);
      -webkit-transform: skew(-30deg);
      -moz-transform: skew(-30deg);
      -o-transform:skew(-30deg);
      -ms-transform:skew(-30deg);
      background: rgba(93, 137, 255, 0.3);
      border: 1px solid; 
      border-radius: 2px;
      border-image: linear-gradient(0deg, #03326F, #5D89FF, #5D89FF) 10 10;
      display:flex;
      justify-content:space-around;
      align-items:center;
      box-sizing:border-box;
      cursor:pointer;
      padding:0 vw(16);
      margin-right:vw(12);
      .fontroute{
         transform:skew(30deg);
        -webkit-transform: skew(30deg);
        -moz-transform: skew(30deg);
        -o-transform:skew(30deg);
        -ms-transform:skew(30deg);
        font-size: vw(18);
      }
    }
    .parallelogram1{
      background: rgba(254, 203, 0, 0.3);
      border-image: linear-gradient(0deg, #FECB00, #FAC801) 10 10;
    }
  }
  .appMain{
    margin-top:vw(0);
  }
}
</style>
