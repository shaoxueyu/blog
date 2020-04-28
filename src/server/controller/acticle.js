const model = require('../mongodb/index')
const ARTICLETAGSINFO = 'articleTagsInfo'
const ARTICLE = 'article'
module.exports.getArticleTagsInfo = async () => {
	const data = await model[ARTICLETAGSINFO].findOne({}, { __v: 0, _id: 0 })
	return data
}
module.exports.getHotArticleInfo = async () => {
	const data = await model[ARTICLE].find(
		{},
		{ __v: 0, _id: 0 },
		{ sort: { pv: -1 } }
	).limit(8)
	return data
}
module.exports.getAllarticleInfo = async () => {
	const data = await model[ARTICLE].find(
		{},
		{ __v: 0 },
		{ sort: { pv: -1 } }
	).limit(8)
	/* 	data.sort((item, item1) => {
		return item1.date.getTime() - item.date.getTime()
	}) */
	return data
}
