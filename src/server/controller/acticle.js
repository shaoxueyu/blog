const model = require('../mongodb/index')
const ARTICLEINFO = 'articleInfo'
const ARTICLE = 'article'
module.exports.getArticleTagsInfo = async () => {
	const data = await model[ARTICLEINFO].findOne({}, { __v: 0, _id: 0 })
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
