import axios from 'axios'

export const getCommentList = async () => {
	const { data, status } = await axios.get('/message/getCommentList')
	return { data, status }
}
