<template lang="html">
    <div class="place_order">
        <!--提交订单弹窗-->
        <Modal class="modals placeOrderModal" :width="modalWidth" v-model="modal"
               :mask-closable="false">
            <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
            <div class="modalCon">
                <div class="left">
                    <p class="modalTitle">* 提交订单 *</p>
                    <p class="orderAmount" v-if="calculatedAmount.actual_amount&&calculatedAmount.actual_amount>0">
                        <span>订单金额 <i>¥{{calculatedAmount.actual_amount.toFixed(2)}}</i></span>
                        <span>折后单价 <i>¥{{calculatedAmount.actual_price.toFixed(2)}}</i></span>
                        <span>总课时数 <i>{{calculatedAmount.total_class_hour}}</i></span>
                    </p>
                    <Form ref="orderForm" :model="orderForm" :rules="orderRule" :label-width="100"
                          label-position="left">
                        <ul class="list-inline">
                            <li>
                                <FormItem label="姓名：" :label-width="60">{{current_lead.basic_info_name}}</FormItem>
                            </li>
                            <li style="margin-left:40px;">
                                <FormItem label="手机：" :label-width="60">{{current_lead.basic_info_mobile}}</FormItem>
                            </li>
                            <li style="margin-left:40px;">
                                <FormItem label="ID：" :label-width="60">{{orderForm.main_id}}</FormItem>
                            </li>

                        </ul>
                        <!-- <ul class="list-inline">
                            <li>
                                <FormItem label="法定监护人：" prop="guardian">

                                    <Input style="width:120px" v-model="orderForm.guardian"
                                           placeholder="请输入监护人姓名"/>
                                </FormItem>
                            </li>
                            <li>
                                <FormItem label="联系方式" :label-width="90" class="ml-20" prop="guardian_mobile">

                                    <Input style="width:150px" v-model="orderForm.guardian_mobile"
                                           placeholder="请输入联系方式"/>
                                </FormItem>
                            </li>
                            <li>
                                <FormItem label="家庭住址：" prop="address">

                                    <Input style="width:390px" v-model="orderForm.address"
                                           placeholder="请输入家庭住址"/>
                                </FormItem>
                            </li>
                        </ul> -->

                        <Divider orientation="right">产品信息</Divider>
                        <div class="line2">
                            <FormItem label="购课年级：" prop="grade">
                                <Select style="width: 100px;" v-model="orderForm.grade" placeholder="请选择"
                                        @on-change="getProduct">
                                    <Option v-for="(item,index) in options.grade" :key=index
                                            :value="parseInt(item.key)">
                                        {{item.value}}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="购课科目：" prop="subject">
                                <Select style="width: 120px;" v-model="orderForm.subject" placeholder="请选择"
                                        @on-change="getProduct">
                                    <Option v-for="(item,index) in options.subject" :key=index
                                            :value="parseInt(item.key)">
                                        {{item.value}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </div>
                        <div class="line2">
                            <FormItem label="课时等级：" prop="class_hour_grade">
                                <Select style="width: 100px;" v-model="orderForm.class_hour_grade" placeholder="请选择"
                                        @on-change="getProduct">
                                    <Option v-for="(item,index) in options.class_hour_grade" :key=index
                                            :value="item.key">
                                        {{item.value}}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="课时包：" prop="standard_class_hour">
                                <Input style="width:120px" v-model="orderForm.standard_class_hour"
                                  placeholder="请输入课时包"/>
                            </FormItem>

                        </div>

                        <!-- <div class="line2">
                            <FormItem label="赠送项目：">
                                <Select style="width: 100px;" v-model="orderForm.gift"
                                        @on-change="getProduct('discount','0')"
                                        placeholder="请选择" clearable>
                                    <Option v-for="(item,index) in options.gift" :key=index
                                            :value="parseInt(item.key)">
                                        {{item.value}}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="赠送项目金额：">
                                <Input style="width:120px" v-model="orderForm.gift_amount"
                                       placeholder="请输入赠送项目金额"/>
                            </FormItem>
                        </div> -->

                        <Divider orientation="right">优惠信息</Divider>

                        <div class="line3">
                            <FormItem label="优惠活动：">
                                <Select style="width: 120px;" v-model="discount" @on-change="getProduct('discount','0')"
                                        placeholder="请选择" clearable>
                                    <Option v-for="(item,index) in discountList" :key="index"
                                            :value="parseInt(item.id)">{{item.name}}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem v-for="(item,index) in superDiscount" :key="index" label="叠加优惠：">
                                <Select style="width: 120px;" v-model="item.discount" placeholder="请选择"
                                        @on-change="getProduct('discount')">
                                    <Option v-for="(item2,index2) in item.discountList" :key="index2"
                                            :value="parseInt(item2.id)">
                                        {{item2.name}}
                                    </Option>
                                </Select>
                                <Icon type="md-close" color="red" class="ml-10"
                                      style="position: absolute;right: -2px;top: -1px;"
                                      @click="remove(index,superDiscount)"/>
                            </FormItem>
                            <p class="addDiscount" v-if="discountList2.length>0 && discount!=''" @click="addDiscount">
                                +添加优惠</p>
                        </div>

                        <div class="line3">
                            <!-- <FormItem label="优惠券：">
                                <Select style="width: 120px;" v-model="orderForm.discount_coupon"
                                        @on-change="getProduct" placeholder="请选择">
                                    <Option value="1小时">暂无，需求需要和市场部确定</Option>
                                </Select>
                            </FormItem> -->
                            <FormItem label="赠送课时：" prop="giveaway_class_hour">
                                <Input style="width:120px" v-model="orderForm.giveaway_class_hour" placeholder="请输入赠送课时"/>
                            </FormItem>
                        </div>
                        <Divider orientation="right">支付信息</Divider>
                        <div class="line5">
                            <ul>
                                <li>
                                    <FormItem label="支付类型：" prop="payment_type">
                                        <RadioGroup v-model="orderForm.payment_type" style="width: 280px;"
                                                    @on-change="getProduct">
                                            <Radio :label="parseInt(item.key)"
                                                   v-for="(item,index) in options.payment_type"
                                                   :key=index>
                                                {{item.value}}
                                            </Radio>
                                            <!-- <Radio :label="1">全款</Radio>
                                            <Radio :label="2">分期</Radio> -->
                                        </RadioGroup>
                                    </FormItem>
                                </li>
                                <li>
                                    <FormItem label="订金金额："
                                              :rules="{required: true, message: '金额不能为空', trigger: 'change'}"
                                              :label-width="100" class="ml-20" prop="subscription"
                                              v-if="orderForm.payment_type ==3">
                                        <Input style="width:150px" v-model="orderForm.subscription"
                                               placeholder="请输入金额"/>
                                    </FormItem>
                                </li>
                                <!-- <li>
                                    <FormItem label="订单提交来源" prop="order_channel">
                                        <Select style="width: 90px;" v-model="orderForm.order_channel"
                                                placeholder="请选择">
                                            <Option v-for="(item,index) in options.order_channel" :key=index
                                                    :value="item.key">
                                                {{item.value}}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                </li> -->
                            </ul>


                        </div>
                        <!--<div class="line4">-->
                        <!--<template v-for="(item,index) in orderForm.payment_data">-->
                        <!--<FormItem label="付款方式：" :prop="'payment_data.' + index + '.transaction_type'"-->
                        <!--:rules="{required: true, message: '付款方式不能为空', trigger: 'change'}">-->
                        <!--<Select style="width: 120px;" v-model="item.transaction_type" placeholder="请选择付款方式">-->
                        <!--<Option v-for="(item,index) in options.transaction_type" :key=index-->
                        <!--:value=item.key>-->
                        <!--{{item.value}}-->
                        <!--</Option>-->
                        <!--</Select>-->
                        <!--</FormItem>-->
                        <!--<FormItem label="金额：" :prop="'payment_data.' + index + '.amount'"-->
                        <!--:rules="{required: true, message: '金额不能为空', trigger: 'change'}"-->
                        <!--:label-width="60" class="ml-20">-->
                        <!--<Input style="width:150px" v-model="item.amount" placeholder="请输入金额"/>-->
                        <!--</FormItem>-->
                        <!--<Icon type="md-close" color="red" class="ml-10 pt-10"-->
                        <!--@click="remove(index,orderForm.payment_data)" v-if="index !=createOrder0"/>-->
                        <!--</template>-->
                        <!--<p class="addDiscount" @click="addPay">+新增方式</p>-->
                        <!--</div>-->
                        <FormItem label="付款备注：">
                            <Input v-model="orderForm.remark" type="textarea" :autosize="{minRows: 2,maxRows: 6}"
                                   style="width: 330px" placeholder="请填写付款备注"></Input>
                        </FormItem>
                        <p class="btnWrap">
                            <button type="button" class="submit" @click="createOrder('orderForm')">确定下单</button>
                        </p>
                    </Form>
                </div>
                <div class="right">
                    <p class="filesShow">
                         <span @click="fileShow" v-if="modalWidth==620&&calculatedAmount.actual_amount>0">
                 价格明细<i class="iconfont icon-yuanjiaojuxingkaobei1"></i>
             </span>
                        <span @click="fileShow" v-else-if="modalWidth==820">
                 收起<i class="iconfont icon-yuanjiaojuxingkaobei"></i>
             </span>
                    </p>
                    <div class="priceDetails" v-if="modalWidth==820">
                        <div class="priceHead">
                            <p class="priceTitle">{{grade}}/{{subject}}-{{classHourGrade}}</p>
                            <p class="priceTip">¥{{calculatedAmount.standard_price}}/课时 *
                                {{orderForm.standard_class_hour}} =
                                ¥{{calculatedAmount.standard_amount}}
                            </p>
                        </div>
                        <ul class="priceBody">
                            <li v-for="(item,index) in discount_details" v-if="discount_details.length>0">
                                <div class="activity">
                                    <p><span class="name">*</span>{{item.name}} </p>
                                    <p>- ¥{{item.discount_price}}</p>
                                </div>
                                <p>
                                    <span v-if="item.reduce_price">优惠金额： ¥{{item.reduce_price.discount_price}}</span>
                                    <span v-if="item.discount_percentage.value">优惠折扣： {{item.discount_percentage.value}}</span>
                                    <span v-if="item.giveaway_class_hour">赠送课时：{{item.giveaway_class_hour}}h</span>
                                </p>
                            </li>
                            <li style="margin-top: 20px">
                                <!-- <div class="activity">
                                    <p class="coupon">优惠券</p>
                                    <p>- ¥100</p>
                                </div> -->
                                <div class="activity">
                                    <p class="coupon">赠送课时</p>
                                    <p v-if="orderForm.giveaway_class_hour==''">+0课时</p>
                                    <p v-else>+{{orderForm.giveaway_class_hour}}课时</p>
                                    <!--<p>{{calculatedAmount.giveaway_class_hour}}h</p>-->
                                </div>
                            </li>
                        </ul>
                        <ul class="priceBody2">
                            <li>
                                <p>总赠课时</p>
                                <p>{{calculatedAmount.giveaway_class_hour}}课时</p>
                            </li>
                            <li>
                                <p>折扣总额</p>
                                <p>- ¥{{calculatedAmount.discount_amount.toFixed(2)}}</p><!-- 四舍五入保留两位小数-->
                            </li>
                            <li>
                                <p>订单金额</p>
                                <p>{{calculatedAmount.actual_amount.toFixed(2)}}</p>
                            </li>
                            <li class="fracture">
                                <p><span>折后单价</span> ¥{{calculatedAmount.actual_price.toFixed(2)}}</p>
                                <!--<p style="text-align: right;">折扣比例 {{Math.round(calculatedAmount.actual_price/calculatedAmount.standard_amount*10000)/100}}%</p>-->
                                <p><span>总课时数</span> {{calculatedAmount.total_class_hour}}
                                </p>
                            </li>
                            <!--<li class="fracture">-->
                            <!--<p>总课时数 {{calculatedAmount.total_class_hour}}-->
                            <!--( {{orderForm.standard_class_hour}} +-->
                            <!--<span v-if="calculatedAmount.giveaway_class_hour>0">{{calculatedAmount.giveaway_class_hour}}</span>-->
                            <!--<span v-else>0</span>-->
                            <!--)-->
                            <!--</p>-->
                            <!--</li>-->
                        </ul>
                        <div class="priceFoot">
                            <p class="closingDate"><i class="iconfont icon-info"></i>课时截止日期</p>
                            <ul>
                                <li>
                                    <p>计费课时：40</p>
                                    <p>2019-12-31</p>
                                </li>
                                <li>
                                    <p>赠送课时：10</p>
                                    <p>2018-12-31</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import RULE from '@/api/infoRule'
import { setTimeout } from 'timers'

export default {
  mounted() {},
  computed: {
    grade() {
      for (let i in this.options.grade) {
        if (this.options.grade[i].key == this.orderForm.grade) {
          return this.options.grade[i].value
        }
      }
    },
    subject() {
      for (let i in this.options.subject) {
        if (this.options.subject[i].key == this.orderForm.subject) {
          return this.options.subject[i].value
        }
      }
    },
    classHourGrade() {
      for (let i in this.options.class_hour_grade) {
        if (
          this.options.class_hour_grade[i].key ==
          this.orderForm.class_hour_grade
        ) {
          return this.options.class_hour_grade[i].value
        }
      }
    }
  },
  data() {
    return {
      api: {
        getFieldOptionsAPI: this.$store.state.api.data_query.getFieldOptions, //获取选项值
        getCalculatePriceAPI: this.$store.state.api.order.getCalculatePrice, //预查产品价格
        createOrdersAPI: this.$store.state.api.order.createOrders //提交订单api
      },
      getFieldOptionsAPI: this.$store.state.getFieldOptions, //获取select选项api
      getProductAPI: this.$store.state.getProduct, //查找单个产品api
      modal: false,
      modalWidth: 620,
      current_lead: '',
      options: '',
      isCreating: false,
      // totalHours: "", //总课时数
      // unitPrice: "", //折扣后课时单价
      // priceTotal: "", //折扣后总金额
      // standard_price: "", //折扣前课时单价
      // standard_amount: "", //折扣前总金额
      orderForm: {
        main_id: '',
        guardian: '',
        guardian_mobile: '',
        address: '',
        product_id: '',
        grade: '',
        subject: '',
        class_hour_grade: '1',
        standard_class_hour: '80',
        _giveaway_class_hour: '',
        get giveaway_class_hour() {
          return this._giveaway_class_hour;
        },
        set giveaway_class_hour(value) {
          this._giveaway_class_hour=value;
        },
        payment_type: 1,
        subscription: '',
        order_channel: '',
        // payment_data: [{
        //   transaction_type: "1",
        //   amount: ""
        // }], //付款方式
        discount_data: [],
        discount_coupon: '',
        remark: ''
      },
      orderRule: {
        guardian: [
          {
            required: true,
            validator: RULE().validateName,
            message: '请填写监护人姓名',
            trigger: 'blur'
          }
        ],

        guardian_mobile: [
          {
            required: true,
            validator: RULE().validatePhone,
            message: '请输入联系方式',
            trigger: 'blur'
          }
        ],

        address: [
          {
            required: true,
            message: '请填写家庭住址',
            trigger: 'blur'
          }
        ],

        grade: [
          {
            type: 'number',
            required: true,
            message: '请选择购课年级',
            trigger: 'change'
          }
        ],
        subject: [
          {
            type: 'number',
            required: true,
            message: '请选择购课科目',
            trigger: 'change'
          }
        ],
        class_hour_grade: [
          {
            required: true,
            message: '请选择课时等级',
            trigger: 'change'
          }
        ],
        order_channel: [
          {
            required: true,
            message: '请选择订单提交来源',
            trigger: 'change'
          }
        ],
        standard_class_hour: [
          {
            required: true,
            validator: RULE().validateNum,
            trigger: 'blur'
          }
        ],
        payment_type: [
          {
            type: 'number',
            required: true,
            message: '请选择支付类型',
            trigger: 'change'
          }
        ],
        giveaway_class_hour: [
          {
            validator: RULE().validateNumber,
            trigger: 'blur'
          },
        ],
        subscription: [
          {
            type: 'number',
            required: true,
            message: '请输入金额',
            trigger: 'change'
          }
        ],
        gift_amount: [
          {
            validator: RULE().validateNumber,
            trigger: 'blur'
          }
        ]
      },
      discountList: [], //优惠活动列表
      discount: '', //优惠活动值
      superDiscount: [], //叠加优惠数组
      discountList2: [], //优惠活动列表选完传来下一级的discountList
      discount_details: [],
      calculatedAmount: {} //返回的金额信息
    }
  },
  methods: {
    show(current_lead) {
      this.modal = true
      this.current_lead = current_lead[0]
      console.log(current_lead)
      this.orderForm.main_id =
        current_lead[0].leads_id ||
        current_lead[0].customers_id ||
        current_lead[0].class_schedules_id

      console.log(this.orderForm.main_id)
      this.orderForm.grade =
        parseInt(current_lead[0].basic_info_grade) ||
        parseInt(current_lead[0].class_schedules_grade)
      this.orderForm.subject =
        parseInt(current_lead[0].basic_info_subject) ||
        parseInt(current_lead[0].class_schedules_subject)
      let options = [
        'grade',
        'subject',
        'class_hour_grade',
        'payment_type',
        'order_channel',
        'transaction_type',
        'gift'
      ]
      this.getOptions(options, current_lead[0])
      setTimeout(res => {
        this.getProduct()
      }, 10)
    },
    cancel() {
      this.modal = false
    },
    fileShow() {
      //相关文件展开隐藏
      this.modalWidth = this.modalWidth == 820 ? 620 : 820
    },
    getOptions(options, lead) {
      // 获取所有选项
      this.$axios
        .post(this.api.getFieldOptionsAPI, {
          field: options
        })
        .then(res => {
          this.options = res.data.data
          if (lead) {
            this.orderForm.grade = parseInt(lead.basic_info_grade)
            this.orderForm.subject = parseInt(lead.basic_info_subject)
          }
        })
    },

    //提交订单
    addDiscount() {
      //添加优惠
      if (this.discount == '') {
        //如果优惠活动没有选择值，不叠加
        this.$Notice.error({
          title: '',
          desc: '请先选择优惠活动信息',
          duration: 4
        })
        return false
      }
      let i = 0
      this.superDiscount.forEach((item, index) => {
        if (item.discount == '') {
          //有叠加优惠没有选择，不叠加
          i++
        }
      })
      if (i > 0) {
        this.$Notice.error({
          title: '',
          desc: '请先选择优惠活动信息',
          duration: 4
        })
        return false
      }
      this.superDiscount.push({
        //否则新增优惠活动
        discount: '',
        discountList: this.discountList2
      })
    },
    addPay() {
      //添加付款方式
      this.orderForm.payment_data.push({
        transaction_type: '',
        amount: ''
      })
    },
    remove(index, collection) {
      collection.splice(index, 1)
      this.getProduct('discount')
    },
    checkGiveup() {
      const classHourList = [40, 80, 120, 160, 200, 240, 280, 320, 400]
      const holidayGiveupClassHourList = [2, 14, 24, 36, 50, 65, 65, 93, 93]
      const commonGiveupClassHourList = [2, 18, 34, 51, 66, 83, 102, 121, 159]
      let giveupClassHourList = holidayGiveupClassHourList
      if (this.discount) {
        const name = this.discountList.filter(e => e.id === this.discount)[0].name
        if (name && /暑期/.test(name)) {
          giveupClassHourList = commonGiveupClassHourList
        }
      }
      const hour = this.orderForm.standard_class_hour
      const val = parseInt(this.orderForm.giveaway_class_hour || 0)
      let giveupStandard = 0
      for (let i = 0, len = classHourList.length; i < len; i++) {
        if ( hour >= classHourList[i] && ((classHourList[i + 1] && classHourList[i + 1] > hour) || i === len - 1) ) {
          giveupStandard = giveupClassHourList[i]
          break
        }
      }
      const res = val <= giveupStandard
      if (!res) {
        this.$Notice.error({ desc: `您当前的可用赠送课时为${giveupStandard}` })
      }
      return res
    },
    getProduct(type, index) {
      //选择购课年级，购课科目，课时级别,课时包，支付类型之后，1、获取产品价格（productId和price），2、获取优惠活动discountList
      if (
        (this.orderForm.grade != '') &
        (this.orderForm.subject != '') &
        (this.orderForm.class_hour_grade != '') &
        (this.orderForm.standard_class_hour != '') &
        (this.orderForm.payment_type != '')
      ) {
        if (!/^[0-9]+$/.test(this.orderForm.standard_class_hour)) {
          //用正则表达检查字符串是否全部是数字
          return false //不全部是数字;
        }
        if (
          this.orderForm.giveaway_class_hour != '' &&
          !/^[0-9]+$/.test(this.orderForm.giveaway_class_hour)
        ) {
          //用正则表达检查字符串是否全部是数字
          return false //不全部是数字;
        }
        // alert("type:"+type);
        if (type != 'discount') {
          //如果change的不是优惠活动，优惠活动discountList回到第一级
          this.discount = ''
          this.discountList = []
          this.superDiscount = []
          this.discountList2 = []
          this.orderForm.discount_data = []
          this.getProduct2(type, index)
        } else {
          //如果change的是优惠活动
          if (index == '0') {
            //如果是第一个优惠change，清空二级以后
            this.superDiscount = []
            this.discountList2 = []
            let discuont_data = []
            if (this.discount && this.discount != '') {
              discuont_data.push(this.discount)
            }
            this.orderForm.discount_data = discuont_data
            this.getProduct2(type, index)
          } else {
            //如果是第二级别以上优惠change，优惠活动discountList下一级别
            let discuont_data = []
            if (this.discount && this.discount != '') {
              discuont_data.push(this.discount)
              this.superDiscount.forEach((item, index) => {
                if (item.discount != '') {
                  discuont_data.push(item.discount)
                }
              })
            }
            this.orderForm.discount_data = discuont_data
            this.getProduct2(type, index)
          }
        }
      }
    },
    getProduct2(type, index) {
      //请求api 1、获取产品价格（productId和price），2、获取优惠活动discountList
      this.$axios
        .post(
          this.api.getCalculatePriceAPI,
          {
            main_id: this.orderForm.main_id,
            grade: this.orderForm.grade,
            subject: this.orderForm.subject,
            class_hour_grade: this.orderForm.class_hour_grade,
            standard_class_hour: this.orderForm.standard_class_hour,
            discount_data: this.orderForm.discount_data,
            discount_coupon: this.orderForm.discount_coupon,
            giveaway_class_hour: this.orderForm.giveaway_class_hour,
            payment_type: this.orderForm.payment_type
          },
          {
            loading: false
          }
        )
        .then(res => {
          let response = res.data.data
          this.calculatedAmount = {} //先清空
          this.calculatedAmount = res.data.data.data
          this.orderForm.product_id = response.data.product_id //product_id
          // this.priceTotal = response.data.standard_amount; //订单总价
          // this.unitPrice = response.data.actual_price; //折后单价
          // this.totalHours = response.data.total_class_hour; //总课时数
          // this.standard_price = response.data.standard_price; //折扣前课时单价
          // this.standard_amount = response.data.standard_amount; //折扣前总金额
          this.discount_details = response.data.discount_details //优惠活动详情

          if (type != 'discount') {
            //如果change的不是优惠活动，优惠活动discountList回到第一级
            this.discountList = response.meet_conditions_discount //获取优惠活动discountList
          } else {
            //如果change的是优惠活动
            if (index == '0') {
              //如果是第一个优惠change，清空二级以后
              // alert("discount:"+this.discount);
              if (this.discount) {
                //如果第一级变动有值
                this.discountList2 = response.meet_conditions_discount
              }
            } else {
              //如果是第二级别以上优惠change，优惠活动discountList下一级别
              this.discountList2 = response.meet_conditions_discount
            }
          }
        })
    },
    createOrder(name) {
      //提交订单点击确定
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.checkGiveup()) {
            if (this.isCreating) {
              return false
            } else {
              this.isCreating = true
            }
            if (this.orderForm.payment_type != 3) {
              this.orderForm.subscription = ''
            }
            this.$axios
              .post(this.api.createOrdersAPI, this.orderForm)
              .then(res => {
                this.$Message.success('订单提交成功!')
                this.modal = false
                setTimeout(() => {
                  location.reload()
                }, 1000)
              })
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.submit {
  float: right;
}

.modals .ivu-modal-body {
  margin-bottom: 60px;
}
</style>
