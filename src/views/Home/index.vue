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
      </div>
    </div>
    <div
      class="arrow-find"
      @click="arrowFindClick"
      v-if="isShow"
    >
      <span>继续发现</span>
      <i class="el-icon el-icon-bottom">
      </i>
    </div>
  </div>
</template>

<script>
import boom from "@/assets/text/Fortune Fu"
import { create } from 'domain'
export default {
  data() {
    return {
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
    //继续发现
    arrowFindClick() {
      const len = (this.totalPage.length - 1) * -100
      if (this.tip) {
        this.tip = false
        if (this.wheel.wheelDelta === len) {
          this.tip = true
        } else {
          this.wheel.wheelDelta -= 100
          this.page++
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
    this.initStyle()
    document.addEventListener("mousewheel", this.handleScroll)
    this.$refs.fullPageRef.addEventListener("transitionend", () => {
      if (this.wheel.direction) {
        this.page++
      } else {
        this.page--
      }
      console.log(this.page)
      this.tip = true
    })
    this.$emit("changeNavColor", "rgba(255,255,255,.8)")
  },
  destroyed() {
    document.documentElement && (document.documentElement.style = "")
    document.body && (document.body.style = "")
  },
}
</script>

<style lang="less" scoped>
.page1-content {
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
    opacity: 1;
  }
  .ani-left-text {
    animation: left_text 2s;
    animation-fill-mode: forwards;
  }
  .right-text {
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
    opacity: 1;
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
  user-select: none;
  position: fixed;
  width: 80%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  color: antiquewhite;
  text-align: center;
  cursor: pointer;
  span {
    display: block;
    font-size: 45px;
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
    transition: 1s ease-in-out;
    .page {
      width: 100%;
      height: 100%;
      background-image: url("../../assets/images/bg-home.png");
      background-size: cover;
      background-position: center center;
      &:nth-child(1) {
        background-color: pink;
      }
      &:nth-child(2) {
        background-color: steelblue;
      }
      &:nth-child(3) {
        background-color: purple;
      }
      &:nth-child(4) {
        background-color: orange;
      }
    }
  }
}
</style>