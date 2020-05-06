module.exports = {
	schema: {
		username: {
			type: String,
			required: true,
		},
		pwd: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		regDate: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			default: 'https://yssimage.oss-cn-hangzhou.aliyuncs.com/22.jpg',
		},
		//是否是管理员
		admin: {
			type: Boolean,
			default: false,
		},
		// 权限控制
		disabled: {
			type: Boolean,
			default: false,
		},
	},
}
