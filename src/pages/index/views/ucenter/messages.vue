<style lang="less">
    @import '../../../../assets/css/vividStandard.less';

    .message-content {
        .btnSearch {
            margin-right: 0 !important;
        }
        .messageList {
            .ivu-input, .ivu-select-selection {
                border-radius: 18px !important;
            }
            .ivu-table tbody tr:nth-child(2n-1) {
                background-color: @tableBgColor2 !important;
            }
            .ivu-table tbody tr:nth-child(2n) {
                background-color: @tableBgColor1 !important;
            }
            .tableContent {
                .tableSetting {
                    padding: 0 !important;
                }
                .tableBody {
                    .tableHeaders {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        border: 1px solid @light-gray-hover;
                        li {
                            text-align: center;
                            line-height: 60px;
                            font-size: 16px;
                            color: @dark-gray-color;
                            background-color: @class-blue;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            .ivu-checkbox-wrapper {
                                margin-right: 0;
                            }
                        }
                    }
                    .tableList {
                        .tableGroup {
                            .tableTitle {
                                color: @tips-color;
                                font-size: 14px;
                                height: 36px;
                                line-height: 36px;
                                padding-left: 25px;
                                background-color: @tableBgColor1;
                                border-left: 1px solid @light-gray-hover;
                                border-right: 1px solid @light-gray-hover;
                                span {
                                    font-size: 12px;
                                }
                            }

                        }
                        .tableData {
                            .ivu-table-tbody {
                                tr {
                                    td:nth-child(3) {
                                        text-align: left !important;
                                        .ellipsis {
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                            overflow: hidden;
                                            cursor: pointer;
                                            &.hasRead, &.hasRead:hover {
                                                span {
                                                    color: @light-gray-hover;
                                                }
                                            }
                                            &:hover {
                                                .messageTitle {
                                                    color: @dark-gray-hover;
                                                }
                                                .messageContent {
                                                    color: @mid-gray-hover;
                                                }
                                            }
                                            .messageTitle {
                                                color: @dark-gray-color;
                                                font-size: 14px;
                                            }
                                            .messageContent {
                                                color: @mid-gray-color;
                                                margin-left: 5px;
                                                font-size: 14px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
    }

    //消息详情弹窗
    .messageModal {
        .modalCon {
            position: relative;
            padding: 20px 0;
            .lastMessage, .nextMessage {
                padding: 0 200px 0 20px;
                font-size: 12px;
                color: @mid-gray-color;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                cursor: pointer;
                span {
                    color: @dark-gray-color;
                }
            }
            .messageInfo {
                li {
                    padding: 0 22px;
                    color: @dark-gray-color;
                    font-size: 12px;
                }
                li.messageTitle {
                    font-size: 14px;
                    margin-top: 30px;
                    margin-bottom: 6px;

                }
                li.messageBody {
                    background-color: @tableBgColor1;
                    line-height: 24px;
                    padding: 10px 20px;
                    color: @mid-gray-color;
                    margin-bottom: 16px;
                    font-size: 14px;
                    word-break: break-word;
                }
                li.messageTime {
                    margin-top: 12px;
                    margin-bottom: 84px;
                }
            }
            .btn {
                position: absolute;
                bottom: 20px;
                right: 20px;
                width: 70px;
                height: 28px;
                line-height: 28px;
                background: @primary-color;
                border-radius: 14px;
                text-align: center;
                color: @white-color;
                cursor: pointer;
            }
        }

    }
</style>
<template lang="html">
    <div class="message-content">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/components/breadcrumb">消息中心</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--消息中心-->
        <div class="messageList">
            <div class="tableContent">
                <!--设置-->
                <div class="tableSetting">
                    <div class="dataOperate">
                        <p>已选<span class="num">{{selectedTotal}}</span>条消息 ：</p>
                        <p v-show="selectedTotal > 0">
                            <Button @click="markedRead">标记已读</Button>
                            <Button class="btn3" @click="deleteMessage">删除</Button>
                        </p>
                    </div>
                    <div class="sortTables">
                        <div class="sortData">
                            <Input style="width:180px" v-model="formData.keywords" placeholder="请输入搜索内容"/>
                        </div>
                        <Button class="btnSearch" @click="searchMessages"><i class="iconfont icon-sousuo"></i></Button>
                    </div>
                </div>
                <div class="tableBody">
                    <!--表头-->
                    <ul class="tableHeaders">
                        <li style="width: 60px;">
                            <Checkbox v-model="single" @on-change="handleSelectAll()"></Checkbox>
                        </li>
                        <li style="width: 100px;">发件人</li>
                        <li style="flex:5;">主题</li>
                        <li style="width: 180px;">时间</li>
                    </ul>
                    <!--信息列表-->
                    <div class="tableList">
                        <div class="tableGroup">
                            <p class="tableTitle">今天 <span>{{todayTotal}}（封）</span></p>
                            <Table class="tableData" ref="table1" :show-header=false @on-selection-change="selectChange"
                                   :columns="messageHeader"
                                   :data="messageList.today" border>
                                <template slot-scope="{ row, index }" slot="name">
                                    {{row.to_user.name}}
                                </template>
                                <template slot-scope="{ row, index }" slot="message">
                                    <div class="ellipsis" :class="{hasRead:row.is_read==1}" @click="messageDetail(row)">
                                        <span class="messageTitle">{{ row.title}}</span>
                                        <span class="messageContent">{{ row.content}}</span>
                                    </div>
                                </template>
                            </Table>
                        </div>
                        <div class="tableGroup">
                            <p class="tableTitle">昨天<span>（{{yesterday_total}}封）</span></p>
                            <Table class="tableData" ref="table2" :show-header=false
                                   @on-selection-change="selectChange2"
                                   :columns="messageHeader"
                                   :data="messageList.yesterday" border>
                                <template slot-scope="{ row, index }" slot="name">
                                    {{row.to_user.name}}
                                </template>
                                <template slot-scope="{ row, index }" slot="message">
                                    <div class="ellipsis" :class="{hasRead:row.is_read==1}" @click="messageDetail(row)">
                                        <span class="messageTitle">{{ row.title}}</span>
                                        <span class="messageContent">{{ row.content}}</span>
                                    </div>
                                </template>
                            </Table>
                        </div>
                        <div class="tableGroup">
                            <p class="tableTitle">更早<span>（{{other_total}}封）</span></p>
                            <Table class="tableData" ref="table3" :show-header=false
                                   @on-selection-change="selectChange3"
                                   :columns="messageHeader"
                                   :data="messageList.other" border>
                                <template slot-scope="{ row, index }" slot="name">
                                    {{row.to_user.name}}
                                </template>
                                <template slot-scope="{ row, index }" slot="message">
                                    <div class="ellipsis" :class="{hasRead:row.is_read==1}" @click="messageDetail(row)">
                                        <span class="messageTitle">{{ row.title}}</span>
                                        <span class="messageContent">{{ row.content}}</span>
                                    </div>
                                </template>
                            </Table>
                        </div>
                    </div>
                </div>
                <!--分页-->
                <Page :total="messageTotal" show-sizer show-elevator @on-change="messagePageChange"
                      @on-page-size-change="messagePageSizeChange" show-total/>
            </div>
            <!--<Table stripe :columns="columns" :data="data"></Table>-->

        </div>
        <!--消息详情弹窗-->
        <div>
            <Modal class="modals messageModal" :width=620 v-model="messageShow" :mask-closable="false">
                <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
                <div class="modalCon">
                    <p class="lastMessage">
                        <span>上一封：</span>
                        一个消息呀呀呀呀呀呀呀呀呀呀呀呀呀有,一个消息呀呀呀呀呀呀呀呀呀呀呀呀呀有....
                    </p>
                    <!--消息详情-->
                    <ul class="messageInfo">
                        <li class="messageTitle">{{messageDetails.title}}</li>
                        <li class="messageBody">
                            {{messageDetails.content}}
                        </li>
                        <!--<li class="messageSender">发送人 ：{{messageDetails.to_user.name}}</li>-->
                        <li class="messageTime">发送时间：{{messageDetails.created_at}}</li>
                    </ul>
                    <p class="nextMessage">
                        <span>下一封：</span>
                        一个消息呀呀呀呀呀呀呀呀呀呀呀呀呀有,一个消息呀呀呀呀呀呀呀呀呀呀呀呀呀有....
                    </p>
                    <!--按钮-->
                    <p class="btn">查看分配</p>
                </div>
            </Modal>
        </div>
    </div>

</template>

<script>

  export default {
    data() {
      return {
        getmessagesAPI: this.$store.state.api.lead.messages, //获取所有组件api,
        messageHeader: [
          {
            type: 'selection',
            width: 60,
          },
          {
            title: '发件人',
            key: 'name',
            width: 100,
            slot: "name"
          },
          {
            title: '主题',
            key: 'title',
            slot: "message"
          },
          {
            title: '时间',
            key: 'created_at',
            width: 180
          },
        ],
        messageList: {},
        // messageList: [
        //   {
        //     id: 1,
        //     sender: "系统",
        //     age: "今日名单分配详情这是标题",
        //     age2: "巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文 ",
        //     date: "13：51",
        //     read: 0,
        //   },
        //   {
        //     id: 2,
        //     sender: "系统",
        //     age: "今日名单分配详情这是标题",
        //     age2: "巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文 ",
        //     date: "13：51",
        //     read: 1,
        //   },
        //   {
        //     id: 3,
        //     sender: "系统",
        //     age: "今日名单分配详情这是标题",
        //     age2: "巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文 ",
        //     date: "13：51"
        //   },
        //   {
        //     id: 4,
        //     sender: "系统",
        //     age: "今日名单分配详情这是标题",
        //     age2: "巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文巴拉巴贝拉巴巴爸爸拉阿巴拉巴拉巴拉巴拉这是正文 ",
        //     date: "13：51"
        //   },
        // ],
        selectedNum: 0,//table1选中checkBox的数量
        selectionRows: "",//table1选中列
        selectedNum2: 0,//table2选中checkBox的数量
        selectionRows2: "",//table2选中列
        selectedNum3: 0,//table3选中checkBox的数量
        selectionRows3: "",//table3选中列
        selectedTotal: 0,//所有table选中checkBox的数量
        selectionTotal: [],//所有table选中列
        single: false,
        status: false,
        messageTotal: 0,
        todayTotal: "",
        other_total: "",
        yesterday_total: "",
        messageShow: false,//消息弹窗,
        messageDetails:{},//消息详情
        formData: {
          user_id: "",
          keywords: "",
          page: 1,
          size: 10
        }

      }
    },
    computed: {},
    mounted() {
      this.getMessages();
    },
    methods: {
      searchMessages(){//搜索
        this.formData.page = 1;
        this.formData.size = 10;
        this.getMessages();
      },
      getMessages() {//获取消息列表
        this.formData.user_id = JSON.parse(sessionStorage.getItem('auth_user')).id;
        this.$axios.get(this.getmessagesAPI, {
          params: this.formData
        }).then(res => {
          console.log(12);
          this.messageList = res.data.data.data;
          this.messageTotal = res.data.data.all_total;
          this.todayTotal = res.data.data.today_total;
          this.other_total = res.data.data.other_total;
          this.yesterday_total = res.data.data.yesterday_total;
        }).catch(error => {
          console.log(error);
        });
      },
      selectChange(selection) {//table1选中checkBox的数量
        // console.log(selection);
        this.selectedNum = selection.length;
        this.selectedTotal = this.selectedNum + this.selectedNum2 + this.selectedNum3;
        this.selectionRows = selection;
        this.selectionTotal = [...this.selectionRows, ...this.selectionRows2, ...this.selectionRows3];
        console.log(this.selectionTotal);
      },
      selectChange2(selection) {//table2选中checkBox的数量
        // console.log(selection);
        this.selectedNum2 = selection.length;
        this.selectedTotal = this.selectedNum + this.selectedNum2 + this.selectedNum3;
        this.selectionRows2 = selection;
        this.selectionTotal = [...this.selectionRows, ...this.selectionRows2, ...this.selectionRows3];
        console.log(this.selectionTotal);
      },
      selectChange3(selection) {//table3选中checkBox的数量
        // console.log(selection);
        this.selectedNum3 = selection.length;
        this.selectedTotal = this.selectedNum + this.selectedNum2 + this.selectedNum3;
        this.selectionRows3 = selection;
        this.selectionTotal = [...this.selectionRows, ...this.selectionRows2, ...this.selectionRows3];
        console.log(this.selectionTotal);
      },
      handleSelectAll() {//全选
        this.status = !this.status;
        console.log(this.status);
        this.$refs.table1.selectAll(this.status);
        this.$refs.table2.selectAll(this.status);
        this.$refs.table3.selectAll(this.status);
      },
      searchMessage() {//搜索消息

      },
      messagePageChange(page) { //消息列表页码改变
        this.formData.page = page;
        this.getMessages();
      },
      messagePageSizeChange(pageSize) { //消息列表页码size改变
        console.log(pageSize);
        this.formData.size = pageSize;
        this.getMessages();
      },

      messageDetail(row) {//查看消息详情弹窗
        console.log(row);
        this.messageDetails = row;
        this.messageShow = true;
      },
      cancel() {//关闭消息详情弹窗
        this.messageShow = false;
      },
      markedRead() {//标记已读
        let row = this.selectionTotal;
        let ids = [];
        if (row.length > 0) {
          row.forEach(function (item, index) {
            ids.push(item['id'])
          })
          console.log(ids.join(','));
        }
      },
      deleteMessage() {//删除消息

      }
    },
    components: {},
  }

</script>
