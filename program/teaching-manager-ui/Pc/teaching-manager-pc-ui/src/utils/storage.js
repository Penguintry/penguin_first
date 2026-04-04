const USER_TOKEN_KEY = 'token'
const USER_INFO_KET = 'user_info'

//存储用户登录token
export const saveUserLoginToken = (token) => {
    localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(token))
}

//读取用户登录token
export const getUserLoginToken = () => {
    return JSON.parse(localStorage.getItem(USER_TOKEN_KEY)) == null ? '' : JSON.parse(localStorage.getItem(USER_TOKEN_KEY))
}

//清除用户登录token
export const removeUserLoginToken = () => {
    localStorage.removeItem(USER_TOKEN_KEY)
}

//存储用户登录信息
export const saveUserInfo = (info) => {
    localStorage.setItem(USER_INFO_KET, JSON.stringify(info))
}

//读取用户登录信息
export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem(USER_INFO_KET)) == null ? '' : JSON.parse(localStorage.getItem(USER_INFO_KET))
}

//清除用户登录信息
export const removeUserInfo = () => {
    localStorage.removeItem(USER_INFO_KET)
}
