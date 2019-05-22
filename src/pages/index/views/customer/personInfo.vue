<template>
  <div class="personInfo-content">
    <!--面包屑-->
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">个人档案</BreadcrumbItem>
        <BreadcrumbItem>个人档案</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--头部-->
    <div class="personInfo-head">
      <!--左边-->
      <div class="personLeft">
        <div class="action_menu">
          <Dropdown style="margin-left: 20px">
            <Icon type="md-menu" size="20" class="mt-20"/>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="resetPassword">重置密码</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <!-- 未知功能 先注释 -->
        <!-- <template v-if="studentInfo.latest_tracking_record">
          <p class="importantBg"></p>
          <p
            class="important"
          >{{studentInfo.latest_tracking_record?studentInfo.latest_tracking_record.tracking_tag_format:''}}</p>
        </template>-->
        <img v-if="baseInfo.sex === '女'" src="../../../../assets/image/head.png" alt="头像">
        <img v-else src="../../../../assets/image/head.png" alt="头像">
        <p class="personName">
            <Input
              style="width: 100px;"
              v-model="baseInfo.name"
              placeholder="请输入姓名"
              :disabled="caniEdit"
              @on-focus="setInfoCache(baseInfo.name)"
              @on-blur="update('name', baseInfo.name)"
              :maxlength="parseInt(10)"
            />
        </p>
        <p class="personPhone" @click="dialModalShow">
          {{baseInfo.mobile}}
          <i class="iconfont icon-dianhua1"></i>
        </p>
        <p class="operate">
          <Button v-if="isMenu('give_up')" @click="abandon">放弃名单</Button>
          <Select
            v-if="isMenu('add_protection_list')"
            v-model="baseInfo.is_protected"
            @on-change="changeProtect"
            style="width:90px"
          >
            <Option :key="0" :value="0">未保护</Option>
            <Option :key="1" :value="1">已保护</Option>
          </Select>
        </p>
      </div>
      <!--右边-->
      <div class="personRight">
        <div class="personInfo">
          <div>
            <p>
              <!-- 年级 -->
              <span>年级：</span>
              <!--初一-->
              <Select
                class="noneBorder"
                style="width: 100px;"
                v-model="baseInfo.grade"
                placeholder="请选择"
                :disabled="caniEdit"
                @on-focus="setInfoCache(baseInfo.grade)"
                @on-change="update('grade', baseInfo.grade)"
              >
                <Option
                  v-for="(item,index) in fieldOptionsGrade"
                  :value="+item.key"
                  :key="item.value + index"
                >{{item.value}}</Option>
              </Select>
            </p>
            <p>
              <span>QQ：</span>
              <Input
                v-model="baseInfo.qq"
                placeholder="请输入QQ"
                style="width: 100px"
                :disabled="caniEdit"
                @on-focus="setInfoCache(baseInfo.qq)"
                @on-blur="update('qq', baseInfo.qq)"
              />
            </p>
          </div>
          <div>
            <p>
              <span>科目：</span>
              <Select
                class="noneBorder"
                style="width: 100px;"
                v-model="baseInfo.subject"
                placeholder="请选择"
                :disabled="caniEdit"
                @on-focus="setInfoCache(baseInfo.subject)"
                @on-change="update('subject', baseInfo.subject)"
              >
                <Option
                  v-for="(item,index) in fieldOptionsSubject"
                  :value="+item.key"
                  :key="item.value + index"
                >{{item.value}}</Option>
              </Select>
            </p>
            <p>
              <span>微信：</span>
              <Input
                v-model="baseInfo.wechat"
                placeholder="请输入微信"
                style="width: 100px"
                :disabled="caniEdit"
                @on-focus="setInfoCache(baseInfo.wechat)"
                @on-blur="update('wechat', baseInfo.wechat)"
              />
            </p>
          </div>
          <div>
            <p>
              <span>所在地：</span>
              <Input
                v-model="baseInfo.location"
                placeholder="请输入所在地"
                style="width: 100px"
                :disabled="caniEdit"
                @on-focus="setInfoCache(baseInfo.location)"
                @on-blur="update('location', baseInfo.location)"
              />
            </p>
            <!-- <p>
              <span>家长关系：</span>
              <Input v-model="baseInfo.relationship" placeholder="请输入家长关系" style="width: 100px"/>
            </p>-->
          </div>
        </div>
        <ul class="personData">
          <li>
            <p>拨打 (接通 | 总共)</p>
            <p>
              {{statisticsInfo.connected_call_records}} ／
              {{statisticsInfo.total_call_records}}
            </p>
          </li>
          <li>
            <p>试听（试听 | 排课）</p>
            <p>
              {{statisticsInfo.attended_trial_classes}} ／
              {{statisticsInfo.arranged_trial_classes}}
            </p>
          </li>
          <li>
            <p>最后跟进时间</p>
            <p>{{statisticsInfo.latest_traced_at}}</p>
          </li>
          <li>
            <p>来源渠道</p>
            <p>{{statisticsInfo.channel}}</p>
          </li>

          <li>
            <p>购买（成功 | 下单）</p>
            <p>
              {{statisticsInfo.successful_orders}} ／
              {{statisticsInfo.total_orders}}
            </p>
          </li>
          <li>
            <p>推荐次数</p>
            <p todo>{{studentInfo.customer_statics.recommend_times}}</p>
          </li>
          <li>
            <p>课时（剩余 | 总共）</p>
            <p v-if="studentInfo.customer_statics.hours">
              {{statisticsInfo.rest_class_hours}} ／
              {{statisticsInfo.total_class_hours}}
            </p>
          </li>
          <!-- <li>
            <p>标准课时</p>
            <p
              v-if="studentInfo.customer_statics.hours"
            >{{studentInfo.customer_statics.hours.standard[0]}} | {{studentInfo.customer_statics.hours.standard[1]}} | {{studentInfo.customer_statics.hours.standard[2]}}</p>
          </li>
          <li>
            <p>赠送课时</p>
            <p
              v-if="studentInfo.customer_statics.hours"
            >{{studentInfo.customer_statics.hours.giveaway[0]}} | {{studentInfo.customer_statics.hours.giveaway[1]}} | {{studentInfo.customer_statics.hours.giveaway[2]}}</p>
          </li>
          <li>
            <p>补偿课时</p>
            <p
              v-if="studentInfo.customer_statics.hours"
            >{{studentInfo.customer_statics.hours.compensation[0]}} | {{studentInfo.customer_statics.hours.compensation[1]}} | {{studentInfo.customer_statics.hours.compensation[2]}}</p>
          </li>-->
          <li v-if="studentInfo.customer_statics.refund_alarm>1" class="warning">
            <p>预警状态</p>
            <p>{{studentInfo.customer_statics.refund_alarm_format}}</p>
          </li>

          <li class="warning">
            <p>当前负责人</p>
            <p>{{statisticsInfo.current_owner}}</p>
          </li>
          <li class="warning">
            <p>当前可分配人</p>
            <p>{{statisticsInfo.current_allocator}}</p>
          </li>
          <li>
            <p>客户阶段</p>
            <p todo>{{studentInfo.lead_info?studentInfo.lead_info.customer_stage_format:''}}</p>
          </li>
        </ul>
        <ul class="phoneRecord" v-if="iconInfo">
          <li :class="{'active': iconInfo.first_call}">
            <p>
              <Icon type="md-call"/>
            </p>
            <p>首次拨打</p>
          </li>
          <li :class="[{'active': iconInfo.call_connected}]">
            <p>
              <Icon type="md-contacts"/>
            </p>
            <p>已接通</p>
          </li>
          <li :class="{'active': iconInfo.wait_arrange}">
            <p>
              <Icon type="md-build"/>
            </p>
            <p>已调试（待排课）</p>
          </li>
          <li :class="{'active': iconInfo.class_arranged}">
            <p>
              <Icon type="md-calendar"/>
            </p>
            <p>已排课</p>
          </li>
          <li :class="{'active': iconInfo.class_listened}">
            <p>
              <Icon type="md-headset"/>
            </p>
            <p>已试听</p>
          </li>
          <li :class="{'active': iconInfo.order_created}">
            <p>
              <Icon type="md-checkmark-circle-outline"/>
            </p>
            <p>已下单</p>
          </li>
          <li :class="{'active': iconInfo.order_success}">
            <p>
              <Icon type="logo-yen"/>
            </p>
            <p>审核通过</p>
          </li>
          <li :class="{'active': iconInfo.to_cr}">
            <p>
              <Icon type="md-open"/>
            </p>
            <p>移交CR</p>
          </li>
        </ul>
        <ul class="phoneRecord">
          <li>
            <p>
              <Icon type="md-happy"/>
            </p>
            <p>正常</p>
          </li>
          <li>
            <p>
              <Icon type="md-stopwatch"/>
            </p>
            <p>停课</p>
          </li>
          <li>
            <p>
              <Icon type="md-log-out"/>
            </p>
            <p>结课</p>
          </li>
          <li>
            <p>
              <Icon type="md-sad"/>
            </p>
            <p>退费</p>
          </li>
        </ul>
        <ul class="phoneRecord mb-20">
          <li>
            <p>
              <Icon type="ios-create"/>
            </p>
            <p>提交退费</p>
          </li>
          <li>
            <p>
              <Icon type="ios-medkit"/>
            </p>
            <p>CR挽单</p>
          </li>
          <li>
            <p>
              <Icon type="ios-medkit-outline"/>
            </p>
            <p>CC挽单</p>
          </li>
          <li>
            <p>
              <Icon type="md-git-network"/>
            </p>
            <p>BSC审核</p>
          </li>
          <li>
            <p>
              <Icon type="ios-cash"/>
            </p>
            <p>提交财务</p>
          </li>
          <li>
            <p>
              <Icon type="ios-thunderstorm"/>
            </p>
            <p>已退费</p>
          </li>
        </ul>
      </div>
    </div>
    <!--中部-->
    <personalBody ref="personalBody"></personalBody>
    <dialModal ref="dialModal"></dialModal>
  </div>
