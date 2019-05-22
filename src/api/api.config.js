/*
 * API接口地址
 */

import store from '../store';

/*
 *
 * @公共API
 *
 * API    客户端接口地址
 * webAPI websocket地址
 *
 * */

export default function apiBase() {
  return window.API;
}

// 公共API
store.state.api = {
  //数据查询器
  data_query: {
    getFieldOptions: '/api/config/field_options/get', //post-按照字段名称 获取 对应的option组
    getClassGroup: '/api/schedules/getClassGroup', //获取可选择的年级，科目，课时等级
    seeMobileApi: '/api/leads/view-mobile', //查看手机号
  },
  //资源，客户
  lead: {
    filters: '/api/config/leads/fields/filters', //获取所有组件
    tableDisplay: '/api/config/leads/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/leads/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/leads/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/leads', //获取table表数据
    filtersSetting: '/api/page_setting/leads/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/leads/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/leads/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/leads/fields/display/default', //管理员设置字段显示数据
    getmarketEvent: '/api/field/options/marketEvent', //选择渠道获取活动
    getOptionsChannels: '/api/field/options/channels', //选择渠道获取活动

    messages: '/api/ucenter/messages', //获取messages
    // manualCreate: '/api/leads/manualCreate',//手动新建名单
    departmentsList: '/api/departments/list', //手动分配弹窗，获取所有部门列表
    distributableList: '/api/departments/distributable/list', //手动分配弹窗，获取所有部门列表
    departmentUsers: '/api/users/department', //手动分配弹窗，根据选择的部门，获取所有user列表
    departmentDistributableUsers: '/api/users/distributable/department', //手动分配弹窗，根据选择的部门，获取所有user列表
    manualDistribute: '/api/leads/manualDistribute', //手动分配弹窗,点击确定

    trash: '/api/leads/trash', //進垃圾池
    cleaned: '/api/leads/tmk/cleaned', //标记为已分配
    manualCreate: '/api/leads/manualCreate', //新增leads
    getLeadBack: '/api/leads/getLeadBack', //捞回洽谈
    // importLeads: '/api/leads/excel-data', //导入leads
    importLeads: '/api/leads/import', //导入leads
    addProtect: '/api/leads/addProtectList', //添加保护名单
    giveup: '/api/leads/giveup', //主动放弃
    markConvertSuccess: '/api/leads/convertToSuccess', //标记为转化成功
    transferCR: '/api/leads/turnOverCR', //移交CR
  },
  //资源-全部-导入记录
  import_records: {
    filters: '/api/config/import_records/fields/filters', //获取所有组件
    tableDisplay: '/api/config/import_records/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/import_records/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/import_records/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/import_records', //获取table表数据
    filtersSetting: '/api/page_setting/import_records/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/import_records/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/import_records/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/import_records/fields/display/default', //管理员设置字段显示数据
  },
  //重复名单
  repeated_lead_record: {
    filters: '/api/config/repeated_lead_records/fields/filters', //获取所有组件
    tableDisplay: '/api/config/repeated_lead_records/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/repeated_lead_records/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/repeated_lead_records/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/repeated_lead_records', //获取table表数据
    filtersSetting: '/api/page_setting/repeated_lead_records/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/repeated_lead_records/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/repeated_lead_records/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/repeated_lead_records/fields/display/default', //管理员设置字段显示数据
  },
  //报名下面的订单
  order: {
    filters: '/api/config/orders/fields/filters', //获取所有组件
    tableDisplay: '/api/config/orders/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/orders/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/orders/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/orders', //获取table表数据
    filtersSetting: '/api/page_setting/orders/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/orders/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/orders/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/orders/fields/display/default', //管理员设置字段显示数据
    getPayments: '/api/orders/getPayments', //结算-订单-点击列表
    uploadImage: '/api/upload/image', //上传图片
    updatePayTime: '/api/orders/updatePaymentTime', //修改支付完成时间

    //订单处理
    getFieldOptions: '/api/config/field_options/get', //获取select选项
    getProduct: '/api/product/get_one', //查找单个产品
    getCalculatePrice: '/api/order/beforehandCalculatePrice', //预查产品价格
    createOrders: '/api/orders/create', //提交订单
    auditPass: '/api/orders/audit', //审核订单通过
    auditReject: '/api/orders/reject', //审核订单拒绝
    paymentPass: '/api/payments/audit', //审核流水通过
    addPayRecord: '/api/payments/add', //上传支付流水
  },
  //流水
  payment: {
    filters: '/api/config/payments/fields/filters', //获取所有组件
    tableDisplay: '/api/config/payments/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/payments/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/payments/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/payments', //获取table表数据
    filtersSetting: '/api/page_setting/payments/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/payments/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/payments/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/payments/fields/display/default', //管理员设置字段显示数据

    ///流水处理///
    manualSubmitPayment: '/api/payments/manualSubmitPayment', // 手动提交流水支付信息
    manualAuditPayment: '/api/payments/manualAuditPayment', // 人工审核流水
    getBindingOrders: '/api/payments/getBindingOrder', //流水订单列表
    bindOrder: '/api/payments/bindingOrder', //流水绑定订单
  },
  //课次
  class_each: {
    filters: '/api/config/class_eaches/fields/filters', //获取所有组件
    tableDisplay: '/api/config/class_eaches/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/class_eaches/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/class_eaches/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/class_eaches', //获取table表数据
    filtersSetting: '/api/page_setting/class_eaches/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/class_eaches/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/class_eaches/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/class_eaches/fields/display/default', //管理员设置字段显示数据
  },
  //课时
  class_hour: {
    filters: '/api/config/class_hours/fields/filters', //获取所有组件
    tableDisplay: '/api/config/class_hours/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/class_hours/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/class_hours/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/class_hours', //获取table表数据
    filtersSetting: '/api/page_setting/class_hours/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/class_hours/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/class_hours/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/class_hours/fields/display/default', //管理员设置字段显示数据
  },
  //学生
  customers: {
    filters: '/api/config/customers/fields/filters', //获取所有组件
    tableDisplay: '/api/config/customers/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/customers/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/customers/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/customers', //获取table表数据
    filtersSetting: '/api/page_setting/customers/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/customers/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/customers/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/customers/fields/display/default', //管理员设置字段显示数据
    arrange: '/api/schedules/arrange', //安排课程计划
    update: '/api/schedules/update', //修改课程计划
    getOne: '/api/schedules/getOne', //获取课程计划详情
    bindingTeacher: '/api/schedules/bindingTeacher', //绑定老师
    courseScheduling: '/api/schedules/courseScheduling', //排课
    adjustFormalClass: '/api/class_eaches/adjustFormalClass', //调整课次
    cancelFormalClass: '/api/class_eaches/cancelFormalClass', //取消课次
    //个人档案
    studentTrackingIndex: '/api/student/trackingIndex', //1、学生档案首页
    studentInfo: '/api/student/info', //2、学生档案详情信息
    StudentDistributionRecords: '/api/profile/distribution-records', //3、分配记录,传入main_id获取
    studentTrackingList: '/api/student/trackingList', //4、学生跟进记录列表
    // studentschedulesList: '/api/student/schedulesList', //5、学生试听排课记录列表
    studentschedulesList: '/api/profile/trial-class-records', //5、学生试听排课记录列表
    studentOrderList: '/api/profile/orders', //6、学生订单记录列表
    // studentOrderList: '/api/student/orderList', //6、学生订单记录列表
    getRefundRecords: '/api/orders/getRefundRecords', //7. 学生订单记录-查看退款详情
    resetPassword: '/api/student/resetPassword', //8. 学生订单记录-查看退款详情
    apply: '/api/suspendClass/apply', //停课申请
    recoverClassesAPI: '/api/suspendClass/cancel', //学生-在读-维护学生-恢复上课
    cancellationAPI: '/api/schedules/cancellation', //学生-在读-课程计划-点击作废
    // 首页
    baseData: '/api/profile/base-data',
    // 档案信息
    getBaseInfo: '/api/profile/archival-info',
    saveBaseInfo: '/api/profile/update-archival-info',
    //分配
    // manualDistributeCustomer:'/api/customers/manualDistributeCustomer',//api/student/
    manualDistributeCustomer: '/api/customers/manualDistribute', //api/student/
  },

  //学生--在读--课程计划
  class_schedules: {
    filters: '/api/config/class_schedules/fields/filters', //获取所有组件
    tableDisplay: '/api/config/class_schedules/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/class_schedules/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/class_schedules/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/class_schedules', //获取table表数据
    filtersSetting: '/api/page_setting/class_schedules/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/class_schedules/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/class_schedules/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/class_schedules/fields/display/default', //管理员设置字段显示数据
  },
  //学生--在读--课程记录/试听纪录
  class_eaches: {
    filters: '/api/config/class_eaches/fields/filters', //获取所有组件
    tableDisplay: '/api/config/class_eaches/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/class_eaches/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/class_eaches/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/class_eaches', //获取table表数据
    filtersSetting: '/api/page_setting/class_eaches/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/class_eaches/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/class_eaches/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/class_eaches/fields/display/default', //管理员设置字段显示数据
  },
  //团队
  users: {
    filters: '/api/config/users/fields/filters', //获取所有组件
    tableDisplay: '/api/config/users/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/users/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/users/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/users', //获取table表数据
    filtersSetting: '/api/page_setting/users/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/users/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/users/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/users/fields/display/default', //管理员设置字段显示数据
  },
  //试听课排课相关
  trial_class_arrangement: {
    applyForTrialClass: '/api/trial/classEach/applyForTrialClass', //提交试听课申请
    trialRequest: '/api/trial/classEach/getOne', //获取一条试听请求信息
    updateApplyDateTime: 'api/trial/classEach/updateApplyDateTime', //更新申请时间
    matchTeacherAuto: 'api/trial/classEach/getAllSuitableTeacherAuto', //获取所有匹配的老师
    matchTeacherManual: 'api/trial/classEach/getAllSuitableTeacherManual', //获取所有匹配的老师
    classEaches: '/api/trial/classEach/oneWeekForTeacher', //获取某一老师排课时间
    ccStore: '/api/class-each/arrange', //CC生成老师排课
    addTrialTrackingRecord: '/api/trial/addTrialTrackingRecord', //添加课后反馈（跟进记录）
    cancel: '/api/trial/classEach/cancel', // 取消试听课排课
  },

  //客户--试听--课程计划
  schedules: {
    filters: '/api/config/class_schedules/fields/filters', //获取所有组件
    tableDisplay: '/api/config/class_schedules/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/class_schedules/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/class_schedules/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/class_schedules', //获取table表数据
    filtersSetting: '/api/page_setting/class_schedules/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/class_schedules/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/class_schedules/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/class_schedules/fields/display/default', //管理员设置字段显示数据
    getScheduleList: '/api/class_eaches/get/schedule', //客户--试听--课程计划-点击列表
  },

  //团队--CC管理--通时通次
  call_records: {
    filters: '/api/config/call_records/fields/filters', //获取所有组件
    tableDisplay: '/api/config/call_records/fields/display', //获取所有table显示字段
    choosefilters: '/api/user_setting/call_records/fields/filters', //设置选择展示哪些筛选组件
    chooseDisplay: '/api/user_setting/call_records/fields/display', //设置table选择展示哪有字段
    tableLeads: '/api/call_records', //获取table表数据
    filtersSetting: '/api/page_setting/call_records/fields/filters', //管理员获取筛选显示数据
    displaySetting: '/api/page_setting/call_records/fields/display', //管理员获取字段显示数据
    setFilters: '/api/setting/call_records/fields/filters/default', //管理员设置筛选显示数据
    setDisplays: '/api/setting/call_records/fields/display/default', //管理员设置字段显示数据
  },
  //电话相关
  phone: {
    pannel_info: '/api/profile/dial-info', // 获取电话面板基本信息
  },
  /**
   *后台操作
   **/
  // 组织架构页面
  department: {
    sycnDingDing: '/api/syncDingUsers', //同步钉钉
    departments: '/api/departments', //列出所有部门
    deptUsers: '/api/users/department/', // 列出部门下用户，，后面要跟路由ID Route::get('users/department/{department_id}', 'UserController@getUsers');
    closeUser: '/api/user/closeUser', //封停用户
    searchUser: 'api/user/searchUser', //搜索
    callAccount: '/api/call_account', //获取分机号数据
    bindCallAccount: '/api/user/bindCallAccount', //绑定分机号
  },
  //角色权限
  role: {
    getAllRole: '/api/roles', //获取所有角色
    addRole: '/api/roles', //添加角色
    permission: '/api/permission/list', //获取所有权限列表
    rolePermission: '/api/permission/list/role', //根据角色获取对应权限
    bindingToRole: '/api/permission/bindingToRole', //绑定角色的权限
    getPermission: '/api/permission/has', //获取前端权限
    correlation: '/api/roles/correlation', //获取与用户相关的角色
    bindingRoleToUser: '/api/roles/bindingRoleToUser', //给用户绑定角色
  },
  // 渠道设置
  channel: {
    channels: '/api/channels', //获取所有渠道
    addChannel: '/api/channels/create', //新增渠道
    updatehannel: '/api/channels/update', //更新渠道信息
    deleteChannel: '/api/channels/delete', //删除渠道信息
    getMarketEvents: '/api/channel_market_event/query', //获取市场活动信息
    addMarketEvents: '/api/channel_market_event/create', //新增市场活动
    updateMarketEvents: '/api/channel_market_event/update', //更新市场活动
    deleteMarketEvents: '/api/channel_market_event/delete',
  },

  // 价格策略
  price: {
    generatePriceSchema: 'api/pricingSchema/generate', //生成价格方案
  },

  //SysConfig获取存储
  sysConfig: {
    getConfigs: '/api/admin/sys/configs',
    storeConfigs: '/api/admin/sys/configs/store',
  },
  //获取字段设置
  fieldSetting: {
    getFields: '/api/config/fields', //获取所有字段
    getFieldsGroup: '/api/config/field_groups', //获取所有字段组
    editFiledOptions: '/api/config/edit_filed_options', //编辑字段选项接口
    editFiled: '/api/config/edit_filed', //编辑字段接口
    getFieldOptions: '/api/config/field_options/get', // 获取字段选项
  },
  //用户
  user: {
    getAuthUser: '/api/users/authUser', //获取当前登录用户
  },
  // 地市
  city: {
    provinces: '/common/region/provinces', //获取所有省份接口
    areas: '/common/region/child-regions', //根据region_code获取它管辖的区域
  },
}

