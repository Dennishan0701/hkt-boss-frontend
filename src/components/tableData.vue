<style lang="less">
    @import "../assets/css/tableData.less";
</style>

<template>
    <div class="lead-content">
        <div class="setFilter">
            <div class="setScreens">
                <!--筛选显示-->
                <Poptip
                        v-if="isMenu('seletion_display_Filter')"
                        placement="bottom-end"
                        width="800"
                        v-model="visibleF"
                        style="margin-right: 20px;"
                >
                    <p class="setBtn adminSetBtn" @click="getAllFilterSetting">
                        <i class="iconfont icon-shezhi1-copy"></i>筛选显示
                    </p>
                    <div class="api chooseScreens" slot="content" ok-text="yes" cancel-text="no">
                        <div class="filterSetting">
                            <div class="fL">
                                <p class="chooseTip">*设置要显示的筛选项*</p>
                                <div class="checkALL">
                                    <Checkbox
                                            :indeterminate="indeterminateF"
                                            :value="checkAllF"
                                            @click.prevent.native="handleCheckAllF"
                                    >
                                        <!--@click.prevent.native="handleCheckAllF(indeterminateF,checkAllF,allFields,pageSetting,pageFields)"-->
                                        全选
                                    </Checkbox>
                                </div>
                                <CheckboxGroup v-model="pageSetting" @on-change="checkAllGroupChangeF">
                                    <Checkbox v-for="(el,index) in allFields" :label="index" :key="index">{{el}}
                                    </Checkbox>
                                </CheckboxGroup>
                            </div>
                            <div class="fR">
                                <p class="chooseTip">*设置筛选项是否默认选中*</p>
                                <div class="checkALL">
                                    <Checkbox
                                            :indeterminate="indeterminateF2"
                                            :value="checkAllF2"
                                            @click.prevent.native="handleCheckAllF2"
                                    >全选
                                    </Checkbox>
                                </div>
                                <CheckboxGroup v-model="defultSetting" @on-change="checkAllGroupChangeF2">
                                    <Checkbox v-for="(el,index) in pageFields" :label="index" :key="index">{{el}}
                                    </Checkbox>
                                </CheckboxGroup>
                            </div>
                        </div>
                        <div class="clickBtn">
                            <Button class="cancle" @click="close">取消</Button>
                            <Button class="confirm" @click="setFilters" type="primary">确定</Button>
                        </div>
                    </div>
                </Poptip>
                <!--筛选设置-->
                <Poptip placement="bottom-end" width="349" v-model="visible">
                    <p class="setBtn">
                        <i class="iconfont icon-shezhi1-copy"></i>筛选设置
                    </p>
                    <div class="api chooseScreens" slot="content" ok-text="yes" cancel-text="no">
                        <p class="chooseTip">*设置要显示的筛选项*</p>
                        <div class="checkALL">
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :value="checkAll"
                                    @click.prevent.native="handleCheckAll"
                            >全选
                            </Checkbox>
                        </div>
                        <CheckboxGroup v-model="filterVisible" @on-change="checkAllGroupChange">
                            <Checkbox v-for="(el,index) in filtersList" :label="index" :key="index">{{el}}</Checkbox>
                        </CheckboxGroup>
                        <div class="clickBtn">
                            <Button class="cancle" @click="close">取消</Button>
                            <Button class="confirm" @click="choosefilters" type="primary">确定</Button>
                        </div>
                    </div>
                </Poptip>
            </div>
            <div class="allScreens" :class="{hidden:isHidden}">
                <data-filter
                        v-for="(item,_key) in filters"
                        :filter="item"
                        :select-obj = "filterSelectObj"
                        @requestFilter="buildRequestFilter"
                        @updateSelect = "updateFilterSelect"
                        :key="_key"
                ></data-filter>
                <p class="fold" v-if="moreHide">
          <span @click="foldScreen">
            更多筛选
            <Icon type="ios-arrow-up"/>
          </span>
                </p>
            </div>
        </div>
        <!--表格-->
        <div class="tableContent">
            <!--表格字段设置-->
            <div class="tableSetting">
                <div class="dataOperate">
                    <p>
                        已选
                        <span class="num">{{selectedNum}}</span>条数据 ：
                    </p>
                    <p class="selected" v-if="selectedNum > 0">
                        <!-- <Button v-if="btnShow.includes('manualDistribute')"
                                                        @click="manualDistribute($store.state.api.lead.manualDistribute,'手动分配','cc')">手动分配
                        </Button>-->
                        <!--推荐Leads待分配-手动分配-如果推荐人是CC,直接分配给这个人,否则筛选分配-->
                        <Button
                                v-if="isMenu('allot_to_cc') && btnShow.includes('manualDistributeCC')"
                                @click="manualDistributeCC(distribute_params.title,distribute_params.role,distribute_params.distribution_scenario)"
                        >手动分配
                        </Button>
                        <Button
                                v-if="isMenu('allot_to_cc') && btnShow.includes('manualDistribute')"
                                @click="manualDistribute(distribute_params.title,distribute_params.role,distribute_params.distribution_scenario)"
                        >手动分配
                        </Button>

                        <Button
                                v-if="isMenu('into_the_trash') && btnShow.includes('trash')"
                                class="btn3"
                                @click="leadsIntrash"
                        >进垃圾池
                        </Button>
                        <Button
                                v-if="isMenu('sign_cleanout') && btnShow.includes('markedAsCleaned')"
                                class="btn5"
                                @click="markedAsCleaned"
                        >标记为已清洗
                        </Button>
                        <Button
                                v-if="isMenu('hood_will_negotiate') && btnShow.includes('getLeadBack')"
                                class="btn2"
                                @click="getLeadBack"
                        >捞回洽谈
                        </Button>
                        <Button
                                v-if="isMenu('add_protection_list') && btnShow.includes('addProtect')"
                                class="btn2"
                                @click="addProtect"
                        >添加保护名单
                        </Button>
                        <Button
                                v-if="isMenu('audition_for') && btnShow.includes('applyForTrialClass')"
                                class="btn2"
                                @click="arrangeTrial"
                        >申请试听
                        </Button>
                        <Button
                                v-if="isMenu('give_up') && btnShow.includes('throwLeadAway')"
                                class="btn5"
                                @click="leadsGiveUp"
                        >主动放弃
                        </Button>
                        <Button
                                v-if="isMenu('create_order') &&  btnShow.includes('createOrder')"
                                class="btn2"
                                @click="placeOrderShow"
                        >生成订单
                        </Button>
                        <Button
                                v-if="isMenu('pay_in_advance') && btnShow.includes('makeDeposit')"
                                class="btn2"
                                @click="makeDeposit"
                        >支付订金
                        </Button>
                        <Button
                                v-if="isMenu('conversion_of_success') && btnShow.includes('convertSuccess')"
                                class="btn2"
                                @click="markConvertSuccess"
                        >标记为转化成功
                        </Button>
                        <Button
                                v-if="isMenu('green_channel') && btnShow.includes('createOrderNoTrial')"
                                class="btn2"
                                @click="placeOrderShow"
                        >绿色通道（免试听订单）
                        </Button>
                        <!--客户-洽谈-待分配（主管）-分配CC-->
                        <Button
                          v-if="isMenu('allot_to_cc') && btnShow.includes('distribute')"
                          class="btn2"
                          @click="distribute(distribute_params.title,distribute_params.role,distribute_params.distribution_scenario)"
                        >分配CC
                        </Button>
                        <!--客户-洽谈-我的全部-分配CC-->
                        <Button
                          v-if="isMenu('allot_to_cc-two') && btnShow.includes('distribute2')"
                          class="btn5"
                          @click="distribute(distribute_params.title,distribute_params.role,distribute_params.distribution_scenario)"
                        >分配CC
                        </Button>

                        <!--<Button v-if="isMenu('submit_payment_manually') && btnShow.includes('manualSubmitPayment')"-->
                        <!--class="btn2" @click="manualSubmitPayment">-->
                        <!--手动提交支付-->
                        <!--</Button>-->
                        <Button
                          v-if="isMenu('manually_review') && btnShow.includes('manualAudit')"
                          class="btn5"
                          @click="manualAudit"
                        >人工审核
                        </Button>
                        <Button
                                v-if="isMenu('manually_review') && btnShow.includes('manualAudit')"
                                class="btn5"
                                @click="miaomiao"
                        >拒绝流水
                        </Button>
                        <Button
                                v-if="isMenu('turn_over_to_cr') && btnShow.includes('transferToCR')"
                                class="btn5"
                                @click="transferCR"
                        >移交CR
                        </Button>
                        <Button
                                v-if="isMenu('allot_to_cr') && btnShow.includes('assignCR')"
                                class="btn5"
                                @click="manualDistribute(distribute_params.title,distribute_params.role,distribute_params.distribution_scenario)"
                        >分配CR
                        </Button>
                        <Button
                                v-if="isMenu('allot_to_cr') && btnShow.includes('redistribution')"
                                class="btn5"
                                @click="manualDistribute(distribute_params.title,distribute_params.role,distribute_params.distribution_scenario)"
                        >正式生再分配
                        </Button>
                        <Button
                                v-if="isMenu('vehicle_program_planning') && btnShow.includes('arrangeCoursePlan')"
                                class="btn5"
                                @click="arrangeCoursePlan('arrangeCoursePlan')"
                        >安排课程计划
                        </Button>
                        <Button
                                v-if="isMenu('vehicle_program_planning') &&btnShow.includes('addCoursePlan')"
                                class="btn5"
                                @click="arrangeCoursePlan('addCoursePlan')"
                        >新增课程计划
                        </Button>
                        <Button
                                v-if="isMenu('revision_of_course_plan') && btnShow.includes('changeCoursePlan')"
                                @click="changeCoursePlan()"
                                class="btn5"
                        >修改课程计划
                        </Button>
                        <Button
                                v-if="isMenu('adjust_the_class_time') && btnShow.includes('adjustClasses')"
                                class="btn5"
                                @click="showModal('adjustClasses')"
                        >调整课次
                        </Button>
                        <Button
                                v-if="isMenu('cancel_the_class_time') && btnShow.includes('cancelClasses')"
                                class="btn5"
                                @click="showModal('cancelClasses')"
                        >取消课次
                        </Button>
                        <!--<Button v-if="btnShow.includes('bindTeacher')" class="btn5" @click="bindTeacher">-->
                        <!--绑定老师-->
                        <!--</Button>-->
                        <!--安排正式课-->
                        <Button
                                v-if="isMenu('cr_courses_arranging') && btnShow.includes('arrangeCourses')"
                                class="btn5"
                                @click="arrangeCourses"
                        >排课
                        </Button>
                        <Button
                                v-if="isMenu('new_recommendations_leads') && btnShow.includes('createRecommendLead')"
                                class="btn5"
                                @click="addLeads"
                        >新增推荐Leads
                        </Button>
                        <Button
                                v-if="isMenu('audition_for') && btnShow.includes('arrangeExtendedTrial')"
                                @click="arrangeTrial('arrangeExtendedTrial')"
                                class="btn5"
                        >试听申请
                        </Button>
                        <!--不同申请试听，新增一个模块，试听类型（1、扩科 2、换老师）-->
                        <Button
                                v-if="isMenu('closed_to_apply_for') && btnShow.includes('applyForSuspension')"
                                @click="applyForSuspension"
                                class="btn5"
                        >停课申请
                        </Button>
                        <!-- <Button
                          v-if="isMenu('refund_application') && btnShow.includes('applyForRefund')"
                          class="btn5" @click="applyForRefund"
                        >退费申请
                        </Button> -->
                        <Button
                                v-if="isMenu('submit_payment_manually') && btnShow.includes('addPayRecord')"
                                class="btn5"
                                @click="addPayRecord"
                        >添加支付记录
                        </Button>
                        <Button
                                v-if="isMenu('approved') && btnShow.includes('auditPass')"
                                class="btn5"
                                @click="auditPass"
                        >审核通过
                        </Button>
                        <Button
                                v-if="isMenu('decline') && btnShow.includes('auditReject')"
                                class="btn5"
                                @click="auditReject"
                        >拒绝
                        </Button>
                        <Button
                                v-if="isMenu('modify_order_information') && btnShow.includes('editOrder')"
                                class="btn5"
                                @click
                        >修改订单信息
                        </Button>
                        <Button
                                v-if="isMenu('refund_the_deposit') && btnShow.includes('refundFund')"
                                class="btn5"
                                @click
                        >退定金
                        </Button>
                        <!--员工管理 -->
                        <Button
                                v-if="isMenu('stop_the_distribution_of') && btnShow.includes('stopDistribute')"
                                @click="switchingDistributeState('stop' )"
                                class="btn3"
                        >停止分配
                        </Button>
                        <Button
                                v-if="isMenu('recover_the_distribution_of') && btnShow.includes('resumeDistribute')"
                                @click="switchingDistributeState('recover')"
                                class="btn5"
                        >恢复分配
                        </Button>
                        <Button
                                v-if="isMenu('quit_and_handover') && btnShow.includes('handleResignAssets')"
                                @click="leaveOffice"
                                class="btn2"
                        >离职交接
                        </Button>
                        <!-- 标记学生 -->
                        <Select @on-change="studentStatusChange" v-model="studentStatus.val" v-if="studentStatus.list && btnShow.includes('markStudents')" placeholder="请选择标记" style="width:8em;margin-top: 22px; margin-left: 10px;">
                          <Option v-for="(status, index) in studentStatus.list" :value="status.key" :key="index" :label="status.value">
                            <span class="only-tag" :class="`only-tag--${studentStatus.classes[index]}`"></span>
                            <span>{{ status.value }}</span>
                          </Option>
                        </Select>
                        <!-- 流水 绑定订单 -->
                        <Button v-if="isMenu('bind_order') && btnShow.includes('bind_order')" @click="showModal('bindOrder')">绑定订单</Button>
                        <!-- 修改完成时间 -->
                        <Button
                          @click="showModal('updatePayTime')"
                          v-if="isMenu('update_payment_time')
                            && btnShow.includes('update_payment_time')"
                        >修改支付完成时间
                        </Button>
                        <!-- <Button
                          @click="showModal('updatePayTime')"
                        >修改支付完成时间
                        </Button> -->
                    </p>
                </div>
                <div class="sortTables">
                    <div class="sortData">
                        <Select class="select1" v-model="tableSelect" style="width:120px">
                            <Option
                                    v-for="(item,index) in tableSelectList"
                                    v-if="item.is_search==1"
                                    :key="index"
                                    :value="`${item.table_name}~${item.field_name}~${item.query_type}`"
                            >{{item.display_name }}
                            </Option>
                        </Select>
                        <Select v-model="relation" style="width:110px">
                            <Option
                                    v-for="(item,index) in relationList"
                                    :key="index"
                                    :value="item.key"
                            >{{item.value}}
                            </Option>
                        </Select>
                        <Input style="width:180px" v-model="keywords" placeholder="请输入搜索内容"/>
                        <p class="emptyData" @click="emptyData">
                            <i class="iconfont icon-shanchu1"></i>
                        </p>
                        <!--清空-->
                    </div>
                    <Button class="btnSearch" @click="relationClick">
                        <i class="iconfont icon-sousuo"></i>
                    </Button>
                    <div class="setTables">
                        <!--字段显示-->
                        <Poptip
                                v-if="isMenu('display_fields')"
                                placement="bottom-end"
                                width="800"
                                v-model="visibleD"
                                style="margin-right: 20px;"
                        >
                            <p class="setBtn adminSetBtn" @click="getAllDisplaySetting">
                                <i class="iconfont icon-shezhi1-copy"></i>字段显示
                            </p>
                            <div class="api chooseScreens" slot="content" ok-text="yes" cancel-text="no">
                                <div class="filterSetting">
                                    <div class="fL">
                                        <p class="chooseTip">*设置要显示的筛选项*</p>
                                        <div class="checkALL">
                                            <Checkbox
                                                    :indeterminate="indeterminateD"
                                                    :value="checkAllD"
                                                    @click.prevent.native="handleCheckAllD"
                                            >全选
                                            </Checkbox>
                                        </div>
                                        <CheckboxGroup v-model="pageSetting2" @on-change="checkAllGroupChangeD">
                                            <Checkbox v-for="(el,index) in allFields2" :label="index" :key="index">
                                                {{el}}
                                            </Checkbox>
                                        </CheckboxGroup>
                                    </div>
                                    <div class="fR">
                                        <p class="chooseTip">*设置筛选项是否默认选中*</p>
                                        <div class="checkALL">
                                            <Checkbox
                                                    :indeterminate="indeterminateD2"
                                                    :value="checkAllD2"
                                                    @click.prevent.native="handleCheckAllD2"
                                            >全选
                                            </Checkbox>
                                        </div>
                                        <CheckboxGroup v-model="defultSetting2" @on-change="checkAllGroupChangeD2">
                                            <Checkbox v-for="(el,index) in pageFields2" :label="index" :key="index">
                                                {{el}}
                                            </Checkbox>
                                        </CheckboxGroup>
                                    </div>
                                </div>
                                <div class="clickBtn">
                                    <Button class="cancle" @click="close">取消</Button>
                                    <Button class="confirm" @click="setFilters2" type="primary">确定</Button>
                                </div>
                            </div>
                        </Poptip>
                        <!--字段设置-->
                        <Poptip placement="bottom-end" width="349" v-model="visible2">
                            <p class="setBtn">
                                <i class="iconfont icon-shezhi1-copy"
                                @click.stop="isStyleDebug = !isStyleDebug"
                                ></i>字段设置
                            </p>
                            <div class="api chooseScreens" slot="content" ok-text="yes" cancel-text="no">
                                <p class="chooseTip">*设置要显示的字段*</p>
                                <div class="checkALL">
                                    <Checkbox
                                            :indeterminate="indeterminate2"
                                            :value="checkAll2"
                                            @click.prevent.native="handleCheckAll2"
                                    >全选
                                    </Checkbox>
                                </div>
                                <CheckboxGroup v-model="tableVisible" @on-change="checkAllGroupChange2">
                                    <Checkbox v-for="(el,index) in tableFieldList" :label="index" :key="index">{{el}}
                                    </Checkbox>
                                </CheckboxGroup>
                                <div class="clickBtn">
                                    <Button class="cancle" @click="close2">取消</Button>
                                    <Button class="confirm" @click="chooseDisplay" type="primary">确定</Button>
                                </div>
                            </div>
                        </Poptip>
                    </div>
                </div>
            </div>
            <!--表格内容-->
            <Table
                    class="tableData"
                    @on-selection-change="selectChange"
                    @on-sort-change="sortChange"
                    :columns="tableHeadersNew"
                    :data="tableList"
                    border
            >
                <!--1、资源-->
                <!--提示-->
                <!-- <template slot-scope="{ row, index }" slot="res_tip">
                  <div class="table_name">
                    <Icon type="ios-leaf"/>
                    <Icon type="ios-leaf"/>
                  </div>
                </template> -->
                <!--name-->
                <template slot-scope="{ row, index }" slot="res_basic_info_name">
                    <div class="table_name">
            <span
                    v-if="isMenu('view_personal_details')"
                    @click="showStudentProfile(row.basic_info_main_id)"
            >{{ row.basic_info_name }}</span>
                        <span v-else>{{ row.basic_info_name }}</span>
                    </div>
                </template>
                <!--mobile-->
                <template slot-scope="{ row, index }" slot="res_basic_info_mobile">
                    <div class="table_mobile">
                        <span class="mobileNum">1</span>
                        <span
                                v-if="isMenu('making_call')"
                                @click="dialModalShow(row.basic_info_mobile,row.basic_info_main_id)"
                        >{{ row.basic_info_mobile }}</span>
                        <span v-else>{{ row.basic_info_mobile }}</span>
                        <i
                                v-if="isMenu('check_phone_number')"
                                class="seeMobile iconfont icon-yanjing"
                                @click="seeMobile(row)"
                        ></i>
                    </div>
                </template>
                <!--2、客户-->
                <!--提示-->
                <template slot-scope="{ row, index }" slot="customer_tip">
                    <div class="table_name">
                        <Icon type="ios-leaf"/>
                        <Icon type="ios-leaf"/>
                    </div>
                </template>
                <!--name-->
                <template slot-scope="{ row, index }" slot="customer_basic_info_name">
                    <div class="table_name">
            <span
                    v-if="isMenu('view_personal_details')"
                    @click="showStudentProfile(row.basic_info_main_id)"
            >{{ row.basic_info_name }}</span>
                        <span v-else>{{ row.basic_info_name }}</span>
                    </div>
                </template>
                <!--mobile-->
                <template slot-scope="{ row, index }" slot="customer_basic_info_mobile">
                    <div class="table_mobile">
                        <span class="mobileNum">1</span>
                        <span
                                v-if="isMenu('making_call')"
                                @click="dialModalShow(row.basic_info_mobile,row.basic_info_main_id)"
                        >{{ row.basic_info_mobile }}</span>
                        <span v-else>{{ row.basic_info_mobile }}</span>
                        <i
                                v-if="isMenu('check_phone_number')"
                                class="seeMobile iconfont icon-yanjing"
                                @click="seeMobile(row)"
                        ></i>
                    </div>
                </template>
                <!--3、学生-->
                <!--提示-->
                <template v-if="row.customers_student_status" slot-scope="{ row, index }" slot="student_tip">
                  <Tag :color="studentStatus.classes[row.customers_student_status - 1]">{{ studentStatus.map[row.customers_student_status] }}</Tag>
                </template>
                <!--name-->
                <template slot-scope="{ row, index }" slot="student_basic_info_name">
                    <div class="table_name">
            <span
                    v-if="isMenu('view_personal_details')"
                    @click="showStudentProfile(row.basic_info_main_id)"
            >{{ row.basic_info_name }}</span>
                        <span v-else>{{ row.basic_info_name }}</span>
                    </div>
                </template>
                <!--mobile-->
                <template slot-scope="{ row, index }" slot="student_basic_info_mobile">
                    <div class="table_mobile">
                        <!--<span class="mobileNum">1</span>-->
                        <span
                                v-if="isMenu('making_call')"
                                @click="dialModalShow(row.basic_info_mobile,row.basic_info_main_id)"
                        >{{ row.basic_info_mobile }}</span>
                        <span v-else>{{ row.basic_info_mobile }}</span>
                        <i
                                v-if="isMenu('check_phone_number')"
                                class="seeMobile iconfont icon-yanjing"
                                @click="seeMobile(row)"
                        ></i>
                    </div>
                </template>
                <!--学生-在读-维护学生（恢复上课）-->
                <template slot-scope="{ row, index }" slot="recover_classes">
                    <Button
                            v-if="row.customers_suspend_classes_count>0"
                            @click="recoverClasses(row)"
                            type="info"
                            size="small"
                    >恢复上课
                    </Button>
                    <p v-else-if="row.customers_suspend_classes_count<0">--</p>
                </template>
                <!--学生-在读-课程计划（作废）-->
                <template slot-scope="{ row, index }" slot="student_schedules">
                    <!--必须绑定老师，才可以再作废-->
                    <Button
                            v-if="row.class_schedules_schedule_status==1"
                            :disabled="row.class_schedules_tr_id==0"
                            @click="toVoid(row)"
                            type="info"
                            size="small"
                    >作废
                    </Button>
                    <p v-else-if="row.class_schedules_schedule_status==2">已作废</p>
                    <p v-else-if="row.class_schedules_schedule_status==3">已结课</p>
                </template>
                <!--//学生-在读-课程计划-查看课次-->
                <template slot-scope="{ row, index }" slot="seeClasses">
                    <Button
                            @click="showCourseScheduleList($store.state.api.schedules.getScheduleList,row.class_schedules_id)"
                            type="info"
                            size="small"
                    >查看课次
                    </Button>
                </template>
                <!--学生-在读-课程计划（绑定老师）-->
                <template slot-scope="{ row, index }" slot="student_bindTeacher">
                    <Button
                            v-if="row.class_schedules_tr_id==0"
                            @click="bindTeacher(row)"
                            type="info"
                            size="small"
                    >绑定老师
                    </Button>
                    <p v-else-if="row.class_schedules_tr_id!=0">已绑定</p>
                </template>
                <!--4、团队-->
                <!--提示-->
                <!--<template slot-scope="{ row, index }" slot="team_tip">-->
                <!--<div class="table_name">-->
                <!--&lt;!&ndash;<Icon type="ios-leaf"/>&ndash;&gt;-->
                <!--&lt;!&ndash;<Icon type="ios-leaf"/>&ndash;&gt;-->
                <!--</div>-->
                <!--</template>-->
                <!--name-->
                <template slot-scope="{ row, index }" slot="team_users_name">
                    <div class="table_name">
                        <!--<Icon type="ios-leaf"/>-->
                        <!--<Icon type="ios-leaf"/>-->
                        <span @click="showTMKWorkbench(row.users_id)">{{ row.users_name }}</span>
                    </div>
                </template>
                <!--mobile-->
                <template slot-scope="{ row, index }" slot="team_users_mobile">
                    <div class="table_mobile">
                        <!--<span>{{ row.basic_info_mobile }}</span>-->
                        <span>{{ row.users_mobile }}</span>
                    </div>
                </template>
                <!--5、结算-->
                <!--提示-->
                <!--<template slot-scope="{ row, index }" slot="deal_tip">-->
                <!--<div class="table_name">-->
                <!--</div>-->
                <!--</template>-->
                <!--name-->
                <template slot-scope="{ row, index }" slot="deal_basic_info_name">
                    <div class="table_name">
            <span
                    v-if="isMenu('view_personal_details')"
                    @click="showStudentProfile(row.basic_info_main_id)"
            >{{ row.basic_info_name }}</span>
                        <span v-else>{{ row.basic_info_name }}</span>
                    </div>
                </template>
                <!--mobile-->
                <template slot-scope="{ row, index }" slot="deal_basic_info_mobile">
                    <div class="table_mobile">
                        <!--<span class="mobileNum">1</span>-->
                        <span
                                v-if="isMenu('making_call')"
                                @click="dialModalShow(row.basic_info_mobile,row.basic_info_main_id)"
                        >{{ row.basic_info_mobile }}</span>
                        <span v-else>{{ row.basic_info_mobile }}</span>
                    </div>
                </template>
                <!--结算-订单-全部-展示列表操作按钮-->
                <template slot-scope="{ row, index }" slot="listShow">
                    <div class="table_operation">
                        <!--请求数据列表url,请求数据列表id-->
                        <Button
                                type="warning"
                                size="small"
                                @click="showCourseScheduleList($store.state.api.order.getPayments,row.orders_id)"
                        >查看流水
                        </Button>
                    </div>
                </template>
                <!--结算-订单-待支付/待审核-付款详情（查看详情）-->
                <template slot-scope="{ row, index }" slot="payDetail">
                    <div class="table_operation">
                        <!--请求数据列表url,请求数据列表id-->
                        <Button
                                type="warning"
                                size="small"
                                @click="showCourseScheduleList($store.state.api.order.getPayments,row.orders_id,'payDetail')"
                        >查看详情
                        </Button>
                    </div>
                </template>
                <!--结算-流水-全部-支付链接-->
                <template slot-scope="{ row, index }" slot="deal_paymentLink">
                    <Button type="info" size="small" @click="showAlipayPic(row, index)">支付链接</Button>
                </template>

                <!--客户-试听-试听纪录-展示排课、列表操作按钮-->
                <!--学生-在读-试听纪录-展示排课、列表操作按钮-->
                <template slot-scope="{ row, index }" slot="operation">
                    <div class="table_operation">
                        <!-- 试听课排课操作按钮 -->
                        <template v-if="api.tab.b =='class_each_list' || api.tab.b =='trial_class_each'">
                            <Button
                                    type="success"
                                    size="small"
                                    @click="showtrialClassArrangement(row.class_eaches_id)"
                                    v-if="isMenu('courses_arranging') && row.class_eaches_class_status_format =='已申请'"
                            >排课
                            </Button>
                            <!--<router-link tag="a" target="_blank" :to="{path:'/trialClassArrangement',params:{id:row.class_eaches_id}}">排课</router-link>-->


                            <Button
                                    type="info"
                                    size="small"
                                    v-if="isMenu('added_feedback') && row.class_eaches_class_status_format =='已排课'"
                                    @click="showtrialClassArrangement(row.class_eaches_id)"
                            >添加反馈
                            </Button>
                            <Button
                                    type="error"
                                    size="small"
                                    v-if="isMenu('added_feedback') && row.class_eaches_cancel_class_cause < 20 && row.class_eaches_class_status_format =='已取消'"
                                    @click="showtrialClassArrangement(row.class_eaches_id)"
                                    class="ml-10"
                            >已取消

                            </Button>

                            <Button
                                    type="warning"
                                    size="small"
                                    v-if="isMenu('added_feedback') && row.class_eaches_cancel_class_cause == 20 && row.class_eaches_class_status_format =='已取消'"
                                    class="ml-10"

                                    @click="showClassCancelRemark(row.class_eaches_cancel_class_remark)"
                            >已驳回

                            </Button>

                            <Button
                                    :type="row.class_eaches_trial_class_detail_format =='转化成功'?'primary':'default'"
                                    v-if="isMenu('see_feedback') && row.class_eaches_class_status_format =='已上课'"
                                    size="small"
                                    @click="showtrialClassArrangement(row.class_eaches_id)"
                            >{{row.class_eaches_trial_class_detail_format =='转化成功'?'转化成功':'查看反馈'}}
                            </Button>
                        </template>
                    </div>
                </template>
            </Table>
            <div class="tableFoot"  v-if="api.tab && api.tab.a === 'deal.order' && isMenu('export')">
                <p class="mt-20"  v-if="total_actual_amount">订单实付金额统计：{{total_actual_amount}} 元</p>
                <Button class="exportBtn" v-if="api.tab.b!='cancel'" @click="exportOrder">导出</Button>
            </div>
            <!--分页-->
            <Page
              :current="pageCurrent"
                    :total="pageTotal"
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    show-total
            />
        </div>
        <!--弹窗-->
        <manual-distribute-modal
                v-if="modalType=='manualDistributeModal'"
                @reFresh="reFresh"
                ref="manualDistributeModal"
        ></manual-distribute-modal>
        <marked-as-cleaned-modal
                v-if="modalType=='markedAsCleanedModal'"
                @reFresh="reFresh"
                ref="markedAsCleanedModal"
        ></marked-as-cleaned-modal>
        <dialModal v-if="modalType=='dialModal'" @reFresh="reFresh" ref="dialModal"></dialModal>
        <transferCRModal v-if="modalType=='transferCRModal'" @reFresh="reFresh" ref="transferCRModal"></transferCRModal>
        <apply-for-trial-class-modal
                v-if="modalType=='applyForTrialClassModal'"
                @reFresh="reFresh"
                ref="applyForTrialClassModal"
        ></apply-for-trial-class-modal>
        <create-lead-modal v-if="modalType=='createLeadModal'" @reFresh="reFresh"
                           ref="createLeadModal"></create-lead-modal>
        <applyForRefundModal
                v-if="modalType=='applyForRefundModal'"
                @reFresh="reFresh"
                ref="applyForRefundModal"
        ></applyForRefundModal>
        <addPayRecord v-if="modalType=='addPayRecord'" @reFresh="reFresh" ref="addPayRecord"></addPayRecord>
        <auditReject v-if="modalType=='auditReject'" @reFresh="reFresh" ref="auditReject"></auditReject>
        <bind-order v-if="modalType=='bindOrder'" @reFresh="reFresh" ref="bindOrder"></bind-order>
        <update-pay-time v-if="modalType=='updatePayTime'" @reFresh="reFresh" ref="updatePayTime"></update-pay-time>
        <place-order-modal v-if="modalType=='placeOrderModal'" ref="placeOrderModal"
                           @reFresh="reFresh"></place-order-modal>
        <manual-submit-payment-modal
                v-if="modalType=='manualSubmitPaymentModal'"
                ref="manualSubmitPaymentModal"
                @reFresh="reFresh"
        ></manual-submit-payment-modal>
        <!--安排课程计划-->
        <arrangeCoursePlan
                v-if="modalType=='arrangeCoursePlan'"
                ref="arrangeCoursePlan"
                @reFresh="reFresh"
        ></arrangeCoursePlan>
        <!--修改课程计划-->
        <changeCoursePlan
                v-if="modalType=='changeCoursePlan'"
                ref="changeCoursePlan"
                @reFresh="reFresh"
        ></changeCoursePlan>
        <!--调整课次-->
        <adjustClasses v-if="modalType=='adjustClasses'" ref="adjustClasses" @reFresh="reFresh"></adjustClasses>
        <!--取消课次-->
        <cancelClasses v-if="modalType=='cancelClasses'" ref="cancelClasses" @reFresh="reFresh"></cancelClasses>
        <!--绑定老师-->
        <bindTeacher v-if="modalType=='bindTeacher'" ref="bindTeacher" @reFresh="reFresh"></bindTeacher>
        <!--排课-->
        <arrangeCourses v-if="modalType=='arrangeCourses'" ref="arrangeCourses" @reFresh="reFresh"></arrangeCourses>
        <!--停课申请-->
        <applyForSuspension
                v-if="modalType=='applyForSuspension'"
                ref="applyForSuspension"
                @reFresh="reFresh"
        ></applyForSuspension>

        <dataList v-if="modalType=='dataList'" ref="dataList"></dataList>
    </div>
