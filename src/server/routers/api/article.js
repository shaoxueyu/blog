const {
	getHotArticleInfo,
	getArticleTagsInfo,
	getArticleInfo,
	getArticleDetail,
	search
} = require('../../controller/acticle')
const { SuccessModel, ErrorModel } = require('../../BaseModel/index')
module.exports = {
	'options /getArticleDetail': (ctx) => {
		ctx.status = 201
	},
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
	// 文章详情
	'post /getArticleDetail': async (ctx) => {
		const id = ctx.request.body.id
		let data = await getArticleDetail(id)
		ctx.body = new SuccessModel(data)
	},
	'get /search': async (ctx) => {
		const keywords = ctx.request.query.keywords
		const data = await search(keywords)
		ctx.body = new SuccessModel(data)
	},
}
