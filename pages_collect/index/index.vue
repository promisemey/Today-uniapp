<template>
	<view class="collect" :style="[showProp?height:'']">
		<van-nav-bar title="收藏" class="nav-bar" title-class="navbar" :fixed="true" :placeholder="true" />

		<van-tabs :active="active" :style="{height: contentHeight+'px'}">
			<van-tab title="无分类">
				<!-- 更多推荐 -->
				<scroll-view scroll-y="true" :style="{height: contentHeight-40+'px'}">
					<view class="more-recommend" ref="cate">
						<view class="waterful">
							<!-- 左侧 -->
							<view class="list-left" ref="left">
								<view class="foods" v-for="item in left" :key="item.recipe_id">
									<view class="recomend-img" @click="onDetails
						(item.recipe_id)">

										<image :src="item.foods_img" mode="widthFix">
										</image>
									</view>
									<view class="recomend-text">{{item.sub_title}}</view>
									<view class="recomend-info">
										<view class="info-ava">
											<image :src="item.avatar"></image>
										</view>
										<view class="info-nickname">{{item.username}}</view>
									</view>
								</view>
							</view>
							<!-- 左侧 -->

							<!-- 右侧 -->
							<view class="list-right">
								<view class="foods" v-for="item in right" :key="item.recipe_id">
									<view class="recomend-img" @click="onDetails
						(item.recipe_id)">
										<image :src="item.foods_img" mode="widthFix">
										</image>
									</view>
									<view class="recomend-text">{{item.sub_title}}</view>
									<view class="recomend-info">
										<view class="info-ava">
											<image :src="item.avatar"></image>
										</view>
										<view class="info-nickname">{{item.username}}</view>
									</view>
								</view>
							</view>
							<!-- 右侧 -->
						</view>
						<!-- 加载更多 -->
						<uni-load-more :iconSize="16" style="font-size: 16rpx; !important" :status="status"
							:content-text="contentText" />
						<!-- 加载更多 -->
					</view>
				</scroll-view>
				<!-- 更多推荐 -->
			</van-tab>
			<van-tab title="随机推荐">
				<scroll-view scroll-y="true" :style="{height: contentHeight-40+'px'}">
					<swiper class="swiper" circular>
						<swiper-item v-for="item in rand" :key="item.recipe_id">
							<view class="panel_state">
								<view class="panel">
									<view class="image-box">
										<image class="img" :src="item.foods_img" mode="aspectFill">
										</image>
									</view>
									<!-- 食谱信息 -->
									<view class="food-info">
										<view class="food-text">
											{{item.sub_title}} | 秘制调料
										</view>
										<view class="food-other">
											<van-row gutter="10">
												<van-col><van-tag class="tag">{{item.need_time}}</van-tag></van-col>
												<van-col><van-tag
														class="tag">{{['零厨艺', '容易做', '有点挑战', '非常难'][item.difficulty]}}</van-tag></van-col>
											</van-row>
										</view>
									</view>
									<!-- 食谱信息 -->

									<van-button color="#000" size="small" class="btn"
										custom-style="width:260rpx;higth:100rpx;font-size:22rpx;margin-top:50rpx;padding:30rpx 0"
										@click="onDetails(item.recipe_id)" round>就吃这个</van-button>
								</view>
							</view>

						</swiper-item>
					</swiper>
				</scroll-view>

			</van-tab>
			<van-tab title="收藏夹">

			</van-tab>
		</van-tabs>
		<tabbar class="tabbarr" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex' //引入mapMutations
	export default {
		data() {
			return {
				navBarHeight: 0, // navbar高度
				tabBarHeight: 0, // tabbar高度
				contentHeight: 0, // 剩余空间
				active: 0,
				// 推荐
				// status: 'loading', // 加载
				status: 'no-more', // 加载
				num: 1,
				contentText: {
					contentrefresh: '正在加载',
					contentnomore: '没有更多数据了'
				},
				leftHeight: 0, //左边列高度
				rightHeight: 0, //右边列高度
				columnWidth: 0, //列宽度
				left: [],
				right: [],
				// MOREDATA: [],
				imgBaseUrl: '',
				rand: [],
				payload: {
					pagenum: 1,
					pagesize: 20
				},
				total: 0
			};
		},
		computed: {
			...mapState({
				showProp: state => state.show,
				height: state => state.windowHeight,
				pageScrollTop: state => state.scrollTop,
				favorite: state => state.favorite
			})
		},
		watch: {

			favorite: {
				handler(n, o) {

					this.setWaterFallLayout()
				},
				deep: true
			}
		},
		methods: {
			...mapMutations(['updateScrollTop']),
			...mapActions({
				GET_FAVORITES: 'GET_FAVORITES'
			}),
			async getRand() {
				const res = await this.$api.getRand()
				if (res.meta.state === 200) return this.rand = res.data
			},
			// async getAllFavorites() {
			// 	const res = await this.$api.getAllFavorites({
			// 		user_id: this.$store.state.userInfo.uuid
			// 	})
			// 	if (res.meta.state === 200) {
			// 		this.MOREDATA = res.data
			// 		this.total = res.data.total
			// 	} else {
			// 		this.MOREDATA = []
			// 	}
			// },
			// 详情
			onDetails(id) {
				console.log('=>>>>>>>>>', id);
				uni.navigateTo({
					url: `/pages_foods-detail/index/index?uid=${id}`
				})
			},
			change(e) {
				uni.pageScrollTo({
					scrollTop: 0, //距离页面顶部的距离
				});
			},
			// 通过uni.getImageInfo
			async setWaterFallLayout() {
				this.left = []
				this.right = []
				for (let item of this.favorite) {
					const {
						foods_img
					} = item
					console.log(foods_img);
					uni.getImageInfo({
						src: foods_img,
						success: e => {
							if (this.leftHeight <= this.rightHeight) {
								this.left.push(item)
								this.leftHeight += e.height / e.width * this.columnWidth
							} else {

								this.right.push(item)
								this.rightHeight += e.height / e.width * this.columnWidth
							}
						}
					})
				}
			},

		},
		async created() {
			const {
				screenHeight
			} = uni.getSystemInfoSync()
			// this.getAllFavorites()
			this.GET_FAVORITES()
			this.getRand()
			// 计算剩余空间
			uni.createSelectorQuery()
				.select('.nav-bar')
				.boundingClientRect((rect) => {
					if (rect) {
						console.log('nav', rect);
						this.navBarHeight = rect.height;
					}
				})
				.select('.tabbarr')
				.boundingClientRect((rect) => {
					if (rect) {
						console.log('tab', rect);
						this.tabBarHeight = rect.height;
						this.contentHeight = screenHeight - this.navBarHeight - this.tabBarHeight
						console.log(this.contentHeight, this.navBarHeight, this.tabBarHeight);
					}
				})
				.exec();
		},
		onLoad() {
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.list-left').boundingClientRect(res => {
					this.leftHeight = res.height
					this.columnWidth = res.width
					this.setWaterFallLayout()
				}).exec()
			})
		},
		async onReachBottom() {
			this.showLoading = true
			const totalPage = Math.ceil(this.total / this.payload.pagesize)
			if (this.payload.pagenum >= totalPage) return this.status = 'no-more';
			this.payload.pagenum++
			const {
				meta: {
					state
				},
				data: {
					list
				}
			} = await this.initFoods()

			if (state === 200) {
				this.setWaterFallLayout(list)
				this.showLoading = false
				if (this.payload.pagenum >= totalPage) return this.status = 'no-more';
			}
		},
		// ....
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.swiper {
		width: 100%;
		// padding-bottom: 20px;
		min-height: 1200rpx;
	}

	.collect {
		// height: inherit;
		overflow: hidden;
		height: 100vh;
		// background-color: pink;

		// 更多推荐
		.more-recommend {
			// background-color: pink;
			// padding-bottom: 200rpx;

			.waterful {
				display: flex;
				justify-content: space-between;
				margin: 30rpx;

				.judgeHeight {
					height: 0;
				}

				.list-left,
				.list-right {
					width: 50%;
					// height: 100rpx;
					border-radius: 20rpx;
					overflow: hidden;

					.foods:not(:last-of-type) {
						margin-bottom: 30rpx;
					}

					.recomend-img {
						border-radius: 20rpx !important;
						overflow: hidden;
						font-size: 0
					}

					.recomend-text {
						padding: 10rpx 0;
						font-size: 30rpx // margin-bottom: 20rpx;
					}

					.recomend-info {
						display: flex;
						align-items: center;
						color: #9c9eaf;
						font-size: 24rpx;

						.info-ava {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							margin-right: 10rpx;
							overflow: hidden;
						}
					}

				}

				// 左侧
				.list-left {
					margin-right: 20rpx;
				}
			}
		}

		/deep/ .van-tab__pane {
			min-height: 1000rpx;
			margin-bottom: 30rpx;
			box-sizing: border-box;
		}

		// 加载更多
		.uni-load-more {
			padding: 40rpx 0 80rpx;
		}

		// 随机推荐
		/deep/ .van-sticky,
		.van-tabbar {
			z-index: 00 !important;
		}

		.panel_state {
			position: relative;
			display: flex;
			margin: 30rpx 30rpx;
			height: 1020rpx;
			border-radius: 30rpx;
			box-sizing: border-box;
			box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.6);
			margin-bottom: 20rpx;

			&::after {
				content: '';
				z-index: 2;
				position: absolute;
				width: 100%;
				height: 100%;
				bottom: 0;
				left: 0;
				border-radius: 30rpx;
				box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.6);
				background-color: #fff;
			}

			&::before {
				content: '';
				position: absolute;
				pointer-events: none;
				bottom: -40rpx;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 90%;
				height: 40rpx;
				background-color: inherit;
				border-radius: 30rpx;
				box-shadow: 0 5px 20px rgba(0, 0, 0, .2);
			}

			.panel {
				position: absolute;
				z-index: 5;
				left: 0;
				top: 0;
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx 30rpx 0;
				// overflow: hidden;

				.image-box {
					border-radius: 20rpx;
					width: 100%;
					height: 700rpx;
					overflow: hidden;
					box-sizing: border-box;
					border-bottom: 2rpx solid #eee;
					padding-bottom: 20rpx;

					image {
						width: 100%;
						height: 100%;
						overflow: hidden;
						object-fit: cover;
						border-radius: 20rpx;
						font-size: 0
					}
				}

				.food-info {
					margin-top: 30rpx;
					font-size: 34rpx;
					line-height: 1.5;

				}

				.btn {
					display: flex;
					align-items: center;
				}
			}

		}
	}
</style>