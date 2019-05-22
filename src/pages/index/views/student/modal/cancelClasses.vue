<!--取消课次-->
<template>
    <div>
        <Modal class="mdModal"
               v-model="modal"
               width="600"
               :mask-closable="false"
        >
            <div class='mdModalheader' slot="header">
                <Icon type="ios-paper-plane" color="orange" size="22" style="margin-top: -3px;"/>
                取消课次
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
                <FormItem label="姓名">
                    <span style="line-height: 34px;height: 34px;font-size: 14px;">{{lead.basic_info_name || lead.class_schedules_name}}</span>
                </FormItem>
                <FormItem label="课程取消原因" prop="cancel_class_cause">
                    <Select v-model="formValidate.cancel_class_cause" placeholder="请选择原因" style="width:120px" transfer>
                        <Option v-for="(item,index) in cancel_class_causeList" :value="parseInt(item.key)"
                                :key="index">
                            {{item.value}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="课程取消原因备注">
                    <Input v-model="formValidate.cancel_class_remark" type="textarea" :maxlength="100"
                           :autosize="{minRows: 3,maxRows: 5}" placeholder="课程计划"/>
                </FormItem>
            </Form>
            <Button type="info" class="mdBtn" @click="handleSubmit('formValidate')">确认</Button>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        api: {
          getFieldOptionsAPI: this.$store.state.api.data_query.getFieldOptions,
          cancelFormalClass: this.$store.state.api.customers.cancelFormalClass,
        },
        date: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        id: '',
        lead: '',
        modal: false,
        cancel_class_causeList:[],
        formValidate: {
          id: "",
          cancel_class_cause: "",
          cancel_class_remark: "",
        },
        ruleValidate: {
          cancel_class_cause: [
            {type: 'number', required: true, message: '请选择取消原因', trigger: 'change'},
          ],
        },
      }
    },
    computed: {},
    mounted() {
      this.getAllOptions();
    },
    methods: {
      show(lead) {
        this.modal = true;
        this.lead = lead;
        this.formValidate.id = lead.class_eaches_id;
      },
      getAllOptions() {// 获取所有选项
        this.$axios.post(this.api.getFieldOptionsAPI, {"field": ['cancel_class_cause']}).then(res => {
          this.cancel_class_causeList = res.data.data.cancel_class_cause;
        });
      },
      handleSubmit(name) {//取消课次弹窗，点击确认
        let app = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            app.$axios.post(app.api.cancelFormalClass, this.formValidate).then(res => {
              if (res.data.status == "success") {
                app.$Notice.success({
                  title: '',
                  desc: '取消成功',
                  duration: 4
                });
                this.modal = false;
                this.$emit('reFresh', 'success')
              } else {
                app.$Notice.error({
                  title: '',
                  desc: '取消失败',
                  duration: 4
                });
              }
            });
          }
        });
      },
    }
  };
</script>

<style lang="less" scoped>
    @import "../../../../../assets/css/vividStandard.less";

    .stuName {
        margin-bottom: 6px;
        .ivu-form-item-label:before {
            content: '*';
            display: inline-block;
            margin-right: 4px;
            line-height: 1;
            font-family: SimSun;
            font-size: 12px;
            color: #ed4014;
        }
    }

    .title_outer {
        padding: 15px 0;
        .title_inner {
            font-size: 14px;
            font-weight: 600;
            color: #2db7f5;
            margin-left: 22px;
            border-bottom: 3px solid #2db7f5;
            border-bottom: 3px solid #2db7f5;
            letter-spacing: 1px;
            padding: 2px 0;
        }
    }

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
            .ivu-modal-body {
                padding: 20px !important;
            }
            .ivu-modal-footer {
                /*display: block;*/
            }
            .mdBtn {
                margin-right:0px;
            }
            .lines {
                /*display: flex;*/
                /*width: 700px;*/
                position: relative;
                .ivu-form-item {
                    width: 210px;
                    display: inline-block;
                }
                .blockItem {
                    width: 650px;
                    /*width:100%;*/
                    display: block;
                }
            }
            .labelTitle {
                font-size: 14px;
                color: #abb2bf;
            }
            .addSubject {
                position: absolute;
                right: 40px;
                bottom: 5px;
                color: @primary-color;
                cursor: pointer;
                font-size: 14px;
            }
            /*.block{*/
            /*.ivu-form-item{*/
            /*width: 300px;*/
            /*display: inline-block;*/
            /*}*/
            /*}*/
        }
    }

</style>
