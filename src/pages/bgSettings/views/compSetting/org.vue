<template>
    <div class="lead-content">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/components/breadcrumb">公司设置</BreadcrumbItem>
                <BreadcrumbItem>组织架构</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <Row class="organStructureBody">
            <Col span="4" class="organStructureLeft">
                <Menu ref="menu" theme="light" @on-select="" accordion class="organStructureLeftMenu"
                      @on-select="menuOnChange" @on-open-change="menuOnChange">
                    <div class="organStructureTitle">
                        <span style="font-size: 15px;">所有部门</span>
                    </div>
                    <!--第一层-->
                    <Submenu class="firstLayer" v-for="(item,key) in departmentList" :key="item.id" :name="item.name">
                        <div slot="title">
                            <div class="hoverSpan" @mouseenter.stop='hoverOver(item,key,"fir")'
                                 @mouseleave.stop='hoverOut(item,key,"fir")' @click="getUsers(item)">
                                <!--<Icon v-if="menu.icon" :type="item.icon"></Icon>-->
                                {{ item.name }}
                                <hoverHandleBtn v-if="item.isHover" :item="item" @showeditmodal="editDepart"
                                                @refresh="refresh"
                                                @showaddmodal="addDepart"
                                                @showdeletemodal="deleteDepart"></hoverHandleBtn>
                            </div>
                        </div>
                        <div v-if="item.all_children">
                            <!--二层start-->
                            <template v-for="(sec_item,sec_key) in item.all_children">
                                <template v-if="sec_item.all_children.length">
                                    <Submenu class="secondLayer" :name="sec_item.name">
                                        <div slot="title">
                                            <div @mouseenter.stop='hoverOver(sec_item,sec_key,"sec")'
                                                 @mouseleave.stop='hoverOut(sec_item,sec_key,"sec")'
                                                 @click="getUsers(sec_item)">
                                                <!--<Icon v-if="menu.icon" :type="item.icon"></Icon>-->
                                                {{ sec_item.name }}
                                                <hoverHandleBtn v-if="sec_item.isHover" :item="sec_item"
                                                                @showeditmodal="editDepart"
                                                                @refresh="refresh" @showaddmodal="addDepart"
                                                                @showdeletemodal="deleteDepart"></hoverHandleBtn>
                                            </div>
                                        </div>
                                        <div v-if="sec_item.all_children">
                                            <!--<MenuItem v-for="(thi_item,thi_key) in sec_item.all_children" :key="thi_item.id"-->
                                            <!--:name="thi_item.name"  >-->
                                            <!--<div @mouseenter.stop='hoverOver(thi_item,thi_key,"thi")'-->
                                            <!--@mouseleave.stop='hoverOut(thi_item,thi_key,"thi")' @click="getUsers(thi_item)">-->
                                            <!--{{ thi_item.name }}-->
                                            <!--<hoverHandleBtn v-if="thi_item.isHover" :item="thi_item" @showeditmodal="editDepart"-->
                                            <!--@refresh="refresh" @showaddmodal="addDepart"-->
                                            <!--@showdeletemodal="deleteDepart"></hoverHandleBtn>-->
                                            <!--</div>-->
                                            <!--</MenuItem>-->
                                            <!--三层start-->
                                            <template v-for="(thi_item,thi_key) in sec_item.all_children">
                                                <template v-if="thi_item.all_children.length">
                                                    <Submenu class="thirdLayer" :name="thi_item.name">
                                                        <div slot="title">
                                                            <div @mouseenter.stop='hoverOver(thi_item,thi_key,"thi")'
                                                                 @mouseleave.stop='hoverOut(thi_item,thi_key,"thi")'
                                                                 @click="getUsers(thi_item)">
                                                                <!--<Icon v-if="menu.icon" :type="item.icon"></Icon>-->
                                                                {{ thi_item.name }}
                                                                <hoverHandleBtn v-if="thi_item.isHover" :item="thi_item"
                                                                                @showeditmodal="editDepart"
                                                                                @refresh="refresh"
                                                                                @showaddmodal="addDepart"
                                                                                @showdeletemodal="deleteDepart"></hoverHandleBtn>
                                                            </div>
                                                        </div>
                                                        <div v-if="thi_item.all_children">
                                                            <!--<MenuItem v-for="(for_item,for_key) in thi_item.all_children" :key="for_item.id"-->
                                                            <!--:name="for_item.name"  >-->
                                                            <!--<div @mouseenter.stop='hoverOver(for_item,for_key,"for")'-->
                                                            <!--@mouseleave.stop='hoverOut(for_item,for_key,"for")' @click="getUsers(for_item)">-->
                                                            <!--{{ for_item.name }}-->
                                                            <!--<hoverHandleBtn v-if="for_item.isHover" :item="for_item" @showeditmodal="editDepart"-->
                                                            <!--@refresh="refresh" @showaddmodal="addDepart"-->
                                                            <!--@showdeletemodal="deleteDepart"></hoverHandleBtn>-->
                                                            <!--</div>-->
                                                            <!--</MenuItem>-->
                                                            <!--四层start-->
                                                            <template
                                                                    v-for="(for_item,for_key) in thi_item.all_children">
                                                                <template v-if="for_item.all_children.length">
                                                                    <Submenu class="forthLayer" :name="for_item.name">
                                                                        <div slot="title">
                                                                            <div @mouseenter.stop='hoverOver(for_item,for_key,"thi")'
                                                                                 @mouseleave.stop='hoverOut(for_item,for_key,"thi")'
                                                                                 @click="getUsers(for_item)">
                                                                                <!--<Icon v-if="menu.icon" :type="item.icon"></Icon>-->
                                                                                {{ for_item.name }}
                                                                                <hoverHandleBtn v-if="for_item.isHover"
                                                                                                :item="for_item"
                                                                                                @showeditmodal="editDepart"
                                                                                                @refresh="refresh"
                                                                                                @showaddmodal="addDepart"
                                                                                                @showdeletemodal="deleteDepart"></hoverHandleBtn>
                                                                            </div>
                                                                        </div>
                                                                        <div v-if="for_item.all_children">
                                                                            <MenuItem
                                                                                    v-for="(fif_item,fif_key) in for_item.all_children"
                                                                                    :key="fif_item.id"
                                                                                    :name="fif_item.name">
                                                                                <div @mouseenter.stop='hoverOver(fif_item,fif_key,"fif")'
                                                                                     @mouseleave.stop='hoverOut(fif_item,fif_key,"fif")'
                                                                                     @click="getUsers(fif_item)">
                                                                                    {{ fif_item.name }}
                                                                                    <hoverHandleBtn
                                                                                            v-if="fif_item.isHover"
                                                                                            :item="fif_item"
                                                                                            @showeditmodal="editDepart"
                                                                                            @refresh="refresh"
                                                                                            @showaddmodal="addDepart"
                                                                                            @showdeletemodal="deleteDepart"></hoverHandleBtn>
                                                                                </div>
                                                                            </MenuItem>
                                                                        </div>
                                                                    </Submenu>
                                                                </template>
                                                                <template v-else>
                                                                    <MenuItem class="forthLayer2" :name="for_item.name"
                                                                              @on-select="getUsers(for_item)">
                                                                        <div @mouseenter.stop='hoverOver(for_item,for_key,"for")'
                                                                             @mouseleave.stop='hoverOut(for_item,for_key,"for")'
                                                                             @click="getUsers(for_item)">
                                                                            {{ for_item.name }}
                                                                            <hoverHandleBtn v-if="for_item.isHover"
                                                                                            :item="for_item"
                                                                                            @showeditmodal="editDepart"
                                                                                            @refresh="refresh"
                                                                                            @showaddmodal="addDepart"
                                                                                            @showdeletemodal="deleteDepart"></hoverHandleBtn>
                                                                        </div>
                                                                    </MenuItem>
                                                                </template>
                                                            </template>
                                                            <!--四层end-->
                                                        </div>
                                                    </Submenu>
                                                </template>
                                                <template v-else>
                                                    <MenuItem class="thirdLayer2" :name="thi_item.name">
                                                        <div @mouseenter.stop='hoverOver(thi_item,thi_key,"thi")'
                                                             @mouseleave.stop='hoverOut(thi_item,thi_key,"thi")'
                                                             @click="getUsers(thi_item)">
                                                            {{ thi_item.name }}
                                                            <hoverHandleBtn v-if="thi_item.isHover" :item="thi_item"
                                                                            @showeditmodal="editDepart"
                                                                            @refresh="refresh" @showaddmodal="addDepart"
                                                                            @showdeletemodal="deleteDepart"></hoverHandleBtn>
                                                        </div>
                                                    </MenuItem>
                                                </template>
                                            </template>
                                            <!--三层end-->
                                        </div>
                                    </Submenu>
                                </template>
                                <template v-else>
                                    <MenuItem class="secondLayer2" :name="sec_item.name">
                                        <div @mouseenter.stop='hoverOver(sec_item,sec_key,"sec")'
                                             @mouseleave.stop='hoverOut(sec_item,sec_key,"sec")'
                                             @click="getUsers(sec_item)">
                                            {{ sec_item.name }}
                                            <hoverHandleBtn v-if="sec_item.isHover" :item="sec_item"
                                                            @showeditmodal="editDepart"
                                                            @refresh="refresh" @showaddmodal="addDepart"
                                                            @showdeletemodal="deleteDepart"></hoverHandleBtn>
                                        </div>
                                    </MenuItem>
                                </template>
                            </template>
                            <!--二层end-->
                        </div>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="20" class="organStructureRight">
                <div class="organStructureRightInner">
                    <div class="organStructureRightBody">
                        <div class="tableContent">
                            <!--表格字段设置-->
                            <Row class="tableSetting2">
                                <Col class="tbs2">
                                    <Button class="addRoleBtn tbBtn" @click="">新增人员</Button>
                                    <Button class="updateBtn tbBtn" @click="sycnDingDing">同步钉钉</Button>
                                </Col>
                            </Row>
                            <Row class="tableSetting">
                                <Col class="dataOperate" span="12">
                                    <p>已选<span class="num">{{selectedNum}}</span>条数据 ：</p>
                                    <p v-show="selectedNum > 0">
                                        <Button @click="closeUser">封停</Button>
                                        <Button class="btn2" @click="bindRoles">绑定角色</Button>
                                        <Button class="btn4" @click="setExt" v-show="canSetExt">设置分机号</Button>
                                        <Button class="btn4" @click="resetPassword" v-show="canSetExt">重置密码</Button>
                                    </p>
                                </Col>
                                <Col class="sortTables" span="12">
                                    <Select class="select1" v-model="tableSelect" style="width:120px" transfer>
                                        <Option v-for="(item,index) in tableSelectList" :key="index"
                                                :value="item.field_name">
                                            {{item.field_name }}
                                        </Option>
                                    </Select>
                                    <Input class="input1" style="width:180px" @on-enter="relationClick"
                                           v-model="keywords" placeholder="请输入关键字"/>
                                    <Button class="btnSearch" @click="relationClick"><i
                                            class="iconfont icon-sousuo"></i></Button>
                                </Col>
                            </Row>

                            <!--表格内容-->
                            <Table class="tableData" @on-selection-change="selectChange"
                                   :columns="organStructureColumns" :data="organStructureData"
                                   border></Table>
                            <!--分页-->
                            <Page :total="pageTotal" :pageSize="pageNumber" :current="pageIndex" show-sizer
                                  show-elevator @on-change="pageChange"
                                  @on-page-size-change="pageSizeChange" show-total/>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Modal class="orgModal"
               title="设置分机号"
               v-model="setExtModal"
               :closable="false"
               :mask-closable="false"
               :loading="setExtLoading"
               @on-ok="setExtOk"
        >
            <Form :label-width="96">
                <FormItem label="线路：" style="width: 216px;">
                    <Select
                            style="width: 120px;"
                            v-model="line"
                            :transfer="true"
                            placeholder="请选择"
                    >
                        <Option
                                v-for="item in lines"
                                :key="item.key"
                                :value="item.key"
                        >{{ item.value }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Modal class="orgModal"
               :title="bindRY1Title"
               v-model="bindRY1Modal"
               :closable="false"
               :mask-closable="false"
               :loading="bindRY1Loading"
               @on-ok="bindRY1Ok"
        >
            <Form ref="bindRY1Form" :model="bindRY1Data" :rules="bindRY1Rule" :label-width="108">
                <FormItem label="坐席号：" prop="accountId">
                    <Select
                            style="width: 216px;"
                            v-model="bindRY1Data.accountId"
                            :transfer="true"
                            :class="['can-select']"
                            @on-change="ext1Change"
                            placeholder="请选择"
                    >
                        <Option
                                v-for="item in accounts"
                                :key="item.id"
                                :value="item.id"
                        >{{ item.voip_account }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="用户手机号：" style="width: 216px;" prop="extension_number">
                    <Input v-model="bindRY1Data.extension_number" readonly :maxlength="11" style="width: 216px;"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal class="orgModal"
               :title="bindRY2Title"
               v-model="bindRY2Modal"
               :closable="false"
               :mask-closable="false"
               :loading="bindRY2Loading"
               @on-ok="bindRY2Ok"
        >
            <Form ref="bindRY2Form" :model="bindRY2Data" :rules="bindRY2Rule" :label-width="108">
                <FormItem label="坐席号：" prop="accountId">
                    <Select
                            style="width: 216px;"
                            :class="['can-select']"
                            v-model="bindRY2Data.accountId"
                            :transfer="true"
                            @on-change="ext2Change"
                            placeholder="请选择"
                    >
                        <Option
                                v-for="item in accounts"
                                :key="item.id"
                                :value="item.id"
                        >{{ item.voip_account }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="坐席密码：">
                    <Input v-model="bindRY2Data.password" readonly style="width: 216px;"/>
                </FormItem>
                <FormItem label="显示号码：">
                    <Input v-model="bindRY2Data.display_phone" readonly style="width: 216px;"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal class="orgModal"
               :title="bindTRTitle"
               v-model="bindTRModal"
               :closable="false"
               :mask-closable="false"
               :loading="bindTRLoading"
               @on-ok="bindTROk"
        >
            <Form ref="bindTRForm" :model="bindTRData" :rules="bindTRRule" :label-width="108">
                <FormItem label="坐席号：" prop="voip_account">
                    <Input v-model="bindTRData.voip_account" style="width: 216px;"/>
                </FormItem>
                <FormItem label="坐席密码：" prop="password">
                    <Input v-model="bindTRData.password" style="width: 216px;"/>
                </FormItem>
                <FormItem label="座机号码：" prop="seat_no">
                    <Input v-model="bindTRData.seat_no" style="width: 216px;"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal class="orgModal"
               v-model="addDepartModal"
               title="添加部门"
               :closable="false"
               :mask-closable="false"
               :loading="addDepartLoading"
               @on-ok="addDepartOnOk('addDepartForm')">
            <i-form ref='addDepartForm' :model="addDepartForm" :rules="addDepartRule" :label-width="100">
                <Form-item label="部门名" prop="name">
                    <i-input v-model="addDepartForm.name"></i-input>
                </Form-item>
            </i-form>
        </Modal>
        <Modal class="orgModal"
               v-model="editDepartModal"
               title="编辑部门"
               :closable="false"
               :mask-closable="false"
               :loading="editDepartLoading"
               @on-ok="editDepartOk('editDepartForm')">
            <i-form ref='editDepartForm' :model="editDepartForm" :rules="editDepartRule" :label-width="100">
                <Form-item label="部门名" prop="name">
                    <i-input v-model="editDepartForm.name"></i-input>
                </Form-item>
            </i-form>
        </Modal>
        <!--绑定角色-->
        <Modal class="orgModal"
               v-model="bindRolesModal"
               title="绑定角色"
               :closable="false"
               :mask-closable="false">
            <i-form ref='bindRoles' :model="bindRolesForm" :rules="bindRolesRule" :label-width="100">
                <Form-item label="绑定角色" prop="role_ids">
                    <Select v-model="bindRolesForm.role_ids" filterable transfer multiple style="width:200px">
                        <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name_cn }}</Option>
                    </Select>
                </Form-item>
            </i-form>
            <div slot="footer">
                <Button type="text" size="large" @click="bindRolesModal=false">取消</Button>
                <Button type="primary" size="large" @click="bindRoles2('bindRoles')">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
  import {isMenu, getPermission} from '@/api/common';
  import {mapGetters} from 'vuex';
  import hoverHandleBtn from '@/components/hoverHandleBtn';
  import {getFieldOptions} from '../../../index/views/customer/getData';

  const phoneREG = /^1\d{10}$/; //手机正则

  /**
   * @param {voip_account} 坐席号
   * @param {extension_number} 用户手机号
   * @param {display_phone} 显示号码
   */
  const Ry1Data = function (accountId = '', voip_account = '', extension_number = '') {
    this.accountId = accountId;
    this.voip_account = voip_account;
    this.extension_number = extension_number;
  };

  const Ry2Data = function (accountId = '', voip_account = '', password = '', display_phone = '') {
    this.accountId = accountId;
    this.voip_account = voip_account;
    this.password = password;
    this.display_phone = display_phone;
  };

  const TRData = function (voip_account = '', password = '', seat_no = '') {
    this.voip_account = voip_account;
    this.password = password;
    this.seat_no = seat_no;
  };

  export default {
    data() {
      return {
        line: '',
        lines: [],
        lineCache: {},
        accounts: [],
        bindTRTitle: '',
        bindTRData: new TRData(),
        bindTRRule: {
          voip_account: [
            {required: true, message: '坐席号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          seat_no: [
            {required: true, message: '座机号不能为空', trigger: 'blur'}
          ],
        },
        bindRY1Title: '',
        bindRY1Data: new Ry1Data(),
        bindRY1Rule: {
          accountId: [
            {type: "number", required: true, message: '坐席号不能为空', trigger: 'blur'}
          ]
        },
        bindRY2Title: '',
        bindRY2Data: new Ry2Data(),
        bindRY2Rule: {
          accountId: [
            {type: "number", required: true, message: '坐席号不能为空', trigger: 'blur'}
          ],
        },
        api: {
          roleApi: this.$store.state.api.role.correlation, //获取与用户相关的角色
          bindingRoleToUser: this.$store.state.api.role.bindingRoleToUser, //给用户绑定角色
          sycnDingDingAPI: this.$store.state.api.department.sycnDingDing,//同步钉钉
          departmentsAPI: this.$store.state.api.department.departments, //获取部门列表
          getUsersAPI: this.$store.state.api.department.deptUsers,//获取部门下用户
          closeUserAPI: this.$store.state.api.department.closeUser,//封停用户
          searchUserAPI: this.$store.state.api.department.searchUser,//搜索
          callAccountAPI: this.$store.state.api.department.callAccount, //获取分机号数据
          bindCallAccountAPI: this.$store.state.api.department.bindCallAccount,//绑定分机号
          tianrunCallBindAPI: this.$store.state.tianrunCallBind, //绑定天润
          resetPwdAPI: this.$store.state.resetPwd, //重置
        },
        hasChildren: false,
        parentId: '', //parent_id
        departmentList: [],  // 所有部门
        addDepartModal: false,  //添加部门弹窗
        editDepartModal: false,  //编辑部门弹窗
        setExtModal: false, //设置分机号弹窗
        addDepartLoading: true,  //添加部门加载
        editDepartLoading: true,  //编辑部门加载
        sycnDingDingLoading: false, //同步钉钉Loading
        setExtLoading: true, //设置分机号Loading
        bindRY1Modal: false,
        bindRY1Loading: true,
        bindRY2Modal: false,
        bindRY2Loading: true,
        bindTRModal: false,
        bindTRLoading: true,
        canSetExt: false,
        addDepartForm: {
          name: '',
        },
        editDepartForm: {
          name: '',
        },
        addDepartRule: {
          name: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
        },
        editDepartRule: {
          name: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
        },
        indeterminate: true,
        checkAll: false,
        checkAllGroup: ['香蕉'],
        formItem: {},
        a: '',
        // table
        selectedNum: 0, //选择的表格数据个数
        selectionRows: [], //选择的表格数据
        tableSelect: '姓名',//默认选中姓名
        keywords: '',
        tableSelectList: [
          {
            field_name: '姓名'
          },
          {
            field_name: '电话'
          }
        ],
        organStructureColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '电话',
            key: 'mobile'
          },
          {
            title: '分机号',
            key: 'phone_ext'
          },
          {
            title: '基础角色',
            key: 'real_role'
          },
          {
            title: '是否主管',
            key: 'is_manager'
          },
          {
            title: '员工等级',
            key: 'employee_grade'
          },
          {
            title: '在职状态',
            key: 'employee_status'
          },
          {
            title: '账号状态',
            key: 'account_status'
          }
        ],
        organStructureData: [],
        pageNumber: 9,
        pageIndex: 1,
        pageTotal: 0,
        //绑定角色
        bindRolesModal: false,
        bindRolesForm: {
          role_ids: [],
          user_ids: [],
        },
        bindRolesRule: {
          role_ids: [
            {type: "array", required: true, message: '请选择角色', trigger: 'change'}
          ],
        },
        roleList: [],
      }
    },
    async mounted() {
      this.getAllDepartment();
      this.lines = await getFieldOptions('call_type');
      if (!this.lines.length) {
        this.lines = [
          {
            key: '1',
            value: '融营1'
          }, {
            key: '2',
            value: '融营2'
          },
          {
            key: '3',
            value: '天润'
          }
        ]
      }
      this.bindRY1Title = '绑定' + this.lines[0].value;
      this.bindRY2Title = '绑定' + this.lines[1].value;
      this.bindTRTitle = '绑定天润';
    },
    methods: {
      isMenu,
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
      openTRModal() {
        this.bindTRModal = true;
        this.bindTRData = new TRData();
      },
      openRY1Modal(data) {
        this.bindRY1Modal = true;
        this.bindRY1Data = new Ry1Data();
        this.accounts = data;
      },
      openRY2Modal(data) {
        this.bindRY2Modal = true;
        this.bindRY2Data = new Ry2Data();
        this.accounts = data;
      },
      bindRY1Ok() {
        this.$refs.bindRY1Form.validate(valid => {
          if (valid) {
            const chooseData = this.accounts.filter(e => e.id === this.bindRY1Data.accountId)[0];
            this.setExtPost(chooseData);
          } else {
            this.bindRY1Loading = false;
          }
        });
      },
      ext1Change() {
        const data = this.bindRY1Data;
        const chooseData = this.accounts.filter(e => e.id === data.accountId)[0];
        data.extension_number = chooseData.extension_number;
      },
      ext2Change() {
        const data = this.bindRY2Data;
        const chooseData = this.accounts.filter(e => e.id === data.accountId)[0];
        data.password = chooseData.password;
        data.display_phone = chooseData.display_phone;
      },
      bindRY2Ok() {
        this.$refs.bindRY2Form.validate(valid => {
          if (valid) {
            const chooseData = this.accounts.filter(e => e.id === this.bindRY2Data.accountId)[0];
            this.setExtPost(chooseData);
          } else {
            this.bindRY2Loading = false;
          }
        });
      },
      bindTROk() {
        this.$refs.bindTRForm.validate(valid => {
          if (valid) {
            const {voip_account, password, seat_no} = this.bindTRData;
            this.$axios.post(this.api.tianrunCallBindAPI, {
              mobile: this.selectionRows[0].mobile,
              voip_account,
              password,
              seat_no,
            }).then(res => {
              if (res.status) {
                this.$Notice.success({title: '', desc: '绑定成功', duration: 3});
              } else {
                this.$Notice.error({title: '', desc: '绑定失败', duration: 3});
              }
              this.bindTRModal = false;
            }, err => {
              this.bindTRModal = false;
              this.bindTRLoading = false;
            });
          } else {
            this.bindTRLoading = false;
          }
        });
      },
      landlineChange() {
      },
      setExtPost(chooseData) {
        this.$axios.post(this.api.bindCallAccountAPI, {
          user_id: this.selectionRows[0].id,
          call_type: this.line,
          voip_account: chooseData.voip_account || '',
          extension_number: chooseData.extension_number || '',
          password: chooseData.password || '',
        }).then(res => {
          if (res.status) {
            this.$Notice.success({
              title: '',
              desc: res.data.message,
              duration: 3,
            })
          }
          this.bindRY1Modal = false;
          this.bindRY2Modal = false;

        }, err => {
          this.bindRY1Loading = false;
          this.bindRY2Loading = false;
          this.bindTRLoading = false;
        });
      },
      setExtOk() {
        const openExtModal = data => {
          this.setExtModal = false;
          switch (this.line) {
            case '1':
              this.openRY1Modal(data);
              break;
            case '2':
              this.openRY2Modal(data);
              break;
            case '3':
              this.openTRModal();
              break;
            default:
              break;
          }
        }
        if (this.line !== '3') {
          this.$axios.get(this.api.callAccountAPI + `?call_type=${this.line}`)
            .then(data => {
              if (data.status) {
                this.lineCache[this.line] = data.data.data;
                openExtModal(data.data.data);
              } else {
                this.$Notice.error({
                  title: '',
                  desc: '获取分机号信息失败',
                  duration: 3,
                })
              }
            });
        } else {
          openExtModal();
        }
      },
      setExt() {
        this.setExtModal = true;
        this.line = '';
      },
      // 重置密码
      resetPassword() {
        let row = this.selectionRows;
        if (row.length > 1) {
          this.$Message.warning("一次只能重置一个人！");
          return false;
        }
        let app=this;
        app.$Modal.confirm({
          title: "重置密码",
          content:
            '<span class="trashText">确认将</span><span class="trashNames">' +
            row[0].name +
            '</span><span class="trashText">的密码重置吗？</span>',
          onOk: function () {
            this.$axios.post(app.api.resetPwdAPI, {
                user_id: row[0].id
              }).then(res => {
                app.$Notice.success({
                  title: "",
                  desc: "重置成功",
                  duration: 3
                });
              });
          }
        });
      },
      //同步钉钉获取组织架构和人员
      sycnDingDing() {
        this.$axios.get(this.api.sycnDingDingAPI).then(res => {
          this.$Notice.success({
            title: '',
            desc: '同步成功',
            duration: 3
          });
        });
      },
      // 获取部门列表
      getAllDepartment() {
        this.$axios.get(this.api.departmentsAPI).then(res => {
          if (res.data.status == "success") {
            this.departmentList = res.data.data[0].all_children;
            this.departmentList.forEach(function (item, index) {
              item.isHover = false
              item.all_children.forEach(function (item2, index) {
                item2.isHover = false
                item2.all_children.forEach(function (item3, index) {
                  item3.isHover = false
                })
              })
            })
          } else {
            this.$Notice.error({
              title: '',
              desc: '获取失败',
              duration: 3
            });
          }
        });
      },
      //添加部门
      addDepart(p_id) {
        this.addDepartModal = true
        this.parentId = p_id;
      },
      addDepartOnOk(name) {
        let app = this;
        this.addDepartLoading = false;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post(this.api.departmentsAPI, {
              name: this.addDepartForm.name,
              parent_id: this.parentId
            }).then(res => {
              if (res.data.status == "success") {
                app.$Notice.success({
                  title: '',
                  desc: '添加成功',
                  duration: 3
                });
              } else {
                app.$Notice.error({
                  title: '',
                  desc: '添加失败',
                  duration: 3
                });
              }
              this.addDepartModal = false
              this.getAllDepartment();
            });
          } else {
            setTimeout(() => {
              this.addDepartLoading = true;
            }, 0);
          }
        });
      },
      // 编辑部门
      editDepart(id) {
        this.editDepartModal = true
        this.departId = id;
      },
      editDepartOk(name) {
        let app = this
        this.editDepartLoading = false;
        let api = this.api.departmentsAPI + `/${this.departId}`
        this.$refs[name].validate((valid) => {
          if (valid) {
            app.$axios.put(api, {
              // parent_id: app.parentId,
              name: app.editDepartForm.name,
            }).then(res => {
              if (res.data.status == "success") {
                app.$Notice.success({
                  title: '',
                  desc: res.data.message,
                  duration: 3
                });
              } else {
                app.$Notice.error({
                  title: '',
                  desc: '编辑失败',
                  duration: 3
                });
              }
              app.editDepartModal = false
              app.getAllDepartment();
            });
          } else {
            setTimeout(() => {
              app.editDepartModal = false
              app.editDepartLoading = true;
            }, 0);
          }
        });
      },
      // 删除部门
      deleteDepart(id) {
        let app = this
        let api = this.api.departmentsAPI + `/${id}`
        this.$Modal.confirm({
          title: '',
          content: '确认删除？',
          onOk: function () {
            app.$axios.delete(api, {
              // params:{
              //   id: id,
              // }
            }).then(res => {
              if (res.data.status == "success") {
                app.$Notice.success({
                  title: '',
                  desc: '删除成功',
                  duration: 3
                });
              } else {
                app.$Notice.error({
                  title: '',
                  desc: '删除失败',
                  duration: 3
                });
              }
              app.$emit('refresh', 'success')
            });
          }
        });
      },
      //根据部门获取用户
      getUsers(department) {
        // this.$axios.get (this.api.getUsersAPI + department.id).then (res => {
        //   // console.log (res.data);
        //   this.organStructureData = res.data.data;
        // });
      },
      // 封停
      closeUser() {
        let app = this, res = []
        this.selectionRows.forEach(function (item, index) {
          res.push(item.id)
        })
        res = String(res)
        this.$axios.post(this.api.closeUserAPI, {
          id: res,
          employee_status: '0'
        }).then(res => {
          if (res.data.status == "success") {
            app.$Notice.success({
              title: '',
              desc: '封停成功',
              duration: 3
            });
          } else {
            app.$Notice.error({
              title: '',
              desc: '封停失败',
              duration: 3
            });
          }
          // this.getAllDepartment ();
        });
      },
      //绑定角色
      bindRoles() {
        this.bindRolesModal = true;
        this.getAllRoles();
      },
      bindRoles2(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post(this.api.bindingRoleToUser, this.bindRolesForm,{
              loading: false
            }).then(res => {
              this.$Notice.success({
                title: '',
                desc: '绑定成功',
                duration: 3
              });
              this.bindRolesModal = false;
              getPermission();//重新获取权限
            });
          }
        });
      },
      // 获取所有角色
      getAllRoles() {
        let userId = [];
        this.selectionRows.forEach(function (item, index) {
          userId.push(item.id)
        });
        this.bindRolesForm.user_ids = userId;
        this.$axios.get(this.api.roleApi, {
          params: {
            user_id: userId
          }
        }).then(res => {
          this.roleList = res.data.data.role_list;
          this.bindRolesForm.role_ids = res.data.data.role_ids;
        });
      },
      hoverOver(item, key, flag) {
        item.isHover = true;
        this.$set(this.departmentList, key, this.departmentList[key])
      },
      hoverOut(item, key, flag) {
        item.isHover = false;
        this.$set(this.departmentList, key, this.departmentList[key])
      },
      //table选中checkBox的数量
      selectChange(selection) {
        this.selectedNum = selection.length;
        if (this.selectedNum === 1) {
          this.canSetExt = true;
        } else {
          this.canSetExt = false;
        }
        this.selectionRows = selection;
      },
      // 点击左侧菜单
      menuOnChange(name) {
        let name1 = name;
        if (typeof(name) == "object") {//如果是组点击返回的是数组，其他是字符串
          if (name.length == 0) {
            this.pageNumber = 9
            this.organStructureData = []
            return false
          }
          name1 = name[name.length - 1];//取数组最后一个值
        }
        this.pageIndex = 1
        this.pageNumber = 1000
        // this.pageTotal = 0
        this.organStructureData = []
        let res = findItem(name1, this.departmentList)
        this.$axios.get(this.api.getUsersAPI + res.id).then(res => {
          this.organStructureData = res.data.data;
          this.pageTotal = res.data.data.length
        });
      },
      // 搜索
      relationClick() {
        if (this.tableSelect == '') {
          return false
        }
        this.pageNumber = 9
        this.organStructureData = []
        this.$axios.get(this.api.searchUserAPI, {
          params: {
            keyword: this.keywords,
            range: this.tableSelect,
            size: this.pageNumber,
            page: this.pageIndex,
          }
        }).then(res => {
          this.organStructureData = res.data.data.data;
          this.pageTotal = res.data.data.total;
        });
      },
      //页码改变
      pageChange(pageIndex) {
        // this.formItem.page = page;
        this.pageIndex = pageIndex;
        this.relationClick();
      },
      //页码size改变
      pageSizeChange(pageSize) {
        // this.formItem.size = pageSize;
        this.relationClick();
      },
      refresh(res) {
        this.getAllDepartment();
      }
    },
    components: {
      hoverHandleBtn,
    }
  }

  function findItem(name, arr) {
    let res
    (function eachArr(childArr) {
      for (let item of childArr) {
        if (item.name === name) {
          res = item
          break
        } else {
          if (item.all_children.length) {
            eachArr(item.all_children)
          }
        }
      }
    })(arr)
    return res
  }
