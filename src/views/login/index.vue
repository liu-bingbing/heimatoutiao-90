<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="myForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:65%;" placeholder="验证码"></el-input>
          <el-button style="float:right;" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitLogin" style="width:100%;" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 检查是否勾选
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '请输入你的验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }],
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('请勾选同意'))
          }
        } }]
      }
    }
  },
  methods: {
    submitLogin () {
      // 手动校验：
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          // 说明校验通过；
          this.$axios({
            url: '/authorizations', // 请求地址，没有指定类型，默认get类型
            method: 'post',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/home')// 跳转到home
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '手机号或者验证码有误！'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    background-image: url(../../assets/img/small1c34660a6917f03b1249f8a1923d36ef1573698572.jpg);
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
      width: 440px;
      height: 350px;
      .title {
        text-align: center;
        margin-bottom: 30px;
        img {
          height: 45px;
        }
      }
    }

}
</style>
