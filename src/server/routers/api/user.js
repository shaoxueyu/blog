const { session } = require('../../session/index')
const { SuccessModel, ErrorModel } = require('../../BaseModel/index')
const jwt = require('jsonwebtoken')
const secret = 'Smallker'
const opt = {
	secret: 'Smallker',
	key: 'user',
}
const {
	checkUserIfRegister,
	createUser,
	login,
	getUserInfoToToken,
} = require('../../controller/user')
module.exports = {
	//跨域
	'options /register': async (ctx) => {
		ctx.body = 'CORS ok'
	},
	'options /login': async (ctx) => {
		ctx.body = 'CORS ok'
	},
	'options /checkToken': async (ctx) => {
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
			/* token 授权 */
			let token = jwt.sign(
				{
					data: {
						email: data.data.email,
					},
					//设置过期时间
					exp: Math.floor(Date.now() / 1000) + 60 * 60,
				},
				secret
			)
			ctx.set('Authorization', `Bearer ${token}`)
			ctx.body = new SuccessModel({ token }, data.message)
		}
	},
	'get /checkToken': async (ctx) => {
		const token =
			ctx.headers['authorization'] &&
			(ctx.headers['authorization'].split(' ')[1] ||
				ctx.headers['authorization'])
		let { err, res } = await new Promise((resolve, reject) => {
			jwt.verify(token, secret, (err, res) => {
				resolve({ err, res })
			})
		})
		if (err) {
			ctx.status = 401
			return ctx.body = new ErrorModel('用户验证身份失败，请重新登录')
		}
		let data = await getUserInfoToToken({ email: res.data.email })
		ctx.body = new SuccessModel(data.data, '身份认证成功')
	},

	/* jwt.verify(token, secret, async (err, res) => {
			if (err)
				return (ctx.body = new ErrorModel(
					'用户验证身份失败，请重新登录'
				))
			console.log(res)
			let data = await getUserInfoToToken({ email: res.data.email })
			console.log(data)
			ctx.body = new SuccessModel(data.data, '身份认证成功')
		}) */
}
