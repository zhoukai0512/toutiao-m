<template>
  <div class="comment-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error="error" error-text="加载失败，请点击重试" :immediate-check="false">
      <!-- <van-cell /> -->
      <comment-item v-for="(item, index) in list" :key="index" :comment="item" @reply-click="$emit('reply-click', $event)"></comment-item>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  mounted () {
  },
  methods: {
    // 获取文章评论
    async onLoad () {
      try {
        const { data } = await getComments({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.artid.toString(), // 源id，文章id或评论id
          offset: this.offset,
          limit: this.limit
        })
        // console.log(data)
        const { results } = data.data
        this.list.push(...results)
        this.$emit('onload-success', data.data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  },
  watch: {
  },
  computed: {
  },
  props: {
    artid: {
      type: [String, Number, Object],
      required: true
    },
    list: {
      type: Array,
      // 不用传过来的数据就是空数组，自己用
      default: function () {
        return []
      }
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  }
}
</script>

<style scoped lang="less">
</style>
