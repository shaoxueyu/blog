<template>
  <div id="about-page">
    <div class="text"></div>
    <img
      data-src="http://localhost:8000/images/default_surface.jpg"
      alt=""
      src=""
      ref="imgRef"
    >
  </div>
</template>

<script>
export default {
  mounted() {
    let img = new Image()
    img.src = "http://localhost:8000/images/default_surface.jpg"
    img.onload = () => {
      console.log("加载完成");
      this.$refs.imgRef.src = "http://localhost:8000/images/default_surface.jpg"
    }
  },
}
</script>

<style lang="less" scoped>
</style>