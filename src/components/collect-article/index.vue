<template>
  <div class="collect-article">
    <van-icon :color="value ? '#ff8344' : ''" :name="value ? 'star' : 'star-o'" @click="onllect" />
  </div>
</template>

<script>
import { addcollections, deletecollections } from '@/api/user.js'
export default {
  name: 'CollectArticle',
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    async onllect () {
      try {
        if (this.value) {
          await deletecollections(this.artid)
        } else {
          await addcollections(this.artid)
        }
        this.$emit('input', !this.value)
        // 收藏成功以后的提示
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
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
      type: Boolean,
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
