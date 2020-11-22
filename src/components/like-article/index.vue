<template>
  <div class="like-article">
    <van-icon :color="value === 1 ? '#f75454' : ''" :name="value === 1 ? 'good-job' : 'good-job-o'" @click="onlike" />
  </div>
</template>

<script>
import { addlikings, deletelikings } from '@/api/user.js'
export default {
  name: 'LikeArticle',
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    async onlike () {
      try {
        if (this.value === 1) {
          // 取消点赞
          await deletelikings(this.artid)
          this.$emit('input', -1)
        } else {
          await addlikings(this.artid)
          this.$emit('input', 1)
        }
        this.$toast.success(this.value === -1 ? '点赞成功' : '取消点赞')
      } catch (error) {

      }
    }
  },
  watch: {
  },
  computed: {
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    artid: {
      type: [Number, String, Object],
      required: true
    }
  }
}
</script>

<style scoped lang="less">
</style>
