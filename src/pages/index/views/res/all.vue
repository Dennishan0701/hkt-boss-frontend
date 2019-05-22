<style lang="less">
  .leadsUpload {
    display: inline-block;
    .leadsBtn{
      position: absolute;
      width: 90px;
      height: 28px;
      background: #07C4FE;
      border-radius: 14px;
      text-align: center;
      padding: 0;
      color: #ffffff;
      border: none;
      margin-left: 260px;
      outline: none;
      cursor: pointer;
      line-height: 27px;
      top: -8px;
      right: 0px;
      font-size: 14px;
      &:hover {
        background: #50d6ff;
        color: #fff;
      }
    }
    .ivu-btn.ivu-btn-loading{
      position: absolute;
    }
  }
</style>

<template lang="html">
  <div class="deal">
    <!--面包屑-->
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/res/market">资源</BreadcrumbItem>
        <BreadcrumbItem>全部</BreadcrumbItem>
      </Breadcrumb>
      <p v-if="isMenu('newly_increased_leads')" class="rightActions rightActions2" @click="addLeads">+新增leads</p>
      <p v-if="isMenu('import_leads')" class="rightActions" @click="importLeads('all')">+导入leads</p>
    </div>
    <!--筛选条件-->
    <div class="setScreensBody">
      <!--tab选项列表-->
      <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
      <!--筛选组件+表格数据-->
      <tableData :api="api" :btnShow="btnShow" :isRefresh="isRefresh"></tableData>
    </div>
    <importLeads ref="importLeads"></importLeads>
    <create-lead-modal v-if="modalType=='createLeadModal'" @reFresh="reFresh"
                       ref='createLeadModal'></create-lead-modal>
  </div>

</template>

<script>
  import {isMenu} from '@/api/common';
  import tabs from '@/components/tabs';
  import tableData from '@/components/tableData';
  import importLeads from '@/pages/index/views/res/modal/importLeads';
  import {mapGetters} from 'vuex';
  import apiBase from '@/api/api.config';
  import {setSession,getSession,removeSession} from '@/assets/js/storage';
  import createLeadModal from '@/pages/index/views/res/modal/createLeadModal';

  export default {
    data () {
      return {
        tabStatus:'res_all_all',
        tabClass:"marketALL",
        tabList: [
          {
            name: "res_all_all",
            label: "全部",
            content:"所有资源模块名单的合集",
            show: ""
          },
          {
            name: "res_all_repeated_lead_records",
            label: "重复名单记录",
            content:"新增或者导入的重复名单的记录",
            show: ""
          },
          {
            name: "res_all_import",
            label: "导入记录",
            content:"导入leads的事件记录",
            show: ""
          },
        ],
        apiBase:apiBase('api'),
        leadsParams:{
          name:'upload'
        },
        loadingStatus:false,
        getImportLeadsAPI: this.$store.state.api.lead.importLeads, //导入LeadsAPI
        api: {},
        initial_api:{
          getAllfiltersAPI: this.$store.state.api.lead.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.lead.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.lead.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.lead.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.lead.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.lead.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.lead.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.lead.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.lead.setDisplays,//管理员设置字段显示数据
          manualDistributeAPI: this.$store.state.api.lead.manualDistribute, //手动分配
          trashAPI: this.$store.state.api.lead.trash, //进垃圾池
          tab:{'a': 'res.all', 'b': 'all'},
        },
        //lead重复记录API
        api_1: {
          getAllfiltersAPI: this.$store.state.api.repeated_lead_record.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.repeated_lead_record.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.repeated_lead_record.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.repeated_lead_record.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.repeated_lead_record.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.repeated_lead_record.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.repeated_lead_record.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.repeated_lead_record.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.repeated_lead_record.setDisplays,//管理员设置字段显示数据
          tab: {'a': 'res.all', 'b': 'all'}
        },
        //导入记录API
        import_records: {
          getAllfiltersAPI: this.$store.state.api.import_records.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.import_records.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.import_records.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.import_records.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.import_records.tableLeads, //获取table表数据
          filtersSettingAPI: this.$store.state.api.import_records.filtersSetting,//管理员获取筛选显示数据
          displaySettingAPI: this.$store.state.api.import_records.displaySetting,//管理员获取字段显示数据
          setFiltersAPI: this.$store.state.api.import_records.setFilters,//管理员设置筛选显示数据
          setDisplaysAPI: this.$store.state.api.import_records.setDisplays,//管理员设置字段显示数据
          tab: {'a': 'import_records.all', 'b': 'all'}
        },
        btnShow: [''],
        isRefresh: false,
        modalType:""
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
    beforeDestroy(){
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
        // this.$store.commit("LEADS_SHOW", true);
        // this.$store.commit("LEADS_TYPE", false);//新增Leads弹窗不显示(推荐人，推荐人手机号)
        this.modalType = "createLeadModal";
        setTimeout(res => {
          this.$refs.createLeadModal.showCreate();
        }, 1);
      },
      importLeads(type) {
        this.$refs.importLeads.show(type);
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
        if (name == 'res_all_all') {//全部
          this.btnShow = [3]
          this.api = this.initial_api;
          this.api.tab = {'a': 'res.all', 'b': 'all'};
        }
        else if (name == "res_all_repeated_lead_records") {//重复名单
          this.btnShow = [3];
          this.api = this.api_1;
          this.api.tab = {'a': 'res.all', 'b': 'repeated_lead_records'};
        }
        else if (name == "res_all_import") {//导入记录
          this.btnShow = [3];
          this.api = this.import_records;
        }
      },
      handleSuccess (res, file) {
        this.loadingStatus = false;
        this.$Notice.success({
          title: '',
          desc: '导入成功',
          duration: 3
        });
      },
      handleError (res, file) {
        this.loadingStatus = false;
      },
      handleProgress (res, file) {
        this.loadingStatus = true;
      },
      handleBeforeUpload (file) {
        console.log (file);
        // const check = this.uploadList.length < 5;
        // if (!check) {
        //   this.$Notice.warning({
        //     title: 'Up to five pictures can be uploaded.'
        //   });
        // }
        // return check;
        // this.$refs.upload.post(file)
      },
      reFresh() {
        // this.isRefresh = true
        this.isRefresh = !this.isRefresh;
      }
    },
    components: {
      tabs,
      tableData,
      createLeadModal,
      importLeads
    }
  }

</script>
