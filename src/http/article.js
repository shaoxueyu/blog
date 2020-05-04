import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

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
