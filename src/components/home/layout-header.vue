<template>
    <el-row class="layout-header" type="flex" align="middle">
        <el-col :span="12" class="left">
            <i @click="collapseOrOpen" :class="{'el-icon-s-unfold':collapse,'el-icon-s-fold':!collapse}"></i>
            <span>江苏传智播客教育科技有限公司</span>
        </el-col>
        <el-col :span="12" class="right">
            <el-row type='flex' justify="end">
                <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="">
                <el-dropdown @command="clickMenu">
                    <span>{{userInfo.name}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="info">个人信息</el-dropdown-item>
                        <el-dropdown-item command="git">git地址</el-dropdown-item>
                        <el-dropdown-item command="lgout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import eventBus from '../../utills/eventBus'
export default {
  data () {
    return {
      collapse: false, // 默认展开
      userInfo: {}, // 定义一个用户对象
      defaultImg: require('../../assets/img/toutiao.png')
    }
  },
  created () {
    // let token = localStorage.getItem('user-token')// 获取用户令牌-----注释掉，手动获取就不要了
    this.getUserInfo()
    // 开启监听
    eventBus.$on('updateUserInfo', () => {
      // 认为别人更新了数据，自己也应该更新数据
      this.getUserInfo()
    })
  },
  methods: {
    // 折叠或者展开：
    collapseOrOpen () {
      this.collapse = !this.collapse// 不是展开就是折叠
      eventBus.$emit('changeCollapse')// 触发一个事件
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.userInfo = result.data
      })
    },
    // 点击菜单项时触发
    clickMenu (command) {
      if (command === 'info') {
        this.$router.push('/home/account')// 回到账户信息
      } else if (command === 'git') {
        window.location.href = 'https://github.com/liu-bingbing/heimatoutiao-90/commits/master'
      } else {
        // 退出;
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')// 回到登录页
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .layout-header {
        height: 60px;
        .left {
            font-size: 20px;
            span {
                color: #2c3e50;
                font-size: 16px;
                margin-left: 4px;
            }
        }
        .right {
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 5px;
            }
        }
    }
</style>
