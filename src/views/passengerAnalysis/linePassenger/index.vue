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
          :key="item.routeId"
          :label="item.routeName"
          :value="item.routeId">
        </el-option>
      </el-select>
      <div class="qhbtn">
      <div :class="isbtn==iteam.id?'btnnow activebtn':'btnnow' " @click="tobtn(iteam)" v-for="(iteam,n) in typelst" :key="n">{{iteam.name}}</div>
      </div>
    
    
    </div>
  </div>
</template>

<script>
export default {
    
    data(){
        return {
            options:[],
            value1:[new Date() - 3600 * 1000 * 24 * 1,new Date()- 3600 * 1000 * 24 * 1],
            value:"",
            isbtn:0,
            typelst:[
              {
                name:'上行',
                id:0
              },{
                name:'下行',
                id:1
              }
            ],
        }
    },
    created() {
     
      
    },
    mounted() {
      this.getAllline()
    },
    methods: {
     
      toLine(){
        this.getLinepassenger()
      },
      tobtn(row){
        this.isbtn=row.id
        this.getLinepassenger()
      },
      changeDate(){
        this.getLinepassenger()
      },
      getAllline(){ 
        this.$fetchGet("route/routeList").then(res=>{
          this.options=res.result
         if(this.$route.query.idName){
            this.options.forEach(iteam=>{
              if(iteam.routeName==this.$route.query.idName){
                this.value=iteam.routeId
                this.getLinepassenger()
              }
            })

          }else{
               setTimeout(()=>{
                this.$store.commit('SET_LOADING',false)
                },200)
          }
        })
      },
      getLinepassenger(){
        this.$store.commit('SET_LOADING',true)
        this.$fetchGet("passenger/linePassenger",{
          direction:this.isbtn,
          st:this.$moment(this.value1[0]).format("YYYY-MM-DD"),
          et:this.$moment(this.value1[1]).format("YYYY-MM-DD"),
          routeId:this.value

        }).then(res => {
            if(res.result['线路走向']){
              let obj=res.result['线路走向']
              obj.geom=this.setData(obj.geom)
              
              this.$emit('changeKl',{
                toLine:obj,
                toLinestation:res.result['线路站点列表']
              })
            }else{
              this.$message({
                  message: '无此线路信息!',
                  type: 'warning'
                });
            }
            this.$store.commit('SET_LOADING',false)
        })
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
};
</script>
<style lang="scss" scoped>
.linePassenger{
  .search-box {
    background: rgba(12, 38, 104, 0.7);
    box-sizing: border-box;
    padding: vh(10) vw(16);
    position: absolute;
    top: vh(138);
    left: vw(20);
    display: flex;
    align-items: center;
    color: #dae4ff;
    .qhbtn{
      width: vw(120);
      height: vh(36);
      background: rgba(26, 66, 118, 0.2);
      border: 1px solid #27B6FF;
      border-radius: vw(18);
      box-shadow: 0px 0px vh(10) rgba(39, 182, 255, 1) inset;
      display:flex;
      align-items: center;
      margin-left:vw(12);
      .btnnow{
        flex:1;
        text-align:center;
        height:100%;
        line-height:vh(36);
        cursor:pointer;
      }
      .btnnow:first-child{
        border-top-left-radius:vw(18);
        border-bottom-left-radius:vw(18);
      }
      .btnnow:last-child{
        border-top-right-radius:vw(18);
        border-bottom-right-radius:vw(18);
      }
      .activebtn{
        background: #4578FF;
      }
    }
  }
}
</style>