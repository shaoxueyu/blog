<template>
  <div id="app-pages">
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
      isUpup: false,
    }
  },
  mounted() {
    setTimeout(() => {
      window.scroll(0, 0)
    })
    document.title = "个人博客"
    document.addEventListener("scroll", () => {

      let scrollTop = document.documentElement.scrollTop
      if (scrollTop > 400) {
        this.isUpup = true
      } else {
        this.isUpup = false
      }
    })
  },
  methods: {
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
  min-height: 100%;
  font-family: sunshineKing, sans-serif;
}
</style>