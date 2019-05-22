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
        />绑定订单
      </div>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="110"
      >
        <div class="lines">
          <FormItem
            label="订单"
            v-if="orderList && orderList.length"
            prop="order_no"
          >
            <Select
              v-model="formValidate.order_no"
              placeholder="请选择"
              transfer
              style="width: 200px;"
            >
              <Option
                v-for="(order, index) in orderList"
                :value="order.order_no"
                :key="index"
                :label="order.order_no"
              >
                <span>{{ order.order_no }}</span>
              </Option>
            </Select>
          </FormItem>
        </div>
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
    const api = this.$store.state.api.payment
    return {
      api: {
        bindOrder: api.bindOrder,
        getBindingOrders: api.getBindingOrders
      },
      modal: false,
      orderList: [],
      formValidate: {
        id: '',
        order_no: ''
      },
      ruleValidate: {
        order_no: [
          { required: true, message: '请选择一个订单', trigger: 'blur' }
        ]
      },
      binding: false
    }
  },
  methods: {
    async show(row) {
      if (row.payments_order_id) {
        this.$Notice.warning({
          desc: '该流水已绑定订单，请重新选择',
          duration: 2
        })
        return false
      }
      // 流水id
      this.formValidate.id = row.payments_id
      this.orderList = await this.getBindingOrders(row.payments_id)
      this.modal = true
    },
    async getBindingOrders(id) {
      let res = false
      try {
        res = await this.$axios.get(`${this.api.getBindingOrders}?id=${id}`)
      } catch (error) {}
      if (res) {
        res = res.data.data
      }
      return res
    },
    handleSubmit(name) {//绑定订单，点击确认
      const app = this
      app.$refs[name].validate(valid => {
        if (valid) {
          if (app.formValidate.order_no && !app.binding) {
            app.binding = true
            app.$axios.post(app.api.bindOrder, app.formValidate).then(res => {
              if (res.data.status == 'success') {
                app.$Notice.success({
                  title: '',
                  desc: '绑定成功',
                  duration: 3
                })
                app.modal = false
                app.binding = false
                app.$emit('reFresh', 'success')
              } else {
                app.$Notice.error({
                  title: '',
                  desc: '绑定失败',
                  duration: 3
                })
              }
            })
          }
        }
      })
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
    .lines {
      position: relative;
    }
  }
}
</style>
