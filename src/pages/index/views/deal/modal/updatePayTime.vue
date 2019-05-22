<!-- 绑定订单 -->
<template>
  <div>
    <Modal class="mdModal" v-model="modal" width="500" :mask-closable="false">
      <div class="mdModalheader" slot="header">
        <Icon
          type="ios-paper-plane"
          color="orange"
          size="22"
          style="margin-top: -3px;"
        />修改完成支付时间
      </div>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="110"
      >
        <FormItem
          label="修改为"
          prop="time"
        >
          <DatePicker :value="formValidate.time" transfer type="datetime"></DatePicker>
        </FormItem>
        <FormItem
          label="修改原因"
          prop="reason"
        >
          <Input
            v-model="formValidate.reason"
            type="textarea" :rows="4"
            :maxlength="100"
            placeholder="请输入不超过100个字符..."/>
        </FormItem>
      </Form>
      <Button
        type="info"
        class="mdBtn2"
        @click="handleSubmit('formValidate')"
      >确认</Button>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    const payment_api = this.$store.state.api.order
    return {
      api: payment_api.updatePayTime,
      modal: false,
      orderNo: '',
      formValidate: {},
      ruleValidate: {
        time: [
          { required: true, message: '请选择一个时间', trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '修改原因不能为空', trigger: 'blur' }
        ]
      },
      updating: false
    }
  },
  methods: {
    show(row) {
      this.orderNo = row.orders_order_no
      this.formValidate = {
        time: row.orders_last_payment_at,
        reason: ''
      }
      this.modal = true
    },
    //绑定订单，点击确认
    handleSubmit(name) {
      const app = this
      app.$refs[name].validate(valid => {
        if (valid) {
          if (app.orderNo && !app.updating) {
            app.updating = true
            const { time, reason } = app.formValidate
            app.$axios.post(`${app.api}/${app.orderNo}`, {
              payment_time: time,
              revise_cause: reason
            }).then(res => {
              if (res.data.status == 'success') {
                app.updateComplete()
              } else {
                app.updateComplete(false)
              }
            })
          }
        }
      })
    },
    updateComplete(state = true) {
      if (state) {
        this.modal = false
        this.$emit('reFresh', 'success')
      }
      this.$Notice[state && 'success' || 'error']({
        desc: `修改${state && '成功' || '失败'}`,
        duration: 3
      })
      this.updating = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/css/vividStandard.less';

.mdModal {
  .ivu-modal-wrap {
    .ivu-modal-header {
      border: none;
      .mdModalheader {
        display: inline-block;
        vertical-align: middle;
        margin-left: 6px;
        font-size: 16px;
        color: #17233d;
        font-weight: 700;
      }
    }
    .mdBtn2 {
      margin: 0 auto;
      display: block;
    }
  }
}
</style>
