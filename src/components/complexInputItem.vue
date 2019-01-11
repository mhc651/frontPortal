<template>
  <div class="publicInput" >

    <FormItem :label="labelVal.label+'：'" :prop="prop" class="formItem">
      <Input v-model="model[prop]" :type="inputType" :disabled="disabled" :placeholder="plh"/>
      <label class="rightTip" v-if="labelVal.tip">{{labelVal.tip}}</label>
    </FormItem>
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
    labelVal: {
      type: Object,
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    model: {
      type: Object
    },
    prop: {
      type: String,
      default: ''
    },
    handleKeyUp: {
      type: Function
    },
    hanldeBlur: {
      type: Function
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plh: {
      type: String,
      default: ''
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
    }
  }
}
</script>
<style lang="scss">
  .publicInput {
    .formItem{
      width: 100%;
      .ivu-form-item-content{
        margin-left: 0!important;
      }
    }
    .ivu-input-wrapper {
      width: 408px;
      .ivu-input {
        height: 40px;
        line-height: 40px;
        padding: 0 0 0 7px;
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
    .ivu-form-item-error{
      .ivu-input {
        border-color: red;
      }
    }
    .ivu-form-item-error-tip{
      left: 270px;
    }
    label {
      box-sizing: border-box;
      font-size: 14px;
      margin-right: 22px;
      height: 40px;
      &.ivu-form-item-label {
        width: 16em;
        line-height: 40px;
        font-size: 14px;
        text-align: right;
        color: #606266;
        padding: 0;
        span {
          color: red;
          margin-right: 2px;
        }
      }
      &.rightTip {
        display: inline-block;
        margin-left: 11px;
        color: #909399;
      }
    }
  }
</style>