</script>

<style lang="less">
    .organStructureBody {
        .organStructureLeft {
            border: 1px solid #DDE1E8;
            .organStructureLeftMenu {
                width: 100% !important;
                padding-bottom: 15px;
                .organStructureTitle {
                    font-size: 16px;
                    font-weight: 600;
                    text-align: left;
                    position: relative;
                    padding: 15px;
                    letter-spacing: 1px;
                    cursor: pointer;
                    color: #656E7D;
                }
                /*一级*/
                .firstLayer {
                    padding: 0 !important;
                    .ivu-menu-submenu-title {
                        text-align: left;
                        padding: 16px;
                        color: #6897C0;
                        font-size: 15px;
                        .ivu-menu-submenu-title-icon {
                            float: none;
                            position: absolute;
                            top: 20px;
                            left: 135px;
                        }
                    }
                    /*二级*/
                    .ivu-menu {
                        background: #F7FAFC;
                        .secondLayer {
                            .ivu-menu-submenu-title {
                                padding-left: 16px !important;
                                color: #656E7D;
                                text-align: left;
                                padding: 16px;
                                /*padding-left: 0!important;*/
                                font-size: 14px;
                                .ivu-menu-submenu-title-icon {
                                    float: none;
                                    position: absolute;
                                    top: 20px;
                                    left: 135px;
                                }
                            }
                            /*.ivu-menu-submenu-title:hover{*/
                            /*color: #81C3FC;*/
                            /*}*/
                            /*三级*/
                            .ivu-menu {
                                background: #E9F2F7;
                                .thirdLayer {
                                    .ivu-menu-submenu-title {
                                        padding-left: 16px !important;
                                        color: #656E7D;
                                        text-align: left;
                                        padding: 16px;
                                        font-size: 14px;
                                        .ivu-menu-submenu-title-icon {
                                            float: none;
                                            position: absolute;
                                            top: 20px;
                                            left: 135px;
                                        }
                                    }
                                    .ivu-menu-submenu-title:hover {
                                        color: #656E7D !important;
                                    }
                                    /*四级*/
                                    .ivu-menu {
                                        background: #E0EAF0;
                                        .forthLayer {
                                            color: #ABB2BF;
                                            .ivu-menu-submenu-title {
                                                padding-left: 16px !important;
                                                color: #ABB2BF;
                                                text-align: left;
                                                padding: 16px;
                                                font-size: 14px;
                                                .ivu-menu-submenu-title-icon {
                                                    float: none;
                                                    position: absolute;
                                                    top: 20px;
                                                    left: 135px;
                                                }
                                            }
                                        }
                                        .forthLayer2 {
                                            font-size: 14px;
                                            text-align: left;
                                            padding-left: 16px !important;
                                            &.ivu-menu-item-active {
                                                background: #07C4FE;
                                                color: #fff;
                                            }
                                        }
                                        .ivu-menu-item-active {
                                            background: #07C4FE;
                                            color: #fff;
                                        }
                                    }
                                }
                                .thirdLayer2 {
                                    font-size: 14px;
                                    text-align: left;
                                    padding-left: 16px !important;
                                    &.ivu-menu-item-active {
                                        background: #07C4FE;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                        .secondLayer2 {
                            font-size: 14px;
                            text-align: left;
                            padding-left: 16px !important;
                            &.ivu-menu-item-active {
                                background: #07C4FE;
                                color: #fff;
                            }
                        }
                        .ivu-menu-opened {
                            .ivu-menu-submenu-title {
                                color: #81C3FC;
                            }
                            .ivu-menu-submenu-title:hover {
                                color: #81C3FC !important;
                            }
                        }
                    }
                }
            }
            .organStructureLeftMenu:after {
                width: 0;
            }
        }
        .organStructureRight {
            .organStructureRightInner {
                margin-left: 10px;
                background: #fff;
                .organStructureRightBody {
                    border: 1px solid rgba(221, 225, 232, 1);
                    padding: 20px;
                    .tableContent {
                        margin: 0;
                        padding: 0 0 25px 0;
                        .tableSetting {
                            .dataOperate {
                                padding: 0 0 25px;
                                p:first-child {
                                    margin-top: 20px;
                                }
                                button {
                                    margin-top: 15px;
                                }
                            }
                            .sortTables {
                                justify-content: flex-end;
                                .select1 {
                                    margin-top: 10px;
                                }
                                .input1 {
                                    margin-top: 10px;
                                }
                                .btnSearch {
                                    margin-top: 10px;
                                }
                            }
                        }
                        .tableSetting2 {
                            .tbs2 {
                                float: right;
                                padding-bottom: 10px;
                                .tbBtn {
                                    width: 90px;
                                    height: 36px;
                                    border-radius: 18px;
                                    font-size: 13px;
                                    color: #fff;
                                    font-weight: 500;
                                    margin-right: 20px;
                                }
                                .addRoleBtn {
                                    background: #07C4FE
                                }
                                .addChannelBtn {
                                    background: #07C4FE
                                }
                                .updateBtn {
                                    background: #61B363
                                }
                            }
                        }
                        .tableData {
                            /*.ivu-table {*/
                            /*border: none;*/
                            /*border-top: 1px solid #dde1e8;*/
                            /*}*/
                            /*.ivu-table:after {*/
                            /*width: 0;*/
                            /*}*/
                        }
                    }
                }
            }
        }
    }
    .orgModal {
        .ivu-modal-footer {
            display: block !important;
        }
    }
    .can-select .ivu-select-selection {
        user-select: unset;
        -webkit-user-select: unset;
    }
</style>
