<template>

	<!-- 头部搜索 -->
	<view class="search">
		<van-nav-bar title="菜谱搜索" title-class="navbar" :fixed="true" :placeholder="true" left-text="返回" left-arrow
			@click-left="onClickLeft" />
		<van-search v-model="value" show-action placeholder="搜索茶铺" @search="onSearch" @cancel="onCancel" />
		<view class="history">
			<view>历史搜索</view>
			<uni-icons class="bell" type="notification" size="18"></uni-icons>
		</view>
		<view class="content">
			<view>蛋糕</view>
			<view>冬瓜</view>
			<view>鱼</view>
		</view>
		<view class="history">
			<view>热门搜索</view>
		</view>
		<view class="content">
			<view>蛋糕</view>
			<view>冬瓜</view>
			<view>鱼</view>
			<view>蛋糕</view>
			<view>冬瓜</view>
			<view>鱼</view>
			<view>蛋糕</view>
			<view>冬瓜</view>
			<view>鱼</view>
		</view>
	</view>
	<!-- 头部搜索 -->

</template>

<script>
	export default {
		data() {
			return {
				value: '',
			};
		},
		methods: {
			onClickLeft() {
				console.log(123);
				uni.navigateBack({
					delta: 1
				})
			},
			onSearch(val) {
				console.log(val.detail);
				uni.navigateTo({
					url: '/pages_attention/searchList/searchList?sub_title=' + val.detail
				})
			},
			onCancel() {

			}
		},
	};
</script>

<style lang="scss">
	.search {
		padding: 0 10rpx;

		/deep/ .van-search__content {
			border-radius: 35rpx;
		}

		/deep/ .van-search__action-button {
			color: #ccc;
		}

		/deep/ .van-search__action--hover {
			background-color: #fff;
		}

		.history {
			padding: 0 18px;
			font-size: 25rpx;
			display: flex;
			justify-content: space-between;
		}

		.content {
			margin-top: 10rpx;
			display: flex;
			font-size: 25rpx;
			padding: 0 35rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
			flex-wrap: wrap;

			view {
				width: 80rpx;
				height: 40rpx;
				border-radius: 20rpx;
				margin-right: 20rpx;
				background-color: #f2f2f2;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 10rpx;
				margin-bottom: 15rpx;
			}
		}
	}
</style>