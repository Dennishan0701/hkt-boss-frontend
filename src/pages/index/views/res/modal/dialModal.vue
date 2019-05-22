<template>
  <div>
    <!--拨打电话弹窗-->
    <Modal v-model="isShow" class="modals dialModal" :width="modalWidth" :mask-closable="false">
      <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
      <div class="modalCon">
        <div class="left" v-if="dialInfo">
          <p class="position">
            {{dialInfo.basic_info.grade_format}} / {{dialInfo.basic_info.subject_format}}
            {{ `${dialInfo.channel ? ' /' + dialInfo.channel.name : ''}` }}
          </p>
          <div class="stuInfo">
            <p class="stuName">{{dialInfo.basic_info.name}}</p>
            <p class="stuPhone">{{dialInfo.basic_info.mobile}}</p>
            <p class="stuPhone">{{addrr}}</p>
            <div class="dialBg">
              <div v-show="iscallUp" id="loading-center-absolute">
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
              </div>
              <p class="dialPhone" :class="{dialing:isCalling}" @click="callUp"></p>
            </div>
            <p
              v-if="!isCalling"
              class="stuAddress"
            >{{ dialInfo.basic_info.mobile_province }} {{ dialInfo.basic_info.mobile_city }}</p>
            <p v-else class="callTime">{{timeString}}</p>
          </div>
          <ul class="dialRecord" v-if="latestTrackingRecords.length">
            <li v-for="(record, index) in latestTrackingRecords" :key="index">
              <p class="dialTime">
                {{record.created_at}}
                <span>{{record.operator}}</span>
              </p>
              <p class="dialResult">
                {{record.connectivity}} |
                {{record.connectivity_detail}}
              </p>
              <p class="dialResult">{{record.remark}}</p>
            </li>
          </ul>
          <ul class="dialRecord" v-else>
            <li>
              <p class="dialTime" style="text-align:center;">
                -- 暂无跟进记录 --
              </p>
            </li>
          </ul>
        </div>
        <div class="center">
          <Form>
            <FormItem label="线路" v-if="isMenu('select_lines')">
              <Select v-model="contact_line" style="width:90px">
                <Option :key="1" :value="1" >融营</Option>
                <Option :key="2" :value="2" >天润</Option>
              </Select>
            </FormItem>
          </Form>
          <p class="label">操作：{{auth_user.role_format}}</p>
          <Form
            ref="formItem"
            :model="formItem"
            :rules="ruleItem"
            :label-width="100"
            label-position="left"
          >
            <FormItem label="联系方式" prop="contact_method">
              <Select v-model="formItem.contact_method" style="width:90px">
                <Option
                  v-for="item in options.contact_method"
                  :key="item.value"
                  :value="item.value"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="接通状态" prop="connectivity" v-if="formItem.contact_method ==1">
              <Select v-model="formItem.connectivity" style="width:120px">
                <Option
                  v-for="item in options.connectivity"
                  :key="item.value"
                  :value="item.value"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem
              label="接通细节"
              prop="connectivity_detail"
              v-if="auth_user.real_role_format =='CC' && formItem.contact_method ==1 "
            >
              <Select v-model="formItem.connectivity_detail" style="width:120px">
                <Option
                  v-for="(item,index) in conDetailList"
                  :value="item.value"
                  :key="index"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem
              label="退费预警状态"
              prop="refund_alarm"
              v-if="auth_user.real_role_format =='TR' || auth_user.real_role_format =='CR'"
            >
              <Select v-model="formItem.refund_alarm" style="width:120px">
                <Option v-for="item in options.refund_alarm" :key="item.key" :value="item.key">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="记录" class="twoLevel" prop="remark">
              <Input
                v-model="formItem.remark"
                type="textarea"
                :autosize="{minRows: 4,maxRows: 6}"
                style="width: 330px;margin-left: 0;"
                placeholder="请填写沟通备注信息"
              />
            </FormItem>
            <FormItem label="下次跟进时间" class="twoLevel" prop="next_follow_up_time">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                :editable=false
                :options="datePickerOpt"
                v-model="formItem.next_follow_up_time"
                placeholder="选择日期时间"
                style="width: 160px"
                @on-change="formItem.next_follow_up_time=$event"
              ></DatePicker>
            </FormItem>
            <FormItem label="优先级标签" class="twoLevel">
              <RadioGroup v-model="formItem.tracking_tag">
                <Radio
                  v-for="tag in options.tracking_tag"
                  :label="tag.value"
                  :key="tag.value"
                  :value="tag.value"
                >{{ tag.name }}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="转化阶段" prop="dps" v-if="false">
              <Select v-model="formItem.dps" style="width:90px">
                <Option v-for="dp in options.dps" :key="dp.value" :value="dp.value">{{ dp.name }}</Option>
              </Select>
            </FormItem>

            <button type="button" class="submit" @click="submitTrackingRecord('formItem')">确定</button>
          </Form>
        </div>
        <div class="right">
          <p class="filesShow">
            <span @click="fileShow" v-if="modalWidth==620">
              相关文件
              <i class="iconfont icon-yuanjiaojuxingkaobei1"></i>
            </span>
            <span @click="fileShow" v-else-if="modalWidth==820">
              收起
              <i class="iconfont icon-yuanjiaojuxingkaobei"></i>
            </span>
          </p>
          <div class="relatedFiles" v-if="modalWidth==820">
            <p class="search">
              <Input style="width:120px" v-model="keywords" placeholder="搜索相关文件"/>
              <Button class="btn4">
                <i class="iconfont icon-sousuo"></i>
              </Button>
            </p>
            <ul class="relatedFiles2">
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
            </ul>
            <div class="activeFile">
              <p class="activeTit">常用文件</p>
              <p>话术工具v.123</p>
              <p>2018-12-01 价格表</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style lang="less">
