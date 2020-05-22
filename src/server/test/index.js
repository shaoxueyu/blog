/* const model = require('../mongodb/index.js')
const mock = require('mockjs')
let data = mock.mock({
	'data|1000': [
		{
			date: '@date',
			title: "@ctitle",
			'type|1': ['原创', '转载'],
			'tag|1': [
				'HTML&CSS',
				'Javascript',
				'Node',
				'Vue&React',
				'Other',
			],
			content: '@cparagraph',
			'pv|1-10000': 1,
		},
	],
})

model['article'].create(data.data) */

const model = require('../mongodb/index.js')
const mongoose = require("mongoose")
model['message'].create({
	user: mongoose.Types.ObjectId('5eba22e09abc4a2bcc094945'),
	content: '<p>测试</p>',
	date: Date.now(),
})
