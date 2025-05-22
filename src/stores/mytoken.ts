import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
interface Token {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  user_id: string
}
export const useTokenStore = defineStore('mytoken', () => {
  const tokenJson = ref('')
  // const token = computed<Token>(() => {
  //   try {
  //     return JSON.parse(tokenJson.value || window.localStorage.getItem('TokenInfo') || '{}')
  //   } catch (err) {
  //     ElMessage.error('json 字符串解析错误')
  //     window.localStorage.setItem('TokenInfo', '')
  //     throw err
  //   }
  // })
  const token = computed<Token>(() => {
    try {
      const storageToken = tokenJson.value || window.localStorage.getItem('TokenInfo') || '{}'
      // 过滤无效的 undefined 字符串
      const validToken = storageToken.replace(/^"undefined"$/, '{}')
      const parsedToken = JSON.parse(validToken)

      // 如果解析后的 token 是空对象，则提示用户未登录
      if (Object.keys(parsedToken).length === 0) {
        // ElMessage.error('你还未登录，请重新登录')
        window.localStorage.setItem('TokenInfo', '')
        return {} as Token
      }

      return parsedToken
    } catch (err) {
      // ElMessage.error('Token 解析失败，请重新登录')
      window.localStorage.setItem('TokenInfo', '')
      return {} as Token
    }
  })
  function saveToken(data: string) {
    // tokenJson.value = data
    // window.localStorage.setItem('TokenInfo', data)
    // 如果是对象则转换为 JSON 字符串
    const tokenString = typeof data === 'string' ? data : JSON.stringify(data)
    tokenJson.value = tokenString
    window.localStorage.setItem('TokenInfo', tokenString)
  }
  return { token, saveToken }
})
