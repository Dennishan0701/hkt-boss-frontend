<style lang="less">
</style>

<template lang="html">
    <div class="deal">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/team/cr_management">团队</BreadcrumbItem>
                <BreadcrumbItem>CR管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--筛选条件-->
        <div class="setScreensBody">
            <!--tab选项列表-->
            <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
            <!--<Tabs type="card" :animated="false" class="tabs" @on-click="changeTab" v-model="tabStatus">-->
                <!--<TabPane v-if="isMenu('team_CR_all')" name="all" label="全部"></TabPane>-->
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
        tabClass:"cr_management",
        tabStatus: 'team_CR_all',
        tabList: [
          {
            name: "team_CR_all",
            label: "全部",
            content:"我的所有的人员管理",
            show: ""
          },
          {
            name: "team_CR_calls",
            label: "通时通次",
            content:"拨打电话次数及时长的展示",
            show: ""
          }
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
          tab: {'a': 'team.cr', 'b': 'all'}
        },
        btnShow: ['handleResignAssets']
      }
    },

    computed: {
      ...mapGetters([
        'fetchModal',
        'clickOK'
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

      },
      //切换tab
      changeTab(name) {
        this.tabStatus = name;
        setSession('tab_status', name);
        if (name == 'team_CR_all') {
          this.api.tab = {'a': 'team.cr', 'b': 'all'};
          this.btnShow = ['handleResignAssets'];
        } else if (name == 'team_CR_calls') {
          this.api = {
            ...this.call_records,
            tab: {'a': 'team.cr', 'b': 'calls'}
          }
          this.btnShow = ['stopDistribute', 'resumeDistribute'];
        }
      },
    },
    components: {
      tabs,
      tableData
    }
  }

</script>
