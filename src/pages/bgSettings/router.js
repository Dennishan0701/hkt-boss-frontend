import Vue from 'vue';
import Router from 'vue-router';


/*** 公共组件***/
import hello from '@/pages/index/views/hello' //初始首页
//公司设置
import org from '@/pages/bgSettings/views/compSetting/org'; //公司设置-组织架构
import rolePermission from '@/pages/bgSettings/views/compSetting/rolePermission'; //公司设置-角色权限
import compInfo from '@/pages/bgSettings/views/compSetting/compInfo'; //公司设置-公司信息
//名单策略
import manualStrategy from '@/pages/bgSettings/views/leadStrategy/manualStrategy'; //名单策略-分配策略
import autoStrategy from '@/pages/bgSettings/views/leadStrategy/autoStrategy'; //名单策略-自动分配

//价格策略
import priceStrategy from '@/pages/bgSettings/views/pricing/priceStrategy';//基本定价
import discountProgram from '@/pages/bgSettings/views/pricing/discountProgram';//优惠方案
//个人中心
import TMKWorkbench from '@/pages/index/views/ucenter/TMKWorkbench'; //TMK个人工作台
import CRWorkbench from '@/pages/index/views/ucenter/CRWorkbench'; //CR个人工作台
import CCWorkbench from '@/pages/index/views/ucenter/CCWorkbench'; //CC个人工作台
import TRWorkbench from '@/pages/index/views/ucenter/TRWorkbench'; //TR个人工作台
import messages from '@/pages/index/views/ucenter/messages'; //个人消息
//系统设置
import fieldSetting from '@/pages/bgSettings/views/system/fieldSetting';
import usageScope from '@/pages/bgSettings/views/system/usageScope';
//渠道设置
import allChannel from '@/pages/bgSettings/views/channel/allChannel';  //全部渠道

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/compSetting/org',
    },
    //hello
    {
      path: '/hello',
      name: '初始页面',
      component: hello
    },
    //公司设置
    {
      path: '/compSetting/org',
      name: '组织架构',
      component: org
    },
    {
      path: '/compSetting/rolePermission',
      name: '角色权限',
      component: rolePermission
    },
    {
      path: '/compSetting/compInfo',
      name: '公司信息',
      component: compInfo
    },
    //名单策略
    {
      path: '/leadStrategy/manualStrategy',
      name: '分配策略',
      component: manualStrategy
    },
    //价格策略
    {
      path: '/pricing/priceStrategy',
      name: '基本定价',
      component: priceStrategy
    },
    {
      path: '/pricing/discountProgram',
      name: '优惠方案',
      component: discountProgram
    },
    {
      path: '/leadStrategy/autoStrategy',
      name: '自动分配',
      component: autoStrategy
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
    //系统设置
    {
      path: '/system/fildSetting',
      name: '字段设置',
      component: fieldSetting
    },
    {
      path: '/system/usageScope',
      name: '可用设置',
      component: usageScope
    },
    //渠道设置
    {
      path: '/channel/allChannel',
      name: '全部渠道',
      component: allChannel
    }

  ]
});

Vue.use(Router);
