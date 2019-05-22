<template lang="html">
    <div>
        <!--添加支付记录弹窗-->
        <Modal class="modals arrClassModal" width=1000 v-model="modal"
               :mask-closable="false">
            <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
            <div class="modalCon">
                <p class="modalTitle">添加支付记录</p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80"
                      label-position="left">
                    <ul class="listInline">
                        <li>
                            <FormItem label="付款方式" class="blockItem" prop="transaction_type">
                                <Select style="width: 100px;" v-model="formValidate.transaction_type" placeholder="请选择">
                                    <Option v-for="(item,index) in options.transaction_type" :key=index
                                            :value="parseInt(item.key)">
                                        {{item.value}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </li>
                        <li class="ml-30">
                            <FormItem label="付款金额" class="blockItem" prop="amount">
                                <Input style="width:120px" v-model="formValidate.amount"
                                       placeholder="请输入付款金额" number/>
                            </FormItem>
                        </li>
                        <li class="ml-30">
                            <FormItem label="付款时间" class="blockItem" prop="received_at">
                                <DatePicker type="date" v-model="formValidate.received_at"
                                            @on-change="formValidate.received_at=$event" placeholder="请选择时间"
                                            style="width: 120px" :options="payTimeOptions"></DatePicker>
                            </FormItem>
                        </li>
                        <li class="ml-30">
                            <FormItem label="付款截图" prop="transaction_snapshot">
                                <Upload
                                        ref="upload"
                                        :action="apiBase+api.uploadImage"
                                        :format="['jpg','jpeg','png']"
                                        :on-format-error="formatError"
                                        name="image"
                                        :show-upload-list="false"
                                        :headers="{Authorization : 'Bearer ' + token}"
                                        :on-success="handleSuccess">
                                    <Button icon="ios-cloud-upload-outline">上传付款截图</Button>
                                </Upload>
                                {{file.name}}
                            </FormItem>
                        </li>
                    </ul>
                    <!--<p class="addPay" @click="addPay">+新增方式</p>-->
                    <button type="button" class="submit" :disabled="disabled" @click="handleSubmit('formValidate')">确认
                    </button>
                </Form>
            </div>
        </Modal>

    </div>

</template>

<script>
  import {_} from 'vue-underscore';
  import RULE from '@/api/infoRule';
  import $ from 'jquery';
  import apiBase from '@/api/api.config';

  export default {
    data() {
      return {
        payTimeOptions: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        token: localStorage.getItem('token'),
        apiBase: apiBase('api'),
        api: {
          getFieldOptionsAPI: this.$store.state.api.data_query.getFieldOptions, //获取选项值
          addPayRecordAPI: this.$store.state.api.order.addPayRecord,
          uploadImage: this.$store.state.api.order.uploadImage
        },
        modal: false,
        disabled: false,
        file: "",
        options: [],
        formValidate: {
          id: '',
          transaction_type: '',
          amount: "",
          received_at: "",
          transaction_snapshot: "",
        },
        ruleValidate: {
          transaction_type: [{
            type: 'number',
            required: true,
            message: '请选择支付类型',
            trigger: 'change'
          }],
          amount: [{
            required: true,
            // type: 'number',
            // message: '请输入付款金额',
            required: true, validator: RULE().positiveNumber,
            trigger: 'change'
          }],
          received_at: [{
            required: true,
            message: '请选择付款时间',
            trigger: 'change'
          }],
          transaction_snapshot: [{
            required: true,
            message: '请上传付款截图',
            trigger: 'change'
          }],

        },
        fileData: "",
      }
    },
    methods: {
      show(row) {
        this.modal = true;
        //初始化值
        this.formValidate.id = row[0].orders_id;
        this.formValidate.transaction_type = '';
        this.formValidate.amount = '';
        this.formValidate.received_at = '';
        this.formValidate.transaction_snapshot = '';
        this.disabled = false;
        this.file = "";
        let options = ["transaction_type"];
        this.getOptions(options);
      },
      cancel() {
        this.modal = false;
      },
      getOptions(options) { // 获取所有选项
        this.$axios.post(this.api.getFieldOptionsAPI, {
          "field": options
        }).then(res => {
          this.options = res.data.data;
        });
      },
      addPay() {

      },
      formatError() {  //不支持上传类型
        this.$Notice.error({
          title: '不支持的文件类型',
          desc: '仅支持pdf、png、jpg、jpeg',
          duration: 5,
        });
      },
      handleUpload(file) {//上传前
        console.log(file);
        this.fileData = new FormData();
        this.fileData.append('file', file);
        // console.log( this.fileData);
        // console.log( this.fileData.has("file"));//true
        // console.log( this.fileData.get("file"));
        // this.fileData.forEach(function(file){
        //   console.log(file)
        // })
        this.formValidate.transaction_snapshot = this.fileData;
        return false;
      },
      handleSuccess(res, file) {
        this.file = file;
        this.formValidate.transaction_snapshot = res.data;
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.disabled = true;
            // 流程可能有问题 暂时先不动
            // let selections = '';
            // try {
            //   selections = JSON.parse(sessionStorage.getItem('selectionRows'))
            // } catch (error) {
            //   console.log(error.message);
            // }
            // this.formValidate.id = selections
            // console.log('newbee', selections);
            this.$axios.post(this.api.addPayRecordAPI, this.formValidate).then(res => {
              this.disabled = true;
              this.modal = false;
              this.$Notice.success({
                title: '',
                desc: '添加支付记录成功！',
                duration: 4
              });
              this.$emit('reFresh', 'success');
            }).catch(error => {
              this.disabled = false;
            });
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../../../../../assets/css/main.less";

    .ivu-form {
        position: relative;
    }

    .listInline {
        display: flex;
        li {
        }
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
        margin-left: 808px !important;
    }
</style>
