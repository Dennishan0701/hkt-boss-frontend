<style lang="less">
</style>

<template lang="html">
    <div class="deal">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/team/tr_management">团队</BreadcrumbItem>
                <BreadcrumbItem>TR管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--筛选条件-->
        <div class="setScreensBody">
            <!--tab选项列表-->
            <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
            <!--<Tabs type="card" :animated="false" class="tabs" @on-click="changeTab" v-model="tabStatus">-->
                <!--<TabPane v-if="isMenu('team_TR_all')" name="all" label="全部"></TabPane>-->
            <!--</Tabs>-->
            <!--筛选组件+表格数据-->
            <tableData v-if="tabStatus === 'team_TR_all'" :api="api" :btnShow="btnShow"></tableData>
            <!-- 教师查询页 -->
            <teacher-query v-if="tabStatus === 'team_TR_query'"></teacher-query>
        </div>
    </div>

</template>

<script>
  import {isMenu} from '@/api/common';
  import tabs from '@/components/tabs';
  import tableData from '@/components/tableData';
  import {mapGetters} from 'vuex';
  import {setSession, getSession, removeSession} from '@/assets/js/storage'
  import teacherQuery from './components/teacherQuery'

  export default {
    data() {
      return {
        tabClass:"tr_management",
        tabStatus: 'team_TR_all',
        tabList: [
          {
            name: "team_TR_all",
            label: "全部",
            content:"我的所有的人员管理",
          }, {
            name: "team_TR_query",
            label: "教师查询",
            content:"我的所有的人员查询",
          },
        ],
        api: {
          getAllfiltersAPI: this.$store.state.api.users.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.users.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.users.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.users.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.users.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.users.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.users.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.users.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.users.setDisplays,//管理员设置字段显示数据
          tab: {'a': 'team.mkt', 'b': 'all'}
        },
        btnShow: ['handleResignAssets']
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
        if (name == 'team_TR_all') {
          this.api.tab = {'a': 'team.tr', 'b': 'all'};
          this.btnShow = ['handleResignAssets'];
        }
      },
    },
    components: {
      tabs,
      tableData,
      teacherQuery
    }
  }

</script>
