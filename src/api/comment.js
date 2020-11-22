/**
 *评论请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章评论列表
 */
export const getComments = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

/**
 * 对评论或评论回复点赞
 */
export const addlikings = (id) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: id
    }
  })
}

/**
 * 取消对评论或评论回复点赞
 */
export const deletelikings = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${id}`
  })
}

/**
 * 添加评论或评论回复添加评论
 */
export const addcomments = (params) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: params
  })
}
