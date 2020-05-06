const model = require('../mongodb/index')
const USER = 'user'
const getCurrentTime = require('../../utils/currentTime')

//检查用户是否存在
module.exports.checkUserIfRegister = async (email) => {
	const data = await model[USER].findOne({ email })
	return { data }
}
//创建用户
module.exports.createUser = async ({ username, pwd, email }) => {
	const currentTime = getCurrentTime(2) // 获取时间
	const data = await model[USER].create({
		username,
		pwd,
		email,
		regDate: currentTime,
	})
	console.log(`${currentTime} 这个时刻创建了一个用户`, `数据库返回${data}`)
	return {
		username: data.username,
		regDate: data.regDate,
		admin: data.admin,
		email: data.email,
		photo: data.photo,
	}
}
