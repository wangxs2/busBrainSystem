<template>
  <div class="bentratio">
  </div>
</template>

<script>
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
.bentratio{
 
}
</style>
