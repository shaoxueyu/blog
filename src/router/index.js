import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/About/index.vue'),
	},
	{
		path: '/blog',
		name: 'blog',
		component: () => import('../views/Blog/index.vue'),
	},
	{
		path: '/daily',
		name: 'daily',
		component: () => import('../views/Diary/index.vue'),
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('../views/Home/index.vue'),
	},
	{
		path: '/links',
		name: 'links',
		component: () => import('../views/Links/index.vue'),
	},
	{
		path: '/message',
		name: 'message',
		component: () => import('../views/Message/index.vue'),
	},
]

export default new Router({
	routes,
})
