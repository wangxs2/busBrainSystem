<template>
  <div class="cancelLine" id="cancelLine">
      <!-- <div @click="show3=true" class="btn-set">调整线路</div> -->
      <div class="search-box">
        <div style="margin-right:0.6vw;white-space: nowrap">线路名称</div>
        <el-select style="width:75%" size="small" filterable @change="getDetail" v-model="linevalue" placeholder="请选择">
          <el-option
            v-for="(item,n) in allData"
            :key="n"
            :label="item.routeName"
            :value="item.routeName">
          </el-option>
        </el-select>

         <div class="qhbtn">
        <div :class="isbtn==iteam.id?'btnnow activebtn':'btnnow' " @click="tobtn(iteam)" v-for="(iteam,n) in typelst" :key="n">{{iteam.name}}</div>
        </div>
        <el-button style="margin-left:10px" size="small" @click="deletLine()" type="primary">删除线路</el-button>
      </div>
      <!-- <div class="addbox">
        <el-collapse-transition>
            <div v-show="show3" class="box-form">
                <el-form size="small" :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                  <el-form-item label="线路名称 ">
                    <el-input v-model="formLabelAlign.name"></el-input>
                  </el-form-item>
                  <el-form-item label="所属公司">
                    <el-input v-model="formLabelAlign.region"></el-input>
                  </el-form-item>
                  <el-form-item label="上下行">
                    <el-select style="width:100%" v-model="formLabelAlign.type" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="首班车时间">
                   <el-input v-model="formLabelAlign.region"></el-input>
                  </el-form-item>
                  <el-form-item label="末班车时间">
                   <el-input v-model="formLabelAlign.region"></el-input>
                  </el-form-item>
                  <el-form-item label="发车时刻表">
                   <el-input v-model="formLabelAlign.region"></el-input>
                  </el-form-item>
                  <div style="margin-bottom:1vh"> 
                    <el-button @click="drawPolyline()" size="small" type="primary">开始绘制线路走向</el-button>
                    <el-button size="small" @click="editPolyline()"  type="primary">编辑线路</el-button>
                    <el-button size="small" @click="completeRoute()" type="primary">编辑完成线路</el-button>
                     <el-button size="small" @click="clearLine()" type="primary">清除线路</el-button>
                  </div>
                  <el-form-item label="走向">
                   <el-input    type="textarea" :rows="4" :disabled="true" v-model="formLabelAlign.gemo"></el-input>
                  </el-form-item>
                </el-form>

                <div style="text-align:center">
                   <el-button size="small" type="primary">确定</el-button>
                    <el-button @click="show3=false" size="small" >取消</el-button>
                </div>
            </div>
        </el-collapse-transition>
      </div> -->

  </div>
</template>
<script>
import MapMixin from '../mapinfrast.js'
export default {
  mixins: [MapMixin],
  components: {
  },
  data() {
    return {
     show3:false,
      isbtn:0,
      routeId:'',
     labelPosition: 'right',
     typelst:[
              {
                name:'上行',
                id:0
              },{
                name:'下行',
                id:1
              }
            ],
      linevalue:'',
      allData:[],
     formLabelAlign:{
       name: '',
        region: '',
        type: '',
        value1: new Date(),
        gemo:'',
     },
     options:[
       {
         label:'上行',
         value:0,

       },{
         label:'下行',
         value:1,
       }
     ]
    }
  },
  beforeCreate() {},
  created() {
    this.getData()
  },
  mounted() {
    this.M_initMap('cancelLine')
    // this.pointAll()
   
  },

  methods: {
    getData(){
        this.$fetchGet("config-basic-route/list").then(res => {
          this.allData=res.result;
          
        })
    },
     tobtn(row){
        this.isbtn=row.id

         this.$fetchGet("net/checkRouteExist",{
        routeName:this.linevalue,
        direction:this.isbtn
      }).then(res => {
        if(JSON.stringify(res.result) == "{}"){
          return 
        }else{
         
       
         this.chlinelin(res.result.geom.geom)
        }
      })

        
      },
    getDetail(){
       this.allData.forEach(iteam=>{
        if(iteam.routeName==this.linevalue){
            this.routeId=iteam.routeId
        }
      })

       this.$fetchGet("net/checkRouteExist",{
        routeName:this.linevalue,
        direction:this.isbtn
      }).then(res => {
        if(JSON.stringify(res.result) == "{}"){
          return 
        }else{
         
       
         this.chlinelin(res.result.geom.geom)
        }
      })

    },
    pointAll(){
      this.$fetchGet("indicator/stationList").then(res => {
        if(res.result&&res.result['站点的详细属性']){
          this.maplocalMain(res.result['站点的详细属性'])
           setTimeout(() => {
                this.assloading=false
            }, 2000);

        }
      });  


      
     
     
    },
    
    completeRoute(){
      this.formLabelAlign.gemo=this.polylineRoute.getPath()
      this.polyEditor.close()

    },
    deletLine(){
       
        this.$fetchGet("net/removeRoute",{
          routeId:this.routeId
        }).then(res => {
          this.M_map.remove(this.polylineRoute)

        })
      
    },

    

  }
};
</script>
<style lang="scss">
.box-form{
  .el-input__inner {
  background: rgba(26, 66, 118, 0.2) !important;
  color: #dae4ff !important;
  border: 1px solid #27B6FF !important;
  box-shadow: 0px 0px vh(6) rgba(39, 182, 255, 0.8) inset !important;
}
.el-form-item__label{
  color: #ffffff !important;
  font-size:vw(16)
}
.el-textarea.is-disabled .el-textarea__inner{
   background: rgba(26, 66, 118, 0.2) !important;
  color: #dae4ff !important;
  border: 1px solid #27B6FF !important;
  box-shadow: 0px 0px vh(6) rgba(39, 182, 255, 0.8) inset !important;

}
}
</style>

<style lang="scss" scoped>
.cancelLine{
    width: 100%;
    height: 100%;
     position: relative;
    .search-box {
      // width:40%;
      background: rgba(12, 38, 104, 0.7);
      box-sizing: border-box;
      padding: vh(10) vw(16);
      position: absolute;
      top: vh(140);
      left: vw(20);
      display: flex;
      align-items: center;
      color: #dae4ff;
      z-index:2;

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
  
   .btn-set{
     position: absolute;
      right: vw(24);
      top: vw(124);
      z-index: 10;
      background: rgba(12, 38, 104,1);
      box-shadow: 0px 0px vh(6) #27b6ff inset;
      box-sizing: border-box;
       padding: vh(8) vw(12);
       cursor: pointer;
   }
   .btn-set:active{
     background: rgba(12, 38, 104, 1);
     color: #27b6ff
   }
   .addbox{
       position: absolute;
      right: vw(24);
      top: vw(224);
      z-index: 10;
      
      box-sizing: border-box;
       padding: vh(8) vw(12);
       .box-form{
          background: rgba(12, 38, 104, 1);
          box-shadow: 0px 0px vh(6) #27b6ff inset;
          box-sizing: border-box;
          padding: vh(24) vw(32);
       }
   }

}

</style>
