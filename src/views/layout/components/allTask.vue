<template>
  <div class="system-notification">
    <div class="system-notification-header">
      <div class="tab-list">
        <div
          :class="[curPageIndex==index?'tab-item tab-item-active':'tab-item']"
          @click="tabActive(index)"
          v-for="(item,index) in tabList"
          :key="index"
        >
          <img :src="item.imgUrl" alt />
          <span>{{item.name}}</span>
        </div>
        <div
          class="tab-line"
          :style="{transform: `translateX(${curPageIndex*90}px)`,background:tabList[curPageIndex].color}"
        >
          <div class="arrow" :style="{ 'border-bottom-color':tabList[curPageIndex].color}"></div>
        </div>
      </div>
    </div>
    <div class="system-notification-content">
      <!-- 全部 -->
      <all-com v-show="curPageIndex!==3" :curPageIndex="curPageIndex" @setbigmodel="setbigmodel"></all-com>
      <!-- 待办事项 -->
      <!-- <todo-list v-if="curPageIndex==1"></todo-list> -->
      <!-- 任务提醒 -->
      <!-- <task-reminder v-if="curPageIndex==2"></task-reminder> -->
      <!-- 项目问询 -->
      <project-inquiry v-if="curPageIndex==3"></project-inquiry>
      <!-- 系统通知 -->
      <!-- <system-notification v-if="curPageIndex==4"></system-notification> -->
    </div>
  </div>
</template>

<script>
import allCom from "./components/allCom"
// import todoList from "./components/todoList"
// import taskReminder from "./components/taskReminder"
import projectInquiry from "./components/projectInquiry"
// import systemNotification from "./components/systemNotification"
export default {
  data () {
    return {
      tabList: [
        {
          name: '全部',
          id: 1,
          imgUrl: require("../../../assets/image/message_1@3x.png"),
          color: 'rgb(73,155,252)'
        },
        {
          name: '代办事项',
          id: 2,
          imgUrl: require("../../../assets/image/message_2@3x.png"),
          color: 'rgb(93,202,113)'
        },
        {
          name: '任务提醒',
          id: 3,
          imgUrl: require("../../../assets/image/message_3@3x.png"),
          color: 'rgb(255,128,128)'
        },
        {
          name: '项目闻询',
          id: 4,
          imgUrl: require("../../../assets/image/message_4@3x.png"),
          color: 'rgb(255,172,12)'
        },
        {
          name: '系统通知',
          id: 5,
          imgUrl: require("../../../assets/image/message_5@3x.png"),
          color: 'rgb(137,184,255)'
        },
      ],
      curPageIndex: 0,
      routeQueryInfo: {},// query路由传参
      bigModel: null
    }
  },
  components: {
    allCom,
    // todoList,
    // taskReminder,
    projectInquiry,
    // systemNotification
  },
  props: ["curCheckIndex"],
  mounted () {
  },
  watch: {
    'curCheckIndex': function (val, oldVal) {
      this.curPageIndex = val
    },
  },
  methods: {
    tabActive (index) {
      this.curPageIndex = index
    },
    setbigmodel (val) {
      this.bigModel = val
      this.$emit('setbigmodelalltask', this.bigModel)
    },
  }
};
</script>
<style lang="scss">
</style>

<style lang="scss" scoped>
.system-notification {
  background: rgba(243, 244, 249, 1);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  box-sizing: border-box;
  .system-notification-header {
    display: flex;
    justify-content: space-between;
    .tab-list {
      display: flex;
      justify-content: flex-start;
      position: relative;
      padding-bottom: 22px;
      .tab-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 17px;
        min-width: 56px;
        text-align: center;
        padding-top: 26px;
        cursor: pointer;
        img {
          width: 50px;
          height: 50px;
        }
        span {
          margin-top: 11px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(43, 49, 90, 1);
        }
        &.tab-item-active {
          padding-top: 21px;
          img {
            // box-shadow: 0px 6px 12px 0px rgba(43, 49, 90, 0.16);
            transform: translateY(-5px);
          }
          span {
            margin-top: 16px;
          }
        }
      }
      .tab-line {
        position: absolute;
        top: 124px;
        left: 0;
        width: 90px;
        background: red;
        height: 4px;
        .arrow {
          position: absolute;
          top: -16px;
          left: 37px;
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-bottom-color: orange; //左箭头
        }
      }
    }
    .btn-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .btn {
        width: 90px;
        height: 36px;
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        line-height: 36px;
        text-align: center;
        border-radius: 4px;
        margin-left: 16px;
        cursor: pointer;
      }
      .btn-gray {
        background: rgba(140, 150, 168, 0.9);
      }
      .btn-red {
        background: rgba(255, 104, 104, 1);
      }
    }
  }
  .system-notification-content {
    flex: 1;
  }
}
</style>
