<template>
<el-card class="articles">
    <bread-crumb slot="header">
    <template slot="title">文章列表</template>
    </bread-crumb>
    <el-form style="padding-left:50px">
        <el-form-item label="文章状态：">
            <!-- 先放置一个单选组 -->
            <el-radio-group v-model="searchForm.status">
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
            <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                <!-- el-option label 是显示值 value 是存储值 -->
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
            <!-- 日期选择器 日期范围-->
            <el-date-picker type="daterange" v-model="searchForm.dateRange"></el-date-picker>
        </el-form-item>
    </el-form>
    <el-row class="total" type="flex" align="middle">
        <span>
            共找到1000条符合条件的内容
        </span>
    </el-row>
    <div class="article-item" v-for="item in 100" :key="item">
        <div class="left">
            <img src="../../assets/img/small4bdc830b48d6ad8f6b6e7fa17fe23bed1567644476.jpg" alt="">
            <div class="info">
                <span>哈哈</span>
                <el-tag class="tag">标签一</el-tag>
                <span class="date">2019-12-25</span>
            </div>
        </div>
        <div class="right">
            <span><i class="el-icon-edit">修改</i></span>
            <span><i class="el-icon-delete">删除</i></span>
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
      value: ''
    }
  },
  methods: {
    // 获取所有的频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()// 获取文章数据
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
