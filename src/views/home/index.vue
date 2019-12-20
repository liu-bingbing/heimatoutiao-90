<template>
  <el-container>
    <el-aside style="height:100vh;background-color:#353b4e;width:230px;">
      <layout-aside></layout-aside>
    </el-aside>
    <el-cotainer>
      <el-header>
        头部内容
  </el-header>
  <el-main>
    主要区域
  </el-main>
    </el-cotainer>
  </el-container>

</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
