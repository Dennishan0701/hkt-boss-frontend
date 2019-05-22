<style lang="less">
</style>

<template lang="html">
    <div class="deal">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/res/market">资源</BreadcrumbItem>
                <BreadcrumbItem>市场</BreadcrumbItem>
            </Breadcrumb>
            <p v-if="isMenu('newly_increased_leads') && !~['res_mkt_tmk_raw_2',
              'res_mkt_tmk_0',
              'res_mkt_tmk_1',
              'res_mkt_data_recycle_center',
              'res_mkt_trash',
              'res_mkt_tmk_resign',].indexOf(tabStatus)"
              class="rightActions rightActions2" @click="addLeads">+新增leads</p>
            <p v-if="isMenu('marketing_activity_recommendation_import_leads') && !~['res_mkt_tmk_raw_2',
                'res_mkt_tmk_0',
                'res_mkt_tmk_1',
                'res_mkt_data_recycle_center',
                'res_mkt_trash',
                'res_mkt_tmk_resign',].indexOf(tabStatus)"
                class="rightActions"
                @click="importLeads('tj')">推荐leads导入</p>
            <!--<p v-if="isMenu('import_leads')" @click="importLeads('a')">+导入leads</p>-->
            <p v-if="isMenu('import_leads') && !~['res_mkt_tmk_raw_2',
                'res_mkt_tmk_0',
                'res_mkt_tmk_1',
                'res_mkt_data_recycle_center',
                'res_mkt_trash',
                'res_mkt_tmk_resign',].indexOf(tabStatus)"
                class="rightActions" @click="importLeads('tmk')">+导入leads</p>
        </div>
        <!--筛选条件-->
        <div class="setScreensBody">
            <!--tab选项列表-->
            <tabs :tabList="tabList" :class="tabClass" @changeTab="changeTab"></tabs>
            <!--筛选组件+表格数据-->
            <tableData :api="api" :btnShow="btnShow" :isRefresh="isRefresh"
                       :distribute_params="distribute_params"></tableData>
        </div>
        <!--弹窗-->
        <importLeads ref="importLeads"></importLeads>
        <create-lead-modal v-if="modalType=='createLeadModal'" @reFresh="reFresh"
                           ref='createLeadModal'></create-lead-modal>
    </div>

</template>

<script>
import { isMenu } from '@/api/common'
import tabs from '@/components/tabs'
import tableData from '@/components/tableData'
import importLeads from '@/pages/index/views/res/modal/importLeads'
import { mapGetters } from 'vuex'
import apiBase from '@/api/api.config'
import { removeSession } from '@/assets/js/storage'
import createLeadModal from '@/pages/index/views/res/modal/createLeadModal'
import tabsMixin from '@/mixins/tabs'

const getDistribute = (from, to) => {
  const key = `${from}-${to}`
  const distributionScenarioMap = {
    'bsc-cc': 'bsc-cc-0'
  }
  return {
    'title': `分配名单 [${key.toUpperCase()}]`,
    'role': to,
    'distribution_scenario': distributionScenarioMap[key] || key
  }
}

