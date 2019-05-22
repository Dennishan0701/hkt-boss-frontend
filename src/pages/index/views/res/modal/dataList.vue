<template>
  <div>
    <Modal
      class="dataListModal"
      v-model="modal"
      width="1000"
      :mask-closable="false"
    >
      <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
      <div>
        <!--表格内容-->
        <Table
          class="tableData"
          :columns="tableHeaders"
          :data="tableList"
          border
        >
          <template slot-scope="{ row, index }" slot="payPic">
            <Button
              type="info"
              size="small"
              @click="seePayPic(row.payments_transaction_snapshot)"
            >查看付费截图</Button>
          </template>
          <template slot-scope="{ row, index }" slot="operation">
            <Button
              type="info"
              size="small"
              @click="auditPass(row)"
              v-if="row.payments_audit_status==0"
            >人工审核</Button>
            <Button
              type="info"
              size="small"
              @click="miaomiao(row)"
              style="margin-left: 10px;"
              v-if="row.payments_audit_status==0"
            >拒绝</Button>
            <Button
              type="info"
              size="small"
              disabled
              v-else-if="row.payments_audit_status==1"
            >已审核</Button>
            <div
            v-else
            >{{row.payments_audit_status_format}}</div>
          </template>
        </Table>
        <!--分页-->
        <Page
          v-if="pageTotal>10"
          :total="pageTotal"
          show-sizer
          show-elevator
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          show-total
        />
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import { unfold } from '@/api/common'
import { isMenu } from '@/api/common'

export default {
  data() {
    return {
      nyanyatext: '',
      // getScheduleListAPI: this.$store.state.api.schedules.getScheduleList, //请求数据列表
      api: {
        paymentPass: this.$store.state.api.order.paymentPass //审核流水通过
      },
      url: '', //请求数据列表url
      id: '', //传过来的id
      type: '', //穿过来的type
      modal: false,
      formItem: {
        //请求表格数据的条件
        id: '',
        page: 1,
        size: 10
      },
      tableHeaders: [], //所有已选择的table字段(表格的表头数据)
      tableList: [], //表格数据
      pageTotal: 0 //页码总数
    }
  },
  computed: {},
  mounted() {},
  methods: {
    cancel() {
      //关闭弹窗
      this.modal = false
    },
    show(url, id, type) {
      this.url = url
      this.formItem.id = id
      this.tableList = []
      this.modal = true
      this.getDataList(this.id)

      if (type) {
        this.type = type
      }
    },
    getDataList(id) {
      // let url = this.getScheduleListAPI + "/" + id;
      this.$axios
        .get(this.url, {
          params: this.formItem
        })
        .then(res => {
          //tableHeaders
          let head
          let tableSelectList = res.data.data.display_field
          console.log(tableSelectList)
          this.tableHeaders = []
          for (let i in tableSelectList) {
            head = {
              title: tableSelectList[i].display_name,
              key:
                tableSelectList[i].table_name +
                '_' +
                tableSelectList[i].field_name,
              align: 'center',
              width: 180
            }
            this.tableHeaders.push(head)
          }
          if (this.type == 'payDetail') {
            //如果是结算-订单-待支付/待审核-付款详情（查看详情）
            if (isMenu('view_paid_screenshots')) {
              this.tableHeaders.push({
                //查看付费截图
                title: '付费截图',
                align: 'center',
                width: 110,
                fixed: 'right',
                slot: 'payPic'
              })
            }
            if (isMenu('manually_review')) {
              //人工审核（流水）
              this.tableHeaders.push({
                title: '操作',
                align: 'center',
                width: 200,
                fixed: 'right',
                slot: 'operation'
              })
            }
          }
          //tableList
          let table_list = []
          for (let value of res.data.data.data) {
            let obj = {}
            unfold(value, '', obj)
            table_list.push(obj)
          }
          this.tableList = table_list
          this.pageTotal = res.data.data.total
          // console.log(this.tableList);
        })
    },
    //页码改变
    pageChange(page) {
      this.formItem.page = page
      this.getDataList(this.id)
    },
    //页码size改变
    pageSizeChange(pageSize) {
      console.log(pageSize)
      this.formItem.size = pageSize
      this.getDataList(this.id)
    },
    // 审核通过
    auditPass(row) {
      console.log(row)
      let lead = row.payments_id
      let url = this.api.paymentPass + '/' + lead
      let app = this
      this.$Modal.confirm({
        title: '审核通过',
        content: '<span class="trashText">确认将这条流水审核通过吗？</span>',
        onOk: function() {
          app.$axios.post(url).then(res => {
            app.$Notice.success({
              title: '',
              desc: '审核成功',
              duration: 3
            })
            app.getDataList(this.id)
          })
        }
      })
    },
    miaomiao(row) {
      // let row = this.selectionRows[0];
      if (row.length > 1) {
        this.$Notice.warning({
          title: "",
          desc: "该操作只支持单个流水",
          duration: 3
        });
        return;
      }
      if (row.payments_audit_status == 1) {
        this.$Notice.warning({
          title: "",
          desc: "该流水已审核！",
          duration: 3
        });
        return;
      }
      this.$Modal.confirm({
        render: h => {
          return (
            <div>
              <p class="modalTitle">拒绝原因</p>
              <Input
                v-model={this.nyanyatext}
                placeholder="请输入拒绝理由"
                type="textarea"
                row="5"
              />
            </div>
          );
        },
        onOk: () => {
          if (!this.nyanyatext) {
            this.$Message.info("拒绝理由不能为空");
            return;
          }
          if (this.nyanyatext.length > 200) {
            this.$Message.info("拒绝理由不能超过200文字");
            return;
          }
          this.$axios
            .post("/api/payments/reject/" + row.payments_id, {
              payments_id: row.payments_id,
              reject_reason: this.nyanyatext
            })
            .then(res => {
              this.getDataList(this.id)
              this.$Notice.success({
                title: "",
                desc: "拒绝成功",
                duration: 4
              });
              this.getTableData();
            });
        }
      });
    },
    //查看付费截图
    seePayPic(pic) {
      this.$Modal.confirm({
        title: '查看付费截图',
        content:
          '<img style="display: block;margin: 0 auto;" src="' +
          pic +
          '" alt="付费截图">',
        onOk: function() {}
      })
    }
  }
}
</script>
<style lang="less">
@import '../../../../../assets/css/main.less';

.ivu-modal-confirm-body {
  padding-left: 0 !important;
}

.dataListModal {
  .ivu-table-header {
    background-color: @class-blue;
    border-bottom: 1px solid @light-gray-hover;
  }
  .ivu-table-fixed-header {
    background-color: @class-blue;
  }
  .ivu-table-fixed-right::before,
  .ivu-table-fixed::before {
    content: none;
  }
  .ivu-table-body {
    /*height: 370px;*/
  }
  .ivu-modal-close .ivu-icon-ios-close {
    display: none;
  }
  .closeModal {
    font-size: 31px;
    color: #999;
    transition: color 0.2s ease;
    position: absolute;
    top: 1px;
    right: 0;
    z-index: 3;
  }
  .ivu-modal-body {
    padding: 40px 20px;
    overflow: hidden;
  }
  .ivu-page {
    text-align: center;
    margin-top: 30px;
  }
}
</style>