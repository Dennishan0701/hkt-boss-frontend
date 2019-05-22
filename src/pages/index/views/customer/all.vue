<template lang="html">
  <div class="deal">
    <!--面包屑-->
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">客户</BreadcrumbItem>
        <BreadcrumbItem>全部</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--tab切换-->
    <div class="setScreensBody">
      <!--tab选项列表-->
      <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
      <!--筛选组件+表格数据-->
      <tableData :api="api" :btnShow="btnShow" :distribute_params="distribute_params"></tableData>
    </div>
  </div>

</template>
<style lang="less">
</style>
<script>
  import {isMenu} from '@/api/common';
  import tabs from '@/components/tabs';
  import tableData from '@/components/tableData';
  import {mapGetters} from 'vuex';
  import {setSession, getSession, removeSession} from '@/assets/js/storage'

  export default {
    data () {
      return {
        tabClass:"customer_all",
        tabStatus: 'customer_all_all',
        tabList: [
          {
            name: "customer_all_all",
            label: "全部",
            content:"所有存在过客户阶段的名单的列表",
            show: ""
          },
          {
            name: "customer_all_my_all",
            label: "我的全部",
            content:"所有我的名下的存在过客户阶段的名单的列表",
            show: ""
          },
        ],
        api: {
          getAllfiltersAPI: this.$store.state.api.lead.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.lead.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.lead.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.lead.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.lead.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.lead.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.lead.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.lead.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.lead.setDisplays,//管理员设置字段显示数据
          tab: {'a': 'customer.all', 'b': 'all'}
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
      this.tabStatus = getSession ('tab_status') || 'all';
      this.changeTab (this.tabStatus);
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
        if (name == 'customer_all_all') {
          this.api.tab = {'a': 'customer.all', 'b': 'all'};
          this.btnShow = [1, 2]
        }
        else if (name == 'customer_all_my_all') {
          this.api.tab = {'a': 'customer.all', 'b': 'my-all'};
          this.btnShow = ['addProtect', 'throwLeadAway', 'distribute', "createRecommendLead"];
          this.distribute_params ={title:'分配名单[CC-CC]',role:'cc',distribution_scenario:'cc-cc'};
        }
      },
    },
    components: {
      tabs,
      tableData
    }
  }

</script>
