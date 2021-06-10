<template>
  <div class="linePassenger">
  </div>
</template>

<script>
export default {
    
    data(){
        return {

        }
    },
    created() {
        console.log(456)
        setTimeout(()=>{
        this.$store.commit('SET_LOADING',false)
        },1000)
    },
    mounted() {},
    methods: {
        tomeay(row) {
        this.islist = row.id;
        }
    }
};
</script>