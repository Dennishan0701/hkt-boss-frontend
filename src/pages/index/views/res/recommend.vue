<style lang="less">


</style>

<template lang="html">
  <div class="deal">
    <!--面包屑-->
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/res/market">资源</BreadcrumbItem>
        <BreadcrumbItem>推荐</BreadcrumbItem>
      </Breadcrumb>
      <p v-if="isMenu('newly_increased_leads')" class="rightActions" @click="addLeads">+新增leads</p>
    </div>
    <!--筛选条件-->
    <div class="setScreensBody">
      <!--tab选项列表-->
      <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
      <!--筛选组件+表格数据-->
      <tableData :api="api" :btnShow="btnShow" :isRefresh="isRefresh" :distribute_params="distribute_params"></tableData>
    </div>
    <!--弹窗-->
    <create-lead-modal v-if="modalType=='createLeadModal'" @reFresh="reFresh"
                             ref='createLeadModal'></create-lead-modal>

  </div>

</template>

<script>
  import {isMenu} from '@/api/common';
  import tabs from '@/components/tabs';
  import tableData from '@/components/tableData';
  import {mapGetters} from 'vuex';
  import {setSession, getSession, removeSession} from '@/assets/js/storage';
  import createLeadModal from '@/pages/index/views/res/modal/createLeadModal';

  export default {
    data () {
      return {
        tabStatus: 'recommend',
        tabClass: 'res_mkt_all',
        tabList: [
          {
            name: "res_recommend_all",
            label: "全部",
            content:"所有的推荐leads的列表",
            show: ""
          },
          // {
          //   name: "studentRecommend",
          //   label: "学员推荐",
          //   show: ""
          // },
          // {
          //   name: "outSourceRecommend",
          //   label: "外部推荐",
          //   show: ""
          // },
          {
            name: "res_recommend_distributed",
            label: "待分配",
            content:"需要BSC分配的推荐leads",
            show: ""
          },
          {
            name: "res_recommend_distributeded",
            label: "已分配",
            content:"已分配的推荐leads",
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
          tab: {'a': 'res.recommend', 'b': 'all'}
        },
        btnShow: [],
        modalType:'',
        isRefresh: false,
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
        console.log (newValue);
        if (newValue > 0) {//如果点击了弹窗的确定
          console.log ("点击确定了");
          this.getTableData ();
        }
      },
    },
    methods: {
      isMenu,
      addLeads () {//点击新增Leads
        // this.$store.commit ("LEADS_SHOW", true);
        // this.$store.commit ("LEADS_TYPE", false);//新增Leads弹窗不显示(推荐人，推荐人手机号)

        this.modalType = "createLeadModal";
        setTimeout(res=>{
          this.$refs.createLeadModal.showCreate(1); //参数1表示是推荐
        }, 1);

      },
      //点击弹窗
      modalShow () {
        this.$store.commit ("FETCH_MODAL", "true");
        // this.$store.commit("CLICK_OK",0);
      },
      //切换tab
      changeTab (name) {
        this.tabStatus = name;
        setSession('tab_status', name);
        if (name == 'res_recommend_all') {
          this.api.tab = {'a': 'res.recommend', 'b': 'all'};
          this.btnShow = [];
          //this.distribute_params ={title:'分配名单[BSC-CC]',role:'cc',distribution_scenario:'bsc-cc-0'};
        }
        else if (this.tabStatus == 'res_recommend_distributed') {
          this.api.tab = {'a': 'res.recommend', 'b': 'toBeDistributed'};
          this.btnShow = ['manualDistribute'];
          this.distribute_params ={title:'分配名单[BSC-CC]',role:'cc',distribution_scenario:'bsc-cc-0'};
        }
        else if (this.tabStatus == 'res_recommend_distributeded') {
          this.api.tab = {'a': 'res.recommend', 'b': 'distributed'};
          // this.btnShow = ['manualDistribute'];
        }
        else if (name == 'studentRecommend') {
          this.api.tab = {'a': 'res.recommend', 'b': 'studentRecommend'};
          this.btnShow = ['manualDistribute']
        }
        else if (name == 'outSourceRecommend') {
          this.api.tab = {'a': 'res.recommend', 'b': 'outSourceRecommend'};
          this.btnShow = ['manualDistribute']
        }
      },
      reFresh() {
        // this.isRefresh = true;
        this.isRefresh = !this.isRefresh;
      }
    },
    components: {
      tabs,
      tableData,
      createLeadModal
    }
  }

</script>
