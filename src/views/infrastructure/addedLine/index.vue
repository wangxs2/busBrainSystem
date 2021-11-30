<template>
  <div class="addedLine" id="addedLine">
       <div @click="show3=true" class="btn-set">新增线路</div>
      <div class="addbox">
        <el-collapse-transition>
            <div v-show="show3" class="box-form">
                <el-form size="small" :rules="rules" ref="formLabelAlign" :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                  <el-form-item label="线路名称" prop="line">
                    <el-input v-model="formLabelAlign.line"></el-input>
                  </el-form-item>
                  <el-form-item label="所属公司">
                    <el-input v-model="formLabelAlign.region"></el-input>
                  </el-form-item>
                  <el-form-item label="上下行" prop="direction">
                    <el-select style="width:100%" @change="checkline()" v-model="formLabelAlign.direction" placeholder="请选择">
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
                    <!-- <el-button size="small" @click="editPolyline()"  type="primary">编辑线路</el-button>
                    <el-button size="small" @click="completeRoute()" type="primary">编辑完成线路</el-button> -->
                     <el-button size="small" @click="clearLine()" type="primary">清除线路</el-button>
                  </div>
                  <el-form-item label="走向">
                   <el-input    type="textarea" :rows="4" :disabled="true" v-model="formLabelAlign.geom"></el-input>
                  </el-form-item>
                </el-form>

                <div style="text-align:center">
                   <el-button size="small" @click="submitForm" type="primary">确定</el-button>
                    <el-button @click="show3=false" size="small" >取消</el-button>
                </div>
            </div>
        </el-collapse-transition>
      </div>

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
      isInputStation:false,
      stationArr:[],
      labelPosition: 'right',
      rules: {
          line: [
          { required: true, message: '请输入线路名称', trigger: 'blur' },
        ],
          direction: [
          { required: true, message: '请选择上下行', trigger: 'change' }
        ],
      },
      
      formLabelAlign:{
        line: '',
        direction: '',
        // routeId:'',
        geom:'',
        stationCodeList:[]
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
    this.checkline()
  },
  mounted() {
    this.M_initMap('addedLine')
    this.pointAll()
  },

  methods: {

    submitForm() {
        if(this.formLabelAlign.geom){
          this.formLabelAlign.geom=this.formLabelAlign.geom.join(' ')
        }
        
        
        this.$refs['formLabelAlign'].validate((valid) => {
          if (valid) {

            this.$fetchPost("net/saveNewRoute",this.formLabelAlign,'json').then(res => {
              if(res.code==200){

                this.$message({
                  message: '添加成功',
                  type: 'success'
                });


                 this.formLabelAlign={
                      line: '',
                      direction: '',
                      geom:'',
                      stationCodeList:[]
                    }


              }


             

                      

            })

            
          } else {
            
            return false;
          }
        });
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
    //检查是否是已经存在的线路
    checkline(){
      this.$fetchGet("net/checkRouteExist",{
        routeName:this.formLabelAlign.line,
        direction:this.formLabelAlign.direction
      }).then(res => {
        if(JSON.stringify(res.result) == "{}"){
          return 
        }else{
          this.$message({
            message: '线路已存在如需修改请去线路调整界面！！！',
            type: 'warning'
          });
        }
      })

    },
    
    completeRoute(){
      this.formLabelAlign.geom=this.polylineRoute.getPath()
      this.polyEditor.close()

    },
    clearLine(){
       this.formLabelAlign.geom=''
      this.M_map.remove(this.polylineRoute)
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
.addedLine{
    width: 100%;
    height: 100%;
     position: relative;
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
