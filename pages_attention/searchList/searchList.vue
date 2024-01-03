<template>
	<div class="searchList">
		<navbar title="菜谱搜索" />
		<!-- 头部搜索 -->
		<view class="search">
			<van-search use-right-icon-slot shape="round" @search="handelSearch" placeholder="请输入搜索关键词" v-model="search">
			</van-search>
		</view>
		<!-- 头部搜索 -->
		<!-- 列表 -->
		<view v-if="foods.length" class="foods-list">
			<view class="foods" v-for="item in foods" :key="item.recipe_id">
				<view class="img" @click="getDetails(item.recipe_id)">
					<image :src="item.foods_img" mode="aspectFill"></image>
				</view>
				<!-- 标题 -->
				<view class="title">{{item.sub_title}}</view>
				<!-- 标题 -->
				<!-- 作者信息 -->
				<view class="authorinfo">
					<view class="avatar">
						<image :src="item.avatar" mode="aspectFill"></image>
					</view>
					<view class="author-name">
						{{item.username}}
					</view>
				</view>
				<!-- 作者信息 -->
			</view>
		</view>
		<!-- 列表 -->
		<van-empty v-else description="没有数据" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				foods: [],
				search: ''
			}
		},
		onLoad(params) {
			const {
				sub_title,
				dish_uuid
			} = params
			console.log(sub_title, dish_uuid);
			if (sub_title) return this.onSearch(sub_title)
			if (dish_uuid) return this.getSub(dish_uuid)

		},
		methods: {
			getDetails(id) {
				uni.navigateTo({
					url: `/pages_foods-detail/index/index?uid=${id}`
				})
			},
			handelSearch(val) {
				this.onSearch(val.detail)
				this.search = ''
			},
			async onSearch(sub_title) {
				this.search = ''
				const res = await this.$api.getRecipe({
					sub_title
				})
				console.log('=>>', res);
				this.foods = res.data || []
			},
			async getSub(dash_uuid) {
				const res = await this.$api.getSubList({
					dash_uuid
				})
				console.log('=>>', res);
				this.foods = res.data || []
			}
		}
	}
</script>

<style scoped lang="scss">
	.searchList {

		.search {
			margin: 10rpx 0;
		}

		.foods-list {
			padding: 0 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.foods {
				flex-shrink: 0;
				width: 49%;
				height: 520rpx;
				margin-bottom: 20rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%
				}

				.img {
					border-radius: 20rpx;
					width: 100%;
					height: 400rpx;
					overflow: hidden;
					background-color: #fff;
				}

				.title {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					line-height: 2;
				}

				.authorinfo {
					width: 100%;
					display: flex;

					.avatar {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						overflow: hidden;
					}

					.author-name {
						flex: 1;
						line-height: 50rpx;
						width: 100%;
						padding: 0 10rpx;
						font-size: 26rpx;
						color: #ccc;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
			}
		}

	}
</style>