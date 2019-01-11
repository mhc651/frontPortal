<template>
  <div class="review-ing">
    <div class="container" ref="containerC">
      <MainTitle :mainTitle="'提交耗材产品申报应用授权资料'" style="margin-top: 30px;"/>
      <div class="success-image">
        <Icon type="record" class="iconC"></Icon>
        <Icon type="ios-more" class="iconC-dian"></Icon>
      </div>
      <div class="success-text">审核中</div>
      <div class="success-text-note">耗材产品申报应用授权资料审核中，请您耐心等待。</div>
      <div class="success-line"></div>
      <div class="success-btnM">
        <Button class="btnM-bt" @click="viewData">查看我提交的资料</Button>
        <Button class="btnM-bt" @click="backPage">返回首页</Button>
      </div>
    </div>
  </div>
</template>
<script>
import MainTitle from '../../components/MaintItle'
import {mapState} from 'vuex'
export default {
  name: 'AptitudeInTheReview',
  components: {
    MainTitle
  },
  data () {
    return {
      modal1: false,
      screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
  },
  computed: {
    ...mapState([
      'app_id'
    ])
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
    backPage () {
      this.$router.push('/selectionservices')
    },
    viewData () {
      this.$router.push(`/LookProductDeclare/${this.app_id}`)
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
    ok () {
      this.$router.push({path: '/revocation'})
    },
    cancel () {
      // this.$Message.info('Clicked cancel')
    }
  },
  watch: {
    screenHeight (val) {
      this.init()
    }
  }
}
</script>
<style src="./AptitudeDeclareState.scss" lang="scss"></style>
