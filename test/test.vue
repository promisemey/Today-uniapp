<template>
	<view class="category-container">
		<!-- 左侧分类列表 -->
		<scroll-view class="category-left" scroll-y>
			<view v-for="item in categoryList" :key="item.id" :id="'category-' + item.id"
				:class="{ 'category-item':true,active: selectedCategoryId === item.id }" @click="handleCategoryClick(item.id)">
				{{ item.name }}
			</view>
		</scroll-view>

		<!-- 右侧分类区域 -->
		<scroll-view class="category-right" scroll-y scroll-with-animation :scroll-into-view="currentItemId"
			@scroll="handleRightAreaScroll">
			<view v-for="item in categoryList" :key="item.id" :id="'category-right-' + item.id">
				<view class="category-title">{{ item.name }}</view>
				<view class="subcategory-list">
					<view v-for="subitem in item.children" class="category-subitem" :key="subitem.id"
						:id="'subcategory-' + subitem.id" :class="{ active: selectedSubcategoryId === subitem.id }">
						{{ subitem.name }}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: [{
						id: 1,
						name: '分类1',
						children: [{
								id: 11,
								name: '子分类1-1'
							},
							{
								id: 12,
								name: '子分类1-2'
							},
							{
								id: 13,
								name: '子分类1-3'
							},
						]
					},
					{
						id: 2,
						name: '分类2',
						children: [{
								id: 21,
								name: '子分类2-1'
							},
							{
								id: 22,
								name: '子分类2-2'
							},
							{
								id: 23,
								name: '子分类2-3'
							},
						]
					},
					{
						id: 3,
						name: '分类3',
						children: [{
								id: 31,
								name: '子分类3-1'
							},
							{
								id: 32,
								name: '子分类3-2'
							},
							{
								id: 33,
								name: '子分类3-3'
							},
						]
					}
				],
				currentItemId: '',
				selectedCategoryId: 1, // 默认选中第一个分类
				selectedSubcategoryId: null, // 默认未选中任何子分类
				rightAreaTopList: [], // 存储右侧分类区域每个分类标题的距离顶部的位置
			}
		},
		computed: {
			selectedCategory() {
				// 根据选中的分类ID返回对应的分类对象
				return this.categoryList.find(item => item.id === this.selectedCategoryId) || this.categoryList[0];
			}
		},
		mounted() {
			// 计算右侧分类区域每个分类标题的距离顶部的位置

			this.categoryList.map(item => {
				return uni.createSelectorQuery().in(this).select('#category-right-' + item.id).boundingClientRect(
					rect => {
						this.rightAreaTopList.push(rect.top)
						// return;
					}).exec();
			});

			this.rightAreaTopList = [...new Set(this.rightAreaTopList)]
			console.log('sdfsdf', [...new Set(this.rightAreaTopList)]);
		},
		methods: {
			handleCategoryClick(categoryId) {
				// 更新选中的分类ID
				this.selectedCategoryId = categoryId;
				this.selectedSubcategoryId = null; // 重置选中的子分类ID
				this.currentItemId = 'category-right-' + categoryId

			},
			handleSubcategoryClick(subcategoryId) {
				this.selectedSubcategoryId = subcategoryId;

				// 滚动右侧分类区域到选中的子分类位置
				uni.createSelectorQuery().in(this).select('#subcategory-' + subcategoryId).boundingClientRect(rect => {
					uni.pageScrollTo({
						scrollTop: rect.top
					});
				}).exec();
			},
			handleRightAreaScroll(event) {
				const scrollTop = event.detail.scrollTop;

				// 根据滚动位置更新选中的分类
				let currentCategoryIndex = this.rightAreaTopList.findIndex(top => scrollTop < top);
				if (currentCategoryIndex === -1) {
					currentCategoryIndex = this.rightAreaTopList.length - 1;
				}
				this.selectedCategoryId = this.categoryList[currentCategoryIndex].id;
			}
		}
	}
</script>


<style scoped>
	.category-container {
		margin-top: 100px;
		display: flex;
		flex-direction: row;
		/* height: 200px; */
	}

	.category-left {
		flex-basis: 200rpx;
		border-right: 1px solid #ddd;
		overflow-y: scroll;
	}

	.category-left .category-item {
		padding: 10px;
		cursor: pointer;
	}

	.category-left .category-item.active {
		background-color: #f7f7f7;
	}

	.category-right {
		flex: 1;
		padding: 10px;
		overflow-y: scroll;
	}

	.category-right .category-title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.category-right .category-subtitle {
		font-size: 16px;
		font-weight: bold;
		margin-top: 20px;
		margin-bottom: 10px;
	}

	.category-right .category-subitem {
		margin-bottom: 10px;
		cursor: pointer;
	}

	.category-right .category-subitem.active {
		color: #f00;
	}
</style>