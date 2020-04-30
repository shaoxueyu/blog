const model = require('./mongodb/index')
const RoutesLoader = require('./loaderPlugins/router-loader')
const path = require('path')
const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const conf = {
	port: 8000,
	path: path.join(__dirname, './routers'),
}
const routesloader = new RoutesLoader()
const app = routesloader.getApp() //返回koa实例
app.use(static(path.join(__dirname, './public')))
app.use(bodyParser())

app.use(async (ctx, next) => {//ctx.headers['origin']
	ctx.set('Access-Control-Allow-Origin', "http://localhost:3000")
//设置跨域
	ctx.set("Access-Control-Allow-Credentials", true)
	ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since");
	ctx.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
	await next()
})

app.use(async (ctx, next) => {
	console.log(
		'method',
		ctx.request.method,
		'  url',
		ctx.request.url,
		'query',
		ctx.request.query,
		ctx.request.body
	)
	await next()
})

routesloader.start(conf)
