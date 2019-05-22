<template>
    <div class="lead-content">
        <div class="setFilter">
            <div class="allScreens">
                <data-filter v-for="(item,_key) in filters" :filter="item" @requestFilter="buildRequestFilter"
                             :key="_key"></data-filter>
                <!--固定自定义筛选开始-->
                <Form :label-width="120" label-position="left">
                    <FormItem label="*是否属于我">
                        <ul class="checkBoxList">
                            <li>全部</li>
                            <li>是</li>
                            <li>否</li>
                        </ul>
                    </FormItem>
                </Form>
                <!--固定自定义筛选结束-->
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
  import {mapGetters} from 'vuex';

  export default {
    name: "CallCount",
    data() {
      return {
        pageTotal: 30,
        filters: [],
        api: {},
        btnShow: ['addProtect', 'throwLeadAway']
      }
    },

    methods: {
      /*** 获取数据*/
      getData() {
        console.log(true);
      },
      /****/
      buildRequestFilter() {
        console.log(true);
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
