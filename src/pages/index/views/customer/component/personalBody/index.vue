<template>
  <div class="personalBody">
    <div class="personInfo-Body">
      <Tabs type="card" :animated="false" class="tabs" @on-click="changeTab">
        <TabPane label="首页" name="trackingIndex">
          <div class="personData">
            <div class="dataLeft" v-if="baseData">
              <ul>
                <li>基本数据</li>
                <li>
                  <span>一级渠道</span>
                  <span>{{ baseData.first_channel }}</span>
                </li>
                <li>
                  <span>二级渠道</span>
                  <span>{{ baseData.second_channel }}</span>
                </li>
                <!-- <li>
                  <span>三级渠道</span>
                  <span>{{ baseData.event_url }}</span>
                </li>-->
                <li>
                  <span>活动来源</span>
                  <span>{{ baseData.event_url }}</span>
                </li>
                <li>
                  <span>跟进次数</span>
                  <span>{{ baseData.tracking_count }}</span>
                </li>
                <li>
                  <span>排课次数</span>
                  <span>{{ baseData.arranged_classes_count }}</span>
                </li>
                <li>
                  <span>实际到听</span>
                  <span>{{ baseData.attended_classes_count }}</span>
                </li>
                <li>
                  <span>已下订单</span>
                  <span>{{ baseData.created_orders_count }}</span>
                </li>
                <li>
                  <span>已审核订单</span>
                  <span>{{ baseData.successful_orders_count }}</span>
                </li>
                <li v-if="baseData.total_class_hours">
                  <span>总课耗（剩余/使用／总共）</span>
                  <span>{{ baseData.rest_class_hours }} / {{ baseData.total_class_hours - baseData.rest_class_hours }}/ {{ baseData.total_class_hours }}</span>
                </li>
                <li v-if="baseData.total_standard_class_hours">
                  <span>标准课时（剩余/使用／总共）</span>
                  <span>{{ baseData.rest_standard_class_hours }} / {{ baseData.total_standard_class_hours - baseData.rest_standard_class_hours }}/ {{ baseData.total_standard_class_hours }}</span>
                </li>
                <li v-if="baseData.total_give_class_hours">
                  <span>赠送课时（剩余/使用／总共）</span>
                  <span>{{ baseData.rest_give_class_hours }} / {{ baseData.total_give_class_hours - baseData.rest_give_class_hours }}/ {{ baseData.total_give_class_hours }}</span>
                </li>
                <li v-if="baseData.total_compensate_class_hours">
                  <span>补偿课时（剩余/使用／总共）</span>
                  <span>{{ baseData.rest_compensate_class_hours }} / {{ baseData.total_compensate_class_hours - baseData.rest_compensate_class_hours }}/ {{ baseData.total_compensate_class_hours }}</span>
                </li>
                <li>
                  <span>在读科目</span>
                  <span>{{studentInfo.customer_statics.student_subjects}}</span>
                </li>
                <li>
                  <span>是否退课</span>
                  <span v-if="studentInfo.customer_stage==7">是</span>
                  <span v-else>否</span>
                </li>
              </ul>
              <ul v-if="studentInfo.lead_info">
                <li>当前负责人</li>
                <li>
                  <span>TMK</span>
                  <span>{{studentInfo.lead_info.current_tmk_name}}</span>
                </li>
                <li>
                  <span>CC</span>
                  <span>{{studentInfo.lead_info.current_cc_name}}</span>
                </li>
                <li>
                  <span>CR</span>
                  <span>{{studentInfo.lead_info.current_cr_name}}</span>
                </li>
                <li>
                  <span>TR</span>
                  <span>{{studentInfo.lead_info.current_tr_name}}</span>
                </li>
              </ul>
            </div>
            <div class="dataRight">
              <div style="width: 100%">
                <callRecords></callRecords>
              </div>
              <p class="addRecord" @click="dialModalShow">+ 添加记录</p>
              <div class="recordData" v-for="(item,key,index) in trackingList" :key="index">
                <p class="recordTime">{{key}}</p>
                <div class="recordList">
                  <div class="recordBody" v-for="(el,index2) in item" :key="index2">
                    <p class="recordIcon">
                      <i class="iconfont icon-shijian"></i>
                    </p>
                    <!--transfer_type==0-->
                    <div class="recordCon" v-if="el.transfer_type==0">
                      <p v-if="el.user_role=='admin'" class="lable">{{el.user_role}}</p>
                      <p v-else-if="el.user_role=='CC'" class="lable lable2">{{el.user_role}}</p>
                      <p v-else-if="el.user_role=='CR'" class="lable lable3">{{el.user_role}}</p>
                      <p v-else-if="el.user_role=='TMK'" class="lable lable4">{{el.user_role}}</p>
                      <p v-else-if="el.user_role=='TR'" class="lable lable5">{{el.user_role}}</p>
                      <p v-else class="lable lable6">{{el.user_role}}</p>
                      <p class="time">{{el.user_name}} {{el.time_hour}}</p>
                      <div class="recordText">
                        <p class="recordTit">{{el.connectivity_format}}</p>
                        <p class="recordTit">{{el.connectivity_detail_format}}</p>
                        <p
                          class="recordText2"
                          ref="recordText2"
                          :class="{over2line:overNum!=index+'-'+index2}"
                        >备注：{{el.remark}}</p>
                        <p class="seeMore" v-if="seeMore(el.remark)">
                          <span @click="overNums(index,index2)">
                            {{overNum==index+'-'+index2 ? '收起' : '更多'}}
                            <i
                              class="iconfont"
                              :class="overNum==index+'-'+index2 ?'icon-jiantoushang':'icon-jiantou'"
                            ></i>
                          </span>
                        </p>
                      </div>
                      <div class="recordFoot">
                        <p>下次跟进时间</p>
                        <p>{{el.next_follow_up_time}}</p>
                      </div>
                    </div>
                    <!--transfer_type!=0-->
                    <div class="recordCon special" v-if="el.transfer_type==1">
                      <p v-if="el.user_role=='admin'" class="lable">{{el.user_role}}</p>
                      <p v-else-if="el.user_role=='CC'" class="lable lable2">{{el.user_role}}</p>
                      <p v-else-if="el.user_role=='CR'" class="lable lable3">{{el.user_role}}</p>
                      <p v-else-if="el.user_role=='TMK'" class="lable lable4">{{el.user_role}}</p>
                      <p v-else-if="el.user_role=='TR'" class="lable lable5">{{el.user_role}}</p>
                      <p v-else class="lable lable6">{{el.user_role}}</p>

                      <p class="time">{{el.user_name}} {{el.time_hour}}</p>
                      <p class="label">交接内容</p>
                      <div class="recordText">
                        <p class="recordTit">{{el.transfer_type_format}}</p>
                        <div class="recordText2" :class="{over2line:overNum!=index+'-'+index2}">
                          交接内容：
                          <ul v-if="el.transfer_record">
                            <li>
                              <span class="li-title">年级：</span>
                              {{el.transfer_record.grade}}
                              <span
                                class="li-title ml-15"
                              >科目：</span>
                              {{el.transfer_record.subject}}
                            </li>
                            <li>
                              <span class="li-title">学习成绩</span>
                              <span class="li-title">当前：</span>
                              {{el.transfer_record.school_records.initial}}
                              <span
                                class="li-title ml-15"
                              >总分：</span>
                              {{el.transfer_record.school_records.total}}
                            </li>
                            <li>
                              <span class="li-title">学习情况：</span>
                              {{el.transfer_record.study_demand.learning_situation.join('\、')}}
                            </li>
                            <li>
                              <span class="li-title">学习情况说明：</span>
                              {{el.transfer_record.study_demand.desc}}
                            </li>
                            <li>
                              <span class="li-title">老师性别要求：</span>
                              {{el.transfer_record.teaching_demand.teacher_gender}}
                            </li>
                            <li>
                              <span class="li-title">教学需求：</span>
                              {{el.transfer_record.teaching_demand.desc}}
                            </li>
                          </ul>
                        </div>
                        <p class="seeMore">
                          <span @click="overNums(index,index2)">
                            {{overNum==index+'-'+index2 ? '收起' : '更多'}}
                            <i
                              class="iconfont"
                              :class="overNum==index+'-'+index2 ?'icon-jiantoushang':'icon-jiantou'"
                            ></i>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <!-- <TabPane label="渠道信息">
          <div class="channel_info" style="padding-top: 30px"></div>
        </TabPane>-->
        <TabPane label="档案信息" name="studentInfo">
          <data-info v-if="studentId" :lead-id="studentId"></data-info>
        </TabPane>
        <TabPane label="分配记录" name="studentDistributionRecords">
          <!--表格内容-->
          <div class="tableContent" style="padding-top: 30px">
            <Table
              class="tableData"
              :columns="distributionTableHeaders"
              :data="distributionTableList"
              border
            ></Table>
            <!--分页-->
            <Page
              v-if="distributionTotal>10"
              :total="distributionTotal"
              show-sizer
              show-elevator
              @on-change="distributionPageChange"
              @on-page-size-change="distributionPageSizeChange"
              show-total
            />
          </div>
        </TabPane>
        <TabPane label="试听排课记录" name="studentSchedules">
          <div class="tableContent auditionRecord" style="padding-top: 30px">
            <Table class="tableData" :columns="auditionHeaders" :data="auditionList" border></Table>
            <!--分页-->
            <Page
              v-if="auditionTotal>10"
              :total="auditionTotal"
              show-sizer
              show-elevator
              @on-change="auditionPageChange"
              @on-page-size-change="auditionPageSizeChange"
              show-total
            />
          </div>
        </TabPane>
        <TabPane label="订单记录" name="studentOrderList">
          <!--表格内容-->
          <div class="tableContent orderRecord" style="padding-top: 30px">
            <Table class="tableData" :columns="orderHeaders" :data="orderList" border>
              <template slot-scope="{ row, index }" slot="action1">
                <p class="btn4" @click="upload(row, index)">查看支付流水</p>
              </template>
              <template slot-scope="{ row, index }" slot="action2">
                <p class="btn4" @click="applyInvoice(row, index)">开票申请</p>
              </template>
              <template slot-scope="{ row }" slot="operation1">
                <div class="table_operation">
                  <p v-if="row.refund_status==1">申请退款</p>
                  <p v-else-if="row.refund_status==2">部分退款</p>
                  <p v-else-if="row.refund_status==3">全部退款完成</p>
                </div>
              </template>
              <template slot-scope="{ row }" slot="operation2">
                <div class="table_operation">
                  <Button
                    type="warning"
                    size="small"
                    @click="showDataList($store.state.getRefundRecords,row.id)"
                    class="ml-15"
                  >查看退款详情</Button>
                </div>
              </template>
            </Table>
            <!--分页-->
            <Page
              v-if="orderTotal>10"
              :total="orderTotal"
              show-sizer
              show-elevator
              @on-change="orderPageChange"
              @on-page-size-change="orderPageSizeChange"
              show-total
            />
          </div>
        </TabPane>
        <TabPane label="正式课记录" name="official-class-record">
          <official-class-record v-if="officialShow"></official-class-record>
        </TabPane>
        <!-- <TabPane label="成绩记录">
          <div class="achievement">
            <div class="achieveHead">
              <ul>
                <li>科目</li>
                <li
                  v-for="(item,index) in subjectList"
                  @click="chooseSubject(index)"
                  :class="{active:index==isActive}"
                  :key="index"
                  :value="item.value"
                >{{item.name}}</li>
              </ul>
              <div class="action">
                <Button @click="addScore">添加</Button>
                <Button @click="deleteScore">删除</Button>
              </div>
            </div>
            <div class="tableContent">
              <Table
                class="tableData"
                @on-selection-change="scoreSelectChange"
                :columns="achieveHeaders"
                :data="achieveList"
                border
              ></Table>
              <Page
                :total="achieveTotal"
                show-sizer
                show-elevator
                @on-change="followUpPageChange"
                @on-page-size-change="followUpPageSizeChange"
                show-total
              />
            </div>
          </div>
        </TabPane> -->
        <!-- <TabPane label="退课记录">
          <div class="tableContent" style="padding-top: 30px">
            <Table class="tableData" :columns="returnHeaders" :data="returnList" border></Table>
          </div>
        </TabPane>
        <TabPane label="推荐记录">
          <div class="complaint" style="padding-top: 30px">
            <div class="action">
            <Button>添加</Button>
            </div>
            <div class="tableContent">
              <Table class="tableData" :columns="complaintHeaders" :data="complaintList" border></Table>
              <Page
                :total="complaintTotal"
                show-sizer
                show-elevator
                @on-change="followUpPageChange"
                @on-page-size-change="followUpPageSizeChange"
                show-total
              />
            </div>
          </div>
        </TabPane> -->
        <!-- <TabPane label="操作日志">
          <div class="tableContent operateLog" style="padding-top: 30px">
            <Table class="tableData" :columns="operateHeaders" :data="operateList" border></Table>
            <Page
              :total="operateTotal"
              show-sizer
              show-elevator
              @on-change="followUpPageChange"
              @on-page-size-change="followUpPageSizeChange"
              show-total
            />
          </div>
        </TabPane>
        <TabPane label="投诉反馈">
          <div class="complaint" style="padding-top: 30px">
            <div class="action">
            <Button>添加</Button>
            </div>
            <div class="tableContent">
              <Table class="tableData" :columns="complaintHeaders" :data="complaintList" border></Table>
              <Page
                :total="complaintTotal"
                show-sizer
                show-elevator
                @on-change="followUpPageChange"
                @on-page-size-change="followUpPageSizeChange"
                show-total
              />
            </div>
          </div>
        </TabPane> -->
      </Tabs>
    </div>
    <!--添加成绩弹窗-->
    <Modal class="modals scoreModal" :width="600" v-model="scoreShow" :mask-closable="false">
      <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
      <div class="modalCon">
        <p class="modalTitle">添加成绩</p>
        <Form
          class="fieldForm"
          ref="scoreForm"
          :model="scoreForm"
          :rules="ruleScore"
          :label-width="120"
          label-position="left"
        >
          <FormItem label="年级：" prop="name">
            <Select style="width: 200px;" v-model="scoreForm.grade" placeholder="请选择">
              <Option value="小三"></Option>
              <Option value="小四">小四</Option>
              <Option value="小五">小五</Option>
              <Option value="小六">小六</Option>
              <Option value="预初">预初</Option>
              <Option value="初一">初一</Option>
              <Option value="初二">初二</Option>
              <Option value="初三">初三</Option>
              <Option value="初四">初四</Option>
              <Option value="高一">高一</Option>
              <Option value="高二">高二</Option>
              <Option value="高三">高三</Option>
            </Select>
          </FormItem>
          <FormItem label="科目：">
            <Select style="width: 200px;" v-model="scoreForm.subject" placeholder="请选择学习科目">
              <Option value="0">语文</Option>
              <Option value="1">数学</Option>
              <Option value="2">英语</Option>
              <Option value="3">物理</Option>
              <Option value="4">化学</Option>
              <Option value="5">生物</Option>
              <Option value="6">地理</Option>
              <Option value="7">历史</Option>
              <Option value="8">政治</Option>
              <Option value="9">科学</Option>
            </Select>
          </FormItem>
          <FormItem label="初始成绩：">
            <Input
              type="text"
              v-model="scoreForm.name"
              style="width: 200px;"
              placeholder="请输入初始成绩"
            />
          </FormItem>
          <FormItem label="本次成绩：">
            <Input
              type="text"
              v-model="scoreForm.name"
              style="width: 200px;"
              placeholder="请输入本次成绩"
            />
          </FormItem>
          <FormItem label="目标成绩：">
            <Input
              type="text"
              v-model="scoreForm.name"
              style="width: 200px;"
              placeholder="请输入目标成绩"
            />
          </FormItem>
          <FormItem label="总分：">
            <Input type="text" v-model="scoreForm.name" style="width: 200px;" placeholder="请输入总分"/>
          </FormItem>
          <FormItem label="已完课时数：">
            <Input
              type="text"
              v-model="scoreForm.name"
              style="width: 200px;"
              placeholder="请输入已完课时数"
            />
          </FormItem>
          <button type="button" class="submit" @click="scoreSubmit('scoreForm')">确定</button>
        </Form>
      </div>
    </Modal>
    <!--查看退款详情-->
    <dataList ref="dataList"></dataList>
    <!--拨打电话-->
    <dialModal ref="dialModal" @tracking="getTrackingIndex"></dialModal>
  </div>
