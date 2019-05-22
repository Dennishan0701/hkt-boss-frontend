<template lang="html">
    <div class="deal">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/components/breadcrumb">客户</BreadcrumbItem>
                <BreadcrumbItem>试听</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--tab切换-->
        <div class="setScreensBody">
            <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
            <!--<Tabs type="card" :animated="false" class="tabs trial" @on-click="changeTab" v-model="tabStatus">-->
                <!--<TabPane v-if="isMenu('customer_trial_all')" name="all" label="全部"></TabPane>-->
                <!--<TabPane v-if="isMenu('customer_trial_to_be_arranged')" name="courseToBeArranged" label="待排课"></TabPane>-->
                <!--<TabPane v-if="isMenu('customer_trial_arranged')" name="courseArranged" label="已排课"></TabPane>-->
                <!--<TabPane v-if="isMenu('customer_trial_trialled')" name="audition" label="已试听"></TabPane>-->
                <!--&lt;!&ndash; <TabPane name="courseArrangedList" label="课程计划"></TabPane> &ndash;&gt;-->
                <!--<TabPane v-if="isMenu('customer_trial_convertSuccess')" name="convertSuccess" label="转化成功"></TabPane>-->
                <!--<TabPane v-if="isMenu('customer_trial_class_each_list')" name="classEachList" label="试听记录"></TabPane>-->
            <!--</Tabs>-->
            <!--筛选组件+表格数据-->
            <tableData :api="api" :btnShow="btnShow" :isOperation="isOperation"></tableData>
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
  import {setStore, getStore, removeStore, setSession, getSession, removeSession} from '@/assets/js/storage'


  export default {
    data() {
      return {
        tabClass:"trial",
        tabStatus: 'customer_trial_all',
        tabList: [
          {
            name: "customer_trial_all",
            label: "全部",
            content:"全部处于试听阶段的名单",
            show: ""
          },
          {
            name: "customer_trial_to_be_arranged",
            label: "待排课",
            content:"已经申请试听的待排课列表",
            show: ""
          },
          {
            name: "customer_trial_arranged",
            label: "已排课",
            content:"已经排课的客户列表",
            show: ""
          },
          {
            name: "customer_trial_trialled",
            label: "已试听",
            content:"已经试听的客户列表",
            show: ""
          },
          {
            name: "customer_trial_convertSuccess",
            label: "转化成功",
            content:"试听反馈为转化成功的客户列表",
            show: ""
          },
          {
            name: "customer_trial_class_each_list",
            label: "试听记录",
            content:"所有申请试听的记录",
            show: ""
          },
        ],
        api: {},
        leadApi: {
          getAllfiltersAPI: this.$store.state.api.lead.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.lead.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.lead.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.lead.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.lead.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.lead.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.lead.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.lead.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.lead.setDisplays,//管理员设置字段显示数据
          markConvertSuccessAPI: this.$store.state.api.lead.markConvertSuccess ,//标记为转化成功API
          tab: {'a': 'customer.trial', 'b': 'all'}
        },
        class_eachApi: {
          getAllfiltersAPI: this.$store.state.api.class_each.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.class_each.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.class_each.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.class_each.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.class_each.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.class_each.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.class_each.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.class_each.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.class_each.setDisplays,//管理员设置字段显示数据
        },
        btnShow: [],
        isOperation: false,
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
        // console.log(name);
        this.tabStatus = name;
        setSession('tab_status', name);
        // setStore('tab_status', name);
        if (name == 'customer_trial_all') {
          this.api = this.leadApi;
          this.api.tab = {'a': 'customer.trial', 'b': 'all'};
          this.btnShow = []
          this.isOperation = false
        }
        if (this.tabStatus == 'customer_trial_to_be_arranged') {
          this.api = this.leadApi;
          this.api.tab = {'a': 'customer.trial', 'b': 'to_be_arranged'};
          this.btnShow = []
          this.isOperation = false
        }
        else if (name == 'customer_trial_arranged') {
          this.api = this.leadApi;
          this.api.tab = {'a': 'customer.trial', 'b': 'arranged'};
          this.btnShow = []
          this.isOperation = false
        }
        else if (name == 'customer_trial_trialled') {
          this.api = this.leadApi;
          this.api.tab = {'a': 'customer.trial', 'b': 'came'};
          // this.btnShow = ['convertSuccess'];
          this.btnShow = [];
          this.isOperation = false
        }
        else if (name == 'customer_trial_convertSuccess') {
          this.api = this.leadApi;
          this.api.tab = {'a': 'customer.trial', 'b': 'convertSuccess'};
          this.btnShow = ['createOrder'];
          this.isOperation = false
        }

        else if (name == 'customer_trial_class_each_list') {
          this.api = this.class_eachApi;
          this.api.tab = {'a': 'customer.trial', 'b': 'class_each_list'};
          this.btnShow = [];
          this.isOperation = true
        }
      },
    },
    components: {
      tabs,
      tableData
    }
  }

</script>
