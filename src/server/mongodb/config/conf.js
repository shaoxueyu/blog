module.exports = {
	db: {
		url: 'mongodb://localhost:27017/blog',
		options: { useNewUrlParser: true, useUnifiedTopology: true },
	},
	get url() {
		return this.db.url
	},
	get options() {
		return this.db.options
	},
}
