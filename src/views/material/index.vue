<template>
<el-card>
    <bread-crumb slot="header">
    <template slot="title">
        素材管理
    </template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="全部图片" name="all">
            <!-- 生成页面结构 -->
            <div class="img-list">
                <el-card class="img-card" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                    <div>
                        <el-row class="operate" type="flex" justify="space-around" align="middle">
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-delete"></i>
                        </el-row>
                    </div>
                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="收藏图片" name="collect">
             <div class="img-list">
                <el-card class="img-card" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center">
                   <el-pagination
                   :current-page="page.currentPage"
                   :page-size="page.pageSize"
                   :total="page.total"
                   @current-change="changePage"
                     background
                     layout="prev, pager, next">
                   </el-pagination>
                </el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认当前选中的标签
      list: [], // 接受素材数据
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    // 改变页码的方法：
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    changeTab () {
      this.page.currentPage = 1// 重置为第一页
      this.getMaterial()// 调用获取数据方法
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect'// 传false是获取所有图片，传true是获取收藏图片数据
        }
      }).then(result => {
        this.list = result.data.results// 获取所有图片数据
        this.page.total = result.data.total_count// 总条数
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list {
    display: flex;
    flex-wrap: wrap;
    .img-card {
        width: 200px;
        height: 220px;
        margin: 20px 50px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
        }
        .operate {
            width: 100%;
            position: absolute;
            left:0;
            bottom: 0;
            font-size: 20px;
            height: 36px;
            background-color: #f4f5f6;
        }
    }
}

</style>
