const nodemailer = require('nodemailer')
const { fromEmail, smtpPwd } = require('../../config/index')
// async..await is not allowed in global scope, must use a wrapper
module.exports = async function({ toEmail, subject, content }) {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'smtp.qq.com',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: fromEmail, // generated ethereal user
			pass: smtpPwd, // generated ethereal password
		},
	})

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: fromEmail, // sender address
		to: toEmail || '654730917@qq.com', // list of receivers
		subject: subject || 'Hello', // Subject line
		html: `您的验证码为${content}` || '<b>测试使用</b>', // html body
	})
	console.log('Message sent: %s', info.messageId)
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
