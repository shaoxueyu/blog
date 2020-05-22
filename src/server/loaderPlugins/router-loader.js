const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const Router = require('@koa/router')

class RoutesLoader {
	constructor() {
		this.$app = new Koa()
		this.$router = new Router()
		RoutesLoader.app = this.$app
	}
	getApp() {
		return this.$app
	}
	handleFileLoader(dir) {
		const files = fs.readdirSync(dir)
		console.log(files)
		files.forEach((filename) => {
			//是文件还是文件夹
			const stat = fs.statSync(path.join(dir, filename))
			if (stat.isDirectory()) {
				this.handleFileLoader(path.join(dir, filename))
			} else {
				this.routerLoader(path.join(dir, filename))
			}
		})
	}
	/**
	 *
	 * @param {F:\\QQPCmgr\\Desktop\\nodejs学习\\nodejs_MVC\\routes\\user.js} jsFileDir
	 */
	routerLoader(jsFileDir) {
		const fileCtx = require(jsFileDir)
		const pattern = /routers([^\"]+)/
		///api/test
		const prefix = jsFileDir
			.match(pattern)[1]
			.replace(/\\/g, '/')
			.replace('.js', '')
			.replace('/index', '')
		Object.keys(fileCtx).forEach((route) => {
			const [method, path] = route.split(' ')
			console.log(
				'method ',
				method.toLocaleUpperCase(),
				'path ',
				prefix + path
			)
			this.$router[method](prefix + path, fileCtx[route])
		})
	}
	// 生成的路由中间间放置在其中
	start(conf) {
		this.handleFileLoader(conf.path) // 根据文件生成路由
		this.$app.use(this.$router.routes())
		this.$app.listen(conf.port, () => {
			console.log(`server started on ${conf.port}`)
		})
	}
}
module.exports = RoutesLoader
