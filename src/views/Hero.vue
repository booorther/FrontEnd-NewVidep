<template>
	<div class="hero" >
		<div class="box" v-for="(item,index) in data.game" @click="alterName(item.name,item.skill)"> 
		<div>{{item.name}}{{item.skill}}</div>
		</div>
		<button @click="pushHero">添加英雄</button>
		<!-- v-if删除页面元素 ，少用删除，消耗性能-->
		<div v-if="bol">V-IF</div>
		<!-- v-show隐藏页面元素 ，多用删除不消耗性能-->
		<div v-show="bol">V-SHOW</div>
		<button @click="bol=!bol">显示隐藏</button>
		<button @click="changeNB" >修改世界</button>
		
		<div v-show="bol1">{{newnb}}</div>
		<button @click="toTest">跳转页面</button>
	</div>
</template>

<script setup>
	import {ref,reactive,computed, watch} from "vue";
	const data=reactive(
	{
		game:[
			{
			name:"迦南",
			skill:"隐身"
		},
		{
			name:"宁红夜",
			skill:"眩晕"
		},
		{
			name:"天海",
			skill:"大佛"
		},
		{
			name:"妖刀姬",
			skill:"妖刀"
		},
		{
			name:"迦南",
			skill:"隐身"
		},
		{
			name:"宁红夜",
			skill:"眩晕"
		},
		{
			name:"天海",
			skill:"大佛"
		},
		{
			name:"妖刀姬",
			skill:"妖刀"
		},
		{
			name:"迦南",
			skill:"隐身"
		},
		{
			name:"宁红夜",
			skill:"眩晕"
		},
		{
			name:"天海",
			skill:"大佛"
		},
		{
			name:"妖刀姬",
			skill:"妖刀"
		}
		]
	})
	let alterName=(name,skill)=>{
		alert(name);
		alert(skill);
	}
	let pushHero=()=>{
		data.game.push({name:"季莹莹",skill:"萤火"});
	}
	let bol=ref(true);
	//ref为true则显示，false为隐藏
	let bol1=ref(true);
	let name=ref("世界，");
	let body=ref("欢迎你！");
	
	let newnb=computed(()=>{
		return name.value+body.value;
	})
	console.log("newnb",newnb);//控制台显示
	let changeNB=()=>{
		name.value="大海，";
	}
	watch(()=>name.value,(newData,oldData)=>{
		console.log("newData",newData);
		console.log("oldData",oldData);
	},{immediate:true})
	
	
	import {useRouter} from 'vue-router';//路由跳转
	let Router=useRouter();
	let toTest=()=>{
		Router.push({path:"/test",query:{item:"带点茅台给我",value:666}})
	}
	 import {useRoute} from 'vue-router';//接收路由
	
	 let Route=useRouter
	 ();
	 console.log("Router",Router);
	 import { onMounted} from "vue";
	 onMounted(()=>{
		 console.log("画面渲染完成执行");
	 })
	 
</script>

<style lang="less">
	.hero{
		width: 100px;
		height: 300px;
		align-content: center;
	}
	.box{
		border: 10px solid gray;
		float: left;
		height: 50px;
		width: 20px;
	}
</style>.