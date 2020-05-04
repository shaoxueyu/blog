const {
	getHotArticleInfo,
	getArticleTagsInfo,
	getArticleInfo,
} = require('../../controller/acticle')
const { SuccessModel, ErrorModel } = require('../../BaseModel/index')
module.exports = {
	//博客搜索数据
	'get /articleTagsInfo': async (ctx) => {
		try {
			const data = await getArticleTagsInfo()
			ctx.body = new SuccessModel(data, 'success')
		} catch (e) {
			console.log(e)
			ctx.body = new ErrorModel(e, 'error')
		}
	},
	'get /hotArticleInfo': async (ctx) => {
		try {
			let pagesize = ctx.request.query.pagesize || 8
			pagesize = Number(pagesize)
			const data = await getHotArticleInfo(pagesize)
			ctx.body = new SuccessModel(data, 'success')
		} catch (e) {
			ctx.body = new ErrorModel(e, 'error')
		}
	},
	//文章
	'get /articleInfo': async (ctx) => {
		try {
			const [page, pagesize, tag] = [
				Number(ctx.request.query.page),
				Number(ctx.request.query.pagesize),
				ctx.request.query.tag,
			]
			const data = await getArticleInfo(page, pagesize, tag)
			ctx.body = new SuccessModel(data, 'success')
		} catch (e) {
			ctx.body = new ErrorModel(e, 'error')
		}
	},
}
