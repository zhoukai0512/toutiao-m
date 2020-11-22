<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error="error" error-text="加载失败，请点击重试" @load="onLoad">
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResult({
          page: this.page,
          per_page: '20',
          q: this.searchText
        })
        // console.log(data)
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // 3. 设置加载状态结束
        this.loading = false
        if (results.length) {
          this.page++ // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
        }
      } catch (error) {
        // 展示加载失败的提示状态
        this.error = true
        // 加载失败了. loading 也要关闭
        this.loading = false
      }
    }
  },
  watch: {
  },
  computed: {
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
</style>
