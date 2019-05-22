<!--<script src="../pages/index/main.js"></script>-->
<style lang="less">
    .marquee_box {
        display: block;
        position: relative;
        width: 400px;
        height: 30px; /*关键样式*/
        overflow: hidden;
        top: -59px;
        left: 162px;
    }

    .marquee_list {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .marquee_top {
        transition: top 0.5s;
    }

    /*关键样式*/
    .marquee_list li {
        height: 30px; /*关键样式*/
        line-height: 30px; /*关键样式*/
        /*font-size: 14px;*/
        padding-left: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .global-search {
      padding-left: 15px;
      .ivu-input {
        background: none;
        transform: translateY(6px);
        color: #fff;
        height: 28px;
        line-height: 28px;
        border-color: rgba(255, 255, 255, 0.3);
      }
    }
</style>

<template>
    <div>
        <div id="menu-top" :class="menu_top_class">
            <div class="menuTopL">
              <a href="/">
                  <img class="crmLogo" src="../assets/image/logo.png" alt="嗨课堂">
              </a>
              <div class="marquee_box">
                  <ul class="marquee_list" :style="{ top: -num*30+30 + 'px'}" :class="{marquee_top:num}">
                      <!-- 当显示最后一条的时候（num=0转换布尔类型为false）去掉过渡效果-->
                      <!--<li class="notice slide" v-for="(item, index) in messageList">-->
                      <!--<i class="iconfont icon-see-icon-m3-notice-fill"></i>-->
                      <!--<span>公告：{{item}}</span>-->
                      <!--</li>-->
                      <li class="notice slide">
                          <i class="iconfont icon-see-icon-m3-notice-fill"></i>
                          <span>{{oldMessage}}</span>
                      </li>
                  </ul>
              </div>
            </div>
            <div class="menuTopR">
                <img v-if="auth_user && auth_user.sex==0" class="user" src="../assets/image/age1.png" alt="头像">
                <img v-else class="user" src="../assets/image/age2.png" alt="头像">
                <!--<span class="name">周润发</span>-->
                <Dropdown>
                    <a href="javascript:void(0)" class="username">
                    <span class="name" v-if="auth_user">
                      {{auth_user.name}}（{{auth_user.department_format?auth_user.department_format:"非钉钉成员"}}）({{auth_user.id}})
                    </span>
                        <span class="name" v-else>登录失效，请退出重新登录！</span>
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <!--<DropdownItem @click.native="routerToWork(auth_user.real_role_format)">-->
                        <!--<p>个人工作台</p>-->
                        <!--&lt;!&ndash;<router-link to="/ucenter/workbench">个人工作台</router-link>&ndash;&gt;-->
                        <!--</DropdownItem>-->
                        <!--<DropdownItem>-->
                        <!--<router-link to="/ucenter/messages">消息中心</router-link>-->
                        <!--</DropdownItem>-->
                        <!--<DropdownItem @click.native="toggleShowDial">-->
                        <!--<a href="javascript:void(0)">拨打电话</a>-->
                        <!--</DropdownItem>-->
                        <!--<DropdownItem @click.native="toggleShowSMS">-->
                        <!--<a href="javascript:void(0)">发送短信</a>-->
                        <!--</DropdownItem>-->
                        <DropdownItem @click.native="resetPwd">
                            <a href="javascript:void(0)">修改密码</a>
                        </DropdownItem>
                        <!--<Dropdown placement="right-start">-->
                        <!--<DropdownItem>-->
                        <!--切换登录（测试）-->
                        <!--<Icon type="ios-arrow-forward"></Icon>-->
                        <!--</DropdownItem>-->
                        <!--<DropdownMenu slot="list">-->
                        <!--<DropdownItem @click.native="toggleTestUser('TMK')">TMK</DropdownItem>-->
                        <!--<DropdownItem @click.native="toggleTestUser('CC')">CC</DropdownItem>-->
                        <!--<DropdownItem @click.native="toggleTestUser('CR')">CR</DropdownItem>-->
                        <!--<DropdownItem @click.native="toggleTestUser('TR')">TR</DropdownItem>-->
                        <!--<DropdownItem @click.native="toggleTestUser('ADMIN')">ADMIN</DropdownItem>-->
                        <!--</DropdownMenu>-->
                        <!--</Dropdown>-->
                    </DropdownMenu>
                </Dropdown>
                <Input
                  v-if="false"
                  v-model="enter_context"
                  class="global-search" style="width: 180px;"
                  placeholder="姓名/手机号 回车搜索"
                  @keyup.native.enter="globalSearch"
                ></Input>
                <!--<span class="role">销售总监</span>-->
                <Select class="role" v-model="role" style="width: 100px;text-align: center;"" transfer @on-change="changePermission">
                    <Option v-for="(el,index) in roleList" :key="index" :value="el.id">{{el.name_cn}}</Option>
                </Select>
                <span class="line">|</span>
                <span class="setting" v-if="isMenu('set')">
                  <a href="/bgSettings.html">设置</a>
                </span>
                <span class="signOut" @click="signOut">退出</span>
            </div>
            <Modal v-model="showDial" title="拨打自定义电话" @on-cancel="" :mask-closable="false">
                <Form inline>
                    <FormItem>
                        <Input type="text" v-model="mobile" placeholder="请输入电话号码..." style="width:350px">
                            <Icon type="md-call" slot="prepend"/>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="dial">拨打</Button>
                    </FormItem>
                </Form>
            </Modal>
            <Modal v-model="showSMS" title="发送自定义短信" @on-cancel="showSMS=false"
                   :mask-closable="false">
                <Form ref="formItem" :model="formItem" :rules="ruleItem" :label-width="100">
                    <FormItem label="电话号码" prop="mobile">
                        <Input type="text" v-model="formItem.mobile" placeholder="请输入电话号码..."
                               style="width:350px"></Input>
                    </FormItem>
                    <FormItem label="短信内容" prop="smsContent">
                        <Input type="textarea" v-model="formItem.smsContent" placeholder="请输入短信内容..."
                               style="width:350px"
                               :autosize="{minRows: 4,maxRows: 6}"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="send('formItem')">发送</Button>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!--修改密码-->
        <resetPwd v-if="fetchChangePsw == 'true'" ref="resetPwd"></resetPwd>
    </div>
</template>

<script>
  const phoneREG = /^1\d{10}$/; //手机
  import RULE from '@/api/infoRule';
  import {mapGetters} from 'vuex';
  import {getPermission} from '@/api/common';
  import {isMenu} from '@/api/common';
  import resetPwd from '@/components/resetPwd';

  let scroll;
  export default {
    components: {
      resetPwd
    },
    props: {},
    data() {
      return {
        enter_context: null,
        getPermissionAPI: this.$store.state.api.role.getPermission,//获取前端权限
        role: "",//当前角色id
        // auth_user: JSON.parse(sessionStorage.getItem('auth_user')),
        oldMessage: "",
        num: 0,
        messageLengh: "",
        interval: "",
        dialCallAPI: this.$store.state.dialCall,
        sendSmsAPI: this.$store.state.sendSms,
        show_hello: false,
        store: this.$store.state,
        my_handler_active: false,
        notify_list: [],
        search_focus: false,
        search_keyword: '',
        search_data: [{
          'title': '项目',
          'children': []
        }, {
          'title': '任务',
          'children': []
        }],
        show_task_detail: false,
        taskId: 0,
        taskIndex: 0,
        showDial: false,
        showSMS: false,
        mobile: '',
        formItem: {
          mobile: '',
          smsContent: '',
        },
        ruleItem: {
          mobile: [{required: true, validator: RULE().validatePhone, trigger: 'blur'},],
          smsContent: [{
            required: true,
            message: '请输入短信内容',
            trigger: 'blur'
          }],
        }
      }
    },
    watch: {
      messageList(newValue, oldValue) {
        // console.log(newValue);
        // if (newValue.length > 0) {
        //   console.log(this.num);
        //   this.message_list=newValue;
        //   // this.messageScroll(this.num, newValue);
        //   if(newValue.length>0){
        //     this.messageScroll(this.num, newValue);
        //   }

        // }
        if (newValue) {
          //1、清除old
          this.oldMessage = "";
          this.num = 0;
          //2、清除定时器
          clearTimeout(scroll);
          //3、old赋值
          this.oldMessage = newValue;
          //4,特效+定时器恢复初始状态
          setTimeout(() => {
            this.num = 1;
          }, 1);//立即做滑动
          scroll = setTimeout(() => {
            this.oldMessage = "";
            this.num = 0;
            this.$store.commit("MESSAGE_LIST", "");
            sessionStorage.setItem("messageList", "");
          }, 60000);//30秒后清0
        }
      },
    },
    computed: {
      ...mapGetters([
        'messageList',
        "roleId",//当前角色id
        "roleList",//可切换角色集合
        'fetchChangePsw',//修改密码
      ]),
      menu_top_class: function () {
        if (this.show_menu_slide) {
          return 'menu-top'
        } else {
          return 'menu-top hide'
        }
      },
      auth_user() {
        return JSON.parse(sessionStorage.getItem('auth_user'));
      }
    },
    created() {
    },
    updated() {
      // console.log(this.roleId);
      this.role = this.roleId;
    },
    mounted() {
      // console.log(this.auth_user);
      // 防止刷新后没有message
      let messageList = sessionStorage.getItem("messageList");
      if (messageList) {
        this.$store.commit("MESSAGE_LIST", messageList);
      }
      getPermission();
      // if(!this.role){
      //   this.getPermission();
      // }

      this.isFirst();
    },
    methods: {
      isMenu,
      //切换前端权限
      changePermission(value) {
        this.$store.commit("ROLE_ID", value);
        getPermission(value);
      },
      // 全局搜索
      globalSearch() {
        const val = this.enter_context
        if (val.trim()) {
          this.$axios.post(`${API}/api/global-searching`, {
            'enter_context': val
          }).then(res => {
            if (res.status) {
              console.log('res', res)
            }
          })
        }
      },
      //公告滚动
      messageScroll: function (num, messageList) {
        this.messageLength = messageList.length;
        var max = messageList.length;//消息列表个数
        console.log("num:" + num);
        console.log("max:" + max);
        if (max > 1) {//多条消息，每30秒滑动一次，并删除这条消息
          if (this.num == 0) {//如果刚刚开始
            setTimeout(() => {
              num++;
              this.num = num;
            }, 1);//立即做滑动
          }
          window.clearInterval(this.interval);
          console.log(this.interval);
          this.interval = setInterval(() => {
            num++;
            var max = this.messageList.length;//消息列表个数
            console.log(max);
            if (num > max) {//消息全部展示完毕，回到初始
              num = 0;
              messageList = [];
              this.$store.commit("MESSAGE_LIST", messageList);
              sessionStorage.setItem("messageList", JSON.stringify(messageList));
              window.clearInterval(this.interval);
              this.num = 0;
            }
            this.num = num;
          }, 1000);
        }
        else if (max == 1) {//只有一条消息，往上滑动一次
          setTimeout(() => {
            num++;
            this.num = num;
          }, 1);//立即做滑动
          setTimeout(() => {
            messageList = [];
            this.$store.commit("MESSAGE_LIST", messageList);
            sessionStorage.setItem("messageList", JSON.stringify(messageList));
            this.num = 0;
          }, 3000);//30秒后清0
        }

      },
      toggleShowDial() {
        this.showDial = !this.showDial;
      },
      toggleShowSMS() {
        this.showSMS = !this.showSMS;
      },
      //退出
      signOut() {
        localStorage.clear();
        sessionStorage.clear();
        const origin = window.location.origin;
        window.location.href = origin;
      },
      // 拨打
      dial() {
        if (this.mobile) {
          if (!phoneREG.test(this.mobile)) {
            this.$Notice.warning({
              title: '',
              desc: '请输入正确的手机号',
              duration: 3
            });
          } else {
            this.$axios.post(this.dialCallAPI, {
              tophone: this.mobile,
              main_id: this.auth_user.id
            }).then(res => {
              this.$Notice.success({
                title: '',
                desc: '拨打成功',
                duration: 3
              });
            })
          }
        } else {
          this.$Notice.warning({
            title: '',
            desc: '请输入要拨打的号码',
            duration: 3
          });
        }
      },
      send(name) {//发送自定义短信
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post(this.sendSmsAPI, {
              phone: this.mobile,
              content: this.smsContent
            }).then(res => {
              this.$Notice.success({
                title: '',
                desc: '发送成功',
                duration: 3
              });
              this.showSMS = false;
            });
          }
        });
      },
      routerToWork(role) {
        if (role = "TMK") {
          this.$router.push({path: '/ucenter/TMKWorkbench'});
        }
        else if (role = "CR") {
          this.$router.push({path: '/ucenter/CRWorkbench'});
        }
        else if (role = "CC") {
          this.$router.push({path: '/ucenter/CCWorkbench'});
        }
        else if (role = "TR") {
          this.$router.push({path: '/ucenter/TRWorkbench'});
        }
      },
      toggleTestUser(role) {
        this.$axios.post(this.$store.state.api.user.getAuthUser, {'role': role}).then(res => {
          console.log(res.data.data);
          let auth_user = res.data.data;
          sessionStorage.setItem('auth_user', JSON.stringify(auth_user));

          this.$Notice.success({
            title: '',
            desc: '切换成功！',
            duration: 1,
            onClose: function () {
              // window.location.reload();
            }
          });
        });
      },

      //是否是首次登陆，首次登陆的话，展示修改密码弹窗
      isFirst() {
        const isFirst = sessionStorage.getItem('isFirst');
        if (isFirst == "true") {
          this.$store.commit("CHANGE_PASSWORD", "true");
        }
      },
      //修改密码
      resetPwd() {
        this.$store.commit("CHANGE_PASSWORD", "true");
        console.log(111);
      }
    },
  }

</script>
