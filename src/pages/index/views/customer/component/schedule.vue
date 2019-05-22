<template>

  <div class="schedule-week-main">
    <div class="schedule-date clearfix">
      <div class="schedule-date-week">
        <p class="weekBtn" @click="weekChange('prev')">上一周</p>
        <p class="weekBtn" @click="weekChange('next')">下一周</p>
      </div>
      <div class="scheduleCourse" v-if="this.trial_request_data.class_status_format  =='待排课'">
        <Button type="primary" :disabled="!this.currentTeacher" class="pkBtn" @click="scheduleCourse">排课</Button>
      </div>
      <div class="scheduleAttention">
        <p>下表中<span class="scheduleAttentionBlock"></span>为可排课时间</p>
      </div>
    </div>
    <div v-show="availavleTime.length === 7" class="schedule-table mt-20">
      <div class="card">
        <div class="schedule-table-main">
          <!--<div class="schedule-table-header">-->
          <!--<i></i>-->
          <!--<Table border :disabled-hover="true" :columns="scheduleColumnsTamp" :data="scheduleDataList"-->
          <!--height="42"></Table>-->
          <!--</div>-->
          <div class="schedule-table-detail" ref="scheduleTableDetail">
            <!-- <Table border :disabled-hover="true" :columns="scheduleColumns" :data="scheduleDataList"></Table> -->
            <schedulediv :propsAvailavleTime="availavleTime" :propsPlannedTime="plannedTime" :scheduleCourseWithTable="scheduleCourseWithTable" :trid="currentTeacher && {
              tr_id: currentTeacher.id,
              template_number: currentTeacher.template_number}"></schedulediv>
          </div>
        </div>
      </div>
    </div>
    <Modal class="scheduleModal" v-model="scheduleModalShow" width="650" :mask-closable="false">

      <div class='mdModalheader' slot="header">
        <Icon type="md-calendar" color="orange" size="22" style="margin-top: -3px;"/>
        排课
      </div>
      <ul class="list-inline gutter-20 basic_info" v-if="trial_request_data && currentTeacher">
        <li><span class="title">学生</span>{{trial_request_data.trial_request.name}}</li>
        <li><span class="title">老师</span>{{currentTeacher.name}}</li>
        <li><span class="title">年级</span>{{trial_request_data.trial_request.study_demand.grade_format}}</li>
        <li><span class="title">科目</span>{{trial_request_data.trial_request.study_demand.subject_format}}</li>
        <li><span class="title">教材版本</span>{{trial_request_data.trial_request.study_demand.textbook_format}}</li>
        <li><span class="title">请求排课日期</span>{{class_planned_date_format}}</li>
        <li><span class="title">请求排课时间段</span>{{trial_request_data.class_planned_time_from}}</li>
        <li><span class="title">至 </span>{{trial_request_data.class_planned_time_to}}</li>
      </ul>
      <Form ref="scheduleForm" :model="scheduleForm" :label-width="100">
        <FormItem label="上课日期" style="width:350px" prop="date">
          <DatePicker v-model="scheduleForm.date" type="date" placeholder="请选择日期" transfer
                      @on-change="changeScheduleDate" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem label="上课时间" style="width:350px" prop="time">
          <Select v-model="scheduleForm.startTime" @on-change="changeStartTime" transfer style="width:87px">
            <Option v-for="(item,index) in startTimeList" :key='index' :value="item.value">{{ item.value }}</Option>
          </Select>
          &nbsp;至&nbsp;
          <Select v-model="scheduleForm.endTime" style="width:87px">
            <Option v-for="(item,index) in endTimeList" :key='index' :value="item.value">{{ item.value }}</Option>
          </Select>
        </FormItem>
      </Form>
      <Button type="info" class="mdBtn" @click="handleSubmit('form')" style="width: 70px;">确 认</Button>
    </Modal>
  </div>

</template>

