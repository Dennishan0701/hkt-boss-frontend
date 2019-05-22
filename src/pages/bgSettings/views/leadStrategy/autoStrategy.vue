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
                    margin-left: 500px;
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
                <BreadcrumbItem>自动分配</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="manualBody">
            <Tabs type="card" :animated="false" class="tabs" @on-click="changeTab">
                <TabPane label="全部">
                    <Form class="form" ref="formValidate" :model="formValidate" :rules="ruleValidate"
                          :label-width="96" label-position="left">
                        <div class="line">
                            <FormItem label="姓名：">
                                <p style="width: 90px;line-height: 32px">梁朝伟</p>
                            </FormItem>
                            <FormItem label="年级：">
                                <p style="width: 90px;line-height: 32px">初一</p>
                            </FormItem>
                            <FormItem label="试听科目：">
                                <Select style="width: 90px;" v-model="formValidate.subject" placeholder="请选择" transfer>
                                    <Option value="语文">语文</Option>
                                    <Option value="shanghai">London</Option>
                                    <Option value="shenzhen">Sydney</Option>
                                </Select>
                            </FormItem>
                        </div>
                        <div class="line2">
                            <FormItem label="上课时长：">
                                <Select style="width: 90px;" v-model="formValidate.classTime" placeholder="请选择"
                                        transfer>
                                    <Option value="1小时">1小时</Option>
                                    <Option value="shanghai">London</Option>
                                    <Option value="shenzhen">Sydney</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="上课形式：">
                                <RadioGroup v-model="formValidate.classForm">
                                    <Radio label="0" value="0">预习</Radio>
                                    <Radio label="1" value="1">复习</Radio>
                                </RadioGroup>
                            </FormItem>
                        </div>
                        <FormItem label="课时级别：">
                            <RadioGroup v-model="formValidate.classLevel">
                                <Radio label="0">普通</Radio>
                                <Radio label="1">清北</Radio>
                                <Radio label="2">精品</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="正式课频率：">
                            <Select style="width: 90px;" v-model="formValidate.subject" placeholder="请选择" transfer>
                                <Option value="一周1节">一周1节</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="试听课时间：">
                            <DatePicker class="chooseDate" type="date" placeholder="请选择时间"
                                        style="width: 160px"></DatePicker>
                        </FormItem>
                        <FormItem label="教材版本：">
                            <Select style="width: 90px;" v-model="formValidate.teachVersion" placeholder="请选择" transfer>
                                <Option value="0">人教版</Option>
                                <Option value="1">London</Option>
                                <Option value="2">Sydney</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="学习需求：">
                            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 6}"
                                   style="width: 330px"
                                   placeholder="请填写学习需求"></Input>
                        </FormItem>
                        <FormItem label="教师要求：">
                            <RadioGroup v-model="formValidate.gender">
                                <Radio label="male">无要求</Radio>
                                <Radio label="female">男</Radio>
                                <Radio label="female">女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="授课要求：">
                            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 6}"
                                   style="width: 330px"
                                   placeholder="请填写学习需求"></Input>
                        </FormItem>
                        <button type="button" class="submit" @click="handleSubmit('formValidate')">确认</button>
                    </Form>
                </TabPane>
                <TabPane label="A类新名单"></TabPane>
                <TabPane label="B类新名单"></TabPane>
                <TabPane label="TMK待清洗"></TabPane>
                <TabPane label="TMK已清洗"></TabPane>
                <TabPane label="数据中心"></TabPane>
                <TabPane label="重复名单"></TabPane>
                <TabPane label="垃圾池"></TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
  import {isMenu} from '@/api/common';

  export default {
    data() {
      return {
        //排课
        superDiscount: [],//叠加优惠数组
        formValidate: {
          name: '',
          classTime: "1小时",
          classForm: 0,
          classLevel: 0,
          teachVersion: 0,
          mail: '',
          subject: '语文',
          gender: '',
          interest: [],
          date: '',
          time: '',
          desc: ''
        },
        ruleValidate: {
          select: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          mail: [
            {required: true, message: 'Mailbox cannot be empty', trigger: 'blur'},
            {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: 'Please select gender', trigger: 'change'}
          ],
          interest: [
            {
              required: true,
              type: 'array',
              min: 1,
              message: 'Choose at least one hobby',
              trigger: 'change'
            },
            {type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change'}
          ],
          date: [
            {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
          ],
          time: [
            {required: true, type: 'string', message: 'Please select time', trigger: 'change'}
          ],
          desc: [
            {required: true, message: 'Please enter a personal introduction', trigger: 'blur'},
            {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {

    },
    methods: {
      isMenu,
      //切换tab
      changeTab(index) {

      },
      handleSubmit(name) {//拨打弹窗点击确定
        console.log(this.formItem);
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log(this.formItem);
            this.$axios.post(this.callUpAPI, this.formItem).then(res => {
              this.$Message.success('提交成功!');
            });
          } else {
            // this.$Message.error('Fail!');
          }
        })
      },
    }
  }

</script>

