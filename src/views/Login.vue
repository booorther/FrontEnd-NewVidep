<template>
	<div class="login">
		<div class="top">
			<div class="left">
				<img src="https://oss-xpc0.xpccdn.com/passport/avatar/10755768/2022/7/62c52a7a7531b.jpg" alt="" />
				<span>New Video</span>
			</div>

			<div class="home-text" @click="toRecommend">首页</div>
		</div>

		<div class="welcome">欢迎回来</div>

		<div class="english">Please login to your accounts</div>

		<div class="form">
			<van-form @submit="onSubmit">
				<van-cell-group inset>
					<van-field v-model="data.login.phone" name="用户名" label="用户名" placeholder="用户名"
						:rules="[{ required: true, message: '请填写用户名' }]" />
					<van-field v-model="data.login.password" type="password" name="密码" label="密码" placeholder="密码"
						:rules="[{ required: true, message: '请填写密码' }]" />
				</van-cell-group>

			</van-form>

		</div>

		<div class="forget-password" @click="toFogotPwd" >忘记密码？</div>

		<div class="btn-login" @click="loggin">登录</div>

		<div class="btn-register" @click="changeShow">注册</div>

		<!-- 弹出层盒子 -->
		<div class="register-box">
			<!-- 底部弹出 -->
			<van-popup v-model:show="showBottom" position="bottom" closeable close-icon="close"
				:style="{ height: '50%' }">
				<div class="content">
					<div class="register-tilte">注册</div>
					<van-form @submit="onSubmit">
						<van-cell-group inset>
							<!-- 这个变量会接受输入框的值，值变化输入框也变化 -->
							<van-field v-model="data.register.phone" name="手机号" label="手机号" placeholder="手机号" />
							<van-field v-model="data.register.password" type="password" name="密码" label="密码"
								placeholder="密码" />
							<van-field v-model="data.register.nickName" name="昵称" label="昵称" placeholder="昵称" />
						</van-cell-group>
					</van-form>

					<div class="btn-login" @click="registerData">注册</div>
				</div>
			</van-popup>
		</div>
	</div>
</template>

<script setup>
	import '@/assets/less/login.less'
	import {
		reactive,
		ref
	} from 'vue'

	let Router = useRouter();
	let Route = useRoute();
	let toRecommend =()=>{
		Router.push({
			path: "/recommend"
		})
	};
	let toFogotPwd =()=>{
		Router.push({
			path: "/forgotPwd"
		})
	}
	let data = reactive({
		register: {
			phone: "",
			password: "",
			nickName: ""
		},
		login: {
			phone: "",
			password: ""
			
		}
	})

	let showBottom = ref(false);
	//

	let changeShow = () => {
		showBottom.value = true;
	}
	let loggin =()=>{
		axios({
			url: "http://www.kangliuyong.com:10002/login",
			method: "post",
			headers: {
			        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
			      },
			data: {
				appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
				// nickName: '靓仔',
				// password: 'dwq231',
				// phone: 16567789061
				// nickName: data.register.nickName,
				password: data.login.password,
				phone: data.login.phone
			}
		}).then(res => {
			console.log('res注册的', res)
			if(res.data.code==200){
				//注册成功
				showSuccessToast('success')
				Router.push({
					path: "/recommend"
				})
			}else{
				showFailToast('faile')
			}
		}).catch(err => {
			console.log('err注册的', err)
		})
	}
	import {
		validForm
	} from '@/common/validForm.js'
	import axios from 'axios'
	import {showSuccessToast,showFailToast,showLoadingToast,Toast} from 'vant';
	import {
		useRoute,
		useRouter
	} from "vue-router"
	
	
	let registerData = () => {
		console.log("data", data.register)
		//构造表单验证信息  注册正则  校正数据格式 正则 提示文字 校正的值
		let o = {
			phone: {
				value: data.register.phone,
				errorMsg: '手机号格式不正确',
				reg: /^1[3-9]\d{9}$/
			},
			password: {
				value: data.register.password,
				errorMsg: '密码由数字字母下划线组合(6-16字符)',
				reg: /^[A-Za-z]\w{5,15}$/
			},
			nickName: {
				value: data.register.nickName,
				errorMsg: '昵称由字母数字下划线汉字组合(1-10字符)',
				reg: /^[\w\u4e00-\u9fa5]{1,10}$/
			},
		};

		let isPass = validForm.valid(o);
		//通过打印true， 否则false
		console.log("isPass", isPass)

		if (!isPass) {
			return //中止后面代码
		}
		showLoadingToast({
			message:'加载中...',
			forbidClick:true,
		});
		//
		axios({
			url: "http://www.kangliuyong.com:10002/register",
			method: "post",
			headers: {
			        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
			      },
			data: {
				appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
				// nickName: '靓仔',
				// password: 'dwq231',
				// phone: 16567789061
				nickName: data.register.nickName,
				password: data.register.password,
				phone: data.register.phone
			}
		}).then(res => {
			console.log('res注册的', res)
			if(res.data.code==100){
				//注册成功
				showSuccessToast(res.data.msg)
			}else{
				showFailToast(res.data.msg)
			}
		}).catch(err => {
			console.log('err注册的', err)
		})
	}
</script>

<style lang="less">
</style>