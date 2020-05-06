<template>
  <div class="timeline-block animated slideInRight">
    <el-timeline>
      <el-timeline-item
        timestamp="2018/4/12"
        placement="top"
      >
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
    
    </el-timeline>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
 /deep/.el-timeline-item__content{
   transition: .3s;
 }
/deep/.el-timeline-item{
  user-select: none;
  &:hover .el-timeline-item__content{
    transform: translateY(-10px);
  }
   &:hover .is-always-shadow{
     box-shadow: 0 0 10px 0 #fff;
   }
}
/deep/.el-card.is-always-shadow {
  box-shadow: 0px 0px 30px 7px rgba(0, 0, 0, 0.1) inset;
}
/deep/.el-timeline-item__timestamp {
  font-size: 25px;
  color: #313232;
  font-weight: 700;
  margin-bottom: 25px;
}
/deep/.el-card__body {
  line-height: 45px;
  padding-left: 80px;
  h4 {
    font-size: 18px;
  }
}
@media screen and (max-width: 665px) {
  /deep/.el-timeline-item__content {
    overflow: hidden;
    width: 90%;
    font-size: 18px;
    background-color: #fff;

  }
}
</style>