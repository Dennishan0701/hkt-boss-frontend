<template>
    <div class="lead-content">
        <div class="setFilter">
            <div class="allScreens">
                <Form :label-width="120" label-position="left">
                    <FormItem label='通话时间'>
                        <DatePicker type="daterange" split-panels placeholder="   开始时间     至     结束时间"
                                    style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem label='选择渠道'>
                        <Select v-model="channel" filterable style="width:200px">
                            <Option value="渠道1" key="1">渠道1</Option>
                            <Option value="渠道2" key="2">渠道2</Option>
                            <Option value="渠道3" key="3">渠道3</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="*是否属于我">
                        <ul class="checkBoxList">
                            <li>全部</li>
                            <li>是</li>
                            <li>否</li>
                        </ul>
                    </FormItem>
                </Form>
            </div>
        </div>

        <div class="tableContent">

            <!--分页-->
            <Page :total="pageTotal" show-sizer show-elevator show-total @on-change="pageChange"
                  @on-page-size-change="pageSizeChange"/>
        </div>
    </div>
</template>

<script>

  export default {
    name: "CallStatistical",

    data() {
      return {
        channel: '选择渠道',
        pageTotal: 30
      }
    },

    methods: {
      getData() {
        console.log('获取数据');
      },

      /**
       * 改编页码
       * @param page
       */
      pageChange(page) {
        console.log(page);
      },

      /**
       * 改变当前页
       */
      pageSizeChange(page) {
        console.log(page);
      }
    }
  }
</script>

<style scoped>

</style>