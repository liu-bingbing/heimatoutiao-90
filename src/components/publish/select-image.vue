<template>
<el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
        <!-- 外层容器 -->
        <div class="select-image-list">
            <!-- 循环生成多个el-card  -->
            <el-card v-for="item in list" :key="item.id" class="img-card">
                <img @click="clickImg(item.url)" :src="item.url" alt="">
            </el-card>
        </div>
        <!-- 放置一个分页组件 -->
        <el-row type="flex" justify="center">
        <el-pagination background layout="prev,pager,next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" @current-change="changePage"></el-pagination>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选中时素材库
      list: [], // 定义一个list数组，接收通过接口获取来的图片数据
      page: {
        currentPage: 1, // 默认请求页码
        pageSize: 8, // 每页展示的图片数量
        total: 0// 总页码
      }
    }
  },
  methods: {
    // 点击图片时触发
    clickImg (url) {
      // 点击图片是，要把图片传给显示的封面
      this.$emit('selectOneImg', url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImage()
    },
    // 获取所有素材
    getAllImage () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count// 获取总数
      })
    }
  },
  created () {
    this.getAllImage()
  }
}
</script>

<style lang="less" scoped>
.select-image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card {
        width: 150px;
        height: 150px;
        margin:20px 0;
        img {
            width: 100%;
            height: 100%;
        }
    }
}

</style>
