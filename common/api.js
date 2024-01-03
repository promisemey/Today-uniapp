import Request from '../utils/request.js'
const request = new Request().http

/*
请求样式：
    自定义名字: function(data) {
        return request({
            url: "/banner", //请求头
            method: "GET", //请求方式 
            data: data,    //请求数据
            token: token, // 可传  
            hideLoading: false, //加载样式
        })
    },
*/
// 登录  /users/login
const postUserLogin = function(params) {
	return request({
		url: '/users/login',
		method: 'post',
		data: params
	})
}

// 注册  /users/registry
const postUserRegister = function(params) {
	return request({
		url: '/users/registry',
		method: 'post',
		data: params
	})
}

// 修改个人信息
const putUserInfo = function(params) {
	return request({
		url: '/users/putUserInfo',
		method: 'put',
		data: params
	})
}

// 获取用户菜谱
const getUserFoods = function(params) {
	return request({
		url: '/users/getUserFoods',
		method: 'get',
		data: params
	})
}

// 地区 /api/district?city_id=1
const getAllCity = function(params) {
	return request({
		url: '/api/district',
	})
}

// 地区 /api/district?city_id=1
const getOnlyCity = function(params) {
	return request({
		url: '/api/onlyFcity',
		data: params
	})
}

// 首页banner
const getBanner = function(params) {
	return request({
		url: '/banner/getBanner',
	})
}

// 获取菜谱列表
const getFoodsList = function(params) {
	console.log('=>>>>>><<<<<=', params);
	return request({
		url: '/foods/postFoodsList',
		method: 'post',
		data: params
	})
}

// 菜谱详情
const getFoodsDetails = function(params) {
	return request({
		url: '/foods/postFoodsList',
		method: 'post',
		data: params
	})
}

// 获取联动分类
const getLinkCategory = function() {
	return request({
		url: '/category/getLinkCategory',
	})
}
// 获取联动分类
const getSubList = function(params) {
	return request({
		url: '/category/getSubList',
		data: params
	})
}

// 获取ip
const postServeIp = function() {
	return request({
		url: '/serve/postServeIp',
		method: 'post'
	})
}

// 获取yonghu 信息
const postUser = function(params) {
	return request({
		url: '/users/postUser',
		method: 'post',
		data: params
	})
}

// 获取作者信息
const getAuthorInfo = function(params) {
	return request({
		url: '/author/getAuthor',
		data: params
	})
}

// 获取作品信息
const getWorks = function(params) {
	return request({
		url: '/works/getWorks',
		data: params
	})
}
// 删除作品信息
const deleteWorks = function(params) {
	return request({
		url: '/works/deleteWorks',
		data: params
	})
}
// 获取作品信息
const getAllWorks = function(params) {
	return request({
		url: '/works/getAllWorks',
	})
}
// 获取作品信息
const getWorksDetails = function(params) {
	return request({
		url: '/works/getWorksDetails',
		data: params
	})
}

// 作品评论 /works/postComment
const postComment = function(params) {
	return request({
		url: '/works/postComment',
		method: 'post',
		data: params
	})
}
// 获取作品评论 
const getAllComment = function(params) {
	return request({
		url: '/works/getAllComment',
		data: params
	})
}
// 菜谱评论 /works/postComment
const postRecipeComment = function(params) {
	return request({
		url: '/recipe/postComment',
		method: 'post',
		data: params
	})
}

// 获取菜粕评论 
const getRecipeAllComment = function(params) {
	return request({
		url: '/recipe/getAllComment',
		data: params
	})
}

// 关注用户
const postFans = function(params) {
	return request({
		url: '/follows/postFans',
		method: 'post',
		data: params
	})
}

// 查询当前用户粉丝，以及是佛回关了
const postAllisFollowed = function(params) {
	return request({
		url: '/follows/postAllisFollowed',
		method: 'post',
		data: params
	})
}

// 查询是否关注
const postIsFollow = function(params) {
	return request({
		url: '/follows/postIsFollow',
		method: 'post',
		data: params
	})
}

// 取消关注
const deletefollow = function(params) {
	return request({
		url: '/follows/deletefollow',
		method: 'delete',
		data: params
	})
}

// 查询粉丝数
const getFans = function(params) {
	return request({
		url: '/follows/getFans',
		data: params
	})
}
// 查询关注量
const getAttention = function(params) {
	return request({
		url: '/follows/getAttention',
		data: params
	})
}
// 查询关注信息
const getFollowInfo = function(params) {
	return request({
		url: '/follows/getFollowInfo',
		data: params
	})
}
// 查询关注量
const postCreateFood = function(params) {
	return request({
		url: '/issue/issue',
		method: 'post',
		data: params
	})
}

// 收藏  
const postFavorites = function(params) {
	return request({
		url: '/favorites/postFavorites',
		method: 'post',
		data: params
	})
}
// 是否收藏  
const postIsFavorites = function(params) {
	return request({
		url: '/favorites/postIsFavorites',
		method: 'post',
		data: params
	})
}
// 取消收藏  
// deleteFavorites
const deleteFavorites = function(params) {
	return request({
		url: '/favorites/deleteFavorites',
		method: 'delete',
		data: params
	})
}
// 查找收藏  
// deleteFavorites
const getAllFavorites = function(params) {
	return request({
		url: '/favorites/getAllFavorites',
		data: params
	})
}
// 查找收藏数
const getCount = function(params) {
	return request({
		url: '/favorites/getCount',
		data: params
	})
}
// 随机推荐
// deleteFavorites
const getRand = function(params) {
	return request({
		url: '/favorites/rand',
		data: params
	})
}
// 随机推荐
// deleteFavorites
const getRecipe = function(params) {
	return request({
		url: '/recipe/getRecipe',
		data: params
	})
}
// 随机推荐
// deleteFavorites
const issueWork = function(params) {
	return request({
		url: '/issue/issueWork',
		method: 'post',
		data: params
	})
}

// 导出接口
export default {
	getFoodsList,
	getFoodsDetails,
	getBanner,
	postUserLogin,
	postUserRegister,
	putUserInfo,
	getAllCity,
	getOnlyCity,
	postServeIp,
	getLinkCategory,
	getUserFoods,
	getAuthorInfo,
	postUser,
	getWorks,
	deleteWorks,
	postComment,
	getAllComment,
	getWorksDetails,
	postRecipeComment,
	getRecipeAllComment,
	postFans,
	postAllisFollowed,
	postIsFollow,
	deletefollow,
	getFans,
	getAttention,
	postCreateFood,
	postFavorites,
	postIsFavorites,
	deleteFavorites,
	getAllFavorites,
	getRand,
	getCount,
	getFollowInfo,
	getRecipe,
	getSubList,
	issueWork,
	getAllWorks
}