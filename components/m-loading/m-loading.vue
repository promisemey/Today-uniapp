<template>
	<view>
		<van-overlay :z-index="99999" :show="showLoading">
			<view class="wrapper">
				<view class="block" catch:tap="noop">
					<van-loading size="24px" color="#1989fa" vertical>加载中...</van-loading>
				</view>
			</view>
		</van-overlay>
	</view>
</template>

<script>
	export default {
		name: "m-loading",
		props: {

			showLoading: {
				type: [Boolean],
				default: false
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.block {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 120px;
		height: 120px;
		background-color: #fff;
	}
</style>