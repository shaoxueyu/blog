<template>
  <div id="home-page">
    <div
      id="pure-full-page"
      ref="fullPageRef"
      :style="{top: `calc(${wheel.wheelDelta}% + ${wheel.offset}px)`}"
    >
      <div
        :class="item.className"
        v-for="(item) in totalPage"
        :key="item.className"
      >
        <!-- page1 content -->
        <div
          v-if="item.className.indexOf('page1') !== -1"
          class="page1-content clearfix "
        >
          <div :class="['left','left-text','animated',{'ani-left-text':page === 1}]">
            <template v-for="(text,index) in item.content">
              <template v-if="index <= Math.floor(item.content.length/2)">
                <p :key="text">
                  {{text}}
                </p>
              </template>
            </template>
          </div>
          <div :class="['left','right-text',{'ani-right-text':page === 1}]">
            <template v-for="(text,index) in item.content">
              <template v-if="index > Math.floor(item.content.length/2)">
                <p :key="text">
                  {{text}}
                </p>
              </template>
            </template>
          </div>
        </div>
        <!-- page2 content -->
        <div
          v-if="item.className.indexOf('page2') !== -1"
          class="page2-content"
        >
          <h3 :class="{'fadeInDown':page === 2}">热门文章</h3>
          <section class="clearfix content-main">
            <article
              :class="['left','main-item',`item-${index+1}`,'animated',{'fadeInUp':page === 2}]"
              v-for="(item,index) in hotArticleInfo"
              :key="item.date"
            >
              <div>
                <div class="item-img"><img
                    :src="`http://localhost:8000${item.surface}`"
                    :alt="item.tag"
                  ></div>
                <div class="item-content">
                  <h5>
                    {{item.title}}
                  </h5>
                  <span class="content-date">
                    {{item.date}}
                  </span>
                  <p class="content-des">{{item.content}}</p>
                  <span class="content-more">阅读更多 <i class="el-icon el-icon-loading"></i></span>
                </div>
              </div>

            </article>
          </section>
        </div>
        <div
          v-if="item.className.indexOf('page3') !== -1"
          class="page3-content"
        >
          <article :class="[{moved: page === 3}]">
            <section class="sentence classic"> Try your best when you are young.Never regret. </section>
            <section class="sentence"> Youth gives you light please don't let it down. </section>
            <section class="sentence sign">-·-·-Smallker</section>
          </article>
        </div>
      </div>
    </div>
    <div
      class="arrow-find"
      @click="arrowFindClick"
      v-if="isShow"
    >
      <span>More</span>
      <i class="el-icon el-icon-bottom">
      </i>
    </div>
  </div>
</template>

