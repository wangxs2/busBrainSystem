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
        style="width:12vw"
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

    <div class='stationBox'>
      <div class="tit">
        <div class="fonq">站点客流信息</div>
        <div>2021-04-10</div>
      </div>
      <div class="stationnum">
        <div style="display:flex;align-items: center;">
          <img style="margin-right:0.4vw" src="@/assets/image/licon_1.png" /> 站点总数
        </div>
        <div>4124个</div>
      </div>
      <div class="tlList" v-for="(iteam,n) in tlstation" :key="n">
        <div style="display:flex;align-items: center;">
            <img @click="toShow(iteam,n)" v-if="iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxktrue.png" />
            <img @click="toShow(iteam,n)" v-if="!iteam.isxz" style="cursor:pointer" width="18" height="18" src="@/assets/image/fxkfalse.png" />
            <img width="20" height="20" style="margin:0 0.2vw" :src="iteam.img" />
            乘车{{iteam.name}}
        </div>
        <div><span style="color:#00FFFF">{{stationroll[iteam.value]==undefined?0:stationroll[iteam.value].length}}</span>个</div>
      </div>
      <div style="margin-top:1.4vh;display:flex;align-items: center;color:#00FFFF;font-weight: bold;">
        <img @click="toheat()" v-if='isheat' style="margin-right:0.4vw" width="18" height="18" src="@/assets/image/fxktrue.png" />
        <img @click="toheat()" v-if='!isheat' style="margin-right:0.4vw" width="18" height="18" src="@/assets/image/fxkfalse.png" />
         热力图
      </div>
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
          state2:'',
          allStation:[],
          tlstation:[
            {
              name:'0-500',
              value:'0-500',
              isxz:true,
              img:require('@/assets/image/icon_cyan.png')
            },
            {
              name:'501-1000',
              value:'500-1000',
              isxz:true,
              img:require('@/assets/image/icon_blue.png')
            },
            {
              name:'1001-2000',
              value:'1000-2000',
              isxz:false,
              img:require('@/assets/image/icon_green.png')
            },
            {
              name:'2001-3000',
              value:'2000-3000',
              isxz:true,
              img:require('@/assets/image/icon_yellow.png')
            },
            {
              name:'3001-4000',
              value:'3000-4000',
              isxz:true,
              img:require('@/assets/image/icon_purple.png')
            },
            {
              name:'4000+',
              value:'4000+',
              isxz:true,
              img:require('@/assets/image/icon_red.png')
            }
          ],
          stationroll:{},
          isheat:true
        }
    },
    created() {
      this.getAllData()
    },
    mounted() {
    },
    methods: {
      getAllData(){
          this.$fetchGet("passenger/all").then(res => {
            let arrheat=[]
            this.stationroll=res.result
             for(let key  in this.stationroll){
                this.stationroll[key].forEach(station=>{
                  arrheat.push({
                    lng: station.lnglat[0],
                    lat: station.lnglat[1],
                    count: station.sd,
                  })
                })
              }
            this.$store.commit('SET_HEATSTATION', arrheat)
            this.$store.commit('SET_KLSTATION', res.result)
            setTimeout(()=>{
              this.$store.commit('SET_LOADING',false)
            },500)
          })

      },
      querySearch(){

      },
      handleSelect(){

      },
      toheat(){
        this.isheat=!this.isheat
         this.$emit('changeKl',{
            isheat:this.isheat
        })
      },
      toShow(row,index){
        this.tlstation[index].isxz=!this.tlstation[index].isxz
        this.$emit('changeKl',{
            isStation:row
        })
      }
        
    }
};
</script>
<style lang="scss" scoped>
.stationPassenger{
  // box-sizing: border-box;
  // position: absolute;
  // z-index: 100;
  // left:0;
  // top: vh(70);
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
  .stationBox{
    position: absolute;
    top: vh(170);
    right: vw(20);
    width: vw(300);
    height: vh(424);
    background: rgba(26, 66, 118, 0.2);
    border: 1px solid rgba(39, 182, 255, 0.5);
    border-radius: 2px;
    display:flex;
    flex-direction: column;
    box-sizing:border-box;
    padding:0 vw(17);
    box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 0.6) inset;
    .tit{
      display:flex;
      justify-content: space-between;
       align-items: center;
       width:100%;
       height:vh(50);
       border-bottom:1px solid rgba(0, 255, 255, 0.3);
       .fonq{
        font-size: vw(17);
        color: #ffffff;
        text-shadow: 0 0 1.2em #2054D3,
          -0 -0 1.4em rgba(255, 255, 255, 0.7);
        font-weight: bold;
       }
    }
    .stationnum{
      display:flex;
      justify-content: space-between;
       align-items: center;
      width: 100%;
      height: vh(44);
      background: linear-gradient(90deg, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.3) 50%, rgba(0, 255, 255, 0) 100%);
      border-radius: 2px;
      color: #FFFFFF;
      margin-top:vh(12);
      

    }
    .tlList{
      display:flex;
      justify-content: space-between;
       align-items: center;
       margin-top:vh(20);
    }

  }
}
</style>