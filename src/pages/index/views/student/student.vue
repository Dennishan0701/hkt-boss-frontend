<style lang="less">


</style>

<template lang="html">
    <div class="deal">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/student/student">学生</BreadcrumbItem>
                <BreadcrumbItem>在读</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--筛选条件-->
        <div class="setScreensBody">
            <!--tab选项列表-->
            <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
            <!--<Tabs type="card" :animated="false" class="tabs student" @on-click="changeTab" v-model="tabStatus">-->
                <!--<TabPane v-if="isMenu('student_student_all')" name="all" label="全部"></TabPane>-->
                <!--<TabPane v-if="isMenu('student_student_maintain')" name="maintainStudent" label="维护学生"></TabPane>-->
                <!--<TabPane v-if="isMenu('student_student_class_ending')" name="endSchoolStudent" label="结课学生"></TabPane>-->
                <!--<TabPane v-if="isMenu('student_student_schedules')" name="courseSchedule" label="课程计划"></TabPane>-->
                <!--<TabPane v-if="isMenu('student_student_formal_class_each')" name="formalClassEach" label="课次记录"></TabPane>-->
                <!--<TabPane v-if="isMenu('student_student_trial_class_each')" name="trialClassEach" label="试听记录"></TabPane>-->
                <!--<TabPane v-if="isMenu('student_student_handle_hesign_assets')" name="handleResignAssets" label="离职人员正式生分配"></TabPane>-->
            <!--</Tabs>-->
            <!--筛选组件+表格数据-->
            <tableData :api="api" :btnShow="btnShow" :isOperation="isOperation"
                       :distribute_params="distribute_params"></tableData>
        </div>
    </div>
</template>

