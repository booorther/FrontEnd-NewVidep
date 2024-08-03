<template>
	<div class="recommend">
		<!-- 轮播图开始-->
		<div>
			<van-swipe class="my-swipe" autoplay="1500" lazy-render>
				<van-swipe-item v-for="(item,index) in data.banner" :key="index">
					<img :src="item.model.cover" width="100%" height="100%" alt="" />
					<p>{{item.model.title}}</p>
				</van-swipe-item>

				<template #indicator="{ active, total }">
					<div class="custom-indicator"><span class="active">{{ active + 1 }} </span><span
							color=" aliceblue">/</span><span class="total">{{ total }}</span></div>
				</template>
			</van-swipe>
		</div>
		<!-- 轮播图结束 -->
		<!-- 遍历显示内容 -->
		<div class="box" :class="item.type" v-for="(item,index) in data.remData" :key="index">
			<!-- 通过type类型得到内容 -->
			<div class="item" v-if="item.type=='uiMiddleCard'"
				@click="toVideo(item.children[0].model.resource.id,item.children[0].model.resource.vid)">
				<div class="bg-box">
					<img :src="item.children[0].model.resource.cover" alt="" />
					<div class="view-good-time">
						<div class="view-good">
							<div class="view">
								<van-icon name="eye-o" />
								<span>{{handlerCount(item.children[0].model.resource.count.count_view)}}</span>
							</div>
							<div class="good">
								<van-icon name="good-job-o" />
								<span>{{handlerCount(item.children[0].model.resource.count.count_like)}}</span>

							</div>

						</div>
						<!-- {{dayjs((item.children[0].model.resource.duration) * 1000).format('mm:ss')}} -->
						<div class="time">{{handlerTime(item.children[0].model.resource.duration)}}</div>
					</div>
				</div>

				<div class="title-author">
					<div class="title">{{item.children[0].model.resource.title}}</div>
					<div class="author">
						<div class="name">{{item.children[0].model.resource.author.userinfo.username}}</div>
						<span class="icon-doint">
							<van-icon name="ellipsis" />
						</span>
					</div>
				</div>
			</div>
			<!-- 大家都在看 -->
			<div class="item" v-if="item.type=='uiBigCardTop'">
				<div class="uiBigCardTop-img">
					<img :src="item.children[0].model.resource.cover" width="100%" />
					<div class="comment-view-time">
						{{handlerTime(item.children[0].model.resource.count.count_comment)}}评论

						<span>|</span>
						{{handlerCount(item.children[0].model.resource.count.count_view)}}观看
						<span>|</span>
						{{handlerTime(item.children[0].model.resource.duration)}}
					</div>
				</div>
				<div class="all-look">
					<van-icon name="eye-o" size="22" color="#e74833" />
					<span>大家都在看</span>
				</div>
				<div class="uiBigCardTop-info">
					<div class="info-title">{{item.children[0].model.resource.title}}</div>
					<div class="three-icon">
						<van-icon name="star-o" size="20"
							:badge="handlerCount(item.children[0].model.resource.count.count_collect)" />
						<span class="good">
							<van-icon name="good-job-o" size="20"
								:badge="handlerCount(item.children[0].model.resource.count.count_like)" />
						</span>
						<span class="r-icon">
							<van-icon name="ellipsis" size="20" />
						</span>
					</div>
				</div>
				<div class="author-img">
					<img :src="item.children[0].model.resource.author.userinfo.avatar" />
					<span class="author-text">{{item.children[0].model.resource.author.userinfo.username}}</span>
					<span class="look">关注</span>
				</div>
			</div>
			<div class="item" v-if="item.type=='uiBigCard'">
				<div class="anme-img">
					<div class="head-img">
						<img :src=" item.children[0].model.resource.creator.avatar" width="30px" height="30px" />
						{{item.children[0].model.resource.creator.username}}
					</div>
					<span class="uBC-icon">
						<van-icon name="ellipsis" size="20" />
					</span>

				</div>
				<span class="uiBigCard-title" size="20">{{ item.children[0].model.resource.title}}</span>
				<img :src="item.children[0].model.resource.cover" width="100%" />
				<div class="look-img">
					<div class="look-img-font">立即查看</div>
					<van-icon name="arrow" />
				</div>
			</div>
			<div class="item" v-if="item.type=='uiCollectionSlideOne'">
				<!-- 标题推荐 -->
				<div class="create-person">
					<div class="person-title">推荐创作人</div>
					<div class="look-more">查看更多 <van-icon name="arrow" /> </div>
				</div>
				<div class="container">
					<div class="ten-box">
						<div class="list-item" v-for="(value,count) in item.children" :key="count">
							<img :src="value.model.resource.avatar" />
							<div class="username">{{value.model.resource.username}}</div>
							<div class="fan">
								<span>{{value.model.resource.count.count_article}}作品</span>
								<span> {{value.model.resource.count.count_follower}}粉丝</span>
							</div>
							<div class="type">{{value.model.resource.occupation}}</div>
							<div class="btn">+关注</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	</div>
</template>

<script setup>
	//引用接口
	import '@/assets/less/recommend.less';
	import {
		getRem
	} from "../../api/request.js";
	import {
		onMounted,
		reactive
	} from "vue";
	import dayjs from 'dayjs';
	import {
		handlerTime,
		handlerCount
	} from "@/common/handler"
	import {
		useRouter
	} from "vue-router"


	let Router = useRouter();

	// console.log(handlerTime(70));
	// console.log(handlerCount(12000));

	const data = reactive({
		remData: [],
		banner: []
	})
	onMounted(() => {
		//获取本地存储的代码
		//转回数组
		let remData = JSON.parse(localStorage.getItem("remData"));

		console.log("remData", remData)

		if (remData) {
			data.remData = remData;
			data.banner = remData[0].children
			return
		}
		getRem().then((res) => { // res后面请求回来的一个结果
			console.log('res', res)
			//本地存储 第一个参数为自定义参数 第二个参数存放值 转化为JSON字符串
			//data.list = res.data.data.children;
			localStorage.setItem("remData", JSON.stringify(res.data.data.children))
		}).catch((err) => {

		}) //请失败后的处理结果
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
</script>
<!-- scoped私有样式，代码样式只在这个文件生效 -->
<style lang="less" scoped>
	//scoped私有
</style>