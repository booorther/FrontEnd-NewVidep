<template>
	<div class="video">
		<van-icon name="arrow-left"  size="25" class="video-cancle" @click="toBack()"/>
		<!-- 视频 video -->
		<div class="video-box">
			
			<video :src="data.url" controls autoplay muted></video>
		</div>
		<!-- 简介和评论 -->
		<div class="detail-commet">
			<van-tabs v-model:active="active" color="#e44b3d">
				<van-tab title="简介">
					<div class="content" v-if="data.other.title">
						<div class="title">{{data.other.title}}</div>

						<div class="tag-type-time-view">
							<div class="tag">
								<span v-for="(item,index) in data.other.categories"
									:key="index">{{item.sub.category_name}}<i
										v-if="index!=data.other.categories.length-1">-</i></span>

							</div>

							<div class="time">{{getYear(data.other.publish_time*1000)}} </div>
							<div class="view">{{handlerCount(data.other.count.count_view)}}次数</div>
						</div>

						<div class="desc">{{data.other.content}}</div>


						<div class="good-collect-share">
							<div class="good-item">
								<van-icon name="good-job-o" size="25" />
								<span>{{handlerCount(data.other.count.count_like)}}</span>
							</div>
							<div class="good-item">
								<van-icon name="star-o" size="25" />
								<span>{{handlerCount(data.other.count.count_collect)}}</span>
							</div>
							<div class="good-item">
								<van-icon name="share-o" size="25" />
								<span>{{handlerCount(data.other.count.count_share)}}</span>
							</div>
						</div>

						<div class="all-tags">
							<span v-for="(item,index) in data.other.tags" :key="item.id">{{item.name}}</span>
						</div>


						<div class="composer">
							<div class="composer-value">创作人</div>
							<div class="composer-box">
								<div class="composer-item">
									<div class="img-info">
										<img :src="data.other.author.userinfo.avatar" alt="">
										<div class="info">
											<div class="author">{{data.other.author.userinfo.username}}</div>
											<div class="author-type">{{data.other.author.userinfo.occupation}}</div>
										</div>
									    <div class="btn">关注</div>
									</div>
								</div>
							</div>
						</div>


					</div>
					<!-- 相似视频 -->
					<div class="sameVideo">

						<div class="title-same">相似视频</div>
						<div class="list-box">
							<div class="list-item" v-for="(item,index) in data.list" :key="index"
								@click="toVideoSame(item.id,item.vid)">

								<div class="item-left">

									<img :src="item.share_info.image" alt="">
									<span>{{handlerTime(item.duration)}}</span>
								</div>
								<div class="item-right">
									<div class="item-title">{{item.share_info.title}}</div>
									<div class="view-like">
										<span>{{handlerCount(item.count.count_view)}}播放
										</span><span>{{handlerCount(item.count.count_like)}}喜欢</span>
									</div>
									<div class="author-box">
										<img class="picture" :src="item.author.userinfo.avatar" alt="">
										<span class="username">{{item.author.userinfo.username}}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</van-tab>
				<van-tab title="评论">
					<template #title> 评论 <span class="count">{{data.comments.length}}</span> </template>
					<div class="comments">
						<div class="comment-item" v-for="(item,index) in data.comments" :key="index">
							<div class="comment-top">
							
								<img class="hander" :src="item.userInfo.avatar" alt="">
								<div class="content-view">
									<div class="username">{{item.userInfo.username}}</div>
									<div class="doint">
										<van-icon name="ellipsis" />
									</div>
									<div class="comment-value">{{item.content}}</div>
								</div>
								

								
								
							</div>
							
							<div class="comment-bottom">
								<div class="time-address">
									<span class="time">{{getYear(item.addtime*1000)}}</span>
									<span class="address">{{item.ip_location}}</span>
								</div>
								<div class="other-comment-good" >
									<van-icon name="chat-o" size="18"/>
									<div class="icon-count">
										<van-icon name="good-job-o" size="18"/>
										<span>{{handlerCount(item.count_approve)}}</span>
									</div>
									
								</div>
							</div>
							
						</div>


					</div>
				</van-tab>
			</van-tabs>

		</div>
	</div>
</template>

<script setup>
	import '@/assets/less/video.less'
	import {
		getYear,
		handlerCount,
		handlerTime
	} from '@/common/handler'
	//引入生命周期
	import {
		onMounted,
		ref,
		reactive
	} from "vue"

	import {
		getVideo,
		getVideoUrl,
		getVideoSame,
		getVideoComment
	} from "@/api/request.js"

	//用于获取数据 路径的$("#")
	import {
		useRoute,
		useRouter
	} from "vue-router"
import router from '@/router'

	let Router = useRouter();

	let Route = useRoute();
	let toBack =()=>{
		router.back();
	}

	//获取我们的 视频路径 还有视频 标题和上映时间等

	//对象有时候会出现 报错 但能显示效果
	let data = reactive({
		url: "",
		other: {},
		list: [],
		comments: []
	})
	console.log("route", Route)

	//获取数据的方法
	let getDetail = (id) => {
		getVideo(id).then(res => { //成功执行
			console.log(res)
			data.other = res.data.data;
		}).catch(err => { //失败执行
			console.log(err)
		})

	}
	let getUrl = (vid) => {
		getVideoUrl(vid).then(res => { //成功执行
			console.log("url", res)
			data.url = res.data.data.resource.progressive[0].backupUrl;
			console.log(data.url)
		}).catch(err => { //失败执行
			console.log(err)
		})

	}

	let getSame = (id) => {
		getVideoSame(id).then(res => { //成功执行
			console.log("相似视频", res)
			data.list = res.data.data.list
		}).catch(err => { //失败执行
			console.log("相似视频err", err)
		})

	}

	let getComment = (id, page) => {
		getVideoComment(id).then(res => { //成功执行
			console.log("评论", res)
			data.comments = res.data.data.list
			console.log("data.comments",data.comments)
		}).catch(err => { //失败执行
			console.log("err", err)
		})
	}
	//获取相似视频的数据
	let toVideoSame = (id, vid) => {
		getDetail(id)
		getUrl(vid)
		getSame(id);
		//滚动到顶部
		window.scroll(0, 0)
	}
	onMounted(() => {
		//调用获取数据的方法
		getDetail(Route.query.id)
		getUrl(Route.query.vid)
		getSame(Route.query.id)
		getComment(Route.query.id, 1)
	})
</script>

<style lang="less">

</style>