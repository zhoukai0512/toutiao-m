/**
 * 频道请求模块
 */
// 1.请求拦截器，添加请求头
import request from '@/utils/request'

/**
 * 获取所有频道
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

/**
 * 添加用户频道
 */
export const addAllChannels = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除用户频道
 */
export const deletAllChannels = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}
