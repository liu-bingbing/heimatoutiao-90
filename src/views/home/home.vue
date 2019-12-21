<template>
  <el-carousel :interval="4000" type="card" height="400px" arrow="always">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="item" alt="" height="100%">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      list: ['http://img3.imgtn.bdimg.com/it/u=1267490802,3326052181&fm=26&gp=0.jpg', 'https://f10.baidu.com/it/u=2661567341,837532549&fm=72', 'http://img5.imgtn.bdimg.com/it/u=3220900070,4133744143&fm=26&gp=0.jpg', 'http://img2.imgtn.bdimg.com/it/u=1731597746,428499852&fm=26&gp=0.jpg', 'http://img4.imgtn.bdimg.com/it/u=1671223440,1615374730&fm=26&gp=0.jpg', 'http://img3.imgtn.bdimg.com/it/u=139670673,2550279246&fm=26&gp=0.jpg', 'http://img4.imgtn.bdimg.com/it/u=3890973385,1646925997&fm=26&gp=0.jpg', 'http://img3.imgtn.bdimg.com/it/u=139670673,2550279246&fm=26&gp=0.jpg']
    }
  }
}
</script>

<style>
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
