<style lang="less">
</style>

<template lang="html">
    <div class="deal">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/team/cc_management">团队</BreadcrumbItem>
                <BreadcrumbItem>CC管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--筛选条件-->
        <div class="setScreensBody">
            <!--tab选项列表-->
            <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
            <!--<Tabs type="card" :animated="false" class="tabs cc_management" @on-click="changeTab" v-model="tabStatus">-->
                <!--<TabPane v-if="isMenu('team_CC_all')" name="all" label="全部"></TabPane>-->
                <!--<TabPane v-if="isMenu('team_CC_calls')" name="calls" label="通时通次"></TabPane>-->
                <!--<TabPane v-if="isMenu('team_CC_calls_statistics')" name="callsStatistic" label="通时通次统计"></TabPane>-->
                <!--<TabPane v-if="isMenu('team_CC_allocation_statistics')" name="distributionStatistic" label="名单分配统计"></TabPane>-->
            <!--</Tabs>-->
            <!--筛选组件+表格数据-->
            <callStatisticsTable
              v-show="this.tabStatus === 'team_CC_calls_statistics'"
              :user_role="'cc'"
              :api="'/api/call_record_statistics'"
              ></callStatisticsTable>
            <distributionStatisticsTable
              v-show="this.tabStatus === 'team_CC_allocation_statistics'"
              :user_role="'cc'"
              :api="'/api/distribution_statistics'"
              ></distributionStatisticsTable>

            <tableData v-show="!~['team_CC_allocation_statistics', 'team_CC_calls_statistics'].indexOf(this.tabStatus)" :api="api" :btnShow="btnShow"></tableData>
        </div>
    </div>
</template>

<script>
  import {isMenu} from '@/api/common';
  import tabs from '@/components/tabs';
  import tableData from '@/components/tableData';
  import distributionStatisticsTable from './components/distributionStatisticsTable.vue';
  import callStatisticsTable from './components/callStatisticsTable.vue';
  import {mapGetters} from 'vuex';
  import {setSession, getSession, removeSession} from '@/assets/js/storage'

  export default {
    data() {
      return {
        tabClass:"cc_management",
        tabStatus: 'team_CC_all',
        tabList: [
          {
            name: "team_CC_all",
            label: "全部",
            content:"我的所有的人员管理",
            show: ""
          },
          {
            name: "team_CC_calls",
            label: "通时通次",
            content:"拨打电话次数及时长的展示",
            show: ""
          },
          {
            name: "team_CC_calls_statistics",
            label: "通时通次统计",
            content:"拨打电话次数及时长的统计",
            show: ""
          },
          {
            name: "team_CC_allocation_statistics",
            label: "名单分配统计",
            content:"名单分配的统计",
            show: ""
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
          tab: {'a': 'team.cc', 'b': 'all'}
        },
        btnShow: ['stopDistribute', 'resumeDistribute', 'handleResignAssets']
      }
    },
    computed: {
      ...mapGetters([
        'fetchModal',
        'clickOK'
      ]),
    },
    mounted() {
      // this.tabStatus = getSession('tab_status') || 'all';
      // this.changeTab(this.tabStatus);
    },
    beforeDestroy() {
      removeSession('tab_status')
    },
    watch: {
      clickOK(newValue, oldValue) {
        if (newValue > 0) {//如果点击了弹窗的确定
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
        if (name == 'team_CC_all') {
          this.btnShow = ['stopDistribute', 'resumeDistribute', 'handleResignAssets'];
          this.api = {
            getAllfiltersAPI: this.$store.state.api.users.filters, //获取所有组件api
            tableDisplayAPI: this.$store.state.api.users.tableDisplay, //获取所有table显示字段api
            choosefiltersAPI: this.$store.state.api.users.choosefilters, //设置选择展示哪些筛选组件
            chooseDisplayAPI: this.$store.state.api.users.chooseDisplay, //设置table选择展示哪有字段
            tableDataAPI: this.$store.state.api.users.tableLeads, //获取table表数据
            filtersSettingAPI: this.$store.state.api.users.filtersSetting,//管理员获取筛选显示数据
            displaySettingAPI: this.$store.state.api.users.displaySetting,//管理员获取字段显示数据
            setFiltersAPI: this.$store.state.api.users.setFilters,//管理员设置筛选显示数据
            setDisplaysAPI: this.$store.state.api.users.setDisplays,//管理员设置字段显示数据
            tab: {'a': 'team.cc', 'b': 'all'}
          }
        }
        else if (name == 'team_CC_calls') {
          let {
            call_records: {
              filters: getAllfiltersAPI,
              tableDisplay: tableDisplayAPI,
              choosefilters: choosefiltersAPI,
              chooseDisplay: chooseDisplayAPI,
              tableLeads: tableDataAPI,
              filtersSetting: filtersSettingAPI,
              displaySetting: displaySettingAPI,
              setFilters: setFiltersAPI,
              setDisplays: setDisplaysAPI,
            }
          } = this.$store.state.api;

          this.btnShow = ['stopDistribute', 'resumeDistribute'];
          this.api = {
            getAllfiltersAPI,
            tableDisplayAPI,
            choosefiltersAPI,
            chooseDisplayAPI,
            tableDataAPI,
            filtersSettingAPI,
            displaySettingAPI,
            setFiltersAPI,
            setDisplaysAPI,
            tab: {a: 'team.cc', b: 'calls'},
          }
        }
        else if (name == 'team_CC_calls_statistics') {
          this.btnShow = []
          this.api = {
            getAllfiltersAPI: this.$store.state.api.call_records.filters, //获取所有组件api
            tableDisplayAPI: this.$store.state.api.call_records.tableDisplay, //获取所有table显示字段api
            choosefiltersAPI: this.$store.state.api.call_records.choosefilters, //设置选择展示哪些筛选组件
            chooseDisplayAPI: this.$store.state.api.call_records.chooseDisplay, //设置table选择展示哪有字段
            tableDataAPI: this.$store.state.api.call_records.tableLeads, //获取table表数据
            filtersSettingAPI: this.$store.state.api.call_records.filtersSetting,//管理员获取筛选显示数据
            displaySettingAPI: this.$store.state.api.call_records.displaySetting,//管理员获取字段显示数据
            setFiltersAPI: this.$store.state.api.call_records.setFilters,//管理员设置筛选显示数据
            setDisplaysAPI: this.$store.state.api.call_records.setDisplays,//管理员设置字段显示数据
            tab: {'a': 'team.cc', 'b': 'all'}
          }
        }
        else if (name == 'team_CC_allocation_statistics') {

        }
      },
    },
    components: {
      tabs,
      tableData,
      distributionStatisticsTable,
      callStatisticsTable
    }
  }

</script>
