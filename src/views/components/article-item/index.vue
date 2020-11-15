<template>
  <div>
    <van-cell class="article-item">
      <div slot="title" class="title">{{ artitle.title }}</div>
      <div slot="label" class="title">
        <div v-if="artitle.cover.type === 3" class="cover-wrap">
          <div class="cover-item" v-for="(img, index) in artitle.cover.images" :key="index">
            <van-image class="cover-item-img" :src="img"></van-image>
          </div>
        </div>
        <div class="label-info-wrap">
          <span>{{ artitle.aut_name }}</span>
          <span>{{ artitle.comm_count }}</span>
          <span>{{ artitle.pubdate | relativeTime }}</span>
        </div>
      </div>
      <van-image class="right-cover" v-if="artitle.cover.type === 1" slot="default" width="100" height="100" :src="artitle.cover.images[0]"></van-image>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'Articleitem',
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  },
  watch: {
  },
  computed: {
  },
  props: {
    artitle: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
