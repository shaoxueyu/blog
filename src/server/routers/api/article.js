const {
	getHotArticleInfo,
	getArticleTagsInfo,
} = require('../../controller/acticle')
const { SuccessModel, ErrorModel } = require('../../BaseModel/index')
module.exports = {
	//博客搜索数据
	'get /articleTagsInfo': async (ctx) => {
		try {
      const data = await getArticleTagsInfo()
			ctx.body = new SuccessModel(data, 'success')
		} catch (e) {
      console.log(e);
			ctx.body = new ErrorModel(e, 'error')
		}
	},
	'get /hotArticleInfo': async (ctx) => {
		try {
      const data = await getHotArticleInfo()
			ctx.body = new SuccessModel(data, 'success')
		} catch (e) {
			ctx.body = new ErrorModel(e, 'error')
		}
	},
}
