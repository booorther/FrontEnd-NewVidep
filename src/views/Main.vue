<template>
	<div class="main">

		<!-- 路由模式 开启之后  要加上  router-view   同时我们路由配置的时候 首页  手记 课堂 我的 要求是他Main页面的子路由-->

		<router-view />

		<!-- 存放我的tabbar -->
		<van-tabbar v-model="active" route active-color="#1a1a1a">
			<van-tabbar-item  v-for="(item,index) in data.list" :to="item.url">
				<span>{{item.text}}</span>
				<template #icon="props">
					<img :src="props.active ? item.active : item.inactive" />
				</template>
			</van-tabbar-item>
			
		</van-tabbar>

	</div>
</template>

<script setup>
	import {reactive,ref} from 'vue';
	const active = ref(0);

	// 定义一个图片数据  注意变量的图片路径  特别是本地路径  require
	const data = reactive({
		list: [{
			url:"/home",
			text: "首页",
			active: require("../assets/icon/home-active.png"),   //这是选中的图片 
			inactive: require("../assets/icon/home.png")  //这是未选中的图片路径
		},{
			url:"/notes",
			text: "手记",
			active: require("../assets/icon/notes-active.png"),   //这是选中的图片 
			inactive: require("../assets/icon/notes.png")  //这是未选中的图片路径
		},{
			url:"/search",
			text: "搜索",
			active: require("../assets/icon/search-active.png"),   //这是选中的图片 
			inactive: require("../assets/icon/search.png")  //这是未选中的图片路径
		},{
			url:"/classroom",
			text: "课堂",
			active: require("../assets/icon/class-active.png"),   //这是选中的图片 
			inactive: require("../assets/icon/class.png")  //这是未选中的图片路径
		},{
			url:"/my",
			text: "我的",
			active: require("../assets/icon/my-active.png"),   //这是选中的图片 
			inactive: require("../assets/icon/my.png")  //这是未选中的图片路径
		}]
	})
</script>

<style>
</style>