</template>
<style lang="less">
@import "../../../../../../assets/css/personInfo.less";
</style>
<style scoped>
@import "../../border.css";
</style>

<script>
import dataList from "../../../res/modal/dataList";
import dialModal from "../../../res/modal/dialModal";
import Bus from "../../bus.js";
import dataInfo from "./components/dataInfo";
import callRecords from "./components/callRecords";
import officialClassRecord from "./components/officialClassRecord";
import { mapGetters } from "vuex";
import { getBasicInfo, statisticsInfo, getFieldOptions } from "../../getData";
import { setTimeout } from "timers";

const phoneREG = /^1\d{10}$/; //手机

export default {
  data() {
    return {
      officialShow: false,
      baseData: "",
      baseInfo: {},
      statisticsInfo: {},
      fieldOptionsGrade: [],
      fieldOptionsSubject: [],
      // API 列表
      trackingIndex: this.$store.state.api.customers.studentTrackingIndex, //1、首页跟进记录
      studentInfoAPI: this.$store.state.api.customers.studentInfo, //2、档案信息
      studentDistributionRecordsAPI: this.$store.state.api.customers
        .StudentDistributionRecords, //3.分配记录API
      studentTrackingAPI: this.$store.state.api.customers.studentTrackingList, //4、Tab页跟进记录
      studentSchedulesAPI: this.$store.state.api.customers.studentschedulesList, //5、试听排课记录
      studentOrderListAPI: this.$store.state.api.customers.studentOrderList, //6、订单记录
      resetPasswordAPI: this.$store.state.api.customers.resetPassword, //7、重置密码
      getBaseDataAPI: this.$store.state.api.customers.baseData,
      overNum: -1,
      //1、首页
      studentId: "", //别的页面传过来的学生id
      studentInfo: {
        customer_info: {
          id: 1,
          name: "李淑",
          sex: "女",
          mobile: "15069325154",
          mobile_1: null,
          wechat: "4n17w09CUZWapm1IWJYnyvL9RB46on",
          QQ: "69325154",
          grade: "高一",
          subject: "生物",
          textbook: 2,
          location: "贵州",
          channel_id: 18,
          current_global_stage: 3,
          last_sales_stage: 2,
          main_id: 1,
          remark: "goodboy",
          created_at: "2018-12-28 07:12:15",
          updated_at: "2018-12-28 07:32:15",
          deleted_at: null,
          channel: "公众号",
          recomenter: "周三",
          is_edit: false
        },
        customer_statics: {
          dial_times: 0,
          try_class_times: 0,
          tracking_time: "2018-11-21",
          channel: "公众号",
          purchase_times: 5,
          remainder_class_times: 12,
          refund_alarm: 3
        },
        customer_stage: 5,
        last_tracking_record: {
          id: 2,
          user_id: 2,
          main_id: 1,
          type: 1,
          contact_method: "手机",
          connectivity: "无人接听",
          connectivity_detail: "暂不排课，保持跟进",
          dps: 1,
          refund_alarm: 3,
          remark: "沟通",
          next_follow_up_time: "2018-12-28 15:45:02",
          created_at: "2018-12-28 15:37:32",
          updated_at: null,
          deleted_at: null,
          times: 5,
          try_class_times: 1,
          purchase_times: 5,
          subject: "生物"
        },
        responsible: {
          name: "用户6",
          job_name: "当前cc"
        }
      }, //学生信息
      //首页下半部分
      trackingList: [],
      last_record: "",
      //2、档案信息
      defaultContent: "请填写家庭情况描述，不超过100字", //备注placeholder
      parentInfo: [
        {
          parentRelationship: "",
          mobile: ""
        }
      ], //添加家长信息
      addressList: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫",
              children: [
                {
                  value: "fuzimiao",
                  label: "11"
                }
              ]
            },
            {
              value: "tiantan",
              label: "天坛",
              children: [
                {
                  value: "fuzimiao",
                  label: "12"
                }
              ]
            },
            {
              value: "wangfujing",
              label: "王府井",
              children: [
                {
                  value: "fuzimiao",
                  label: "13"
                }
              ]
            }
          ]
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            {
              value: "nanjing",
              label: "南京",
              children: [
                {
                  value: "fuzimiao",
                  label: "夫子庙"
                }
              ]
            },
            {
              value: "suzhou",
              label: "苏州",
              children: [
                {
                  value: "zhuozhengyuan",
                  label: "拙政园"
                },
                {
                  value: "shizilin",
                  label: "狮子林"
                }
              ]
            }
          ]
        }
      ], //所在地
      formValidate: {
        sex: 1,
        address: [],
        level: "",
        name: "",
        classTime: "1小时",
        classForm: 0,
        classLevel: 0,
        teachVersion: 0,
        mail: "",
        subject: "",
        grade: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: "",
        mobile: "",
        studyNeeds: [
          {
            subject: "",
            version: "",
            firstAchievement: "",
            total: "",
            ranking: "",
            goalAchievement: ""
          }
        ] //添加学习需求
      },
      ruleValidate: {
        select: [{ required: true, message: "请选择", trigger: "change" }],
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      },
      //3、分配记录
      distributionForm: {
        id: this.$route.query.id,
        page: 1,
        size: 10
      },
      distributionTableHeaders: [
        {
          title: "分配时间",
          key: "distribute_at",
          width: 200
        },
        {
          title: "从",
          key: "from",
          width: 150
        },
        {
          title: "角色",
          key: "from_role"
        },
        {
          title: "分给",
          key: "to"
        },
        {
          title: "角色",
          key: "to_role"
        },
        {
          title: "操作人",
          key: "operator"
        },
        {
          title: "角色",
          key: "operator_role"
        },
        {
          title: "分配场景",
          key: "distribution_scenario_format"
        }
      ],
      distributionTableList: [],
      distributionTotal: 0,
      // 4、跟进记录
      followUpForm: {
        id: this.$route.query.id,
        page: 1,
        size: 10,
        key_word: ""
      },
      followUpHeaders: [
        {
          title: "接通状态",
          key: "connectivity_format",
          width: 150
        },
        {
          title: "接通明细",
          key: "connectivity_detail_format",
          width: 150
        },
        {
          title: "转化阶段",
          key: "dps",
          width: 150
        },
        {
          title: "备注",
          key: "remark",
          width: 220
        },
        {
          title: "最近跟进人",
          key: "user_name",
          width: 150
        },
        {
          title: "跟进人角色",
          key: "user_role",
          width: 120
        },
        {
          title: "最近跟进时间",
          key: "created_at",
          width: 180
        }
      ],
      followUpList: [],
      followUpTotal: 0,
      //5、试听课安排记录
      auditionForm: {
        id: this.$route.query.id,
        page: 1,
        size: 10
      },
      auditionHeaders: [
        {
          title: "年级",
          key: "grade",
          width: 150
        },
        {
          title: "科目",
          key: "subject",
          width: 150
        },
        {
          title: "教材版本",
          key: "textbook",
          width: 180
        },
        {
          title: "课程类型",
          key: "course_type",
          width: 180
        },
        {
          title: "上课形式",
          key: "class_form",
          width: 150
        },
        {
          title: "上课时长",
          key: "class_length",
          width: 180
        },
        {
          title: "性别要求",
          key: "gender_require",
          width: 150
        },
        {
          title: "学习需求",
          key: "study_require",
          width: 180
        },
        {
          title: "试听反馈",
          key: "trial_feedback",
          width: 180
        },
        {
          title: "试听老师",
          key: "teacher",
          width: 150
        },
        {
          title: "申请人类型（cc,cr）",
          key: "applicant_type",
          width: 150
        },
        {
          title: "申请人姓名",
          key: "applicant_name",
          width: 150
        },
        {
          title: "排课人",
          key: "class_arranged_by",
          width: 180
        },
        {
          title: "安排课程时段",
          key: "arranged_time",
          width: 180
        },
        {
          title: "实际上课时段",
          key: "actual_time",
          width: 180
        }
      ],
      auditionList: [],
      auditionTotal: 0,
      //6、订单记录
      orderForm: {
        id: this.$route.query.id,
        page: 1,
        size: 10
      },
      orderHeaders: [
        {
          title: "编号",
          key: "id",
          width: 100
        },
        {
          title: "提交时间",
          key: "created_at",
          width: 200
        },
        {
          title: "订单号",
          key: "order_no",
          width: 200
        },
        {
          title: "年级",
          key: "grade",
          width: 200
        },
        {
          title: "科目",
          key: "subject",
          width: 200
        },
        {
          title: "课时级别",
          key: "class_hour_grade",
          width: 150
        },
        {
          title: "标准课时",
          key: "standard_class_hour",
          width: 150
        },
        {
          title: "赠送课时",
          key: "giveaway_class_hour",
          width: 150
        },
        {
          title: "总课时数",
          key: "total_hour",
          width: 150
        },
        {
          title: "参与活动",
          key: "attended_activities",
          width: 150
        },
        {
          title: "优惠方案",
          key: "discount_schema",
          width: 150
        },
        {
          title: "支付分类",
          key: "payment_type",
          width: 150
        },
        {
          title: "定金金额",
          key: "deposit_money",
          width: 150
        },
        {
          title: "支付金额",
          key: "actual_amount",
          width: 150
        },
        {
          title: "赠品项目",
          key: "gift",
          width: 150
        },
        {
          title: "赠品金额",
          key: "gift_money",
          width: 150
        },
        {
          title: "订单状态",
          key: "order_status",
          width: 150
        },
        {
          title: "续费类别",
          key: "order_cat",
          width: 150
        },
        {
          title: "下单渠道",
          key: "order_channel",
          width: 150
        },
        {
          title: "签单人",
          key: "order_signed_by",
          width: 150
        },
        {
          title: "付款完成时间",
          key: "last_payment_at",
          width: 180
        },
        {
          title: "审核通过时间",
          key: "audit_at",
          width: 180
        },
        {
          title: "审核人",
          key: "auditor",
          width: 180
        },
        {
          title: "付款截图",
          slot: "action1",
          width: 150
        },
        {
          title: "开取发票",
          slot: "action2",
          width: 150
        },
        {
          title: "是否退款",
          width: 150,
          fixed: "right",
          slot: "operation1"
        },
        {
          title: "操作",
          align: "center",
          width: 150,
          fixed: "right",
          slot: "operation2"
        }
      ],
      orderList: [],
      orderTotal: 0,
      //7、正式课记录
      formalHeaders: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "年级",
          key: "grade",
          width: 150
        },
        {
          title: "科目",
          key: "subject",
          width: 150
        },
        {
          title: "教材版本",
          key: "textbookVersion",
          width: 150
        },
        {
          title: "课程类型",
          key: "classType",
          width: 150
        },
        {
          title: "课时级别",
          key: "classLevel",
          width: 150
        },
        {
          title: "课程时长（h）",
          key: "classHour",
          width: 150
        },
        {
          title: "上课老师",
          key: "teacher",
          width: 150
        },
        {
          title: "安排上课时间",
          key: "classTime",
          width: 180
        },
        {
          title: "排课人",
          key: "arrangeMen",
          width: 150
        },
        {
          title: "排课需求",
          width: 150,
          slot: "action"
        }
      ],
      formalList2: [
        //已上课列表
        {
          grade: "初三",
          subject: "数学",
          textbookVersion: "人教版",
          classType: "正式课",
          classLevel: "普通",
          classHour: "1h",
          teacher: "彭婧媛",
          classTime: "2018-11-07 11:31:29",
          arrangeMen: "付沈彤"
        },
        {
          grade: "初三",
          subject: "数学",
          textbookVersion: "人教版",
          classType: "正式课",
          classLevel: "普通",
          classHour: "1h",
          teacher: "彭婧媛",
          classTime: "2018-11-07 11:31:29",
          arrangeMen: "付沈彤"
        },
        {
          grade: "初三",
          subject: "数学",
          textbookVersion: "人教版",
          classType: "正式课",
          classLevel: "普通",
          classHour: "1h",
          teacher: "彭婧媛",
          classTime: "2018-11-07 11:31:29",
          arrangeMen: "付沈彤"
        }
      ],
      formalTotal: 40,
      //8、成绩记录
      isActive: 0,
      subjectList: [
        { name: "全部", value: "全部" },
        { name: "语文", value: "语文" },
        { name: "数学", value: "数学" },
        { name: "英语", value: "英语" },
        { name: "物理", value: "物理" },
        { name: "化学", value: "化学" },
        { name: "生物", value: "生物" },
        { name: "历史", value: "历史" },
        { name: "地理", value: "地理" },
        { name: "政治", value: "政治" },
        { name: "科学", value: "科学" }
      ],
      achieveHeaders: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "年级",
          key: "grade",
          width: 150
        },
        {
          title: "科目",
          key: "subject",
          width: 150
        },
        {
          title: "初始成绩",
          key: "firstAchieve",
          width: 150
        },
        {
          title: "本次成绩",
          key: "currentAchieve",
          width: 150
        },
        {
          title: "成绩变化（比上次）",
          key: "change1",
          width: 180
        },
        {
          title: "成绩变化（比初始）",
          key: "change2",
          width: 180
        },
        {
          title: "目标成绩",
          key: "goalAchieve",
          width: 150
        },
        {
          title: "总分",
          key: "totalScore",
          width: 150
        },
        {
          title: "已完课时数",
          key: "hoursCompleted",
          width: 180
        },
        {
          title: "更新时间",
          key: "date",
          width: 180
        }
      ],
      achieveList: [
        //待上课列表
        {
          grade: "初三",
          subject: "数学",
          firstAchieve: "80",
          currentAchieve: "96",
          change1: "+16",
          change2: "+17",
          goalAchieve: "120",
          totalScore: "150",
          hoursCompleted: "15",
          date: "2018-11-07 11:31:29"
        },
        {
          grade: "初三",
          subject: "数学",
          firstAchieve: "80",
          currentAchieve: "96",
          change1: "+16",
          change2: "+17",
          goalAchieve: "120",
          totalScore: "150",
          hoursCompleted: "15",
          date: "2018-11-07 11:31:29"
        },
        {
          grade: "初三",
          subject: "数学",
          firstAchieve: "80",
          currentAchieve: "96",
          change1: "+16",
          change2: "+17",
          goalAchieve: "120",
          totalScore: "150",
          hoursCompleted: "15",
          date: "2018-11-07 11:31:29"
        },
        {
          grade: "初三",
          subject: "数学",
          firstAchieve: "80",
          currentAchieve: "96",
          change1: "+16",
          change2: "+17",
          goalAchieve: "120",
          totalScore: "150",
          hoursCompleted: "15",
          date: "2018-11-07 11:31:29"
        }
      ],
      achieveTotal: 50,
      //添加成绩弹窗
      scoreShow: false,
      scoreForm: {
        name: "",
        classTime: "1小时",
        classForm: 0,
        classLevel: 0,
        teachVersion: 0,
        mail: "",
        subject: "语文",
        grade: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleScore: {
        name: [
          { required: true, message: "字段名称不能为空", trigger: "blur" }
        ],
        select: [{ required: true, message: "请选择", trigger: "change" }],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      },
      scoreSelect: "", //选择成绩个数
      //9、退课记录
      returnHeaders: [
        {
          title: "年级",
          key: "grade",
          width: 150
        },
        {
          title: "科目",
          key: "subject",
          width: 150
        },
        {
          title: "跟进TMK",
          key: "TMK",
          width: 150
        },
        {
          title: "签单CC",
          key: "CC",
          width: 150
        },
        {
          title: "跟进CR",
          key: "CR",
          width: 150
        },
        {
          title: "分配老师",
          key: "teacher",
          width: 150
        },
        {
          title: "购买课时数",
          key: "buyHour",
          width: 150
        },
        {
          title: "赠送课时数",
          key: "giveHour",
          width: 150
        },
        {
          title: "已完课时数",
          key: "hoursCompleted",
          width: 150
        },
        {
          title: "购课金额",
          key: "buyMoney",
          width: 150
        },
        {
          title: "退费金额",
          key: "returnMoney",
          width: 150
        },
        {
          title: "退费理由",
          key: "returnReason",
          width: 150
        },
        {
          title: "报名时间",
          key: "date1",
          width: 180
        },
        {
          title: "付费时间",
          key: "date2",
          width: 180
        },
        {
          title: "退费时间",
          key: "date",
          width: 180
        }
      ],
      returnList: [
        //待上课列表
        {
          grade: "初三",
          subject: "数学",
          TMK: "古天乐",
          CC: "周润发",
          CR: "吴彦祖",
          teacher: "李健",
          buyHour: "120",
          giveHour: "15",
          hoursCompleted: "150",
          buyMoney: "3000",
          returnMoney: "2000",
          returnReason: "退费理由退费理由退费",
          date1: "2018-11-07 11:31:29",
          date2: "2018-11-07 11:31:29",
          date: "2018-11-07 11:31:29"
        },
        {
          grade: "初三",
          subject: "数学",
          TMK: "古天乐",
          CC: "周润发",
          CR: "吴彦祖",
          teacher: "李健",
          buyHour: "120",
          giveHour: "15",
          hoursCompleted: "150",
          buyMoney: "3000",
          returnMoney: "2000",
          returnReason: "退费理由退费理由退费",
          date1: "2018-11-07 11:31:29",
          date2: "2018-11-07 11:31:29",
          date: "2018-11-07 11:31:29"
        },
        {
          grade: "初三",
          subject: "数学",
          TMK: "古天乐",
          CC: "周润发",
          CR: "吴彦祖",
          teacher: "李健",
          buyHour: "120",
          giveHour: "15",
          hoursCompleted: "150",
          buyMoney: "3000",
          returnMoney: "2000",
          returnReason: "退费理由退费理由退费",
          date1: "2018-11-07 11:31:29",
          date2: "2018-11-07 11:31:29",
          date: "2018-11-07 11:31:29"
        }
      ],
      //10、操作日志
      operateHeaders: [
        {
          title: "序号",
          key: "index",
          width: 100
        },
        {
          title: "操作类型",
          key: "name"
        },
        {
          title: "操作信息",
          key: "info"
        },
        {
          title: "操作人",
          key: "name"
        },
        {
          title: "操作时间",
          key: "date"
        }
      ],
      operateList: [
        {
          index: "1",
          info: "这里是操作信息，这里是操作信息",
          name: "吴彦祖",
          date: "2018-11-07 11:31:29"
        },
        {
          index: "2",
          info: "这里是操作信息，这里是操作信息",
          name: "吴彦祖",
          date: "2018-11-07 11:31:29"
        },
        {
          index: "3",
          info: "这里是操作信息，这里是操作信息",
          name: "吴彦祖",
          date: "2018-11-07 11:31:29"
        },
        {
          index: "4",
          info: "这里是操作信息，这里是操作信息",
          name: "吴彦祖",
          date: "2018-11-07 11:31:29"
        }
      ],
      operateTotal: 60,
      //11、投诉反馈
      complaintHeaders: [
        {
          title: "序号",
          key: "index",
          width: 100
        },
        {
          title: "投诉反馈内容",
          key: "info",
          width: 200
        },
        {
          title: "处理进度",
          key: "name",
          width: 150
        },
        {
          title: "处理人",
          key: "name",
          width: 150
        },
        {
          title: "处理方式",
          key: "name",
          width: 150
        },
        {
          title: "记录人",
          key: "name",
          width: 150
        },
        {
          title: "记录时间",
          key: "date",
          width: 180
        }
      ],
      complaintList: [
        {
          index: "1",
          info: "这里是操作信息，这里是操作信息",
          name: "吴彦祖",
          date: "2018-11-07 11:31:29"
        },
        {
          index: "2",
          info: "这里是操作信息，这里是操作信息",
          name: "吴彦祖",
          date: "2018-11-07 11:31:29"
        },
        {
          index: "3",
          info: "这里是操作信息，这里是操作信息",
          name: "吴彦祖",
          date: "2018-11-07 11:31:29"
        },
        {
          index: "4",
          info: "这里是操作信息，这里是操作信息",
          name: "吴彦祖",
          date: "2018-11-07 11:31:29"
        }
      ],
      complaintTotal: 70
    };
  },
  created() {
    let that = this;
    Bus.$on("tracking", () => {
      this.getTrackingIndex();
    });
  },
  computed: {
    ...mapGetters(["fetchModal"])
  },
  watch: {
    fetchModal(value) {
      //console.log(this.$store.state.fetchmodalType,!value);
      if (value == "false" && this.$store.state.fetchmodalType == "dialModal") {
        this.getTrackingIndex();
        //console.log(this.$store.state.fetchmodalType,1222332558588);
      }
    }
  },
  async mounted() {
    // 档案首页
    this.studentId = this.$route.query.id;
    this.baseData = await this.getBaseData();
    this.getTrackingIndex();
    // this.baseInfo = await getBasicInfo(this.$route.query.id)
    // this.statisticsInfo = await statisticsInfo(this.$route.query.id)
    // console.log('this.statisticsInfo', JSON.stringify(await statisticsInfo(this.$route.query.id)))
  },
  methods: {
    validPhone(rule, value, callback) {
      if (value) {
        if (!phoneREG.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    insertArea(...area) {
      // 导入所有地区信息
      let map = localStorage.getItem("areaMap");
      if (!map) {
        map = {};
      } else {
        map = JSON.parse(map);
      }
      if (!area.length) {
        return map;
      }
      area.forEach(area => {
        const key = area.region_code;
        if (!map[key]) {
          map[key] = area.region_name;
        }
      });
      localStorage.setItem("areaMap", JSON.stringify(map));
    },
    dialModalShow() {
      //点击拨打电话，拨打电话弹窗显示
      sessionStorage.setItem(
        "studentPhone",
        this.studentInfo.customer_info.mobile
      );
      sessionStorage.setItem("studentID", this.studentId);
      this.$refs.dialModal.show(); //父组件引用子组件中的show方法
    },
    async getProvinces() {
      let res = [];
      await this.$axios.post(this.getProvincesAPI).then(data => {
        if (data.status) {
          res = data.data.data;
        }
      });
      return res;
    },
    async getBaseData() {
      let res = {};
      await this.$axios
        .post(this.getBaseDataAPI, {
          lead_id: this.studentId
        })
        .then(data => {
          if (data.status) {
            res = data.data.data;
          }
        });
      return res;
    },
    changeTab(name) {
      if (name == "studentInfo") {
        // 档案信息
        // this.getBaseInfo();
      } else if (name == "studentDistributionRecords") {
        this.getStudentDistributionRecords(); //3 分配记录
      } else if (name == "studentTrackingList") {
        //4、跟进记录
        this.getStudentTrackingList();
      } else if (name == "studentSchedules") {
        //5、试听排课记录
        this.getStudentSchedules();
      } else if (name == "studentOrderList") {
        //6、订单记录
        this.getStudentOrderList();
      } else if (name = 'official-class-record') {
        this.officialShow = true
      }
    },
    //1、首页
    // getStudentInfo() {
    //   //获取学生档案信息
    //   this.$axios
    //     .get(this.studentInfoAPI, {
    //       params: {
    //         id: this.studentId
    //       }
    //     })
    //     .then(res => {
    //       this.studentInfo = res.data.data;
    //     });
    // },
    getTrackingIndex() {
      //获取首页（跟进记录）
      this.$axios
        .get(this.trackingIndex, {
          params: {
            id: this.studentId
          }
        })
        .then(res => {
          this.trackingList = res.data.data;
        });
    },
    overNums(index, index2) {
      //备注展开或隐藏
      if (this.overNum == index + "-" + index2) {
        this.overNum = -1;
      } else {
        this.overNum = index + "-" + index2;
      }
    },
    seeMore(remark) {
      if (remark.length > 58) {
        return true;
      } else {
        return false;
      }
    },
    //2、档案信息
    getBaseInfo() {
      const app = this;
      app.$axios
        .post(app.getBaseInfoAPI, {
          lead_id: app.studentId
        })
        .then(res => {
          if (res.data && res.data.data) {
            const base = res.data.data.base_info;
            // 切换进来的时候获取地市下拉框内容
            this.updateArea("city", base.province);
            this.updateArea("county", base.city);
            const members = res.data.data.family_members;
            if (!members.length) {
              members.push({
                name: "",
                mobile: "",
                relationship: 0
              });
            }
            if (!base.character.filter(e => e).length) {
              base.character = [];
            }
            const obj = {};
            obj[base.province] = base.province_name;
            obj[base.city] = base.city_name;
            obj[base.county] = base.county_name;
            this.areaMap = Object.assign({}, this.areaMap, obj);
            app.$set(app.studentInfo, "base", {
              lead_id: app.studentId,
              channel: base.channel,
              activityName: base.attended_activity,
              gender: (~~base.gender).toString(),
              province: (~~base.province).toString(),
              city: (~~base.city).toString(),
              county: (~~base.county).toString(),
              character: base.character.toString(),
              school: base.school,
              family_info: base.family_information,
              family_members: members
            });
          }
        });
    },
    addNeeds() {
      //添加学习需求
      this.formValidate.studyNeeds.push({
        subject: "",
        version: "",
        firstAchievement: "",
        total: "",
        ranking: "",
        goalAchievement: ""
      });
    },
    addParentInfo() {
      //添加家长信息
      this.studentInfo.baseCopy.family_members.push({
        name: "",
        mobile: "",
        relationship: 0
      });
    },
    subParentInfo(index) {
      //添加家长信息
      this.studentInfo.baseCopy.family_members.splice(index, 1);
    },
    saveBaseInfo() {
      const req = this.studentInfo.baseCopy;
      this.$axios.post(this.saveBaseInfoAPI, req).then(data => {
        if (data.status) {
          this.$Notice.success({
            title: "",
            desc: "保存成功",
            duration: 3
          });
          this.studentInfo.base = JSON.parse(
            JSON.stringify(this.studentInfo.baseCopy)
          );
          this.studentInfo.baseCopy = {};
          this.studentInfo.baseEditing = 0;
        } else {
          this.$Notice.success({
            title: "",
            desc: "保存失败",
            duration: 3
          });
        }
      });
    },
    handleSubmit(name) {
      // 档案信息点击保存
      this.$refs[name].validate(valid => {
        if (valid) {
          this.saveBaseInfo();
        }
      });
    },
    beginEdit() {
      this.manual = 1;
      this.citysCopy = JSON.parse(JSON.stringify(this.citys));
      this.countysCopy = JSON.parse(JSON.stringify(this.countys));
      this.studentInfo.baseCopy = JSON.parse(
        JSON.stringify(this.studentInfo.base)
      );
      this.studentInfo.baseEditing = 1;
      setTimeout(() => {
        this.manual = 0;
      }, 500);
    },
    cancelEdit() {
      this.citys = JSON.parse(JSON.stringify(this.citysCopy));
      this.countys = JSON.parse(JSON.stringify(this.countysCopy));
      this.studentInfo.baseEditing = 0;
    },
    //3、分配记录
    getStudentDistributionRecords() {
      this.$axios
        .post(this.studentDistributionRecordsAPI, this.distributionForm)
        .then(res => {
          this.distributionTableList = res.data.data.list;
          this.distributionTotal = res.data.data.page.total;
        });
    },
    distributionPageChange(page) {
      //跟进记录页码改变
      this.distributionForm.page = page;
      this.getStudentDistributionRecords();
    },
    distributionPageSizeChange(pageSize) {
      //跟进记录页码size改变
      this.distributionForm.page_size = pageSize;
      this.getStudentDistributionRecords();
    },
    //4、跟进记录
    getStudentTrackingList() {
      //获取学生跟进记录
      this.$axios
        .get(this.studentTrackingAPI, {
          params: this.followUpForm
        })
        .then(res => {
          //console.log(res);
          this.followUpList = res.data.data.data;
          this.followUpTotal = res.data.data.total;
        });
    },
    followUpPageChange(page) {
      //跟进记录页码改变
      this.followUpForm.page = page;
      this.getStudentTrackingList();
    },
    followUpPageSizeChange(pageSize) {
      //跟进记录页码size改变
      //console.log(pageSize);
      this.followUpForm.page_size = pageSize;
      this.getStudentTrackingList();
    },
    //5、试听排课记录
    getStudentSchedules() {
      //获取试听排课记录
      this.$axios
        .post(this.studentSchedulesAPI, this.auditionForm)
        .then(res => {
          //console.log(res);
          this.auditionList = res.data.data.list;
          this.auditionTotal = res.data.data.total;
        });
    },
    auditionPageChange(page) {
      //跟进记录页码改变
      this.auditionForm.page = page;
      this.getStudentSchedules();
    },
    auditionPageSizeChange(pageSize) {
      //跟进记录页码size改变
      //console.log(pageSize);
      this.auditionForm.page_size = pageSize;
      this.getStudentSchedules();
    },
    //6、订单记录
    getStudentOrderList() {
      //获取试听排课记录
      this.$axios.post(this.studentOrderListAPI, this.orderForm).then(res => {
        this.orderList = res.data.data.list;
        this.orderTotal = res.data.data.total;
      });
    },
    orderPageChange(page) {
      //跟进记录页码改变
      this.orderForm.page = page;
      this.getStudentOrderList();
    },
    orderPageSizeChange(pageSize) {
      //跟进记录页码size改变
      //console.log(pageSize);
      this.orderForm.size = pageSize;
      this.getStudentOrderList();
    },
    //查看退款详情
    showDataList(url, id) {
      this.$refs.dataList.show(url, id); //父组件引用子组件中的show方法
    },
    upload(row, index) {
      //上传截图
    },
    applyInvoice(row, index) {
      //开票申请
    },
    // 7、正式课记录
    viewDetails(row, index) {
      //查看详情
    },
    selectChange(selection) {
      //待上课列表table选中checkBox的数量
      console.log(selection);
    },
    selectChange2(selection) {
      //已上课列表table选中checkBox的数量
      console.log(selection);
    },
    //8、成绩记录
    chooseSubject(index) {
      //切换科目
      this.isActive = index;
    },
    scoreSelectChange(selection) {
      //待上课列表table选中checkBox的数量
      console.log(selection);
      this.scoreSelect = selection.length;
    },
    deleteScore() {
      //点击删除成绩
      if (this.scoreSelect > 0) {
        this.$Modal.confirm({
          title: "删除成绩",
          content: "确认删除学生成绩吗？",
          onOk: function() {
            console.log(112);
          }
        });
      }
    },
    cancel() {
      //关闭弹窗
      this.scoreShow = false;
    },
    addScore() {
      //点击添加成绩，出现弹窗
      this.scoreShow = true;
    },
    scoreSubmit(name) {
      //添加成绩点击确定
      console.log(this.formValidate);
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$axios.post(this.callUpAPI, this.formValidate).then(res => {
          //   this.$Message.success('提交成功!');
          // });
        } else {
          // this.$Message.error('Fail!');
        }
      });
    },
    resetPassword() {
      this.$Modal.confirm({
        title: "重置密码",
        content: "<p>确认要进行此操作吗？</p>",
        onOk: () => {
          this.$axios
            .get(this.resetPasswordAPI, {
              params: {
                id: this.studentId
              }
            })
            .then(res => {
              this.$Notice.success({
                title: "",
                desc: "操作成功",
                duration: 3
              });
            });
        }
      });
    },
  },
  components: {
    dataList,
    dialModal,
    dataInfo,
    officialClassRecord,
    callRecords,
  }
};
</script>
