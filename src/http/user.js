import axios from 'axios'

export const registerUser = async (body) => {
	const { status, data } = await axios.post('/user/register', body)
	return { status, data }
}
export const login = async (body) => {
	const { status, data } = await axios.post('/user/login', body)
	return { status, data }
}
