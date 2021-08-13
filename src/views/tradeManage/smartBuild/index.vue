<template>
  <div class="smartBuild">
    <div class="left-box">
      <div class="bitit-box">
        <div class="bitit">
            <img  src="@/assets/image/home/4.1_icon_zzry.png" alt="" srcset="">
            <div>
                <div class="bigttn">13266</div>
                <div class="bigttn1">在职人数</div>
            </div>
        </div>
        <div class="bitit">
            <img  src="@/assets/image/home/4.1_icon_gjxl.png" alt="" srcset="">
            <div>
                <div class="bigttn">454</div>
                <div class="bigttn1">车辆总数</div>
            </div>
        </div>
        
      </div>
      <div class="titbox" style="margin-top:16px;margin-bottom:8px">站点信息</div>
      <div class="right-ech" >
            <div id="echbox1"></div>
            <div class="echleng">
              <div class="echleng1">
                <div style="display:flex;align-items: center;">
                  <div class="rounbox"></div>
                    已改造站点数：

                </div>
                <div style="color:#4578FF">205个</div>
              </div>
              <div class="echleng1">
                <div style="display:flex;align-items: center;">
                   <div class="rounbox rounbox1"></div>
                    已改造站点数：

                </div>
                <div style="color:#F5256A">32个</div>
              </div>
            </div>
      </div>
      <div class="titbox" style="margin-top:16px;margin-bottom:8px">设备信息</div>
      <div class="right-ech right-ech1" >
          <div id="echbox2"></div>
            <div class="echleng">
              <div class="echleng1">
                <div style="display:flex;align-items: center;">
                  <div class="rounbox"></div>
                    已改造站点数：

                </div>
                <div style="color:#4578FF">205个</div>
              </div>
              <div class="echleng1">
                <div style="display:flex;align-items: center;">
                   <div class="rounbox rounbox1"></div>
                    已改造站点数：

                </div>
                <div style="color:#F5256A">32个</div>
              </div>
            </div>
      </div>
    </div>
    <div class="center-box"></div>
    <div class="right-box"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      myChart1:null,
      myChart2:null
    }

  },
    created(){
        setTimeout(()=>{
        this.$store.commit('SET_LOADING',false)
        this.initechart1()
        this.initechart2()
        },200)
        
    },
    mounted(){

    },
    methods:{
      initechart1(){
          this.myChart1 = this.$echarts.init(document.getElementById('echbox1'));
          this.myChart1.setOption({
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                show:false,
                  // top: '5%',
                  // left: 'center'
              },
               title: [
                  {
                    text: 2356,
                    itemGap: 5,
                    left: 'center',
                    top: '36%',
                    textStyle: {
                      fontWeight: 'bold',
                      fontSize: 32,
                      textAlign: 'center',
                      color: '#00FFFF'
                    }
                  },
                {
                  text: '站点总数',
                  left: 'center',
                  top: '55%',
                  textStyle: {
                    fontSize: 14,
                    color: '#fff',
                    textAlign: 'center'
                    // align:'left'
                  }
                }
              ],
              series: [
                        {
                    name: ' ',
                    type: 'pie',
                    radius: ['70%', '95%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    startAngle: 225,
                    color: ['#0263FF', '#F5256A', 'transparent'],
                    hoverAnimation: false,
                    legendHoverLink: false,
                    label: {
                      normal: {
                        show: false,
                        position: 'center'
                      },
                      emphasis: {
                        show: false,
                        textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                        }
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [
                      {
                        value: 60,
                        name: '1'
                      },
                      {
                        value: 15,
                        name: '2'
                      },
                      {
                        value: 25,
                        name: '3'
                      }
                    ]
                  }
              ]
          });
      },
      initechart2(){
          this.myChart2 = this.$echarts.init(document.getElementById('echbox2'));
          this.myChart2.setOption({
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                show:false,
                  // top: '5%',
                  // left: 'center'
              },
               title: [
                  {
                    text: 2356,
                    itemGap: 5,
                    left: 'center',
                    top: '36%',
                    textStyle: {
                      fontWeight: 'bold',
                      fontSize: 32,
                      textAlign: 'center',
                      color: '#00FFFF'
                    }
                  },
                {
                  text: '站点总数',
                  left: 'center',
                  top: '55%',
                  textStyle: {
                    fontSize: 14,
                    color: '#fff',
                    textAlign: 'center'
                    // align:'left'
                  }
                }
              ],
              series: [
                  {value: 1048, name: '搜索引擎'},
                  {value: 735, name: '直接访问'},
              ]
          });
      },
    }

  
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.smartBuild{

  width:100%;
  height: 100%;
  background: url("~@/assets/image/zhbj.png");
  background-size: 100% 100%;
  display: flex;
  box-sizing: border-box;
  padding:vh(12) vw(16);
  .titbox{
    width:100%;
    height:vh(56);
    background: #0C2668;
    font-size: vw(20);
    font-weight: bold;
    line-height: vh(56);
    box-sizing: border-box;
    padding-left: vw(22);
    display:flex;
    flex-direction: column;
  }
  .left-box,.right-box{
     width:vw(396);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .bitit-box{
      display: flex;
      flex-wrap:wrap ;
      margin-top:vh(6);
      background: rgba(12, 38, 104,0.3);
      width:100%;
      height:vh(122);
      .bitit{
        width: vw(180);
        height: vh(90);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left:vw(12);
        margin-top:vh(12);
        box-sizing:border-box;
        padding:vh(12) vw(9);
        box-shadow: 0px 0px  vh(12) rgba(0, 255, 255, 0.5) inset;
        img{
          margin-right:vw(4);
        }
        .bigttn{
          font-size: vw(32);
          font-family: 'DINOT';
          font-weight: bold;
          color: #00FFFF;

        }
      }
    }

    .right-ech{
        width:vw(380);
        height:vh(294);
        box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 1) inset;
        #echbox1{
          width:100%;
          height:vh(235);
          box-sizing:border-box;
          padding-top:vh(18);
          
        }
         #echbox2{
          width:100%;
          height:vh(235);
          box-sizing:border-box;
          padding-top:vh(18);
          
        }
        .echleng{
          display:flex;
          flex-direction: column;
          align-items: center;
          margin-top:vh(-18);
          .echleng1{
            display:flex;
             justify-content:space-between;
             width:100%;
             box-sizing:border-box;
             padding:vh(0) vw(68);
             margin-top:vh(6);
            .rounbox{
              width:vw(10);
              height:vw(10);
              border-radius: 50%;
              background: #4578FF;
              margin-right:vw(6);
            }
            .rounbox1{
               background:#F5256A;
            }
          }
        }
    }
    .right-ech1{
        width:vw(380);
        height:vh(337);
        box-shadow: 0px 0px vh(8) rgba(69, 120, 255, 1) inset;

    }
  }
  .center-box{
     width:vw(1060);
    height: 100%;
    margin: 0 vw(14);
     box-sizing:border-box;
    padding:vh(6) vw(6);
    display: flex;
    flex-direction: column;
  }
 
}
</style>
