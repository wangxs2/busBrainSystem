<template>
  <div class="networkExcellent">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  data(){
    return{
      
    }

  },
 watch:{
 },
 mounted(){
  },
  methods:{
  }
  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.networkExcellent{
width: 100%;
  height: 100%;
   background:#000000;
  position: relative;
  .networkMap{
    width: 100%;
  height: 100%;
  }
 
}
</style>
