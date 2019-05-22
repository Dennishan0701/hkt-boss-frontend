<style lang="less">
</style>

<template lang="html">
    <div class="deal">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/team/tmk_management">团队</BreadcrumbItem>
                <BreadcrumbItem>TMK管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--筛选条件-->
        <div class="setScreensBody">
            <!--tab选项列表-->
            <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
            <!--<Tabs type="card" :animated="false" class="tabs tmkManagement" @on-click="changeTab" v-model="tabStatus">-->
                <!--<TabPane v-if="isMenu('team_TMK_all')" name="all" label="全部"></TabPane>-->
                <!--<TabPane v-if="isMenu('team_TMK_calls')" name="calls" label="通时通次"></TabPane>-->
                <!--<TabPane v-if="isMenu('team_TMK_calls_statistics')" name="callsStatistic" label="通时通次统计"></TabPane>-->
                <!--<TabPane v-if="isMenu('team_TMK_allocation_statistics')" name="distributionStatistic"-->
                         <!--label="名单分配统计"></TabPane>-->
            <!--</Tabs>-->
            <!--筛选组件+表格数据-->
            <distributionStatisticsTable v-show="this.tabStatus === 'distributionStatistic'"
                                         :user_role="'tmk'"></distributionStatisticsTable>
            <tableData v-show="this.tabStatus !== 'distributionStatistic'" :api="api" :btnShow="btnShow"></tableData>

        </div>
    </div>
</template>

<script>
  import {isMenu} from '@/api/common';
  import tabs from '@/components/tabs';
  import tableData from '@/components/tableData';
  import distributionStatisticsTable from './components/distributionStatisticsTable.vue';
  import {mapGetters, mapState} from 'vuex';
  import {setSession, getSession, removeSession} from '@/assets/js/storage'

  const map = {
    filters: "getAllfiltersAPI",
    tableDisplay: "tableDisplayAPI",
    choosefilters: "choosefiltersAPI",
    chooseDisplay: "chooseDisplayAPI",
    tableLeads: "tableDataAPI",
    filtersSetting: "filtersSettingAPI",
    displaySetting: "displaySettingAPI",
    setFilters: "setFiltersAPI",
    setDisplays: "setDisplaysAPI",
  }
  const mappingApiObject = (object, map) => {
    const returnObj = {}
    for (const key in object) {
      if (object.hasOwnProperty(key) && map.hasOwnProperty(key)) {
        returnObj[map[key]] = object[key]
      }
    }
    return returnObj
  }

  export default {
    data() {
      return {
        tabClass:"tmkManagement",
        tabStatus: 'team_TMK_all',
        tabList: [
          {
            name: "team_TMK_all",
            label: "全部",
            content:"我的所有的人员管理",
            show: ""
          },
          {
            name: "team_TMK_calls",
            label: "通时通次",
            content:"拨打电话次数及时长的展示",
            show: ""
          },
          {
            name: "team_TMK_calls_statistics",
            label: "通时通次统计",
            content:"拨打电话次数及时长的统计",
            show: ""
          },
          {
            name: "team_TMK_allocation_statistics",
            label: "名单分配统计",
            content:"名单分配的统计",
            show: ""
          },

        ],
        api: {},
        btnShow: ['stopDistribute', 'resumeDistribute', 'handleResignAssets']
      }
    },
    computed: {
      ...mapGetters([
        'fetchModal',
        'clickOK',
      ]),
      ...mapState({
        users: state => mappingApiObject(state.api.users, map),
        call_records: state => mappingApiObject(state.api.call_records, map),

      })
    },
    mounted() {
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
        if (name == 'team_TMK_all') {
          this.btnShow = ['stopDistribute', 'resumeDistribute', 'handleResignAssets'];
          this.api = {
            ...this.users,
            tab: {'a': 'team.tmk', 'b': 'all'}
          }
        }
        else if (name == 'team_TMK_calls') {
          this.btnShow = ['stopDistribute', 'resumeDistribute'];
          this.api = {
            ...this.call_records,
            tab: {a: 'team.tmk', b: 'calls'},
          }
        }
        else if (name == 'team_TMK_calls_statistics') {
          this.btnShow = []
          this.api = {
            ...this.call_records,
            tab: {'a': 'team.tmk', 'b': 'all'}
          }

        }
        else if (name == 'team_TMK_allocation_statistics') {
          this.api = {
            ...this.call_records,
            tab: {'a': 'team.tmk', 'b': 'distributionStatistic'}
          }
        }
      },
    },
    components: {
      tabs,
      tableData,
      distributionStatisticsTable
    },
  }

</script>