<script>
  import {timestamp, formatDate, sleep} from '@/api/common.js'
  import moment from 'moment'
  import schedulediv from './scheduleTable'
  import {mapGetters} from 'vuex'

  export default {
    props: ['currentTeacher', 'trial_request_data', 'trial_start_datetime'],
    components: {schedulediv},
    data () {
      return {
        availavleTime:
        [
        { weekday: 'MON', 'available_time': []},
        { weekday: 'TUE', 'available_time': []},
        { weekday: 'WED', 'available_time': []},
        { weekday: 'THU', 'available_time': []},
        { weekday: 'FRI', 'available_time': []},
        { weekday: 'SAT', 'available_time': []},
        { weekday: 'SUN', 'available_time': []}
      ],
        plannedTime:
        [
          { date: '2019-3-10', 'planned_time': []},
          { date: '2019-3-11', 'planned_time': []},
          { date: '2019-3-12', 'planned_time': []},
          { date: '2019-3-13', 'planned_time': []},
          { date: '2019-3-14', 'planned_time': []},
          { date: '2019-3-15', 'planned_time': []},
          { date: '2019-3-16', 'planned_time': []}
        ],
        classEachesOneWeekAPI: this.$store.state.api.trial_class_arrangement.classEaches, //获取某一老师一周排课时间
        ccStoreAPI: this.$store.state.api.trial_class_arrangement.ccStore, //生成CC安排的排课
        year: new Date ().getFullYear (),
        month: new Date ().getMonth () + 1,
        date: 0, //YYYY-MM
        firstWeekDay: '',
        weekIndex: 0, //周下标
        weekList: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周'],
        weekVals:['MON','TUE','WED','THU','FRI','SAT','SUN'],
        timeList: this.timeListArr (), //表列所有数据,
        scheduleColumnsTamp: [ //覆盖表头
          {
            key: 'NAME',
            title: '时间',
            align: 'center',
          }
        ],
        scheduleColumns: [ //真实表头
          {
            key: 'NAME',
            title: '时间',
            align: 'center',
            render: (h, params) => {
              return h ('h3', params.row.NAME)
            }
          },
        ],
        scheduleData: [], //月课表（全部数据）
        scheduleDataList: [], //处理后的课表
        scheduleModalShow: false,
        scheduleForm: {
          main_id: '',
          cc_id: '',
          tr_id: '',
          date: '',
          startTime: '',
          endTime: '',
          class_each_id: ''
        },
        startTimeList: [],
        endTimeList: [],
        courseRangTimes: [
          {"value": "06:00"},
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
          {"value": "23:59"}
        ],
        timesList: [
          [
            "07:00-08:00",
            "08:00-09:00",
          ], [
            "08:00-09:00",
            "09:00-10:00",
          ], [
            "09:00-10:00",
            "10:00-11:00",
          ], [
            "10:00-11:00",
            "11:00-12:00",
          ], [
            "11:00-12:00",
            "12:00-13:00"
          ], [
            "12:00-13:00",
            "13:00-14:00",
          ], [
            "13:00-14:00",
            "14:00-15:00",
            "15:00-16:00",
          ],
        ],
      }
    },
    computed: {
      ...mapGetters ([
        'leadsShow',
      ]),
      auth_user () {
        return JSON.parse (sessionStorage.getItem ('auth_user'));
      },
      scheduleDate: {
        get: function () {
          return this.trial_start_datetime ? this.trial_start_datetime : this.trial_request_data.class_planned_date;
        },
        set: function (newValue) {
        }
      },
      class_planned_date_format () {
        let date_string = this.trial_request_data.class_planned_date ? this.trial_request_data.class_planned_date : this.trial_start_datetime;
        let date_obj = new Date (date_string);
        return formatDate (date_obj, "yyyy-MM-dd")
      }

    },
    beforeMount () { //数据处理
      this.scheduleColumnsTamp = [...this.scheduleColumnsTamp, ...this.scheduleColumnsTampArr ()];
      this.scheduleColumns = [...this.scheduleColumns, ...this.scheduleColumnsArr ()];
      //console.log (this.scheduleColumns);
    },
    mounted () {
      this.timeSet ();
      let ele = this.$refs.scheduleTableDetail.children[0];
      this.$emit ('childDom', ele);
      this.loadClassTime ('start');
      console.log('currentTeacher', this.currentTeacher)
    },
    methods: {
      cancel () { //关闭弹窗
        // this.$store.commit("LEADS_SHOW", false);
        this.scheduleModalShow = false;
      },
      // 获取老师一周的排课记录
      getInfo (currentTeacher, trial_start_datetime) {
        let app = this;
        //拼一下申请时间
        // let date_obj = new Date (trial_start_datetime);
        // let apply_date = formatDate (date_obj, "yyyy-MM-dd")
        // console.log('trial_start_datetime', trial_start_datetime)
        let apply_date = moment(trial_start_datetime).format('YYYY-MM-DD');
        this.$axios.post (this.classEachesOneWeekAPI, {
           tr_id: currentTeacher.id,
          //tr_id: 10,
           apply_date: apply_date,
          //apply_date: '2019-02-13',
        }).then (res => {
          this.plannedTime = res.data.data;
          !this.firstWeekDay && (this.firstWeekDay = this.plannedTime[0] && this.plannedTime[0].date || '')
        });
      },
      timeSet () { //获取服务器时间
        //   timestamp().then( data =>{
        var myDate = new Date ()
        this.year = myDate.getFullYear ();
        this.month = myDate.getMonth () + 1;
        // this.weekIndex = myDate.getFullYear;
        // this.year = data.year;
        // this.month = data.month;
        // this.weekIndex = '4';
        this.getSchedule (true);
        //   });
      },
      scheduleColumnsTampArr () { //覆盖表头数据
        let sctArr = [];
        this.weekVals.forEach ((v, i, a) => {
          let item = {
            key: v,
            title: '',
            align: 'center',
            renderHeader: (h, params) => {
              return h ('div', [
                h ('p', this.weekVals[new Date (params.column.title).getDay ()]),
                h ('p', params.column.title)
              ])
            }
          };
          sctArr.push (item)
        })
        return sctArr;
      },
      scheduleColumnsArr () { //真实表头数据
        let scArr = [];
        this.weekVals.forEach ((v, i, a) => {
          let item = {
            key: v,
            title: '',
            align: 'center',
            renderHeader: (h, params) => {
              return h ('div', [
                h ('p', this.weekVals[new Date (params.column.title).getDay ()]),
                h ('p', params.column.title)
              ])
            },
            render: (h, params) => {
              let data = Object.values (params.row)[i + 1]
              return this.renderItem (h, params, data);
            }
          }
          scArr.push (item)
        })
        //console.log (scArr);
        return scArr;
      },
      timeListArr () { //表列所有数据,
        let tlArr = [];
        for(let i = 7; i< 24; i++) {
          let num = i < 10 ? '0'+i : i;
          let nums = i + 1 < 10 ? '0' + (i + 1) : (i + 1);
          let item = {
            'time': `${num}:00-${nums}:00`,
            'list': [],
          }
          tlArr.push(item);
        }
        return tlArr;
      },
      scheduleDataHandle (data, index) {
        let app = this
        let item = [];
        let length = data.data.length;
        for (let i = 0; i < length; i++) {
          // 如果表小时和开始小时相等 匹配对应表列
          let timer = app.timeList[index].time.substring (0, 2);
          let startTimer = data.data[i].p_start.substring (0, 2)
          if (timer == startTimer) item.push (data.data[i]);
        }
        data.allowScheduleParams.times.forEach (function (v, n) {
          let timer = app.timeList[index].time
          if (timer.substring (0, 2) == v.substring (0, 2)) {
            item.push({
              // the_day:data.data[0].the_day||,
              time:timer,
              p_start: timer.substring (0, 2)+":00",
              p_end:timer.substring (6, 8)+":00",
              allowScheduleFlag:1,
              // cellClassName:JSON.parse(`{"${a}": "table-info-cell-allowSchedule"}`)
            })
          }
        })
        return item;
      },
      weekChange (flag) { //上一周
        let app = this
        if (!this.currentTeacher) {
          this.$Notice.warning ({
            title: '',
            desc: '请先选择老师',
            duration: 5
          });
          return;
        }

        if (flag == 'next') {
          // moment(this.firstWeekDay).add(7, 'days').format('YYYY-MM-DD')
          this.firstWeekDay = moment(this.firstWeekDay).add(7, 'days').format('YYYY-MM-DD');
          this.getInfo (this.currentTeacher, this.firstWeekDay);

        } else {
          this.firstWeekDay = moment(this.firstWeekDay).subtract(7, 'days').format('YYYY-MM-DD');
          this.getInfo (this.currentTeacher, this.firstWeekDay);
        }
      },
      getSchedule (first) { //获取课表
        let year = this.year;
        let month = this.month < 10 ? '0' + this.month : this.month;
        this.date = year + '-' + month;

      },
      columentTitle (title) { //处理表头
        // return this.moment(title).format('ll').substring(5);
      },
      itemHeight (data) { //处理课表标签高度
        //console.log (data);
        let et = data.endTime == '00:00' ? '24:00' : data.endTime;
        let endTime = new Date (data.courseDate.replace (/-/g, '/') + ' ' + et).getTime ();
        let startTime = new Date (data.courseDate.replace (/-/g, '/') + ' ' + data.startTime).getTime ();
        let minute = (endTime - startTime) / 1000 / 60;
        return minute / 60 * 100 + '%'; //小时*表格高度
      },
      itemTop (data, name) { //处理课表标签定位
        let minute = data.startTime.substring (3, 5) - name.substring (3, 5)
        return minute / 60 * 100 + '%'; //小时*表格高度
      },
      renderItem (h, params, data) { //render课表内容
        if (data) {
          let moudel = [];
          let odiv = ''
          for (let i = 0, length = data.length; i < length; i++) {
            if(data[i].allowScheduleFlag){
              // odiv = h ('div', {
              //   style: {
              //     height: '46px',
              //     top: 0,
              //   },
              //   class: {
              //     yellow: false,
              //     allowSchedule:true,
              //     item: true,
              //     open: false,
              //   },
              // }, [
              //   h ('div', [
              //     h ('p', {
              //       class: {
              //         itemName: true
              //       }
              //     }, ''),
              //   ])
              // ])
            }else{
              odiv = h ('div', {
                style: {
                  height: this.itemHeight (data[i]),
                  top: this.itemTop (data[i], params.row.NAME),
                },
                class: {
                  // yellow: data[i].courseType == '0' ? true : false,
                  yellow: false,
                  item: true,
                  open: parseInt (this.itemHeight (data[i])) < 100,
                },
              }, [
                h ('div', [
                  h ('p', {
                    class: {
                      itemName: true
                    }
                  }, data[i].basic_info.name),
                  h ('p', [
                    h ('span', data[i].p_start),
                    h ('span', '-'),
                    h ('span', data[i].p_end),
                  ]),
                  h ('em', data[i] ? data[i].subject_format.substring (0, 1) : ''),
                ])
              ])
            }
            moudel.push (odiv);
          }
          return moudel;
        }
      },
      // 排课操作
      scheduleCourse () {
        this.scheduleModalShow = true
        // this.$store.commit("LEADS_SHOW", true);
      },
      scheduleCourseWithTable(date, startTime, endTime) {
        this.scheduleModalShow = true;
        this.scheduleForm.date = date;
        this.scheduleForm.startTime = startTime;
        this.changeStartTime (startTime)
        this.scheduleForm.endTime = endTime;
      },
      // 修改上课日期
      changeScheduleDate (value) {
        this.scheduleForm.date = moment(value).format('YYYY-MM-DD');
      },
      changeStartTime (value) {
        this.loadClassTime ('end', value);
      },
      loadClassTime (type, range) {
        let _this = this;
        //上课时间开始时间7-23
        if (type === 'start') {
          var list = this.courseRangTimes;
          list = list.slice (0, list.length - 2);
          _this.startTimeList = list;
        }
        //结束时间8-24
        if (type === 'end') {
          range = range || '';
          _this.endTimeList = [];
          this.courseRangTimes.forEach ((item, index) => {
            if (item.value > range) {
              _this.endTimeList.push (item);
            }
          });
        }
      },
      handleSubmit () {
        //赋值
        this.scheduleForm.cc_id = this.auth_user.id;
        this.scheduleForm.tr_id = this.currentTeacher.id;
        this.scheduleForm.main_id = this.trial_request_data.main_id;
        this.scheduleForm.class_each_id = this.trial_request_data.id;

        if (!this.scheduleForm.date) {
          this.$Notice.error ({
            title: '',
            desc: '请选择上课日期',
            duration: 3
          });
        } else {
          if (!this.scheduleForm.startTime || !this.scheduleForm.endTime) {
            this.$Notice.error ({
              title: '',
              desc: '请选择上课时间',
              duration: 3
            });
          } else {
            //发送排课请求
            this.scheduleForm.date = moment(this.scheduleForm.date).format('YYYY-MM-DD');
            const {main_id,
              cc_id,
              tr_id,
              date,
              startTime: start_time,
              endTime: end_time,
              class_each_id,} = this.scheduleForm
            this.$axios.post (this.ccStoreAPI, {
              class_each_id,
              tr_id,
              date,
              start_time,
              end_time
            }).then (res => {



              this.scheduleModalShow = false;
              this.$Notice.success ({
                title: '',
                desc: '排课成功',
                duration: 3
              });
              setTimeout(()=>{
                window.location.reload ();
              },1500)

            });

          }
        }
      },
      /*获取指定日期指定间隔天数后的日期
      * 今天：getDateStr(0)
      * 昨天：getDateStr(-1)
      * 明天：getDateStr(1)
      * */
      getDateStr (oldDate, AddDayCount) {
        var dd = new Date (oldDate);
        dd.setDate (dd.getDate () + AddDayCount);   //获取AddDayCount天后的日期

        var year = dd.getFullYear ();
        var mon = dd.getMonth () + 1;               //获取当前月份的日期
        var day = dd.getDate ();
        //  console.log(year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day));
        return year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day);
      }
    },
  }

