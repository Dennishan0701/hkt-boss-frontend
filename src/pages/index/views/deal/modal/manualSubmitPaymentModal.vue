<template lang="html">
  <div>
      <!--手动添加支付接口弹窗-->
      <Modal class="modals arrClassModal" width=680 v-model="modal"
             :mask-closable="false">
        <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
        <div class="modalCon">
          <p class="modalTitle">手动提交支付记录</p>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90"
                label-position="left">
                <ul class="list-inline">
                  <li>
                    <FormItem label="订单号" class="blockItem">
                        {{current_payment.order_order_no}}
                    </FormItem>
                  </li>
                  <li class="ml-30">
                    <FormItem label="订单金额" class="blockItem">
                        {{current_payment.order_actual_amount}}
                    </FormItem>
                  </li>
                  <li class="ml-30">
                    <FormItem label="流水金额" class="blockItem">
                        {{current_payment.payments_amount}}
                    </FormItem>
                  </li>
                  <li>
                    <FormItem label="支付渠道" class="blockItem">
                        {{current_payment.payments_transaction_type_format}}
                    </FormItem>
                  </li>
                </ul>

                <FormItem label="支付时间"  prop="received_at">
                  <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" :editable="true"
                              v-model="formValidate.received_at" placeholder="选择日期时间" style="width: 160px"
                              @on-change="formValidate.received_at=$event"></DatePicker>
                </FormItem>
                <FormItem label="上传凭证"  prop="transaction_snapshot">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                      <Button icon="ios-cloud-upload-outline">上传支付凭证</Button>
                  </Upload>
                </FormItem>
            <button type="button" class="submit" :disabled="disabled" @click="handleSubmit('formValidate')">确认</button>
         </Form>
      </div>
    </Modal>

  </div>

</template>

<script>
import {
    _
}
from 'vue-underscore';
export default {

  data(){
    return {
     api:{
         manualSubmitPayment:this.$store.state.api.payment.manualSubmitPayment
     },
      modal: false,
      disabled: false,
      current_payment:'',
      formValidate:{
          id:'',
          received_at:''
      },
      ruleValidate: {
        received_at: [{
          required: true,
          message: '请选择支付时间',
          trigger: 'change'
        }],
      }
    }
  },
  methods:{
    show (data) {
      console.log(data);
      this.modal = true;
      this.current_payment = data;
      this.formValidate.id = data.payments_id;
      this.formValidate.received_at ="";
      this.disabled = false;
    },
    cancel(){
      this.modal = false;
    },
    handleSubmit(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.disabled = true;
          this.$axios.post(this.api.manualSubmitPayment, this.formValidate).then(res => {
            this.$Notice.success ({
              title: '',
              desc: '支付信息提交成功，谢谢！',
              duration: 4
            });
            this.modal = false;
          });
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
