<template>
  <div>
    <!--试听课排课申请弹窗-->
    <Modal
      class="modals arrClassModal"
      width="680"
      v-model="modal"
      :mask-closable="false"
    >
      <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
      <div class="modalCon">
        <p class="modalTitle">试听课排课申请</p>
        <Form
          ref="formValidate"
          :model="formValidate.study_demand"
          :rules="ruleValidate"
          :label-width="100"
          label-position="left"
        >
          <div class="line">
            <FormItem label="姓名：" class="label_name" prop="name">
              <p style="width: 60px;line-height: 32px">{{formValidate.name}}</p>
            </FormItem>
            <!-- <FormItem label="上课时长：">
                          <Select style="width: 90px;" v-model="formValidate.class_hour_comsumption" placeholder="请选择">
                            <Option value="1小时">1小时</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                          </Select>
            </FormItem>-->
            <!-- <FormItem label="正式课频率：">
                          <Select style="width: 90px;" v-model="formValidate.class_frequency" placeholder="请选择">
                            <Option value="1">一周1节</Option>
                            <Option value="2">一周2节</Option>
                            <Option value="3">一周3节</Option>
                            <Option value=">=4">一周4节以上</Option>
                          </Select>
            </FormItem>-->
          </div>
          <FormItem label="课时级别：" prop="class_hour_grade">
            <RadioGroup v-model="formValidate.study_demand.class_hour_grade">
              <Radio
                v-for="(item,index) in options.class_hour_grade"
                :label="parseInt(item.key)"
                :key="index"
              >{{item.value}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="试听课日期：" prop="applied_date">
            <DatePicker
              class="chooseDate"
              type="date"
              placeholder="请选择时间"
              format="yyyy-MM-dd"
              style="width: 160px"
              v-model="formValidate.study_demand.applied_date"
              @on-change="formValidate.study_demand.applied_date=$event"
            ></DatePicker>
          </FormItem>
          <div class="lines2">
            <FormItem label="上课时段" style="width:200px" prop="applied_time_from">
              <Select
                v-model="formValidate.study_demand.applied_time_from"
                @on-change="changeStartTime"
                transfer
                style="width:87px"
              >
                <Option
                  v-for="(item,index) in startTimeList"
                  :key="index"
                  :value="item.value"
                >
                  {{
                  item.value
                  }}
                </Option>
              </Select>
            </FormItem>
            <p style="line-height: 36px;">至</p>
            <FormItem
              label
              style="width:200px;"
              class="timeTo"
              prop="applied_time_to"
            >
              <Select
                v-model="formValidate.study_demand.applied_time_to"
                transfer
                style="width:87px;margin-left: 0px;"
              >
                <Option
                  v-for="(item,index) in endTimeList"
                  :key="index"
                  :value="item.value"
                >
                  {{
                  item.value
                  }}
                </Option>
              </Select>
            </FormItem>
          </div>
          <div class="title_outer">
            <span class="title_inner">学习要求</span>
          </div>
          <div class="line2">
            <FormItem label="上课形式：">
              <RadioGroup v-model="formValidate.study_demand.class_form">
                <Radio label="预习">预习</Radio>
                <Radio label="复习">复习</Radio>
              </RadioGroup>
            </FormItem>
          </div>
          <div class="line3">
            <FormItem label="试听科目：" prop="subject">
              <Select
                style="width: 90px;"
                v-model="formValidate.study_demand.subject"
                placeholder="请选择"
              >
                <Option
                  v-for="(item,index) in options.subject"
                  :value="parseInt(item.key)"
                  :key="index"
                >{{item.value}}</Option>
              </Select>
            </FormItem>
            <FormItem label="年级：" class="label_grade" prop="grade">
              <Select
                v-model="formValidate.study_demand.grade"
                placeholder="请选择年级"
                style="width:90px"
                transfer
              >
                <Option
                  v-for="(item,index) in options.grade"
                  :value="parseInt(item.key)"
                  :key="index"
                >{{item.value}}</Option>
              </Select>
            </FormItem>
            <FormItem label="教材版本：" prop="textbook">
              <Select
                style="width: 90px;"
                v-model="formValidate.study_demand.textbook"
                placeholder="请选择"
              >
                <Option
                  v-for="(item,index) in options.textbook"
                  :value="parseInt(item.key)"
                  :key="index"
                >{{item.value}}</Option>
              </Select>
            </FormItem>
          </div>
          <FormItem label="学习成绩：" class="blockItem">
            <div v-for="school_record in formValidate.school_records">
              <span>得分</span>
              <Input
                class="chooseDate"
                v-model="school_record.initial"
                placeholder
                style="width: 80px;margin-left:10px;margin-right: 20px;"
              />
              <span>总分</span>
              <Input
                class="chooseDate"
                v-model="school_record.total"
                placeholder
                style="width: 80px;margin-left: 10px;margin-right: 30px;"
              />
              <Select
                v-model="school_record.exam_type"
                placeholder="请选择考试类型"
                style="width:130px;"
                transfer
              >
                <Option value="单元测试">单元测试</Option>
                <Option value="期中考试">期中考试</Option>
                <Option value="期末考试">期末考试</Option>
              </Select>
            </div>
          </FormItem>
          <!-- <FormItem label="上传错题："class="blockItem">
                      <Upload class="wrongUpload"
                              ref="upload"
                              action=""
                              :data="leadsParams"
                              :show-upload-list="false"
                              :on-success="handleSuccess"
                              :on-error="handleError"
                              :on-progress="handleProgress"
                              :before-upload="handleBeforeUpload"
                              :headers="{'Content-Type':'application/x-www-data-urlencoded'}"
                      >
                        <Button class="wrongBtn" @click="importLeads" :loading="loadingStatus">上传</Button>
          </Upload>-->
          <!--</FormItem>-->
          <FormItem
            label="试听重点："
            class="blockItem"
            v-if="formValidate.study_demand"
          >
            <Input
              v-model="formValidate.study_demand.keypoints"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="试听重点详细描述"
            />
          </FormItem>
          <FormItem label="学习情況" class="blockItem">
            <CheckboxGroup
              v-model="formValidate.study_demand.learning_situation"
            >
              <Checkbox label="厌学"></Checkbox>
              <Checkbox label="贪玩"></Checkbox>
              <Checkbox label="基础薄弱"></Checkbox>
              <Checkbox label="方法不佳"></Checkbox>
              <Checkbox label="均衡"></Checkbox>
              <Checkbox label="拔高"></Checkbox>
            </CheckboxGroup>
            <Input
              v-model="formValidate.study_demand.desc"
              type="textarea"
              :autosize="{minRows: 3,maxRows: 5}"
              placeholder="学习情况详细描述"
            />
          </FormItem>
          <div class="title_outer">
            <span class="title_inner">老师要求</span>
          </div>
          <FormItem label="性別要求" class="blockItem">
            <RadioGroup v-model="formValidate.teaching_demand.teacher_gender">
              <Radio
                v-for="(item,index) in options.sex"
                :label="parseInt(item.key)"
                :key="index"
              >{{item.value=='未知'?'无要求':item.value}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="授课要求" class="blockItem">
            <Input
              v-model="formValidate.teaching_demand.desc"
              type="textarea"
              :autosize="{minRows: 3,maxRows: 5}"
              placeholder="描述授课要求"
            />
          </FormItem>
          <FormItem label="建议老师：">
            <Input
              class="chooseDate"
              v-model="formValidate.teaching_demand.suggest_teacher"
              placeholder
              style="width: 120px;"
            />
          </FormItem>
          <FormItem
            v-if="modalType=='arrangeExtendedTrial'"
            label="试听类型："
            prop="class_type"
          >
            <RadioGroup v-model="formValidate.study_demand.class_type">
              <Radio :label="3">扩科</Radio>
              <Radio :label="4">换老师</Radio>
            </RadioGroup>
          </FormItem>
          <button
            type="button"
            class="submit"
            @click="handleSubmit('formValidate')"
          >确认</button>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import { formatDate } from '@/api/common.js'

export default {
  data() {
    return {
      api: {
        getFieldOptionsAPI: this.$store.state.api.data_query.getFieldOptions,
        getApplyForTrialClass: this.$store.state.api.trial_class_arrangement
          .applyForTrialClass
      },
      lead: '',
      modal: false,
      loading: false,
      modalType: '',
      formValidate: {},
      ruleValidate: {
        class_hour_grade: [
          {
            type: 'number',
            required: true,
            message: '请选择课时级别',
            trigger: 'change'
          }
        ],
        applied_date: [
          { required: true, message: '请选择试听课日期', trigger: 'change' }
        ],
        applied_time_from: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        applied_time_to: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        subject: [
          {
            type: 'number',
            required: true,
            message: '请选择科目',
            trigger: 'change'
          }
        ],
        grade: [
          {
            type: 'number',
            required: true,
            message: '请选择年级',
            trigger: 'change'
          }
        ],
        // textbook:
        //   [
        //     {type: 'number', required: true, message: '请选择教材版本', trigger: 'change'},
        //   ],
        class_type: [
          {
            type: 'number',
            required: true,
            message: '请选择试听类型',
            trigger: 'blur'
          }
        ]
      },
      options: {},
      startTimeList: [],
      endTimeList: [],
      courseTimes: [
        { value: '07:00' },
        { value: '07:30' },
        { value: '08:00' },
        { value: '08:30' },
        { value: '09:00' },
        { value: '09:30' },
        { value: '10:00' },
        { value: '10:30' },
        { value: '11:00' },
        { value: '11:30' },
        { value: '12:00' },
        { value: '12:30' },
        { value: '13:00' },
        { value: '13:30' },
        { value: '14:00' },
        { value: '14:30' },
        { value: '15:00' },
        { value: '15:30' },
        { value: '16:00' },
        { value: '16:30' },
        { value: '17:00' },
        { value: '17:30' },
        { value: '18:00' },
        { value: '18:30' },
        { value: '19:00' },
        { value: '19:30' },
        { value: '20:00' },
        { value: '20:30' },
        { value: '21:00' },
        { value: '21:30' },
        { value: '22:00' },
        { value: '22:30' },
        { value: '23:00' },
        { value: '23:30' },
        { value: '24:00' }
      ]
    }
  },
  mounted() {
    this.getAllOptions()
    this.loadClassTime('start')
  },
  watch: {
    'formValidate.study_demand.applied_date': {
      handler(curVal, oldVal) {
        let date_obj = new Date(curVal)
        let date_string = formatDate(date_obj, 'yyyy-MM-dd')
        this.$set(this.formValidate.study_demand, 'applied_date', date_string)
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.formValidate = {
        name: '',
        main_id: '',
        study_demand: {
          grade: '',
          subject: '',
          class_hour_grade: '',
          applied_date: '',
          applied_time_from: '',
          applied_time_to: '',
          class_form: '',
          learning_situation: [],
          keypoints: '',
          desc: '',
          class_type: ''
        },
        teaching_demand: {
          teacher_gender: '',
          suggest_teacher: '',
          desc: ''
        },
        school_records: [
          {
            initial: '',
            total: '',
            exam_type: ''
          }
        ],
        class_type: ''
      }
    },
    show(lead, type) {
      this.init()

      this.formValidate.name = lead.basic_info_name;
      this.formValidate.main_id = lead.leads_id || lead.customers_id;
      this.formValidate.study_demand.subject = lead.basic_info_subject
      this.formValidate.study_demand.grade = lead.basic_info_grade
      this.formValidate.study_demand.textbook = lead.basic_info_textbook

      this.modal = true
      this.lead = lead
      this.modalType = type
    },
    cancel() {
      this.modal = false
    },
    getAllOptions() {
      // 获取所有选项
      this.$axios
        .post(this.api.getFieldOptionsAPI, {
          field: ['grade', 'subject', 'textbook', 'class_hour_grade', 'sex']
        })
        .then(res => {
          this.options = res.data.data
        })
    },
    handleSubmit(name) {
      //名单分配弹窗，点击确认
      let app = this
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalType == 'arrangeExtendedTrial') {
            this.formValidate.class_type = this.formValidate.study_demand.class_type
          } else {
            this.formValidate.class_type = 2
          }
          delete this.formValidate.study_demand.class_type //为了表单验证放进去的，现在删除
          app.$axios
            .post(app.api.getApplyForTrialClass, {
              form_data: this.formValidate
            })
            .then(res => {
              if (res.data.status == 'success') {
                app.$Notice.success({
                  title: '',
                  desc: '操作成功',
                  duration: 3
                })
                this.modal = false
                this.$emit('reFresh', 'success')
              } else {
                app.$Notice.error({
                  title: '',
                  desc: '操作失败',
                  duration: 3
                })
              }
            })
        }
      })
    },
    changeStartTime(value) {
      this.loadClassTime('end', value)
    },
    loadClassTime(type, range) {
      let _this = this
      //上课时间开始时间7-23
      if (type === 'start') {
        var list = this.courseTimes
        list = list.slice(0, list.length - 2)
        _this.startTimeList = list
      }
      //结束时间8-24
      if (type === 'end') {
        range = range || ''
        _this.endTimeList = []
        this.courseTimes.forEach((item, index) => {
          if (item.value > range) {
            _this.endTimeList.push(item)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
    letter-spacing: 1px;
    padding: 2px 0;
  }
}

.lines2 {
  display: flex;
}

.timeTo {
  margin-left: -86px !important;
}

.modalCon {
  padding: 36px 20px 44px 30px !important;
  margin-bottom: 20px !important;
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
      margin-left: 425px;
    }
    .lines {
      /*display: flex;*/
      width: 700px;
      .ivu-form-item {
        width: 210px;
        display: inline-block;
      }
      .blockItem {
        width: 650px;
        display: block;
      }
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
