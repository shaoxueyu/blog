const {
	getCommentList,
	createComment,
	createSubComment,
} = require('../../controller/message')
const { getUserInfoToToken } = require('../../controller/user')
const { SuccessModel, ErrorModel } = require('../../BaseModel/index')
const checkToken = require('../../../utils/checktoken')

module.exports = {
	//跨域
	'options /getCommentList': async (ctx) => {
		ctx.body = 'CORS ok'
	},
	'options /createComment': async (ctx) => {
		ctx.body = 'CORS ok'
	},
	'options /createSubComment': async (ctx) => {
		ctx.body = 'CORS ok'
	},
	'get /getCommentList': async (ctx) => {
		try {
			let { page, pagesize } = ctx.request.query
			page = Number(page) || 1
			pagesize = Number(pagesize) || 5
			let { data } = await getCommentList(page, pagesize)
			ctx.body = new SuccessModel(data, 'success')
		} catch (e) {
			ctx.status = 500
			ctx.body = new ErrorModel('未知错误')
		}
	},
	// 创建评论
	'post /createComment': async (ctx) => {
		let { err, res } = await checkToken(ctx)
		let { content, date } = ctx.request.body
		if (!content || !date) {
			return (ctx.body = new ErrorModel('信息不完整'))
		}
		if (err) {
			ctx.status = 401
			return (ctx.body = new ErrorModel('用户验证身份失败，请重新登录'))
		}

		try {
			const user = await getUserInfoToToken({ email: res.data.email })

			await createComment({
				_id: user.data._id,
				date,
				content,
			})
			ctx.body = new SuccessModel('留言成功')
		} catch (e) {
			ctx.status = 402
			ctx.body = new ErrorModel('系统错误，请稍后再试')
		}
	},
	// 子留言
	'post /createSubComment': async (ctx) => {
		let { err, res } = await checkToken(ctx)
		if (err) {
			ctx.status = 401
			return (ctx.body = new ErrorModel('用户验证身份失败，请重新登录'))
		}
		const { _id, content, date, userEmail } = ctx.request.body
		if (!_id || !content || !date || !userEmail) {
			return (ctx.body = new ErrorModel('格式错误'))
		}
		const user = await getUserInfoToToken({ email: res.data.email })
		const toUser = await getUserInfoToToken({ email: userEmail })
		const userId = user.data._id
		const toUserId = toUser.data._id
		const { data } = await createSubComment({
			_id,
			userId,
			toUserId,
			content,
			date,
		})
		if (data.nModified === 1 && data.ok === 1) {
			/* ctx.body = new SuccessModel('ok') */
			ctx.status = 200
		} else {
			ctx.status = 403
			ctx.body = new ErrorModel('未知错误')
		}
	},
}
