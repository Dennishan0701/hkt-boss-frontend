<style lang="less">
    .resetModal {
        .ivu-modal-footer {
            display: block !important;
        }
    }
</style>
<!--修改密码弹窗-->
<template lang="html">
    <Modal class="resetModal"
           v-model="resetModal"
           title="修改密码"
           :transfer="false"
           :closable="false"
           :mask-closable="false" width="460">
        <Form ref="resetForm" :model="resetForm" :rules="resetRule" :label-width="108">
            <!--<div v-if="modalType=='reset'">-->
            <!--<FormItem label="姓名：">-->
            <!--{{lead.name}}-->
            <!--</FormItem>-->
            <!--<FormItem label="手机号：">-->
            <!--{{lead.mobile}}-->
            <!--</FormItem>-->
            <!--</div>-->
            <!--<div v-show="false">-->
            <!--<FormItem label="原有密码：" prop="old_password">-->
                <!--<Input type="text"  v-model="old_password"  :maxlength="12" style="width: 216px;"/>-->
            <!--</FormItem>-->
            <!--<FormItem label="设置新密码：" prop="password">-->
                <!--&lt;!&ndash;禁止表单自动填充&ndash;&gt;-->
                <!--<Input :type="inputType" v-model="resetForm.password" :maxlength="12" style="width: 216px;"/>-->
            <!--</FormItem>-->
            <!--</div>-->

            <FormItem label="原有密码：" prop="old_password">
                <Input type="password" v-if="resetForm.old_password==''" v-model="resetForm.old_password" :maxlength="12" style="width: 216px;"/>
                <Input type="text" v-else v-model="resetForm.old_password" :maxlength="12" style="width: 216px;"/>
            </FormItem>
            <FormItem label="设置新密码：" prop="password">
                <!--禁止表单自动填充-->
                <Input type="password" v-model="resetForm.password" :maxlength="12" style="width: 216px;"/>
            </FormItem>
            <FormItem label="确认新密码：" prop="password_confirmation">
                <Input type="password" v-model="resetForm.password_confirmation" :maxlength="12" style="width: 216px;"/>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button v-if="first=='false'" type="text" size="large" @click='resetModal=false;$store.commit("CHANGE_PASSWORD","false");'>取消</Button>
            <Button type="primary" size="large" @click="resetPwd('resetForm')">确定</Button>
        </div>
    </Modal>
</template>

<script>
  import RULE from '@/api/infoRule';
  const isFirst = sessionStorage.getItem('isFirst');
  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码！'));
        } else if (value.length < 6) {
          callback(new Error('密码不能小于6位!'));
        } else {
          if (this.resetForm.password_confirmation !== '') {
            // 对第二个密码框单独验证
            this.$refs.resetForm.validateField('password_confirmation');
          }
          callback();
        }
      };
      //判断新密码第二次
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码不能小于6位!'));
        } else if (value !== this.resetForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback()
        }
      };
      return {
        first:sessionStorage.getItem('isFirst'),
        changePwdAPI: this.$store.state.changePwd, //修改密码
        resetModal: false,
        lead: {},//人
        resetForm: {
          old_password: "",
          password: "",
          password_confirmation: ""
        },
        resetRule: {
          old_password: [{
            required: true,
            message: '请输入原有密码',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }],
          password_confirmation: [{
            required: true,
            validator: validatePassCheck,
            trigger: 'blur'
          }],

        }
      }
    },
    computed:{
    },
    mounted(){
      if(isFirst == 'true'){
        const title = '提示';
        const content = '<p>您的当前密码为原始密码，为保证账户安全，请修改。</p>';
        this.$Modal.warning({
          title: title,
          content: content,
          width:460
        });
      }
      this.show();
    },
    methods: {
      show() {
        this.resetModal = true;
        //初始化值
        this.resetForm.old_password = '';
        this.resetForm.password = '';
        this.resetForm.password_confirmation = '';
      },
      resetPwd(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.resetForm.password=="123456"){
              this.$Notice.error({
                title: "",
                desc: "新密码不能为初始密码，请重新设置！",
                duration: 3
              });
              return false;
            }
            this.$axios.post(this.changePwdAPI,
              this.resetForm, {
                loading: false
              }
            ).then(res => {
              this.resetModal = false;
              const title = '提示';
              const content = '<p>密码修改成功,请重新登录!</p>';
              this.$Modal.success({
                title: title,
                content: content,
                onOk: () => {
                  localStorage.clear();
                  sessionStorage.clear();
                  const origin = window.location.origin;
                  window.location.href = origin;
                }
              });
            });
          }
        })
      }
    },
  }
</script>

