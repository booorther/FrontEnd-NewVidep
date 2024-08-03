import http from './http.js'

// 导出一个值

//内部接口位置，导出接口名
export const getTab = (params) => {
	// 轮播图
	//http的参数url,method
	return http({
		url: '/home/config',
		method: 'get'
	})
}
export const getRem = (params) => {
	// 轮播图
	//http的参数url,method
	return http({
		url: '/home/recommend',
		method: 'get'
	})
}

//获取视频数据
export const getVideo = (articleId) => {
	return http({
		url: `article/${articleId}`,
		method: 'get'
	})
}
//获取视频路径
export const getVideoUrl = (vid) => {
	return http({
		url: `media/${vid}`,
		method: 'get'
	})
}
//获取相似视频数据
export const getVideoSame=(articleId)=>{
	return http({
		url:`article/${articleId}/next`,
		method: 'get'
	})	
}
//获取视频评论
export const getVideoComment=(articleId,page)=>{
	return http({
		url:`comments?resource_id=${articleId}&type=article&page=${page}`,
		method: 'get'
	})	
}

//获取用户主页
export const getMy=(userId)=>{
	return http({
		url:`user/10020974`,
		method: 'get'
	})	
}
//获取专辑
export const getAlbum=(userId)=>{
	return http({
		url:`user/10020974/collections`,
		method: 'get'
	})	
}
//获取手记数据
export const getNotes=()=>{
	return http({
		url:`notes`,
		method: 'get'
	})	
}

//获取搜索数据
export const getCategoryContent = () => {
    // 
    return http({
        //url: 'article'+articled,
		url:`/page/discovery`,
        method: 'get'
    })
}
//获取搜索后的数据
export const getSearchSub = (value) => {
	// http的参数存放我们的一个 url 和 method 和 参数
	return http({
	
		url: `/search?kw=${value}`,
		method: 'get'
	})
}