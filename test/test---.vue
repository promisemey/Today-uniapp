<template>
	<view class="container">
		<view class="left-menu">
			<view v-for="(item, index) in categoryList" :key="index" @click="scrollToItem(index)">
				{{ item.name }}
			</view>
		</view>
		<view class="right-content">
			<scroll-view :scroll-into-view="currentItemId" scroll-y :scroll-top="scrollTop" class="scroll-view">
				<view v-for="(item, index) in itemList" :key="index" :id="'item-' + item.id">{{ item.name }}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: [{
						id: 1,
						name: '分类1'
					},
					{
						id: 2,
						name: '分类2'
					},
					{
						id: 3,
						name: '分类3'
					},
				],
				itemList: [{
						id: 1,
						name: '项目1'
					},
					{
						id: 2,
						name: '项目2'
					},
					{
						id: 3,
						name: '项目3'
					},
					{
						id: 4,
						name: '项目4'
					},
					{
						id: 5,
						name: '项目5'
					},
					{
						id: 6,
						name: '项目6'
					},
				],
				currentItemId: '',
				scrollTop: 0,
			};
		},
		methods: {
			scrollToItem(index) {
				const item = this.itemList[index];
				this.currentItemId = 'item-' + item.id;
				this.scrollTop = 0; // 可以根据实际需求自定义滚动位置
			},
		},
	};
</script>

<style lang="scss">
	.container {
		display: flex;
		margin-top: 100px;
	}

	.left-menu {
		width: 100px;
		height: 100px;
		overflow-y: scroll;
		background-color: pink;

		view {
			padding: 20px;
		}
	}

	.right-content {
		flex: 1;
		height: 100px;
		background-color: aqua;
		overflow-y: scroll;
	}

	.scroll-view {
		height: 100%;
	}
</style>