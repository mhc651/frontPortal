<template>
<div class="registrater-failed">
  <div class="container" style="margin-top: 224px; margin-bottom: 224px;" ref="containerC">
    <div class="failed-image">
      <Icon type="close-circled" class="iconC"></Icon>
    </div>
    <div class="failed-text">审核不通过</div>
    <div class="failed-text-note">{{ app.cause?app.cause:'用户机构授权信息审核不通过，请修改资料后重新提交。'}}</div>
    <div class="failed-line"></div>
    <div class="failed-btnM">
      <!-- <Button class="btnM-bt" @click="resubmit">重新提交材料</Button> -->
    </div>
  </div>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "RegistraterFailed",
  data() {
    return {
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    };
  },
  mounted() {
    let self = this;
    self.init()
    // this.getOrgStatus()
    //   .then(res => {
    //     if (res) {
    //       switch (this.org_status.auditStatus) {
    //         case '20':
    //           // 审核通过
    //           this.$router.push('/selectionservices')
    //           break
    //         case '03':
    //           // 审核中
    //           this.$router.push('/reviewing')
    //           break
    //         case '02':
    //           // 待审核
    //           this.$router.push('/auditcheck')
    //           break
    //         case '21':
    //           this.$router.push('/registrater-failed')
    //           break
    //       }
    //     }
    //   })
    window.onresize = () => {
      return (() => {
        window.screenHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        self.screenHeight = window.screenHeight;
      })();
    };
  },
  computed: {
    ...mapState(["org_status", "app"])
  },
  methods: {
    resubmit() {
      this.$router.push("/resubmitInfo");
    },
    init() {
      setTimeout(() => {
        let headerH = 64;
        let footerH = 70;
        let containerH = this.$refs.containerC.offsetHeight;
        let wh =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        let actualH = headerH + footerH + containerH;
        if (actualH < wh) {
          let marT = wh - actualH;
          this.$refs.containerC.style.marginTop = marT / 2 + "px";
          this.$refs.containerC.style.marginBottom = marT / 2 + "px";
        } else {
          this.$refs.containerC.style.marginTop = "43px";
          this.$refs.containerC.style.marginBottom = "43px";
        }
      }, 0);
    },
    ...mapActions(["getOrgStatus"])
  },
  watch: {
    screenHeight(val) {
      this.init();
    }
  }
};
</script>
<style src="./RegistraterFailed.scss" lang="scss"></style>
