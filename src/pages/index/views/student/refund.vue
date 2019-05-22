<style lang="less">


</style>

<template lang="html">
  <div class="deal">
    <!--面包屑-->
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/student/student">学生</BreadcrumbItem>
        <BreadcrumbItem>退费</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--筛选条件-->
    <div class="setScreensBody">
      <!--tab选项列表-->
      <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
      <!--<Tabs type="card" :animated="false" class="tabs refund" @on-click="changeTab" v-model="tabStatus">-->
        <!--<TabPane v-if="isMenu('student_refund_all')" label="全部" name="all"></TabPane>-->
        <!--<TabPane v-if="isMenu('student_refund_order_applied')" label="退费申请" name="order_applied"></TabPane>-->
      <!--</Tabs>-->
      <!--筛选组件+表格数据-->
      <tableData :api="api" :btnShow="btnShow"></tableData>
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

        tabClass:"refund",
        tabStatus: 'student_refund_all',
        tabList: [
          {
            name: "student_refund_all",
            label: "全部",
            content:"所有申请退费的记录",
            show: ""
          },
          {
            name: "student_refund_order_applied",
            label: "退费申请",
            content:"所有申请退费的记录",
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
          tab: {'a': 'student.refund', 'b': 'all'}
        },
        btnShow: [1, 2]
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
        if (name == 'student_refund_all') {
          this.api={
            getAllfiltersAPI: this.$store.state.api.customers.filters, //获取所有组件api
            tableDisplayAPI: this.$store.state.api.customers.tableDisplay, //获取所有table显示字段api
            choosefiltersAPI: this.$store.state.api.customers.choosefilters, //设置选择展示哪些筛选组件
            chooseDisplayAPI: this.$store.state.api.customers.chooseDisplay, //设置table选择展示哪有字段
            tableDataAPI: this.$store.state.api.customers.tableLeads, //获取table表数据
            filtersSettingAPI: this.$store.state.api.customers.filtersSetting,//管理员获取筛选显示数据
            displaySettingAPI: this.$store.state.api.customers.displaySetting,//管理员获取字段显示数据
            setFiltersAPI: this.$store.state.api.customers.setFilters,//管理员设置筛选显示数据
            setDisplaysAPI: this.$store.state.api.customers.setDisplays,//管理员设置字段显示数据
            tab: {'a': 'student.refund', 'b': 'all'}
          }
          this.btnShow = []
        }
        else if (name == 'student_refund_order_applied') {
          this.api = {
            getAllfiltersAPI: this.$store.state.api.order.filters, //获取所有组件api
            tableDisplayAPI: this.$store.state.api.order.tableDisplay, //获取所有table显示字段api
            choosefiltersAPI: this.$store.state.api.order.choosefilters, //设置选择展示哪些筛选组件
            chooseDisplayAPI: this.$store.state.api.order.chooseDisplay, //设置table选择展示哪有字段
            tableDataAPI: this.$store.state.api.order.tableLeads, //获取table表数据
            filtersSettingAPI: this.$store.state.api.order.filtersSetting,//管理员获取筛选显示数据
            displaySettingAPI: this.$store.state.api.order.displaySetting,//管理员获取字段显示数据
            setFiltersAPI: this.$store.state.api.order.setFilters,//管理员设置筛选显示数据
            setDisplaysAPI: this.$store.state.api.order.setDisplays,//管理员设置字段显示数据
            tab: {'a': 'student.refund', 'b': 'order_applied'}
          }
          this.btnShow = []
        }
      },
    },
    components: {
      tabs,
      tableData
    }
  }

</script>
