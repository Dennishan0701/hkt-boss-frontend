<style lang="less">

  @import '../../../../assets/css/trialClassArrangement';

  .demo-split {
    height: 300px;
    border: 1px solid #dcdee2;
  }

  .demo-split-pane {
    padding: 10px;
  }

  .card-info {
    p {
      padding: 3px 0;
    }
  }

  .user_info {
    font-size: 14px
  }

  .titleWrap {
    /*dis*/
  }

  .courseSchedule-Body {
    padding-bottom: 10px;
    .manual {
      display: inline-block;
      width: 90px;
      height: 28px;
      background: #07C4FE;
      border-radius: 14px;
      text-align: center;
      padding: 0;
      color: #ffffff;
      border: none;
      outline: none;
      cursor: pointer;
      line-height: 28px;
      margin: 10px 0;
      margin-bottom: 30px;

      /*margin-left: 10px;*/
    }
    .orange {
      background: orange;
    }
  }

</style>

<template>

  <div class="courseSchedule-content">
    <!--面包屑-->
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">试听排课
        </BreadcrumbItem>
        <BreadcrumbItem>排课详情 {{trial_request_data.class_status}}</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <!--头部 --学生需求-->
    <!-- 异步加载判断 -->
    <div class="courseSchedule-head" v-if="trial_request_data.trial_request">

      <!--步骤进度-->
      <Divider>学生【{{user_info.name}}】{{trial_request_data.class_type_format}}需求 {{trial_request_data.class_status_format}}</Divider>

      <Row type="flex" :gutter="16" justify="space-around" class="code-row-bg card-info"
           style="background:#eee;padding: 20px;margin-top:40px">
        <Col span="4">
          <Card :bordered="false" style="min-height:240px">
            <Steps :current="trial_request_data.class_status+1" class="mv-20" direction="vertical">
              <Step title="待排课"></Step>
              <Step title="已排课,待反馈"></Step>
              <Step title="已上课,已反馈" v-if="trial_request_data.class_status == 2 "></Step>
            </Steps>
            <Steps :current="trial_request_data.class_status==3?0:-1" direction="vertical" status="error"
                   v-if="trial_request_data.class_status==3">
              <Step title="未上课"></Step>
            </Steps>
            <Steps :current="trial_request_data.class_status==4?0:-1" direction="vertical" status="error"
                   v-if="trial_request_data.class_status==4">
              <Step title="已取消"></Step>
            </Steps>
          </Card>
        </Col>

        <Col span="20">
          <Card :bordered="false" style="min-height:340px">
            <p slot="title">申请信息</p>
            <a href="#" slot="extra" @click.prevent="cancelClassEachRequest" v-if="trial_request_data.class_status ==0">
              驳回
            </a>
            <div class="demo-split">
              <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                  <h3 class="mb-10">基本资料</h3>
                    <p>课程类型：<span>{{trial_request_data.class_type_format}}</span></p>
                  <p>姓名：<span>{{user_info.name}}</span></p>
                  <ul class="list-inline">
                    <li class="mr-20">  <p>年级：<span>{{trial_request_data.grade_format}}</span></p></li>
                    <li>  <p>科目：<span>{{trial_request_data.subject_format}}</span></p></li>
                  </ul>

                  <p>学习成绩：
                  <p v-for="record in trial_request_data.trial_request.school_records">
                    <span>{{record.exam_type}}</span>
                    <span class="ml-10">总分{{record.total}}</span>
                    <span class="ml-10">当前{{record.initial}}</span>
                  </p>
                  <p>学习状态：<span>{{trial_request_data.trial_request.study_demand.learning_situation}}</span></p>
                  <p>学习情况：<span>{{trial_request_data.trial_request.study_demand.desc}}</span></p>
                  <p>试听重点：<span>{{trial_request_data.trial_request.study_demand.keypoints}}</span></p>
                </div>
                <div slot="right" class="demo-split-pane pl-20">
                  <h3 class="mb-10">学习需求</h3>
                  <div
