<template>
  <div id="about-page">
    <div class="about-cover"></div>
    <div class="about-content">
      <el-card class="animated slideInRight">
        <article class="article-item about-me">
          <h2>关于我</h2>
          <section>
            <p>前端路上的探索者，只要头发还有，身体还扛得住，会一直干下去，加油，奥里给！！</p>
            <p>通过以下方式可以联系到我：</p>
            <p><i class="el-icon-info"></i> 邮箱：654730917@qq.com</p>
            <p><i class="el-icon-info"></i> 微信：sxy654730917</p>
          </section>
        </article>
      </el-card>
      <el-card class="animated slideInRight">
        <article class="article-item about-web">
          <h2>关于本站</h2>
          <section>
            <p>本站仿自<a
                href="https://www.yanshisan.cn/"
                target="_blank"
              >燕十三大佬</a> 所有样式风格均手写，通过向他人借鉴来提升自己能力。估计完成在五月底</p>
            <p>本站结构：</p>
            <p>前端：<code>Vue + ElementUI</code></p>
            <p>后端：<code>nodejs + mongodb</code></p>
            <p>本站采用阿里云提供的服务器</p>
          </section>
        </article>
      </el-card>
      <el-card class="animated slideInRight">
        <article class="article-item about-tip">
          <h2>特别说明</h2>
          <section>
            <p>对于兼容ie.....go fuck</p>
            <p>本站文章仅代表个人观点，和任何组织或个人无关。</p>
          </section>
        </article>
      </el-card>

    </div>
  </div>
</template>

<script>
export default {
  mounted() {

  },
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 50px;
}
#about-page {
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
}
.el-card.slideInRight:nth-child(1){
  animation-delay: .1s;
}
.el-card.slideInRight:nth-child(2){
  animation-delay: .5s;
}
.el-card.slideInRight:nth-child(3){
  animation-delay: 1s;
}
.about-web {
  code {
    background-color: rgba(197, 202, 207, 0.05);
    color: #f60;
    padding: 7px;
  }
  p {
    a {
      font-weight: bold;
    }
  }
}
.about-cover {
  z-index: -1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(../../assets/images/about-bg.jpg);
  background-size: cover;
  filter: blur(2px);
}
.about-content {
  width: 1280px;
  margin: 50px auto 25px;
}
.article-item {
  h2 {
    position: relative;
    padding-left: 25px;
    font-size: 23px;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: #409eff;
      width: 7px;
    }
  }
  section {
    p {
      margin: 25px 0;
      text-indent: 1em;
      &:nth-child(2) {
        text-indent: 2em;
        font-size: 15px;
      }
      &:nth-child(3) {
        text-indent: 2em;
        font-size: 14px;
      }
      &:nth-child(4) {
        text-indent: 2em;
        font-size: 14px;
      }
    }
  }
}
</style>