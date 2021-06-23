<template>
  <div class="valuationService">
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
.valuationService{
 
}
</style>
