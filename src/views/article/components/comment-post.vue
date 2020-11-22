<template>
  <div class="comment-post">
    <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { addcomments } from '@/api/comment'
export default {
  name: 'CommentPost',
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await addcomments({
          target: this.artid.toString(), // 评论的目标id
          content: this.message, // 评论内容
          art_id: this.type ? this.articleId.toString() : null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数
        })
        // console.log(data)
        this.message = ''
        this.$emit('post-success', data.data)
        this.$toast.success('发布成功')
      } catch (error) {

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
    type: {
      type: [String, Number, Object],
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
