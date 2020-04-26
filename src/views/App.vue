<template>
  <div id="app-pages">
    <!-- 导航栏 -->
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
export default {
  mounted(){
    document.title = "个人博客"
  },
  components:{
    Nav
  }
}
</script>

<style lang="less" scoped>
  #app-pages{
    width: 100%;
    background-image: url(../assets/images/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
  }
</style>