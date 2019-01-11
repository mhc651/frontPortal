<template>
<div class="revocation">
  <div class="container" ref="containerC">
    <div class="success-image">
      <Icon type="checkmark-circled" class="iconC"></Icon>
    </div>
    <div class="success-text">撤回成功</div>
    <div class="success-text-note">您提交的材料已经成功撤回，请点击下面按钮重新提交审核！</div>
    <div class="success-line"></div>
    <div class="success-btnM">
      <Button class="btnM-bt" @click="resubmit">重新提交材料</Button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Revocation',
  data () {
    return {
      screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
  },
  mounted () {
    let self = this
    self.init()
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        self.screenHeight = window.screenHeight
      })()
    }
  },
  methods: {
    resubmit () {
      this.$router.push('/resubmitInfo')
    },
    init () {
      setTimeout(() => {
        let headerH = 64
        let footerH = 70
        let containerH = this.$refs.containerC.offsetHeight
        let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        let actualH = headerH + footerH + containerH
        if (actualH < wh) {
          let marT = wh - actualH
          this.$refs.containerC.style.marginTop = marT / 2 + 'px'
          this.$refs.containerC.style.marginBottom = marT / 2 + 'px'
        } else {
          this.$refs.containerC.style.marginTop = '43px'
          this.$refs.containerC.style.marginBottom = '43px'
        }
      }, 0)
    }
  },
  watch: {
    screenHeight (val) {
      this.init()
    }
  }
}
</script>
<style src="./Revocation.scss" lang="scss"></style>
