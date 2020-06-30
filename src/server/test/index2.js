const mongoose = require('mongoose')
let schema = {
	user: {
		type: String,
		required: true,
	},
	pwd: {
		type: String,
		required: true,
	},
}
let newSchema = new mongoose.Schema(schema)
mongoose
	.connect('mongodb://localhost:27017/blog', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('连接成功')
	})
	.catch((err) => {
		console.log(err)
  })

let model = mongoose.model("t_test",newSchema)

let data = model.updateOne()
