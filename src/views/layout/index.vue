<template>
  <div class="layout">
    <div class="leftMenu">
      <div class="tit">
        <div class="pitctur-sa" v-if="!menuFlag">“接口测试”管理平台项目</div>
        <div class="home-logo" v-else></div>
      </div>
      <div style="flex:1;overflow:hidden">
        <menu-nav @mainmodelshow="mainmodelshow"></menu-nav>
      </div>
    </div>
    <div class="rightContent">
      <div class="header-tit">
        <div class="left-tit">
          <div class="leftBtn" @click="isShow">
            <el-tooltip effect="dark" content="折叠菜单" placement="bottom">
              <img v-if="!menuFlag" src="../../assets/image/list_open@3x.png" />
              <img v-if="menuFlag" src="../../assets/image/list_stow@3x.png" />
            </el-tooltip>
          </div>
          <!-- <el-breadcrumb separator="/">
            <template v-for="(item,index) in getRouterName">
              <el-breadcrumb-item :key="index">
                <span
                  style="color:#BFC1CD;padding-left:18px;cursor:pointer"
                  @click="toNext(item)"
                >{{ item.name }}</span>
              </el-breadcrumb-item>
            </template>
          </el-breadcrumb> -->
        </div>
        <div class="right-tit">
          <top-tag @toptagsidevalue="toptagsidevalue" @toptagtablelist="toptagtablelist"></top-tag>
        </div>
      </div>
      <div class="main-content">
        <app-main></app-main>
       
      </div>
    </div>

   
  </div>
</template>

