import axios from 'axios'


export const getVcode = async () => {
	let { status, data } = await axios.get('/vcode')
	return { status, data }
}
