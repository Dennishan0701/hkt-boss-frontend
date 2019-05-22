<template>
  <div>
    <!--拨打电话弹窗-->
    <Modal
      v-if="modalType=='dialModal'"
      class="modals dialModal"
      :width="modalWidth"
      v-model="isShow"
      :mask-closable="false"
    >
      <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
      <div class="modalCon">
        <div class="left">
          <p
            class="position"
          >{{dialInfo.grade_format}} / {{dialInfo.subject_format}} / {{dialInfo.channel}}</p>
          <div class="stuInfo">
            <p class="stuName">{{dialInfo.name}}</p>
            <p class="stuPhone">{{dialInfo.mobile}}</p>
            <div class="dialBg">
              <div v-show="iscallUp" id="loading-center-absolute">
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
              </div>
              <p class="dialPhone" :class="{dialing:isDialing}" @click="callUp"></p>
            </div>
            <p v-if="!isDialing" class="stuAddress">江苏 无锡</p>
            <p v-else class="callTime">0:00:00</p>
          </div>
          <ul class="dialRecord">
            <li v-for="record in latestTrackingRecords">
              <p class="dialTime">
                {{record.created_at}}
                <span>{{record.contact_method}}</span>
              </p>
              <p class="dialResult">{{record.connectivity}}</p>
              <p class="dialResult">{{record.remark}}</p>
            </li>
          </ul>
        </div>
        <div class="center">
          <p class="label">操作：{{auth_user.real_role_format }}</p>
          <!-- <FormItem label="选择线路" prop="contact_line">
           <Select v-model="formItem.contact_line" style="width:90px">
              <Option :key="0" :value="1">融营1</Option>
              <Option :key="1" :value="2">融营2</Option>
            </Select>
          </FormItem>-->
          <Form
            ref="formItem"
            :model="formItem"
            :rules="ruleItem"
            :label-width="100"
            label-position="left"
          >
            <FormItem label="联系方式" prop="contact_method">
              <Select v-model="formItem.contact_method" style="width:90px">
                <Option :key="0" :value="1">电话</Option>
                <Option :key="1" :value="2">微信</Option>
                <Option :key="2" :value="3">客户端</Option>
                <Option :key="3" :value="4">QQ</Option>
              </Select>
            </FormItem>
            <FormItem
              label="接通状态"
              prop="connectivity"
              v-if="formItem.contact_method ==1"
            >
              <Select v-model="formItem.connectivity" style="width:120px">
                <Option :key="0" :value="0">未接通</Option>
                <Option :key="1" :value="1">已接通</Option>
              </Select>
            </FormItem>
            <FormItem
              label="接通细节"
              prop="connectivity_detail"
              v-if="auth_user.real_role_format =='CC' && formItem.contact_method ==1 "
            >
              <Select
                v-model="formItem.connectivity_detail"
                style="width:120px"
              >
                <Option
                  v-for="(item,index) in conDetailList"
                  :value="item.value"
                  :key="index"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem
              label="退费预警状态"
              prop="refund_alarm"
              v-if="auth_user.real_role_format =='TR' || auth_user.real_role_format =='CR'"
            >
              <Select v-model="formItem.refund_alarm" style="width:120px">
                <Option :key="1" :value="1">正常</Option>
                <Option :key="2" :value="2">怀疑</Option>
                <Option :key="3" :value="3">焦虑</Option>
                <Option :key="4" :value="4">愤怒</Option>
                <Option :key="5" :value="5">提出退款</Option>
              </Select>
            </FormItem>
            <FormItem label="记录" class="twoLevel" prop="remark">
              <Input
                v-model="formItem.remark"
                type="textarea"
                :autosize="{minRows: 4,maxRows: 6}"
                style="width: 330px;margin-left: 0;"
                placeholder="请填写沟通备注信息"
              ></Input>
            </FormItem>
            <FormItem
              label="下次跟进时间"
              class="twoLevel"
              prop="next_follow_up_time"
            >
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                :editable="false"
                v-model="formItem.next_follow_up_time"
                placeholder="选择日期时间"
                style="width: 160px"
                @on-change="formItem.next_follow_up_time=$event"
              ></DatePicker>
              <!--@on-change="changeFollowTime"></DatePicker>-->
            </FormItem>
            <FormItem label="优先级标签" class="twoLevel">
              <RadioGroup v-model="formItem.tracking_tag">
                <Radio label="1" value="1">紧急</Radio>
                <Radio label="2" value="2">重要</Radio>
                <Radio label="3" value="3">特殊</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="转化阶段" prop="dps" v-if="false">
              <Select v-model="formItem.dps" style="width:90px">
                <Option :key="1" :value="1">首次拨打</Option>
                <Option :key="2" :value="2">已排课</Option>
                <Option :key="3" :value="3">已试听</Option>
                <Option :key="4" :value="4">已付费</Option>
                <Option :key="5" :value="5">已审核</Option>
                <Option :key="6" :value="6">移交CR</Option>
              </Select>
            </FormItem>

            <button
              type="button"
              class="submit"
              @click="submitTrackingRecord('formItem')"
            >确定</button>
          </Form>
        </div>
        <div class="right">
          <p class="filesShow">
            <span @click="fileShow" v-if="modalWidth==620">
              相关文件
              <i class="iconfont icon-yuanjiaojuxingkaobei1"></i>
            </span>
            <span @click="fileShow" v-else-if="modalWidth==820">
              收起
              <i class="iconfont icon-yuanjiaojuxingkaobei"></i>
            </span>
          </p>
          <div class="relatedFiles" v-if="modalWidth==820">
            <p class="search">
              <Input
                style="width:120px"
                v-model="keywords"
                placeholder="搜索相关文件"
              />
              <Button class="btn4">
                <i class="iconfont icon-sousuo"></i>
              </Button>
            </p>
            <ul class="relatedFiles2">
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
              <li>初一数学第三章试卷题</li>
            </ul>
            <div class="activeFile">
              <p class="activeTit">常用文件</p>
              <p>话术工具v.123</p>
              <p>2018-12-01 价格表</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <!--试听课排课申请弹窗-->
    <Modal
      v-if="modalType=='arrangeClass'"
      class="modals arrClassModal"
      width="680"
      v-model="isShow"
      :mask-closable="false"
    >
      <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
      <div class="modalCon">
        <p class="modalTitle">试听课排课申请</p>
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          label-width="90"
          label-position="left"
        >
          <div class="line">
            <FormItem label="姓名：" class="label_name">
              <p style="width: 60px;line-height: 32px">梁朝伟</p>
            </FormItem>
            <FormItem label="上课时长：">
              <Select
                style="width: 90px;"
                v-model="formValidate.classTime"
                placeholder="请选择"
              >
                <Option value="1小时">1小时</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="正式课频率：">
              <Select
                style="width: 90px;"
                v-model="formValidate.subject"
                placeholder="请选择"
              >
                <Option value="一周1节">一周1节</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
          </div>
          <div class="line2">
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
          <FormItem label="试听课时间：">
            <DatePicker
              class="chooseDate"
              type="date"
              placeholder="请选择时间"
              style="width: 160px"
            ></DatePicker>
          </FormItem>
          <div class="title_outer">
            <span class="title_inner">学习要求</span>
          </div>
          <div class="line3">
            <FormItem label="试听科目：">
              <Select
                style="width: 90px;"
                v-model="formValidate.subject"
                placeholder="请选择"
              >
                <Option value="语文">语文</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="年级：" class="label_grade">
              <Select
                v-model="formValidate.departmentUser"
                placeholder="请选择年级"
                style="width:90px"
                transfer
              >
                <Option value="0">初一</Option>
                <Option value="1">London</Option>
                <Option value="2">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="教材版本：">
              <Select
                style="width: 90px;"
                v-model="formValidate.teachVersion"
                placeholder="请选择"
              >
                <Option value="0">人教版</Option>
                <Option value="1">London</Option>
                <Option value="2">Sydney</Option>
              </Select>
            </FormItem>
          </div>
          <FormItem label="学习成绩：" prop="departmentUser" class="blockItem">
            <span>得分</span>
            <Input
              class="chooseDate"
              v-model="value"
              placeholder
              style="width: 80px;margin-left:10px;margin-right: 20px;"
            />
            <span>总分</span>
            <Input
              class="chooseDate"
              v-model="value"
              placeholder
              style="width: 80px;margin-left: 10px;margin-right: 30px;"
            />
            <Select
              v-model="formValidate.departmentUser"
              placeholder="单元测验"
              style="width:120px;"
              transfer
            >
              <Option
                v-for="(item,index) in departmentUsersList"
                :value="item.id"
                :key="index"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="上传错题：" prop="departmentUser" class="blockItem">
            <Upload
              class="wrongUpload"
              ref="upload"
              action
              :data="leadsParams"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :on-error="handleError"
              :on-progress="handleProgress"
              :before-upload="handleBeforeUpload"
              :headers="{'Content-Type':'application/x-www-data-urlencoded'}"
            >
              <Button
                class="wrongBtn"
                @click="importLeads"
                :loading="loadingStatus"
              >上传</Button>
            </Upload>
          </FormItem>
          <FormItem label="试听重点：" prop="departmentUser" class="blockItem">
            <Input
              v-model="value"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="学习情况详细描述"
            />
          </FormItem>
          <FormItem label="学习情況：" prop="departmentUser" class="blockItem">
            <CheckboxGroup
              v-model="checkAllGroup"
              @on-change="checkAllGroupChange"
            >
              <Checkbox label="厌学"></Checkbox>
              <Checkbox label="贪玩"></Checkbox>
              <Checkbox label="基础薄弱"></Checkbox>
              <Checkbox label="方法不佳"></Checkbox>
              <Checkbox label="均衡"></Checkbox>
              <Checkbox label="拔高"></Checkbox>
            </CheckboxGroup>
            <Input
              v-model="value"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="学习情况详细描述"
            />
          </FormItem>
          <div class="title_outer">
            <span class="title_inner">老师要求</span>
          </div>
          <FormItem label="性別要求：" prop="departmentUser" class="blockItem">
            <RadioGroup v-model="value">
              <Radio label="无要求"></Radio>
              <Radio label="男"></Radio>
              <Radio label="女"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="授课要求：" prop="departmentUser" class="blockItem">
            <Input
              v-model="value"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="描述授课要求"
            />
          </FormItem>
          <FormItem label="建议老师：">
            <Select
              style="width: 90px;"
              v-model="formValidate.teachVersion"
              placeholder="请选择"
            >
              <Option value="0">人教版</Option>
              <Option value="1">London</Option>
              <Option value="2">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem label="排课原因：" prop="departmentUser" class="blockItem">
            <CheckboxGroup
              v-model="checkAllGroup"
              @on-change="checkAllGroupChange"
            >
              <Checkbox label="首次试听"></Checkbox>
              <Checkbox label="更换老师"></Checkbox>
              <Checkbox label="更换科目"></Checkbox>
              <Checkbox label="更换年级"></Checkbox>
              <Checkbox label="扩科"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <button
            type="button"
            class="submit"
            @click="handleSubmit('formValidate')"
          >确认</button>
        </Form>
      </div>
    </Modal>
    <!--提交订单弹窗-->
    <Modal
      v-if="modalType=='placeOrder'"
      class="modals placeOrderModal"
      :width="modalWidth"
      v-model="isShow"
      :mask-closable="false"
    >
      <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
      <div class="modalCon">
        <div class="left">
          <p class="modalTitle">* 提交订单 *</p>
          <p class="orderAmount" v-if="priceTotal>0">
            <span>
              订单金额
              <i>¥{{priceTotal}}</i>
            </span>
            <span>
              折后单价
              <i>¥{{unitPrice}}</i>
            </span>
            <span>
              总课时数
              <i>{{totalHours}}</i>
            </span>
          </p>
          <Form
            ref="orderForm"
            :model="orderForm"
            :rules="ruleOrder"
            :label-width="86"
            label-position="left"
          >
            <div class="line1">
              <FormItem label="姓名：">
                <p style="width:40px;line-height: 32px">梁朝伟</p>
              </FormItem>
              <FormItem label="购课年级：" prop="grade">
                <Select
                  style="width: 90px;"
                  v-model="orderForm.grade"
                  placeholder="请选择"
                  @on-change="getProduct"
                >
                  <Option
                    v-for="(item,index) in gradeList"
                    :key="index"
                    :value="item.key"
                  >{{item.value}}</Option>
                </Select>
              </FormItem>
              <FormItem label="购课科目：" prop="subject">
                <Select
                  style="width: 90px;"
                  v-model="orderForm.subject"
                  placeholder="请选择"
                  @on-change="getProduct"
                >
                  <Option
                    v-for="(item,index) in subjectList"
                    :key="index"
                    :value="item.key"
                  >{{item.value}}</Option>
                </Select>
              </FormItem>
            </div>
            <div class="line2">
              <FormItem label="课时级别：" prop="class_hour_grade">
                <Select
                  style="width: 90px;"
                  v-model="orderForm.class_hour_grade"
                  placeholder="请选择"
                  @on-change="getProduct"
                >
                  <Option
                    v-for="(item,index) in class_hour_grade"
                    :key="index"
                    :value="item.key"
                  >{{item.value}}</Option>
                </Select>
              </FormItem>
              <FormItem label="课时包：" prop="standard_class_hour">
                <Input
                  style="width:120px"
                  v-model="orderForm.standard_class_hour"
                  @on-blur="getProduct()"
                  placeholder="请输入课时包"
                />
              </FormItem>
            </div>
            <div class="line5">
              <FormItem label="是否全款：" prop="payment_type">
                <RadioGroup v-model="orderForm.payment_type">
                  <Radio label="0">是</Radio>
                  <Radio label="1">否</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="订单支付渠道：" prop="order_channel">
                <Select
                  style="width: 90px;"
                  v-model="orderForm.order_channel"
                  placeholder="请选择"
                >
                  <Option
                    v-for="(item,index) in order_channel"
                    :key="index"
                    :value="item.key"
                  >{{item.value}}</Option>
                </Select>
              </FormItem>
            </div>
            <div class="line3">
              <FormItem label="优惠活动：">
                <Select
                  style="width: 120px;"
                  v-model="orderForm.discount_data"
                  @on-change="getProduct"
                  placeholder="请选择"
                >
                  <Option value="1小时">1小时</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
              <FormItem
                v-for="(item,index) in superDiscount"
                :key="index"
                label="叠加优惠："
              >
                <Select
                  style="width: 120px;"
                  v-model="item.classTime"
                  placeholder="请选择"
                  @on-change="getProduct"
                >
                  <Option value="1小时">早鸟活动</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
              <p class="addDiscount" @click="addDiscount">+添加优惠</p>
            </div>
            <!-- <div class="line3">
              <FormItem label="优惠券：">
                <Select style="width: 120px;" v-model="orderForm.discount_coupon"
                        @on-change="getProduct" placeholder="请选择">
                  <Option value="1小时">早鸟活动</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
              <FormItem label="赠送课时：" prop="giveaway_class_hour">
                <Input style="width:120px" v-model="orderForm.giveaway_class_hour" @on-blur="getProduct"
                       placeholder="请输入赠送课时"/>
              </FormItem>
            </div>-->
            <div class="line4">
              <template v-for="(item,index) in orderForm.payment_data">
                <FormItem
                  label="付款方式："
                  :prop="'payment_data.' + index + '.transaction_type'"
                  :rules="{required: true, message: '付款方式不能为空', trigger: 'change'}"
                >
                  <Select
                    style="width: 120px;"
                    v-model="item.transaction_type"
                    placeholder="请选择付款方式"
                  >
                    <Option
                      v-for="(item,index) in transaction_type"
                      :key="index"
                      :value="item.key"
                    >{{item.value}}</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="金额："
                  :prop="'payment_data.' + index + '.amount'"
                  :rules="{required: true, message: '金额不能为空', trigger: 'change'}"
                >
                  <Input
                    style="width:120px"
                    v-model="item.amount"
                    placeholder="请输入金额"
                  />
                </FormItem>
              </template>
              <p class="addDiscount" @click="addPay">+新增方式</p>
            </div>
            <FormItem label="付款备注：">
              <Input
                v-model="orderForm.remark"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 6}"
                style="width: 330px"
                placeholder="请填写付款备注"
              ></Input>
            </FormItem>
            <button
              type="button"
              class="submit"
              @click="createOrder('orderForm')"
            >确定下单</button>
          </Form>
        </div>
        <div class="right">
          <p class="filesShow">
            <span @click="fileShow" v-if="modalWidth==620&&priceTotal>0">
              价格明细
              <i class="iconfont icon-yuanjiaojuxingkaobei1"></i>
            </span>
            <span @click="fileShow" v-else-if="modalWidth==820">
              收起
              <i class="iconfont icon-yuanjiaojuxingkaobei"></i>
            </span>
          </p>
          <div class="priceDetails" v-if="modalWidth==820">
            <div class="priceHead">
              <p class="priceTitle">{{grade}}{{classHourGrade}}</p>
              <p class="priceTip">
                ¥{{standard_price}}/课时 * {{orderForm.standard_class_hour}} =
                ¥{{standard_amount}}
              </p>
            </div>
            <ul class="priceBody">
              <li>
                <p>课时包优惠 9折</p>
                <p>- ¥100</p>
              </li>
              <li>
                <p>全款优惠 8折</p>
                <p>- ¥100</p>
              </li>
              <li>
                <p>*双十一活动 9折</p>
                <p>- ¥100</p>
              </li>
              <li>
                <p>*早鸟活动 9折</p>
                <p>- ¥100</p>
              </li>
              <!-- <li>
                <p class="coupon">优惠券</p>
                <p>- ¥100</p>
              </li>-->
              <li>
                <p class="coupon">赠送课时</p>
                <p>- ¥100</p>
              </li>
            </ul>
            <ul class="priceBody2">
              <li>
                <p>折扣总额</p>
                <p>- ¥{{discount_amount}}</p>
              </li>
              <li>
                <p>订单金额</p>
                <p>{{priceTotal}}</p>
              </li>
              <li class="fracture">
                <p>折后单价 ¥{{unitPrice}}</p>
                <p>总课时数 {{totalHours}}</p>
              </li>
            </ul>
            <div class="priceFoot">
              <p class="closingDate">
                <i class="iconfont icon-info"></i>课时截止日期
              </p>
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
<style lang="less">
@import '../assets/css/modal.less';
</style>
<script>
import RULE from '@/api/infoRule'

