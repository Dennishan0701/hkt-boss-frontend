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
                    margin: 40px 0;
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
                <BreadcrumbItem>系统设置</BreadcrumbItem>
                <BreadcrumbItem to="/system/usageScope">分配策略</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="manualBody">
            <Tabs type="card" :animated="false" class="tabs" @on-click="changeTab">
                <TabPane label="部门可用性设置">
                    <Form class="form" ref="formValidate" :model="formValidate"
                          :label-width="150" label-position="left">

                        <FormItem label="TMK顶级部门：" style="width: 800px">
                            <Select v-model="formValidate.tmk_affiliation_department">
                                <Option v-for="item in depts" :value="item.id" :key="item.id">{{item.delimiter}}{{
                                    item.name }}-{{ item.id }}
                                </Option>
                            </Select>

                        </FormItem>

                        <FormItem label="CC顶级部门：" style="width: 800px">
                            <Select v-model="formValidate.cc_affiliation_department">
                                <Option v-for="item in depts" :value="item.id" :key="item.id">{{item.delimiter}}{{
                                    item.name }}-{{ item.id }}
                                </Option>
                            </Select>
                            <!-- <Select v-model="formValidate.cc_affiliation_department" filterable multiple clearable>
                              <Option v-for="item in depts" :value="item.id" :key="item.id">{{item.delimiter}}{{ item.name }}</Option>
                            </Select> -->
                        </FormItem>

                        <FormItem label="CC顶级部门：" style="width: 800px">
                            <!-- <Select v-model="formValidate.cr_affiliation_department" filterable multiple clearable>
                              <Option v-for="item in depts" :value="item.id" :key="item.id">{{item.delimiter}}{{ item.name }}</Option>
                            </Select> -->

                            <Select v-model="formValidate.cr_affiliation_department">
                                <Option v-for="item in depts" :value="item.id" :key="item.id">{{item.delimiter}}{{
                                    item.name }}-{{ item.id }}
                                </Option>
                            </Select>
                        </FormItem>

                        <button type="button" class="submit" @click="handleSubmit('formValidate')">保存</button>
                    </Form>
                </TabPane>

            </Tabs>
        </div>
    </div>
</template>
<script>
  import {isMenu} from '@/api/common';

  export default {
    data() {
      return {
        api: {
          departmentsListAPI: this.$store.state.api.lead.departmentsList, //获取部门选项列表
          getConfigsAPI: this.$store.state.api.sysConfig.getConfigs, //获取已保存的部门和选项
          storeConfigsAPI: this.$store.state.api.sysConfig.storeConfigs //存储表单
        },
        depts: '',
        formValidate: {
          tmk_affiliation_department: '',
          cc_affiliation_department: '',
          cr_affiliation_department: ''
        }
      }
    },
    mounted() {
      this.getDepartments();
      this.getConfigs();
    },
    methods: {
      isMenu,
      //切换tab
      changeTab(index) {

      },
      getDepartments() {
        this.$axios.get(this.api.departmentsListAPI).then(res => {
          this.depts = res.data.data
        });
      },
      getConfigs() {
        this.$axios.post(this.api.getConfigsAPI, ['tmk_affiliation_department', 'cc_affiliation_department', 'cr_affiliation_department']).then(res => {
          if (!(res.data.data instanceof Array)) {

            for (var item in res.data.data) {
              if (res.data.data[item]) {
                let string_arr = res.data.data[item].split(',');
                string_arr.forEach((i, key) => {
                  string_arr[key] = parseInt(i);
                });
                this.formValidate[item] = string_arr;
              }
            }

            console.log(this.formValidate);
            //this.formValidate = res.data.data
          }
        });
      },
      handleSubmit(name) {//提交保存

        this.$axios.post(this.api.storeConfigsAPI, this.formValidate).then(res => {
          this.$Message.success(res.data.message);
        }).catch(e => {

          this.$Message.error('保存失败!');
        });

      },
    }
  }

</script>
