const model = require('../mongodb/index')
const MESSAGE = 'message'

module.exports.getCommentList = async () => {
	let data = await model[MESSAGE].find({}, { _v: 0 })
		.populate('user', 'email username photo -_id')
		.populate('children.user', 'email username photo -_id')
		.populate('children.toUser', 'email username photo -_id')

	return { data }
}
