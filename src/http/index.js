import axios from 'axios'
import { host, post } from '@/config/index'
import { startLoading, endLoading } from '@/utils/loading'
axios.defaults.baseURL = `${host}:${post}/api`
axios.defaults.withCredentials = true

//请求拦截
axios.interceptors.request.use((config) => {
	startLoading()
	return config
})
//相应拦截
axios.interceptors.response.use((response) => {
	endLoading()
	return response
})