<script>
import boom from "@/assets/text/Fortune Fu"
import { getHotArticleInfo } from "@/http/article"
import { create } from 'domain'
export default {
  data() {
    return {
      hotArticleInfo: [],
      wheel: {
        wheelDelta: 0,
        offset: 0,
        direction: undefined // 记录当前滚动状态 true为向下滚动 false 为向上滚动
      },
      tip: true,
      isShow: true,
      page: 1,
      totalPage: [
        {
          className: "page page1",
          content: boom.data.split("，")
        },
        {
          className: "page page2",
        },
        {
          className: "page page3",
        },
        {
          className: "page page4",
        }

      ]
    }
  },
  methods: {
    async handleApi() {
      let { status, data } = await getHotArticleInfo(3)
      if (status >= 200 && status < 300) {
        this.hotArticleInfo = data.data
        console.log(this.hotArticleInfo);
      }
    },
    //继续发现
    arrowFindClick() {
      const len = (this.totalPage.length - 1) * -100
      if (this.tip) {
        this.tip = false
        if (this.wheel.wheelDelta === len) {
          this.tip = true
        } else {
          this.wheel.wheelDelta -= 100
          this.wheel.direction = true
        }
      }

    },
    //设置body html样式，做一次兼容
    initStyle() {
      document.documentElement &&
        (document.documentElement.style.height = "100%") &&
        (document.documentElement.style.overflow = "hidden") &&
        (document.body.style.height = "100%") &&
        (document.body.style.boxSizing = "border-box")
    },
    //滚动事件
    handleScroll(e) {
      try {
        if (this.tip) {
          this.tip = false
          if (e.wheelDelta > 0) { // 向上滚动
            if (this.wheel.wheelDelta === 0) {
              this.tip = true
            } else {
              this.wheel.wheelDelta += 100
              this.wheel.direction = false
            }
          } else {  //向下滚动
            const len = (this.totalPage.length - 1) * -100
            if (this.wheel.wheelDelta === len) {
              this.tip = true
            } else {
              this.wheel.wheelDelta -= 100
              this.wheel.direction = true
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    "wheel.wheelDelta": {
      handler(value) {
        if (!value) {
          this.wheel.offset = 0
        } else {
          this.wheel.offset = -60 * value / 100
        }
      },
      immediate: true
    },
    page: {
      handler(value) {
        if (value === this.totalPage.length) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.handleApi()
    this.initStyle()
    document.addEventListener("mousewheel", this.handleScroll)
    this.$refs.fullPageRef.addEventListener("transitionend", (e) => {
      if (e.target !== this.$refs.fullPageRef) {
        return false
      }
      if (this.wheel.direction) {
        this.page++
        this.tip = true
      } else if (this.wheel.direction == false) {
        this.page--
        this.tip = true
      } else {
        return false
      }
      this.wheel.direction = undefined
      console.log(`当前是第${this.page}页`);
    }, false)
    this.$emit("changeNavColor", "rgba(255,255,255,.8)")

  },
  destroyed() {
    document.documentElement && (document.documentElement.style = "")
    document.body && (document.body.style = "")
  },
}
</script>

<style lang="less" scoped>
.page3 {
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .page3-content {
    article {
      user-select: none;
      position: absolute;
      top: 10%;
      right: 10%;
      opacity: 0;
      .sentence {
        line-height: 80px;
        font-family: smallkerBoom;
        color: #fff;
        font-size: 55px;
        letter-spacing: 0.03em;
      }
      .sign {
        text-align: right;
      }
    }
    .moved {
      animation: moved 1s ease-in-out;
      animation-fill-mode: forwards;
    }
    @keyframes moved {
      from,
      60%,
      75%,
      90%,
      to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      }

      from {
        opacity: 0;
        transform: translate3d(3000px, 0, 0);
      }

      60% {
        transform: translate3d(-25px, 0, 0);
      }

      75% {
        transform: translate3d(10px, 0, 0);
      }

      90% {
        transform: translate3d(-5px, 0, 0);
      }

      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  }
}
.page2 {
  position: relative;
  overflow: hidden;
  .page2-content {
    z-index: 7;
    position: absolute;
    box-sizing: border-box;
    padding: 35px 35px;
    width: 1280px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: 0.5s;
    h3 {
      opacity: 0;
    }
    h3.fadeInDown {
      animation: fadeInDown 0.7s;
      animation-fill-mode: forwards;
    }
    @keyframes fadeInDown {
      0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -200%, 0);
        transform: translate3d(0, -300%, 0);
      }
      100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    .content-main {
      box-sizing: border-box;
      padding: 25px 15px;
      .main-item {
        box-sizing: border-box;
        width: 33.3333%;
        height: 100%;
        padding: 7px 15px;
        opacity: 0;

        > div {
          overflow: hidden;
          border-radius: 15px;
          box-sizing: border-box;
          background-color: rgba(255, 255, 255, 0.8);
          &:hover img {
            transform: scale(1.5);
            filter: blur(2px);
          }
        }
        .item-img {
          width: 100%;
          height: 200px;
          overflow: hidden;
          transition: 0.5s;
          img {
            width: 100%;
            height: 100%;
            transition: 0.5s;
          }
        }
        @media screen and (max-width: 1135px) {
          .item-img {
            height: 180px;
          }
        }
        @media screen and (max-width: 1060px) {
          .item-img {
            height: 150px;
          }
        }
        .item-content {
          box-sizing: border-box;
          /* background-color: rgba(138, 117, 231, 0.226); */
          padding: 0px 15px 6px;
          h5 {
            padding-top: 15px;
            color: #333;
            font-size: 16px;
            line-height: 30px;
          }
          .content-date {
            display: block;
            color: #aaa;
            font-size: 14px;
            line-height: 30px;
          }
          .content-des {
            text-indent: 1em;
            color: #000;
            font-size: 15px;
            line-height: 30px;
          }
          @media screen and (max-width: 890px) {
            .content-des {
              line-height: 25px;
              font-size: 13px;
            }
          }
          .content-more {
            position: relative;
            display: inline-block;
            color: #29b6f6;
            font-size: 14px;
            line-height: 50px;
            .el-icon-loading {
              position: absolute;
              display: inline-block;
              font-size: 25px;
              left: 110%;
              top: 12px;
            }
          }
        }
      }
      .item-1.fadeInUp {
        animation-delay: 0.1s !important;
        animation-fill-mode: forwards;
      }
      .item-2.fadeInUp {
        animation-delay: 0.4s !important;
        animation-fill-mode: forwards;
      }
      .item-3.fadeInUp {
        animation-delay: 0.7s !important;
        animation-fill-mode: forwards;
      }
      @media screen and (max-width: 800px) {
        .main-item {
          float: none;
          width: 100%;
        }
      }
    }
    h3 {
      z-index: 9;
      position: relative;
      font-size: 35px;
      text-align: center;
      line-height: 45px;
      cursor: pointer;
      transition: 0.5s;
      &::after {
        content: "";
        position: absolute;
        width: 80px;
        height: 2px;
        left: 50%;
        transform: translateX(-50%);
        bottom: -15px;
        background: #00c2ff;
        transition: 0.3s;
      }
      &:hover::after {
        width: 100px;
      }
    }
  }
  @media screen and (max-width: 1360px) {
    .page2-content {
      width: 90%;
      h3 {
        font-size: 30px;
      }
    }
  }
  @media screen and (max-width: 650px) {
    .page2-content {
      margin: 20px auto;
      h3 {
        font-size: 20px;
      }
    }
  }
}
.page1-content {
  user-select: none;
  box-sizing: border-box;
  padding: 25px 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  color: antiquewhite;
  font-size: 25px;
  width: 75%;
  line-height: 50px;
  text-align: center;
  .left-text {
    overflow: hidden;
    position: absolute;
    box-sizing: border-box;
    width: 50%;
    height: 70%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: translateX(-50%) scale3d(1, 1, 1);
    opacity: 0;
    cursor: pointer;
    p {
      transition: 0.5s;
      &:hover {
        transform: scale(2);
      }
    }
  }
  .ani-left-text {
    animation: left_text 2s;
    animation-fill-mode: forwards;
  }
  .right-text {
    overflow: hidden;
    position: absolute;
    box-sizing: border-box;
    width: 50%;
    height: 70%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: translateX(50%) scale3d(1, 1, 1);
    opacity: 0;
    cursor: pointer;
    p {
      transition: 0.5s;
      &:hover {
        transform: scale(2);
      }
    }
  }
  .ani-right-text {
    animation: right-text 2s;
    animation-fill-mode: forwards;
  }
}
@media screen and (max-width: 1135px) {
  .page1-content {
    font-size: 15px !important;
    line-height: 40px;
  }
}
@media screen and (max-width: 750px) {
  .page1-content {
    font-size: 15px !important;
    line-height: 25px;
  }
}
@keyframes left_text {
  from {
    transform: translateX(0);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%);
  }
  59% {
    transform: translateX(-50%) scale3d(1.25, 0.75, 1);
  }
  68% {
    transform: translateX(-50%) scale3d(0.75, 1.25, 1);
  }
  77% {
    transform: translateX(-50%) scale3d(1.15, 0.85, 1);
  }
  85% {
    transform: translateX(-50%) scale3d(0.95, 1.05, 1);
  }
  93% {
    transform: translateX(-50%) scale3d(1.05, 0.95, 1);
  }
  to {
    transform: translateX(-50%) scale3d(1, 1, 1);
    opacity: 1;
  }
}
@keyframes right-text {
  from {
    transform: translateX(0);
    opacity: 0;
  }
  50% {
    transform: translateX(50%);
  }
  59% {
    transform: translateX(50%) scale3d(1.25, 0.75, 1);
  }
  68% {
    transform: translateX(50%) scale3d(0.75, 1.25, 1);
  }
  77% {
    transform: translateX(50%) scale3d(1.15, 0.85, 1);
  }
  85% {
    transform: translateX(50%) scale3d(0.95, 1.05, 1);
  }
  93% {
    transform: translateX(50%) scale3d(1.05, 0.95, 1);
  }
  to {
    transform: translateX(50%) scale3d(1, 1, 1);
    opacity: 1;
  }
}
.arrow-find {
  z-index: 999;
  user-select: none;
  position: fixed;
  width: 80%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  font-family: smallkerBoom, sans-serif;
  color: white;
  text-align: center;
  cursor: pointer;
  span {
    display: block;
    font-size: 80px;
    text-align: center;
    line-height: 75px;
    transition: 0.5s;
    &:hover {
      transform: scale(1.3);
    }
  }
  @media screen and (max-width: 1230px) {
    span {
      font-size: 25px;
    }
  }
  i {
    font-size: 30px;
    animation: animate1 2s infinite;
  }
  @keyframes animate1 {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(100%);
    }
    75% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(0%);
    }
  }
}
#home-page {
  box-sizing: border-box;
  position: absolute;
  padding-top: 60px;
  width: 100%;
  height: 100%;
  animation: animate 1s 1;
  animation-fill-mode: forwards;

  @keyframes animate {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  #pure-full-page {
    box-sizing: border-box;
    padding-top: 60px;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: 0.9s ease-in-out;
    .page {
      position: relative;
      width: 100%;
      height: 100%;
      background-attachment: fixed;
      background-size: cover;
      background-position: center center;
      &:nth-child(1) {
        background-image: url("../../assets/images/bg-home1.png");
      }
      &:nth-child(2) {
        background-image: url("../../assets/images/bg-home2.jpg");
        &::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.4);
        }
      }
      &:nth-child(3) {
        background-image: url("../../assets/images/bg-home3.jpg");
      }
      &:nth-child(4) {
        background-color: orange;
      }
    }
  }
}
</style>