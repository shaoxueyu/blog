<template>
  <div id="daily-page">
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
  }
}
</script>

<style lang="less" scoped>
#daily-page {
  padding-top: 60px;
  .daily-container{
    width: 1280px;
    padding: 50px;
    margin: 0 auto;
  }
}
</style>