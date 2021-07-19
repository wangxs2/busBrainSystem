<template>
  <div class="lifeCycleCar">
    <div style="margin-top:0" class="search-box">
      <div style="font-weight: bold;">线路配车情况</div>
      <!-- <div>
        线路名称
        <el-select style="margin-left:0.8vw" clearable  filterable size="small" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.regionName"
          :label="item.regionName"
          :value="item.regionName"
        ></el-option>
      </el-select>
      </div> -->
    </div>
     <div class="table-data"  v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(12, 38, 104, 0.2)">
      <div class="table-header">
       
        <div>所属公司</div>
        <div>分公司名称</div>
        <div>车辆编号 </div>
        <div>车牌号</div>
        <div>车辆类型</div>
        <div>车辆状态</div>
        <div>车辆自编号</div>
      </div>
      <div class="table-contain">
        <div class="tableTr"   v-for="(item,index) in alldata" :key="index">
         
          <div >{{item.company}}</div>
          <div >{{item.branch_company}}</div>
          <div >{{item.equipment_code}}</div>
          <div>{{item.car_plate}}</div>
          <div >{{item.energy_type}}</div>
          <div>{{item.state_name}}</div>
          <div>{{item.car_code}}</div>
        </div>
        <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-if="alldata.length==0">无数据</div>
      </div>
    </div>
    <div class="search-box">
      <div style="font-weight: bold;">车辆维修保养记录</div>
      <div>
        车辆自编号 
        <el-select style="margin-left:0.8vw" clearable  filterable size="small" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.regionName"
          :label="item.regionName"
          :value="item.regionName"
        ></el-option>
      </el-select>
      </div>
    </div>
     <div class="table-data"  v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(12, 38, 104, 0.2)">
      <div class="table-header">
       
        <div>日期</div>
        <div>车辆自编号</div>
        <div>车牌号 </div>
        <div>维修内容</div>
        <div>维修人员</div>
      </div>
      <div class="table-contain">
        <div class="tableTr"   v-for="(item,index) in alldata1" :key="index">
         
          <!-- <div >{{item.xlmc}}</div>
          <div >{{item.car_code}}</div>
          <div >{{item.car_plate}}</div>
          <div>{{item.state_name}}</div>
          <div>{{item.supplier_name}}</div> -->
        </div>
        <div style="width:100%;height:100%;display:flex;justify-content:center; align-items: center;color: #4578FF;" v-if="alldata1.length==0">无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      options:[],
      alldata:[],
      alldata1:[],
      loading:false,
      value:'',
    }

  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      this.$fetchGet("gps/busLife").then(res=>{
        this.alldata=res.result
         this.$store.commit('SET_LOADING',false)
      })
    },
  }
  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.lifeCycleCar{
  width:100%;
  height:100%;
  .search-box{
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background:rgba(12, 38, 104, 0.8);
    box-sizing:border-box;
    padding:vh(10) vw(18);
    margin:vh(8) 0;
  }
  .table-data{
    width:100%;
    height:vh(396);
    box-sizing: border-box;
    overflow:hidden;
    display:flex;
    flex-direction: column;
    z-index:10;
    .table-header{
      width:100%;
      height:vh(44);
      background: rgba(12, 38, 104, 0.2);
      color: #4578FF;
      font-size:vw(16);
      box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset;
      display:flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 vw(20);
      div{
        flex:1;
        text-align:left;
      }
    }
    .table-contain{
      flex:1;
      overflow:hidden;
      overflow-y:scroll;
      .tableTr{
        width:100%;
        height:vh(44);
        color: #ffffff;
        font-size:vw(16);
        display:flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 vw(20);
        cursor:pointer;
        div{
          flex:1;
           text-align:left;
        }

      }
      .tableTr:hover {
        background:rgba(12, 38, 104, 0.5);
        color: #4578FF;
        font-weight:bold;
      } 
      .tableTr:nth-child(even){
        background:rgba(12, 38, 104, 0.2)

      }
    }
  }
 
}
</style>
