const mongoose = require('mongoose')
const model = require('../mongodb/index')
const ARTICLETAGSINFO = 'articleTagsInfo'
const ARTICLE = 'article'
module.exports.getArticleTagsInfo = async () => {
	const data = await model[ARTICLETAGSINFO].findOne({}, { __v: 0, _id: 0 })
	return data
}
module.exports.getArticleDetail = async (id) => {
	console.log(id.length);
	try{
		id = mongoose.Types.ObjectId(id)
		const data = await model[ARTICLE].findOne(
			{ _id: id },
			{ __v: 0, _id: 0 }
		).populate('author', 'username -_id')
		return data // 没有数据就返回null
	}catch(e){
		return null // 报错也返回null
	}
	
}
module.exports.getHotArticleInfo = async (pagesize) => {
	const data = await model[ARTICLE].find(
		{},
		{ __v: 0 },
		{ sort: { pv: -1 } }
	).limit(pagesize)
	return data
}
module.exports.getArticleInfo = async (page, pagesize, tag) => {
	if (!tag) {
		const data = await model[ARTICLE].find(
			{},
			{ __v: 0, content: 0, author: 0 },
			{ sort: { pv: -1 } }
		)
			.skip((page - 1) * pagesize)
			.limit(pagesize)
		return data
	} else {
		const data = await model[ARTICLE].find(
			{ tag },
			{ __v: 0 },
			{ sort: { pv: -1 } }
		)
			.skip((page - 1) * pagesize)
			.limit(pagesize)
		return data
	}
}
module.exports.search = async (keywords) => {
	const pattern = new RegExp(keywords)
	const data = await model[ARTICLE].find(
		{ $or: [{ title: pattern }] },
		{ title: 1 }
	)
	return data
}
