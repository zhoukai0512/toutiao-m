<template>
  <div class="update-birthday">
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="$emit('guan')" @confirm="onConfirm" :formatter="formatter" />
  </div>
</template>

<script>
import { updateprofile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  data () {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    async onConfirm (value) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        await updateprofile({
          birthday: dayjs(value).format('YYYY-MM-DD')
        })
        this.$emit('input', dayjs(value).format('YYYY-MM-DD'))
        this.$emit('guan')
        this.$toast('修改成功')
      } catch (error) {

      }
    },
    formatter (type, val) {
      if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val
    }
  },
  watch: {
  },
  computed: {
  },
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
</style>
