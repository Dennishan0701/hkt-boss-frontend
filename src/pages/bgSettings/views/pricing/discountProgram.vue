<style lang="less" scoped>
@import '../../../../assets/css/vividStandard.less';

.discountModal {
  .ivu-modal-header {
    display: none;
  }
  .discountModalheader {
    font-size: 16px;
    color: @dark-gray-color;
    line-height: 32px;
    margin: 4px 0 20px;
  }
  .modalCon {
      padding: 10px 30px 60px!important;
  }
  .ivu-input {
    background-color: @auxiliary-color4;
    border: none;
    border-radius: 0px;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    text-align: center;
    height: 36px;
  }
  .ivu-modal-wrap {
    .mdBtn {
      margin: 0 auto;
      display: block;
      width: 120px;
      height: 32px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 18px;
    }
    .lines {
      position: relative;
      display: flex;
      .ivu-form-item {
        /*width: 300px;*/
        display: inline-block;
      }
      .blockItem {
        /*width: 650px;*/
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
  }
}

.online {
  .modalCon {
    padding: 14px 0 20px;
  }
  .lineImg {
    display: block;
    margin: 0 auto 14px;
  }
  .discountName {
    color: @error-color;
    font-size: 14px;
    text-align: center;
    margin-bottom: 36px;
  }
  .onlineAction {
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .mdBtn1 {
    width: 90px;
    height: 32px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 18px;
    border: 1px solid @light-gray-hover;
    background-color: #fff;
    color: @dark-gray-color;
  }
  .mdBtn2 {
    width: 90px;
    height: 32px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 18px;
    background-color: @primary-color;
    color: @white-color;
    margin-left: 40px;
  }
}

.main-content {
  .discountProgram {
    .mar20 {
      margin-right: 20px;
    }
    .online {
      color: @success-color;
    }
    .btn1 {
      color: @tips-color;
      font-size: 12px;
      cursor: pointer;
    }
    .btn2 {
      color: @success-color;
      font-size: 12px;
      cursor: pointer;
    }
    .btn3 {
      color: @error-color;
      font-size: 12px;
      cursor: pointer;
    }
    .action {
      button {
        height: 36px;
        min-width: 100px;
        border-radius: 18px;
        text-align: center;
        padding: 0 8px;
        margin-right: 20px;
        margin-bottom: 10px;
        color: @white-color;
        border: none;
        background-color: @primary-color;
        float: right;
        font-size: 14px;
        &:hover {
          background-color: @primary-hover;
        }
      }
      .ivu-btn:focus {
        box-shadow: none;
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
        <BreadcrumbItem to="/pricing/priceStrategy">价格策略</BreadcrumbItem>
        <BreadcrumbItem>优惠方案</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="main-content">
      <Tabs type="card" :animated="false" class="tabs" @on-click="changeTab">
        <TabPane label="优惠方案" name="discountProgram">
          <div class="discountProgram" style="padding-top: 30px">
            <div class="action clearfix">
              <Button @click="addDiscount">+新增方案</Button>
            </div>
            <div class="tableContent">
              <Table
                class="tableData"
                :columns="discountHeaders"
                :data="discountList"
                border
              >
                <template slot-scope="{ row, index }" slot="is_on">
                  <p v-if="row.is_on==0">-</p>
                  <p v-if="row.is_on==1" class="online">已上</p>
                </template>
                <template slot-scope="{ row, index }" slot="date">
                  {{row.start_at}}
                  <span style="margin: 0 5px">～</span>
                  {{row.end_at}}
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <span class="btn1 mar20" @click="editDiscount(row)">修改</span>
                  <span
                    class="btn2"
                    v-if="row.is_on==0"
                    @click="goOnline(row,'goOnline')"
                  >上线</span>
                  <span
                    class="btn3"
                    v-if="row.is_on==1"
                    @click="goOnline(row,'offline')"
                  >下线</span>
                </template>
              </Table>
              <!--分页-->
              <Page
                :total="discountTotal"
                show-sizer
                show-elevator
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
                show-total
              />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <!--新增方案弹窗-->
    <Modal
      class="modals discountModal"
      :width="720"
      v-model="discountModal"
      :mask-closable="false"
    >
      <i
        class="closeModal ivu-icon ivu-icon-ios-close"
        @click="discountModal = false"
      ></i>
      <div class="modalCon">
        <p class="discountModalheader">{{modalName}}</p>
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="110"
        >
          <FormItem label="优惠名称：" prop="name">
            <Input
              v-model="formValidate.name"
              placeholder="请输入优惠名称"
              style="width: 250px"
            />
          </FormItem>
          <div class="lines">
            <FormItem label="优惠时间段：" prop="start_at">
              <!--<DatePicker type="daterange" placement="bottom-end"-->
              <!--placeholder="请选择优惠时间段" style="width: 200px"-->
              <!--@on-change="[formValidate.start_at,formValidate.end_at]=$event"></DatePicker>-->
              <DatePicker
                type="datetimerange"
                v-model="date"
                format="yyyy-MM-dd HH:mm"
                :editable="false"
                placeholder="请选择优惠时间段"
                @on-change="[formValidate.start_at,formValidate.end_at]=$event,datetimerangeChange()"
                style="width: 250px"
              ></DatePicker>
            </FormItem>
            <FormItem label="参与对象：" prop="order_cat">
              <RadioGroup v-model="formValidate.order_cat" style="width: 200px">
                <Radio :label="0">全部</Radio>
                <Radio
                  v-for="(item,index) in options.order_cat"
                  :key="index"
                  :label="parseInt(item.key)"
                >{{item.value}}</Radio>
              </RadioGroup>
            </FormItem>
          </div>
          <FormItem label="参与年级：" prop="grade">
            <Checkbox
              v-model="checkAll"
              @on-change="handleCheckAll(grade,options.grade,fn)"
              style="display: inline-block;"
            >全部</Checkbox>
            <CheckboxGroup
              style="display: inline-block;"
              v-model="grade"
              @on-change="checkAllGroupChange(grade,options.grade,fn)"
            >
              <Checkbox
                v-for="(item,index) in options.grade"
                :key="index"
                :label="parseInt(item.key)"
              >{{item.value}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="购课科目：" prop="subject">
            <Checkbox
              v-model="checkAll2"
              @on-change="handleCheckAll(subject,options.subject,fn2)"
              style="display: inline-block;"
            >全部</Checkbox>
            <CheckboxGroup
              style="display: inline-block;"
              v-model="subject"
              @on-change="checkAllGroupChange(subject,options.subject,fn2)"
            >
              <Checkbox
                v-for="(item,index) in options.subject"
                :key="index"
                :label="parseInt(item.key)"
              >{{item.value}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="课时级别：" prop="class_hour_grade">
            <Checkbox
              v-model="checkAll3"
              @on-change="handleCheckAll(class_hour_grade,options.class_hour_grade,fn3)"
              style="display: inline-block;"
            >全部</Checkbox>
            <CheckboxGroup
              style="display: inline-block;"
              v-model="class_hour_grade"
              @on-change="checkAllGroupChange(class_hour_grade,options.class_hour_grade,fn3)"
            >
              <Checkbox
                v-for="(item,index) in options.class_hour_grade"
                :key="index"
                :label="parseInt(item.key)"
              >{{item.value}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="最低购买：" prop="lowest_class_num">
            <Input
              v-model="formValidate.lowest_class_num"
              placeholder
              style="width: 90px"
            />
            <span style="margin-left: 8px;">课时</span>
          </FormItem>
          <FormItem label="付款条件：" prop="payment_type">
            <RadioGroup
              v-model="formValidate.payment_type"
              style="width: 200px"
            >
              <Radio :label="0">全部</Radio>
              <Radio
                v-for="(item,index) in options.payment_type"
                :key="index"
                :label="parseInt(item.key)"
              >{{item.value}}</Radio>
            </RadioGroup>
          </FormItem>
          <div class="lines">
            <FormItem label="优惠折扣：" prop="discount_percentage">
              <Input
                v-model="formValidate.discount_percentage"
                placeholder="0-1之间的数字"
                style="width: 95px"
              />
            </FormItem>
            <FormItem label="优惠金额：" prop="reduce_price">
              <span style="margin-right: 8px;">¥</span>
              <Input
                v-model="formValidate.reduce_price"
                placeholder
                style="width: 95px"
              />
            </FormItem>
            <FormItem label="赠送课时：" prop="give_class">
              <Input
                v-model="formValidate.give_class"
                placeholder
                style="width: 95px"
              />
              <span style="margin-left: 8px;">h</span>
            </FormItem>
          </div>
          <FormItem label="叠加优惠：" v-if="discountModalType=='addDiscount'">
            <Select
              v-model="formValidate.relevance_discount"
              multiple
              placeholder="请选择叠加优惠"
              style="width:160px"
              transfer
            >
              <Option
                v-for="(item,index) in relevanceDiscountList"
                :value="parseInt(item.id)"
                :key="index"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <!--如果是修改，去掉自己当前的优惠名称-->
          <FormItem label="叠加优惠：" v-else-if="discountModalType=='editDiscount'">
            <Select
              v-model="formValidate.relevance_discount"
              multiple
              placeholder="请选择叠加优惠"
              style="width:160px"
              transfer
            >
              <Option
                v-for="(item,index) in relevanceDiscountList"
                v-if="discountId!=item.id"
                :value="parseInt(item.id)"
                :key="index"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
        </Form>
        <Button
          type="info"
          v-if="discountModalType=='addDiscount'"
          class="mdBtn"
          @click="handleSubmit('formValidate')"
        >确定新增</Button>
        <Button
          type="info"
          v-else-if="discountModalType=='editDiscount'"
          class="mdBtn"
          @click="editDiscountSubmit('formValidate')"
        >确定修改</Button>
      </div>
    </Modal>
    <!--上线弹窗-->
    <Modal
      class="modals online"
      :width="300"
      v-model="onlineModal"
      :mask-closable="false"
    >
      <div class="modalCon">
        <img
          class="lineImg"
          v-if="modalType=='goOnline'"
          src="../../../../assets/image/online1.png"
          alt="上线"
        >
        <img
          class="lineImg"
          v-else-if="modalType=='offline'"
          src="../../../../assets/image/online2.png"
          alt="下线"
        >
        <p class="discountName">“{{discountName}}”</p>
        <div class="onlineAction">
          <Button type="info" class="mdBtn1" @click="onlineModal=false">取消操作</Button>
          <Button
            type="info"
            v-if="modalType=='goOnline'"
            class="mdBtn2"
            @click="goOnline2"
          >确定上线</Button>
          <Button
            type="info"
            v-else-if="modalType=='offline'"
            class="mdBtn2"
            @click="goOnline2"
          >确定下线</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { isMenu } from '@/api/common'
import RULE from '@/api/infoRule'

export default {
  data() {
    return {
      getFieldOptionsAPI: this.$store.state.api.data_query.getFieldOptions,
      addDiscountAPI: this.$store.state.discount,
      onOffDiscountAPI: this.$store.state.onOffDiscount,
      getStackable: this.$store.state.getStackable,
      editDiscountAPI: this.$store.state.editDiscount,
      discountHeaders: [
        {
          title: '状态',
          slot: 'is_on',
          width: 120
        },
        {
          title: '优惠名称',
          key: 'name',
          width: 150
        },
        {
          title: '优惠时间段',
          slot: 'date',
          width: 330
        },
        {
          title: '参与对象',
          key: 'order_cat_format',
          width: 150
        },
        {
          title: '参与年级',
          key: 'grade_format',
          width: 150
        },
        {
          title: '购课科目',
          key: 'subject_format',
          width: 150
        },
        {
          title: '课时级别',
          key: 'class_hour_grade_format',
          width: 150
        },
        {
          title: '最低购买课时',
          key: 'lowest_class_num',
          width: 150
        },
        {
          title: '付款条件',
          key: 'payment_type_format',
          width: 150
        },
        {
          title: '优惠折扣',
          key: 'discount_percentage',
          width: 150
        },
        {
          title: '优惠金额',
          key: 'reduce_price',
          width: 150
        },
        {
          title: '赠送课时',
          key: 'give_class',
          width: 150
        },
        {
          title: '叠加优惠',
          key: 'discount_relevances_format',
          width: 150
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          fixed: 'right'
        }
      ],
      discountList: [],
      discountTotal: 0,
      //弹窗
      discountModal: false,
      modalName: '',
      discountModalType: '',
      formValidate: {
        name: '',
        start_at: '',
        end_at: '',
        order_cat: '',
        grade: '',
        subject: '',
        class_hour_grade: '',
        lowest_class_num: '',
        payment_type: '',
        discount_percentage: '',
        reduce_price: '',
        give_class: '',
        relevance_discount: []
      },
      relevanceDiscountList: [], //叠加优惠列表
      ruleValidate: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        start_at: [
          { required: true, message: '请选择优惠时间段', trigger: 'change' }
        ],
        order_cat: [
          {
            type: 'number',
            required: true,
            message: '请选择参与对象',
            trigger: 'change'
          }
        ],
        grade: [
          {
            type: 'array',
            required: true,
            message: '请选择参与年级',
            trigger: 'change'
          }
        ],
        subject: [
          {
            type: 'array',
            required: true,
            message: '请选择购课科目',
            trigger: 'change'
          }
        ],
        class_hour_grade: [
          {
            type: 'array',
            required: true,
            message: '请选择课时级别',
            trigger: 'change'
          }
        ],
        lowest_class_num: [
          {
            required: true,
            validator: RULE().lowest_class_num,
            trigger: 'blur'
          }
        ],
        payment_type: [
          {
            type: 'number',
            required: true,
            message: '请选择付款条件',
            trigger: 'change'
          }
        ],
        discount_percentage: [
          { validator: RULE().validateNumber10, trigger: 'blur' }
        ],
        reduce_price: [{ validator: RULE().validateNumber, trigger: 'blur' }],
        give_class: [{ validator: RULE().validateNumber, trigger: 'blur' }]
      },
      date: [],
      options: '',
      grade: [],
      subject: [],
      class_hour_grade: [],
      checkAll: false,
      checkAll2: false,
      checkAll3: false,
      page: 1,
      size: 10,
      //上下线弹窗
      onlineModal: false,
      discountName: '',
      discountId: '',
      modalType: '' //弹窗类型是上线还是下线
    }
  },
  mounted() {
    this.getDiscountList()
    this.getAllOptions()
  },
  methods: {
    isMenu,
    //切换tab
    changeTab(name) {
      if ((name = 'discountProgram')) {
        //优惠方案
      }
    },
    getDiscountList() {
      //获取优惠活动列表
      this.$axios
        .get(this.addDiscountAPI, {
          params: {
            page: this.page,
            size: this.size
          }
        })
        .then(res => {
          this.discountList = res.data.data.data
          this.discountTotal = res.data.data.total
        })
    },
    //页码改变
    pageChange(page) {
      this.page = page
      this.getDiscountList()
    },
    //页码size改变
    pageSizeChange(pageSize) {
      this.size = pageSize
      this.getDiscountList()
    },

    goOnline(row, modalType) {
      //点击上线/下线出现弹窗
      this.onlineModal = true
      this.discountName = row.name
      this.discountId = row.id
      this.modalType = modalType
    },
    goOnline2() {
      //确定上线/下线
      this.$axios
        .post(
          this.onOffDiscountAPI,
          {
            discount_id: this.discountId
          },
          {
            loading: false
          }
        )
        .then(res => {
          if (res.data.status == 'success') {
            this.$Notice.success({
              title: '',
              desc: '操作成功',
              duration: 4
            })
            this.onlineModal = false
            this.getDiscountList()
          } else {
            this.$Notice.error({
              title: '',
              desc: '操作失败',
              duration: 4
            })
          }
        })
    },
    addDiscount() {
      //点击新增优惠活动,出现弹窗
      this.discountModal = true
      this.modalName = '新增优惠方案'
      this.discountModalType = 'addDiscount'
      this.getAllOptions()
      //恢复初始状态
      this.$refs['formValidate'].resetFields()
      this.grade = []
      this.subject = []
      this.class_hour_grade = []
      this.date = []
      this.formValidate.relevance_discount = []
      this.relevanceDiscountList = []
      this.checkAll = false
      this.checkAll2 = false
      this.checkAll3 = false
    },
    handleSubmit(name) {
      //提交优惠方案
      this.$refs[name].validate(valid => {
        if (valid) {
          // if (this.options.grade.length == this.grade.length) {
          //   this.grade = [0]
          // }
          // if (this.options.subject.length == this.subject.length) {
          //   this.subject = [0]
          // }
          // if (
          //   this.options.class_hour_grade.length == this.class_hour_grade.length
          // ) {
          //   this.class_hour_grade = [0]
          // }
          this.formValidate.grade = this.grade
          this.formValidate.subject = this.subject
          this.formValidate.class_hour_grade = this.class_hour_grade
          this.$axios.post(this.addDiscountAPI, this.formValidate).then(res => {
            if (res.data.status == 'success') {
              this.$Notice.success({
                title: '',
                desc: '新增成功',
                duration: 4
              })
              this.discountModal = false
              this.getDiscountList()
            } else {
              this.$Notice.error({
                title: '',
                desc: '新增失败',
                duration: 4
              })
            }
          })
        }
      })
    },
    handleCheckAll(data, option, fn) {
      //全选
      let length = option.length
      let choose = data.length
      if (choose === length) {
        fn(false, [])
      } else {
        data = []
        option.forEach((item, index) => {
          data.push(parseInt(item.key))
        })
        fn(true, data)
      }
    },
    checkAllGroupChange(data, option, fn) {
      //单选
      // console.log('66', data)
      let length = option.length
      if (data.length === length) {
        fn(true, data)
      } else {
        fn(false, data)
      }
    },
    fn(checkAll, data) {
      this.checkAll = checkAll
      this.grade = data
      this.formValidate.grade = this.grade
    },
    fn2(checkAll, data) {
      this.checkAll2 = checkAll
      this.subject = data
      this.formValidate.subject = this.subject
    },
    fn3(checkAll, data) {
      this.checkAll3 = checkAll
      this.class_hour_grade = data
      this.formValidate.class_hour_grade = this.class_hour_grade
    },
    // handleCheckAll () {//全选
    //   let length=this.options.grade.length;
    //   let choose=this.grade.length;
    //   if (choose === length) {
    //     this.checkAll = false;
    //     this.grade=[];
    //   } else {
    //     this.checkAll = true;
    //     this.grade=[];
    //     this.options.grade.forEach((item, index) =>{
    //       this.grade.push(parseInt(item.key));
    //     });
    //   }
    // },
    // checkAllGroupChange (data) {//单选
    //   console.log(data);
    //   let length=this.options.grade.length;
    //   if (data.length === length) {
    //     this.checkAll = true;
    //   } else {
    //     this.checkAll = false;
    //   }
    // },
    datetimerangeChange(row) {
      //获取可叠加的折扣包
      this.$axios
        .get(this.getStackable, {
          params: {
            start_at: this.formValidate.start_at,
            end_at: this.formValidate.end_at
          }
        })
        .then(res => {
          this.relevanceDiscountList = [] //先清空
          this.relevanceDiscountList = res.data.data
          if (row) {
            //如果是修改，将叠加优惠选中的值赋值上
            this.formValidate.relevance_discount = [] //先清空
            this.formValidate.relevance_discount = row.discount_relevances
          }
        })
    },
    getAllOptions() {
      // 获取所有选项
      this.$axios
        .post(this.getFieldOptionsAPI, {
          field: [
            'grade',
            'subject',
            'class_hour_grade',
            'order_cat',
            'payment_type'
          ]
        })
        .then(res => {
          this.options = res.data.data
        })
    },
    editDiscount(row) {
      //点击修改优惠方案
      console.log(row)
      this.discountModal = true
      this.modalName = '修改优惠方案'
      this.discountModalType = 'editDiscount'
      this.discountId = row.id
      // this.getAllOptions();
      //赋值已有的值
      this.formValidate.name = row.name
      this.formValidate.start_at = row.start_at
      this.formValidate.end_at = row.end_at
      this.date = [row.start_at, row.end_at]
      this.formValidate.relevance_discount = [] //先清空
      this.datetimerangeChange(row)
      // setTimeout(()=>{
      //   this.formValidate.relevance_discount = row.discount_relevances;
      // },100);
      this.formValidate.order_cat = row.order_cat
      //如果是全选
      if (row.grade == '0') {
        this.checkAll = true
        this.grade = []
        this.options.grade.forEach((item, index) => {
          this.grade.push(parseInt(item.key))
        })
      } else {
        this.checkAll = false
        this.grade = row.grade.split(',').map(Number)
      }
      if (row.subject == '0') {
        this.checkAll2 = true
        this.subject = []
        this.options.subject.forEach((item, index) => {
          this.subject.push(parseInt(item.key))
        })
      } else {
        this.checkAll2 = false
        this.subject = row.subject.split(',').map(Number)
      }
      if (row.class_hour_grade == '0') {
        this.checkAll3 = true
        this.class_hour_grade = []
        this.options.class_hour_grade.forEach((item, index) => {
          this.class_hour_grade.push(parseInt(item.key))
        })
      } else {
        this.checkAll3 = false
        this.class_hour_grade = row.class_hour_grade.split(',').map(Number)
      }
      this.formValidate.grade = this.grade
      this.formValidate.subject = this.subject
      this.formValidate.class_hour_grade = this.class_hour_grade
      this.formValidate.lowest_class_num = row.lowest_class_num
      this.formValidate.payment_type = row.payment_type
      this.formValidate.discount_percentage = row.discount_percentage
      if (row.reduce_price == 0) {
        this.formValidate.reduce_price = ''
      } else {
        this.formValidate.reduce_price = row.reduce_price
      }
      if (row.give_class == 0) {
        this.formValidate.give_class = ''
      } else {
        this.formValidate.give_class = row.give_class
      }
    },
    editDiscountSubmit(name) {
      //确定修改优惠方案
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.options.grade.length == this.grade.length) {
            this.grade = [0]
          }
          if (this.options.subject.length == this.subject.length) {
            this.subject = [0]
          }
          if (
            this.options.class_hour_grade.length == this.class_hour_grade.length
          ) {
            this.class_hour_grade = [0]
          }
          this.formValidate.grade = this.grade
          this.formValidate.subject = this.subject
          this.formValidate.class_hour_grade = this.class_hour_grade
          //两个数组取交集//叠加优惠可能含有已下线要过滤掉
          let arr1 = this.formValidate.relevance_discount //已选择的叠加优惠列表
          let arr2 = [] //所有叠加优惠列表
          this.relevanceDiscountList.forEach(function(item, index) {
            arr2.push(item.id)
          })
          console.log(arr1)
          console.log(arr2)
          arr1.forEach(function(item, index) {
            if (!arr2.includes(item)) {
              //如果所有叠加优惠列表不存在已选择的叠加优惠（就是已下线的）
              arr1.splice(index, 1)
            }
          })
          this.formValidate.relevance_discount = arr1

          let api = this.editDiscountAPI + this.discountId
          this.$axios.put(api, this.formValidate).then(res => {
            if (res.data.status == 'success') {
              this.$Notice.success({
                title: '',
                desc: '修改成功',
                duration: 4
              })
              this.discountModal = false
              this.getDiscountList()
            } else {
              this.$Notice.error({
                title: '',
                desc: '修改失败',
                duration: 4
              })
            }
          })
        }
      })
    }
  }
}
</script>
