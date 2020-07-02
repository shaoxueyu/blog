import axios from 'axios'

export const registerUser = async (body) => {
	const { status, data } = await axios.post('/user/register', body)
	return { status, data }
}
export const login = async (body) => {
	const { status, data } = await axios.post('/user/login', body)
	return { status, data }
}
export const getUserInfoToToken = async () => {
	const { status, data } = await axios.get('/user/checkToken')
	return { status, data }
}
// 修改用户头像
export const updateUserAvatar = async (body) => {
	const { status, data } = await axios.post('/user/upload/avatar',body)
	return { status, data }
}
