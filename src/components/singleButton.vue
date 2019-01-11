<template>
  <div class="singleBtn">
    <Button @click='toHome'><Icon type="arrow-left-c"></Icon>{{value}}</Button>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    toHome () {
      this.$router.push('/selectionServices')
    }
  }
}
</script>
<style scoped lang="scss">
  .singleBtn{
    width: 1200px;
    margin: 20px auto 0;
    text-align: right;
    .ivu-btn{
      width: 108px;
      height: 32px;
      border: 1px solid #1686EA;
      border-radius: 16px;
      color: #1686EA;
      background-color: #fff;
      font-size: 14px;
      .ivu-icon-arrow-left-c{
        margin-right: 8px;
      }
    }
  }
</style>
