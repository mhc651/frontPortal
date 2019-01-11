<template>
<div class="register-success">
  <div class="container" ref="containerC">
    <div class="success-image">
      <Icon type="checkmark-circled" class="iconC"></Icon>
    </div>
    <div class="success-text">恭喜您！注册成功</div>
    <div class="success-text-note">信息正在审核，请耐心等待！<p>登录账号：<span id="usernames">{{org_status.account}}</span></p></div>
    <div class="success-current">当前状态：
      <Button style="cursor: auto;" type="ghost" shape="circle" class="current-btn">
      <span>{{org_status.status}}</span>
      </Button>
      </div>
    <div class="success-line"></div>
    <div class="success-btnM">
      <Button class="btnM-bt"  v-if='!withdrawState' type="primary" @click="modal1 = true">撤回</Button>
      <!--Button class="btnM-bt" v-if='withdrawState' @click="viewInfo">
        重新提交资料
      </Button> -->
      <Button class="btnM-bt" @click="viewInfo()">
        查看我提交的资料
      </Button>
      <!--<div>{{this.$route.query}}</div>-->
      <!--<Button class="btnM-bt" @click="goToLogin">-->
       <!--返回登录-->
      <!--</Button>-->
    </div>
  </div>
  <Modal
    v-model="modal1"
    title="操作确认"
    class-name="vertical-center-modal"
    @on-ok="ok"
    @on-cancel="cancel">
    <p>确认撤回当前待审核信息，重新提交？</p>
  </Modal>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'RegisterSuccess',
  data() {
    return {
      //是否是医疗机构1代表医疗机构，否则就是企业
      org:this.$route.query.mode,
      modal1: false,
      withdrawState: false,
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    }
  },
  mounted() {
    let self = this
    self.init()
    //this.getOrgStatus()
    window.onresize = () => {
      return (() => {
        window.screenHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight
        self.screenHeight = window.screenHeight
      })()
    }
  },
  computed: {
    ...mapState(['org_status'])
  },
  methods: {
    ...mapActions(['getOrgStatus', 'revoke']),
    viewInfo() {
      if(this.org==1){// 查看医疗机构注册页面
        //this.$router.push('/register1?reset=1&m='+this.org)
        this.$router.push('/register1?look=1')
      }else{// 查看企业注册页面
        this.$router.push('/register?look=1')
      }
    },
    goToLogin() {
      this.$router.push('/login')
    },
    init() {
      setTimeout(() => {
        let headerH = 64
        let footerH = 102
        let containerH = this.$refs.containerC.offsetHeight
        let wh =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight
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
    ok() {
      // 撤回注册
      let uname = document.getElementById("usernames").innerText
      this.revoke({username: uname}).then(res => {
        if (res.success) {
          this.withdrawState = true
        }
      })
      if(this.org==1){// 编辑医疗机构注册页面
        this.$router.push('/register1?reset=1&flag=0')
      }else{// 编辑企业注册页面
        this.$router.push('/register?reset=1&flag=0')
      }

    },
    cancel() {
      // this.$Message.info('Clicked cancel')
    }
  },
  watch: {
    screenHeight(val) {
      this.init()
    }
  }
}
</script>
<style src="./RegisterSuccess.scss" lang="scss"></style>
