<template>
  <div class="operServices"  v-loading="poloading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="operMap" id="operMap">

    </div>
  

    <div class="leftlinemsg">
      <div style="text-align:left;color:#fff;font-weight:bold;margin-left:1vw;margin-top:1vh">偏好设置</div>
      <div class="itmsg-box">
          <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">线路长度</div>
               <el-input style="width:50px" size="mini" v-model="searchbox.minDis"></el-input>-
               <el-input style="width:50px;margin-right:0.3vw" size="mini" v-model="searchbox.maxDis"></el-input> m

          </div>
          <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">站点数</div>
               <el-input style="width:50px" size="mini" v-model="searchbox.minStationNum"></el-input>-
               <el-input style="width:50px;margin-right:0.3vw" size="mini" v-model="searchbox.maxStationNum"></el-input> 站

          </div>

          <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">站点间距</div>
               <el-input style="width:50px" size="mini" v-model="searchbox.adjacentMinDis"></el-input>-
               <el-input style="width:50px;margin-right:0.3vw" size="mini" v-model="searchbox.adjacentMaxDis"></el-input> 

          </div>
          
          <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">百公里人次</div>
               <el-input style="width:100px" size="mini" v-model="searchbox.adjacentMinDis1"></el-input>

          </div>

          <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">发车间隔</div>
               <el-input style="width:100px" size="mini" v-model="searchbox.adjacentMinDis2"></el-input> 分种

          </div>
          <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">配车数</div>
               <el-input style="width:100px" size="mini" v-model="searchbox.adjacentMinDis3"></el-input> 辆

          </div>
          <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">车辆运营速度</div>
               <el-input style="width:100px" size="mini" v-model="searchbox.adjacentMinDis4"></el-input> km/h

          </div>



            <el-button @click="svgg()" type="primary">确认</el-button>

       
     
      </div>
    </div>



    <div class="rightlinemsg" v-show="isupdate">
      <div style="text-align:left;color:#fff;font-weight:bold;margin-left:1vw;margin-top:1vh">线路详情</div>
      <div style="text-align:left;color:#fff;margin-left:1.6vw;margin-top:2vh">线路名称：{{updtaobj.routeName}}</div>
      <div class="itmsg-box">
           <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">线路长度</div>
               <el-input style="width:50px" size="mini" v-model="updtaobj.confLenMin"></el-input>-
               <el-input style="width:50px;margin-right:0.3vw" size="mini" v-model="updtaobj.confLenMax"></el-input> m
          </div>
          <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">站点数</div>
               <el-input style="width:50px" size="mini" v-model="updtaobj.confNumsMin"></el-input>-
               <el-input style="width:50px;margin-right:0.3vw" size="mini" v-model="updtaobj.confNumsMax"></el-input> 站
          </div>
           <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">站点间距</div>
               <el-input style="width:50px" size="mini" v-model="updtaobj.confAdjacentMinDis"></el-input>-
               <el-input style="width:50px;margin-right:0.3vw" size="mini" v-model="updtaobj.confAdjacentMaxDis"></el-input> 
          </div>
           <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">百公里人次</div>
               <el-input style="width:100px" size="mini" v-model="searchbox.adjacentMinDis1"></el-input>

          </div>

          <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">发车间隔</div>
               <el-input style="width:100px" size="mini" v-model="searchbox.adjacentMinDis2"></el-input> 分种

          </div>
          <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">配车数</div>
               <el-input style="width:100px" size="mini" v-model="searchbox.adjacentMinDis3"></el-input> 辆

          </div>
          <div class="itmsg">
              <div style="width:8vw;text-align:left;margin-right:0.4vw">车辆运营速度</div>
               <el-input style="width:100px" size="mini" v-model="searchbox.adjacentMinDis4"></el-input> km/h

          </div>
            <el-button @click="updatemsg()" type="primary">确认修改</el-button>
            <el-button @click="submitall()" type="primary">提交</el-button>
     
      </div>
    </div>




    <div class="tulibox" v-show="isupdate1">
      <div style="display:flex;align-items: center;cursor:pointer;margin-bottom:0.6vh" @click="lincolor(iteam)" v-for="(iteam,n) in updateall" :key="n">
        <div :style="{'background':iteam.iscolor==true?iteam.color:'grey'}" class="iyline"></div> 
        <div :style="{'color':iteam.iscolor==true?'#ffffff':'grey'}">{{iteam.routeName}}</div>
      </div>

    </div>


    <div class="tulibox1" v-show="isupdate2">
        <div style="margin-bottom:1.5vh">已设计线网</div>
       <div style="display:flex;align-items: center;cursor:pointer;margin-bottom:0.6vh" @click="lincolor1(iteam)" v-for="(iteam,n) in updateall45" :key="n">
        <div :style="{'background':iteam.iscolor1==true?iteam.color:'grey','border':'1px solid #ffffff'}" class="iyline1"></div> 
        <div :style="{'color':iteam.iscolor1==true?'#ffffff':'grey'}">{{iteam.routeName}}</div>
      </div>

    </div>


      
    
  </div>
</template>

