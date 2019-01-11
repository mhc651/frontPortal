<template>
  <div class="publicInput" >
    <label class="leftName"><span>*</span>{{labelVal.label+"："}}</label>
    <Input :type="inputType"  :disabled="disabled" :value="value"/>
    <label class="rightTip" v-if="labelVal.tip">{{labelVal.tip}}</label>
  </div>
</template>
<script>
/**
 * @property {object} labelVal lable object
 * @property {function} handlekeyUp the callback funtion of key up event
 * @property {function} handleBlur callback function of blur event
 */
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    labelVal: {
      type: Object,
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    handleKeyUp: {
      type: Function
    },
    hanldeBlur: {
      type: Function
    },
    disabled: {
      type: Boolean,
      default: true

    }
  },
  methods: {
    handleInputKeyup (e) {
      this.$emit('handleKeyUp', e)
    },
    handleBlur: function (e) {
      if (e.target.value.length > 0) {
        this.err = false
        e.target.style.borderColor = ''
      } else {
        this.err = true
        e.target.style.borderColor = 'red'
      }
      this.$emit('handleBlur', e)
    }
  },
  data () {
    return {
      err: false
    }
  }
}
</script>
<style lang="scss">
  .publicInput {
    margin-bottom: 20px;
    .ivu-input-wrapper {
      width: 408px;
      display: inline-block;
      .ivu-input {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #303133;
        border: 1px solid #DCDFE6;
        border-radius: 6px;
        box-shadow: none;
        &:focus {
          border-color: #1686EA;
        }
      }
    }
    label {
      display: inline-block;
      font-size: 14px;
      margin-right: 22px;
      &.leftName {
        width: 225px;
        justify-content: flex-end;
        text-align: right;
        color: #606266;
        span {
          color: red;
          margin-right: 2px;
        }
      }
      &.rightTip {
        margin-left: 11px;
        color: #909399;
      }
    }
  }
  .err{
    position: absolute;
    left: 5px;
    bottom: -20px;
    font-size: 14px;
    color: red;
  }
</style>
