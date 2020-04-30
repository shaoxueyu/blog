<template>
  <div id="app-pages">
    <div class="app-cover"></div>
    <!-- 导航栏 -->
    <Nav></Nav>
    <router-view></router-view>
    <!-- 回到顶部 -->
    <Upup v-if="isUpup" />
  </div>
</template>

<script>
import Nav from "@/components/Nav"
import Upup from "@/components/Upup"
export default {
  data() {
    return {
      isUpup: false
    }
  },
  mounted() {
    setTimeout(() => {
      window.scroll(0, 0)
    })

    document.title = "个人博客"
    document.addEventListener("scroll", () => {

      let scrollTop = document.documentElement.scrollTop
      console.log(scrollTop);
      if (scrollTop > 400) {
        this.isUpup = true
      } else {
        this.isUpup = false
      }
    })
  },
  components: {
    Nav,
    Upup
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