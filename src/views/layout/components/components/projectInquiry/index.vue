<template>
  <div class="project-inquiry inquiry-quiry">
    <div class="project-header">
      <div class="top-input">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="askForm.content"></el-input>
      </div>
      <div class="bottom-btn">
        <div class="btn-l-l">
          <div class="btn-l" @click.stop="askWho">
            <span class="desc1">@</span>
            <span class="desc2">{{curCheckPeople?curCheckPeople:'向谁提问'}}</span>
            <div class="people-list" v-if="peopleModel">
              <div class="input-wrapper">
                <el-input
                  v-model="curPeopleWrite"
                  placeholder="请输入关键字"
                  @change="changePeopleName"
                  clearable
                ></el-input>
              </div>
              <div
                :class="[curPeopleIndex==index?'list-item list-item-active':'list-item']"
                v-for="(item,index) in userList1"
                :key="index"
                @click.stop="checkPeople(item,index)"
              >{{item.realname}}</div>
            </div>
          </div>
          <div class="btn-l" @click.stop="checkProject">
            <span class="desc2">{{curCheckProject?curCheckProject:'项目名称'}}</span>
            <div class="people-list" v-if="projectModel">
              <div class="input-wrapper">
                <el-input
                  v-model="curProjectWrite"
                  placeholder="请输入关键字"
                  @change="changeProjectName"
                  clearable
                ></el-input>
              </div>
              <div
                :class="[curProjectIndex==index?'list-item list-item-active':'list-item']"
                v-for="(item,index) in projectList1"
                :key="index"
                @click.stop="checkProjectItem(item,index)"
              >{{item.constructionName}}</div>
            </div>
          </div>
        </div>
        <div class="btn-r" @click="publishQuiry">发布</div>
      </div>
    </div>
    <div class="project-body">
      <div class="project-body-header">
        <div class="tab-list">
          <div
            :class="[curIndex==index?'tab-item tab-item-color':'tab-item']"
            v-for="(item,index) in tableTab"
            :key="index"
            @click="clicktableTab(index)"
          >
            <span class="name">{{item.name}}</span>
            <!-- <span class="num">（{{index==0?total:total1}}）</span> -->
          </div>
        </div>
        <div class="auto-input">
          <el-autocomplete
            v-model="curAutoProjectName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入项目名称关键字"
            @select="handleSelect"
            clearable
          ></el-autocomplete>
        </div>
      </div>
      <div class="project-body-body" :style="{height:$store.getters.docHeight-326+'px'}">
        <div class="task-list">
          <div class="list-item-style" v-for="(item,index) in tableList" :key="index">
            <div class="list-item">
              <div class="item-l">
                <div class="img-dot">
                </div>
                <div class="desc-time-input">
                  <div class="desc-time">
                    <div class="desc">
                      <!-- <span class="write">问</span> -->
                      <span class="desc-content">
                        <span class="reply-name">{{item.formRealname}} @ {{item.toRealname}}：</span>
                        {{item.content}}
                      </span>
                    </div>
                    <div class="time">
                      {{item.createTimeStr}}
                      <span
                        :class="[item.isClick?'reply reply-click':'reply']"
                        @click="reply(index,null)"
                      >回复</span>
                      <span class="cancle" @click="deleteOneOrTwo(index,null,item.id)">删除</span>
                    </div>
                  </div>
                  <div class="input-wrapper" v-if="item.isClick">
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="我来回答..."
                      v-model="replayDescOne"
                      maxlength="300"
                      :show-word-limit="item.isClick"
                    ></el-input>
                    <div class="btn-publish">
                      <div class="confirm" @click="confirmOneOrTwo(index,null)">确定</div>
                      <div class="cancle" @click="cancleOneOrTwo(index,null)">取消</div>
                    </div>
                  </div>
                  <div class="sub-list">
                    <div class="sub-list-item" v-for="(items,indexs) in item.subList" :key="indexs">
                      <div class="desc-time">
                        <div class="desc">
                          <!-- <span class="write">答</span> -->
                          <span class="desc-content">
                            <span class="reply-name">{{items.formRealname}} 回复 {{items.toRealname}}：</span>
                            {{items.content}}
                          </span>
                        </div>
                        <div class="time">
                          {{items.createTimeStr}}
                          <span
                            :class="[items.isClick?'reply reply-click':'reply']"
                            @click="reply(index,indexs)"
                          >回复</span>
                          <span class="cancle" @click="deleteOneOrTwo(index,indexs,items.id)">删除</span>
                        </div>
                      </div>
                      <div class="input-wrapper" v-if="items.isClick">
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="我来回答..."
                          v-model="replayDescTwo"
                          maxlength="300"
                          :show-word-limit="items.isClick"
                        ></el-input>
                        <div class="btn-publish">
                          <div class="confirm" @click="confirmOneOrTwo(index,indexs)">确定</div>
                          <div class="cancle" @click="cancleOneOrTwo(index,null)">取消</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    <el-dialog title="提示" :visible.sync="cancleDialogVisible" width="20%" :show-close="false">
      <span>确认删除吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCancleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isYestday, isYear, timeChange } from '../../../../../libs/util'
