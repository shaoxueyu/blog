const jwt = require('jsonwebtoken')
const secret = 'Smallker'

module.exports = async (ctx) => {
	const token =
		ctx.headers['authorization'] &&
		(ctx.headers['authorization'].split(' ')[1] ||
      ctx.headers['authorization'])
	let { err, res } = await new Promise((resolve) => {
		jwt.verify(token, secret, (err, res) => {
			resolve({ err, res })
		})
	})
	return { err, res }
}
