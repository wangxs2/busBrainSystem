<template>
  <div class="all-com inquiry-quiry">
    <div class="btn-wrapper">
      <!-- v-if="allReadShow" -->
      <div class="btn btn-gray" @click="allRead">全部已读</div>
      <div class="btn btn-red" v-if="delBtnShow" @click="delCheckItem">删除</div>
      <div class="btn btn-gray" @click="plManage">批量管理</div>
    </div>
    <div class="project-header" v-if="curPageIndex==4&&roleCode=='system'">
      <div class="top-input">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="systemForm.content"></el-input>
      </div>
      <div class="bottom-btn">
        <div class="btn-l-l"></div>
        <div class="btn-r" @click="publishQuiry">发布</div>
      </div>
    </div>
    <div class="table-wrapper">
      <div class="table-header">
        <div class="tab-list">
          <div
            :class="[curIndex==index?'tab-item tab-item-color':'tab-item']"
            v-for="(item,index) in tableTab"
            :key="index"
            @click="clicktableTab(index)"
          >
            <span class="name">{{item.name}}</span>
            <!-- <span class="num">（{{index==0?tableList.length:tableList1.length}}）</span> -->
          </div>
        </div>
        <div class="btn-select" @click="clickAllChecked" v-if="delBtnShow">
          <span>全选（20）</span>
          <img src="../../../../../assets/image/yixuan@3x.png" v-if="isAllChecked" alt />
          <img src="../../../../../assets/image/weixuan@3x.png" v-else alt />
        </div>
      </div>
      <div
        class="table-body"
        :style="{height:curPageIndex==4&&roleCode=='system'?$store.getters.docHeight-335+'px':$store.getters.docHeight-199+'px'}"
      >
        <div class="task-list">
          <div
            class="list-item"
            v-for="(item,index) in tableList"
            :key="index"
            @click.stop="checkListItem(item,index)"
          >
            <div class="item-l">
              <div class="img-dot">
                <span class="dot" v-if="item.hasRead===0"></span>
                <img
                  :src="item.topicType=='backlog' ?require('../../../../../assets/image/icon_message_2@3x.png'):item.topicType=='remind'?require('../../../../../assets/image/message_3@3x.png'):item.topicType=='system'?require('../../../../../assets/image/icon_message_5@3x.png'):item.topicType=='ask'?require('../../../../../assets/image/icon_message_4@3x.png'):item.topicType=='near'?require('../../../../../assets/image/icon_message_3_12@3x.png'):item.topicType=='over'?require('../../../../../assets/image/icon_message_3_1@3x.png'):''"
                  alt
                />
              </div>
              <div class="desc-time">
                <!-- <div class="project-name">{{item.projectName}}</div> -->
                <div class="desc">
                  <span class="desc-content">
                    <span
                      class="reply-name"
                      v-if="item.topicType=='ask'&&!item.topicId"
                    >{{item.formRealname}} @ {{item.toRealname}}：</span>
                    <span
                      class="reply-name"
                      v-if="item.topicType=='ask'&&item.topicId"
                    >{{item.formRealname}} 回复 {{item.toRealname}}：</span>
                    {{item.content}}
                  </span>
                </div>
                <div class="time">{{item.createTimeStr}}</div>
              </div>
            </div>
            <div class="item-r" @click.stop="clickChecked(index)" v-if="delBtnShow">
              <img src="../../../../../assets/image/yixuan@3x.png" v-if="item.isChecked" alt />
              <img src="../../../../../assets/image/weixuan@3x.png" v-else alt />
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.pageNo"
          :page-size="query.pageSize"
          layout="total,prev, pager, next, jumper"
          :total="total"
        >></el-pagination>
      </div>
    </div>
    <!-- 侧边弹框 -->
    <el-dialog
      title="消息详情"
      :visible.sync="infoDialogVisible"
      width="45%"
      custom-class="info-detail"
      close
    >
      <div class="task-list" v-if="curDetailInfo.topicType=='ask'">
        <div class="list-item-style">
          <div class="list-item">
            <div class="item-l">
              <div class="img-dot">
                <img src="../../../../../assets/image/icon_message_4@3x.png" alt />
              </div>
              <div class="desc-time-input">
                <div class="project-name">{{curDetailInfo.projectName}}</div>
                <div class="desc-time">
                  <div class="desc">
                    <span class="desc-content">
                      <span
                        class="reply-name"
                      >{{curDetailInfo.formRealname}} @ {{curDetailInfo.toRealname}}：</span>
                      {{curDetailInfo.content}}
                    </span>
                  </div>
                  <div class="time">{{curDetailInfo.createTimeStr}}</div>
                </div>
                <div class="sub-list" v-if="curDetailInfo.subList&&curDetailInfo.subList.length>0">
                  <div
                    class="sub-list-item"
                    v-for="(items,indexs) in curDetailInfo.subList"
                    :key="indexs"
                  >
                    <div class="desc-time">
                      <div class="desc">
                        <span class="desc-content">
                          <span class="reply-name">{{items.toRealname}} 回复 {{items.formRealname}}：</span>
                          {{items.content}}
                        </span>
                      </div>
                      <div class="time">{{items.createTimeStr}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="go-project-list"
          v-if="curDetailInfo.topicType=='over'||curDetailInfo.topicType=='near'"
        >
          <span @click="goProjectList">进入项目主页></span>
        </div>
      </div>
      <div class="task-list" v-else>
        <div>{{curDetailInfo.content}}</div>
        <div
          class="go-project-list"
          v-if="curDetailInfo.topicType=='over'||curDetailInfo.topicType=='near'"
        >
          <span @click="goProjectList">进入项目主页></span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isYestday, isYear, timeChange } from '../../../../../libs/util'
