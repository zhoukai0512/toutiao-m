import request from '@/utils/request'
// import store from '@/store'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}

// 手机号调用接口
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取自己的信息
export const getUserInfo = (mobile) => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 根据接口文档发请求头数据
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取用户频道列表
export const getUserChannels = (mobile) => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 关注用户
export const addFollow = (id) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: id
    }
  })
}

//  取消关注用户
export const deleteFollow = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${id}`
  })
}

//  收藏文章
export const addcollections = (id) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: id
    }
  })
}

//  取消收藏文章
export const deletecollections = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${id}`
  })
}

//  点赞
export const addlikings = (id) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: id
    }
  })
}

//  取消点赞
export const deletelikings = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${id}`
  })
}

//  获取用户个人资料
export const getprofile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

//  编辑用户个人资料
export const updateprofile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

//  编辑用户照片资料（头像、身份证照片）
export const updateimg = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
