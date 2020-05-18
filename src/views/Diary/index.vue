<template>
  <div id="daily-page">
    <div class="daily-cover"></div>
    <div class="daily-container">
      <Timeline></Timeline>
    </div>

  </div>
</template>

<script>
import Timeline from "@/components/Timeline"
export default {
  components: {
    Timeline
  },
  destroyed() {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="less" scoped>
#daily-page {
  position: relative;
  overflow: hidden;
  padding-top: 60px;
  animation: appear 0.7s;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .daily-cover {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-image: url("../../assets/images/bg-daily.jpg");
    background-size: cover;
    background-position: center center;
    filter: blur(5px);
  }
  .daily-container {
    z-index: 9;
    position: relative;
    width: 1280px;
    padding: 50px;
    margin: 0 auto;
  }
  @media screen and (max-width: 1380px) {
    .daily-container {
      width: 90%;
    }
  }
}
</style>