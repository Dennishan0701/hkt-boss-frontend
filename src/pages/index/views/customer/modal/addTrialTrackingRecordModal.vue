<template lang="html">
    <div>
        <!--试听课排课申请弹窗-->
        <Modal class="modals arrClassModal" width=680 v-model="modal"
               :mask-closable="false">
            <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
            <div class="modalCon">
                <p class="modalTitle">试听课反馈</p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90"
                      label-position="left">
                    <FormItem label="是否上课" class="blockItem" prop="class_status">
                        <Select v-model="formValidate.class_status" placeholder="请选择" style="width:130px;" transfer>
                            <Option :value="3">未上课</Option>
                            <Option :value="2">已上课</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="试听状态" class="blockItem" prop="trial_class_detail">
                        <Select v-model="formValidate.trial_class_detail" placeholder="请选择" style="width:130px;"
                                transfer>
                            <Option :value="item.value" v-for="(item,index) in trial_class_detail_options_computed"
                                    :key="index">{{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="详细描述" class="blockItem">
                        <Input v-model="formValidate.trial_class_feedback" type="textarea"
                               :autosize="{minRows: 3,maxRows: 5}" placeholder="填写上述状态的具体情况"/>
                    </FormItem>
                    <button type="button" class="submit" style="float:none;" @click="handleSubmit('formValidate')">确认</button>
                </Form>
            </div>
        </Modal>

    </div>

</template>
<style lang="less">
    .submit {
        float: none;
    }
</style>
<script>
  import {_} from 'vue-underscore';
  export default {
    data() {
      return {
        api: {
          addTrialTrackingRecordAPI: this.$store.state.api.trial_class_arrangement.addTrialTrackingRecord
        },
        modal: false,
        formValidate: {
          class_status: '',
          trial_class_detail: '',
          trial_class_feedback: '',
          main_id: '',
          class_each_id: ''
        },
        ruleValidate: {
          class_status: [{
            type: 'number',
            required: true,
            message: '请选择是否上课',
            trigger: 'change'
          }],
          trial_class_detail: [{
            type: 'number',
            required: true,
            message: '请选择试听状态',
            trigger: 'change'
          }],
        },
        trial_class_detail_options: [
          {name: "提前取消", value: 1},
          {name: "学生放鸽子", value: 2},
          {name: "老师放鸽子", value: 3},
          {name: "技术问题", value: 4},
          {name: "转化成功", value: 5},
          {name: "待跟进", value: 6},
          {name: "已放弃", value: 7},
        ]
      }
    },
    computed: {
      trial_class_detail_options_computed() {
        if (this.formValidate.class_status == 3) {
          return _.initial(this.trial_class_detail_options, 3);
        } else if (this.formValidate.class_status == 2) {
          return _.rest(this.trial_class_detail_options, 4);
        }
      }
    },
    methods: {
      show(data) {
        this.modal = true;
        this.formValidate.main_id = data.main_id;
        this.formValidate.class_each_id = data.id;
      },
      cancel() {
        this.modal = false;
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post(this.api.addTrialTrackingRecordAPI, this.formValidate).then(res => {
              this.$Notice.success({
                title: '',
                desc: '反馈成功，谢谢！',
                duration: 4
              });
              this.modal = false;
              window.location.reload();
            });
          }
        });
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
