import requst from '@/utils/request.js'

//登录接口
export const login = (form) => {
   return requst.post('/login', form)
}

//检查用户登录状态
export const checkLogin = (form) => {
   return requst.post('/check/login', form)
}

//修改用户密码
export const modifyUserPassword = (form) => {
   return requst.post('/modify/user/password', form)
}