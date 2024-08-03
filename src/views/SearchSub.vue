<template>
	<div class="searchSub">
		<div class="searchBar">
			<form action="/">
				<van-search v-model="value" shape="round" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
			</form>

		</div>
		<div class="coposer-author-moddle">
			<van-tabs v-model:active="active" color="#ff0000" line-width="20">
				<van-tab title="作品"></van-tab>
				<van-tab title="创作人"></van-tab>
				<van-tab title="正版素材"></van-tab>
			</van-tabs>
		</div>
		<div class="sort-search-all-dowload">
			<div class="sort-search">
				<div class="search-comprehensive">
					<span>综合排序</span>
					<van-icon name="arrow-down" size="20"/>
				</div>
				<div class="search-major">
					<span>专业搜索</span>
					<van-icon name="arrow-down" size="20"/>
				</div>
			</div>
			<div class="all-dowload" id="all-dowload">  
			    <div class="all" id="all" @click="handleClick('all')">全部</div>  
			    <div class="dowload" id="dowload" @click="handleClick('dowload')">可下载</div>  
			</div>  

		</div>
		<div class="count">共<span class="count-a" color="#ff080c"> {{dataSearch.list.length}} </span> 部作品</div>
		<div class="search-video">
			<div class="list-box">
				<div class="list-item" v-for="(item,index) in dataSearch.list" :key="index"
					@click="toVideo(item.id,item.vid)">


					<div class="item-left">

						<img :src="item.cover" alt="">
						<span>{{handlerTime(item.duration)}}</span>
					</div>


					<div class="item-right">
						<div class="item-title">{{item.title}}</div>

						<div class="view-like">
							<span>{{handlerCount(item.count.count_view)}}播放 •
							</span><span> {{handlerCount(item.count.count_like)}}喜欢</span>
						</div>
						<div class="author-box">
							<img class="picture" :src="item.author.userinfo.avatar" alt="">
							<span class="username">{{item.author.userinfo.username}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script setup>
	import {
		getYear,
		handlerCount,
		handlerTime,
		handleClick
	} from '@/common/handler'

	//引入生命周期
	import {
		onMounted,
		onActivated,
		ref,
		reactive,
		onUnmounted,
		onBeforeMount
	} from "vue"

	import {
		Search,
		Tab,
		Tabs
	} from 'vant';
	//用于获取数据 路径的$("#")
	import {
		useRoute,
		useRouter
	} from "vue-router"
	let Router = useRouter();
	let Route = useRoute();

	import {
		getSearchSub
	} from "@/api/request.js"
	import "@/assets/less/searchSub.less"


	let dataSearch = reactive({
		list: []
	})
	let value = ref('')



	const onSearch = (value) => {
		// Route.query.value = ref(value)
		getSearchDate(value)
		console.log("value", value)
	}

	let getSearchDate = (value) => {
		getSearchSub(value).then(res => { //成功执行

			dataSearch.list = res.data.data.list
			console.log("search200", res)
		}).catch(err => { //失败执行
			console.log("err", err)
		})
	}

	onActivated(() => {
		dataSearch.list = []
		//调用获取数据的方法,从旧页面再次进入新页面时，数据不更新
		value = ref(Route.query.value)
		getSearchDate(Route.query.value)
	})

	onMounted(() => {

		//调用获取数据的方法
		value = ref(Route.query.value)
		getSearchDate(value)
	})


	let toVideo = (id, vid) => {
		Router.push({
			path: "/video",
			query: {
				id,
				vid
			}
		})
	}

	const onCancel = () => {
		Router.push({
			path: "/search",
		})
	}
</script>

<style lang="less">
</style>