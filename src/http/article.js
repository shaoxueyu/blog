import axios from 'axios'

//博客搜索栏文章
export const getArticleTagsInfo = async () => {
	let { data, status } = await axios.get('/article/articleTagsInfo')
	return { data, status }
}
//博客热门文章
export const getHotArticleInfo = async (pagesize = 8) => {
	let { data, status } = await axios.get('/article/hotArticleInfo', {
		params: {
			pagesize,
		},
	})
	return { data, status }
}
//全部文章
export const getArticleInfo = async (
	page = 1,
	pagesize = 5,
	tag,
	valve = true
) => {
	if (valve) {
		valve = false
		let { data, status } = await axios.get('/article/articleInfo', {
			params: {
				page,
				pagesize,
				tag,
			},
		})
		valve = true
		return { data, status }
	} else return
}
export const getArticleDetail = async (id) => {
	const { status, data } = await axios.post('/article/getArticleDetail', {
		id,
	})
	return { status, data }
}
//搜索
export const search = async (keywords) => {
	const { status, data } = await axios.get('/article/search', {
		params: {
			keywords,
		},
	})
	return { status, data }
}
