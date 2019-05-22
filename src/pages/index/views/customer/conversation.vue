<template lang="html">
    <div class="deal">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/components/breadcrumb">客户</BreadcrumbItem>
                <BreadcrumbItem>洽谈</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--tab切换-->
        <div class="setScreensBody">
            <!--tab选项列表-->
            <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
            <!--<Tabs type="card" :animated="false" class="tabs" @on-click="changeTab"  v-model="tabStatus">-->
                <!--<TabPane v-if="isMenu('customer_conversation_all')" name="all" label="全部"></TabPane>-->
                <!--<TabPane v-if="isMenu('customer_conversation_all_my')" name="customer_conversation_all_my" label="我的全部"></TabPane>-->
                <!--<TabPane v-if="isMenu('customer_conversation_distributed_1')" name="toBeDistributed_1" label="待分配（经理）"></TabPane>-->
                <!--<TabPane v-if="isMenu('customer_conversation_distributed_2')" name="toBeDistributed_2" label="待分配（主管）"></TabPane>-->
                <!--<TabPane v-if="isMenu('customer_conversation_my_protected')" name="protectedList" label="保护名单"></TabPane>-->
            <!--</Tabs>-->
            <!--筛选组件+表格数据-->
            <tableData :api="api" :btnShow="btnShow" :isRefresh="isRefresh" :distribute_params="distribute_params"></tableData>
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
  import {setSession,getSession,removeSession} from '@/assets/js/storage'

  export default {
    data() {
      return {
        tabClass:"conversation",
        tabStatus: 'customer_conversation_all',
        tabList: [
          {
            name: "customer_conversation_all",
            label: "全部",
            content:"全部处于洽谈阶段的名单",
            show: ""
          },
          {
            name: "customer_conversation_all_my",
            label: "我的全部",
            content:"我的全部名单",
            show: ""
          },
          // {
          //   name: "customer_conversation_distributed_1",
          //   label: "待分配（经理）",
          //   content:"",
          //   show: ""
          // },
          {
            name: "customer_conversation_distributed_2",
            label: "待分配（主管）",
            content:"待cc主管分配给cc的名单",
            show: ""
          },
          {
            name: "customer_conversation_my_protected",
            label: "保护名单",
            content:"cc添加保护的名单的列表",
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
          addProtectAPI: this.$store.state.api.lead.addProtect, //添加保护名单
          giveUpAPI:this.$store.state.api.lead.giveup,//放弃名单
          tab: {'a': 'customer.conversation', 'b': 'all'}
        },
        btnShow: ['addProtect', 'throwLeadAway'],
          isRefresh: false,
          modalType:'',
          distribute_params:''
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
    beforeDestroy () {
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
      // modalShow() {
      //   this.$store.commit("FETCH_MODAL", "true");
      //   // this.$store.commit("CLICK_OK",0);
      // },

      //切换tab
      changeTab(name) {
        this.tabStatus = name;
        setSession('tab_status', name);
        if (name == 'customer_conversation_all') {
          this.api.tab = {'a': 'customer.conversation', 'b': 'all'};
          this.btnShow = ['addProtect', 'throwLeadAway',"createRecommendLead"]
        }
        if (name == 'customer_conversation_all_my') {
          this.api.tab = {'a': 'customer.conversation', 'b': 'my'};
          this.btnShow = ['addProtect', 'throwLeadAway',"createRecommendLead",'distribute2'];
          this.distribute_params ={title:'分配名单[CC-CC]',role:'cc',distribution_scenario:'cc-cc'};
        }
        else if (name == 'customer_conversation_distributed_1') {
            this.api.tab = {'a': 'customer.conversation', 'b': 'toBeDistributed_1'};
            this.btnShow = ['distribute'];
            this.distribute_params ={title:'分配名单[CC-CC]',role:'cc',distribution_scenario:'cc-cc'};
        }
        else if (name == 'customer_conversation_distributed_2') {
            this.api.tab = {'a': 'customer.conversation', 'b': 'toBeDistributed_2'};
            this.btnShow = ['distribute'];
            this.distribute_params ={title:'分配名单[CC-CC]',role:'cc',distribution_scenario:'cc-cc'};
        }
        else if (name == 'customer_conversation_my_protected') {
          this.api.tab = {'a': 'customer.conversation', 'b': 'myProtected'};
          this.btnShow = ['applyForTrialClass', 'throwLeadAway','createOrderNoTrial','makeDeposit']
        }
      },
      reFresh() {
        // this.isRefresh = true
        this.isRefresh = !this.isRefresh;
      }

    },
    components: {
      tabs,
      tableData
    }
  }

</script>
