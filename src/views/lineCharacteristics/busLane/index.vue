<template>
  <div class="busLane-box">
   
  
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      
    };
  },
  beforeCreate() {},
  created() {
    setTimeout(()=>{
      this.$store.commit('SET_LOADING',false)
    },1000)
  
  },
  mounted() {
  },
  methods: {

  }
};
</script>
<style lang="scss">
</style>

<style lang="scss" scoped>
.busLane-box {
  box-sizing: border-box;
  margin-top: vw(70);
  position: relative;
  z-index: 10;
}
</style>
