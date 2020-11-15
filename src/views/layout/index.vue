<template>
  <div class="layout-container">
    <!-- 路由出口 -->
    <router-view />

    <!-- 导航栏 -->
    <!-- route开启路由模式 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text">{{ user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  components: {},
  data () {
    return {
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  watch: {

  },
  computed: {
    ...mapState(['user'])
  },
  props: {

  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    .iconfont {
      font-size: 40px;
    }
    .text {
      font-size: 20px;
    }
  }
}
</style>
