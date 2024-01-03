// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/common/api.js'
import {
	match
} from 'assert';
Vue.use(Vuex); //vue的插件机制

const store = new Vuex.Store({
	state: {
		token: uni.getStorageSync('token') || '',
		api: uni.getStorageSync('api') || '',
		city: '', // 获取所有城市信息
		userInfo: uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : {},
		show: false,
		windowHeight: {
			height: 'inherit'
		},
		scrollTop: 0,
		switchTab: 0,
		fans: [], // 粉丝
		fansCount: 0,
		attentionCount: 0,
		favorite: [], // 收藏
		works: []
	},
	geeters: {},
	mutations: {
		setWorks(state, payload) {
			state.works = payload
		},
		setFavorite(state, payload) {
			state.favorite = payload
		},
		setFansCount(state, payload) {
			state.fansCount = payload
		},
		setAttentionCount(state, payload) {
			state.attentionCount = payload
		},
		setFans(state, payload) {
			state.fans = payload
		},
		setToken(state, payload) {
			state.token = payload
		},
		setApi(state, payload) {
			state.api = payload
		},
		setCity(state, payload) {
			state.city = payload
		},
		updateUserInfo(state, payload) {
			state.userInfo = payload
		},
		updateShow(state, payload) {
			state.show = payload
		},
		updateScrollTop(state, payload) {
			state.scrollTop = payload
		},
		updateSwitchTab(state, payload) {
			state.switchTab = payload
		}
	},
	actions: {
		async GET_WORKS(content) {

			const res = await api.getWorks({
				author_id: this.state.userInfo.uuid
			})
			if (res.meta.state === 200) return content.commit('setWorks', res.data)
		},
		async GET_FAVORITES(content) {
			const res = await api.getAllFavorites({
				user_id: this.state.userInfo.uuid
			})
			if (res.meta.state === 200) return content.commit('setFavorite', res.data)

		},
		async GET_CITY(content) {
			const res = await api.getOnlyCity()
			if (res.meta.state === 200) {
				// 将地区信息存放在本地存储
				const city = res.data
				uni.setStorageSync('city', JSON.stringify(city))
				content.commit('setCity', city)
			}
		},
		async GET_FANS_COUNT(content) {
			const res = await api.getFans({
				following_id: this.state.userInfo.uuid
			})
			console.log('fans =>', res);
			if (res.meta.state === 200) return content.commit('setFansCount', res.data.fans)
		},
		async GET_ATTENTION_COUNT(content) {
			const res = await api.getAttention({
				follower_id: this.state.userInfo.uuid
			})
			console.log('attention =>', res);
			if (res.meta.state === 200) return content.commit('setAttentionCount', res.data.attention)
		},
	},
})

export default store