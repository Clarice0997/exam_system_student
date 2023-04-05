<template>
  <el-form ref="form" :model="form" :rules="rules" size="medium" @keydown.enter.native="clickLoginHandler">
    <h1>在线考试系统</h1>
    <el-form-item prop="studentId">
      <el-input v-model="form.studentId" placeholder="学号" clearable prefix-icon="el-icon-user"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" placeholder="密码" show-password prefix-icon="el-icon-lock"></el-input>
    </el-form-item>
    <el-button class="login-button" type="primary" v-loading.fullscreen="fullscreenLoading" :loading="btnLoading" @click="clickLoginHandler">立即登录 </el-button>
    <router-link to="/login/register">立即注册</router-link>
  </el-form>
</template>

<script>
// import modules
import { loginAPI } from '@/apis/loginAPI'
import router from '@/router'

export default {
  name: 'MusicManageSystemLogin',

  data() {
    return {
      // 表单数据对象
      form: {
        studentId: '20200202001',
        password: ''
      },
      // 表单校验对象
      rules: {
        studentId: [
          // 必填项校验
          {
            required: true,
            message: '请输入学号',
            trigger: 'blur'
          },
          // 长度校验
          {
            min: 11,
            max: 11,
            message: '学号长度11位数字',
            trigger: 'blur'
          },
          // 内容校验
          {
            pattern: /^(19[9|8][0-9]|20[0-2][0-9])(0[1-9]|[1-9][0-9])(0[1-9]|[1-9][0-9])[0-9]{3}$/,
            message: '学号不合法',
            trigger: 'blur'
          }
        ],
        password: [
          // 必填项校验
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },

          // 长度校验
          {
            min: 6,
            max: 20,
            message: '登录密码长度在6-20字符之间',
            trigger: 'blur'
          }
        ]
      },
      // Loading显隐
      fullscreenLoading: false,
      // 按钮加载状态
      btnLoading: false
    }
  },

  mounted() {},

  methods: {
    // 点击登录按钮处理函数
    clickLoginHandler() {
      // 校验登录表单是否合法
      this.$refs.form.validate(async valid => {
        if (valid) {
          // Loading遮罩
          this.fullscreenLoading = true
          // 加载按钮
          this.btnLoading = true

          // 调用登录 API
          loginAPI(this.form.studentId, this.form.password)
            .then(async ({ data }) => {
              // 保存 JsonWebToken
              await localStorage.setItem('Access-Token', data.token)
              // 登录成功弹窗
              this.$message({
                message: data.message,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  router.replace('/home')
                }
              })
            })
            .catch(({ response }) => {
              // 提示错误弹窗
              this.$message({
                message: response.data.data.message,
                type: 'error',
                duration: 2000
              })
            })
            .finally(() => {
              // 重置表单
              this.form = this.$options.data().form
              // 停止加载按钮
              this.btnLoading = false
              // 停止全屏遮罩
              this.fullscreenLoading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
