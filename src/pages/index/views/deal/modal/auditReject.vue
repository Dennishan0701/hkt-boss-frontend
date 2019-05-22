<template lang="html">
    <div>
        <!--审核订单拒绝弹窗-->
        <Modal class="modals arrClassModal" width=510 v-model="modal" :mask-closable="false">
            <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
            <div class="modalCon">
                <p class="modalTitle">拒绝原因</p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80"
                      label-position="left">
                    <FormItem label="拒绝原因：">
                        <Input v-model="formValidate.objection" type="textarea" :autosize="{minRows: 2,maxRows: 6}"
                               style="width: 350px" :maxlength=100 placeholder="请填写拒绝原因"></Input>
                    </FormItem>
                    <button type="button" class="submit" @click="handleSubmit('formValidate')">确认</button>
                </Form>
            </div>
        </Modal>

    </div>

</template>

<script>
import { _ } from 'vue-underscore'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      api: {
        auditRejectAPI: this.$store.state.api.order.auditReject //结算-订单-待支付/待审核-审核拒绝
      },
      modal: false,
      formValidate: {
        order_no: '',
        objection: ''
      },
      ruleValidate: {}
    }
  },
  methods: {
    show(row) {
      this.modal = true
      this.formValidate.order_no = row[0].orders_order_no
    },
    cancel() {
      this.modal = false
    },
    addPay() {},
    handleSubmit(name) {
      let url = this.api.auditRejectAPI + '/' + this.formValidate.order_no
      this.$axios.post(url, this.formValidate).then(res => {
        this.$Notice.success({
          title: '',
          desc: '审核拒绝成功！',
          duration: 4
        })
        this.modal = false
        setTimeout(() => {
          location.reload()
        }, 800)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/css/main.less';
.ivu-form {
  position: relative;
}
.addPay {
  position: absolute;
  height: 32px;
  line-height: 32px;
  color: @primary-color;
  cursor: pointer;
  margin-left: 10px;
  right: 0;
  bottom: 56px;
}
.submit {
  margin-left: 364px !important;
}
</style>
