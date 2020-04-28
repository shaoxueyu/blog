<template>
  <div id="app-pages">
    <div class="app-cover"></div>
    <!-- 导航栏 -->
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
export default {
  mounted() {
    document.title = "个人博客"
  },
  components: {
    Nav
  }
}
</script>

<style lang="less" scoped>
#app-pages {
  position: relative;
  z-index: -99;
  width: 100%;
  .app-cover {
    background-image: url(../assets/images/bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    z-index: -98;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    filter: blur(5px);
  }
}
</style>