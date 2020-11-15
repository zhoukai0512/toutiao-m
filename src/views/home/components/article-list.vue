<template>
  <div class="atricle-list">
    <van-pull-refresh v-model="isreFreshLoading" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="1500">
      <van-list v-model="loading" :finished="finished" :error.sync="error" error-text="请求失败，点击重新加载" finished-text="没有更多了" @load="onLoad">
        <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
        <article-item v-for="item in list" :key="item.art_id" :artitle="item"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/views/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isreFreshLoading: false,
      // 下拉刷新文本
      refreshSuccessText: ''
    }
  },
  created () {
    this.onLoad()
  },
  mounted () {

  },
  methods: {
    async onLoad () {
      // console.log(this.channel.id)
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          // timestamp 简单理解就是请求数据页码
          // 如果请求最新的时间搓
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // if (Math.random() > 1.5) {
        //   JSON.parse('dsnajndjsa')
        // }
        const { results } = data.data
        // console.log(data)
        // 异步更新数据
        this.list.push(...results)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        // 请求获取数据
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), // 下拉刷新，每次请求获取最新数据，所以传递当前最新时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 2. 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 3. 关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false
        this.refreshSuccessText = `更新成功，刷新了${results.length}条数据`
      } catch (error) {
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  },
  watch: {

  },
  computed: {

  }
}
</script>

<style scoped lang="less">
.atricle-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
