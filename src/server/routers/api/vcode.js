const svgCaptcha = require('svg-captcha')
const { SuccessModel, ErrorModel } = require('../../BaseModel/index')
const createHash = require('hash-generator')
const { session } = require('../../session/index') // 局部使用session，只能手动创建
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
				clearTimeout(session[sid].timer)
				session[sid].timer = setTimeout(() => {
					delete session[sid]
					console.log(`删除成功`, sid, session)
				}, 1000 * 120)
				ctx.set(
					'Set-Cookie',
					`${sessionKey}=${sid}; Max-Age=100; HTTPOnly`
				)
			} else {
				// 第一次访问
				const hash = createHash(16)
				const sid = hash
				const date = new Date()

				date.setTime(date.getTime() + 2 * 60 * 1000)
				ctx.set(
					'Set-Cookie',
					`${sessionKey}=${sid}; Max-Age=100; HTTPOnly`
				)
				session[sid] = {}
				session[sid].vcode = vcodeMsg.text
				session[sid].accessTimes = 1
				session[sid].timer = setTimeout(() => {
					delete session[sid]
					console.log(`删除成功`, sid, session)
				}, 1000 * 120)
				
			}
			console.log(session)
			ctx.body = new SuccessModel(vcodeMsg, '返回验证码成功')
		} catch (e) {
			console.log(e)
			ctx.body = new ErrorModel(e, '服务器错误')
		}
	},
}
