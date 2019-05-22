<style lang="less">


</style>

<template lang="html">
  <div class="deal">
    <!--面包屑-->
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/student/student">学生</BreadcrumbItem>
        <BreadcrumbItem>入学安排</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--筛选条件-->
    <div class="setScreensBody">
      <!--tab选项列表-->
      <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
      <!--<Tabs type="card" :animated="false" class="tabs" @on-click="changeTab" v-model="tabStatus">-->
        <!--<TabPane v-if="isMenu('student_arranged_all')" name="all" label="全部"></TabPane>-->
        <!--<TabPane v-if="isMenu('student_arranged_to_be_arranged')" name="toBeDistributed" label="待分配"></TabPane>-->
        <!--<TabPane v-if="isMenu('student_arranged_to_be_scheduled')" name="toBeScheduled" label="待安排"></TabPane>-->
      <!--</Tabs>-->
      <!--筛选组件+表格数据-->
    <tableData :api="api" :btnShow="btnShow" :isRefresh="isRefresh" :distribute_params="distribute_params"></tableData>
    </div>
  </div>

</template>

<script>
  import {isMenu} from '@/api/common';
  import tabs from '@/components/tabs';
  import tableData from '@/components/tableData';
  import {mapGetters} from 'vuex';
  import {setSession, getSession, removeSession} from '@/assets/js/storage'

  export default {
    data () {
      return {
        tabClass:"toBeArranged",
        tabStatus: 'student_arranged_all',
        tabList: [
          {
            name: "student_arranged_all",
            label: "全部",
            content:"所有cc移交过来的待分配和待安排的学生的集合",
            show: ""
          },
          {
            name: "student_arranged_to_be_arranged",
            label: "待分配（经理）",
            content:"待分配的正式生",
            show: ""
          },
          {
            name: "student_arranged_manager_to_be_arranged",
            label: "待分配（主管）",
            content:"待分配的正式生",
            show: ""
          },
          {
            name: "student_arranged_to_be_scheduled",
            label: "待安排",
            content:"待安排课程计划的学生列表",
            show: ""
          },

        ],
        api: {
          getAllfiltersAPI: this.$store.state.api.customers.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.customers.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.customers.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.customers.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.customers.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.customers.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.customers.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.customers.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.customers.setDisplays,//管理员设置字段显示数据
          tab: {'a': 'student.tobeArranged', 'b': 'all'}
        },
        btnShow: ['assignCR'],
        isRefresh: false,
        modalType:'',
        distribute_params:''
      }
    },

    computed: {
      ...mapGetters ([
        'fetchModal',
        'clickOK'
      ]),
    },
    mounted () {
    },
    beforeDestroy () {
      removeSession('tab_status')
    },
    watch: {
      clickOK (newValue, oldValue) {
        console.log (newValue);
        if (newValue > 0) {//如果点击了弹窗的确定
          console.log ("点击确定了");
          this.getTableData ();
        }
      },
    },
    methods: {
      isMenu,
      //点击弹窗
      modalShow () {
        this.$store.commit ("FETCH_MODAL", "true");
        // this.$store.commit("CLICK_OK",0);
      },
      //切换tab
      changeTab (name) {
        this.tabStatus = name;
        setSession('tab_status', name);
        if (name == 'student_arranged_all') {
          this.api.tab = {'a': 'student.tobeArranged', 'b': 'all'};
          this.btnShow = []
        }
        else if(name == 'student_arranged_to_be_arranged'){
          this.api.tab = {'a': 'student.tobeArranged', 'b': 'toBeDistributed'};
          this.btnShow = ['assignCR'];
          this.distribute_params ={title:'分配学生[CR-CR]',role:'cr',distribution_scenario:'cr-cr'};
        }
        else if(name == 'student_arranged_manager_to_be_arranged'){
          this.api.tab = {'a': 'student.tobeArranged', 'b': 'managerToBeDistributed'};
          this.btnShow = ['assignCR'];
          this.distribute_params ={title:'分配学生[CR-CR]',role:'cr',distribution_scenario:'cr-cr'};
        }
        // else if(name == 'student_arranged_to_be_arranged'){
        //   this.api.tab = {'a': 'student.tobeArranged', 'b': 'toBeDistributed'};
        //   this.btnShow = ['assignCR'];
        //   this.distribute_params ={title:'分配学生[CR-CR]',role:'cr',distribution_scenario:'cr-cr'};
        // }
        else if(name == 'student_arranged_to_be_scheduled'){
          this.api.tab = {'a': 'student.tobeArranged', 'b': 'toBeScheduled'};
          this.btnShow = ['arrangeCoursePlan'];
        }
      },
    },
    components: {
      tabs,
      tableData
    }
  }

</script>