</template>
<style lang="less">
@import "../../../../assets/css/personInfo.less";
</style>
<style scoped>
@import "border.css";
</style>

<script>
import { isMenu } from "@/api/common";
import personalBody from "./component/personalBody";
import dialModal from "../res/modal/dialModal";
import { mapGetters } from "vuex";
import {
  getBasicInfo,
  statisticsInfo,
  updateInfo,
  getFieldOptions,
  iconStatus
} from "./getData";

export default {
  data() {
    return {
      infoCache: '',
      baseInfo: {},
      iconInfo: {},
      statisticsInfo: {},
      fieldOptionsGrade: [],
      fieldOptionsSubject: [],
      // API 列表
      trackingIndex: this.$store.state.api.customers.studentTrackingIndex, //1、首页跟进记录
      studentInfoAPI: this.$store.state.api.customers.studentInfo, //2、档案信息
      studentDistributionRecordsAPI: this.$store.state.api.customers
        .StudentDistributionRecords, //3.分配记录API
      studentTrackingAPI: this.$store.state.api.customers.studentTrackingList, //4、Tab页跟进记录
      studentSchedulesAPI: this.$store.state.api.customers.studentschedulesList, //5、试听排课记录
      studentOrderListAPI: this.$store.state.api.customers.studentOrderList, //6、订单记录
      resetPasswordAPI: this.$store.state.api.customers.resetPassword, //7、重置密码
      addProtectAPI: this.$store.state.api.lead.addProtect, //添加保护名单
      giveUpAPI: this.$store.state.api.lead.giveup, //放弃名单
      //1、首页
      studentId: "", //别的页面传过来的学生id
      studentInfo: {
        customer_info: {
          id: 1,
          name: "李淑",
          sex: "女",
          mobile: "15069325154",
          mobile_1: null,
          wechat: "4n17w09CUZWapm1IWJYnyvL9RB46on",
          QQ: "69325154",
          grade: "高一",
          subject: "生物",
          textbook: 2,
          location: "贵州",
          channel_id: 18,
          current_global_stage: 3,
          last_sales_stage: 2,
          main_id: 1,
          remark: "goodboy",
          created_at: "2018-12-28 07:12:15",
          updated_at: "2018-12-28 07:32:15",
          deleted_at: null,
          channel: "公众号",
          recomenter: "周三"
        },
        customer_statics: {
          dial_times: 0,
          try_class_times: 0,
          tracking_time: "2018-11-21",
          channel: "公众号",
          purchase_times: 5,
          remainder_class_times: 12,
          refund_alarm: 3
        },
        customer_stage: 5,
        last_tracking_record: {
          id: 2,
          user_id: 2,
          main_id: 1,
          type: 1,
          contact_method: "手机",
          connectivity: "无人接听",
          connectivity_detail: "暂不排课，保持跟进",
          dps: 1,
          refund_alarm: 3,
          remark: "沟通",
          next_follow_up_time: "2018-12-28 15:45:02",
          created_at: "2018-12-28 15:37:32",
          updated_at: null,
          deleted_at: null,
          times: 5,
          try_class_times: 1,
          purchase_times: 5,
          subject: "生物"
        },
        responsible: {
          name: "用户6",
          job_name: "当前cc"
        }
      }, //学生信息
      data: {
        grade: "初一",
        QQ: "11454566996",
        subject: "语文",
        weixin: "1222332558588",
        address: "乌鲁木齐",
        relation: "母亲"
      },
      is_protected: 0,
      overNum: -1,
      //首页下半部分
      trackingList: [],
      last_record: ""
    };
  },
  created() {
    this.caniEdit = !this.isMenu('edit_basic_information');
  },
  computed: {
    ...mapGetters(["fetchModal"])
  },
  watch: {
    fetchModal(value) {
      //console.log(this.$store.state.fetchmodalType,!value);
      if (value == "false" && this.$store.state.fetchmodalType == "dialModal") {
        // this.getTrackingIndex();
        //console.log(this.$store.state.fetchmodalType,1222332558588);
      }
    }
  },
  async mounted() {
    //console.log(this.$route.query.id);
    this.fieldOptionsGrade = await getFieldOptions("grade");
    this.fieldOptionsSubject = await getFieldOptions("subject");
    this.studentId = this.$route.query.id;
    sessionStorage.setItem("tab_status", this.$route.query.tab_status);
    // this.getStudentInfo();
    // this.getTrackingIndex();
    this.baseInfo = await getBasicInfo(this.$route.query.id);
    this.statisticsInfo = await statisticsInfo(this.$route.query.id);
    this.iconInfo = await iconStatus(this.$route.query.id);
    // this.iconsInfo = await iconStatus(this.$route.query.id);
    // console.log('this.statisticsInfo', JSON.stringify(await statisticsInfo(this.$route.query.id)))
  },
  methods: {
    setInfoCache(val) {
      this.infoCache = val;
    },
    changeProtect(val, isSelectChange = true) {
      const app = this;
      app.$Modal.confirm({
        title: val ? "添加保护名单" : '放弃名单',
        content: `<span class="trashText">确认将</span>
          <span class="trashNames">${ app.baseInfo.name }</span>
          <span class="trashText">${ val ? '添加到保护名单吗' : '丢回线索公海' }？</span>`,
        onOk: function() {
          const postData = {}
          postData[`${val ? 'main_id' : 'lead_ids'}`] = [app.studentId]
          app.$axios
            .post(app[val ? "addProtectAPI" : "giveUpAPI"], postData)
              .then(
                res => {
                  app.$Notice.success({
                    title: "",
                    desc: val ? "添加成功" : "放弃名单成功",
                    duration: 3
                  });
                  if (!isSelectChange) {
                    app.baseInfo.is_protected = 1 - app.baseInfo.is_protected;
                  }
                },
                err => {
                  if (isSelectChange) {
                    app.baseInfo.is_protected = 1 - app.baseInfo.is_protected;
                  }
                }
              );
        }
      });
    },
    update(type, val) {
      const nameREG = /^[\u4e00-\u9fa5A-Za-z0-9]{0,10}$/; //中文或英文或数字，不超过10位
      if (type === 'name') {
        if (val === '' || !nameREG.test(val)) {
          this.$Notice.error({ desc: ((val === '') ? '姓名不能为空' : '请输入中文或英文'), duration: 3 });
          this.baseInfo.name = this.infoCache;
          return;
        }
      }
      if (val !== this.infoCache) {
        updateInfo(this.studentId, type, val);
      }
    },
    isMenu,
    dialModalShow() {
      //点击拨打电话，拨打电话弹窗显示
      sessionStorage.setItem("studentPhone", this.baseInfo.mobile);
      sessionStorage.setItem("studentID", this.studentId);
      this.$refs.dialModal.show(); //父组件引用子组件中的show方法
    },
    //1、首页
    // getStudentInfo() {//获取学生档案信息
    //   this.$axios.get(this.studentInfoAPI, {
    //     params: {
    //       id: this.studentId
    //     }
    //   }).then(res => {
    //     this.studentInfo = res.data.data;
    //   });
    // },
    getTrackingIndex() {
      //获取首页（跟进记录）
      this.$axios
        .get(this.trackingIndex, {
          params: {
            id: this.studentId
          }
        })
        .then(res => {
          this.trackingList = res.data.data;
        });
    },
    overNums(index, index2) {
      //备注展开或隐藏
      if (this.overNum == index + "-" + index2) {
        this.overNum = -1;
      } else {
        this.overNum = index + "-" + index2;
      }
    },
    seeMore(remark) {
      if (remark.length > 58) {
        return true;
      } else {
        return false;
      }
    },

    resetPassword() {
      this.$Modal.confirm({
        title: "重置密码",
        content: "<p>确认要进行此操作吗？</p>",
        onOk: () => {
          this.$axios
            .get(this.resetPasswordAPI, {
              params: {
                id: this.studentId
              }
            })
            .then(res => {
              this.$Notice.success({
                title: "",
                desc: "操作成功",
                duration: 3
              });
            });
        }
      });
    },
    abandon() {
      if (this.baseInfo.is_protected) {
        this.changeProtect(0, false);
      }
    }
  },
  components: {
    personalBody,
    dialModal
  }
};
</script>

<style lang="less">
.personInfo-content {
  .personInfo-head .personRight .personData li p {
    &:nth-child(2) {
      font-size: 12px;
    }
  }
  .ivu-select-disabled .ivu-select-selection,
  .ivu-input[disabled], fieldset[disabled] .ivu-input {
    background: none;
    cursor: default!important;
  }
}
.personName {
  .ivu-input {
    border: none;
    text-align: center;
    color: #515a6e!important;
  }
}
</style>

