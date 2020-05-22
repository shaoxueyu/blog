const { getCommentList } = require('../../controller/message')
const app = require('../../loaderPlugins/router-loader').app
console.log(app);
app.use(async (ctx, next) => {
	console.log(2)
	await next()
})

module.exports = {
	'get /getCommentList': async (ctx) => {
		let { data } = await getCommentList()
		ctx.body = 1
	},
}
