<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell :title="item" v-for="(item, index) in searchHistories" :key="index" @click="onSearchItemClick(item, index)">
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      isDeleteShow: false // 控制删除显示状态
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 删除历史记录
        this.searchHistories.splice(index, 1)
      } else {
        // 点击跳转
        this.$emit('search', item)
      }
    }
  },
  watch: {
  },
  computed: {
  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
</style>
