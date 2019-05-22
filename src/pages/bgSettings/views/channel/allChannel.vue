<style lang="less">
    .allChannelLeft {
        /*width: 180px;*/
        .allChannelLeftMenu {
            width: 100% !important;
            padding-bottom: 15px;
            .addRole {
                font-size: 16px;
                font-weight: 600;
                text-align: left;
                position: relative;
                padding: 15px;
                letter-spacing: 1px;
                cursor: pointer;
                color: #656E7D;
                .addRoleIcon {
                    position: absolute;
                    right: 12px;
                    color: #07C4FE;
                    font-weight: 600;
                    top: 17px;
                    cursor: pointer;
                    font-size: 18px;
                }
            }
            li {
                text-align: left;
                padding: 16px;
                color: #6897C0;
                font-size: 14px;
            }
            .ivu-menu-item-active {
                color: #6897C0;
                background: #E7F8FF;
            }
        }
    }

    .organStructureBody {
        .organStructureRightInner {
            background: #fff;
            .organStructureRightBody {
                padding: 20px;
            }
        }

    }
    .channelModal {
        .ivu-modal-footer{
            display: block!important;
        }
    }

</style>

<template>
    <div class="lead-content">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/components/breadcrumb">渠道设置</BreadcrumbItem>
                <BreadcrumbItem>全部渠道</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <Row class="organStructureBody">
            <Col span="4" class="organStructureLeft">
                <Menu ref="menu" theme="light" @on-select="" accordion class="organStructureLeftMenu"
                      @on-select="menuOnChange">
                    <div class="organStructureTitle">
                        <span style="font-size: 15px;">渠道</span>
                    </div>
                    <Submenu v-for="(item,key) in channelList" :key="item.id" :name="item.name" class="firstLayer">

                        <div slot="title">
                            <div class="hoverSpan" @mouseenter.stop='hoverOver(item,key,"fir")'
                                 @mouseleave.stop='hoverOut(item,key,"fir")'>
                                {{ item.name }}
                                <hoverHandleBtn v-if="item.isHover" :item="item" @showeditmodal="editChannel"
                                                @refresh="refresh"
                                                @showaddmodal="addChannel"
                                                @showdeletemodal="deleteChannel"></hoverHandleBtn>
                            </div>
                        </div>
                        <div v-if="item.all_children">
                            <template v-for="(sec_item,sec_key) in item.all_children">
                                <template v-if="sec_item.all_children.length">
                                    <Submenu :name="sec_item.name">
                                        <div slot="title">
                                            <div @mouseenter.stop='hoverOver(sec_item,sec_key,"sec")'
                                                 @mouseleave.stop='hoverOut(sec_item,sec_key,"sec")'
                                                 @click="getMarketEvent(sec_item)">
                                                {{ sec_item.name }}
                                                <hoverHandleBtn v-if="sec_item.isHover" :item="sec_item"
                                                                @showeditmodal="editChannel"
                                                                @refresh="refresh" @showaddmodal="addChannel"
                                                                @showdeletemodal="deleteChannel"></hoverHandleBtn>
                                            </div>
                                        </div>
                                        <div v-if="sec_item.all_children">
                                            <MenuItem v-for="(thi_item,thi_key) in sec_item.all_children"
                                                      :key="thi_item.id"
                                                      :name="thi_item.name">
                                                <div @mouseenter.stop='hoverOver(thi_item,thi_key,"thi")'
                                                     @mouseleave.stop='hoverOut(thi_item,thi_key,"thi")'>
                                                    {{ thi_item.name }}
                                                    <hoverHandleBtn v-if="thi_item.isHover" :item="thi_item"
                                                                    @showeditmodal="editChannel"
                                                                    @refresh="refresh" @showaddmodal="addChannel"
                                                                    @showdeletemodal="deleteChannel"></hoverHandleBtn>
                                                </div>
                                            </MenuItem>
                                        </div>
                                    </Submenu>
                                </template>
                                <template v-else>
                                    <MenuItem :name="sec_item.name">
                                        <div @mouseenter.stop='hoverOver(sec_item,sec_key,"sec")'
                                             @mouseleave.stop='hoverOut(sec_item,sec_key,"sec")'
                                             @click="getMarketEvent(sec_item)">
                                            {{ sec_item.name }}
                                            <hoverHandleBtn v-if="sec_item.isHover" :item="sec_item"
                                                            @showeditmodal="editChannel"
                                                            @refresh="refresh" @showaddmodal="addChannel"
                                                            @showdeletemodal="deleteChannel"></hoverHandleBtn>
                                        </div>
                                    </MenuItem>
                                </template>
                            </template>
                        </div>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="20" class="organStructureRight">
                <div class="organStructureRightInner">
                    <div class="organStructureRightBody">
                        <div class="tableContent">
                            <p>当前渠道：{{current_channel?current_channel.name:'请选择左侧渠道'}}</p>
                            <!--表格字段设置-->
                            <Row class="tableSetting">
                                <Col class="dataOperate" span="12">

                                    <p>已选<span class="num">{{selectedNum}}</span>条数据 ：</p>
                                    <p v-show="selectedNum > 0">
                                        <Button @click="editMarketEvent">编辑活动</Button>
                                        <Button @click="deleteMarketEvent" class="btn3">删除活动</Button>
                                    </p>
                                </Col>
                                <Col class="f-j-fe" span="12">
                                    <Button type="info" @click="addMarketEvent" v-if="current_channel">新增活动</Button>
                                </Col>
                            </Row>

                            <!--表格内容-->
                            <Table class="tableData" @on-selection-change="selectChange"
                                   :columns="eventDataColumns" :data="eventData"
                                   border></Table>
                            <!--分页-->
                            <Page :total="pageTotal" show-sizer show-elevator @on-change="pageChange"
                                  @on-page-size-change="pageSizeChange" show-total/>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Modal class="channelModal"
               v-model="addChannelModal"
               title="添加渠道"
               :closable="false"
               :mask-closable="false"
               :loading="addChannelLoading"
               @on-ok="addChannelOnOk('addChannelForm')">
            <i-form ref='addChannelForm' :model="addChannelForm" :rules="addChannelRule" :label-width="100">
                <Form-item label="渠道名" prop="name">
                    <i-input v-model="addChannelForm.name"></i-input>
                </Form-item>
            </i-form>
        </Modal>
        <Modal class="channelModal"
               v-model="editChannelModal"
               title="编辑渠道"
               :closable="false"
               :mask-closable="false"
               :loading="editChannelLoading"
               @on-ok="editChannelOk('editChannelForm')">
            <i-form ref='editChannelForm' :model="editChannelForm" :rules="editChannelRule" :label-width="100">
                <Form-item label="渠道名" prop="name">
                    <i-input v-model="editChannelForm.name"></i-input>
                </Form-item>
            </i-form>
        </Modal>
        <Modal class="channelModal"
               v-model="addMarketEventModal"
               title="添加活动"
               :closable="false"
               :mask-closable="false"
               :loading="addChannelLoading"
               @on-ok="addMarketEventOnOk('addMarketEventForm')">
            <i-form ref='addMarketEventForm' :model="addMarketEventForm" :rules="addMarketEventRule" :label-width="100">
                <Form-item label="活动名称" prop="name">
                    <i-input v-model="addMarketEventForm.name"></i-input>
                </Form-item>
                <Form-item label="活动链接" prop="event_url">
                    <i-input v-model="addMarketEventForm.event_url"></i-input>
                </Form-item>
                <Form-item label="活动截图" prop="event_img">
                    <i-input v-model="addMarketEventForm.event_img"></i-input>
                </Form-item>
                <Form-item label="活动详情" prop="event_desc">
                    <i-input v-model="addMarketEventForm.event_desc" type="textarea"></i-input>
                </Form-item>
            </i-form>
        </Modal>
        <Modal class="channelModal"
               v-model="editMarketEventModal"
               title="编辑活动"
               :closable="false"
               :mask-closable="false"
               :loading="addChannelLoading"
               @on-ok="editMarketEventOnOk('editMarketEventForm')">
            <i-form ref='editMarketEventForm' :model="editMarketEventForm" :rules="editMarketEventRule"
                    :label-width="100">

                <Form-item label="活动名称" prop="name">
                    <i-input v-model="editMarketEventForm.name"></i-input>
                </Form-item>
                <Form-item label="活动链接" prop="event_url">
                    <i-input v-model="editMarketEventForm.event_url"></i-input>
                </Form-item>
                <Form-item label="活动截图" prop="event_img">
                    <i-input v-model="editMarketEventForm.event_img"></i-input>
                </Form-item>
                <Form-item label="活动详情" prop="event_desc">
                    <i-input v-model="editMarketEventForm.event_desc" type="textarea"></i-input>
                </Form-item>
            </i-form>
        </Modal>
    </div>
