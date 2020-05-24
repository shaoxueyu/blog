const { getCommentList } = require('../../controller/message')
const { SuccessModel, ErrorModel } = require('../../BaseModel/index')
/* const app = require('../../loaderPlugins/router-loader').app
console.log(app);
app.use(async (ctx, next) => {
	console.log(2)
	await next()
}) */

module.exports = {
	'get /getCommentList': async (ctx) => {
		try {
      let { data } = await getCommentList()
			ctx.body = new SuccessModel(data, 'success')
		} catch (e) {
      ctx.status = 500
			ctx.body = new ErrorModel('未知错误')
		}
	},
}
