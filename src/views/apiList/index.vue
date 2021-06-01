<template>
  <div class="apiList-box" id="container">
   
    <!-- <iframe style="width:500px;height:600px;z-index:10" src="http://101.231.47.117:50009"></iframe> -->
    <!-- <iframe style="width: 400px; height: 300px;z-index:10" src="https://github.com/wangxs2/Viruses"/> -->

    <div class="page-box" style="z-index:10">
         <el-button type="primary" @click="ttt()">入库公交线路</el-button>
         <el-button type="primary" @click="tologin()">ceshi</el-button>
         <el-button type="primary" @click="metbase()">去metbase</el-button>
         <el-button type="primary" @click="pointAll()">渲染站点</el-button>
         <el-button type="primary" @click="kyAll()">客运走廊数据</el-button>
         <el-button type="primary" @click="clsj()">客运走廊</el-button>
    </div>
  </div>
</template>

<script>
import JsonViewer from "vue-json-viewer";
// import nydata './cra.js';
let datafg=require('./car.js');
export default {
  components: {
    JsonViewer
  },
  data() {
    return {
      query: {
        page: 1,
        pageSize: 15,
        country: "",
        countryId: ""
      },
      myMap:null,
      linesearch:null,
      norarr:[],
      kedata1:[],
      kedata2:[],
       ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
    };
  },
  beforeCreate() {},
  created() {
    console.log(navigator)
  },
  mounted() {
    this.initMap()
  },

  methods: {
    initMap(){
       this.myMap=new AMap.Map("container", {
          resizeEnable: true,
          center: [121.460752,31.011182],//地图中心点
          zoom: 10, //地图显示的缩放级别
          mapStyle:'amap://styles/d67717253a691e523956e9482ca38f1e'
      });
      
      
    },
    metbase(){
      // window.open('http://101.231.47.117:50009')
      window.location.href="http://101.231.47.117:50009"
      console.log(window.location.href)
    },
    ttt(){
      //  this.getBusLine('790路')
      datafg.datafg.forEach(iteam=>{
        this.getBusLine(iteam.name)
       
      })

    },
    pointAll(){
      this.$fetchGet("indicator/stationCoverArea").then(res => {
        this.pointAll3(res.result['站点的详细属性'].slice(0,4000),1)
      });
    },
    kyAll(){
      this.$fetchGet("indicator/corridor").then(res => {
        let add=[]
        let data1=res.result.smap
        let data2=res.result.mmap
        let data=[]
        let data3=[]
            for(let key  in data1){
                data1[key].forEach(itam=>{
                   itam.lnglat=[itam.longitude,itam.latitude]
                  this.kedata1.push(itam)
                })
            }
            for(let key  in data2){
                
                data2[key].forEach(itam=>{
                  itam.lnglat=[itam.lon,itam.lat]
                  this.kedata2.push(itam)
                })
            }
            console.log(this.kedata1)
            console.log(this.kedata2)
            this.pointAll3(this.kedata1,2)
            this.pointAll3(this.kedata2,3)

      });
    },
     separateArr(data, n) {
            //获取要切割的数组的长度
            let len = data.length;
            let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
            let res = [];
            for (let i = 0; i < lineNum; i++) {
                // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
                let temp = data.slice(i * n, i * n + n);
                res.push(temp);
            }
            return res;
        },
    //划线
    clsj(){

      var path=[121.519582,31.244213,121.519504,31.241951,121.519706,31.240515,121.520005,31.239596,121.520566,31.238437,121.522564,31.234565,121.524342,31.231122,121.525827,31.227642,121.527369,31.223936,121.5288,31.220249,121.529217,31.218594,121.529336,31.216774,121.529217,31.21494,121.528592,31.213133,121.527758,31.211611,121.52685,31.209842,121.525213,31.206825,121.523456,31.203604,121.521253,31.199657,121.518743,31.194945,121.516408,31.192784,121.513805,31.191212,121.510819,31.189607]
      var polyline = new AMap.Polyline({
          path: this.separateArr(path,2),
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 3,
          strokeColor: "#3366FF",
          strokeOpacity: 1,
          strokeWeight: 6,
          // 折线样式还支持 'dashed'
          strokeStyle: "solid",
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50,
        })
           this.myMap.add(polyline);
      // this.kedata2.forEach(itam=>{
      //   this.kedata1.push(itam)
      // })

    },
    pointAll3(datapoint,type){

        var style = [
          {
              url: 'https://webapi.amap.com/images/mass/mass0.png',
              anchor: new AMap.Pixel(6, 6),
              size: new AMap.Size(11, 11),
              zIndex: 3,
          }, {
        url: 'https://webapi.amap.com/images/mass/mass1.png',
        anchor: new AMap.Pixel(4, 4),
        size: new AMap.Size(7, 7),
        zIndex: 2,
    }, {
        url: 'https://webapi.amap.com/images/mass/mass2.png',
        anchor: new AMap.Pixel(3, 3),
        size: new AMap.Size(5, 5),
        zIndex: 1,
    }
          ];

          var mass = new AMap.MassMarks(datapoint, {
              opacity: 0.8,
              zIndex: 111,
              cursor: 'pointer',
              style: type==1?style[0]:type==2?style[1]:style[2]
          });

          var marker = new AMap.Marker({content: ' ', map: this.myMap});

          mass.on('mouseover',  (e)=> {

              marker.setPosition(e.data.lnglat);
              console.log(e.data)
              marker.setLabel({content: e.data.stationName})
          });

          mass.setMap(this.myMap);


    },
    getBusLine(busLineName){

        this.linesearch = new AMap.LineSearch({
                pageIndex: 1,
                city: '上海',
                pageSize: 10,
                extensions: 'all'
            });
            this.linesearch.search(busLineName, (status, result)=> {
              let arr=[]
            if (status === 'complete' && result.info === 'OK') {
                result.lineInfo[0].path.forEach(itam=>{
                  let obj={
                    lat:itam.lat,
                    lng:itam.lng,
                    routeName:busLineName
                  }
                  arr.push(obj)
                })
                 this.$fetchPost("/config-route-lnglat/receive",arr,'json').then(res=>{

                     })
            } else {
              this.norarr.push(busLineName)
              console.log(this.norarr)
            }
        });

    },
    tologin() {
      // document.cookie = "metabase.SESSION=" + 'bbbdab37-2391-4bb9-87cf-7577228638f07879';
      this.$fetchGet(
        "http://192.168.1.185:4562/example/getData",
        this.query
      ).then(res => {});
      
    },
    addProject() {
      this.$fetchGet("indicator/stationCoverArea").then(res => {});
      this.$fetchGet("indicator/corridor").then(res => {});
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$fetchPost("http://192.168.1.185:4562/example/addData",this.ruleForm)
              .then(res=>{
                
              
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>
<style lang="scss">
</style>

<style lang="scss" scoped>
.apiList-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  padding-top:vw(70);
  .search-box {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .page-box {
    width: 100%;
    height: 60px;
    text-align: right;
  }
  .tabel-box {
    flex: 1;
  }
}
</style>
