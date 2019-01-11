<template>
  <div class="subtitle">
    <div class="loop"></div>
    <span>{{subtitle}}</span>
    <template v-if="small">
      <small>&emsp;(</small>
      <small :style='{color:tip.color}'>
        {{ tip.val }}
      </small>
      <small>{{ small }})</small>
    </template>
  </div>
</template>
<script>
/*
* Description: NewPasswordSteps
* */
export default {
  props: {
    subtitle: {
      type: String,
      required: true
    },
    tip: {},
    small: {}
  },
}
</script>
<style scoped lang="scss">
.subtitle {
  width: 1081px;
  margin: 30px auto 0 auto;
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 19px;
  .loop {
    display: inline-block;
    height: 12px;
    width: 12px;
    border-radius: 6px;
    border: 3px solid #1686ea;
    margin-right: 12px;
  }
  span {
    display: inline-block;
    font-size: 18px;
    color: #373d41;
  }
  small{font-size: 12px;top: -2px;
    position: relative;}
}
</style>
