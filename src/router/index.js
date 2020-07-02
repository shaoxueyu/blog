import Vue from 'vue'
import Router from 'vue-router'
const ArticleItem = () => import('../components/ArticleItem.vue')

Vue.use(Router)

const routes = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/About/index.vue'),
	},
	{
		path: '/article/:id',
		name: 'article',
		component: () => import('../views/Article/index.vue'),
	},
	{
		redirect: '/blog/all',
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
				meta: { id: 2, tag: 'HTML&CSS' },
			},
			{
				path: 'Javascript',
				name: 'Javascript',
				component: ArticleItem,
				meta: { id: 3, tag: 'Javascript' },
			},
			{
				path: 'Node',
				name: 'Node',
				component: ArticleItem,
				meta: { id: 4, tag: 'Node' },
			},
			{
				path: 'Vue&React',
				name: 'Vue&React',
				component: ArticleItem,
				meta: { id: 5, tag: 'Vue&React' },
			},
			{
				path: 'Other',
				name: 'Other',
				component: ArticleItem,
				meta: { id: 5, tag: 'Other' },
			},
		],
	},
	{
		path: '/diary',
		name: 'diary',
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
	{
		path: '*',
		name: '/404',
		component: () =>
			import(/* webpackChunkName: "NotFound"*/ '@/views/404/index.vue'),
	},
]
const router = new Router({
	routes,
})
export default router
