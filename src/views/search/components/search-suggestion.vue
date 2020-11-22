<template>
  <div class="search-suggestion">
    <van-cell v-for="(item, index) in suggestions" :key="index" icon="search" @click="$emit('search', item)">
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {

      }
    },
    highlight (text) {
      const highlighStr = `<span class="active">${this.searchText}</span>`
      // 正则表达结构函数 RegExp
      // 参数 1： 匹配模式字符串，它会根据这个字符串创建正则对象
      // 参数 2： 匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      // this.searchText是搜索的文本，传值过来的text是搜索的结果
      return text.replace(reg, highlighStr)
    }
  },
  watch: {
    searchText: {
      // searchText发生改变的时候调用handler()这个函数
      // handler名称是固定的
      // handler (value) {
      //   // console.log(value)
      //   this.loadSearchSuggestions(value)
      // },
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      // 该回调将会在侦听开始以后被立即调用
      immediate: true
    }
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
.search-suggestion {
  /deep/span.active {
    color: #2892ff;
  }
}
</style>
