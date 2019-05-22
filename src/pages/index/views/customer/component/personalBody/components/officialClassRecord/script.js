import { getFieldOptions } from '../../../../getData'

const getRandomStr = () =>
  Math.random()
    .toString(16)
    .slice(2, 7)
const selectItem = {
  type: 'selection',
  width: 60,
  align: 'center',
}

export default {
  components: {},
  data() {
    return {
      currentTeacher: '王俊凯', //当前上课老师
      subjects: this.mock('subject'), //课程
      currentSub: 0, // 当前课程
      adjust: {
        // 课程调整弹窗
        visible: false, //显隐
        loading: true, //loading
      },
      requirements: {
        //要求
        learning: {
          //学习要求
          grade: '',
          subject: '',
          textBookVersion: '',
          classform: '',
          classTeacher: '',
          classTime: '',
          reason: '',
        },
        teacher: {
          //教师要求
          gender: '',
          teaching: '',
        },
      },
      gradeList: [],
      subjectList: [],
      textbookList: [],
      classformList: [],
      classTeacherList: [],
      classTimeList: [],
      genderList: [],
      page: null,
      pagination: null,
      officialHeaders: [
        { key: 'grade', title: '年级', width: 80 },
        { key: 'subject', title: '科目', width: 100 },
        { key: 'textbook', title: '教材版本', width: 100 },
        { key: 'teacher', title: '老师姓名', width: 100 },
        { key: 'teacher_mobile', title: '老师手机号', width: 120 },
        {
          key: 'standard_class_feedback',
          title: '课后反馈',
          width: 160,
          slot: 'feedback'
        },
        { key: 'arranged_time_start', title: '排课开始时间', width: 120 },
        { key: 'arranged_time_end', title: '排课结束时间', width: 120 },
        { key: 'actual_time_start', title: '实际开始时间', width: 120 },
        { key: 'actual_time_end', title: '实际结束时间', width: 120 },
        { key: 'total_common_length', title: '共同时长', width: 100 },
        { key: 'confirm_length', title: '确认时长', width: 100 },
        { key: 'class_arranged_by', title: '排课人姓名', width: 110 },
        // { key: 'course_type', title: '课程类型', width: 100 },
        // { key: 'course_form', title: '上课形式', width: 100 },
        // { key: 'course_length', title: '上课时长', width: 100 },
        // { key: 'gender_require', title: '性别需求', width: 100 },
        // { key: 'study_require', title: '学习需求', width: 100 },
        // { key: 'trial_feedback', title: '试听反馈', width: 100 },
        // { key: 'applicant_type', title: '申请人类型', width: 100 },
        // { key: 'applicant_name', title: '申请人姓名', width: 100 },
      ],
      officialColnums: [],
    }
  },
  async created() {
    this.init()
    // this.subjects.forEach(e => {
    //   e.plan = this.mock('plan')
    //   e.pending = this.mock('pending')
    // })
    // this.gradeList = await getFieldOptions('grade')
  },
  mounted() {},
  methods: {
    init() {
      this.page = {
        page: 1,
        page_size: 10,
      }
      this.pagination = {
        total: 0,
      }
      this.getOfficialData()
    },
    getOfficialData() {
      this.$axios
        .post(`${API}/api/personal/class-eaches/formal/list`, {
          ...this.page,
          main_id: this.$route.query.id,
        })
        .then(res => {
          if (res.status) {
            this.officialColnums = res.data.list
            this.pagination = res.data.page
          }
        })
    },
    adjustClass() {
      this.adjust.visible = true
    },
    confirmAdjust() {},
    cancelAdjust() {},
    selectChange() {},
    changeSub(index) {
      this.currentSub = index
    },
    isNeedTip(str) {
      return str && str.length && str.length > 10 ? true : false
    },
    pageChange(page) {
      this.page.page = page
      this.getOfficialData()
    },
    pageSizeChange(size) {
      this.page.page_size = size
      this.getOfficialData()
    },
    mock(type, ...args) {
      switch (type) {
        case 'subject':
          return Array.from({ length: 3 }).map((e, i) => ({
            name: `学科 - ${i + 1}`,
            id: i,
          }))
        case 'plan':
          const plan = {
            fill: [],
          }
          Array.from({ length: 11 }).forEach((e, i) => {
            const str = getRandomStr()
            plan[`key - ${str}`] = `value - ${str}`
            if (i === 9 || i === 10) {
              plan.fill.push(i + 1)
            }
          })
          return plan
        case 'pending':
          const pendingHeaders = this.mock('pendingHeaders')
          const pendingContent = Array.from({ length: 6 }).map((e, i) => {
            const pendingRow = this.mock('pendingRow', pendingHeaders)
            for (let key in pendingRow) {
              pendingRow[key] = `${pendingRow[key]} - ${i}`
            }
            return pendingRow
          })
          // 给 headers 添加selection
          pendingHeaders.unshift(selectItem)
          return {
            headers: pendingHeaders,
            content: pendingContent,
          }
        case 'pendingHeaders':
          return [
            {
              title: '上课老师',
              key: 'executor',
              width: 150,
            },
            {
              title: '安排上课时间',
              key: 'executionTime',
              width: 150,
            },
            {
              title: '排课人',
              key: 'planner',
              width: 150,
            },
          ]
        case 'pendingRow':
          let row = {
            source: 'pending',
          }
          args[0].forEach((e, i) => {
            row[e.key] = `${e.title} - ${i}`
            if (e.key !== 'executionTime') {
              row[`${e.key}Id`] = i
            }
          })
          return row
        case 'complete':
          return Array.from({ length: 3 }).map((e, i) => ({
            name: '学科' + (i + 1),
          }))
        default:
          break
      }
    },
  },
}
