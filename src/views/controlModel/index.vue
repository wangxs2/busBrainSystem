<template>
  <div class="controlModel">
    <!-- <div v-for="(item,n) in docmet.pages" :key="n">
      <div :class="item.code" :style="{left:item.left,top:item.top}">
        <div v-if="item.code=='swioer'" v-for="(iteam,n) in swipdata" :key="n+'p'" class="swiper-box">
          <div class="title">{{iteam.roadName}}</div>
          <div class="titlew">{{iteam.id}}</div>
        </div>
        <div v-if="item.code=='img-box'">
          <img src="~@/assets/image/tk_bj.png"/>
        </div>
      </div>
    </div> -->
 
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return{
      docmet:{
        id:1,
        pages:[
          {
            code:"swioer",
            left:'200px',
            top:"100px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            add:'http://192.168.1.185:8086/busbrain/main-road/list',
            sdata:[],
            children:[
              {
                code:'txt'
              }
            ]

          },
           {
            code:"img-box",
            left:'500px',
            top:"200px",
            backgroundColor: "rgba(0, 0, 0,1)",
            add:'http://192.168.1.185:8086/busbrain/main-road/list',

          }
        ]
      },
      swipdata:[]
    }

  },
   created() {
      this.$store.commit('SET_LOADING',false)
      this.getData()
  },
  methods:{

    getData(){
       this.$fetchGet(this.docmet.pages[0].add,{
           
          }).then(res => {
           this.swipdata=res.result
          })
    }

  }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.controlModel{
  width:100%;
  height:100%;
  padding-top:vh(140);
  position:relative;

  .swioer{
    position:absolute;
    width:100px;
    height:200px;
  border:1px solid red;
    overflow:hidden;
  overflow-y:scroll;
}
.swiper-box{

}
.img-box{
  position:absolute;
  width:500px;
    height:200px;
  border:1px solid blue;
}

}


</style>
