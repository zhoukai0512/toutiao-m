<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile" :rules="userFormRules.mobile" type="number" maxlength="11">
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field name="code" placeholder="请输入验证码" v-model="user.code" :rules="userFormRules.code" type="number" maxlength="6">
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s" @finish="isCountDownShow = false" />
          <van-button v-else class="send-sms-btn" round size="small" type="default" @click="onSendSms" native-type="button">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {

  },
  props: {},
  data () {
    return {
      user: {
        // 手机号
        mobile: '',
        // 短信验证码
        code: ''
      },
      userFormRules: {
        mobile: [{ required: true, message: '请填写手机号' }, { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }],
        code: [{ required: true, message: '请填写验证码' }, { pattern: /^\d{6}$/, message: '验证码格式错误' }]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    async onSubmit () {
      // console.log('submit', values)
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        // 禁用中无法点击背景
        forbidClick: true,
        // 持续时间 默认2000，如果是0则持续展示
        duration: 0
      })
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        // console.log('成功', res)
        this.$toast.success('登录成功')
        this.$router.push('/my')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      // 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        // console.log('通过')
      } catch (error) {
        return console.log('失败', error)
      }
      this.isCountDownShow = true

      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了,请稍后重试')
        } else {
          this.$toast('发送失败了,请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    background-color: #eeeeee;
    width: 156px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #66b1ff;
      border: none;
    }
  }
}
</style>