</script>
<style lang="less">
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
    overflow: inherit;
    .mdBtn {
      // float: right;
    }
  }

  .schedule-date-week {
    display: inline-block;
    text-align: left;
  }

  .scheduleCourse {
    display: inline-block;
    float: right;
    .pkBtn {
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
      margin-left: 10px;
    }
  }

  .scheduleAttention {
    /*color: red;*/
    font-size: 13px;
    .scheduleAttentionBlock {
      display: inline-block;
      width: 13px;
      height: 14px;
      background: #bcddec;
      margin: 0 2px;
      margin-top: -3px;
      vertical-align: middle;
    }
  }

  .weekBtn {
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
    margin-left: 10px;
    &:first-child {
      margin-left: 0;
    }
  }

  .list-inline.basic_info {
    margin-top: 20px;
    margin-left: 33px;
    margin-bottom: 25px;
    font-size: 14px;
    .title {
      padding-right: 10px;
      color: #abb2bf;
    }
    li:first-child {
      margin-bottom: 25px;
    }
  }

  .schedule-table-main {
    position: relative;
    z-index: 1;
    overflow: hidden;
    /*display: flex;*/
    flex: 5;
    .ivu-table:before, .ivu-table:after {
      display: none;
    }
    .ivu-table-wrapper {
      border-radius: 4px;
      border: none;
    }
    .ivu-table {
      .table-info-cell-allowSchedule{
        background: #bcddec;
      }
      .ivu-table-body {
        overflow: hidden;
      }
      .ivu-table-row {
        td:last-child {
          border-right: 0;
          .ivu-table-cell {
            &:after {
              content: '';
              background: #fff;
              position: absolute;
              right: 0;
              bottom: -2px;
              height: 1px;
              width: 9px;
            }
          }
        }
        td:first-child {
          .ivu-table-cell {
            &:after {
              content: '';
              background: #fff;
              position: absolute;
              left: 0;
              bottom: -2px;
              height: 1px;
              width: 9px;
            }
          }
        }
      }
      .ivu-table-row:last-child {
        td {
          &:after {
            display: none;
          }
        }
      }
      th, td {
        border-color: #dfebf1;
      }
      th {
        height: 42px;
        text-align: center;
        font-size: 12px;
        font-weight: normal;
        border-bottom: none;
        background: #ebf6fb;
        &:nth-of-type(even) {
          background: #deedf4;
        }
      }
      td {
        height: 45px;
        border-bottom: none;
        position: relative;
        &:after {
          height: 1px;
          width: 100%;
          content: '';
          background: #e9eaec;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .ivu-table-cell {
          height: 100%;
          position: relative;
          overflow: visible;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          h3 {
            font-size: 12px;
          }
        }
        .item {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          color: #fff;
          padding: 2px 2px 3px;
          z-index: 3;
          & > div {
            background: #86d2b1;
            border-radius: 3px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          &.yellow {
            & > div {
              background: #f6a648;
            }
          }
          &.disabled {
            & > div {
              background: #e0e0e0;
            }
          }
          &.allowSchedule {
            & > div {
              background: #bcddec;
            }
          }
          &.open {
            transition: all .3s;
            .itemName {
              display: none;
            }
            &:hover {
              height: 80px !important;
              z-index: 4;
              & > div {
                box-shadow: 0 0 20px rgba(255, 255, 255, .8);
              }
              .itemName {
                display: block;
              }
            }
          }
          em {
            position: absolute;
            top: 0;
            right: 4px;
            font-size: 10px;
          }
        }
      }
    }
  }
</style>
