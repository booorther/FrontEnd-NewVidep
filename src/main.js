import {
	createApp,
	Vue
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'

// 1. 引入你需要的组件
import {
	Button,
	Cell,
	CellGroup,
	Icon,
	Tabbar,
	TabbarItem,
	Tab,
	Tabs,
	Swipe,
	SwipeItem,
	Form,
	Field,
	Popup,
	Search
	

} from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

const app = createApp(App);
app.use(Button)
	.use(Cell)
	.use(CellGroup)
	.use(Icon)
	.use(Tabbar)
	.use(TabbarItem)
	.use(Tab)
	.use(Tabs)
	.use(Swipe)
	.use(SwipeItem)
	.use(Form)
	.use(Field)
	.use(Popup)
	.use(Search)
	.use(store)
	.use(router)
	.mount('#app')