<script>
import { isYestday, isYear, timeChange } from '../../libs/util'
import { mapGetters } from "vuex";
import menuNav from "./components/menu";
import topTag from "./components/topTag";
import appMain from "./components/appMain";
import allTask from "./components/allTask";
export default {
  components: {
    menuNav,
    topTag,
    appMain,
    allTask
  },
  computed: {
    ...mapGetters(["menuFlag", "goBackBtn"]),
    getRouterName: function () {
      return this.$route.matched.slice(1);
    }
  },
  data () {
    return {
      ops: {
        //滚动条配置项
        vuescroll: {
          mode: "native"
        },
        bar: {
          vBar: {
            background: "#909399",
            opacity: 0.8
          }
        }
      },
      smallModel: null,
      tabList: [
        {
          name: '全部',
          id: 1,
          imgUrl: require("../../assets/image/message_1@3x.png"),
          color: 'rgb(73,155,252)',
          hasUnread: false
        },
        {
          name: '代办事项',
          id: 2,
          imgUrl: require("../../assets/image/message_2@3x.png"),
          color: 'rgb(93,202,113)',
          hasUnread: false
        },
        {
          name: '任务提醒',
          id: 3,
          imgUrl: require("../../assets/image/message_3@3x.png"),
          color: 'rgb(255,128,128)',
          hasUnread: false
        },
        {
          name: '项目闻询',
          id: 4,
          imgUrl: require("../../assets/image/message_4@3x.png"),
          color: 'rgb(255,172,12)',
          hasUnread: false
        },
        {
          name: '系统通知',
          id: 5,
          imgUrl: require("../../assets/image/message_5@3x.png"),
          color: 'rgb(137,184,255)',
          hasUnread: false
        },
      ],
      curIndex: 0,
      bigModel: false,
      infoDialogVisible: false,
      curDetailInfo: {},
      tableList: [],
      curCheckIndex: 0,
      userList: [],
      projectList: [],

    };
  },
  created () {
    // this.getPeopleList()
    // this.getProjectList()
  },
  watch: {
    'tableList': function (val) {
      this.funRealname(val)
      this.isHasread(val)
    }
  },
  methods: {
    setbigmodelalltask (val) {
      this.bigModel = val
    },
    // 任务提醒进入项目主页
    goProjectList () {
      if (this.$route.path != '/projectList') {
        this.$router.push({
          path: "/projectList",
        })
      }
      this.$store.commit('SET_CONSTRUCTIONCODE', this.curDetailInfo.constructionCode)
      this.infoDialogVisible = false
      this.smallModel = false
    },
    // 获取项目列表
    getProjectList () {
      this.$fetchGet("traffic-investment/construction/list").then(res => {
        this.projectList = res.result.records
      })
    },
    mainmodelshow (val) {
      this.bigModel = val
    },
    historyInfo () {
      this.smallModel = false
      this.bigModel = true
      this.curCheckIndex = this.curIndex
    },
    checkListItem (item, index) {
      if (!item.topicId) {
        this.getCheckListItemDetail(item.id, index)
      } else {
        this.getCheckAskItemDetail(item.id, index)
      }
    },
    // 获取用户列表
    getPeopleList () {
      this.$fetchGet('traffic-investment/sys/user/listByRoleId', { realname: '', roleId: '' }).then(res => {
        this.userList = res.result
      })
    },
    funRealname (data) {
      let _this = this
      if (data && data.length > 0) {
        data.forEach(function (v, i) {
          _this.userList.forEach(item => {
            if (item.id == v.fromUid) {
              _this.$set(v, "formRealname", item.realname);
            }
            if (item.id == v.toUid) {
              _this.$set(v, "toRealname", item.realname);
            }
          })
        });
      }
    },
    funObjRealname (data) {
      let _this = this
      for (var k in data) {
        _this.userList.forEach(item => {
          if (item.id == data['fromUid']) {
            _this.$set(data, "formRealname", item.realname);
          }
          if (item.id == data['toUid']) {
            _this.$set(data, "toRealname", item.realname);
          }
        })
      }
    },
    funcObj (data) {
      let _this = this
      for (var k in data) {
        if (data['createTime']) {
          _this.$set(data, "createTimeStr", timeChange(data['createTime']));
        }
        this.projectList.forEach(item => {
          if (item.constructionCode == data.constructionCode) {
            _this.$set(data, "projectName", item.constructionName);
          }
        })
      }
    },
    // 查看主要通知详情
    getCheckListItemDetail (id, ind) {
      this.$fetchGet("traffic-investment/comment/getTopic", { id: id }).then(res => {
        if (res.code == 200) {
          this.infoDialogVisible = true
          this.curDetailInfo = res.result
          this.funcObj(this.curDetailInfo)
          this.funObjRealname(this.curDetailInfo)
          this.tableList.forEach((item, index) => {
            if (ind == index) {
              item.hasRead = 1
            }
          })
          this.funRealname(this.tableList)
          this.isHasNOread(this.tableList)
        }
      })
    },
    // 查看回复通知详情
    getCheckAskItemDetail (id, ind) {
      this.$fetchGet("traffic-investment/comment-item/getItem", { id: id }).then(res => {
        if (res.code == 200) {
          this.infoDialogVisible = true
          this.curDetailInfo = res.result
          this.funcObj(this.curDetailInfo)
          this.funObjRealname(this.curDetailInfo)
          this.tableList.forEach((item, index) => {
            if (ind == index) {
              item.hasRead = 1
            }
          })
          this.funRealname(this.tableList)
          this.isHasNOread(this.tableList)
        }
      })
    },
    tabActive (index) {
      let type = null
      switch (index) {
        case 0:
          type = null
          break;
        case 1:
          type = 'backlog'
          break;
        case 2:
          type = 'remind'
          break;
        case 3:
          type = 'ask'
          break;
        case 4:
          type = 'system'
          break;
      }
      this.$fetchGet("traffic-investment/comment/unread", { type: type ? type : null }).then(res => {
        this.tableList = res.result.comment
        this.funRealname(this.tableList)
      })
      this.curIndex = index

    },
    toptagsidevalue (val) {
      this.smallModel = val
    },
    toptagtablelist (val) {
      this.tableList = val
      this.func(this.tableList)
    },
    // 侧边弹框查看详情后清除tab未读状态
    isHasNOread (val) {
      let result = val.find(item => {
        if (item.topicType == 'backlog') {
          return item.hasRead == 0;
        } else {
          return false
        }
      });
      let result1 = val.find(item => {
        if (item.topicType == 'backlremindog') {
          return item.hasRead == 0;
        } else {
          return false
        }
      });
      let result2 = val.find(item => {
        if (item.topicType == 'ask') {
          return item.hasRead == 0;
        } else {
          return false
        }
      });
      let result3 = val.find(item => {
        if (item.topicType == 'system') {
          return item.hasRead == 0;
        } else {
          return false
        }
      });
      let result4 = val.find(item => {
        if (item.topicType == 'near') {
          return item.hasRead == 0;
        } else {
          return false
        }
      });
      let result5 = val.find(item => {
        if (item.topicType == 'over') {
          return item.hasRead == 0;
        } else {
          return false
        }
      });
      let result6 = val.find(item => {
        return item.hasRead == 0
      });
      if (result6) {
        this.tabList[0].hasUnread = true
      } else {
        this.tabList[0].hasUnread = false
      }
      if (result) {
        this.tabList[1].hasUnread = true
      } else {
        this.tabList[1].hasUnread = false
      }
      if (result1 || result4 || result5) {
        this.tabList[2].hasUnread = true
      } else {
        this.tabList[2].hasUnread = false
      }
      if (result2) {
        this.tabList[3].hasUnread = true
      } else {
        this.tabList[3].hasUnread = false
      }
      if (result3) {
        this.tabList[4].hasUnread = true
      } else {
        this.tabList[4].hasUnread = false
      }
    },
    // 侧边弹框中tab是否显示未读状态
    isHasread (val) {
      val.forEach(item => {
        item.hasUnread = false
      })
      let result = val.find(item => {
        return item.topicType == 'backlog';
      });
      let result1 = val.find(item => {
        return item.topicType == 'remind';
      });
      let result2 = val.find(item => {
        return item.topicType == 'ask';
      });
      let result3 = val.find(item => {
        return item.topicType == 'system';
      });
      let result4 = val.find(item => {
        return item.topicType == 'near';
      });
      let result5 = val.find(item => {
        return item.topicType == 'over';
      });

      if (val.length > 0) {
        this.tabList[0].hasUnread = true
      }
      if (result) {
        this.tabList[1].hasUnread = true
      }
      if (result1 || result4 || result5) {
        this.tabList[2].hasUnread = true
      }
      if (result2) {
        this.tabList[3].hasUnread = true
      }
      if (result3) {
        this.tabList[4].hasUnread = true
      }
    },
    toNext (val) {
      if (val.path == "/projectList") {
        this.$store.commit("SET_ISBREAK", 4);
      }
      this.smallModel = false
      this.bigModel = false

      this.$store.commit('SET_CONSTRUCTIONCODE', '')
      this.$store.commit('SET_CONSTRUCTIONNAME', '')
    },
    isShow () {
      //侧边栏显示隐藏
      this.$store.commit("SET_FLAG");
      if (this.menuFlag) {
        $(".leftMenu").width("64px");
      } else {
        $(".leftMenu").width("260px");
      }
    },
    goBack () { },
    func (tdata) {
      let _this = this
      if (Array.isArray(tdata) && tdata.length > 0) {
        tdata.forEach(function (v, i) {
          if (v.createTime) {
            _this.$set(v, "createTimeStr", timeChange(v.createTime));
          }
          _this.$set(v, "isClick", false);
          _this.func(v.subList);
        });
      }
    }
  }
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  .leftMenu {
    width: 260px;
    height: 100%;
    background: rgba(43, 49, 90, 1);
    display: flex;
    flex-direction: column;
    .tit {
      width: 100%;
      height: 70px;
      font-size: 18px;
      color: #89b8ff;
      text-align: center;
      line-height: 70px;
    }
  }
  .rightContent {
    flex: 1;
    height: 100%;
    background: #f3f4f9;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
    .header-tit {
      width: 100%;
      height: 70px;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-tit {
        display: flex;
        align-items: center;
        .leftBtn {
          width: 70px;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 1px 0px 0px 0px rgba(237, 238, 240, 1);
        }
      }
    }
    .main-content {
      flex: 1 1 auto;
      box-sizing: border-box;
      overflow: hidden;
      background: rgba(243, 244, 249, 1);
    }
  }

  .iRotate {
    animation: Grotate 0.4s;
    animation-fill-mode: forwards;
  }

  @keyframes Grotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(90deg);
    }
  }
  .systeminfo-model-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    background: rgba(0, 0, 0, 0.3);
  }
  .systeminfo-model {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(73, 155, 252, 0.36);
    z-index: 52;
    font-family: Microsoft YaHei;
    font-weight: 400;
    width: 450px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      color: #ffffff;
      height: 60px;
      background: #499bfc;
      padding: 0 0 0 20px;
      box-sizing: border-box;
      .head-l {
      }
      .head-r {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .tip {
          display: flex;
          position: relative;
          cursor: pointer;
          padding: 20px 12px 20px 20px;
          span {
            position: absolute;
            top: 45px;
            right: -38px;
            width: 60px;
            height: 18px;
            margin-right: 30px;
            font-size: 12px;
            text-align: center;
            line-height: 18px;
            color: #ffffff;
            background: #1c2149;
            opacity: 0.8;
            border-radius: 2px;
            display: none;
          }
          &:hover {
            span {
              display: block;
            }
          }
        }
        .close {
          cursor: pointer;
          padding: 20px 20px 20px 12px;
        }
      }
    }
    .body {
      height: 100%;
      .tab {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 17px 0 14px 0;
        .tab-item {
          position: relative;
          width: 72px;
          height: 26px;
          font-size: 14px;
          color: #8c95a7;
          line-height: 26px;
          text-align: center;
          border-radius: 13px;
          background: #f3f4f9;
          cursor: pointer;
          &.tab-item-active {
            background: #499bfc;
            color: #fff;
          }
          span {
            position: absolute;
            top: -4px;
            right: 0;
            width: 10px;
            height: 10px;
            background: #ff0201;
            border-radius: 5px;
          }
        }
      }
      .task-list {
        overflow: hidden;
        overflow-y: scroll;
        height: 80%;
        &::-webkit-scrollbar {
          display: none;
        }
        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 19px 19px 16px 25px;
          cursor: pointer;
          &:hover {
            background: #f3f4f9;
          }
          .item-l {
            display: flex;
            justify-content: flex-start;
            // align-items: center;
            .img-dot {
              position: relative;
              margin-right: 16px;
              img {
                width: 26px;
                height: 26px;
              }
              .dot {
                position: absolute;
                top: 0;
                left: 0;
                width: 10px;
                height: 10px;
                background: rgba(255, 2, 2, 1);
                border-radius: 5px;
              }
            }
            .desc-time {
              font-size: 14px;
              .desc {
                display: flex;
                justify-content: flex-start;
                color: rgba(28, 34, 74, 1);
                .ask {
                  width: 22px;
                  height: 22px;
                  background: rgba(247, 136, 36, 0.2);
                  border-radius: 4px;
                  font-size: 14px;
                  color: rgba(248, 136, 36, 1);
                  text-align: center;
                  line-height: 22px;
                  margin-right: 2px;
                  padding: 0 4px;
                }
                .desc-content {
                  width: 100%;
                  white-space: normal; // this it is
                  word-break: break-all; //or word-wrap:break-word;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                }

                .reply-name {
                  background: none;
                  font-size: 14px;
                  font-weight: bold;
                  color: rgba(77, 90, 176, 1);
                }
              }
              .time {
                color: rgba(140, 150, 168, 1);
                margin-top: 10px;
              }
            }
          }
          .item-r {
            img {
              width: 22px;
              height: 22px;
            }
          }
        }
      }
      .history {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-align: right;
        font-size: 14px;
        color: #8c95a7;
        margin-top: 24px;
        .history-content {
          padding: 0 19px;
          cursor: pointer;
        }
      }
    }
  }

  .go-project-list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #0084ff;
    font-size: 14px;
    margin-top: 20px;
    cursor: pointer;
  }
}
</style>
