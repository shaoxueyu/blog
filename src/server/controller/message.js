const model = require('../mongodb/index')
const MESSAGE = 'message'

// 得到评论数据
module.exports.getCommentList = async (page, pagesize) => {
	try {
		let data = await model[MESSAGE].find(
			{},
			{ _v: 0 },
			{ sort: { _id: -1 } }
		)
			.skip((page - 1) * pagesize)
			.limit(pagesize)
			.populate('user', 'email username photo -_id')
			.populate('children.user', 'email username photo -_id')
			.populate('children.toUser', 'email username photo -_id')

		console.log('data,', data)
		return { data }
	} catch (e) {
		console.log(e)
	}
}
// 获得评论
module.exports.createComment = async ({ _id, content, date }) => {
	let data = await model[MESSAGE].create({
		user: _id,
		content,
		date,
	})
	return { data }
}
// 注入子评论
module.exports.createSubComment = async ({
	_id,
	userId,
	toUserId,
	content,
	date,
}) => {
	let data = await model[MESSAGE].updateOne(
		{ _id },
		{
			$push: {
				children: { user: userId, toUser: toUserId, content, date },
			},
		}
	)
	return { data }
}