export default {
  name: 'allCom',
  data () {
    return {
      tableList: [],
      tableTab: [
        {
          name: '全部',
          num: 11
        },
        {
          name: '未读',
          num: 11
        },
      ],
      curIndex: 0,
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      isAllChecked: false,
      userList: [],
      delBtnShow: false,
      allReadShow: true,
      total: 0,
      infoDialogVisible: false,
      curDetailInfo: {},
      projectList: [],
      curTabIndex: null,
      systemForm: {
        content: "",
        topicType: "system"
      },
      roleCode: ''
    }
  },
  created () {
    this.getProjectList()
    this.getPeopleList()
    this.getProjectInquiryList()
    // this.getUnProjectInquiryList()
  },
  props: ["curPageIndex"],
  mounted () {
    this.roleCode = this.$store.getters.roleCode
  },
  watch: {
    'curPageIndex': function (val, oldVal) {
      this.curTabIndex = val
      // 参数type 主题类型 backlog 代办,remind 提醒,system 系统,ask 问询
      let x = ''
      switch (val) {
        case 0:
          x = null
          break;
        case 1:
          x = 'backlog'
          break;
        case 2:
          x = 'remind'
          break;
        case 4:
          x = 'system'
          break;
      }
      this.tableList = []
      this.curIndex = 0
      this.query.type = x
      this.getProjectInquiryList()
      // this.getUnProjectInquiryList()
    }
  },
  methods: {
    // 任务提醒进入项目主页
    goProjectList () {
      this.$emit('setbigmodel', false)
      if (this.$route.path != '/projectList') {
        this.$router.push({
          path: "/projectList",
        })
      }
      this.$store.commit('SET_CONSTRUCTIONCODE', this.curDetailInfo.constructionCode)
      this.infoDialogVisible = false
    },
    // 发布
    publishQuiry () {
      if (!this.systemForm.content) {
        this.$message.error("请输入系统通知内容进行发布")
        return
      }
      this.$fetchPost("traffic-investment/comment/add", this.systemForm, 'json').then(res => {
        if (res.code == 200) {
          this.systemForm.content = ''
          if (this.curIndex === 0) {
            this.getProjectInquiryList()
          } else {
            this.getUnProjectInquiryList()
          }
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取项目列表
    getProjectList () {
      this.$fetchGet("traffic-investment/construction/list").then(res => {
        this.projectList = res.result.records
      })
    },
    // 删除
    delCheckItem () {
      let curList = []
      this.tableList.forEach(item => {
        if (item.isChecked == true) {
          curList.push(item.id)
        }
      })
      if (curList && curList.length > 0) {
        let z = curList.join(",")
        this.$fetchPost("traffic-investment/comment/batchDelete", { ids: z }).then(res => {
          if (res.code == 200) {
            // this.getUnProjectInquiryList()
            if (this.curIndex === 0) {
              this.getProjectInquiryList()
            } else {
              this.getUnProjectInquiryList()
            }
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.$message.warning("请选择删除项")
      }
    },
    // 全部已读
    allRead () {
      if (this.tableList && this.tableList.length > 0) {
        let x = []
        this.tableList.forEach(item => {
          x.push(item.id.toString())
        })
        let z = x.join(",")
        this.$fetchPost(`traffic-investment/comment/batchRead`, { ids: z }).then(res => {
          if (res.code == 200) {
            if (this.curIndex === 0) {
              this.getProjectInquiryList()
            } else {
              this.getUnProjectInquiryList()
            }
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.allReadShow = false
      }
    },
    plManage () {
      this.delBtnShow = !this.delBtnShow
    },
    // 获取全部数据
    getProjectInquiryList () {
      this.query.hasRead = null
      this.$fetchGet('traffic-investment/comment/all', this.query).then(res => {
        this.tableList = res.result.records
        this.total = res.result.total
        this.func(this.tableList)
        this.funRealname(this.tableList)
        if (this.curTabIndex == 0) {
          if (this.tableList.length > 0) {
            this.tableList.forEach(item => {
              this.projectList.forEach(items => {
                if (item.constructionCode == items.constructionCode) {
                  item.projectName = items.constructionName
                }
              })
            })
          }
        }
      })
    },
    // 获取未读数据
    getUnProjectInquiryList () {
      this.query.hasRead = 0
      this.$fetchGet("traffic-investment/comment/all", this.query).then(res => {
        this.tableList = res.result.records
        this.total = res.result.total
        this.func(this.tableList)
        this.funRealname(this.tableList)
        if (this.curTabIndex == 0) {
          if (this.tableList.length > 0) {
            this.tableList.forEach(item => {
              this.projectList.forEach(items => {
                if (item.constructionCode == items.constructionCode) {
                  item.projectName = items.constructionName
                }
              })
            })
          }
        }
      })
    },
    checkListItem (item, index) {
      if (!item.topicId) {
        this.getCheckListItemDetail(item.id, index)
      } else {
        this.getCheckAskItemDetail(item.id, index)
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
        console.log(data['createTime'])
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
        }
      })
    },
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
        }
      })
    },
    // 全选
    clickAllChecked () {
      this.isAllChecked = !this.isAllChecked
      if (this.isAllChecked) {
        this.tableList.forEach(item => {
          item.isChecked = true
        })
      } else {
        this.tableList.forEach(item => {
          item.isChecked = false
        })
      }
    },
    // 选中当前
    clickChecked (ind) {
      let x = !this.tableList[ind].isChecked
      this.$set(this.tableList[ind], 'isChecked', x)
      var result = this.tableList.some(function (item) {
        if (item.isChecked == false) {
          return true;
        } else {
          return false
        }
      })
      if (result) {
        this.isAllChecked = false
      } else {
        this.isAllChecked = true
      }
    },
    clicktableTab (index) {
      this.query.pageNo = 1
      this.curIndex = index
      this.isAllChecked = false
      if (index === 0) {
        this.getProjectInquiryList()
      } else {
        this.getUnProjectInquiryList()
      }
    },
    handleSizeChange (val) {
      this.query.pageSize = val
      if (this.curIndex === 0) {
        this.getProjectInquiryList()
      } else {
        this.getUnProjectInquiryList()
      }
    },
    handleCurrentChange (val) {
      this.query.pageNo = val
      if (this.curIndex === 0) {
        this.getProjectInquiryList()
      } else {
        this.getUnProjectInquiryList()
      }
    },

    getPeopleList () {
      this.$fetchGet('traffic-investment/sys/user/listByRoleId', { realname: '', roleId: '' }).then(res => {
        res.result.forEach(item => {
          item.value = item.realname
        })
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
          _this.funRealname(v.subList)
        });
      }
    },
    func (tdata) {
      let _this = this
      if (Array.isArray(tdata) && tdata.length > 0) {
        tdata.forEach(function (v, i) {
          if (v.createTime) {
            _this.$set(v, "createTimeStr", timeChange(v.createTime));
          }
          _this.$set(v, "isChecked", false);
          _this.func(v.subList);
        });
      }
    },
  }
}
</script>
<style lang="scss">
.all-com {
  .el-pager li.active + li {
    border-left: 1px solid rgba(198, 203, 212, 1);
  }
  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    color: #b2b8c4;
  }
  .el-pager li,
  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    min-width: 30px;
    height: 30px;
    font-size: 14px;
    color: #2c325a;
    border: 1px solid rgba(198, 203, 212, 1);
    border-radius: 4px;
    padding: 0;
    margin: 0 5px;
  }
  .el-pager li.active {
    border: 1px solid rgba(74, 156, 252, 1);
    color: rgba(44, 50, 90, 1);
  }
}
</style>

<style lang="scss" scoped>
.all-com {
  position: relative;
  width: 100%;
  height: 100%;

  .btn-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: -82px;
    right: 0;
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
  .table-wrapper {
    background: #fff;
    border-radius: 12px;
    padding: 24px 16px;
    box-sizing: border-box;
    .table-header {
      display: flex;
      justify-content: space-between;
      height: 36px;
      background: rgba(243, 244, 249, 1);
      padding: 0 20px;
      .tab-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .tab-item {
          font-size: 14px;
          color: rgba(140, 150, 168, 1);
          cursor: pointer;
          padding: 0 10px 0 0;
          margin-right: 27px;
          .name {
          }
          .num {
          }
          &.tab-item-color {
            color: rgba(44, 50, 90, 1);
          }
        }
      }
      .btn-select {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        span {
          font-size: 14px;
          color: rgba(44, 50, 90, 1);
          padding-right: 21px;
        }
        img {
          width: 22px;
          height: 22px;
        }
      }
    }
    .table-body {
      padding: 12px 0;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .task-list {
        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 21px 20px;
          border-bottom: 1px solid #edeff2;
          cursor: pointer;
          .item-l {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            // align-items: center;
            box-sizing: border-box;
            .img-dot {
              position: relative;
              margin-right: 16px;
              img {
                width: 40px;
                height: 40px;
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
    }
    .block {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      padding-top: 20px;
      box-sizing: border-box;
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
