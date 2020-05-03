<template>
  <div id="app-pages">
    <!-- 导航栏 -->
    <Nav :navColor="navColor"></Nav>
    <router-view @changeNavColor=changeNavColor></router-view>
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
      navColor: "rgba(255,255,255,1)"
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
    // 改变nav颜色 （子组件传值）
    changeNavColor(value) {
      this.navColor = value
    }
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
}
</style>