<template>
  <div id="link-page">
    <div class="link-cover"></div>
    <LinkCanvas />
    <div class="link-content">
      <article class="link-title">
        <h3>友情链接</h3>
        <section>青海长云暗雪山，孤城遥望玉门关。</section>
      </article>
      <div class="card-all clearfix">
        <el-card class="left" v-for="item in 15" :key="item">
          <article>
            <!-- 作者名字 -->
            <h3 class="clearfix">
              <div class="left author-logo">
                <img
                  :src="jpg"
                  alt="author-logo"
                >
              </div>
              <h5 class="left">枯木风华</h5>
            </h3>
            <section>青海长云暗雪山，孤城遥望玉门关 青海长云暗雪山，孤城遥望玉门关。青海长云暗雪山，孤城遥望玉门关。青海长云暗雪山，孤城遥望玉门关。青海长云暗雪山，孤城遥望玉门关。</section>
          </article>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import png from "../../assets/images/bg-daily.jpg"
import LinkCanvas from "@/components/LinkCanvas.vue"
export default {
  components: {
    LinkCanvas
  },
  data() {
    return {
      jpg: png
    }
  },
  destroyed() {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="less" scoped>
#link-page {
  padding-top: 60px;
  animation: appear 0.7s;
  .card-all{
    padding: 150px 10px;
  }
  .link-content {
    width: 1280px;
    margin: 50px auto;
    .link-title {
      overflow: hidden;
      text-align: center;
      h3 {
        overflow: hidden;
        position: relative;
        display: inline-block;
        color: transparent;
        background-image: url("../../assets/images/bg-link.jpg");
        background-size: cover;
        background-clip: text;
        -webkit-background-clip: text;
        line-height: 75px;
        font-size: 50px;
        text-align: center;
        &:hover::after {
          transition: left 0.4s ease-in-out;
          left: 160%;
        }
        &::after {
          content: "";
          height: 100%;
          width: 100px;
          left: -100%;
          position: absolute;
          background-image: linear-gradient(
            90deg,
            hsla(0, 0%, 100%, 0),
            hsla(0, 0%, 100%, 0.3) 50%,
            hsla(0, 0%, 100%, 0)
          );
          transform: skewX(-75deg) translateZ(0);
          z-index: 10;
        }
      }
      > section {
        width: 430px;
        margin: 0 auto;
        position: relative;
        font-size: 25px;
        line-height: 50px;
        text-align: center;
        color: #3f2400;
        transition: 0.7s;
        &:hover {
          transform: scale(1.8);
        }
      }
    }
    /deep/.el-card {
      position: relative;
      box-sizing: border-box;
      width: 25%;
      padding: 0 10px;
      background: none;
      border: none;
      margin-top: 15px;
      box-shadow: none;
      transition: .2s;
      &:hover{
        transform: translateY(-7px) scale(1.2);
      }
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        /*  background-image: linear-gradient(45deg, #a69c93, #4b4636); */
        background-image: url("../../assets/images/link-article.png");
        background-size: cover;
        background-clip: padding-box;
        opacity: 0.3;
      }
      .el-card__body {
        height: 100%;
        > article {
          padding: 10px;
          box-sizing: border-box;
          position: relative;
          height: 100%;
          color: aliceblue;
          > section {
            overflow: hidden;
            height: 100px;
            box-sizing: border-box;
            padding-top: 5px;
            line-height: 30px;
          }
          .author-logo {
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }
          h5 {
            padding-left: 10px;
            line-height: 40px;
          }
        }
      }
    }
    @media screen and (max-width: 900px) {
      .el-card {
        width: 50%;
      }
    }
    @media screen and (max-width: 560px) {
      .el-card {
        width: 95%;
      }
    }
  }
  @media screen and (max-width: 1315px) {
    .link-content {
      width: 90%;
    }
  }
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .link-cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url("../../assets/images/bg-link.jpg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
}
</style>