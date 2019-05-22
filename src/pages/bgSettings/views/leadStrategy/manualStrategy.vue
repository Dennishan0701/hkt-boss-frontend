<style lang="less" scoped>
    @import "../../../../assets/css/standard.less";

    .manual-content {
        .manualBody {
            .form {
                padding: 36px 20px 20px 30px;
                .ivu-form-item {
                    margin-bottom: 20px;
                }
                .ivu-form .ivu-form-item-label {
                    padding: 0;
                    line-height: 32px;
                }
                .ivu-form .ivu-form-item-label {
                    color: @light-gray-color;
                }
                .ivu-select-single .ivu-select-selection {
                    height: 28px;
                    border: none;
                    background-color: @auxiliary-color4;
                    border-radius: 14px;
                }
                .ivu-form-item-content {
                    color: @dark-gray-color;
                }
                .chooseDate {
                    .ivu-input {
                        border: none;
                        background-color: @auxiliary-color4;
                        height: 28px;
                        border-radius: 14px;
                    }
                    .ivu-input-icon {
                        width: 28px;
                        height: 28px;
                        line-height: 28px;
                    }
                }
                .ivu-input:focus {
                    box-shadow: none;
                }
                .line {
                    width: 516px;
                    display: flex;
                    justify-content: space-between;
                    .ivu-form-item-label {
                        width: 52px !important;
                    }
                    .ivu-form-item-content {
                        margin-left: 52px !important;
                    }
                    .ivu-form-item:last-child {
                        .ivu-form-item-label {
                            width: 70px !important;
                        }
                        .ivu-form-item-content {
                            margin-left: 70px !important;
                        }
                    }
                }
                .line2 {
                    width: 453px;
                    display: flex;
                    justify-content: space-between;
                    .ivu-form-item-label {
                        width: 90px !important;
                    }
                    .ivu-form-item-content {
                        margin-left: 90px !important;
                    }
                }
                textarea.ivu-input {
                    background-color: @tableBgColor1;
                    border: none;
                }
                .submit {
                    width: 70px;
                    height: 28px;
                    background: @primary-color;
                    border-radius: 14px;
                    border-radius: 14px;
                    text-align: center;
                    padding: 0;
                    color: @white-color;
                    border: none;
                    margin: 20px 0 40px 120px;
                    outline: none;
                    cursor: pointer;
                    &:hover {
                        background: @primary-hover;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="manual-content">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/leadStrategy/manualStrategy">名单策略</BreadcrumbItem>
                <BreadcrumbItem>分配策略</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="manualBody">
            <Tabs type="card" :animated="false" class="tabs" @on-click="changeTab">
                <TabPane label="CC名单">
                    <Form class="form" ref="formValidate" :model="formValidate" :rules="ruleValidate"
                          :label-width="130" label-position="left">

                        <FormItem label="CC名单上限：" style="width: 330px" prop="max_leads_protected">
                            <Input v-model="formValidate.max_leads_protected"></Input>
                        </FormItem>
                        <FormItem label="CC流动池上限：" style="width: 330px" prop="max_cc_pool">
                            <Input v-model="formValidate.max_cc_pool"></Input>
                        </FormItem>


                        <button type="button" class="submit" @click="handleSubmit('formValidate')">保存</button>
                    </Form>
                </TabPane>
                <TabPane label="A类新名单"></TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
  import {isMenu} from '@/api/common';

  export default {
    data() {
      return {
        formValidate: {
          max_leads_protected: '',
          max_cc_pool: ''
        },
        ruleValidate: {
          max_leads_protected: [
            {required: true, trigger: 'change'}
          ],
          max_cc_pool: [
            {required: true, trigger: 'change'}
          ],
        }
      }
    },
    mounted() {
      this.$axios.post(this.$store.state.api.sysConfig.getConfigs, ['max_leads_protected', 'max_cc_pool']).then(res => {
        if (!(res.data.data instanceof Array)) {
          this.formValidate = res.data.data
        }
      });
    },
    methods: {
      isMenu,
      //切换tab
      changeTab(index) {

      },
      handleSubmit(name) {//提交保存

        this.$refs[name].validate((valid) => {

          if (valid) {
            this.$axios.post(this.$store.state.api.sysConfig.storeConfigs, this.formValidate).then(res => {
              this.$Message.success(res.data.message);
            });
          } else {
            this.$Message.error('保存失败!');
          }
        })
      },
    }
  }

</script>
