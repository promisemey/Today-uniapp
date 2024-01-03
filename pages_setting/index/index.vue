<template>
	<view class="setting">
		<navbar title="设置"></navbar>
		<van-cell-group>
			<van-cell title="系统权限" is-link @click="jump('/pages_setting/pages_systemauth/index')" />
			<van-cell title="隐私政策" is-link @click="jump('/pages_setting/pages_privacypolicy/index')" />
		</van-cell-group>
		<van-button block @click="longout">退出登录</van-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

			longout() {
				uni.clearStorageSync()
				uni.redirectTo({
					url: '/page_login/index'
				})
			},
			jump(path) {
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style>

</style>