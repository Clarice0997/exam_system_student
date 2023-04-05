<template>
  <el-form ref="registerForm" :model="registerForm" :rules="registerRules" size="medium" @keydown.enter.native="clickRegisterHandler">
    <h1>加入我们</h1>
    <el-form-item prop="studentId">
      <el-input v-model="registerForm.studentId" placeholder="学号" clearable prefix-icon="el-icon-user"></el-input>
    </el-form-item>
    <el-form-item prop="name">
      <el-input v-model="registerForm.name" placeholder="昵称" clearable prefix-icon="el-icon-user"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="registerForm.password" placeholder="密码" show-password prefix-icon="el-icon-lock"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassword">
      <el-input v-model="registerForm.checkPassword" placeholder="确认密码" show-password prefix-icon="el-icon-lock"></el-input>
    </el-form-item>
    <el-button class="login-button" type="primary" v-loading.fullscreen="fullscreenLoading" :loading="btnLoading" @click="clickRegisterHandler">立即注册 </el-button>
    <router-link to="/login/login">已有账号？立即登录</router-link>
  </el-form>
</template>

<script>
import { registerAPI } from '@/apis/loginAPI'
import router from '@/router'

export default {
  name: 'MusicManageSystemRegister',

  data() {
    return {
      // 表单数据对象
      registerForm: {
        studentId: '20200202001',
        name: '张三',
        password: '123456',
        checkPassword: '123456'
      },
      // 表单校验对象
      registerRules: {
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
        ],
        checkPassword: [
          // 必填项校验
          {
            required: true,
            message: '请输入确认密码',
            trigger: 'blur'
          },
          // 密码比对
          {
            validator: (rule, value, callback) => {
              if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        name: [
          // 必填项校验
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          // 长度校验
          {
            min: 2,
            message: '姓名长度不少于2位',
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
    clickRegisterHandler() {
      // 校验注册表单是否合法
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          // Loading遮罩
          this.fullscreenLoading = true
          // 加载按钮
          this.btnLoading = true
          // 调用注册接口
          registerAPI(this.registerForm.studentId, this.registerForm.password, this.registerForm.name)
            .then(async ({ data }) => {
              // 注册成功弹窗
              this.$message({
                message: data.message,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  router.replace('/login/login')
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
              this.registerForm = this.$options.data().registerForm
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

<style lang="less" scoped>
.el-form {
  transition: 0.3s;

  .el-button {
    margin: 0;
  }
}
</style>
