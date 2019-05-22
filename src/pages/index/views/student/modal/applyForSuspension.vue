<!--停课申请-->
<template>
    <div>
        <Modal class="mdModal"
               v-model="modal"
               width="600"
               :mask-closable="false"
        >
            <div class='mdModalheader' slot="header">
                <Icon type="ios-paper-plane" color="orange" size="22" style="margin-top: -3px;"/>
                停课申请
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
                <FormItem label="姓名">
                    <span style="line-height: 34px;height: 34px;font-size: 14px;">{{lead.basic_info_name}}</span>
                </FormItem>
                <FormItem label="申请停课时段" prop="date" style="width:350px" class="blockItem">
                    <DatePicker type="daterange" v-model="formValidate.date" placeholder="请选择申请停课时段" transfer
                                style="width: 200px" @on-change="[formValidate.start_at,formValidate.end_at]=$event"></DatePicker>
                </FormItem>
                <FormItem label="停课备注" class="blockItem">
                    <Input v-model="formValidate.remark" type="textarea"
                           :autosize="{minRows: 3,maxRows: 5}" placeholder="请填写停课备注"/>
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
          arrangeAPI: this.$store.state.api.customers.apply,
        },
        lead: '',
        modal: false,
        formValidate: {
          main_id: "",
          date:"",
          start_at:"",
          end_at:"",
          remark:"",
        },
        ruleValidate: {
          date: [
            { required: true, type:"array",message: '请选择申请停课时段', trigger: 'change' }
          ],
        },
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      show(lead) {
        this.modal = true;
        this.lead = lead;
        this.id = lead.basic_info_id;
        this.formValidate.main_id = lead.basic_info_id;
        this.formValidate.date= "";
      },

      handleSubmit(name) {//停课申请弹窗，点击确认
        let app = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            app.$axios.post(app.api.arrangeAPI, this.formValidate).then(res => {
              if (res.data.status == "success") {
                app.$Notice.success({
                  title: '',
                  desc: '操作成功',
                  duration: 4
                });
                this.modal = false;
                this.$emit('reFresh', 'success')
              } else {
                app.$Notice.error({
                  title: '',
                  desc: '操作失败',
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
                margin-right: 27px;
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