<script>
import gaosudata from './datasj.json'
export default {
  data(){
    return{
      MyMapper:null,
      isupdate2:false,
      isupdate1:false,
      isupdate:false,
      updateall45:[],
      radio:'',
      searchbox:{
        line:'',
        metroName:'',
        minDis:"800",
        maxDis:"5000",
        maxStationNum:"10",
        minStationNum:"3",
        adjacentMaxDis:"1000",
        adjacentMinDis:"200",
        routeConfList:[],
        adjacentMinDis4:'',
        adjacentMinDis3:'',
        adjacentMinDis2:'',
        adjacentMinDis1:'',

      
      },
      updateall:[],
      updtaobj:{
        routeName:"",
        confLenMax: 0, //线路长度-最长
        confLenMin: 0, //线路长度-最短
        confNumsMax: 0,//站点数最大
        confNumsMin: 0,//站点数最小
        confAdjacentMaxDis: 0,//站间距最大
        confAdjacentMinDis: 0,//站间距最小
      },

      linecolors:['#5AB91B', '#FFCA40', '#D35F1A', '#FF2C00', '#E20048', '#2E16B1', '#8C2ECA', '#009CFF', '#2968E8','#00A08A','#FFBA58'],
      polineGroups:new AMap.OverlayGroup(),//线集合
      M_InfoWindow:null,//信息窗口
      kyLineOver:new AMap.OverlayGroup(),//线路的集合
      kyLineOver1:new AMap.OverlayGroup(),//陈龙方案的集合
      graspRoad : new AMap.GraspRoad(),//纠偏
      poloading:false,
      polyEditor: null,
      busPolyline:null,
       datpath:'121.589119,31.159601 121.58904,31.159735 121.588917,31.160039 121.589125,31.160154 121.589019,31.160378 121.588911,31.160616 121.588668,31.161146 121.588116,31.162439 121.587535,31.163832 121.587313,31.164349 121.587248,31.164505 121.587227,31.164549 121.586836,31.165447 121.586541,31.165894 121.586359,31.166189 121.586146,31.166467 121.585851,31.166758 121.585799,31.166836 121.585768,31.166914 121.585751,31.167057 121.585638,31.167253 121.585503,31.1674 121.585204,31.167669 121.585091,31.167765 121.584926,31.168034 121.58487,31.168151 121.584852,31.168212 121.584701,31.168741 121.586215,31.169353 121.587114,31.169714 121.587422,31.169987 121.588051,31.170247 121.587973,31.170369 121.586098,31.169622 121.585191,31.169262 121.584588,31.169015 121.584475,31.168976 121.584479,31.168976 121.58448,31.168976 121.58448,31.168972 121.583801,31.168703 121.583145,31.168442 121.582764,31.168316 121.582542,31.168211 121.582428,31.168152 121.581886,31.167938 121.5812,31.167656 121.580215,31.167278 121.579033,31.166805 121.578247,31.166498 121.577446,31.166189 121.576958,31.165993 121.576668,31.165903 121.576187,31.165747 121.57589,31.165668 121.574699,31.165356 121.574661,31.165346 121.574081,31.165213 121.573616,31.165096 121.572845,31.164867 121.571625,31.164532 121.571623,31.164527 121.57161,31.164527 121.570799,31.164301 121.569531,31.163958 121.568472,31.16482 121.567052,31.167059 121.566228,31.168922 121.565273,31.171033 121.565243,31.171102 121.564766,31.172218 121.56457,31.172674 121.563889,31.174245 121.56388,31.174266 121.563741,31.174566 121.563377,31.175314 121.563377,31.175313 121.56332,31.17543 121.563034,31.176011 121.562995,31.176102 121.563003,31.176189 121.562856,31.176697 121.562843,31.177131 121.562843,31.177153 121.562834,31.177474 121.562799,31.177743 121.562457,31.179197 121.562378,31.179544 121.562318,31.179648 121.56224,31.179896 121.562201,31.18003 121.562049,31.18049 121.561927,31.180872 121.561797,31.181263 121.561693,31.18158 121.561688,31.181589 121.56168,31.181615 121.561706,31.181745 121.561845,31.181988 121.561879,31.182083 121.561866,31.182192 121.561823,31.182318 121.561359,31.184071 121.561345,31.184132 121.560881,31.184084 121.560425,31.184036 121.559727,31.183971 121.559661,31.183967 121.559662,31.183968 121.559013,31.183907 121.558838,31.183889 121.558357,31.18384 121.557976,31.183794 121.557411,31.183699 121.556801,31.183584 121.556747,31.183575 121.556396,31.183512 121.556267,31.183479 121.555504,31.183332 121.555428,31.183319 121.555176,31.18327 121.554771,31.183195 121.554634,31.183546 121.554344,31.184431 121.554108,31.18519 121.553963,31.185173 121.553429,31.185122 121.552773,31.185087 121.552734,31.185087 121.552353,31.185068 121.552216,31.185064 121.551598,31.185032 121.551201,31.185009 121.550491,31.184973 121.547935,31.184853 121.547218,31.184832 121.546768,31.184887 121.546669,31.1849 121.546265,31.184935 121.545883,31.184952 121.545807,31.184952 121.545296,31.184931 121.545128,31.18491 121.543991,31.184765 121.542328,31.184544 121.542007,31.184504 121.541512,31.184444 121.541336,31.184441 121.5411,31.184458 121.540977,31.184454 121.540749,31.185505',
      nowindex:-1,
      lineaData: [],
      options: [],
      metrodata:[{name:'14号线',color:'#655f23'},{name:'18号线',color:'#D5A461'}],
      value:'',
      driving:null,
      objleft:{
            cfd:'-',   // 重复度
            gjcf:'-',
            fzxxs:'-',  // 非直线系数
            cd:'-',  // 长度
            bglrc:'-', // 百公里人次
            mzl:'-'// 满载率
      },
      routeConfList:[],
      testData:[{pdb: "pdb0339", name: "陆家嘴东路浦东南路", lng: 121.50975, lat: 31.237448, depot: false},
        {pdb: "pdb0003", name: "栖霞路浦东南路", lng: 121.513964, lat: 31.235298, depot: false},
        {pdb: "pdb0197", name: "乳山路南泉北路", lng: 121.517777, lat: 31.233861, depot: false}],
          
    }

  },
  watch:{
  },
  mounted(){
    this.initMap()
  },
  created(){
   this.getdataline()
   this.upBtn()
 
  },
  methods:{
     upBtn(){
        this.metrodata.forEach(iteam=>{
          this.lineSearch(iteam.name,iteam,3)
        })
      },
    cgztsta(){
    },
    // ym给的pdf
     drawRouteYm (arr) {

       arr.forEach(iteam=>{

          var routeLine = new AMap.Polyline({
              path: this.setData(iteam.geom),
              map:this.MyMapper,
              isOutline: false,
              outlineColor: '#ffeeee',
              borderWeight: 2,
              strokeWeight: 5,
              strokeOpacity: 0.9,
              strokeColor: '#409EFF',
              strokeStyle:'dashed',
              cursor:'pointer',
              // extData :row,
              lineJoin: 'round'
          })

       })

       

       
    },
    //确认修改
    updatemsg(){
      this.updateall.forEach(iteam=>{
        if(this.updtaobj.routeName==iteam.routeName){
          iteam.confLenMax=this.updtaobj.confLenMax
          iteam.confLenMin=this.updtaobj.confLenMin
          iteam.confNumsMax=this.updtaobj.confNumsMax
          iteam.confNumsMin=this.updtaobj.confNumsMin
          iteam.confAdjacentMaxDis=this.updtaobj.confAdjacentMaxDis
          iteam.confAdjacentMinDis=this.updtaobj.confAdjacentMinDis
        }
      })
      //   confLenMax: 0, //线路长度-最长   maxDis
        // confLenMin: 0, //线路长度-最短 minDis
        // confNumsMax: 0,//站点数最大 maxStationNum
        // confNumsMin: 0,//站点数最小 minStationNum
        // confAdjacentMaxDis: 0,//站间距最大 adjacentMaxDis
        // confAdjacentMinDis: 0,//站间距最小 adjacentMinDis


    },
    //提交
    submitall(){
      this.poloading=true
     
      this.updateall.forEach(iteam=>{
         let obj={
          routeName:'',
          minDis:0,
          maxDis:0,
          maxStationNum:0,
          minStationNum:0,
          adjacentMaxDis:0,
          adjacentMinDis:0
        }
        obj.routeName=iteam.routeName
        obj.minDis=iteam.confLenMin
        obj.maxDis=iteam.confLenMax
        obj.maxStationNum=iteam.confNumsMax
        obj.minStationNum=iteam.confNumsMin
        obj.adjacentMaxDis=iteam.confAdjacentMaxDis
        obj.adjacentMinDis=iteam.confAdjacentMinDis

        this.searchbox.routeConfList.push(obj)

      })

      //  this.$fetchPost("net/qy",this.searchbox,'json').then(res=>{
      //    this.poloading=false

      //   this.$message({
      //     message: res.message,
      //     type: 'success'
      //   });

      //  })

        setTimeout(()=>{
              this.searchDaline()
            },500)





    },
    lincolor1(row){
       row.iscolor1=!row.iscolor1
        this.kyLineOver1.getOverlays().forEach(iteam=>{
        if(row.iscolor1==false&&row.routeName==iteam.getExtData().routeName){
          iteam.hide()
        }
        if(row.iscolor1==true&&row.routeName==iteam.getExtData().routeName){
          iteam.show()
        }
      })
    },
    lincolor(row){
      row.iscolor=!row.iscolor
      // if(this.kyLineOver.getOverlays().length>0){
      //   this.kyLineOver.clearOverlays()
      // }

      this.kyLineOver.getOverlays().forEach(iteam=>{
        if(row.iscolor==false&&row.routeName==iteam.getExtData().routeName){
          iteam.hide()
        }
        if(row.iscolor==true&&row.routeName==iteam.getExtData().routeName){
          iteam.show()
        }
      })



      


    },

    toLine(arr,color,row){

      console.log(arr)
       let marrk=new AMap.Marker({
            // map: this.MyMapper,
            position: [row.geneStart.lng,row.geneStart.lat], //基点位置
            icon: require("../../../assets/image/icon_gj1.png"),
            zIndex: 10,
            extData:row,
            anchor: 'bottom-center',
        });

     
         marrk.setLabel({
            direction:'right',
            offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content: `<div class='info'>${row.geneStart.name}(${row.geneStart.pdb})</div>`, //设置文本标注内容
        });
        let marrk1=new AMap.Marker({
            // map: this.MyMapper,
            position: [row.geneEnd.lng,row.geneEnd.lat], //基点位置
            icon: require("../../../assets/image/icon_gj1.png"),
            zIndex: 10,
            extData:row,
            anchor: 'bottom-center',
        });

     
         marrk1.setLabel({
            direction:'right',
            offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content: `<div class='info'>${row.geneEnd.name}(${row.geneEnd.pdb})</div>`, //设置文本标注内容
        });



        this.kyLineOver.addOverlay(marrk)
        this.kyLineOver.addOverlay(marrk1)
       

         this.MyMapper.add(this.kyLineOver);


       // 根据起终点经纬度规划驾车导航路线
       arr.forEach(iteam=>{
          // this.driving.search(new AMap.LngLat(row.geneStart.lng, row.geneStart.lat), new AMap.LngLat(row.geneEnd.lng, row.geneEnd.lat),{
          // waypoints:arr
//  this.driving.search(new AMap.LngLat(iteam[0].lng,iteam[0].lat),new AMap.LngLat(iteam[1].lng,iteam[1].lat), (status, result)=> { 两个点的
         this.driving.search(new AMap.LngLat(row.geneStart.lng, row.geneStart.lat), new AMap.LngLat(row.geneEnd.lng, row.geneEnd.lat),{
          waypoints:arr}, (status, result)=> {
            // result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === 'complete') {
                if (result.routes && result.routes.length) {
                    // 绘制第一条路线，也可以按需求绘制其它几条路线
                    this.drawRoute(result.routes[0],color,row)
                    // log.success('绘制驾车路线完成')
                }
            } else {
                this.$message.error({
                  message: '获取驾车数据失败：' + result
              });
          }
      });

       })
      
    },
    drawRoute (route,color,row) {
        var path = this.parseRouteToPath(route)

        var routeLine = new AMap.Polyline({
            path: path,
            isOutline: false,
            outlineColor: '#ffeeee',
            borderWeight: 2,
            strokeWeight: 5,
            strokeOpacity: 0.9,
            strokeColor: color,
            strokeStyle:'dashed',
            cursor:'pointer',
            extData :row,
            lineJoin: 'round'
        })

        routeLine.on('click',(e)=>{
         
        
          $.each(this.updtaobj, (key, item) => {
            this.updtaobj[key] = row[key];
          });
           this.isupdate=true
        })
        this.kyLineOver.addOverlay(routeLine)

         this.MyMapper.add(this.kyLineOver);

        // 调整视野达到最佳显示区域
         this.MyMapper.setFitView([routeLine])
    },
     parseRouteToPath(route) {
        var path = []

        for (var i = 0, l = route.steps.length; i < l; i++) {
            var step = route.steps[i]

            for (var j = 0, n = step.path.length; j < n; j++) {
              path.push(step.path[j])
            }
        }

        return path
    },

    arr_unique4 (arr) {
     var obj = {};
    arr = arr.reduce(function(item, next) {
      obj[next.name] ? '' : obj[next.name] = true && item.push(next);
      return item;
    }, []);
      return arr;
    },
    searchDaline(){
      this.poloading=true
        this.updateall=[]
        this.updateall45=[]
        this.isupdate2=false
        this.isupdate2=false
      if(this.kyLineOver.getOverlays().length>0){
        this.kyLineOver.clearOverlays()
      }
      if(this.kyLineOver1.getOverlays().length>0){
        this.kyLineOver1.clearOverlays()
      }
      
      this.$fetchPost("net/qy",this.searchbox,'json').then(res=>{
        this.poloading=false

      //  =this.cloneObj(res.result.curGsList)
      if(res.result){

      

        res.result.curGsList.forEach((iteam,inx)=>{
          // iteam.cfstaion=[]
          // iteam.cfstaion=this.arr_unique4(iteam.genes)
      
          // if(iteam.cfstaion.length>1&&iteam.fq!==true){
             
          //   iteam.pointarr=[]
          //   iteam.iscolor=true
          //   iteam.color=this.linecolors[inx]
          //   this.updateall.push(this.cloneObj(iteam))
          //   iteam.cfstaion.forEach((item,index)=>{
          //     item.routeName=iteam.routeName
          //     this.drawpoint(item)
          //     iteam.pointarr.push([iteam.cfstaion[index],iteam.cfstaion[index+1]])
          //   })

          //   gaosudata.forEach(iy=>{
          //     if(iteam.routeName==iy.routeName){
          //       this.updateall45.push(this.cloneObj(iteam))
          //       this.drawbusLine2(iy,iteam)
          //     }
          //   })
          //   this.lineSearch(iteam.routeName,iteam,2)
          //   this.toLine(iteam.pointarr.slice(0,iteam.pointarr.length-1),iteam.color,iteam)
          // }



          // 用途经点规划的
          iteam.cfstaion=[]
          iteam.cfstaion=this.arr_unique4(iteam.genes)
          if(iteam.cfstaion.length>0&&iteam.fq!==true){
             this.isupdate1=true
             this.isupdate2=true
              iteam.iscolor=true
              iteam.iscolor1=false
              
              iteam.pointarr=[]
              iteam.color=this.linecolors[inx]
              this.updateall.push(this.cloneObj(iteam))
              iteam.cfstaion.forEach((item,index)=>{
                item.routeName=iteam.routeName
                this.drawpoint(item)
                iteam.pointarr.push(new AMap.LngLat(item.lng,item.lat))
              })
              this.lineSearch(iteam.routeName,iteam,2)
              
              gaosudata.forEach(iy=>{
                if(iteam.routeName==iy.routeName){
                  this.updateall45.push(this.cloneObj(iteam))
                  this.drawbusLine2(iy,iteam)
                }
              })

                console.log(this.updateall)
              
              this.toLine(iteam.pointarr,iteam.color,iteam)
            
            
          }
          //直接画线的
          // if(iteam.fq!==true){
          //   iteam.genespath=[]
          //   iteam.genespath1=[]
          //   iteam.iscolor=true
          //   this.updateall.push(iteam)
          //   iteam.color=this.linecolors[inx]
          //   iteam.genes.unshift(iteam.geneStart)
          //   iteam.genes.push(iteam.geneEnd)
          //   iteam.genes.forEach(itam=>{
          //     itam.routeName=iteam.routeName
          //     this.drawpoint(itam)
          //     iteam.genespath.push([itam.lng,itam.lat])
          //     iteam.genespath1.push({
          //       "x":itam.lng,
          //       "y":itam.lat,
          //       "sp":10,
          //       "ag":180,
          //       "tm":8
          //     })
          //   })

          //   gaosudata.forEach(iy=>{
          //     if(iteam.routeName==iy.routeName){
          //       this.updateall45.push(iteam)
          //       this.drawbusLine2(iy,iteam)
          //     }
          //   })

          //   this.drawbusLine4(iteam)
          //   this.lineSearch(iteam.routeName,iteam,2)
          // }
        })

        }else{
          this.$message.error({
            message: '请调整参数后重新规划'
          });
      }


      setTimeout(()=>{

         if(this.updateall.length==0){
            console.log(this.updateall)
            this.$message.error({
              message: '请调整参数后重新规划'
            });
          }

      },1000)

     

          
      })

    },
    getdataline(){
    //   this.$fetchGet("route/routeList").then(res=>{
    //       this.options=res.result
    //   })
    },
    initMap(){
       this.MyMapper=new AMap.Map('operMap', {
        zoom: 10, // 地图级别
        center: [121.460752,31.011182], // 中心点
        // resizeEnable: true, //监控地图容器尺寸变化
        mapStyle: 'amap://styles/d67717253a691e523956e9482ca38f1e',
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
      })
      this.M_InfoWindow = new AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        content: '',
        anchor: 'top-right',
        offset: new AMap.Pixel(-6, -6)
      })

      this.M_zzploy()


        var drivingOption = {
          //   AMap.DrivingPolicy.LEAST_TIME
          // 最快捷模式
          // AMap.DrivingPolicy.LEAST_FEE
          // 最经济模式
          // AMap.DrivingPolicy.LEAST_DISTANCE
          // 最短距离模式
          // AMap.DrivingPolicy.REAL_TRAFFIC
          // 考虑实时路况
            policy: AMap.DrivingPolicy.LEAST_DISTANCE, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
            ferry: 1, // 是否可以使用轮渡
            province: '沪', // 车牌省份的汉字缩写  
        }

    // 构造路线导航类
    this.driving = new AMap.Driving(drivingOption)


    this.driving.setAvoidPolygons([[AMap.LngLat(121.571872,31.253914)],[AMap.LngLat(121.571532,31.254462)]])

      setTimeout(()=>{
        this.$store.commit('SET_LOADING',false)
      },200)
      // this.drawRouteYm(gaosudata)
      
    //    this.getData()
    },

    M_zzploy(){
      new AMap.DistrictSearch({
        extensions:'all',
        subdistrict:0
      }).search('浦东新区',(status,result)=>{
          // 外多边形坐标数组和内多边形坐标数组
          var outer = [
              new AMap.LngLat(-360,90,true),
              new AMap.LngLat(-360,-90,true),
              new AMap.LngLat(360,-90,true),
              new AMap.LngLat(360,90,true),
          ];
          var holes = result.districtList[0].boundaries

          var pathArray = [
              outer
          ];
          pathArray.push.apply(pathArray,holes)
          var polygon = new AMap.Polygon( {
              pathL:pathArray,
              strokeColor: '#00eeff',
              strokeWeight: 1,
              fillColor: '#71B3ff',
              fillOpacity: 0.05
          });
          polygon.setPath(pathArray);
          this.MyMapper.add(polygon)
      })
    
    },
  
    getData(){ 
      this.poloading=true
      this.lineaData=[]
      if(this.polineGroups._overlays.length>0){
        this.polineGroups.clearOverlays()
      }
        this.$fetchPost("route/composite",{
            cfd:0,   // 重复度
            gjcf:0,
            fzxxs: 0,  // 非直线系数
            cd:0,  // 长度
            bglrc:1000, // 百公里人次
            mzl:0,// 满载率
            ifFilter:false
        },'json').then(res => {
          if(res.code!==500){

            res.result.forEach(ite=>{
            ite.geom=this.setData(ite.geom)
          })
           this.lineaData=res.result
           this.passCorrline(this.lineaData)

          }
        //   this.poloading=false
          
        })
    },
    passCorrline(data){
      let lines=[]
      data.forEach(iteam=>{
        let kyLinedata = new AMap.Polyline({
          path: iteam.geom,
          strokeColor: "#35A594",
          strokeOpacity: 1,
          strokeWeight:4,
          zIndex:10,
          cursor:'pointer',
          strokeStyle: "solid",
          extData :iteam
        })
        
        kyLinedata.on('mouseover',(e)=>{
          e.target.setOptions({
             strokeColor: "#A200FF",
             zIndex :18,
          })
          let num=Math.round((e.target.getPath().length)/2)
          this.setConten(e.target.getPath()[num],e.target.getExtData())
        })
        kyLinedata.on('mouseout',(e)=>{
          e.target.setOptions({
             strokeColor: "#35A594",
             zIndex :10,
          })
          this.M_InfoWindow.close()
        })
        lines.push(kyLinedata)
      
      })

      this.polineGroups.addOverlays(lines)
      this.MyMapper.add(this.polineGroups);
      
      
    },
    setData(data){
      let str=data.split(' ')
      let arr=[]
      str.forEach(iteam=>{
        arr.push([Number(iteam.split(',')[0]),Number(iteam.split(',')[1])])
      })
      return arr

    },
    setConten(position,ExtData){
      let infoWin = `<div class="info-win">
              <div class="win-triangle"></div>
              <div class="info-box">
                <div class="info-content">
                  <div class="info">
                    <div class="info-name">${ExtData.lineName}</div>
                    <div class="info-item"  style="display:${ExtData.cfd==null?'none':'block'}">重复系数：${ExtData.cfd==null?'':ExtData.cfd}</div>
                    <div class="info-item"  style="display:${ExtData.bglrc==null?'none':'block'}">百公里人次：${ExtData.bglrc==null?'':ExtData.bglrc}</div>
                    <div class="info-item" style="display:${ExtData.mzl==null?'none':'block'}">满载率：${ExtData.mzl==null?'':ExtData.mzl}</div> 
                    <div class="info-item" style="display:${ExtData.fzxxs==null?'none':'block'}">非直线系数：${ExtData.fzxxs==null?'':ExtData.fzxxs}</div> 
                    <div class="info-item" style="display:${ExtData.cd==null?'none':'block'}">线路长度(km)：${ExtData.cd==null?'':ExtData.cd}</div> 
                  </div>
                </div>
              </div>
            </div>`
      this.M_openInfoWin(position, infoWin)

    },
     // 打开信息窗口
    M_openInfoWin (pos, info) {
      this.M_InfoWindow.setContent(info)
      this.M_InfoWindow.open(this.MyMapper, pos)
    },
    toDetail(row,index){
      this.nowindex=index
      this.polineGroups._overlays.forEach(iteam=>{
        if(iteam.getExtData().lineName==row.lineName){
           iteam.setOptions({
             strokeColor: "#A200FF",
             zIndex :18,
          })
          let num=Math.round((iteam.getPath().length)/2)
          this.setConten(iteam.getPath()[num],row)
          this.MyMapper.setFitView(iteam,true,[120,200,60,100])
        }else{
          iteam.setOptions({
             strokeColor: "#35A594",
             zIndex :10,
          })
        }
      })
    },
    toDetail1(name){
      this.polineGroups._overlays.forEach(iteam=>{
        if(iteam.getExtData().lineName==name){
           iteam.setOptions({
             strokeColor: "#A200FF",
             zIndex :18,
          })
          let num=Math.round((iteam.getPath().length)/2)
          
          this.setConten(iteam.getPath()[num],iteam.getExtData())
          this.MyMapper.setFitView(iteam,true,[120,200,60,100])

          this.objleft=iteam.getExtData()
        }else{
          // this.$message.error({
          //   message: '无此线路信息'
          // });
          iteam.setOptions({
             strokeColor: "#35A594",
             zIndex :10,
          })
        }
      })
    },
    toShow(row,n){
      row.isxz=!row.isxz
      // if(row.isxz){
        
      // }
      this.getData()
    },
    //绘制规划好的 陈龙的方案
    hzclfa(){

    },

    //绘制规划好的 陈龙的方案
    drawbusLine2(iteam,row){

         let busPolyline = new AMap.Polyline({
            // map: this.MyMapper,
            path: this.setData(iteam.geom),
            strokeColor: row.color,//线颜色
            strokeOpacity: 0.8,//线透明度
            isOutline:true,
            outlineColor:'white',
            extData:row,
            strokeWeight: 3//线宽
        });
        this.kyLineOver1.addOverlay(busPolyline)
        this.MyMapper.add(this.kyLineOver1);
        this.kyLineOver1.hide()

    },

    // 绘制线路的

        /*公交线路查询*/
    lineSearch(name,row,type) {
        //实例化公交线路查询类，只取回一条路线
        if(!this.linesearch){
            this.linesearch = new AMap.LineSearch({
                pageIndex: 1,
                city: '上海市',
                pageSize: 1,
                extensions: 'all'
            });
        }
        //搜索“536”相关公交线路
        this.linesearch.search(name, (status, result)=> {
            if (status === 'complete' && result.info === 'OK') {
                this.lineSearch_Callback(result,row,type);
            } else {
                alert(result);
            }
        });
    },
     lineSearch_Callback(data,row,type) {
        var lineArr = data.lineInfo;
        var lineNum = data.lineInfo.length;
        if (lineNum == 0) {
        } else {
            for (var i = 0; i < lineNum; i++) {
                var pathArr = lineArr[i].path;
                var stops = lineArr[i].via_stops;
                var startPot = stops[0].location;
                var endPot = stops[stops.length - 1].location;
                if (i == 0) //作为示例，只绘制一条线路
                if(type==2){
                  this.drawbusLine1(pathArr,2,row)
                }else{
                   this.drawbusLine(startPot, endPot, pathArr,stops,row,type);
                }
               
            
            }
        }
    },
    //绘制修改前的线路
    drawbusLine1(BusArr,type,row){

         let busPolyline = new AMap.Polyline({
            // map: this.MyMapper,
            path: BusArr,
            strokeColor: row.color,//线颜色
            strokeOpacity: 0.8,//线透明度
            isOutline:false,
            outlineColor:'white',
            extData:row,
            strokeWeight: 5//线宽
        });
        this.kyLineOver.addOverlay(busPolyline)
        this.MyMapper.add(this.kyLineOver);

    },
    //纠偏的方法
    drawbusLine4(pathParam){
      console.log(pathParam)
         this.graspRoad.driving(pathParam.genespath1,(error,result)=>{
          if(!error){
            var path2 = [];
            console.log(result)
            var newPath = result.data.points;
            for(var i =0;i<newPath.length;i+=1){
              path2.push([newPath[i].x,newPath[i].y])
            }
            var newLine = new AMap.Polyline({
              path:path2,
              strokeWeight:8,
              strokeOpacity:0.8,
              strokeColor:pathParam.color,
              extData:pathParam,
              showDir:true
            })
            // map.add(newLine)
            // map.setFitView()
            this.kyLineOver.addOverlay(newLine)
            this.MyMapper.add(this.kyLineOver);
          }
        })

    },
     //绘制修改后的线路 测试的直接连点
    drawbusLine3(row){
         let busPolyline = new AMap.Polyline({
            // map: this.MyMapper,
            path: row.genespath,
            strokeColor: row.color,//线颜色
            strokeOpacity: 0.8,//线透明度
            isOutline:false,
            outlineColor:'white',
            strokeStyle:'dashed',
            strokeWeight: 5,//线宽
            extData:row
        });


        this.kyLineOver.addOverlay(busPolyline)
        this.MyMapper.add(this.kyLineOver);



         busPolyline.on('click',(e)=>{
         
        
          $.each(this.updtaobj, (key, item) => {
            this.updtaobj[key] = row[key];
          });
           this.isupdate=true
        })
        // this.kyLineOver.addOverlay(busPolyline)
        // this.MyMapper.add(this.kyLineOver);

    },
    drawpoint(row){

      
         let marrk=new AMap.Marker({
            // map: this.MyMapper,
            position: [row.lng,row.lat], //基点位置
            icon: require("../../../assets/image/icon_gj1.png"),
            zIndex: 10,
            extData:row,
            anchor: 'bottom-center',
        });

        
        marrk.on('click',(e)=>{
         
        })

         marrk.setLabel({
            direction:'right',
            offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content: `<div class='info'>${row.name}(${row.pdb})</div>`, //设置文本标注内容
        });


        this.kyLineOver.addOverlay(marrk)
       

         this.MyMapper.add(this.kyLineOver);

    },
    drawbusLine(startPot, endPot, BusArr,stops,row,type) {
      console.log(stops)
      stops.forEach(iteam=>{
            let icon=''
            let colorfo=""
            let curmg=''
            if(iteam.name=='豫园'||iteam.name=='大世界'||iteam.name=="一大会址·黄陂南路"||iteam.name=="静安寺"||iteam.name=="武定路"||iteam.name=="武宁路"||iteam.name=="曹杨路"||iteam.name=="中宁路"||iteam.name=="真如"||iteam.name=="铜川路"||iteam.name=="真光路"||iteam.name=="真新新村"||iteam.name=="定边路"||iteam.name=="嘉怡路"||iteam.name=="临洮路"||iteam.name=="乐秀路"||iteam.name=="封浜"){
              icon=require("../../../assets/image/unable.png")
              colorfo='grey'
               curmg='not-allowed'
            }else if(type==4){
              icon=require("../../../assets/image/icon_gj1.png")
              colorfo='#ffffff'
              curmg='pointer'
            }else{
              icon=require("../../../assets/image/icon_dt.png")
              colorfo='#ffffff'
              curmg='pointer'
            }
           let marrk=new AMap.Marker({
            map: this.MyMapper,
            position: iteam.location, //基点位置
            icon: icon,
            zIndex: 10,
            cursor: curmg,
            anchor: 'bottom-center',
        });

        
        marrk.on('click',(e)=>{
          if(iteam.name=='豫园'||iteam.name=='大世界'||iteam.name=="一大会址·黄陂南路"||iteam.name=="静安寺"||iteam.name=="武定路"||iteam.name=="武宁路"||iteam.name=="曹杨路"||iteam.name=="中宁路"||iteam.name=="真如"||iteam.name=="铜川路"||iteam.name=="真光路"||iteam.name=="真新新村"||iteam.name=="定边路"||iteam.name=="嘉怡路"||iteam.name=="临洮路"||iteam.name=="乐秀路"||iteam.name=="封浜"){
            return 
          }else{
                this.searchbox.line=row.name
                this.searchbox.metroName=iteam.name
                this.poloading=true
                  setTimeout(()=>{
                    this.searchDaline()
                  },500)
          }
       
        })

         marrk.setLabel({
            direction:'right',
            offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content: `<div class='info' style='color:${colorfo}' >${iteam.name}</div>`, //设置文本标注内容
        });
      })
        // //绘制起点，终点
        // new AMap.Marker({
        //     map: this.MyMapper,
        //     position: startPot, //基点位置
        //     icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
        //     zIndex: 10,
        //     anchor: 'bottom-center',
        // });
        // new AMap.Marker({
        //     map: this.MyMapper,
        //     position: endPot, //基点位置
        //     icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
        //     zIndex: 10,
        //     anchor: 'bottom-center',
        // });
        //绘制乘车的路线
        this.busPolyline = new AMap.Polyline({
            map: this.MyMapper,
            path: BusArr,
            strokeColor: row.color,//线颜色
            strokeOpacity: 0.8,//线透明度
            isOutline:false,
            outlineColor:'white',
            strokeWeight: 6//线宽
        });


         this.MyMapper.setFitView(this.busPolyline, true, [60,200,60,60]);


      //   this.polyEditor = new AMap.PolylineEditor(this.MyMapper, this.busPolyline, {
      // });
      // this.polyEditor.setTarget(this.busPolyline);
      // this.polyEditor.open();
        // 将 busPolyline 显示在地图中心并自动缩放地图到合适级别。
        // true表示需要动画过程，[60,200,60,60]表示上下左右避让像素
        
      
    },

    M_closepoly() {
      this.polyEditor.close();
      return this.busPolyline.getPath()

      
    },
    svgg(){
        

      if(this.searchbox.line==''||this.searchbox.metroName==''){
        this.$message.error({
          message: '请先选择地铁站名称哦！'
        });
      }else{
        this.searchDaline()
      }
      

    },
    //输入框的数值发生改变的时候
    getChangeData(row){
      // if(row.isxz){
      //   this.getData()
      // }else{
      //   return
      // }
      
    },
  }
  
}
</script>
<style lang="scss">
 .el-radio__label{
      color:#ffffff!important;
  }

