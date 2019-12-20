<template>
  <el-container>
    <el-aside style="height:100vh;background-color:#353b4e;width:230px;">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
  <el-main>
    主要区域
  </el-main>
    </el-container>
  </el-container>

</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'

export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>

</style>
