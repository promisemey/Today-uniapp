<template>
	<view class="collect">
		<van-tabs swipeable animated sticky custom-class="z-index:999">

			<van-tab title="无分类">
				<!-- <h1 v-for="i in 100" :key="i">内容 1</h1> -->
				<!-- 更多推荐 -->
				<view class="more-recommend">
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
					<!-- 加载更多 -->
					<uni-load-more :iconSize="16" style="font-size: 16rpx; !important" :status="status"
						:content-text="contentText" />
					<!-- 加载更多 -->
				</view>
				<!-- 更多推荐 -->
			</van-tab>
			<van-tab title="随机推荐">
				<!-- <h1 v-for="i in 100" :key="i">内容 3</h1> -->
				<view class="panel_state">
					<view class="panel">
						<view class="image-box">
							<image class="img" src="https://pic.3gbizhi.com/2020/0716/20200716110805564.jpg">
							</image>
						</view>
						<!-- 食谱信息 -->
						<view class="food-info">
							<view class="food-text">
								意大利肉酱面 | 秘制调料
							</view>
							<view class="food-other">
								<van-row gutter="10">
									<van-col><van-tag class="tag">15-30分钟</van-tag></van-col>
									<van-col><van-tag class="tag">零厨艺</van-tag></van-col>
								</van-row>
							</view>
						</view>
						<!-- 食谱信息 -->

						<van-button color="#000" size="small" class="btn"
							custom-style="width:260rpx;font-size:22rpx;margin-top:50rpx" round>就吃这个</van-button>
					</view>
				</view>
			</van-tab>

			<van-tab title="收藏夹">
				<!-- <h1 v-for="i in 100" :key="i">内容 2</h1> -->
			</van-tab>

			<van-tab title="标签 4">
				<h1 v-for="i in 100" :key="i">内容 4</h1>
			</van-tab>
		</van-tabs>
		<van-tabbar :active="active" @change="onChange" :placeholder="true">
			<van-tabbar-item icon="home-o">标签1</van-tabbar-item>
			<van-tabbar-item icon="search">标签2</van-tabbar-item>
			<van-tabbar-item icon="friends-o">标签3</van-tabbar-item>
			<van-tabbar-item icon="setting-o">标签4</van-tabbar-item>
		</van-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 2,
				// 推荐
				status: 'loading', // 加载
				num: 1,
				contentText: {
					contentrefresh: '正在加载',
					contentnomore: '没有更多数据了'
				},
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

			};
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
		onReachBottom() {
			console.log('上拉刷新');
			this.num++
			if (this.num >= 10) return this.status = 'no-more'
			const data = [{
				id: Math.random().toString(32).split('.')[1],
				foodsImg: 'https://img0.baidu.com/it/u=3875972442,3590056617&fm=253&fmt=auto&app=138&f=JPEG?w=781&h=500',
				text: '轻食减脂谷物饭',
				avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
				nickname: '不会做饭的西瓜'
			}, {
				id: Math.random().toString(32).split('.')[1],
				foodsImg: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u130.png',
				text: '轻食减脂谷物饭',
				avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
				nickname: '不会做饭的西瓜'
			}, {
				id: Math.random().toString(32).split('.')[1],
				foodsImg: 'https://img0.baidu.com/it/u=3875972442,3590056617&fm=253&fmt=auto&app=138&f=JPEG?w=781&h=500',
				text: '轻食减脂谷物饭',
				avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
				nickname: '不会做饭的西瓜'
			}, {
				id: Math.random().toString(32).split('.')[1],
				foodsImg: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u130.png',
				text: '轻食减脂谷物饭',
				avatar: 'https://cdn7.axureshop.com/demo/1934191/images/%E9%A6%96%E9%A1%B5/u136.png',
				nickname: '不会做饭的西瓜'
			}, ]
			this.MOREDATA = data
			this.setWaterFallLayout()
		},
		methods: {
			onChange(e) {
				this.active = e.detail
				const tabBar = ['/pages_index/index/index', '/pages_category/index/index', '/pages_collect/index/index']
				uni.redirectTo({
					url: tabBar[this.active]
				})
			},
			// 通过uni.getImageInfo
			async setWaterFallLayout() {
				for (let item of this.MOREDATA) {
					uni.getImageInfo({
						src: item.foodsImg,
						success: e => {
							console.log(this.leftHeight, this.rightHeight);
							if (this.leftHeight <= this.rightHeight) {
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
			// 。。。。
		}
	}
</script>

<style lang="scss">
	.collect {

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
			// margin-top: 30rpx;
			padding: 30rpx;
			box-sizing: border-box;
		}

		// 加载更多
		.uni-load-more {
			padding: 40rpx 0 80rpx;
		}

		// 随机推荐
		/deep/ .van-sticky,
		.van-tabbar {
			z-index: 999 !important;
		}

		.panel_state {
			position: relative;
			display: flex;
			width: 100%;
			height: 1000rpx;
			border-radius: 10rpx;
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
				border-radius: 10rpx;
				box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.6);
				background-color: #fff;
			}

			&::before {
				content: '';
				position: absolute;
				// z-index: -1;
				pointer-events: none;
				bottom: -40rpx;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 90%;
				height: 40rpx;
				background-color: inherit;
				border-radius: 10rpx;
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
					border-radius: 10rpx;
					width: 100%;
					height: 700rpx;
					box-sizing: border-box;
					border-bottom: 2rpx solid #eee;
					padding-bottom: 20rpx;

					.img {
						width: 100%;
						height: 100%;
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