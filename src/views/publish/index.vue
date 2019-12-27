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
            <el-input v-model="formData.content" type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
            <el-radio-group v-model="formData.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
            <el-select v-model="formData.channel_id">
                <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="publishArticle" type="primary">发布</el-button>
            <el-button @click="publishArticle">存入草稿</el-button>
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
  methods: {
    // 获取所有的频道：
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    publishArticle () {
      this.$$refs.publishForm.validate(isOK => {
        if (isOK) {
          console.log('校验通过')
        }
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
