import axios, { type AxiosRequestHeaders } from 'axios'
import { useTokenStore } from '@/stores/mytoken'
import { refreshToken } from '@/api/users'
import router from '@/router/index'
const request = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
})
request.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }
  const store = useTokenStore()
  config.headers.Authorization = store.token?.access_token
  return config
})
request.interceptors.response.use(
  (response) => {
    console.log('Response data:', response.data)
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      const { data } = await refreshToken()
      if (data.success) {
        useTokenStore().saveToken(data.content)
        return request(error.config)
      } else {
        ElMessage.error('登录已过期，请重新登录')
        router.push({ name: 'login' })
        return
      }
    }
    return Promise.reject(error)
  },
)
export default request
