import {
	createRouter,
	// createWebHistory,
	createWebHashHistory
} from 'vue-router'
import Main from '../views/Main.vue'

const routes = [{
		path: '/', //第一时间进入的页面
		name: 'mian',
		component: Main,
		redirect: "home",
		children: [{ //Main子路由
			path: '/home',
			name: 'home',
			redirect: "recommend",
			
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue'),

			children: [{ //Main子路由
				path: '/recommend',
				name: 'recommend',
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import( /* webpackChunkName: "about" */
					'../views/homeView/Recommend.vue')
			}]
		}, {
			path: '/notes',
			name: 'notes',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/Notes.vue')
		}, {
			path: '/search',
			name: 'search',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/Search.vue')
		}, {
			path: '/classroom',
			name: 'classroom',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/Classroom.vue')
		}, {
			path: '/my',
			name: 'my',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/My.vue')
		}]
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// 懒加载  只有进来我这个页面  我才去加载  这个资源
		component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
	}, {
		path: '/test',
		name: 'test',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Test.vue')
	}, {
		path: '/game',
		name: 'game',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Hero.vue')
	},{
		path: '/video',
		name: 'video',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () => import( /* webpackChunkName: "about" */ '../views/Video.vue')
		component: () => import( /* webpackChunkName: "about" */ '../views/Video.vue')
	},
	{
		path: '/login',
		name: 'login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
	},
	{
		path: '/searchSub',
		name: 'searchSub',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/SearchSub.vue')
	}
	
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router