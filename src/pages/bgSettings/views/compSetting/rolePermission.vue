<template>
    <div class="lead-content">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/components/breadcrumb">公司设置</BreadcrumbItem>
                <BreadcrumbItem>角色权限</BreadcrumbItem>
            </Breadcrumb>
            <p class="rightActions" @click="savePermissions">保存权限</p>
            <!--{{checkList}}-->
            <!--{{menuList1}}-->
            <!--{{menuList2}}-->
        </div>
        <Row class="rolePermissionBody">
            <!--角色-->
            <Col span="4" class="rolePermissionLeft">
                <Menu theme="light" ref="menu" :active-name="activeName" class="rolePermissionLeftMenu">
                    <div class="addRole" @click="addRoleModal=true"><span style="font-size: 15px;">角色</span>
                        <Icon class="addRoleIcon" type="ios-add-circle-outline"/>
                    </div>
                    <MenuItem v-for="(item,key) in roleList" :name="item.id" :key="key">
                        <div @mouseenter='hoverOver(key)' @mouseleave='hoverOut(key)' @click="getPermission(item.id)">
                            {{item.name_cn}}
                            <span style="float: right; margin-top: -1px;" v-if="item.isHover">
                                <Tooltip trigger="hover" content="编辑" theme="light">
                                    <Icon type="md-create" size="15" @click="editRole(item)" color="#C9CED6"/>
                                </Tooltip>
                                <Tooltip trigger="hover" content="删除" theme="light">
                                    <Icon type="ios-trash-outline" size="16" @click="deleteRole(item)" color="#C9CED6"
                                          style="margin-left: 6px;"/>
                                </Tooltip>
                            </span>
                        </div>
                    </MenuItem>
                </Menu>
            </Col>
            <!--权限-->
            <Col span="20" class="rolePermissionRight">
                <div class="rolePermissionRightInner">
                    <div class="rolePermissionRightBody">
                        <Tabs type="card" :animated="false" class="tabs" @on-click="changeTab">
                            <TabPane label="模块权限">
                                <div class="rolePermissionRightContent">
                                    <Form :model="formItem" :label-width="120" label-position="left">
                                        <FormItem v-for="(el,index) in module_permission"
                                                  :label="el.group_name_cn" :key="index">
                                            <div class="rolePermissionRightList rolePermissionRightList1">
                                                <Checkbox :value="el.checked"
                                                          @on-change="checkAll(1,el.data,el.checked,index,'id')">
                                                    全选
                                                </Checkbox>
                                                <CheckboxGroup v-model="checkList"
                                                               @on-change="checkIfAll(el,'checked','id')">
                                                    <Checkbox v-for="(el2,index2) in el.data" :label="el2.id"
                                                              :key="index2">{{el2.name_cn}}
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </div>
                                            <Divider/>
                                        </FormItem>
                                    </Form>
                                </div>
                            </TabPane>
                            <TabPane label="数据权限">
                                <div class="rolePermissionRightContent">
                                    <Form :model="formItem" :label-width="120" label-position="left">
                                        <FormItem :label="data_permission.group_name_cn">
                                            <div class="rolePermissionRightList rolePermissionRightList1">
                                                <CheckboxGroup v-model="checkList" @on-change="checkRaido(el.id)"
                                                               v-for="(el,index) in data_permission.data" :key="index">
                                                    <Checkbox :label="el.id">
                                                        {{el.name_cn}}
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </div>
                                        </FormItem>
                                    </Form>
                                </div>
                            </TabPane>
                            <TabPane label="菜单权限">
                                <div class="menuPermission">
                                    <p class="menuTitle">前台目录权限</p>
                                    <!--check-strictly-->
                                    <!--在显示复选框的情况下，是否严格的遵循父子不互相关联的做法-->
                                    <Tree :data="menu_permission1" ref="tree1" multiple
                                          @on-check-change="choiceAll(1)"
                                          show-checkbox></Tree>
                                </div>
                                <div class="menuPermission">
                                    <p class="menuTitle">后台目录权限</p>
                                    <Tree :data="menu_permission2" ref="tree2" multiple
                                          @on-check-change="choiceAll(2)"
                                          show-checkbox></Tree>
                                </div>
                            </TabPane>
                            <TabPane label="表字段权限">
                                <div class="rolePermissionRightContent clearfix">
                                    <div class="bzdList bzdList1" v-for="(el,index) in field_permission"
                                         :key="index" style="margin-bottom: 40px;">
                                        <!--表头-->
                                        <div class="bzdListTop">
                                            <span class="bzdListTitle">{{el.group_name_cn}}</span>
                                            <div class="bzdListCheckWrap">
                                                <Checkbox class="bzdListCheck bzdListCheck1"
                                                          :value="el.showChecked"
                                                          @on-change="checkAll(2,el.data,el.showChecked,index,'show_id')">
                                                    全选
                                                </Checkbox>
                                                <Checkbox class="bzdListCheck bzdListCheck2"
                                                          :value="el.editChecked"
                                                          @on-change="checkAll(3,el.data,el.editChecked,index,'edit_id')">
                                                    全选
                                                </Checkbox>
                                            </div>
                                        </div>
                                        <!--表数据-->
                                        <div class="bzdListContent">
                                            <Table class="bzdListTable" ref="selection" :columns="fieldHeaders"
                                                   :data="el.data">
                                                <template slot-scope="{ row, index }" slot="see">
                                                    <CheckboxGroup v-model="checkList"
                                                                   @on-change="checkIfAll(el,'showChecked','show_id')">
                                                        <Checkbox :label="row.show_id">查看</Checkbox>
                                                    </CheckboxGroup>
                                                </template>
                                                <template slot-scope="{ row, index }" slot="edit">
                                                    <CheckboxGroup v-model="checkList"
                                                                   @on-change="checkIfAll(el,'editChecked','edit_id')">
                                                        <Checkbox :label="row.edit_id">编辑</Checkbox>
                                                    </CheckboxGroup>
                                                </template>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Col>
        </Row>
        <Modal class="roleModal"
               v-model="addRoleModal"
               title="添加角色"
               :closable="false"
               :mask-closable="false"
               :loading="addRoleLoading"
               @on-ok="addRoleOnOk('addRoleForm')">
            <i-form ref='addRoleForm' :model="addRoleForm" :rules="addRoleRule" :label-width="100">
                <Form-item label="英文角色名" prop="eName">
                    <i-input v-model="addRoleForm.eName"></i-input>
                </Form-item>
                <Form-item label="中文角色名" prop="cName">
                    <i-input v-model="addRoleForm.cName"></i-input>
                </Form-item>
            </i-form>
        </Modal>
        <Modal class="roleModal"
               v-model="editRoleModal"
               title="编辑角色"
               :closable="false"
               :mask-closable="false"
               :loading="editRoleLoading"
               @on-ok="editRoleOk('editRoleForm')">
            <i-form ref='editRoleForm' :model="editRoleForm" :rules="editRoleRule" :label-width="100">
                <Form-item label="英文角色名" prop="eName">
                    <i-input v-model="editRoleForm.eName"></i-input>
                </Form-item>
                <Form-item label="中文角色名" prop="cName">
                    <i-input v-model="editRoleForm.cName"></i-input>
                </Form-item>
            </i-form>
        </Modal>
    </div>
