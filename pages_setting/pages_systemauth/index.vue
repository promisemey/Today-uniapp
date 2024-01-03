<template>
	<view class="auth">
		<navbar></navbar>
		<van-cell-group>
			<van-cell title="系统推荐通知">
				<van-switch v-model="checked" size="24px" />
			</van-cell>
			<van-cell title="不把我推荐给微信好友">

				<van-switch v-model="checked" size="24px" />

			</van-cell>
			<van-cell title="开启个性化推荐">

				<van-switch v-model="checked" size="24px" />
			</van-cell>
		</van-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: true,
			};
		}
	}
</script>

<style lang="scss">
	/deep/.van-cell__title {
		font-size: 30rpx;
	}
</style>