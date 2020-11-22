<template>
  <div class="follow-user-container">
    <van-button :loading="loading" @click="onFollow" v-if="value" class="follow-btn" round size="small">已关注</van-button>
    <van-button :loading="loading" @click="onFollow" v-else class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus">关注</van-button>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  data () {
    return {
      loading: false
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    async onFollow () {
      this.loading = true
      try {
        if (this.value) {
          await deleteFollow(this.userid)
        } else {
          await addFollow(this.userid)
        }
        // this.isfollowed = !this.isfollowedd
        this.$emit('input', !this.value)
      } catch (error) {
        let message = '操作失败，请重试'
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      this.loading = false
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
    userid: {
      type: [Number, String, Object],
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.follow-btn {
  width: 170px;
  height: 58px;
}
</style>
