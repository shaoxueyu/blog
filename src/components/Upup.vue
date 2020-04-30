<template>
  <!-- 点击回到顶部 -->
  <div
    class="up-inner"
    ref="upInnerRef"
    @click="handleUpClick"
  >
    <span>
      <i :class="['el-icon','el-icon-position',{top:ifTop}]"></i>
      回到顶部
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifTop: false
    }
  },
  methods: {
    handleUpClick(){
      window.scrollTo({
        top:0,
        behavior: "smooth"
      })
    }
  },
  mounted() {
    this.$refs.upInnerRef.addEventListener("mouseenter", () => {
      this.ifTop = true
    })
    this.$refs.upInnerRef.addEventListener("mouseleave", () => {
      this.ifTop = false
    })
  }
}
</script>

<style lang="less" scoped>
.up-inner {
  box-sizing: border-box;
  padding: 5px;
  position: fixed;
  bottom: 3%;
  right: 3%;
  width: 60px;
  height: 60px;
  border-radius: 3px;
  background-color: #9f9f9f;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: darken(#9f9f9f, 20%);
  }
  &:hover span i::after {
    opacity: 1;
  }
  span {
    display: block;
    font-size: 14px;
    text-align: center;
    font-size: 11px;
    i {
      position: relative;
      padding-top: 5px;
      font-size: 30px;
      display: block;
      transform: rotateZ(-45deg);
      &::after {
        content: "为师先走一步~";
        position: absolute;
        top: -15px;
        left: 0;
        right: 0;
        margin: auto;
        opacity: 0;
        font-size: 12px;
        transform: rotateZ(45deg);
        width: 85px;
      }
    }
    @keyframes topMove {
      0% {
        transform: translateY(0) rotateZ(-45deg);
      }
      100% {
        transform: translateY(-1000px) rotateZ(-45deg);
      }
    }
  }
}
.el-icon-position.top {
  animation: topMove 1s 1 cubic-bezier(0.33, 0.46, 0.89, -0.1);
  animation-fill-mode: forwards;
}
</style>