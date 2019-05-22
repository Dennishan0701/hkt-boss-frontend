<template>

    <div id="menu-slide" class="menu-slide">
        <Menu ref="menu" width="180px" theme="light" :active-name='menuName' :open-names="[mainName]"
              @on-select="goPage" accordion>
            <Submenu v-for="(menu) in menu_list" :key="menu.id" :name="menu.name" v-if="isMenu(menu.isMenu)">
                <template slot="title">
                    <Icon v-if="menu.icon" :type="menu.icon"></Icon>
                    {{ menu.title }}
                </template>
                <div v-if="menu.nextItem">
                    <Menu-item v-for="(sec_menu) in menu.nextItem" :key="sec_menu.id" :name="'/' + sec_menu.path"
                               v-if="isMenu(sec_menu.isMenu)">
                        {{ sec_menu.title }}
                    </Menu-item>
                </div>
            </Submenu>
        </Menu>
    </div>

</template>

<script type="es6">

  // import * as utils from '../assets/js/utils'
  // import {mapState} from 'vuex'
  // import $ from 'jquery'
  // import '@/assets/css/main.less'
  import {isMenu} from '@/api/common';

  export default {
    props: {
      active_key: {
        type: Number
      },
      openItems: {
        type: Array
      },
      menuModel: { // 菜单分组
        type: String
      }
    },
    data() {
      return {
        menuName: '/org',
        mainName: 'compSetting',
        updated: true,
        menu_list: [{
          name: 'compSetting',
          id: '1',
          title: '公司设置',
          isMenu: "company",
          icon: 'md-briefcase',
          nextItem: [
            {
              id: '11',
              isMenu: "company_department_user",
              path: 'compSetting/org',
              title: '组织架构'
            },
            {
              id: '12',
              isMenu: "company_department_user",
              path: 'compSetting/rolePermission',
              title: '角色权限'
            },
            {
              id: '13',
              isMenu: "company_info",
              path: 'compSetting/compInfo',
              title: '公司信息'
            }
          ]
        },
          {
            name: 'channel',
            id: '2',
            isMenu: "channel",
            title: '渠道设置',
            icon: 'md-git-network',
            nextItem: [
              {
                id: '22',
                isMenu: "channel_all",
                path: 'channel/allChannel',
                title: '全部渠道'
              }
            ]
          },
          {
            name: 'leadStrategy',
            id: '3',
            isMenu: "list",
            title: '名单策略',
            icon: 'ios-funnel',
            nextItem: [
              {
                id: '11',
                isMenu: "list_allot",
                path: 'leadStrategy/manualStrategy',
                title: '分配策略'
              },
              {
                id: '12',
                isMenu: "list_auto_allot",
                path: 'leadStrategy/autoStrategy',
                title: '自动分配'
              },
              {
                id: '13',
                isMenu: "list_auto_recycle",
                path: 'leadStrategy/autoRecycle',
                title: '自动回收'
              }
            ]
          },
          {
            name: 'pricing',
            id: '6',
            isMenu: "price",
            title: '价格策略',
            icon: 'logo-yen',
            nextItem: [
              {
                id: '1',
                isMenu: "price_basic_pricing",
                path: 'pricing/priceStrategy',
                title: '基本定价'
              },
              {
                id: '2',
                isMenu: "price_preferential_scheme",
                path: 'pricing/discountProgram',
                title: '优惠方案'
              }
            ]
          },
          {
            name: '7',
            id: '7',
            isMenu: "course_scheduling",
            title: '排课设置',
            icon: 'md-calendar'
          },
          {
            name: '8',
            id: '8',
            isMenu: "announcement",
            title: '通知公告',
            icon: 'ios-megaphone'
          },
          {
            name: 'system',
            id: '9',
            isMenu: "system",
            title: '系统设置',
            icon: 'md-settings',
            nextItem: [
              {
                id: '11',
                isMenu: "system_field_set",
                path: 'system/fildSetting',
                title: '字段设置'
              },
              {
                id: '12',
                isMenu: "system_usable_set",
                path: 'system/usageScope',
                title: '可用设置'
              }
            ]
          }
        ]
      }
    },
    mounted() {
      console.log(this.$route.path);
      this.menuName = this.$route.path
      this.mainName = this.$route.path.split('/')[1]
      // setTimeout(() => {
      //   this.$nextTick(() => {
      //     this.$refs.menu.updateOpened();
      //     this.$refs.menu.updateActiveName();
      //   });
      // }, 1000)
    },
    updated(){
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
      });
    },
    watch: {
      // $route: function () {
      //     this.$nextTick(() => {
      //         this.$refs.menu.updateOpened(this.open_items)
      //     });
      // },
      // active_slide_key: function () {
      //   this.$nextTick(() => {
      //     this.$refs.menu.updateOpened(this.open_items)
      //   })
      // }
    },
    computed: {
      // ...mapState({
      //   show_menu_slide: state => state.show_menu_slide,
      //   menu_data: state => state.menu.menu_data,
      //   active_slide_key: state => state.menu.active_key,
      //   open_items: state => state.menu.open_items
      // }),
      // menu_slide_class: function () {
      //   if (this.show_menu_slide) {
      //     return 'menu-slide'
      //   } else {
      //     return 'menu-slide hide'
      //   }
      // }
    },
    methods: {
      isMenu,
      goPage(name) { // 点击菜单进入对应路由
        let app = this
        this.$nextTick(() => {
          app.$router.push(name)
        })
      }
    }
  }

</script>
