const svgCaptcha = require('svg-captcha')
const { SuccessModel, ErrorModel } = require('../../BaseModel/index')
const createHash = require('hash-generator')
const session = {} // 局部使用session，只能手动创建
const sessionKey = 'sid'
module.exports = {
	'get /': async (ctx) => {
		try {
			const sid = ctx.cookies.get('sid')
			const vcodeMsg = svgCaptcha.createMathExpr({
				mathMax: 9,
				mathMin: 0,
			})
			//说明不是第一次访问本路由
			if (sid && session[sid]) {
				session[sid].vcode = vcodeMsg.text
				session[sid].accessTimes++
			} else {
				// 第一次访问
				const hash = createHash(16)
				const sid = hash
				const date = new Date()

				date.setTime(date.getTime() + 2 * 60 * 1000)
				ctx.set(
					'Set-Cookie',
					`${sessionKey}=${sid};expires=${date.toGMTString()}`
				)
				session[sid] = {}
				session[sid].vcode = vcodeMsg.text
				session[sid].accessTimes = 1
				setTimeout(() => {
					delete session[sid]
					console.log(`删除成功`,sid,session);
				}, 1000 * 30)
			}
			ctx.body = new SuccessModel(vcodeMsg, '返回验证码成功')
		} catch (e) {
			console.log(e)
			ctx.body = new ErrorModel(e, '服务器错误')
		}
	},
}
