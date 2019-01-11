<template>
  <div class="registrater-failed">
    <div class="container" ref="containerC">
      <!--<BreadItem :isJudge="true" :breadArray="[{label:'耗材声明',to:'/register'},{label:'耗材产品资质申报',to:''}]" />-->
      <MainTitle :mainTitle="'提交耗材产品申报应用授权资料'" style="margin-top: 30px;"/>
      <div class="success-image">
        <Icon type="close-circled" class="iconC"></Icon>
      </div>
      <div class="success-text">审核不通过</div>
      <div class="success-text-note">耗材产品申报应用授权资料审核不通过，请重新提交材料</div>
      <div class="success-line"></div>
      <div class="success-btnM">
        <Button class="btnM-bt" @click = 'resubmit'>重新提交材料</Button>
        <Button class="btnM-bt" @click="backIndex">返回首页</Button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapState,
  mapMutations
} from 'vuex'
import * as types from '../../store/mutations-types'
import MainTitle from '../../components/MaintItle'
import BreadItem from '../../components/BreadItem'
export default {
  name: 'AptitudeAuditFailure',
  components: {
    MainTitle,
    BreadItem
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
    backIndex () {
      this.$router.push('/selectionservices')
    },
    ...mapMutations({
      rollBackResubmit: types.RESUBMIT_FROM_FAIL
    }),
    resubmit () {
      this.rollBackResubmit(true)
      this.$router.push(`/productDeclare/${this.app_id}`)
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
