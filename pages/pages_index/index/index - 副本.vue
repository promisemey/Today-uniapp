<template>
	<view class="container">
		<!-- 头部搜索 -->
		<view class="search">
			<uni-search-bar class="search-bar" radius="100" placeholder="搜索菜谱" clearButton="none" cancelButton="none"
				bgColor="#f2f2f2" bg-color="" m="search" />
			<uni-icons class="bell" type="notification" size="18"></uni-icons>
		</view>
		<!-- 头部搜索 -->

		<!-- 推荐 -->
		<z-swiper v-model="list" :options="options">
			<z-swiper-item :custom-style="{...slideCustomStyle}" v-for="(item,index) in list" :key="index">

				<view class="image-box">
					<!-- 标题 -->
					<view class="title">
						<view>减肥也要吃~</view>
						<view class="effect">低卡韩式拌饭</view>
					</view>
					<!-- 标题 -->

					<!-- 头像 -->
					<view class="avatar">
						<image src="../../static/uni.png" mode=""></image>
					</view>
					<!-- 头像 -->
					<image class="image" :src="item">
					</image>
				</view>

			</z-swiper-item>
		</z-swiper>
		<!-- 推荐 -->

		<!-- 热门菜谱 -->
		<view class="hot-foods">
			<view class="model-title">
				热门食谱
			</view>
			<view class="hot-boxs">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
					<template v-for="(item,i) in hotFoods">
						<view class="scroll-view-item_H" :key="i">
							<view class="foods-ava">
								<image :src="item.img" mode=""></image>
							</view>
							<text class="foods-text">{{item.text}}</text>
						</view>
					</template>
				</scroll-view>
			</view>
		</view>
		<!-- 热门菜谱 -->

		<!-- 更多推荐 -->
		<view class="more-recommend">
			<view class="model-title">
				更多推荐
			</view>
			<waterfall column-count="2" column-width="auto">
				<cell v-for="item in MOREDATA">
					<view :class="list-left">
						<view class="foods">
							<view class="recomend-img">
								<image :src="item.foodsImg" mode="widthFix">
								</image>
							</view>
							<view class="recomend-text">{{item.text}}</view>
							<view class="recomend-info">
								<view class="info-ava">
									<image :src="item.avatar"></image>
								</view>
								<view class="info-nickname">{{item.nickname}}</view>
							</view>
						</view>
					</view>
				</cell>
			</waterfall>
			<view class="waterful">
				<!-- 左侧 -->
				<view :class="{'list-left':true,judgeHeight:Boolean(!recommend.left.length)}" ref="left">
					<view class="foods" v-for="item in recommend.left" :key="item.id">
						<view class="recomend-img">
							<image :src="item.foodsImg" mode="widthFix">
							</image>
						</view>
						<view class="recomend-text">{{item.text}}</view>
						<view class="recomend-info">
							<view class="info-ava">
								<image :src="item.avatar"></image>
							</view>
							<view class="info-nickname">{{item.nickname}}</view>
						</view>
					</view>
				</view>
				<!-- 左侧 -->

				<!-- 右侧 -->
				<view class="list-right">
					<view class="foods" v-for="item in recommend.right" :key="item.id">
						<view class="recomend-img">
							<image :src="item.foodsImg" mode="widthFix">
							</image>
						</view>
						<view class="recomend-text">{{item.text}}</view>
						<view class="recomend-info">
							<view class="info-ava">
								<image :src="item.avatar"></image>
							</view>
							<view class="info-nickname">{{item.nickname}}</view>
						</view>
					</view>

				</view>
				<!-- 右侧 -->
			</view>
		</view>
		<!-- 更多推荐 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
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
				list: [
					'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe1.jpg',
					'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg',
					'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe3.jpg',
					'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe4.jpg',
					'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe5.jpg',
				],
				// 热门 
				hotFoods: [{
						img: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u176.png',
						text: '轻食谱'
					},
					{
						img: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u175.png',
						text: '生日聚会'
					},
					{
						img: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u173.png',
						text: '空气炸锅'
					}
				],

				// 推荐

				leftHeight: 0, //左边列高度
				rightHeight: 0, //右边列高度
				columnWidth: 0, //列宽度
				recommend: {
					left: [],
					right: []
				},
				MOREDATA: [{
						id: 1,
						foodsImg: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u130.png',
						text: '轻食减脂谷物饭',
						avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
						nickname: '不会做饭的西瓜'
					},
					{
						id: 2,
						foodsImg: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u130.png',
						text: '轻食减脂谷物饭',
						avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
						nickname: '不会做饭的西瓜'
					},
					{
						id: 3,
						foodsImg: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u130.png',
						text: '轻食减脂谷物饭',
						avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
						nickname: '不会做饭的西瓜'
					},
					{
						id: 4,
						foodsImg: 'https://img0.baidu.com/it/u=3875972442,3590056617&fm=253&fmt=auto&app=138&f=JPEG?w=781&h=500',
						text: '轻食减脂谷物饭',
						avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
						nickname: '不会做饭的西瓜'
					},
					{
						id: 5,
						foodsImg: 'https://img0.baidu.com/it/u=3875972442,3590056617&fm=253&fmt=auto&app=138&f=JPEG?w=781&h=500',
						text: '轻食减脂谷物饭',
						avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
						nickname: '不会做饭的西瓜'
					},
					{
						id: 6,
						foodsImg: 'https://img0.baidu.com/it/u=3875972442,3590056617&fm=253&fmt=auto&app=138&f=JPEG?w=781&h=500',
						text: '轻食减脂谷物饭',
						avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
						nickname: '不会做饭的西瓜'
					},
					{
						id: 7,
						foodsImg: 'https://img0.baidu.com/it/u=3875972442,3590056617&fm=253&fmt=auto&app=138&f=JPEG?w=781&h=500',
						text: '轻食减脂谷物饭',
						avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
						nickname: '不会做饭的西瓜'
					},
					{
						id: 8,
						foodsImg: 'https://img0.baidu.com/it/u=3875972442,3590056617&fm=253&fmt=auto&app=138&f=JPEG?w=781&h=500',
						text: '轻食减脂谷物饭',
						avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
						nickname: '不会做饭的西瓜'
					},
					{
						id: 9,
						foodsImg: 'https://img0.baidu.com/it/u=3875972442,3590056617&fm=253&fmt=auto&app=138&f=JPEG?w=781&h=500',
						text: '轻食减脂谷物饭',
						avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
						nickname: '不会做饭的西瓜'
					},
				]
			}
		},

		mounted() {
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.list-left').boundingClientRect(res => {
					this.leftHeight = res.height
					this.columnWidth = res.width
					console.log('left => ', this.leftHeight, this.columnWidth);
					this.setWaterFallLayout()
				}).exec()

			})
		},

		methods: {
			pullDown() {
				const data = {
					id: 1,
					foodsImg: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u130.png',
					text: '轻食减脂谷物饭',
					avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
					nickname: '不会做饭的西瓜'
				}
			},
			//方法2通过uni.getImageInfo
			async setWaterFallLayout() {
				for (let item of this.MOREDATA) {
					uni.getImageInfo({
						src: item.foodsImg,
						success: e => {
							console.log(this.leftHeight, this.rightHeight);
							if (this.leftHeight <= this.rightHeight) {
								console.log(e);
								this.recommend.left.push(item)
								this.leftHeight += e.height / e.width * this.columnWidth
							} else {
								this.recommend.right.push(item)
								this.rightHeight += e.height / e.width * this.columnWidth
							}

						}
					})
				}
			}

		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0;
		padding: 0 30rpx;

		.search {
			// width: 100%;
			background-color: #fff;
			display: flex;
			margin: 20rpx 0;

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

		.hot-boxs {
			padding-bottom: 20rpx;

			.scroll-view_H {

				/deep/ .uni-scroll-view-content {
					display: flex;
				}

				.scroll-view-item_H {
					display: flex;
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

		}

		// 更多推荐
		.more-recommend {
			// background-color: pink;

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
					border-radius: 20rpx 20rpx 0 0;

					.foods:not(:last-of-type) {
						margin-bottom: 30rpx;
					}

					.recomend-text {
						margin-bottom: 10rpx;
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
						}
					}

				}

				// 左侧
				.list-left {
					margin-right: 20rpx;
				}
			}
		}
	}
</style>