style="display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 14px;"
                  >预约时间：<span class="mr-10" v-if="!isEdit">{{trial_request_data.class_planned_date}} {{trial_request_data.class_planned_time_from}}
                                -
                                {{trial_request_data.class_planned_time_to}}</span>

                                <Input
                                  v-model="apply_datetime.class_planned_date"
                                  placeholder="请输入日期"
                                  style="width: 120px"
                                  v-if="isEdit"

                                  class="mr-10"
                                />
                                <Input
                                  v-model="apply_datetime.class_planned_time_from"
                                  placeholder="开始时间"
                                  style="width: 100px"
                                  v-if="isEdit"

                                  class="mr-10"
                                />
                                <Input
                                  v-model="apply_datetime.class_planned_time_to"
                                  placeholder="结束时间"
                                  style="width: 100px"
                                  v-if="isEdit"

                                />
                                <Icon type="md-create" size="20" color="grey" class="ml-20" @click="openEdit" v-if="!isEdit"/>
                                <Icon type="md-close" size="20" color="grey" class="ml-20" @click="isEdit = false" v-if="isEdit"/>
                                <Icon type="md-checkmark-circle-outline" size="20" color="grey" class="ml-20" @click="saveApplyDateTime" v-if="isEdit"/>
                            </div>

                  <p>课时级别：<span>{{trial_request_data.trial_request.study_demand.class_hour_grade_format}}</span></p>
                  <p>教材版本：<span>{{trial_request_data.trial_request.study_demand.textbook_format}}</span></p>
                  <p>上课形式：<span>{{trial_request_data.trial_request.study_demand.class_form}}</span></p>
                  <p>性别要求：<span>{{trial_request_data.trial_request.teaching_demand.teacher_gender_format}}</span></p>
                  <p>建议老师：<span>{{trial_request_data.trial_request.teaching_demand.suggest_teacher}}</span></p>
                  <p>授课要求：<span>{{trial_request_data.trial_request.teaching_demand.desc}}</span></p>
                </div>

              </Split>
            </div>

          </Card>
          <Card :bordered="false" style="min-height:200px" class="mt-20" v-if="trial_request_data.class_status >0">
            <p slot="title">上课信息</p>
            <a href="#" slot="extra" @click.prevent="cancelClassEach" v-if="trial_request_data.class_status != 4">
              取消课程
            </a>
            <div class="demo-split">
              <Split v-model="split2">
                <div slot="left" class="demo-split-pane">
                  <h3 class="mb-10">排课信息</h3>
                  <p>老师：<span v-if="trial_request_data.teacher">{{trial_request_data.teacher.name}}</span></p>
                  <p>排课日期：<span>{{trial_request_data.class_planned_time_format.class_planned_date}}</span></p>
                  <p>排课时间：<span>{{trial_request_data.class_planned_time_format.class_planned_start_time}} - {{trial_request_data.class_planned_time_format.class_planned_end_time}}</span>
                  </p>
                  <p>排课类型：<span>{{trial_request_data.class_type_format}}</span></p>
                </div>
                <div slot="right" class="demo-split-pane pl-20">
                  <h3 class="mb-10">实际到听</h3>
                  <p>是否上课：<span></span></p>
                  <p>实际开始：<span></span></p>
                  <p>实际结束：<span></span></p>
                  <p>回放地址：<span></span></p>
                </div>
              </Split>
            </div>
          </Card>

          <Card :bordered="false" style="min-height:200px" class="mt-20"
                v-if="trial_request_data.class_status >=1 && trial_request_data.class_status < 4">
            <p slot="title">课后反馈</p>
            <a href="#" slot="extra" @click.prevent="addTrackingRecord" v-if="auth_user.role_format != '教学-排课'">
              添加反馈
            </a>
            <div class="demo-split">
              <Split v-model="split3">
                <div slot="left" class="demo-split-pane">
                  <h3 class="mb-10" v-if="trial_request_data.class_type < 3">CC反馈</h3>
                  <h3 class="mb-10" v-if="trial_request_data.class_type >= 3">CR反馈</h3>
                  <div class="body" v-if="trial_request_data.trial_class_detail">
                    <p>反馈时间：<span>{{trial_request_data.updated_at}}</span></p>
                    <p>是否上课：<span>{{trial_request_data.class_status_format}}</span></p>
                    <p>细节说明：<span>{{trial_request_data.trial_class_detail_format}}</span></p>
                  </div>
                  <p v-else>暂无反馈</p>
                </div>
                <div slot="right" class="demo-split-pane pl-20" v-if="false">
                  <h3 class="mb-10">TR反馈</h3>
                  <p>反馈时间：<span></span></p>
                  <p>反馈内容：<span></span></p>
                </div>

              </Split>
            </div>

          </Card>

        </Col>
      </Row>

    </div>

    <!--中部--以下为匹配老师-->
    <div class="courseSchedule-Body" style="padding-bottom:15px;">
      <template v-if="trial_request_data.class_status ==0" >
        <Divider>{{formTeacherIsShow?"手动":"系统"}}匹配老师, 请选择</Divider>
        <p class="manual" :class="{ orange: !formTeacherIsShow }" @click="toggleMatchMode">
          {{formTeacherIsShow?"切换系统":"切换手动"}}匹配</p>
        <Form v-if="formTeacherIsShow" class="formTeacher" :model="formItem" :label-width="100" label-position="right"
              style="margin-bottom: 44px;" inline>
              <FormItem label="精细筛选：">
                <Select clearable v-model="formItemManual.subject" style="width:120px" placeholder="科目"
                        transfer>
                  <Option v-for="item in subjectList" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
                <Select clearable v-model="formItemManual.grade" style="width:120px" placeholder="年级"
                       transfer>
                  <Option v-for="item in gradeList" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
              </FormItem>

          <FormItem label="老师关键字：">
            <Input clearable v-model="formItemManual.keyword" style="width:220px" placeholder="请输入姓名/手机号"></Input>
          </FormItem>
          <FormItem label="性别：">
            <RadioGroup v-model="formItemManual.sex">
              <Radio :label="0" :key="0">全部</Radio>
              <Radio :label="1" :key="1">男</Radio>
              <Radio :label="2" :key="2">女</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem label="上课日期：">
            <DatePicker type="datetime" v-model="formItemManual.trial_start_time" placeholder="请选择上课日期"
                        style="width: 220px"
                        @on-change="formItem.trial_start_time=$event"></DatePicker>
          </FormItem>

          <FormItem label="时薪：" v-if="false">
            <Select clearable style="width:150px" placeholder="请选择课时费" transfer filterable>
              <Option v-for="item in ['50元/时', '60元/时', '70元/时', '80元/时', '90元/时', '95元/时', '100元/时', '110元/时',]" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="CC转化率：" v-if="false">
            <Select clearable  style="width:150px" placeholder="请选择转化率" transfer filterable>
              <Option v-for="item in 10" :value="item" :key="item">{{ `${item * 5 - 5}~${item * 5 }%` }}</Option>
              <Option value="item">50~100%</Option>
            </Select>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="getAllSuitableTeacher">查询</Button>
        </FormItem>
        </Form>

        <!--以下为筛选出的老师-->
        <Table class="tableData" :columns="teacher_columns" :data="teacher_data" stripe highlight-row
               @on-selection-change="tableDataSelect">
               <template slot-scope="{ row, index }" slot="interview_feedback">
                  <strong :title="row.interview_feedback">{{ row.interview_feedback && row.interview_feedback.substr(0, 10)  }}...</strong>
               </template>

        </Table>
        <!--分页-->

          <Page
                  :total="pageTotal"
                  show-sizer
                  show-elevator
                  @on-change="pageChange"
                  @on-page-size-change="pageSizeChange"
                  show-total

          />


      </template>

        <!--以下为选中老师近期的排课情况-->
      <template>


        <div v-show="currentTeacher && trial_request_data.class_status == 0" id="currentTeacher">
          <Divider style="padding-top: 30px;">{{currentTeacher && currentTeacher.name}} [{{ currentTeacher && currentTeacher.id}}] 老师近期排课情况</Divider>
          <div class="courseScheduleTable" style="margin-top: 40px;">

            <div class="title">
              <p class="user_info">所选讲师：<span>{{currentTeacher && currentTeacher.name}}</span></p>
              <!--<span class="user_info" style="font-size:14px;">老师近期排课情况</span>-->
            </div>
            <!--<div class="calendar">-->
            <teacherSchedule ref="teacherSchedule" @childDom="scheduleDom" @imgName="imgName"
                            :trial_start_datetime='trial_start_datetime' :trial_request_data="trial_request_data"
                            :currentTeacher="currentTeacher"></teacherSchedule>
            <!--</div>-->
          </div>
        </div>
      </template>
    </div>
    <trial-tracking-record-modal ref='trialTrackingRecordModal'></trial-tracking-record-modal>
  </div>