//拨打电话
store.state.dialInfo = '/api/profile/info'; // Get请求 /api/profile/info/2 后面跟LeadID, 查询Lead基本信息
store.state.latestTrackingRecords_1 = 'api/customer/'; //api/customer/59/tracking_records/getLatest 获取最新跟进记录
store.state.latestTrackingRecords_2 = '/tracking_records/getLatest';
store.state.dialCall = '/api/call/rongying/dial'; //拨打电话-融营
store.state.hangUpCall = '/api/call/rongying/hang-up'; //挂断电话-融营
store.state.rongyingCall = '/api/call/rongying/dial'; //拨打电话-融营
store.state.rongyingHangUpCall = '/api/call/rongying/hang-up'; //挂断电话-融营
store.state.tianrunCall = '/api/call/tianrun/dial'; //拨打电话-天润
store.state.tianrunHangUpCall = '/api/call/tianrun/hang-up'; //挂断电话-天润
store.state.tianrunCallBind = '/api/call/tianrun/call-binding'; //绑定坐席号-天润
store.state.createTrackingRecord_1 = '/api/customer/'; //拨打电话弹窗点击确定 /api/customer/10/tracking_records/store
store.state.createTrackingRecord_2 = '/tracking_records/store'; //拨打电话弹窗点击确定
store.state.sendSms = '/api/call/send-sms'; //发送短信

