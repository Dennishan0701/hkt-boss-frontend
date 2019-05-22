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
                    <Menu-item v-for="(sec_menu) in menu.nextItem" :key="sec_menu.id" v-if="isMenu(sec_menu.isMenu)"
                               :name="'/' + sec_menu.path"
                               @click.native="updateMenuState(sec_menu)">
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
    props: [],
    data() {
      return {
        updated: true,
        menuName: '/res/market',
        mainName: 'res',
        menu_list: [
          {
            name: 'res',
            isMenu: "res",
            id: '1',
            title: '资源',
            icon: 'md-chatbubbles',
            nextItem: [
              {
                id: '11',
                isMenu: "res_mkt",
                path: 'res/market',
                title: '市场'
              },
              {
                id: '12',
                isMenu: "res_recommend",
                path: 'res/recommend',
                title: '推荐'
              },
              {
                id: '13',
                isMenu: "res_all",
                path: 'res/all',
                title: '全部'
              }
            ]
          },
          {
            name: 'customer',
            isMenu: "customer",
            id: '2',
            title: '客户',
            icon: 'md-call',
            nextItem: [
              {
                id: '11',
                isMenu: "customer_lead",
                path: 'customer/lead',
                title: '线索'
              },
              {
                id: '12',
                isMenu: "customer_conversation",
                path: 'customer/conversation',
                title: '洽谈'
              },
              {
                id: '13',
                isMenu: "customer_trial",
                path: 'customer/trial',
                title: '试听'
              },
              {
                id: '14',
                isMenu: "customer_deal",
                path: 'customer/deal',
                title: '成交',
                query_conditions: {
                  table: 'leads',
                  condition: 'is_paid',
                  value: '1'
                }
              },
              {
                id: '15',
                isMenu: "customer_all",
                path: 'customer/all',
                title: '全部'
              }
            ]
          },
          {
            name: 'student',
            id: '3',
            isMenu: "student",
            title: '学生',
            icon: 'md-school',
            nextItem: [
              {
                id: '13',
                isMenu: "student_arranged",
                path: 'student/toBeArranged',
                title: '入学安排'
              },
              {
                id: '14',
                isMenu: "student_student",
                path: 'student/student',
                title: '在读'
              }, {
                id: '15',
                isMenu: "student_refund",
                path: 'student/refund',
                title: '退费'
              }, {
                id: '16',
                isMenu: "student_all",
                path: 'student/all',
                title: '全部'
              }]
          },
          {
            name: 'team',
            id: '4',
            isMenu: "team",
            title: '团队',
            icon: 'ios-people',
            nextItem: [
              {
                id: '10',
                isMenu: "team_TMK",
                path: 'team/tmk_management',
                title: 'TMK管理'
              },
              {
                id: '11',
                isMenu: "team_CC",
                path: 'team/cc_management',
                title: 'CC管理'
              },
              {
                id: '12',
                isMenu: "team_CR",
                path: 'team/cr_management',
                title: 'CR管理'
              },
              {
                id: '13',
                isMenu: "team_TR",
                path: 'team/tr_management',
                title: 'TR管理'
              }
            ]
          },
          {
            name: 'deal',
            id: '5',
            isMenu: "deal",
            title: '结算',
            icon: 'md-cash',
            nextItem: [{
              id: '11',
              isMenu: "deal_order",
              path: 'deal/order',
              title: '订单'
            }, {
              id: '12',
              isMenu: "deal_payment",
              path: 'deal/payment',
              title: '流水'
            }, {
              id: '13',
              isMenu: "deal_lessons",
              path: 'deal/classEach',
              title: '课次'
            }, {
              id: '14',
              isMenu: "deal_hours",
              path: 'deal/classHour',
              title: '课时'
            }]
          }
        ],
      }
    },
    watch: {
      $route(newValue, oldValue) {
        this.menuName = newValue.path
        this.mainName = newValue.path.split('/')[1]
        this.$nextTick(() => {
          this.$refs.menu.updateOpened()
          this.$refs.menu.updateActiveName();
        });
      },
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
    mounted() {
      this.menuName = this.$route.path;
      this.mainName = this.$route.path.split('/')[1];
      // console.log(this.menuName);
      // console.log(this.mainName);
      // setTimeout(() => {
      //   this.$nextTick(() => {
      //     this.$refs.menu.updateOpened();
      //     this.$refs.menu.updateActiveName();
      //   });
      // }, 2000)
    },
    updated(){
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
      });
    },
    methods: {
      goPage(name) { // 点击菜单进入对应路由
        let app = this
        this.$nextTick(() => {
          app.$router.push(name)
        })
      },
      isMenu,
      //将当前菜单状态更新到全局
      updateMenuState(menu) {
        this.menuName = this.$route.path;
        this.mainName = this.$route.path.split('/')[1];
        // console.log(this.menuName);
        // console.log(this.mainName);
        this.$nextTick(() => {
          this.$refs.menu.updateOpened();
          this.$refs.menu.updateActiveName();
        });
        this.$store.commit("SET_MENUONE", menu.query_conditions);
        console.log(menu);
      }
    }
  }

</script>
