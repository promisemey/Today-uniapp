<template>
	<!-- <view v-if="showselected"> -->
	<view class="tabbar">
		<tui-icon style="display: none;" name="about"></tui-icon>
		<tui-tabbar :current="switchTab" backgroundColor="#fff" :tabBar="tabBar" color="#777" selectedColor="#3b55f3"
			iconSize="40" @click="tabbarSwitch"></tui-tabbar>

		<!-- 弹出 -->
		<!-- 		<van-popup :show="show" round position="bottom" custom-style="height: 20%;z-index:999;" @close="onClose"
			:safe-area-tab-bar="true" /> -->
		<!-- 弹出 -->
	</view>
	<!-- </view> -->
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex' //引入mapMutations
	export default {
		data() {
			return {
				// show: false,
				// current: uni.getStorageSync('index') || 0,
				// route: getCurrentPages()[0].route,
				tabBar: [{
						pagePath: '/pages_index/index/index',
						text: '吃啥',
						name: 'home',
						activeName: 'home',
					},
					{
						pagePath: '/pages_category/index/index',
						text: '分类',
						name: 'manage',
						activeName: 'manage',
					},
					{
						pagePath: '',
						// text: 'extend',
						iconPath: '/static/images/tabbar/release.png',
						hump: true,
						selectedIconPath: '/static/images/tabbar/release.png'
					},
					{
						pagePath: '/pages_collect/index/index',
						text: '收藏',
						name: 'like',
						activeName: 'like',
					},
					{
						pagePath: '/pages_my/index/index',
						text: '我的',
						name: 'people',
						activeName: 'people',
						num: 2,
						isDot: true,
						verify: true
					}
				],
			}
		},
		computed: {
			...mapState({
				show: state => state.show,
				scrollTop: state => state.scrollTop,
				switchTab: state => state.switchTab
			})
		},
		mounted() {
			const index = this.tabBar.findIndex(item => item.pagePath === `/${getCurrentPages()[0].route}`)
			this.updateSwitchTab(index)
		},
		methods: {
			...mapMutations(['updateShow', 'updateSwitchTab']),
			onClose() {
				// this.show = false
				this.updateShow(false)
			},
			tabbarSwitch(e) {
				// console.log(this.route);
				console.log(e, this.switchTab);
				if (this.switchTab === e.index || this.show) return
				if (!!e.pagePath) {
					// uni.setStorageSync('index', e.index)
					// console.log('index', e.index, e.pagePath);
					// this.current = e.index
					// console.log('前', this.switchTab);
					this.updateSwitchTab(e.index)
					// console.log('后', this.switchTab);
					uni.switchTab({
						url: e.pagePath,
					})
				}
				if (e.index === 2) {
					const {
						windowHeight
					} = uni.getSystemInfoSync()
					// this.windowHeight.height = windowHeight + 'px'
					// this.updateShow(true)
					uni.navigateTo({
						url: '/pages_attention/issue_work/issue_work'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.tui-tabbar-hump {
		// box-shadow: 0 5px 10px rgba(0, 0, 0, .9) !important;
		box-shadow: 0 5px 10px rgba(0, 130, 252, 1.0);
	}

	.tabbar {
		height: 100rpx;

		&:before {
			content: '';
			height: 100rpx;
		}
	}
</style>