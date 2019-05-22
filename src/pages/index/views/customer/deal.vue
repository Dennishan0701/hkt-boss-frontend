<template lang="html">
  <div class="deal">
    <!--面包屑-->
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">客户</BreadcrumbItem>
        <BreadcrumbItem>成交</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--tab切换-->
    <div class="setScreensBody">
      <!--tab选项列表-->
      <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
      <!--<Tabs type="card" :animated="false" class="tabs" @on-click="changeTab" v-model="tabStatus">-->
        <!--<TabPane v-if="isMenu('customer_deal_all')" name="all" label="全部"></TabPane>-->
        <!--<TabPane v-if="isMenu('customer_deal_waiting_fo_payment')" name="waitingForPayment" label="待支付"></TabPane>-->
        <!--<TabPane v-if="isMenu('customer_deal_waiting_fo_approved')" name="waitingForApproved" label="待审核"></TabPane>-->
        <!--<TabPane v-if="isMenu('customer_deal_completed')" name="completed" label="已完成"></TabPane>-->
      <!--</Tabs>-->
      <!--筛选组件+表格数据-->
      <tableData :api="api" :btnShow="btnShow"></tableData>
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

        tabClass:"lead",
        tabStatus: 'customer_deal_all',
        tabList: [
          {
            name: "customer_deal_all",
            label: "全部",
            content:"所有的生成订单的列表",
            show: ""
          },
          {
            name: "customer_deal_waiting_fo_payment",
            label: "待支付",
            content:"未支付完全的订单列表",
            show: ""
          },
          {
            name: "customer_deal_waiting_fo_approved",
            label: "待审核",
            content:"支付完全待财务审核的订单",
            show: ""
          },
          {
            name: "customer_deal_await_turn_over",
            label: "待移交",
            content:"财务审核完成的订单列表",
            show: ""
          },
          {
            name: "customer_deal_completed",
            label: "我的正式生",
            content:"财务审核完成的订单列表",
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
          tab: {'a': 'customer.deal', 'b': 'all'}
        },
        btnShow: []
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
        if (name == 'customer_deal_all') {
          this.api.tab = {'a': 'customer.deal', 'b': 'all'};
          this.btnShow = []
        }
        else if (name == 'customer_deal_waiting_fo_payment') {
          this.api.tab = {'a': 'customer.deal', 'b': 'waitingForPayment'};
          this.btnShow = []
        }
        else if (name == 'customer_deal_waiting_fo_approved') {
          this.api.tab = {'a': 'customer.deal', 'b': 'waitingForApproved'};
          this.btnShow = []
        }
        else if (name == 'customer_deal_await_turn_over') {
          this.api.tab = {'a': 'customer.deal', 'b': 'awaitTurnOver'};
          this.btnShow = ['transferToCR']
        }
        else if (name == 'customer_deal_completed') {
          this.api.tab = {'a': 'customer.deal', 'b': 'completed'};
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
