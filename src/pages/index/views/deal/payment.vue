<style lang="less">


</style>

<template lang="html">
  <div class="deal">
    <!--面包屑-->
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/deal/order">报名</BreadcrumbItem>
        <BreadcrumbItem>流水</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--筛选条件-->
    <div class="setScreensBody">
      <!--tab选项列表-->
      <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
      <!--<Tabs type="card" :animated="false" class="tabs payment" @on-click="changeTab" v-model="tabStatus">-->
        <!--<TabPane v-if="isMenu('deal_payment_all')" name="all" label="全部"></TabPane>-->
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
        tabClass:"payment",
        tabStatus: 'deal_payment_all',
        tabList: [
          {
            name: "deal_payment_all",
            label: "全部",
            content:"所有的流水的页面",
            show: ""
          }, {
            name: "deal_payment_unreviewed",
            label: "待审核",
            content:"待审核的流水的页面",
            show: ""
          }, {
            name: "deal_payment_approve",
            label: "已审核",
            content:"已审核通过的流水的页面",
            show: ""
          }, {
            name: "deal_payment_reject",
            label: "已取消",
            content:"已取消的流水的页面",
            show: ""
          }
        ],
        api: {
          getAllfiltersAPI: this.$store.state.api.payment.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.payment.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.payment.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.payment.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.payment.tableLeads, //获取table表数据
          tab: {'a': 'deal.payment', 'b': 'all'}
        },
        btnShow: ['manualSubmitPayment','manualAudit']
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
        setSession ('tab_status', name);
        switch (name) {
          case 'deal_payment_all':
            this.api.tab = {'a': 'deal.payment', 'b': 'all'};
            this.btnShow = ['manualAudit'];
            break;
          case 'deal_payment_unreviewed':
            this.api.tab = {'a': 'deal.payment', 'b': 'unreviewed'};
            this.btnShow = ['manualAudit', 'miaomiao', 'bind_order'];
            break;
          case 'deal_payment_approve':
            this.api.tab = {'a': 'deal.payment', 'b': 'approve'};
            this.btnShow = ['bind_order'];
            break;
          case 'deal_payment_reject':
            this.api.tab = {'a': 'deal.payment', 'b': 'reject'};
            this.btnShow = [];
            break;
          default:
            break;
        }
      },
    },
    components: {
      tabs,
      tableData
    }
  }

</script>
