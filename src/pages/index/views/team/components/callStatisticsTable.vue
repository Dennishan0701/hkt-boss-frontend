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
      page_size: 15,
      page: 1,
      data: [],
      pageTotal: 0,
      team_type: '',
      region_type: '',
      columns: [
        // { title: "大区", key: "division", width: 120, },
      { title: "所属团队", key: "team", width: 120, },
      { title: "销售姓名", key: "cc_name", width: 120, },
      { title: "销售类型	", key: "role_type", width: 100, },
      { title: "总外呼次数", key: "total_calls", width: 130, },
      { title: "总外呼人数", key: "total_call_heads", width: 130, },
      { title: "接通次数", key: "connected_times", width: 130, },
      { title: "接通人数", key: "connected_time_heads", width: 130, },
      { title: "通话时长(分钟)", key: "total_mins", width: 130, },
      { title: "接通率", key: "connected_ratio", width: 120, },
    ]
    }
  },
  methods: {
    async getData() {
      const res = await this.$axios.post('http://newback.test/api/call_record_statistics', {
          'from':'2019-05-10',
          'to':'2019-05-12',
          'page':this.page,
          'page_size':this.page_size,
          'role_id':[12,13,14]
      })
      console.log(res);
      this.data = res.data.data.data;
      this.pageTotal = res.data.data.total;
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