export default {
  data() {
    return {
      dialInfoAPI:
        this.$store.state.dialInfo + '/' + sessionStorage.getItem('studentID'), // 拨打基本信息API
      // latestTrackingRecordsAPI: this.$store.state.latestTrackingRecords_1 + sessionStorage.getItem ("studentID") + this.$store.state.latestTrackingRecords_2,

      dialCalAPI: this.$store.state.dialCall, //拨打电话
      hangUpCallAPI: this.$store.state.hangUpCall, //挂断电话
      callUpAPI: this.$store.state.callUp, //拨打电话弹窗点击确定
      getFieldOptionsAPI: this.$store.state.getFieldOptions, //获取select选项api
      getProductAPI: this.$store.state.getProduct, //查找单个产品api
      getCalculatePriceAPI: this.$store.state.getCalculatePrice, //预查产品价格
      createOrdersAPI: this.$store.state.createOrders, //提交订单api
      createTrackingRecord_1: this.$store.state.createTrackingRecord_1, //
      createTrackingRecord_2: this.$store.state.createTrackingRecord_2, //
      isShow: true,
      modalWidth: 620,
      //1、拨打电话
      keywords: '',
      model1: 0,
      clickOK: this.$store.state.clickOK,
      dialInfo: '', //拨打基本信息
      latestTrackingRecords: '',
      iscallUp: false, //点击拨打电话
      isDialing: false, //接通状态
      sid: '', //挂断电话参数
      formItem: {
        // main_id: "",
        contact_method: 1,
        remark: '',
        next_follow_up_time: '',
        dps: '',
        connectivity: '',
        connectivity_detail: '',
        refund_alarm: 1
      },
      ruleItem: {
        contact_method: [
          {
            required: true,
            type: 'number',
            message: '请选择联系方式',
            trigger: 'change'
          }
        ],
        next_follow_up_time: [
          {
            required: true,
            message: '请选择下次跟进时间',
            trigger: 'change'
          }
        ],
        dps: [
          {
            required: true,
            type: 'number',
            message: '请选择转化阶段',
            trigger: 'change'
          }
        ],
        connectivity: [
          {
            required: true,
            type: 'number',
            message: '请选择接通状态',
            trigger: 'change'
          }
        ],
        connectivity_detail: [
          {
            required: true,
            type: 'number',
            message: '请选择联系状态',
            trigger: 'change'
          }
        ],
        remark: [
          {
            required: true,
            type: 'string',
            message: '请填写学习需求',
            trigger: 'blur'
          }
          // {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
        ]
      },
      //2、排课
      superDiscount: [], //叠加优惠数组
      formValidate: {
        name: '',
        classTime: '1小时',
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
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur'
          }
        ],
        mail: [
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Incorrect email format',
            trigger: 'blur'
          }
        ],
        gender: [
          {
            required: true,
            message: 'Please select gender',
            trigger: 'change'
          }
        ],
        interest: [
          {
            required: true,
            type: 'array',
            min: 1,
            message: 'Choose at least one hobby',
            trigger: 'change'
          },
          {
            type: 'array',
            max: 2,
            message: 'Choose two hobbies at best',
            trigger: 'change'
          }
        ],
        date: [
          {
            required: true,
            type: 'date',
            message: 'Please select the date',
            trigger: 'change'
          }
        ],
        time: [
          {
            required: true,
            type: 'string',
            message: 'Please select time',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: 'Please enter a personal introduction',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 20,
            message: 'Introduce no less than 20 words',
            trigger: 'blur'
          }
        ]
      },
      //提交订单
      superDiscount: [], //叠加优惠数组
      totalHours: '', //总课时数
      discount_amount: '', //折扣钱数
      unitPrice: '', //折扣后课时单价
      priceTotal: '', //折扣后总金额
      standard_price: '', //折扣前课时单价
      standard_amount: '', //折扣前总金额
      gradeList: [], //获取所有年级
      subjectList: [], //获取所有科目
      class_hour_grade: [], //获取所有课时级别
      payment_type: [], //获取是否全款
      order_channel: [], //获取所有订单支付渠道
      transaction_type: [], //获取所有付款方式
      orderForm: {
        main_id: 1,
        product_id: '',
        grade: '',
        subject: '',
        class_hour_grade: '',
        standard_class_hour: '',
        giveaway_class_hour: '',
        payment_type: '',
        order_channel: '',
        payment_data: [
          {
            transaction_type: '',
            amount: ''
          }
        ], //付款方式
        discount_data: [],
        discount_coupon: '',
        remark: ''
      },
      ruleOrder: {
        grade: [
          {
            required: true,
            message: '请选择购课年级',
            trigger: 'change'
          }
        ],
        subject: [
          {
            required: true,
            message: '请选择购课科目',
            trigger: 'change'
          }
        ],
        class_hour_grade: [
          {
            required: true,
            message: '请选择课时级别',
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
            required: true,
            message: '请选择是否全款',
            trigger: 'change'
          }
        ],
        order_channel: [
          {
            required: true,
            message: '请选择订单支付渠道',
            trigger: 'change'
          }
        ],
        giveaway_class_hour: [
          {
            validator: RULE().validateNumber,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  props: ['modalType'], //父组件传送过来的组件数组
  computed: {
    auth_user() {
      return JSON.parse(sessionStorage.getItem('auth_user'))
    },
    grade() {
      for (let i in this.gradeList) {
        if (this.gradeList[i].key == this.orderForm.grade) {
          return this.gradeList[i].value
        }
      }
    },
    classHourGrade() {
      for (let i in this.class_hour_grade) {
        if (this.class_hour_grade[i].key == this.orderForm.class_hour_grade) {
          return this.class_hour_grade[i].value
        }
      }
    },
    conDetailList() {
      if (this.formItem.connectivity == 0) {
        return [
          { name: '空号', value: 1 },
          { name: '错号', value: 2 },
          { name: '停机', value: 3 },
          { name: '未接', value: 4 },
          { name: '拒接', value: 5 },
          { name: '关机', value: 6 },
          { name: '呼叫转移', value: 7 }
        ]
      } else if (this.formItem.connectivity == 1) {
        return [
          { name: '有意向，同意排课', value: 8 },
          { name: '有意向，待跟进', value: 9 },
          { name: '无意向，待跟进', value: 10 },
          { name: '无意向，已放弃', value: 11 },
          { name: '未试听，待跟进', value: 12 },
          { name: '未试听，已放弃', value: 13 },
          { name: '未试听，同意排课', value: 14 },
          { name: '已试听，同意下单', value: 15 },
          { name: '已试听，待跟进', value: 16 },
          { name: '已试听，已放弃', value: 17 }
        ]
      }
    }
  },
  mounted() {
    // modalType=='placeOrder'
    //console.log (this.modalType);

    if (this.modalType == 'dialModal') {
      //如果是提交订单，获取提交订单select的option
      this.getDialInfo()
      this.getLatestTrackingRecords()
    }

    if (this.modalType == 'placeOrder') {
      //如果是提交订单，获取提交订单select的option
      let option = {
        field: [
          'grade',
          'subject',
          'class_hour_grade',
          'payment_type',
          'order_channel',
          'transaction_type'
        ]
      }
      this.getOptions(option)
    }
  },
  watch: {},
  methods: {
    getDialInfo() {
      this.$axios.get(this.dialInfoAPI).then(res => {
        this.dialInfo = res.data.data.user_info
      })
    },
    getLatestTrackingRecords() {
      this.$axios
        .post(this.latestTrackingRecordsAPI, { count: 6 })
        .then(res => {
          this.latestTrackingRecords = res.data.data
          console.log(res.data.data)
        })
    },
    getOptions(option) {
      //获取select选项
      this.$axios.post(this.getFieldOptionsAPI, option).then(res => {
        console.log(res.data.data)
        if (res.data.data.subject) {
          this.gradeList = res.data.data.grade
          this.subjectList = res.data.data.subject
          this.class_hour_grade = res.data.data.class_hour_grade
          this.payment_type = res.data.data.payment_type
          this.order_channel = res.data.data.order_channel
          this.transaction_type = res.data.data.transaction_type
        }
      })
    },
    ok() {
      this.$store.commit('FETCH_MODAL', 'false')
      this.isShow = false
      this.clickOK = this.clickOK + 1
      this.$store.commit('CLICK_OK', this.clickOK) //点击确定
    },
    cancel() {
      //关闭弹窗
      this.$store.commit('FETCH_MODAL', 'false')
      this.isShow = false
      this.$store.commit('CLICK_OK', 0)
    },

    fileShow() {
      //相关文件展开隐藏
      this.modalWidth = this.modalWidth == 820 ? 620 : 820
    },
    //拨打弹窗
    callUp() {
      //点击拨打电话按钮
      if (!this.isDialing) {
        //开始打电话
        this.iscallUp = true
        this.$axios
          .post(this.dialCalAPI, {
            voip_account: '80328000000008',
            tophone: sessionStorage.getItem('studentPhone'),
            // tophone: "15000352338",
            main_id: sessionStorage.getItem('studentID')
          })
          .then(res => {
            this.isDialing = true //接通
            this.iscallUp = false //拨打中隐藏
            this.sid = res.data.data
          })
      } else {
        //挂断电话
        this.$axios
          .post(this.hangUpCallAPI, {
            sid: this.sid
          })
          .then(res => {
            this.isDialing = false //接通
            // this.iscallUp = false;//拨打中隐藏
          })
      }
    },
    connectivityChange(val) {
      //接通状态改变
      console.log(val)
      if (val == 0) {
        this.conDetailList = [
          {
            value: 1,
            name: '同意排课'
          },
          {
            value: 2,
            name: '暂不排课，保持跟进'
          }
        ]
      } else if (val == 1) {
        this.conDetailList = [
          {
            value: 3,
            name: '未接'
          },
          {
            value: 4,
            name: '拒接'
          },
          {
            value: 5,
            name: '关机'
          },
          {
            value: 6,
            name: '呼叫转移'
          }
        ]
      } else if (val == 2) {
        this.conDetailList = [
          {
            value: 7,
            name: '无设备'
          },
          {
            value: 8,
            name: '信息错误'
          },
          {
            value: 9,
            name: '未预约不需要'
          },
          {
            value: 10,
            name: '异常原因，无法排课'
          }
        ]
      } else {
        this.conDetailList = [
          {
            value: 11,
            name: '空号'
          },
          {
            value: 12,
            name: '停机'
          },
          {
            value: 13,
            name: '未接多次'
          },
          {
            value: 14,
            name: '拒接多次'
          },
          {
            value: 15,
            name: '持续关机'
          },
          {
            value: 16,
            name: '持续呼叫转移'
          }
        ]
      }
    },
    handleSubmit(name) {
      //拨打弹窗,点击确定
      console.log(this.formItem)
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formItem)
          this.$axios.post(this.callUpAPI, this.formItem).then(res => {
            this.$Message.success('提交成功!')
          })
        } else {
          // this.$Message.error('Fail!');
        }
      })
    },
    submitTrackingRecord(name) {
      //拨打弹窗点击确定
      //console.log (this.formItem);
      this.$refs[name].validate(valid => {
        if (valid) {
          //console.log (this.formItem);
          this.$axios
            .post(
              this.createTrackingRecord_1 +
                sessionStorage.getItem('studentID') +
                this.createTrackingRecord_2,
              this.formItem
            )
            .then(res => {
              this.$Message.success('提交成功!')
              this.$store.commit('FETCH_MODAL', 'false')
              this.isShow = false
            })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    //提交订单
    addDiscount() {
      //添加优惠
      this.superDiscount.push({
        classTime: ''
      })
    },
    addPay() {
      //添加付款方式
      this.orderForm.payment_data.push({
        transaction_type: '',
        amount: ''
      })
    },
    getProduct() {
      //选择购课年级，购课科目，课时级别,课时包之后，获取productId和price
      if (
        (this.orderForm.grade != '') &
        (this.orderForm.subject != '') &
        (this.orderForm.class_hour_grade != '') &
        (this.orderForm.standard_class_hour != '')
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
        this.$axios
          .post(
            this.getCalculatePriceAPI,
            {
              grade: this.orderForm.grade,
              subject: this.orderForm.subject,
              class_hour_grade: this.orderForm.class_hour_grade,
              standard_class_hour: this.orderForm.standard_class_hour,
              discount_data: this.orderForm.discount_data,
              discount_coupon: this.orderForm.discount_coupon,
              giveaway_class_hour: this.orderForm.giveaway_class_hour
            },
            {
              loading: false
            }
          )
          .then(res => {
            this.orderForm.product_id = res.data.data.product_id //product_id
            this.priceTotal = res.data.data.standard_amount //订单总价
            this.discount_amount = res.data.data.discount_amount //折扣钱数
            this.unitPrice = res.data.data.actual_price //折后单价
            this.totalHours = res.data.data.total_class_hour //总课时数
            this.standard_price = res.data.data.standard_price //折扣前课时单价
            this.standard_amount = res.data.data.standard_amount //折扣前总金额
          })
      }
    },
    createOrder(name) {
      //提交订单点击确定
      this.$refs[name].validate(valid => {
        if (valid) {
          let totalAmount = 0
          for (let i in this.orderForm.payment_data) {
            totalAmount =
              totalAmount + Number(this.orderForm.payment_data[i].amount)
          }
          if (totalAmount == this.priceTotal) {
            //如果输入当然付款方式金额累加等于订单金额
            console.log(this.orderForm)
            this.$axios.post(this.createOrdersAPI, this.orderForm).then(res => {
              this.$Message.success('提交成功!')
              this.$store.commit('FETCH_MODAL', 'false')
              this.isShow = false
            })
          } else {
            this.$Message.error('您输入的付款方式金额总和不等于订单金额!')
          }
        } else {
          // this.$Message.error('Fail!');
        }
      })
    }
  },
  destroyed() {}
}
</script>
