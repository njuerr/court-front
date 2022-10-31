import axios from 'axios'
import qs from 'qs'
import {ElMessage} from 'element-plus'

/**
 * axios的传参方式：
 * 1.url 传参 一般用于Get和Delete 实现方式：config.params={JSON}
 * 2.body传参 实现方式：config.data = {JSON}，且请求头为：headers: { 'Content-Type': 'application/json;charset=UTF-8' }
 * 3.表单传参 实现方式：config.data = qs.stringify({JSON})，且请求头为：且请求头为：headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
 */
// axios实例
const service = axios.create({
    baseURL: "http://localhost:9099",
    timeout: 60000,
    headers: {'Content-Type': 'application/json;charset=UTF-8'}
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 追加时间戳，防止GET请求缓存
        if (config.method?.toUpperCase() === 'GET') {
            config.params = {...config.params}
        }

        if (Object.values(config.headers).includes('application/x-www-form-urlencoded')) {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText || 'Error'))
        }

        const res = response.data
        // 响应成功 TODO 这里要填上业务成功的状态码
        if (res.code === 200) {
            return res
        }

        // 错误提示
        ElMessage.error(res.msg)

        return Promise.reject(new Error(res.msg || 'Error'))
    },
    error => {
        ElMessage.error(error.message)
        return Promise.reject(error)
    }
)

// 导出 axios 实例
export default service