</template>

<script>
  import {isMenu} from "@/api/common";
  import DataFilter from "@/components/filter";
  import {unfold} from "@/api/common";
  import {mapGetters} from "vuex";
  import moment from 'moment';

  import manualDistributeModal from "../pages/index/views/res/modal/manualDistributeModal";
  import markedAsCleanedModal from "../pages/index/views/res/modal/markedAsCleanedModal";
  import transferCRModal from "../pages/index/views/res/modal/transferCRModal";
  import dialModal from "../pages/index/views/res/modal/dialModal";
  import applyForTrialClassModal from "../pages/index/views/customer/modal/applyForTrialClassModal";
  import placeOrderModal from "../pages/index/views/customer/modal/placeOrderModal";
  import createLeadModal from "../pages/index/views/res/modal/createLeadModal";
  import applyForRefundModal from "../pages/index/views/res/modal/applyForRefundModal";
  import addPayRecord from "../pages/index/views/deal/modal/addPayRecord";
  import auditReject from "../pages/index/views/deal/modal/auditReject";
  import bindOrder from '../pages/index/views/deal/modal/bindOrder';
  import updatePayTime from '../pages/index/views/deal/modal/updatePayTime.vue';
  import manualSubmitPaymentModal from "../pages/index/views/deal/modal/manualSubmitPaymentModal";
  import arrangeCoursePlan from "../pages/index/views/student/modal/arrangeCoursePlan";
  import changeCoursePlan from "../pages/index/views/student/modal/changeCoursePlan";
  import arrangeCourses from "../pages/index/views/student/modal/arrangeCourses";
  import adjustClasses from "../pages/index/views/student/modal/adjustClasses";
  import cancelClasses from "../pages/index/views/student/modal/cancelClasses";
  import bindTeacher from "../pages/index/views/student/modal/bindTeachers";
  import applyForSuspension from "../pages/index/views/student/modal/applyForSuspension";
  import dataList from "../pages/index/views/res/modal/dataList";
  import {switchingDistributeState, leaveOffice, codeWidthStyle, changeStudentStatus} from "./postToApi";
  import {getFieldOptions} from '../pages/index/views/customer/getData'

  export default {
    components: {
      DataFilter,
      manualDistributeModal,
      markedAsCleanedModal,
      dialModal,
      transferCRModal,
      applyForTrialClassModal,
      createLeadModal,
      applyForRefundModal,
      addPayRecord,
      auditReject,
      bindOrder,
      updatePayTime,
      dataList,
      placeOrderModal,
      manualSubmitPaymentModal,
      arrangeCoursePlan,
      changeCoursePlan,
      arrangeCourses,
      adjustClasses,
      cancelClasses,
      bindTeacher,
      applyForSuspension,
      createLeadModal
    },
    async updated() {
      if (this.$store.state.fetchLoading === 'false' || this.api.tab) {
        const s_status = this.studentStatus
        if (this.api.tab && /student/.test(this.api.tab.a) && !s_status.getted) {
          s_status.getted = true
          s_status.list = await getFieldOptions('student_status')
          s_status.list.forEach(status => {
            s_status.map[status.key] = status.value
          })
        }
      }
    },
    data() {
      return {
        filterSelectObj: {},
        isStyleDebug: true,
        tableHeadersNew: [],
        nyanyatext: '',
        // getAllfiltersAPI: this.$store.state.filters, //获取所有组件api
        // tableDisplayAPI: this.$store.state.tableDisplay, //获取所有table显示字段api
        // choosefiltersAPI: this.$store.state.choosefilters, //设置选择展示哪些筛选组件
        // chooseDisplayAPI: this.$store.state.chooseDisplay, //设置table选择展示哪有字段
        // tableDataAPI: this.$store.state.tableLeads, //获取table表数据
        filters: [], //所有已选择的筛选条件(筛选条件具体数据)
        filtersList: [], //所有可选择的筛选条件（筛选设置里数据）
        filterVisible: [], //所有已选择的筛选条件的key（筛选设置里选中的值）
        tableSelectList: [], //表格筛选条件
        tableFieldList: [], //所有可选择的table字段名称（字段设置里数据）
        tableVisible: [], //所有已选择的筛选条件的key（字段设置选中的值）
        tableHeaders: [], //所有已选择的table字段(表格的表头数据)
        query_conditions: {}, //子true组件filter.vue选择值改变传来
        moreHide: true, //更多筛选是否显示
        isHidden: true, //折叠面板是否隐藏一部分
        //筛选设置
        visible: false, //筛选设置是否隐藏
        indeterminate: true, //筛选设置checkBox全选
        checkAll: false, //筛选设置checkBox全选
        //字段设置
        visible2: false, //字段设置是否隐藏
        indeterminate2: true, //字段设置checkBox全选
        checkAll2: false, //字段设置checkBox全选
        //筛选显示
        visibleF: false, //筛选显示是否隐藏（管理员设置）
        indeterminateF: true, //筛选显示checkBox全选
        checkAllF: false, //筛选显示checkBox全选
        allFields: [], //所有fields
        pageSetting: [], //选中的fields的key
        pageFields: {}, //选中的fieldsd的键值对
        defultSetting: [], //在选中的fields，默认勾选显示fields
        indeterminateF2: true, //筛选显示中（右侧默认选中checkBox全选）
        checkAllF2: false, //筛选显示中（右侧默认选中checkBox全选）
        //字段显示
        visibleD: false, //字段显示是否隐藏（管理员设置）
        indeterminateD: true, //筛选显示checkBox全选
        checkAllD: false, //筛选显示checkBox全选
        allFields2: [], //所有fields
        pageSetting2: [], //选中的fields的key
        pageFields2: {}, //选中的fieldsd的键值对
        defultSetting2: [], //在选中的fields，默认勾选显示fields
        indeterminateD2: true, //筛选显示中（右侧默认选中checkBox全选）
        checkAllD2: false, //筛选显示中（右侧默认选中checkBox全选）
        //表格数据
        selectedNum: 0, //选择的表格数据个数
        selectionRows: [], //选择的表格数据
        tableSelect: "", //选择的表格筛选字段
        tableList: [], //表格数据
        pageTotal: 0, //页码总数
        formItem: {
          //请求表格数据的条件
          page: 1,
          size: 10,
          query_conditions: [],
          additional_conditions: [],
          keywords_conditions: [],
          sort_conditions: [],
          tab: this.api.tab
        },
        keywords: "",
        relation: "like",
        relationList: [
          {key: "like", value: "包含"},
          // {key: ">", value: "大于"},
          // {key: ">=", value: "大于等于"},
          {key: "=", value: "等于"},
          // {key: "<", value: "小于"},
          // {key: "<=", value: "小于等于"}
        ],
        is_mine: [0, 1],
        queryList: [],
        modalType: "", //弹窗类型
        total_actual_amount: "",
        studentStatus: {
          getted: false,
          list: '',
          val: '',
          map: {},
          classes: ['default', 'success', 'primary', 'warning', 'error']
        },
      };
    },
    computed: {
      ...mapGetters(["fetchModal", "clickOK"]),
      isDeal() {
        return /deal/.test(this.api.tab && this.api.tab.a)
      },
      pageCurrent() {
        return this.formItem.page
      }
    },
    mounted() {
      // this.getAllfilters();
      // this.getTableDisplay();
      // this.getTableData();
      // this.getAllFilterSetting();
      // this.getAllDisplaySetting();
    },
    watch: {
      tableHeaders(value) {
        this.tableHeadersNew = value.map(i => {
          const setWidthStyle = localStorage.widthStyle ? JSON.parse(localStorage.widthStyle) : {}
          const fixWidthStyle = {
            ...codeWidthStyle,
            ...setWidthStyle,
          }
          return {
            ...i,
            width: fixWidthStyle[i.key] || i.width,
            renderHeader: (h, params) => {
              return (
                <div>
                  {params.column.title}
                  <div style={this.isStyleDebug && "display: none"}>
                    <div
                      onClick={() => {
                        params.column.width = +params.column.width + 1;
                        const localStyle = localStorage.widthStyle ? JSON.parse(localStorage.widthStyle) : {}
                        const widthStyle = {...localStyle}
                        widthStyle[params.column.key] = +params.column.width
                        localStorage.widthStyle = JSON.stringify(widthStyle)
                      }}
                    >
                      +
                    </div>
                    <input type="number" style="width: 40px"
                    v-model={params.column.width}
                    onBlur={(value)=>{
                      const localStyle = localStorage.widthStyle ? JSON.parse(localStorage.widthStyle) : {}
                      const widthStyle = {...localStyle}
                      widthStyle[params.column.key] = +params.column.width
                      localStorage.widthStyle = JSON.stringify(widthStyle)
                    }}
                    /> px
                    <div
                      onClick={() => {
                        params.column.width = +params.column.width - 1;
                        const localStyle = localStorage.widthStyle ? JSON.parse(localStorage.widthStyle) : {}
                        const widthStyle = {...localStyle}
                        widthStyle[params.column.key] = +params.column.width
                        localStorage.widthStyle = JSON.stringify(widthStyle)
                      }}
                    >
                      -
                    </div>
                  </div>
                </div>
              );
            }
          };
        });
      },
      //监听弹窗点击了确定
      clickOK(newValue, oldValue) {
        //（普通watch,这种只能监听基础类型的变量）
        console.log(newValue);
        if (newValue > 0) {
          //如果点击了弹窗的确定
          console.log("点击确定了");
          this.getTableData();
        }
      },
      // 父组件isRefresh变量改变
      isRefresh(newValue, oldValue) {
        // console.log(newValue);
        // if (newValue) {
        //   this.getTableData();
        // }
        this.getTableData();
      },
      //监听父组件传过来的api是否变化
      api: {
        //（对象watch,这种监听对象方法）
        handler(newValue, oldValue) {
          // 在store中记录当前的tab页名称
          const TAB_KEY = `${newValue.tab.a}.${newValue.tab.b}`
          this.$store.commit('UPDATE_CURRENT_TAB', TAB_KEY)

          //初始化formItem
          this.formItem.tab = newValue.tab;
          this.formItem.page = this.$store.state.pageMap[this.$store.state.currentTab] || 1;
          this.formItem.size = 10;
          this.formItem.query_conditions = [];
          this.formItem.additional_conditions = [];
          this.formItem.keywords_conditions = [];
          this.formItem.sort_conditions = [];
          this.getAllfilters();
          this.getTableDisplay();
          this.getTableData();
          // this.getAllFilterSetting();
          // this.getAllDisplaySetting();
          // 清空table选择数据
          this.selectedNum = 0;
          sessionStorage.setItem("selectionRows", "");
          this.selectionRows = [];

          //清空初始化
        },
        deep: true
      }
    },
    methods: {
      updateFilterSelect(obj) {
        this.filterSelectObj = Object.assign({}, this.filterSelectObj, obj)
      },
      successToast() {},
      async studentStatusChange(student_status) {
        if (!student_status) return
        const ids = this.selectionRows && Array.isArray(this.selectionRows) && this.selectionRows.map(e => e.customers_id)
        if (ids) {
          let res = await changeStudentStatus({
            ids,
            student_status
          })
          if (res) this.$Notice.success({ desc: '修改成功！', duration: 1.5 }),this.reFresh()
          this.studentStatus.val = ''
        }
      },
      switchingDistributeState(operationType) {
        switchingDistributeState(this, operationType);
      },
      leaveOffice() {
        leaveOffice(this);
      },
      isMenu,
      showAlipayPic(row, index) {
        const {
          payments_transaction_type,
          payments_transaction_type_format
        } = row;
        const success = (name, img) => {
          this.$Modal.info({
            title: `${name}支付的二维码`,
            content: `<div
            style="
              height: 256px;
              background-image: url(/static/images/qrcode/${img}.jpg);
              background-repeat: no-repeat;
              background-position: unset;
              background-size: contain;
            "
            ></div>`
          });
        };
        const failure = () => {
          this.$Message.warning({
            content: "尚未绑定支付方式"
          });
        };
        if (
          +payments_transaction_type === 1 &&
          payments_transaction_type_format === "支付宝"
        ) {
          success(payments_transaction_type_format, "alipay");
        } else if (
          +payments_transaction_type === 2 &&
          payments_transaction_type_format === "微信"
        ) {
          success(payments_transaction_type_format, "wecheck");
        } else {
          failure();
        }
      },
      //点击弹窗
      modalShow() {
        this.$store.commit("FETCH_MODAL", "true");
        // this.$store.commit("CLICK_OK",0);
      },
      //筛选显示Start
      //获取管理员（设置筛选显示）的所有数据
      getAllFilterSetting() {
        this.$axios
          .get(this.api.filtersSettingAPI, {
            params: {
              a: this.api.tab.a,
              b: this.api.tab.b
            },
            loading: false
          })
          .then(res => {
            this.allFields = res.data.data.all_fields; //所有fields
            this.pageSetting = res.data.data.page_setting.map(String); //将数组的number转换为字符串;//选中的fields
            this.pageFields = res.data.data.page_fields; //选中的fields的键值对
            this.defultSetting = res.data.data.defult_user_setting; //在选中的fields，默认勾选显示fields
          });
      },
      //筛选显示中（左侧筛选设置）checkBox
      checkAllGroupChangeF(data) {
        // console.log(this.pageSetting);
        // console.log(data.length);
        // console.log(Object.keys(this.allFields).length);
        if (data.length === Object.keys(this.allFields).length) {
          this.indeterminateF = false;
          this.checkAllF = true;
          this.pageFields = this.allFields;
        } else if (data.length > 0) {
          this.indeterminateF = true;
          this.checkAllF = false;
          // console.log(data);
          // console.log(this.defultSetting);
          // console.log(this.pageSetting);
          // console.log(this.pageFields);
          // console.log(this.allFields);
          this.pageFields = {};
          let obj = [];
          for (let i in this.pageSetting) {
            let key = this.pageSetting[i];
            let value = this.allFields[key];
            if (this.defultSetting.includes(key)) {
              obj.push(key);
            }
            this.$set(this.pageFields, key, value); //pageFields新增选中的键值对
          }
          this.defultSetting = obj;
          // console.log(obj);
        } else {
          this.indeterminateF = false;
          this.checkAllF = false;
          this.pageFields = [];
        }
      },
      //筛选显示中（左侧筛选设置）点击全选
      // handleCheckAllF(indeterminateF,checkAllF,allFields,pageSetting,pageFields) {
      //   console.log(indeterminateF);
      //   if (indeterminateF) {
      //     this[checkAllF] = false;
      //   } else {
      //     this[checkAllF] = !checkAllF;
      //   }
      //   indeterminateF = false;
      //
      //   if (checkAllF) {//全选
      //     for (let i in allFields) {
      //       pageSetting.push(i);
      //       pageFields = allFields;
      //     }
      //   } else {//取消全选
      //     pageSetting = [];
      //     pageFields = [];
      //   }
      // },
      handleCheckAllF() {
        if (this.indeterminateF) {
          this.checkAllF = false;
        } else {
          this.checkAllF = !this.checkAllF;
        }
        this.indeterminateF = false;

        if (this.checkAllF) {
          //全选
          for (let i in this.allFields) {
            this.pageSetting.push(i);
            this.pageFields = this.allFields;
          }
        } else {
          //取消全选
          this.pageSetting = [];
          this.pageFields = [];
        }
      },
      //筛选显示中（右侧默认选中）点击checkBox
      checkAllGroupChangeF2(data) {
        console.log(data.length);
        console.log(Object.keys(this.pageFields).length);
        if (data.length === Object.keys(this.pageFields).length) {
          this.indeterminateF2 = false;
          this.checkAllF2 = true;
        } else if (data.length > 0) {
          this.indeterminateF2 = true;
          this.checkAllF2 = false;
        } else {
          this.indeterminateF2 = false;
          this.checkAllF2 = false;
        }
      },
      //筛选显示中（右侧默认选中）点击全选
      handleCheckAllF2() {
        if (this.indeterminateF2) {
          this.checkAllF2 = false;
        } else {
          this.checkAllF2 = !this.checkAllF2;
        }
        this.indeterminateF2 = false;

        if (this.checkAllF2) {
          //全选
          for (let i in this.pageFields) {
            this.defultSetting.push(i);
          }
        } else {
          //取消全选
          this.defultSetting = [];
        }
      },
      //筛选显示中点击确定
      setFilters() {
        this.$axios
          .post(this.api.setFiltersAPI, {
            page_setting: this.pageSetting,
            defult_user_setting: this.defultSetting,
            tab: this.api.tab
          })
          .then(res => {
            this.visibleF = false;
            this.getAllfilters();
          });
      },
      //筛选显示end
      //字段显示Start
      //获取管理员（设置字段显示）的所有数据
      getAllDisplaySetting() {
        this.$axios
          .get(this.api.displaySettingAPI, {
            params: {
              a: this.api.tab.a,
              b: this.api.tab.b
            },
            loading: false
          })
          .then(res => {
            this.allFields2 = res.data.data.all_fields; //所有fields
            this.pageSetting2 = res.data.data.page_setting.map(String); //将数组的number转换为字符串;//选中的fields
            this.pageFields2 = res.data.data.page_fields; //选中的fields的键值对
            this.defultSetting2 = res.data.data.defult_user_setting; //在选中的fields，默认勾选显示fields
          });
      },
      //字段显示中（左侧筛选设置）checkBox
      checkAllGroupChangeD(data) {
        if (data.length === Object.keys(this.allFields2).length) {
          this.indeterminateD = false;
          this.checkAllD = true;
          this.pageFields2 = this.allFields2;
        } else if (data.length > 0) {
          this.indeterminateD = true;
          this.checkAllD = false;
          this.pageFields2 = {};
          let obj = [];
          for (let i in this.pageSetting2) {
            let key = this.pageSetting2[i];
            let value = this.allFields2[key];
            if (this.defultSetting2.includes(key)) {
              obj.push(key);
            }
            this.$set(this.pageFields2, key, value); //pageFields新增选中的键值对
          }
          this.defultSetting2 = obj;
        } else {
          this.indeterminateD = false;
          this.checkAllD = false;
          this.pageFields2 = [];
        }
      },
      //字段显示中（左侧筛选设置）点击全选
      handleCheckAllD() {
        if (this.indeterminateD) {
          this.checkAllD = false;
        } else {
          this.checkAllD = !this.checkAllD;
        }
        this.indeterminateD = false;

        if (this.checkAllD) {
          //全选
          for (let i in this.allFields2) {
            this.pageSetting2.push(i);
            this.pageFields2 = this.allFields2;
          }
        } else {
          //取消全选
          this.pageSetting2 = [];
          this.pageFields2 = [];
        }
      },
      //字段显示中（右侧默认选中）点击checkBox
      checkAllGroupChangeD2(data) {
        // console.log(data.length);
        // console.log(Object.keys(this.pageFields2).length);
        if (data.length === Object.keys(this.pageFields2).length) {
          this.indeterminateD2 = false;
          this.checkAllD2 = true;
        } else if (data.length > 0) {
          this.indeterminateD2 = true;
          this.checkAllD2 = false;
        } else {
          this.indeterminateD2 = false;
          this.checkAllD2 = false;
        }
      },
      //字段显示中（右侧默认选中）点击全选
      handleCheckAllD2() {
        if (this.indeterminateD2) {
          this.checkAllD2 = false;
        } else {
          this.checkAllD2 = !this.checkAllD2;
        }
        this.indeterminateD2 = false;

        if (this.checkAllD2) {
          //全选
          for (let i in this.pageFields2) {
            this.defultSetting2.push(i);
          }
        } else {
          //取消全选
          this.defultSetting2 = [];
        }
      },
      //字段显示中点击确定
      setFilters2() {
        this.$axios
          .post(this.api.setDisplaysAPI, {
            page_setting: this.pageSetting2,
            defult_user_setting: this.defultSetting2,
            tab: this.api.tab
          })
          .then(res => {
            this.visibleD = false;
            this.getTableDisplay();
          });
      },
      //字段显示end
      //获取所有组件
      getAllfilters() {
        this.$axios
          .get(this.api.getAllfiltersAPI, {
            params: {
              // tab: this.api.tab,
              a: this.api.tab.a,
              b: this.api.tab.b
            }
          })
          .then(res => {
            this.isHidden = false;
            this.filters = res.data.data.filters;
            this.filtersList = res.data.data.fields_visible_list;
            this.filterVisible = res.data.data.fields_visible.map(String); //将数组的number转换为字符串
            if (
              this.filterVisible.length == Object.keys(this.filtersList).length
            ) {
              //如果筛选设置个数等于已选，默认全选选中
              (this.indeterminate = false), //checkBox全选
                (this.checkAll = true);
            }
            this.$nextTick(function () {
              //判断筛选列表的高度是不是大于350，否则不显示“更多筛选”
              let screenHeight = document.getElementsByClassName("allScreens")[0]
                .clientHeight;
              // console.log(screenHeight);
              // if (screenHeight > 350) {
              if (screenHeight > 320) {
                this.moreHide = true;
                this.isHidden = true;
              } else {
                this.moreHide = false;
              }
            });
          });
      },
      //获取表格所有的表头，字段设置等
      getTableDisplay() {
        this.$axios
          .get(this.api.tableDisplayAPI, {
            params: {
              // tab: this.api.tab,
              a: this.api.tab.a,
              b: this.api.tab.b
            }
          })
          .then(res => {
            this.tableFieldList = res.data.data.fields_visible_list;
            this.tableVisible = res.data.data.fields_visible.map(String); //将数组的number转换为字符串
            if (
              this.tableVisible.length == Object.keys(this.tableFieldList).length
            ) {
              //如果字段设置个数等于已选，默认全选选中
              (this.indeterminate2 = false), //checkBox全选
                (this.checkAll2 = true);
            }
            this.tableSelectList = res.data.data.filters;
            for (let i in res.data.data.filters) {
              if (res.data.data.filters[i].is_search == 1) {
                const target = res.data.data.filters[i];
                this.tableSelect = `${target.table_name}~${target.field_name}~${target.query_type}`; //表格筛选默认显示第一个（姓名，不是姓名默认第一个）
                break; //跳出循环
              }
            }
            this.tableFieldMap = {};
            res.data.data.filters.forEach(e => {
              this.tableFieldMap[e.field_name] = e.display_name;
            });
            // this.tableSelect=this.tableSelectList[0].field_name;//表格筛选默认显示姓名

            if (this.tableSelectList.length != 0) {
              //表格选择表头(表头不是空)
              this.tableHeaders = [
                {
                  type: "selection",
                  width: 60,
                  align: "center",
                  fixed: "left"
                }
              ];
              let a = this.api.tab.a.split(".")[0]; //传过来api的a的小数点的前面
              // if (a!="import_records") {//不是资源-全部-导入记录的时候，才有提示栏
              // if (a == "customer" || a == "student") {
              if (a == "student") {
                //只有客户、学生模块，才有提示栏
                this.tableHeaders.push({
                  title: "提示",
                  align: "center",
                  width: 160,
                  fixed: "left",
                  mark: 'tip',
                  slot: a + "_" + "tip"
                });
              }
              //先清空
              // console.log(this.tableHeaders);
              let head;

              for (let i in this.tableSelectList) {
                if (this.tableSelectList[i].is_sort == 1) {
                  //是否进行排序
                  head = {
                    title: this.tableSelectList[i].display_name,
                    key:
                      this.tableSelectList[i].table_name +
                      "_" +
                      this.tableSelectList[i].field_name,
                    table_name:this.tableSelectList[i].table_name,
                    field_name:this.tableSelectList[i].field_name,
                    align: "center",
                    width: 180,
                    sortable: "custom"
                  };
                }
                else if (this.tableSelectList[i].field_name == "name") {
                  const obj = {
                    fixed: "left",
                    width: 120,
                    slot:
                      this.api.tab.a.substring(0, this.api.tab.a.indexOf(".")) +
                      "_" +
                      this.tableSelectList[i].table_name +
                      "_" +
                      this.tableSelectList[i].field_name
                  }
                  head = {
                    title: this.tableSelectList[i].display_name,
                    key:
                      this.tableSelectList[i].table_name +
                      "_" +
                      this.tableSelectList[i].field_name,
                    align: "center",
                    width: 180
                  };
                  if (
                    this.tableSelectList[i].table_name == "basic_info" ||
                    this.tableSelectList[i].table_name == "users"
                  ) {
                    head = Object.assign({}, head, obj)
                  }
                } else if (this.tableSelectList[i].field_name === "mobile") {
                  head = {
                    title: this.tableSelectList[i].display_name,
                    key:
                      this.tableSelectList[i].table_name +
                      "_" +
                      this.tableSelectList[i].field_name,
                    align: "center",
                    width: 160,
                    slot:
                      this.api.tab.a.substring(0, this.api.tab.a.indexOf(".")) +
                      "_" +
                      this.tableSelectList[i].table_name +
                      "_" +
                      this.tableSelectList[i].field_name
                  };
                  if (!/deal/.test(this.api.tab.a)) {
                    head = {
                      ...head,
                      fixed: "left"
                    }
                  }
                } else if (this.tableSelectList[i].field_name === 'order_no') {
                  head = {
                    title: this.tableSelectList[i].display_name,
                    key:
                      this.tableSelectList[i].table_name +
                      "_" +
                      this.tableSelectList[i].field_name,
                    align: "center",
                    width: 160,
                  };
                  if (/deal/.test(this.api.tab.a)) {
                    head = {
                      ...head,
                      fixed: "left"
                    }
                  }
                } else if (/tracking_remark/.test(this.tableSelectList[i].field_name)) {
                  const paramLabel = `${this.tableSelectList[i].table_name}_${this.tableSelectList[i].field_name}`
                  head = {
                    title: this.tableSelectList[i].display_name,
                    key: paramLabel,
                    align: "center",
                    width: 200,
                    render: (h, params) => {
                      return params.row[paramLabel] ? h("Tooltip", {
                        props: {
                          'content': params.row[paramLabel],
                          'max-width': '200',
                          'placement': 'left',
                          'transfer': true,
                        }
                      }, [
                        h('div', {
                          class: ['overline-2']
                        }, params.row[paramLabel]),
                      ]) : h('span')
                    }
                  };
                } else if (this.tableSelectList[i].field_name == "record_url") {
                  head = {
                    title: this.tableSelectList[i].display_name,
                    key:
                      this.tableSelectList[i].table_name +
                      "_" +
                      this.tableSelectList[i].field_name,
                    align: "center",
                    width: 300,
                    // fixed: 'left',
                    slot:
                      this.api.tab.a.substring(0, this.api.tab.a.indexOf(".")) +
                      "_" +
                      this.tableSelectList[i].table_name +
                      "_" +
                      this.tableSelectList[i].field_name,
                    render: (h, params) => {
                      return params.row["call_records_record_url"] ? (
                        h("audio", {
                          attrs: {
                            controls: "controls",
                            src: params.row["call_records_record_url"]
                          },
                          style: {
                            width: "100%"
                            // height: '100%'
                          }
                        })
                      ) : (
                        < div > 无录音 < /div>
                    )
                      ;
                    }
                  };
                } else {
                  head = {
                    title: this.tableSelectList[i].display_name,
                    key:
                      this.tableSelectList[i].table_name +
                      "_" +
                      this.tableSelectList[i].field_name,
                    align: "center",
                    width: 180
                  };
                }
                this.tableHeaders.push(head);
              }
              //<!--客户-试听-试听纪录-展示排课、列表操作按钮-->
              //<!--学生-在读-试听纪录-展示排课、列表操作按钮-->
              if (this.isOperation) {
                //展示排课、列表操作按钮
                this.tableHeaders.push({
                  title: "操作",
                  align: "center",
                  width: 180,
                  fixed: "right",
                  slot: "operation"
                });
              }
              if (
                isMenu("ack_to_class") &&
                this.api.tab.a == "student.student" &&
                this.api.tab.b == "1"
              ) {
                //学生-在读-维护学生（恢复上课）
                this.tableHeaders.push({
                  title: "操作",
                  align: "center",
                  width: 90,
                  fixed: "right",
                  slot: "recover_classes"
                });
              }

              if (
                isMenu("binding_the_teacher") &&
                this.api.tab.a == "student.student" &&
                this.api.tab.b == "schedules"
              ) {
                //学生-在读-课程计划（作废,绑定老师）
                this.tableHeaders.push({
                  title: "绑定老师",
                  align: "center",
                  width: 100,
                  fixed: "right",
                  slot: "student_bindTeacher"
                });
              }
              if (
                isMenu("cancellation") &&
                this.api.tab.a == "student.student" &&
                this.api.tab.b == "schedules"
              ) {
                //学生-在读-课程计划（作废,绑定老师）
                this.tableHeaders.push({
                  title: "操作",
                  align: "center",
                  width: 90,
                  fixed: "right",
                  slot: "student_schedules"
                });
              }
              if (
                isMenu("check_the_lesson_time") &&
                this.api.tab.a == "student.student" &&
                this.api.tab.b == "schedules"
              ) {
                //学生-在读-课程计划（作废,绑定老师）
                this.tableHeaders.push({
                  title: "查看课次",
                  align: "center",
                  width: 100,
                  fixed: "right",
                  slot: "seeClasses"
                });
              }

              // if (isMenu('see_running_water')&&this.isListShow) {//结算-订单-全部-展示列表操作按钮
              if (
                isMenu("see_running_water") &&
                this.api.tab.a == "deal.order" &&
                this.api.tab.b == "all"
              ) {
                //结算-订单-全部-展示列表操作按钮
                this.tableHeaders.push({
                  title: "操作",
                  align: "center",
                  width: 120,
                  fixed: "right",
                  slot: "listShow"
                });
              }
              //结算-订单-待支付/待审核-付款详情
              if (isMenu("view_details") && this.api.tab.a === "deal.order" && this.api.tab.b !== "all") {
                this.tableHeaders.push({
                  title: "付款详情",
                  align: "center",
                  width: 120,
                  fixed: "right",
                  slot: "payDetail"
                });
              }
              if (
                isMenu("pay") &&
                this.api.tab.a == "deal.payment" &&
                this.api.tab.b == "all"
              ) {
                //结算-流水-全部（支付链接）
                this.tableHeaders.push({
                  title: "操作",
                  align: "center",
                  width: 120,
                  fixed: "right",
                  slot: "deal_paymentLink"
                });
              }
              // 重复名单记录
              if (this.api.tab.b === "repeated_lead_records") {
                this.tableHeaders.forEach((e, i) => {
                  if (
                    e.key === "repeated_lead_records_repeated_lead_detail" ||
                    e.key === "repeated_lead_records_source_lead_detail"
                  ) {
                    this.$set(e, "type", "html");
                  }
                  if (i > 1) this.$set(e, "width", null);
                });
              }
            } else {
              //表头是空
              this.tableHeaders = []; //清空
            }
          });
      },
      // func:(h, params) => {
      //   if(1){
      //       return h('div',[
      //         h('Tooltip',{
      //           props:{
      //             placement:'top',
      //             content: params.row,
      //           },
      //         },[
      //           h('Button',{
      //             props:{
      //               type:'primary'
      //             },
      //           },"查看")
      //         ])
      //       ])
      //   }
      // },
      //折叠隐藏面板
      foldScreen() {
        this.isHidden = !this.isHidden;
        // console.log(this.isHidden);
      },
      //table选中checkBox的数量
      selectChange(selection) {
        this.selectedNum = selection.length;
        sessionStorage.setItem("selectionRows", JSON.stringify(selection));
        this.selectionRows = selection;
      },
      //table表排序change
      sortChange(val) {
        // console.log('排序column:' +val.column);
        // console.log('排序字段:' +val.key)
        // console.log('排序规则:' +val.order);
        console.log(val);
        // let table_name = val.key.split(".")[0];
        // let field_name = val.key.split(".")[1];
        let table_name = val.column.table_name;
        let field_name = val.column.field_name;
        let query_type = "";
        for (let i in this.tableSelectList) {
          if (this.tableSelectList[i].field_name == field_name) {
            query_type = this.tableSelectList[i].query_type;
          }
        }
        let obj = {};
        this.$set(obj, "table_name", table_name);
        this.$set(obj, "field_name", field_name);
        this.$set(obj, "query_type", query_type);
        this.$set(obj, "order", val.order);
        this.formItem.sort_conditions = []; //先清空
        this.formItem.sort_conditions = obj;
        // console.log(this.formItem);
        this.getTableData();
      },
      //筛选设置,点击确定
      choosefilters() {
        this.visible = false;
        // console.log(this.filterVisible);
        this.$axios
          .post(this.api.choosefiltersAPI, {
            setting_data: this.filterVisible,
            tab: this.api.tab
          })
          .then(res => {
            this.visibleF = false;
            this.getAllfilters();
          });
      },
      //关闭筛选设置,筛选显示
      close() {
        this.visible = false;
        this.visibleF = false;
        this.visibleD = false;
      },
      //筛选设置点击全选
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          // console.log(Object.keys(this.filtersList).length);
          for (let i in this.filtersList) {
            this.filterVisible.push(i);
          }
        } else {
          this.filterVisible = [];
        }
        // console.log(this.filterVisible);
      },
      checkAllGroupChange(data) { // 筛选设置点击checkBox
        console.log(data.length);
        console.log(Object.keys(this.filtersList).length);
        if (data.length === Object.keys(this.filtersList).length) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
      //字段设置,点击确定
      chooseDisplay() {
        this.visible2 = false;
        // console.log(this.tableVisible);
        this.$axios
          .post(this.api.chooseDisplayAPI, {
            setting_data: this.tableVisible,
            tab: this.api.tab
          })
          .then(res => {
            this.getTableDisplay();
          });
      },
      //关闭字段设置
      close2() {
        this.visible2 = false;
      },
      //字段设置点击全选
      handleCheckAll2() {
        if (this.indeterminate2) {
          this.checkAll2 = false;
        } else {
          this.checkAll2 = !this.checkAll2;
        }
        this.indeterminate2 = false;

        if (this.checkAll2) {
          // console.log(Object.keys(this.filtersList).length);
          for (let i in this.tableFieldList) {
            this.tableVisible.push(i);
          }
        } else {
          this.tableVisible = [];
        }
        // console.log(this.filterVisible);
      },
      //字段设置点击checkBox
      checkAllGroupChange2(data) {
        console.log(data.length);
        console.log(Object.keys(this.tableFieldList).length);
        if (data.length === Object.keys(this.tableFieldList).length) {
          this.indeterminate2 = false;
          this.checkAll2 = true;
        } else if (data.length > 0) {
          this.indeterminate2 = true;
          this.checkAll2 = false;
        } else {
          this.indeterminate2 = false;
          this.checkAll2 = false;
        }
      },
      //组合提交筛选条件(子组件filter.vue选择值改变传来)
      buildRequestFilter(request_filter) {
        if (!this.query_conditions[request_filter.handle_conditions_type]) {
          this.query_conditions[request_filter.handle_conditions_type] = {};
        }
        if (
          !this.query_conditions[request_filter.handle_conditions_type][
            request_filter.table_name
            ]
        ) {
          this.query_conditions[request_filter.handle_conditions_type][
            request_filter.table_name
            ] = {};
        }
        if (
          !this.query_conditions[request_filter.handle_conditions_type][
            request_filter.table_name
            ][request_filter.field_name]
        ) {
          this.query_conditions[request_filter.handle_conditions_type][
            request_filter.table_name
            ][request_filter.field_name] = {};
        }
        this.query_conditions[request_filter.handle_conditions_type][
          request_filter.table_name
          ][request_filter.field_name] = request_filter;
        // console.log(this.query_conditions);
        // if (!this.query_conditions[request_filter.table_name]) {
        //   // 没有相同表名，新生成三维数组
        //   if (request_filter.value.length != 0) { //不是空值
        //     console.log(1111);
        //     let obj = {};
        //     let obj2 = {};
        //     this.$set(obj, request_filter.field_name, request_filter);
        //     this.$set(obj2, request_filter.table_name, obj);
        //     this.$set(this.query_conditions, request_filter.handle_conditions_type, obj2);
        //   }
        // }
        // else {//已经有相同表名，插到这个表名里
        //   // this.$set(this.query_conditions[request_filter.table_name], request_filter.field_name, request_filter);
        //   //如果是空值，删除这个对象
        //   if (request_filter.value.length == 0) {
        //     //如果表里只有这一个对象，删除上一层对象
        //     console.log(this.query_conditions[request_filter.table_name]);
        //     let tt = this.query_conditions[request_filter.table_name];
        //     // console.log(Object.keys(tt).length);
        //     if (Object.keys(tt).length > 1) { //Object.keys( ) 会返回一个数组，数组中是这个对象的key值列表
        //       delete(this.query_conditions[request_filter.table_name][request_filter.field_name]);
        //     } else {
        //       //如果表里不只有这一个对象，删除这个对象
        //       delete(this.query_conditions[request_filter.table_name]);
        //     }
        //   } else {
        //     //不是空值，加入这个对象
        //     this.$set(this.query_conditions[request_filter.table_name], request_filter.field_name, request_filter);
        //
        //   }
        // }
        this.formItem.query_conditions = this.query_conditions;
        this.formItem.page = 1;
        this.getTableData();
      },
      //获取所有表格数据
      getTableData() {
        // 往store中更新页面信息
        this.$store.commit('UPDATE_PAGE', {
          name: this.$store.state.currentTab,
          page: this.formItem.page,
        });

        this.$axios.post(this.api.tableDataAPI, this.formItem).then(res => {
          let table_list = [];

          for (let value of res.data.data.data) {
            let obj = {};
            unfold(value, "", obj);
            table_list.push(obj);
          }
          this.tableList = table_list;
          // 重复名单记录
          if (this.api.tab.b === "repeated_lead_records") {
            this.tableList.forEach(row => {
              let rep = row.repeated_lead_records_repeated_lead_detail;
              let sou = row.repeated_lead_records_source_lead_detail;
              if (rep) {
                rep = JSON.parse(rep);
                this.$set(
                  row,
                  "repeated_lead_records_repeated_lead_detail",
                  `姓名：${rep.name}<br>手机号：${rep.mobile}`
                );
              }
              if (sou) {
                sou = JSON.parse(sou);
                this.$set(
                  row,
                  "repeated_lead_records_source_lead_detail",
                  `姓名：${sou.name}<br>手机号：${sou.mobile}`
                );
              }
            });
          }
          //订单统计
          if (res.data.data.total_actual_amount) {
            this.total_actual_amount = res.data.data.total_actual_amount;
          }
          this.pageTotal = res.data.data.total;
        });

        // let headTipIndex = null;
        // for (let i = 0, len = this.tableHeaders.length; i < len; i++) {
        //   if (this.tableHeaders[i].mark === 'tip') {
        //     headTipIndex = i
        //   }
        // }
        // if (/^customer/.test(this.formItem.tab.a)) {

        // }
      },
      //点击清空搜索数据，获取表格数据
      emptyData() {
        // this.tableSelect = "";
        this.keywords = "";
        this.formItem.page = 1;
        this.formItem.size = 10;
        this.formItem.keywords_conditions = []; //清空
        // console.log(this.formItem);
        this.getTableData();
      },
      //点击搜索,获取表格数据
      relationClick() {
        const selectArr = this.tableSelect.split('~');
        this.formItem.page = 1;
        this.formItem.size = 10;
        let table_name = selectArr[0];
        let field_name = selectArr[1];
        let query_type = selectArr[2];
        if (field_name) {
          let obj = {};
          this.$set(obj, "table_name", table_name);
          this.$set(obj, "field_name", field_name);
          this.$set(obj, "query_type", query_type);
          this.$set(obj, "method", this.relation);
          this.$set(obj, "value", this.keywords);
          this.formItem.keywords_conditions = []; //先清空
          this.formItem.keywords_conditions = obj;
          // console.log(this.formItem);
          this.getTableData();
        }
      },
      //页码改变
      pageChange(page) {
        this.formItem.page = page;
        this.getTableData();
      },
      //页码size改变
      pageSizeChange(pageSize) {
        console.log(pageSize);
        this.formItem.size = pageSize;
        this.getTableData();
      },
      //推荐Leads待分配-手动分配-如果推荐人是CC,直接分配给这个人,否则筛选分配
      manualDistributeCC(title, role, distribution_scenario = "admin-any") {
        this.modalType = "manualDistributeModal";
        let row = this.selectionRows;
        let main_ids = [];
        let roles = [];
        if (row.length > 0) {
          row.forEach(function (item, index) {
            roles.push(item["recommend_user_real_role_format"]);
          });
        }
        if (roles.includes("CC")) {
          //存在CC
          let i = 0;
          let cc = [];
          row.forEach(function (item, index) {
            if (!cc.includes(item.leads_internal_referee_user_id)) {
              cc.push(item["leads_internal_referee_user_id"]);
            }
          });
          //1、只有一个CC,分配给这个CC
          if (cc.length == 1) {
            setTimeout(res => {
              this.$refs.manualDistributeModal.show(
                title,
                role,
                main_ids,
                distribution_scenario
              ); //父组件引用子组件中的show方法
            }, 1);
          } else {
            //2.包含多个CC，报错
            app.$Notice.error({
              title: "",
              desc: "所选的推荐人不一致，请重新选择！",
              duration: 3
            });
          }
        } else {
          //不存在CC,直接筛选分配
          row.forEach(function (item, index) {
            // main_ids.push(item['basic_info_id'])
            main_ids.push(item["leads_id"]);
          });
          setTimeout(res => {
            this.$refs.manualDistributeModal.show(
              title,
              role,
              main_ids,
              distribution_scenario
            ); //父组件引用子组件中的show方法
          }, 1);
        }
      },
      //点击手动分配
      manualDistribute(title, role, distribution_scenario = "admin-any") {
        this.modalType = "manualDistributeModal";
        let row = this.selectionRows;
        let main_ids = [];
        if (row.length > 0) {
          row.forEach(function (item, index) {
            // main_ids.push(item['basic_info_id'])
            main_ids.push(item["leads_id"] || item["customers_id"]);
          });
          setTimeout(res => {
            this.$refs.manualDistributeModal.show(
              title,
              role,
              main_ids,
              distribution_scenario
            ); //父组件引用子组件中的show方法
          }, 1);
        }
      },
      //点击进垃圾池
      leadsIntrash() {
        let app = this;
        let row = this.selectionRows;
        // console.log(row);
        let names = [];
        let leads = [];
        if (row.length > 0) {
          row.forEach(function (item, index) {
            leads.push(item["basic_info_name"]);
            names.push(item["leads_id"]);
          });
          leads = leads.join("、");
        }

        this.$Modal.confirm({
          title: "进垃圾池",
          content:
            '<span class="trashText">确认将</span><span class="trashNames">' +
            leads +
            '</span><span class="trashText">放入垃圾池？</span>',
          onOk: function () {
            app.$axios
              .post(app.api.trashAPI, {
                lead_ids: names
              })
              .then(res => {
                app.$Notice.success({
                  title: "",
                  desc: "操作成功",
                  duration: 3
                });
                // 清空table选择数据
                app.selectedNum = 0;
                sessionStorage.setItem("selectionRows", "");
                app.selectionRows = [];
                app.getTableData();
              });
          }
        });
      },
      //从线索公海捞回洽谈
      getLeadBack() {
        let row = this.selectionRows;
        if (row.length > 1) {
          this.$Notice.error({
            title: "",
            desc: "不好意思，一次只能拿一条例子哦！",
            duration: 3
          });
          return;
        }
        this.$Modal.confirm({
          title: "捞回洽谈",
          content:
            '<span class="trashText">确认将</span><span class="trashNames">' +
            row[0].basic_info_name +
            '</span><span class="trashText">捞回洽谈继续跟进吗？</span>',
          onOk: () => {
            this.$axios
              .post(this.api.getLeadBackAPI, {
                lead_id: row[0].leads_id
              })
              .then(res => {
                if (res.data.status == "success") {
                  this.$Notice.success({
                    title: "",
                    desc: "操作成功",
                    duration: 3
                  });
                } else {
                  this.$Notice.error({
                    title: "",
                    desc: "操作失败",
                    duration: 3
                  });
                }
                this.getTableData();
              });
          }
        });
      },
      //点击放弃
      leadsGiveUp() {
        let app = this;
        let row = this.selectionRows;
        let names = [];
        let leads = [];
        if (row.length > 0) {
          row.forEach(function (item, index) {
            leads.push(item["basic_info_name"]);
            names.push(item["leads_id"]);
          });
          leads = leads.join("、");
        }
        console.log(names);
        this.$Modal.confirm({
          title: "主动放弃",
          content:
            '<span class="trashText">确认将</span><span class="trashNames">' +
            leads +
            '</span><span class="trashText">丢回线索公海？</span>',
          onOk: function () {
            app.$axios
              .post(app.api.giveUpAPI, {
                lead_ids: names
              })
              .then(res => {
                app.$Notice.success({
                  title: "",
                  desc: "操作成功",
                  duration: 3
                });
                // 清空table选择数据
                app.selectedNum = 0;
                sessionStorage.setItem("selectionRows", "");
                app.selectionRows = [];
                app.getTableData();
              });
          }
        });
      },
      //标记为转化成功
      markConvertSuccess() {
        let row = this.selectionRows;
        let ids = [];
        let leads = [];
        if (row.length > 0) {
          row.forEach(function (item, index) {
            leads.push(item["basic_info_name"]);
            ids.push(item["leads_id"]);
          });
          leads = leads.join("、");
        }
        this.$Modal.confirm({
          title: "标记为转化成功",
          content:
            '<span class="trashText">确认将</span><span class="trashNames">' +
            leads +
            '</span><span class="trashText">标记为转化成功？</span>',
          onOk: () => {
            this.$axios
              .post(this.api.markConvertSuccessAPI, {
                lead_ids: ids
              })
              .then(res => {
                if (res.data.status == "success") {
                  this.$Notice.success({
                    title: "",
                    desc: "操作成功",
                    duration: 3
                  });
                } else {
                  this.$Notice.error({
                    title: "",
                    desc: "操作失败",
                    duration: 3
                  });
                }
                this.getTableData();
              });
          }
        });
      },
      //提交订单窗口显示
      placeOrderShow() {
        // this.$store.commit("FETCH_MODAL", "true");
        // this.$store.commit("FETCH_MODALTYPE", "placeOrder");
        this.modalType = "placeOrderModal";
        setTimeout(res => {
          this.$refs.placeOrderModal.show(this.selectionRows);
        }, 1);
      },
      //支付订金窗口显示
      makeDeposit() {
        this.modalType = "placeOrderModal";
        setTimeout(res => {
          this.$refs.placeOrderModal.show(this.selectionRows);
        }, 1);
      },
      distribute(title, role, distribution_scenario = "admin-any") {
        console.log(title, role, distribution_scenario);
        this.modalType = "manualDistributeModal";
        let row = this.selectionRows;
        let main_ids = [];

        if (row.length > 0) {
          row.forEach(function (item, index) {
            // main_ids.push(item['basic_info_id'])
            main_ids.push(item["leads_id"]);
          });

          setTimeout(res => {
            this.$refs.manualDistributeModal.show(
              title,
              role,
              main_ids,
              distribution_scenario
            ); //父组件引用子组件中的show方法
          }, 1);
        }
      },
      //手动提交支付
      manualSubmitPayment() {
        this.modalType = "manualSubmitPaymentModal";
        let row = this.selectionRows[0];
        setTimeout(res => {
          this.$refs.manualSubmitPaymentModal.show(row); //父组件引用子组件中的show方法
        }, 1);
      },
      //人工审核
      manualAudit() {
        let row = this.selectionRows[0];
        if (this.selectionRows.length > 1) {
          this.$Notice.warning({
            title: "",
            desc: "该操作只支持单个流水",
            duration: 3
          });
          return;
        }
        if (row.payments_audit_status == 1) {
          this.$Notice.warning({
            title: "",
            desc: "该流水已审核！",
            duration: 3
          });
          return;
        }
        this.$Modal.confirm({
          title: "人工审核确认流水",
          content:
            '<span class="trashText">确认</span><span class="trashNames"><br>订单号:' +
            row.order_order_no +
            "<br>金额:" +
            row.payments_amount +
            "<br>支付渠道：" +
            row.payments_transaction_type_format +
            '</span><br><span class="trashText">已经到账了吗？</span>',
          onOk: () => {
            this.$axios
              .post(this.$store.state.api.payment.manualAuditPayment, {
                id: row.payments_id
              })
              .then(res => {
                this.$Notice.success({
                  title: "",
                  desc: "审核成功",
                  duration: 4
                });
                this.getTableData();
              });
          }
        });
      },
    miaomiao() {
      let row = this.selectionRows[0];
      if (this.selectionRows.length > 1) {
        this.$Notice.warning({
          title: "",
          desc: "该操作只支持单个流水",
          duration: 3
        });
        return;
      }
      if (row.payments_audit_status == 1) {
        this.$Notice.warning({
          title: "",
          desc: "该流水已审核！",
          duration: 3
        });
        return;
      }
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "请输入拒绝理由"
            },
            on: {
              input: val => {
                this.nyanyatext = val;
              }
            }
          });
        },
        onOk: () => {
          if (!this.nyanyatext) {
            this.$Message.info("拒绝理由不能为空");
            return;
          }
          this.$axios
            .post("/api/payments/reject/" + row.payments_id, {
              payments_id: row.payments_id,
              reject_reason: this.nyanyatext
            })
            .then(res => {
              this.$Notice.success({
                title: "",
                desc: "拒绝成功",
                duration: 4
              });
              this.getTableData();
            });
        }
      });
    },
      //移交CR
      transferCR() {
        let app = this;
        let row = this.selectionRows;
        let leads = [];
        if (row.length > 1) {
          this.$Notice.error({
            title: "",
            desc: "抱歉，一次只能移交一个",
            duration: 4
          });
        }
        if (row.length == 1) {
          row.forEach(function (item, index) {
            leads.push(item);
          });
          this.modalType = "transferCRModal";
          setTimeout(res => {
            this.$refs.transferCRModal.show(leads[0]); //父组件引用子组件中的show方法
          }, 1);
        }
      },
      // 标记为已清洗
      markedAsCleaned() {
        let app = this;
        let row = this.selectionRows;
        let leads = [];
        if (row.length > 1) {
          this.$Notice.error({
            title: "",
            desc: "抱歉，一次只能洗一个",
            duration: 4
          });
        }
        if (row.length == 1) {
          row.forEach(function (item, index) {
            leads.push(item);
          });
          this.modalType = "markedAsCleanedModal";
          setTimeout(res => {
            this.$refs.markedAsCleanedModal.show(leads[0]); //父组件引用子组件中的show方法
          }, 1);
        }
      },
      // 拨打电话
      dialModalShow(mobile, id) {
        if (!this.isDeal) {
          //点击拨打电话，拨打电话弹窗显示
          console.log(mobile);
          sessionStorage.setItem("studentPhone", mobile);
          sessionStorage.setItem("studentID", id);
          this.modalType = "dialModal";
          setTimeout(res => {
            this.$refs.dialModal.show(); //父组件引用子组件中的show方法
          }, 1);
        }
      },
      //查看电话号码
      seeMobile(row) {
        this.$axios
          .post(
            this.$store.state.api.data_query.seeMobileApi,
            {
              lead_id: row.basic_info_main_id || row.customers_id || row.basic_info_id || row.leads_id
            },
            {
              loading: false
            }
          )
          .then(res => {
            this.$Modal.confirm({
              title: "查看手机号",
              content:
                '<span class="trashText">' + res.data.data.mobile + "</span>"
            });
          });
      },
      // 添加保护名单
      addProtect() {
        let app = this;
        let row = this.selectionRows;
        console.log(row);
        let names = [];
        let leads = [];
        if (row.length > 0) {
          row.forEach(function (item, index) {
            leads.push(item["basic_info_name"]);
            names.push(item["leads_id"]);
          });
          leads = leads.join("、");
        }
        console.log(names);
        this.$Modal.confirm({
          title: "添加保护名单",
          content:
            '<span class="trashText">确认将</span><span class="trashNames">' +
            leads +
            '</span><span class="trashText">添加到保护名单吗？</span>',
          onOk: function () {
            app.$axios
              .post(app.api.addProtectAPI, {
                main_id: names
              })
              .then(res => {
                app.$Notice.success({
                  title: "",
                  desc: "添加成功",
                  duration: 3
                });
                // 清空table选择数据
                app.selectedNum = 0;
                sessionStorage.setItem("selectionRows", "");
                app.selectionRows = [];
                app.getTableData();
              });
          }
        });
      },
      // 安排试听
      arrangeTrial(type) {
        let app = this;
        let row = this.selectionRows;
        let leads = [];
        if (row.length > 1) {
          this.$Notice.error({
            title: "",
            desc: "抱歉，一次只能安排一个",
            duration: 6
          });
        }
        if (row.length == 1) {
          row.forEach(function (item, index) {
            leads.push(item);
          });
          this.modalType = "applyForTrialClassModal";
          setTimeout(res => {
            this.$refs.applyForTrialClassModal.show(leads[0], type); //父组件引用子组件中的show方法
          }, 1);
        }
      },
      //停课申请
      applyForSuspension() {
        let row = this.selectionRows;
        let leads = [];
        if (row.length > 1) {
          this.$Notice.error({
            title: "",
            desc: "抱歉，一次只能停课一个",
            duration: 4
          });
        }
        if (row.length == 1) {
          row.forEach(function (item, index) {
            leads.push(item);
          });
          this.modalType = "applyForSuspension";
          setTimeout(res => {
            this.$refs.applyForSuspension.show(leads[0]); //父组件引用子组件中的show方法
          }, 1);
        }
      },
      //安排课程计划
      arrangeCoursePlan(modalType) {
        let row = this.selectionRows;
        let leads = [];
        if (row.length > 1) {
          this.$Message.warning("一次只能选择一个学生！");
          return false;
        }
        if (row.length == 1) {
          row.forEach(function (item, index) {
            leads.push(item);
          });
          this.modalType = "arrangeCoursePlan";
          setTimeout(res => {
            this.$refs.arrangeCoursePlan.show(leads[0], modalType); //父组件引用子组件中的show方法
          }, 1);
        }
      },
      //修改课程计划
      changeCoursePlan() {
        let row = this.selectionRows;
        let leads = [];
        if (row.length > 1) {
          this.$Message.warning("一次只能选择一个学生！");
          return false;
        }
        if (row.length == 1) {
          row.forEach(function (item, index) {
            leads.push(item);
          });
          this.modalType = "changeCoursePlan";
          setTimeout(res => {
            this.$refs.changeCoursePlan.show(leads[0]); //父组件引用子组件中的show方法
          }, 1);
        }
      },
      //排课
      arrangeCourses() {
        let row = this.selectionRows;
        let leads = [];
        if (row.length > 1) {
          this.$Message.warning("一次只能选择一个学生！");
          return false;
        }
        if (row.length == 1) {
          row.forEach(function (item, index) {
            leads.push(item);
          });
          this.modalType = "arrangeCourses";
          setTimeout(res => {
            this.$refs.arrangeCourses.show(leads[0]); //父组件引用子组件中的show方法
          }, 1);
        }
      },
      //绑定老师
      bindTeacher(row) {
        this.modalType = "bindTeacher";
        setTimeout(res => {
          this.$refs.bindTeacher.show(row); //父组件引用子组件中的show方法
        }, 1);
      },
      // 退费申请
      applyForRefund() {
        let row = this.selectionRows;
        let id = "";
        let studentName = "";
        if (row.length > 1) {
          this.$Message.warning("一次只能选择一个学生！");
          return false;
        }
        id = row[0]["orders_id"]; //只有一个，取第一个数组的id
        studentName = row[0]["basic_info_name"]; //只有一个，取第一个数组的name
        console.log(id);
        this.modalType = "applyForRefundModal";
        setTimeout(res => {
          this.$refs.applyForRefundModal.show(this.selectionRows); //父组件引用子组件中的show方法，将id传过去
        }, 1);
        this.$store.commit("LEADS_SHOW", true);
        this.$store.commit("LEADS_TYPE", false); //新增Leads弹窗不显示(推荐人，推荐人手机号)
      },
      // 审核通过
      auditPass() {
        let app = this;
        let row = this.selectionRows;
        console.log(row);
        if (row.length > 1) {
          this.$Message.warning("一次只能选择一个学生！");
          return false;
        }
        let lead = row[0].orders_order_no;
        console.log(lead);
        let url = app.api.auditPassAPI + "/" + lead;
        this.$Modal.confirm({
          title: "审核通过",
          content:
            '<span class="trashText">确认将</span><span class="trashNames">' +
            row[0].basic_info_name +
            '</span><span class="trashText">的订单审核通过吗？</span>',
          onOk: function () {
            app.$axios.post(url).then(res => {
              app.$Notice.success({
                title: "",
                desc: "审核成功",
                duration: 3
              });
              // 清空table选择数据
              app.selectedNum = 0;
              sessionStorage.setItem("selectionRows", "");
              app.selectionRows = [];
              app.getTableData();
            });
          }
        });
      },
      // 检查是否只选择了一项目标
      selectUnique() {
        const row = this.selectionRows;
        if (!row.length) {
          this.$Message.warning("请选择一个学生！")
          return false
        } else if (row.length > 1) {
          this.$Message.warning("一次只能选择一个学生！")
          return false
        } else {
          return true
        }
      },
      showModal(modalName, isAlone = true) {
        if (isAlone && !this.selectUnique()) return
        const row = isAlone && this.selectionRows && this.selectionRows[0] || this.selectionRows
        this.modalType = modalName
        setTimeout(() => {
          //父组件引用子组件中的show方法，将id传过去
          this.$refs[modalName].show(row)
        }, 1)
      },
      //审核失败
      auditReject() {
        let row = this.selectionRows;
        if (row.length > 1) {
          this.$Message.warning("一次只能选择一个学生！");
          return false;
        }
        this.modalType = "auditReject";
        setTimeout(res => {
          this.$refs.auditReject.show(this.selectionRows); //父组件引用子组件中的show方法，将id传过去
        }, 1);
      },
      // 添加支付记录
      addPayRecord() {
        let row = this.selectionRows;
        console.log(row);
        if (row.length > 1) {
          this.$Message.warning("一次只能选择一个学生！");
          return false;
        }
        this.modalType = "addPayRecord";
        setTimeout(res => {
          this.$refs.addPayRecord.show(row); //父组件引用子组件中的show方法，将id传过去
        }, 1);
      },
      //创建推荐名单
      addLeads() {
        let row = this.selectionRows;
        let id = "";
        let studentName = "";
        if (row.length > 1) {
          this.$Message.warning("一次只能选择一个学生！");
          return false;
        }
        // // id = row[0]['basic_info_id'];//只有一个，取第一个数组的id
        // id = row[0]['leads_id'];//只有一个，取第一个数组的id
        // studentName = row[0]['basic_info_name'];//只有一个，取第一个数组的name
        // console.log(id);
        // this.modalType = "createLeadModal ";
        // // setTimeout(res => {
        // //   this.$refs.createLeadModal .show(id, studentName);//父组件引用子组件中的show方法，将id传过去
        // // }, 1);
        // this.$store.commit("LEADS_SHOW", true);
        // this.$store.commit("LEADS_TYPE", false);//新增Leads弹窗不显示(推荐人，推荐人手机号)

        this.modalType = "createLeadModal";
        setTimeout(res => {
          this.$refs.createLeadModal.showCreate(1); //参数1表示是推荐
        }, 1);
      },
      reFresh() {
        console.log('table is refreshing')
        // 清空table选择数据
        this.selectedNum = 0;
        sessionStorage.setItem("selectionRows", "");
        this.selectionRows = [];
        //刷新
        this.getTableData();
      },
      //显示学生档案
      showStudentProfile(id) {
        this.$router.push({
          path: "/personInfo",
          query: {id: id, tab_status: sessionStorage.getItem("tab_status")}
        });
      },
      showTMKWorkbench(id) {
        this.$router.push({
          path: "/ucenter/TMKWorkbench",
          query: {id: id}
        });
      },
      //显示排课详情
      showtrialClassArrangement(id) {
        // this.$router.push({
        //   path: "/trialClassArrangement/" + id
        // });
        //新窗口打开页面
        let routeData = this.$router.resolve({
          name: "trialClassArrangement",
          params:{id:id}
        });
        window.open(routeData.href, '_blank');
      },
      //显示列表数据
      showCourseScheduleList(url, id, type) {
        this.modalType = "dataList";
        setTimeout(res => {
          this.$refs.dataList.show(url, id, type); //父组件引用子组件中的show方法
        }, 1);
      },
      //学生-在读-维护学生-恢复上课
      recoverClasses(row) {
        let app = this;
        this.$Modal.confirm({
          title: "恢复上课",
          content:
            '<span class="trashText">确认将</span><span class="trashNames">' +
            row.basic_info_name +
            '</span><span class="trashText">恢复上课吗？</span>',
          onOk: function () {
            app.$axios
              .post(app.api.recoverClassesAPI, {
                id: row.customers_id
              })
              .then(res => {
                app.$Notice.success({
                  title: "",
                  desc: "恢复成功",
                  duration: 3
                });
                // 清空table选择数据
                app.selectedNum = 0;
                sessionStorage.setItem("selectionRows", "");
                app.selectionRows = [];
                app.getTableData();
              });
          }
        });
      },
      //学生-在读-课程计划-点击作废
      toVoid(row) {
        let app = this;
        this.$Modal.confirm({
          title: "作废",
          content:
            '<span class="trashText">确认将</span><span class="trashNames">' +
            row.basic_info_name +
            '</span><span class="trashText">的课程计划作废吗？</span>',
          onOk: function () {
            app.$axios
              .post(app.api.cancellationAPI, {
                id: row.class_schedules_id
              })
              .then(res => {
                app.$Notice.success({
                  title: "",
                  desc: "作废成功",
                  duration: 3
                });
                // 清空table选择数据
                app.selectedNum = 0;
                sessionStorage.setItem("selectionRows", "");
                app.selectionRows = [];
                app.getTableData();
              });
          }
        });
      },
      //学生-在读-课程计划-查看课次
      seeClasses() {
      },
      exportOrder() {// 导出订单
        // this.$axios.post(this.$store.state.exportAPI, this.formItem)
        //   .then(res => {

        //   })
        const params = Object.assign({}, this.formItem)
        delete params.page
        delete params.size

        this.$axios({
          method: 'post',
          url: `${API || ''}${this.$store.state.exportAPI}`,
          data: params,
          responseType: 'blob'
        }).then(response => {
          this.download(response)
        }).catch((error) => {
          console.log(error)
        })
        // window.open(`${API || ''}${this.$store.state.exportAPI}?export_params=${JSON.stringify(params)}`)
      },
      download(data) {
        if (data) {
          console.log('export excel response', data)

          let url = window.URL.createObjectURL(new Blob([data.data || data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', `order_${
            moment().format('YYYYMMDDHHmm')
          }.xlsx`)

          document.body.appendChild(link)
          link.click()
        }
      },
      //查看试听课被驳回原因
      showClassCancelRemark(remark){

          this.$Notice.warning({
                  title: '申请驳回原因',
                  desc: remark+'，'+'请重新提交申请！'
              });
      }
    },
    props: [
      "api",
      "btnShow",
      "isOperation",
      "isRefresh",
      "distribute_params",
      "colType"
    ] //父组件传送过来的组件数组
  };
</script>

<style lang="less">
    div {
        .trashText:first-child {
            padding-left: 40px;
        }
        .trashText {
            font-size: 16px;
        }
    }

    .trashNames {
        font-size: 16px;
        color: orangered;
    }

    .overline-2 {
      text-overflow: -o-ellipsis-lastline;
      height: 3em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      padding-top: 3px;
    }
</style>
