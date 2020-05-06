import axios from 'axios'
axios.defaults.withCredentials = true
export const registerUser = async (body) => {
	const { status, data } = await axios.post('/user/register', body)
	return { status, data }
}