</template>
<script>
  import {isMenu} from '@/api/common';
  import hoverHandleBtn from '@/components/hoverHandleBtn';

  export default {
    data() {
      return {
        api: {
          channelAPI: this.$store.state.api.channel.channels, //获取渠道列表
          addChannelAPI: this.$store.state.api.channel.addChannel, //新增渠道
          updateChannelAPI: this.$store.state.api.channel.updateChannel, //更新渠道
          deleteChannelAPI: this.$store.state.api.channel.deleteChannel, //删除渠道
          getMarketEventsAPI: this.$store.state.api.channel.getMarketEvents, //获取活动列表
          addMarketEventsAPI: this.$store.state.api.channel.addMarketEvents, //添加活动
          updateMarketEventsAPI: this.$store.state.api.channel.updateMarketEvents, //跟新活动
          deleteMarketEvent: this.$store.state.api.channel.deleteMarketEvents//删除活动
        },
        hasChildren: false,
        parentId: '', //parent_id
        channelList: [],  // 所有渠道
        current_channel: '',
        addChannelModal: false,  //添加渠道弹窗
        editChannelModal: false,  //编辑渠道弹窗
        addChannelLoading: true,  //添加渠道加载
        editChannelLoading: true,  //编辑渠道加载
        addMarketEventModal: false, //添加市场活动
        editMarketEventModal: false,//编辑市场活动
        addChannelForm: {
          name: '',
          parent_id: ''
        },
        editChannelForm: {
          id: '',
          name: '',
        },
        addMarketEventForm: {
          channel_id: '',
          name: '',
          event_url: '',
          event_img: '',
          event_desc: ''
        },
        editMarketEventForm: {
          id: '',
          name: '',
          event_url: '',
          event_img: '',
          event_desc: ''
        },
        addChannelRule: {
          name: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
        },
        editChannelRule: {
          name: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
        },
        addMarketEventRule: {
          name: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
        },
        editMarketEventRule: {
          name: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
        },
        indeterminate: true,
        checkAll: false,
        checkAllGroup: ['香蕉'],
        formItem: {},
        a: '',
        eventDataColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'ID',
            key: 'id'
          },
          {
            title: '活动名称',
            key: 'name'
          },
          {
            title: '活动唯一代码',
            key: 'event_code'
          },
          {
            title: '活动URL',
            key: 'event_url'
          },
          {
            title: '活动截图',
            key: 'event_img'
          },
          {
            title: '活动说明',
            key: 'event_desc'
          }
        ],
        eventData: [],

        // table
        selectedNum: 0, //选择的表格数据个数
        selectionRows: [], //选择的表格数据
        tableSelect: '',
        keywords: '',
        tableSelectList: [],
        pageTotal: 0,
        page: 1,
        size: 10

      }
    },
    mounted() {
      this.getAllChannel();
    },
    methods: {
      isMenu,
      // 获取渠道列表
      getAllChannel() {
        this.$axios.get(this.api.channelAPI).then(res => {
          if (res.data.status == "success") {
            this.channelList = res.data.data;
            this.channelList.forEach(function (item, index) {
              item.isHover = false
              item.all_children.forEach(function (item2, index) {
                item2.isHover = false
                item2.all_children.forEach(function (item3, index) {
                  item3.isHover = false
                })
              })
            })
          } else {
            this.$Notice.error({
              title: '',
              desc: '获取失败',
              duration: 3
            });
          }
        });
      },
      //添加渠道
      addChannel(p_id) {
        this.addChannelModal = true
        this.parentId = p_id;
        this.addChannelForm.parent_id = p_id;
      },
      addChannelOnOk(name) {
        this.addChannelLoading = false;
        this.$refs[name].validate((valid) => {

          if (valid) {

            this.$axios.post(this.api.addChannelAPI, {
              name: this.addChannelForm.name,
              parent_id: this.parentId
            }).then(res => {
              if (res.data.status == "success") {
                this.$Notice.success({
                  title: '',
                  desc: '添加成功',
                  duration: 3
                });
              } else {
                this.$Notice.error({
                  title: '',
                  desc: '添加失败',
                  duration: 3
                });
              }
              this.addChannelModal = false
              this.getAllChannel();
            });
          } else {
            setTimeout(() => {
              this.addChannelLoading = true;
            }, 0);
          }
        });
      },
      // 编辑渠道
      editChannel(id, p_id, item) {

        this.editChannelModal = true
        this.channelId = id;
        this.parentId = p_id;
        this.editChannelForm.name = item.name;
      },

      editChannelOk(name) {

        this.editChannelLoading = false;

        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post(this.api.updateChannelAPI, {
              id: this.channelId,
              name: this.editChannelForm.name,
            }).then(res => {

              if (res.data.status == "success") {
                this.$Notice.success({
                  title: '',
                  desc: '编辑成功！',
                  duration: 3
                });
              } else {
                this.$Notice.error({
                  title: '',
                  desc: '编辑失败',
                  duration: 3
                });
              }
              this.editChannelModal = false
              this.getAllChannel();
            });
          } else {
            setTimeout(() => {
              this.editChannelModal = false
              this.editChannelLoading = true;
            }, 0);
          }
        });
      },
      // 删除渠道
      deleteChannel(id, item) {

        this.$Modal.confirm({
          title: '删除渠道',
          content: '确认删除 [' + item.name + '] 渠道？',
          onOk: () => {
            this.$axios.post(this.api.deleteChannelAPI, {
              id: id
            }).then(res => {
              console.log(res);
              if (res.data.status == "success") {
                this.$Notice.success({
                  title: '',
                  desc: '删除成功',
                  duration: 3
                });
              } else {
                this.$Notice.error({
                  title: '',
                  desc: '删除失败',
                  duration: 3
                });
              }
              this.getAllChannel();
            });
          }
        });
      },
      getMarketEvent(item) {
        if (item) {
          this.current_channel = item;
        }
        this.$axios.get(this.api.getMarketEventsAPI, {
          params: {
            // channel_id:item.id,
            channel_id: this.current_channel.id,
            page: this.page,
            size: this.size
          }
        }).then(res => {
          console.log(res.data.data);
          this.eventData = res.data.data.data;
          this.pageTotal = res.data.data.total;
        });
      },
      addMarketEvent() {
        this.addMarketEventModal = true;
        this.addMarketEventForm.channel_id = this.current_channel.id;
      },
      addMarketEventOnOk() {
        this.$axios.post(this.api.addMarketEventsAPI, this.addMarketEventForm).then(res => {
          if (res.data.status == "success") {
            this.$Notice.success({
              title: '',
              desc: '添加成功',
              duration: 3
            });
            this.getMarketEvent(this.current_channel);
            this.addMarketEventModal = false;
          } else {
            this.$Notice.error({
              title: '',
              desc: '添加失败',
              duration: 3
            });
          }
        })
      },
      editMarketEvent() {
        this.editMarketEventModal = true;
        this.editMarketEventForm.id = this.selectionRows[0].id;
        this.editMarketEventForm.name = this.selectionRows[0].name;
        this.editMarketEventForm.event_url = this.selectionRows[0].event_url;
        this.editMarketEventForm.event_img = this.selectionRows[0].event_img;
        this.editMarketEventForm.event_desc = this.selectionRows[0].event_desc;
      },
      editMarketEventOnOk() {
        this.$axios.post(this.api.updateMarketEventsAPI, this.editMarketEventForm).then(res => {
          if (res.data.status == "success") {
            this.$Notice.success({
              title: '',
              desc: '更新成功',
              duration: 3
            });
            this.getMarketEvent(this.current_channel);
            this.editMarketEventModal = false;

          } else {
            this.$Notice.error({
              title: '',
              desc: '更新失败',
              duration: 3
            });
          }
        })
      },
      deleteMarketEvent() {
        this.$Modal.confirm({
          title: '删除活动',
          content: '确认删除 [' + this.selectionRows[0].name + '] 活动？',
          onOk: () => {
            this.$axios.post(this.api.deleteMarketEvent, {
              market_event_id: this.selectionRows[0].id
            }).then(res => {
              console.log(res);
              if (res.data.status == "success") {
                this.$Notice.success({
                  title: '',
                  desc: '删除成功',
                  duration: 3
                });
              } else {
                this.$Notice.error({
                  title: '',
                  desc: '删除失败',
                  duration: 3
                });
              }
              this.getMarketEvent(this.current_channel);
            });
          }
        });
      },
      hoverOver(item, key, flag) {
        item.isHover = true;
        key <= this.channelList.length - 1 &&
          this.$set(this.channelList, key, this.channelList[key]);
      },
      hoverOut(item, key, flag) {
        item.isHover = false;
        key <= this.channelList.length - 1 &&
          this.$set(this.channelList, key, this.channelList[key]);
      },

      //table选中checkBox的数量
      selectChange(selection) {

        this.selectedNum = selection.length;
        sessionStorage.setItem('selectionRows', selection);
        this.selectionRows = selection;
      },
      menuOnChange(name) {
        console.log(name);
      },
      relationClick() {
        console.log('relationClick')
      },
      //页码改变
      pageChange(page) {
        this.page = page;
        this.getMarketEvent();

      },
      //页码size改变
      pageSizeChange(pageSize) {
        console.log(pageSize);
        this.size = pageSize;
        this.getMarketEvent();
      },
      refresh(res) {
        this.getAllChannel();
        console.log(res);
      },

    },
    components: {
      hoverHandleBtn
    }
  }

</script>
