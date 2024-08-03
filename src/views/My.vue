<template>
	<div class="my"  >
		<!-- v-if="data.myData.username" -->
		<div class="my-header">
			<div class="my-header-top">
				<div class="header-list">
					<van-icon name="list-switch" size="20" />
				</div>

				<div class="my-header-title">我的</div>

				<button class="header-btn" @click="toLogin" size="20">登录|注册</button>
			</div>
			<div class="my-info">
				<div class="my-info-img">
					<img :src="data.myData.avatar" />
				</div>
				<div class="my-info-name">
					<span>{{data.myData.username}}</span>
					<span>地址:{{data.myData.ip_location}}</span>
					<div class="descrioption">{{data.myData.verify_description}}</div>
				</div>
			</div>			
			<div class="my-info-list">
				<span class="my-list-item">|作品•{{handlerCount(data.counts.count_article)}}|</span>	
				<span class="my-list-item">|喜欢•{{handlerCount(data.counts.count_like)}}|</span>
				<span class="my-list-item">|粉丝•{{handlerCount(data.counts.count_follower)}}|</span>
				<span class="my-list-item">|关注•{{handlerCount(data.counts.count_followee)}}|</span>
			</div> 
			<div class="album-othet">
				<div class="album-othet-album">
					<div class="album-other-album-title" >专辑</div>
					<img src="https://oss-xpc0.xpccdn.com/uploadfile/article/2023/12/27/c65c3cf7d676543f3f382599ec951c61" />
				</div>
				<div class="album-othet-other">
					<div class="other-list">
						<van-icon class="other-list" name="shopping-cart-o" title="购物车" size="20" v />
						<p>购物车</p>
					</div>
					<div class="other-list">
						<van-icon class="other-list" name="pending-payment" size="20" />
						<p>待付款</p>
					</div>
					<div class="other-list">
						<van-icon class="other-list" name="paid" size="20" />
						<p>已付款</p>
					</div>
					<div class="other-list">
						<van-icon class="other-list" name="cart-o" title="已购买" size="20" />
						<p>已购买</p>
					</div>

				</div>
			</div>

		</div>
		<div class="my-content">
			<div class="content-history">
				<div class="history-title">观看历史</div>
				<div class="history-more">更多></div>
			</div>
		</div>
		<div class="my-works">
			<div class="work-img">
				<img src="../assets/icon/my_work.png" height="25px" />
				<span>我的作品集</span>
			</div>
			<van-icon name="arrow" />
		</div>
		<div class="my-works">
			<div class="work-img">
				<img src="../assets/icon/news.png" height="30px" />
				<span>我的消息</span>
			</div>
			<van-icon name="arrow" />
		</div>
		<div class="my-works">
			<div class="work-img">
				<img src="../assets/icon/collect.png" height="25px" />
				<span>我的收藏</span>
			</div>
			<van-icon name="arrow" />
		</div>
		<div class="my-works">
			<div class="work-img">
				<img src="../assets/icon/credit.png" height="30px" />
				<span>积分兑换</span>
			</div>
			<van-icon name="arrow" />
		</div>
		<div class="my-works">
			<div class="work-img">
				<img src="../assets/icon/setting.png" height="30px" />
				<span>设置</span>
			</div>
			<van-icon name="arrow" />
		</div>

		<div class="my-works">
			<div class="work-img">
				<img src="../assets/icon/feedback.png" height="30px" />
				<span>用户反馈</span>
			</div>
			<van-icon name="arrow" />
		</div>





	</div>


</template>

<script setup>
	//引入样式处理
	import {
		getYear,
		handlerCount,
		handlerTime
	} from "@/common/handler"
	//引用接口
	import {
		getMy,
		getAlbum

	} from "@/api/request.js";

	//引入生命周期
	import {
		onMounted,
		reactive,
		ref
	} from "vue"

	import '@/assets/less/my.less'; //样式

	import {
		useRouter
	} from 'vue-router'; //路由跳转

	//获取路径的id
	import {
		useRoute
	} from "vue-router"

	let data = reactive({
		myData: {},
		counts:{}
		

	})
	
	let album=reactive({
		AlbumData:{}
	})
	let MyData = JSON.parse(localStorage.getItem("MyData"));

	console.log("MyData", MyData)


	//获取路由
	let Route = useRoute();
	console.log('Route', Route)

	let Router = useRouter();
	let toLogin = () => {
		Router.push({
			path: '/login'
		})
	}

	//获取我的方法
	let getMyData = (userId) => {
		getMy(userId).then(res => {
			console.log('我的', res)

			data.myData = res.data.data
			data.counts=res.data.data.count
		}).catch(err => {
			console.log('我的err', err)
		})
	}

	//获取专辑
	let getAlbumData = (userId) => {
		getAlbum(userId).then(res => {
			console.log('专辑', res)
		}).catch(err => {
			console.log('专辑err', err)
		})
	}
	//生命周期
	onMounted(() => {
		//调用数据的方法
		// getDetail(Route.query.id)
		getMyData(Route.query.userId)
		getAlbumData(Route.query.userId)
	})
</script>

<style>
</style>