<template>
  <div class="steps">
    <Steps :current="stepsText.current" >
      <Step v-for="(stepsText, index) in stepsText.objsteps"
            :key="index" :title="stepsText.text">
      </Step>
    </Steps>
  </div>
</template>
<script>
export default {
  name: 'steps',
  props: {
    stepsText: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss">
  .steps {
    border-bottom: 1px solid #E4E9EE;
    height: 58px;
    .ivu-steps-item {
      text-align: center;
      padding-left: 20px;
      border-right: 1px solid #E4E9EE;
      &:last-child {
        border-right: 0;
      }
      .ivu-steps-tail {
        display: none;
      }
      .ivu-steps-title {
        line-height: 54px;
      }
      .ivu-steps-head {
        .ivu-steps-head-inner {
          width: 33px;
          height: 33px;
          line-height: 31px;
          border-color: #909399;
          background: rgba(234, 239, 244, 1);
          &>.ivu-steps-icon.ivu-icon{
            line-height: 31px;
          }
          span {
            color: #909399;
          }
        }
        float: left;
        margin: 11px 0 11px;
        vertical-align: baseline;
      }
    }
    $statusColor :#eaeff4;
   .ivu-steps-status-process{
      border-right: 1px solid $statusColor;
      background:$statusColor;
      .ivu-steps-head {
        background-color:inherit;
        .ivu-steps-head-inner {
          background-color:#fff;
          //border-color: $statusColor;
          span {
            //color: $statusColor;
          }
        }
      }
      .ivu-steps-title{
        background-color:inherit;
        //color: #fff;
      }
    }
  }
</style>
