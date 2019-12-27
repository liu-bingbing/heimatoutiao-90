<template>
<el-card>
    <bread-crumb slot="header">
    <template slot="title">
        发布文章
    </template>
    </bread-crumb>
    <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
        <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <quill-editor v-model="formData.content" style="height:300px"></quill-editor>
        </el-form-item>
        <el-form-item label="封面" prop="cover" style="margin-top:120px">
            <el-radio-group v-model="formData.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            {{formData.cover}}
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
            <el-select v-model="formData.channel_id">
                <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="publishArticle()" type="primary">发布</el-button>
            <el-button @click="publishArticle(true)">存入草稿</el-button>
        </el-form-item>
    </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接受频道数据
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null// 频道
      },
      publishRules: {
        // 校验规则title,content,channel_id 必填项
        title: [{ required: true, message: '文章标题不能为空' },
          { min: 5,
            max: 30,
            message: '标题的长度应该是5到30之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  //   beforeRouteUpdate (to, from, next) {
  //     console.log(to)
  //     next()
  //   },
  watch: {
    // 处理两个地址对应同一个组件跳转的时候，组件不销毁，但是数据没有重置的问题
    $route: function (to, from) {
      if (to.params.articleId) {
        // 是修改
      } else {
        // 是发布
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null// 频道
        }
      }
    },
    'formData.cover.type': function () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []// 无图或者自动
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']// 单图
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']// 3图
      }
    }
  },
  methods: {
    // 获取所有的频道：
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          let { articleId } = this.$route.params// 获取动态路由参数
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft }, // 查询参数
            data: this.formData// 请求体参数
          }).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 跳转到文章列表页
            this.$router.push('/home/articles')
          })
          // if (articleId) {
          //   // 修改文章接口
          //   this.$axios({
          //     url: `/articles/${articleId}`,
          //     params: { draft },
          //     data: this.formData// 请求体参数
          //   }).then(result => {
          //     this.$message({
          //       type: 'success',
          //       message: '保存成功'
          //     })
          //   })
          // } else {
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft }, // 查询参数
          //     data: this.formData // 请求体参数
          //   }).then(() => {
          //     this.$message({
          //       type: 'success',
          //       message: '保存成功'
          //     })
          //     // 跳转到文章列表页
          //     this.$router.push('/home/articles')
          //   })
          // }
        }
      })
    }
  },
  // 通过id查询文章数据
  getArticleById (articleId) {
    this.$axios({
      url: `/articles/${articleId}`
    }).then(result => {
      this.formData = result.data// 将数据赋值给data
    })
  },
  created () {
    this.getChannels()
    let{ articleId } = this.$route.params
    articleId && this.getArticleById(articleId)// 如果文章存在，直接查询文章的数据
  }
}
</script>

<style>

</style>
