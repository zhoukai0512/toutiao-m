import request from '@/utils/request'
// import store from '@/store'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: data
  })
}

// 手机号调用接口
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取自己的信息
export const getUserInfo = (mobile) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
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
    url: '/app/v1_0/user/channels'
  })
}