export default {
  name: 'projectInquiry',
  data () {
    return {
      tableTab: [
        {
          name: '全部',
          num: 11
        },
        {
          name: '我发出的',
          num: 11
        },
      ],
      curIndex: 0,
      tableList: [],
      replayDesc: '',
      rowNum: 1,
      isClick: false,
      isSubClick: false,
      curListIndex: null,
      curSubListIndex: null,
      timeNew: null,
      userList: [],
      userList1: [],
      curPeopleIndex: null,
      peopleModel: false,
      askForm: {
        constructionCode: "",// 项目编号
        content: "",
        toUid: null,
        topicType: "ask"
      },
      replyForm: {
        content: "",
        toUid: null,
        fromUid: null,
        topicId: null
      },
      curCheckPeople: '',
      replayDescOne: '',
      replayDescTwo: '',
      query: {
        pageNo: 1,
        pageSize: 10,
        constructionCode: '',
        type: 'ask'
      },
      curReplayIndex: null,
      curReplayIndexs: null,
      curPeopleWrite: '',
      projectList: [],
      projectList1: [],
      curProjectIndex: null,
      curProjectWrite: '',
      curCheckProject: '',
      projectModel: false,

      cancleDialogVisible: false,
      curId: null,
      curAutoProjectName: '',
      total: 0,
      // total1: 0,
    }
  },
  created () {
    this.getPeopleList()
  },
  mounted () {
    this.getProjectList()
    this.getProjectInquiryList()
    // this.getProjectInquiryList1()
  },
  methods: {
    querySearchAsync (queryString, cb) {
      var restaurants = this.projectList;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      cb(results);
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect (item) {
      this.getProjectInquiryList(item.constructionCode)
      this.getProjectInquiryList1(item.constructionCode)
    },
    // 删除
    deleteOneOrTwo (ind, inds, id) {
      this.cancleDialogVisible = true
      this.curReplayIndex = ind
      this.curReplayIndexs = inds
      this.curId = id
    },
    // 确认删除
    confirmCancleInfo () {
      if (this.curReplayIndexs || this.curReplayIndexs === 0) {
        this.$fetchGet("traffic-investment/comment-item/delete", { id: this.curId }).then(res => {
          if (res.code == 200) {
            this.$message.success(res.message)

            let x = this.tableList[this.curReplayIndex].subList
            x.splice(this.curReplayIndexs, 1)
          } else {
            this.$message.error(res.message)
          }
          this.cancleDialogVisible = false
        })
      } else {
        this.$fetchGet("traffic-investment/comment/delete", { id: this.curId }).then(res => {
          if (res.code == 200) {
            this.$message.success(res.message)
            this.tableList.splice(this.curReplayIndex, 1)
            this.total = this.total > 0 ? this.total - 1 : 0
          } else {
            this.$message.error(res.message)
          }
          this.cancleDialogVisible = false
        })
      }
    },
    // 获取项目列表
    getProjectList () {
      this.$fetchGet("traffic-investment/construction/list").then(res => {
        res.result.records.forEach(item => {
          item.value = item.constructionName
        })
        this.projectList = res.result.records
        this.projectList1 = res.result.records
      })
    },
    checkProject () {
      this.projectModel = true
      this.peopleModel = false
    },
    changeProjectName (val) {
      let _search = this.curProjectWrite.toLowerCase();
      let newListData = []; //  用于存放搜索出来数据的新数组
      if (_search) {
        this.projectList.filter(item => {
          if (item.constructionName.toLowerCase().indexOf(_search) !== -1) {
            newListData.push(item);
          }
        })
        this.projectList1 = newListData;
      } else {
        this.projectList1 = this.projectList;
      }

    },
    // 选择项目名称
    checkProjectItem (item, index) {
      this.curProjectIndex = index
      this.askForm.constructionCode = item.constructionCode
      this.curCheckProject = item.constructionName
      this.projectModel = false

    },
    changePeopleName () {  //  支持模糊查询
      let _search = this.curPeopleWrite.toLowerCase();
      let newListData = []; //  用于存放搜索出来数据的新数组
      if (_search) {
        this.userList.filter(item => {
          if (item.realname.toLowerCase().indexOf(_search) !== -1) {
            newListData.push(item);
          }
        })
        this.userList1 = newListData;
      } else {
        this.userList1 = this.userList;
      }
    },
    // 确认发布
    confirmOneOrTwo (ind, inds) {
      this.replyForm.topicId = Number(this.tableList[ind].id)
      if (inds || inds === 0) {
        this.replyForm.toUid = this.tableList[ind].subList[inds].fromUid
        this.replyForm.fromUid = Number(this.$store.getters.userId)
        this.replyForm.content = this.replayDescTwo
      } else {
        this.replyForm.toUid = this.tableList[ind].fromUid
        this.replyForm.fromUid = Number(this.$store.getters.userId)
        this.replyForm.content = this.replayDescOne
      }
      this.replyItem(ind, inds)
    },
    // 取消发布
    cancleOneOrTwo (ind, inds) {
      if (inds || inds === 0) {
        this.$set(this.tableList[ind].subList[inds], "isClick", false);
      } else {
        this.$set(this.tableList[ind], "isClick", false);
      }
      this.replayDescOne = ''
      this.replayDescTwo = ''
      this.curReplayIndex = null
      this.curReplayIndexs = null
    },
    // 点击回复
    replyItem (ind, inds) {
      this.$fetchPost("traffic-investment/comment-item/add", this.replyForm, 'json').then(res => {
        if (res.code == 200) {
          this.replayDescOne = ''
          this.replayDescTwo = ''
          this.curReplayIndex = null
          this.curReplayIndexs = null
          if (inds || inds === 0) {
            this.$set(this.tableList[this.curListIndex].subList[this.curSubListIndex], "isClick", false);
            this.tableList[ind].subList.push(res.result)
          } else {
            this.$set(this.tableList[this.curListIndex], "isClick", false);
            this.tableList[ind].subList.unshift(res.result)
          }
          this.func(this.tableList)
          this.funRealname(this.tableList)
          this.$message.success(res.message)
        } else {

          this.$message.error(res.message)
        }
      })
    },
    // 发布
    publishQuiry () {
      if (!this.askForm.constructionCode || (!this.askForm.toUid && this.askForm.toUid !== 0)) {
        this.$message.error("请选择向谁提问及项目名称进行发布")
        return
      }
      this.$fetchPost("traffic-investment/comment/add", this.askForm, 'json').then(res => {
        if (res.code == 200) {
          this.curCheckPeople = ''
          this.curPeopleIndex = null
          this.askForm.content = ''
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
        if (!this.curReplayIndex && this.curReplayIndex !== 0 && !this.curReplayIndexs && this.curReplayIndexs !== 0) {
          res.result.subList = []
          this.tableList.unshift(res.result)
          this.func(this.tableList)
          this.funRealname(this.tableList)
          this.total += 1
          // this.total1 += 1
          this.curReplayIndex = null
          this.curReplayIndexs = null
        }
      })
    },
    checkPeople (item, index) {
      this.curPeopleIndex = index
      this.askForm.toUid = item.id
      this.curCheckPeople = item.realname
      this.peopleModel = false
    },
    getPeopleList () {
      this.$fetchGet('traffic-investment/sys/user/listByRoleId', { realname: '', roleId: '' }).then(res => {
        res.result.forEach(item => {
          item.value = item.realname
        })
        this.userList = res.result
        this.userList1 = res.result
      })
    },
    askWho () {
      this.peopleModel = true
      this.projectModel = false
    },
    goback () {
      this.$emit("parentEvent", {
        isRefresh: 7,
        gobackzyorjh: this.gobackzyorjh
      });
    },
    func (tdata) {
      let _this = this
      if (Array.isArray(tdata) && tdata.length > 0) {
        tdata.forEach(function (v, i) {
          _this.userList.forEach(item => {
            if (item.id == v.fromUid) {
              _this.$set(v, "formRealname", item.realname);
            }
            if (item.id == v.toUid) {
              _this.$set(v, "toRealname", item.realname);
            }
          })
          if (v.createTime) {
            _this.$set(v, "createTimeStr", timeChange(v.createTime));
          }
          _this.func(v.subList)
        });

      }
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
    textareaShow (ind, inds) {
      if (inds || inds == 0) {
        this.$set(this.tableList[ind].subList[inds], "isClick", true);
        this.curListIndex = ind
        this.curSubListIndex = inds
      } else {
        this.$set(this.tableList[ind], "isClick", true);
        this.curListIndex = ind
        this.curSubListIndex = null
      }
    },
    // 点击回复
    reply (ind, inds) {
      if (this.curListIndex == null && !this.curSubListIndex == null) {
        this.textareaShow(ind, inds)
      } else if ((this.curListIndex || this.curListIndex == 0) && (this.curSubListIndex || this.curSubListIndex == 0)) {
        this.$set(this.tableList[this.curListIndex].subList[this.curSubListIndex], "isClick", false);
      } else if ((this.curListIndex || this.curListIndex == 0) && (!this.curSubListIndex || this.curSubListIndex != 0)) {
        this.$set(this.tableList[this.curListIndex], "isClick", false);
      }
      this.textareaShow(ind, inds)
      this.curReplayIndex = ind
      this.curReplayIndexs = inds
    },
    //获取全部数据
    getProjectInquiryList (constructionCode) {
      this.query.constructionCode = constructionCode
      this.$fetchGet('traffic-investment/comment/all', this.query).then(res => {
        this.tableList = res.result.records
        this.total = res.result.total
        this.func(this.tableList)
        this.funRealname(this.tableList)
        this.tableList3 = this.tableList
      })
    },
    // 获取我发出的
    getProjectInquiryList1 (constructionCode) {
      this.query.constructionCode = constructionCode
      this.$fetchGet('traffic-investment/comment/allByMine', this.query).then(res => {
        this.tableList = res.result.records
        this.total = res.result.total
        this.func(this.tableList)
        this.funRealname(this.tableList)
      })
    },
    clicktableTab (index) {
      this.query.pageNo = 1
      this.curIndex = index
      if (index === 0) {
        this.getProjectInquiryList()
      } else {
        this.getProjectInquiryList1()
      }
    },
    handleSizeChange (val) {
      this.query.pageSize = val
      if (this.curIndex === 0) {
        this.getProjectInquiryList()
      } else {
        this.getProjectInquiryList1()
      }
    },
    handleCurrentChange (val) {
      this.query.pageNo = val
      if (this.curIndex === 0) {
        this.getProjectInquiryList()
      } else {
        this.getProjectInquiryList1()
      }
    }
  },
}
</script>
<style lang="scss">
.project-inquiry {
}
</style>

<style lang="scss" scoped>
.project-inquiry {
  width: 100%;
  height: 100%;
  // padding: 24px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
