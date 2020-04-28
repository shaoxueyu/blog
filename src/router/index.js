import Vue from 'vue'
import Router from 'vue-router'
const ArticleItem = () => import('../components/ArticleItem.vue')

Vue.use(Router)

const routes = [
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/About/index.vue'),
	},
	{
		redirect: "/ blog/all",
		path: '/blog',
		name: 'blog',
		component: () => import('../views/Blog/index.vue'),
		children: [
			{
				path: 'all',
				name: 'all',
				component: ArticleItem,
				meta: { id: 1 },
			},
			{
				path: 'HTML&CSS',
				name: 'HTML&CSS',
				component: ArticleItem,
				meta: { id: 2 },
			},
			{
				path: 'Javascript',
				name: 'Javascript',
				component: ArticleItem,
				meta: { id: 3 },
			},
			{
				path: 'Node',
				name: 'Node',
				component: ArticleItem,
				meta: { id: 4 },
			},
			{
				path: 'Vue&React',
				name: 'Vue&React',
				component: ArticleItem,
				meta: { id: 5 },
			},
			{
				path: 'Other',
				name: 'Other',
				component: ArticleItem,
				meta: { id: 5 },
			},
		],
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
