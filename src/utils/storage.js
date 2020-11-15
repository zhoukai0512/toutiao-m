/**
 * 封装本地存储操作模块
 */

/**
 * 存储数据
 */
export const setItem = (key, value) => {
  // 把数组对象数据转为JSON格式的字符串数据JSON.stringify
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    // 有效的JSON数据就转成对象
    return JSON.parse(data)
  } catch (error) {
    // 不有效就是原封不动
    return data
  }
}

/**
 * 删除数据
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