</template>
<script>
  import $ from 'jquery';
  import {isMenu} from '@/api/common';

  export default {
    data() {
      return {
        roleApi: this.$store.state.api.role.getAllRole, //获取所有角色
        permissionApi: this.$store.state.api.role.permission, //获取所有权限
        rolePermission: this.$store.state.api.role.rolePermission, //获取角色的权限
        bindingToRole: this.$store.state.api.role.bindingToRole,//绑定角色的权限
        activeName: 1,
        roleId: '', //角色ID
        roleList: [],  // 所有角色
        addRoleModal: false,  //添加角色弹窗
        editRoleModal: false,  //编辑角色弹窗
        addRoleLoading: true,  //添加角色加载
        editRoleLoading: true,  //编辑角色加载
        addRoleForm: {
          eName: '',
          cName: '',
        },
        editRoleForm: {
          eName: '',
          cName: '',
        },
        addRoleRule: {
          eName: [
            {required: true, message: '请输入英文角色名', trigger: 'blur'}
          ],
          cName: [
            {required: true, message: '请输入中文角色名', trigger: 'blur'}
          ],
        },
        editRoleRule: {
          eName: [
            {required: true, message: '请输入英文角色名', trigger: 'blur'}
          ],
          cName: [
            {required: true, message: '请输入中文角色名', trigger: 'blur'}
          ],
        },
        permission: [],//角色权限列表
        module_permission: [],//1、模块权限
        data_permission: {},//2、数据权限
        menu_permission1: [],//3、菜单权限（后台目录权限初始化）
        menu_permission2: [],//菜单权限（前台目录权限初始化）
        menuList1: [],//后台所选择的菜单权限
        menuList2: [],//前台所选择的菜单权限
        field_permission: [],//表字段权限
        checkList: [],//角色的已选权限
        formItem: {},
        fieldHeaders: [
          {
            title: '字段',
            key: 'name_cn',
            align: 'center',
            width: 170
          },
          {
            title: "查看",
            align: 'center',
            width: 100,
            slot: "see",
          },
          {
            title: "编辑",
            align: 'center',
            width: 100,
            slot: "edit",
          },
        ],
      }
    },
    mounted() {
      this.getAllRoles();

    },
    methods: {
      isMenu,
      //角色start
      // 获取所有角色
      getAllRoles() {
        this.$axios.get(this.roleApi).then(res => {
          if (res.data.status == "success") {
            this.roleList = res.data.data;
            this.roleList.forEach(function (item) {
              item.isHover = false
            })
          } else {
            this.$Notice.error({
              title: '',
              desc: '获取角色失败',
              duration: 3
            });
          }
          this.activeName = this.roleList[0].id;
          this.$nextTick(() => {
            this.$refs.menu.updateActiveName();//默认选中的active
          });
          this.roleId = this.roleList[0].id;
          this.getPermission(this.roleId);
        });
      },
      //添加角色
      addRoleOnOk(name) {
        this.addRoleLoading = false;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post(this.roleApi, {
              name: this.addRoleForm.eName,
              name_cn: this.addRoleForm.cName
            }).then(res => {
              this.$Notice.success({
                title: '',
                desc: res.data.message,
                duration: 3
              });
              this.addRoleModal = false
              this.getAllRoles();
            });
          } else {
            setTimeout(() => {
              this.addRoleLoading = true;
            }, 0);
          }
        });
      },
      // 编辑角色
      editRole(item) {
        console.log(item);
        this.editRoleModal = true
        this.roleId = item.id;
        this.editRoleForm.eName = item.name;
        this.editRoleForm.cName = item.name_cn;
      },
      editRoleOk(name) {
        let app = this
        this.editRoleLoading = false;
        let api = this.roleApi + `/${this.roleId}`
        this.$refs[name].validate((valid) => {
          if (valid) {
            app.$axios.put(api, {
              id: app.roleId,
              name: app.editRoleForm.eName,
              name_cn: app.editRoleForm.cName
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
                  desc: '编辑角色失败',
                  duration: 3
                });
              }
              app.editRoleModal = false
              app.getAllRoles();
            });
          } else {
            setTimeout(() => {
              app.editRoleModal = false
              app.editRoleLoading = true;
            }, 0);
          }
        });
      },
      // 删除角色
      deleteRole(item) {
        let app = this;
        let id = item.id
        let api = this.roleApi + `/${id}`
        this.$Modal.confirm({
          title: '删除角色',
          content: '确认删除<span style="color:red;">' + item.name_cn + '</span>这个角色吗？',
          onOk: function () {
            app.$axios.delete(api, {
              params: {
                id: id,
              }
            }).then(res => {
              if (res.data.status == "success") {
                app.$Notice.success({
                  title: '',
                  desc: '删除角色成功',
                  duration: 3
                });
              } else {
                app.$Notice.error({
                  title: '',
                  desc: '删除角色失败',
                  duration: 3
                });
              }
              app.getAllRoles();
            });
          }
        });
      },
      hoverOver(key) {
        this.roleList[key].isHover = true;
        this.$set(this.roleList, key, this.roleList[key]);
      },
      hoverOut(key) {
        this.roleList[key].isHover = false;
        this.$set(this.roleList, key, this.roleList[key]);
      },
      //角色end
      //权限start
      //获取角色的所有权限
      getPermission(id) {
        this.roleId = id;
        let app = this;
        let URL = this.rolePermission + "/" + id
        this.$axios.get(URL).then(res => {
          this.permission = res.data.data;
          this.checkList = res.data.data.permission_list;
          // console.log(this.checkList);
          //1、模块权限(初始化)
          this.module_permission = res.data.data.module_permission;
          //模块权限-每个小模块-全选初始化
          this.isCheckAll(this.module_permission, 'id', 'checked');
          //2、数据权限（初始化）
          this.data_permission = res.data.data.data_permission[0];
          //3、菜单权限（初始化）
          let menu_permission1 = res.data.data.menu_permission[0].data;//后台目录
          let menu_permission2 = res.data.data.menu_permission[1].data;//前台目录
          this.menuList1 = [];
          this.menuList2 = [];
          this.menu_permission1 = [];
          this.menu_permission2 = [];
          this.menuInitialization(menu_permission1, this.menu_permission1, this.menuList1);
          this.menuInitialization(menu_permission2, this.menu_permission2, this.menuList2);
          //4、表字段权限（初始化）
          this.field_permission = res.data.data.field_permission;
          this.isCheckAll(this.field_permission, 'show_id', 'showChecked');
          this.isCheckAll(this.field_permission, 'edit_id', 'editChecked');
        });
      },
      //1、模块权限/4、表字段权限
      //给每个模块的全选默认初始化，全选是否选中
      isCheckAll(permission, id, checked) {
        console.log(permission);
        let app = this;
        permission.forEach(function (item, index) {//循环每个模块权限
          item[checked] = true;//小模块的全选=>默认选中
          item.data.forEach(function (item2, index2) {//循环每个模块权限的小模块
            if (!app.checkList.includes(item2[id])) {//小模块每个值都被选中=》全选选中
              item[checked] = false;////如果小模块里有一个没有选中，则全选为false
            }
          });
        });
        console.log(permission);
      },
      // 模块权限-每个小模块-点击全选
      checkAll(type, data, checked, index, id) {
        let app = this;
        console.log(type);
        console.log(id);
        console.log(checked);
        // console.log(data);
        if (checked) {//如果取消全选
          if (type == 1) {
            this.module_permission[index].checked = false;
          }
          else if (type == 2) {
            this.field_permission[index].showChecked = false;
          }
          else if (type == 3) {
            this.field_permission[index].editChecked = false;
          }
          //循环模块权限的小权限id，如果存在选中，删除他
          data.forEach(function (item, index) {
            let tt = $.inArray(item[id], app.checkList);
            if (tt >= 0) {
              app.checkList.splice(tt, 1);
            }
          })
        }
        else {//如果非全选点击全选
          if (type == 1) {
            this.module_permission[index].checked = true;
          }
          else if (type == 2) {
            this.field_permission[index].showChecked = true;
          }
          else if (type == 3) {
            this.field_permission[index].editChecked = true;
          }
          data.forEach(function (item, index) {
            // console.log(id);
            if (!app.checkList.includes(item[id])) {//将未选中的全部push
              app.checkList.push(item[id]);
            }
          })
        }
      },
      // 模块权限/表字段权限-每个小模块-checkbox点击change
      checkIfAll(group, checked, id) {
        let app = this;
        group[checked] = true;
        group.data.forEach(function (item, index) {
          if (!app.checkList.includes(item[id])) {//将未选中的全部push
            group[checked] = false;
          }
        })
      },
      //2、数据权限
      // 点击只能单选
      checkRaido(id) {
        if ($.inArray(id, this.checkList) >= 0) {//如果选中将其他删除
          let data = this.data_permission.data;
          for (var i = 0; i < data.length; i++) {
            var index = $.inArray(data[i].id, this.checkList);
            if ((data[i].id != id) && (index >= 0)) {
              this.checkList.splice(index, 1);
            }
          }
        }
      },
      //3、菜单权限
      //菜单权限，前台后台权限-初始化
      menuInitialization(menu, menu_permission, menulist) {//未处理数据，处理后数据，选中的数据
        let app = this;
        //一级
        menu.forEach(function (item, index) {
          let children = [];
          //二级
          item.all_children.forEach(function (item2, index) {
            let children2 = [];
            //如果有三级
            if (item2.all_children.length > 0) {
              //三级
              item2.all_children.forEach(function (item3, index) {
                // if (app.checkList.includes(item3.id)) {
                let tt = $.inArray(item3.id, app.checkList);
                if (tt >= 0) {//如果已经选中
                  menulist.push(item3.id);
                  app.checkList.splice(tt, 1);
                  children2.push({
                    title: item3.name_cn,
                    value: item3.id,
                    checked: true
                  });
                }
                else {
                  children2.push({
                    title: item3.name_cn,
                    value: item3.id,
                    checked: false
                  });
                }

              })
              let tt = $.inArray(item2.id, app.checkList);
              if (tt >= 0) {//如果已经选中
                menulist.push(item2.id);
                app.checkList.splice(tt, 1);
              }
              children.push({
                title: item2.name_cn,
                value: item2.id,
                // checked: true,
                expand: true,
                children: children2
              });
              // if (tt >= 0) {//如果已经选中
              //   menulist.push(item2.id);
              //   app.checkList.splice(tt, 1);
              //   children.push({
              //     title: item2.name_cn,
              //     value: item2.id,
              //     checked: true,
              //     expand: true,
              //     children: children2
              //   });
              // }
              // else{
              //   menulist.push(item2.id);
              //   app.checkList.splice(tt, 1);
              //   children.push({
              //     title: item2.name_cn,
              //     value: item2.id,
              //     checked: false,
              //     expand: true,
              //     children: children2
              //   });
              // }
            }
            //如果没有三级
            else {
              // if (app.checkList.includes(item2.id)) {
              let tt = $.inArray(item2.id, app.checkList);
              if (tt >= 0) {//如果已经选中
                menulist.push(item2.id);
                app.checkList.splice(tt, 1);
                children.push({
                  title: item2.name_cn,
                  value: item2.id,
                  checked: true,
                  expand: true,
                  children: children2
                });
              }
              else {
                children.push({
                  title: item2.name_cn,
                  value: item2.id,
                  checked: false,
                  expand: true,
                  children: children2
                });
              }
            }
          });
          let tt = $.inArray(item.id, app.checkList);
          if (tt >= 0) {//如果已经选中
            menulist.push(item.id);
            app.checkList.splice(tt, 1);
          }
          menu_permission.push({
            title: item.name_cn,
            value: item.id,
            //     checked: true,
            expand: true,
            children: children
          });
          // if (tt >= 0) {//如果已经选中
          //   menulist.push(item.id);
          //   app.checkList.splice(tt, 1);
          //   menu_permission.push({
          //     title: item.name_cn,
          //     value: item.id,
          //     checked: true,
          //     expand: true,
          //     children: children
          //   });
          // }
          // else {
          //   menu_permission.push({
          //     title: item.name_cn,
          //     value: item.id,
          //     checked: false,
          //     expand: true,
          //     children: children
          //   });
          // }
        })
        // console.log(menu_permission);
      },
      //菜单权限树形选择change
      choiceAll(tree) {//菜单选择change，没有的push进去，有的删除
        let app = this;
        if (tree == 1) {
          // let data = this.$refs.tree1.getCheckedNodes();//获取被勾选的节点
          let data = this.$refs.tree1.getCheckedAndIndeterminateNodes();//获取选中及半选节点
          console.log(data);
          app.menuList1 = [];
          data.forEach(function (item, index) {
            if (item.value) {
              app.menuList1.push(item.value);
            }
          });
        }
        else {
          // let data = this.$refs.tree2.getCheckedNodes();
          let data = this.$refs.tree2.getCheckedAndIndeterminateNodes();//获取选中及半选节点
          app.menuList2 = [];
          data.forEach(function (item, index) {
            if (item.value) {
              app.menuList2.push(item.value);
            }
          });
        }
      },
      //保存权限
      savePermissions() {
        let data = [...this.checkList, ...this.menuList1, ...this.menuList2];
        this.$axios.post(this.bindingToRole, {
          id: this.roleId,
          permission_list: data
        }).then(res => {
          this.$Notice.success({
            title: '',
            desc: '保存权限成功',
            duration: 3
          });
        });
      },
      //权限end
      //切换tab
      changeTab(name) {
        // console.log(name);
      },
    }
  }

</script>
<style lang="less">
    .roleModal {
        .ivu-modal-footer{
            display: block!important;
        }
    }
</style>
