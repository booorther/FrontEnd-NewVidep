<template>
	<div class="forgotPwd">
		<div class="top">
			<div class="left">
				<img src="https://oss-xpc0.xpccdn.com/passport/avatar/10755768/2022/7/62c52a7a7531b.jpg" alt="">
				<span>New Video</span>
			</div>
			<div class="home-text">首页</div>
		</div>

		<div class="welcome">忘记密码！</div>

		<div class="english">forgot password!</div>

		<div class="form">
			<van-form @submit="onSubmit">
				<van-cell-group inset>
					<van-field v-model="data.login.phone" name="手机号" label="手机号" placeholder="手机号"
						:rules="[{ required: true, message: '请填写手机号' }]" />
					<van-field v-model="data.login.newpassword" type="password" name="新密码" label="新密码" placeholder="新密码" />
					<van-field v-model="data.login.email" name="邮箱" label="邮箱" placeholder="邮箱" />
					
					<div class="email_code_btn">
						<van-field v-model="data.login.email_code" name="邮箱验证码" label="邮箱验证码" placeholder="邮箱验证码" />
						<div class="btn-em" @click="getEmailCode">发送验证码</div>
					</div>
					
				</van-cell-group>

			</van-form>

		</div>
		<div class="login" @click="toLogin">已有账号，立即登录</div>
		<div class="btn-sub" @click="checkEmailCode">提交</div>
	</div>
</template>

<script setup>	
	import '@/assets/less/forgotPwd.less'
	
	import {
		showSuccessToast,
		showFailToast,
		showLoadingToast,
		Toast
	} from 'vant';
	
	
	import {
		useRouter
	} from "vue-router"
	import {ref , reactive} from "vue"
	
	import axios from "axios"
	
	import {
		validForm
	} from "@/common/validForm.js"
	
	let Router = useRouter();
	
	let data = reactive({
		login:{
			phone:"",
			newpassword:"",
			email:"",
			email_code:""
		}
	})
	
	let getEmailCode=()=>{
		
		//开始发送请求
		//如果是post用data接收 get请求用 parms
		axios({
			url: "http://www.kangliuyong.com:10002/emailValidCode",
			method: "post",
			headers: {
				'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
			},
			data: {
				appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
				email: data.login.email
			}
		}).then(res => {
			console.log("res获取邮箱验证码的", res)
			if(res.data.code == "J001"){
				//获取邮箱验证码成功
				showSuccessToast("获取邮箱验证码成功");
				
			}else{
				showFailToast("失败");
			}
		}).catch(err => {
			console.log("err获取邮箱验证码的", err)
		})
	}
	
	
	
	let checkEmailCode=()=>{
		axios({
			url: "http://www.kangliuyong.com:10002/checkValidCode",
			method: "post",
			headers: {
				'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
			},
			data: {
				appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
				validCode: data.login.email_code
			}
		}).then(res => {
			console.log("res验证邮箱验证码的", res)
			if(res.data.code == "K001"){
				console.log(data.login.email_code)
				//验证邮箱验证码成功
				showSuccessToast("成功更新密码");
				toLogin()
			}else{
				showFailToast("失败");
			}
		}).catch(err => {
			console.log("err验证邮箱验证码的", err)
		})
		
	}
	
	let toLogin=()=>{
		Router.push({
			path:"/login",
			query:""
		})
	}
</script>

<style lang="less">
</style>