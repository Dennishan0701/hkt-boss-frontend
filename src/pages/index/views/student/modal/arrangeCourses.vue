<!--排课-->
<template>
    <div>
        <Modal class="mdModal"
               v-model="modal"
               width="500"
               :mask-closable="false"
        >
            <div class='mdModalheader' slot="header">
                <Icon type="ios-paper-plane" color="orange" size="22" style="margin-top: -3px;"/>
                排课
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
                <FormItem label="姓名">
                    <span style="line-height: 34px;height: 34px;font-size: 14px;">{{lead.basic_info_name || lead.class_schedules_name}}</span>
                </FormItem>
                <FormItem label="上课日期" prop="class_planned_date">
                    <DatePicker type="date" v-model="formValidate.class_planned_date" :options="date" transfer
                                @on-change="formValidate.class_planned_date=$event" transfer placeholder="请选择日期"
                                style="width: 120px"></DatePicker>
                </FormItem>
                <FormItem label="开始时间:" prop="class_planned_start_time">
                    <Cascader :data="startTimeData"
                              v-model="startTimeValue"
                              :clearable="false"
                              transfer
                              :render-format="label => label.join(' : ')"
                              @on-change="isClick"
                              style="width: 196px;"></Cascader>
                </FormItem>
                <FormItem label="上课时长:" prop="duration">
                    <RadioGroup v-model="formValidate.duration">
                        <Radio label="45">45min</Radio>
                        <Radio label="60">60min</Radio>
                        <Radio label="90">90min</Radio>
                        <Radio label="120">120min</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
            <Button type="info" class="mdBtn2" @click="handleSubmit('formValidate')">确认</Button>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
  import {timestamp} from '@/api/common';
  export default {
    data() {
      return {
        api: {
          courseScheduling: this.$store.state.api.customers.courseScheduling,
        },
        date: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        id: '',
        lead: '',
        modal: false,
        startTimeList: [],
        endTimeList: [],
        courseTimes: [
          {"value": "07:00"},
          {"value": "07:30"},
          {"value": "08:00"},
          {"value": "08:30"},
          {"value": "09:00"},
          {"value": "09:30"},
          {"value": "10:00"},
          {"value": "10:30"},
          {"value": "11:00"},
          {"value": "11:30"},
          {"value": "12:00"},
          {"value": "12:30"},
          {"value": "13:00"},
          {"value": "13:30"},
          {"value": "14:00"},
          {"value": "14:30"},
          {"value": "15:00"},
          {"value": "15:30"},
          {"value": "16:00"},
          {"value": "16:30"},
          {"value": "17:00"},
          {"value": "17:30"},
          {"value": "18:00"},
          {"value": "18:30"},
          {"value": "19:00"},
          {"value": "19:30"},
          {"value": "20:00"},
          {"value": "20:30"},
          {"value": "21:00"},
          {"value": "21:30"},
          {"value": "22:00"},
          {"value": "22:30"},
          {"value": "23:00"},
          {"value": "23:30"},
          {"value": "24:00"}
        ],
        startTimeValue: [],  //开始时间列表
        startTimeData: [],  //开始时间选中
        formValidate: {
          id: "",
          class_planned_date: "",
          class_planned_start_time: "",
          class_planned_end_time: "",
          duration: ""
        },
        ruleValidate: {
          class_planned_date: [
            {required: true, message: '请选择上课日期', trigger: 'change'}
          ],
          class_planned_start_time: [
            {required: true, message: '请选择开始时间', trigger: 'change'}
          ],
          duration: [
            {required: true, message: '请选择上课时长', trigger: 'change'}
          ],
        },
      }
    },
    computed: {},
    created() {
      let minutes = []
      for (let i = 0; i < 12; i++) {   //开始时间分钟 间隔五分钟
        let num = i * 5 < 10 ? `0${i * 5}` : `${i * 5}`
        minutes.push({
          value: num,
          label: num,
        })
      }

      for (let i = 6; i < 24; i++) { //开始时间小时 6-24
        let num = i < 10 ? `0${i}` : `${i}`
        this.startTimeData.push({
          value: num,
          label: num,
          children: minutes,
        })
      }
    },
    mounted() {
      // this.loadClassTime('start');
    },
    methods: {
      show(lead) {
        this.modal = true;
        this.lead = lead;
        this.id = lead.class_schedules_id;
        //初始化
        this.formValidate.id = lead.class_schedules_id;
        this.formValidate.class_planned_date = "";
        this.formValidate.class_planned_start_time = "";
        this.startTimeValue = [];
        this.formValidate.duration = "";
      },
      changeStartTime(value) {
        this.loadClassTime('end', value);
      },
      loadClassTime(type, range) {
        let _this = this;
        //上课时间开始时间7-23
        if (type === 'start') {
          var list = this.courseTimes;
          list = list.slice(0, list.length - 2);
          _this.startTimeList = list;
        }
        //结束时间只能是开始时间后递延1小时，1.5小时，2小时，只有这三种选择
        if (type === 'end') {
          range = range || '';
          _this.endTimeList = [];
          let i = 0;
          this.courseTimes.forEach((item, index) => {
            if (item.value == range) {
              i = index;
            }
          });
          if (this.courseTimes[i + 2]) {
            _this.endTimeList.push(this.courseTimes[i + 2]);
          }
          if (this.courseTimes[i + 3]) {
            _this.endTimeList.push(this.courseTimes[i + 3]);
          }
          if (this.courseTimes[i + 4]) {
            _this.endTimeList.push(this.courseTimes[i + 4]);
          }
          // _this.endTimeList.push(this.courseTimes[i + 2], this.courseTimes[i + 3], this.courseTimes[i + 4]);
        }
      },
      isClick(value) {  // 开始时间赋值
        console.log(value);
        if (Array.isArray(value)) {
          Object.assign(this.formValidate, {
            class_planned_start_time: value.join(':')
          })
        }
      },
      handleSubmit(name) {//点击确认
        let app = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            let date = this.formValidate.class_planned_date;
            let formatDate = this.moment(date).format('YYYY-MM-DD');
            let times = this.formValidate.class_planned_start_time;
            let dateTime = formatDate + " " + times;
            let chooseTime = this.moment(dateTime).format('x');
            let endDate = this.moment(dateTime).add(Number(this.formValidate.duration), 'm');
            let endHour = endDate.hour() < 10 ? `0${endDate.hour()}` : `${endDate.hour()}`;
            let endMinute = endDate.minute() < 10 ? `0${endDate.minute()}` : `${endDate.minute()}`;
            this.formValidate.class_planned_date = formatDate;
            // this.formValidate.class_planned_end_time = endHour + ":" + endMinute;
            // console.log(this.formValidate.class_planned_end_time);
            timestamp().then(res => {
              let nowTime = res.timestamp;
              if (chooseTime < nowTime) {
                this.$Notice.error({
                  title: '提示',
                  desc: '选择时间已经超过当前时间，无法排课！',
                  duration: 5,
                });
              }
              else if ((endHour > 0 && endHour < 6) || (endHour == 0 && endMinute > 0)) {
                this.$Notice.error({
                  title: '提示',
                  desc: '结束时间不能超过24点！',
                  duration: 5,
                });
              } else {
                app.$axios.post(app.api.courseScheduling, this.formValidate).then(res => {
                  app.$Notice.success({
                    title: '',
                    desc: '排课成功',
                    duration: 4
                  });
                  this.modal = false;
                  this.$emit('reFresh', 'success')
                }).catch(error=>{

                });
              }
            });
          }
        });
      },
    }
  };
