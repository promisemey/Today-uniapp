<template>
	<view class="getpraise">
		<template v-for="item in 5">
			<view class="getpraise-list">
				<!-- 头像 -->
				<view class="avatar">
					<image src="../../static/c1.png"></image>
				</view>
				<!-- 头像 -->

				<van-cell-group class="cell-info">
					<van-cell center title="西瓜" label="赞了你的作品 02-20">
						<view class="img" @click="handleGoDetail">
							<image class="food-img" src="../../static/c2.png"></image>
						</view>
					</van-cell>
				</van-cell-group>
			</view>
		</template>
		<view class="end">
			<view class="line"></view>
			<view>我是有底线的</view>
			<view class="line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			handleGoDetail() {
				uni.navigateTo({
					url: "/pages_detail/index/index"
				})
			}
		}

	}
</script>

<style lang="scss">
	.getpraise {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;

		.getpraise-list {
			display: flex;
			align-items: center;
			width: 100%;

			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: pink;
			}

			.cell-info {
				flex: 1;

				/deep/ .van-cell__value {
					display: flex;
					justify-content: flex-end;
				}

				.food-img {
					width: 70rpx;
					height: 70rpx;
					border-radius: 10rpx;
					background-color: pink;
				}
			}


		}

		// 底线
		.end {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			margin-top: 50rpx;
			color: #ccc;
			font-size: 24rpx;

			.line {
				width: 25%;
				height: 1rpx;
				background-color: #ccc;
			}
		}
	}
</style>