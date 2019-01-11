<template >
  <div class="main--fluid centers">
    <div class="main" :style="'margin-top:'+ padtop+';'+'margin-bottom:'+ padtop " >
      <div class="main_form" style="padding-top: 122px;">
      <div class="success-image">
        <Icon type="checkmark-circled" class="iconC"></Icon>
        <p>恭喜您！密码重置成功，请妥善保管。</p>
      </div>
      </div>
      <div class="success-btnM">

          <router-link to="/login" class="backlogin">返回登录</router-link>

      </div>
    </div>
  </div>
</template>

<script>
// import Steps from '../../components/NewPasswordSteps'

export default {
  name: 'NewPasswordSuccess',
  components: {
    // Steps
  },
  data () {
    return {
      current: 1,
      padtop: '15px',
      padbot:'15px'
    }
  },
  methods: {
    /*
* 高度设置
* */
    setHeight: function () {
      let clih = document.documentElement.clientHeight;
      if(clih<=668){
        this.clientHeight = '498px'
      }else{
        this.clientHeight = `${document.documentElement.clientHeight-170}px`;
        this.padtop = (clih-140-492)/2+'px';
        var mhc = this.padtop;
        var tely = 99
      }
    }
  },
  mounted() {
    this.setHeight()
    const that = this
    window.onresize = function temp() {
      that.setHeight()
    }
  }
}
</script>
<style lang="scss" src="./NewPassword.scss" scoped type="text/css">
</style>
