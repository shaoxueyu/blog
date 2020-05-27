import axios from 'axios'

export const getCommentList = async (page, pagesize) => {
	const { data, status } = await axios.get('/message/getCommentList', {
		params: {
			page,
			pagesize,
		},
	})
	return { data, status }
}
export const createComment = async ({ content, date }) => {
	const { data, status } = await axios.post('/message/createComment', {
		content,
		date,
	})
	return { data, status }
}
export const createSubComment = async ({ _id, content, userEmail, date }) => {
	const { data, status } = await axios.post('/message/createSubComment', {
		_id,
		content,
		userEmail,
		date,
	})
	return { data, status }
}