export default {
  mixins: [
    tabsMixin
  ],
  data() {
    return {
      apiBase: apiBase('api'),
      leadsParams: {
        name: 'upload'
      },
      loadingStatus: false,
      getImportLeadsAPI: this.$store.state.api.lead.importLeads, //导入LeadsAPI
      tabClass: 'market',
      tabStatus: 'res_mkt_all',
      tabList: [
        {
          name: 'res_mkt_all',
          label: '全部',
          content: '全部市场过来的名单的集合',
          tab: { a: 'res.mkt', b: 'all' },
          btns: [ 'trash' ],
        }, {
          name: 'res_mkt_recommend_ed',
          label: '市场活动推荐leads已分配',
          content: '需要BSC分配的通过市场活动进来的推荐leads',
          tab: { a: 'res.mkt', b: 'distributed' },
          btns: [ 'manualDistributeCC' ],
          distribute_params: getDistribute('bsc', 'cc'),
        }, {
          name: 'res_mkt_recommend',
          label: '市场活动推荐leads待分配',
          content: '需要BSC分配的通过市场活动进来的推荐leads',
          tab: { a: 'res.mkt', b: 'recommend' },
          btns: [ 'manualDistributeCC' ],
          distribute_params: getDistribute('bsc', 'cc'),
        }, {
          name: 'res_mkt_A_ed',
          label: 'A类已分配',
          content: '需要BSC分配给CC主管的A类名单',
          tab: { a: 'res.mkt', b: 'A_ed' },
          btns: [ 'manualDistribute' ],
          distribute_params: getDistribute('bsc', 'cc'),
        }, {
          name: 'res_mkt_A',
          label: 'A类待分配',
          content: '需要BSC分配给CC主管的A类名单',
          tab: { a: 'res.mkt', b: 'A' },
          btns: [ 'manualDistribute' ],
          distribute_params: getDistribute('bsc', 'cc'),
        }, {
          name: 'res_mkt_tmk_raw_1',
          label: 'TMK待分配（经理）',
          content: '待TMK经理分配给TMK主管的名单',
          tab: { a: 'res.mkt', b: 'TMK_raw_1' },
          btns: [ 'manualDistribute' ],
          distribute_params: getDistribute('tmk', 'tmk'),
        }, {
          name: 'res_mkt_tmk_raw_2',
          label: 'TMK待分配（主管）',
          content: '待TMK主管分配给TMK的名单',
          tab: { a: 'res.mkt', b: 'TMK_raw_2' },
          btns: [ 'manualDistribute' ],
          distribute_params: getDistribute('tmk', 'tmk'),
        }, {
          name: 'res_mkt_tmk_0',
          label: 'TMK待清洗',
          content: '需要TMK拨打电话进行清洗的名单',
          tab: { a: 'res.mkt', b: 'TMK_0' },
          btns: [ 'markedAsCleaned', 'trash', 'manualDistribute' ],
          distribute_params: getDistribute('tmk', 'tmk'),
        }, {
          name: 'res_mkt_tmk_1',
          label: 'TMK已清洗',
          content: 'TMK已经清洗需要TMK主管分配给CC主管的名单',
          tab: { a: 'res.mkt', b: 'TMK_1' },
          btns: [ 'manualDistribute' ],
          distribute_params: getDistribute('tmk', 'cc'),
        }, {
          name: 'res_mkt_tmk_1_distributed',
          label: 'TMK已清洗且已分配',
          content: 'TMK已清洗且已分配的名单',
          tab: { a: 'res.mkt', b: 'TMK_1_distributed' },
        }, {
          name: 'res_mkt_data_recycle_center',
          label: '数据回收中心',
          content: '通过系统回收规则自动回收到市场部的名单',
          tab: { a: 'res.mkt', b: 'data_recycle_center' },
        }, {
          name: 'res_mkt_trash',
          label: '垃圾池',
          content: '被TMK丢进垃圾池的名单',
          tab: { a: 'res.mkt', b: 'trash' },
        }, {
          name: 'res_mkt_tmk_resign',
          label: '离职TMK名单分配',
          content: '需要TMK主管分配的离职TMK的名单',
          tab: { a: 'res.mkt', b: 'leave' },
          btns: [ 'manualDistribute' ],
          distribute_params: getDistribute('tmk', 'tmk'),
        }
      ],
      api: {
        getAllfiltersAPI: this.$store.state.api.lead.filters, //获取所有组件api
        tableDisplayAPI: this.$store.state.api.lead.tableDisplay, //获取所有table显示字段api
        choosefiltersAPI: this.$store.state.api.lead.choosefilters, //设置选择展示哪些筛选组件
        chooseDisplayAPI: this.$store.state.api.lead.chooseDisplay, //设置table选择展示哪有字段
        tableDataAPI: this.$store.state.api.lead.tableLeads, //获取table表数据
        filtersSettingAPI: this.$store.state.api.lead.filtersSetting, //管理员获取筛选显示数据
        displaySettingAPI: this.$store.state.api.lead.displaySetting, //管理员获取字段显示数据
        setFiltersAPI: this.$store.state.api.lead.setFilters, //管理员设置筛选显示数据
        setDisplaysAPI: this.$store.state.api.lead.setDisplays, //管理员设置字段显示数据
        trashAPI: this.$store.state.api.lead.trash, //进垃圾池
        cleanedAPI: this.$store.state.api.lead.cleaned, //标记为已清洗
        tab: { a: 'res.mkt', b: 'all' }
      },
      btnShow: ['trash'],
      isRefresh: false,
      modalType: '',
      distribute_params: ''
    }
  },
  computed: {
    ...mapGetters(['fetchModal', 'clickOK'])
  },

  mounted() {},
  beforeDestroy() {
    removeSession('tab_status')
  },
  watch: {
    clickOK(newValue, oldValue) {
      console.log(newValue)
      if (newValue > 0) {
        //如果点击了弹窗的确定
        console.log('点击确定了')
        this.getTableData()
      }
    }
  },
  methods: {
    isMenu,
    addLeads() {
      //点击新增Leads
      // this.$store.commit("LEADS_SHOW", true);
      // this.$store.commit("LEADS_TYPE", false);//新增Leads弹窗不显示(推荐人，推荐人手机号)
      this.modalType = 'createLeadModal'
      setTimeout(res => {
        this.$refs.createLeadModal.showCreate()
      }, 1)
    },
    //点击拨打电话弹窗
    modalShow() {
      this.$store.commit('FETCH_MODAL', 'true')
      // this.$store.commit("CLICK_OK",0);
    },
    //切换tab功能以转移至 @/mixins/tabs.js
    importLeads(type) {
      this.$refs.importLeads.show(type)
    },
    handleSuccess(res, file) {
      this.loadingStatus = false
      this.$Notice.success({
        title: '',
        desc: '导入成功',
        duration: 3
      })
    },
    handleError(res, file) {
      this.loadingStatus = false
    },
    handleProgress(res, file) {
      this.loadingStatus = true
    },
    handleBeforeUpload(file) {
      console.log(file)
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
      this.isRefresh = !this.isRefresh
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