</script>

<style lang="less" scoped>
    @import "../../../../../assets/css/vividStandard.less";

    .stuName {
        margin-bottom: 6px;
        .ivu-form-item-label:before {
            content: '*';
            display: inline-block;
            margin-right: 4px;
            line-height: 1;
            font-family: SimSun;
            font-size: 12px;
            color: #ed4014;
        }
    }

    .title_outer {
        padding: 15px 0;
        .title_inner {
            font-size: 14px;
            font-weight: 600;
            color: #2db7f5;
            margin-left: 22px;
            border-bottom: 3px solid #2db7f5;
            border-bottom: 3px solid #2db7f5;
            letter-spacing: 1px;
            padding: 2px 0;
        }
    }

    .mdModal {
        .ivu-modal-wrap {
            .ivu-modal-header {
                border: none;
                .mdModalheader {
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 6px;
                    font-size: 16px;
                    color: #17233d;
                    font-weight: 700;
                }
            }
            .ivu-modal-body {
                padding: 20px !important;
            }
            .ivu-modal-footer {
                /*display: block;*/
            }
            .mdBtn2 {
                display: block;
                margin: 0 auto;
            }
            .lines {
                /*display: flex;*/
                /*width: 700px;*/
                position: relative;
                .ivu-form-item {
                    width: 210px;
                    display: inline-block;
                }
                .blockItem {
                    width: 650px;
                    /*width:100%;*/
                    display: block;
                }
            }
            .labelTitle {
                font-size: 14px;
                color: #abb2bf;
            }
            .addSubject {
                position: absolute;
                right: 40px;
                bottom: 5px;
                color: @primary-color;
                cursor: pointer;
                font-size: 14px;
            }
            /*.block{*/
            /*.ivu-form-item{*/
            /*width: 300px;*/
            /*display: inline-block;*/
            /*}*/
            /*}*/
        }
        .lines2 {
            display: flex;

        }
        .timeTo {
            margin-left: -100px !important;
        }

    }

</style>
