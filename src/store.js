import Vue from 'vue';
import Vuex from 'vuex';


Vue.use (Vuex);


const state = {
  fetchLoading: 'false', // 请求数据时加载状态loading
  fetchmodalType: '', // 弹窗类型
  fetchModal: 'false', // 弹窗是否显示
  clickOK: 0, // 点击了确定
  messageList: '', // 公告
  leadsShow: false, // 新增Leads弹窗是否显示
  leadsType: false, // 新增Leads弹窗是否显示(推荐人，推荐人手机号)
  current_main_menu_condition: '', // 一级菜单查询状态
  current_sub_menu_condition: '', // 二级菜单查询状态
  frontMenuList: '', // 权限数组集合
  roleList: '', // 权限数组集合
  roleId: '', // 当前角色id
  fetchChangePsw: 'false', // 修改密码
  currentTab: null, // 当前tab页的 路径 + tab_name 的组合
  pageMap: {}, // tableData组件中当前页数
}

const getters = {
  // 请求数据时加载状态
  fetchLoading: state => state.fetchLoading,
  fetchmodalType: state => state.fetchmodalType,
  fetchModal: state => state.fetchModal,
  clickOK: state => state.clickOK,
  messageList: state => state.messageList,
  leadsShow: state => state.leadsShow,
  leadsType: state => state.leadsType,
  frontMenuList: state => state.frontMenuList,
  roleList: state => state.roleList,
  roleId: state => state.roleId,
  fetchChangePsw: state => state.fetchChangePsw,
};


const actions = {
  // 请求数据时状态loading
  fetch_Loading ({commit}, res) {
    commit ('FETCH_LOADING', res);
  },
};

const mutations = {//Vue 建议mutation 类型用大写常量表示
  // 请求数据时loading
  FETCH_LOADING (state, res) {
    state.fetchLoading = res;
  },
  FETCH_MODALTYPE (state, res) {
    state.fetchmodalType = res;
  },
  FETCH_MODAL (state, res) {
    state.fetchModal = res;
  },
  CLICK_OK (state, res) {
    state.clickOK = res;
  },
  MESSAGE_LIST (state, res) {
    state.messageList = res;
  },
  LEADS_SHOW (state, res) {
    state.leadsShow = res;
  },
  LEADS_TYPE (state, res) {
    state.leadsType = res;
  },
  SET_MENUONE (state, res) {
    state.current_main_menu_condition = res;
  },
  SET_MENUTWO (state, res) {
    state.current_sub_menu_condition = res;
  },
  FRONT_MENULIST (state, res) {
    state.frontMenuList = res;
  },
  ROLE_LIST (state, res) {
    state.roleList = res;
  },
  ROLE_ID (state, res) {
    state.roleId = res;
  },
  CHANGE_PASSWORD (state, res) {
    state.fetchChangePsw = res;
  },
  UPDATE_PAGE (state, obj) {
    if (obj.name && obj.page) {
      state.pageMap[obj.name] = obj.page
    }
  },
  UPDATE_CURRENT_TAB (state, name) {
    if (state.currentTab !== name) {
      state.currentTab = name
    }
  }
};
export default new Vuex.Store ({
  state, getters, mutations, actions
})
