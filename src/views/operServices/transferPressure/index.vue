<template>
  <div class="repetitionRactor">
     <div class="search-box">

      <div style="margin-right:0.6vw;margin-left:0.1vw;width:3.5vw;">线路名称</div>
      <el-select style="width:40%" size="small" filterable @change="getDetail" v-model="value" placeholder="请选择">
        <el-option
          v-for="(item,n) in lineaData"
          :key="n"
          :label="item.routeName"
          :value="item.routeName">
        </el-option>
      </el-select>
      <div style="margin-right:0.6vw;margin-left:1vw;width:3.5vw;">阈值设置</div>
      <!-- @blur="getDetail" -->
      <el-input style="width:40%"   size="small" v-model="input" @input="getDetail1" placeholder="请输入0-1阈值"></el-input>
    </div>
    <div class="rightlinemsg">
      <div class="tit">线路重复系数</div>
      <div class="bttit">
        <div>线路名称</div>
        <div>线路重复系数</div>
      </div>
      <div class="tablbox">
        <div  :class="nowindex==n?'bttit bttit1 bttit2':'bttit bttit1'" @click="toDetail(item,n)" v-for="(item,n) in lineaData" :key="n">
          <div>{{item.routeName}}</div>
          <div>{{item.coefficient.toFixed(2)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//线路重复系数辅助决策
export default {
   data(){
        return {
          value:'',
          input:'',
          nowindex:-1,
          lineaData: [],
          allData: [],
        }
    },
    created(){
      this.getData()
    },
    methods:{
      getData(){
          
          this.$fetchGet("route/lineCoefficient").then(res => {
            res.result.forEach(iteam=>{
              iteam.coefficient=Number(iteam.coefficient)
            })
            this.allData=res.result;
            this.lineaData=res.result;
            setTimeout(()=>{
              this.$store.commit('SET_LOADING',false)
            },200)

          })
      },
      getDetail(){
          this.$fetchGet("route/baseLineDetail",{
            routeName:this.value
          }).then(res => {
            this.allData.forEach(itam=>{
              if(itam.routeName==res.result[0].routeName){
                res.result[0].coefficient=itam.coefficient
              }
            })
              res.result[0].geom=this.setData(res.result[0].geom)
              this.$emit('changeoper',{
               operLine:res.result[0],
               typeline:1
              })
          })
       

      },
       toDetail(data,index){
          this.nowindex=index
          this.$fetchGet("route/baseLineDetail",{
            routeName:data.routeName
          }).then(res => {
            this.allData.forEach(itam=>{
              if(itam.routeName==res.result[0].routeName){
                res.result[0].coefficient=itam.coefficient
              }
            })
              res.result[0].geom=this.setData(res.result[0].geom)
              this.$emit('changeoper',{
               operLine:res.result[0],
               typeline:1
              })
          })
      },
      getDetail1(){
        if(this.input==''){
            this.lineaData=this.allData
        }else{
            let arr=[]
          this.allData.forEach(itam=>{
              if(itam.coefficient>this.input){
                arr.push(itam)
              }
            })
            this.lineaData=arr
         }


      },
      setData(data){
        let str=data.split(' ')
        let arr=[]
        str.forEach(iteam=>{
          arr.push([Number(iteam.split(',')[0]),Number(iteam.split(',')[1])])
        })
        return arr

      },
    }
  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.repetitionRactor{
  .search-box {
    width:40%;
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(140);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
  }
   .rightlinemsg{
    position: absolute;
    top: vh(180);
    right: vw(20);
    width: vw(300);
    height: vh(864);
    background: url("~@/assets/image/form_bj.png");
    // border:1px solid #ffffff;
    background-size: 100% 100%;
    overflow: hidden;
     flex-direction: column;
    display: flex;
    .tit {
      width: 100%;
      height: vh(60);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(75);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-align:center;
      font-weight: bold;
    }
    .bttit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      color:#27B6FF;
      // padding:0 vw(30);
      // padding-right: vw(10);
      font-size:vw(18);
      margin-left:vw(8);
      margin-right:vw(8);
      margin-top: vh(16);
      div {
        flex: 1;
        text-align: center;
      }
    }
    .bttit1 {
      // padding:0;
      width: 100%;
      height: vh(42);
      // margin-bottom:vh(20);
      color:#ffffff;
      margin-top: vh(0);
      cursor: pointer;
      font-size:vw(16);
    }
    .bttit1:hover {
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
      color:#27B6FF;
      font-weight:bold;
    }
    .bttit2{
      background: rgba(93, 137, 255, 0.2);
      box-shadow: 0px 0px vh(6) rgba(69, 120, 255, 0.6) inset;
      color:#27B6FF;
      font-weight:bold;

    }
    .tablbox {
      flex: 1;
      box-sizing: border-box;
      margin-right: vw(10);
      // margin-left: vw(8);
      overflow: hidden;
      overflow-y: scroll;
      margin-top: vh(12);
      margin-bottom: vh(30);
      
    }
  }
 
}
</style>
