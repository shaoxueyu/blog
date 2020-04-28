const Schema = require("mongoose").Schema
module.exports = {
	schema: {
		type: {
			type: String,
			required: true,
		}, //原创。转载
		title: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			requried: true,
		},
		content: {
			type: String,
			required: true,
		},
		tag: {
			type: String,
			required: true,
		},
		pv: {
			type: Number,
			default: 0,
	}, // 浏览量
		comment: {
			type: Schema.Types.ObjectId,
			ref: 'comment',
		},
		surface: {
			type: String,
			default: '/images/default_surface.jpg',
		}, // 文章图片封面
	},
}
