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
		regDate: {
			type: String,
			required: true,
    },
    photo:{
      type: String,
      default: ""
    }
	},
}
