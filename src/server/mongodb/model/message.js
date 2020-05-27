const Schema = require('mongoose').Schema
module.exports = {
	schema: {
		// 第一留言人
		user: { type: Schema.Types.ObjectId, ref: 'user', require: true },
		//留言内容
		content: { type: String, required: true },
		//日期
		date: { type: String, require: true },
		//子留言
		children: [
			{
				//字用户
				user: {
					type: Schema.Types.ObjectId,
					ref: 'user',
					required: true,
				},
				// 内容
				content: {
					type: String,
					required: true,
				},
				//评论对象
				toUser: {
					type: Schema.Types.ObjectId,
					ref: 'user',
					required: true,
        },
        // 评论时间
				date: {
					type: String,
					required: true,
				},
			},
		],
	},
}
