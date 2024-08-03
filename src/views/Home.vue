<template>

	<div class="home">
		<van-tabs v-model:active="active" color="red" v-if="data.list.length>0">
			<van-tab v-for="(item,index) in data.list" :title="item.title"> 
				<router-view></router-view>
			</van-tab>
		</van-tabs>
		
		
		<!-- 保证加载过的页面不再请求，用keep-alive -->
<!-- 		<router-view v-slot="{component}">
			 <keep-alive >
				<component :is="component"></component>
			</keep-alive>
			
		</router-view> -->
		
	</div>



</template>

<script setup>

	import {
		getRem,
		getTab,
		sendCode
	} from "../api/request.js";
	import {
		onMounted,reactive, ref
	} from "vue";
	const data=reactive({
		list:[]
	})
	const active=ref(2);
	onMounted(() => {
		let list = JSON.parse(localStorage.getItem("tab"));
		console.log("list", list);
		
		if (list) {
			data.list=list;
			return //终止代码信息效果
		}
		getTab().then(res => {

			console.log('res', res)
			data.list=res.data.data.tab;
			//本地存储,两参数，第一个参数自定义，第二参数存储值
			localStorage.setItem("tab", JSON.stringify(res.data.data.tab))
		}).catch(err => {

		})
	})

	// sendCode().then((res) => { // res后面请求回来的一个结果
	// 		//获取文章视频
	// 		console.log('res', res)
	// 	})
	// 	.catch((err) => {}) //请失败后的处理结果
	// import {
	// 	getTab
	// } from '@/api/request';
	// import {
	// 	useRouter
	// } from 'vue-router'; //路由跳转
	// let Router = useRouter();
	// let toHome = () => {
	// 	Router.push({
	// 		path: "/home",
	// 		query: {
	// 			item: "带点茅台给我",
	// 			value: 666
	// 		}
	// 	})
	// }
	// import axios from 'axios';
	// axios({
	// 		method: 'get', //方式有两种 get /post
	// 		url: `https://apis.netstart.cn/xpc/home/config`, //页面路径
	// 		//参数 如果   params:  query
	// 	})
	// 	.then((res) => { // res后面请求回来的一个结果
	// 		//获取文章视频
	// 		console.log('res', res)
	// 	})
	// 	.catch((err) => {}) //请失败后的处理结果
</script>

<style lang="less">
</style>