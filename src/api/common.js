/**
 *
 * 《公共方法》
 *
 *
 */
import Vue from 'vue';
import {Notice, Message, Modal, Spin} from 'iview';
import apiBase from './api.config';
import axios from 'axios';
import qs from 'qs';
import stores from '../store';
import router from '../pages/index/router';
import {_} from 'vue-underscore';
import echarts from 'echarts'; // 引入echarts
Vue.prototype.$echarts = echarts;
import Moment from 'moment';

/*
 *
 * 封装moment.js
 * 日期处理函数
 * 12.4KB
 *
 * */
Moment.locale('zh-cn');
Vue.prototype.moment = Moment;

//Laravel Echo Socket
import Echo from "laravel-echo"
//Laravel Echo 是一个 JavaScript 库，它使得订阅频道和监听由 Laravel 广播的事件变得非常容易。

// window.io = require('socket.io-client');
// window.Echo = new Echo({
//     broadcaster: 'socket.io',
//     host: 'http://onlyhi-crm.test' + ':6001'
// });
// window.io = require('socket.io-client');
//
// window.Echo = new Echo({// 创建一个全新的 Echo 实例
//     broadcaster: 'socket.io',
//     host: window.location.hostname + ':6001'
//     //host: apiBase('api') + ':6001'
// });

//循环处理表格数据（把关联表拉平）
// window.unfold = function unfold(res, _key, obj) {
// export function unfold(res, _key, obj) {
//
//
//     _.each(res, (value, key) => {
//         console.log(res,key);
//         if (_.isObject(value)) {
//
//             if (_key) {
//                 console.log(`123`);
//                 unfold(value, _key + '_' + key, obj)
//             } else {
//                 //console.log(value, key, obj);
//                 unfold(value, key, obj)
//             }
//
//         } else {
//             console.log(key);
//             obj[_key + '_' + key] = value
//         }
//
//     })
//
// }

// 用underscore的api写会有点兼容性问题，改用ES6语法
export function unfold(res, _key, obj) {
  Object.keys(res).forEach(function (key) {
    //console.log(key,res[key]);

    if (_.isObject(res[key])) {
      if (_key) {
        unfold(res[key], _key + '_' + key, obj);
      } else {
        unfold(res[key], key, obj);
      }
    } else {
      obj[_key + '_' + key] = res[key];
    }
  });
}

//获取权限
export function getPermission(role){
  return new Promise((resolve, reject) => {
    Axios.post(stores.state.api.role.getPermission,{
      role_id: role
    },{ loading:false }).then( res => {
      stores.commit("ROLE_ID", res.data.data.role_id);
      stores.commit("ROLE_LIST", res.data.data.roles);
      stores.commit("FRONT_MENULIST", res.data.data.permissions.map(e => e.trim()));

      // stores.commit("ROLE_LIST", res.data.data);
      if(role){
        router.push({path:'/hello'});
        // window.location.href="/hello"
      }
      resolve(res.data.data);
    });
  });

}

// 判断菜单按钮等是否有权限展示
export function isMenu(name) {
  let frontMenuList = stores.state.frontMenuList;
  // let frontMenuList = stores.state.roleList.permissions;
  // let frontMenuList = JSON.parse(sessionStorage.getItem("frontMenuList"));
  // console.log(frontMenuList);
  // console.log(name);
  if (frontMenuList.includes(name)) {
    return true;
  } else {
    return false;
  }
}

/*
 *
 * 封装获取URL参数
 *
 * */

export function GetQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/*
 *
 * AXIOS封装
 *
 * */

let AJAX_NUM = 0;
const token = localStorage.getItem('token');
const Axios = axios.create({
  baseURL: apiBase('api'),
  timeout: 30000,
  // responseType: "json",
  withCredentials: true, // 允许带cookie
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
  loading: true,
});

// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  (config) => {
    // 未登录(本地测试使用)
    if (!token) {
      window.location.href = '/static/login.html';
    } else {
      // 若是有做鉴权token , 就给头部带上token
      // config.headers.token = token;
      config.headers.Authorization = 'Bearer ' + token;
    }

    //loading显示
    if (config.loading) {
      AJAX_NUM++;
      stores.dispatch('fetch_Loading', 'true');
    }

    // if (
    //   config.method === "post" ||
    //   config.method === "put" ||
    //   config.method === "delete"
    // ) {
    //   // 序列化
    //   config.data = qs.stringify(config.data);
    // }

    return config;
  },
  (error) => {
    Notice.error({
      title: error.data.message || error.data.msg,
      desc: '',
      duration: 2,
    });

    return Promise.reject(error.data.message || error.data.msg);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  (res) => {
    //loading隐藏
    AJAX_NUM--;
    if (AJAX_NUM <= 0) {
      AJAX_NUM = 0;
      stores.dispatch('fetch_Loading', 'false');
    }

    // if (res.data.code !== 200) {
    // if (res.data.code < 200||res.data.code>= 300) {
    //   Notice.error({
    //     title: res.data.message || res.data.msg,
    //     desc: '',
    //     duration:2,
    //   });
    //   return Promise.reject(res.data.message || res.data.msg);
    //
    // }
    // else {
    //
    //   return res;
    //
    // }
    if (res.data || res) {
      if (res.data.status === 'error') {
        Notice.error({
          title: res.data.message || res.data.msg,
          desc: '',
          duration: 2,
        })
        return Promise.reject(res.data.message || res.data.msg)
      } else {
        return res
      }
    }
    // if (res.data.status == 'error') {
    //   Notice.error({
    //     title: res.data.message || res.data.msg,
    //     desc: '',
    //     duration: 2,
    //   });
    //   return Promise.reject(res.data.message || res.data.msg);
    // } else if (res.data.status == 'success') {
    //   return res;
    // } else if (res.data.hasError === false ) {
    //   return res;
    // }
  },
  (error) => {
    AJAX_NUM = 0;
    stores.dispatch('fetch_Loading', 'false');

    if (error.response.status == 422) {
      Notice.error({
        title: '请求参数错误 ' + error.response.status,
        desc: JSON.stringify(error.response.data.errors),
        duration: 10,
      });
    }
    else if (error.response.status == 401) {
      if (error.response.data.code == 115) {
        window.location.href = '/static/login.html';
        return;
      }
      Notice.error({
        title: '',
        desc: "没有权限进行操作，请联系管理员",
        duration: 5,
      });
    } else {
      Notice.error({
        title: '请求异常 ' + error.response.status,
        desc: JSON.stringify(error.response.data.errors),
        duration: 20,
      });
    }

    return Promise.reject(error);
  }
);
Vue.prototype.$axios = Axios;
export const $axios = Axios;

/*
 *
 * 获取当前时间戳
 *
 * */

export function timestamp() {
  return new Promise((resolve, reject) => {
    Axios.get(stores.state.timestamp, {
      loading: false,
    }).then((res) => {
      let serverTime=res.data.data.serverTime+"000";
      let timeDifference = (new Date().getTimezoneOffset() + 480) * 60000;
      // let timestamp = res.data.data.serverTime + timeDifference;
      let timestamp =serverTime + timeDifference;
      let date = Moment(timestamp);
      let time = {
        timestamp: timestamp,
        date: date,
        year: date.year(),
        month: date.month() + 1,
        week: date.week(),
        day: date.date(),
        hour: date.hour(),
        minute: date.minute(),
        second: date.second(),
        dateISO: date.format('YYYY-MM-DD'),
        weekInMonth: date.week() - Moment(date.format('YYYY-MM') + '-01').week(),
      };
      resolve(time);
    });
  });
}

/*
 *
 * 添加Class
 *
 * */

export function addClass(element, new_name) {
  if (!element || !new_name) return false;
  if (element.className) {
    let old_class_name = element.className;
    element.className = old_class_name + ' ' + new_name;
  } else {
    element.className = new_name;
  }
  return true;
}

/*
 *
 * 删除Class
 *
 * */

export function removeClass(element, class_name) {
  if (!element || !class_name) return false;
  if (!element.className) return false;
  let all_names = element.className.split(' ');
  for (var i = 0; i < all_names.length; i++) {
    if (all_names[i] === class_name) {
      all_names.splice(i, 1);
      element.className = '';
      for (let j = 0; j < all_names.length; j++) {
        element.className += ' ';
        element.className += all_names[j];
      }
      return true;
    }
  }
}

/*
 *
 * 秒转时分秒
 *
 * */

export function forMatTime(j) {
  var ex = Math.ceil(j),
    g = Math.floor(ex / 3600),
    d = Math.floor(ex / 60) % 60,
    f = ex % 60,
    k = (d > 9 ? d : '0' + d) + ':' + (f > 9 ? f : '0' + f),
    // if (g > 0) {
    //   k = g + ":" + k;
    // }
    q = (g > 9 ? g : '0' + g) + ':' + k;

  return q;
}

// 时间戳转化为时间
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime) return true;
  }
}
