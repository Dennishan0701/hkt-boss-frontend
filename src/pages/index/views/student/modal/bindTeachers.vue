<!--绑定老师-->
<template>
    <div>
        <Modal class="mdModal"
               v-model="modal"
               width="500"
               :mask-closable="false"
        >
            <div class='mdModalheader' slot="header">
                <Icon type="ios-paper-plane" color="orange" size="22" style="margin-top: -3px;"/>
                绑定老师
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
                <div class="lines">
                    <FormItem label="年级">
                        <span style="line-height: 34px;height: 34px;font-size: 14px;">{{lead.class_schedules_grade_format}}</span>
                    </FormItem>
                    <FormItem label="科目">
                        <span style="line-height: 34px;height: 34px;font-size: 14px;"> {{lead.class_schedules_subject_format}}</span>
                    </FormItem>
                </div>
                <FormItem label="学生手机号">
                    <span style="line-height: 34px;height: 34px;font-size: 14px;">{{mobile}}</span>
                </FormItem>
                <FormItem label="老师手机号" prop="teacher_phone">
                    <Input v-model="formValidate.teacher_phone" placeholder="请填写老师手机号" style="width: 200px;"></Input>
                </FormItem>

            </Form>
            <Button type="info" class="mdBtn2" @click="handleSubmit('formValidate')">确认</Button>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
  import RULE from '@/api/infoRule';

  export default {
    data() {
      return {
        api: {
          bindingTeacher: this.$store.state.api.customers.bindingTeacher,
          getOneAPI: this.$store.state.api.customers.getOne,
        },
        lead: '',
        modal: false,
        mobile: "",
        formValidate: {
          id: "",
          teacher_phone: ""
        },
        ruleValidate: {
          teacher_phone: [{required: true, validator: RULE().validatePhone, trigger: 'blur'}],
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
        this.formValidate.id = lead.class_schedules_id;
        this.getCoursePlan(this.formValidate.id);
      },
      //获取课程计划详情
      getCoursePlan(id) {
        let api = this.api.getOneAPI + "/" + id
        this.$axios.get(api).then(res => {
          this.mobile = res.data.data.basic_info.mobile;
        });
      },

      handleSubmit(name) {//绑定老师，点击确认

        let app = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            app.$axios.post(app.api.bindingTeacher, this.formValidate).then(res => {
              if (res.data.status == "success") {
                app.$Notice.success({
                  title: '',
                  desc: '绑定成功',
                  duration: 4
                });
                this.modal = false;
                this.$emit('reFresh', 'success')
              } else {
                app.$Notice.error({
                  title: '',
                  desc: '绑定失败',
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
            .mdBtn2 {
                margin: 0 auto;
                display: block;
            }
            .lines {
                /*display: flex;*/
                /*width: 700px;*/
                position: relative;
                .ivu-form-item {
                    width: 140px;
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
