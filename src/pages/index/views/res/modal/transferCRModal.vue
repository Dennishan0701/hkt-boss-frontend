<!--移交CR弹窗-->
<template>
    <div>
        <Modal class="mdModal"
               v-model="modal"
               width="810"
               :mask-closable="false"
        >
            <div class='mdModalheader' slot="header">
                <Icon type="ios-paper-plane" color="orange" size="22" style="margin-top: -3px;"/>
                移交CR
            </div>
            <Form ref="formValidate" :model="formValidate.basic_info" :rules="ruleValidate" :label-width="110">
                <div class="part">
                    <div class="title_outer">
                        <span class="title_inner">基本情况</span>
                    </div>
                    <div class="lines">
                        <FormItem label="姓名">
                            <span style="line-height: 34px;height: 34px;font-size: 14px;">{{name}}</span>
                        </FormItem>
                        <FormItem label="年级" prop="grade">
                            <Select v-model="formValidate.basic_info.grade" placeholder="请选择年级" style="width:120px"
                                    transfer>
                                <Option v-for="(item,index) in options.grade" :value="parseInt(item.key)" :key="index">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="性別">
                            <RadioGroup v-model="formValidate.basic_info.sex" style="width: 200px">
                                <Radio v-for="(item,index) in options.sex" :label="parseInt(item.key)"
                                       :key="index">{{item.value}}
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="所在省" prop="province">
                            <Select v-model="formValidate.basic_info.province" style="width:120px"
                                    placeholder="请选择省" transfer @on-change="getCitys">
                                <Option v-for="(item,index) in provinceList" :value="parseInt(item.region_code)"
                                        :key="index">
                                    {{item.region_name}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="所在市" prop="city">
                            <Select v-model="formValidate.basic_info.city" style="width:120px"
                                    placeholder="请选择市" transfer @on-change="getAreas">
                                <Option v-for="(item,index) in cityList" :value="parseInt(item.region_code)"
                                        :key="index">
                                    {{item.region_name}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="所在区/县" prop="county">
                            <Select v-model="formValidate.basic_info.county" style="width:120px"
                                    placeholder="请选择所在区/县" transfer>
                                <Option v-for="(item,index) in areaList" :value="parseInt(item.region_code)"
                                        :key="index">
                                    {{item.region_name}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="所在学校 ">
                            <Input v-model="formValidate.basic_info.school" placeholder="" style="width:120px"/>
                        </FormItem>
                        <!--<FormItem v-if="formValidate.basic_info.grade>7" label="文/理科 ">-->
                        <!--<Input v-model="formValidate.basic_info.total" placeholder="" style="width:120px"/>-->
                        <!--</FormItem>-->
                    </div>
                </div>

                <!--<div class="part">-->
                <!--<div class="title_outer">-->
                <!--<span class="title_inner">成绩情况</span>-->
                <!--</div>-->
                <!--<div class="lines">-->
                <!--<template v-for="(item,index) in formValidate.school_records">-->
                <!--<FormItem :label=indexNum(index)>-->
                <!--<Select v-model="item.subject" style="width:120px"-->
                <!--placeholder="请选择科目">-->
                <!--<Option v-for="(item,index) in options.subject" :value="parseInt(item.key)"-->
                <!--:key="index">-->
                <!--{{item.value}}-->
                <!--</Option>-->
                <!--</Select>-->
                <!--</FormItem>-->
                <!--<FormItem label="教材版本" >-->
                <!--<Select v-model="item.textbook" placeholder="请选择教材" style="width:120px"-->
                <!--transfer>-->
                <!--<Option v-for="(item,index) in options.textbook" :value="parseInt(item.key)"-->
                <!--:key="index">-->
                <!--{{item.value}}-->
                <!--</Option>-->
                <!--</Select>-->
                <!--</FormItem>-->
                <!--<FormItem label="初始成绩" class="blockItem">-->
                <!--&lt;!&ndash;<span>初始成绩</span>&ndash;&gt;-->
                <!--<Input v-model="item.initial" placeholder=""-->
                <!--style="width: 80px;margin-right: 20px;"/>-->
                <!--<span class="labelTitle">目标成绩</span>-->
                <!--<Input v-model="item.objective_results" placeholder=""-->
                <!--style="width: 76px;margin-left: 10px;margin-right: 30px;"/>-->
                <!--<span class="labelTitle">总分</span>-->
                <!--<Input v-model="item.total" placeholder=""-->
                <!--style="width: 76px;margin-left: 10px;margin-right: 30px;"/>-->
                <!--<Select v-model="item.exam_type" placeholder="请选择考试类型"-->
                <!--style="width:120px;" transfer>-->
                <!--<Option value="月考">月考</Option>-->
                <!--<Option value="期中">期中</Option>-->
                <!--<Option value="期末">期末</Option>-->
                <!--<Option value="单元测试">单元测试</Option>-->
                <!--</Select>-->
                <!--</FormItem>-->
                <!--</template>-->
                <!--<p class="addSubject" @click="addSubject">+添加科目</p>-->
                <!--</div>-->
                <!--</div>-->
                <div class="part">
                    <div class="title_outer">
                        <span class="title_inner">移交备注</span>
                    </div>
                    <div class="lines">
                        <FormItem label="首课科目" prop="first_lesson_subject">
                            <Select v-model="formValidate.basic_info.first_lesson_subject" placeholder="请选择科目"
                                    style="width:120px" transfer @on-change="formValidate.handover_note.first_lesson_subject=formValidate.basic_info.first_lesson_subject">
                                <Option v-for="(item,index) in options.subject" :value="parseInt(item.key)"
                                        :key="index">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="首课日期">
                            <DatePicker type="date" v-model="formValidate.handover_note.first_lesson_date"
                                        placeholder="请选择日期" style="width: 120px"></DatePicker>
                        </FormItem>
                        <FormItem label="首课时段" style="width:350px">
                            <Select v-model="formValidate.handover_note.first_lesson_start_time"
                                    @on-change="changeStartTime" transfer style="width:87px">
                                <Option v-for="(item,index) in startTimeList" :key='index' :value="item.value">{{
                                    item.value }}
                                </Option>
                            </Select>
                            &nbsp;至&nbsp;
                            <Select v-model="formValidate.handover_note.first_lesson_end_time" style="width:87px">
                                <Option v-for="(item,index) in endTimeList" :key='index' :value="item.value">{{
                                    item.value }}
                                </Option>
                            </Select>
                        </FormItem>
                    </div>
                    <div class="lines">
                        <FormItem :label-width="120" label="是否有补习经历" prop="is_have_extra_tutoring">
                            <RadioGroup v-model="formValidate.basic_info.is_have_extra_tutoring"
                                        @on-change="tutoringChange">
                                <Radio label="是">是</Radio>
                                <Radio label="否">否</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem v-if="formValidate.handover_note.is_have_extra_tutoring=='是'" label="补习形式">
                            <RadioGroup v-model="formValidate.handover_note.extra_tutoring_way">
                                <Radio label="线上"></Radio>
                                <Radio label="线下"></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem v-if="formValidate.handover_note.is_have_extra_tutoring=='是'" label="补习模式">
                            <RadioGroup v-model="formValidate.handover_note.extra_tutoring_pattern"
                                        style="width: 110px">
                                <Radio label="1对1"></Radio>
                                <Radio label="1对多"></Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                    <div class="lines">
                        <FormItem v-if="formValidate.handover_note.is_have_extra_tutoring=='是'" label="补习经历"
                                  class="blockItem">
                            <Input v-model="formValidate.handover_note.extra_tutoring_experience" type="textarea"
                                   :autosize="{minRows: 3,maxRows: 5}" placeholder="补习经历简介"/>
                        </FormItem>

                        <FormItem label="是否有扩科需求">
                            <RadioGroup v-model="formValidate.handover_note.is_need_add_course" @on-change="needChange">
                                <Radio label="是">是</Radio>
                                <Radio label="否">否</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="扩课科目" v-if="formValidate.handover_note.is_need_add_course=='是'">
                            <Select v-model="formValidate.handover_note.add_course_subject" placeholder="请选择科目"
                                    style="width:120px" transfer>
                                <Option v-for="(item,index) in options.subject" :value="parseInt(item.key)"
                                        :key="index">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="正式课频率">
                            <Select v-model="formValidate.handover_note.class_frequency" placeholder="请选择考试类型"
                                    style="width:120px;" transfer>
                                <Option value="一周一节">一周一节</Option>
                                <Option value="一周两节">一周两节</Option>
                                <Option value="一周三节">一周三节</Option>
                                <Option value="两周一节">两周一节</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="可排课时间段" class="blockItem">
                            <Input v-model="formValidate.handover_note.attend_class_time_frame" type="textarea"
                                   :autosize="{minRows: 3,maxRows: 5}" placeholder="可排课时间段说明"/>
                        </FormItem>
                        <FormItem label="家长关注点及对老师要求" class="blockItem">
                            <Input v-model="formValidate.handover_note.patriarch_demand" type="textarea"
                                   :autosize="{minRows: 3,maxRows: 5}" placeholder=""/>
                        </FormItem>
                        <FormItem label="CC是否制定课程规划" class="blockItem">
                            <RadioGroup v-model="formValidate.handover_note.is_formulate_schedule">
                                <Radio label="是"></Radio>
                                <Radio label="否"></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="课程规划内容" class="blockItem">
                            <Input v-model="formValidate.handover_note.schedule_content" type="textarea"
                                   :autosize="{minRows: 3,maxRows: 5}" placeholder=""/>
                        </FormItem>
                        <FormItem label="其他备注" class="blockItem">
                            <Input v-model="formValidate.handover_note.other_remark" type="textarea"
                                   :autosize="{minRows: 3,maxRows: 5}" placeholder=""/>
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
          transferCRAPI: this.$store.state.api.lead.transferCR,
          getProvincesAPI: this.$store.state.api.city.provinces,
          getCitysAPI: this.$store.state.api.city.areas,
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
        name: "",
        formValidate: {
          basic_info: {//基本情况
            grade: "",
            sex: "",
            province: "",
            city: "",
            county: '',
            school: "",
            first_lesson_subject:"",
            is_have_extra_tutoring:""
          },
          // school_records: [//成绩情况
          //   {
          //     subject: "",
          //     textbook: "",
          //     initial: "",
          //     objective_results: "",
          //     total: "",
          //     exam_type: ""
          //   }
          // ],
          handover_note: {//移交备注
            first_lesson_subject: "",
            first_lesson_date: "",
            first_lesson_start_time: "",
            first_lesson_end_time: "",
            class_frequency: "",
            attend_class_time_frame: "",
            is_have_extra_tutoring: "",
            extra_tutoring_way: "",
            extra_tutoring_pattern: "",
            extra_tutoring_experience: "",
            is_need_add_course: "",
            add_course_subject: "",
            patriarch_demand: "",
            is_formulate_schedule: "",
            schedule_content: "",
            other_remark: "",
          },
        },
        ruleValidate: {
          sex: [
            {type: 'number', required: true, message: '请选择性别', trigger: 'change'},
          ],
          subject: [
            {type: 'number', required: true, message: '请选择科目', trigger: 'change'},
          ],
          grade: [
            {type: 'number', required: true, message: '请选择年级', trigger: 'change'},
          ],
          province: [
            {type: 'number', required: true, message: '请选择所在省', trigger: 'change'},
          ],
          city: [
            {type: 'number', required: true, message: '请选择所在市', trigger: 'change'},
          ],
          county: [
            {type: 'number', required: true, message: '请选择所在区', trigger: 'change'},
          ],
          first_lesson_subject: [
            {type: 'number', required: true, message: '请选择首课科目', trigger: 'change'},
          ],
          is_have_extra_tutoring: [
            { required: true, message: '请选择补习经历', trigger: 'change'},
          ],
        },
        options: {},
        provinceList: [],
        cityList: [],
        areaList: []
      }
    },
    computed: {},
    mounted() {
      this.getAllOptions();
      this.getProvinces();
      this.loadClassTime('start');
    },
    methods: {
      show(lead) {
        this.modal = true;
        this.lead = lead;
        console.log(lead);
        this.name = lead.basic_info_name;
        this.formValidate.basic_info.sex = parseInt(lead.basic_info_sex);
        // this.formValidate.basic_info.subject = parseInt(lead.basic_info_subject);
        this.formValidate.basic_info.grade = parseInt(lead.basic_info_grade);
        this.formValidate.basic_info.province = parseInt(lead.basic_info_province);
        this.formValidate.basic_info.city = parseInt(lead.basic_info_city);
        this.formValidate.basic_info.county = parseInt(lead.basic_info_county);
        this.getCitys(this.formValidate.basic_info.province)
        this.getAreas(this.formValidate.basic_info.city)
      },
      getAllOptions() {// 获取所有选项
        this.$axios.post(this.api.getFieldOptionsAPI, {"field": ['sex', 'grade', 'subject', 'textbook']}).then(res => {
          this.options = res.data.data;
        });
      },
      //获取省
      getProvinces() {
        this.$axios.post(this.api.getProvincesAPI).then(res => {
          this.provinceList = res.data.data;
        });
      },
      //获取市
      getCitys(value) {
        if (value&&value != '') {
          this.$axios.post(this.api.getCitysAPI, {
            region_code: value
          }).then(res => {
            this.cityList = res.data.data;
          });
        }
      },
      //获取区
      getAreas(value) {
        if (value&&value != '') {
          this.$axios.post(this.api.getCitysAPI, {
            region_code: value
          }).then(res => {
            this.areaList = res.data.data;
          });
        }
      },
      tutoringChange() {//是否有补习经历change
        this.formValidate.handover_note.is_have_extra_tutoring=this.formValidate.basic_info.is_have_extra_tutoring;//表单验证
        //初始化
        this.formValidate.handover_note.extra_tutoring_way = "";
        this.formValidate.handover_note.extra_tutoring_pattern = "";
        this.formValidate.handover_note.extra_tutoring_experience = "";
      },
      needChange() {//是否有扩课需求
        //初始化
        this.formValidate.handover_note.add_course_subject = "";
      },
      checkAllGroupChange() {

      },
      indexNum(index) {
        let index1 = index + 1;
        return '科目' + index1;
      },
      // addSubject() {
      //   this.formValidate.school_records.push({
      //     subject: "",
      //     textbook: "",
      //     initial: "",
      //     objective_results: "",
      //     total: "",
      //     exam_type: ""
      //   })
      // },
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
      handleSubmit(name) {//移交cr弹窗，点击确认
        this.$refs[name].validate((valid) => {
          if (valid) {
            //表单验证用，不需要，删除掉
            delete  this.formValidate.basic_info.first_lesson_subject;
            delete  this.formValidate.basic_info.is_have_extra_tutoring;

            this.$axios.post(this.api.transferCRAPI, {
                lead_id: this.lead.leads_id,
                form_data: this.formValidate,
              }).then(res => {
              this.$Notice.success({
                  title: '',
                  desc: '操作成功',
                  duration: 4
                });
                this.modal = false;
                this.$emit('reFresh', 'success')
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
                margin-right: 39px;
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
                    width: 730px;
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
