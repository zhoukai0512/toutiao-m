<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />

    <!-- 个人信息 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>

    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow = true"> </van-cell>
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isUpdateGenderShow = true" />
    <van-cell title="生日" @click="isUpdateBirthdayShow = true" :value="user.birthday" is-link />

    <!-- 编辑昵称 -->
    <van-popup v-model="isUpdateNameShow" style="height: 100%" position="bottom">
      <update-name v-if="isUpdateNameShow" @close="isUpdateNameShow = false" v-model="user.name" @guan="isUpdateNameShow = false"></update-name>
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender v-if="isUpdateGenderShow" @guan="isUpdateGenderShow = false" v-model="user.gender"></update-gender>
    </van-popup>
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday @guan="isUpdateBirthdayShow = false" v-model="user.birthday"></update-birthday>
    </van-popup>
    <!-- 编辑头像 -->
    <van-popup v-model="isUpdatePhotoShow" position="bottom" style="height: 100%">
      <update-photo v-if="isUpdatePhotoShow" :img="img" @guan="isUpdatePhotoShow = false" @update-photo="user.photo = $event"></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getprofile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getprofile()
        this.user = data.data
        console.log(this.user)
      } catch (error) {

      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      // file-input 如果选择了同一个文件，就不会触发Change事件，所以要把value清空
      this.$refs.file.value = ''
    }
  },
  watch: {
  },
  computed: {
  },
  props: {
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
