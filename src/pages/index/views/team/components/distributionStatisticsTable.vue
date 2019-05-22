<template>
  <div class="main-box">
    <div class="seach-box">
      <Input
        style="width:180px"
        class="item"
        v-model="team_type"
        placeholder="所属团队"
        clearable
        @on-enter="getData"
      />
      <Input
        style="width:180px"
        class="item"
        v-model="region_type"
        placeholder="所属大区"
        clearable
        @on-enter="getData"
      />
      <Button
        class="btnSearch item"
        @click="getData"
      ><i class="iconfont icon-sousuo"></i></Button></div>
    <Table
      class="tableData"
      :columns="columns"
      :data="data"
      border
    ></Table>
    <Page
      :total="pageTotal"
      show-sizer
      show-elevator
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
      show-total
    />
  </div>
</template>

<script>
export default {
  props: ['user_role', 'api'],
  data() {
    return {
      page_size: 10,
      page: 1,
      data: [],
      pageTotal: 0,
      team_type: '',
      region_type: '',
      columns: [{ title: "被分配人姓名", key: "user_name", width: 120, },
      { title: "被分配人角色", key: "user_role", width: 120, },
      { title: "所属团队", key: "team_type", width: 120, },
      { title: "所属大区", key: "region_type", width: 100, },
      { title: "分配A类名单数", key: "distribution_leads_a", width: 130, },
      { title: "分配B类名单数", key: "distribution_leads_b", width: 130, },
      { title: "分配C类名单数", key: "distribution_leads_c", width: 130, },
      { title: "总分配人数", key: "distribution_leads_all", width: 130, },
      { title: "优质名单比", key: "distribution_a_ratio", width: 130, },
      { title: "总拨打人数", key: "call_leads_nums", width: 120, },
      { title: "拨打比", key: "call_ratio", width: 100, },
      { title: "保护人数", key: "private_leads_nums", width: 100, },
      { title: "回收人数", key: "recycle_leads_nums", width: 100, },
      { title: "回收率", key: "recycle_ratio", width: 100, },]
    }
  },
  methods: {
    async getData() {
      const res = await this.$axios.post(this.api, {
        ...this.postBodyData,
        "page": this.page,
        "user_role": this.user_role,
        "page_size": this.page_size,
        "team_type": this.team_type,
        "region_type": this.region_type
      })
      this.data = res['data']['data']['data']
      this.pageTotal = res.data.data.total
    },
    pageChange(page) {
      this.page = page
      this.getData()
    },
    pageSizeChange(size) {
      this.page_size = size
      this.getData()
    }
  },
  async mounted() {
    this.getData()
  }
}
</script>

<style scoped>
* {
  /* border: solid 1px red; */
}
.main-box {
  padding: 0 18px 18px 18px;
  background-color: #fff;
}
.btnSearch {
  height: 36px;
  line-height: 36px;
  width: 36px;
  border-radius: 18px;
  text-align: center;
  padding: 0;
  color: #ffffff;
  border: none;
  background-color: #07c4fe;
  font-size: 14px;
}
.seach-box {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 80px;
}
.seach-box > .item {
  margin-left: 18px;
}
</style>
