<template>
	<view class="categoty">
		<!-- 分类菜单 -->
		<view class="menu">
			<scroll-view scroll-y="true" :style="{height:`${windowHeight}px`}">
				<view v-for="item in 20" :key="item" :class="{'scroll-view-item':true,active:item===active}"
					@click="active = item">
					<view class="box">
						为你推荐
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 分类菜单 -->

		<!-- 分类列表 -->
		<view class="goods">
			<scroll-view scroll-y="true" :style="{height:`${windowHeight}px`}">
				<view class="goods-list" v-for="i in 5" :key="i">
					<view class="title">
						Vuex测试数据: {{i}}
					</view>
					<view class="goods-box">
						<view class="box" v-for="item in Math.ceil(Math.random()*10+1)" :key="item" @click="jump">
							<view class="goods-img">
								<image src="" mode=""></image>
							</view>
							<view class="goods-name">苹果</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 分类列表 -->

	</view>
</template>

<script>
	export default {
		methods: {
			jump() {
				uni.navigateTo({
					url: '/pages_goodsdetail/index/index'
				})
			}
		},
		onLoad() {
			const {
				windowHeight
			} = uni.getSystemInfoSync()
			this.windowHeight = windowHeight
		},
		data() {
			return {
				active: 1,
				windowHeight: 0, // 初始页面高度
			}
		}
	}
</script>

<style lang="scss" scoped>
	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
	scroll-view ::-webkit-scrollbar {
		width: 0 !important;
		background-color: #f6f6f6;
	}

	// /*定义滚动条轨道 内阴影+圆角*/
	// scroll-view ::-webkit-scrollbar-track {
	// 	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	// 	border-radius: 6rpx;
	// 	background-color: #fff;
	// }

	// /*定义滑块 内阴影+圆角*/
	// scroll-view ::-webkit-scrollbar-thumb {
	// 	border-radius: 6rpx;
	// 	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
	// 	background-color: rgb(255, 245, 235);
	// }

	.categoty {
		display: flex;
		height: 100%;
		width: 100%;
		overflow: hidden;

		.menu {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 191rpx;
			background-color: #f2f2f2;
			font-size: 28rpx;
			color: #666;

			.scroll-view-item {
				padding: 20rpx;
				width: 139rpx;
				height: 50rpx;
				line-height: 55rpx;
				text-align: center;

				.box {
					width: 139rpx;
					height: 50rpx;
				}
			}

			.active {
				position: relative;
				width: 100%;
				background-color: #fff;
				color: #666ee8;

				&::before {
					content: '';
					top: 0;
					left: 0;
					height: 100%;
					position: absolute;
					border-left: 8rpx solid #666ee8;
				}
			}

		}

		.goods {
			flex: 1;

			.goods-list {

				.title {
					font-size: 28rpx;
					color: #333;
					margin: 35rpx 0 22rpx 41rpx;
				}

				.goods-box {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					border-bottom: 1rpx solid #eee;
					padding-bottom: 10rpx;
					margin: 0 29rpx;

					// 处理 justify-content: space-between; 最后一排问题
					&::after {
						content: "";
						width: 136rpx;
					}

					.box {
						// margin: 0 20rpx;
						width: 136rpx;
						height: 200rpx;
						background-color: #fff;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						font-size: 24rpx;
						color: #999;
						margin-bottom: 41rpx;

						.goods-img {
							width: 136rpx;
							height: 136rpx;
							display: flex;
							background-color: hotpink;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}

				}
			}

		}
	}
</style>