<template>
    <div>
        <Modal class="mdModal"
               v-model="modal"
               width="550"
               :mask-closable="false"
        >
            <div class='mdModalheader' slot="header">
                <Icon type="ios-paper-plane" color="orange" size="22" style="margin-top: -3px;"/>
                <!--名单分配-->
                {{title}}
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <div class="line">
                    <FormItem label="分配至" prop="distributeToName">
                        <Select v-model="formValidate.distributeToName" style="width:180px"
                                @on-change='changeDepartment' placeholder="请选择部门" transfer>
                            <Option v-for="(item,index) in departmentList" :value="item.id" :key="index">

                                <template>{{item.delimiter}} {{item.name}}</template>

                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="分配至" prop="departmentUser">
                        <Select v-model="formValidate.departmentUser" placeholder="请选择分配人" style="width:180px" transfer
                                filterable>
                            <Option v-for="(item,index) in departmentUsersList" :value="item.id" :key="index">{{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                </div>
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
          departmentsAPI: this.$store.state.api.lead.distributableList,//手动分配弹窗，获取所有部门列表
          departmentUsersAPI: this.$store.state.api.lead.departmentUsers,//cc手动分配弹窗，根据选择的部门，获取所有user列表
          departmentDistributableUsers: this.$store.state.api.lead.departmentDistributableUsers,//cr手动分配弹窗，根据选择的部门，获取所有user列表
          manualDistributeAPI: this.$store.state.api.lead.manualDistribute + '?code = 4', //手动分配弹窗,点击确定
          manualDistributeCustomerAPI:this.$store.state.api.customers.manualDistributeCustomer,//CR手动分配API
        },
        title: "",
        modal: false,
        loading: false,
        role: "",//传过来的角色是CC/CR
        main_ids: "",//传过来的例子ID集合
        distribution_scenario: "",//分配场景
        formValidate: {
          distributeToName: "",
          departmentUser: ""
        },
        ruleValidate: {
          distributeToName: [
            {type: 'number', required: true, message: '请选择部门', trigger: 'change'},
          ],
          departmentUser: [
            {type: 'number', required: true, message: '请选择分配人', trigger: 'change'},
          ],
        },
        departmentList: [],// 部门列表
        departmentUsersList: [],//部门下面user列表
      }
    },
    mounted() {
    },
    methods: {
      show(title, role, main_ids, distribution_scenario) {
        this.title = title;
        this.role = role;
        this.main_ids = main_ids;
        // console()
        this.distribution_scenario = distribution_scenario;
        this.modal = true;

        this.formValidate.distributeToName = '';
        this.formValidate.departmentUser = '';
        this.getAllDepartment();
      },
      getAllDepartment() {// 获取部门列表
        this.$axios.get(this.api.departmentsAPI, {
          params: {
            allocation_obj: this.role
          },
          loading: false
        }).then(res => {
          this.departmentList = res.data.data;
        });
      },
      changeDepartment() {// 选择部门，获取人列表
        this.departmentUsersList = [];
        let URL;
        if(this.role=="cr"){
          URL = this.api.departmentDistributableUsers + "/" + this.formValidate.distributeToName;
        }
        else{
          URL = this.api.departmentUsersAPI + "/" + this.formValidate.distributeToName;
        }
        this.$axios.get(URL).then(res => {
          this.departmentUsersList = res.data.data;
        });
      },
      handleSubmit(name) {//名单分配弹窗，点击确认
        let submitAPI = this.api.manualDistributeAPI;
        if(this.distribution_scenario =='cr-cr'){
          submitAPI = this.api.manualDistributeCustomerAPI;
        }
        this.$refs[name].validate((valid) => {

          if (valid) {

            this.$axios.post(submitAPI, {
              main_ids: this.main_ids,
              to_user_id: this.formValidate.departmentUser,
              distribution_scenario: this.distribution_scenario,
            }).then(res => {
              this.$Notice.success({
                title: '',
                desc: '分配成功',
                duration: 3
              });
              this.modal = false;
              this.$emit('reFresh', 'success')
            });
          }
        });
      },
    }
  };
</script>

<style lang="less">
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
                margin-left: 425px;
            }
            .line {
                display: flex;
                /*justify-content: space-between;*/
                .ivu-form-item:nth-child(2) {
                    .ivu-form-item-label {
                        display: none;
                    }
                    .ivu-form-item-content {
                        margin-left: 20px !important;
                    }
                }
            }
        }
    }

</style>
