<style lang="less">


</style>

<template lang="html">
    <div class="deal">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/deal/order">报名</BreadcrumbItem>
                <BreadcrumbItem>合同</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--筛选条件-->
        <div class="setScreensBody">

            <Tabs type="card" :animated="false" class="tabs" @on-click="changeTab">
                <TabPane label="全部"></TabPane>
            </Tabs>
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

  export default {
    data() {
      return {
        api: {
          getAllfiltersAPI: this.$store.state.api.lead.filters, //获取所有组件api
          tableDisplayAPI: this.$store.state.api.lead.tableDisplay, //获取所有table显示字段api
          choosefiltersAPI: this.$store.state.api.lead.choosefilters, //设置选择展示哪些筛选组件
          chooseDisplayAPI: this.$store.state.api.lead.chooseDisplay, //设置table选择展示哪有字段
          tableDataAPI: this.$store.state.api.lead.tableLeads, //获取table表数据
          tab: "all1"
        },
        btnShow: [1, 2]
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
      changeTab(index) {
        if (index == 0) {
          this.api.tab = "all1";
        }
        else if (index == 1) {
          this.api.tab = "all2";
        }
        else if (index == 2) {
          this.api.tab = "all3";
        }
      },
    },
    components: {
      tabs,
      tableData
    }
  }

</script>
