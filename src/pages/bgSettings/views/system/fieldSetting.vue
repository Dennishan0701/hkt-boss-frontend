<style lang="less" scoped>
    @import "../../../../assets/css/standard.less";

    .fildSetting-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        .fildSettingBody {
            flex: 5;
            overflow-y: scroll;
            .fildSettingCon {
                background-color: @white-color;
                padding: 20px;
                height: 100%;
                .fildContent {
                    border: 1px solid @light-gray-hover;
                    overflow: scroll;
                    height: 100%;
                    /*height: 600px;*/
                    .fildHead {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        /*position: fixed;*/
                        li {
                            text-align: center;
                            line-height: 60px;
                            font-size: 16px;
                            color: @dark-gray-color;
                            background-color: @class-blue;
                            border-bottom: 1px solid @light-gray-hover;
                            /*padding: 0 20px;*/
                            flex: 1;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            /*max-width: 100px;*/
                            min-width: 120px;
                        }
                        li:last-child {
                            min-width: 240px;
                        }
                    }
                    .fildBody {
                        display: flex;
                        justify-content: space-between;
                        background-color: @class-blue;
                        &:nth-child(2n-1) {
                            li {
                                background-color: @tableBgColor1;
                            }
                        }
                        &:nth-child(2n) {
                            li {
                                background-color: @tableBgColor2;
                            }
                        }
                        &.red {
                            li {
                                background-color: @tips-color;
                            }
                        }
                        li {
                            flex: 1;
                            height: 50px;
                            line-height: 50px;
                            text-align: center;
                            color: @dark-gray-color;
                            /*max-width: 100px;*/
                            min-width: 120px;
                            font-size: 14px;
                            button {
                                height: 28px;
                                //width: 70px;
                                border-radius: 14px;
                                text-align: center;
                                padding: 0 8px;
                                margin-left: 10px;
                                color: @primary-color;
                                border: 1px solid @primary-color;
                                background-color: @btn-bg-color;
                                &:hover {
                                    color: @primary-hover;
                                    border: 1px solid @primary-hover;
                                }
                                //margin-top: 20px;
                            }
                            .ivu-btn:focus {
                                box-shadow: none;
                            }
                            button.btn2 {
                                color: @tips-color;
                                border: 1px solid @tips-color;
                                background-color: @btn-bg2-color;
                                &:hover {
                                    color: @tips-hover;
                                    border: 1px solid @tips-hover;
                                }
                            }
                            button:disabled {
                                color: @btn-disable-color;
                                border: 1px solid @btn-disable-color;
                                background-color: @white-color;
                                &:hover {
                                    color: @btn-disable-color;
                                    border: 1px solid @btn-disable-color;
                                    background-color: @white-color;
                                }
                            }
                        }
                        li:last-child {
                            min-width: 240px;
                        }
                    }
                }
            }
        }
    }

    .modals {
        .ivu-modal-footer {
            display: none;
        }
        .ivu-modal-body {
            padding: 0;
        }
        .ivu-modal-close .ivu-icon-ios-close {
            display: none;
        }
        .closeModal {
            font-size: 31px;
            color: #999;
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
            z-index: 3;
        }
    }

    //编辑选项弹窗
    .editModal {
        .modalCon {
            padding: 20px 0 20px 10px;
            .modalTitle {
                color: @dark-gray-color;
                text-align: left;
                font-size: 16px;
                margin-bottom: 28px;
                margin-left: 10px;
            }
            .orderAmount {
                position: absolute;
                bottom: 0px;
                left: 0px;
                font-size: 12px;
                span:first-child {
                    color: @dark-gray-color;
                    margin-right: 5px;
                    margin-left: 0;
                    i {
                        font-size: 16px;
                        color: @error-color;
                        margin-left: 8px;
                        vertical-align: -1px;
                    }
                }
                span {
                    color: @tips-color;
                    margin-left: 14px;
                    i {
                        margin-left: 4px;
                    }
                }
            }
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
            .ivu-form-item-content {
                color: @dark-gray-color;
            }
            .ivu-input:focus {
                box-shadow: none;
            }
            .line {
                width: 100%;
                display: flex;
                /*justify-content: space-between;*/
                .ivu-form-item:not(:first-child) {
                    .ivu-form-item-label {
                        display: none !important;
                        width: 20px !important;
                    }
                }
                .ivu-form-item-content {
                    margin-left: 70px !important;
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
            .operate {
                display: flex;
                .submit {
                    width: 90px;
                    height: 30px;
                    background: @primary-color;
                    border-radius: 15px;
                    text-align: center;
                    padding: 0;
                    color: @white-color;
                    border: none;
                    margin-top: 20px;
                    outline: none;
                    cursor: pointer;
                    &:hover {
                        background: @primary-hover;
                    }
                    &:first-child {
                        margin: 20px 20px 10px 360px;
                    }
                }

            }
        }
    }

    //编辑字段弹窗
    .fieldModal {
        .modalCon {
            padding: 20px 0 40px 10px;
            .modalTitle {
                color: @dark-gray-color;
                text-align: left;
                font-size: 16px;
                margin-bottom: 28px;
                margin-left: 10px;
            }
            /*.fieldForm {*/
            /*width: 320px;*/
            /*margin: 0 auto;*/
            /*}*/
            .line {
                width: 600px;
                display: flex;
                justify-content: space-between;
            }
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
            .ivu-form-item-content {
                color: @dark-gray-color;
            }
            .ivu-input:focus {
                box-shadow: none;
            }
            .submit {
                width: 90px;
                height: 30px;
                background: @primary-color;
                border-radius: 15px;
                text-align: center;
                padding: 0;
                color: @white-color;
                border: none;
                margin-top: 20px;
                outline: none;
                cursor: pointer;
                margin-left: 230px;
                &:hover {
                    background: @primary-hover;
                }
            }
        }
    }
</style>

<template>
    <div class="fildSetting-content">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/system/fildSetting">系统设置</BreadcrumbItem>
                <BreadcrumbItem>字段设置</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <Tabs type="card" :animated="false" class="tabs" @on-click="changeTab">
            <TabPane :label="item.name" v-for="(item,index) in fields_group" :key="index" :name="'' +item.id"
                     @click="changeTab"></TabPane>
        </Tabs>
        <div class="fildSettingBody">
            <div class="fildSettingCon">
                <div class="fildContent">
                    <ul class="fildHead">
                        <li>字段名称</li>
                        <li>英文名</li>
                        <li>所在表名</li>
                        <li>分组ID</li>

                        <li>过滤器是否显示</li>
                        <li>过滤器类型</li>
                        <li style="min-width: 160px">过滤器是否默认勾选</li>
                        <li style="min-width: 160px">过滤器选项请求URL</li>

                        <li>表格是否显示</li>
                        <li style="min-width: 160px">表格是否默认勾选</li>
                        <li>是否允许搜索</li>
                        <li>是否允许排序</li>

                        <li>数据查询类型</li>
                        <li>启用状态</li>
                        <li>序号</li>
                        <li>编辑</li>

                    </ul>
                    <div>
                        <ul class="fildBody" v-for="(field,index) in fields" :class="{red:field.query_type>0}"
                            :key="index">
                            <li>{{field.display_name}}</li>
                            <li>{{field.field_name}}</li>
                            <li>{{field.table_name}}</li>
                            <li>{{field.group_id}}</li>
                            <!--过滤器是否显示-->
                            <!--<li v-if="field.is_filter==0">否</li>-->
                            <!--<li v-else>是</li>-->
                            <li>{{field.is_filter}}</li>
                            <li>{{field.filter_type}}</li>
                            <li style="min-width: 160px">{{field.is_filter_checked}}</li>
                            <li style="min-width: 160px">{{field.api_url}}</li>

                            <li>{{field.is_display}}</li>
                            <li style="min-width: 160px">{{field.is_display_checked}}</li>
                            <li>{{field.is_search}}</li>
                            <li>{{field.is_sort}}</li>

                            <li>{{field.query_type}}</li><!--数据查询类型>0,整行颜色变-->
                            <li>{{field.status}}</li>
                            <li>{{field.sort}}</li>
                            <li>
                                <Button @click="fieldEditShow(field)">编辑字段</Button>
                                <Button class="btn2" @click="editOptions(field.original_field_name)">编辑选项</Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--编辑选项弹窗-->
        <Modal class="modals editModal" :width=650 v-model="editShow" :mask-closable="false">
            <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
            <div class="modalCon">
                <p class="modalTitle">编辑选项</p>
                <Form ref="formDynamic" :model="formDynamic" :label-width="70" style="width: 600px">
                    <div class="line" v-for="(item,index) in formDynamic.data" :key="index">
                        <!--<FormItem :label="'名称' + item.index"-->
                        <FormItem :label="'名称'"
                                  :prop="'data.' + index + '.value'"
                                  :rules="{required: true, message: '名称不能为空', trigger: 'blur'}">
                            <Input type="text" v-model="item.value" style="width: 180px;" placeholder="名称"></Input>
                        </FormItem>
                        <FormItem label="key"
                                  :prop="'data.' + index + '.key'"
                                  :rules="{required: true, message: '不能为空', trigger: 'blur'}">
                            <Input type="text" v-model="item.key" style="width: 50px;" placeholder="key"></Input>
                        </FormItem>
                        <FormItem label="排序"
                                  :prop="'data.' + index + '.sort'"
                                  :rules="{required: true, message: '不能为空', trigger: 'blur'}">
                            <Input type="text" v-model="item.sort" style="width: 50px;" placeholder="排序"></Input>
                        </FormItem>
                        <FormItem label="Switch">
                            <i-switch v-model="item.status" size="large">
                                <span slot="open">On</span>
                                <span slot="close">Off</span>
                            </i-switch>
                        </FormItem>
                        <!--<FormItem>-->
                        <!--<Button @click="handleRemove(index)">Delete</Button>-->
                        <!--</FormItem>-->
                    </div>
                    <div class="operate">
                        <Button type="primary" class="submit" @click="handleAdd">+ 新增选项</Button>
                        <Button type="primary" class="submit" @click="handleSubmit('formDynamic')">确定</Button>
                    </div>
                </Form>
            </div>
        </Modal>
        <!--编辑字段弹窗-->
        <Modal class="modals fieldModal" :width=700 v-model="fieldShow" :mask-closable="false">
            <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
            <div class="modalCon">
                <p class="modalTitle">编辑字段</p>
                <Form class="fieldForm" ref="formValidate" :model="formValidate" :rules="ruleValidate"
                      :label-width="160">
                    <div class="line">
                        <FormItem label="英文名：" prop="field_name">
                            {{formValidate.field_name}}
                        </FormItem>
                        <FormItem label="字段名称：" prop="display_name">
                            <Input type="text" v-model="formValidate.display_name" style="width: 150px;"
                                   placeholder="请输入字段名称"></Input>
                        </FormItem>
                    </div>
                    <div class="line">
                        <FormItem label="所在表名：" prop="table_name">
                            <Input type="text" v-model="formValidate.table_name" style="width: 150px;"
                                   placeholder="请输入所在表名"></Input>
                        </FormItem>
                        <FormItem label="过滤器是否显示：">
                            <RadioGroup v-model="formValidate.is_filter">
                                <Radio :label=1>是</Radio>
                                <Radio :label=0>否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                    <div class="line">
                        <FormItem label="过滤器类型：">
                            <Select v-model="formValidate.filter_type" style="width:150px">
                                <Option value="date">date</Option>
                                <Option value="select">select</Option>
                                <Option value="multi_select">multi_select</Option>
                                <Option value="list">list</Option>
                                <Option value="multi_list">multi_list</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="过滤器是否默认勾选：">
                            <RadioGroup v-model="formValidate.is_filter_checked">
                                <Radio :label=1>是</Radio>
                                <Radio :label=0>否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                    <div class="line">
                        <FormItem label="过滤器选项请求URL：">
                            <Input type="text" v-model="formValidate.api_url" style="width: 150px;"
                                   placeholder="请输入所在表名"></Input>
                        </FormItem>

                        <FormItem label="表格是否默认勾选：">
                            <RadioGroup v-model="formValidate.is_display_checked">
                                <Radio :label=1>是</Radio>
                                <Radio :label=0>否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                    <div class="line">
                        <FormItem label="数据查询类型：">
                            <Input type="text" v-model="formValidate.query_type" style="width: 150px;"
                                   placeholder="请输入数据查询类型"></Input>
                        </FormItem>
                        <FormItem label="表格是否显示：">
                            <RadioGroup v-model="formValidate.is_display">
                                <Radio :label=1>是</Radio>
                                <Radio :label=0>否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                    <div class="line">
                        <FormItem label="启用状态：">
                            <Input type="text" v-model="formValidate.status" style="width: 150px;"
                                   placeholder="请输入数据查询类型"></Input>
                        </FormItem>
                        <FormItem label="是否允许搜索：">
                            <RadioGroup v-model="formValidate.is_search">
                                <Radio :label=1>是</Radio>
                                <Radio :label=0>否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                    <div class="line">
                        <FormItem label="序号：">
                            <Input type="text" v-model="formValidate.sort" style="width: 150px;"
                                   placeholder="请输入数据查询类型"></Input>
                        </FormItem>
                        <FormItem label="是否允许排序：">
                            <RadioGroup v-model="formValidate.is_sort">
                                <Radio :label=1>是</Radio>
                                <Radio :label=0>否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                    <button type="button" class="submit" @click="fieldEdit('formValidate')">确定</button>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
  import {isMenu} from '@/api/common';

  export default {
    data() {
      return {
        getFields: this.$store.state.api.fieldSetting.getFields, //获取所有字段
        getFieldsGroup: this.$store.state.api.fieldSetting.getFieldsGroup, //获取所有字段组
        editFiledOptions: this.$store.state.api.fieldSetting.editFiledOptions,//编辑字段选项接口
        editFiledApI: this.$store.state.api.fieldSetting.editFiled,//编辑字段接口
        getFieldOptions: this.$store.state.api.fieldSetting.getFieldOptions, // 获取字段选项
        current_group: "",
        fields_group: "",
        fields: [],
        editShow: false,//编辑选项弹窗是否显示
        fieldShow: false,//编辑字段弹窗是否显示
        index: 1,//当前选项index
        //编辑选项
        formDynamic: {
          field_name: "",
          data: []
        },
        //编辑字段
        formValidate: {
          display_name: '',
          field_name: "",
          table_name: "",
          is_filter: "",
          filter_type: "",
          is_filter_checked: '',
          api_url: '',
          is_display_checked: '',
          query_type: '',
          is_display: '',
          status: '',
          is_search: '',
          sort: '',
          is_sort: ''
        },
        ruleValidate: {
          display_name: [
            {required: true, message: '字段名称不能为空', trigger: 'blur'}
          ],
          table_name: [
            {required: true, message: '所在表名不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    mounted() {
      this.$axios.get(this.getFieldsGroup).then(res => {
        if (res.data.data) {
          this.fields_group = res.data.data;
        }
      });
      this.changeTab(1);
    },
    methods: {
      isMenu,
      //切换tab
      changeTab(id) {
        this.$axios.post(this.getFields, [id]).then(res => {
          if (res.data.data) {
            this.fields = res.data.data[id];
          }
        });
      },
      //关闭弹窗
      cancel() {
        this.editShow = false;
        this.fieldShow = false;
      },
      //编辑字段
      fieldEditShow(field) {//点击编辑字段，出现弹窗
        this.fieldShow = true;
        this.formValidate = field;
        console.log(this.formValidate);
      },
      fieldEdit() {//编辑字段，点击确定
        this.$axios.post(this.editFiledApI, this.formValidate).then(res => {
          this.$Message.success('编辑成功！');
          this.fieldShow = false;
        });
      },
      //编辑选项
      editOptions(field_name) {//点击编辑选项，出现弹窗
        this.$axios.post(this.getFieldOptions, {
          field: field_name
        }).then(res => {
          this.formDynamic.data = [];
          this.editShow = true;
          this.formDynamic.field_name = field_name;
          let that = this;
          Object.keys(res.data.data).forEach(function (key) {
            if (field_name === key) {
              res.data.data[key].forEach(function (item, index) {
                that.formDynamic.data.push({
                  value: item.value,
                  key: item.key,
                  sort: item.sort,
                  status: Boolean(item.status),
                });
              });
            }
          });

          if (this.formDynamic.data.length === 0) {
            this.formDynamic.data = [
              {
                value: '',
                key: "",
                sort: '',
                status: true,
              }
            ]
          }
        })
      },
      handleAdd() {//新增选项
        // this.index++;
        this.formDynamic.data.push({
          // index: this.index,
          value: '',
          key: "",
          sort: '',
          status: true,
        });
      },
      handleSubmit(name) {//编辑选项,点击确定
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post(this.editFiledOptions, this.formDynamic).then(res => {
              this.$Message.success('编辑成功！');
              this.editShow = false;
              this.formDynamic = {//恢复初始数据
                field_name: "",
                data: [
                  {
                    value: '',
                    key: "",
                    sort: '',
                    status: true,
                  }
                ]
              };
            });
          } else {
          }
        })
      },
      //清除选项
      handleRemove(index) {
        this.formDynamic.data[index].status = 0;
      }
    }
  }

</script>