#operMap {

  .amap-marker-label{
    background-color:transparent!important;
    border:none!important;
  } 
 

  .info-win {
      padding-right: vw(20);
      // height: vw(110);
      position: relative;
      .win-triangle {
        position: absolute;
        top: 0;
        right: vw(16);
        width: vw(20);
        height: vw(20);
        transform: skewX(-45deg);
        background: rgba(1, 11, 66, 1);
        border: 1px solid rgba(45, 125, 241, 1);
      }
      .info-box {
        background: rgba(1, 11, 66, 1);
        border: 1px solid rgba(45, 125, 241, 1);
        border-radius: 4px;
        .info-content {
          position: relative;
          background: rgba(1, 11, 66, 1);
          border-radius: 4px;
          padding: vh(12) vw(16) vh(10) vw(10);
          color: #fff;
          // display: flex;
          .icon {
            width: vw(98);
            height: vw(88);
            background: #000;
            margin-right: vw(10);
            float: left;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            width: vw(180);
            min-height: vh(108);
            .info-name {
              font-size: vw(16);
              font-weight: bold;
              margin-bottom: vw(12);
            }
            .info-item {
              font-size: vw(14);
              line-height: vw(20);
              margin-top: vw(6);
              // overflow: hidden;
              // white-space: nowrap;
              // text-overflow: ellipsis;
            }
          }
        }
      }
  }
}


