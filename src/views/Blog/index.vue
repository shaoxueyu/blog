<template>
  <!-- 博客内容 -->
  <div id="blog-page">
    <el-container class="blog-container">
      <el-container></el-container>
      <el-aside>
        <div class="aside-search">
          <!-- 搜索栏 -->
          <el-input placeholder="请输入内容"></el-input>
        </div>
        <div class="aside-hot">热门</div>
        <div class="aside-recommond">评论</div>
        <div class="aside-visitor">有谁看我</div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
export default {
  mounted() {
    document.title = "博客"
  },
  components: {
    Nav
  }
}
</script>

<style lang="less" scoped>
#blog-page {
  padding-top: 60px;
  .blog-container {
    padding: 10px 0;
    width: 1280px;
    box-sizing: border-box;
    padding: 35px 45px;
    background-color: pink;
    margin: 0 auto;
    .aside-search{
      width: 300px;
      height: 400px;
      background: green;

    }
  }
}
@media screen and (max-width: 1350px) {
  .blog-container {
    transition: .5s;
    width: 90% !important;
  }
}
</style>