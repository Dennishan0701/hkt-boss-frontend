<template lang="html">
  <div class="deal">
    <!--面包屑-->
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">客户</BreadcrumbItem>
        <BreadcrumbItem>线索</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--tab切换-->
    <div class="setScreensBody">
      <!--tab选项列表-->
      <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
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
  import {setSession, getSession, removeSession} from '@/assets/js/storage'

  export default {
    data () {
      return {
        tabClass:"lead",
        tabStatus: 'customer_lead_all',
        tabList: [
          {
            name: "customer_lead_all",
            label: "全部",
            content:"CC主动放弃的以及线索阶段的其他所有的名单",
            show: ""
          },
          {
            name: "customer_lead_giveup",
            label: "线索公海",
            content:"线索公海",
            show: ""
          },
          {
            name: "customer_lead_good_quality",
            label: "优选区",
            content:"自动回收的新鲜度较高的名单",
            show: ""
          },
          {
            name: "customer_lead_return_back",
            label: "退货区",
            content:"3个及以上cc主动放弃的需要回到数据回收中心的名单\t",
            show: ""
          },
          {
            name: "customer_lead_cc_resign",
            label: "离职CC名单分配",
            content:"需要cc主管分配的离职cc的名单",
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
          getLeadBackAPI:this.$store.state.api.lead.getLeadBack,//从例子公海把例子捞回洽谈
          tab: {'a': 'customer.lead', 'b': 'all'}
        },
        btnShow: ['manualDistribute', 'getLeadBack'],
        isRefresh: false,
        modalType:'',
        distribute_params:''
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
        if (name == 'customer_lead_all') {
          this.api.tab = {'a': 'customer.lead', 'b': 'all'};
          this.btnShow = ['manualDistribute', 'getLeadBack'];
          this.distribute_params ={title:'分配名单[BSC-CC/CC-CC]',role:'cc',distribution_scenario:'cc-cc'};
        }
        else if (name == 'customer_lead_good_quality') {
          this.api.tab = {'a': 'customer.lead', 'b': 'goodQuality'};
          this.btnShow = ['manualDistribute', 'getLeadBack'];
          this.distribute_params ={title:'分配名单[BSC-CC/CC-CC]',role:'cc',distribution_scenario:'cc-cc'};
        }
        else if (name == 'customer_lead_return_back') {
          this.api.tab = {'a': 'customer.lead', 'b': 'returnBack'};
          // this.btnShow = ['manualDistribute']
          this.btnShow = []
        }
        else if (name == 'customer_lead_giveup') {
            this.api.tab = {'a': 'customer.lead', 'b': 'giveup'};
            this.btnShow = ['manualDistribute', 'getLeadBack'];
        }
        else if (name == 'customer_lead_cc_resign') {
          this.api.tab = {'a': 'customer.lead', 'b': 'leave'};
           this.btnShow = ['distribute'];
            this.distribute_params ={title:'分配名单[CC-CC]',role:'cc',distribution_scenario:'cc-cc'};
        }
      },
      reFresh() {
        // this.isRefresh = true;
        this.isRefresh = !this.isRefresh;
      }
    },
    components: {
      tabs,
      tableData
    }
  }

</script>
