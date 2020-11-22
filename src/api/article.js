import request from '@/utils/request'

/**
 * 请求文章列表数据
 */
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/v1_1/articles',
    params: params
  })
}

/**
 * 请求文章详情数据
 */
export const getArticleByid = (id) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${id}`
  })
}
