<!--安排课程计划表-->
<template>
    <div>
        <Modal class="mdModal"
               v-model="modal"
               width="720"
               :mask-closable="false"
        >
            <div class='mdModalheader' slot="header">
                <Icon type="ios-paper-plane" color="orange" size="22" style="margin-top: -3px;"/>
                <span v-if="modalType=='arrangeCoursePlan'">安排课程计划表</span>
                <span v-if="modalType=='addCoursePlan'">新增课程计划表</span>
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
                <div class="part">
                    <div class="lines">
                        <FormItem label="姓名" prop="name">
                            <span style="line-height: 34px;height: 34px;font-size: 14px;">{{formValidate.name}}</span>
                        </FormItem>
                        <FormItem label="年级" prop="grade">
                            <Select v-model="formValidate.grade" placeholder="请选择年级" style="width:120px" transfer
                                    @on-change="gradeChange">
                                <Option v-for="(item,index) in options.grade" :value="parseInt(item.key)" :key="index">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="在读科目" prop="subject">
                            <Select v-model="formValidate.subject" style="width:120px" placeholder="请选择科目"
                                    @on-change="subjectChange">
                                <Option v-for="(item,index) in options.subject" :value="parseInt(item.key)"
                                        :key="index">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="教材版本" prop="textbook">
                            <Select v-model="formValidate.textbook" placeholder="请选择教材" style="width:120px"
                                    transfer>
                                <Option v-for="(item,index) in options.textbook" :value="parseInt(item.key)"
                                        :key="index">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="课时级别" prop="class_hour_grade">
                            <Select v-model="formValidate.class_hour_grade" placeholder="请选择课时级别" style="width:120px"
                                    transfer>
                                <Option v-for="(item,index) in options.class_hour_grade" :value="parseInt(item.key)"
                                        :key="index">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="上课频率">
                            <Select v-model="formValidate.class_frequency" placeholder="请选择上课频率"
                                    style="width:120px;" transfer>
                                <Option v-for="(item,index) in options.class_frequency" :value="parseInt(item.key)"
                                        :key="index">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="初始成绩" class="blockItem">
                            <Input v-model="formValidate.school_records.initial" placeholder=""
                                   style="width: 80px;margin-right: 20px;"/>
                            <span class="labelTitle">目标成绩</span>
                            <Input v-model="formValidate.school_records.target" placeholder=""
                                   style="width: 76px;margin-left: 10px;margin-right: 30px;"/>
                            <span class="labelTitle">总分</span>
                            <Input v-model="formValidate.school_records.total" placeholder=""
                                   style="width: 76px;margin-left: 10px;margin-right: 30px;"/>
                            <Select v-model="formValidate.school_records.exam_type" placeholder="请选择考试类型"
                                    style="width:120px;" transfer>
                                <Option value="月考">月考</Option>
                                <Option value="期中">期中</Option>
                                <Option value="期末">期末</Option>
                                <Option value="单元测试">单元测试</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="首课日期" class="blockItem">
                            <DatePicker type="date" v-model="formValidate.first_lesson_date" :options="date"
                                        @on-change="formValidate.first_lesson_date=$event" placeholder="请选择日期" style="width: 120px"></DatePicker>
                        </FormItem>
                        <FormItem label="首课时段" style="width:350px" class="blockItem">
                            <Select v-model="formValidate.first_lesson_start_time" @on-change="changeStartTime" transfer
                                    style="width:87px">
                                <Option v-for="(item,index) in startTimeList" :key='index' :value="item.value">{{
                                    item.value }}
                                </Option>
                            </Select>
                            &nbsp;至&nbsp;
                            <Select v-model="formValidate.first_lesson_end_time" style="width:87px">
                                <Option v-for="(item,index) in endTimeList" :key='index' :value="item.value">{{
                                    item.value }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="上课时段" class="blockItem">
                            <Input v-model="formValidate.attend_class_time_frame" type="textarea"
                                   :autosize="{minRows: 3,maxRows: 5}" placeholder="上课时段"/>
                        </FormItem>
                        <FormItem label="课程计划" class="blockItem">
                            <Input v-model="formValidate.curriculum_plan" type="textarea"
                                   :autosize="{minRows: 3,maxRows: 5}" placeholder="课程计划"/>
                        </FormItem>
                        <FormItem v-if="modalType=='addCoursePlan'" label="计划类型" prop="apply_type">
                            <RadioGroup v-model="formValidate.apply_type" style="width: 300px">
                                <!--标准计划隐藏-->
                                <Radio v-if="item.key!=1" v-for="(item,index) in options.apply_type" :label="parseInt(item.key)"
                                       :key="index">{{item.value}}
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                </div>
            </Form>
            <Button type="info" class="mdBtn" @click="handleSubmit('formValidate')">确认</Button>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        api: {
          getFieldOptionsAPI: this.$store.state.api.data_query.getFieldOptions,
          getClassGroupAPI: this.$store.state.api.data_query.getClassGroup,
          arrangeAPI: this.$store.state.api.customers.arrange,
        },
        date: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        id: '',
        lead: '',
        modal: false,
        loading: false,
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
        formValidate: {
          main_id: "",
          name: "",
          grade: "",
          subject: "",
          textbook: "",
          school_records: {
            exam_type: "",
            initial: "",
            target: "",
            total: ""
          },
          class_hour_grade: "",
          class_frequency: "",
          first_lesson_date: "",
          first_lesson_start_time: "",
          first_lesson_end_time: "",
          attend_class_time_frame: "",
          curriculum_plan: "",
          apply_type:""
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'},
          ],
          subject: [
            {type: 'number', required: true, message: '请选择科目', trigger: 'change'},
          ],
          grade: [
            {type: 'number', required: true, message: '请选择年级', trigger: 'change'},
          ],
          textbook: [
            {type: 'number', required: true, message: '请选择教材版本', trigger: 'change'},
          ],
          class_hour_grade: [
            {type: 'number', required: true, message: '请选择课时级别', trigger: 'change'},
          ],
          apply_type: [
            {type: 'number', required: true, message: '请选择计划类型', trigger: 'change'},
          ],
        },
        options: {},
        gradeList: [],
        subjectList: [],
        classHourList: [],
        modalType:"",
      }
    },
    watch: {
      modal(val) {
        if (!val) this.$refs.formValidate.resetFields()
      }
    },
    mounted() {
      this.getAllOptions();
      this.loadClassTime('start');
    },
    methods: {
      show(lead,modalType) {
        this.modal = true;
        this.modalType = modalType;
        this.lead = lead;
        this.id = lead.basic_info_main_id||lead.basic_info_id||lead.class_schedules_id;
        this.getClassGroup(this.id);
        this.formValidate.main_id = this.id;
        this.formValidate.name = lead.basic_info_name||lead.class_schedules_name;
        // this.formValidate.subject = lead.basic_info_subject;
        // this.formValidate.grade = lead.basic_info_grade;
        // this.formValidate.textbook = lead.basic_info_textbook;
      },
      getAllOptions() {// 获取所有选项
        this.$axios.post(this.api.getFieldOptionsAPI, {
            "field": [
              'class_frequency',
              'apply_type',
              'textbook',
              'grade',
              'subject',
              'class_hour_grade'
            ]
          }).then(res => {
            this.options = res.data.data;
          });
      },
      // 获取可选择的年级
      getClassGroup(id) {
        // this.$axios.get(this.api.getClassGroupAPI, {
        //   params: {
        //     main_id: id
        //   }
        // }).then(res => {
        //   this.options.grade = res.data.data;
        // });
      },
      // 获取可选择的科目
      gradeChange(val) {
        // this.gradeList.forEach((item, index) => {
        //   if (item.key == val) {
        //     this.options.subject = item.subject;
        //   }
        // });
      },
      // 获取可选择的课时等级
      subjectChange(val) {
        // this.subjectList.forEach((item, index) => {
        //   if (item.key == val) {
        //     this.options.class_hour_grade = item.class_hour_grade;
        //   }
        // });
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
        //结束时间8-24
        if (type === 'end') {
          range = range || '';
          _this.endTimeList = [];
          this.courseTimes.forEach((item, index) => {
            if (item.value > range) {
              _this.endTimeList.push(item);
            }
          });
        }
      },
      handleSubmit(name) {//名单分配弹窗，点击确认
        let app = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            app.$axios.post(app.api.arrangeAPI, this.formValidate).then(res => {
              if (res.data.status == "success") {
                app.$Notice.success({
                  title: '',
                  desc: '安排成功',
                  duration: 4
                });
                this.modal = false;
                this.$emit('reFresh', 'success')
              } else {
                app.$Notice.error({
                  title: '',
                  desc: '安排失败',
                  duration: 4
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
            .mdBtn {
                margin-right: 27px;
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
    }

</style>
