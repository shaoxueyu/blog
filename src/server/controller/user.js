const model = require('../mongodb/index')
const USER = 'user'
const getCurrentTime = require('../../utils/currentTime')

//检查用户是否存在
module.exports.checkUserIfRegister = async (email) => {
	const data = await model[USER].findOne({ email })
	return { data }
}
//注册
module.exports.createUser = async ({ username, pwd, email }) => {
	const currentTime = getCurrentTime(2) // 获取时间
	const data = await model[USER].create({
		username,
		pwd,
		email,
		regDate: currentTime,
	})
	console.log(`${currentTime}创建了一个用户`, `数据库返回${data}`)
	return {
		username: data.username,
		regDate: data.regDate,
		admin: data.admin,
		email: data.email,
		photo: data.photo,
	}
}
//登录
module.exports.login = async ({ username, pwd }) => {
	const data = await model[USER].findOne({ username }, { __v: 0, _id: 0 })
	if (!data) {
		return { data, message: '用户不存在' }
	}
	if (pwd !== data.pwd) {
		return { data: null, message: '密码错误' }
	} else {
		return { data, message: '登录成功' }
	}
}

// 通过用户token来获取用户信息
module.exports.getUserInfoToToken = async ({ email }) => {
	const data = await model[USER].findOne(
		{ email },
		{ __v: 0, _id: 0, pwd: 0 }
	)
	return { data }
}
