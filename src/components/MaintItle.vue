<template>
  <div class="mainTitle">
    <div class="titleName">{{mainTitle}}</div>
  </div>
</template>
<script>
/*
* Description: mainTitle 主标题
* */
export default {
  props: {
    mainTitle: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped lang="scss">
  .mainTitle {
    border-bottom: 1px dashed #E4E7ED;
    padding-bottom: 30px;
    .titleName {
      border-left: 6px solid #1686EA;
      height: 24px;
      line-height: 24px;
      font-size: 24px;
      color: #373D41;
      font-weight: bold;
      text-align: left;
      padding-left: 50px;
    }
  }
</style>
