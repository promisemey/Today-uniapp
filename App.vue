<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			uni.hideTabBar()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},

	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	scroll-view ::-webkit-scrollbar {
		width: 0 !important;
		background-color: #f6f6f6;
	}

	.navbar {
		font-weight: 700 !important;
		z-index: 9999 !important
	}

	.van-nav-bar {
		z-index: 9999 !important
	}

	// 设置整个项目的背景色
	page {
		background-color: #fff;
	}

	image {
		width: 100%;
		height: 100%;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
	}
</style>