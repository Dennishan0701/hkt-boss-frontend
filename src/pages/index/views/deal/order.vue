<style lang="less">
</style>
<template lang="html">
    <div class="deal">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/deal/order">报名</BreadcrumbItem>
                <BreadcrumbItem>订单</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--筛选条件-->
        <div class="setScreensBody">
            <!--tab选项列表-->
            <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
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
    data() {
      return {
        tabClass: "order",
        tabStatus: 'deal_order_all',
        tabList: [
          {
            name: "deal_order_all",
            label: "全部",
            content: "所有订单的总集",
            show: ""
          },
          {
            name: "deal_order_unpaid",
            label: "待支付",
            content: "所有的未完全支付的订单",
            show: ""
          },
          {
            name: "deal_order_check_pending",
            label: "待审核",
            content: "支付完全待财务审核的订单",
            show: ""
          },
          {
            name: "deal_order_refused",
            label: "已拒绝",
            content: "被财务拒绝的订单",
            show: ""
          },
          {
            name: "deal_order_finishined",
            label: "已完成",
            content: "审核完成的订单",
            show: ""
          },
          {
            name: "deal_order_canceled",
            label: "已取消",
            content: "已经取消的订单",
            show: ""
          },

        ],
        api: {
          getAllfiltersAPI: this.$store.state.api.order.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.order.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.order.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.order.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.order.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.order.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.order.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.order.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.order.setDisplays,//管理员设置字段显示数据
          auditPassAPI: this.$store.state.api.order.auditPass,//结算-订单-待支付/待审核-审核通过
          tab: {'a': 'deal.order', 'b': 'all'},
        },
        btnShow: ['applyForRefund'],
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
        if (name == "deal_order_all") {
          this.api.tab = {'a': 'deal.order', 'b': 'all'};
          this.btnShow = ['applyForRefund'];
        }
        else if (name == "deal_order_unpaid") {
          this.api.tab = {'a': 'deal.order', 'b': 'to_be_paid'};
          this.btnShow = ['applyForRefund', "addPayRecord", "refundFund", "auditReject"];
        }
        else if (name == "deal_order_check_pending") {
          this.api.tab = {'a': 'deal.order', 'b': 'to_be_audited'};
          this.btnShow = ['applyForRefund', "auditPass", "auditReject", 'update_payment_time'];
        }
        else if (name == "deal_order_refused") {
          this.api.tab = {'a': 'deal.order', 'b': 'audit_no'};
          this.btnShow = ['editOrder'];
        }
        else if (name == "deal_order_finishined") {
          this.api.tab = {'a': 'deal.order', 'b': 'success'};
          this.btnShow = ['applyForRefund'];
        }
        else if (name == "deal_order_canceled") {
          this.api.tab = {'a': 'deal.order', 'b': 'cancel'};
          this.btnShow = [];
        }
      },
    },
    components: {
      tabs,
      tableData
    }
  }

</script>
