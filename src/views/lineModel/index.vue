<template>
  <div class="lineModel">
    <iframe style="width:100%;height:100%;border:none" src="http://service.shmetro.com/shMetro2/metro.jsp"></iframe>
 
  </div>
</template>

<script>
export default {
  name: '',
   created() {
      this.$store.commit('SET_LOADING',false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lineModel{
  width:100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: vh(140);
}

</style>
