const model = require('../mongodb/index.js')
const mock = require('mockjs')
const mongoose = require("mongoose")
const author = mongoose.Types.ObjectId('5eba22e09abc4a2bcc094945')
let data = mock.mock({
	'data|1000': [
		{
			date: '@date',
			title: '@ctitle',
			'type|1': ['原创', '转载'],
			'tag|1': ['HTML&CSS', 'Javascript', 'Node', 'Vue&React', 'Other'],
			content: '@cparagraph',
			des: '@cparagraph',
			'pv|1-10000': 1,
		},
	],
})
data.data.map(el => {
	el.author = author
})

model["article"].create(data.data)
/* model['articleTagsInfo'].create({
	tags: [
		{
			path: '/all',
			pathName: '全部',
		},
		{
			path: '/HTML&CSS',
			pathName: 'HTML&CSS',
		},
		{
			path: '/Javascript',
			pathName: 'Javascript',
		},
		{
			path: '/Node',
			pathName: 'Node',
		},
		{
			path: '/Vue&React',
			pathName: 'Vue&React',
		},
		{
			path: '/Other',
			pathName: 'Other',
		},
	],
}) */
/*  const model = require('../mongodb/index.js')
const mongoose = require('mongoose') */
/* model['message'].create({
	user: mongoose.Types.ObjectId('5eba22e09abc4a2bcc094945'),
	content: '<p>测试</p>',
	date: Date.now(),
	children: [
		{
			user: mongoose.Types.ObjectId('5ec0142175fd9c2430ef5ca9'),
			toUser: mongoose.Types.ObjectId('5eba22e09abc4a2bcc094945'),
			content: '<p>回复测试</p>',
			date: Date.now()
		},
	],
})  */
