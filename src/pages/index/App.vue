<style>

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

</style>

<template>

    <div id="app">
        <div class="wrapper">
            <!--头部-->
            <menu-top v-show="menu_top" :class="{'hidden': !menu_top}" @on-change="keyTopChange"/>
            <!--左侧-->
            <menu-slide v-show="menu_slide" :class="{'hidden': !menu_slide}" :active_key="1-1" :openItems="openItems"/>
            <!--中间部分-切换路由-->
            <div class="wrapper-main">
                <div class="layout-content">
                    <transition name="router-fades" mode="out-in">
                        <router-view></router-view>
                    </transition>
                    <!--loading-->
                    <loading v-if="fetchLoading == 'true'"></loading>
                </div>
            </div>
        </div>
        <!--对话框-->
        <div v-if="fetchModal == 'true'">
            <modal :modalType="fetchmodalType"></modal>
        </div>
    </div>

</template>

<script>

  import {
    mapGetters
  }
    from 'vuex';
  import MenuTop from '@/components/menu-top.vue';
  import MenuSlide from '@/components/menu-slide.vue';
  import loading from '@/components/loading'; //loading
  import modal from '@/components/modal'; //对话框
  import $ from 'jquery';

  export default {
    name: 'App',
    components: {
      MenuTop,
      MenuSlide,
      loading,
      modal,
    },
    data() {
      return {
        // store: this.$store.state,
        menu_slide: true,
        menu_top: true,
        openItems: [],
      }
    },
    computed: {
      ...mapGetters([
        'fetchLoading',
        'fetchModal', //弹窗是否显示
        'fetchmodalType', //弹窗类型
      ]),
    },
    mounted() {
      // this.$Message.config({top: 13})
      if (sessionStorage.getItem('auth_user') == null) { //如果没有登陆信息再请求
        this.$axios.get(this.$store.state.api.user.getAuthUser).then(res => {
          let auth_user = res.data.data;
          sessionStorage.setItem('auth_user', JSON.stringify(auth_user));
        });
      }

      //前面已经实例化了Echo，现在就是要用这个Echo进行监听，实现广播功能
      // Echo.channel('everyone')
      //   .listen('OrderCreated', (e) => {
      //     console.log(e);
      //   });
      //订阅了名为 everyone的频道, 并监听 OrderCreated事件 （这是事件的类名，你也可以根据你的需要自定义）。
      // Echo.channel('everyone')
      //   .listen('TestEvent', (e) => {
      //      console.log(1234);alert(333);
      //     let i=Math.random();
      //     sessionStorage.setItem("messageList",e.message+i);
      //     this.$store.commit ("MESSAGE_LIST",e.message+i);
      //   });
    },
    watch: {
      $route: function (to, from) { // 路由监听
        let app = this
        // app.$nextTick(function () {
        //     app.menu_top = true
        //     app.menu_slide = true
        //     $('#menu-top').attr('class', 'menu-top')
        //     $('#menu-slide').attr('class', 'menu-slide')
        //     const name = app.$route.name
        //     const path = app.$route.path
        //     const matched = app.$route.matched
        //     const metainfo = matched[matched.length - 1].meta
        //     if (typeof metainfo.model !== 'undefined') {
        //         app.$store.dispatch('UPDATE_ACTIVE_KEY_TOP', metainfo.model)
        //     }
        //     if (typeof metainfo.parent === 'undefined') {
        //         app.$store.dispatch('UPDATE_ACTIVE_KEY', path)
        //     } else {
        //         app.$store.dispatch('UPDATE_ACTIVE_KEY', metainfo.parent)
        //     }
        //     let pid = 0
        //     $.each(app.menu_list_old, function (k, v) {
        //         if (v.model === app.active_key_top) {
        //             const index = app.openItems.indexOf(v.name)
        //             if (index !== -1) {
        //                 app.openItems.splice(index, 1)
        //             }
        //             if ('/' + v.path === path) {
        //                 pid = v.pid
        //             }
        //         }
        //     })
        //     $.each(app.menu_list, function (k, v) {
        //         if (v.id === pid) {
        //             app.openItems.push(v.name)
        //             return false
        //         }
        //     })
        //     app.$store.dispatch('UPDATE_OPEN_ITEMS', app.openItems)
        //     if (name === 'login') {
        //         $('#menu-top').attr('class', 'menu-top hide')
        //         $('#menu-slide').attr('class', 'menu-slide hide')
        //         app.menu_top = false
        //         // app.menu_slide = false
        //     }
        //     if (name === 'account_info' || name === 'project_task' || name === 'project_file_list' || name === 'project_build_list') {
        //         $('#menu-slide').attr('class', 'menu-slide hide')
        //         // app.menu_slide = false
        //     }
        // })
      }
    },
    methods: {
      keyTopChange(value) {
        // this.$store.dispatch('UPDATE_ACTIVE_KEY_TOP', value)
      }
    },
  }

</script>
