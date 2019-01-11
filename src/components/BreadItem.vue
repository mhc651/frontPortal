<template>
  <div class="mainBread">
    <Breadcrumb separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem v-for="item in breadArray" :key="item.label" :to="item.to" >{{item.label}}</BreadcrumbItem>
    </Breadcrumb>
    <Button v-show="isJudge" type="ghost" shape="circle" icon="arrow-left-c" class="breadBtn">返回首页</Button>
  </div>
</template>
<script>
export default {
  props: {
    breadArray: {
      type: Array,
      required: true
    },
    /*
    * isJudge 用来控制返回首页按钮的显隐
    * */
    isJudge: {
      type: Boolean,
      required: true
    }
  }
}
</script>
<style scoped lang="scss">
  .mainBread{
    background: #F5F7FA;
    padding:19px 0 21px;
    position: relative;
    .breadC{
      width:100%;
      li{
        font-size: 14px;
        color: #606266;
        padding: 0 5px;
        float: left;
        list-style-type:none;
        &:last-child{
          color: #ff0000;
        }
      }
    }
    .breadBtn{
      position: absolute;
      right: 0;
      top: 14px;
      border: 1px solid #1686EA;
      color: #1686EA;
      width: 108px;
      height: 32px;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .ivu-breadcrumb{
    color: #606266;
    font-weight: bold;
  }
  .ivu-breadcrumb>span:last-child{
    color: #909399;
  }
</style>
