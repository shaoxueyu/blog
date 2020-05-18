<template>
  <div id="Message-page">
    <!-- 遮罩层 -->
    <div class="message-cover">
    </div>
    <div class="message-content">
      <el-card>
        <article>
          <h3>留言板</h3>
          <h4>留不住你的人，但要留住你的心 <strong>❤</strong></h4>
        </article>
        <textarea
          id="demo"
          style="display: none;"
        ></textarea>

      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  mounted() {
    layui.use('layedit', function () {
      console.log(1);
      let layedit = layui.layedit;
      layedit.build('demo'); //建立编辑器
    });
  }
}
</script>

<style lang="less" scoped>
#Message-page {
  padding-top: 60px;
}
.message-cover {
  z-index: -1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(../../assets/images/message-bg.jpg);
  background-size: cover;
  filter: blur(2px);
}
.el-card {
  margin-top: 45px;
  h3 {
    text-align: center;
    font-size: 25px;
    line-height: 100px;
  }
  h4 {
    position: relative;
    text-align: center;
    font-size: 18px;
    line-height: 20px;
    transition: 0.7s;
    strong {
      color: #ff0036;
      transition: 0.7s;
    }
    &:hover {
      color: transparent;
    }
    &:hover strong {
      color: transparent;
    }
    &:hover::after {
      color: black;
    }
    &::after {
      content: "Can't keep your people, but keep your heart";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      transition: 0.7s;
      color: transparent;
      font-family: smallkerBoom;
      font-size: 35px;
    }
  }
}
.message-content {
  width: 1280px;
  margin: 0 auto;
}
</style>