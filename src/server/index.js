const RoutesLoader = require('./loaderPlugins/router-loader')
const path = require('path')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser') //解析json
const conf = {
	port: 8000,
	path: path.join(__dirname, './routers'),
}
const routesloader = new RoutesLoader()
const app = routesloader.getApp() //返回koa实例
app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', ctx.headers['origin'])
	//设置跨域
	ctx.set('Access-Control-Allow-Credentials', true)
	ctx.set(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since,Authorization'
	)
	ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
	await next()
})
app.use(bodyParser())
app.use(static(path.join(__dirname, './public')))

app.use(async (ctx, next) => {
	console.log(
		'method',
		ctx.request.method,
		'  url',
		ctx.request.url,
		'query',
		ctx.request.query,
		'body',
		ctx.request.body
	)
	await next()
})

routesloader.start(conf)
