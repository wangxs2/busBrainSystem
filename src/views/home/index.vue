<template>
 <div class="bigHome">


    <!-- <canvas id="the-canvas" ></canvas> -->
    <div class="homePage" id="box">
      
      <div class="userName">
        <img src="@/assets/image/home/lurl.png" alt="" srcset="">
        <div style="margin-right:2vw" @click="toXinpage()"> 定时任务管理  </div>
        <img src="@/assets/image/home/settig.png" alt="" srcset="">
        <div @click="toHome(10,'MAIN')">权限设置</div>
        <div class="lineName"></div>
        <img src="@/assets/image/home/icon_yh.png" alt="" srcset="">
        admin
        <div class="lineName"></div>
        <img  src="@/assets/image/home/icon_quit.png" alt="" srcset="">
        <div @click="loginout">退出</div>
      </div>
      <!-- <div class="lightLine">
        <div class="lightson"></div>
      </div>
      <div class="lightLine lightLine1"></div>
      <div class="lightLine lightLine2">
        <div class="lightson"></div>
      </div>
      <div class="lightLine lightLine3">
        <div class="lightson"></div>
      </div>
      <div class="lightLine lightLine4">
        <div class="lightson"></div>
      </div>
      <div class="lightLine lightLine5"></div>
      <div class="lightLine lightLine6">
        <div class="lightson"></div>
      </div>
      <div class="lightLine lightLine7"></div>
      <div class="lightLine lightLine8">
        <div class="lightson"></div>
      </div>
      <div class="lightLine lightLine9">
        <div class="lightson"></div>
      </div>
      <div class="lightLine lightLine10"></div>
      <div class="lightLine lightLine11">
        <div class="lightson"></div>
      </div> -->
      <div class="left-home">
        <div class="left-l23 left-l1" @click="toHome(1,'LINE_DECIDE')">
          公交线网辅助决策系统 
        </div>
        <div class="left-l23 left-l2" @click="toHome(2,'OBSERVATION')">
          公交大数据观测系统
        </div>
        <div class="left-l23 left-l3" @click="toHome(3,'OBSERVATION')">
          公交行业数据管理子系统
        </div>
      </div>
      <div class="center-home">
        <div class="center-box">
        </div>
        <div class="center-box1">
        </div>
        <div class="guang"></div>
        <div class="guang1"></div>
        <div class="guang2"></div>
        <img class="dipan " src="@/assets/image/home/baseQ.png" alt="" srcset="">
        <img class="gongjc" src="@/assets/image/home/busQ.png" alt="" srcset="">
        <img class="sdipan" src="@/assets/image/home/topQ.png" alt="" srcset="">
        <img class="cloud" src="@/assets/image/home/cloudQ.png" alt="" srcset="">
        <!-- <img class="wordc" src="@/assets/image/home/word100%.png" alt="" srcset=""> -->
        
      </div>
      <div class="right-home">
        <div class="left-l23 left-l4" @click="toHome(4,'MODEL')">运力计算模型
        </div>
        <div class="left-l23 left-l5" @click="toHome(5,'BASIC')">
          <!-- 公交测试系统 -->
          基础设施实施布局系统
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCookie
} from '@/libs/util'
export default {
  props: {
  },
   mounted() {
    //  this.$store.commit("SET_CODEMEAU", '')
    //  document.cookie = "meaucode=" + '';
    //  console.log('在首页',this.$store.getters.codeMeau)
    // this.initpoint()
   },
  methods:{
    loginout(){
      this.$router.push("/login");
    },
    toXinpage(){
       window.open(
        `/busbrain/main.shtml#task/index.shtml`
      );

    },
    initpoint(){
         var canvas = document.getElementById('the-canvas'),
            ctx = canvas.getContext('2d'),
            w = canvas.width = window.innerWidth,
            h = canvas.height = window.innerHeight,
            hue = 217,
            stars = [],
            count = 0,
            maxStars = 1400;
    
        // Cache gradient
        console.log(canvas)
        var canvas2 = document.createElement('canvas'),
    
            ctx2 = canvas2.getContext('2d');
    
        canvas2.width = 100;
    
        canvas2.height = 100;
    
        var half = canvas2.width / 2,
    
            gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    
        gradient2.addColorStop(0.025, '#fff');
    
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    
        gradient2.addColorStop(1, 'transparent');
    
        ctx2.fillStyle = gradient2;
    
        ctx2.beginPath();
    
        ctx2.arc(half, half, half, 0, Math.PI * 2);
    
        ctx2.fill();
    
        // End cache
    
        function random(min, max) {
            if (arguments.length < 2) {
                max = min;
    
                min = 0;
    
            }
    
            if (min > max) {
                var hold = max;
    
                max = min;
    
                min = hold;
    
            }
    
            return Math.floor(Math.random() * (max - min + 1)) + min;
    
        }
    
        var Star = function () {
            this.orbitRadius = random(w / 2 - 50);
    
            this.radius = random(100, this.orbitRadius) / 10;
    
            this.orbitX = w / 2;
    
            this.orbitY = h / 2;
    
            this.timePassed = random(0, maxStars);
    
            this.speed = random(this.orbitRadius) / 100000;
    
            this.alpha = random(2, 10) / 10;
    
            count++;
    
            stars[count] = this;
    
        }
    
        Star.prototype.draw = function () {
            var x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
    
                y = Math.cos(this.timePassed) * this.orbitRadius / 2 + this.orbitY,
    
                twinkle = random(10);
    
            if (twinkle === 1 && this.alpha > 0) {
                this.alpha -= 0.05;
    
            } else if (twinkle === 2 && this.alpha < 1) {
                this.alpha += 0.05;
    
            }
    
            ctx.globalAlpha = this.alpha;
    
            ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    
            this.timePassed += this.speed;
    
        }
    
        for (var i = 0; i < maxStars; i++) {
            new Star();
    
        }
    
        function animation() {
            ctx.globalCompositeOperation = 'source-over';
    
            ctx.globalAlpha = 0.8;
    
            ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
    
            ctx.fillRect(0, 0, w, h)
    
            ctx.globalCompositeOperation = 'lighter';
    
            for (var i = 1, l = stars.length; i < l; i++) {
                stars[i].draw();
    
            };
    
            window.requestAnimationFrame(animation);
        }
        animation();

    },
    toHome(name,code){
      let test = window.location.href
      this.$store.commit("SET_CODEMEAU", code);
      // console.log(this.$store.getters.codeMeau)
      document.cookie = "meaucode=" + code;
      setTimeout(()=>{
        if(name==1){
        this.$router.push("/lineCharacteristics/roadDistribution");
        }else if(name==2){
          this.$router.push("/realNetwork");
        }else if(name==10){
          this.$router.push("/system/users");
        }else if(name==3){
          // window.open(`http://10.1.30.204:50009/metabase.html?key${getCookie('metabase.SESSION')}`)
            if(test.indexOf("10.1.30.204") != -1){
              window.open(`http://10.1.30.204:5009/metabase.html?key${getCookie('metabase.SESSION')}`)
            }else{
              window.open(`http://180.167.126.126:3002/metabase.html?key${getCookie('metabase.SESSION')}`)
            }
            // 180.167.126.126：3006
        }else if(name==4){
          this.$router.push("/busModel");
        }else if(name==5){
          this.$router.push("/infrastructure");
        }
      },500)
      
      
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .bluepoint{
      position: absolute;
      background: url('./blue.png') center center/cover;
      -webkit-animation:snowqwe 20s infinite linear;
      z-index:1;
    }
    @-webkit-keyframes snowqwe{
      to{
        transform:translate(100px,300px) rotate(360deg) ;
      }
    }
</style>
<style scoped lang="scss">
.bigHome{
 width: 100%;
height: 100%;
  position: relative;
}
#the-canvas{
  position: absolute;
      left: vw(0);
      top: vw(0);
      width: 100%;
      height: 100%;
      z-index: 1;
}
.homePage{
    width:100%;
    height:100%;
    background: url("~@/assets/image/home/bj.png");
    opacity:1;
    background-size: 100% 100%;
    box-sizing:border-box;
    padding:0 vw(60);
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #DBE7FF;
    font-family: Microsoft YaHei;
    position: relative;
    z-index: 8;
    .lightLine{
      position: absolute;
      right: vw(100);
      bottom: vw(0);
      width: vw(2);
      height:vh(60);
      background-image: linear-gradient(to top left,rgba(69 ,120, 255,0) , rgba(69 ,120 ,255,0.9));
      animation: lightan 1.3s linear infinite;
      .lightson{
        width: vw(2);
        height: vw(2);
        border-radius: 50%;
        position: absolute;
        top: vw(-8);
        left: vw(0);
        background: rgba(0, 255, 255,1)
      }
    }
    // .lightLine1{
    //   right: vw(120);
    //   animation: lightan1 1.7s linear infinite;
    // }
    // .lightLine2{
    //   right: vw(150);
    //   animation: lightan1 1.9s linear infinite;
    // }
    // .lightLine3{
    //   right: vw(160);
    //   animation: lightan 1.2s linear infinite;
    // }
    // .lightLine4{
    //   right: vw(840);
    //   animation: lightan1 1.2s linear infinite;
    // }
    // .lightLine5{
    //   right: vw(900);
    //   animation: lightan1 1.4s linear infinite;
    // }
    // .lightLine6{
    //   right: vw(980);
    //   animation: lightan1 1.6s linear infinite;
    // }
    //  .lightLine7{
    //   right: vw(1100);
    //   animation: lightan1 1.8s linear infinite;
    // }
    //  .lightLine8{
    //   left: vw(100);
    //   animation: lightan1 1.1s linear infinite;
    // }
    //  .lightLine9{
    //   left: vw(140);
    //   animation: lightan1 1.4s linear infinite;
    // }
    //  .lightLine10{
    //   left: vw(180);
    //   animation: lightan1 1.6s linear infinite;
    // }
    //  .lightLine11{
    //   left: vw(220);
    //   animation: lightan1 1s linear infinite;
    // }
    // @-webkit-keyframes lightan{
    //   from {
    //     opacity: 0.5;
    //     bottom: vw(0);
    //     }
    //   to {
    //     opacity: 1;
    //     bottom: vw(640);
    //     }

    // }
    // @-webkit-keyframes lightan1{
    //   0% {
    //     opacity: 0.5;
    //     bottom: vw(0);
    //     }
    //   100% {
    //     opacity: 1;
    //     bottom: vw(640);
    //     }

    // }
    
    .userName{
      position: absolute;
      right: vw(30);
      top: vw(20);
      font-size: 16px;
      color: #27B6FF;
      display: flex;
      align-items: center;
      cursor: pointer;
      a{
        color: #27B6FF;
        margin-right:vw(20);
      }
      .lineName{
        width: 2px;
        height: 20px;
        background: rgba(39, 182, 255, 0.4);
        opacity: 0.3;
        margin:  0 vw(18);
      }
      img{
        margin-right: vw(10);
      }
     
    }
    .left-l23:hover{
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #00FFFF;
        background: linear-gradient(-90deg, #00FFD2 0%, rgba(39, 182, 255, 0.03) 100%);
      }
    .left-home{
      text-align:center;
      z-index:10;
      .left-l1{
        width:vw(648);
        height:vw(140);
        line-height:vw(140);
        background: url("~@/assets/image/home/1.png");
        background-size: 100% 100%;
        cursor:pointer;
      }
      .left-l1:hover{
        animation: lightleft 10s linear infinite;
      }
       @-webkit-keyframes lightleft{
        0% {
          opacity: 0.5;
          transform: scale(0.6,1);
           transform:translateX(-60px);
          background: url("~@/assets/image/home/1.png");
          background-size: 100% 100%;
          }
          5% {
           opacity: 1;
           transform: scale(1,1);
            transform:translateY(0px);
           background: url("~@/assets/image/home/1_pressed.png");
           background-size: 100% 100%;
          }
          100%{
            opacity: 1;
           transform: scale(1,1);
           background: url("~@/assets/image/home/1_pressed.png");
           background-size: 100% 100%;
          }

      }
      .left-l2{
        width:vw(564);
        height:vw(140);
        line-height:vw(140);
        background: url("~@/assets/image/home/2.png");
        background-size: 100% 100%;
        margin-top:vh(20);
        cursor:pointer;
 
      }

      .left-l2:hover{
        background: url("~@/assets/image/home/2_pressed.png");
        background-size: 100% 100%;
      }
      .left-l3{
        width:vw(646);
        height:vh(140);
        line-height:vw(140);
        background: url("~@/assets/image/home/3.png");
        background-size: 100% 100%;
        margin-top:vh(20);
        cursor:pointer;
      }
      .left-l3:hover{
        background: url("~@/assets/image/home/3_pressed.png");
        background-size: 100% 100%;
      }
    }
    .center-home{
      position: relative;
      width:vw(650);
      height:vw(649);
      .center-box{
        width:vw(649);
        height:vw(649);
        border: 3px dashed #4578FF;
        border-radius:50%;
        display:flex;
        justify-content: center;
        align-items: center;
        -webkit-transform: rotate(360deg);
        animation: rotation 120s linear infinite;
        -moz-animation: rotation 120s linear infinite;
        -webkit-animation: rotation 120s linear infinite;
        -o-animation: rotation 120s linear infinite;
        position: absolute;
        left: vw(-75);
        top: 0;
      }
      .center-box1{
           width:vw(612);
            height:vw(612);
            background: url("~@/assets/image/home/center_bj.png");
            background-size: 100% 100%;
            border-radius:50%;
            position: absolute;
            left: vw(-52);
            top: vw(21);
            // transform：none;
            -webkit-transform: rotate(360deg);
            animation: rotation1 150s linear infinite;
            -moz-animation: rotation1 150s linear infinite;
            -webkit-animation: rotation1 150s linear infinite;
            -o-animation: rotation1 150s linear infinite;
            
      }
      .dipan{
        width: vw(242);
        height: vw(174);
        position: absolute;
        bottom: vw(98);
        left: vw(140);
        opacity: 1;
        // animation: dipanan 6s linear infinite;
      }
      @-webkit-keyframes dipanan{
          0% {
            opacity: 0;
            bottom: vw(0);
          }
          10%{
            opacity: 1;
            bottom: vw(98);
          }
          100% {
              opacity: 1;
              bottom: vw(98);
          }

        }
      .gongjc{
        position: absolute;
        bottom: vw(158);
        left: vw(180);
        animation: gongjcan 6s linear infinite;
        opacity: 0;
      }
      @-webkit-keyframes gongjcan{
           0% {
             opacity:0;
            transform: translatex(0) ;
          }
          12% {
            opacity:0;
            transform:translatex(50px) translateY(-10px);
          }
          20% {
            opacity:1;
            transform: translatex(0px) translateY(0px);
          }
          100% {
            opacity:1;
            transform: translatex(0) ;
          }

      }
      .sdipan{
        position: absolute;
        top: vw(158);
        left: vw(130);
        opacity: 0;
        animation: sdipanan 6s linear infinite;
      }
      @-webkit-keyframes sdipanan{
          0% {
             opacity:0;
          }
          20%{
            opacity:0;
            top: vw(168);
          }
          40%{
            opacity:1;
            top: vw(148);
          }
          60%{
            opacity:1;
            top: vw(158);
          }
          80%{
            opacity:1;
            top: vw(168);
          }
          100% {
            opacity:1;
          }

      }
      .cloud{
        position: absolute;
        top: vw(110);
        left: vw(198);
         opacity:0;
        animation: cloudan 6s linear infinite;
      }
       @-webkit-keyframes cloudan{
          0% {
             opacity:0;
          }
          30%{
            opacity:0;
            top: vw(100);
          }
          40%{
            opacity:1;
            top: vw(120);
          }
          60%{
            opacity:1;
            top: vw(110);
          }
          80%{
            opacity:1;
            top: vw(120);
          }
          100% {
            opacity:1;
            top:vw(110);
          }

      }
      .wordc{
        position: absolute;
        top: vw(140);
        left: vw(206);
        animation: wordcan 6s linear infinite;
          opacity:0;
      }
       @-webkit-keyframes wordcan{
          0% {
             opacity:0;
          }
          30%{
            opacity:0;
            top: vw(100);
          }
          40%{
            opacity:1;
          }
          100% {
            opacity:1;
          }

      }
      .guang{
        width: vw(178);
        height: vw(158);
        background: linear-gradient(0deg, rgba(69, 120, 255, 0.4) 0%, rgba(69, 120, 255, 0) 100%);
        position: absolute;
        top: vw(66);
        left: vw(160);
        opacity: 0;
        animation: guangan2 6s linear infinite;
      }

      @-webkit-keyframes guangan2{
        0%{
           opacity: 0;
          top: vw(100);
        }
        30%{
           opacity: 0;
          top: vw(100);
        }
        40%{
          opacity: 1;
          top: vw(66);
        }
        // 90%{
        //   opacity: 1;
        //   top: vw(66);
        // }
        // 91%{
        //   opacity: 0;
        //   top: vw(66);
        // }
        100%{
          opacity: 1;
          top: vw(66);
        }

      }
      
      
      .guang1{
        width: 168px;
        height: 0;
        background: linear-gradient(180deg, rgba(69, 120, 255, 0.5) 0%, rgba(69, 120, 255, 0) 100%);
        position: absolute;
        top: vw(210);
        left: vw(170);
        opacity: 0;
        animation: guangan1 6s linear infinite;
      }
      @-webkit-keyframes guangan1{
        0%{
           opacity: 0;
           height: vw(0);
        }
        20%{
           opacity: 0;
          height: vw(0);
        }
        40%{
           opacity: 1;
          height: vw(158);
        }
        100%{
          opacity: 1;
          height: vw(158);
        }

      }
      .guang2{
        width: 240px;
        height: vw(0);
        background: linear-gradient(180deg, rgba(69, 120, 255, 0.4) 0%, rgba(69, 120, 255, 0) 100%);
         position: absolute;
        top: vw(240);
        left: vw(130);
        animation: guangan 6s linear infinite;
        opacity: 0;
      }
      @-webkit-keyframes guangan{
        0%{
           opacity: 0;
          height: vw(0);
        }
        18%{
           opacity: 0;
          height: vw(0);
        }
        30%{
           opacity: 1;
          height: vw(181);
        }
        100%{
          opacity: 1;
          height: vw(181);
        }

      }
      @-webkit-keyframes rotation1{
          0%{
            -webkit-transform: rotate(360deg)
          }
          // 20%{
          //   -webkit-transform: rotate(0deg)
          // }
          100%{
            -webkit-transform: rotate(0deg)
          }
        }
      @-webkit-keyframes rotation{
      from {-webkit-transform: rotate(0deg);}
      to {-webkit-transform: rotate(360deg);}
      }
    }
    .right-home{
      text-align:center;
      .left-l4{
        width:vw(652);
        height:vw(220);
        line-height:vw(220);
        background: url("~@/assets/image/home/4.png");
        background-size: 100% 100%;
        cursor:pointer;
        
      }
      .left-l4:hover{
        background: url("~@/assets/image/home/4_pressed.png");
      }
      .left-l5{
        width:vw(652);
        height:vw(222);
        line-height:vw(222);
        background: url("~@/assets/image/home/5.png");
        background-size: 100% 100%;
        margin-top:vh(20);
        cursor:pointer;
      }
      .left-l5:hover{
        background: url("~@/assets/image/home/5_pressed.png");
      }
    }



  
}

</style>
