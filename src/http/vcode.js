import axios from 'axios'
import { host, post } from '@/config/index'

axios.defaults.baseURL = `${host}:${post}/api`
axios.defaults.withCredentials = true

export const getVcode = async () => {
	let { status, data } = await axios.get('/vcode')
	return { status, data }
}
