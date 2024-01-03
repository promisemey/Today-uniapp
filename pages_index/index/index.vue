<template>
	<!-- <view class="container" :style="[showProp?height:'']"> -->
	<!-- <view class="container"> -->
	<view class="container">
		<m-loading :showLoading="showLoading"></m-loading>
		<van-nav-bar title="今天吃什么" title-class="navbar" :fixed="true" :placeholder="true" />
		<!-- 头部搜索 -->
		<view class="search">
			<van-search custom-class="cusearch" disabled use-right-icon-slot shape="round" @click-input="onSearch"
				placeholder="请输入搜索关键词">
				<van-icon slot="right-icon" name="youzan-shield" />
			</van-search>
		</view>
		<!-- 头部搜索 -->


		<!-- 推荐 -->

		<swiper class="swiper" circular next-margin="50rpx">
			<swiper-item v-for="item in bannerList" :key="item.menu_id">
				<view class="image-box" @click="onDetails(item.menu_id)
">
					<!-- 标题 -->
					<view class="title">
						<view>{{item.title}}~</view>
						<view class="effect">{{item.subtitle}}</view>
					</view>
					<!-- 标题 -->

					<!-- 头像 -->
					<view class="avatar">
						<image v-if="item.avatar" :src="item.avatar" mode="aspectFill"></image>
					</view>
					<!-- 头像 -->
					<image class="image" :src="item.banner_img">
					</image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 推荐 -->

		<!-- 热门菜谱 -->
		<view class="hot-foods">
			<view class="model-title">
				所有作品
			</view>
			<!-- <view class="hot-boxs"> -->
			<scroll-view class="scroll-view_H" scroll-x="true">
				<template v-for="(item,i) in hotFoods">
					<view class="scroll-view-item_H" :key="i" @click="getAllWorks">
						<view class="foods-ava">
							<image :src="item.img" mode=""></image>
						</view>
						<text class="foods-text">{{item.text}}</text>
					</view>
				</template>
			</scroll-view>


		</view>
		<!-- 热门菜谱 -->

		<!-- 更多推荐 -->
		<view class="more-recommend">
			<view class="model-title">
				更多推荐
			</view>
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
			<uni-load-more :iconSize="16" style="font-size: 16rpx; !important" :status="status" :content-text="contentText" />
			<!-- 加载更多 -->
		</view>
		<!-- 更多推荐 -->
		<tabbar />

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex' //引入mapMutations

	export default {
		data() {
			return {
				showLoading: false,
				windowHeight: 0,
				status: 'loading', // 加载
				num: 1,
				contentText: {
					contentrefresh: '正在加载',
					contentnomore: '没有更多数据了'
				},
				slideCustomStyle: {
					display: 'flex',
					alignItems: 'center',
					borderRadius: '36rpx'
				},
				options: {
					effect: 'coverflow',
					loop: true,
					coverflowEffect: {
						rotate: 0,
						stretch: '7%',
						depth: 0,
					}
				},
				bannerList: [], // banner图
				// 热门 
				hotFoods: [{
						img: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u176.png',
						text: '作品分享'
					},
					// {
					// 	img: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u175.png',
					// 	text: '生日聚会'
					// },
					// {
					// 	img: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u173.png',
					// 	text: '空气炸锅'
					// }
				],

				// 推荐
				leftHeight: 0, //左边列高度
				rightHeight: 0, //右边列高度
				columnWidth: 0, //列宽度
				recommend: {},
				left: [],
				right: [],
				MOREDATA: [],
				imgBaseUrl: '',
				payload: {
					pagenum: 1,
					pagesize: 5
				},
				total: 0
			}
		},
		computed: {
			...mapState({
				showProp: state => state.show,
				height: state => state.windowHeight,
				pageScrollTop: state => state.scrollTop,
				token: state => state.token
			})
		},

		async onLoad() {
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
			const totalPage = Math.ceil(this.total / this.payload.pagesize)
			if (this.payload.pagenum >= totalPage) return this.status = 'no-more';
			this.showLoading = true
			this.payload.pagenum++
			const res = await this.initFoods()
			if (res.meta.state === 200) {
				this.setWaterFallLayout(res.data.list)
				this.showLoading = false
				if (this.payload.pagenum >= totalPage) return this.status = 'no-more';
			}
		},
		async created() {
			this.getBanner()
			const res = await this.initFoods()
			if (res.meta.state === 200) {
				this.total = res.data.total
				this.imgBaseUrl = res.data.imgBaseUrl
			}
		},
		methods: {

			getAllWorks() {
				uni.navigateTo({
					url: '/pages_attention/works/works?all=1'
				})
			},
			// banner初始化
			async getBanner() {
				const res = await this.$api.getBanner()
				if (res.meta.state === 200) this.bannerList = res.data
			},
			// 初始数据列表
			async initFoods() {
				const res = await this.$api.getFoodsList({
					...this.payload,
					token: this.token
				})
				if (res.meta.state === 200) {
					this.MOREDATA = [...this.MOREDATA, ...res.data.list]
				}
				return res
			},
			// 搜索
			onSearch() {
				uni.navigateTo({
					url: '/pages_recipesearch/index/index'
				})
			},
			// 详情
			onDetails(id) {
				uni.navigateTo({
					url: `/pages_foods-detail/index/index?uid=${id}`
				})
			},
			// 通过uni.getImageInfo
			async setWaterFallLayout(data) {
				// console.log(this.MOREDATA);
				for (let item of data ?? this.MOREDATA) {
					const {
						foods_img
					} = item
					console.log(this.imgBaseUrl + foods_img);
					uni.getImageInfo({
						src: foods_img,
						success: e => {

							if (this.leftHeight <= this.rightHeight) {

								this.left.push(item)
								this.leftHeight += e.height / e.width * this.columnWidth
							} else {
								// this.recommend.right.push(item)
								this.right.push(item)
								this.rightHeight += e.height / e.width * this.columnWidth
							}
						}
					})
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.swiper {
		height: 800rpx;
	}

	.container {
		// height: 100%;
		// width: 100%;
		padding: 0 30rpx;
		overflow: scroll;

		/deep/ .uni-load-more__text {
			font-size: 24rpx !important;
		}

		.search {
			width: 100%;
			background-color: #fff;
			display: flex;
			margin: 20rpx 0;

			/deep/ .van-search {
				width: 700rpx !important;
			}

			.search-bar {
				flex: 1;

				.uni-searchbar {
					padding: 0;

					.uni-searchbar__box {
						height: 66rpx;
					}
				}
			}

			.bell {
				display: flex;
				align-items: center;
				overflow: hidden;
				margin-left: 10rpx;
			}
		}

		// 推荐
		.image-box {
			position: relative;
			height: 800rpx;
			width: 610rpx;
			border-radius: 24rpx;
			overflow: hidden;

			.title,
			.avatar {
				position: absolute;
				left: 30rpx;
				z-index: 99;
			}

			.avatar {
				bottom: 30rpx;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				overflow: hidden;
			}

			.title {
				top: 30rpx;
				color: #fff;
				font-weight: 700;
				font-size: 46rpx;

				// 副
				.effect {
					line-height: 1.5;
					font-size: 56rpx;
				}
			}
		}

		// 热门食谱
		.model-title {
			padding: 30rpx 0 20rpx;
			font-size: 40rpx
		}

		// .hot-boxs {
		// padding-bottom: 20rpx;
		// height: 300rpx;
		// overflow-x: scroll;

		.scroll-view_H {
			white-space: nowrap;
			width: 100%;

			/deep/ .uni-scroll-view-content {
				display: flex;
			}

			.scroll-view-item_H {
				width: 100% !important;
				display: flex;
				display: inline-block;
				flex-direction: column;
				justify-content: space-between;
				flex-shrink: 0;
				width: 290rpx;
				height: 470rpx;
				border-radius: 20rpx 20rpx 0 0;

				.foods-ava {
					height: 400rpx;
					border-radius: 20rpx;
				}

				.foods-text {
					font-size: 34rpx;
					font-weight: 700;
				}
			}

			.scroll-view-item_H:not(:last-of-type) {
				margin-right: 20rpx;
			}

		}

		// 更多推荐
		.more-recommend {
			// background-color: pink;
			// padding-bottom: 200rpx;

			.waterful {
				display: flex;
				justify-content: space-between;

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
						padding: 20rpx 0;
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

		// 加载更多
		.uni-load-more {
			padding: 40rpx 0 80rpx;
		}
	}
</style>