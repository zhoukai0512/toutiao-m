<template>
  <div class="update-gender">
    <van-picker title="标题" show-toolbar :columns="columns" @cancel="$emit('guan')" @confirm="onConfirm" :default-index="value" @change="onPickerChange" />
  </div>
</template>

<script>
import { updateprofile } from '@/api/user'
export default {
  name: 'UpdateGender',
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        await updateprofile({
          gender: this.localGender
        })
        this.$emit('input', this.localGender)
        this.$emit('guan')
        this.$toast('修改成功')
      } catch (error) {

      }
    },
    onPickerChange (picker, value, index) {
      this.localGender = index
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
    }
  }
}
</script>

<style scoped lang="less">
</style>
