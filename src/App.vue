<template>
  <div id="app">
    <h1>黑马头条</h1>
    <i class="iconfont icon-shipin"></i>
    <van-button loading type="primary" loading-type="spinner" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less"></style>
