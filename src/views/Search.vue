<template>
	<div class="search">
		<!-- searchBoard begin -->
		<div class="searchBoard">
			<div class="searchBar">
				<form action="/">
					<van-search v-model="value" shape="round" show-action placeholder="请输入搜索关键词" @search="onSearch" 
						@click="changeSearchBar" action-text />
				</form>

			</div>
			<!-- 轮播图开始-->
			<div>
				<van-swipe class="my-swipe" autoplay="1500">
					<van-swipe-item v-for="(item,index) in data.banner" :key="index">
						<img :src="item.cover" width="100%" height="100%" alt="" />
						<p>{{item.title}}</p>
					</van-swipe-item>

					<template #indicator="{ active, total }">
						<div class="custom-indicator"><span class="active">{{ active + 1 }} <span
									color=" aliceblue">/</span></span><span class="total">{{ total }}</span></div>
					</template>
				</van-swipe>
			</div>
			<!-- 轮播图结束 -->
			<div class="box" v-for="(item,index) in data.list" :key="index">
				<div class="item">
					<img :src="item.icon" class="item-img" alt="" />
					<div class="sort-type">{{item.title}}
						<p></p>
					</div>
				</div>

			</div>
		</div>
		<!-- searchBoard end -->
		<!-- composer-sort begin -->
		<div class="composer-sort">
			<div class="composer-sort-text">
				<div class="text-title">分类作品库</div>
				<span>查看全部</span>
			</div>
			<div class="composer-content">
				<div class="composer-item" v-for="(value,keyy) in data.sort" :key="keyy">
					<img :src="value.cover" alt="" />
					<div class="composer-type">{{value.category_name}}</div>
				</div>
			</div>

		</div>
		<!-- composer-sort begin -->
	</div>
</template>

<script setup>
	//引用样式
	import '@/assets/less/search.less';
	import {
		getCategoryContent
	} from "@/api/request.js";
	import {
		onMounted,
		reactive,
		ref
	} from "vue";

	import {
		useRoute,
		useRouter
	} from "vue-router"
	// let Router = useRouter();
	let Route = useRoute();

	
	//

	



	const data = reactive({
		banner: [],
		list: [],
		sort: []
	})
	let Router = useRouter();
	const changeSearchBar = () => {
		Router.push({
			path: "/searchSub",
			//query: {}
		})
	}

	let getCategory = () => {
		getCategoryContent().then((res) => { // res后面请求回来的一个结果
			console.log('搜索res', res)
			// data.catData = catData;
			data.banner = res.data.data.banners
			data.list = res.data.data.recommended_position
			data.sort = res.data.data.categories
		}).catch((err) => {
			console.log('err', err)
		})
	}
	onMounted(() => {
		getCategory()





	})
</script>

<style lang="less">

</style>