</template>

<script>
  import {formatDate} from '@/api/common.js'
  import teacherSchedule from './component/schedule'; //课表
  import trialTrackingRecordModal from './modal/addTrialTrackingRecordModal'; //添加试听课跟进记录弹窗
  import {
    _
  }
    from 'vue-underscore';

  export default {
    data () {
      return {
        api: {
          trialRequest: this.$store.state.api.trial_class_arrangement.trialRequest,
          updateApplyDateTime:this.$store.state.api.trial_class_arrangement.updateApplyDateTime,
          matchTeacherAuto: this.$store.state.api.trial_class_arrangement.matchTeacherAuto,
          matchTeacherManual: this.$store.state.api.trial_class_arrangement.matchTeacherManual,
          cancelAPI:this.$store.state.api.trial_class_arrangement.cancel

        },
        split1: 0.5,
        split2: 0.5,
        split3: 0.5,
        apply_datetime:{
            class_planned_date:'',
            class_planned_time_from:'',
            class_planned_time_to:''
        },
        isEdit:false,
        formTeacherIsShow: false,
        selectionRowData: [],
        user_info: '',
        sexList: [], // 性别列表
        subjectList: [], // 科目列表
        gradeList: [], // 年级列表
        //          versionList: [],  // 教材版本列表
        //          schoolList: [],   // 毕业学校列表
        //          provinceList: [], // 高考省份列表


        formItem: {
          keyword: '',
          sex: '',
          grade: '',
          subject: '',
          trial_start_datetime: '',
          class_length: 1,
          is_manual:0,
          size:10,
          page:1
          //          version: '',
          //          school: '',
          //          provice: '',
          //          knowledge: '',
        },
        formItemManual: {
          keyword: '',
          sex: '',
          grade: '',
          subject: '',
          trial_start_datetime: '',
          class_length: 1,
          is_manual:1,
          size:10,
          page:1
          //          version: '',
          //          school: '',
          //          provice: '',
          //          knowledge: '',
        },
        trial_start_datetime: '',
        trial_request_data: '',
        teacher_columns: [{
          title: '选中',
          align: 'center',
          key: 'checkBox',
          // type:'selection',
          render: (h, params) => {
            return h ('div', [
              h ('Checkbox', {
                props: {
                  value: params.row.checkBox
                },
                on: {
                  'on-change': (e) => {
                      console.log(this.$refs.teacherSchedule);
                    if (e) {
                      this.currentTeacher = params.row
                      this.$refs.teacherSchedule.getInfo(params.row,this.trial_start_datetime);
                    } else {
                      this.currentTeacher = ''
                    }
                    this.teacher_data.forEach ((items) => { //先取消所有对象的勾选，checkBox设置为false
                      this.$set (items, 'checkBox', false)
                    });
                    this.teacher_data[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  }
                }
              })
            ])
          }
        }, {
          title: '姓名',
          key: 'name',

        }, {
          title: '微信号',
          key: 'wechat',
        },{
          title: '性别',
          key: 'sex_format'
        }, {
          title: '年级偏好',
          key: 'grade_preference_format'
        },
        {
          title: '第一科目',
          key: 'teaching_subject_format'
        },
        {
          title: '第二科目',
          key: 'second_subject_format'
        },
        {
          title: '第三科目',
          key: 'third_subject_format'
        },
        {
          title: '教师等级',
          key: 'employee_grade'
        },
          {
            title: '毕业院校',
            key: 'graduated_from'
          }, {
            title: '学历',
            key: 'tr_degree_format'
          }, {
            title: '文理科',
            key: 'arts_or_science_format'
          }, {
            title: '专业',
            key: 'major'
          }, {
            title: '工作性质',
            key: 'employee_type_format'
          }, {
            title: '是否清北老师',
            key: 'is_senior'
          }, {
            title: '面试评价',
            slot: 'interview_feedback',
            minWidth: 80
          }, {
            title: '地区分类',
            key: 'tr_location_type_format'
          }, {
            title: '入职时间',
            key: 'ed',

          },
        ],
        teacher_data: [],
        pageTotal:0,
        currentTeacher: '',
        editIndex: -1, // 当前聚焦的输入框的行数
        editName: '', // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editAge: '', // 第二列输入框
        editBirthday: '', // 第三列输入框
        editAddress: '', // 第四列输入框
        cancel_class_remark:''
      }
    },
    created () {

    },
    mounted () {
      this.getTrialRequest ();
      this.getTeacherSearchOptions ();

    },
    methods: {
      getTrialRequest () {
        this.$axios.post (this.api.trialRequest, {
          class_each_id: this.$route.params.id
        }).then ((res) => {
          let _data = res.data.data;

          this.trial_request_data = _data;
          this.user_info = _data.basic_info;


          //组合自动筛选老师的条件
          this.formItem.sex = _data.sex;
          this.formItem.grade = _data.grade;
          this.formItem.subject = _data.subject;
          this.trial_start_datetime = _data.class_planned_date;
          //console.log(_data);
          if (_data.class_status > 0) {
            this.currentTeacher = _data.teacher;
            this.$refs.teacherSchedule.getInfo (this.currentTeacher,this.trial_start_datetime);
          }
          if(_data.class_status == 0){
              this.getAllSuitableTeacher ();
          }


        }).catch ((err) => {
          console.log (err);
        });
      },
      getAllSuitableTeacher () {

        this.formItem.trial_start_datetime = this.trial_start_datetime;
        this.formItemManual.trial_start_datetime = this.trial_start_datetime;

        let teacher_query =this.formItem;
        let request_api =  this.api.matchTeacherAuto;

        if(this.formTeacherIsShow){
          teacher_query =this.formItemManual;
          request_api =  this.api.matchTeacherManual;
        }

        this.$axios.post (request_api, teacher_query).then (res => {
          if (res.data.data.data) {
            res.data.data.data.forEach (function (item, index) {
              _.extend (item, item.tr_info);
            });
          }
          this.teacher_data = res.data.data.data;
          this.pageTotal = res.data.data.total;
        });
      },
      getTeacherSearchOptions () {
        // 获取所有筛选器相应的值
        this.$axios.post (this.$store.state.getFieldOptions, {
          field: ['grade', 'subject', 'sex']
        }).then (res => {
          for (let i in res.data.data) {
            let fieldArray = res.data.data[i];
            var list = [];
            for (let j in fieldArray) {
              list.push ({
                key: fieldArray[j].key,
                value: fieldArray[j].value
              })
            }
            switch (i) {
              case 'sex':
                list.unshift ({
                  key: '0',
                  value: '全部'
                });
                this.sexList = list;
                break;
              case 'subject':
                this.subjectList = list;
                break;
              case 'grade':
                this.gradeList = list;
            }
          }
        });
      },
      scheduleDom (ele) {
        // this.scheduleTableDetail = ele;
      },
      imgName (res) {
        // this.downloadName = res;
      },
      //页码改变
      pageChange(page) {
        this.formItem.page = page;
        this.getAllSuitableTeacher();
      },
      //页码size改变
      pageSizeChange(pageSize) {
        this.formItem.size = pageSize;
        this.getAllSuitableTeacher();
      },
      tableDataSelect (selection) {
      },
      toggleMatchMode () {
        this.$Modal.confirm ({
          title: '切换老师匹配方式',
          content: '<p>确定要切换成 ' + this.matchMode + ' 匹配吗？</p>',
          onOk: () => {
            this.formTeacherIsShow = !this.formTeacherIsShow;
            if (this.formTeacherIsShow) {
              this.teacher_data = [];
            } else {
              this.getAllSuitableTeacher ();
            }

          },
        });

      },
      cancelClassEachRequest () {

        this.$Modal.confirm ({
          title: '驳回申请',
          content: '<p>驳回后请让申请人重新申请，确定继续吗？</p>',
          render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.cancel_class_remark,
                                autofocus: true,
                                placeholder: '请输入驳回理由...'
                            },
                            on: {
                                input: (val) => {
                                    this.cancel_class_remark = val;
                                }
                            }
                        })
                    },
          onOk: () => {
            if( !this.cancel_class_remark.trim() ) {
              this.$Message.error('理由不能为空 ！');
              return false;
            }
            this.$axios.post(this.api.cancelAPI,{'class_each_id':this.$route.params.id,'cancel_class_remark':this.cancel_class_remark}).then((res)=>{
                  this.$Message.success('课程已驳回！');
                  setTimeout(()=>{
                    window.location.reload ();
                  },1000)
            })
          },
        });

      },
      cancelClassEach () {

        this.$Modal.confirm ({
          title: '取消排课',
          content: '<p>排课只能在开课之前取消，确定继续吗？</p>',
          onOk: () => {
            this.$axios.post(this.api.cancelAPI,{'class_each_id':this.$route.params.id}).then((res)=>{
                  this.$Message.success(res.data.message);

                  setTimeout(()=>{
                    window.location.reload ();
                  },1000)
            })
          },
        });

      },
      addTrackingRecord () {
        this.$refs.trialTrackingRecordModal.show (this.trial_request_data);
      },

      openEdit(){

          this.apply_datetime.class_planned_date = this.trial_request_data.class_planned_date;
          this.apply_datetime.class_planned_time_from = this.trial_request_data.class_planned_time_from;
          this.apply_datetime.class_planned_time_to = this.trial_request_data.class_planned_time_to;

          this.isEdit = true;
      },
      saveApplyDateTime(){
          this.$axios.post(this.api.updateApplyDateTime,{
            'class_each_id':this.trial_request_data.id,
            'class_planned_date':this.apply_datetime.class_planned_date,
            'class_planned_time_from':this.apply_datetime.class_planned_time_from,
            'class_planned_time_to':this.apply_datetime.class_planned_time_to}).then( res=>{
              this.isEdit = false;
              this.$Notice.success({
                title: "",
                desc: "修改成功！",
                duration: 3
              });
          });
      }
    },
    computed: {
      auth_user() {
        return JSON.parse(sessionStorage.getItem('auth_user'));
      },
      matchMode () {
        return this.formTeacherIsShow ? "系统" : "手动"
      },
      class_applied_date(){
         let date_string = this.trial_request_data.trial_request.study_demand.applied_date;
         let date_obj = new Date(date_string);

         return formatDate(date_obj,"yyyy-MM-dd")
      }

    },
    components: {
      teacherSchedule, trialTrackingRecordModal
    }
  }
// document.querySelector("#你设置的位置").scrollIntoView(true);
</script>
