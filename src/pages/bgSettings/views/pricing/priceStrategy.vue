<style lang="less" scoped>
  @import "../../../../assets/css/standard.less";

  .setting {
    .main-content {
      .frame {
        .frame-header {
          margin-left: 95px;
          .item {
            width: 100px;
            margin-right: 20px;
            text-align: center;
          }
        }

        .label-title {
          padding: 0 20px;
          line-height: 34px;
        }
        .input-body {
          margin-left: 26px;
        }
        .frame-header-vertical {
          .item {
            height: 32px;
            margin-bottom: 20px;
          }
        }
      }
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
  <div class="setting">
    <!--面包屑-->
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/pricing/priceStrategy">定价策略</BreadcrumbItem>
        <BreadcrumbItem>基本定价</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="main-content">
      <Tabs type="card" :animated="false" class="tabs" @on-click="changeTab">
        <TabPane label="基本价格制定" class="pt-20">
          <div class="frame">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" inline>
              <ul class="list-inline f">
                <li class="label-title">
                  <p>课时等级</p>
                </li>
                <li>
                  <FormItem prop="user">
                    <Select v-model="price_type" style="width:200px">
                        <Option v-for="item in priceTypeSelect" :value="item.key" :key="item.id + item.value ">{{ item.value}}</Option>
                    </Select>
                  </FormItem>
                </li>
                <li>
                  <FormItem>
                    <Button type="info" @click="handleSubmit('formValidate')">保存</Button>
                  </FormItem>
                </li>
              </ul>
              <ul class="list-inline f">
                <li class="label-title">
                  <p>基准课时单价</p>
                </li>
                <li>
                  <FormItem prop="user">
                    <Input type="text" v-model="formValidate.absolute_standard_unit_price" placeholder="基准课时单价"
                           @on-change="priceChanged"></Input>
                  </FormItem>
                </li>
                <li>
                  <FormItem>
                    <Button type="info" @click="handleSubmit('formValidate')">保存</Button>
                  </FormItem>
                </li>
              </ul>

              <ul class="list-inline f">
                <li class="label-title">
                  <p>价格应用年份</p>
                </li>
                <li>
                  <FormItem prop="user">
                    <RadioGroup v-model="price_apply_year" @on-change	= "onYearChange">
                      <Radio :label="2019"></Radio>
                      <Radio :label="2020"></Radio>
                      <Radio :label="2021"></Radio>
                    </RadioGroup>
                  </FormItem>
                </li>
              </ul>

            </Form>
          </div>
          <div class="frame pd-20">
            <ul class="list-inline frame-header">
              <li v-for="(item,index) in options.subject" :key="index" class="item">
                <span>{{item.value}}</span>

                <Input v-model="item.subject_ratio" placeholder="subject_ratio"
                       @on-change="subjectRatioChanged(item.subject_ratio,index)" style="width: 40px;margin-left:5px;"/>
              </li>
            </ul>
            <ul class="list-inline">
              <li class="frame-header-vertical">
                <ul>
                  <li v-for="(item,index) in options.grade" :key="index" class="item">{{item.value}}

                    <Input v-model="item.grade_ratio" placeholder="grade_ratio" @on-change="gradeRatioChanged(item)"
                           style="width: 40px;margin-left:5px;"/>
                  </li>
                </ul>
              </li>
              <li class="input-body">
                <ul v-for="(item_1,index_1) in options.grade" class="list-inline mt-20">
                  <li v-for="(item_2,index_2) in item_1.subject" class="mr-20">

                    <Input v-model="item_2.data.caculated_price"
                           placeholder="请输入价格" style="width: 100px"/>
                  </li>
                </ul>
              </li>
            </ul>

            <Button type="primary" @click="handleSubmit('formValidate')" class="mt-20">生成价格方案</Button>
          </div>
        </TabPane>
        <TabPane label="价格明细"></TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import {isMenu} from '@/api/common';
  export default {
    data () {
      return {
        priceTypeSelect: [],
        price_type: '',
        subject_ratio: '',
        grade_ratio: '',
        api: {
          getFieldOptionsAPI: this.$store.state.api.data_query.getFieldOptions,
        },
        options: '',
        price_apply_year: 2019,
        formValidate: {
          absolute_standard_unit_price: '',
        },
        ruleValidate: {
          absolute_standard_unit_price: [{
            required: true,
            message: '必填项',
            trigger: 'blur'
          }]
        },
        pricing_schema: {}
      }
    },
    mounted () {
      this.pricing_schema.price_year = this.price_apply_year;

      this.getAllOptions ();
      this.$axios.post (this.$store.state.api.sysConfig.getConfigs, ['absolute_standard_unit_price']).then (res => {

        if (!(res.data.data instanceof Array)) {
          this.formValidate = res.data.data;

        }

      });
      setTimeout (() => {
        this.priceChanged ();
        this.pricing_schema.data = this.options.grade;
      }, 500)

    },
    methods: {
      isMenu,
      getAllOptions () { // 获取所有选项
        let app = this
        this.$axios.post (this.api.getFieldOptionsAPI, {
          "field": ['grade', 'subject', 'class_hour_grade']
        }).then (res => {
          //console.log(res.data.data); return;
          let option_data = res.data.data;

          option_data.subject.forEach ((item, index) => {
            item.subject_ratio = 1;
          });
          option_data.grade.forEach ((item, index) => {
            item.grade_ratio = 1;
            item.subject = JSON.parse (JSON.stringify (option_data.subject));
            item.subject.forEach ((_item, _index) => {
              _item.data = {
                absolute_standard_unit_price: '',
                caculated_price: '',
                price_apply_year: '',
                grade: '',
                grade_format: '',
                subject: '',
                subject_format: '',
                grade_ratio: '',
                subject_ratio: '',
              }
            });
          });
          this.priceTypeSelect = option_data.class_hour_grade
          this.options = option_data;
          console.log (this.options);
        })
      },
      // 输入基准价格
      priceChanged () {
        this.options.grade.forEach ((grade, key) => {
          grade.subject.forEach ((subject, _key) => {
            subject.data.caculated_price = subject.subject_ratio * grade.grade_ratio * this.formValidate.absolute_standard_unit_price;
          });
        });
        this.pricing_schema.standard_price = this.formValidate.absolute_standard_unit_price
      },
      subjectRatioChanged (value, index) {
        let app = this;
        //console.log(value,index);
        this.options.grade.forEach ((item, key) => {
          item.subject[index]['subject_ratio'] = value;
          item.subject[index].data = {
            absolute_standard_unit_price: this.formValidate.absolute_standard_unit_price,
            caculated_price: item.grade_ratio * value * this.formValidate.absolute_standard_unit_price,
            price_apply_year: this.price_apply_year,
            grade: item.key,
            grade_format: item.value,
            subject: item.subject[index].key,
            subject_format: item.subject[index].value,
            grade_ratio: item.grade_ratio,
            subject_ratio: item.subject[index].subject_ratio,
          }
          app.$set (app.options.grade, index, app.options.grade[index])
        })

        this.pricing_schema.data = this.options.grade;
      },
      gradeRatioChanged (item) {
        let app = this
        console.log (item, 90909);
        item.subject.forEach ((_item, _key) => {
          _item.data = {
            absolute_standard_unit_price: this.formValidate.absolute_standard_unit_price,
            caculated_price: _item.subject_ratio * item.grade_ratio * this.formValidate.absolute_standard_unit_price,
            price_apply_year: this.price_apply_year,
            grade: item.key,
            grade_format: item.value,
            subject: _item.key,
            subject_format: _item.value,
            grade_ratio: item.grade_ratio,
            subject_ratio: _item.subject_ratio,
          }
        });
        this.pricing_schema.data = this.options.grade;
      },
      onYearChange(){
        this.pricing_schema.price_year = this.price_apply_year;

      },
      //切换tab
      changeTab (index) {

      },
      handleSubmit (name) {//提交保存

        this.$refs[name].validate ((valid) => {
          if (valid) {
            this.$axios.post (this.$store.state.api.price.generatePriceSchema, {
              price_type: this.price_type,
              ...this.pricing_schema}).then (res => {
              this.$Message.success (res.data.message);
            });
          } else {
            this.$Message.error ('保存失败!');
          }
        })
      }
    }
  }

</script>