<script>
  import {isMenu} from '@/api/common';
  import tabs from '@/components/tabs';
  import DataFilter from '@/components/filter';
  import tableData from '@/components/tableData';
  import {mapGetters} from 'vuex';
  import {setSession, getSession, removeSession} from '@/assets/js/storage'

  export default {
    data() {
      return {
        tabClass:"student",
        tabStatus: 'student_student_all',
        tabList: [
          {
            name: "student_student_all",
            label: "全部",
            content:"所有学生的列表",
            show: ""
          },
          {
            name: "student_student_maintain",
            label: "维护学生",
            content:"所有在读学生的列表",
            show: ""
          },
          {
            name: "student_student_class_ending",
            label: "结课学生",
            content:"课时消耗完的学生列表",
            show: ""
          },
          {
            name: "student_student_schedules",
            label: "课程计划",
            content:"已安排的课程计划的列表",
            show: ""
          },{
            name: "student_student_formal_class_each",
            label: "课次记录",
            content:"所有的排课及上课记录",
            show: ""
          },{
            name: "student_student_trial_class_each",
            label: "试听记录",
            content:"所有申请试听的记录",
            show: ""
          },{
            name: "student_student_handle_hesign_assets",
            label: "离职人员正式生分配",
            content:"离职cr的正式生列表",
            show: ""
          },

        ],
        api: {},
        allAPI: {
          getAllfiltersAPI: this.$store.state.api.customers.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.customers.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.customers.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.customers.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.customers.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.customers.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.customers.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.customers.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.customers.setDisplays,//管理员设置字段显示数据
          recoverClassesAPI: this.$store.state.api.customers.recoverClassesAPI,//学生-在读-维护学生-恢复上课
          cancellationAPI: this.$store.state.api.customers.cancellationAPI,//学生-在读-课程计划-点击作废
          tab: {'a': 'student.student', 'b': 'all'}
        },
        class_schedulesAPI: {
          getAllfiltersAPI: this.$store.state.api.class_schedules.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.class_schedules.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.class_schedules.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.class_schedules.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.class_schedules.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.class_schedules.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.class_schedules.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.class_schedules.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.class_schedules.setDisplays,//管理员设置字段显示数据
          recoverClassesAPI: this.$store.state.api.customers.recoverClassesAPI,//学生-在读-维护学生-恢复上课
          cancellationAPI: this.$store.state.api.customers.cancellationAPI,//学生-在读-课程计划-点击作废
          tab: {'a': 'student.student', 'b': 'schedules'}
        },
        class_eachesAPI: {
          getAllfiltersAPI: this.$store.state.api.class_eaches.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.class_eaches.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.class_eaches.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.class_eaches.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.class_eaches.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.class_eaches.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.class_eaches.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.class_eaches.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.class_eaches.setDisplays,//管理员设置字段显示数据
          recoverClassesAPI: this.$store.state.api.customers.recoverClassesAPI,//学生-在读-维护学生-恢复上课
          cancellationAPI: this.$store.state.api.customers.cancellationAPI,//学生-在读-课程计划-点击作废
          tab: {'a': 'student.student', 'b': 'formal_class_each'}
        },
        btnShow: ['createOrder', 'arrangeExtendedTrial', 'applyForSuspension', 'applyForRefund', 'createRecommendLead'],
        isOperation: false,
        distribute_params: '',
      }
    },
    computed: {
      ...mapGetters([
        'fetchModal',
        'clickOK'
      ]),
    },
    mounted() {
    },
    beforeDestroy() {
      removeSession('tab_status')
    },
    watch: {
      clickOK(newValue, oldValue) {
        console.log(newValue);
        if (newValue > 0) {//如果点击了弹窗的确定
          console.log("点击确定了");
          this.getTableData();
        }
      },
    },
    methods: {
      isMenu,
      //点击弹窗
      modalShow() {
        this.$store.commit("FETCH_MODAL", "true");
        // this.$store.commit("CLICK_OK",0);
      },
      //切换tab
      changeTab(name) {
        this.tabStatus = name;
        setSession('tab_status', name);
        if (name == 'student_student_all') {
          this.api = this.allAPI;
          this.api.tab = {'a': 'student.student', 'b': 'all'};
          this.btnShow = ["redistribution"];
          this.distribute_params = {title: '正式生再分配[CR-CR]', role: 'cr', distribution_scenario: 'cr-cr'};
        }
        else if (name == 'student_student_maintain') {//维护学生
          this.api = this.allAPI;
          this.api.tab = {'a': 'student.student', 'b': '1'};
          this.btnShow = ['createOrder', 'arrangeExtendedTrial', 'applyForSuspension', 'applyForRefund', 'createRecommendLead', 'addCoursePlan', 'markStudents'];
        }
        else if (name == 'student_student_class_ending') {//结课学生
          this.api = this.allAPI;
          this.api.tab = {'a': 'student.student', 'b': '2'};
          this.btnShow = [];
        }
        else if (name == 'student_student_schedules') {//课程计划
          this.api = this.class_schedulesAPI;
          this.api.tab = {'a': 'student.student', 'b': 'schedules'};
          this.btnShow = ["changeCoursePlan", "arrangeCourses"];
        }
        else if (name == 'student_student_formal_class_each') {//课次记录
          this.api = this.class_eachesAPI;
          this.api.tab = {'a': 'student.student', 'b': 'formal_class_each'};
          this.btnShow = ["cancelClasses", "adjustClasses"];
        }
        else if (name == 'student_student_trial_class_each') {//试听记录
          this.api = this.class_eachesAPI;
          this.api.tab = {'a': 'student.student', 'b': 'trial_class_each'};
          this.btnShow =[];
          this.isOperation = true;
        }
        else if (name == 'student_student_handle_hesign_assets') {//离职人员正式生分配
          this.api = this.allAPI;
          this.api.tab = {'a': 'student.student', 'b': 'handleResignAssets'};
          this.btnShow = ['assignCR'];
          this.distribute_params = {title: '分配学生[CR-CR]', role: 'cr', distribution_scenario: 'cr-cr'};
        }
      },
    },
    components: {
      tabs,
      tableData
    }
  }

</script>
