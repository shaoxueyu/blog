class BaseModel {
	constructor(data, message) {
		if (typeof data === 'string') {
			this.message = data
		} else {
			this.data = data
			this.message = message
		}
	}
}
class ErrorModel extends BaseModel {
	constructor(data, message) {
		super(data, message)
		this.error = 1
	}
}
class SuccessModel extends BaseModel {
	constructor(data, message) {
		super(data, message)
		this.code = 0
	}
}

module.exports = {
	SuccessModel,
	ErrorModel,
}
