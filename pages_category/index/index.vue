<template>
	<view class="category-box">
		<van-nav-bar title="菜谱分类" class="nav-bar" title-class="navbar" :fixed="true" :placeholder="true" />

		<view class="categoty" :style="{height: contentHeight+'px'}">
			<!-- 分类菜单 -->
			<view class="menu">
				<scroll-view scroll-y="true" style="height:100%">
					<view v-for="item in categoryList" :key="item.categoryId"
						:class="{'scroll-view-item':true,active:item.categoryId===active}"
						@click.stop="selectItem(item.categoryId)">
						<view class="box">
							{{item.categoryName}}
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 分类菜单 -->

			<!-- 分类列表 -->
			<view class="goods">
				<scroll-view scroll-y="true" :scroll-into-view="currentItem" scroll-with-animation
					:style="{height:`${contentHeight}px`}" @scroll="handleRightAreaScroll">
					<view class="goods-list" v-for="item in categoryList" :key="item.categoryId"
						:id="'category-right-' + item.categoryId">
						<view class="title">
							{{ item.categoryName}}
						</view>
						<view class="goods-box">
							<view class="box" v-for="items in item.children" :key="items.dish_uuid" @click="jump(items.dish_uuid)">
								<view class="goods-img">
									<image :src="items.image_url" mode="aspectFill"></image>
								</view>
								<view class="goods-name">{{items.name}}</view>
							</view>
						</view>
					</view>
					<view :style="{height: block}"> </view>
				</scroll-view>
			</view>
			<!-- 分类列表 -->

		</view>
		<tabbar class="tabbarr" />
	</view>
</template>

<script>
	export default {
		methods: {
			jump(dish_uuid) {
				console.log(dish_uuid);
				uni.navigateTo({
					url: '/pages_attention/searchList/searchList?dish_uuid=' + dish_uuid
				})
			},
			selectItem(id) {
				this.flag = false
				this.currentItem = 'category-right-' + id
				this.active = id
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.flag = true
				}, 400)
			},
			handleRightAreaScroll(event) {
				const scrollTop = event.detail.scrollTop;
				// 根据滚动位置更新选中的分类 currentCategoryIndex
				const currentCategoryIndex = this.rightAreaTopList.find(item => {
					return scrollTop < item.top
				});

				// if (currentCategoryIndex === -1) {
				// 	currentCategoryIndex = this.rightAreaTopList.length - 1;
				// }

				if (currentCategoryIndex && this.flag) {
					console.log(this.flag);
					// this.currentItem = 'category-right-' + currentCategoryIndex.id
					this.active = currentCategoryIndex.id;
				}
			},
		},
		async created() {
			const {
				screenHeight
			} = uni.getSystemInfoSync()

			// ... 初始数据
			const res = await this.$api.getLinkCategory()
			this.categoryList = res.data

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

		mounted() {

			const query = uni.createSelectorQuery().in(this)
			// 计算右侧分类区域每个分类标题的距离顶部的位置
			this.categoryList.forEach(item => {
				query.select('#category-right-' + item.categoryId).boundingClientRect(
					rect => {
						this.rightAreaTopList[item.categoryId - 1] = {
							id: item.categoryId,
							top: rect.top
						}
						// this.rightAreaTopList = [...new Set(this.rightAreaTopList)]
					}).exec();
			});

			query.select('#category-right-' + this.categoryList.length).boundingClientRect(react => {
				this.block = this.contentHeight - react.height + 'px'
			})
		},
		data() {
			return {
				timer: null,
				flag: true,
				categoryList: [],
				rightAreaTopList: [], // 存储右侧分类区域每个分类标题的距离顶部的位置
				navBarHeight: 0, // navbar高度
				tabBarHeight: 0, // tabbar高度
				contentHeight: 0, // 剩余空间
				active: 1, // 一级选中
				block: 0, // 填补二级空白
				currentItem: '',
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: calc(100% - 100rpx);
		// display: flex;
		// height: 100%;
		// width: 100%;
	}

	.categoty {
		display: flex;
		height: calc(100% - 100rpx);
		// height: 100px;
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