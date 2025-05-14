import request from '@/utils/request'
type LoginInfo = {
  name: string
  password: string
}
type LoginResult = {
  success: boolean
  sate: number
  message: string
  content: string
  token: string
}
export const login = (loginInfo: LoginInfo) => {
  return request<LoginResult>({
    method: 'POST',
    url: '/api/user/login',
    data: loginInfo,

    // data: `name=${loginInfo.name}&password=${loginInfo.password}`,
  })
}
