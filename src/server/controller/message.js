const model = require('../mongodb/index')
const MESSAGE = 'message'
const getCurrentTime = require('../../utils/currentTime')

module.exports.getCommentList = async () => {
	let data = await model[MESSAGE].find({}, { _v: 0 })
	return { data }
}
