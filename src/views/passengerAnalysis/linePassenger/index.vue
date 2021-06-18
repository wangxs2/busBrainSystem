<template>
  <div class="linePassenger">
      <div class="search-box">
      <div style="margin-right:0.6vw;width:3vw;">时间</div>
      <el-date-picker
        v-model="value1"
        size="small"
        type="daterange"
        range-separator="至"
        @change="changeDate"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <div style="margin-right:0.6vw;margin-left:1.8vw;width:3.6vw;">线路名称</div>
      <el-select size="small" filterable @change="toLine()" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    
    
    </div>
  </div>
</template>

<script>
let dataLine=require('../dataLine.js')
export default {
    
    data(){
        return {
            options:[],
            value1:[new Date(),new Date()],
            value:"706"
        }
    },
    created() {
        this.options=dataLine.arrline
        this.getLinepassenger()
        
    },
    mounted() {},
    methods: {
     
      toLine(){
          this.$emit('changeKl',{
              toLine:this.value
          })

      },
      changeDate(){
        console.log(this.value1)
        this.getLinepassenger()
      },
      getLinepassenger(){

      this.$fetchGet("passenger/linePassenger",{
        direction:0,
        st:this.$moment(this.value1[0]).format("YYYY-MM-DD"),
        et:this.$moment(this.value1[1]).format("YYYY-MM-DD"),
        routeId:this.value

      }).then(res => {


        setTimeout(()=>{
         this.$store.commit('SET_LOADING',false)
        },200)
      })

      },
    }
};
</script>
<style lang="scss" scoped>
.linePassenger{
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(130);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
  }
}
</style>