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
		// 头像
		photo: {
			type: String,
			default: 'http://localhost:8000/images/default_surface.jpg',
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