//提交订单
store.state.getFieldOptions = '/api/config/field_options/get'; //获取select选项
store.state.getProduct = '/api/product/get_one'; //查找单个产品
store.state.getCalculatePrice = '/api/order/beforehandCalculatePrice'; //预查产品价格
store.state.createOrders = '/api/orders/create'; //提交订单

//个人档案
store.state.studentTrackingIndex = '/api/student/trackingIndex'; //1、学生档案首页
store.state.studentInfo = '/api/student/info'; //2、学生档案详情信息
store.state.StudentDistributionRecords = '/api/student/distributionRecords'; //3、分配记录,传入main_id获取
store.state.studentTrackingList = '/api/student/trackingList'; //4、学生跟进记录列表
store.state.studentschedulesList = '/api/student/schedulesList'; //5、学生试听排课记录列表
store.state.studentOrderList = '/api/student/orderList'; //6、学生订单记录列表
store.state.getRefundRecords = '/api/orders/getRefundRecords'; //学生订单记录-查看退款详情

//优惠方案
store.state.discount = '/api/discount'; //新增优惠方案/获取优惠方案列表
store.state.onOffDiscount = '/api/discount/onOff'; //折扣包上下线
store.state.getStackable = '/api/discount/getStackable'; //获取可叠加的折扣包
store.state.editDiscount = '/api/discount/'; //修改优惠包


//获取当前时间戳
store.state.timestamp = '/php/common/serverTime'; //获取服务器时间戳
// 密码
store.state.changePwd = '/api/users/modify-pass'; //修改密码
store.state.resetPwd = '/api/users/reset-pass'; //重置密码
// 导出订单
store.state.exportAPI = '/api/orders/export';
