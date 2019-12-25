<template>
<el-card class="articles">
    <bread-crumb slot="header">
    <template slot="title">文章列表</template>
    </bread-crumb>
    <el-form style="padding-left:50px">
        <el-form-item label="文章状态：">
            <!-- 先放置一个单选组 -->
            <el-radio-group v-model="searchForm.status" @change="changeCondition">
                <el-radio :label="5">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
            <!-- {{searchForm}} -->
        </el-form-item>
        <el-form-item label="频道列表：">
            <!-- {{channels}} -->
            <el-select @change="changeCondition" placeholder="请选择频道" v-model="searchForm.channel_id">
                <!-- el-option label 是显示值 value 是存储值 -->
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
            <!-- 日期选择器 日期范围-->
            <el-date-picker @change="changeCondition" value-format="yyyy-MM-dd" type="daterange" v-model="searchForm.dateRange"></el-date-picker>
        </el-form-item>
    </el-form>
    <el-row class="total" type="flex" align="middle">
        <span>
            共找到10000条符合条件的内容
        </span>
    </el-row>
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
        <div class="left">
            <img :src="item.cover.images.length ? item.cover.images[0]:defaultImg" alt="">
            <div class="info">
                <span>{{item.title}}</span>
                <el-tag :type="item.status | filterType" class="tag">{{item.status | filterStatus}}</el-tag>
                <span class="date">{{item.pubdate}}</span>
            </div>
        </div>
        <div class="right">
            <span><i class="el-icon-edit">修改</i></span>
            <span @click="delMaterial(item.id)"><i class="el-icon-delete">删除</i></span>
        </div>
    </div>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认选中全部
        channel_id: null, // 默认不选中任何一个分类
        dateRange: []// 日期范围
      },
      channels: [], // 获取频道数据
      list: [],
      defaultImg: require('../../assets/img/avatar.jpg')// 默认图片
    }
  },
  filters: {
    // 过滤器
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'

        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 删除文章
    delMaterial (id) {
      this.$confirm('是否要删除文章').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(result => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新拉取数据
          this.getConditionArticle()
        })
      })
    },
    changeCondition () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 因为5是前端自己定义的标识，表示查全部，全部应该什么都不传，直接给null
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null, // 开始时间
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null// 结束时间
      }
      this.getArticles(params)
    },
    // 获取所有的频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results// 获取文章列表数据
      })
    }
  },
  created () {
    this.getChannels()// 获取文章数据
    this.getArticles()// 获取文章列表数据
  }
}
</script>

<style lang="less" scoped>
.articles {
    .total {
        height: 60px;
        border-bottom:1px dashed #ccc;
    }
    .article-item {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #f2f3f5;
        .left {
            display: flex;
            img {
                width: 180px;
                height: 100px;
                border-radius: 4px;
            }
            .info {
                display: flex;
                flex-direction: column;
                height: 100px;
                margin-left: 10px;
                justify-content: space-between;
                .date {
                    color: #999;
                    font-size: 12px;
                }
                .tag {
                    text-align: center;
                    width: 60px;
                }
            }
        }
        .right {
            span {
                font-size: 14px;
                margin-left: 8px;
                cursor: pointer;
            }
        }
    }
}

</style>