.operServices{
    .el-input__inner {
      background: rgba(26, 66, 118, 0.2) !important;
      color: #dae4ff !important;
      border: 1px solid #27B6FF !important; 
      // box-shadow: 0px 0px vh(6) rgba(39, 182, 255, 0.8) inset !important;
    //    border-left: none !important;
       padding-left:0!important;
    }
    .el-input-group__append, .el-input-group__prepend{
      border: 1px solid #27B6FF !important;
       background: rgba(26, 66, 118, 0.2) !important;
       color: #dae4ff !important;
       padding:0 vw(6) !important;
       border-right: none !important;
      
    }

}


</style>
<style lang="scss" scoped>
.operServices{
  width: 100%;
  height: 100%;
  background:#000000;
  position: relative;
  .leftlinemsg {
    position: absolute;
    top: vh(160);
    left: vw(12);
    // width: vw(300);
    background: rgba(26, 66, 118, 0.6);
    border: 1px solid #27b6ff;
    box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset;
     box-sizing:border-box;
            padding-bottom:vw(20);
    
     z-index: 10;
    .tit {
      width: 100%;
      height: vh(60);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(80);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-indent: vw(32);
      font-weight: bold;
    }
    .itmsg-box {
      box-sizing: border-box;
      padding: 0 vw(32);
      margin-top: vh(22);
      .itmsg {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        margin-bottom: vh(16);
        .itmsgs {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .tulibox1{
      position: absolute;
      bottom: vh(100);
      left: vw(12);
      background: rgba(26, 66, 118, 1);
      border: 1px solid #27b6ff;
      box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset;
      box-sizing:border-box;
      padding:vh(20) vw(20);
      z-index: 10;
     .iyline1{
       width:3vw;
       height:0.8vh;
       background:red;
       border-radius:0.2vw;
       margin-right:0.4vw
     }
  }
  .tulibox{
     position: absolute;
    bottom: vh(100);
    right: vw(12);
    background: rgba(26, 66, 118, 1);
    border: 1px solid #27b6ff;
    box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset;
     box-sizing:border-box;
    padding:vh(20) vw(20);
    
     z-index: 10;
     .iyline{
       width:3vw;
       height:0.8vh;
       background:red;
       border-radius:0.2vw;
       margin-right:0.4vw
     }
  }
  .rightlinemsg{
    position: absolute;
    top: vh(160);
    right: vw(12);
    background: rgba(26, 66, 118, 0.6);
    border: 1px solid #27b6ff;
    box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset;
     box-sizing:border-box;
            padding-bottom:vw(20);
    
     z-index: 10;
    .tit {
      width: 100%;
      height: vh(60);
      font-size: vw(17);
      color: #ffffff;
      line-height: vh(80);
      text-shadow: 0 0 1.2em rgba(255, 255, 255, 0.8),
        -0 -0 1.4em rgba(255, 255, 255, 0.7);
      text-indent: vw(32);
      font-weight: bold;
    }
    .itmsg-box {
      box-sizing: border-box;
      padding: 0 vw(32);
      margin-top: vh(22);
      .itmsg {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        margin-bottom: vh(16);
        .itmsgs {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .operMap{
    width:100%;
    height:100%;
  }
  
 
 
}
</style>