@import "../../../../../assets/css/modal.less";
</style>
<script>
import RULE from "@/api/infoRule";
import Bus from "../../customer/bus.js";
import { getFieldOptions } from "../../customer/getData.js";
import {isMenu} from '@/api/common';
const formatFields = fields =>
  fields.map(field => ({
    name: field.value,
    value: parseInt(field.key)
  }));
const callTypeMap = {
  '1': 'rongying',
  '2': 'tianrun'
}

export default {
  data() {
    return {
      addrr: '',
      datePickerOpt: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      isSubmiting: false,
      contact_line: 2,
      options: {},
      sec: 0,
      timeString: "0:00:00",
      dialInfoAPI: this.$store.state.api.phone.pannel_info, // 拨打基本信息API
      latestTrackingRecordsAPI:
        this.$store.state.latestTrackingRecords_1 +
        sessionStorage.getItem("studentID") +
        this.$store.state.latestTrackingRecords_2,
      callUpAPI: this.$store.state.callUp, //拨打电话弹窗点击确定
      createTrackingRecord_1: this.$store.state.createTrackingRecord_1, //
      createTrackingRecord_2: this.$store.state.createTrackingRecord_2, //
      isShow: false,
      modalWidth: 620,
      //1、拨打电话
      keywords: "",
      model1: 0,
      clickOK: this.$store.state.clickOK,
      dialInfo: "", //拨打基本信息
      latestTrackingRecords: "",
      iscallUp: false, //点击拨打电话
      isCalling: false, //接通状态
      isDailing: false, // 拨号中
      sid: "", //挂断电话参数
      formItem: {
        contact_method: 1,
        remark: "",
        next_follow_up_time: "",
        dps: "",
        connectivity: "",
        connectivity_detail: "",
        refund_alarm: 1
      },
      ruleItem: {
        contact_method: [
          {
            required: true,
            type: "number",
            message: "请选择联系方式",
            trigger: "change"
          }
        ],
        // next_follow_up_time: [
        //   {
        //     required: true,
        //     message: "请选择下次跟进时间",
        //     trigger: "change"
        //   }
        // ],
        dps: [
          {
            required: true,
            type: "number",
            message: "请选择转化阶段",
            trigger: "change"
          }
        ],
        connectivity: [
          {
            required: true,
            type: "number",
            message: "请选择接通状态",
            trigger: "change"
          }
        ],
        connectivity_detail: [
          {
            required: true,
            type: "number",
            message: "请选择联系状态",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: true,
            type: "string",
            message: "请填写学习需求",
            trigger: "blur"
          }
          // {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
        ]
      }
    };
  },
  props: [], //父组件传送过来的组件数组
  computed: {
    auth_user() {
      return JSON.parse(sessionStorage.getItem("auth_user"));
    },
    conDetailList() {
      let min, max
      if (this.formItem.connectivity == 0) {
        min = 0
        max = 7
      } else {
        min = 7
        max = 17
      }
      return this.options.connectivity_detail.sclice(min, max)
    },
    dialCalAPI() {
      return this[`${callTypeMap[this.contact_line]}API`].dial;
    },
    hangUpCallAPI() {
      return this[`${callTypeMap[this.contact_line]}API`].hangup;
    },
  },
 async mounted() {

  },
  watch: {
    sec(value) {
      var secondTime = parseInt(value); // 秒
      var minuteTime = 0; // 分
      var hourTime = 0; // 小时
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      this.timeString = `${hourTime}:${
        minuteTime < 10 ? "0" + minuteTime : minuteTime
      }:${secondTime < 10 ? "0" + secondTime : secondTime}`;
    },
    isShow(show) {
      if (!show) {
        this.formItem = {
          contact_method: 1,
          remark: "",
          next_follow_up_time: "",
          dps: "",
          connectivity: "",
          connectivity_detail: "",
          refund_alarm: 1
        }
      }
    }
  },
  async created() {
    const opts = await this.getOptions();
    if (opts) {
      for (let key in opts) {
        this.options[key] = formatFields(opts[key])
      }
    }
    this.rongyingAPI = {
      dial: this.$store.state.rongyingCall,
      hangup: this.$store.state.rongyingHangUpCall,
    };
    this.tianrunAPI = {
      dial: this.$store.state.tianrunCall,
      hangup: this.$store.state.tianrunHangUpCall,
    };
  },
  methods: {
    async lalla() {
      try {
        console.log()
        const res = await this.$axios
        .post('/common/show_region', {
          main_id: sessionStorage.getItem("studentID")
        })
        const { data:{code,status,data: {province ='', city = ''}={}}={}} = res
        if (code ===200 && status === "success") {
          return province + ' ' + city
        }
        console.log('res', res)
        return 'err'
      } catch (error) {
        console.log(error)
        return 'err2'
      }
    },
    isMenu,
    async getOptions() {
      try {
        return await getFieldOptions([
          'contact_method',
          'connectivity',
          'connectivity_detail',
          'refund_alarm',
          'dps',
          'tracking_tag',
        ])
      } catch (error) {
        console.log(error)
      }
    },
    timedCount() {
      this.sec += 1;
      this.mark = setTimeout(() => {
        this.timedCount();
      }, 1000);
    },
    timedStop() {
      clearTimeout(this.mark);
      this.sec = 0;
    },
    show() {
      this.isShow = true;
      this.getDialInfo();
      this.getLatestTrackingRecords();
    },
    async getDialInfo() {
      this.$axios
        .post(this.dialInfoAPI, { id: sessionStorage.getItem("studentID") })
        .then(res => {
          this.dialInfo = res.data.data;
        });
      this.addrr = await this.lalla()
    },
    getLatestTrackingRecords() {
      this.$axios
        .post(this.latestTrackingRecordsAPI, {
          count: 6,
          main_id: sessionStorage.getItem("studentID")
        })
        .then(res => {
          this.latestTrackingRecords = res.data.data;
        });
    },
    ok() {
      this.$store.commit("FETCH_MODAL", "false");
      this.isShow = false;
      this.clickOK = this.clickOK + 1;
      this.$store.commit("CLICK_OK", this.clickOK); //点击确定
    },
    cancel() {
      //关闭弹窗
      this.$store.commit("FETCH_MODAL", "false");
      this.isShow = false;
      this.$store.commit("CLICK_OK", 0);
    },
    fileShow() {
      //相关文件展开隐藏
      this.modalWidth = this.modalWidth == 820 ? 620 : 820;
    },
    //拨打弹窗
    callUp() {
      if (this.isDailing || this.isCalling) {
        this.hangUp();
      } else {
        this.call();
      }
    },
    call() {
      //开始拨号
      this.isDailing = true;
      this.iscallUp = true;
      this.$axios
        .post(this.dialCalAPI, {
          voip_account: "80328000000008",
          tophone: sessionStorage.getItem("studentPhone"),
          main_id: sessionStorage.getItem("studentID")
        })
        .then(res => {
          this.isDailing = false;
          this.isCalling = true; //接通
          this.iscallUp = false; //拨打中隐藏
          this.timedCount();
          this.sid = res.data.data;
        })
        .catch(e => {
          this.isDailing = false;
          this.isCalling = false;
          this.iscallUp = false;
          this.timedStop();
        });
    },
    hangUp() {
      //挂断电话
      this.$axios
        .post(this.hangUpCallAPI, {
          sid: this.sid
        })
        .then(res => {
          this.isCalling = false; //接通
          // this.iscallUp = false;//拨打中隐藏
          this.timedStop();
        })
        .catch(e => {
          console.log("挂断失败", e);
          this.isCalling = false;
          this.timedStop();
        });
    },
    submitTrackingRecord(name) {
      //拨打弹窗点击确定
      if (!this.isSubmiting) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.isSubmiting = true;
            //console.log (this.formItem);
            this.$axios
              .post(
                this.createTrackingRecord_1 +
                  sessionStorage.getItem("studentID") +
                  this.createTrackingRecord_2,
                this.formItem
              )
              .then(res => {
                this.isSubmiting = false;
                this.$Message.success("提交成功!");
                this.$store.commit("FETCH_MODAL", "false");
                this.isShow = false;
                this.$emit("tracking"); //子组件传父组件刷新首页添加记录
                Bus.$emit("tracking"); //两个子组件通信-传到中转站
                // this.$router.go(0)
                this.$emit('reFresh', 'success')
              });
          } else {
            this.$Message.error("必填项不能为空!");
          }
        });
      }
      }
  },
  destroyed() {}
};
</script>
