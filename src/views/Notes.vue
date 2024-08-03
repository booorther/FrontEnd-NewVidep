<template>
<div class="note-main">
	<div class="note-top">
		<div class="note-top-title">手记</div>
		<div class="note-top-write">
			<van-icon name="records-o" size="20" color="#e74833"/>
			<div class="note-top-write-content">写一条</div>
		</div>
	</div>
	<div class="notes-content" v-for="(item,index) in data.notesData">
		<div class="notes-content-top">
			<div class="notes-content-top-left">
				<img :src="item.user.avatar" />
				<div class="author-name-addtime">
				<div class="author-name">{{item.user.username}}</div>
				<div class="author-addtime">{{getYear(item.user.addtime*1000)}} 发布</div>
				</div>
			</div>
			<div class="notes-content-top-right">
				<div class="notes-content-top-right-attention">+关注</div>
				<div class="notes-content-top-right-icon">
					<van-icon name="ellipsis" />
				</div>
			</div>
		</div>
		<div class="img-contents" size="30">
			<div class="img-item" v-for="(image,index) in  item.images" :key="index">
				<img :src="image"  v-if=" index < 3"/>
			</div>
		</div>
		<div class="contents-item-box">
			<div class="contens-title">{{item.title}}</div>
			<div class="contents">{{item.share_info.description}}</div>


			<div class="contents-time-ip">
				<div class="time"> {{getYear(item.user.addtime*1000)}}</div>
				<div class="adress">•{{item.ip_location}}</div>
			</div>
		</div>
		<div class="comment-box">
			<div class="comment-total">共{{item.count.count_commented}}条评论</div>
			<div class="comment-my">
				<img src="../assets/icon/header_img.png" alt="" />
				<div class="comment-my-aers">说说你的看法吧~</div>
			</div>
			<div class="comment-other-box">
				<div class="other-img-other">
					<img :src="item.user.avatar" alt=""  />				
				<div class="authorname-comment-time-adress">
					<div class="other-name">{{item.user.username}}</div>
					<div class="other-comment">{{item.user.verify_description}}</div>
					<div class="other-time">
						<span>{{getYear(item.toptime*1000)}}</span>
						<span>{{item.ip_location}} </span>
					</div>
				</div>
				</div>
				<div class="other-icon">
					<van-icon name="good-job-o"  size="20"/>
					<span>{{item.user.count.count_like}}</span>					
				</div>				
			</div>
		</div>
		<div class="like-good-say">
			<div class="say-box">
				
				<van-field v-model="value" placeholder="请说说你的想法~" left-icon="edit" border />
<!-- 				<van-icon name="edit" size="15"/>
				<span>请说说你的想法~</span> -->
				

			</div>
			<div class="good-icon">
				<van-icon name="good-job-o" size="20"/>
				<span>{{item.count.count_liked}}</span>
			</div>
			<div class="comment-icon">
				<van-icon name="comment-o" size="20"/>
				<span>{{item.count.count_commented}}</span>
			</div>
		</div>














	</div>

	
</div>
</template>

<script setup>
	import '@/assets/less/notes.less'; //样式
	//引入样式处理
	import {
		getYear,
		handlerCount,
		handlerTime,
		timeAgo
	} from "@/common/handler"
	//引用接口
	import {
		getNotes
	
	} from "@/api/request.js";
	
	//引入生命周期
	import {
		onMounted,
		reactive,
		ref
	} from "vue"
	
	let data = reactive({
		notesData: []
			
		
	
	})
	
	//获取手记数据方法
	let getNotesData = () => {
		getNotes().then(res => {
			console.log('手记', res)
	        data.notesData=res.data.data.list
			
		}).catch(err => {
			console.log('手记err', err)
			
		})
	}
	//生命周期
	onMounted(() => {
		//调用数据的方法
		// getDetail(Route.query.id)
		getNotesData()

	})
</script>

<style>
</style>