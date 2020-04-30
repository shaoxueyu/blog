import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

export const getVcode = async () => {
	let { status, data } = await axios.get('/vcode')
	return { status, data }
}
