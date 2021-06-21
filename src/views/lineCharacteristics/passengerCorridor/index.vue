<template>
  <div class="passengerCorridor-box">

    <div class="leftlinemsg">
        <div class="tit-line">
            <div style="margin-right:0.2vw">途径公交线路</div>
            <div>站点</div>
        </div>
        <div class="zhandian-box">
            <div class="zhandian" v-for="(iteam,n) in slinedata" :key="n">
                <div class="zhnadiason" style="margin-right:0.2vw">{{iteam.name}}</div>
                <div class="zhnadiason zhnadiason1">
                    <div class='zhnadiasonla' @click="datastation(itam)" v-for="(itam,index) in (iteam.station)" :key="index">
                        {{itam.stationName}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="leftlinemsg leftlinemsg1">
        <div class="tit-line">
            <div style="margin-right:0.2vw">途径轨交线路</div>
            <div>站点</div>
        </div>
        <div class="zhandian-box">
            <div class="zhandian" v-for="(iteam,n) in mlinedata" :key="n">
                <div class="zhnadiason" style="margin-right:0.2vw">{{iteam.name}}</div>
                <div class="zhnadiason zhnadiason1">
                    <div class='zhnadiasonla' @click="datastation(itam)" v-for="(itam,index) in (iteam.station)" :key="index">
                        {{itam.stationName}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="lkicon">
        <div class="lkicon-box">
            <div class="lkicon-itam">
            <img style="margin-right:0.4vw" src="@/assets/image/icon_gj.png" />
            公交站点
            </div>
            <div class="lkicon-itam">
            <img style="margin-right:0.4vw" src="@/assets/image/icon_dt.png" />
            轨交站点
            </div>
        </div>
        </div>
    
    </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      lineData:[],
      mlinedata:{},
      slinedata:{},
    };
  },
  beforeCreate() {},
  created() {
    setTimeout(()=>{
      this.$store.commit('SET_LOADING',false)
    },1000)
    this.getkyzlData()
    

   

  },
  mounted() {
      
  },
  methods: {
      //站点显示信息窗口
     datastation(rows){
         this.$emit('changefun',{
          isinfobtn:rows
      })
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
    getkyzlData(){
        this.$fetchGet("indicator/corridor").then(res => {
            let mdata=[],sdata=[],allStation=[],allStation1=[]
            for(let key  in res.result.mmap){
                let obj={} 
                obj.name=key
                obj.station=(res.result.mmap[key])
                obj.station.forEach(element => {
                    element.lnglat=[element.lon,element.lat]
                    element.style=0
                    allStation.push(element)
                });
                mdata.push(obj)
            }
            for(let key  in res.result.smap){
                let obj={} 
                obj.name=key
                obj.station=(res.result.smap[key])
                 obj.station.forEach(element => {
                     element.style=1
                     element.lnglat=[element.longitude,element.latitude]
                    allStation1.push(element)
                });
                sdata.push(obj)
            }
            this.$store.commit('SET_KEYUNDATA', (allStation1.concat(allStation)))
            // this.$store.commit('SET_KEYUNDATA1', (allStation))
            // console.log(this.$store.getters.keyunData)
            this.setTwo(res.result.corridorList)
            this.mlinedata=mdata
            this.slinedata=sdata
        });
    },
    setTwo(data){
        let data2=[]
        data.forEach(iteam=>{
            iteam.lonlat1=this.setSz(iteam.lonlat.replace(/[\r\n]/g,"").split(' '))
            data2.push(iteam)
        })
        this.$store.commit('SET_KEYUNDATA2',data2)
    },
    setSz(baseArray){
        let len = baseArray.length;
        let n = 1; //假设每行显示4个
        let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
        let res = [];
        for (let i = 0; i < lineNum; i++) {
            // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
            let temp = baseArray.slice(i*n, i*n+n);
            let art=[]
            temp[0].split(',').forEach(iru=>{
                art.push(parseFloat(iru))
            })
            res.push(art);
        }
        
        return res

    },
    //
    removal(arr){
        var arr2 = arr.filter((x, index,self)=>{
            var arrids = []
            arr.forEach((item,i) => {
                arrids.push(item.stationName)
            })
            return arrids.indexOf(x.stationName) === index
        })  

        return arr2


    }

  }
};
</script>
<style lang="scss">
</style>

<style lang="scss" scoped>
.passengerCorridor-box {
  box-sizing: border-box;
  margin-top: vw(70);
  position: relative;
  z-index: 10;
  .lkicon {
    position: absolute;
    top: vh(65);
    right: vw(12);
    width: vw(260);
    height: vh(55);
    background: rgba(26, 66, 118, 0.2);
    border: 1px solid #27b6ff;
    box-shadow: 0px 0px vh(10) rgba(69, 120, 255, 1) inset;
    opacity: 0.8;
    border-radius: 2px;
    box-sizing: border-box;
    padding: vh(8) vw(20);
    .lkicon-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .lkicon-itam {
        display: flex;
        align-items: center;
        margin-top:vh(2);
      }
    }
  }
  .leftlinemsg {
    position: absolute;
    top: vh(74);
    left: vw(20);
    width: vw(370);
    height: vh(292);
    background: url("~@/assets/image/bjk.png");
    background-size: 100% 100%;
    box-sizing:border-box;
    padding:vh(30) vw(33);
    display:flex;
    flex-direction:column;
    overflow:hidden;
    .tit-line{
        width:100%;
        height:vh(36);
        display:flex;
        div{
            flex:1;
            color:#ffffff;
            font-weight: bold;
            text-align:center;
            line-height:vh(36);
            background: rgba(127, 175, 191, 0.5);
            border-radius: 0px 2px 2px 0px;
        }
    }
    .zhandian-box{
        flex:1;
         overflow:hidden;
         overflow-y:scroll;
    }
    .zhandian{
        
        display:flex;
       
        .zhnadiason{
            flex:1;
            text-align:center;
            line-height:vh(36);
            background: rgba(127, 175, 191, 0.15);
            border-radius: 0px 2px 2px 0px;
            margin-top:vh(6);
            display:flex;
            justify-content:center;;
            align-items: center;
            .zhnadiasonla{
                width:100%;
                height:100%;
                margin-bottom:vh(2);
                cursor:pointer;
            }
            .zhnadiasonla:hover{
                color:#00FFFF;
                background: rgba(127, 175, 191, 0);
            }
            .zhnadiasonla:nth-child(odd){
                background: rgba(127, 175, 191, 0.15);
            }
        }
        .zhnadiason1{
            display:flex;
            flex-direction:column;
            justify-content:center;;
            align-items: center;
            background:rgba(127, 175, 191, 0);
        }

    }
  }
  .leftlinemsg1 {
    position: absolute;
    top: vh(390);
    left: vw(20);
    width: vw(370);
    height: vh(219);
    
  }
}
</style>
