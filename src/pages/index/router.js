import Vue from 'vue';
import Router from 'vue-router';


/*** 公共组件***/
import hello from '@/pages/index/views/hello' //初始首页
//资源
import market from '@/pages/index/views/res/market' //资源-市场
import recommend from '@/pages/index/views/res/recommend' //资源-推荐
import allRes from '@/pages/index/views/res/all' //资源-全部页
//客户
import lead from '@/pages/index/views/customer/lead' //客户-线索
import conversation from '@/pages/index/views/customer/conversation' //客户-洽谈
import trial from '@/pages/index/views/customer/trial' //客户-试听
import deal from '@/pages/index/views/customer/deal' //客户-成交页
import allCustomer from '@/pages/index/views/customer/all' //客户-全部
import personInfo from '@/pages/index/views/customer/personInfo'; //个人档案页
import trialClassArrangement from '@/pages/index/views/customer/trialClassArrangement'; //排课详情页
//结算
import order from '@/pages/index/views/deal/order' //结算-订单
import payment from '@/pages/index/views/deal/payment' //结算-流水
import contract from '@/pages/index/views/deal/contract' //结算-合同
import classHour from '@/pages/index/views/deal/classHour' //结算-课时
import classEach from '@/pages/index/views/deal/classEach' //结算-课次

//学生
import toBeArranged from '@/pages/index/views/student/toBeArranged' //学生-待安排
import student from '@/pages/index/views/student/student' //学生-正式生
import refund from '@/pages/index/views/student/refund' //学生-正式生
import allStudent from '@/pages/index/views/student/all' //学生-正式生

//团队
import cc_management from '@/pages/index/views/team/cc_management' //团队-CC管理
import cr_management from '@/pages/index/views/team/cr_management' //团队-CR管理
import tr_management from '@/pages/index/views/team/tr_management' //团队-TR管理
import tmk_management from '@/pages/index/views/team/tmk_management' //团队-TR管理
//个人中心
import TMKWorkbench from '@/pages/index/views/ucenter/TMKWorkbench'; //TMK个人工作台
import CRWorkbench from '@/pages/index/views/ucenter/CRWorkbench'; //CR个人工作台
import CCWorkbench from '@/pages/index/views/ucenter/CCWorkbench'; //CC个人工作台
import TRWorkbench from '@/pages/index/views/ucenter/TRWorkbench'; //TR个人工作台
import messages from '@/pages/index/views/ucenter/messages'; //个人消息


export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/bgSettings',
      name: '后台设置',
      beforeEach(to, from, next) {
        window.location = "/bgSettings"
      }
    },
    {
      path: '/',
      redirect: '/hello',
    },
    //hello
    {
      path: '/hello',
      name: '初始页面',
      component: hello
    },
    //资源
    {
      path: '/res/market',
      name: '资源-市场',
      component: market
    },
    {
      path: '/res/recommend',
      name: '资源-推荐',
      component: recommend
    },
    {
      path: '/res/all',
      name: '资源-全部',
      component: allRes
    },
    //客户
    {
      path: '/customer/lead',
      name: '客户-线索',
      component: lead
    },
    {
      path: '/customer/conversation',
      name: '客户-洽谈',
      component: conversation
    },
    {
      path: '/customer/trial',
      name: '客户-试听',
      component: trial
    },
    {
      path: '/customer/deal',
      name: '客户-成交',
      component: deal
    },
    {
      path: '/customer/all',
      name: '客户-全部',
      component: allCustomer
    },
    {
      path: '/personInfo',
      name: '个人档案',
      component: personInfo
    },
    {
      path: '/trialClassArrangement/:id',
      // name: '排课详情',
      name: 'trialClassArrangement',
      component: trialClassArrangement
    },
    //报名
    {
      path: '/deal/order',
      name: '报名-订单',
      component: order
    },
    {
      path: '/deal/payment',
      name: '报名-流水',
      component: payment
    },
    {
      path: '/deal/classEach',
      name: '课次',
      component: classEach
    },
    {
      path: '/deal/classHour',
      name: '课时',
      component: classHour
    },
    {
      path: '/deal/contract',
      name: '报名-合同',
      component: contract
    },
    // 学生
    {
      path: '/student/toBeArranged',
      name: '学生-待安排',
      component: toBeArranged
    },

    {
      path: '/student/student',
      name: '学生-正式生',
      component: student
    },
    {
      path: '/student/refund',
      name: '学生-退费',
      component: refund
    },
    {
      path: '/student/all',
      name: '学生-全部',
      component: allStudent
    },
    //团队
    {
      path: '/team/cc_management',
      name: '团队-CC管理',
      component: cc_management
    },
    {
      path: '/team/cr_management',
      name: '团队-CR管理',
      component: cr_management
    },
    {
      path: '/team/tr_management',
      name: '团队-TR管理',
      component: tr_management
    },
    {
      path: '/team/tmk_management',
      name: '团队-TMK管理',
      component: tmk_management
    },

    //个人中心
    {
      path: '/ucenter/TMKWorkbench',
      name: 'TMK个人工作台',
      component: TMKWorkbench
    },
    {
      path: '/ucenter/CCWorkbench',
      name: 'CC个人工作台',
      component: CCWorkbench
    },
    {
      path: '/ucenter/CRWorkbench',
      name: 'CR个人工作台',
      component: CRWorkbench
    },
    {
      path: '/ucenter/TRWorkbench',
      name: 'TR个人工作台',
      component: TRWorkbench
    },
    {
      path: '/ucenter/messages',
      name: 'messages',
      component: messages
    },
  ]
});

Vue.use(Router);
