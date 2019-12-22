<template>
    <el-card>
        <bread-crumb slot="header">
        <!-- //插槽内容 -->
        <template slot="title">
            评论管理
        </template>
        </bread-crumb>
        <el-table :data='list'>
            <el-table-column label="标题" width="500" prop="title"></el-table-column>
            <el-table-column :formatter="formatterBoolean" label="评论状态" prop="comment_status"></el-table-column>
            <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
            <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="obj">
                    <el-button size="small" type="text">修改</el-button>
                    <el-button @click="openOrCloseState(obj.row)" size="small" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination background layout="prev, pager, next" :page-size="page.pageSize" :total="page.total" :current-page="currentPage" @current-change="changePage">
        </el-pagination>
        </el-row>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 定义一个数据接收返回结果；
      page: { // 用一个page对象专门存放分页信息;
        total: 0, // 默认先给0
        pageSize: 10,
        currentPage: 1// 默认打开第一页
      }
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage // 最新的页码
      this.getComment()
    },
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count// 总条数
      })
    },
    formatterBoolean (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭评论；
    openOrCloseState (row) {
      // 直接调用接口；
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否确定${mess}评论吗？`, '提示').then(() => {
        // 调用接口；
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }// 如果是打开，就关闭，如果是关闭，就要打开
        }).then(result => {
          // 表示执行成功;
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment()// 获取数据
  }
}
</script>

<style>

</style>
