const { session } = require('../../session/index')
const { SuccessModel, ErrorModel } = require('../../BaseModel/index')
const {
	checkUserIfRegister,
	createUser,
	login,
} = require('../../controller/user')
module.exports = {
	//跨域
	'options /register': async (ctx) => {
		ctx.body = 'CORS ok'
	},
	'options /login': async (ctx) => {
		ctx.body = 'CORS ok'
	},

	'post /register': async (ctx) => {
		// 接受客户端数据
		const sid = ctx.cookies.get('sid')
		const { username, pwd, vcode, email } = ctx.request.body
		//防止非法登录
		if (!vcode || !username || !pwd) {
			ctx.body = new ErrorModel('数据错误，重新注册')
			return
		}
		if (!sid || !session[sid] || session[sid].vcode !== vcode) {
			ctx.body = new ErrorModel('验证码失效，请重新获取')
			return
		}
		if (email) {
			let data = await checkUserIfRegister(email)
			if (data['data']) {
				ctx.status = 201
				ctx.body = new ErrorModel('用户已存在')
				return
			}
		}
		let data = await createUser({ username, pwd, vcode, email })
		ctx.body = new SuccessModel(data, '注册成功')
	},
	'post /login': async (ctx) => {
		let { username, pwd } = ctx.request.body
		let data = await login({ username, pwd })
		if (!data.data) {
			ctx.status = 201
			ctx.body = new ErrorModel(data, data.message)
		} else {
			ctx.body = new SuccessModel(data.data, data.message)
		}
	},
}
