<template>
  <el-container>
    <el-aside :style="{width:collapse ? '60px':'230px'}" style="transition: all 0.5s; min-height:100vh;background-color:#353b4e;">
      <layout-aside :collapse="collapse"></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
  <el-main>
    <router-view></router-view>
  </el-main>
    </el-container>
  </el-container>

</template>

<script>
import eventBus from '../../utills/eventBus'
export default {
  data () {
    return {
      collapse: false// 默认是展开
    }
  },
  // 开启监听
  created () {
    eventBus.$on('changeCollapse', () => {
      // 头部组件告诉折叠相关的所有组件 要改变了
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>

</style>
