import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

//博客搜索栏文章
export const getArticleTagsInfo = async () => {
	console.log(1)
	let { data, status } = await axios.get('/article/articleTagsInfo')
	return { data, status }
}
//博客热门文章
export const getHotArticleInfo = async () => {
	console.log(1)
	let { data, status } = await axios.get('/api/article/hotArticleInfo')
	return { data, status }
}
