<template>
  <div class="regionPassenger">
  </div>
</template>

<script>
export default {
     data(){
        return {

        }
    },
    created() {
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