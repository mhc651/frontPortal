<template>
<div class="review-ing">
  <div class="container" ref="containerC">
    <div class="success-image">
      <Icon type="record" class="iconC"></Icon>
      <Icon type="ios-more" class="iconC-dian"></Icon>
    </div>
    <div class="success-text">审核中</div>
    <div class="success-text-note">用户机构授权信息审核中，请耐心等待。</div>
    <div class="success-line"></div>
    <div class="success-btnM">
      <!-- <Button class="btnM-bt" @click="viewMyInfo">查看我提交的资料</Button> -->
    </div>
  </div>
</div>
</template>
<script>
import {
  mapActions,
  mapState
} from 'vuex'
export default {
  name: 'ReviewIng',
  data () {
    return {
      screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
  },
  computed: {
    ...mapState([
      ''
    ])
  },
  mounted () {
    let self = this
    self.init()
    // this.getOrgStatus()
    //   .then(res => {
    //     switch (this.auditStatus) {
    //       case '20':
    //         // 审核通过
    //         this.$router.push('/selectionservices')
    //         break
    //       case '03':
    //         // 审核中
    //         this.$router.push('/reviewing')
    //         break
    //       case '02':
    //         // 待审核
    //         this.$router.push('/auditcheck')
    //         break
    //       case '21':
    //         this.$router.push('/registrater-failed')
    //         break
    //     }
    //   })
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        self.screenHeight = window.screenHeight
      })()
    }
  },
  methods: {
    viewMyInfo () {
      this.$router.push('/viewAuditMaterials')
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
    },
    ...mapActions([
      'getOrgStatus'
    ])
  },
  watch: {
    screenHeight (val) {
      this.init()
    }
  }
}
</script>
<style src="./ReviewIng.scss" lang="scss"></style>
