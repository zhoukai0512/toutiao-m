<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" background="#2892ff" @focus="isResultShow = false" />
    </form>
    <!-- 搜索数据 -->
    <search-result v-if="isResultShow" :searchText="searchText"></search-result>

    <!-- 联想记忆 -->
    <search-suggestion v-else-if="searchText" :searchText="searchText" @search="onSearch"></search-suggestion>
    <!-- 搜索历史记录 -->
    <search-history v-else :searchHistories="searchHistories" @clear-search-histories="searchHistories = []" @search="onSearch"></search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORY') || [] // 存储历史记录
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    // 确定搜索时触发
    onSearch (val) {
      // 更新文本框的内容
      this.searchText = val
      // 把搜索的文本内容和存储历史记录searchHistories对比，有就返回对应的索引index值
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  watch: {
    searchHistories (value) {
      // 同步搜索数据到本地,value是监视的最新数据
      setItem('TOUTIAO_SEARCH_HISTORY', value)
    }
  },
  computed: {
  },
  props: {

  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
