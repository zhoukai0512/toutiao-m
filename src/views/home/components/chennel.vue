<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button type="danger" plain round size="mini" class="edit-btn" @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-cell :border="false">
      <van-grid :gutter="10" class="my-grid">
        <van-grid-item class="grid-item" v-for="(item, index) in mychannels" :key="index" @click="onMyChannelClick(item, index)">
          <van-icon name="clear" slot="icon" v-show="isEdit && !fiexChannels.includes(item.id)"></van-icon>
          <span slot="text" class="text" :class="index === active ? 'active' : ''">{{ item.name }}</span>
        </van-grid-item>
      </van-grid>
    </van-cell>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-cell>
      <van-grid :gutter="10" class="recomment-grid">
        <van-grid-item icon="plus" class="grid-item" v-for="(channel, index) in recommendChannels" :key="index" :text="channel.name" @click="onAddChannel(channel)" />
      </van-grid>
    </van-cell>
  </div>
</template>

<script>
import { getAllChannels, addAllChannels, deletAllChannels } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      isEdit: false, // 控制编辑按钮的显示
      fiexChannels: [0] // 固定频道，不允许删除
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
        // console.log(this.allChannels)
      } catch (error) {

      }
    },

    // 添加
    async onAddChannel (channel) {
      // console.log(channel)
      this.mychannels.push(channel)
      // 数据持久化

      if (this.user) {
        // 已登录，把数据请求到接口到线上
        try {
          await addAllChannels({
            id: channel.id,
            seq: this.mychannels.length
          })
        } catch (error) {
          this.$toast('保存失败')
        }
      } else {
        // 未登录，把数据储存到本地
        setItem('TOUTIAO_CHANNELS', this.mychannels)
      }
    },
    onMyChannelClick (channel, index) {
      // console.log(channel, index)
      if (this.isEdit) {
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        // 编辑状态，删除
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.mychannels.splice(index, 1)
        // 处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态，切换
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
          // 已登录
          await deletAllChannels(channel.id)
        } else {
          // 未登录
          setItem('TOUTIAO_CHANNELS', this.mychannels)
        }
      } catch (error) {
        this.$toast('操作失败')
      }
    }
  },
  watch: {
  },
  computed: {
    ...mapState(['user']),
    // 计算属性里面发送变化后就会重新计算
    recommendChannels () {
      const channels = []
      this.allChannels.forEach(item => {
        const ret = this.mychannels.find(mychannels => {
          return mychannels.id === item.id
        })
        // 如果我的频道中不包括该频道项
        if (!ret) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  props: {
    mychannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 75px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 76px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;

      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 4px !important;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    padding-top: 10px;
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recomment-grid {
    .grid-item {
      width: 160px;
      height: 86px;
      .van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 22px;
          line-height: 22px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
