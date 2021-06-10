<template>
  <div class="stationPassenger">
    <div class="search-box">
      <div style="margin-right:0.6vw;width:3vw;">时间</div>
      <el-date-picker
        v-model="value1"
        size="small"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <div style="margin-right:0.6vw;margin-left:1.8vw;width:3vw;">站点</div>
      <el-autocomplete
        class="inline-input"
        size="small"
        v-model="state2"
        :fetch-suggestions="querySearch"
        placeholder="请输入站点"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
  <div style="margin-right:0.6vw;margin-left:1.8vw;width:3vw;">时段</div>
       <el-select size="small" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

  </div>
</template>

<script>
export default {
     data(){
        return {
          options:[
            {
              name:'工作日',
              value:1
            },{
               name:'双休日',
              value:2
            }
          ],
          value1:'',
          value:'',
          state2:''
        }
    },
    created() {
      setTimeout(()=>{
      this.$store.commit('SET_LOADING',false)
      },1000)
    },
    mounted() {},
    methods: {
      querySearch(){

      },
      handleSelect(){

      },
        
    }
};
</script>
<style lang="scss" scoped>
.stationPassenger{
  box-sizing: border-box;
  position: absolute;
  z-index: 100;
  left:0;
  top: vh(70);
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(70);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
   
 
    
  }
}
</style>