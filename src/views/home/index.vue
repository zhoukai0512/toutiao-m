<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button slot="title" type="info" size="small" round icon="search">搜索</van-button>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表 -->
        <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  mounted () {

  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
        // console.log(this.channels)
      } catch (error) {
        this.$toast('获取频道数据失败')
      }
    }
  },
  watch: {

  },
  computed: {

  },
  props: {

  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: none !important;
  }
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #55a7ff;
    border: none;
    font-size: 28px;
    i {
      font-size: 32px;
    }
  }
  .van-icon {
    color: #fff;
  }
  /deep/.van-tab {
    min-width: 200px;
    border: 1px solid #edeff3;
    font-size: 30px;
    color: #777;
  }
  /deep/.van-tab--active {
    color: #333;
  }
  /deep/.van-tabs__nav {
    padding-bottom: 0;
  }
  /deep/.van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #2892ff;
    bottom: 8px;
  }
  /deep/.van-tabs__wrap {
    height: 82px;
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
  }
  /deep/.page-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .placeholder {
    width: 66px;
    height: 82px;
    flex-shrink: 0;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.902;
    i {
      font-size: 33px;
    }
    &::before {
      position: absolute;
      left: 0;
      content: '';
      width: 1.5px;
      height: 100%;
      background-image: url('~@/assets/gradient-gray-line.png');
      background-size: contain;
    }
  }
}
</style>
