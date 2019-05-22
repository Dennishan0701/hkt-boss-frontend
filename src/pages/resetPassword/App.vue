<template>
  <div class="loginMain">
    <div class="loginBody clearfix">
      <img
        class="FL"
        src="/static/images/login/left.png"
        alt="图片"
      >
      <form class="loginCon">
        <img
          class="logo"
          src="/static/images/login/logo2.png"
          alt="logo"
        >
        <div class="form">
          <Input
            v-model="oldPw"
            @on-blur="checkPassword(oldPw)"
            type="password"
            class="password"
            placeholder="请输入原密码"
          />
          <Input
            v-model="newPw"
            @on-blur="inputNewPw(newPw)"
            type="password"
            class="password"
            placeholder="请输入新密码"
          />
          <Input
            v-model="secPw"
            @on-blur="inputNewPw(secPw)"
            type="password"
            class="password"
            placeholder="请再次输入密码"
          />
          <p class="sendError"><span>网络错误</span></p>
        </div>
        <div
          class="foot"
          @click="setPassword"
        >
          <p class="submit">修改密码</p>
        </div>
      </form>
      <!--<p><a id="resetPwd" href="resetPwd.html">忘记密码?</a></p>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    inputNewPw(pw) {
        this.checkPassword(pw);
      if (this.secPw.length > 0 && this.newPw.length > 0) {
        this.newPw !== this.secPw && this.$Notice.warning({
          title: '',
          desc: '两次输入密码不一致',
          duration: 3
        });
      }
    },
    checkPassword(pw) {
      var pattern = /^[\w_-]{8,20}$/;
      pw && !pattern.test(pw) && this.$Notice.warning({
        title: '',
        desc: '密码格式不正确',
        duration: 3
      });
    },
    setPassword() {
      const { oldPw, newPw, secPw } = this;
        this.$Notice.warning({
        title: '',
        desc: '尚未接入api',
        duration: 3
      });
    }
  }
}
</script>

<style scoped>
/* *{
  margin: 0;
  padding: 0;
} */
/* body {
  font-family: "PingFang SC", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-smoothing: antialiased;
  font-size: 12px;
  line-height: 1.666;
  background-color: #fff;
  color: #fff;
  -webkit-font-smoothing: antialiased;
} */

p {
  line-height: 1.6em;
  text-align: center;
  font-size: 14px;
}
/*.login{*/
/*display: flex;*/
/*}*/
html,
body {
  /* width: 100vw;
  height: 100vh; */
}
.loginMain {
  position: relative;
}
.loginBody {
  width: 100vw;
  height: 100vh;
  /* background: #333; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* width: 1090px; */
  /* position: absolute; */
  /* top:45%; */
  /* left: 45%; */
  /* transform: translate(-50%,-50%); */
}
/*//清除浮动*/
.clearfix:after {
  clear: both;
  content: " ";
  display: block;
  font-size: 0;
  line-height: 0;
  visibility: hidden;
  width: 0;
  height: 0;
}
.clearfix {
  zoom: 1;
}

.loginBody .FL {
  width: 674px;
  float: left;
}

.loginCon {
  float: right;
  width: 280px;
}
.loginCon .logo {
  display: block;
  width: 220px;
  margin: 54px 0 70px 60px;
}
.loginCon .form {
  /*position: relative;*/
}
input {
  font-size: 14px;
  width: 280px;
  line-height: 48px;
  display: block;
  padding-left: 21px;
  color: #444;
  background-color: #ffffff;
  border: 1px solid #a4e0ff;
  border-radius: 24px;
  outline: none;
  margin-top: 20px;
  box-sizing: border-box;
}
input::-webkit-input-placeholder {
  /* WebKit browsers*/
  color: #abb2bf;
  font-size: 14px;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18*/
  color: #abb2bf;
  font-size: 14px;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+*/
  color: #abb2bf;
  font-size: 14px;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10+*/
  color: #abb2bf;
  font-size: 14px;
}

.sendError {
  text-align: center;
  color: #ff795d;
  font-size: 14px;
  opacity: 0;
  margin: 18px 0 14px 0;
}
.foot {
  background: #07c4fe;
  border-radius: 24px;
}
.submit {
  width: 280px;
  height: 48px;
  /*background:#07C4FE;*/
  color: #fff;
  border-radius: 24px;
  text-align: center;
  font-size: 14px;
  line-height: 48px;
  margin: 0 auto;
  cursor: pointer;
}
.error {
  display: none;
  position: absolute;
  top: 7px;
  right: 0px;
}

.alert {
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #fde2e2;
  position: fixed;
  left: 50%;
  top: -200px;
  transform: translateX(-50%);
  transition: opacity 0.3s, transform 0.4s;
  overflow: hidden;
  padding: 15px;
  background-color: #fef0f0;
  color: #f56c6c;
  text-align: center;
}
#resetPwd {
  bottom: 40px;
  color: #d8d5f6;
  font-size: 12px;
  text-decoration: none;
  left: 50%;
  position: absolute;
  transform: translateX(-10%);
  width: 273px;
}
.password {
    margin-top: 20px;
}
</style>
