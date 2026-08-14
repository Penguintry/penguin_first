import axios from 'axios'
import { Loading } from 'element-ui'
import { getUserLoginToken } from '@/utils/storage.js'

//自定义加载界面的选项
const options = {
  lock: true,
  background: 'rgba(20, 20, 20, 0.6)'
}

const request =  axios.create({
    baseURL: 'http://127.0.0.1:8080/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    Loading.service(options)
    config.headers.Authorization = getUserLoginToken()
    return config;
  }, function (error) {
    console.log(error)
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码触发该函数
    Loading.service(options).close()
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码触发该函数
    if (error.response.data.message === 'NOT_LOGIN') {
      Loading.service(options).close()
      return error.response
    }
    return Promise.reject(error);
  });

  export default request