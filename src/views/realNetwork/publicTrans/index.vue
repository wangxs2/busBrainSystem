<template>
  <div class="publicTrans">
  </div>
</template>

<script>
//公共交通实时运营
export default {
    created(){
        setTimeout(()=>{
        this.$store.commit('SET_LOADING',false)
        },200)
    }
  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.publicTrans{
 
}
</style>
